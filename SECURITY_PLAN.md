# Security Plan & Watchlist

This is the running checklist of security-relevant items for DotNetLearn — things to monitor, mitigations to keep ready, and known-but-accepted tradeoffs of the architecture. Not bugs; awareness.

Last full security review: 2026-05-06 (slash-command `/security-review` against last ~25 commits, including the `runner/` introduction).

## What's known good

A focused review covered the new attack surface introduced by the .NET 9 runner switch:

- **`runner/Program.cs`** — code orchestration is sound. JSON body via minimal-API binder (no unsafe deserialization). User code written to `Program.cs` inside a per-request temp dir whose only variable is `Guid.NewGuid().ToString("N")` (hex only). Process invocation uses `UseShellExecute = false`, so no shell metacharacter exposure even with the GUID interpolation.
- **`runner/Dockerfile`** — stock `mcr.microsoft.com/dotnet/sdk:9.0` images, no secrets baked in, no privileged flags, no unintended ports.
- **CI workflow** — triggered by `push` and `pull_request` (NOT `pull_request_target`), so the GitHub-token leak class doesn't apply.
- **Frontend** — React JSX is auto-escaped throughout. The one raw `innerHTML` use in `CodeEditor.tsx` (hover tooltip) is fed by a regex character class `[A-Za-z0-9_.]` that cannot produce HTML metacharacters.

No high-confidence vulnerabilities were found.

## Accepted tradeoffs (by design — keep in mind, not fix)

The runner is a public code-execution service. Some exposures come with that model:

### 1. Wide-open CORS + no auth by default

`Program.cs` has `AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()`. The optional `RUNNER_SECRET` env-var check is in place but only enforced if the var is set on the Railway service.

**Watch for**: surprise Railway usage spikes (cost dashboard or daily metrics). If `runner-net9-production.up.railway.app` shows traffic that doesn't correspond to your own use, abuse is the most likely cause.

**Mitigation if it happens**:
1. On the Railway service: set `RUNNER_SECRET=<long random>` env var.
2. On the dotnetlearn (frontend) service: set `VITE_RUNNER_SECRET=<same value>` env var.
3. Add a tiny patch in `src/hooks/useCSharpRunner.ts` to send `X-Runner-Secret: ${import.meta.env.VITE_RUNNER_SECRET}` on the `fetch` call.
4. Redeploy both services.

The runner already supports the header check, so step 1 alone immediately walls off random abuse — the frontend will start failing until step 3 ships, but legitimate users get a clear error and you control the rollout.

### 2. User code runs with full container privileges

Code submitted to `/run` can:
- Make outbound HTTP requests
- Read and write within `/tmp` and other writable paths in the container
- Spawn subprocesses
- Read environment variables (which is why `RUNNER_SECRET` is held only at HTTP-handler level, not exposed to user code paths)

This is the same threat model as WandBox, Piston, dotnetfiddle, every public code playground. Railway's container isolation is the trust boundary. The runner does **not** add an inner sandbox like `isolate` or `bwrap`.

**Watch for**: anomalous outbound traffic from the runner container, or mining-style CPU patterns sustained over time.

**If it ever becomes a real concern** (e.g. you publicly market the platform):
- Switch to a real sandbox runtime: containerd-with-gvisor, Firecracker, or Wasmtime (compile user C# to WASI via `dotnet publish -p:PublishWasi`)
- Or move to a third-party hosted runner (Piston self-hosted with isolate, dotnet-script-as-a-service, etc.)

### 3. 15-second timeout is the only cost cap

Set in `Program.cs` (`RunTimeoutMs = 15_000`, `BuildTimeoutMs = 30_000`). Plenty of CPU work fits in 15 seconds. There's no concurrent-request cap, no per-IP rate limit, no daily quota.

**Watch for**: rising Railway compute usage during steady DotNetLearn traffic.

**Mitigation if needed**:
- Lower `RunTimeoutMs` (most legitimate lessons run in <2s)
- Add a token-bucket per-IP middleware (~30 lines of ASP.NET Core)
- Or front the runner with Cloudflare and rate-limit there

## Periodic checks (every 1-3 months)

A short list of "open the dashboard, scan, close it" tasks. Take 5 minutes.

- [ ] **Railway cost dashboard** for the `runner-net9` service — does usage match your own usage? Big swing → suspected abuse → enable `RUNNER_SECRET`.
- [ ] **`npm audit`** in the dotnetlearn root and **`dotnet list package --vulnerable`** in `runner/` — check for known-CVE deps.
- [ ] **GitHub Dependabot tab** if alerts are enabled — triage anything HIGH or CRITICAL.
- [ ] **Re-run `/security-review`** if there's been substantial new code (new server, new auth flow, new external integration). Not needed for curriculum-only changes.
- [ ] **Supabase auth allowlist** — verify only the Railway URLs + localhost are listed. Any extra entry that you don't recognize → remove.

## Future code reviews — what to flag

When adding new functionality, these are the categories that warrant a real second look (not just `/security-review`, which is fast but pattern-based):

1. **Anything that runs user input as code** (eval, dynamic SQL, template engines with user input, deserialization of user-supplied data). Currently the only such surface is the runner itself, which is by-design.
2. **Anything that touches secrets** — env vars, Supabase service-role key, OAuth tokens. The frontend should never see service-role keys; they belong only on the runner-net9 service if ever needed (which they don't currently).
3. **Anything that writes to the database with values derived from user input.** DotNetLearn's only DB writes are progress rows scoped to `auth.uid()` via Supabase RLS — keep that pattern. New tables → write the RLS policy in the same PR.
4. **New external HTTP destinations.** The runner currently fetches nothing external. The frontend talks to Supabase + the runner. Adding a third destination from either side is a moment to ask "what does it actually need access to?"
5. **File uploads** (none today). If we ever accept uploaded `.cs` files or images, magic-byte sniff + size cap + extension whitelist.
6. **Authentication changes.** Today auth is Supabase Google OAuth, no service-side sessions. Don't roll a custom token format unless absolutely required.

## Architecture-level notes (won't change)

- **Two Railway services** in one project: `dotnetlearn` (React, nginx) and `runner-net9` (ASP.NET Core SDK image). Each isolated by Railway. No shared filesystem or process boundary.
- **Supabase RLS** is the authorization boundary for `dotnetlearn_progress` — every row is scoped by `auth.uid()`. Frontend code can be trivially modified by users; do not rely on any client-side check for security.
- **The smoke-test CI job** hits the live runner. It's a soft trust relationship (the runner could in theory return crafted responses that confuse the test runner) — but the test runner just parses simple JSON and reports pass/fail; no eval, no shell.

## Quick reference

| Concern | Where it's checked | What to do |
|---|---|---|
| Runner abuse | Railway cost dashboard | Set `RUNNER_SECRET` (steps above) |
| Container escape | Railway maintains | Out of our hands; report to Railway |
| Frontend XSS | React auto-escape + JSX review | Review any new `dangerouslySetInnerHTML` / `innerHTML` |
| DB row leak across users | Supabase RLS policies | Verify `auth.uid()` predicate on every new table |
| Secret in client bundle | Build inspection | Check `dist/assets/*.js` for any env-var that should be server-only |
| Dep CVEs | `npm audit` / `dotnet list package --vulnerable` | Bump or pin |

If anything on the watchlist actually fires (real abuse, real CVE, real user complaint), turn it into a tracked issue — don't just patch and forget.
