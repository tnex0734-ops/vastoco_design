import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage, clientPage, professionalPage, signupPage, signinPage, explorePage, profilePage, bookingPage, professionalJoinPage } from '../src/pages.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const templates = [
  homePage(), clientPage(), professionalPage(), signupPage(), signinPage(),
  explorePage(), profilePage(), bookingPage(), professionalJoinPage()
];

test('all rendered page templates reference assets that exist in the project', () => {
  const missing = [];
  for (const html of templates) {
    for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)) {
      const path = resolve(root, 'public', match[1].replace(/^\//, ''));
      if (!existsSync(path)) missing.push(match[1]);
    }
  }
  assert.deepEqual(missing, []);
});

test('gateway includes the pauseable monitor-stage and the two official doors', () => {
  const html = homePage();
  assert.match(html, /data-motion-toggle/);
  assert.match(html, /For clients/i);
  assert.match(html, /For professionals/i);
  assert.match(html, /\/clients/);
  assert.match(html, /\/professionals/);
});


test('professional page makes the current paid-plan and commission terms visible', () => {
  const html = professionalPage();
  assert.match(html, /Paid consultations require a paid plan/i);
  assert.match(html, /keep 85%/i);
  assert.match(html, /15% commission is deducted from the professional/i);
});

test('professional setup presents profession-specific verification guidance without claiming a live check', () => {
  const html = professionalJoinPage();
  const main = readFileSync(resolve(root, 'src/main.js'), 'utf8');
  assert.match(html, /data-verification-guidance/);
  assert.match(html, /data-coa-field/);
  assert.match(main, /Architects: the current Vastoco professional page lists a Council of Architecture/);
  assert.match(main, /Interior designers: the current Vastoco professional page describes identity/);
  assert.match(main, /Vastu consultants: the current Vastoco professional page describes identity/);
  assert.match(html, /does not collect credential documents or perform a verification check/i);
});

test('signup preserves intent and allows exploration without forced registration', () => {
  const unknownRole = signupPage();
  assert.match(unknownRole, /How would you like to use Vastoco\?/);
  assert.match(unknownRole, /No account required to explore/i);
  assert.match(unknownRole, /\/clients\/explore/);

  const clientIntent = signupPage('client');
  assert.match(clientIntent, /Create your client account\./);
  assert.match(clientIntent, /data-existing-alert/);
  assert.match(clientIntent, /Change intent/);
});

test('signin includes credential recovery demonstration', () => {
  const html = signinPage();
  assert.match(html, /data-toggle-recovery/);
  assert.match(html, /data-recovery-panel/);
  assert.match(html, /data-cancel-recovery/);
  assert.match(html, /data-form="recovery"/);
});

test('client profile demonstrates authentic zero-reviews and empty portfolio toggle', () => {
  const html = profilePage();
  assert.match(html, /Consultation Reviews \(0\)/);
  assert.match(html, /zero-fake-review policy/i);
  assert.match(html, /data-simulate-empty-portfolio/);
  assert.match(html, /data-portfolio-empty/);
  assert.match(html, /Council of Architecture \(COA\) Active Register Check/);
});

test('consultation booking demonstrates unavailable slots and payment failure simulation', () => {
  const html = bookingPage();
  assert.match(html, /data-slot-unavailable/);
  assert.match(html, /data-slot-alert/);
  assert.match(html, /data-simulate-payment-failure/);
  assert.match(html, /data-booking-confirmation/);
  assert.match(html, /zero hidden charges/i);
});

test('professional join flow supports draft recovery and document correction alerts', () => {
  const html = professionalJoinPage();
  assert.match(html, /data-resume-banner/);
  assert.match(html, /data-save-draft/);
  assert.match(html, /data-simulate-correction/);
  assert.match(html, /data-correction-alert/);
  assert.match(html, /data-simulate-upload-fail/);
  assert.match(html, /data-upload-error/);
  assert.match(html, /data-missing-portfolio-alert/);
});

test('axis landing hero, scroll story, and editorial doors are present on homepage', () => {
  const html = homePage();
  assert.match(html, /data-strip-stage/);
  assert.match(html, /data-strip-track/);
  assert.match(html, /data-scroll-story/);
  assert.match(html, /data-story-stage/);
  assert.match(html, /data-beat="0"/);
  assert.match(html, /data-beat="1"/);
  assert.match(html, /data-beat="2"/);
  assert.match(html, /data-hover-card/);
  assert.match(html, /professional-door-02-architect-at-work\.png/);
  assert.match(html, /house-cutaway\.webp/);
});
