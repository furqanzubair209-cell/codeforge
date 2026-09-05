// splits content/ into two artifacts:
//  - frontend/src/data/generated/problems-public.json (no hiddenTests, safe for the browser)
//  - execution-service/src/data/problems-full.json (full data, server only)
//
// run: node scripts/generate-problem-data.mjs

import esbuild from "esbuild";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import os from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const entry = path.join(root, "content", "index.ts");

const tmpOut = path.join(os.tmpdir(), `codeforge-problems-${Date.now()}.cjs`);

await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: tmpOut,
  logLevel: "warning",
});

const mod = await import(`file://${tmpOut}`);
const { allProblems, topics, topicDescriptions } = mod;

if (!Array.isArray(allProblems) || allProblems.length === 0) {
  throw new Error("No problems found — generation aborted.");
}

const publicProblems = allProblems.map(({ hiddenTests, ...rest }) => rest);

const publicDir = path.join(root, "frontend", "src", "data", "generated");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(
  path.join(publicDir, "problems-public.json"),
  JSON.stringify({ problems: publicProblems, topics, topicDescriptions }, null, 2)
);

const fullDir = path.join(root, "execution-service", "src", "data");
fs.mkdirSync(fullDir, { recursive: true });
fs.writeFileSync(
  path.join(fullDir, "problems-full.json"),
  JSON.stringify({ problems: allProblems }, null, 2)
);

fs.unlinkSync(tmpOut);

console.log(`Generated ${allProblems.length} problems.`);
console.log(`  -> frontend/src/data/generated/problems-public.json (${publicProblems.length} problems, no hidden tests)`);
console.log(`  -> execution-service/src/data/problems-full.json (${allProblems.length} problems, full data)`);
