import fs from "node:fs";
import path from "node:path";
export function safeReadText(root, relativePath, fallback = "") {
  try {
    const fullPath = path.resolve(root, relativePath);
    const rootPath = path.resolve(root) + path.sep;
    if (fullPath !== path.resolve(root) && !fullPath.startsWith(rootPath)) return fallback;
    return fs.readFileSync(fullPath, "utf8");
  } catch { return fallback; }
}
export function safeReadJson(root, relativePath) {
  const text = safeReadText(root, relativePath, "");
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
}
export function isReadableFile(filePath) {
  try { return fs.statSync(filePath).isFile() && fs.accessSync(filePath, fs.constants.R_OK) === undefined; }
  catch { return false; }
}
