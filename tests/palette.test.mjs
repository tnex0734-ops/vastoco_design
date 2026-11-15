import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const allowedHex = new Set(['#3C2415', '#DDD9CE']);
const allowedRgb = new Set(['60,36,21', '221,217,206']);

function rgbKey(value) {
  const channels = value.split(',').slice(0, 3).map((part) => Math.round(Number(part.trim())));
  return channels.join(',');
}

test('runtime CSS uses only Espresso and Pale Oak as colour values', () => {
  const css = readFileSync(resolve(root, 'src/styles.css'), 'utf8');
  const hexValues = new Set([...css.matchAll(/#[0-9a-fA-F]{3,8}/g)].map(([value]) => value.toUpperCase()));
  assert.deepEqual([...hexValues].sort(), [...allowedHex].sort());
  const rgbValues = [...css.matchAll(/rgba?\(([^)]*)\)/gi)].map(([, value]) => rgbKey(value));
  assert.ok(rgbValues.every((value) => allowedRgb.has(value)), `Unexpected RGB values: ${rgbValues.filter((value) => !allowedRgb.has(value)).join('; ')}`);
});

test('runtime SVG illustrations and favicon use only the approved palette', () => {
  const assetDir = resolve(root, 'public/assets');
  const svgFiles = readdirSync(assetDir).filter((name) => name.endsWith('.svg'));
  assert.ok(svgFiles.length > 0);
  for (const name of svgFiles) {
    const svg = readFileSync(resolve(assetDir, name), 'utf8');
    const values = new Set([...svg.matchAll(/#[0-9a-fA-F]{3,8}/g)].map(([value]) => value.toUpperCase()));
    assert.ok([...values].every((value) => allowedHex.has(value)), `${name} contains an unapproved colour: ${[...values].filter((value) => !allowedHex.has(value)).join(', ')}`);
  }
});

test('machine-readable colour tokens contain exactly the two supplied colours', () => {
  const tokens = JSON.parse(readFileSync(resolve(root, 'tokens/design-tokens.json'), 'utf8'));
  assert.deepEqual(tokens.colors, { espresso: '#3C2415', paleOak: '#DDD9CE' });
});

test('typography tokens configure Playfair Display for display and Inter for UI', () => {
  const tokens = JSON.parse(readFileSync(resolve(root, 'tokens/design-tokens.json'), 'utf8'));
  assert.equal(tokens.typography.display, 'Playfair Display');
  assert.equal(tokens.typography.ui, 'Inter');
  const css = readFileSync(resolve(root, 'src/styles.css'), 'utf8');
  assert.match(css, /--font-display:\s*"Playfair Display"/);
  assert.match(css, /--font-ui:\s*"Inter"/);
});
