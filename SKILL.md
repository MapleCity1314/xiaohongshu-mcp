---
name: xiaohongshu-mcp
description: Use this skill when you need Xiaohongshu (Little Red Book, 小红书) information through MCP tools, including auth checks, search, note reads, comments, user lookups, feed, hot items, favorites, and notifications.
---

# Xiaohongshu MCP

Use the MCP tools instead of direct shell commands when this repository or package is available.

Auth flow:

1. Call `xiaohongshu_auth_status`.
2. If auth is missing, ask the user to complete `xhs login` or `xhs login --qrcode`.
3. Retry `xiaohongshu_auth_status` before protected tools.

Preferred workflow:

1. Confirm auth with `xiaohongshu_auth_status`.
2. Use `xiaohongshu_search`, `xiaohongshu_note_detail`, `xiaohongshu_comments`, `xiaohongshu_user_lookup`, or other MCP tools for reads.
3. Use `xiaohongshu_runtime_self_check` when commands fail and you need to inspect bridge resolution.
