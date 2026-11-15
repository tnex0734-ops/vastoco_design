import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = resolve(root, 'dist');
const pub = resolve(root, 'public');

// 1. Rebuild dist/
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const item of ['index.html', 'src', 'public/assets']) {
  const target = item === 'public/assets' ? 'assets' : item;
  await cp(resolve(root, item), resolve(dist, target), { recursive: true });
}

// 2. 404 fallback (used by Vercel/Netlify for unmatched routes)
await cp(resolve(root, 'index.html'), resolve(dist, '404.html'));
await cp(resolve(root, 'index.html'), resolve(pub, '404.html'));
await cp(resolve(root, 'index.html'), resolve(root, '404.html'));

// 3. Static route entrypoints (guarantees direct URLs resolve with 200 OK without serverless invocation)
const routes = [
  'clients',
  'professionals',
  'signup',
  'signin',
  'clients/explore',
  'clients/professional',
  'clients/booking',
  'professionals/join',
  'client',
  'client/briefs',
  'client/offers',
  'client/compare',
  'client/saved',
  'client/consultations',
  'client/activity',
  'client/profile',
  'client/professionals',
  'client/book',
  'professional',
  'professional/briefs',
  'professional/offers',
  'professional/consultations',
  'professional/calendar',
  'professional/portfolio',
  'professional/profile',
  'professional/verification',
  'professional/settings',
  'not-found'
];

for (const r of routes) {
  const distDir = resolve(dist, r);
  await mkdir(distDir, { recursive: true });
  await cp(resolve(root, 'index.html'), resolve(distDir, 'index.html'));

  const pubDir = resolve(pub, r);
  await mkdir(pubDir, { recursive: true });
  await cp(resolve(root, 'index.html'), resolve(pubDir, 'index.html'));
}

// 4. Ensure public/ also has index.html and src so if Vercel serves public/ it works 100%
await cp(resolve(root, 'index.html'), resolve(pub, 'index.html'));
await cp(resolve(root, 'src'), resolve(pub, 'src'), { recursive: true });

// 5. Ensure root has assets/ so if Vercel serves root it works 100%
const rootAssets = resolve(root, 'assets');
await cp(resolve(pub, 'assets'), rootAssets, { recursive: true });

console.log('Built static frontend and route fallbacks into dist/, public/, and root.');
