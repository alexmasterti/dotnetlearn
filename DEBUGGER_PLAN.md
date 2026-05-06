# Debugger Roadmap & Known Limitations

The Playground has a "time-travel" debugger built on instrumenting user code
and replaying captured frames. This doc tracks open work and the limits of
the current approach so the next session can pick up.

## Architecture (current)

- `src/lib/tracer.ts` — JS regex-based instrumentation pass that injects
  `__Tracer.Pos(line, method)` and `__Tracer.Mark(line, method, name, value)`
  calls into user C# before sending it to WandBox.
- The C# `__Tracer` class writes one `__TRACE__:<step>|<line>|<method>|<name>|<value>` per call to stdout.
- `parseTraceOutput` rebuilds these into `TraceFrame[]`. Each frame is a
  cumulative snapshot of all variables seen so far.
- `src/components/Playground.tsx` exposes Back / Step Over / Step Into /
  Step Out / Continue controls + breakpoint gutter + line highlight + hover
  tooltip + F10/F11/F5 keyboard shortcuts.

## Known issues (reported by user, NOT yet fixed)

### 1. Object variables show only ToString (not field-by-field) — DONE

Resolved by emitting reflection-based field/property dump for non-primitive,
non-IEnumerable, non-System-namespace types. Each Mark of an object emits the
parent line plus one trace line per simple-typed field/property
(`obj.id = 1`, `obj.model = ""`). Auto-property backing fields (names starting
with `<`) are filtered, then properties cover the public surface. Nested class
fields are skipped (depth=1) to avoid cycles. Implementation in
`TRACER_FOOTER` of `src/lib/tracer.ts`. CodeEditor hover updated to walk
dotted identifiers (`obj.id`) and fall back to parent on miss.

### 2. Step Over stuck inside callees

User reported: paused inside `setId` (after Step Into), clicking Step Over
should return to Main. Previously kept advancing within setId until end of
trace.

**Status:** Partially fixed in commit `a4ea051+1` with a `seenBefore`
heuristic — Step Over now advances until next frame whose method has
been visited before. Works for non-recursive flows.

**Still broken:**
- **Recursion**: when `Main` calls itself, every frame is in `Main` and the
  heuristic can't tell deeper-call frames from same-call ones.
- **Step Over inside a deep stack**: if `foo` calls `bar` calls `baz`, Step
  Over from `bar` ideally returns to `foo`, not all the way out. Heuristic
  may overshoot if `baz` hasn't been seen yet.

**Real fix:** track call depth in the tracer.

```csharp
internal static class __Tracer {
    static int _depth = 0;
    public static void Enter() { _depth++; }
    public static void Leave() { _depth--; }
    public static void Pos(int line, string method) {
        ...stdout: __TRACE__:<step>|<line>|<method>|<depth>|@@POS@@|
    }
}
```

Inject `Enter()` right after the opening `{` of every method body, and
`Leave()` right before each `return` and the closing `}`. Use `try/finally`
to handle exceptions cleanly:

```csharp
public int Helper(int n) {
    __Tracer.Enter();
    try {
        __Tracer.Pos(7, "Helper");
        return n * 2;  // tracer.Leave still runs
    } finally {
        __Tracer.Leave();
    }
}
```

This is invasive — the instrumentation pass must rewrite method bodies into
try/finally form. Complicates the line-number mapping. Maybe 2-3 hours of
careful work.

With call depth, every step control becomes correct:
- **Step Over**: advance to next frame with `depth ≤ current.depth`
- **Step Into**: advance to next frame
- **Step Out**: advance to first frame with `depth < current.depth`

### 3. Variables panel leaks across scopes

After Step Out from `setId`, the Main panel still shows variables from
inside setId (none in the user's example, but locals would persist).
Conversely, after returning to Main, locals from Helper are still listed.

The accumulator in `parseTraceOutput` is global. Per-method scoping needs
either:
- Tracking which method declared each variable, plus call depth, plus
  filtering at render time to "vars declared in active call frames only"
- Or reset variables on `Leave` if we add the runtime call tracking from #2.

Combined fix with #2: when tracer emits `Leave`, also emit a `__SCOPE_END:<method>` marker. The parser drops variables that were declared inside that scope.

### 4. Hover values don't refresh on scrub

Tooltips read `view.state.field(variablesField)` which is updated via
`useEffect([variables])`. Should be fine but worth verifying after the
field-dump change for #1 (objects with field paths like `obj.id` would need
the hover to handle `.` in identifiers).

## Mono 6.12 sandbox-specific gotchas to remember

These bit us during the debugger work — keep in mind for future tracer changes:

- **No async Main.** Bridge with `RunAsync().GetAwaiter().GetResult()`.
- **No `using var` declaration.** Use `using (var x = ...) { }` blocks.
- **No type patterns in `switch`.** Use `if (s is X x) ...` chains.
- **No `record`, `init`, primary ctors, file-scoped namespaces, switch
  expressions** — all C# 8/9/10+.
- **No `string?` NRT annotations** — mono treats `string?` as Nullable<string>.
- **Generics + `is` pattern matching can hit "Invalid IL code"** — the
  original Mark<T> with type-test patterns crashed mono. Solution: cast to
  object first then use `is`. See `Format` in TRACER_FOOTER.
- **Warnings come on stderr.** `useCSharpRunner.ts` distinguishes
  `severity === 'error'` vs `'warning'` so a CS0169-only build runs.

## What VS Code actually does (for reference, when redoing #2)

VS Code's debugger talks to a debug adapter (DAP) that controls a real
running process. For C#, the adapter is .NET's debugger. It exposes:

- **Stack frame list**: each frame has function name, source location, scope.
- **Scopes**: locals, arguments, this, statics. Each scope holds variables.
- **Variables**: lazy-fetched per scope, expandable on click for object fields.
- **Step requests**: `stepIn`, `stepOut`, `next` (= step over). The runtime
  controls program counter + call depth; the adapter just relays user intent.

Our recording approximates this. To get closer, we'd need either:
- **Call-depth tracking** (option #2 above) — no real adapter, but our
  recording behaves like a proper backwards-deterministic debugger.
- **Server-side .NET debugger.** Self-host a Roslyn-script + debugger
  service on Railway, talk DAP over WebSocket. Significantly bigger but
  unlocks live execution (change values, hit breakpoint mid-loop, etc).

The honest framing: we're building a "trace replay" UI that looks like a
debugger. Some user expectations will diverge from a real attached debugger.
Document those clearly so users aren't surprised.

## Suggested next-session order

1. ~~Fix #1 (object field display)~~ — **DONE.** See above.
2. **Fix #2 (call-depth tracking + try/finally injection)** — fixes Step
   Over recursion + edge cases properly. ~2-3 hours including testing.
3. **Fix #3 (per-scope variables)** — falls out of #2 with extra `Leave`
   markers. ~30 min.
4. Optional: **VS-code-tab-style call stack panel.** Shows the chain of
   method calls leading to the current frame. UI-only once #2 is done.
