# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

`@presto1314w/xiaohongshu-mcp` is an independent Xiaohongshu MCP server focused on read-only information retrieval.

Current scope:

- MCP server entrypoint under `bin/`
- Rust native bridge under `native/`
- vendored legacy Python fallback under `legacy/`
- generic agent skill metadata under `SKILL.md` and `agents/openai.yaml`
- Claude skill metadata under `.claude/skills/xiaohongshu-mcp/`

## Commands

```bash
pnpm install
pnpm self-check
pnpm build
pnpm test
pnpm release:pack
```

## Working Rules

- Treat the current MCP surface as read-only unless the repository explicitly adds write tools later.
- Prefer MCP tools and runtime diagnostics over ad hoc shell invocations.
- When debugging local setup, run `pnpm self-check` first.
- When changing the MCP tool surface, update:
  - `README.md`
  - `SKILL.md`
  - `.claude/skills/xiaohongshu-mcp/SKILL.md`
  - `references/read-only-workflow.md`
  - `test/mcp.test.mjs`

## Key Files

- `bin/xiaohongshu-mcp.mjs`: MCP server entrypoint and tool definitions
- `bin/runtime.mjs`: legacy bridge resolution and runtime self-check
- `bin/native-runtime.mjs`: native binary discovery and staging
- `scripts/self-check.mjs`: local CLI diagnostics
- `references/read-only-workflow.md`: repository read-only workflow contract

## Claude Skill

If the task is specifically about Xiaohongshu MCP usage, diagnostics, search, note reads, comments, user lookup, feed, hot items, favorites, unread counts, or notifications, read:

- `.claude/skills/xiaohongshu-mcp/SKILL.md`

