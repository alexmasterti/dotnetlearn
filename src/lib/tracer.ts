/**
 * C# tracer: rewrites user code to emit `__TRACE__:` lines that we parse client-side
 * to render a step-by-step variable timeline.
 *
 * No real debugger protocol - we inject `__Tracer.Mark(line, name, value)` calls
 * after every recognizable assignment/declaration/inc/dec. Each Mark prints
 * directly to stdout, so the trace is captured even if user code throws or returns.
 *
 * Strategy:
 *   1) Variable declarations:   `int x = 5;`     -> + emit (line, "x", x)
 *   2) Compound assignments:    `x += 1;`        -> + emit (line, "x", x)
 *   3) Plain assignments:       `x = x * 2;`     -> + emit (line, "x", x)
 *   4) Increment/decrement:     `i++;`  `--n;`   -> + emit (line, name, name)
 *
 * Limitations:
 *  - Multi-variable declarations like `int a = 1, b = 2;` are not split (we trace `a` only)
 *  - Skips `for(...)` headers - those are tracked via the loop body's assignments
 *  - Only instruments inside method bodies (brace depth >= 2)
 */

const TRACE_MARKER = '__TRACE__:';
const MAX_TRACE_PER_RUN = 500;

const PRIMITIVE_TYPES = new Set([
  'int', 'long', 'short', 'byte', 'sbyte', 'uint', 'ulong', 'ushort',
  'float', 'double', 'decimal', 'bool', 'char', 'string', 'var',
]);

export interface TraceEntry {
  step: number;
  line: number;
  name: string;
  value: string;
}

export interface ParsedTrace {
  entries: TraceEntry[];
  cleanOutput: string;
  truncated: boolean;
}

export function instrumentCSharp(source: string): string {
  const lines = source.split('\n');
  const out: string[] = [];
  let inBlockComment = false;
  let depth = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const lineNo = i + 1;
    const stripped = stripStringsAndComments(raw, inBlockComment);
    inBlockComment = stripped.inBlockComment;
    const code = stripped.code;

    for (const ch of code) {
      if (ch === '{') depth++;
      else if (ch === '}') depth = Math.max(0, depth - 1);
    }

    out.push(raw);

    if (depth < 2) continue;
    if (/__Tracer\./.test(raw)) continue;
    if (raw.trim().startsWith('//')) continue;
    // Skip for-loop headers (they have multiple ; on one line)
    if (/^\s*for\s*\(/.test(code)) continue;

    // Declaration: int x = ...; / var foo = ...;
    const decl = code.match(/^\s*(?:(?:int|long|short|byte|sbyte|uint|ulong|ushort|float|double|decimal|bool|char|string|var)(?:\[\])?)\s+([A-Za-z_]\w*)\s*=\s*[^;]+;\s*$/);
    if (decl) {
      out.push(traceCall(lineNo, decl[1]));
      continue;
    }

    // Compound assignment: x += 1;
    const compound = code.match(/^\s*([A-Za-z_]\w*)\s*(?:\+|-|\*|\/|%|&|\||\^)=\s*[^;]+;\s*$/);
    if (compound) {
      out.push(traceCall(lineNo, compound[1]));
      continue;
    }

    // Plain assignment: x = ...;
    const assign = code.match(/^\s*([A-Za-z_]\w*)\s*=\s*[^=;][^;]*;\s*$/);
    if (assign && !PRIMITIVE_TYPES.has(assign[1])) {
      out.push(traceCall(lineNo, assign[1]));
      continue;
    }

    // Increment/decrement: x++; --y;
    const inc = code.match(/^\s*(?:\+\+|--)?([A-Za-z_]\w*)(?:\+\+|--)?\s*;\s*$/);
    if (inc && /\+\+|--/.test(code)) {
      out.push(traceCall(lineNo, inc[1]));
      continue;
    }
  }

  return out.join('\n') + '\n' + TRACER_FOOTER;
}

function traceCall(lineNo: number, varName: string): string {
  return `        __Tracer.Mark(${lineNo}, "${varName}", ${varName});`;
}

const TRACER_FOOTER = `// === auto-injected by DotNetLearn ===
internal static class __Tracer
{
    static int _step = 0;
    static int _count = 0;
    public static T Mark<T>(int line, string name, T value)
    {
        if (_count >= ${MAX_TRACE_PER_RUN}) return value;
        _count++;
        _step++;
        System.Console.WriteLine("${TRACE_MARKER}" + _step + "|" + line + "|" + name + "|" + Format((object)value));
        return value;
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
  const entries: TraceEntry[] = [];
  const clean: string[] = [];
  let truncated = false;
  for (const ln of lines) {
    if (ln.startsWith(TRACE_MARKER)) {
      const body = ln.slice(TRACE_MARKER.length);
      const parts = body.split('|');
      if (parts.length >= 4) {
        entries.push({
          step: parseInt(parts[0], 10),
          line: parseInt(parts[1], 10),
          name: parts[2],
          value: parts.slice(3).join('|'),
        });
      }
    } else {
      clean.push(ln);
    }
  }
  if (entries.length >= MAX_TRACE_PER_RUN) truncated = true;
  return {
    entries,
    cleanOutput: clean.join('\n').replace(/\n+$/, ''),
    truncated,
  };
}
