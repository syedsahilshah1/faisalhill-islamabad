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
  id: string;
  plotNumber: string;
  blockSlug: string;
  blockName: string;
  category: 'Residential' | 'Commercial' | 'Apartment';
  size: string;
  dimensions: string;
  price: number;
  priceFormatted: string;
  priceHistoryTrend: string;
  status: 'Available' | 'Reserved' | 'Sold';
  facing: 'Park Facing' | 'Corner' | 'Main Boulevard' | 'Standard' | 'Hill View';
  mapCoords: { x: number; y: number }; // percentage coords on interactive master map
  features: string[];
  description: string;
  image: string;
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
  slug: string;
  content: string;
  summary: string;
  imageUrl: string;
  author: string;
  category: string;
  readTime: string;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
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
    features: ["Corner Plot", "Fronting 12-Kanal Park", "Underground Electricity", "Immediate Possession"],
    description: "Prime 10 Marla residential plot directly facing Sector A central park. Ideal for modern villa construction.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-102",
    plotNumber: "FJ-402",
    blockSlug: "faisal-jewel-islamabad",
    blockName: "Faisal Jewel",
    category: "Apartment",
    size: "2-Bed Luxury Flat",
    dimensions: "1,150 Sq Ft",
    price: 13500000,
    priceFormatted: "PKR 1.35 Crore",
    priceHistoryTrend: "+15.4% high demand",
    status: "Available",
    facing: "Hill View",
    mapCoords: { x: 15, y: 22 },
    features: ["26th Floor Sky View", "Serviced Hotel Suite", "Revolving Restaurant Access", "High Rental Yield"],
    description: "Luxury 2-Bedroom Serviced Apartment on the 14th floor of iconic Faisal Jewels Tower with Margalla views.",
    image: "/faisal-jewel.jpg"
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
    features: ["Fronting 60ft Boulevard", "Solid Land Ground", "Close to Jamia Mosque"],
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
    features: ["Double Side Corner", "225ft Boulevard Proximity", "Executive Club View"],
    description: "Luxurious 1 Kanal Corner Plot near GT Road Entrance Gate.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-105",
    plotNumber: "FJ-709",
    blockSlug: "faisal-jewel-islamabad",
    blockName: "Faisal Jewel",
    category: "Apartment",
    size: "1-Bed Executive Suite",
    dimensions: "650 Sq Ft",
    price: 8500000,
    priceFormatted: "PKR 85 Lacs",
    priceHistoryTrend: "+12.8% pre-launch ROI",
    status: "Available",
    facing: "Main Boulevard",
    mapCoords: { x: 16, y: 24 },
    features: ["Smart Automation Suite", "Furnished Interior Option", "Infinity Pool Access"],
    description: "Executive 1-Bedroom Apartment in Faisal Jewels Tower. Perfect for rental returns and luxury living.",
    image: "/faisal-jewel.jpg"
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
    features: ["Ground + 5 Approval", "225ft Main GT Entrance Road", "Ideal for Bank Plaza"],
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
    features: ["Margalla Mountain Backdrop", "Quiet Cul-de-Sac Street", "Full Utilities"],
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
    features: ["Private Gated Sector", "Exclusive Height Elevation", "Underground Fiber Optics"],
    description: "Ultra-luxury 1 Kanal plot in VIP Prime Block with Margalla panorama.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-109",
    plotNumber: "B-145",
    blockSlug: "block-b",
    blockName: "Block B",
    category: "Residential",
    size: "5 Marla",
    dimensions: "25 x 50",
    price: 4800000,
    priceFormatted: "PKR 48 Lacs",
    priceHistoryTrend: "+8.5% in last 6 months",
    status: "Available",
    facing: "Park Facing",
    mapCoords: { x: 60, y: 34 },
    features: ["Park Facing", "60ft Road Access", "Underground Electricity", "Peaceful Residential Area"],
    description: "Affordable 5 Marla residential plot in Block B directly facing the neighborhood park. Ideal for a modern compact home.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-110",
    plotNumber: "B-211",
    blockSlug: "block-b",
    blockName: "Block B",
    category: "Residential",
    size: "1 Kanal",
    dimensions: "50 x 90",
    price: 16500000,
    priceFormatted: "PKR 1.65 Crore",
    priceHistoryTrend: "+12.3% capital appreciation",
    status: "Available",
    facing: "Corner",
    mapCoords: { x: 62, y: 28 },
    features: ["Double Corner", "Panoramic Kala Chitta Hill Views", "Wide 80ft Street", "Immediate Possession"],
    description: "Premium double-corner 1 Kanal plot in Block B. Elevated position with sweeping mountain views — perfect for a luxury villa.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-111",
    plotNumber: "B-078",
    blockSlug: "block-b",
    blockName: "Block B",
    category: "Residential",
    size: "8 Marla",
    dimensions: "30 x 60",
    price: 6900000,
    priceFormatted: "PKR 69 Lacs",
    priceHistoryTrend: "+9.1% stable growth",
    status: "Reserved",
    facing: "Main Boulevard",
    mapCoords: { x: 56, y: 38 },
    features: ["Main Boulevard Frontage", "Full Utility Connection", "Near Community Mosque"],
    description: "Well-positioned 8 Marla plot on Block B's main internal boulevard. Excellent connectivity to the society entrance gate.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "plot-112",
    plotNumber: "B-302",
    blockSlug: "block-b",
    blockName: "Block B",
    category: "Commercial",
    size: "4 Marla",
    dimensions: "30 x 30",
    price: 9200000,
    priceFormatted: "PKR 92 Lacs",
    priceHistoryTrend: "+14.6% commercial demand",
    status: "Available",
    facing: "Main Boulevard",
    mapCoords: { x: 64, y: 32 },
    features: ["Ground + 4 Story Approval", "High Foot Traffic Area", "Near Sector Entrance", "Rental Income Potential"],
    description: "Prime 4 Marla commercial plot in Block B on the sector's main internal road. Perfect for a shop plaza, clinic, or business outlet.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  }
];

export const blocksData: BlockInfo[] = [
  {
    id: "executive-block",
    slug: "executive-block",
    name: "Executive Block",
    subtitle: "The Premier Entrance Block Facing N-5 GT Road",
    category: "developed",
    status: "Possession Ready",
    nocStatus: "RDA Approved & Clear",
    verificationDate: "August 2026",
    description: "Faisal Hills Executive Block is the primary commercial and civic hub of the society, positioned directly at the main entrance along GT Road (N-5). Home to key landmarks like Faisal Jewel, Roots International School, and Faisal Mansion, it offers a premier address with 225ft wide main entrance boulevard, underground utilities, and quick access to Rawalpindi and Taxila bypass.",
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
    heroImage: "/images/faisalhillexecutive.webp",
    masterPlanImage: "/images/faisalexecutivemap.png",
    amenities: [
      { name: "Grand Entrance Monument", description: "State-of-the-art guarded entry portal with 24/7 biometric surveillance", icon: "Shield", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=75" },
      { name: "Executive Club", description: "Luxury community center with swimming pool, gym, and fine dining", icon: "Building2", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=75" },
      { name: "Central Park & Jogging Track", description: "12-Kanal lush green park with dedicated sports courts", icon: "Trees", image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=600&q=75" },
      { name: "Underground Power Grid", description: "Zero overhead wiring with dedicated grid backup", icon: "Zap", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=75" }
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
      { title: "Underground Electric Grid Commissioned", date: "August 2026", image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80", progress: 100, text: "100% underground cable laying completed and connected to the main feeder line." },
      { title: "Commercial Boulevard Asphalt Paving", date: "July 2026", image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80", progress: 95, text: "Final carpet asphalt applied on Executive Commercial Boulevard." }
    ]
  },
  {
    id: "block-a",
    slug: "block-a",
    name: "Block A",
    subtitle: "The Vibrant Commercial & Residential Heart of Faisal Hills",
    category: "developed",
    status: "Fully Developed & Populated",
    nocStatus: "RDA Approved",
    verificationDate: "August 2026",
    description: "Faisal Hills Block A is the most developed and fully populated sector of the society, bordering the main entrance. Offering legal clarity with full RDA approval and possessionable plots, it is the top choice for home-builders ready to construct immediately near Jamia mosques, schools, and central commercial hubs.",
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
    subtitle: "Serene Residential Sector with Scenic Hill Views",
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
    category: "developed",
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
    subtitle: "Tranquil Residential Sanctuary with Natural Springs",
    category: "developed",
    status: "Development 85% Complete",
    nocStatus: "RDA Approved",
    verificationDate: "August 2026",
    description: "Faisal Hills Block D is a tranquil suburban sector situated on the western wing next to Block C. Designed around natural green topography and natural springs, Block D offers fresh plot inventory at entry-level prices with high appreciation upside near the proposed medical complex.",
    locationDetails: "Located on the western wing of Faisal Hills society.",
    highlights: [
      "Quiet Western Wing Suburban Layout",
      "Fresh Plot Inventory with Easy Installment Potential",
      "Lush Parks, Springs, & Proposed Medical Complex Site",
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
    id: "prime-block",
    slug: "prime-block",
    name: "Prime Block",
    subtitle: "Ultra-Luxury Gated Enclave Overlooking Margalla Ridge",
    category: "developed",
    status: "Exclusive Possession Sector",
    nocStatus: "RDA Approved",
    verificationDate: "August 2026",
    description: "Faisal Hills Prime Block is a premium VIP residential enclave positioned on the highest crest of the society. Overlooking the scenic Margalla Hills range, it features private gated perimeter, 225ft boulevard access, golf putting green, and high-elevation luxury villa plots.",
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
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    masterPlanImage: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80",
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
    id: "gandahara",
    slug: "gandahara",
    name: "Gandahara Block",
    subtitle: "Heritage & Modern Resort Style Living (Upcoming)",
    category: "upcoming",
    status: "Earthwork & Booking Stage",
    nocStatus: "Under Extension Clearance",
    verificationDate: "August 2026",
    description: "Inspired by Taxila's ancient Gandhara heritage, this upcoming block blends historical elegance with futuristic resort-style amenities and expansive eco-parks.",
    locationDetails: "Adjoining Phase 2 extension near Taxila historic bypass.",
    highlights: [
      "Resort Style Eco-Friendly Layout",
      "Historical Heritage Park & Museum",
      "Flexible 3-Year Installment Plan",
      "High Appreciation Pre-Launch Opportunity"
    ],
    totalPlots: 3500,
    priceRange: {
      residential: "PKR 35 Lacs - 95 Lacs",
      commercial: "PKR 90 Lacs - 2.8 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80",
    masterPlanImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      { name: "Gandhara Heritage Museum", description: "Cultural showcase & archaeological art gallery", icon: "Landmark", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=75" },
      { name: "Botanical Eco-Park", description: "15-Kanal natural flora garden with cycling trails", icon: "Trees", image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=600&q=75" }
    ],
    faqs: [
      { question: "Is booking open for Gandahara Block?", answer: "Pre-booking forms and allotment registrations are currently open on easy quarterly installments." }
    ],
    developmentUpdates: [
      { title: "Heavy Earthmoving Ground Work", date: "August 2026", image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80", progress: 45, text: "Land leveling & main access road cutting underway." }
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
    heroImage: "/faisal-jewel.jpg",
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
      { question: "What is the payment plan for Faisal Jewel apartments and shops?", answer: "Faisal Jewel offers a flexible installment plan to make the purchase accessible. The structure typically involves a down payment of 20–30% at booking, quarterly instalments spread across the construction period, and a final payment of approximately 10% on possession in Q4 2027. Exact terms depend on the unit type and floor. Contact our team at +92 304 4811 717 for a personalised payment schedule." },
      { question: "Who is the developer of Faisal Jewel?", answer: "Faisal Jewel is a joint venture between Zedem Properties Pvt. Ltd. and CAM Construction — two of Pakistan's most reputable names in real estate development and high-rise construction. Zedem Properties brings project development and commercial expertise, while CAM Construction handles the structural engineering and build quality." },
      { question: "When will Faisal Jewel be completed?", answer: "The targeted completion date for Faisal Jewel is Q4 2027. The project is currently under active construction, and regular updates are shared through the official website and sales team communications. Buyers are encouraged to register their details to receive project milestone notifications." },
      { question: "Is Faisal Jewel approved by the RDA?", answer: "Faisal Jewel is situated within the Faisal Hills development, which operates under the framework of an RDA-approved community. Buyers are advised to confirm the latest NOC and approval status directly with the developer's sales team, as documentation can be provided upon request." },
      { question: "What amenities does Faisal Jewel offer?", answer: "Faisal Jewel provides a comprehensive range of world-class amenities including a rooftop swimming pool, fully equipped fitness centre, rooftop lounge, gaming room, 24/7 security surveillance, in-building cafés, retail outlets on commercial floors, a business centre, and three levels of basement parking with over 1,000 spaces. Hotel residents also benefit from concierge services, restaurant dining, and WiFi throughout." },
      { question: "Can I invest in commercial shops in Faisal Jewel?", answer: "Yes. Faisal Jewel offers 350+ commercial shops across its six commercial floors, making it one of the largest commercial investment opportunities in the Faisal Hills area. Shops are available for sale on an instalment plan and are expected to generate strong rental yields due to the project's high-footfall location and the in-building hotel and apartment population. Contact the investment team for available inventory and pricing." },
      { question: "How do I book a unit in Faisal Jewel Islamabad?", answer: "Booking a unit in Faisal Jewel Islamabad is straightforward. You can call or WhatsApp the sales team at +92 304 4811 717, visit the official website at faisalhillsislamabadfh.com, or send an email to info@faisalhillsislamabadfh.com. The team will share available inventory, floor plans, payment plan options, and guide you through the booking process step by step." }
    ],
    developmentUpdates: [
      { title: "Floor 14 Slab Concrete Pouring", date: "August 2026", image: "/faisal-jewel.jpg", progress: 60, text: "High-strength RCC structure progressing smoothly." }
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
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  author: string;
}

export interface GlobalSeoSettings {
  siteName: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultMetaKeywords: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
  facebookAppId: string;
  twitterHandle: string;
  pages: SeoPageConfig[];
}

export const initialSeoConfig: GlobalSeoSettings = {
  siteName: "Faisal Hills Real Estate Portal",
  defaultMetaTitle: "Faisal Hills Real Estate | Official Master Plan, Plots & Prices",
  defaultMetaDescription: "Explore Faisal Hills Rawalpindi & Islamabad. Interactive plot map, NOC details, block prices, payment plans for Executive Block, Block A, B, C, D, Prime Block, Gandahara, Hills Walk & Faisal Jewels Tower.",
  defaultMetaKeywords: "Faisal Hills, Faisal Hills Taxila, Faisal Hills Rawalpindi, Executive Block Faisal Hills, Block A Faisal Hills, Block B Faisal Hills, Block C Faisal Hills, Prime Block Faisal Hills, Faisal Hills Plot Prices, Faisal Hills Map, Faisal Jewels Tower",
  googleSiteVerification: "google-site-verification-code-xyz123",
  bingSiteVerification: "bing-verification-code-abc456",
  facebookAppId: "9876543210",
  twitterHandle: "@FaisalHillsReal",
  pages: [
    {
      pageSlug: "home",
      pageTitle: "Home Page",
      metaTitle: "Faisal Hills Real Estate | Official Master Plan, Plots & Prices",
      metaDescription: "Explore RDA approved residential & commercial plot investments with interactive master map, block price rates, and instant online booking in Faisal Hills GT Road Taxila.",
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
      metaDescription: "Verified 3-year quarterly payment schedules for 5 Marla, 10 Marla, 1 Kanal plots and Faisal Jewels luxury apartments & commercial shops in Faisal Hills Taxila.",
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
      ogImage: "/faisal-jewel.jpg",
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
      metaDescription: "Faisal Hills Block B Extension: Affordable residential plots with high appreciation potential. Check current pricing, road-work progress & early possession details.",
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
      ogImage: "/faisal-jewel.jpg",
      canonicalUrl: "https://faisalhills.com/faisal-hills-commercial",
      author: "Faisal Hills Marketing Team"
    }
  ]
};
export interface GalleryItem {
  id: string;
  title: string;
  category: 'Infrastructure' | 'Towers' | 'Amenities' | 'Entrance';
  imageUrl: string;
  description?: string;
  dateAdded?: string;
}

export const initialGalleryData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Faisal Hills Arc Monument Entrance",
    category: "Entrance",
    imageUrl: "/images/faisalhillarc.jpg",
    description: "Grand Entrance Arc Portal on GT Road with 24/7 guarded security checkposts.",
    dateAdded: "August 2026"
  },
  {
    id: "gal-2",
    title: "Faisal Jewels 27-Story Skyscraper Tower",
    category: "Towers",
    imageUrl: "/images/imgi_175_faisal-jewel.jpg",
    description: "Architectural 27-story five-star luxury hotel & high-rise apartment tower.",
    dateAdded: "August 2026"
  },
  {
    id: "gal-3",
    title: "225ft Executive Commercial Boulevard",
    category: "Infrastructure",
    imageUrl: "/images/imgi_5_Rectangle-1-1-scaled-e1766059628733.png",
    description: "Wide asphalt carpeted boulevards with underground utilities and commercial plazas.",
    dateAdded: "August 2026"
  },
  {
    id: "gal-4",
    title: "Active On-Ground Development Site",
    category: "Infrastructure",
    imageUrl: "/images/imgi_160_WhatsApp-Image-2025-01-27-at-15.16.19_de49243e-1.jpg",
    description: "Heavy machinery active road cutting, sewerage laying and plot leveling.",
    dateAdded: "August 2026"
  },
  {
    id: "gal-5",
    title: "Hill Walk Commercial Strip Aerial View",
    category: "Infrastructure",
    imageUrl: "/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg",
    description: "Aerial view of the pedestrian-friendly commercial boulevard near Margalla Hills.",
    dateAdded: "August 2026"
  },
  {
    id: "gal-6",
    title: "Faisal Hills Master-Planned Community Drone View",
    category: "Entrance",
    imageUrl: "/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg",
    description: "Panoramic overhead drone view of blocks A, B, C, Executive & Prime Block.",
    dateAdded: "August 2026"
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

export const initialLeadsData: LeadItem[] = [
  {
    id: "lead-1",
    name: "Muhammad Rizwan",
    phone: "+92 300 9876543",
    interest: "Block A (10 Marla Park Facing)",
    message: "Looking for immediate possession plot near commercial area.",
    submittedAt: "Today, 02:45 PM"
  },
  {
    id: "lead-2",
    name: "Tariq Mahmood",
    phone: "+92 321 5551234",
    interest: "Faisal Jewels Luxury Flat #FJ-402",
    message: "Inquiring about 4-year installment plan & down payment.",
    submittedAt: "Yesterday, 06:15 PM"
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
  return {
    ...plot,
    plotNumber: plot.plot_number || plot.plotNumber,
    blockSlug: plot.block_slug || plot.blockSlug,
    blockName: plot.block_name || plot.blockName,
    priceFormatted: plot.price_formatted || plot.priceFormatted,
    priceHistoryTrend: plot.price_history_trend || plot.priceHistoryTrend,
    mapCoords: typeof plot.map_coords === 'string' ? JSON.parse(plot.map_coords) : (plot.map_coords || plot.mapCoords),
    features: typeof plot.features === 'string' ? JSON.parse(plot.features) : (plot.features || plot.features)
  };
}

export function mapGalleryToCamel(item: any): GalleryItem {
  if (!item) return item;
  return {
    ...item,
    imageUrl: item.image_url || item.imageUrl,
    dateAdded: item.date_added || item.dateAdded
  };
}

export function mapLeadToCamel(lead: any): LeadItem {
  if (!lead) return lead;
  return {
    ...lead,
    id: lead.id.toString(),
    submittedAt: lead.submitted_at || lead.submittedAt
  };
}

export function mapBlogToCamel(blog: any): BlogItem {
  if (!blog) return blog;
  return {
    ...blog,
    imageUrl: blog.image_url || blog.imageUrl,
    readTime: blog.read_time || blog.readTime,
    metaTitle: blog.meta_title || blog.metaTitle,
    metaDescription: blog.meta_description || blog.metaDescription,
    createdAt: blog.created_at || blog.createdAt,
    updatedAt: blog.updated_at || blog.updatedAt,
    published: blog.published !== undefined ? !!blog.published : true,
  };
}


// -------------------------------------------------------------
// Laravel API Client Helpers
// -------------------------------------------------------------
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchBlocks(): Promise<BlockInfo[]> {
  try {
    const res = await fetch(`${API_URL}/blocks`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blocks');
    const data = await res.json();
    return data.map(mapBlockToCamel);
  } catch (e) {
    console.error(e);
    return blocksData; // fallback
  }
}

export async function fetchBlock(slug: string): Promise<BlockInfo | null> {
  try {
    const res = await fetch(`${API_URL}/blocks/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch block');
    const data = await res.json();
    return mapBlockToCamel(data);
  } catch (e) {
    console.error(e);
    return blocksData.find(b => b.slug === slug) || null; // fallback
  }
}

export async function fetchPlots(): Promise<PlotItem[]> {
  try {
    const res = await fetch(`${API_URL}/plots`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch plots');
    const data = await res.json();
    return data.map(mapPlotToCamel);
  } catch (e) {
    console.error(e);
    return plotInventoryData; // fallback
  }
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  try {
    const res = await fetch(`${API_URL}/gallery`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch gallery');
    const data = await res.json();
    return data.map(mapGalleryToCamel);
  } catch (e) {
    console.error(e);
    return initialGalleryData; // fallback
  }
}

export async function fetchSettings(): Promise<Record<string, any>> {
  try {
    const res = await fetch(`${API_URL}/settings`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (e) {
    console.error(e);
    return {
      society_stats: societyStats,
      last_verified_date: societyStats.lastVerifiedDate
    }; // fallback
  }
}

export async function fetchSeo(pageSlug: string): Promise<any> {
  try {
    const res = await fetch(`${API_URL}/seo/${pageSlug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch SEO');
    return await res.json();
  } catch (e) {
    console.error(e);
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
  const res = await fetch(`${API_URL}/leads`, {
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

// -------------------------------------------------------------
// Admin Authenticated Operations
// -------------------------------------------------------------
export async function adminLogin(username: string, password: string): Promise<{ token: string; user: any }> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Authentication failed');
  }
  return await res.json();
}

export async function adminLogout(token: string): Promise<any> {
  const res = await fetch(`${API_URL}/auth/logout`, {
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

export async function apiUpdatePlot(id: string, plot: Partial<PlotItem>, token: string): Promise<PlotItem> {
  const payload: any = { ...plot };
  if (plot.plotNumber !== undefined) payload.plot_number = plot.plotNumber;
  if (plot.blockSlug !== undefined) payload.block_slug = plot.blockSlug;
  if (plot.blockName !== undefined) payload.block_name = plot.blockName;
  if (plot.priceFormatted !== undefined) payload.price_formatted = plot.priceFormatted;
  if (plot.priceHistoryTrend !== undefined) payload.price_history_trend = plot.priceHistoryTrend;
  if (plot.mapCoords !== undefined) payload.map_coords = plot.mapCoords;
  if (plot.features !== undefined) payload.features = plot.features;

  delete payload.plotNumber;
  delete payload.blockSlug;
  delete payload.blockName;
  delete payload.priceFormatted;
  delete payload.priceHistoryTrend;
  delete payload.mapCoords;

  const res = await fetch(`${API_URL}/plots/${id}`, {
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
  return mapPlotToCamel(data);
}

export async function apiCreatePlot(plot: Partial<PlotItem>, token: string): Promise<PlotItem> {
  const payload: any = { ...plot };
  if (plot.plotNumber !== undefined) payload.plot_number = plot.plotNumber;
  if (plot.blockSlug !== undefined) payload.block_slug = plot.blockSlug;
  if (plot.blockName !== undefined) payload.block_name = plot.blockName;
  if (plot.priceFormatted !== undefined) payload.price_formatted = plot.priceFormatted;
  if (plot.priceHistoryTrend !== undefined) payload.price_history_trend = plot.priceHistoryTrend;
  if (plot.mapCoords !== undefined) payload.map_coords = plot.mapCoords;
  if (plot.features !== undefined) payload.features = plot.features;

  delete payload.plotNumber;
  delete payload.blockSlug;
  delete payload.blockName;
  delete payload.priceFormatted;
  delete payload.priceHistoryTrend;
  delete payload.mapCoords;

  const res = await fetch(`${API_URL}/plots`, {
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
  return mapPlotToCamel(data);
}

export async function apiDeletePlot(id: string, token: string): Promise<any> {
  const res = await fetch(`${API_URL}/plots/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete plot');
  return await res.json();
}

export async function apiFetchLeads(token: string): Promise<LeadItem[]> {
  const res = await fetch(`${API_URL}/leads`, {
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
  const res = await fetch(`${API_URL}/leads/${id}`, {
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
    description: item.description,
  };
  const res = await fetch(`${API_URL}/gallery`, {
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
  const res = await fetch(`${API_URL}/gallery/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete gallery item');
  return await res.json();
}

export async function apiUpdateBlock(id: string, block: Partial<BlockInfo>, token: string): Promise<BlockInfo> {
  const payload: any = { ...block };
  if (block.nocStatus !== undefined) payload.noc_status = block.nocStatus;
  if (block.verificationDate !== undefined) payload.verification_date = block.verificationDate;
  if (block.priceRange !== undefined) payload.price_range = block.priceRange;
  if (block.masterPlanImage !== undefined) payload.master_plan_image = block.masterPlanImage;
  if (block.heroImage !== undefined) payload.hero_image = block.heroImage;
  if (block.developmentUpdates !== undefined) payload.development_updates = block.developmentUpdates;

  delete payload.nocStatus;
  delete payload.verificationDate;
  delete payload.priceRange;
  delete payload.masterPlanImage;
  delete payload.heroImage;
  delete payload.developmentUpdates;

  const res = await fetch(`${API_URL}/blocks/${id}`, {
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
  const res = await fetch(`${API_URL}/settings`, {
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
  const res = await fetch(`${API_URL}/seo/${pageSlug}`, {
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
  const res = await fetch(`${API_URL}/seo/global`, {
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

export async function fetchBlogs(): Promise<BlogItem[]> {
  try {
    const res = await fetch(`${API_URL}/blogs`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const data = await res.json();
    return data.map(mapBlogToCamel);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchBlogBySlug(slug: string): Promise<BlogItem | null> {
  try {
    const res = await fetch(`${API_URL}/blogs/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blog post');
    const data = await res.json();
    return mapBlogToCamel(data);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function apiFetchAllBlogs(token: string): Promise<BlogItem[]> {
  const res = await fetch(`${API_URL}/admin/blogs`, {
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
    content: blog.content,
    summary: blog.summary,
    image_url: blog.imageUrl,
    author: blog.author,
    category: blog.category,
    read_time: blog.readTime,
    published: blog.published,
    meta_title: blog.metaTitle,
    meta_description: blog.metaDescription,
    keywords: blog.keywords,
    faqs: blog.faqs
  };

  const res = await fetch(`${API_URL}/blogs`, {
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

export async function apiUpdateBlog(id: string, blog: Partial<BlogItem>, token: string): Promise<BlogItem> {
  const payload: any = {};
  if (blog.title !== undefined) payload.title = blog.title;
  if (blog.content !== undefined) payload.content = blog.content;
  if (blog.summary !== undefined) payload.summary = blog.summary;
  if (blog.imageUrl !== undefined) payload.image_url = blog.imageUrl;
  if (blog.author !== undefined) payload.author = blog.author;
  if (blog.category !== undefined) payload.category = blog.category;
  if (blog.readTime !== undefined) payload.read_time = blog.readTime;
  if (blog.published !== undefined) payload.published = blog.published;
  if (blog.metaTitle !== undefined) payload.meta_title = blog.metaTitle;
  if (blog.metaDescription !== undefined) payload.meta_description = blog.metaDescription;
  if (blog.keywords !== undefined) payload.keywords = blog.keywords;
  if (blog.faqs !== undefined) payload.faqs = blog.faqs;

  const res = await fetch(`${API_URL}/blogs/${id}`, {
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
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Failed to delete blog');
  return await res.json();
}


