import test from "node:test";
import assert from "node:assert/strict";
import { getExitCode, EXIT_CODES } from "../src/exit-codes.js";
const report=(severity,score=95)=>({findings:severity?[{severity}]:[],summary:{score}});
test("high findings fail by default",()=>{
  assert.equal(getExitCode(report("high")),EXIT_CODES.FINDINGS);
  assert.equal(getExitCode(report("low")),EXIT_CODES.OK);
});
test("configured severity thresholds and strict scores are enforced",()=>{
  assert.equal(getExitCode(report("medium"),false,"medium"),EXIT_CODES.FINDINGS);
  assert.equal(getExitCode(report(null,70),true),EXIT_CODES.FINDINGS);
  assert.equal(getExitCode(null),EXIT_CODES.INTERNAL);
});
