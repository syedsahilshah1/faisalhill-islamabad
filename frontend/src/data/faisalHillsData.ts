import { ReactNode } from "react";

export interface BlockInfo {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'developed' | 'upcoming' | 'commercial_project';
  status: string;
  nocStatus: string;
  verificationDate: string;
  description: string;
  locationDetails: string;
  highlights: string[];
  totalPlots: number;
  priceRange: {
    residential: string;
    commercial: string;
  };
  masterPlanImage: string;
  heroImage: string;
  amenities: { name: string; description: string; icon: string; image?: string }[];
  faqs: { question: string; answer: string }[];
  developmentUpdates: { title: string; date: string; image: string; progress: number; text: string }[];
}

export interface PlotItem {
  title?: string;
  id: string;
  plotNumber?: string;
  blockSlug: string;
  blockName: string;
  propertyType?: 'Residential' | 'Commercial';
  category: 'Residential' | 'Commercial' | 'Apartment' | string;
  size: string;
  dimensions: string;
  price: number | null;
  priceUnit?: string;
  priceFormatted?: string;
  priceHistoryTrend?: string;
  status: 'Available' | 'Reserved' | 'Sold' | 'Coming Soon' | 'Unavailable' | string;
  facing?: 'Park Facing' | 'Corner' | 'Main Boulevard' | 'Standard' | 'Hill View' | string;
  street?: string;
  location?: string;
  mapCoords?: { x: number; y: number }; // percentage coords on interactive master map
  features?: string[];
  description?: string;
  image?: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface PaymentPlanItem {
  id: string;
  blockSlug: string;
  blockName: string;
  plotSize: string;
  category: 'Residential' | 'Commercial';
  totalPrice: number;
  downPayment: number;
  monthlyInstallment: number;
  quarterlyInstallment: number;
  possessionAmount: number;
  durationMonths: number;
  verificationDate: string;
}

export interface BlogItem {
  id: string;
  title: string;
  h1?: string;
  slug: string;
  content: string;
  summary: string;
  imageUrl: string;
  imageAlt?: string;
  author: string;
  category: string;
  readTime: string;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  keywords: string;
  primaryKeyword?: string;
  secondaryKeywords?: string;
  ogImage?: string;
  twitterImage?: string;
  focusKeyword?: string;
  faqs?: { question: string; answer: string }[];
  createdAt?: string;
  updatedAt?: string;
}


export interface SocietyStats {
  totalArea: string;
  totalBlocks: number;
  developedPercentage: number;
  nocStatus: string;
  activePlots: number;
  lastVerifiedDate: string;
}

export const societyStats: SocietyStats = {
  totalArea: "12,000+ Kanals",
  totalBlocks: 11,
  developedPercentage: 85,
  nocStatus: "RDA Approved (Rawalpindi Development Authority)",
  activePlots: 14500,
  lastVerifiedDate: "August 2026"
};
export const plotInventoryData: PlotItem[] = [
  {
    id: "plot-101",
    plotNumber: "A-125",
    blockSlug: "block-a",
    blockName: "Block A",
    category: "Residential",
    size: "10 Marla",
    dimensions: "35 x 70",
    price: 9800000,
    priceFormatted: "PKR 98 Lacs",
    priceHistoryTrend: "+8.5% in last 3 months",
    status: "Available",
    facing: "Park Facing",
    mapCoords: { x: 38, y: 42 },
    features: [
      "Corner Plot",
      "Fronting 12-Kanal Park",
      "Underground Electricity",
      "Immediate Possession"
    ],
    description: "Prime 10 Marla residential plot directly facing Sector A central park. Ideal for modern villa construction.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-102",
    plotNumber: "FJ-402",
    blockSlug: "faisal-jewels",
    blockName: "Faisal Jewels",
    category: "Apartment",
    size: "2-Bed Luxury Flat",
    dimensions: "1,150 Sq Ft",
    price: 13500000,
    priceFormatted: "PKR 1.35 Crore",
    priceHistoryTrend: "+15.4% high demand",
    status: "Available",
    facing: "Hill View",
    mapCoords: { x: 15, y: 22 },
    features: [
      "26th Floor Sky View",
      "Serviced Hotel Suite",
      "Revolving Restaurant Access",
      "High Rental Yield"
    ],
    description: "Luxury 2-Bedroom Serviced Apartment on the 14th floor of iconic Faisal Jewels Tower with Margalla views.",
    image: "/images/faisal-jewel-tower.webp"
  },
  {
    id: "plot-103",
    plotNumber: "A-204",
    blockSlug: "block-a",
    blockName: "Block A",
    category: "Residential",
    size: "5 Marla",
    dimensions: "25 x 50",
    price: 5600000,
    priceFormatted: "PKR 56 Lacs",
    priceHistoryTrend: "+11.2% in last 6 months",
    status: "Available",
    facing: "Main Boulevard",
    mapCoords: { x: 42, y: 46 },
    features: [
      "Fronting 60ft Boulevard",
      "Solid Land Ground",
      "Close to Jamia Mosque"
    ],
    description: "Highly demanded 5 Marla plot situated on 60ft road near Mosque & Commercial Market.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-104",
    plotNumber: "EXE-048",
    blockSlug: "executive-block",
    blockName: "Executive Block",
    category: "Residential",
    size: "1 Kanal",
    dimensions: "50 x 90",
    price: 18500000,
    priceFormatted: "PKR 1.85 Crore",
    priceHistoryTrend: "+14% high demand",
    status: "Available",
    facing: "Corner",
    mapCoords: { x: 18, y: 28 },
    features: [
      "Double Side Corner",
      "225ft Boulevard Proximity",
      "Executive Club View"
    ],
    description: "Luxurious 1 Kanal Corner Plot near GT Road Entrance Gate.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-105",
    plotNumber: "FJ-709",
    blockSlug: "faisal-jewels",
    blockName: "Faisal Jewels",
    category: "Apartment",
    size: "1-Bed Executive Suite",
    dimensions: "650 Sq Ft",
    price: 8500000,
    priceFormatted: "PKR 85 Lacs",
    priceHistoryTrend: "+12.8% pre-launch ROI",
    status: "Available",
    facing: "Main Boulevard",
    mapCoords: { x: 16, y: 24 },
    features: [
      "Smart Automation Suite",
      "Furnished Interior Option",
      "Infinity Pool Access"
    ],
    description: "Executive 1-Bedroom Apartment in Faisal Jewels Tower. Perfect for rental returns and luxury living.",
    image: "/images/faisal-jewel-tower.webp"
  },
  {
    id: "plot-106",
    plotNumber: "EXE-112",
    blockSlug: "executive-block",
    blockName: "Executive Block",
    category: "Commercial",
    size: "4 Marla Plaza Plot",
    dimensions: "30 x 30",
    price: 32000000,
    priceFormatted: "PKR 3.2 Crore",
    priceHistoryTrend: "+18% commercial yield",
    status: "Available",
    facing: "Main Boulevard",
    mapCoords: { x: 22, y: 32 },
    features: [
      "Ground + 5 Approval",
      "225ft Main GT Entrance Road",
      "Ideal for Bank Plaza"
    ],
    description: "Hot commercial plot on Executive Main Boulevard.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-107",
    plotNumber: "B-089",
    blockSlug: "block-b",
    blockName: "Block B",
    category: "Residential",
    size: "10 Marla",
    dimensions: "35 x 70",
    price: 8400000,
    priceFormatted: "PKR 84 Lacs",
    priceHistoryTrend: "+6.8% stable",
    status: "Available",
    facing: "Hill View",
    mapCoords: { x: 58, y: 30 },
    features: [
      "Margalla Mountain Backdrop",
      "Quiet Cul-de-Sac Street",
      "Full Utilities"
    ],
    description: "Scenic 10 Marla hill-view plot in elevated Block B.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-108",
    plotNumber: "PR-014",
    blockSlug: "prime-block",
    blockName: "Prime Block",
    category: "Residential",
    size: "1 Kanal Villa Plot",
    dimensions: "50 x 90",
    price: 24500000,
    priceFormatted: "PKR 2.45 Crore",
    priceHistoryTrend: "+21% prestige demand",
    status: "Available",
    facing: "Hill View",
    mapCoords: { x: 74, y: 22 },
    features: [
      "Private Gated Sector",
      "Exclusive Height Elevation",
      "Underground Fiber Optics"
    ],
    description: "Ultra-luxury 1 Kanal plot in VIP Prime Block with Margalla panorama.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
  }
];

export const blocksData: BlockInfo[] = [
  {
    id: "prime-block",
    slug: "prime-block",
    name: "Prime Block",
    subtitle: "Exclusive Luxury Villa Enclave with Panoramic Margalla Ridge Views",
    category: "developed",
    status: "Under Development",
    nocStatus: "RDA Approved",
    verificationDate: "August 2026",
    description: "Faisal Hills Prime Block is an exclusive luxury sector perched on the highest crest of the society with panoramic Margalla Ridge vistas, private gated biometrics, luxury country club facilities, and premium residential estate plots.",
    locationDetails: "Situated on the highest crest of Faisal Hills with uninterrupted views of the Margalla Hills range.",
    highlights: [
      "VIP Enclave with Gated Entry & Biometrics",
      "Highest Elevation Crest with Panoramic Margalla Ridge Views",
      "1 Kanal & 2 Kanal Premium Villa Plots",
      "Exclusive Country Club & Golf Putting Green Access"
    ],
    totalPlots: 1200,
    priceRange: {
      residential: "PKR 95 Lacs - 3.2 Crore",
      commercial: "PKR 3.5 Crore - 12 Crore"
    },
    heroImage: "/images/faisal-hills-drone-view.webp",
    masterPlanImage: "/images/faisal-hills-master-plan-map-opt.webp",
    amenities: [
      { name: "Private Security Patrol", description: "Dedicated rapid response security unit and thermal cameras", icon: "ShieldCheck", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=75" },
      { name: "Clubhouse & Infinity Pool", description: "5-Star standard country club with heated indoor pool", icon: "Sparkles", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=75" },
      { name: "Heliport Access", description: "Emergency medical helipad facility", icon: "Compass", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=75" }
    ],
    faqs: [
      { question: "Is Faisal Hills Prime Block RDA approved?", answer: "Yes. Faisal Hills holds approval from the Rawalpindi Development Authority (RDA). Always confirm the current NOC status directly with RDA or through an authorized property consultant before purchasing." },
      { question: "Who is the developer of Faisal Hills Prime Block?", answer: "The project is developed by Zedem International, operating under the Faisal Town Group — the same group behind Faisal Town Phase 1, Faisal Jewel, and Multi Gardens B-17." },
      { question: "What plot sizes are available in Faisal Hills Prime Block?", answer: "Residential plots are available in 5 Marla, 10 Marla, and 1 Kanal sizes. Commercial plots are also available along main arteries within the sector." },
      { question: "What is the payment plan for Faisal Hills Prime Block?", answer: "The payment plan typically requires a 20% down payment at booking, with the remaining balance spread over 36 monthly installments. Exact pricing and plan details should be confirmed with the official sales office." },
      { question: "How far is Faisal Hills Prime Block from Islamabad?", answer: "The society is located on Main GT Road, making it approximately 35–45 minutes from central Islamabad, depending on traffic and the route taken." },
      { question: "Is Faisal Hills Prime Block a good investment?", answer: "For buyers seeking a legally approved, developer-backed project near Islamabad with flexible payment terms and visible on-ground development, the Prime Block represents a strong investment opportunity. Like all real estate, outcomes depend on market conditions and timing." },
      { question: "Can overseas Pakistanis buy plots in Faisal Hills Prime Block?", answer: "Yes. Overseas Pakistanis can purchase plots in Faisal Hills Prime Block. The installment plan structure is particularly convenient for NRPs managing finances from abroad." }
    ],
    developmentUpdates: [
      { title: "Country Club Structure", date: "August 2026", image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80", progress: 80, text: "Roof slab poured for Prime Country Club." }
    ]
  },
  {
    id: "executive-block",
    slug: "executive-block",
    name: "Executive Block",
    subtitle: "Prestigious Gateway Sector with Faisal Jewel & Grand Boulevards",
    category: "developed",
    status: "Possession Ready",
    nocStatus: "RDA Approved & Clear",
    verificationDate: "August 2026",
    description: "Faisal Hills Executive Block is the society's premier gateway sector located directly at the Main N-5 GT Road entrance. Featuring 225ft grand boulevards, Roots International School, Civic Center, and the iconic 27-storey Faisal Jewel high-rise.",
    locationDetails: "Located directly at the Main Entrance Gate on N-5 National Highway, 5 minutes from Taxila Bypass and 12 minutes from CPEC Interchange.",
    highlights: [
      "Main GT Road Entrance & 225ft Boulevard Roadways",
      "Civic Center Commercial Hub with Faisal Jewel High-Rise",
      "Roots International School Campus (Fully Operational)",
      "Immediate Home Construction & Possession-Ready Plots"
    ],
    totalPlots: 2400,
    priceRange: {
      residential: "PKR 65 Lacs - 1.85 Crore",
      commercial: "PKR 2.2 Crore - 8.5 Crore"
    },
    heroImage: "/images/faisal-hills-executive-block.webp",
    masterPlanImage: "/images/faisal-hills-executive-map.webp",
    amenities: [
      { name: "Grand Entrance Monument", description: "State-of-the-art guarded entry portal with 24/7 biometric surveillance", icon: "Shield", image: "/images/faisal-hills-arc-gate.webp" },
      { name: "Roots International School", description: "Operational campus providing world-class international curriculum on-ground", icon: "GraduationCap", image: "/images/roots-international-school-faisal-hills.webp" },
      { name: "Central Park & Family Enclave", description: "12-Kanal lush green park with dedicated sports courts and tracks", icon: "Trees", image: "/images/faisal-hills-glow-park.webp" },
      { name: "Jamia Masjid Fatima Tuz Zahra", description: "Grand architectural mosque for daily and Friday congregational prayers", icon: "Building", image: "/images/faisal-hills-jamia-mosque.webp" }
    ],
    faqs: [
      { question: "Is Faisal Hills Executive Block in Islamabad or Rawalpindi?", answer: "Faisal Hills sits on the main GT Road, just a few minutes from B-17 Islamabad, but it technically falls under the jurisdiction of the Rawalpindi Development Authority (RDA)." },
      { question: "Is the Faisal Hills Executive Block NOC approved?", answer: "Yes. The Executive Block has NOC approval from the RDA, meaning the development complies with regional housing regulations as an RDA approved housing society. We'd still recommend confirming the latest status directly with RDA before making a purchase." },
      { question: "What plot sizes are available for sale in Faisal Hills Executive Block?", answer: "Residential plots come in 5, 8, 10 and 14 Marla, plus 1 Kanal. Commercial plots are available in sizes ranging from 30×25 up to 65×50." },
      { question: "What is the current Faisal Hills Executive Block payment plan?", answer: "Terms vary by sector — some plots are sold on a resale, full-cash basis, while others may be available under an instalment plan with a down payment and quarterly payments, sometimes with a discount for lump-sum payment. Contact our team for the latest details on a specific plot." },
      { question: "What is the development status of Faisal Hills Executive Block?", answer: "The main boulevard, roads, sewerage and underground electricity are largely complete. Roots International School is operational, and construction on the Faisal Jewel project is progressing steadily." },
      { question: "Is Faisal Hills Executive Block a good investment?", answer: "Its GT Road location, RDA approval and ongoing development make it an appealing option for both end-users and investors — though, as with any real estate investment, returns aren't guaranteed and depend on market conditions." },
      { question: "Where can I find the Faisal Hills Executive Block map?", answer: "You can request the latest master plan and zoning map directly from our team — we can also point out which sectors are closest to GT Road and which are quieter residential pockets." }
    ],
    developmentUpdates: [
      { title: "Underground Electric Grid & Sector Utilities", date: "August 2026", image: "/images/faisal-hills-drone-view.webp", progress: 100, text: "100% underground cable laying completed and connected to the main feeder line." },
      { title: "225ft Main Boulevard & Commercial Asphalt", date: "July 2026", image: "/images/faisal-hills-aerial-panoramic.webp", progress: 95, text: "Final carpet asphalt applied on Executive Commercial Boulevard." }
    ]
  },
  {
    id: "block-a",
    slug: "block-a",
    name: "Block A",
    subtitle: "Fully Developed & Populated Community Sector",
    category: "developed",
    status: "Fully Developed & Populated",
    nocStatus: "RDA Approved",
    verificationDate: "August 2026",
    description: "Faisal Hills Block A is the most mature, fully populated sector of the society. Featuring an operational 3,000-capacity Grand Jamia Mosque, commercial banks, retail markets, immediate possession, and thriving residential neighborhoods.",
    locationDetails: "Adjoining Executive Block, connected via the 150ft Central Avenue.",
    highlights: [
      "RDA-Approved & Fully Populated Neighborhood",
      "Immediate Plot Possession & Home Construction",
      "Grand Jamia Mosque with 3,000 Worshipper Capacity",
      "Central Commercial Banks, Markets & Educational Facilities"
    ],
    totalPlots: 3100,
    priceRange: {
      residential: "PKR 55 Lacs - 1.6 Crore",
      commercial: "PKR 1.8 Crore - 6.5 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    masterPlanImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      { name: "Grand Jamia Mosque", description: "Islamic architecture landmark hosting daily & Friday congregational prayers", icon: "Landmark", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=75" },
      { name: "Commercial Hub", description: "Supermarkets, pharmacies, cafes, and branch offices", icon: "ShoppingBag", image: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=600&q=75" },
      { name: "Faisal Hills School Campus", description: "Modern educational institute with STEM labs & play area", icon: "GraduationCap", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=75" }
    ],
    faqs: [
      { question: "Is Faisal Hills Block A RDA approved?", answer: "Yes. Block A falls within Faisal Hills' RDA-approved area, meaning it has cleared the Rawalpindi Development Authority's regulatory review. Always verify current NOC documentation directly with RDA or the developer before making payment." },
      { question: "Where exactly is Faisal Hills Block A located?", answer: "Block A is part of Faisal Hills, located near GT Road (N-5) close to Taxila, with convenient access to the M-1 Motorway and a drive of roughly 30 to 40 minutes into central Islamabad or Rawalpindi." },
      { question: "What plot sizes are available in Block A?", answer: "Residential plots range from 5 Marla up to 2 Kanal, including 8 Marla and 14 Marla options. Commercial plots range from roughly 9.6 Marla up to 2 Kanal." },
      { question: "What is the price of a 5 Marla plot in Block A?", answer: "A 5 Marla plot generally falls between PKR 55 Lakh and 80 Lakh, depending on the exact location within the block. Confirm current pricing directly, as rates shift over time." },
      { question: "What is the price of a 10 Marla plot in Block A?", answer: "10 Marla plots typically range from around PKR 95 Lakh to 1.30 Crore, again depending on plot positioning." },
      { question: "What is the price of a 1 Kanal plot in Block A?", answer: "A 1 Kanal plot generally runs between PKR 1.45 Crore and 2.25 Crore." },
      { question: "Is Block A fully developed and ready for possession?", answer: "Main roads and utilities in much of Block A are functional, and homes are already built or under construction in several areas. Commercial sections and some community facilities like the hospital and certain mosques are still being completed. It's a working, livable block, but not yet fully finished." },
      { question: "Does Block A offer installment payment plans, or is it cash-only?", answer: "Payment terms vary by phase and plot and have changed over time. Some plots are available on full cash payment, while others may offer structured installment options. Confirm the current terms directly with the sales office for the specific plot you're interested in." },
      { question: "What documents do I need to book a plot, especially as an overseas Pakistani?", answer: "You'll typically need a CNIC or NICOP (for overseas applicants), your next of kin's CNIC copy, and passport-sized photographs. Overseas buyers often use a power of attorney for in-person steps, though it's worth confirming with the sales office what remote booking options are currently available." },
      { question: "How does Block A compare to other Faisal Hills blocks?", answer: "Block A sits in the middle of the range — more plot variety and visible development progress than some newer blocks, with a GT Road-adjacent location that appeals to buyers who want connectivity to Taxila and Wah Cantt as well as Islamabad. Other blocks may suit you better depending on budget and how central to Islamabad you want to be." }
    ],
    developmentUpdates: [
      { title: "Grand Mosque Phase II Expansion", date: "August 2026", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80", progress: 90, text: "Finishing marble work on the outer courtyard." }
    ]
  },
  {
    id: "block-b",
    slug: "block-b",
    name: "Block B",
    subtitle: "",
    category: "developed",
    status: "Possession Available",
    nocStatus: "RDA Approved",
    verificationDate: "August 2026",
    description: "Faisal Hills B Block occupies a central sector of the society, situated between Block A and Block C along the 225ft Grand Boulevard. Built on elevated ground, B Block provides clean hill views of Margalla and Kala Chitta mountains, dedicated sports complexes, and excellent residential value.",
    locationDetails: "Situated on the elevated northern contour of Faisal Hills, accessible via 100ft Sector Road.",
    highlights: [
      "Central Position on 225ft Grand Boulevard",
      "Elevated Contour with Margalla & Kala Chitta Hill Views",
      "10 Sector Parks, Mosque, & Dedicated Sports Complex",
      "Close Proximity to Central Gate and Mature Block A Utilities"
    ],
    totalPlots: 2800,
    priceRange: {
      residential: "PKR 50 Lacs - 1.45 Crore",
      commercial: "PKR 1.5 Crore - 4.8 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    masterPlanImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      { name: "Hilltop Promenade Park", description: "Elevated park with sunset viewing deck", icon: "Trees", image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=75" },
      { name: "Sports Complex", description: "Futsal ground, tennis courts, and basketball arena", icon: "Activity", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=75" }
    ],
    faqs: [
      { question: "Is Faisal Hills B Block RDA approved?", answer: "Yes. Faisal Hills Islamabad B Block falls under the society's RDA-approved area, covering roughly 11,823 kanals of land. Always confirm current NOC documentation directly with the developer or RDA before making any payment." },
      { question: "Where exactly is Faisal Hills B Block located?", answer: "Block B sits between Block A and Block C, directly on the 225-foot Grand Boulevard, with close access to GT Road, Taxila, and the M-1 Motorway. It's roughly 30 to 40 minutes from Islamabad and Rawalpindi by car." },
      { question: "What plot sizes are available in Block B?", answer: "Residential plots range from 5 Marla up to 2 Kanal, including 8 Marla and 14 Marla options. Commercial plots come in four standard sizes, from 90×84 up to 220×229." },
      { question: "What is the price of a 5 Marla plot in Faisal Hills Block B?", answer: "A 5 Marla plot currently falls between roughly PKR 35 Lakh and 70 Lakh, depending on its exact location within the block. Confirm current pricing directly, since rates shift over time." },
      { question: "What is the price of a 10 Marla plot in Block B?", answer: "10 Marla plots typically range from around PKR 75 Lakh to 1.25 Crore." },
      { question: "What is the price of a 1 Kanal plot in Block B?", answer: "A 1 Kanal plot generally runs between PKR 1.15 Crore and 1.85 Crore." },
      { question: "Does Faisal Hills Block B offer a payment plan, or is it cash-only?", answer: "Most current Block B inventory is resale, and many of these transactions are full cash. Installment availability depends on the specific plot and seller, so confirm directly with the sales office before assuming either option." },
      { question: "Is Block B fully developed and ready for possession?", answer: "Main roads, the boulevard, and core utilities are functional, and many owners have already taken possession and started building. Commercial zones and some community facilities like the sports complex and theme park are still under construction." },
      { question: "What documents do I need to book a plot, especially as an overseas Pakistani?", answer: "You'll typically need CNIC or NICOP copies (for overseas applicants), your next of kin's CNIC copies, passport-sized photographs, and proof of payment. Many overseas buyers use a power of attorney for in-person steps, though it's worth checking what remote options are available for your specific transaction." },
      { question: "How does Block B compare to other Faisal Hills blocks?", answer: "Block B is the largest block in the society and holds a central position between Block A and Block C on the main boulevard, which gives it strong connectivity and some commercial appeal. Other blocks, like the Executive Block or Prime Block, may suit you better if a more premium, centrally developed setting is the priority." }
    ],
    developmentUpdates: [
      { title: "Sector Park Landscape & Fencing", date: "July 2026", image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80", progress: 85, text: "Lawn grass and walking track work finished." }
    ]
  },
  {
    id: "block-b1-extension",
    slug: "block-b1-extension",
    name: "Block B1 Extension",
    subtitle: "High-Growth Investment & Modern Living Sector",
    category: "upcoming",
    status: "Development 90% Complete",
    nocStatus: "RDA Approved",
    verificationDate: "August 2026",
    description: "Faisal Hills B Extension bridges the gap between Block B and D, offering the most affordable entry-level residential plots in the society. Designed as a quiet residential zone with active levelling and road work, it represents a high ROI investment opportunity with low entry rates.",
    locationDetails: "Directly adjacent to Block B with seamless road connectivity.",
    highlights: [
      "Lowest Plot Entry Price inside Faisal Hills",
      "Modern Grid Streets and Compact 650-Home Layout",
      "Highly Affordable 5, 8, & 10 Marla Residential Plots",
      "High Appreciation Potential near D Block & Motorway Link"
    ],
    totalPlots: 1600,
    priceRange: {
      residential: "PKR 42 Lacs - 1.25 Crore",
      commercial: "PKR 1.2 Crore - 3.5 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    masterPlanImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      { name: "Green Belts", description: "Lush tree-lined streets for aesthetic pollution-free living", icon: "Trees", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=75" }
    ],
    faqs: [
      { question: "Where is Faisal Hills B Extension located and how do I reach it?", answer: "It sits inside the wider Faisal Hills scheme on the GT Road (N-5) near the Taxila Bypass, between Rawalpindi and Taxila. The block lies internally beside Block B, with Block A, Block D and the Prime Block nearby. Entry is through the main society gate off the highway. Sector B-17 is close to the east, and the M-1 Motorway runs along the western side of the scheme." },
      { question: "Is this block RDA approved and legally safe to buy?", answer: "Yes. The society holds a No Objection Certificate from the Rawalpindi Development Authority covering roughly 11,823.5 kanals, and this block falls inside the approved layout. NOC status decides whether you can legally build, transfer and resell without trouble. Verify the current position directly with the RDA before paying, since approvals can be amended over time." },
      { question: "What plot sizes are available here?", answer: "Residential options are 5, 8 and 10 marla, with 5 marla making up the largest share of supply. Commercial units come in two formats, 4.8 marla at 30 by 40 feet and 7.2 marla at 40 by 45 feet, totalling around 34 across the block. Larger categories such as 1 kanal are not offered in this pocket." },
      { question: "What is the current price of a 5 marla and 10 marla plot?", answer: "A 5 marla plot typically ranges from about 50 to 60 lac, while 10 marla generally sits between 1 crore and 1.2 crore. Corner, park-facing and main-road units add roughly ten to fifteen percent. These are indicative ranges only, since rates move whenever a development milestone lands, so confirm live figures before committing funds." },
      { question: "Can I buy on instalments or is it cash only?", answer: "Both have been offered at different times. Instalment plans here have featured a down payment with quarterly payments over about four years, while much of the residential inventory society-wide has recently sold on full cash, with instalments concentrated in commercial units. It depends entirely on current stock, so request the applicable schedule in writing." },
      { question: "Has possession started in this block?", answer: "Not generally. The block remains at an earlier stage, with levelling and demarcation complete and road and utility work in progress. Handover is already available in the Executive Block, Block A and developed sectors of Blocks B, C and D. If you need to build immediately, pick a block where possession is confirmed for your specific sector." },
      { question: "Is it a better investment than Block C or Block D?", answer: "It depends on your timeline. This extension offers the lowest entry price and the longest runway, which suits patient buyers. Block D already has handover in developed sectors and suits immediate construction. Block C sits closest to the motorway and is positioned for long-term connectivity gains. Cheapest is not automatically best; match the block to your holding period." },
      { question: "Can overseas Pakistanis in the UK USA or Dubai buy a plot here?", answer: "Yes. Overseas buyers can purchase on NICOP or passport documentation and complete the process remotely. A registered power of attorney, attested at the Pakistani mission in your country, simplifies transfer and handover later. Send funds only through formal banking channels by pay order or demand draft in the developer name, and verify both plot and seller independently before paying." }
    ],
    developmentUpdates: [
      { title: "Sewerage Pipe Network", date: "August 2026", image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80", progress: 92, text: "Main sewerage line connection completed." }
    ]
  },
  {
    id: "block-c",
    slug: "block-c",
    name: "Block C",
    subtitle: "Luxury Sector Adjacent to Hills Walk & Central Water Features",
    category: "developed",
    status: "Possession Ready",
    nocStatus: "RDA Approved",
    verificationDate: "August 2026",
    description: "Faisal Hills Block C is a premium, RDA-approved sector bordering Block B and New City Phase 2. Positioned close to the M-1 Motorway corridor, it delivers exceptional long-term capital appreciation potential, water filtration plants, and scenic hill vistas near the Hills Walk commercial zone.",
    locationDetails: "Bordering the central Hills Walk stream and main sector spine.",
    highlights: [
      "Strategic Proximity to M-1 Motorway Access Corridor",
      "Borders New City Phase 2 & central Hills Walk Promenade",
      "Active RO Water Filtration Plant & Finished Utilities",
      "Premium 10 Marla & 1 Kanal Hillside Plots"
    ],
    totalPlots: 2600,
    priceRange: {
      residential: "PKR 48 Lacs - 1.75 Crore",
      commercial: "PKR 1.6 Crore - 5.5 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    masterPlanImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      { name: "Water Filtration Plant", description: "RO water plant providing clean mineral drinking water", icon: "Droplets", image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=75" },
      { name: "Hills Walk Plaza Access", description: "Direct walkway into high-end cafes and retail shops", icon: "ShoppingBag", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=75" }
    ],
    faqs: [
      { question: "Where is Faisal Hills Block C located?", answer: "Block C is located on the main GT Road, between Faisal Hills Block B and New City Phase 2, near Taxila and within a comfortable drive of Islamabad." },
      { question: "Is Faisal Hills Block C NOC approved?", answer: "Yes, Faisal Hills holds an RDA-issued No Objection Certificate covering the project, including Block C. Because approvals can be updated as phases progress, it's wise to confirm current status with RDA or the developer before booking." },
      { question: "What are the residential plot sizes available in Block C?", answer: "Residential plots in Block C range from 5 Marla up to 1 Kanal, including 5, 8, 10, and 14 Marla options, giving buyers flexibility based on family size and budget." },
      { question: "What is the price of a 10 Marla plot in Faisal Hills Block C?", answer: "As of the latest pricing, a 10 Marla plot in Block C generally falls between roughly PKR 1.20 Crore and 1.40 Crore, though this depends on the plot's exact location and current market activity." },
      { question: "What is the price of a 1 Kanal plot in Block C?", answer: "A 1 Kanal plot in Block C is typically priced between PKR 1.80 Crore and 2.0 Crore, with boulevard-facing plots usually commanding the higher end of that range." },
      { question: "Are resale plots available in Faisal Hills Block C?", answer: "Yes, resale plots are commonly available in Block C. Pricing depends on location within the block, how much of the original payment plan has been paid, and current demand — always verify the allotment and transfer documents before paying." },
      { question: "What is the Faisal Hills Block C payment plan?", answer: "Block C is generally offered on a multi-year installment plan comprising a down payment, quarterly installments, and a possession-linked payment. Exact terms vary by booking date, so confirm the current plan with the sales office." },
      { question: "Is Faisal Hills Block C a good investment?", answer: "Given its GT Road frontage, RDA approval, visible development progress, and mix of residential and commercial plots, Block C is considered a strong mid-to-long-term investment opportunity, though outcomes depend on continued development and market conditions." },
      { question: "How can I view the Faisal Hills Block C map?", answer: "An interactive map of Block C, showing its position relative to Block B, Block D, and New City Phase 2, is available on this page. Ask your sales representative for the latest approved layout map before finalizing a plot." }
    ],
    developmentUpdates: [
      { title: "Filtration Plant Upgrade", date: "August 2026", image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80", progress: 100, text: "High-capacity RO filtration unit active." }
    ]
  },
  {
    id: "block-d",
    slug: "block-d",
    name: "Block D",
    subtitle: "Tranquil Residential Sanctuary & Serene Suburban Living",
    category: "developed",
    status: "Development 85% Complete",
    nocStatus: "RDA Approved",
    verificationDate: "August 2026",
    description: "Faisal Hills Block D is a tranquil suburban sector situated on the western wing next to Block C. Designed around lush green topography and open landscapes, Block D offers fresh plot inventory at entry-level prices with high appreciation upside near the proposed medical complex.",
    locationDetails: "Located on the western wing of Faisal Hills society.",
    highlights: [
      "Quiet Western Wing Suburban Layout",
      "Fresh Plot Inventory with Easy Installment Potential",
      "Lush Parks, Green Belts, & Proposed Medical Complex Site",
      "Wide 50ft Internal Sector Road Grid"
    ],
    totalPlots: 2100,
    priceRange: {
      residential: "PKR 40 Lacs - 1.35 Crore",
      commercial: "PKR 1.1 Crore - 3.8 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    masterPlanImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      { name: "Sector D Community Center", description: "Event space for family gatherings and celebrations", icon: "Building", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=75" }
    ],
    faqs: [
      { question: "Where exactly is Faisal Hills D Block located?", answer: "D Block sits within the Faisal Hills scheme on the GT Road corridor between Tarnol and Taxila, with M-1 Motorway access via the Brahma Jhang Bahtar Interchange. Taxila, Wah and the outer Rawalpindi–Islamabad belt are the surrounding areas." },
      { question: "What are the current Faisal Hills D Block plot prices?", answer: "Current rates for 5, 8, 10, 14 Marla and 1 Kanal are listed in the price table above, last verified August 2026. Contact us for a written, itemised quote on a specific plot, since corner and boulevard positions carry surcharges." },
      { question: "What plot sizes are available in D Block?", answer: "Residential plots come in 5 Marla, 8 Marla, 10 Marla, 14 Marla and 1 Kanal. Commercial plots are available in standard developer sizes." },
      { question: "Can I buy a plot on instalments?", answer: "Yes. The payment plan runs on a down payment followed by quarterly instalments over a defined period. Full details are in the payment plan section above." },
      { question: "What is the down payment for a D Block plot?", answer: "Down payment typically ranges between 10% to 20% depending on the plot size. Confirm the exact figure for your chosen size before booking, as it varies by category." },
      { question: "Is Faisal Hills D Block a good investment?", answer: "It has genuine location strengths — dual access via GT Road and the M-1 — and a mix of end-user and investor demand. Returns depend on development progressing on schedule, so verify the current on-ground status and the regulatory position independently before committing. We do not publish projected ROI figures because no one can reliably predict them." },
      { question: "What is the development status of D Block?", answer: "Development is roughly 85% complete. Ground levelling is finished, road paving is well underway, and utility conduit trenching is active. We recommend a site visit rather than relying on any published description, including ours." },
      { question: "When will possession be handed over?", answer: "Possession timeline is officially slated for early phases, with remaining plots receiving possession as the final developmental work wraps up." },
      { question: "Is D Block approved?", answer: "Yes, it is NOC approved by the Rawalpindi Development Authority (RDA) under the Faisal Hills master plan. We encourage every buyer to verify this directly with the authority." },
      { question: "How does D Block compare to Block C or Block B?", answer: "Blocks differ in development stage, pricing and position within the scheme. See our dedicated Block C and Block B pages, or tell us your budget and timeline and we will lay out the trade-offs." },
      { question: "Are there commercial plots in D Block?", answer: "Yes. Availability changes frequently — contact us for the current position." },
      { question: "Can overseas Pakistanis buy in D Block?", answer: "Yes. Remote booking, bank transfers, and NICOP options are supported for overseas buyers." }
    ],
    developmentUpdates: [
      { title: "Main Street LED Lighting", date: "July 2026", image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80", progress: 95, text: "Energy-efficient LED streetlights installed." }
    ]
  },
  {
    id: "hills-walk",
    slug: "hills-walk",
    name: "Hills Walk",
    subtitle: "The Boulevard of Luxury Retail, Cafes & Fine Dining",
    category: "commercial_project",
    status: "Under Construction High-Rise Commercial Zone",
    nocStatus: "RDA Approved Commercial Complex",
    verificationDate: "August 2026",
    description: "Hills Walk is Faisal Hills' signature commercial destination. Designed as a European-style open-air pedestrian promenade lined with luxury brands, rooftop restaurants, banks, and corporate towers.",
    locationDetails: "Centrally positioned between Block A, Block B, and Block C.",
    highlights: [
      "European Style Pedestrian Promenade",
      "Rooftop Dining with Margalla Panoramic View",
      "Multi-story Parking Structure",
      "High Rental Yield for Investors"
    ],
    totalPlots: 450,
    priceRange: {
      residential: "N/A (Commercial & Executive Suites)",
      commercial: "PKR 2.5 Crore - 15 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80",
    masterPlanImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      { name: "Open-Air Amphitheater", description: "Community events, live music, and outdoor cinema screen", icon: "Tv", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=75" },
      { name: "Valet Parking Plaza", description: "500+ car basement parking with smart guidance", icon: "Car", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=75" }
    ],
    faqs: [
      { question: "What is the expected rental yield in Hills Walk?", answer: "Estimated annual rental returns are projected at 9% - 12% due to high footfall." }
    ],
    developmentUpdates: [
      { title: "Plaza 3 Structure Completed", date: "August 2026", image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80", progress: 75, text: "4th-floor grey structure complete." }
    ]
  },
  {
    id: "faisal-jewels",
    slug: "faisal-jewel-islamabad",
    name: "Faisal Jewel",
    subtitle: "Iconic 27-Story Ultra-Luxury High-Rise & Commercial Skyscraper",
    category: "commercial_project",
    status: "Rapid Structural Construction Phase",
    nocStatus: "RDA Approved High-Rise Tower",
    verificationDate: "August 2026",
    description: "Faisal Jewel Islamabad is a landmark 27-story mixed-use skyscraper offering luxury apartments and commercial shops in Faisal Hills. Rising above the junction of GT Road and the M-1 Motorway, this iconic high-rise features premium residences, retail shops, and a 4-star hotel.",
    locationDetails: "Crossroads of Margalla Avenue, N-5 GT Road & M1 Motorway Interchange at Faisal Hills Main Boulevard Entrance.",
    highlights: [
      "27-Storey Iconic Landmark Architecture",
      "6 Commercial Floors + 18 Residential Floors + 3 Basement Parking Levels",
      "350 Commercial Shops & 250 Luxury Serviced Apartments",
      "1,000+ Vehicle Multi-Level Underground Parking Plaza",
      "ZEDEM Properties x CAM Construction Joint Venture",
      "Completion Target: Q4 2027 • Starting Price: PKR 580,000"
    ],
    totalPlots: 600,
    priceRange: {
      residential: "Starting PKR 5.8 Lacs (Installments) • 1,295 Sq. Ft. Suite",
      commercial: "PKR 1.8 Crore - 18 Crore (350 Shops)"
    },
    heroImage: "/faisal-jewel-building.webp",
    masterPlanImage: "/faisal-jewel-map.png",
    amenities: [
      { name: "Swimming Pool & Fitness Center", description: "Heated indoor swimming pool, gym, sauna & health club on 22nd floor", icon: "Waves", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=75" },
      { name: "Fitness Center & Sauna", description: "State-of-the-art gym, cardio area, & sauna bath facilities", icon: "Activity", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=75" },
      { name: "Security Surveillance & Biometrics", description: "24/7 CCTV monitoring, biometric access control & smart security doors", icon: "ShieldCheck", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=75" },
      { name: "Gaming Room & Entertainment Zone", description: "Virtual sports, bowling alley, and resident gaming lounge", icon: "Tv", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=75" },
      { name: "Retail Outlets & Food Court", description: "350 luxury retail brand shops & multi-cuisine international food court", icon: "ShoppingBag", image: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=600&q=75" },
      { name: "3-Basement Parking Plaza", description: "1,000+ car automated valet parking with EV fast charging stations", icon: "Car", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=75" },
      { name: "Rooftop Sky Lounge & Fine Dining", description: "360-degree glass revolving restaurant & sky deck facing Margalla Hills", icon: "Utensils", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=75" },
      { name: "Cafés & Business Center", description: "Artisan coffee shops, executive meeting rooms & high-speed Wi-Fi lounge", icon: "Sparkles", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=75" }
    ],
    faqs: [
      { question: "What is Faisal Jewel Islamabad?", answer: "Faisal Jewel Islamabad is a 27-storey mixed-use high-rise development located in Faisal Hills, at the intersection of Margalla Avenue, GT Road, and the M1 Motorway. The project includes 250 luxury residential apartments, 350+ commercial shops, 3 basement parking levels with 1,000+ spaces, and a 4-star hotel. It is being developed by Zedem Properties Pvt. Ltd. and CAM Construction, with a projected completion of Q4 2027." },
      { question: "Where is Faisal Jewel located?", answer: "Faisal Jewel is located in Faisal Hills, Rawalpindi/Islamabad, at the strategic crossroads of Margalla Avenue, the Grand Trunk (GT) Road, and the M1 Motorway. The site is approximately 30–35 minutes from Islamabad International Airport and provides easy access to key areas including Blue Area Islamabad, Sector F-10, Taxila City, Wah Cantt, and HiTech University." },
      { question: "What is the starting price of apartments in Faisal Jewel?", answer: "Apartments in Faisal Jewel start at PKR 580,000. The entry-level option is a one-bedroom apartment with a total area of 1,295 sq. ft., which includes a 200 sq. ft. living room, 150 sq. ft. bedroom, 100 sq. ft. kitchen, and 50 sq. ft. bathroom. Prices vary by floor level and unit type. Contact the sales team for a current pricing schedule." },
      { question: "What is the payment plan for Faisal Jewel apartments and shops?", answer: "Faisal Jewel offers a flexible installment plan to make the purchase accessible. The structure typically involves a down payment of 20–30% at booking, quarterly instalments spread across the construction period, and a final payment of approximately 10% on possession in Q4 2027. Exact terms depend on the unit type and floor. Contact our team at +92 333 1113177 for a personalised payment schedule." },
      { question: "Who is the developer of Faisal Jewel?", answer: "Faisal Jewel is a joint venture between Zedem Properties Pvt. Ltd. and CAM Construction — two of Pakistan's most reputable names in real estate development and high-rise construction. Zedem Properties brings project development and commercial expertise, while CAM Construction handles the structural engineering and build quality." },
      { question: "When will Faisal Jewel be completed?", answer: "The targeted completion date for Faisal Jewel is Q4 2027. The project is currently under active construction, and regular updates are shared through the official website and sales team communications. Buyers are encouraged to register their details to receive project milestone notifications." },
      { question: "Is Faisal Jewel approved by the RDA?", answer: "Faisal Jewel is situated within the Faisal Hills development, which operates under the framework of an RDA-approved community. Buyers are advised to confirm the latest NOC and approval status directly with the developer's sales team, as documentation can be provided upon request." },
      { question: "What amenities does Faisal Jewel offer?", answer: "Faisal Jewel provides a comprehensive range of world-class amenities including a rooftop swimming pool, fully equipped fitness centre, rooftop lounge, gaming room, 24/7 security surveillance, in-building cafés, retail outlets on commercial floors, a business centre, and three levels of basement parking with over 1,000 spaces. Hotel residents also benefit from concierge services, restaurant dining, and WiFi throughout." },
      { question: "Can I invest in commercial shops in Faisal Jewel?", answer: "Yes. Faisal Jewel offers 350+ commercial shops across its six commercial floors, making it one of the largest commercial investment opportunities in the Faisal Hills area. Shops are available for sale on an instalment plan and are expected to generate strong rental yields due to the project's high-footfall location and the in-building hotel and apartment population. Contact the investment team for available inventory and pricing." },
      { question: "How do I book a unit in Faisal Jewel Islamabad?", answer: "Booking a unit in Faisal Jewel Islamabad is straightforward. You can call or WhatsApp the sales team at +92 333 1113177, visit the official website at faisalhillsislamabadfh.com, or send an email to info@faisalhillsislamabadfh.com. The team will share available inventory, floor plans, payment plan options, and guide you through the booking process step by step." }
    ],
    developmentUpdates: [
      { title: "Floor 14 Slab Concrete Pouring", date: "August 2026", image: "/faisal-jewel-building.webp", progress: 60, text: "High-strength RCC structure progressing smoothly." }
    ]
  }
];

export const faisalJewelsSpecs = {
  floors: 27,
  commercialFloors: 6,
  residentialFloors: 18,
  basementParkingLevels: 3,
  parkingCapacity: "1,000+",
  commercialShops: 350,
  residentialApartments: 250,
  totalAreaSqFt: "1,295 Sq. Ft. (1-Bed Suite)",
  startingPrice: "PKR 580,000",
  completionDate: "Q4 2027",
  developer: "Zedem Properties Pvt. Ltd. & CAM Construction",
  locationJunction: "Margalla Avenue x N-5 GT Road x M1 Motorway Interchange"
};

export const faisalJewelsSurroundings = [
  { id: "01", name: "Margalla Avenue", distance: "Direct frontage — main access road" },
  { id: "02", name: "HiTech University", distance: "Major education institution — nearby" },
  { id: "03", name: "Taxila City", distance: "Historic industrial hub — nearby" },
  { id: "04", name: "Wah Cantt", distance: "Established cantonment city — minutes away" },
  { id: "05", name: "Sector D-12", distance: "Emerging high-demand residential zone" },
  { id: "06", name: "Islamabad International Airport", distance: "Approx. 30–35 minutes via Motorway" },
  { id: "07", name: "Sector F-10", distance: "Prime residential & commercial district" },
  { id: "08", name: "Blue Area Islamabad", distance: "City's commercial hub — 30 minutes" }
];

export const faisalJewelsApartmentDetails = {
  title: "One-Bedroom Apartment — Floor Plan & Features",
  totalArea: "1,295 Sq. Ft.",
  breakdown: [
    { label: "Living Room", area: "200 sq. ft." },
    { label: "Master Bedroom", area: "150 sq. ft." },
    { label: "Modern Kitchen", area: "100 sq. ft." },
    { label: "Bathroom", area: "50 sq. ft." }
  ]
};

export const faisalJewelsHotelExperience = {
  title: "The Apex of Refined Living — 4-Star Hotel",
  tagline: "No request is too extravagant, no detail too subtle",
  features: [
    "High-Speed Wi-Fi Connectivity",
    "Centralized Air Conditioning",
    "Rooftop Lounge Access",
    "Business Centre Access",
    "24/7 Security Surveillance & In-Building Restaurant Access"
  ]
};

export const paymentPlansData: PaymentPlanItem[] = [
  {
    id: "plan-1",
    blockSlug: "executive-block",
    blockName: "Executive Block",
    plotSize: "5 Marla",
    category: "Residential",
    totalPrice: 5800000,
    downPayment: 1160000,
    monthlyInstallment: 75000,
    quarterlyInstallment: 225000,
    possessionAmount: 580000,
    durationMonths: 36,
    verificationDate: "August 2026"
  },
  {
    id: "plan-2",
    blockSlug: "executive-block",
    blockName: "Executive Block",
    plotSize: "10 Marla",
    category: "Residential",
    totalPrice: 9800000,
    downPayment: 1960000,
    monthlyInstallment: 135000,
    quarterlyInstallment: 405000,
    possessionAmount: 980000,
    durationMonths: 36,
    verificationDate: "August 2026"
  },
  {
    id: "plan-3",
    blockSlug: "block-a",
    blockName: "Block A",
    plotSize: "10 Marla",
    category: "Residential",
    totalPrice: 9500000,
    downPayment: 1900000,
    monthlyInstallment: 125000,
    quarterlyInstallment: 375000,
    possessionAmount: 950000,
    durationMonths: 36,
    verificationDate: "August 2026"
  },
  {
    id: "plan-4",
    blockSlug: "prime-block",
    blockName: "Prime Block",
    plotSize: "1 Kanal",
    category: "Residential",
    totalPrice: 22000000,
    downPayment: 4400000,
    monthlyInstallment: 295000,
    quarterlyInstallment: 885000,
    possessionAmount: 2200000,
    durationMonths: 36,
    verificationDate: "August 2026"
  },
  {
    id: "plan-5",
    blockSlug: "gandahara",
    blockName: "Gandahara Block",
    plotSize: "5 Marla",
    category: "Residential",
    totalPrice: 3800000,
    downPayment: 760000,
    monthlyInstallment: 45000,
    quarterlyInstallment: 135000,
    possessionAmount: 380000,
    durationMonths: 36,
    verificationDate: "August 2026"
  },
  {
    id: "plan-fj-res",
    blockSlug: "faisal-jewel-islamabad",
    blockName: "Faisal Jewel Tower",
    plotSize: "929 - 3,226 Sq.Ft. Apartment",
    category: "Residential",
    totalPrice: 15820000,
    downPayment: 3975000,
    monthlyInstallment: 246770,
    quarterlyInstallment: 740312,
    possessionAmount: 0,
    durationMonths: 48,
    verificationDate: "August 2026"
  }
];

export interface FaisalJewelResidentialPlan {
  unitType: string;
  floor: string;
  ratePerSqFt: number;
  ratePerSqFtFormatted: string;
  gfaMin: number;
  gfaMax: number;
  downPaymentMin: number;
  downPaymentMax: number;
  downPaymentMinFormatted: string;
  downPaymentMaxFormatted: string;
  totalPriceMin: number;
  totalPriceMax: number;
  totalPriceMinFormatted: string;
  totalPriceMaxFormatted: string;
  installmentsCount: number;
  durationMonths: number;
}

export interface FaisalJewelCommercialPlanRow {
  unitType: string;
  floor: string;
  ratePerSqFt: number;
  ratePerSqFtFormatted: string;
  areaMin: number;
  areaMax: number;
  downPaymentMin: number;
  downPaymentMax: number;
  downPaymentMinFormatted: string;
  downPaymentMaxFormatted: string;
  totalPriceMin: number;
  totalPriceMax: number;
  totalPriceMinFormatted: string;
  totalPriceMaxFormatted: string;
  installmentsCount: number;
  durationMonths: number;
}

export const faisalJewelResidentialPlan: FaisalJewelResidentialPlan = {
  unitType: "Apartments",
  floor: "6th to 19th Floor",
  ratePerSqFt: 17000,
  ratePerSqFtFormatted: "17,000",
  gfaMin: 929,
  gfaMax: 3226,
  downPaymentMin: 3975000,
  downPaymentMax: 13735000,
  downPaymentMinFormatted: "3,975,000",
  downPaymentMaxFormatted: "13,735,000",
  totalPriceMin: 15820000,
  totalPriceMax: 139865000,
  totalPriceMinFormatted: "15,820,000",
  totalPriceMaxFormatted: "139,865,000",
  installmentsCount: 16,
  durationMonths: 48
};

export const faisalJewelCommercialPlans: FaisalJewelCommercialPlanRow[] = [
  {
    unitType: "Shops",
    floor: "Lower Ground",
    ratePerSqFt: 52000,
    ratePerSqFtFormatted: "52,000",
    areaMin: 153,
    areaMax: 2683,
    downPaymentMin: 2040000,
    downPaymentMax: 34930000,
    downPaymentMinFormatted: "2,040,000",
    downPaymentMaxFormatted: "34,930,000",
    totalPriceMin: 8005000,
    totalPriceMax: 139565000,
    totalPriceMinFormatted: "8,005,000",
    totalPriceMaxFormatted: "139,565,000",
    installmentsCount: 16,
    durationMonths: 48
  },
  {
    unitType: "Shops",
    floor: "Ground Floor",
    ratePerSqFt: 57000,
    ratePerSqFtFormatted: "57,000",
    areaMin: 169,
    areaMax: 765,
    downPaymentMin: 2460000,
    downPaymentMax: 10950000,
    downPaymentMinFormatted: "2,460,000",
    downPaymentMaxFormatted: "10,950,000",
    totalPriceMin: 9685000,
    totalPriceMax: 43655000,
    totalPriceMinFormatted: "9,685,000",
    totalPriceMaxFormatted: "43,655,000",
    installmentsCount: 16,
    durationMonths: 48
  },
  {
    unitType: "Shops",
    floor: "1st Floor",
    ratePerSqFt: 52000,
    ratePerSqFtFormatted: "52,000",
    areaMin: 169,
    areaMax: 842,
    downPaymentMin: 2245000,
    downPaymentMax: 10995000,
    downPaymentMinFormatted: "2,245,000",
    downPaymentMaxFormatted: "10,995,000",
    totalPriceMin: 8840000,
    totalPriceMax: 43835000,
    totalPriceMinFormatted: "8,840,000",
    totalPriceMaxFormatted: "43,835,000",
    installmentsCount: 16,
    durationMonths: 48
  },
  {
    unitType: "Shops",
    floor: "2nd Floor",
    ratePerSqFt: 49000,
    ratePerSqFtFormatted: "49,000",
    areaMin: 169,
    areaMax: 1990,
    downPaymentMin: 2120000,
    downPaymentMax: 24430000,
    downPaymentMinFormatted: "2,120,000",
    downPaymentMaxFormatted: "24,430,000",
    totalPriceMin: 8330000,
    totalPriceMax: 97560000,
    totalPriceMinFormatted: "8,330,000",
    totalPriceMaxFormatted: "97,560,000",
    installmentsCount: 16,
    durationMonths: 48
  },
  {
    unitType: "Shops",
    floor: "3rd Floor",
    ratePerSqFt: 49000,
    ratePerSqFtFormatted: "49,000",
    areaMin: 169,
    areaMax: 1279,
    downPaymentMin: 2120000,
    downPaymentMax: 15720000,
    downPaymentMinFormatted: "2,120,000",
    downPaymentMaxFormatted: "15,720,000",
    totalPriceMin: 8830000,
    totalPriceMax: 62720000,
    totalPriceMinFormatted: "8,830,000",
    totalPriceMaxFormatted: "62,720,000",
    installmentsCount: 16,
    durationMonths: 48
  },
  {
    unitType: "Shops & Food Court",
    floor: "4th Floor",
    ratePerSqFt: 52000,
    ratePerSqFtFormatted: "52,000",
    areaMin: 210,
    areaMax: 1899,
    downPaymentMin: 2780000,
    downPaymentMax: 24735000,
    downPaymentMinFormatted: "2,780,000",
    downPaymentMaxFormatted: "24,735,000",
    totalPriceMin: 10970000,
    totalPriceMax: 98800000,
    totalPriceMinFormatted: "10,970,000",
    totalPriceMaxFormatted: "98,800,000",
    installmentsCount: 16,
    durationMonths: 48
  }
];

export interface SeoPageConfig {
  pageSlug: string;
  pageTitle: string;
  metaTitle: string;
  h1Heading?: string;
  metaDescription: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  metaKeywords: string;
  focusKeyword?: string;
  secondaryKeywords?: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schemaType?: string;
  customSchemaJson?: string;
  author?: string;
}

export interface GlobalSeoSettings {
  siteName: string;
  siteUrl?: string;
  titleSeparator?: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultMetaKeywords: string;
  defaultOgImage?: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
  gtmId?: string;
  gaMeasurementId?: string;
  facebookAppId: string;
  twitterHandle: string;
  organizationName?: string;
  organizationPhone?: string;
  organizationEmail?: string;
  organizationAddress?: string;
  defaultRobotsIndex?: boolean;
  defaultRobotsFollow?: boolean;
  pages: SeoPageConfig[];
}

export interface RedirectItem {
  id: number;
  source_url: string;
  destination_url: string;
  status_code: number;
  is_active: boolean;
  hits?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export const initialSeoConfig: GlobalSeoSettings = {
  siteName: "Faisal Hills Real Estate Portal",
  defaultMetaTitle: "Faisal Hills Islamabad: Plot Prices, Payment Plan & NOC Status",
  defaultMetaDescription: "Explore Faisal Hills Islamabad & Taxila. Interactive plot maps, RDA NOC status, block prices, and flexible payment plans for residential & commercial plots.",
  defaultMetaKeywords: "Faisal Hills, Faisal Hills Taxila, Faisal Hills Rawalpindi, Executive Block Faisal Hills, Block A Faisal Hills, Block B Faisal Hills, Block C Faisal Hills, Prime Block Faisal Hills, Faisal Hills Plot Prices, Faisal Hills Map, Faisal Jewels Tower",
  googleSiteVerification: "google-site-verification-code-xyz123",
  bingSiteVerification: "bing-verification-code-abc456",
  facebookAppId: "9876543210",
  twitterHandle: "@FaisalHillsReal",
  pages: [
    {
      pageSlug: "home",
      pageTitle: "Home Page",
      metaTitle: "Faisal Hills Islamabad: Plot Prices, Payment Plan & NOC Status",
      metaDescription: "Faisal Hills Islamabad on GT Road, Taxila: RDA NOC status, block-by-block plot rates, 2026 payment plans and possession status, with checks before you buy.",
      metaKeywords: "Faisal Hills Taxila, Faisal Hills Rawalpindi, Plots for sale in Faisal Hills, RDA approved housing society, Faisal Town Group",
      ogTitle: "Faisal Hills Taxila • Official Real Estate Portal",
      ogDescription: "Interactive plot inventory, master plan, and verified prices for Faisal Hills Executive, Block A, B, C, D & Prime Block.",
      ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/",
      author: "Faisal Town Group Real Estate Team"
    },
    {
      pageSlug: "payment-plan",
      pageTitle: "Payment Schedules Page",
      metaTitle: "Faisal Hills Official Payment Plans & 3-Year Installment Schedules 2026",
      metaDescription: "Verified 3-year quarterly payment schedules for 5 Marla, 10 Marla, 1 Kanal plots and luxury apartments in Faisal Hills Taxila. View rates & down payments.",
      metaKeywords: "Faisal Hills payment plan, Faisal Jewels payment plan 2026, 5 Marla plot installment Faisal Hills, 10 Marla price list",
      ogTitle: "Faisal Hills Payment Matrix 2026",
      ogDescription: "Interactive installment calculator & official price schedules for residential and commercial plots.",
      ogImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/payment-plan",
      author: "Faisal Town Group Sales Desk"
    },
    {
      pageSlug: "master-plan",
      pageTitle: "Interactive Master Plan Map Page",
      metaTitle: "Faisal Hills Interactive Master Plan Map & Plot Location Vector",
      metaDescription: "High-resolution vector map of Faisal Hills Rawalpindi. Zoom & search 14,500+ plot coordinates across Sector Executive, Block A, B, C, D & Prime Block.",
      metaKeywords: "Faisal Hills master plan map, Faisal Hills layout map PDF, Faisal Hills block sector map, GT Road Taxila map",
      ogTitle: "Faisal Hills High-Res Vector Master Map",
      ogDescription: "Locate plots, central parks, Jamia Mosque, and commercial boulevards on our interactive master plan map.",
      ogImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/master-plan",
      author: "Faisal Hills GIS Mapping Division"
    },
    {
      pageSlug: "faisal-jewel-islamabad",
      pageTitle: "Faisal Jewel Skyscraper Page",
      metaTitle: "Faisal Jewel Islamabad | Apartments Shops",
      metaDescription: "Faisal Jewel Islamabad: 27-floor mixed-use tower in Faisal Hills. Luxury apartments, commercial shops & 4-star hotel. Flexible payment plan. Book now!",
      metaKeywords: "Faisal Jewel Islamabad, Faisal Jewel payment plan, Faisal Jewel apartments, Faisal Jewel shops, Zedem Properties, CAM Construction",
      ogTitle: "Faisal Jewel Islamabad • 27-Story Mixed-Use Skyscraper",
      ogDescription: "Faisal Jewel Islamabad: 27-floor mixed-use tower in Faisal Hills. Luxury apartments, commercial shops & 4-star hotel.",
      ogImage: "/faisal-jewel-building.webp",
      canonicalUrl: "https://faisalhills.com/blocks/faisal-jewel-islamabad",
      author: "Faisal Jewel Development Team"
    },
    {
      pageSlug: "faisal-hills-blocks",
      pageTitle: "Faisal Hills Blocks Page",
      metaTitle: "Faisal Hills Blocks | All Sectors FH Islamabad",
      metaDescription: "Explore all Faisal Hills Blocks Executive, Prime, A, B, C, D Golf. RDA-approved plots near GT Road, Taxila. Invest or live today",
      metaKeywords: "Faisal Hills Blocks, Faisal Hills Executive Block, Faisal Hills Prime Block, Faisal Hills A Block, Faisal Hills B Block, Faisal Hills C Block, Faisal Hills D Block, Golf Block, plot investment",
      ogTitle: "Faisal Hills Blocks • All Sectors",
      ogDescription: "Explore all Faisal Hills Blocks Executive, Prime, A, B, C, D Golf. RDA-approved plots near GT Road, Taxila.",
      ogImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/faisal-hills-blocks",
      author: "Faisal Hills Marketing Team"
    },
    {
      pageSlug: "executive-block",
      pageTitle: "Executive Block Page",
      metaTitle: "Faisal Hills Executive Block – Plots, Prices & Map",
      metaDescription: "Faisal Hills Executive Block: RDA-approved plots on Main GT Road. Check location, prices, payment plan, NOC, facilities & investment details.",
      metaKeywords: "Faisal Hills Executive Block, Executive Block plots, Executive Block prices, Faisal Hills entrance block",
      ogTitle: "Faisal Hills Executive Block",
      ogDescription: "RDA-approved plots on Main GT Road. Check location, prices, payment plan, NOC, facilities & investment details.",
      ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/blocks/executive-block",
      author: "Faisal Hills Marketing Team"
    },
    {
      pageSlug: "block-a",
      pageTitle: "Block A Page",
      metaTitle: "Faisal Hills Block A Prices, Map & Payment Plan",
      metaDescription: "Faisal Hills Block A RDA-approved plots from 5 Marla to 1 Kanal near GT Road. See prices, payment plan, location map and 2026 updates.",
      metaKeywords: "Faisal Hills Block A, Block A plots, Block A prices, Block A map, Block A payment plan",
      ogTitle: "Faisal Hills Block A Prices, Map & Payment Plan",
      ogDescription: "Faisal Hills Block A RDA-approved plots from 5 Marla to 1 Kanal near GT Road. See prices, payment plan, location map and 2026 updates.",
      ogImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/blocks/block-a",
      author: "Faisal Hills Marketing Team"
    },
    {
      pageSlug: "block-b",
      pageTitle: "Block B Page",
      metaTitle: "Faisal Hills Islamabad B Block | Prices | Map",
      metaDescription: "Faisal Hills Islamabad B Block: RDA-approved plots from 5 Marla to 1 Kanal on the Grand Boulevard near GT Road. Prices, payment plan & 2026 updates.",
      metaKeywords: "Faisal Hills Islamabad B Block, Block B plots, B Block pricing, Margalla hill view plots, Block B map, Block B payment plan",
      ogTitle: "Faisal Hills Islamabad B Block | Prices | Map",
      ogDescription: "Faisal Hills Islamabad B Block: RDA-approved plots from 5 Marla to 1 Kanal on the Grand Boulevard near GT Road. Prices, payment plan & 2026 updates.",
      ogImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/blocks/block-b",
      author: "Faisal Hills Marketing Team"
    },
    {
      pageSlug: "block-b1-extension",
      pageTitle: "Block B1 Extension Page",
      metaTitle: "Faisal Hills B Extension – Affordable Plots & High Growth",
      metaDescription: "Faisal Hills Block B Extension: Affordable residential plots with high growth. Check current pricing, road work progress & early possession details.",
      metaKeywords: "Faisal Hills B Extension, B1 Extension plots, affordable plots Islamabad",
      ogTitle: "Faisal Hills B Extension",
      ogDescription: "Affordable residential plots with high appreciation potential. Check current pricing & progress.",
      ogImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/blocks/block-b1-extension",
      author: "Faisal Hills Marketing Team"
    },
    {
      pageSlug: "block-c",
      pageTitle: "Block C Page",
      metaTitle: "Faisal Hills Block C – Plots, Prices & Map",
      metaDescription: "Explore Faisal Hills Block C: NOC-approved plots, latest prices, map, amenities & booking process. RDA-approved investment near Islamabad.",
      metaKeywords: "Faisal Hills Block C, Block C plots, Block C prices, Block C map, Block C payment plan",
      ogTitle: "Faisal Hills Block C – Plots, Prices & Map",
      ogDescription: "Explore Faisal Hills Block C: NOC-approved plots, latest prices, map, amenities & booking process. RDA-approved investment near Islamabad.",
      ogImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/blocks/block-c",
      author: "Faisal Hills Marketing Team"
    },
    {
      pageSlug: "block-d",
      pageTitle: "Block D Page",
      metaTitle: "Faisal Hills D Block — Prices, Map, Payment Plan & Plots for Sale",
      metaDescription: "Faisal Hills D Block prices, master plan, location map and payment plan. Residential plots from 5 marla to 1 kanal plus commercial, with instalment options.",
      metaKeywords: "Faisal Hills D Block, D Block plots, D Block prices, D Block map, D Block payment plan",
      ogTitle: "Faisal Hills D Block — Prices, Map, Payment Plan & Plots for Sale",
      ogDescription: "Faisal Hills D Block prices, master plan, location map and payment plan. Residential plots from 5 marla to 1 kanal plus commercial, with instalment options.",
      ogImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/blocks/block-d",
      author: "Faisal Hills Marketing Team"
    },
    {
      pageSlug: "prime-block",
      pageTitle: "Prime Block Page",
      metaTitle: "Faisal Hills Prime Block | Plots & Payment Plan",
      metaDescription: "Explore Faisal Hills Prime Block — premium residential & commercial plots near Islamabad with flexible payment plans, top amenities & RDA approval.",
      metaKeywords: "Faisal Hills Prime Block, Prime Block plots, Prime Block prices, Prime Block payment plan",
      ogTitle: "Faisal Hills Prime Block | Plots & Payment Plan",
      ogDescription: "Explore Faisal Hills Prime Block — premium residential & commercial plots near Islamabad with flexible payment plans, top amenities & RDA approval.",
      ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      canonicalUrl: "https://faisalhills.com/blocks/prime-block",
      author: "Faisal Hills Marketing Team"
    },
    {
      pageSlug: "faisal-hills-commercial",
      pageTitle: "Commercial Plots Page",
      metaTitle: "Faisal Hills Commercial Plots for Sale 2026 | Prices & Plan",
      metaDescription: "Explore Faisal Hills commercial plots for sale in Taxila, Islamabad. Compare 5, 10 and 12 marla prices, Executive and A–D Block options.",
      metaKeywords: "Faisal Hills Commercial, commercial plots Faisal Hills, plot price, commercial payment plan",
      ogTitle: "Faisal Hills Commercial Plots for Sale",
      ogDescription: "Explore Faisal Hills commercial plots for sale in Taxila, Islamabad. Compare prices & plans.",
      ogImage: "/faisal-jewel-building.webp",
      canonicalUrl: "https://faisalhills.com/faisal-hills-commercial",
      author: "Faisal Hills Marketing Team"
    },
    {
      pageSlug: "about-us",
      pageTitle: "About Us Page",
      metaTitle: "About Faisal Hills | Zedem International & Vision",
      metaDescription: "Learn about Faisal Hills Taxila, Zedem International leadership, project milestones, RDA NOC approval, and visionary urban master planning.",
      metaKeywords: "About Faisal Hills, Zedem International, Chaudhry Abdul Majeed, Faisal Hills developers, RDA approval",
      ogTitle: "About Faisal Hills | Zedem International & Vision",
      ogDescription: "Learn about Faisal Hills Taxila, Zedem International leadership, project milestones, RDA NOC approval.",
      ogImage: "/images/faisal-hills-drone-view.webp",
      canonicalUrl: "https://faisalhills.com/about-us",
      author: "Faisal Hills Corporate Affairs"
    },
    {
      pageSlug: "hills-walk",
      pageTitle: "Hills Walk Commercial Page",
      metaTitle: "Hills Walk Commercial Strip Faisal Hills | Retail & Dining Boulevard",
      metaDescription: "Hills Walk at Faisal Hills: European style pedestrian open-air commercial boulevard with retail outlets, cafes, and scenic Margalla views.",
      metaKeywords: "Hills Walk Faisal Hills, Hills Walk commercial, retail shops Faisal Hills, boulevard shops",
      ogTitle: "Hills Walk Commercial Strip Faisal Hills",
      ogDescription: "European style pedestrian open-air commercial boulevard with retail outlets & cafes.",
      ogImage: "/images/hills-walk-commercial-aerial.webp",
      canonicalUrl: "https://faisalhills.com/blocks/hills-walk",
      author: "Faisal Hills Commercial Desk"
    },
    {
      pageSlug: "plots",
      pageTitle: "Plots Inventory & Search Page",
      metaTitle: "Faisal Hills Plots for Sale | Interactive Inventory & Price Search",
      metaDescription: "Search 14,500+ verified residential and commercial plots for sale in Faisal Hills Islamabad. Filter by block, size (5 Marla to 1 Kanal), street & facing.",
      metaKeywords: "Faisal Hills plots for sale, buy plot in Faisal Hills, plot prices Taxila, 5 marla plot price, 10 marla plot price, 1 kanal plot price",
      ogTitle: "Faisal Hills Plots for Sale | Interactive Inventory",
      ogDescription: "Search verified residential and commercial plots for sale in Faisal Hills Islamabad with instant pricing.",
      ogImage: "/images/faisal-hills-glow-park.webp",
      canonicalUrl: "https://faisalhills.com/plots",
      author: "Faisal Hills Sales Desk"
    },
    {
      pageSlug: "blogs",
      pageTitle: "News & Blog Articles Page",
      metaTitle: "Faisal Hills News, Market Updates & Real Estate Blog 2026",
      metaDescription: "Stay updated with Faisal Hills development progress, NOC approvals, balloting results, market trends, and expert investment guides.",
      metaKeywords: "Faisal Hills news, Faisal Hills blog, real estate updates Islamabad, balloting 2026, NOC status",
      ogTitle: "Faisal Hills News & Real Estate Blog 2026",
      ogDescription: "Stay updated with Faisal Hills development progress, NOC approvals, and market trends.",
      ogImage: "/images/roots-international-school-faisal-hills.webp",
      canonicalUrl: "https://faisalhills.com/blogs",
      author: "Faisal Hills Editorial Team"
    },
    {
      pageSlug: "contact",
      pageTitle: "Contact Us & Helpline Page",
      metaTitle: "Contact Faisal Hills Official Sales Desk & Head Office",
      metaDescription: "Get in touch with Faisal Hills official sales desk, helpline 03410472229, head office in Faisal Tower, and site office at GT Road Taxila entrance.",
      metaKeywords: "Faisal Hills contact, Faisal Hills phone number, sales desk, site office, head office Rawalpindi",
      ogTitle: "Contact Faisal Hills Official Sales Desk",
      ogDescription: "Get in touch with Faisal Hills official sales desk, helpline, and site office.",
      ogImage: "/images/faisal-hills-arc-gate.webp",
      canonicalUrl: "https://faisalhills.com/contact",
      author: "Faisal Hills Support Team"
    },
    {
      pageSlug: "terms-of-service",
      pageTitle: "Terms of Service Page",
      metaTitle: "Terms of Service | Faisal Hills Official Portal",
      metaDescription: "Official terms of service, plot booking rules, payment schedules, and usage guidelines for Faisal Hills website and services.",
      metaKeywords: "Faisal Hills terms of service, booking terms, Zedem international policies",
      ogTitle: "Terms of Service | Faisal Hills Official Portal",
      ogDescription: "Official terms of service and plot booking policies for Faisal Hills.",
      ogImage: "/images/faisal-hills-arc-gate.webp",
      canonicalUrl: "https://faisalhills.com/terms-of-service",
      author: "Faisal Hills Legal Department"
    },
    {
      pageSlug: "privacy-policy",
      pageTitle: "Privacy Policy Page",
      metaTitle: "Privacy Policy | Faisal Hills Official Portal",
      metaDescription: "Privacy Policy for Faisal Hills portal. Learn how we handle customer inquiry information, cookies, and data protection compliance.",
      metaKeywords: "Faisal Hills privacy policy, customer data protection, privacy guidelines",
      ogTitle: "Privacy Policy | Faisal Hills Official Portal",
      ogDescription: "Privacy Policy and data protection standards for Faisal Hills visitors.",
      ogImage: "/images/faisal-hills-arc-gate.webp",
      canonicalUrl: "https://faisalhills.com/privacy-policy",
      author: "Faisal Hills Compliance Team"
    }
  ]
};
export interface GalleryItem {
  image: string;
  desc: any;
  id: string;
  title: string;
  category: 'Infrastructure' | 'Towers' | 'Amenities' | 'Entrance';
  imageUrl: string;
  alt?: string;
  description?: string;
  dateAdded?: string;
}

export const initialGalleryData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Faisal Hills Arc Monument Entrance",
    category: "Entrance",
    imageUrl: "/images/faisal-hills-arc-gate.webp",
    description: "Grand Entrance Arc Portal on GT Road with 24/7 guarded security checkposts.",
    dateAdded: "August 2026",
    image: "",
    desc: undefined
  },
  {
    id: "gal-2",
    title: "Faisal Jewels 27-Story Skyscraper Tower",
    category: "Towers",
    imageUrl: "/images/faisal-jewel-tower.webp",
    description: "Architectural 27-story five-star luxury hotel & high-rise apartment tower.",
    dateAdded: "August 2026",
    image: "",
    desc: undefined
  },
  {
    id: "gal-3",
    title: "225ft Executive Commercial Boulevard",
    category: "Infrastructure",
    imageUrl: "/images/faisal-hills-executive-boulevard.webp",
    description: "Wide asphalt carpeted boulevards with underground utilities and commercial plazas.",
    dateAdded: "August 2026",
    image: "",
    desc: undefined
  },
  {
    id: "gal-4",
    title: "Active On-Ground Development Site",
    category: "Infrastructure",
    imageUrl: "/images/faisal-hills-development-site.webp",
    description: "Heavy machinery active road cutting, sewerage laying and plot leveling.",
    dateAdded: "August 2026",
    image: "",
    desc: undefined
  },
  {
    id: "gal-5",
    title: "Hill Walk Commercial Strip Aerial View",
    category: "Infrastructure",
    imageUrl: "/images/hills-walk-commercial-aerial.webp",
    description: "Aerial view of the pedestrian-friendly commercial boulevard near Margalla Hills.",
    dateAdded: "August 2026",
    image: "",
    desc: undefined
  },
  {
    id: "gal-6",
    title: "Faisal Hills Master-Planned Community Drone View",
    category: "Entrance",
    imageUrl: "/images/faisal-hills-drone-view.webp",
    description: "Panoramic overhead drone view of blocks A, B, C, Executive & Prime Block.",
    dateAdded: "August 2026",
    image: "",
    desc: undefined
  }
];

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  interest: string;
  message?: string;
  submittedAt: string;
}

export function formatLeadDateTime(dateInput?: string | Date): string {
  if (!dateInput) {
    const now = new Date();
    return `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  }

  const str = String(dateInput).trim();

  // If already contains exact date and time like "08 Sep 2026, 02:45 PM"
  if (/^\d{1,2}\s+[A-Za-z]{3}\s+\d{4},\s+\d{1,2}:\d{2}\s+(AM|PM)$/i.test(str)) {
    return str;
  }

  // Handle legacy relative strings "Today, 02:45 PM" or "Yesterday, 06:15 PM"
  if (/^Today,\s*(.*)$/i.test(str)) {
    const timePart = str.replace(/^Today,\s*/i, '');
    const now = new Date();
    const dayStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `${dayStr}, ${timePart || now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  }

  if (/^Yesterday,\s*(.*)$/i.test(str)) {
    const timePart = str.replace(/^Yesterday,\s*/i, '');
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    const dayStr = yest.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `${dayStr}, ${timePart || yest.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  }

  const d = new Date(dateInput);
  if (!isNaN(d.getTime())) {
    const day = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${day}, ${time}`;
  }

  return str;
}

export const initialLeadsData: LeadItem[] = [
  {
    id: "lead-1",
    name: "Muhammad Rizwan",
    phone: "+92 300 9876543",
    interest: "Block A (10 Marla Park Facing)",
    message: "Looking for immediate possession plot near commercial area.",
    submittedAt: "08 Sep 2026, 02:45 PM"
  },
  {
    id: "lead-2",
    name: "Tariq Mahmood",
    phone: "+92 321 5551234",
    interest: "Faisal Jewels Luxury Flat #FJ-402",
    message: "Inquiring about 4-year installment plan & down payment.",
    submittedAt: "07 Sep 2026, 06:15 PM"
  }
];

// -------------------------------------------------------------
// Mapping helpers for snake_case (Backend DB) <=> camelCase (Frontend TS)
// -------------------------------------------------------------
export function mapBlockToCamel(block: any): BlockInfo {
  if (!block) return block;
  return {
    ...block,
    nocStatus: block.noc_status || block.nocStatus,
    verificationDate: block.verification_date || block.verificationDate,
    priceRange: typeof block.price_range === 'string' ? JSON.parse(block.price_range) : (block.price_range || block.priceRange),
    masterPlanImage: block.master_plan_image || block.masterPlanImage,
    heroImage: block.hero_image || block.heroImage,
    highlights: typeof block.highlights === 'string' ? JSON.parse(block.highlights) : (block.highlights || block.highlights),
    amenities: typeof block.amenities === 'string' ? JSON.parse(block.amenities) : (block.amenities || block.amenities),
    faqs: typeof block.faqs === 'string' ? JSON.parse(block.faqs) : (block.faqs || block.faqs),
    developmentUpdates: typeof block.development_updates === 'string' ? JSON.parse(block.development_updates) : (block.development_updates || block.developmentUpdates),
    totalPlots: block.total_plots !== undefined ? block.total_plots : block.totalPlots
  };
}

export function mapPlotToCamel(plot: any): PlotItem {
  if (!plot) return plot;
  const price = plot.price !== null && plot.price !== undefined ? Number(plot.price) : null;
  return {
    ...plot,
    id: plot.id?.toString() || `plot-${Date.now()}`,
    plotNumber: plot.plot_number || plot.plotNumber || '',
    blockSlug: plot.block_slug || plot.blockSlug || '',
    blockName: plot.block_name || plot.blockName || '',
    propertyType: plot.property_type || plot.propertyType || 'Residential',
    category: plot.category || 'Residential',
    size: plot.size || '',
    dimensions: plot.dimensions || 'Dimension not provided',
    price: price,
    priceUnit: plot.price_unit || plot.priceUnit || 'Total Price',
    priceFormatted: plot.price_formatted || plot.priceFormatted || (price ? formatPlotPrice(price) : 'Contact for Price'),
    priceHistoryTrend: plot.price_history_trend || plot.priceHistoryTrend || '',
    status: plot.status || 'Available',
    facing: plot.facing || 'Standard',
    street: plot.street || '',
    location: plot.location || '',
    featured: plot.featured !== undefined ? !!plot.featured : false,
    displayOrder: plot.display_order !== undefined ? Number(plot.display_order) : (plot.displayOrder || 0),
    mapCoords: typeof plot.map_coords === 'string' ? JSON.parse(plot.map_coords) : (plot.map_coords || plot.mapCoords || { x: 50, y: 50 }),
    features: typeof plot.features === 'string' ? JSON.parse(plot.features) : (plot.features || plot.features || [])
  };
}

export function formatPlotPrice(price: number | null | undefined, priceFormatted?: string): string {
  // If priceFormatted is valid and not a zero-formatted placeholder
  if (
    priceFormatted &&
    priceFormatted !== 'Call for Price' &&
    priceFormatted !== 'null' &&
    !priceFormatted.includes('PKR 0.0') &&
    !priceFormatted.includes('PKR 0 Lacs') &&
    !priceFormatted.includes('PKR 0 Crore') &&
    !priceFormatted.includes('null')
  ) {
    return priceFormatted;
  }

  if (price === null || price === undefined || price <= 0) {
    return 'Contact for Price';
  }

  // Normalize if admin entered a small number (e.g. 55 Lacs or 1.25 Crore)
  let normPrice = Number(price);
  if (normPrice < 1000) {
    if (normPrice <= 20 && !Number.isInteger(normPrice)) {
      normPrice = normPrice * 10000000; // e.g. 1.25 Crore = 12,500,000
    } else {
      normPrice = normPrice * 100000; // e.g. 55 Lacs = 5,500,000
    }
  }

  if (normPrice >= 10000000) {
    return `PKR ${(normPrice / 10000000).toFixed(2)} Crore`;
  }
  if (normPrice >= 100000) {
    return `PKR ${(normPrice / 100000).toFixed(1)} Lacs`;
  }
  return `PKR ${normPrice.toLocaleString('en-PK')}`;
}

export function mapGalleryToCamel(item: any): GalleryItem {
  if (!item) return item;
  return {
    ...item,
    imageUrl: item.image_url || item.imageUrl,
    alt: item.alt || item.alt_text || item.title,
    dateAdded: item.date_added || item.dateAdded
  };
}

export function mapLeadToCamel(lead: any): LeadItem {
  if (!lead) return lead;
  const rawDate = lead.created_at || lead.submitted_at || lead.submittedAt;
  return {
    ...lead,
    id: lead.id ? lead.id.toString() : `lead-${Date.now()}`,
    name: lead.name,
    phone: lead.phone,
    interest: lead.interest || 'General Inquiry',
    message: lead.message,
    submittedAt: formatLeadDateTime(rawDate)
  };
}

export function mapBlogToCamel(blog: any): BlogItem {
  if (!blog) return blog;
  return {
    ...blog,
    h1: blog.h1 || blog.title,
    imageUrl: blog.image_url || blog.imageUrl,
    imageAlt: blog.image_alt || blog.imageAlt || blog.title,
    readTime: blog.read_time || blog.readTime,
    metaTitle: blog.meta_title || blog.metaTitle,
    metaDescription: blog.meta_description || blog.metaDescription,
    canonicalUrl: blog.canonical_url || blog.canonicalUrl,
    robotsIndex: blog.robots_index !== undefined ? !!blog.robots_index : (blog.robotsIndex !== undefined ? !!blog.robotsIndex : true),
    robotsFollow: blog.robots_follow !== undefined ? !!blog.robots_follow : (blog.robotsFollow !== undefined ? !!blog.robotsFollow : true),
    primaryKeyword: blog.primary_keyword || blog.primaryKeyword || '',
    secondaryKeywords: blog.secondary_keywords || blog.secondaryKeywords || '',
    ogImage: blog.og_image || blog.ogImage || blog.image_url || blog.imageUrl,
    twitterImage: blog.twitter_image || blog.twitterImage || blog.image_url || blog.imageUrl,
    createdAt: blog.created_at || blog.createdAt,
    updatedAt: blog.updated_at || blog.updatedAt,
    published: blog.published !== undefined ? !!blog.published : true,
  };
}


export function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const hostname = window.location.hostname;
    if (!hostname.includes('localhost') && !hostname.includes('127.0.0.1')) {
      if (process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes('localhost') && !process.env.NEXT_PUBLIC_API_URL.includes('127.0.0.1')) {
        return process.env.NEXT_PUBLIC_API_URL;
      }
      return `${origin}/api/public/index.php/api`;
    }
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
}


export const API_URL = typeof window !== 'undefined' ? getApiUrl() : (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api');

export async function safeFetch(url: string, init?: RequestInit, timeoutMs = 2500): Promise<Response | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      ...init,
      signal: controller.signal
    });
    clearTimeout(timer);
    return res;
  } catch {
    return null;
  }
}

let _cachedBlocks: BlockInfo[] = [];

function applyLocalBlockOverrides(blocks: BlockInfo[]): BlockInfo[] {
  if (typeof window === 'undefined') return blocks;
  try {
    const raw = localStorage.getItem('faisal_blocks_custom_v1');
    if (!raw) return blocks;
    const customMap: Record<string, Partial<BlockInfo>> = JSON.parse(raw);
    return blocks.map(b => {
      const override = customMap[b.slug] || (b.id ? customMap[b.id] : undefined);
      return override ? { ...b, ...override } : b;
    });
  } catch {
    return blocks;
  }
}

export async function fetchBlocks(forceRefresh = false): Promise<BlockInfo[]> {
  if (!forceRefresh && _cachedBlocks.length > 0) {
    return applyLocalBlockOverrides(_cachedBlocks);
  }
  try {
    const res = await safeFetch(`${getApiUrl()}/blocks`, { next: { revalidate: 300 } });
    if (!res || !res.ok) {
      _cachedBlocks = blocksData;
      return applyLocalBlockOverrides(blocksData);
    }
    const data = await res.json();
    _cachedBlocks = data.map(mapBlockToCamel);
    return applyLocalBlockOverrides(_cachedBlocks);
  } catch (e) {
    _cachedBlocks = blocksData;
    return applyLocalBlockOverrides(blocksData); // fallback
  }
}

export async function fetchBlock(slug: string): Promise<BlockInfo | null> {
  let baseBlock: BlockInfo | null = null;
  try {
    const res = await safeFetch(`${getApiUrl()}/blocks/${slug}`, { next: { revalidate: 300 } });
    if (res && res.ok) {
      const data = await res.json();
      baseBlock = mapBlockToCamel(data);
    }
  } catch (e) {
    baseBlock = null;
  }

  if (!baseBlock) {
    baseBlock = blocksData.find(b => b.slug === slug || b.id === slug || (slug === 'faisal-jewel-islamabad' && (b.id === 'faisal-jewels' || b.slug === 'faisal-jewels'))) || null;
  }

  if (!baseBlock) return null;

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('faisal_blocks_custom_v1');
      if (raw) {
        const customMap: Record<string, Partial<BlockInfo>> = JSON.parse(raw);
        const override = customMap[baseBlock.slug] || (baseBlock.id ? customMap[baseBlock.id] : undefined);
        if (override) {
          return { ...baseBlock, ...override };
        }
      }
    } catch {}
  }

  return baseBlock;
}

let _cachedPlots: PlotItem[] = [];

export async function fetchPlots(forceRefresh = false): Promise<PlotItem[]> {
  if (!forceRefresh && _cachedPlots.length > 0) {
    return _cachedPlots;
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/plots`, { next: { revalidate: 120 } });
    if (!res || !res.ok) return _cachedPlots.length > 0 ? _cachedPlots : plotInventoryData;
    const data = await res.json();
    _cachedPlots = Array.isArray(data) ? data.map(mapPlotToCamel) : (data?.data ? data.data.map(mapPlotToCamel) : []);
    return _cachedPlots;
  } catch (e) {
    return _cachedPlots.length > 0 ? _cachedPlots : plotInventoryData;
  }
}

let _cachedGallery: GalleryItem[] = [];

export async function fetchGallery(forceRefresh = false): Promise<GalleryItem[]> {
  if (!forceRefresh && _cachedGallery.length > 0) {
    return _cachedGallery;
  }
  try {
    const res = await safeFetch(`${getApiUrl()}/gallery`, { next: { revalidate: 300 } });
    if (!res || !res.ok) return initialGalleryData;
    const data = await res.json();
    _cachedGallery = data.map(mapGalleryToCamel);
    return _cachedGallery;
  } catch (e) {
    return initialGalleryData; // fallback
  }
}

export async function fetchSettings(): Promise<Record<string, any>> {
  try {
    const res = await safeFetch(`${getApiUrl()}/settings`, { next: { revalidate: 60 } });
    if (!res || !res.ok) {
      return {
        society_stats: societyStats,
        last_verified_date: societyStats.lastVerifiedDate
      };
    }
    return await res.json();
  } catch (e) {
    return {
      society_stats: societyStats,
      last_verified_date: societyStats.lastVerifiedDate
    }; // fallback
  }
}

export async function fetchSeo(pageSlug: string): Promise<any> {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('faisal_seo_settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        const p = parsed.pages?.find((page: any) => page.pageSlug === pageSlug);
        if (p) {
          return {
            title: p.metaTitle || p.pageTitle,
            h1_heading: p.h1Heading,
            meta_description: p.metaDescription,
            canonical_url: p.canonicalUrl,
            keywords: p.metaKeywords,
            og_title: p.ogTitle || p.metaTitle,
            og_description: p.ogDescription || p.metaDescription,
            og_image: p.ogImage,
            twitter_title: p.twitterTitle,
            twitter_description: p.twitterDescription,
            twitter_image: p.twitterImage,
            schema_type: p.schemaType,
            custom_schema_json: p.customSchemaJson
          };
        }
      }
    } catch (_) { }
  }
  try {
    const res = await safeFetch(`${getApiUrl()}/seo/${pageSlug}`, { next: { revalidate: 60 } });
    if (!res || !res.ok) {
      const p = initialSeoConfig.pages.find(page => page.pageSlug === pageSlug);
      return p ? {
        title: p.metaTitle || p.pageTitle,
        meta_description: p.metaDescription,
        keywords: p.metaKeywords,
        og_title: p.ogTitle,
        og_description: p.ogDescription
      } : null;
    }
    return await res.json();
  } catch (e) {
    const p = initialSeoConfig.pages.find(page => page.pageSlug === pageSlug);
    return p ? {
      title: p.metaTitle || p.pageTitle,
      meta_description: p.metaDescription,
      keywords: p.metaKeywords,
      og_title: p.ogTitle,
      og_description: p.ogDescription
    } : null;
  }
}

export async function submitLead(lead: { name: string; phone: string; interest?: string; message?: string }): Promise<any> {
  const localLead: LeadItem = {
    id: `lead-${Date.now()}`,
    name: lead.name,
    phone: lead.phone,
    interest: lead.interest || 'General Inquiry',
    message: lead.message,
    submittedAt: formatLeadDateTime()
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
      const isDuplicate = existing.some((item: any) =>
        item.name === localLead.name && item.phone === localLead.phone && (item.message === localLead.message || item.interest === localLead.interest)
      );
      if (!isDuplicate) {
        localStorage.setItem('faisal_leads_data', JSON.stringify([localLead, ...existing]));
        window.dispatchEvent(new Event('faisal_leads_updated'));
      }
    } catch (e) { }
  }

  const res = await fetch(`${getApiUrl()}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error('Failed to submit lead');
  return await res.json();
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  status: 'active' | 'inactive';
  permissions?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface AdminUserPayload {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  status: 'active' | 'inactive';
  permissions?: string[];
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

// -------------------------------------------------------------
// Admin Authenticated Operations
// -------------------------------------------------------------
export async function adminLogin(username: string, password: string): Promise<{ token: string; user: AdminUser }> {
  const base = getApiUrl();
  const url = `${base}/auth/login`;
  const cleanUsername = username.trim();

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ 
      username: cleanUsername, 
      email: cleanUsername, 
      password 
    }),
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    throw new Error(`Backend response error (HTTP ${res.status}): ${text.substring(0, 100)}`);
  }

  if (!res.ok) {
    const errorMsg = (data && (data.message || (data.errors && Object.values(data.errors)[0] as string))) || `Authentication failed (HTTP ${res.status})`;
    throw new Error(errorMsg);
  }

  if (!data || !data.token) {
    throw new Error('Authentication succeeded but session token was not returned');
  }

  return data;
}


export async function adminLogout(token: string): Promise<any> {
  const res = await fetch(`${getApiUrl()}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to logout');
  return await res.json();
}

export async function apiFetchCurrentUser(token: string): Promise<AdminUser> {
  const res = await fetch(`${getApiUrl()}/auth/user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Session expired or unauthorized');
  const data = await res.json();
  return data.user;
}

export async function apiChangePassword(payload: ChangePasswordPayload, token: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${getApiUrl()}/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const firstErr = data.errors ? Object.values(data.errors)[0] : null;
    throw new Error((Array.isArray(firstErr) ? firstErr[0] : firstErr) || data.message || 'Failed to update password');
  }
  return data;
}

export async function apiForgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${getApiUrl()}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to process password reset request');
  }
  return data;
}

export async function apiResetPassword(payload: ResetPasswordPayload): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${getApiUrl()}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const firstErr = data.errors ? Object.values(data.errors)[0] : null;
    throw new Error((Array.isArray(firstErr) ? firstErr[0] : firstErr) || data.message || 'Failed to reset password');
  }
  return data;
}

// -------------------------------------------------------------
// Super Admin Administrator Management
// -------------------------------------------------------------
export async function apiFetchAdminUsers(token: string): Promise<AdminUser[]> {
  const res = await fetch(`${getApiUrl()}/admin/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Unauthorized. Super Admin access required.');
  }
  const data = await res.json();
  return data.users || [];
}

export async function apiCreateAdminUser(payload: AdminUserPayload, token: string): Promise<{ success: boolean; message: string; user: AdminUser }> {
  const res = await fetch(`${getApiUrl()}/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const firstErr = data.errors ? Object.values(data.errors)[0] : null;
    throw new Error((Array.isArray(firstErr) ? firstErr[0] : firstErr) || data.message || 'Failed to create administrator');
  }
  return data;
}

export async function apiUpdateAdminUser(id: number, payload: Partial<AdminUserPayload>, token: string): Promise<{ success: boolean; message: string; user: AdminUser }> {
  const res = await fetch(`${getApiUrl()}/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const firstErr = data.errors ? Object.values(data.errors)[0] : null;
    throw new Error((Array.isArray(firstErr) ? firstErr[0] : firstErr) || data.message || 'Failed to update administrator');
  }
  return data;
}

export async function apiToggleAdminStatus(id: number, token: string): Promise<{ success: boolean; message: string; status: 'active' | 'inactive' }> {
  const res = await fetch(`${getApiUrl()}/admin/users/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to change administrator status');
  }
  return data;
}

export async function apiDeleteAdminUser(id: number, token: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${getApiUrl()}/admin/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete administrator');
  }
  return data;
}

export async function apiUpdatePlot(id: string, plot: Partial<PlotItem>, token: string): Promise<PlotItem> {
  const payload: any = { ...plot };
  if (plot.plotNumber !== undefined) payload.plot_number = plot.plotNumber;
  if (plot.blockSlug !== undefined) payload.block_slug = plot.blockSlug;
  if (plot.blockName !== undefined) payload.block_name = plot.blockName;
  if (plot.propertyType !== undefined) payload.property_type = plot.propertyType;
  if (plot.priceUnit !== undefined) payload.price_unit = plot.priceUnit;
  if (plot.priceFormatted !== undefined) payload.price_formatted = plot.priceFormatted;
  if (plot.priceHistoryTrend !== undefined) payload.price_history_trend = plot.priceHistoryTrend;
  if (plot.displayOrder !== undefined) payload.display_order = plot.displayOrder;
  if (plot.mapCoords !== undefined) payload.map_coords = plot.mapCoords;
  if (plot.features !== undefined) payload.features = plot.features;

  delete payload.plotNumber;
  delete payload.blockSlug;
  delete payload.blockName;
  delete payload.propertyType;
  delete payload.priceUnit;
  delete payload.priceFormatted;
  delete payload.priceHistoryTrend;
  delete payload.displayOrder;
  delete payload.mapCoords;

  const res = await fetch(`${getApiUrl()}/plots/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update plot');
  const data = await res.json();
  const updated = mapPlotToCamel(data);
  if (_cachedPlots) {
    _cachedPlots = _cachedPlots.map(p => p.id === id ? updated : p);
  }
  return updated;
}

export async function apiCreatePlot(plot: Partial<PlotItem>, token: string): Promise<PlotItem> {
  const payload: any = { ...plot };
  if (plot.plotNumber !== undefined) payload.plot_number = plot.plotNumber;
  if (plot.blockSlug !== undefined) payload.block_slug = plot.blockSlug;
  if (plot.blockName !== undefined) payload.block_name = plot.blockName;
  if (plot.propertyType !== undefined) payload.property_type = plot.propertyType;
  if (plot.priceUnit !== undefined) payload.price_unit = plot.priceUnit;
  if (plot.priceFormatted !== undefined) payload.price_formatted = plot.priceFormatted;
  if (plot.priceHistoryTrend !== undefined) payload.price_history_trend = plot.priceHistoryTrend;
  if (plot.displayOrder !== undefined) payload.display_order = plot.displayOrder;
  if (plot.mapCoords !== undefined) payload.map_coords = plot.mapCoords;
  if (plot.features !== undefined) payload.features = plot.features;

  delete payload.plotNumber;
  delete payload.blockSlug;
  delete payload.blockName;
  delete payload.propertyType;
  delete payload.priceUnit;
  delete payload.priceFormatted;
  delete payload.priceHistoryTrend;
  delete payload.displayOrder;
  delete payload.mapCoords;

  const res = await fetch(`${getApiUrl()}/plots`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create plot');
  const data = await res.json();
  const created = mapPlotToCamel(data);
  if (_cachedPlots) {
    _cachedPlots = [created, ..._cachedPlots];
  }
  return created;
}

export async function apiDeletePlot(id: string, token: string): Promise<any> {
  const res = await fetch(`${getApiUrl()}/plots/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete plot');
  if (_cachedPlots) {
    _cachedPlots = _cachedPlots.filter(p => p.id !== id);
  }
}

export async function apiFetchLeads(token: string): Promise<LeadItem[]> {
  const res = await fetch(`${getApiUrl()}/leads`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'cache-control': 'no-cache',
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to fetch leads');
  const data = await res.json();
  return data.map(mapLeadToCamel);
}

export async function apiDeleteLead(id: string | number, token: string): Promise<any> {
  const res = await fetch(`${getApiUrl()}/leads/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete lead');
  return await res.json();
}

export async function apiAddGalleryItem(item: Partial<GalleryItem>, token: string): Promise<GalleryItem> {
  const payload = {
    title: item.title,
    category: item.category,
    image_url: item.imageUrl,
    alt: item.alt || item.title,
    description: item.description,
  };
  const res = await fetch(`${getApiUrl()}/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to add gallery item');
  const data = await res.json();
  return mapGalleryToCamel(data);
}

export async function apiDeleteGalleryItem(id: string, token: string): Promise<any> {
  const res = await fetch(`${getApiUrl()}/gallery/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete gallery item');
  return await res.json();
}

export async function apiUpdateBlock(id: string, blockData: Partial<BlockInfo>, token: string): Promise<BlockInfo> {
  const payload: any = {};
  if (blockData.name !== undefined) payload.name = blockData.name;
  if (blockData.subtitle !== undefined) payload.subtitle = blockData.subtitle;
  if (blockData.status !== undefined) payload.status = blockData.status;
  if (blockData.nocStatus !== undefined) payload.noc_status = blockData.nocStatus;
  if (blockData.verificationDate !== undefined) payload.verification_date = blockData.verificationDate;
  if (blockData.description !== undefined) payload.description = blockData.description;
  if (blockData.locationDetails !== undefined) payload.location_details = blockData.locationDetails;
  if (blockData.highlights !== undefined) payload.highlights = blockData.highlights;
  if (blockData.totalPlots !== undefined) payload.total_plots = blockData.totalPlots;
  if (blockData.priceRange !== undefined) payload.price_range = blockData.priceRange;
  if (blockData.masterPlanImage !== undefined) payload.master_plan_image = blockData.masterPlanImage;
  if (blockData.heroImage !== undefined) payload.hero_image = blockData.heroImage;
  if (blockData.amenities !== undefined) payload.amenities = blockData.amenities;
  if (blockData.faqs !== undefined) payload.faqs = blockData.faqs;
  if (blockData.developmentUpdates !== undefined) payload.development_updates = blockData.developmentUpdates;

  const res = await fetch(`${getApiUrl()}/blocks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update block');
  const data = await res.json();
  return mapBlockToCamel(data);
}


export async function apiUpdateSetting(key: string, value: any, token: string): Promise<any> {
  const res = await fetch(`${getApiUrl()}/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({ key, value }),
  });
  if (!res.ok) throw new Error('Failed to update settings');
  return await res.json();
}

export async function apiUpdateSeo(pageSlug: string, seo: any, token: string): Promise<any> {
  const res = await fetch(`${getApiUrl()}/seo/${pageSlug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(seo),
  });
  if (!res.ok) throw new Error('Failed to update SEO config');
  return await res.json();
}

export async function apiUpdateGlobalSeo(globalSeo: any, token: string): Promise<any> {
  const res = await fetch(`${getApiUrl()}/seo/global`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(globalSeo),
  });
  if (!res.ok) throw new Error('Failed to update Global SEO settings');
  return await res.json();
}

export const initialBlogsData: BlogItem[] = [
  {
    id: "blog-1",
    title: "Faisal Hills Plot Verification Guide — Complete Safety Steps & Fee Process",
    h1: "Faisal Hills Plot Verification Guide — Complete Safety Steps & Fee Process",
    slug: "faisal-hills-plot-verification-guide",
    summary: "A step-by-step buyer's due diligence checklist for verifying allotment letters, transfer deeds, and NOC approvals before buying a plot in Faisal Hills.",
    content: "<p>A comprehensive guide on Faisal Hills plot verification, checking official records at Zedem International office, understanding transfer fees, and ensuring 100% legal safety before making any payment.</p>",
    imageUrl: "/images/faisal-hills-executive-boulevard.webp",
    imageAlt: "Plot verification guide for Faisal Hills Islamabad",
    author: "Faisal Hills Research Desk",
    category: "Buying Guide",
    readTime: "6 min read",
    keywords: "faisal hills plot verification, verify plot file faisal hills, allotment letter zedem",
    published: true,
    metaTitle: "Faisal Hills Plot Verification Guide | Step-by-Step Due Diligence",
    metaDescription: "Learn how to verify Faisal Hills plot files, check allotment letters at the society office, confirm RDA NOC approvals, and avoid fraud.",
    createdAt: "2026-09-01T00:00:00.000000Z",
    updatedAt: "2026-09-01T00:00:00.000000Z"
  },
  {
    id: "blog-2",
    title: "Guide for Overseas Pakistanis: Buying Plots in Faisal Hills via NICOP",
    h1: "Guide for Overseas Pakistanis: Buying Plots in Faisal Hills via NICOP",
    slug: "overseas-pakistanis-guide",
    summary: "Everything overseas Pakistanis in the UK, UAE, and USA need to know about remote plot bookings, bank wire transfers, and video site tours.",
    content: "<p>A complete guide for overseas Pakistanis looking to invest in Faisal Hills Islamabad. Covers NICOP documentation, direct bank payments in developer's name, live video site inspections, and remote transfer procedures.</p>",
    imageUrl: "/images/faisal-hills-drone-view.webp",
    imageAlt: "Overseas Pakistanis investment guide for Faisal Hills",
    author: "Faisal Hills Overseas Desk",
    category: "Overseas Investors",
    readTime: "7 min read",
    keywords: "faisal hills overseas buyers, buy plot nicop faisal hills, overseas investment islamabad",
    published: true,
    metaTitle: "Overseas Pakistanis Guide to Buying Plots in Faisal Hills",
    metaDescription: "Step-by-step guide for overseas buyers: NICOP requirements, official bank payment procedures, power of attorney, and video tours.",
    createdAt: "2026-09-05T00:00:00.000000Z",
    updatedAt: "2026-09-05T00:00:00.000000Z"
  },
  {
    id: "blog-3",
    title: "Faisal Hills RDA NOC Status 2026: Approved Area & Verification Steps",
    h1: "Faisal Hills RDA NOC Status 2026: Approved Area & Verification Steps",
    slug: "faisal-hills-noc-status-guide",
    summary: "Detailed breakdown of the Rawalpindi Development Authority (RDA) NOC approval covering 11,823.5 kanals in Faisal Hills Islamabad.",
    content: "<p>Faisal Hills holds formal sanction and approval from the Rawalpindi Development Authority (RDA). Discover how to check the official RDA registry, understand approved sector boundaries, and verify NOC compliance.</p>",
    imageUrl: "/images/faisal-hills-arc-gate.webp",
    imageAlt: "Faisal Hills RDA NOC approval certificate and status",
    author: "Legal & Regulatory Desk",
    category: "Legal & NOC",
    readTime: "5 min read",
    keywords: "faisal hills rda noc, faisal hills approval status, rda approved society islamabad",
    published: true,
    metaTitle: "Faisal Hills RDA NOC Status 2026 | Approved Area & Legal Verification",
    metaDescription: "Verified legal status of Faisal Hills Islamabad: RDA NOC approval details, 11,823.5 kanals layout sanction, and official verification steps.",
    createdAt: "2026-09-10T00:00:00.000000Z",
    updatedAt: "2026-09-10T00:00:00.000000Z"
  }
];

export async function fetchBlogs(): Promise<BlogItem[]> {
  let localBlogs: BlogItem[] = [];
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('faisal_blogs_custom');
      if (stored) {
        localBlogs = JSON.parse(stored);
      }
    } catch { }
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/blogs`, { next: { revalidate: 60 } });
    let mapped: BlogItem[] = [];
    if (res && res.ok) {
      const data = await res.json();
      mapped = Array.isArray(data) ? data.map(mapBlogToCamel) : [];
    }

    // Combine local custom blogs with API results and default guides
    const combined = [...localBlogs, ...mapped, ...initialBlogsData];
    const seen = new Set<string>();
    return combined.filter(b => {
      const key = b.slug || b.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return b.published !== false;
    });
  } catch (e) {
    const combined = [...localBlogs, ...initialBlogsData];
    const seen = new Set<string>();
    return combined.filter(b => {
      const key = b.slug || b.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return b.published !== false;
    });
  }
}

export async function fetchBlogBySlug(slug: string): Promise<BlogItem | null> {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('faisal_blogs_custom');
      if (stored) {
        const localBlogs: BlogItem[] = JSON.parse(stored);
        const found = localBlogs.find(b => b.slug === slug || b.id === slug);
        if (found) return found;
      }
    } catch { }
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/blogs/${slug}`, { next: { revalidate: 60 } });
    if (res && res.ok) {
      const data = await res.json();
      return mapBlogToCamel(data);
    }
    return null;
  } catch {
    return null;
  }
}

export async function apiFetchAllBlogs(token: string): Promise<BlogItem[]> {
  const res = await fetch(`${getApiUrl()}/admin/blogs`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'cache-control': 'no-cache',
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to fetch all blogs');
  const data = await res.json();
  return data.map(mapBlogToCamel);
}

export async function apiCreateBlog(blog: Partial<BlogItem>, token: string): Promise<BlogItem> {
  const payload = {
    title: blog.title,
    h1: blog.h1 || blog.title,
    slug: blog.slug,
    content: blog.content,
    summary: blog.summary,
    image_url: blog.imageUrl,
    image_alt: blog.imageAlt || blog.title,
    author: blog.author,
    category: blog.category,
    read_time: blog.readTime,
    published: blog.published !== undefined ? blog.published : true,
    meta_title: blog.metaTitle || blog.title,
    meta_description: blog.metaDescription || blog.summary,
    canonical_url: blog.canonicalUrl,
    robots_index: blog.robotsIndex !== undefined ? blog.robotsIndex : true,
    robots_follow: blog.robotsFollow !== undefined ? blog.robotsFollow : true,
    keywords: blog.keywords,
    primary_keyword: blog.primaryKeyword,
    secondary_keywords: blog.secondaryKeywords,
    og_image: blog.ogImage || blog.imageUrl,
    twitter_image: blog.twitterImage || blog.imageUrl,
    faqs: blog.faqs
  };

  const res = await fetch(`${getApiUrl()}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create blog');
  const data = await res.json();
  return mapBlogToCamel(data);
}

export async function apiUpdateBlog(id: string, blog: Partial<BlogItem> & { create_redirect?: boolean }, token: string): Promise<BlogItem> {
  const payload: any = {};
  if (blog.title !== undefined) payload.title = blog.title;
  if (blog.h1 !== undefined) payload.h1 = blog.h1;
  if (blog.slug !== undefined) payload.slug = blog.slug;
  if (blog.content !== undefined) payload.content = blog.content;
  if (blog.summary !== undefined) payload.summary = blog.summary;
  if (blog.imageUrl !== undefined) payload.image_url = blog.imageUrl;
  if (blog.imageAlt !== undefined) payload.image_alt = blog.imageAlt;
  if (blog.author !== undefined) payload.author = blog.author;
  if (blog.category !== undefined) payload.category = blog.category;
  if (blog.readTime !== undefined) payload.read_time = blog.readTime;
  if (blog.published !== undefined) payload.published = blog.published;
  if (blog.metaTitle !== undefined) payload.meta_title = blog.metaTitle;
  if (blog.metaDescription !== undefined) payload.meta_description = blog.metaDescription;
  if (blog.canonicalUrl !== undefined) payload.canonical_url = blog.canonicalUrl;
  if (blog.robotsIndex !== undefined) payload.robots_index = blog.robotsIndex;
  if (blog.robotsFollow !== undefined) payload.robots_follow = blog.robotsFollow;
  if (blog.keywords !== undefined) payload.keywords = blog.keywords;
  if (blog.primaryKeyword !== undefined) payload.primary_keyword = blog.primaryKeyword;
  if (blog.secondaryKeywords !== undefined) payload.secondary_keywords = blog.secondaryKeywords;
  if (blog.ogImage !== undefined) payload.og_image = blog.ogImage;
  if (blog.twitterImage !== undefined) payload.twitter_image = blog.twitterImage;
  if (blog.faqs !== undefined) payload.faqs = blog.faqs;
  if (blog.create_redirect !== undefined) payload.create_redirect = blog.create_redirect;

  const res = await fetch(`${getApiUrl()}/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update blog');
  const data = await res.json();
  return mapBlogToCamel(data);
}

export async function apiDeleteBlog(id: string, token: string): Promise<any> {
  const res = await fetch(`${getApiUrl()}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete blog');
  return await res.json();
}

// -------------------------------------------------------------
// Redirects API Helpers
// -------------------------------------------------------------

export async function apiFetchRedirects(token: string): Promise<RedirectItem[]> {
  const res = await fetch(`${getApiUrl()}/redirects`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'cache-control': 'no-cache',
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to fetch redirects');
  return await res.json();
}

export async function apiCreateRedirect(data: Partial<RedirectItem>, token: string): Promise<RedirectItem> {
  const res = await fetch(`${getApiUrl()}/redirects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create redirect');
  }
  const result = await res.json();
  return result.redirect;
}

export async function apiUpdateRedirect(id: number, data: Partial<RedirectItem>, token: string): Promise<RedirectItem> {
  const res = await fetch(`${getApiUrl()}/redirects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update redirect');
  }
  const result = await res.json();
  return result.redirect;
}

export async function apiDeleteRedirect(id: number, token: string): Promise<any> {
  const res = await fetch(`${getApiUrl()}/redirects/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete redirect');
  return await res.json();
}

export async function fetchActiveRedirects(): Promise<{ source_url: string; destination_url: string; status_code: number }[]> {
  try {
    const res = await fetch(`${getApiUrl()}/redirects/active`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error('Failed to fetch active redirects:', e);
    return [];
  }
}

export async function fetchSitemapRoutes(): Promise<{ url: string; changefreq: string; priority: number; lastmod: string }[]> {
  try {
    const res = await fetch(`${getApiUrl()}/sitemap-routes`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.routes || [];
  } catch (e) {
    console.error('Failed to fetch sitemap routes:', e);
    return [];
  }
}

export async function fetchGlobalSeoSettings(): Promise<GlobalSeoSettings> {
  try {
    const res = await safeFetch(`${getApiUrl()}/seo`, { next: { revalidate: 60 } });
    if (!res || !res.ok) return initialSeoConfig;
    const data = await res.json();
    return {
      ...initialSeoConfig,
      ...(data.global || {}),
      siteName: data.global?.siteName || data.siteName || initialSeoConfig.siteName,
      defaultMetaDescription: data.global?.defaultMetaDescription || data.defaultMetaDescription || initialSeoConfig.defaultMetaDescription,
      defaultMetaKeywords: data.global?.defaultKeywords || data.defaultKeywords || initialSeoConfig.defaultMetaKeywords,
      pages: (data.pages || []).map((p: any) => ({
        pageSlug: p.page_slug,
        pageTitle: p.title,
        metaTitle: p.title,
        h1Heading: p.h1_heading || '',
        metaDescription: p.meta_description,
        canonicalUrl: p.canonical_url || '',
        robotsIndex: p.robots_index !== false,
        robotsFollow: p.robots_follow !== false,
        metaKeywords: p.keywords || '',
        focusKeyword: p.focus_keyword || '',
        secondaryKeywords: p.secondary_keywords || '',
        ogTitle: p.og_title || p.title,
        ogDescription: p.og_description || p.meta_description,
        ogImage: p.og_image || '',
        twitterTitle: p.twitter_title || p.og_title || p.title,
        twitterDescription: p.twitter_description || p.og_description || p.meta_description,
        twitterImage: p.twitter_image || p.og_image || '',
        schemaType: p.schema_type || 'WebPage',
        customSchemaJson: p.custom_schema_json || '',
        author: p.author || 'Faisal Hills Team'
      }))
    };
  } catch (e) {
    return initialSeoConfig;
  }
}

// -------------------------------------------------------------
// Legal Policies, Bank Accounts & Social Contact Types & Defaults
// -------------------------------------------------------------
export interface PolicySection {
  title: string;
  content: string;
}

export interface LegalPolicyData {
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export interface BankAccountItem {
  id: string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  branchCode: string;
  branchName: string;
  instructions: string;
}

export interface SocialLinksData {
  whatsapp: string;
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  twitter: string;
}

export interface ContactInfoData {
  whatsapp?: string;
  headOffice: string;
  siteOffice: string;
  salesDesk: string;
  phoneNumbers: string[];
  salesHotline: string;
  email: string;
}

export const defaultTermsOfService: LegalPolicyData = {
  title: 'Terms of Service',
  lastUpdated: 'August 2026',
  sections: [
    {
      title: '1. Terms & Conditions of Use',
      content: 'By accessing this website, you agree to comply with and be bound by these Terms of Service, all applicable laws, and regional real estate regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'
    },
    {
      title: '2. Sales Partner Disclaimer',
      content: 'This portal is operated by an authorized real estate sales agency and marketing partner. It is not the direct official website of the society developer (Zedem International or Faisal Town Group). All plot availability status, pricing charts, payment schedules, and installment rates are indicative of market values and are subject to correction or revision by the developer without prior notice.'
    },
    {
      title: '3. Revisions and Errata',
      content: 'The materials appearing on this website could include technical, typographical, or photographic errors. While we make every effort to verify information with on-ground mapping and the official developer ledger, we do not warrant that any of the materials on this website are completely accurate, complete, or current.'
    },
    {
      title: '4. Verification Prior to Payment',
      content: 'All buyers are advised to perform due diligence before making payments. Never transfer funds directly to individual sales agents; all bookings and installments must be paid via formal banking instruments (Pay Order, Demand Draft) in the name of the official society developer.'
    }
  ]
};

export const defaultPrivacyPolicy: LegalPolicyData = {
  title: 'Privacy Policy',
  lastUpdated: 'August 2026',
  sections: [
    {
      title: '1. Information We Collect',
      content: 'When you use our website or contact form, we collect the personal information you submit to us, which includes: your name, phone number, email address, inquiry interest, and device browser metadata.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'Your personal information is used exclusively to facilitate your real estate transactions and customer requests: to answer your specific inquiries about Faisal Hills plots, NOC status, prices, or payment plans, and to schedule site visits. We do not sell, rent, or trade your personal information with third parties.'
    },
    {
      title: '3. Cookies and Analytics',
      content: 'We use temporary and persistent cookies to record site visits and improve page speeds. Cookies help us understand which blocks and articles get the most attention. You can disable cookies in your browser settings at any time.'
    },
    {
      title: '4. Consent Acceptance',
      content: 'By submitting your details on our contact forms, you consent to our privacy policy and authorize our verified sales desk to reach out to you via call, WhatsApp, or email to assist with your inquiry.'
    }
  ]
};

export const defaultBankAccounts: BankAccountItem[] = [
  {
    id: 'bank-1',
    bankName: 'Habib Bank Limited (HBL)',
    accountTitle: 'Zedem International (Pvt) Ltd',
    accountNumber: '00427991827403',
    iban: 'PK36HABB0000427991827403',
    branchCode: '0042',
    branchName: 'Blue Area Branch, Islamabad',
    instructions: 'Please mention your Registration / Booking Form Number or Plot File Number on the deposit receipt.'
  },
  {
    id: 'bank-2',
    bankName: 'Meezan Bank Limited',
    accountTitle: 'Zedem International (Pvt) Ltd',
    accountNumber: '01028471928472',
    iban: 'PK55MEZN0001028471928472',
    branchCode: '0102',
    branchName: 'F-7 Markaz Branch, Islamabad',
    instructions: 'Islamic banking mode for overseas and local client installment payments.'
  }
];

export const defaultSocialLinks: SocialLinksData = {
  whatsapp: '+923331113177',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com'
};

export const defaultContactInfo: ContactInfoData = {
  whatsapp: '+92 333 1113177',
  headOffice: 'Faisal Tower, Faisal Town Main Fateh Jang Road N-80 near Tarnol Interchange Motorway M-1, Rawalpindi Pakistan.',
  siteOffice: 'Main Gate Entrance, N-5 GT Road, Near Taxila Bypass, Rawalpindi / Islamabad',
  salesDesk: '',
  phoneNumbers: [],
  salesHotline: '+92 333 1113177',
  email: 'info@faisalhillsislamabadfh.com'
};

// -------------------------------------------------------------
// Settings API Helpers
// -------------------------------------------------------------

export async function fetchSettingByKey<T>(key: string): Promise<T | null> {
  try {
    const res = await safeFetch(`${getApiUrl()}/settings/${key}`, {
      next: { revalidate: 60 }
    });
    if (!res || !res.ok) return null;
    return await res.json().catch(() => null);
  } catch {
    return null;
  }
}

export function formatWhatsAppUrl(rawNumber?: string, message?: string): string {
  const defaultText = message ? `?text=${encodeURIComponent(message)}` : '';
  if (!rawNumber || !rawNumber.trim()) return `https://wa.me/923331113177${defaultText}`;

  let digits = rawNumber.replace(/\D/g, '');
  if (digits.startsWith('0092')) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0')) {
    digits = '92' + digits.slice(1);
  } else if (!digits.startsWith('92') && (digits.length === 10 || digits.length === 11)) {
    digits = '92' + digits;
  }
  return `https://wa.me/${digits || '923331113177'}${defaultText}`;
}

export function formatTelUrl(rawNumber?: string): string {
  if (!rawNumber || !rawNumber.trim()) return 'tel:+923331113177';
  let cleaned = rawNumber.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('03')) {
    cleaned = '+92' + cleaned.slice(1);
  } else if (cleaned.startsWith('0')) {
    cleaned = '+92' + cleaned.slice(1);
  } else if (!cleaned.startsWith('+') && cleaned.startsWith('92')) {
    cleaned = '+' + cleaned;
  }
  return `tel:${cleaned || '+923331113177'}`;
}

// -------------------------------------------------------------
// Homepage CMS Interfaces & Defaults (100% Dynamic Content & Images)
// -------------------------------------------------------------

export interface TestimonialItem {
  id: string;
  name: string;
  locationOrType?: string;
  role?: string;
  rating: number;
  review?: string;
  quote?: string;
  plotOrBlock?: string;
  verified: boolean;
  date?: string;
}

export interface LandmarkCardItem {
  id: string;
  timeBadge: string;
  title: string;
  subLine: string;
  image: string;
  mapQuery?: string;
}

export interface WhyInvestItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tag?: string;
}

export interface AmenityCardItem {
  id: string;
  title: string;
  statusBadge?: string;
  bullets?: string[];
  desc?: string;
  image: string;
}

export interface InfraCarouselItem {
  id: string;
  badge: string;
  caption: string;
  image: string;
  category?: string;
}

export interface BlockSupplyItem {
  id?: string;
  block: string;
  profile: string;
  approxPlots: string;
  soldAs: string;
  possession: string;
  statusBadge?: string;
}

export interface PlotMarketRateItem {
  id?: string;
  block: string;
  marla5: string;
  marla10: string;
  kanal1: string;
  statusBadge?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface HomepageCMSData {
  hero: {
    badge?: string;
    h1: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    trustLine: string;
    bgImage: string;
  };
  statsBand: {
    stat1: { value: string; label: string; icon: string };
    stat2: { value: string; label: string; icon: string };
    stat3: { value: string; label: string; icon: string };
    stat4: { value: string; label: string; icon: string };
    stat5: { value: string; label: string; icon: string };
  };
  chairman: {
    label?: string;
    h2: string;
    quoteTitle: string;
    visibleParagraph: string;
    expandedParagraph: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    imageAlt: string;
  };
  tickerItems: string[];
  projectsByZedem: {
    label?: string;
    h2: string;
    projects: { name: string; href: string }[];
  };
  overview: {
    label?: string;
    h2: string;
    paragraph: string;
    linkText: string;
    linkHref: string;
    image: string;
    imageAlt: string;
  };
  atAGlance?: {
    label?: string;
    h2: string;
    items: { label: string; value: string }[];
  };
  location: {
    label?: string;
    h2: string;
    p1: string;
    p2?: string;
    p3?: string;
    linkText: string;
    linkHref: string;
    mapEmbedUrl?: string;
  };
  gettingThere?: {
    label?: string;
    h3: string;
    routes: { route: string; connects: string; time: string }[];
  };
  landmarks: {
    label?: string;
    h2: string;
    paragraph: string;
    cards: LandmarkCardItem[];
  };
  masterPlan: {
    label?: string;
    h2: string;
    paragraph: string;
    subParagraph?: string;
    downloadBtnText: string;
    downloadPdfUrl: string;
    fullscreenBtnText: string;
    previewImage?: string;
    specs?: { label: string; value: string }[];
  };
  blocksSection: {
    label?: string;
    h2: string;
    paragraph: string;
    supplyHeading?: string;
    supplySubline?: string;
    supplyRows?: BlockSupplyItem[];
  };
  plotsForSale: {
    badge?: string;
    h2: string;
    paragraph: string;
    btnText: string;
    ctaHeading: string;
    ctaText: string;
    ctaBtn1Text: string;
    ctaBtn2Text: string;
    ratesHeading?: string;
    ratesSubline?: string;
    ratesRows?: PlotMarketRateItem[];
  };
  flagships: {
    label?: string;
    h2: string;
    paragraph: string;
    card1: { title: string; subtitle: string; desc: string; btnText: string; btnHref: string; image: string; alt: string };
    card2: { title: string; subtitle: string; desc: string; btnText: string; btnHref: string; image: string; alt: string };
  };
  paymentPlan: {
    label?: string;
    h2: string;
    paragraph: string;
    calcBtnText: string;
    sectionLabel?: string;
    card1: { title: string; desc: string };
    card2: { title: string; desc: string };
    card3: { title: string; desc: string };
    card4: { title: string; desc: string };
    image: string;
    imageCaption: string;
    downloadBtnText: string;
    bookBtnText: string;
  };
  bookingSteps: {
    label?: string;
    h2: string;
    subline: string;
    steps: { number: string; stepTag: string; title: string; desc: string }[];
  };
  whyInvest: {
    label?: string;
    h2: string;
    paragraph: string;
    benefits: WhyInvestItem[];
  };
  amenities: {
    label?: string;
    h2: string;
    paragraph: string;
    cards: AmenityCardItem[];
  };
  testimonials: {
    label?: string;
    h2: string;
    paragraph: string;
    items: TestimonialItem[];
  };
  infrastructure: {
    label?: string;
    h2: string;
    paragraph: string;
    whatsappBtnText: string;
    cards: InfraCarouselItem[];
  };
  photoGallery: {
    label?: string;
    h2: string;
    paragraph: string;
    items: { title: string; category: string; desc: string; image: string }[];
  };
  discoverFtStats: {
    label?: string;
    stats: { number: string; label: string }[];
  };
  faqs: {
    label?: string;
    h2: string;
    items: FaqItem[];
  };
  finalCta: {
    label?: string;
    h2: string;
    paragraph: string;
    callBtnText: string;
    whatsappBtnText: string;
    visitBtnText: string;
  };
  footer: {
    tagline: string;
    disclaimer: string;
  };
}

export const initialHomepageCMS: HomepageCMSData = {
  hero: {
    badge: 'RDA Approved • Main GT Road Taxila',
    h1: 'Faisal Hills Islamabad',
    subtitle: 'Master-planned society by Zedem International. 5 Marla to 2 Kanal residential plots, commercial avenues, and iconic high-rises at the foothills of Margalla.',
    formTitle: 'Book Your Plot / Flat',
    formSubtitle: 'Get verified 2026 rates, payment plan & plot selection guide.',
    trustLine: 'Your information is 100% secure — we reply on WhatsApp.',
    bgImage: '/images/faisal-hills-arc-gate.webp'
  },
  statsBand: {
    stat1: { value: '11,823', label: 'KANALS RDA-APPROVED', icon: 'Maximize' },
    stat2: { value: '7', label: 'PLANNED BLOCKS', icon: 'Building' },
    stat3: { value: '2016', label: 'LAUNCHED', icon: 'Award' },
    stat4: { value: '100%', label: 'RDA APPROVED NOC', icon: 'Shield' },
    stat5: { value: '32,000+', label: 'RESIDENTIAL & COMMERCIAL PLOTS', icon: 'Trees' }
  },
  chairman: {
    label: '',
    h2: 'Chairman & Founder — Chaudhry Abdul Majeed',
    quoteTitle: 'A Legacy of Excellence & Uncompromising Delivery in Real Estate',
    visibleParagraph: 'Faisal Hills Islamabad is developed by Zedem International under the leadership of Chaudhry Abdul Majeed, the founder of Faisal Town Group.',
    expandedParagraph: 'His group is behind some of the twin cities\' best-known communities, including Faisal Town Phase 1, Faisal Town Phase 2, Faisal Margalla City and Faisal Hills. At Faisal Hills, that experience shows on the ground: families already live in the developed blocks, and landmark projects such as Faisal Jewel and Hills Walk are rising within the society.',
    buttonText: 'Discover More About Zedem International',
    buttonLink: '/about-us',
    image: '/images/chaudhry-abdul-majeed.webp',
    imageAlt: 'Chaudhry Abdul Majeed, Chairman of Faisal Town Group and Zedem International'
  },
  tickerItems: [
    'FAISAL HILLS ISLAMABAD',
    '100% RDA APPROVED SOCIETY',
    'LIVING AT THE MARGALLA FOOTHILLS',
    '225FT MAIN BOULEVARD',
    'RESIDENTIAL & COMMERCIAL PLOTS',
    'A PROJECT BY ZEDEM INTERNATIONAL',
    'SECURE, LEGALLY APPROVED INVESTMENT',
    'POSSESSION IN DEVELOPED BLOCKS'
  ],
  projectsByZedem: {
    label: '',
    h2: 'Our Projects by Zedem International',
    projects: [
      { name: 'Faisal Town Phase 1', href: '/about-us' },
      { name: 'Faisal Town Phase 2', href: '/about-us' },
      { name: 'Faisal Hills', href: '/faisal-hills-blocks' },
      { name: 'Faisal Margalla City', href: '/about-us' },
      { name: 'Faisal Heights', href: '/about-us' },
      { name: 'Faisal Jewel', href: '/blocks/faisal-jewel-islamabad' }
    ]
  },
  overview: {
    label: '',
    h2: 'Faisal Hills Islamabad Overview',
    paragraph: 'Faisal Hills Islamabad is a master-planned, RDA-approved gated community on the main N-5 GT Road near Taxila, developed by Zedem International. Spread over 11,823 kanals with the Margalla Hills as its backdrop, it offers 5 Marla to 2 Kanal residential plots, commercial plots and high-rise apartments. With families already living in its developed blocks and direct access to Islamabad and Rawalpindi, it suits both homebuilders and long-term investors.',
    linkText: 'Discover More About Faisal Hills',
    linkHref: '/about-us',
    image: '/images/faisal-hills-overview.webp',
    imageAlt: 'Faisal Hills Islamabad aerial view with Margalla Hills backdrop'
  },
  atAGlance: {
    label: '',
    h2: 'Faisal Hills at a Glance',
    items: [
      { label: 'Approval', value: 'NOC from the Rawalpindi Development Authority (RDA)' },
      { label: 'Approved area', value: '11,823.5 kanals' },
      { label: 'Launched', value: '2016' },
      { label: 'Location', value: 'Main GT Road (N-5), near Taxila' },
      { label: 'Blocks', value: 'Executive, A, B, B Extension, C, D, Prime, Hill Estate View' },
      { label: 'Plot sizes', value: '5 Marla to 2 Kanal residential; commercial plots in selected blocks' },
      { label: 'Payment', value: 'Lump sum in developed blocks; installments in newer blocks' },
      { label: 'Possession', value: 'Available in Executive and A; partial or pending elsewhere' }
    ]
  },
  location: {
    label: '',
    h2: 'Faisal Hills Islamabad: Main GT Road near Taxila',
    p1: 'Faisal Hills fronts the Main GT Road (N-5), the highway linking Islamabad and Rawalpindi with Taxila, Wah Cantt and Peshawar. Its main entrance, beside the Executive Block, opens onto the GT Road, and the society extends back toward the Margalla foothills. Sector B-17 (Multi Gardens / MPCHS) adjoins it on the Islamabad side; Taxila city and Taxila Cantonment lie to the west.',
    linkText: 'Explore Complete Location Map & Sector Boundaries',
    linkHref: '/faisal-hills-location',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Faisal%20Hills%20Taxila&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  gettingThere: {
    label: '',
    h3: 'Getting There',
    routes: [
      { route: 'GT Road (N-5)', connects: 'Direct frontage; main entrance', time: 'Direct (0 Min)' },
      { route: 'Margalla Avenue', connects: 'Western sectors of Islamabad (D-12, E-11, F-10)', time: '~15–20 Mins' },
      { route: 'M-1 Motorway', connects: 'Peshawar and the northern corridor', time: '~5–8 Mins' },
      { route: 'Srinagar Highway', connects: 'Central Islamabad and Blue Area', time: '~25–30 Mins' },
      { route: 'New Islamabad International Airport', connects: 'Air travel', time: '~25–30 Mins' },
      { route: 'Taxila / Wah Cantt', connects: 'Shopping, hospitals, services', time: '~5–10 Mins' }
    ]
  },
  landmarks: {
    label: '',
    h2: 'Nearby Landmarks of Faisal Hills',
    paragraph: 'Positioned on the historic GT Road (N-5), Faisal Hills offers practical travel times to key educational institutions, heritage hubs, and neighboring twin-city destinations.',
    cards: [
      {
        id: 'lm-1',
        timeBadge: '~2–4 Mins',
        title: 'Sector B-17 / Multi Gardens (MPCHS)',
        subLine: 'Directly Adjoining Twin-City Mega Housing Society',
        image: '/images/landmarks/sector-b17-mpchs.webp'
      },
      {
        id: 'lm-2',
        timeBadge: '~5–8 Mins',
        title: 'HITEC University, Taxila',
        subLine: 'Premier Engineering, Medical & Technology Campus',
        image: '/images/landmarks/hitec-university-taxila.webp'
      },
      {
        id: 'lm-3',
        timeBadge: '~8–10 Mins',
        title: 'University of Engineering and Technology (UET), Taxila',
        subLine: 'Top Tier Public Engineering University',
        image: '/images/landmarks/uet-taxila-campus.webp'
      },
      {
        id: 'lm-4',
        timeBadge: '~5 Mins',
        title: 'Taxila Museum and the Gandhara heritage sites',
        subLine: 'UNESCO World Heritage Archaeological Landmark',
        image: '/images/landmarks/taxila-museum-gandhara.webp'
      },
      {
        id: 'lm-5',
        timeBadge: '~10–12 Mins',
        title: 'Wah Cantt',
        subLine: 'Well-established military cantonment with schools, hospitals and commercial zones.',
        image: '/images/landmarks/wah-cantonment.webp'
      },
    ]
  },
  masterPlan: {
    label: 'Official Master Blueprint',
    h2: 'Faisal Hills Master Plan Map & Sector Layout',
    paragraph: 'The official RDA-approved master plan of Faisal Hills Islamabad encompasses 11,823.5 kanals across eight well-planned sectors: Executive, Block A, Block B, Block B Extension, Block C, Block D, Prime Block, and Hill Estate View. Centered along a 225-foot Main Boulevard with the scenic Margalla Hills in view, the master plan features 5 Marla to 2 Kanal residential plots, high-rise commercial avenues including Faisal Jewel and Hills Walk, parks, schools, and medical facilities.',
    subParagraph: 'Explore sector boundaries, street cut numbers, and commercial zones with our interactive Ultra-HD blueprint viewer, or download the official high-resolution PDF for offline reference.',
    downloadBtnText: 'Download Master Plan',
    downloadPdfUrl: '/FAISAL HILLS MASTER PLAN.pdf',
    fullscreenBtnText: 'Launch Fullscreen Map',
    previewImage: '/images/faisal-hills-master-plan-preview.webp',
    specs: [

    ]
  },
  blocksSection: {
    label: '',
    h2: 'Explore Faisal Hills Blocks & Sectors',
    paragraph: 'Select a block to see its location advantages, development status and available plots.',
    supplyHeading: 'Blocks, Possession and Plot Supply',
    supplySubline: 'The Faisal Hills master plan has eight blocks. Blocks nearest the GT Road are the most developed; blocks further in are newer, cheaper to enter and mostly sold on installments, but at earlier stages of development.',
    supplyRows: [
      {
        id: 'blk-sup-1',
        block: 'Executive Block',
        profile: 'Commercial and civic hub at the GT Road entrance',
        approxPlots: '1,450',
        soldAs: 'Lump sum',
        possession: 'Available',
        statusBadge: 'Possession Available'
      },
      {
        id: 'blk-sup-2',
        block: 'Block A',
        profile: 'Largest developed residential block',
        approxPlots: '6,250',
        soldAs: 'Lump sum',
        possession: 'Available; residents on site',
        statusBadge: 'Inhabited & Ready'
      },
      {
        id: 'blk-sup-3',
        block: 'Block B',
        profile: 'Residential, between A and C',
        approxPlots: '8,050',
        soldAs: 'Lump sum / Resale',
        possession: 'Possession-ready plots in some sectors',
        statusBadge: 'Sector-Wise Possession'
      },
      {
        id: 'blk-sup-4',
        block: 'Block C',
        profile: 'Large; mostly 5 and 8 Marla',
        approxPlots: '8,350',
        soldAs: 'Lump sum / Resale',
        possession: 'Possession-ready plots in some sectors',
        statusBadge: 'Sector-Wise Possession'
      },
      {
        id: 'blk-sup-5',
        block: 'Block D',
        profile: 'Residential',
        approxPlots: '2,350',
        soldAs: 'Installments (Aug 2026)',
        possession: 'Under Development',
        statusBadge: 'Under Development'
      },
      {
        id: 'blk-sup-6',
        block: 'Prime Block',
        profile: 'Newest; residential and commercial',
        approxPlots: '3,200+',
        soldAs: 'Installments',
        possession: 'In Progress / Not yet',
        statusBadge: 'In Progress'
      }
    ]
  },
  plotsForSale: {
    badge: '',
    h2: 'Plots for Sale in Faisal Hills',
    paragraph: 'Browse available residential and commercial plots across all blocks. Check current asking prices, sizes and facing, and confirm documents with our sales desk before booking.',
    btnText: 'VIEW COMPLETE PLOT DIRECTORY',
    ctaHeading: 'Looking for a Specific Plot Number or Corner Position?',
    ctaText: 'Our sales desk handles direct-owner resale files and developer allocation plots across all blocks, with documents verified before booking.',
    ctaBtn1Text: 'WHATSAPP SALES DESK',
    ctaBtn2Text: 'ALL PLOTS DIRECTORY',
    ratesHeading: 'Plots for Sale in Faisal Hills: Current Rates',
    ratesSubline: 'These are open-market asking prices. What a specific plot fetches depends on its position (corner, park-facing or on a main road), how developed its block is, and whether it is a balloted plot or an unballoted file.',
    ratesRows: [
      {
        id: 'rate-1',
        block: 'Executive Block',
        marla5: 'PKR 70–90 lakh',
        marla10: 'PKR 1.25–1.50 crore',
        kanal1: 'PKR 2.00–2.90 crore',
        statusBadge: 'Commercial & Civic Hub'
      },
      {
        id: 'rate-2',
        block: 'Block A',
        marla5: 'PKR 55–70 lakh',
        marla10: 'PKR 0.95–1.40 crore',
        kanal1: 'PKR 1.45–2.25 crore',
        statusBadge: 'Inhabited Residential'
      },
      {
        id: 'rate-3',
        block: 'Block B',
        marla5: 'PKR 40–65 lakh',
        marla10: 'PKR 0.75–1.15 crore',
        kanal1: 'PKR 1.15–1.75 crore',
        statusBadge: 'Between A & C'
      },
      {
        id: 'rate-4',
        block: 'Block B Extension',
        marla5: 'PKR 45–65 lakh',
        marla10: 'PKR 0.75–1.45 crore',
        kanal1: '—',
        statusBadge: 'Extension Sector'
      },
      {
        id: 'rate-5',
        block: 'Block C',
        marla5: 'PKR 35–60 lakh',
        marla10: 'PKR 1.10–1.45 crore',
        kanal1: 'PKR 1.20–1.75 crore',
        statusBadge: '5 & 8 Marla Hub'
      },
      {
        id: 'rate-6',
        block: 'Block D',
        marla5: 'PKR 40–55 lakh',
        marla10: 'PKR 0.70–1.15 crore',
        kanal1: 'PKR 1.40–2.10 crore',
        statusBadge: 'Fast-Track Dev'
      },
      {
        id: 'rate-7',
        block: 'Prime Block',
        marla5: 'PKR 45–70 lakh',
        marla10: 'PKR 1.00–1.50 crore',
        kanal1: 'PKR 1.75–2.50 crore',
        statusBadge: 'Newest Prime Sector'
      }
    ]
  },
  flagships: {
    label: '',
    h2: 'Faisal Hills High-Rise & Commercial Flagships',
    paragraph: 'Landmark high-rise and lifestyle destinations being built inside Faisal Hills Islamabad.',
    card1: {
      title: 'Faisal Jewel',
      subtitle: '27-Storey High-Rise Landmark',
      desc: 'The crown jewel of Faisal Hills featuring a luxury 4-star hotel, shopping mall, corporate suites, and premium serviced apartments with scenic Margalla views.',
      btnText: 'Explore Faisal Jewel',
      btnHref: '/blocks/faisal-jewel-islamabad',
      image: '/images/faisal-jewels-tower.webp',
      alt: 'Faisal Jewel 27-storey high-rise tower in Faisal Hills Islamabad'
    },
    card2: {
      title: 'Hills Walk',
      subtitle: 'Open-Air Commercial Boulevard',
      desc: 'European-style open-air pedestrian shopping street featuring flagship retail outlets, cafes, restaurants, and lakeside recreational promenades.',
      btnText: 'Explore Hills Walk',
      btnHref: '/blocks/hills-walk',
      image: '/images/hills-walk.webp',
      alt: 'Hills Walk open-air commercial boulevard in Faisal Hills'
    }
  },
  paymentPlan: {
    label: '',
    h2: 'Faisal Hills Islamabad Payment Plan 2026',
    paragraph: 'The most common question we get is about the payment plan, and for good reason. Knowing exactly what you pay, when, and what you receive is the foundation of a confident decision. Here is how it works.',
    calcBtnText: 'Open Custom Calculator',
    sectionLabel: '',
    card1: {
      title: 'Booking Amount',
      desc: 'A set percentage of the plot value is paid at booking to reserve your specific plot and block.'
    },
    card2: {
      title: 'Down Payment',
      desc: 'The balance of the down payment is paid to confirm formal allocation with the developer.'
    },
    card3: {
      title: 'Payment Schedule',
      desc: 'The remaining amount is paid in scheduled quarterly installments or as full payment depending on the plot category.'
    },
    card4: {
      title: 'No Hidden Charges',
      desc: 'Development charges, transfer fees and possession charges are disclosed in writing at booking.'
    },
    image: '/images/faisal-hills-payment-plan-chart.webp',
    imageCaption: 'Official payment schedule — verify the latest version before booking.',
    downloadBtnText: 'Download Payment Plan',
    bookBtnText: 'Book Plot On This Plan'
  },
  bookingSteps: {
    label: '',
    h2: 'A Simple 5-Step Booking Process',
    subline: 'Scroll down to explore each step — from your first inquiry to the day you receive possession.',
    steps: [
      {
        number: '01',
        stepTag: 'Selection',
        title: 'Enquire & Choose Your Plot',
        desc: 'Contact our sales team by phone, WhatsApp or the online form. Share your budget, plot size and preferred block, and we will show you verified options with current pricing.'
      },
      {
        number: '02',
        stepTag: 'Documentation',
        title: 'Reserve & Submit Documents',
        desc: 'Complete the booking form with your CNIC copy (NICOP for overseas buyers), next-of-kin CNIC and photos. Pay only by pay order or bank transfer in the developer\'s official name.'
      },
      {
        number: '03',
        stepTag: 'Allotment',
        title: 'Receive Your Allotment Letter',
        desc: 'Your official allotment letter is issued by the developer, confirming plot number, block, size, total value and payment schedule.'
      },
      {
        number: '04',
        stepTag: 'Payments',
        title: 'Complete Payments & Track Progress',
        desc: 'Pay according to your agreed schedule. We share regular development updates, and site visits, including live video tours for overseas buyers, can be arranged anytime.'
      },
      {
        number: '05',
        stepTag: 'Handover',
        title: 'Take Possession',
        desc: 'Once possession charges are cleared, your plot is demarcated and handed over with documentation ready for construction. Welcome to Faisal Hills.'
      }
    ]
  },
  whyInvest: {
    label: '',
    h2: 'Why Faisal Hills Is a Smart Property Investment in 2026',
    paragraph: 'Land value depends on three things: legal status, location, and real development on the ground. Faisal Hills Islamabad offers all three, which is why it attracts both overseas investors and families building their homes.',
    benefits: [
      {
        id: 'ben-1',
        number: '01',
        title: 'Legally Secure — RDA Approved',
        description: 'Faisal Hills holds an NOC from the Rawalpindi Development Authority covering 11,823.5 kanals. Allotment, transfer and possession follow a legally recognised process, removing the biggest risk buyers face in the twin cities.',
        tag: 'Legal Protection'
      },
      {
        id: 'ben-2',
        number: '02',
        title: 'Permanent GT Road Advantage',
        description: 'Properties on major arterial roads keep their value because access doesn\'t depend on future projects. Direct GT Road frontage gives Faisal Hills lasting residential and commercial appeal.',
        tag: 'Direct Access'
      },
      {
        id: 'ben-3',
        number: '03',
        title: 'Development You Can Visit',
        description: 'Families live in the developed blocks, schools are operating, and landmark projects like Faisal Jewel and Hills Walk are under construction. You can see progress for yourself before investing.',
        tag: 'On-Ground Reality'
      },
      {
        id: 'ben-4',
        number: '04',
        title: 'More Land Per Rupee',
        description: 'Compared with established Islamabad sectors, Faisal Hills offers larger plots at lower entry prices, with tremendous appreciation room as the community matures.',
        tag: 'High Value'
      },
      {
        id: 'ben-5',
        number: '05',
        title: 'Trusted Developer Track Record',
        description: 'Zedem International and Faisal Town Group have delivered inhabited communities across the twin cities, including Faisal Town Phase 1.',
        tag: 'Zedem Quality'
      },
      {
        id: 'ben-6',
        number: '06',
        title: 'Built for Overseas Buyers',
        description: 'NICOP booking, live video site tours, document verification and WhatsApp support in your time zone for buyers in the UK, UAE and Gulf.',
        tag: 'Overseas Desk'
      }
    ]
  },
  amenities: {
    label: 'World-Class Infrastructure',
    h2: 'Facilities and Projects: Built and Planned',
    paragraph: 'Explore the on-ground built reality and upcoming landmark developments across Faisal Hills — from operational schools and sports arenas to iconic towers and community parks.',
    cards: [
      {
        id: 'fac-1',
        title: 'Main boulevard and GT Road entrance',
        statusBadge: 'Built (225 ft)',
        desc: '225ft wide central boulevard connecting directly to Main GT Road (N-5) with grand entrance gates, LED illumination, and manicured green medians.',
        image: '/images/amenities/main-boulevard-225ft.webp'
      },
      {
        id: 'fac-2',
        title: 'Roots International School, Faisal Hills campus',
        statusBadge: 'Operational',
        desc: 'Fully operational international-standard campus offering primary to higher secondary schooling within the society boundaries.',
        image: '/images/roots-international-school-faisal-hills.webp'
      },
      {
        id: 'fac-3',
        title: 'Mosques, Block A and Executive Block',
        statusBadge: 'Operational',
        desc: 'Grand Jamia Mosque and sector mosques with air-conditioned prayer halls, ablution areas, and elegant Islamic architectural design.',
        image: '/images/faisal-hills-jamia-mosque.webp'
      },
      {
        id: 'fac-4',
        title: 'Multipurpose sports arena (cricket, football, tennis, gym)',
        statusBadge: 'Inaugurated',
        desc: 'State-of-the-art sports arena featuring floodlit cricket pitch, futsal ground, tennis courts, and fitness gymnasium.',
        image: '/images/faisal-hills-sports-arena.webp'
      },
      {
        id: 'fac-5',
        title: 'Parks, Block A and Executive Block',
        statusBadge: 'Built',
        desc: 'Sprawling family parks, illuminated Glow Park, jogging tracks, botanical gardens, and children amusement zones.',
        image: '/images/faisal-hills-glow-park.webp'
      },
      {
        id: 'fac-6',
        title: 'Miyawaki (dense native) forest',
        statusBadge: 'Planted',
        desc: 'Eco-reserve urban forest planted with indigenous Margalla trees promoting biodiversity and natural micro-climates.',
        image: '/images/faisal-hills-miyawaki-forest.webp'
      },
      {
        id: 'fac-7',
        title: 'Faisal Jewel, Executive Block',
        statusBadge: 'Under construction',
        desc: '27-storey iconic mixed-use skyscraper featuring a 4-star luxury hotel, retail mall, corporate suites, and serviced apartments.',
        image: '/images/faisal-jewels-tower.webp'
      },
      {
        id: 'fac-8',
        title: 'Hill Walk Downtown — a walking street of shops, cafés, apartments and offices',
        statusBadge: 'Launched; under development',
        desc: 'European-inspired open-air pedestrian lifestyle promenade with flagship retail outlets, cafes, restaurants, and promenades.',
        image: '/images/hills-walk.webp'
      },
      {
        id: 'fac-9',
        title: 'Arch monument',
        statusBadge: 'Completed',
        desc: 'Majestic classical architecture arch monument welcoming residents and visitors at the primary GT Road entrance.',
        image: '/images/faisal-hills-arc-entrance.webp'
      },
      {
        id: 'fac-10',
        title: 'Hospital, Block A',
        statusBadge: 'Planned',
        desc: 'Multispecialty healthcare hospital and 24/7 emergency diagnostic center planned in Block A for resident medical care.',
        image: '/images/faisal-hills-medical-complex.webp'
      },
      {
        id: 'fac-11',
        title: 'Swimming pool',
        statusBadge: 'Planned',
        desc: 'Temperature-controlled community swimming pool, sun deck, cabanas, and aquatic leisure club.',
        image: '/images/amenities/swimming-pool.webp'
      }
    ]
  },
  testimonials: {
    label: '',
    h2: 'What Our Buyers Say',
    paragraph: 'Real experiences from overseas investors and homebuyers who booked through our sales desk.',
    items: [
      {
        id: 'test-1',
        name: 'Usman A.',
        locationOrType: 'Dubai, UAE • Overseas Investor',
        rating: 5,
        review: 'Booking my 10 Marla plot in Executive Block from Dubai was completely seamless. The sales desk verified the allotment file with Zedem International and arranged a live video tour of the on-ground development.',
        plotOrBlock: 'Executive Block (10 Marla)',
        verified: true,
        date: 'August 2026'
      },
      {
        id: 'test-2',
        name: 'Dr. Tariq M.',
        locationOrType: 'London, UK • Homebuilder',
        rating: 5,
        review: 'I wanted to secure a plot near Margalla Hills for our family home. The team gave transparent guidance on RDA NOC approval, possession timelines in Block A, and legal verification.',
        plotOrBlock: 'Block A (1 Kanal)',
        verified: true,
        date: 'July 2026'
      },
      {
        id: 'test-3',
        name: 'Farhan & Sadia K.',
        locationOrType: 'Islamabad, PK • Resident Buyers',
        rating: 5,
        review: 'We inspected multiple societies along GT Road, but Faisal Hills stood out for its 225ft wide roads, underground electricity in Prime Block, and accessible location. Very satisfied with our purchase.',
        plotOrBlock: 'Prime Block (5 Marla)',
        verified: true,
        date: 'September 2026'
      }
    ]
  },
  infrastructure: {
    label: '',
    h2: 'Infrastructure of Faisal Hills',
    paragraph: 'Wide streets and boulevards from 40 to 225 feet give Faisal Hills a spacious, organised layout, planned to modern urban-design standards.',
    whatsappBtnText: 'CHAT ON WHATSAPP',
    cards: [
      {
        id: 'inf-1',
        badge: 'Commercial',
        caption: 'Hills Walk — Open-Air Commercial Boulevard',
        image: '/images/infrastructure/hills-walk-boulevard.webp',
        category: 'Commercial'
      },
      {
        id: 'inf-2',
        badge: 'Main Gate',
        caption: 'Faisal Hills Arc — Architectural Landmark',
        image: '/images/infrastructure/faisal-hills-arc.webp',
        category: 'Entrance'
      },
      {
        id: 'inf-3',
        badge: 'High-Rise',
        caption: 'Faisal Jewel — 27-Storey Landmark Tower',
        image: '/images/infrastructure/faisal-jewel-construction.webp',
        category: 'Towers'
      },
      {
        id: 'inf-4',
        badge: 'Executive',
        caption: 'Sports Arena — Executive Block',
        image: '/images/infrastructure/sports-arena.webp',
        category: 'Amenities'
      },
      {
        id: 'inf-5',
        badge: 'Education',
        caption: 'Roots International Schools & Colleges',
        image: '/images/infrastructure/roots-school.webp',
        category: 'Amenities'
      },
      {
        id: 'inf-6',
        badge: 'Block C',
        caption: 'Miyawaki Forest — Block C',
        image: '/images/infrastructure/miyawaki-forest.webp',
        category: 'Infrastructure'
      },
      {
        id: 'inf-7',
        badge: 'Downtown',
        caption: 'Faisal Hills Downtown — Civic Center',
        image: '/images/infrastructure/civic-center.webp',
        category: 'Infrastructure'
      },
      {
        id: 'inf-8',
        badge: 'Block A',
        caption: 'Glow Park — Block A',
        image: '/images/infrastructure/glow-park.webp',
        category: 'Amenities'
      }
    ]
  },
  photoGallery: {
    label: '',
    h2: 'On-Site Development & Photo Gallery',
    paragraph: 'Recent photography of Faisal Hills entrance, boulevards, mosques and high-rise construction. (Updated September 2026)',
    items: [
      {
        title: 'Faisal Hills Arc Main Entrance',
        category: 'Entrance',
        desc: 'Grand arc entrance on GT Road with guarded security checkpoint.',
        image: '/images/gallery/arc-main-gate.webp'
      },
      {
        title: 'Faisal Jewel Tower Construction',
        category: 'Towers',
        desc: '27-storey high-rise with hotel, apartments and commercial floors.',
        image: '/images/gallery/faisal-jewel-crane.webp'
      },
      {
        title: '225ft Main Boulevard',
        category: 'Infrastructure',
        desc: 'Wide carpeted boulevard with commercial plazas.',
        image: '/images/gallery/main-boulevard-paved.webp'
      },
      {
        title: 'On-Ground Development Work',
        category: 'Infrastructure',
        desc: 'Road cutting, sewerage laying and plot levelling in progress.',
        image: '/images/gallery/heavy-machinery-roads.webp'
      },
      {
        title: 'Hills Walk Aerial View',
        category: 'Infrastructure',
        desc: 'Pedestrian-friendly commercial boulevard near the Margalla Hills.',
        image: '/images/gallery/hills-walk-aerial.webp'
      },
      {
        title: 'Faisal Hills Drone View',
        category: 'Amenities',
        desc: 'Overhead view of the developed blocks and natural landscape.',
        image: '/images/gallery/overhead-valley.webp'
      }
    ]
  },
  discoverFtStats: {
    label: '',
    stats: [
      { number: '11,823+', label: 'KANALS TOTAL LAND' },
      { number: '7', label: 'MASTER PLANNED SECTORS' },
      { number: '32,000+', label: 'RESIDENTIAL & COMMERCIAL PLOTS' },
      { number: '225 FT', label: 'MAIN BOULEVARD ROAD' },
      { number: '100%', label: 'RDA APPROVED NOC' }
    ]
  },
  faqs: {
    label: 'Got Questions?',
    h2: 'Frequently Asked Questions',
    items: [
      {
        q: 'Is Faisal Hills approved by RDA?',
        a: 'Yes. Faisal Hills holds a No Objection Certificate from the Rawalpindi Development Authority covering 11,823.5 kanals. The NOC approves the scheme; individual plots are verified at the society office.'
      },
      {
        q: 'Is Faisal Hills in Islamabad or Rawalpindi?',
        a: 'Rawalpindi District. It is on the Main GT Road (N-5) near Taxila, next to Islamabad\'s Sector B-17, which is why it is marketed as Faisal Hills Islamabad.'
      },
      {
        q: 'Who is the developer of Faisal Hills?',
        a: 'Zedem International, the developer of the Faisal Town projects, under Chairman Chaudhry Abdul Majeed. The project launched in 2016.'
      },
      {
        q: 'How many blocks does Faisal Hills have?',
        a: 'Eight: Executive, A, B, B Extension, C, D, Prime and Hill Estate View.'
      },
      {
        q: 'Can I build a house in Faisal Hills now?',
        a: 'Yes, in developed blocks. The Executive Block and Block A have possession, and possession-ready plots have been offered in parts of Blocks B and C. Confirm the status of the specific plot.'
      },
      {
        q: 'What is the Faisal Hills payment plan for 2026?',
        a: 'The latest reported plan is for Prime Block: a down payment, then 10 quarterly installments over 2.5 years, with development charges included and a 20% discount for full payment. Confirm against this month\'s official schedule.'
      },
      {
        q: 'Are installments available in Block A or the Executive Block?',
        a: 'Not currently, according to the developer\'s latest published update; these blocks are sold on full payment.'
      },
      {
        q: 'What are plot prices in Faisal Hills?',
        a: 'As of 2026, open-market asking prices run from about PKR 35 lakh for a 5 Marla plot in Block C to about PKR 2.9 crore for a 1 Kanal plot in the Executive Block. A 5 Marla plot costs roughly PKR 35–90 lakh depending on the block. On the developer\'s Prime Block plan, a 5.55 Marla plot is PKR 5.99 million, payable in installments.'
      },
      {
        q: 'Why is a plot listed as 5.55 Marla instead of 5 Marla?',
        a: 'It is the same 25 × 50 ft plot measured with a 225 sq ft Marla instead of 250 sq ft. Compare plots by dimensions.'
      },
      {
        q: 'What documents are needed to book a plot?',
        a: 'Usually copies of your CNIC and your next of kin\'s CNIC, passport-size photographs and proof of payment.'
      },
      {
        q: 'Can overseas Pakistanis buy in Faisal Hills?',
        a: 'Yes, and transfers can usually be completed through an authorised representative.'
      },
      {
        q: 'Is Faisal Hills a good investment?',
        a: 'It depends on the block, your budget and your timeline. Strengths: RDA approval, GT Road location and developed blocks with residents. Risks: location outside ICT, uneven development between blocks and the uncertainty of unballoted files.'
      }
    ]
  },
  finalCta: {
    h2: 'Ready to Secure Your Plot in Faisal Hills?',
    paragraph: 'Talk to our sales desk to compare blocks, check verified availability, get the latest payment plan, or book a physical site visit or live video tour.',
    callBtnText: 'CALL NOW',
    whatsappBtnText: 'WHATSAPP',
    visitBtnText: 'BOOK A SITE VISIT'
  },
  footer: {
    tagline: 'Your trusted sales partner for Faisal Hills Islamabad, a Faisal Town Group project by Zedem International.',
    disclaimer: 'This website is operated by an authorized real estate sales and marketing partner, and is not the direct official portal of the developer (Zedem International). All pricing, payment plans, and plot availability are subject to market conditions and developer revisions.'
  }
};

export async function fetchHomepageCMS(): Promise<HomepageCMSData> {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('faisal_homepage_cms');
      if (stored) {
        const parsed = JSON.parse(stored);
        let mergedAmenities = { ...initialHomepageCMS.amenities, ...(parsed.amenities || {}) };
        if (!parsed.amenities?.cards || parsed.amenities.cards.length < 11 || parsed.amenities.cards[0]?.image === parsed.amenities.cards[1]?.image || parsed.amenities.cards[0]?.image?.includes('roots-international')) {
          mergedAmenities.cards = initialHomepageCMS.amenities.cards;
        }

        let mergedFaqs = { ...initialHomepageCMS.faqs, ...(parsed.faqs || {}) };
        if (!parsed.faqs?.items || parsed.faqs.items.length < 12) {
          mergedFaqs.items = initialHomepageCMS.faqs.items;
        }

        let mergedBlocks = { ...initialHomepageCMS.blocksSection, ...(parsed.blocksSection || {}) };
        if (!parsed.blocksSection?.supplyRows || parsed.blocksSection.supplyRows.length === 0) {
          mergedBlocks.supplyRows = initialHomepageCMS.blocksSection.supplyRows;
          mergedBlocks.supplyHeading = initialHomepageCMS.blocksSection.supplyHeading;
          mergedBlocks.supplySubline = initialHomepageCMS.blocksSection.supplySubline;
        }

        let mergedPlots = { ...initialHomepageCMS.plotsForSale, ...(parsed.plotsForSale || {}) };
        if (!parsed.plotsForSale?.ratesRows || parsed.plotsForSale.ratesRows.length === 0) {
          mergedPlots.ratesRows = initialHomepageCMS.plotsForSale.ratesRows;
          mergedPlots.ratesHeading = initialHomepageCMS.plotsForSale.ratesHeading;
          mergedPlots.ratesSubline = initialHomepageCMS.plotsForSale.ratesSubline;
        }

        let heroData = { ...initialHomepageCMS.hero, ...(parsed.hero || {}) };
        if (!heroData.bgImage || heroData.bgImage.includes('faisal-jewel') || heroData.bgImage.includes('arc-monument-2') || heroData.bgImage.includes('faisalhillarc')) {
          heroData.bgImage = '/images/faisal-hills-arc-gate.webp';
        }

        let paymentData = { ...initialHomepageCMS.paymentPlan, ...(parsed.paymentPlan || {}) };
        if (!paymentData.downloadBtnText || paymentData.downloadBtnText.includes('(PDF)') || paymentData.downloadBtnText === 'Download Plan') {
          paymentData.downloadBtnText = 'Download Payment Plan';
        }

        let masterData = { ...initialHomepageCMS.masterPlan, ...(parsed.masterPlan || {}) };
        if (masterData.downloadBtnText?.includes('(PDF)')) {
          masterData.downloadBtnText = 'Download Master Plan';
        }

        return {
          ...initialHomepageCMS,
          ...parsed,
          hero: heroData,
          statsBand: { ...initialHomepageCMS.statsBand, ...(parsed.statsBand || {}) },
          chairman: { ...initialHomepageCMS.chairman, ...(parsed.chairman || {}) },
          projectsByZedem: { ...initialHomepageCMS.projectsByZedem, ...(parsed.projectsByZedem || {}) },
          overview: { ...initialHomepageCMS.overview, ...(parsed.overview || {}) },
          location: { ...initialHomepageCMS.location, ...(parsed.location || {}) },
          gettingThere: { ...initialHomepageCMS.gettingThere, ...(parsed.gettingThere || {}) },
          landmarks: { ...initialHomepageCMS.landmarks, ...(parsed.landmarks || {}) },
          masterPlan: masterData,
          blocksSection: mergedBlocks,
          plotsForSale: mergedPlots,
          flagships: { ...initialHomepageCMS.flagships, ...(parsed.flagships || {}) },
          paymentPlan: paymentData,
          bookingSteps: { ...initialHomepageCMS.bookingSteps, ...(parsed.bookingSteps || {}) },
          whyInvest: { ...initialHomepageCMS.whyInvest, ...(parsed.whyInvest || {}) },
          amenities: mergedAmenities,
          testimonials: { ...initialHomepageCMS.testimonials, ...(parsed.testimonials || {}) },
          infrastructure: { ...initialHomepageCMS.infrastructure, ...(parsed.infrastructure || {}) },
          photoGallery: { ...initialHomepageCMS.photoGallery, ...(parsed.photoGallery || {}) },
          discoverFtStats: { ...initialHomepageCMS.discoverFtStats, ...(parsed.discoverFtStats || {}) },
          faqs: mergedFaqs,
          finalCta: { ...initialHomepageCMS.finalCta, ...(parsed.finalCta || {}) },
          footer: { ...initialHomepageCMS.footer, ...(parsed.footer || {}) }
        };
      }
    } catch { }
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/homepage_cms`, { next: { revalidate: 60 } });
    if (!res || !res.ok) return initialHomepageCMS;
    const data = await res.json();
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      return initialHomepageCMS;
    }
    const paymentData = { ...initialHomepageCMS.paymentPlan, ...(data.paymentPlan || {}) };
    if (!paymentData.downloadBtnText || paymentData.downloadBtnText.includes('(PDF)') || paymentData.downloadBtnText === 'Download Plan') {
      paymentData.downloadBtnText = 'Download Payment Plan';
    }
    const masterData = { ...initialHomepageCMS.masterPlan, ...(data.masterPlan || {}) };
    if (masterData.downloadBtnText?.includes('(PDF)')) {
      masterData.downloadBtnText = 'Download Master Plan';
    }
    return {
      ...initialHomepageCMS,
      ...data,
      paymentPlan: paymentData,
      masterPlan: masterData
    };
  } catch {
    return initialHomepageCMS;
  }
}

export async function saveHomepageCMS(cmsData: HomepageCMSData, token?: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_homepage_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_homepage_updated'));
    } catch { }
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/homepage_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// Granular User Role & Module Permissions
// -------------------------------------------------------------

export type UserPermissionKey =
  | 'manage_leads'
  | 'manage_plots'
  | 'manage_blogs'
  | 'manage_gallery'
  | 'manage_homepage_cms'
  | 'manage_seo'
  | 'manage_users';

export interface DashboardUserItem {
  id: number | string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor' | 'agent' | 'viewer';
  status: 'active' | 'suspended' | 'pending';
  permissions: UserPermissionKey[];
  createdAt?: string;
  lastLogin?: string;
}

export const ALL_DASHBOARD_PERMISSIONS: { key: UserPermissionKey; label: string; description: string; desc: string }[] = [
  { key: 'manage_leads', label: 'Manage Leads & Inquiries', description: 'View, filter, export and update customer booking leads', desc: 'View, filter, export and update customer booking leads' },
  { key: 'manage_plots', label: 'Manage Plots & Inventory', description: 'Add, update prices, and edit plot listings and blocks', desc: 'Add, update prices, and edit plot listings and blocks' },
  { key: 'manage_blogs', label: 'Manage Blog Posts', description: 'Create, edit, and publish SEO blog articles', desc: 'Create, edit, and publish SEO blog articles' },
  { key: 'manage_gallery', label: 'Photo Gallery Management', description: 'Upload and manage on-site development photos', desc: 'Upload and manage on-site development photos' },
  { key: 'manage_homepage_cms', label: 'Homepage CMS & Visual Content', description: 'Edit all 24 homepage sections, texts, cards, and images', desc: 'Edit all 24 homepage sections, texts, cards, and images' },
  { key: 'manage_seo', label: 'SEO & Verification Settings', description: 'Manage metadata, social links, and official contact details', desc: 'Manage metadata, social links, and official contact details' },
  { key: 'manage_users', label: 'User & Permission Management', description: 'Create new users and assign role permissions (Superadmin only)', desc: 'Create new users and assign role permissions (Superadmin only)' }
];

// -------------------------------------------------------------
// Blocks Page CMS Interfaces & Full Defaults
// -------------------------------------------------------------

export interface BlocksPageCMSData {
  glance: any;
  stages: any;
  mapSection: any;
  dimensions: any;
  prices: any;
  statusSection: any;
  hero: {
    counters: any;
    h1: string;
    heroImage: string;
    kpiCards: {
      card1: { value: number; unit: string; label: string };
      card2: { value: string; label: string };
      card3: { value: string; label: string };
      card4: { value: string; label: string };
    };
  };
  atAGlance: {
    h2: string;
    rows: {
      id: string;
      name: string;
      slug: string;
      character: string;
      approxPlots: string;
      plotSizes: string;
      howSold: string;
      possession: string;
    }[];
    footnote: string;
  };
  growthStages: {
    h2: string;
    paragraph: string;
    stages: {
      stage: string;
      blocks: string;
      meaning: string;
    }[];
    distinctionNote: string;
  };
  blockMap: {
    h2: string;
    paragraph: string;
    connectors: string[];
    whereItSits: {
      id: string;
      name: string;
      borders: string;
      access: string;
    }[];
    mapFootnote: string;
    readingPlotNumbersTitle: string;
    readingPlotNumbersText: string;
  };
  blocksOneByOne: {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    character: string;
    badge: string;
    heroImage: string;
    detailedCopy: string;
    plotSizes: string;
    howSold: string;
    possession: string;
    suits: string;
  }[];
  plotSizesSection: {
    h2: string;
    subline: string;
    matrix: {
      dimensions: string;
      areaSqFt: string;
      exec: boolean;
      a: boolean;
      prime: boolean;
      b: boolean;
      bExt: boolean;
      c: boolean;
      d: boolean | string;
    }[];
    footnote: string;
  };
  marlaConversions: {
    h2: string;
    intro: string;
    rows: {
      dimensions: string;
      areaSqFt: string;
      at272: string;
      at250: string;
      at225: string;
      usuallySold: string;
    }[];
    callout: string;
  };
  plotPrices: {
    h2: string;
    subline: string;
    rows: {
      id: string;
      name: string;
      fiveMarla: string;
      oneKanal: string;
    }[];
    footnote: string;
  };
  developmentStatus: {
    h2: string;
    subline: string;
    rows: {
      name: string;
      roads: string;
      houses: string;
      reported: string;
    }[];
    footnote: string;
    infrastructure: {
      h3: string;
      paragraph: string;
      cards: { title: string; desc: string }[];
    };
  };
  decisionMatrix: {
    decisionCards: any;
    glossaryTerms: any;
    h2: string;
    subline: string;
    rows: {
      goal: string;
      consider: string;
      tradeOff: string;
    }[];
  };
  glossary: {
    h2: string;
    subline: string;
    terms: { term: string; definition: string }[];
    premiumNote: string;
  };
  dueDiligence: {
    h2: string;
    subline: string;
    steps: { number: number; title: string; desc: string }[];
  };
  faqs: {
    h2: string;
    subline: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    h2: string;
    paragraph: string;
    whatsappNumber: string;
    phoneNumber: string;
    headOffice: string;
    aboutPageNote: string;
  };
}

export const initialBlocksPageCMS: BlocksPageCMSData = {
  hero: {
    h1: 'Faisal Hills Blocks and Sectors: Map, Plot Sizes and Status',
    heroImage: '/images/faisal-hills-aerial-panoramic.webp',
    kpiCards: {
      card1: { value: 7, unit: 'Blocks', label: 'Confirmed Sectors' },
      card2: { value: 'Ready', label: 'Possession in A, Exec & B/C' },
      card3: { value: '5M – 2K', label: 'Plot Sizing Range' },
      card4: { value: 'RDA', label: 'Approved Layout Scheme' }
    },
    counters: undefined
  },
  atAGlance: {
    h2: 'Faisal Hills Blocks at a Glance',
    rows: [
      { id: 'executive-block', name: 'Executive Block', slug: 'executive-block', character: 'Main entrance; commercial centre', approxPlots: '1,450', plotSizes: '5 Marla – 1 Kanal', howSold: 'Full payment', possession: 'Available' },
      { id: 'block-a', name: 'Block A', slug: 'block-a', character: 'Oldest residential block', approxPlots: '6,000–8,000', plotSizes: '5 Marla – 2 Kanal', howSold: 'Full payment', possession: 'Available' },
      { id: 'prime-block', name: 'Prime Block', slug: 'prime-block', character: 'Newest block', approxPlots: 'Master plan scheduled', plotSizes: '5.55 Marla – 2 Kanal', howSold: 'Installments', possession: 'Not yet' },
      { id: 'block-b', name: 'Block B', slug: 'block-b', character: 'Large residential block', approxPlots: '8,050', plotSizes: '5 Marla – 1 Kanal', howSold: 'Full payment / Resale', possession: 'In parts' },
      { id: 'block-b-extension', name: 'Block B Extension', slug: 'block-b-extension', character: 'Small hillside block', approxPlots: '650', plotSizes: '5 – 10 Marla', howSold: 'Installments', possession: 'Not yet' },
      { id: 'block-c', name: 'Block C', slug: 'block-c', character: 'Large residential block', approxPlots: '8,350', plotSizes: '5 Marla – 1 Kanal', howSold: 'Full payment / Resale', possession: 'In parts' },
      { id: 'block-d', name: 'Block D', slug: 'block-d', character: 'Later addition', approxPlots: '2,350–2,435', plotSizes: '5 Marla – 1 Kanal', howSold: 'Installments', possession: 'Confirm plot-by-plot' }
    ],
    footnote: 'Plot counts are approximate: rounded from a plot-by-size breakdown published by a sales partner, and not yet checked against the official master plan. Sale mode and possession as last reported with the society office. Commercial plots are reported in most blocks; the Executive Block holds the main commercial centre.'
  },
  growthStages: {
    h2: 'How Many Blocks Does Faisal Hills Have?',
    paragraph: 'Seven blocks are named most often, but other sources say anything from four to eight. The difference comes from how the society grew.',
    stages: [
      { stage: 'Original master plan', blocks: 'A, B, C and Executive', meaning: 'Older map downloads and some property portals still show only these four.' },
      { stage: 'Added later', blocks: 'D (next to Block C), Prime (beside Block A), B Extension (beside Block B)', meaning: 'A map that stops at Block C is out of date, not wrong.' },
      { stage: 'Listed by some partners', blocks: 'Hill Estate View', meaning: 'No payment plan confirmed; do not buy a file until the society office confirms it in writing.' },
      { stage: 'Named by one source only', blocks: '"Golf Block"', meaning: 'Other sources mention a golf course as a master-plan feature, not a block; treat Golf Block offers with caution.' }
    ],
    distinctionNote: 'Faisal Hills Phase 2 is a separate scheme with its own layout plan and approval, not a block of Faisal Hills. Blocks and sectors mean the same thing here: listings often say "Sector A" for Block A.'
  },
  blockMap: {
    h2: 'Faisal Hills Block Map',
    paragraph: 'The main entrance is on the Main GT Road (N-5) near Taxila, beside the Executive Block. A main boulevard runs in past Block A; Block B lies between Blocks A and C, and the later blocks sit further in, toward the M-1 motorway side.',
    connectors: [
      '225ft Grand Boulevard central spine',
      'Direct GT Road (N-5) gateway entrance',
      'M-1 Motorway corridor connection'
    ],
    whereItSits: [
      { id: 'executive-block', name: 'Executive Block', borders: 'GT Road; Block A', access: 'Main gate on GT Road' },
      { id: 'block-a', name: 'Block A', borders: 'Executive Block; Prime Block; Block B', access: 'Main boulevard (225 ft)' },
      { id: 'prime-block', name: 'Prime Block', borders: 'Block A', access: 'Planned second GT Road gate / Main boulevard' },
      { id: 'block-b', name: 'Block B', borders: 'Block A; Block C', access: 'Main boulevard' },
      { id: 'block-b-extension', name: 'Block B Extension', borders: 'Block B', access: 'Connected via Block B' },
      { id: 'block-c', name: 'Block C', borders: 'Block B; Block D', access: '100 ft main roads' },
      { id: 'block-d', name: 'Block D', borders: 'Block C', access: 'Connected via Block C' }
    ],
    mapFootnote: "Listings describe Block D's position in at least four different ways, and Block B Extension's neighbours in three. Before buying, check any block's position on the current approved map at the society office.",
    readingPlotNumbersTitle: 'Reading plot numbers',
    readingPlotNumbersText: 'Listings often mention plot-number "series", such as the "800 series" in the Executive Block. These are ranges of plot numbers within a block. Always match a plot\'s block and number against the current approved map rather than an older download.'
  },
  blocksOneByOne: [
    {
      id: 'executive-block',
      name: 'Executive Block',
      slug: 'executive-block',
      tagline: 'GT Road Entrance & Commercial Hub',
      character: 'Main entrance; commercial centre',
      badge: 'Commercial & Civic Gateway',
      heroImage: '/images/faisal-hills-executive-block.webp',
      detailedCopy: "The society's commercial and civic centre, at the GT Road entrance. It contains Faisal Jewel, the Roots International School campus, a mosque, a cricket ground and Faisal Mansion, reported as the society's head office. Residential plots run from 5 Marla to 1 Kanal, alongside commercial plots with GT Road visibility. The developer's latest published update lists plots here as full payment only.",
      plotSizes: '5 Marla – 1 Kanal',
      howSold: 'Full payment',
      possession: 'Available',
      suits: 'Commercial buyers, and anyone who wants to build immediately near the entrance.'
    },
    {
      id: 'block-a',
      name: 'Block A',
      slug: 'block-a',
      tagline: 'Oldest & Most Established Community',
      character: 'Oldest residential block',
      badge: 'Most Populated Sector',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      detailedCopy: 'The oldest and largest established residential block, next to the Executive Block, with carpeted roads, an operational mosque and families in residence. Plots run from 5 Marla to 2 Kanal, plus commercial plots. Published totals range from about 6,000 to over 8,000 residential plots. Sold on full payment only, according to the developer\'s latest update.',
      plotSizes: '5 Marla – 2 Kanal',
      howSold: 'Full payment',
      possession: 'Available',
      suits: 'Families and investors who want a lived-in block.'
    },
    {
      id: 'prime-block',
      name: 'Prime Block',
      slug: 'prime-block',
      tagline: 'Newest Sector with Installment Plans',
      character: 'Newest block',
      badge: 'Installment Opportunity',
      heroImage: '/images/faisal-hills-drone-view.webp',
      detailedCopy: 'The newest block, beside Block A. It is currently the main option for buyers who need a developer installment plan, with plots from 5.55 Marla to 2 Kanal plus commercial plots. Ask for the Prime Block layout map at booking and check your plot\'s position against the boulevard and the planned commercial area.',
      plotSizes: '5.55 Marla – 2 Kanal',
      howSold: 'Installments',
      possession: 'Not yet',
      suits: 'Installment buyers who can wait for development.'
    },
    {
      id: 'block-b',
      name: 'Block B',
      slug: 'block-b',
      tagline: 'Central Sector with Margalla Views',
      character: 'Large residential block',
      badge: 'Largest Land Area',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      detailedCopy: 'A large residential block between Blocks A and C, with reported views of the Margalla Hills, and described by several sources as the largest block by land area. Plots run from 5 Marla to 1 Kanal, and the master plan reportedly includes a graveyard site here. Possession-ready plots have been offered in parts of the block.',
      plotSizes: '5 Marla – 1 Kanal',
      howSold: 'Full payment / Resale',
      possession: 'In parts',
      suits: 'Families wanting a quieter residential setting below Block A prices.'
    },
    {
      id: 'block-b-extension',
      name: 'Block B Extension',
      slug: 'block-b-extension',
      tagline: 'Small Hillside Residential Block',
      character: 'Small hillside block',
      badge: 'Hillside Enclave',
      heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      detailedCopy: 'A small block of about 650 plots, 5 to 10 Marla only, created to meet demand for Block B. It sits on hilly terrain, and roads were under construction as of 2026. Check the level of any plot, and whether it needs earthwork, before budgeting for construction.',
      plotSizes: '5 – 10 Marla',
      howSold: 'Installments',
      possession: 'Not yet',
      suits: 'Budget buyers who want the Block B area and can wait.'
    },
    {
      id: 'block-c',
      name: 'Block C',
      slug: 'block-c',
      tagline: 'Large High-Growth Sector near Motorway',
      character: 'Large residential block',
      badge: 'Value & Scale',
      heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      detailedCopy: 'One of the largest blocks, further from the entrance, with about 8,350 residential plots, most of them 5 and 8 Marla, and a large number of commercial plots. Main roads are built and internal streets are at different stages, with fewer houses so far than in Blocks A and B. Some plots have possession.',
      plotSizes: '5 Marla – 1 Kanal',
      howSold: 'Full payment / Resale',
      possession: 'In parts',
      suits: 'Buyers with a longer time horizon who want a lower entry price.'
    },
    {
      id: 'block-d',
      name: 'Block D',
      slug: 'block-d',
      tagline: 'Later Addition next to Block C',
      character: 'Later addition',
      badge: 'Suburban Addition',
      heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      detailedCopy: 'A later addition next to Block C, with about 2,350 to 2,435 plots depending on the source. Plots run from 5 Marla to 1 Kanal, with 2 Kanal plots listed in some plans. Installments were reported in recent cycles. Sources contradict each other on possession, so confirm it plot by plot.',
      plotSizes: '5 Marla – 1 Kanal',
      howSold: 'Installments',
      possession: 'Confirm plot-by-plot',
      suits: 'Entry-level buyers comfortable checking possession for each plot.'
    }
  ],
  plotSizesSection: {
    h2: 'Plot Sizes by Block',
    subline: 'Dimension and square footage distribution across all Faisal Hills blocks.',
    matrix: [
      { dimensions: '25 × 50', areaSqFt: '1,250', exec: true, a: true, prime: true, b: true, bExt: true, c: true, d: true },
      { dimensions: '30 × 60', areaSqFt: '1,800', exec: true, a: true, prime: true, b: true, bExt: true, c: true, d: true },
      { dimensions: '35 × 70', areaSqFt: '2,450', exec: true, a: true, prime: true, b: true, bExt: true, c: true, d: true },
      { dimensions: '40 × 80', areaSqFt: '3,200', exec: true, a: true, prime: true, b: true, bExt: false, c: false, d: true },
      { dimensions: '50 × 90', areaSqFt: '4,500', exec: true, a: true, prime: true, b: true, bExt: false, c: true, d: true },
      { dimensions: '2 Kanal', areaSqFt: '9,000–9,600', exec: false, a: true, prime: true, b: false, bExt: false, c: false, d: 'Select' }
    ],
    footnote: "A tick (✓) means the size exists in the block's published plot schedule, not that plots are currently for sale."
  },
  marlaConversions: {
    h2: 'Why the Same Plot is Sold Under Different Marla Sizes',
    intro: 'Three Marla sizes are in use in Faisal Hills listings: the standard revenue Marla of 272.25 sq ft, a 250 sq ft Marla common in listings, and the 225 sq ft Marla used in the developer\'s recent plans. The same plot can therefore appear under different sizes:',
    rows: [
      { dimensions: '25 × 50', areaSqFt: '1,250', at272: '4.59 Marla', at250: '5 Marla', at225: '5.56 Marla', usuallySold: '5 Marla' },
      { dimensions: '30 × 60', areaSqFt: '1,800', at272: '6.61 Marla', at250: '7.2 Marla', at225: '8 Marla', usuallySold: '7 or 8 Marla' },
      { dimensions: '35 × 70', areaSqFt: '2,450', at272: '9 Marla', at250: '9.8 Marla', at225: '10.89 Marla', usuallySold: '10 Marla' },
      { dimensions: '40 × 80', areaSqFt: '3,200', at272: '11.75 Marla', at250: '12.8 Marla', at225: '14.22 Marla', usuallySold: '12 or 14 Marla' },
      { dimensions: '50 × 90', areaSqFt: '4,500', at272: '16.53 Marla', at250: '18 Marla', at225: '20 Marla', usuallySold: '1 Kanal' }
    ],
    callout: 'That is why listings show sizes like "4.5", "5.56", "12" or "14.22" Marla for standard Faisal Hills plots. A Faisal Hills "1 Kanal" plot of 4,500 sq ft is also smaller than a revenue-record Kanal of 5,445 sq ft. Always compare plots, and prices, by exact dimensions and square feet.'
  },
  plotPrices: {
    h2: 'Plot Prices and Supply by Block',
    subline: 'Prices follow supply and development. The Executive Block has about 1,450 residential plots near the entrance, while Blocks B and C together hold roughly 16,000, most of them small. Asking prices reflect that gap.',
    rows: [
      { id: 'executive-block', name: 'Executive Block', fiveMarla: 'PKR 70–90 lakh', oneKanal: 'PKR 2.00–2.90 crore' },
      { id: 'block-a', name: 'Block A', fiveMarla: 'PKR 55–70 lakh', oneKanal: 'PKR 1.45–2.25 crore' },
      { id: 'prime-block', name: 'Prime Block', fiveMarla: 'PKR 45–70 lakh', oneKanal: 'PKR 1.75–2.50 crore' },
      { id: 'block-b', name: 'Block B', fiveMarla: 'PKR 40–65 lakh', oneKanal: 'PKR 1.15–1.75 crore' },
      { id: 'block-b-extension', name: 'Block B Extension', fiveMarla: 'PKR 45–65 lakh', oneKanal: '—' },
      { id: 'block-c', name: 'Block C', fiveMarla: 'PKR 35–60 lakh', oneKanal: 'PKR 1.20–1.75 crore' },
      { id: 'block-d', name: 'Block D', fiveMarla: 'PKR 40–55 lakh', oneKanal: 'PKR 1.40–2.10 crore' }
    ],
    footnote: 'Open-market asking prices as of recent verified cycles. Live listings checked in September 2026 were broadly in line, with some Block A 5 Marla plots listed slightly above this range. Corner, park-facing and boulevard plots, level terrain and balloted plots command more.'
  },
  developmentStatus: {
    h2: 'Development Status by Block',
    subline: 'Verified ground progress, utilities readiness, and inhabited villa distribution.',
    rows: [
      { name: 'Executive', roads: 'Developed', houses: 'Houses and commercial buildings; construction ongoing', reported: 'Verified 2026' },
      { name: 'Block A', roads: 'Carpeted roads; mosque operational', houses: 'Families living in hundreds of built villas', reported: 'Verified 2026' },
      { name: 'Prime', roads: 'Early stage earthwork and road alignment', houses: 'Not yet inhabited (infrastructure phase)', reported: 'Verified 2026' },
      { name: 'Block B', roads: 'Largely developed', houses: 'Houses built and under construction', reported: 'Verified 2026' },
      { name: 'Block B Extension', roads: 'Roads under construction', houses: 'Not yet (earthwork & grid leveling)', reported: 'Verified 2026' },
      { name: 'Block C', roads: 'Main roads built; internal streets in progress', houses: 'Few houses so far; construction picking pace', reported: 'September 2026' },
      { name: 'Block D', roads: 'Initial groundwork and sector road plotting', houses: 'Not yet inhabited', reported: 'Verified 2026' }
    ],
    footnote: 'For dated photographs of each block, see our development updates.',
    infrastructure: {
      h3: 'Society-Wide Infrastructure',
      paragraph: 'The public record of shared infrastructure confirms major engineering milestones: the grand main entrance gate and 225ft boulevard are complete, alongside the Fatima Tuz Zahra Jamia Masjid for about 3,000 worshippers, Allah Wala Chowk, a direct bridge connecting to Taxila city, and an engineered bridge over the nullah linked to GT Road by a 150 ft wide access road. Land has also been acquired for a planned second GT Road gate.',
      cards: [
        { title: '225ft Grand Boulevard', desc: 'Carpeted central spine connecting GT Road to inner sectors.' },
        { title: '3,000-Capacity Masjid', desc: 'Fully functional central Jamia Mosque with Quran academy.' },
        { title: 'Taxila City Bridge', desc: 'Direct bridge connection over nullah for smooth transit.' },
        { title: 'Second Gate Acquisition', desc: 'Additional GT Road gateway acquisition in progress.' }
      ]
    }
  },
  decisionMatrix: {
    h2: 'Which Block Fits Your Plan',
    subline: 'Align your capital allocation and holding horizon with the right sector.',
    rows: [
      { goal: 'Build a home now', consider: 'Executive, A; possession-ready plots in B and C', tradeOff: 'Highest prices; full payment' },
      { goal: 'Pay in installments', consider: 'Prime, D, B Extension', tradeOff: 'Earlier-stage development' },
      { goal: 'Buy commercial property', consider: 'Executive Block', tradeOff: 'Highest entry cost' },
      { goal: 'Enter at the lowest price', consider: 'C, D, B', tradeOff: 'Longer wait for full development' },
      { goal: 'Avoid earthwork costs', consider: 'Level plots in developed blocks', tradeOff: 'Check terrain plot by plot' }
    ],
    decisionCards: undefined,
    glossaryTerms: undefined
  },
  glossary: {
    h2: "Terms You'll See in Faisal Hills Listings",
    subline: 'Understand the standard market vocabulary before negotiating or signing an agreement.',
    terms: [
      { term: 'File', definition: 'A booking right to a plot not yet assigned a number or location; the final position depends on balloting.' },
      { term: 'Balloted Plot', definition: 'A plot with an assigned number and confirmed physical location on the official map.' },
      { term: 'Possession', definition: 'Physical handover of the plot by the society so architectural construction can immediately begin.' },
      { term: 'NDC (No Demand Certificate)', definition: 'Official document confirming no financial dues or penalties are outstanding before plot transfer.' },
      { term: 'Solid Land / Cut Land', definition: 'Listing shorthand for plots on natural ground versus plots formed by cutting into slopes (which may need more earthwork).' },
      { term: 'Series (e.g. 800 series)', definition: 'A range of plot numbers grouped within a block designating a specific lane or sub-pocket.' }
    ],
    premiumNote: 'Corner, Park-Facing, Boulevard-Facing: Positions that usually carry a higher market price or a 10% to 15% category premium charge at booking.'
  },
  dueDiligence: {
    h2: 'Check a Block Before You Commit',
    subline: 'Follow this verified checklist before making down payments or signing transfer papers.',
    steps: [
      { number: 1, title: 'Confirm Plot & Block on Plan', desc: 'Confirm the block and plot number on the current approved layout plan at the society office.' },
      { number: 2, title: 'Verify Legal Authority Approval', desc: 'Confirm scheme approval with the Rawalpindi Development Authority (RDA).' },
      { number: 3, title: 'Confirm Exact Plot Possession', desc: 'Confirm possession for that exact plot number, not just the generalized block status.' },
      { number: 4, title: 'Conduct On-Site Physical Check', desc: 'Check the terrain and natural ground contour on-site, especially in hillside sectors like B Extension.' },
      { number: 5, title: 'Confirm Sale Mode & Dues', desc: 'Confirm the sale mode: full payment or installments, development charges, and any position premiums.' },
      { number: 6, title: 'Confirm Transfer & NDC Papers', desc: 'Confirm transfer requirements, including the NDC and official transfer fees in writing.' }
    ]
  },
  faqs: {
    h2: 'Frequently Asked Questions',
    subline: 'Everything you need to know regarding block counts, possession, plot sizing, and commercial areas.',
    items: [
      { question: 'How many blocks does Faisal Hills have?', answer: 'Seven blocks are named most often: Executive, Prime, A, B, B Extension, C and D. Some partners also list Hill Estate View, and older maps show only four.' },
      { question: 'Why do some Faisal Hills maps show only four blocks?', answer: 'The original master plan covered Blocks A, B, C and Executive. Blocks D, Prime and B Extension were added later, and some portals and older downloads have not been updated.' },
      { question: 'Is there a Golf Block in Faisal Hills?', answer: 'Only one source we found lists a Golf Block; other sources do not. Confirm with the society office before considering any Golf Block offer.' },
      { question: 'Which blocks are developed and have possession?', answer: 'The Executive Block and Block A are the most developed, with residents and possession. Possession-ready plots have been offered in parts of Blocks B and C, and reports on Block D conflict. Confirm possession plot by plot.' },
      { question: 'Where is the main commercial area of Faisal Hills?', answer: 'In the Executive Block at the GT Road entrance, which contains Faisal Jewel and most commercial activity. Other blocks have smaller commercial plots.' },
      { question: 'Which blocks are on GT Road?', answer: 'The Executive Block sits at the main entrance on the Main GT Road (N-5). Some sources also describe Prime Block as running along GT Road.' },
      { question: 'Which is the largest block?', answer: 'Block B is described as the largest by land area. Blocks B and C each have over 8,000 residential plots.' },
      { question: 'What is the difference between Block B and Block B Extension?', answer: 'Block B is the larger, more developed block. B Extension is a smaller hillside addition of about 650 plots of 5 to 10 Marla, at an earlier stage.' },
      { question: 'Is Faisal Hills Phase 2 a block?', answer: 'No. It is a separate scheme with its own layout plan and approval.' },
      { question: 'Why is the same plot listed as 12 or 14 Marla?', answer: 'A 40 × 80 ft plot is 11.75 Marla at 272.25 sq ft, 12.8 at 250 sq ft and 14.22 at 225 sq ft. Compare plots by dimensions and square feet.' }
    ]
  },
  cta: {
    h2: 'Compare Blocks With Us',
    paragraph: "Tell us your budget, preferred plot size and whether you need installments. We'll share current availability by block along with the official schedule, and can arrange a site visit to see the blocks side by side.",
    whatsappNumber: '+92 333 1113177',
    phoneNumber: '+92 333 1113177',
    headOffice: 'Faisal Mansion, Executive Block, Main GT Road, Taxila / Rawalpindi.',
    aboutPageNote: 'Reviewed by Senior Property Advisor of Faisal Hills Islamabad Advisory Desk. Block details are drawn from published master-plan data, developer updates and society office confirmations.'
  },
  glance: undefined,
  stages: undefined,
  mapSection: undefined,
  dimensions: undefined,
  prices: undefined,
  statusSection: undefined
};

export function mergeBlocksCMS(incoming: any): BlocksPageCMSData {
  if (!incoming || typeof incoming !== 'object') return initialBlocksPageCMS;
  return {
  hero: {
    ...initialBlocksPageCMS.hero,
    ...(incoming.hero || {}),
    kpiCards: {
      card1: { ...initialBlocksPageCMS.hero.kpiCards.card1, ...(incoming.hero?.kpiCards?.card1 || {}) },
      card2: { ...initialBlocksPageCMS.hero.kpiCards.card2, ...(incoming.hero?.kpiCards?.card2 || {}) },
      card3: { ...initialBlocksPageCMS.hero.kpiCards.card3, ...(incoming.hero?.kpiCards?.card3 || {}) },
      card4: { ...initialBlocksPageCMS.hero.kpiCards.card4, ...(incoming.hero?.kpiCards?.card4 || {}) },
    }
  },
  atAGlance: {
    ...initialBlocksPageCMS.atAGlance,
    ...(incoming.atAGlance || {}),
    rows: Array.isArray(incoming.atAGlance?.rows) && incoming.atAGlance.rows.length > 0
      ? incoming.atAGlance.rows
      : initialBlocksPageCMS.atAGlance.rows
  },
  growthStages: {
    ...initialBlocksPageCMS.growthStages,
    ...(incoming.growthStages || {}),
    stages: Array.isArray(incoming.growthStages?.stages) && incoming.growthStages.stages.length > 0
      ? incoming.growthStages.stages
      : initialBlocksPageCMS.growthStages.stages
  },
  blockMap: {
    ...initialBlocksPageCMS.blockMap,
    ...(incoming.blockMap || {}),
    connectors: Array.isArray(incoming.blockMap?.connectors)
      ? incoming.blockMap.connectors
      : initialBlocksPageCMS.blockMap.connectors,
    whereItSits: Array.isArray(incoming.blockMap?.whereItSits) && incoming.blockMap.whereItSits.length > 0
      ? incoming.blockMap.whereItSits
      : initialBlocksPageCMS.blockMap.whereItSits
  },
  blocksOneByOne: Array.isArray(incoming.blocksOneByOne) && incoming.blocksOneByOne.length > 0
    ? incoming.blocksOneByOne
    : initialBlocksPageCMS.blocksOneByOne,
  plotSizesSection: {
    ...initialBlocksPageCMS.plotSizesSection,
    ...(incoming.plotSizesSection || {}),
    matrix: Array.isArray(incoming.plotSizesSection?.matrix) && incoming.plotSizesSection.matrix.length > 0
      ? incoming.plotSizesSection.matrix
      : initialBlocksPageCMS.plotSizesSection.matrix
  },
  marlaConversions: {
    ...initialBlocksPageCMS.marlaConversions,
    ...(incoming.marlaConversions || {}),
    rows: Array.isArray(incoming.marlaConversions?.rows) && incoming.marlaConversions.rows.length > 0
      ? incoming.marlaConversions.rows
      : initialBlocksPageCMS.marlaConversions.rows
  },
  plotPrices: {
    ...initialBlocksPageCMS.plotPrices,
    ...(incoming.plotPrices || {}),
    rows: Array.isArray(incoming.plotPrices?.rows) && incoming.plotPrices.rows.length > 0
      ? incoming.plotPrices.rows
      : initialBlocksPageCMS.plotPrices.rows
  },
  developmentStatus: {
    ...initialBlocksPageCMS.developmentStatus,
    ...(incoming.developmentStatus || {}),
    rows: Array.isArray(incoming.developmentStatus?.rows) && incoming.developmentStatus.rows.length > 0
      ? incoming.developmentStatus.rows
      : initialBlocksPageCMS.developmentStatus.rows,
    infrastructure: {
      ...initialBlocksPageCMS.developmentStatus.infrastructure,
      ...(incoming.developmentStatus?.infrastructure || {}),
      cards: Array.isArray(incoming.developmentStatus?.infrastructure?.cards)
        ? incoming.developmentStatus.infrastructure.cards
        : initialBlocksPageCMS.developmentStatus.infrastructure.cards
    }
  },
  decisionMatrix: {
    ...initialBlocksPageCMS.decisionMatrix,
    ...(incoming.decisionMatrix || {}),
    rows: Array.isArray(incoming.decisionMatrix?.rows) && incoming.decisionMatrix.rows.length > 0
      ? incoming.decisionMatrix.rows
      : initialBlocksPageCMS.decisionMatrix.rows
  },
  glossary: {
    ...initialBlocksPageCMS.glossary,
    ...(incoming.glossary || {}),
    terms: Array.isArray(incoming.glossary?.terms) && incoming.glossary.terms.length > 0
      ? incoming.glossary.terms
      : initialBlocksPageCMS.glossary.terms
  },
  dueDiligence: {
    ...initialBlocksPageCMS.dueDiligence,
    ...(incoming.dueDiligence || {}),
    steps: Array.isArray(incoming.dueDiligence?.steps) && incoming.dueDiligence.steps.length > 0
      ? incoming.dueDiligence.steps
      : initialBlocksPageCMS.dueDiligence.steps
  },
  faqs: {
    ...initialBlocksPageCMS.faqs,
    ...(incoming.faqs || {}),
    items: Array.isArray(incoming.faqs?.items) && incoming.faqs.items.length > 0
      ? incoming.faqs.items
      : initialBlocksPageCMS.faqs.items
  },
  cta: {
    ...initialBlocksPageCMS.cta,
    ...(incoming.cta || {})
  },
  glance: undefined,
  stages: undefined,
  mapSection: undefined,
  dimensions: undefined,
  prices: undefined,
  statusSection: undefined
  };
}

export async function fetchBlocksPageCMS(): Promise<BlocksPageCMSData> {
  const remote = await fetchSettingByKey<BlocksPageCMSData>('faisal_blocks_cms');
  if (remote) return mergeBlocksCMS(remote);

  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('faisal_blocks_cms');
      if (local) return mergeBlocksCMS(JSON.parse(local));
    } catch {}
  }
  return initialBlocksPageCMS;
}

export async function saveBlocksPageCMS(cmsData: BlocksPageCMSData, token?: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_blocks_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_blocks_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_blocks_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

export interface PrimeBlockCMSData {
  overview: {
    heading: string;
    visibleParagraph: string;
    expandedParagraph1: string;
    expandedParagraph2: string;
    blockALinkText: string;
    blockALinkHref: string;
    executiveBlockLinkText: string;
    executiveBlockLinkHref: string;
    locationLinkText?: string;
    locationLinkHref?: string;
  };
  location: {
    heading: string;
    mainParagraph: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    driveTimesNote: string;
    locationPageLinkText: string;
    locationPageLinkHref: string;
  };
  plotSizesSection?: {
    heading: string;
    subline?: string;
    marlaNote?: string;
    rows: Array<{
      dimensions: string;
      areaSqFt: string;
      areaSqYds: string;
      commonlyListed: string;
    }>;
  };
  paymentPlanSection?: {
    heading: string;
    intro: string;
    tableRows: Array<{
      size: string;
      totalPrice: string;
      downPayment: string;
      quarterlyInstallment: string;
      lumpSumPrice: string;
    }>;
    termNote: string;
    extraChargesTitle: string;
    extraCharges: Array<{
      label: string;
      desc: string;
    }>;
    whyDifferentHeading: string;
    whyDifferentParagraph1: string;
    whyDifferentParagraph2: string;
    paymentPlanLinkText: string;
    paymentPlanLinkHref: string;
  };
  facilitiesSection?: {
    heading: string;
    intro: string;
    footerNote: string;
    cards: Array<{
      id: number;
      label: string;
      title: string;
      image?: string;
      desc?: string;
    }>;
  };
  whyChooseSection?: {
    badge: string;
    heading: string;
    advantagesHeading: string;
    advantages: Array<{
      title: string;
      desc: string;
    }>;
    considerationsHeading: string;
    considerations: Array<{
      title: string;
      desc: string;
    }>;
    disclaimerNote: string;
  };
  developmentStatusSection?: {
    heading: string;
    intro: string;
    lastUpdated: string;
    tableRows: Array<{
      item: string;
      status: string;
      asAt: string;
    }>;
    statBoxes: {
      earthwork: string;
      roads: string;
      possession: string;
    };
    photoLinkNote: string;
    photoLinkText: string;
    photoLinkHref: string;
    image?: string;
  };
  possessionAdviceSection?: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    blockALinkText: string;
    blockALinkHref: string;
    guideLinkText: string;
    guideLinkHref: string;
  };
  comparisonSection?: {
    heading: string;
    subline?: string;
    primeBlockColumnName: string;
    blockAColumnName: string;
    rows: Array<{
      aspect: string;
      primeBlock: string;
      blockA: string;
    }>;
    compareLinkNote: string;
    compareLinkText: string;
    compareLinkHref: string;
  };
  bookingProcessSection?: {
    badge: string;
    heading: string;
    intro: string;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
      tag?: string;
    }>;
    assistanceBoxHeading: string;
    assistanceBoxText: string;
    assistanceButtonText: string;
    fileTransferNote: string;
  };
  exploreOtherBlocksSection?: {
    heading: string;
    subtitle: string;
    compareHubText: string;
    compareHubHref: string;
  };
  faqsSection?: {
    heading: string;
    faqs: Array<{
      q: string;
      a: string;
    }>;
  };
  closingSiteVisitSection?: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    contactLinkText: string;
    contactLinkHref: string;
    formLabel: string;
    formTitle: string;
    formSubtitle: string;
    formButtonText: string;
    reviewedByNote: string;
  };
}

export const initialPrimeBlockCMS: PrimeBlockCMSData = {
  overview: {
    heading: 'Faisal Hills Prime Block Overview',
    visibleParagraph: "Prime Block sits at the front of Faisal Hills, planned along the 225 ft main boulevard that runs from the society's GT Road entrance. Its western side adjoins Block A and the Executive Block, so the society's established commercial area, school and mosque are already next door.",
    expandedParagraph1: "The block is planned with carpeted roads, underground utilities, parks, a mosque and its own commercial areas. Because development is still in progress, it suits buyers who want to enter Faisal Hills on an instalment plan and build later, rather than families who need to start construction now.",
    expandedParagraph2: "Although it is marketed as Faisal Hills Prime Block Islamabad, the society lies in Rawalpindi District near Taxila, with Islamabad reached via the GT Road and Margalla Avenue.",
    blockALinkText: 'Block A',
    blockALinkHref: '/blocks/block-a',
    executiveBlockLinkText: 'Executive Block',
    executiveBlockLinkHref: '/blocks/executive-block',
    locationLinkText: 'Faisal Hills location',
    locationLinkHref: '/faisal-hills-location'
  },
  location: {
    heading: 'Faisal Hills Prime Block Location',
    mainParagraph: "Prime Block is reached through the society's main gate on the Main GT Road (N-5) near Taxila. From the gate, the 225 ft boulevard leads into the block; internal main roads within it are reported at 100 ft. Every Faisal Hills block shares the same GT Road entrance, so Prime Block has the same connectivity as the established blocks.",
    bullet1: 'Block A, the Executive Block and the Faisal Jewel development, immediately adjoining',
    bullet2: 'Taxila Chowk and Taxila city on the GT Road',
    bullet3: 'Sector B-17 (Multi Gardens) and Faisal Margalla City on the Islamabad side',
    bullet4: 'Margalla Avenue, the M-1 Motorway corridor and New Islamabad International Airport',
    driveTimesNote: 'Drive times quoted online vary widely, so we publish only times our team has measured, with the date and time of day. Full directions are on our',
    locationPageLinkText: 'Faisal Hills location',
    locationPageLinkHref: '/faisal-hills-location'
  },
  plotSizesSection: {
    heading: 'Plot Sizes in Prime Block',
    subline: 'Official plot dimensions, square footage, square yard calculations, and commonly listed market classifications:',
    rows: [
      { dimensions: '25 × 50', areaSqFt: '1,250', areaSqYds: '139', commonlyListed: '5 Marla (also written 5.55 Marla)' },
      { dimensions: '30 × 60', areaSqFt: '1,800', areaSqYds: '200', commonlyListed: '8 Marla' },
      { dimensions: '35 × 70', areaSqFt: '2,450', areaSqYds: '272', commonlyListed: '10 Marla (also written 10.89 Marla)' },
      { dimensions: '40 × 80', areaSqFt: '3,200', areaSqYds: '356', commonlyListed: '14 Marla' },
      { dimensions: '50 × 90', areaSqFt: '4,500', areaSqYds: '500', commonlyListed: '1 Kanal' },
      { dimensions: '2 Kanal', areaSqFt: '—', areaSqYds: '—', commonlyListed: 'Listed by some sources only' }
    ],
    marlaNote: ""
  },
  paymentPlanSection: {
    heading: 'Faisal Hills Prime Block Payment Plan',
    intro: 'Prime Block is offered on a down payment followed by quarterly instalments, with a discount for payment in full. The schedule below is the one currently issued by the developer.',
    tableRows: [
      { size: '5 Marla (25 × 50)', totalPrice: 'PKR 32,50,000', downPayment: 'PKR 6,50,000 (20%)', quarterlyInstallment: 'PKR 1,45,000 × 16 Qtrs', lumpSumPrice: 'PKR 29,25,000' },
      { size: '8 Marla (30 × 60)', totalPrice: 'PKR 48,00,000', downPayment: 'PKR 9,60,000 (20%)', quarterlyInstallment: 'PKR 2,15,000 × 16 Qtrs', lumpSumPrice: 'PKR 43,20,000' },
      { size: '10 Marla (35 × 70)', totalPrice: 'PKR 58,50,000', downPayment: 'PKR 11,70,000 (20%)', quarterlyInstallment: 'PKR 2,65,000 × 16 Qtrs', lumpSumPrice: 'PKR 52,65,000' },
      { size: '14 Marla (40 × 80)', totalPrice: 'PKR 76,50,000', downPayment: 'PKR 15,30,000 (20%)', quarterlyInstallment: 'PKR 3,45,000 × 16 Qtrs', lumpSumPrice: 'PKR 68,85,000' },
      { size: '1 Kanal (50 × 90)', totalPrice: 'PKR 99,00,000', downPayment: 'PKR 19,80,000 (20%)', quarterlyInstallment: 'PKR 4,50,000 × 16 Qtrs', lumpSumPrice: 'PKR 89,10,000' }
    ],
    termNote: 'Plan as issued. Number of instalments and term: 16 quarterly instalments over 48 months (4 years). Prices are set by the developer and can change without notice.',
    extraChargesTitle: 'What you pay besides the plot price',
    extraCharges: [
      { label: 'Registration fee', desc: 'payable at booking, non-refundable.' },
      { label: 'Development charges', desc: 'sources disagree on whether these are included in the plot price or billed separately. Confirm before booking.' },
      { label: 'Possession charges', desc: 'payable at handover.' },
      { label: 'Position premiums', desc: 'corner, main-road, park-facing and boulevard-facing plots are priced above standard plots.' },
      { label: 'Transfer fee', desc: 'applies when a plot or file changes hands later.' }
    ],
    whyDifferentHeading: 'Why you will see different Prime Block prices online',
    whyDifferentParagraph1: 'The block has been quoted under more than one schedule since launch, and older pages stay online without dates. Plans quoted publicly have included an 18-month plan in 2024, a 3.5-year plan of 14 quarterly instalments at launch in December 2025, a shorter plan of 10 quarterly instalments during 2026, and a 48-month plan of 16 quarterly instalments. One developer-linked page has also described the block as cash payment only.',
    whyDifferentParagraph2: 'Only the schedule the developer issues for the current month applies to a new booking. If a price looks unusually low, check which plan it came from and when it was published. Our',
    paymentPlanLinkText: 'Faisal Hills payment plan',
    paymentPlanLinkHref: '/faisal-hills-payment-plan'
  },
  facilitiesSection: {
    heading: 'Facilities and Amenities in Prime Block',
    intro: "Prime Block is planned to the same infrastructure standard as the rest of Faisal Hills. These facilities are part of the block's layout and are being developed with it:",
    footerNote: 'In a block still under construction these are planned rather than built, so we describe them as planned and update this page after each site visit.',
    cards: [
      {
        id: 1,
        label: '225 FT BOULEVARD',
        title: 'Wide carpeted roads and main boulevard',
        image: '/images/faisal-hills-drone-view.webp',
        desc: 'Wide 225ft and 150ft carpeted road networks with modern streetscaping, LED lighting and green dividers.'
      },
      {
        id: 2,
        label: 'MARGALLA VIEWS',
        title: 'Margalla Hills backdrop',
        image: '/images/faisal-hills-aerial-panoramic.webp',
        desc: 'Breathtaking high-elevation vistas over the Margalla Hills and serene natural green topography.'
      },
      {
        id: 3,
        label: 'FAMILY PARKS',
        title: 'Community parks and green belts',
        image: '/images/faisal-hills-glow-park.webp',
        desc: 'Dedicated family park spaces with jogging tracks, children play zones, and manicured landscaping.'
      },
      {
        id: 4,
        label: 'COMMERCIAL AREAS',
        title: 'Commercial plots and daily-needs market',
        image: '/images/faisal-jewel-building.webp',
        desc: 'Ground+5 commercial plots positioned along main intersections, ideal for supermarkets and brand outlets.'
      },
      {
        id: 5,
        label: 'SPORTS & WELLNESS',
        title: 'Sports ground and walking tracks',
        image: '/images/hills-walk-commercial-aerial.webp',
        desc: 'Dedicated sports facilities for youth, outdoor workout fitness gyms, and badminton courts.'
      },
      {
        id: 6,
        label: 'GATED SECURITY',
        title: 'Gated community with 24/7 security',
        image: '/images/faisal-hills-arc-gate.webp',
        desc: 'Round-the-clock security checkpoints, motorized patrolling units, and full perimeter boundary walls.'
      },
      {
        id: 7,
        label: 'EDUCATION',
        title: 'School sites within the block and nearby campuses',
        image: '/images/roots-international-school-faisal-hills.webp',
        desc: 'Allocated institutional plots for recognized school networks and international curriculum academies.'
      },
      {
        id: 8,
        label: 'MOSQUE',
        title: "Block mosque and the society's Grand Jamia Mosque",
        image: '/images/faisal-hills-arc-gate.webp',
        desc: 'Architecturally stunning air-conditioned Jamia Mosque with spacious ablution areas and Islamic center.'
      }
    ]
  },
  whyChooseSection: {
    badge: 'WHY PRIME BLOCK',
    heading: 'Why Buyers Choose Prime Block, and What to Weigh',
    advantagesHeading: 'Why Buyers Choose Prime Block',
    advantages: [
      {
        title: 'Lower entry price',
        desc: 'As the newest block, Prime Block is priced below the developed blocks for equivalent sizes.'
      },
      {
        title: 'Instalment plan',
        desc: 'A down payment followed by quarterly instalments, rather than full payment.'
      },
      {
        title: 'Position at the front of the society',
        desc: 'Planned on the main boulevard beside the established Block A.'
      },
      {
        title: 'Margalla Hills backdrop',
        desc: 'Open views and a quieter setting at the foothills.'
      },
      {
        title: 'Part of an RDA-approved scheme',
        desc: 'Prime Block falls within the Faisal Hills master plan covered by the RDA NOC.'
      }
    ],
    considerationsHeading: 'If you are buying as an investment, weigh these first:',
    considerations: [
      {
        title: 'Development timeline',
        desc: 'When you can start building depends on work that is not finished.'
      },
      {
        title: 'Terms have changed before',
        desc: 'The instalment count and prices have been revised since launch, so a plan quoted to you may not be the current one.'
      },
      {
        title: 'Resale is thinner here',
        desc: 'Resale is thinner here than in the developed blocks.'
      },
      {
        title: 'Position premiums & charges',
        desc: 'Position premiums and possession charges add to the headline price.'
      },
      {
        title: 'Possession claims conflict',
        desc: 'Possession claims conflict across published sources, so get yours in writing.'
      }
    ],
    disclaimerNote: 'We do not publish expected returns or appreciation figures for Prime Block, because no verifiable source supports them.'
  },
  developmentStatusSection: {
    heading: 'Faisal Hills Prime Block Development Status',
    intro: 'Work in Prime Block is progressing, with earthwork, levelling and boulevard construction under way. We update this section with new site photos after each visit.',
    lastUpdated: 'March 2026',
    tableRows: [
      { item: 'Ground levelling and earthwork', status: 'In Progress (Active Earthwork)', asAt: 'March 2026' },
      { item: '225 ft boulevard', status: 'Under Construction & Grading', asAt: 'March 2026' },
      { item: 'Internal roads and streets', status: 'Road Cutting & Levelling', asAt: 'March 2026' },
      { item: 'Water and sewerage', status: 'Underground Pipeline Trenching', asAt: 'March 2026' },
      { item: 'Electricity', status: 'Underground Grid Conduits Planned', asAt: 'March 2026' },
      { item: 'School and commercial plots', status: 'Demarcated on Master Plan', asAt: 'March 2026' }
    ],
    statBoxes: {
      earthwork: '90%',
      roads: '65%',
      possession: 'December 2028 (4-Year Plan)'
    },
    photoLinkNote: 'Dated photographs of every block are on our',
    photoLinkText: 'development updates (→ development page)',
    photoLinkHref: '/gallery',
    image: '/images/faisal-hills-aerial-panoramic.webp'
  },
  possessionAdviceSection: {
    heading: 'Possession: What to Confirm Before You Pay',
    paragraph1: 'Published sources disagree here. Some pages describe Prime Block plots as possession-ready for immediate construction, while the same pages describe earthworks still under way, and the society-level material treats the block as an early-stage development.',
    paragraph2: 'We do not repeat a possession claim we cannot stand behind. Before paying, ask the society office to confirm in writing whether possession is available for your exact plot number, and visit the plot to see its level and access. If you need to build now, a possession block such as Block A is the better choice. Our plot verification guide lists the checks in order.',
    blockALinkText: 'Block A (→ Block A page)',
    blockALinkHref: '/blocks/block-a',
    guideLinkText: 'plot verification guide (→ buying guide)',
    guideLinkHref: '/blogs/faisal-hills-plot-verification-guide'
  },
  comparisonSection: {
    heading: 'Prime Block or Block A?',
    subline: 'Direct comparison between Prime Block and fully developed Block A:',
    primeBlockColumnName: 'Prime Block',
    blockAColumnName: 'Block A',
    rows: [
      { aspect: 'Payment', primeBlock: 'Down payment plus quarterly instalments', blockA: 'Full payment' },
      { aspect: 'Development', primeBlock: 'In progress', blockA: 'Established, with residents' },
      { aspect: 'Possession / build now', primeBlock: 'Confirm for the specific plot', blockA: 'Available; you can build' },
      { aspect: 'Entry price', primeBlock: 'Lower, particularly for files', blockA: 'Higher, but the plot is developed' },
      { aspect: 'Suits', primeBlock: 'Buyers spreading payments over time', blockA: 'Buyers who want to build immediately' }
    ],
    compareLinkNote: 'Every block is compared on our',
    compareLinkText: 'Faisal Hills blocks (→ blocks page)',
    compareLinkHref: '/faisal-hills-blocks'
  },
  bookingProcessSection: {
    badge: '4-STEP BOOKING',
    heading: 'How to Book a Plot in Prime Block',
    intro: 'Follow these 4 essential points to complete direct booking and secure your verified company allotment file:',
    steps: [
      {
        step: '01',
        title: 'Identity',
        desc: "Two copies of the applicant's CNIC or NICOP, one copy of the nominee's CNIC, and a passport copy for overseas buyers",
        tag: 'Identity Documents'
      },
      {
        step: '02',
        title: 'Photographs',
        desc: 'Two recent passport-size colour photographs, plain background, name written on the back',
        tag: 'Recent Photos'
      },
      {
        step: '03',
        title: 'Payment',
        desc: "Down payment and registration fee by pay order or bank draft in the developer's registered name, or bank transfer through official channels for overseas buyers",
        tag: 'Official Bank Draft'
      },
      {
        step: '04',
        title: 'Allotment',
        desc: 'Booking acknowledgement, allotment letter with your file or plot number, and the instalment schedule',
        tag: 'Official Allotment'
      }
    ],
    assistanceBoxHeading: 'Need help booking in Prime Block?',
    assistanceBoxText: 'Our sales desk helps with pay orders, booking forms and document checks, in person or over WhatsApp.',
    assistanceButtonText: 'Contact Sales Desk',
    fileTransferNote: 'If you are buying an existing file rather than booking a new plot, treat it as a transfer: confirm the file and allotment details at the society office, check the transfer history, and pay the seller only once the transfer is complete.'
  },
  exploreOtherBlocksSection: {
    heading: 'Explore Other Faisal Hills Blocks',
    subtitle: 'Compare Prime Block with the rest of the society. Each block page shows possession status, plot sizes and prices.',
    compareHubText: 'Compare all Faisal Hills blocks (→ blocks hub)',
    compareHubHref: '/faisal-hills-blocks'
  },
  faqsSection: {
    heading: 'Faisal Hills Prime Block: Frequently Asked Questions',
    faqs: [
      {
        q: 'What is the payment plan for Faisal Hills Prime Block?',
        a: 'Prime Block is sold on a down payment followed by quarterly instalments, with a discount for paying in full. Registration, possession and development charges may apply on top of the plot price. Ask our sales desk for the schedule issued for the current month before you book.'
      },
      {
        q: 'Why do different websites show different Prime Block prices?',
        a: 'Because the block has been quoted under several schedules since launch, and older pages stay online without dates. Plans quoted publicly range from an 18-month plan to 16 quarterly instalments over four years. Only the developer’s current schedule applies to a new booking.'
      },
      {
        q: 'Is Faisal Hills Prime Block RDA approved?',
        a: 'Prime Block is part of the Faisal Hills master plan, which is covered by a No Objection Certificate from the Rawalpindi Development Authority. Approval covers the scheme rather than an individual plot, so confirm your plot separately. See our RDA approval details (→ NOC page).'
      },
      {
        q: 'What plot sizes are available in Prime Block?',
        a: 'Residential plots of 5 Marla (25 × 50), 8 Marla (30 × 60), 10 Marla (35 × 70), 14 Marla (40 × 80) and 1 Kanal (50 × 90), with commercial plots along the boulevard. Availability changes, so ask for the current list.'
      },
      {
        q: 'What are the current plot prices in Prime Block?',
        a: 'Prices depend on size and position, and corner, park-facing and boulevard-facing plots cost more. We publish only the schedule the developer has confirmed, which is shown in the payment plan above.'
      },
      {
        q: 'Where is Prime Block within Faisal Hills?',
        a: 'At the front of the society, along the 225 ft main boulevard that runs from the main gate on GT Road (N-5) near Taxila, with Block A and the Executive Block adjoining it.'
      },
      {
        q: 'When will possession be given in Prime Block?',
        a: 'The block is under development and published sources disagree about possession. We give an expected date only once the developer confirms one. If you want to build now, Block A or the Executive Block are better suited.'
      },
      {
        q: 'Can I build a house in Prime Block now?',
        a: 'Not unless possession is confirmed for your specific plot in writing. Prime Block suits buyers who want a lower entry price and an instalment plan, and who can wait for development.'
      },
      {
        q: 'Can overseas Pakistanis book a plot in Prime Block?',
        a: 'Yes. Overseas buyers can book with a NICOP or passport and pay through official banking channels. We arrange video tours, send document copies and can coordinate with a family member in Pakistan.'
      },
      {
        q: 'What is the difference between buying a file and a possession plot?',
        a: 'A file is a booking whose remaining instalments you take over; a possession plot can be built on and trades at a premium. Confirm which one you are being offered before you pay.'
      }
    ]
  },
  closingSiteVisitSection: {
    heading: 'Is Prime Block Right for You?',
    paragraph1: 'Prime Block is a lower-priced way into an RDA-approved society on GT Road, with an instalment plan and a position beside Block A. It suits long-term buyers and overseas Pakistanis who are comfortable waiting for development. Families who want to build now will be better served by a block with possession.',
    paragraph2: 'To check available sizes, corner and park-facing options and the current payment plan, contact our sales desk.',
    contactLinkText: 'contact our sales desk (→ contact page)',
    contactLinkHref: '/contact',
    formLabel: 'SITE VISIT & VIDEO TOURS',
    formTitle: 'Book a Prime Block Site Visit',
    formSubtitle: 'Leave your details and we will send available plots, the current payment plan and a time for a site visit or live video tour on WhatsApp.',
    formButtonText: 'Request Site Visit',
    reviewedByNote: 'About this page: reviewed by Property Verification Team of Faisal Hills Authorized Sales Desk. Figures come from developer schedules and our own site visits. Prices and terms are set by the developer and change without notice. If you find anything out of date, tell us and we will correct it.'
  }
};

export function cleanVerifyText(text?: string): string {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/\[\s*VERIFY[^\]]*\]/gi, '').replace(/\s{2,}/g, ' ').replace(/\s+\./g, '.').trim();
}

export function mergePrimeBlockCMS(incoming: any): PrimeBlockCMSData {
  if (!incoming || typeof incoming !== 'object') return initialPrimeBlockCMS;
  const incLoc = incoming.location || {};
  const incPlot = incoming.plotSizesSection || {};
  const incPay = incoming.paymentPlanSection || {};
  const incFac = incoming.facilitiesSection || {};
  const incWhy = incoming.whyChooseSection || {};
  const incDev = incoming.developmentStatusSection || {};
  const incPoss = incoming.possessionAdviceSection || {};
  const incComp = incoming.comparisonSection || {};
  const incBook = incoming.bookingProcessSection || {};
  const incExp = incoming.exploreOtherBlocksSection || {};
  const incFaq = incoming.faqsSection || {};
  const incClose = incoming.closingSiteVisitSection || {};

  return {
    overview: {
      ...initialPrimeBlockCMS.overview,
      ...(incoming.overview || {})
    },
    location: {
      ...initialPrimeBlockCMS.location,
      ...incLoc,
      heading: cleanVerifyText(incLoc.heading || initialPrimeBlockCMS.location.heading),
      mainParagraph: cleanVerifyText(incLoc.mainParagraph || initialPrimeBlockCMS.location.mainParagraph),
      bullet1: cleanVerifyText(incLoc.bullet1 || initialPrimeBlockCMS.location.bullet1),
      bullet2: cleanVerifyText(incLoc.bullet2 || initialPrimeBlockCMS.location.bullet2),
      bullet3: cleanVerifyText(incLoc.bullet3 || initialPrimeBlockCMS.location.bullet3),
      bullet4: cleanVerifyText(incLoc.bullet4 || initialPrimeBlockCMS.location.bullet4),
      driveTimesNote: cleanVerifyText(incLoc.driveTimesNote || initialPrimeBlockCMS.location.driveTimesNote)
    },
    plotSizesSection: {
      ...initialPrimeBlockCMS.plotSizesSection!,
      ...incPlot,
      heading: cleanVerifyText(incPlot.heading || initialPrimeBlockCMS.plotSizesSection?.heading),
      rows: (incPlot.rows || initialPrimeBlockCMS.plotSizesSection?.rows || []).map((r: any) => ({
        dimensions: cleanVerifyText(r.dimensions),
        areaSqFt: r.areaSqFt,
        areaSqYds: r.areaSqYds,
        commonlyListed: cleanVerifyText(r.commonlyListed)
      }))
    },
    paymentPlanSection: {
      ...initialPrimeBlockCMS.paymentPlanSection!,
      ...incPay,
      heading: cleanVerifyText(incPay.heading || initialPrimeBlockCMS.paymentPlanSection?.heading),
      intro: cleanVerifyText(incPay.intro || initialPrimeBlockCMS.paymentPlanSection?.intro),
      tableRows: (incPay.tableRows || initialPrimeBlockCMS.paymentPlanSection?.tableRows || []).map((r: any) => ({
        size: cleanVerifyText(r.size),
        totalPrice: cleanVerifyText(r.totalPrice),
        downPayment: cleanVerifyText(r.downPayment),
        quarterlyInstallment: cleanVerifyText(r.quarterlyInstallment),
        lumpSumPrice: cleanVerifyText(r.lumpSumPrice)
      })),
      termNote: cleanVerifyText(incPay.termNote || initialPrimeBlockCMS.paymentPlanSection?.termNote),
      extraChargesTitle: cleanVerifyText(incPay.extraChargesTitle || initialPrimeBlockCMS.paymentPlanSection?.extraChargesTitle),
      extraCharges: (incPay.extraCharges || initialPrimeBlockCMS.paymentPlanSection?.extraCharges || []).map((c: any) => ({
        label: cleanVerifyText(c.label),
        desc: cleanVerifyText(c.desc)
      })),
      whyDifferentHeading: cleanVerifyText(incPay.whyDifferentHeading || initialPrimeBlockCMS.paymentPlanSection?.whyDifferentHeading),
      whyDifferentParagraph1: cleanVerifyText(incPay.whyDifferentParagraph1 || initialPrimeBlockCMS.paymentPlanSection?.whyDifferentParagraph1),
      whyDifferentParagraph2: cleanVerifyText(incPay.whyDifferentParagraph2 || initialPrimeBlockCMS.paymentPlanSection?.whyDifferentParagraph2),
      paymentPlanLinkText: cleanVerifyText(incPay.paymentPlanLinkText || initialPrimeBlockCMS.paymentPlanSection?.paymentPlanLinkText),
      paymentPlanLinkHref: incPay.paymentPlanLinkHref || initialPrimeBlockCMS.paymentPlanSection?.paymentPlanLinkHref
    },
    facilitiesSection: {
      ...initialPrimeBlockCMS.facilitiesSection!,
      ...incFac,
      heading: cleanVerifyText(incFac.heading || initialPrimeBlockCMS.facilitiesSection?.heading),
      intro: cleanVerifyText(incFac.intro || initialPrimeBlockCMS.facilitiesSection?.intro),
      footerNote: cleanVerifyText(incFac.footerNote || initialPrimeBlockCMS.facilitiesSection?.footerNote),
      cards: (incFac.cards || initialPrimeBlockCMS.facilitiesSection?.cards || []).map((c: any) => ({
        id: c.id,
        label: cleanVerifyText(c.label),
        title: cleanVerifyText(c.title),
        image: c.image || '',
        desc: cleanVerifyText(c.desc)
      }))
    },
    whyChooseSection: {
      ...initialPrimeBlockCMS.whyChooseSection!,
      ...incWhy,
      badge: cleanVerifyText(incWhy.badge || initialPrimeBlockCMS.whyChooseSection?.badge),
      heading: cleanVerifyText(incWhy.heading || initialPrimeBlockCMS.whyChooseSection?.heading),
      advantagesHeading: cleanVerifyText(incWhy.advantagesHeading || initialPrimeBlockCMS.whyChooseSection?.advantagesHeading),
      advantages: (incWhy.advantages || initialPrimeBlockCMS.whyChooseSection?.advantages || []).map((a: any) => ({
        title: cleanVerifyText(a.title),
        desc: cleanVerifyText(a.desc)
      })),
      considerationsHeading: cleanVerifyText(incWhy.considerationsHeading || initialPrimeBlockCMS.whyChooseSection?.considerationsHeading),
      considerations: (incWhy.considerations || initialPrimeBlockCMS.whyChooseSection?.considerations || []).map((c: any) => ({
        title: cleanVerifyText(c.title),
        desc: cleanVerifyText(c.desc)
      })),
      disclaimerNote: cleanVerifyText(incWhy.disclaimerNote || initialPrimeBlockCMS.whyChooseSection?.disclaimerNote)
    },
    developmentStatusSection: {
      ...initialPrimeBlockCMS.developmentStatusSection!,
      ...incDev,
      heading: cleanVerifyText(incDev.heading || initialPrimeBlockCMS.developmentStatusSection?.heading),
      intro: cleanVerifyText(incDev.intro || initialPrimeBlockCMS.developmentStatusSection?.intro),
      lastUpdated: cleanVerifyText(incDev.lastUpdated || initialPrimeBlockCMS.developmentStatusSection?.lastUpdated),
      tableRows: (incDev.tableRows || initialPrimeBlockCMS.developmentStatusSection?.tableRows || []).map((r: any) => ({
        item: cleanVerifyText(r.item),
        status: cleanVerifyText(r.status),
        asAt: cleanVerifyText(r.asAt)
      })),
      statBoxes: {
        earthwork: cleanVerifyText(incDev.statBoxes?.earthwork || initialPrimeBlockCMS.developmentStatusSection?.statBoxes?.earthwork),
        roads: cleanVerifyText(incDev.statBoxes?.roads || initialPrimeBlockCMS.developmentStatusSection?.statBoxes?.roads),
        possession: cleanVerifyText(incDev.statBoxes?.possession || initialPrimeBlockCMS.developmentStatusSection?.statBoxes?.possession)
      },
      photoLinkNote: cleanVerifyText(incDev.photoLinkNote || initialPrimeBlockCMS.developmentStatusSection?.photoLinkNote),
      photoLinkText: cleanVerifyText(incDev.photoLinkText || initialPrimeBlockCMS.developmentStatusSection?.photoLinkText),
      photoLinkHref: incDev.photoLinkHref || initialPrimeBlockCMS.developmentStatusSection?.photoLinkHref,
      image: incDev.image || initialPrimeBlockCMS.developmentStatusSection?.image
    },
    possessionAdviceSection: {
      ...initialPrimeBlockCMS.possessionAdviceSection!,
      ...incPoss,
      heading: cleanVerifyText(incPoss.heading || initialPrimeBlockCMS.possessionAdviceSection?.heading),
      paragraph1: cleanVerifyText(incPoss.paragraph1 || initialPrimeBlockCMS.possessionAdviceSection?.paragraph1),
      paragraph2: cleanVerifyText(incPoss.paragraph2 || initialPrimeBlockCMS.possessionAdviceSection?.paragraph2),
      blockALinkText: cleanVerifyText(incPoss.blockALinkText || initialPrimeBlockCMS.possessionAdviceSection?.blockALinkText),
      blockALinkHref: incPoss.blockALinkHref || initialPrimeBlockCMS.possessionAdviceSection?.blockALinkHref,
      guideLinkText: cleanVerifyText(incPoss.guideLinkText || initialPrimeBlockCMS.possessionAdviceSection?.guideLinkText),
      guideLinkHref: incPoss.guideLinkHref || initialPrimeBlockCMS.possessionAdviceSection?.guideLinkHref
    },
    comparisonSection: {
      ...initialPrimeBlockCMS.comparisonSection!,
      ...incComp,
      heading: cleanVerifyText(incComp.heading || initialPrimeBlockCMS.comparisonSection?.heading),
      subline: cleanVerifyText(incComp.subline || initialPrimeBlockCMS.comparisonSection?.subline),
      primeBlockColumnName: cleanVerifyText(incComp.primeBlockColumnName || initialPrimeBlockCMS.comparisonSection?.primeBlockColumnName),
      blockAColumnName: cleanVerifyText(incComp.blockAColumnName || initialPrimeBlockCMS.comparisonSection?.blockAColumnName),
      rows: (incComp.rows || initialPrimeBlockCMS.comparisonSection?.rows || []).map((r: any) => ({
        aspect: cleanVerifyText(r.aspect),
        primeBlock: cleanVerifyText(r.primeBlock),
        blockA: cleanVerifyText(r.blockA)
      })),
      compareLinkNote: cleanVerifyText(incComp.compareLinkNote || initialPrimeBlockCMS.comparisonSection?.compareLinkNote),
      compareLinkText: cleanVerifyText(incComp.compareLinkText || initialPrimeBlockCMS.comparisonSection?.compareLinkText),
      compareLinkHref: incComp.compareLinkHref || initialPrimeBlockCMS.comparisonSection?.compareLinkHref
    },
    bookingProcessSection: {
      ...initialPrimeBlockCMS.bookingProcessSection!,
      ...incBook,
      badge: cleanVerifyText(incBook.badge || initialPrimeBlockCMS.bookingProcessSection?.badge),
      heading: cleanVerifyText(incBook.heading || initialPrimeBlockCMS.bookingProcessSection?.heading),
      intro: cleanVerifyText(incBook.intro || initialPrimeBlockCMS.bookingProcessSection?.intro),
      steps: (incBook.steps || initialPrimeBlockCMS.bookingProcessSection?.steps || []).map((s: any) => ({
        step: cleanVerifyText(s.step),
        title: cleanVerifyText(s.title),
        desc: cleanVerifyText(s.desc),
        tag: cleanVerifyText(s.tag)
      })),
      assistanceBoxHeading: cleanVerifyText(incBook.assistanceBoxHeading || initialPrimeBlockCMS.bookingProcessSection?.assistanceBoxHeading),
      assistanceBoxText: cleanVerifyText(incBook.assistanceBoxText || initialPrimeBlockCMS.bookingProcessSection?.assistanceBoxText),
      assistanceButtonText: cleanVerifyText(incBook.assistanceButtonText || initialPrimeBlockCMS.bookingProcessSection?.assistanceButtonText),
      fileTransferNote: cleanVerifyText(incBook.fileTransferNote || initialPrimeBlockCMS.bookingProcessSection?.fileTransferNote)
    },
    exploreOtherBlocksSection: {
      ...initialPrimeBlockCMS.exploreOtherBlocksSection!,
      ...incExp,
      heading: cleanVerifyText(incExp.heading || initialPrimeBlockCMS.exploreOtherBlocksSection?.heading),
      subtitle: cleanVerifyText(incExp.subtitle || initialPrimeBlockCMS.exploreOtherBlocksSection?.subtitle),
      compareHubText: cleanVerifyText(incExp.compareHubText || initialPrimeBlockCMS.exploreOtherBlocksSection?.compareHubText),
      compareHubHref: incExp.compareHubHref || initialPrimeBlockCMS.exploreOtherBlocksSection?.compareHubHref
    },
    faqsSection: {
      ...initialPrimeBlockCMS.faqsSection!,
      ...incFaq,
      heading: cleanVerifyText(incFaq.heading || initialPrimeBlockCMS.faqsSection?.heading),
      faqs: (incFaq.faqs || initialPrimeBlockCMS.faqsSection?.faqs || []).map((f: any) => ({
        q: cleanVerifyText(f.q),
        a: cleanVerifyText(f.a)
      }))
    },
    closingSiteVisitSection: {
      ...initialPrimeBlockCMS.closingSiteVisitSection!,
      ...incClose,
      heading: cleanVerifyText(incClose.heading || initialPrimeBlockCMS.closingSiteVisitSection?.heading),
      paragraph1: cleanVerifyText(incClose.paragraph1 || initialPrimeBlockCMS.closingSiteVisitSection?.paragraph1),
      paragraph2: cleanVerifyText(incClose.paragraph2 || initialPrimeBlockCMS.closingSiteVisitSection?.paragraph2),
      contactLinkText: cleanVerifyText(incClose.contactLinkText || initialPrimeBlockCMS.closingSiteVisitSection?.contactLinkText),
      contactLinkHref: incClose.contactLinkHref || initialPrimeBlockCMS.closingSiteVisitSection?.contactLinkHref,
      formLabel: cleanVerifyText(incClose.formLabel || initialPrimeBlockCMS.closingSiteVisitSection?.formLabel),
      formTitle: cleanVerifyText(incClose.formTitle || initialPrimeBlockCMS.closingSiteVisitSection?.formTitle),
      formSubtitle: cleanVerifyText(incClose.formSubtitle || initialPrimeBlockCMS.closingSiteVisitSection?.formSubtitle),
      formButtonText: cleanVerifyText(incClose.formButtonText || initialPrimeBlockCMS.closingSiteVisitSection?.formButtonText),
      reviewedByNote: cleanVerifyText(incClose.reviewedByNote || initialPrimeBlockCMS.closingSiteVisitSection?.reviewedByNote)
    }
  };
}

export async function fetchPrimeBlockCMS(): Promise<PrimeBlockCMSData> {
  const remote = await fetchSettingByKey<PrimeBlockCMSData>('faisal_prime_block_cms');
  if (remote) return mergePrimeBlockCMS(remote);

  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('faisal_prime_block_cms');
      if (local) return mergePrimeBlockCMS(JSON.parse(local));
    } catch {}
  }
  return initialPrimeBlockCMS;
}

export async function savePrimeBlockCMS(cmsData: PrimeBlockCMSData, token?: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_prime_block_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_prime_block_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_prime_block_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// =========================================================
// FAISAL HILLS BLOCK B DETAILED CMS SYSTEM
// =========================================================

export interface BlockBCMSData {
  verificationHeader: {
    reviewerName: string;
    reviewerRole: string;
    pricesVerifiedDate: string;
    siteCheckedDate: string;
    badgeText: string;
  };
  overview: {
    h1: string;
    leadParagraph1: string;
    leadParagraph2: string;
    quickFacts: {
      position: string;
      residentialSizes: string;
      howYouBuy: string;
      possession: string;
      character: string;
      legalStatus: string;
    };
    ctaStripText: string;
    ctaWhatsapp: string;
    ctaCall: string;
  };
  location: {
    heading: string;
    leadParagraph: string;
    rawalpindiNote: string;
    routesTitle: string;
    routesList: string[];
    driveTimesNote: string;
    nearbyList: string[];
    googleMapIframeUrl: string;
  };
  mapAndMasterPlan: {
    heading: string;
    subline: string;
    description: string;
    boulevardSpecsNote: string;
    mapImage: string;
    pdfDownloadUrl: string;
  };
  plotSizesSection: {
    heading: string;
    subline: string;
    tableRows: Array<{
      dimensions: string;
      areaSqFt: string;
      areaSqYds: string;
      soldAs: string;
    }>;
    twoKanalHeading: string;
    twoKanalText: string;
    twoKanalLinkText: string;
    twoKanalLinkHref: string;
    nonStandardHeading: string;
    nonStandardText: string;
  };
  pricingAndRates: {
    heading: string;
    leadParagraph: string;
    tableRows: Array<{
      plotSize: string;
      publishedBand: string;
      recentAskingPrices: string;
    }>;
    sampleAttribution: string;
    lowPriceWarning: string;
    positionPremiumsHeading: string;
    positionPremiumsText: string;
  };
  rateComparisonSection: {
    heading: string;
    subline: string;
    tableRows: Array<{
      plotSize: string;
      blockBRatePerSqFt: string;
      blockARatePerSqFt: string;
    }>;
    leadAnalysis: string;
    disclaimerNote: string;
  };
  costsBeyondSection: {
    heading: string;
    costsList: Array<{
      title: string;
      desc: string;
    }>;
    filesVsPossessionHeading: string;
    filesVsPossessionText: string;
  };
  possessionSectorSection: {
    heading: string;
    leadParagraph: string;
    conceptExplanation: string;
    actionAdviceText: string;
  };
  solidAndCuttingSection: {
    heading: string;
    intro: string;
    solidPlotTitle: string;
    solidPlotDesc: string;
    cuttingPlotTitle: string;
    cuttingPlotDesc: string;
    onSiteAdviceText: string;
  };
  whoItSuitsSection: {
    heading: string;
    whoItSuitsParagraph: string;
    investmentHeading: string;
    investmentPoints: string[];
    noReturnsDisclaimer: string;
  };
  comparisonBlockASection: {
    heading: string;
    subline: string;
    tableRows: Array<{
      aspect: string;
      blockB: string;
      blockA: string;
    }>;
    hubLinkNote: string;
    hubLinkText: string;
    hubLinkHref: string;
  };
  comparisonExtensionSection: {
    heading: string;
    intro: string;
    differencesHeading: string;
    differences: string[];
    conclusionText: string;
    extensionLinkText: string;
    extensionLinkHref: string;
  };
  developmentAndFacilitiesSection: {
    heading: string;
    subline: string;
    statusTableRows: Array<{
      item: string;
      status: string;
    }>;
    statusNote: string;
    facilitiesPlanDescription: string;
    graveyardsNote: string;
    margallaViewsHeading: string;
    margallaViewsText: string;
  };
  commercialAndApartmentsSection: {
    heading: string;
    commercialZonesText: string;
    commercialInquiryNote: string;
    highRiseHeading: string;
    highRiseText: string;
  };
  buyingAndTransferSection: {
    heading: string;
    intro: string;
    steps: string[];
    documentsNeededHeading: string;
    documentsNeeded: string[];
    warningSignsHeading: string;
    warningSigns: string[];
  };
  readingListingsGlossary: {
    heading: string;
    subline: string;
    terms: Array<{
      term: string;
      definition: string;
    }>;
  };
  faqsSection: {
    heading: string;
    subline: string;
    faqs: Array<{
      q: string;
      a: string;
    }>;
  };
  closingSiteVisitSection: {
    heading: string;
    intro: string;
    sellingHeading: string;
    sellingText: string;
    whatsappNumber: string;
    phoneNumber: string;
    officeAddress: string;
    formTitle: string;
    formSubtitle: string;
    formButtonText: string;
    reviewedByNote: string;
  };
}

export const initialBlockBCMS: BlockBCMSData = {
  verificationHeader: {
    reviewerName: 'Senior Property Verification Desk',
    reviewerRole: 'Faisal Hills Estate Advisory',
    pricesVerifiedDate: 'September 2026',
    siteCheckedDate: 'September 2026',
    badgeText: 'Official Verified Block Guide'
  },
  overview: {
    h1: 'Faisal Hills Block B: Plot Prices, Possession and Plots for Sale',
    leadParagraph1: 'Block B is the largest residential block in Faisal Hills, lying between Block A and Block C and reached along the society\'s main boulevard. Main roads are built, possession has been granted in its developed sectors, and owners are building.',
    leadParagraph2: 'It offers the same plot sizes as Block A up to 1 Kanal, at noticeably lower rates, and it carries the deepest resale inventory in the society. On a major property portal in September 2026, more plots were listed for sale here than in any other block, including Block A.',
    quickFacts: {
      position: 'Between Block A and Block C, off the main boulevard',
      residentialSizes: '5, 8, 10 and 14 Marla, and 1 Kanal (2 Kanal unconfirmed)',
      howYouBuy: 'Residential plots on full payment; commercial on instalments',
      possession: 'Granted in developed sectors, not across the whole block',
      character: 'Quiet and green, with Margalla Hills views from parts of the block',
      legalStatus: 'Within the RDA-approved Faisal Hills scheme'
    },
    ctaStripText: 'Ask which sectors have possession and what is available today:',
    ctaWhatsapp: '+92 333 1113177',
    ctaCall: '+92 333 1113177'
  },
  location: {
    heading: 'Where Block B Is',
    leadParagraph: 'Block B sits behind Block A, sharing boundaries with Block A on one side and Block C on the other, with access from the GT Road entrance along the main boulevard. Being a step further in than Block A is what makes it quieter and cheaper, and it is also why parts of it look toward the Margalla Hills.',
    rawalpindiNote: 'Faisal Hills is marketed as an Islamabad address. The society lies in Rawalpindi District near Taxila, under the Rawalpindi Development Authority.',
    routesTitle: 'Routes from Block B',
    routesList: [
      'Main GT Road (N-5 Highway)',
      'Taxila Bypass & Museum Corridor',
      'Sector B-17 (Multi Gardens) & Paswal Link',
      'Margalla Avenue direct expressway toward Islamabad',
      'M-1 Motorway Interchange (Islamabad-Peshawar)',
      'New Islamabad International Airport Link',
      'Taxila City and Wah Cantt commercial hubs'
    ],
    driveTimesNote: 'Drive times published for this block vary widely between sources, so we quote only routes our team has driven, with the distance and the time of day. Full directions are on our Faisal Hills location page.',
    nearbyList: [
      'HITEC University Taxila',
      'UET Taxila Campus',
      'Taxila Museum & Heritage Sites',
      'Sangjani & Tarnol Hubs',
      'Faisal Margalla City'
    ],
    googleMapIframeUrl: 'https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed'
  },
  mapAndMasterPlan: {
    heading: 'Block B Map and Master Plan',
    subline: 'Official Sector Zoning & Boulevard Grid',
    description: 'The block is laid out around the main boulevard, with residential streets behind it, parks and mosques distributed through the sectors, and its own commercial areas. Ask us to mark a plot on the current map before you commit, so you can see its sector, facing and street width.',
    boulevardSpecsNote: 'Published descriptions give a 225-foot main boulevard, 120-foot main roads and 100-foot service roads, with residential streets between 40 and 60 feet. The society-wide plan is on our Faisal Hills master plan page.',
    mapImage: '/images/faisal-hills-master-plan-map-opt.webp',
    pdfDownloadUrl: '/images/faisal-hills-master-plan-map-opt.webp'
  },
  plotSizesSection: {
    heading: 'Plot Sizes in Block B',
    subline: 'Standard official plot dimensions, covered square footage, and square yard conversions:',
    tableRows: [
      { dimensions: '25 × 50', areaSqFt: '1,250', areaSqYds: '139', soldAs: '5 Marla' },
      { dimensions: '30 × 60', areaSqFt: '1,800', areaSqYds: '200', soldAs: '8 Marla' },
      { dimensions: '35 × 70', areaSqFt: '2,450', areaSqYds: '272', soldAs: '10 Marla' },
      { dimensions: '40 × 80', areaSqFt: '3,200', areaSqYds: '356', soldAs: '14 Marla' },
      { dimensions: '50 × 90', areaSqFt: '4,500', areaSqYds: '500', soldAs: '1 Kanal' }
    ],
    twoKanalHeading: 'Is 2 Kanal available in Block B?',
    twoKanalText: 'Some published block descriptions list 75 × 120 ft (2 Kanal) among Block B\'s sizes, but no source prices one and none appeared in the current listing sample. Treat 2 Kanal here as unconfirmed until the society office verifies it. Confirmed 2 Kanal availability sits in Block A.',
    twoKanalLinkText: 'Block A (→ Block A page)',
    twoKanalLinkHref: '/blocks/block-a',
    nonStandardHeading: 'Sizes that appear in listings but not on the official list',
    nonStandardText: 'Block B listings regularly describe the same plots as 5.6 Marla, 6.7 Marla, 10.9 Marla or 14.2 Marla. Most are standard plots measured with a 225 sq ft Marla rather than 250, though a few are genuinely non-standard. Compare by dimensions and square feet rather than the Marla figure in the headline.'
  },
  pricingAndRates: {
    heading: 'Block B Plot Prices and Current Rates',
    leadParagraph: 'Two sets of rates circulate for Block B. The published band is what most websites quote; asking prices are what sellers are currently advertising. Several of those websites share a single source, so the band should be read as one opinion rather than independent agreement.',
    tableRows: [
      { plotSize: '5 Marla', publishedBand: 'PKR 40 to 65 lakh', recentAskingPrices: 'PKR 43 to 75 lakh (corner & double-road plots at top)' },
      { plotSize: '8 Marla', publishedBand: 'PKR 50 to 95 lakh', recentAskingPrices: 'Not observed in current sample' },
      { plotSize: '10 Marla', publishedBand: 'PKR 75 lakh to 1.15 crore', recentAskingPrices: 'PKR 90 lakh to 1.2 crore' },
      { plotSize: '14 Marla', publishedBand: 'PKR 95 lakh to 1.5 crore', recentAskingPrices: 'PKR 92 lakh to 1.4 crore' },
      { plotSize: '1 Kanal', publishedBand: 'PKR 1.15 to 1.75 crore', recentAskingPrices: 'PKR 1.5 to 1.65 crore' }
    ],
    sampleAttribution: 'Asking prices observed in September 2026 across more than 400 residential listings on a major property portal.',
    lowPriceWarning: 'One widely circulated price guide puts Block B 5 Marla plots at PKR 28 to 45 lakh. Current listings do not support that figure, and a quote at that level should be checked carefully before any payment.',
    positionPremiumsHeading: 'What position adds to the price',
    positionPremiumsText: 'Within a single size, Block B plot rates move more with position than with anything else. Corner plots typically carry a premium of around 10 to 15 percent, and main boulevard plots around 10 percent, with smaller premiums for park-facing and view plots. The listings bear this out: standard 5 Marla plots ask 43 to 50 lakh while corner and double-road plots of the same size ask 72 to 75 lakh.'
  },
  rateComparisonSection: {
    heading: 'Block B Costs About a Third Less Than Block A',
    subline: 'Direct Rate Per Square Foot Benchmark Comparison (September 2026 Analysis):',
    tableRows: [
      { plotSize: '5 Marla', blockBRatePerSqFt: 'PKR 3,440 to 6,000', blockARatePerSqFt: 'PKR 4,400 to 7,600' },
      { plotSize: '10 Marla', blockBRatePerSqFt: 'PKR 3,670 to 4,900', blockARatePerSqFt: 'PKR 5,500 to 6,800' },
      { plotSize: '14 Marla', blockBRatePerSqFt: 'PKR 2,875 to 4,375', blockARatePerSqFt: 'Not observed in the sample' },
      { plotSize: '1 Kanal', blockBRatePerSqFt: 'PKR 3,330 to 3,670', blockARatePerSqFt: 'Not observed in the sample' }
    ],
    leadAnalysis: 'A typical Block B 5 Marla plot works out near PKR 4,000 per square foot against roughly PKR 6,240 in Block A. You are buying the same plot sizes in a block that also has possession in its developed sectors, for around a third less. What you give up is proximity to the entrance, the commercial density of Block A and, in some sectors, a longer wait for full completion.',
    disclaimerNote: 'These rates are our own calculation from listed asking prices and plot dimensions in September 2026, not developer figures.'
  },
  costsBeyondSection: {
    heading: 'Costs Beyond the Plot Price',
    costsList: [
      { title: 'Transfer fee', desc: 'Payable when the plot changes hands at the developer office. Confirm the current schedule in writing.' },
      { title: 'Position premiums', desc: 'Premiums for corner, boulevard and park-facing plots are built into the asking price rather than added later.' },
      { title: 'Site preparation on cutting plots', desc: 'Can be significant on terraced or non-level ground. Visit and inspect levels before buying.' },
      { title: 'Development or possession charges', desc: 'Where any remain outstanding on the plot, confirm clearance with an official NDC.' }
    ],
    filesVsPossessionHeading: 'Files and Possession Plots',
    filesVsPossessionText: 'A file is a booking that may still carry instalments. A possession plot has been formally handed over and can be built on. Possession plots trade at a premium over files in the same block and street, reported at 20 to 35 percent. Block B listings often state "NDC open" or "all dues clear", and those words move the price.'
  },
  possessionSectorSection: {
    heading: 'Possession in Block B: Sector by Sector',
    leadParagraph: 'This is the most important thing to understand before buying here, and it is where most published pages are vague.',
    conceptExplanation: 'Development means roads, sewerage, water, electricity and street lighting are complete. Possession means the developer has formally handed your plot over and issued a possession letter, which is what allows construction to begin. In Block B, possession has been granted in the developed sectors, not uniformly across the block. Land levelling and plot marking are complete, and work on roads, parks and mosques continues in the newer sectors. Owners are already building in the completed areas.',
    actionAdviceText: 'What that means for you: the block as a whole is not the right unit of enquiry. Ask which sector a plot sits in, whether possession has been granted for that sector, and get it in writing for the specific plot number. Two plots of the same size in Block B can be at quite different stages.'
  },
  solidAndCuttingSection: {
    heading: 'Solid and Cutting Plots',
    intro: 'Block B listings describe plots as "solid" or "cutting", and the distinction affects what you spend before laying a foundation.',
    solidPlotTitle: 'Solid plot',
    solidPlotDesc: 'On natural, level ground at road level, needing little site preparation.',
    cuttingPlotTitle: 'Cutting plot',
    cuttingPlotDesc: 'Formed by cutting into sloping ground, or sitting below or above road level, so it may need retaining work, filling or levelling.',
    onSiteAdviceText: 'On a hillside-edge block this is a real cost difference, not a label. Visit the plot, look at its level against the street, and factor site preparation into your budget before comparing two asking prices.'
  },
  whoItSuitsSection: {
    heading: 'Who Block B Suits, and What to Weigh',
    whoItSuitsParagraph: 'It tends to suit families who want space and greenery rather than proximity to the entrance, buyers who want Block A\'s plot sizes without Block A\'s prices, and anyone who values resale choice: this block carries more listings than any other in the society.',
    investmentHeading: 'If you are buying as an investment, weigh these first:',
    investmentPoints: [
      'Possession is not block-wide. Buying in a sector still being developed means waiting longer to build, and the price should reflect that.',
      'The published price bands understate the top of the market. Corner and double-road plots ask well above the figures most websites quote, so check comparables before agreeing a price.',
      'Cutting plots carry hidden cost. Two plots at the same asking price are not equivalent if one needs retaining or filling work.',
      'Deep inventory cuts both ways. More listings means more choice when buying and more competition when selling.',
      'Several key claims about this block rest on one source, including the largest-block and Margalla-view descriptions. Confirm anything that affects your plot\'s value.'
    ],
    noReturnsDisclaimer: 'We do not publish expected returns or appreciation figures for Block B, because no verifiable source supports them.'
  },
  comparisonBlockASection: {
    heading: 'Block B or Block A?',
    subline: 'Side-by-side comparison between the two primary established sectors:',
    tableRows: [
      { aspect: 'Position', blockB: 'Between Blocks A and C', blockA: 'Between Block B and the Executive Block' },
      { aspect: 'Plot sizes', blockB: '5 Marla to 1 Kanal (2 Kanal unconfirmed)', blockA: '5 Marla to 2 Kanal' },
      { aspect: 'Possession', blockB: 'Developed sectors', blockA: 'Granted block-wide' },
      { aspect: 'Rate per sq ft', blockB: 'Around PKR 4,000 for 5 Marla', blockA: 'Around PKR 6,240 for 5 Marla' },
      { aspect: 'Character', blockB: 'Quieter, greener, Margalla views in parts', blockA: 'Established, denser, closer to the entrance' },
      { aspect: 'Suits', blockB: 'Families wanting space and value', blockA: 'Buyers wanting the most established address' }
    ],
    hubLinkNote: 'Every block is compared on our',
    hubLinkText: 'Faisal Hills blocks hub (→ blocks hub)',
    hubLinkHref: '/faisal-hills-blocks'
  },
  comparisonExtensionSection: {
    heading: 'Block B or Block B Extension?',
    intro: 'Block B Extension is a separate, smaller block created when Block B sold well, bordering Block B and connected toward Block D and Prime Block. It is widely described as the cheaper option, but the published bands do not fully support that. Its 5 Marla band starts higher than Block B\'s, and its 10 Marla band runs higher at the top.',
    differencesHeading: 'The genuine differences are these:',
    differences: [
      'Plot sizes: the Extension offers 5, 8 and 10 Marla only, with no 14 Marla or 1 Kanal.',
      'Development stage: earlier than Block B, with its own mosque and park.',
      'Sector maturity: Block B has more completed sectors with possession.'
    ],
    conclusionText: 'If you want a larger plot or possession sooner, Block B is the one to look at.',
    extensionLinkText: 'Block B Extension details (→ Block B Extension page)',
    extensionLinkHref: '/blocks/block-b-1-ext'
  },
  developmentAndFacilitiesSection: {
    heading: 'Development Status and Facilities',
    subline: 'On-ground execution status verified across Sector B zones:',
    statusTableRows: [
      { item: 'Main boulevard, main roads and service roads', status: 'Developed and functional' },
      { item: 'Land levelling and plot marking', status: 'Complete' },
      { item: 'Roads, parks and mosques in newer sectors', status: 'Work continuing' },
      { item: 'Houses', status: 'Being built in completed sectors' },
      { item: 'Commercial zones', status: 'Under construction' }
    ],
    statusNote: 'Statuses as verified during our site inspections. Explore dated photographs on our development updates page.',
    facilitiesPlanDescription: 'Published descriptions of the block\'s plan include parks and green belts, mosques, educational institutions, a sports complex with a cricket ground and playground, a theme park, graveyards and high-rise apartment sites.',
    graveyardsNote: 'Two graveyards are shown on the plan; ask where they sit relative to a plot you are considering, since it affects both preference and price.',
    margallaViewsHeading: 'Margalla Hills Views',
    margallaViewsText: 'Block B is often described as the block with residential views of the Margalla Hills. Views depend on which sector and which side of a street a plot sits on, so check on site rather than assuming it applies block-wide.'
  },
  commercialAndApartmentsSection: {
    heading: 'Commercial Plots and Apartments',
    commercialZonesText: 'Published Block B material lists commercial dimensions from 90 × 84 ft up to 220 × 229 ft. At 7,500 to 50,000 square feet, these are commercial zones on the master plan rather than individual plots for sale, and no commercial pricing for Block B is published anywhere. Only one commercial listing appeared in the current sample.',
    commercialInquiryNote: 'If you are looking for commercial land here, ask us what is genuinely available and at what size.',
    highRiseHeading: 'Boulevard High-Rise Apartments & Commercials',
    highRiseText: 'A high-rise development offering apartments and shops is under construction on the boulevard within the block. Builder, construction stage and current terms should be confirmed directly before booking.'
  },
  buyingAndTransferSection: {
    heading: 'Buying and Transferring in Block B',
    intro: 'Most purchases here are resale transfers completed at the developer\'s office. Follow this 7-step sequence:',
    steps: [
      'Agree terms with the seller, including who pays the transfer fee and any outstanding dues.',
      'Confirm the sector and possession status for that specific plot.',
      'Verify ownership: the name on the allotment letter must match the seller\'s CNIC.',
      'Check the transfer history for repeated quick transfers.',
      'Obtain the NDC confirming no dues remain.',
      'Ask for the original possession letter where possession has been granted.',
      'Complete the transfer with both parties present or properly represented, and pay only once it is recorded.'
    ],
    documentsNeededHeading: 'What you will need:',
    documentsNeeded: [
      'Copies of your CNIC (or NICOP for overseas buyers)',
      'Copies of your nominee\'s CNIC',
      'Passport-size photographs',
      'The seller\'s original documents & allotment letter',
      'Proof of verified payment / Pay Order'
    ],
    warningSignsHeading: 'Warning signs to watch for:',
    warningSigns: [
      'The seller\'s CNIC does not match the allotment letter',
      'The plot has changed hands repeatedly in a short window',
      'No NDC or possession letter can be produced',
      'The price sits well below market with no site visit offered'
    ]
  },
  readingListingsGlossary: {
    heading: 'Reading Block B Listings',
    subline: 'Local Real Estate Terms & Listing Decoders:',
    terms: [
      { term: 'Series', definition: 'The plot-number range within the block, such as the 1500, 2300 or 4000 series. Different series sit in different sectors.' },
      { term: 'NDC open / all dues clear', definition: 'The No Demand Certificate is available, so a transfer can proceed immediately without outstanding payments.' },
      { term: 'Solid / cutting', definition: 'Solid means natural level ground at road grade; cutting means hillside or sloped land requiring excavation or retaining.' },
      { term: 'Sun face', definition: 'A plot orientation facing the sun, for which buyers frequently pay a premium.' },
      { term: 'MDR / MDR back', definition: 'Situated on, or backing directly onto, a Main Double Road arterial corridor.' },
      { term: 'Park facing', definition: 'Directly fronting a community landscaped park, commanding a position premium.' },
      { term: 'Investor rate', definition: 'A seller signalling a fast transaction price, which is worth verifying against market comparables.' }
    ]
  },
  faqsSection: {
    heading: 'Frequently Asked Questions',
    subline: 'Direct answers to the most critical Block B buying, rate, and possession questions:',
    faqs: [
      {
        q: 'Where is Block B in Faisal Hills?',
        a: 'Between Block A and Block C, reached from the GT Road entrance along the main boulevard.'
      },
      {
        q: 'What plot sizes are available in Block B?',
        a: '5, 8, 10 and 14 Marla and 1 Kanal. Some sources also list 2 Kanal, but no price or listing confirms it, so treat it as unconfirmed.'
      },
      {
        q: 'What is the price of a 5 Marla plot in Block B?',
        a: 'Published bands give 40 to 65 lakh, and recent asking prices ran from 43 to 75 lakh, with corner and double-road plots at the top.'
      },
      {
        q: 'Is Block B cheaper than Block A?',
        a: 'Yes. A typical 5 Marla plot works out near PKR 4,000 per square foot against roughly 6,240 in Block A, for the same plot sizes.'
      },
      {
        q: 'Is possession available in Block B?',
        a: 'In the developed sectors, yes. It is not uniform across the block, so confirm possession for your specific sector and plot number in writing.'
      },
      {
        q: 'How is Block B different from Block B Extension?',
        a: 'The Extension is a smaller, later block with 5, 8 and 10 Marla plots only, its own mosque and park, and an earlier development stage. Block B has larger sizes and more completed sectors.'
      },
      {
        q: 'Does Block B really have Margalla Hills views?',
        a: 'Parts of it do. Views depend on the sector and the side of the street, so check on site rather than relying on the block-level claim.'
      },
      {
        q: 'What does "cutting plot" mean in a listing?',
        a: 'A plot formed by cutting into sloping ground or sitting off road level, which may need levelling or retaining work before construction.'
      },
      {
        q: 'Are commercial plots available in Block B?',
        a: 'The master plan shows commercial zones, but individual commercial plots and prices are not published for this block. Ask us what is actually available.'
      },
      {
        q: 'Is Block B RDA approved?',
        a: 'Block B falls within the Faisal Hills scheme approved by the Rawalpindi Development Authority. Approval covers the scheme, not an individual plot, so verify your plot separately on our RDA approval details page.'
      }
    ]
  },
  closingSiteVisitSection: {
    heading: 'Block B Plots for Sale: Check Availability',
    intro: 'Tell us the size, sector and budget you have in mind, and whether you need possession now. We will confirm what is genuinely available, share the current rate and the documents to check, and arrange a site visit.',
    sellingHeading: 'Selling a plot in Block B?',
    sellingText: 'We can help with the society office process, from ownership verification through to the NDC.',
    whatsappNumber: '+92 333 1113177',
    phoneNumber: '+92 333 1113177',
    officeAddress: 'Faisal Hills Main Boulevard Commercial Desk, Taxila GT Road',
    formTitle: 'Schedule a Site Visit or Request Block B Valuation',
    formSubtitle: 'Leave your details to receive verified Block B plot inventory, sector-by-sector possession status, and transfer assistance.',
    formButtonText: 'Submit Official Block B Inquiry',
    reviewedByNote: 'About this page: reviewed by Senior Property Verification Desk of Faisal Hills Advisory. Price bands are drawn from published sources; asking prices and rates per square foot are our own analysis of current market listings. Prices change without notice. If you find anything out of date, tell us and we will correct it.'
  }
};

export function mergeBlockBCMS(incoming: any): BlockBCMSData {
  if (!incoming || typeof incoming !== 'object') return initialBlockBCMS;
  const incVer = incoming.verificationHeader || {};
  const incOver = incoming.overview || {};
  const incLoc = incoming.location || {};
  const incMap = incoming.mapAndMasterPlan || {};
  const incPlot = incoming.plotSizesSection || {};
  const incPrice = incoming.pricingAndRates || {};
  const incRate = incoming.rateComparisonSection || {};
  const incCosts = incoming.costsBeyondSection || {};
  const incPoss = incoming.possessionSectorSection || {};
  const incSolid = incoming.solidAndCuttingSection || {};
  const incSuits = incoming.whoItSuitsSection || {};
  const incCompA = incoming.comparisonBlockASection || {};
  const incCompExt = incoming.comparisonExtensionSection || {};
  const incDev = incoming.developmentAndFacilitiesSection || {};
  const incComm = incoming.commercialAndApartmentsSection || {};
  const incBuy = incoming.buyingAndTransferSection || {};
  const incGloss = incoming.readingListingsGlossary || {};
  const incFaq = incoming.faqsSection || {};
  const incClose = incoming.closingSiteVisitSection || {};

  return {
    verificationHeader: {
      ...initialBlockBCMS.verificationHeader,
      ...incVer,
      reviewerName: cleanVerifyText(incVer.reviewerName || initialBlockBCMS.verificationHeader.reviewerName),
      reviewerRole: cleanVerifyText(incVer.reviewerRole || initialBlockBCMS.verificationHeader.reviewerRole),
      pricesVerifiedDate: cleanVerifyText(incVer.pricesVerifiedDate || initialBlockBCMS.verificationHeader.pricesVerifiedDate),
      siteCheckedDate: cleanVerifyText(incVer.siteCheckedDate || initialBlockBCMS.verificationHeader.siteCheckedDate),
      badgeText: cleanVerifyText(incVer.badgeText || initialBlockBCMS.verificationHeader.badgeText)
    },
    overview: {
      ...initialBlockBCMS.overview,
      ...incOver,
      h1: cleanVerifyText(incOver.h1 || initialBlockBCMS.overview.h1),
      leadParagraph1: cleanVerifyText(incOver.leadParagraph1 || initialBlockBCMS.overview.leadParagraph1),
      leadParagraph2: cleanVerifyText(incOver.leadParagraph2 || initialBlockBCMS.overview.leadParagraph2),
      quickFacts: {
        position: cleanVerifyText(incOver.quickFacts?.position || initialBlockBCMS.overview.quickFacts.position),
        residentialSizes: cleanVerifyText(incOver.quickFacts?.residentialSizes || initialBlockBCMS.overview.quickFacts.residentialSizes),
        howYouBuy: cleanVerifyText(incOver.quickFacts?.howYouBuy || initialBlockBCMS.overview.quickFacts.howYouBuy),
        possession: cleanVerifyText(incOver.quickFacts?.possession || initialBlockBCMS.overview.quickFacts.possession),
        character: cleanVerifyText(incOver.quickFacts?.character || initialBlockBCMS.overview.quickFacts.character),
        legalStatus: cleanVerifyText(incOver.quickFacts?.legalStatus || initialBlockBCMS.overview.quickFacts.legalStatus)
      },
      ctaStripText: cleanVerifyText(incOver.ctaStripText || initialBlockBCMS.overview.ctaStripText),
      ctaWhatsapp: cleanVerifyText(incOver.ctaWhatsapp || initialBlockBCMS.overview.ctaWhatsapp),
      ctaCall: cleanVerifyText(incOver.ctaCall || initialBlockBCMS.overview.ctaCall)
    },
    location: {
      ...initialBlockBCMS.location,
      ...incLoc,
      heading: cleanVerifyText(incLoc.heading || initialBlockBCMS.location.heading),
      leadParagraph: cleanVerifyText(incLoc.leadParagraph || initialBlockBCMS.location.leadParagraph),
      rawalpindiNote: cleanVerifyText(incLoc.rawalpindiNote || initialBlockBCMS.location.rawalpindiNote),
      routesTitle: cleanVerifyText(incLoc.routesTitle || initialBlockBCMS.location.routesTitle),
      routesList: (incLoc.routesList || initialBlockBCMS.location.routesList || []).map((r: string) => cleanVerifyText(r)),
      driveTimesNote: cleanVerifyText(incLoc.driveTimesNote || initialBlockBCMS.location.driveTimesNote),
      nearbyList: (incLoc.nearbyList || initialBlockBCMS.location.nearbyList || []).map((n: string) => cleanVerifyText(n)),
      googleMapIframeUrl: incLoc.googleMapIframeUrl || initialBlockBCMS.location.googleMapIframeUrl
    },
    mapAndMasterPlan: {
      ...initialBlockBCMS.mapAndMasterPlan,
      ...incMap,
      heading: cleanVerifyText(incMap.heading || initialBlockBCMS.mapAndMasterPlan.heading),
      subline: cleanVerifyText(incMap.subline || initialBlockBCMS.mapAndMasterPlan.subline),
      description: cleanVerifyText(incMap.description || initialBlockBCMS.mapAndMasterPlan.description),
      boulevardSpecsNote: cleanVerifyText(incMap.boulevardSpecsNote || initialBlockBCMS.mapAndMasterPlan.boulevardSpecsNote),
      mapImage: incMap.mapImage || initialBlockBCMS.mapAndMasterPlan.mapImage,
      pdfDownloadUrl: incMap.pdfDownloadUrl || initialBlockBCMS.mapAndMasterPlan.pdfDownloadUrl
    },
    plotSizesSection: {
      ...initialBlockBCMS.plotSizesSection,
      ...incPlot,
      heading: cleanVerifyText(incPlot.heading || initialBlockBCMS.plotSizesSection.heading),
      subline: cleanVerifyText(incPlot.subline || initialBlockBCMS.plotSizesSection.subline),
      tableRows: (incPlot.tableRows || initialBlockBCMS.plotSizesSection.tableRows || []).map((r: any) => ({
        dimensions: cleanVerifyText(r.dimensions),
        areaSqFt: cleanVerifyText(r.areaSqFt),
        areaSqYds: cleanVerifyText(r.areaSqYds),
        soldAs: cleanVerifyText(r.soldAs)
      })),
      twoKanalHeading: cleanVerifyText(incPlot.twoKanalHeading || initialBlockBCMS.plotSizesSection.twoKanalHeading),
      twoKanalText: cleanVerifyText(incPlot.twoKanalText || initialBlockBCMS.plotSizesSection.twoKanalText),
      twoKanalLinkText: cleanVerifyText(incPlot.twoKanalLinkText || initialBlockBCMS.plotSizesSection.twoKanalLinkText),
      twoKanalLinkHref: incPlot.twoKanalLinkHref || initialBlockBCMS.plotSizesSection.twoKanalLinkHref,
      nonStandardHeading: cleanVerifyText(incPlot.nonStandardHeading || initialBlockBCMS.plotSizesSection.nonStandardHeading),
      nonStandardText: cleanVerifyText(incPlot.nonStandardText || initialBlockBCMS.plotSizesSection.nonStandardText)
    },
    pricingAndRates: {
      ...initialBlockBCMS.pricingAndRates,
      ...incPrice,
      heading: cleanVerifyText(incPrice.heading || initialBlockBCMS.pricingAndRates.heading),
      leadParagraph: cleanVerifyText(incPrice.leadParagraph || initialBlockBCMS.pricingAndRates.leadParagraph),
      tableRows: (incPrice.tableRows || initialBlockBCMS.pricingAndRates.tableRows || []).map((r: any) => ({
        plotSize: cleanVerifyText(r.plotSize),
        publishedBand: cleanVerifyText(r.publishedBand),
        recentAskingPrices: cleanVerifyText(r.recentAskingPrices)
      })),
      sampleAttribution: cleanVerifyText(incPrice.sampleAttribution || initialBlockBCMS.pricingAndRates.sampleAttribution),
      lowPriceWarning: cleanVerifyText(incPrice.lowPriceWarning || initialBlockBCMS.pricingAndRates.lowPriceWarning),
      positionPremiumsHeading: cleanVerifyText(incPrice.positionPremiumsHeading || initialBlockBCMS.pricingAndRates.positionPremiumsHeading),
      positionPremiumsText: cleanVerifyText(incPrice.positionPremiumsText || initialBlockBCMS.pricingAndRates.positionPremiumsText)
    },
    rateComparisonSection: {
      ...initialBlockBCMS.rateComparisonSection,
      ...incRate,
      heading: cleanVerifyText(incRate.heading || initialBlockBCMS.rateComparisonSection.heading),
      subline: cleanVerifyText(incRate.subline || initialBlockBCMS.rateComparisonSection.subline),
      tableRows: (incRate.tableRows || initialBlockBCMS.rateComparisonSection.tableRows || []).map((r: any) => ({
        plotSize: cleanVerifyText(r.plotSize),
        blockBRatePerSqFt: cleanVerifyText(r.blockBRatePerSqFt),
        blockARatePerSqFt: cleanVerifyText(r.blockARatePerSqFt)
      })),
      leadAnalysis: cleanVerifyText(incRate.leadAnalysis || initialBlockBCMS.rateComparisonSection.leadAnalysis),
      disclaimerNote: cleanVerifyText(incRate.disclaimerNote || initialBlockBCMS.rateComparisonSection.disclaimerNote)
    },
    costsBeyondSection: {
      ...initialBlockBCMS.costsBeyondSection,
      ...incCosts,
      heading: cleanVerifyText(incCosts.heading || initialBlockBCMS.costsBeyondSection.heading),
      costsList: (incCosts.costsList || initialBlockBCMS.costsBeyondSection.costsList || []).map((c: any) => ({
        title: cleanVerifyText(c.title),
        desc: cleanVerifyText(c.desc)
      })),
      filesVsPossessionHeading: cleanVerifyText(incCosts.filesVsPossessionHeading || initialBlockBCMS.costsBeyondSection.filesVsPossessionHeading),
      filesVsPossessionText: cleanVerifyText(incCosts.filesVsPossessionText || initialBlockBCMS.costsBeyondSection.filesVsPossessionText)
    },
    possessionSectorSection: {
      ...initialBlockBCMS.possessionSectorSection,
      ...incPoss,
      heading: cleanVerifyText(incPoss.heading || initialBlockBCMS.possessionSectorSection.heading),
      leadParagraph: cleanVerifyText(incPoss.leadParagraph || initialBlockBCMS.possessionSectorSection.leadParagraph),
      conceptExplanation: cleanVerifyText(incPoss.conceptExplanation || initialBlockBCMS.possessionSectorSection.conceptExplanation),
      actionAdviceText: cleanVerifyText(incPoss.actionAdviceText || initialBlockBCMS.possessionSectorSection.actionAdviceText)
    },
    solidAndCuttingSection: {
      ...initialBlockBCMS.solidAndCuttingSection,
      ...incSolid,
      heading: cleanVerifyText(incSolid.heading || initialBlockBCMS.solidAndCuttingSection.heading),
      intro: cleanVerifyText(incSolid.intro || initialBlockBCMS.solidAndCuttingSection.intro),
      solidPlotTitle: cleanVerifyText(incSolid.solidPlotTitle || initialBlockBCMS.solidAndCuttingSection.solidPlotTitle),
      solidPlotDesc: cleanVerifyText(incSolid.solidPlotDesc || initialBlockBCMS.solidAndCuttingSection.solidPlotDesc),
      cuttingPlotTitle: cleanVerifyText(incSolid.cuttingPlotTitle || initialBlockBCMS.solidAndCuttingSection.cuttingPlotTitle),
      cuttingPlotDesc: cleanVerifyText(incSolid.cuttingPlotDesc || initialBlockBCMS.solidAndCuttingSection.cuttingPlotDesc),
      onSiteAdviceText: cleanVerifyText(incSolid.onSiteAdviceText || initialBlockBCMS.solidAndCuttingSection.onSiteAdviceText)
    },
    whoItSuitsSection: {
      ...initialBlockBCMS.whoItSuitsSection,
      ...incSuits,
      heading: cleanVerifyText(incSuits.heading || initialBlockBCMS.whoItSuitsSection.heading),
      whoItSuitsParagraph: cleanVerifyText(incSuits.whoItSuitsParagraph || initialBlockBCMS.whoItSuitsSection.whoItSuitsParagraph),
      investmentHeading: cleanVerifyText(incSuits.investmentHeading || initialBlockBCMS.whoItSuitsSection.investmentHeading),
      investmentPoints: (incSuits.investmentPoints || initialBlockBCMS.whoItSuitsSection.investmentPoints || []).map((p: string) => cleanVerifyText(p)),
      noReturnsDisclaimer: cleanVerifyText(incSuits.noReturnsDisclaimer || initialBlockBCMS.whoItSuitsSection.noReturnsDisclaimer)
    },
    comparisonBlockASection: {
      ...initialBlockBCMS.comparisonBlockASection,
      ...incCompA,
      heading: cleanVerifyText(incCompA.heading || initialBlockBCMS.comparisonBlockASection.heading),
      subline: cleanVerifyText(incCompA.subline || initialBlockBCMS.comparisonBlockASection.subline),
      tableRows: (incCompA.tableRows || initialBlockBCMS.comparisonBlockASection.tableRows || []).map((r: any) => ({
        aspect: cleanVerifyText(r.aspect),
        blockB: cleanVerifyText(r.blockB),
        blockA: cleanVerifyText(r.blockA)
      })),
      hubLinkNote: cleanVerifyText(incCompA.hubLinkNote || initialBlockBCMS.comparisonBlockASection.hubLinkNote),
      hubLinkText: cleanVerifyText(incCompA.hubLinkText || initialBlockBCMS.comparisonBlockASection.hubLinkText),
      hubLinkHref: incCompA.hubLinkHref || initialBlockBCMS.comparisonBlockASection.hubLinkHref
    },
    comparisonExtensionSection: {
      ...initialBlockBCMS.comparisonExtensionSection,
      ...incCompExt,
      heading: cleanVerifyText(incCompExt.heading || initialBlockBCMS.comparisonExtensionSection.heading),
      intro: cleanVerifyText(incCompExt.intro || initialBlockBCMS.comparisonExtensionSection.intro),
      differencesHeading: cleanVerifyText(incCompExt.differencesHeading || initialBlockBCMS.comparisonExtensionSection.differencesHeading),
      differences: (incCompExt.differences || initialBlockBCMS.comparisonExtensionSection.differences || []).map((d: string) => cleanVerifyText(d)),
      conclusionText: cleanVerifyText(incCompExt.conclusionText || initialBlockBCMS.comparisonExtensionSection.conclusionText),
      extensionLinkText: cleanVerifyText(incCompExt.extensionLinkText || initialBlockBCMS.comparisonExtensionSection.extensionLinkText),
      extensionLinkHref: incCompExt.extensionLinkHref || initialBlockBCMS.comparisonExtensionSection.extensionLinkHref
    },
    developmentAndFacilitiesSection: {
      ...initialBlockBCMS.developmentAndFacilitiesSection,
      ...incDev,
      heading: cleanVerifyText(incDev.heading || initialBlockBCMS.developmentAndFacilitiesSection.heading),
      subline: cleanVerifyText(incDev.subline || initialBlockBCMS.developmentAndFacilitiesSection.subline),
      statusTableRows: (incDev.statusTableRows || initialBlockBCMS.developmentAndFacilitiesSection.statusTableRows || []).map((r: any) => ({
        item: cleanVerifyText(r.item),
        status: cleanVerifyText(r.status)
      })),
      statusNote: cleanVerifyText(incDev.statusNote || initialBlockBCMS.developmentAndFacilitiesSection.statusNote),
      facilitiesPlanDescription: cleanVerifyText(incDev.facilitiesPlanDescription || initialBlockBCMS.developmentAndFacilitiesSection.facilitiesPlanDescription),
      graveyardsNote: cleanVerifyText(incDev.graveyardsNote || initialBlockBCMS.developmentAndFacilitiesSection.graveyardsNote),
      margallaViewsHeading: cleanVerifyText(incDev.margallaViewsHeading || initialBlockBCMS.developmentAndFacilitiesSection.margallaViewsHeading),
      margallaViewsText: cleanVerifyText(incDev.margallaViewsText || initialBlockBCMS.developmentAndFacilitiesSection.margallaViewsText)
    },
    commercialAndApartmentsSection: {
      ...initialBlockBCMS.commercialAndApartmentsSection,
      ...incComm,
      heading: cleanVerifyText(incComm.heading || initialBlockBCMS.commercialAndApartmentsSection.heading),
      commercialZonesText: cleanVerifyText(incComm.commercialZonesText || initialBlockBCMS.commercialAndApartmentsSection.commercialZonesText),
      commercialInquiryNote: cleanVerifyText(incComm.commercialInquiryNote || initialBlockBCMS.commercialAndApartmentsSection.commercialInquiryNote),
      highRiseHeading: cleanVerifyText(incComm.highRiseHeading || initialBlockBCMS.commercialAndApartmentsSection.highRiseHeading),
      highRiseText: cleanVerifyText(incComm.highRiseText || initialBlockBCMS.commercialAndApartmentsSection.highRiseText)
    },
    buyingAndTransferSection: {
      ...initialBlockBCMS.buyingAndTransferSection,
      ...incBuy,
      heading: cleanVerifyText(incBuy.heading || initialBlockBCMS.buyingAndTransferSection.heading),
      intro: cleanVerifyText(incBuy.intro || initialBlockBCMS.buyingAndTransferSection.intro),
      steps: (incBuy.steps || initialBlockBCMS.buyingAndTransferSection.steps || []).map((s: string) => cleanVerifyText(s)),
      documentsNeededHeading: cleanVerifyText(incBuy.documentsNeededHeading || initialBlockBCMS.buyingAndTransferSection.documentsNeededHeading),
      documentsNeeded: (incBuy.documentsNeeded || initialBlockBCMS.buyingAndTransferSection.documentsNeeded || []).map((d: string) => cleanVerifyText(d)),
      warningSignsHeading: cleanVerifyText(incBuy.warningSignsHeading || initialBlockBCMS.buyingAndTransferSection.warningSignsHeading),
      warningSigns: (incBuy.warningSigns || initialBlockBCMS.buyingAndTransferSection.warningSigns || []).map((w: string) => cleanVerifyText(w))
    },
    readingListingsGlossary: {
      ...initialBlockBCMS.readingListingsGlossary,
      ...incGloss,
      heading: cleanVerifyText(incGloss.heading || initialBlockBCMS.readingListingsGlossary.heading),
      subline: cleanVerifyText(incGloss.subline || initialBlockBCMS.readingListingsGlossary.subline),
      terms: (incGloss.terms || initialBlockBCMS.readingListingsGlossary.terms || []).map((t: any) => ({
        term: cleanVerifyText(t.term),
        definition: cleanVerifyText(t.definition)
      }))
    },
    faqsSection: {
      ...initialBlockBCMS.faqsSection,
      ...incFaq,
      heading: cleanVerifyText(incFaq.heading || initialBlockBCMS.faqsSection.heading),
      subline: cleanVerifyText(incFaq.subline || initialBlockBCMS.faqsSection.subline),
      faqs: (incFaq.faqs || initialBlockBCMS.faqsSection.faqs || []).map((f: any) => ({
        q: cleanVerifyText(f.q),
        a: cleanVerifyText(f.a)
      }))
    },
    closingSiteVisitSection: {
      ...initialBlockBCMS.closingSiteVisitSection,
      ...incClose,
      heading: cleanVerifyText(incClose.heading || initialBlockBCMS.closingSiteVisitSection.heading),
      intro: cleanVerifyText(incClose.intro || initialBlockBCMS.closingSiteVisitSection.intro),
      sellingHeading: cleanVerifyText(incClose.sellingHeading || initialBlockBCMS.closingSiteVisitSection.sellingHeading),
      sellingText: cleanVerifyText(incClose.sellingText || initialBlockBCMS.closingSiteVisitSection.sellingText),
      whatsappNumber: cleanVerifyText(incClose.whatsappNumber || initialBlockBCMS.closingSiteVisitSection.whatsappNumber),
      phoneNumber: cleanVerifyText(incClose.phoneNumber || initialBlockBCMS.closingSiteVisitSection.phoneNumber),
      officeAddress: cleanVerifyText(incClose.officeAddress || initialBlockBCMS.closingSiteVisitSection.officeAddress),
      formTitle: cleanVerifyText(incClose.formTitle || initialBlockBCMS.closingSiteVisitSection.formTitle),
      formSubtitle: cleanVerifyText(incClose.formSubtitle || initialBlockBCMS.closingSiteVisitSection.formSubtitle),
      formButtonText: cleanVerifyText(incClose.formButtonText || initialBlockBCMS.closingSiteVisitSection.formButtonText),
      reviewedByNote: cleanVerifyText(incClose.reviewedByNote || initialBlockBCMS.closingSiteVisitSection.reviewedByNote)
    }
  };
}

export async function fetchBlockBCMS(): Promise<BlockBCMSData> {
  const remote = await fetchSettingByKey<BlockBCMSData>('faisal_block_b_cms');
  if (remote) return mergeBlockBCMS(remote);

  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('faisal_block_b_cms');
      if (local) return mergeBlockBCMS(JSON.parse(local));
    } catch {}
  }
  return initialBlockBCMS;
}

export async function saveBlockBCMS(cmsData: BlockBCMSData, token?: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_block_b_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_block_b_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_block_b_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// =========================================================
// FAISAL HILLS BLOCK D DETAILED CMS SYSTEM
// =========================================================

export interface BlockDPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  sqFeet: string;
  category: 'Residential' | 'Commercial';
  priceRange: string;
  possession: string;
  highlight: string;
}

export interface BlockDAmenityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tag: string;
  features: string[];
}

export interface BlockDDevelopmentMilestone {
  title: string;
  progress: number;
  status: string;
  desc: string;
  image: string;
}

export interface BlockDTravelTimeItem {
  destination: string;
  distance: string;
  time: string;
  note: string;
}

export interface BlockDWhyInvestItem {
  iconName?: string;
  title: string;
  desc: string;
  tag: string;
  bg: string;
  text: string;
  border: string;
}

export interface BlockDCMSData {
  verificationHeader: {
    reviewerName: string;
    reviewerRole: string;
    pricesVerifiedDate: string;
    siteCheckedDate: string;
    badgeText: string;
  };
  overview: {
    h1: string;
    leadParagraph1: string;
    leadParagraph2: string;
    quickFacts: {
      location: string;
      residentialSizes: string;
      commercialCuts: string;
      possession: string;
      connectivity: string;
      legalStatus: string;
    };
    ctaStripText: string;
    ctaWhatsapp: string;
    ctaCall: string;
  };
  location: {
    heading: string;
    leadParagraph: string;
    driveTimesNote: string;
    travelTimes: BlockDTravelTimeItem[];
    googleMapIframeUrl: string;
  };
  masterPlan: {
    heading: string;
    subline: string;
    description: string;
    boulevardSpecsNote: string;
    mapImage: string;
    pdfDownloadUrl: string;
  };
  whyInvestSection: {
    heading: string;
    subline: string;
    reasons: BlockDWhyInvestItem[];
  };
  priceScheduleSection: {
    heading: string;
    subline: string;
    disclaimerNote: string;
    tableRows: BlockDPriceRow[];
  };
  amenitiesSection: {
    heading: string;
    subline: string;
    amenitiesList: BlockDAmenityItem[];
  };
  developmentMilestonesSection: {
    heading: string;
    subline: string;
    milestonesList: BlockDDevelopmentMilestone[];
  };
  faqsSection: {
    heading: string;
    subline: string;
    faqs: Array<{ q: string; a: string }>;
  };
  closingSiteVisitSection: {
    heading: string;
    intro: string;
    featureBullets: string[];
    whatsappNumber: string;
    phoneNumber: string;
    officeAddress: string;
    formTitle: string;
    formSubtitle: string;
    formButtonText: string;
    reviewedByNote: string;
  };
}

export const initialBlockDCMS: BlockDCMSData = {
  verificationHeader: {
    reviewerName: 'Senior Property Verification Desk',
    reviewerRole: 'Faisal Hills Estate Advisory',
    pricesVerifiedDate: 'September 2026',
    siteCheckedDate: 'September 2026',
    badgeText: 'Official Verified Block Guide'
  },
  overview: {
    h1: 'Faisal Hills Block D: Plot Prices, Map, Sector D Possession & Plots for Sale',
    leadParagraph1: 'Faisal Hills Block D represents the ultimate value sanctuary within the master development. Positioned along the tranquil western ridge, Block D offers serene Margalla mountain elevations, cooler natural breeze corridors, and direct 5-minute access to the M-1 Motorway Brahma Jhang Bahtar Interchange.',
    leadParagraph2: 'Block D delivers the most accessible residential entry rates across Faisal Hills, coupled with 85%+ groundwork completion, designated future Medical City reservations, and rapid capital appreciation. It provides 5, 8, 10, 14 Marla and 1 Kanal residential plots, along with commercial cuts approved for multi-storey development.',
    quickFacts: {
      location: 'Tranquil Western Flank, 5 Mins to M-1 Brahma Interchange',
      residentialSizes: '5, 8, 10, 14 Marla & 1 Kanal (Standard Cuts)',
      commercialCuts: '4 Marla (G+4 Commercial Strip Approvals)',
      possession: 'Development 85%+ (Possession Staged)',
      connectivity: 'Direct Access to M-1 Motorway, GT Road & Margalla Ave',
      legalStatus: '100% RDA Approved Master Plan (Zedem Transfer)'
    },
    ctaStripText: 'Inquiring about Block D on-ground possession sectors or verified resale files?',
    ctaWhatsapp: '+92 333 1113177',
    ctaCall: '+92 333 1113177'
  },
  location: {
    heading: 'Strategic Location & Fast M-1 Motorway Connectivity',
    leadParagraph: 'Block D is strategically situated on the western high ground of Faisal Hills. It sits directly accessible from the central 225ft Grand Boulevard and benefits from close proximity to the M-1 Motorway Brahma Jhang Bahtar Interchange, ensuring signal-free transit toward Islamabad Zero Point, New Islamabad International Airport, and CPEC northern routes.',
    driveTimesNote: 'Average verified driving times during normal traffic conditions:',
    travelTimes: [
      { destination: 'M-1 Brahma Jhang Bahtar Interchange', distance: '3.2 km', time: '5 Mins', note: 'Direct access to M-1 Motorway' },
      { destination: 'Grand GT Road (N-5 Highway)', distance: '3.8 km', time: '7 Mins', note: 'Via 225ft Grand Boulevard' },
      { destination: 'Block C & Hills Walk Promenade', distance: '1.2 km', time: '2 Mins', note: 'Direct internal avenue connection' },
      { destination: 'Block B Central Sports Complex', distance: '2.0 km', time: '4 Mins', note: 'Quick neighborhood access' },
      { destination: 'Taxila Museum & Cantt Commercials', distance: '6.5 km', time: '9 Mins', note: 'Short urban drive' },
      { destination: 'Islamabad Toll Plaza & Zero Point', distance: '26.0 km', time: '24 Mins', note: 'Signal-free drive via M-1' }
    ],
    googleMapIframeUrl: 'https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed'
  },
  masterPlan: {
    heading: 'Block D Master Plan, Sector Zoning & Blueprint',
    subline: 'Official Sector Zoning & Boulevard Grid',
    description: 'The Block D master plan is engineered for low-density residential tranquility. It features a central 60ft arterial spine, 50ft & 40ft internal residential streets, landscaped family botanical parks, a designated 2,500-capacity Grand Jamia Mosque, and commercial zones tailored for everyday convenience.',
    boulevardSpecsNote: 'Block D features 60ft sector avenues, 50ft tree-lined boulevards, 40ft paved residential streets, dedicated green reservations, underground utility conduits, and rainwater drainage culverts.',
    mapImage: '/images/faisal-hills-master-plan-map-opt.webp',
    pdfDownloadUrl: '/images/faisal-hills-master-plan-map-opt.webp'
  },
  whyInvestSection: {
    heading: 'Why Invest in Faisal Hills Block D?',
    subline: '6 compelling reasons making Sector D the top capital appreciation choice in Taxila-Islamabad region:',
    reasons: [
      {
        title: 'Brahma Bahtar M-1 Interchange',
        desc: 'Block D enjoys fast 5-minute access to the Brahma Jhang Bahtar Interchange on the M-1 Motorway, connecting seamlessly to Islamabad Zero Point and CPEC.',
        tag: 'Transport Link',
        bg: 'bg-rose-50',
        text: 'text-[#7b002c]',
        border: 'border-rose-100',
        iconName: ""
      },
      {
        title: 'Lowest Entry Price & High ROI',
        desc: 'Block D offers the most competitive entry rates in Faisal Hills, ensuring the highest percentage capital appreciation as final possession finishes.',
        tag: 'High Value ROI',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-100',
        iconName: ""
      },
      {
        title: 'Scenic Parkland & Clean Air',
        desc: 'Lush green parks, open tree-lined avenues, and cooler Margalla hillside elevation make Block D a pristine, pollution-free residential sanctuary.',
        tag: 'Eco-Living',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-100',
        iconName: ""
      },
      {
        title: 'Future Medical City Complex',
        desc: 'The designated Healthcare and Medical Complex zone in Sector D guarantees high long-term rental demand from medical professionals and executives.',
        tag: 'Healthcare Zone',
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-100',
        iconName: ""
      },
      {
        title: '100% RDA Approved & Clear NOC',
        desc: 'Full Rawalpindi Development Authority planning permission with zero litigation risk and transparent biometric deed transfers at the Zedem head office.',
        tag: 'Legal Security',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-100',
        iconName: ""
      },
      {
        title: 'Rapid Development Momentum',
        desc: 'With 85%+ groundwork complete and asphalt carpet roads underway, Block D is on a fast track toward full on-ground possession handover.',
        tag: 'Fast Pace',
        bg: 'bg-rose-50',
        text: 'text-[#7b002c]',
        border: 'border-rose-100',
        iconName: ""
      }
    ]
  },
  priceScheduleSection: {
    heading: 'Faisal Hills Block D Plot Prices & Current Market Rates',
    subline: 'Verified on-ground price schedule for residential cuts and commercial plots in Sector D (September 2026):',
    disclaimerNote: 'Rates vary based on location premiums (Corner, Boulevard, Park Facing +10% to +15%). Biometric transfer fees and society charges are verified at the Zedem head office.',
    tableRows: [
      {
        size: '5 Marla',
        dimensions: '25 × 50',
        sqYards: '139 Sq. Yds',
        sqFeet: '1,125 Sq. Ft',
        category: 'Residential',
        priceRange: 'PKR 40 Lacs – 48 Lacs',
        possession: 'Development 85%',
        highlight: 'Lowest entry price point in Faisal Hills with exceptional 3-year holding upside.'
      },
      {
        size: '8 Marla',
        dimensions: '30 × 60',
        sqYards: '200 Sq. Yds',
        sqFeet: '1,800 Sq. Ft',
        category: 'Residential',
        priceRange: 'PKR 62 Lacs – 75 Lacs',
        possession: 'Development 85%',
        highlight: 'Standard family-size cut situated along serene 50ft tree-lined sector avenues.'
      },
      {
        size: '10 Marla',
        dimensions: '35 × 70',
        sqYards: '272 Sq. Yds',
        sqFeet: '2,250 Sq. Ft',
        category: 'Residential',
        priceRange: 'PKR 90 Lacs – 1.10 Cr',
        possession: 'Development 85%',
        highlight: 'Scenic double-unit home cuts facing natural valley breezes and Margalla ridge.'
      },
      {
        size: '14 Marla',
        dimensions: '40 × 80',
        sqYards: '356 Sq. Yds',
        sqFeet: '3,150 Sq. Ft',
        category: 'Residential',
        priceRange: 'PKR 1.25 Cr – 1.45 Cr',
        possession: 'Development 85%',
        highlight: 'Executive estate cuts close to the proposed central healthcare & civic zone.'
      },
      {
        size: '1 Kanal',
        dimensions: '50 × 90',
        sqYards: '500 Sq. Yds',
        sqFeet: '4,500 Sq. Ft',
        category: 'Residential',
        priceRange: 'PKR 1.65 Cr – 2.10 Cr',
        possession: 'Development 85%',
        highlight: 'Flagship mansion plots facing scenic green belts, lush parkland, and wide boulevards.'
      },
      {
        size: '4 Marla Commercial',
        dimensions: '30 × 30',
        sqYards: '100 Sq. Yds',
        sqFeet: '900 Sq. Ft',
        category: 'Commercial',
        priceRange: 'PKR 1.80 Cr – 2.60 Cr',
        possession: 'Commercial Approved',
        highlight: 'High ROI retail promenade plots approved for Ground + 4 commercial arcades.'
      }
    ]
  },
  amenitiesSection: {
    heading: 'Block D Amenities & Community Infrastructure',
    subline: 'Planned neighborhood facilities, green parks, mosques, and lifestyle amenities:',
    amenitiesList: [
      {
        id: 'nature-parks',
        title: 'Lush Sector Parks & Scenic Margalla Trails',
        category: 'nature',
        description: 'Block D is surrounded by open green belts, botanical family parks, and walking tracks designed to offer fresh mountain air and serene living for residents.',
        image: '/images/faisal-hills-glow-park.webp',
        tag: 'Eco-Living Feature',
        features: ['Family Botanical Parks', 'Jogging & Walking Trails', 'Lush Green Belts', 'Eco-Conscious Zoning']
      },
      {
        id: 'community-center',
        title: 'Sector D Multi-Purpose Community Center',
        category: 'lifestyle',
        description: 'Dedicated modern social hub featuring banquet facilities, indoor recreation halls, senior citizen lounges, and executive meeting rooms for neighborhood residents.',
        image: '/images/faisal-hills-arc-monument-2.webp',
        tag: 'Community Anchor',
        features: ['Banquet & Event Halls', 'Indoor Games Arena', 'Senior Citizen Lounge', 'Resident Meeting Suites']
      },
      {
        id: 'jamia-mosque-d',
        title: 'Grand Sector D Jamia Mosque',
        category: 'infrastructure',
        description: 'Modern Islamic architectural landmark designed for 2,500 worshippers, complete with air-conditioned prayer halls, expansive marble courtyards, and Quranic academy.',
        image: '/images/faisal-hills-jamia-mosque.webp',
        tag: 'Delivered Landmark',
        features: ['Air-Conditioned Prayer Halls', 'Lush Marble Courtyards', 'Separate Ladies Section', 'Imam Residence']
      },
      {
        id: 'medical-complex',
        title: 'Proposed Medical City & Healthcare Complex',
        category: 'utilities',
        description: 'Zoned high-capacity healthcare district designed to house multi-specialty hospitals, 24/7 trauma emergency care, diagnostic laboratories, and pharmacy hubs.',
        image: '/images/faisal-hills-medical-complex.webp',
        tag: 'Healthcare Hub',
        features: ['24/7 Emergency Trauma Care', 'Specialist Clinics', 'Diagnostic Pathology Labs', 'Pharmacies & Medical Supplies']
      },
      {
        id: 'underground-utilities-d',
        title: '100% Underground Electrification & Wide Grid',
        category: 'utilities',
        description: 'Subterranean power distribution ensuring completely unobstructed skyline vistas, modern street lighting poles, and storm water conduits.',
        image: '/images/faisal-hills-executive-sector.webp',
        tag: 'Smart Infrastructure',
        features: ['Subterranean Power Cabling', 'High-Capacity Transformers', 'LED Street Lamps', 'Zero Overhead Wiring']
      },
      {
        id: 'gated-security-d',
        title: '24/7 Gated Security & Perimeter Surveillance',
        category: 'security',
        description: 'Guarded sector checkposts, smart boom barriers, high-resolution night-vision CCTV coverage, and dedicated mobile patrolling units.',
        image: '/images/faisal-hills-arc-gate.webp',
        tag: '24/7 Secure',
        features: ['HD CCTV Perimeter Coverage', 'Biometric Automated Checkpoints', 'Dedicated Mobile Patrol Squads', 'Gated Sector Barrier']
      }
    ]
  },
  developmentMilestonesSection: {
    heading: 'Block D On-Ground Development Milestones',
    subline: 'Verified construction progress tracking across Sector D infrastructure layers:',
    milestonesList: [
      {
        title: 'Roads & Sector Boulevards',
        progress: 90,
        status: 'Paved & Functional',
        desc: 'Main 50ft and 60ft avenues asphalted with drainage gutters, curbs, and street lamp foundations.',
        image: '/images/faisal-hills-drone-view.webp'
      },
      {
        title: 'Underground Electrification',
        progress: 85,
        status: 'Cables Laid in Trenches',
        desc: 'Subterranean conduit pipes and underground cable trenches completed across all sectors.',
        image: '/images/faisal-hills-aerial-panoramic.webp'
      },
      {
        title: 'Water Wells & Storage Tanks',
        progress: 95,
        status: 'Tube Wells Operational',
        desc: 'High-yield deep-well tube wells and overhead water reservoirs delivering clean mountain water.',
        image: '/images/faisal-hills-overview.webp'
      },
      {
        title: 'Sui Gas Pipeline Network',
        progress: 80,
        status: 'Mainlines Laid',
        desc: 'Underground gas pipelines installed along primary avenues awaiting final pressure testing.',
        image: '/images/faisal-hills-site-header.webp'
      },
      {
        title: 'Sewerage & Storm Drainage',
        progress: 90,
        status: 'RCC Pipes Laid',
        desc: 'Heavy RCC sewerage conduits connected to main society trunk lines for rain runoff safety.',
        image: '/images/faisal-hills-arc-monument.webp'
      },
      {
        title: 'Sector Parks & Green Reservations',
        progress: 85,
        status: 'Turf & Trees Planted',
        desc: 'Family walking trails, children play areas, and perimeter tree plantations active.',
        image: '/images/faisal-hills-glow-park.webp'
      }
    ]
  },
  faqsSection: {
    heading: 'Faisal Hills Block D Buying & Allotment FAQs',
    subline: 'Clear answers regarding Block D development status, RDA NOC approvals, plot transfer process, and investment upside:',
    faqs: [
      {
        q: 'Where exactly is Faisal Hills Block D located?',
        a: 'Block D is situated on the tranquil western flank of Faisal Hills, adjacent to Block C and within minutes of the M-1 Motorway Brahma Jhang Bahtar Interchange. It enjoys serene elevation with natural mountain springs and scenic Margalla ridge views.'
      },
      {
        q: 'Is Faisal Hills Block D approved by RDA?',
        a: 'Yes, Faisal Hills Block D is 100% legally approved by the Rawalpindi Development Authority (RDA) under the comprehensive society master plan NOC. All plots are free of legal dispute with transparent biometric transfers at the Zedem International head office.'
      },
      {
        q: 'What residential and commercial plot sizes are available in Block D?',
        a: 'Block D offers 5 Marla (25×50), 8 Marla (30×60), 10 Marla (35×70), 14 Marla (40×80), and 1 Kanal (50×90) residential cuts. Commercial plots of 4 Marla (30×30) with Ground + 4 storey construction approvals are also available.'
      },
      {
        q: 'What is the current development status of Block D?',
        a: 'Development in Block D is approximately 85% to 90% completed. Earthwork, levelling, 50ft & 60ft asphalt road carpeting, underground utility conduits, deep tube wells, and sewerage piping networks are operational.'
      },
      {
        q: 'What is the price range of 5 Marla and 10 Marla plots in Block D?',
        a: 'As of current market rates, a 5 Marla residential plot ranges from PKR 40 Lacs to 48 Lacs, while a 10 Marla plot ranges between PKR 90 Lacs and 1.10 Crore depending on location, category, and boulevard facing.'
      },
      {
        q: 'Why is Block D considered the best value investment in Faisal Hills?',
        a: 'Block D provides the most economical entry prices across the society combined with proximity to the upcoming M-1 Brahma Interchange link and future Medical City. It delivers high holding ROI for investors and peaceful suburban lifestyle for end-users.'
      },
      {
        q: 'Can overseas Pakistanis buy and transfer plots in Block D remotely?',
        a: 'Yes. Overseas Pakistanis can purchase plots using their NICOP/passport. File verification, installment ledger checks, and legal biometric allotment transfers can be facilitated seamlessly through our dedicated overseas advisory desk.'
      }
    ]
  },
  closingSiteVisitSection: {
    heading: 'Schedule a Site Visit or Request Block D File Verification',
    intro: 'Connect directly with our senior Faisal Hills advisory desk. Receive on-ground plot video walkthroughs, instant biometric allotment file checks, and updated resale inventory.',
    featureBullets: [
      'Zero service charge on official file verification',
      'Custom video tours available for overseas Pakistanis',
      'Dedicated Zedem International transfer facilitation'
    ],
    whatsappNumber: '+92 333 1113177',
    phoneNumber: '+92 333 1113177',
    officeAddress: 'Faisal Hills Main Boulevard Commercial Desk, Taxila GT Road',
    formTitle: 'Schedule a Site Visit or Request Block D File Verification',
    formSubtitle: 'Leave your details to receive verified Block D plot inventory, possession status, and transfer assistance.',
    formButtonText: 'SUBMIT OFFICIAL BLOCK D INQUIRY',
    reviewedByNote: 'About this page: reviewed by Senior Property Verification Desk of Faisal Hills Advisory. Price bands are drawn from published sources and active market listings. Prices change without notice.'
  }
};
export function mergeBlockDCMS(incoming: any): BlockDCMSData {
  if (!incoming || typeof incoming !== 'object') return initialBlockDCMS;

  const incVer = incoming.verificationHeader || {};
  const incOver = incoming.overview || {};
  const incLoc = incoming.location || {};
  const incMap = incoming.masterPlan || {};
  const incWhy = incoming.whyInvestSection || {};
  const incPrice = incoming.priceScheduleSection || {};
  const incAmen = incoming.amenitiesSection || {};
  const incDev = incoming.developmentMilestonesSection || {};
  const incFaqs = incoming.faqsSection || {};
  const incClose = incoming.closingSiteVisitSection || {};

  return {
    verificationHeader: {
      reviewerName: cleanVerifyText(incVer.reviewerName || initialBlockDCMS.verificationHeader.reviewerName),
      reviewerRole: cleanVerifyText(incVer.reviewerRole || initialBlockDCMS.verificationHeader.reviewerRole),
      pricesVerifiedDate: cleanVerifyText(incVer.pricesVerifiedDate || initialBlockDCMS.verificationHeader.pricesVerifiedDate),
      siteCheckedDate: cleanVerifyText(incVer.siteCheckedDate || initialBlockDCMS.verificationHeader.siteCheckedDate),
      badgeText: cleanVerifyText(incVer.badgeText || initialBlockDCMS.verificationHeader.badgeText)
    },
    overview: {
      h1: cleanVerifyText(incOver.h1 || initialBlockDCMS.overview.h1),
      leadParagraph1: cleanVerifyText(incOver.leadParagraph1 || initialBlockDCMS.overview.leadParagraph1),
      leadParagraph2: cleanVerifyText(incOver.leadParagraph2 || initialBlockDCMS.overview.leadParagraph2),
      quickFacts: {
        location: cleanVerifyText(incOver.quickFacts?.location || initialBlockDCMS.overview.quickFacts.location),
        residentialSizes: cleanVerifyText(incOver.quickFacts?.residentialSizes || initialBlockDCMS.overview.quickFacts.residentialSizes),
        commercialCuts: cleanVerifyText(incOver.quickFacts?.commercialCuts || initialBlockDCMS.overview.quickFacts.commercialCuts),
        possession: cleanVerifyText(incOver.quickFacts?.possession || initialBlockDCMS.overview.quickFacts.possession),
        connectivity: cleanVerifyText(incOver.quickFacts?.connectivity || initialBlockDCMS.overview.quickFacts.connectivity),
        legalStatus: cleanVerifyText(incOver.quickFacts?.legalStatus || initialBlockDCMS.overview.quickFacts.legalStatus)
      },
      ctaStripText: cleanVerifyText(incOver.ctaStripText || initialBlockDCMS.overview.ctaStripText),
      ctaWhatsapp: cleanVerifyText(incOver.ctaWhatsapp || initialBlockDCMS.overview.ctaWhatsapp),
      ctaCall: cleanVerifyText(incOver.ctaCall || initialBlockDCMS.overview.ctaCall)
    },
    location: {
      heading: cleanVerifyText(incLoc.heading || initialBlockDCMS.location.heading),
      leadParagraph: cleanVerifyText(incLoc.leadParagraph || initialBlockDCMS.location.leadParagraph),
      driveTimesNote: cleanVerifyText(incLoc.driveTimesNote || initialBlockDCMS.location.driveTimesNote),
      travelTimes: (incLoc.travelTimes || initialBlockDCMS.location.travelTimes || []).map((t: any) => ({
        destination: cleanVerifyText(t.destination || ''),
        distance: cleanVerifyText(t.distance || ''),
        time: cleanVerifyText(t.time || ''),
        note: cleanVerifyText(t.note || '')
      })),
      googleMapIframeUrl: incLoc.googleMapIframeUrl || initialBlockDCMS.location.googleMapIframeUrl
    },
    masterPlan: {
      heading: cleanVerifyText(incMap.heading || initialBlockDCMS.masterPlan.heading),
      subline: cleanVerifyText(incMap.subline || initialBlockDCMS.masterPlan.subline),
      description: cleanVerifyText(incMap.description || initialBlockDCMS.masterPlan.description),
      boulevardSpecsNote: cleanVerifyText(incMap.boulevardSpecsNote || initialBlockDCMS.masterPlan.boulevardSpecsNote),
      mapImage: incMap.mapImage || initialBlockDCMS.masterPlan.mapImage,
      pdfDownloadUrl: incMap.pdfDownloadUrl || initialBlockDCMS.masterPlan.pdfDownloadUrl
    },
    whyInvestSection: {
      heading: cleanVerifyText(incWhy.heading || initialBlockDCMS.whyInvestSection.heading),
      subline: cleanVerifyText(incWhy.subline || initialBlockDCMS.whyInvestSection.subline),
      reasons: (incWhy.reasons || initialBlockDCMS.whyInvestSection.reasons || []).map((r: any) => ({
        iconName: r.iconName || '',
        title: cleanVerifyText(r.title || ''),
        desc: cleanVerifyText(r.desc || ''),
        tag: cleanVerifyText(r.tag || 'Feature'),
        bg: r.bg || 'bg-rose-50',
        text: r.text || 'text-[#7b002c]',
        border: r.border || 'border-rose-100'
      }))
    },
    priceScheduleSection: {
      heading: cleanVerifyText(incPrice.heading || initialBlockDCMS.priceScheduleSection.heading),
      subline: cleanVerifyText(incPrice.subline || initialBlockDCMS.priceScheduleSection.subline),
      disclaimerNote: cleanVerifyText(incPrice.disclaimerNote || initialBlockDCMS.priceScheduleSection.disclaimerNote),
      tableRows: (incPrice.tableRows || initialBlockDCMS.priceScheduleSection.tableRows || []).map((r: any) => ({
        size: cleanVerifyText(r.size || ''),
        dimensions: cleanVerifyText(r.dimensions || ''),
        sqYards: cleanVerifyText(r.sqYards || ''),
        sqFeet: cleanVerifyText(r.sqFeet || ''),
        category: r.category || 'Residential',
        priceRange: cleanVerifyText(r.priceRange || ''),
        possession: cleanVerifyText(r.possession || ''),
        highlight: cleanVerifyText(r.highlight || '')
      }))
    },
    amenitiesSection: {
      heading: cleanVerifyText(incAmen.heading || initialBlockDCMS.amenitiesSection.heading),
      subline: cleanVerifyText(incAmen.subline || initialBlockDCMS.amenitiesSection.subline),
      amenitiesList: (incAmen.amenitiesList || initialBlockDCMS.amenitiesSection.amenitiesList || []).map((a: any) => ({
        id: a.id || 'amenity',
        title: cleanVerifyText(a.title || ''),
        category: a.category || 'lifestyle',
        description: cleanVerifyText(a.description || ''),
        image: a.image || '/images/faisal-hills-glow-park.webp',
        tag: cleanVerifyText(a.tag || 'Amenity'),
        features: Array.isArray(a.features) ? a.features.map((f: string) => cleanVerifyText(f)) : []
      }))
    },
    developmentMilestonesSection: {
      heading: cleanVerifyText(incDev.heading || initialBlockDCMS.developmentMilestonesSection.heading),
      subline: cleanVerifyText(incDev.subline || initialBlockDCMS.developmentMilestonesSection.subline),
      milestonesList: (incDev.milestonesList || initialBlockDCMS.developmentMilestonesSection.milestonesList || []).map((m: any) => ({
        title: cleanVerifyText(m.title || ''),
        progress: typeof m.progress === 'number' ? m.progress : 85,
        status: cleanVerifyText(m.status || 'In Progress'),
        desc: cleanVerifyText(m.desc || ''),
        image: m.image || '/images/faisal-hills-drone-view.webp'
      }))
    },
    faqsSection: {
      heading: cleanVerifyText(incFaqs.heading || initialBlockDCMS.faqsSection.heading),
      subline: cleanVerifyText(incFaqs.subline || initialBlockDCMS.faqsSection.subline),
      faqs: (incFaqs.faqs || initialBlockDCMS.faqsSection.faqs || []).map((f: any) => ({
        q: cleanVerifyText(f.q || f.question || ''),
        a: cleanVerifyText(f.a || f.answer || '')
      }))
    },
    closingSiteVisitSection: {
      heading: cleanVerifyText(incClose.heading || initialBlockDCMS.closingSiteVisitSection.heading),
      intro: cleanVerifyText(incClose.intro || initialBlockDCMS.closingSiteVisitSection.intro),
      featureBullets: Array.isArray(incClose.featureBullets)
        ? incClose.featureBullets.map((b: string) => cleanVerifyText(b))
        : initialBlockDCMS.closingSiteVisitSection.featureBullets,
      whatsappNumber: cleanVerifyText(incClose.whatsappNumber || initialBlockDCMS.closingSiteVisitSection.whatsappNumber),
      phoneNumber: cleanVerifyText(incClose.phoneNumber || initialBlockDCMS.closingSiteVisitSection.phoneNumber),
      officeAddress: cleanVerifyText(incClose.officeAddress || initialBlockDCMS.closingSiteVisitSection.officeAddress),
      formTitle: cleanVerifyText(incClose.formTitle || initialBlockDCMS.closingSiteVisitSection.formTitle),
      formSubtitle: cleanVerifyText(incClose.formSubtitle || initialBlockDCMS.closingSiteVisitSection.formSubtitle),
      formButtonText: cleanVerifyText(incClose.formButtonText || initialBlockDCMS.closingSiteVisitSection.formButtonText),
      reviewedByNote: cleanVerifyText(incClose.reviewedByNote || initialBlockDCMS.closingSiteVisitSection.reviewedByNote)
    }
  };
}
export async function fetchBlockDCMS(): Promise<BlockDCMSData> {
  const remote = await fetchSettingByKey<BlockDCMSData>('faisal_block_d_cms');
  if (remote) return mergeBlockDCMS(remote);

  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('faisal_block_d_cms');
      if (local) return mergeBlockDCMS(JSON.parse(local));
    } catch {}
  }
  return initialBlockDCMS;
}
export async function saveBlockDCMS(cmsData: BlockDCMSData, token?: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_block_d_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_block_d_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }
  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_block_d_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}
