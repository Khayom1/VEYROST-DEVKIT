import fs from "node:fs";
import path from "node:path";
import { DEFAULT_MAX_FILES, DEFAULT_EXCLUDED_DIRS } from "./constants.js";
import { parseIgnorePatterns, isIgnored } from "./ignore.js";
export function walkFiles(root, options = {}) {
  const maxFiles = options.maxFiles || DEFAULT_MAX_FILES;
  const excluded = new Set([...DEFAULT_EXCLUDED_DIRS, ...(options.excludedDirectories || [])]);
  const patterns = parseIgnorePatterns([options.gitignore || "", ...(options.ignorePatterns || [])].join("\n"));
  const found = [];
  function visit(dir) {
    if (found.length >= maxFiles) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes:true }); } catch { return; }
    for (const entry of entries) {
      if (found.length >= maxFiles) break;
      if (excluded.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      const relative = path.relative(root, full).split(path.sep).join("/");
      if (isIgnored(relative, patterns)) continue;
      if (entry.isDirectory()) visit(full);
      else if (entry.isFile()) found.push(relative);
    }
  }
  visit(root);
  return found.sort();
}
export function inspectRepository(root, options = {}) {
  const gitignore = (()=>{try{return fs.readFileSync(path.join(root,".gitignore"),"utf8");}catch{return "";}})();
  const files = walkFiles(root, { ...options, gitignore });
  const exists = (name) => files.includes(name);
  const read = (name) => { try { return fs.readFileSync(path.join(root,name),"utf8"); } catch { return ""; } };
  let packageJson = null;
  try { packageJson = JSON.parse(read("package.json")); } catch {}
  const sourceFiles = files.filter((f) => /\.(js|mjs|cjs|ts|tsx|jsx|json|md|yml|yaml|toml|html|css|sh|env)$/i.test(f));
  const sourceText = sourceFiles.map(read).join("\n");
  const secrets = [];
  const patterns = [
    ["private-key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
    ["token-like", /\b(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,})\b/g],
    ["aws-access-key", /\bAKIA[0-9A-Z]{16}\b/g]
  ];
  for (const [type, regex] of patterns) for (const match of sourceText.matchAll(regex)) secrets.push({ type, sample:match[0].slice(0,8)+"…" });
  return {
    root:path.resolve(root), files, fileCount:files.length,
    hasReadme:exists("README.md") || exists("readme.md"),
    hasLicense:files.some((f)=>/^licen[cs]e(?:\.|$)/i.test(path.basename(f))),
    hasGitignore:exists(".gitignore"), hasPackageJson:Boolean(packageJson), packageJson,
    hasTests:files.some((f)=>(/(^|\/)(test|tests|__tests__)(\/|$)|\.(test|spec)\./i).test(f)),
    hasCi:files.some((f)=>f.startsWith(".github/workflows/")),
    hasContributing:exists("CONTRIBUTING.md"),
    hasSecurityPolicy:exists("SECURITY.md") || exists(".github/SECURITY.md"),
    secrets
  };
}
