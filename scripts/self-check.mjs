#!/usr/bin/env node

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { executeXiaohongshuCommand, selfCheckXiaohongshuRuntime } from "../bin/runtime.mjs";
import { readArtifactManifest, resolveNativeBinary } from "../bin/native-runtime.mjs";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const runAuthProbe = !args.includes("--no-auth-probe");
const pretty = !args.includes("--json");
const searchProbeIndex = args.indexOf("--probe-search");
const searchProbeQuery = searchProbeIndex === -1 ? null : args[searchProbeIndex + 1] ?? null;

function writeOutput(payload) {
  const text = JSON.stringify(payload, null, pretty ? 2 : 0);
  process.stdout.write(`${text}\n`);
}

const runtime = selfCheckXiaohongshuRuntime(packageRoot, process.env);
const artifactManifest = readArtifactManifest(packageRoot);
let nativeBinary = null;

try {
  nativeBinary = resolveNativeBinary(packageRoot, process.env);
} catch {}

const payload = {
  ok: runtime.ok,
  packageName: "@presto1314w/xiaohongshu-mcp",
  packageRoot,
  nativeBinary,
  packagedArtifacts: artifactManifest.artifacts,
  runtime,
};

if (runAuthProbe) {
  payload.authProbe = executeXiaohongshuCommand(packageRoot, ["status", "--json"], process.env);
}

if (searchProbeIndex !== -1) {
  if (!searchProbeQuery || searchProbeQuery.startsWith("--")) {
    payload.searchProbe = {
      error: true,
      message: "Missing query for --probe-search",
      status: 1,
    };
  } else {
    payload.searchProbe = executeXiaohongshuCommand(
      packageRoot,
      ["search", searchProbeQuery, "--json"],
      process.env,
    );
  }
}

writeOutput(payload);
process.exit(payload.ok ? 0 : 1);
