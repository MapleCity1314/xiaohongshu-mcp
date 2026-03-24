---
name: xiaohongshu-mcp
description: Use this skill when you need Xiaohongshu (Little Red Book, 小红书) information through MCP tools, including auth checks, search, note reads, comments, user lookups, feed, hot items, favorites, and notifications.
---

# Xiaohongshu MCP

Use the MCP tools instead of direct shell commands when this repository or package is available.

This skill is for read-oriented Xiaohongshu workflows. Do not assume posting, liking, commenting, following, or deletion tools exist in the MCP surface unless the repository explicitly adds them later.

Auth flow:

1. Call `xiaohongshu_auth_status`.
2. If auth is missing, ask the user to complete `xhs login` or `xhs login --qrcode`.
3. Retry `xiaohongshu_auth_status` before protected tools.

Preferred workflow:

1. Confirm auth with `xiaohongshu_auth_status`.
2. Use `xiaohongshu_search`, `xiaohongshu_note_detail`, `xiaohongshu_comments`, `xiaohongshu_user_lookup`, or other MCP tools for reads.
3. Use `xiaohongshu_runtime_self_check` when commands fail and you need to inspect bridge resolution.

Tool groups:

- Discovery: `xiaohongshu_search`, `xiaohongshu_topics`, `xiaohongshu_search_user`, `xiaohongshu_hot`, `xiaohongshu_feed`
- Note reads: `xiaohongshu_note_detail`, `xiaohongshu_comments`
- User reads: `xiaohongshu_profile_me`, `xiaohongshu_user_lookup`, `xiaohongshu_user_posts`, `xiaohongshu_favorites`, `xiaohongshu_my_notes`
- Diagnostics: `xiaohongshu_auth_status`, `xiaohongshu_runtime_self_check`, `xiaohongshu_unread`, `xiaohongshu_notifications`

For a compact repository-specific read flow, see `references/read-only-workflow.md`.
