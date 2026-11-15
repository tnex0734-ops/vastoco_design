export const categories = [
  {
    key: 'architect',
    title: 'Architects',
    copy: 'Residential villas, layout planning, structural additions and sanction drawings.',
    icon: 'compass',
    badge: 'COA Register Check'
  },
  {
    key: 'interior',
    title: 'Interior designers',
    copy: 'Space planning, material curation, bespoke millwork and lighting design.',
    icon: 'house',
    badge: 'Identity & Portfolio Audit'
  },
  {
    key: 'vastu',
    title: 'Vastu consultants',
    copy: 'Spatial orientation, directional harmony and energy alignment for homes.',
    icon: 'layers',
    badge: 'Certification Review'
  }
];

export const durations = [15, 30, 45];

// Structured demonstration profiles following official hackathon brief guidelines
export const professionals = [
  {
    id: 'naina-kapoor',
    name: 'Naina Kapoor',
    profession: 'Architect',
    roleKey: 'architect',
    location: 'Delhi NCR',
    experienceYears: 8,
    specializations: ['Residential design', 'Renovation'],
    consultationFees: { 15: 750, 30: 1400, 45: 1950 },
    fees: { 15: 750, 30: 1400, 45: 1950 },
    feeDisplay: '₹1,400 / 30 min',
    image: '/assets/portfolio-naina-villa.webp',
    imageAlt: 'Contemporary residential villa in Delhi NCR designed by Naina Kapoor',
    portfolio: [
      {
        title: 'Modern Courtyard Villa',
        image: '/assets/portfolio-naina-villa.webp',
        source: 'Unsplash (R Architecture)'
      },
      {
        title: 'Brick Facade & Extension',
        image: '/assets/portfolio-naina-extension.webp',
        source: 'Unsplash (R Architecture)'
      }
    ],
    portfolioSamples: [
      'Modern Courtyard Villa (4,200 sq.ft)',
      'Brick Facade & Extension (DLF Phase 2)',
      'Vasant Vihar Courtyard Residence'
    ],
    verificationStatus: 'demo-only',
    reviews: null,
    reviewsNote: '0 reviews · Only verified clients who completed a video consultation may review.',
    bio: 'Specialising in climate-sensitive residential architecture, contemporary villas, and heritage renovations across Delhi NCR.',
    qualification: 'B.Arch (SPA Delhi) · Council of Architecture Register Check',
    coaRegistration: 'CA/2016/78210 (COA Register Check)',
    statusLabel: 'Illustrative demo profile'
  },
  {
    id: 'kabir-sethi',
    name: 'Kabir Sethi',
    profession: 'Architect',
    roleKey: 'architect',
    location: 'Delhi NCR',
    experienceYears: 6,
    specializations: ['Home extensions', 'Space planning'],
    consultationFees: { 15: 650, 30: 1250, 45: 1800 },
    fees: { 15: 650, 30: 1250, 45: 1800 },
    feeDisplay: '₹1,250 / 30 min',
    image: '/assets/portfolio-kabir-pavilion.webp',
    imageAlt: 'Minimalist pavilion extension in Delhi NCR designed by Kabir Sethi',
    portfolio: [
      {
        title: 'Minimalist Glass Pavilion',
        image: '/assets/portfolio-kabir-pavilion.webp',
        source: 'Unsplash (R Architecture)'
      },
      {
        title: 'Terrace Garden Studio',
        image: '/assets/portfolio-kabir-terrace.webp',
        source: 'Unsplash (R Architecture)'
      }
    ],
    portfolioSamples: [
      'Minimalist Glass Pavilion (1,800 sq.ft)',
      'Terrace Garden Studio (Hauz Khas)',
      'GK-1 Penthouse Space Reorganisation'
    ],
    verificationStatus: 'demo-only',
    reviews: null,
    reviewsNote: '0 reviews · Only verified clients who completed a video consultation may review.',
    bio: 'Dedicated to structural extensions, space optimisation, and seamless indoor-outdoor transitions for urban homes.',
    qualification: 'B.Arch (CCA Chandigarh) · Council of Architecture Register Check',
    coaRegistration: 'CA/2018/91440 (COA Register Check)',
    statusLabel: 'Illustrative demo profile'
  },
  {
    id: 'mira-khanna',
    name: 'Mira Khanna',
    profession: 'Interior Designer',
    roleKey: 'interior',
    location: 'Delhi NCR',
    experienceYears: 7,
    specializations: ['Residential interiors', 'Material selection'],
    consultationFees: { 15: 700, 30: 1350, 45: 1900 },
    fees: { 15: 700, 30: 1350, 45: 1900 },
    feeDisplay: '₹1,350 / 30 min',
    image: '/assets/portfolio-mira-living.webp',
    imageAlt: 'Curated living space interior in Delhi NCR by Mira Khanna',
    portfolio: [
      {
        title: 'Oak & Linen Living Space',
        image: '/assets/portfolio-mira-living.webp',
        source: 'Unsplash (Spacejoy)'
      },
      {
        title: 'Bespoke Joinery & Dining Suite',
        image: '/assets/portfolio-mira-joinery.webp',
        source: 'Unsplash (Spacejoy)'
      }
    ],
    portfolioSamples: [
      'Oak & Linen Living Space (Noida)',
      'Bespoke Joinery & Dining Suite (Defence Colony)',
      'Sector 15 Gurgaon Apartment Remodel'
    ],
    verificationStatus: 'demo-only',
    reviews: null,
    reviewsNote: '0 reviews · Only verified clients who completed a video consultation may review.',
    bio: 'Focusing on tactile materiality, bespoke cabinetry, and tailored lighting schemes that elevate residential dwellings.',
    qualification: 'M.Des (Interior Architecture) · Documented Practice Audit',
    coaRegistration: 'Govt. Photo ID + Degree & Portfolio Documentation Audit',
    statusLabel: 'Illustrative demo profile'
  },
  {
    id: 'dev-malhotra',
    name: 'Dev Malhotra',
    profession: 'Vastu Consultant',
    roleKey: 'vastu',
    location: 'Delhi NCR',
    experienceYears: 9,
    specializations: ['Residential spatial consultation', 'Directional harmony'],
    consultationFees: { 15: 800, 30: 1500, 45: 2100 },
    fees: { 15: 800, 30: 1500, 45: 2100 },
    feeDisplay: '₹1,500 / 30 min',
    image: '/assets/portfolio-dev-courtyard.webp',
    imageAlt: 'Courtyard light and water alignment residential layout by Dev Malhotra',
    portfolio: [
      {
        title: 'Courtyard Light & Water Axis',
        image: '/assets/portfolio-dev-courtyard.webp',
        source: 'Unsplash (R Architecture)'
      },
      {
        title: 'Panchsheel Spatial Re-alignment',
        image: '/assets/portfolio-dev-sanctuary.webp',
        source: 'Unsplash (R Architecture)'
      }
    ],
    portfolioSamples: [
      'Courtyard Light & Water Axis (Chattarpur)',
      'Panchsheel Spatial Re-alignment',
      'Sohna Road Plot Orientation Assessment'
    ],
    verificationStatus: 'demo-only',
    reviews: null,
    reviewsNote: '0 reviews · Only verified clients who completed a video consultation may review.',
    bio: 'Aligning ancient spatial principles with contemporary living, offering non-invasive structural remedies and layout audits.',
    qualification: 'Certified Vastu Shastra Consultant · Spatial Planning Audit',
    coaRegistration: 'Govt. Photo ID + Vastu Certification & Practice Review',
    statusLabel: 'Illustrative demo profile'
  }
];

// Backwards compatibility alias
export const illustrativeProfiles = professionals;
