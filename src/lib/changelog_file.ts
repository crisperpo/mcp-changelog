import fs from 'node:fs';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// v1: inserts right after "## Unreleased" (simple + low-conflict)
export function insertUnderUnreleased(params: {
  changelogText: string;
  unreleasedHeader: string;
  section: 'Added' | 'Changed' | 'Fixed' | 'Breaking Changes';
  entryLine: string;
}) {
  const { changelogText, unreleasedHeader, section, entryLine } = params;

  const headerRe = new RegExp(`^${escapeRegExp(unreleasedHeader)}\\s*$`, 'm');
  if (!headerRe.test(changelogText)) return { ok: false as const, updated: changelogText };

  const insertion = `\n\n### ${section}\n- ${entryLine}\n`;
  const updated = changelogText.replace(headerRe, (m) => `${m}${insertion}`);
  return { ok: true as const, updated };
}

export function readText(p: string) {
  return fs.readFileSync(p, 'utf8');
}

export function writeText(p: string, text: string) {
  fs.writeFileSync(p, text, 'utf8');
}
