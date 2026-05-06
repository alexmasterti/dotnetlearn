import { useState, useEffect, useCallback } from 'react';
import type { ChallengeExercise } from '../types';
import { CodeEditor } from './CodeEditor';
import { useCSharpRunner, snippetAroundLine } from '../hooks/useCSharpRunner';
import type { DiagnosticItem } from '../hooks/useCSharpRunner';

interface ChallengeViewProps {
  challenge: ChallengeExercise;
  onComplete: () => void;
  isCompleted: boolean;
}

interface TestResult {
  passed: boolean;
  description: string;
  expected: string;
  actual: string;
  error?: string;
}

const difficultyColors = {
  easy: 'text-success bg-success/15 border-success/30',
  medium: 'text-yellow-400 bg-yellow-400/15 border-yellow-400/30',
  hard: 'text-red-400 bg-red-400/15 border-red-400/30',
};

export function ChallengeView({ challenge, onComplete, isCompleted }: ChallengeViewProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [results, setResults] = useState<TestResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([]);
  const [running, setRunning] = useState(false);
  const [allPassed, setAllPassed] = useState(false);
  const [hintLevel, setHintLevel] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const { runCode, loading } = useCSharpRunner();

  const handleRun = useCallback(async () => {
    if (running || loading) return;
    setRunning(true);
    setError(null);
    setDiagnostics([]);
    setResults([]);
    setAllPassed(false);

    // We avoid System.Text.Json since mono mcs (the runtime backing our
    // execution sandbox) doesn't ship that assembly. Test cases are embedded
    // as parallel verbatim string arrays, results are emitted line-by-line
    // using a `__R__|...` delimiter format.
    const escapeForVerbatim = (s: string) => s.replace(/"/g, '""');
    const tcInputs = challenge.testCases.map(t => `@"${escapeForVerbatim(t.input)}"`).join(', ');
    const tcExpected = challenge.testCases.map(t => `@"${escapeForVerbatim(t.expected)}"`).join(', ');
    const tcDesc = challenge.testCases.map(t => `@"${escapeForVerbatim(t.description)}"`).join(', ');

    const testCode = `using System;
using System.Reflection;
using System.Collections.Generic;

${code}

class __TestRunner__
{
    static string Esc(string s)
    {
        if (s == null) return "";
        return s.Replace("\\\\", "\\\\\\\\").Replace("|", "\\\\p").Replace("\\n", "\\\\n").Replace("\\r", "");
    }

    static void Main()
    {
        Console.OutputEncoding = System.Text.Encoding.UTF8;
        string[] inputs = { ${tcInputs} };
        string[] expecteds = { ${tcExpected} };
        string[] descs = { ${tcDesc} };

        for (int idx = 0; idx < inputs.Length; idx++)
        {
            string inputStr = inputs[idx];
            string expectedStr = expecteds[idx].Trim();
            string desc = descs[idx];
            try
            {
                var solution = new Solution();
                var method = typeof(Solution).GetMethod("${challenge.functionName}");
                if (method == null)
                {
                    Console.WriteLine("__R__|" + idx + "|F||" + Esc(expectedStr) + "||" + Esc(desc) + "|" + Esc("Method '${challenge.functionName}' not found in Solution class"));
                    continue;
                }

                var parameters = method.GetParameters();
                var args = new object[parameters.Length];
                if (parameters.Length == 1)
                {
                    args[0] = ParseArg(inputStr, parameters[0].ParameterType);
                }
                else
                {
                    var parts = SplitArgs(inputStr);
                    for (int i = 0; i < parameters.Length && i < parts.Count; i++)
                        args[i] = ParseArg(parts[i], parameters[i].ParameterType);
                }

                var actual = method.Invoke(solution, args);
                var actualStr = FormatResult(actual);
                bool passed = actualStr == expectedStr;
                Console.WriteLine("__R__|" + idx + "|" + (passed ? "P" : "F") + "|" + Esc(expectedStr) + "|" + Esc(actualStr) + "|" + Esc(desc) + "|");
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException ?? ex;
                Console.WriteLine("__R__|" + idx + "|F|" + Esc(expectedStr) + "||" + Esc(desc) + "|" + Esc(inner.GetType().Name + ": " + inner.Message));
            }
        }
    }

    static object ParseArg(string s, Type t)
    {
        s = s.Trim();
        if (t == typeof(int)) return int.Parse(s);
        if (t == typeof(long)) return long.Parse(s);
        if (t == typeof(double)) return double.Parse(s, System.Globalization.CultureInfo.InvariantCulture);
        if (t == typeof(float)) return float.Parse(s, System.Globalization.CultureInfo.InvariantCulture);
        if (t == typeof(bool)) return bool.Parse(s);
        if (t == typeof(string)) return s.Trim('"').Trim('\\'');
        if (t == typeof(char)) return s.Trim('\\'')[0];
        if (t == typeof(int[]))
        {
            s = s.Trim('[', ']', '{', '}');
            if (string.IsNullOrWhiteSpace(s)) return new int[0];
            var parts = s.Split(',');
            var arr = new int[parts.Length];
            for (int i = 0; i < parts.Length; i++) arr[i] = int.Parse(parts[i].Trim());
            return arr;
        }
        if (t == typeof(string[]))
        {
            s = s.Trim('[', ']', '{', '}');
            if (string.IsNullOrWhiteSpace(s)) return new string[0];
            var parts = s.Split(',');
            var arr = new string[parts.Length];
            for (int i = 0; i < parts.Length; i++) arr[i] = parts[i].Trim().Trim('"').Trim('\\'');
            return arr;
        }
        return s;
    }

    static List<string> SplitArgs(string s)
    {
        var parts = new List<string>();
        int depth = 0;
        int start = 0;
        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] == '[' || s[i] == '{' || s[i] == '(') depth++;
            else if (s[i] == ']' || s[i] == '}' || s[i] == ')') depth--;
            else if (s[i] == ',' && depth == 0)
            {
                parts.Add(s.Substring(start, i - start).Trim());
                start = i + 1;
            }
        }
        parts.Add(s.Substring(start).Trim());
        return parts;
    }

    static string FormatResult(object val)
    {
        if (val == null) return "null";
        if (val is int[]) return "[" + string.Join(", ", (int[])val) + "]";
        if (val is string[])
        {
            var sa = (string[])val;
            var parts = new string[sa.Length];
            for (int i = 0; i < sa.Length; i++) parts[i] = "\\"" + sa[i] + "\\"";
            return "[" + string.Join(", ", parts) + "]";
        }
        if (val is bool) return ((bool)val) ? "True" : "False";
        return val.ToString();
    }
}`;

    const result = await runCode(testCode);
    setRunning(false);

    if (result.error) {
      setError(result.error);
      // Map diagnostic line numbers from the test harness back into user-visible
      // lines. The harness prepends 4 lines (`using System;`, `using
      // System.Reflection;`, `using System.Collections.Generic;`, blank) before
      // the user's code.
      const HARNESS_PREFIX_LINES = 4;
      const userDiagnostics = (result.diagnostics ?? [])
        .map((d) => ({ ...d, line: d.line - HARNESS_PREFIX_LINES }))
        .filter((d) => d.line > 0 && d.line <= code.split('\n').length);
      setDiagnostics(userDiagnostics);
      return;
    }

    const parsed: TestResult[] = [];
    for (const line of result.output.split('\n')) {
      if (!line.startsWith('__R__|')) continue;
      // Format: __R__|<idx>|<P|F>|<expected>|<actual>|<desc>|<error>
      const parts = line.split('|');
      if (parts.length < 7) continue;
      const unesc = (s: string) => s
        .replace(/\\n/g, '\n')
        .replace(/\\p/g, '|')
        .replace(/\\\\/g, '\\');
      parsed.push({
        passed: parts[2] === 'P',
        expected: unesc(parts[3]),
        actual: unesc(parts[4]),
        description: unesc(parts[5]),
        error: unesc(parts.slice(6).join('|')) || undefined,
      });
    }

    if (parsed.length === 0) {
      setError(`Could not run tests. Make sure your Solution class has a public method "${challenge.functionName}".`);
      return;
    }

    setResults(parsed);
    const passed = parsed.every(r => r.passed);
    setAllPassed(passed);
    if (passed && !isCompleted) {
      setTimeout(() => onComplete(), 800);
    }
  }, [code, challenge, isCompleted, loading, onComplete, runCode, running]);

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
    setCode(challenge.starterCode);
    setResults([]);
    setError(null);
    setAllPassed(false);
    setShowSolution(false);
  };

  const passedCount = results.filter(r => r.passed).length;

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-4rem)] p-4 slide-up">
      {/* Left: Problem description */}
      <div className="lg:w-2/5 h-64 lg:h-auto bg-dark-800 rounded-xl border border-dark-600 p-5 overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs px-2 py-0.5 rounded-md border font-bold uppercase ${difficultyColors[challenge.difficulty]}`}>
            {challenge.difficulty}
          </span>
          <span className="text-xs text-slate-500">Challenge</span>
        </div>

        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap mb-6">
          {challenge.description}
        </div>

        <div className="space-y-4 mb-6">
          {challenge.examples.map((ex, i) => (
            <div key={i} className="bg-dark-900 border border-dark-600 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-2 font-bold">Example {i + 1}</div>
              <div className="font-mono text-xs space-y-1">
                <div><span className="text-slate-500">Input: </span><span className="text-emerald-300">{ex.input}</span></div>
                <div><span className="text-slate-500">Output: </span><span className="text-emerald-300">{ex.output}</span></div>
                {ex.explanation && (
                  <div className="text-slate-400 mt-1 font-sans">{ex.explanation}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <button
            onClick={() => setHintLevel(h => Math.min(h + 1, challenge.hints.length - 1))}
            className="text-sm text-accent hover:text-accent-light transition-colors"
          >
            {hintLevel < 0 ? 'Need a hint?' : `Hint ${hintLevel + 1}/${challenge.hints.length}`}
          </button>
          {hintLevel >= 0 && (
            <div className="mt-2 space-y-2">
              {challenge.hints.slice(0, hintLevel + 1).map((hint, i) => (
                <div key={i} className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm text-accent-light">
                  {hint}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showSolution ? 'Hide solution' : 'Show solution'}
          </button>
          {showSolution && (
            <pre className="mt-2 bg-dark-900 border border-dark-600 rounded-lg p-3 text-xs text-emerald-300 font-mono overflow-x-auto">
              {challenge.solution}
            </pre>
          )}
        </div>
      </div>

      {/* Right: Editor + Test Results */}
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
            {running ? 'Testing...' : 'Run Tests'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors"
          >
            Reset
          </button>
          <span className="text-xs text-slate-600 hidden sm:inline">Ctrl+Enter to run</span>
          {results.length > 0 && (
            <span className={`ml-auto font-bold text-sm ${allPassed ? 'text-success xp-pop' : 'text-slate-400'}`}>
              {allPassed ? 'All tests passed!' : `${passedCount}/${results.length} passed`}
            </span>
          )}
          {isCompleted && results.length === 0 && (
            <span className="ml-auto text-success/60 text-sm">Previously completed</span>
          )}
        </div>

        <div className={`bg-dark-800 rounded-xl border p-4 min-h-[120px] max-h-[250px] overflow-y-auto ${
          error ? 'border-red-500/40' : allPassed ? 'border-success/40' : 'border-dark-600'
        }`}>
          <div className="text-xs text-slate-500 mb-3 uppercase tracking-wider">Test Results</div>

          {error && (
            <div>
              <pre className="text-red-400 text-sm whitespace-pre-wrap mb-2">{error}</pre>
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

          {results.length === 0 && !error && (
            <span className="text-slate-600 italic text-sm">Run your code to see test results</span>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 text-sm p-2 rounded-lg ${
                    r.passed ? 'bg-success/5' : 'bg-red-500/5'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">{r.passed ? '\u2714' : '\u2718'}</span>
                  <div className="min-w-0">
                    <div className={r.passed ? 'text-success' : 'text-red-400'}>
                      {r.description}
                    </div>
                    {!r.passed && !r.error && (
                      <div className="text-xs text-slate-500 mt-1 font-mono">
                        <span className="text-slate-400">Expected:</span> {r.expected}
                        <br />
                        <span className="text-slate-400">Got:</span> {r.actual}
                      </div>
                    )}
                    {r.error && (
                      <div className="text-xs mt-1 font-mono text-red-400">{r.error}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
