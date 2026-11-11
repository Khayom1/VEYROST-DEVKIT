import test from "node:test";
import assert from "node:assert/strict";
import { createFinding, deduplicateFindings, countBySeverity } from "../src/findings.js";
test("requires stable identifiers and supported severities",()=>{
  assert.throws(()=>createFinding({title:"x",message:"y"}),/required/);
  assert.throws(()=>createFinding({ruleId:"X",title:"x",message:"y",severity:"urgent"}),/Unsupported/);
});
test("deduplicates identical findings without removing distinct locations",()=>{
  const a=createFinding({ruleId:"X1",title:"Issue",message:"Found",severity:"low",file:"a.js",line:2});
  const b=createFinding({ruleId:"X1",title:"Issue",message:"Found",severity:"low",file:"a.js",line:2});
  const c=createFinding({ruleId:"X1",title:"Issue",message:"Found",severity:"low",file:"b.js",line:2});
  assert.equal(deduplicateFindings([a,b,c]).length,2);
});
test("counts findings by severity",()=>{
  const one=createFinding({ruleId:"X",title:"x",message:"y",severity:"high"});
  assert.equal(countBySeverity([one]).high,1);
});
