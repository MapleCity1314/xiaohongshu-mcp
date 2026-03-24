import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

test("self-check script returns structured diagnostics without crashing", () => {
  const result = spawnSync(process.execPath, [resolve(process.cwd(), "scripts/self-check.mjs"), "--json"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PATH: "",
      XIAOHONGSHU_MCP_SOURCE_ROOT: "__missing__",
    },
    encoding: "utf8",
  });

  assert.equal(result.status, 1);

  const payload = JSON.parse(result.stdout);
  assert.equal(payload.packageName, "@presto1314w/xiaohongshu-mcp");
  assert.equal(payload.runtime.ok, false);
  assert.equal(payload.runtime.legacyRootPresent, false);
  assert.ok("authProbe" in payload);
});
