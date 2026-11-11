import test from "node:test";
import assert from "node:assert/strict";
import { parseIgnorePatterns, isIgnored } from "../src/ignore.js";
test("matches common file and directory ignore patterns",()=>{
  const rules=parseIgnorePatterns("*.log\ncoverage/\n.env");
  assert.equal(isIgnored("debug.log",rules),true);
  assert.equal(isIgnored("reports/debug.log",rules),true);
  assert.equal(isIgnored("coverage/lcov.info",rules),true);
  assert.equal(isIgnored(".env",rules),true);
  assert.equal(isIgnored("src/index.js",rules),false);
});
test("later negation patterns restore an explicitly included file",()=>{
  const rules=parseIgnorePatterns("*.log\n!important.log");
  assert.equal(isIgnored("debug.log",rules),true);
  assert.equal(isIgnored("important.log",rules),false);
});
test("empty and comment-only lines are ignored",()=>{
  assert.equal(parseIgnorePatterns("# comment\n\n").length,0);
});
