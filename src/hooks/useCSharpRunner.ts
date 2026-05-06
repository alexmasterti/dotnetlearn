import { useState, useCallback } from 'react';

// .NET 9 runner — self-hosted ASP.NET Core minimal API on Railway.
// Falls back to the Railway runner URL if the env var isn't injected at
// build time (the typical Railway dotnetlearn build sets it).
const RUNNER_URL =
  import.meta.env.VITE_RUNNER_URL ||
  'https://runner-net9-production.up.railway.app';

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

interface RunnerResponse {
  stdout: string;
  stderr: string;
  diagnostics: Array<{
    line: number;
    column: number;
    severity: string; // "error" | "warning"
    code: string;
    message: string;
  }>;
  exitCode: number;
  timedOut: boolean;
  compileFailed: boolean;
}

export function useCSharpRunner() {
  const [loading, setLoading] = useState(false);

  const runCode = useCallback(async (code: string): Promise<RunResult> => {
    setLoading(true);

    try {
      const response = await fetch(`${RUNNER_URL}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        setLoading(false);
        return {
          output: '',
          error: `Execution service responded with HTTP ${response.status}. Please try again.`,
        };
      }

      const data: RunnerResponse = await response.json();
      setLoading(false);

      const diagnostics: DiagnosticItem[] = data.diagnostics.map((d) => ({
        line: d.line,
        column: d.column,
        code: d.code,
        severity: d.severity === 'error' ? 'error' : 'warning',
        message: d.message,
      }));
      const errorDiagnostics = diagnostics.filter((d) => d.severity === 'error');

      if (data.compileFailed || errorDiagnostics.length > 0) {
        const friendly = diagnostics.length > 0
          ? formatDiagnostics(diagnostics)
          : cleanError(data.stderr || 'Compilation failed.');
        return { output: '', error: friendly, diagnostics };
      }

      const programOut = (data.stdout || '').replace(/\n$/, '');
      const runtimeText = (data.stderr || '').trim();

      if (data.timedOut) {
        return {
          output: programOut,
          error: 'Execution timed out (15s limit). Check for infinite loops.',
          diagnostics,
        };
      }

      // .NET prints "Unhandled exception." then the exception type/message and a stack
      // to stderr on runtime crashes. exitCode reflects the abort signal (often 134).
      if (runtimeText && /Exception/.test(runtimeText)) {
        const { message, stack } = parseRuntimeError(runtimeText);
        return { output: programOut, error: message, stack, diagnostics };
      }

      // Non-zero exit code without an exception trace — surface stderr if present.
      if (data.exitCode !== 0) {
        const errText = runtimeText || `Process exited with code ${data.exitCode}.`;
        return { output: programOut, error: cleanError(errText), diagnostics };
      }

      return { output: programOut, error: null, diagnostics };
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
  const headLine = lines.find((l) => /Exception/.test(l)) || lines[0] || cleaned;
  const stackLines = lines.filter((l) => /^\s+at\s+/.test(l));
  const stack = stackLines.join('\n');

  const lineMatch = stack.match(/Program\.cs[:(](?:line\s*)?(\d+)/i);
  const lineHint = lineMatch ? ` (Line ${lineMatch[1]})` : '';
  return {
    message: `${headLine.trim()}${lineHint}`,
    stack,
  };
}

function cleanError(err: string): string {
  return err
    .replace(/\/tmp\/run-[a-f0-9]+\//g, '')
    .replace(/\/private\/var\/folders\/[^\s]+\/T\/run-[a-f0-9]+\//g, '')
    .replace(/Program\.cs[:(](?:line\s*)?(\d+)\)?/g, 'Program.cs(Line $1)')
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
