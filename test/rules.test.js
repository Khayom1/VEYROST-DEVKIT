import test from "node:test";
import assert from "node:assert/strict";
import { checkReadme } from "../src/rules/readme.js";
import { checkLicense } from "../src/rules/license.js";
import { checkWorkflows } from "../src/rules/workflows.js";
import { scanSecretText } from "../src/rules/secrets.js";
test("README check reports missing documentation sections",()=>{
  const result=checkReadme({hasReadme:true,readmeContent:"# Tiny project"});
  assert.equal(result.passed,false);
  assert.ok(result.findings.length>=2);
});
test("license check recognizes a standard MIT heading",()=>{
  const result=checkLicense({files:["LICENSE"],licenseContent:"MIT License\nPermission is hereby granted"});
  assert.equal(result.passed,true);
  assert.equal(result.points,10);
});
test("workflow check requires jobs and a trigger",()=>{
  const result=checkWorkflows({files:[".github/workflows/ci.yml"],readText:()=>"name: Broken\n"});
  assert.equal(result.passed,false);
  assert.equal(result.points,0);
  assert.ok(result.findings.some((item)=>item.ruleId==="CI002"));
});
test("secret scanner identifies token-like values and line numbers",()=>{
  const token=["ghp_","B".repeat(30)].join("");
  const results=scanSecretText("settings.js","const a = 1;\nconst token = "+JSON.stringify(token)+";");
  assert.equal(results.length,1);
  assert.equal(results[0].location.line,2);
});
