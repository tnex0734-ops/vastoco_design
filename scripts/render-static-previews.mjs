import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  homePage, clientPage, professionalPage, signupPage, signinPage,
  explorePage, profilePage, bookingPage, professionalJoinPage, notFoundPage
} from '../src/pages.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const rootBaseUrl = pathToFileURL(root).href.replace(/\/+$/, '') + '/';
const out = resolve(root, 'preview');
await mkdir(out, { recursive: true });
const pages = [
  ['gateway', homePage()],
  ['clients', clientPage()],
  ['professionals', professionalPage()],
  ['signup', signupPage()],
  ['signup-client', signupPage('client')],
  ['signin', signinPage()],
  ['explore', explorePage()],
  ['profile', profilePage()],
  ['booking', bookingPage()],
  ['professional-join', professionalJoinPage()],
  ['not-found', notFoundPage()]
];
for (const [name, body] of pages) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name} | Vastoco</title><base href="${rootBaseUrl}"><link rel="stylesheet" href="${rootBaseUrl}src/styles.css"></head><body>${body}<script type="module" src="${rootBaseUrl}src/main.js"></script><script>
window.addEventListener('DOMContentLoaded', () => {
  const scrollW = document.documentElement.scrollWidth;
  const innerW = window.innerWidth;
  const overflowing = [];
  document.querySelectorAll('*').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.right > innerW + 1) {
      overflowing.push(el.tagName + (el.className ? '.' + String(el.className).trim().replace(/\\s+/g, '.') : '') + ' [right:' + Math.round(rect.right) + ']');
    }
  });
  document.body.setAttribute('data-scroll-width', scrollW);
  document.body.setAttribute('data-inner-width', innerW);
  document.body.setAttribute('data-has-overflow', scrollW > innerW ? 'true' : 'false');
  if (overflowing.length) {
    document.body.setAttribute('data-overflow-elements', overflowing.slice(0, 5).join('; '));
  }
});
</script></body></html>`;
  await writeFile(resolve(out, `${name}.html`), html);
}
console.log(`Wrote ${pages.length} static visual preview pages to ${out}`);
