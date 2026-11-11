import { createFinding } from "../findings.js";
const RULES = [
  ["SECRET001", "Private key header", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g, "high"],
  ["SECRET002", "GitHub token pattern", /\b(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,})\b/g, "high"],
  ["SECRET003", "AWS access key pattern", /\bAKIA[0-9A-Z]{16}\b/g, "high"]
];
export function scanSecretText(file, content) {
  const findings = [];
  const text = String(content || "");
  for (const [ruleId, title, regex, severity] of RULES) {
    regex.lastIndex = 0;
    for (const match of text.matchAll(regex)) {
      const line = text.slice(0, match.index).split("\n").length;
      findings.push(createFinding({ ruleId, title, severity, message:"A value matching a known credential pattern was detected. Review locally; this may be a false positive.", file, line, recommendation:"Do not commit credentials. Revoke and rotate any real exposed secret." }));
    }
  }
  return findings;
}
export function checkSecrets(scan) {
  const findings = (scan.secretFindings || []).flat();
  const passed = findings.length===0;
  return { id:"secrets", passed, points:passed?20:0, possible:20, findings };
}
