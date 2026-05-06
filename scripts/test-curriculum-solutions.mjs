#!/usr/bin/env node
/**
 * Curriculum smoke test: every `code`-type lesson's `solution` is sent to
 * the .NET 9 runner; we assert it compiles and (where the lesson declares
 * `expectedOutput`) produces the right output. Challenges are compile-only
 * checked since their solutions are class-shaped (no Main) and need the
 * ChallengeView harness to actually run.
 *
 * Runs all solutions in parallel batches so CI stays under ~60s even at
 * 50+ lessons. Exits non-zero on any failure.
 */

import { csharpCourse } from '../src/data/csharp-curriculum.ts';

const RUNNER = process.env.RUNNER_URL || 'https://runner-net9-production.up.railway.app';
const BATCH_SIZE = Number(process.env.BATCH_SIZE || 6);

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
      // Wrap the Solution class so it builds standalone. We don't invoke
      // anything (no runtime check) — just verify it compiles. ChallengeView
      // injects the real harness in the app.
      const ch_ = lesson.challenge;
      cases.push({
        kind: 'challenge',
        chapter: ch.id,
        lesson: lesson.id,
        title: `${ch.title} :: ${lesson.title}`,
        code: ch_.solution + `

class _CompileProbe { static void Main() { } }
`,
        expected: undefined,
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
