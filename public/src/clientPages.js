// Vastoco Client Experience V2 — UI Components and Application Views
// Strictly compliant with the two-colour brand palette: Espresso #3C2415 & Pale Oak #DDD9CE.
// Frontend-only. All data and reviews are illustrative demo records.

import { icon } from './icons.js';
import { escapeHTML } from './utils.js';
import {
  CATEGORIES,
  LOCALITIES,
  SERVICES,
  SPECIALIZATIONS,
  DURATIONS,
  SORT_OPTIONS,
  getAllProfessionalsWithStats,
  getProfessionalById,
  filterProfessionals,
  sortProfessionals,
  getClientState,
  saveClientState,
  toggleSaveProfessional,
  toggleCompareProfessional,
  clearComparison,
  setClientMode,
  getClientProfile,
  saveClientProfile,
  DEFAULT_CLIENT_PROFILE,
  RAW_REVIEWS
} from './clientData.js';
import {
  getClientBriefs,
  saveClientBrief,
  getProOffers,
  updateOfferStatus
} from './marketplaceData.js';

// Renders visual star icons in pure Espresso (#3C2415)
export function renderRatingStars(rating, size = 15) {
  if (rating === null || rating === undefined) {
    return `<span class="rating-stars rating-stars--unrated" title="No reviews yet">★</span>`;
  }
  const rounded = Math.round(rating);
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= rounded;
    starsHtml += `<span class="star-glyph ${isFilled ? 'star-glyph--filled' : 'star-glyph--empty'}" aria-hidden="true">★</span>`;
  }
  return `<span class="rating-stars" aria-label="Rated ${rating.toFixed(1)} out of 5">${starsHtml}</span>`;
}

// Reusable Rating & Review Summary Component with 5-to-1 Star Distribution Bar Chart
export function ratingSummaryComponent(stats, proName = 'this professional') {
  if (!stats || !stats.hasReviews) {
    return `
      <div class="rating-summary rating-summary--empty" data-rating-summary>
        <div class="rating-summary-badge">
          <span class="rating-tag">New to Vastoco</span>
        </div>
        <div class="rating-summary-info">
          <h3>No client reviews yet</h3>
          <p>Reviews can only be submitted by verified clients who have completed a video consultation with ${escapeHTML(proName)}. Once consultations take place, published client feedback and rating distribution will appear here.</p>
          <div class="rating-policy-pill">
            ${icon('shield', '', 14)} Zero-fake-review policy · 1 review per completed consultation
          </div>
        </div>
      </div>
    `;
  }

  const { averageFormatted, reviewCount, distribution } = stats;

  const distributionRows = [5, 4, 3, 2, 1].map((star) => {
    const count = distribution[star] || 0;
    const pct = reviewCount > 0 ? Math.round((count / reviewCount) * 100) : 0;
    return `
      <div class="dist-row" data-star-row="${star}">
        <button type="button" class="dist-star-label" data-filter-by-star="${star}" aria-label="Filter reviews by ${star} stars">
          <span>${star}</span> <span class="dist-star-glyph">★</span>
        </button>
        <div class="dist-bar-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${count} reviews with ${star} stars">
          <div class="dist-bar-fill" style="width: ${pct}%"></div>
        </div>
        <span class="dist-count">${count}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="rating-summary" data-rating-summary>
      <div class="rating-score-block">
        <div class="rating-big-score" aria-label="Average rating ${averageFormatted} out of 5">${averageFormatted}</div>
        <div class="rating-stars-row">
          ${renderRatingStars(parseFloat(averageFormatted), 18)}
        </div>
        <div class="rating-meta-count">
          <strong>${reviewCount}</strong> eligible ${reviewCount === 1 ? 'review' : 'reviews'}
        </div>
        <div class="rating-demo-tag">Illustrative sample data</div>
      </div>

      <div class="rating-distribution-block">
        <div class="distribution-heading">Rating distribution</div>
        <div class="distribution-bars">
          ${distributionRows}
        </div>
      </div>

      <div class="rating-policy-block">
        <div class="policy-header">
          ${icon('shield', '', 16)} <strong>Verified Review Integrity</strong>
        </div>
        <p>Only verified clients who completed a paid video consultation on Vastoco may submit a review. Maximum one review per completed session. Unverified, pending, or hidden records are excluded from platform scores.</p>
      </div>
    </div>
  `;
}

// Reusable Review Card Component
export function reviewCard(review) {
  const initials = review.clientDisplayName
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2);

  return `
    <article class="review-card" data-review-id="${review.id}" data-review-rating="${review.rating}">
      <div class="review-header">
        <div class="review-client-badge">
          <div class="client-avatar" aria-hidden="true">${escapeHTML(initials)}</div>
          <div>
            <div class="client-name">${escapeHTML(review.clientDisplayName)}</div>
            <div class="review-date">${escapeHTML(review.publishedAt)}</div>
          </div>
        </div>
        <div class="review-stars-wrap">
          ${renderRatingStars(review.rating, 14)}
          <span class="review-score-num">${review.rating}.0</span>
        </div>
      </div>

      ${review.consultationContext ? `
        <div class="review-consultation-context">
          ${icon('video', '', 13)} ${escapeHTML(review.consultationContext)}
        </div>
      ` : ''}

      <p class="review-body">${escapeHTML(review.reviewText)}</p>

      <div class="review-footer">
        <span class="review-verified-pill">${icon('check', '', 12)} Verified consultation client</span>
        <button type="button" class="review-report-button" data-report-review="${review.id}" aria-label="Report review as inappropriate">Report</button>
      </div>
    </article>
  `;
}

// Reusable Reviews List Component with sorting and filtering
export function reviewsListComponent(reviews, proId) {
  if (!reviews || reviews.length === 0) {
    return `
      <div class="reviews-empty-list">
        <p>No client reviews currently published for this professional.</p>
      </div>
    `;
  }

  const reviewsHtml = reviews.map(reviewCard).join('');

  return `
    <div class="reviews-list-container" data-reviews-container data-pro-id="${proId}">
      <div class="reviews-toolbar">
        <div class="reviews-filter-chips">
          <span class="filter-label">Filter:</span>
          <button type="button" class="chip chip--active" data-review-filter="all">All (${reviews.length})</button>
          <button type="button" class="chip" data-review-filter="5">5 ★</button>
          <button type="button" class="chip" data-review-filter="4">4 ★</button>
          <button type="button" class="chip" data-review-filter="3">3 ★</button>
          <button type="button" class="chip" data-review-filter="2">2 ★</button>
          <button type="button" class="chip" data-review-filter="1">1 ★</button>
        </div>

        <div class="reviews-sort">
          <label for="reviewSortSelect">Sort:</label>
          <select id="reviewSortSelect" class="select-input select-input--compact" data-review-sort>
            <option value="relevant">Most relevant</option>
            <option value="newest">Newest first</option>
            <option value="highest">Highest rating</option>
            <option value="lowest">Lowest rating</option>
          </select>
        </div>
      </div>

      <div class="reviews-feed" data-reviews-feed>
        ${reviewsHtml}
      </div>
    </div>
  `;
}

// Professional Listing Card for Discovery and Directory
export function professionalCardV2(pro, clientState = {}) {
  const { id, name, profession, location, experienceYears, specializations, consultationFees, image, imageAlt, stats, verificationLabel } = pro;
  const isSaved = (clientState.savedIds || []).includes(id);
  const isCompared = (clientState.comparedIds || []).includes(id);

  let ratingDisplay = '';
  if (stats && stats.hasReviews) {
    ratingDisplay = `
      <div class="card-rating" aria-label="Rated ${stats.averageFormatted} out of 5 from ${stats.reviewCount} reviews">
        <span class="rating-star-glyph" aria-hidden="true">★</span>
        <strong class="rating-val">${stats.averageFormatted}</strong>
        <span class="rating-sep">·</span>
        <span class="rating-count">${stats.reviewCount} reviews</span>
      </div>
    `;
  } else {
    ratingDisplay = `
      <div class="card-rating card-rating--new" title="New professional on Vastoco with zero reviews">
        <span class="badge-new">New to Vastoco</span>
      </div>
    `;
  }

  const specChips = (specializations || []).slice(0, 3).map((s) => `
    <span class="tag-chip">${escapeHTML(s)}</span>
  `).join('');

  const shortVerif = pro.shortVerifLabel || (pro.roleKey === 'architect' ? 'COA checked' : 'Credentials checked');
  const verifIconName = pro.roleKey === 'architect' ? 'shield' : 'check';

  return `
    <article class="pro-card-v2" data-pro-id="${id}" data-role="${pro.roleKey}" data-card-href="/client/professionals/${id}" tabindex="0" role="link" aria-label="${escapeHTML(name)}, ${escapeHTML(profession)} in ${escapeHTML(location)}">
      <div class="pro-card-media">
        <img src="${image}" alt="${escapeHTML(imageAlt || name)}" loading="lazy" width="400" height="260" />
        <div class="media-save-pin">
          <button type="button" class="card-save-btn ${isSaved ? 'is-saved' : ''}" data-action="toggle-save" data-id="${id}" aria-label="${isSaved ? 'Remove from saved' : 'Save professional'}" title="${isSaved ? 'Saved' : 'Save for later'}">
            ${icon('bookmark', 'icon-save', 15)}
          </button>
        </div>
      </div>

      <div class="pro-card-body">
        <div class="pro-card-identity">
          <div class="pro-name-row">
            <h3 class="pro-name"><a href="/client/professionals/${id}" class="pro-name-link" data-action="open-profile-link">${escapeHTML(name)}</a></h3>
            ${ratingDisplay}
          </div>
          <div class="pro-profession-row">
            <span class="pro-title">${escapeHTML(profession)}</span>
            <span class="inline-verif-pill inline-verif-pill--${pro.roleKey}" title="${escapeHTML(verificationLabel || 'Verified Practice')}">
              ${icon(verifIconName, '', 12)}
              <span>${escapeHTML(shortVerif)}</span>
            </span>
            <span class="dot-separator">·</span>
            <span class="pro-exp">${experienceYears} yrs</span>
            <span class="dot-separator">·</span>
            <span class="pro-loc">${escapeHTML(location)}</span>
          </div>
        </div>

        <div class="pro-spec-chips">
          ${specChips}
        </div>

        <div class="pro-card-pricing">
          <div class="pricing-label">Consultation rates:</div>
          <div class="pricing-rates">
            <span class="rate-primary">₹${consultationFees[30].toLocaleString('en-IN')} <small>/ 30m</small></span>
            <span class="rate-secondary">15m: ₹${consultationFees[15].toLocaleString('en-IN')} · 45m: ₹${consultationFees[45].toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div class="pro-card-actions">
          <label class="compare-toggle-label" title="Select to compare side-by-side (max 2)">
            <input type="checkbox" class="compare-checkbox" data-action="toggle-compare" data-id="${id}" ${isCompared ? 'checked' : ''} />
            <span class="compare-box-facade"></span>
            <span class="compare-text">Compare</span>
          </label>

          <a class="button button--dark button--sm pro-card-book-btn" href="/client/book/${id}" data-action="book-card-btn" data-id="${id}">
            Book consultation
          </a>
        </div>
      </div>
    </article>
  `;
}

// Comparison Tray Dock (fixed at bottom when 1 or 2 items selected)
export function comparisonTrayDock(clientState) {
  const comparedIds = clientState.comparedIds || [];
  const count = comparedIds.length;
  const isHidden = count === 0;

  const slot1 = comparedIds[0] ? getProfessionalById(comparedIds[0]) : null;
  const slot2 = comparedIds[1] ? getProfessionalById(comparedIds[1]) : null;

  return `
    <div class="client-comparison-dock ${isHidden ? 'is-hidden' : ''}" data-compare-dock aria-label="Comparison dock" ${isHidden ? 'hidden' : ''}>
      <div class="container dock-container">
        <div class="dock-summary">
          <div class="dock-badge">${icon('compare', '', 16)} <strong>Comparison Tray</strong></div>
          <div class="dock-counter"><span data-compare-count>${count}</span> of 2 selected</div>
        </div>

        <div class="dock-slots">
          <!-- Slot 1 -->
          <div class="dock-slot ${slot1 ? 'is-filled' : 'is-empty'}">
            ${slot1 ? `
              <img src="${slot1.image}" alt="${escapeHTML(slot1.name)}" class="dock-slot-img" />
              <div class="dock-slot-meta">
                <span class="dock-slot-name">${escapeHTML(slot1.name)}</span>
                <span class="dock-slot-pro">${escapeHTML(slot1.profession)}</span>
              </div>
              <button type="button" class="dock-slot-remove" data-action="remove-compare" data-id="${slot1.id}" aria-label="Remove ${escapeHTML(slot1.name)}">
                ${icon('close', '', 14)}
              </button>
            ` : `
              <span class="dock-empty-hint">Slot 1: Select professional</span>
            `}
          </div>

          <!-- Slot 2 -->
          <div class="dock-slot ${slot2 ? 'is-filled' : 'is-empty'}">
            ${slot2 ? `
              <img src="${slot2.image}" alt="${escapeHTML(slot2.name)}" class="dock-slot-img" />
              <div class="dock-slot-meta">
                <span class="dock-slot-name">${escapeHTML(slot2.name)}</span>
                <span class="dock-slot-pro">${escapeHTML(slot2.profession)}</span>
              </div>
              <button type="button" class="dock-slot-remove" data-action="remove-compare" data-id="${slot2.id}" aria-label="Remove ${escapeHTML(slot2.name)}">
                ${icon('close', '', 14)}
              </button>
            ` : `
              <span class="dock-empty-hint">Slot 2: Select 2nd professional</span>
            `}
          </div>
        </div>

        <div class="dock-actions">
          <button type="button" class="button button--outline button--sm" data-action="clear-all-compare">Clear all</button>
          <a class="button button--dark button--sm ${count < 2 ? 'is-disabled' : ''}" href="/client/compare" data-compare-launch aria-disabled="${count < 2}">
            Compare ${count > 0 ? `(${count})` : ''} ${icon('arrow', '', 14)}
          </a>
        </div>
      </div>
    </div>
  `;
}

// Client Application Navigation Header (for authenticated /client/* routes)
export function clientAppHeader(activePath = '/client', clientState = {}) {
  const savedCount = (clientState.savedIds || []).length;
  const compareCount = (clientState.comparedIds || []).length;
  const activeMode = clientState.activeMode || 'active';

  return `
    <header class="client-app-header" data-client-app-header>
      <div class="client-header-inner">
        <div class="client-header-brand">
          <a href="/client" class="brand-link" aria-label="Vastoco Client Workspace">
            <span class="brand-wordmark">Vastoco</span>
          </a>
          <span class="workspace-pill">Client Workspace</span>
        </div>

        <!-- Desktop Navigation Links -->
        <nav class="client-nav-links" aria-label="Client Workspace Navigation">
          <a href="/client" class="client-nav-link ${activePath === '/client' ? 'is-active' : ''}">Discover</a>
          <a href="/client/briefs" class="client-nav-link ${activePath.startsWith('/client/briefs') || activePath === '/client/offers' ? 'is-active' : ''}">Briefs & Offers</a>
          <a href="/client/compare" class="client-nav-link ${activePath === '/client/compare' ? 'is-active' : ''}">
            Compare ${compareCount > 0 ? `<span class="nav-count-badge" data-nav-compare-badge>${compareCount}</span>` : ''}
          </a>
          <a href="/client/saved" class="client-nav-link ${activePath === '/client/saved' ? 'is-active' : ''}">
            Saved ${savedCount > 0 ? `<span class="nav-count-badge" data-nav-saved-badge>${savedCount}</span>` : ''}
          </a>
          <a href="/client/consultations" class="client-nav-link ${activePath === '/client/consultations' ? 'is-active' : ''}">Consultations</a>
          <a href="/client/activity" class="client-nav-link ${activePath === '/client/activity' ? 'is-active' : ''}">Activity</a>
          <a href="/client/profile" class="client-nav-link ${activePath === '/client/profile' ? 'is-active' : ''}">Profile</a>
        </nav>

        <!-- Right Side: Search, Mode Switcher Demo Helper & Post Brief -->
        <div class="client-header-controls">
          <div class="client-nav-search-wrap" data-nav-search-wrap>
            ${icon('search', 'nav-search-icon', 14)}
            <input type="search" class="client-nav-search-input" placeholder="Search... [⌘K]" aria-label="Search professionals" data-nav-search />
          </div>
          <a href="/client/briefs" class="button button--dark button--sm client-post-brief-btn" title="Post an architectural brief">
            + Post Brief
          </a>
          <div class="state-switcher-menu" title="Switch prototype client state">
            <label for="stateSwitcherSelect" class="sr-only">Client Mode:</label>
            <select id="stateSwitcherSelect" class="select-input select-input--compact select-input--mode" data-action="switch-client-mode">
              <option value="active" ${activeMode === 'active' ? 'selected' : ''}>Active Client</option>
              <option value="new" ${activeMode === 'new' ? 'selected' : ''}>New Client</option>
              <option value="returning" ${activeMode === 'returning' ? 'selected' : ''}>Returning Client</option>
            </select>
          </div>

          <a href="/clients" class="button button--outline button--sm client-public-switch" title="View Public Landing Page">
            Public View
          </a>
        </div>
      </div>
    </header>
  `;
}

// Client Mobile 5-Destination Bottom Navigation (Only visible on /client/* mobile viewports)
export function clientMobileBottomNav(activePath = '/client', clientState = {}) {
  const compareCount = (clientState.comparedIds || []).length;
  const briefsCount = (clientState.briefs || []).length;

  return `
    <nav class="client-bottom-nav" aria-label="Mobile Navigation">
      <a href="/client" class="bottom-nav-item ${activePath === '/client' ? 'is-active' : ''}" aria-label="Explore">
        ${icon('search', 'bottom-nav-icon', 20)}
        <span class="bottom-nav-label">Explore</span>
      </a>

      <a href="/client/briefs" class="bottom-nav-item ${activePath.startsWith('/client/briefs') || activePath === '/client/offers' ? 'is-active' : ''}" aria-label="Briefs">
        <span class="bottom-nav-icon-wrap">
          ${icon('briefcase', 'bottom-nav-icon', 20)}
          ${briefsCount > 0 ? `<span class="bottom-badge">${briefsCount}</span>` : ''}
        </span>
        <span class="bottom-nav-label">Briefs</span>
      </a>

      <a href="/client/compare" class="bottom-nav-item ${activePath === '/client/compare' ? 'is-active' : ''}" aria-label="Compare">
        <span class="bottom-nav-icon-wrap">
          ${icon('compare', 'bottom-nav-icon', 20)}
          ${compareCount > 0 ? `<span class="bottom-badge">${compareCount}</span>` : ''}
        </span>
        <span class="bottom-nav-label">Compare</span>
      </a>

      <a href="/client/consultations" class="bottom-nav-item ${activePath === '/client/consultations' ? 'is-active' : ''}" aria-label="Bookings">
        ${icon('calendar', 'bottom-nav-icon', 20)}
        <span class="bottom-nav-label">Bookings</span>
      </a>

      <a href="/client/profile" class="bottom-nav-item ${activePath === '/client/profile' ? 'is-active' : ''}" aria-label="Profile">
        ${icon('user', 'bottom-nav-icon', 20)}
        <span class="bottom-nav-label">Profile</span>
      </a>
    </nav>
  `;
}

// Unified Core Discovery Section (Shared by Public /clients and Authenticated /client)
export function unifiedDiscoverySection(options = {}) {
  const { isPublic = false, clientState = getClientState() } = options;
  const allPros = getAllProfessionalsWithStats();
  const cardsHtml = allPros.map((p) => professionalCardV2(p, clientState)).join('');

  return `
    <section class="discovery-section section-pad" data-discovery-section>
      <div class="container">
        <!-- Above-the-fold Discovery Stage -->
        <div class="discovery-header">
          <div class="discovery-kicker">
            <span class="eyebrow-dot"></span>
            <span>DELHI NCR · ARCHITECTURE · INTERIORS · VASTU</span>
          </div>

          <h1 class="discovery-title">Find the right professional for your project.</h1>
          <p class="discovery-subtitle">
            Connect with verified architectural minds across Delhi NCR. Compare real portfolios, review verified credentials, inspect transparent ratings, and book structured video consultations for 15, 30 or 45 minutes.
          </p>

          <!-- Full-Length Monolithic Architectural Search Bar -->
          <div class="discovery-search-bar" role="search" data-discovery-search-bar>
            <div class="discovery-search-main search-input-group">
              <span class="discovery-search-icon" aria-hidden="true">${icon('search', 'search-icon', 20)}</span>
              <input 
                type="search" 
                class="discovery-search-input search-input" 
                placeholder="Search by professional name, expertise, project type (e.g. villa, courtyard, Vastu), or locality..." 
                aria-label="Search professionals by name, expertise or locality"
                data-discovery-search 
              />
              <button type="button" class="discovery-search-clear search-clear-btn" data-action="clear-search" aria-label="Clear search query" hidden>
                ${icon('close', '', 16)}
              </button>
            </div>

            <div class="discovery-search-divider" aria-hidden="true"></div>

            <div class="discovery-search-locality search-locality-selector">
              <span class="locality-icon" aria-hidden="true">${icon('pin', '', 16)}</span>
              <label for="discoveryLocalitySelect" class="sr-only">Locality:</label>
              <select id="discoveryLocalitySelect" class="discovery-locality-select locality-select" data-filter-locality>
                ${LOCALITIES.map((loc) => `<option value="${loc}">${loc}</option>`).join('')}
              </select>
            </div>

            <button type="button" class="discovery-search-submit-btn button button--dark" data-action="submit-search" aria-label="Search professionals">
              ${icon('search', '', 15)}
              <span>Search</span>
            </button>
          </div>

          <!-- Professional Category Filter Chips -->
          <div class="discovery-categories-bar" aria-label="Professional Categories">
            <span class="cat-label">Categories:</span>
            <div class="cat-chips">
              <button type="button" class="cat-chip is-active" data-filter-category="all">All Professionals</button>
              <button type="button" class="cat-chip" data-filter-category="architect">
                ${icon('compass', '', 14)} Architects
              </button>
              <button type="button" class="cat-chip" data-filter-category="interior">
                ${icon('house', '', 14)} Interior Designers
              </button>
              <button type="button" class="cat-chip" data-filter-category="vastu">
                ${icon('layers', '', 14)} Vastu Consultants
              </button>
            </div>
          </div>

          <!-- Service Discovery Pills -->
          <div class="service-discovery-bar" aria-label="Specialization Services">
            <span class="service-label">Services:</span>
            <div class="service-pills">
              ${SERVICES.map((s, idx) => `
                <button type="button" class="service-pill ${idx === 0 ? 'is-active' : ''}" data-filter-service="${s}">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Discovery Main Area with Sidebar & Listings Grid -->
        <div class="discovery-layout">
          <!-- Desktop Filter Sidebar -->
          <aside class="discovery-filters-sidebar" data-filters-sidebar aria-label="Search Filters">
            <div class="filters-sidebar-head">
              <span class="filters-sidebar-title">${icon('search', '', 16)} Filter Results</span>
              <button type="button" class="filters-reset-btn" data-action="reset-filters">Reset all</button>
            </div>

            <!-- Locality Filter -->
            <div class="filter-group">
              <div class="filter-group-title">Locality</div>
              <div class="filter-radios">
                ${LOCALITIES.map((loc, i) => `
                  <label class="filter-radio-label">
                    <input type="radio" name="sidebar-locality" value="${loc}" ${i === 0 ? 'checked' : ''} data-filter-locality-radio />
                    <span class="radio-facade"></span>
                    <span>${loc}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Minimum Rating Filter -->
            <div class="filter-group">
              <div class="filter-group-title">Client Rating</div>
              <div class="filter-radios">
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-rating" value="all" checked data-filter-rating-radio />
                  <span class="radio-facade"></span>
                  <span>Any rating</span>
                </label>
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-rating" value="4.5" data-filter-rating-radio />
                  <span class="radio-facade"></span>
                  <span>4.5 ★ and above</span>
                </label>
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-rating" value="4.0" data-filter-rating-radio />
                  <span class="radio-facade"></span>
                  <span>4.0 ★ and above</span>
                </label>
              </div>

              <div class="filter-checkbox-wrap">
                <label class="filter-checkbox-label">
                  <input type="checkbox" checked data-filter-include-unrated />
                  <span class="checkbox-facade"></span>
                  <span>Include new professionals with no reviews</span>
                </label>
              </div>
            </div>

            <!-- Experience Filter -->
            <div class="filter-group">
              <div class="filter-group-title">Experience</div>
              <div class="filter-radios">
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-exp" value="all" checked data-filter-exp-radio />
                  <span class="radio-facade"></span>
                  <span>Any experience</span>
                </label>
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-exp" value="5" data-filter-exp-radio />
                  <span class="radio-facade"></span>
                  <span>5+ years</span>
                </label>
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-exp" value="8" data-filter-exp-radio />
                  <span class="radio-facade"></span>
                  <span>8+ years</span>
                </label>
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-exp" value="10" data-filter-exp-radio />
                  <span class="radio-facade"></span>
                  <span>10+ years</span>
                </label>
              </div>
            </div>

            <!-- Max Consultation Fee Filter -->
            <div class="filter-group">
              <div class="filter-group-title">Max 30m Fee</div>
              <div class="filter-radios">
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-fee" value="" checked data-filter-fee-radio />
                  <span class="radio-facade"></span>
                  <span>Any fee</span>
                </label>
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-fee" value="1300" data-filter-fee-radio />
                  <span class="radio-facade"></span>
                  <span>Up to ₹1,300</span>
                </label>
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-fee" value="1500" data-filter-fee-radio />
                  <span class="radio-facade"></span>
                  <span>Up to ₹1,500</span>
                </label>
                <label class="filter-radio-label">
                  <input type="radio" name="sidebar-fee" value="2000" data-filter-fee-radio />
                  <span class="radio-facade"></span>
                  <span>Up to ₹2,000</span>
                </label>
              </div>
            </div>

            <!-- Consultation Duration Filter -->
            <div class="filter-group">
              <div class="filter-group-title">Consultation Duration</div>
              <div class="filter-radios">
                ${DURATIONS.map((dur, i) => `
                  <label class="filter-radio-label">
                    <input type="radio" name="sidebar-duration" value="${dur.key}" ${i === 0 ? 'checked' : ''} data-filter-duration-radio />
                    <span class="radio-facade"></span>
                    <span>${dur.label}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Specialization Filter -->
            <div class="filter-group">
              <div class="filter-group-title">Specialization</div>
              <div class="filter-select-wrap">
                <select class="select-input select-input--compact select-input--block" data-filter-specialization-select aria-label="Filter by specialization">
                  ${SPECIALIZATIONS.map((spec) => `<option value="${spec}">${spec}</option>`).join('')}
                </select>
              </div>
            </div>
          </aside>

          <!-- Listings Area -->
          <main class="discovery-listings-area" data-listings-area>
            <!-- Listings Toolbar -->
            <div class="discovery-toolbar">
              <div class="toolbar-count">
                <span data-results-count>Showing ${allPros.length} verified professionals in Delhi NCR</span>
              </div>

              <div class="toolbar-actions">
                <!-- Mobile Filter Trigger -->
                <button type="button" class="button button--outline button--sm mobile-filter-trigger" data-action="open-mobile-filters">
                  ${icon('search', '', 14)} Filters <span class="filter-badge" data-filter-badge hidden>0</span>
                </button>

                <!-- Sorting Dropdown -->
                <div class="toolbar-sort">
                  <label for="discoverySortSelect">Sort by:</label>
                  <select id="discoverySortSelect" class="select-input select-input--compact" data-discovery-sort>
                    ${SORT_OPTIONS.map((opt) => `<option value="${opt.key}">${opt.label}</option>`).join('')}
                  </select>
                </div>
              </div>
            </div>

            <!-- Active Filter Chips -->
            <div class="active-filter-chips-row" data-active-chips-row hidden>
              <!-- Filled dynamically by JavaScript -->
            </div>

            <!-- Grid of Cards -->
            <div class="discovery-grid" data-discovery-grid>
              ${cardsHtml}
            </div>

            <!-- Empty Search / Filter State (Hidden by default) -->
            <div class="discovery-empty-state" data-empty-state hidden>
              <img src="/assets/empty-search.svg" alt="No professionals found matching criteria" width="220" height="140" />
              <h3>No professionals match your selected filters</h3>
              <p>We could not find any professionals matching all your active criteria. Try broadening your location, removing rating restrictions, or clearing search keywords.</p>
              <button type="button" class="button button--dark button--sm" data-action="reset-filters">
                Clear all filters
              </button>
            </div>
          </main>
        </div>
      </div>

      <!-- Mobile Filter Bottom Sheet Modal -->
      <div class="mobile-filter-sheet" data-mobile-filter-sheet hidden>
        <div class="mobile-filter-backdrop" data-action="close-mobile-filters"></div>
        <div class="mobile-filter-panel" role="dialog" aria-modal="true" aria-label="Filter Professionals">
          <div class="mobile-filter-header">
            <h3>Filters</h3>
            <button type="button" class="icon-button" data-action="close-mobile-filters" aria-label="Close filters">
              ${icon('close', '', 18)}
            </button>
          </div>
          <div class="mobile-filter-body" data-mobile-filter-body>
            <!-- Cloned or synced dynamically -->
          </div>
          <div class="mobile-filter-footer">
            <button type="button" class="button button--outline" data-action="reset-filters">Clear all</button>
            <button type="button" class="button button--dark" data-action="apply-mobile-filters">Apply filters</button>
          </div>
        </div>
      </div>

      <!-- Comparison Dock -->
      ${comparisonTrayDock(clientState)}
    </section>
  `;
}

// ==========================================
// CLIENT WORKSPACE PAGE (/client)
// ==========================================
export function clientWorkspacePage() {
  const state = getClientState();
  const mode = state.activeMode || 'active';
  const upcoming = (state.bookings || []).filter((b) => b.status === 'upcoming');
  const saved = (state.savedIds || []).map((id) => getProfessionalById(id)).filter(Boolean);
  const activities = (state.activities || []).slice(0, 4);

  let workspaceTopWidget = '';

  if (mode === 'new') {
    // New Client View: No bookings, no saved items yet
    workspaceTopWidget = `
      <section class="workspace-hero-banner workspace-hero-banner--new">
        <div class="container banner-inner">
          <div class="banner-copy">
            <span class="banner-kicker">${icon('spark', '', 14)} Getting Started on Vastoco</span>
            <h2>Welcome to your client workspace.</h2>
            <p>You have not booked any consultations or saved any professionals yet. Start by searching below for verified architects, interior designers, or Vastu consultants across Delhi NCR.</p>
          </div>
          <div class="banner-quick-actions">
            <a href="#discovery" class="button button--dark">Start discovering</a>
          </div>
        </div>
      </section>
    `;
  } else {
    // Active or Returning Client View: Shows upcoming consultation + saved professionals
    const nextBooking = upcoming[0];
    const pro = nextBooking ? getProfessionalById(nextBooking.professionalId) : null;

    workspaceTopWidget = `
      <section class="workspace-hero-banner">
        <div class="container banner-inner">
          <div class="banner-greeting">
            <div class="greeting-avatar" aria-hidden="true">PS</div>
            <div class="greeting-copy">
              <span class="banner-kicker">${icon('spark', '', 14)} Client Workspace · Delhi NCR</span>
              <h2>Welcome back, Priya</h2>
              <p>Manage your upcoming design consultations, review saved portfolios, and explore new architectural talent.</p>
            </div>
          </div>

          <!-- Upcoming Consultation Card -->
          ${nextBooking && pro ? `
            <div class="upcoming-consultation-card" data-upcoming-card>
              <div class="upcoming-head">
                <span class="upcoming-badge">${icon('video', '', 14)} Next Video Consultation</span>
                <span class="upcoming-ref">Ref: ${escapeHTML(nextBooking.bookingReference)}</span>
              </div>
              <div class="upcoming-body">
                <img src="${pro.image}" alt="${escapeHTML(pro.name)}" class="upcoming-pro-img" />
                <div class="upcoming-meta">
                  <h3>${escapeHTML(pro.name)}</h3>
                  <div class="upcoming-pro-title">${escapeHTML(pro.profession)} · ${escapeHTML(pro.location)}</div>
                  <div class="upcoming-time-pill">
                    ${icon('calendar', '', 14)} <strong>${escapeHTML(nextBooking.date)}</strong> at <strong>${escapeHTML(nextBooking.time)}</strong> (${nextBooking.duration} mins)
                  </div>
                </div>
              </div>
              <div class="upcoming-actions">
                <button type="button" class="button button--dark button--sm" data-action="join-demo-call">
                  ${icon('video', '', 14)} Join call (demo simulation)
                </button>
                <a href="/client/consultations" class="button button--outline button--sm">View details</a>
              </div>
            </div>
          ` : `
            <div class="no-upcoming-card">
              <span>No upcoming consultations scheduled.</span>
              <a href="#discovery" class="link-inline">Find a professional to book →</a>
            </div>
          `}
        </div>
      </section>

      <!-- Saved Professionals Shelf -->
      ${saved.length > 0 ? `
        <section class="workspace-shelf">
          <div class="container">
            <div class="shelf-header">
              <h3>Recently saved professionals (${saved.length})</h3>
              <a href="/client/saved" class="shelf-all-link">View all saved →</a>
            </div>
            <div class="shelf-cards-grid">
              ${saved.slice(0, 3).map((p) => professionalCardV2(p, state)).join('')}
            </div>
          </div>
        </section>
      ` : ''}

      <!-- Recent Activity Feed -->
      ${activities.length > 0 ? `
        <section class="workspace-shelf workspace-shelf--activity">
          <div class="container">
            <div class="shelf-header">
              <h3>Recent activity</h3>
              <a href="/client/activity" class="shelf-all-link">View full activity log →</a>
            </div>
            <div class="workspace-activity-mini-feed">
              ${activities.map((act) => `
                <div class="activity-mini-row">
                  <div class="activity-mini-icon">${icon(act.type === 'saved' ? 'bookmark' : act.type === 'compared' ? 'compare' : 'calendar', '', 14)}</div>
                  <div class="activity-mini-content">
                    <strong>${escapeHTML(act.title)}</strong> — <span>${escapeHTML(act.description)}</span>
                    <small class="activity-mini-time">${escapeHTML(act.timestamp)}</small>
                  </div>
                  <a href="${act.link}" class="activity-mini-link">${icon('arrow', '', 14)}</a>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      ` : ''}
    `;
  }

  return `
    <div class="client-workspace-app" data-workspace-app>
      ${clientAppHeader('/client', state)}
      ${workspaceTopWidget}
      <div id="discovery">
        ${unifiedDiscoverySection({ isPublic: false, clientState: state })}
      </div>
      ${clientMobileBottomNav('/client', state)}
    </div>
  `;
}

// ==========================================
// DEDICATED COMPARISON SCREEN (/client/compare)
// ==========================================
export function clientComparePage() {
  const state = getClientState();
  const comparedIds = state.comparedIds || [];
  const p1 = comparedIds[0] ? getProfessionalById(comparedIds[0]) : null;
  const p2 = comparedIds[1] ? getProfessionalById(comparedIds[1]) : null;

  let comparisonContent = '';

  if (!p1 && !p2) {
    comparisonContent = `
      <div class="compare-empty-container">
        <img src="/assets/comparison-empty.svg" alt="No professionals selected for comparison" width="280" height="180" />
        <h2>No professionals selected for comparison</h2>
        <p>You can select up to two architects, interior designers, or Vastu consultants to evaluate their portfolios, credentials, consultation fees, and client ratings side by side.</p>
        <a href="/client" class="button button--dark">Explore professionals to compare</a>
      </div>
    `;
  } else {
    comparisonContent = `
      <div class="compare-header-row">
        <div>
          <span class="eyebrow">${icon('compare', '', 14)} Side-by-Side Comparison</span>
          <h1>Compare credentials and rates.</h1>
          <p class="compare-subtitle">Evaluate experience, verification status, and upfront consultation rates before booking.</p>
        </div>
        <div class="compare-global-actions">
          <button type="button" class="button button--outline button--sm" data-action="clear-all-compare">Clear comparison</button>
          <a href="/client" class="button button--secondary button--sm">Add another professional</a>
        </div>
      </div>

      <!-- Comparison Matrix (Desktop: 2 columns; Mobile: Paired attribute stack) -->
      <div class="compare-matrix-wrapper">
        <div class="compare-matrix-grid">
          <!-- Column 1 -->
          <div class="compare-col ${p1 ? 'is-filled' : 'is-empty'}">
            ${p1 ? renderCompareCol(p1) : `
              <div class="compare-col-placeholder">
                <p>Slot 1 is empty</p>
                <a href="/client" class="button button--outline button--sm">Select a professional</a>
              </div>
            `}
          </div>

          <!-- Column 2 -->
          <div class="compare-col ${p2 ? 'is-filled' : 'is-empty'}">
            ${p2 ? renderCompareCol(p2) : `
              <div class="compare-col-placeholder">
                <p>Slot 2 is empty</p>
                <a href="/client" class="button button--outline button--sm">Select 2nd professional</a>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="client-compare-screen" data-compare-screen>
      ${clientAppHeader('/client/compare', state)}
      <main class="container section-pad">
        ${comparisonContent}
      </main>
      ${clientMobileBottomNav('/client/compare', state)}
    </div>
  `;
}

function renderCompareCol(p) {
  return `
    <div class="compare-card">
      <div class="compare-card-top">
        <img src="${p.image}" alt="${escapeHTML(p.name)}" class="compare-hero-img" />
        <button type="button" class="compare-remove-btn" data-action="remove-compare" data-id="${p.id}" aria-label="Remove ${escapeHTML(p.name)} from comparison">
          ${icon('close', '', 16)}
        </button>
        <span class="compare-badge">${escapeHTML(p.verificationLabel || 'Verified Practice')}</span>
      </div>

      <div class="compare-card-head">
        <h2>${escapeHTML(p.name)}</h2>
        <div class="compare-pro-meta">${escapeHTML(p.profession)} · ${escapeHTML(p.location)}</div>
      </div>

      <div class="compare-attributes-list">
        <!-- Attribute: Rating -->
        <div class="compare-attr-group">
          <span class="attr-label">Overall Client Rating</span>
          <div class="attr-value">
            ${p.stats && p.stats.hasReviews ? `
              <div class="attr-rating-row">
                <span class="attr-rating-score">${p.stats.averageFormatted} ★</span>
                <span class="attr-rating-sub">(${p.stats.reviewCount} published reviews)</span>
              </div>
            ` : `
              <span class="badge-new">New to Vastoco (No reviews yet)</span>
            `}
          </div>
        </div>

        <!-- Attribute: Experience -->
        <div class="compare-attr-group">
          <span class="attr-label">Experience</span>
          <div class="attr-value"><strong>${p.experienceYears} years</strong> in professional practice</div>
        </div>

        <!-- Attribute: Verification -->
        <div class="compare-attr-group">
          <span class="attr-label">Credential Verification</span>
          <div class="attr-value">
            <span class="attr-verified-tag">${icon('check', '', 12)} ${escapeHTML(p.coaRegistration || p.verificationLabel)}</span>
          </div>
        </div>

        <!-- Attribute: Specializations -->
        <div class="compare-attr-group">
          <span class="attr-label">Specializations</span>
          <div class="attr-value">
            <div class="tag-chips-wrap">
              ${(p.specializations || []).map((s) => `<span class="tag-chip">${escapeHTML(s)}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Attribute: Consultation Rates -->
        <div class="compare-attr-group">
          <span class="attr-label">Consultation Fees (Upfront)</span>
          <div class="attr-value">
            <div class="rate-breakdown-row">
              <span class="rate-item"><strong>15m:</strong> ₹${p.consultationFees[15].toLocaleString('en-IN')}</span>
              <span class="rate-item rate-item--highlight"><strong>30m:</strong> ₹${p.consultationFees[30].toLocaleString('en-IN')}</span>
              <span class="rate-item"><strong>45m:</strong> ₹${p.consultationFees[45].toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <!-- Attribute: Portfolio Samples -->
        <div class="compare-attr-group">
          <span class="attr-label">Recent Project Portfolio</span>
          <div class="attr-value">
            <div class="compare-portfolio-grid">
              ${(p.portfolio || []).map((item) => `
                <div class="compare-thumb-wrap">
                  <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy" />
                  <span class="compare-thumb-title">${escapeHTML(item.title)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="compare-card-cta">
        <a href="/client/book/${p.id}" class="button button--dark button--block">
          Book consultation ${icon('arrow', '', 14)}
        </a>
        <a href="/client/professionals/${p.id}" class="button button--outline button--block">
          View full profile
        </a>
      </div>
    </div>
  `;
}

// ==========================================
// SAVED PROFESSIONALS SCREEN (/client/saved)
// ==========================================
export function clientSavedPage() {
  const state = getClientState();
  const savedIds = state.savedIds || [];
  const savedPros = savedIds.map((id) => getProfessionalById(id)).filter(Boolean);

  return `
    <div class="client-saved-screen" data-saved-screen>
      ${clientAppHeader('/client/saved', state)}
      <main class="container section-pad">
        <div class="page-heading-block">
          <span class="eyebrow">${icon('bookmark', '', 14)} Saved Professionals</span>
          <h1>Your Shortlisted Experts</h1>
          <p>Review the architects, interior designers, and Vastu consultants you've bookmarked for your project.</p>
        </div>

        ${savedPros.length > 0 ? `
          <div class="discovery-grid">
            ${savedPros.map((p) => professionalCardV2(p, state)).join('')}
          </div>
        ` : `
          <div class="saved-empty-state">
            <img src="/assets/portfolio-empty.svg" alt="No saved professionals" width="220" height="140" />
            <h3>No professionals bookmarked yet</h3>
            <p>When you discover architects or designers you like, click the bookmark icon to save them to your private shortlist.</p>
            <a href="/client" class="button button--dark button--sm">Discover professionals</a>
          </div>
        `}
      </main>
      ${clientMobileBottomNav('/client/saved', state)}
    </div>
  `;
}

// ==========================================
// MY CONSULTATIONS SCREEN (/client/consultations)
// ==========================================
export function clientConsultationsPage() {
  const state = getClientState();
  const bookings = state.bookings || [];

  return `
    <div class="client-consultations-screen" data-consultations-screen>
      ${clientAppHeader('/client/consultations', state)}
      <main class="container section-pad">
        <div class="page-heading-block">
          <span class="eyebrow">${icon('calendar', '', 14)} Consultations Hub</span>
          <h1>My Video Consultations</h1>
          <p>Track your scheduled, completed, and cancelled consultation calls. All bookings are backed by Vastoco 100% escrow protection.</p>
        </div>

        <div class="consultation-tabs-nav" role="tablist">
          <button type="button" class="tab-button is-active" data-tab="upcoming" role="tab" aria-selected="true">
            Upcoming (${bookings.filter((b) => b.status === 'upcoming').length})
          </button>
          <button type="button" class="tab-button" data-tab="completed" role="tab" aria-selected="false">
            Completed (${bookings.filter((b) => b.status === 'completed').length})
          </button>
          <button type="button" class="tab-button" data-tab="cancelled" role="tab" aria-selected="false">
            Cancelled (${bookings.filter((b) => b.status === 'cancelled').length})
          </button>
        </div>

        <!-- Tab Panels -->
        <div class="tab-panels-wrap">
          <!-- Upcoming Tab -->
          <div class="tab-panel is-active" data-panel="upcoming" role="tabpanel">
            ${renderBookingsList(bookings.filter((b) => b.status === 'upcoming'))}
          </div>

          <!-- Completed Tab -->
          <div class="tab-panel" data-panel="completed" role="tabpanel" hidden>
            ${renderBookingsList(bookings.filter((b) => b.status === 'completed'))}
          </div>

          <!-- Cancelled Tab -->
          <div class="tab-panel" data-panel="cancelled" role="tabpanel" hidden>
            ${renderBookingsList(bookings.filter((b) => b.status === 'cancelled'))}
          </div>
        </div>
      </main>
      ${clientMobileBottomNav('/client/consultations', state)}
    </div>
  `;
}

function renderBookingsList(list) {
  if (list.length === 0) {
    return `
      <div class="consultations-empty">
        <p>No consultations found in this category.</p>
      </div>
    `;
  }

  return `
    <div class="consultations-list-cards">
      ${list.map((b) => {
        const p = getProfessionalById(b.professionalId);
        if (!p) return '';
        return `
          <article class="booking-item-card">
            <div class="booking-item-head">
              <div class="booking-ref-badge">Ref: ${escapeHTML(b.bookingReference)}</div>
              <span class="booking-status-tag booking-status-tag--${b.status}">
                ${b.status === 'upcoming' ? 'Confirmed & Escrow Held' : b.status === 'completed' ? 'Completed' : 'Cancelled & Refunded'}
              </span>
            </div>

            <div class="booking-item-body">
              <img src="${p.image}" alt="${escapeHTML(p.name)}" class="booking-pro-img" />
              <div class="booking-item-meta">
                <h3>${escapeHTML(p.name)}</h3>
                <div class="booking-pro-role">${escapeHTML(p.profession)} · ${escapeHTML(p.location)}</div>
                <div class="booking-time-info">
                  ${icon('calendar', '', 14)} <strong>${escapeHTML(b.date)}</strong> at <strong>${escapeHTML(b.time)}</strong> (${b.duration} mins)
                </div>
                <div class="booking-scope-snippet">
                  <strong>Project Scope:</strong> ${escapeHTML(b.scope)}
                </div>
              </div>

              <div class="booking-financials">
                <div class="fin-total">₹${b.fee.toLocaleString('en-IN')}</div>
                <div class="fin-breakdown">
                  <small>Pro share (85%): ₹${b.professionalFee.toLocaleString('en-IN')}</small>
                  <small>Platform fee: ₹${b.platformCommission.toLocaleString('en-IN')}</small>
                  <small class="escrow-note">${icon('shield', '', 11)} 100% Escrow Protected</small>
                </div>
              </div>
            </div>

            <div class="booking-item-foot">
              ${b.status === 'upcoming' ? `
                <button type="button" class="button button--dark button--sm" data-action="join-demo-call">
                  ${icon('video', '', 14)} Launch video room (simulation)
                </button>
                <button type="button" class="button button--outline button--sm" data-action="cancel-consultation" data-id="${b.id}">
                  Cancel booking
                </button>
              ` : b.status === 'completed' ? `
                <a href="/client/professionals/${p.id}#reviews" class="button button--outline button--sm">
                  ${icon('star', '', 14)} Write / View review
                </a>
                <a href="/client/book/${p.id}" class="button button--dark button--sm">
                  Book follow-up
                </a>
              ` : `
                <span class="cancelled-note">Full fee refunded via simulated escrow.</span>
              `}
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

// ==========================================
// CLIENT ACTIVITY SCREEN (/client/activity)
// ==========================================
export function clientActivityPage() {
  const state = getClientState();
  const activities = state.activities || [];

  return `
    <div class="client-activity-screen" data-activity-screen>
      ${clientAppHeader('/client/activity', state)}
      <main class="container section-pad">
        <div class="page-heading-block">
          <span class="eyebrow">${icon('spark', '', 14)} Activity Timeline</span>
          <h1>Recent Client Actions</h1>
          <p>Chronological audit trail of your shortlist updates, comparisons, consultation bookings, and review submissions.</p>
        </div>

        <div class="activity-timeline-feed">
          ${activities.map((act) => `
            <div class="activity-item-card">
              <div class="activity-icon-bubble">
                ${icon(act.type === 'saved' ? 'bookmark' : act.type === 'compared' ? 'compare' : act.type === 'booking_confirmed' ? 'calendar' : 'check', '', 16)}
              </div>
              <div class="activity-meta-block">
                <div class="activity-title-row">
                  <strong>${escapeHTML(act.title)}</strong>
                  <span class="activity-timestamp">${escapeHTML(act.timestamp)}</span>
                </div>
                <p class="activity-desc">${escapeHTML(act.description)}</p>
                <a href="${act.link}" class="activity-link-btn">View related section ${icon('arrow', '', 12)}</a>
              </div>
            </div>
          `).join('')}
        </div>
      </main>
      ${clientMobileBottomNav('/client/activity', state)}
    </div>
  `;
}

// ==========================================
// CLIENT PROFILE SCREEN (/client/profile)
// ==========================================
export function clientAccountPage() {
  const state = getClientState();
  const profile = getClientProfile();
  const mode = state.activeMode || 'active';

  const categoryLabels = {
    architect: 'Architects',
    interior: 'Interior Designers',
    vastu: 'Vastu Consultants'
  };

  const selectedCategoriesHtml = (profile.preferredCategories || []).map((cat) => `
    <span class="tag-chip">${categoryLabels[cat] || cat}</span>
  `).join('');

  const selectedServicesHtml = (profile.serviceInterests || []).map((srv) => `
    <span class="tag-chip">${escapeHTML(srv)}</span>
  `).join('');

  return `
    <div class="client-profile-screen" data-profile-screen>
      ${clientAppHeader('/client/profile', state)}

      <main class="container section-pad">
        <!-- Toast feedback for profile save -->
        <div class="profile-toast" data-profile-toast hidden role="status" aria-live="polite">
          <span class="toast-icon">${icon('check', '', 16)}</span>
          <span class="toast-message" data-toast-msg>Profile preferences updated successfully.</span>
        </div>

        <!-- VIEW MODE CONTAINER -->
        <div class="profile-view-container" data-profile-view-mode>
          <div class="profile-masthead">
            <div class="profile-avatar-wrap">
              <div class="profile-avatar-initials">${escapeHTML(profile.avatarInitials || 'PS')}</div>
            </div>
            <div class="profile-identity">
              <div class="profile-name-row">
                <h1 class="profile-display-name">${escapeHTML(profile.fullName || 'Priya Sharma')}</h1>
                <div class="profile-status-pills">
                  <span class="verif-tag-pill" title="Email address verified via OTP">${icon('check', '', 12)} Email verified</span>
                  <span class="verif-tag-pill" title="Phone number verified via OTP">${icon('check', '', 12)} Phone verified</span>
                </div>
              </div>
              <div class="profile-role-subline">
                <span>${escapeHTML(profile.accountRole || 'Homeowner / Client')}</span>
                <span class="dot-separator">·</span>
                <span>${escapeHTML(profile.locality || 'Vasant Vihar')}, ${escapeHTML(profile.city || 'New Delhi')}</span>
                <span class="dot-separator">·</span>
                <span>Member since ${escapeHTML(profile.accountCreated || 'Oct 2026')}</span>
              </div>
            </div>
            <div class="profile-masthead-action">
              <button type="button" class="button button--dark button--sm" data-action="start-edit-profile">
                ${icon('edit', '', 14)} Edit Profile
              </button>
            </div>
          </div>

          <div class="client-settings-grid">
            <!-- A. Personal & Contact Details -->
            <div class="settings-card">
              <div class="settings-card-header">
                <h3>Personal & Contact Details</h3>
                <span class="privacy-note-badge">${icon('shield', '', 12)} Private</span>
              </div>
              <p class="settings-card-desc">Your contact information is strictly private. It is only shared with verified professionals after you book and confirm a video consultation.</p>
              
              <div class="settings-row">
                <span class="row-label">Full Name:</span>
                <strong class="row-val">${escapeHTML(profile.fullName || 'Priya Sharma')}</strong>
              </div>
              <div class="settings-row">
                <span class="row-label">Email Address:</span>
                <span class="row-val">${escapeHTML(profile.email || 'priya.sharma@example.com')} <span class="badge-inline">Verified</span></span>
              </div>
              <div class="settings-row">
                <span class="row-label">Phone Number:</span>
                <span class="row-val">${escapeHTML(profile.phone || '+91 98112 34567')} <span class="badge-inline">Verified</span></span>
              </div>
            </div>

            <!-- B. Location Details -->
            <div class="settings-card">
              <div class="settings-card-header">
                <h3>Project Location</h3>
                <span class="privacy-note-badge privacy-note-badge--shared">${icon('pin', '', 12)} Shared for matching</span>
              </div>
              <p class="settings-card-desc">Helps Vastoco surface professionals with local municipal bylaw knowledge, on-ground site experience, and nearby availability.</p>
              
              <div class="settings-row">
                <span class="row-label">City:</span>
                <strong class="row-val">${escapeHTML(profile.city || 'New Delhi')}</strong>
              </div>
              <div class="settings-row">
                <span class="row-label">Locality / Sector:</span>
                <span class="row-val">${escapeHTML(profile.locality || 'Vasant Vihar')}</span>
              </div>
            </div>

            <!-- C. Project Preferences -->
            <div class="settings-card">
              <div class="settings-card-header">
                <h3>Project Preferences</h3>
                <span class="privacy-note-badge privacy-note-badge--shared">${icon('layers', '', 12)} Shared for matching</span>
              </div>
              <p class="settings-card-desc">Your default project scope used to pre-fill consultation inquiries and calibrate professional recommendations.</p>
              
              <div class="settings-row">
                <span class="row-label">Categories:</span>
                <div class="row-val-chips">${selectedCategoriesHtml || '<em>None selected</em>'}</div>
              </div>
              <div class="settings-row">
                <span class="row-label">Services:</span>
                <div class="row-val-chips">${selectedServicesHtml || '<em>None selected</em>'}</div>
              </div>
              <div class="settings-row">
                <span class="row-label">Project Type:</span>
                <span class="row-val">${escapeHTML(profile.projectType || 'Residential Villa Renovation')}</span>
              </div>
              <div class="settings-row">
                <span class="row-label">Approximate Budget:</span>
                <span class="row-val">${escapeHTML(profile.approxBudget || '₹35L – ₹75L')}</span>
              </div>
              <div class="settings-row">
                <span class="row-label">Expected Timeline:</span>
                <span class="row-val">${escapeHTML(profile.expectedTimeline || '1–3 months')}</span>
              </div>
            </div>

            <!-- D. Communication Preferences -->
            <div class="settings-card">
              <div class="settings-card-header">
                <h3>Notification Preferences</h3>
                <span class="privacy-note-badge">${icon('bell', '', 12)} Account Alert</span>
              </div>
              
              <div class="settings-row">
                <span class="row-label">Booking Confirmations:</span>
                <span class="row-val">${profile.notifyEmailBooking ? 'Enabled (Instant Email)' : 'Disabled'}</span>
              </div>
              <div class="settings-row">
                <span class="row-label">Consultation Reminders:</span>
                <span class="row-val">${profile.notifyEmailReminders ? 'Enabled (24h & 1h prior)' : 'Disabled'}</span>
              </div>
              <div class="settings-row">
                <span class="row-label">WhatsApp / SMS Updates:</span>
                <span class="row-val">${profile.notifySmsWhatsapp ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div class="settings-row">
                <span class="row-label">Product Announcements:</span>
                <span class="row-val">${profile.notifyProductUpdates ? 'Subscribed' : 'Opted out'}</span>
              </div>
            </div>

            <!-- E. Account & Privacy -->
            <div class="settings-card">
              <div class="settings-card-header">
                <h3>Account & Security</h3>
                <span class="privacy-note-badge">${icon('lock', '', 12)} Security</span>
              </div>
              <div class="settings-row">
                <span class="row-label">Sign-in Method:</span>
                <span class="row-val">${escapeHTML(profile.authMethod || 'Email OTP (Passwordless)')}</span>
              </div>
              <div class="settings-row">
                <span class="row-label">Contact Privacy:</span>
                <span class="row-val">${profile.shareContactOnlyConfirmed ? 'Strictly confirmed bookings only' : 'Open discovery'}</span>
              </div>
              <div class="account-actions-row">
                <button type="button" class="button button--outline button--sm" data-action="client-sign-out">
                  Sign out of demo account
                </button>
              </div>
            </div>

            <!-- F. Prototype Evaluation Mode Switcher -->
            <div class="settings-card">
              <h3>Evaluation Mode Switcher</h3>
              <p>Toggle between different simulated client states to review empty states, active consultations, or returning customer history:</p>
              <div class="mode-toggles-group">
                <button type="button" class="button ${mode === 'active' ? 'button--dark' : 'button--outline'} button--sm" data-action="switch-client-mode-btn" data-mode="active">
                  Active Client
                </button>
                <button type="button" class="button ${mode === 'new' ? 'button--dark' : 'button--outline'} button--sm" data-action="switch-client-mode-btn" data-mode="new">
                  New Client (Empty State)
                </button>
                <button type="button" class="button ${mode === 'returning' ? 'button--dark' : 'button--outline'} button--sm" data-action="switch-client-mode-btn" data-mode="returning">
                  Returning Client
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- EDIT MODE CONTAINER (Hidden initially) -->
        <div class="profile-edit-container" data-profile-edit-mode hidden>
          <div class="edit-masthead">
            <div>
              <span class="eyebrow">${icon('edit', '', 12)} Account Settings</span>
              <h2>Edit Client Profile</h2>
              <p>Update your personal details, project scope, and consultation preferences. Edits persist locally in your browser session.</p>
            </div>
          </div>

          <form id="clientProfileForm" class="profile-edit-form" novalidate>
            <!-- Form Error Summary Box -->
            <div class="form-error-summary" data-profile-errors hidden role="alert">
              <strong>Please correct the following fields before saving:</strong>
              <ul class="error-list" data-error-list></ul>
            </div>

            <!-- Fieldset 1: Personal & Contact -->
            <fieldset class="form-fieldset">
              <legend>1. Personal & Contact Information</legend>
              <div class="form-row form-row--2col">
                <div class="form-field-group">
                  <label for="profFullName">Full Name <span class="req">*</span></label>
                  <input type="text" id="profFullName" name="fullName" class="text-input" value="${escapeHTML(profile.fullName || '')}" required />
                  <span class="field-error-msg" data-field-error="fullName" hidden></span>
                </div>

                <div class="form-field-group">
                  <label for="profEmail">Email Address <span class="req">*</span></label>
                  <input type="email" id="profEmail" name="email" class="text-input" value="${escapeHTML(profile.email || '')}" required />
                  <span class="field-hint">Used for video call links and booking confirmations.</span>
                  <span class="field-error-msg" data-field-error="email" hidden></span>
                </div>
              </div>

              <div class="form-row form-row--2col">
                <div class="form-field-group">
                  <label for="profPhone">Phone Number <span class="req">*</span></label>
                  <input type="tel" id="profPhone" name="phone" class="text-input" value="${escapeHTML(profile.phone || '')}" required />
                  <span class="field-hint">Indian format (e.g. +91 98112 34567).</span>
                  <span class="field-error-msg" data-field-error="phone" hidden></span>
                </div>

                <div class="form-field-group">
                  <label for="profRole">Account Role</label>
                  <input type="text" id="profRole" name="accountRole" class="text-input text-input--readonly" value="${escapeHTML(profile.accountRole || 'Homeowner / Client')}" readonly />
                  <span class="field-hint">Public monograph roles are managed separately in professional workspaces.</span>
                </div>
              </div>
            </fieldset>

            <!-- Fieldset 2: Project Location -->
            <fieldset class="form-fieldset">
              <legend>2. Project Location</legend>
              <div class="form-row form-row--2col">
                <div class="form-field-group">
                  <label for="profCity">City <span class="req">*</span></label>
                  <select id="profCity" name="city" class="select-input">
                    <option value="New Delhi" ${profile.city === 'New Delhi' ? 'selected' : ''}>New Delhi</option>
                    <option value="Gurgaon" ${profile.city === 'Gurgaon' ? 'selected' : ''}>Gurgaon</option>
                    <option value="Noida" ${profile.city === 'Noida' ? 'selected' : ''}>Noida</option>
                    <option value="Faridabad" ${profile.city === 'Faridabad' ? 'selected' : ''}>Faridabad</option>
                    <option value="Ghaziabad" ${profile.city === 'Ghaziabad' ? 'selected' : ''}>Ghaziabad</option>
                  </select>
                  <span class="field-error-msg" data-field-error="city" hidden></span>
                </div>

                <div class="form-field-group">
                  <label for="profLocality">Locality / Sector</label>
                  <input type="text" id="profLocality" name="locality" class="text-input" value="${escapeHTML(profile.locality || '')}" placeholder="e.g. Vasant Vihar, Hauz Khas, Golf Course Rd" />
                </div>
              </div>
            </fieldset>

            <!-- Fieldset 3: Project Scope & Preferences -->
            <fieldset class="form-fieldset">
              <legend>3. Project Scope & Preferences</legend>
              
              <div class="form-field-group">
                <label>Preferred Professional Categories</label>
                <div class="checkboxes-pill-grid">
                  <label class="checkbox-pill-label">
                    <input type="checkbox" name="preferredCategories" value="architect" ${(profile.preferredCategories || []).includes('architect') ? 'checked' : ''} />
                    <span class="pill-box-facade"></span>
                    <span>Architects</span>
                  </label>
                  <label class="checkbox-pill-label">
                    <input type="checkbox" name="preferredCategories" value="interior" ${(profile.preferredCategories || []).includes('interior') ? 'checked' : ''} />
                    <span class="pill-box-facade"></span>
                    <span>Interior Designers</span>
                  </label>
                  <label class="checkbox-pill-label">
                    <input type="checkbox" name="preferredCategories" value="vastu" ${(profile.preferredCategories || []).includes('vastu') ? 'checked' : ''} />
                    <span class="pill-box-facade"></span>
                    <span>Vastu Consultants</span>
                  </label>
                </div>
              </div>

              <div class="form-field-group">
                <label>Service Interests</label>
                <div class="checkboxes-pill-grid">
                  ${SERVICES.filter((s) => s !== 'All services').map((srv) => `
                    <label class="checkbox-pill-label">
                      <input type="checkbox" name="serviceInterests" value="${srv}" ${(profile.serviceInterests || []).includes(srv) ? 'checked' : ''} />
                      <span class="pill-box-facade"></span>
                      <span>${srv}</span>
                    </label>
                  `).join('')}
                </div>
              </div>

              <div class="form-row form-row--3col">
                <div class="form-field-group">
                  <label for="profProjectType">Project Type</label>
                  <select id="profProjectType" name="projectType" class="select-input">
                    <option value="Residential Villa Renovation & Courtyard Light Well" ${profile.projectType?.includes('Villa') ? 'selected' : ''}>Residential Villa Renovation</option>
                    <option value="Complete Apartment Interior Fitout" ${profile.projectType?.includes('Apartment') ? 'selected' : ''}>Complete Apartment Interior Fitout</option>
                    <option value="New Ground-up Villa Construction" ${profile.projectType?.includes('Ground-up') ? 'selected' : ''}>New Ground-up Villa Construction</option>
                    <option value="Terrace Extension & Space Planning" ${profile.projectType?.includes('Terrace') ? 'selected' : ''}>Terrace Extension & Space Planning</option>
                    <option value="Vastu Audit & Spatial Remediation" ${profile.projectType?.includes('Vastu') ? 'selected' : ''}>Vastu Audit & Spatial Remediation</option>
                  </select>
                </div>

                <div class="form-field-group">
                  <label for="profBudget">Approximate Budget</label>
                  <select id="profBudget" name="approxBudget" class="select-input">
                    <option value="Under ₹15L" ${profile.approxBudget === 'Under ₹15L' ? 'selected' : ''}>Under ₹15L</option>
                    <option value="₹15L – ₹35L" ${profile.approxBudget === '₹15L – ₹35L' ? 'selected' : ''}>₹15L – ₹35L</option>
                    <option value="₹35L – ₹75L" ${profile.approxBudget === '₹35L – ₹75L' ? 'selected' : ''}>₹35L – ₹75L</option>
                    <option value="₹75L – ₹1.5Cr" ${profile.approxBudget === '₹75L – ₹1.5Cr' ? 'selected' : ''}>₹75L – ₹1.5Cr</option>
                    <option value="Above ₹1.5Cr" ${profile.approxBudget === 'Above ₹1.5Cr' ? 'selected' : ''}>Above ₹1.5Cr</option>
                  </select>
                </div>

                <div class="form-field-group">
                  <label for="profTimeline">Expected Timeline</label>
                  <select id="profTimeline" name="expectedTimeline" class="select-input">
                    <option value="Immediate (within 2 weeks)" ${profile.expectedTimeline?.includes('Immediate') ? 'selected' : ''}>Immediate (within 2 weeks)</option>
                    <option value="1–3 months" ${profile.expectedTimeline === '1–3 months' ? 'selected' : ''}>1–3 months</option>
                    <option value="3–6 months" ${profile.expectedTimeline === '3–6 months' ? 'selected' : ''}>3–6 months</option>
                    <option value="Planning stage (6+ months)" ${profile.expectedTimeline?.includes('Planning') ? 'selected' : ''}>Planning stage (6+ months)</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <!-- Fieldset 4: Communication Preferences -->
            <fieldset class="form-fieldset">
              <legend>4. Communication & Notification Toggles</legend>
              <div class="toggles-list">
                <label class="toggle-row-label">
                  <input type="checkbox" name="notifyEmailBooking" ${profile.notifyEmailBooking ? 'checked' : ''} />
                  <span class="toggle-switch-facade"></span>
                  <div class="toggle-text-wrap">
                    <strong>Booking Confirmation Emails</strong>
                    <small>Receive calendar invitations and video session links immediately upon booking.</small>
                  </div>
                </label>

                <label class="toggle-row-label">
                  <input type="checkbox" name="notifyEmailReminders" ${profile.notifyEmailReminders ? 'checked' : ''} />
                  <span class="toggle-switch-facade"></span>
                  <div class="toggle-text-wrap">
                    <strong>Consultation Reminders</strong>
                    <small>Send reminder alerts 24 hours and 1 hour before scheduled video sessions.</small>
                  </div>
                </label>

                <label class="toggle-row-label">
                  <input type="checkbox" name="notifySmsWhatsapp" ${profile.notifySmsWhatsapp ? 'checked' : ''} />
                  <span class="toggle-switch-facade"></span>
                  <div class="toggle-text-wrap">
                    <strong>WhatsApp & SMS Notifications</strong>
                    <small>Receive instant slot confirmations and join links on your verified mobile number.</small>
                  </div>
                </label>

                <label class="toggle-row-label">
                  <input type="checkbox" name="notifyProductUpdates" ${profile.notifyProductUpdates ? 'checked' : ''} />
                  <span class="toggle-switch-facade"></span>
                  <div class="toggle-text-wrap">
                    <strong>Product & Editorial Updates</strong>
                    <small>Quarterly Delhi NCR architecture and interior design showcases.</small>
                  </div>
                </label>
              </div>
            </fieldset>

            <!-- Form Actions -->
            <div class="form-actions-bar">
              <button type="submit" class="button button--dark" data-action="submit-profile-form">
                Save Changes
              </button>
              <button type="button" class="button button--outline" data-action="cancel-edit-profile">
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Unsaved Changes Discard Modal -->
        <div class="discard-modal" data-discard-modal hidden role="dialog" aria-modal="true" aria-labelledby="discardTitle">
          <div class="discard-modal-backdrop" data-action="keep-editing"></div>
          <div class="discard-modal-dialog">
            <h3 id="discardTitle">Discard unsaved changes?</h3>
            <p>You have made changes to your client account profile. If you cancel now, your unsaved edits will be lost.</p>
            <div class="discard-modal-actions">
              <button type="button" class="button button--outline button--sm" data-action="keep-editing">
                Keep editing
              </button>
              <button type="button" class="button button--dark button--sm" data-action="confirm-discard">
                Discard changes
              </button>
            </div>
          </div>
        </div>
      </main>

      ${clientMobileBottomNav('/client/profile', state)}
    </div>
  `;
}

// ==========================================
// DECISION-FOCUSED PROFESSIONAL PROFILE (/client/professionals/:id)
// ==========================================
export function clientProfileDetailPage(proId = 'naina-kapoor') {
  const p = getProfessionalById(proId) || getProfessionalById('naina-kapoor');
  const state = getClientState();
  const isSaved = (state.savedIds || []).includes(p.id);
  const isCompared = (state.comparedIds || []).includes(p.id);

  return `
    <div class="client-monograph-screen" data-monograph-screen data-pro-id="${p.id}">
      ${clientAppHeader('/client', state)}

      <main class="container section-pad">
        <div class="page-back-link">
          <a href="/client">${icon('back', '', 14)} Back to discovery</a>
        </div>

        <!-- Monograph Hero Stage -->
        <div class="monograph-stage">
          <div class="monograph-media-col">
            <img src="${p.image}" alt="${escapeHTML(p.name)}" class="monograph-main-photo" />
            <div class="monograph-verified-badge">
              ${icon('shield', '', 14)} <strong>${escapeHTML(p.verificationLabel)}</strong>
            </div>
          </div>

          <div class="monograph-copy-col">
            <div class="monograph-title-group">
              <span class="eyebrow">${escapeHTML(p.location)} · ${escapeHTML(p.profession)}</span>
              <h1>${escapeHTML(p.name)}</h1>
              <div class="monograph-rating-pill">
                ${p.stats && p.stats.hasReviews ? `
                  <span class="star-glyph">★</span>
                  <strong>${p.stats.averageFormatted}</strong>
                  <span>(${p.stats.reviewCount} verified reviews)</span>
                ` : `
                  <span class="badge-new">New to Vastoco</span>
                `}
              </div>
            </div>

            <p class="monograph-bio">${escapeHTML(p.bio)}</p>

            <div class="monograph-meta-table">
              <div class="meta-item">
                <span class="meta-label">Experience</span>
                <span class="meta-val">${p.experienceYears} Years</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Location</span>
                <span class="meta-val">${escapeHTML(p.location)}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Registration</span>
                <span class="meta-val">${escapeHTML(p.coaRegistration || 'Documented Practice')}</span>
              </div>
            </div>

            <div class="monograph-actions-row">
              <a href="/client/book/${p.id}" class="button button--dark">
                Book video consultation ${icon('arrow', '', 14)}
              </a>
              <button type="button" class="button button--outline ${isSaved ? 'is-saved' : ''}" data-action="toggle-save" data-id="${p.id}">
                ${icon('bookmark', '', 14)} ${isSaved ? 'Saved' : 'Save profile'}
              </button>
              <label class="compare-toggle-label monograph-compare-label">
                <input type="checkbox" class="compare-checkbox" data-action="toggle-compare" data-id="${p.id}" ${isCompared ? 'checked' : ''} />
                <span class="compare-box-facade"></span>
                <span>Compare</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Section: Verification & Practice Integrity -->
        <section class="monograph-section">
          <div class="section-heading-row">
            <h2>Credential Verification</h2>
            <span class="section-tag">${icon('shield', '', 14)} Vastoco Trust Check</span>
          </div>
          <div class="verification-detail-card">
            <div class="verif-icon">${icon('shield', '', 24)}</div>
            <div class="verif-copy">
              <h3>${escapeHTML(p.verificationLabel)}</h3>
              <p>${escapeHTML(p.verificationDoc)}</p>
              <div class="verif-bullets">
                ${(p.qualifications || []).map((q) => `<span>${icon('check', '', 12)} ${escapeHTML(q)}</span>`).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- Section: Genuine Project Portfolio -->
        <section class="monograph-section">
          <div class="section-heading-row">
            <h2>Real Project Portfolio</h2>
            <span class="section-tag">${icon('image', '', 14)} Documented Work</span>
          </div>

          <div class="portfolio-gallery-grid" data-portfolio-gallery>
            ${(p.portfolio || []).map((item) => `
              <div class="portfolio-item-card">
                <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy" />
                <div class="portfolio-item-info">
                  <h4>${escapeHTML(item.title)}</h4>
                  <small>${escapeHTML(item.meta || 'Delhi NCR')} · Illustrative Project</small>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Empty portfolio state (Hidden by default) -->
          <div class="portfolio-empty-state" data-portfolio-empty hidden>
            <img src="/assets/portfolio-empty.svg" alt="No portfolio items" width="180" height="120" />
            <p>This professional has not uploaded portfolio photographs yet.</p>
          </div>
        </section>

        <!-- Section: Upfront Consultation Rates -->
        <section class="monograph-section">
          <div class="section-heading-row">
            <h2>Transparent Upfront Rates</h2>
            <span class="section-tag">${icon('video', '', 14)} Direct Video Sessions</span>
          </div>

          <div class="rates-cards-grid">
            <div class="rate-tier-card">
              <div class="tier-duration">15 Minutes</div>
              <div class="tier-price">₹${p.consultationFees[15].toLocaleString('en-IN')}</div>
              <div class="tier-purpose">Initial Scope Screening</div>
              <p>Quick feasibility assessment, floorplan triage, or regulatory bylaw check.</p>
              <a href="/client/book/${p.id}?duration=15" class="button button--outline button--sm button--block">Book 15m</a>
            </div>

            <div class="rate-tier-card rate-tier-card--featured">
              <div class="tier-duration">30 Minutes <span class="badge-featured">Recommended</span></div>
              <div class="tier-price">₹${p.consultationFees[30].toLocaleString('en-IN')}</div>
              <div class="tier-purpose">Detailed Project Review</div>
              <p>In-depth architectural review, spatial layout optimization, or material palette evaluation.</p>
              <a href="/client/book/${p.id}?duration=30" class="button button--dark button--sm button--block">Book 30m</a>
            </div>

            <div class="rate-tier-card">
              <div class="tier-duration">45 Minutes</div>
              <div class="tier-price">₹${p.consultationFees[45].toLocaleString('en-IN')}</div>
              <div class="tier-purpose">Comprehensive Masterplan</div>
              <p>Multi-story villa planning, turnkey remodel scope, or comprehensive Vastu alignment session.</p>
              <a href="/client/book/${p.id}?duration=45" class="button button--outline button--sm button--block">Book 45m</a>
            </div>
          </div>

          <div class="rate-fee-notice">
            <p>${icon('shield', '', 14)} Consultation rates are set directly by the professional. Vastoco deducts a 15% platform commission from the professional's fee (85% professional payout) upon completion. Clients pay only the transparent rate shown with zero hidden checkout fees.</p>
          </div>
        </section>

        <!-- Section: Ratings & Client Reviews (Reusable Component) -->
        <section class="monograph-section" id="reviews">
          <div class="section-heading-row">
            <h2>Client Reviews & Feedback</h2>
            <span class="section-tag">${icon('shield', '', 14)} Zero Fake Reviews</span>
          </div>

          <!-- Rating Summary Bar Chart Component -->
          ${ratingSummaryComponent(p.stats, p.name)}

          <!-- Reviews List with Filters & Sorting -->
          ${reviewsListComponent(p.stats ? p.stats.eligibleReviews : [], p.id)}
        </section>
      </main>

      <!-- Mobile Sticky Booking Bar -->
      <div class="mobile-sticky-book-bar">
        <div class="sticky-price-info">
          <span class="sticky-rate">From ₹${p.consultationFees[15].toLocaleString('en-IN')}</span>
          <small>30m: ₹${p.consultationFees[30].toLocaleString('en-IN')}</small>
        </div>
        <a href="/client/book/${p.id}" class="button button--dark">Book consultation</a>
      </div>

      ${clientMobileBottomNav('/client', state)}
    </div>
  `;
}

// ==========================================
// 6-STEP BOOKING FLOW (/client/book/:id)
// ==========================================
export function clientBookingDetailPage(proId = 'naina-kapoor') {
  const p = getProfessionalById(proId) || getProfessionalById('naina-kapoor');
  const state = getClientState();

  return `
    <div class="client-booking-studio-screen" data-booking-studio data-pro-id="${p.id}">
      ${clientAppHeader('/client', state)}

      <main class="container section-pad">
        <div class="page-back-link">
          <a href="/client/professionals/${p.id}">${icon('back', '', 14)} Return to ${escapeHTML(p.name)}'s profile</a>
        </div>

        <div class="booking-studio-grid">
          <!-- Left Column: Multi-step Interactive Wizard -->
          <div class="booking-wizard-card">
            <div class="wizard-header">
              <span class="eyebrow">${icon('calendar', '', 14)} Step-by-Step Consultation Booking</span>
              <h2>Schedule your video session with ${escapeHTML(p.name)}</h2>
              <p>Select your duration, choose an available slot, specify your project scope, and authorize simulated escrow payment.</p>
            </div>

            <!-- Step 1: Select Duration -->
            <div class="booking-step-group">
              <div class="step-label">Step 1 — Choose consultation length</div>
              <div class="duration-selector-row">
                <label class="duration-card-label">
                  <input type="radio" name="book-duration" value="15" data-fee="${p.consultationFees[15]}" />
                  <span class="duration-facade">
                    <strong>15 Mins</strong>
                    <span>₹${p.consultationFees[15].toLocaleString('en-IN')}</span>
                  </span>
                </label>

                <label class="duration-card-label">
                  <input type="radio" name="book-duration" value="30" data-fee="${p.consultationFees[30]}" checked />
                  <span class="duration-facade">
                    <strong>30 Mins</strong>
                    <span>₹${p.consultationFees[30].toLocaleString('en-IN')}</span>
                  </span>
                </label>

                <label class="duration-card-label">
                  <input type="radio" name="book-duration" value="45" data-fee="${p.consultationFees[45]}" />
                  <span class="duration-facade">
                    <strong>45 Mins</strong>
                    <span>₹${p.consultationFees[45].toLocaleString('en-IN')}</span>
                  </span>
                </label>
              </div>
            </div>

            <!-- Step 2: Choose Slot -->
            <div class="booking-step-group">
              <div class="step-label">Step 2 — Select available date & time</div>
              <div class="slot-buttons-grid">
                ${(p.availableSlots || []).map((s, idx) => `
                  <button type="button" class="slot-select-btn ${idx === 0 ? 'is-selected' : ''} ${!s.available ? 'is-unavailable' : ''}" data-slot-id="${s.id}" data-slot-available="${s.available}">
                    <span class="slot-date">${escapeHTML(s.date)}</span>
                    <span class="slot-time">${escapeHTML(s.time)}</span>
                    ${!s.available ? '<span class="slot-unavail-badge">Unavailable</span>' : ''}
                  </button>
                `).join('')}
              </div>

              <!-- Unavailable Slot Alert (demonstrating edge case) -->
              <div class="slot-alert-box" data-slot-alert hidden>
                ${icon('alert', '', 16)}
                <span>This consultation slot is no longer available. Please select another time or date above.</span>
              </div>
            </div>

            <!-- Step 3: Project Budget, Scope & Timeline -->
            <div class="booking-step-group">
              <div class="step-label">Step 3 — Project budget, scope & timeline</div>
              
              <div class="form-field-group">
                <label for="bookBudgetSelect">Estimated Project Budget</label>
                <select id="bookBudgetSelect" class="select-input" data-book-budget>
                  <option value="under-20L">Under ₹20 Lakhs</option>
                  <option value="20L-50L" selected>₹20 Lakhs – ₹50 Lakhs</option>
                  <option value="50L-1Cr">₹50 Lakhs – ₹1 Crore</option>
                  <option value="1Cr-plus">Above ₹1 Crore</option>
                </select>
              </div>

              <div class="form-field-group">
                <label for="bookScopeInput">Project Scope & Questions</label>
                <textarea id="bookScopeInput" class="textarea-input" rows="3" placeholder="Briefly describe your home or villa project (e.g. 3BHK interior renovation in DLF Phase 5, structural courtyard extension, or Vastu review)..." data-book-scope>Ground floor layout redesign and daylighting optimization.</textarea>
              </div>

              <div class="form-field-group">
                <label for="bookTimelineSelect">Target Timeline</label>
                <select id="bookTimelineSelect" class="select-input" data-book-timeline>
                  <option value="immediate">Immediate (Next 30 days)</option>
                  <option value="1-3-months" selected>1 – 3 Months</option>
                  <option value="3-6-months">3 – 6 Months</option>
                  <option value="exploratory">Exploratory Planning</option>
                </select>
              </div>
            </div>

            <!-- Step 4: Simulated Payment -->
            <div class="booking-step-group">
              <div class="step-label">Step 4 — Authorize simulated payment</div>
              <p class="sim-pay-explainer">
                Vastoco uses a 100% escrow model. No real money will be charged. This simulation tests booking confirmation and edge cases.
              </p>

              <div class="sim-failure-toggle-box">
                <label class="checkbox-label">
                  <input type="checkbox" data-simulate-payment-failure />
                  <span class="checkbox-facade"></span>
                  <span>Simulate payment gateway failure (edge case demo)</span>
                </label>
              </div>

              <!-- Payment failure error banner -->
              <div class="payment-error-alert" data-payment-error hidden>
                ${icon('alert', '', 16)}
                <span>Simulated payment authorization failed. Your escrow deposit was not processed. Please try again.</span>
              </div>

              <button type="button" class="button button--dark button--block" data-action="confirm-simulated-booking">
                Confirm & Pay <span data-button-total-fee>₹1,400</span> (Simulated Escrow) ${icon('arrow', '', 14)}
              </button>
            </div>
          </div>

          <!-- Right Column: Upfront Fee Summary Card -->
          <div class="booking-summary-col">
            <div class="fee-summary-card">
              <div class="summary-head">
                <img src="${p.image}" alt="${escapeHTML(p.name)}" class="summary-pro-thumb" />
                <div>
                  <h3>${escapeHTML(p.name)}</h3>
                  <small>${escapeHTML(p.profession)} · ${escapeHTML(p.location)}</small>
                </div>
              </div>

              <div class="summary-line-items">
                <div class="line-item">
                  <span>Selected Duration</span>
                  <strong data-summary-duration>30 Minutes</strong>
                </div>
                <div class="line-item">
                  <span>Professional Share (85%)</span>
                  <span data-summary-pro-fee>₹1,190</span>
                </div>
                <div class="line-item">
                  <span>Platform & Escrow Fee (15%)</span>
                  <span data-summary-platform-fee>₹210</span>
                </div>
                <div class="line-item line-item--total">
                  <span>Total Upfront Fee</span>
                  <strong class="total-price" data-summary-total-fee>₹1,400</strong>
                </div>
              </div>

              <div class="escrow-protection-guarantee">
                ${icon('shield', '', 16)}
                <div>
                  <strong>100% Escrow Protection</strong>
                  <p>Your fee is securely held until the video consultation is completed. Zero hidden platform charges.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Confirmation Dialog Modal (Hidden initially) -->
        <dialog class="booking-confirmation-dialog" data-booking-confirmation-modal aria-label="Booking Confirmed">
          <div class="conf-dialog-inner">
            <div class="conf-icon">${icon('check', '', 28)}</div>
            <h2>Video Consultation Confirmed!</h2>
            <p>Your simulated booking with ${escapeHTML(p.name)} has been successfully reserved in escrow.</p>

            <div class="conf-booking-details">
              <div class="conf-detail-row">
                <span>Booking Reference:</span>
                <strong data-conf-ref>VST-2026-8841</strong>
              </div>
              <div class="conf-detail-row">
                <span>Duration:</span>
                <span data-conf-duration>30 Minutes</span>
              </div>
              <div class="conf-detail-row">
                <span>Total Escrow Fee:</span>
                <span data-conf-fee>₹1,400</span>
              </div>
            </div>

            <div class="conf-dialog-actions">
              <a href="/client/consultations" class="button button--dark button--block">
                View in My Consultations ${icon('arrow', '', 14)}
              </a>
              <a href="/client" class="button button--outline button--block">
                Return to Client Workspace
              </a>
            </div>
          </div>
        </dialog>
      </main>

      ${clientMobileBottomNav('/client', state)}
    </div>
  `;
}

// Client Project Briefs and Incoming Professional Offers View (/client/briefs)
export function clientBriefsPage() {
  const state = getClientState();
  const briefs = getClientBriefs();
  const offers = getProOffers();

  return `
    <div class="client-briefs-screen" data-client-briefs-screen>
      ${clientAppHeader('/client/briefs', state)}
      <main class="container section-pad">
        <div class="client-briefs-heading-row">
          <div class="client-briefs-heading-copy">
            <span class="eyebrow">${icon('file', '', 14)} Two-Sided Project Hub</span>
            <h1>My Project Briefs & Incoming Offers</h1>
            <p>Post architectural briefs with privacy protection, review incoming consultation proposals, and book directly.</p>
          </div>
          <div class="client-briefs-heading-action">
            <button type="button" class="button button--dark" data-toggle-new-brief>
              + Post New Project Brief
            </button>
          </div>
        </div>

        <!-- Post New Brief Drawer/Card -->
        <section class="client-new-brief-drawer" data-new-brief-drawer hidden>
          <div class="new-brief-card">
            <div class="new-brief-header">
              <h2>Post a Project Brief across Delhi NCR</h2>
              <p>Verified architects and designers will review your brief and send structured consultation offers.</p>
            </div>

            <div class="client-privacy-banner">
              ${icon('lock', '', 16)}
              <div>
                <strong>Privacy Guaranteed:</strong> Your telephone number, email, and exact house coordinates remain strictly private. Professionals only see your general locality (e.g. Noida Sector 44) and project scope until you confirm an offer.
              </div>
            </div>

            <form class="client-brief-form" data-form-create-brief>
              <div class="form-row">
                <label>Project Title
                  <input name="title" placeholder="e.g. Modern Villa Architecture & Layout Review" required />
                </label>
                <label>Discipline Needed
                  <select name="category" required>
                    <option value="Architecture">Architecture</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Vastu Consultancy">Vastu Consultancy</option>
                  </select>
                </label>
              </div>

              <div class="form-row">
                <label>Delhi NCR Locality
                  <select name="locality" required>
                    <option value="Sector 44, Noida">Sector 44, Noida</option>
                    <option value="DLF Phase 5, Gurugram">DLF Phase 5, Gurugram</option>
                    <option value="South Extension, New Delhi">South Extension, New Delhi</option>
                    <option value="Vasant Vihar, New Delhi">Vasant Vihar, New Delhi</option>
                    <option value="Greenfield Colony, Faridabad">Greenfield Colony, Faridabad</option>
                    <option value="Other Delhi NCR">Other Delhi NCR</option>
                  </select>
                </label>
                <label>Project Typology
                  <input name="projectType" placeholder="e.g. Independent Villa (G+2) or 4BHK Penthouse" required />
                </label>
                <label>Plot / Built-up Area
                  <input name="plotSize" placeholder="e.g. 500 sq. yards / 4,200 sq. ft." />
                </label>
              </div>

              <div class="form-row">
                <label>Estimated Execution Budget
                  <select name="budgetRange">
                    <option value="Under ₹25 Lakhs">Under ₹25 Lakhs</option>
                    <option value="₹25 Lakhs – ₹50 Lakhs" selected>₹25 Lakhs – ₹50 Lakhs</option>
                    <option value="₹50 Lakhs – ₹1 Crore">₹50 Lakhs – ₹1 Crore</option>
                    <option value="₹1 Crore+">₹1 Crore+</option>
                  </select>
                </label>
                <label>Target Timeline
                  <select name="targetTimeline">
                    <option value="Immediate (1–2 Months)">Immediate (1–2 Months)</option>
                    <option value="3–6 Months" selected>3–6 Months</option>
                    <option value="6–12 Months">6–12 Months</option>
                  </select>
                </label>
                <label>Privacy Setting
                  <select name="privacy">
                    <option value="open" selected>Open to eligible verified practitioners</option>
                    <option value="selected">Shared only with selected specialists</option>
                    <option value="private">Private (direct booking only)</option>
                  </select>
                </label>
              </div>

              <label>Project Scope & Requirements
                <textarea name="description" rows="4" placeholder="Describe your site, architectural goals, structural ideas, or questions for the consultation..." required></textarea>
              </label>

              <div class="form-actions">
                <button type="submit" class="button button--dark">Publish Project Brief</button>
                <button type="button" class="button button--outline" data-cancel-new-brief>Cancel</button>
              </div>
            </form>
          </div>
        </section>

        <!-- Section: Incoming Professional Offers -->
        <section class="client-incoming-offers-section">
          <div class="section-heading-row">
            <h2>Incoming Consultation Offers (${offers.length})</h2>
            <p>Proposals sent by verified Delhi NCR practitioners for your project briefs</p>
          </div>

          <div class="client-offers-grid">
            ${offers.map(offer => `
              <article class="client-offer-card client-offer-card--${offer.status}">
                <div class="offer-card-pro-head">
                  <div class="pro-identity">
                    <img src="/${offer.proAvatar}" alt="${offer.proName}" class="pro-avatar-mini" />
                    <div>
                      <strong>${offer.proName}</strong>
                      <span class="pro-firm">${offer.proRole} · ${offer.proCompany}</span>
                      <span class="pro-coa-tag">${icon('shield', '', 12)} ${offer.proCoa}</span>
                    </div>
                  </div>
                  <div class="offer-status-badge">
                    <span class="status-pill status-pill--${offer.status}">${offer.statusLabel}</span>
                  </div>
                </div>

                <div class="offer-brief-context">
                  <small>For Brief:</small>
                  <h4>${offer.briefTitle}</h4>
                </div>

                <blockquote class="offer-pitch-text">
                  "${offer.pitchMessage}"
                </blockquote>

                <div class="offer-terms-strip">
                  <div class="term-pill">
                    <small>Proposed Duration</small>
                    <strong>${offer.durationMinutes} Minutes</strong>
                  </div>
                  <div class="term-pill">
                    <small>Consultation Fee</small>
                    <strong>₹${offer.feeAmount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div class="term-pill">
                    <small>Escrow Protection</small>
                    <strong>100% Backed</strong>
                  </div>
                </div>

                <div class="offer-actions-bar">
                  ${offer.status === 'sent' ? `
                    <button type="button" class="button button--dark button--small" data-client-accept-offer="${offer.id}">
                      Accept Offer & Confirm Slot ${icon('check', '', 13)}
                    </button>
                    <button type="button" class="button button--outline button--small" data-client-decline-offer="${offer.id}">
                      Decline
                    </button>
                  ` : offer.status === 'accepted' ? `
                    <a href="/client/consultations" class="button button--dark button--small">
                      View in My Consultations ${icon('arrow', '', 13)}
                    </a>
                  ` : `
                    <span class="offer-settled-text">This offer was ${offer.status}</span>
                  `}
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        <!-- Section: My Posted Briefs -->
        <section class="client-my-briefs-section" style="margin-top: 48px;">
          <div class="section-heading-row">
            <h2>My Active Project Briefs (${briefs.length})</h2>
            <p>Your published architectural requests visible to verified professionals</p>
          </div>

          <div class="client-briefs-list">
            ${briefs.map(brief => `
              <article class="client-brief-summary-card">
                <div class="brief-summary-head">
                  <div class="brief-tags-row">
                    <span class="brief-cat-pill">${brief.category}</span>
                    <span class="brief-locality">${brief.locality}</span>
                    <span class="opp-privacy-pill">${icon('lock', '', 12)} ${brief.privacyLabel}</span>
                  </div>
                  <span class="brief-offers-pill">${brief.offersCount} proposals received</span>
                </div>

                <h3>${brief.title}</h3>
                <p class="brief-summary-text">${brief.description}</p>

                <div class="brief-summary-specs">
                  <span><strong>Typology:</strong> ${brief.projectType}</span>
                  <span><strong>Plot Size:</strong> ${brief.plotSize}</span>
                  <span><strong>Budget:</strong> ${brief.budgetRange}</span>
                  <span><strong>Timeline:</strong> ${brief.targetTimeline}</span>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      </main>
      ${clientMobileBottomNav('/client/briefs', state)}
    </div>
  `;
}
