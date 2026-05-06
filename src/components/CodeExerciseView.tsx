import { useState, useEffect, useCallback } from 'react';
import type { CodeExercise } from '../types';
import { CodeEditor } from './CodeEditor';
import { useCSharpRunner, snippetAroundLine } from '../hooks/useCSharpRunner';
import type { DiagnosticItem } from '../hooks/useCSharpRunner';

interface CodeExerciseViewProps {
  exercise: CodeExercise;
  onComplete: () => void;
  isCompleted: boolean;
}

export function CodeExerciseView({ exercise, onComplete, isCompleted }: CodeExerciseViewProps) {
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([]);
  const [passed, setPassed] = useState(false);
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const { runCode, loading } = useCSharpRunner();

  const handleRun = useCallback(async () => {
    if (running || loading) return;
    setRunning(true);
    setError(null);
    setDiagnostics([]);
    setOutput(null);
    setPassed(false);

    const result = await runCode(code);
    setRunning(false);

    if (result.error) {
      setError(result.error);
      setDiagnostics(result.diagnostics ?? []);
      return;
    }

    setOutput(result.output);

    const allPassed = exercise.tests.every((test) => {
      return result.output.trim() === test.expectedOutput.trim();
    });

    if (allPassed) {
      setPassed(true);
      if (!isCompleted) {
        setTimeout(() => onComplete(), 800);
      }
    }
  }, [code, exercise.tests, isCompleted, loading, onComplete, runCode, running]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleRun]);

  const handleReset = () => {
    setCode(exercise.starterCode);
    setOutput(null);
    setError(null);
    setDiagnostics([]);
    setPassed(false);
    setShowSolution(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-4rem)] p-4 slide-up">
      {/* Left: Instructions */}
      <div className="lg:w-2/5 h-48 lg:h-auto bg-dark-800 rounded-xl border border-dark-600 p-5 overflow-y-auto">
        <h3 className="text-lg font-bold text-white mb-4">Instructions</h3>
        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
          {exercise.instructions.split('```').map((part, i) => {
            if (i % 2 === 1) {
              const lines = part.split('\n');
              const content = lines.slice(1).join('\n') || lines[0];
              return (
                <pre
                  key={i}
                  className="bg-dark-900 border border-dark-600 rounded-lg p-3 my-3 text-emerald-300 font-mono text-xs overflow-x-auto"
                >
                  {content.trim()}
                </pre>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </div>

        {exercise.hints && exercise.hints.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setShowHint((h) => Math.min(h + 1, exercise.hints!.length - 1))}
              className="text-sm text-accent hover:text-accent-light transition-colors"
            >
              {showHint < 0 ? 'Need a hint?' : `Hint ${showHint + 1}/${exercise.hints.length}`}
            </button>
            {showHint >= 0 && (
              <div className="mt-2 bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm text-accent-light">
                {exercise.hints[showHint]}
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showSolution ? 'Hide solution' : 'Show solution'}
          </button>
          {showSolution && (
            <pre className="mt-2 bg-dark-900 border border-dark-600 rounded-lg p-3 text-xs text-emerald-300 font-mono overflow-x-auto">
              {exercise.solution}
            </pre>
          )}
        </div>
      </div>

      {/* Right: Editor + Output */}
      <div className="lg:w-3/5 flex flex-col gap-3 min-h-0 flex-1">
        <div className="flex-1 min-h-0">
          <CodeEditor value={code} onChange={setCode} />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleRun}
            disabled={running || loading}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg font-bold transition-all ${
              running || loading
                ? 'bg-dark-600 text-slate-400 cursor-wait'
                : 'bg-accent hover:bg-accent-light text-dark-900 hover:scale-105'
            }`}
          >
            {running ? 'Compiling...' : '\u25B6 Run'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors"
          >
            Reset
          </button>
          <span className="text-xs text-slate-600 hidden sm:inline">Ctrl+Enter to run</span>
          {passed && (
            <span className="ml-auto text-success font-bold flex items-center gap-2 xp-pop">
              {'\u2705'} All tests passed!
            </span>
          )}
          {isCompleted && !passed && (
            <span className="ml-auto text-success/60 text-sm">Previously completed</span>
          )}
        </div>

        <div
          className={`bg-dark-800 rounded-xl border p-4 min-h-[100px] max-h-[200px] overflow-y-auto font-mono text-sm ${
            error ? 'border-red-500/40' : passed ? 'border-success/40' : 'border-dark-600'
          }`}
        >
          <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Output</div>
          {output !== null && (
            <pre className="text-slate-200 whitespace-pre-wrap">{output || '(no output)'}</pre>
          )}
          {error && (
            <div>
              <pre className="text-red-400 whitespace-pre-wrap mb-3">{error}</pre>
              {diagnostics.map((d, i) => (
                <div key={i} className="bg-dark-900 border border-red-500/20 rounded-lg p-2 mb-2">
                  <div className="text-xs text-red-400 mb-1 font-bold">
                    Line {d.line}, Col {d.column} · [{d.code}]
                  </div>
                  <div className="text-xs text-slate-300 mb-2 font-sans">{d.message}</div>
                  <div className="text-[11px] font-mono">
                    {snippetAroundLine(code, d.line, 2).map((s) => (
                      <div
                        key={s.line}
                        className={`flex gap-2 ${
                          s.isTarget ? 'bg-red-500/10 text-red-200' : 'text-slate-500'
                        }`}
                      >
                        <span className="select-none w-7 text-right text-slate-600">{s.line}</span>
                        <pre className="whitespace-pre overflow-x-auto">{s.text || ' '}</pre>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {output === null && !error && (
            <span className="text-slate-600 italic">Run your code to see output here</span>
          )}

          {output !== null && !error && (
            <div className="mt-3 pt-3 border-t border-dark-600">
              {exercise.tests.map((test, i) => {
                const testPassed = output.trim() === test.expectedOutput.trim();
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-xs ${
                      testPassed ? 'text-success' : 'text-red-400'
                    }`}
                  >
                    <span>{testPassed ? '\u2714' : '\u2718'}</span>
                    <span>{test.description}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
