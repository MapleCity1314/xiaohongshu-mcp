# Read-Only Workflow

This repository currently treats Xiaohongshu MCP as a read-only integration surface.

Use this workflow when the user wants information retrieval rather than account mutation:

1. Run `xiaohongshu_runtime_self_check` to verify bridge resolution.
2. Run `xiaohongshu_auth_status` if the request depends on authenticated data.
3. Use discovery tools first:
   `xiaohongshu_search`, `xiaohongshu_topics`, `xiaohongshu_search_user`, `xiaohongshu_hot`, `xiaohongshu_feed`
4. Use detail tools second:
   `xiaohongshu_note_detail`, `xiaohongshu_comments`, `xiaohongshu_user_lookup`, `xiaohongshu_user_posts`
5. Use account-adjacent reads only when needed:
   `xiaohongshu_profile_me`, `xiaohongshu_favorites`, `xiaohongshu_my_notes`, `xiaohongshu_unread`, `xiaohongshu_notifications`

Local debugging order:

1. `pnpm self-check`
2. `pnpm self-check --probe-search <query>` when you want a lightweight search-path probe
3. full MCP or application-level debugging after local probes are understood

Non-goals for the current MCP layer:

- posting notes
- liking or unliking
- favoriting mutations
- commenting mutations
- follow or unfollow
- deletion actions

If write operations are added later, update this file, `README.md`, `SKILL.md`, `CLAUDE.md`, the Claude skill file, and the MCP tool-list test together.
