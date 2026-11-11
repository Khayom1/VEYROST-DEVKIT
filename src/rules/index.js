import { checkReadme } from "./readme.js";
import { checkLicense } from "./license.js";
import { checkGitignore } from "./gitignore.js";
import { checkPackage } from "./package.js";
import { checkTests } from "./tests.js";
import { checkWorkflows } from "./workflows.js";
import { checkProjectDocs } from "./docs.js";
import { checkSecrets } from "./secrets.js";
export const RULES = Object.freeze([checkReadme, checkLicense, checkGitignore, checkPackage, checkTests, checkWorkflows, checkProjectDocs, checkSecrets]);
export function runRules(scan) {
  return RULES.map((rule) => rule(scan));
}
