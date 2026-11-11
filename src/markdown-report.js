import { escapeHtml } from "./text.js";
export function renderMarkdown(report) {
  const s = report.summary;
  const lines = ["# " + report.tool + " — Repository Health", "", "> Generated: " + report.generatedAt, "",
    "## Summary", "", "| Metric | Result |", "|---|---:|",
    "| Health score | **" + s.score + "/100 (" + s.grade + ")** |",
    "| Files scanned | " + s.filesScanned + " |",
    "| Checks passed | " + s.checksPassed + "/" + s.checksTotal + " |",
    "| Findings | " + s.findings + " |", "", "## Checks", "",
    "| Check | Result | Points |", "|---|---|---:|"];
  for (const check of report.checks) lines.push("| " + check.id + " | " + (check.passed ? "PASS" : "REVIEW") + " | " + check.points + "/" + check.possible + " |");
  lines.push("", "## Findings", "");
  if (!report.findings.length) lines.push("No findings from the configured checks.");
  else for (const item of report.findings) lines.push("- **" + item.severity.toUpperCase() + " — " + item.title + "** (" + (item.location?.file || "repository") + "): " + item.message);
  lines.push("", "## Next steps", "");
  const actions = report.findings.filter((item) => item.recommendation).slice(0, 12);
  if (!actions.length) lines.push("Keep checks passing and review changes regularly.");
  else actions.forEach((item, i) => lines.push((i + 1) + ". " + item.recommendation));
  lines.push("", "---", "", "Generated locally by " + report.tool + ". The score is advisory, not a security certification.", "");
  return lines.join("\n");
}
