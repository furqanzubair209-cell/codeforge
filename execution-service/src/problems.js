import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(path.join(__dirname, "data", "problems-full.json"), "utf-8");
const { problems } = JSON.parse(raw);

const byId = new Map(problems.map((p) => [p.id, p]));

export function getProblemById(id) {
  return byId.get(id);
}
