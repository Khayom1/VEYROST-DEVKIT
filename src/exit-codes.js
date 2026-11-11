export const EXIT_CODES = Object.freeze({ OK:0, FINDINGS:1, USAGE:2, INTERNAL:3 });
const SEVERITY_RANK = { critical:0, high:1, medium:2, low:3, info:4 };
export function getExitCode(report, strict = false, failOn = "high") {
  if (!report) return EXIT_CODES.INTERNAL;
  if (failOn==="none" && !strict) return EXIT_CODES.OK;
  const threshold=strict?"low":failOn;
  const rank=SEVERITY_RANK[threshold] ?? SEVERITY_RANK.high;
  const blocking=report.findings.some((finding)=>(SEVERITY_RANK[finding.severity]??9)<=rank);
  if (blocking || (strict && report.summary.score<80)) return EXIT_CODES.FINDINGS;
  return EXIT_CODES.OK;
}
