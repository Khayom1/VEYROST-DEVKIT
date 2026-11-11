const PRIORITY = { critical:0, high:1, medium:2, low:3, info:4 };
export function summarizeReport(report) {
  const findings = [...(report.findings || [])];
  const recommendations = findings.filter((item)=>item.recommendation).sort((a,b)=>(PRIORITY[a.severity]??9)-(PRIORITY[b.severity]??9));
  return {
    score:report.summary.score, grade:report.summary.grade,
    passed:report.summary.checksPassed, total:report.summary.checksTotal,
    findings:findings.length, recommendations:recommendations.map((item)=>({severity:item.severity, text:item.recommendation, ruleId:item.ruleId})),
    status:report.summary.score>=90?"healthy":report.summary.score>=70?"needs-improvement":"at-risk"
  };
}
