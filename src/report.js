export function createReport(scan, assessment) {
  return {
    tool:"VEYROST-DEVKIT", schemaVersion:1, generatedAt:new Date().toISOString(),
    repository:scan.root,
    summary:{score:assessment.score,grade:assessment.grade,filesScanned:scan.fileCount,detectedSecrets:scan.secrets.length},
    checks:assessment.checks,recommendations:assessment.recommendations,findings:scan.secrets
  };
}
export function formatTerminal(report) {
  const s=report.summary;
  const findingCount=s.findings ?? report.findings?.length ?? 0;
  const highCount=(s.severity?.critical ?? 0)+(s.severity?.high ?? 0);
  const lines=["","VEYROST-DEVKIT — Repository Health Report","========================================",
    "Health score: "+s.score+"/100 (Grade "+s.grade+")",
    "Files inspected: "+s.filesScanned,
    "Findings: "+findingCount+" ("+highCount+" high/critical)","","Checks:"];
  for(const check of report.checks) lines.push((check.passed?"PASS":"REVIEW")+"  "+check.id+" ("+check.points+"/"+check.possible+")");
  const actions=report.findings?.filter((item)=>item.recommendation) || [];
  if(actions.length){lines.push("","Recommended next steps:");actions.slice(0,10).forEach((item,i)=>lines.push((i+1)+". "+item.recommendation));}
  lines.push("");
  return lines.join("\n");
}
