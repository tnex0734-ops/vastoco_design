import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

// 1. Build dist/
const dist = resolve(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const item of ['index.html', 'src', 'public/assets']) {
  const target = item === 'public/assets' ? 'assets' : item;
  await cp(resolve(root, item), resolve(dist, target), { recursive: true });
}

// 2. Ensure public/ also has index.html and src so if Vercel serves public/ it works 100%
const pub = resolve(root, 'public');
await cp(resolve(root, 'index.html'), resolve(pub, 'index.html'));
await cp(resolve(root, 'src'), resolve(pub, 'src'), { recursive: true });

// 3. Ensure root has assets/ so if Vercel serves root it works 100%
const rootAssets = resolve(root, 'assets');
await cp(resolve(pub, 'assets'), rootAssets, { recursive: true });

console.log('Built static frontend into dist/, public/, and root.');
