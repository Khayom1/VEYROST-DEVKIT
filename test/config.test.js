import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { defaultConfig, validateConfig, loadConfig } from "../src/config.js";
test("default configuration is safe and bounded",()=>{
  const config=defaultConfig();
  assert.equal(config.maxFiles,5000);
  assert.ok(config.excludedDirectories.includes("node_modules"));
  assert.equal(config.failOn,"high");
});
test("configuration rejects unsafe scan limits and unsupported thresholds",()=>{
  assert.throws(()=>validateConfig({maxFiles:0}),/maxFiles/);
  assert.throws(()=>validateConfig({failOn:"urgent"}),/failOn/);
});
test("loadConfig reads a repository-local JSON configuration",()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),"veyrost-config-"));
  fs.writeFileSync(path.join(root,"veyrost.config.json"),JSON.stringify({maxFiles:120,ignorePatterns:["vendor/**"]}));
  try {
    const config=loadConfig(root);
    assert.equal(config.maxFiles,120);
    assert.deepEqual(config.ignorePatterns,["vendor/**"]);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
