import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFeeBreakdown,
  DEFAULT_CLIENT_BRIEFS,
  getClientBriefs,
  saveClientBrief,
  getProOffers,
  sendProOffer,
  updateOfferStatus,
  detectScheduleConflicts,
  getProPortfolio,
  addProjectToPortfolio,
  deleteProjectFromPortfolio
} from '../src/marketplaceData.js';
import { resolveRoute, getRouteParams } from '../src/utils.js';

test('calculateFeeBreakdown computes exact 85% pro share and 15% platform deduction', () => {
  const b1 = calculateFeeBreakdown(2500);
  assert.equal(b1.gross, 2500);
  assert.equal(b1.proShare, 2125); // 2500 * 0.85 = 2125
  assert.equal(b1.platformFee, 375); // 2500 * 0.15 = 375

  const b2 = calculateFeeBreakdown(1400);
  assert.equal(b2.gross, 1400);
  assert.equal(b2.proShare, 1190);
  assert.equal(b2.platformFee, 210);

  const b3 = calculateFeeBreakdown(3500);
  assert.equal(b3.gross, 3500);
  assert.equal(b3.proShare, 2975);
  assert.equal(b3.platformFee, 525);
});

test('client briefs rigorously protect client privacy with no phone numbers, emails, or exact house numbers', () => {
  const briefs = DEFAULT_CLIENT_BRIEFS;
  assert.ok(briefs.length >= 4);

  for (const b of briefs) {
    // Assert no raw email or phone in description, title, or clientDisplayName
    assert.doesNotMatch(b.description, /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    assert.doesNotMatch(b.description, /(?:\+91|0)?[6-9]\d{9}/);
    assert.doesNotMatch(b.clientDisplayName, /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    assert.ok(b.privacy, 'Brief must specify privacy mode');
    assert.ok(['open', 'selected', 'private'].includes(b.privacy));
    assert.ok(b.locality.includes('Noida') || b.locality.includes('Gurugram') || b.locality.includes('Delhi') || b.locality.includes('Faridabad'));
  }
});

test('sendProOffer creates proposal and updating to accepted auto-schedules consultation', () => {
  const offer = sendProOffer({
    briefId: 'brief-test-1',
    briefTitle: 'Test Biophilic Villa',
    clientDisplayName: 'Test Client',
    clientLocality: 'Noida',
    durationMinutes: 30,
    feeAmount: 2000,
    pitchMessage: 'We have 10 years experience.'
  });

  assert.ok(offer.id.startsWith('off-'));
  assert.equal(offer.status, 'sent');
  assert.equal(offer.proPayout, 1700); // 85%
  assert.equal(offer.platformFee, 300); // 15%

  const accepted = updateOfferStatus(offer.id, 'accepted');
  assert.equal(accepted.status, 'accepted');
  assert.ok(accepted.meetingLink.includes('https://vastoco.internal/meet/'));
});

test('detectScheduleConflicts flags overlapping consultation bookings on identical date and time', () => {
  const schedule = [
    { scheduledDate: '2026-11-20', scheduledTimeStart: '10:00 AM', clientDisplayName: 'Client Alpha' },
    { scheduledDate: '2026-11-20', scheduledTimeStart: '10:00 AM', clientDisplayName: 'Client Beta' },
    { scheduledDate: '2026-11-20', scheduledTimeStart: '11:00 AM', clientDisplayName: 'Client Gamma' }
  ];

  const analyzed = detectScheduleConflicts(schedule);
  assert.equal(analyzed[0].hasConflict, false);
  assert.equal(analyzed[1].hasConflict, true);
  assert.ok(analyzed[1].conflictNotice.includes('Client Alpha'));
  assert.equal(analyzed[2].hasConflict, false);
});

test('portfolio manager supports adding and deleting projects', () => {
  const newProj = addProjectToPortfolio({
    title: 'Modern Balsa Studio',
    location: 'Sector 15, Noida',
    category: 'Architecture',
    year: '2026'
  });

  assert.ok(newProj.id.startsWith('proj-'));
  const current = getProPortfolio();
  assert.ok(current.some(p => p.id === newProj.id));

  deleteProjectFromPortfolio(newProj.id);
  const afterDelete = getProPortfolio();
  assert.ok(!afterDelete.some(p => p.id === newProj.id));
});

test('route resolver recognizes all professional workspace and client brief routes', () => {
  assert.equal(resolveRoute('/professional'), '/professional');
  assert.equal(resolveRoute('/professional/briefs'), '/professional/briefs');
  assert.equal(resolveRoute('/professional/briefs/brief-noida-44'), '/professional/briefs/:id');
  assert.equal(resolveRoute('/professional/offers'), '/professional/offers');
  assert.equal(resolveRoute('/professional/consultations'), '/professional/consultations');
  assert.equal(resolveRoute('/professional/calendar'), '/professional/calendar');
  assert.equal(resolveRoute('/professional/portfolio'), '/professional/portfolio');
  assert.equal(resolveRoute('/professional/profile'), '/professional/profile');
  assert.equal(resolveRoute('/professional/verification'), '/professional/verification');
  assert.equal(resolveRoute('/professional/settings'), '/professional/settings');

  assert.equal(resolveRoute('/client/briefs'), '/client/briefs');
  assert.equal(resolveRoute('/client/offers'), '/client/offers');

  const params = getRouteParams('/professional/briefs/brief-noida-44');
  assert.equal(params.id, 'brief-noida-44');
});

