import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const useDist = process.argv.includes('--dist');
const publicRoot = resolve(root, useDist ? 'dist' : '.');
const port = Number(process.env.PORT || 4173);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.md': 'text/markdown; charset=utf-8'
};

const server = createServer((req, res) => {
  if (!req.url || req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end('Method not allowed');
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    return res.end('Bad request');
  }

  const cleanPath = normalize(pathname).replace(/^([.][.][/\\])+/, '').replace(/^[/\\]+/, '');
  const isAsset = cleanPath.startsWith(`assets${sep}`) || cleanPath.startsWith('assets/');
  let filePath = isAsset && !useDist
    ? resolve(root, 'public', cleanPath)
    : resolve(publicRoot, cleanPath || 'index.html');
  if (!filePath.startsWith(publicRoot + sep) && filePath !== publicRoot) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(publicRoot, 'index.html');
  }
  if (!existsSync(filePath)) {
    res.writeHead(404);
    return res.end('Not found');
  }

  const headers = {
    'Content-Type': mime[extname(filePath).toLowerCase()] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cache-Control': filePath.includes(`${sep}assets${sep}`) ? 'public, max-age=604800, immutable' : 'no-cache'
  };
  res.writeHead(200, headers);
  if (req.method === 'HEAD') return res.end();
  createReadStream(filePath).pipe(res);
});

export default function handler(req, res) {
  server.emit('request', req, res);
}

if (!process.env.VERCEL && !process.env.NOW_REGION) {
  server.listen(port, '0.0.0.0', () => {
    console.log(`Vastoco prototype ready at http://localhost:${port}`);
    console.log(`Serving ${useDist ? 'dist/' : 'project root'} · frontend only · no backend`);
  });
}
