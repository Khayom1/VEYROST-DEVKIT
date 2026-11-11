import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { inspectRepository, walkFiles } from "../src/scanner.js";
test("walkFiles skips git metadata and dependencies", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "veyrost-"));
  fs.mkdirSync(path.join(root, "node_modules"), {recursive:true});
  fs.mkdirSync(path.join(root, ".git"), {recursive:true});
  fs.writeFileSync(path.join(root, "README.md"), "# Demo");
  fs.writeFileSync(path.join(root, "node_modules", "ignored.js"), "");
  try { assert.deepEqual(walkFiles(root), ["README.md"]); }
  finally { fs.rmSync(root, {recursive:true, force:true}); }
});
test("inspectRepository detects README, package metadata, and assembled token-like value", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "veyrost-"));
  fs.writeFileSync(path.join(root, "README.md"), "# Demo");
  fs.writeFileSync(path.join(root, "package.json"), '{"name":"demo"}');
  const fakeToken = ["ghp_", "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456"].join("");
  fs.writeFileSync(path.join(root, "config.js"), "const key = " + JSON.stringify(fakeToken) + ";");
  try {
    const result = inspectRepository(root);
    assert.equal(result.hasReadme, true);
    assert.equal(result.hasPackageJson, true);
    assert.equal(result.secrets[0].type, "token-like");
  } finally { fs.rmSync(root, {recursive:true, force:true}); }
});
