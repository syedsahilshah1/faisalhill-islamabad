'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { 
  Building2, ShieldCheck, MapPin, CheckCircle2, Trees, Landmark, Activity, 
  HelpCircle, Zap, Car, ArrowRight, MessageSquare, PhoneCall, LayoutGrid, Award,
  Compass, BadgePercent, Shield, Layers, HelpCircle as HelpIcon, ArrowUpRight, Check,
  ChevronDown, ChevronUp, Sparkles, Filter, Eye, DollarSign, Clock, Search, ChevronRight,
  FileCheck2, AlertCircle, FileText, CheckCircle, Info, Scale, Download
} from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import { 
  BlocksPageCMSData,
  initialBlocksPageCMS,
  fetchBlocksPageCMS,
  formatWhatsAppUrl,
  formatTelUrl,
  mergeBlocksCMS
} from '@/data/faisalHillsData';

const MasterPlanViewer = dynamic(() => import('@/components/map/MasterPlanViewer'), {
  ssr: false,
  loading: () => (
    <div className="h-[380px] lg:h-[440px] bg-slate-900/40 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 text-xs font-medium">
      Loading Faisal Hills High-Resolution Master Plan...
    </div>
  )
});

const LeadModal = dynamic(() => import('@/components/ui/LeadModal'), { ssr: false });

interface BlocksClientProps {
  initialHeroImage?: string;
  initialSeo?: any;
}

export default function BlocksClient({ initialHeroImage, initialSeo }: BlocksClientProps) {
  const [cms, setCms] = useState<BlocksPageCMSData>(initialBlocksPageCMS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'developed' | 'upcoming'>('all');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedBlockForInquiry, setSelectedBlockForInquiry] = useState<string>('Executive Block');
  const [expandedBlockIds, setExpandedBlockIds] = useState<Record<string, boolean>>({});

  // Dynamic live CMS sync
  useEffect(() => {
    fetchBlocksPageCMS().then((data) => {
      if (data) setCms(mergeBlocksCMS(data));
    });

    const syncCms = () => {
      try {
        const stored = localStorage.getItem('faisal_blocks_cms');
        if (stored) setCms(mergeBlocksCMS(JSON.parse(stored)));
      } catch {}
    };

    window.addEventListener('faisal_blocks_cms_updated', syncCms);
    window.addEventListener('storage', syncCms);
    return () => {
      window.removeEventListener('faisal_blocks_cms_updated', syncCms);
      window.removeEventListener('storage', syncCms);
    };
  }, []);

  const toggleBlockDescription = (id: string) => {
    setExpandedBlockIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredBlocks = React.useMemo(() => {
    if (activeFilter === 'all') return cms.blocksOneByOne;
    if (activeFilter === 'developed') {
      return cms.blocksOneByOne.filter(b => 
        b.possession.toLowerCase().includes('avail') || 
        b.possession.toLowerCase().includes('ready') || 
        b.possession.toLowerCase().includes('part')
      );
    }
    return cms.blocksOneByOne.filter(b => 
      b.howSold.toLowerCase().includes('install') || 
      b.possession.toLowerCase().includes('not') || 
      b.possession.toLowerCase().includes('confirm')
    );
  }, [cms.blocksOneByOne, activeFilter]);

  const handleOpenInquiry = (blockName: string) => {
    setSelectedBlockForInquiry(blockName);
    setIsLeadModalOpen(true);
  };

  const heroImageSrc = cms.hero.heroImage || initialHeroImage || '/images/faisal-hills-aerial-panoramic.webp';

  return (
    <div className="bg-[#fcfaf8] min-h-screen text-slate-900 pb-20 selection:bg-[#7b002c] selection:text-white font-sans">
      
      {/* ========================================================= */}
      {/* 1. HERO BANNER (DYNAMIC CMS)                              */}
      {/* ========================================================= */}
      <section className="relative text-white overflow-hidden pt-28 sm:pt-36 pb-16 lg:pb-24 border-b border-slate-800 bg-[#0f172a]">
        
        {/* Background HD Texture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src={heroImageSrc}
            alt={cms.hero.h1}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 1920px"
            className="object-cover object-center scale-100 transition-all duration-700 brightness-90 contrast-105"
          />
        </div>

        {/* Backdrop Overlays */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-brightness-90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
          
          <div className="max-w-4xl space-y-4">
            <ScrollReveal direction="up" delay={60}>
              <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] drop-shadow-sm">
                {cms.hero.h1}
              </h1>
            </ScrollReveal>
          </div>

          {/* Quick Metrics Bar with Live Animated Counters & Dynamic CMS Bindings */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl pt-2">
            <ScrollReveal direction="up" delay={120}>
              <div className="group relative bg-white/10 hover:bg-white/15 border border-white/20 hover:border-amber-400/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-400 font-serif flex items-center gap-1 group-hover:scale-105 transition-transform origin-left">
                  <CountUpNumber end={cms.hero.kpiCards.card1.value} duration={1200} />
                  <span className="text-white text-lg font-sans">{cms.hero.kpiCards.card1.unit}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-1">
                  {cms.hero.kpiCards.card1.label}
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 bg-amber-400/10 rounded-full blur-xl group-hover:bg-amber-400/25 transition-all pointer-events-none" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={180}>
              <div className="group relative bg-white/10 hover:bg-white/15 border border-white/20 hover:border-emerald-400/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400 font-serif flex items-center gap-1 group-hover:scale-105 transition-transform origin-left">
                  <span>{cms.hero.kpiCards.card2.value}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-1">
                  {cms.hero.kpiCards.card2.label}
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-400/10 rounded-full blur-xl group-hover:bg-emerald-400/25 transition-all pointer-events-none" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={240}>
              <div className="group relative bg-white/10 hover:bg-white/15 border border-white/20 hover:border-sky-400/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sky-400 font-serif group-hover:scale-105 transition-transform origin-left">
                  {cms.hero.kpiCards.card3.value}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-1">
                  {cms.hero.kpiCards.card3.label}
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 bg-sky-400/10 rounded-full blur-xl group-hover:bg-sky-400/25 transition-all pointer-events-none" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="group relative bg-white/10 hover:bg-white/15 border border-white/20 hover:border-amber-300/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-300 font-serif group-hover:scale-105 transition-transform origin-left">
                  {cms.hero.kpiCards.card4.value}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold mt-1">
                  {cms.hero.kpiCards.card4.label}
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 bg-amber-300/10 rounded-full blur-xl group-hover:bg-amber-300/25 transition-all pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. FAISAL HILLS BLOCKS AT A GLANCE (DYNAMIC TABLE)        */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-300 shadow-xl p-6 sm:p-8 lg:p-10 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.atAGlance.h2}
            </h2>
            
            <button
              onClick={() => handleOpenInquiry('General Rate Sheet')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire All Blocks</span>
            </button>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-300 shadow-xs">
            <table className="w-full min-w-[700px] text-left text-xs sm:text-sm text-slate-800 border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                <tr className="border-b border-slate-800">
                  <th className="py-3.5 px-4 sm:px-6 border-r border-slate-800">Block</th>
                  <th className="py-3.5 px-4 border-r border-slate-800">Character</th>
                  <th className="py-3.5 px-4 border-r border-slate-800">Approx. Residential Plots</th>
                  <th className="py-3.5 px-4 border-r border-slate-800">Plot Sizes</th>
                  <th className="py-3.5 px-4 border-r border-slate-800">How it&apos;s Sold</th>
                  <th className="py-3.5 px-4 border-r border-slate-800">Possession</th>
                  <th className="py-3.5 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 bg-white font-medium">
                {cms.atAGlance.rows.map((block) => (
                  <tr key={block.id} className="even:bg-slate-50/70 hover:bg-amber-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-200">
                      <Link 
                        href={`/blocks/${block.slug}`}
                        className="text-[#7b002c] hover:underline font-serif font-bold text-sm inline-flex items-center gap-1"
                      >
                        {block.name}
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 border-r border-slate-200">{block.character}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 border-r border-slate-200">{block.approxPlots}</td>
                    <td className="py-3.5 px-4 text-slate-800 border-r border-slate-200">{block.plotSizes}</td>
                    <td className="py-3.5 px-4 border-r border-slate-200">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        block.howSold.toLowerCase().includes('full') || block.howSold.toLowerCase().includes('lump')
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : block.howSold.toLowerCase().includes('install')
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {block.howSold}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 border-r border-slate-200">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        block.possession.toLowerCase().includes('avail')
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : block.possession.toLowerCase().includes('part')
                          ? 'bg-sky-100 text-sky-800 border border-sky-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {block.possession}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/blocks/${block.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] hover:underline"
                      >
                        View Page
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Cards View */}
          <div className="grid grid-cols-1 gap-3.5 md:hidden">
            {cms.atAGlance.rows.map((block) => (
              <div key={block.id} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                  <div>
                    <Link href={`/blocks/${block.slug}`} className="text-[#7b002c] hover:underline font-serif font-bold text-base inline-flex items-center gap-1">
                      <span>{block.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <p className="text-xs text-slate-600 mt-0.5">{block.character}</p>
                  </div>
                  <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold shrink-0 ${
                    block.possession.toLowerCase().includes('avail')
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : block.possession.toLowerCase().includes('part')
                      ? 'bg-sky-100 text-sky-800 border border-sky-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {block.possession}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200/70">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Approx. Plots</span>
                    <span className="font-bold text-slate-900">{block.approxPlots}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200/70">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">How Sold</span>
                    <span className="font-semibold text-slate-800">{block.howSold}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200/70 col-span-2">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Plot Sizes</span>
                    <span className="font-semibold text-slate-800">{block.plotSizes}</span>
                  </div>
                </div>

                <Link
                  href={`/blocks/${block.slug}`}
                  className="w-full py-2 px-3 rounded-lg bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>View {block.name} Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-200">
            <strong>Note on figures:</strong> {cms.atAGlance.footnote}
          </p>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. HOW MANY BLOCKS DOES FAISAL HILLS HAVE? (DYNAMIC)      */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 space-y-6">
          
          <div className="space-y-2 max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
              {cms.growthStages.h2}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {cms.growthStages.paragraph}
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-300 shadow-xs">
            <table className="w-full min-w-[520px] text-left text-xs sm:text-sm text-slate-800 border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                <tr className="border-b border-slate-800">
                  <th className="py-3.5 px-4 sm:px-6 w-1/4 border-r border-slate-800">Stage</th>
                  <th className="py-3.5 px-4 w-1/3 border-r border-slate-800">Blocks</th>
                  <th className="py-3.5 px-4">What it means for you</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 bg-white font-medium">
                {cms.growthStages.stages.map((row, idx) => (
                  <tr key={idx} className="even:bg-slate-50/70 hover:bg-amber-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-200">{row.stage}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#7b002c] border-r border-slate-200">{row.blocks}</td>
                    <td className="py-3.5 px-4 text-slate-700">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {cms.growthStages.stages.map((row, idx) => (
              <div key={idx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <span className="font-serif font-bold text-sm text-slate-900">{row.stage}</span>
                  <span className="text-xs font-bold text-[#7b002c] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                    {row.blocks}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-700">What it means: </span>{row.meaning}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 text-xs sm:text-sm text-slate-800 space-y-2">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Important Distinction:</strong> {cms.growthStages.distinctionNote}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FAISAL HILLS BLOCK MAP & ORIENTATION (SIDE-BY-SIDE)    */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-8">
        
        {/* Side-by-Side Map Container */}
        <div className="bg-[#070e17] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Content & Controls */}
            <div className="lg:col-span-5 space-y-5">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {cms.blockMap.h2}
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {cms.blockMap.paragraph}
              </p>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                <div className="text-xs text-amber-300 font-semibold flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  <span>Key Arterial Connectors</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {cms.blockMap.connectors.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/master-plan"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Master Plan</span>
                </Link>

                <button
                  onClick={() => handleOpenInquiry('Master Plan Map Request')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Request PDF Map</span>
                </button>
              </div>
            </div>

            {/* Right Column: Compact Master Plan Map */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-inner bg-slate-900">
                <MasterPlanViewer heightClass="h-[360px] sm:h-[420px] lg:h-[460px]" />
              </div>
            </div>

          </div>
        </div>

        {/* Where each block sits Table */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-8 space-y-5">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            Where Each Block Sits
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-300 shadow-xs">
            <table className="w-full min-w-[500px] text-left text-xs sm:text-sm text-slate-800 border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                <tr className="border-b border-slate-800">
                  <th className="py-3.5 px-4 sm:px-6 w-1/4 border-r border-slate-800">Block</th>
                  <th className="py-3.5 px-4 w-1/3 border-r border-slate-800">Borders</th>
                  <th className="py-3.5 px-4">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 bg-white font-medium">
                {cms.blockMap.whereItSits.map((b) => (
                  <tr key={b.id} className="even:bg-slate-50/70 hover:bg-amber-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-200">{b.name}</td>
                    <td className="py-3.5 px-4 text-slate-700 border-r border-slate-200">{b.borders}</td>
                    <td className="py-3.5 px-4 text-slate-700">{b.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {cms.blockMap.whereItSits.map((b) => (
              <div key={b.id} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-serif font-bold text-sm text-slate-900 border-b border-slate-200 pb-1.5">
                  {b.name}
                </h4>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><span className="font-bold text-slate-700">Borders: </span>{b.borders}</p>
                  <p><span className="font-bold text-slate-700">Access: </span>{b.access}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 italic">
            {cms.blockMap.mapFootnote}
          </p>

          <div className="border-t border-slate-200 pt-5 space-y-2">
            <h4 className="font-serif font-bold text-slate-900 text-base">{cms.blockMap.readingPlotNumbersTitle}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {cms.blockMap.readingPlotNumbersText} <Link href="/faisal-hills-location" className="text-[#7b002c] font-bold hover:underline">Faisal Hills location</Link> guide explains how to reach the society from Islamabad and Rawalpindi.
            </p>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 5. THE BLOCKS ONE BY ONE (DEEP-DIVE PROFILES WITH TOGGLE) */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              The Blocks One by One
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-normal">
              Explore the individual profile, plot sizes, development timeline, and ideal buyer persona for each confirmed sector.
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
              All Blocks ({cms.blocksOneByOne.length})
            </button>
            <button
              onClick={() => setActiveFilter('developed')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'developed' 
                  ? 'bg-[#7b002c] text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              Developed
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'upcoming' 
                  ? 'bg-[#7b002c] text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              Upcoming / Installments
            </button>
          </div>
        </div>

        {/* Sectors Grid with Collapsible Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlocks.map((block) => {
            const isExpanded = !!expandedBlockIds[block.id];

            return (
              <div 
                key={block.id}
                className="bg-white rounded-2xl border border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#7b002c]/40"
              >
                {/* Sector Image Header */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={block.heroImage}
                    alt={`${block.name} Faisal Hills`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#7b002c] text-[10px] font-bold uppercase rounded-md shadow-xs">
                      {block.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif font-bold text-xl text-white drop-shadow-md">
                      {block.name}
                    </h3>
                    <p className="text-xs text-slate-200 font-medium">
                      {block.character}
                    </p>
                  </div>
                </div>

                {/* Sector Content Body */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Collapsible Short/Long Description */}
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      <p className={isExpanded ? '' : 'line-clamp-3'}>
                        {block.detailedCopy}
                      </p>
                      
                      <button
                        onClick={() => toggleBlockDescription(block.id)}
                        className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] hover:underline cursor-pointer"
                      >
                        <span>{isExpanded ? 'Show Less' : 'See More Description'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Plot Sizes:</span>
                        <span className="font-bold text-slate-900">{block.plotSizes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">How Sold:</span>
                        <span className="font-bold text-slate-900">{block.howSold}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Possession:</span>
                        <span className="font-bold text-emerald-700">{block.possession}</span>
                      </div>
                    </div>

                    <div className="bg-[#fff5f5] border border-[#ffd1d9] rounded-xl p-3 text-xs text-slate-800">
                      <strong className="text-[#7b002c]">Suits:</strong> {block.suits}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenInquiry(block.name)}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Inquire Rates
                    </button>
                    <Link
                      href={`/blocks/${block.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs text-center"
                    >
                      <span>Full Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================= */}
      {/* 6. PLOT SIZES BY BLOCK & MARLA CALCULATION TABLES         */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-8">
        
        {/* Plot Sizes by Block Matrix */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 space-y-5">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.plotSizesSection.h2}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {cms.plotSizesSection.subline}
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-300 shadow-xs">
            <table className="w-full min-w-[700px] text-center text-xs sm:text-sm text-slate-800 border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                <tr className="border-b border-slate-800">
                  <th className="py-3.5 px-4 text-left border-r border-slate-800">Dimensions (ft)</th>
                  <th className="py-3.5 px-4 text-left border-r border-slate-800">Area (sq ft)</th>
                  <th className="py-3.5 px-3 border-r border-slate-800">Exec</th>
                  <th className="py-3.5 px-3 border-r border-slate-800">A</th>
                  <th className="py-3.5 px-3 border-r border-slate-800">Prime</th>
                  <th className="py-3.5 px-3 border-r border-slate-800">B</th>
                  <th className="py-3.5 px-3 border-r border-slate-800">B Ext</th>
                  <th className="py-3.5 px-3 border-r border-slate-800">C</th>
                  <th className="py-3.5 px-3">D</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 bg-white font-medium">
                {cms.plotSizesSection.matrix.map((row, idx) => (
                  <tr key={idx} className="even:bg-slate-50/70 hover:bg-amber-50/50 transition-colors">
                    <td className="py-3.5 px-4 text-left font-bold text-slate-900 border-r border-slate-200">{row.dimensions}</td>
                    <td className="py-3.5 px-4 text-left font-semibold text-slate-700 border-r border-slate-200">{row.areaSqFt}</td>
                    <td className="py-3.5 px-3 border-r border-slate-200">{row.exec ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="py-3.5 px-3 border-r border-slate-200">{row.a ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="py-3.5 px-3 border-r border-slate-200">{row.prime ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="py-3.5 px-3 border-r border-slate-200">{row.b ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="py-3.5 px-3 border-r border-slate-200">{row.bExt ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="py-3.5 px-3 border-r border-slate-200">{row.c ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}</td>
                    <td className="py-3.5 px-3">
                      {typeof row.d === 'boolean' 
                        ? (row.d ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>)
                        : <span className="text-amber-700 text-[10px] font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Select</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {cms.plotSizesSection.matrix.map((row, idx) => {
              const availableBlocks = [
                row.exec && 'Executive',
                row.a && 'Block A',
                row.prime && 'Prime',
                row.b && 'Block B',
                row.bExt && 'B Extension',
                row.c && 'Block C',
                typeof row.d === 'boolean' ? (row.d && 'Block D') : 'Block D (Select)'
              ].filter(Boolean);

              return (
                <div key={idx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <span className="font-bold text-sm text-slate-900">{row.dimensions}</span>
                    <span className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-0.5 rounded border border-slate-200">
                      {row.areaSqFt}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Available In Blocks:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {availableBlocks.map((blk, bIdx) => (
                        <span key={bIdx} className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          ✓ {blk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 italic">
            {cms.plotSizesSection.footnote}
          </p>
        </div>

        {/* Why the Same Plot is Sold Under Different Marla Sizes */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 space-y-5">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.marlaConversions.h2}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {cms.marlaConversions.intro}
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-300 shadow-xs">
            <table className="w-full min-w-[650px] text-left text-xs sm:text-sm text-slate-800 border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                <tr className="border-b border-slate-800">
                  <th className="py-3.5 px-4 sm:px-6 border-r border-slate-800">Dimensions (ft)</th>
                  <th className="py-3.5 px-4 border-r border-slate-800">Area (sq ft)</th>
                  <th className="py-3.5 px-4 border-r border-slate-800">At 272.25 sq ft</th>
                  <th className="py-3.5 px-4 border-r border-slate-800">At 250 sq ft</th>
                  <th className="py-3.5 px-4 border-r border-slate-800">At 225 sq ft</th>
                  <th className="py-3.5 px-4 font-bold text-amber-300">Usually sold as</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 bg-white font-medium">
                {cms.marlaConversions.rows.map((m, idx) => (
                  <tr key={idx} className="even:bg-slate-50/70 hover:bg-amber-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-200">{m.dimensions}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 border-r border-slate-200">{m.areaSqFt}</td>
                    <td className="py-3.5 px-4 text-slate-700 border-r border-slate-200">{m.at272}</td>
                    <td className="py-3.5 px-4 text-slate-700 border-r border-slate-200">{m.at250}</td>
                    <td className="py-3.5 px-4 text-slate-700 border-r border-slate-200">{m.at225}</td>
                    <td className="py-3.5 px-4 font-bold text-[#7b002c]">{m.usuallySold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {cms.marlaConversions.rows.map((m, idx) => (
              <div key={idx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">{m.dimensions}</span>
                    <span className="text-xs text-slate-500 font-medium">{m.areaSqFt}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#7b002c] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100 text-right">
                    Sold as: {m.usuallySold}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[9.5px] text-slate-500 font-bold block">At 272.25</span>
                    <span className="font-bold text-slate-800 text-[11px]">{m.at272}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[9.5px] text-slate-500 font-bold block">At 250</span>
                    <span className="font-bold text-slate-800 text-[11px]">{m.at250}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[9.5px] text-slate-500 font-bold block">At 225</span>
                    <span className="font-bold text-slate-800 text-[11px]">{m.at225}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {cms.marlaConversions.callout}
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 7. PLOT PRICES AND SUPPLY BY BLOCK                        */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                {cms.plotPrices.h2}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                {cms.plotPrices.subline}
              </p>
            </div>

            <Link
              href="/faisal-hills-payment-plan"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0"
            >
              <DollarSign className="w-4 h-4" />
              <span>Payment Plan Page</span>
            </Link>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-300 shadow-xs">
            <table className="w-full min-w-[500px] text-left text-xs sm:text-sm text-slate-800 border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                <tr className="border-b border-slate-800">
                  <th className="py-3.5 px-4 sm:px-6 w-1/3 border-r border-slate-800">Block</th>
                  <th className="py-3.5 px-4 w-1/3 border-r border-slate-800">5 Marla Asking Range</th>
                  <th className="py-3.5 px-4">1 Kanal Asking Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 bg-white font-medium">
                {cms.plotPrices.rows.map((b) => (
                  <tr key={b.id} className="even:bg-slate-50/70 hover:bg-amber-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-200">{b.name}</td>
                    <td className="py-3.5 px-4 font-bold text-[#7b002c] border-r border-slate-200">{b.fiveMarla}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{b.oneKanal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {cms.plotPrices.rows.map((b) => (
              <div key={b.id} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2.5">
                <h4 className="font-serif font-bold text-base text-slate-900 border-b border-slate-200 pb-1.5">
                  {b.name}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">5 Marla Range</span>
                    <span className="font-bold text-[#7b002c] text-xs">{b.fiveMarla}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">1 Kanal Range</span>
                    <span className="font-bold text-slate-800 text-xs">{b.oneKanal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {cms.plotPrices.footnote} Full detail: <Link href="/faisal-hills-payment-plan" className="text-[#7b002c] font-bold hover:underline">Faisal Hills plot prices</Link>.
          </p>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. DEVELOPMENT STATUS BY BLOCK & INFRASTRUCTURE           */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-8">
        
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.developmentStatus.h2}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {cms.developmentStatus.subline}
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-300 shadow-xs">
            <table className="w-full min-w-[620px] text-left text-xs sm:text-sm text-slate-800 border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                <tr className="border-b border-slate-800">
                  <th className="py-3.5 px-4 sm:px-6 w-1/4 border-r border-slate-800">Block</th>
                  <th className="py-3.5 px-4 w-1/3 border-r border-slate-800">Roads and Utilities</th>
                  <th className="py-3.5 px-4 border-r border-slate-800">Houses and Residents</th>
                  <th className="py-3.5 px-4 text-right">Last Reported</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 bg-white font-medium">
                {cms.developmentStatus.rows.map((row, idx) => (
                  <tr key={idx} className="even:bg-slate-50/70 hover:bg-amber-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-200">{row.name}</td>
                    <td className="py-3.5 px-4 border-r border-slate-200">{row.roads}</td>
                    <td className="py-3.5 px-4 border-r border-slate-200">{row.houses}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-600">{row.reported}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {cms.developmentStatus.rows.map((row, idx) => (
              <div key={idx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <h4 className="font-serif font-bold text-base text-slate-900">{row.name}</h4>
                  <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {row.reported}
                  </span>
                </div>
                <div className="text-xs text-slate-700 space-y-1.5">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Roads &amp; Utilities</span>
                    <span className="font-medium text-slate-800">{row.roads}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Houses &amp; Residents</span>
                    <span className="font-medium text-slate-800">{row.houses}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500">
            {cms.developmentStatus.footnote} <Link href="/gallery" className="text-[#7b002c] font-bold hover:underline">development updates</Link>.
          </p>
        </div>

        {/* Society-Wide Infrastructure Highlight Box */}
        <div className="bg-[#570000] text-white rounded-3xl p-8 sm:p-12 border border-[#7b002c] shadow-xl space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {cms.developmentStatus.infrastructure.h3}
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-3xl">
              {cms.developmentStatus.infrastructure.paragraph}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {cms.developmentStatus.infrastructure.cards.map((c, idx) => (
              <div key={idx} className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-amber-400 font-bold text-sm">{c.title}</div>
                <p className="text-xs text-slate-300 mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 9. WHICH BLOCK FITS YOUR PLAN (DECISION MATRIX)           */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 space-y-6">
          
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.decisionMatrix.h2}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {cms.decisionMatrix.subline}
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-300 shadow-xs">
            <table className="w-full min-w-[500px] text-left text-xs sm:text-sm text-slate-800 border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                <tr className="border-b border-slate-800">
                  <th className="py-3.5 px-4 sm:px-6 w-1/4 border-r border-slate-800">If you want to…</th>
                  <th className="py-3.5 px-4 w-1/3 border-r border-slate-800">Consider</th>
                  <th className="py-3.5 px-4">Trade-off</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 bg-white font-medium">
                {cms.decisionMatrix.rows.map((row, idx) => (
                  <tr key={idx} className="even:bg-slate-50/70 hover:bg-amber-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-200">{row.goal}</td>
                    <td className="py-3.5 px-4 font-bold text-[#7b002c] border-r border-slate-200">{row.consider}</td>
                    <td className="py-3.5 px-4 text-slate-700">{row.tradeOff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {cms.decisionMatrix.rows.map((row, idx) => (
              <div key={idx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-1.5">
                  <span className="font-serif font-bold text-sm text-slate-900">{row.goal}</span>
                  <span className="text-xs font-bold text-[#7b002c] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100 shrink-0">
                    {row.consider}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-700">Trade-off: </span>{row.tradeOff}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. TERMS YOU'LL SEE IN FAISAL HILLS LISTINGS             */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 space-y-6">
          
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.glossary.h2}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {cms.glossary.subline}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cms.glossary.terms.map((t, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
                <div className="font-bold text-[#7b002c] text-sm">{t.term}</div>
                <p className="text-xs text-slate-600">{t.definition}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#fff9e6] border border-[#ffe082] rounded-xl p-4 text-xs sm:text-sm text-slate-800">
            {cms.glossary.premiumNote}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. CHECK A BLOCK BEFORE YOU COMMIT                       */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 space-y-6">
          
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.dueDiligence.h2}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {cms.dueDiligence.subline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cms.dueDiligence.steps.map((st) => (
              <div key={st.number} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#7b002c] text-white flex items-center justify-center font-bold text-sm">
                  {st.number}
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">{st.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. FREQUENTLY ASKED QUESTIONS (10 DYNAMIC FAQS)          */}
      {/* ========================================================= */}
      <section className="max-w-[960px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
            {cms.faqs.h2}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            {cms.faqs.subline}
          </p>
        </div>

        <FaqAccordion 
          faqs={cms.faqs.items} 
          blockName="Faisal Hills Blocks" 
        />
      </section>

      {/* ========================================================= */}
      {/* 13. COMPARE BLOCKS WITH US & CTA FOOTER (DYNAMIC CMS)     */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-4">
        <div className="rounded-3xl bg-[#070e17] text-white p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
          
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#7b002c]/30 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-white">
              {cms.cta.h2}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {cms.cta.paragraph}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 relative z-10 w-full sm:w-auto">
            <a
              href={formatWhatsAppUrl(cms.cta.whatsappNumber, 'Hi Faisal Hills Desk! I want to compare blocks and plot prices.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Official Desk</span>
            </a>

            <a
              href={formatTelUrl(cms.cta.phoneNumber)}
              className="w-full sm:w-auto px-8 py-4 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-white/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call {cms.cta.phoneNumber}</span>
            </a>
          </div>

          <div className="pt-4 text-slate-400 text-xs max-w-2xl border-t border-white/10 space-y-2 relative z-10">
            <p>
              <strong>Head Office:</strong> {cms.cta.headOffice}
            </p>
            <p className="text-[11px] text-slate-500">
              <strong>About this page:</strong> {cms.cta.aboutPageNote}
            </p>
          </div>

          <div className="text-[11px] text-slate-400 tracking-wider pt-2 uppercase relative z-10 flex flex-wrap justify-center gap-6 font-medium">
            <Link href="/faisal-hills-payment-plan" className="hover:text-amber-400 transition-colors">→ 2026 Payment Plan</Link>
            <Link href="/master-plan" className="hover:text-amber-400 transition-colors">→ Master Plan Map</Link>
            <Link href="/faisal-hills-location" className="hover:text-amber-400 transition-colors">→ Location & Access</Link>
            <Link href="/faisal-hills-noc-status" className="hover:text-amber-400 transition-colors">→ RDA NOC Approval</Link>
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
