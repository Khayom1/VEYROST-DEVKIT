import { createFinding } from "../findings.js";
export function checkGitignore(scan) {
  const content = scan.gitignoreContent || "";
  const checks = [
    [".env", /(^|\n)\s*\.env(?:\*|\s|$)/],
    ["node_modules", /(^|\n)\s*node_modules\/?\s*(?:\n|$)/],
    ["coverage", /(^|\n)\s*coverage\/?\s*(?:\n|$)/]
  ];
  const findings = [];
  if (!scan.hasGitignore) findings.push(createFinding({ ruleId:"META003", title:".gitignore missing", severity:"low", message:"The repository has no .gitignore file.", recommendation:"Add a .gitignore for generated files and local secrets." }));
  for (const [name, regex] of checks) if (!regex.test(content)) findings.push(createFinding({ ruleId:"META004", title:"Ignore rule missing", severity:"low", message:"The .gitignore does not clearly exclude " + name + ".", file:".gitignore", recommendation:"Add an appropriate ignore entry for " + name + "." }));
  const passed = findings.length===0;
  return { id:"gitignore", passed, points:passed?5:Math.max(0,5-findings.length), possible:5, findings };
}
