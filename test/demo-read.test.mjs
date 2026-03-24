import test from "node:test";
import assert from "node:assert/strict";
import { chmodSync, mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

function createCustomBin() {
  const tempRoot = mkdtempSync(resolve(tmpdir(), "xiaohongshu-demo-read-"));
  const binDir = resolve(tempRoot, "bin");
  const customBin = resolve(binDir, "xhs");

  mkdirSync(binDir, { recursive: true });
  writeFileSync(
    customBin,
    "#!/bin/sh\nif [ \"$1\" = \"search\" ]; then printf '{\"ok\":true,\"data\":{\"items\":[{\"id\":\"search-note-1\"}]}}'; elif [ \"$1\" = \"read\" ]; then printf '{\"ok\":true,\"data\":{\"note\":{\"id\":\"note-42\"}}}'; else printf '{\"error\":true,\"message\":\"unexpected\"}'; fi\n",
    "utf8",
  );
  chmodSync(customBin, 0o755);

  return customBin;
}

test("demo-read search prints structured search output", () => {
  const customBin = createCustomBin();
  const result = spawnSync(
    process.execPath,
    [resolve(process.cwd(), "scripts/demo-read.mjs"), "search", "travel"],
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
  assert.equal(payload.ok, true);
  assert.equal(payload.data.items[0].id, "search-note-1");
});

test("demo-read note prints structured note output", () => {
  const customBin = createCustomBin();
  const result = spawnSync(
    process.execPath,
    [resolve(process.cwd(), "scripts/demo-read.mjs"), "note", "abc123"],
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
  assert.equal(payload.ok, true);
  assert.equal(payload.data.note.id, "note-42");
});

test("demo-read exits with usage on missing arguments", () => {
  const result = spawnSync(
    process.execPath,
    [resolve(process.cwd(), "scripts/demo-read.mjs")],
    {
      cwd: process.cwd(),
      encoding: "utf8",
    },
  );

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage:/);
});
