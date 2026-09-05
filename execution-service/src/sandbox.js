import { mkdtemp, writeFile, mkdir, rm } from "fs/promises";
import { spawn } from "child_process";
import os from "os";
import path from "path";

// Runs compilation and execution directly on this machine using the g++
// installed on PATH -- no Docker, no container isolation.
//
// TRADE-OFF vs. sandbox.js (the Docker version):
//   - No network isolation, no memory/CPU/pid caps, no non-root jail.
//   - Fine for running your OWN code locally. Do NOT expose this version
//     of the execution service to the public internet or to other people's
//     code -- it has none of the protections described in the project's
//     "Security model" section.
//
// Requires `g++` to be installed and on PATH:
//   - Linux/macOS: usually already present (or `xcode-select --install` / apt/brew)
//   - Windows: install MinGW-w64 (or use WSL, which behaves like Linux)

const COMPILE_TIMEOUT_MS = 10_000;
const IS_WINDOWS = process.platform === "win32";

export async function runInSandbox(code, tests, limits) {
  const workDir = await mkdtemp(path.join(os.tmpdir(), "codeforge-"));
  const binaryPath = path.join(workDir, IS_WINDOWS ? "main.exe" : "main");

  try {
    const sourcePath = path.join(workDir, "main.cpp");
    await writeFile(sourcePath, code, "utf-8");

    // --- Compile ---
    const compile = await runProcess(
      "g++",
      ["-O2", "-std=c++17", "-o", binaryPath, sourcePath],
      { timeoutMs: COMPILE_TIMEOUT_MS }
    );

    if (compile.exitCode !== 0) {
      return {
        compileError: (compile.stderr || "Compilation failed.").slice(0, 4000),
        results: [],
      };
    }

    // --- Run each test ---
    const results = [];
    for (const test of tests) {
      const start = Date.now();
      const run = await runProcess(binaryPath, [], {
        input: test.input ?? "",
        timeoutMs: limits.timeLimitMs,
      });
      results.push({
        stdout: run.stdout,
        stderr: run.stderr,
        exitCode: run.timedOut ? 124 : run.exitCode,
        timedOut: run.timedOut,
        runtimeMs: Date.now() - start,
      });
    }

    return { results };
  } finally {
    await rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

function runProcess(cmd, args, { input, timeoutMs }) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { windowsHide: true });

    let stdout = "";
    let stderr = "";
    let timedOut = false;

    const killer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeoutMs);

    child.stdout.on("data", (d) => {
      if (stdout.length < 1_000_000) stdout += d.toString();
    });
    child.stderr.on("data", (d) => {
      if (stderr.length < 1_000_000) stderr += d.toString();
    });

    child.on("error", (err) => {
      clearTimeout(killer);
      resolve({ stdout, stderr: stderr || String(err), exitCode: -1, timedOut: false });
    });

    child.on("close", (code) => {
      clearTimeout(killer);
      resolve({ stdout, stderr, exitCode: code ?? -1, timedOut });
    });

    if (input) child.stdin.write(input);
    child.stdin.end();
  });
}
