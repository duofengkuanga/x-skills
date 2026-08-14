export const skillNames = [
  'agent-party-time-repair-bug',
  'agent-party-time-integrate-update-batch',
];

export function parseFrontmatter(text, file) {
  const match = text.match(/^---\n([\s\S]*?)\n---(?:\n|$)/u);
  if (!match) throw new Error(`${file}: 缺少 YAML frontmatter`);
  const entries = Object.fromEntries(
    match[1]
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf(':');
        if (separator < 1) throw new Error(`${file}: frontmatter 行无效`);
        return [
          line.slice(0, separator).trim(),
          line.slice(separator + 1).trim(),
        ];
      }),
  );
  return entries;
}
