import fs from "node:fs";
import path from "node:path";
import { inspectRepository } from "./scanner.js";
import { runRules } from "./rules/index.js";
import { scanSecretText } from "./rules/secrets.js";
import { deduplicateFindings, countBySeverity } from "./findings.js";
import { TOOL_NAME, TOOL_VERSION } from "./constants.js";
import { getScoreGrade } from "./score-explain.js";
export function analyzeRepository(root, config = {}) {
  const absolute = path.resolve(root);
  const scan = inspectRepository(absolute, config);
  const readText = (file) => {
    try { return fs.readFileSync(path.resolve(absolute, file), "utf8"); } catch { return ""; }
  };
  scan.readText = readText;
  scan.readmeContent = readText("README.md") || readText("readme.md");
  scan.licenseContent = scan.files.filter((file) => /^licen[cs]e(?:\.|$)/i.test(path.basename(file))).map(readText).join("\n");
  scan.gitignoreContent = readText(".gitignore");
  scan.secretFindings = scan.files.filter((file) => /\.(js|mjs|cjs|ts|json|ya?ml|toml|sh|env)$/i.test(file)).map((file) => scanSecretText(file, readText(file)));
  const checks = runRules(scan);
  const findings = deduplicateFindings(checks.flatMap((check) => check.findings));
  const score = checks.reduce((total, check) => total + check.points, 0);
  const possible = checks.reduce((total, check) => total + check.possible, 0);
  const percentage = possible ? Math.round(score / possible * 100) : 0;
  const grade = getScoreGrade(percentage);
  return {
    tool:TOOL_NAME, version:TOOL_VERSION, schemaVersion:1,
    generatedAt:new Date().toISOString(), repository:absolute,
    summary:{ score:percentage, grade:grade.grade, label:grade.label, filesScanned:scan.fileCount,
      checksPassed:checks.filter((item)=>item.passed).length, checksTotal:checks.length,
      findings:findings.length, severity:countBySeverity(findings) },
    checks, findings
  };
}
