export interface BlockDetailItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  subtitle: string;
  category: 'developed' | 'upcoming' | 'commercial';
  status: string;
  nocStatus: string;
  plotSizes: string;
  priceRange: {
    residential: string;
    commercial: string;
  };
  heroImage: string;
  badge: string;
  description: string;
  detailedCopy: string;
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
    category: "developed",
    status: "Possession Ready",
    nocStatus: "RDA Approved & NOC Clear",
    plotSizes: "5, 8, 10, 14 Marla & 1 Kanal",
    priceRange: {
      residential: "PKR 65 Lacs - 1.85 Crore",
      commercial: "PKR 2.2 Crore - 8.5 Crore"
    },
    heroImage: "/images/faisalhillexecutive.webp",
    badge: "Gateway Sector",
    description: "Directly on Main GT Road Taxila. Home to Faisal Jewel, civic centers, premium commercial plots, and Roots International School. Perfect for high-footfall business.",
    detailedCopy: "The Faisal Hills Executive Block is widely regarded as the most prestigious address within the society. Sitting directly on the Main GT Road, this block is home to the society's grand main entrance, which connects the entire development to the arterial road via Enayat Ullah Khan Avenue — a wide, tree-lined boulevard that sets the tone for the whole project. One of the defining landmarks of this block is Faisal Jewel, a prominent commercial and lifestyle development that adds significant value to the surrounding area. The block features a large civic and commercial centre, making it an attractive destination for businesses and investors seeking Faisal Hills commercial plots in a high-footfall location. For residents, the proximity to the GT Road Taxila location means effortless commutes to both Rawalpindi and Taxila city in minutes.",
    highlights: [
      "Main GT Road Entrance & 225ft Boulevard Roadways",
      "Civic Center Commercial Hub with Faisal Jewel High-Rise",
      "Roots International School Campus (Fully Operational)",
      "Immediate Home Construction & Possession-Ready Plots"
    ],
    amenities: ["Roots International School", "Faisal Jewel 27-Story Skyscraper", "Central Civic Center", "Fatima Tuz Zahra Jamia Mosque"],
    keyAdvantage: "Direct GT Road Frontage & Civic Center",
    deliveryTimeline: "Immediate Possession"
  },
  {
    id: "prime-block",
    name: "Prime Block",
    slug: "prime-block",
    tagline: "VIP Enclave with Scenic Margalla Views",
    subtitle: "Prestigious Elevated Enclave with Scenic Hill Views",
    category: "developed",
    status: "Possession Available",
    nocStatus: "RDA Approved",
    plotSizes: "5, 10 Marla & 1 Kanal",
    priceRange: {
      residential: "PKR 95 Lacs - 3.2 Crore",
      commercial: "PKR 3.5 Crore - 12 Crore"
    },
    heroImage: "/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg",
    badge: "VIP Elevated Sector",
    description: "Premium residential sector featuring wider streets, elevated topography, private guards, and scenic hilltop vistas. Ideal for high-end residential villas.",
    detailedCopy: "As the name suggests, the Faisal Hills Prime Block is designed for buyers who want a premium living environment without compromise. This block offers an exclusive residential character, with wider plot streets, more generous open spaces, and a quieter atmosphere compared to the busier entrance-facing sectors. It is well-connected internally to the B Extension Block and D Block, making daily movement within the society seamless. Faisal Hills residential plots in the Prime Block appeal particularly to families looking for a peaceful neighbourhood that still benefits from all shared amenities — parks, mosques, schools, and commercial access — just a short walk or drive away.",
    highlights: [
      "Elevated Natural Contour with Margalla Hills Panorama",
      "Wider 60ft to 120ft Sector Streets & Underground Utilities",
      "Dedicated Country Club & Private Security Patrol Unit",
      "High-Value 10 Marla & 1 Kanal Executive Villa Plots"
    ],
    amenities: ["Prime Country Club", "Private Security Patrol", "Elevated Hilltop Views", "Underground Electrification"],
    keyAdvantage: "Scenic Margalla Views & Wider Roads",
    deliveryTimeline: "Possession Ready"
  },
  {
    id: "block-a",
    name: "Block A",
    slug: "block-a",
    tagline: "Most Developed & Immediate Possession",
    subtitle: "Fully Developed & Populated Community Sector",
    category: "developed",
    status: "100% Developed & Populated",
    nocStatus: "RDA Approved",
    plotSizes: "5, 8, 10, 14 Marla & 1, 2 Kanal",
    priceRange: {
      residential: "PKR 55 Lacs - 1.6 Crore",
      commercial: "PKR 1.8 Crore - 6.5 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    badge: "Most Populated Sector",
    description: "RDA-approved, fully populated zone adjacent to the main gate. Features finished houses, parks, central commercial markets, and the Grand Jamia Mosque.",
    detailedCopy: "Block A holds a special status among all Faisal Hills Blocks. It is the most developed sector in the society, located adjacent to the main entrance and one of the first areas to receive full RDA approval. For many buyers, RDA-approved status is non-negotiable — it provides legal certainty that their investment is protected and that the development follows all regulatory standards set by the Rawalpindi Development Authority. A key advantage of Block A is that it offers possessionable plots — meaning buyers can take possession of their land and begin construction immediately. This makes it a popular choice not only for investors but also for families who are ready to build their dream home now rather than wait.",
    highlights: [
      "RDA-Approved & 100% Fully Populated Neighborhood",
      "Immediate Plot Possession & Active Construction of 350+ Villas",
      "Grand Jamia Mosque with 3,000 Worshipper Capacity",
      "Commercial Banks, Supermarkets & Medical Clinics"
    ],
    amenities: ["Grand Jamia Mosque", "Commercial Banks & Pharmacies", "Faisal Hills School Campus", "Central Community Park"],
    keyAdvantage: "Immediate Possession & Thriving Population",
    deliveryTimeline: "Immediate Possession"
  },
  {
    id: "block-b",
    name: "Block B",
    slug: "block-b",
    tagline: "Central Sector on Grand Boulevard",
    subtitle: "Grand Boulevard Central Living with Mountain Backdrops",
    category: "developed",
    status: "Possession Available",
    nocStatus: "RDA Approved",
    plotSizes: "5, 8, 10, 14 Marla & 1, 2 Kanal",
    priceRange: {
      residential: "PKR 50 Lacs - 1.45 Crore",
      commercial: "PKR 1.5 Crore - 4.8 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    badge: "Grand Boulevard",
    description: "Perfectly positioned between Block A and C along the 225ft Grand Boulevard. Offers mature infrastructure, sports facilities, and excellent residential value.",
    detailedCopy: "Faisal Hills B Block occupies a central position in the layout, situated between Block A and Block C. This geography gives it the best of both worlds: it is close enough to the main entrance area to enjoy Block A's infrastructure maturity, while also benefiting from the newer developments taking shape in Block C. The block features a well-planned layout with wide carpeted roads, dedicated parks, mosque facilities, and nearby commercial areas. Faisal Hills residential plots in Block B attract buyers who value a balanced location — not too close to the main gate and not too far from established amenities.",
    highlights: [
      "Central Position along the 225ft Grand Boulevard Spine",
      "Elevated Contour with Margalla & Kala Chitta Mountain Views",
      "10 Sector Parks, Mosque, & Dedicated Sports Complex",
      "Close Proximity to Central Gate and Block A Utilities"
    ],
    amenities: ["10 Sector Parks", "Sports Complex & Tennis Courts", "Hilltop Promenade", "Sector Commercial Arcade"],
    keyAdvantage: "Balanced Central Location & Sports Facilities",
    deliveryTimeline: "Possession Ready"
  },
  {
    id: "block-b1-extension",
    name: "Block B1 Extension",
    slug: "block-b1-extension",
    tagline: "Modern & Affordable Residential Zone",
    subtitle: "High-Growth Investment & Affordable Entry Plots",
    category: "upcoming",
    status: "Development 90% Complete",
    nocStatus: "RDA Approved",
    plotSizes: "5, 8 & 10 Marla",
    priceRange: {
      residential: "PKR 42 Lacs - 1.25 Crore",
      commercial: "PKR 1.2 Crore - 3.5 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    badge: "Lowest Entry Rates",
    description: "Bridges the gap between central and outer zones near Block D. Highly affordable plots, rapid road-work progress, and solid mid-term capital growth.",
    detailedCopy: "The Faisal Hills B Extension Block was launched to meet growing demand for residential and commercial plots in a sector that bridges the gap between the central and outer zones of the society. Positioned close to Block D and the Prime Block, the B Extension enjoys smooth internal connectivity — a major consideration for families who need easy access to schools, mosques, and commercial facilities spread across multiple blocks. Designed as a modern residential zone, the block offers affordable residential and commercial plots with a full complement of infrastructure.",
    highlights: [
      "Lowest Plot Entry Price inside Faisal Hills Society",
      "Modern Grid Streets and Compact 650-Home Layout",
      "Highly Affordable 5, 8, & 10 Marla Residential Plots",
      "High Appreciation Potential near D Block & Motorway Link"
    ],
    amenities: ["Green Belts & Street Landscaping", "Local Mosque", "Neighborhood Commercial", "24/7 Security Patrol"],
    keyAdvantage: "Highest Capital Appreciation Potential",
    deliveryTimeline: "Early Handover 2026-2027"
  },
  {
    id: "block-c",
    name: "Block C",
    slug: "block-c",
    tagline: "M-1 Motorway Proximity & High Growth",
    subtitle: "Luxury Sector Adjacent to Hills Walk & Central Water Features",
    category: "developed",
    status: "Possession Ready",
    nocStatus: "RDA Approved",
    plotSizes: "5, 8, 10, 14 Marla & 1 Kanal",
    priceRange: {
      residential: "PKR 48 Lacs - 1.75 Crore",
      commercial: "PKR 1.6 Crore - 5.5 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    badge: "Motorway Corridor",
    description: "Positioned close to the M-1 Motorway corridor, ensuring outstanding accessibility. Features water filtration plants, commercial zones, and scenic hill backdrops.",
    detailedCopy: "Faisal Hills Block C stands out for its strategic location and strong investment profile. One of its most significant advantages is proximity to the M-1 Motorway, which dramatically improves long-term accessibility and positions the block as a beneficiary of national infrastructure growth. As the motorway corridor develops, areas near its interchanges typically see above-average price appreciation — making Block C one of the more compelling options for investors focused on future development potential.",
    highlights: [
      "Strategic Proximity to M-1 Motorway Access Corridor",
      "Borders New City Phase 2 & central Hills Walk Promenade",
      "Active RO Water Filtration Plant & Finished Utilities",
      "Premium 10 Marla & 1 Kanal Hillside Plots"
    ],
    amenities: ["RO Water Filtration Plant", "Direct Hills Walk Walkway", "Underground Electrification", "Central Playgrounds"],
    keyAdvantage: "Fast Motorway Access & Hills Walk Proximity",
    deliveryTimeline: "Possession Ready"
  },
  {
    id: "block-d",
    name: "Block D",
    slug: "block-d",
    tagline: "Suburban Sanctuary with Natural Topography",
    subtitle: "Tranquil Residential Sanctuary & Serene Suburban Living",
    category: "upcoming",
    status: "Development 85% Complete",
    nocStatus: "RDA Approved",
    plotSizes: "5, 8, 10, 14 Marla & 1 Kanal",
    priceRange: {
      residential: "PKR 40 Lacs - 1.35 Crore",
      commercial: "PKR 1.1 Crore - 3.8 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    badge: "Suburban Sanctuary",
    description: "Tranquil sector next to Block C, designed for peaceful family living. Offers fresh plot inventory at entry-level prices with high appreciation upside.",
    detailedCopy: "Faisal Hills Block D is among the newer sectors added to the society, introduced specifically to meet the rising demand from buyers who missed earlier phases of blocks A, B, and C. Situated next to Block C, Block D benefits from the established infrastructure of its neighbour while offering fresh plot inventory at prices that reflect its earlier stage of development. For investors, newer blocks have historically delivered stronger percentage returns as surrounding infrastructure matures.",
    highlights: [
      "Quiet Western Wing Suburban Layout away from Highway Noise",
      "Fresh Plot Inventory with Easy Installment Potential",
      "Lush Parks, Green Belts, & Proposed Medical Complex Site",
      "Wide 50ft Internal Sector Road Grid"
    ],
    amenities: ["Proposed Medical Complex", "Sector Community Center", "Lush Parks & Play Areas", "Underground Drainage Network"],
    keyAdvantage: "Peaceful Residential Pocket & Medical Hub",
    deliveryTimeline: "Handover in Progress"
  },
  {
    id: "golf-block",
    name: "Golf Block",
    slug: "gandahara",
    tagline: "Premium Golf-Centric Resort Living",
    subtitle: "Exclusive Lifestyle Address with Open Putting Greens & Heritage Parks",
    category: "upcoming",
    status: "Exclusive Lifestyle Sector",
    nocStatus: "RDA Approved Master Plan",
    plotSizes: "10 Marla, 1 & 2 Kanal",
    priceRange: {
      residential: "PKR 75 Lacs - 2.5 Crore",
      commercial: "PKR 2.8 Crore - 7.5 Crore"
    },
    heroImage: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80",
    badge: "Resort Lifestyle",
    description: "Exclusive lifestyle address designed around eco-friendly layout, open green putting spaces, historical parks, and premium resort facilities.",
    detailedCopy: "The Golf Block is one of the most distinctive features of Faisal Hills Islamabad blocks, setting the society apart from conventional housing projects in the region. Designed around a green recreational environment, this block offers a premium lifestyle experience with expansive open spaces, manicured surroundings, and a sense of exclusivity rarely found at this price point in the area. Residential plots in the Golf Block are ideal for buyers who prioritise a premium living environment.",
    highlights: [
      "Manicured Golf Putting Green & Resort Ambiance",
      "Low-Density Eco-Friendly Housing Zone",
      "Margalla Foothills Views with Pristine Fresh Air",
      "Luxury 1 & 2 Kanal Farmhouse & Villa Plots"
    ],
    amenities: ["Golf Putting Greens", "Eco-Friendly Walking Trails", "Clubhouse & Cafe", "Heritage Theme Park"],
    keyAdvantage: "Low-Density Luxury & Golf Course Ambiance",
    deliveryTimeline: "Development Underway"
  },
  {
    id: "faisal-jewel",
    name: "Faisal Jewel",
    slug: "faisal-jewel-islamabad",
    tagline: "27-Story Mixed-Use Skyscraper",
    subtitle: "Iconic Ultra-Luxury High-Rise Tower & Commercial Mall",
    category: "commercial",
    status: "Under Active Construction",
    nocStatus: "RDA Approved High-Rise",
    plotSizes: "Commercial Shops & Luxury Suites",
    priceRange: {
      residential: "Starting PKR 5.8 Lacs (Installments)",
      commercial: "PKR 1.8 Crore - 18 Crore"
    },
    heroImage: "/faisal-jewel.jpg",
    badge: "Mega High-Rise",
    description: "Rising 27 stories high at the Grand Boulevard of Executive Block. Featuring 350+ commercial shops, 4-star hotel, food court, and 250+ serviced apartments.",
    detailedCopy: "Faisal Jewel Islamabad is a landmark 27-story mixed-use skyscraper offering luxury apartments and commercial shops in Faisal Hills. Rising above the junction of GT Road and the M-1 Motorway, this iconic high-rise features premium residences, retail shops, and a 4-star hotel with panoramic Margalla views.",
    highlights: [
      "27-Storey Iconic Landmark Skyscraper Architecture",
      "6 Commercial Floors + 18 Luxury Apartment Floors + 3 Basements",
      "350 Commercial Shops & 250 Luxury Serviced Suites",
      "1,000+ Vehicle Multi-Level Underground Parking Plaza"
    ],
    amenities: ["4-Star Hotel Suites", "Infinity Rooftop Pool", "Mega Retail Mall", "Multi-Level Smart Parking"],
    keyAdvantage: "Highest Commercial Footfall & Rental Yield",
    deliveryTimeline: "Target Handover Q4 2027"
  },
  {
    id: "hills-walk",
    name: "Hills Walk",
    slug: "hills-walk",
    tagline: "European Style Pedestrian Promenade",
    subtitle: "The Boulevard of Luxury Retail, Cafes & Fine Dining",
    category: "commercial",
    status: "Rapid Structural Construction",
    nocStatus: "RDA Approved Commercial Zone",
    plotSizes: "Commercial Plazas & Retail Outlets",
    priceRange: {
      residential: "Executive Studio Suites",
      commercial: "PKR 2.5 Crore - 15 Crore"
    },
    heroImage: "/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg",
    badge: "Commercial Promenade",
    description: "Faisal Hills' premier open-air lifestyle commercial destination lined with top fashion brands, outdoor cafes, rooftop dining, and corporate plazas.",
    detailedCopy: "Hills Walk is Faisal Hills' signature commercial destination. Designed as a European-style open-air pedestrian promenade lined with luxury brands, rooftop restaurants, banks, and corporate towers, positioned strategically between Block A, B, and C.",
    highlights: [
      "European Style Pedestrian Retail Boulevard",
      "Rooftop Dining Overlooking Margalla Water Stream",
      "Multi-Story Parking Structure with Smart Guidance",
      "Projected 9% - 12% Annual Rental Yields"
    ],
    amenities: ["Open-Air Amphitheater", "Water Fountain Promenade", "Valet Parking Plaza", "Rooftop Fine Dining"],
    keyAdvantage: "Pedestrian Shopping Strip & High Footfall",
    deliveryTimeline: "Phased Handover 2026-2027"
  }
];
