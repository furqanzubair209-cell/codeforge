<div align="center">

# ⚒️ CodeForge

**A LeetCode-style platform for practicing C++ and Data Structures & Algorithms — with real `g++` compilation, 45 hand-written problems across 9 topics, and zero accounts.**

Your progress, streaks, submissions, and bookmarks live entirely in your browser's `localStorage`.

**No login. No database. No tracking.**

<br>

![Problems](https://img.shields.io/badge/Problems-45-2ea44f?style=flat-square)
![Topics](https://img.shields.io/badge/Topics-9-2ea44f?style=flat-square)
![Execution](https://img.shields.io/badge/Execution-Real%20g%2B%2B-00599C?style=flat-square)
![Accounts](https://img.shields.io/badge/Accounts-None-lightgrey?style=flat-square)
![License](https://img.shields.io/badge/License-Personal%20%26%20Portfolio-blue?style=flat-square)

<br>

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-1E1E1E?style=for-the-badge)
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=cplusplus&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Topics Covered](#-topics-covered)
- [Tech Stack](#-tech-stack)
- [How It Works](#-how-it-works)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Security Model](#-security-model)
- [License](#-license)

---

## 🔭 Overview

CodeForge is a self-contained coding practice environment built for anyone learning or sharpening their Data Structures & Algorithms skills in C++. Pick a topic, open a problem, write your solution in a full-featured in-browser editor, and get it compiled and run against real test cases — just like a competitive programming judge.

Unlike many "LeetCode clone" projects that simulate code execution or rely on third-party APIs, CodeForge runs a dedicated execution service that compiles and executes your C++ code directly using `g++`, giving you authentic compiler errors, runtime behavior, and timing.

---

## ✨ Features

| Feature | Details |
| ------- | ------- |
| 📚 **45 problems, 9 topics** | Arrays, Linked List, Stack, Queue, Searching, Sorting, Trees, Heap, and Graphs |
| ⚙️ **Real C++ execution** | Code is compiled and run with actual `g++`, not simulated or mocked |
| ▶️ **Run vs. Submit** | **Run** checks your code against the visible sample tests for quick iteration; **Submit** grades it against the full hidden test suite for a final verdict |
| 🏁 **Five distinct verdicts** | Accepted, Wrong Answer, Compilation Error, Runtime Error, and Time Limit Exceeded, each with a detailed per-test breakdown |
| 📝 **Monaco-powered editor** | The same editor engine that powers VS Code, with C++ syntax highlighting, per-problem code persistence, and adjustable font size |
| 💡 **Progressive hints** | Available per problem for when you get stuck |
| 📊 **Personal dashboard** | Solved count, acceptance rate, current and longest streak, a 7-day activity strip, per-topic progress, and unlockable achievements |
| 🔖 **Bookmarks** | Save problems to revisit later |
| 🕘 **Full submission history** | Review every past run and submission |
| 🌗 **Dark / light mode** | One-click theme toggle |
| 📱 **Fully responsive** | Works smoothly from small phones up through large desktop screens |

---

## 🗂️ Topics Covered

| # | Topic | # | Topic |
| - | ----- | - | ----- |
| 1 | Arrays | 6 | Sorting |
| 2 | Linked List | 7 | Trees |
| 3 | Stack | 8 | Heap |
| 4 | Queue | 9 | Graphs |
| 5 | Searching | | |

---

## 🛠️ Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Frontend framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Code editor | Monaco Editor (`@monaco-editor/react`) |
| State management | Zustand (persisted to `localStorage`) |
| Routing | React Router |
| Execution service | Node.js + Express |
| Compilation & execution | Local `g++` via Node's `child_process` (no Docker) |
| Hosting (frontend) | Netlify |
| Hosting (execution service) | Any persistent Node host — Render, Railway, Fly.io, or a VPS |

---

## ⚙️ How It Works

```mermaid
flowchart LR
    A["✍️ Monaco Editor<br/>(browser)"] -->|"Run / Submit"| B["🖥️ Execution Service<br/>(Node + Express)"]
    B --> C["🔧 g++ compile"]
    C --> D["🧪 Run against tests"]
    D --> E["🔍 Diff output"]
    E --> F["🏁 Verdict"]
    F --> G["📊 UI + localStorage"]
```

1. **Problem authoring** — All 45 problems are written once as structured TypeScript source files, serving as the single source of truth.
2. **Data generation** — A build script splits each problem into two artifacts: a *public* version (hidden tests stripped out) that ships to the browser, and a *full* version (including hidden tests) that stays server-side only.
3. **Editing & running** — Users write C++ in the Monaco-based editor. Hitting **Run** or **Submit** sends the code to the execution service.
4. **Compilation & grading** — The execution service compiles the code with `g++`, runs it against the appropriate test set, and diffs actual output against expected output to determine one of five verdicts.
5. **Results & tracking** — Verdicts, per-test breakdowns, streaks, achievements, and submission history are reflected instantly in the UI and persisted locally in the browser.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher, and **npm**
- **g++** installed and available on your system `PATH` — only required for the Run/Submit feature. Browsing problems, the dashboard, and bookmarks all work without it.

| OS | Install g++ |
| -- | ----------- |
| macOS | `xcode-select --install` |
| Linux | Usually preinstalled; otherwise `sudo apt install g++` |
| Windows | Install via [MSYS2](https://www.msys2.org/) (recommended) or MinGW-w64, or use WSL |

### 1. Run the Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

> **Note:** The app runs fully for browsing, topics, dashboard, and bookmarks even without the execution service configured. The problem workspace shows a clear inline notice instead of failing silently if Run/Submit isn't available yet.

### 2. Run the Execution Service

The execution service is what actually compiles and runs submitted C++ code, so it is required for Run/Submit to function.

```bash
cd execution-service
npm install
npm run dev
```

This starts the API on `http://localhost:8080` by default.

### 3. Connect the Two

Point the frontend at the service by setting this in `frontend/.env.local`:

```env
VITE_EXECUTION_API_URL=http://localhost:8080
```

Restart the frontend dev server after changing this file so the new environment variable takes effect.

---

## 🔧 Environment Variables

### Frontend (`frontend/.env.local`)

| Variable | Purpose |
| -------- | ------- |
| `VITE_EXECUTION_API_URL` | Base URL of the execution service. If left unset, the app runs normally with Run/Submit disabled. |

### Execution Service

| Variable | Purpose | Default |
| -------- | ------- | ------- |
| `PORT` | Port the API listens on | `8080` |
| `ALLOWED_ORIGIN` | CORS origin allowed to call the API. Set this to your deployed frontend URL in production. | `*` |
| `RUNNER_IMAGE` | Name of the sandbox image, if applicable | `codeforge-runner:latest` |

---

## 🌐 Deployment

### Frontend

The frontend is a static Vite build and can be deployed to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.):

1. Push the repository to GitHub, GitLab, or Bitbucket and connect it to your hosting provider.
2. Set the build command to `npm run build` and the publish directory to `dist`, with the `frontend` folder as the base directory.
3. Add the `VITE_EXECUTION_API_URL` environment variable pointing to your deployed execution service, then redeploy.
4. Client-side routing (deep links like `/problems/two-sum`) is handled via SPA fallback redirects.

### Execution Service

The execution service compiles and runs code directly with `g++` via `child_process`, so it needs a **persistent Node process with `g++` on `PATH`**. This rules out serverless and ephemeral platforms. Suitable options include a small Linux VPS or a host like Render, Railway, or Fly.io.

```bash
git clone <your-repo-url>
cd codeforge/execution-service

sudo apt install g++    # or your distro's equivalent — must be on PATH
npm install
ALLOWED_ORIGIN=https://your-frontend-url.com npm start
```

In production, place the service behind a reverse proxy (Caddy, Nginx, or Traefik) for TLS and a real domain, then point `VITE_EXECUTION_API_URL` at that domain. Restrict `ALLOWED_ORIGIN` to your actual frontend URL rather than leaving it open to all origins.

---

## 🔐 Security Model

> [!WARNING]
> Code is compiled and executed directly on the execution-service host via `child_process` (`g++`, then the compiled binary). There is **no container or process-level sandbox**. This is appropriate for personal or trusted use, but **not suitable for accepting arbitrary code submissions from the public internet.**

- ⏱️ Each test run is bounded by a wall-clock execution timeout (the process is killed on expiry) and a compile timeout. There are no memory, CPU, or network usage caps.
- 🙈 Hidden test inputs and expected outputs are never sent to the browser. They are stripped out of the public data at build time, and the API only returns hidden-test details for non-hidden tests.
- 🚦 A simple in-memory per-IP rate limiter guards the run and submit endpoints. A proper gateway or WAF is recommended for production traffic at scale.

---

## 📄 License

For personal and portfolio use.

---

<div align="center">

**⚒️ CodeForge** — Practice • Compile • Solve

Built with React, TypeScript, and real `g++`

⭐ If you like this project, consider giving the repository a star.

</div>
