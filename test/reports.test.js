import test from "node:test";
import assert from "node:assert/strict";
import { renderMarkdown } from "../src/markdown-report.js";
import { renderHtml } from "../src/html-report.js";
import { renderSvg } from "../src/svg-report.js";
import { renderBadge } from "../src/badge.js";
const sample={tool:"VEYROST-DEVKIT",generatedAt:"2026-11-11T10:00:00Z",summary:{score:88,grade:"B",label:"Good",filesScanned:12,checksPassed:4,checksTotal:5,findings:1},
  checks:[{id:"readme",passed:true,points:15,possible:15}],findings:[{severity:"low",title:"Review <title>",message:"Unsafe & unusual",location:{file:"src/a.js",line:3},recommendation:"Review it."}]};
test("Markdown renderer includes score and recommendations",()=>{
  const output=renderMarkdown(sample);
  assert.match(output,/88\/100/);
  assert.match(output,/Review it/);
});
test("HTML renderer escapes untrusted report text",()=>{
  const output=renderHtml(sample);
  assert.match(output,/Review &lt;title&gt;/);
  assert.match(output,/Unsafe &amp; unusual/);
});
test("SVG report and badge contain accessible labels and bounded values",()=>{
  assert.match(renderSvg(sample),/aria-labelledby/);
  assert.match(renderBadge(140,"A"),/100\/100/);
});
