import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute, signupRoleFromURL, validateEmail, escapeHTML, clampNumber } from '../src/utils.js';

test('route resolver accepts required prototype routes and rejects unknown paths', () => {
  assert.equal(resolveRoute('/'), '/');
  assert.equal(resolveRoute('/clients/'), '/clients');
  assert.equal(resolveRoute('/professionals/join'), '/professionals/join');
  assert.equal(resolveRoute('/does-not-exist'), '/not-found');
});

test('role selection only accepts supported roles', () => {
  assert.equal(signupRoleFromURL('?role=client'), 'client');
  assert.equal(signupRoleFromURL('?role=professional'), 'professional');
  assert.equal(signupRoleFromURL('?role=admin'), null);
  assert.equal(signupRoleFromURL(''), null);
});

test('email validator accepts standard addresses and rejects incomplete values', () => {
  assert.equal(validateEmail('taushik@example.com'), true);
  assert.equal(validateEmail('not-an-email'), false);
  assert.equal(validateEmail('name@domain'), false);
  assert.equal(validateEmail(''), false);
});

test('HTML escaping protects all common markup delimiters', () => {
  assert.equal(escapeHTML(`<script title="x">'&</script>`), '&lt;script title=&quot;x&quot;&gt;&#39;&amp;&lt;/script&gt;');
});

test('numeric clamp handles bounds and non-numeric values', () => {
  assert.equal(clampNumber(4, 1, 5), 4);
  assert.equal(clampNumber(-3, 1, 5), 1);
  assert.equal(clampNumber(99, 1, 5), 5);
  assert.equal(clampNumber('nope', 1, 5), 1);
});

import { homePage, clientPage, professionalPage, explorePage, professionalJoinPage } from '../src/pages.js';

test('required homepage templates keep both doors connected and distinct', () => {
  const home = homePage();
  const client = clientPage();
  const professional = professionalPage();
  assert.match(home, /For clients/i);
  assert.match(home, /For professionals/i);
  assert.match(client, /Find the right professional/i);
  assert.match(client, /15, 30 or 45 minutes/i);
  assert.match(client, /\/professionals/);
  assert.match(professional, /85/);
  assert.match(professional, /COA register check/i);
  assert.match(professional, /\/clients/);
});

test('supporting prototype templates mark example content and non-live behaviour', () => {
  assert.match(explorePage(), /Sample content/);
  assert.match(explorePage(), /not live listings/i);
  assert.match(professionalJoinPage(), /Verification pending/);
  assert.match(professionalJoinPage(), /COA/i);
});
