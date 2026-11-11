import { escapeHtml } from "./text.js";
export function renderBadge(score, grade) {
  const value = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
  const safeGrade = escapeHtml(grade || "—");
  return '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="32" viewBox="0 0 220 32" role="img" aria-label="Repository health ' + value + ' out of 100, grade ' + safeGrade + '">' +
    '<rect width="220" height="32" rx="7" fill="#202b3d"/><path d="M0 7a7 7 0 0 1 7-7h90v32H7a7 7 0 0 1-7-7z" fill="#344760"/>' +
    '<text x="48" y="21" font-family="Verdana,sans-serif" font-size="11" fill="#fff" text-anchor="middle">VEYROST HEALTH</text>' +
    '<text x="151" y="21" font-family="Verdana,sans-serif" font-size="12" font-weight="bold" fill="#8de5d5" text-anchor="middle">' + value + '/100 ' + safeGrade + '</text></svg>';
}
