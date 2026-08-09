#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const allowExternal = args.includes("--allow-external");
const input = args.find((arg) => !arg.startsWith("--")) || "dist/index.html";
const entry = path.resolve(input);

if (!fs.existsSync(entry)) {
  console.error(`Missing build entry: ${entry}`);
  process.exit(1);
}

const root = path.dirname(entry);
const unresolvedPatterns = [
  /\bTODO\b/i,
  /\bTBD\b/i,
  /待补充/g,
  /待确认/g,
  /待替换/g,
  /lorem ipsum/gi,
];
const textExtensions = new Set([".html", ".js", ".css", ".json", ".svg", ".txt"]);
const problems = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entryInfo) => {
    const file = path.join(directory, entryInfo.name);
    return entryInfo.isDirectory() ? walk(file) : [file];
  });
}

const files = walk(root);
for (const file of files) {
  if (!textExtensions.has(path.extname(file).toLowerCase())) continue;
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of unresolvedPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) {
      problems.push(`Unresolved marker ${pattern} in ${path.relative(root, file)}`);
    }
  }
}

const html = fs.readFileSync(entry, "utf8");
const refs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)].map((match) => match[1]);
for (const ref of refs) {
  if (/^(data:|#|mailto:|tel:|javascript:)/i.test(ref)) continue;
  if (/^https?:\/\//i.test(ref)) {
    if (!allowExternal) problems.push(`External dependency: ${ref}`);
    continue;
  }
  const cleanRef = ref.split(/[?#]/)[0];
  const assetPath = path.resolve(root, cleanRef);
  if (!fs.existsSync(assetPath)) problems.push(`Missing local asset: ${ref}`);
}

if (problems.length) {
  console.error("Deck validation failed:");
  for (const problem of [...new Set(problems)]) console.error(`- ${problem}`);
  process.exit(1);
}

console.log(`Deck validation passed: ${path.relative(process.cwd(), entry)}`);
console.log(`Checked ${files.length} build files and ${refs.length} entry references.`);
