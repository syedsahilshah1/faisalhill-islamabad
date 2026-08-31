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
export const plotInventoryData: PlotItem[] = [];

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
    heroImage: "/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg",
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
    heroImage: "/images/faisalhillexecutive.webp",
    masterPlanImage: "/images/faisalexecutivemap.png",
    amenities: [
      { name: "Grand Entrance Monument", description: "State-of-the-art guarded entry portal with 24/7 biometric surveillance", icon: "Shield", image: "/images/faisalhillarc.jpg" },
      { name: "Roots International School", description: "Operational campus providing world-class international curriculum on-ground", icon: "GraduationCap", image: "/images/faisal-roots-school.jpg" },
      { name: "Central Park & Family Enclave", description: "12-Kanal lush green park with dedicated sports courts and tracks", icon: "Trees", image: "/images/faisal-park.jpg" },
      { name: "Jamia Masjid Fatima Tuz Zahra", description: "Grand architectural mosque for daily and Friday congregational prayers", icon: "Building", image: "/images/imgi_46_Mosques.webp" }
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
      { title: "Underground Electric Grid & Sector Utilities", date: "August 2026", image: "/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg", progress: 100, text: "100% underground cable laying completed and connected to the main feeder line." },
      { title: "225ft Main Boulevard & Commercial Asphalt", date: "July 2026", image: "/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg", progress: 95, text: "Final carpet asphalt applied on Executive Commercial Boulevard." }
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
      { question: "What is the payment plan for Faisal Jewel apartments and shops?", answer: "Faisal Jewel offers a flexible installment plan to make the purchase accessible. The structure typically involves a down payment of 20–30% at booking, quarterly instalments spread across the construction period, and a final payment of approximately 10% on possession in Q4 2027. Exact terms depend on the unit type and floor. Contact our team at +92 333 1113177 for a personalised payment schedule." },
      { question: "Who is the developer of Faisal Jewel?", answer: "Faisal Jewel is a joint venture between Zedem Properties Pvt. Ltd. and CAM Construction — two of Pakistan's most reputable names in real estate development and high-rise construction. Zedem Properties brings project development and commercial expertise, while CAM Construction handles the structural engineering and build quality." },
      { question: "When will Faisal Jewel be completed?", answer: "The targeted completion date for Faisal Jewel is Q4 2027. The project is currently under active construction, and regular updates are shared through the official website and sales team communications. Buyers are encouraged to register their details to receive project milestone notifications." },
      { question: "Is Faisal Jewel approved by the RDA?", answer: "Faisal Jewel is situated within the Faisal Hills development, which operates under the framework of an RDA-approved community. Buyers are advised to confirm the latest NOC and approval status directly with the developer's sales team, as documentation can be provided upon request." },
      { question: "What amenities does Faisal Jewel offer?", answer: "Faisal Jewel provides a comprehensive range of world-class amenities including a rooftop swimming pool, fully equipped fitness centre, rooftop lounge, gaming room, 24/7 security surveillance, in-building cafés, retail outlets on commercial floors, a business centre, and three levels of basement parking with over 1,000 spaces. Hotel residents also benefit from concierge services, restaurant dining, and WiFi throughout." },
      { question: "Can I invest in commercial shops in Faisal Jewel?", answer: "Yes. Faisal Jewel offers 350+ commercial shops across its six commercial floors, making it one of the largest commercial investment opportunities in the Faisal Hills area. Shops are available for sale on an instalment plan and are expected to generate strong rental yields due to the project's high-footfall location and the in-building hotel and apartment population. Contact the investment team for available inventory and pricing." },
      { question: "How do I book a unit in Faisal Jewel Islamabad?", answer: "Booking a unit in Faisal Jewel Islamabad is straightforward. You can call or WhatsApp the sales team at +92 333 1113177, visit the official website at faisalhillsislamabadfh.com, or send an email to info@faisalhillsislamabadfh.com. The team will share available inventory, floor plans, payment plan options, and guide you through the booking process step by step." }
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
    },
    {
      pageSlug: "about-us",
      pageTitle: "About Us Page",
      metaTitle: "About Faisal Hills | Zedem International & Vision",
      metaDescription: "Learn about Faisal Hills Taxila, Zedem International leadership, project milestones, RDA NOC approval, and visionary urban master planning.",
      metaKeywords: "About Faisal Hills, Zedem International, Chaudhry Abdul Majeed, Faisal Hills developers, RDA approval",
      ogTitle: "About Faisal Hills | Zedem International & Vision",
      ogDescription: "Learn about Faisal Hills Taxila, Zedem International leadership, project milestones, RDA NOC approval.",
      ogImage: "/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg",
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
      ogImage: "/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg",
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
      ogImage: "/images/faisal-park.jpg",
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
      ogImage: "/images/faisal-roots-school.jpg",
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
      ogImage: "/images/faisalhillarc.jpg",
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
      ogImage: "/images/faisalhillarc.jpg",
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
      ogImage: "/images/faisalhillarc.jpg",
      canonicalUrl: "https://faisalhills.com/privacy-policy",
      author: "Faisal Hills Compliance Team"
    }
  ]
};
export interface GalleryItem {
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


// -------------------------------------------------------------
// Laravel API Client Helpers
// -------------------------------------------------------------
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

let _cachedBlocks: BlockInfo[] = [];

export async function fetchBlocks(forceRefresh = false): Promise<BlockInfo[]> {
  if (!forceRefresh && _cachedBlocks.length > 0) {
    return _cachedBlocks;
  }
  try {
    const res = await fetch(`${API_URL}/blocks`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error('Failed to fetch blocks');
    const data = await res.json();
    _cachedBlocks = data.map(mapBlockToCamel);
    return _cachedBlocks;
  } catch (e) {
    console.error(e);
    return blocksData; // fallback
  }
}

export async function fetchBlock(slug: string): Promise<BlockInfo | null> {
  try {
    const res = await fetch(`${API_URL}/blocks/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error('Failed to fetch block');
    const data = await res.json();
    return mapBlockToCamel(data);
  } catch (e) {
    console.error(e);
    return blocksData.find(b => b.slug === slug || b.id === slug || (slug === 'faisal-jewel-islamabad' && (b.id === 'faisal-jewels' || b.slug === 'faisal-jewels'))) || null; // fallback
  }
}

let _cachedPlots: PlotItem[] = [];

export async function fetchPlots(forceRefresh = false): Promise<PlotItem[]> {
  if (!forceRefresh && _cachedPlots.length > 0) {
    return _cachedPlots;
  }

  try {
    const res = await fetch(`${API_URL}/plots`, { next: { revalidate: 120 } });
    if (!res.ok) throw new Error('Failed to fetch plots');
    const data = await res.json();
    _cachedPlots = Array.isArray(data) ? data.map(mapPlotToCamel) : (data?.data ? data.data.map(mapPlotToCamel) : []);
    return _cachedPlots;
  } catch (e) {
    console.error(e);
    return _cachedPlots || [];
  }
}

let _cachedGallery: GalleryItem[] = [];

export async function fetchGallery(forceRefresh = false): Promise<GalleryItem[]> {
  if (!forceRefresh && _cachedGallery.length > 0) {
    return _cachedGallery;
  }
  try {
    const res = await fetch(`${API_URL}/gallery`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error('Failed to fetch gallery');
    const data = await res.json();
    _cachedGallery = data.map(mapGalleryToCamel);
    return _cachedGallery;
  } catch (e) {
    console.error(e);
    return initialGalleryData; // fallback
  }
}

export async function fetchSettings(): Promise<Record<string, any>> {
  try {
    const res = await fetch(`${API_URL}/settings`, { next: { revalidate: 60 } });
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
    const res = await fetch(`${API_URL}/seo/${pageSlug}`, { next: { revalidate: 60 } });
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

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface AdminUserPayload {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  status: 'active' | 'inactive';
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
    throw new Error(err.message || (err.errors && Object.values(err.errors)[0] as string) || 'Authentication failed');
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

export async function apiFetchCurrentUser(token: string): Promise<AdminUser> {
  const res = await fetch(`${API_URL}/auth/user`, {
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
  const res = await fetch(`${API_URL}/auth/password`, {
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
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
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
  const res = await fetch(`${API_URL}/auth/reset-password`, {
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
  const res = await fetch(`${API_URL}/admin/users`, {
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
  const res = await fetch(`${API_URL}/admin/users`, {
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
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
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
  const res = await fetch(`${API_URL}/admin/users/${id}/status`, {
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
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
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
  const created = mapPlotToCamel(data);
  if (_cachedPlots) {
    _cachedPlots = [created, ..._cachedPlots];
  }
  return created;
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
  if (_cachedPlots) {
    _cachedPlots = _cachedPlots.filter(p => p.id !== id);
  }
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
    alt: item.alt || item.title,
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

export const initialBlogsData: BlogItem[] = [];

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
    const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const data = await res.json();
    const mapped = Array.isArray(data) ? data.map(mapBlogToCamel) : [];

    // Combine local custom blogs with API results (no dummy data)
    const combined = [...localBlogs, ...mapped];
    const seen = new Set<string>();
    return combined.filter(b => {
      const key = b.id || b.slug;
      if (seen.has(key)) return false;
      seen.add(key);
      return b.published !== false;
    });
  } catch (e) {
    console.error(e);
    const seen = new Set<string>();
    return localBlogs.filter(b => {
      const key = b.id || b.slug;
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
    const res = await fetch(`${API_URL}/blogs/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      return mapBlogToCamel(data);
    }
  } catch (e) {
    console.error(e);
  }

  return null;
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

// -------------------------------------------------------------
// Redirects API Helpers
// -------------------------------------------------------------

export async function apiFetchRedirects(token: string): Promise<RedirectItem[]> {
  const res = await fetch(`${API_URL}/redirects`, {
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
  const res = await fetch(`${API_URL}/redirects`, {
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
  const res = await fetch(`${API_URL}/redirects/${id}`, {
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
  const res = await fetch(`${API_URL}/redirects/${id}`, {
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
    const res = await fetch(`${API_URL}/redirects/active`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error('Failed to fetch active redirects:', e);
    return [];
  }
}

export async function fetchSitemapRoutes(): Promise<{ url: string; changefreq: string; priority: number; lastmod: string }[]> {
  try {
    const res = await fetch(`${API_URL}/sitemap-routes`, { next: { revalidate: 300 } });
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
    const res = await fetch(`${API_URL}/seo`, { next: { revalidate: 60 } });
    if (!res.ok) return initialSeoConfig;
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
    console.error('Failed to fetch global SEO settings:', e);
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
    const res = await fetch(`${API_URL}/settings/${key}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error(`Failed to fetch setting ${key}:`, e);
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




