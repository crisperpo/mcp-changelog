export function isUserFacingFile(f: string, codePrefixes: string[]) {
  if (f.endsWith('.md')) return false;
  return codePrefixes.some((p) => f.startsWith(p));
}
