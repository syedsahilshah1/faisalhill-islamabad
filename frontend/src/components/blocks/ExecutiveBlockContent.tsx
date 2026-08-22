'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Building2,
  Trees,
  GraduationCap,
  Landmark,
  Phone,
  MessageSquare,
  FileText,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Award,
  Check,
  Send,
  HelpCircle,
  Car,
  Download,
  Compass,
  TrendingUp,
  Fuel,
  Activity,
  Layers,
  ChevronRight,
  BadgeCheck,
  Navigation,
  ExternalLink,
  PhoneCall,
  Calendar,
  Building,
  Zap,
  ArrowUpRight,
  Eye,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';

interface PlotPriceRow {
  size: string;
  dimension: string;
  price: string;
  category: string;
  suitability: string;
  features: string[];
  demandRange: string;
}

const residentialPlotDetails: PlotPriceRow[] = [
  {
    size: '5 Marla',
    dimension: '25 × 50 (139 Sq. Yds)',
    price: 'PKR 65 Lac – 90 Lac',
    category: 'Residential',
    suitability: 'First-time buyers, compact luxury villas, smart investors',
    features: ['Immediate Construction', 'Underground Electricity', 'Near Roots School & Park'],
    demandRange: 'High Demand (Fast Moving)'
  },
  {
    size: '8 Marla',
    dimension: '30 × 60 (200 Sq. Yds)',
    price: 'PKR 1.05 Cr – 1.20 Cr',
    category: 'Residential',
    suitability: 'Growing families wanting extra living space & double unit designs',
    features: ['Wide Street Access', 'Park Facing Options', 'Immediate Possession'],
    demandRange: 'Moderate-High Demand'
  },
  {
    size: '10 Marla',
    dimension: '35 × 70 (272 Sq. Yds)',
    price: 'PKR 1.20 Cr – 1.50 Cr',
    category: 'Residential',
    suitability: 'Large families, executive living near parks, schools and mosques',
    features: ['Near Jamia Masjid', 'Spacious Frontage', 'High Rental Yield Potential'],
    demandRange: 'Top Choice for Builders'
  },
  {
    size: '14 Marla',
    dimension: '40 × 80 (355 Sq. Yds)',
    price: 'PKR 1.45 Cr – 1.85 Cr',
    category: 'Residential',
    suitability: 'Premium residential villas, prime corner units & executive residences',
    features: ['40ft Wide Frontage', 'Boulevard Proximity', 'Exclusive Street Enclave'],
    demandRange: 'Limited Availability'
  },
  {
    size: '1 Kanal',
    dimension: '50 × 90 (500 Sq. Yds)',
    price: 'PKR 1.80 Cr – 2.90 Cr',
    category: 'Luxury Residential',
    suitability: 'Spacious mansions, luxury villas & maximum long-term capital appreciation',
    features: ['Margalla View Options', '50ft Frontage', 'Highest Capital Growth Velocity'],
    demandRange: 'Flagship Luxury Tier'
  },
];

const commercialPlotDetails = [
  { size: '30 × 25', dimension: '2.5 Marla Plaza', price: 'Market On-Call', suitability: 'Boutique retail, pharmacy, fast-food takeaway', frontage: 'Executive Commercial Strip' },
  { size: '30 × 30', dimension: '3.3 Marla Plaza', price: 'Market On-Call', suitability: 'Corner retail plaza, designer outlets & clinics', frontage: 'Civic Center Retail Strip' },
  { size: '40 × 40', dimension: '5.8 Marla Plaza', price: 'Market On-Call', suitability: 'Multi-brand retail showroom, corporate office', frontage: 'Near Faisal Jewel & School' },
  { size: '45 × 50', dimension: '8.0 Marla Plaza', price: 'Market On-Call', suitability: 'Corporate regional headquarters, bank branches', frontage: '225ft Main Boulevard' },
  { size: '50 × 50', dimension: '9.2 Marla Plaza', price: 'Market On-Call', suitability: 'Commercial banking plazas, luxury dining towers', frontage: 'Prime Boulevard Corner' },
  { size: '65 × 50', dimension: '12.0 Marla Plaza', price: 'Market On-Call', suitability: 'Megastructure commercial mall, multi-storey suites', frontage: 'Grand Entrance Axis' },
];

const travelTimes = [
  { destination: 'Taxila Bypass', time: '2 mins', distance: '1.2 km', note: 'Direct GT Road exit' },
  { destination: 'Multi Gardens B-17', time: '5 mins', distance: '4.5 km', note: 'Direct inter-city road link' },
  { destination: 'HITEC University Taxila', time: '9 mins', distance: '6.0 km', note: 'Premier engineering campus' },
  { destination: 'Taxila Cantt', time: '10 mins', distance: '7.5 km', note: 'Administrative cantonment zone' },
  { destination: 'Taxila Museum', time: '12 mins', distance: '8.2 km', note: 'World heritage landmark' },
  { destination: 'AWT-Sangjani Toll Plaza (M-1)', time: '20 mins', distance: '14 km', note: 'Direct M-1 connection' },
  { destination: 'Central Islamabad (Blue Area)', time: '25 mins', distance: '24 km', note: 'Via Margalla Ave & N-5' },
  { destination: 'Islamabad International Airport', time: '35 mins', distance: '32 km', note: 'Via Airport Cargo & M-1' },
  { destination: 'Saddar, Rawalpindi', time: '40 mins', distance: '28 km', note: 'Via N-5 National Highway' },
];

const nearbyLandmarks = [
  'Taxila Bypass',
  'HITEC University, Taxila',
  'Multi Gardens B-17',
  'Sangjani, Islamabad',
  'Tarnol',
  'Faisal Town Phase 1',
  'Margalla Avenue',
  'Taxila City'
];

const seoFaqs = [
  {
    q: 'Is Faisal Hills Executive Block in Islamabad or Rawalpindi?',
    a: 'Faisal Hills sits on the main GT Road, just a few minutes from B-17 Islamabad, but it technically falls under the jurisdiction of the Rawalpindi Development Authority (RDA).'
  },
  {
    q: 'Is the Faisal Hills Executive Block NOC approved?',
    a: 'Yes. The Executive Block has NOC approval from the RDA, meaning the development complies with regional housing regulations as an RDA approved housing society. We’d still recommend confirming the latest status directly with RDA before making a purchase.'
  },
  {
    q: 'What plot sizes are available for sale in Faisal Hills Executive Block?',
    a: 'Residential plots come in 5, 8, 10 and 14 Marla, plus 1 Kanal. Commercial plots are available in sizes ranging from 30×25 up to 65×50.'
  },
  {
    q: 'What is the current Faisal Hills Executive Block payment plan?',
    a: 'Terms vary by sector — some plots are sold on a resale, full-cash basis, while others may be available under an instalment plan with a down payment and quarterly payments, sometimes with a discount for lump-sum payment. Contact our team for the latest details on a specific plot.'
  },
  {
    q: 'What is the development status of Faisal Hills Executive Block?',
    a: 'The main boulevard, roads, sewerage and underground electricity are largely complete. Roots International School is operational, and construction on the Faisal Jewel project is progressing steadily.'
  },
  {
    q: 'Is Faisal Hills Executive Block a good investment?',
    a: 'Its GT Road location, RDA approval and ongoing development make it an appealing option for both end-users and investors — though, as with any real estate investment, returns aren’t guaranteed and depend on market conditions.'
  },
  {
    q: 'Where can I find the Faisal Hills Executive Block map?',
    a: 'You can request the latest master plan and zoning map directly from our team — we can also point out which sectors are closest to GT Road and which are quieter residential pockets.'
  }
];

export default function ExecutiveBlockContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [activePlotTab, setActivePlotTab] = useState<'residential' | 'commercial'>('residential');
  const [selectedResPlotIndex, setSelectedResPlotIndex] = useState(0);
  const [selectedComPlotIndex, setSelectedComPlotIndex] = useState(0);

  // Lead Form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPlot, setLeadPlot] = useState('5 Marla (25x50)');
  const [leadNote, setLeadNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedResPlot = residentialPlotDetails[selectedResPlotIndex];
  const selectedComPlot = commercialPlotDetails[selectedComPlotIndex];

  // Schema objects for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: seoFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://faisalhillsislamabadfh.com' },
      { '@type': 'ListItem', position: 2, name: 'Faisal Hills Blocks', item: 'https://faisalhillsislamabadfh.com/faisal-hills-blocks' },
      { '@type': 'ListItem', position: 3, name: 'Executive Block', item: 'https://faisalhillsislamabadfh.com/blocks/executive-block' }
    ]
  };

  const realEstateSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: 'Faisal Hills Executive Block Plots & Real Estate',
    description: 'RDA-approved residential and commercial plots in Faisal Hills Executive Block on Main GT Road N-5.',
    url: 'https://faisalhillsislamabadfh.com/blocks/executive-block',
    geo: { '@type': 'GeoCoordinates', latitude: '33.7431', longitude: '72.8258' }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Faisal Hills Official Advisory Portal',
    url: 'https://faisalhillsislamabadfh.com',
    logo: 'https://faisalhillsislamabadfh.com/images/logo.png',
    telephone: '+92 304 4811 717',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92 304 4811 717',
      contactType: 'Sales & Customer Facilitation',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu']
    }
  };

  return (
    <div className="space-y-12 lg:space-y-16 pt-2 font-sans text-slate-800">

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* ========================================================= */}
      {/* 1. EXECUTIVE QUICK STATS KPI BAR                         */}
      {/* ========================================================= */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#7b002c]/40 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Approval</span>
          </div>
          <strong className="text-slate-900 text-sm sm:text-base font-serif font-bold block">100% RDA Approved</strong>
          <span className="text-[11px] text-slate-500">Sanctioned NOC scheme</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#7b002c]/40 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 text-[#7b002c] mb-1">
            <Activity className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Status</span>
          </div>
          <strong className="text-slate-900 text-sm sm:text-base font-serif font-bold block">Ready for Construction</strong>
          <span className="text-[11px] text-slate-500">Possession on-ground</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#7b002c]/40 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Navigation className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Boulevard</span>
          </div>
          <strong className="text-slate-900 text-sm sm:text-base font-serif font-bold block">225ft - 250ft Main Axis</strong>
          <span className="text-[11px] text-slate-500">Grand entrance spine</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#7b002c]/40 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Landmark className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Landmark</span>
          </div>
          <strong className="text-slate-900 text-sm sm:text-base font-serif font-bold block">27-Storey Faisal Jewel</strong>
          <span className="text-[11px] text-slate-500">High-rise shopping & hotel</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-[#7b002c] to-[#4a001a] text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col justify-between">
          <div>
            <span className="text-amber-300 text-[10px] font-bold uppercase tracking-widest block mb-0.5">Direct Access</span>
            <strong className="text-white text-sm sm:text-base font-serif font-bold block">Main GT Road (N-5)</strong>
          </div>
          <span className="text-[11px] text-rose-200">Zone 2 Islamabad</span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. HERO SEO INTRODUCTION & H1                             */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 lg:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Civic & Commercial Center</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Faisal Hills Executive Block — Location, Plots, Prices and Investment Potential
          </h1>
        </div>

        <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans border-t border-slate-100 pt-6">
          <p className="font-medium text-slate-900 text-base sm:text-lg leading-relaxed">
            If you’ve been comparing housing options along Islamabad’s main GT Road, chances are Faisal Hills Executive Block has come up more than once. It sits right at the entrance of Faisal Hills, on the main G.T. Road (N-5), and acts as the civic and commercial center for the entire society — which is part of why it gets so much attention from both families and investors.
          </p>
          <p>
            This guide walks through everything a serious buyer usually wants to know about Faisal Hills Executive Block Islamabad: where it is, what’s already built, what plots are available, current pricing, the NOC status, and whether it makes sense as an investment. We’ve organised it so you can jump to whichever section matters most to you.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OVERVIEW & DUAL IDENTITY                               */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider block">Sector Masterplan</span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Overview of Faisal Hills Executive Block
          </h2>
        </div>

        <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
          <p>
            Faisal Hills Executive Block is the primary commercial and civic hub of Faisal Hills, positioned at the society’s main entrance on G.T. Road. It’s home to some of the project’s most talked-about developments — <Link href="/faisal-jewels" className="text-[#7b002c] font-bold hover:underline">Faisal Jewel</Link>, Faisal Mansion, and the Roots International School Campus all sit within this block.
          </p>
          <p>
            What sets the Executive Block apart from the more purely residential sectors of Faisal Hills is its dual identity. On one hand, it’s a modern residential community with houses, parks and mosques going up across multiple sectors. On the other, its status as the civic and commercial center means shops, offices, a school and a hotel-and-apartment tower are all part of the same masterplan — giving it both lifestyle appeal and genuine commercial investment opportunity.
          </p>
        </div>

        <div className="p-4 sm:p-5 bg-rose-50/70 rounded-2xl border border-rose-100 text-xs sm:text-sm text-slate-800 font-medium flex items-start sm:items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5 sm:mt-0" />
          <span>For end-users, that combination translates into a residential and commercial layout where daily errands, schooling and worship are all within a short drive. For investors, an active commercial core anchors surrounding plot values.</span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. INTERACTIVE PLOT SIZE EXPLORER (TABBED FILTER)         */}
      {/* ========================================================= */}
      <section className="bg-slate-900 text-white p-8 sm:p-10 lg:p-12 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive Pricing Matrix</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Executive Block Plot Price & Size Explorer
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              Switch categories below to inspect verified resale prices, dimensions, and allotment features across Executive Block:
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 bg-slate-950 rounded-2xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActivePlotTab('residential')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePlotTab === 'residential'
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Residential Plots (5)
            </button>
            <button
              onClick={() => setActivePlotTab('commercial')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePlotTab === 'commercial'
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Commercial Plazas (6)
            </button>
          </div>
        </div>

        {/* Tab 1: Residential Explorer */}
        {activePlotTab === 'residential' && (
          <div className="space-y-6">
            {/* Horizontal Plot Pills */}
            <div className="flex flex-wrap gap-2.5">
              {residentialPlotDetails.map((plot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedResPlotIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    selectedResPlotIndex === idx
                      ? 'bg-white text-[#7b002c] border-white shadow-lg scale-105'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{plot.size}</span>
                </button>
              ))}
            </div>

            {/* Selected Plot Feature Card */}
            <div className="bg-slate-950/80 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div>
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">{selectedResPlot.category} Plot</span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">{selectedResPlot.size} Plot ({selectedResPlot.dimension})</h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-slate-400 text-xs block">Estimated Resale Price</span>
                  <strong className="text-amber-400 font-serif font-bold text-xl sm:text-2xl">{selectedResPlot.price}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">Best Suited For</span>
                  <strong className="text-slate-200 text-sm block font-serif">{selectedResPlot.suitability}</strong>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">Market Trend</span>
                  <strong className="text-emerald-400 text-sm block font-serif">{selectedResPlot.demandRange}</strong>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">Legal & Possession</span>
                  <strong className="text-slate-200 text-sm block font-serif">RDA Approved & Delivered</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedResPlot.features.map((feat, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
                <a
                  href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(selectedResPlot.size)}%20plot%20in%20Faisal%20Hills%20Executive%20Block.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Commercial Explorer */}
        {activePlotTab === 'commercial' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2.5">
              {commercialPlotDetails.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedComPlotIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    selectedComPlotIndex === idx
                      ? 'bg-white text-[#7b002c] border-white shadow-lg scale-105'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{c.size}</span>
                </button>
              ))}
            </div>

            <div className="bg-slate-950/80 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div>
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Commercial Plaza Plot</span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">{selectedComPlot.dimension} ({selectedComPlot.size})</h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-slate-400 text-xs block">Current Valuation</span>
                  <strong className="text-amber-400 font-serif font-bold text-xl sm:text-2xl">{selectedComPlot.price}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">Prime Frontage</span>
                  <strong className="text-slate-200 text-sm block font-serif">{selectedComPlot.frontage}</strong>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">Commercial Suitability</span>
                  <strong className="text-slate-200 text-sm block font-serif">{selectedComPlot.suitability}</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <p className="text-xs text-slate-400">
                  Direct commercial inventory near Faisal Jewel skyscraper and Roots International School.
                </p>
                <a
                  href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(selectedComPlot.size)}%20Commercial%20Plot%20in%20Executive%20Block.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire Commercial Rate</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 5. OWNERS AND DEVELOPERS                                  */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Developer Pedigree</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Faisal Hills Executive Block Owners and Developers
          </h2>
        </div>

        <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
          <p>
            Faisal Hills, including the Executive Block, is developed by <Link href="/about-us" className="text-[#7b002c] font-bold hover:underline">Faisal Town Group</Link> under the leadership of Chaudhry Abdul Majeed, a name that’s well known across Islamabad and Rawalpindi’s real estate market. The group has been active for well over a decade, with a portfolio that includes Faisal Town, Faisal Margalla City, Faisal Residencia, Faisal Heights and Sea Square alongside Faisal Hills itself.
          </p>
          <p>
            That track record matters more than it might seem. A developer with several completed and ongoing projects has a reputation to protect, which generally translates into a stronger incentive to follow through on roads, utilities and landmark buildings rather than leaving them half-finished. The pace of work visible inside the Executive Block — particularly on <Link href="/faisal-jewels" className="text-[#7b002c] font-bold hover:underline">Faisal Jewel</Link> and Roots International School — is consistent with that pattern.
          </p>
          <p>
            If you’re doing your own due diligence (and with any real estate purchase, you should), it’s worth asking your dealer for documentation on the developer’s previous projects and current progress reports. A short visit to the site, or to one of the already-completed landmarks, tends to tell you more than any brochure can.
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Faisal Town Group Proven Portfolio</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">Faisal Town Phase 1</span>
            <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">Faisal Margalla City</span>
            <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">Faisal Residencia</span>
            <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">Faisal Heights</span>
            <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">Sea Square B-17</span>
            <span className="px-3 py-1 bg-rose-50 border border-rose-200 rounded-lg text-xs font-bold text-[#7b002c]">Faisal Hills Islamabad</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. NOC STATUS & LEGAL CLEARANCE                           */}
      {/* ========================================================= */}
      <section className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% RDA Approved</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Faisal Hills Executive Block NOC
          </h2>
        </div>

        <div className="prose max-w-none text-slate-300 text-sm leading-relaxed space-y-3 font-sans">
          <p>
            One of the first things serious buyers check is the No Objection Certificate, and the <Link href="/faisal-hills-noc-status" className="text-amber-400 font-bold hover:underline">Faisal Hills Executive Block NOC</Link> has been approved by the Rawalpindi Development Authority (RDA). Even though Faisal Hills sits close to the Islamabad border and is often marketed alongside Islamabad-based societies, it technically falls under RDA’s jurisdiction — so its legal status is benchmarked against RDA’s housing regulations rather than the CDA’s.
          </p>
          <p>
            In practical terms, this means the layout plan, land use and basic infrastructure requirements for Faisal Hills as an RDA approved housing society have been reviewed and cleared by the relevant authority. For a buyer, that reduces (though never fully eliminates) the risk of disputes over whether the land was legally available for housing in the first place.
          </p>
          <p>
            NOC status for housing societies in Pakistan can occasionally be updated or revised pending compliance checks, so it’s worth asking for the latest RDA documentation before transferring any funds. A quick check against RDA’s published list of approved societies takes very little time and can save a lot of stress later — it’s a small step that supports the idea of Faisal Hills Executive Block as a secure investment option.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-300">Layout plan fully cleared by RDA engineering directorate</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-300">Sanctioned land title and verified boundary demarcation</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-300">Ready for instant legal transfer and registry verification</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. LOCATION & MAP + GOOGLE MAP EMBED                      */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>N-5 GT Road Frontage</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Faisal Hills Executive Block Location and Map
          </h2>
          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
            <p>
              The Faisal Hills Executive Block location is one of its strongest selling points. Positioned directly off the main G.T. Road (N-5) near the society’s grand entrance, the block has the kind of road frontage that few housing schemes along this corridor can match. If you pull up the Faisal Hills Executive Block map, you’ll notice it sits right beside <Link href="/blocks/block-a" className="text-[#7b002c] font-bold hover:underline">Faisal Hills Block A</Link> and just a short drive from Taxila and Multi Gardens B-17 — placing it firmly in what locals refer to as Zone 2, Islamabad.
            </p>
            <p>
              For families relocating from Rawalpindi or Islamabad, or for overseas Pakistanis comparing options before a visit, the GT Road frontage means the block is easy to find and easy to reach — even on a first visit using GPS navigation. It’s also part of why this counts as a strategic location near Islamabad rather than a remote, hard-to-reach development.
            </p>
          </div>
        </div>

        {/* H3: Accessibility and Travel Times */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#7b002c]" />
            <span>Accessibility and Travel Times</span>
          </h3>
          <p className="text-xs text-slate-500">
            Here’s roughly how the Executive Block connects to the surrounding area:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            {travelTimes.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1.5 hover:border-[#7b002c]/40 hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{item.destination}</span>
                  <span className="px-2 py-0.5 bg-rose-50 text-[#7b002c] font-bold text-[10px] rounded-full border border-rose-100">
                    {item.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>Distance: {item.distance}</span>
                  <span className="text-slate-400 italic">{item.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* H3: Nearby Landmarks and Places */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[#7b002c]" />
            <span>Nearby Landmarks and Places</span>
          </h3>
          <p className="text-xs text-slate-600">
            A few landmarks worth knowing if you’re planning a visit or just getting familiar with the area:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {nearbyLandmarks.map((landmark, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7b002c] shrink-0" />
                <span>{landmark}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 italic pt-1">
            If you’d like to see the exact plot positions, our team can share the latest Faisal Hills Executive Block map and point out which sectors sit closest to the GT Road frontage versus the quieter residential pockets further inside the block.
          </p>
        </div>

        {/* Live Interactive Google Map Embed */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#7b002c]" />
                <span>Live Google Map Location</span>
              </h3>
              <p className="text-xs text-slate-500">
                Exact pin location of Faisal Hills Executive Block on Main GT Road (N-5), Taxila.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Faisal+Hills+Executive+Block+Taxila"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold rounded-xl border border-slate-300 transition-all hover:scale-105 shrink-0 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-[#7b002c]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <iframe
              title="Faisal Hills Executive Block Exact Location Google Map"
              src="https://maps.google.com/maps?q=Faisal+Hills+Executive+Block+GT+Road+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. MASTER PLAN SECTION WITH FORM DOWNLOAD                 */}
      {/* ========================================================= */}
      <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Zoning Blueprint</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                Faisal Hills Executive Block Master Plan
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                onClick={() => setIsMapModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Master Plan (PDF)</span>
              </button>
              <Link
                href="/master-plan"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-300 transition-all hover:scale-105"
              >
                <Compass className="w-4 h-4 text-[#7b002c]" />
                <span>Explore Full Society Map</span>
              </Link>
            </div>
          </div>

          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
            <p>
              The master plan for the Executive Block was designed with one goal in mind: residents shouldn’t have to leave the block for their everyday needs. It’s a genuinely master planned development — residential sectors sit alongside dedicated commercial zones, with Faisal Jewel, the Roots International School Campus and other mixed-use projects woven directly into the layout.
            </p>
            <p>
              The plan also sets aside space for a wide main boulevard (reported at around 250 feet across at its widest point), along with mosques, a cricket ground and parks distributed across the block. Compared with some of the older, purely residential sectors of Faisal Hills, the Executive Block was clearly planned with higher-density commercial use in mind — which is part of why it carries the “civic and commercial center” label for the whole society, and why its residential and commercial sectors work well alongside each other rather than competing for space.
            </p>
          </div>
        </div>

        {/* High-Resolution Map Showcase Container */}
        <div
          onClick={() => setIsMapModalOpen(true)}
          className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 group shadow-lg cursor-pointer"
        >
          <img
            src="/images/faisalexecutivemap.png"
            alt="Faisal Hills Executive Block Master Plan Map"
            className="w-full h-auto max-h-[600px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. FEATURED AVAILABLE PLOTS SHOWCASE                      */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider block">Verified Available Listings</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">Featured On-Ground Executive Plots</h2>
          </div>
          <Link
            href="/plots"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#7b002c] hover:underline"
          >
            <span>View All Plots Inventory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plot Card 1: EXE-048 */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 group">
            <div>
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                  alt="Plot #EXE-048"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#7b002c] text-white text-[11px] font-bold rounded-full shadow-md">
                    Available
                  </span>
                  <span className="px-3 py-1 bg-[#7b002c] text-white text-[11px] font-bold rounded-full shadow-md">
                    Residential
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">PLOT</span>
                  <span className="font-serif font-bold text-2xl tracking-tight">#EXE-048</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">SIZE</span>
                    <strong className="text-slate-900 text-sm font-serif font-bold block">1 Kanal</strong>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">FACING</span>
                    <strong className="text-slate-900 text-sm font-serif font-bold block">Corner</strong>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">DIMENSIONS</span>
                    <strong className="text-slate-900 text-sm font-serif font-bold block">50 × 90</strong>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">TREND</span>
                    <strong className="text-[#7b002c] text-xs font-bold block">+14% high demand</strong>
                  </div>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Luxurious 1 Kanal Corner Plot near GT Road Entrance Gate.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">DEMAND PRICE</span>
                <span className="font-serif font-bold text-xl sm:text-2xl text-slate-900">PKR 1.85 Crore</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/plots/plot-104"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-full transition-all"
                >
                  View Details
                </Link>
                <a
                  href="https://wa.me/923044811717?text=Hi%2C%20I%20am%20interested%20in%20Plot%20%23EXE-048%20(1%20Kanal%20Executive%20Block)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </a>
              </div>
            </div>
          </div>

          {/* Plot Card 2: EXE-112 */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 group">
            <div>
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                  alt="Plot #EXE-112"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#7b002c] text-white text-[11px] font-bold rounded-full shadow-md">
                    Available
                  </span>
                  <span className="px-3 py-1 bg-[#7b002c] text-white text-[11px] font-bold rounded-full shadow-md">
                    Commercial
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">PLOT</span>
                  <span className="font-serif font-bold text-2xl tracking-tight">#EXE-112</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">SIZE</span>
                    <strong className="text-slate-900 text-sm font-serif font-bold block">4 Marla Plaza Plot</strong>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">FACING</span>
                    <strong className="text-slate-900 text-sm font-serif font-bold block">Main Boulevard</strong>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">DIMENSIONS</span>
                    <strong className="text-slate-900 text-sm font-serif font-bold block">30 × 30</strong>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">TREND</span>
                    <strong className="text-[#7b002c] text-xs font-bold block">+18% commercial yield</strong>
                  </div>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Hot commercial plot on Executive Main Boulevard.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">DEMAND PRICE</span>
                <span className="font-serif font-bold text-xl sm:text-2xl text-slate-900">PKR 3.2 Crore</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/plots/plot-106"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-full transition-all"
                >
                  View Details
                </Link>
                <a
                  href="https://wa.me/923044811717?text=Hi%2C%20I%20am%20interested%20in%20Plot%20%23EXE-112%20(4%20Marla%20Commercial%20Executive%20Block)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. FACILITIES AND AMENITIES                              */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Trees className="w-3.5 h-3.5" />
            <span>Master Amenities</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Facilities and Amenities in Faisal Hills Executive Block
          </h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            Faisal Hills Executive Block facilities cover most of what a modern residential community needs day to day:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <strong className="text-sm font-bold text-slate-900 block">Civic Hub</strong>
            <p className="text-xs text-slate-600 leading-relaxed">The central business and community area for the entire society.</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <strong className="text-sm font-bold text-slate-900 block">Roots International School</strong>
            <p className="text-xs text-slate-600 leading-relaxed">An internationally benchmarked curriculum, already operational covering educational facilities.</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <strong className="text-sm font-bold text-slate-900 block">Faisal Jewel</strong>
            <p className="text-xs text-slate-600 leading-relaxed">A landmark high-rise combining residences, commercial floors, and a luxury hotel.</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <strong className="text-sm font-bold text-slate-900 block">Three Mosques</strong>
            <p className="text-xs text-slate-600 leading-relaxed">Including Jamia Masjid Fatima Tuz Zahra for daily prayers and community gatherings.</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center">
              <Trees className="w-5 h-5" />
            </div>
            <strong className="text-sm font-bold text-slate-900 block">Two Parks & Play Areas</strong>
            <p className="text-xs text-slate-600 leading-relaxed">Giving families genuine parks and green spaces close to home.</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <strong className="text-sm font-bold text-slate-900 block">Cricket Ground & Sports</strong>
            <p className="text-xs text-slate-600 leading-relaxed">For residents who want organised sports and active recreation nearby.</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center">
              <Fuel className="w-5 h-5" />
            </div>
            <strong className="text-sm font-bold text-slate-900 block">Fuel Station</strong>
            <p className="text-xs text-slate-600 leading-relaxed">Convenient fuel filling stations located directly off the entrance boulevard.</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <strong className="text-sm font-bold text-slate-900 block">High-Rise Apartment Sites</strong>
            <p className="text-xs text-slate-600 leading-relaxed">For those who prefer luxury apartment living over a standalone house.</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-medium">
          On the infrastructure side, the block also benefits from wide carpeted roads, underground electricity and a functioning sewerage system — the kind of modern infrastructure that’s easy to take for granted until you compare it with societies still waiting on basic utilities.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 11. PAYMENT PLAN AND PRICE GUIDE                          */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Pricing Guide</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Faisal Hills Executive Block Payment Plan and Price Guide
          </h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            Pricing in the Executive Block depends heavily on plot size, location within the block, and how developed that particular sector currently is. As a starting point for your research, here’s a general view of resale price ranges by plot size:
          </p>
        </div>

        {/* Resale Price Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#7b002c] text-white uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Plot Size</th>
                  <th className="p-4">Dimensions</th>
                  <th className="p-4">Approx. Resale Price Range (PKR)</th>
                  <th className="p-4">Best Suited For</th>
                  <th className="p-4 text-right">Inquiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {residentialPlotDetails.map((row, idx) => (
                  <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                    <td className="p-4 font-bold text-[#7b002c] text-sm">{row.size}</td>
                    <td className="p-4 font-mono font-medium text-slate-800">{row.dimension}</td>
                    <td className="p-4 font-bold text-slate-900 text-sm">{row.price}</td>
                    <td className="p-4 text-slate-600">{row.suitability}</td>
                    <td className="p-4 text-right">
                      <a
                        href="https://wa.me/923044811717?text=Hi%2C%20I%20am%20interested%20in%20Executive%20Block%20plot%20booking."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7b002c] hover:underline"
                      >
                        <span>Select</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 italic">
            Figures are indicative resale ranges and move with development progress and market conditions — confirm current numbers with our team before making a decision.
          </div>
        </div>

        <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Some plots in Faisal Hills Executive Block are sold on a resale basis with full cash payment, while others may still be available under a structured <Link href="/faisal-hills-payment-plan" className="text-[#7b002c] font-bold hover:underline">Faisal Hills Executive Block payment plan</Link> — typically a down payment followed by quarterly instalments over several years, with a discount sometimes offered for buyers who pay the full amount upfront. Because terms can vary from sector to sector and change over time, it’s best to confirm the exact payment plan applicable to a specific plot directly with our sales team before committing.
          </p>
          <p>
            As a rough guide: 5 Marla plots suit buyers who want a foothold in a more developed pocket of the block without stretching their budget too far. 10 Marla plots are popular with families wanting extra space near parks, schools and the main roads. And 1 Kanal plots remain the go-to choice for buyers focused on long term capital appreciation and a more premium lifestyle.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. KEY PROJECTS IN EXECUTIVE BLOCK (4 CLEAN CARDS)       */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5" />
            <span>Built Megastructures</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Key Projects in Faisal Hills Executive Block
          </h2>
          <p className="text-slate-700 text-sm">
            A few names come up constantly when people discuss this block, so it’s worth knowing what each one actually is:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Project 1: Faisal Jewel */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md hover:border-[#7b002c]/30 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-rose-50 text-[#7b002c] font-bold text-[10px] rounded-full uppercase tracking-wider border border-rose-100">
                  26-27 Storeys
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">#01</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">
                <Link href="/faisal-jewels" className="hover:text-[#7b002c] transition-colors">Faisal Jewel</Link>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                A high-rise project, reported at around 26 to 27 storeys, combining commercial retail space, residential apartments and a hotel component. It’s positioned as the architectural centrepiece of the Executive Block and has drawn attention for its design.
              </p>
            </div>
            <Link
              href="/faisal-jewels"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:underline pt-2 border-t border-slate-100"
            >
              <span>Explore Faisal Jewel Tower</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Project 2: Roots International School */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md hover:border-[#7b002c]/30 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full uppercase tracking-wider border border-emerald-100">
                  Fully Operational
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">#02</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Roots International School Campus</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                A fully functional educational facility offering an internationally benchmarked curriculum, giving resident families a nearby option for their children’s schooling.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 pt-2 border-t border-slate-100">
              <BadgeCheck className="w-4 h-4" />
              <span>Enrolling Students on Site</span>
            </div>
          </div>

          {/* Project 3: Sports Arena / Cricket Ground */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md hover:border-[#7b002c]/30 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold text-[10px] rounded-full uppercase tracking-wider border border-blue-100">
                  Active Sports
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">#03</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Sports Arena / Cricket Ground</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                A dedicated ground for cricket and community sporting events, part of the block’s broader parks and green spaces.
              </p>
            </div>
          </div>

          {/* Project 4: Faisal Mansion */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md hover:border-[#7b002c]/30 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 font-bold text-[10px] rounded-full uppercase tracking-wider border border-amber-100">
                  Facilitation Center
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">#04</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Faisal Mansion</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                A mid-rise building that houses the society’s official sales and customer facilitation offices. If you ever need to visit in person for documentation, this is likely where you’ll go.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 italic bg-white p-5 rounded-2xl border border-slate-200">
          Together, these projects are what elevate the Executive Block from “a collection of plots” to something closer to a small, self-contained town centre — and they’re a big part of why this block is treated as the flagship of Faisal Hills.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 13. DEVELOPMENT STATUS                                    */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>On-Ground Progress</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Faisal Hills Executive Block Development Status
          </h2>
        </div>

        <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
          <p>
            In short, the Faisal Hills Executive Block development status is “actively under construction, with a lot already in place.” The main boulevard, internal roads and streets are functional. Sewerage, street lighting and underground electricity work have largely been completed across the developed sectors.
          </p>
          <p>
            On the landmark front, the Roots International School Campus is operational and already teaching students — not a rendering on a brochure, but a working school. Construction on the <Link href="/faisal-jewels" className="text-[#7b002c] font-bold hover:underline">Faisal Jewel project</Link> has been progressing steadily, with the structure reportedly nearing completion, and its design has even picked up recognition at international property award events.
          </p>
          <p>
            Home construction is also visibly underway across multiple sectors, which is generally reassuring for anyone wary of buying into a project that’s still mostly empty land. That said, development pace can vary by sector — some parts of the Executive Block are noticeably further along than others, so it’s worth asking specifically about the sector your plot is in rather than judging by the block’s overall progress. Read the <Link href="/blogs" className="text-[#7b002c] font-bold hover:underline">latest investment guides on our blog</Link> for detailed quarterly development photo logs.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 14. WHY INVEST IN EXECUTIVE BLOCK                         */}
      {/* ========================================================= */}
      <section className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ROI & Capital Growth</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Why Invest in Faisal Hills Executive Block
          </h2>
          <p className="text-slate-300 text-sm">
            If you’re weighing a Faisal Hills Executive Block investment against other options along GT Road, here’s what tends to stand out:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">Strategic GT Road Access</strong>
            <span className="text-slate-300">Direct N-5 frontage with rapid proximity to Rawalpindi, Taxila, and Wah.</span>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">RDA Approved Society</strong>
            <span className="text-slate-300">Sanctioned legal status providing full buyer protection and clear titles.</span>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">Civic & Commercial Anchor</strong>
            <span className="text-slate-300">Commercial hub supporting both residential value and commercial rental yields.</span>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">Visible Active Development</strong>
            <span className="text-slate-300">Active on-ground construction rather than mere renderings and speculative promises.</span>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">Family-Friendly Living</strong>
            <span className="text-slate-300">Roots School, Jamia mosques, and community parks already fully functioning.</span>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">Long Term Capital Growth</strong>
            <span className="text-slate-300">High appreciation velocity as Faisal Jewel and surrounding plazas near full completion.</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
          None of this guarantees a particular outcome — real estate carries risk like any investment, and prices can move in either direction depending on broader market conditions. But for buyers looking for a secure investment option with both end-use and resale potential, and the possibility of a high return on investment over the medium to long term, the combination of location, legal status and active development is hard to ignore.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 15. FAISAL HILLS EXECUTIVE BLOCK PRICE                    */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Faisal Hills Executive Block Price
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed font-sans">
          The Faisal Hills Executive Block Price varies based on several factors, including plot size, location within the block, development status, and plot category. Residential and commercial plots in the Executive Block have attracted significant attention due to the area’s modern infrastructure, prime location, and growing demand among investors and homebuyers.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 16. BOOKING PROCESS                                       */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Documentation Checklist</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Faisal Hills Executive Block Booking Process
          </h2>
          <p className="text-slate-700 text-sm">
            Booking a plot is fairly straightforward. You’ll generally need:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 font-bold block">1. CNIC / NICOP Copies</strong>
            <span className="text-slate-600">Two photocopies of applicant’s CNIC or NICOP for overseas buyers.</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 font-bold block">2. Passport Photographs</strong>
            <span className="text-slate-600">Two recent passport-size photographs of the applicant.</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 font-bold block">3. Next of Kin CNIC</strong>
            <span className="text-slate-600">Copy of next-of-kin CNIC for emergency record & succession records.</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 font-bold block">4. Down Payment</strong>
            <span className="text-slate-600">Booking amount pay order or direct bank transfer confirmation.</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed pt-1">
          Once these are submitted along with the booking form, <Link href="/contact" className="text-[#7b002c] font-bold hover:underline">get in touch with our team</Link> to confirm your reservation and walk you through the next steps, including any remaining instalments if applicable.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 17. COMPARE OTHER FAISAL HILLS BLOCKS                     */}
      {/* ========================================================= */}
      <section className="bg-slate-50 p-7 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#7b002c] uppercase tracking-wider block">Cross-Sector Analysis</span>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
            Compare Other Faisal Hills Blocks
          </h3>
          <p className="text-xs text-slate-600">
            Explore neighboring sectors in Faisal Hills to compare plot prices, elevations, and possession timelines:
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          <Link
            href="/blocks/prime-block"
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 shadow-xs hover:border-[#7b002c] transition-all"
          >
            Prime Block →
          </Link>
          <Link
            href="/blocks/block-a"
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 shadow-xs hover:border-[#7b002c] transition-all"
          >
            Block A →
          </Link>
          <Link
            href="/blocks/block-b"
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 shadow-xs hover:border-[#7b002c] transition-all"
          >
            Block B →
          </Link>
          <Link
            href="/blocks/block-c"
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 shadow-xs hover:border-[#7b002c] transition-all"
          >
            Block C →
          </Link>
          <Link
            href="/blocks/block-d"
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 shadow-xs hover:border-[#7b002c] transition-all"
          >
            Block D →
          </Link>
          <Link
            href="/blocks/gandahara-block"
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 shadow-xs hover:border-[#7b002c] transition-all"
          >
            Gandahara Block →
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 18. FREQUENTLY ASKED QUESTIONS                            */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Buyer Inquiries</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Answers to common questions regarding Executive Block location, NOC, plots, and payment terms:
          </p>
        </div>

        <div className="space-y-3 divide-y divide-slate-100">
          {seoFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="pt-3 first:pt-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full py-3 flex items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#7b002c] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 19. FINAL THOUGHTS & CONCLUSION                           */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Final Thoughts on Faisal Hills Executive Block
        </h2>
        <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
          <p>
            Pulling all of this together, Faisal Hills Executive Block works because it doesn’t ask buyers to choose between location, lifestyle and investment potential — it tries to offer all three. Its GT Road frontage and RDA approval cover the practical and legal basics. Its mix of residential and commercial plots, parks, mosques, a school and a cricket ground cover the day-to-day living side. And its ongoing development, anchored by the <Link href="/faisal-jewels" className="text-[#7b002c] font-bold hover:underline">Faisal Jewel project</Link> and Roots International School, gives it momentum that’s visible on the ground rather than just on paper.
          </p>
          <p>
            If you’re exploring Faisal Hills Executive Block for a personal home, a rental property, or as part of a longer-term investment plan, the next sensible step is to get current, sector-specific information — exact pricing, available plot numbers and the latest payment plan — directly from our team. Real estate decisions tend to work out better when they’re based on up-to-date facts rather than brochure averages, and we’re happy to walk you through whichever part of the Executive Block fits what you’re looking for. <Link href="/contact" className="text-[#7b002c] font-bold hover:underline">Get in touch with our team</Link> today.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 20. DIRECT LEAD CAPTURE INQUIRY FORM                      */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-[#7b002c] via-[#5c0021] to-[#3a0014] text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Executive Assistance</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Schedule an On-Site Executive Block Tour
          </h3>
          <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed">
            Leave your contact details to receive verified plot listings, current resale rates, and official allotment files directly on WhatsApp.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center space-y-3 animate-fade-in relative z-10">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xl text-white">Inquiry Received!</h4>
            <p className="text-xs text-rose-100 max-w-md mx-auto">
              Thank you, <strong>{leadName}</strong>. Our Executive Block property specialist will contact you on <strong>{leadPhone}</strong> with available plot files.
            </p>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4 max-w-2xl relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white placeholder:text-rose-200/50 focus:outline-none focus:border-white transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +92 300 1234567"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white placeholder:text-rose-200/50 focus:outline-none focus:border-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Interested Plot Size</label>
                <select
                  value={leadPlot}
                  onChange={(e) => setLeadPlot(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-white/25 rounded-xl text-xs text-white focus:outline-none focus:border-white transition-all"
                >
                  <option value="5 Marla (25x50)">5 Marla Residential (25×50)</option>
                  <option value="8 Marla (30x60)">8 Marla Residential (30×60)</option>
                  <option value="10 Marla (35x70)">10 Marla Residential (35×70)</option>
                  <option value="14 Marla (40x80)">14 Marla Residential (40×80)</option>
                  <option value="1 Kanal (50x90)">1 Kanal Luxury Residential (50×90)</option>
                  <option value="Commercial Plot (Boulevard)">Commercial Boulevard Plot</option>
                  <option value="Faisal Jewel Apartment / Shop">Faisal Jewel Apartment / Shop</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Specific Requirements</label>
                <input
                  type="text"
                  placeholder="Corner, Park Facing, Investment, etc."
                  value={leadNote}
                  onChange={(e) => setLeadNote(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white placeholder:text-rose-200/50 focus:outline-none focus:border-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-white hover:bg-slate-100 text-[#7b002c] text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#7b002c]" />
              <span>Submit Executive Block Inquiry</span>
            </button>
          </form>
        )}
      </section>

      {/* Map Download Lead Capture Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        mapPdfUrl="/FAISAL HILLS MASTER PLAN.pdf"
      />

    </div>
  );
}
