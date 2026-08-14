import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { skillNames } from './skill-config.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const cases = JSON.parse(
  await readFile(join(root, 'evals', 'cases.json'), 'utf8'),
);

for (const skillName of skillNames) {
  const skill = await readFile(
    join(root, 'skills', skillName, 'SKILL.md'),
    'utf8',
  );
  const specification = cases[skillName];
  if (!specification) throw new Error(`${skillName}: 缺少 eval`);
  for (const required of specification.required)
    if (!skill.includes(required))
      throw new Error(`${skillName}: 缺少策略：${required}`);
  for (const forbidden of specification.forbidden)
    if (skill.toLowerCase().includes(forbidden.toLowerCase()))
      throw new Error(`${skillName}: 包含禁止策略：${forbidden}`);
}

console.log(`Passed ${skillNames.length} offline policy evals.`);
