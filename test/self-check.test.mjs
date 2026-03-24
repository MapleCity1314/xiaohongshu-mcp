import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
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

test("self-check script accepts an optional search probe query", () => {
  const tempRoot = mkdtempSync(resolve(tmpdir(), "xiaohongshu-self-check-"));
  const binDir = resolve(tempRoot, "bin");
  const customBin = resolve(binDir, "xhs");

  mkdirSync(binDir, { recursive: true });
  writeFileSync(
    customBin,
    "#!/bin/sh\nif [ \"$1\" = \"status\" ]; then printf '{\"ok\":true,\"data\":{\"authenticated\":false}}'; elif [ \"$1\" = \"search\" ]; then printf '{\"ok\":true,\"data\":{\"items\":[{\"id\":\"note-1\"}]}}'; else printf '{\"ok\":true}'; fi\n",
    "utf8",
  );
  chmodSync(customBin, 0o755);

  const result = spawnSync(
    process.execPath,
    [resolve(process.cwd(), "scripts/self-check.mjs"), "--json", "--probe-search", "travel"],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        XIAOHONGSHU_MCP_BIN: customBin,
      },
      encoding: "utf8",
    },
  );

  assert.equal(result.status, 0);

  const payload = JSON.parse(result.stdout);
  assert.ok("searchProbe" in payload);
  assert.equal(payload.searchProbe.ok, true);
  assert.equal(payload.searchProbe.data.items[0].id, "note-1");
});

test("self-check script reports a structured error when search probe query is missing", () => {
  const result = spawnSync(
    process.execPath,
    [resolve(process.cwd(), "scripts/self-check.mjs"), "--json", "--probe-search"],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PATH: "",
        XIAOHONGSHU_MCP_SOURCE_ROOT: "__missing__",
      },
      encoding: "utf8",
    },
  );

  assert.equal(result.status, 1);

  const payload = JSON.parse(result.stdout);
  assert.equal(payload.searchProbe.error, true);
  assert.equal(payload.searchProbe.message, "Missing query for --probe-search");
});
