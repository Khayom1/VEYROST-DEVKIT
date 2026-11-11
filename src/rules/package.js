import { createFinding } from "../findings.js";
export function checkPackage(scan) {
  const pkg = scan.packageJson;
  const findings = [];
  if (!pkg) findings.push(createFinding({ ruleId:"PKG001", title:"package.json missing or invalid", severity:"info", message:"No valid package.json was detected.", recommendation:"For Node.js projects, add valid package metadata and useful scripts." }));
  else {
    if (!pkg.name) findings.push(createFinding({ ruleId:"PKG002", title:"Package name missing", severity:"low", message:"package.json has no name field.", file:"package.json", recommendation:"Add a stable package name." }));
    if (!pkg.description) findings.push(createFinding({ ruleId:"PKG003", title:"Package description missing", severity:"info", message:"package.json has no description field.", file:"package.json", recommendation:"Add a one-line package description." }));
    if (!pkg.scripts?.test) findings.push(createFinding({ ruleId:"PKG004", title:"Test script missing", severity:"medium", message:"No npm test script is defined.", file:"package.json", recommendation:"Add a repeatable automated test command." }));
    if (!pkg.engines?.node) findings.push(createFinding({ ruleId:"PKG005", title:"Node engine not declared", severity:"info", message:"Supported Node.js versions are not declared.", file:"package.json", recommendation:"Declare the minimum supported Node.js version." }));
  }
  const passed = findings.length===0;
  return { id:"package", passed, points:passed?10:Math.max(0,10-findings.length*2), possible:10, findings };
}
