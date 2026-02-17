import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { registerSuggestTool } from './suggest.js';
import { registerApplyTool } from './apply.js';
import { registerCheckTool } from './check.js';

export function registerTools(server: McpServer) {
  registerSuggestTool(server);
  registerApplyTool(server);
  registerCheckTool(server);
}
