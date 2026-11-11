import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { safeReadText, safeReadJson, isReadableFile } from "../src/fs-safe.js";
test("safe readers return fallbacks for missing or invalid files",()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),"veyrost-fs-"));
  fs.writeFileSync(path.join(root,"good.json"),'{"ok":true}');
  fs.writeFileSync(path.join(root,"bad.json"),"{");
  fs.writeFileSync(path.join(root,"note.txt"),"hello");
  try {
    assert.equal(safeReadText(root,"note.txt"),"hello");
    assert.deepEqual(safeReadJson(root,"good.json"),{ok:true});
    assert.equal(safeReadJson(root,"bad.json"),null);
    assert.equal(safeReadText(root,"../outside","fallback"),"fallback");
    assert.equal(isReadableFile(path.join(root,"note.txt")),true);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
