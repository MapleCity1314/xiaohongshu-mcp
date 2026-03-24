# @presto1314w/xiaohongshu-mcp

Independent Xiaohongshu MCP server with a Rust native bridge and a vendored legacy Python fallback.

Current shape:

- npm-bootable MCP server: `xiaohongshu-mcp`
- native CLI shim under `native/`
- vendored legacy Python CLI under `legacy/`
- generic skill metadata for agent registration

The MCP server is started via:

```text
npm:@presto1314w/xiaohongshu-mcp
```

Useful environment variables:

- `XIAOHONGSHU_MCP_BIN`: explicit `xhs` executable path
- `XIAOHONGSHU_MCP_CLI_BIN`: explicit native `xiaohongshu-cli` binary path
- `XIAOHONGSHU_MCP_SOURCE_ROOT`: override the vendored legacy source root
- `XIAOHONGSHU_MCP_PYTHON_BIN`: override the Python interpreter for module execution
- `XIAOHONGSHU_MCP_RELEASE_TARGETS`: release matrix target list

The older `Z0_XIAOHONGSHU_*` variables are still accepted as compatibility aliases.

Resolution order:

1. `XIAOHONGSHU_MCP_CLI_BIN`
2. packaged native binary under `dist/native/<platform>-<arch>/`
3. local cargo binary under `native/target/{release,debug}/`
4. `XIAOHONGSHU_MCP_BIN`
5. `uv run --project <legacy-root> xhs`
6. `python3 -m xhs_cli.cli` from the vendored `<legacy-root>`

The native layer already supports live note reads. Other commands still fall back to the vendored CLI or structured fixture responses when the bridge is unavailable.

Diagnostic MCP tool:

- `xiaohongshu_runtime_self_check`

Development:

```bash
pnpm install
pnpm build
pnpm test
pnpm release:pack
XIAOHONGSHU_MCP_RELEASE_TARGETS=darwin-arm64,linux-x64 pnpm release:matrix
```
