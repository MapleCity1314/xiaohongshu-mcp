#!/usr/bin/env node

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { executeXiaohongshuCommand } from "../bin/runtime.mjs";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [mode, ...rest] = process.argv.slice(2);

function usage() {
  process.stderr.write(
    [
      "Usage:",
      "  node ./scripts/demo-read.mjs search <query>",
      "  node ./scripts/demo-read.mjs note <id-or-url>",
    ].join("\n"),
  );
  process.stderr.write("\n");
}

if (!mode) {
  usage();
  process.exit(1);
}

let payload;

if (mode === "search") {
  const query = rest.join(" ").trim();

  if (!query) {
    usage();
    process.exit(1);
  }

  payload = executeXiaohongshuCommand(packageRoot, ["search", query, "--json"], process.env);
} else if (mode === "note") {
  const idOrUrl = rest.join(" ").trim();

  if (!idOrUrl) {
    usage();
    process.exit(1);
  }

  payload = executeXiaohongshuCommand(packageRoot, ["read", idOrUrl, "--json"], process.env);
} else {
  usage();
  process.exit(1);
}

process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
process.exit(payload?.error ? 1 : 0);
