'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { 
  Building2, ShieldCheck, MapPin, CheckCircle2, Trees, Landmark, Activity, 
  HelpCircle, Zap, Car, ArrowRight, MessageSquare, PhoneCall, LayoutGrid, Award,
  Compass, BadgePercent, Shield, Layers, HelpCircle as HelpIcon, ArrowUpRight, Check,
  ChevronDown, ChevronUp, Sparkles, Filter, Eye, DollarSign, Clock, Search, ChevronRight
} from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';

const MasterPlanViewer = dynamic(() => import('@/components/map/MasterPlanViewer'), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] bg-slate-900/40 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 text-xs font-medium">
      Loading Faisal Hills High-Resolution Master Plan...
    </div>
  )
});

const LeadModal = dynamic(() => import('@/components/ui/LeadModal'), { ssr: false });

import { allBlocksDataset, type BlockDetailItem } from './blocksDataset';


export default function BlocksClient() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'developed' | 'upcoming' | 'commercial'>('all');
  const [expandedIntro, setExpandedIntro] = useState(false);
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedBlockForInquiry, setSelectedBlockForInquiry] = useState<string>('Executive Block');

  const filteredBlocks = useMemo(() => {
    if (activeFilter === 'all') return allBlocksDataset;
    return allBlocksDataset.filter(b => b.category === activeFilter);
  }, [activeFilter]);

  const handleOpenInquiry = (blockName: string) => {
    setSelectedBlockForInquiry(blockName);
    setIsLeadModalOpen(true);
  };

  const toggleBlockDetails = (id: string) => {
    setExpandedBlockId(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-[#fcfaf8] min-h-screen text-slate-900 pb-20 selection:bg-[#7b002c] selection:text-white font-sans">
      
      {/* ========================================================= */}
      {/* 1. LUXURY HERO BANNER                                     */}
      {/* ========================================================= */}
      <section className="relative text-white overflow-hidden pt-28 sm:pt-36 pb-20 lg:pb-28 border-b border-slate-900/80 bg-[#070e17]">
        
        {/* Background HD Architectural Texture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/faisal-hills-site-header.webp"
            alt="Faisal Hills Master Planned Sectors"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 1440px"
            className="object-cover object-[center_40%] opacity-35"
          />
        </div>

        {/* Deep Contrast Multi-Angle Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e17] via-[#070e17]/85 to-black/60 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#7b002c]/25 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
          
          <ScrollReveal direction="down" delay={50}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-[#7b002c] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>RDA Approved Master Plan</span>
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 text-slate-200 border border-white/20 text-[11px] font-medium px-3.5 py-1.5 rounded-full backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>11,823+ Kanals Verified Area</span>
              </span>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl space-y-4">
            <ScrollReveal direction="up" delay={100}>
              <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
                Faisal Hills Blocks & Sectors Guide
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-normal">
                Explore every sector across Faisal Hills Islamabad — including Executive Block, Prime Block, Block A, Block B, B1 Extension, Block C, Block D, and luxury landmark commercial hubs. Compare verified possession timelines, plot categories, and 2026 pricing.
              </p>
            </ScrollReveal>
          </div>

          {/* Key Quick Metrics Bar */}
          <ScrollReveal direction="up" delay={200}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 max-w-4xl">
              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-white font-serif flex items-center gap-1">
                  <CountUpNumber end={8} duration={1200} />
                  <span className="text-amber-400 text-lg">+</span>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-0.5">
                  Distinct Sectors
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-white font-serif">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-0.5">
                  RDA NOC Compliant
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-white font-serif flex items-center gap-1">
                  <span>5M – 2K</span>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-0.5">
                  Plot Dimensions
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-serif">
                  Ready
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-0.5">
                  Possession in A, B, C & Exec
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. EXPANDABLE INTRO OVERVIEW WITH "SEE MORE"              */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 lg:p-10 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7b002c]">
                Master Community Planning
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                Understanding the Sector Layout & Urban Architecture
              </h2>
            </div>
            
            <button
              onClick={() => handleOpenInquiry('General Blocks Inquiry')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Get Rate Sheet on WhatsApp</span>
            </button>
          </div>

          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
            <p>
              If you are exploring plot options in one of Islamabad and Rawalpindi's most active residential developments, having a clear picture of how the society is structured is essential. <strong>Faisal Hills Blocks</strong> divide the entire 11,823+ Kanal master-planned scheme into distinct residential and commercial enclaves — each possessing its own unique topological character, price bracket, road network, and development timeline.
            </p>

            {expandedIntro && (
              <div className="space-y-3 pt-2 border-t border-slate-100 animate-fadeIn">
                <p>
                  Strategically positioned directly on Main Grand Trunk Road (N-5 Highway) near Taxila and Margalla Avenue, the project is backed by <strong>Zedem International</strong> under the proven leadership of Chaudhry Abdul Majeed. Each block features wide carpeted avenues ranging from 40ft internal streets to the 225ft Grand Boulevard, underground electricity lines, fiber internet conduits, parks, grand mosques, and educational campuses.
                </p>
                <p>
                  Whether your focus is immediate home construction in fully possessionable sectors like <strong>Block A</strong> and <strong>Executive Block</strong>, scenic elevated lifestyle living in <strong>Prime Block</strong>, high-growth long-term appreciation in <strong>Block B1 Extension</strong>, or premier commercial investment in <strong>Faisal Jewel</strong> and <strong>Hills Walk</strong>, this guide breaks down every sector with verified data.
                </p>
              </div>
            )}
          </div>

          {/* Interactive "See More" Toggle */}
          <div className="pt-1 flex items-center justify-start">
            <button
              onClick={() => setExpandedIntro(!expandedIntro)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] bg-[#ffe9e6] hover:bg-rose-100 px-4 py-2 rounded-lg transition-all cursor-pointer"
            >
              <span>{expandedIntro ? 'Show Less Overview' : 'See More Society Insights'}</span>
              {expandedIntro ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE SECTOR FILTER TABS & OVERVIEW CARDS        */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-14 sm:pt-20 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7b002c] block">
              Sectors & Projects Directory
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Explore Faisal Hills Sectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-normal">
              Filter by development status, possession readiness, or commercial investment opportunities. Click on any card for detailed pricing, maps, and specifications.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'all' 
                  ? 'bg-[#7b002c] text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              All Sectors ({allBlocksDataset.length})
            </button>
            <button
              onClick={() => setActiveFilter('developed')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'developed' 
                  ? 'bg-[#7b002c] text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              Possession Ready (5)
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'upcoming' 
                  ? 'bg-[#7b002c] text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              High-ROI / Upcoming (3)
            </button>
            <button
              onClick={() => setActiveFilter('commercial')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'commercial' 
                  ? 'bg-[#7b002c] text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              Commercial Megaprojects (2)
            </button>
          </div>
        </div>

        {/* Sectors Cards Grid with Rich Images & Expandable See-More */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredBlocks.map((block, idx) => {
            const isCardExpanded = expandedBlockId === block.id;

            return (
              <div 
                key={block.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#7b002c]/30"
              >
                {/* Sector Image Header with Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={block.heroImage}
                    alt={`${block.name} Faisal Hills`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Bottom Image Overlay Text */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif font-bold text-xl text-white drop-shadow-md">
                      {block.name}
                    </h3>
                    <p className="text-xs text-slate-200 font-medium line-clamp-1">
                      {block.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-3.5 sm:p-4 flex items-center justify-between gap-2 bg-white">
                  <button
                    onClick={() => handleOpenInquiry(block.name)}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Inquire Rates
                  </button>
                  <Link
                    href={`/blocks/${block.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs text-center"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. INTERACTIVE MASTER PLAN MAP EXPLORER                   */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-6">
        <div className="bg-[#070e17] text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                Interactive Map Coordinates
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Faisal Hills Master Plan & Block Locator
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal">
                Pan, zoom, and inspect sector positions, 225ft boulevards, commercial squares, parks, and mosque locations directly on the official master layout.
              </p>
            </div>

            <button
              onClick={() => handleOpenInquiry('Master Plan Map Request')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>Download PDF Master Map</span>
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner">
            <MasterPlanViewer heightClass="h-[400px] sm:h-[580px] lg:h-[720px]" />
          </div>
        </div>
      </section>



      {/* ========================================================= */}
      {/* 6. SIDE-BY-SIDE SECTORS COMPARISON TABLE                  */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7b002c] block">
            Comparative Matrix
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Sectors Comparison Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Quick reference summary comparing possession status, plot sizes, road access, and price ranges across all sectors.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-900 text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Block / Sector</th>
                  <th className="py-3.5 px-4">Possession Status</th>
                  <th className="py-3.5 px-4">Plot Dimensions</th>
                  <th className="py-3.5 px-4">Estimated Rate Range</th>
                  <th className="py-3.5 px-4">Key Highlight</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {allBlocksDataset.map((block) => (
                  <tr key={block.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-slate-900 font-serif text-sm">{block.name}</div>
                      <div className="text-[10px] text-slate-400">{block.badge}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        block.status.includes('Ready') || block.status.includes('Populated') || block.status.includes('Available')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {block.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-800 font-semibold">{block.plotSizes}</td>
                    <td className="py-4 px-4 font-bold text-[#7b002c]">{block.priceRange.residential}</td>
                    <td className="py-4 px-4 text-slate-600 text-[11px] max-w-xs truncate">{block.keyAdvantage}</td>
                    <td className="py-4 px-4 text-right">
                      <Link 
                        href={`/blocks/${block.slug}`}
                        className="inline-flex items-center gap-1 text-[#7b002c] hover:text-[#9e1245] font-bold text-xs hover:underline"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. INFRASTRUCTURE & AMENITIES MATRIX                      */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24">
        <div className="bg-[#570000] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#7b002c] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block">
              Development Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Society-Wide Infrastructure & World-Class Amenities
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
              Rather than developing select pockets, Zedem International implements standardized high-grade infrastructure across every block from day one.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleOpenInquiry('Infrastructure Brochure Request')}
                className="px-6 py-3 bg-white text-[#7b002c] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                Request Development Brochure
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-white/10 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">40ft to 225ft Boulevards</h4>
                <p className="text-xs text-slate-300 mt-1">Carpeted asphalt roads with engineered stormwater drainage & kerbing.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Trees className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">Parks & Miyawaki Forest</h4>
                <p className="text-xs text-slate-300 mt-1">Over 25 sector parks and ecological green belts for family recreation.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">Jamia Fatima Mosque</h4>
                <p className="text-xs text-slate-300 mt-1">Grand 3,000 capacity mosque plus sector masjids in every block.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-serif">Underground Utilities</h4>
                <p className="text-xs text-slate-300 mt-1">100% underground electric wiring, water filtration & gas pipeline networks.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. FAQ ACCORDION SECTION                                  */}
      {/* ========================================================= */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7b002c] block">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
            Frequently Asked Questions About Faisal Hills Blocks
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Everything you need to know about NOC status, installment options, possession, and transfer procedures.
          </p>
        </div>

        <FaqAccordion 
          faqs={[
            {
              question: "How many blocks are there in Faisal Hills Islamabad?",
              answer: "Faisal Hills Islamabad currently comprises 8 major sectors: Executive Block, Prime Block, Block A, Block B, Block B1 Extension, Block C, Block D, and the Golf Block, alongside signature commercial landmarks including Faisal Jewel and Hills Walk."
            },
            {
              question: "Which block in Faisal Hills is RDA-approved and ready for possession?",
              answer: "The entire 11,823+ Kanal master layout holds official NOC from the Rawalpindi Development Authority (RDA). Immediate on-ground possession is available in Block A, Executive Block, and developed sectors of Block B and Block C, where hundreds of luxury villas are already inhabited."
            },
            {
              question: "Which Faisal Hills Block is best for investment in 2026?",
              answer: "For lower risk with immediate construction, Block A and Executive Block are ideal. For maximum percentage ROI upside over a 2-3 year holding period, Block B1 Extension and Block D offer the lowest entry prices. For commercial rental yield, Faisal Jewel and Hills Walk lead the market."
            },
            {
              question: "What plot sizes are available across the blocks?",
              answer: "Residential plots are available in 5 Marla (25×50), 8 Marla (30×60), 10 Marla (35×70), 14 Marla (40×80), 1 Kanal (50×90), and 2 Kanal sizes. Commercial plots range from 2 Marla up to 2 Kanal formats."
            },
            {
              question: "Can overseas Pakistanis book plots remotely?",
              answer: "Yes! Overseas buyers in Saudi Arabia, UAE, UK, USA, and Europe can easily book through authorized bank wire channels and NICOP documentation. Our dedicated overseas team coordinates allotment confirmation and video inspections."
            }
          ]} 
          blockName="Faisal Hills Blocks" 
        />
      </section>

      {/* ========================================================= */}
      {/* 9. LUXURY CTA FOOTER BANNER                               */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-4">
        <div className="rounded-3xl bg-[#070e17] text-white p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
          
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#7b002c]/30 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              Direct Developer Inventory & Resale Deals
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-white">
              Ready to Secure Your Plot in Faisal Hills?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Connect directly with our authorized sales desk for verified plot numbers, corner plot availability, and personalized site visits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 relative z-10 w-full sm:w-auto">
            <a
              href="https://wa.me/923331113177?text=Hi%20Faisal%20Hills%20Desk!%20I%20want%20to%20inquire%20about%20plot%20rates%20in%20Faisal%20Hills%20Blocks."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat via WhatsApp</span>
            </a>

            <a
              href="tel:+923331113177"
              className="w-full sm:w-auto px-8 py-4 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-white/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Official Sales Line</span>
            </a>
          </div>

          <div className="text-[11px] text-slate-400 tracking-wider pt-4 uppercase relative z-10 flex flex-wrap justify-center gap-6 font-medium">
            <Link href="/faisal-hills-payment-plan" className="hover:text-amber-400 transition-colors">→ 2026 Payment Plan</Link>
            <Link href="/plots" className="hover:text-amber-400 transition-colors">→ Search Live Inventory</Link>
            <Link href="/faisal-hills-location" className="hover:text-amber-400 transition-colors">→ Location Map & Access</Link>
          </div>
        </div>
      </section>

      {/* Dynamic Lead Modal */}
      {isLeadModalOpen && (
        <LeadModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          defaultBlock={selectedBlockForInquiry}
        />
      )}

    </div>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}
