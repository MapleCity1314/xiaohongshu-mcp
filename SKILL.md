---
name: xiaohongshu-mcp
description: Use this skill when you need Xiaohongshu (Little Red Book, 小红书) information through MCP tools, including auth checks, search, note reads, comments, user lookups, feed, hot items, favorites, and notifications.
---

# Xiaohongshu MCP

Use this skill when the user needs Xiaohongshu information through the MCP layer exposed by this repository or package.

This is a read-only workflow skill. Do not assume posting, liking, comment mutations, following, or deletion tools exist unless the repository explicitly adds them later.

## Preferred Order

1. Call `xiaohongshu_auth_status`.
2. If auth is missing, ask the user to complete `xhs login` or `xhs login --qrcode`.
3. Retry `xiaohongshu_auth_status` before protected tools.
4. Use `xiaohongshu_runtime_self_check` when the local bridge or binary resolution is unclear.
5. Use discovery tools first, then detail tools.

## Tool Groups

- Diagnostics:
  `xiaohongshu_auth_status`, `xiaohongshu_runtime_self_check`, `xiaohongshu_unread`, `xiaohongshu_notifications`
- Discovery:
  `xiaohongshu_search`, `xiaohongshu_topics`, `xiaohongshu_search_user`, `xiaohongshu_hot`, `xiaohongshu_feed`
- Note reads:
  `xiaohongshu_note_detail`, `xiaohongshu_comments`
- User reads:
  `xiaohongshu_profile_me`, `xiaohongshu_user_lookup`, `xiaohongshu_user_posts`, `xiaohongshu_favorites`, `xiaohongshu_my_notes`

## Local Debugging

- Start with `pnpm self-check` when the repository is available locally.
- Use `pnpm self-check --probe-search <query>` to verify read-path search wiring.

## Reference

For the repository-specific read workflow, see `references/read-only-workflow.md`.
