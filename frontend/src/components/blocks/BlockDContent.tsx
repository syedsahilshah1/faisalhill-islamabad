'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Car,
  ChevronDown,
  ChevronRight,
  Building2,
  Trees,
  Phone,
  Sparkles,
  Download,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Maximize2,
  Droplets,
  HelpCircle,
  MessageSquare,
  Home,
  Zap,
  Activity,
  Check,
  Award,
  Send,
  BadgeCheck,
  Building,
  Shield,
  Star
} from 'lucide-react';
import LeadModal from '@/components/ui/LeadModal';
import {
  PlotItem,
  fetchPlots,
  submitLead,
  BlockDCMSData,
  initialBlockDCMS,
  fetchBlockDCMS,
  mergeBlockDCMS
} from '@/data/faisalHillsData';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { DynamicPlotSeriesExplorer } from '@/components/plots/DynamicPlotSeriesExplorer';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';

const getReasonIcon = (name: string) => {
  switch (name) {
    case 'Car': return Car;
    case 'DollarSign': return DollarSign;
    case 'Droplets': return Droplets;
    case 'Building2': return Building2;
    case 'ShieldCheck': return ShieldCheck;
    case 'TrendingUp': return TrendingUp;
    case 'Trees': return Trees;
    case 'Award': return Award;
    case 'MapPin': return MapPin;
    case 'Zap': return Zap;
    case 'Home': return Home;
    case 'Shield': return Shield;
    default: return TrendingUp;
  }
};

export default function BlockDContent() {
  // Live CMS State
  const [cms, setCms] = useState<BlockDCMSData>(initialBlockDCMS);

  // Plot Filters & Interactive States
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [selectedPriceCategory, setSelectedPriceCategory] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [selectedAmenityFilter, setSelectedAmenityFilter] = useState<string>('all');
  const [activeWhyInvestOption, setActiveWhyInvestOption] = useState<number | null>(0);
  const [activeLandmarkIndex, setActiveLandmarkIndex] = useState<number | null>(null);
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlotForInquiry, setSelectedPlotForInquiry] = useState<PlotItem | null>(null);

  // Lead Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plotSize: '5 Marla',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live plots sync
  const [allPlots, setAllPlots] = useState<PlotItem[]>([]);

  // Fetch Block D CMS on mount + listen for updates
  useEffect(() => {
    fetchBlockDCMS().then((data) => {
      if (data) setCms(mergeBlockDCMS(data));
    });

    const handleUpdate = () => {
      fetchBlockDCMS().then((data) => {
        if (data) setCms(mergeBlockDCMS(data));
      });
    };

    window.addEventListener('faisal_block_d_cms_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('faisal_block_d_cms_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  useEffect(() => {
    fetchPlots()
      .then((data) => {
        if (data && data.length > 0) setAllPlots(data);
      })
      .catch(console.error);

    const handleSync = () => {
      fetchPlots()
        .then((data) => {
          if (data && data.length > 0) setAllPlots(data);
        })
        .catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handleSync);
    return () => window.removeEventListener('faisal_plots_updated', handleSync);
  }, []);

  // Filtered Plots
  const blockDPlots = useMemo(() => {
    return allPlots.filter(
      (p) => p.blockSlug === 'block-d' || (p.blockName && p.blockName.toLowerCase().includes('block d'))
    );
  }, [allPlots]);

  const filteredPlots = useMemo(() => {
    if (selectedSizeFilter === 'All') return blockDPlots;
    return blockDPlots.filter((p) => p.size.toLowerCase().includes(selectedSizeFilter.toLowerCase()));
  }, [blockDPlots, selectedSizeFilter]);

  // Data lists with deep fallbacks to initialBlockDCMS
  const priceScheduleList = useMemo(() => {
    return cms.priceScheduleSection?.tableRows?.length > 0 
      ? cms.priceScheduleSection.tableRows 
      : initialBlockDCMS.priceScheduleSection.tableRows;
  }, [cms.priceScheduleSection?.tableRows]);

  const filteredPriceSchedule = useMemo(() => {
    if (selectedPriceCategory === 'All') return priceScheduleList;
    return priceScheduleList.filter((p) => p.category === selectedPriceCategory);
  }, [priceScheduleList, selectedPriceCategory]);

  const travelTimesList = useMemo(() => {
    return cms.location?.travelTimes?.length > 0 
      ? cms.location.travelTimes 
      : initialBlockDCMS.location.travelTimes;
  }, [cms.location?.travelTimes]);

  const amenitiesList = useMemo(() => {
    return cms.amenitiesSection?.amenitiesList?.length > 0 
      ? cms.amenitiesSection.amenitiesList 
      : initialBlockDCMS.amenitiesSection.amenitiesList;
  }, [cms.amenitiesSection?.amenitiesList]);

  const filteredAmenities = useMemo(() => {
    if (selectedAmenityFilter === 'all') return amenitiesList;
    return amenitiesList.filter((a) => a.category === selectedAmenityFilter);
  }, [amenitiesList, selectedAmenityFilter]);

  const milestonesList = useMemo(() => {
    return cms.developmentMilestonesSection?.milestonesList?.length > 0 
      ? cms.developmentMilestonesSection.milestonesList 
      : initialBlockDCMS.developmentMilestonesSection.milestonesList;
  }, [cms.developmentMilestonesSection?.milestonesList]);

  const whyInvestList = useMemo(() => {
    return cms.whyInvestSection?.reasons?.length > 0 
      ? cms.whyInvestSection.reasons 
      : initialBlockDCMS.whyInvestSection.reasons;
  }, [cms.whyInvestSection?.reasons]);

  const faqsList = useMemo(() => {
    const rawFaqs = cms.faqsSection?.faqs?.length > 0 
      ? cms.faqsSection.faqs 
      : initialBlockDCMS.faqsSection.faqs;
    return rawFaqs.map(f => ({ question: f.q, answer: f.a }));
  }, [cms.faqsSection?.faqs]);

  const otherBlocks = useMemo(() => {
    return defaultFaisalHillsBlocks.filter((b) => b.id !== 'block-d' && b.href !== '/blocks/block-d');
  }, []);

  // Handle Form Submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        interest: `Block D (${formData.plotSize})${formData.email ? ` - Email: ${formData.email}` : ''}`,
        message: formData.message || 'Block D inquiry via dedicated sector page'
      });
      setFormSubmitted(true);
    } catch {
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 font-sans text-slate-800">

      {/* ========================================================= */}
      {/* 1. FAISAL HILLS BLOCK D OVERVIEW & KEY FACTS              */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        
        {/* Verification Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{cms.verificationHeader?.badgeText || 'Official Verified Block Guide'}</span>
          </div>
          <div className="text-xs text-slate-500 font-medium flex flex-wrap items-center gap-2 sm:gap-3">
            <span>Reviewed by <strong>{cms.verificationHeader?.reviewerName || 'Senior Property Verification Desk'}</strong></span>
            <span className="hidden sm:inline">•</span>
            <span>Prices verified: <strong>{cms.verificationHeader?.pricesVerifiedDate || 'September 2026'}</strong></span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{cms.overview?.quickFacts?.legalStatus || '100% RDA Approved'}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative with See More toggle */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h1"
                  text={cms.overview?.h1 || 'Faisal Hills Block D Overview'}
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    {cms.overview?.leadParagraph1 || 'Faisal Hills Block D represents the peaceful, scenic suburban sector in the master community. Positioned on the elevated western wing adjacent to Block C, Block D combines refreshing Margalla breezes, lush green landscapes, economical entry-level plot pricing, and direct connectivity to the upcoming Brahma Jhang Bahtar M-1 Motorway link.'}
                  </p>

                  {isSeeMoreOpen && (
                    <div className="space-y-3 pt-1 animate-fadeIn">
                      {cms.overview?.leadParagraph2 && (
                        <p>{cms.overview.leadParagraph2}</p>
                      )}
                      <p>
                        Spanning over 2,100 residential and commercial cuts, Sector D features wide 50ft & 60ft avenues, underground utilities, deep tube wells, and designated future healthcare and commercial centers.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsSeeMoreOpen(!isSeeMoreOpen)}
                    className="text-[#7b002c] hover:text-[#9e1245] font-semibold underline underline-offset-4 cursor-pointer text-xs sm:text-sm transition-colors block pt-1"
                  >
                    {isSeeMoreOpen ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual Showcase Card of Block D */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal direction="up" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950 min-h-[320px] sm:min-h-[360px] flex flex-col justify-between group">
                <img
                  src={cms.masterPlan?.mapImage || '/images/faisal-hills-drone-view.webp'}
                  alt="Faisal Hills Block D Panoramic View"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-black/20" />

                {/* Bottom Overlay Title */}
                <div className="relative z-10 p-5 text-white space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    Authentic On-Ground Capture
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white">
                    Faisal Hills Block D Sector Panorama
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    Scenic Margalla hillside elevation with wide 50ft & 60ft asphalt avenues.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Quick Key Facts Snapshot Strip */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#7b002c]" />
            <span>Block D Sector Quick Facts</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium block">Location</span>
              <span className="text-xs font-bold text-slate-900 line-clamp-1" title={cms.overview?.quickFacts?.location}>
                {cms.overview?.quickFacts?.location || 'Western Flank, Near M-1'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium block">Residential Cuts</span>
              <span className="text-xs font-bold text-slate-900">
                {cms.overview?.quickFacts?.residentialSizes || '5, 8, 10, 14 Marla & 1 Kanal'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium block">Commercial Cuts</span>
              <span className="text-xs font-bold text-slate-900">
                {cms.overview?.quickFacts?.commercialCuts || '4 Marla (G+4)'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium block">Possession Status</span>
              <span className="text-xs font-bold text-[#7b002c]">
                {cms.overview?.quickFacts?.possession || '85% Development'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium block">Connectivity</span>
              <span className="text-xs font-bold text-slate-900">
                {cms.overview?.quickFacts?.connectivity || 'M-1 Brahma & GT Road'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium block">Legal Status</span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{cms.overview?.quickFacts?.legalStatus || '100% RDA Approved'}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. LOCATION & ACCESSIBILITY                               */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Direct Road Access</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.location?.heading || 'Block D Location & Live Coordinates'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              {cms.location?.leadParagraph || 'Enjoy rapid dual commuting to Islamabad and Taxila via the Brahma Jhang Bahtar M-1 Interchange and 225ft Grand Boulevard.'}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
            <iframe
              title="Faisal Hills Block D Google Map Location"
              src={cms.location?.googleMapIframeUrl || 'https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed'}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 3. NEARBY LANDMARKS & COMMUTE DISTANCES                   */}
      {/* ========================================================= */}
      <section id="nearby-landmarks" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-5 sm:space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <TextReveal
              as="h2"
              text="Nearby Landmarks & Commute Distances from Block D"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {cms.location?.driveTimesNote || 'Verified travel times and road connectivity distances from Block D to key interchanges, commercial hubs, and twin city landmarks:'}
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile View: Compact Options Accordion List */}
        <div className="block sm:hidden space-y-2">
          {travelTimesList.map((dest, idx) => {
            const isSelected = activeLandmarkIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveLandmarkIndex(isSelected ? null : idx)}
                className={`rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-rose-50/60 border-[#7b002c]/40 shadow-xs'
                    : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/70'
                }`}
              >
                <div className="p-3 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                      isSelected ? 'bg-[#7b002c] text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-serif font-bold text-xs text-slate-900 truncate">
                      {dest.destination}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-bold text-[#7b002c] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      {dest.time}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${
                        isSelected ? 'rotate-180 text-[#7b002c]' : ''
                      }`}
                    />
                  </div>
                </div>

                {isSelected && (
                  <div className="px-3.5 pb-3 pt-1 text-[11px] text-slate-600 border-t border-rose-100/80 flex items-center justify-between animate-fadeIn bg-white/60">
                    <span>Distance: <strong className="text-slate-900 font-semibold">{dest.distance}</strong></span>
                    <span className="italic text-slate-500">{dest.note}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop & Tablet View: Grid Cards */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {travelTimesList.map((dest, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 40}>
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#7b002c]/40 hover:bg-white hover:shadow-md transition-all space-y-2.5 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif font-bold text-sm text-slate-900">{dest.destination}</h4>
                  <span className="text-xs font-bold text-[#7b002c] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 shrink-0">
                    {dest.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1.5 border-t border-slate-200/60">
                  <span>
                    Distance: <strong className="text-slate-900">{dest.distance}</strong>
                  </span>
                  <span className="italic text-[11px] text-slate-400 truncate max-w-[170px]">{dest.note}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. MASTER PLAN & SECTOR LAYOUT                            */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Zoning & Blueprint</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {cms.masterPlan?.heading || 'Faisal Hills Block D Master Blueprint & Cuts'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {cms.masterPlan?.description || 'High-resolution zoning blueprint highlighting street grid numbers, central parks, green eco corridors, and commercial strips.'}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Map</span>
            </button>
          </div>
        </div>

        {/* Blueprint Preview Card (Full Width) */}
        <div className="w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 relative group">
          <img
            src={cms.masterPlan?.mapImage || '/images/faisal-hills-master-plan-map-opt.webp'}
            alt={cms.masterPlan?.heading || 'Faisal Hills Block D Master Layout Plan'}
            className="w-full h-auto object-cover max-h-[500px]"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="px-5 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold shadow-lg hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Expand Full Map</span>
            </button>
          </div>
        </div>

        {/* Mobile Download Button - Below Master Plan in Mobile View */}
        <div className="sm:hidden flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setIsMapModalOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Download PDF Map</span>
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. QUANTITATIVE FIGURES & DEVELOPMENT MILESTONES          */}
      {/* ========================================================= */}
      <section id="development-status" className="scroll-mt-28 space-y-8">
        {/* Counting Numbers / Benchmark Metrics */}
        <div className="space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="space-y-1.5 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Activity className="w-3.5 h-3.5 animate-pulse text-[#7b002c]" />
                <span>Block D Key Metrics</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                {cms.developmentMilestonesSection?.heading || 'Sector D Development & Investment Benchmarks'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                {cms.developmentMilestonesSection?.subline || 'Key verifiable metrics defining the growth, legal clarity, and infrastructure scale in Faisal Hills Block D:'}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ScrollReveal direction="up" delay={100}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#7b002c] group-hover:scale-105 transition-transform duration-300 inline-block">
                  <CountUpNumber end={85} duration={2000} suffix="%+" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Development Work Done</span>
                <p className="text-[11px] text-slate-500 font-sans">Asphalt roads, conduit trenches, and tube wells</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-[#7b002c] group-hover:scale-105 transition-all duration-300 inline-block">
                  <CountUpNumber end={2100} duration={2200} suffix="+" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Planned Plot Cuts</span>
                <p className="text-[11px] text-slate-500 font-sans">5 Marla, 8 Marla, 10 Marla, 14 Marla & 1 Kanal</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-700 group-hover:scale-105 transition-transform duration-300 inline-block">
                  <CountUpNumber end={100} duration={1800} suffix="%" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700 transition-colors">RDA Approved NOC</span>
                <p className="text-[11px] text-slate-500 font-sans">Fully sanctioned master plan with clear title</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-[#7b002c] group-hover:scale-105 transition-all duration-300 inline-block">
                  <CountUpNumber end={50} duration={1800} suffix="ft+" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Wide Street Grid</span>
                <p className="text-[11px] text-slate-500 font-sans">Tree-lined avenues with underground cabling</p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Milestones Progress Tracker */}
        <div className="space-y-6 pt-4">
          <ScrollReveal direction="up" delay={50}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Real On-Ground Progress</span>
                </div>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                  {cms.developmentMilestonesSection?.heading || 'Block D Development Milestones & Delivery Status'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-sans">
                  Track completion status across roads, underground utilities, water wells, and community infrastructure:
                </p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Phase 1 Delivery Active</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestonesList.map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 60}>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group h-full">
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#7b002c] text-white shadow-sm border border-white/20">
                          {item.status}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm border border-white/20">
                          {item.progress}%
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h4 className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>Completion Rate</span>
                          <span className="text-emerald-700 font-bold">{item.progress}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                          <div
                            className="h-full bg-gradient-to-r from-[#7b002c] to-emerald-600 rounded-full transition-all duration-1000"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified On-Ground</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">Block D</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. ON-GROUND AMENITIES (ALTERNATING ZIG-ZAG ROWS)         */}
      {/* ========================================================= */}
      <section id="amenities" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Trees className="w-3.5 h-3.5" />
                <span>Delivered Infrastructure</span>
              </div>
              <TextReveal
                as="h2"
                text={cms.amenitiesSection?.heading || 'On-Ground Amenities & Community Landmarks in Sector D'}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                {cms.amenitiesSection?.subline || 'Experience nature-centric master planning: lush green family parks, community recreation center, sector Jamia Mosque, and healthcare reservations.'}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200 min-w-max">
                {(['all', 'nature', 'lifestyle', 'infrastructure', 'utilities', 'security'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedAmenityFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      selectedAmenityFilter === cat
                        ? 'bg-[#7b002c] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Alternating Zig-Zag Amenity Rows */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {filteredAmenities.map((amenity, idx) => {
            const isImageRight = idx % 2 === 0;

            return (
              <ScrollReveal key={amenity.id || idx} direction="up" delay={idx * 50}>
                <div
                  className="p-4 sm:p-7 lg:p-10 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/30 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center overflow-hidden w-full"
                >
                  {/* Content Side */}
                  <div className={`lg:col-span-6 space-y-3.5 sm:space-y-4 ${!isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-rose-50 text-[#7b002c] border border-rose-200 uppercase tracking-wider">
                        {amenity.tag}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-100 text-slate-700 capitalize">
                        {amenity.category}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900 leading-snug">
                      {amenity.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed font-sans">
                      {amenity.description}
                    </p>

                    {/* Features Badges */}
                    {amenity.features && amenity.features.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {amenity.features.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200/80"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Delivered & Operational</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400 font-semibold">Faisal Hills Block D</span>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className={`lg:col-span-6 w-full ${!isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200 h-52 sm:h-64 lg:h-[340px] bg-slate-950 group/img">
                      <img
                        src={amenity.image}
                        alt={amenity.title}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                        <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                          Sector Landmark #{idx + 1}
                        </span>
                        <h4 className="font-serif font-bold text-base sm:text-lg lg:text-xl text-white drop-shadow-sm line-clamp-1">
                          {amenity.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. VERIFIED PLOTS LISTED FOR SALE (BLOCK D)               */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Home className="w-3.5 h-3.5" />
              <span>Available Inventory</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Verified Plots for Sale in Faisal Hills Block D
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Explore live on-ground and file listings with direct seller pricing and biometric transfer:
            </p>
          </div>

          {/* Plot Size Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
            {['All', '5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal', 'Commercial'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSizeFilter(size)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSizeFilter === size
                    ? 'bg-[#7b002c] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Plot Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlots.map((plot, idx) => (
            <ScrollReveal key={plot.id} direction="up" delay={(idx % 3) * 80}>
              <div
                className="rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full"
              >
                <div>
                  {/* Top Image Banner - Clickable, Navigates to Plot Inventory */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-d`}
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                    title={`Browse all ${plot.size} plots in inventory`}
                  >
                    <img
                      src={plot.image || '/images/faisal-hills-drone-view.webp'}
                      alt={`Plot #${plot.plotNumber} - ${plot.size}`}
                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full font-mono text-xs font-bold">
                        Plot #{plot.plotNumber}
                      </span>
                      <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full border border-emerald-400/40 shadow-xs">
                        {plot.status || 'Available'}
                      </span>
                    </div>

                    {/* Bottom Image Overlay Details & Hover Prompt */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between gap-2 text-white z-10">
                      <div>
                        <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider block font-mono">
                          {plot.category} Property
                        </span>
                        <div className="font-serif font-bold text-lg text-white group-hover/img:text-amber-300 transition-colors">
                          {plot.size} Cut
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-300/30 opacity-90 group-hover/img:opacity-100 group-hover/img:bg-[#7b002c]/90 transition-all flex items-center gap-1">
                        <span>Inventory</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <Link
                        href={`/plots/${plot.id}`}
                        className="font-serif font-bold text-lg text-slate-900 hover:text-[#7b002c] transition-colors block"
                        title="View plot details"
                      >
                        {plot.size} {plot.category} Plot
                      </Link>
                      <p className="text-xs text-slate-500 font-sans mt-1">
                        Facing: <strong className="text-slate-700">{plot.facing || 'Main Avenue'}</strong> • Dimensions: <strong className="text-slate-700">{plot.dimensions}</strong>
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1 border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demand Price</div>
                      <div className="text-xl font-bold font-serif text-[#7b002c]">
                        {plot.priceFormatted}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{plot.priceHistoryTrend || '+18.5% annual ROI trend'}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {plot.features?.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions: View Detail, Contact Us, and WhatsApp */}
                <div className="p-5 sm:p-6 pt-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/plots/${plot.id}`}
                      className="flex-1 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all shadow-xs text-center flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-md"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPlotForInquiry(plot);
                        setIsLeadModalOpen(true);
                      }}
                      className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-rose-300" />
                      <span>Contact</span>
                    </button>
                    <a
                      href={`https://wa.me/${cms.closingSiteVisitSection?.whatsappNumber?.replace(/[^0-9]/g, '') || '923331113177'}?text=Hello!%20I%20am%20interested%20in%20Faisal%20Hills%20Block%20D%20Plot%20${plot.plotNumber}%20(${plot.size}).%20Please%20share%20latest%20price%20and%20transfer%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-xs"
                      title="Chat on WhatsApp"
                      aria-label="Chat on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="sr-only">Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Sell / List Your Block D Plot Banner */}
        <div className="p-6 sm:p-8 bg-rose-50/70 border border-rose-200/80 rounded-3xl text-slate-900 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#7b002c] text-xs font-bold uppercase tracking-wider border border-rose-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Resale & Liquidation Desk</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              Want to Sell or Assess Your Block D Plot / Resale File?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
              Get an instant official market valuation and list your file for thousands of active verified buyers across Islamabad, Rawalpindi, and overseas.
            </p>
          </div>

          <a
            href={`https://wa.me/${cms.closingSiteVisitSection?.whatsappNumber?.replace(/[^0-9]/g, '') || '923331113177'}?text=Hello!%20I%20want%20to%20list%20or%20sell%20my%20plot%20in%20Faisal%20Hills%20Block%20D.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>List Your Plot File</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. DYNAMIC PLOT SERIES EXPLORER                           */}
      {/* ========================================================= */}
      <section id="plot-series" className="scroll-mt-28">
        <ScrollReveal direction="up" delay={50}>
          <DynamicPlotSeriesExplorer blockSlug="block-d" blockName="Block D" />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 9. CURRENT PRICE SCHEDULE & VALUATION TABLE               */}
      {/* ========================================================= */}
      <section id="pricing" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Current Market Valuations</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.priceScheduleSection?.heading || 'Block D Plot Pricing Schedule & Square Foot Matrix'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              {cms.priceScheduleSection?.subline || 'Transparent market rates for resale files and developing plots in Faisal Hills Block D:'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 text-xs font-bold">
            {(['All', 'Residential', 'Commercial'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedPriceCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedPriceCategory === cat
                    ? 'bg-[#7b002c] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile View: Clean Responsive Price Cards */}
        <div className="block sm:hidden space-y-3">
          {filteredPriceSchedule.map((row, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7b002c]" />
                  <span className="font-bold text-sm text-slate-900">{row.size}</span>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
                  {row.possession}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-sans">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Dimensions</span>
                  <span className="text-slate-800 font-mono font-medium">{row.dimensions}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Area</span>
                  <span className="text-slate-800 font-medium">{row.sqYards} <span className="text-slate-400 text-[10px]">({row.sqFeet})</span></span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Market Price Band</span>
                  <span className="font-serif font-bold text-sm text-[#7b002c]">{row.priceRange}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, plotSize: row.size }));
                    setIsLeadModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <span>Inquire</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Full Table */}
        <div className="hidden sm:block rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-900 text-white font-serif">
                  <th className="p-4 sm:p-5 whitespace-nowrap">Plot Category & Cut</th>
                  <th className="p-4 sm:p-5 whitespace-nowrap">Dimensions</th>
                  <th className="p-4 sm:p-5 whitespace-nowrap">Total Area</th>
                  <th className="p-4 sm:p-5 whitespace-nowrap">Market Price Band</th>
                  <th className="p-4 sm:p-5 whitespace-nowrap">Possession Status</th>
                  <th className="p-4 sm:p-5 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filteredPriceSchedule.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-[#7b002c]" />
                      <span>{row.size}</span>
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-slate-600 whitespace-nowrap">{row.dimensions}</td>
                    <td className="p-4 sm:p-5 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{row.sqYards}</div>
                      <div className="text-[11px] text-slate-400">{row.sqFeet}</div>
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-[#7b002c] font-serif text-sm sm:text-base whitespace-nowrap">
                      {row.priceRange}
                    </td>
                    <td className="p-4 sm:p-5 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                        {row.possession}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, plotSize: row.size }));
                          setIsLeadModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        Inquire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. WHY INVEST IN FAISAL HILLS BLOCK D                    */}
      {/* ========================================================= */}
      <section id="why-invest" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Investment Thesis & ROI Drivers</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              {cms.whyInvestSection?.heading || 'Why Invest in Faisal Hills Block D?'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              {cms.whyInvestSection?.subline || 'Discover the 6 key growth catalysts making Block D one of the highest future yield sectors in Taxila and Rawalpindi:'}
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile View: Sleek, Compact Interactive Accordion List */}
        <div className="block sm:hidden space-y-2.5">
          {whyInvestList.map((item, idx) => {
            const isSelected = activeWhyInvestOption === idx;
            const Icon = getReasonIcon(item.iconName || '');
            return (
              <div
                key={idx}
                onClick={() => setActiveWhyInvestOption(isSelected ? null : idx)}
                className={`rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-rose-50/50 border-[#7b002c]/40 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#7b002c] text-white border-[#7b002c]'
                          : `${item.bg || 'bg-rose-50'} ${item.text || 'text-[#7b002c]'} ${item.border || 'border-rose-100'}`
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <strong
                      className={`font-semibold text-xs transition-colors truncate ${
                        isSelected ? 'text-[#7b002c]' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </strong>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transform transition-transform duration-300 ${
                      isSelected ? 'rotate-180 text-[#7b002c]' : ''
                    }`}
                  />
                </div>

                {isSelected && (
                  <div className="px-3.5 pb-3.5 pt-0 text-xs text-slate-600 leading-relaxed font-sans border-t border-rose-100/70 mt-0.5 pt-2.5">
                    {item.desc}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop/Tablet View: Clean 6-Card Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyInvestList.map((item, idx) => {
            const Icon = getReasonIcon(item.iconName || '');
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-3"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${item.bg || 'bg-rose-50'} ${item.text || 'text-[#7b002c]'} flex items-center justify-center border ${item.border || 'border-rose-100'}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. OTHER BLOCKS / SECTORS OF FAISAL HILLS                */}
      {/* ========================================================= */}
      <section id="sectors" className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>Master Community Portfolio</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Explore Expanding Sectors in Faisal Hills
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Discover connected sectors across the master development, from Executive and Prime blocks to Hills Walk:
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <ExpandingProjectsShowcase
            items={otherBlocks}
            defaultActiveIndex={3}
            containerHeightClass="h-[440px] sm:h-[480px] lg:h-[520px]"
            roundedClass="rounded-2xl sm:rounded-3xl"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 12. FAQS ACCORDION SECTION                                */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-5 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{cms.faqsSection?.heading || 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.faqsSection?.heading || 'Faisal Hills Block D Buying & Allotment FAQs'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl">
            {cms.faqsSection?.subline || 'Clear answers regarding Block D development status, RDA NOC approvals, plot transfer process, and investment upside.'}
          </p>
        </div>

        <FaqAccordion faqs={faqsList} blockName="Block D" />
      </section>

      {/* ========================================================= */}
      {/* 13. DIRECT LEAD CONSULTATION & BOOKING FORM               */}
      {/* ========================================================= */}
      <section id="contact-desk" className="space-y-6 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5" />
              <span>Official Sales Consultation</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
              {cms.closingSiteVisitSection?.heading || 'Schedule a Site Visit or Request Block D File Verification'}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
              {cms.closingSiteVisitSection?.intro || 'Connect directly with our senior Faisal Hills advisory desk. Receive on-ground plot video walkthroughs, instant biometric allotment file checks, and updated resale inventory.'}
            </p>
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
              {(cms.closingSiteVisitSection?.featureBullets || [
                'Zero service charge on official file verification',
                'Custom video tours available for overseas Pakistanis',
                'Dedicated Zedem International transfer facilitation'
              ]).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7b002c] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              {formSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-emerald-900">Inquiry Received!</h4>
                  <p className="text-xs text-emerald-700 font-sans">
                    Our Faisal Hills Block D property desk will reach out with the complete price sheet and plot inventory within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#7b002c]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#7b002c]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Email (Optional)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#7b002c]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Preferred Plot Cut</label>
                      <select
                        value={formData.plotSize}
                        onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#7b002c]"
                      >
                        <option value="5 Marla">5 Marla (25×50)</option>
                        <option value="8 Marla">8 Marla (30×60)</option>
                        <option value="10 Marla">10 Marla (35×70)</option>
                        <option value="14 Marla">14 Marla (40×80)</option>
                        <option value="1 Kanal">1 Kanal (50×90)</option>
                        <option value="4 Marla Commercial">4 Marla Commercial</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Specific Requirements</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Inquiring about park-facing or corner 5/8 Marla plot in Block D..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#7b002c]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : (cms.closingSiteVisitSection?.formButtonText || 'SUBMIT OFFICIAL BLOCK D INQUIRY')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Download Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        blockName="Block D"
      />

      {/* Lead Inquiry Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedPlotForInquiry(null);
        }}
        defaultBlock="Block D"
        defaultPlot={selectedPlotForInquiry ? `Plot #${selectedPlotForInquiry.plotNumber} (${selectedPlotForInquiry.size})` : undefined}
        interest={selectedPlotForInquiry ? `${selectedPlotForInquiry.size} ${selectedPlotForInquiry.category} in Block D` : 'Block D General Inquiry'}
      />
    </div>
  );
}
