import { useEffect, useMemo, useRef, useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { useCSharpRunner } from '../hooks/useCSharpRunner';
import type { DiagnosticItem } from '../hooks/useCSharpRunner';
import { snippetAroundLine } from '../hooks/useCSharpRunner';
import { instrumentCSharp, parseTraceOutput, type TraceEntry } from '../lib/tracer';

const STORAGE_CODE = 'dotnetlearn_playground_code';
const STORAGE_SAVED_AT = 'dotnetlearn_playground_saved_at';
const SAVE_DEBOUNCE_MS = 600;

const DEFAULT_CODE = `using System;

class Program
{
    static void Main()
    {
        // Try Trace mode! Click "Run with Trace" to see how each variable evolves.
        int total = 0;
        for (int i = 1; i <= 5; i++)
        {
            total += i;
        }
        Console.WriteLine($"The sum 1..5 = {total}");
    }
}
`;

interface SavedState {
  code: string;
  savedAt: string | null;
}

function loadSaved(): SavedState {
  try {
    const code = localStorage.getItem(STORAGE_CODE);
    const savedAt = localStorage.getItem(STORAGE_SAVED_AT);
    if (code && code.length > 0) return { code, savedAt };
  } catch { /* ignore */ }
  return { code: DEFAULT_CODE, savedAt: null };
}

function formatRelative(iso: string | null): string {
  if (!iso) return '';
  const ms = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(ms) || ms < 0) return '';
  const s = Math.floor(ms / 1000);
  if (s < 5) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function Playground() {
  const initial = useMemo(() => loadSaved(), []);
  const [code, setCode] = useState(initial.code);
  const [savedAt, setSavedAt] = useState<string | null>(initial.savedAt);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([]);
  const [stack, setStack] = useState<string | null>(null);
  const [traceEntries, setTraceEntries] = useState<TraceEntry[]>([]);
  const [traceTruncated, setTraceTruncated] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [, setTick] = useState(0); // forces re-render so "saved Xs ago" stays fresh
  const { runCode, loading } = useCSharpRunner();

  // Debounced auto-save
  const saveTimer = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_CODE, code);
        const now = new Date().toISOString();
        localStorage.setItem(STORAGE_SAVED_AT, now);
        setSavedAt(now);
      } catch { /* quota or disabled */ }
    }, SAVE_DEBOUNCE_MS);
    return () => { if (saveTimer.current) window.clearTimeout(saveTimer.current); };
  }, [code]);

  // Tick once a second to refresh the "Xs ago" label
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 5000);
    return () => window.clearInterval(id);
  }, []);

  const resetState = () => {
    setOutput(null);
    setError(null);
    setDiagnostics([]);
    setStack(null);
    setTraceEntries([]);
    setTraceTruncated(false);
    setStepIdx(0);
  };

  const handleRun = async (withTrace: boolean) => {
    if (running || loading) return;
    setRunning(true);
    resetState();
    const sourceToRun = withTrace ? instrumentCSharp(code) : code;
    const result = await runCode(sourceToRun);
    setRunning(false);
    if (result.error) {
      setError(result.error);
      setDiagnostics(result.diagnostics ?? []);
      setStack(result.stack ?? null);
      // Even with errors, try to surface any partial trace
      if (withTrace) {
        const parsed = parseTraceOutput(result.output);
        setTraceEntries(parsed.entries);
        setTraceTruncated(parsed.truncated);
        setOutput(parsed.cleanOutput);
      } else {
        setOutput(result.output);
      }
      return;
    }
    if (withTrace) {
      const parsed = parseTraceOutput(result.output);
      setTraceEntries(parsed.entries);
      setTraceTruncated(parsed.truncated);
      setOutput(parsed.cleanOutput);
      setStepIdx(parsed.entries.length > 0 ? 1 : 0);
    } else {
      setOutput(result.output);
    }
  };

  // Ctrl/Cmd+Enter to run (no trace), Ctrl/Cmd+Shift+Enter to run with trace
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) handleRun(true);
        else handleRun(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, running, loading]);

  const handleClear = () => {
    if (confirm('Reset playground code to the default snippet?')) {
      setCode(DEFAULT_CODE);
      resetState();
    }
  };

  const handleClearSaved = () => {
    try {
      localStorage.removeItem(STORAGE_CODE);
      localStorage.removeItem(STORAGE_SAVED_AT);
    } catch { /* ignore */ }
    setSavedAt(null);
    setCode(DEFAULT_CODE);
    resetState();
  };

  const visibleSteps = traceEntries.slice(0, stepIdx);
  const currentStep = traceEntries[stepIdx - 1] ?? null;
  // Build current variable snapshot up to stepIdx
  const snapshot = useMemo(() => {
    const map = new Map<string, { value: string; line: number; step: number }>();
    for (const e of visibleSteps) {
      map.set(e.name, { value: e.value, line: e.line, step: e.step });
    }
    return Array.from(map.entries()).map(([name, info]) => ({ name, ...info }));
  }, [visibleSteps]);

  const hasError = !!error;
  const hasTrace = traceEntries.length > 0;

  return (
    <div className="flex flex-col h-[calc(100vh-1rem)] p-4 slide-up">
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-white">C# Playground</h2>
          <p className="text-sm text-slate-400">Auto-saves every keystroke - your work waits for you tomorrow.</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          {savedAt && <span title={new Date(savedAt).toLocaleString()}>{`Saved ${formatRelative(savedAt)}`}</span>}
          {savedAt && (
            <button
              onClick={handleClearSaved}
              className="text-slate-500 hover:text-red-400 transition-colors"
              title="Forget saved code and restore the default snippet"
            >
              Clear saved
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 mb-3">
        <CodeEditor value={code} onChange={setCode} />
      </div>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <button
          onClick={() => handleRun(false)}
          disabled={running || loading}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all ${
            running || loading
              ? 'bg-dark-600 text-slate-400 cursor-wait'
              : 'bg-accent hover:bg-accent-light text-dark-900 hover:scale-105'
          }`}
        >
          {running ? 'Compiling...' : '▶ Run'}
        </button>
        <button
          onClick={() => handleRun(true)}
          disabled={running || loading}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold transition-all ${
            running || loading
              ? 'bg-dark-600 text-slate-400 cursor-wait'
              : 'bg-purple-600 hover:bg-purple-500 text-white'
          }`}
          title="Run with the step debugger - traces every variable change"
        >
          {'🐛'} Run with Trace
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors"
        >
          Reset to default
        </button>
        <span className="text-xs text-slate-500 ml-auto hidden md:inline">
          Ctrl+Enter to run · Ctrl+Shift+Enter to trace
        </span>
      </div>

      <div className={`grid gap-3 ${hasTrace ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Output / Errors panel */}
        <div
          className={`bg-dark-800 rounded-xl border p-4 min-h-[180px] max-h-[300px] overflow-y-auto font-mono text-sm ${
            hasError ? 'border-red-500/40' : 'border-dark-600'
          }`}
        >
          <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-2">
            {hasError ? 'Error' : 'Output'}
            {hasError && diagnostics.length > 0 && (
              <span className="text-red-400 normal-case">{diagnostics.length} diagnostic{diagnostics.length === 1 ? '' : 's'}</span>
            )}
          </div>

          {output !== null && !hasError && (
            <pre className="text-slate-200 whitespace-pre-wrap">{output || '(no output)'}</pre>
          )}

          {output && hasError && (
            <pre className="text-slate-400 whitespace-pre-wrap mb-2 pb-2 border-b border-dark-600">
              {output}
            </pre>
          )}

          {hasError && (
            <div className="space-y-3">
              <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
              {diagnostics.map((d, i) => (
                <DiagnosticBlock key={i} diag={d} source={code} />
              ))}
              {stack && (
                <details className="text-xs text-slate-500">
                  <summary className="cursor-pointer hover:text-slate-300">Show stack trace</summary>
                  <pre className="mt-2 whitespace-pre-wrap">{stack}</pre>
                </details>
              )}
            </div>
          )}

          {output === null && !hasError && (
            <span className="text-slate-600 italic">Run your code to see output here.</span>
          )}
        </div>

        {/* Trace panel */}
        {hasTrace && (
          <div className="bg-dark-800 rounded-xl border border-purple-500/30 p-4 min-h-[180px] max-h-[300px] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-purple-400 uppercase tracking-wider">
                Trace · step {stepIdx} / {traceEntries.length}
                {traceTruncated && <span className="ml-2 text-yellow-400">(truncated at 500)</span>}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setStepIdx(0)}
                  className="px-2 py-1 text-xs rounded text-slate-400 hover:text-white hover:bg-dark-700"
                  title="Reset to before any steps"
                >⏮</button>
                <button
                  onClick={() => setStepIdx((s) => Math.max(0, s - 1))}
                  disabled={stepIdx === 0}
                  className="px-2 py-1 text-xs rounded text-slate-400 hover:text-white hover:bg-dark-700 disabled:opacity-30"
                >⏪</button>
                <button
                  onClick={() => setStepIdx((s) => Math.min(traceEntries.length, s + 1))}
                  disabled={stepIdx === traceEntries.length}
                  className="px-2 py-1 text-xs rounded text-slate-400 hover:text-white hover:bg-dark-700 disabled:opacity-30"
                >⏩</button>
                <button
                  onClick={() => setStepIdx(traceEntries.length)}
                  className="px-2 py-1 text-xs rounded text-slate-400 hover:text-white hover:bg-dark-700"
                  title="Jump to last step"
                >⏭</button>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={traceEntries.length}
              value={stepIdx}
              onChange={(e) => setStepIdx(parseInt(e.target.value, 10))}
              className="w-full mb-3 accent-purple-500"
            />

            <div className="grid grid-cols-2 gap-2 min-h-0 flex-1 overflow-hidden">
              <div className="overflow-y-auto pr-2 border-r border-dark-700">
                <div className="text-[10px] text-slate-500 uppercase mb-1">Steps</div>
                {visibleSteps.length === 0 && (
                  <div className="text-xs text-slate-600 italic">Move the slider to step through.</div>
                )}
                {visibleSteps.map((e) => (
                  <div
                    key={e.step}
                    className={`text-xs font-mono px-2 py-1 rounded mb-1 ${
                      currentStep && e.step === currentStep.step
                        ? 'bg-purple-500/20 text-purple-200'
                        : 'text-slate-400'
                    }`}
                  >
                    <span className="text-slate-600">L{e.line}</span>{' '}
                    <span className="text-emerald-300">{e.name}</span>
                    <span className="text-slate-500"> = </span>
                    <span className="text-slate-200">{e.value}</span>
                  </div>
                ))}
              </div>

              <div className="overflow-y-auto pl-1">
                <div className="text-[10px] text-slate-500 uppercase mb-1">Variables now</div>
                {snapshot.length === 0 && (
                  <div className="text-xs text-slate-600 italic">No variables tracked yet.</div>
                )}
                {snapshot.map((s) => (
                  <div key={s.name} className="text-xs font-mono mb-1">
                    <span className="text-emerald-300">{s.name}</span>
                    <span className="text-slate-500"> = </span>
                    <span className="text-slate-200">{s.value}</span>
                    <span className="text-slate-600"> · L{s.line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DiagnosticBlock({ diag, source }: { diag: DiagnosticItem; source: string }) {
  const snippet = snippetAroundLine(source, diag.line, 2);
  const tone = diag.severity === 'error' ? 'text-red-400' : 'text-yellow-400';
  return (
    <div className="bg-dark-900 border border-dark-600 rounded-lg p-3">
      <div className={`text-xs font-bold ${tone} mb-2`}>
        Line {diag.line}, Col {diag.column}  ·  [{diag.code}]  ·  {diag.severity}
      </div>
      <div className="text-sm text-slate-200 mb-2 font-sans">{diag.message}</div>
      <div className="text-xs font-mono">
        {snippet.map((s) => (
          <div
            key={s.line}
            className={`flex gap-2 ${
              s.isTarget ? 'bg-red-500/10 text-red-200 -mx-2 px-2 rounded' : 'text-slate-500'
            }`}
          >
            <span className="select-none w-8 text-right text-slate-600">{s.line}</span>
            <pre className="whitespace-pre overflow-x-auto">{s.text || ' '}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
