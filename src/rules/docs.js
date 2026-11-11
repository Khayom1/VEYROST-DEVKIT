import { createFinding } from "../findings.js";
export function checkProjectDocs(scan) {
  const findings = [];
  if (!scan.hasContributing) findings.push(createFinding({ ruleId:"DOC010", title:"Contribution guide missing", severity:"info", message:"CONTRIBUTING.md was not found.", recommendation:"Document local setup, tests, and pull request expectations." }));
  if (!scan.hasSecurityPolicy) findings.push(createFinding({ ruleId:"SEC010", title:"Security policy missing", severity:"medium", message:"No SECURITY.md policy was found.", recommendation:"Explain how to report vulnerabilities privately." }));
  const passed = findings.length===0;
  return { id:"project-docs", passed, points:passed?10:Math.max(0,10-findings.length*5), possible:10, findings };
}
