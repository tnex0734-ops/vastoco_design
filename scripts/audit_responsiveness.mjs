import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const pages = [
  'gateway',
  'clients',
  'professionals',
  'explore',
  'profile',
  'booking',
  'professional-join',
  'signin',
  'signup',
  'not-found'
];
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

let hasFailure = false;

for (const width of widths) {
  console.log(`\n--- Viewport Width: ${width}px ---`);
  for (const p of pages) {
    const file = resolve(root, 'preview', `${p}.html`);
    const dom = execFileSync(chrome, [
      '--headless=new',
      '--dump-dom',
      `--window-size=${width},800`,
      '--hide-scrollbars',
      `file:///${file.replace(/\\/g, '/')}`
    ], { encoding: 'utf-8' });

    const overflowMatch = dom.match(/data-has-overflow="([^"]+)"/);
    const scrollMatch = dom.match(/data-scroll-width="([^"]+)"/);
    const innerMatch = dom.match(/data-inner-width="([^"]+)"/);
    const elsMatch = dom.match(/data-overflow-elements="([^"]+)"/);

    const hasOverflow = overflowMatch ? overflowMatch[1] === 'true' : false;
    const scrollW = scrollMatch ? scrollMatch[1] : '?';
    const innerW = innerMatch ? innerMatch[1] : '?';
    const els = elsMatch ? elsMatch[1] : '';

    const status = hasOverflow ? 'FAIL (OVERFLOW)' : 'PASS';
    if (hasOverflow) hasFailure = true;

    console.log(`[${status}] ${p.padEnd(20)} scrollWidth=${scrollW} innerWidth=${innerW} ${els}`);
  }
}

if (hasFailure) {
  console.error('\nResponsive audit found horizontal overflow issues.');
  process.exit(1);
} else {
  console.log('\nAll pages pass responsive horizontal overflow audit across all viewports!');
}

