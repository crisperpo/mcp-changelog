export function suggestSection(diff: string): string {
  const d = diff.toLowerCase();
  if (/breaking change|!:\s/.test(d) || /\bremoved\b|\bdelete(d)?\b/.test(d)) {
    return 'Breaking Changes';
  }
  if (/\bfix\b|bug|regression|crash|exception/.test(d)) {
    return 'Fixed';
  }
  if (/\bfeat\b|add(ed)?\b|new\b|support(ed)?\b/.test(d)) {
    return 'Added';
  }
  return 'Changed';
}

export function inferScopes(files: string[]): string[] {
  const scopes = new Set<string>();
  for (const f of files) {
    const m = f.match(/^(packages|apps|services)\/([^/]+)\//);
    if (m) scopes.add(m[2]);
  }
  return [...scopes].sort();
}
