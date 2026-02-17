import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { getRepoRoot, gitDiff, gitChangedFiles } from '../lib/git.js';
import { suggestSection, inferScopes } from '../lib/changelog.js';

export function registerSuggestTool(server: McpServer) {
  server.tool(
    'changelog_suggest',
    {
      staged: z.boolean().optional(),
      cwd: z.string().optional(),
    },
    ({ staged, cwd }) => {
      const root = getRepoRoot(cwd);
      const diff = gitDiff(root, staged);
      const files = gitChangedFiles(root, staged);

      const section = suggestSection(diff);
      const scopes = inferScopes(files);
      const scope = scopes.length ? `[${scopes.join(', ')}] ` : '';

      return {
        content: [
          {
            type: 'text',
            text: `### ${section}\n- ${scope}<describe the user-facing change>\n`,
          },
        ],
      };
    },
  );
}
