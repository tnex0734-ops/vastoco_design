// Professional Authenticated Workspace Controllers
// Handles opportunity filtering, offer composing with dynamic 85/15 calculation,
// offer status transitions, schedule view toggling, and portfolio self-management.
// Strictly two-colour brand compliant.

import {
  getClientBriefs,
  sendProOffer,
  updateOfferStatus,
  calculateFeeBreakdown,
  addProjectToPortfolio,
  deleteProjectFromPortfolio,
  getProSchedule
} from './marketplaceData.js';

export function initProApp() {
  initBriefFilters();
  initOfferComposer();
  initOfferActions();
  initScheduleToggles();
  initPortfolioManager();
  initProfileEditor();
  initMeetingSimulation();
}

// 1. Faceted Brief Filtering on /professional/briefs
function initBriefFilters() {
  const container = document.querySelector('[data-briefs-container]');
  const localityPills = document.querySelectorAll('[data-brief-filter-locality] .filter-pill');
  const categoryPills = document.querySelectorAll('[data-brief-filter-category] .filter-pill');

  if (!container || (!localityPills.length && !categoryPills.length)) return;

  let activeLocality = 'all';
  let activeCategory = 'all';

  function applyFilters() {
    const cards = container.querySelectorAll('.pro-opportunity-card');
    cards.forEach(card => {
      const loc = (card.getAttribute('data-locality') || '').toLowerCase();
      const cat = (card.getAttribute('data-category') || '').toLowerCase();

      const matchLoc = activeLocality === 'all' || loc.includes(activeLocality.toLowerCase());
      const matchCat = activeCategory === 'all' || cat.includes(activeCategory.toLowerCase());

      card.hidden = !(matchLoc && matchCat);
    });
  }

  localityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      localityPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      activeLocality = pill.getAttribute('data-val') || 'all';
      applyFilters();
    });
  });

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      activeCategory = pill.getAttribute('data-val') || 'all';
      applyFilters();
    });
  });
}

// 2. Offer Composer with Dynamic 85/15 Fee Transparency Calculator
function initOfferComposer() {
  const form = document.querySelector('[data-form-send-offer]');
  if (!form) return;

  const feeInput = form.querySelector('#offer-fee-input');
  const durationCards = form.querySelectorAll('.duration-radio-card');
  const grossEl = form.querySelector('[data-calc-gross]');
  const proEl = form.querySelector('[data-calc-pro]');
  const feeEl = form.querySelector('[data-calc-fee]');
  const statusEl = form.querySelector('[data-form-status]');

  function updateCalculations() {
    const fee = Number(feeInput?.value) || 2500;
    const breakdown = calculateFeeBreakdown(fee);

    if (grossEl) grossEl.textContent = `₹${breakdown.gross.toLocaleString('en-IN')}`;
    if (proEl) proEl.textContent = `₹${breakdown.proShare.toLocaleString('en-IN')}`;
    if (feeEl) feeEl.textContent = `₹${breakdown.platformFee.toLocaleString('en-IN')}`;
  }

  if (feeInput) {
    feeInput.addEventListener('input', updateCalculations);
  }

  durationCards.forEach(card => {
    card.addEventListener('click', () => {
      durationCards.forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        // Default standard fee suggestions by duration
        if (radio.value === '15' && feeInput) feeInput.value = '1400';
        if (radio.value === '30' && feeInput) feeInput.value = '2500';
        if (radio.value === '45' && feeInput) feeInput.value = '3500';
        updateCalculations();
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const briefId = formData.get('briefId');
    const briefTitle = formData.get('briefTitle');
    const clientDisplayName = formData.get('clientDisplayName');
    const clientLocality = formData.get('clientLocality');
    const durationMinutes = formData.get('durationMinutes');
    const feeAmount = formData.get('feeAmount');
    const pitchMessage = formData.get('pitchMessage');

    const createdOffer = sendProOffer({
      briefId,
      briefTitle,
      clientDisplayName,
      clientLocality,
      durationMinutes,
      feeAmount,
      pitchMessage
    });

    if (statusEl) {
      statusEl.className = 'form-status is-visible form-status--success';
      statusEl.innerHTML = `
        <strong>Consultation proposal dispatched successfully!</strong>
        <p>Offer for ${createdOffer.durationMinutes} min (₹${createdOffer.feeAmount.toLocaleString('en-IN')}) has been sent to ${clientDisplayName}. You will be alerted via SMS when reviewed.</p>
        <a href="/professional/offers" class="button button--small button--dark" style="margin-top: 8px;">View in Sent Offers Pipeline &rarr;</a>
      `;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Proposal Dispatched';
    }
  });

  updateCalculations();
}

// 3. Sent Offers Actions (Withdraw, Simulate Client Accept)
function initOfferActions() {
  document.addEventListener('click', (e) => {
    const withdrawBtn = e.target.closest('[data-withdraw-offer]');
    if (withdrawBtn) {
      const offerId = withdrawBtn.getAttribute('data-withdraw-offer');
      if (confirm('Are you sure you want to withdraw this consultation offer?')) {
        updateOfferStatus(offerId, 'withdrawn');
        window.location.reload();
      }
      return;
    }

    const acceptBtn = e.target.closest('[data-simulate-accept]');
    if (acceptBtn) {
      const offerId = acceptBtn.getAttribute('data-simulate-accept');
      updateOfferStatus(offerId, 'accepted');
      alert('Offer accepted by client! A confirmed consultation slot has been added to your Schedule & Calendar.');
      window.location.reload();
      return;
    }
  });
}

// 4. Schedule View Toggles (Agenda List vs Calendar Matrix)
function initScheduleToggles() {
  const toggleGroup = document.querySelector('[data-schedule-view-toggles]');
  if (!toggleGroup) return;

  const buttons = toggleGroup.querySelectorAll('.view-toggle-btn');
  const views = document.querySelectorAll('[data-view-content]');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      views.forEach(v => {
        if (v.getAttribute('data-view-content') === targetView) {
          v.hidden = false;
          v.classList.add('is-active');
        } else {
          v.hidden = true;
          v.classList.remove('is-active');
        }
      });
    });
  });
}

// 5. Portfolio Project Self-Management
function initPortfolioManager() {
  const toggleBtn = document.querySelector('[data-toggle-add-project]');
  const cancelBtn = document.querySelector('[data-cancel-add-project]');
  const drawer = document.querySelector('[data-add-project-drawer]');
  const form = document.querySelector('[data-form-add-project]');

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
      const tagsStr = fd.get('tags') || '';
      const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

      addProjectToPortfolio({
        title: fd.get('title'),
        location: fd.get('location'),
        category: fd.get('category'),
        year: fd.get('year'),
        scale: fd.get('scale'),
        summary: fd.get('summary'),
        tags: tags.length ? tags : ['Residential', 'Delhi NCR']
      });

      alert('Project saved to your architectural monograph portfolio!');
      window.location.reload();
    });
  }

  // Delete project handler
  document.addEventListener('click', (e) => {
    const delBtn = e.target.closest('[data-delete-project]');
    if (delBtn) {
      const projId = delBtn.getAttribute('data-delete-project');
      if (confirm('Delete this project from your public monograph? This action cannot be undone.')) {
        deleteProjectFromPortfolio(projId);
        window.location.reload();
      }
    }
  });
}

// 6. Practice Profile & Rates Editor
function initProfileEditor() {
  const form = document.querySelector('[data-form-save-profile]');
  if (!form) return;

  const statusEl = form.querySelector('[data-form-status]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (statusEl) {
      statusEl.className = 'form-status is-visible form-status--success';
      statusEl.textContent = 'Practice details and consultation rates saved successfully!';
      setTimeout(() => {
        statusEl.className = 'form-status';
        statusEl.textContent = '';
      }, 4000);
    }
  });
}

// 7. Meeting Video Room Simulation Modal
function initMeetingSimulation() {
  document.addEventListener('click', (e) => {
    const meetBtn = e.target.closest('[data-join-meeting]');
    if (!meetBtn) return;

    e.preventDefault();
    const sessionId = meetBtn.getAttribute('data-join-meeting');
    openVideoMeetingModal(sessionId);
  });
}

function openVideoMeetingModal(sessionId) {
  let modal = document.querySelector('#pro-meeting-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'pro-meeting-modal';
    modal.className = 'meeting-modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="meeting-modal-card" role="dialog" aria-modal="true" aria-label="Video Consultation Room">
      <div class="meeting-header">
        <div class="meeting-title-row">
          <span class="live-dot"></span>
          <strong>Vastoco Secure Video Consultation</strong>
          <span class="encrypted-tag">Encrypted · Escrow Active</span>
        </div>
        <button type="button" class="meeting-close-btn" data-close-meeting aria-label="Leave Consultation">&times;</button>
      </div>

      <div class="meeting-viewport">
        <div class="remote-video-frame">
          <img src="/assets/portfolio-02-shanti-niketan-courtyard.webp" alt="Client floorplan discussion screen" class="meeting-screen-img" />
          <div class="remote-label">Client: Ananya Malhotra (Noida Sector 44)</div>
        </div>
        <div class="self-video-pip">
          <img src="/assets/professional-door-02-architect-at-work.png" alt="Self camera feed" />
          <span>You (Ar. Naina Kapoor)</span>
        </div>
      </div>

      <div class="meeting-toolbar">
        <button type="button" class="toolbar-btn is-active" title="Microphone Active">
          ${icon('video', '', 16)} Audio On
        </button>
        <button type="button" class="toolbar-btn is-active" title="Camera Active">
          ${icon('shield', '', 16)} Camera On
        </button>
        <button type="button" class="toolbar-btn" title="Share Screen">
          ${icon('layers', '', 16)} Share CAD Drawings
        </button>
        <button type="button" class="button button--small button--dark" data-close-meeting>
          End Session & Confirm Payout
        </button>
      </div>

      <div class="meeting-escrow-notice">
        <small>Escrow status: ₹2,500 held in deposit. ₹2,125 (85%) will be transferred to your verified HDFC Bank account upon session conclusion.</small>
      </div>
    </div>
  `;

  modal.classList.add('is-open');

  modal.querySelectorAll('[data-close-meeting]').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('is-open');
    });
  });
}

