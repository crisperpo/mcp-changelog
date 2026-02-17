import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { getRepoRoot, gitChangedFilesBetween } from '../lib/git.js';
import { loadConfig } from '../lib/config.js';
import { isUserFacingFile } from '../lib/policy.js';

export function registerCheckTool(server: McpServer) {
  server.tool(
    'changelog_check',
    {
      baseRef: z.string().min(1),
      headRef: z.string().min(1),
      cwd: z.string().optional(),
    },
    ({ baseRef, headRef, cwd }) => {
      const root = getRepoRoot(cwd ?? process.cwd());
      const cfg = loadConfig(root);

      const files = gitChangedFilesBetween(root, baseRef, headRef);

      const userFacing = files.some((f) => isUserFacingFile(f, cfg.codePrefixes));
      const changelogChanged = files.includes(cfg.changelogPath);

      const ok = !userFacing || changelogChanged;

      return {
        content: [
          {
            type: 'text',
            text: ok
              ? 'OK: changelog requirement satisfied'
              : `FAIL: user-facing changes detected but ${cfg.changelogPath} not updated`,
          },
        ],
      };
    },
  );
}
