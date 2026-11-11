import { escapeHtml } from "./text.js";
export function renderSvg(report) {
  const score = Math.max(0, Math.min(100, Number(report.summary.score) || 0));
  const grade = escapeHtml(report.summary.grade);
  const title = escapeHtml(report.tool);
  const label = escapeHtml(report.summary.label || "Repository health");
  const dash = (score / 100) * 314;
  return '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-labelledby="title desc">' +
    '<title id="title">' + title + ' health score</title><desc id="desc">Repository health score ' + score + ' out of 100, grade ' + grade + '.</desc>' +
    '<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#0b1020"/><stop offset="1" stop-color="#192b4a"/></linearGradient><linearGradient id="accent"><stop stop-color="#56e0c2"/><stop offset="1" stop-color="#66aaff"/></linearGradient></defs>' +
    '<rect width="960" height="540" rx="32" fill="url(#bg)"/><circle cx="790" cy="110" r="130" fill="#5a9cff" opacity=".08"/>' +
    '<g fill="none" stroke="#31506d" stroke-width="2"><circle cx="790" cy="110" r="72"/><circle cx="790" cy="110" r="98"/><circle cx="790" cy="110" r="122"/></g>' +
    '<path d="M0 0H960V540H0Z" fill="none" stroke="#39506f" stroke-width="3"/>' +
    '<text x="64" y="86" fill="#8ee7e0" font-family="system-ui,sans-serif" font-size="22" letter-spacing="5">REPOSITORY INTELLIGENCE</text>' +
    '<text x="64" y="144" fill="#f4f8ff" font-family="system-ui,sans-serif" font-weight="700" font-size="42">' + title + '</text>' +
    '<circle cx="270" cy="324" r="112" stroke="#263d59" stroke-width="18" fill="none"/><circle cx="270" cy="324" r="112" stroke="url(#accent)" stroke-width="18" fill="none" stroke-linecap="round" stroke-dasharray="' + dash + ' 704" transform="rotate(-90 270 324)"><animate attributeName="stroke-dasharray" from="0 704" to="' + dash + ' 704" dur="1.4s" fill="freeze"/></circle>' +
    '<text x="270" y="332" fill="#ffffff" text-anchor="middle" font-family="system-ui,sans-serif" font-size="64" font-weight="800">' + score + '</text>' +
    '<text x="270" y="370" fill="#9db4d0" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18">OUT OF 100</text>' +
    '<text x="470" y="264" fill="#a9bfdc" font-family="system-ui,sans-serif" font-size="22">HEALTH GRADE</text>' +
    '<text x="470" y="350" fill="#ffffff" font-family="system-ui,sans-serif" font-size="92" font-weight="800">' + grade + '</text>' +
    '<text x="470" y="396" fill="#8ee7e0" font-family="system-ui,sans-serif" font-size="24">' + label + '</text>' +
    '<text x="64" y="490" fill="#8197b5" font-family="system-ui,sans-serif" font-size="16">' + report.summary.filesScanned + ' FILES · ' + report.summary.checksPassed + '/' + report.summary.checksTotal + ' CHECKS PASSED · GENERATED LOCALLY</text>' +
    '<path d="M0 180H960" stroke="#294361" opacity=".6"/><path d="M35 0V540" stroke="#294361" opacity=".4"/>' +
    '<circle cx="790" cy="110" r="8" fill="#74e6d3"><animate attributeName="r" values="7;13;7" dur="2.2s" repeatCount="indefinite"/></circle>' +
    '</svg>';
}
