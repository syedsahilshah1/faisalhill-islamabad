import { ReactNode } from "react";
import { coalescedFetch, invalidateApiCache, invalidateApiResource, invalidateForWrite } from "@/lib/apiCache";
import type { PermissionDescriptor, UserPermissionKey } from "@/lib/permissions";

export { invalidateApiCache, invalidateApiResource };

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
  masterPlanImageAlt?: string;
  heroImage: string;
  heroImageAlt?: string;
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
  /** Captured from the enquiry form; optional because phone-only leads exist. */
  email?: string;
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

/**
 * Single network primitive for the whole data layer.
 *
 * GET and HEAD requests are routed through the coalescing cache in
 * `lib/apiCache`, which means every call site in this file — server components,
 * client components and `generateMetadata` alike — gets request collapsing for
 * free. Writes bypass it entirely.
 */
export async function safeFetch(url: string, init?: RequestInit, timeoutMs = 2500): Promise<Response | null> {
  const method = (init?.method ?? 'GET').toUpperCase();

  if (method !== 'GET' && method !== 'HEAD') {
    const res = await rawFetch(url, init, timeoutMs);

    // A successful mutation invalidates that resource family's cached reads, so
    // the next read reflects the change instead of waiting out the TTL. Handling
    // it here covers all ~30 write helpers without touching each one.
    if (res && res.ok) {
      invalidateForWrite(url);
    }

    return res;
  }

  return coalescedFetch(url, () => rawFetch(url, init, timeoutMs), undefined, init);
}

async function rawFetch(url: string, init?: RequestInit, timeoutMs = 2500): Promise<Response | null> {
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

/**
 * Module-level value cache with an explicit TTL.
 *
 * `null` means "not cached yet", which is what lets an intentionally empty API
 * response (an inventory with no plots, a site with no blogs) be served from
 * cache instead of re-requested on every single render.
 */
class ValueCache<T> {
  private value: T | null = null;
  private expiresAt = 0;

  constructor(private readonly ttlMs: number) {}

  get fresh(): boolean {
    return this.value !== null && this.expiresAt > Date.now();
  }

  read(): T | null {
    return this.fresh ? this.value : null;
  }

  write(value: T): T {
    this.value = value;
    this.expiresAt = Date.now() + this.ttlMs;
    return value;
  }

  clear(): void {
    this.value = null;
    this.expiresAt = 0;
  }
}

const _blocksCache = new ValueCache<BlockInfo[]>(120_000);
const _blocksBySlugCache = new ValueCache<Record<string, BlockInfo | null>>(120_000);
const _plotsCache = new ValueCache<PlotItem[]>(30_000);
const _galleryCache = new ValueCache<GalleryItem[]>(120_000);

/**
 * Apply an optimistic mutation to the cached plot list and drop the cached
 * `/plots` responses.
 *
 * The admin helpers below write through the raw `fetch` API rather than
 * `safeFetch`, so they invalidate explicitly. Keeping the local list in sync
 * means the dashboard table updates without a refetch, while the response cache
 * is still discarded so the next public read comes from the server.
 */
function applyPlotCacheUpdate(transform: (plots: PlotItem[]) => PlotItem[]): void {
  const current = _plotsCache.read();

  if (current) {
    _plotsCache.write(transform(current));
  }

  invalidateApiResource('/plots');
}

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
  if (forceRefresh) {
    _blocksCache.clear();
    invalidateApiResource('/blocks');
  }

  const cached = _blocksCache.read();
  if (cached) {
    return applyLocalBlockOverrides(cached);
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/blocks`, { next: { revalidate: 300 } });
    if (!res || !res.ok) {
      return applyLocalBlockOverrides(blocksData);
    }
    const data = await res.json();
    return applyLocalBlockOverrides(_blocksCache.write(data.map(mapBlockToCamel)));
  } catch (e) {
    return applyLocalBlockOverrides(blocksData); // fallback
  }
}

export async function fetchBlock(slug: string): Promise<BlockInfo | null> {
  if (typeof window !== 'undefined') {
    const cachedAll = _blocksBySlugCache.read();

    if (cachedAll && slug in cachedAll) {
      return cachedAll[slug];
    }
  }

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

  if (typeof window !== 'undefined') {
    const cachedAll = _blocksBySlugCache.read() ?? {};
    cachedAll[slug] = baseBlock;
    _blocksBySlugCache.write(cachedAll);
  }

  return baseBlock;
}

export async function fetchPlots(forceRefresh = false): Promise<PlotItem[]> {
  if (forceRefresh) {
    _plotsCache.clear();
    invalidateApiResource('/plots');
  }

  const cached = _plotsCache.read();
  if (cached) {
    return cached;
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/plots`, { next: { revalidate: 120 } });
    if (!res || !res.ok) return plotInventoryData;
    const data = await res.json();
    return _plotsCache.write(
      Array.isArray(data) ? data.map(mapPlotToCamel) : (data?.data ? data.data.map(mapPlotToCamel) : [])
    );
  } catch (e) {
    return plotInventoryData;
  }
}

export async function fetchGallery(forceRefresh = false): Promise<GalleryItem[]> {
  if (forceRefresh) {
    _galleryCache.clear();
    invalidateApiResource('/gallery');
  }

  const cached = _galleryCache.read();
  if (cached) {
    return cached;
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/gallery`, { next: { revalidate: 300 } });
    if (!res || !res.ok) return initialGalleryData;
    const data = await res.json();
    return _galleryCache.write(data.map(mapGalleryToCamel));
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

export async function submitLead(lead: { name: string; phone: string; email?: string; interest?: string; message?: string }): Promise<any> {
  const localLead: LeadItem = {
    id: `lead-${Date.now()}`,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    interest: lead.interest || 'General Inquiry',
    message: lead.message,
    submittedAt: formatLeadDateTime()
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
      const isDuplicate = existing.some((item: any) =>
        item.name === localLead.name && item.phone === localLead.phone && (item.message === localLead.message || item.interest === localLead.interest)
      );      if (!isDuplicate) {
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

  if (!res.ok) {
    // Surface *why* the server refused instead of a bare "failed".
    //
    // The lead endpoint fails for very different reasons — a 422 for a malformed
    // address, a 429 once the rate limiter trips, a 500 when the database schema
    // is behind the code — and a single generic message sends the visitor to
    // retry something that will never succeed while telling the developer
    // nothing. Laravel's `message` and its field-keyed `errors` map are written
    // for end users, so they are safe to pass through; anything unrecognised
    // falls back to the status code.
    const body = await res.json().catch(() => null);
    const fieldErrors = body?.errors
      ? Object.values(body.errors).flat().filter((e): e is string => typeof e === 'string')
      : [];

    throw new Error(
      fieldErrors[0] ||
      (typeof body?.message === 'string' && body.message) ||
      `Submission failed (HTTP ${res.status}).`
    );
  }

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

/**
 * The grantable capability catalogue, straight from the server.
 *
 * The picker renders from this rather than a hardcoded list so a permission the
 * API would reject can never be offered in the first place.
 */
export async function apiFetchPermissionCatalogue(token: string): Promise<PermissionDescriptor[]> {
  const res = await fetch(`${getApiUrl()}/admin/permissions`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to load the permission catalogue.');
  }
  const data = await res.json();
  return Array.isArray(data.permissions) ? data.permissions : [];
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
  applyPlotCacheUpdate(current => current.map(p => (p.id === id ? updated : p)));
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
  applyPlotCacheUpdate(current => [created, ...current]);
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
  applyPlotCacheUpdate(current => current.filter(p => p.id !== id));
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
  /**
   * External link behind every "Directions" / "Open in Google Maps" control.
   *
   * These used to be `https://maps.google.com/?q=Faisal+Hills+Taxila` literals
   * in four components, so pointing the site at a new map meant editing code.
   */
  mapDirectionsUrl?: string;
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
  email: 'info@faisalhillsislamabadfh.com',
  mapDirectionsUrl: 'https://maps.google.com/?q=Faisal+Hills+Taxila'
};

// -------------------------------------------------------------
// Settings API Helpers
// -------------------------------------------------------------

/**
 * Read a single site setting.
 *
 * `forceFresh` is opt-in and is meant for admin screens that must reflect an
 * unsaved change. The previous default was `forceFresh = true`, which appended
 * a cache-busting timestamp and sent `cache: 'no-store'` on every call — the
 * root layout alone turned that into two guaranteed uncached backend requests on
 * every page load. The default is now a normal cached read.
 */
export async function fetchSettingByKey<T>(key: string, forceFresh = false): Promise<T | null> {
  try {
    const url = forceFresh
      ? `${getApiUrl()}/settings/${key}?_t=${Date.now()}`
      : `${getApiUrl()}/settings/${key}`;

    const res = await safeFetch(url, forceFresh
      ? {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      : { next: { revalidate: 300 } });

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

/**
 * Resolve the external map link used by "Directions" buttons.
 *
 * The value is dashboard-editable, so it is treated as untrusted: only `http`
 * and `https` are accepted. A `javascript:` or `data:` URL stored by a
 * compromised or careless editor would otherwise become a stored-XSS vector the
 * moment an admin clicked through their own site. An unparseable or blank value
 * falls back to the last-known-good default rather than rendering a dead link.
 */
export function formatMapDirectionsUrl(rawUrl?: string): string {
  const fallback: string = defaultContactInfo.mapDirectionsUrl || 'https://maps.google.com/?q=Faisal+Hills+Taxila';
  if (!rawUrl || !rawUrl.trim()) return fallback;

  try {
    const parsed = new URL(rawUrl.trim());
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return fallback;
    return parsed.toString();
  } catch {
    return fallback;
  }
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
// The permission vocabulary used to be duplicated here as a hand-written
// 7-entry list. It had drifted from the server: it still offered
// `manage_homepage_cms`, which the server no longer accepts, and omitted the 15
// other capabilities, so the picker could neither grant nor display them. The
// canonical list lives in `lib/permissions.ts`, which mirrors
// `App\Support\PermissionRegistry`.

export type { UserPermissionKey, PermissionDescriptor } from '@/lib/permissions';

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
  let localData: BlocksPageCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('faisal_blocks_cms');
      if (local) localData = mergeBlocksCMS(JSON.parse(local));
    } catch {}
  }

  const remote = await fetchSettingByKey<BlocksPageCMSData>('faisal_blocks_cms');
  if (remote) {
    const merged = localData ? mergeBlocksCMS({ ...remote, ...localData }) : mergeBlocksCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_blocks_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialBlocksPageCMS;
}

export async function saveBlocksPageCMS(cmsData: BlocksPageCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

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
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
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
    executiveBlockLinkHref: string;
    heading: string;
    visibleParagraph: string;
    expandedParagraph1: string;
    expandedParagraph2: string;
    blockALinkText: string;
    blockALinkHref: string;
    executiveBlockLinkText: string;
    locationLinkText?: string;
    locationLinkHref?: string;
    image?: string;
    imageAlt?: string;
    imageTag?: string;
    imageTitle?: string;
    imageSubtitle?: string;
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
    /**
     * Embedded map shown in the Prime Block location section.
     *
     * Added because the section previously rendered a hardcoded iframe URL that
     * no dashboard screen could change.
     */
    googleMapIframeUrl: string;
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
    locationLinkHref: '/faisal-hills-location',
    image: '/images/faisal-hills-drone-view.webp',
    imageAlt: 'Faisal Hills Prime Block On-Ground Development and Margalla Hills view',
    imageTag: 'Fast-Track Development',
    imageTitle: 'Prime Block On-Ground Execution',
    imageSubtitle: 'Carpeted boulevards, dedicated green spaces, and high-elevation residential sectors.'
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
    locationPageLinkHref: '/faisal-hills-location',
    googleMapIframeUrl: 'https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed'
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
      driveTimesNote: cleanVerifyText(incLoc.driveTimesNote || initialPrimeBlockCMS.location.driveTimesNote),
      locationPageLinkText: cleanVerifyText(incLoc.locationPageLinkText || initialPrimeBlockCMS.location.locationPageLinkText),
      locationPageLinkHref: cleanVerifyText(incLoc.locationPageLinkHref || initialPrimeBlockCMS.location.locationPageLinkHref),
      googleMapIframeUrl: cleanVerifyText(incLoc.googleMapIframeUrl || initialPrimeBlockCMS.location.googleMapIframeUrl)
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
  let localData: PrimeBlockCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const localStr = localStorage.getItem('faisal_prime_block_cms');
      if (localStr) localData = mergePrimeBlockCMS(JSON.parse(localStr));
    } catch {}
  }

  const remote = await fetchSettingByKey<PrimeBlockCMSData>('faisal_prime_block_cms');
  if (remote) {
    const merged = localData ? mergePrimeBlockCMS({ ...remote, ...localData }) : mergePrimeBlockCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_prime_block_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialPrimeBlockCMS;
}

export async function savePrimeBlockCMS(cmsData: PrimeBlockCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

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
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// =========================================================
// FAISAL HILLS BLOCK A DETAILED CMS SYSTEM
// =========================================================

export interface BlockACMSData {
  verificationHeader: {
    reviewerName: string;
    reviewerRole: string;
    pricesVerifiedDate: string;
    siteCheckedDate: string;
    badgeText: string;
    possessionConfirmedText: string;
  };
  overview: {
    h1: string;
    leadParagraph1: string;
    leadParagraph2: string;
    quickFacts: {
      position: string;
      residentialSizes: string;
      commercialSizes: string;
      howYouBuy: string;
      possession: string;
      legalStatus: string;
    };
    ctaStripText: string;
    ctaWhatsapp: string;
    ctaCall: string;
    image: string;
    imageAlt: string;
    imageTag: string;
    imageTitle: string;
    imageSubtitle: string;
  };
  location: {
    heading: string;
    leadParagraph1: string;
    leadParagraph2: string;
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
    roadWidthsNote: string;
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
    nonStandardHeading: string;
    nonStandardText: string;
    buyerTip: string;
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
  };
  ratePerSqFtSection: {
    heading: string;
    subline: string;
    tableRows: Array<{
      plotSize: string;
      ratePerSqFt: string;
      valueNote: string;
    }>;
    landValueTakeaway: string;
  };
  filesVsPossessionSection: {
    heading: string;
    text: string;
  };
  twoKanalSection: {
    badge: string;
    heading: string;
    description: string;
  };
  commercialSection: {
    badge: string;
    heading: string;
    description: string;
    commercialHubNote: string;
  };
  apartmentsSection: {
    badge: string;
    heading: string;
    intro: string;
    znTowerDesc: string;
    sereneHillsDesc: string;
    pricingNote: string;
    cautionNote: string;
  };
  whoItSuitsSection: {
    heading: string;
    leadParagraph: string;
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
  buyingAndTransferSection: {
    heading: string;
    intro: string;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
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
  comparisonExecutiveSection: {
    heading: string;
    subline: string;
    tableRows: Array<{
      aspect: string;
      blockA: string;
      executiveBlock: string;
    }>;
    hubLinkNote: string;
    hubLinkText: string;
    hubLinkHref: string;
  };
  developmentAndFacilitiesSection: {
    heading: string;
    subline: string;
    statusTableRows: Array<{
      item: string;
      status: string;
    }>;
    statusNote: string;
    arcMonumentNote: string;
  };
  possessionAndBuildingSection: {
    heading: string;
    text: string;
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

export const initialBlockACMS: BlockACMSData = {
  verificationHeader: {
    reviewerName: 'Property Verification Team',
    reviewerRole: 'Senior Property Consultant',
    pricesVerifiedDate: 'September 2026',
    siteCheckedDate: 'September 2026',
    badgeText: 'Official Verified Block Guide',
    possessionConfirmedText: '100% On-Ground Possession'
  },
  overview: {
    h1: 'Faisal Hills Block A: Plot Prices, Possession and Plots for Sale',
    leadParagraph1: 'Block A is the largest established residential block in [Faisal Hills](/), between Block B and the Executive Block, reached from the GT Road (N-5) entrance along the main boulevard. Roads are carpeted, utilities are in and families already live here, so buyers can build rather than wait.',
    leadParagraph2: 'It is also the society\'s most actively traded block. Developer inventory is reported to be exhausted, so almost every purchase here is a resale transfer rather than a fresh booking.',
    quickFacts: {
      position: 'Between Block B and the Executive Block',
      residentialSizes: '5, 8, 10 and 14 Marla, 1 Kanal and 2 Kanal',
      commercialSizes: '9.6 Marla up to 2 Kanal',
      howYouBuy: 'Resale transfer, settled in full',
      possession: 'Granted',
      legalStatus: 'Within the RDA-approved Faisal Hills scheme'
    },
    ctaStripText: 'Ask for verified available plots and today\'s rate:',
    ctaWhatsapp: '+92 333 1113177',
    ctaCall: '+92 333 1113177',
    image: '/images/faisal-hills-jamia-mosque.webp',
    imageAlt: 'Completed houses on a carpeted street in Faisal Hills Block A',
    imageTag: 'Grand Jamia Mosque • Block A',
    imageTitle: 'Established Living with 500+ Resident Families',
    imageSubtitle: 'Carpeted streets, underground utilities, operational schools, and full ready possession.'
  },
  location: {
    heading: 'Where Block A Is',
    leadParagraph1: 'Block A sits between Block B and the Executive Block, off the society\'s main boulevard. Because it borders the Executive Block, the school, mosque and commercial area near the entrance are a short drive away.',
    leadParagraph2: 'Faisal Hills is marketed as an Islamabad address. The society itself lies in Rawalpindi District near Taxila, under the Rawalpindi Development Authority.',
    routesTitle: 'Routes from Block A',
    routesList: [
      'Islamabad via Margalla Avenue',
      'Islamabad via Srinagar Highway',
      'Sector B-17 (Multi Gardens)',
      'Taxila Cantt',
      'The M-1 Motorway',
      'New Islamabad International Airport'
    ],
    driveTimesNote: 'Published drive times for this block range from 5 minutes to 45 minutes to the airport depending on which website you read, which tells you how little they can be relied on. We publish a time only where our own team has driven the route, with the distance and the time of day. Directions are on our [Faisal Hills location](/faisal-hills-location).',
    nearbyList: [
      'HITEC University Taxila',
      'UET Taxila',
      'Taxila Museum and the Gandhara sites',
      'Wah Cantt',
      'Tarnol',
      'Faisal Margalla City',
      'Margalla Avenue'
    ],
    googleMapIframeUrl: 'https://maps.google.com/maps?q=Faisal+Hills+Block+A+GT+Road+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed'
  },
  mapAndMasterPlan: {
    heading: 'Block A Map and Master Plan',
    subline: 'Official Sector Blueprint & Street Network',
    description: 'The block is laid out around the main boulevard, with residential streets behind it and commercial plots on the wider roads. Use the map to check a plot\'s position, facing and street width before you commit.',
    roadWidthsNote: 'Reported road widths differ between sources: one describes 120-foot main roads with 40, 50 and 60-foot residential streets, another gives a minimum of 40 feet rising to 110 feet, alongside the 225-foot main boulevard. The society-wide plan is on our [Faisal Hills master plan](/faisal-hills-master-plan).',
    mapImage: '/images/faisal-hills-master-plan-map.webp',
    pdfDownloadUrl: '/images/faisal-hills-master-plan-map.webp'
  },
  plotSizesSection: {
    heading: 'Plot Sizes in Block A',
    subline: 'Official dimensions, area in square feet and yards, and standard sold classifications:',
    tableRows: [
      { dimensions: '25 × 50', areaSqFt: '1,250', areaSqYds: '139', soldAs: '5 Marla' },
      { dimensions: '30 × 60', areaSqFt: '1,800', areaSqYds: '200', soldAs: '8 Marla' },
      { dimensions: '35 × 70', areaSqFt: '2,450', areaSqYds: '272', soldAs: '10 Marla' },
      { dimensions: '40 × 80', areaSqFt: '3,200', areaSqYds: '356', soldAs: '14 Marla' },
      { dimensions: '50 × 90', areaSqFt: '4,500', areaSqYds: '500', soldAs: '1 Kanal' },
      { dimensions: '75 × 120', areaSqFt: '9,000', areaSqYds: '1,000', soldAs: '2 Kanal' }
    ],
    nonStandardHeading: 'Sizes you will see in listings that are not on this list',
    nonStandardText: 'Block A listings regularly include a 6 Marla plot at 30 × 50 ft, along with 5.5 Marla, 10.9 Marla and 1.2 Kanal descriptions. Some are genuinely non-standard plots; others are standard plots measured with a different Marla size, since Faisal Hills schedules use a 225 sq ft Marla while many listings use 250.',
    buyerTip: 'Compare offers by dimensions and square feet, not by the Marla figure in the headline. A plot advertised as 10 Marla may be 2,250 or 2,450 square feet.'
  },
  pricingAndRates: {
    heading: 'Block A Plot Prices',
    leadParagraph: 'Two sets of figures circulate and they measure different things. The published range is the band quoted across the market; asking prices are what sellers are advertising now.',
    tableRows: [
      { plotSize: '5 Marla', publishedBand: 'PKR 55 to 70 lakh', recentAskingPrices: 'PKR 55 to 95 lakh, most between 72 and 85' },
      { plotSize: '8 Marla', publishedBand: 'PKR 75 lakh to 1.25 crore', recentAskingPrices: 'Around PKR 1.22 crore (Margalla-facing)' },
      { plotSize: '10 Marla', publishedBand: 'PKR 95 lakh to 1.4 crore', recentAskingPrices: 'PKR 1.35 to 1.65 crore' },
      { plotSize: '14 Marla', publishedBand: 'PKR 1.2 to 1.7 crore', recentAskingPrices: 'Not observed in the current sample' },
      { plotSize: '1 Kanal', publishedBand: 'PKR 1.45 to 2.25 crore', recentAskingPrices: 'Not observed in the current sample' },
      { plotSize: '2 Kanal', publishedBand: 'PKR 2.7 to 3.5 crore', recentAskingPrices: 'PKR 3.1 to 3.2 crore' }
    ],
    sampleAttribution: 'Asking prices observed in September 2026 across roughly 370 residential listings on a major property portal. Corner, main double road, park-facing and Margalla-facing plots sell above standard plots in the same street. Full block-by-block figures: [Faisal Hills plot prices](/faisal-hills-plot-prices).',
    lowPriceWarning: 'Treat very low quotes with caution. One widely read price guide puts Block A 5 Marla plots at PKR 30 to 45 lakh, roughly half what the market is currently asking.'
  },
  ratePerSqFtSection: {
    heading: 'Larger plots cost less per square foot',
    subline: 'Converting those asking prices to a rate per square foot shows a consistent pattern:',
    tableRows: [
      { plotSize: '5 Marla', ratePerSqFt: 'PKR 4,400 to 7,600', valueNote: 'Deepest entry demand and liquidity' },
      { plotSize: '8 to 10 Marla', ratePerSqFt: 'PKR 5,500 to 6,800', valueNote: 'Standard executive living' },
      { plotSize: '1.2 Kanal', ratePerSqFt: 'Around PKR 5,200', valueNote: 'Custom home size' },
      { plotSize: '2 Kanal', ratePerSqFt: 'Around PKR 3,500', valueNote: 'Best value per sq ft in the block (~50% lower rate)' }
    ],
    landValueTakeaway: 'A 2 Kanal plot works out at roughly half the rate per square foot of a typical 5 Marla plot. If your budget reaches a larger plot, you buy considerably more land per rupee. Smaller plots carry the premium because demand for them is deeper and they resell faster. These rates are our own calculation from listed asking prices and plot dimensions in September 2026, not developer figures.'
  },
  filesVsPossessionSection: {
    heading: 'Files and possession plots',
    text: 'A file is a booking whose instalments may still be running. A possession plot has been handed over and can be built on. Possession plots trade at a premium over files in the same block and street. Block A listings usually state "possession", "NDC open" or "all dues clear", and those words move the price.'
  },
  twoKanalSection: {
    badge: 'Signature Estates',
    heading: '2 Kanal Plots in Block A',
    description: 'Block A is one of only two blocks in the society offering 2 Kanal plots. At 75 × 120 ft they suit buyers building a large custom home rather than investors seeking a quick resale, and as the rate table shows, they are the best value per square foot in the block.'
  },
  commercialSection: {
    badge: 'Commercial Boulevard',
    heading: 'Commercial Plots in Block A',
    description: 'Commercial plots run from 9.6 Marla up to 2 Kanal. A boulevard-facing commercial plot of around 2.1 Kanal was recently listed at PKR 26 crore, close to PKR 27,500 per square foot, roughly four to five times the residential rate.',
    commercialHubNote: 'Sources disagree on whether the society\'s main commercial hub sits in Block A or in the [Executive Block](/blocks/executive-block). Before buying commercial land here, confirm which commercial area you are buying into and what is planned around it.'
  },
  apartmentsSection: {
    badge: 'Finished Units',
    heading: 'Apartments in Block A',
    intro: 'Two mixed-use buildings sit inside the block, which suits buyers who want a finished unit rather than land:',
    znTowerDesc: 'ZN Tower 1, in Block A Markaz, with one, two and three-bedroom apartments above ground-floor shops and offices. Reported construction progress ranges from 70% to 90% across sources, and the builder is described variously as ZN Builders and Gondal Group of Marketing.',
    sereneHillsDesc: 'Serene Hills, a mixed-use project by Makaan Solutions with apartments and shops.',
    pricingNote: 'Apartment pricing has been quoted from around PKR 13,000 per square foot, against roughly PKR 3,500 to 7,600 for residential land in the same block. You are paying for the built structure, so compare on total cost and rental potential rather than the headline rate.',
    cautionNote: 'One caution: some marketing for these towers describes Faisal Hills as a CDA-zone society and claims a five-minute drive to the airport. Neither is correct. The society is RDA-approved in Rawalpindi District, and airport drive times quoted elsewhere run to 40 minutes or more.'
  },
  whoItSuitsSection: {
    heading: 'Who Block A Suits, and What to Weigh',
    leadParagraph: 'It tends to suit families who want to build immediately in a finished block, buyers who want a larger plot at the society\'s best rate per square foot, and investors who value liquidity: Block A carries by far the deepest resale inventory in Faisal Hills, with roughly 400 plots listed on a single major portal in September 2026 against about 80 in the Executive Block.',
    advantagesHeading: 'Why Buyers Choose Block A',
    advantages: [
      { title: 'Immediate Construction', desc: 'Full ready possession with active utilities and 500+ resident families.' },
      { title: 'Best Value on Larger Plots', desc: '2 Kanal plots offer ~PKR 3,500/sq ft (half the per-sq-ft rate of 5M).' },
      { title: 'Highest Resale Liquidity', desc: 'Deepest market inventory in Faisal Hills (~400 active listings).' }
    ],
    considerationsHeading: 'If you are buying as an investment, weigh these first:',
    considerations: [
      { title: 'The price spread is wide', desc: 'Asking prices for the same 5 Marla size ran from 55 to 95 lakh. Position, land condition and possession status explain most of it, so a plot is easy to overpay for without checking comparables.' },
      { title: 'There is no developer payment plan here', desc: 'With inventory reportedly sold out, you buy from a seller and settle in full, which rules out the instalment route available in newer blocks.' },
      { title: 'Diligence sits on the transfer', desc: 'The NDC, the possession letter and the allotment record matter more than anything else in the transaction.' },
      { title: 'Larger plots are cheaper per square foot but slower to resell', desc: '5 and 8 Marla plots have the deepest demand and highest liquidity.' },
      { title: 'Published information about this block conflicts', desc: 'Including where the commercial hub sits and where the Arc Monument is. Confirm anything that affects your plot\'s value.' }
    ],
    disclaimerNote: 'We do not publish expected returns or appreciation figures for Block A, because no verifiable source supports them.'
  },
  buyingAndTransferSection: {
    heading: 'How You Buy in Block A: Resale and Transfer',
    intro: 'Because developer inventory is reported to be sold out, the transaction here is normally a transfer between a seller and you, completed at the developer\'s office on GT Road, Taxila.',
    steps: [
      { step: '01', title: 'Agree terms with the seller', desc: 'Agree terms with the seller, including who pays the transfer fee and any outstanding dues.' },
      { step: '02', title: 'Verify ownership at society office', desc: 'Verify ownership at the society office: the name on the allotment letter must match the seller\'s CNIC.' },
      { step: '03', title: 'Check transfer history', desc: 'Check the transfer history for repeated quick transfers.' },
      { step: '04', title: 'Obtain official NDC', desc: 'Obtain the NDC (No Demand Certificate) confirming no dues remain.' },
      { step: '05', title: 'Ask for possession letter', desc: 'Ask for the original possession letter where the plot has possession.' },
      { step: '06', title: 'Complete transfer at office', desc: 'Complete the transfer with both parties present or properly represented, and pay only once it is recorded.' },
      { step: '07', title: 'Collect documents in your name', desc: 'Collect the documents and updated allotment record in your name.' }
    ],
    documentsNeededHeading: 'What you will need',
    documentsNeeded: [
      'Copies of your CNIC, or NICOP for overseas buyers',
      'Copies of your nominee\'s CNIC',
      'Passport-size photographs',
      'The seller\'s documents and proof of payment',
      'Confirm the transfer fee and any NDC charge in writing before paying'
    ],
    warningSignsHeading: 'Warning signs',
    warningSigns: [
      'The seller\'s CNIC does not match the allotment letter',
      'The plot has changed hands repeatedly in a short period',
      'No NDC or possession letter can be produced',
      'The price sits well below market and no site visit is offered',
      'You are offered a file with no allotted plot number'
    ]
  },
  readingListingsGlossary: {
    heading: 'Reading Block A Listings',
    subline: 'Common terminology and acronyms decoded:',
    terms: [
      { term: 'Series', definition: 'The plot-number range within the block, such as the 3690, 3800 or 4210 series. Different series sit in different parts of the block.' },
      { term: 'MDR', definition: 'Main double road. Wider, busier, and priced above internal street plots.' },
      { term: 'Sunface', definition: 'A plot orientation buyers pay a premium for.' },
      { term: 'Margalla face', definition: 'Frontage looking toward the Margalla Hills.' },
      { term: 'Solid land', definition: 'Natural, level ground needing little preparation.' },
      { term: 'NDC open / all dues clear', definition: 'The No Demand Certificate is available or dues are settled, so a transfer can proceed.' }
    ]
  },
  comparisonExecutiveSection: {
    heading: 'Block A or the Executive Block?',
    subline: 'Head-to-head comparison between the two premier delivered blocks:',
    tableRows: [
      { aspect: 'Character', blockA: 'Largest established residential block', executiveBlock: 'Commercial and civic centre at the gate' },
      { aspect: 'Possession', blockA: 'Granted', executiveBlock: 'Granted' },
      { aspect: 'Price level', blockA: 'Below Executive for the same size', executiveBlock: 'Highest in the society' },
      { aspect: 'Resale choice', blockA: 'Around 400 listings in September 2026', executiveBlock: 'Around 80 over the same period' },
      { aspect: 'Commercial', blockA: 'Available; the hub question is unresolved', executiveBlock: 'The society\'s main commercial plots' },
      { aspect: 'Suits', blockA: 'Families building now; buyers wanting larger plots', executiveBlock: 'Businesses and buyers wanting GT Road frontage' }
    ],
    hubLinkNote: 'Every block is compared on our',
    hubLinkText: 'Faisal Hills blocks (→ blocks hub)',
    hubLinkHref: '/faisal-hills-blocks'
  },
  developmentAndFacilitiesSection: {
    heading: 'Development Status and Facilities',
    subline: 'On-ground execution and operational infrastructure:',
    statusTableRows: [
      { item: 'Main boulevard and internal roads', status: 'Developed and in use' },
      { item: 'Underground electricity, sewerage, water', status: 'In place and fully operational' },
      { item: 'Houses', status: '500+ Built and occupied; construction continuing' },
      { item: 'Mosques and parks', status: 'Operational (Grand Jamia Mosque & 12-Kanal Park)' },
      { item: 'Sports complex', status: 'Operational multi-purpose grounds' },
      { item: 'Hospital', status: 'Under construction' },
      { item: 'Filling station, community club', status: 'Planned & under development' },
      { item: 'Sewerage treatment plant', status: 'Operational' }
    ],
    statusNote: 'Statuses as last checked. Dated photographs are available on our [development updates](/faisal-hills-development).',
    arcMonumentNote: 'Arc Monument and Glow Gardens: Several sources, and many Block A listings, place the Arc Monument, a landmark modelled on the Arc de Triomphe, within or beside Block A, alongside a light-display park. Plots advertised as "near Arc Monument" trade on that proximity, so confirm the actual distance on the map.'
  },
  possessionAndBuildingSection: {
    heading: 'Possession and Building',
    text: 'Development means the infrastructure is finished: roads, sewerage, water, electricity and street lighting. Possession means the developer has formally handed your plot over and issued a possession letter, and only then can construction legally begin. In Block A, possession has been granted and plots are commonly advertised as ready to build. Confirm it in writing for your exact plot number, and check the society\'s construction approval requirements before you start.'
  },
  faqsSection: {
    heading: 'Frequently Asked Questions',
    subline: 'Direct answers to official questions regarding Block A:',
    faqs: [
      {
        q: 'Where is Block A in Faisal Hills?',
        a: 'Between Block B and the Executive Block, reached from the GT Road entrance along the main boulevard.'
      },
      {
        q: 'Is Block A sold out?',
        a: 'Developer inventory is reported to be exhausted, so plots are bought on resale rather than fresh booking. The resale market remains large, with around 400 plots listed in September 2026.'
      },
      {
        q: 'What plot sizes are available?',
        a: '5, 8, 10 and 14 Marla, 1 Kanal and 2 Kanal, plus commercial plots from 9.6 Marla upward.'
      },
      {
        q: 'What is the price of a 5 Marla plot in Block A?',
        a: 'Published ranges start around PKR 55 lakh, and recent asking prices ran from 55 to 95 lakh, with most between 72 and 85 lakh. Position accounts for most of the spread.'
      },
      {
        q: 'Are 2 Kanal plots available in Block A?',
        a: 'Yes. Block A is one of only two blocks offering them, recently asking PKR 3.1 to 3.2 crore, which is the lowest rate per square foot in the block.'
      },
      {
        q: 'Is it cash, instalments or resale?',
        a: 'Resale purchases are settled in full at transfer. Confirm any remaining developer terms in writing before committing.'
      },
      {
        q: 'Has possession been granted?',
        a: 'Yes, and plots are commonly advertised as ready to build. Confirm possession for your specific plot number.'
      },
      {
        q: 'Is Block A RDA approved?',
        a: 'Block A falls within the Faisal Hills scheme approved by the Rawalpindi Development Authority. Approval covers the scheme, not an individual plot, so verify your plot separately: see our [RDA approval details](/faisal-hills-noc).'
      },
      {
        q: 'Why do listings show 6 Marla or 1.2 Kanal plots?',
        a: 'Some are genuinely non-standard plots and some are standard plots measured with a different Marla size (225 sq ft vs 250 sq ft). Compare by dimensions and square feet.'
      },
      {
        q: 'How does a transfer work and what does it cost?',
        a: 'Ownership is verified at the society office, an NDC confirms no dues remain, the possession letter is handed over, and the transfer is recorded in your name. Confirm fees in writing beforehand.'
      },
      {
        q: 'Are there apartments in Block A?',
        a: 'Yes. ZN Tower 1 and Serene Hills are mixed-use buildings within the block, offering apartments and shops.'
      }
    ]
  },
  closingSiteVisitSection: {
    heading: 'Block A Plots for Sale: Check Availability',
    intro: 'Tell us the size, position and budget you have in mind. We will confirm what is genuinely available, share the current rate and the documents to check, and arrange a site visit.',
    sellingHeading: 'Selling or transferring a plot in Block A?',
    sellingText: 'We can help with the society office process, from ownership verification through to the NDC.',
    whatsappNumber: '+92 333 1113177',
    phoneNumber: '+92 333 1113177',
    officeAddress: 'Faisal Hills Main Entrance Gate, GT Road, Taxila / Rawalpindi',
    formTitle: 'Schedule a Site Visit or Request Verified Block A File',
    formSubtitle: 'Leave your details and our senior consultant will send verified available plots, rates and arrange an on-ground visit.',
    formButtonText: 'Submit Consultation Request',
    reviewedByNote: 'About this page: reviewed by Property Verification Team of Faisal Hills Authorized Sales Desk. Figures come from current market listings, developer material and our own site visits. Prices are set by the market and change without notice. If you find anything out of date, tell us and we will correct it.'
  }
};

export function mergeBlockACMS(incoming: any): BlockACMSData {
  if (!incoming || typeof incoming !== 'object') return initialBlockACMS;
  const incVer = incoming.verificationHeader || {};
  const incOver = incoming.overview || {};
  const incLoc = incoming.location || {};
  const incMap = incoming.mapAndMasterPlan || {};
  const incPlots = incoming.plotSizesSection || {};
  const incPrices = incoming.pricingAndRates || {};
  const incRate = incoming.ratePerSqFtSection || {};
  const incFiles = incoming.filesVsPossessionSection || {};
  const inc2k = incoming.twoKanalSection || {};
  const incCom = incoming.commercialSection || {};
  const incApt = incoming.apartmentsSection || {};
  const incSuits = incoming.whoItSuitsSection || {};
  const incTransfer = incoming.buyingAndTransferSection || {};
  const incGloss = incoming.readingListingsGlossary || {};
  const incExec = incoming.comparisonExecutiveSection || {};
  const incDev = incoming.developmentAndFacilitiesSection || {};
  const incPoss = incoming.possessionAndBuildingSection || {};
  const incFaqs = incoming.faqsSection || {};
  const incClose = incoming.closingSiteVisitSection || {};

  return {
    verificationHeader: {
      ...initialBlockACMS.verificationHeader,
      ...incVer,
      reviewerName: cleanVerifyText(incVer.reviewerName || initialBlockACMS.verificationHeader.reviewerName),
      reviewerRole: cleanVerifyText(incVer.reviewerRole || initialBlockACMS.verificationHeader.reviewerRole),
      pricesVerifiedDate: cleanVerifyText(incVer.pricesVerifiedDate || initialBlockACMS.verificationHeader.pricesVerifiedDate),
      siteCheckedDate: cleanVerifyText(incVer.siteCheckedDate || initialBlockACMS.verificationHeader.siteCheckedDate),
      badgeText: cleanVerifyText(incVer.badgeText || initialBlockACMS.verificationHeader.badgeText),
      possessionConfirmedText: cleanVerifyText(incVer.possessionConfirmedText || initialBlockACMS.verificationHeader.possessionConfirmedText)
    },
    overview: {
      ...initialBlockACMS.overview,
      ...incOver,
      h1: cleanVerifyText(incOver.h1 || initialBlockACMS.overview.h1),
      leadParagraph1: cleanVerifyText(incOver.leadParagraph1 || initialBlockACMS.overview.leadParagraph1),
      leadParagraph2: cleanVerifyText(incOver.leadParagraph2 || initialBlockACMS.overview.leadParagraph2),
      quickFacts: {
        ...initialBlockACMS.overview.quickFacts,
        ...(incOver.quickFacts || {})
      },
      ctaStripText: cleanVerifyText(incOver.ctaStripText || initialBlockACMS.overview.ctaStripText),
      ctaWhatsapp: cleanVerifyText(incOver.ctaWhatsapp || initialBlockACMS.overview.ctaWhatsapp),
      ctaCall: cleanVerifyText(incOver.ctaCall || initialBlockACMS.overview.ctaCall),
      image: incOver.image || initialBlockACMS.overview.image,
      imageAlt: cleanVerifyText(incOver.imageAlt || initialBlockACMS.overview.imageAlt),
      imageTag: cleanVerifyText(incOver.imageTag || initialBlockACMS.overview.imageTag),
      imageTitle: cleanVerifyText(incOver.imageTitle || initialBlockACMS.overview.imageTitle),
      imageSubtitle: cleanVerifyText(incOver.imageSubtitle || initialBlockACMS.overview.imageSubtitle)
    },
    location: {
      ...initialBlockACMS.location,
      ...incLoc,
      heading: cleanVerifyText(incLoc.heading || initialBlockACMS.location.heading),
      leadParagraph1: cleanVerifyText(incLoc.leadParagraph1 || initialBlockACMS.location.leadParagraph1),
      leadParagraph2: cleanVerifyText(incLoc.leadParagraph2 || initialBlockACMS.location.leadParagraph2),
      routesTitle: cleanVerifyText(incLoc.routesTitle || initialBlockACMS.location.routesTitle),
      routesList: incLoc.routesList || initialBlockACMS.location.routesList,
      driveTimesNote: cleanVerifyText(incLoc.driveTimesNote || initialBlockACMS.location.driveTimesNote),
      nearbyList: incLoc.nearbyList || initialBlockACMS.location.nearbyList,
      googleMapIframeUrl: incLoc.googleMapIframeUrl || initialBlockACMS.location.googleMapIframeUrl
    },
    mapAndMasterPlan: {
      ...initialBlockACMS.mapAndMasterPlan,
      ...incMap,
      heading: cleanVerifyText(incMap.heading || initialBlockACMS.mapAndMasterPlan.heading),
      subline: cleanVerifyText(incMap.subline || initialBlockACMS.mapAndMasterPlan.subline),
      description: cleanVerifyText(incMap.description || initialBlockACMS.mapAndMasterPlan.description),
      roadWidthsNote: cleanVerifyText(incMap.roadWidthsNote || initialBlockACMS.mapAndMasterPlan.roadWidthsNote),
      mapImage: incMap.mapImage || initialBlockACMS.mapAndMasterPlan.mapImage,
      pdfDownloadUrl: incMap.pdfDownloadUrl || initialBlockACMS.mapAndMasterPlan.pdfDownloadUrl
    },
    plotSizesSection: {
      ...initialBlockACMS.plotSizesSection,
      ...incPlots,
      heading: cleanVerifyText(incPlots.heading || initialBlockACMS.plotSizesSection.heading),
      subline: cleanVerifyText(incPlots.subline || initialBlockACMS.plotSizesSection.subline),
      tableRows: incPlots.tableRows || initialBlockACMS.plotSizesSection.tableRows,
      nonStandardHeading: cleanVerifyText(incPlots.nonStandardHeading || initialBlockACMS.plotSizesSection.nonStandardHeading),
      nonStandardText: cleanVerifyText(incPlots.nonStandardText || initialBlockACMS.plotSizesSection.nonStandardText),
      buyerTip: cleanVerifyText(incPlots.buyerTip || initialBlockACMS.plotSizesSection.buyerTip)
    },
    pricingAndRates: {
      ...initialBlockACMS.pricingAndRates,
      ...incPrices,
      heading: cleanVerifyText(incPrices.heading || initialBlockACMS.pricingAndRates.heading),
      leadParagraph: cleanVerifyText(incPrices.leadParagraph || initialBlockACMS.pricingAndRates.leadParagraph),
      tableRows: incPrices.tableRows || initialBlockACMS.pricingAndRates.tableRows,
      sampleAttribution: cleanVerifyText(incPrices.sampleAttribution || initialBlockACMS.pricingAndRates.sampleAttribution),
      lowPriceWarning: cleanVerifyText(incPrices.lowPriceWarning || initialBlockACMS.pricingAndRates.lowPriceWarning)
    },
    ratePerSqFtSection: {
      ...initialBlockACMS.ratePerSqFtSection,
      ...incRate,
      heading: cleanVerifyText(incRate.heading || initialBlockACMS.ratePerSqFtSection.heading),
      subline: cleanVerifyText(incRate.subline || initialBlockACMS.ratePerSqFtSection.subline),
      tableRows: incRate.tableRows || initialBlockACMS.ratePerSqFtSection.tableRows,
      landValueTakeaway: cleanVerifyText(incRate.landValueTakeaway || initialBlockACMS.ratePerSqFtSection.landValueTakeaway)
    },
    filesVsPossessionSection: {
      ...initialBlockACMS.filesVsPossessionSection,
      ...incFiles,
      heading: cleanVerifyText(incFiles.heading || initialBlockACMS.filesVsPossessionSection.heading),
      text: cleanVerifyText(incFiles.text || initialBlockACMS.filesVsPossessionSection.text)
    },
    twoKanalSection: {
      ...initialBlockACMS.twoKanalSection,
      ...inc2k,
      badge: cleanVerifyText(inc2k.badge || initialBlockACMS.twoKanalSection.badge),
      heading: cleanVerifyText(inc2k.heading || initialBlockACMS.twoKanalSection.heading),
      description: cleanVerifyText(inc2k.description || initialBlockACMS.twoKanalSection.description)
    },
    commercialSection: {
      ...initialBlockACMS.commercialSection,
      ...incCom,
      badge: cleanVerifyText(incCom.badge || initialBlockACMS.commercialSection.badge),
      heading: cleanVerifyText(incCom.heading || initialBlockACMS.commercialSection.heading),
      description: cleanVerifyText(incCom.description || initialBlockACMS.commercialSection.description),
      commercialHubNote: cleanVerifyText(incCom.commercialHubNote || initialBlockACMS.commercialSection.commercialHubNote)
    },
    apartmentsSection: {
      ...initialBlockACMS.apartmentsSection,
      ...incApt,
      badge: cleanVerifyText(incApt.badge || initialBlockACMS.apartmentsSection.badge),
      heading: cleanVerifyText(incApt.heading || initialBlockACMS.apartmentsSection.heading),
      intro: cleanVerifyText(incApt.intro || initialBlockACMS.apartmentsSection.intro),
      znTowerDesc: cleanVerifyText(incApt.znTowerDesc || initialBlockACMS.apartmentsSection.znTowerDesc),
      sereneHillsDesc: cleanVerifyText(incApt.sereneHillsDesc || initialBlockACMS.apartmentsSection.sereneHillsDesc),
      pricingNote: cleanVerifyText(incApt.pricingNote || initialBlockACMS.apartmentsSection.pricingNote),
      cautionNote: cleanVerifyText(incApt.cautionNote || initialBlockACMS.apartmentsSection.cautionNote)
    },
    whoItSuitsSection: {
      ...initialBlockACMS.whoItSuitsSection,
      ...incSuits,
      heading: cleanVerifyText(incSuits.heading || initialBlockACMS.whoItSuitsSection.heading),
      leadParagraph: cleanVerifyText(incSuits.leadParagraph || initialBlockACMS.whoItSuitsSection.leadParagraph),
      advantagesHeading: cleanVerifyText(incSuits.advantagesHeading || initialBlockACMS.whoItSuitsSection.advantagesHeading),
      advantages: incSuits.advantages || initialBlockACMS.whoItSuitsSection.advantages,
      considerationsHeading: cleanVerifyText(incSuits.considerationsHeading || initialBlockACMS.whoItSuitsSection.considerationsHeading),
      considerations: incSuits.considerations || initialBlockACMS.whoItSuitsSection.considerations,
      disclaimerNote: cleanVerifyText(incSuits.disclaimerNote || initialBlockACMS.whoItSuitsSection.disclaimerNote)
    },
    buyingAndTransferSection: {
      ...initialBlockACMS.buyingAndTransferSection,
      ...incTransfer,
      heading: cleanVerifyText(incTransfer.heading || initialBlockACMS.buyingAndTransferSection.heading),
      intro: cleanVerifyText(incTransfer.intro || initialBlockACMS.buyingAndTransferSection.intro),
      steps: incTransfer.steps || initialBlockACMS.buyingAndTransferSection.steps,
      documentsNeededHeading: cleanVerifyText(incTransfer.documentsNeededHeading || initialBlockACMS.buyingAndTransferSection.documentsNeededHeading),
      documentsNeeded: incTransfer.documentsNeeded || initialBlockACMS.buyingAndTransferSection.documentsNeeded,
      warningSignsHeading: cleanVerifyText(incTransfer.warningSignsHeading || initialBlockACMS.buyingAndTransferSection.warningSignsHeading),
      warningSigns: incTransfer.warningSigns || initialBlockACMS.buyingAndTransferSection.warningSigns
    },
    readingListingsGlossary: {
      ...initialBlockACMS.readingListingsGlossary,
      ...incGloss,
      heading: cleanVerifyText(incGloss.heading || initialBlockACMS.readingListingsGlossary.heading),
      subline: cleanVerifyText(incGloss.subline || initialBlockACMS.readingListingsGlossary.subline),
      terms: incGloss.terms || initialBlockACMS.readingListingsGlossary.terms
    },
    comparisonExecutiveSection: {
      ...initialBlockACMS.comparisonExecutiveSection,
      ...incExec,
      heading: cleanVerifyText(incExec.heading || initialBlockACMS.comparisonExecutiveSection.heading),
      subline: cleanVerifyText(incExec.subline || initialBlockACMS.comparisonExecutiveSection.subline),
      tableRows: incExec.tableRows || initialBlockACMS.comparisonExecutiveSection.tableRows,
      hubLinkNote: cleanVerifyText(incExec.hubLinkNote || initialBlockACMS.comparisonExecutiveSection.hubLinkNote),
      hubLinkText: cleanVerifyText(incExec.hubLinkText || initialBlockACMS.comparisonExecutiveSection.hubLinkText),
      hubLinkHref: incExec.hubLinkHref || initialBlockACMS.comparisonExecutiveSection.hubLinkHref
    },
    developmentAndFacilitiesSection: {
      ...initialBlockACMS.developmentAndFacilitiesSection,
      ...incDev,
      heading: cleanVerifyText(incDev.heading || initialBlockACMS.developmentAndFacilitiesSection.heading),
      subline: cleanVerifyText(incDev.subline || initialBlockACMS.developmentAndFacilitiesSection.subline),
      statusTableRows: incDev.statusTableRows || initialBlockACMS.developmentAndFacilitiesSection.statusTableRows,
      statusNote: cleanVerifyText(incDev.statusNote || initialBlockACMS.developmentAndFacilitiesSection.statusNote),
      arcMonumentNote: cleanVerifyText(incDev.arcMonumentNote || initialBlockACMS.developmentAndFacilitiesSection.arcMonumentNote)
    },
    possessionAndBuildingSection: {
      ...initialBlockACMS.possessionAndBuildingSection,
      ...incPoss,
      heading: cleanVerifyText(incPoss.heading || initialBlockACMS.possessionAndBuildingSection.heading),
      text: cleanVerifyText(incPoss.text || initialBlockACMS.possessionAndBuildingSection.text)
    },
    faqsSection: {
      ...initialBlockACMS.faqsSection,
      ...incFaqs,
      heading: cleanVerifyText(incFaqs.heading || initialBlockACMS.faqsSection.heading),
      subline: cleanVerifyText(incFaqs.subline || initialBlockACMS.faqsSection.subline),
      faqs: (incFaqs.faqs || initialBlockACMS.faqsSection.faqs).map((f: any) => ({
        q: cleanVerifyText(f.q),
        a: cleanVerifyText(f.a)
      }))
    },
    closingSiteVisitSection: {
      ...initialBlockACMS.closingSiteVisitSection,
      ...incClose,
      heading: cleanVerifyText(incClose.heading || initialBlockACMS.closingSiteVisitSection.heading),
      intro: cleanVerifyText(incClose.intro || initialBlockACMS.closingSiteVisitSection.intro),
      sellingHeading: cleanVerifyText(incClose.sellingHeading || initialBlockACMS.closingSiteVisitSection.sellingHeading),
      sellingText: cleanVerifyText(incClose.sellingText || initialBlockACMS.closingSiteVisitSection.sellingText),
      whatsappNumber: cleanVerifyText(incClose.whatsappNumber || initialBlockACMS.closingSiteVisitSection.whatsappNumber),
      phoneNumber: cleanVerifyText(incClose.phoneNumber || initialBlockACMS.closingSiteVisitSection.phoneNumber),
      officeAddress: cleanVerifyText(incClose.officeAddress || initialBlockACMS.closingSiteVisitSection.officeAddress),
      formTitle: cleanVerifyText(incClose.formTitle || initialBlockACMS.closingSiteVisitSection.formTitle),
      formSubtitle: cleanVerifyText(incClose.formSubtitle || initialBlockACMS.closingSiteVisitSection.formSubtitle),
      formButtonText: cleanVerifyText(incClose.formButtonText || initialBlockACMS.closingSiteVisitSection.formButtonText),
      reviewedByNote: cleanVerifyText(incClose.reviewedByNote || initialBlockACMS.closingSiteVisitSection.reviewedByNote)
    }
  };
}

export async function fetchBlockACMS(): Promise<BlockACMSData> {
  let localData: BlockACMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const localStr = localStorage.getItem('faisal_block_a_cms');
      if (localStr) localData = mergeBlockACMS(JSON.parse(localStr));
    } catch {}
  }

  const remote = await fetchSettingByKey<BlockACMSData>('faisal_block_a_cms');
  if (remote) {
    const merged = localData ? mergeBlockACMS({ ...remote, ...localData }) : mergeBlockACMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_block_a_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialBlockACMS;
}

export async function saveBlockACMS(cmsData: BlockACMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_block_a_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_block_a_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_block_a_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
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
    image?: string;
    imageAlt?: string;
    imageTag?: string;
    imageTitle?: string;
    imageSubtitle?: string;
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
    ctaCall: '+92 333 1113177',
    image: '/images/faisal-hills-sports-arena.webp',
    imageAlt: 'Faisal Hills Block B Boulevard and Sports Infrastructure',
    imageTag: 'Central Boulevard Sector',
    imageTitle: 'Sector B Living & Amenities',
    imageSubtitle: '225ft Grand Boulevard access, multi-sports complex, 10+ parks & panoramic Margalla views.'
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
  let localData: BlockBCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('faisal_block_b_cms');
      if (local) localData = mergeBlockBCMS(JSON.parse(local));
    } catch {}
  }

  const remote = await fetchSettingByKey<BlockBCMSData>('faisal_block_b_cms');
  if (remote) {
    const merged = localData ? mergeBlockBCMS({ ...remote, ...localData }) : mergeBlockBCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_block_b_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialBlockBCMS;
}

export async function saveBlockBCMS(cmsData: BlockBCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

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
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
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
    possessionConfirmedDate: string;
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
      plotCount: string;
      possession: string;
      howYouBuy: string;
      legalStatus: string;
      location?: string;
      commercialCuts?: string;
      connectivity?: string;
    };
    ctaStripText: string;
    ctaWhatsapp: string;
    ctaCall: string;
    image?: string;
    imageAlt?: string;
    imageTag?: string;
    imageTitle?: string;
    imageSubtitle?: string;
  };
  location: {
    heading: string;
    leadParagraph: string;
    boundaryNote: string;
    nearbyInstitutionsTitle: string;
    nearbyInstitutions: string[];
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
  plotSizesSection: {
    heading: string;
    tableRows: Array<{
      dimensions: string;
      sqFeet: string;
      sqYards: string;
      soldAs: string;
      status: string;
    }>;
    analysisNote1: string;
    analysisNote2: string;
  };
  possessionSection: {
    heading: string;
    subline: string;
    diffDevVsPossession: {
      devText: string;
      possessionText: string;
    };
    recordNote: string;
    sectoralWarningNote: string;
    howToTakeSteps: Array<{
      step: number;
      title: string;
      desc: string;
    }>;
    warningNote: string;
  };
  paymentQuestionSection: {
    heading: string;
    intro: string;
    tableRows: Array<{
      version: string;
      source: string;
      terms: string;
    }>;
    analysisPoint1: string;
    analysisPoint2: string;
    feeNote: string;
    scheduleAdvice: string;
  };
  priceScheduleSection: {
    heading: string;
    subline: string;
    disclaimerNote: string;
    tableRows: BlockDPriceRow[];
    rateComparisonHeading: string;
    rateComparisonNote: string;
    rateComparisonTakeaway: string;
  };
  developmentStatusSection: {
    heading: string;
    tableRows: Array<{
      item: string;
      status: string;
    }>;
    note: string;
  };
  commercialSection: {
    heading: string;
    lead: string;
    advice: string;
  };
  whoSuitsSection: {
    heading: string;
    suitsProfile: string;
    caveatsHeading: string;
    caveats: string[];
    disclaimer: string;
  };
  blockDVsCSection: {
    heading: string;
    subline: string;
    tableRows: Array<{
      feature: string;
      blockD: string;
      blockC: string;
    }>;
    outroNote: string;
  };
  buyingTransferSection: {
    heading: string;
    intro: string;
    steps: string[];
    requiredDocuments: string[];
    warningSigns: string[];
  };
  readingListingsSection: {
    heading: string;
    terms: Array<{
      term: string;
      definition: string;
    }>;
  };
  whyInvestSection?: {
    heading: string;
    subline: string;
    reasons: BlockDWhyInvestItem[];
  };
  amenitiesSection?: {
    heading: string;
    subline: string;
    amenitiesList: BlockDAmenityItem[];
  };
  developmentMilestonesSection?: {
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
    sellingPrompt: string;
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
    possessionConfirmedDate: 'September 2026',
    siteCheckedDate: 'September 2026',
    badgeText: 'Official Verified Block Guide'
  },
  overview: {
    h1: 'Faisal Hills Block D: Possession, Plot Prices and Plots for Sale',
    leadParagraph1: 'Block D adjoins Block C and sits deeper inside Faisal Hills, away from the GT Road frontage. Possession has been granted here, main roads and underground utilities are reported complete, and plot owners are already building.',
    leadParagraph2: 'It is also the block where published information is least reliable. Five different payment plans have been advertised for Block D by different websites, and at least two of them cannot both be current. This page sets out what is supported by evidence and what still needs confirming.',
    quickFacts: {
      position: 'Adjacent to Block C, set back from the GT Road',
      residentialSizes: '5, 8 and 10 Marla, plus 14 Marla and 1 Kanal (2 Kanal unconfirmed)',
      plotCount: 'Reported between 2,000 and 2,435',
      possession: 'Granted (Available in developed sectors; owners building)',
      howYouBuy: 'Five different plans published; confirm the current schedule',
      legalStatus: 'Within the RDA-approved Faisal Hills scheme',
      location: 'Adjacent to Block C, set back from GT Road',
      commercialCuts: 'Commercial zones allocated on plan',
      connectivity: 'M-1 Brahma & GT Road via 100ft Boulevards'
    },
    ctaStripText: 'Ask what is available today and which payment terms actually apply:',
    ctaWhatsapp: '+92 333 1113177',
    ctaCall: '+92 333 1113177',
    image: '/images/faisal-hills-overview.webp',
    imageAlt: 'Faisal Hills Block D Aerial Overview',
    imageTag: 'On-Ground Development View',
    imageTitle: 'Faisal Hills Block D Overview',
    imageSubtitle: 'Developed residential sector with paved avenues and construction underway.'
  },
  location: {
    heading: 'Where Block D Is',
    leadParagraph: 'Block D lies next to Block C, positioned further inside the society than the entrance blocks. That distance from the GT Road is the trade-off buyers make here: less highway noise and lower prices, in exchange for a longer drive to the main gate.',
    boundaryNote: 'One source reports that Block D shares a boundary with New City Phase 2, Islamabad. Faisal Hills is marketed as an Islamabad address; the society itself lies in Rawalpindi District near Taxila, under the Rawalpindi Development Authority.',
    nearbyInstitutionsTitle: 'Nearby institutions and employers:',
    nearbyInstitutions: [
      'COMSATS University Islamabad',
      'HITEC University Taxila',
      'UET Taxila',
      'Margalla Hospital',
      'Wah Cantt',
      'Pakistan Ordnance Factories (POF)',
      'Heavy Industries Taxila (HIT)',
      'Taxila Museum & Gandhara heritage sites'
    ],
    driveTimesNote: 'Published drive times for this block vary widely between sources, so we quote only routes our own team has driven, with the distance and the time of day.',
    travelTimes: [
      { destination: 'M-1 Brahma Jhang Bahtar Interchange', distance: '3.2 km', time: '5 Mins', note: 'Direct M-1 Motorway connection' },
      { destination: 'Grand GT Road (N-5 Highway)', distance: '3.8 km', time: '7 Mins', note: 'Via 225ft Grand Boulevard' },
      { destination: 'Block C & Hills Walk Promenade', distance: '1.2 km', time: '2 Mins', note: 'Direct internal avenue connection' },
      { destination: 'Taxila Museum & Cantt Commercials', distance: '6.5 km', time: '9 Mins', note: 'Short urban commute' },
      { destination: 'COMSATS & HITEC Universities', distance: '7.8 km', time: '11 Mins', note: 'Academic corridor' },
      { destination: 'Islamabad Toll Plaza & Zero Point', distance: '26.0 km', time: '24 Mins', note: 'Signal-free drive via M-1' }
    ],
    googleMapIframeUrl: 'https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed'
  },
  masterPlan: {
    heading: 'Block D Map and Master Plan',
    subline: 'Internal roads from 40 feet upward, with main roads at 100 feet',
    description: "The block is planned around internal roads reported from 40 feet upward, with main roads at 100 feet, connecting to the society's wider road network. The plan allocates space for parks and green belts, mosques, schools, healthcare and commercial areas.",
    boulevardSpecsNote: "Labelled Block D map showing sectors, parks, commercial areas and road network. The society-wide plan is on our Faisal Hills master plan page.",
    mapImage: '/images/faisal-hills-master-plan-map-opt.webp',
    pdfDownloadUrl: '/images/faisal-hills-master-plan-map-opt.webp'
  },
  plotSizesSection: {
    heading: 'Plot Sizes in Block D',
    tableRows: [
      { dimensions: '25 × 50', sqFeet: '1,250', sqYards: '139', soldAs: '5 Marla', status: 'Confirmed' },
      { dimensions: '30 × 60', sqFeet: '1,800', sqYards: '200', soldAs: '8 Marla', status: 'Confirmed' },
      { dimensions: '35 × 70', sqFeet: '2,450', sqYards: '272', soldAs: '10 Marla', status: 'Confirmed' },
      { dimensions: '40 × 80', sqFeet: '3,200', sqYards: '356', soldAs: '14 Marla', status: 'Unconfirmed' },
      { dimensions: '50 × 90', sqFeet: '4,500', sqYards: '500', soldAs: '1 Kanal', status: 'Confirmed' },
      { dimensions: '75 × 120', sqFeet: '9,000', sqYards: '1,000', soldAs: '2 Kanal', status: 'Unconfirmed' }
    ],
    analysisNote1: 'Published size lists disagree. One dealer page lists a payment plan covering 5.55, 8, 10.89 Marla, 1 Kanal and 2 Kanal, while its own FAQ on the same page lists 5, 8, 10, 14 Marla and 1 Kanal. An agency page lists five sizes with no 2 Kanal. Until the society office confirms the current schedule, treat 14 Marla and 2 Kanal as unconfirmed here.',
    analysisNote2: 'The same plot is also described two ways because Faisal Hills schedules use a 225 sq ft Marla while many listings use 250. A 25 × 50 ft plot is 5 Marla on one measure and 5.55 on the other. Compare by dimensions and square feet.'
  },
  possessionSection: {
    heading: 'Possession in Block D',
    subline: "This is the block's strongest claim and the main reason buyers look at it.",
    diffDevVsPossession: {
      devText: 'Development means the infrastructure is finished: roads, sewerage, water, electricity and street lighting.',
      possessionText: 'Possession means the developer has formally handed your plot over and issued a possession letter. Construction can legally begin only after that.'
    },
    recordNote: 'Multiple sources, across more than one network, report that possession has been granted in Block D. One describes it as the first block in the society where possession was handed over to plot owners. Another names 30 June 2025 as the announced possession date. A mid-2026 development review reports possession available in the developed sectors, with owners already building.',
    sectoralWarningNote: 'The one point still open is whether possession applies to the whole block or only to its developed sectors, since sources use both descriptions. Ask which applies to your plot number, and get it in writing.',
    howToTakeSteps: [
      { step: 1, title: 'Clear Outstanding Dues', desc: 'Clear all outstanding dues on the plot by the deadline the society sets.' },
      { step: 2, title: 'Submit Proof of Payment', desc: 'Submit proof of payment to the society office.' },
      { step: 3, title: 'Obtain No Demand Certificate (NDC)', desc: 'Obtain the No Demand Certificate (NDC), which confirms no dues remain against the plot.' },
      { step: 4, title: 'Collect Possession Letter', desc: 'Complete the possession formalities and collect your possession letter.' },
      { step: 5, title: 'Construction Approval', desc: 'Confirm construction approval requirements before starting work.' }
    ],
    warningNote: 'No other Block D page sets this out on a current page. If a seller or agent cannot explain these steps, treat that as a warning sign rather than a detail.'
  },
  paymentQuestionSection: {
    heading: 'The Payment Question: Which Plan Applies',
    intro: 'Five different payment structures have been published for Block D. They cannot all be current, and some are years old without any date on the page.',
    tableRows: [
      { version: 'Version 1', source: 'Dealer page, 2025', terms: '15 quarterly instalments, a separate possession charge, 21% discount for full payment' },
      { version: 'Version 2', source: 'Same dealer page, updated Aug 2026', terms: '10 quarterly instalments, 20% discount' },
      { version: 'Version 3', source: 'Agency block page, 2025', terms: 'Four years: down payment, 16 quarterly instalments and a possession amount' },
      { version: 'Version 4', source: 'Agency project page, 2025', terms: 'Four-year quarterly instalments' },
      { version: 'Version 5', source: 'Developer-linked prices guide, 2026', terms: 'Residential plots on full cash only' }
    ],
    analysisPoint1: "First, the 2026 version on that dealer page lists totals, down payments and instalments identical to Prime Block's across all five sizes, to the rupee. Either the two blocks are priced the same by coincidence, or the figures were copied from the Prime Block page.",
    analysisPoint2: 'Second, that page describes its plan in the past tense, which may mean the plan has closed. It does not say so.',
    feeNote: 'A registration fee is charged on booking, published as both PKR 15,000 and PKR 20,000 by different sources. Some versions also carry a possession amount payable at handover, which the cash-only version does not.',
    scheduleAdvice: 'Ask for the schedule the developer has issued for the current month, in writing, including the registration fee and any possession charge. Our Faisal Hills payment plan carries the society-wide position.'
  },
  priceScheduleSection: {
    heading: 'Block D Plot Prices and Current Rates',
    subline: 'Block D is consistently described as one of the two lowest-priced blocks in the society, alongside Block C. Reported entry prices start around PKR 40 lakh for 5 Marla.',
    disclaimerNote: 'Bands as published elsewhere; replace them with your own current figures and date them. Corner, park-facing and main-road plots sell above standard plots in the same street. Full block-by-block figures: Faisal Hills plot prices.',
    tableRows: [
      {
        size: '5 Marla',
        dimensions: '25 × 50',
        sqYards: '139',
        sqFeet: '1,250',
        category: 'Residential',
        priceRange: 'PKR 40 to 55 lakh',
        possession: 'Possession Granted',
        highlight: 'Entry price reported around PKR 40 lakh'
      },
      {
        size: '8 Marla',
        dimensions: '30 × 60',
        sqYards: '200',
        sqFeet: '1,800',
        category: 'Residential',
        priceRange: 'Rates on request',
        possession: 'Available',
        highlight: 'Ask for current rates'
      },
      {
        size: '10 Marla',
        dimensions: '35 × 70',
        sqYards: '272',
        sqFeet: '2,450',
        category: 'Residential',
        priceRange: 'PKR 70 lakh to 1.15 crore',
        possession: 'Available',
        highlight: 'No asking-price sample available'
      },
      {
        size: '14 Marla',
        dimensions: '40 × 80',
        sqYards: '356',
        sqFeet: '3,200',
        category: 'Residential',
        priceRange: 'Rates on request',
        possession: 'Unconfirmed',
        highlight: 'Availability itself unconfirmed'
      },
      {
        size: '1 Kanal',
        dimensions: '50 × 90',
        sqYards: '500',
        sqFeet: '4,500',
        category: 'Residential',
        priceRange: 'PKR 1.40 to 2.10 crore',
        possession: 'Available',
        highlight: 'No asking-price sample available'
      }
    ],
    rateComparisonHeading: 'How Block D plot rates compare',
    rateComparisonNote: 'On asking prices analysed for neighbouring blocks in September 2026, a typical 5 Marla plot worked out at roughly PKR 4,160 per square foot in Block C and PKR 4,000 in Block B, against about 6,240 in Block A. Block D plot rates are reported below both. If the 5 Marla entry price of around PKR 40 lakh is accurate, that would work out near PKR 3,200 per square foot, which would make Block D the lowest rate among the blocks where possession is available. Treat that as an estimate until we confirm it against completed transactions.',
    rateComparisonTakeaway: 'That is the practical case for Block D: possession at close to the lowest rate in the society, in exchange for distance from the entrance.'
  },
  developmentStatusSection: {
    heading: 'Development Status and Facilities',
    tableRows: [
      { item: 'Main roads, reported at 100 ft', status: 'Complete' },
      { item: 'Underground utilities', status: 'Complete' },
      { item: 'Houses', status: 'Owners building in developed sectors' },
      { item: 'Parks and green belts', status: 'Allocated on the plan & green reservations active' },
      { item: 'Mosque, school and healthcare sites', status: 'Allocated on the plan' },
      { item: 'Commercial areas', status: 'Allocated on the plan' }
    ],
    note: 'Statuses as last checked. Society-wide, a university site and a sports complex are reported as in progress, and Glow Park and a Miyawaki forest exist elsewhere in the scheme. Those are society amenities rather than Block D facilities, and we list them as such. We describe a facility as built only once our team has seen it. Anything shown on the master plan but not yet constructed is described as planned.'
  },
  commercialSection: {
    heading: 'Commercial Plots in Block D',
    lead: "Block D includes commercial areas within its plan, positioned to serve the surrounding residential streets rather than through traffic. Published commercial sizes and rates for this block are not available from any source we could find, and commercial listings for Block D are scarce.",
    advice: "If you are looking at commercial land here, ask us what is genuinely available, at what size, and where it sits relative to the block's main roads."
  },
  whoSuitsSection: {
    heading: 'Who Block D Suits, and What to Weigh',
    suitsProfile: 'It tends to suit buyers who want possession at the lowest entry price in the society, families who prefer a quieter position away from the GT Road, and investors buying into a block where construction has already started.',
    caveatsHeading: 'If you are buying as an investment, weigh these first:',
    caveats: [
      'The published record is unreliable. Five payment plans, two size lists and three plot counts circulate. Work only from documents the society office issues.',
      'Possession may be sectoral rather than block-wide. Confirm it for your plot number before paying a possession-plot price.',
      'Distance from the entrance is the trade-off. It is why the block is cheaper, and it will affect resale too.',
      'Commercial information is thin. If commercial is your plan, get sizes and rates in writing first.',
      'A possession charge may apply on some plans and not others.'
    ],
    disclaimer: 'We do not publish expected returns or appreciation figures for Block D, because no verifiable source supports them.'
  },
  blockDVsCSection: {
    heading: 'Block D or Block C?',
    subline: 'The two value blocks, side by side.',
    tableRows: [
      { feature: 'Position', blockD: 'Adjacent to Block C, deeper in', blockC: 'Toward the M-1 side' },
      { feature: 'Possession', blockD: 'Granted (developed sectors)', blockC: 'Available in completed sectors' },
      { feature: 'Entry price', blockD: 'Reported from around PKR 40 lakh', blockC: 'Reported from around PKR 35 lakh, though asking prices run higher' },
      { feature: 'Plot count', blockD: '2,000 to 2,435', blockC: 'About 8,350 residential' },
      { feature: 'Payment', blockD: 'Five versions published (confirm current)', blockC: 'Cash only, no possession charge' },
      { feature: 'Suits', blockD: 'Buyers wanting possession at the lowest rate', blockC: 'Buyers wanting the widest choice of 5 Marla plots' }
    ],
    outroNote: 'Every block is compared on our Faisal Hills blocks page, and Block B is the alternative if Margalla views matter more than price.'
  },
  buyingTransferSection: {
    heading: 'Buying and Transferring in Block D',
    intro: 'Whether you buy from the developer or on resale, the checks are the same.',
    steps: [
      'Confirm possession status for that exact plot number, in writing.',
      "Verify ownership at the society office: the name on the allotment letter must match the seller's CNIC.",
      'Check the transfer history for repeated quick transfers.',
      'Ask for the original possession letter where possession has been granted.',
      'Obtain the NDC confirming no dues remain.',
      'Complete the transfer with both parties present or properly represented, and pay only once it is recorded.'
    ],
    requiredDocuments: [
      'Copies of your CNIC (or NICOP for overseas buyers)',
      "Copies of your nominee's CNIC",
      'Passport-size photographs',
      "The seller's documents and proof of payment",
      'Proof of payment and NDC clearance receipt',
      "Payment for a new booking made by pay order or demand draft in the developer's registered name"
    ],
    warningSigns: [
      "The seller's CNIC does not match the allotment letter",
      'No NDC or possession letter can be produced',
      'A payment plan is quoted that you cannot find on any current document',
      'The price sits well below market with no site visit offered'
    ]
  },
  readingListingsSection: {
    heading: 'Reading Block D Listings',
    terms: [
      { term: 'Series', definition: 'The plot-number range within the block. Different series sit in different sectors.' },
      { term: 'Possessionable', definition: 'The seller is describing a plot where possession has been granted. Confirm it.' },
      { term: 'Solid land / cutting plot', definition: 'Natural level ground versus a plot formed by cutting or filling sloping ground, which may need site preparation.' },
      { term: 'NDC open / all dues clear', definition: 'The No Demand Certificate is available, so a transfer can proceed.' },
      { term: 'Investor rate', definition: 'A seller signalling a quick sale, worth verifying rather than assuming.' }
    ]
  },
  faqsSection: {
    heading: 'Frequently Asked Questions',
    subline: 'Official verified answers to the 10 most critical Block D questions:',
    faqs: [
      {
        q: 'Where is Block D in Faisal Hills?',
        a: 'Adjacent to Block C, set further inside the society than the entrance blocks, away from the GT Road frontage.'
      },
      {
        q: 'Has possession been granted in Block D?',
        a: 'Yes. Several sources report possession in Block D, one describing it as the first block handed over to owners and another naming 30 June 2025 as the announced date. Whether it covers the whole block or only developed sectors is the open question, so confirm it for your plot number.'
      },
      {
        q: 'How do I take possession of my plot?',
        a: 'Clear outstanding dues, submit proof of payment, obtain the NDC, complete the possession formalities and collect your possession letter. Then confirm construction approval requirements before building.'
      },
      {
        q: 'What is an NDC?',
        a: 'A No Demand Certificate issued by the developer, confirming no payments remain outstanding against a plot. It is required before possession and before a transfer can proceed.'
      },
      {
        q: 'Which payment plan applies to Block D?',
        a: 'Five different plans have been published, from 10 quarterly instalments to a four-year plan with 16 instalments and a possession amount, and one source says residential plots are cash only. Ask for the schedule issued this month, in writing.'
      },
      {
        q: 'Is there a registration fee or possession charge?',
        a: 'A registration fee is charged at booking, published as both PKR 15,000 and PKR 20,000. Some plan versions also include a possession amount payable at handover. Confirm both before paying.'
      },
      {
        q: 'What plot sizes are available?',
        a: '5, 8 and 10 Marla are confirmed across sources. 14 Marla and 2 Kanal appear on some lists and not others, so treat them as unconfirmed here.'
      },
      {
        q: 'What are current plot rates in Block D?',
        a: 'Reported entry prices start around PKR 40 lakh for 5 Marla, which would make Block D one of the two lowest-priced blocks in the society. Ask us for today’s rate on a specific plot.'
      },
      {
        q: 'Is Block D cheaper than Block C?',
        a: 'On reported entry prices the two are close, with Block C starting slightly lower and Block D offering possession at a comparable rate. Compare the actual plots rather than the headline figures.'
      },
      {
        q: 'Is Block D RDA approved?',
        a: 'Block D falls within the Faisal Hills scheme approved by the Rawalpindi Development Authority. Approval covers the scheme, not an individual plot, so verify your plot separately.'
      }
    ]
  },
  closingSiteVisitSection: {
    heading: 'Block D Plots for Sale: Check Availability',
    intro: 'Tell us the size and budget you have in mind, and whether you want to build straight away. We will confirm what is genuinely available, the possession status of specific plots, the current payment terms in writing, and arrange a site visit.',
    sellingPrompt: 'Selling a plot in Block D? We can help with the society office process, from ownership verification through to the NDC.',
    featureBullets: [
      'Zero service charge on official file verification',
      'Custom video tours available for overseas Pakistanis',
      'Dedicated Zedem International transfer facilitation'
    ],
    whatsappNumber: '+92 333 1113177',
    phoneNumber: '+92 333 1113177',
    officeAddress: 'Faisal Hills Main Boulevard Commercial Desk, Taxila GT Road',
    formTitle: 'Block D Plots for Sale: Check Availability',
    formSubtitle: 'Leave your details to receive verified Block D plot inventory, possession status, and transfer assistance.',
    formButtonText: 'SUBMIT OFFICIAL BLOCK D INQUIRY',
    reviewedByNote: 'About this page: reviewed by Senior Property Verification Desk of Faisal Hills Advisory. Payment and possession details are drawn from published sources and dated where possible; rates per square foot are our own analysis of market listings. Prices and terms change without notice. If you find anything out of date, tell us and we will correct it.'
  }
};

export function mergeBlockDCMS(incoming: any): BlockDCMSData {
  if (!incoming || typeof incoming !== 'object') return initialBlockDCMS;

  const incVer = incoming.verificationHeader || {};
  const incOver = incoming.overview || {};
  const incLoc = incoming.location || {};
  const incMap = incoming.masterPlan || {};
  const incSizes = incoming.plotSizesSection || {};
  const incPoss = incoming.possessionSection || {};
  const incPayQ = incoming.paymentQuestionSection || {};
  const incPrice = incoming.priceScheduleSection || {};
  const incDevStat = incoming.developmentStatusSection || {};
  const incComm = incoming.commercialSection || {};
  const incWho = incoming.whoSuitsSection || {};
  const incDVsC = incoming.blockDVsCSection || {};
  const incBuy = incoming.buyingTransferSection || {};
  const incList = incoming.readingListingsSection || {};
  const incFaqs = incoming.faqsSection || {};
  const incClose = incoming.closingSiteVisitSection || {};

  return {
    verificationHeader: {
      reviewerName: cleanVerifyText(incVer.reviewerName || initialBlockDCMS.verificationHeader.reviewerName),
      reviewerRole: cleanVerifyText(incVer.reviewerRole || initialBlockDCMS.verificationHeader.reviewerRole),
      pricesVerifiedDate: cleanVerifyText(incVer.pricesVerifiedDate || initialBlockDCMS.verificationHeader.pricesVerifiedDate),
      possessionConfirmedDate: cleanVerifyText(incVer.possessionConfirmedDate || initialBlockDCMS.verificationHeader.possessionConfirmedDate),
      siteCheckedDate: cleanVerifyText(incVer.siteCheckedDate || initialBlockDCMS.verificationHeader.siteCheckedDate),
      badgeText: cleanVerifyText(incVer.badgeText || initialBlockDCMS.verificationHeader.badgeText)
    },
    overview: {
      h1: cleanVerifyText(incOver.h1 || initialBlockDCMS.overview.h1),
      leadParagraph1: cleanVerifyText(incOver.leadParagraph1 || initialBlockDCMS.overview.leadParagraph1),
      leadParagraph2: cleanVerifyText(incOver.leadParagraph2 || initialBlockDCMS.overview.leadParagraph2),
      quickFacts: {
        position: cleanVerifyText(incOver.quickFacts?.position || initialBlockDCMS.overview.quickFacts.position),
        residentialSizes: cleanVerifyText(incOver.quickFacts?.residentialSizes || initialBlockDCMS.overview.quickFacts.residentialSizes),
        plotCount: cleanVerifyText(incOver.quickFacts?.plotCount || initialBlockDCMS.overview.quickFacts.plotCount),
        possession: cleanVerifyText(incOver.quickFacts?.possession || initialBlockDCMS.overview.quickFacts.possession),
        howYouBuy: cleanVerifyText(incOver.quickFacts?.howYouBuy || initialBlockDCMS.overview.quickFacts.howYouBuy),
        legalStatus: cleanVerifyText(incOver.quickFacts?.legalStatus || initialBlockDCMS.overview.quickFacts.legalStatus),
        location: cleanVerifyText(incOver.quickFacts?.location || initialBlockDCMS.overview.quickFacts.location),
        commercialCuts: cleanVerifyText(incOver.quickFacts?.commercialCuts || initialBlockDCMS.overview.quickFacts.commercialCuts),
        connectivity: cleanVerifyText(incOver.quickFacts?.connectivity || initialBlockDCMS.overview.quickFacts.connectivity)
      },
      ctaStripText: cleanVerifyText(incOver.ctaStripText || initialBlockDCMS.overview.ctaStripText),
      ctaWhatsapp: cleanVerifyText(incOver.ctaWhatsapp || initialBlockDCMS.overview.ctaWhatsapp),
      ctaCall: cleanVerifyText(incOver.ctaCall || initialBlockDCMS.overview.ctaCall)
    },
    location: {
      heading: cleanVerifyText(incLoc.heading || initialBlockDCMS.location.heading),
      leadParagraph: cleanVerifyText(incLoc.leadParagraph || initialBlockDCMS.location.leadParagraph),
      boundaryNote: cleanVerifyText(incLoc.boundaryNote || initialBlockDCMS.location.boundaryNote),
      nearbyInstitutionsTitle: cleanVerifyText(incLoc.nearbyInstitutionsTitle || initialBlockDCMS.location.nearbyInstitutionsTitle),
      nearbyInstitutions: Array.isArray(incLoc.nearbyInstitutions)
        ? incLoc.nearbyInstitutions.map((i: string) => cleanVerifyText(i))
        : initialBlockDCMS.location.nearbyInstitutions,
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
    plotSizesSection: {
      heading: cleanVerifyText(incSizes.heading || initialBlockDCMS.plotSizesSection.heading),
      tableRows: (incSizes.tableRows || initialBlockDCMS.plotSizesSection.tableRows || []).map((r: any) => ({
        dimensions: cleanVerifyText(r.dimensions || ''),
        sqFeet: cleanVerifyText(r.sqFeet || ''),
        sqYards: cleanVerifyText(r.sqYards || ''),
        soldAs: cleanVerifyText(r.soldAs || ''),
        status: cleanVerifyText(r.status || 'Confirmed')
      })),
      analysisNote1: cleanVerifyText(incSizes.analysisNote1 || initialBlockDCMS.plotSizesSection.analysisNote1),
      analysisNote2: cleanVerifyText(incSizes.analysisNote2 || initialBlockDCMS.plotSizesSection.analysisNote2)
    },
    possessionSection: {
      heading: cleanVerifyText(incPoss.heading || initialBlockDCMS.possessionSection.heading),
      subline: cleanVerifyText(incPoss.subline || initialBlockDCMS.possessionSection.subline),
      diffDevVsPossession: {
        devText: cleanVerifyText(incPoss.diffDevVsPossession?.devText || initialBlockDCMS.possessionSection.diffDevVsPossession.devText),
        possessionText: cleanVerifyText(incPoss.diffDevVsPossession?.possessionText || initialBlockDCMS.possessionSection.diffDevVsPossession.possessionText)
      },
      recordNote: cleanVerifyText(incPoss.recordNote || initialBlockDCMS.possessionSection.recordNote),
      sectoralWarningNote: cleanVerifyText(incPoss.sectoralWarningNote || initialBlockDCMS.possessionSection.sectoralWarningNote),
      howToTakeSteps: (incPoss.howToTakeSteps || initialBlockDCMS.possessionSection.howToTakeSteps || []).map((s: any, idx: number) => ({
        step: typeof s.step === 'number' ? s.step : idx + 1,
        title: cleanVerifyText(s.title || ''),
        desc: cleanVerifyText(s.desc || '')
      })),
      warningNote: cleanVerifyText(incPoss.warningNote || initialBlockDCMS.possessionSection.warningNote)
    },
    paymentQuestionSection: {
      heading: cleanVerifyText(incPayQ.heading || initialBlockDCMS.paymentQuestionSection.heading),
      intro: cleanVerifyText(incPayQ.intro || initialBlockDCMS.paymentQuestionSection.intro),
      tableRows: (incPayQ.tableRows || initialBlockDCMS.paymentQuestionSection.tableRows || []).map((r: any) => ({
        version: cleanVerifyText(r.version || ''),
        source: cleanVerifyText(r.source || ''),
        terms: cleanVerifyText(r.terms || '')
      })),
      analysisPoint1: cleanVerifyText(incPayQ.analysisPoint1 || initialBlockDCMS.paymentQuestionSection.analysisPoint1),
      analysisPoint2: cleanVerifyText(incPayQ.analysisPoint2 || initialBlockDCMS.paymentQuestionSection.analysisPoint2),
      feeNote: cleanVerifyText(incPayQ.feeNote || initialBlockDCMS.paymentQuestionSection.feeNote),
      scheduleAdvice: cleanVerifyText(incPayQ.scheduleAdvice || initialBlockDCMS.paymentQuestionSection.scheduleAdvice)
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
      })),
      rateComparisonHeading: cleanVerifyText(incPrice.rateComparisonHeading || initialBlockDCMS.priceScheduleSection.rateComparisonHeading),
      rateComparisonNote: cleanVerifyText(incPrice.rateComparisonNote || initialBlockDCMS.priceScheduleSection.rateComparisonNote),
      rateComparisonTakeaway: cleanVerifyText(incPrice.rateComparisonTakeaway || initialBlockDCMS.priceScheduleSection.rateComparisonTakeaway)
    },
    developmentStatusSection: {
      heading: cleanVerifyText(incDevStat.heading || initialBlockDCMS.developmentStatusSection.heading),
      tableRows: (incDevStat.tableRows || initialBlockDCMS.developmentStatusSection.tableRows || []).map((r: any) => ({
        item: cleanVerifyText(r.item || ''),
        status: cleanVerifyText(r.status || '')
      })),
      note: cleanVerifyText(incDevStat.note || initialBlockDCMS.developmentStatusSection.note)
    },
    commercialSection: {
      heading: cleanVerifyText(incComm.heading || initialBlockDCMS.commercialSection.heading),
      lead: cleanVerifyText(incComm.lead || initialBlockDCMS.commercialSection.lead),
      advice: cleanVerifyText(incComm.advice || initialBlockDCMS.commercialSection.advice)
    },
    whoSuitsSection: {
      heading: cleanVerifyText(incWho.heading || initialBlockDCMS.whoSuitsSection.heading),
      suitsProfile: cleanVerifyText(incWho.suitsProfile || initialBlockDCMS.whoSuitsSection.suitsProfile),
      caveatsHeading: cleanVerifyText(incWho.caveatsHeading || initialBlockDCMS.whoSuitsSection.caveatsHeading),
      caveats: Array.isArray(incWho.caveats)
        ? incWho.caveats.map((c: string) => cleanVerifyText(c))
        : initialBlockDCMS.whoSuitsSection.caveats,
      disclaimer: cleanVerifyText(incWho.disclaimer || initialBlockDCMS.whoSuitsSection.disclaimer)
    },
    blockDVsCSection: {
      heading: cleanVerifyText(incDVsC.heading || initialBlockDCMS.blockDVsCSection.heading),
      subline: cleanVerifyText(incDVsC.subline || initialBlockDCMS.blockDVsCSection.subline),
      tableRows: (incDVsC.tableRows || initialBlockDCMS.blockDVsCSection.tableRows || []).map((r: any) => ({
        feature: cleanVerifyText(r.feature || ''),
        blockD: cleanVerifyText(r.blockD || ''),
        blockC: cleanVerifyText(r.blockC || '')
      })),
      outroNote: cleanVerifyText(incDVsC.outroNote || initialBlockDCMS.blockDVsCSection.outroNote)
    },
    buyingTransferSection: {
      heading: cleanVerifyText(incBuy.heading || initialBlockDCMS.buyingTransferSection.heading),
      intro: cleanVerifyText(incBuy.intro || initialBlockDCMS.buyingTransferSection.intro),
      steps: Array.isArray(incBuy.steps)
        ? incBuy.steps.map((s: string) => cleanVerifyText(s))
        : initialBlockDCMS.buyingTransferSection.steps,
      requiredDocuments: Array.isArray(incBuy.requiredDocuments)
        ? incBuy.requiredDocuments.map((d: string) => cleanVerifyText(d))
        : initialBlockDCMS.buyingTransferSection.requiredDocuments,
      warningSigns: Array.isArray(incBuy.warningSigns)
        ? incBuy.warningSigns.map((w: string) => cleanVerifyText(w))
        : initialBlockDCMS.buyingTransferSection.warningSigns
    },
    readingListingsSection: {
      heading: cleanVerifyText(incList.heading || initialBlockDCMS.readingListingsSection.heading),
      terms: (incList.terms || initialBlockDCMS.readingListingsSection.terms || []).map((t: any) => ({
        term: cleanVerifyText(t.term || ''),
        definition: cleanVerifyText(t.definition || '')
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
      sellingPrompt: cleanVerifyText(incClose.sellingPrompt || initialBlockDCMS.closingSiteVisitSection.sellingPrompt),
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
  let localData: BlockDCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('faisal_block_d_cms');
      if (local) localData = mergeBlockDCMS(JSON.parse(local));
    } catch {}
  }

  const remote = await fetchSettingByKey<BlockDCMSData>('faisal_block_d_cms');
  if (remote) {
    const merged = localData ? mergeBlockDCMS({ ...remote, ...localData }) : mergeBlockDCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_block_d_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialBlockDCMS;
}

export async function saveBlockDCMS(cmsData: BlockDCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

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
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// FAISAL HILLS PAYMENT PLAN CMS DATA STRUCTURE & FUNCTIONS
// -------------------------------------------------------------

export interface PaymentPlanCMSData {
  verificationHeader: {
    reviewerName: string;
    reviewerRole: string;
    scheduleVerifiedDate: string;
    pageLastUpdated: string;
    badgeText: string;
  };
  overview: {
    h1: string;
    leadParagraph: string;
    termsNote: string;
    quickFacts: {
      frequency: string;
      term: string;
      bookingAmount: string;
      lumpSumDiscount: string;
      registrationFee: string;
      scheduleDate: string;
    };
    ctaWhatsapp: string;
    ctaCall: string;
  };
  howItWorks: {
    heading: string;
    intro: string;
    steps: Array<{ stepNumber: number; title: string; description: string }>;
    payingInFullNote: string;
    downPaymentCoversTitle: string;
    downPaymentCoversDesc: string;
    afterBookingTitle: string;
    afterBookingDesc: string;
  };
  primeBlockSchedule: {
    heading: string;
    intro: string;
    rows: Array<{
      plotCutting: string;
      totalPrice: string;
      bookingAmount: string;
      quarterlyInstalments: string;
      lumpSumDiscounted: string;
    }>;
    reconciliationNote: string;
    marlaConventionNote: string;
    marla14Note: string;
    cost5MarlaExample: {
      heading: string;
      description: string;
      savingsNote: string;
    };
  };
  paymentPlansByBlock: {
    heading: string;
    intro: string;
    blockRows: Array<{
      blockName: string;
      blockSlug: string;
      terms: string;
      notes: string;
    }>;
    footerNote: string;
  };
  whyDifferentPlansOnline: {
    heading: string;
    intro: string;
    comparisonRows: Array<{
      structure: string;
      source: string;
      term: string;
    }>;
    adviceText: string;
  };
  additionalCosts: {
    heading: string;
    items: Array<{
      name: string;
      description: string;
    }>;
  };
  howToPay: {
    heading: string;
    guidelines: string[];
    overseasBuyersTitle: string;
    overseasBuyersDesc: string;
    resalePurchasesTitle: string;
    resalePurchasesDesc: string;
    missedInstalmentTitle: string;
    missedInstalmentDesc: string;
    commercialPlotTitle: string;
    commercialPlotDesc: string;
  };
  faqsSection: {
    heading: string;
    faqs: Array<{ q: string; a: string }>;
  };
  ctaAndAbout: {
    ctaHeading: string;
    ctaSubline: string;
    whatsappNumber: string;
    phoneNumber: string;
    officeLocation: string;
    aboutHeading: string;
    aboutText: string;
  };
}

export const initialPaymentPlanCMS: PaymentPlanCMSData = {
  verificationHeader: {
    reviewerName: 'Senior Property Verification Desk',
    reviewerRole: 'Faisal Hills Estate Advisory',
    scheduleVerifiedDate: 'September 2026',
    pageLastUpdated: '30 September 2026',
    badgeText: 'Verified Developer Schedule'
  },
  overview: {
    h1: 'Faisal Hills Payment Plan and Instalment Schedule',
    leadParagraph: 'Plots in Faisal Hills, the RDA-approved society on the Main GT Road (N-5) near Taxila, are sold either on instalments or in full. An instalment purchase means a registration fee, a booking amount paid as a down payment, then quarterly instalments until the balance clears. Paying in full attracts a discount.',
    termsNote: 'Terms are not the same across the society. Some blocks take instalments, others are full payment only, and the schedule has been revised more than once. If you have been quoted a plan, check it against the current schedule before paying anything.',
    quickFacts: {
      frequency: 'Quarterly, every three months',
      term: '2.5 years on 10 instalments',
      bookingAmount: 'Reported at 20 to 35% of plot cost, varying by block. On the schedule below it works out at 30 to 33%',
      lumpSumDiscount: 'Reported at 20%, with 21% on some block schedules',
      registrationFee: 'Reported at PKR 15,000 and PKR 20,000 by different sources',
      scheduleDate: 'September 2026'
    },
    ctaWhatsapp: '+92 333 1113177',
    ctaCall: '+92 333 1113177'
  },
  howItWorks: {
    heading: 'How the Payment Plan Works',
    intro: 'Buying on instalments here follows a fixed sequence:',
    steps: [
      {
        stepNumber: 1,
        title: 'Registration fee',
        description: 'Paid once at booking and normally non-refundable.'
      },
      {
        stepNumber: 2,
        title: 'Booking amount',
        description: 'The down payment that reserves the plot and is the largest single sum you pay.'
      },
      {
        stepNumber: 3,
        title: 'Quarterly instalments',
        description: 'Every three months until the balance clears.'
      },
      {
        stepNumber: 4,
        title: 'Possession charges',
        description: "Where the block's schedule includes them, payable at handover."
      },
      {
        stepNumber: 5,
        title: 'Position premiums',
        description: 'Where the plot is a corner, on a main road or park-facing.'
      }
    ],
    payingInFullNote: 'Paying in full instead removes the quarterly schedule and applies the lump-sum discount.',
    downPaymentCoversTitle: 'What the down payment covers',
    downPaymentCoversDesc: 'Published descriptions say it covers file processing, priority allocation, development charges and confirmation of the booking. That last point matters: if development charges sit inside the price, your total is lower than a comparable plot where they are billed separately. Confirm which applies.',
    afterBookingTitle: 'What you receive after booking',
    afterBookingDesc: 'Expect a receipt for the booking amount, then your file or allotment documentation with the plot or file number. One published account puts the file issue at three to four weeks after booking. Keep every receipt, and check that the name and plot details match your CNIC exactly.'
  },
  primeBlockSchedule: {
    heading: 'The Most Recent Schedule We Hold: Prime Block',
    intro: 'The figures below were published for Prime Block. The same figures have since appeared against Block D on at least one dealer site, which we believe is a copy-paste error rather than a genuine match, so do not assume they apply society-wide.',
    rows: [
      {
        plotCutting: '5.55 Marla (5 Marla, 25 × 50)',
        totalPrice: '5,990,000',
        bookingAmount: '1,990,000',
        quarterlyInstalments: '400,000',
        lumpSumDiscounted: '4,792,000'
      },
      {
        plotCutting: '8 Marla (30 × 60)',
        totalPrice: '8,470,000',
        bookingAmount: '2,570,000',
        quarterlyInstalments: '590,000',
        lumpSumDiscounted: '6,776,000'
      },
      {
        plotCutting: '10.89 Marla (10 Marla, 35 × 70)',
        totalPrice: '11,170,000',
        bookingAmount: '3,370,000',
        quarterlyInstalments: '780,000',
        lumpSumDiscounted: '8,936,000'
      },
      {
        plotCutting: '1 Kanal (50 × 90)',
        totalPrice: '19,290,000',
        bookingAmount: '5,790,000',
        quarterlyInstalments: '1,350,000',
        lumpSumDiscounted: '15,432,000'
      },
      {
        plotCutting: '2 Kanal',
        totalPrice: '37,360,000',
        bookingAmount: '11,210,000',
        quarterlyInstalments: '2,615,000',
        lumpSumDiscounted: '29,888,000'
      }
    ],
    reconciliationNote: 'Schedule as published for Prime Block. Every row reconciles: the booking amount plus ten instalments equals the total, and each lump-sum figure is exactly 80% of it. Prices are set by the developer and change without notice.',
    marlaConventionNote: 'Why the sizes read 5.55 and 10.89. Faisal Hills schedules measure a Marla at 225 sq ft, while most listings use 250. The same 25 × 50 ft plot is 5 Marla on one measure and 5.55 on the other, and a 35 × 70 ft plot is 10 or 10.89. Compare plots by dimensions and square feet; our Faisal Hills blocks hub explains the conventions in full.',
    marla14Note: '14 Marla is not on this schedule. Prime Block\'s published sizes run 5.55, 8 and 10.89 Marla, 1 Kanal and 2 Kanal. The 40 × 80 ft plot sold as 14 Marla (14.22 on the developer\'s measure) exists in Blocks A, B and D, but no instalment schedule has been published for it that we can verify. If you want a 14 Marla plot on instalments, ask the sales office for a current schedule rather than working from a figure found online.',
    cost5MarlaExample: {
      heading: 'What a 5 Marla plot actually costs',
      description: 'Booking a 5.55 Marla plot (25 × 50 ft, sold as 5 Marla) on the Prime Block schedule means PKR 1,990,000 at booking, about 33% of the price, plus the registration fee. Then ten quarterly payments of PKR 400,000, reaching PKR 5,990,000 over two and a half years.',
      savingsNote: 'Paying in full instead costs PKR 4,792,000, a saving of PKR 1,198,000 against the instalment total. A corner or main-road plot carries a premium on top.'
    }
  },
  paymentPlansByBlock: {
    heading: 'Payment Plans by Block',
    intro: 'Terms differ by block, and this is where most confusion starts. Instalment availability also changes as blocks sell out, so treat this as a guide and confirm the terms for the block you want.',
    blockRows: [
      {
        blockName: 'Executive Block',
        blockSlug: 'executive-block',
        terms: 'Full payment',
        notes: 'Some sources describe a 16-instalment plan with a possession fee; the developer-linked site says cash only'
      },
      {
        blockName: 'Block A',
        blockSlug: 'block-a',
        terms: 'Full payment',
        notes: 'Developer inventory reported exhausted, so purchases are resale'
      },
      {
        blockName: 'Prime Block',
        blockSlug: 'prime-block',
        terms: 'Instalments',
        notes: 'The main block with an active developer plan'
      },
      {
        blockName: 'Block B',
        blockSlug: 'block-b',
        terms: 'Residential full payment; commercial on instalments',
        notes: 'Commercial plots offer structured installment terms'
      },
      {
        blockName: 'Block B Extension',
        blockSlug: 'block-b1-extension',
        terms: 'Resale / Full payment',
        notes: 'Primarily resale market transactions'
      },
      {
        blockName: 'Block C',
        blockSlug: 'block-c',
        terms: 'Full payment, no possession charges',
        notes: 'Stated plainly on the developer-linked prices guide'
      },
      {
        blockName: 'Block D',
        blockSlug: 'block-d',
        terms: 'Instalments reported',
        notes: 'Five different schedules have been published for this block'
      }
    ],
    footerNote: 'If a block is full payment only, the plan on this page does not apply to it. For market rates by block, including resale, see our Faisal Hills plot prices: plot prices and payment plans are different things, and mixing them is how buyers end up comparing the wrong numbers.'
  },
  whyDifferentPlansOnline: {
    heading: 'Why You Will See Different Payment Plans Online',
    intro: 'Search for this society\'s payment plan and you will find schedules that contradict each other. They are not all wrong; most are simply old, and almost none carry a date.',
    comparisonRows: [
      {
        structure: '10 quarterly instalments, 20% discount',
        source: 'Current dealer and network pages, 2026',
        term: '2.5 years'
      },
      {
        structure: '14 quarterly instalments, 20% discount',
        source: 'Society pages and the Prime Block launch, 2025 to 2026',
        term: '3.5 years'
      },
      {
        structure: '16 quarterly instalments plus a possession fee, 21% discount',
        source: 'Block-wise plans for Executive, A, C and D',
        term: '4 years'
      },
      {
        structure: '15 quarterly instalments plus a possession charge',
        source: 'A Block D dealer page, 2025',
        term: 'Not stated'
      },
      {
        structure: 'Four-year quarterly instalments, up to 15% down',
        source: 'An agency project page, Prime Block',
        term: '4 years'
      },
      {
        structure: 'Full cash only',
        source: 'Developer-linked prices guide, 2026',
        term: 'Not applicable'
      }
    ],
    adviceText: 'What to do with that. Only the schedule the developer has issued for the current month applies to a new booking. If a figure looks unusually low, check which plan it came from and when it was published. Ask for the schedule on paper, with a date on it.'
  },
  additionalCosts: {
    heading: 'What You Pay Besides the Plot Price',
    items: [
      {
        name: 'Registration fee',
        description: 'One-off at booking, reported at PKR 15,000 and PKR 20,000 by different sources.'
      },
      {
        name: 'Possession charges',
        description: 'Included in some block schedules and absent from others. Block C is described as having none.'
      },
      {
        name: 'Position premiums',
        description: "The developer group's published terms for a sister project set these at 15% for corner plots, 10% for main road and 5% for a short corner or green-facing plot. Confirm whether the same applies here."
      },
      {
        name: 'Taxes',
        description: 'One block schedule lists GST as a component.'
      },
      {
        name: 'Transfer fee',
        description: 'Payable when a plot changes hands, which applies to resale rather than new bookings.'
      },
      {
        name: 'Development charges',
        description: 'Which may already sit inside the price. Check rather than assume.'
      }
    ]
  },
  howToPay: {
    heading: 'How to Pay',
    guidelines: [
      "Pay by pay order or demand draft made out to the developer's registered company name.",
      "Cheques are not accepted under the group's published terms for a sister project; confirm the position here.",
      "Keep the receipt for every payment, and expect a booking acknowledgement followed by your allotment documentation.",
      "Never pay cash to an individual, and never pay into a personal account."
    ],
    overseasBuyersTitle: 'Overseas buyers',
    overseasBuyersDesc: "Overseas Pakistanis can book using a NICOP or passport, with payment through official banking channels. Published developer schedules have included bank account details for both overseas and domestic transfers. Take the current account details from the sales office or the developer's own downloads section (faisaltowngroup.com/downloads), not from any copy circulating online.",
    resalePurchasesTitle: 'Resale Purchases',
    resalePurchasesDesc: "If you buy from an existing owner rather than the developer, the payment plan on this page does not apply. A resale is normally settled in full at transfer, and any remaining instalments on a file are a matter between you and the seller. What governs a resale instead is the transfer process: ownership verification, the No Demand Certificate confirming no dues remain, and the transfer recorded at the society office. Our plot verification guide sets out the sequence.",
    missedInstalmentTitle: 'If You Miss an Instalment',
    missedInstalmentDesc: "Instalment schedules usually carry a surcharge for late payment, and repeated default can lead to cancellation with deductions. The published Faisal Hills schedules we have seen do not state the policy, so confirm it in writing before you commit. Ask specifically: what is the grace period, what is the surcharge, and at what point is a booking cancelled.",
    commercialPlotTitle: 'Commercial Plot Payment Terms',
    commercialPlotDesc: "Commercial plots are priced and scheduled separately from residential plots. One source describes residential plots as full payment while commercial plots are offered on instalments with a down payment, quarterly instalments and a possession amount. Commercial sizes vary by block, from around 30 × 25 ft up to much larger plots in the Executive Block. Ask us for the commercial schedule for the specific block and size you are considering."
  },
  faqsSection: {
    heading: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'What is the current Faisal Hills payment plan?',
        a: 'A registration fee, a booking amount, then quarterly instalments, with a discount for paying in full. The most recent schedule we hold runs to ten quarterly instalments over two and a half years. Terms differ by block.'
      },
      {
        q: 'How many instalments are there?',
        a: 'Ten quarterly instalments on the current schedule. Older plans in circulation used 14, 15 or 16, which is why you will see different figures online.'
      },
      {
        q: 'How much is the booking amount?',
        a: 'Reported at 20 to 35% of the plot cost depending on block and payment mode. On the schedule above, a 5 Marla plot (5.55 Marla, 25 × 50 ft) requires PKR 1,990,000, about 33%.'
      },
      {
        q: 'Is there a monthly instalment option?',
        a: 'Instalments here are quarterly, every three months, rather than monthly.'
      },
      {
        q: 'Is there a 10 Marla payment plan?',
        a: 'Yes. The 35 × 70 ft plot, listed as 10 Marla or 10.89 Marla, appears on the schedule above at PKR 11,170,000 with a booking amount of PKR 3,370,000 and ten instalments of PKR 780,000.'
      },
      {
        q: 'Is there a 14 Marla payment plan?',
        a: 'Not on the schedule we hold. 14 Marla plots (40 × 80 ft, 14.22 on the developer\'s measure) exist in Blocks A, B and D, but no verifiable instalment schedule has been published for that size. Ask the sales office for current terms.'
      },
      {
        q: 'What is the registration fee?',
        a: 'A one-off fee at booking, reported at PKR 15,000 and PKR 20,000 by different sources, so confirm the amount before paying.'
      },
      {
        q: 'Is there a discount for paying in full?',
        a: 'Yes, reported at 20% on the current schedule and 21% on some block plans. On a 5 Marla plot that is a saving of roughly PKR 1,198,000 against the instalment total.'
      },
      {
        q: 'Which blocks offer instalments?',
        a: 'Prime Block is the main block with an active developer plan, and instalments have been reported in Block D. The Executive Block, Block A and Block C are described as full payment.'
      },
      {
        q: 'How do I pay, and to whom?',
        a: 'By pay order or demand draft in the developer\'s registered company name, with a receipt for every payment. Never pay cash to an individual or into a personal account.'
      },
      {
        q: 'What happens if I miss an instalment?',
        a: 'Published schedules do not state the policy. Ask for the grace period, the surcharge and the cancellation terms in writing before booking.'
      }
    ]
  },
  ctaAndAbout: {
    ctaHeading: 'Get the Current Schedule',
    ctaSubline: 'Tell us the block and plot size you are considering and we will send the schedule the developer has issued this month, in writing, along with what is available and the fees that apply on top.',
    whatsappNumber: '+92 333 1113177',
    phoneNumber: '+92 333 1113177',
    officeLocation: 'Faisal Hills Main Gate Boulevard, GT Road Taxila / Rawalpindi',
    aboutHeading: 'About this page',
    aboutText: 'Reviewed by Senior Property Verification Desk of Faisal Hills Estate Advisory. Figures are drawn from published developer and dealer schedules and dated where possible; we do not publish a figure we cannot source. The scheme\'s approval can be checked with the Rawalpindi Development Authority (rda.gop.pk), and our RDA approval details explains what the NOC covers. Prices and terms are set by the developer and change without notice. If you find anything out of date, tell us and we will correct it.'
  }
};

export function mergePaymentPlanCMS(incoming: any): PaymentPlanCMSData {
  if (!incoming || typeof incoming !== 'object') return initialPaymentPlanCMS;
  const incVer = incoming.verificationHeader || {};
  const incOver = incoming.overview || {};
  const incHow = incoming.howItWorks || {};
  const incPrime = incoming.primeBlockSchedule || {};
  const incBlockPlans = incoming.paymentPlansByBlock || {};
  const incWhyDiff = incoming.whyDifferentPlansOnline || {};
  const incCosts = incoming.additionalCosts || {};
  const incPay = incoming.howToPay || {};
  const incFaqs = incoming.faqsSection || {};
  const incCta = incoming.ctaAndAbout || {};

  return {
    verificationHeader: {
      reviewerName: cleanVerifyText(incVer.reviewerName || initialPaymentPlanCMS.verificationHeader.reviewerName),
      reviewerRole: cleanVerifyText(incVer.reviewerRole || initialPaymentPlanCMS.verificationHeader.reviewerRole),
      scheduleVerifiedDate: cleanVerifyText(incVer.scheduleVerifiedDate || initialPaymentPlanCMS.verificationHeader.scheduleVerifiedDate),
      pageLastUpdated: cleanVerifyText(incVer.pageLastUpdated || initialPaymentPlanCMS.verificationHeader.pageLastUpdated),
      badgeText: cleanVerifyText(incVer.badgeText || initialPaymentPlanCMS.verificationHeader.badgeText)
    },
    overview: {
      h1: cleanVerifyText(incOver.h1 || initialPaymentPlanCMS.overview.h1),
      leadParagraph: cleanVerifyText(incOver.leadParagraph || initialPaymentPlanCMS.overview.leadParagraph),
      termsNote: cleanVerifyText(incOver.termsNote || initialPaymentPlanCMS.overview.termsNote),
      quickFacts: {
        frequency: cleanVerifyText(incOver.quickFacts?.frequency || initialPaymentPlanCMS.overview.quickFacts.frequency),
        term: cleanVerifyText(incOver.quickFacts?.term || initialPaymentPlanCMS.overview.quickFacts.term),
        bookingAmount: cleanVerifyText(incOver.quickFacts?.bookingAmount || initialPaymentPlanCMS.overview.quickFacts.bookingAmount),
        lumpSumDiscount: cleanVerifyText(incOver.quickFacts?.lumpSumDiscount || initialPaymentPlanCMS.overview.quickFacts.lumpSumDiscount),
        registrationFee: cleanVerifyText(incOver.quickFacts?.registrationFee || initialPaymentPlanCMS.overview.quickFacts.registrationFee),
        scheduleDate: cleanVerifyText(incOver.quickFacts?.scheduleDate || initialPaymentPlanCMS.overview.quickFacts.scheduleDate)
      },
      ctaWhatsapp: cleanVerifyText(incOver.ctaWhatsapp || initialPaymentPlanCMS.overview.ctaWhatsapp),
      ctaCall: cleanVerifyText(incOver.ctaCall || initialPaymentPlanCMS.overview.ctaCall)
    },
    howItWorks: {
      heading: cleanVerifyText(incHow.heading || initialPaymentPlanCMS.howItWorks.heading),
      intro: cleanVerifyText(incHow.intro || initialPaymentPlanCMS.howItWorks.intro),
      steps: Array.isArray(incHow.steps) && incHow.steps.length > 0
        ? incHow.steps.map((s: any, idx: number) => ({
            stepNumber: s.stepNumber || idx + 1,
            title: cleanVerifyText(s.title || ''),
            description: cleanVerifyText(s.description || '')
          }))
        : initialPaymentPlanCMS.howItWorks.steps,
      payingInFullNote: cleanVerifyText(incHow.payingInFullNote || initialPaymentPlanCMS.howItWorks.payingInFullNote),
      downPaymentCoversTitle: cleanVerifyText(incHow.downPaymentCoversTitle || initialPaymentPlanCMS.howItWorks.downPaymentCoversTitle),
      downPaymentCoversDesc: cleanVerifyText(incHow.downPaymentCoversDesc || initialPaymentPlanCMS.howItWorks.downPaymentCoversDesc),
      afterBookingTitle: cleanVerifyText(incHow.afterBookingTitle || initialPaymentPlanCMS.howItWorks.afterBookingTitle),
      afterBookingDesc: cleanVerifyText(incHow.afterBookingDesc || initialPaymentPlanCMS.howItWorks.afterBookingDesc)
    },
    primeBlockSchedule: {
      heading: cleanVerifyText(incPrime.heading || initialPaymentPlanCMS.primeBlockSchedule.heading),
      intro: cleanVerifyText(incPrime.intro || initialPaymentPlanCMS.primeBlockSchedule.intro),
      rows: Array.isArray(incPrime.rows) && incPrime.rows.length > 0
        ? incPrime.rows.map((r: any) => ({
            plotCutting: cleanVerifyText(r.plotCutting || ''),
            totalPrice: cleanVerifyText(r.totalPrice || ''),
            bookingAmount: cleanVerifyText(r.bookingAmount || ''),
            quarterlyInstalments: cleanVerifyText(r.quarterlyInstalments || ''),
            lumpSumDiscounted: cleanVerifyText(r.lumpSumDiscounted || '')
          }))
        : initialPaymentPlanCMS.primeBlockSchedule.rows,
      reconciliationNote: cleanVerifyText(incPrime.reconciliationNote || initialPaymentPlanCMS.primeBlockSchedule.reconciliationNote),
      marlaConventionNote: cleanVerifyText(incPrime.marlaConventionNote || initialPaymentPlanCMS.primeBlockSchedule.marlaConventionNote),
      marla14Note: cleanVerifyText(incPrime.marla14Note || initialPaymentPlanCMS.primeBlockSchedule.marla14Note),
      cost5MarlaExample: {
        heading: cleanVerifyText(incPrime.cost5MarlaExample?.heading || initialPaymentPlanCMS.primeBlockSchedule.cost5MarlaExample.heading),
        description: cleanVerifyText(incPrime.cost5MarlaExample?.description || initialPaymentPlanCMS.primeBlockSchedule.cost5MarlaExample.description),
        savingsNote: cleanVerifyText(incPrime.cost5MarlaExample?.savingsNote || initialPaymentPlanCMS.primeBlockSchedule.cost5MarlaExample.savingsNote)
      }
    },
    paymentPlansByBlock: {
      heading: cleanVerifyText(incBlockPlans.heading || initialPaymentPlanCMS.paymentPlansByBlock.heading),
      intro: cleanVerifyText(incBlockPlans.intro || initialPaymentPlanCMS.paymentPlansByBlock.intro),
      blockRows: Array.isArray(incBlockPlans.blockRows) && incBlockPlans.blockRows.length > 0
        ? incBlockPlans.blockRows.map((b: any) => ({
            blockName: cleanVerifyText(b.blockName || ''),
            blockSlug: cleanVerifyText(b.blockSlug || ''),
            terms: cleanVerifyText(b.terms || ''),
            notes: cleanVerifyText(b.notes || '')
          }))
        : initialPaymentPlanCMS.paymentPlansByBlock.blockRows,
      footerNote: cleanVerifyText(incBlockPlans.footerNote || initialPaymentPlanCMS.paymentPlansByBlock.footerNote)
    },
    whyDifferentPlansOnline: {
      heading: cleanVerifyText(incWhyDiff.heading || initialPaymentPlanCMS.whyDifferentPlansOnline.heading),
      intro: cleanVerifyText(incWhyDiff.intro || initialPaymentPlanCMS.whyDifferentPlansOnline.intro),
      comparisonRows: Array.isArray(incWhyDiff.comparisonRows) && incWhyDiff.comparisonRows.length > 0
        ? incWhyDiff.comparisonRows.map((c: any) => ({
            structure: cleanVerifyText(c.structure || ''),
            source: cleanVerifyText(c.source || ''),
            term: cleanVerifyText(c.term || '')
          }))
        : initialPaymentPlanCMS.whyDifferentPlansOnline.comparisonRows,
      adviceText: cleanVerifyText(incWhyDiff.adviceText || initialPaymentPlanCMS.whyDifferentPlansOnline.adviceText)
    },
    additionalCosts: {
      heading: cleanVerifyText(incCosts.heading || initialPaymentPlanCMS.additionalCosts.heading),
      items: Array.isArray(incCosts.items) && incCosts.items.length > 0
        ? incCosts.items.map((it: any) => ({
            name: cleanVerifyText(it.name || ''),
            description: cleanVerifyText(it.description || '')
          }))
        : initialPaymentPlanCMS.additionalCosts.items,
    },
    howToPay: {
      heading: cleanVerifyText(incPay.heading || initialPaymentPlanCMS.howToPay.heading),
      guidelines: Array.isArray(incPay.guidelines) && incPay.guidelines.length > 0
        ? incPay.guidelines.map((g: string) => cleanVerifyText(g))
        : initialPaymentPlanCMS.howToPay.guidelines,
      overseasBuyersTitle: cleanVerifyText(incPay.overseasBuyersTitle || initialPaymentPlanCMS.howToPay.overseasBuyersTitle),
      overseasBuyersDesc: cleanVerifyText(incPay.overseasBuyersDesc || initialPaymentPlanCMS.howToPay.overseasBuyersDesc),
      resalePurchasesTitle: cleanVerifyText(incPay.resalePurchasesTitle || initialPaymentPlanCMS.howToPay.resalePurchasesTitle),
      resalePurchasesDesc: cleanVerifyText(incPay.resalePurchasesDesc || initialPaymentPlanCMS.howToPay.resalePurchasesDesc),
      missedInstalmentTitle: cleanVerifyText(incPay.missedInstalmentTitle || initialPaymentPlanCMS.howToPay.missedInstalmentTitle),
      missedInstalmentDesc: cleanVerifyText(incPay.missedInstalmentDesc || initialPaymentPlanCMS.howToPay.missedInstalmentDesc),
      commercialPlotTitle: cleanVerifyText(incPay.commercialPlotTitle || initialPaymentPlanCMS.howToPay.commercialPlotTitle),
      commercialPlotDesc: cleanVerifyText(incPay.commercialPlotDesc || initialPaymentPlanCMS.howToPay.commercialPlotDesc)
    },
    faqsSection: {
      heading: cleanVerifyText(incFaqs.heading || initialPaymentPlanCMS.faqsSection.heading),
      faqs: Array.isArray(incFaqs.faqs) && incFaqs.faqs.length > 0
        ? incFaqs.faqs.map((f: any) => ({
            q: cleanVerifyText(f.q || f.question || ''),
            a: cleanVerifyText(f.a || f.answer || '')
          }))
        : initialPaymentPlanCMS.faqsSection.faqs
    },
    ctaAndAbout: {
      ctaHeading: cleanVerifyText(incCta.ctaHeading || initialPaymentPlanCMS.ctaAndAbout.ctaHeading),
      ctaSubline: cleanVerifyText(incCta.ctaSubline || initialPaymentPlanCMS.ctaAndAbout.ctaSubline),
      whatsappNumber: cleanVerifyText(incCta.whatsappNumber || initialPaymentPlanCMS.ctaAndAbout.whatsappNumber),
      phoneNumber: cleanVerifyText(incCta.phoneNumber || initialPaymentPlanCMS.ctaAndAbout.phoneNumber),
      officeLocation: cleanVerifyText(incCta.officeLocation || initialPaymentPlanCMS.ctaAndAbout.officeLocation),
      aboutHeading: cleanVerifyText(incCta.aboutHeading || initialPaymentPlanCMS.ctaAndAbout.aboutHeading),
      aboutText: cleanVerifyText(incCta.aboutText || initialPaymentPlanCMS.ctaAndAbout.aboutText)
    }
  };
}

export async function fetchPaymentPlanCMS(): Promise<PaymentPlanCMSData> {
  const remote = await fetchSettingByKey<PaymentPlanCMSData>('faisal_payment_plan_cms');
  if (remote) return mergePaymentPlanCMS(remote);

  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('faisal_payment_plan_cms');
      if (local) return mergePaymentPlanCMS(JSON.parse(local));
    } catch {}
  }
  return initialPaymentPlanCMS;
}

export async function savePaymentPlanCMS(cmsData: PaymentPlanCMSData, token?: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_payment_plan_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_payment_plan_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }
  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_payment_plan_cms`, {
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
// FAISAL HILLS EXECUTIVE BLOCK DEDICATED CMS SYSTEM
// =========================================================

export interface ExecutiveBlockPlotItem {
  id: string;
  plotNumber: string;
  blockName: string;
  category: string;
  size: string;
  dimensions: string;
  facing: string;
  priceFormatted: string;
  downPayment: string;
  status: string;
  badge: string;
  image: string;
  features: string[];
}

export interface ExecutiveBlockAmenityItem {
  id: string;
  tag: string;
  title: string;
  image: string;
  iconType: string;
}

export interface ExecutiveBlockWhyInvestItem {
  title: string;
  desc: string;
}

export interface ExecutiveBlockTransferStep {
  point: string;
  tag: string;
  title: string;
  points: string[];
  badge: string;
}

export interface ExecutiveBlockFaqItem {
  q: string;
  a: string;
}

export interface ExecutiveBlockCMSData {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bgImage: string;
    badge1: string;
    badge2: string;
    badge3: string;
  };
  overview: {
    h1: string;
    leadParagraph: string;
    expandedParagraph: string;
    photoUrl: string;
    photoAlt: string;
    photoTag: string;
    photoCaption: string;
  };
  location: {
    h2: string;
    leadParagraph: string;
    expandedParagraph1: string;
    expandedParagraph2: string;
    googleMapEmbedUrl: string;
  };
  masterPlan: {
    h2: string;
    leadParagraph: string;
    mapImageUrl: string;
    mapPdfUrl: string;
    downloadButtonText: string;
    exploreSocietyMapUrl: string;
    exploreSocietyMapText: string;
  };
  plotsForSale: {
    h2: string;
    leadParagraph: string;
    plots: ExecutiveBlockPlotItem[];
  };
  resaleDesk: {
    tag: string;
    heading: string;
    paragraph: string;
    buttonText: string;
    whatsappMessage: string;
  };
  facilities: {
    h2: string;
    leadParagraph: string;
    items: ExecutiveBlockAmenityItem[];
  };
  whyInvest: {
    h2: string;
    leadParagraph: string;
    reasons: ExecutiveBlockWhyInvestItem[];
  };
  developmentStatus: {
    h2: string;
    leadParagraph: string;
    expandedParagraph1: string;
    expandedParagraph2: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    dronePhotoUrl: string;
    dronePhotoAlt: string;
    possessionBadge: string;
    droneTag: string;
    droneHeading: string;
    droneDesc: string;
  };
  transferProcess: {
    h2: string;
    leadParagraph: string;
    steps: ExecutiveBlockTransferStep[];
    bannerHeading: string;
    bannerSubtext: string;
    bannerButtonText: string;
    bannerWhatsapp: string;
  };
  faqs: {
    sectionTag: string;
    h2: string;
    items: ExecutiveBlockFaqItem[];
  };
  scheduleTour: {
    tag: string;
    h3: string;
    leadParagraph: string;
    thankYouHeading: string;
    thankYouMessage: string;
    buttonText: string;
  };
}

export const initialExecutiveBlockCMS: ExecutiveBlockCMSData = {
  hero: {
    eyebrow: "PRESTIGIOUS GATEWAY SECTOR WITH FAISAL JEWEL & GRAND BOULEVARDS",
    title: "Executive Block",
    subtitle: "Faisal Hills Executive Block is the society's premier gateway sector located directly at the Main N-5 GT Road entrance. Featuring 225ft grand boulevards, Roots International School, Civic Center, and the iconic 27-storey Faisal Jewel high-rise.",
    bgImage: "/images/faisal-hills-drone-view.webp",
    badge1: "Immediate Possession",
    badge2: "Roots School Operational",
    badge3: "Faisal Jewel 27-Storey"
  },
  overview: {
    h1: "Faisal Hills Executive Block Overview",
    leadParagraph: "Faisal Hills Executive Block is the prestigious flagship sector developed by Faisal Town Group & Zedem International. Positioned right at the society’s grand entrance on Main GT Road (N-5), Executive Block serves as the primary civic and commercial epicenter of the entire project.",
    expandedParagraph: "Home to the iconic 27-storey [Faisal Jewel Tower](/blocks/faisal-jewel-islamabad), Faisal Mansion, and the fully operational Roots International School Campus, Executive Block seamlessly combines luxury residential living with high-density commercial investment opportunities.",
    photoUrl: "/images/faisal-hills-arc-gate.webp",
    photoAlt: "Faisal Hills Executive Block Monument Entrance Arc Gate",
    photoTag: "Grand Monument Gateway",
    photoCaption: "Main GT Road N-5 Entrance"
  },
  location: {
    h2: "Faisal Hills Executive Block Location & Map",
    leadParagraph: "Executive Block enjoys an unmatched strategic advantage by fronting directly on the National Highway (GT Road N-5). It is situated directly adjacent to Taxila, Multi Gardens B-17, and Islamabad Zone 2.",
    expandedParagraph1: "With immediate access to both Islamabad and Rawalpindi via the N-5 corridor and the upcoming direct M-1 Motorway link, Executive Block ensures effortless daily commuting for residents, business professionals, and overseas investors.",
    expandedParagraph2: "Surrounded by the scenic Margalla Hills backdrop, the sector delivers both urban commercial vibrancy and tranquil residential ambiance.",
    googleMapEmbedUrl: "https://maps.google.com/maps?q=Faisal+Hills+Executive+Block+GT+Road+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed"
  },
  masterPlan: {
    h2: "Faisal Hills Executive Block Master Plan",
    leadParagraph: "The master plan of Executive Block is engineered as an integrated self-sustaining community where commercial zones, schools, and parks sit harmoniously beside luxury residential streets.",
    mapImageUrl: "/images/faisal-hills-executive-map.webp",
    mapPdfUrl: "/images/faisal-hills-executive-map.webp",
    downloadButtonText: "Download Master Plan",
    exploreSocietyMapUrl: "/master-plan",
    exploreSocietyMapText: "Explore Society Map"
  },
  plotsForSale: {
    h2: "Executive Block Plots for Sale — Direct Booking & Verified Files",
    leadParagraph: "Explore available residential plots and commercial plazas in Executive Block with transparent pricing, zero dealer markup, and immediate allotment file verification.",
    plots: [
      {
        id: "exec-plot-5m-1",
        plotNumber: "EX-104",
        blockName: "Executive Block",
        category: "Residential",
        size: "5 Marla",
        dimensions: "25 × 50",
        facing: "Park Facing",
        priceFormatted: "PKR 75.0 Lac",
        downPayment: "PKR 15.0 Lac",
        status: "Available",
        badge: "Near Roots School",
        image: "/images/faisal-hills-executive-sector.webp",
        features: ["Walking Distance to Roots School", "100% Level Ready to Build", "Possession Ready"]
      },
      {
        id: "exec-plot-8m-1",
        plotNumber: "EX-215",
        blockName: "Executive Block",
        category: "Residential",
        size: "8 Marla",
        dimensions: "30 × 60",
        facing: "Main Boulevard 225ft",
        priceFormatted: "PKR 1.10 Crore",
        downPayment: "PKR 22.0 Lac",
        status: "Hot Deal",
        badge: "Boulevard Front",
        image: "/images/faisal-hills-arc-gate.webp",
        features: ["Wide 225ft Boulevard Front", "Prime Commercial Walkability", "Immediate Allotment"]
      },
      {
        id: "exec-plot-10m-1",
        plotNumber: "EX-320",
        blockName: "Executive Block",
        category: "Residential",
        size: "10 Marla",
        dimensions: "35 × 70",
        facing: "Corner + Green Belt",
        priceFormatted: "PKR 1.35 Crore",
        downPayment: "PKR 27.0 Lac",
        status: "Ready to Build",
        badge: "Corner Plot",
        image: "/images/faisal-hills-glow-park.webp",
        features: ["Double Corner Extra Land", "Lush Park View", "Active Street Construction"]
      },
      {
        id: "exec-plot-1k-1",
        plotNumber: "EX-450",
        blockName: "Executive Block",
        category: "Residential",
        size: "1 Kanal",
        dimensions: "50 × 90",
        facing: "Margalla Hill View",
        priceFormatted: "PKR 2.10 Crore",
        downPayment: "PKR 42.0 Lac",
        status: "Signature Plot",
        badge: "VIP Enclave",
        image: "/images/faisal-jewel-building.webp",
        features: ["Top-Tier Margalla Panorama", "Private Cul-de-Sac Street", "Gated VIP Security"]
      },
      {
        id: "exec-plot-com-1",
        plotNumber: "EX-COM-05",
        blockName: "Executive Block",
        category: "Commercial",
        size: "4 Marla Plaza",
        dimensions: "30 × 30",
        facing: "Civic Hub Boulevard",
        priceFormatted: "PKR 2.80 Crore",
        downPayment: "PKR 56.0 Lac",
        status: "High ROI",
        badge: "Commercial Core",
        image: "/images/faisal-jewel-building.webp",
        features: ["Ground + 5 Approved Height", "Direct GT Road Entrance", "High Footfall Core"]
      },
      {
        id: "exec-plot-com-2",
        plotNumber: "EX-COM-12",
        blockName: "Executive Block",
        category: "Commercial",
        size: "5.33 Marla Plaza",
        dimensions: "40 × 30",
        facing: "Main Boulevard Axis",
        priceFormatted: "PKR 3.65 Crore",
        downPayment: "PKR 73.0 Lac",
        status: "Prime Frontage",
        badge: "Faisal Jewel Axis",
        image: "/images/faisal-hills-drone-view.webp",
        features: ["Facing Faisal Jewel Tower", "Dedicated Customer Parking", "Ideal for Brand / Bank"]
      },
      {
        id: "exec-plot-com-3",
        plotNumber: "EX-COM-18",
        blockName: "Executive Block",
        category: "Commercial",
        size: "6 Marla Corner",
        dimensions: "35 × 40",
        facing: "Double Boulevard Corner",
        priceFormatted: "PKR 4.20 Crore",
        downPayment: "PKR 84.0 Lac",
        status: "Corner Hub",
        badge: "Double Corner",
        image: "/images/faisal-hills-site-header.webp",
        features: ["Double Main Boulevard Frontage", "High Rental Yield", "Approved Commercial Design"]
      },
      {
        id: "exec-plot-com-4",
        plotNumber: "EX-COM-28",
        blockName: "Executive Block",
        category: "Commercial",
        size: "8 Marla Corporate",
        dimensions: "40 × 45",
        facing: "Entrance Junction",
        priceFormatted: "PKR 5.50 Crore",
        downPayment: "PKR 1.10 Crore",
        status: "Corporate File",
        badge: "Flagship Site",
        image: "/images/faisal-hills-executive-sector.webp",
        features: ["Multi-Storey Corporate Approval", "Maximum GT Road Visibility", "Direct Site Office Access"]
      }
    ]
  },
  resaleDesk: {
    tag: "Owner Resale & Liquidation Desk",
    heading: "Want to Sell or Assess Your Executive Block Plot / File?",
    paragraph: "Get an instant official market valuation and list your file for thousands of active verified buyers across Islamabad, Rawalpindi, and overseas.",
    buttonText: "List Your Plot File",
    whatsappMessage: "Hello! I want to list or sell my plot in Faisal Hills Executive Block."
  },
  facilities: {
    h2: "Facilities and Amenities in Executive Block",
    leadParagraph: "Executive Block is planned with world-class facilities and modern municipal infrastructure:",
    items: [
      {
        id: "civic-hub",
        tag: "Sector Core",
        title: "Civic Hub & Monument Gateway",
        image: "/images/faisal-hills-arc-gate.webp",
        iconType: "Building2"
      },
      {
        id: "roots-school",
        tag: "Operational",
        title: "Roots International School Campus",
        image: "/images/roots-international-school-faisal-hills.webp",
        iconType: "GraduationCap"
      },
      {
        id: "faisal-jewel",
        tag: "27-Storey Icon",
        title: "Faisal Jewel Tower",
        image: "/images/faisal-jewel-building.webp",
        iconType: "Landmark"
      },
      {
        id: "mosques",
        tag: "Spiritual Center",
        title: "Jamia Masjid Fatima Tuz Zahra",
        image: "/images/faisal-hills-jamia-mosque.webp",
        iconType: "Building"
      },
      {
        id: "community-parks",
        tag: "Lush Greenery",
        title: "Executive Parks & Jogging Tracks",
        image: "/images/faisal-hills-glow-park.webp",
        iconType: "Trees"
      },
      {
        id: "sports-arena",
        tag: "Active Sports",
        title: "Sports Arena & Cricket Ground",
        image: "/images/faisal-hills-sports-arena.webp",
        iconType: "Activity"
      },
      {
        id: "fuel-station",
        tag: "24/7 Utility",
        title: "Boulevard Fuel Station",
        image: "/images/hills-walk-commercial-aerial.webp",
        iconType: "Fuel"
      },
      {
        id: "gated-security",
        tag: "VIP Enclave",
        title: "Gated 24/7 Security & CCTV",
        image: "/images/faisal-hills-executive-sector.webp",
        iconType: "ShieldCheck"
      }
    ]
  },
  whyInvest: {
    h2: "Why Invest in Faisal Hills Executive Block",
    leadParagraph: "Why buyers and overseas Pakistanis rank Executive Block as the flagship sector:",
    reasons: [
      { title: "Strategic GT Road Access", desc: "Direct N-5 frontage with rapid proximity to Rawalpindi, Taxila, and Wah." },
      { title: "RDA Approved Society", desc: "Sanctioned legal status providing full buyer protection and clear titles." },
      { title: "Civic & Commercial Anchor", desc: "Commercial hub supporting both residential value and commercial rental yields." },
      { title: "Visible Active Development", desc: "Active on-ground construction rather than mere renderings and speculative promises." },
      { title: "Family-Friendly Living", desc: "Roots School, Jamia mosques, and community parks already fully functioning." },
      { title: "Long Term Capital Growth", desc: "High appreciation velocity as Faisal Jewel and surrounding plazas near full completion." }
    ]
  },
  developmentStatus: {
    h2: "Executive Block Development Status",
    leadParagraph: "Development in Executive Block is 100% operational with possession fully delivered. Roads, underground electricity, sewer lines, water supply, and street lighting are fully functional.",
    expandedParagraph1: "Roots International School is actively educating students on-site. The structural framework of the 27-storey Faisal Jewel Tower is at an advanced completion stage.",
    expandedParagraph2: "Families are actively residing in constructed luxury houses, while high-profile commercial plazas along the main boulevard are operating brand retail outlets.",
    stat1Value: "95%+",
    stat1Label: "Roads Carpeted",
    stat2Value: "100%",
    stat2Label: "Underground Grid",
    stat3Value: "Possession",
    stat3Label: "Ready to Build",
    dronePhotoUrl: "/images/faisal-hills-drone-view.webp",
    dronePhotoAlt: "Faisal Hills Executive Block On-Ground Development Status & Aerial View",
    possessionBadge: "Possession Delivered",
    droneTag: "Verified Aerial Drone Survey",
    droneHeading: "Executive Sector On-Ground Progress",
    droneDesc: "Wide carpeted boulevards, complete utilities, and active on-ground villa construction."
  },
  transferProcess: {
    h2: "Faisal Hills Executive Block Transfer Process",
    leadParagraph: "Follow these 4 essential points to complete official plot transfer directly at Zedem International:",
    steps: [
      {
        point: '01',
        tag: 'Step 1: Identity',
        title: 'CNIC / NICOP Copies',
        points: [
          'Two verified photocopies of buyer CNIC / NICOP',
          'One photocopy of Next-of-Kin (Nominee) CNIC',
          'Passport copies for Overseas Pakistani buyers'
        ],
        badge: 'Attested Copies Required'
      },
      {
        point: '02',
        tag: 'Step 2: Photos',
        title: 'Passport Photographs',
        points: [
          'Two recent passport-size color photographs',
          'Clear blue background',
          'Applicant name written on back'
        ],
        badge: 'Recent Photographs'
      },
      {
        point: '03',
        tag: 'Step 3: Payment',
        title: 'Pay Order / Bank Draft',
        points: [
          'Pay Order in favour of "Zedem International"',
          'Transfer fee receipt from society counter',
          'Direct online wire verification for NRPs'
        ],
        badge: 'Official Bank Draft'
      },
      {
        point: '04',
        tag: 'Step 4: Transfer',
        title: 'Allotment Letter Transfer',
        points: [
          'Official transfer execution at head office counter',
          'Immediate biometric record verification',
          'New registered owner allotment letter handover'
        ],
        badge: 'Official Allotment Handover'
      }
    ],
    bannerHeading: "Need Assistance with Plot Transfer & File Verification?",
    bannerSubtext: "Our dedicated transfer advisory desk verifies society records and guides you step-by-step.",
    bannerButtonText: "Contact Transfer Desk",
    bannerWhatsapp: "Hi, I need official assistance with plot transfer in Faisal Hills Executive Block."
  },
  faqs: {
    sectionTag: "FAQ'S",
    h2: "Frequently Asked Questions (FAQS)",
    items: [
      {
        q: 'Where is Executive Block located within Faisal Hills?',
        a: 'Executive Block is located at the flagship front entrance of Faisal Hills, directly on Main GT Road (N-5) Taxila / Islamabad Zone 2, home to the iconic Grand Arc Gate and Faisal Jewel Tower.'
      },
      {
        q: 'Is Faisal Hills Executive Block RDA approved and possession ready?',
        a: 'Yes. Faisal Hills Executive Block has full NOC approval from the Rawalpindi Development Authority (RDA). Possession is fully delivered and families are actively constructing luxury villas and commercial plazas.'
      },
      {
        q: 'What plot sizes are available in Executive Block?',
        a: 'Executive Block features 5 Marla, 8 Marla, 10 Marla, and 1 Kanal residential plots, alongside prime 4 Marla, 5.33 Marla, and corporate commercial plots.'
      },
      {
        q: 'Is Roots International School operational in Executive Block?',
        a: 'Yes. Roots International School Campus is 100% operational on-site and actively educating students with world-class facilities.'
      },
      {
        q: 'How can I buy or transfer a plot in Executive Block?',
        a: 'Transfers are executed officially at the Zedem International Head Office located right at the Faisal Hills entrance with full document verification and zero dealer markup.'
      }
    ]
  },
  scheduleTour: {
    tag: "Direct Developer Facilitation Desk",
    h3: "Schedule an On-Site Executive Block Tour",
    leadParagraph: "Leave your contact details to receive verified plot listings, latest market rates, and official allotment files directly on WhatsApp.",
    thankYouHeading: "Inquiry Received!",
    thankYouMessage: "Thank you. Our Executive Block property specialist will contact you with available plot files.",
    buttonText: "Submit Inquiry Request"
  }
};

export function mergeExecutiveBlockCMS(incoming: any): ExecutiveBlockCMSData {
  if (!incoming || typeof incoming !== 'object') return initialExecutiveBlockCMS;

  const incHero = incoming.hero || {};
  const incOverview = incoming.overview || {};
  const incLocation = incoming.location || {};
  const incMaster = incoming.masterPlan || {};
  const incPlots = incoming.plotsForSale || {};
  const incResale = incoming.resaleDesk || {};
  const incFacilities = incoming.facilities || {};
  const incWhy = incoming.whyInvest || {};
  const incDev = incoming.developmentStatus || {};
  const incTransfer = incoming.transferProcess || {};
  const incFaqs = incoming.faqs || {};
  const incTour = incoming.scheduleTour || {};

  return {
    hero: {
      eyebrow: cleanVerifyText(incHero.eyebrow || initialExecutiveBlockCMS.hero.eyebrow),
      title: cleanVerifyText(incHero.title || initialExecutiveBlockCMS.hero.title),
      subtitle: cleanVerifyText(incHero.subtitle || initialExecutiveBlockCMS.hero.subtitle),
      bgImage: cleanVerifyText(incHero.bgImage || initialExecutiveBlockCMS.hero.bgImage),
      badge1: cleanVerifyText(incHero.badge1 || initialExecutiveBlockCMS.hero.badge1),
      badge2: cleanVerifyText(incHero.badge2 || initialExecutiveBlockCMS.hero.badge2),
      badge3: cleanVerifyText(incHero.badge3 || initialExecutiveBlockCMS.hero.badge3)
    },
    overview: {
      h1: cleanVerifyText(incOverview.h1 || initialExecutiveBlockCMS.overview.h1),
      leadParagraph: cleanVerifyText(incOverview.leadParagraph || initialExecutiveBlockCMS.overview.leadParagraph),
      expandedParagraph: cleanVerifyText(incOverview.expandedParagraph || initialExecutiveBlockCMS.overview.expandedParagraph),
      photoUrl: cleanVerifyText(incOverview.photoUrl || initialExecutiveBlockCMS.overview.photoUrl),
      photoAlt: cleanVerifyText(incOverview.photoAlt || initialExecutiveBlockCMS.overview.photoAlt),
      photoTag: cleanVerifyText(incOverview.photoTag || initialExecutiveBlockCMS.overview.photoTag),
      photoCaption: cleanVerifyText(incOverview.photoCaption || initialExecutiveBlockCMS.overview.photoCaption)
    },
    location: {
      h2: cleanVerifyText(incLocation.h2 || initialExecutiveBlockCMS.location.h2),
      leadParagraph: cleanVerifyText(incLocation.leadParagraph || initialExecutiveBlockCMS.location.leadParagraph),
      expandedParagraph1: cleanVerifyText(incLocation.expandedParagraph1 || initialExecutiveBlockCMS.location.expandedParagraph1),
      expandedParagraph2: cleanVerifyText(incLocation.expandedParagraph2 || initialExecutiveBlockCMS.location.expandedParagraph2),
      googleMapEmbedUrl: cleanVerifyText(incLocation.googleMapEmbedUrl || initialExecutiveBlockCMS.location.googleMapEmbedUrl)
    },
    masterPlan: {
      h2: cleanVerifyText(incMaster.h2 || initialExecutiveBlockCMS.masterPlan.h2),
      leadParagraph: cleanVerifyText(incMaster.leadParagraph || initialExecutiveBlockCMS.masterPlan.leadParagraph),
      mapImageUrl: cleanVerifyText(incMaster.mapImageUrl || initialExecutiveBlockCMS.masterPlan.mapImageUrl),
      mapPdfUrl: cleanVerifyText(incMaster.mapPdfUrl || initialExecutiveBlockCMS.masterPlan.mapPdfUrl),
      downloadButtonText: cleanVerifyText(incMaster.downloadButtonText || initialExecutiveBlockCMS.masterPlan.downloadButtonText),
      exploreSocietyMapUrl: cleanVerifyText(incMaster.exploreSocietyMapUrl || initialExecutiveBlockCMS.masterPlan.exploreSocietyMapUrl),
      exploreSocietyMapText: cleanVerifyText(incMaster.exploreSocietyMapText || initialExecutiveBlockCMS.masterPlan.exploreSocietyMapText)
    },
    plotsForSale: {
      h2: cleanVerifyText(incPlots.h2 || initialExecutiveBlockCMS.plotsForSale.h2),
      leadParagraph: cleanVerifyText(incPlots.leadParagraph || initialExecutiveBlockCMS.plotsForSale.leadParagraph),
      plots: Array.isArray(incPlots.plots) && incPlots.plots.length > 0
        ? incPlots.plots.map((p: any, idx: number) => ({
            id: cleanVerifyText(p.id || `exec-plot-${idx}`),
            plotNumber: cleanVerifyText(p.plotNumber || `EX-${idx + 100}`),
            blockName: cleanVerifyText(p.blockName || 'Executive Block'),
            category: cleanVerifyText(p.category || 'Residential'),
            size: cleanVerifyText(p.size || '5 Marla'),
            dimensions: cleanVerifyText(p.dimensions || '25 × 50'),
            facing: cleanVerifyText(p.facing || 'Boulevard Facing'),
            priceFormatted: cleanVerifyText(p.priceFormatted || 'Contact for Price'),
            downPayment: cleanVerifyText(p.downPayment || 'Contact for Plan'),
            status: cleanVerifyText(p.status || 'Available'),
            badge: cleanVerifyText(p.badge || 'Verified File'),
            image: cleanVerifyText(p.image || '/images/faisal-hills-executive-sector.webp'),
            features: Array.isArray(p.features) ? p.features.map((f: string) => cleanVerifyText(f)) : []
          }))
        : initialExecutiveBlockCMS.plotsForSale.plots
    },
    resaleDesk: {
      tag: cleanVerifyText(incResale.tag || initialExecutiveBlockCMS.resaleDesk.tag),
      heading: cleanVerifyText(incResale.heading || initialExecutiveBlockCMS.resaleDesk.heading),
      paragraph: cleanVerifyText(incResale.paragraph || initialExecutiveBlockCMS.resaleDesk.paragraph),
      buttonText: cleanVerifyText(incResale.buttonText || initialExecutiveBlockCMS.resaleDesk.buttonText),
      whatsappMessage: cleanVerifyText(incResale.whatsappMessage || initialExecutiveBlockCMS.resaleDesk.whatsappMessage)
    },
    facilities: {
      h2: cleanVerifyText(incFacilities.h2 || initialExecutiveBlockCMS.facilities.h2),
      leadParagraph: cleanVerifyText(incFacilities.leadParagraph || initialExecutiveBlockCMS.facilities.leadParagraph),
      items: Array.isArray(incFacilities.items) && incFacilities.items.length > 0
        ? incFacilities.items.map((it: any, idx: number) => ({
            id: cleanVerifyText(it.id || `fac-${idx}`),
            tag: cleanVerifyText(it.tag || 'Sector Facility'),
            title: cleanVerifyText(it.title || ''),
            image: cleanVerifyText(it.image || '/images/faisal-hills-executive-sector.webp'),
            iconType: cleanVerifyText(it.iconType || 'Building2')
          }))
        : initialExecutiveBlockCMS.facilities.items
    },
    whyInvest: {
      h2: cleanVerifyText(incWhy.h2 || initialExecutiveBlockCMS.whyInvest.h2),
      leadParagraph: cleanVerifyText(incWhy.leadParagraph || initialExecutiveBlockCMS.whyInvest.leadParagraph),
      reasons: Array.isArray(incWhy.reasons) && incWhy.reasons.length > 0
        ? incWhy.reasons.map((r: any) => ({
            title: cleanVerifyText(r.title || ''),
            desc: cleanVerifyText(r.desc || '')
          }))
        : initialExecutiveBlockCMS.whyInvest.reasons
    },
    developmentStatus: {
      h2: cleanVerifyText(incDev.h2 || initialExecutiveBlockCMS.developmentStatus.h2),
      leadParagraph: cleanVerifyText(incDev.leadParagraph || initialExecutiveBlockCMS.developmentStatus.leadParagraph),
      expandedParagraph1: cleanVerifyText(incDev.expandedParagraph1 || initialExecutiveBlockCMS.developmentStatus.expandedParagraph1),
      expandedParagraph2: cleanVerifyText(incDev.expandedParagraph2 || initialExecutiveBlockCMS.developmentStatus.expandedParagraph2),
      stat1Value: cleanVerifyText(incDev.stat1Value || initialExecutiveBlockCMS.developmentStatus.stat1Value),
      stat1Label: cleanVerifyText(incDev.stat1Label || initialExecutiveBlockCMS.developmentStatus.stat1Label),
      stat2Value: cleanVerifyText(incDev.stat2Value || initialExecutiveBlockCMS.developmentStatus.stat2Value),
      stat2Label: cleanVerifyText(incDev.stat2Label || initialExecutiveBlockCMS.developmentStatus.stat2Label),
      stat3Value: cleanVerifyText(incDev.stat3Value || initialExecutiveBlockCMS.developmentStatus.stat3Value),
      stat3Label: cleanVerifyText(incDev.stat3Label || initialExecutiveBlockCMS.developmentStatus.stat3Label),
      dronePhotoUrl: cleanVerifyText(incDev.dronePhotoUrl || initialExecutiveBlockCMS.developmentStatus.dronePhotoUrl),
      dronePhotoAlt: cleanVerifyText(incDev.dronePhotoAlt || initialExecutiveBlockCMS.developmentStatus.dronePhotoAlt),
      possessionBadge: cleanVerifyText(incDev.possessionBadge || initialExecutiveBlockCMS.developmentStatus.possessionBadge),
      droneTag: cleanVerifyText(incDev.droneTag || initialExecutiveBlockCMS.developmentStatus.droneTag),
      droneHeading: cleanVerifyText(incDev.droneHeading || initialExecutiveBlockCMS.developmentStatus.droneHeading),
      droneDesc: cleanVerifyText(incDev.droneDesc || initialExecutiveBlockCMS.developmentStatus.droneDesc)
    },
    transferProcess: {
      h2: cleanVerifyText(incTransfer.h2 || initialExecutiveBlockCMS.transferProcess.h2),
      leadParagraph: cleanVerifyText(incTransfer.leadParagraph || initialExecutiveBlockCMS.transferProcess.leadParagraph),
      steps: Array.isArray(incTransfer.steps) && incTransfer.steps.length > 0
        ? incTransfer.steps.map((s: any, idx: number) => ({
            point: cleanVerifyText(s.point || `0${idx + 1}`),
            tag: cleanVerifyText(s.tag || `Step ${idx + 1}`),
            title: cleanVerifyText(s.title || ''),
            points: Array.isArray(s.points) ? s.points.map((p: string) => cleanVerifyText(p)) : [],
            badge: cleanVerifyText(s.badge || 'Verified Step')
          }))
        : initialExecutiveBlockCMS.transferProcess.steps,
      bannerHeading: cleanVerifyText(incTransfer.bannerHeading || initialExecutiveBlockCMS.transferProcess.bannerHeading),
      bannerSubtext: cleanVerifyText(incTransfer.bannerSubtext || initialExecutiveBlockCMS.transferProcess.bannerSubtext),
      bannerButtonText: cleanVerifyText(incTransfer.bannerButtonText || initialExecutiveBlockCMS.transferProcess.bannerButtonText),
      bannerWhatsapp: cleanVerifyText(incTransfer.bannerWhatsapp || initialExecutiveBlockCMS.transferProcess.bannerWhatsapp)
    },
    faqs: {
      sectionTag: cleanVerifyText(incFaqs.sectionTag || initialExecutiveBlockCMS.faqs.sectionTag),
      h2: cleanVerifyText(incFaqs.h2 || initialExecutiveBlockCMS.faqs.h2),
      items: Array.isArray(incFaqs.items) && incFaqs.items.length > 0
        ? incFaqs.items.map((f: any) => ({
            q: cleanVerifyText(f.q || f.question || ''),
            a: cleanVerifyText(f.a || f.answer || '')
          }))
        : initialExecutiveBlockCMS.faqs.items
    },
    scheduleTour: {
      tag: cleanVerifyText(incTour.tag || initialExecutiveBlockCMS.scheduleTour.tag),
      h3: cleanVerifyText(incTour.h3 || initialExecutiveBlockCMS.scheduleTour.h3),
      leadParagraph: cleanVerifyText(incTour.leadParagraph || initialExecutiveBlockCMS.scheduleTour.leadParagraph),
      thankYouHeading: cleanVerifyText(incTour.thankYouHeading || initialExecutiveBlockCMS.scheduleTour.thankYouHeading),
      thankYouMessage: cleanVerifyText(incTour.thankYouMessage || initialExecutiveBlockCMS.scheduleTour.thankYouMessage),
      buttonText: cleanVerifyText(incTour.buttonText || initialExecutiveBlockCMS.scheduleTour.buttonText)
    }
  };
}

export async function fetchExecutiveBlockCMS(): Promise<ExecutiveBlockCMSData> {
  let localData: ExecutiveBlockCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const localStr = localStorage.getItem('faisal_executive_block_cms');
      if (localStr) localData = mergeExecutiveBlockCMS(JSON.parse(localStr));
    } catch {}
  }

  const remote = await fetchSettingByKey<ExecutiveBlockCMSData>('faisal_executive_block_cms');
  if (remote) {
    const merged = localData ? mergeExecutiveBlockCMS({ ...remote, ...localData }) : mergeExecutiveBlockCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_executive_block_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialExecutiveBlockCMS;
}

export async function saveExecutiveBlockCMS(cmsData: ExecutiveBlockCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_executive_block_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_executive_block_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_executive_block_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// =========================================================
// FAISAL HILLS BLOCK B-1 EXTENSION DEDICATED CMS SYSTEM
// =========================================================

export interface B1ExtPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  category: string;
  priceRange: string;
  possession: string;
  highlight: string;
}

export interface B1ExtDriveTimeItem {
  destination: string;
  time: string;
  distance: string;
  note: string;
}

export interface B1ExtAmenityItem {
  title: string;
  desc: string;
  category: string;
  iconType: string;
}

export interface B1ExtWhyInvestItem {
  title: string;
  desc: string;
}

export interface B1ExtTransferStep {
  point: string;
  tag: string;
  title: string;
  points: string[];
  badge: string;
}

export interface B1ExtFaqItem {
  q: string;
  a: string;
}

export interface BlockB1ExtensionCMSData {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bgImage: string;
    badge1: string;
    badge2: string;
    badge3: string;
  };
  overview: {
    h1: string;
    leadParagraph: string;
    expandedParagraph1: string;
    expandedParagraph2: string;
    photoUrl: string;
    photoAlt: string;
    photoTag: string;
    photoCaption: string;
  };
  location: {
    h2: string;
    leadParagraph: string;
    expandedParagraph: string;
    googleMapEmbedUrl: string;
    driveTimes: B1ExtDriveTimeItem[];
  };
  masterPlan: {
    h2: string;
    leadParagraph: string;
    mapImageUrl: string;
    mapPdfUrl: string;
    downloadButtonText: string;
    exploreSocietyMapUrl: string;
    exploreSocietyMapText: string;
  };
  priceSchedule: {
    h2: string;
    leadParagraph: string;
    rows: B1ExtPriceRow[];
  };
  amenities: {
    h2: string;
    leadParagraph: string;
    items: B1ExtAmenityItem[];
  };
  whyInvest: {
    h2: string;
    leadParagraph: string;
    reasons: B1ExtWhyInvestItem[];
  };
  developmentStatus: {
    h2: string;
    leadParagraph: string;
    expandedParagraph: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    dronePhotoUrl: string;
    dronePhotoAlt: string;
    possessionBadge: string;
    droneTag: string;
    droneHeading: string;
    droneDesc: string;
  };
  transferProcess: {
    h2: string;
    leadParagraph: string;
    steps: B1ExtTransferStep[];
    bannerHeading: string;
    bannerSubtext: string;
    bannerButtonText: string;
    bannerWhatsapp: string;
  };
  faqs: {
    sectionTag: string;
    h2: string;
    items: B1ExtFaqItem[];
  };
  scheduleTour: {
    tag: string;
    h3: string;
    leadParagraph: string;
    thankYouHeading: string;
    thankYouMessage: string;
    buttonText: string;
  };
}

export const initialBlockB1ExtensionCMS: BlockB1ExtensionCMSData = {
  hero: {
    eyebrow: "FAST DEVELOPING MODERN SECTOR WITH HIGH CAPITAL GROWTH",
    title: "Block B-1 Extension",
    subtitle: "Block B-1 Extension in Faisal Hills offers affordable entry pricing with rapid on-ground infrastructure progress, wide boulevards, and scenic Margalla surroundings.",
    bgImage: "/images/faisal-hills-aerial-panoramic.webp",
    badge1: "100% RDA Approved",
    badge2: "Rapid Construction Pace",
    badge3: "Scenic Margalla Views"
  },
  overview: {
    h1: "Faisal Hills Block B-1 Extension Overview",
    leadParagraph: "Faisal Hills Block B-1 Extension is a purposefully planned modern residential enclave situated right next to the prestigious Block B. Designed to cater to smart investors and aspiring homebuilders, B-1 Extension offers an optimal balance of premium town-planning and budget-friendly entry prices.",
    expandedParagraph1: "Surrounded by scenic Margalla views, the sector features wide 40ft to 60ft carpeted streets, planned educational institutes, dedicated commercial corridors, and neighborhood parks.",
    expandedParagraph2: "With direct internal connections to Block B and swift access to the Main GT Road, Block B-1 Extension represents one of the highest capital appreciation opportunities in the entire society.",
    photoUrl: "/images/faisal-hills-aerial-panoramic.webp",
    photoAlt: "Faisal Hills Block B-1 Extension Aerial Overview",
    photoTag: "Modern Residential Extension",
    photoCaption: "Rapid Infrastructure Development"
  },
  location: {
    h2: "Block B-1 Extension Location & Strategic Connectivity",
    leadParagraph: "Nestled adjacent to Block B, B-1 Extension benefits from seamless internal connectivity and direct road access to the Main GT Road N-5, Multi Gardens B-17, and the upcoming M-1 Motorway Interchange.",
    expandedParagraph: "Residents enjoy a tranquil residential pocket tucked away from heavy transit noise while remaining within 5 to 15 minutes of major commercial, educational, and transit hubs across Taxila and Islamabad.",
    googleMapEmbedUrl: "https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed",
    driveTimes: [
      { destination: 'Taxila City & Museum', time: '5 mins', distance: '3.2 km', note: 'Direct GT Road N-5 corridor' },
      { destination: 'Multi Gardens B-17 Islamabad', time: '6 mins', distance: '4.8 km', note: 'Direct sector-to-sector connection' },
      { destination: 'UET Taxila & HITEC University', time: '8 mins', distance: '6.5 km', note: 'Short commute for faculty & students' },
      { destination: 'Block B Central Sports Complex', time: '3 mins', distance: '1.5 km', note: 'Direct internal avenue connection' },
      { destination: 'M-1 Motorway Toll Plaza', time: '12 mins', distance: '11 km', note: 'Quick inter-provincial transit' },
      { destination: 'New Islamabad International Airport', time: '25 mins', distance: '28 km', note: 'Direct motorway / expressway link' }
    ]
  },
  masterPlan: {
    h2: "Block B-1 Extension Master Plan & Sector Layout",
    leadParagraph: "The master plan of Block B-1 Extension features a symmetrical grid layout engineered for maximum cross-ventilation, smooth traffic flow, and effortless walking distance to sector parks and commercial markets.",
    mapImageUrl: "/images/faisal-hills-executive-map.webp",
    mapPdfUrl: "/images/faisal-hills-executive-map.webp",
    downloadButtonText: "Download Master Plan",
    exploreSocietyMapUrl: "/master-plan",
    exploreSocietyMapText: "Explore Society Map"
  },
  priceSchedule: {
    h2: "Plot Sizes & Price Matrix in Block B-1 Extension",
    leadParagraph: "Explore current verified market price ranges for residential and commercial plots in Block B-1 Extension:",
    rows: [
      {
        size: '5 Marla',
        dimensions: '25 × 50',
        sqYards: '139 Sq. Yds',
        category: 'Residential',
        priceRange: 'PKR 38 Lacs – 48 Lacs',
        possession: 'Early Possession Phase',
        highlight: 'Lowest entry price point in society with maximum capital appreciation upside.'
      },
      {
        size: '8 Marla',
        dimensions: '30 × 60',
        sqYards: '200 Sq. Yds',
        category: 'Residential',
        priceRange: 'PKR 58 Lacs – 72 Lacs',
        possession: 'Development in Progress',
        highlight: 'Ideal family-size plot cut balancing generous indoor layout and affordability.'
      },
      {
        size: '10 Marla',
        dimensions: '35 × 70',
        sqYards: '272 Sq. Yds',
        category: 'Residential',
        priceRange: 'PKR 75 Lacs – 95 Lacs',
        possession: 'Development in Progress',
        highlight: 'Executive single & double unit luxury villa cut with high elevation Margalla view.'
      },
      {
        size: 'Commercial (Avenue)',
        dimensions: 'Standard Sector Cuts',
        sqYards: 'Varies',
        category: 'Commercial',
        priceRange: 'PKR 1.2 Crore – 2.5 Crore',
        possession: 'Commercial Phase',
        highlight: 'Commercial plots situated on wide internal sector boulevards for retail & plazas.'
      }
    ]
  },
  amenities: {
    h2: "Amenities & Modern Infrastructure in B-1 Extension",
    leadParagraph: "Block B-1 Extension is planned with complete underground civic utilities and lifestyle facilities:",
    items: [
      {
        title: '100% Underground Electrification',
        desc: 'Uninterrupted power grid with underground cabling, high-capacity transformers, and modern street lighting.',
        category: 'Utilities',
        iconType: 'Zap'
      },
      {
        title: 'Clean Water Filtration Plant',
        desc: 'Dedicated high-capacity RO filtration plants delivering 24/7 clean potable drinking water.',
        category: 'Utilities',
        iconType: 'Droplets'
      },
      {
        title: 'Gated Security & 24/7 CCTV',
        desc: 'Round-the-clock physical security patrols, smart RFID entry gates, and society-wide surveillance.',
        category: 'Security',
        iconType: 'ShieldCheck'
      },
      {
        title: 'Dedicated Sector Jamia Mosque',
        desc: 'Beautiful modern architecture Jamia mosque reservations within walking distance of all plot streets.',
        category: 'Community',
        iconType: 'Landmark'
      },
      {
        title: 'Lush Sector Parks & Playgrounds',
        desc: 'Family parks, landscaped green belts, children play areas, and tree-lined jogging paths.',
        category: 'Recreation',
        iconType: 'Trees'
      },
      {
        title: 'Modern Sewerage & Drainage',
        desc: 'Engineered underground storm water drainage and wide-diameter sewage piping networks.',
        category: 'Infrastructure',
        iconType: 'Activity'
      },
      {
        title: 'Commercial Sector Markets',
        desc: 'Convenient neighborhood retail plazas for grocery, daily essentials, pharmacies, and cafes.',
        category: 'Commercial',
        iconType: 'ShoppingBag'
      },
      {
        title: 'School & Healthcare Reservations',
        desc: 'Designated plots for premier private schooling branches and medical clinic facilities.',
        category: 'Civic',
        iconType: 'GraduationCap'
      }
    ]
  },
  whyInvest: {
    h2: "Why Invest in Faisal Hills Block B-1 Extension",
    leadParagraph: "Key reasons why seasoned investors and genuine buyers choose Block B-1 Extension:",
    reasons: [
      { title: "Highest ROI Potential", desc: "Lower entry acquisition costs provide significantly higher percentage capital appreciation as possession approaches." },
      { title: "Proximity to Block B Sports Arena", desc: "Enjoy immediate walking access to the mega sports complex, cricket ground, and club facilities of Block B." },
      { title: "100% RDA Approved Titles", desc: "Safe, legally sanctioned layout plan giving peace of mind to local and overseas buyers." },
      { title: "Fast-Paced Earthwork & Roadworks", desc: "Active machinery on-ground completing road leveling, boundary walls, and sewerage piping." },
      { title: "Scenic Margalla Elevation", desc: "Higher topographical elevation offering cool mountain breezes and panoramic hill views." },
      { title: "Official Developer Transfers", desc: "Transfers handled transparently at Zedem International Head Office with zero dealer file risk." }
    ]
  },
  developmentStatus: {
    h2: "Block B-1 Extension On-Ground Development Status",
    leadParagraph: "Heavy earthmoving machinery, road rollers, and engineering teams are actively operating on-site in Block B-1 Extension to expedite possession delivery.",
    expandedParagraph: "Sewerage pipeline laying is in advanced stages, road cuts have been demarcated, and underground utility conduits are being installed in coordination with the central society engineering desk.",
    stat1Value: "85%+",
    stat1Label: "Earthwork Complete",
    stat2Value: "100%",
    stat2Label: "Sewer Line Network",
    stat3Value: "On Track",
    stat3Label: "Possession Delivery",
    dronePhotoUrl: "/images/faisal-hills-drone-view.webp",
    dronePhotoAlt: "Faisal Hills Block B-1 Extension Machinery on Site",
    possessionBadge: "Active Development",
    droneTag: "On-Ground Progress Survey",
    droneHeading: "B-1 Extension Machinery & Grading",
    droneDesc: "Continuous grading, heavy machinery deployment, and underground utility installation on site."
  },
  transferProcess: {
    h2: "Block B-1 Extension Allotment & Transfer Process",
    leadParagraph: "Follow these 4 essential points to complete official plot transfer directly at Zedem International:",
    steps: [
      {
        point: '01',
        tag: 'Step 1: Identity Verification',
        title: 'CNIC / NICOP Photocopies',
        points: [
          'Two attested photocopies of buyer CNIC / NICOP',
          'One photocopy of Nominee (Next-of-Kin) CNIC',
          'Passport copies for Overseas Pakistani buyers'
        ],
        badge: 'Attested Copies Required'
      },
      {
        point: '02',
        tag: 'Step 2: Photography',
        title: 'Passport Photographs',
        points: [
          'Two recent passport-size color photographs',
          'Clear blue background',
          'Applicant name written on back of photos'
        ],
        badge: 'Recent Photographs'
      },
      {
        point: '03',
        tag: 'Step 3: Payment Draft',
        title: 'Pay Order / Society Draft',
        points: [
          'Pay Order in favour of "Zedem International"',
          'Official transfer fee receipt from society counter',
          'Direct online wire confirmation for NRP investors'
        ],
        badge: 'Official Bank Draft'
      },
      {
        point: '04',
        tag: 'Step 4: Letter Handover',
        title: 'Official Allotment Transfer',
        points: [
          'Official biometric verification at transfer counter',
          'Immediate signature validation on society ledger',
          'Official registered allotment transfer letter handover'
        ],
        badge: 'Official Allotment Handover'
      }
    ],
    bannerHeading: "Need Help with Block B-1 Extension File Verification?",
    bannerSubtext: "Our dedicated transfer advisory desk verifies society records, payment dues, and guides you step-by-step.",
    bannerButtonText: "Contact Advisory Desk",
    bannerWhatsapp: "Hi, I need official assistance with plot transfer in Faisal Hills Block B-1 Extension."
  },
  faqs: {
    sectionTag: "FAQ'S",
    h2: "Frequently Asked Questions (FAQS)",
    items: [
      {
        q: 'Where is Block B-1 Extension located within Faisal Hills?',
        a: 'Block B-1 Extension is situated immediately adjacent to Block B, featuring seamless internal connectivity to the central sports complex and direct access routes toward GT Road N-5 and M-1 Motorway.'
      },
      {
        q: 'What plot sizes are available in Block B-1 Extension?',
        a: 'Block B-1 Extension features 5 Marla (25x50), 8 Marla (30x60), and 10 Marla (35x70) residential plots, along with commercial plots located on main avenues.'
      },
      {
        q: 'Is Block B-1 Extension RDA approved?',
        a: 'Yes, Faisal Hills in its entirety — including Block B-1 Extension — holds complete NOC approval from the Rawalpindi Development Authority (RDA).'
      },
      {
        q: 'When will possession be granted in Block B-1 Extension?',
        a: 'Development work including earthwork, road carpeting, and sewerage network is rapidly progressing on-site. Possession is being handed over in phases as sector infrastructure completes.'
      },
      {
        q: 'How can I buy or transfer a plot in Block B-1 Extension?',
        a: 'Transfers are executed officially at the Zedem International Head Office located at the Faisal Hills entrance with full document verification and transparent procedures.'
      }
    ]
  },
  scheduleTour: {
    tag: "Direct Developer Facilitation Desk",
    h3: "Schedule an On-Site Block B-1 Extension Tour",
    leadParagraph: "Leave your contact details to receive verified plot listings, latest price quotations, and official allotment files directly on WhatsApp.",
    thankYouHeading: "Inquiry Received!",
    thankYouMessage: "Thank you. Our Block B-1 Extension specialist will contact you with available plot files.",
    buttonText: "Submit Inquiry Request"
  }
};

export function mergeBlockB1ExtensionCMS(incoming: any): BlockB1ExtensionCMSData {
  if (!incoming || typeof incoming !== 'object') return initialBlockB1ExtensionCMS;

  const incHero = incoming.hero || {};
  const incOverview = incoming.overview || {};
  const incLocation = incoming.location || {};
  const incMaster = incoming.masterPlan || {};
  const incPrice = incoming.priceSchedule || {};
  const incAmenities = incoming.amenities || {};
  const incWhy = incoming.whyInvest || {};
  const incDev = incoming.developmentStatus || {};
  const incTransfer = incoming.transferProcess || {};
  const incFaqs = incoming.faqs || {};
  const incTour = incoming.scheduleTour || {};

  return {
    hero: {
      eyebrow: cleanVerifyText(incHero.eyebrow || initialBlockB1ExtensionCMS.hero.eyebrow),
      title: cleanVerifyText(incHero.title || initialBlockB1ExtensionCMS.hero.title),
      subtitle: cleanVerifyText(incHero.subtitle || initialBlockB1ExtensionCMS.hero.subtitle),
      bgImage: cleanVerifyText(incHero.bgImage || initialBlockB1ExtensionCMS.hero.bgImage),
      badge1: cleanVerifyText(incHero.badge1 || initialBlockB1ExtensionCMS.hero.badge1),
      badge2: cleanVerifyText(incHero.badge2 || initialBlockB1ExtensionCMS.hero.badge2),
      badge3: cleanVerifyText(incHero.badge3 || initialBlockB1ExtensionCMS.hero.badge3)
    },
    overview: {
      h1: cleanVerifyText(incOverview.h1 || initialBlockB1ExtensionCMS.overview.h1),
      leadParagraph: cleanVerifyText(incOverview.leadParagraph || initialBlockB1ExtensionCMS.overview.leadParagraph),
      expandedParagraph1: cleanVerifyText(incOverview.expandedParagraph1 || initialBlockB1ExtensionCMS.overview.expandedParagraph1),
      expandedParagraph2: cleanVerifyText(incOverview.expandedParagraph2 || initialBlockB1ExtensionCMS.overview.expandedParagraph2),
      photoUrl: cleanVerifyText(incOverview.photoUrl || initialBlockB1ExtensionCMS.overview.photoUrl),
      photoAlt: cleanVerifyText(incOverview.photoAlt || initialBlockB1ExtensionCMS.overview.photoAlt),
      photoTag: cleanVerifyText(incOverview.photoTag || initialBlockB1ExtensionCMS.overview.photoTag),
      photoCaption: cleanVerifyText(incOverview.photoCaption || initialBlockB1ExtensionCMS.overview.photoCaption)
    },
    location: {
      h2: cleanVerifyText(incLocation.h2 || initialBlockB1ExtensionCMS.location.h2),
      leadParagraph: cleanVerifyText(incLocation.leadParagraph || initialBlockB1ExtensionCMS.location.leadParagraph),
      expandedParagraph: cleanVerifyText(incLocation.expandedParagraph || initialBlockB1ExtensionCMS.location.expandedParagraph),
      googleMapEmbedUrl: cleanVerifyText(incLocation.googleMapEmbedUrl || initialBlockB1ExtensionCMS.location.googleMapEmbedUrl),
      driveTimes: Array.isArray(incLocation.driveTimes) && incLocation.driveTimes.length > 0
        ? incLocation.driveTimes.map((d: any) => ({
            destination: cleanVerifyText(d.destination || ''),
            time: cleanVerifyText(d.time || ''),
            distance: cleanVerifyText(d.distance || ''),
            note: cleanVerifyText(d.note || '')
          }))
        : initialBlockB1ExtensionCMS.location.driveTimes
    },
    masterPlan: {
      h2: cleanVerifyText(incMaster.h2 || initialBlockB1ExtensionCMS.masterPlan.h2),
      leadParagraph: cleanVerifyText(incMaster.leadParagraph || initialBlockB1ExtensionCMS.masterPlan.leadParagraph),
      mapImageUrl: cleanVerifyText(incMaster.mapImageUrl || initialBlockB1ExtensionCMS.masterPlan.mapImageUrl),
      mapPdfUrl: cleanVerifyText(incMaster.mapPdfUrl || initialBlockB1ExtensionCMS.masterPlan.mapPdfUrl),
      downloadButtonText: cleanVerifyText(incMaster.downloadButtonText || initialBlockB1ExtensionCMS.masterPlan.downloadButtonText),
      exploreSocietyMapUrl: cleanVerifyText(incMaster.exploreSocietyMapUrl || initialBlockB1ExtensionCMS.masterPlan.exploreSocietyMapUrl),
      exploreSocietyMapText: cleanVerifyText(incMaster.exploreSocietyMapText || initialBlockB1ExtensionCMS.masterPlan.exploreSocietyMapText)
    },
    priceSchedule: {
      h2: cleanVerifyText(incPrice.h2 || initialBlockB1ExtensionCMS.priceSchedule.h2),
      leadParagraph: cleanVerifyText(incPrice.leadParagraph || initialBlockB1ExtensionCMS.priceSchedule.leadParagraph),
      rows: Array.isArray(incPrice.rows) && incPrice.rows.length > 0
        ? incPrice.rows.map((r: any) => ({
            size: cleanVerifyText(r.size || ''),
            dimensions: cleanVerifyText(r.dimensions || ''),
            sqYards: cleanVerifyText(r.sqYards || ''),
            category: cleanVerifyText(r.category || 'Residential'),
            priceRange: cleanVerifyText(r.priceRange || ''),
            possession: cleanVerifyText(r.possession || ''),
            highlight: cleanVerifyText(r.highlight || '')
          }))
        : initialBlockB1ExtensionCMS.priceSchedule.rows
    },
    amenities: {
      h2: cleanVerifyText(incAmenities.h2 || initialBlockB1ExtensionCMS.amenities.h2),
      leadParagraph: cleanVerifyText(incAmenities.leadParagraph || initialBlockB1ExtensionCMS.amenities.leadParagraph),
      items: Array.isArray(incAmenities.items) && incAmenities.items.length > 0
        ? incAmenities.items.map((it: any) => ({
            title: cleanVerifyText(it.title || ''),
            desc: cleanVerifyText(it.desc || ''),
            category: cleanVerifyText(it.category || 'Utilities'),
            iconType: cleanVerifyText(it.iconType || 'Zap')
          }))
        : initialBlockB1ExtensionCMS.amenities.items
    },
    whyInvest: {
      h2: cleanVerifyText(incWhy.h2 || initialBlockB1ExtensionCMS.whyInvest.h2),
      leadParagraph: cleanVerifyText(incWhy.leadParagraph || initialBlockB1ExtensionCMS.whyInvest.leadParagraph),
      reasons: Array.isArray(incWhy.reasons) && incWhy.reasons.length > 0
        ? incWhy.reasons.map((r: any) => ({
            title: cleanVerifyText(r.title || ''),
            desc: cleanVerifyText(r.desc || '')
          }))
        : initialBlockB1ExtensionCMS.whyInvest.reasons
    },
    developmentStatus: {
      h2: cleanVerifyText(incDev.h2 || initialBlockB1ExtensionCMS.developmentStatus.h2),
      leadParagraph: cleanVerifyText(incDev.leadParagraph || initialBlockB1ExtensionCMS.developmentStatus.leadParagraph),
      expandedParagraph: cleanVerifyText(incDev.expandedParagraph || initialBlockB1ExtensionCMS.developmentStatus.expandedParagraph),
      stat1Value: cleanVerifyText(incDev.stat1Value || initialBlockB1ExtensionCMS.developmentStatus.stat1Value),
      stat1Label: cleanVerifyText(incDev.stat1Label || initialBlockB1ExtensionCMS.developmentStatus.stat1Label),
      stat2Value: cleanVerifyText(incDev.stat2Value || initialBlockB1ExtensionCMS.developmentStatus.stat2Value),
      stat2Label: cleanVerifyText(incDev.stat2Label || initialBlockB1ExtensionCMS.developmentStatus.stat2Label),
      stat3Value: cleanVerifyText(incDev.stat3Value || initialBlockB1ExtensionCMS.developmentStatus.stat3Value),
      stat3Label: cleanVerifyText(incDev.stat3Label || initialBlockB1ExtensionCMS.developmentStatus.stat3Label),
      dronePhotoUrl: cleanVerifyText(incDev.dronePhotoUrl || initialBlockB1ExtensionCMS.developmentStatus.dronePhotoUrl),
      dronePhotoAlt: cleanVerifyText(incDev.dronePhotoAlt || initialBlockB1ExtensionCMS.developmentStatus.dronePhotoAlt),
      possessionBadge: cleanVerifyText(incDev.possessionBadge || initialBlockB1ExtensionCMS.developmentStatus.possessionBadge),
      droneTag: cleanVerifyText(incDev.droneTag || initialBlockB1ExtensionCMS.developmentStatus.droneTag),
      droneHeading: cleanVerifyText(incDev.droneHeading || initialBlockB1ExtensionCMS.developmentStatus.droneHeading),
      droneDesc: cleanVerifyText(incDev.droneDesc || initialBlockB1ExtensionCMS.developmentStatus.droneDesc)
    },
    transferProcess: {
      h2: cleanVerifyText(incTransfer.h2 || initialBlockB1ExtensionCMS.transferProcess.h2),
      leadParagraph: cleanVerifyText(incTransfer.leadParagraph || initialBlockB1ExtensionCMS.transferProcess.leadParagraph),
      steps: Array.isArray(incTransfer.steps) && incTransfer.steps.length > 0
        ? incTransfer.steps.map((s: any, idx: number) => ({
            point: cleanVerifyText(s.point || `0${idx + 1}`),
            tag: cleanVerifyText(s.tag || `Step ${idx + 1}`),
            title: cleanVerifyText(s.title || ''),
            points: Array.isArray(s.points) ? s.points.map((p: string) => cleanVerifyText(p)) : [],
            badge: cleanVerifyText(s.badge || 'Verified Step')
          }))
        : initialBlockB1ExtensionCMS.transferProcess.steps,
      bannerHeading: cleanVerifyText(incTransfer.bannerHeading || initialBlockB1ExtensionCMS.transferProcess.bannerHeading),
      bannerSubtext: cleanVerifyText(incTransfer.bannerSubtext || initialBlockB1ExtensionCMS.transferProcess.bannerSubtext),
      bannerButtonText: cleanVerifyText(incTransfer.bannerButtonText || initialBlockB1ExtensionCMS.transferProcess.bannerButtonText),
      bannerWhatsapp: cleanVerifyText(incTransfer.bannerWhatsapp || initialBlockB1ExtensionCMS.transferProcess.bannerWhatsapp)
    },
    faqs: {
      sectionTag: cleanVerifyText(incFaqs.sectionTag || initialBlockB1ExtensionCMS.faqs.sectionTag),
      h2: cleanVerifyText(incFaqs.h2 || initialBlockB1ExtensionCMS.faqs.h2),
      items: Array.isArray(incFaqs.items) && incFaqs.items.length > 0
        ? incFaqs.items.map((f: any) => ({
            q: cleanVerifyText(f.q || f.question || ''),
            a: cleanVerifyText(f.a || f.answer || '')
          }))
        : initialBlockB1ExtensionCMS.faqs.items
    },
    scheduleTour: {
      tag: cleanVerifyText(incTour.tag || initialBlockB1ExtensionCMS.scheduleTour.tag),
      h3: cleanVerifyText(incTour.h3 || initialBlockB1ExtensionCMS.scheduleTour.h3),
      leadParagraph: cleanVerifyText(incTour.leadParagraph || initialBlockB1ExtensionCMS.scheduleTour.leadParagraph),
      thankYouHeading: cleanVerifyText(incTour.thankYouHeading || initialBlockB1ExtensionCMS.scheduleTour.thankYouHeading),
      thankYouMessage: cleanVerifyText(incTour.thankYouMessage || initialBlockB1ExtensionCMS.scheduleTour.thankYouMessage),
      buttonText: cleanVerifyText(incTour.buttonText || initialBlockB1ExtensionCMS.scheduleTour.buttonText)
    }
  };
}

export async function fetchBlockB1ExtensionCMS(): Promise<BlockB1ExtensionCMSData> {
  let localData: BlockB1ExtensionCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const localStr = localStorage.getItem('faisal_block_b1_ext_cms');
      if (localStr) localData = mergeBlockB1ExtensionCMS(JSON.parse(localStr));
    } catch {}
  }

  const remote = await fetchSettingByKey<BlockB1ExtensionCMSData>('faisal_block_b1_ext_cms');
  if (remote) {
    const merged = localData ? mergeBlockB1ExtensionCMS({ ...remote, ...localData }) : mergeBlockB1ExtensionCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_block_b1_ext_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialBlockB1ExtensionCMS;
}

export async function saveBlockB1ExtensionCMS(cmsData: BlockB1ExtensionCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_block_b1_ext_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_block_b1_ext_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_block_b1_ext_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// =========================================================
// FAISAL HILLS BLOCK C DEDICATED CMS SYSTEM
// =========================================================

export interface BlockCPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  sqFeet: string;
  category: 'Residential' | 'Commercial';
  priceRange: string;
  possession: string;
  highlight: string;
}

export interface BlockCCMSData {
  verificationHeader: {
    reviewerName: string;
    reviewerRole: string;
    pricesVerifiedDate: string;
    possessionConfirmedDate: string;
    siteCheckedDate: string;
    badgeText: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bgImage: string;
    badge1: string;
    badge2: string;
    badge3: string;
  };
  overview: {
    h1: string;
    leadParagraph1: string;
    leadParagraph2: string;
    photoUrl: string;
    photoAlt: string;
    photoTag: string;
    photoCaption: string;
    quickFacts: {
      position: string;
      residentialSizes: string;
      plotCount: string;
      possession: string;
      howYouBuy: string;
      legalStatus: string;
      hillsWalkAccess: string;
      motorwayConnectivity: string;
    };
    ctaStripText: string;
    ctaWhatsapp: string;
    ctaCall: string;
  };
  location: {
    heading: string;
    leadParagraph: string;
    boundaryNote: string;
    travelTimes: {
      destination: string;
      distance: string;
      time: string;
      note: string;
    }[];
    googleMapIframeUrl: string;
  };
  masterPlan: {
    heading: string;
    subline: string;
    description: string;
    mapImage: string;
    pdfDownloadUrl: string;
    downloadButtonText: string;
  };
  plotSizesSection: {
    heading: string;
    subline: string;
    tableRows: {
      dimensions: string;
      sqFeet: string;
      sqYards: string;
      soldAs: string;
      status: string;
    }[];
    analysisNote: string;
  };
  priceScheduleSection: {
    heading: string;
    subline: string;
    disclaimerNote: string;
    tableRows: BlockCPriceRow[];
    rateComparisonNote: string;
  };
  possessionAndInfra: {
    heading: string;
    lead: string;
    tableRows: {
      item: string;
      status: string;
    }[];
    statusNote: string;
  };
  hillsWalkSection: {
    heading: string;
    tag: string;
    leadParagraph: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
    bannerImage: string;
  };
  whoSuitsSection: {
    heading: string;
    suitsProfile: string;
    reasons: { title: string; desc: string }[];
  };
  transferProcess: {
    heading: string;
    leadParagraph: string;
    steps: {
      point: string;
      tag: string;
      title: string;
      points: string[];
      badge: string;
    }[];
    requiredDocuments: string[];
  };
  faqsSection: {
    heading: string;
    subline: string;
    faqs: { q: string; a: string }[];
  };
  closingSiteVisitSection: {
    heading: string;
    intro: string;
    sellingPrompt: string;
    whatsappNumber: string;
    phoneNumber: string;
    officeAddress: string;
    formTitle: string;
    formSubtitle: string;
    formButtonText: string;
    reviewedByNote: string;
  };
}

export const initialBlockCCMS: BlockCCMSData = {
  verificationHeader: {
    reviewerName: "Senior Sector Verification Desk",
    reviewerRole: "Faisal Hills On-Ground Advisory",
    pricesVerifiedDate: "October 2026",
    possessionConfirmedDate: "Completed Sectors",
    siteCheckedDate: "October 2026",
    badgeText: "100% RDA Approved & Possession Granted"
  },
  hero: {
    eyebrow: "GATEWAY TO M-1 MOTORWAY & HOME TO HILLS WALK COMMERCIAL",
    title: "Block C",
    subtitle: "Faisal Hills Block C offers direct future M-1 Motorway interchange connectivity, the European-style Hills Walk dining and shopping promenade, and immediate possession residential plots.",
    bgImage: "/images/hills-walk-commercial-aerial.webp",
    badge1: "Immediate Possession",
    badge2: "Hills Walk Commercial Hub",
    badge3: "M-1 Interchange Direct Access"
  },
  overview: {
    h1: "Faisal Hills Block C: Possession, Plot Prices & Hills Walk Hub",
    leadParagraph1: "Block C is one of the most commercially prominent and high-velocity sectors in Faisal Hills Islamabad. Strategically located directly on the route to the upcoming dedicated M-1 Motorway Interchange, Block C connects high-density residential living with the society’s premier commercial promenade — Hills Walk.",
    leadParagraph2: "Featuring 5 Marla, 8 Marla, 10 Marla, 14 Marla, and 1 Kanal residential plots alongside vibrant multi-storey commercial plazas, Block C is possession-ready with active on-ground villa construction and operational utilities.",
    photoUrl: "/images/hills-walk-commercial-aerial.webp",
    photoAlt: "Faisal Hills Block C & Hills Walk Aerial Survey",
    photoTag: "M-1 Motorway Gateway",
    photoCaption: "Hills Walk Promenade & Block C Avenues",
    quickFacts: {
      position: "Western Sector connecting Block B and future M-1 Motorway Interchange",
      residentialSizes: "5, 8, 10, 14 Marla and 1 Kanal standard plots",
      plotCount: "Approx. 8,350 demarcated residential & commercial plots",
      possession: "Granted & Available across fully developed sub-sectors",
      howYouBuy: "Cash settlement on verified resale file transfer at Zedem office",
      legalStatus: "100% RDA Approved under society NOC sanction",
      hillsWalkAccess: "Direct walking frontage to Hills Walk Commercial Boulevard",
      motorwayConnectivity: "Direct 2-minute connection to proposed M-1 Interchange"
    },
    ctaStripText: "Looking to buy, sell or evaluate a plot in Block C?",
    ctaWhatsapp: "+92 333 1113177",
    ctaCall: "+92 333 1113177"
  },
  location: {
    heading: "Block C Location, Boundaries & Road Access",
    leadParagraph: "Block C occupies a prime geographical corridor on the western flank of Faisal Hills. It is bordered by Block B to the east and the M-1 Motorway alignment to the west.",
    boundaryNote: "With wide 150ft and 100ft arterial avenues feeding directly from the 225ft Main Boulevard, transit across the entire scheme is fast and congestion-free.",
    travelTimes: [
      { destination: "Hills Walk Commercial Promenade", distance: "0 km", time: "Walking Distance", note: "Located right inside Block C" },
      { destination: "Executive Block & Main GT Road Entrance", distance: "2.8 km", time: "4 mins", note: "Via 225ft Main Boulevard" },
      { destination: "Block B Sports Complex & Cricket Ground", distance: "1.2 km", time: "2 mins", note: "Direct sector avenue link" },
      { destination: "M-1 Motorway Interchange (Proposed)", distance: "1.5 km", time: "2 mins", note: "Direct exclusive access route" },
      { destination: "Multi Gardens B-17 Islamabad", distance: "4.5 km", time: "6 mins", note: "Adjacent sector connectivity" },
      { destination: "New Islamabad International Airport", distance: "25 km", time: "22 mins", note: "Via M-1 Motorway / CPEC corridor" }
    ],
    googleMapIframeUrl: "https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed"
  },
  masterPlan: {
    heading: "Block C Master Plan & Road Network",
    subline: "Engineered with wide avenues, lush central green belts, and dedicated commercial avenues.",
    description: "The layout of Block C is designed around a grid of 40ft, 50ft, 60ft residential streets, anchored by 100ft sector boulevards and 150ft connecting expressways. Central park reservations and sector Jamia mosques are located within 3 minutes walk of every plot.",
    mapImage: "/images/faisal-hills-executive-map.webp",
    pdfDownloadUrl: "/images/faisal-hills-executive-map.webp",
    downloadButtonText: "Download High-Res PDF Map"
  },
  plotSizesSection: {
    heading: "Standard Ground Dimensions in Block C",
    subline: "Official ground cuttings and area conversions for Block C plots:",
    tableRows: [
      { dimensions: "25 × 50", sqFeet: "1,125 Sq. Ft", sqYards: "139 Sq. Yds", soldAs: "5.55 Marla (5 Marla)", status: "High Demand" },
      { dimensions: "30 × 60", sqFeet: "1,800 Sq. Ft", sqYards: "200 Sq. Yds", soldAs: "8 Marla", status: "Balanced Cut" },
      { dimensions: "35 × 70", sqFeet: "2,250 Sq. Ft", sqYards: "272 Sq. Yds", soldAs: "10.89 Marla (10 Marla)", status: "Family Standard" },
      { dimensions: "40 × 80", sqFeet: "3,200 Sq. Ft", sqYards: "356 Sq. Yds", soldAs: "14.22 Marla (14 Marla)", status: "Limited Executive" },
      { dimensions: "50 × 90", sqFeet: "4,500 Sq. Ft", sqYards: "500 Sq. Yds", soldAs: "1 Kanal", status: "Boulevard Facing" }
    ],
    analysisNote: "All dimensions are measured in official Zedem International society standards (1 Marla = 225 sq. ft / 25 sq. yds)."
  },
  priceScheduleSection: {
    heading: "Block C Verified Market Price Schedule",
    subline: "Current asking rates based on October 2026 on-ground transactions:",
    disclaimerNote: "Prices vary based on plot location, corner positions, park facing, and proximity to Hills Walk Promenade.",
    tableRows: [
      {
        size: "5 Marla",
        dimensions: "25 × 50",
        sqYards: "139 Sq. Yds",
        sqFeet: "1,125 Sq. Ft",
        category: "Residential",
        priceRange: "PKR 48 Lacs – 58 Lacs",
        possession: "Possession Ready",
        highlight: "Highest transaction velocity; perfect compact entry cut near Hills Walk."
      },
      {
        size: "8 Marla",
        dimensions: "30 × 60",
        sqYards: "200 Sq. Yds",
        sqFeet: "1,800 Sq. Ft",
        category: "Residential",
        priceRange: "PKR 75 Lacs – 90 Lacs",
        possession: "Possession Ready",
        highlight: "Balanced family layout offering wide frontage and generous parking space."
      },
      {
        size: "10 Marla",
        dimensions: "35 × 70",
        sqYards: "272 Sq. Yds",
        sqFeet: "2,250 Sq. Ft",
        category: "Residential",
        priceRange: "PKR 1.15 Cr – 1.40 Cr",
        possession: "Possession Ready",
        highlight: "Most popular executive family home dimension across main developed avenues."
      },
      {
        size: "14 Marla",
        dimensions: "40 × 80",
        sqYards: "356 Sq. Yds",
        sqFeet: "3,200 Sq. Ft",
        category: "Residential",
        priceRange: "PKR 1.60 Cr – 1.95 Cr",
        possession: "Possession Ready",
        highlight: "Spacious luxury villa cut with high elevation and scenic Margalla backdrops."
      },
      {
        size: "1 Kanal",
        dimensions: "50 × 90",
        sqYards: "500 Sq. Yds",
        sqFeet: "4,500 Sq. Ft",
        category: "Residential",
        priceRange: "PKR 2.20 Cr – 2.85 Cr",
        possession: "Possession Ready",
        highlight: "Signature luxury estate plots located on wide 80ft and 100ft boulevards."
      }
    ],
    rateComparisonNote: "Block C plot prices reflect high capital appreciation momentum due to possession delivery and active retail openings in Hills Walk."
  },
  possessionAndInfra: {
    heading: "On-Ground Development Status & Utilities",
    lead: "Infrastructure in Block C is at an advanced state of completion with full underground civil works.",
    tableRows: [
      { item: "Main Roads & Street Paving", status: "100% Carpeted" },
      { item: "Underground Electrification Grid", status: "Installed & Operational" },
      { item: "Sui Gas & Water Supply Network", status: "Complete to Plot Demarcations" },
      { item: "Sewerage & Storm Water Drainage", status: "Engineered & Functional" },
      { item: "Sector Jamia Mosque", status: "Operational for Daily Prayers" },
      { item: "Hills Walk Commercial Avenue", status: "Active Construction & Handover" }
    ],
    statusNote: "Possession letters are officially issued by Zedem International upon clearance of all file dues and NDC issuance."
  },
  hillsWalkSection: {
    heading: "Hills Walk Commercial Promenade in Block C",
    tag: "Commercial Epicenter",
    leadParagraph: "Hills Walk is the signature open-air European style commercial and dining promenade situated centrally inside Block C. Designed to serve over 50,000 residents, it hosts brand flagship stores, coffee bistros, rooftop dining, and high-yield commercial plazas.",
    features: [
      "Open-air pedestrian-friendly paved walkways",
      "Designated multi-storey plaza plots (Ground + 4 to 6 storeys)",
      "High daily footfall from M-1 Motorway transit",
      "Massive commercial rental yields and capital appreciation"
    ],
    buttonText: "Explore Hills Walk Commercial",
    buttonLink: "/blocks/hills-walk",
    bannerImage: "/images/hills-walk-commercial-aerial.webp"
  },
  whoSuitsSection: {
    heading: "Why Invest in Faisal Hills Block C",
    suitsProfile: "Block C is the ideal choice for families planning immediate home construction and investors targeting commercial growth linked to Hills Walk.",
    reasons: [
      { title: "Direct M-1 Motorway Advantage", desc: "Shortest travel distance to the upcoming motorway interchange, making daily commutes to Islamabad / Rawalpindi effortless." },
      { title: "Immediate Possession & Building", desc: "Start building your home immediately without waiting years for earthwork or basic utilities." },
      { title: "Hills Walk Lifestyle Frontage", desc: "Enjoy world-class dining, cafes, and shopping right at your doorstep." },
      { title: "High Resale Liquidity", desc: "Block C is among the most traded sectors with high buyer demand from local and overseas Pakistanis." }
    ]
  },
  transferProcess: {
    heading: "Block C Allotment & Transfer Process",
    leadParagraph: "Transfers are conducted securely at the Zedem International Head Office through official biometric verification:",
    steps: [
      {
        point: "01",
        tag: "Step 1: Verification",
        title: "File & NDC Verification",
        points: ["Check genuine allotment record at Zedem office", "Obtain No Demand Certificate (NDC) confirming clear dues", "Verify seller identity against society ledger"],
        badge: "Zero Risk Verification"
      },
      {
        point: "02",
        tag: "Step 2: Documentation",
        title: "CNIC & Photographs",
        points: ["Two attested CNIC copies of buyer", "One CNIC copy of Next of Kin (Nominee)", "Two recent passport size color photos"],
        badge: "Official Documentation"
      },
      {
        point: "03",
        tag: "Step 3: Pay Order",
        title: "Official Transfer Fee",
        points: ["Bank Pay Order in favour of 'Zedem International'", "Official society receipt issuance", "Clear stamp duty as per government regulations"],
        badge: "Bank Draft"
      },
      {
        point: "04",
        tag: "Step 4: Allotment",
        title: "Transfer Handover",
        points: ["Biometric verification of both parties", "New registered Allotment Letter handover to buyer", "Immediate possession application eligibility"],
        badge: "Allotment Handover"
      }
    ],
    requiredDocuments: [
      "Original Allotment / Transfer Letter",
      "Valid CNIC / NICOP copies of Buyer and Seller",
      "Nominee CNIC copy",
      "Passport size photographs on blue background",
      "NDC clearance certificate from Zedem Head Office"
    ]
  },
  faqsSection: {
    heading: "Frequently Asked Questions — Block C",
    subline: "Official verified answers to the most common Block C inquiries:",
    faqs: [
      {
        q: "Where is Block C located in Faisal Hills?",
        a: "Block C is situated on the western side of Faisal Hills, connecting Block B to the upcoming M-1 Motorway Interchange route and hosting the iconic Hills Walk commercial promenade."
      },
      {
        q: "Is possession available in Block C?",
        a: "Yes. Possession is granted across developed streets in Block C. Numerous houses are already constructed and families are residing comfortably."
      },
      {
        q: "What plot sizes are available in Block C?",
        a: "Block C offers 5 Marla (25x50), 8 Marla (30x60), 10 Marla (35x70), 14 Marla (40x80), and 1 Kanal (50x90) residential plots, alongside prime commercial plots in Hills Walk."
      },
      {
        q: "What is Hills Walk in Block C?",
        a: "Hills Walk is the central commercial and retail promenade within Block C featuring pedestrian avenues, shopping arcades, cafes, and multi-storey commercial plazas."
      },
      {
        q: "How does Block C connect to the M-1 Motorway?",
        a: "Block C sits adjacent to the proposed dedicated Faisal Hills M-1 Motorway Interchange, providing direct motorway access without passing through the main GT Road."
      }
    ]
  },
  closingSiteVisitSection: {
    heading: "Block C Plots for Sale: Check Live Inventory",
    intro: "Contact our Senior Verification Desk to receive verified plot numbers, latest market rates, and schedule an on-ground site visit.",
    sellingPrompt: "Selling your plot in Block C? Get an official valuation and connect with verified buyers today.",
    whatsappNumber: "+92 333 1113177",
    phoneNumber: "+92 333 1113177",
    officeAddress: "Faisal Hills Main Entrance Boulevard, GT Road Taxila / Rawalpindi",
    formTitle: "Inquire About Block C Plots",
    formSubtitle: "Leave your details to receive verified inventory, location maps, and transfer guidance.",
    formButtonText: "SUBMIT BLOCK C INQUIRY",
    reviewedByNote: "Verified by Faisal Hills Property Verification Desk. Market rates and availability updated regularly based on recorded transactions at Zedem International."
  }
};

export function mergeBlockCCMS(incoming: any): BlockCCMSData {
  if (!incoming || typeof incoming !== 'object') return initialBlockCCMS;

  const incVer = incoming.verificationHeader || {};
  const incHero = incoming.hero || {};
  const incOver = incoming.overview || {};
  const incLoc = incoming.location || {};
  const incMap = incoming.masterPlan || {};
  const incSizes = incoming.plotSizesSection || {};
  const incPrice = incoming.priceScheduleSection || {};
  const incInfra = incoming.possessionAndInfra || {};
  const incHills = incoming.hillsWalkSection || {};
  const incWho = incoming.whoSuitsSection || {};
  const incTransfer = incoming.transferProcess || {};
  const incFaqs = incoming.faqsSection || {};
  const incClose = incoming.closingSiteVisitSection || {};

  return {
    verificationHeader: {
      reviewerName: cleanVerifyText(incVer.reviewerName || initialBlockCCMS.verificationHeader.reviewerName),
      reviewerRole: cleanVerifyText(incVer.reviewerRole || initialBlockCCMS.verificationHeader.reviewerRole),
      pricesVerifiedDate: cleanVerifyText(incVer.pricesVerifiedDate || initialBlockCCMS.verificationHeader.pricesVerifiedDate),
      possessionConfirmedDate: cleanVerifyText(incVer.possessionConfirmedDate || initialBlockCCMS.verificationHeader.possessionConfirmedDate),
      siteCheckedDate: cleanVerifyText(incVer.siteCheckedDate || initialBlockCCMS.verificationHeader.siteCheckedDate),
      badgeText: cleanVerifyText(incVer.badgeText || initialBlockCCMS.verificationHeader.badgeText)
    },
    hero: {
      eyebrow: cleanVerifyText(incHero.eyebrow || initialBlockCCMS.hero.eyebrow),
      title: cleanVerifyText(incHero.title || initialBlockCCMS.hero.title),
      subtitle: cleanVerifyText(incHero.subtitle || initialBlockCCMS.hero.subtitle),
      bgImage: cleanVerifyText(incHero.bgImage || initialBlockCCMS.hero.bgImage),
      badge1: cleanVerifyText(incHero.badge1 || initialBlockCCMS.hero.badge1),
      badge2: cleanVerifyText(incHero.badge2 || initialBlockCCMS.hero.badge2),
      badge3: cleanVerifyText(incHero.badge3 || initialBlockCCMS.hero.badge3)
    },
    overview: {
      h1: cleanVerifyText(incOver.h1 || initialBlockCCMS.overview.h1),
      leadParagraph1: cleanVerifyText(incOver.leadParagraph1 || initialBlockCCMS.overview.leadParagraph1),
      leadParagraph2: cleanVerifyText(incOver.leadParagraph2 || initialBlockCCMS.overview.leadParagraph2),
      photoUrl: cleanVerifyText(incOver.photoUrl || initialBlockCCMS.overview.photoUrl),
      photoAlt: cleanVerifyText(incOver.photoAlt || initialBlockCCMS.overview.photoAlt),
      photoTag: cleanVerifyText(incOver.photoTag || initialBlockCCMS.overview.photoTag),
      photoCaption: cleanVerifyText(incOver.photoCaption || initialBlockCCMS.overview.photoCaption),
      quickFacts: {
        position: cleanVerifyText(incOver.quickFacts?.position || initialBlockCCMS.overview.quickFacts.position),
        residentialSizes: cleanVerifyText(incOver.quickFacts?.residentialSizes || initialBlockCCMS.overview.quickFacts.residentialSizes),
        plotCount: cleanVerifyText(incOver.quickFacts?.plotCount || initialBlockCCMS.overview.quickFacts.plotCount),
        possession: cleanVerifyText(incOver.quickFacts?.possession || initialBlockCCMS.overview.quickFacts.possession),
        howYouBuy: cleanVerifyText(incOver.quickFacts?.howYouBuy || initialBlockCCMS.overview.quickFacts.howYouBuy),
        legalStatus: cleanVerifyText(incOver.quickFacts?.legalStatus || initialBlockCCMS.overview.quickFacts.legalStatus),
        hillsWalkAccess: cleanVerifyText(incOver.quickFacts?.hillsWalkAccess || initialBlockCCMS.overview.quickFacts.hillsWalkAccess),
        motorwayConnectivity: cleanVerifyText(incOver.quickFacts?.motorwayConnectivity || initialBlockCCMS.overview.quickFacts.motorwayConnectivity)
      },
      ctaStripText: cleanVerifyText(incOver.ctaStripText || initialBlockCCMS.overview.ctaStripText),
      ctaWhatsapp: cleanVerifyText(incOver.ctaWhatsapp || initialBlockCCMS.overview.ctaWhatsapp),
      ctaCall: cleanVerifyText(incOver.ctaCall || initialBlockCCMS.overview.ctaCall)
    },
    location: {
      heading: cleanVerifyText(incLoc.heading || initialBlockCCMS.location.heading),
      leadParagraph: cleanVerifyText(incLoc.leadParagraph || initialBlockCCMS.location.leadParagraph),
      boundaryNote: cleanVerifyText(incLoc.boundaryNote || initialBlockCCMS.location.boundaryNote),
      travelTimes: Array.isArray(incLoc.travelTimes) && incLoc.travelTimes.length > 0
        ? incLoc.travelTimes.map((t: any) => ({
            destination: cleanVerifyText(t.destination || ''),
            distance: cleanVerifyText(t.distance || ''),
            time: cleanVerifyText(t.time || ''),
            note: cleanVerifyText(t.note || '')
          }))
        : initialBlockCCMS.location.travelTimes,
      googleMapIframeUrl: cleanVerifyText(incLoc.googleMapIframeUrl || initialBlockCCMS.location.googleMapIframeUrl)
    },
    masterPlan: {
      heading: cleanVerifyText(incMap.heading || initialBlockCCMS.masterPlan.heading),
      subline: cleanVerifyText(incMap.subline || initialBlockCCMS.masterPlan.subline),
      description: cleanVerifyText(incMap.description || initialBlockCCMS.masterPlan.description),
      mapImage: cleanVerifyText(incMap.mapImage || initialBlockCCMS.masterPlan.mapImage),
      pdfDownloadUrl: cleanVerifyText(incMap.pdfDownloadUrl || initialBlockCCMS.masterPlan.pdfDownloadUrl),
      downloadButtonText: cleanVerifyText(incMap.downloadButtonText || initialBlockCCMS.masterPlan.downloadButtonText)
    },
    plotSizesSection: {
      heading: cleanVerifyText(incSizes.heading || initialBlockCCMS.plotSizesSection.heading),
      subline: cleanVerifyText(incSizes.subline || initialBlockCCMS.plotSizesSection.subline),
      tableRows: Array.isArray(incSizes.tableRows) && incSizes.tableRows.length > 0
        ? incSizes.tableRows.map((r: any) => ({
            dimensions: cleanVerifyText(r.dimensions || ''),
            sqFeet: cleanVerifyText(r.sqFeet || ''),
            sqYards: cleanVerifyText(r.sqYards || ''),
            soldAs: cleanVerifyText(r.soldAs || ''),
            status: cleanVerifyText(r.status || '')
          }))
        : initialBlockCCMS.plotSizesSection.tableRows,
      analysisNote: cleanVerifyText(incSizes.analysisNote || initialBlockCCMS.plotSizesSection.analysisNote)
    },
    priceScheduleSection: {
      heading: cleanVerifyText(incPrice.heading || initialBlockCCMS.priceScheduleSection.heading),
      subline: cleanVerifyText(incPrice.subline || initialBlockCCMS.priceScheduleSection.subline),
      disclaimerNote: cleanVerifyText(incPrice.disclaimerNote || initialBlockCCMS.priceScheduleSection.disclaimerNote),
      tableRows: Array.isArray(incPrice.tableRows) && incPrice.tableRows.length > 0
        ? incPrice.tableRows.map((r: any) => ({
            size: cleanVerifyText(r.size || ''),
            dimensions: cleanVerifyText(r.dimensions || ''),
            sqYards: cleanVerifyText(r.sqYards || ''),
            sqFeet: cleanVerifyText(r.sqFeet || ''),
            category: r.category || 'Residential',
            priceRange: cleanVerifyText(r.priceRange || ''),
            possession: cleanVerifyText(r.possession || ''),
            highlight: cleanVerifyText(r.highlight || '')
          }))
        : initialBlockCCMS.priceScheduleSection.tableRows,
      rateComparisonNote: cleanVerifyText(incPrice.rateComparisonNote || initialBlockCCMS.priceScheduleSection.rateComparisonNote)
    },
    possessionAndInfra: {
      heading: cleanVerifyText(incInfra.heading || initialBlockCCMS.possessionAndInfra.heading),
      lead: cleanVerifyText(incInfra.lead || initialBlockCCMS.possessionAndInfra.lead),
      tableRows: Array.isArray(incInfra.tableRows) && incInfra.tableRows.length > 0
        ? incInfra.tableRows.map((r: any) => ({
            item: cleanVerifyText(r.item || ''),
            status: cleanVerifyText(r.status || '')
          }))
        : initialBlockCCMS.possessionAndInfra.tableRows,
      statusNote: cleanVerifyText(incInfra.statusNote || initialBlockCCMS.possessionAndInfra.statusNote)
    },
    hillsWalkSection: {
      heading: cleanVerifyText(incHills.heading || initialBlockCCMS.hillsWalkSection.heading),
      tag: cleanVerifyText(incHills.tag || initialBlockCCMS.hillsWalkSection.tag),
      leadParagraph: cleanVerifyText(incHills.leadParagraph || initialBlockCCMS.hillsWalkSection.leadParagraph),
      features: Array.isArray(incHills.features) && incHills.features.length > 0
        ? incHills.features.map((f: string) => cleanVerifyText(f))
        : initialBlockCCMS.hillsWalkSection.features,
      buttonText: cleanVerifyText(incHills.buttonText || initialBlockCCMS.hillsWalkSection.buttonText),
      buttonLink: cleanVerifyText(incHills.buttonLink || initialBlockCCMS.hillsWalkSection.buttonLink),
      bannerImage: cleanVerifyText(incHills.bannerImage || initialBlockCCMS.hillsWalkSection.bannerImage)
    },
    whoSuitsSection: {
      heading: cleanVerifyText(incWho.heading || initialBlockCCMS.whoSuitsSection.heading),
      suitsProfile: cleanVerifyText(incWho.suitsProfile || initialBlockCCMS.whoSuitsSection.suitsProfile),
      reasons: Array.isArray(incWho.reasons) && incWho.reasons.length > 0
        ? incWho.reasons.map((r: any) => ({
            title: cleanVerifyText(r.title || ''),
            desc: cleanVerifyText(r.desc || '')
          }))
        : initialBlockCCMS.whoSuitsSection.reasons
    },
    transferProcess: {
      heading: cleanVerifyText(incTransfer.heading || initialBlockCCMS.transferProcess.heading),
      leadParagraph: cleanVerifyText(incTransfer.leadParagraph || initialBlockCCMS.transferProcess.leadParagraph),
      steps: Array.isArray(incTransfer.steps) && incTransfer.steps.length > 0
        ? incTransfer.steps.map((s: any, idx: number) => ({
            point: cleanVerifyText(s.point || `0${idx + 1}`),
            tag: cleanVerifyText(s.tag || `Step ${idx + 1}`),
            title: cleanVerifyText(s.title || ''),
            points: Array.isArray(s.points) ? s.points.map((p: string) => cleanVerifyText(p)) : [],
            badge: cleanVerifyText(s.badge || 'Verified Step')
          }))
        : initialBlockCCMS.transferProcess.steps,
      requiredDocuments: Array.isArray(incTransfer.requiredDocuments) && incTransfer.requiredDocuments.length > 0
        ? incTransfer.requiredDocuments.map((d: string) => cleanVerifyText(d))
        : initialBlockCCMS.transferProcess.requiredDocuments
    },
    faqsSection: {
      heading: cleanVerifyText(incFaqs.heading || initialBlockCCMS.faqsSection.heading),
      subline: cleanVerifyText(incFaqs.subline || initialBlockCCMS.faqsSection.subline),
      faqs: Array.isArray(incFaqs.faqs) && incFaqs.faqs.length > 0
        ? incFaqs.faqs.map((f: any) => ({
            q: cleanVerifyText(f.q || f.question || ''),
            a: cleanVerifyText(f.a || f.answer || '')
          }))
        : initialBlockCCMS.faqsSection.faqs
    },
    closingSiteVisitSection: {
      heading: cleanVerifyText(incClose.heading || initialBlockCCMS.closingSiteVisitSection.heading),
      intro: cleanVerifyText(incClose.intro || initialBlockCCMS.closingSiteVisitSection.intro),
      sellingPrompt: cleanVerifyText(incClose.sellingPrompt || initialBlockCCMS.closingSiteVisitSection.sellingPrompt),
      whatsappNumber: cleanVerifyText(incClose.whatsappNumber || initialBlockCCMS.closingSiteVisitSection.whatsappNumber),
      phoneNumber: cleanVerifyText(incClose.phoneNumber || initialBlockCCMS.closingSiteVisitSection.phoneNumber),
      officeAddress: cleanVerifyText(incClose.officeAddress || initialBlockCCMS.closingSiteVisitSection.officeAddress),
      formTitle: cleanVerifyText(incClose.formTitle || initialBlockCCMS.closingSiteVisitSection.formTitle),
      formSubtitle: cleanVerifyText(incClose.formSubtitle || initialBlockCCMS.closingSiteVisitSection.formSubtitle),
      formButtonText: cleanVerifyText(incClose.formButtonText || initialBlockCCMS.closingSiteVisitSection.formButtonText),
      reviewedByNote: cleanVerifyText(incClose.reviewedByNote || initialBlockCCMS.closingSiteVisitSection.reviewedByNote)
    }
  };
}

export async function fetchBlockCCMS(): Promise<BlockCCMSData> {
  let localData: BlockCCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const localStr = localStorage.getItem('faisal_block_c_cms');
      if (localStr) localData = mergeBlockCCMS(JSON.parse(localStr));
    } catch {}
  }

  const remote = await fetchSettingByKey<BlockCCMSData>('faisal_block_c_cms');
  if (remote) {
    const merged = localData ? mergeBlockCCMS({ ...remote, ...localData }) : mergeBlockCCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_block_c_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialBlockCCMS;
}

export async function saveBlockCCMS(cmsData: BlockCCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_block_c_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_block_c_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_block_c_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// =========================================================
// FAISAL HILLS HILLS WALK COMMERCIAL CMS SYSTEM
// =========================================================

export interface HillsWalkPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  sqFeet: string;
  category: 'Commercial';
  priceRange: string;
  approval: string;
  highlight: string;
}

export interface HillsWalkCMSData {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bgImage: string;
    badge1: string;
    badge2: string;
    badge3: string;
  };
  overview: {
    h1: string;
    leadParagraph: string;
    conceptDetails: string;
    photoUrl: string;
    photoAlt: string;
    photoTag: string;
    photoCaption: string;
    quickFacts: {
      totalArea: string;
      commercialCuttings: string;
      buildingHeight: string;
      footfallTarget: string;
      parkingCapacity: string;
      possessionStatus: string;
    };
  };
  location: {
    heading: string;
    leadParagraph: string;
    accessibilityNotes: string;
    googleMapEmbedUrl: string;
    driveTimes: { destination: string; distance: string; time: string; note: string }[];
  };
  masterPlan: {
    heading: string;
    description: string;
    mapImageUrl: string;
    mapPdfUrl: string;
    downloadButtonText: string;
  };
  priceSchedule: {
    heading: string;
    leadParagraph: string;
    rows: HillsWalkPriceRow[];
  };
  amenities: {
    heading: string;
    leadParagraph: string;
    items: { title: string; desc: string; category: string; iconType: string }[];
  };
  investmentRoi: {
    heading: string;
    leadParagraph: string;
    projectedYield: string;
    capitalGrowthRate: string;
    commercialAdvantage: string;
    keyPoints: { title: string; desc: string }[];
  };
  developmentStatus: {
    heading: string;
    leadParagraph: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    dronePhotoUrl: string;
    droneHeading: string;
    droneDesc: string;
  };
  faqs: {
    heading: string;
    items: { q: string; a: string }[];
  };
  inquirySection: {
    tag: string;
    heading: string;
    leadParagraph: string;
    whatsappNumber: string;
    phoneNumber: string;
    buttonText: string;
  };
}

export const initialHillsWalkCMS: HillsWalkCMSData = {
  hero: {
    eyebrow: "PREMIER EUROPEAN-STYLE OPEN-AIR COMMERCIAL PROMENADE",
    title: "Hills Walk Commercial Hub",
    subtitle: "Hills Walk is the signature commercial boulevard in Faisal Hills, offering ground+5 approved commercial plaza plots, pedestrian cafe streets, brand flagships, and exceptional rental yields.",
    bgImage: "/images/hills-walk-commercial-aerial.webp",
    badge1: "100% RDA Approved",
    badge2: "Ground + 5 Approved Height",
    badge3: "M-1 Gateway Access"
  },
  overview: {
    h1: "Hills Walk Commercial: The High-Street Dining & Retail Capital",
    leadParagraph: "Hills Walk is envisioned as a world-class outdoor retail and culinary promenade located centrally in Faisal Hills. Inspired by modern European shopping streets, it features broad pedestrian-only plazas, landscaped greenery, alfresco cafe seating, and high-density commercial developments.",
    conceptDetails: "Designed to serve an estimated resident population exceeding 100,000 across Faisal Hills, B-17, and Taxila, Hills Walk offers the highest footfall density and commercial rental yields in the entire zone.",
    photoUrl: "/images/hills-walk-commercial-aerial.webp",
    photoAlt: "Hills Walk Commercial Promenade Aerial Overview",
    photoTag: "High-Street Promenade",
    photoCaption: "Flagship Retail & Dining Promenade",
    quickFacts: {
      totalArea: "Over 50 Acres Central Promenade Axis",
      commercialCuttings: "4 Marla, 5.8 Marla, 8 Marla & Grand Arcades",
      buildingHeight: "Ground + 4 to Ground + 6 Storeys Approved",
      footfallTarget: "50,000+ Daily Visitors & Residents",
      parkingCapacity: "2,000+ Dedicated Multi-Bay Parking Slots",
      possessionStatus: "Commercial Development & Building Phase"
    }
  },
  location: {
    heading: "Hills Walk Location & Multi-Corridor Connectivity",
    leadParagraph: "Situated at the direct intersection of Block C and the central 150ft boulevard, Hills Walk enjoys instant access from the upcoming dedicated M-1 Motorway Interchange and the Main GT Road N-5.",
    accessibilityNotes: "Its central position ensures that every resident within Faisal Hills can reach Hills Walk within 3 to 7 minutes via wide signal-free avenues.",
    googleMapEmbedUrl: "https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed",
    driveTimes: [
      { destination: "Faisal Hills Main Entrance (GT Road)", distance: "2.8 km", time: "4 mins", note: "Via 225ft Boulevard" },
      { destination: "M-1 Motorway Dedicated Interchange", distance: "1.2 km", time: "2 mins", note: "Direct sector connection" },
      { destination: "Executive Block & Faisal Jewel", distance: "2.5 km", time: "4 mins", note: "Main arterial drive" },
      { destination: "Multi Gardens B-17 Commercial Center", distance: "4.5 km", time: "6 mins", note: "Direct link road" },
      { destination: "New Islamabad Airport Cargo & Terminal", distance: "25 km", time: "22 mins", note: "Via M-1 Motorway" }
    ]
  },
  masterPlan: {
    heading: "Hills Walk Master Layout & Commercial Avenue Grid",
    description: "The master plan separates high-speed vehicular parking from serene pedestrian dining arcades, guaranteeing a comfortable and luxurious shopping experience.",
    mapImageUrl: "/images/faisal-hills-executive-map.webp",
    mapPdfUrl: "/images/faisal-hills-executive-map.webp",
    downloadButtonText: "Download Commercial Layout PDF"
  },
  priceSchedule: {
    heading: "Hills Walk Commercial Plot Price Schedule",
    leadParagraph: "Verified market rates for commercial plaza cuttings in Hills Walk:",
    rows: [
      {
        size: "4 Marla Commercial Plaza",
        dimensions: "30 × 30",
        sqYards: "100 Sq. Yds",
        sqFeet: "900 Sq. Ft",
        category: "Commercial",
        priceRange: "PKR 2.20 Cr – 2.80 Cr",
        approval: "Ground + 4 Storey",
        highlight: "Prime promenade frontage ideal for retail cafes, fashion boutiques, and specialty clinics."
      },
      {
        size: "5.8 Marla Boulevard Commercial",
        dimensions: "40 × 40",
        sqYards: "145 Sq. Yds",
        sqFeet: "1,305 Sq. Ft",
        category: "Commercial",
        priceRange: "PKR 3.50 Cr – 4.80 Cr",
        approval: "Ground + 5 Storey",
        highlight: "High footfall avenue corner plot designed for corporate banking hubs, pharmacies, and brand flagship outlets."
      },
      {
        size: "8 Marla Luxury Commercial Arcade",
        dimensions: "45 × 40",
        sqYards: "200 Sq. Yds",
        sqFeet: "1,800 Sq. Ft",
        category: "Commercial",
        priceRange: "PKR 5.20 Cr – 6.90 Cr",
        approval: "Ground + 6 Storey",
        highlight: "Flagship multi-brand department store and rooftop restaurant plot with panoramic Margalla views."
      }
    ]
  },
  amenities: {
    heading: "World-Class Infrastructure & Anchor Features",
    leadParagraph: "Engineered to international commercial standards with state-of-the-art utilities:",
    items: [
      { title: "Broad Pedestrian Walkways", desc: "Italian cobble-style pedestrian paths, tree-shaded benches, and fountain plazas.", category: "Atmosphere", iconType: "Compass" },
      { title: "24/7 Dedicated Power Grid", desc: "Dual-source underground electrical infrastructure ensuring zero load shedding.", category: "Utility", iconType: "Zap" },
      { title: "High-Capacity Multi-Level Parking", desc: "Organized surface and underground parking bays accommodating 2,000+ vehicles.", category: "Civic", iconType: "Car" },
      { title: "Rooftop Dining & Skyline Cafes", desc: "Approved building bylaws for open-air rooftop culinary terraces facing Margalla.", category: "Hospitality", iconType: "Utensils" },
      { title: "Smart Surveillance & Security", desc: "Automated license-plate recognition (ANPR) and 24/7 centralized command room monitoring.", category: "Security", iconType: "ShieldCheck" },
      { title: "Dedicated Fire & Emergency Axis", desc: "Engineered emergency access lanes and underground fire hydrants throughout.", category: "Safety", iconType: "Activity" }
    ]
  },
  investmentRoi: {
    heading: "Investment Case & Projected Rental Returns",
    leadParagraph: "Why commercial plazas in Hills Walk deliver superior long-term yields compared to standard retail markets:",
    projectedYield: "9% – 12% Annual Rental Yield",
    capitalGrowthRate: "25%+ Annual Capital Appreciation",
    commercialAdvantage: "First-mover advantage before the official opening of the direct M-1 Motorway Interchange.",
    keyPoints: [
      { title: "Unmatched High-Street Demand", desc: "Brand franchises and national bank chains actively seeking flagship locations in northern Islamabad." },
      { title: "High-Density Captive Audience", desc: "Over 50,000 residential plots surrounding Hills Walk guarantee continuous foot traffic." },
      { title: "Flexible Construction Bylaws", desc: "Approved Ground + 5 storeys maximize usable leasable square footage per square yard." }
    ]
  },
  developmentStatus: {
    heading: "On-Ground Construction Progress",
    leadParagraph: "Road paving, central medians, and underground infrastructure are fully laid out. Several private commercial plazas have already commenced construction.",
    stat1Value: "95%+",
    stat1Label: "Road Infrastructure",
    stat2Value: "100%",
    stat2Label: "Underground Utilities",
    stat3Value: "Active",
    stat3Label: "Plaza Construction",
    dronePhotoUrl: "/images/hills-walk-commercial-aerial.webp",
    droneHeading: "Hills Walk Live Progress",
    droneDesc: "Asphalt carpeting, street lighting, and initial commercial arcade structures on-site."
  },
  faqs: {
    heading: "Frequently Asked Questions — Hills Walk",
    items: [
      { q: "What is Hills Walk in Faisal Hills?", a: "Hills Walk is the flagship European-style commercial, dining, and retail promenade located centrally in Block C of Faisal Hills Islamabad." },
      { q: "What commercial plot sizes are available in Hills Walk?", a: "Available cuttings include 4 Marla (30x30), 5.8 Marla (40x40), and 8 Marla (45x40) commercial plots approved for multi-storey plaza construction." },
      { q: "What building height is approved in Hills Walk?", a: "Building regulations permit Ground + 4 to Ground + 6 storeys depending on boulevard width and plot location." },
      { q: "Can I buy a plot on installments in Hills Walk?", a: "Commercial plots in Hills Walk are primarily traded on cash resale or structured developer settlements. Contact our sales desk for current booking options." }
    ]
  },
  inquirySection: {
    tag: "Commercial Advisory Desk",
    heading: "Secure Your Commercial Plaza Plot in Hills Walk",
    leadParagraph: "Inquire today for verified plot availability, architectural bylaws, and projected lease rates.",
    whatsappNumber: "+92 333 1113177",
    phoneNumber: "+92 333 1113177",
    buttonText: "CONTACT COMMERCIAL DESK"
  }
};

export function mergeHillsWalkCMS(incoming: any): HillsWalkCMSData {
  if (!incoming || typeof incoming !== 'object') return initialHillsWalkCMS;

  const incHero = incoming.hero || {};
  const incOver = incoming.overview || {};
  const incLoc = incoming.location || {};
  const incMap = incoming.masterPlan || {};
  const incPrice = incoming.priceSchedule || {};
  const incAmenities = incoming.amenities || {};
  const incRoi = incoming.investmentRoi || {};
  const incDev = incoming.developmentStatus || {};
  const incFaqs = incoming.faqs || {};
  const incInq = incoming.inquirySection || {};

  return {
    hero: {
      eyebrow: cleanVerifyText(incHero.eyebrow || initialHillsWalkCMS.hero.eyebrow),
      title: cleanVerifyText(incHero.title || initialHillsWalkCMS.hero.title),
      subtitle: cleanVerifyText(incHero.subtitle || initialHillsWalkCMS.hero.subtitle),
      bgImage: cleanVerifyText(incHero.bgImage || initialHillsWalkCMS.hero.bgImage),
      badge1: cleanVerifyText(incHero.badge1 || initialHillsWalkCMS.hero.badge1),
      badge2: cleanVerifyText(incHero.badge2 || initialHillsWalkCMS.hero.badge2),
      badge3: cleanVerifyText(incHero.badge3 || initialHillsWalkCMS.hero.badge3)
    },
    overview: {
      h1: cleanVerifyText(incOver.h1 || initialHillsWalkCMS.overview.h1),
      leadParagraph: cleanVerifyText(incOver.leadParagraph || initialHillsWalkCMS.overview.leadParagraph),
      conceptDetails: cleanVerifyText(incOver.conceptDetails || initialHillsWalkCMS.overview.conceptDetails),
      photoUrl: cleanVerifyText(incOver.photoUrl || initialHillsWalkCMS.overview.photoUrl),
      photoAlt: cleanVerifyText(incOver.photoAlt || initialHillsWalkCMS.overview.photoAlt),
      photoTag: cleanVerifyText(incOver.photoTag || initialHillsWalkCMS.overview.photoTag),
      photoCaption: cleanVerifyText(incOver.photoCaption || initialHillsWalkCMS.overview.photoCaption),
      quickFacts: {
        totalArea: cleanVerifyText(incOver.quickFacts?.totalArea || initialHillsWalkCMS.overview.quickFacts.totalArea),
        commercialCuttings: cleanVerifyText(incOver.quickFacts?.commercialCuttings || initialHillsWalkCMS.overview.quickFacts.commercialCuttings),
        buildingHeight: cleanVerifyText(incOver.quickFacts?.buildingHeight || initialHillsWalkCMS.overview.quickFacts.buildingHeight),
        footfallTarget: cleanVerifyText(incOver.quickFacts?.footfallTarget || initialHillsWalkCMS.overview.quickFacts.footfallTarget),
        parkingCapacity: cleanVerifyText(incOver.quickFacts?.parkingCapacity || initialHillsWalkCMS.overview.quickFacts.parkingCapacity),
        possessionStatus: cleanVerifyText(incOver.quickFacts?.possessionStatus || initialHillsWalkCMS.overview.quickFacts.possessionStatus)
      }
    },
    location: {
      heading: cleanVerifyText(incLoc.heading || initialHillsWalkCMS.location.heading),
      leadParagraph: cleanVerifyText(incLoc.leadParagraph || initialHillsWalkCMS.location.leadParagraph),
      accessibilityNotes: cleanVerifyText(incLoc.accessibilityNotes || initialHillsWalkCMS.location.accessibilityNotes),
      googleMapEmbedUrl: cleanVerifyText(incLoc.googleMapEmbedUrl || initialHillsWalkCMS.location.googleMapEmbedUrl),
      driveTimes: Array.isArray(incLoc.driveTimes) && incLoc.driveTimes.length > 0
        ? incLoc.driveTimes.map((d: any) => ({
            destination: cleanVerifyText(d.destination || ''),
            distance: cleanVerifyText(d.distance || ''),
            time: cleanVerifyText(d.time || ''),
            note: cleanVerifyText(d.note || '')
          }))
        : initialHillsWalkCMS.location.driveTimes
    },
    masterPlan: {
      heading: cleanVerifyText(incMap.heading || initialHillsWalkCMS.masterPlan.heading),
      description: cleanVerifyText(incMap.description || initialHillsWalkCMS.masterPlan.description),
      mapImageUrl: cleanVerifyText(incMap.mapImageUrl || initialHillsWalkCMS.masterPlan.mapImageUrl),
      mapPdfUrl: cleanVerifyText(incMap.mapPdfUrl || initialHillsWalkCMS.masterPlan.mapPdfUrl),
      downloadButtonText: cleanVerifyText(incMap.downloadButtonText || initialHillsWalkCMS.masterPlan.downloadButtonText)
    },
    priceSchedule: {
      heading: cleanVerifyText(incPrice.heading || initialHillsWalkCMS.priceSchedule.heading),
      leadParagraph: cleanVerifyText(incPrice.leadParagraph || initialHillsWalkCMS.priceSchedule.leadParagraph),
      rows: Array.isArray(incPrice.rows) && incPrice.rows.length > 0
        ? incPrice.rows.map((r: any) => ({
            size: cleanVerifyText(r.size || ''),
            dimensions: cleanVerifyText(r.dimensions || ''),
            sqYards: cleanVerifyText(r.sqYards || ''),
            sqFeet: cleanVerifyText(r.sqFeet || ''),
            category: 'Commercial',
            priceRange: cleanVerifyText(r.priceRange || ''),
            approval: cleanVerifyText(r.approval || ''),
            highlight: cleanVerifyText(r.highlight || '')
          }))
        : initialHillsWalkCMS.priceSchedule.rows
    },
    amenities: {
      heading: cleanVerifyText(incAmenities.heading || initialHillsWalkCMS.amenities.heading),
      leadParagraph: cleanVerifyText(incAmenities.leadParagraph || initialHillsWalkCMS.amenities.leadParagraph),
      items: Array.isArray(incAmenities.items) && incAmenities.items.length > 0
        ? incAmenities.items.map((it: any) => ({
            title: cleanVerifyText(it.title || ''),
            desc: cleanVerifyText(it.desc || ''),
            category: cleanVerifyText(it.category || 'Atmosphere'),
            iconType: cleanVerifyText(it.iconType || 'Sparkles')
          }))
        : initialHillsWalkCMS.amenities.items
    },
    investmentRoi: {
      heading: cleanVerifyText(incRoi.heading || initialHillsWalkCMS.investmentRoi.heading),
      leadParagraph: cleanVerifyText(incRoi.leadParagraph || initialHillsWalkCMS.investmentRoi.leadParagraph),
      projectedYield: cleanVerifyText(incRoi.projectedYield || initialHillsWalkCMS.investmentRoi.projectedYield),
      capitalGrowthRate: cleanVerifyText(incRoi.capitalGrowthRate || initialHillsWalkCMS.investmentRoi.capitalGrowthRate),
      commercialAdvantage: cleanVerifyText(incRoi.commercialAdvantage || initialHillsWalkCMS.investmentRoi.commercialAdvantage),
      keyPoints: Array.isArray(incRoi.keyPoints) && incRoi.keyPoints.length > 0
        ? incRoi.keyPoints.map((k: any) => ({
            title: cleanVerifyText(k.title || ''),
            desc: cleanVerifyText(k.desc || '')
          }))
        : initialHillsWalkCMS.investmentRoi.keyPoints
    },
    developmentStatus: {
      heading: cleanVerifyText(incDev.heading || initialHillsWalkCMS.developmentStatus.heading),
      leadParagraph: cleanVerifyText(incDev.leadParagraph || initialHillsWalkCMS.developmentStatus.leadParagraph),
      stat1Value: cleanVerifyText(incDev.stat1Value || initialHillsWalkCMS.developmentStatus.stat1Value),
      stat1Label: cleanVerifyText(incDev.stat1Label || initialHillsWalkCMS.developmentStatus.stat1Label),
      stat2Value: cleanVerifyText(incDev.stat2Value || initialHillsWalkCMS.developmentStatus.stat2Value),
      stat2Label: cleanVerifyText(incDev.stat2Label || initialHillsWalkCMS.developmentStatus.stat2Label),
      stat3Value: cleanVerifyText(incDev.stat3Value || initialHillsWalkCMS.developmentStatus.stat3Value),
      stat3Label: cleanVerifyText(incDev.stat3Label || initialHillsWalkCMS.developmentStatus.stat3Label),
      dronePhotoUrl: cleanVerifyText(incDev.dronePhotoUrl || initialHillsWalkCMS.developmentStatus.dronePhotoUrl),
      droneHeading: cleanVerifyText(incDev.droneHeading || initialHillsWalkCMS.developmentStatus.droneHeading),
      droneDesc: cleanVerifyText(incDev.droneDesc || initialHillsWalkCMS.developmentStatus.droneDesc)
    },
    faqs: {
      heading: cleanVerifyText(incFaqs.heading || initialHillsWalkCMS.faqs.heading),
      items: Array.isArray(incFaqs.items) && incFaqs.items.length > 0
        ? incFaqs.items.map((f: any) => ({
            q: cleanVerifyText(f.q || f.question || ''),
            a: cleanVerifyText(f.a || f.answer || '')
          }))
        : initialHillsWalkCMS.faqs.items
    },
    inquirySection: {
      tag: cleanVerifyText(incInq.tag || initialHillsWalkCMS.inquirySection.tag),
      heading: cleanVerifyText(incInq.heading || initialHillsWalkCMS.inquirySection.heading),
      leadParagraph: cleanVerifyText(incInq.leadParagraph || initialHillsWalkCMS.inquirySection.leadParagraph),
      whatsappNumber: cleanVerifyText(incInq.whatsappNumber || initialHillsWalkCMS.inquirySection.whatsappNumber),
      phoneNumber: cleanVerifyText(incInq.phoneNumber || initialHillsWalkCMS.inquirySection.phoneNumber),
      buttonText: cleanVerifyText(incInq.buttonText || initialHillsWalkCMS.inquirySection.buttonText)
    }
  };
}

export async function fetchHillsWalkCMS(): Promise<HillsWalkCMSData> {
  let localData: HillsWalkCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const localStr = localStorage.getItem('faisal_hills_walk_cms');
      if (localStr) localData = mergeHillsWalkCMS(JSON.parse(localStr));
    } catch {}
  }

  const remote = await fetchSettingByKey<HillsWalkCMSData>('faisal_hills_walk_cms');
  if (remote) {
    const merged = localData ? mergeHillsWalkCMS({ ...remote, ...localData }) : mergeHillsWalkCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_hills_walk_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialHillsWalkCMS;
}

export async function saveHillsWalkCMS(cmsData: HillsWalkCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_hills_walk_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_hills_walk_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_hills_walk_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// =========================================================
// FAISAL HILLS FAISAL JEWEL SKYSCRAPER CMS SYSTEM
// =========================================================

export interface JewelUnitItem {
  id: string;
  unitNumber: string;
  category: 'Commercial Plot / Showroom' | 'Commercial Shop' | 'Food Court' | 'Corporate Office' | '1-Bed Apartment' | '2-Bed Apartment' | '3-Bed Penthouse' | '4-Star Hotel Suite';
  floorLevel: string;
  dimensions: string;
  areaSqFt: number;
  priceFormatted: string;
  downPaymentFormatted: string;
  quarterlyInstallmentFormatted: string;
  status: 'Available' | 'Hot Investment' | 'Fast Selling' | 'Limited Units';
  facing: string;
  features: string[];
  description: string;
  image: string;
}

export interface FaisalJewelCMSData {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bgImage: string;
    badge1: string;
    badge2: string;
    badge3: string;
  };
  overview: {
    h1: string;
    leadParagraph: string;
    expandedDetails: string;
    photoUrl: string;
    photoAlt: string;
    photoTag: string;
    photoCaption: string;
    specs: {
      totalFloors: string;
      buildingHeight: string;
      projectType: string;
      location: string;
      developer: string;
      completionTarget: string;
    };
  };
  floorDistribution: {
    heading: string;
    leadParagraph: string;
    floors: {
      levelRange: string;
      category: string;
      title: string;
      description: string;
      highlights: string[];
      iconType: string;
    }[];
  };
  unitsInventory: {
    heading: string;
    leadParagraph: string;
    units: JewelUnitItem[];
  };
  hotelAndAmenities: {
    heading: string;
    leadParagraph: string;
    items: {
      title: string;
      desc: string;
      category: string;
      iconType: string;
    }[];
  };
  paymentPlan: {
    heading: string;
    leadParagraph: string;
    installmentsDuration: string;
    downPaymentPercentage: string;
    quarterlyCount: string;
    discountNote: string;
    samplePlans: {
      category: string;
      sizeSqFt: string;
      totalPrice: string;
      downPayment: string;
      quarterlyInstallment: string;
      onPossession: string;
    }[];
  };
  constructionProgress: {
    heading: string;
    leadParagraph: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    dronePhotoUrl: string;
    droneHeading: string;
    droneDesc: string;
  };
  faqs: {
    heading: string;
    items: { q: string; a: string }[];
  };
  /**
   * Embedded map for the Faisal Jewel location section.
   *
   * Added because the section previously rendered a hardcoded Google embed URL
   * that no dashboard screen could change.
   */
  googleMapEmbedUrl: string;
  inquirySection: {
    tag: string;
    heading: string;
    leadParagraph: string;
    whatsappNumber: string;
    phoneNumber: string;
    buttonText: string;
  };
}

export const initialFaisalJewelCMS: FaisalJewelCMSData = {
  hero: {
    eyebrow: "27-STOREY ICONIC SKYSCRAPER & LUXURY HOTEL LANDMARK",
    title: "Faisal Jewel Islamabad",
    subtitle: "Faisal Jewel is a 27-storey architectural masterpiece in Executive Block, featuring luxury residential apartments, international 4-star hotel suites, corporate offices, and a world-class shopping mall.",
    bgImage: "/images/faisal-jewel-building.webp",
    badge1: "27 Storeys Tall",
    badge2: "4-Star Hotel Suites",
    badge3: "Executive Block GT Road Entrance"
  },
  overview: {
    h1: "Faisal Jewel: 27-Storey Luxury High-Rise & Mall",
    leadParagraph: "Faisal Jewel is the flagship skyscraper development by Faisal Town Group & Zedem International. Soaring 27 storeys high at the prestigious main entrance of Faisal Hills on GT Road (N-5), it stands as the tallest and most luxurious mixed-use landmark in the entire Rawalpindi-Taxila region.",
    expandedDetails: "Combining world-class shopping arcades, corporate business headquarters, branded 4-star hotel suites, and panoramic residential penthouses facing the Margalla Hills, Faisal Jewel offers an unmatched investment opportunity with proven capital growth.",
    photoUrl: "/images/faisal-jewel-building.webp",
    photoAlt: "Faisal Jewel 27-Storey Architectural Tower View",
    photoTag: "27-Storey Masterpiece",
    photoCaption: "Flagship Luxury Highrise Landmark",
    specs: {
      totalFloors: "27 Storeys + 3 Basements",
      buildingHeight: "Over 350 Feet",
      projectType: "Mega Mixed-Use (Mall, Hotel, Offices, Apartments)",
      location: "Executive Block, Main GT Road N-5 Entrance",
      developer: "Zedem International & Faisal Town Group",
      completionTarget: "Under Fast-Track Structural Execution"
    }
  },
  floorDistribution: {
    heading: "27-Storey Vertical Floor Distribution",
    leadParagraph: "Architecturally zoned into specialized commercial, hospitality, and residential tiers:",
    floors: [
      {
        levelRange: "Basements B1 – B3",
        category: "Parking & Logistics",
        title: "Dedicated Multi-Level Basement Parking",
        description: "3 underground basement levels with intelligent valet management and capacity for 1,500+ vehicles.",
        highlights: ["Automated parking sensors", "EV charging stations", "24/7 security surveillance"],
        iconType: "Car"
      },
      {
        levelRange: "Lower Ground – 3rd Floor",
        category: "Mega Shopping Mall",
        title: "International Retail Mega Mall & Food Court",
        description: "Centrally air-conditioned retail floors hosting world-class fashion brands, gold souk, and international food court.",
        highlights: ["Central atrium escalators", "Hypermarket anchor", "Panoramic glass elevators"],
        iconType: "ShoppingBag"
      },
      {
        levelRange: "4th Floor – 7th Floor",
        category: "Corporate Hub",
        title: "Executive Corporate Offices & Business Suites",
        description: "Smart corporate workspaces with fiber connectivity, conference boardrooms, and executive reception lounges.",
        highlights: ["High-speed fiber internet", "Meeting rooms", "Dedicated corporate elevators"],
        iconType: "Building2"
      },
      {
        levelRange: "8th Floor – 14th Floor",
        category: "4-Star Hospitality",
        title: "International 4-Star Branded Hotel Suites",
        description: "Fully serviced hotel suites managed by premier hospitality operators with guaranteed rental management.",
        highlights: ["24/7 concierge & room service", "Executive lounge", "High rental dividend yield"],
        iconType: "Hotel"
      },
      {
        levelRange: "15th Floor – 24th Floor",
        category: "Luxury Living",
        title: "1, 2 & 3 Bedroom Signature Apartments",
        description: "Ultra-luxury residential suites with floor-to-ceiling glass windows and panoramic Margalla Hills vistas.",
        highlights: ["Margalla view balconies", "Imported Italian fittings", "Smart home automation"],
        iconType: "Home"
      },
      {
        levelRange: "25th Floor – 27th Floor",
        category: "Sky Penthouses",
        title: "Presidential Sky Penthouses & Rooftop Club",
        description: "Exclusive duplex penthouses with private sky terraces, rooftop infinity pool, and sky restaurant.",
        highlights: ["Private rooftop plunge pool", "360-degree hill panorama", "VIP private lift access"],
        iconType: "Sparkles"
      }
    ]
  },
  unitsInventory: {
    heading: "Available Commercial, Office & Residential Units",
    leadParagraph: "Explore customizable unit inventory across all levels with official launch prices:",
    units: [
      {
        id: "fj-com-showroom-01",
        unitNumber: "FJ-COM-G01",
        category: "Commercial Plot / Showroom",
        floorLevel: "Ground Floor Grand Boulevard",
        dimensions: "35 x 42",
        areaSqFt: 1470,
        priceFormatted: "PKR 5.88 Crore",
        downPaymentFormatted: "PKR 1.17 Crore (20%)",
        quarterlyInstallmentFormatted: "PKR 35.2 Lacs (12 Qtrs)",
        status: "Hot Investment",
        facing: "Main Boulevard 225ft & Arc Gate Facing",
        features: ["Double Height Ceilings", "Direct Boulevard Entrance", "Highest Footfall Visibility", "Ideal for Bank / Auto Showroom / Flagship Brand"],
        description: "Prime street-level double-height commercial showroom plot commanding immediate exposure from the Main GT Road Arc Gate.",
        image: "/images/faisal-jewel-building.webp"
      },
      {
        id: "fj-mall-shop-102",
        unitNumber: "FJ-M-102",
        category: "Commercial Shop",
        floorLevel: "1st Floor Mega Fashion Arcade",
        dimensions: "18 x 25",
        areaSqFt: 450,
        priceFormatted: "PKR 1.80 Crore",
        downPaymentFormatted: "PKR 36.0 Lacs (20%)",
        quarterlyInstallmentFormatted: "PKR 10.8 Lacs (12 Qtrs)",
        status: "Fast Selling",
        facing: "Central Atrium Glass Lift Facing",
        features: ["Clear Glass Frontage", "Heavy Retail Circulation", "Fully Air Conditioned", "High Capital Appreciation"],
        description: "Atrium-facing luxury retail shop designed for apparel brands, footwear chains, and specialty fragrance boutiques.",
        image: "/images/faisal-jewel-building.webp"
      },
      {
        id: "fj-food-court-05",
        unitNumber: "FJ-FC-05",
        category: "Food Court",
        floorLevel: "3rd Floor International Dining Deck",
        dimensions: "16 x 20",
        areaSqFt: 320,
        priceFormatted: "PKR 1.44 Crore",
        downPaymentFormatted: "PKR 28.8 Lacs (20%)",
        quarterlyInstallmentFormatted: "PKR 8.6 Lacs (12 Qtrs)",
        status: "Limited Units",
        facing: "Food Court Main Seating Deck & Margalla Terrace",
        features: ["Dedicated Kitchen Gas / Exhaust Duct", "Shared 500-Seater Dining Hall", "Outdoor Terrace Seating", "High Turnover Footfall"],
        description: "Turnkey food court outlet designed for fast food franchises, continental cafes, and live culinary stations.",
        image: "/images/faisal-jewel-building.webp"
      },
      {
        id: "fj-corp-off-501",
        unitNumber: "FJ-CO-501",
        category: "Corporate Office",
        floorLevel: "5th Floor Corporate Executive Suite",
        dimensions: "24 x 35",
        areaSqFt: 840,
        priceFormatted: "PKR 1.68 Crore",
        downPaymentFormatted: "PKR 33.6 Lacs (20%)",
        quarterlyInstallmentFormatted: "PKR 10.0 Lacs (12 Qtrs)",
        status: "Available",
        facing: "GT Road Panoramic Cityline",
        features: ["High-Speed Elevators", "Dedicated Corporate Lobby", "High Rental Demand", "Modern Glass Facade"],
        description: "Executive office suite tailored for multinational firms, fintech headquarters, software houses, and legal consultancies.",
        image: "/images/faisal-jewel-building.webp"
      },
      {
        id: "fj-apt-1bed-1604",
        unitNumber: "FJ-A-1604",
        category: "1-Bed Apartment",
        floorLevel: "16th Floor Executive Sky Residence",
        dimensions: "22 x 32",
        areaSqFt: 704,
        priceFormatted: "PKR 1.26 Crore",
        downPaymentFormatted: "PKR 25.2 Lacs (20%)",
        quarterlyInstallmentFormatted: "PKR 7.5 Lacs (12 Qtrs)",
        status: "Fast Selling",
        facing: "Margalla Hills View",
        features: ["Scenic Hill View Balcony", "Open Concept American Kitchen", "Dedicated Covered Parking", "Smart Access Locks"],
        description: "Elegant 1-bedroom luxury apartment with modern kitchen, spacious en-suite bath, and balcony facing Margalla.",
        image: "/images/faisal-jewel-building.webp"
      },
      {
        id: "fj-apt-2bed-1908",
        unitNumber: "FJ-A-1908",
        category: "2-Bed Apartment",
        floorLevel: "19th Floor Panorama Residence",
        dimensions: "32 x 40",
        areaSqFt: 1280,
        priceFormatted: "PKR 2.30 Crore",
        downPaymentFormatted: "PKR 46.0 Lacs (20%)",
        quarterlyInstallmentFormatted: "PKR 13.8 Lacs (12 Qtrs)",
        status: "Hot Investment",
        facing: "Corner Double Facing (Margalla Hills + Boulevard)",
        features: ["Corner Panoramic Balcony", "Maid Room / Store", "Imported Tile Flooring", "Central Air Conditioning Pre-installed"],
        description: "Spacious 2-bedroom corner luxury apartment with double balcony and expansive living hall.",
        image: "/images/faisal-jewel-building.webp"
      },
      {
        id: "fj-hotel-suite-1102",
        unitNumber: "FJ-HT-1102",
        category: "4-Star Hotel Suite",
        floorLevel: "11th Floor Royal Hospitality Tier",
        dimensions: "20 x 28",
        areaSqFt: 560,
        priceFormatted: "PKR 1.40 Crore",
        downPaymentFormatted: "PKR 28.0 Lacs (20%)",
        quarterlyInstallmentFormatted: "PKR 8.4 Lacs (12 Qtrs)",
        status: "Limited Units",
        facing: "Boulevard & Civic Monument View",
        features: ["Fully Furnished Hotel Spec", "Hands-Free Rental Pool", "Free Annual Stays for Owner", "Professional Hotel Operator Management"],
        description: "Fully furnished 4-star hotel suite generating monthly passive rental dividend under centralized management.",
        image: "/images/faisal-jewel-building.webp"
      },
      {
        id: "fj-penthouse-2601",
        unitNumber: "FJ-PH-2601",
        category: "3-Bed Penthouse",
        floorLevel: "26th Floor Presidential Penthouse Suite",
        dimensions: "45 x 65",
        areaSqFt: 2925,
        priceFormatted: "PKR 5.85 Crore",
        downPaymentFormatted: "PKR 1.17 Crore (20%)",
        quarterlyInstallmentFormatted: "PKR 35.1 Lacs (12 Qtrs)",
        status: "Limited Units",
        facing: "360-Degree Panoramic View (Margalla + GT Road + Hills)",
        features: ["Private Sky Terrace Garden", "Duplex Double Height Living", "Private Lift Key Access", "Jacuzzi & Luxury Master Suite"],
        description: "Crown jewel presidential penthouse offering 360-degree vistas, private sky deck, and bespoke interior architecture.",
        image: "/images/faisal-jewel-building.webp"
      }
    ]
  },
  hotelAndAmenities: {
    heading: "5-Star Lifestyle Amenities & Tower Facilities",
    leadParagraph: "Faisal Jewel integrates unmatched luxury amenities for residents, guests, and businesses:",
    items: [
      { title: "Rooftop Infinity Swimming Pool", desc: "Heated infinity pool overlooking the Margalla Hills on the 27th floor.", category: "Wellness", iconType: "Waves" },
      { title: "State-of-the-Art Fitness Club", desc: "Fully equipped gymnasium with sauna, steam bath, and personal training suites.", category: "Health", iconType: "Activity" },
      { title: "High-Speed Elevators & Cargo Lifts", desc: "12 imported Schindler high-speed elevators with smart destination dispatching.", category: "Engineering", iconType: "Zap" },
      { title: "Central Air-Conditioning & HVAC", desc: "VRF energy-efficient central cooling and heating systems throughout.", category: "Climate", iconType: "Sparkles" },
      { title: "24/7 Security & Fire Suppression", desc: "Automated smoke detectors, pressurized emergency fire staircases, and 24/7 CCTV.", category: "Safety", iconType: "ShieldCheck" },
      { title: "Valet Parking & Car Concierge", desc: "Multi-level subterranean basement parking with dedicated valet service.", category: "Convenience", iconType: "Car" }
    ]
  },
  paymentPlan: {
    heading: "Flexible 4-Year Installment Plan",
    leadParagraph: "Book your luxury apartment, showroom, corporate office, or hotel suite on 16 quarterly installments:",
    installmentsDuration: "4 Years (16 Quarterly Installments)",
    downPaymentPercentage: "20% Booking Amount",
    quarterlyCount: "16 Quarterly Installments (70%)",
    discountNote: "10% Special Discount available on 100% full upfront cash payment.",
    samplePlans: [
      { category: "1-Bed Luxury Apartment", sizeSqFt: "700 Sq. Ft", totalPrice: "PKR 1.26 Crore", downPayment: "PKR 25.2 Lacs", quarterlyInstallment: "PKR 5.5 Lacs", onPossession: "PKR 12.6 Lacs" },
      { category: "2-Bed Luxury Apartment", sizeSqFt: "1,280 Sq. Ft", totalPrice: "PKR 2.30 Crore", downPayment: "PKR 46.0 Lacs", quarterlyInstallment: "PKR 10.0 Lacs", onPossession: "PKR 23.0 Lacs" },
      { category: "Commercial Shop (Mall)", sizeSqFt: "450 Sq. Ft", totalPrice: "PKR 1.80 Crore", downPayment: "PKR 36.0 Lacs", quarterlyInstallment: "PKR 7.8 Lacs", onPossession: "PKR 18.0 Lacs" },
      { category: "Executive Corporate Office", sizeSqFt: "840 Sq. Ft", totalPrice: "PKR 1.68 Crore", downPayment: "PKR 33.6 Lacs", quarterlyInstallment: "PKR 7.3 Lacs", onPossession: "PKR 16.8 Lacs" },
      { category: "4-Star Serviced Hotel Suite", sizeSqFt: "560 Sq. Ft", totalPrice: "PKR 1.40 Crore", downPayment: "PKR 28.0 Lacs", quarterlyInstallment: "PKR 6.1 Lacs", onPossession: "PKR 14.0 Lacs" }
    ]
  },
  constructionProgress: {
    heading: "On-Ground Structural Construction Progress",
    leadParagraph: "Heavy excavation, piling works, and subterranean basement casting are executing at rapid speed under supervision of international structural consultants.",
    stat1Value: "3 Basements",
    stat1Label: "Structure Casted",
    stat2Value: "100%",
    stat2Label: "Deep Piling Complete",
    stat3Value: "On Schedule",
    stat3Label: "Tower Handover Target",
    dronePhotoUrl: "/images/faisal-jewel-building.webp",
    droneHeading: "Faisal Jewel Live Site Progress",
    droneDesc: "Continuous concrete pouring, tower cranes in active operation at Executive Block entrance."
  },
  faqs: {
    heading: "Frequently Asked Questions — Faisal Jewel",
    items: [
      { q: "Where is Faisal Jewel located?", a: "Faisal Jewel is situated directly at the Main GT Road entrance within the Executive Block of Faisal Hills Islamabad." },
      { q: "How many floors does Faisal Jewel have?", a: "Faisal Jewel features 27 storeys above ground and 3 underground basement parking levels." },
      { q: "What types of properties can I buy in Faisal Jewel?", a: "You can purchase commercial shops, food court outlets, corporate offices, 1, 2, and 3-bed apartments, 4-star hotel suites, and rooftop sky penthouses." },
      { q: "What is the payment schedule for Faisal Jewel?", a: "Bookings start with a 20% down payment, followed by 16 quarterly installments spread across 4 years." },
      { q: "Is Faisal Jewel approved by the RDA?", a: "Yes. Faisal Jewel is fully sanctioned under the official RDA approved master layout of Faisal Hills." }
    ]
  },
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13269.456075191247!2d72.7845308!3d33.7275817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa196120894bb%3A0xe541ca62c4c8d5a8!2sFaisal%20Hills%2C%20Taxila%2C%20Rawalpindi!5e0!3m2!1sen!2s",
  inquirySection: {
    tag: "VIP Booking Advisory",
    heading: "Book Your Luxury Suite in Faisal Jewel",
    leadParagraph: "Leave your contact details to receive full floor plans, unit availability, and customized payment schedules directly on WhatsApp.",
    whatsappNumber: "+92 333 1113177",
    phoneNumber: "+92 333 1113177",
    buttonText: "REQUEST VIP BROCHURE"
  }
};

export function mergeFaisalJewelCMS(incoming: any): FaisalJewelCMSData {
  if (!incoming || typeof incoming !== 'object') return initialFaisalJewelCMS;

  const incHero = incoming.hero || {};
  const incOver = incoming.overview || {};
  const incFloors = incoming.floorDistribution || {};
  const incUnits = incoming.unitsInventory || {};
  const incHotel = incoming.hotelAndAmenities || {};
  const incPay = incoming.paymentPlan || {};
  const incDev = incoming.constructionProgress || {};
  const incFaqs = incoming.faqs || {};
  const incInq = incoming.inquirySection || {};

  return {
    hero: {
      eyebrow: cleanVerifyText(incHero.eyebrow || initialFaisalJewelCMS.hero.eyebrow),
      title: cleanVerifyText(incHero.title || initialFaisalJewelCMS.hero.title),
      subtitle: cleanVerifyText(incHero.subtitle || initialFaisalJewelCMS.hero.subtitle),
      bgImage: cleanVerifyText(incHero.bgImage || initialFaisalJewelCMS.hero.bgImage),
      badge1: cleanVerifyText(incHero.badge1 || initialFaisalJewelCMS.hero.badge1),
      badge2: cleanVerifyText(incHero.badge2 || initialFaisalJewelCMS.hero.badge2),
      badge3: cleanVerifyText(incHero.badge3 || initialFaisalJewelCMS.hero.badge3)
    },
    overview: {
      h1: cleanVerifyText(incOver.h1 || initialFaisalJewelCMS.overview.h1),
      leadParagraph: cleanVerifyText(incOver.leadParagraph || initialFaisalJewelCMS.overview.leadParagraph),
      expandedDetails: cleanVerifyText(incOver.expandedDetails || initialFaisalJewelCMS.overview.expandedDetails),
      photoUrl: cleanVerifyText(incOver.photoUrl || initialFaisalJewelCMS.overview.photoUrl),
      photoAlt: cleanVerifyText(incOver.photoAlt || initialFaisalJewelCMS.overview.photoAlt),
      photoTag: cleanVerifyText(incOver.photoTag || initialFaisalJewelCMS.overview.photoTag),
      photoCaption: cleanVerifyText(incOver.photoCaption || initialFaisalJewelCMS.overview.photoCaption),
      specs: {
        totalFloors: cleanVerifyText(incOver.specs?.totalFloors || initialFaisalJewelCMS.overview.specs.totalFloors),
        buildingHeight: cleanVerifyText(incOver.specs?.buildingHeight || initialFaisalJewelCMS.overview.specs.buildingHeight),
        projectType: cleanVerifyText(incOver.specs?.projectType || initialFaisalJewelCMS.overview.specs.projectType),
        location: cleanVerifyText(incOver.specs?.location || initialFaisalJewelCMS.overview.specs.location),
        developer: cleanVerifyText(incOver.specs?.developer || initialFaisalJewelCMS.overview.specs.developer),
        completionTarget: cleanVerifyText(incOver.specs?.completionTarget || initialFaisalJewelCMS.overview.specs.completionTarget)
      }
    },
    floorDistribution: {
      heading: cleanVerifyText(incFloors.heading || initialFaisalJewelCMS.floorDistribution.heading),
      leadParagraph: cleanVerifyText(incFloors.leadParagraph || initialFaisalJewelCMS.floorDistribution.leadParagraph),
      floors: Array.isArray(incFloors.floors) && incFloors.floors.length > 0
        ? incFloors.floors.map((f: any) => ({
            levelRange: cleanVerifyText(f.levelRange || ''),
            category: cleanVerifyText(f.category || ''),
            title: cleanVerifyText(f.title || ''),
            description: cleanVerifyText(f.description || ''),
            highlights: Array.isArray(f.highlights) ? f.highlights.map((h: string) => cleanVerifyText(h)) : [],
            iconType: cleanVerifyText(f.iconType || 'Building2')
          }))
        : initialFaisalJewelCMS.floorDistribution.floors
    },
    unitsInventory: {
      heading: cleanVerifyText(incUnits.heading || initialFaisalJewelCMS.unitsInventory.heading),
      leadParagraph: cleanVerifyText(incUnits.leadParagraph || initialFaisalJewelCMS.unitsInventory.leadParagraph),
      units: Array.isArray(incUnits.units) && incUnits.units.length > 0
        ? incUnits.units.map((u: any, idx: number) => ({
            id: cleanVerifyText(u.id || `fj-unit-${idx}`),
            unitNumber: cleanVerifyText(u.unitNumber || `FJ-${idx + 101}`),
            category: u.category || '1-Bed Apartment',
            floorLevel: cleanVerifyText(u.floorLevel || ''),
            dimensions: cleanVerifyText(u.dimensions || ''),
            areaSqFt: typeof u.areaSqFt === 'number' ? u.areaSqFt : (parseInt(u.areaSqFt) || 500),
            priceFormatted: cleanVerifyText(u.priceFormatted || ''),
            downPaymentFormatted: cleanVerifyText(u.downPaymentFormatted || ''),
            quarterlyInstallmentFormatted: cleanVerifyText(u.quarterlyInstallmentFormatted || ''),
            status: u.status || 'Available',
            facing: cleanVerifyText(u.facing || ''),
            features: Array.isArray(u.features) ? u.features.map((f: string) => cleanVerifyText(f)) : [],
            description: cleanVerifyText(u.description || ''),
            image: cleanVerifyText(u.image || '/images/faisal-jewel-building.webp')
          }))
        : initialFaisalJewelCMS.unitsInventory.units
    },
    hotelAndAmenities: {
      heading: cleanVerifyText(incHotel.heading || initialFaisalJewelCMS.hotelAndAmenities.heading),
      leadParagraph: cleanVerifyText(incHotel.leadParagraph || initialFaisalJewelCMS.hotelAndAmenities.leadParagraph),
      items: Array.isArray(incHotel.items) && incHotel.items.length > 0
        ? incHotel.items.map((it: any) => ({
            title: cleanVerifyText(it.title || ''),
            desc: cleanVerifyText(it.desc || ''),
            category: cleanVerifyText(it.category || 'Wellness'),
            iconType: cleanVerifyText(it.iconType || 'Sparkles')
          }))
        : initialFaisalJewelCMS.hotelAndAmenities.items
    },
    paymentPlan: {
      heading: cleanVerifyText(incPay.heading || initialFaisalJewelCMS.paymentPlan.heading),
      leadParagraph: cleanVerifyText(incPay.leadParagraph || initialFaisalJewelCMS.paymentPlan.leadParagraph),
      installmentsDuration: cleanVerifyText(incPay.installmentsDuration || initialFaisalJewelCMS.paymentPlan.installmentsDuration),
      downPaymentPercentage: cleanVerifyText(incPay.downPaymentPercentage || initialFaisalJewelCMS.paymentPlan.downPaymentPercentage),
      quarterlyCount: cleanVerifyText(incPay.quarterlyCount || initialFaisalJewelCMS.paymentPlan.quarterlyCount),
      discountNote: cleanVerifyText(incPay.discountNote || initialFaisalJewelCMS.paymentPlan.discountNote),
      samplePlans: Array.isArray(incPay.samplePlans) && incPay.samplePlans.length > 0
        ? incPay.samplePlans.map((sp: any) => ({
            category: cleanVerifyText(sp.category || ''),
            sizeSqFt: cleanVerifyText(sp.sizeSqFt || ''),
            totalPrice: cleanVerifyText(sp.totalPrice || ''),
            downPayment: cleanVerifyText(sp.downPayment || ''),
            quarterlyInstallment: cleanVerifyText(sp.quarterlyInstallment || ''),
            onPossession: cleanVerifyText(sp.onPossession || '')
          }))
        : initialFaisalJewelCMS.paymentPlan.samplePlans
    },
    constructionProgress: {
      heading: cleanVerifyText(incDev.heading || initialFaisalJewelCMS.constructionProgress.heading),
      leadParagraph: cleanVerifyText(incDev.leadParagraph || initialFaisalJewelCMS.constructionProgress.leadParagraph),
      stat1Value: cleanVerifyText(incDev.stat1Value || initialFaisalJewelCMS.constructionProgress.stat1Value),
      stat1Label: cleanVerifyText(incDev.stat1Label || initialFaisalJewelCMS.constructionProgress.stat1Label),
      stat2Value: cleanVerifyText(incDev.stat2Value || initialFaisalJewelCMS.constructionProgress.stat2Value),
      stat2Label: cleanVerifyText(incDev.stat2Label || initialFaisalJewelCMS.constructionProgress.stat2Label),
      stat3Value: cleanVerifyText(incDev.stat3Value || initialFaisalJewelCMS.constructionProgress.stat3Value),
      stat3Label: cleanVerifyText(incDev.stat3Label || initialFaisalJewelCMS.constructionProgress.stat3Label),
      dronePhotoUrl: cleanVerifyText(incDev.dronePhotoUrl || initialFaisalJewelCMS.constructionProgress.dronePhotoUrl),
      droneHeading: cleanVerifyText(incDev.droneHeading || initialFaisalJewelCMS.constructionProgress.droneHeading),
      droneDesc: cleanVerifyText(incDev.droneDesc || initialFaisalJewelCMS.constructionProgress.droneDesc)
    },
    faqs: {
      heading: cleanVerifyText(incFaqs.heading || initialFaisalJewelCMS.faqs.heading),
      items: Array.isArray(incFaqs.items) && incFaqs.items.length > 0
        ? incFaqs.items.map((f: any) => ({
            q: cleanVerifyText(f.q || f.question || ''),
            a: cleanVerifyText(f.a || f.answer || '')
          }))
        : initialFaisalJewelCMS.faqs.items
    },
    googleMapEmbedUrl: cleanVerifyText(incoming.googleMapEmbedUrl || initialFaisalJewelCMS.googleMapEmbedUrl),
    inquirySection: {
      tag: cleanVerifyText(incInq.tag || initialFaisalJewelCMS.inquirySection.tag),
      heading: cleanVerifyText(incInq.heading || initialFaisalJewelCMS.inquirySection.heading),
      leadParagraph: cleanVerifyText(incInq.leadParagraph || initialFaisalJewelCMS.inquirySection.leadParagraph),
      whatsappNumber: cleanVerifyText(incInq.whatsappNumber || initialFaisalJewelCMS.inquirySection.whatsappNumber),
      phoneNumber: cleanVerifyText(incInq.phoneNumber || initialFaisalJewelCMS.inquirySection.phoneNumber),
      buttonText: cleanVerifyText(incInq.buttonText || initialFaisalJewelCMS.inquirySection.buttonText)
    }
  };
}

export async function fetchFaisalJewelCMS(): Promise<FaisalJewelCMSData> {
  let localData: FaisalJewelCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const localStr = localStorage.getItem('faisal_jewel_cms');
      if (localStr) localData = mergeFaisalJewelCMS(JSON.parse(localStr));
    } catch {}
  }

  const remote = await fetchSettingByKey<FaisalJewelCMSData>('faisal_jewel_cms');
  if (remote) {
    const merged = localData ? mergeFaisalJewelCMS({ ...remote, ...localData }) : mergeFaisalJewelCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_jewel_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialFaisalJewelCMS;
}

export async function saveFaisalJewelCMS(cmsData: FaisalJewelCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_jewel_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_jewel_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_jewel_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// =========================================================
// FAISAL HILLS MASTER PLAN CMS SYSTEM
// =========================================================

export interface MasterPlanCuttingRow {
  category: string;
  dimensions: string;
  area: string;
  availability: string;
}

export interface MasterPlanBoulevardRow {
  name: string;
  width: string;
  purpose: string;
  connectivity: string;
}

export interface MasterPlanCMSData {
  header: {
    tag: string;
    h1: string;
    leadParagraph: string;
    pdfDownloadUrl: string;
    downloadButtonText: string;
  };
  viewer: {
    mapImageUrl: string;
    highResImageUrl: string;
    viewerHeightDesktop: string;
    caption: string;
  };
  sectorDimensionsTable: {
    heading: string;
    subline: string;
    paymentPlanLinkText: string;
    paymentPlanLinkUrl: string;
    rows: MasterPlanCuttingRow[];
    footnote: string;
  };
  boulevardsSection: {
    heading: string;
    leadParagraph: string;
    rows: MasterPlanBoulevardRow[];
  };
  landmarksAndAvenues: {
    heading: string;
    leadParagraph: string;
    landmarks: {
      name: string;
      block: string;
      description: string;
      iconType: string;
    }[];
  };
  advisoryFootnote: {
    verificationTag: string;
    verificationText: string;
    nocStatusText: string;
    disclaimerText: string;
  };
  faqs: {
    heading: string;
    items: { q: string; a: string }[];
  };
}

export const initialMasterPlanCMS: MasterPlanCMSData = {
  header: {
    tag: "Society Navigation & Master Layout",
    h1: "Faisal Hills Master Plan Map",
    leadParagraph: "Explore the officially approved master layout of Faisal Hills. Inspect plot dimensions, road networks, sector avenues, and central commercial boulevards with interactive deep zoom controls up to 1200%.",
    pdfDownloadUrl: "/FAISAL HILLS MASTER PLAN.pdf",
    downloadButtonText: "Download High-Res PDF Map"
  },
  viewer: {
    mapImageUrl: "/images/faisal-hills-master-plan-map.webp",
    highResImageUrl: "/images/faisal-hills-master-plan-map.webp",
    viewerHeightDesktop: "750px",
    caption: "Official RDA-Sanctioned Town Planning Master Plan of Faisal Hills Islamabad"
  },
  sectorDimensionsTable: {
    heading: "Master Plan Sector Layout & Standard Plot Cuttings",
    subline: "Official ground cuttings and area conversions across all society blocks:",
    paymentPlanLinkText: "Payment Plan Matrix",
    paymentPlanLinkUrl: "/faisal-hills-payment-plan",
    rows: [
      {
        category: "5.55 Marla (5 Marla)",
        dimensions: "25 × 50 ft",
        area: "138.89 sq. yd (1,250 sq. ft)",
        availability: "Prime Block developer instalments & mature sectors resale"
      },
      {
        category: "8 Marla",
        dimensions: "30 × 60 ft",
        area: "200 sq. yd (1,800 sq. ft)",
        availability: "10 quarterly instalments available in Prime Block"
      },
      {
        category: "10.89 Marla (10 Marla)",
        dimensions: "35 × 70 ft",
        area: "272.22 sq. yd (2,450 sq. ft)",
        availability: "Family plot standard across Executive, A, B, C & D blocks"
      },
      {
        category: "14.22 Marla (14 Marla)",
        dimensions: "40 × 80 ft",
        area: "355.55 sq. yd (3,200 sq. ft)",
        availability: "Available in Blocks A, B & D (resale settlement)"
      },
      {
        category: "1 Kanal",
        dimensions: "50 × 90 ft",
        area: "500 sq. yd (4,500 sq. ft)",
        availability: "Prime mountain view avenues & 10 quarterly instalments"
      },
      {
        category: "2 Kanal",
        dimensions: "75 × 120 ft",
        area: "1,000 sq. yd (9,000 sq. ft)",
        availability: "Estate tier residential cuttings in Block A & Prime Block"
      }
    ],
    footnote: "All plot dimensions and areas are measured in strict accordance with the Zedem International master plan (1 Marla = 225 sq. ft)."
  },
  boulevardsSection: {
    heading: "Grand Boulevards & Internal Road Network",
    leadParagraph: "The traffic engineering grid is planned to eliminate bottlenecks and connect every sector directly to the GT Road and M-1 Motorway:",
    rows: [
      {
        name: "Main Grand Boulevard",
        width: "225 Feet",
        purpose: "Primary Arterial Corridor",
        connectivity: "Connects Main GT Road Arc Gate with Executive, A, B and Prime Blocks"
      },
      {
        name: "Central Sector Expressways",
        width: "150 Feet",
        purpose: "Inter-Sector Transit",
        connectivity: "Direct transit route between Block C, Hills Walk and M-1 Interchange"
      },
      {
        name: "Commercial Promenade Avenues",
        width: "100 Feet",
        purpose: "Commercial High-Streets",
        connectivity: "Civic center commercial avenues and sports complex access"
      },
      {
        name: "Residential Sector Streets",
        width: "40 – 60 Feet",
        purpose: "Local Neighborhood Traffic",
        connectivity: "Paved wide internal streets ensuring comfortable two-way vehicular flow"
      }
    ]
  },
  landmarksAndAvenues: {
    heading: "Prominent Society Landmarks on the Master Plan",
    leadParagraph: "Key iconic destinations and civic amenities demarcated on the master map:",
    landmarks: [
      { name: "Main GT Road Monument Arc Gate", block: "Executive Block", description: "Grand 225ft entrance monument on National Highway N-5.", iconType: "Landmark" },
      { name: "Faisal Jewel 27-Storey Tower", block: "Executive Block", description: "Iconic mixed-use skyscraper, hotel and shopping mall.", iconType: "Building2" },
      { name: "Roots International School Campus", block: "Executive Block", description: "Operational premier education campus.", iconType: "GraduationCap" },
      { name: "Central Sports Arena & Complex", block: "Block B", description: "Cricket ground, tennis courts, and sports academy.", iconType: "Activity" },
      { name: "Hills Walk Commercial Promenade", block: "Block C", description: "European-style retail and dining boulevard.", iconType: "ShoppingBag" },
      { name: "Glow Park & Botanical Forest", block: "Central Scheme", description: "Family recreation and illuminated theme park.", iconType: "Trees" }
    ]
  },
  advisoryFootnote: {
    verificationTag: "Official Master Plan Advisory",
    verificationText: "Layout plans and road demarcation verified on-site by Faisal Hills Estate Verification Desk.",
    nocStatusText: "100% Sanctioned by Rawalpindi Development Authority (RDA).",
    disclaimerText: "Plot cuttings, road widths, and amenity demarcations reflect the latest approved master planning revisions from Zedem International."
  },
  faqs: {
    heading: "Frequently Asked Questions — Master Plan",
    items: [
      { q: "Where can I download the high-resolution Faisal Hills master plan?", a: "You can download the full high-resolution PDF master plan directly from the download button above or visit the sales office." },
      { q: "What is the width of the main boulevard in Faisal Hills?", a: "The main entrance boulevard is 225 feet wide, and internal sector expressways are 150 and 100 feet wide." },
      { q: "How many blocks are in the Faisal Hills master plan?", a: "The scheme comprises Executive Block, Block A, Block B, Block B-1 Extension, Block C, Block D, and Prime Block." },
      { q: "Where is the proposed M-1 Motorway interchange located?", a: "The dedicated M-1 Motorway Interchange route connects directly on the western boundary of Block C." }
    ]
  }
};

export function mergeMasterPlanCMS(incoming: any): MasterPlanCMSData {
  if (!incoming || typeof incoming !== 'object') return initialMasterPlanCMS;

  const incHead = incoming.header || {};
  const incView = incoming.viewer || {};
  const incTable = incoming.sectorDimensionsTable || {};
  const incBoul = incoming.boulevardsSection || {};
  const incLand = incoming.landmarksAndAvenues || {};
  const incAdv = incoming.advisoryFootnote || {};
  const incFaqs = incoming.faqs || {};

  return {
    header: {
      tag: cleanVerifyText(incHead.tag || initialMasterPlanCMS.header.tag),
      h1: cleanVerifyText(incHead.h1 || initialMasterPlanCMS.header.h1),
      leadParagraph: cleanVerifyText(incHead.leadParagraph || initialMasterPlanCMS.header.leadParagraph),
      pdfDownloadUrl: cleanVerifyText(incHead.pdfDownloadUrl || initialMasterPlanCMS.header.pdfDownloadUrl),
      downloadButtonText: cleanVerifyText(incHead.downloadButtonText || initialMasterPlanCMS.header.downloadButtonText)
    },
    viewer: {
      mapImageUrl: cleanVerifyText(incView.mapImageUrl || initialMasterPlanCMS.viewer.mapImageUrl),
      highResImageUrl: cleanVerifyText(incView.highResImageUrl || initialMasterPlanCMS.viewer.highResImageUrl),
      viewerHeightDesktop: cleanVerifyText(incView.viewerHeightDesktop || initialMasterPlanCMS.viewer.viewerHeightDesktop),
      caption: cleanVerifyText(incView.caption || initialMasterPlanCMS.viewer.caption)
    },
    sectorDimensionsTable: {
      heading: cleanVerifyText(incTable.heading || initialMasterPlanCMS.sectorDimensionsTable.heading),
      subline: cleanVerifyText(incTable.subline || initialMasterPlanCMS.sectorDimensionsTable.subline),
      paymentPlanLinkText: cleanVerifyText(incTable.paymentPlanLinkText || initialMasterPlanCMS.sectorDimensionsTable.paymentPlanLinkText),
      paymentPlanLinkUrl: cleanVerifyText(incTable.paymentPlanLinkUrl || initialMasterPlanCMS.sectorDimensionsTable.paymentPlanLinkUrl),
      rows: Array.isArray(incTable.rows) && incTable.rows.length > 0
        ? incTable.rows.map((r: any) => ({
            category: cleanVerifyText(r.category || ''),
            dimensions: cleanVerifyText(r.dimensions || ''),
            area: cleanVerifyText(r.area || ''),
            availability: cleanVerifyText(r.availability || '')
          }))
        : initialMasterPlanCMS.sectorDimensionsTable.rows,
      footnote: cleanVerifyText(incTable.footnote || initialMasterPlanCMS.sectorDimensionsTable.footnote)
    },
    boulevardsSection: {
      heading: cleanVerifyText(incBoul.heading || initialMasterPlanCMS.boulevardsSection.heading),
      leadParagraph: cleanVerifyText(incBoul.leadParagraph || initialMasterPlanCMS.boulevardsSection.leadParagraph),
      rows: Array.isArray(incBoul.rows) && incBoul.rows.length > 0
        ? incBoul.rows.map((b: any) => ({
            name: cleanVerifyText(b.name || ''),
            width: cleanVerifyText(b.width || ''),
            purpose: cleanVerifyText(b.purpose || ''),
            connectivity: cleanVerifyText(b.connectivity || '')
          }))
        : initialMasterPlanCMS.boulevardsSection.rows
    },
    landmarksAndAvenues: {
      heading: cleanVerifyText(incLand.heading || initialMasterPlanCMS.landmarksAndAvenues.heading),
      leadParagraph: cleanVerifyText(incLand.leadParagraph || initialMasterPlanCMS.landmarksAndAvenues.leadParagraph),
      landmarks: Array.isArray(incLand.landmarks) && incLand.landmarks.length > 0
        ? incLand.landmarks.map((l: any) => ({
            name: cleanVerifyText(l.name || ''),
            block: cleanVerifyText(l.block || ''),
            description: cleanVerifyText(l.description || ''),
            iconType: cleanVerifyText(l.iconType || 'Landmark')
          }))
        : initialMasterPlanCMS.landmarksAndAvenues.landmarks
    },
    advisoryFootnote: {
      verificationTag: cleanVerifyText(incAdv.verificationTag || initialMasterPlanCMS.advisoryFootnote.verificationTag),
      verificationText: cleanVerifyText(incAdv.verificationText || initialMasterPlanCMS.advisoryFootnote.verificationText),
      nocStatusText: cleanVerifyText(incAdv.nocStatusText || initialMasterPlanCMS.advisoryFootnote.nocStatusText),
      disclaimerText: cleanVerifyText(incAdv.disclaimerText || initialMasterPlanCMS.advisoryFootnote.disclaimerText)
    },
    faqs: {
      heading: cleanVerifyText(incFaqs.heading || initialMasterPlanCMS.faqs.heading),
      items: Array.isArray(incFaqs.items) && incFaqs.items.length > 0
        ? incFaqs.items.map((f: any) => ({
            q: cleanVerifyText(f.q || f.question || ''),
            a: cleanVerifyText(f.a || f.answer || '')
          }))
        : initialMasterPlanCMS.faqs.items
    }
  };
}

export async function fetchMasterPlanCMS(): Promise<MasterPlanCMSData> {
  let localData: MasterPlanCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const localStr = localStorage.getItem('faisal_master_plan_cms');
      if (localStr) localData = mergeMasterPlanCMS(JSON.parse(localStr));
    } catch {}
  }

  const remote = await fetchSettingByKey<MasterPlanCMSData>('faisal_master_plan_cms');
  if (remote) {
    const merged = localData ? mergeMasterPlanCMS({ ...remote, ...localData }) : mergeMasterPlanCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_master_plan_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialMasterPlanCMS;
}

export async function saveMasterPlanCMS(cmsData: MasterPlanCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_master_plan_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_master_plan_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_master_plan_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

// ============================================================================
// FAISAL HILLS NOC & RDA APPROVAL CMS TYPES & HELPERS
// ============================================================================

export interface NocBlockStatusItem {
  id?: string;
  blockName: string;
  status: string;
  description: string;
  approved: boolean;
}

export interface NocStatusCMSData {
  hero: {
    tag: string;
    h1: string;
    description: string;
    bgImage: string;
  };
  summaryCard: {
    tag: string;
    heading: string;
    leadText: string;
    lopNumber: string;
    lopDescription: string;
    detailedText: string;
  };
  blocksNocList: NocBlockStatusItem[];
  buyerAdvisory: {
    title: string;
    note: string;
  };
  verificationForm: {
    tag: string;
    heading: string;
    description: string;
    whatsappNumber: string;
    hotline: string;
  };
  faqs: Array<{ q: string; a: string }>;
  meta: {
    title: string;
    description: string;
  };
}

export const initialNocStatusCMS: NocStatusCMSData = {
  hero: {
    tag: "RDA NOC Approved Society",
    h1: "Faisal Hills NOC Status",
    description: "Legally secure, RDA approved, and clear title layouts. Discover the official regulatory status, approved LOP details, and verify your plot authorization.",
    bgImage: "/images/faisal-hills-site-header.webp"
  },
  summaryCard: {
    tag: "Official Authorization",
    heading: "RDA NOC & LOP Approval",
    leadText: "Faisal Hills is a fully approved housing society under the regulatory jurisdiction of the Rawalpindi Development Authority (RDA). The project holds a valid No Objection Certificate (NOC) and layout plan (LOP) approvals covering its master plan.",
    lopNumber: "RDA/MP&TE/F-PH-L-I/240",
    lopDescription: "The approved layout plan spans thousands of Kanals, ensuring that the road width, green belts, school zones, commercial reserves, and residential areas are benchmarked against official standards.",
    detailedText: "Having a clear RDA NOC status is a critical legal guarantee for plot buyers. It ensures that ownership transfers, utility connections (gas, electricity, water reservoirs), and home construction permits can be processed smoothly without regulatory delays."
  },
  blocksNocList: [
    {
      id: "noc-exec",
      blockName: "Executive Block",
      status: "100% Approved",
      description: "100% RDA approved LOP, possession ready commercial & residential zones.",
      approved: true
    },
    {
      id: "noc-ab",
      blockName: "Block A & B",
      status: "Fully Approved & Cleared",
      description: "Fully developed and cleared. Hundreds of houses completed and occupied.",
      approved: true
    },
    {
      id: "noc-cd",
      blockName: "Block C & D",
      status: "Approved Boundaries",
      description: "Approved boundaries with active development, gas pipe networks and utilities.",
      approved: true
    },
    {
      id: "noc-prime",
      blockName: "Prime Block & Golf Block",
      status: "Integrated Master Plan",
      description: "Gated layouts and eco-green areas fully integrated into approved master plans.",
      approved: true
    }
  ],
  buyerAdvisory: {
    title: "Attention Buyers & Investors",
    note: "Always verify that the specific plot number you are buying corresponds exactly to the approved layout map coordinates to prevent overlapping issues or land adjustments during demarcation."
  },
  verificationForm: {
    tag: "Plot Verification",
    heading: "Verify Your Plot Status",
    description: "Enter your plot number and block name to check its legal verification status, demarcation, and development timeline.",
    whatsappNumber: "923331113177",
    hotline: "+92 333 1113177"
  },
  faqs: [
    {
      q: "Is Faisal Hills legally approved by RDA?",
      a: "Yes, Faisal Hills is fully approved by the Rawalpindi Development Authority (RDA) under approved layout plan reference RDA/MP&TE/F-PH-L-I/240."
    },
    {
      q: "Can I get immediate registry and possession in approved blocks?",
      a: "Yes, in developed sectors such as Executive Block and Block A, plots are possession-ready and registries/transfers are handled directly through Zedem International's official transfer office."
    },
    {
      q: "Are utilities (gas, electricity, water) sanctioned under the NOC?",
      a: "Yes, electricity infrastructure, dedicated underground water supply lines, and Sui Northern Gas Pipelines Limited (SNGPL) pipeline networks are part of the sanctioned societal blueprint."
    }
  ],
  meta: {
    title: "Faisal Hills NOC Status & RDA Approval Details | Official Portal",
    description: "Verify Faisal Hills RDA NOC status, official layout plan approval number RDA/MP&TE/F-PH-L-I/240, and check plot allotment validation."
  }
};

export function mergeNocStatusCMS(incoming: any): NocStatusCMSData {
  if (!incoming || typeof incoming !== 'object') return initialNocStatusCMS;
  return {
    hero: {
      tag: incoming.hero?.tag || initialNocStatusCMS.hero.tag,
      h1: incoming.hero?.h1 || initialNocStatusCMS.hero.h1,
      description: incoming.hero?.description || initialNocStatusCMS.hero.description,
      bgImage: incoming.hero?.bgImage || initialNocStatusCMS.hero.bgImage
    },
    summaryCard: {
      tag: incoming.summaryCard?.tag || initialNocStatusCMS.summaryCard.tag,
      heading: incoming.summaryCard?.heading || initialNocStatusCMS.summaryCard.heading,
      leadText: incoming.summaryCard?.leadText || initialNocStatusCMS.summaryCard.leadText,
      lopNumber: incoming.summaryCard?.lopNumber || initialNocStatusCMS.summaryCard.lopNumber,
      lopDescription: incoming.summaryCard?.lopDescription || initialNocStatusCMS.summaryCard.lopDescription,
      detailedText: incoming.summaryCard?.detailedText || initialNocStatusCMS.summaryCard.detailedText
    },
    blocksNocList: Array.isArray(incoming.blocksNocList) && incoming.blocksNocList.length > 0
      ? incoming.blocksNocList.map((item: any) => ({
          id: item.id || `noc-${Math.random().toString(36).substring(2, 7)}`,
          blockName: item.blockName || '',
          status: item.status || 'Approved',
          description: item.description || '',
          approved: item.approved !== false
        }))
      : initialNocStatusCMS.blocksNocList,
    buyerAdvisory: {
      title: incoming.buyerAdvisory?.title || initialNocStatusCMS.buyerAdvisory.title,
      note: incoming.buyerAdvisory?.note || initialNocStatusCMS.buyerAdvisory.note
    },
    verificationForm: {
      tag: incoming.verificationForm?.tag || initialNocStatusCMS.verificationForm.tag,
      heading: incoming.verificationForm?.heading || initialNocStatusCMS.verificationForm.heading,
      description: incoming.verificationForm?.description || initialNocStatusCMS.verificationForm.description,
      whatsappNumber: incoming.verificationForm?.whatsappNumber || initialNocStatusCMS.verificationForm.whatsappNumber,
      hotline: incoming.verificationForm?.hotline || initialNocStatusCMS.verificationForm.hotline
    },
    faqs: Array.isArray(incoming.faqs) && incoming.faqs.length > 0
      ? incoming.faqs.map((f: any) => ({
          q: f.q || f.question || '',
          a: f.a || f.answer || ''
        }))
      : initialNocStatusCMS.faqs,
    meta: {
      title: incoming.meta?.title || initialNocStatusCMS.meta.title,
      description: incoming.meta?.description || initialNocStatusCMS.meta.description
    }
  };
}

export async function fetchNocStatusCMS(): Promise<NocStatusCMSData> {
  let localData: NocStatusCMSData | null = null;
  if (typeof window !== 'undefined') {
    try {
      const localStr = localStorage.getItem('faisal_noc_status_cms');
      if (localStr) localData = mergeNocStatusCMS(JSON.parse(localStr));
    } catch {}
  }

  const remote = await fetchSettingByKey<NocStatusCMSData>('faisal_noc_status_cms');
  if (remote) {
    const merged = localData ? mergeNocStatusCMS({ ...remote, ...localData }) : mergeNocStatusCMS(remote);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('faisal_noc_status_cms', JSON.stringify(merged));
      } catch {}
    }
    return merged;
  }

  if (localData) return localData;
  return initialNocStatusCMS;
}

export async function saveNocStatusCMS(cmsData: NocStatusCMSData, token?: string): Promise<boolean> {
  const activeToken = token || (typeof window !== 'undefined' ? (sessionStorage.getItem('faisal_admin_token') || localStorage.getItem('faisal_admin_token') || '') : '');

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('faisal_noc_status_cms', JSON.stringify(cmsData));
      window.dispatchEvent(new Event('faisal_noc_status_cms_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch {}
  }

  try {
    const res = await safeFetch(`${getApiUrl()}/settings/faisal_noc_status_cms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(activeToken ? { 'Authorization': `Bearer ${activeToken}` } : {})
      },
      body: JSON.stringify(cmsData)
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

