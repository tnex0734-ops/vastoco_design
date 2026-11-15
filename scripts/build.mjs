import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = resolve(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const item of ['index.html', 'src', 'public/assets']) {
  const target = item === 'public/assets' ? 'assets' : item;
  await cp(resolve(root, item), resolve(dist, target), { recursive: true });
}
console.log('Built static frontend into dist/.');
