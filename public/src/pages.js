import { icon } from './icons.js';
import { categories, illustrativeProfiles, durations } from './data.js';
import { actionLink, footer, nav, pageFrame, sectionIntro } from './components.js';
import {
  clientWorkspacePage,
  clientComparePage,
  clientSavedPage,
  clientConsultationsPage,
  clientActivityPage,
  clientAccountPage,
  clientProfileDetailPage,
  clientBookingDetailPage,
  ratingSummaryComponent,
  reviewsListComponent,
  unifiedDiscoverySection,
  professionalCardV2,
  clientBriefsPage
} from './clientPages.js';

export {
  clientWorkspacePage,
  clientComparePage,
  clientSavedPage,
  clientConsultationsPage,
  clientActivityPage,
  clientAccountPage,
  clientProfileDetailPage,
  clientBookingDetailPage,
  clientBriefsPage,
  ratingSummaryComponent,
  reviewsListComponent,
  unifiedDiscoverySection,
  professionalCardV2
};

function heroTrustRow() {
  return `<div class="trust-row" aria-label="Vastoco service principles">
    <div class="trust-item">${icon('shield')}<span><strong>Verified professionals</strong><small>Identity and credentials checked</small></span></div>
    <div class="trust-item">${icon('calendar')}<span><strong>Paid video consultations</strong><small>15, 30 or 45 minutes</small></span></div>
    <div class="trust-item">${icon('lock')}<span><strong>Clear and secure</strong><small>Fees shown before booking</small></span></div>
  </div>`;
}

function monitorSceneDiscover() {
  return `<section class="screen-scene screen-scene--discover is-active" data-scene="0" aria-label="Client discovery and professional search">
    <div class="screen-copy">
      <span class="screen-kicker">01 / Discovery & Search</span>
      <strong>Find verified architectural minds.</strong>
      <small>Filter by discipline, project typology, and Delhi NCR locality with live fee transparency.</small>
      <a class="screen-action" href="/clients/explore">Explore directory ${icon('arrow', '', 12)}</a>
    </div>
    <div class="screen-stage-canvas">
      <div class="stage-ui-window">
        <div class="stage-search-bar">
          <span class="stage-pill-loc">${icon('pin', '', 12)} Delhi NCR</span>
          <span class="stage-search-input">Villas, extensions, Vastu...</span>
          <span class="stage-search-btn">${icon('search', '', 12)}</span>
        </div>
        <div class="stage-filter-row">
          <span class="stage-cat-pill is-active">Architects</span>
          <span class="stage-cat-pill">Interiors</span>
          <span class="stage-cat-pill">Vastu</span>
        </div>
        <div class="stage-cards-pair">
          <div class="stage-mini-card">
            <div class="stage-mini-photo"><img src="/assets/portfolio-naina-villa.webp" alt="Naina Kapoor portfolio" width="120" height="80" /></div>
            <div class="stage-mini-info">
              <span class="stage-badge-seal">${icon('shield', '', 10)} COA Checked</span>
              <strong>Naina Kapoor</strong>
              <small>Architect · 8 yrs exp · Delhi NCR</small>
              <div class="stage-mini-fee">₹1,400 <span class="stage-fee-sub">/ 30 min</span></div>
            </div>
          </div>
          <div class="stage-mini-card">
            <div class="stage-mini-photo"><img src="/assets/portfolio-kabir-pavilion.webp" alt="Kabir Sethi portfolio" width="120" height="80" /></div>
            <div class="stage-mini-info">
              <span class="stage-badge-seal">${icon('shield', '', 10)} COA Checked</span>
              <strong>Kabir Sethi</strong>
              <small>Architect · 6 yrs exp · Delhi NCR</small>
              <div class="stage-mini-fee">₹1,250 <span class="stage-fee-sub">/ 30 min</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function monitorSceneCompare() {
  return `<section class="screen-scene screen-scene--compare" data-scene="1" aria-label="Side-by-side professional comparison">
    <div class="screen-copy">
      <span class="screen-kicker">02 / Side-by-Side Compare</span>
      <strong>Compare rates, credentials & scope.</strong>
      <small>Review practice experience, COA registration status, and consultation fees side by side.</small>
      <a class="screen-action" href="/clients#directory">Compare professionals ${icon('arrow', '', 12)}</a>
    </div>
    <div class="screen-stage-canvas">
      <div class="stage-ui-window">
        <div class="stage-compare-head">
          <span class="stage-compare-pill">${icon('compare', '', 12)} Side-by-side comparison (2 selected)</span>
        </div>
        <div class="stage-compare-grid">
          <div class="stage-compare-col">
            <div class="stage-compare-pro-head">
              <strong>Naina Kapoor</strong>
              <small>Architect · Delhi NCR</small>
            </div>
            <div class="stage-compare-spec">
              <span class="spec-label">Discipline</span>
              <span class="spec-val">Residential Villas</span>
            </div>
            <div class="stage-compare-spec">
              <span class="spec-label">Experience</span>
              <span class="spec-val">8 yrs practice</span>
            </div>
            <div class="stage-compare-spec">
              <span class="spec-label">30 Min Rate</span>
              <span class="spec-val"><strong>₹1,400</strong></span>
            </div>
            <div class="stage-compare-spec">
              <span class="spec-label">Verification</span>
              <span class="spec-val">${icon('shield', '', 11)} COA Validated</span>
            </div>
          </div>
          <div class="stage-compare-col">
            <div class="stage-compare-pro-head">
              <strong>Kabir Sethi</strong>
              <small>Architect · Delhi NCR</small>
            </div>
            <div class="stage-compare-spec">
              <span class="spec-label">Discipline</span>
              <span class="spec-val">Home Extensions</span>
            </div>
            <div class="stage-compare-spec">
              <span class="spec-label">Experience</span>
              <span class="spec-val">6 yrs practice</span>
            </div>
            <div class="stage-compare-spec">
              <span class="spec-label">30 Min Rate</span>
              <span class="spec-val"><strong>₹1,250</strong></span>
            </div>
            <div class="stage-compare-spec">
              <span class="spec-label">Verification</span>
              <span class="spec-val">${icon('shield', '', 11)} COA Validated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function monitorSceneConsult() {
  return `<section class="screen-scene screen-scene--consult" data-scene="2" aria-label="Video consultation booking">
    <div class="screen-copy">
      <span class="screen-kicker">03 / Video Consultation</span>
      <strong>Defined durations. Upfront pricing.</strong>
      <small>Book 15, 30 or 45-minute video sessions. Fees confirmed upfront and held safely in escrow.</small>
      <a class="screen-action" href="/clients#consultations">How consultations work ${icon('arrow', '', 12)}</a>
    </div>
    <div class="screen-stage-canvas">
      <div class="stage-ui-window">
        <div class="stage-booking-card">
          <div class="stage-booking-header">
            <div>
              <small class="stage-booking-kicker">1-on-1 Video Session</small>
              <strong>Studio Naina Kapoor</strong>
            </div>
            <span class="stage-escrow-pill">${icon('lock', '', 12)} Escrow Hold</span>
          </div>
          <div class="stage-durations-row">
            <div class="stage-duration-chip"><span>15 min</span><strong>₹750</strong></div>
            <div class="stage-duration-chip is-selected"><span>30 min</span><strong>₹1,400</strong><span class="stage-chip-rec">Choice</span></div>
            <div class="stage-duration-chip"><span>45 min</span><strong>₹1,950</strong></div>
          </div>
          <div class="stage-slots-row">
            <span class="stage-slots-label">Select slot:</span>
            <span class="stage-slot-time">10:30 AM</span>
            <span class="stage-slot-time is-active">02:00 PM</span>
            <span class="stage-slot-time">04:30 PM</span>
          </div>
          <div class="stage-guarantee-note">
            ${icon('wallet', '', 12)} <span>Zero hidden charges · 100% upfront fee clarity</span>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function monitorSceneShowcase() {
  return `<section class="screen-scene screen-scene--showcase" data-scene="3" aria-label="Professional architectural monograph">
    <div class="screen-copy">
      <span class="screen-kicker">04 / Portfolio Showcase</span>
      <strong>Monographs built for real work.</strong>
      <small>Present drawings, elevations, floor plans, and built photography in an editorial monograph format.</small>
      <a class="screen-action" href="/clients/explore">Browse portfolios ${icon('arrow', '', 12)}</a>
    </div>
    <div class="screen-stage-canvas">
      <div class="stage-ui-window">
        <div class="stage-monograph-head">
          <div>
            <strong>Studio Naina Kapoor</strong>
            <small>Architect · CA/2016/78210 · South Delhi</small>
          </div>
          <span class="stage-badge-seal">${icon('shield', '', 11)} Verified Monograph</span>
        </div>
        <div class="stage-monograph-gallery">
          <div class="stage-gallery-card">
            <img src="/assets/portfolio-naina-villa.webp" alt="Villa facade" width="160" height="100" />
            <div class="stage-card-caption">
              <strong>Courtyard Villa</strong>
              <small>4,200 sq.ft · Built</small>
            </div>
          </div>
          <div class="stage-gallery-card">
            <img src="/assets/floorplan-sketch.svg" alt="Floor plan sketch" width="160" height="100" />
            <div class="stage-card-caption">
              <strong>MCD Sanction Plan</strong>
              <small>Structural drawings</small>
            </div>
          </div>
        </div>
        <div class="stage-monograph-strip">
          <span>${icon('layers', '', 12)} Floor plans & elevations</span>
          <span>${icon('file', '', 12)} Material schedule</span>
        </div>
      </div>
    </div>
  </section>`;
}

function monitorSceneVerified() {
  return `<section class="screen-scene screen-scene--verified" data-scene="4" aria-label="Credential and COA verification">
    <div class="screen-copy">
      <span class="screen-kicker">05 / Trust & Verification</span>
      <strong>Official registry checks. No fake badges.</strong>
      <small>Direct Council of Architecture validation for architects. Only real consultation reviews.</small>
      <a class="screen-action" href="/professionals#verification">Verification standards ${icon('arrow', '', 12)}</a>
    </div>
    <div class="screen-stage-canvas">
      <div class="stage-ui-window">
        <div class="stage-registry-header">
          <div class="stage-registry-seal">
            ${icon('shield', '', 16)}
            <span>COA REGISTER CHECK</span>
          </div>
          <span class="stage-status-verified">STATUS: ACTIVE & VERIFIED</span>
        </div>
        <div class="stage-registry-checklist">
          <div class="stage-check-item">
            ${icon('check', '', 13)}
            <div>
              <strong>Council of Architecture Registration</strong>
              <small>Reg. CA/2016/78210 · National Register Verified</small>
            </div>
          </div>
          <div class="stage-check-item">
            ${icon('check', '', 13)}
            <div>
              <strong>Degree Audit</strong>
              <small>B.Arch (SPA Delhi) · Verified by documentation</small>
            </div>
          </div>
          <div class="stage-check-item">
            ${icon('check', '', 13)}
            <div>
              <strong>Review Authenticity</strong>
              <small>0 unverified testimonials · Real sessions only</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function monitorShowcase() {
  return `<div class="monitor-wrap" aria-label="Vastoco product preview">
    <div class="monitor-frame">
      <div class="monitor-topbar">
        <div class="window-dots"><i></i><i></i><i></i></div>
        <div class="monitor-url">vastoco.in</div>
        <div class="monitor-topbar-mark">${icon('lock', '', 12)} <span>Verified Experience</span></div>
      </div>
      <div class="monitor-screen" role="region" aria-label="Interactive architectural showcase" aria-live="polite">
        ${monitorSceneDiscover()}
        ${monitorSceneCompare()}
        ${monitorSceneConsult()}
        ${monitorSceneShowcase()}
        ${monitorSceneVerified()}
      </div>

      <!-- Monitor Stage Controls (Prev / Dots / Next) -->
      <div class="monitor-controls" aria-label="Scene navigation controls">
        <button class="stage-btn stage-btn--prev" type="button" data-scene-prev aria-label="Previous scene">${icon('chevronLeft', '', 16)}</button>
        <div class="stage-dots" role="tablist" aria-label="Showcase scene indicators">
          <button class="stage-dot is-active" type="button" data-scene-dot="0" role="tab" aria-selected="true" aria-label="Scene 1: Discovery & search"><span class="dot-num">01</span></button>
          <button class="stage-dot" type="button" data-scene-dot="1" role="tab" aria-selected="false" aria-label="Scene 2: Side-by-side compare"><span class="dot-num">02</span></button>
          <button class="stage-dot" type="button" data-scene-dot="2" role="tab" aria-selected="false" aria-label="Scene 3: Video consultation"><span class="dot-num">03</span></button>
          <button class="stage-dot" type="button" data-scene-dot="3" role="tab" aria-selected="false" aria-label="Scene 4: Portfolio showcase"><span class="dot-num">04</span></button>
          <button class="stage-dot" type="button" data-scene-dot="4" role="tab" aria-selected="false" aria-label="Scene 5: Trust & verification"><span class="dot-num">05</span></button>
        </div>
        <button class="stage-btn stage-btn--next" type="button" data-scene-next aria-label="Next scene">${icon('chevronRight', '', 16)}</button>
      </div>
    </div>
    <div class="monitor-neck"><span></span></div>
    <div class="monitor-base"></div>
    <div class="monitor-caption">
      <span>Two doors. One platform. · Delhi NCR</span>
      <button class="motion-toggle" type="button" data-motion-toggle aria-pressed="false" aria-label="Pause hero preview">
        ${icon('pause', '', 13)}<span>Pause preview</span>
      </button>
    </div>
  </div>`;
}

function brandLoader() {
  return `<div class="brand-loader" id="brand-loader" role="status" aria-label="Loading Vastoco">
    <div class="loader-inner">
      <div class="loader-blueprint-grid" aria-hidden="true"></div>
      <div class="loader-mark-wrap">
        <img src="/assets/vastoco-logo.png" alt="Vastoco" class="loader-logo" width="180" height="42" />
        <span class="loader-kicker">Delhi NCR · Architecture · Interiors · Vastu</span>
      </div>
      <button class="loader-skip-btn" type="button" data-loader-skip>Skip intro &rarr;</button>
    </div>
  </div>`;
}

function axisLandingHero() {
  return `<section class="landing-hero" id="hero">
    <div class="container landing-hero-container">
      <div class="landing-hero-head">
        <div class="landing-hero-title-col">
          <p class="eyebrow"><span class="eyebrow-dot"></span> Delhi NCR · Architecture · Interiors · Vastu</p>
          <h1 class="landing-hero-headline">Spaces shaped by the <em>right expertise.</em></h1>
        </div>
        <div class="landing-hero-aside">
          <p class="hero-lede">Connect with verified architecture and design minds across Delhi NCR. Compare authentic portfolios, inspect credentials, and book structured video consultations with transparent upfront fees.</p>
          <div class="hero-actions hero-actions--desktop">
            <a class="button button--dark" href="/clients">Explore verified professionals ${icon('arrow', 'button-arrow', 16)}</a>
            <a class="button button--outline" href="/professionals">Join as a professional ${icon('arrow', 'button-arrow', 16)}</a>
          </div>
          <div class="hero-strip-controls hero-strip-controls--desktop">
            <button class="motion-toggle" type="button" data-motion-toggle aria-pressed="false" aria-label="Pause image strip movement">
              ${icon('pause', '', 13)}<span>Pause movement</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Moving Architectural Photo Strip (Axis-inspired) -->
    <div class="hero-strip-stage" data-strip-stage aria-label="Gallery of contemporary architecture and interiors across Delhi NCR">
      <div class="hero-strip-track" data-strip-track>
        <div class="strip-item strip-item--wide">
          <img src="/assets/portfolio-naina-villa.webp" alt="Contemporary Courtyard Villa architecture in Delhi NCR" loading="eager" width="480" height="320" />
          <span class="strip-caption">Residential Villa · South Delhi</span>
        </div>
        <div class="strip-item strip-item--tall">
          <img src="/assets/portfolio-mira-living.webp" alt="Minimalist interior renovation with natural daylight" loading="eager" width="360" height="360" />
          <span class="strip-caption">Interior Architecture · Gurgaon</span>
        </div>
        <div class="strip-item strip-item--medium">
          <img src="/assets/portfolio-kabir-pavilion.webp" alt="Steel and glass rooftop pavilion addition" loading="eager" width="420" height="320" />
          <span class="strip-caption">Terrace Pavilion · Noida</span>
        </div>
        <div class="strip-item strip-item--square">
          <img src="/assets/portfolio-dev-courtyard.webp" alt="Vastu-aligned central courtyard with water body" loading="eager" width="340" height="340" />
          <span class="strip-caption">Vastu Spatial Alignment · Delhi NCR</span>
        </div>
        <div class="strip-item strip-item--wide">
          <img src="/assets/portfolio-naina-extension.webp" alt="Structural residential extension and garden facade" loading="eager" width="450" height="320" />
          <span class="strip-caption">Structural Extension · South Delhi</span>
        </div>
        <div class="strip-item strip-item--tall">
          <img src="/assets/portfolio-mira-joinery.webp" alt="Bespoke architectural wood joinery and millwork" loading="eager" width="360" height="360" />
          <span class="strip-caption">Bespoke Millwork · Delhi NCR</span>
        </div>

        <!-- Seamless duplicate loop for continuous ticker -->
        <div class="strip-item strip-item--wide" aria-hidden="true">
          <img src="/assets/portfolio-naina-villa.webp" alt="" loading="lazy" width="480" height="320" />
          <span class="strip-caption">Residential Villa · South Delhi</span>
        </div>
        <div class="strip-item strip-item--tall" aria-hidden="true">
          <img src="/assets/portfolio-mira-living.webp" alt="" loading="lazy" width="360" height="360" />
          <span class="strip-caption">Interior Architecture · Gurgaon</span>
        </div>
        <div class="strip-item strip-item--medium" aria-hidden="true">
          <img src="/assets/portfolio-kabir-pavilion.webp" alt="" loading="lazy" width="420" height="320" />
          <span class="strip-caption">Terrace Pavilion · Noida</span>
        </div>
        <div class="strip-item strip-item--square" aria-hidden="true">
          <img src="/assets/portfolio-dev-courtyard.webp" alt="" loading="lazy" width="340" height="340" />
          <span class="strip-caption">Vastu Spatial Alignment · Delhi NCR</span>
        </div>
        <div class="strip-item strip-item--wide" aria-hidden="true">
          <img src="/assets/portfolio-naina-extension.webp" alt="" loading="lazy" width="450" height="320" />
          <span class="strip-caption">Structural Extension · South Delhi</span>
        </div>
        <div class="strip-item strip-item--tall" aria-hidden="true">
          <img src="/assets/portfolio-mira-joinery.webp" alt="" loading="lazy" width="360" height="360" />
          <span class="strip-caption">Bespoke Millwork · Delhi NCR</span>
        </div>
      </div>
    </div>

    <!-- Mobile CTA Actions (Positioned BELOW the images in mobile view) -->
    <div class="container hero-mobile-actions" data-hero-mobile-actions>
      <div class="hero-actions hero-actions--mobile">
        <a class="button button--dark" href="/clients">Explore verified professionals ${icon('arrow', 'button-arrow', 16)}</a>
        <a class="button button--outline" href="/professionals">Join as a professional ${icon('arrow', 'button-arrow', 16)}</a>
      </div>
      <div class="hero-strip-controls hero-strip-controls--mobile">
        <button class="motion-toggle" type="button" data-motion-toggle aria-pressed="false" aria-label="Pause image strip movement">
          ${icon('pause', '', 13)}<span>Pause movement</span>
        </button>
      </div>
    </div>
  </section>`;
}

function clientScrollStorySection() {
  return `<section class="scroll-story-section section-pad" id="story" data-scroll-story aria-label="How Vastoco works">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow">A Considered Standard</p>
        <h2>A clearer way to choose the right professional.</h2>
        <p class="section-copy">Vastoco removes the friction, opaque pricing, and guesswork from finding authentic architectural expertise in Delhi NCR.</p>
      </div>

      <div class="scroll-story-stage" data-story-stage>
        <div class="scroll-story-beats" data-story-beats>
          <!-- Beat 01 -->
          <div class="story-beat is-active" data-beat="0">
            <span class="story-beat-num">01 / Discover</span>
            <h3>Find verified architectural minds.</h3>
            <p>Filter architects, interior designers, and Vastu consultants across Delhi NCR by discipline, scale, and locality. Every listed professional undergoes manual credential verification.</p>
            <a class="story-beat-link" href="/clients/explore">Explore directory ${icon('arrow', '', 14)}</a>
          </div>

          <!-- Beat 02 -->
          <div class="story-beat" data-beat="1">
            <span class="story-beat-num">02 / Compare</span>
            <h3>Evaluate credentials, rates & scope.</h3>
            <p>Review real project portfolios, Council of Architecture (COA) registration status, and upfront consultation rates side by side with our built-in comparison tool.</p>
            <a class="story-beat-link" href="/clients#directory">Compare professionals ${icon('arrow', '', 14)}</a>
          </div>

          <!-- Beat 03 -->
          <div class="story-beat" data-beat="2">
            <span class="story-beat-num">03 / Consult</span>
            <h3>Defined durations. Escrow security.</h3>
            <p>Book 15, 30 or 45-minute video consultations. Fees are confirmed upfront and held safely in escrow until your session concludes without deduction.</p>
            <a class="story-beat-link" href="/clients#consultations">How consultations work ${icon('arrow', '', 14)}</a>
          </div>
        </div>

        <div class="scroll-story-visual-wrap" data-story-visuals>
          <div class="story-visual-window">
            <div class="story-window-bar">
              <span class="window-dot"></span><span class="window-dot"></span><span class="window-dot"></span>
              <span class="window-url" data-story-url>vastoco.in/clients/explore</span>
            </div>
            
            <div class="story-scene is-active" data-scene="0">
              <div class="scene-header">
                <span class="scene-kicker">${icon('search', '', 12)} Discovery & Locality Search</span>
                <strong>Delhi NCR Directory</strong>
              </div>
              <div class="scene-search-row">
                <span class="scene-pill">${icon('pin', '', 11)} South Delhi & Gurgaon</span>
                <span class="scene-pill is-active">Architects</span>
              </div>
              <div class="scene-card-preview">
                <img src="/assets/portfolio-naina-villa.webp" alt="Naina Kapoor portfolio" width="110" height="75" />
                <div>
                  <span class="scene-badge">${icon('shield', '', 10)} COA Checked</span>
                  <strong>Studio Naina Kapoor</strong>
                  <small>Architect · 8 yrs practice</small>
                  <span class="scene-rate">₹1,400 <small>/ 30 min</small></span>
                </div>
              </div>
            </div>

            <div class="story-scene" data-scene="1">
              <div class="scene-header">
                <span class="scene-kicker">${icon('compare', '', 12)} Side-by-Side Comparison</span>
                <strong>Compare Rates & Credentials</strong>
              </div>
              <div class="scene-compare-grid">
                <div class="scene-compare-cell">
                  <strong>Naina Kapoor</strong>
                  <small>Residential Villas</small>
                  <span class="scene-meta-line">COA: <strong>CA/2012/58941</strong></span>
                  <span class="scene-meta-line">Rate: <strong>₹1,400</strong></span>
                </div>
                <div class="scene-compare-cell">
                  <strong>Kabir Sethi</strong>
                  <small>Home Extensions</small>
                  <span class="scene-meta-line">COA: <strong>CA/2016/74120</strong></span>
                  <span class="scene-meta-line">Rate: <strong>₹1,250</strong></span>
                </div>
              </div>
            </div>

            <div class="story-scene" data-scene="2">
              <div class="scene-header">
                <span class="scene-kicker">${icon('video', '', 12)} Upfront Video Booking</span>
                <strong>Escrow Payment Hold</strong>
              </div>
              <div class="scene-duration-pills">
                <div class="scene-dur-pill">15 min · ₹750</div>
                <div class="scene-dur-pill is-selected">30 min · ₹1,400</div>
                <div class="scene-dur-pill">45 min · ₹1,950</div>
              </div>
              <div class="scene-escrow-notice">
                ${icon('lock', '', 14)}
                <span>100% Escrow Protection: fee released only upon completed consultation.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function editorialDoorsSection() {
  return `<section class="doors-section section-pad" id="how-it-works" data-doors-section>
    <div class="container">
      <div class="doors-heading">
        <div>
          <p class="eyebrow">Two ways to begin</p>
          <h2>Choose the door<br/>that fits your next step.</h2>
        </div>
        <p>Two distinct doorways designed for two distinct audiences, unified under one architectural brand system.</p>
      </div>

      <div class="door-grid">
        <!-- Door 01: For Clients -->
        <div class="editorial-door-card door-card--client" data-hover-card>
          <div class="door-card-spotlight" data-spotlight aria-hidden="true"></div>
          <div class="door-card-main">
            <span class="door-index">01 / For Clients</span>
            <h3>Find the right professional for your space.</h3>
            <p>Explore, compare and book verified architects, interior designers and Vastu consultants across Delhi NCR.</p>
            <div class="door-cta-wrap">
              <a class="button button--dark" href="/clients">
                Enter the client experience ${icon('arrow', '', 16)}
              </a>
            </div>
          </div>
          <div class="door-card-aside">
            <span class="door-giant-num">01</span>
            <div class="door-card-art">
              <img src="/assets/house-cutaway.webp" alt="Contemporary home cutaway architectural illustration" loading="lazy" width="440" height="300" />
            </div>
          </div>
        </div>

        <!-- Door 02: For Professionals -->
        <div class="editorial-door-card door-card--pro" data-hover-card>
          <div class="door-card-spotlight" data-spotlight aria-hidden="true"></div>
          <div class="door-card-main">
            <span class="door-index">02 / For Professionals</span>
            <h3>Make your expertise easier to find.</h3>
            <p>Build a verified public profile, offer paid consultations with transparent 85% payouts, and receive qualified client briefs.</p>
            <div class="door-cta-wrap">
              <a class="button button--dark" href="/professionals">
                Enter the professional experience ${icon('arrow', '', 16)}
              </a>
            </div>
          </div>
          <div class="door-card-aside">
            <span class="door-giant-num">02</span>
            <div class="door-card-art door-card-art--architect">
              <img src="/assets/professional-door-02-architect-at-work.png" alt="Architect working on drawings and building models at a drafting desk" loading="lazy" width="460" height="290" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function homePage() {
  const content = `
    ${axisLandingHero()}
    ${heroTrustRow()}
    ${clientScrollStorySection()}
    ${editorialDoorsSection()}
    <section class="minimal-proof section-pad">
      <div class="container minimal-proof-inner">
        <div>
          <p class="eyebrow">A considered standard</p>
          <h2>Truth in presentation.<br/>Clarity before decisions.</h2>
        </div>
        <div class="minimal-proof-list">
          <p>${icon('shield')} <span>Verification explained clearly with COA register checks, never masked by fake badges.</span></p>
          <p>${icon('wallet')} <span>Consultation fees made clear before booking; professionals keep 85% with zero hidden fees.</span></p>
          <p>${icon('video')} <span>Defined 15, 30 and 45-minute video consultations structured for actionable advice.</span></p>
        </div>
      </div>
    </section>`;
  return pageFrame(content, { audience: 'shared' });
}

function clientHero() {
  return `<section class="audience-hero client-hero section-pad">
    <div class="container audience-hero-grid">
      <div class="audience-hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Delhi NCR · Architecture · Interiors · Vastu</p>
        <h1>Find the right professional for <em>your space.</em></h1>
        <p class="hero-lede">Connect with verified architecture and design professionals in Delhi NCR. Compare real portfolios, understand upfront fees, and book focused 15, 30 or 45-minute video consultations.</p>
        
        <form class="hero-discovery-bar" data-client-search-form role="search" aria-label="Search professionals in Delhi NCR">
          <div class="search-input-group">
            <label class="search-field-label" for="client-search-service">Specialization</label>
            <div class="search-select-wrap">
              ${icon('compass', 'field-icon', 16)}
              <select id="client-search-service" name="service" data-hero-service>
                <option value="all">All disciplines</option>
                <option value="architect">Architects</option>
                <option value="interior">Interior designers</option>
                <option value="vastu">Vastu consultants</option>
              </select>
            </div>
          </div>
          <div class="search-input-group">
            <label class="search-field-label" for="client-search-locality">Locality</label>
            <div class="search-select-wrap">
              ${icon('pin', 'field-icon', 16)}
              <select id="client-search-locality" name="locality" data-hero-locality>
                <option value="all">All Delhi NCR</option>
                <option value="South Delhi & Gurgaon">South Delhi & Gurgaon</option>
                <option value="Central Delhi & Noida">Central Delhi & Noida</option>
                <option value="Delhi NCR">Delhi NCR</option>
              </select>
            </div>
          </div>
          <div class="search-input-group search-input-group--query">
            <label class="search-field-label" for="client-search-query">Project or keyword</label>
            <div class="search-text-wrap">
              ${icon('search', 'field-icon', 16)}
              <input id="client-search-query" type="search" name="query" placeholder="e.g. Villa, remodel, sanction, Vastu" data-hero-query />
            </div>
          </div>
          <button class="button button--dark search-submit-btn" type="submit">
            Find professionals ${icon('arrow', '', 16)}
          </button>
        </form>

        <div class="hero-trust-badges">
          <span>${icon('shield', '', 15)} <strong>COA verified architects</strong></span>
          <span>${icon('wallet', '', 15)} <strong>Upfront consultation fees</strong></span>
          <span>${icon('video', '', 15)} <strong>15, 30 or 45 minutes</strong></span>
        </div>
      </div>

      <div class="client-hero-showcase">
        <div class="hero-art-frame">
          <img src="/assets/house-cutaway.webp" alt="Original architectural cutaway illustration of a contemporary home" fetchpriority="high" width="600" height="420" />
          <div class="hero-art-blueprint-overlay" aria-hidden="true"></div>
          <div class="hero-art-tag hero-art-tag--top">
            <span class="sample-chip">Original Architectural Illustration</span>
            <strong>Contemporary Home Cutaway</strong>
            <small>Delhi NCR · Verified practice</small>
          </div>
          <div class="hero-art-tag hero-art-tag--bottom">
            ${icon('video', '', 15)}
            <span><strong>Video consultation</strong> · 15, 30 or 45 min</span>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function clientJourneySection() {
  return `<section class="journey-section section-pad" id="how-it-works">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow">The Vastoco journey</p>
        <h2>Find. Compare. Evaluate. Book.</h2>
        <p class="section-copy">A structured path for homeowners and families to discover genuine design talent with complete transparency.</p>
      </div>
      <div class="journey-grid">
        <div class="journey-card">
          <div class="journey-step-num">01</div>
          <div class="journey-card-visual">
            <img src="/assets/client-how-find.svg" alt="Architectural drafting blueprint and discovery search" loading="lazy" width="280" height="180" />
          </div>
          <div class="journey-icon">${icon('search', '', 24)}</div>
          <h3>Find</h3>
          <p>Filter architects, interior designers, and Vastu consultants by specialization, Delhi NCR locality, and architectural typology.</p>
          <span class="journey-sub">Delhi NCR focus</span>
        </div>
        <div class="journey-card">
          <div class="journey-step-num">02</div>
          <div class="journey-card-visual">
            <img src="/assets/client-how-compare.svg" alt="Side-by-side architectural drawing and metric comparison" loading="lazy" width="280" height="180" />
          </div>
          <div class="journey-icon">${icon('compare', '', 24)}</div>
          <h3>Compare</h3>
          <p>Review real project portfolios, years in practice, and consultation fees side by side with our built-in comparison tool.</p>
          <span class="journey-sub">Side-by-side clarity</span>
        </div>
        <div class="journey-card">
          <div class="journey-step-num">03</div>
          <div class="journey-card-visual">
            <img src="/assets/client-how-evaluate.svg" alt="Council of Architecture credential inspection and verification seal" loading="lazy" width="280" height="180" />
          </div>
          <div class="journey-icon">${icon('shield', '', 24)}</div>
          <h3>Evaluate</h3>
          <p>Inspect verified Council of Architecture (COA) registration or credentials, practice history, and real consultation reviews.</p>
          <span class="journey-sub">Verifiable standards</span>
        </div>
        <div class="journey-card">
          <div class="journey-step-num">04</div>
          <div class="journey-card-visual">
            <img src="/assets/client-how-book.svg" alt="Video consultation interface and upfront payment escrow lock" loading="lazy" width="280" height="180" />
          </div>
          <div class="journey-icon">${icon('video', '', 24)}</div>
          <h3>Book</h3>
          <p>Choose 15, 30 or 45-minute video consultations. Fees are confirmed upfront and held securely until the session completes.</p>
          <span class="journey-sub">Escrow payment hold</span>
        </div>
      </div>
    </div>
  </section>`;
}

function clientCategoriesSection() {
  return `<section class="categories-section section-pad" id="categories">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow">Professional disciplines</p>
        <h2>Expertise for every stage of your home.</h2>
        <p class="section-copy">Choose a discipline to filter verified professionals across Delhi NCR.</p>
      </div>
      <div class="discipline-cards-grid">
        ${categories.map((cat, idx) => `
          <div class="discipline-card" data-category-card="${cat.key}">
            <div class="discipline-card-head">
              <span class="discipline-num">0${idx + 1}</span>
              <span class="discipline-icon">${icon(cat.icon, '', 26)}</span>
            </div>
            <h3>${cat.title}</h3>
            <p>${cat.copy}</p>
            <div class="discipline-badge">${icon('shield', '', 14)} <span>${cat.badge}</span></div>
            <button class="button button--outline button--small discipline-filter-btn" type="button" data-filter-discipline="${cat.key}">
              Filter ${cat.title.toLowerCase()} ${icon('arrow', '', 14)}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function clientDirectoryCard(profile) {
  return `<article class="client-card" data-client-card data-id="${profile.id}" data-category="${profile.roleKey}" data-location="${profile.location}">
    <div class="client-card-media">
      <img src="${profile.image}" alt="${profile.imageAlt}" loading="lazy" width="600" height="420" />
      <span class="sample-flag">${profile.statusLabel || 'Illustrative demo profile'}</span>
      <div class="client-card-fee-badge">${profile.feeDisplay}</div>
    </div>
    <div class="client-card-body">
      <div class="client-card-header">
        <div>
          <span class="card-eyebrow">${profile.profession} · ${profile.location}</span>
          <h3 class="card-name">${profile.name}</h3>
        </div>
      </div>
      <div class="card-tags">
        ${profile.specializations.map(spec => `<span class="spec-pill">${spec}</span>`).join('')}
      </div>
      <p class="card-focus">${profile.bio || profile.focus || ''}</p>
      
      <div class="card-credentials">
        <div class="cred-item">${icon('shield', '', 15)} <span><strong>${profile.qualification}</strong></span></div>
        <div class="cred-item">${icon('calendar', '', 15)} <span>${profile.experienceYears} years practice · ${profile.location}</span></div>
      </div>

      <div class="card-portfolio-preview">
        <span class="portfolio-label">${icon('layers', '', 14)} Portfolio examples (sample):</span>
        <ul class="portfolio-list">
          ${profile.portfolioSamples.map(sample => `<li>${sample}</li>`).join('')}
        </ul>
      </div>

      <div class="card-reviews-policy">
        <span class="reviews-flag">${icon('message', '', 14)} ${profile.reviewsNote}</span>
      </div>

      <div class="client-card-actions">
        <button class="button button--outline button--small card-action-btn" type="button" data-profile-open="${profile.id}">
          View profile
        </button>
        <button class="compare-toggle card-action-btn" type="button" data-compare-toggle="${profile.id}" aria-pressed="false">
          ${icon('compare', '', 15)} <span>Add to compare +</span>
        </button>
        <button class="button button--dark button--small card-action-btn" type="button" data-booking-open="${profile.id}">
          Book consultation ${icon('arrow', '', 14)}
        </button>
      </div>
    </div>
  </article>`;
}

function clientDirectorySection() {
  return `<section class="directory-section section-pad" id="directory">
    <div class="container">
      <div class="directory-section-head">
        <div>
          <p class="eyebrow">Delhi NCR Directory</p>
          <h2>Explore verified professionals.</h2>
          <p class="section-copy">Browse sample profiles. In production, live profiles undergo manual qualification checks before listing.</p>
        </div>
        <div class="directory-toolbar-pills">
          <span class="active-location-pill">${icon('pin', '', 15)} Delhi NCR</span>
          <span class="active-count-badge" data-client-count>4 illustrative profiles</span>
        </div>
      </div>

      <div class="directory-filter-bar">
        <div class="filter-group">
          <button class="filter-pill is-active" type="button" data-pill-filter="all">All disciplines</button>
          <button class="filter-pill" type="button" data-pill-filter="architect">Architects</button>
          <button class="filter-pill" type="button" data-pill-filter="interior">Interior designers</button>
          <button class="filter-pill" type="button" data-pill-filter="vastu">Vastu consultants</button>
        </div>
        <div class="filter-search-wrap">
          ${icon('search', '', 16)}
          <input type="search" placeholder="Search by name, focus or area..." data-directory-filter-input aria-label="Search directory" />
        </div>
      </div>

      <div class="client-cards-grid" data-client-cards-grid>
        ${illustrativeProfiles.map(clientDirectoryCard).join('')}
      </div>

      <div class="empty-directory-state" data-client-empty hidden>
        <div class="empty-state-art">
          <img src="/assets/empty-search.svg" alt="Architectural drafting blueprint with magnifying glass indicating zero search matches" width="240" height="160" />
        </div>
        <div class="empty-icon">${icon('search', '', 32)}</div>
        <h3>No sample profiles match your criteria.</h3>
        <p>Try resetting your search query or discipline filter.</p>
        <button class="button button--outline" type="button" data-reset-client-filters>Reset filters</button>
      </div>

      <!-- Progressive Comparison Dock (Stage 2) -->
      <div class="client-compare-dock" data-compare-tray hidden aria-label="Selected professionals for comparison">
        <div class="compare-dock-inner">
          <div class="compare-dock-info">
            <div class="compare-dock-count">
              ${icon('compare', '', 18)}
              <span><strong>Comparison Tray</strong> (<span data-compare-count>0</span> of 2 selected)</span>
            </div>
            <div class="compare-limit-alert" data-compare-limit-alert hidden>
              ${icon('info', '', 13)} <span>You can compare up to 2 professionals at a time.</span>
            </div>
          </div>
          
          <div class="compare-slots-container" data-compare-slots>
            <div class="compare-slot" data-compare-slot="0">
              <span class="compare-slot-empty">+ Select first professional</span>
            </div>
            <div class="compare-slot" data-compare-slot="1">
              <span class="compare-slot-empty">+ Select second professional</span>
            </div>
          </div>

          <div class="compare-dock-actions">
            <button class="button button--dark button--small" type="button" data-open-compare disabled>
              Compare these professionals ${icon('arrow', '', 14)}
            </button>
            <button class="compare-clear-btn" type="button" data-clear-compare aria-label="Clear all selected professionals">
              Clear all
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function clientTrustSection() {
  return `<section class="trust-deep-section section-pad" id="trust">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow">Trust & integrity framework</p>
        <h2>Verification before visibility.</h2>
        <p class="section-copy">Vastoco does not allow self-certification, fake badges, or automated bot listings. Here is how each professional is verified before joining.</p>
      </div>
      <div class="trust-pillars-grid">
        <div class="trust-pillar-card">
          <div class="pillar-icon-box">${icon('shield', '', 28)}</div>
          <h3>Architects: COA Register Verification</h3>
          <p>Every architect in India must be registered under the Architects Act, 1972. Vastoco verifies each applicant's <strong>Council of Architecture (COA) registration number</strong> directly against the official COA public register, cross-referencing degree credentials from accredited universities.</p>
          <ul class="pillar-checklist">
            <li>${icon('check', '', 14)} Active COA registration check</li>
            <li>${icon('check', '', 14)} Accredited B.Arch/M.Arch degree audit</li>
            <li>${icon('check', '', 14)} Verifiable Delhi NCR practice address</li>
          </ul>
        </div>
        <div class="trust-pillar-card">
          <div class="pillar-icon-box">${icon('house', '', 28)}</div>
          <h3>Interior Designers: Documented Practice</h3>
          <p>Interior architecture is evaluated through government-issued identity verification paired with accredited design education (e.g. NID, CEPT, institutional diplomas) and an audit of completed, documented residential projects.</p>
          <ul class="pillar-checklist">
            <li>${icon('check', '', 14)} Government identity verification</li>
            <li>${icon('check', '', 14)} Degree or recognized design diploma</li>
            <li>${icon('check', '', 14)} Documented residential portfolio review</li>
          </ul>
        </div>
        <div class="trust-pillar-card">
          <div class="pillar-icon-box">${icon('layers', '', 28)}</div>
          <h3>Vastu Consultants: Certified Practice</h3>
          <p>Vastu consultants are vetted through verified professional certifications in spatial and directional planning, identity verification, and documented case studies of structural and layout recommendations.</p>
          <ul class="pillar-checklist">
            <li>${icon('check', '', 14)} Recognized Vastu Shastra certification</li>
            <li>${icon('check', '', 14)} Government identity authentication</li>
            <li>${icon('check', '', 14)} Client engagement history review</li>
          </ul>
        </div>
      </div>
      <div class="trust-banner-alert">
        <div class="alert-icon">${icon('info', '', 20)}</div>
        <div>
          <strong>Transparent Prototype Notice</strong>
          <p>The sample profiles displayed on this prototype are illustrative demonstrations of the UX layout. No real credentials have been evaluated for these sample cards, and no fake live status is claimed.</p>
        </div>
      </div>
    </div>
  </section>`;
}

function clientConsultationsSection() {
  return `<section class="consultations-section section-pad" id="consultations">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow">Transparent consultations</p>
        <h2>Paid video consultations: 15, 30 or 45 minutes.</h2>
        <p class="section-copy">Designed for homeowners who need professional clarity without committing to a full design retainer.</p>
      </div>
      <div class="duration-cards-grid">
        <div class="duration-tier-card">
          <span class="tier-badge">15 Minutes</span>
          <div class="tier-time"><strong>15</strong><span>min</span></div>
          <h3>Focused Query</h3>
          <p>Best for targeted spatial questions, municipal sanction feasibility, or a quick Vastu entrance orientation check.</p>
          <ul class="tier-features">
            <li>${icon('check', '', 14)} Single room or drawing review</li>
            <li>${icon('check', '', 14)} Specific technical or Vastu question</li>
            <li>${icon('check', '', 14)} Upfront fee confirmed before booking</li>
          </ul>
          <button class="button button--outline button--small button--wide" type="button" data-book-duration="15">
            Book 15 min session
          </button>
        </div>
        <div class="duration-tier-card duration-tier-card--featured">
          <span class="tier-badge tier-badge--popular">Most Recommended</span>
          <div class="tier-time"><strong>30</strong><span>min</span></div>
          <h3>Standard Review</h3>
          <p>The ideal duration for evaluating an architectural floor plan, interior remodel layout, or preliminary project scope.</p>
          <ul class="tier-features">
            <li>${icon('check', '', 14)} Comprehensive layout evaluation</li>
            <li>${icon('check', '', 14)} Material & structural advice</li>
            <li>${icon('check', '', 14)} Written summary points post-session</li>
          </ul>
          <button class="button button--dark button--small button--wide" type="button" data-book-duration="30">
            Book 30 min session
          </button>
        </div>
        <div class="duration-tier-card">
          <span class="tier-badge">45 Minutes</span>
          <div class="tier-time"><strong>45</strong><span>min</span></div>
          <h3>In-Depth Assessment</h3>
          <p>Designed for full-home renovations, new villa construction briefs, or complex structural and Vastu alignments.</p>
          <ul class="tier-features">
            <li>${icon('check', '', 14)} Multi-room architectural analysis</li>
            <li>${icon('check', '', 14)} Budget, timeline & contractor guidance</li>
            <li>${icon('check', '', 14)} Detailed project roadmap discussion</li>
          </ul>
          <button class="button button--outline button--small button--wide" type="button" data-book-duration="45">
            Book 45 min session
          </button>
        </div>
      </div>
      <div class="escrow-feature-card">
        <div class="escrow-feature-visual">
          <img src="/assets/client-payment-escrow.svg" alt="Escrow vault and upfront fee protection diagram" loading="lazy" width="320" height="200" />
        </div>
        <div class="escrow-feature-copy">
          <span class="escrow-feature-badge">${icon('lock', '', 14)} Escrow Security Standard</span>
          <h3>Fees protected until your session concludes.</h3>
          <p>Every consultation booked on Vastoco is backed by our upfront fee transparency guarantee. Your payment is safely held in escrow and only released to the professional after the video meeting is completed.</p>
        </div>
      </div>
      <div class="payment-guarantee-grid">
        <div class="guarantee-item">
          ${icon('lock', '', 22)}
          <div>
            <strong>Escrow Payment Protection</strong>
            <p>Your payment is held safely until the consultation concludes. If the professional fails to attend, your fee is refunded in full.</p>
          </div>
        </div>
        <div class="guarantee-item">
          ${icon('wallet', '', 22)}
          <div>
            <strong>Zero Hidden Surcharges</strong>
            <p>The fee you see is the exact amount you pay. Platform fees (15%) are deducted from the practitioner's payout, never added to your bill.</p>
          </div>
        </div>
        <div class="guarantee-item">
          ${icon('calendar', '', 22)}
          <div>
            <strong>Flexible Rescheduling</strong>
            <p>Reschedule your consultation up to 24 hours prior to your scheduled time without penalty.</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function clientReviewsPolicySection() {
  return `<section class="reviews-policy-section section-pad" id="reviews-policy">
    <div class="container">
      <div class="reviews-policy-layout">
        <div class="reviews-policy-copy">
          <p class="eyebrow">Authentic feedback only</p>
          <h2>Real consultation reviews.<br/><em>Never fabricated.</em></h2>
          <p>Most home design portals are flooded with unverified 5-star testimonials, stock photos, and purchased reviews. Vastoco enforces a strict review policy to maintain architectural integrity.</p>
          <div class="policy-points">
            <div class="policy-point">
              ${icon('check', '', 18)}
              <div>
                <strong>Verified Consultation Attendance Required</strong>
                <p>Only clients who have booked, paid for, and completed a live video consultation on Vastoco can submit a review.</p>
              </div>
            </div>
            <div class="policy-point">
              ${icon('check', '', 18)}
              <div>
                <strong>Zero Anonymous or Sponsored Feedback</strong>
                <p>Every review is tied to a verified booking ID and authenticated client profile. Sponsored endorsements are prohibited.</p>
              </div>
            </div>
            <div class="policy-point">
              ${icon('check', '', 18)}
              <div>
                <strong>Both Praise and Critique are Published</strong>
                <p>Professionals cannot curate, hide, or delete unfavorable reviews. Honest feedback creates genuine transparency.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="reviews-policy-visual">
          <div class="review-policy-card">
            <div class="policy-badge">${icon('shield', '', 15)} Strict Integrity Standard</div>
            <h3>Review Eligibility Check</h3>
            <div class="eligibility-flow">
              <div class="eligibility-step is-valid">
                <span class="step-status">${icon('check', '', 14)}</span>
                <div><strong>Completed Video Session</strong><small>Session timestamp verified</small></div>
              </div>
              <div class="eligibility-step is-valid">
                <span class="step-status">${icon('check', '', 14)}</span>
                <div><strong>Authenticated Client Account</strong><small>Identity confirmed via email/phone</small></div>
              </div>
              <div class="eligibility-step is-valid">
                <span class="step-status">${icon('check', '', 14)}</span>
                <div><strong>Single Review Per Booking</strong><small>Prevents review manipulation</small></div>
              </div>
            </div>
            <p class="sample-notice-inline">Current sample profiles display 0 reviews because live sessions have not yet occurred on this prototype.</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function clientProjectPlannerSection() {
  return `<section class="planner-section section-pad" id="planner">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow">Project planning guide</p>
        <h2>Define your budget, scope and timeline.</h2>
        <p class="section-copy">Prepare for your consultation with realistic expectations for architectural and interior projects in Delhi NCR.</p>
      </div>
      <div class="planner-layout">
        <div class="planner-form-panel">
          <div class="planner-step-group">
            <label class="planner-label">1. What is the scope of your project?</label>
            <div class="scope-options-grid" data-scope-picker>
              <button class="scope-btn is-active" type="button" data-scope="New Villa / Ground-up Build">
                <strong>New Villa Build</strong>
                <small>Architectural sanction, structural & spatial layout</small>
              </button>
              <button class="scope-btn" type="button" data-scope="Complete Interior Renovation">
                <strong>Full Home Interior</strong>
                <small>Flooring, millwork, lighting & bathroom overhaul</small>
              </button>
              <button class="scope-btn" type="button" data-scope="Structural Alteration / Floor Addition">
                <strong>Floor Addition</strong>
                <small>Terrace room, structural column checks & layout</small>
              </button>
              <button class="scope-btn" type="button" data-scope="Vastu Spatial Realignment">
                <strong>Vastu Realignment</strong>
                <small>Entrance, kitchen and bedroom energy assessment</small>
              </button>
            </div>
          </div>

          <div class="planner-row-group">
            <div class="planner-field">
              <label class="planner-label" for="planner-budget">2. Approximate construction / interior budget</label>
              <select id="planner-budget" data-planner-budget>
                <option value="Under ₹15 Lakhs">Under ₹15 Lakhs (Focused room / Vastu)</option>
                <option value="₹15–35 Lakhs">₹15–35 Lakhs (Standard 2–3 BHK interior)</option>
                <option value="₹35–75 Lakhs" selected>₹35–75 Lakhs (Premium 3–4 BHK renovation)</option>
                <option value="₹75 Lakhs – ₹1.5 Crore">₹75 Lakhs – ₹1.5 Crore (Luxury interior / builder floor)</option>
                <option value="Over ₹1.5 Crore">Over ₹1.5 Crore (Ground-up villa construction)</option>
                <option value="Exploring budget">Not sure yet / Needs expert guidance</option>
              </select>
            </div>

            <div class="planner-field">
              <label class="planner-label" for="planner-timeline">3. Target project timeline</label>
              <select id="planner-timeline" data-planner-timeline>
                <option value="Ready now (Within 30 days)">Ready now (Within 30 days)</option>
                <option value="1 to 3 months" selected>1 to 3 months (Planning phase)</option>
                <option value="3 to 6 months">3 to 6 months (Future possession)</option>
                <option value="More than 6 months">More than 6 months (Long-term exploration)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="planner-recommendation-panel" data-planner-advice>
          <div class="planner-scope-visual">
            <img src="/assets/client-planner-scope.svg" alt="Architectural project scope, budget tiers, and timeline milestone axonometric" loading="lazy" width="460" height="260" />
          </div>
          <div class="recom-header">
            <span class="recom-kicker">${icon('spark', '', 16)} Recommended consultation approach</span>
            <h3 data-recom-title>30-Minute Architectural Review</h3>
          </div>
          <div class="recom-body">
            <p data-recom-text>For a <strong>New Villa / Ground-up Build</strong> with a <strong>₹35–75 Lakhs</strong> budget starting in <strong>1 to 3 months</strong>, we recommend preparing your plot drawings, municipal zoning guidelines, and family spatial wishlist prior to the call.</p>
            <div class="recom-checklist">
              <strong>What to bring to the session:</strong>
              <ul data-recom-list>
                <li>CAD drawings or sanctioned layout sketch</li>
                <li>Site photographs and directional orientation (North indicator)</li>
                <li>Primary functional questions or pain points</li>
              </ul>
            </div>
            <button class="button button--dark button--wide" type="button" data-planner-book-btn>
              Book this consultation ${icon('arrow', '', 16)}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function clientCrossDoorSection() {
  return `<section class="cross-door-section section-pad">
    <div class="container cross-door-inner">
      <div>
        <p class="eyebrow">For Architects & Designers</p>
        <h2>Are you a design professional in Delhi NCR?</h2>
        <p>Build a verified public profile, offer paid video consultations with 85% payout, and receive qualified client briefs from homeowners planning projects.</p>
      </div>
      <div class="cross-door-actions">
        ${actionLink('/professionals', 'Explore the professional experience', 'light')}
        <a class="door-link-subtle" href="/professionals/join">Join as a professional &rarr;</a>
      </div>
    </div>
  </section>`;
}

function clientComparisonDialog() {
  return `<dialog class="compare-dialog" data-compare-dialog aria-label="Compare professionals side by side">
    <div class="dialog-head">
      <div>
        <p class="eyebrow">Side-by-side comparison</p>
        <h2>Compare the details.</h2>
      </div>
      <button class="icon-button" type="button" data-close-compare-dialog aria-label="Close comparison">
        ${icon('close')}
      </button>
    </div>
    <div class="compare-table" data-compare-table></div>
    <p class="profile-disclaimer">All content in this comparison is illustrative. No real professional or fee information is displayed without verified platform data.</p>
  </dialog>`;
}

function clientProfileModal() {
  return `<dialog class="profile-dialog" data-profile-modal aria-label="Professional profile preview">
    <div class="dialog-head">
      <div>
        <span class="sample-flag">Sample profile · Illustrative only</span>
        <h2 data-modal-profile-name>Sample Professional Profile</h2>
        <p class="modal-profile-subtitle" data-modal-profile-sub>Architect · Delhi NCR</p>
      </div>
      <button class="icon-button" type="button" data-close-profile-dialog aria-label="Close profile">
        ${icon('close')}
      </button>
    </div>
    <div class="modal-profile-content">
      <div class="modal-profile-art">
        <img src="/assets/project-residential.webp" alt="Portfolio artwork" data-modal-profile-img width="600" height="360" />
      </div>
      <div class="modal-profile-body">
        <div class="modal-profile-cred-box">
          <div class="modal-cred-item">
            ${icon('shield', '', 16)}
            <div>
              <strong>Verification Standard</strong>
              <p data-modal-profile-verif>Council of Architecture (COA) register check</p>
            </div>
          </div>
          <div class="modal-cred-item">
            ${icon('file', '', 16)}
            <div>
              <strong>Experience & Practice</strong>
              <p data-modal-profile-exp>12 years practice</p>
            </div>
          </div>
        </div>
        <div class="modal-profile-portfolio">
          <strong>Portfolio Highlights (Sample):</strong>
          <ul data-modal-profile-portfolio>
            <li>Residential project</li>
          </ul>
        </div>
        <div class="modal-profile-pricing">
          <strong>Upfront Consultation Rates:</strong>
          <div class="modal-pricing-grid" data-modal-profile-pricing>
            <div><span>15 min</span><strong>₹1,200</strong></div>
            <div><span>30 min</span><strong>₹2,000</strong></div>
            <div><span>45 min</span><strong>₹2,800</strong></div>
          </div>
        </div>
        <p class="modal-disclaimer">${icon('info', '', 14)} <span>Reviews on Vastoco are collected only after verified video consultations. 0 reviews on sample profile.</span></p>
        <div class="modal-actions">
          <button class="button button--dark button--wide" type="button" data-modal-book-trigger>
            Book video consultation ${icon('arrow', '', 15)}
          </button>
        </div>
      </div>
    </div>
  </dialog>`;
}

function clientBookingDialog() {
  return `<dialog class="booking-dialog" data-booking-dialog aria-label="Book video consultation demonstration">
    <div class="dialog-head">
      <div>
        <p class="eyebrow">Interactive consultation booking</p>
        <h2>Book a Video Consultation.</h2>
        <p class="dialog-sub">Select duration, time slot, and outline your project requirements.</p>
      </div>
      <button class="icon-button" type="button" data-close-booking-dialog aria-label="Close booking">
        ${icon('close')}
      </button>
    </div>
    <form class="booking-modal-form" data-modal-booking-form novalidate>
      <div class="booking-step-section">
        <label class="modal-field-label">1. Choose professional</label>
        <select name="selectedProfessional" data-booking-select-pro required>
          ${illustrativeProfiles.map(p => `<option value="${p.id}">${p.name} (${p.category} — ${p.feeDisplay})</option>`).join('')}
        </select>
      </div>

      <div class="booking-step-section">
        <label class="modal-field-label">2. Select session duration</label>
        <div class="duration-pills-row" data-modal-duration-group>
          <label class="duration-pill-option">
            <input type="radio" name="modalDuration" value="15" />
            <span><strong>15 min</strong><small>Focused query</small></span>
          </label>
          <label class="duration-pill-option">
            <input type="radio" name="modalDuration" value="30" checked />
            <span><strong>30 min</strong><small>Standard review</small></span>
          </label>
          <label class="duration-pill-option">
            <input type="radio" name="modalDuration" value="45" />
            <span><strong>45 min</strong><small>In-depth scope</small></span>
          </label>
        </div>
      </div>

      <div class="booking-step-section">
        <label class="modal-field-label">3. Select preferred video slot (Delhi NCR / IST)</label>
        <div class="slot-pills-grid" data-slot-picker>
          <button class="slot-pill is-selected" type="button" data-slot="Tomorrow at 10:00 AM">Tomorrow 10:00 AM</button>
          <button class="slot-pill" type="button" data-slot="Tomorrow at 2:30 PM">Tomorrow 2:30 PM</button>
          <button class="slot-pill" type="button" data-slot="Saturday at 11:00 AM">Saturday 11:00 AM</button>
          <button class="slot-pill" type="button" data-slot="Saturday at 4:00 PM">Saturday 4:00 PM</button>
        </div>
        <input type="hidden" name="selectedSlot" value="Tomorrow at 10:00 AM" data-selected-slot-input />
      </div>

      <div class="booking-step-section booking-grid-fields">
        <div>
          <label class="modal-field-label" for="booking-project-type">Project type</label>
          <select id="booking-project-type" name="projectType" required>
            <option value="New Villa / Residential Architecture">New Villa / Residential Architecture</option>
            <option value="Apartment Interior Renovation">Apartment Interior Renovation</option>
            <option value="Structural Alteration & Addition">Structural Alteration & Addition</option>
            <option value="Vastu Directional Guidance">Vastu Directional Guidance</option>
          </select>
        </div>
        <div>
          <label class="modal-field-label" for="booking-budget">Estimated budget</label>
          <select id="booking-budget" name="budget" required>
            <option value="Under ₹15 Lakhs">Under ₹15 Lakhs</option>
            <option value="₹15–35 Lakhs">₹15–35 Lakhs</option>
            <option value="₹35–75 Lakhs" selected>₹35–75 Lakhs</option>
            <option value="₹75 Lakhs – ₹1.5 Crore">₹75 Lakhs – ₹1.5 Crore</option>
            <option value="Over ₹1.5 Crore">Over ₹1.5 Crore</option>
          </select>
        </div>
      </div>

      <div class="booking-step-section">
        <label class="modal-field-label" for="booking-scope-text">Project scope / questions</label>
        <textarea id="booking-scope-text" name="scope" rows="3" placeholder="Briefly describe what drawings or questions you would like to discuss..." required></textarea>
      </div>

      <div class="booking-cost-breakdown">
        <div class="breakdown-row">
          <span>Upfront Consultation Fee</span>
          <strong data-booking-calc-fee>₹2,000</strong>
        </div>
        <div class="breakdown-row breakdown-row--subtle">
          <span>Professional Share (85%)</span>
          <span data-booking-pro-share>₹1,700</span>
        </div>
        <div class="breakdown-row breakdown-row--subtle">
          <span>Vastoco Platform Fee (15%)</span>
          <span data-booking-platform-fee>₹300 (included)</span>
        </div>
        <div class="booking-escrow-badge">
          ${icon('lock', '', 14)}
          <span><strong>Payment Protection:</strong> Funds held in escrow until session is complete. 24-hour reschedule protection.</span>
        </div>
      </div>

      <button class="button button--dark button--wide" type="submit">
        Confirm consultation demonstration ${icon('arrow', '', 16)}
      </button>
      <div class="form-status" data-booking-form-status aria-live="polite"></div>
    </form>

    <div class="booking-demo-success" data-booking-success-box hidden>
      <div class="success-icon">${icon('check', '', 32)}</div>
      <h3>Consultation demonstration confirmed.</h3>
      <p class="success-lede">Your video consultation request has been prepared for review.</p>
      <div class="confirmed-summary-card" data-confirmed-summary></div>
      <div class="demo-integrity-notice">
        ${icon('info', '', 16)}
        <span><strong>Frontend Prototype Notice:</strong> This is a UX demonstration. No payment was collected, no credit card was charged, and no actual appointment was booked.</span>
      </div>
      <button class="button button--outline button--wide" type="button" data-close-booking-dialog>
        Close preview
      </button>
    </div>
  </dialog>`;
}

export function clientPage() {
  const content = `
    ${unifiedDiscoverySection({ isPublic: true })}
    ${clientConsultationsSection()}
    ${clientTrustSection()}
    ${clientCrossDoorSection()}
    ${clientComparisonDialog()}
    ${clientProfileModal()}
    ${clientBookingDialog()}
  `;
  return pageFrame(content, { audience: 'client', active: 'client' });
}

function professionalHero() {
  return `<section class="audience-hero pro-hero section-pad">
    <div class="container audience-hero-grid audience-hero-grid--pro">
      <div class="audience-hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Delhi NCR · For Architects, Interior Designers & Vastu Consultants</p>
        <h1>Make your work visible. <em>Grow your practice.</em></h1>
        <p class="hero-lede">Build a verified public profile, offer paid video consultations with transparent 85% earnings, and receive qualified client briefs from homeowners planning projects across Delhi NCR.</p>
        
        <div class="hero-actions">
          <a class="button button--dark" href="/professionals/join">Join Vastoco — it’s free ${icon('arrow', 'button-arrow', 16)}</a>
          <a class="button button--outline" href="/professionals#how-it-works">See how it works ${icon('arrow', 'button-arrow', 16)}</a>
        </div>

        <div class="pro-workspace-jump-link">
          <a href="/professional" class="door-link-subtle door-link-subtle--dark">
            ${icon('briefcase', '', 14)} <strong>Already verified? Open Practice Workspace &rarr;</strong>
          </a>
        </div>

        <div class="earnings-inline">
          <div class="earnings-number">85<span>%</span></div>
          <div>
            <strong>You keep 85% of every consultation fee.</strong>
            <small>Joining is free. Vastoco deducts a 15% platform commission to maintain escrow protection, COA registry verification, and video infrastructure.</small>
          </div>
        </div>

        <div class="hero-trust-badges">
          <span>${icon('shield', '', 15)} <strong>COA register check for architects</strong></span>
          <span>${icon('video', '', 15)} <strong>Paid 15, 30 & 45 min sessions</strong></span>
          <span>${icon('file', '', 15)} <strong>Structured client briefs</strong></span>
        </div>
      </div>

      <div class="pro-hero-showcase">
        <div class="pro-hero-art-frame">
          <img src="/assets/professional-door-02-architect-at-work.png" alt="Architect at drafting table developing residential plans with architectural models" fetchpriority="high" width="600" height="420" />
          <div class="pro-art-badge pro-art-badge--top">
            <span class="sample-chip">Verified Practice</span>
            <strong>Architectural Monograph</strong>
            <small>Delhi NCR · Verified credentials</small>
          </div>
          <div class="pro-art-badge pro-art-badge--bottom">
            ${icon('wallet', '', 15)}
            <span><strong>85% Professional Share</strong> · Paid video consultations</span>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function professionalJourneySection() {
  return `<section class="journey-section section-pad" id="how-it-works">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow">The professional journey</p>
        <h2>Understand. Trust. Showcase. Join.</h2>
        <p class="section-copy">A dignified, transparent pathway designed specifically for architectural and design professionals in Delhi NCR.</p>
      </div>

      <div class="editorial-rows-list">
      <!-- Row 1: Understand (Illustration Left, Content Right) -->
      <article class="editorial-row">
        <div class="editorial-visual">
          <img src="/assets/journey-understand.svg" alt="Architect reviewing project drawings during paid video consultation" loading="lazy" width="540" height="360" />
        </div>
        <div class="editorial-body">
          <span class="editorial-step">01 / Understand</span>
          <h3>Paid consultation opportunities.</h3>
          <p>Offer structured 15, 30 or 45-minute video consultations directly through your public profile. Clients pay upfront, and payments are held securely in escrow until the session concludes. You set your own consultation rates; Vastoco takes a transparent 15% platform commission.</p>
          <div class="editorial-pills">
            <span>${icon('video', '', 14)} 15, 30 or 45 min durations</span>
            <span>${icon('wallet', '', 14)} Escrow payment protection</span>
            <span>${icon('check', '', 14)} Zero unpaid speculative work</span>
          </div>
        </div>
      </article>

      <!-- Row 2: Trust (Content Left, Illustration Right) -->
      <article class="editorial-row editorial-row--reverse">
        <div class="editorial-visual">
          <img src="/assets/journey-trust.svg" alt="Council of Architecture statutory verification and credentials review" loading="lazy" width="540" height="360" />
        </div>
        <div class="editorial-body">
          <span class="editorial-step">02 / Trust</span>
          <h3>Verified public profiles that mean something.</h3>
          <p>Build genuine client confidence through verified credentials. For architects, Vastoco performs a direct Council of Architecture (COA) register check. For interior designers and Vastu consultants, identity and portfolio reviews establish verifiable practice history. Never fake stars or paid reviews.</p>
          <div class="editorial-pills">
            <span>${icon('shield', '', 14)} COA statutory registry check</span>
            <span>${icon('message', '', 14)} Authentic review policy</span>
            <span>${icon('lock', '', 14)} Private credential review</span>
          </div>
        </div>
      </article>

      <!-- Row 3: Showcase (Illustration Left, Content Right) -->
      <article class="editorial-row">
        <div class="editorial-visual">
          <img src="/assets/journey-showcase.svg" alt="Architectural monograph presentation with plans and models" loading="lazy" width="540" height="360" />
        </div>
        <div class="editorial-body">
          <span class="editorial-step">03 / Showcase</span>
          <h3>Portfolios built for real architectural work.</h3>
          <p>Present your drawings, floor plans, material specifications, and built photography in an editorial monograph format. Highlight your design philosophy, past project scales, and practice specializations across Delhi NCR.</p>
          <div class="editorial-pills">
            <span>${icon('layers', '', 14)} Floor plans & elevations</span>
            <span>${icon('file', '', 14)} Documented project scales</span>
            <span>${icon('check', '', 14)} Architectural typography</span>
          </div>
        </div>
      </article>

      <!-- Row 4: Join (Content Left, Illustration Right) -->
      <article class="editorial-row editorial-row--reverse">
        <div class="editorial-visual">
          <img src="/assets/journey-join.svg" alt="Architect creating profile and setting consultation fees" loading="lazy" width="540" height="360" />
        </div>
        <div class="editorial-body">
          <span class="editorial-step">04 / Join</span>
          <h3>Free to join. You keep 85% of every fee.</h3>
          <p>Joining Vastoco is completely free. There are no monthly listing subscriptions or hidden charges. When clients book paid video consultations, you keep 85% of each fee. Paid consultations require a paid plan; the 15% commission is deducted from the professional’s fee, not added to the client’s price.</p>
          <div class="editorial-pills">
            <span>${icon('wallet', '', 14)} Free profile setup</span>
            <span>${icon('shield', '', 14)} Keep 85% of your consultation fee</span>
            <span>${icon('arrow', '', 14)} Transparent economics</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>`;
}

function professionalPillarsSection() {
  return `<section class="section-pad benefits-editorial-section" id="benefits">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow">Practice growth pillars</p>
        <h2>Three ways Vastoco supports your practice.</h2>
        <p class="section-copy">Built around the workflow of architects, interior designers, and Vastu consultants—not generic contractor listings.</p>
      </div>

      <div class="editorial-rows-list">
        <!-- Feature Row 1: Paid Consultations (Illustration Left, Content Right) -->
        <article class="editorial-row">
          <div class="editorial-visual">
            <img src="/assets/benefit-consultations.svg" alt="Paid video consultations with transparent 85-15 split" loading="lazy" width="540" height="360" />
          </div>
          <div class="editorial-body">
            <span class="editorial-step">Pillar 01 / Monetization</span>
            <h3>Paid consultations with fair economics.</h3>
            <p>Monetize your preliminary spatial and design advice. Offer structured 15, 30 or 45-minute video consultations directly from your profile. You set your own consultation fees; payments are collected upfront and held safely in escrow until the session concludes. Paid consultations require a paid plan; the 15% commission is deducted from the professional’s fee, not added to the client’s price.</p>
            <div class="editorial-calc-box">
              <strong>Transparent Payout Model (Keep 85%):</strong>
              <p>Example: ₹1,400 consultation fee → <strong>₹1,190 paid to you (85%)</strong> · ₹210 platform commission (15%)</p>
            </div>
            <div class="editorial-pills">
              <span>${icon('clock', '', 14)} 15, 30 or 45 min durations</span>
              <span>${icon('wallet', '', 14)} Keep 85% of your fee</span>
            </div>
          </div>
        </article>

        <!-- Feature Row 2: Verified Public Profiles (Content Left, Illustration Right) -->
        <article class="editorial-row editorial-row--reverse">
          <div class="editorial-visual">
            <img src="/assets/benefit-profile.svg" alt="Verified public architectural profile monograph" loading="lazy" width="540" height="360" />
          </div>
          <div class="editorial-body">
            <span class="editorial-step">Pillar 02 / Public Standing</span>
            <h3>Verified public profiles that stand out.</h3>
            <p>Differentiate your practice with an editorial profile that showcases your verified credentials, Council of Architecture (COA) registration, design philosophy, and portfolio of work.</p>
            <div class="editorial-pills">
              <span>${icon('shield', '', 14)} Official COA registry check</span>
              <span>${icon('message', '', 14)} Reviews only from completed sessions</span>
              <span>${icon('check', '', 14)} High-resolution monograph</span>
            </div>
          </div>
        </article>

        <!-- Feature Row 3: Structured Client Briefs (Illustration Left, Content Right) -->
        <article class="editorial-row">
          <div class="editorial-visual">
            <img src="/assets/benefit-briefs.svg" alt="Structured client project brief with budget, scope and timeline" loading="lazy" width="540" height="360" />
          </div>
          <div class="editorial-body">
            <span class="editorial-step">Pillar 03 / Client Preparation</span>
            <h3>Structured client briefs before meetings.</h3>
            <p>Receive pre-qualified project briefs from homeowners planning new villas, full apartment renovations, or spatial alignments across Delhi NCR with clear scope and budget ranges before the call starts.</p>
            <div class="editorial-pills">
              <span>${icon('pin', '', 14)} Delhi NCR project matching</span>
              <span>${icon('layers', '', 14)} Budget, timeline & scope included</span>
              <span>${icon('file', '', 14)} Floor plans & photos attached</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>`;
}

function professionalPortfolioShowcaseSection() {
  return `<section class="section-pad portfolio-demo-section" id="portfolio-demo">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow">Portfolio presentation</p>
        <h2>What your public portfolio looks like.</h2>
        <p class="section-copy">Designed like an architectural monograph: clean grid alignment, strong typography, and generous negative space.</p>
      </div>
      
      <div class="portfolio-demo-card">
        <div class="portfolio-demo-header">
          <div class="demo-pro-avatar">
            <img src="/assets/architect-workspace.svg" alt="Architect profile avatar" width="64" height="64" />
          </div>
          <div class="demo-pro-info">
            <div class="demo-pro-title-row">
              <h3>Sample: Studio Aakar</h3>
              <span class="verified-seal">${icon('shield', '', 14)} <b>COA Verified</b></span>
            </div>
            <p class="demo-pro-meta">Architect & Spatial Planner · South Delhi & Gurgaon · 12 years practice · B.Arch (SPA Delhi)</p>
          </div>
          <div class="demo-pro-rates">
            <span class="rates-label">Consultation rates</span>
            <strong>From ₹1,200 / 15 min</strong>
            <small>₹2,000 / 30 min · ₹2,800 / 45 min</small>
          </div>
        </div>

        <div class="portfolio-demo-tabs">
          <button class="portfolio-tab is-active" type="button" data-pro-tab="villas">Residential Architecture</button>
          <button class="portfolio-tab" type="button" data-pro-tab="interiors">Interior Joinery</button>
          <button class="portfolio-tab" type="button" data-pro-tab="drawings">Sanction Drawings</button>
        </div>

        <div class="portfolio-demo-gallery" data-pro-gallery>
          <div class="gallery-item gallery-item--large">
            <img src="/assets/project-residential.webp" alt="Residential villa facade in Delhi NCR" loading="lazy" width="600" height="400" />
            <div class="gallery-caption">
              <strong>Gulmohar Park Villa</strong>
              <small>Residential Architecture · 4,200 sq.ft · Delhi NCR</small>
            </div>
          </div>
          <div class="gallery-item">
            <img src="/assets/project-interior.webp" alt="Interior living space and millwork" loading="lazy" width="300" height="200" />
            <div class="gallery-caption">
              <strong>Courtyard Living Lounge</strong>
              <small>Bespoke Millwork & Lighting</small>
            </div>
          </div>
          <div class="gallery-item">
            <img src="/assets/floorplan-sketch.svg" alt="Detailed architectural drawing" loading="lazy" width="300" height="200" />
            <div class="gallery-caption">
              <strong>Structural Layout & Sanctions</strong>
              <small>MCD Sanction Drawing Set</small>
            </div>
          </div>
        </div>

        <div class="portfolio-demo-footer">
          <p class="demo-disclaimer-inline">${icon('info', '', 15)} <span>Sample layout for demonstration. Profiles go live only after credential review and project submission.</span></p>
          <a class="button button--dark button--small" href="/professionals/join">Build your portfolio profile ${icon('arrow', '', 14)}</a>
        </div>
      </div>
    </div>
  </section>`;
}

function professionalVerificationSection() {
  return `<section class="section-pad verification-section" id="verification">
    <div class="container verification-layout">
      <div class="verification-art">
        <img class="verif-dynamic-img" data-verif-image src="/assets/verify-architect.svg" alt="Council of Architecture register verification illustration" loading="lazy" width="540" height="380" />
        <span class="verification-stamp">${icon('shield', '', 18)}<b>Credentials matter</b></span>
      </div>
      <div class="verification-copy">
        <div class="section-intro">
          <p class="eyebrow">Trust starts with clarity</p>
          <h2>A verified profile means something.</h2>
          <p class="section-copy">Vastoco’s professional verification is intended to help clients understand who they are considering. We never invent arbitrary rules or claim unverified checks.</p>
        </div>

        <div class="verification-checklist-tabs" data-verif-tabs role="tablist" aria-label="Verification disciplines">
          <button class="verif-tab is-active" type="button" role="tab" aria-selected="true" data-discipline="architect" data-img="/assets/verify-architect.svg">Architects</button>
          <button class="verif-tab" type="button" role="tab" aria-selected="false" data-discipline="interior" data-img="/assets/verify-interior.svg">Interior Designers</button>
          <button class="verif-tab" type="button" role="tab" aria-selected="false" data-discipline="vastu" data-img="/assets/verify-vastu.svg">Vastu Consultants</button>
        </div>

        <div class="verification-points" data-verif-content>
          <div class="verif-pane is-active" data-verif-pane="architect">
            <strong>Architects: Council of Architecture (COA) register check</strong>
            <p>Architect verification includes a Council of Architecture register check and supporting qualification documents. Under the Architects Act, 1972, we verify that your registration number is active on the official COA national register.</p>
            <ul class="verif-check-list">
              <li>${icon('check', '', 14)} Active Council of Architecture (COA) registration number</li>
              <li>${icon('check', '', 14)} Direct cross-check against official COA statutory public register</li>
              <li>${icon('check', '', 14)} Supporting architectural qualification documents</li>
            </ul>
          </div>
          <div class="verif-pane" data-verif-pane="interior" hidden>
            <strong>Interior designers: Identity and documented practice</strong>
            <p>Identity plus qualification or documented practice, supported by relevant certificates, degrees or diplomas from recognized institutions and verified project portfolios.</p>
            <ul class="verif-check-list">
              <li>${icon('check', '', 14)} Government photo identity verification</li>
              <li>${icon('check', '', 14)} Relevant degree, diploma or certified design credential</li>
              <li>${icon('check', '', 14)} Documented residential interior portfolio review</li>
            </ul>
          </div>
          <div class="verif-pane" data-verif-pane="vastu" hidden>
            <strong>Vastu consultants: Certified spatial practice</strong>
            <p>Identity plus documented certification in spatial and directional planning, supported by verified case studies of residential layout recommendations.</p>
            <ul class="verif-check-list">
              <li>${icon('check', '', 14)} Government photo identity verification</li>
              <li>${icon('check', '', 14)} Recognized Vastu Shastra certification or spatial training credential</li>
              <li>${icon('check', '', 14)} Documented client spatial consultation history</li>
            </ul>
          </div>
        </div>

        <p class="verification-private-note">${icon('lock', '', 15)} <span>Credentials are checked before a professional profile goes live; documents are held private to the review process and never published publicly.</span></p>
      </div>
    </div>
  </section>`;
}

function professionalEarningsSection() {
  return `<section class="earnings-section section-pad" id="economics">
    <div class="container earnings-layout">
      <div class="earnings-copy">
        <p class="eyebrow">A clear fee split</p>
        <h2>Your expertise.<br/><em>Your consultation.</em></h2>
        <p>Joining Vastoco is free. Professionals keep 85% of every paid consultation fee. Paid consultations require a paid plan; the 15% commission is deducted from the professional’s fee, not added to the client’s price.</p>
        <p class="earnings-clarity-note">No hidden transaction surcharges. No lead generation subscription fees. No client markups.</p>
        
        <div class="earnings-calculator" data-earnings-calc>
          <label class="calc-label" for="calc-fee-select">Calculate your payout per consultation:</label>
          <div class="calc-input-wrap">
            <span>Your Consultation Fee:</span>
            <select id="calc-fee-select" data-calc-fee>
              <option value="1200">₹1,200 (15 min focused query)</option>
              <option value="2000" selected>₹2,000 (30 min standard review)</option>
              <option value="2800">₹2,800 (45 min in-depth review)</option>
              <option value="3500">₹3,500 (Detailed villa session)</option>
              <option value="5000">₹5,000 (Multi-discipline advisory)</option>
            </select>
          </div>
          <div class="calc-payout-display">
            <div class="payout-stat">
              <span>Your Net Payout (85%)</span>
              <strong data-calc-payout>₹1,700</strong>
            </div>
            <div class="payout-stat payout-stat--platform">
              <span>Vastoco Platform Share (15%)</span>
              <span data-calc-platform>₹300</span>
            </div>
          </div>
        </div>

        ${actionLink('/professionals/join', 'Start your profile — Free to join', 'light')}
      </div>

      <div class="earnings-diagram">
        <div class="earnings-pie" aria-label="85 percent professional share, 15 percent Vastoco share">
          <div class="earnings-pie-center">
            <strong>85%</strong>
            <span>Professional share</span>
          </div>
        </div>
        <div class="earnings-legend">
          <span><i class="legend-dot legend-dot--pro"></i>Professional — 85% (keep 85%)</span>
          <span><i class="legend-dot legend-dot--platform"></i>Vastoco — 15% (15% commission is deducted from the professional)</span>
        </div>
        <small>Illustration of the published consultation fee split. No income is guaranteed and no client volume is promised.</small>
      </div>
    </div>
  </section>`;
}

function professionalOnboardingStepsSection() {
  return `<section class="section-pad how-section" id="how-it-works">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow">Getting started</p>
        <h2>Set up your presence in three steps.</h2>
        <p class="section-copy">A guided setup helps you prepare a complete, verified professional profile before publishing.</p>
      </div>
      <div class="steps-grid">
        <article class="step-card">
          <span class="step-number">01</span>
          ${icon('user', 'step-icon', 24)}
          <h3>Create your account</h3>
          <p>Start with essential contact and practice details. Specify your discipline, Delhi NCR service areas, and primary typologies.</p>
          <span class="step-action-note">Free to join</span>
        </article>
        <article class="step-card">
          <span class="step-number">02</span>
          ${icon('shield', 'step-icon', 24)}
          <h3>Complete verification</h3>
          <p>Follow the applicable credential checks for your profession. Architects provide their COA registration number; designers submit practice documents.</p>
          <span class="step-action-note">Manual audit</span>
        </article>
        <article class="step-card">
          <span class="step-number">03</span>
          ${icon('layers', 'step-icon', 24)}
          <h3>Showcase your work</h3>
          <p>Add high-resolution project drawings, photographs, and define your consultation rates for 15, 30, and 45-minute video sessions.</p>
          <span class="step-action-note">Profile goes live</span>
        </article>
      </div>
      <div class="steps-cta-center">
        <a class="button button--dark" href="/professionals/join">Begin professional setup ${icon('arrow', '', 16)}</a>
      </div>
    </div>
  </section>`;
}

function professionalCrossDoorSection() {
  return `<section class="cross-door-section cross-door-section--light section-pad">
    <div class="container cross-door-inner">
      <div>
        <p class="eyebrow">Looking for someone to help with your space?</p>
        <h2>Find the right expertise for your project.</h2>
        <p>Explore the client experience to discover verified architects, interior designers and Vastu consultants across Delhi NCR.</p>
      </div>
      <div class="cross-door-actions">
        ${actionLink('/clients', 'Explore for clients', 'dark')}
        <a class="door-link-subtle door-link-subtle--dark" href="/clients/explore">Browse directory &rarr;</a>
      </div>
    </div>
  </section>`;
}

function professionalBriefsTeaserSection() {
  return `<section class="section-pad briefs-teaser-section" id="client-opportunities">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow"><span class="eyebrow-dot"></span> High-Intent Delhi NCR Demand</p>
        <h2>Qualified Client Briefs. No Cold Pitching.</h2>
        <p class="section-copy">Homeowners in Noida, Gurugram, South Delhi and Faridabad post verified project briefs. Browse scope and budget parameters, then propose structured 15, 30 or 45-minute video consultations.</p>
      </div>

      <div class="pro-teaser-briefs-grid">
        <article class="pro-teaser-brief-card">
          <div class="teaser-card-header">
            <span class="brief-cat-pill">Architecture</span>
            <span class="brief-locality">Sector 44, Noida</span>
          </div>
          <h3>Modern Biophilic Villa Architecture</h3>
          <p class="teaser-meta">500 sq. yard plot · G+2 Residential Villa · Design & Bylaw Review</p>
          <div class="teaser-specs">
            <span><strong>Budget:</strong> ₹45L – ₹75L</span>
            <span><strong>Timeline:</strong> 3–6 Months</span>
          </div>
          <p class="teaser-snippet">"Looking for a licensed architect with biophilic courtyard experience to review Noida Authority setbacks and internal zoning..."</p>
          <div class="teaser-footer">
            <span class="teaser-privacy">${icon('lock', '', 12)} Client contact protected</span>
            <a href="/professional/briefs/brief-noida-44" class="button button--small button--outline">View in Workspace ${icon('arrow', '', 12)}</a>
          </div>
        </article>

        <article class="pro-teaser-brief-card">
          <div class="teaser-card-header">
            <span class="brief-cat-pill">Interior Design</span>
            <span class="brief-locality">DLF Phase 5, Gurugram</span>
          </div>
          <h3>Minimalist 4BHK Penthouse Interior Overhaul</h3>
          <p class="teaser-meta">4,200 sq. ft. Built-up · High-Rise Duplex · Microtopping & Joinery</p>
          <div class="teaser-specs">
            <span><strong>Budget:</strong> ₹30L – ₹50L</span>
            <span><strong>Timeline:</strong> Immediate</span>
          </div>
          <p class="teaser-snippet">"Complete bare-shell renovation requiring architectural lighting critique and Italian stone millwork coordination..."</p>
          <div class="teaser-footer">
            <span class="teaser-privacy">${icon('lock', '', 12)} Client contact protected</span>
            <a href="/professional/briefs/brief-gurugram-penthouse" class="button button--small button--outline">View in Workspace ${icon('arrow', '', 12)}</a>
          </div>
        </article>

        <article class="pro-teaser-brief-card">
          <div class="teaser-card-header">
            <span class="brief-cat-pill">Vastu Consultancy</span>
            <span class="brief-locality">South Extension Part II, New Delhi</span>
          </div>
          <h3>Heritage Residence Spatial Balancing & Vastu</h3>
          <p class="teaser-meta">3,600 sq. ft. Colonial Bungalow · Non-invasive Remedies</p>
          <div class="teaser-specs">
            <span><strong>Budget:</strong> ₹60L – ₹1 Crore</span>
            <span><strong>Timeline:</strong> 4–8 Months</span>
          </div>
          <p class="teaser-snippet">"Need non-destructive spatial orientation review for an inherited bungalow without structural demolition..."</p>
          <div class="teaser-footer">
            <span class="teaser-privacy">${icon('lock', '', 12)} Client contact protected</span>
            <a href="/professional/briefs/brief-south-delhi-vastu" class="button button--small button--outline">View in Workspace ${icon('arrow', '', 12)}</a>
          </div>
        </article>
      </div>

      <div class="teaser-cta-center">
        <a href="/professional/briefs" class="button button--dark">
          Open Professional Opportunity Board ${icon('arrow', '', 16)}
        </a>
      </div>
    </div>
  </section>`;
}

function professionalFaqSection() {
  return `<section class="section-pad pro-faq-section" id="faq">
    <div class="container">
      <div class="section-intro">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Transparent Practice Governance</p>
        <h2>Frequently Asked Questions</h2>
        <p class="section-copy">Clear answers on verification, payouts, client confidentiality, and consultation governance.</p>
      </div>

      <div class="faq-accordion-list">
        <details class="faq-item" open>
          <summary class="faq-summary">
            <strong>How does the 85% professional payout and 15% platform commission work?</strong>
            <span class="faq-chevron">${icon('arrow', '', 14)}</span>
          </summary>
          <div class="faq-answer">
            <p>Joining Vastoco is completely free with zero subscription or recurring listing fees. When a client books a paid video consultation (15, 30, or 45 minutes), the consultation fee is held securely in escrow. Vastoco deducts a 15% platform commission to cover payment processing, statutory COA registry verification, and high-definition video infrastructure. You retain 85% of your consultation fee, transferred directly to your verified bank account.</p>
          </div>
        </details>

        <details class="faq-item">
          <summary class="faq-summary">
            <strong>How does Council of Architecture (COA) statutory verification work?</strong>
            <span class="faq-chevron">${icon('arrow', '', 14)}</span>
          </summary>
          <div class="faq-answer">
            <p>Under the Architects Act, 1972, the title of "Architect" in India is legally restricted to individuals registered with the Council of Architecture. Vastoco performs a direct cross-check against the official COA public register. Once your registration number is verified active, your public monograph displays the verified COA seal and registration number.</p>
          </div>
        </details>

        <details class="faq-item">
          <summary class="faq-summary">
            <strong>What credentials are required for Interior Designers and Vastu Consultants?</strong>
            <span class="faq-chevron">${icon('arrow', '', 14)}</span>
          </summary>
          <div class="faq-answer">
            <p>For interior designers, Vastoco audits government photo identification, relevant institutional degrees or diplomas (such as CEPT, NID, IIID membership or recognized design institutes), and a portfolio of completed projects. For Vastu consultants, we verify identity, recognized spatial credentials, and residential consultation case studies focusing on non-destructive remedies.</p>
          </div>
        </details>

        <details class="faq-item">
          <summary class="faq-summary">
            <strong>How are client contact details and project privacy protected?</strong>
            <span class="faq-chevron">${icon('arrow', '', 14)}</span>
          </summary>
          <div class="faq-answer">
            <p>Client telephone numbers, email addresses, and exact plot coordinates are never published openly or sold to lead aggregators. In the opportunity feed, you review verified project scopes, localities, and budget ranges. Direct communication and meeting links are issued only once a consultation proposal is mutually accepted.</p>
          </div>
        </details>

        <details class="faq-item">
          <summary class="faq-summary">
            <strong>Can I set my own consultation fees and durations?</strong>
            <span class="faq-chevron">${icon('arrow', '', 14)}</span>
          </summary>
          <div class="faq-answer">
            <p>Yes. You have complete autonomy to configure your standard rates for 15-minute diagnostic queries, 30-minute standard drawing reviews, and 45-minute comprehensive design advisories in your practice dashboard.</p>
          </div>
        </details>
      </div>
    </div>
  </section>`;
}

export function professionalPage() {
  const content = `
    ${professionalHero()}
    ${professionalPillarsSection()}
    ${professionalJourneySection()}
    ${professionalVerificationSection()}
    ${professionalPortfolioShowcaseSection()}
    ${professionalEarningsSection()}
    ${professionalBriefsTeaserSection()}
    ${professionalFaqSection()}
    ${professionalOnboardingStepsSection()}
    ${professionalCrossDoorSection()}
  `;
  return pageFrame(content, { audience: 'professional', active: 'professional' });
}

export function signupPage(role = null) {
  const isClient = role === 'client';
  const isProfessional = role === 'professional';

  const intentBanner = role ? `
    <div class="role-intent-badge">
      ${icon(isClient ? 'house' : 'briefcase', '', 16)}
      <span>Intent: <strong>${isClient ? 'Client Account' : 'Professional Account'}</strong> (${isClient ? 'Looking for a professional' : 'Design practice'})</span>
      <a href="/signup" class="role-intent-switch">Change intent</a>
    </div>` : '';

  const title = isClient
    ? 'Create your client account.'
    : isProfessional
      ? 'Start your professional presence.'
      : 'How would you like to use Vastoco?';

  const subtitle = isClient
    ? 'Save your project details, compare verified professionals, and continue to consultation booking.'
    : isProfessional
      ? 'Create an account to begin your verified professional setup and access qualified client briefs.'
      : 'Choose the experience that brings you here. You can add another role later if the platform supports it.';

  const rolePicker = role ? '' : `<div class="role-choice-grid">
    <button type="button" class="role-choice" data-role-choice="client">
      <span class="role-choice-icon">${icon('house', '', 24)}</span>
      <strong>I’m looking for a professional</strong>
      <small>Find, compare and consult architects, interior designers and Vastu consultants across Delhi NCR.</small>
      <span class="role-choice-arrow">${icon('arrow', '', 17)}</span>
    </button>
    <button type="button" class="role-choice" data-role-choice="professional">
      <span class="role-choice-icon">${icon('briefcase', '', 24)}</span>
      <strong>I’m a design professional</strong>
      <small>Build a verified public profile, offer paid video consultations and receive qualified client briefs.</small>
      <span class="role-choice-arrow">${icon('arrow', '', 17)}</span>
    </button>
  </div>
  <div class="public-explore-banner">
    <div class="public-explore-icon">${icon('compass', '', 20)}</div>
    <div>
      <strong>No account required to explore</strong>
      <p>You do not need an account merely to explore public portfolios and listings. Browse freely before deciding to book.</p>
      <a href="/clients/explore" class="button button--outline button--small">Explore professionals freely ${icon('arrow', '', 14)}</a>
    </div>
  </div>`;

  const form = role ? `<form class="auth-form" data-form="signup" novalidate>
      <input type="hidden" name="role" value="${role}" />
      <div class="form-existing-alert" data-existing-alert hidden>
        <div class="alert-icon">${icon('alert', '', 18)}</div>
        <div class="alert-body">
          <strong>An account with this email address already exists.</strong>
          <p>Please sign in to your existing account or use a different email address.</p>
          <a href="/signin" class="button button--small button--dark">Sign in to existing account ${icon('arrow', '', 14)}</a>
        </div>
      </div>
      <label>Full name<input name="name" autocomplete="name" placeholder="Your full name" required /></label>
      <label>Email address
        <input name="email" type="email" autocomplete="email" placeholder="you@example.com" data-signup-email required />
      </label>
      <div class="edge-case-controls">
        <button type="button" class="simulation-pill-btn" data-simulate-existing>${icon('alert', '', 13)} Test: Simulate existing account check</button>
      </div>
      <label>Create password<input name="password" type="password" autocomplete="new-password" minlength="8" placeholder="At least 8 characters" required /></label>
      <label class="checkbox-row"><input type="checkbox" name="terms" required /><span>I agree to Vastoco’s prototype terms and privacy guidelines.</span></label>
      <button class="button button--dark button--wide" type="submit">${isClient ? 'Create client account' : 'Continue to practice setup'} ${icon('arrow', '', 16)}</button>
      <p class="form-legal">By continuing, you agree to the platform’s terms and privacy policy. Connect live legal links before production.</p>
      <div class="form-status" data-form-status aria-live="polite"></div>
    </form>` : '';

  const content = `<section class="auth-page section-pad">
    <div class="container auth-layout">
      <div class="auth-aside">
        <a href="/" class="auth-back">${icon('back', '', 16)} Back to Vastoco</a>
        <div class="auth-aside-art"><img src="/assets/auth-gateway.svg" alt="Architectural dual-arch gateway symbolizing client and professional portals" width="340" height="240" /></div>
        <p class="eyebrow">Two doors. One platform.</p>
        <h2>Make room for the right next step.</h2>
        <p>Explore first without obligation. Create an account when you are ready to book a consultation or build your professional presence.</p>
      </div>
      <div class="auth-panel">
        <div class="auth-panel-head">
          ${intentBanner}
          <p class="eyebrow">${role ? isClient ? 'Client registration' : 'Professional registration' : 'Account creation'}</p>
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        ${rolePicker}
        ${form}
        <p class="auth-switch">Already have an account? <a href="/signin">Sign in</a></p>
        <p class="demo-disclaimer">Frontend prototype only. No account is created and no information is sent to a server.</p>
      </div>
    </div>
  </section>`;
  return pageFrame(content, { audience: 'shared', footer: { compact: true } });
}

export function signinPage() {
  const content = `<section class="auth-page section-pad">
    <div class="container auth-layout">
      <div class="auth-aside">
        <a href="/" class="auth-back">${icon('back', '', 16)} Back to Vastoco</a>
        <div class="auth-aside-art auth-aside-art--pro"><img src="/assets/architect-workspace.svg" alt="Illustration of design work" /></div>
        <p class="eyebrow">Welcome back</p>
        <h2>Your next step starts here.</h2>
        <p>Continue exploring the client experience or managing your professional presence across Delhi NCR.</p>
      </div>
      <div class="auth-panel">
        <div class="auth-panel-head">
          <p class="eyebrow">Your Vastoco account</p>
          <h1>Sign in.</h1>
          <p>Access your consultation bookings or professional practice dashboard.</p>
        </div>

        <form class="auth-form" data-form="signin" novalidate>
          <label>Email address
            <input name="email" type="email" autocomplete="email" placeholder="you@example.com" required />
          </label>
          <label>Password
            <input name="password" type="password" autocomplete="current-password" placeholder="Your password" required />
          </label>
          <div class="auth-row-options">
            <label class="checkbox-row"><input type="checkbox" name="remember" /><span>Remember this device</span></label>
            <button type="button" class="link-btn" data-toggle-recovery>Forgot password?</button>
          </div>
          <button class="button button--dark button--wide" type="submit">Sign in ${icon('arrow', '', 16)}</button>
          <div class="form-status" data-form-status aria-live="polite"></div>
        </form>

        <div class="recovery-panel" data-recovery-panel hidden>
          <div class="recovery-head">
            <span class="eyebrow">Credential recovery demonstration</span>
            <h3>Reset your password.</h3>
            <p>Enter your account email address. We will simulate sending a password reset link.</p>
          </div>
          <form class="recovery-form" data-form="recovery" novalidate>
            <label>Email address
              <input name="recoveryEmail" type="email" placeholder="you@example.com" required />
            </label>
            <div class="recovery-actions">
              <button class="button button--dark button--small" type="submit">Send recovery link ${icon('arrow', '', 14)}</button>
              <button class="button button--outline button--small" type="button" data-cancel-recovery>Back to sign in</button>
            </div>
            <div class="form-status" data-recovery-status aria-live="polite"></div>
          </form>
        </div>

        <p class="auth-switch">New to Vastoco? <a href="/signup">Create an account</a></p>
        <p class="demo-disclaimer">Frontend prototype only. Authentication is not connected; do not enter a real password.</p>
      </div>
    </div>
  </section>`;
  return pageFrame(content, { audience: 'shared', footer: { compact: true } });
}

function profileCard(profile) {
  return `<article class="directory-card" data-profile-card data-category="${profile.roleKey || profile.id.replace('sample-', '')}">
    <div class="directory-card-visual">
      <img src="${profile.image || '/assets/house-cutaway.webp'}" alt="${profile.imageAlt || 'Illustrative portfolio artwork'}" loading="lazy"/>
      <span class="sample-flag">Sample content</span>
    </div>
    <div class="directory-card-body">
      <p class="eyebrow">${profile.category}</p>
      <h2>${profile.name}</h2>
      <p>${profile.focus}</p>
      <div class="directory-meta">
        <span>${icon('pin', '', 14)} ${profile.location}</span>
        <span>${icon('file', '', 14)} ${profile.experience}</span>
      </div>
      <div class="directory-fee">
        <span>Consultation fee</span>
        <strong>${profile.feeDisplay}</strong>
      </div>
      <div class="directory-actions">
        <a class="button button--outline button--small" href="/clients/professional?id=${profile.id}">View sample profile</a>
        <button class="compare-toggle" type="button" data-compare-toggle="${profile.id}" aria-pressed="false">${icon('compare', '', 15)} Compare</button>
      </div>
    </div>
  </article>`;
}

export function explorePage() {
  const cards = illustrativeProfiles.map(profileCard).join('');
  const content = `<section class="directory-page section-pad">
    <div class="container">
      <div class="page-back-link">
        <a href="/clients">${icon('back', '', 15)} Client homepage</a>
      </div>
      <div class="directory-heading">
        <div class="directory-heading-copy">
          <p class="eyebrow">Explore professionals</p>
          <h1>Find expertise for your project.</h1>
          <p>Browse the types of professionals available on Vastoco. This prototype uses clearly labelled sample profiles, not live listings.</p>
        </div>
        <div class="directory-heading-visual">
          <img src="/assets/discovery-aerial.svg" alt="Axonometric drafting of Delhi NCR urban context with pin callouts" width="340" height="180" />
        </div>
        <div class="location-pill">${icon('pin', '', 16)} Delhi NCR</div>
      </div>
      <div class="demo-notice">
        ${icon('info', '', 17)}
        <span>Sample directory for UX demonstration. Live profiles, verification status, fees and reviews must be supplied by Vastoco.</span>
      </div>
      <div class="directory-toolbar">
        <label class="search-field">
          ${icon('search', '', 18)}
          <input type="search" placeholder="Search by expertise, name or project (e.g. residential, planning, interiors)" aria-label="Search by expertise, name or project" data-directory-search/>
        </label>
        <label class="select-field">
          <span>Specialization</span>
          <select data-directory-filter>
            <option value="all">All professionals</option>
            <option value="architect">Architects</option>
            <option value="interior">Interior designers</option>
            <option value="vastu">Vastu consultants</option>
          </select>
        </label>
      </div>
      <div class="directory-result-meta">
        <strong>Explore by expertise</strong>
        <span data-directory-count>${illustrativeProfiles.length} illustrative profiles</span>
      </div>
      <div class="directory-grid" data-directory-grid>${cards}</div>
      <div class="empty-state" data-directory-empty hidden>
        <div class="empty-state-art">
          <img src="/assets/empty-search.svg" alt="Architectural drafting blueprint with magnifying glass indicating zero search matches" width="240" height="160" />
        </div>
        <div class="empty-icon">${icon('search', '', 28)}</div>
        <h2>No matching sample profiles.</h2>
        <p>Try a different search keyword or clear the specialization filter. Live directory results would appear here when connected.</p>
        <button class="button button--outline" data-clear-filters type="button">Clear filters</button>
      </div>
      <div class="compare-tray" data-compare-tray hidden>
        <span><strong data-compare-count>0</strong> of 2 profiles selected</span>
        <button class="button button--dark button--small" type="button" data-open-compare disabled>Compare selected ${icon('arrow', '', 15)}</button>
        <button class="compare-clear" type="button" data-clear-compare>Clear</button>
      </div>
      <dialog class="compare-dialog" data-compare-dialog>
        <div class="dialog-head">
          <div>
            <p class="eyebrow">Side-by-side view</p>
            <h2>Compare the details.</h2>
          </div>
          <button class="icon-button" type="button" data-close-dialog aria-label="Close comparison">${icon('close')}</button>
        </div>
        <div class="compare-table" data-compare-table></div>
        <p class="profile-disclaimer">All content in this comparison is illustrative. No real professional or fee information is displayed.</p>
      </dialog>
    </div>
  </section>`;
  return pageFrame(content, { audience: 'client', active: 'explore' });
}

export function profilePage(profileId = 'sample-architect') {
  const profile = illustrativeProfiles.find((p) => p.id === profileId) || illustrativeProfiles[0];
  const content = `<section class="profile-page section-pad">
    <div class="container">
      <div class="page-back-link">
        <a href="/clients/explore">${icon('back', '', 15)} Back to professionals</a>
      </div>

      <div class="profile-header-banner">
        <div class="profile-header-copy">
          <div class="profile-tag-row">
            <span class="sample-flag">Sample content · Illustrative profile</span>
            <span class="status-chip status-chip--verified">${icon('shield', '', 13)} ${profile.verificationMethod}</span>
          </div>
          <h1>${profile.name}</h1>
          <p class="profile-category-lead">${profile.category} · ${profile.focus}</p>
          <div class="profile-meta-tags">
            <span>${icon('pin', '', 14)} ${profile.location}</span>
            <span>${icon('file', '', 14)} ${profile.experience}</span>
            <span>${icon('user', '', 14)} ${profile.qualification}</span>
          </div>
        </div>
      </div>

      <div class="profile-detail-grid">
        <div class="profile-detail-main">
          <div class="profile-detail-section">
            <p class="eyebrow">Practice Overview</p>
            <h2>Design Philosophy & Practice</h2>
            <p>Studio Aakar is an architectural practice specializing in bespoke residential architecture, structural renovations, and municipal building sanction compliance across Delhi NCR. The practice emphasizes contextual materiality, natural daylighting, and spatial clarity tailored to multigenerational Indian families.</p>
            <p>Every prospective engagement begins with a structured video consultation to evaluate zoning requirements, FAR calculations, spatial aspirations, and planning timelines.</p>
            <div class="practice-process-visual">
              <img src="/assets/profile-process-diagram.svg" alt="Architectural consultation workflow diagram" loading="lazy" width="580" height="180" />
            </div>
          </div>

          <div class="profile-detail-section">
            <div class="section-heading-with-action">
              <div>
                <p class="eyebrow">Selected Works</p>
                <h2>Project Portfolio</h2>
              </div>
              <button type="button" class="simulation-pill-btn" data-simulate-empty-portfolio>
                ${icon('layers', '', 13)} Simulate empty portfolio state
              </button>
            </div>

            <div class="profile-portfolio-gallery" data-portfolio-active>
              <article class="portfolio-item-card">
                <div class="portfolio-item-visual">
                  <img src="/assets/project-residential.webp" alt="Gulmohar Park Residence modern villa" loading="lazy" />
                  <span class="portfolio-tag">Residential Villa</span>
                </div>
                <div class="portfolio-item-info">
                  <strong>Gulmohar Park Residence</strong>
                  <p>4,200 sq.ft multigenerational home featuring internal courtyards, thermal mass brickwork and Delhi municipal compliance.</p>
                </div>
              </article>

              <article class="portfolio-item-card">
                <div class="portfolio-item-visual">
                  <img src="/assets/project-interior.webp" alt="DLF Phase 2 Terrace Pavilion interior joinery" loading="lazy" />
                  <span class="portfolio-tag">Renovation & Interior</span>
                </div>
                <div class="portfolio-item-info">
                  <strong>DLF Phase 2 Terrace Pavilion</strong>
                  <p>Structural penthouse extension integrating lightweight steel framing, bespoke joinery and climate-responsive shading.</p>
                </div>
              </article>

              <article class="portfolio-item-card">
                <div class="portfolio-item-visual">
                  <img src="/assets/floorplan-sketch.svg" alt="Vasant Vihar Modern Courtyard municipal sanction drawing" loading="lazy" />
                  <span class="portfolio-tag">Working Drawings</span>
                </div>
                <div class="portfolio-item-info">
                  <strong>Vasant Vihar Floorplan & Sanction Plan</strong>
                  <p>Comprehensive working drawings and sanction documentation aligned with Delhi Development Authority (DDA) bylaws.</p>
                </div>
              </article>
            </div>

            <div class="portfolio-empty-state" data-portfolio-empty hidden>
              <div class="empty-state-art">
                <img src="/assets/portfolio-empty.svg" alt="Empty architectural drafting board with drafting compass and t-square" width="240" height="160" />
              </div>
              <div class="empty-icon">${icon('layers', '', 26)}</div>
              <h3>No portfolio projects published yet.</h3>
              <p>This practice is currently assembling high-resolution photography and approved municipal sanction drawings for their Vastoco profile.</p>
              <p class="empty-note">You can still book an introductory consultation to discuss your project requirements directly with the architect.</p>
            </div>
          </div>

          <div class="profile-detail-section">
            <p class="eyebrow">Integrity & Credentials</p>
            <h2>Verification Standard</h2>
            <div class="verification-proof-box">
              <div class="proof-icon">${icon('shield', '', 22)}</div>
              <div class="proof-content">
                <strong>Council of Architecture (COA) Active Register Check</strong>
                <p>Registration: <code>CA/2012/58941</code> · Verified under Section 23 of the Architects Act 1972.</p>
                <small>Vastoco audits credentials directly against official state and statutory registers. Unverified self-declarations are never approved.</small>
              </div>
            </div>
          </div>

          <div class="profile-detail-section">
            <p class="eyebrow">Client Feedback</p>
            <h2>Consultation Reviews (0)</h2>
            <div class="review-integrity-box">
              <div class="review-integrity-icon">${icon('message', '', 22)}</div>
              <div>
                <strong>Zero reviews · Genuine consultation reviews only</strong>
                <p>${profile.reviewsNote}</p>
                <small>Vastoco enforces a zero-fake-review policy. Testimonials cannot be purchased, imported, or created without a verified completed video consultation.</small>
              </div>
            </div>
          </div>
        </div>

        <aside class="profile-booking-card">
          <p class="eyebrow">Upfront Video Consultation</p>
          <h2>Consult with ${profile.name}</h2>
          <p>Book a dedicated 1-on-1 session to discuss your architectural plans, site orientation, or renovation feasibility.</p>

          <div class="rate-breakdown-box">
            <div class="rate-row">
              <div><strong>15 minutes</strong><small>Quick feasibility & query check</small></div>
              <span class="rate-price">₹${profile.fees[15].toLocaleString('en-IN')}</span>
            </div>
            <div class="rate-row rate-row--highlight">
              <div><strong>30 minutes</strong><small>Detailed project & plan review</small><span class="rate-chip">Recommended</span></div>
              <span class="rate-price">₹${profile.fees[30].toLocaleString('en-IN')}</span>
            </div>
            <div class="rate-row">
              <div><strong>45 minutes</strong><small>Comprehensive spatial advisory</small></div>
              <span class="rate-price">₹${profile.fees[45].toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="booking-inclusions">
            <span>${icon('video', '', 15)} 1-on-1 private video meeting</span>
            <span>${icon('file', '', 15)} Live drawing & photo review</span>
            <span>${icon('wallet', '', 15)} 100% upfront fee transparency</span>
            <span>${icon('shield', '', 15)} Free cancellation up to 24 hrs prior</span>
          </div>

          <a href="/clients/booking?pro=${profile.id}&duration=30" class="button button--dark button--wide">
            Book a consultation ${icon('arrow', '', 16)}
          </a>
          <small class="booking-disclaimer">Frontend prototype demonstration. No payment is processed and no appointment is scheduled.</small>
        </aside>
      </div>
    </div>
  </section>`;
  return pageFrame(content, { audience: 'client' });
}

export function bookingPage(profileId = 'sample-architect') {
  const profile = illustrativeProfiles.find((p) => p.id === profileId) || illustrativeProfiles[0];
  const durationOptions = durations.map((duration, index) => {
    const fee = profile.fees[duration];
    return `<label class="duration-option">
      <input type="radio" name="duration" value="${duration}" data-fee="${fee}" ${index === 1 ? 'checked' : ''}/>
      <span>
        <strong>${duration}</strong>
        <small>min</small>
        <em class="duration-fee">₹${fee.toLocaleString('en-IN')}</em>
      </span>
    </label>`;
  }).join('');

  const content = `<section class="booking-page section-pad">
    <div class="container booking-container">
      <div class="page-back-link">
        <a href="/clients/professional?id=${profile.id}">${icon('back', '', 15)} Back to profile</a>
      </div>
      <div class="booking-heading">
        <p class="eyebrow">Plan your consultation</p>
        <h1>Book a Video Consultation with ${profile.name}.</h1>
        <p>Select your session duration, pick a consultation slot, and outline your project details. All fees are transparent upfront with zero hidden charges.</p>
      </div>

      <div class="booking-layout">
        <form class="booking-form" data-form="booking" novalidate>
          <fieldset>
            <legend>1. Choose consultation duration</legend>
            <div class="duration-options">${durationOptions}</div>
          </fieldset>

          <fieldset class="slot-fieldset">
            <legend>2. Select consultation date & time</legend>
            <div class="date-chips">
              <label class="date-chip"><input type="radio" name="slotDate" value="Tomorrow" checked /><span>Tomorrow</span></label>
              <label class="date-chip"><input type="radio" name="slotDate" value="In 2 days" /><span>In 2 days</span></label>
              <label class="date-chip"><input type="radio" name="slotDate" value="In 3 days" /><span>In 3 days</span></label>
            </div>

            <div class="slot-alert" data-slot-alert hidden>
              <div class="state-alert-art">
                <img src="/assets/state-slot-unavailable.svg" alt="Calendar grid with unavailable time slot cross hatch" width="64" height="64" />
              </div>
              <div class="alert-icon">${icon('alert', '', 16)}</div>
              <div>
                <strong>Selected time slot is unavailable.</strong>
                <p>That consultation slot is already booked or reserved. Please choose an available time highlighted below.</p>
              </div>
            </div>

            <div class="slot-grid">
              <button type="button" class="slot-btn" data-slot="10:00 AM">10:00 AM</button>
              <button type="button" class="slot-btn slot-btn--unavailable" data-slot="11:30 AM" data-slot-unavailable="true">
                11:30 AM <span class="slot-status">Booked</span>
              </button>
              <button type="button" class="slot-btn is-selected" data-slot="02:00 PM">02:00 PM</button>
              <button type="button" class="slot-btn" data-slot="03:30 PM">03:30 PM</button>
              <button type="button" class="slot-btn slot-btn--unavailable" data-slot="05:00 PM" data-slot-unavailable="true">
                05:00 PM <span class="slot-status">Unavailable</span>
              </button>
              <button type="button" class="slot-btn" data-slot="06:30 PM">06:30 PM</button>
            </div>
            <input type="hidden" name="selectedTime" value="02:00 PM" />
          </fieldset>

          <fieldset class="project-details-fieldset">
            <legend>3. Tell us about your project</legend>
            <label>What are you planning?
              <select name="projectType" required>
                <option value="">Select a project type</option>
                <option value="New home">New home construction</option>
                <option value="Interior design">Interior design & space planning</option>
                <option value="Renovation">Residential renovation / extension</option>
                <option value="Structural addition">Structural addition & sanction</option>
                <option value="Vastu consultation">Vastu directional alignment</option>
                <option value="Other">Other architectural consultation</option>
              </select>
            </label>
            <label>Approximate project budget
              <select name="budget" required>
                <option value="">Choose a planning range</option>
                <option value="Under ₹10 lakh">Under ₹10 lakh</option>
                <option value="₹10–25 lakh">₹10–25 lakh</option>
                <option value="₹25–50 lakh">₹25–50 lakh</option>
                <option value="₹50 lakh–₹1 crore">₹50 lakh–₹1 crore</option>
                <option value="Over ₹1 crore">Over ₹1 crore</option>
                <option value="Not sure yet">Not sure yet (exploring feasibility)</option>
              </select>
              <small>This is a planning estimate to help guide the discussion, not a commercial commitment.</small>
            </label>
            <label>Project timeline
              <select name="timeline" required>
                <option value="">Choose your timeline</option>
                <option value="As soon as possible">As soon as possible (Within 30 days)</option>
                <option value="Within 1–3 months">Within 1–3 months</option>
                <option value="Within 3–6 months">Within 3–6 months</option>
                <option value="More than 6 months">More than 6 months</option>
                <option value="Still exploring">Still exploring concepts</option>
              </select>
            </label>
            <label>What would you like help with?
              <textarea name="scope" rows="4" maxlength="500" placeholder="Share your key questions, property location in Delhi NCR, or the specific decisions you would like to discuss." required></textarea>
              <div class="textarea-footer">
                <small>Keep it brief. You can share drawings and photos during the call.</small>
                <span class="char-count" data-char-count>500 characters remaining</span>
              </div>
            </label>
          </fieldset>

          <fieldset class="payment-fieldset">
            <legend>4. Payment & Checkout Simulation</legend>
            <div class="payment-method-pills">
              <label class="payment-pill"><input type="radio" name="paymentMethod" value="UPI" checked /><span>UPI (GPay / PhonePe)</span></label>
              <label class="payment-pill"><input type="radio" name="paymentMethod" value="Card" /><span>Credit / Debit Card</span></label>
              <label class="payment-pill"><input type="radio" name="paymentMethod" value="Netbanking" /><span>Netbanking</span></label>
            </div>

            <div class="simulation-alert-box">
              <label class="checkbox-row simulation-checkbox-row">
                <input type="checkbox" name="simulatePaymentFailure" data-simulate-payment-failure />
                <span><strong>Simulate payment gateway failure / decline</strong> (Demonstrates error recovery and input preservation)</span>
              </label>
            </div>
          </fieldset>

          <button class="button button--dark button--wide" type="submit" data-submit-btn>
            Confirm & Pay Upfront (<span data-submit-fee>₹${profile.fees[30].toLocaleString('en-IN')}</span>) ${icon('arrow', '', 16)}
          </button>
          <div class="form-status" data-form-status aria-live="polite"></div>
        </form>

        <aside class="booking-summary">
          <p class="eyebrow">Upfront Fee Summary</p>
          <h2>Clear details. No surprises.</h2>

          <div class="summary-line">
            <span>Professional</span>
            <strong>${profile.name}</strong>
          </div>
          <div class="summary-line">
            <span>Format</span>
            <strong>1-on-1 Video Consultation</strong>
          </div>
          <div class="summary-line">
            <span>Date & Slot</span>
            <strong data-summary-slot>Tomorrow at 02:00 PM</strong>
          </div>
          <div class="summary-line">
            <span>Duration</span>
            <strong data-summary-duration>30 minutes</strong>
          </div>
          <div class="summary-line">
            <span>Consultation Fee</span>
            <strong data-summary-fee>₹${profile.fees[30].toLocaleString('en-IN')}</strong>
          </div>
          <div class="summary-line">
            <span>Taxes & Secure Processing</span>
            <strong>Included</strong>
          </div>
          <div class="summary-line summary-line--total">
            <span>Total Payable Upfront</span>
            <strong class="total-amount" data-summary-total>₹${profile.fees[30].toLocaleString('en-IN')}</strong>
          </div>

          <div class="summary-escrow-badge">
            <div class="summary-escrow-art">
              <img src="/assets/client-payment-escrow.svg" alt="Escrow protection seal" width="80" height="52" />
            </div>
            <div>
              <strong>Escrow Protection Guaranteed</strong>
              <small>Your fee remains protected until the consultation concludes.</small>
            </div>
          </div>

          <div class="summary-note">
            ${icon('shield', '', 18)}
            <span>Payment should only be collected through Vastoco’s secure, connected checkout. This prototype demonstrates frontend validation without processing real money.</span>
          </div>

          <div class="booking-confirmation" data-booking-confirmation hidden></div>
        </aside>
      </div>
    </div>
  </section>`;
  return pageFrame(content, { audience: 'client' });
}

function joinStep(step) {
  const steps = [
    {
      title: 'Your details',
      kicker: 'Start with the basics',
      body: `<div class="onboarding-step-visual">
        <img src="/assets/onboarding-account.svg" alt="Architectural drafting desk with credentials journal and identification card" width="180" height="120" />
      </div>
      <div class="form-grid">
        <label>Full name<input name="fullName" autocomplete="name" placeholder="Your full name" required/></label>
        <label>Practice / Studio name<input name="practiceName" placeholder="e.g. Studio Aakar Architects" required/></label>
        <label>Email address<input name="email" type="email" autocomplete="email" placeholder="you@example.com" required/></label>
        <label>Phone number<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+91 98000 00000" required/></label>
      </div>`
    },
    {
      title: 'About your practice',
      kicker: 'What best describes your work?',
      body: `<div class="onboarding-step-visual">
        <img src="/assets/onboarding-practice.svg" alt="Architectural studio workplace with building models and drafting desk" width="180" height="120" />
      </div>
      <label>Professional category
        <select name="profession" required>
          <option value="">Choose your category</option>
          <option value="Architect">Architect</option>
          <option value="Interior designer">Interior designer</option>
          <option value="Vastu consultant">Vastu consultant</option>
        </select>
      </label>
      <label>Practice location<input name="practiceLocation" value="Delhi NCR" required/></label>
      <label>Specialization<input name="specialization" placeholder="e.g. Residential villas, structural additions"/></label>
      <label>Years in active practice
        <select name="experienceYears">
          <option>1–3 years</option>
          <option>4–7 years</option>
          <option selected>8–12 years</option>
          <option>13+ years</option>
        </select>
      </label>`
    },
    {
      title: 'Credential verification',
      kicker: 'Build a profile clients can trust',
      body: `<div class="onboarding-step-visual">
        <img src="/assets/onboarding-credentials.svg" alt="Council of Architecture registration seal and Section 23 compliance document" width="180" height="120" />
      </div>
      <div class="verification-instructions">
        <div class="verification-instruction-icon">${icon('shield', '', 24)}</div>
        <div>
          <strong>Verification status starts as pending.</strong>
          <p data-verification-guidance aria-live="polite">Choose your professional category in the previous step to see the relevant checklist. This prototype does not collect credential documents or perform a verification check.</p>
        </div>
      </div>
      
      <div class="correction-alert" data-correction-alert hidden>
        <div class="state-alert-art">
          <img src="/assets/state-correction-needed.svg" alt="Document verification seal with correction markup tag" width="64" height="64" />
        </div>
        <div class="alert-icon">${icon('alert', '', 20)}</div>
        <div class="alert-body">
          <strong>Action Required: COA Certificate Needs Re-upload</strong>
          <p>The submitted Council of Architecture registration document is missing the current renewal endorsement. Please upload a clear scan of your 2026 COA renewal receipt to complete verification.</p>
          <button type="button" class="button button--small button--dark" data-reupload-btn>Re-upload document ${icon('upload', '', 14)}</button>
        </div>
      </div>
      <div class="edge-case-controls">
        <button type="button" class="simulation-pill-btn" data-simulate-correction>
          ${icon('alert', '', 14)} Simulate: Document Needs Correction state
        </button>
      </div>

      <label class="conditional-coa" data-coa-field>COA registration number
        <input name="coaNumber" placeholder="Enter your COA registration number (e.g. CA/2012/58941)"/>
        <small>Required for the architect verification path under the Architects Act 1972. This prototype does not check the number.</small>
      </label>
      <p class="credential-privacy-note">In the live service, credential documents should be submitted through Vastoco’s private verification process. This demo does not upload or store them.</p>
      <label class="checkbox-row">
        <input type="checkbox" name="verificationConsent" required/>
        <span>I understand this is a prototype and no credential check is being performed.</span>
      </label>`
    },
    {
      title: 'Showcase your work',
      kicker: 'Add a first look at your portfolio',
      body: `<div class="onboarding-step-visual">
        <img src="/assets/onboarding-portfolio.svg" alt="Project presentation drawing with layout plans, photographs, and scale ruler" width="180" height="120" />
      </div>
      <label>Profile introduction
        <textarea name="bio" rows="3" maxlength="450" placeholder="A short introduction to your practice, architectural philosophy, and typical projects across Delhi NCR." required></textarea>
      </label>
      <label>Project title<input name="projectTitle" placeholder="A project you would like to showcase (e.g. Gulmohar Park Residence)"/></label>
      
      <div class="upload-error-alert" data-upload-error hidden>
        <div class="state-alert-art">
          <img src="/assets/state-upload-error.svg" alt="Architectural drawing cloud upload icon with break line indicating network disconnection" width="64" height="64" />
        </div>
        <div class="alert-icon">${icon('alert', '', 18)}</div>
        <div class="alert-body">
          <strong>Upload failed: Network connection interrupted</strong>
          <p>The image file could not be transferred. Please verify your connection and retry uploading.</p>
          <button type="button" class="button button--small button--outline" data-retry-upload>Retry upload ${icon('refresh', '', 14)}</button>
        </div>
      </div>

      <div class="missing-portfolio-alert" data-missing-portfolio-alert hidden>
        <div class="state-alert-art">
          <img src="/assets/portfolio-empty.svg" alt="Empty architectural drafting board" width="64" height="64" />
        </div>
        <div class="alert-icon">${icon('info', '', 18)}</div>
        <div class="alert-body">
          <strong>No portfolio projects added yet.</strong>
          <p>We recommend showcasing at least one project before finishing. You may proceed as a draft, but your profile will remain hidden in search until at least one project is added.</p>
        </div>
      </div>

      <div class="upload-controls-row">
        <label class="upload-zone" for="portfolio-upload">
          ${icon('upload', '', 22)}
          <strong>Add project images</strong>
          <span>JPG, PNG or WebP · Up to 5 images (Max 8 MB per file)</span>
          <input id="portfolio-upload" type="file" name="portfolio" accept="image/png,image/jpeg,image/webp" multiple/>
        </label>
      </div>
      <div class="edge-case-controls">
        <button type="button" class="simulation-pill-btn" data-simulate-upload-fail>
          ${icon('upload', '', 13)} Simulate upload failure
        </button>
      </div>
      <div class="upload-previews" data-upload-previews></div>`
    },
    {
      title: 'Review your profile',
      kicker: 'A quick check before you finish',
      body: `<div class="onboarding-step-visual">
        <img src="/assets/onboarding-review.svg" alt="Editorial profile layout preview with architectural monograph format and 85 percent earnings callout" width="180" height="120" />
      </div>
      <div class="profile-review-card">
        <span class="sample-flag">Preview only · Verification pending</span>
        <h3 data-review-name>Your name</h3>
        <p data-review-practice>Your Practice</p>
        <p data-review-profession>Professional category</p>
        <p data-review-location>Delhi NCR</p>
        <div class="review-status-pill">${icon('clock', '', 15)} Verification pending</div>
        <div class="review-bio-box">
          <strong>About your practice</strong>
          <p data-review-bio>Your introduction will appear here.</p>
        </div>
        <div class="review-portfolio" data-review-project>Project preview will appear here.</div>
        <div class="earnings-summary-box">
          ${icon('wallet', '', 16)}
          <span><strong>85% Payout Terms:</strong> You retain 85% of each consultation fee. The 15% platform commission is deducted from your fee, never added to the client price.</span>
        </div>
      </div>
      <p class="demo-disclaimer">This step does not publish a profile or submit documents. A secure, verified backend flow would be required for production.</p>`
    }
  ];
  const item = steps[step];
  return `<div class="join-step ${step === 0 ? 'is-current' : ''}" data-join-step="${step}" ${step === 0 ? '' : 'hidden'}>
    <p class="eyebrow">${item.kicker}</p>
    <h2>${item.title}</h2>
    ${item.body}
  </div>`;
}

export function professionalJoinPage() {
  const content = `<section class="join-page section-pad">
    <div class="container join-container">
      <div class="page-back-link">
        <a href="/professionals">${icon('back', '', 15)} Professional homepage</a>
      </div>

      <div class="resume-draft-banner" data-resume-banner hidden>
        <div class="alert-icon">${icon('refresh', '', 16)}</div>
        <div class="resume-copy">
          <strong>Resumed from your saved session draft.</strong>
          <span>Your previous entries have been restored.</span>
        </div>
        <button type="button" class="button button--small button--outline" data-clear-draft>Start fresh</button>
      </div>

      <div class="join-heading">
        <p class="eyebrow">Join Vastoco · Free to join</p>
        <h1>Build your professional presence.</h1>
        <p>A guided setup for your account, practice details, verification and portfolio. Free to join with transparent 85% consultation payouts.</p>
      </div>

      <div class="join-layout">
        <aside class="join-sidebar">
          <div class="join-progress">
            <span data-progress-label>Step 1 of 5</span>
            <div class="progress-track"><i data-progress-bar style="width:20%"></i></div>
          </div>
          <ol class="join-step-list">
            <li class="is-current" data-step-label="0"><span>01</span>Your details</li>
            <li data-step-label="1"><span>02</span>Your practice</li>
            <li data-step-label="2"><span>03</span>Verification</li>
            <li data-step-label="3"><span>04</span>Portfolio</li>
            <li data-step-label="4"><span>05</span>Review</li>
          </ol>
          <div class="join-save-action">
            <button type="button" class="button button--outline button--small button--wide" data-save-draft>
              ${icon('file', '', 14)} Save draft progress
            </button>
            <span class="save-draft-status" data-save-status></span>
          </div>
          <div class="join-sidebar-note">
            ${icon('lock', '', 17)}
            <span>Form progress is held in this browser session so you can resume. Passwords and images are not uploaded or transmitted in this prototype.</span>
          </div>
        </aside>

        <form class="join-form" data-form="professional-join" novalidate>
          ${[0, 1, 2, 3, 4].map(joinStep).join('')}
          <div class="join-actions">
            <button class="button button--outline" type="button" data-join-back disabled>Back</button>
            <div class="join-actions-right">
              <button class="button button--dark" type="button" data-join-next>Continue ${icon('arrow', '', 16)}</button>
            </div>
          </div>
          <div class="form-status" data-form-status aria-live="polite"></div>
        </form>
      </div>
    </div>
  </section>`;
  return pageFrame(content, { audience: 'professional' });
}

export function notFoundPage() {
  const content = `<section class="not-found section-pad">
    <div class="container not-found-layout">
      <div class="not-found-visual">
        <img src="/assets/state-not-found.svg" alt="Architectural blueprint with missing wall section and question mark" width="320" height="200" />
      </div>
      <div class="not-found-copy">
        <p class="eyebrow">404 · Page not found</p>
        <h1>Let's find the right way in.</h1>
        <p>The architectural page you were looking for may have moved, or the link may be incomplete. Choose one of our two primary doors below.</p>
        <div class="hero-actions">
          ${actionLink('/', 'Back to Vastoco Gateway')}
          ${actionLink('/clients', 'For clients', 'outline')}
          ${actionLink('/professionals', 'For professionals', 'outline')}
        </div>
      </div>
    </div>
  </section>`;
  return pageFrame(content, { audience: 'shared' });
}
