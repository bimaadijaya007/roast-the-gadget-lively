import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My earbuds lose connection the moment I walk into the kitchen — they have the range of a goldfish and the loyalty of a cat.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

function validate(line) {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

function main() {
  validate(LINE);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const path = `${OUTPUT_DIR}/entry.txt`;
  writeFileSync(path, LINE + "\n", "utf8");
  const back = readFileSync(path, "utf8");
  if (back !== LINE + "\n") {
    throw new Error("round-trip check failed: entry.txt does not match the line");
  }
  console.log(`wrote ${[...LINE].length} characters to ${path}`);
  console.log(LINE);
}

main();
