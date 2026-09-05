import { runInSandbox } from "./sandbox.js";

function normalize(output) {
  return output
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/, "")
    .trim();
}

// grades code against tests, hiddenFlags[i] marks whether test i's details
// get hidden from the response (used for hidden test cases on submit)
export async function gradeSubmission(code, tests, limits, hiddenFlags) {
  const sandboxResult = await runInSandbox(code, tests, limits);

  if (sandboxResult.compileError) {
    return {
      verdict: "Compilation Error",
      passedTests: 0,
      totalTests: tests.length,
      compileError: sandboxResult.compileError,
      tests: [],
    };
  }

  const outcomes = sandboxResult.results.map((r, i) => {
    const expected = tests[i].output;
    const hidden = hiddenFlags[i];

    let passed = false;
    let status = "wrong_answer";

    if (r.timedOut) {
      status = "tle";
    } else if (r.exitCode !== 0) {
      status = "runtime_error";
    } else if (normalize(r.stdout) === normalize(expected)) {
      passed = true;
      status = "passed";
    }

    return {
      input: hidden ? "" : tests[i].input,
      expected: hidden ? "" : expected,
      actual: hidden ? "" : r.stdout,
      passed,
      hidden,
      status,
      runtimeMs: r.runtimeMs,
      stderr: hidden ? "" : r.stderr,
    };
  });

  const passedTests = outcomes.filter((o) => o.passed).length;
  const anyTle = outcomes.some((o) => o.status === "tle");
  const anyRuntimeError = outcomes.some((o) => o.status === "runtime_error");
  const maxRuntimeMs = Math.max(0, ...sandboxResult.results.map((r) => r.runtimeMs));

  let verdict = "Accepted";
  let runtimeError;
  if (passedTests < tests.length) {
    if (anyTle) {
      verdict = "Time Limit Exceeded";
    } else if (anyRuntimeError) {
      verdict = "Runtime Error";
      const firstFailure = outcomes.find((o) => o.status === "runtime_error");
      runtimeError =
        (firstFailure && !firstFailure.hidden && firstFailure.stderr?.trim()) ||
        "The program exited with a non-zero status (crash, segfault, or an uncaught exception).";
    } else {
      verdict = "Wrong Answer";
    }
  }

  return {
    verdict,
    passedTests,
    totalTests: tests.length,
    runtimeMs: maxRuntimeMs,
    runtimeError,
    tests: outcomes,
  };
}
