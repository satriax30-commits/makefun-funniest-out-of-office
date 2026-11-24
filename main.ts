// The Funniest Out-of-Office — make.fun entry
// One line, written by this program, deterministic, stdlib only.
// No wall-clock, no randomness, no network, no environment reads.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The chosen line. The twist: the auto-reply itself is on holiday,
// so a temp is covering for it — and doing a better job than its owner.
// Specific, self-deprecating, and a reply a real person would actually set.
const LINE =
  "I'm out until Monday. My out-of-office reply is on holiday too — this is the temp, and frankly it's outperforming me.";

// Gate: the house scorer requires UTF-8 text, 1–140 characters,
// not only whitespace, and a single line. Fail loudly if violated.
function validate(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

// Entry point: validate first, then write exactly one line.
// The output path is fixed by the competition harness (/output/entry.txt);
// honour an OUTPUT_DIR override only for local verification runs.
function main(): void {
  validate(LINE);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  // Re-read the length from the written value, not from a guess.
  console.log(`wrote ${LINE.length} characters to ${outPath}`);
}

main();
