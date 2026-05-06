using System.Diagnostics;
using System.Text.RegularExpressions;

const int MaxCodeLength = 100_000;
const int RunTimeoutMs = 15_000;
const int BuildTimeoutMs = 30_000;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
var app = builder.Build();
app.UseCors(p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Optional shared secret. If RUNNER_SECRET is set in the environment, every
// /run request must carry the same value in the X-Runner-Secret header.
var secret = Environment.GetEnvironmentVariable("RUNNER_SECRET");

app.MapGet("/health", () => Results.Ok(new { ok = true, version = "net9" }));

app.MapPost("/run", async (HttpRequest req, RunRequest body) =>
{
    if (!string.IsNullOrEmpty(secret))
    {
        var got = req.Headers["X-Runner-Secret"].ToString();
        if (got != secret) return Results.Unauthorized();
    }
    if (string.IsNullOrEmpty(body.Code))
        return Results.BadRequest(new { error = "code is required" });
    if (body.Code.Length > MaxCodeLength)
        return Results.BadRequest(new { error = $"code exceeds {MaxCodeLength} chars" });

    var work = Path.Combine(Path.GetTempPath(), "run-" + Guid.NewGuid().ToString("N"));
    Directory.CreateDirectory(work);
    try
    {
        await File.WriteAllTextAsync(Path.Combine(work, "Program.cs"), body.Code);
        await File.WriteAllTextAsync(Path.Combine(work, "prog.csproj"), Helpers.Csproj);

        var build = await Helpers.Run(
            "dotnet",
            $"build \"{work}/prog.csproj\" -c Release --nologo -v q -clp:NoSummary",
            BuildTimeoutMs);
        var diagnostics = Helpers.ParseDiagnostics(build.Stdout + "\n" + build.Stderr);

        if (build.ExitCode != 0)
        {
            return Results.Ok(new RunResponse(
                Stdout: "",
                Stderr: "",
                Diagnostics: diagnostics,
                ExitCode: build.ExitCode,
                TimedOut: build.TimedOut,
                CompileFailed: true));
        }

        var dll = Path.Combine(work, "bin", "Release", "net9.0", "UserProg.dll");
        if (!File.Exists(dll))
        {
            return Results.Ok(new RunResponse(
                Stdout: "",
                Stderr: "Build succeeded but output assembly was not found.",
                Diagnostics: diagnostics,
                ExitCode: -1,
                TimedOut: false,
                CompileFailed: true));
        }

        var run = await Helpers.Run("dotnet", $"\"{dll}\"", RunTimeoutMs);
        return Results.Ok(new RunResponse(
            Stdout: run.Stdout,
            Stderr: run.Stderr,
            Diagnostics: diagnostics,
            ExitCode: run.ExitCode,
            TimedOut: run.TimedOut,
            CompileFailed: false));
    }
    finally
    {
        try { Directory.Delete(work, true); } catch { /* best-effort */ }
    }
});

app.Run();

static class Helpers
{
    public const string Csproj = """
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <RootNamespace>UserProg</RootNamespace>
    <AssemblyName>UserProg</AssemblyName>
    <NoWarn>CS8019</NoWarn>
  </PropertyGroup>
</Project>
""";

    static readonly Regex DiagPattern = new(
        @"Program\.cs\((\d+),(\d+)\):\s*(error|warning)\s+(CS\d+):\s*([^\[]+?)(?:\s*\[|$)",
        RegexOptions.Multiline | RegexOptions.IgnoreCase | RegexOptions.Compiled);

    public static List<Diagnostic> ParseDiagnostics(string text)
    {
        var list = new List<Diagnostic>();
        foreach (Match m in DiagPattern.Matches(text))
        {
            list.Add(new Diagnostic(
                Line: int.Parse(m.Groups[1].Value),
                Column: int.Parse(m.Groups[2].Value),
                Severity: m.Groups[3].Value.ToLowerInvariant(),
                Code: m.Groups[4].Value,
                Message: m.Groups[5].Value.Trim()));
        }
        return list;
    }

    public static async Task<ProcessResult> Run(string file, string args, int timeoutMs)
    {
        var psi = new ProcessStartInfo(file, args)
        {
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };
        psi.EnvironmentVariables["DOTNET_NOLOGO"] = "1";
        psi.EnvironmentVariables["DOTNET_CLI_TELEMETRY_OPTOUT"] = "1";

        using var proc = Process.Start(psi)!;
        var stdoutTask = proc.StandardOutput.ReadToEndAsync();
        var stderrTask = proc.StandardError.ReadToEndAsync();
        using var cts = new CancellationTokenSource(timeoutMs);
        try
        {
            await proc.WaitForExitAsync(cts.Token);
        }
        catch (OperationCanceledException)
        {
            try { proc.Kill(true); } catch { }
            return new ProcessResult(await stdoutTask, await stderrTask, -1, true);
        }
        return new ProcessResult(await stdoutTask, await stderrTask, proc.ExitCode, false);
    }
}

record RunRequest(string Code);
record RunResponse(
    string Stdout,
    string Stderr,
    List<Diagnostic> Diagnostics,
    int ExitCode,
    bool TimedOut,
    bool CompileFailed);
record Diagnostic(int Line, int Column, string Severity, string Code, string Message);
record ProcessResult(string Stdout, string Stderr, int ExitCode, bool TimedOut);
