# Debugger Roadmap & Known Limitations

The Playground has a "time-travel" debugger built on instrumenting user code
and replaying captured frames. As of this doc the originally-reported issues
are all resolved; this file is now a reference for the architecture and the
remaining-edge-case backlog.

## Architecture

- `src/lib/tracer.ts` — JS regex-based instrumentation pass. Transforms user
  C# before sending it to WandBox by:
  - Splitting single-line `{ stmt; }` bodies into multi-line form so the
    body is at instrumentable depth.
  - Injecting `__Tracer.Enter(); try {` after the `{` of every method body
    and `} finally { __Tracer.Leave(); }` before the matching `}` so call
    depth is tracked at runtime.
  - Marking each method parameter right after `Enter()` so they appear in
    the variables panel from the first frame.
  - Inserting `__Tracer.Pos(line, method)` before each statement (= the
    point at which a paused-at-this-line frame is captured).
  - Inserting `__Tracer.Mark(line, method, name, value)` after each local
    declaration, assignment, compound assignment, increment/decrement, AND
    after `<receiver>.method(...)` calls when the receiver is a tracked
    local (refreshes object fields after mutating calls).
- The C# `__Tracer` class writes one
  `__TRACE__:<step>|<line>|<method>|<depth>|<name>|<value>` per call to
  stdout. For non-primitive object values, `Mark` also reflects over public
  + non-public instance fields and public properties of "simple" types
  (primitives, enums, `string`, `decimal`, nullable wrappers) and emits
  one extra trace line per field/property as `<baseName>.<fieldName>`.
- `parseTraceOutput` rebuilds these into `TraceFrame[]`. Each frame holds:
  - `step`, `line`, `method`, `depth`
  - `variables` — snapshot of live variables, with entries whose recorded
    depth exceeds the frame's depth filtered out (per-scope cleanup; no
    explicit `__SCOPE_END` marker needed)
  - `output` — cumulative program stdout produced before this frame, so
    the UI can reveal output progressively while stepping
- `src/components/Playground.tsx` exposes Back / Step Over / Step Into /
  Step Out / Continue / Restart / Stop controls, breakpoint gutter, current-
  line highlight, hover tooltip (with dotted-path support for `obj.id`),
  variables panel, and an output panel that reads `currentFrame.output`
  while paused. Keyboard: F10/F11/Shift+F11/F5/Shift+F5/Ctrl+Shift+F5.

## Originally-reported issues (all resolved)

1. ✅ **Object variables show only ToString.** Reflection-based field dump
   for non-primitive, non-IEnumerable, non-System types. Backing fields
   (`<...>k__BackingField`) filtered.
2. ✅ **Step Over stuck inside callees.** Real call-depth tracking via
   injected `Enter()`/`Leave()` in try/finally. Step Over advances until
   `depth ≤ current.depth`; Step Out until `depth < current.depth`.
   Works for recursion.
3. ✅ **Variables panel leaks across scopes.** Per-Mark depth recorded;
   parser drops variables whose depth exceeds the next frame's depth.
4. ✅ **Hover doesn't see method parameters.** Param names captured from
   the signature regex and Marked right after `Enter()` so they're live
   from the first frame inside the method.
5. ✅ **Object fields stale after mutating call.** `<receiver>.method(...)`
   triggers a follow-up Mark on the receiver if it's a tracked local, so
   the reflection field dump re-runs and `obj.Id` reflects the new value.
6. ✅ **Output appeared all-at-once.** Each frame snapshots cumulative
   stdout; Playground renders `currentFrame.output` while paused.
7. ✅ **Hover on dotted paths.** `obj.id` resolves to the dotted variable;
   if the dotted form isn't tracked, falls back to the parent.

## Known limitations (acceptable for v1, documented for future work)

- **Expression-bodied members** (`int X() => ...;`, `int Y => _y;`) have
  no `{...}` block, so they don't get Enter/Leave injection. Calls into
  them won't increment depth. Property accessors with bodies are also
  skipped — they live at depth 3 (class → property → accessor) which our
  push-on-1→2 logic doesn't cover.
- **Local functions** (`void Outer() { void Inner() {} }`) — Inner opens
  at depth 2→3, not tracked.
- **Single-line empty bodies** like `public Vehicule() { }` aren't split
  by the line-expander (regex requires `(.+;)` inside) and the Enter/try
  injector requires `{` at end-of-line, `}` at start-of-line — so empty
  bodies on a single line don't get instrumented. Calls to them work but
  don't show a frame.
- **Variable name shadowing across scopes**: if Main has `int total` and
  callee `soma` declares `int total`, the callee's Mark overwrites the
  parent entry. On return to Main, the scope-filter drops the callee's
  entry, leaving Main's `total` undefined until the next Main-scope Mark
  re-sets it. Acceptable; rare in well-formed code.
- **Output ordering**: the parser interleaves stdout with marker lines by
  scanning sequentially, so a `Console.Write` (no newline) emitted between
  two markers may end up tagged to the wrong frame. WriteLine is fine.
- **MAX_TRACE_PER_RUN = 1500** — long loops or deep recursion get truncated.
  Bump if it becomes an issue.

## Sandbox: .NET 9 (since 2026-05-06)

DotNetLearn ran on WandBox/mono-6.12 originally; the constraints below
applied then. The new runner is a self-hosted ASP.NET Core minimal API on
Railway (`runner-net9-production.up.railway.app`) using the .NET 9 SDK,
so all the historical mono limitations are gone — records, init setters,
primary ctors, file-scoped namespaces, switch expressions, type patterns,
async Main, top-level statements, `using var` declarations, modern
`System.Text.Json` all compile and run.

The tracer footer is wrapped in `#nullable disable` because it doesn't
use NRT annotations and would otherwise emit CS8600/CS8604 warnings into
the user-facing diagnostics list. The historical cast-to-object workaround
in `Format` (for the mono "Invalid IL code" generic+`is` pattern bug) is
preserved — it's harmless on .NET 9.

**Historical mono 6.12 gotchas (for reference if we ever need to support
both backends):** no async Main, no `using var`, no type patterns in
switch, no records/init/primary ctors/file-scoped namespaces/switch
expressions, no `string?` NRT, generics+`is` hit "Invalid IL code".

## What VS Code actually does (for reference)

VS Code's debugger talks to a debug adapter (DAP) that controls a real
running process. Our recording approximates this with a deterministic
trace replay. The closest we could get without a real adapter would be
self-hosting a Roslyn-script + debugger service on Railway and talking
DAP over WebSocket — significantly bigger, unlocks live execution
(change values, hit breakpoint mid-loop, etc.) but doesn't change the
fundamental UX.

## Possible next steps (not blocking)

- **Call stack panel.** Each frame already has `depth` + `method`; walk
  backwards from the current frame, picking the nearest preceding frame
  at each lower depth, to build the chain.
- **Step Into/Out keyboard hint overlay** for first-time users.
- **MAX_TRACE_PER_RUN configurable** with a UI banner when truncated.
- **Self-hosted .NET 9 sandbox** (separate from debugger work) so newer
  language features can be debugged too — the tracer regexes would need
  updating for `record`/`init`/etc.
