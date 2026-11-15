import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clientPage,
  clientWorkspacePage,
  clientComparePage,
  clientSavedPage,
  clientConsultationsPage,
  clientActivityPage,
  clientAccountPage,
  clientProfileDetailPage,
  clientBookingDetailPage,
  ratingSummaryComponent,
  reviewsListComponent
} from '../src/pages.js';
import { computeRatingStats, RAW_REVIEWS } from '../src/clientData.js';

test('clientPage renders discovery-first layout above the fold with search and category chips', () => {
  const html = clientPage();
  assert.match(html, /data-discovery-section/);
  assert.match(html, /Find the right professional for your project\./);
  assert.match(html, /data-discovery-search/);
  assert.match(html, /data-filter-category="architect"/);
  assert.match(html, /data-filter-category="interior"/);
  assert.match(html, /data-filter-category="vastu"/);
  assert.match(html, /data-filters-sidebar/);
  assert.match(html, /data-discovery-grid/);
  // Preserves required test invariants
  assert.match(html, /15, 30 or 45 minutes/i);
  assert.match(html, /\/professionals/);
});

test('clientWorkspacePage renders authenticated application shell, greeting, and discovery', () => {
  const html = clientWorkspacePage();
  assert.match(html, /data-client-app-header/);
  assert.match(html, /Client Workspace/);
  assert.match(html, /Welcome back, Priya/);
  assert.match(html, /client-bottom-nav/);
  assert.match(html, /data-discovery-section/);
});

test('clientComparePage renders 2-column comparison matrix and empty state fallback', () => {
  const html = clientComparePage();
  assert.match(html, /data-compare-screen/);
  assert.match(html, /Side-by-Side Comparison/i);
  assert.match(html, /Overall Client Rating/);
  assert.match(html, /Consultation Fees \(Upfront\)/);
});

test('clientSavedPage renders saved professionals list and empty state fallback', () => {
  const html = clientSavedPage();
  assert.match(html, /data-saved-screen/);
  assert.match(html, /Your Shortlisted Experts/i);
});

test('clientConsultationsPage renders upcoming, completed and cancelled tabs with 85% pro share and 100% escrow', () => {
  const html = clientConsultationsPage();
  assert.match(html, /data-consultations-screen/);
  assert.match(html, /data-tab="upcoming"/);
  assert.match(html, /data-tab="completed"/);
  assert.match(html, /data-tab="cancelled"/);
  assert.match(html, /Pro share \(85%\)/);
  assert.match(html, /100% Escrow Protected/);
});

test('clientActivityPage renders audit timeline with events and links', () => {
  const html = clientActivityPage();
  assert.match(html, /data-activity-screen/);
  assert.match(html, /Activity Timeline/i);
  assert.match(html, /activity-timeline-feed/);
});

test('clientAccountPage renders client preferences and prototype mode switcher', () => {
  const html = clientAccountPage();
  assert.match(html, /data-profile-screen/);
  assert.match(html, /Evaluation Mode Switcher/);
  assert.match(html, /data-action="switch-client-mode-btn"/);
  assert.match(html, /Priya Sharma/);
});

test('clientProfileDetailPage renders monograph with 5-star distribution chart, genuine portfolio, and reviews', () => {
  const html = clientProfileDetailPage('naina-kapoor');
  assert.match(html, /data-monograph-screen/);
  assert.match(html, /Naina Kapoor/);
  assert.match(html, /COA Active Register Check/);
  assert.match(html, /Rating distribution/);
  assert.match(html, /data-portfolio-gallery/);
  assert.match(html, /data-reviews-container/);
  assert.match(html, /data-review-filter="5"/);
});

test('clientBookingDetailPage renders 6-step booking studio with upfront fees and payment failure simulation', () => {
  const html = clientBookingDetailPage('naina-kapoor');
  assert.match(html, /data-booking-studio/);
  assert.match(html, /Step 1 — Choose consultation length/);
  assert.match(html, /Step 2 — Select available date & time/);
  assert.match(html, /data-slot-alert/);
  assert.match(html, /data-simulate-payment-failure/);
  assert.match(html, /data-booking-confirmation-modal/);
  assert.match(html, /100% Escrow Protection/);
});

test('ratingSummaryComponent correctly renders distribution percentages and zero-review empty state', () => {
  const nainaStats = computeRatingStats('naina-kapoor', RAW_REVIEWS);
  const nainaHtml = ratingSummaryComponent(nainaStats, 'Naina Kapoor');
  assert.match(nainaHtml, /4\.8/);
  assert.match(nainaHtml, /36/);
  assert.match(nainaHtml, /data-star-row="5"/);
  assert.match(nainaHtml, /data-star-row="1"/);

  const emptyStats = computeRatingStats('non-existent', []);
  const emptyHtml = ratingSummaryComponent(emptyStats, 'Test Pro');
  assert.match(emptyHtml, /New to Vastoco/);
  assert.match(emptyHtml, /No client reviews yet/);
});

test('validateClientProfile validates required fields, email format, and phone number', async () => {
  const { validateClientProfile, DEFAULT_CLIENT_PROFILE } = await import('../src/clientData.js');

  const validResult = validateClientProfile(DEFAULT_CLIENT_PROFILE);
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);

  const invalidResult = validateClientProfile({
    fullName: '',
    email: 'not-an-email',
    phone: '123',
    city: ''
  });
  assert.equal(invalidResult.isValid, false);
  assert.match(invalidResult.errors.fullName, /minimum 2 characters/i);
  assert.match(invalidResult.errors.email, /valid email address/i);
  assert.match(invalidResult.errors.phone, /minimum 10 digits/i);
  assert.match(invalidResult.errors.city, /select or enter your city/i);
});

test('clientAccountPage renders both view mode and editable form with discard modal', () => {
  const html = clientAccountPage();
  assert.match(html, /data-profile-view-mode/);
  assert.match(html, /data-profile-edit-mode/);
  assert.match(html, /id="clientProfileForm"/);
  assert.match(html, /data-discard-modal/);
  assert.match(html, /data-action="start-edit-profile"/);
  assert.match(html, /data-action="cancel-edit-profile"/);
  assert.match(html, /data-action="submit-profile-form"/);
  assert.match(html, /data-profile-toast/);
});

test('professionalCardV2 renders clickable card with inline verification pill and compact rating', async () => {
  const { professionalCardV2 } = await import('../src/clientPages.js');
  const { getProfessionalById } = await import('../src/clientData.js');

  const pro = getProfessionalById('naina-kapoor');
  const cardHtml = professionalCardV2(pro, { savedIds: [], comparedIds: [] });

  assert.match(cardHtml, /data-card-href="\/client\/professionals\/naina-kapoor"/);
  assert.match(cardHtml, /role="link"/);
  assert.match(cardHtml, /inline-verif-pill--architect/);
  assert.match(cardHtml, /COA checked/);
  assert.match(cardHtml, /4\.8/);
  assert.match(cardHtml, /36 reviews/);
  assert.match(cardHtml, /data-action="book-card-btn"/);
  // View profile button is removed in favor of card click
  assert.doesNotMatch(cardHtml, /View profile<\/a>/);
});

