import test from "node:test";
import assert from "node:assert/strict";
import { scoreRepository } from "../src/scoring.js";
const healthy = { hasReadme:true, hasLicense:true, hasGitignore:true, hasPackageJson:true,
  packageJson:{scripts:{test:"node --test"}}, hasTests:true, hasCi:true, hasContributing:true,
  hasSecurityPolicy:true, secrets:[] };
test("all passing checks produce a score of 100 and grade A", () => {
  const result = scoreRepository(healthy);
  assert.equal(result.score, 100);
  assert.equal(result.grade, "A");
  assert.deepEqual(result.recommendations, []);
});
test("missing controls produce actionable recommendations", () => {
  const result = scoreRepository({ ...healthy, hasReadme:false, hasLicense:false, hasTests:false, secrets:[{type:"token-like"}] });
  assert.equal(result.score, 60);
  assert.ok(result.recommendations.length >= 4);
});
test("a detected secret reduces the score by twenty points", () => {
  assert.equal(scoreRepository({ ...healthy, secrets:[{type:"token-like"}] }).score, 80);
});
