import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RAW_REVIEWS,
  RAW_PROFESSIONALS,
  computeRatingStats,
  getAllProfessionalsWithStats,
  filterProfessionals,
  sortProfessionals
} from '../src/clientData.js';

test('Naina Kapoor computes exact 4.8 average from 36 eligible reviews with correct distribution', () => {
  const stats = computeRatingStats('naina-kapoor', RAW_REVIEWS);
  assert.equal(stats.reviewCount, 36);
  assert.equal(stats.averageRating, 4.8);
  assert.equal(stats.averageFormatted, '4.8');
  assert.deepEqual(stats.distribution, {
    5: 31,
    4: 3,
    3: 1,
    2: 1,
    1: 0
  });
  assert.equal(stats.hasReviews, true);
  assert.equal(stats.isNew, false);
});

test('Kabir Sethi single review edge case computes 5.0 with count 1', () => {
  const stats = computeRatingStats('kabir-sethi', RAW_REVIEWS);
  assert.equal(stats.reviewCount, 1);
  assert.equal(stats.averageRating, 5.0);
  assert.equal(stats.distribution[5], 1);
  assert.equal(stats.hasReviews, true);
});

test('Mira Khanna zero review edge case returns null average and isNew true', () => {
  const stats = computeRatingStats('mira-khanna', RAW_REVIEWS);
  assert.equal(stats.reviewCount, 0);
  assert.equal(stats.averageRating, null);
  assert.equal(stats.averageFormatted, null);
  assert.equal(stats.hasReviews, false);
  assert.equal(stats.isNew, true);
});

test('Dev Malhotra has identical 4.8 average with different review count (12 reviews)', () => {
  const stats = computeRatingStats('dev-malhotra', RAW_REVIEWS);
  assert.equal(stats.reviewCount, 12);
  assert.equal(stats.averageRating, 4.8);
  assert.equal(stats.distribution[5], 10);
  assert.equal(stats.distribution[4], 2);
});

test('Rahul Verma excludes pending and hidden reviews from calculation', () => {
  // Rahul Verma has 24 published + 1 pending + 1 hidden in RAW_REVIEWS
  const rahulAll = RAW_REVIEWS.filter((r) => r.professionalId === 'rahul-verma');
  assert.equal(rahulAll.length, 26);

  const stats = computeRatingStats('rahul-verma', RAW_REVIEWS);
  // Only the 24 published reviews must be counted
  assert.equal(stats.reviewCount, 24);
  assert.equal(stats.averageRating, 4.5);
  // Ensure pending and hidden are not in eligibleReviews
  assert.equal(stats.eligibleReviews.every((r) => r.status === 'published'), true);
});

test('Sorting by highest rated sorts by average primary and review count secondary', () => {
  const pros = getAllProfessionalsWithStats();
  const sorted = sortProfessionals(pros, 'rating_desc');

  // Kabir has 5.0 (1 rev)
  assert.equal(sorted[0].id, 'kabir-sethi');
  // Naina (4.8, 36 revs) should come before Dev (4.8, 12 revs)
  const nainaIdx = sorted.findIndex((p) => p.id === 'naina-kapoor');
  const devIdx = sorted.findIndex((p) => p.id === 'dev-malhotra');
  assert.ok(nainaIdx < devIdx, 'Naina with 36 reviews should rank above Dev with 12 reviews when both average 4.8');

  // Mira with 0 reviews should be at the end, not treated as 0.0
  const miraIdx = sorted.findIndex((p) => p.id === 'mira-khanna');
  assert.equal(miraIdx, sorted.length - 1);
});

test('Filtering engine respects category, locality, search and rating threshold', () => {
  const pros = getAllProfessionalsWithStats();

  // Filter by category: interior
  const interiors = filterProfessionals(pros, { category: 'interior' });
  assert.equal(interiors.every((p) => p.roleKey === 'interior'), true);
  assert.ok(interiors.length >= 2);

  // Filter by locality: South Delhi
  const southDelhi = filterProfessionals(pros, { locality: 'South Delhi' });
  assert.equal(southDelhi.every((p) => p.location === 'South Delhi'), true);

  // Search by keyword: 'villa'
  const villaSearch = filterProfessionals(pros, { searchQuery: 'villa' });
  assert.ok(villaSearch.some((p) => p.id === 'naina-kapoor'));

  // Rating 4.8+ filter excluding unrated
  const ratedHigh = filterProfessionals(pros, { minRating: '4.8', includeUnrated: false });
  assert.ok(ratedHigh.every((p) => p.rating !== null && p.rating >= 4.8));
  assert.ok(!ratedHigh.some((p) => p.id === 'mira-khanna'));
});

