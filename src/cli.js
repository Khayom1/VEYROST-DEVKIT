#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "./args.js";
import { analyzeRepository } from "./engine.js";
import { loadConfig } from "./config.js";
import { formatTerminal } from "./report.js";
import { renderMarkdown } from "./markdown-report.js";
import { renderHtml } from "./html-report.js";
import { renderSvg } from "./svg-report.js";
import { renderBadge } from "./badge.js";
import { writeOutput } from "./output.js";
import { getExitCode, EXIT_CODES } from "./exit-codes.js";
import { renderHelp } from "./cli-help.js";
function render(report, format) {
  if (format==="json") return JSON.stringify(report,null,2) + "\n";
  if (format==="markdown" || format==="md") return renderMarkdown(report);
  if (format==="html") return renderHtml(report);
  if (format==="svg") return renderSvg(report);
  if (format==="badge") return renderBadge(report.summary.score,report.summary.grade);
  return formatTerminal(report);
}
try {
  const options=parseArgs(process.argv.slice(2));
  if (options.help) { console.log(renderHelp()); process.exitCode=EXIT_CODES.OK; }
  else {
    const root=path.resolve(options.target);
    if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) throw new Error("Directory not found: "+root);
    const config=loadConfig(root,options.config);
    const report=analyzeRepository(root,config);
    const output=render(report,options.format);
    if (options.output) console.log("Report written to "+writeOutput(options.output,output));
    else process.stdout.write(output.endsWith("\n")?output:output+"\n");
    process.exitCode=getExitCode(report,options.strict,config.failOn);
  }
} catch(error) {
  console.error("VEYROST-DEVKIT: "+error.message);
  process.exitCode=EXIT_CODES.USAGE;
}
