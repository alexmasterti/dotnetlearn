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

### 2. Step Over stuck inside callees — DONE

Resolved by injecting `__Tracer.Enter()` / `Leave()` around every method
body via a try/finally wrapper. The instrumentation pass detects the line
where a method's `{` opens (depth 1→2) and the line where its `}` closes
(depth 2→1), and emits:

```csharp
void Foo() {
    __Tracer.Enter(); try {     // injected
        // user code
    } finally { __Tracer.Leave(); }   // injected
}
```

Each `Pos` and `Mark` marker now carries the runtime depth. Step controls
became precise:
- **Step Over**: advance until next frame with `depth ≤ current.depth`
- **Step Into**: advance to next frame (no constraint)
- **Step Out**: advance until next frame with `depth < current.depth`

Works for recursion (each recursive call increments depth). Limitation:
expression-bodied methods (`int X() => ...;`) and accessor-only properties
have no `{...}` block, so their bodies don't get Enter/Leave.

### 3. Variables panel leaks across scopes — DONE

Falls out of #2 automatically. Each `Mark` records the depth at which a
variable was set; on every `Pos` the parser drops variables whose recorded
depth exceeds the new depth (those scopes have returned). No separate
`__SCOPE_END` marker needed — the depth on `Pos` is the source of truth.

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

1. ~~Fix #1 (object field display)~~ — **DONE.**
2. ~~Fix #2 (call-depth tracking)~~ — **DONE.**
3. ~~Fix #3 (per-scope variables)~~ — **DONE.**
4. Optional: **VS-code-tab-style call stack panel.** Shows the chain of
   method calls leading to the current frame. UI-only — each frame already
   has depth + method name; build the stack by walking back from the current
   frame, stopping when depth drops.
