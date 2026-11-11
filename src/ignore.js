import path from "node:path";
function escapeRegex(value) {
  return value.replace(/[.+^${}()|[\]\\]/g, "\\$&");
}
function patternToRegex(pattern) {
  const normalized = pattern.replace(/\\/g, "/").replace(/^\//, "");
  let source = "";
  for (let i = 0; i < normalized.length; i += 1) {
    const char = normalized[i];
    if (char === "*" && normalized[i + 1] === "*") {
      source += ".*"; i += 1;
    } else if (char === "*") source += "[^/]*";
    else if (char === "?") source += "[^/]";
    else source += escapeRegex(char);
  }
  if (normalized.endsWith("/")) source += ".*";
  else if (!normalized.includes("/")) source = "(?:^|/)" + source + "(?:$|/)";
  else source = "^" + source + "(?:$|/)";
  return new RegExp(source);
}
export function parseIgnorePatterns(text = "") {
  return String(text).split(/\r?\n/).map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => ({ negate: line.startsWith("!"), raw: line.replace(/^!/, ""), regex: patternToRegex(line.replace(/^!/, "")) }));
}
export function isIgnored(relativePath, patterns = []) {
  const candidate = relativePath.split(path.sep).join("/");
  let ignored = false;
  for (const item of patterns) if (item.regex.test(candidate)) ignored = !item.negate;
  return ignored;
}
