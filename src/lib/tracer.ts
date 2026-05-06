/**
 * C# tracer: instruments user code so we can replay execution line-by-line
 * with VS-style debug controls (Step Over, Step Into, Step Out, Continue).
 *
 * Key change vs the per-variable tracer: we emit position markers BEFORE each
 * executable line (so a "frame at line N" means "paused, about to execute N",
 * matching VS Code semantics), and we tag every marker with the enclosing
 * method name so the UI can implement Step Over (skip into-and-back-out of
 * called methods) and Step Out (advance until the method changes).
 *
 * Marker format on stdout:
 *   __TRACE__:<step>|<line>|<method>|<name>|<value>
 *
 * <name> is a special sentinel `@@POS@@` for position markers (no variable).
 */

const TRACE_MARKER = '__TRACE__:';
const POS_MARKER = '@@POS@@';
const MAX_TRACE_PER_RUN = 1500;

const PRIMITIVE_TYPES = new Set([
  'int', 'long', 'short', 'byte', 'sbyte', 'uint', 'ulong', 'ushort',
  'float', 'double', 'decimal', 'bool', 'char', 'string', 'var',
]);

const TYPE_DECL_RE = new RegExp(
  '^\\s*(?:int|long|short|byte|sbyte|uint|ulong|ushort|float|double|decimal|bool|char|string|var)(?:\\[\\])?\\s+([A-Za-z_]\\w*)\\s*=\\s*[^;]+;\\s*$',
);
const COMPOUND_RE = /^\s*([A-Za-z_]\w*)\s*(?:\+|-|\*|\/|%|&|\||\^)=\s*[^;]+;\s*$/;
const ASSIGN_RE = /^\s*([A-Za-z_]\w*)\s*=\s*[^=;][^;]*;\s*$/;
const INC_DEC_RE = /^\s*(?:\+\+|--)?([A-Za-z_]\w*)(?:\+\+|--)?\s*;\s*$/;

const KEYWORDS_NOT_METHODS = new Set([
  'if', 'while', 'for', 'foreach', 'switch', 'catch', 'using', 'lock',
  'fixed', 'do', 'return', 'throw', 'new', 'sizeof', 'typeof', 'nameof',
  'when', 'select', 'where', 'orderby', 'group', 'join',
]);

export interface TraceVariable {
  value: string;
  line: number;
  step: number;
}

/** A single frame in the recorded execution — paused before line N inside method M. */
export interface TraceFrame {
  step: number;
  line: number;
  method: string;
  variables: Map<string, TraceVariable>;
}

export interface ParsedTrace {
  frames: TraceFrame[];
  cleanOutput: string;
  truncated: boolean;
}

export function instrumentCSharp(source: string): string {
  const lines = source.split('\n');
  const out: string[] = [];
  let inBlockComment = false;
  let depth = 0;
  // Stack of method names, deepest = current. While depth>=2 the top of this
  // stack is "the method we're in". Pushed when depth transitions 1→2 due to
  // the opening brace of a method body, popped when depth goes 2→1.
  const methodStack: string[] = [];
  let pendingMethodName: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const lineNo = i + 1;
    const stripped = stripStringsAndComments(raw, inBlockComment);
    inBlockComment = stripped.inBlockComment;
    const code = stripped.code;

    // While at class-body depth (1) we look for method signatures.
    // Heuristic: the LAST identifier followed by ( ... ) at this depth is the method name.
    if (depth === 1 && pendingMethodName === null) {
      const sigMatch = code.match(/(?<!\.)\b([A-Za-z_]\w*)\s*\([^)]*\)\s*(?:\{|=>|$)/);
      if (sigMatch) {
        const name = sigMatch[1];
        if (!KEYWORDS_NOT_METHODS.has(name)) pendingMethodName = name;
      }
    }

    // Walk characters; track depth and method-stack transitions.
    let leftMethodOnThisLine = false;
    for (const ch of code) {
      if (ch === '{') {
        depth++;
        if (depth === 2 && pendingMethodName) {
          methodStack.push(pendingMethodName);
          pendingMethodName = null;
        }
      } else if (ch === '}') {
        if (depth === 2 && methodStack.length > 0) {
          methodStack.pop();
          leftMethodOnThisLine = true;
        }
        depth = Math.max(0, depth - 1);
      }
    }
    if (depth === 1 && code.trim().endsWith(';')) {
      // `abstract void Foo();` etc. — drop pending without push.
      pendingMethodName = null;
    }

    const currentMethod = methodStack[methodStack.length - 1] ?? '';
    const inMethodBody = depth >= 2 && currentMethod !== '' && !leftMethodOnThisLine;

    const trimmed = raw.trim();
    const isComment = !trimmed || trimmed.startsWith('//');
    const isPureBrace = trimmed === '{' || trimmed === '}' || trimmed === '{}';
    const isForHeader = /^\s*for\s*\(/.test(code);
    const isControlOnly = /^\s*(?:if|else|while|do|switch|case|default|try|catch|finally)\b/.test(trimmed) && !/;\s*$/.test(trimmed);
    const alreadyInstrumented = /__Tracer\./.test(raw);

    const shouldInstrument =
      inMethodBody &&
      !isComment &&
      !isPureBrace &&
      !isForHeader &&
      !isControlOnly &&
      !alreadyInstrumented;

    // Emit POS BEFORE the user's line so a "paused frame at L N" means
    // "about to execute L N" (matches VS Code's stop-on-line semantics).
    if (shouldInstrument) {
      out.push(`        __Tracer.Pos(${lineNo}, "${currentMethod}");`);
    }
    out.push(raw);

    if (shouldInstrument) {
      const decl = code.match(TYPE_DECL_RE);
      if (decl) {
        out.push(traceCall(lineNo, decl[1], currentMethod));
      } else {
        const compound = code.match(COMPOUND_RE);
        if (compound) {
          out.push(traceCall(lineNo, compound[1], currentMethod));
        } else {
          const assign = code.match(ASSIGN_RE);
          if (assign && !PRIMITIVE_TYPES.has(assign[1])) {
            out.push(traceCall(lineNo, assign[1], currentMethod));
          } else {
            const inc = code.match(INC_DEC_RE);
            if (inc && /\+\+|--/.test(code)) {
              out.push(traceCall(lineNo, inc[1], currentMethod));
            }
          }
        }
      }
    }
  }

  return out.join('\n') + '\n' + TRACER_FOOTER;
}

function traceCall(lineNo: number, varName: string, method: string): string {
  return `        __Tracer.Mark(${lineNo}, "${method}", "${varName}", ${varName});`;
}

const TRACER_FOOTER = `// === auto-injected by DotNetLearn ===
internal static class __Tracer
{
    static int _step = 0;
    static int _count = 0;
    public static T Mark<T>(int line, string method, string name, T value)
    {
        if (_count >= ${MAX_TRACE_PER_RUN}) return value;
        _count++;
        _step++;
        System.Console.WriteLine("${TRACE_MARKER}" + _step + "|" + line + "|" + method + "|" + name + "|" + Format((object)value));
        return value;
    }
    public static void Pos(int line, string method)
    {
        if (_count >= ${MAX_TRACE_PER_RUN}) return;
        _count++;
        _step++;
        System.Console.WriteLine("${TRACE_MARKER}" + _step + "|" + line + "|" + method + "|${POS_MARKER}|");
    }
    static string Format(object v)
    {
        if (v == null) return "null";
        if (v is bool) return ((bool)v) ? "true" : "false";
        if (v is string) return "\\"" + ((string)v).Replace("\\\\", "\\\\\\\\").Replace("\\"", "\\\\\\"") + "\\"";
        if (v is System.Collections.IEnumerable)
        {
            var parts = new System.Collections.Generic.List<string>();
            foreach (var it in (System.Collections.IEnumerable)v) parts.Add(it == null ? "null" : it.ToString());
            return "[" + string.Join(", ", parts) + "]";
        }
        return v.ToString();
    }
}
`;

function stripStringsAndComments(
  line: string,
  inBlockComment: boolean,
): { code: string; inBlockComment: boolean } {
  let i = 0;
  let out = '';
  while (i < line.length) {
    if (inBlockComment) {
      const close = line.indexOf('*/', i);
      if (close === -1) {
        out += ' '.repeat(line.length - i);
        return { code: out, inBlockComment: true };
      }
      out += ' '.repeat(close - i + 2);
      i = close + 2;
      inBlockComment = false;
      continue;
    }
    const ch = line[i];
    const next = line[i + 1];
    if (ch === '/' && next === '/') {
      out += ' '.repeat(line.length - i);
      return { code: out, inBlockComment: false };
    }
    if (ch === '/' && next === '*') {
      out += '  ';
      i += 2;
      inBlockComment = true;
      continue;
    }
    if (ch === '"') {
      out += ' ';
      i++;
      while (i < line.length && line[i] !== '"') {
        if (line[i] === '\\' && i + 1 < line.length) { out += '  '; i += 2; }
        else { out += ' '; i++; }
      }
      if (i < line.length) { out += ' '; i++; }
      continue;
    }
    if (ch === '\'') {
      out += ' ';
      i++;
      while (i < line.length && line[i] !== '\'') {
        if (line[i] === '\\' && i + 1 < line.length) { out += '  '; i += 2; }
        else { out += ' '; i++; }
      }
      if (i < line.length) { out += ' '; i++; }
      continue;
    }
    out += ch;
    i++;
  }
  return { code: out, inBlockComment };
}

export function parseTraceOutput(rawStdout: string): ParsedTrace {
  const lines = rawStdout.split('\n');
  const clean: string[] = [];
  const frames: TraceFrame[] = [];
  const liveVars = new Map<string, TraceVariable>();
  let truncated = false;

  for (const ln of lines) {
    if (ln.startsWith(TRACE_MARKER)) {
      const body = ln.slice(TRACE_MARKER.length);
      const parts = body.split('|');
      // Format: <step>|<line>|<method>|<name>|<value...>
      if (parts.length >= 5) {
        const step = parseInt(parts[0], 10);
        const line = parseInt(parts[1], 10);
        const method = parts[2];
        const name = parts[3];
        const rawValue = parts.slice(4).join('|');
        if (name === POS_MARKER) {
          frames.push({
            step,
            line,
            method,
            variables: new Map(liveVars),
          });
        } else {
          liveVars.set(name, { value: rawValue, line, step });
        }
      }
    } else {
      clean.push(ln);
    }
  }
  if (frames.length >= MAX_TRACE_PER_RUN) truncated = true;
  return {
    frames,
    cleanOutput: clean.join('\n').replace(/\n+$/, ''),
    truncated,
  };
}
