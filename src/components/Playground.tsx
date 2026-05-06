import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { CodeEditor } from './CodeEditor';
import { useCSharpRunner } from '../hooks/useCSharpRunner';
import type { DiagnosticItem } from '../hooks/useCSharpRunner';
import { snippetAroundLine } from '../hooks/useCSharpRunner';
import { instrumentCSharp, parseTraceOutput, type TraceFrame } from '../lib/tracer';

const STORAGE_CODE = 'dotnetlearn_playground_code';
const STORAGE_SAVED_AT = 'dotnetlearn_playground_saved_at';
const STORAGE_BREAKPOINTS = 'dotnetlearn_playground_breakpoints';
const SAVE_DEBOUNCE_MS = 600;

const DEFAULT_CODE = `using System;

class Program
{
    static void Main()
    {
        // Set a breakpoint by clicking the gutter, then click "Debug" below.
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
  breakpoints: number[];
}

function loadSaved(): SavedState {
  try {
    const code = localStorage.getItem(STORAGE_CODE);
    const savedAt = localStorage.getItem(STORAGE_SAVED_AT);
    const bpRaw = localStorage.getItem(STORAGE_BREAKPOINTS);
    const breakpoints = bpRaw ? (JSON.parse(bpRaw) as number[]) : [];
    if (code && code.length > 0) return { code, savedAt, breakpoints };
  } catch { /* ignore */ }
  return { code: DEFAULT_CODE, savedAt: null, breakpoints: [] };
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
  const [breakpoints, setBreakpoints] = useState<Set<number>>(() => new Set(initial.breakpoints));

  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([]);
  const [stack, setStack] = useState<string | null>(null);

  const [frames, setFrames] = useState<TraceFrame[]>([]);
  const [frameIdx, setFrameIdx] = useState(0); // 0 = before any frame, frames.length = at end
  const [traceTruncated, setTraceTruncated] = useState(false);

  const [running, setRunning] = useState(false);
  const [, setTick] = useState(0);
  const { runCode, loading } = useCSharpRunner();

  // Persist code (debounced)
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

  // Persist breakpoints
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BREAKPOINTS, JSON.stringify(Array.from(breakpoints)));
    } catch { /* ignore */ }
  }, [breakpoints]);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 5000);
    return () => window.clearInterval(id);
  }, []);

  const toggleBreakpoint = useCallback((line: number) => {
    setBreakpoints((prev) => {
      const next = new Set(prev);
      if (next.has(line)) next.delete(line);
      else next.add(line);
      return next;
    });
  }, []);

  const resetState = () => {
    setOutput(null);
    setError(null);
    setDiagnostics([]);
    setStack(null);
    setFrames([]);
    setTraceTruncated(false);
    setFrameIdx(0);
  };

  const handleRun = async (withDebugger: boolean) => {
    if (running || loading) return;
    setRunning(true);
    resetState();
    const sourceToRun = withDebugger ? instrumentCSharp(code) : code;
    const result = await runCode(sourceToRun);
    setRunning(false);

    setOutput(withDebugger ? null : result.output);
    setDiagnostics(result.diagnostics ?? []);
    if (result.error) {
      setError(result.error);
      setStack(result.stack ?? null);
    }

    if (withDebugger) {
      const parsed = parseTraceOutput(result.output);
      setFrames(parsed.frames);
      setTraceTruncated(parsed.truncated);
      setOutput(parsed.cleanOutput);

      if (parsed.frames.length > 0) {
        // If breakpoints exist, jump to the first breakpoint hit; otherwise stop at first frame.
        let initialFrame = 1;
        if (breakpoints.size > 0) {
          const hit = parsed.frames.findIndex((f) => breakpoints.has(f.line));
          if (hit >= 0) initialFrame = hit + 1;
        }
        setFrameIdx(initialFrame);
      }
    }
  };

  const handleClearCode = () => {
    if (confirm('Reset playground code to the default snippet?')) {
      setCode(DEFAULT_CODE);
      resetState();
    }
  };

  const handleClearSaved = () => {
    try {
      localStorage.removeItem(STORAGE_CODE);
      localStorage.removeItem(STORAGE_SAVED_AT);
      localStorage.removeItem(STORAGE_BREAKPOINTS);
    } catch { /* ignore */ }
    setSavedAt(null);
    setCode(DEFAULT_CODE);
    setBreakpoints(new Set<number>());
    resetState();
  };

  // === Debugger controls ===

  const inDebugger = frames.length > 0;
  const currentFrame = frameIdx > 0 && frameIdx <= frames.length ? frames[frameIdx - 1] : null;

  const stepInto = useCallback(() => {
    setFrameIdx((i) => Math.min(i + 1, frames.length));
  }, [frames.length]);

  const stepOver = useCallback(() => {
    setFrameIdx((current) => {
      const cur = frames[current - 1];
      if (!cur) return Math.min(current + 1, frames.length);
      // Real call-depth tracking via __Tracer.Enter()/Leave(): advance until
      // the next frame is back at our depth or shallower. Skips over deeper
      // frames (callees we descended into), correctly handles recursion.
      let i = current;
      while (i < frames.length && frames[i].depth > cur.depth) i++;
      return Math.min(i + 1, frames.length);
    });
  }, [frames]);

  const stepOut = useCallback(() => {
    setFrameIdx((current) => {
      const cur = frames[current - 1];
      if (!cur) return Math.min(current + 1, frames.length);
      // Run current method to completion: advance until depth drops below
      // current. That's the first frame in a caller of the current method.
      let i = current;
      while (i < frames.length && frames[i].depth >= cur.depth) i++;
      return Math.min(i + 1, frames.length);
    });
  }, [frames]);

  const stepBack = useCallback(() => {
    setFrameIdx((i) => Math.max(i - 1, 0));
  }, []);

  const continueRun = useCallback(() => {
    setFrameIdx((current) => {
      for (let i = current; i < frames.length; i++) {
        if (breakpoints.has(frames[i].line)) {
          return i + 1;
        }
      }
      return frames.length;
    });
  }, [frames, breakpoints]);

  const restartDebugger = useCallback(() => {
    if (frames.length === 0) return;
    let initial = 1;
    if (breakpoints.size > 0) {
      const hit = frames.findIndex((f) => breakpoints.has(f.line));
      if (hit >= 0) initial = hit + 1;
    }
    setFrameIdx(initial);
  }, [frames, breakpoints]);

  const stopDebugger = useCallback(() => {
    setFrames([]);
    setFrameIdx(0);
    setTraceTruncated(false);
  }, []);

  // Keyboard shortcuts (Ctrl+Enter to run, plus VS-Code-style debugger keys)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) handleRun(true);
        else handleRun(false);
        return;
      }
      if (frames.length === 0) return;
      switch (e.key) {
        case 'F5':
          e.preventDefault();
          if (e.shiftKey) stopDebugger();
          else if (e.ctrlKey || e.metaKey) restartDebugger();
          else continueRun();
          break;
        case 'F10':
          e.preventDefault();
          stepOver();
          break;
        case 'F11':
          e.preventDefault();
          if (e.shiftKey) stepOut();
          else stepInto();
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames.length, breakpoints, stepOver, stepInto, stepOut, continueRun, restartDebugger, stopDebugger]);

  const variablesAtCurrent = currentFrame
    ? Array.from(currentFrame.variables.entries()).map(([name, info]) => ({ name, ...info }))
    : [];

  // Map<name, value> for the editor's hover tooltips. Null when not paused.
  const hoverVariables = currentFrame
    ? new Map(Array.from(currentFrame.variables.entries()).map(([n, v]) => [n, v.value]))
    : null;

  // Walk back from the current frame, picking up one frame at each lower
  // depth — that gives us the chain of method calls leading here. Returned
  // top-down (deepest first), so the UI can render bottom-up like VS Code's
  // call stack.
  const callStack = useMemo(() => {
    if (!currentFrame || frameIdx <= 0) return [];
    const stack: { method: string; line: number; depth: number }[] = [];
    let cur = currentFrame;
    stack.push({ method: cur.method, line: cur.line, depth: cur.depth });
    let i = frameIdx - 2;
    while (i >= 0 && cur.depth > 1) {
      while (i >= 0 && frames[i].depth >= cur.depth) i -= 1;
      if (i < 0) break;
      cur = frames[i];
      stack.push({ method: cur.method, line: cur.line, depth: cur.depth });
      i -= 1;
    }
    return stack;
  }, [currentFrame, frameIdx, frames]);

  // While stepping, show only the output produced up to the current frame
  // so it appears progressively (matches a real debugger). Outside debug
  // mode or after the last frame, show the full captured output.
  const displayedOutput = inDebugger
    ? currentFrame
      ? currentFrame.output
      : ''
    : output;

  const hasError = !!error;

  return (
    <div className="flex flex-col h-[calc(100vh-1rem)] p-4 slide-up">
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-white">C# Playground</h2>
          <p className="text-sm text-slate-400">
            Click the left gutter to set a breakpoint, then click <span className="text-purple-300">Debug</span>.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          {savedAt && <span title={new Date(savedAt).toLocaleString()}>{`Saved ${formatRelative(savedAt)}`}</span>}
          {savedAt && (
            <button
              onClick={handleClearSaved}
              className="text-slate-500 hover:text-red-400 transition-colors"
              title="Forget saved code, breakpoints, and restore the default snippet"
            >
              Clear saved
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 mb-3">
        <CodeEditor
          value={code}
          onChange={setCode}
          breakpoints={breakpoints}
          onToggleBreakpoint={toggleBreakpoint}
          currentLine={currentFrame?.line ?? null}
          variables={hoverVariables}
        />
      </div>

      {/* Top bar: Run / Debug / Reset */}
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
          title="Run with the time-travel debugger - record the run, then step through it"
        >
          {'🐛'} Debug
        </button>
        <button
          onClick={handleClearCode}
          className="px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors"
        >
          Reset code
        </button>
        <span className="text-xs text-slate-500 ml-auto hidden md:inline">
          {breakpoints.size > 0 ? (
            <>{breakpoints.size} breakpoint{breakpoints.size === 1 ? '' : 's'}</>
          ) : (
            <>Ctrl+Enter run · Ctrl+Shift+Enter debug</>
          )}
        </span>
      </div>

      {/* Debugger controls strip - only visible while debugging */}
      {inDebugger && (
        <div className="flex items-center gap-2 mb-3 flex-wrap bg-purple-500/10 border border-purple-500/30 rounded-lg p-2">
          <span className="text-xs text-purple-300 uppercase font-bold mr-2">Debug</span>
          <DebuggerButton onClick={stepBack} disabled={frameIdx <= 0} title="Step Back (one frame earlier)">
            ⏪ Back
          </DebuggerButton>
          <DebuggerButton onClick={stepOver} disabled={frameIdx >= frames.length} title="Step Over · F10">
            ↷ Step Over
          </DebuggerButton>
          <DebuggerButton onClick={stepInto} disabled={frameIdx >= frames.length} title="Step Into · F11">
            ↓ Step Into
          </DebuggerButton>
          <DebuggerButton onClick={stepOut} disabled={frameIdx >= frames.length} title="Step Out · Shift+F11">
            ↑ Step Out
          </DebuggerButton>
          <DebuggerButton onClick={continueRun} disabled={frameIdx >= frames.length} title="Continue · F5">
            ▶ Continue
          </DebuggerButton>
          <DebuggerButton onClick={restartDebugger} title="Restart · Ctrl+Shift+F5">
            ⟲ Restart
          </DebuggerButton>
          <DebuggerButton onClick={stopDebugger} title="Stop · Shift+F5" className="text-red-400 hover:text-red-300">
            ■ Stop
          </DebuggerButton>
          <div className="ml-auto flex items-center gap-3 text-xs">
            {currentFrame ? (
              <span className="text-purple-200">
                in <span className="font-mono font-bold">{currentFrame.method || '?'}</span>
                <span className="text-purple-400 mx-1">·</span>
                line <span className="font-mono font-bold">{currentFrame.line}</span>
              </span>
            ) : (
              <span className="text-slate-500">not yet started</span>
            )}
            <span className="text-slate-500">
              frame {frameIdx} / {frames.length}
              {traceTruncated && <span className="ml-1 text-yellow-400">(truncated)</span>}
            </span>
          </div>
        </div>
      )}

      {/* Frame slider for free scrubbing */}
      {inDebugger && (
        <input
          type="range"
          min={0}
          max={frames.length}
          value={frameIdx}
          onChange={(e) => setFrameIdx(parseInt(e.target.value, 10))}
          className="w-full mb-3 accent-purple-500"
        />
      )}

      <div className={`grid gap-3 ${inDebugger ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Output / errors panel */}
        <div
          className={`bg-dark-800 rounded-xl border p-4 min-h-[180px] max-h-[260px] overflow-y-auto font-mono text-sm ${
            hasError ? 'border-red-500/40' : 'border-dark-600'
          }`}
        >
          <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-2">
            {hasError ? 'Error' : 'Output'}
          </div>

          {output !== null && !hasError && (
            <pre className="text-slate-200 whitespace-pre-wrap">{displayedOutput || (inDebugger ? '(no output yet)' : '(no output)')}</pre>
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

          {!hasError && diagnostics.length > 0 && (
            <div className="mt-3 pt-3 border-t border-dark-600 space-y-3">
              <div className="text-xs text-yellow-400 uppercase tracking-wider">
                {diagnostics.length} warning{diagnostics.length === 1 ? '' : 's'} — code still ran
              </div>
              {diagnostics.map((d, i) => (
                <DiagnosticBlock key={i} diag={d} source={code} />
              ))}
            </div>
          )}

          {output === null && !hasError && (
            <span className="text-slate-600 italic">Run your code to see output here.</span>
          )}
        </div>

        {/* Variables + Call Stack panel */}
        {inDebugger && (
          <div className="bg-dark-800 rounded-xl border border-purple-500/30 p-4 min-h-[180px] max-h-[320px] overflow-y-auto">
            {callStack.length > 0 && (
              <div className="mb-4 pb-3 border-b border-dark-700">
                <div className="text-xs text-purple-400 uppercase tracking-wider mb-2">
                  Call Stack
                </div>
                <div className="space-y-0.5">
                  {/* Render bottom-up: caller first, current method last (matches VS Code). */}
                  {[...callStack].reverse().map((f, i) => {
                    const isCurrent = i === callStack.length - 1;
                    return (
                      <div
                        key={`${f.method}-${i}`}
                        className={`flex items-center gap-2 text-xs font-mono ${
                          isCurrent ? 'text-amber-300' : 'text-slate-400'
                        }`}
                      >
                        <span className="text-slate-600 w-4 text-right">{i + 1}</span>
                        <span className="flex-1 truncate" title={`${f.method} at line ${f.line}`}>
                          {isCurrent && <span className="text-amber-500 mr-1">▶</span>}
                          {f.method || '<top>'}
                        </span>
                        <span className="text-slate-600 text-[10px]">L{f.line}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="text-xs text-purple-400 uppercase tracking-wider mb-2">Variables</div>
            {variablesAtCurrent.length === 0 ? (
              <div className="text-xs text-slate-600 italic">No variables yet at this point.</div>
            ) : (
              <div className="space-y-1">
                {variablesAtCurrent.map((v) => (
                  <div key={v.name} className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-emerald-300 min-w-[80px]">{v.name}</span>
                    <span className="text-slate-500">=</span>
                    <span className="text-slate-200 flex-1 truncate" title={v.value}>{v.value}</span>
                    <span className="text-slate-600 text-[10px]" title={`Set on line ${v.line}`}>L{v.line}</span>
                  </div>
                ))}
              </div>
            )}
            {breakpoints.size > 0 && (
              <div className="mt-4 pt-3 border-t border-dark-700">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                  Breakpoints ({breakpoints.size})
                </div>
                <div className="flex flex-wrap gap-1">
                  {Array.from(breakpoints).sort((a, b) => a - b).map((ln) => (
                    <button
                      key={ln}
                      onClick={() => toggleBreakpoint(ln)}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-red-500/15 text-red-300 hover:bg-red-500/25"
                      title="Click to remove"
                    >
                      L{ln} ✕
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DebuggerButton({
  onClick,
  disabled,
  title,
  children,
  className = '',
}: {
  onClick: () => void;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`px-2.5 py-1 rounded text-sm transition-colors ${
        disabled
          ? 'text-slate-600 cursor-not-allowed'
          : `text-slate-200 hover:bg-purple-500/20 hover:text-white ${className}`
      }`}
    >
      {children}
    </button>
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
