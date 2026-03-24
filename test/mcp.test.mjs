import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

function encodeMessage(message) {
  const body = Buffer.from(JSON.stringify(message), "utf8");
  return Buffer.from(`Content-Length: ${body.length}\r\n\r\n${body.toString("utf8")}`, "utf8");
}

function readMessages(chunks) {
  const buffer = Buffer.concat(chunks);
  const messages = [];
  let offset = 0;

  while (offset < buffer.length) {
    const headerEnd = buffer.indexOf("\r\n\r\n", offset);
    if (headerEnd === -1) break;
    const header = buffer.slice(offset, headerEnd).toString("utf8");
    const match = header.match(/Content-Length:\s*(\d+)/i);
    if (!match) break;
    const length = Number(match[1]);
    const bodyStart = headerEnd + 4;
    const bodyEnd = bodyStart + length;
    if (bodyEnd > buffer.length) break;
    messages.push(JSON.parse(buffer.slice(bodyStart, bodyEnd).toString("utf8")));
    offset = bodyEnd;
  }

  return messages;
}

async function waitForMessages(chunks, count) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 5000) {
    if (readMessages(chunks).length >= count) {
      return;
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 25));
  }
}

async function waitForExit(child) {
  if (child.exitCode !== null || child.signalCode !== null) {
    return;
  }

  await new Promise((resolvePromise) => child.once("exit", resolvePromise));
}

test("xiaohongshu MCP lists tools and returns a structured self-check result", async () => {
  const child = spawn(process.execPath, [resolve(process.cwd(), "bin/xiaohongshu-mcp.mjs")], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PATH: "",
      XIAOHONGSHU_MCP_SOURCE_ROOT: "__missing__",
    },
    stdio: ["pipe", "pipe", "pipe"],
  });
  const stdoutChunks = [];
  child.stdout.on("data", (chunk) => stdoutChunks.push(chunk));

  child.stdin.write(encodeMessage({ jsonrpc: "2.0", id: 1, method: "initialize", params: {} }));
  child.stdin.write(encodeMessage({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }));
  child.stdin.write(
    encodeMessage({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "xiaohongshu_runtime_self_check", arguments: {} },
    }),
  );

  await waitForMessages(stdoutChunks, 3);
  child.stdin.end();
  child.kill("SIGKILL");
  await waitForExit(child);

  const messages = readMessages(stdoutChunks);
  const toolsList = messages.find((message) => message.id === 2);
  const selfCheck = messages.find((message) => message.id === 3);
  const toolNames = toolsList.result.tools.map((tool) => tool.name).sort();

  assert.ok(toolsList);
  assert.deepEqual(toolNames, [
    "xiaohongshu_auth_status",
    "xiaohongshu_comments",
    "xiaohongshu_favorites",
    "xiaohongshu_feed",
    "xiaohongshu_hot",
    "xiaohongshu_my_notes",
    "xiaohongshu_note_detail",
    "xiaohongshu_notifications",
    "xiaohongshu_profile_me",
    "xiaohongshu_runtime_self_check",
    "xiaohongshu_search",
    "xiaohongshu_search_user",
    "xiaohongshu_topics",
    "xiaohongshu_unread",
    "xiaohongshu_user_lookup",
    "xiaohongshu_user_posts",
  ]);
  assert.equal(selfCheck.result.structuredContent.ok, false);
});
