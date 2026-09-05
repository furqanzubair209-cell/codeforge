CodeForge

A LeetCode-style platform for practicing C++ and Data Structures & Algorithms — with real g++ compilation, 45 hand-written problems across 9 topics, and zero accounts. Your progress, streaks, submissions, and bookmarks live entirely in your browser's localStorage.

No login. No database. No tracking.

Overview

CodeForge is a self-contained coding practice environment built for anyone learning or sharpening their Data Structures & Algorithms skills in C++. Pick a topic, open a problem, write your solution in a full-featured in-browser editor, and get it compiled and run against real test cases — just like a competitive programming judge.

Unlike many "LeetCode clone" projects that simulate code execution or rely on third-party APIs, CodeForge runs a dedicated execution service that compiles and executes your C++ code directly using g++, giving you authentic compiler errors, runtime behavior, and timing.

Features
45 problems across 9 core DSA topics: Arrays, Linked List, Stack, Queue, Searching, Sorting, Trees, Heap, and Graphs
Real C++ execution — code is compiled and run with actual g++, not simulated or mocked
Run vs. Submit workflow — "Run" checks your code against the visible sample tests for quick iteration; "Submit" grades it against the full hidden test suite for a final verdict
Five distinct verdicts — Accepted, Wrong Answer, Compilation Error, Runtime Error, and Time Limit Exceeded — each with a detailed per-test breakdown
Monaco-powered editor — the same editor engine that powers VS Code, with full C++ syntax highlighting, per-problem code persistence, and adjustable font size
Progressive hints available per problem for when you get stuck
Personal dashboard — tracks solved count, acceptance rate, current and longest streak, a 7-day activity strip, per-topic progress breakdown, and unlockable achievements
Bookmarks — save problems to revisit later
Full submission history — review every past run and submission
Dark / light mode toggle
Fully responsive design — works smoothly from small phones up through large desktop screens
Technologies Used
Layer	Technology
Frontend framework	React 19 + TypeScript
Build tool	Vite
Styling	Tailwind CSS
Code editor	Monaco Editor (@monaco-editor/react)
State management	Zustand (persisted to localStorage)
Routing	React Router
Execution service	Node.js + Express
Compilation & execution	Local g++ via Node's child_process (no Docker)
Hosting (frontend)	Netlify
Hosting (execution service)	Any persistent Node host — Render, Railway, Fly.io, or a VPS
How It Works
Problem authoring: All 45 problems are written once as structured TypeScript source files, serving as the single source of truth.
Data generation: A build script splits each problem into two artifacts — a public version (with hidden tests stripped out) that ships to the browser, and a full version (including hidden tests) that stays server-side only.
Editing & running: Users write C++ in the Monaco-based editor in the browser. Hitting "Run" or "Submit" sends the code to the execution service.
Compilation & grading: The execution service compiles the submitted code with g++, runs it against the appropriate test set, and diffs actual output against expected output to determine one of five verdicts.
Results & tracking: Verdicts, per-test breakdowns, streaks, achievements, and submission history are all reflected instantly in the UI and persisted locally in the browser.
Getting Started
Prerequisites
Node.js (v18 or higher) and npm
g++ installed and available on your system PATH (only required for the Run/Submit code execution feature — browsing problems, the dashboard, and bookmarks all work without it)
macOS: xcode-select --install
Linux: usually preinstalled; otherwise sudo apt install g++
Windows: install via MSYS2 (recommended) or MinGW-w64, or use WSL
Running the Frontend
bash
cd frontend
npm install
cp .env.example .env.local
npm run dev

The app runs fully for browsing, topics, dashboard, and bookmarks even without the execution service configured — the problem workspace will show a clear inline notice instead of failing silently if Run/Submit isn't available yet.

Running the Execution Service

The execution service is what actually compiles and runs submitted C++ code, so it's required for Run/Submit to function.

bash
cd execution-service
npm install
npm run dev

This starts the API on http://localhost:8080 by default.

Then, point the frontend at it by setting the following in frontend/.env.local:

VITE_EXECUTION_API_URL=http://localhost:8080

Restart the frontend dev server after changing this file so the new environment variable takes effect.

Environment Variables

Frontend (frontend/.env.local):

Variable	Purpose
VITE_EXECUTION_API_URL	Base URL of the execution service. If left unset, the app runs normally with Run/Submit disabled.

Execution service:

Variable	Purpose	Default
PORT	Port the API listens on	8080
ALLOWED_ORIGIN	CORS origin allowed to call the API — set this to your deployed frontend URL in production	*
RUNNER_IMAGE	Name of the sandbox image, if applicable	codeforge-runner:latest
Deployment
Frontend

The frontend is a static Vite build and can be deployed to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.):

Push the repository to GitHub, GitLab, or Bitbucket and connect it to your hosting provider.
Set the build command to npm run build and the publish directory to dist, with the frontend folder as the base directory.
Add the VITE_EXECUTION_API_URL environment variable pointing to your deployed execution service, then redeploy.
Client-side routing (deep links like /problems/two-sum) is handled via SPA fallback redirects.
Execution Service

The execution service compiles and runs code directly with g++ via child_process, so it needs a persistent Node process with g++ on PATH — this rules out serverless/ephemeral platforms. Suitable options include a small Linux VPS or a host like Render, Railway, or Fly.io.

bash
git clone <your-repo-url>
cd codeforge/execution-service

sudo apt install g++    # or your distro's equivalent — must be on PATH
npm install
ALLOWED_ORIGIN=https://your-frontend-url.com npm start

In production, place this behind a reverse proxy (Caddy, Nginx, or Traefik) for TLS and a real domain, then point VITE_EXECUTION_API_URL at that domain. Restrict ALLOWED_ORIGIN to your actual frontend URL rather than leaving it open to all origins.

Security Model
Code is compiled and executed directly on the execution-service host via child_process (g++, then the compiled binary) — there is no container or process-level sandbox. This is appropriate for personal or trusted use, but not suitable for accepting arbitrary code submissions from the public internet.
Each test run is bounded by a wall-clock execution timeout (process is killed on expiry) and a compile timeout, though there are no memory, CPU, or network usage caps.
Hidden test inputs and expected outputs are never sent to the browser — they're stripped out of the public data at build time, and the API only returns hidden-test details for non-hidden tests.
A simple in-memory per-IP rate limiter guards the run and submit endpoints; a proper gateway or WAF is recommended for production traffic at scale.
License

For personal and portfolio use.
