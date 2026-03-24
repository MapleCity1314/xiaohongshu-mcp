# @presto1314w/xiaohongshu-mcp

An independent Xiaohongshu MCP server focused on read-only information retrieval.

It exposes a stable MCP surface for searching Xiaohongshu, reading notes, fetching comments, inspecting users, and checking local runtime health. Under the hood it prefers a Rust native bridge and falls back to a vendored legacy Python CLI when needed.

## Scope

Current MCP scope is intentionally read-only:

- auth status and runtime diagnostics
- search and topic discovery
- note detail and comments
- user lookup and user posts
- feed, hot items, favorites, unread counts, notifications

Non-goals for the current repository:

- posting notes
- liking or unliking
- comment mutations
- follow or unfollow
- delete operations

## Package

MCP endpoint:

```text
npm:@presto1314w/xiaohongshu-mcp
```

Primary entrypoints:

- `bin/xiaohongshu-mcp.mjs`: MCP server
- `scripts/self-check.mjs`: local CLI diagnostics
- `native/`: Rust bridge
- `legacy/`: vendored Python fallback

## MCP Tools

Read and diagnostic tools currently exported:

- `xiaohongshu_auth_status`
- `xiaohongshu_runtime_self_check`
- `xiaohongshu_profile_me`
- `xiaohongshu_search`
- `xiaohongshu_note_detail`
- `xiaohongshu_comments`
- `xiaohongshu_user_lookup`
- `xiaohongshu_user_posts`
- `xiaohongshu_feed`
- `xiaohongshu_hot`
- `xiaohongshu_topics`
- `xiaohongshu_search_user`
- `xiaohongshu_favorites`
- `xiaohongshu_my_notes`
- `xiaohongshu_unread`
- `xiaohongshu_notifications`

Recommended read flow:

1. Run `xiaohongshu_runtime_self_check` when local setup is uncertain.
2. Run `xiaohongshu_auth_status` when the request may depend on authenticated state.
3. Use `xiaohongshu_search`, `xiaohongshu_topics`, or `xiaohongshu_search_user` for discovery.
4. Use `xiaohongshu_note_detail` and `xiaohongshu_comments` for note-level retrieval.
5. Use `xiaohongshu_user_lookup` and `xiaohongshu_user_posts` to expand from a note to an author.

More detail is in [read-only-workflow.md](/Users/presto/code/work/xiaohongshu-mcp/references/read-only-workflow.md).

## Runtime Resolution

The bridge resolves in this order:

1. `XIAOHONGSHU_MCP_CLI_BIN`
2. `dist/native/<platform>-<arch>/xiaohongshu-cli`
3. `native/target/{release,debug}/xiaohongshu-cli`
4. `XIAOHONGSHU_MCP_BIN`
5. `uv run --project <legacy-root> xhs`
6. `python3 -m xhs_cli.cli`

Compatibility aliases:

- `Z0_XIAOHONGSHU_BIN`
- `Z0_XIAOHONGSHU_CLI_BIN`
- `Z0_XIAOHONGSHU_SOURCE_ROOT`
- `Z0_XIAOHONGSHU_PYTHON_BIN`

Primary environment variables:

- `XIAOHONGSHU_MCP_BIN`
- `XIAOHONGSHU_MCP_CLI_BIN`
- `XIAOHONGSHU_MCP_SOURCE_ROOT`
- `XIAOHONGSHU_MCP_PYTHON_BIN`
- `XIAOHONGSHU_MCP_RELEASE_TARGETS`

## Local Commands

```bash
pnpm install
pnpm self-check
pnpm build
pnpm test
pnpm release:pack
XIAOHONGSHU_MCP_RELEASE_TARGETS=darwin-arm64,linux-x64 pnpm release:matrix
```

## Self-Check

```bash
pnpm self-check
pnpm self-check --json
pnpm self-check --no-auth-probe
pnpm self-check --probe-search travel
```

`self-check` prints structured local diagnostics covering:

- bridge resolution
- native binary discovery
- packaged artifact visibility
- optional auth probe via `status --json`
- optional search probe via `search --json`
