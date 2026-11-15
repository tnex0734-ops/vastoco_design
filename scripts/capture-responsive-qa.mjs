import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = resolve(root, 'docs', 'screenshots');
mkdirSync(outDir, { recursive: true });

const pages = [
  'gateway',
  'clients',
  'professionals',
  'explore',
  'booking',
  'professional-join'
];

const viewports = [
  { width: 1440, height: 900, name: '1440' },
  { width: 1280, height: 800, name: '1280' },
  { width: 1024, height: 768, name: '1024' },
  { width: 768, height: 1024, name: '768' },
  { width: 390, height: 844, name: '390' },
  { width: 360, height: 740, name: '360' }
];

console.log(`Starting automated screenshot matrix capture (${pages.length} pages x ${viewports.length} viewports = ${pages.length * viewports.length} screenshots)...`);

const summary = [];

for (const p of pages) {
  const htmlFile = resolve(root, 'preview', `${p}.html`);
  if (!existsSync(htmlFile)) {
    console.warn(`Preview file missing: ${htmlFile}`);
    continue;
  }
  for (const vp of viewports) {
    const outFile = resolve(outDir, `${p}_${vp.name}.png`);
    try {
      execFileSync(chrome, [
        '--headless=new',
        `--screenshot=${outFile}`,
        `--window-size=${vp.width},${vp.height}`,
        '--hide-scrollbars',
        `file:///${htmlFile.replace(/\\/g, '/')}`
      ]);
      const size = existsSync(outFile) ? statSync(outFile).size : 0;
      console.log(`[OK] ${p}_${vp.name}.png (${(size / 1024).toFixed(1)} KB)`);
      summary.push({ page: p, viewport: vp.name, size, path: outFile });
    } catch (err) {
      console.error(`[ERR] Failed to capture ${p}_${vp.name}: ${err.message}`);
    }
  }
}

console.log(`\nCompleted! Successfully captured ${summary.length} responsive screenshots into docs/screenshots/`);

