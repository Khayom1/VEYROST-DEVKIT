import { createFinding } from "../findings.js";
export function checkLicense(scan) {
  const file = scan.files.find((name) => /^licen[cs]e(?:\.|$)/i.test(name.split("/").pop() || ""));
  if (!file) return { id:"license", passed:false, points:0, possible:10, findings:[createFinding({ ruleId:"META001", title:"License missing", severity:"medium", message:"No LICENSE file was found.", recommendation:"Choose a license that matches the project's intended reuse." })] };
  const content = scan.licenseContent || "";
  const recognized = ["MIT License","Apache License","GNU GENERAL PUBLIC LICENSE","BSD 2-Clause","BSD 3-Clause","Mozilla Public License","ISC License"].some((marker) => content.toLowerCase().includes(marker.toLowerCase()));
  const findings = recognized ? [] : [createFinding({ ruleId:"META002", title:"License needs review", severity:"low", message:"A license file exists but its type could not be identified by the built-in checks.", file, recommendation:"Verify that the license text is complete and clearly identifies its terms." })];
  return { id:"license", passed:findings.length===0, points:findings.length===0?10:7, possible:10, findings };
}
