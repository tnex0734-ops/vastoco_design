// Structured mock data and review integrity engine for Vastoco Client Experience V2
// All data is illustrative and marked demo-only. Strictly two-colour brand compliant.

export const LOCALITIES = [
  'All Delhi NCR',
  'South Delhi',
  'Gurgaon',
  'Noida',
  'Central Delhi',
  'West Delhi'
];

export const CATEGORIES = [
  { key: 'all', label: 'All categories' },
  { key: 'architect', label: 'Architects', icon: 'compass', badge: 'COA Register Check' },
  { key: 'interior', label: 'Interior Designers', icon: 'house', badge: 'Identity & Portfolio Audit' },
  { key: 'vastu', label: 'Vastu Consultants', icon: 'layers', badge: 'Certification Review' }
];

export const SERVICES = [
  'All services',
  'Architecture',
  'Interior design',
  'Home renovation and space planning',
  'Vastu consultation'
];

export const SPECIALIZATIONS = [
  'All specializations',
  'Residential architecture',
  'Courtyard villas',
  'Glass pavilions',
  'Terrace extensions',
  'Bespoke joinery',
  'Luxury residences',
  'Concealed lighting',
  'Spatial alignment',
  'Non-invasive remedies',
  'Sustainable structures'
];

export const DURATIONS = [
  { key: 'all', label: 'Any duration' },
  { key: '15', label: '15 Minutes' },
  { key: '30', label: '30 Minutes' },
  { key: '45', label: '45 Minutes' }
];

export const SORT_OPTIONS = [
  { key: 'relevant', label: 'Most relevant' },
  { key: 'rating_desc', label: 'Highest rated' },
  { key: 'reviews_desc', label: 'Most reviewed' },
  { key: 'experience_desc', label: 'Most experienced' },
  { key: 'fee_asc', label: 'Consultation fee: low to high' },
  { key: 'fee_desc', label: 'Consultation fee: high to low' }
];

// Raw review records. Only records with status === 'published' count towards ratings.
export const RAW_REVIEWS = [
  // --- NAINA KAPOOR (Architect) — Exact 36 reviews distribution:
  // 5 stars: 31, 4 stars: 3, 3 stars: 1, 2 stars: 1, 1 star: 0 -> Total: 36, Avg: 4.777... -> 4.8
  ...Array.from({ length: 31 }, (_, i) => ({
    id: `rev-nk-5-${i + 1}`,
    professionalId: 'naina-kapoor',
    consultationId: `c-nk-${100 + i}`,
    clientDisplayName: ['Arjun M.', 'Sunita R.', 'Vikram P.', 'Rohit G.', 'Meera S.', 'Karan D.', 'Anita B.', 'Rishi V.'][i % 8],
    rating: 5,
    reviewText: [
      'Incredible architectural clarity in our 30-min call. Naina spotted structural opportunities in our Vasant Vihar plot that saved us months of revisions.',
      'Thorough review of our floor plans. Understood South Delhi setback bylaws immediately and suggested an elegant internal courtyard.',
      'Crisp, practical advice on daylighting and staircase positioning. Worth every rupee of the consultation fee.',
      'Excellent villa layout guidance. She listened attentively to our family brief and gave actionable sketches on screen.'
    ][i % 4],
    publishedAt: `2026-${String((i % 10) + 1).padStart(2, '0')}-${String((i % 25) + 1).padStart(2, '0')}`,
    status: 'published',
    consultationContext: '30-minute Residential Architecture Consultation',
    isDemo: true
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `rev-nk-4-${i + 1}`,
    professionalId: 'naina-kapoor',
    consultationId: `c-nk-40${i}`,
    clientDisplayName: ['Deepak T.', 'Pooja K.', 'Sameer N.'][i],
    rating: 4,
    reviewText: 'Very knowledgeable on MCD sanction procedures and floor-area ratios. Clear next steps provided.',
    publishedAt: `2026-02-1${i + 2}`,
    status: 'published',
    consultationContext: '45-minute Villa Extension & Sanction Review',
    isDemo: true
  })),
  {
    id: 'rev-nk-3-1',
    professionalId: 'naina-kapoor',
    consultationId: 'c-nk-301',
    clientDisplayName: 'Gaurav H.',
    rating: 3,
    reviewText: 'Good architectural feedback, though 15 minutes felt a bit rushed for our multi-floor scope. Recommend 30 or 45 mins.',
    publishedAt: '2026-01-28',
    status: 'published',
    consultationContext: '15-minute Initial Scope Screening',
    isDemo: true
  },
  {
    id: 'rev-nk-2-1',
    professionalId: 'naina-kapoor',
    consultationId: 'c-nk-201',
    clientDisplayName: 'Anonymous Client',
    rating: 2,
    reviewText: 'Detailed discussion but our budget expectations were divergent for full turnkey execution.',
    publishedAt: '2026-01-14',
    status: 'published',
    consultationContext: '30-minute Residential Consultation',
    isDemo: true
  },

  // --- KABIR SETHI (Architect) — 1 review (Single review edge case)
  {
    id: 'rev-ks-1',
    professionalId: 'kabir-sethi',
    consultationId: 'c-ks-101',
    clientDisplayName: 'Tanya B.',
    rating: 5,
    reviewText: 'Brilliant terrace pavilion concept. Kabir reviewed our Hauz Khas structural load limits and gave us immediate confidence.',
    publishedAt: '2026-03-02',
    status: 'published',
    consultationContext: '30-minute Terrace Pavilion Consultation',
    isDemo: true
  },

  // --- DEV MALHOTRA (Vastu Consultant) — 12 reviews (Identical 4.8 avg with different review count: 10x 5★, 2x 4★)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `rev-dm-5-${i + 1}`,
    professionalId: 'dev-malhotra',
    consultationId: `c-dm-${100 + i}`,
    clientDisplayName: ['Sanjay V.', 'Radha G.', 'Nitin K.', 'Alok P.'][i % 4],
    rating: 5,
    reviewText: 'Dev provided completely non-invasive spatial remedies for our Chattarpur farmhouse entrance. Respectful of modern architecture.',
    publishedAt: `2026-02-${String(i + 10).padStart(2, '0')}`,
    status: 'published',
    consultationContext: '30-minute Residential Vastu Harmony Review',
    isDemo: true
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `rev-dm-4-${i + 1}`,
    professionalId: 'dev-malhotra',
    consultationId: `c-dm-40${i}`,
    clientDisplayName: ['Harish M.', 'Vandana J.'][i],
    rating: 4,
    reviewText: 'Detailed directional compass analysis. Clear rationale on water-body alignment in North-East quadrant.',
    publishedAt: '2026-01-20',
    status: 'published',
    consultationContext: '45-minute Spatial Alignment Session',
    isDemo: true
  })),

  // --- ANANYA SHARMA (Interior Designer) — 18 reviews (Average 4.6: 12x 5★, 5x 4★, 1x 3★)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `rev-as-5-${i + 1}`,
    professionalId: 'ananya-sharma',
    consultationId: `c-as-${100 + i}`,
    clientDisplayName: ['Bhavna R.', 'Kavita M.', 'Aditya S.', 'Sneha C.'][i % 4],
    rating: 5,
    reviewText: 'Superb material curation. Ananya helped us pick tactile oak and textured stone finishes for our DLF Phase 5 apartment.',
    publishedAt: `2026-02-${String(i + 5).padStart(2, '0')}`,
    status: 'published',
    consultationContext: '30-minute Interior Material & Lighting Consultation',
    isDemo: true
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `rev-as-4-${i + 1}`,
    professionalId: 'ananya-sharma',
    consultationId: `c-as-40${i}`,
    clientDisplayName: ['Pradeep T.', 'Manish K.'][i % 2],
    rating: 4,
    reviewText: 'Great lighting layout ideas. Pointed out concealed cove detailing that makes the ceiling appear higher.',
    publishedAt: `2026-01-${String(i + 10).padStart(2, '0')}`,
    status: 'published',
    consultationContext: '30-minute Space Planning Review',
    isDemo: true
  })),
  {
    id: 'rev-as-3-1',
    professionalId: 'ananya-sharma',
    consultationId: 'c-as-301',
    clientDisplayName: 'Simran K.',
    rating: 3,
    reviewText: 'Helpful moodboard suggestions, though we spent most of the time discussing furniture dimensions.',
    publishedAt: '2026-01-05',
    status: 'published',
    consultationContext: '15-minute Design Quick Check',
    isDemo: true
  },

  // --- RAHUL VERMA (Architect) — 24 published reviews (Average 4.5: 14x 5★, 8x 4★, 2x 3★)
  // PLUS 1 pending and 1 hidden review (which must NOT be included in rating calculation!)
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `rev-rv-5-${i + 1}`,
    professionalId: 'rahul-verma',
    consultationId: `c-rv-${100 + i}`,
    clientDisplayName: ['Ashok L.', 'Geeta N.', 'Mohit S.', 'Pallavi D.'][i % 4],
    rating: 5,
    reviewText: 'Deep structural expertise in steel framing and solar thermal orientation. Very rigorous engineer-architect approach.',
    publishedAt: `2026-02-${String(i + 3).padStart(2, '0')}`,
    status: 'published',
    consultationContext: '45-minute Sustainable Residence Consultation',
    isDemo: true
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `rev-rv-4-${i + 1}`,
    professionalId: 'rahul-verma',
    consultationId: `c-rv-40${i}`,
    clientDisplayName: ['Tarun W.', 'Kunal B.'][i % 2],
    rating: 4,
    reviewText: 'Solid HVAC and thermal insulation advice for our Gurgaon penthouse terrace.',
    publishedAt: `2026-01-${String(i + 12).padStart(2, '0')}`,
    status: 'published',
    consultationContext: '30-minute Structural Review',
    isDemo: true
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `rev-rv-3-${i + 1}`,
    professionalId: 'rahul-verma',
    consultationId: `c-rv-30${i}`,
    clientDisplayName: ['Umesh R.', 'Rajesh V.'][i],
    rating: 3,
    reviewText: 'Technical discussion was thorough, but drawings were slightly complex for a first consultation.',
    publishedAt: '2026-01-08',
    status: 'published',
    consultationContext: '30-minute Technical Sanction Review',
    isDemo: true
  })),
  // PENDING review (must be excluded from rating average)
  {
    id: 'rev-rv-pending-1',
    professionalId: 'rahul-verma',
    consultationId: 'c-rv-pending',
    clientDisplayName: 'Awaiting Moderation',
    rating: 1,
    reviewText: 'Pending review submitted today — not yet published by platform integrity checks.',
    publishedAt: '2026-03-08',
    status: 'pending',
    consultationContext: '15-minute Call',
    isDemo: true
  },
  // HIDDEN review (must be excluded from rating average)
  {
    id: 'rev-rv-hidden-1',
    professionalId: 'rahul-verma',
    consultationId: 'c-rv-hidden',
    clientDisplayName: 'Spam flagged',
    rating: 1,
    reviewText: 'Hidden violation review flagged for moderation.',
    publishedAt: '2026-01-02',
    status: 'hidden',
    consultationContext: 'Consultation',
    isDemo: true
  }
];

// Rich professional profiles
export const RAW_PROFESSIONALS = [
  {
    id: 'naina-kapoor',
    name: 'Naina Kapoor',
    profession: 'Architect',
    roleKey: 'architect',
    location: 'South Delhi',
    experienceYears: 8,
    specializations: ['Residential architecture', 'Courtyard villas', 'Sanction drawings'],
    services: ['Architecture', 'Home renovation and space planning'],
    consultationFees: { 15: 750, 30: 1400, 45: 1950 },
    image: '/assets/portfolio-naina-villa.webp',
    imageAlt: 'Modern courtyard villa in South Delhi by Naina Kapoor',
    portfolio: [
      {
        title: 'Modern Courtyard Villa',
        meta: '4,200 sq.ft · South Delhi · 2025',
        image: '/assets/portfolio-naina-villa.webp',
        source: 'Unsplash (R Architecture)'
      },
      {
        title: 'Brick Facade & Cantilever Extension',
        meta: '2,800 sq.ft · Greater Kailash · 2024',
        image: '/assets/portfolio-naina-extension.webp',
        source: 'Unsplash (R Architecture)'
      }
    ],
    verificationStatus: 'coa-verified',
    verificationLabel: 'COA Active Register Check',
    shortVerifLabel: 'COA checked',
    verificationDoc: 'Council of Architecture (COA) registration CA/2016/78210 verified against public gazette. Demo illustrative check.',
    coaRegistration: 'CA/2016/78210',
    bio: 'Specialising in climate-responsive residential architecture, private courtyard villas, and contemporary structural additions across South Delhi and Central Delhi.',
    qualifications: ['B.Arch (SPA Delhi, 2015)', 'Council of Architecture Active Register (CA/2016/78210)', 'Indian Institute of Architects (IIA Member)'],
    availableSlots: [
      { id: 's1', date: 'Tomorrow', time: '10:30 AM', duration: 30, available: true },
      { id: 's2', date: 'Tomorrow', time: '02:00 PM', duration: 30, available: false }, // Slot unavailable demo
      { id: 's3', date: 'In 2 days', time: '11:30 AM', duration: 15, available: true },
      { id: 's4', date: 'In 3 days', time: '04:00 PM', duration: 45, available: true }
    ],
    statusLabel: 'Illustrative demo profile'
  },
  {
    id: 'kabir-sethi',
    name: 'Kabir Sethi',
    profession: 'Architect',
    roleKey: 'architect',
    location: 'South Delhi',
    experienceYears: 6,
    specializations: ['Glass pavilions', 'Terrace extensions', 'Space planning'],
    services: ['Architecture', 'Home renovation and space planning'],
    consultationFees: { 15: 650, 30: 1250, 45: 1800 },
    image: '/assets/portfolio-kabir-pavilion.webp',
    imageAlt: 'Minimalist glass pavilion extension in South Delhi by Kabir Sethi',
    portfolio: [
      {
        title: 'Minimalist Glass Pavilion',
        meta: '1,800 sq.ft · Hauz Khas · 2025',
        image: '/assets/portfolio-kabir-pavilion.webp',
        source: 'Unsplash (R Architecture)'
      },
      {
        title: 'Terrace Garden Studio',
        meta: '950 sq.ft · Panchsheel Park · 2024',
        image: '/assets/portfolio-kabir-terrace.webp',
        source: 'Unsplash (R Architecture)'
      }
    ],
    verificationStatus: 'coa-verified',
    verificationLabel: 'COA Active Register Check',
    shortVerifLabel: 'COA checked',
    verificationDoc: 'Council of Architecture (COA) registration CA/2018/91440 verified against public gazette. Demo illustrative check.',
    coaRegistration: 'CA/2018/91440',
    bio: 'Dedicated to lightweight glass extensions, terrace studios, and indoor-outdoor spatial flow for urban Delhi residences.',
    qualifications: ['B.Arch (CCA Chandigarh, 2017)', 'Council of Architecture (CA/2018/91440)'],
    availableSlots: [
      { id: 's1', date: 'Tomorrow', time: '11:00 AM', duration: 15, available: true },
      { id: 's2', date: 'In 2 days', time: '03:30 PM', duration: 30, available: true }
    ],
    statusLabel: 'Illustrative demo profile'
  },
  {
    id: 'mira-khanna',
    name: 'Mira Khanna',
    profession: 'Interior Designer',
    roleKey: 'interior',
    location: 'Noida',
    experienceYears: 7,
    specializations: ['Residential interiors', 'Bespoke joinery', 'Material curation'],
    services: ['Interior design', 'Home renovation and space planning'],
    consultationFees: { 15: 700, 30: 1350, 45: 1900 },
    image: '/assets/portfolio-mira-living.webp',
    imageAlt: 'Curated oak and linen living space in Noida by Mira Khanna',
    portfolio: [
      {
        title: 'Oak & Linen Living Space',
        meta: '3,100 sq.ft · Noida Expressway · 2025',
        image: '/assets/portfolio-mira-living.webp',
        source: 'Unsplash (Spacejoy)'
      },
      {
        title: 'Bespoke Millwork & Dining Suite',
        meta: '2,200 sq.ft · Sector 15 · 2024',
        image: '/assets/portfolio-mira-joinery.webp',
        source: 'Unsplash (Spacejoy)'
      }
    ],
    verificationStatus: 'portfolio-audited',
    verificationLabel: 'Identity & Portfolio Audit',
    shortVerifLabel: 'Credentials checked',
    verificationDoc: 'Government Photo ID and documented professional interior portfolio verified by Vastoco design team. Demo check.',
    coaRegistration: 'Govt. Photo ID + Degree & Portfolio Documentation Audit',
    bio: 'Focusing on tactile materiality, bespoke cabinetry, and tailored lighting schemes that elevate residential apartments and penthouses.',
    qualifications: ['M.Des (Interior Architecture, CEPT 2018)', 'Institute of Indian Interior Designers (IIID Member)'],
    availableSlots: [
      { id: 's1', date: 'Tomorrow', time: '01:00 PM', duration: 30, available: true },
      { id: 's2', date: 'In 2 days', time: '04:30 PM', duration: 45, available: true }
    ],
    statusLabel: 'Illustrative demo profile'
  },
  {
    id: 'dev-malhotra',
    name: 'Dev Malhotra',
    profession: 'Vastu Consultant',
    roleKey: 'vastu',
    location: 'South Delhi',
    experienceYears: 9,
    specializations: ['Spatial alignment', 'Directional harmony', 'Non-invasive remedies'],
    services: ['Vastu consultation'],
    consultationFees: { 15: 800, 30: 1500, 45: 2100 },
    image: '/assets/portfolio-dev-courtyard.webp',
    imageAlt: 'Courtyard light and water alignment layout in South Delhi by Dev Malhotra',
    portfolio: [
      {
        title: 'Courtyard Light & Water Axis',
        meta: '5,000 sq.ft · Chattarpur · 2025',
        image: '/assets/portfolio-dev-courtyard.webp',
        source: 'Unsplash (R Architecture)'
      },
      {
        title: 'Panchsheel Spatial Re-alignment',
        meta: '3,800 sq.ft · Panchsheel Enclave · 2024',
        image: '/assets/portfolio-dev-sanctuary.webp',
        source: 'Unsplash (R Architecture)'
      }
    ],
    verificationStatus: 'certification-reviewed',
    verificationLabel: 'Certification Review',
    shortVerifLabel: 'Credentials checked',
    verificationDoc: 'Certified Vastu Shastra Consultant practice review and verified client reference documentation. Demo check.',
    coaRegistration: 'Govt. Photo ID + Vastu Certification & Practice Review',
    bio: 'Bridging Vedic spatial principles with contemporary architecture, offering non-invasive structural remedies and orientation guidance.',
    qualifications: ['Certified Vastu Shastra Consultant (AIVS)', 'B.Sc (Architecture Studies)'],
    availableSlots: [
      { id: 's1', date: 'Tomorrow', time: '10:00 AM', duration: 30, available: true },
      { id: 's2', date: 'In 3 days', time: '05:00 PM', duration: 45, available: true }
    ],
    statusLabel: 'Illustrative demo profile'
  },
  {
    id: 'ananya-sharma',
    name: 'Ananya Sharma',
    profession: 'Interior Designer',
    roleKey: 'interior',
    location: 'Gurgaon',
    experienceYears: 10,
    specializations: ['Luxury residences', 'Concealed lighting', 'Custom joinery'],
    services: ['Interior design', 'Home renovation and space planning'],
    consultationFees: { 15: 850, 30: 1600, 45: 2250 },
    image: '/assets/project-interior.webp',
    imageAlt: 'Curated modern residential lounge in Gurgaon by Ananya Sharma',
    portfolio: [
      {
        title: 'DLF Crest Penthouse Transformation',
        meta: '4,600 sq.ft · DLF Phase 5 · 2025',
        image: '/assets/project-interior.webp',
        source: 'Unsplash (Spacejoy)'
      },
      {
        title: 'Tactile Stone & Veneer Lounge',
        meta: '3,400 sq.ft · Golf Course Extension · 2024',
        image: '/assets/portfolio-mira-living.webp',
        source: 'Unsplash (Spacejoy)'
      }
    ],
    verificationStatus: 'portfolio-audited',
    verificationLabel: 'Identity & Portfolio Audit',
    shortVerifLabel: 'Credentials checked',
    verificationDoc: 'Government Photo ID and documented professional interior portfolio verified by Vastoco design team. Demo check.',
    coaRegistration: 'Govt. Photo ID + Degree & Portfolio Documentation Audit',
    bio: 'Transforming premium urban residences with a focus on concealed acoustic elements, natural stone, and tailored spatial zoning.',
    qualifications: ['B.Des (Interior Architecture, NID 2015)', 'IIID Executive Member'],
    availableSlots: [
      { id: 's1', date: 'In 2 days', time: '12:00 PM', duration: 30, available: true },
      { id: 's2', date: 'In 4 days', time: '03:00 PM', duration: 45, available: true }
    ],
    statusLabel: 'Illustrative demo profile'
  },
  {
    id: 'rahul-verma',
    name: 'Rahul Verma',
    profession: 'Architect',
    roleKey: 'architect',
    location: 'Gurgaon',
    experienceYears: 12,
    specializations: ['Sustainable structures', 'Steel pavilions', 'Daylight engineering'],
    services: ['Architecture', 'Home renovation and space planning'],
    consultationFees: { 15: 900, 30: 1700, 45: 2400 },
    image: '/assets/project-residential.webp',
    imageAlt: 'Contemporary sustainable residence in Gurgaon by Rahul Verma',
    portfolio: [
      {
        title: 'Solar-Passive Rooftop Residence',
        meta: '5,500 sq.ft · Golf Course Road · 2025',
        image: '/assets/project-residential.webp',
        source: 'Unsplash (R Architecture)'
      },
      {
        title: 'Exposed Steel Glass Studio',
        meta: '2,100 sq.ft · DLF Phase 1 · 2024',
        image: '/assets/portfolio-kabir-pavilion.webp',
        source: 'Unsplash (R Architecture)'
      }
    ],
    verificationStatus: 'coa-verified',
    verificationLabel: 'COA Active Register Check',
    shortVerifLabel: 'COA checked',
    verificationDoc: 'Council of Architecture (COA) registration CA/2012/55320 verified against public gazette. Demo illustrative check.',
    coaRegistration: 'CA/2012/55320',
    bio: 'Architectural engineer concentrating on solar orientation, high-performance building envelopes, and biophilic cantilevered structures.',
    qualifications: ['M.Arch (IIT Roorkee, 2013)', 'Council of Architecture (CA/2012/55320)', 'GRIHA Certified Professional'],
    availableSlots: [
      { id: 's1', date: 'Tomorrow', time: '09:30 AM', duration: 15, available: true },
      { id: 's2', date: 'In 2 days', time: '02:30 PM', duration: 30, available: true }
    ],
    statusLabel: 'Illustrative demo profile'
  }
];

// Compute rating statistics from raw reviews for a given professional
export function computeRatingStats(professionalId, reviews = RAW_REVIEWS) {
  const eligible = reviews.filter(
    (r) => r.professionalId === professionalId && r.status === 'published'
  );

  const reviewCount = eligible.length;
  if (reviewCount === 0) {
    return {
      reviewCount: 0,
      averageRating: null,
      averageFormatted: null,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      hasReviews: false,
      isNew: true,
      eligibleReviews: []
    };
  }

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  for (const rev of eligible) {
    const star = Math.max(1, Math.min(5, Math.round(rev.rating)));
    distribution[star] = (distribution[star] || 0) + 1;
    sum += rev.rating;
  }

  const rawAvg = sum / reviewCount;
  // Format to 1 decimal place (e.g. 4.777 -> 4.8)
  const averageRating = Number(rawAvg.toFixed(1));

  return {
    reviewCount,
    averageRating,
    averageFormatted: averageRating.toFixed(1),
    distribution,
    hasReviews: true,
    isNew: false,
    eligibleReviews: eligible
  };
}

// Get all professionals merged with dynamic computed stats
export function getAllProfessionalsWithStats(reviews = RAW_REVIEWS) {
  return RAW_PROFESSIONALS.map((pro) => {
    const stats = computeRatingStats(pro.id, reviews);
    return {
      ...pro,
      stats,
      // For backwards compatibility and fast sorting
      rating: stats.averageRating,
      reviewCount: stats.reviewCount,
      hasReviews: stats.hasReviews
    };
  });
}

// Professional lookup by ID
export function getProfessionalById(id, reviews = RAW_REVIEWS) {
  const found = RAW_PROFESSIONALS.find((p) => p.id === id);
  if (!found) return null;
  const stats = computeRatingStats(found.id, reviews);
  return { ...found, stats, rating: stats.averageRating, reviewCount: stats.reviewCount };
}

// Filter engine for discovery
export function filterProfessionals(list, filters = {}) {
  const {
    category = 'all',
    locality = 'All Delhi NCR',
    service = 'All services',
    specialization = 'All specializations',
    duration = 'all',
    minRating = 'all',
    includeUnrated = true,
    experience = 'all',
    maxFee = null,
    searchQuery = ''
  } = filters;

  const query = searchQuery.trim().toLowerCase();

  return list.filter((pro) => {
    // 1. Category filter
    if (category !== 'all' && pro.roleKey !== category) {
      return false;
    }

    // 2. Locality filter
    if (locality !== 'All Delhi NCR' && pro.location !== locality) {
      return false;
    }

    // 3. Service filter
    if (service !== 'All services' && !pro.services.includes(service)) {
      return false;
    }

    // 3b. Specialization filter
    if (specialization !== 'All specializations' && !(pro.specializations || []).includes(specialization)) {
      return false;
    }

    // 3c. Duration filter
    if (duration !== 'all') {
      const durNum = parseInt(duration, 10);
      if (!pro.consultationFees || !pro.consultationFees[durNum]) {
        return false;
      }
    }

    // 4. Rating filter
    if (minRating !== 'all') {
      const minScore = parseFloat(minRating);
      if (!pro.hasReviews) {
        if (!includeUnrated) return false;
      } else if (pro.rating === null || pro.rating < minScore) {
        return false;
      }
    }

    // 5. Experience filter
    if (experience !== 'all') {
      const minExp = parseInt(experience, 10);
      if (pro.experienceYears < minExp) return false;
    }

    // 6. Max Fee filter (based on 30m consultation rate)
    if (maxFee !== null && maxFee !== undefined && maxFee !== '') {
      const feeLimit = Number(maxFee);
      if (feeLimit > 0 && pro.consultationFees[30] > feeLimit) return false;
    }

    // 7. Search query (name, profession, expertise, location, keywords)
    if (query) {
      const searchable = [
        pro.name,
        pro.profession,
        pro.location,
        pro.bio,
        ...pro.specializations,
        ...pro.services,
        ...(pro.portfolio.map((p) => p.title))
      ].join(' ').toLowerCase();

      if (!searchable.includes(query)) return false;
    }

    return true;
  });
}

// Sorting engine
export function sortProfessionals(list, sortKey = 'relevant') {
  const copy = [...list];

  switch (sortKey) {
    case 'rating_desc':
      return copy.sort((a, b) => {
        // High rating primary; if both unrated, retain order; if one unrated, rated first
        if (a.hasReviews && !b.hasReviews) return -1;
        if (!a.hasReviews && b.hasReviews) return 1;
        if (!a.hasReviews && !b.hasReviews) return 0;
        if (b.rating !== a.rating) return b.rating - a.rating;
        // Secondary key: eligible review count descending
        return b.reviewCount - a.reviewCount;
      });

    case 'reviews_desc':
      return copy.sort((a, b) => b.reviewCount - a.reviewCount);

    case 'experience_desc':
      return copy.sort((a, b) => b.experienceYears - a.experienceYears);

    case 'fee_asc':
      return copy.sort((a, b) => a.consultationFees[30] - b.consultationFees[30]);

    case 'fee_desc':
      return copy.sort((a, b) => b.consultationFees[30] - a.consultationFees[30]);

    case 'relevant':
    default:
      // Default order preserves curated architectural diversity
      return copy;
  }
}

// Client Workspace Mock Data (Initial state)
export const INITIAL_CLIENT_STATE = {
  activeMode: 'active', // 'new' | 'active' | 'returning'
  savedIds: ['naina-kapoor', 'dev-malhotra'],
  comparedIds: ['naina-kapoor', 'kabir-sethi'],
  bookings: [
    {
      id: 'bk-101',
      bookingReference: 'VST-2026-8841',
      professionalId: 'naina-kapoor',
      duration: 30,
      date: 'Friday, Nov 20, 2026',
      time: '11:30 AM IST',
      fee: 1400,
      professionalFee: 1190, // 85% share
      platformCommission: 210, // 15% share
      escrowProtected: true,
      projectBudget: '₹40L – ₹60L',
      scope: 'Ground floor layout redesign & courtyard light shaft extension in Vasant Vihar residence.',
      timeline: 'Planning phase (3-6 months)',
      status: 'upcoming',
      paymentStatus: 'simulated_escrow_held'
    },
    {
      id: 'bk-102',
      bookingReference: 'VST-2026-7219',
      professionalId: 'dev-malhotra',
      duration: 45,
      date: 'Oct 14, 2026',
      time: '04:00 PM IST',
      fee: 2100,
      professionalFee: 1785,
      platformCommission: 315,
      escrowProtected: true,
      projectBudget: 'N/A (Spatial Consultation)',
      scope: 'North-East directional alignment review for farmhouse main entry.',
      timeline: 'Immediate implementation',
      status: 'completed',
      paymentStatus: 'released_to_professional'
    },
    {
      id: 'bk-103',
      bookingReference: 'VST-2026-6102',
      professionalId: 'kabir-sethi',
      duration: 15,
      date: 'Sep 28, 2026',
      time: '02:00 PM IST',
      fee: 650,
      professionalFee: 552.5,
      platformCommission: 97.5,
      escrowProtected: true,
      projectBudget: 'Under ₹20L',
      scope: 'Terrace garden glass room feasibility quick check.',
      timeline: 'Exploratory',
      status: 'cancelled',
      paymentStatus: 'cancelled_refunded'
    }
  ],
  activities: [
    {
      id: 'act-1',
      type: 'booking_confirmed',
      title: 'Consultation Confirmed',
      description: 'Booked 30-min video consultation with Naina Kapoor for Friday, Nov 20.',
      timestamp: '2 hours ago',
      link: '/client/consultations'
    },
    {
      id: 'act-2',
      type: 'compared',
      title: 'Comparison Initiated',
      description: 'Compared Naina Kapoor and Kabir Sethi side by side.',
      timestamp: 'Yesterday',
      link: '/client/compare'
    },
    {
      id: 'act-3',
      type: 'saved',
      title: 'Saved to Shortlist',
      description: 'Saved Dev Malhotra (Vastu Consultant) to your saved professionals.',
      timestamp: '3 days ago',
      link: '/client/saved'
    },
    {
      id: 'act-4',
      type: 'review_submitted',
      title: 'Review Published',
      description: 'Published 5-star review for completed consultation with Dev Malhotra.',
      timestamp: 'Oct 15, 2026',
      link: '/client/professionals/dev-malhotra'
    },
    {
      id: 'act-5',
      type: 'consultation_completed',
      title: 'Consultation Completed',
      description: 'Completed 45-min video consultation with Dev Malhotra.',
      timestamp: 'Oct 14, 2026',
      link: '/client/consultations'
    }
  ]
};

// Client Session Store helper
const STORAGE_KEY = 'vastoco_client_v2_store';

export function getClientState() {
  if (typeof window === 'undefined') return INITIAL_CLIENT_STATE;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CLIENT_STATE));
      return INITIAL_CLIENT_STATE;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CLIENT_STATE;
  }
}

export function saveClientState(state) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Could not save client state', err);
  }
}

export function toggleSaveProfessional(id) {
  const state = getClientState();
  const saved = new Set(state.savedIds || []);
  const isSaved = saved.has(id);
  if (isSaved) {
    saved.delete(id);
  } else {
    saved.add(id);
    // Add activity event
    const pro = RAW_PROFESSIONALS.find((p) => p.id === id);
    if (pro) {
      state.activities.unshift({
        id: `act-${Date.now()}`,
        type: 'saved',
        title: 'Saved to Shortlist',
        description: `Saved ${pro.name} (${pro.profession}) to your shortlist.`,
        timestamp: 'Just now',
        link: '/client/saved'
      });
    }
  }
  state.savedIds = Array.from(saved);
  saveClientState(state);
  return !isSaved;
}

export function toggleCompareProfessional(id) {
  const state = getClientState();
  let compared = [...(state.comparedIds || [])];
  const index = compared.indexOf(id);

  if (index >= 0) {
    compared.splice(index, 1);
    state.comparedIds = compared;
    saveClientState(state);
    return { selected: false, list: compared, limitExceeded: false };
  }

  if (compared.length >= 2) {
    // 2-profile limit reached
    return { selected: false, list: compared, limitExceeded: true };
  }

  compared.push(id);
  state.comparedIds = compared;

  if (compared.length === 2) {
    state.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'compared',
      title: 'Comparison Initiated',
      description: `Compared 2 professionals side by side.`,
      timestamp: 'Just now',
      link: '/client/compare'
    });
  }

  saveClientState(state);
  return { selected: true, list: compared, limitExceeded: false };
}

export function clearComparison() {
  const state = getClientState();
  state.comparedIds = [];
  saveClientState(state);
}

export function setClientMode(mode) {
  const state = getClientState();
  state.activeMode = mode;
  saveClientState(state);
  return state;
}

// ==========================================
// CLIENT ACCOUNT PROFILE STORE (VIEW & EDIT)
// ==========================================
export const DEFAULT_CLIENT_PROFILE = {
  // A. Personal Information
  fullName: 'Priya Sharma',
  avatarInitials: 'PS',
  email: 'priya.sharma@example.com',
  emailVerified: true,
  phone: '+91 98112 34567',
  phoneVerified: true,

  // B. Location
  city: 'New Delhi',
  locality: 'Vasant Vihar',

  // C. Project Preferences
  preferredCategories: ['architect', 'interior'],
  serviceInterests: ['Architecture', 'Home renovation and space planning'],
  projectType: 'Residential Villa Renovation & Courtyard Light Well',
  approxBudget: '₹35L – ₹75L',
  expectedTimeline: '1–3 months',

  // D. Communication Preferences
  notifyEmailBooking: true,
  notifyEmailReminders: true,
  notifySmsWhatsapp: true,
  notifyProductUpdates: false,

  // E. Privacy & Account Metadata
  shareContactOnlyConfirmed: true,
  accountRole: 'Homeowner / Client',
  accountCreated: 'October 2026',
  authMethod: 'Email OTP (Passwordless Demo)',
  isDemoAccount: true
};

const PROFILE_STORAGE_KEY = 'vastoco_client_profile_v2';

export function getClientProfile() {
  if (typeof window === 'undefined') return { ...DEFAULT_CLIENT_PROFILE };
  try {
    const raw = sessionStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) {
      sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_CLIENT_PROFILE));
      return { ...DEFAULT_CLIENT_PROFILE };
    }
    return JSON.parse(raw);
  } catch {
    return { ...DEFAULT_CLIENT_PROFILE };
  }
}

export function saveClientProfile(profile) {
  if (typeof window === 'undefined') return profile;
  try {
    const initials = (profile.fullName || '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join('') || 'PS';
    const updated = { ...profile, avatarInitials: initials };
    sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('Could not save client profile to sessionStorage', err);
    return profile;
  }
}

export function resetClientProfile() {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_CLIENT_PROFILE));
    } catch {}
  }
  return { ...DEFAULT_CLIENT_PROFILE };
}

export function validateClientProfile(data) {
  const errors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  const cleanPhone = (data.phone || '').replace(/[\s-]/g, '');
  if (!cleanPhone || cleanPhone.length < 10) {
    errors.phone = 'Please enter a valid phone number (minimum 10 digits).';
  }

  if (!data.city || data.city.trim().length === 0) {
    errors.city = 'Please select or enter your city.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

