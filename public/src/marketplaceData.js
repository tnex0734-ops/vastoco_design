// Two-Sided Architecture & Design Professional Marketplace Data Engine
// Supports bilateral workflows: Client Brief posting, Professional Offer submission,
// Consultation agenda/calendar with conflict detection, and Portfolio self-management.
// Strictly two-colour brand compliant (#3C2415 Espresso, #DDD9CE Pale Oak).

const STORAGE_KEYS = {
  BRIEFS: 'vastoco_marketplace_briefs_v1',
  OFFERS: 'vastoco_marketplace_offers_v1',
  SCHEDULE: 'vastoco_marketplace_schedule_v1',
  PORTFOLIO: 'vastoco_marketplace_portfolio_v1',
  VERIFICATION: 'vastoco_marketplace_verification_v1'
};

// Safe storage access with in-memory fallback
const memoryStore = {};
function storageGet(key, fallback) {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const item = window.sessionStorage.getItem(key);
      if (item) return JSON.parse(item);
    }
  } catch (e) {
    console.warn('Storage read failed, using memory fallback:', e);
  }
  return memoryStore[key] ? JSON.parse(JSON.stringify(memoryStore[key])) : fallback;
}

function storageSet(key, value) {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.warn('Storage write failed, saving in memory:', e);
  }
  memoryStore[key] = JSON.parse(JSON.stringify(value));
}

// 85% Professional Share / 15% Platform Commission Calculation
export function calculateFeeBreakdown(grossFee) {
  const gross = Math.max(0, Number(grossFee) || 0);
  const proShare = Math.round(gross * 0.85);
  const platformFee = gross - proShare;
  return {
    gross,
    proShare,
    platformFee,
    proPercentage: 85,
    platformPercentage: 15,
    notice: 'Practitioners retain 85% of consultation fees. Vastoco deducts a 15% platform commission to cover secure payment escrow, verified COA credential tracking, and high-definition video infrastructure.'
  };
}

// Default Client Project Briefs (Delhi NCR Homeowners)
// Note: Client privacy is rigorously protected — no phone numbers, emails, or exact house numbers are exposed.
export const DEFAULT_CLIENT_BRIEFS = [
  {
    id: 'brief-noida-44',
    title: 'Modern Biophilic Villa Architecture',
    category: 'Architecture',
    categoryKey: 'architect',
    locality: 'Sector 44, Noida',
    city: 'Noida',
    projectType: 'Independent Residential Villa (G+2)',
    plotSize: '500 sq. yards',
    budgetRange: '₹45 Lakhs – ₹75 Lakhs (Design & Coordination)',
    targetTimeline: '3–6 Months to Construction',
    privacy: 'open', // 'open' | 'selected' | 'private'
    privacyLabel: 'Open to eligible verified architects',
    clientDisplayName: 'Vikram & Ananya M.',
    clientInitials: 'VM',
    postedDate: 'Yesterday, 6:30 PM',
    createdAt: '2026-11-12T13:00:00Z',
    status: 'open',
    offersCount: 2,
    description: 'We have acquired a 500 sq. yard south-facing plot in Noida Sector 44. Looking for a licensed architect with extensive biophilic design experience. We want a central lightwell courtyard, cross-ventilation for Delhi summers, and integrated rainwater harvesting. Seeking an initial 30-min consultation to review bylaws and zoning possibilities.',
    deliverablesExpected: [
      'Site setback and FAR zoning review for Noida Authority',
      'Conceptual massing and internal courtyard sketches',
      'Preliminary structural and MEP coordination scope'
    ],
    preferredMeetingTimes: ['Weekday evenings (after 5 PM)', 'Saturday mornings']
  },
  {
    id: 'brief-gurugram-penthouse',
    title: 'Minimalist 4BHK Penthouse Interior Overhaul',
    category: 'Interior Design',
    categoryKey: 'interior',
    locality: 'DLF Phase 5, Gurugram',
    city: 'Gurugram',
    projectType: 'High-Rise Penthouse (4,200 sq. ft.)',
    plotSize: '4,200 sq. ft. Built-up',
    budgetRange: '₹30 Lakhs – ₹50 Lakhs (Interior Architecture)',
    targetTimeline: 'Immediate (1–2 Months)',
    privacy: 'open',
    privacyLabel: 'Open to eligible verified interior designers',
    clientDisplayName: 'Devika Singhania',
    clientInitials: 'DS',
    postedDate: '2 days ago',
    createdAt: '2026-11-11T09:30:00Z',
    status: 'open',
    offersCount: 3,
    description: 'Complete bare-shell interior renovation for a 4BHK duplex penthouse at DLF Phase 5. Demands refined material restraint: microtopping floors, acoustic oak timber panelling, and minimalist concealed lighting. Seeking a seasoned interior designer for a 45-min drawing critique before we tender execution contractors.',
    deliverablesExpected: [
      'Reflected ceiling & architectural lighting strategy',
      'Italian stone & veneer specification palette',
      'Millwork joinery drafting guidelines'
    ],
    preferredMeetingTimes: ['Sunday afternoon (2 PM – 6 PM)', 'Wednesday afternoon']
  },
  {
    id: 'brief-south-delhi-vastu',
    title: 'Heritage Residence Spatial Balancing & Vastu Review',
    category: 'Vastu Consultancy',
    categoryKey: 'vastu',
    locality: 'South Extension Part II, New Delhi',
    city: 'South Delhi',
    projectType: 'Colonial Bungalow Renovation (3,600 sq. ft.)',
    plotSize: '400 sq. yards',
    budgetRange: '₹60 Lakhs – ₹1 Crore (Comprehensive Restructure)',
    targetTimeline: '4–8 Months',
    privacy: 'selected',
    privacyLabel: 'Shared with selected verified specialists',
    clientDisplayName: 'Pradeep & Sunita K.',
    clientInitials: 'PK',
    postedDate: '3 days ago',
    createdAt: '2026-11-10T14:15:00Z',
    status: 'open',
    offersCount: 1,
    description: 'Renovating an inherited family residence in South Extension. We want classical Vedic spatial orientation (Brahmasthan clearance, kitchen Agni placement, master chamber Nairutya corner) without resorting to destructive structural demolition. Need a 30-min consultative assessment of our existing CAD floor plan.',
    deliverablesExpected: [
      'Vedic energy grid overlay on AutoCAD layout',
      'Non-invasive remedies for entrance and water body orientation',
      'Room reallocation matrix based on directional alignment'
    ],
    preferredMeetingTimes: ['Weekday mornings (10 AM – 1 PM)']
  },
  {
    id: 'brief-faridabad-studio',
    title: 'Compact Sustainable Studio Architecture & Interior',
    category: 'Architecture',
    categoryKey: 'architect',
    locality: 'Greenfield Colony, Faridabad',
    city: 'Faridabad',
    projectType: 'Artist Studio & Residence (G+1)',
    plotSize: '250 sq. yards',
    budgetRange: '₹15 Lakhs – ₹25 Lakhs',
    targetTimeline: '2–4 Months',
    privacy: 'open',
    privacyLabel: 'Open to eligible verified practitioners',
    clientDisplayName: 'Rohan Talwar',
    clientInitials: 'RT',
    postedDate: '4 days ago',
    createdAt: '2026-11-09T11:00:00Z',
    status: 'open',
    offersCount: 2,
    description: 'Designing a live-work ceramic and painting studio with attached residence. We prioritize locally sourced exposed brickwork, passive ventilation louvres, and double-height northern clerestory windows. Need a 15-min diagnostic session with an architect passionate about sustainable earth architecture.',
    deliverablesExpected: [
      'Climatic orientation check for Faridabad heat island',
      'Material schedule for exposed wire-cut brick and lime mortar',
      'Preliminary structural framing advice'
    ],
    preferredMeetingTimes: ['Saturday all day', 'Sunday morning']
  }
];

// Default Professional Offers Dispatch Engine
export const DEFAULT_PRO_OFFERS = [
  {
    id: 'off-nk-noida-1',
    briefId: 'brief-noida-44',
    briefTitle: 'Modern Biophilic Villa Architecture',
    clientDisplayName: 'Vikram & Ananya M.',
    clientLocality: 'Sector 44, Noida',
    proId: 'naina-kapoor',
    proName: 'Ar. Naina Kapoor',
    proRole: 'Principal Architect',
    proCompany: 'Studio ArchVeda',
    proCoa: 'COA CA/2014/61284',
    proAvatar: 'assets/professional-door-02-architect-at-work.png',
    durationMinutes: 30,
    feeAmount: 2500,
    proPayout: 2125, // 85%
    platformFee: 375, // 15%
    pitchMessage: 'Our studio is based right off the Noida-Greater Noida Expressway. We have led 14 private villas with internal biophilic lightwells and courtyard passive cooling in Sector 44 and Sector 15A. In this 30-minute consultation, I will review your site plan live, analyze Noida Authority setback requirements, and sketch initial massing options.',
    status: 'sent', // 'draft' | 'sent' | 'accepted' | 'declined' | 'withdrawn'
    statusLabel: 'Sent — Awaiting Client Review',
    createdAt: '2026-11-13T09:45:00Z',
    formattedDate: 'Today, 9:45 AM',
    proposedSlots: ['Tomorrow, 11:30 AM – 12:00 PM', 'Friday, 4:00 PM – 4:30 PM']
  },
  {
    id: 'off-km-gurugram-2',
    briefId: 'brief-gurugram-penthouse',
    briefTitle: 'Minimalist 4BHK Penthouse Interior Overhaul',
    clientDisplayName: 'Devika Singhania',
    clientLocality: 'DLF Phase 5, Gurugram',
    proId: 'kabir-mehta',
    proName: 'Kabir Mehta',
    proRole: 'Design Director',
    proCompany: 'Mehta Interior Atelier',
    proCoa: 'IIID Reg. 2017/NCR/0412',
    proAvatar: 'assets/portfolio-kabir-pavilion.webp',
    durationMinutes: 45,
    feeAmount: 3200,
    proPayout: 2720, // 85%
    platformFee: 480, // 15%
    pitchMessage: 'We have executed three luxury duplex penthouses in DLF Phase 5 (The Magnolias and The Aralias). During our 45-minute video consultation, I will share our specification schedules for microtopping, acoustic timber claddings, and concealed trimless architectural lighting.',
    status: 'accepted',
    statusLabel: 'Accepted by Client — Consultation Booked',
    createdAt: '2026-11-12T16:00:00Z',
    formattedDate: 'Yesterday, 4:00 PM',
    proposedSlots: ['Tomorrow, 3:00 PM – 3:45 PM'],
    meetingLink: 'https://vastoco.internal/meet/vst-dlf-45m'
  },
  {
    id: 'off-rs-southdelhi-3',
    briefId: 'brief-south-delhi-vastu',
    briefTitle: 'Heritage Residence Spatial Balancing & Vastu Review',
    clientDisplayName: 'Pradeep & Sunita K.',
    clientLocality: 'South Extension Part II, New Delhi',
    proId: 'rajeshwar-shastri',
    proName: 'Dr. Rajeshwar Shastri',
    proRole: 'Senior Vastu Master',
    proCompany: 'Vedic Spatial Studio',
    proCoa: 'Vedic Architecture Board VST/2009/88',
    proAvatar: 'assets/project-vastu.webp',
    durationMinutes: 30,
    feeAmount: 2100,
    proPayout: 1785, // 85%
    platformFee: 315, // 15%
    pitchMessage: 'I specialize in non-destructive Vastu harmonization for historic South Delhi residential properties. I will overlay the 81-pada Vastu Purusha Mandala onto your structural drawings during our consultation and pinpoint remedial adjustments.',
    status: 'sent',
    statusLabel: 'Sent — Awaiting Client Review',
    createdAt: '2026-11-13T08:15:00Z',
    formattedDate: 'Today, 8:15 AM',
    proposedSlots: ['Thursday, 10:30 AM – 11:00 AM']
  }
];

// Professional Upcoming Consultations & Calendar Schedule (for logged-in pro: Ar. Naina Kapoor)
export const DEFAULT_PRO_SCHEDULE = [
  {
    id: 'meet-nk-01',
    clientDisplayName: 'Ananya Malhotra',
    clientLocality: 'Sector 44, Noida',
    projectTopic: 'Noida Villa Biophilic Courtyard Review',
    durationMinutes: 30,
    feeGross: 2500,
    proPayout: 2125, // 85%
    scheduledDate: '2026-11-14',
    scheduledTimeStart: '11:30 AM',
    scheduledTimeEnd: '12:00 PM',
    displaySlot: 'Tomorrow, 11:30 AM – 12:00 PM',
    status: 'confirmed',
    statusBadge: 'Confirmed',
    meetingLink: 'https://vastoco.internal/meet/vst-noida-nk1',
    notes: 'Client has uploaded zoning map and initial plot dimensions in PDF format.',
    hasConflict: false
  },
  {
    id: 'meet-nk-02',
    clientDisplayName: 'Rohit Aggarwal',
    clientLocality: 'Vasant Vihar, New Delhi',
    projectTopic: 'Terrace Pavilion & Setback Verification',
    durationMinutes: 45,
    feeGross: 3500,
    proPayout: 2975, // 85%
    scheduledDate: '2026-11-15',
    scheduledTimeStart: '03:00 PM',
    scheduledTimeEnd: '03:45 PM',
    displaySlot: 'Friday, 3:00 PM – 3:45 PM',
    status: 'confirmed',
    statusBadge: 'Confirmed',
    meetingLink: 'https://vastoco.internal/meet/vst-vasant-nk2',
    notes: 'Checking MCD setback compliance for an added glass conservatory.',
    hasConflict: false
  },
  {
    id: 'meet-nk-03',
    clientDisplayName: 'Kunal Singhal',
    clientLocality: 'DLF Phase 2, Gurugram',
    projectTopic: 'Sustainable Brick Cladding & Louvres',
    durationMinutes: 15,
    feeGross: 1400,
    proPayout: 1190, // 85%
    scheduledDate: '2026-11-16',
    scheduledTimeStart: '10:00 AM',
    scheduledTimeEnd: '10:15 AM',
    displaySlot: 'Saturday, 10:00 AM – 10:15 AM',
    status: 'confirmed',
    statusBadge: 'Confirmed',
    meetingLink: 'https://vastoco.internal/meet/vst-dlf-nk3',
    notes: 'Rapid architectural sanity check on facade cladding suppliers.',
    hasConflict: false
  }
];

// Professional Portfolio Projects Self-Management
export const DEFAULT_PRO_PORTFOLIO = [
  {
    id: 'proj-nk-01',
    title: 'The Courtyard House',
    location: 'Sector 44, Noida',
    category: 'Residential Architecture',
    year: '2025',
    scale: '7,500 sq. ft.',
    image: 'assets/portfolio-naina-villa.webp',
    summary: 'A continuous micro-climate courtyard villa featuring exposed local brick, perforated jaali screens, and automated natural convection cooling.',
    tags: ['Biophilic', 'Courtyard', 'Exposed Brick', 'Noida']
  },
  {
    id: 'proj-nk-02',
    title: 'DLF Golf Links Sustainable Villa',
    location: 'DLF Phase 5, Gurugram',
    category: 'Contemporary Architecture',
    year: '2024',
    scale: '9,200 sq. ft.',
    image: 'assets/portfolio-naina-extension.webp',
    summary: 'Minimalist double-glazed steel and limestone residence optimized for natural daylighting with integrated solar photovoltaic pergola.',
    tags: ['Net Zero', 'Steel Frame', 'Daylighting', 'Gurugram']
  },
  {
    id: 'proj-nk-03',
    title: 'Jor Bagh Heritage Apartment',
    location: 'Jor Bagh, New Delhi',
    category: 'Adaptive Reuse & Interior Architecture',
    year: '2024',
    scale: '3,800 sq. ft.',
    image: 'assets/portfolio-dev-courtyard.webp',
    summary: 'Sensitive modernization of a 1960s modernist Delhi apartment, preserving terrazzo aggregate floors and restoring Burma teak door frames.',
    tags: ['Adaptive Reuse', 'Terrazzo', 'Heritage', 'South Delhi']
  }
];

// Professional Verification & Registration Record
export const PRO_VERIFICATION_PROFILE = {
  proId: 'naina-kapoor',
  fullName: 'Ar. Naina Kapoor',
  practiceName: 'Studio ArchVeda',
  discipline: 'Architect (Residential & Sustainable Practices)',
  coaRegistrationNumber: 'CA/2014/61284',
  coaRegisterStatus: 'Active & Verified',
  coaRegisterValidThrough: '31 December 2028',
  verificationBadges: [
    { title: 'COA Register Check', status: 'verified', authority: 'Council of Architecture, India', date: 'Verified 14 Jan 2026' },
    { title: 'Identity & Aadhaar KYC', status: 'verified', authority: 'Government of India UIDAI', date: 'Verified 14 Jan 2026' },
    { title: 'Bank Escrow Payout Account', status: 'verified', authority: 'HDFC Bank Ltd. (A/C ****4821)', date: 'Verified 15 Jan 2026' },
    { title: 'Peer-Reviewed Monograph Audit', status: 'verified', authority: 'Vastoco Editorial Committee', date: 'Verified 18 Jan 2026' }
  ],
  experienceYears: 12,
  completedConsultationsCount: 84,
  clientSatisfactionScore: 4.9,
  payoutBank: {
    bankName: 'HDFC Bank Ltd.',
    accountHolder: 'Studio ArchVeda Architectural LLP',
    accountMasked: '•••• •••• •••• 4821',
    ifscCode: 'HDFC0001208',
    payoutCycle: 'Every Tuesday & Friday (Instant Direct Bank Transfer)'
  }
};

// ==========================================================
// EXPORTED GETTERS & ACTION MUTATORS WITH SESSION STORAGE
// ==========================================================

export function getClientBriefs() {
  return storageGet(STORAGE_KEYS.BRIEFS, DEFAULT_CLIENT_BRIEFS);
}

export function getClientBriefById(id) {
  const briefs = getClientBriefs();
  return briefs.find(b => b.id === id) || null;
}

export function saveClientBrief(briefData) {
  const briefs = getClientBriefs();
  const newBrief = {
    id: `brief-${Date.now()}`,
    title: briefData.title || 'Untitled Architectural Brief',
    category: briefData.category || 'Architecture',
    categoryKey: (briefData.category || 'architect').toLowerCase().includes('interior') ? 'interior' : (briefData.category || '').toLowerCase().includes('vastu') ? 'vastu' : 'architect',
    locality: briefData.locality || 'Delhi NCR',
    city: briefData.city || 'Delhi NCR',
    projectType: briefData.projectType || 'Residential Project',
    plotSize: briefData.plotSize || 'Not specified',
    budgetRange: briefData.budgetRange || 'Flexible',
    targetTimeline: briefData.targetTimeline || '2–4 Months',
    privacy: briefData.privacy || 'open',
    privacyLabel: briefData.privacy === 'private' ? 'Private to direct bookings' : briefData.privacy === 'selected' ? 'Shared with selected specialists' : 'Open to eligible verified practitioners',
    clientDisplayName: briefData.clientDisplayName || 'Client Project',
    clientInitials: (briefData.clientDisplayName || 'CP').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    postedDate: 'Just now',
    createdAt: new Date().toISOString(),
    status: 'open',
    offersCount: 0,
    description: briefData.description || '',
    deliverablesExpected: briefData.deliverablesExpected || ['Initial consultation & layout review'],
    preferredMeetingTimes: briefData.preferredMeetingTimes || ['Flexible video slots']
  };

  briefs.unshift(newBrief);
  storageSet(STORAGE_KEYS.BRIEFS, briefs);
  return newBrief;
}

export function getProOffers() {
  return storageGet(STORAGE_KEYS.OFFERS, DEFAULT_PRO_OFFERS);
}

export function getProOffersForBrief(briefId) {
  const offers = getProOffers();
  return offers.filter(o => o.briefId === briefId);
}

export function sendProOffer(offerInput) {
  const offers = getProOffers();
  const fee = Number(offerInput.feeAmount) || 2500;
  const breakdown = calculateFeeBreakdown(fee);

  const newOffer = {
    id: `off-${Date.now()}`,
    briefId: offerInput.briefId,
    briefTitle: offerInput.briefTitle || 'Client Project Brief',
    clientDisplayName: offerInput.clientDisplayName || 'Client',
    clientLocality: offerInput.clientLocality || 'Delhi NCR',
    proId: PRO_VERIFICATION_PROFILE.proId,
    proName: PRO_VERIFICATION_PROFILE.fullName,
    proRole: 'Principal Architect',
    proCompany: PRO_VERIFICATION_PROFILE.practiceName,
    proCoa: PRO_VERIFICATION_PROFILE.coaRegistrationNumber,
    proAvatar: 'assets/professional-door-02-architect-at-work.png',
    durationMinutes: Number(offerInput.durationMinutes) || 30,
    feeAmount: breakdown.gross,
    proPayout: breakdown.proShare,
    platformFee: breakdown.platformFee,
    pitchMessage: offerInput.pitchMessage || 'I would welcome the opportunity to review your brief in a focused consultation.',
    status: 'sent',
    statusLabel: 'Sent — Awaiting Client Review',
    createdAt: new Date().toISOString(),
    formattedDate: 'Just now',
    proposedSlots: offerInput.proposedSlots || ['Flexible scheduling upon acceptance']
  };

  offers.unshift(newOffer);
  storageSet(STORAGE_KEYS.OFFERS, offers);

  // Update offer count on the brief
  const briefs = getClientBriefs();
  const brief = briefs.find(b => b.id === offerInput.briefId);
  if (brief) {
    brief.offersCount = (brief.offersCount || 0) + 1;
    storageSet(STORAGE_KEYS.BRIEFS, briefs);
  }

  return newOffer;
}

export function updateOfferStatus(offerId, newStatus) {
  const offers = getProOffers();
  const offer = offers.find(o => o.id === offerId);
  if (!offer) return null;

  offer.status = newStatus;
  offer.statusLabel = 
    newStatus === 'accepted' ? 'Accepted by Client — Consultation Booked' :
    newStatus === 'declined' ? 'Declined by Client' :
    newStatus === 'withdrawn' ? 'Withdrawn by Professional' :
    newStatus === 'sent' ? 'Sent — Awaiting Client Review' : 'Draft Proposal';

  if (newStatus === 'accepted') {
    offer.meetingLink = `https://vastoco.internal/meet/vst-${offer.id}`;
    
    // Auto-create consultation in schedule
    addConsultationToSchedule({
      id: `meet-${Date.now()}`,
      clientDisplayName: offer.clientDisplayName,
      clientLocality: offer.clientLocality,
      projectTopic: offer.briefTitle,
      durationMinutes: offer.durationMinutes,
      feeGross: offer.feeAmount,
      proPayout: offer.proPayout,
      scheduledDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      scheduledTimeStart: '02:00 PM',
      scheduledTimeEnd: offer.durationMinutes === 15 ? '02:15 PM' : offer.durationMinutes === 45 ? '02:45 PM' : '02:30 PM',
      displaySlot: 'Upcoming Video Consultation',
      status: 'confirmed',
      statusBadge: 'Confirmed',
      meetingLink: offer.meetingLink,
      notes: `Offer accepted by ${offer.clientDisplayName}. Professional pitch: "${offer.pitchMessage.slice(0, 80)}..."`,
      hasConflict: false
    });
  }

  storageSet(STORAGE_KEYS.OFFERS, offers);
  return offer;
}

export function getProSchedule() {
  const schedule = storageGet(STORAGE_KEYS.SCHEDULE, DEFAULT_PRO_SCHEDULE);
  return detectScheduleConflicts(schedule);
}

export function addConsultationToSchedule(consultation) {
  const schedule = storageGet(STORAGE_KEYS.SCHEDULE, DEFAULT_PRO_SCHEDULE);
  schedule.unshift(consultation);
  const checked = detectScheduleConflicts(schedule);
  storageSet(STORAGE_KEYS.SCHEDULE, checked);
  return consultation;
}

export function detectScheduleConflicts(scheduleList) {
  // Checks if any two items have identical date and overlapping start times
  const seenTimes = new Map();
  return scheduleList.map(item => {
    const key = `${item.scheduledDate}_${item.scheduledTimeStart}`;
    if (seenTimes.has(key)) {
      return { ...item, hasConflict: true, conflictNotice: `Schedule conflict: overlaps with ${seenTimes.get(key)}` };
    }
    seenTimes.set(key, item.clientDisplayName);
    return { ...item, hasConflict: false };
  });
}

export function getProPortfolio() {
  return storageGet(STORAGE_KEYS.PORTFOLIO, DEFAULT_PRO_PORTFOLIO);
}

export function saveProPortfolio(portfolioList) {
  storageSet(STORAGE_KEYS.PORTFOLIO, portfolioList);
  return portfolioList;
}

export function addProjectToPortfolio(project) {
  const portfolio = getProPortfolio();
  const newProject = {
    id: `proj-${Date.now()}`,
    title: project.title || 'Untitled Architectural Work',
    location: project.location || 'Delhi NCR',
    category: project.category || 'Residential Architecture',
    year: project.year || '2026',
    scale: project.scale || 'Custom',
    image: project.image || 'assets/portfolio-01-golf-links-residence.webp',
    summary: project.summary || '',
    tags: project.tags || ['Residential', 'Delhi NCR']
  };
  portfolio.unshift(newProject);
  storageSet(STORAGE_KEYS.PORTFOLIO, portfolio);
  return newProject;
}

export function deleteProjectFromPortfolio(projectId) {
  const portfolio = getProPortfolio();
  const updated = portfolio.filter(p => p.id !== projectId);
  storageSet(STORAGE_KEYS.PORTFOLIO, updated);
  return updated;
}

export function getProVerificationProfile() {
  return storageGet(STORAGE_KEYS.VERIFICATION, PRO_VERIFICATION_PROFILE);
}

