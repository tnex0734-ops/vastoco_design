import { icon } from './icons.js';
import { escapeHTML } from './utils.js';

export const ALL_PAGES = [
  {
    group: 'Main Gateway & Overview',
    items: [
      { name: 'Axis Landing & Doors', path: '/', badge: 'Gateway Hero & Dual Doors', desc: 'Main landing page with interactive architectural monitor stage' },
      { name: 'Client Discovery Home', path: '/clients', badge: 'Discovery First', desc: 'Instant search, category pills, and professional cards above fold' },
      { name: 'For Professionals Portal', path: '/professionals', badge: 'Practice Growth', desc: 'Platform benefits, upfront 85% payout & 15% platform split' }
    ]
  },
  {
    group: 'Client Experience & Marketplace',
    items: [
      { name: 'Client Discovery & Directory', path: '/clients', badge: 'Search & Filters', desc: 'Search, filter by locality & discipline, compare tray dock' },
      { name: 'Client Project Briefs', path: '/client/briefs', badge: 'Active RFPs', desc: 'Client project brief tracker with incoming professional offers' },
      { name: 'Side-by-Side Comparison', path: '/client/compare', badge: '2-Pro Matrix', desc: 'Side-by-side comparison matrix of shortlisted professionals' },
      { name: 'Saved Professionals', path: '/client/saved', badge: 'Shortlist', desc: 'Bookmarked architect and designer profiles for easy access' },
      { name: 'Client Consultations', path: '/client/consultations', badge: 'Meeting Portal', desc: 'Upcoming, completed, and cancelled video consultations' },
      { name: 'Booking Studio', path: '/client/book/naina-kapoor', badge: 'Slot Picker', desc: '6-step booking studio with upfront fees and slot simulation' },
      { name: 'Professional Monograph', path: '/client/professionals/naina-kapoor', badge: 'Monograph & Reviews', desc: 'Ar. Naina Kapoor: portfolio, reviews, COA status, and fees' },
      { name: 'Client Profile & Account', path: '/client/profile', badge: 'Preferences & Edit', desc: 'Client account settings, field validation, and discard modal' },
      { name: 'Client Activity Timeline', path: '/client/activity', badge: 'Escrow Ledger', desc: 'Audit timeline of all client interactions and payments' },
      { name: 'Directory Explorer', path: '/clients/explore', badge: 'Explore View', desc: 'Full directory view with grid layout and category filters' }
    ]
  },
  {
    group: 'Professional Workspace (Wispr Flow Redesign)',
    items: [
      { name: 'Practice Overview Dashboard', path: '/professional', badge: 'Daily Triage', desc: 'Editorial greeting, next session spotlight, 3 KPIs, activity chart' },
      { name: 'Client Project Briefs Feed', path: '/professional/briefs', badge: 'Matching RFPs', desc: 'Live RFP marketplace with discipline, budget, and scope match tags' },
      { name: 'Brief Details & Offer Composer', path: '/professional/briefs/brief-noida-44', badge: 'Submit Proposal', desc: 'Dedicated brief view with scope details and offer composer' },
      { name: 'Proposal Pipeline & Offers', path: '/professional/offers', badge: '3-Stage Funnel', desc: 'Sent, Viewed, and Booked proposal tracking with escrow value' },
      { name: 'Consultations & Schedule', path: '/professional/consultations', badge: 'Agenda Timeline', desc: 'Conflict-checked schedule agenda with one-click video room join' },
      { name: 'Weekly Calendar Matrix', path: '/professional/calendar', badge: '7-Day Matrix', desc: 'Interactive weekly grid with morning, afternoon & evening slots' },
      { name: 'Monograph Portfolio', path: '/professional/portfolio', badge: 'Architectural Archive', desc: 'Curate high-resolution project monographs with add/delete' },
      { name: 'Statutory COA Verification', path: '/professional/verification', badge: 'COA Accreditation', desc: 'License accreditation tracker, verification steps, and audit status' },
      { name: 'Practice Profile & Rates', path: '/professional/profile', badge: 'Bio & Availability', desc: 'Practice biography, hourly consultation fees, and service areas' },
      { name: 'Payout & Escrow Settings', path: '/professional/settings', badge: 'Direct Deposit 85%', desc: 'Verified bank details, escrow payout cycles, and notification rules' }
    ]
  },
  {
    group: 'Authentication, Onboarding & States',
    items: [
      { name: 'Sign In', path: '/signin', badge: 'Credential Recovery', desc: 'Authentication with simulated password reset and demo login' },
      { name: 'Sign Up', path: '/signup', badge: 'Role-Preserving', desc: 'Client and practitioner registration preserving intent' },
      { name: 'Professional Onboarding', path: '/professionals/join', badge: '4-Step Setup', desc: 'Account, practice credentials, COA checklist, portfolio upload' },
      { name: '404 Error State', path: '/not-found', badge: 'System State', desc: 'Graceful error fallback page with recovery navigation' }
    ]
  }
];

export function initPageSwitcher() {
  if (document.getElementById('vstPageSwitcherBtn')) return;

  const currentPath = window.location.pathname;
  let totalCount = 0;
  ALL_PAGES.forEach(g => { totalCount += g.items.length; });

  // 1. Inject Floating Button
  const button = document.createElement('button');
  button.id = 'vstPageSwitcherBtn';
  button.className = 'vst-switcher-btn';
  button.type = 'button';
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'Open Vastoco page switcher');
  button.setAttribute('title', 'Switch pages (Alt + P)');
  button.innerHTML = `
    <span class="vst-switcher-btn-icon">${icon('compass', '', 18)}</span>
    <span class="vst-switcher-btn-label">All Pages</span>
    <span class="vst-switcher-btn-badge">${totalCount}</span>
    <span class="vst-switcher-btn-kbd">Alt+P</span>
  `;

  // 2. Inject Dialog Overlay
  const overlay = document.createElement('div');
  overlay.id = 'vstPageSwitcherOverlay';
  overlay.className = 'vst-switcher-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="vst-switcher-backdrop" data-vst-close></div>
    <div class="vst-switcher-dialog" role="dialog" aria-modal="true" aria-labelledby="vstSwitcherTitle">
      <div class="vst-switcher-head">
        <div class="vst-switcher-title-wrap">
          <div class="vst-switcher-header-icon">${icon('compass', '', 20)}</div>
          <div>
            <h2 id="vstSwitcherTitle" class="vst-switcher-title">Vastoco Page Navigator</h2>
            <p class="vst-switcher-desc">Instant jump to any screen across Client, Professional, and Gateway surfaces.</p>
          </div>
        </div>
        <button type="button" class="vst-switcher-close" data-vst-close aria-label="Close page navigator">
          ${icon('close', '', 18)}
        </button>
      </div>

      <div class="vst-switcher-search-box">
        <span class="vst-search-icon">${icon('search', '', 16)}</span>
        <input type="text" class="vst-switcher-input" id="vstSwitcherSearch" placeholder="Type to filter pages (e.g. briefs, naina, offers, schedule)..." autocomplete="off" />
        <button type="button" class="vst-switcher-clear" id="vstSwitcherClear" hidden aria-label="Clear filter">
          ${icon('close', '', 14)}
        </button>
      </div>

      <div class="vst-switcher-body" id="vstSwitcherBody">
        ${renderSwitcherList('', currentPath)}
      </div>

      <div class="vst-switcher-foot">
        <span class="vst-switcher-foot-tip">Press <kbd>Alt</kbd> + <kbd>P</kbd> or <kbd>Esc</kbd> anytime to toggle · Click any link to navigate</span>
        <span class="vst-switcher-foot-brand">Vastoco Design Hackathon 2026</span>
      </div>
    </div>
  `;

  document.body.appendChild(button);
  document.body.appendChild(overlay);

  const searchInput = overlay.querySelector('#vstSwitcherSearch');
  const clearBtn = overlay.querySelector('#vstSwitcherClear');
  const bodyEl = overlay.querySelector('#vstSwitcherBody');

  function openSwitcher() {
    overlay.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      searchInput?.focus();
    }, 50);
  }

  function closeSwitcher() {
    overlay.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleSwitcher() {
    if (overlay.hidden) openSwitcher();
    else closeSwitcher();
  }

  button.addEventListener('click', toggleSwitcher);

  overlay.querySelectorAll('[data-vst-close]').forEach(el => {
    el.addEventListener('click', closeSwitcher);
  });

  // Filter input logic
  searchInput?.addEventListener('input', (e) => {
    const q = (e.target.value || '').trim();
    if (clearBtn) clearBtn.hidden = !q;
    if (bodyEl) {
      bodyEl.innerHTML = renderSwitcherList(q, window.location.pathname);
    }
  });

  clearBtn?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    clearBtn.hidden = true;
    if (bodyEl) {
      bodyEl.innerHTML = renderSwitcherList('', window.location.pathname);
    }
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Alt + P or Option + P
    if (e.altKey && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      toggleSwitcher();
    }
    // Escape to close
    if (e.key === 'Escape' && !overlay.hidden) {
      e.preventDefault();
      closeSwitcher();
    }
  });
}

function renderSwitcherList(query = '', currentPath = '') {
  const q = query.toLowerCase().trim();
  let html = '';
  let totalMatches = 0;

  ALL_PAGES.forEach(group => {
    const matchingItems = group.items.filter(item => {
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.path.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );
    });

    if (matchingItems.length > 0) {
      totalMatches += matchingItems.length;
      html += `
        <div class="vst-switcher-group">
          <div class="vst-switcher-group-title">
            <span>${escapeHTML(group.group)}</span>
            <span class="vst-switcher-group-count">${matchingItems.length}</span>
          </div>
          <div class="vst-switcher-grid">
            ${matchingItems.map(item => {
              const isActive = currentPath === item.path;
              return `
                <a href="${item.path}" class="vst-switcher-card ${isActive ? 'is-active' : ''}">
                  <div class="vst-switcher-card-top">
                    <strong class="vst-switcher-card-name">${escapeHTML(item.name)}</strong>
                    <span class="vst-switcher-card-badge ${isActive ? 'is-active' : ''}">${isActive ? 'Current' : escapeHTML(item.badge)}</span>
                  </div>
                  <p class="vst-switcher-card-desc">${escapeHTML(item.desc)}</p>
                  <div class="vst-switcher-card-path">
                    <code>${escapeHTML(item.path)}</code>
                    <span class="vst-switcher-card-arrow">${icon('arrow', '', 12)}</span>
                  </div>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
  });

  if (totalMatches === 0) {
    html = `
      <div class="vst-switcher-empty">
        <p>No pages matching <strong>"${escapeHTML(query)}"</strong></p>
        <small>Try searching for "brief", "offers", "consultations", "naina", or "profile".</small>
      </div>
    `;
  }

  return html;
}
