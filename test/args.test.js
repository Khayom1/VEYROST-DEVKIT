import test from "node:test";
import assert from "node:assert/strict";
import { parseArgs } from "../src/args.js";
test("parses target, format, output, and strict mode",()=>{
  assert.deepEqual(parseArgs(["./demo","--format","markdown","--output","report.md","--strict"]),{
    target:"./demo",format:"markdown",output:"report.md",config:null,help:false,strict:true
  });
});
test("supports concise JSON and help options",()=>{
  assert.equal(parseArgs(["--json"]).format,"json");
  assert.equal(parseArgs(["-h"]).help,true);
});
test("rejects unknown options and unsupported formats",()=>{
  assert.throws(()=>parseArgs(["--unknown"]),/Unknown option/);
  assert.throws(()=>parseArgs(["--format","pdf"]),/Unsupported format/);
});
