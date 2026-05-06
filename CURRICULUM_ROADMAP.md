# DotNetLearn — Curriculum Expansion Roadmap

Goal: grow the catalog from the current **13 chapters / 49 lessons** to the comprehensive C# + .NET path you outlined (Beginner → Specialist).

This doc is the single source of truth for the expansion. Each phase is a reviewable chunk — we ship one phase, you sanity-check it in production, then move on. You can also reorder phases or drop chapters anytime.

---

## 1. Current state (what already ships)

| # | Chapter | Lessons | Topics |
|---|---|---|---|
| 1 | C# Basics | 4 | Hello World, Console.WriteLine, multiple lines |
| 2 | Variables & Data Types | 4 | int/string/double/bool/var, interpolation |
| 3 | Operators & Expressions | 3 | math, comparison, logical |
| 4 | Conditionals | 4 | if/else, switch, ternary, EvenOrOdd |
| 5 | Loops | 4 | for, while, do-while, SumToN |
| 6 | Methods | 4 | declarations, overloading, FizzBuzz |
| 7 | Arrays & Lists | 4 | T[], List\<T\>, FindMax |
| 8 | Strings | 3 | methods, Reverse, quiz |
| 9 | Classes & Objects | 4 | classes, ctors, Rectangle, static vs instance |
| 10 | Inheritance & Polymorphism | 4 | base classes, virtual/override, Shape, interfaces |
| 11 | LINQ | 4 | Where/Select/Sum, distinct words, quiz |
| 12 | Exception Handling | 3 | try/catch/finally, SafeDivide, quiz |
| 13 | Milestone Challenges | 3 | Palindrome, Fibonacci, TwoSum |

**Total: 49 lessons.** All run in the WandBox / mono 6.12 sandbox.

---

## 2. The hard constraint — what the sandbox can and can't run

The runner sends user code to WandBox's `mono-6.12.0.199` compiler. That gives us full C# language support and the BCL, but it **cannot**:

- Spin up an HTTP server (no ASP.NET Core, no Minimal APIs, no Kestrel, no SignalR / gRPC)
- Talk to a database (no EF Core migrations, no live `DbContext`)
- Open windows (no WinForms / WPF / MAUI / Avalonia)
- Run native AOT, trimming, or `dotnet publish`
- Run a Docker container
- Run BenchmarkDotNet (long-lived process, multi-iteration)
- Use modern .NET 6/7/8/9-only APIs (`record`, `init`, primary ctors, `required`, `file`-scope, `IAsyncEnumerable` with full generator support, `System.Text.Json` ≥ .NET 5, `LibraryImport` source-gen, etc.)

**Implication:** every topic falls into one of three categories:

| Category | Lesson shape | Examples |
|---|---|---|
| **A. Sandbox-runnable** | theory + code + quiz + (optional) challenge | language features, LINQ, generics, async/await with Task, reflection |
| **B. Theory-only** | theory + quiz, no executable code | ASP.NET Core, EF Core, MAUI, AOT, BenchmarkDotNet, distributed systems |
| **C. Hybrid** | theory + a small runnable code snippet that shows the *concept* but not the full ecosystem | DI (run a tiny IServiceCollection demo), source generators (consumer-side string demo) |

Without an upgrade to the runtime (e.g. self-hosting a `dotnet 9` Piston instance, or moving to Roslyn-in-WASM with `dotnet/try`), Category B topics stay theory+quiz. **That's a real product decision** — I'd recommend shipping Category A & C properly first, then deciding if the depth Category B adds is worth a backend upgrade.

---

## 3. Lesson-shape conventions for the expansion

Going forward each lesson follows one of these templates:

- **Theory** — markdown, ~150-300 words, code samples in fenced blocks, ≤ 15 XP
- **Code** — single-file program, `Main()` already wired, user fills in body, validates by exact stdout match, ≤ 25 XP
- **Quiz** — 3-5 multiple-choice questions, 15 XP
- **Challenge** — LeetCode-style: user implements a method on a `Solution` class, 5+ test cases via reflection, 35-70 XP based on difficulty
- **Reading-only** (new) — for Category B: pure markdown deep-dive plus a quiz, marked with a 📖 icon, 20 XP

I'll add `'reading'` as a fifth `LessonType` in `types/index.ts` when phase 4 starts.

---

## 4. Target catalog (chapter list, in proposed teach order)

Tracks group related chapters. The numbers in `[]` are net-new lesson counts; existing lessons are reused where the new outline supersets them.

### Track I — Beginner Foundation (extends current Ch 1-9)

| New ch | Title | Lessons | Type mix |
|---|---|---|---|
| **1.5** | dotnet CLI & Project Types | 4 | theory + reading + quiz |
| **2.5** | Type Conversion & Casting | 3 | theory + code + quiz |
| **3.5** | Method Parameters Deep Dive | 4 | `ref` / `out` / `in` / `params`, code + challenge |
| **6.5** | Console I/O Beyond WriteLine | 3 | `Console.ReadLine`, formatting, redirection caveats |
| **8.5** | Strings Advanced | 4 | `StringBuilder`, interpolation, formatting, encoding |
| **9.5** | Access Modifiers & Namespaces | 3 | `public`/`private`/`protected`/`internal`, `using`, file-scoped namespaces |
| **9.7** | Enums & `[Flags]` | 4 | declaration, casting, bitwise flags, challenge |

**Track I total: ~25 new lessons**

### Track II — Intermediate Language (extends current Ch 10-12)

| New ch | Title | Lessons | Type mix |
|---|---|---|---|
| **10.5** | Abstract Classes vs Interfaces | 4 | theory + code + challenge |
| **11.0** | Generics | 5 | `T`, constraints, generic methods, generic class, challenge |
| **11.3** | Collections Tour | 5 | `Dictionary`, `HashSet`, `Queue`, `Stack`, `SortedList` |
| **11.7** | Advanced LINQ | 4 | grouping, joining, deferred execution, custom operators |
| **12.5** | Delegates, Events & Lambdas | 5 | `Func`/`Action`/`Predicate`, multicast, events, closures |
| **12.7** | Nullable Reference Types | 3 | NRT, `?.`, `??`, `??=`, design |
| **12.9** | Value vs Reference Types | 3 | stack vs heap, boxing, `struct` design rules |
| **13.5** | IDisposable & `using` | 3 | finalizers, `using`, `IAsyncDisposable` |
| **13.7** | File I/O & Streams | 4 | `File`, `Stream`, `StreamReader`/`Writer`, `Path`, sandbox caveats |
| **13.9** | Unit Testing Basics | 3 | xUnit theory, assertions, AAA pattern (reading-only since runner can't host tests) |

**Track II total: ~39 new lessons**

### Track III — Advanced Language (mostly new)

| Ch | Title | Lessons |
|---|---|---|
| 14 | async / await | 5 |
| 15 | Task, ValueTask & CancellationToken | 4 |
| 16 | Threading & Synchronization | 5 — `Thread`, `lock`, `Interlocked`, `SemaphoreSlim`, `Parallel` |
| 17 | Pattern Matching | 4 — `is`, `switch` expressions, property/list patterns |
| 18 | Records & Init-only | 3 *(reading-only — mono 6.12 doesn't support `record`; will be runnable when we upgrade runtime)* |
| 19 | Tuples & Deconstruction | 3 |
| 20 | Iterators & `yield return` | 4 |
| 21 | Reflection & Attributes | 5 |
| 22 | Expression Trees & `dynamic` | 4 |
| 23 | Variance: Covariance & Contravariance | 3 |
| 24 | `Span<T>`, `Memory<T>`, `ref struct` | 4 *(some samples reading-only)* |

**Track III total: ~44 new lessons**

### Track IV — .NET Ecosystem (mostly Category B reading + quiz)

| Ch | Title | Lessons |
|---|---|---|
| 25 | What Is .NET? | 4 — CLR, BCL, .NET Framework vs modern .NET |
| 26 | NuGet & Multitargeting | 3 |
| 27 | Configuration & Options Pattern | 3 |
| 28 | Logging with `ILogger<T>` | 3 |
| 29 | Dependency Injection | 4 — including a runnable mini-`ServiceCollection` example |
| 30 | Generic Host & `BackgroundService` | 3 |
| 31 | ASP.NET Core Tour | 5 — minimal APIs, MVC, middleware, routing, model binding |
| 32 | EF Core Tour | 5 — DbContext, LINQ to SQL, migrations, change tracking |
| 33 | HTTP, JSON & Resilience | 4 — `HttpClient`, `IHttpClientFactory`, Polly, `System.Text.Json` |
| 34 | Authentication & Authorization | 4 — cookies, JWT, OIDC, policies |
| 35 | gRPC & SignalR | 3 |
| 36 | Caching | 3 — `IMemoryCache`, Redis, HybridCache |
| 37 | OpenTelemetry & Health Checks | 3 |
| 38 | Containers & CI/CD | 3 |
| 39 | Desktop UI Survey | 3 — WinForms, WPF, MAUI, Avalonia |

**Track IV total: ~53 new lessons (mostly reading-only)**

### Track V — Specialist / Expert

| Ch | Title | Lessons |
|---|---|---|
| 40 | CLR Internals | 4 — type loader, JIT tiers, OSR, PGO, R2R |
| 41 | Garbage Collection | 5 — generations, LOH/POH, server vs workstation, tuning |
| 42 | Performance Engineering | 4 — BenchmarkDotNet, dotnet-trace/-counters/-dump |
| 43 | Allocation-Free Patterns | 4 — `Span`, `ArrayPool`, `ObjectPool`, `stackalloc` |
| 44 | High-perf I/O | 3 — `System.IO.Pipelines`, Kestrel, HTTP/2-3 |
| 45 | Concurrency Primitives | 4 — Channels, TPL Dataflow, lock-free, memory models |
| 46 | Roslyn Analyzers & Source Generators | 4 |
| 47 | IL & Reflection.Emit | 3 |
| 48 | Native AOT & Trimming | 3 |
| 49 | Diagnostics & Observability | 3 |
| 50 | Distributed Systems with .NET | 4 — Orleans, Aspire, Dapr, sagas |
| 51 | Messaging at Scale | 3 — Kafka, RabbitMQ, Service Bus |
| 52 | Architecture Patterns | 4 — DDD, CQRS, event sourcing, modular monolith |
| 53 | Security & Cryptography | 4 |
| 54 | Plug-in Systems & Hot Reload | 3 |
| 55 | Contributing to .NET | 2 — repo tour, dev loop |

**Track V total: ~57 new lessons (almost all reading-only)**

---

## 5. Phasing — what we ship in what order

Each phase is one PR, mergeable on its own, with verification in production:

### Phase 1 — Beginner gap-fill (Track I)

Adds 25 lessons. Pure language stuff, all sandbox-runnable. Highest learner ROI per line of curriculum: it patches the holes in what's already there before we go deeper. Estimated work: ~1500 lines of curriculum TS.

### Phase 2 — Generics + Collections + Delegates (Track II partial)

19 lessons across Generics (5), Collections (5), Delegates/Events/Lambdas (5), and Advanced LINQ (4). These are the canonical "ah-ha" topics that take a developer from "I write classes" to "I write libraries". All runnable.

### Phase 3 — Rest of Track II (Nullable, Disposable, Value vs Reference, File I/O, etc.)

20 lessons. Mix of runnable (8) and reading-only (12, mostly testing/IO/disposable theory).

### Phase 4 — Async + Threading + Pattern Matching (Track III partial)

14 lessons. Adds `'reading'` lesson type to support topics where mono can compile but the example is too long for a code lesson. Async/await fully runnable; `record` and primary ctors stay reading-only until we upgrade the runtime.

### Phase 5 — Rest of Track III (reflection, iterators, expression trees, Span, etc.)

30 lessons. Most are runnable. `Span<T>` and `ref struct` mostly readable theory + small runnable demos.

### Phase 6 — Track IV (.NET ecosystem)

53 lessons. ~80% reading-only. Each one focuses on **what to know to recognize the topic in a job interview or codebase**, not "build it from scratch". DI gets a runnable demo, EF Core does not (no DB).

### Phase 7 — Track V (specialist/expert)

57 lessons. Almost all reading-only. Goal: a learner finishing this knows the *vocabulary*, the *trade-offs*, and where to read more. A learner who wants hands-on goes to local dev tooling.

---

## 6. Cross-cutting work (do once, applies to all phases)

These are not lessons but they unblock the curriculum:

- [ ] **Add `'reading'` LessonType** (`types/index.ts`, `LessonView.tsx`, `JourneyMap.tsx` icon, `ReviewMode.tsx`) — needed before phase 3
- [ ] **Add chapter milestones / checkpoint badges** so the journey doesn't feel like an endless list once we're at 200+ lessons
- [ ] **Add chapter-level filtering / collapse** in `JourneyMap.tsx` so the page stays usable
- [ ] **Cap default `xp` per lesson** — current values (35-70 for challenges) become hyperinflated when you have 250 lessons. Maybe scale lesson XP by track depth (10/15/20/25 rather than today's 10/20/35/50)

---

## 7. Effort estimate

Assuming average lesson size = ~70 lines of curriculum TS:

| Phase | New lessons | Curriculum LOC | Code LOC (UI/types) | Estimated effort* |
|---|---|---|---|---|
| 1 | 25 | ~1700 | 0 | half a day |
| 2 | 19 | ~1300 | 0 | half a day |
| 3 | 20 | ~1400 | ~150 (reading lesson) | most of a day |
| 4 | 14 | ~1000 | 0 | half a day |
| 5 | 30 | ~2100 | 0 | a day |
| 6 | 53 | ~3700 (mostly markdown) | ~50 (filtering) | 1-1.5 days |
| 7 | 57 | ~4000 (mostly markdown) | 0 | 1-1.5 days |
| **total** | **~218 new** | **~15,200** | **~200** | **~5-7 days** |

\* "effort" = focused work for a fast operator. Real wall-clock depends on your review pace.

After phase 7 the catalog is **267 lessons across 55 chapters** — the full path you outlined.

---

## 8. Open questions for you

1. **Sandbox upgrade?** Mono 6.12 caps us at C# 7-ish. If you want `record`, primary ctors, modern `System.Text.Json`, etc. as runnable, we need to either (a) self-host Piston with `dotnet 9` (small Railway service), or (b) move to Roslyn-in-browser via `dotnet/try` (~30MB initial download). Open to either; doesn't block phase 1-3.
2. **Do you want phase 6-7 at all?** Reading-only lessons are great for breadth but don't have the practice loop. Some learners will skip them. Alternative: keep the catalog at "everything runnable" (phases 1-5, ~110 lessons) and link out to Microsoft Learn for the rest.
3. **Track ordering** — propose teaching async (phase 4) **before** generics (phase 2)? Most curricula go generics-first because it's simpler, but if the audience cares about real-world web apps async dominates.
4. **Daily-goal scaling** — today's default daily goal is 3 lessons. With 267 lessons you'd be done in 90 days at that rate. Is that too fast / too slow? Should we ladder XP by track so the journey feels paced?

Pick a phase and I'll start. My recommendation: **green-light phase 1**, ship it, then re-evaluate scope based on how it feels in production.
