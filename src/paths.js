import path from "node:path";
export function toPosixPath(value) {
  return String(value).replace(/\\/g,"/");
}
export function isInsideRoot(root, candidate) {
  const base=path.resolve(root);
  const target=path.resolve(base,candidate);
  return target===base || target.startsWith(base+path.sep);
}
export function resolveInsideRoot(root,candidate) {
  if (!isInsideRoot(root,candidate)) throw new Error("Path escapes repository root: "+candidate);
  return path.resolve(root,candidate);
}
export function relativePosix(root,absolutePath) {
  return toPosixPath(path.relative(root,absolutePath));
}
