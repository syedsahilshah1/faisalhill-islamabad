export interface BlockDetailItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  subtitle: string;
  character: string;
  approxPlots: string;
  category: 'developed' | 'upcoming' | 'commercial';
  status: string;
  nocStatus: string;
  plotSizes: string;
  howSold: string;
  possession: string;
  borders: string;
  access: string;
  priceRange: {
    residential: string;
    commercial: string;
    fiveMarla: string;
    oneKanal: string;
  };
  heroImage: string;
  badge: string;
  description: string;
  detailedCopy: string;
  suits: string;
  highlights: string[];
  amenities: string[];
  keyAdvantage: string;
  deliveryTimeline: string;
}

export const allBlocksDataset: BlockDetailItem[] = [
  {
    id: "executive-block",
    name: "Executive Block",
    slug: "executive-block",
    tagline: "GT Road Entrance & Commercial Hub",
    subtitle: "Prestigious Gateway Sector with Faisal Jewel & Grand Boulevards",
    character: "Main entrance; commercial centre",
    approxPlots: "1,450",
    category: "developed",
    status: "Possession Available",
    nocStatus: "RDA Approved",
    plotSizes: "5 Marla – 1 Kanal",
    howSold: "Full payment",
    possession: "Available",
    borders: "GT Road; Block A",
    access: "Main gate on GT Road",
    priceRange: {
      residential: "PKR 70 Lacs – 2.90 Crore",
      commercial: "PKR 2.2 Crore – 8.5 Crore",
      fiveMarla: "PKR 70–90 lakh",
      oneKanal: "PKR 2.00–2.90 crore"
    },
    heroImage: "/images/faisal-hills-executive-block.webp",
    badge: "Commercial & Civic Gateway",
    description: "The society's commercial and civic centre, at the GT Road entrance. It contains Faisal Jewel, the Roots International School campus, a mosque, a cricket ground and Faisal Mansion, reported as the society's head office.",
    detailedCopy: "The society's commercial and civic centre, at the GT Road entrance. It contains Faisal Jewel, the Roots International School campus, a mosque, a cricket ground and Faisal Mansion, reported as the society's head office. Residential plots run from 5 Marla to 1 Kanal, alongside commercial plots with GT Road visibility. The developer's latest published update lists plots here as full payment only.",
    suits: "Commercial buyers, and anyone who wants to build immediately near the entrance.",
    highlights: [
      "Direct Main GT Road Entrance & 225ft Boulevard Frontage",
      "Faisal Jewel 27-Story Landmark & Civic Center Hub",
      "Roots International School Campus & Jamia Mosque",
      "Immediate Construction with 100% Cash/Full Payment Plots"
    ],
    amenities: ["Roots International School", "Faisal Jewel Skyscraper", "Grand Jamia Mosque", "Cricket Ground", "Faisal Mansion"],
    keyAdvantage: "Prime Gateway Commercial & Residential Frontage",
    deliveryTimeline: "Immediate Possession"
  },
  {
    id: "block-a",
    name: "Block A",
    slug: "block-a",
    tagline: "Oldest & Most Established Community",
    subtitle: "Fully Developed Community Sector with Active Residential Life",
    character: "Oldest residential block",
    approxPlots: "6,000–8,000",
    category: "developed",
    status: "Fully Developed & Inhabited",
    nocStatus: "RDA Approved",
    plotSizes: "5 Marla – 2 Kanal",
    howSold: "Full payment",
    possession: "Available",
    borders: "Executive Block; Prime Block; Block B",
    access: "Main boulevard (225 ft)",
    priceRange: {
      residential: "PKR 55 Lacs – 2.25 Crore",
      commercial: "PKR 1.8 Crore – 6.5 Crore",
      fiveMarla: "PKR 55–70 lakh",
      oneKanal: "PKR 1.45–2.25 crore"
    },
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    badge: "Most Populated Sector",
    description: "The oldest and largest established residential block, next to the Executive Block, with carpeted roads, an operational mosque and families in residence. Plots run from 5 Marla to 2 Kanal, plus commercial plots.",
    detailedCopy: "The oldest and largest established residential block, next to the Executive Block, with carpeted roads, an operational mosque and families in residence. Plots run from 5 Marla to 2 Kanal, plus commercial plots. Published totals range from about 6,000 to over 8,000 residential plots. Sold on full payment only, according to the developer's latest update.",
    suits: "Families and investors who want a lived-in block.",
    highlights: [
      "Carpeted Wide Roads & Operational Grand Mosque",
      "Hundreds of Inhabited Villas & Active Families",
      "Diverse Sizing from 5 Marla to 2 Kanal Plots",
      "Adjacent to Executive Block & Central Boulevard"
    ],
    amenities: ["Operational Grand Mosque", "Community Parks", "Commercial Markets", "Underground Electrification"],
    keyAdvantage: "Lived-In Community & Ready Possession",
    deliveryTimeline: "Immediate Possession"
  },
  {
    id: "prime-block",
    name: "Prime Block",
    slug: "prime-block",
    tagline: "Newest Sector with Installment Plans",
    subtitle: "Contemporary Sector Offering Flexible Payment Options",
    character: "Newest block",
    approxPlots: "Master plan scheduled",
    category: "upcoming",
    status: "Early Stage Development",
    nocStatus: "RDA Approved Layout",
    plotSizes: "5.55 Marla – 2 Kanal",
    howSold: "Installments",
    possession: "Not yet",
    borders: "Block A",
    access: "Planned second GT Road gate / Main boulevard",
    priceRange: {
      residential: "PKR 45 Lacs – 2.50 Crore",
      commercial: "PKR 2.5 Crore – 9.0 Crore",
      fiveMarla: "PKR 45–70 lakh",
      oneKanal: "PKR 1.75–2.50 crore"
    },
    heroImage: "/images/faisal-hills-drone-view.webp",
    badge: "Installment Opportunity",
    description: "The newest block, beside Block A. It is currently the main option for buyers who need a developer installment plan, with plots from 5.55 Marla to 2 Kanal plus commercial plots.",
    detailedCopy: "The newest block, beside Block A. It is currently the main option for buyers who need a developer installment plan, with plots from 5.55 Marla to 2 Kanal plus commercial plots. Ask for the Prime Block layout map at booking and check your plot's position against the boulevard and the planned commercial area.",
    suits: "Installment buyers who can wait for development.",
    highlights: [
      "Main Option for Developer Installment Booking Plans",
      "Flexible Plot Sizing from 5.55 Marla up to 2 Kanal",
      "Strategic Position Adjacent to Block A",
      "Planned Dedicated Commercial & Recreational Zones"
    ],
    amenities: ["Proposed Commercial Zone", "Sector Parks", "Wide Internal Roadways", "Planned Second Gate Access"],
    keyAdvantage: "Affordable Entry on Installments",
    deliveryTimeline: "Development in Progress"
  },
  {
    id: "block-b",
    name: "Block B",
    slug: "block-b",
    tagline: "Central Sector with Margalla Views",
    subtitle: "Large Residential Block Between Blocks A and C",
    character: "Large residential block",
    approxPlots: "8,050",
    category: "developed",
    status: "Possession in Parts",
    nocStatus: "RDA Approved",
    plotSizes: "5 Marla – 1 Kanal",
    howSold: "Full payment / Resale",
    possession: "In parts",
    borders: "Block A; Block C",
    access: "Main boulevard",
    priceRange: {
      residential: "PKR 40 Lacs – 1.75 Crore",
      commercial: "PKR 1.5 Crore – 4.8 Crore",
      fiveMarla: "PKR 40–65 lakh",
      oneKanal: "PKR 1.15–1.75 crore"
    },
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    badge: "Largest Land Area",
    description: "A large residential block between Blocks A and C, with reported views of the Margalla Hills, and described by several sources as the largest block by land area. Plots run from 5 Marla to 1 Kanal.",
    detailedCopy: "A large residential block between Blocks A and C, with reported views of the Margalla Hills, and described by several sources as the largest block by land area. Plots run from 5 Marla to 1 Kanal, and the master plan reportedly includes a graveyard site here. Possession-ready plots have been offered in parts of the block.",
    suits: "Families wanting a quieter residential setting below Block A prices.",
    highlights: [
      "Panoramic Margalla Hills Natural Backdrop",
      "Largest Sector by Surface Land Footprint",
      "Central Link Between Block A and Block C",
      "Possession Ready in Key Developed Sub-Sectors"
    ],
    amenities: ["Margalla View Points", "Sector Parks & Graveyard Site", "Local Mosques", "Commercial Plazas"],
    keyAdvantage: "Lower Price-Point Than Block A with Scenic Views",
    deliveryTimeline: "Possession Available in Parts"
  },
  {
    id: "block-b1-extension",
    name: "Block B Extension",
    slug: "block-b1-extension",
    tagline: "Small Hillside Residential Block",
    subtitle: "Affordable Hillside Plots for Value Seekers",
    character: "Small hillside block",
    approxPlots: "650",
    category: "upcoming",
    status: "Roads Under Construction",
    nocStatus: "RDA Approved",
    plotSizes: "5 – 10 Marla",
    howSold: "Installments",
    possession: "Not yet",
    borders: "Block B",
    access: "Connected via Block B",
    priceRange: {
      residential: "PKR 45 Lacs – 65 Lacs",
      commercial: "Limited Commercial",
      fiveMarla: "PKR 45–65 lakh",
      oneKanal: "—"
    },
    heroImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    badge: "Hillside Enclave",
    description: "A small block of about 650 plots, 5 to 10 Marla only, created to meet demand for Block B. It sits on hilly terrain, and roads were under construction as of 2026.",
    detailedCopy: "A small block of about 650 plots, 5 to 10 Marla only, created to meet demand for Block B. It sits on hilly terrain, and roads were under construction as of 2026. Check the level of any plot, and whether it needs earthwork, before budgeting for construction.",
    suits: "Budget buyers who want the Block B area and can wait.",
    highlights: [
      "Compact 650-Plot Hillside Enclave",
      "Focused 5 Marla & 10 Marla Residential Sizing",
      "Scenic Elevated Natural Contour",
      "High Long-Term Capital Appreciation Multiplier"
    ],
    amenities: ["Hillside Green Belts", "Street Landscaping", "Local Mosque", "Security Surveillance"],
    keyAdvantage: "Affordable Entry in Block B Vicinity",
    deliveryTimeline: "Under Construction"
  },
  {
    id: "block-c",
    name: "Block C",
    slug: "block-c",
    tagline: "Large High-Growth Sector near Motorway",
    subtitle: "High-Volume Residential & Commercial Pocket",
    character: "Large residential block",
    approxPlots: "8,350",
    category: "developed",
    status: "Possession in Parts",
    nocStatus: "RDA Approved",
    plotSizes: "5 Marla – 1 Kanal",
    howSold: "Full payment / Resale",
    possession: "In parts",
    borders: "Block B; Block D",
    access: "100 ft main roads",
    priceRange: {
      residential: "PKR 35 Lacs – 1.75 Crore",
      commercial: "PKR 1.6 Crore – 5.5 Crore",
      fiveMarla: "PKR 35–60 lakh",
      oneKanal: "PKR 1.20–1.75 crore"
    },
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    badge: "Value & Scale",
    description: "One of the largest blocks, further from the entrance, with about 8,350 residential plots, most of them 5 and 8 Marla, and a large number of commercial plots.",
    detailedCopy: "One of the largest blocks, further from the entrance, with about 8,350 residential plots, most of them 5 and 8 Marla, and a large number of commercial plots. Main roads are built and internal streets are at different stages, with fewer houses so far than in Blocks A and B. Some plots have possession.",
    suits: "Buyers with a longer time horizon who want a lower entry price.",
    highlights: [
      "8,350+ Residential Plots with 5 & 8 Marla Dominance",
      "Wide 100ft Main Arterial Road Network",
      "Substantial Commercial Market Zone Allocation",
      "Competitive Entry Prices for Long-Term Holding"
    ],
    amenities: ["RO Water Filtration Plant", "Sector Commercial Centers", "Community Playgrounds", "Underground Drainage"],
    keyAdvantage: "Low Entry Cost & High Long-Term Scaling",
    deliveryTimeline: "Partial Possession Delivered"
  },
  {
    id: "block-d",
    name: "Block D",
    slug: "block-d",
    tagline: "Later Addition next to Block C",
    subtitle: "Peaceful Residential Sector with Growth Upside",
    character: "Later addition",
    approxPlots: "2,350–2,435",
    category: "upcoming",
    status: "Installments / Groundwork",
    nocStatus: "RDA Approved",
    plotSizes: "5 Marla – 1 Kanal",
    howSold: "Installments",
    possession: "Confirm plot-by-plot",
    borders: "Block C",
    access: "Connected via Block C",
    priceRange: {
      residential: "PKR 40 Lacs – 2.10 Crore",
      commercial: "PKR 1.1 Crore – 3.8 Crore",
      fiveMarla: "PKR 40–55 lakh",
      oneKanal: "PKR 1.40–2.10 crore"
    },
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    badge: "Suburban Addition",
    description: "A later addition next to Block C, with about 2,350 to 2,435 plots depending on the source. Plots run from 5 Marla to 1 Kanal, with 2 Kanal plots listed in some plans.",
    detailedCopy: "A later addition next to Block C, with about 2,350 to 2,435 plots depending on the source. Plots run from 5 Marla to 1 Kanal, with 2 Kanal plots listed in some plans. Installments were reported in recent cycles. Sources contradict each other on possession, so confirm it plot by plot.",
    suits: "Entry-level buyers comfortable checking possession for each plot.",
    highlights: [
      "2,350 to 2,435 Plots Adjacent to Block C",
      "Plots from 5 Marla to 1 Kanal (with 2 Kanal on select plans)",
      "Peaceful Sector Layout Away from Highway Noise",
      "Attractive Pricing for Staged Capital Investment"
    ],
    amenities: ["Sector Green Belts", "Proposed Medical & Community Hub", "Parks & Playgrounds", "50ft Grid Streets"],
    keyAdvantage: "Budget Entry & Flexible Growth Opportunity",
    deliveryTimeline: "Check Plot-by-Plot"
  }
];

export const plotSizesMatrix = [
  { dimensions: "25 × 50", areaSqFt: "1,250", exec: true, a: true, prime: true, b: true, bExt: true, c: true, d: true },
  { dimensions: "30 × 60", areaSqFt: "1,800", exec: true, a: true, prime: true, b: true, bExt: true, c: true, d: true },
  { dimensions: "35 × 70", areaSqFt: "2,450", exec: true, a: true, prime: true, b: true, bExt: true, c: true, d: true },
  { dimensions: "40 × 80", areaSqFt: "3,200", exec: true, a: true, prime: true, b: true, bExt: false, c: false, d: true },
  { dimensions: "50 × 90", areaSqFt: "4,500", exec: true, a: true, prime: true, b: true, bExt: false, c: true, d: true },
  { dimensions: "2 Kanal", areaSqFt: "9,000–9,600", exec: false, a: true, prime: true, b: false, bExt: false, c: false, d: "Select" }
];

export const marlaComparisonData = [
  { dimensions: "25 × 50", areaSqFt: "1,250", at272: "4.59 Marla", at250: "5 Marla", at225: "5.56 Marla", usuallySold: "5 Marla" },
  { dimensions: "30 × 60", areaSqFt: "1,800", at272: "6.61 Marla", at250: "7.2 Marla", at225: "8 Marla", usuallySold: "7 or 8 Marla" },
  { dimensions: "35 × 70", areaSqFt: "2,450", at272: "9 Marla", at250: "9.8 Marla", at225: "10.89 Marla", usuallySold: "10 Marla" },
  { dimensions: "40 × 80", areaSqFt: "3,200", at272: "11.75 Marla", at250: "12.8 Marla", at225: "14.22 Marla", usuallySold: "12 or 14 Marla" },
  { dimensions: "50 × 90", areaSqFt: "4,500", at272: "16.53 Marla", at250: "18 Marla", at225: "20 Marla", usuallySold: "1 Kanal" }
];

export const blockGrowthStages = [
  {
    stage: "Original master plan",
    blocks: "A, B, C and Executive",
    meaning: "Older map downloads and some property portals still show only these four."
  },
  {
    stage: "Added later",
    blocks: "D (next to Block C), Prime (beside Block A), B Extension (beside Block B)",
    meaning: "A map that stops at Block C is out of date, not wrong."
  },
  {
    stage: "Listed by some partners",
    blocks: "Hill Estate View",
    meaning: "No payment plan confirmed; do not buy a file until the society office confirms it in writing."
  },
  {
    stage: "Named by one source only",
    blocks: '"Golf Block"',
    meaning: "Other sources mention a golf course as a master-plan feature, not a block; treat Golf Block offers with caution."
  }
];

export const buyerDecisionMatrix = [
  {
    goal: "Build a home now",
    consider: "Executive, A; possession-ready plots in B and C",
    tradeOff: "Highest prices; full payment"
  },
  {
    goal: "Pay in installments",
    consider: "Prime, D, B Extension",
    tradeOff: "Earlier-stage development"
  },
  {
    goal: "Buy commercial property",
    consider: "Executive Block",
    tradeOff: "Highest entry cost"
  },
  {
    goal: "Enter at the lowest price",
    consider: "C, D, B",
    tradeOff: "Longer wait for full development"
  },
  {
    goal: "Avoid earthwork costs",
    consider: "Level plots in developed blocks",
    tradeOff: "Check terrain plot by plot"
  }
];

export const auditedFaqs = [
  {
    q: "How many blocks does Faisal Hills have?",
    a: "Seven blocks are named most often: Executive, Prime, A, B, B Extension, C and D. Some partners also list Hill Estate View, and older maps show only four."
  },
  {
    q: "Why do some Faisal Hills maps show only four blocks?",
    a: "The original master plan covered Blocks A, B, C and Executive. Blocks D, Prime and B Extension were added later, and some portals and older downloads have not been updated."
  },
  {
    q: "Is there a Golf Block in Faisal Hills?",
    a: "Only one source we found lists a Golf Block; other sources do not. Confirm with the society office before considering any Golf Block offer."
  },
  {
    q: "Which blocks are developed and have possession?",
    a: "The Executive Block and Block A are the most developed, with residents and possession. Possession-ready plots have been offered in parts of Blocks B and C, and reports on Block D conflict. Confirm possession plot by plot."
  },
  {
    q: "Where is the main commercial area of Faisal Hills?",
    a: "In the Executive Block at the GT Road entrance, which contains Faisal Jewel and most commercial activity. Other blocks have smaller commercial plots."
  },
  {
    q: "Which blocks are on GT Road?",
    a: "The Executive Block sits at the main entrance on the Main GT Road (N-5). Some sources also describe Prime Block as running along GT Road."
  },
  {
    q: "Which is the largest block?",
    a: "Block B is described as the largest by land area. Blocks B and C each have over 8,000 residential plots."
  },
  {
    q: "What is the difference between Block B and Block B Extension?",
    a: "Block B is the larger, more developed block. B Extension is a smaller hillside addition of about 650 plots of 5 to 10 Marla, at an earlier stage."
  },
  {
    q: "Is Faisal Hills Phase 2 a block?",
    a: "No. It is a separate scheme with its own layout plan and approval."
  },
  {
    q: "Why is the same plot listed as 12 or 14 Marla?",
    a: "A 40 × 80 ft plot is 11.75 Marla at 272.25 sq ft, 12.8 at 250 sq ft and 14.22 at 225 sq ft. Compare plots by dimensions and square feet."
  }
];
