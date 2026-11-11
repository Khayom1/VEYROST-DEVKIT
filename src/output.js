import fs from "node:fs";
import path from "node:path";
export function writeOutput(filePath, content) {
  const target = path.resolve(filePath);
  fs.mkdirSync(path.dirname(target), { recursive:true });
  fs.writeFileSync(target, String(content), { encoding:"utf8", flag:"w" });
  return target;
}
export function outputExtension(format) {
  return ({ json:".json", markdown:".md", md:".md", html:".html", svg:".svg", text:".txt", terminal:".txt", badge:".svg" })[format] || ".txt";
}
