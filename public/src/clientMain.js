// Vastoco Client Experience V2 — Interactive Client Controller
// Handles search, filtering, sorting, save/unsave, comparison limits, reviews, booking wizard, and client state.

import {
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
  resetClientProfile,
  validateClientProfile,
  RAW_REVIEWS
} from './clientData.js';
import { professionalCardV2 } from './clientPages.js';
import { saveClientBrief, updateOfferStatus } from './marketplaceData.js';

export function initClientApp() {
  initClientDiscovery();
  initClientInteractions();
  initClientReviews();
  initClientBookingStudio();
  initConsultationTabs();
  initClientModeSwitcher();
  initClientProfileController();
  initClientBriefsController();
}

// -------------------------------------------------------------
// 1. DISCOVERY & FILTERING CONTROLLER
// -------------------------------------------------------------
function initClientDiscovery() {
  const discoverySection = document.querySelector('[data-discovery-section]');
  if (!discoverySection) return;

  const searchInput = discoverySection.querySelector('[data-discovery-search]');
  const clearSearchBtn = discoverySection.querySelector('[data-action="clear-search"]');
  const localitySelect = discoverySection.querySelector('[data-filter-locality]');
  const categoryChips = discoverySection.querySelectorAll('[data-filter-category]');
  const servicePills = discoverySection.querySelectorAll('[data-filter-service]');
  const sortSelect = discoverySection.querySelector('[data-discovery-sort]');
  const resetButtons = discoverySection.querySelectorAll('[data-action="reset-filters"]');

  // Sidebar radios & checkboxes
  const localityRadios = discoverySection.querySelectorAll('[data-filter-locality-radio]');
  const ratingRadios = discoverySection.querySelectorAll('[data-filter-rating-radio]');
  const includeUnratedCheckbox = discoverySection.querySelector('[data-filter-include-unrated]');
  const expRadios = discoverySection.querySelectorAll('[data-filter-exp-radio]');
  const feeRadios = discoverySection.querySelectorAll('[data-filter-fee-radio]');
  const durationRadios = discoverySection.querySelectorAll('[data-filter-duration-radio]');
  const specSelect = discoverySection.querySelector('[data-filter-specialization-select]');

  // Displays
  const resultsCountEl = discoverySection.querySelector('[data-results-count]');
  const gridEl = discoverySection.querySelector('[data-discovery-grid]');
  const emptyStateEl = discoverySection.querySelector('[data-empty-state]');
  const activeChipsRow = discoverySection.querySelector('[data-active-chips-row]');
  const filterBadge = discoverySection.querySelector('[data-filter-badge]');

  // Mobile Filter Sheet
  const mobileSheet = discoverySection.querySelector('[data-mobile-filter-sheet]');
  const openMobileBtn = discoverySection.querySelector('[data-action="open-mobile-filters"]');
  const closeMobileBtns = discoverySection.querySelectorAll('[data-action="close-mobile-filters"]');
  const applyMobileBtn = discoverySection.querySelector('[data-action="apply-mobile-filters"]');
  const mobileBody = discoverySection.querySelector('[data-mobile-filter-body]');
  const sidebar = discoverySection.querySelector('[data-filters-sidebar]');

  // Clone sidebar content into mobile sheet body if empty
  if (mobileBody && sidebar && mobileBody.children.length === 0) {
    const clone = sidebar.cloneNode(true);
    // remove sticky & header
    const head = clone.querySelector('.filters-sidebar-head');
    if (head) head.remove();
    mobileBody.appendChild(clone);
  }

  // Active filters state
  const state = {
    searchQuery: '',
    category: 'all',
    service: 'All services',
    specialization: 'All specializations',
    duration: 'all',
    locality: 'All Delhi NCR',
    minRating: 'all',
    includeUnrated: true,
    experience: 'all',
    maxFee: '',
    sortKey: 'relevant'
  };

  function updateResults() {
    const allPros = getAllProfessionalsWithStats();
    const filtered = filterProfessionals(allPros, state);
    const sorted = sortProfessionals(filtered, state.sortKey);
    const clientState = getClientState();

    // Update count text
    if (resultsCountEl) {
      if (sorted.length === 0) {
        resultsCountEl.textContent = 'No matching professionals found';
      } else if (sorted.length === allPros.length) {
        resultsCountEl.textContent = `Showing all ${allPros.length} verified professionals in Delhi NCR`;
      } else {
        resultsCountEl.textContent = `Showing ${sorted.length} of ${allPros.length} professionals`;
      }
    }

    // Update active filter chips
    renderActiveFilterChips();

    // Render cards or empty state
    if (sorted.length === 0) {
      if (gridEl) gridEl.hidden = true;
      if (emptyStateEl) emptyStateEl.hidden = false;
    } else {
      if (emptyStateEl) emptyStateEl.hidden = true;
      if (gridEl) {
        gridEl.hidden = false;
        gridEl.innerHTML = sorted.map((p) => professionalCardV2(p, clientState)).join('');
      }
    }
  }

  function renderActiveFilterChips() {
    if (!activeChipsRow) return;

    const chips = [];
    if (state.category !== 'all') {
      const catLabel = state.category === 'architect' ? 'Architects' : state.category === 'interior' ? 'Interior Designers' : 'Vastu Consultants';
      chips.push({ key: 'category', label: `Category: ${catLabel}` });
    }
    if (state.locality !== 'All Delhi NCR') {
      chips.push({ key: 'locality', label: `Locality: ${state.locality}` });
    }
    if (state.service !== 'All services') {
      chips.push({ key: 'service', label: `Service: ${state.service}` });
    }
    if (state.minRating !== 'all') {
      chips.push({ key: 'minRating', label: `Rating: ${state.minRating}★+` });
    }
    if (state.experience !== 'all') {
      chips.push({ key: 'experience', label: `Exp: ${state.experience}+ yrs` });
    }
    if (state.maxFee) {
      chips.push({ key: 'maxFee', label: `Max fee: ₹${Number(state.maxFee).toLocaleString('en-IN')}` });
    }
    if (state.duration !== 'all') {
      chips.push({ key: 'duration', label: `Duration: ${state.duration}m` });
    }
    if (state.specialization !== 'All specializations') {
      chips.push({ key: 'specialization', label: `Spec: ${state.specialization}` });
    }
    if (state.searchQuery) {
      chips.push({ key: 'search', label: `Search: "${state.searchQuery}"` });
    }

    if (chips.length === 0) {
      activeChipsRow.hidden = true;
      activeChipsRow.innerHTML = '';
      if (filterBadge) filterBadge.hidden = true;
    } else {
      activeChipsRow.hidden = false;
      activeChipsRow.innerHTML = chips.map((c) => `
        <span class="active-chip">
          <span>${c.label}</span>
          <button type="button" class="active-chip-remove" data-remove-filter="${c.key}" aria-label="Remove ${c.label}">✕</button>
        </span>
      `).join('') + `
        <button type="button" class="filters-reset-btn" data-action="reset-filters" style="align-self: center; margin-left: 8px;">Clear all</button>
      `;

      if (filterBadge) {
        filterBadge.hidden = false;
        filterBadge.textContent = chips.length;
      }
    }
  }

  // 1. Search input events
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = searchInput.value.trim();
        if (clearSearchBtn) clearSearchBtn.hidden = !state.searchQuery;
        updateResults();
      }, 150);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.hidden = true;
      updateResults();
    });
  }

  const submitSearchBtn = discoverySection.querySelector('[data-action="submit-search"]');
  if (submitSearchBtn) {
    submitSearchBtn.addEventListener('click', () => {
      if (searchInput) state.searchQuery = searchInput.value.trim();
      updateResults();
      if (gridEl) {
        gridEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        state.searchQuery = searchInput.value.trim();
        updateResults();
        if (gridEl) {
          gridEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }

  // Nav search input sync
  const navSearchInputs = document.querySelectorAll('[data-nav-search]');
  navSearchInputs.forEach((navSearch) => {
    navSearch.addEventListener('input', () => {
      if (searchInput) searchInput.value = navSearch.value;
      state.searchQuery = navSearch.value.trim();
      if (clearSearchBtn) clearSearchBtn.hidden = !state.searchQuery;
      updateResults();
    });
    navSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (gridEl) {
          gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Global ⌘K / Ctrl+K shortcut to focus search
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) return;
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (navSearchInputs.length > 0) {
        navSearchInputs[0].focus();
      }
    }
  });

  // 2. Locality select
  if (localitySelect) {
    localitySelect.addEventListener('change', () => {
      state.locality = localitySelect.value;
      // sync sidebar radios
      localityRadios.forEach((r) => {
        r.checked = r.value === state.locality;
      });
      updateResults();
    });
  }

  // 3. Category chips
  categoryChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      categoryChips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      state.category = chip.getAttribute('data-filter-category') || 'all';
      updateResults();
    });
  });

  // 4. Service pills
  servicePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      servicePills.forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      state.service = pill.getAttribute('data-filter-service') || 'All services';
      updateResults();
    });
  });

  // 5. Sidebar Locality Radios
  localityRadios.forEach((r) => {
    r.addEventListener('change', () => {
      if (r.checked) {
        state.locality = r.value;
        if (localitySelect) localitySelect.value = r.value;
        updateResults();
      }
    });
  });

  // 6. Sidebar Rating Radios
  ratingRadios.forEach((r) => {
    r.addEventListener('change', () => {
      if (r.checked) {
        state.minRating = r.value;
        updateResults();
      }
    });
  });

  if (includeUnratedCheckbox) {
    includeUnratedCheckbox.addEventListener('change', () => {
      state.includeUnrated = includeUnratedCheckbox.checked;
      updateResults();
    });
  }

  // 7. Experience Radios
  expRadios.forEach((r) => {
    r.addEventListener('change', () => {
      if (r.checked) {
        state.experience = r.value;
        updateResults();
      }
    });
  });

  // 8. Fee Radios
  feeRadios.forEach((r) => {
    r.addEventListener('change', () => {
      if (r.checked) {
        state.maxFee = r.value;
        updateResults();
      }
    });
  });

  // 8b. Duration Radios
  durationRadios.forEach((r) => {
    r.addEventListener('change', () => {
      if (r.checked) {
        state.duration = r.value;
        updateResults();
      }
    });
  });

  // 8c. Specialization Select
  if (specSelect) {
    specSelect.addEventListener('change', () => {
      state.specialization = specSelect.value;
      updateResults();
    });
  }

  // 9. Sort Dropdown
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      state.sortKey = sortSelect.value;
      updateResults();
    });
  }

  // 10. Reset Filters
  function resetAllFilters() {
    state.searchQuery = '';
    state.category = 'all';
    state.service = 'All services';
    state.specialization = 'All specializations';
    state.duration = 'all';
    state.locality = 'All Delhi NCR';
    state.minRating = 'all';
    state.includeUnrated = true;
    state.experience = 'all';
    state.maxFee = '';

    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.hidden = true;
    if (localitySelect) localitySelect.value = 'All Delhi NCR';

    categoryChips.forEach((c) => {
      c.classList.toggle('is-active', c.getAttribute('data-filter-category') === 'all');
    });

    servicePills.forEach((p, idx) => {
      p.classList.toggle('is-active', idx === 0);
    });

    localityRadios.forEach((r, idx) => { r.checked = idx === 0; });
    ratingRadios.forEach((r, idx) => { r.checked = idx === 0; });
    if (includeUnratedCheckbox) includeUnratedCheckbox.checked = true;
    expRadios.forEach((r, idx) => { r.checked = idx === 0; });
    feeRadios.forEach((r, idx) => { r.checked = idx === 0; });
    durationRadios.forEach((r, idx) => { r.checked = idx === 0; });
    if (specSelect) specSelect.value = 'All specializations';

    updateResults();
  }

  discoverySection.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="reset-filters"]')) {
      resetAllFilters();
    }
    const removeBtn = e.target.closest('[data-remove-filter]');
    if (removeBtn) {
      const key = removeBtn.getAttribute('data-remove-filter');
      if (key === 'category') {
        state.category = 'all';
        categoryChips.forEach((c) => c.classList.toggle('is-active', c.getAttribute('data-filter-category') === 'all'));
      } else if (key === 'locality') {
        state.locality = 'All Delhi NCR';
        if (localitySelect) localitySelect.value = 'All Delhi NCR';
        localityRadios.forEach((r, idx) => { r.checked = idx === 0; });
      } else if (key === 'service') {
        state.service = 'All services';
        servicePills.forEach((p, idx) => p.classList.toggle('is-active', idx === 0));
      } else if (key === 'specialization') {
        state.specialization = 'All specializations';
        if (specSelect) specSelect.value = 'All specializations';
      } else if (key === 'duration') {
        state.duration = 'all';
        durationRadios.forEach((r, idx) => { r.checked = idx === 0; });
      } else if (key === 'minRating') {
        state.minRating = 'all';
        ratingRadios.forEach((r, idx) => { r.checked = idx === 0; });
      } else if (key === 'experience') {
        state.experience = 'all';
        expRadios.forEach((r, idx) => { r.checked = idx === 0; });
      } else if (key === 'maxFee') {
        state.maxFee = '';
        feeRadios.forEach((r, idx) => { r.checked = idx === 0; });
      } else if (key === 'search') {
        state.searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (clearSearchBtn) clearSearchBtn.hidden = true;
      }
      updateResults();
    }
  });

  // Mobile Filter Sheet open/close
  if (openMobileBtn && mobileSheet) {
    openMobileBtn.addEventListener('click', () => {
      mobileSheet.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  }

  closeMobileBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (mobileSheet) {
        mobileSheet.hidden = true;
        document.body.style.overflow = '';
      }
    });
  });

  if (applyMobileBtn && mobileSheet) {
    applyMobileBtn.addEventListener('click', () => {
      mobileSheet.hidden = true;
      document.body.style.overflow = '';
      updateResults();
    });
  }
}

// -------------------------------------------------------------
// 2. CLIENT INTERACTIONS (SAVE, COMPARE DOCK, TOASTS)
// -------------------------------------------------------------
function initClientInteractions() {
  document.addEventListener('click', (e) => {
    // 0. Professional card surface click navigation
    const card = e.target.closest('.pro-card-v2');
    if (card) {
      if (!e.target.closest('button, input, label, a, .card-save-btn, .compare-toggle-label, .pro-card-book-btn')) {
        const href = card.getAttribute('data-card-href');
        if (href) {
          window.location.href = href;
          return;
        }
      }
    }

    // 1. Save / Unsave
    const saveBtn = e.target.closest('[data-action="toggle-save"]');
    if (saveBtn) {
      const id = saveBtn.getAttribute('data-id');
      if (id) {
        const isNowSaved = toggleSaveProfessional(id);
        saveBtn.classList.toggle('is-saved', isNowSaved);
        saveBtn.setAttribute('aria-label', isNowSaved ? 'Remove from saved' : 'Save professional');
        updateNavBadges();
      }
      return;
    }

    // 2. Remove from Compare Dock
    const removeCompareBtn = e.target.closest('[data-action="remove-compare"]');
    if (removeCompareBtn) {
      const id = removeCompareBtn.getAttribute('data-id');
      if (id) {
        toggleCompareProfessional(id);
        updateCompareCheckboxes();
        updateCompareDock();
        updateNavBadges();
      }
      return;
    }

    // 3. Clear All Compare
    if (e.target.closest('[data-action="clear-all-compare"]')) {
      clearComparison();
      updateCompareCheckboxes();
      updateCompareDock();
      updateNavBadges();
      return;
    }

    // 4. Video call demo simulation button
    if (e.target.closest('[data-action="join-demo-call"]')) {
      alert('Video consultation simulation room: In the live Vastoco platform, this connects to a WebRTC encrypted video session. Upfront escrow is held until completion.');
      return;
    }
  });

  // Compare Checkbox toggle handler
  document.addEventListener('change', (e) => {
    const compareCheckbox = e.target.closest('[data-action="toggle-compare"]');
    if (compareCheckbox) {
      const id = compareCheckbox.getAttribute('data-id');
      if (!id) return;

      const result = toggleCompareProfessional(id);
      if (result.limitExceeded) {
        compareCheckbox.checked = false;
        showToastAlert('You can compare a maximum of 2 professionals. Remove one from your comparison tray to add another.');
      } else {
        updateCompareCheckboxes();
        updateCompareDock();
        updateNavBadges();
      }
    }
  });
}

function updateCompareCheckboxes() {
  const state = getClientState();
  const compared = new Set(state.comparedIds || []);
  document.querySelectorAll('[data-action="toggle-compare"]').forEach((cb) => {
    const id = cb.getAttribute('data-id');
    if (id) cb.checked = compared.has(id);
  });
}

function updateCompareDock() {
  const dock = document.querySelector('[data-compare-dock]');
  if (!dock) return;

  const state = getClientState();
  const comparedIds = state.comparedIds || [];
  const count = comparedIds.length;

  if (count === 0) {
    dock.classList.add('is-hidden');
    dock.hidden = true;
    return;
  }

  dock.classList.remove('is-hidden');
  dock.hidden = false;

  const countEl = dock.querySelector('[data-compare-count]');
  if (countEl) countEl.textContent = count;

  const launchBtn = dock.querySelector('[data-compare-launch]');
  if (launchBtn) {
    launchBtn.classList.toggle('is-disabled', count < 2);
    launchBtn.setAttribute('aria-disabled', count < 2);
    launchBtn.innerHTML = `Compare ${count > 0 ? `(${count})` : ''} <svg class="icon " width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  }

  // Update Slot 1 & Slot 2
  const slots = dock.querySelectorAll('.dock-slot');
  const slot1 = comparedIds[0] ? getProfessionalById(comparedIds[0]) : null;
  const slot2 = comparedIds[1] ? getProfessionalById(comparedIds[1]) : null;

  if (slots[0]) renderDockSlot(slots[0], slot1, 1);
  if (slots[1]) renderDockSlot(slots[1], slot2, 2);
}

function renderDockSlot(slotEl, pro, slotNum) {
  if (pro) {
    slotEl.className = 'dock-slot is-filled';
    slotEl.innerHTML = `
      <img src="${pro.image}" alt="${pro.name}" class="dock-slot-img" />
      <div class="dock-slot-meta">
        <span class="dock-slot-name">${pro.name}</span>
        <span class="dock-slot-pro">${pro.profession}</span>
      </div>
      <button type="button" class="dock-slot-remove" data-action="remove-compare" data-id="${pro.id}" aria-label="Remove ${pro.name}">
        ✕
      </button>
    `;
  } else {
    slotEl.className = 'dock-slot is-empty';
    slotEl.innerHTML = `<span class="dock-empty-hint">Slot ${slotNum}: Select professional</span>`;
  }
}

function updateNavBadges() {
  const state = getClientState();
  const savedCount = (state.savedIds || []).length;
  const compareCount = (state.comparedIds || []).length;

  document.querySelectorAll('[data-nav-saved-badge]').forEach((b) => {
    b.textContent = savedCount;
    b.hidden = savedCount === 0;
  });

  document.querySelectorAll('[data-nav-compare-badge]').forEach((b) => {
    b.textContent = compareCount;
    b.hidden = compareCount === 0;
  });
}

function showToastAlert(message) {
  let toast = document.querySelector('#clientToastAlert');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'clientToastAlert';
    toast.style.cssText = `
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--espresso);
      color: #DDD9CE;
      padding: 12px 20px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      z-index: 2000;
      box-shadow: 0 8px 24px rgba(60, 36, 21, 0.25);
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
  }, 3500);
}

// -------------------------------------------------------------
// 3. REVIEWS & RATINGS LIST CONTROLLER
// -------------------------------------------------------------
function initClientReviews() {
  const container = document.querySelector('[data-reviews-container]');
  if (!container) return;

  const proId = container.getAttribute('data-pro-id');
  const feed = container.querySelector('[data-reviews-feed]');
  const filterChips = container.querySelectorAll('[data-review-filter]');
  const sortSelect = container.querySelector('[data-review-sort]');
  const distStarButtons = document.querySelectorAll('[data-filter-by-star]');

  // Report review button handler
  document.addEventListener('click', (e) => {
    const reportBtn = e.target.closest('[data-report-review]');
    if (reportBtn) {
      reportBtn.textContent = 'Reported';
      reportBtn.disabled = true;
      showToastAlert('Thank you. This review record has been submitted for moderation review.');
    }
  });

  let currentStarFilter = 'all';
  let currentSort = 'relevant';

  function filterAndSortReviews() {
    if (!feed) return;
    const cards = Array.from(feed.querySelectorAll('.review-card'));

    cards.forEach((card) => {
      const rating = card.getAttribute('data-review-rating');
      if (currentStarFilter === 'all' || rating === currentStarFilter) {
        card.hidden = false;
      } else {
        card.hidden = true;
      }
    });
  }

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filterChips.forEach((c) => c.classList.remove('chip--active'));
      chip.classList.add('chip--active');
      currentStarFilter = chip.getAttribute('data-review-filter') || 'all';
      filterAndSortReviews();
    });
  });

  distStarButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const star = btn.getAttribute('data-filter-by-star');
      if (star) {
        currentStarFilter = star;
        filterChips.forEach((c) => {
          c.classList.toggle('chip--active', c.getAttribute('data-review-filter') === star);
        });
        filterAndSortReviews();
        // scroll to reviews feed
        feed?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      if (!feed) return;
      const cards = Array.from(feed.querySelectorAll('.review-card'));
      cards.sort((a, b) => {
        const rA = parseInt(a.getAttribute('data-review-rating') || '0', 10);
        const rB = parseInt(b.getAttribute('data-review-rating') || '0', 10);
        if (currentSort === 'highest') return rB - rA;
        if (currentSort === 'lowest') return rA - rB;
        return 0;
      });
      cards.forEach((c) => feed.appendChild(c));
    });
  }

  // Empty portfolio toggle simulation
  const emptyPortfolioToggle = document.querySelector('[data-action="toggle-empty-portfolio"]') || document.querySelector('[data-simulate-empty-portfolio]');
  const gallery = document.querySelector('[data-portfolio-gallery]') || document.querySelector('[data-portfolio-active]');
  const emptyState = document.querySelector('[data-portfolio-empty]');

  if (emptyPortfolioToggle && gallery && emptyState) {
    emptyPortfolioToggle.addEventListener('click', () => {
      const isCurrentlyEmpty = !emptyState.hidden;
      emptyState.hidden = isCurrentlyEmpty;
      gallery.hidden = !isCurrentlyEmpty;
      emptyPortfolioToggle.textContent = isCurrentlyEmpty ? 'Simulate empty portfolio toggle' : 'Restore portfolio projects';
    });
  }
}

// -------------------------------------------------------------
// 4. BOOKING STUDIO & PAYMENT SIMULATION CONTROLLER
// -------------------------------------------------------------
function initClientBookingStudio() {
  const studio = document.querySelector('[data-booking-studio]');
  if (!studio) return;

  const proId = studio.getAttribute('data-pro-id');
  const pro = getProfessionalById(proId);
  if (!pro) return;

  // Duration Radios
  const durationRadios = studio.querySelectorAll('input[name="book-duration"]');
  const summaryDuration = studio.querySelector('[data-summary-duration]');
  const summaryProFee = studio.querySelector('[data-summary-pro-fee]');
  const summaryPlatformFee = studio.querySelector('[data-summary-platform-fee]');
  const summaryTotalFee = studio.querySelector('[data-summary-total-fee]');
  const buttonTotalFee = studio.querySelector('[data-button-total-fee]');

  let selectedDuration = 30;
  let totalFee = pro.consultationFees[30] || 1400;

  function updatePricing(duration) {
    selectedDuration = parseInt(duration, 10);
    totalFee = pro.consultationFees[selectedDuration] || 1400;
    const proShare = Math.round(totalFee * 0.85);
    const platformShare = totalFee - proShare;

    if (summaryDuration) summaryDuration.textContent = `${selectedDuration} Minutes`;
    if (summaryProFee) summaryProFee.textContent = `₹${proShare.toLocaleString('en-IN')}`;
    if (summaryPlatformFee) summaryPlatformFee.textContent = `₹${platformShare.toLocaleString('en-IN')}`;
    if (summaryTotalFee) summaryTotalFee.textContent = `₹${totalFee.toLocaleString('en-IN')}`;
    if (buttonTotalFee) buttonTotalFee.textContent = `₹${totalFee.toLocaleString('en-IN')}`;
  }

  durationRadios.forEach((r) => {
    r.addEventListener('change', () => {
      if (r.checked) updatePricing(r.value);
    });
  });

  // Slot buttons with unavailable slot simulation
  const slotButtons = studio.querySelectorAll('.slot-select-btn');
  const slotAlert = studio.querySelector('[data-slot-alert]');

  slotButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isAvailable = btn.getAttribute('data-slot-available') === 'true';
      if (!isAvailable) {
        if (slotAlert) slotAlert.hidden = false;
        slotButtons.forEach((b) => b.classList.remove('is-selected'));
      } else {
        if (slotAlert) slotAlert.hidden = true;
        slotButtons.forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
      }
    });
  });

  // Simulated Payment & Confirmation
  const confirmBtn = studio.querySelector('[data-action="confirm-simulated-booking"]');
  const failCheckbox = studio.querySelector('[data-simulate-payment-failure]');
  const paymentErrorAlert = studio.querySelector('[data-payment-error]');
  const confModal = studio.querySelector('[data-booking-confirmation-modal]');

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      // 1. Check if failure simulation is active
      if (failCheckbox && failCheckbox.checked) {
        if (paymentErrorAlert) {
          paymentErrorAlert.hidden = false;
          paymentErrorAlert.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      if (paymentErrorAlert) paymentErrorAlert.hidden = true;

      // 2. Generate new simulated booking
      const refNum = `VST-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const proShare = Math.round(totalFee * 0.85);
      const platformShare = totalFee - proShare;
      const budgetSelect = studio.querySelector('[data-book-budget]');
      const scopeInput = studio.querySelector('[data-book-scope]');
      const timelineSelect = studio.querySelector('[data-book-timeline]');

      const newBooking = {
        id: `bk-${Date.now()}`,
        bookingReference: refNum,
        professionalId: pro.id,
        duration: selectedDuration,
        date: 'Upcoming Scheduled Date',
        time: '11:00 AM IST',
        fee: totalFee,
        professionalFee: proShare,
        platformCommission: platformShare,
        escrowProtected: true,
        projectBudget: budgetSelect ? budgetSelect.value : '₹20L – ₹50L',
        scope: scopeInput ? scopeInput.value : 'Project Consultation',
        timeline: timelineSelect ? timelineSelect.value : '1 – 3 Months',
        status: 'upcoming',
        paymentStatus: 'simulated_escrow_held'
      };

      const clientState = getClientState();
      clientState.bookings = [newBooking, ...(clientState.bookings || [])];
      clientState.activities = [
        {
          id: `act-${Date.now()}`,
          type: 'booking_confirmed',
          title: 'Consultation Confirmed',
          description: `Booked ${selectedDuration}-min video consultation with ${pro.name}.`,
          timestamp: 'Just now',
          link: '/client/consultations'
        },
        ...(clientState.activities || [])
      ];
      saveClientState(clientState);

      // 3. Open confirmation dialog
      if (confModal) {
        const refEl = confModal.querySelector('[data-conf-ref]');
        const durEl = confModal.querySelector('[data-conf-duration]');
        const feeEl = confModal.querySelector('[data-conf-fee]');
        if (refEl) refEl.textContent = refNum;
        if (durEl) durEl.textContent = `${selectedDuration} Minutes`;
        if (feeEl) feeEl.textContent = `₹${totalFee.toLocaleString('en-IN')}`;
        confModal.showModal();
      }
    });
  }
}

// -------------------------------------------------------------
// 5. CONSULTATIONS TABS CONTROLLER
// -------------------------------------------------------------
function initConsultationTabs() {
  const tabs = document.querySelectorAll('.consultation-tabs-nav .tab-button');
  if (tabs.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      document.querySelectorAll('.tab-panel').forEach((panel) => {
        const isMatch = panel.getAttribute('data-panel') === target;
        panel.classList.toggle('is-active', isMatch);
        panel.hidden = !isMatch;
      });
    });
  });

  // Cancel consultation demonstration
  document.addEventListener('click', (e) => {
    const cancelBtn = e.target.closest('[data-action="cancel-consultation"]');
    if (cancelBtn) {
      const bId = cancelBtn.getAttribute('data-id');
      const state = getClientState();
      const b = (state.bookings || []).find((x) => x.id === bId);
      if (b) {
        b.status = 'cancelled';
        b.paymentStatus = 'cancelled_refunded';
        state.activities.unshift({
          id: `act-${Date.now()}`,
          type: 'booking_cancelled',
          title: 'Consultation Cancelled',
          description: `Cancelled consultation ${b.bookingReference}. 100% simulated escrow refunded.`,
          timestamp: 'Just now',
          link: '/client/consultations'
        });
        saveClientState(state);
        window.location.reload();
      }
    }
  });
}

// -------------------------------------------------------------
// 6. CLIENT MODE SWITCHER (DEMO HELPER)
// -------------------------------------------------------------
function initClientModeSwitcher() {
  // Select dropdown in header
  const select = document.querySelector('[data-action="switch-client-mode"]');
  if (select) {
    select.addEventListener('change', () => {
      setClientMode(select.value);
      window.location.reload();
    });
  }

  // Buttons in profile settings
  document.querySelectorAll('[data-action="switch-client-mode-btn"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      if (mode) {
        setClientMode(mode);
        window.location.reload();
      }
    });
  });
}

// -------------------------------------------------------------
// 7. CLIENT ACCOUNT PROFILE CONTROLLER (VIEW & EDIT)
// -------------------------------------------------------------
function initClientProfileController() {
  const profileScreen = document.querySelector('[data-profile-screen]');
  if (!profileScreen) return;

  const viewModeEl = profileScreen.querySelector('[data-profile-view-mode]');
  const editModeEl = profileScreen.querySelector('[data-profile-edit-mode]');
  const startEditBtn = profileScreen.querySelector('[data-action="start-edit-profile"]');
  const cancelEditBtn = profileScreen.querySelector('[data-action="cancel-edit-profile"]');
  const form = profileScreen.querySelector('#clientProfileForm');
  const discardModal = profileScreen.querySelector('[data-discard-modal]');
  const toastEl = profileScreen.querySelector('[data-profile-toast]');
  const errorSummary = profileScreen.querySelector('[data-profile-errors]');
  const errorList = profileScreen.querySelector('[data-error-list]');
  const signOutBtn = profileScreen.querySelector('[data-action="client-sign-out"]');

  if (!viewModeEl || !editModeEl || !form) return;

  let isDirty = false;

  function showToast(message) {
    if (!toastEl) return;
    const msgEl = toastEl.querySelector('[data-toast-msg]');
    if (msgEl) msgEl.textContent = message;
    toastEl.hidden = false;
    setTimeout(() => {
      toastEl.hidden = true;
    }, 3500);
  }

  function clearFormErrors() {
    if (errorSummary) errorSummary.hidden = true;
    if (errorList) errorList.innerHTML = '';
    form.querySelectorAll('.field-error-msg').forEach((el) => {
      el.hidden = true;
      el.textContent = '';
    });
    form.querySelectorAll('.has-error').forEach((el) => {
      el.classList.remove('has-error');
      el.removeAttribute('aria-invalid');
    });
  }

  function showFormErrors(errors) {
    clearFormErrors();
    const errorKeys = Object.keys(errors);
    if (errorKeys.length === 0) return;

    if (errorList) {
      errorList.innerHTML = errorKeys.map((key) => `<li>${errors[key]}</li>`).join('');
    }
    if (errorSummary) {
      errorSummary.hidden = false;
      errorSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    errorKeys.forEach((key) => {
      const errEl = form.querySelector(`[data-field-error="${key}"]`);
      if (errEl) {
        errEl.textContent = errors[key];
        errEl.hidden = false;
      }
      const inputEl = form.querySelector(`[name="${key}"]`);
      if (inputEl) {
        inputEl.classList.add('has-error');
        inputEl.setAttribute('aria-invalid', 'true');
      }
    });

    const firstInput = form.querySelector(`[name="${errorKeys[0]}"]`);
    if (firstInput) firstInput.focus();
  }

  // 1. Start editing
  if (startEditBtn) {
    startEditBtn.addEventListener('click', () => {
      viewModeEl.hidden = true;
      editModeEl.hidden = false;
      isDirty = false;
      clearFormErrors();
      const firstInput = form.querySelector('#profFullName');
      if (firstInput) firstInput.focus();
    });
  }

  // 2. Track dirty state
  form.addEventListener('input', () => {
    isDirty = true;
  });
  form.addEventListener('change', () => {
    isDirty = true;
  });

  // 3. Cancel editing
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      if (isDirty && discardModal) {
        discardModal.hidden = false;
      } else {
        exitEditMode();
      }
    });
  }

  function exitEditMode() {
    isDirty = false;
    clearFormErrors();
    if (discardModal) discardModal.hidden = true;
    editModeEl.hidden = true;
    viewModeEl.hidden = false;
  }

  // 4. Discard modal actions
  profileScreen.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="keep-editing"]')) {
      if (discardModal) discardModal.hidden = true;
    }
    if (e.target.closest('[data-action="confirm-discard"]')) {
      exitEditMode();
      showToast('Changes discarded.');
    }
  });

  // 5. Submit form & save
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const updatedProfile = {
      ...getClientProfile(),
      fullName: (formData.get('fullName') || '').trim(),
      email: (formData.get('email') || '').trim(),
      phone: (formData.get('phone') || '').trim(),
      city: formData.get('city') || 'New Delhi',
      locality: (formData.get('locality') || '').trim(),
      preferredCategories: formData.getAll('preferredCategories'),
      serviceInterests: formData.getAll('serviceInterests'),
      projectType: formData.get('projectType') || 'Residential Villa Renovation',
      approxBudget: formData.get('approxBudget') || '₹35L – ₹75L',
      expectedTimeline: formData.get('expectedTimeline') || '1–3 months',
      notifyEmailBooking: formData.get('notifyEmailBooking') !== null,
      notifyEmailReminders: formData.get('notifyEmailReminders') !== null,
      notifySmsWhatsapp: formData.get('notifySmsWhatsapp') !== null,
      notifyProductUpdates: formData.get('notifyProductUpdates') !== null
    };

    const validation = validateClientProfile(updatedProfile);
    if (!validation.isValid) {
      showFormErrors(validation.errors);
      return;
    }

    clearFormErrors();
    const submitBtn = form.querySelector('[data-action="submit-profile-form"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Saving...';
    }

    setTimeout(() => {
      saveClientProfile(updatedProfile);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Changes';
      }
      exitEditMode();
      showToast('Profile preferences updated successfully.');
      window.location.reload();
    }, 200);
  });

  // 6. Sign out demo simulation
  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      if (confirm('Sign out of demo client account? This will reset local session storage.')) {
        resetClientProfile();
        showToast('Signed out of demo client account. Session refreshed.');
        setTimeout(() => {
          window.location.href = '/clients';
        }, 300);
      }
    });
  }
}

// -------------------------------------------------------------
// 8. CLIENT BRIEFS & OFFERS CONTROLLER
// -------------------------------------------------------------
function initClientBriefsController() {
  const toggleBtn = document.querySelector('[data-toggle-new-brief]');
  const cancelBtn = document.querySelector('[data-cancel-new-brief]');
  const drawer = document.querySelector('[data-new-brief-drawer]');
  const form = document.querySelector('[data-form-create-brief]');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.hidden = !drawer.hidden;
      if (!drawer.hidden) {
        drawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (cancelBtn && drawer) {
    cancelBtn.addEventListener('click', () => {
      drawer.hidden = true;
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);

      saveClientBrief({
        title: fd.get('title'),
        category: fd.get('category'),
        locality: fd.get('locality'),
        city: (fd.get('locality') || '').includes('Noida') ? 'Noida' : (fd.get('locality') || '').includes('Gurugram') ? 'Gurugram' : (fd.get('locality') || '').includes('Faridabad') ? 'Faridabad' : 'South Delhi',
        projectType: fd.get('projectType'),
        plotSize: fd.get('plotSize'),
        budgetRange: fd.get('budgetRange'),
        targetTimeline: fd.get('targetTimeline'),
        privacy: fd.get('privacy'),
        description: fd.get('description'),
        clientDisplayName: 'Client Project'
      });

      alert('Your project brief has been published! Verified professionals in your area can now review and send consultation proposals.');
      window.location.reload();
    });
  }

  // Handle client accepting or declining professional offers
  document.addEventListener('click', (e) => {
    const acceptBtn = e.target.closest('[data-client-accept-offer]');
    if (acceptBtn) {
      const offerId = acceptBtn.getAttribute('data-client-accept-offer');
      if (confirm('Accept this consultation proposal? The booking will be confirmed into escrow and scheduled.')) {
        updateOfferStatus(offerId, 'accepted');
        alert('Proposal accepted! Your video consultation slot is confirmed. Redirecting to My Consultations...');
        window.location.href = '/client/consultations';
      }
      return;
    }

    const declineBtn = e.target.closest('[data-client-decline-offer]');
    if (declineBtn) {
      const offerId = declineBtn.getAttribute('data-client-decline-offer');
      if (confirm('Decline this proposal?')) {
        updateOfferStatus(offerId, 'declined');
        window.location.reload();
      }
      return;
    }
  });
}


