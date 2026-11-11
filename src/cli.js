#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { inspectRepository } from "./scanner.js";
import { scoreRepository } from "./scoring.js";
import { createReport, formatTerminal } from "./report.js";
const args = process.argv.slice(2);
const target = args.find((arg) => !arg.startsWith("-")) || ".";
const json = args.includes("--json");
const outputArg = args.find((arg) => arg.startsWith("--output="));
const root = path.resolve(target);
if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error("Error: directory not found: " + root);
  process.exitCode = 2;
} else {
  const scan = inspectRepository(root);
  const report = createReport(scan, scoreRepository(scan));
  if (json) console.log(JSON.stringify(report, null, 2));
  else console.log(formatTerminal(report));
  if (outputArg) {
    const outputPath = path.resolve(outputArg.slice("--output=".length));
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n", "utf8");
    console.log("JSON report written to " + outputPath);
  }
  if (scan.secrets.length) process.exitCode = 1;
}
