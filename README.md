# CodeForge

A LeetCode-style platform for practicing C++ and data structures & algorithms — real g++ compilation in an isolated sandbox, 45 hand-written problems across 9 topics, and zero accounts. Your progress, streaks, submissions, and bookmarks live entirely in your browser's `localStorage`.

No login. No database. No tracking.

## Features

- **45 problems** across Arrays, Linked List, Stack, Queue, Searching, Sorting, Trees, Heap, and Graphs
- **Real C++ execution** — your code is compiled and run with actual `g++`, not simulated
- **Run vs. Submit** — Run checks your code against the visible sample tests; Submit grades it against the full hidden test suite
- **Five verdicts** — Accepted, Wrong Answer, Compilation Error, Runtime Error, Time Limit Exceeded — each with a per-test breakdown
- **Monaco-powered editor** (the engine behind VS Code) with C++ syntax highlighting, per-problem persistence, and adjustable font size
- **Progressive hints** per problem
- **Dashboard** — solved count, acceptance rate, current/longest streak, a 7-day activity strip, per-topic progress, and unlockable achievements
- **Bookmarks** and full **submission history**
- **Dark / light mode**
- Fully responsive, from small phones up through desktop

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS |
| Editor | Monaco Editor (`@monaco-editor/react`) |
| State | Zustand, persisted to `localStorage` |
| Routing | React Router |
| Execution service | Node.js + Express |
| Compilation/execution | Local `g++` on PATH via `child_process` — no Docker |

## Project structure

```
codeforge/
├── frontend/                 # The deployable web app (React + Vite) — this is what goes to Netlify
│   ├── src/
│   │   ├── pages/            # Route-level pages
│   │   ├── components/       # UI kit, layout, and problem-workspace components
│   │   ├── store/            # Zustand store (solved state, streak, submissions, achievements, prefs)
│   │   ├── lib/               # localStorage wrapper, execution API client, achievement rules
│   │   └── data/generated/   # Auto-generated public problem data (no hidden tests) — do not hand-edit
│   └── public/_redirects     # Netlify SPA fallback (client-side routing)
│
├── execution-service/        # Separate Node service: compiles & runs untrusted C++ safely
│   ├── src/
│   │   ├── index.js          # Express API — POST /run, POST /submit, GET /health
│   │   ├── sandbox.js        # Compiles + runs code with the local g++ via child_process
│   │   ├── grader.js         # Diffs actual vs. expected output, decides the verdict
│   │   └── data/problems-full.json  # Full problem data INCLUDING hidden tests — server-only
│
├── content/                   # Source of truth for all 45 problems (hand-written, typed)
├── scripts/generate-problem-data.mjs   # Splits content/ into the two JSON artifacts above
└── netlify.toml                # Netlify build config (base = frontend)
```

Problems are written once in `content/*.ts` and split by `scripts/generate-problem-data.mjs` into:
- `frontend/src/data/generated/problems-public.json` — ships to the browser, **hidden tests stripped out**
- `execution-service/src/data/problems-full.json` — stays server-side, includes hidden tests

Run the generator any time you add or edit a problem:

```bash
npm install        # from the repo root, installs esbuild used by the generator
node scripts/generate-problem-data.mjs
```

## Running locally

### 1. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local     # then fill in VITE_EXECUTION_API_URL once the service below is running
npm run dev
```

The app works without the execution service configured — everything except Run/Submit (browsing, topics, dashboard, bookmarks) functions normally, and the workspace shows a clear inline notice instead of failing silently.

### 2. Execution service (optional for local UI work, required for Run/Submit)

Requires `g++` installed and on PATH (Mac: `xcode-select --install`; Linux: usually preinstalled, else `apt install g++`; Windows: install MinGW-w64 or use WSL).

```bash
cd execution-service
npm install
npm run dev                    # starts the API on http://localhost:8080
```

Point the frontend at it by setting `VITE_EXECUTION_API_URL=http://localhost:8080` in `frontend/.env.local`.

## Environment variables

**Frontend** (`frontend/.env.local`, see `frontend/.env.example`):

| Variable | Purpose |
|---|---|
| `VITE_EXECUTION_API_URL` | Base URL of your deployed execution service. Leave unset to run the app with Run/Submit disabled. |

**Execution service:**

| Variable | Purpose | Default |
|---|---|---|
| `PORT` | Port the API listens on | `8080` |
| `ALLOWED_ORIGIN` | CORS origin allowed to call the API — set this to your Netlify URL in production | `*` |
| `RUNNER_IMAGE` | Name of the built sandbox image | `codeforge-runner:latest` |

## Deploying

### Frontend → Netlify

1. Push this repo to GitHub/GitLab/Bitbucket and connect it in Netlify.
2. Netlify reads `netlify.toml` at the repo root automatically:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - SPA fallback redirect is already handled (both via `netlify.toml` and `frontend/public/_redirects`), so deep links like `/problems/two-sum` won't 404 on refresh.
3. In **Site settings → Environment variables**, add `VITE_EXECUTION_API_URL` pointing at your deployed execution service (step below). Redeploy after adding it.
4. Deploy. That's it — Netlify cannot and does not need to run the C++ execution service itself.

### Execution service → a real server (not Netlify)

This service compiles and runs code directly with `g++` via `child_process` — it needs a real, persistent Node process with `g++` on PATH. That rules out Netlify itself (Functions are serverless/ephemeral with no compiler toolchain and no long-lived process to spawn from), but it's a much lighter requirement than the old Docker setup: any small Linux VPS works, or a host like Render, Railway, or Fly.io that runs a persistent Node service.

```bash
# On the server:
git clone <your-repo-url>
cd codeforge/execution-service

sudo apt install g++    # or your distro's equivalent — must be on PATH
npm install
ALLOWED_ORIGIN=https://your-site.netlify.app npm start
```

This starts the API on port `8080`. In production, put it behind a reverse proxy (Caddy, Nginx, or Traefik) for TLS and a real domain, then point `VITE_EXECUTION_API_URL` at `https://your-domain/`. Restrict `ALLOWED_ORIGIN` to your actual Netlify URL rather than leaving it as `*`.

**Security note:** unlike the old Docker version, this runs code with no sandbox isolation — no network/CPU/memory caps, no non-root jail. That's an acceptable trade-off for a portfolio project where you trust the code being submitted (i.e. your own), but avoid exposing this open to the public internet for anonymous submissions.

## Security model

- Code is compiled and run directly on the execution-service host via `child_process` (`g++`, then the compiled binary) — there is **no container or process sandbox**. This is appropriate for local/personal use where you trust the code being run; it is not appropriate for accepting submissions from the public internet.
- Each test run is bounded by a wall-clock timeout (`SIGKILL` on expiry) and a 10s compile timeout, but has no memory/CPU/network caps.
- Hidden test inputs/outputs are never sent to the browser — the public JSON strips them at build time, and the API only ever echoes back hidden-test input/output/stderr when `hidden: false`.
- A simple in-memory per-IP rate limiter (20 requests/minute) guards the `/run` and `/submit` endpoints; put a real gateway/WAF in front for production traffic at scale.

## License

For personal/portfolio use.
