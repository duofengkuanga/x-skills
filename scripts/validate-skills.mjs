import { lstat, readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter, skillNames } from './skill-config.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const expectedFiles = new Set(['SKILL.md', 'agents/openai.yaml']);

for (const skillName of skillNames) {
  const skillRoot = join(root, 'skills', skillName);
  const files = await listFiles(skillRoot);
  for (const file of expectedFiles)
    assert(files.includes(file), `${skillName}: 缺少 ${file}`);
  assert(
    files.every((file) => expectedFiles.has(file)),
    `${skillName}: 第一版 Bundle 包含未声明文件`,
  );

  const skillText = await readFile(join(skillRoot, 'SKILL.md'), 'utf8');
  const frontmatter = parseFrontmatter(skillText, `${skillName}/SKILL.md`);
  assert(frontmatter.name === skillName, `${skillName}: name 不匹配`);
  assert(
    typeof frontmatter.description === 'string' &&
      frontmatter.description.length > 0 &&
      frontmatter.description.length <= 1024,
    `${skillName}: description 无效`,
  );
  assert(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(skillName) &&
      skillName.length <= 64,
    `${skillName}: 名称格式无效`,
  );
  assert(skillText.split('\n').length < 500, `${skillName}: SKILL.md 过长`);
  assert(!skillText.includes('TODO'), `${skillName}: 仍有 TODO`);

  const openaiText = await readFile(
    join(skillRoot, 'agents', 'openai.yaml'),
    'utf8',
  );
  assert(
    /allow_implicit_invocation:\s*false/u.test(openaiText),
    `${skillName}: 必须禁止隐式调用`,
  );
  assert(
    openaiText.includes(`$${skillName}`),
    `${skillName}: default_prompt 未显式引用 Skill`,
  );
}

console.log(`Validated ${skillNames.length} Codex Skills.`);

async function listFiles(rootPath) {
  const result = [];
  await visit(rootPath);
  return result.sort();

  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      const info = await lstat(path);
      assert(!info.isSymbolicLink(), `${relative(rootPath, path)}: 不允许软链接`);
      if (info.isDirectory()) await visit(path);
      else if (info.isFile()) result.push(relative(rootPath, path));
      else throw new Error(`${relative(rootPath, path)}: 文件类型无效`);
    }
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
