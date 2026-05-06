/**
 * C# tracer: instruments user code so that after running we can replay execution
 * line-by-line. Provides "time-travel debugging" — the program runs once, every
 * line and variable change is captured, the UI lets you step / set breakpoints /
 * continue across the recorded frames.
 *
 * Two kinds of trace markers:
 *   __TRACE__:<step>|<line>|<varName>|<value>     → variable update
 *   __TRACE__:<step>|<line>|@@POS@@|              → "we just finished line N"
 *
 * Position markers anchor frames (one frame = one executed line).
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

export interface TraceVariable {
  value: string;
  line: number;
  step: number;
}

/** A single frame in the recorded execution — "paused after line N". */
export interface TraceFrame {
  step: number;
  line: number;
  /** Snapshot of every variable known at this frame, keyed by name. */
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
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith('//')) continue;
    // Skip for-loop headers (multiple ; in one line); skip pure braces / control words
    if (/^\s*for\s*\(/.test(code)) continue;
    if (trimmed === '{' || trimmed === '}' || trimmed === '{}') continue;
    if (/^\s*(?:if|else|while|do|switch|case|default|return|break|continue|try|catch|finally)\b/.test(trimmed) && !/;\s*$/.test(trimmed)) {
      // Control-flow header without trailing `;` — don't emit a position here
      continue;
    }

    // Variable-update Mark calls (existing behavior)
    const decl = code.match(TYPE_DECL_RE);
    if (decl) {
      out.push(traceCall(lineNo, decl[1]));
    } else {
      const compound = code.match(COMPOUND_RE);
      if (compound) {
        out.push(traceCall(lineNo, compound[1]));
      } else {
        const assign = code.match(ASSIGN_RE);
        if (assign && !PRIMITIVE_TYPES.has(assign[1])) {
          out.push(traceCall(lineNo, assign[1]));
        } else {
          const inc = code.match(INC_DEC_RE);
          if (inc && /\+\+|--/.test(code)) {
            out.push(traceCall(lineNo, inc[1]));
          }
        }
      }
    }

    // Always emit a position marker after the line — anchors a frame
    out.push(`        __Tracer.Pos(${lineNo});`);
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
    public static void Pos(int line)
    {
        if (_count >= ${MAX_TRACE_PER_RUN}) return;
        _count++;
        _step++;
        System.Console.WriteLine("${TRACE_MARKER}" + _step + "|" + line + "|${POS_MARKER}|");
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
      if (parts.length >= 4) {
        const step = parseInt(parts[0], 10);
        const line = parseInt(parts[1], 10);
        const name = parts[2];
        const rawValue = parts.slice(3).join('|');
        if (name === POS_MARKER) {
          frames.push({
            step,
            line,
            variables: new Map(liveVars), // snapshot
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
