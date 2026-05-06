import { useState, useCallback } from 'react';

const WANDBOX_URL = 'https://wandbox.org/api/compile.json';
const COMPILER = 'mono-6.12.0.199';

export interface DiagnosticItem {
  line: number;
  column: number;
  code: string;       // e.g. "CS1002"
  severity: 'error' | 'warning';
  message: string;
}

export interface RunResult {
  output: string;
  error: string | null;
  /** Structured compile/runtime diagnostics, when available. */
  diagnostics?: DiagnosticItem[];
  /** Stack trace (for runtime errors only). */
  stack?: string;
}

interface WandboxResponse {
  status?: string;
  signal?: string;
  compiler_output?: string;
  compiler_error?: string;
  compiler_message?: string;
  program_output?: string;
  program_error?: string;
  program_message?: string;
}

export function useCSharpRunner() {
  const [loading, setLoading] = useState(false);

  const runCode = useCallback(async (code: string): Promise<RunResult> => {
    setLoading(true);

    try {
      const response = await fetch(WANDBOX_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, compiler: COMPILER, save: false }),
      });

      if (!response.ok) {
        setLoading(false);
        return {
          output: '',
          error: `Execution service responded with HTTP ${response.status}. Please try again.`,
        };
      }

      const data: WandboxResponse = await response.json();
      setLoading(false);

      const compileText = (data.compiler_error || '').trim();
      if (compileText) {
        const diagnostics = parseCSharpDiagnostics(compileText);
        const friendly = diagnostics.length > 0
          ? formatDiagnostics(diagnostics)
          : cleanError(compileText);
        return { output: '', error: friendly, diagnostics };
      }

      const runtimeText = (data.program_error || '').trim();
      const programOut = (data.program_output || '').replace(/\n$/, '');

      // Mono prints "Unhandled Exception:" to program_error on runtime crashes
      if (runtimeText && /Exception/.test(runtimeText)) {
        const { message, stack } = parseRuntimeError(runtimeText);
        return { output: programOut, error: message, stack };
      }

      // Non-zero exit code without an exception trace
      if (data.status && data.status !== '0') {
        const errText = runtimeText || compileText || `Process exited with status ${data.status}.`;
        return { output: programOut, error: cleanError(errText) };
      }

      return { output: programOut, error: null };
    } catch {
      setLoading(false);
      return {
        output: '',
        error: 'Network error reaching the C# execution service. Check your internet connection.',
      };
    }
  }, []);

  return { runCode, loading, ready: true };
}

/**
 * Parse Roslyn/mcs-style compile output:
 *   prog.cs(7,21): error CS1002: ; expected
 *   /tmp/.../Program.cs(7,21): error CS1002: ; expected
 */
function parseCSharpDiagnostics(text: string): DiagnosticItem[] {
  const items: DiagnosticItem[] = [];
  const re = /(?:^|\s|\/)(?:Program|prog)\.cs\((\d+),(\d+)\):\s*(error|warning)\s+([A-Z]+\d+):\s*(.+?)(?=(?:\n(?:\s|\/)*(?:Program|prog)\.cs\()|\n\n|$)/gms;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    items.push({
      line: parseInt(m[1], 10),
      column: parseInt(m[2], 10),
      severity: m[3] as 'error' | 'warning',
      code: m[4],
      message: m[5].replace(/\s+/g, ' ').trim(),
    });
  }
  return items;
}

function formatDiagnostics(items: DiagnosticItem[]): string {
  const errors = items.filter((d) => d.severity === 'error');
  const warnings = items.filter((d) => d.severity === 'warning');
  const lines: string[] = [];

  if (errors.length > 0) {
    lines.push(`${errors.length} compile error${errors.length === 1 ? '' : 's'}:`);
    errors.slice(0, 8).forEach((d) => {
      lines.push(`  Line ${d.line}, Col ${d.column}  [${d.code}]  ${d.message}`);
    });
    if (errors.length > 8) lines.push(`  ...and ${errors.length - 8} more`);
  }
  if (warnings.length > 0 && errors.length === 0) {
    lines.push(`${warnings.length} warning${warnings.length === 1 ? '' : 's'}:`);
    warnings.slice(0, 5).forEach((d) => {
      lines.push(`  Line ${d.line}, Col ${d.column}  [${d.code}]  ${d.message}`);
    });
  }
  return lines.join('\n');
}

function parseRuntimeError(stderr: string): { message: string; stack: string } {
  const cleaned = cleanError(stderr);
  const lines = cleaned.split('\n');
  const headLine = lines.find((l) => /Exception:/.test(l)) || lines[0] || cleaned;
  const stackLines = lines.filter((l) => /^\s+at\s+/.test(l));
  const stack = stackLines.join('\n');

  const lineMatch = stack.match(/(?:Program|prog)\.cs[:(](?:line\s*)?(\d+)/i);
  const lineHint = lineMatch ? ` (Line ${lineMatch[1]})` : '';
  return {
    message: `${headLine.trim()}${lineHint}`,
    stack,
  };
}

function cleanError(err: string): string {
  return err
    .replace(/\/tmp\/[a-f0-9-]+\//g, '')
    .replace(/\/private\/tmp\/[a-f0-9-]+\//g, '')
    .replace(/(?:Program|prog)\.cs\((\d+),(\d+)\)/g, 'Program.cs(Line $1, Col $2)')
    .trim();
}

/** Get N lines of code around a target line, 1-based, for inline error display. */
export function snippetAroundLine(source: string, targetLine: number, ctx = 2): { line: number; text: string; isTarget: boolean }[] {
  const all = source.split('\n');
  const start = Math.max(1, targetLine - ctx);
  const end = Math.min(all.length, targetLine + ctx);
  const out: { line: number; text: string; isTarget: boolean }[] = [];
  for (let i = start; i <= end; i++) {
    out.push({ line: i, text: all[i - 1] ?? '', isTarget: i === targetLine });
  }
  return out;
}
