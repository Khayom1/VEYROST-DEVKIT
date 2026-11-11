export const EXIT_CODES = Object.freeze({ OK:0, FINDINGS:1, USAGE:2, INTERNAL:3 });
export function getExitCode(report, strict = false) {
  if (!report) return EXIT_CODES.INTERNAL;
  const blocking = report.findings.some((finding) => finding.severity==="critical" || finding.severity==="high");
  if (blocking || (strict && report.summary.score < 80)) return EXIT_CODES.FINDINGS;
  return EXIT_CODES.OK;
}
