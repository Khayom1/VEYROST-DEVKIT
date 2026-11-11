import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { analyzeRepository } from "../src/engine.js";
test("a well-formed sample repository receives a complete report",()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),"veyrost-engine-"));
  fs.mkdirSync(path.join(root,"test"));
  fs.mkdirSync(path.join(root,".github","workflows"),{recursive:true});
  fs.writeFileSync(path.join(root,"README.md"),"# Sample\n\nA well documented example repository for testing the local project analysis engine with meaningful developer instructions and practical context.\n\n## Installation\nInstall locally with the supported Node.js runtime and use the documented test command.\n\n## Usage\nRun the program from the repository root and review its generated report for actionable maintenance guidance.\n\n## License\nMIT terms are provided in the included license file.");
  fs.writeFileSync(path.join(root,"LICENSE"),"MIT License\nPermission is hereby granted.");
  fs.writeFileSync(path.join(root,".gitignore"),".env\nnode_modules/\ncoverage/\n");
  fs.writeFileSync(path.join(root,"package.json"),JSON.stringify({name:"sample",description:"Sample project",engines:{node:">=18"},scripts:{test:"node --test"}}));
  fs.writeFileSync(path.join(root,"test","sample.test.js"),"// sample test");
  fs.writeFileSync(path.join(root,"CONTRIBUTING.md"),"# Contributing");
  fs.writeFileSync(path.join(root,"SECURITY.md"),"# Security");
  fs.writeFileSync(path.join(root,".github","workflows","ci.yml"),"on: [push, pull_request]\njobs:\n  test:\n    steps: []\n");
  try {
    const report=analyzeRepository(root);
    assert.equal(report.summary.score,100);
    assert.equal(report.summary.grade,"A");
    assert.equal(report.summary.findings,0);
    assert.equal(report.checks.length,8);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
