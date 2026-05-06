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

// Matches any local declaration: `<Type[generics][?][[]]> name = ...;`
// Type can be a primitive (int, string), `var`, a user type (Vehicule),
// dotted (System.Text.StringBuilder), generic (List<int>), array (int[]),
// nullable (string?). Names starting with a leading uppercase identifier are
// the user-defined-type case; matching is conservative — must have a real
// `=` (not `==`) and end with `;`.
const TYPE_DECL_RE = /^\s*(?:[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)(?:<[^>;{}]+>)?(?:\[\])?\??\s+([A-Za-z_]\w*)\s*=\s*[^=;][^;]*;\s*$/;
const COMPOUND_RE = /^\s*([A-Za-z_]\w*)\s*(?:\+|-|\*|\/|%|&|\||\^)=\s*[^;]+;\s*$/;
const ASSIGN_RE = /^\s*([A-Za-z_]\w*)\s*=\s*[^=;][^;]*;\s*$/;
const INC_DEC_RE = /^\s*(?:\+\+|--)?([A-Za-z_]\w*)(?:\+\+|--)?\s*;\s*$/;

// `if(...){...}` / `while(...){...}` / single-line method bodies all share
// the shape `... ){ stmt; }` on one source line. Mono compiles them fine but
// our depth-tracking instrumentation skips them. Pre-expand to multi-line so
// the body is at depth >= 2 across multiple lines and gets instrumented.
const SINGLE_LINE_BODY_RE = /^(\s*)(.*?\)\s*)\{\s*(.+;)\s*\}\s*$/;

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
  /**
   * Runtime call depth at this frame. 1 = top-level method (Main), 2 = first
   * callee of Main, etc. Tracked via injected `__Tracer.Enter()`/`Leave()`
   * around method bodies. Used by Step Over (advance until depth ≤ current),
   * Step Out (advance until depth < current), and per-scope variable filter.
   */
  depth: number;
  variables: Map<string, TraceVariable>;
}

export interface ParsedTrace {
  frames: TraceFrame[];
  cleanOutput: string;
  truncated: boolean;
}

/**
 * Pre-expand single-line bodies like `{ stmt; }` into multi-line form so the
 * statement inside ends up at instrumentable depth. Returns both the expanded
 * source and a parallel array mapping each expanded line back to the original
 * 1-based line number — used so trace markers report the user's line.
 */
function expandSingleLineBodies(source: string): { expanded: string; lineMap: number[] } {
  const inLines = source.split('\n');
  const out: string[] = [];
  const lineMap: number[] = [];
  for (let i = 0; i < inLines.length; i++) {
    const userLine = i + 1;
    const line = inLines[i];
    const m = line.match(SINGLE_LINE_BODY_RE);
    if (m) {
      const indent = m[1];
      const sig = m[2];
      // Split body on `;` outside of strings (best-effort: mask strings then split)
      const body = m[3].trim();
      const masked = maskStringsAndCharsInline(body);
      const positions: number[] = [];
      for (let p = 0; p < masked.length; p++) if (masked[p] === ';') positions.push(p);
      const stmts: string[] = [];
      let start = 0;
      for (const pos of positions) {
        const piece = body.slice(start, pos).trim();
        if (piece) stmts.push(piece);
        start = pos + 1;
      }
      out.push(`${indent}${sig}{`);
      lineMap.push(userLine);
      for (const s of stmts) {
        out.push(`${indent}    ${s};`);
        lineMap.push(userLine);
      }
      out.push(`${indent}}`);
      lineMap.push(userLine);
    } else {
      out.push(line);
      lineMap.push(userLine);
    }
  }
  return { expanded: out.join('\n'), lineMap };
}

function maskStringsAndCharsInline(s: string): string {
  let out = '';
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === '"' || ch === '\'') {
      out += ' ';
      i++;
      const close = ch;
      while (i < s.length && s[i] !== close) {
        if (s[i] === '\\' && i + 1 < s.length) { out += '  '; i += 2; }
        else { out += ' '; i++; }
      }
      if (i < s.length) { out += ' '; i++; }
    } else {
      out += ch;
      i++;
    }
  }
  return out;
}

export function instrumentCSharp(source: string): string {
  const { expanded, lineMap } = expandSingleLineBodies(source);
  const lines = expanded.split('\n');
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
    // Use the user's original line number so the editor highlights the right line
    // even after we've expanded `{ stmt; }` into multi-line form.
    const lineNo = lineMap[i] ?? (i + 1);
    const stripped = stripStringsAndComments(raw, inBlockComment);
    inBlockComment = stripped.inBlockComment;
    const code = stripped.code;

    // Snapshot state at the START of this line — that's what determines
    // whether the user's statement on this line is "inside a method body".
    // Computing this AFTER brace-walking would incorrectly include method-
    // declaration lines (depth=1 at start, then `{` opens to 2).
    const startDepth = depth;
    const startMethod = methodStack[methodStack.length - 1] ?? '';
    const wasInMethodBody = startDepth >= 2 && startMethod !== '';

    // While at class-body depth (1) we look for method signatures.
    if (depth === 1 && pendingMethodName === null) {
      const sigMatch = code.match(/(?<!\.)\b([A-Za-z_]\w*)\s*\([^)]*\)\s*(?:\{|=>|$)/);
      if (sigMatch) {
        const name = sigMatch[1];
        if (!KEYWORDS_NOT_METHODS.has(name)) pendingMethodName = name;
      }
    }

    // Walk characters; track depth and method-stack transitions.
    // Detect line-level "this line opens a method body" / "this line closes
    // it" so we can inject __Tracer.Enter()/Leave() in the right spots.
    let methodOpenedHere = false;
    let methodClosedHere = false;
    for (const ch of code) {
      if (ch === '{') {
        depth++;
        if (depth === 2 && pendingMethodName) {
          methodStack.push(pendingMethodName);
          pendingMethodName = null;
          methodOpenedHere = true;
        }
      } else if (ch === '}') {
        if (depth === 2 && methodStack.length > 0) {
          methodStack.pop();
          methodClosedHere = true;
        }
        depth = Math.max(0, depth - 1);
      }
    }
    if (depth === 1 && code.trim().endsWith(';')) {
      // `abstract void Foo();` etc. — drop pending without push.
      pendingMethodName = null;
    }

    const trimmed = raw.trim();
    const isComment = !trimmed || trimmed.startsWith('//');
    const isPureBrace = trimmed === '{' || trimmed === '}' || trimmed === '{}';
    const isForHeader = /^\s*for\s*\(/.test(code);
    const isControlOnly = /^\s*(?:if|else|while|do|switch|case|default|try|catch|finally)\b/.test(trimmed) && !/;\s*$/.test(trimmed);
    const alreadyInstrumented = /__Tracer\./.test(raw);

    const shouldInstrument =
      wasInMethodBody &&
      !isComment &&
      !isPureBrace &&
      !isForHeader &&
      !isControlOnly &&
      !alreadyInstrumented;
    const currentMethod = startMethod;

    // If this line CLOSES a method body, emit `} finally { Leave(); }`
    // BEFORE the user's `}` so the try block we opened on the matching open
    // gets closed cleanly. Skip if the close `}` isn't the leading char of
    // the line (we'd otherwise generate broken syntax). With well-formed
    // Allman/K&R braces this is always the case.
    if (methodClosedHere && /^\s*\}/.test(raw)) {
      out.push(`        } finally { __Tracer.Leave(); }`);
    }

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

    // If this line OPENS a method body, emit `Enter(); try {` AFTER the
    // user's `{` so the try wraps the entire body. Skip if the open `{`
    // wasn't the trailing char of the line (we'd otherwise inject inside a
    // statement). Well-formed Allman/K&R always has `{` at end-of-line.
    if (methodOpenedHere && /\{\s*$/.test(raw)) {
      out.push(`        __Tracer.Enter(); try {`);
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
    static int _depth = 0;
    public static void Enter() { _depth++; }
    public static void Leave() { if (_depth > 0) _depth--; }
    public static T Mark<T>(int line, string method, string name, T value)
    {
        if (_count >= ${MAX_TRACE_PER_RUN}) return value;
        _count++;
        _step++;
        var v = (object)value;
        System.Console.WriteLine("${TRACE_MARKER}" + _step + "|" + line + "|" + method + "|" + _depth + "|" + name + "|" + Format(v));
        DumpFields(line, method, name, v);
        return value;
    }
    public static void Pos(int line, string method)
    {
        if (_count >= ${MAX_TRACE_PER_RUN}) return;
        _count++;
        _step++;
        System.Console.WriteLine("${TRACE_MARKER}" + _step + "|" + line + "|" + method + "|" + _depth + "|${POS_MARKER}|");
    }
    static bool IsSimple(System.Type t)
    {
        if (t == null) return false;
        var nt = System.Nullable.GetUnderlyingType(t);
        if (nt != null) t = nt;
        if (t.IsPrimitive) return true;
        if (t.IsEnum) return true;
        if (t == typeof(string) || t == typeof(decimal)) return true;
        return false;
    }
    static void DumpFields(int line, string method, string baseName, object v)
    {
        if (v == null) return;
        var t = v.GetType();
        if (IsSimple(t)) return;
        if (v is System.Collections.IEnumerable) return;
        if (t.Namespace != null && t.Namespace.StartsWith("System")) return;
        try
        {
            var flags = System.Reflection.BindingFlags.Instance
                      | System.Reflection.BindingFlags.Public
                      | System.Reflection.BindingFlags.NonPublic;
            var seen = new System.Collections.Generic.HashSet<string>();
            var fields = t.GetFields(flags);
            for (int i = 0; i < fields.Length; i++)
            {
                var f = fields[i];
                if (f.IsStatic) continue;
                if (f.Name.Length > 0 && f.Name[0] == '<') continue;
                if (!IsSimple(f.FieldType)) continue;
                object fv;
                try { fv = f.GetValue(v); } catch { continue; }
                if (_count >= ${MAX_TRACE_PER_RUN}) return;
                _count++;
                _step++;
                seen.Add(f.Name);
                System.Console.WriteLine("${TRACE_MARKER}" + _step + "|" + line + "|" + method + "|" + _depth + "|" + baseName + "." + f.Name + "|" + Format(fv));
            }
            var props = t.GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
            for (int i = 0; i < props.Length; i++)
            {
                var p = props[i];
                if (!p.CanRead) continue;
                if (seen.Contains(p.Name)) continue;
                if (p.GetIndexParameters().Length > 0) continue;
                if (!IsSimple(p.PropertyType)) continue;
                object pv;
                try { pv = p.GetValue(v, null); } catch { continue; }
                if (_count >= ${MAX_TRACE_PER_RUN}) return;
                _count++;
                _step++;
                System.Console.WriteLine("${TRACE_MARKER}" + _step + "|" + line + "|" + method + "|" + _depth + "|" + baseName + "." + p.Name + "|" + Format(pv));
            }
        }
        catch { }
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
  // We track each variable's owning depth so on each Pos we can drop ones
  // declared inside callees that have since returned (Leave decremented
  // _depth; the next Pos sees the lower depth). This implements per-scope
  // filtering without needing a separate scope-end marker.
  interface LiveVar { value: string; line: number; step: number; depth: number; }
  const liveVars = new Map<string, LiveVar>();
  let truncated = false;

  for (const ln of lines) {
    if (!ln.startsWith(TRACE_MARKER)) {
      clean.push(ln);
      continue;
    }
    const body = ln.slice(TRACE_MARKER.length);
    const parts = body.split('|');
    // Format: <step>|<line>|<method>|<depth>|<name>|<value...>
    if (parts.length < 6) continue;
    const step = parseInt(parts[0], 10);
    const line = parseInt(parts[1], 10);
    const method = parts[2];
    const depth = parseInt(parts[3], 10);
    const name = parts[4];
    const rawValue = parts.slice(5).join('|');
    if (name === POS_MARKER) {
      // Drop variables that lived at deeper scopes (those callees have
      // returned by the time control reached this Pos).
      const stale: string[] = [];
      for (const [k, v] of liveVars) if (v.depth > depth) stale.push(k);
      for (const k of stale) liveVars.delete(k);
      const snapshot = new Map<string, TraceVariable>();
      for (const [k, v] of liveVars) {
        snapshot.set(k, { value: v.value, line: v.line, step: v.step });
      }
      frames.push({ step, line, method, depth, variables: snapshot });
    } else {
      liveVars.set(name, { value: rawValue, line, step, depth });
    }
  }
  if (frames.length >= MAX_TRACE_PER_RUN) truncated = true;
  return {
    frames,
    cleanOutput: clean.join('\n').replace(/\n+$/, ''),
    truncated,
  };
}
