---
name: xiaohongshu-mcp
description: Use this skill for Xiaohongshu (Little Red Book, 小红书) read-only MCP workflows in this repository, including auth checks, runtime diagnostics, search, note reads, comments, user lookups, feed, hot items, favorites, unread counts, and notifications.
---

# Xiaohongshu MCP

Use this skill when working in this repository on Xiaohongshu MCP integration tasks.

This repository currently exposes a read-only MCP surface. Do not assume write operations such as posting, liking, commenting mutations, following, or deletion are available.

## Quick Start

1. Run `pnpm self-check` if local bridge status is unclear.
2. Use the MCP read tools for discovery and note retrieval.
3. Use `xiaohongshu_runtime_self_check` before debugging deeper runtime issues.

## Tool Groups

- Discovery: `xiaohongshu_search`, `xiaohongshu_topics`, `xiaohongshu_search_user`, `xiaohongshu_hot`, `xiaohongshu_feed`
- Note reads: `xiaohongshu_note_detail`, `xiaohongshu_comments`
- User reads: `xiaohongshu_profile_me`, `xiaohongshu_user_lookup`, `xiaohongshu_user_posts`, `xiaohongshu_favorites`, `xiaohongshu_my_notes`
- Diagnostics: `xiaohongshu_auth_status`, `xiaohongshu_runtime_self_check`, `xiaohongshu_unread`, `xiaohongshu_notifications`

## Update Rule

If you change the tool surface or repository scope, keep these files aligned:

- `README.md`
- `SKILL.md`
- `CLAUDE.md`
- `references/read-only-workflow.md`
- `test/mcp.test.mjs`

For the repository-specific flow, see `references/read-only-workflow.md`.
