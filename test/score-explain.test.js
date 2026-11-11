import test from "node:test";
import assert from "node:assert/strict";
import { getScoreGrade, explainScore } from "../src/score-explain.js";
test("maps score bands to stable grades",()=>{
  assert.equal(getScoreGrade(100).grade,"A");
  assert.equal(getScoreGrade(85).grade,"B");
  assert.equal(getScoreGrade(75).grade,"C");
  assert.equal(getScoreGrade(65).grade,"D");
  assert.equal(getScoreGrade(20).grade,"F");
});
test("clamps out-of-range scores",()=>{
  assert.equal(explainScore(120).score,100);
  assert.equal(explainScore(-10).score,0);
  assert.ok(explainScore(50).explanation.length>10);
});
