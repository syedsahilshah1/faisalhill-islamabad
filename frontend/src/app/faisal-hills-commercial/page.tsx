import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, ShieldCheck, MapPin, CheckCircle2, ShoppingBag, 
  HelpCircle, MessageSquare, PhoneCall, LayoutGrid, TrendingUp,
  FileText, SlidersHorizontal, ArrowRight, Sparkles, UserCheck, Briefcase,
  Store, Maximize2, Layers, Check, Coins, BadgeCheck
} from 'lucide-react';

import FaqAccordion from '@/components/ui/FaqAccordion';
import MasterPlanViewer from '@/components/map/MasterPlanViewer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { CommercialPlotsExplorer } from '@/components/commercial/CommercialPlotsExplorer';
import { CommercialAboutSection } from '@/components/commercial/CommercialAboutSection';

import { fetchSeo } from '@/data/faisalHillsData';
import { JsonLd, generateBreadcrumbSchema, generateFaqSchema } from '@/components/seo/JsonLd';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faisalhills.com.pk';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo('faisal-hills-commercial') || await fetchSeo('commercial');

  const title = seo?.title || 'Faisal Hills Commercial Plots for Sale 2026 | Prices & Payment Plan';
  const description = seo?.meta_description || 'Explore Faisal Hills commercial plots for sale in Taxila, Islamabad. Compare 2, 4, 5.33, 8, 10 and 12 marla prices, Executive and A–D Block options, and easy installment plans. Book today.';
  const canonical = seo?.canonical_url || `${BASE_URL}/faisal-hills-commercial`;
  const ogImg = seo?.og_image || `${BASE_URL}/images/commercial/flagship-store.jpg`;
  const keywords = seo?.keywords 
    ? seo.keywords.split(',').map((k: string) => k.trim()) 
    : ['Faisal Hills Commercial', 'Faisal Hills commercial plot price', 'Faisal Hills commercial payment plan', 'Faisal Hills Executive Block commercial', 'Faisal Hills commercial plots on installments'];

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

const blockCommercials = [
  {
    name: "Faisal Hills Executive Block Commercial",
    description: "The Executive Block is the most prestigious business zone in the project, sitting closest to the main GT Road entrance. Features ready shops, multi-storey corporate plazas, and open boulevard plots on the 225ft Grand Boulevard.",
    suitability: "Retail outlets, branded shops, corporate offices, banks, multi-brand fashion stores, mixed-use buildings",
    tag: "High Footfall Gateway",
    image: "/images/commercial/flagship-store.jpg"
  },
  {
    name: "Faisal Hills A Block Commercial",
    description: "Block A is among the most populated sectors of Faisal Hills with 1,200+ settled families. Commercial plots here provide immediate daily customer traffic for neighborhood grocery marts, pharmacies, and clinics.",
    suitability: "Daily-need retail, super marts, bakeries, clinical laboratories, salons, service businesses",
    tag: "Immediate Cash Flow",
    image: "/images/commercial/hypermarket.jpg"
  },
  {
    name: "Faisal Hills B Block Commercial",
    description: "Block B offers an upscale, serene business setting against the panoramic backdrop of the Margalla Hills. Ideal for lifestyle cafes, luxury jewelry studios, and aesthetic clinics facing wide 120ft boulevards.",
    suitability: "Mid-range retail, professional offices, jewelry souk, fine-dining bistros, tuition centers",
    tag: "Margalla Views",
    image: "/images/commercial/lifestyle-boutique.jpg"
  },
  {
    name: "Faisal Hills C Block Commercial",
    description: "The largest commercial hub in Faisal Hills with 800+ commercial plots surrounding the Civic Center, Central Monument, and Mega Mosque. Approved for B+G+9 high-rise shopping malls and business centers.",
    suitability: "Medium & long-term investors, mega shopping malls, food courts, corporate headquarters",
    tag: "800+ Plot Mega Hub",
    image: "/images/commercial/food-court.jpg"
  },
  {
    name: "Faisal Hills D Block Commercial",
    description: "Block D commercial plots sit at the most accessible price point with official on-ground possession granted. Rapid home construction ensures quick rise in commercial tenant demand.",
    suitability: "Affordable commercial entry, hardware & sanitary supply, retail mart, long-horizon appreciation",
    tag: "Best Entry Value",
    image: "/images/commercial/auto-hardware.jpg"
  },
  {
    name: "Faisal Hills Prime Block Commercial",
    description: "The newest premium launch in Faisal Hills offering attractive 4-year installment plans with lower upfront down payments. Strategically linked to the upcoming direct M-1 Motorway interchange.",
    suitability: "4-year installment buyers, high-yield file investors, corporate franchises",
    tag: "4-Year Installments",
    image: "/images/commercial/tech-gadgets.jpg"
  }
];

const commercialSizesShowcase = [
  {
    size: "4 to 5.33 Marla Plaza",
    dimensions: "30 × 30 ft to 40 × 30 ft (100 – 133 Sq. Yds)",
    height: "Basement + Ground + 5 Floors (B+G+5)",
    idealUse: "Boutique shops, pharmacies, cafes, doctor clinics, professional chambers",
    image: "/images/commercial/tech-gadgets.jpg",
    priceRange: "PKR 3.2 Cr – 4.5 Cr",
    badge: "Popular Entry"
  },
  {
    size: "8 Marla Boulevard Plaza",
    dimensions: "40 × 45 ft (200 Sq. Yds)",
    height: "Basement + Ground + 7 to 8 Floors (B+G+8)",
    idealUse: "Corporate bank branches, brand showrooms, multi-shop retail plaza, IT office",
    image: "/images/commercial/flagship-store.jpg",
    priceRange: "PKR 5.5 Cr – 7.5 Cr",
    badge: "High Visibility"
  },
  {
    size: "10 Marla Civic Center",
    dimensions: "45 × 50 ft to 35 × 70 ft (250 Sq. Yds)",
    height: "Basement + Ground + 9 Floors (B+G+9)",
    idealUse: "Departmental mall, multi-cuisine rooftop restaurant, fitness gym, diagnostics",
    image: "/images/commercial/food-court.jpg",
    priceRange: "PKR 8.0 Cr – 10.5 Cr",
    badge: "Mega Mall Plaza"
  },
  {
    size: "12 Marla High-Rise Unit",
    dimensions: "50 × 60 ft (300 Sq. Yds)",
    height: "Basement + Lower Ground + G + 9 Floors",
    idealUse: "Luxury corporate towers, serviced apartment suites, hotel branches",
    image: "/images/commercial/fashion-pret.jpg",
    priceRange: "PKR 11.0 Cr – 13.5 Cr",
    badge: "Corporate High-Rise"
  },
  {
    size: "1 Kanal Institutional Plot",
    dimensions: "50 × 90 ft (500 Sq. Yds)",
    height: "Dual Basement + Ground + 9 Floors",
    idealUse: "Full-scale shopping mall, private hospital, university campus, enterprise HQ",
    image: "/images/commercial/hypermarket.jpg",
    priceRange: "PKR 14.5 Cr – 18.0 Cr",
    badge: "Flagship Landmark"
  },
  {
    size: "Faisal Jewel Tower Unit",
    dimensions: "1,500 – 4,500 Sq. Ft. Double Height",
    height: "27-Storey Iconic Landmark Skyscraper",
    idealUse: "International luxury brands, 5-star hotel suites, penthouse offices",
    image: "/faisal-jewel-tower.jpg",
    priceRange: "Flexible Installments",
    badge: "27-Storey Icon"
  }
];

const faqs = [
  {
    q: "Is Faisal Hills commercial a good investment?",
    a: "Yes. For investors seeking high capital appreciation and strong rental yields, commercial plots in Faisal Hills present an exceptional case. With GT Road frontage, an upcoming direct M-1 Motorway interchange, and thousands of residing families, commercial supply is limited compared to expanding residential demand."
  },
  {
    q: "What is the current Faisal Hills commercial plot price?",
    a: "Commercial rates range from approximately PKR 2.45 Crore for 5 Marla in Block D up to PKR 6.8+ Crore for 8 Marla on the 225ft Executive Grand Boulevard, and PKR 15+ Crore for 1 Kanal Civic Center plots. We provide verified, real-time rates through our commercial desk."
  },
  {
    q: "Which block is best for commercial in Faisal Hills?",
    a: "The Executive Block is prime for high-visibility brands and banks due to its direct GT Road entrance. Block A is best for immediate cash-flow businesses serving settled residents. Block C is the largest commercial sector (800+ plots) for high-rise plazas, and Prime Block offers attractive 4-year installment options."
  },
  {
    q: "Are Faisal Hills commercial plots available on installments?",
    a: "Yes. Installment options are available in Executive Block, Block C, Block D, and Prime Block. Plans typically require a 20% to 25% down payment with the remaining amount spread across 12 to 16 quarterly installments."
  },
  {
    q: "What building height and floor bylaws are approved by RDA in Faisal Hills?",
    a: "Building bylaws permit Basement + Ground + 4 Floors (B+G+4) for standard sector commercial plots, and up to Basement + Ground + 8 or 9 Floors (B+G+9) on main 150ft and 225ft boulevards and the Block C Civic Center. Faisal Jewel is approved for 27 storeys."
  },
  {
    q: "What sizes of commercial plots are offered?",
    a: "Commercial categories include 4 Marla (30x30), 5.33 Marla (40x30), 5 Marla (30x37.5), 8 Marla (40x45), 10 Marla (45x50), 12 Marla (50x60), and 1 Kanal (50x90), along with multi-level showroom units in Faisal Jewel."
  },
  {
    q: "Can I buy a commercial plot and start construction immediately?",
    a: "Yes. Executive Block, Block A, Block B, and Block D have full on-ground possession. You can submit your architectural blueprints to the RDA and Faisal Hills design wing for immediate construction approval."
  },
  {
    q: "How does the commercial plot transfer process work?",
    a: "The seller clears all outstanding society dues, both parties submit official transfer documents at the Faisal Hills Head Office, payment is verified through documented banking channels, and an official Allotment Letter / Transfer Deed is issued in the buyer's name."
  },
  {
    q: "Can overseas Pakistanis buy and manage commercial plots remotely?",
    a: "Yes. Overseas clients can purchase and manage files remotely. We provide complete video site walkthroughs, verified file audits, transparent bank draft processing, and courier delivery of official society receipts."
  },
  {
    q: "What is the expected rental yield on a commercial plaza in Faisal Hills?",
    a: "Completed commercial plazas in Faisal Hills generate an estimated 12% to 16% annual rental yield, with ground-floor retail shops commanding premium per-square-foot rentals from grocery chains, pharmacies, and food franchises."
  }
];

export default function FaisalHillsCommercialPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Commercial Plots', url: `${BASE_URL}/faisal-hills-commercial` },
  ]);

  const faqSchema = generateFaqSchema(
    faqs.map(f => ({ question: f.q, answer: f.a }))
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd data={[breadcrumbSchema, faqSchema]} />

      {/* Hero Section with Luxury Commercial Background Image & Crisp White Typography */}
      <section className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 text-white border-b border-slate-200">
        {/* Crisp Commercial Background Image with Dark Contrast Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/commercial/flagship-store.jpg"
            alt="Faisal Hills Commercial"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          {/* Balanced Dark Luxury Overlay so background is visible and white text is 100% crystal clear */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-950/75" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-5 text-center flex flex-col items-center justify-center">

          <ScrollReveal direction="up" delay={80}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto text-center drop-shadow-md">
              Faisal Hills Commercial Plots for Sale in Taxila, Islamabad
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 w-full">
              <Link
                href="/plots?category=Commercial"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-xl flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Store className="w-4 h-4 text-white" />
                <span>Explore Commercial Inventory</span>
              </Link>

              <Link
                href="/faisal-hills-payment-plan"
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-full shadow-xl flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Coins className="w-4 h-4 text-[#7b002c]" />
                <span>Commercial Payment Plans</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Introduction with See More & Right-Side Images */}
      <CommercialAboutSection />

      {/* FULL COMMERCIAL PLOTS CATALOG & EXPLORER (CORE REQUEST) */}
      <CommercialPlotsExplorer />

      {/* COMMERCIAL PLOT SIZES & BYLAWS VISUAL SHOWCASE: 2 in line on mobile */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 space-y-8 bg-white border-y border-slate-200">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="label-caps text-[#7b002c] font-bold block">Plot Dimensions & Bylaws</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Commercial Plot Categories & Building Height Bylaws
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Compare ground dimensions, approved height allowances, and recommended commercial applications across all standard Faisal Hills plot sizes:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pt-4">
          {commercialSizesShowcase.map((item, idx) => (
            <ScrollReveal key={idx} direction="pop" delay={idx * 50}>
              <div className="bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                <Link 
                  href="/plots?category=Commercial"
                  className="relative h-28 min-[400px]:h-36 sm:h-48 w-full overflow-hidden bg-slate-900 block cursor-pointer"
                  title={`Click to view ${item.size} in Plot Inventory`}
                >
                  <Image
                    src={item.image}
                    alt={item.size}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#7b002c] text-white">
                    {item.badge}
                  </span>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                    <span className="text-[9px] sm:text-[11px] font-semibold text-rose-300 block truncate">{item.dimensions}</span>
                    <h3 className="font-serif font-bold text-xs sm:text-lg text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                      <span className="truncate">{item.size}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-amber-300 shrink-0" />
                    </h3>
                  </div>
                </Link>

                <div className="p-3 sm:p-5 space-y-2.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 sm:space-y-2.5 text-[10px] sm:text-xs font-sans">
                    <div className="flex justify-between items-center py-0.5 sm:py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Height:</span>
                      <strong className="text-slate-900 font-bold truncate max-w-[85px] sm:max-w-none">{item.height}</strong>
                    </div>
                    <div className="flex justify-between items-center py-0.5 sm:py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Price:</span>
                      <strong className="text-[#7b002c] font-bold truncate">{item.priceRange}</strong>
                    </div>
                    <div className="hidden sm:block pt-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Recommended Business:</span>
                      <p className="text-slate-600 leading-relaxed text-[11px] mt-0.5 line-clamp-2">{item.idealUse}</p>
                    </div>
                  </div>

                  <Link
                    href="/plots?category=Commercial"
                    className="w-full py-1.5 sm:py-2.5 bg-white border border-slate-300 hover:bg-[#7b002c] hover:border-[#7b002c] hover:text-white text-slate-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl text-center shadow-2xs transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer"
                  >
                    <Store className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>View Plots</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* OFFICIAL MASTER PLAN MAP BLUEPRINT (Clean 2-Column Design) */}
      <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Text & Features & Action Buttons */}
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
              <ScrollReveal direction="up" delay={50} className="space-y-2">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] tracking-tight leading-tight text-center lg:text-left">
                  Faisal Hills Master Plan Map
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center lg:text-left">
                  Explore the officially approved layout of Faisal Hills. Inspect plot dimensions, road networks, sector avenues, and central commercial boulevards with interactive deep zoom controls up to 1200%.
                </p>
              </ScrollReveal>

              {/* Desktop Action Buttons */}
              <ScrollReveal direction="up" delay={150} className="hidden lg:flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="/images/faisal-hills-master-plan-map.jpg"
                  download="Faisal-Hills-Master-Plan.jpg"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3.5 rounded-xl border border-[#7b002c] shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-white" />
                  <span>Download Master Plan (PDF)</span>
                </a>

                <Link
                  href="/master-plan"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] bg-white hover:bg-slate-100 px-5 py-3.5 rounded-xl border border-slate-300 shadow-sm transition-all duration-300 hover:scale-105"
                >
                  <span>Launch Fullscreen Map</span>
                  <ArrowRight className="w-4 h-4 text-[#7b002c]" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Right Column: Compact Interactive Map Viewer & Mobile Action Buttons */}
            <div className="lg:col-span-7 space-y-4">
              <ScrollReveal direction="left" delay={150}>
                <MasterPlanViewer heightClass="h-[210px] sm:h-[340px] lg:h-[440px]" />
              </ScrollReveal>

              {/* Mobile Action Buttons Below Map */}
              <div className="lg:hidden flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-1">
                <a
                  href="/images/faisal-hills-master-plan-map.jpg"
                  download="Faisal-Hills-Master-Plan.jpg"
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3.5 rounded-xl border border-[#7b002c] shadow-md transition-all active:scale-95 cursor-pointer text-center"
                >
                  <FileText className="w-4 h-4 text-white" />
                  <span>Download Master Plan (PDF)</span>
                </a>

                <Link
                  href="/master-plan"
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold text-[#7b002c] bg-white hover:bg-slate-100 px-5 py-3.5 rounded-xl border border-slate-300 shadow-sm transition-all active:scale-95 text-center"
                >
                  <span>Launch Fullscreen Map</span>
                  <ArrowRight className="w-4 h-4 text-[#7b002c]" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Commercial Pockets by Block: 2 in line on mobile */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <span className="label-caps text-[#7b002c] font-bold block">Sector-By-Sector Guide</span>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Faisal Hills Commercial Opportunities by Block
            </h2>
            <p className="text-xs text-slate-600 font-sans">
              Every block in Faisal Hills serves a distinct commercial demographic. Choose your sector according to your investment timeframe and tenant type:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {blockCommercials.map((block, idx) => (
            <ScrollReveal key={idx} direction="pop" delay={(idx % 3) * 60}>
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full group">
                {/* Commercial Block Image Banner */}
                <div className="relative h-28 min-[400px]:h-36 sm:h-44 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={block.image}
                    alt={block.name}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-white bg-[#7b002c] px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">
                    {block.tag}
                  </span>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                    <h3 className="font-serif font-bold text-xs sm:text-base text-white group-hover:text-amber-300 transition-colors truncate">
                      {block.name}
                    </h3>
                  </div>
                </div>

                <div className="p-3 sm:p-5 space-y-2 sm:space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                    {block.description}
                  </p>
                  <div className="pt-2 sm:pt-3 text-[9px] sm:text-[11px] text-slate-600 border-t border-slate-100 space-y-0.5 sm:space-y-1">
                    <span className="text-[#7b002c] font-bold block">Best Suited For:</span>
                    <p className="text-slate-500 truncate">{block.suitability}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services Grid: Landscape on mobile, 3-in-line on desktop */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 space-y-6 sm:space-y-8 bg-white border-y border-slate-200">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="label-caps text-[#7b002c] font-bold block">Our Services</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              End-to-End Commercial Real Estate Advisory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              From site inspection and plot selection to verified transfer letters and construction approvals:
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile View: Clean Landscape / Horizontal Cards */}
        <div className="block sm:hidden space-y-3 pt-2">
          {[
            {
              icon: Building2,
              title: "Commercial Plot Booking",
              desc: "Fresh bookings in open commercial blocks with transparent society fee verification, NOC checks, and payment schedules."
            },
            {
              icon: ShoppingBag,
              title: "Verified Resale Listings",
              desc: "Live inventory of commercial plots and plaza files from verified direct owners with complete ownership audit."
            },
            {
              icon: SlidersHorizontal,
              title: "Installment Plan Guidance",
              desc: "Clear breakdown of quarterly payments, possession-linked dues, and transfer fee structures."
            },
            {
              icon: LayoutGrid,
              title: "Block & Location Advisory",
              desc: "Honest analysis on footfall density, road widths, and commercial tenant demand tailored to your business model."
            },
            {
              icon: ShieldCheck,
              title: "Transfer & Documentation",
              desc: "Direct coordination with Faisal Hills Head Office for dues clearance, NOC validation, and official allotment letters."
            },
            {
              icon: TrendingUp,
              title: "Rental Yield & ROI Modeling",
              desc: "Projected rental return calculations, construction cost estimates, and commercial leasing support for plaza owners."
            }
          ].map((srv, sIdx) => {
            const IconComp = srv.icon;
            return (
              <ScrollReveal key={sIdx} direction="up" delay={sIdx * 40}>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-3.5 hover:bg-white hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#7b002c] shrink-0 mt-0.5 shadow-2xs">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="font-serif font-bold text-sm text-slate-900 leading-snug">{srv.title}</h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Desktop & Tablet View: 3 Column Grid Cards */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-4">
          {[
            {
              icon: Building2,
              title: "Commercial Plot Booking",
              desc: "Fresh bookings in open commercial blocks with transparent society fee verification, NOC checks, and payment schedules."
            },
            {
              icon: ShoppingBag,
              title: "Verified Resale Listings",
              desc: "Live inventory of commercial plots and plaza files from verified direct owners with complete ownership audit."
            },
            {
              icon: SlidersHorizontal,
              title: "Installment Plan Guidance",
              desc: "Clear breakdown of quarterly payments, possession-linked dues, and transfer fee structures."
            },
            {
              icon: LayoutGrid,
              title: "Block & Location Advisory",
              desc: "Honest analysis on footfall density, road widths, and commercial tenant demand tailored to your business model."
            },
            {
              icon: ShieldCheck,
              title: "Transfer & Documentation",
              desc: "Direct coordination with Faisal Hills Head Office for dues clearance, NOC validation, and official allotment letters."
            },
            {
              icon: TrendingUp,
              title: "Rental Yield & ROI Modeling",
              desc: "Projected rental return calculations, construction cost estimates, and commercial leasing support for plaza owners."
            }
          ].map((srv, sIdx) => {
            const IconComp = srv.icon;
            return (
              <ScrollReveal key={sIdx} direction="pop" delay={sIdx * 60}>
                <div className="p-5 sm:p-6 bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl space-y-2.5 sm:space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#7b002c] shadow-2xs">
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900">{srv.title}</h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Booking Process stepper: Landscape on mobile, 5-in-line on desktop */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 bg-white rounded-3xl border border-slate-200 my-8 sm:my-10 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="label-caps text-[#7b002c] font-bold block">5-Step Purchase Process</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              How to Buy a Commercial Plot in Faisal Hills
            </h2>
          </div>
        </ScrollReveal>

        {/* Mobile View: Section-Based Landscape Timeline */}
        <div className="block sm:hidden space-y-3 pt-2">
          {[
            { step: '01', label: 'Step 1', title: 'Define Business Use', desc: 'Identify required dimensions (4, 5.33, 8, 10, or 12 Marla) and building height needs.' },
            { step: '02', label: 'Step 2', title: 'Inventory Selection', desc: 'Review verified on-ground boulevard options, road widths, and corner premium plots.' },
            { step: '03', label: 'Step 3', title: 'Ground Inspection', desc: 'Inspect physical ground level, neighboring landmarks, and utility line connectivity.' },
            { step: '04', label: 'Step 4', title: 'Select Terms', desc: 'Choose between lump-sum cash transfer discount or structured quarterly installments.' },
            { step: '05', label: 'Final Step', title: 'Execute Transfer', desc: 'Submit official booking documents, clear society dues, and receive transfer letter.', highlight: true }
          ].map((st, sIdx) => (
            <ScrollReveal key={sIdx} direction="up" delay={sIdx * 40}>
              <div className={`p-4 rounded-2xl transition-all duration-300 flex items-start gap-3.5 ${
                st.highlight
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'bg-slate-50 border border-slate-200/80 hover:bg-white'
              }`}>
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                  st.highlight ? 'bg-white text-[#7b002c]' : 'bg-[#7b002c] text-white shadow-2xs'
                }`}>
                  {st.step}
                </span>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-serif font-bold text-sm ${st.highlight ? 'text-white' : 'text-slate-900'}`}>{st.title}</h3>
                    <span className={`text-[9px] font-bold uppercase tracking-wider font-sans ${
                      st.highlight ? 'text-rose-200' : 'text-[#7b002c]'
                    }`}>
                      {st.label}
                    </span>
                  </div>
                  <p className={`text-xs font-sans leading-relaxed pt-0.5 ${st.highlight ? 'text-rose-100' : 'text-slate-600'}`}>{st.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Desktop & Tablet View: 5-Column Stepper */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-5 pt-4">
          {[
            { step: '01', label: 'Step 1', title: 'Define Business Use', desc: 'Identify required dimensions (4, 5.33, 8, 10, or 12 Marla) and building height needs.' },
            { step: '02', label: 'Step 2', title: 'Inventory Selection', desc: 'Review verified on-ground boulevard options, road widths, and corner premium plots.' },
            { step: '03', label: 'Step 3', title: 'Ground Inspection', desc: 'Inspect physical ground level, neighboring landmarks, and utility line connectivity.' },
            { step: '04', label: 'Step 4', title: 'Select Terms', desc: 'Choose between lump-sum cash transfer discount or structured quarterly installments.' },
            { step: '05', label: 'Final Step', title: 'Execute Transfer', desc: 'Submit official booking documents, clear society dues, and receive transfer letter.', highlight: true }
          ].map((st, sIdx) => (
            <ScrollReveal key={sIdx} direction="pop" delay={sIdx * 60}>
              <div className={`p-5 rounded-3xl transition-all duration-300 flex flex-col space-y-4 h-full ${
                st.highlight
                  ? 'bg-[#7b002c] hover:bg-[#9e1245] text-white shadow-lg'
                  : 'bg-slate-50 border border-slate-200/80 hover:shadow-md hover:-translate-y-0.5'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                    st.highlight ? 'bg-white/10 text-white' : 'bg-[#7b002c]/10 text-[#7b002c]'
                  }`}>
                    {st.step}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider font-sans ${
                    st.highlight ? 'text-rose-200' : 'text-slate-400'
                  }`}>
                    {st.label}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className={`font-serif font-bold text-sm ${st.highlight ? 'text-white' : 'text-slate-900'}`}>{st.title}</h3>
                  <p className={`text-xs font-sans leading-relaxed ${st.highlight ? 'text-rose-100' : 'text-slate-500'}`}>{st.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-1">
            <span className="label-caps text-[#7b002c] font-bold block">Knowledge Base</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Commercial Plots Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <FaqAccordion faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} blockName="Faisal Hills Commercial" />
        </ScrollReveal>
      </section>

      {/* Closing CTA */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-16">
        <ScrollReveal direction="pop" delay={50}>
          <div className="rounded-3xl bg-slate-950 text-white p-8 lg:p-12 border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#7b002c]/25 rounded-full blur-[100px] pointer-events-none" />
            <div className="space-y-3 max-w-2xl relative z-10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Commercial Advisory Desk</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-bold">
                Book Your High-Yield Commercial Plot in Faisal Hills
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Connect with our certified Faisal Hills commercial specialists. We provide verified plot availability, site video walkthroughs, and official transfer coordination.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 relative z-10">
              <a
                href="https://wa.me/923331113177?text=Hi%20Faisal%20Hills%20Commercial%20Desk,%20I%20want%20to%20consult%20with%20a%20specialist%20about%20commercial%20plots."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-white text-[#7b002c] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#7b002c]" />
                <span>CHAT VIA WHATSAPP</span>
              </a>

              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>SCHEDULE CALL / SITE VISIT</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
