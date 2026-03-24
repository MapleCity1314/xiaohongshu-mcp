export const xiaohongshuPackageName = "@presto1314w/xiaohongshu-mcp";
export const xiaohongshuMcpEndpoint = `npm:${xiaohongshuPackageName}`;
export const xiaohongshuSkillDirectory = ".";

export type XiaohongshuMcpMetadata = {
  name: string;
  endpoint: string;
  sourceType: string;
  skillDirectory: string;
};

export function getXiaohongshuSkillDirectory() {
  return xiaohongshuSkillDirectory;
}

export function getXiaohongshuMcpMetadata(): XiaohongshuMcpMetadata {
  return {
    name: "Xiaohongshu MCP",
    endpoint: xiaohongshuMcpEndpoint,
    sourceType: "npm-package",
    skillDirectory: getXiaohongshuSkillDirectory(),
  };
}
