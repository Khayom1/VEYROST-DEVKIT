const VALID_SEVERITIES = new Set(["critical", "high", "medium", "low", "info"]);
export function createFinding({ ruleId, title, message, severity = "info", file = null, line = null, recommendation = null }) {
  if (!ruleId || !title || !message) throw new TypeError("ruleId, title, and message are required");
  if (!VALID_SEVERITIES.has(severity)) throw new TypeError("Unsupported severity: " + severity);
  return { ruleId, title, message, severity, location: file ? { file, line } : null, recommendation };
}
export function deduplicateFindings(findings) {
  const seen = new Set();
  return findings.filter((finding) => {
    const key = [finding.ruleId, finding.location?.file, finding.location?.line, finding.message].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
export function countBySeverity(findings) {
  return findings.reduce((counts, item) => {
    counts[item.severity] = (counts[item.severity] || 0) + 1;
    return counts;
  }, { critical: 0, high: 0, medium: 0, low: 0, info: 0 });
}
