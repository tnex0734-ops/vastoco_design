// Professional Authenticated Workspace and Public Portal Views
// Implements the two-sided marketplace for Architecture, Interior Design & Vastu Professionals
// Strictly brand compliant: #3C2415 Espresso, #DDD9CE Pale Oak. Zero third-party dependencies.

import { icon } from './icons.js';
import { escapeHTML } from './utils.js';
import {
  getClientBriefs,
  getClientBriefById,
  getProOffers,
  getProSchedule,
  getProPortfolio,
  getProVerificationProfile,
  calculateFeeBreakdown
} from './marketplaceData.js';

// Reusable Top Utility Bar for Professional Workspace (Wispr-inspired, Single Header)
export function proAppHeader(activeRoute = '/professional') {
  const profile = getProVerificationProfile();

  const routeTitles = {
    '/professional': 'Practice Overview',
    '/professional/briefs': 'Client Project Briefs',
    '/professional/offers': 'Sent Proposals Pipeline',
    '/professional/consultations': 'Consultations & Schedule',
    '/professional/calendar': 'Consultations & Schedule',
    '/professional/portfolio': 'Portfolio Work Monographs',
    '/professional/profile': 'Practice Profile & Rates',
    '/professional/verification': 'COA Statutory Verification',
    '/professional/settings': 'Payouts & Settings'
  };
  const pageTitle = routeTitles[activeRoute] || (activeRoute.startsWith('/professional/briefs/') ? 'Brief Details & Proposal' : 'Practice Workspace');

  return `
    <header class="pro-app-header" role="banner">
      <div class="pro-header-container">
        <div class="pro-header-left">
          <a href="/professional" class="pro-brand-logo" aria-label="Vastoco Professional Workspace">
            <span class="pro-brand-name">VASTOCO</span>
          </a>
          <span class="pro-header-divider" aria-hidden="true">/</span>
          <span class="pro-header-breadcrumb">${escapeHTML(pageTitle)}</span>
        </div>

        <div class="pro-header-search">
          <span class="pro-search-icon" aria-hidden="true">${icon('search', '', 14)}</span>
          <input type="search" placeholder="Search briefs, clients, projects... [⌘K]" aria-label="Search practice records" class="pro-search-input" />
        </div>

        <div class="pro-header-actions">
          <a href="/client/professionals/naina-kapoor" class="button button--outline button--small" target="_blank" title="View your public monograph as clients see it">
            ${icon('user', '', 13)} Public Monograph
          </a>
          <button type="button" class="pro-icon-btn" aria-label="Notifications (3 new)" title="3 new client notifications">
            ${icon('bell', '', 15)}
            <span class="pro-notification-dot" aria-hidden="true"></span>
          </button>
          <a href="/professional/settings" class="pro-avatar-chip" title="Account & Payout Settings">
            <span class="pro-avatar-initials">NK</span>
            <span class="pro-avatar-name">${escapeHTML(profile.fullName)}</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

// Reusable Desktop Workspace Sidebar
export function proSidebar(activeRoute = '/professional') {
  const profile = getProVerificationProfile();
  const schedule = getProSchedule();
  const briefs = getClientBriefs();
  const offers = getProOffers();
  const activeOffersCount = offers.filter(o => o.status === 'sent').length;

  return `
    <aside class="pro-sidebar" aria-label="Practice tools sidebar">
      <div class="pro-sidebar-brand">
        <span class="pro-sidebar-kicker">Professional Practice</span>
        <strong class="pro-sidebar-name">${escapeHTML(profile.practiceName)}</strong>
        <p class="pro-sidebar-sub">${escapeHTML(profile.fullName)} · Delhi NCR</p>
      </div>

      <nav class="pro-sidebar-menu">
        <span class="pro-sidebar-heading">Workspace</span>
        <a href="/professional" class="pro-sidebar-item ${activeRoute === '/professional' ? 'is-active' : ''}">
          ${icon('user', '', 16)} <span>Overview</span>
        </a>
        <a href="/professional/briefs" class="pro-sidebar-item ${activeRoute.startsWith('/professional/briefs') ? 'is-active' : ''}">
          ${icon('compass', '', 16)} <span>Client Briefs</span>
          <span class="pro-badge-counter">${briefs.length}</span>
        </a>
        <a href="/professional/offers" class="pro-sidebar-item ${activeRoute === '/professional/offers' ? 'is-active' : ''}">
          ${icon('file', '', 16)} <span>Sent Offers</span>
          ${activeOffersCount > 0 ? `<span class="pro-badge-counter">${activeOffersCount}</span>` : ''}
        </a>
        <a href="/professional/consultations" class="pro-sidebar-item ${activeRoute === '/professional/consultations' || activeRoute === '/professional/calendar' ? 'is-active' : ''}">
          ${icon('video', '', 16)} <span>Consultations</span>
          <span class="pro-badge-counter">${schedule.length}</span>
        </a>

        <span class="pro-sidebar-heading">My Practice</span>
        <a href="/professional/portfolio" class="pro-sidebar-item ${activeRoute === '/professional/portfolio' ? 'is-active' : ''}">
          ${icon('layers', '', 16)} <span>Portfolio</span>
        </a>
        <a href="/professional/profile" class="pro-sidebar-item ${activeRoute === '/professional/profile' ? 'is-active' : ''}">
          ${icon('user', '', 16)} <span>Public Profile</span>
        </a>
        <a href="/professional/verification" class="pro-sidebar-item ${activeRoute === '/professional/verification' ? 'is-active' : ''}">
          ${icon('shield', '', 16)} <span>Verification</span>
        </a>

        <span class="pro-sidebar-heading">Account</span>
        <a href="/professional/settings#payouts" class="pro-sidebar-item">
          ${icon('wallet', '', 16)} <span>Payouts</span>
        </a>
        <a href="/professional/settings" class="pro-sidebar-item ${activeRoute === '/professional/settings' ? 'is-active' : ''}">
          ${icon('lock', '', 16)} <span>Settings</span>
        </a>
      </nav>

      <div class="pro-sidebar-economics">
        <div class="pro-econ-badge">
          <span class="pro-econ-label">Platform Economics</span>
          <span class="pro-econ-split"><strong>85%</strong> Professional Payout</span>
        </div>
        <p class="pro-econ-sub">15% commission covers escrow deposit protection, video infrastructure & COA verification. Zero listing fees.</p>
      </div>
    </aside>
  `;
}

// 5-Destination Bottom Navigation for Mobile Devices
export function proMobileBottomNav(activeRoute = '/professional') {
  return `
    <nav class="pro-mobile-bottom-nav" aria-label="Mobile workspace navigation">
      <a href="/professional" class="pro-mobile-nav-item ${activeRoute === '/professional' ? 'is-active' : ''}">
        ${icon('user', '', 18)}
        <span>Home</span>
      </a>
      <a href="/professional/briefs" class="pro-mobile-nav-item ${activeRoute.startsWith('/professional/briefs') ? 'is-active' : ''}">
        ${icon('compass', '', 18)}
        <span>Briefs</span>
      </a>
      <a href="/professional/offers" class="pro-mobile-nav-item ${activeRoute === '/professional/offers' ? 'is-active' : ''}">
        ${icon('file', '', 18)}
        <span>Offers</span>
      </a>
      <a href="/professional/consultations" class="pro-mobile-nav-item ${activeRoute === '/professional/consultations' || activeRoute === '/professional/calendar' ? 'is-active' : ''}">
        ${icon('video', '', 18)}
        <span>Meetings</span>
      </a>
      <a href="/professional/profile" class="pro-mobile-nav-item ${activeRoute === '/professional/profile' || activeRoute === '/professional/settings' ? 'is-active' : ''}">
        ${icon('user', '', 18)}
        <span>Profile</span>
      </a>
    </nav>
  `;
}

// Shell wrapper for all professional workspace pages
export function proWorkspaceShell(contentHtml, activeRoute = '/professional') {
  return `
    <div class="pro-workspace-root">
      ${proAppHeader(activeRoute)}
      <div class="pro-workspace-body">
        ${proSidebar(activeRoute)}
        <main class="pro-main-content" id="pro-content">
          ${contentHtml}
        </main>
      </div>
      ${proMobileBottomNav(activeRoute)}
    </div>
  `;
}

// ==========================================================
// 1. PROFESSIONAL OVERVIEW DASHBOARD (/professional)
// ==========================================================
export function proOverviewDashboardPage() {
  const profile = getProVerificationProfile();
  const schedule = getProSchedule();
  const briefs = getClientBriefs();
  const offers = getProOffers();
  const nextSession = schedule[0] || null;
  const recentBriefs = briefs.slice(0, 3);
  const activeOffers = offers.filter(o => o.status === 'sent');
  const activeOffersTotalPayout = activeOffers.reduce((sum, o) => sum + (o.proPayout || 0), 0);

  // Practice readiness checklist items (dynamically computed)
  const readinessItems = [
    { label: 'Practice Profile & Rates', desc: 'Configured standard 15, 30 & 45 min rates', done: true },
    { label: 'Monograph Portfolio', desc: `${getProPortfolio().length} verified architectural projects published`, done: getProPortfolio().length > 0 },
    { label: 'Statutory Verification', desc: `COA ${profile.coaRegistrationNumber} active through Dec 2028`, done: profile.coaRegisterStatus.includes('Active') },
    { label: 'Consultation Calendar', desc: 'Video room & availability active for Delhi NCR', done: schedule.length > 0 }
  ];
  const completedCount = readinessItems.filter(i => i.done).length;
  const readinessPct = Math.round((completedCount / readinessItems.length) * 100);

  const content = `
    <div class="pro-dashboard-page">
      <!-- Calm Editorial Greeting Header -->
      <header class="pro-overview-heading">
        <div class="pro-greeting-block">
          <p class="pro-greeting-kicker">Practice Workspace · ${escapeHTML(profile.practiceName)}</p>
          <h1>Good morning, ${escapeHTML(profile.fullName)}.</h1>
          <p class="pro-greeting-sub">Here is your practice agenda, active proposals, and new matching client briefs across Delhi NCR for today.</p>
        </div>

        <div class="pro-status-meta-bar" aria-label="Practice context">
          <div class="pro-status-chip">
            <span class="pro-status-dot" aria-hidden="true"></span>
            <strong>${escapeHTML(profile.practiceName)}</strong> · ${escapeHTML(profile.discipline)}
          </div>
          <span class="pro-status-divider" aria-hidden="true">·</span>
          <span class="pro-verification-chip">
            ${icon('shield', '', 13)} COA ${escapeHTML(profile.coaRegistrationNumber)} · Active
          </span>
          <span class="pro-status-divider" aria-hidden="true">·</span>
          <a href="/client/professionals/naina-kapoor" class="pro-text-link" target="_blank" title="View public client-facing monograph">
            View public monograph &rarr;
          </a>
        </div>
      </header>

      <!-- Three Primary Indicators Only (Phase 3 Strict Requirement) -->
      <section class="pro-primary-indicators" aria-label="Primary daily indicators">
        <a href="/professional/consultations" class="pro-indicator-card">
          <span class="indicator-label">Today's Consultations</span>
          <div class="indicator-metric-row">
            <strong class="indicator-number">${schedule.length}</strong>
            <span class="indicator-pill">${schedule.length > 0 ? 'Confirmed' : 'None today'}</span>
          </div>
          <p class="indicator-context">Next: ${nextSession ? nextSession.displaySlot : 'No sessions today'}</p>
        </a>

        <a href="/professional/briefs" class="pro-indicator-card">
          <span class="indicator-label">New Matching Client Briefs</span>
          <div class="indicator-metric-row">
            <strong class="indicator-number">${briefs.length}</strong>
            <span class="indicator-pill indicator-pill--accent">New Briefs</span>
          </div>
          <p class="indicator-context">3 active in Noida & South Delhi</p>
        </a>

        <a href="/professional/offers" class="pro-indicator-card">
          <span class="indicator-label">Offers Awaiting Response</span>
          <div class="indicator-metric-row">
            <strong class="indicator-number">${activeOffers.length}</strong>
            <span class="indicator-pill">Awaiting Review</span>
          </div>
          <p class="indicator-context">₹${activeOffersTotalPayout.toLocaleString('en-IN')} potential net payout (85%)</p>
        </a>
      </section>

      <!-- Two-Column Operational Layout -->
      <div class="pro-dashboard-columns">
        <!-- Main Column: Consolidated Schedule & Matching Briefs -->
        <div class="pro-primary-column">
          <!-- Consolidated Schedule Component (No duplication of next session!) -->
          <section class="pro-surface-card pro-agenda-consolidated">
            <div class="pro-card-header">
              <div>
                <h2>Consultations & Today's Schedule</h2>
                <p class="pro-card-sub">Confirmed client bookings with escrow deposit protection · Asia/Kolkata</p>
              </div>
              <a href="/professional/consultations" class="pro-text-link">Manage full schedule &rarr;</a>
            </div>

            ${nextSession ? `
              <!-- Spotlight: Next Upcoming Session -->
              <div class="pro-spotlight-session">
                <div class="spotlight-tag-row">
                  <span class="spotlight-badge">${icon('video', '', 12)} Next Scheduled Video Session</span>
                  <span class="spotlight-escrow-pill">${icon('shield', '', 11)} Escrow Protected</span>
                </div>

                <div class="spotlight-main-content">
                  <div class="spotlight-time-block">
                    <strong class="spotlight-time">${nextSession.scheduledTimeStart}</strong>
                    <span class="spotlight-duration">${nextSession.durationMinutes} min</span>
                  </div>
                  <div class="spotlight-details">
                    <h3>${escapeHTML(nextSession.projectTopic)}</h3>
                    <p class="spotlight-client">
                      Client: <strong>${escapeHTML(nextSession.clientDisplayName)}</strong> · ${escapeHTML(nextSession.clientLocality)}
                    </p>
                    <p class="spotlight-notes">${escapeHTML(nextSession.notes)}</p>
                  </div>
                  <div class="spotlight-payout-box">
                    <div class="spotlight-fee-row">
                      <span class="fee-lbl">Client fee:</span>
                      <span class="fee-val">₹${nextSession.feeGross.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="spotlight-payout-row">
                      <span class="payout-lbl">Your 85%:</span>
                      <strong class="payout-val">₹${nextSession.proPayout.toLocaleString('en-IN')}</strong>
                    </div>
                    <button type="button" class="button button--dark button--small" data-join-meeting="${nextSession.id}" style="margin-top: 8px;">
                      Simulate Video Call ${icon('arrow', '', 13)}
                    </button>
                  </div>
                </div>
              </div>
            ` : `
              <div class="pro-empty-agenda-state">
                ${icon('calendar', '', 28)}
                <p>No video consultations scheduled for today.</p>
                <a href="/professional/profile" class="button button--outline button--small">Configure Availability Rates</a>
              </div>
            `}

            <!-- Chronological Remaining Sessions Table -->
            ${schedule.length > 1 ? `
              <div class="pro-remaining-sessions">
                <h3 class="pro-subheading-label">Subsequent Upcoming Consultations</h3>
                <div class="pro-sessions-list">
                  ${schedule.slice(1).map(item => `
                    <div class="pro-session-row ${item.hasConflict ? 'is-conflict' : ''}">
                      <div class="session-col-time">
                        <strong>${item.scheduledTimeStart}</strong>
                        <small>${item.durationMinutes}m · ${item.scheduledDate}</small>
                      </div>
                      <div class="session-col-topic">
                        <h4>${escapeHTML(item.projectTopic)}</h4>
                        <p>${escapeHTML(item.clientDisplayName)} · ${escapeHTML(item.clientLocality)}</p>
                      </div>
                      <div class="session-col-payout">
                        <small>Net 85%</small>
                        <strong>₹${item.proPayout.toLocaleString('en-IN')}</strong>
                      </div>
                      <div class="session-col-action">
                        <span class="status-pill status-pill--confirmed">${icon('check', '', 11)} Confirmed</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </section>

          <!-- Matching Client Briefs Previews -->
          <section class="pro-surface-card pro-briefs-preview-box">
            <div class="pro-card-header">
              <div>
                <h2>New Matching Client Briefs</h2>
                <p class="pro-card-sub">Qualified homeowner project scopes submitted in Delhi NCR</p>
              </div>
              <a href="/professional/briefs" class="pro-text-link">View all (${briefs.length}) &rarr;</a>
            </div>

            <div class="pro-briefs-preview-list">
              ${recentBriefs.map(brief => `
                <article class="pro-brief-preview-card">
                  <div class="brief-preview-kicker">
                    <span class="brief-cat-pill">${escapeHTML(brief.category)}</span>
                    <span class="brief-loc-pill">${escapeHTML(brief.locality)}</span>
                    <span class="brief-match-reason">${icon('check', '', 11)} Matches 14 biophilic villas</span>
                    <span class="brief-date-label">${escapeHTML(brief.postedDate)}</span>
                  </div>

                  <h3 class="brief-preview-title">
                    <a href="/professional/briefs/${brief.id}">${escapeHTML(brief.title)}</a>
                  </h3>
                  <p class="brief-preview-desc">${escapeHTML(brief.description.slice(0, 135))}...</p>

                  <div class="brief-preview-footer">
                    <div class="brief-preview-specs">
                      <span><strong>Budget:</strong> ${escapeHTML(brief.budgetRange)}</span>
                      <span><strong>Timeline:</strong> ${escapeHTML(brief.targetTimeline)}</span>
                    </div>
                    <a href="/professional/briefs/${brief.id}" class="button button--outline button--small">
                      View Brief & Send Offer ${icon('arrow', '', 12)}
                    </a>
                  </div>
                </article>
              `).join('')}
            </div>
          </section>
        </div>

        <!-- Secondary Column: Analytics, Pipeline, Readiness & Payouts -->
        <aside class="pro-secondary-column">
          <!-- Consultation Activity Chart (Phase 4 SVG Bar Chart) -->
          <section class="pro-surface-card pro-analytics-card">
            <div class="pro-card-header">
              <div>
                <h2>Consultation Activity</h2>
                <p class="pro-card-sub">Completed & booked advisory sessions</p>
              </div>
              <span class="pro-chart-time-pill">Last 4 Weeks</span>
            </div>

            <!-- Responsive SVG Bar Chart -->
            <div class="pro-bar-chart-container" aria-label="Weekly consultations bar chart">
              <div class="pro-chart-canvas">
                <svg viewBox="0 0 320 140" class="pro-svg-chart" role="img" aria-label="Bar chart showing weekly consultations: Week 42 (18), Week 43 (22), Week 44 (24), Week 45 (20)">
                  <!-- Horizontal grid guidelines -->
                  <line x1="30" y1="20" x2="310" y2="20" stroke="rgba(60, 36, 21, 0.1)" stroke-dasharray="2 2" />
                  <line x1="30" y1="55" x2="310" y2="55" stroke="rgba(60, 36, 21, 0.1)" stroke-dasharray="2 2" />
                  <line x1="30" y1="90" x2="310" y2="90" stroke="rgba(60, 36, 21, 0.1)" stroke-dasharray="2 2" />
                  <line x1="30" y1="115" x2="310" y2="115" stroke="rgba(60, 36, 21, 0.25)" />

                  <!-- Y-Axis Ticks -->
                  <text x="22" y="24" class="chart-axis-label">25</text>
                  <text x="22" y="59" class="chart-axis-label">15</text>
                  <text x="22" y="94" class="chart-axis-label">5</text>
                  <text x="22" y="118" class="chart-axis-label">0</text>

                  <!-- Bar 1: W42 (18 sessions) -->
                  <rect x="55" y="46" width="34" height="69" rx="2" class="chart-bar chart-bar--muted" />
                  <text x="72" y="40" class="chart-bar-val">18</text>
                  <text x="72" y="130" class="chart-axis-label">W42</text>

                  <!-- Bar 2: W43 (22 sessions) -->
                  <rect x="120" y="31" width="34" height="84" rx="2" class="chart-bar chart-bar--muted" />
                  <text x="137" y="25" class="chart-bar-val">22</text>
                  <text x="137" y="130" class="chart-axis-label">W43</text>

                  <!-- Bar 3: W44 (24 sessions) -->
                  <rect x="185" y="23" width="34" height="92" rx="2" class="chart-bar chart-bar--muted" />
                  <text x="202" y="17" class="chart-bar-val">24</text>
                  <text x="202" y="130" class="chart-axis-label">W44</text>

                  <!-- Bar 4: W45 (Current / 20 sessions) -->
                  <rect x="250" y="38" width="34" height="77" rx="2" class="chart-bar chart-bar--current" />
                  <text x="267" y="32" class="chart-bar-val">20</text>
                  <text x="267" y="130" class="chart-axis-label">W45</text>
                </svg>
              </div>
              <div class="chart-legend-row">
                <span class="legend-item"><span class="legend-dot legend-dot--current"></span> Current Week (20 sessions)</span>
                <span class="legend-item"><span class="legend-dot legend-dot--past"></span> Prior Weeks Average (21.3)</span>
              </div>
              <div class="sr-only">Weekly consultation counts: Week 42: 18, Week 43: 22, Week 44: 24, Week 45: 20 sessions. Total: 84 completed consultations.</div>
            </div>
          </section>

          <!-- Offer Pipeline & Conversion Card -->
          <section class="pro-surface-card pro-pipeline-card">
            <div class="pro-card-header">
              <div>
                <h2>Offer Pipeline</h2>
                <p class="pro-card-sub">Proposal status & client progression</p>
              </div>
              <a href="/professional/offers" class="pro-text-link">Offers pipeline &rarr;</a>
            </div>

            <!-- Segmented Progress Bar -->
            <div class="pro-funnel-track" aria-label="Offer progression funnel">
              <div class="funnel-segment funnel-segment--sent" style="flex: 2;" title="2 Dispatched / Awaiting Review">
                <span class="segment-label">2 Sent</span>
              </div>
              <div class="funnel-segment funnel-segment--viewed" style="flex: 1;" title="1 Viewed by Client">
                <span class="segment-label">1 Viewed</span>
              </div>
              <div class="funnel-segment funnel-segment--accepted" style="flex: 1;" title="1 Accepted & Booked">
                <span class="segment-label">1 Booked</span>
              </div>
            </div>

            <div class="pro-funnel-stats-grid">
              <div class="funnel-stat">
                <span class="stat-num">3</span>
                <span class="stat-lbl">Proposals Dispatched</span>
              </div>
              <div class="funnel-stat">
                <span class="stat-num">2</span>
                <span class="stat-lbl">Awaiting Response</span>
              </div>
              <div class="funnel-stat">
                <span class="stat-num">1</span>
                <span class="stat-lbl">Accepted by Client</span>
              </div>
              <div class="funnel-stat">
                <span class="stat-num">33%</span>
                <span class="stat-lbl">Conversion Rate</span>
              </div>
            </div>
          </section>

          <!-- Net Consultation Earnings Summary Card -->
          <section class="pro-surface-card pro-earnings-card">
            <div class="pro-card-header">
              <div>
                <h2>Consultation Earnings</h2>
                <p class="pro-card-sub">Transparent 85% professional payout</p>
              </div>
              <a href="/professional/settings#payouts" class="pro-text-link">Bank details &rarr;</a>
            </div>

            <div class="pro-earnings-metrics">
              <div class="earnings-hero-row">
                <div>
                  <span class="earnings-hero-lbl">Net Earned Payout (85%)</span>
                  <strong class="earnings-hero-val">₹71,570</strong>
                </div>
                <span class="earnings-payout-cycle">Direct HDFC Transfer</span>
              </div>

              <div class="earnings-breakdown-table">
                <div class="breakdown-row">
                  <span>Gross Client Consultations (84 sessions)</span>
                  <span>₹84,200</span>
                </div>
                <div class="breakdown-row">
                  <span>Vastoco Platform Fee (15% deduction)</span>
                  <span>-₹12,630</span>
                </div>
                <div class="breakdown-row breakdown-row--total">
                  <span>Net Direct Payout to Practice</span>
                  <strong>₹71,570</strong>
                </div>
              </div>

              <p class="earnings-disclaimer">
                ${icon('check', '', 12)} 15% platform deduction covers client video infrastructure, instant escrow protection, and COA statutory auditing. Next automatic bank transfer on <strong>Tuesday, 18 Nov 2026</strong>.
              </p>
            </div>
          </section>

          <!-- Practice Readiness Checklist (Phase 3 Strict Requirement) -->
          <section class="pro-surface-card pro-readiness-card">
            <div class="pro-card-header">
              <div>
                <h2>Practice Readiness</h2>
                <p class="pro-card-sub">Profile completeness & client trust indicators</p>
              </div>
              <span class="pro-readiness-score">${completedCount} of ${readinessItems.length} (${readinessPct}%)</span>
            </div>

            <div class="readiness-progress-track">
              <div class="readiness-progress-bar" style="width: ${readinessPct}%;"></div>
            </div>

            <ul class="readiness-checklist">
              ${readinessItems.map(item => `
                <li class="readiness-item ${item.done ? 'is-done' : ''}">
                  <span class="readiness-icon">${item.done ? icon('check', '', 12) : ''}</span>
                  <div class="readiness-text">
                    <strong>${item.label}</strong>
                    <small>${item.desc}</small>
                  </div>
                </li>
              `).join('')}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  `;

  return proWorkspaceShell(content, '/professional');
}

// ==========================================================
// 2. CLIENT BRIEFS OPPORTUNITIES FEED (/professional/briefs)
// ==========================================================
export function proBriefsFeedPage() {
  const briefs = getClientBriefs();

  const content = `
    <div class="pro-briefs-page">
      <header class="pro-page-header">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> Opportunity Feed</p>
          <h1>Client Project Briefs</h1>
          <p class="pro-subhead">Qualified homeowner architectural briefs across Delhi NCR. Client privacy is strictly protected until consultation booking.</p>
        </div>
      </header>

      <!-- Filter Controls Bar -->
      <section class="pro-filters-bar" aria-label="Filter briefs">
        <div class="filter-group">
          <label class="filter-label">Locality:</label>
          <div class="filter-pills" data-brief-filter-locality>
            <button type="button" class="filter-pill is-active" data-val="all">All Delhi NCR</button>
            <button type="button" class="filter-pill" data-val="Noida">Noida</button>
            <button type="button" class="filter-pill" data-val="Gurugram">Gurugram</button>
            <button type="button" class="filter-pill" data-val="South Delhi">South Delhi</button>
            <button type="button" class="filter-pill" data-val="Faridabad">Faridabad</button>
          </div>
        </div>

        <div class="filter-group">
          <label class="filter-label">Discipline:</label>
          <div class="filter-pills" data-brief-filter-category>
            <button type="button" class="filter-pill is-active" data-val="all">All Disciplines</button>
            <button type="button" class="filter-pill" data-val="Architecture">Architecture</button>
            <button type="button" class="filter-pill" data-val="Interior Design">Interior</button>
            <button type="button" class="filter-pill" data-val="Vastu Consultancy">Vastu</button>
          </div>
        </div>
      </section>

      <!-- Briefs Grid -->
      <div class="pro-briefs-grid" data-briefs-container>
        ${briefs.map(brief => `
          <article class="pro-opportunity-card" data-locality="${brief.city}" data-category="${brief.category}">
            <div class="opp-card-header">
              <div class="opp-tags">
                <span class="brief-cat-pill">${brief.category}</span>
                <span class="brief-locality">${brief.locality}</span>
              </div>
              <span class="opp-privacy-pill" title="Client contact details protected">
                ${icon('lock', '', 12)} ${brief.privacyLabel}
              </span>
            </div>

            <h2 class="opp-card-title">
              <a href="/professional/briefs/${brief.id}">${brief.title}</a>
            </h2>

            <p class="opp-card-meta">
              <strong>Client:</strong> ${brief.clientDisplayName} · <strong>Typology:</strong> ${brief.projectType} · <strong>Plot:</strong> ${brief.plotSize}
            </p>

            <p class="opp-card-summary">${brief.description}</p>

            <div class="opp-deliverables">
              <strong>Key Deliverables Requested:</strong>
              <ul>
                ${brief.deliverablesExpected.slice(0, 2).map(d => `<li>${icon('check', '', 12)} ${d}</li>`).join('')}
              </ul>
            </div>

            <div class="opp-card-footer">
              <div class="opp-specs">
                <div><small>Budget Bracket</small><strong>${brief.budgetRange}</strong></div>
                <div><small>Timeline</small><strong>${brief.targetTimeline}</strong></div>
              </div>

              <div class="opp-actions">
                <span class="opp-proposals-count">${brief.offersCount} proposals received</span>
                <a href="/professional/briefs/${brief.id}" class="button button--dark button--small">
                  Review & Send Offer ${icon('arrow', '', 13)}
                </a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  return proWorkspaceShell(content, '/professional/briefs');
}

// ==========================================================
// 3. BRIEF DETAIL & SEND OFFER COMPOSER (/professional/briefs/:id)
// ==========================================================
export function proBriefDetailPage(briefId) {
  const brief = getClientBriefById(briefId) || getClientBriefs()[0];
  const profile = getProVerificationProfile();
  const existingOffers = getProOffers().filter(o => o.briefId === brief.id);

  const content = `
    <div class="pro-brief-detail-page">
      <div class="pro-breadcrumb">
        <a href="/professional/briefs">&larr; Back to Client Briefs</a>
      </div>

      <div class="brief-detail-layout">
        <!-- Left: Comprehensive Brief Information -->
        <div class="brief-detail-content">
          <div class="brief-detail-header">
            <div class="brief-detail-tags">
              <span class="brief-cat-pill">${brief.category}</span>
              <span class="brief-locality">${brief.locality}</span>
              <span class="brief-status-pill">${icon('shield', '', 13)} Verified Homeowner Request</span>
            </div>
            <h1>${brief.title}</h1>
            <p class="brief-detail-meta">
              Posted by <strong>${brief.clientDisplayName}</strong> (${brief.clientInitials}) · ${brief.postedDate}
            </p>
          </div>

          <section class="brief-specs-card">
            <div class="spec-cell">
              <small>Project Typology</small>
              <strong>${brief.projectType}</strong>
            </div>
            <div class="spec-cell">
              <small>Plot / Built-up Size</small>
              <strong>${brief.plotSize}</strong>
            </div>
            <div class="spec-cell">
              <small>Estimated Scope Budget</small>
              <strong>${brief.budgetRange}</strong>
            </div>
            <div class="spec-cell">
              <small>Target Start Timeline</small>
              <strong>${brief.targetTimeline}</strong>
            </div>
          </section>

          <section class="brief-text-section">
            <h2>Detailed Project Description</h2>
            <p>${brief.description}</p>
          </section>

          <section class="brief-text-section">
            <h2>Specific Deliverables Expected</h2>
            <ul class="brief-checklist">
              ${brief.deliverablesExpected.map(item => `
                <li>${icon('check', '', 14)} <span>${item}</span></li>
              `).join('')}
            </ul>
          </section>

          <section class="brief-text-section">
            <h2>Preferred Meeting Windows</h2>
            <ul class="brief-checklist">
              ${brief.preferredMeetingTimes.map(item => `
                <li>${icon('clock', '', 14)} <span>${item}</span></li>
              `).join('')}
            </ul>
          </section>

          <div class="brief-privacy-notice">
            <div class="notice-icon">${icon('lock', '', 18)}</div>
            <div>
              <strong>Privacy and Verification Safeguards:</strong>
              <p>To protect client privacy, direct phone numbers, email addresses, and exact plot numbers are held confidential until you and the client confirm a scheduled consultation slot.</p>
            </div>
          </div>
        </div>

        <!-- Right: Consultation Offer Composer Drawer / Panel -->
        <aside class="brief-offer-panel">
          <div class="offer-composer-box">
            <h2>Send Consultation Offer</h2>
            <p class="composer-subhead">Propose a structured video session to review this brief live.</p>

            <form class="pro-offer-form" data-form-send-offer data-brief-id="${brief.id}">
              <input type="hidden" name="briefId" value="${brief.id}" />
              <input type="hidden" name="briefTitle" value="${brief.title}" />
              <input type="hidden" name="clientDisplayName" value="${brief.clientDisplayName}" />
              <input type="hidden" name="clientLocality" value="${brief.locality}" />

              <!-- Duration Selection -->
              <div class="composer-field">
                <label class="field-label">Proposed Session Duration:</label>
                <div class="duration-radios">
                  <label class="duration-radio-card">
                    <input type="radio" name="durationMinutes" value="15" />
                    <span class="radio-label">15 Min</span>
                    <small>Diagnostic</small>
                  </label>
                  <label class="duration-radio-card is-selected">
                    <input type="radio" name="durationMinutes" value="30" checked />
                    <span class="radio-label">30 Min</span>
                    <small>Standard Review</small>
                  </label>
                  <label class="duration-radio-card">
                    <input type="radio" name="durationMinutes" value="45" />
                    <span class="radio-label">45 Min</span>
                    <small>In-Depth Advisory</small>
                  </label>
                </div>
              </div>

              <!-- Consultation Fee -->
              <div class="composer-field">
                <label class="field-label" for="offer-fee-input">Proposed Consultation Fee (₹ INR):</label>
                <div class="fee-input-wrap">
                  <span class="currency-prefix">₹</span>
                  <input type="number" id="offer-fee-input" name="feeAmount" value="2500" min="500" max="25000" step="100" required />
                </div>
                <small class="field-hint">You set your own fee. The client pays upfront upon offer acceptance.</small>
              </div>

              <!-- Dynamic 85/15 Fee Transparency Calculator -->
              <div class="composer-economics-box" data-composer-calc>
                <div class="econ-row">
                  <span>Gross Consultation Price:</span>
                  <strong data-calc-gross>₹2,500</strong>
                </div>
                <div class="econ-row econ-row--pro">
                  <span>Your Net Payout (85%):</span>
                  <strong data-calc-pro>₹2,125</strong>
                </div>
                <div class="econ-row econ-row--platform">
                  <span>Vastoco Platform Escrow Fee (15%):</span>
                  <span data-calc-fee>₹375</span>
                </div>
                <p class="econ-notice">
                  ${icon('shield', '', 12)} You keep 85% of every fee. Payout is released directly to your verified bank account immediately upon call completion.
                </p>
              </div>

              <!-- Pitch Message -->
              <div class="composer-field">
                <label class="field-label" for="offer-pitch-input">Consultation Pitch & Relevance:</label>
                <textarea id="offer-pitch-input" name="pitchMessage" rows="5" placeholder="Briefly highlight your relevant Delhi NCR villa/interior experience, familiarity with local bylaws, and what concrete drawings or sketches you will review during the call..." required>Our studio is based right off the Noida-Greater Noida Expressway. We have led 14 private villas with internal biophilic lightwells and courtyard passive cooling in Sector 44. In this 30-minute consultation, I will review your site setbacks live and sketch initial zoning options.</textarea>
              </div>

              <!-- Verification Credentials Stamp -->
              <div class="composer-pro-badge">
                ${icon('shield', '', 14)} Dispatched with <strong>COA Registration ${profile.coaRegistrationNumber}</strong>
              </div>

              <!-- Submit Action -->
              <button type="submit" class="button button--dark button--wide">
                Dispatch Consultation Offer ${icon('arrow', '', 16)}
              </button>

              <div class="form-status" data-form-status aria-live="polite"></div>
            </form>
          </div>
        </aside>
      </div>
    </div>
  `;

  return proWorkspaceShell(content, '/professional/briefs');
}

// ==========================================================
// 4. SENT OFFERS PIPELINE (/professional/offers)
// ==========================================================
export function proOffersPipelinePage() {
  const offers = getProOffers();

  const content = `
    <div class="pro-offers-page">
      <header class="pro-page-header">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> Proposal Tracking</p>
          <h1>Sent Consultation Offers</h1>
          <p class="pro-subhead">Manage dispatched proposals, monitor client review status, and access confirmed video session rooms.</p>
        </div>
      </header>

      <!-- Offers Pipeline Table / Cards -->
      <div class="pro-offers-list">
        ${offers.map(offer => `
          <article class="pro-offer-card pro-offer-card--${offer.status}">
            <div class="offer-card-top">
              <div>
                <span class="status-pill status-pill--${offer.status}">${offer.statusLabel}</span>
                <span class="offer-timestamp">${offer.formattedDate}</span>
              </div>
              <div class="offer-fee-summary">
                <span class="fee-label">Consultation Fee</span>
                <strong class="fee-amount">₹${offer.feeAmount.toLocaleString('en-IN')}</strong>
                <small class="fee-net-sub">Your 85%: ₹${offer.proPayout.toLocaleString('en-IN')}</small>
              </div>
            </div>

            <h2 class="offer-brief-title">${offer.briefTitle}</h2>
            <p class="offer-client-meta">
              Client: <strong>${offer.clientDisplayName}</strong> · Locality: ${offer.clientLocality} · Duration: ${offer.durationMinutes} Minutes
            </p>

            <blockquote class="offer-pitch-quote">
              "${offer.pitchMessage}"
            </blockquote>

            <div class="offer-card-footer">
              <div class="offer-actions-left">
                <a href="/professional/briefs/${offer.briefId}" class="pro-text-link">View Original Brief &rarr;</a>
              </div>

              <div class="offer-actions-right">
                ${offer.status === 'sent' ? `
                  <button type="button" class="button button--outline button--small" data-withdraw-offer="${offer.id}">
                    Withdraw Proposal
                  </button>
                  <button type="button" class="button button--dark button--small" data-simulate-accept="${offer.id}">
                    Simulate Client Acceptance ${icon('check', '', 12)}
                  </button>
                ` : offer.status === 'accepted' ? `
                  <a href="${offer.meetingLink || '#'}" class="button button--dark button--small" data-join-meeting="${offer.id}">
                    Launch Video Consultation ${icon('video', '', 14)}
                  </a>
                ` : `
                  <span class="offer-closed-note">Offer ${offer.status}</span>
                `}
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  return proWorkspaceShell(content, '/professional/offers');
}

// ==========================================================
// 5. CONSULTATIONS & INTERACTIVE CALENDAR (/professional/consultations)
// ==========================================================
export function proConsultationsPage() {
  const schedule = getProSchedule();

  const content = `
    <div class="pro-schedule-page">
      <header class="pro-page-header">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> Consultation Calendar</p>
          <h1>Meeting Schedule & Agenda</h1>
          <p class="pro-subhead">Manage upcoming video consultations with Delhi NCR clients. Conflict detection is active.</p>
        </div>
        <div class="schedule-view-toggles" data-schedule-view-toggles>
          <button type="button" class="view-toggle-btn is-active" data-view="agenda">Agenda List</button>
          <button type="button" class="view-toggle-btn" data-view="calendar">Weekly Calendar Matrix</button>
        </div>
      </header>

      <!-- View 1: Agenda List View -->
      <section class="schedule-agenda-view is-active" data-view-content="agenda">
        <div class="agenda-timeline">
          ${schedule.map(item => `
            <article class="agenda-session-card ${item.hasConflict ? 'agenda-session-card--conflict' : ''}">
              <div class="agenda-card-time">
                <span class="session-date">${item.scheduledDate}</span>
                <strong class="session-hours">${item.scheduledTimeStart} – ${item.scheduledTimeEnd}</strong>
                <span class="session-duration">${item.durationMinutes} min video</span>
              </div>

              <div class="agenda-card-main">
                <div class="agenda-badges">
                  <span class="status-pill status-pill--confirmed">${icon('check', '', 12)} Confirmed Booking</span>
                  ${item.hasConflict ? `<span class="status-pill status-pill--declined">${icon('alert', '', 12)} ${item.conflictNotice}</span>` : ''}
                </div>
                <h3>${item.projectTopic}</h3>
                <p class="agenda-client">Homeowner: <strong>${item.clientDisplayName}</strong> · ${item.clientLocality}</p>
                <p class="agenda-notes">${item.notes}</p>
              </div>

              <div class="agenda-card-economics">
                <div class="econ-box">
                  <span class="econ-label">Client Fee</span>
                  <span class="econ-amount">₹${item.feeGross.toLocaleString('en-IN')}</span>
                  <span class="econ-payout">Net 85%: <strong>₹${item.proPayout.toLocaleString('en-IN')}</strong></span>
                </div>
                <button type="button" class="button button--dark button--small" data-join-meeting="${item.id}">
                  Simulate Call ${icon('arrow', '', 13)}
                </button>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <!-- View 2: Weekly Calendar Matrix View -->
      <section class="schedule-calendar-view" data-view-content="calendar" hidden>
        <div class="calendar-grid-header">
          <div class="cal-col-time">Time</div>
          <div class="cal-col">Monday (Nov 10)</div>
          <div class="cal-col">Tuesday (Nov 11)</div>
          <div class="cal-col">Wednesday (Nov 12)</div>
          <div class="cal-col">Thursday (Nov 13)</div>
          <div class="cal-col is-today">Friday (Nov 14) · Today</div>
          <div class="cal-col">Saturday (Nov 15)</div>
          <div class="cal-col">Sunday (Nov 16)</div>
        </div>

        <div class="calendar-grid-body">
          <div class="cal-time-slot">
            <span class="time-label">10:00 AM</span>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day">
              <div class="cal-event-block cal-event-block--short">
                <strong>Kunal Singhal (DLF 2)</strong>
                <small>10:00 – 10:15 AM · 15m</small>
              </div>
            </div>
            <div class="cal-slot-day"></div>
          </div>

          <div class="cal-time-slot">
            <span class="time-label">11:30 AM</span>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day is-today">
              <div class="cal-event-block cal-event-block--active">
                <strong>Ananya M. (Noida 44)</strong>
                <small>11:30 – 12:00 PM · 30m</small>
              </div>
            </div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
          </div>

          <div class="cal-time-slot">
            <span class="time-label">03:00 PM</span>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day is-today">
              <div class="cal-event-block">
                <strong>Rohit A. (Vasant Vihar)</strong>
                <small>3:00 – 3:45 PM · 45m</small>
              </div>
            </div>
            <div class="cal-slot-day"></div>
            <div class="cal-slot-day"></div>
          </div>
        </div>

        <div class="calendar-conflict-alert">
          ${icon('shield', '', 14)} <strong>Conflict Detection Active:</strong> The booking engine automatically prevents overlapping video consultation requests.
        </div>
      </section>
    </div>
  `;

  return proWorkspaceShell(content, '/professional/consultations');
}

// ==========================================================
// 6. PORTFOLIO SELF-MANAGEMENT (/professional/portfolio)
// ==========================================================
export function proPortfolioPage() {
  const portfolio = getProPortfolio();

  const content = `
    <div class="pro-portfolio-page">
      <header class="pro-page-header">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> Architectural Monograph</p>
          <h1>Portfolio Project Management</h1>
          <p class="pro-subhead">Add, edit, and organize the built works displayed on your public monograph profile.</p>
        </div>
        <div>
          <button type="button" class="button button--dark" data-toggle-add-project>
            + Add New Work Monograph
          </button>
        </div>
      </header>

      <!-- Add Project Inline Drawer/Form -->
      <section class="pro-add-project-box" data-add-project-drawer hidden>
        <h2>Register New Monograph Project</h2>
        <form class="pro-project-form" data-form-add-project>
          <div class="form-row">
            <label>Project Title
              <input name="title" placeholder="e.g. The Glass Pavilion, Shanti Niketan" required />
            </label>
            <label>Locality & City
              <input name="location" placeholder="e.g. Shanti Niketan, New Delhi" required />
            </label>
          </div>

          <div class="form-row">
            <label>Typology Category
              <select name="category">
                <option value="Residential Architecture">Residential Architecture</option>
                <option value="Contemporary Architecture">Contemporary Architecture</option>
                <option value="Interior Architecture">Interior Architecture</option>
                <option value="Adaptive Reuse & Heritage">Adaptive Reuse & Heritage</option>
                <option value="Vastu & Spatial Planning">Vastu & Spatial Planning</option>
              </select>
            </label>
            <label>Completion Year
              <input name="year" placeholder="2025" value="2025" />
            </label>
            <label>Project Scale
              <input name="scale" placeholder="6,500 sq. ft." />
            </label>
          </div>

          <label>Project Architectural Narrative & Design Philosophy
            <textarea name="summary" rows="3" placeholder="Describe the structural concept, daylighting strategy, or material palette..." required></textarea>
          </label>

          <label>Tags (Comma separated)
            <input name="tags" placeholder="Biophilic, Brickwork, Net Zero, Delhi NCR" />
          </label>

          <div class="form-actions">
            <button type="submit" class="button button--dark">Save Work to Monograph</button>
            <button type="button" class="button button--outline" data-cancel-add-project>Cancel</button>
          </div>
        </form>
      </section>

      <!-- Current Portfolio Projects Grid -->
      <div class="pro-projects-grid">
        ${portfolio.map(proj => `
          <article class="pro-project-card" data-project-id="${proj.id}">
            <div class="project-card-image">
              <img src="/${proj.image}" alt="${proj.title}" loading="lazy" />
              <span class="project-year-badge">${proj.year}</span>
            </div>

            <div class="project-card-body">
              <span class="project-cat">${proj.category}</span>
              <h3>${proj.title}</h3>
              <p class="project-loc">${proj.location} · ${proj.scale}</p>
              <p class="project-desc">${proj.summary}</p>
              
              <div class="project-tags">
                ${(proj.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join('')}
              </div>

              <div class="project-card-actions">
                <button type="button" class="button button--outline button--small" data-delete-project="${proj.id}">
                  Delete Work
                </button>
                <a href="/client/professionals/naina-kapoor" class="button button--dark button--small">
                  Preview in Monograph ${icon('arrow', '', 12)}
                </a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  return proWorkspaceShell(content, '/professional/portfolio');
}

// ==========================================================
// 7. PROFESSIONAL PROFILE & RATES EDITOR (/professional/profile)
// ==========================================================
export function proProfilePage() {
  const profile = getProVerificationProfile();

  const content = `
    <div class="pro-profile-editor-page">
      <header class="pro-page-header">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> Public Monograph Editor</p>
          <h1>Practice Bio & Consultation Rates</h1>
          <p class="pro-subhead">Edit the public details visible to homeowners searching for architects across Delhi NCR.</p>
        </div>
        <div>
          <a href="/client/professionals/naina-kapoor" class="button button--outline">
            View Live Monograph ${icon('arrow', '', 14)}
          </a>
        </div>
      </header>

      <div class="pro-editor-layout">
        <form class="pro-editor-form" data-form-save-profile>
          <section class="editor-section">
            <h2>Principal & Practice Identity</h2>
            <div class="form-row">
              <label>Full Professional Name
                <input name="fullName" value="${profile.fullName}" required />
              </label>
              <label>Studio / Practice Name
                <input name="practiceName" value="${profile.practiceName}" required />
              </label>
            </div>

            <label>Discipline & Core Specialization
              <input name="discipline" value="${profile.discipline}" required />
            </label>

            <label>Design Philosophy Statement
              <textarea name="bio" rows="4">We believe architecture should respond to climate and material permanence. Studio ArchVeda designs contemporary residences across Delhi NCR with deep verandahs, internal green lightwells, and natural cross-ventilation.</textarea>
            </label>
          </section>

          <section class="editor-section">
            <h2>Consultation Durations & Standard Fees</h2>
            <p class="section-sub">Set standard rates for preliminary video consultations. You keep 85% of each fee.</p>

            <div class="rates-editor-grid">
              <div class="rate-card-edit">
                <strong>15 Minutes (Diagnostic Call)</strong>
                <label>Your Fee:
                  <div class="fee-input-wrap">
                    <span>₹</span>
                    <input type="number" name="rate15" value="1400" step="100" />
                  </div>
                </label>
                <small>Net payout: ₹1,190 (85%)</small>
              </div>

              <div class="rate-card-edit">
                <strong>30 Minutes (Standard Review)</strong>
                <label>Your Fee:
                  <div class="fee-input-wrap">
                    <span>₹</span>
                    <input type="number" name="rate30" value="2500" step="100" />
                  </div>
                </label>
                <small>Net payout: ₹2,125 (85%)</small>
              </div>

              <div class="rate-card-edit">
                <strong>45 Minutes (In-Depth Review)</strong>
                <label>Your Fee:
                  <div class="fee-input-wrap">
                    <span>₹</span>
                    <input type="number" name="rate45" value="3500" step="100" />
                  </div>
                </label>
                <small>Net payout: ₹2,975 (85%)</small>
              </div>
            </div>
          </section>

          <div class="editor-submit-row">
            <button type="submit" class="button button--dark">Save Profile Changes</button>
            <div class="form-status" data-form-status aria-live="polite"></div>
          </div>
        </form>
      </div>
    </div>
  `;

  return proWorkspaceShell(content, '/professional/profile');
}

// ==========================================================
// 8. COA VERIFICATION TRACKER (/professional/verification)
// ==========================================================
export function proVerificationPage() {
  const profile = getProVerificationProfile();

  const content = `
    <div class="pro-verification-tracker-page">
      <header class="pro-page-header">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> Statutory Credentials</p>
          <h1>Council of Architecture (COA) Status</h1>
          <p class="pro-subhead">Statutory credential auditing under the Architects Act, 1972.</p>
        </div>
      </header>

      <section class="coa-status-hero">
        <div class="coa-seal-large">
          ${icon('shield', '', 48)}
        </div>
        <div class="coa-status-info">
          <span class="status-pill status-pill--confirmed">${icon('check', '', 14)} Statutory Registry Active</span>
          <h2>Council of Architecture Register: Verified</h2>
          <p>Registration Number: <strong>${profile.coaRegistrationNumber}</strong></p>
          <p class="coa-details">
            Name on Statutory Register: <strong>Ar. Naina Kapoor</strong> · Registered Authority: <strong>Council of Architecture, India</strong> · Status: <strong>Active & Renewed through ${profile.coaRegisterValidThrough}</strong>
          </p>
        </div>
      </section>

      <section class="verification-badges-matrix">
        <h2>Active Credential Verifications</h2>
        <div class="badges-grid">
          ${profile.verificationBadges.map(b => `
            <article class="verif-matrix-card">
              <div class="verif-card-icon">${icon('check', '', 20)}</div>
              <div class="verif-card-body">
                <h3>${b.title}</h3>
                <p>Audited by: <strong>${b.authority}</strong></p>
                <small>${b.date}</small>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="verif-standards-explainer">
        <h2>Verification Requirements by Discipline</h2>
        <div class="discipline-verif-cards">
          <div class="disc-card">
            <h3>Architects</h3>
            <p>Mandatory Council of Architecture (COA) statutory register check under the Architects Act, 1972. B.Arch / M.Arch degree verification.</p>
          </div>
          <div class="disc-card">
            <h3>Interior Designers</h3>
            <p>Identity verification, institutional degree or diploma audit (IIID / CEPT / NID / equivalent), and minimum 3 documented completed projects.</p>
          </div>
          <div class="disc-card">
            <h3>Vastu Consultants</h3>
            <p>Certified spatial training credentials, residential case study audit, and commitment to non-destructive spatial remedies.</p>
          </div>
        </div>
      </section>
    </div>
  `;

  return proWorkspaceShell(content, '/professional/verification');
}

// ==========================================================
// 9. PROFESSIONAL SETTINGS & PAYOUTS (/professional/settings)
// ==========================================================
export function proSettingsPage() {
  const profile = getProVerificationProfile();

  const content = `
    <div class="pro-settings-page">
      <header class="pro-page-header">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> Account Management</p>
          <h1>Payouts & Account Settings</h1>
          <p class="pro-subhead">Manage direct bank escrow transfers for your 85% consultation fees and notification alerts.</p>
        </div>
      </header>

      <div class="settings-sections-grid">
        <!-- Bank Payout Account -->
        <section class="settings-box">
          <div class="settings-box-head">
            ${icon('wallet', '', 24)}
            <div>
              <h2>Escrow Bank Payout Account</h2>
              <p>Consultation fees (85% net) are transferred directly here.</p>
            </div>
          </div>

          <div class="bank-account-card">
            <div class="bank-row">
              <span class="bank-label">Bank Institution:</span>
              <strong>${profile.payoutBank.bankName}</strong>
            </div>
            <div class="bank-row">
              <span class="bank-label">Beneficiary Name:</span>
              <strong>${profile.payoutBank.accountHolder}</strong>
            </div>
            <div class="bank-row">
              <span class="bank-label">Account Number:</span>
              <strong>${profile.payoutBank.accountMasked}</strong>
            </div>
            <div class="bank-row">
              <span class="bank-label">IFSC Code:</span>
              <strong>${profile.payoutBank.ifscCode}</strong>
            </div>
            <div class="bank-row">
              <span class="bank-label">Payout Schedule:</span>
              <span>${profile.payoutBank.payoutCycle}</span>
            </div>
          </div>
          <p class="settings-note">${icon('shield', '', 12)} Bank account KYC verified. Contact Vastoco support to update bank credentials.</p>
        </section>

        <!-- Notification Alerts -->
        <section class="settings-box">
          <div class="settings-box-head">
            ${icon('message', '', 24)}
            <div>
              <h2>Opportunity & Meeting Notifications</h2>
              <p>Configure alerts for new client briefs in Delhi NCR.</p>
            </div>
          </div>

          <form class="settings-toggles-form">
            <label class="toggle-row">
              <input type="checkbox" checked />
              <div>
                <strong>New Matching Client Briefs in Noida & South Delhi</strong>
                <small>Instant SMS and email alert when a homeowner posts an architectural brief.</small>
              </div>
            </label>

            <label class="toggle-row">
              <input type="checkbox" checked />
              <div>
                <strong>Client Offer Acceptance Alerts</strong>
                <small>Immediate notification when a client accepts your consultation proposal.</small>
              </div>
            </label>

            <label class="toggle-row">
              <input type="checkbox" checked />
              <div>
                <strong>Consultation Video Room Reminders</strong>
                <small>SMS reminders 15 minutes before scheduled video sessions.</small>
              </div>
            </label>

            <button type="button" class="button button--dark button--small" style="margin-top: 16px;">
              Save Preferences
            </button>
          </form>
        </section>
      </div>
    </div>
  `;

  return proWorkspaceShell(content, '/professional/settings');
}

