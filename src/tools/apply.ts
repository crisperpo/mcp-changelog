import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import path from 'node:path';
import fs from 'node:fs';

import { getRepoRoot } from '../lib/git.js';
import { loadConfig } from '../lib/config.js';
import { insertUnderUnreleased, readText, writeText } from '../lib/changelog_file.js';

export function registerApplyTool(server: McpServer) {
  server.tool(
    'changelog_apply',
    {
      entryLine: z.string().min(1),
      section: z.enum(['Added', 'Changed', 'Fixed', 'Breaking Changes']).default('Changed'),
      cwd: z.string().optional(),
    },
    ({ entryLine, section, cwd }) => {
      const root = getRepoRoot(cwd ?? process.cwd());
      const cfg = loadConfig(root);

      const changelogAbs = path.join(root, cfg.changelogPath);
      if (!fs.existsSync(changelogAbs)) {
        return { content: [{ type: 'text', text: `ERROR: ${cfg.changelogPath} not found at repo root` }] };
      }

      const cl = readText(changelogAbs);
      const res = insertUnderUnreleased({
        changelogText: cl,
        unreleasedHeader: cfg.unreleasedHeader,
        section,
        entryLine,
      });

      if (!res.ok) {
        return {
          content: [{ type: 'text', text: `ERROR: Could not find "${cfg.unreleasedHeader}" in ${cfg.changelogPath}` }],
        };
      }

      writeText(changelogAbs, res.updated);

      return {
        content: [{ type: 'text', text: `Updated ${cfg.changelogPath} under ${cfg.unreleasedHeader} / ${section}` }],
      };
    },
  );
}
