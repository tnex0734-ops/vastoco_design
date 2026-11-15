import {
  homePage, clientPage, professionalPage, signupPage, signinPage,
  explorePage, profilePage, bookingPage, professionalJoinPage, notFoundPage,
  clientWorkspacePage, clientComparePage, clientSavedPage, clientConsultationsPage,
  clientActivityPage, clientAccountPage, clientProfileDetailPage, clientBookingDetailPage,
  clientBriefsPage
} from './pages.js';
import {
  proOverviewDashboardPage,
  proBriefsFeedPage,
  proBriefDetailPage,
  proOffersPipelinePage,
  proConsultationsPage,
  proPortfolioPage,
  proProfilePage,
  proVerificationPage,
  proSettingsPage
} from './proPages.js';
import { resolveRoute, signupRoleFromURL, validateEmail, escapeHTML, getRouteParams } from './utils.js';
import { icon } from './icons.js';
import { illustrativeProfiles } from './data.js';
import { initClientApp } from './clientMain.js';
import { initProApp } from './proMain.js';
import { initPageSwitcher } from './pageSwitcher.js';

const route = resolveRoute(window.location.pathname);
const app = document.querySelector('#app');
const routeRenderers = {
  '/': homePage,
  '/clients': clientPage,
  '/professionals': professionalPage,
  '/signup': () => signupPage(signupRoleFromURL(window.location.search)),
  '/signin': signinPage,
  '/clients/explore': explorePage,
  '/clients/professional': () => {
    const params = new URLSearchParams(window.location.search);
    return profilePage(params.get('id') || 'sample-architect');
  },
  '/clients/booking': () => {
    const params = new URLSearchParams(window.location.search);
    return bookingPage(params.get('pro') || 'sample-architect');
  },
  '/professionals/join': professionalJoinPage,
  '/client': clientWorkspacePage,
  '/client/briefs': clientBriefsPage,
  '/client/offers': clientBriefsPage,
  '/client/compare': clientComparePage,
  '/client/saved': clientSavedPage,
  '/client/consultations': clientConsultationsPage,
  '/client/activity': clientActivityPage,
  '/client/profile': clientAccountPage,
  '/client/professionals/:id': () => {
    const { id } = getRouteParams(window.location.pathname, window.location.search);
    return clientProfileDetailPage(id || 'naina-kapoor');
  },
  '/client/book/:id': () => {
    const { id } = getRouteParams(window.location.pathname, window.location.search);
    return clientBookingDetailPage(id || 'naina-kapoor');
  },
  '/professional': proOverviewDashboardPage,
  '/professional/briefs': proBriefsFeedPage,
  '/professional/briefs/:id': () => {
    const { id } = getRouteParams(window.location.pathname, window.location.search);
    return proBriefDetailPage(id || 'brief-noida-44');
  },
  '/professional/offers': proOffersPipelinePage,
  '/professional/consultations': proConsultationsPage,
  '/professional/calendar': proConsultationsPage,
  '/professional/portfolio': proPortfolioPage,
  '/professional/profile': proProfilePage,
  '/professional/verification': proVerificationPage,
  '/professional/settings': proSettingsPage,
  '/not-found': notFoundPage
};

if (app) {
  app.innerHTML = (routeRenderers[route] || notFoundPage)();
}

const titleByRoute = {
  '/': 'Vastoco — Two doors. One platform.',
  '/clients': 'Find Architecture & Design Professionals | Vastoco',
  '/professionals': 'For professionals — Grow your practice | Vastoco',
  '/signup': 'Create an account | Vastoco',
  '/signin': 'Sign in | Vastoco',
  '/clients/explore': 'Explore professionals | Vastoco',
  '/clients/professional': 'Professional Profile | Vastoco',
  '/clients/booking': 'Plan a consultation | Vastoco',
  '/professionals/join': 'Join Vastoco | Professional setup',
  '/client': 'Client Workspace | Vastoco',
  '/client/briefs': 'My Project Briefs & Incoming Offers | Vastoco',
  '/client/offers': 'Incoming Professional Offers | Vastoco',
  '/client/compare': 'Compare Professionals | Vastoco',
  '/client/saved': 'Saved Professionals | Vastoco',
  '/client/consultations': 'My Consultations | Vastoco',
  '/client/activity': 'Client Activity Timeline | Vastoco',
  '/client/profile': 'Client Profile & Settings | Vastoco',
  '/client/professionals/:id': 'Professional Monograph | Vastoco',
  '/client/book/:id': 'Book Consultation | Vastoco',
  '/professional': 'Practice Overview Dashboard | Vastoco Professional',
  '/professional/briefs': 'Client Project Briefs | Vastoco Professional',
  '/professional/briefs/:id': 'Brief Details & Offer Composer | Vastoco',
  '/professional/offers': 'Sent Consultation Proposals | Vastoco',
  '/professional/consultations': 'Consultation Schedule & Calendar | Vastoco',
  '/professional/calendar': 'Interactive Calendar Matrix | Vastoco',
  '/professional/portfolio': 'Portfolio Work Monographs | Vastoco',
  '/professional/profile': 'Practice Profile & Rates | Vastoco',
  '/professional/verification': 'Statutory COA Verification | Vastoco',
  '/professional/settings': 'Payouts & Notification Settings | Vastoco'
};
document.title = titleByRoute[route] || 'Vastoco';

function setFormStatus(form, message, kind = 'neutral') {
  const status = form.querySelector('[data-form-status]');
  if (!status) return;
  if (!message) {
    status.className = 'form-status';
    status.textContent = '';
    return;
  }
  status.className = `form-status is-visible form-status--${kind}`;
  status.textContent = message;
}

function initMobileNavigation() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('#mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    toggle.innerHTML = icon(open ? 'menu' : 'close', '', 22);
    menu.hidden = open;
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.innerHTML = icon('menu', '', 22);
    }
  });
}

function initSignup() {
  document.querySelectorAll('[data-role-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const role = button.getAttribute('data-role-choice');
      if (role === 'professional') window.location.href = '/professionals/join';
      else window.location.href = `/signup?role=${encodeURIComponent(role)}`;
    });
  });

  const form = document.querySelector('[data-form="signup"]');
  if (!form) return;

  const existingAlert = form.querySelector('[data-existing-alert]');
  const emailInput = form.querySelector('[data-signup-email]');
  const simulateExistingBtn = form.querySelector('[data-simulate-existing]');

  simulateExistingBtn?.addEventListener('click', () => {
    if (emailInput) emailInput.value = 'existing@vastoco.com';
    if (existingAlert) existingAlert.hidden = false;
    setFormStatus(form, 'Simulation alert: This email address is already registered. Please sign in instead.', 'error');
  });

  emailInput?.addEventListener('input', () => {
    const email = (emailInput.value || '').trim().toLowerCase();
    if (email === 'existing@vastoco.com' || email === 'existing@example.com') {
      if (existingAlert) existingAlert.hidden = false;
      setFormStatus(form, 'Simulation alert: This email address is already registered.', 'error');
    } else {
      if (existingAlert) existingAlert.hidden = true;
      setFormStatus(form, '', 'neutral');
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim().toLowerCase();
    const password = String(data.get('password') || '');
    const terms = data.get('terms');

    if (email === 'existing@vastoco.com' || email === 'existing@example.com') {
      if (existingAlert) existingAlert.hidden = false;
      setFormStatus(form, 'An account with this email already exists. Please sign in.', 'error');
      return;
    }

    if (!name || !validateEmail(email) || password.length < 8 || !terms) {
      setFormStatus(form, 'Check your name, enter a valid email address, use a password with at least 8 characters, and accept terms.', 'error');
      return;
    }

    setFormStatus(form, 'The form is complete. Client account simulated! In production, a verification email is dispatched.', 'success');
  });
}

function initSignin() {
  const form = document.querySelector('[data-form="signin"]');
  const recoveryPanel = document.querySelector('[data-recovery-panel]');
  const toggleRecovery = document.querySelector('[data-toggle-recovery]');
  const cancelRecovery = document.querySelector('[data-cancel-recovery]');
  const recoveryForm = document.querySelector('[data-form="recovery"]');
  const recoveryStatus = document.querySelector('[data-recovery-status]');

  toggleRecovery?.addEventListener('click', () => {
    if (form) form.hidden = true;
    if (recoveryPanel) recoveryPanel.hidden = false;
  });

  cancelRecovery?.addEventListener('click', () => {
    if (recoveryPanel) recoveryPanel.hidden = true;
    if (form) form.hidden = false;
  });

  recoveryForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(recoveryForm);
    const email = String(data.get('recoveryEmail') || '').trim();
    if (!validateEmail(email)) {
      if (recoveryStatus) {
        recoveryStatus.className = 'form-status is-visible form-status--error';
        recoveryStatus.textContent = 'Please enter a valid email address.';
      }
      return;
    }
    if (recoveryStatus) {
      recoveryStatus.className = 'form-status is-visible form-status--success';
      recoveryStatus.textContent = `Simulation: A password reset link has been dispatched to ${escapeHTML(email)}. In production, this link expires after 60 minutes.`;
    }
  });

  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim();
    const password = String(data.get('password') || '');
    if (!validateEmail(email) || !password) {
      setFormStatus(form, 'Enter a valid email address and password to continue.', 'error');
      return;
    }
    setFormStatus(form, 'Authentication simulated. Welcome back to Vastoco!', 'success');
  });
}

function initQuickSearch() {
  const form = document.querySelector('[data-form="quick-search"]');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const service = String(data.get('service') || 'all');
    window.location.href = `/clients/explore?service=${encodeURIComponent(service)}`;
  });
}

function initDirectory() {
  const grid = document.querySelector('[data-directory-grid]');
  if (!grid) return;
  const search = document.querySelector('[data-directory-search]');
  const filter = document.querySelector('[data-directory-filter]');
  const count = document.querySelector('[data-directory-count]');
  const empty = document.querySelector('[data-directory-empty]');
  const compareTray = document.querySelector('[data-compare-tray]');
  const compareCount = document.querySelector('[data-compare-count]');
  const openCompare = document.querySelector('[data-open-compare]');
  const compareDialog = document.querySelector('[data-compare-dialog]');
  const compareTable = document.querySelector('[data-compare-table]');
  const selected = new Set();
  const cards = [...grid.querySelectorAll('[data-profile-card]')];

  const updateDirectory = () => {
    const query = String(search?.value || '').trim().toLowerCase();
    const service = filter?.value || new URLSearchParams(window.location.search).get('service') || 'all';
    let visible = 0;
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const matchesService = service === 'all' || card.dataset.category === service;
      const matchesQuery = !query || text.includes(query);
      const show = matchesService && matchesQuery;
      card.hidden = !show;
      if (show) visible++;
    });
    if (count) count.textContent = `${visible} illustrative profile${visible === 1 ? '' : 's'}`;
    if (empty) empty.hidden = visible !== 0;
  };

  const updateCompare = () => {
    const items = [...selected];
    cards.forEach((card) => {
      const button = card.querySelector('[data-compare-toggle]');
      if (!button) return;
      const active = selected.has(button.dataset.compareToggle);
      button.setAttribute('aria-pressed', String(active));
      button.innerHTML = `${icon(active ? 'check' : 'compare', '', 15)} ${active ? 'Added' : 'Compare'}`;
    });
    if (compareTray) compareTray.hidden = items.length === 0;
    if (compareCount) compareCount.textContent = String(items.length);
    if (openCompare) openCompare.disabled = items.length !== 2;
  };

  search?.addEventListener('input', updateDirectory);
  filter?.addEventListener('change', updateDirectory);
  const queryService = new URLSearchParams(window.location.search).get('service');
  if (filter && ['architect', 'interior', 'vastu'].includes(queryService)) filter.value = queryService;
  updateDirectory();

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-compare-toggle]');
    if (!button) return;
    const id = button.dataset.compareToggle;
    if (selected.has(id)) selected.delete(id);
    else if (selected.size < 2) selected.add(id);
    else {
      const status = document.querySelector('.compare-tray span');
      if (status) status.textContent = 'Choose up to two profiles';
      return;
    }
    updateCompare();
  });

  document.querySelector('[data-clear-filters]')?.addEventListener('click', () => {
    if (search) search.value = '';
    if (filter) filter.value = 'all';
    updateDirectory();
  });
  document.querySelector('[data-clear-compare]')?.addEventListener('click', () => {
    selected.clear();
    updateCompare();
  });
  document.querySelector('[data-close-dialog]')?.addEventListener('click', () => compareDialog?.close());
  openCompare?.addEventListener('click', () => {
    if (selected.size !== 2 || !compareDialog || !compareTable) return;
    const items = cards.filter((card) => selected.has(card.querySelector('[data-compare-toggle]')?.dataset.compareToggle));
    const columns = items.map((card) => {
      const category = card.querySelector('.directory-card-body .eyebrow')?.textContent || 'Professional';
      return { category, heading: card.querySelector('h2')?.textContent || 'Sample profile' };
    });
    compareTable.innerHTML = `<div class="compare-row compare-row--head"><span>Details</span>${columns.map((c) => `<strong>${escapeHTML(c.heading)}</strong>`).join('')}</div>
      <div class="compare-row"><span>Category</span>${columns.map((c) => `<strong>${escapeHTML(c.category)}</strong>`).join('')}</div>
      <div class="compare-row"><span>Portfolio</span>${columns.map(() => '<strong>Illustrative project examples</strong>').join('')}</div>
      <div class="compare-row"><span>Experience</span>${columns.map(() => '<strong>To be supplied</strong>').join('')}</div>
      <div class="compare-row"><span>Consultation fee</span>${columns.map(() => '<strong>Set by professional</strong>').join('')}</div>
      <div class="compare-row"><span>Reviews</span>${columns.map(() => '<strong>Shown after real consultations</strong>').join('')}</div>`;
    compareDialog.showModal();
  });
}

function initBooking() {
  const form = document.querySelector('[data-form="booking"]');
  if (!form) return;

  const durationText = document.querySelector('[data-summary-duration]');
  const summaryFee = document.querySelector('[data-summary-fee]');
  const summaryTotal = document.querySelector('[data-summary-total]');
  const submitFee = document.querySelector('[data-submit-fee]');
  const summarySlot = document.querySelector('[data-summary-slot]');
  const slotAlert = document.querySelector('[data-slot-alert]');
  const charCount = document.querySelector('[data-char-count]');
  const scopeTextarea = form.querySelector('textarea[name="scope"]');
  const slotBtns = [...form.querySelectorAll('.slot-btn')];
  const timeInput = form.querySelector('input[name="selectedTime"]');
  const dateInputs = form.querySelectorAll('input[name="slotDate"]');

  form.querySelectorAll('input[name="duration"]').forEach((input) => {
    input.addEventListener('change', () => {
      const fee = Number(input.dataset.fee || 2000);
      const feeFormatted = `₹${fee.toLocaleString('en-IN')}`;
      if (durationText) durationText.textContent = `${input.value} minutes`;
      if (summaryFee) summaryFee.textContent = feeFormatted;
      if (summaryTotal) summaryTotal.textContent = feeFormatted;
      if (submitFee) submitFee.textContent = feeFormatted;
    });
  });

  function updateSummarySlot() {
    const dateVal = form.querySelector('input[name="slotDate"]:checked')?.value || 'Tomorrow';
    const timeVal = timeInput?.value || '02:00 PM';
    if (summarySlot) summarySlot.textContent = `${dateVal} at ${timeVal}`;
  }

  dateInputs.forEach((dateInput) => {
    dateInput.addEventListener('change', updateSummarySlot);
  });

  slotBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.slotUnavailable === 'true') {
        if (slotAlert) {
          slotAlert.hidden = false;
          const alertText = slotAlert.querySelector('strong');
          if (alertText) alertText.textContent = `The ${btn.dataset.slot} slot is unavailable or already booked.`;
        }
        return;
      }
      if (slotAlert) slotAlert.hidden = true;
      slotBtns.forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      if (timeInput) timeInput.value = btn.dataset.slot;
      updateSummarySlot();
    });
  });

  scopeTextarea?.addEventListener('input', () => {
    const remaining = 500 - (scopeTextarea.value || '').length;
    if (charCount) charCount.textContent = `${Math.max(0, remaining)} characters remaining`;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      setFormStatus(form, 'Complete the required project details before reviewing.', 'error');
      return;
    }

    const data = new FormData(form);
    const duration = escapeHTML(data.get('duration'));
    const project = escapeHTML(data.get('projectType'));
    const budget = escapeHTML(data.get('budget'));
    const timeline = escapeHTML(data.get('timeline'));
    const dateVal = escapeHTML(data.get('slotDate') || 'Tomorrow');
    const timeVal = escapeHTML(data.get('selectedTime') || '02:00 PM');
    const simulateFailure = data.get('simulatePaymentFailure');

    const submitBtn = form.querySelector('[data-submit-btn]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing secure payment...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        const currentFee = summaryTotal?.textContent || '₹2,000';
        submitBtn.innerHTML = `Confirm & Pay Upfront (${currentFee}) ${icon('arrow', '', 16)}`;
      }

      if (simulateFailure) {
        setFormStatus(form, 'Payment simulation declined: Transaction rejected by test gateway (Error 402: Bank simulation timeout). Your project scope, duration, and chosen slot have been preserved. Please retry or uncheck the simulation.', 'error');
        return;
      }

      const confirmation = document.querySelector('[data-booking-confirmation]');
      if (!confirmation) return;
      confirmation.hidden = false;
      confirmation.innerHTML = `
        <div class="confirmation-head">
          <div class="confirmation-mark">${icon('check', '', 24)}</div>
          <div>
            <span class="eyebrow">Booking Confirmed · Ref VST-2026-8942</span>
            <h3>Your video consultation is scheduled.</h3>
          </div>
        </div>
        <div class="confirmation-details">
          <div class="conf-row"><span>Date & Time</span><strong>${dateVal} at ${timeVal}</strong></div>
          <div class="conf-row"><span>Duration</span><strong>${duration} minutes</strong></div>
          <div class="conf-row"><span>Project</span><strong>${project}</strong></div>
          <div class="conf-row"><span>Scope Budget</span><strong>${budget} · ${timeline}</strong></div>
          <div class="conf-row conf-row--meet">
            <span>Video Link</span>
            <code>https://vastoco.in/consultation/vst-8942</code>
            <button type="button" class="copy-btn" data-copy-link>${icon('copy', '', 13)} Copy link</button>
          </div>
        </div>
        <div class="confirmation-actions">
          <button type="button" class="button button--dark button--small" data-cal-sim>${icon('calendar', '', 14)} Add to calendar (.ics)</button>
          <a href="/clients" class="button button--outline button--small">Return to client home</a>
        </div>
        <p class="demo-disclaimer">Frontend demonstration only. No real payment was charged and no live meeting room is created.</p>
      `;

      confirmation.querySelector('[data-copy-link]')?.addEventListener('click', (e) => {
        navigator.clipboard?.writeText('https://vastoco.in/consultation/vst-8942');
        e.currentTarget.textContent = 'Copied!';
      });

      confirmation.querySelector('[data-cal-sim]')?.addEventListener('click', (e) => {
        e.currentTarget.textContent = 'Calendar invite simulated (.ics)';
      });

      setFormStatus(form, 'Your consultation summary is ready to review. Payment is not connected in this demo.', 'success');
      confirmation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 500);
  });
}

function initJoinFlow() {
  const form = document.querySelector('[data-form="professional-join"]');
  if (!form) return;
  const steps = [...form.querySelectorAll('[data-join-step]')];
  const labels = [...document.querySelectorAll('[data-step-label]')];
  const progressLabel = document.querySelector('[data-progress-label]');
  const progressBar = document.querySelector('[data-progress-bar]');
  const back = form.querySelector('[data-join-back]');
  const next = form.querySelector('[data-join-next]');
  const coaField = form.querySelector('[data-coa-field]');
  const coaInput = coaField?.querySelector('input');
  const resumeBanner = document.querySelector('[data-resume-banner]');
  const clearDraftBtn = document.querySelector('[data-clear-draft]');
  const saveDraftBtn = document.querySelector('[data-save-draft]');
  const saveStatus = document.querySelector('[data-save-status]');
  const correctionBtn = form.querySelector('[data-simulate-correction]');
  const correctionAlert = form.querySelector('[data-correction-alert]');
  const reuploadBtn = form.querySelector('[data-reupload-btn]');
  const uploadFailBtn = form.querySelector('[data-simulate-upload-fail]');
  const uploadErrorAlert = form.querySelector('[data-upload-error]');
  const retryUploadBtn = form.querySelector('[data-retry-upload]');
  const missingProjectsAlert = form.querySelector('[data-missing-portfolio-alert]');
  let current = 0;
  let objectUrls = [];

  const savedDraft = (() => {
    try { return JSON.parse(sessionStorage.getItem('vastoco-professional-draft') || '{}'); }
    catch { return {}; }
  })();

  if (Object.keys(savedDraft).length > 0 && resumeBanner) {
    resumeBanner.hidden = false;
  }

  clearDraftBtn?.addEventListener('click', () => {
    try { sessionStorage.removeItem('vastoco-professional-draft'); } catch {}
    form.reset();
    if (resumeBanner) resumeBanner.hidden = true;
    current = 0;
    update();
  });

  Object.entries(savedDraft).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (!field || field.type === 'file' || field.type === 'checkbox') return;
    field.value = value;
  });

  const refreshReview = () => {
    const value = (name) => String(form.elements.namedItem(name)?.value || '').trim();
    const set = (selector, text, fallback) => {
      const target = form.querySelector(selector);
      if (target) target.textContent = text || fallback;
    };
    set('[data-review-name]', value('fullName'), 'Your name');
    set('[data-review-practice]', value('practiceName'), 'Your Practice');
    set('[data-review-profession]', value('profession'), 'Professional category');
    set('[data-review-location]', value('practiceLocation'), 'Delhi NCR');
    set('[data-review-bio]', value('bio'), 'Your introduction will appear here.');
    set('[data-review-project]', value('projectTitle'), 'Project preview will appear here.');
  };

  const update = () => {
    steps.forEach((step, index) => {
      step.hidden = index !== current;
      step.classList.toggle('is-current', index === current);
    });
    labels.forEach((label, index) => {
      label.classList.toggle('is-current', index === current);
      label.classList.toggle('is-complete', index < current);
    });
    if (progressLabel) progressLabel.textContent = `Step ${current + 1} of ${steps.length}`;
    if (progressBar) progressBar.style.width = `${((current + 1) / steps.length) * 100}%`;
    if (back) back.disabled = current === 0;
    if (next) next.innerHTML = current === steps.length - 1 ? 'Finish preview' : `Continue ${icon('arrow', '', 16)}`;
    if (current === 2) {
      const profession = String(form.elements.namedItem('profession')?.value || '');
      const guidance = form.querySelector('[data-verification-guidance]');
      const guidanceByProfession = {
        Architect: 'Architects: the current Vastoco professional page lists a Council of Architecture (COA) register check and supporting degree or college documentation. The COA field is shown below; this prototype does not validate it.',
        'Interior designer': 'Interior designers: the current Vastoco professional page describes identity plus qualification or documented practice, supported by relevant certificates, a degree or a diploma.',
        'Vastu consultant': 'Vastu consultants: the current Vastoco professional page describes identity plus qualification or documented practice, supported by relevant certificates, a degree or a diploma.'
      };
      if (guidance) guidance.textContent = guidanceByProfession[profession] || 'Choose your professional category in the previous step to see the relevant checklist. This prototype does not collect credential documents or perform a verification check.';
      if (coaInput) coaInput.required = profession === 'Architect';
      if (coaField) coaField.hidden = profession !== 'Architect';
    }
    if (current === 4) refreshReview();
  };

  const saveDraft = () => {
    const draft = {};
    for (const [key, value] of new FormData(form).entries()) {
      if (key === 'portfolio' || key === 'password' || key === 'verificationConsent') continue;
      if (typeof value === 'string') draft[key] = value;
    }
    try { sessionStorage.setItem('vastoco-professional-draft', JSON.stringify(draft)); } catch { /* Storage can be unavailable in private contexts. */ }
  };

  saveDraftBtn?.addEventListener('click', () => {
    saveDraft();
    if (saveStatus) {
      saveStatus.textContent = 'Draft saved at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  });

  correctionBtn?.addEventListener('click', () => {
    if (correctionAlert) correctionAlert.hidden = !correctionAlert.hidden;
  });

  reuploadBtn?.addEventListener('click', () => {
    if (correctionAlert) correctionAlert.hidden = true;
    setFormStatus(form, 'Simulated: 2026 COA renewal receipt uploaded for verification re-audit.', 'success');
  });

  uploadFailBtn?.addEventListener('click', () => {
    if (uploadErrorAlert) uploadErrorAlert.hidden = false;
  });

  retryUploadBtn?.addEventListener('click', () => {
    if (uploadErrorAlert) uploadErrorAlert.hidden = true;
    setFormStatus(form, 'Retrying simulated upload... Image transferred successfully.', 'success');
  });

  form.addEventListener('input', (event) => {
    if (event.target.matches('input, select, textarea')) {
      saveDraft();
      if (current === 1 && event.target.name === 'profession') update();
      if (current === 4) refreshReview();
    }
  });

  back?.addEventListener('click', () => {
    if (current > 0) {
      current--;
      update();
    }
  });

  next?.addEventListener('click', () => {
    if (current === steps.length - 1) {
      setFormStatus(form, 'Your profile preview is complete. Nothing has been submitted or published.', 'success');
      return;
    }
    const required = [...steps[current].querySelectorAll('input[required], select[required], textarea[required]')];
    const invalid = required.find((field) => !field.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      setFormStatus(form, 'Complete the required fields in this step to continue.', 'error');
      return;
    }
    if (current === 3) {
      const uploads = form.querySelector('#portfolio-upload')?.files || [];
      const projectTitle = form.elements.namedItem('projectTitle')?.value || '';
      if (!projectTitle && uploads.length === 0 && missingProjectsAlert) {
        missingProjectsAlert.hidden = false;
      }
      if (uploads.length > 5) {
        setFormStatus(form, 'Add up to five project images in this prototype.', 'error');
        return;
      }
      const tooLarge = [...uploads].find((file) => file.size > 8 * 1024 * 1024);
      if (tooLarge) {
        setFormStatus(form, 'Each image must be smaller than 8 MB.', 'error');
        return;
      }
    }
    saveDraft();
    current++;
    update();
    setFormStatus(form, '', 'neutral');
  });

  const profession = form.elements.namedItem('profession');
  profession?.addEventListener('change', update);
  const upload = form.querySelector('#portfolio-upload');
  upload?.addEventListener('change', () => {
    const container = form.querySelector('[data-upload-previews]');
    if (!container) return;
    objectUrls.forEach((url) => URL.revokeObjectURL(url));
    objectUrls = [];
    container.innerHTML = '';
    const files = [...(upload.files || [])].slice(0, 5).filter((file) => file.type.startsWith('image/'));
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      objectUrls.push(url);
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      const caption = document.createElement('figcaption');
      image.src = url;
      image.alt = `Preview of ${file.name}`;
      caption.textContent = file.name;
      figure.append(image, caption);
      container.append(figure);
    });
    if (upload.files?.length > 5) setFormStatus(form, 'Only the first five images are shown in this prototype.', 'error');
  });

  update();
  window.addEventListener('pagehide', () => objectUrls.forEach((url) => URL.revokeObjectURL(url)), { once: true });
}

function initProfileInteractions() {
  const toggleBtn = document.querySelector('[data-simulate-empty-portfolio]');
  const activeGallery = document.querySelector('[data-portfolio-active]');
  const emptyState = document.querySelector('[data-portfolio-empty]');
  if (!toggleBtn || !activeGallery || !emptyState) return;

  toggleBtn.addEventListener('click', () => {
    const isEmpty = emptyState.hidden;
    emptyState.hidden = !isEmpty;
    activeGallery.hidden = isEmpty;
    toggleBtn.innerHTML = isEmpty
      ? `${icon('layers', '', 13)} Restore project portfolio`
      : `${icon('layers', '', 13)} Simulate empty portfolio state`;
  });
}


function initMotionControl() {
  const stage = document.querySelector('.monitor-wrap');
  if (!stage) return;

  const scenes = Array.from(stage.querySelectorAll('.screen-scene'));
  const dots = Array.from(stage.querySelectorAll('[data-scene-dot]'));
  const prevBtn = stage.querySelector('[data-scene-prev]');
  const nextBtn = stage.querySelector('[data-scene-next]');
  const toggleBtn = stage.querySelector('[data-motion-toggle]');
  if (!scenes.length) return;

  let currentIndex = 0;
  let isPaused = false;
  let timer = null;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showScene(index) {
    if (scenes[currentIndex]) scenes[currentIndex].classList.remove('is-active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.remove('is-active');
      dots[currentIndex].setAttribute('aria-selected', 'false');
    }
    currentIndex = (index + scenes.length) % scenes.length;
    if (scenes[currentIndex]) scenes[currentIndex].classList.add('is-active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('is-active');
      dots[currentIndex].setAttribute('aria-selected', 'true');
    }
  }

  function advance() {
    showScene(currentIndex + 1);
  }

  function startRotation() {
    if (prefersReduced || isPaused) return;
    stopRotation();
    timer = setInterval(advance, 4800);
  }

  function stopRotation() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function setPausedState(paused) {
    isPaused = paused;
    stage.classList.toggle('is-paused', isPaused);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', String(isPaused));
      toggleBtn.setAttribute('aria-label', isPaused ? 'Play hero preview' : 'Pause hero preview');
      toggleBtn.innerHTML = `${icon(isPaused ? 'play' : 'pause', '', 13)}<span>${isPaused ? 'Play preview' : 'Pause preview'}</span>`;
    }
    if (isPaused) stopRotation();
    else startRotation();
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => setPausedState(!isPaused));
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showScene(currentIndex - 1);
      if (!isPaused) startRotation();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showScene(currentIndex + 1);
      if (!isPaused) startRotation();
    });
  }
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showScene(idx);
      if (!isPaused) startRotation();
    });
  });

  stage.addEventListener('mouseenter', stopRotation);
  stage.addEventListener('mouseleave', () => { if (!isPaused) startRotation(); });
  stage.addEventListener('focusin', stopRotation);
  stage.addEventListener('focusout', () => { if (!isPaused) startRotation(); });

  showScene(0);
  if (!prefersReduced) {
    startRotation();
  }
}

function initHeroPhotoStrip() {
  const stage = document.querySelector('[data-strip-stage]');
  const track = document.querySelector('[data-strip-track]');
  const toggleBtns = document.querySelectorAll('.landing-hero [data-motion-toggle]');
  if (!stage || !track) return;

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isPaused = isReduced;

  function syncToggleUI() {
    track.classList.toggle('is-paused', isPaused);
    toggleBtns.forEach(btn => {
      btn.setAttribute('aria-pressed', String(isPaused));
      btn.setAttribute('aria-label', isPaused ? 'Resume architectural gallery movement' : 'Pause architectural gallery movement');
      btn.innerHTML = `${icon(isPaused ? 'play' : 'pause', '', 13)}<span>${isPaused ? 'Play movement' : 'Pause movement'}</span>`;
    });
  }

  if (isReduced) {
    syncToggleUI();
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      isPaused = !isPaused;
      syncToggleUI();
    });
  });
}

function initScrollStory() {
  const story = document.querySelector('[data-scroll-story]');
  if (!story) return;

  const beats = Array.from(story.querySelectorAll('[data-beat]'));
  const scenes = Array.from(story.querySelectorAll('[data-scene]'));
  const urlEl = story.querySelector('[data-story-url]');
  if (!beats.length || !scenes.length) return;

  const urls = [
    'vastoco.in/clients/explore',
    'vastoco.in/clients/compare',
    'vastoco.in/clients/consultations'
  ];

  function setActiveBeat(index) {
    const clamped = Math.max(0, Math.min(index, beats.length - 1));
    beats.forEach((b, i) => b.classList.toggle('is-active', i === clamped));
    scenes.forEach((s, i) => s.classList.toggle('is-active', i === clamped));
    if (urlEl && urls[clamped]) {
      urlEl.textContent = urls[clamped];
    }
  }

  beats.forEach((beat, idx) => {
    beat.addEventListener('click', () => setActiveBeat(idx));
    beat.setAttribute('tabindex', '0');
    beat.setAttribute('role', 'button');
    beat.setAttribute('aria-label', `View step 0${idx + 1}`);
    beat.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveBeat(idx);
      }
    });
  });

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isReduced && window.gsap && window.ScrollTrigger && window.innerWidth >= 992) {
    try {
      window.gsap.registerPlugin(window.ScrollTrigger);
      beats.forEach((beat, idx) => {
        window.ScrollTrigger.create({
          trigger: beat,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveBeat(idx),
          onEnterBack: () => setActiveBeat(idx)
        });
      });
    } catch (err) {
      console.warn('ScrollTrigger setup fallback:', err);
    }
  } else if ('IntersectionObserver' in window && !isReduced) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute('data-beat') || 0);
          setActiveBeat(idx);
        }
      });
    }, { rootMargin: '-20% 0px -20% 0px', threshold: 0.4 });
    beats.forEach(b => observer.observe(b));
  }
}

function initEditorialDoorsHover() {
  const cards = document.querySelectorAll('[data-hover-card]');
  if (!cards.length) return;

  if (window.matchMedia('(pointer: coarse)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
}

function initClientInteractions() {
  const cardsGrid = document.querySelector('[data-client-cards-grid]');
  if (!cardsGrid) return;

  const cards = [...cardsGrid.querySelectorAll('[data-client-card]')];
  const countEl = document.querySelector('[data-client-count]');
  const emptyEl = document.querySelector('[data-client-empty]');
  const searchInput = document.querySelector('[data-directory-filter-input]');
  const pillFilters = document.querySelectorAll('[data-pill-filter]');
  const heroSearchForm = document.querySelector('[data-client-search-form]');
  const resetBtn = document.querySelector('[data-reset-client-filters]');

  let activeCategory = 'all';
  let activeLocality = 'all';
  let searchQuery = '';

  function filterCards() {
    let visible = 0;
    cards.forEach((card) => {
      const cardCat = card.dataset.category || '';
      const cardLoc = card.dataset.location || '';
      const cardText = card.textContent.toLowerCase();

      const matchesCat = activeCategory === 'all' || cardCat === activeCategory;
      const matchesLoc = activeLocality === 'all' || cardLoc.toLowerCase().includes(activeLocality.toLowerCase()) || activeLocality.toLowerCase().includes(cardLoc.toLowerCase());
      const matchesQuery = !searchQuery || cardText.includes(searchQuery);

      const show = matchesCat && matchesLoc && matchesQuery;
      card.hidden = !show;
      if (show) visible++;
    });

    if (countEl) {
      countEl.textContent = `${visible} illustrative profile${visible === 1 ? '' : 's'}`;
    }
    if (emptyEl) {
      emptyEl.hidden = visible > 0;
    }
  }

  // Hero Search Form
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = heroSearchForm.querySelector('[data-hero-service]')?.value || 'all';
      const locality = heroSearchForm.querySelector('[data-hero-locality]')?.value || 'all';
      const query = (heroSearchForm.querySelector('[data-hero-query]')?.value || '').trim().toLowerCase();

      activeCategory = service;
      activeLocality = locality;
      searchQuery = query;

      pillFilters.forEach(pill => {
        pill.classList.toggle('is-active', pill.dataset.pillFilter === service);
      });
      if (searchInput) searchInput.value = query;

      filterCards();
      document.querySelector('#directory')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Pill Filters
  pillFilters.forEach((pill) => {
    pill.addEventListener('click', () => {
      pillFilters.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      activeCategory = pill.dataset.pillFilter || 'all';
      filterCards();
    });
  });

  // Discipline Filter Buttons on category cards
  document.querySelectorAll('[data-filter-discipline]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const discipline = btn.dataset.filterDiscipline;
      activeCategory = discipline;
      pillFilters.forEach(p => {
        p.classList.toggle('is-active', p.dataset.pillFilter === discipline);
      });
      filterCards();
      document.querySelector('#directory')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Search input in directory
  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    filterCards();
  });

  // Reset filters
  resetBtn?.addEventListener('click', () => {
    activeCategory = 'all';
    activeLocality = 'all';
    searchQuery = '';
    pillFilters.forEach(p => p.classList.toggle('is-active', p.dataset.pillFilter === 'all'));
    if (searchInput) searchInput.value = '';
    if (heroSearchForm) heroSearchForm.reset();
    filterCards();
  });

  // --- Progressive Comparison Tray System ---
  const compareTray = document.querySelector('.client-compare-dock');
  const compareCountEl = compareTray?.querySelector('[data-compare-count]');
  const openCompareBtn = compareTray?.querySelector('[data-open-compare]');
  const clearCompareBtn = compareTray?.querySelector('[data-clear-compare]');
  const compareLimitAlert = compareTray?.querySelector('[data-compare-limit-alert]');
  const slot0El = compareTray?.querySelector('[data-compare-slot="0"]');
  const slot1El = compareTray?.querySelector('[data-compare-slot="1"]');
  const compareDialog = document.querySelector('[data-compare-dialog]');
  const compareTable = document.querySelector('[data-compare-table]');
  const closeCompareBtn = document.querySelector('[data-close-compare-dialog]');
  const selectedCompare = new Set();
  let limitAlertTimer = null;

  function updateCompareUI() {
    const proList = illustrativeProfiles.filter(p => selectedCompare.has(p.id));
    const count = selectedCompare.size;

    cards.forEach((card) => {
      const id = card.dataset.id;
      const toggle = card.querySelector('[data-compare-toggle]');
      if (!toggle) return;
      const isSelected = selectedCompare.has(id);
      toggle.setAttribute('aria-pressed', String(isSelected));
      toggle.innerHTML = `${icon(isSelected ? 'check' : 'compare', '', 14)} <span>${isSelected ? 'Added to compare' : 'Add to compare +'}</span>`;
      toggle.classList.toggle('is-selected', isSelected);
    });

    if (compareTray) compareTray.hidden = count === 0;
    if (compareCountEl) compareCountEl.textContent = String(count);
    if (openCompareBtn) {
      openCompareBtn.disabled = count !== 2;
      openCompareBtn.innerHTML = count === 2 
        ? `Compare these 2 professionals ${icon('arrow', '', 14)}`
        : `Select 1 more to compare (${count}/2)`;
    }

    if (slot0El) {
      if (proList[0]) {
        slot0El.innerHTML = `
          <div class="compare-slot-filled">
            <img src="${proList[0].image}" alt="${escapeHTML(proList[0].name)}" class="compare-slot-thumb" width="38" height="38" />
            <div class="compare-slot-meta">
              <strong>${escapeHTML(proList[0].name)}</strong>
              <small>${escapeHTML(proList[0].profession)}</small>
            </div>
            <button class="compare-slot-remove" type="button" data-remove-compare="${proList[0].id}" aria-label="Remove ${escapeHTML(proList[0].name)}">
              ${icon('close', '', 12)}
            </button>
          </div>
        `;
      } else {
        slot0El.innerHTML = `<span class="compare-slot-empty">+ Select first professional</span>`;
      }
    }

    if (slot1El) {
      if (proList[1]) {
        slot1El.innerHTML = `
          <div class="compare-slot-filled">
            <img src="${proList[1].image}" alt="${escapeHTML(proList[1].name)}" class="compare-slot-thumb" width="38" height="38" />
            <div class="compare-slot-meta">
              <strong>${escapeHTML(proList[1].name)}</strong>
              <small>${escapeHTML(proList[1].profession)}</small>
            </div>
            <button class="compare-slot-remove" type="button" data-remove-compare="${proList[1].id}" aria-label="Remove ${escapeHTML(proList[1].name)}">
              ${icon('close', '', 12)}
            </button>
          </div>
        `;
      } else {
        slot1El.innerHTML = `<span class="compare-slot-empty">+ Select second professional</span>`;
      }
    }
  }

  document.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('[data-remove-compare]');
    if (removeBtn) {
      const id = removeBtn.dataset.removeCompare;
      selectedCompare.delete(id);
      updateCompareUI();
      return;
    }

    const toggle = e.target.closest('[data-compare-toggle]');
    if (!toggle) return;
    const id = toggle.dataset.compareToggle;
    if (selectedCompare.has(id)) {
      selectedCompare.delete(id);
    } else {
      if (selectedCompare.size >= 2) {
        if (compareLimitAlert) {
          compareLimitAlert.hidden = false;
          clearTimeout(limitAlertTimer);
          limitAlertTimer = setTimeout(() => {
            compareLimitAlert.hidden = true;
          }, 3500);
        }
        return;
      }
      selectedCompare.add(id);
    }
    updateCompareUI();
  });

  clearCompareBtn?.addEventListener('click', () => {
    selectedCompare.clear();
    updateCompareUI();
  });

  closeCompareBtn?.addEventListener('click', () => compareDialog?.close());

  openCompareBtn?.addEventListener('click', () => {
    if (selectedCompare.size !== 2 || !compareDialog || !compareTable) return;
    const proList = illustrativeProfiles.filter(p => selectedCompare.has(p.id));
    if (proList.length !== 2) return;

    const fee15_0 = proList[0].fees?.[15] || proList[0].consultationFees?.[15] || 750;
    const fee15_1 = proList[1].fees?.[15] || proList[1].consultationFees?.[15] || 650;
    const fee30_0 = proList[0].fees?.[30] || proList[0].consultationFees?.[30] || 1400;
    const fee30_1 = proList[1].fees?.[30] || proList[1].consultationFees?.[30] || 1250;
    const fee45_0 = proList[0].fees?.[45] || proList[0].consultationFees?.[45] || 1950;
    const fee45_1 = proList[1].fees?.[45] || proList[1].consultationFees?.[45] || 1800;

    compareTable.innerHTML = `
      <div class="compare-table-desktop">
        <div class="compare-row compare-row--head">
          <span>Professional Profile</span>
          ${proList.map(p => `
            <div class="compare-head-cell">
              <img src="${p.image}" alt="${escapeHTML(p.name)}" class="compare-head-thumb" width="48" height="48" />
              <div>
                <strong>${escapeHTML(p.name)}</strong>
                <small>${escapeHTML(p.profession)} · ${escapeHTML(p.location)}</small>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="compare-row">
          <span>Specialization</span>
          ${proList.map(p => `<strong>${p.specializations ? p.specializations.join(', ') : escapeHTML(p.focus || '')}</strong>`).join('')}
        </div>
        <div class="compare-row">
          <span>Experience</span>
          ${proList.map(p => `<strong>${p.experienceYears || 8} years documented practice</strong>`).join('')}
        </div>
        <div class="compare-row">
          <span>Verification Standard</span>
          ${proList.map(p => `<strong>${escapeHTML(p.qualification || p.verificationMethod || '')}</strong>`).join('')}
        </div>
        <div class="compare-row">
          <span>15 Min Consultation</span>
          <strong>₹${fee15_0.toLocaleString('en-IN')}</strong>
          <strong>₹${fee15_1.toLocaleString('en-IN')}</strong>
        </div>
        <div class="compare-row">
          <span>30 Min Consultation</span>
          <strong>₹${fee30_0.toLocaleString('en-IN')}</strong>
          <strong>₹${fee30_1.toLocaleString('en-IN')}</strong>
        </div>
        <div class="compare-row">
          <span>45 Min Consultation</span>
          <strong>₹${fee45_0.toLocaleString('en-IN')}</strong>
          <strong>₹${fee45_1.toLocaleString('en-IN')}</strong>
        </div>
        <div class="compare-row">
          <span>Review Integrity</span>
          ${proList.map(p => `<small>${escapeHTML(p.reviewsNote || '')}</small>`).join('')}
        </div>
        <div class="compare-row compare-row--actions">
          <span>Action</span>
          ${proList.map(p => `
            <div>
              <button class="button button--dark button--small button--wide" type="button" data-compare-book="${p.id}">
                Book consultation (${p.feeDisplay || '₹' + fee30_0})
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Mobile Paired Cards View (stacked at <= 640px) -->
      <div class="compare-mobile-cards">
        <div class="compare-mobile-header-pair">
          ${proList.map(p => `
            <div class="compare-mobile-card-pro">
              <img src="${p.image}" alt="${escapeHTML(p.name)}" class="compare-mobile-thumb" width="44" height="44" />
              <strong>${escapeHTML(p.name)}</strong>
              <small>${escapeHTML(p.profession)}</small>
              <button class="button button--dark button--small button--wide" type="button" data-compare-book="${p.id}">
                Book (${p.feeDisplay})
              </button>
            </div>
          `).join('')}
        </div>

        <div class="compare-pair-block">
          <span class="compare-pair-title">Specialization</span>
          <div class="compare-pair-values">
            <div>${proList[0].specializations ? proList[0].specializations.join(', ') : escapeHTML(proList[0].focus || '')}</div>
            <div>${proList[1].specializations ? proList[1].specializations.join(', ') : escapeHTML(proList[1].focus || '')}</div>
          </div>
        </div>

        <div class="compare-pair-block">
          <span class="compare-pair-title">Experience</span>
          <div class="compare-pair-values">
            <div>${proList[0].experienceYears || 8} yrs practice</div>
            <div>${proList[1].experienceYears || 6} yrs practice</div>
          </div>
        </div>

        <div class="compare-pair-block">
          <span class="compare-pair-title">Verification Standard</span>
          <div class="compare-pair-values">
            <div>${escapeHTML(proList[0].qualification || '')}</div>
            <div>${escapeHTML(proList[1].qualification || '')}</div>
          </div>
        </div>

        <div class="compare-pair-block">
          <span class="compare-pair-title">Consultation Rates</span>
          <div class="compare-pair-values">
            <div>15m: ₹${fee15_0.toLocaleString('en-IN')}<br/>30m: ₹${fee30_0.toLocaleString('en-IN')}<br/>45m: ₹${fee45_0.toLocaleString('en-IN')}</div>
            <div>15m: ₹${fee15_1.toLocaleString('en-IN')}<br/>30m: ₹${fee30_1.toLocaleString('en-IN')}<br/>45m: ₹${fee45_1.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div class="compare-pair-block">
          <span class="compare-pair-title">Reviews Policy</span>
          <div class="compare-pair-values">
            <small>0 reviews (Real client video sessions only)</small>
            <small>0 reviews (Real client video sessions only)</small>
          </div>
        </div>
      </div>
    `;

    compareTable.querySelectorAll('[data-compare-book]').forEach(btn => {
      btn.addEventListener('click', () => {
        compareDialog.close();
        openBookingModal(btn.dataset.compareBook, 30);
      });
    });

    compareDialog.showModal();
  });

  // --- Quick Profile Modal ---
  const profileModal = document.querySelector('[data-profile-modal]');
  const closeProfileBtn = document.querySelector('[data-close-profile-dialog]');
  closeProfileBtn?.addEventListener('click', () => profileModal?.close());

  function openProfileModal(profileId) {
    const profile = illustrativeProfiles.find(p => p.id === profileId) || illustrativeProfiles[0];
    if (!profileModal || !profile) return;

    profileModal.querySelector('[data-modal-profile-name]').textContent = profile.name;
    profileModal.querySelector('[data-modal-profile-sub]').textContent = `${profile.category} · ${profile.location}`;
    profileModal.querySelector('[data-modal-profile-img]').src = profile.image;
    profileModal.querySelector('[data-modal-profile-img]').alt = profile.imageAlt;
    profileModal.querySelector('[data-modal-profile-verif]').textContent = profile.verificationMethod;
    profileModal.querySelector('[data-modal-profile-exp]').textContent = `${profile.experience} · ${profile.qualification}`;
    
    const portList = profileModal.querySelector('[data-modal-profile-portfolio]');
    if (portList) {
      portList.innerHTML = profile.portfolioSamples.map(sample => `<li>${escapeHTML(sample)}</li>`).join('');
    }

    const ratesGrid = profileModal.querySelector('[data-modal-profile-pricing]');
    if (ratesGrid) {
      ratesGrid.innerHTML = `
        <div><span>15 min</span><strong>₹${profile.fees[15].toLocaleString('en-IN')}</strong></div>
        <div><span>30 min</span><strong>₹${profile.fees[30].toLocaleString('en-IN')}</strong></div>
        <div><span>45 min</span><strong>₹${profile.fees[45].toLocaleString('en-IN')}</strong></div>
      `;
    }

    const bookBtn = profileModal.querySelector('[data-modal-book-trigger]');
    if (bookBtn) {
      bookBtn.onclick = () => {
        profileModal.close();
        openBookingModal(profile.id, 30);
      };
    }

    profileModal.showModal();
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-profile-open]');
    if (btn) {
      openProfileModal(btn.dataset.profileOpen);
    }
  });

  // --- Consultation Booking Modal Demonstration ---
  const bookingDialog = document.querySelector('[data-booking-dialog]');
  const closeBookingBtns = document.querySelectorAll('[data-close-booking-dialog]');
  const bookingForm = document.querySelector('[data-modal-booking-form]');
  const proSelect = document.querySelector('[data-booking-select-pro]');
  const durationInputs = document.querySelectorAll('input[name="modalDuration"]');
  const calcFeeEl = document.querySelector('[data-booking-calc-fee]');
  const proShareEl = document.querySelector('[data-booking-pro-share]');
  const platformFeeEl = document.querySelector('[data-booking-platform-fee]');
  const slotBtns = document.querySelectorAll('[data-slot-picker] .slot-pill');
  const selectedSlotInput = document.querySelector('[data-selected-slot-input]');
  const successBox = document.querySelector('[data-booking-success-box]');
  const summaryCard = document.querySelector('[data-confirmed-summary]');
  const statusEl = document.querySelector('[data-booking-form-status]');

  closeBookingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bookingDialog?.close();
      if (bookingForm && successBox) {
        bookingForm.reset();
        bookingForm.hidden = false;
        successBox.hidden = true;
        if (statusEl) statusEl.textContent = '';
      }
    });
  });

  function recalculateFee() {
    const proId = proSelect?.value || 'sample-architect';
    const profile = illustrativeProfiles.find(p => p.id === proId) || illustrativeProfiles[0];
    const durationChecked = document.querySelector('input[name="modalDuration"]:checked');
    const duration = Number(durationChecked?.value || 30);
    const fee = profile.fees[duration] || 2000;
    const proShare = Math.round(fee * 0.85);
    const platformFee = fee - proShare;

    if (calcFeeEl) calcFeeEl.textContent = `₹${fee.toLocaleString('en-IN')}`;
    if (proShareEl) proShareEl.textContent = `₹${proShare.toLocaleString('en-IN')}`;
    if (platformFeeEl) platformFeeEl.textContent = `₹${platformFee.toLocaleString('en-IN')} (included)`;
  }

  proSelect?.addEventListener('change', recalculateFee);
  durationInputs.forEach(input => input.addEventListener('change', recalculateFee));

  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      if (selectedSlotInput) selectedSlotInput.value = btn.dataset.slot || btn.textContent.trim();
    });
  });

  function openBookingModal(profileId = null, duration = 30) {
    if (!bookingDialog) return;
    if (profileId && proSelect) {
      proSelect.value = profileId;
    }
    const targetDurationInput = document.querySelector(`input[name="modalDuration"][value="${duration}"]`);
    if (targetDurationInput) targetDurationInput.checked = true;

    recalculateFee();
    if (bookingForm) bookingForm.hidden = false;
    if (successBox) successBox.hidden = true;
    if (statusEl) statusEl.textContent = '';
    bookingDialog.showModal();
  }

  // Card book buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-booking-open]');
    if (btn) openBookingModal(btn.dataset.bookingOpen, 30);
  });

  // Duration section book buttons
  document.querySelectorAll('[data-book-duration]').forEach(btn => {
    btn.addEventListener('click', () => {
      openBookingModal(null, Number(btn.dataset.bookDuration));
    });
  });

  // Planner book button
  document.querySelector('[data-planner-book-btn]')?.addEventListener('click', () => {
    const scopeBtn = document.querySelector('[data-scope-picker] .scope-btn.is-active');
    const scopeName = scopeBtn ? scopeBtn.querySelector('strong')?.textContent : 'Residential Project';
    const scopeInput = document.querySelector('#booking-scope-text');
    if (scopeInput) {
      scopeInput.value = `Discuss requirements for: ${scopeName}`;
    }
    openBookingModal(null, 30);
  });

  // Booking Form Submit
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }
    const data = new FormData(bookingForm);
    const proId = data.get('selectedProfessional');
    const profile = illustrativeProfiles.find(p => p.id === proId) || illustrativeProfiles[0];
    const duration = data.get('modalDuration') || '30';
    const slot = data.get('selectedSlot') || 'Tomorrow 10:00 AM';
    const project = data.get('projectType') || 'Residential Architecture';
    const budget = data.get('budget') || '₹35–75 Lakhs';
    const scope = data.get('scope') || 'General consultation overview';
    const fee = profile.fees[Number(duration)] || 2000;

    if (summaryCard) {
      summaryCard.innerHTML = `
        <div class="confirmed-row"><span>Professional:</span><strong>${escapeHTML(profile.name)} (${escapeHTML(profile.category)})</strong></div>
        <div class="confirmed-row"><span>Session Length:</span><strong>${escapeHTML(duration)} Minutes (Video)</strong></div>
        <div class="confirmed-row"><span>Reserved Slot:</span><strong>${escapeHTML(slot)} (IST)</strong></div>
        <div class="confirmed-row"><span>Project Typology:</span><strong>${escapeHTML(project)}</strong></div>
        <div class="confirmed-row"><span>Planning Budget:</span><strong>${escapeHTML(budget)}</strong></div>
        <div class="confirmed-row"><span>Upfront Fee:</span><strong>₹${fee.toLocaleString('en-IN')} (Held in Escrow)</strong></div>
        <div class="confirmed-row"><span>Professional Share:</span><strong>₹${Math.round(fee * 0.85).toLocaleString('en-IN')} (85%)</strong></div>
        <div class="confirmed-brief"><span>Project Brief:</span><p>"${escapeHTML(scope)}"</p></div>
      `;
    }

    bookingForm.hidden = true;
    if (successBox) successBox.hidden = false;
  });

  // --- Project Scope Planner Interactive Logic ---
  const scopePickerBtns = document.querySelectorAll('[data-scope-picker] .scope-btn');
  const plannerBudget = document.querySelector('[data-planner-budget]');
  const plannerTimeline = document.querySelector('[data-planner-timeline]');
  const recomTitle = document.querySelector('[data-recom-title]');
  const recomText = document.querySelector('[data-recom-text]');
  const recomList = document.querySelector('[data-recom-list]');

  const scopeRecommendations = {
    'New Villa / Ground-up Build': {
      duration: '30-Minute Architectural Review',
      text: 'For a <strong>New Villa / Ground-up Build</strong>, prepare your sanctioned plot drawings, FAR guidelines, and spatial wishlist.',
      checklist: [
        'CAD drawings or municipal plot layout sketch',
        'Site photographs with directional North orientation',
        'Primary room counts, floor heights and setback queries'
      ]
    },
    'Complete Interior Renovation': {
      duration: '30-Minute Interior Design Review',
      text: 'For a <strong>Complete Interior Renovation</strong>, focus on functional space planning, material durability, and lighting moodboards.',
      checklist: [
        'Existing apartment floor plan with wall measurements',
        'Photos of rooms requiring joinery or structural changes',
        'Reference aesthetics, lighting needs and material preferences'
      ]
    },
    'Structural Alteration / Floor Addition': {
      duration: '45-Minute Structural & Layout Deep-Dive',
      text: 'For a <strong>Floor Addition or Structural Alteration</strong>, load-bearing assessment and sanction feasibility are critical.',
      checklist: [
        'Existing structural drawings or column locations',
        'Municipal sanction history and height allowance checks',
        'Plumbing stack locations and terrace waterproofing state'
      ]
    },
    'Vastu Spatial Realignment': {
      duration: '15 or 30-Minute Vastu Spatial Review',
      text: 'For <strong>Vastu Spatial Realignment</strong>, orientation accuracy is foundational before making physical alterations.',
      checklist: [
        'Accurate compass direction of the main entrance',
        'Placement of kitchen stove, master bed and water tanks',
        'List of specific spatial concerns or energy pain points'
      ]
    }
  };

  function updatePlannerAdvice() {
    const activeScopeBtn = document.querySelector('[data-scope-picker] .scope-btn.is-active');
    const scopeKey = activeScopeBtn?.dataset.scope || 'New Villa / Ground-up Build';
    const rec = scopeRecommendations[scopeKey] || scopeRecommendations['New Villa / Ground-up Build'];
    const budgetVal = plannerBudget?.value || '₹35–75 Lakhs';
    const timelineVal = plannerTimeline?.value || '1 to 3 months';

    if (recomTitle) recomTitle.textContent = rec.duration;
    if (recomText) {
      recomText.innerHTML = `For a <strong>${escapeHTML(scopeKey)}</strong> with an estimated budget of <strong>${escapeHTML(budgetVal)}</strong> starting in <strong>${escapeHTML(timelineVal)}</strong>, we recommend booking a dedicated session.`;
    }
    if (recomList) {
      recomList.innerHTML = rec.checklist.map(item => `<li>${escapeHTML(item)}</li>`).join('');
    }
  }

  scopePickerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scopePickerBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      updatePlannerAdvice();
    });
  });

  plannerBudget?.addEventListener('change', updatePlannerAdvice);
  plannerTimeline?.addEventListener('change', updatePlannerAdvice);
}

function initProfessionalInteractions() {
  // Verification Checklist Tabs
  const verifTabs = document.querySelectorAll('[data-verif-tabs] .verif-tab');
  const verifPanes = document.querySelectorAll('[data-verif-content] [data-verif-pane]');
  const verifImg = document.querySelector('[data-verif-image]');
  
  verifTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      verifTabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const targetDiscipline = tab.dataset.discipline;
      verifPanes.forEach(pane => {
        pane.hidden = pane.dataset.verifPane !== targetDiscipline;
      });
      if (verifImg && tab.dataset.img) {
        verifImg.src = tab.dataset.img;
        verifImg.alt = `${tab.textContent.trim()} verification standards illustration`;
      }
    });
  });

  // Portfolio Demo Tabs
  const proTabs = document.querySelectorAll('.portfolio-demo-tabs .portfolio-tab');
  proTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      proTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
    });
  });

  // Interactive Earnings Split Calculator
  const calcSelect = document.querySelector('[data-calc-fee]');
  const payoutEl = document.querySelector('[data-calc-payout]');
  const platformEl = document.querySelector('[data-calc-platform]');

  function updatePayoutCalc() {
    if (!calcSelect) return;
    const fee = Number(calcSelect.value || 2000);
    const payout = Math.round(fee * 0.85);
    const platform = fee - payout;
    if (payoutEl) payoutEl.textContent = `₹${payout.toLocaleString('en-IN')}`;
    if (platformEl) platformEl.textContent = `₹${platform.toLocaleString('en-IN')}`;
  }

  calcSelect?.addEventListener('change', updatePayoutCalc);
}

function init() {
  initHeroPhotoStrip();
  initScrollStory();
  initEditorialDoorsHover();
  initMotionControl();
  initMobileNavigation();
  initSignup();
  initSignin();
  initQuickSearch();
  initDirectory();
  initBooking();
  initJoinFlow();
  initProfileInteractions();
  initClientInteractions();
  initProfessionalInteractions();
  initClientApp();
  initProApp();
  initPageSwitcher();
}

init();
