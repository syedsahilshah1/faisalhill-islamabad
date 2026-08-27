'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Building2, ShieldCheck, MapPin, Search, ArrowRight, CheckCircle2,
  Sparkles, TrendingUp, Trees, Landmark, Layers, HelpCircle, MessageSquare, PhoneCall, Award, Calculator, Clock, ChevronRight, ChevronDown, ChevronUp, Waves, Utensils, Car, Lock, Compass, Check, FileText, Camera, Maximize2, Image as ImageIcon,
  Trophy, GraduationCap, ShoppingBag, ArrowUpRight, BookOpen, Store, Home, Users, Star, Quote, HeartHandshake, BadgeCheck, Phone,
  ChevronLeft
} from 'lucide-react';
import {
  blocksData, plotInventoryData, societyStats, paymentPlansData, initialGalleryData, type GalleryItem,
  fetchBlocks, fetchPlots, fetchGallery, fetchSettings, submitLead
} from '@/data/faisalHillsData';
import MasterPlanViewer from '@/components/map/MasterPlanViewer';
import LeadModal from '@/components/ui/LeadModal';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import StickyHorizontalBookingSteps from '@/components/ui/StickyHorizontalBookingSteps';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';
import PaymentPlanModal from '@/components/ui/PaymentPlanModal';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'developed' | 'rising' | 'upcoming'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isMapDownloadModalOpen, setIsMapDownloadModalOpen] = useState(false);
  const [isPaymentPlanLightboxOpen, setIsPaymentPlanLightboxOpen] = useState(false);
  const [isPaymentPlanDownloadOpen, setIsPaymentPlanDownloadOpen] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isWhyChooseExpanded, setIsWhyChooseExpanded] = useState(false);
  const [isInvestmentBenefitsExpanded, setIsInvestmentBenefitsExpanded] = useState(false);
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryData);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<'Infrastructure' | 'Towers' | 'Amenities' | 'Entrance'>('Infrastructure');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0);
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);

  const infraSliderRef = useRef<HTMLDivElement>(null);

  const handleInfraScroll = (direction: 'left' | 'right') => {
    if (infraSliderRef.current) {
      const scrollDistance = infraSliderRef.current.clientWidth * 0.75;
      infraSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behavior: 'smooth'
      });
    }
  };

  const filteredGallery = useMemo(() => {
    return galleryItems.filter(item => item && item.category === activeGalleryFilter);
  }, [galleryItems, activeGalleryFilter]);

  // Dynamic API state loading
  const [blocks, setBlocks] = useState(blocksData);
  const [plots, setPlots] = useState(plotInventoryData);

  React.useEffect(() => {
    fetchBlocks().then(data => setBlocks(data)).catch(console.error);
    fetchPlots().then(data => setPlots(data)).catch(console.error);
    fetchGallery().then(data => setGalleryItems(data)).catch(console.error);

    const syncGallery = () => {
      fetchGallery().then(data => setGalleryItems(data)).catch(console.error);
    };
    window.addEventListener('faisal_gallery_updated', syncGallery);
    window.addEventListener('faisal_plots_updated', () => {
      fetchPlots().then(data => setPlots(data)).catch(console.error);
    });

    return () => {
      window.removeEventListener('faisal_gallery_updated', syncGallery);
    };
  }, []);

  // Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadLocation, setLeadLocation] = useState('');
  const [leadPreferredPlot, setLeadPreferredPlot] = useState('5 Marla');
  const [leadQuery, setLeadQuery] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleHeroFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      name: leadName || 'Website Visitor',
      phone: leadEmail || 'N/A',
      interest: `${leadPreferredPlot} (${leadLocation || 'Taxila/Islamabad'})`,
      message: leadQuery
    }).then(() => {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
      setLeadName('');
      setLeadEmail('');
      setLeadLocation('');
      setLeadQuery('');
    }).catch(err => {
      console.error(err);
      setFormSubmitted(true);
    });
  };

  // Filter blocks by category
  const developedBlocks = useMemo(() => blocks.filter(b => b.category === 'developed'), [blocks]);
  const risingProjects = useMemo(() => blocks.filter(b => b.category === 'commercial_project'), [blocks]);
  const upcomingBlocks = useMemo(() => blocks.filter(b => b.category === 'upcoming'), [blocks]);

  const displayedBlocks = useMemo(() => {
    if (activeTab === 'developed') return developedBlocks;
    if (activeTab === 'rising') return risingProjects;
    if (activeTab === 'upcoming') return upcomingBlocks;
    return blocks;
  }, [activeTab, blocks, developedBlocks, risingProjects, upcomingBlocks]);

  // Section 15 FAQs with Schema & Detailed Answers
  const seoFaqs = [
    {
      q: "1. Is Faisal Hills Islamabad a CDA-approved housing society?",
      a: "Yes. Faisal Hills Islamabad holds the relevant CDA (Capital Development Authority) approval and all associated NOC documentation required to legally sell residential and commercial plots in the defined service area. The society also operates under RDA (Rawalpindi Development Authority) purview for applicable jurisdictional matters. Buyers should always request and verify the official NOC documentation before booking — our team provides this proactively to every prospective buyer."
    },
    {
      q: "2. Who is the developer of Faisal Hills Islamabad?",
      a: "Faisal Hills Islamabad is developed by Zedem International under the visionary leadership of Chaudhry Abdul Majeed. Zedem International is one of Pakistan's most respected real estate developers with an outstanding track record including Faisal Town Phase 1, Faisal Town Phase 2, Faisal Margalla City, Faisal Heights, and the 27-story Faisal Jewels skyscraper."
    },
    {
      q: "3. What is the current Faisal Hills Islamabad payment plan for 2026?",
      a: "Plots in Faisal Hills are available on convenient 3-Year (36-Month) easy installment plans with a 20% to 25% initial booking down payment. Remaining amounts are payable in easy quarterly or monthly installments."
    },
    {
      q: "4. What plot sizes are available in Faisal Hills Islamabad?",
      a: "Faisal Hills offers 5 Marla (25x50), 8 Marla (30x60), 10 Marla (35x70), 14 Marla (40x80), 1 Kanal (50x90), and 2 Kanal luxury residential plots, alongside 2 Marla, 4 Marla, and 8 Marla commercial plots across Executive Block, Block A, B, C, D, and Prime Block."
    },
    {
      q: "5. Where exactly is Faisal Hills Islamabad located?",
      a: "The Faisal Hills Islamabad location is on the Grand Trunk Road (GT Road) near Taxila, approximately 30 minutes from Zero Point Islamabad and 25 minutes from Rawalpindi Saddar. The society is well-connected via GT Road, the Islamabad Expressway, and the M-1 Motorway interchange. A detailed Faisal Hills Islamabad map is available on our Location page."
    },
    {
      q: "6. How is Faisal Hills different from other Taxila housing societies?",
      a: "Unlike paper societies, Faisal Hills is an on-ground delivered project. Executive Block, Block A, B, C, and D feature paved 40ft to 225ft boulevards, operational Echo petrol stations, functional Roots Millennium School campus, Grand Jamia Mosque, Miyawaki Forest, and 27-story Faisal Jewels skyscraper."
    },
    {
      q: "7. Can overseas Pakistanis invest in Faisal Hills?",
      a: "Yes! Overseas Pakistanis (especially in Saudi Arabia - Riyadh, Jeddah, Dammam, UAE, UK, and North America) can easily invest via direct bank transfer to Zedem International. All documentation, allotment letters, and site progress updates can be processed remotely or via authorized representatives."
    },
    {
      q: "8. What is the investment potential of Faisal Hills Islamabad?",
      a: "Real estate in Pakistan has produced countless success stories, and Faisal Hills is writing some of the most compelling chapters. With GT Road main entry, RDA/CDA NOC clearance, rapid population influx, and upcoming commercial hubs like Faisal Jewels and Hill Walk, Faisal Hills offers 25%+ annual capital growth and high rental yields."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-24 font-sans selection:bg-[#7b002c] selection:text-white">

      {/* ========================================================= */}
      {/* SECTION 1 — HERO & BOOKING FORM                           */}
      {/* ========================================================= */}
      <section className="relative w-full bg-[#070e17] text-white overflow-hidden">

        {/* Cinematic HD Architectural Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/faisalhillarc.jpg')",
            backgroundPosition: "center 35%"
          }}
        />

        {/* Contrast Tint for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-[#070e17] lg:bg-gradient-to-r lg:from-black/90 lg:via-black/65 lg:to-black/40 pointer-events-none" />

        {/* ======================================================= */}
        {/* DESKTOP HERO VIEW (2-Column inside Hero Section)        */}
        {/* ======================================================= */}
        <div className="hidden lg:flex relative z-10 max-w-[1440px] mx-auto px-8 lg:px-12 min-h-[92vh] items-center pt-28 pb-16">
          <div className="grid grid-cols-12 gap-12 items-center w-full">
            {/* Left Col: Hero Title in One Line */}
            <div className="col-span-7">
              <ScrollReveal direction="up" delay={50}>
                <h1 className="font-serif font-bold text-4xl xl:text-5xl 2xl:text-6xl text-white tracking-tight leading-tight drop-shadow-2xl whitespace-nowrap">
                  Faisal Hills Islamabad
                </h1>
              </ScrollReveal>
            </div>

            {/* Right Col: Booking Form */}
            <div className="col-span-5">
              <ScrollReveal direction="left" delay={100}>
                <div className="p-2 sm:p-4 space-y-5">
                  <div className="border-b border-white/15 pb-4">
                    <span className="font-serif font-extrabold text-2xl xl:text-3xl text-white block drop-shadow-md tracking-tight">
                      Book Your Plot / Flat
                    </span>
                    <p className="text-xs text-slate-300 mt-1 font-medium drop-shadow-sm">
                      Get official pricing, payment plan & plot selection guide.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-6 rounded-2xl text-xs font-bold space-y-2 animate-fadeIn text-center shadow-lg">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                      <h4 className="text-base font-serif text-white">Inquiry Submitted Successfully!</h4>
                      <p className="font-normal text-emerald-300">Our Faisal Hills sales executive will contact you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleHeroFormSubmit} className="space-y-4 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#7b002c] focus:ring-2 focus:ring-[#7b002c]/30 shadow-xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">Email / WhatsApp</label>
                        <input
                          type="text"
                          required
                          placeholder="Email or WhatsApp"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#7b002c] focus:ring-2 focus:ring-[#7b002c]/30 shadow-xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">Any Specific Requirement</label>
                        <textarea
                          rows={2}
                          placeholder="Any specific requirement or question..."
                          value={leadQuery}
                          onChange={(e) => setLeadQuery(e.target.value)}
                          className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#7b002c] focus:ring-2 focus:ring-[#7b002c]/30 shadow-xs transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-95 border border-white/20 cursor-pointer"
                      >
                        Submit Booking Inquiry
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-slate-300 text-[11px] sm:text-xs pt-1 font-medium select-none">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Your information is 100% secure</span>
                      </div>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* MOBILE HERO VIEW (Exact current mobile layout)          */}
        {/* ======================================================= */}
        <div className="block lg:hidden relative z-10">
          {/* Top Hero Portion with Background Image */}
          <div className="relative w-full min-h-[68vh] sm:min-h-[76vh] h-[68vh] sm:h-[76vh] flex flex-col justify-start overflow-hidden">
            {/* Hero Title at Top (closer to navbar) */}
            <div className="relative z-10 pt-20 sm:pt-24 text-center px-4 max-w-4xl mx-auto space-y-2">
              <ScrollReveal direction="up" delay={50}>
                <h1 className="font-serif font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight drop-shadow-2xl">
                  Faisal Hills Islamabad
                </h1>
              </ScrollReveal>
            </div>
          </div>

          {/* Form Area Placed Below Hero Image for Clear Visibility on Mobile */}
          <div className="relative z-30 max-w-2xl mx-auto px-4 mt-2 sm:mt-6 pb-14 sm:pb-16 w-full">
            <ScrollReveal direction="up" delay={100}>
              <div className="p-2 sm:p-4 space-y-5">
                <div className="border-b border-white/15 pb-4 text-center sm:text-left">
                  <span className="font-serif font-extrabold text-2xl sm:text-3xl text-white block mt-1 drop-shadow-md tracking-tight">
                    Book Your Plot / Flat
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium drop-shadow-sm">Get official pricing, payment plan & plot selection guide.</p>
                </div>

                {formSubmitted ? (
                  <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-6 rounded-2xl text-xs font-bold space-y-2 animate-fadeIn text-center shadow-lg">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-serif text-white">Inquiry Submitted Successfully!</h4>
                    <p className="font-normal text-emerald-300">Our Faisal Hills sales executive will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleHeroFormSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#7b002c] focus:ring-2 focus:ring-[#7b002c]/30 shadow-xs transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">Email / WhatsApp</label>
                      <input
                        type="text"
                        required
                        placeholder="Email or WhatsApp"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#7b002c] focus:ring-2 focus:ring-[#7b002c]/30 shadow-xs transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">Any Specific Requirement</label>
                      <textarea
                        rows={2}
                        placeholder="Any specific requirement or question..."
                        value={leadQuery}
                        onChange={(e) => setLeadQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#7b002c] focus:ring-2 focus:ring-[#7b002c]/30 shadow-xs transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-95 border border-white/20 cursor-pointer"
                    >
                      Submit Booking Inquiry
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-slate-300 text-[11px] sm:text-xs pt-1 font-medium select-none">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Your information is 100% secure</span>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 2 — STATS BAR (Counting Digits & Icons)            */}
      {/* ========================================================= */}
      <section className="bg-[#070e17] border-b border-white/10 pt-10 sm:pt-14 pb-10 sm:pb-12 shadow-xs relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

          {/* Mobile View: 2 - 1 - 2 Diamond Layout matching Reference */}
          <div className="block md:hidden space-y-6">
            {/* Top Row: 2 items */}
            <div className="grid grid-cols-2 gap-4 items-center justify-center">
              {/* Stat 1: 5k+ Plots */}
              <ScrollReveal direction="up" delay={50}>
                <div className="flex flex-col items-center text-center space-y-1.5 group">
                  <div className="w-8 h-8 text-rose-300 flex items-center justify-center">
                    <Maximize2 className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-2xl font-bold text-white tracking-tight">
                    <CountUpNumber end={5} suffix="k+" duration={1800} />
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 tracking-[0.18em] uppercase max-w-[130px] leading-tight">
                    TOTAL PLOTS
                  </div>
                </div>
              </ScrollReveal>

              {/* Stat 2: 4 Phases */}
              <ScrollReveal direction="up" delay={150}>
                <div className="flex flex-col items-center text-center space-y-1.5 group">
                  <div className="w-8 h-8 text-rose-300 flex items-center justify-center">
                    <Building2 className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-2xl font-bold text-white tracking-tight">
                    <CountUpNumber end={4} suffix="" duration={1600} />
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 tracking-[0.18em] uppercase max-w-[130px] leading-tight">
                    MASTER PHASES
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Middle Row: 1 Centered item */}
            <div className="flex justify-center items-center">
              <ScrollReveal direction="up" delay={250}>
                <div className="flex flex-col items-center text-center space-y-1.5 group">
                  <div className="w-8 h-8 text-rose-300 flex items-center justify-center">
                    <Award className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-2xl font-bold text-white tracking-tight">
                    <CountUpNumber end={12} suffix="+" duration={1800} />
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 tracking-[0.18em] uppercase max-w-[150px] leading-tight">
                    YEARS EXPERIENCE
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Bottom Row: 2 items */}
            <div className="grid grid-cols-2 gap-4 items-center justify-center">
              {/* Stat 4: 100% Legal */}
              <ScrollReveal direction="up" delay={350}>
                <div className="flex flex-col items-center text-center space-y-1.5 group">
                  <div className="w-8 h-8 text-rose-300 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-2xl font-bold text-white tracking-tight">
                    <CountUpNumber end={100} suffix="%" duration={2000} />
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 tracking-[0.18em] uppercase max-w-[130px] leading-tight">
                    RDA APPROVED LEGAL
                  </div>
                </div>
              </ScrollReveal>

              {/* Stat 5: 30+ Amenities */}
              <ScrollReveal direction="up" delay={450}>
                <div className="flex flex-col items-center text-center space-y-1.5 group">
                  <div className="w-8 h-8 text-rose-300 flex items-center justify-center">
                    <Trees className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-2xl font-bold text-white tracking-tight">
                    <CountUpNumber end={30} suffix="+" duration={1800} />
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 tracking-[0.18em] uppercase max-w-[130px] leading-tight">
                    MODERN AMENITIES
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Desktop View: All 5 Stats in 1 Row */}
          <div className="hidden md:grid md:grid-cols-5 gap-6 items-center justify-items-center text-center">
            {/* Stat 1 */}
            <ScrollReveal direction="up" delay={50} className="w-full flex justify-center text-center">
              <div className="flex flex-col items-center justify-center space-y-1.5 group">
                <div className="w-9 h-9 text-rose-300 flex items-center justify-center">
                  <Maximize2 className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={5} suffix="k+" duration={1800} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-300 tracking-wide uppercase">
                  TOTAL PLOTS
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 2 */}
            <ScrollReveal direction="up" delay={150} className="w-full flex justify-center text-center">
              <div className="flex flex-col items-center justify-center space-y-1.5 group">
                <div className="w-9 h-9 text-rose-300 flex items-center justify-center">
                  <Building2 className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={4} suffix="" duration={1600} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-300 tracking-wide uppercase">
                  MASTER PHASES
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 3 */}
            <ScrollReveal direction="up" delay={250} className="w-full flex justify-center text-center">
              <div className="flex flex-col items-center justify-center space-y-1.5 group">
                <div className="w-9 h-9 text-rose-300 flex items-center justify-center">
                  <Award className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={12} suffix="+" duration={1800} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-300 tracking-wide uppercase">
                  YEARS EXPERIENCE
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 4 */}
            <ScrollReveal direction="up" delay={350} className="w-full flex justify-center text-center">
              <div className="flex flex-col items-center justify-center space-y-1.5 group">
                <div className="w-9 h-9 text-rose-300 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={100} suffix="%" duration={2000} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-300 tracking-wide uppercase">
                  100% LEGAL & APPROVED
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 5 */}
            <ScrollReveal direction="up" delay={450} className="w-full flex justify-center items-center text-center">
              <div className="flex flex-col items-center justify-center space-y-1.5 group text-center mx-auto">
                <div className="w-9 h-9 text-rose-300 flex items-center justify-center">
                  <Trees className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={30} suffix="+" duration={1800} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-300 tracking-wide uppercase">
                  30+ AMENITIES
                </span>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3 — ABOUT                                         */}
      {/* ========================================================= */}
      <section className="bg-white pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Chairman & Founder Header + Paragraph */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <ScrollReveal direction="up" delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] tracking-tight leading-tight text-center lg:text-left">
                Chairman & Founder — Chaudhry Abdul Majeed
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <div className="space-y-2 font-sans max-w-xl text-slate-600 text-xs sm:text-sm leading-relaxed mx-auto lg:mx-0">
                <p>
                  Faisal Hills Islamabad, developed by Zedem International, is a thoughtfully planned gated community located in Taxila along the historic GT Road.
                  {!isAboutExpanded && (
                    <button
                      type="button"
                      onClick={() => setIsAboutExpanded(true)}
                      className="ml-2 font-bold text-[#7b002c] hover:text-[#9e1245] hover:underline cursor-pointer inline-flex items-center gap-0.5"
                    >
                      <span>See More</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  )}
                </p>

                {isAboutExpanded && (
                  <div className="space-y-2 animate-fadeIn">
                    <p>
                      With the scenic Margalla Hills as its backdrop, it offers easy access to Islamabad and Rawalpindi. Combining modern living, strong connectivity, legal development, and attractive investment potential, Faisal Hills is an ideal choice for both homebuyers and investors.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsAboutExpanded(false)}
                      className="font-bold text-[#7b002c] hover:text-[#9e1245] hover:underline cursor-pointer inline-flex items-center gap-0.5 text-xs"
                    >
                      <span>See Less</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Desktop View: Discover More Link */}
            <ScrollReveal direction="up" delay={250} className="hidden lg:block">
              <div className="pt-2">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
                >
                  <span>Discover More About Zedem International</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Image with exact ALT text + Mobile Discover More Link below */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
            <ScrollReveal direction="left" delay={200} duration={800}>
              <img
                src="/chaudhry-abdul-majeed.png"
                alt="Faisal Hills Islamabad growth lifestyle and property potential"
                className="w-full max-w-[420px] h-auto object-contain"
              />
            </ScrollReveal>

            {/* Mobile View: Discover More Link placed directly below the image */}
            <div className="lg:hidden pt-4 pb-2 text-center w-full flex justify-center">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
              >
                <span>Discover More About Zedem International</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
              </Link>
            </div>
          </div>

        </div>
        {/* Slogan Moving Marquee Ribbon */}
        <div className="bg-white py-4 mt-8 border-y border-slate-100 overflow-hidden select-none flex items-center justify-center">
          <div className="ticker-track gap-12 items-center text-xs sm:text-sm font-serif font-bold tracking-[0.2em] text-[#7b002c] uppercase whitespace-nowrap">
            {[
              'FAISAL HILLS ISLAMABAD',
              '100% RDA APPROVED SOCIETY',
              'LUXURY LIVING AT MARGALLA FOOTHILLS',
              '225FT MAIN BOULEVARD ACCESS',
              'PREMIUM RESIDENTIAL & COMMERCIAL PLOTS',
              'A PROJECT BY ZEDEM INTERNATIONAL',
              'HIGH-ROI SECURE PROPERTY INVESTMENT',
              'IMMEDIATE POSSESSION & CONSTRUCTION READY',
              'FAISAL HILLS ISLAMABAD',
              '100% RDA APPROVED SOCIETY',
              'LUXURY LIVING AT MARGALLA FOOTHILLS',
              '225FT MAIN BOULEVARD ACCESS',
              'PREMIUM RESIDENTIAL & COMMERCIAL PLOTS',
              'A PROJECT BY ZEDEM INTERNATIONAL',
              'HIGH-ROI SECURE PROPERTY INVESTMENT',
              'IMMEDIATE POSSESSION & CONSTRUCTION READY'
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-12 shrink-0">
                <span className="font-serif tracking-[0.2em]">{text}</span>
                <span className="text-slate-300 font-sans">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4 — OUR PROJECTS (Static Clean Alignment)         */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-10 sm:py-12 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6 text-center lg:text-left">

          <ScrollReveal direction="up" delay={50}>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#7b002c] tracking-tight text-center lg:text-left">
              Our Projects by Zedem International
            </h2>
          </ScrollReveal>

          {/* Static Clean Grid of Projects with Equal-Width Uniform Boxes */}
          <ScrollReveal direction="up" delay={150}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 pt-1 w-full">
              {[
                { name: 'Faisal Town Phase 1', href: '/about-us' },
                { name: 'Faisal Town Phase 2', href: '/about-us' },
                { name: 'Faisal Hills', href: '/faisal-hills-blocks' },
                { name: 'Faisal Margalla City', href: '/about-us' },
                { name: 'Faisal Heights', href: '/about-us' },
                { name: 'Faisal Jewels', href: '/blocks/faisal-jewel-islamabad' },
              ].map((proj, idx) => (
                <Link
                  key={idx}
                  href={proj.href}
                  className="bg-white border border-slate-200/90 hover:border-[#7b002c] rounded-xl sm:rounded-full px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.02] w-full text-center"
                >
                  <Building2 className="w-4 h-4 text-[#7b002c] shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#7b002c] transition-colors truncate">
                    {proj.name}
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4.4 — ABOUT FAISAL HILLS (Introductory Showcase)  */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-14 lg:py-20 border-b border-slate-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left Column: Text Content */}
            <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
              <ScrollReveal direction="up" delay={50}>
                <div>

                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] tracking-tight leading-tight text-center lg:text-left">
                    Faisal Hills Overview
                  </h2>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={150}>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                  Faisal Hills Islamabad, developed by Zedem International, is a thoughtfully planned gated community located in Taxila along the historic GT Road. With the scenic Margalla Hills as its backdrop, it offers easy access to Islamabad and Rawalpindi. Combining modern living, strong connectivity, legal development, and attractive investment potential, Faisal Hills is an ideal choice for both homebuyers and investors.
                </p>
              </ScrollReveal>

              {/* Desktop Discover More CTA */}
              <ScrollReveal direction="up" delay={250} className="hidden lg:block pt-2">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
                >
                  <span>Discover More About Faisal Hills</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Right Column: Image & Mobile Discover More Link below */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
              <ScrollReveal direction="left" delay={150} duration={800} className="w-full">
                <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[430px] rounded-2xl overflow-hidden shadow-lg group border border-slate-200/80">
                  <img
                    src="/images/imgi_38_Faisal-Hills-site-home-page-header.webp"
                    alt="Faisal Hills Islamabad growth lifestyle and property potential"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>

              {/* Mobile View: Discover More Link placed directly below the image */}
              <div className="lg:hidden pt-4 pb-2 text-center w-full flex justify-center">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
                >
                  <span>Discover More About Faisal Hills</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4.5 — LOCATION & CONNECTIVITY                     */}
      {/* ========================================================= */}
      <section className="bg-white text-slate-900 py-14 lg:py-20 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            <ScrollReveal direction="right" className="lg:col-span-6 space-y-4 text-center lg:text-left">

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] leading-tight tracking-tight text-center lg:text-left">
                Faisal Hills Islamabad — A Location That Sets It Apart
              </h2>
              {/* Desktop View: Full Paragraphs */}
              <div className="hidden md:block space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                <p>
                  The Faisal Hills Islamabad location is one of its defining advantages. Situated on the Grand Trunk Road (GT Road) near Taxila, the society sits at a natural crossroads between Pakistan's federal capital and the historic industrial city of Taxila — combining the prestige of an Islamabad address with the affordability of a Taxila postcode.
                </p>
                <p>
                  The GT Road has been a commercial and commuter artery for centuries, and today it connects Faisal Hills to virtually every major destination in the twin cities within 30–45 minutes.
                </p>
                <p>
                  The Islamabad Expressway expansion and ongoing GT Road dualization projects are actively reducing commute times and increasing the connectivity of Faisal Hills Islamabad to the wider region. Infrastructure development at this scale directly drives property values upward — making now an ideal time to enter the market before appreciation accelerates further.
                </p>
              </div>

              {/* Mobile View: Concise with See More Toggle */}
              <div className="block md:hidden space-y-3 text-slate-600 text-xs leading-relaxed text-center">
                <p>
                  The Faisal Hills Islamabad location is one of its defining advantages. Situated on the Grand Trunk Road (GT Road) near Taxila, the society sits at a natural crossroads between Pakistan's federal capital and the historic industrial city of Taxila — combining the prestige of an Islamabad address with the affordability of a Taxila postcode.
                </p>
                {isLocationExpanded && (
                  <>
                    <p>
                      The GT Road has been a commercial and commuter artery for centuries, and today it connects Faisal Hills to virtually every major destination in the twin cities within 30–45 minutes.
                    </p>
                    <p>
                      The Islamabad Expressway expansion and ongoing GT Road dualization projects are actively reducing commute times and increasing the connectivity of Faisal Hills Islamabad to the wider region. Infrastructure development at this scale directly drives property values upward — making now an ideal time to enter the market before appreciation accelerates further.
                    </p>
                  </>
                )}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsLocationExpanded(!isLocationExpanded)}
                    className="text-xs font-bold text-[#7b002c] hover:text-[#9e1245] flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>{isLocationExpanded ? 'See Less' : 'See More'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLocationExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Desktop View CTA Link */}
              <div className="hidden lg:flex pt-2 justify-start">
                <Link
                  href="/master-plan"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-1 transition-all"
                >
                  <span>Explore Complete Location Map & Sector Boundaries</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Google Maps Embed Card */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
              <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white relative">
                <iframe
                  title="Faisal Hills Islamabad Location on Google Maps"
                  src="https://maps.google.com/maps?q=Faisal+Hills+Main+GT+Road+Taxila+Islamabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="340"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[260px] sm:h-[320px] lg:h-[340px]"
                />
              </div>

              {/* Mobile View: Explore Link placed directly below the map */}
              <div className="lg:hidden pt-4 pb-2 text-center w-full flex justify-center">
                <Link
                  href="/master-plan"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
                >
                  <span>Explore Complete Location Map & Sector Boundaries</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4.6 — NEARBY LANDMARKS & TRAVEL TIMES             */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-14 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">

          {/* Section Header */}
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0 space-y-2">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block mb-1">
                Strategic Connectivity
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] tracking-tight leading-tight">
                Nearby Landmarks of Faisal Hills
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                Positioned along the historic GT Road with direct arterial access, Faisal Hills offers rapid travel times to key cultural, commercial, and international travel landmarks across Islamabad and Rawalpindi.
              </p>
            </ScrollReveal>
          </div>

          {/* Landmark Cards with Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                title: 'Taxila Museum Circle',
                subtitle: 'Historical & Cultural Center',
                time: '5 Mins Drive',
                icon: Landmark,
                image: '/images/faisalhillarc.jpg'
              },
              {
                title: 'CPEC / M-1 Motorway',
                subtitle: 'Direct Highway Access',
                time: '10 Mins Drive',
                icon: Compass,
                image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg'
              },
              {
                title: 'Islamabad Airport',
                subtitle: 'International Air Terminal',
                time: '15 Mins Drive',
                icon: Building2,
                image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg'
              },
              {
                title: 'Zero Point & Blue Area',
                subtitle: 'Capital Business District',
                time: '20 Mins Drive',
                icon: TrendingUp,
                image: '/images/imgi_38_Faisal-Hills-site-home-page-header.webp'
              },
            ].map((loc, idx) => {
              const Icon = loc.icon;
              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 80} className="h-full">
                  <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-1">
                    {/* Landmark Image */}
                    <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-900">
                      <img
                        src={loc.image}
                        alt={loc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Drive Time Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#7b002c] text-white font-bold px-3 py-1 rounded-full text-xs shadow-md">
                          {loc.time}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 flex items-start gap-3.5 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center shrink-0 border border-rose-100 group-hover:bg-[#7b002c] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#7b002c] transition-colors leading-tight">
                          {loc.title}
                        </h3>
                        <p className="text-slate-500 text-xs font-sans leading-relaxed">
                          {loc.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5 — OFFICIAL MASTER PLAN MAP BLUEPRINT            */}
      {/* ========================================================= */}
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
                <button
                  onClick={() => setIsMapDownloadModalOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3.5 rounded-xl border border-[#7b002c] shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-white" />
                  <span>Download Master Plan (PDF)</span>
                </button>

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
                <button
                  onClick={() => setIsMapDownloadModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3.5 rounded-xl border border-[#7b002c] shadow-md transition-all active:scale-95 cursor-pointer text-center"
                >
                  <FileText className="w-4 h-4 text-white" />
                  <span>Download Master Plan (PDF)</span>
                </button>

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

      {/* ========================================================= */}
      {/* SECTION 6 — BLOCKS & SECTORS (EXPANDING ACCORDION COLUMNS)*/}
      {/* ========================================================= */}
      <section id="blocks-section" className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6 py-12 lg:py-16">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 text-center md:text-left">
          <ScrollReveal direction="up" delay={50} className="space-y-1 max-w-xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] text-center md:text-left">
              Explore Faisal Hills Blocks & Sectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans text-center md:text-left">
              Hover or click the sector buttons to view each block's location advantages, development progress, and direct links:
            </p>
          </ScrollReveal>

          {/* 3 Buttons in Row 1, 3 Buttons in Row 2 (Replaces View All Block Details) */}
          <ScrollReveal direction="up" delay={150} className="flex justify-center">
            <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-sm grid grid-cols-3 gap-1.5 shrink-0 mx-auto md:mx-0">
              {[
                { name: 'Executive Block', id: 0 },
                { name: 'Prime Block', id: 1 },
                { name: 'Block A', id: 2 },
                { name: 'Block B', id: 3 },
                { name: 'Block C', id: 4 },
                { name: 'Block D', id: 5 },
              ].map((blk) => {
                const isActive = activeBlockIndex === blk.id;
                return (
                  <button
                    key={blk.id}
                    type="button"
                    onClick={() => setActiveBlockIndex(blk.id)}
                    className={`px-3 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer text-center active:scale-95 ${
                      isActive
                        ? 'bg-[#7b002c] text-white shadow-md ring-1 ring-[#7b002c]'
                        : 'text-slate-600 hover:text-[#7b002c] hover:bg-rose-50/60'
                    }`}
                  >
                    {blk.name}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Expanding Multi-Column Sector Showcase */}
        <ScrollReveal direction="up" delay={100}>
          <ExpandingProjectsShowcase
            items={defaultFaisalHillsBlocks}
            activeIndex={activeBlockIndex}
            onActiveIndexChange={setActiveBlockIndex}
            containerHeightClass="h-[480px] sm:h-[520px] lg:h-[560px]"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6.5 — HIGH-RISE & FLAGSHIP COMMERCIAL PROJECTS    */}
      {/* (Faisal Jewel & Hills Walk Dedicated Showcase)            */}
      {/* ========================================================= */}
      <section className="bg-white py-14 lg:py-20 border-y border-slate-200 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6 text-center md:text-left">
            <ScrollReveal direction="up" delay={50} className="space-y-1 text-center md:text-left mx-auto md:mx-0">

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] text-center md:text-left">
                Faisal Hills High-Rise & Commercial Flagships
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans text-center md:text-left">
                Discover world-class architectural marvels and premium lifestyle shopping destinations developed within Faisal Hills.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

            {/* Card 1: Faisal Jewel */}
            <ScrollReveal direction="up" delay={100} className="h-full">
              <Link
                href="/blocks/faisal-jewel-islamabad"
                className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-xl group block transition-all duration-500 hover:shadow-2xl active:scale-[0.99] bg-slate-950"
              >
                {/* Background Image */}
                <img
                  src="/images/imgi_175_faisal-jewel.jpg"
                  alt="Faisal Jewel 27-Story Megastructure"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Atmospheric Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

                {/* Bottom Content Area */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 space-y-2">
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-normal drop-shadow-md group-hover:text-rose-200 transition-colors leading-tight">
                    Faisal Jewel
                  </h3>

                  <div className="pt-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#7b002c] hover:bg-[#9e1245] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-md border border-white/20 transition-all">
                      <span>Explore Faisal Jewel</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {/* Card 2: Hills Walk */}
            <ScrollReveal direction="up" delay={200} className="h-full">
              <Link
                href="/blocks/hills-walk"
                className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-xl group block transition-all duration-500 hover:shadow-2xl active:scale-[0.99] bg-slate-950"
              >
                {/* Background Image */}
                <img
                  src="/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg"
                  alt="Hills Walk European Commercial Promenade"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Atmospheric Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

                {/* Bottom Content Area */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 space-y-2">
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-normal drop-shadow-md group-hover:text-rose-200 transition-colors leading-tight">
                    Hills Walk
                  </h3>

                  <div className="pt-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#7b002c] hover:bg-[#9e1245] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-md border border-white/20 transition-all">
                      <span>Explore Hills Walk</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10 — PAYMENT PLAN 2026                            */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 sm:py-20 space-y-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-center md:text-left">
          <ScrollReveal direction="up" delay={50} className="max-w-2xl space-y-2 text-center md:text-left mx-auto md:mx-0">

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c] text-center md:text-left">
              Flexible Payments, Transparent Pricing
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-center md:text-left">
              One of the most frequently asked questions we receive is about the Faisal Hills Islamabad payment plan — and for good reason. Property investment is a significant financial commitment, and knowing exactly what you owe, when you owe it, and what you get in return is fundamental to making a confident decision.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} className="flex justify-center md:justify-end">
            <Link href="/payment-plan" className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] bg-white hover:bg-slate-100 px-5 py-3 rounded-xl border border-slate-300 shadow-sm transition">
              <Calculator className="w-4 h-4 text-[#7b002c]" />
              <span>Open Custom Calculator</span>
            </Link>
          </ScrollReveal>
        </div>

        {/* 4 H3 Pillars: How the Payment Plan Works (2-column on mobile) */}
        <div className="space-y-3 sm:space-y-4">
          <strong className="text-xs font-bold uppercase tracking-wider text-slate-800 block text-center md:text-left">
            How the Payment Plan Works
          </strong>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {[
              { title: 'Booking Amount', desc: 'A percentage of total plot value is paid at the time of booking to secure your specific plot and block.' },
              { title: 'Down Payment', desc: 'A further tranche paid within 30–60 days of booking to confirm the allocation.' },
              { title: 'Easy Instalments', desc: 'The remaining balance is spread across quarterly or bi-annual instalments over a period of 2–4 years, depending on the selected plan.' },
              { title: 'No Frills', desc: 'All applicable fees (development charges, transfer fees) are disclosed upfront at the time of booking.' },
            ].map((pill, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 60} className="h-full">
                <div className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs space-y-1.5 sm:space-y-2 h-full flex flex-col justify-between hover:border-[#7b002c]/40 transition-all">
                  <div>
                    <h3 className="font-serif font-bold text-xs sm:text-base text-[#7b002c] leading-snug">
                      {pill.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed font-sans mt-1 line-clamp-4 sm:line-clamp-none">
                      {pill.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Official Faisal Hills Payment Plan Image Showcase (Clickable Fullscreen & Lead-Gated Download) */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white p-3 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div
              onClick={() => setIsPaymentPlanLightboxOpen(true)}
              className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-950 group cursor-pointer"
              title="Click to Open Fullscreen & Zoom Payment Plan"
            >
              <img
                src="/images/faisal-hill-payment-plan.jpg"
                alt="Faisal Hills Islamabad Official Payment Plan Schedule & Rates"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="bg-black/80 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-full border border-white/20 flex items-center gap-2 shadow-2xl">
                  <Maximize2 className="w-4 h-4 text-rose-300" />
                  <span>Click to View Fullscreen & Zoom Plan</span>
                </span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% RDA Approved Official Payment Schedule & Installment Breakdown</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsPaymentPlanDownloadOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl border border-slate-300 transition-all cursor-pointer text-center"
                >
                  <FileText className="w-4 h-4 text-[#7b002c]" />
                  <span>Download Plan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-center"
                >
                  <Sparkles className="w-4 h-4 text-rose-300" />
                  <span>Book Plot On This Plan</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </section>

      {/* ========================================================= */}
      {/* SECTION 11 — HOW TO BOOK (A Simple 5-Step Booking Process)*/}
      {/* ========================================================= */}
      <StickyHorizontalBookingSteps />

      {/* ========================================================= */}
      {/* SECTION 12 — INVESTMENT BENEFITS                          */}
      {/* ========================================================= */}
      <section className="bg-white py-12 sm:py-16 px-3.5 sm:px-6 lg:px-12 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-8 sm:space-y-10">

          <div className="max-w-3xl space-y-2 sm:space-y-3 text-center lg:text-left mx-auto lg:mx-0">
            <ScrollReveal direction="up" delay={50}>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] text-center lg:text-left">
                Why Faisal Hills Is One of Pakistan's Smartest Property Investments
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed text-center lg:text-left">
                A great housing society is more than land and roads. It is the infrastructure around your property that determines your daily quality of life. Faisal Hills Islamabad has been master-planned to deliver a comprehensive lifestyle ecosystem — everything you need, within the community you call home.
              </p>
            </ScrollReveal>
          </div>

          {/* 6 H3 Investment Benefit Items (2 to 3 per row on mobile) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
            {[
              {
                title: 'Capital Appreciation',
                desc: 'Plots in Faisal Hills have appreciated significantly since the society launched. Early investors who purchased at launch-phase prices have seen returns well above the national inflation average — a testament to the power of investing in legally sound, developer-backed projects with genuine infrastructure delivery.'
              },
              {
                title: 'High ROI Property in Pakistan',
                desc: 'The combination of GT Road accessibility, proximity to Islamabad\'s economic core, CDA approval, and active construction makes Faisal Hills Islamabad one of the highest ROI property propositions currently available in the Pakistan real estate market. As the society matures, rental yields from commercial plots in particular are expected to be compelling.'
              },
              {
                title: 'Smart Investment Opportunity 2026',
                desc: 'With Pakistan\'s growing urban population placing pressure on housing supply in and around Islamabad, demand for Taxila housing societies — particularly those with legal standing and quality infrastructure — is accelerating. Faisal Hills is perfectly positioned to benefit from this demographic and economic tailwind. 2026 is being widely described as an inflection point for smart investment in Islamabad\'s suburbs.'
              },
              {
                title: 'Gated Community Lifestyle',
                desc: 'Beyond the numbers, Faisal Hills offers something that pure investment metrics cannot fully capture: a quality of life. Gated community infrastructure means security, clean streets, green spaces, and a community of like-minded residents — an environment that is increasingly difficult to find at this price point anywhere in the twin cities.'
              },
              {
                title: 'Accessible from Islamabad Expressway',
                desc: 'For daily commuters, the Islamabad Expressway accessibility of Faisal Hills is a game-changer. Residents can reach key employment, education, and commercial hubs in Islamabad without the frustration of inner-city traffic — a genuine lifestyle upgrade that directly supports long-term demand for plots here.'
              },
              {
                title: 'Strategic Location with Exceptional Growth Potential',
                desc: 'Faisal Hills stands out as one of Pakistan\'s smartest property investment destinations due to its prime location, modern infrastructure, and long-term growth prospects. Situated near Islamabad and major transportation routes, the project offers convenient connectivity while maintaining a peaceful residential environment.'
              },
            ].slice(0, isInvestmentBenefitsExpanded ? 6 : 3).map((benefit, idx, arr) => {
              const isLastOdd = arr.length % 2 !== 0 && idx === arr.length - 1;
              return (
                <ScrollReveal
                  key={idx}
                  direction="up"
                  delay={(idx % 3) * 60}
                  className={`h-full ${isLastOdd ? 'col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className="bg-slate-50 p-3.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-[#7b002c] shadow-xs space-y-2 sm:space-y-2.5 h-full transition-all">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[#7b002c]">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <h3 className="font-serif font-bold text-xs sm:text-base lg:text-lg text-slate-900 leading-snug">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-slate-600 leading-relaxed font-sans line-clamp-4 sm:line-clamp-none">
                      {benefit.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* See More / See Less Toggle */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsInvestmentBenefitsExpanded(!isInvestmentBenefitsExpanded)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#7b002c] text-[#7b002c] hover:bg-[#7b002c] hover:text-white font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>{isInvestmentBenefitsExpanded ? 'Show Less Benefits' : 'See More (All 6 Benefits)'}</span>
              {isInvestmentBenefitsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 13 — AMENITIES & LIFESTYLE (SELECTABLE OPTIONS)   */}
      <section className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-12 py-12 sm:py-20 space-y-6 sm:space-y-8">

        <div className="max-w-3xl space-y-2 sm:space-y-3 text-center lg:text-left mx-auto lg:mx-0">
          <ScrollReveal direction="up" delay={50}>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] text-center lg:text-left">
              Amenities Designed for Modern Living
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed text-center lg:text-left">
              A great housing society is more than land and roads. It is the infrastructure around your property that determines your daily quality of life. Explore the world-class features and key amenities that make Faisal Hills Islamabad special:
            </p>
          </ScrollReveal>
        </div>

        {/* 6 H3 Amenity Showcase Cards (2 to 3 per row on mobile with images) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {[
            {
              title: 'Connectivity & Infrastructure',
              tag: 'Connectivity & Roads',
              image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg',
              bullets: ['Wide carpeted boulevards and road network', 'Underground electricity, gas, and water supply', 'State-of-the-art boundary wall and main gate']
            },
            {
              title: 'Community & Recreation',
              tag: 'Community & Parks',
              image: '/images/faisal-park.jpg',
              bullets: ['Central park and community gardens', 'Dedicated jogging and cycling tracks', 'Community centre and function hall']
            },
            {
              title: 'Education & Healthcare',
              tag: 'Education & Health',
              image: '/images/faisal-roots-school.jpg',
              bullets: ['Site reserved for school and college campus', 'Planned healthcare facility and pharmacy zone', 'Close proximity to Taxila\'s existing medical infrastructure']
            },
            {
              title: 'Commercial & Retail',
              tag: 'Commercial & Retail',
              image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
              bullets: ['Commercial hub along main boulevard', 'Retail strip and marketplace for daily needs', 'Dedicated food street concept under planning']
            },
            {
              title: 'Security & Management',
              tag: 'Security & Safety',
              image: '/images/faisalhillarc.jpg',
              bullets: ['24/7 gated community security', 'CCTV surveillance on main arteries', 'Trained security personnel at all entry points', 'Professional society management company']
            },
            {
              title: 'Premium Amenities',
              tag: 'Premium Lifestyle',
              image: '/images/imgi_46_Mosques.webp',
              bullets: ['Wide carpeted boulevards and modern road infrastructure', 'Underground electricity, gas, and water supply', 'Central park, jogging tracks, and recreational spaces']
            },
          ].map((cat, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 50} className="h-full">
              <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white hover:border-[#7b002c]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group shadow-xs hover:shadow-md">
                <div>
                  {/* Card Image Banner */}
                  <div className="relative w-full h-[95px] sm:h-[140px] lg:h-[155px] overflow-hidden bg-slate-900">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Card Body */}
                  <div className="p-2.5 sm:p-5 space-y-1.5 sm:space-y-2.5">
                    <h3 className="font-serif font-bold text-xs sm:text-base lg:text-lg text-[#7b002c] leading-snug">
                      {cat.title}
                    </h3>
                    <ul className="space-y-1 sm:space-y-1.5 text-[9.5px] sm:text-xs text-slate-600 font-sans">
                      {cat.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1 sm:gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] mt-1 shrink-0" />
                          <span className="leading-snug line-clamp-2 sm:line-clamp-none">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 14 — TESTIMONIALS (CLEAN WHITE DESIGN)            */}
      {/* ========================================================= */}
      <section className="relative bg-white py-16 lg:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden text-slate-900 border-y border-slate-200">
        {/* Subtle Ambient Soft Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl pointer-events-none" />

        {/* Reusable SVG ClipPath for Scalloped Flower Avatar */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="flower-avatar-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.5 0 C 0.57 0, 0.62 0.07, 0.68 0.09 C 0.74 0.11, 0.81 0.08, 0.86 0.15 C 0.91 0.20, 0.90 0.27, 0.93 0.33 C 0.95 0.39, 1.00 0.44, 1.00 0.50 C 1.00 0.56, 0.95 0.61, 0.93 0.67 C 0.90 0.73, 0.91 0.80, 0.86 0.85 C 0.81 0.92, 0.74 0.89, 0.68 0.91 C 0.62 0.93, 0.57 1.00, 0.50 1.00 C 0.43 1.00, 0.38 0.93, 0.32 0.91 C 0.26 0.89, 0.19 0.92, 0.14 0.85 C 0.09 0.80, 0.10 0.73, 0.07 0.67 C 0.05 0.61, 0.00 0.56, 0.00 0.50 C 0.00 0.44, 0.05 0.39, 0.07 0.33 C 0.10 0.27, 0.09 0.20, 0.14 0.15 C 0.19 0.08, 0.26 0.11, 0.32 0.09 C 0.38 0.07, 0.43 0, 0.5 0 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="max-w-[1280px] mx-auto relative z-10 space-y-10 sm:space-y-14">

          {/* Section Header */}
          <div className="max-w-2xl space-y-2 text-center md:text-left mx-auto md:mx-0">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block mb-1">
                Client Feedback
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#7b002c] tracking-tight leading-tight text-center md:text-left">
                Testimonials
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans text-center md:text-left">
                Hear directly from overseas investors, genuine homebuyers, and commercial stakeholders about their real experience with Faisal Hills Islamabad.
              </p>
            </ScrollReveal>
          </div>

          {/* Testimonial Cards Layout - Horizontal Scroll on Mobile, 3-Column on Desktop */}
          <div className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-2 pb-3 md:pb-0 md:grid-cols-3 -mx-4 px-4 sm:-mx-8 sm:px-8 md:mx-0 md:px-0">
            {[
              {
                name: 'Linda P.',
                role: 'MARKETING DIRECTOR',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
                quote: 'Faisal Hills delivered transparent pricing and clear schedules that truly gave us peace of mind with our long-term capital investment!'
              },
              {
                name: 'Michael B.',
                role: 'FOUNDER & INVESTOR',
                avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
                quote: 'Professional, timely, and their ground development speed in Executive Block consistently exceeds expectations!'
              },
              {
                name: 'Jessica L.',
                role: 'OVERSEAS BUYER',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                quote: 'The team guided our family through every verification step seamlessly, making plot booking from abroad effortless!'
              }
            ].map((review, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 120}
                className={`shrink-0 w-[82vw] sm:w-[320px] md:w-auto snap-center h-full ${idx === 1 ? 'md:translate-y-6' : idx === 2 ? 'md:translate-y-12' : ''}`}
              >
                <div className="bg-slate-50 text-slate-900 rounded-[28px] sm:rounded-[36px] p-6 sm:p-7 shadow-sm hover:shadow-xl relative transition-all duration-500 hover:-translate-y-2 border border-slate-200 h-full flex flex-col justify-between">

                  {/* Top Row with Scalloped Avatar + Info */}
                  <div className="flex items-center gap-4">
                    {/* Flower Avatar Frame */}
                    <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md">
                      <div
                        className="w-full h-full bg-slate-200 overflow-hidden"
                        style={{ clipPath: 'url(#flower-avatar-clip)' }}
                      >
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-full h-full object-cover scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#7b002c] leading-tight">
                        {review.name}
                      </h3>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                        {review.role}
                      </span>
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="mt-5 pt-3 border-t border-slate-200">
                    <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                      "{review.quote}"
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 15 — INFRASTRUCTURE & LANDMARKS (SLIDER)          */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-14 sm:py-20 lg:py-24 space-y-8">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-center lg:text-left">
          <ScrollReveal direction="up" delay={50} className="space-y-2 max-w-2xl text-center lg:text-left mx-auto lg:mx-0">

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] text-center lg:text-left">
              Infrastructure of Faisal Hills
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-center lg:text-left">
              Faisal Hills features wide streets and boulevards ranging from 40 to 225 feet, ensuring a spacious, organized, and aesthetically planned layout that meets the highest standards of urban design.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} className="flex items-center justify-center lg:justify-end gap-3">
            <a
              href="https://wa.me/923044811717?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Faisal%20Hills%20Infrastructure%20and%20Landmarks."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Chat On WhatsApp</span>
            </a>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                type="button"
                onClick={() => handleInfraScroll('left')}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
                title="Scroll Left"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleInfraScroll('right')}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#7b002c] text-slate-700 hover:text-white flex items-center justify-center transition shadow-xs cursor-pointer active:scale-95"
                title="Scroll Right"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* 8 Landmark Cards Horizontal Slider / Carousel */}
        <div className="relative">
          <div
            ref={infraSliderRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {[
              {
                title: 'Hill Walk — A vibrant boulevard inspired by Istiklal Street',
                image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
                block: 'Commercial'
              },
              {
                title: 'Faisal Hills Arc — Architectural Landmark',
                image: '/images/faisalhillarc.jpg',
                block: 'Main Gate'
              },
              {
                title: 'Faisal Jewel — 27-Storey Five-Star Hotel',
                image: '/images/faisal-jewel.jpg',
                block: 'Hilton Tower'
              },
              {
                title: 'Sports Arena — Executive Block',
                image: '/images/faisal-park.jpg',
                block: 'Executive'
              },
              {
                title: 'Roots International Schools & Colleges Campus',
                image: '/images/faisal-roots-school.jpg',
                block: 'Education'
              },
              {
                title: 'Miyawaki Forest — Block C',
                image: '/images/faisal-forest.jpg',
                block: 'Block C'
              },
              {
                title: 'Faisal Hills Downtown — Civic Center',
                image: '/images/imgi_5_Rectangle-1-1-scaled-e1766059628733.png',
                block: 'Downtown'
              },
              {
                title: 'Glow Park — Block A',
                image: '/images/faisal-park.jpg',
                block: 'Block A'
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 w-[78vw] sm:w-[280px] lg:w-[320px] snap-start group relative rounded-2xl overflow-hidden shadow-md aspect-[4/5] flex flex-col justify-end p-4 border border-slate-200 bg-slate-900"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 bg-[#7b002c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow border border-white/20">
                  {item.block}
                </div>
                <div className="relative z-10 w-full bg-white/95 backdrop-blur-md rounded-xl p-3 text-center shadow-md">
                  <h3 className="font-serif font-bold text-[#7b002c] text-xs sm:text-sm leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>



      {/* ========================================================= */}
      {/* SECTION 15.5 — ON-SITE CONSTRUCTION & PHOTO GALLERY       */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8 py-6" id="gallery-section">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
          <ScrollReveal direction="up" delay={50} className="space-y-2 text-center md:text-left mx-auto md:mx-0">

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c] text-center md:text-left">
              On-Site Construction & Photo Gallery
            </h2>
            <p className="text-slate-600 text-sm max-w-xl text-center md:text-left">
              Real-time photography of Faisal Hills entrance portals, wide boulevards, Grand Jamia Mosque, and Faisal Jewels skyscraper construction.
            </p>
          </ScrollReveal>

          {/* Filter Buttons (Removed 'All' Option) */}
          <ScrollReveal direction="up" delay={150} className="flex flex-wrap gap-2 justify-center md:justify-end">
            {['Infrastructure', 'Towers', 'Amenities', 'Entrance'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveGalleryFilter(cat as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${activeGalleryFilter === cat
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <ScrollReveal key={item.id} direction="pop" delay={(idx % 3) * 100}>
              <div
                onClick={() => setLightboxImage(item)}
                className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 cursor-pointer h-72"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="bg-[#7b002c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow border border-white/20">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <h4 className="font-serif font-bold text-base group-hover:text-amber-300 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-slate-300 line-clamp-2 leading-snug">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Full-Screen Lightbox Modal */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-[1000] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 space-y-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{lightboxImage?.category}</span>
                  <h3 className="font-serif font-bold text-xl text-white">{lightboxImage?.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="h-[450px] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={lightboxImage?.imageUrl}
                  alt={lightboxImage?.title || 'Gallery Preview'}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {lightboxImage?.description && (
                <p className="text-slate-300 text-xs leading-relaxed pt-1">
                  {lightboxImage?.description}
                </p>
              )}
            </div>
          </div>
        )}

      </section>

      {/* ========================================================= */}
      {/* SECTION 15.7 — DISCOVER FAISALTOWN (5-Counter Stats)      */}
      {/* ========================================================= */}
      <section className="bg-white py-16 lg:py-20 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">

          {/* Top Centered Section Label with Underline */}
          <ScrollReveal direction="up" delay={50}>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-800 border-b-2 border-slate-900 pb-1.5 inline-block">
              DISCOVER FAISALTOWN
            </span>
          </ScrollReveal>

          {/* Stats Grid - Converted to Clean Horizontal Block in Mobile View */}
          <div className="space-y-6 sm:space-y-12">

            {/* Top Row: 3 Stats Block */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 sm:gap-8 items-center justify-center">

              {/* Stat 1: 60k Total Area */}
              <ScrollReveal direction="up" delay={150}>
                <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2 group">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 text-[#7b002c] flex items-center justify-center">
                    <Maximize2 className="w-5 h-5 sm:w-7 sm:h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-2xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    <CountUpNumber end={60} suffix="k" duration={2200} />
                  </div>
                  <div className="text-[8px] sm:text-[11px] font-bold text-slate-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase max-w-[140px] leading-tight">
                    MILLION SQM AREA
                  </div>
                </div>
              </ScrollReveal>

              {/* Stat 2: 8 Total Projects */}
              <ScrollReveal direction="up" delay={250}>
                <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2 group">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 text-[#7b002c] flex items-center justify-center">
                    <Building2 className="w-5 h-5 sm:w-7 sm:h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-2xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    <CountUpNumber end={8} suffix="" duration={1800} />
                  </div>
                  <div className="text-[8px] sm:text-[11px] font-bold text-slate-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase max-w-[140px] leading-tight">
                    TOTAL PROJECTS
                  </div>
                </div>
              </ScrollReveal>

              {/* Stat 3: 130k Total Residential Units */}
              <ScrollReveal direction="up" delay={350}>
                <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2 group">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 text-[#7b002c] flex items-center justify-center">
                    <Home className="w-5 h-5 sm:w-7 sm:h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-2xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    <CountUpNumber end={130} suffix="k" duration={2200} />
                  </div>
                  <div className="text-[8px] sm:text-[11px] font-bold text-slate-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase max-w-[160px] leading-tight">
                    RESIDENTIAL UNITS
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* Bottom Row: 2 Centered Stats Block */}
            <div className="grid grid-cols-2 max-w-2xl mx-auto gap-2 sm:gap-8 items-center justify-center">

              {/* Stat 4: 60k Commercial Units */}
              <ScrollReveal direction="up" delay={450}>
                <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2 group">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 text-[#7b002c] flex items-center justify-center">
                    <Store className="w-5 h-5 sm:w-7 sm:h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-2xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    <CountUpNumber end={60} suffix="k" duration={2200} />
                  </div>
                  <div className="text-[8px] sm:text-[11px] font-bold text-slate-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase max-w-[160px] leading-tight">
                    COMMERCIAL UNITS
                  </div>
                </div>
              </ScrollReveal>

              {/* Stat 5: 1.5M Total Population Capacity */}
              <ScrollReveal direction="up" delay={550}>
                <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2 group">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 text-[#7b002c] flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-7 sm:h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-2xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                    <CountUpNumber end={1.5} suffix="M" decimals={1} duration={2400} />
                  </div>
                  <div className="text-[8px] sm:text-[11px] font-bold text-slate-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase max-w-[180px] leading-tight">
                    POPULATION CAPACITY
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 16 — BLOG                                         */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-10 border-t border-slate-200 pt-16">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-center lg:text-left">
          <ScrollReveal direction="up" delay={50} className="space-y-2 max-w-2xl text-center lg:text-left mx-auto lg:mx-0">

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight text-center lg:text-left">
              Our Latest Articles and News for You
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-center lg:text-left">
              Stay updated with our latest articles and news covering insights, updates, and developments related to Faisal Hills.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} className="flex justify-center lg:justify-end">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-md transition-all hover:scale-105 shrink-0"
            >
              <span>View Blogs</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Blog Cards - 1 Blog in Mobile, 3 in Desktop */}
        <div>
          {/* Mobile View: 1 Single Blog Post */}
          <div className="block md:hidden">
            {[
              {
                title: "Faisal Hills Plots on Installments: Complete Bank Transfer Guide from Saudi Arabia to Pakistan",
                desc: "For thousands of overseas Pakistanis working in the Gulf, owning land back home is more accessible than ever with secure bank transfer options...",
                tag: "Saudi Arabia Guide",
                img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
                href: "/blogs/faisal-hills-plots-installments-bank-transfer-guide-saudi-arabia-pakistan"
              }
            ].map((blog, idx) => (
              <ScrollReveal key={idx} direction="up" delay={100}>
                <Link href={blog.href} className="group flex flex-col space-y-3 cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 aspect-[16/10] bg-slate-100">
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#7b002c] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                      {blog.tag}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 font-sans">
                      {blog.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Desktop View: All 3 Blog Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Faisal Hills Plots on Installments: Complete Bank Transfer Guide from Saudi Arabia to Pakistan",
                desc: "For thousands of overseas Pakistanis working in the Gulf, owning land back home is more accessible than ever with secure bank transfer options...",
                tag: "Saudi Arabia Guide",
                img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
                href: "/blogs/faisal-hills-plots-installments-bank-transfer-guide-saudi-arabia-pakistan"
              },
              {
                title: "Faisal Hills Residential & Commercial Plots for Sale — Buyer Checklist for Riyadh, Jeddah & Dammam",
                desc: "For thousands of Pakistanis working in Riyadh, Jeddah, and Dammam, owning a piece of land requires a structured verification process...",
                tag: "Buyer Checklist",
                img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
                href: "/blogs/faisal-hills-residential-commercial-plots-sale-buyer-checklist-riyadh-jeddah-dammam"
              },
              {
                title: "Faisal Hills NOC Verification Guide for Saudi Pakistanis Plot Buying",
                desc: "Buying property in Pakistan while living thousands of miles away in Riyadh, Jeddah, or Dammam demands verifiable regulatory clearances...",
                tag: "NOC Verification",
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                href: "/blogs/faisal-hills-noc-verification-guide-saudi-pakistanis-plot-buying"
              },
            ].map((blog, idx) => (
              <ScrollReveal key={idx} direction="right" delay={idx * 120}>
                <Link href={blog.href} className="group flex flex-col space-y-4 cursor-pointer h-full">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 aspect-[16/10] bg-slate-100">
                    <img

                      src={blog.img}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#7b002c] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                      {blog.tag}
                    </div>
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#7b002c] transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-sans">
                      {blog.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 17 — FAQS                                         */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          <div className="lg:col-span-4 space-y-3 relative lg:sticky lg:top-28 text-center lg:text-left">
            <ScrollReveal direction="right" delay={50}>
              <span className="label-caps text-[#7b002c] font-bold block mb-1 text-center lg:text-left">FAQ's</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#7b002c] tracking-tight leading-[1.15] uppercase text-center lg:text-left">
                Frequently Asked Questions (FAQs)
              </h2>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-8 space-y-0 border-t border-slate-900/80">
            {seoFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <ScrollReveal key={index} direction="up" delay={(index % 4) * 60}>
                  <div className="border-b border-slate-900/80">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors"
                    >
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#7b002c] hover:text-[#9e1245] uppercase tracking-wider pr-4 leading-snug">
                        {faq.q}
                      </h3>
                      <ChevronDown
                        className={`w-4 h-4 text-[#7b002c] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pr-6 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 18 — FINAL CTA                                    */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-6" id="contact-section">
        <ScrollReveal direction="pop" delay={100}>
          <div className="rounded-3xl bg-slate-100 text-[#7b002c] p-10 lg:p-14 border border-slate-200 shadow-lg flex flex-col items-center justify-center text-center space-y-6">

            <div className="space-y-3 max-w-2xl">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#7b002c]">
                Ready to Secure Your Plot in Faisal Hills?
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Connect directly with our authorized sales desk to choose your desired sector, inspect plot availability, or schedule a physical on-site visit.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="tel:+923313339997"
                className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call Now</span>
              </a>

              <a
                href="https://wa.me/923044811717?text=Hi%2C%20I%20am%20ready%20to%20secure%20my%20plot%20in%20Faisal%20Hills."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span>Book a Site Visit</span>
              </button>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* Booking Lead Modal */}
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />

      {/* Map Download Lead Form Modal */}
      <MapDownloadModal isOpen={isMapDownloadModalOpen} onClose={() => setIsMapDownloadModalOpen(false)} />

      {/* Payment Plan Lightbox & Lead-Gated Download Modal */}
      <PaymentPlanModal
        isLightboxOpen={isPaymentPlanLightboxOpen}
        onCloseLightbox={() => setIsPaymentPlanLightboxOpen(false)}
        isDownloadOpen={isPaymentPlanDownloadOpen}
        onCloseDownload={() => setIsPaymentPlanDownloadOpen(false)}
        onOpenDownload={() => setIsPaymentPlanDownloadOpen(true)}
        imageSrc="/images/faisal-hill-payment-plan.jpg"
      />

      {/* Floating Luxury Quick Contact Widget (As in reference screenshot) */}
      <div className="fixed bottom-6 right-6 z-[990] flex items-center gap-3">
        <a
          href="https://wa.me/923044811717?text=Hi%2C%20I%20am%20interested%20in%20Faisal%20Hills."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30 cursor-pointer"
          aria-label="WhatsApp"
        >
          <Phone className="w-5 h-5 text-white" />
        </a>
      </div>

    </div>
  );
}
