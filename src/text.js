export function normalizeWhitespace(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}
export function stripMarkdown(value) {
  return String(value ?? "")
    .replace(/\!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#+\s?/gm, "")
    .replace(/[*_`~>]/g, "")
    .replace(/\r/g, "");
}
export function countWords(value) {
  const cleaned = normalizeWhitespace(stripMarkdown(value));
  return cleaned ? cleaned.split(" ").length : 0;
}
export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}
export function slugify(value) {
  return normalizeWhitespace(value).toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
