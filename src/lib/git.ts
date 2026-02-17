import { execSync } from 'node:child_process';

function sh(cmd: string, cwd?: string): string {
  return execSync(cmd, {
    cwd,
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
  }).trim();
}

export function getRepoRoot(cwd = process.cwd()): string {
  return sh('git rev-parse --show-toplevel', cwd);
}

export function gitDiff(root: string, staged?: boolean): string {
  return sh(`git diff --unified=0 ${staged ? '--staged' : ''}`, root);
}

export function gitChangedFiles(root: string, staged?: boolean): string[] {
  const out = sh(`git diff --name-only ${staged ? '--staged' : ''}`, root);
  return out ? out.split('\n') : [];
}

export function gitChangedFilesBetween(root: string, baseRef: string, headRef: string) {
  const out = sh(`git diff --name-only ${baseRef} ${headRef}`, root);
  return out ? out.split('\n') : [];
}
