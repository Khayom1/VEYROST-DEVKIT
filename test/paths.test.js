import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { isInsideRoot, resolveInsideRoot, toPosixPath } from "../src/paths.js";
test("allows in-root paths and rejects traversal",()=>{
  const root=path.resolve("/tmp/project");
  assert.equal(isInsideRoot(root,"src/index.js"),true);
  assert.equal(isInsideRoot(root,"../outside.txt"),false);
  assert.throws(()=>resolveInsideRoot(root,"../../secret"),/escapes/);
});
test("normalizes separators for portable reports",()=>{
  assert.equal(toPosixPath("src\\lib\\index.js"),"src/lib/index.js");
});
