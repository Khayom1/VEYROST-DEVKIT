import { createFinding } from "../findings.js";
export function checkTests(scan) {
  const hasTestFiles = scan.files.some((file) => /(^|\/)(test|tests|__tests__)(\/|$)|\.(test|spec)\./i.test(file));
  const hasScript = Boolean(scan.packageJson?.scripts?.test);
  const findings = [];
  if (!hasTestFiles) findings.push(createFinding({ ruleId:"TEST001", title:"Test files not found", severity:"medium", message:"No conventional automated test files or folders were detected.", recommendation:"Add tests for core behavior, edge cases, and failure paths." }));
  if (scan.packageJson && !hasScript) findings.push(createFinding({ ruleId:"TEST002", title:"Test command missing", severity:"medium", message:"package.json does not define scripts.test.", file:"package.json", recommendation:"Provide a single documented command for running tests." }));
  const passed = findings.length===0;
  return { id:"tests", passed, points:passed?15:Math.max(0,15-findings.length*7), possible:15, findings };
}
