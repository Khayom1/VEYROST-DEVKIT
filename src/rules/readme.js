import { countWords } from "../text.js";
import { createFinding } from "../findings.js";
export function checkReadme(scan) {
  const content = scan.readmeContent || "";
  const findings = [];
  const sections = ["installation", "usage", "license"];
  if (!scan.hasReadme) {
    findings.push(createFinding({ ruleId:"DOC001", title:"README missing", severity:"medium", message:"The repository has no README.md.", recommendation:"Add a README explaining the project, setup, and basic usage." }));
    return { id:"readme", passed:false, points:0, possible:15, findings };
  }
  if (countWords(content) < 35) findings.push(createFinding({ ruleId:"DOC002", title:"README is very short", severity:"low", message:"The README contains fewer than 35 words.", file:"README.md", recommendation:"Add project context, installation instructions, and a usage example." }));
  for (const section of sections) {
    if (!new RegExp("^#{1,4}\\s+.*" + section, "im").test(content)) {
      findings.push(createFinding({ ruleId:"DOC003", title:"README section missing", severity:"low", message:"README does not clearly include a " + section + " section.", file:"README.md", recommendation:"Add a " + section + " section to the README." }));
    }
  }
  return { id:"readme", passed:findings.length===0, points:findings.length===0?15:Math.max(5,15-findings.length*3), possible:15, findings };
}
