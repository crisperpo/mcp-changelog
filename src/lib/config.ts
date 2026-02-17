import fs from 'node:fs';
import path from 'node:path';

export interface ChangelogConfig {
  changelogPath: string;
  unreleasedHeader: string;
  codePrefixes: string[];
}

const DEFAULTS: ChangelogConfig = {
  changelogPath: 'CHANGELOG.md',
  unreleasedHeader: '## Unreleased',
  codePrefixes: ['packages/', 'apps/', 'services/'],
};

export function loadConfig(repoRoot: string): ChangelogConfig {
  const p = path.join(repoRoot, '.changelogrc.json');
  if (!fs.existsSync(p)) return DEFAULTS;

  const raw = JSON.parse(fs.readFileSync(p, 'utf8')) as Partial<ChangelogConfig>;
  return {
    changelogPath: raw.changelogPath ?? DEFAULTS.changelogPath,
    unreleasedHeader: raw.unreleasedHeader ?? DEFAULTS.unreleasedHeader,
    codePrefixes: raw.codePrefixes ?? DEFAULTS.codePrefixes,
  };
}
