import express from "express";
import cors from "cors";
import { getProblemById } from "./problems.js";
import { gradeSubmission } from "./grader.js";

const app = express();
const PORT = process.env.PORT || 8080;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
const MAX_CODE_LENGTH = 60_000; // ~60KB of source is more than enough for any DSA solution

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: "256kb" }));

// dumb in-memory rate limiter, N requests per IP per minute
// put a real gateway/WAF in front of this for actual production traffic
const RATE_LIMIT = 20;
const rateBuckets = new Map();
app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const bucket = rateBuckets.get(ip) || { count: 0, resetAt: now + 60_000 };
  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + 60_000;
  }
  bucket.count += 1;
  rateBuckets.set(ip, bucket);
  if (bucket.count > RATE_LIMIT) {
    return res.status(429).json({ error: "Too many requests. Please slow down." });
  }
  next();
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

async function handleExecution(req, res, mode) {
  const { code, problemId } = req.body || {};

  if (typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({ error: "Missing or empty 'code'." });
  }
  if (code.length > MAX_CODE_LENGTH) {
    return res.status(400).json({ error: "Source code is too large." });
  }
  if (typeof problemId !== "string") {
    return res.status(400).json({ error: "Missing 'problemId'." });
  }

  const problem = getProblemById(problemId);
  if (!problem) {
    return res.status(404).json({ error: "Unknown problem." });
  }

  const tests = mode === "run" ? problem.examples : [...problem.examples, ...problem.hiddenTests];
  const hiddenFlags = mode === "run" ? tests.map(() => false) : problem.examples.map(() => false).concat(problem.hiddenTests.map(() => true));

  try {
    const result = await gradeSubmission(
      code,
      tests,
      { timeLimitMs: problem.timeLimitMs, memoryLimitMb: problem.memoryLimitMb },
      hiddenFlags
    );
    res.json(result);
  } catch (err) {
    console.error(`[execution-service] ${mode} failed for ${problemId}:`, err);
    res.status(500).json({ error: "Execution failed. Please try again." });
  }
}

app.post("/run", (req, res) => handleExecution(req, res, "run"));
app.post("/submit", (req, res) => handleExecution(req, res, "submit"));

app.listen(PORT, () => {
  console.log(`CodeForge execution service listening on port ${PORT}`);
  console.log(`Allowed origin: ${ALLOWED_ORIGIN}`);
});
