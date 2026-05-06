#!/usr/bin/env node
/**
 * Curriculum smoke test: every `code`-type lesson's `solution` is sent to
 * the .NET 9 runner; we assert it compiles and produces the right output.
 *
 * Challenges go further: we build the same test harness ChallengeView uses
 * in the app, run the solution against every test case, and verify each
 * `__R__|...|P|...` row reports PASS. So curriculum drift OR harness drift
 * both surface here, not just at first user click.
 *
 * Runs solutions in parallel batches; exits non-zero on any failure.
 */

import { csharpCourse } from '../src/data/csharp-curriculum.ts';

const RUNNER = process.env.RUNNER_URL || 'https://runner-net9-production.up.railway.app';
const BATCH_SIZE = Number(process.env.BATCH_SIZE || 6);

// Mirror of ChallengeView.tsx's harness — kept as a backtick-template so the
// embedded `${...}` placeholders fill in per-challenge.
function buildChallengeHarness(challenge, solution) {
  const escapeForVerbatim = (s) => s.replace(/"/g, '""');
  const tcInputs = challenge.testCases.map((t) => `@"${escapeForVerbatim(t.input)}"`).join(', ');
  const tcExpected = challenge.testCases.map((t) => `@"${escapeForVerbatim(t.expected)}"`).join(', ');
  const tcDesc = challenge.testCases.map((t) => `@"${escapeForVerbatim(t.description)}"`).join(', ');
  return `using System;
using System.Reflection;
using System.Collections.Generic;

${solution}

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
            string expectedStr = expecteds[idx].TrimEnd();
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
}
`;
}

const cases = [];
for (const ch of csharpCourse.chapters) {
  for (const lesson of ch.lessons) {
    if (lesson.type === 'code' && lesson.codeExercise?.solution) {
      const ex = lesson.codeExercise;
      cases.push({
        kind: 'code',
        chapter: ch.id,
        lesson: lesson.id,
        title: `${ch.title} :: ${lesson.title}`,
        code: ex.solution,
        expected: ex.tests?.[0]?.expectedOutput,
      });
    } else if (lesson.type === 'challenge' && lesson.challenge?.solution) {
      const challenge = lesson.challenge;
      cases.push({
        kind: 'challenge',
        chapter: ch.id,
        lesson: lesson.id,
        title: `${ch.title} :: ${lesson.title}`,
        code: buildChallengeHarness(challenge, challenge.solution),
        expectedTestCount: challenge.testCases.length,
      });
    }
  }
}

console.log(`Running ${cases.length} solutions in batches of ${BATCH_SIZE} → ${RUNNER}`);

let passed = 0;
let failed = 0;
const failures = [];

async function runOne(c) {
  const res = await fetch(`${RUNNER}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: c.code }),
  });
  if (!res.ok) {
    return { c, ok: false, reason: `HTTP ${res.status}` };
  }
  const data = await res.json();
  if (data.compileFailed) {
    const errs = (data.diagnostics || []).filter((d) => d.severity === 'error').slice(0, 3);
    const msg = errs.length
      ? errs.map((d) => `L${d.line}:${d.column} ${d.code} ${d.message}`).join(' | ')
      : (data.stderr || '').split('\n').slice(0, 2).join(' ').trim();
    return { c, ok: false, reason: `compile failed: ${msg}` };
  }
  if (c.kind === 'code' && c.expected !== undefined) {
    const actual = (data.stdout || '').replace(/\n$/, '');
    if (actual !== c.expected) {
      return { c, ok: false, reason: `output mismatch — expected ${JSON.stringify(c.expected)}, got ${JSON.stringify(actual)}` };
    }
  }
  if (c.kind === 'challenge') {
    const lines = (data.stdout || '').split('\n').filter((l) => l.startsWith('__R__|'));
    if (lines.length !== c.expectedTestCount) {
      return { c, ok: false, reason: `expected ${c.expectedTestCount} test results, got ${lines.length}` };
    }
    for (const line of lines) {
      const parts = line.split('|');
      // __R__|<idx>|<P|F>|<expected>|<actual>|<desc>|<error>
      if (parts[2] !== 'P') {
        return {
          c,
          ok: false,
          reason: `test ${parts[1]} (${parts[5]}) failed — expected ${JSON.stringify(parts[3])}, got ${JSON.stringify(parts[4])}${parts[6] ? `, error: ${parts[6]}` : ''}`,
        };
      }
    }
  }
  return { c, ok: true };
}

for (let i = 0; i < cases.length; i += BATCH_SIZE) {
  const batch = cases.slice(i, i + BATCH_SIZE);
  const results = await Promise.all(batch.map(runOne));
  for (const r of results) {
    if (r.ok) {
      passed++;
      process.stdout.write('.');
    } else {
      failed++;
      failures.push(r);
      process.stdout.write('F');
    }
  }
}
process.stdout.write('\n');

if (failures.length) {
  console.log('\nFailures:');
  for (const f of failures) {
    console.log(`  ${f.c.kind.padEnd(9)} ${f.c.chapter} / ${f.c.lesson}`);
    console.log(`    ${f.c.title}`);
    console.log(`    ${f.reason}`);
  }
}

console.log(`\n${passed} passed · ${failed} failed (of ${cases.length})`);
process.exit(failed > 0 ? 1 : 0);
