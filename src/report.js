export function createReport(scan, assessment) {
  return {
    tool: "VEYROST-DEVKIT", schemaVersion: 1, generatedAt: new Date().toISOString(),
    repository: scan.root,
    summary: { score: assessment.score, grade: assessment.grade, filesScanned: scan.fileCount, detectedSecrets: scan.secrets.length },
    checks: assessment.checks, recommendations: assessment.recommendations, findings: scan.secrets
  };
}
export function formatTerminal(report) {
  const s = report.summary;
  const lines = ["", "VEYROST-DEVKIT — Repository Health Report", "========================================",
    "Health score: " + s.score + "/100 (Grade " + s.grade + ")",
    "Files inspected: " + s.filesScanned, "Potential secrets: " + s.detectedSecrets, "", "Checks:"];
  for (const c of report.checks) lines.push((c.passed ? "PASS" : "FAIL") + "  " + c.name + " (" + c.points + "/" + c.possible + ")");
  if (report.recommendations.length) {
    lines.push("", "Recommended next steps:");
    report.recommendations.forEach((item, i) => lines.push((i + 1) + ". " + item));
  }
  lines.push("");
  return lines.join("\n");
}
