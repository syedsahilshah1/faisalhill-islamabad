import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, ShieldCheck, MapPin, CheckCircle2, Trees, Landmark, Activity, 
  HelpCircle, Zap, Car, ArrowRight, MessageSquare, PhoneCall, LayoutGrid, Award,
  Compass, BadgePercent, Shield, Layers, HelpCircle as HelpIcon, ArrowUpRight, Check
} from 'lucide-react';
import InteractiveMasterPlan from '@/components/map/InteractiveMasterPlan';
import FaqAccordion from '@/components/ui/FaqAccordion';

import { fetchSeo } from '@/data/faisalHillsData';
import { JsonLd, generateBreadcrumbSchema } from '@/components/seo/JsonLd';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhills.com.pk';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('faisal-hills-blocks') || await fetchSeo('blocks');

  const title = seo?.title || 'Faisal Hills Blocks | Executive, Prime, Block A, B, C & D Sectors';
  const description = seo?.meta_description || 'Explore all Faisal Hills Blocks: Executive, Prime, Block A, Block B, B-1 Extension, Block C, and Block D. Compare possession status, plot sizes, and master plan maps.';
  const canonical = seo?.canonical_url || `${BASE_URL}/faisal-hills-blocks`;
  const ogImg = seo?.og_image || `${BASE_URL}/images/imgi_38_Faisal-Hills-site-home-page-header.webp`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : ['Faisal Hills Blocks', 'Faisal Hills Executive Block', 'Faisal Hills Prime Block', 'Faisal Hills A Block', 'Faisal Hills B Block', 'Faisal Hills C Block', 'Faisal Hills D Block'];

  return {
    title: `${title} | Faisal Hills Real Estate`,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: seo?.robots_index !== false,
      follow: seo?.robots_follow !== false,
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      url: canonical,
      type: 'website',
      images: [{ url: ogImg, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitter_title || seo?.og_title || title,
      description: seo?.twitter_description || seo?.og_description || description,
      images: [seo?.twitter_image || ogImg],
    },
  };
}

interface BlockListItem {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  detailedCopy: string;
}

const blocksList: BlockListItem[] = [
  {
    name: "Executive Block",
    slug: "executive-block",
    tagline: "GT Road Entrance & Commercial Hub",
    description: "Directly on Main GT Road Taxila. Home to Faisal Jewel, civic centers, premium commercial plots, and Roots International School. Perfect for high-footfall business.",
    detailedCopy: "The Faisal Hills Executive Block is widely regarded as the most prestigious address within the society. Sitting directly on the Main GT Road, this block is home to the society's grand main entrance, which connects the entire development to the arterial road via Enayat Ullah Khan Avenue — a wide, tree-lined boulevard that sets the tone for the whole project. One of the defining landmarks of this block is Faisal Jewel, a prominent commercial and lifestyle development that adds significant value to the surrounding area. The block features a large civic and commercial centre, making it an attractive destination for businesses and investors seeking Faisal Hills commercial plots in a high-footfall location. For residents, the proximity to the GT Road Taxila location means effortless commutes to both Rawalpindi and Taxila city in minutes. Both residential and commercial plots are available in this block at competitive prices, making it equally suitable for homeowners who want a premium address and investors who want high return on investment from a GT Road-facing position."
  },
  {
    name: "Prime Block",
    slug: "prime-block",
    tagline: "VIP Enclave with Scenic Margalla Views",
    description: "Premium residential sector featuring wider streets, elevated topography, private guards, and scenic hilltop vistas. Ideal for high-end residential villas.",
    detailedCopy: "As the name suggests, the Faisal Hills Prime Block is designed for buyers who want a premium living environment without compromise. This block offers an exclusive residential character, with wider plot streets, more generous open spaces, and a quieter atmosphere compared to the busier entrance-facing sectors. It is well-connected internally to the B Extension Block and D Block, making daily movement within the society seamless. Faisal Hills residential plots in the Prime Block appeal particularly to families looking for a peaceful neighbourhood that still benefits from all shared amenities — parks, mosques, schools, and commercial access — just a short walk or drive away."
  },
  {
    name: "Block A",
    slug: "block-a",
    tagline: "Most Developed & Immediate Possession",
    description: "RDA-approved, fully populated zone adjacent to the main gate. Features finished houses, parks, central commercial markets, and the Grand Jamia Mosque.",
    detailedCopy: "Block A holds a special status among all Faisal Hills Blocks. It is the most developed sector in the society, located adjacent to the main entrance and one of the first areas to receive full RDA approval. For many buyers, RDA-approved status is non-negotiable — it provides legal certainty that their investment is protected and that the development follows all regulatory standards set by the Rawalpindi Development Authority. A key advantage of Block A is that it offers possessionable plots — meaning buyers can take possession of their land and begin construction immediately. This makes it a popular choice not only for investors but also for families who are ready to build their dream home now rather than wait. The block is well-served by educational facilities including schools, a mosque, parks, and a local commercial area, creating a genuinely complete neighbourhood within the larger society."
  },
  {
    name: "Block B",
    slug: "block-b",
    tagline: "Central Sector on Grand Boulevard",
    description: "Perfectly positioned between Block A and C along the 225ft Grand Boulevard. Offers mature infrastructure, sports facilities, and excellent residential value.",
    detailedCopy: "Faisal Hills B Block occupies a central position in the layout, situated between Block A and Block C. This geography gives it the best of both worlds: it is close enough to the main entrance area to enjoy Block A's infrastructure maturity, while also benefiting from the newer developments taking shape in Block C. The block features a well-planned layout with wide carpeted roads, dedicated parks, mosque facilities, and nearby commercial areas. Faisal Hills residential plots in Block B attract buyers who value a balanced location — not too close to the main gate and not too far from established amenities. For investors, the block sits in a sweet spot where prices remain reasonable while future development potential is strong."
  },
  {
    name: "Block B Extension",
    slug: "block-b1-extension",
    tagline: "Modern & Affordable Residential Zone",
    description: "Bridges the gap between central and outer zones near Block D. Highly affordable plots, rapid road-work progress, and solid mid-term capital growth.",
    detailedCopy: "The Faisal Hills B Extension Block was launched to meet growing demand for residential and commercial plots in a sector that bridges the gap between the central and outer zones of the society. Positioned close to Block D and the Prime Block, the B Extension enjoys smooth internal connectivity — a major consideration for families who need easy access to schools, mosques, and commercial facilities spread across multiple blocks. Designed as a modern residential zone, the block offers affordable residential and commercial plots with a full complement of infrastructure: wide access roads, parks and green spaces, and mosque facilities. For first-time buyers or investors working with a defined budget, the B Extension Block is one of the more accessible entry points into Faisal Hills plot investment."
  },
  {
    name: "Block C",
    slug: "block-c",
    tagline: "M-1 Motorway Proximity & High Growth",
    description: "Positioned close to the M-1 Motorway corridor, ensuring outstanding accessibility. Features water filtration plants, commercial zones, and scenic hill backdrops.",
    detailedCopy: "Faisal Hills Block C stands out for its strategic location and strong investment profile. One of its most significant advantages is proximity to the M-1 Motorway, which dramatically improves long-term accessibility and positions the block as a beneficiary of national infrastructure growth. As the motorway corridor develops, areas near its interchanges typically see above-average price appreciation — making Block C one of the more compelling options for investors focused on future development potential. The block carries full RDA approval, follows a modern master planned housing project layout, and offers a mix of residential and commercial plot sizes to suit different buyers. Whether you are looking for a quiet family plot or a commercial investment in a growing corridor, Block C's combination of connectivity, approvals, and layout makes it a strong contender."
  },
  {
    name: "Block D",
    slug: "block-d",
    tagline: "Suburban Sanctuary with Natural Topography",
    description: "Tranquil sector next to Block C, designed for peaceful family living. Offers fresh plot inventory at entry-level prices with high appreciation upside.",
    detailedCopy: "Faisal Hills Block D is among the newer sectors added to the society, introduced specifically to meet the rising demand from buyers who missed earlier phases of blocks A, B, and C. Situated next to Block C, Block D benefits from the established infrastructure of its neighbour while offering fresh plot inventory at prices that reflect its earlier stage of development. For investors, newer blocks have historically delivered stronger percentage returns as the surrounding infrastructure matures. Block D follows this pattern, offering residential and commercial plots in a sector where the combination of location, master planning, and growing society-wide amenities is expected to drive significant appreciation over the coming years."
  },
  {
    name: "Golf Block",
    slug: "gandahara",
    tagline: "Premium Golf-Centric Resort Living",
    description: "Exclusive lifestyle address designed around eco-friendly layout, open green putting spaces, historical parks, and premium resort facilities.",
    detailedCopy: "The Golf Block is one of the most distinctive features of Faisal Hills Islamabad blocks, setting the society apart from conventional housing projects in the region. Designed around a green recreational environment, this block offers a premium lifestyle experience with expansive open spaces, manicured surroundings, and a sense of exclusivity rarely found at this price point in the area. Residential plots in the Golf Block are ideal for buyers who prioritise a premium living environment, clean air, and open vistas. The block also serves as a leisure and lifestyle anchor for the entire society, reinforcing Faisal Hills' reputation as more than just a housing scheme — it is a complete, master-planned community."
  }
];

const faqs = [
  {
    q: "How many blocks are there in Faisal Hills?",
    a: "Faisal Hills Blocks currently consist of eight sectors: the Executive Block, Prime Block, Block A, Block B, Block B Extension, Block C, Block D, and the Golf Block. Each sector offers its own mix of residential and commercial plot options, catering to buyers with different budgets, lifestyle preferences, and investment goals. The master plan allows for future additions as demand grows."
  },
  {
    q: "Which block in Faisal Hills is RDA-approved?",
    a: "Block A is the most prominently RDA-approved sector and offers possessionable plots, making it the most legally secure and immediately accessible option for buyers. However, Faisal Hills as a whole is developed under RDA oversight as an approved housing society, so buyers across all Faisal Hills Blocks benefit from the regulatory framework that RDA approval provides."
  },
  {
    q: "Which Faisal Hills Block is best for investment?",
    a: "The best block for investment depends on your strategy. If you want a mature, lower-risk investment, Block A's possessionable plots and RDA-approval make it the safest choice. For higher potential returns from an earlier-stage sector, Block D and Block B Extension offer better entry prices. Block C is ideal for motorway-corridor investors focused on long-term future development potential. The Executive Block suits those wanting commercial plot investment near GT Road."
  },
  {
    q: "Where is Faisal Hills located and how do I access the blocks?",
    a: "Faisal Hills is located on the Main GT Road near Taxila, making it accessible from both Rawalpindi and Islamabad in under an hour during normal traffic. The main entrance to Faisal Hills Blocks is through the Executive Block via Enayat Ullah Khan Avenue directly off the GT Road. Block C also benefits from proximity to the M-1 Motorway for an additional access corridor."
  },
  {
    q: "Are there commercial plots available in Faisal Hills Blocks?",
    a: "Yes. Faisal Hills commercial plots are available in several blocks, with the highest concentration in the Executive Block, which features a dedicated civic and commercial centre. Commercial plot options also exist in Block A and other sectors within the society. Availability and pricing vary by location within the block and current development stage — contact the sales team for current inventory."
  },
  {
    q: "What amenities are available across Faisal Hills Blocks?",
    a: "All Faisal Hills Blocks are planned with consistent core amenities: wide carpeted roads, parks and green spaces, mosques, educational facilities including schools, and commercial areas. The Golf Block adds a recreational dimension with its green, open surroundings. The Executive Block hosts Faisal Jewel and a large civic centre. As development progresses, additional facilities including healthcare and sports complexes are planned."
  },
  {
    q: "Can I get a block map of Faisal Hills to see plot availability?",
    a: "Yes. A detailed Faisal Hills block map showing the exact location of all sectors, internal road network, amenity positions, and plot grid is available from the official sales office. You can also request an updated map through the website's contact form. The map is essential for understanding which plots within each block offer the most favourable location — such as corner plots, park-facing plots, or main-road plots."
  },
  {
    q: "What makes the Faisal Hills Golf Block different from other sectors?",
    a: "The Golf Block is the society's premium lifestyle address, designed around open green space rather than conventional plot-density models. It offers residents a sense of space, clean air, and recreational access that is rare in the Rawalpindi-Islamabad corridor at comparable price points. For buyers who want a premium living environment with a long-term leisure component built in, the Golf Block offers a genuinely differentiated option within the Faisal Hills community."
  }
];

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/faisal-hills-blocks/#webpage`,
      "url": `${BASE_URL}/faisal-hills-blocks`,
      "name": "Faisal Hills Blocks | All Sectors FH Islamabad",
      "description": "Explore all Faisal Hills Blocks — Executive, Prime, Block A, Block B, B Extension, Block C, Block D. RDA-approved plots near GT Road, Taxila.",
      "breadcrumb": {
        "@id": `${BASE_URL}/faisal-hills-blocks/#breadcrumb`
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/faisal-hills-blocks/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Faisal Hills Blocks", "item": `${BASE_URL}/faisal-hills-blocks` }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    },
    ...blocksList.map(block => ({
      "@type": "RealEstateListing",
      "name": `Faisal Hills ${block.name} — Residential & Commercial Plots`,
      "description": block.description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "GT Road, Taxila",
        "addressLocality": "Rawalpindi",
        "addressCountry": "PK"
      },
      "amenityFeature": ["Parks", "Mosque", "Schools", "Commercial Centre"]
    }))
  ]
};

export default function FaisalHillsBlocksPage() {
  return (
    <>
      <JsonLd data={schemaMarkup} />
      <div className="bg-[#fff8f6] min-h-screen text-slate-900 font-sans space-y-16 pb-16 selection:bg-[#7b002c] selection:text-white font-sans">
      
      {/* 1. HERO BANNER */}
      <section className="relative text-white overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20 border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/imgi_38_Faisal-Hills-site-home-page-header.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/80" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#7b002c]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-white tracking-widest font-bold font-mono uppercase">
              RDA Approved Society
            </span>
          </div>

          <div className="max-w-4xl space-y-3">
            <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Faisal Hills Blocks Overview
            </h1>
            <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-sans">
              Discover every residential and commercial sector in Faisal Hills Islamabad — including Executive Block, Prime Block, Block A, Block B, B Extension, Block C, and Block D.
            </p>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION BRIEF */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-sm border-l-8 border-[#7b002c] border-t border-r border-b border-slate-200/80 shadow-luxury p-8 lg:p-12 space-y-6">
          <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            <p>
              If you are exploring plot options in one of Islamabad's fastest-growing residential projects, you need a clear picture of how the society is laid out. Faisal Hills Blocks divide the entire master-planned community into distinct residential and commercial sectors — each with its own character, price point, and advantages. Whether you are buying a home for your family or looking for a smart investment opportunity in Islamabad, understanding the difference between each block is the first step toward making the right choice.
            </p>
            <p className="font-medium text-slate-900 border-t border-slate-100 pt-4 font-sans">
              Faisal Hills is a fully RDA-approved housing society strategically positioned on the Main GT Road, near Taxila, just a short drive from the twin cities of Rawalpindi and Islamabad. The project spans a vast area and is developed on modern master planning principles, offering everything from wide carpeted roads and parks and green spaces to schools, mosques, and thriving commercial centres. Across all Faisal Hills Blocks, the vision is the same: to create a self-sufficient, premium living environment where residents enjoy both comfort and long-term value.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE MAP SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="label-caps text-[#7b002c] font-bold block">Interactive Map Coordinates</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Block Map & Layout — Find Your Perfect Plot
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Understanding the spatial relationship between all Faisal Hills Blocks is essential before making a purchase decision. The block map shows the exact position of every sector, the main internal roads, access points from GT Road, and key amenities.
          </p>
        </div>

        <div className="bg-white rounded-sm p-4 shadow-luxury border border-slate-200">
          <InteractiveMasterPlan initialBlockSlug="all" />
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 font-sans">
            Use the map to identify which block aligns with your priorities: if GT Road frontage and commercial access matter most, the Executive Block stands out immediately. If RDA approval and possession are your top concerns, Block A is your starting point. For motorway-corridor investment, Block C is the natural choice.
          </p>
        </div>
      </section>

      {/* 4. OVERVIEW & CARDS SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
        <div className="space-y-2 border-b border-slate-200 pb-5">
          <span className="label-caps text-[#7b002c] font-bold block">Sectors Details</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Overview of All Faisal Hills Blocks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl font-sans">
            The society is organised into several well-defined sectors. Faisal Hills Blocks currently include the Executive Block, Prime Block, Block A, Block B, Block B Extension, Block C, Block D, and the Golf Block. Each of these sectors sits within a carefully designed master plan that ensures smooth internal road connectivity, balanced residential and commercial sectors, and easy access to the main GT Road.
          </p>
        </div>

        {/* Quick Card List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blocksList.map((block) => (
            <div key={block.slug} className="bg-white p-6 rounded-sm border border-slate-200/80 shadow-sm hover:shadow-luxury hover:border-[#7b002c]/20 transition-all flex flex-col justify-between space-y-4 card-hover-subtle">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#7b002c] bg-[#ffe9e6] border border-rose-100 px-2 py-0.5 rounded-sm uppercase inline-block font-sans">
                  {block.tagline}
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900">Faisal Hills {block.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-4">
                  {block.description}
                </p>
              </div>
              <Link
                href={`/blocks/${block.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] transition-colors font-sans"
              >
                <span>Explore Block Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DETAILED BLOCK BREAKDOWN SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-10">
        <div className="space-y-2 border-b border-slate-200 pb-5 text-center max-w-2xl mx-auto">
          <span className="label-caps text-[#7b002c] font-bold block">In-Depth Block Analysis</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Deep-Dive Into Each Sector
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Read complete details on the characteristics, advantages, infrastructure, and target audience for each Faisal Hills sector.
          </p>
        </div>

        <div className="space-y-8">
          {blocksList.map((block, index) => (
            <div 
              key={block.slug} 
              id={block.slug}
              className="bg-white rounded-sm border border-slate-200 shadow-sm p-6 lg:p-8 hover:border-[#7b002c]/20 hover:shadow-luxury transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-3 space-y-3">
                <span className="font-serif font-black text-[#7b002c]/10 text-4xl block leading-none">0{index + 1}</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Faisal Hills {block.name}
                </h3>
                <span className="text-[10px] label-caps text-amber-600 block">{block.tagline}</span>
                <div className="pt-2">
                  <Link
                    href={`/blocks/${block.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm font-sans"
                  >
                    <span>View Pricing & Maps</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-9 space-y-4">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
                  {block.detailedCopy}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-sans text-slate-600">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm">
                    <strong className="text-slate-800 block mb-0.5">Plot Categories</strong>
                    Residential & Commercial
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm">
                    <strong className="text-slate-800 block mb-0.5">Access Points</strong>
                    Internal Roads & Boulevards
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm">
                    <strong className="text-slate-800 block mb-0.5">Key Advantage</strong>
                    Master Planned Layout
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INFRASTRUCTURE & AMENITIES SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="bg-[#570000] text-white rounded-sm p-8 lg:p-12 border border-[#7b002c] shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="label-caps text-amber-400 font-bold block">Development Standards</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Infrastructure & Amenities Across All Blocks
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
              One of the reasons Faisal Hills Blocks continue to attract serious buyers is the consistent standard of infrastructure across the entire development. Rather than building up one sector while neglecting others, the master plan ensures a baseline quality of life in every block from the outset.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-800 font-sans">
            <div className="flex items-start gap-2 bg-white/10 border border-white/10 p-4 rounded-sm">
              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white font-serif">Road Infrastructure</h4>
                <p className="text-[10px] text-slate-300 mt-0.5">Wide carpeted roads with proper drainage and kerbing throughout all blocks.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-white/10 border border-white/10 p-4 rounded-sm">
              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white font-serif">Community Parks</h4>
                <p className="text-[10px] text-slate-300 mt-0.5">Parks and green spaces distributed across every sector for family recreation.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-white/10 border border-white/10 p-4 rounded-sm">
              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white font-serif">Civic Services</h4>
                <p className="text-[10px] text-slate-300 mt-0.5">Mosque and community amenities serving each neighborhood block locally.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-white/10 border border-white/10 p-4 rounded-sm">
              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white font-serif">Education & Utilities</h4>
                <p className="text-[10px] text-slate-300 mt-0.5">Schools, clinics, and fully underground electricity, gas, and water supply.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. WHY INVEST SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
        <div className="space-y-2 border-b border-slate-200 pb-5 text-center max-w-2xl mx-auto">
          <span className="label-caps text-[#7b002c] font-bold block">High-ROI Real Estate</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Why Faisal Hills Plot Investment Delivers Strong Returns
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Faisal Hills Blocks have consistently attracted investors from across Pakistan, and it is not difficult to understand why.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          
          <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-3 hover:border-[#7b002c]/20 hover:shadow-luxury transition-all card-hover-subtle">
            <div className="w-10 h-10 bg-[#ffe9e6] text-[#7b002c] rounded-sm flex items-center justify-center font-bold text-sm">
              📍
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">Location Premium</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              GT Road Taxila location offers unmatched connectivity between Rawalpindi, Islamabad, and the motorway network.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-3 hover:border-[#7b002c]/20 hover:shadow-luxury transition-all card-hover-subtle">
            <div className="w-10 h-10 bg-[#ffe9e6] text-[#7b002c] rounded-sm flex items-center justify-center font-bold text-sm">
              ⚖️
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">Regulatory Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Approved housing society layout plans by RDA eliminate the legal uncertainty that undermines many rival projects.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-3 hover:border-[#7b002c]/20 hover:shadow-luxury transition-all card-hover-subtle">
            <div className="w-10 h-10 bg-[#ffe9e6] text-[#7b002c] rounded-sm flex items-center justify-center font-bold text-sm">
              📈
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">Development Maturity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Block A's possessionable plots and the Executive Block's completed commercial centre demonstrate the developer's delivery record.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-3 hover:border-[#7b002c]/20 hover:shadow-luxury transition-all card-hover-subtle">
            <div className="w-10 h-10 bg-[#ffe9e6] text-[#7b002c] rounded-sm flex items-center justify-center font-bold text-sm">
              🗺️
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">Phase & Price Diversity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multiple blocks at different stages of development allow investors to choose between safer mature plots and higher-upside earlier-stage sectors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-3 hover:border-[#7b002c]/20 hover:shadow-luxury transition-all card-hover-subtle">
            <div className="w-10 h-10 bg-[#ffe9e6] text-[#7b002c] rounded-sm flex items-center justify-center font-bold text-sm">
              🏢
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">Commercial Prospects</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Executive Block and block-wise retail segments provide high-footfall opportunities for commercial plot investments and rental yield.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-3 hover:border-[#7b002c]/20 hover:shadow-luxury transition-all card-hover-subtle">
            <div className="w-10 h-10 bg-[#ffe9e6] text-[#7b002c] rounded-sm flex items-center justify-center font-bold text-sm">
              🔥
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">Growing Market Demand</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Islamabad's expanding population and limited supply of approved housing push demand towards quality, approved societies.
            </p>
          </div>

        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="max-w-[900px] mx-auto px-6 lg:px-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="label-caps text-[#7b002c] font-bold block">Frequently Asked Questions</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Frequently Asked Questions About Faisal Hills Blocks
          </h2>
          <p className="text-slate-600 text-sm font-sans">
            Optimized Q&A pairs mapping directly to search intent and Google rich snippet features.
          </p>
        </div>

        <FaqAccordion faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} blockName="Faisal Hills Blocks" />
      </section>

      {/* 9. CLOSING CTA BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-8 font-sans">
        <div className="rounded-sm bg-[#4c050d] text-white p-10 lg:p-14 border border-[#7b002c] shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block label-caps">Explore Plots Today</span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white font-serif">
              Ready to Explore Plot Options in Faisal Hills Blocks?
            </h2>
            <p className="text-slate-200 text-sm leading-relaxed">
              Faisal Hills Blocks offer a genuinely master-planned, RDA-approved community where every sector has been designed to deliver a premium living environment for residents and a credible return for investors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <a
              href="https://wa.me/923044811717"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white text-[#7b002c] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-sm shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer font-sans"
            >
              <MessageSquare className="w-4 h-4 text-[#7b002c]" />
              <span>CHAT VIA WHATSAPP</span>
            </a>

            <a
              href="tel:+923044811717"
              className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-white/20 font-sans"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>CALL SALES DESK</span>
            </a>
          </div>

          <div className="text-[10px] text-slate-400 font-mono tracking-widest pt-4 uppercase relative z-10 flex flex-wrap justify-center gap-6">
            <Link href="/about-us" className="hover:text-amber-400 transition-colors">→ About Faisal Hills</Link>
            <Link href="/plots" className="hover:text-amber-400 transition-colors">→ Search plot inventory</Link>
            <span>→ Website: faisaltown.org</span>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
