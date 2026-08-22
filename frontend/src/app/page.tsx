'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2, ShieldCheck, MapPin, Search, ArrowRight, CheckCircle2,
  Sparkles, TrendingUp, Trees, Landmark, Layers, HelpCircle, MessageSquare, PhoneCall, Award, Calculator, Clock, ChevronRight, ChevronDown, Waves, Utensils, Car, Lock, Compass, Check, FileText, Camera, Maximize2, Image as ImageIcon,
  Trophy, GraduationCap, ShoppingBag, ArrowUpRight, BookOpen, Store, Home, Users, Star, Quote, HeartHandshake, BadgeCheck, Phone
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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'developed' | 'rising' | 'upcoming'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isMapDownloadModalOpen, setIsMapDownloadModalOpen] = useState(false);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryData);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<'All' | 'Infrastructure' | 'Towers' | 'Amenities' | 'Entrance'>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const filteredGallery = useMemo(() => {
    if (activeGalleryFilter === 'All') return galleryItems;
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
      a: "Faisal Hills Islamabad is developed by Zedem International under the visionary leadership of Chaudhry Abdul Majeed. Zedem International is one of Pakistan's most respected real estate developers with an outstanding track record including Faisal Town Phase 1, Faisal Town Phase 2, Faisal Residencia, Faisal Heights, and the 27-story Faisal Jewels skyscraper."
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
      {/* SECTION 1 — HERO (Strictly single H1 on entire page)      */}
      {/* ========================================================= */}
      <section className="relative bg-[#091522] text-white overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-0">

        {/* Single HD Background Image for Hero */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('/images/faisalhillarc.jpg')" }}
        />

        {/* Contrast Tint for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-950/60" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">

            {/* ONLY ONE H1 ON THE ENTIRE PAGE */}
            <ScrollReveal direction="up" delay={50}>
              <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-white drop-shadow-xl">
                Faisal Hills Islamabad
              </h1>
            </ScrollReveal>

            {/* Exact Spec Paragraph */}
            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-100 text-base sm:text-lg font-normal max-w-xl leading-relaxed drop-shadow-md">
                A premium CDA-approved housing society on GT Road, offering residential and commercial plots with flexible payment plans and outstanding investment returns. Your future begins here.
              </p>
            </ScrollReveal>

            {/* Block Tabs (Buttons/Links - Not Headings) */}
            <ScrollReveal direction="up" delay={250}>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {[
                  { name: 'Prime Block', href: '/blocks/prime-block' },
                  { name: 'Executive Block', href: '/blocks/executive-block' },
                  { name: 'Faisal Jewels', href: '/blocks/faisal-jewel-islamabad' },
                  { name: 'Block A', href: '/blocks/block-a' },
                ].map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className="px-4 py-2 bg-[#7b002c]/90 hover:bg-[#9e1245] backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 transition-all hover:scale-105 shadow-md flex items-center gap-1.5"
                  >
                    <span>{tab.name}</span>
                  </Link>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA Buttons: Call Now · Chat Now · Get a Property Now */}
            <ScrollReveal direction="up" delay={350}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="tel:+923313339997"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/923044811717?text=Hi%2C%20I%20am%20interested%20in%20Faisal%20Hills%20plot%20booking%20and%20pricing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Chat Now</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-[#7b002c] text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-[#7b002c]" />
                  <span>Get a Property Now</span>
                </button>
              </div>
            </ScrollReveal>

          </div>

          {/* Hero Right Lead Form Details - Seamless without background */}
          <ScrollReveal direction="left" delay={200} duration={800} className="lg:col-span-5 relative w-full">
            <div className="space-y-4 text-white">

              <div className="border-b border-white/20 pb-3">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">Official Inquiries</span>
                <span className="font-serif font-bold text-2xl text-white block mt-0.5 drop-shadow-md">
                  Book Your Plot / Flat
                </span>
                <p className="text-xs text-slate-200 mt-1 font-medium drop-shadow-xs">Get official pricing, payment plan & plot selection guide.</p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-950/80 border border-emerald-400 text-emerald-100 p-6 rounded-2xl text-xs font-bold space-y-2 animate-fadeIn text-center shadow-2xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-serif text-emerald-200">Inquiry Submitted Successfully!</h4>
                  <p className="font-normal text-emerald-300">Our Faisal Hills sales executive will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleHeroFormSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/30 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-400 transition-all shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">Email / Phone</label>
                      <input
                        type="text"
                        required
                        placeholder="Email or WhatsApp"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-white/30 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-400 transition-all shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">Location / City</label>
                      <input
                        type="text"
                        placeholder="e.g. Islamabad, Riyadh, UAE"
                        value={leadLocation}
                        onChange={(e) => setLeadLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-white/30 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-400 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">Preferred Plot</label>
                    <select
                      value={leadPreferredPlot}
                      onChange={(e) => setLeadPreferredPlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/30 rounded-xl text-xs text-white focus:outline-none focus:border-rose-400 transition-all shadow-inner cursor-pointer"
                    >
                      <option value="5 Marla Residential">5 Marla Residential Plot</option>
                      <option value="8 Marla Residential">8 Marla Residential Plot</option>
                      <option value="10 Marla Residential">10 Marla Residential Plot</option>
                      <option value="1 Kanal Residential">1 Kanal Luxury Plot</option>
                      <option value="Commercial Plot (2/4/8 Marla)">Commercial Boulevard Plot</option>
                      <option value="Faisal Jewels Luxury Apartment">Faisal Jewels Apartment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">Any Query</label>
                    <textarea
                      rows={2}
                      placeholder="Any specific requirement or question..."
                      value={leadQuery}
                      onChange={(e) => setLeadQuery(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/30 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-400 transition-all resize-none shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-white/20 cursor-pointer"
                  >
                    Submit Booking Inquiry
                  </button>
                </form>
              )}

            </div>
          </ScrollReveal>

        </div>

        {/* ========================================================= */}
        {/* SECTION 2 — STATS BAR (No heading, 5 counter cards)       */}
        {/* ========================================================= */}
        <div className="mt-6 sm:mt-8 bg-white border-t border-slate-200/80 py-4 sm:py-5 shadow-xs relative z-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center text-center">
            
            {/* Stat 1: 5k+ Plots */}
            <ScrollReveal direction="up" delay={50}>
              <div className="flex flex-col items-center justify-center space-y-0.5 group">
                <div className="font-sans text-3xl sm:text-4xl font-extrabold text-[#7b002c] tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={5} suffix="k+" duration={1800} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide uppercase">
                  Plots
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 2: 4 Phases */}
            <ScrollReveal direction="up" delay={150}>
              <div className="flex flex-col items-center justify-center space-y-0.5 group">
                <div className="font-sans text-3xl sm:text-4xl font-extrabold text-[#7b002c] tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={4} suffix="" duration={1600} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide uppercase">
                  Phases
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 3: 12+ Years */}
            <ScrollReveal direction="up" delay={250}>
              <div className="flex flex-col items-center justify-center space-y-0.5 group">
                <div className="font-sans text-3xl sm:text-4xl font-extrabold text-[#7b002c] tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={12} suffix="+" duration={1800} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide uppercase">
                  Years
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 4: 100% Legal */}
            <ScrollReveal direction="up" delay={350}>
              <div className="flex flex-col items-center justify-center space-y-0.5 group">
                <div className="font-sans text-3xl sm:text-4xl font-extrabold text-[#7b002c] tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={100} suffix="%" duration={2000} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide uppercase">
                  Legal
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 5: 30+ Amenities */}
            <ScrollReveal direction="up" delay={450}>
              <div className="flex flex-col items-center justify-center space-y-0.5 group col-span-2 md:col-span-1">
                <div className="font-sans text-3xl sm:text-4xl font-extrabold text-[#7b002c] tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={30} suffix="+" duration={1800} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide uppercase">
                  Amenities
                </span>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Slogan Moving Marquee Ribbon - Single Line Slogan without borders */}
      <div className="bg-white py-2 overflow-hidden select-none">
        <div className="ticker-track gap-12 items-center text-xs sm:text-sm font-serif font-bold tracking-[0.25em] text-[#7b002c] uppercase whitespace-nowrap">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12 shrink-0">
              <span className="font-serif">Building Tomorrow Together</span>
              <span className="text-slate-300 font-sans">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 3 — ABOUT                                         */}
      {/* ========================================================= */}
      <section className="bg-white pt-8 pb-12 lg:pt-10 lg:pb-16 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column: Chairman & Founder Header + Eyebrow + H2 + Exact Spec Paragraph */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-1 mb-2">
                <span className="label-caps text-[#7b002c] font-bold block">About Faisal Hills</span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#7b002c] tracking-tight">
                  Chairman & Founder — Chaudhry Abdul Majeed
                </h1>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Introducing Faisal Hills Islamabad — A Community Built for Pakistan's Future
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
                Faisal Hills Islamabad, developed by Zedem International, is a thoughtfully planned gated community located in Taxila along the historic GT Road. With the scenic Margalla Hills as its backdrop, it offers easy access to Islamabad and Rawalpindi. Combining modern living, strong connectivity, legal development, and attractive investment potential, Faisal Hills is an ideal choice for both homebuyers and investors.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <div className="pt-2">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-1 transition-all group"
                >
                  <span>Discover More About Zedem International</span>
                  <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Image with exact ALT text */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-end">
            <ScrollReveal direction="left" delay={200} duration={800}>
              <img
                src="/chaudhry-abdul-majeed.png"
                alt="Faisal Hills Islamabad growth lifestyle and property potential"
                className="w-full max-w-[400px] h-auto object-contain"
              />
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4 — OUR PROJECTS (Static Clean Alignment)         */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-10 sm:py-12 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 text-center space-y-6">

          <ScrollReveal direction="up" delay={50}>
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Portfolio & Track Record</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#7b002c] tracking-tight">
              Our Projects by Zedem International
            </h2>
          </ScrollReveal>

          {/* Static Clean Grid of Projects without moving animation */}
          <ScrollReveal direction="up" delay={150}>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-1 max-w-5xl mx-auto">
              {[
                { name: 'Faisal Town Phase 1', href: '/about-us' },
                { name: 'Faisal Town Phase 2', href: '/about-us' },
                { name: 'Faisal Hills', href: '/faisal-hills-blocks' },
                { name: 'Faisal Residencia', href: '/about-us' },
                { name: 'Faisal Heights', href: '/about-us' },
                { name: 'Faisal Jewels', href: '/blocks/faisal-jewel-islamabad' },
              ].map((proj, idx) => (
                <Link
                  key={idx}
                  href={proj.href}
                  className="bg-white border border-slate-200/90 hover:border-[#7b002c] rounded-full px-4 sm:px-5 py-2 sm:py-2.5 shadow-xs hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer hover:scale-105"
                >
                  <Building2 className="w-4 h-4 text-[#7b002c]" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#7b002c] transition-colors whitespace-nowrap">
                    {proj.name}
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4.5 — FLAGSHIP SPECIAL FEATURE: FAISAL JEWEL      */}
      {/* ========================================================= */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Image */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <ScrollReveal direction="right" delay={100} duration={800}>
                <Link
                  href="/blocks/faisal-jewel-islamabad"
                  className="relative w-full h-[340px] sm:h-[420px] lg:h-[480px] block group cursor-pointer overflow-hidden rounded-2xl shadow-md"
                >
                  <img
                    src="/images/imgi_175_faisal-jewel.jpg"
                    alt="Faisal Jewel 27-Story Five-Star Hotel"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </Link>
              </ScrollReveal>
            </div>

            {/* Right Column: Text & CTA */}
            <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
              <ScrollReveal direction="up" delay={50}>
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight">
                    Faisal Jewel
                  </h2>
                  <p className="font-serif text-base sm:text-lg text-slate-500 font-light mt-1.5">
                    27-Story Five-Star Hotel
                  </p>
                  <div className="w-16 h-[2px] bg-[#7b002c] mt-4 mb-6" />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={150}>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  The 27-story Faisal Jewel introduces five-star hotel amenities within Faisal Hills. Recently partnered with Hilton Hotels, this landmark will attract local and international visitors, especially those exploring the religious and cultural heritage of Sikhism, Buddhism, and Islam.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={250}>
                <p className="text-slate-500 text-xs sm:text-sm italic leading-relaxed font-sans">
                  With its iconic design and strategic location, Faisal Jewel acts as a gateway to Northern Pakistan's tourism corridor, elevating Faisal Hills to a destination of global repute.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={350}>
                <div className="pt-4">
                  <Link
                    href="/blocks/faisal-jewel-islamabad"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-900 hover:text-[#7b002c] border-b border-slate-900 hover:border-[#7b002c] pb-0.5 transition-all group"
                  >
                    <span>Explore Faisal Jewel</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5 — OFFICIAL MASTER PLAN MAP BLUEPRINT            */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <ScrollReveal direction="up" delay={50}>
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Official Society Blueprint</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c]">
              Faisal Hills Master Plan Map
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Inspect plot dimensions, street layouts, and sector avenues with deep zoom controls up to 1200%.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsMapDownloadModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3 rounded-xl border border-[#7b002c] shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>Download Master Plan (PDF)</span>
            </button>

            <Link
              href="/master-plan"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] bg-white hover:bg-slate-100 px-5 py-3 rounded-xl border border-slate-300 shadow-sm transition-all duration-300 hover:scale-105"
            >
              <span>Launch Fullscreen Map</span>
              <ArrowRight className="w-4 h-4 text-[#7b002c]" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="mt-6">
          <MasterPlanViewer />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6 — BLOCKS & SECTORS EXPLORER (TABBED & GRID)     */}
      {/* ========================================================= */}
      <section id="blocks-section" className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8 py-12 lg:py-16">

        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <ScrollReveal direction="up" delay={50} className="space-y-1">
            <span className="label-caps text-[#7b002c] font-bold block">Explore All Sectors</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c]">
              Faisal Hills Blocks & Commercial Projects
            </h2>
          </ScrollReveal>

          {/* Tabs - Compact Single Inline Row */}
          <ScrollReveal direction="up" delay={150}>
            <div className="inline-flex items-center flex-nowrap bg-slate-200/80 p-1 rounded-xl gap-1 whitespace-nowrap">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  activeTab === 'all' ? 'bg-[#7b002c] text-white shadow-xs' : 'text-slate-700 hover:text-[#7b002c]'
                }`}
              >
                All Projects ({blocks.length})
              </button>
              <button
                onClick={() => setActiveTab('developed')}
                className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  activeTab === 'developed' ? 'bg-[#7b002c] text-white shadow-xs' : 'text-slate-700 hover:text-[#7b002c]'
                }`}
              >
                Developed ({developedBlocks.length})
              </button>
              <button
                onClick={() => setActiveTab('rising')}
                className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  activeTab === 'rising' ? 'bg-[#7b002c] text-white shadow-xs' : 'text-slate-700 hover:text-[#7b002c]'
                }`}
              >
                Rising ({risingProjects.length})
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                  activeTab === 'upcoming' ? 'bg-[#7b002c] text-white shadow-xs' : 'text-slate-700 hover:text-[#7b002c]'
                }`}
              >
                Upcoming ({upcomingBlocks.length})
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Sectors & Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlocks.map((block, idx) => (
            <ScrollReveal key={block.id} direction="up" delay={(idx % 3) * 100}>
              <Link
                href={`/blocks/${block.slug}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm card-hover hover-glow-maroon overflow-hidden flex flex-col justify-between group transition-all duration-300 cursor-pointer block text-inherit no-underline h-full"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900 img-zoom-container">
                    <img
                      src={block.heroImage}
                      alt={block.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    <div className="absolute top-4 left-4 bg-[#7b002c] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md border border-white/20">
                      {block.status}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="label-caps text-[9px] text-slate-300 block">{block.subtitle}</span>
                      <h4 className="font-serif font-bold text-2xl group-hover:text-[#7b002c] transition-colors">{block.name}</h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {block.description}
                    </p>

                    <div className="space-y-2 bg-slate-50 p-4 rounded-xl text-xs border border-slate-200/80 group-hover:bg-slate-100/50 group-hover:border-slate-300 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">
                          {block.category === 'commercial_project' ? 'Apartments / Units:' : 'Residential Plot Rates:'}
                        </span>
                        <strong className="text-[#7b002c] font-serif text-sm">{block.priceRange.residential}</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Commercial Rates:</span>
                        <strong className="text-[#7b002c] font-serif text-sm">{block.priceRange.commercial}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Verified: {block.verificationDate}
                  </span>

                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] group-hover:text-[#9e1245] transition-colors"
                  >
                    <span>
                      {block.category === 'commercial_project' ? 'View Project Details' : 'Explore Block Layout'}
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7 — PLOT OFFERINGS & FEATURED READY FOR SALE      */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8 py-4">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <ScrollReveal direction="up" delay={50} className="space-y-2 max-w-2xl">
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Plot Offerings</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c]">
              Explore Our Plot Categories in Faisal Hills Islamabad
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Whether you are planning to build a family home, develop a commercial enterprise, or secure a long-term investment, Faisal Hills Islamabad has a plot designed for your specific goal.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <Link
              href="/plots"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold shadow-md transition-all hover:scale-105 shrink-0"
            >
              <span>Explore All {plots.length}+ Listings</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={100}>
          <h3 className="font-serif text-2xl font-bold text-slate-900 border-l-4 border-[#7b002c] pl-3">
            Residential Plots — Build Your Dream Home
          </h3>
        </ScrollReveal>

        {/* 4 Plot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plots.slice(0, 4).map((plot, idx) => (
            <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 100}>
              <Link
                href={`/plots/${plot.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm card-hover hover-glow-maroon overflow-hidden flex flex-col justify-between group transition-all duration-300 cursor-pointer block text-inherit no-underline h-full"
              >
                <div>
                  {/* Image Banner Container */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900 img-zoom-container">
                    <img
                      src={plot.image}
                      alt={plot.plotNumber}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow bg-[#7b002c] text-white border border-white/20`}>
                        {plot.category === 'Apartment' ? 'Luxury Flat' : plot.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-[#7b002c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow border border-white/20">
                        {plot.status}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="label-caps text-[9px] text-slate-300 block">{plot.blockName}</span>
                      <h4 className="font-serif font-bold text-xl group-hover:text-slate-200 transition-colors">#{plot.plotNumber}</h4>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Property Type:</span>
                        <strong className="text-slate-900 font-semibold">{plot.size}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Dimensions:</span>
                        <strong className="text-slate-900 font-semibold">{plot.dimensions}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Orientation:</span>
                        <strong className="text-slate-900 font-semibold">{plot.facing}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Demand Price</span>
                    <span className="font-serif font-bold text-lg text-[#7b002c]">{plot.priceFormatted}</span>
                  </div>

                  <span className="px-3.5 py-2 bg-[#7b002c] group-hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all duration-300 group-hover:scale-105 shadow flex items-center gap-1">
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 8 — WHY CHOOSE US (6 Pillars)                     */}
      {/* ========================================================= */}
      <section className="bg-white py-16 px-6 lg:px-12 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-10">

          <div className="max-w-3xl space-y-3">
            <ScrollReveal direction="up" delay={50}>
              <span className="label-caps text-[#7b002c] font-bold block mb-1">Why Choose Us?</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c]">
                Why Thousands of Investors Choose Faisal Hills
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                With dozens of housing societies competing for attention across the Islamabad–Rawalpindi belt, choosing where to invest your life savings requires more than a brochure. Here is why discerning buyers consistently choose Faisal Hills Islamabad over every alternative:
              </p>
            </ScrollReveal>
          </div>

          {/* 6 H3 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Verified Legal Standing',
                desc: 'Faisal Hills holds its CDA approval and all relevant NOC documentation in order — a non-negotiable for any serious investor. In an era of unverified schemes, this single fact separates Faisal Hills from the crowd. Every plot sold here comes with a clear title and documented legal standing.',
                icon: ShieldCheck
              },
              {
                title: 'A Developer You Can Trust',
                desc: 'Zedem International has been active in Pakistan\'s real estate sector for over a decade. Their track record includes delivering projects on schedule, maintaining transparent communication with buyers, and upholding commitments made at the time of booking. In a market where developer reputation is everything, Zedem\'s credibility speaks for itself.',
                icon: Award
              },
              {
                title: 'Unbeatable Location Advantage',
                desc: 'Positioned directly on GT Road, Faisal Hills enjoys connectivity that most societies can only aspire to. The Islamabad Expressway, M-1 Motorway interchange, and Taxila city centre are all within easy reach, making daily commuting effortless and the society\'s long-term appreciation all but guaranteed.',
                icon: Compass
              },
              {
                title: 'Flexible Payment Plans',
                desc: 'Not everyone can afford a lump-sum property purchase — and Faisal Hills understands that. The society offers structured instalment plans that spread your investment over manageable timelines, allowing salaried professionals, business owners, and overseas Pakistanis to enter the market without financial strain.',
                icon: Calculator
              },
              {
                title: 'Master-Planned Infrastructure',
                desc: 'Wide carpeted roads, underground utilities, a dedicated parks and green spaces network, a commercial hub, educational institutions, and healthcare facilities — Faisal Hills is designed with the complete lifestyle in mind, not just the property boundary.',
                icon: Landmark
              },
              {
                title: 'Proven Investment Returns',
                desc: 'Property prices in Faisal Hills have appreciated significantly since the society\'s launch. Early investors have already seen substantial capital gains, and analysts continue to project upward momentum as infrastructure development accelerates and more facilities come online in 2026 and beyond.',
                icon: TrendingUp
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 80}>
                  <div className="bg-slate-50 p-7 rounded-2xl border border-slate-200 hover:border-[#7b002c] shadow-sm hover:shadow-lg transition-all space-y-4 h-full flex flex-col justify-start">
                    <div className="w-12 h-12 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center border border-[#7b002c]/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9 — LOCATION & CONNECTIVITY                       */}
      {/* ========================================================= */}
      <section className="bg-slate-50 text-slate-900 py-16 px-6 lg:px-12 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          <ScrollReveal direction="right" className="lg:col-span-6 space-y-4">
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Location & Connectivity</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              Faisal Hills Islamabad — A Location That Sets It Apart
            </h2>
            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
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

            <div className="pt-2">
              <Link
                href="/master-plan"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-1 transition-all"
              >
                <span>Explore Complete Location Map & Sector Boundaries</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Location Distance Matrix Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              { title: 'Taxila Museum Circle', subtitle: 'Historical & Cultural Center', time: '5 Mins Drive', icon: Landmark },
              { title: 'CPEC / M-1 Motorway', subtitle: 'Direct Highway Access', time: '10 Mins Drive', icon: Compass },
              { title: 'Islamabad Airport', subtitle: 'International Terminal', time: '15 Mins Drive', icon: Building2 },
              { title: 'Zero Point & Blue Area', subtitle: 'Capital Business District', time: '20 Mins Drive', icon: TrendingUp },
            ].map((loc, idx) => {
              const Icon = loc.icon;
              return (
                <ScrollReveal key={idx} direction="left" delay={idx * 100}>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center shrink-0 border border-[#7b002c]/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block font-serif font-bold text-sm leading-tight">
                          {loc.title}
                        </strong>
                        <span className="text-slate-500 text-[11px] block mt-0.5">
                          {loc.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="bg-[#7b002c] text-white font-bold px-3 py-1 rounded-full text-[11px] shadow-sm shrink-0 whitespace-nowrap">
                      {loc.time}
                    </span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10 — PAYMENT PLAN 2026                            */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <ScrollReveal direction="up" delay={50} className="max-w-2xl space-y-2">
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Payment Plan 2026</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c]">
              Flexible Payments, Transparent Pricing
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              One of the most frequently asked questions we receive is about the Faisal Hills Islamabad payment plan — and for good reason. Property investment is a significant financial commitment, and knowing exactly what you owe, when you owe it, and what you get in return is fundamental to making a confident decision.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <Link href="/payment-plan" className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] bg-white hover:bg-slate-100 px-5 py-3 rounded-xl border border-slate-300 shadow-sm transition">
              <Calculator className="w-4 h-4 text-[#7b002c]" />
              <span>Open Custom Calculator</span>
            </Link>
          </ScrollReveal>
        </div>

        {/* 4 H3 Pillars: How the Payment Plan Works */}
        <div className="space-y-4">
          <strong className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
            How the Payment Plan Works
          </strong>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Booking Amount', desc: 'A percentage of total plot value is paid at the time of booking to secure your specific plot and block.' },
              { title: 'Down Payment', desc: 'A further tranche paid within 30–60 days of booking to confirm the allocation.' },
              { title: 'Easy Instalments', desc: 'The remaining balance is spread across quarterly or bi-annual instalments over a period of 2–4 years, depending on the selected plan.' },
              { title: 'No Frills', desc: 'All applicable fees (development charges, transfer fees) are disclosed upfront at the time of booking.' },
            ].map((pill, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 80}>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 h-full">
                  <h3 className="font-serif font-bold text-base text-[#7b002c]">
                    {pill.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pill.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Schedule Table */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Block Sector</th>
                    <th className="p-4">Plot Size</th>
                    <th className="p-4">Total Price</th>
                    <th className="p-4">20% Booking Down Payment</th>
                    <th className="p-4">Monthly Installment</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {paymentPlansData.map((plan) => (
                    <tr key={plan.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c] font-serif text-sm">{plan.blockName}</td>
                      <td className="p-4 font-semibold">{plan.plotSize}</td>
                      <td className="p-4 font-bold text-slate-900">PKR {(plan.totalPrice / 100000).toFixed(1)} Lacs</td>
                      <td className="p-4 text-[#7b002c] font-bold">PKR {(plan.downPayment / 100000).toFixed(2)} Lacs</td>
                      <td className="p-4 font-semibold text-slate-700">PKR {plan.monthlyInstallment.toLocaleString()} / mo</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setIsLeadModalOpen(true)}
                          className="px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
                        >
                          Book Schedule
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      <section className="bg-white py-16 px-6 lg:px-12 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-10">

          <div className="max-w-3xl space-y-3">
            <ScrollReveal direction="up" delay={50}>
              <span className="label-caps text-[#7b002c] font-bold block mb-1">Investment Benefits</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c]">
                Why Faisal Hills Is One of Pakistan's Smartest Property Investments
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A great housing society is more than land and roads. It is the infrastructure around your property that determines your daily quality of life. Faisal Hills Islamabad has been master-planned to deliver a comprehensive lifestyle ecosystem — everything you need, within the community you call home.
              </p>
            </ScrollReveal>
          </div>

          {/* 6 H3 Investment Benefit Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            ].map((benefit, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 80}>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-[#7b002c] shadow-xs space-y-3 h-full">
                  <div className="flex items-center gap-2 text-[#7b002c]">
                    <CheckCircle2 className="w-5 h-5" />
                    <h3 className="font-serif font-bold text-lg text-slate-900">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {benefit.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 13 — AMENITIES & LIFESTYLE                        */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-10">

        <div className="max-w-3xl space-y-3">
          <ScrollReveal direction="up" delay={50}>
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Amenities & Lifestyle</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c]">
              Amenities Designed for Modern Living
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A great housing society is more than land and roads. It is the infrastructure around your property that determines your daily quality of life. Faisal Hills Islamabad has been master-planned to deliver a comprehensive lifestyle ecosystem — everything you need, within the community you call home.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 H3 Amenity Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Connectivity & Infrastructure',
              bullets: ['Wide carpeted boulevards and road network', 'Underground electricity, gas, and water supply', 'State-of-the-art boundary wall and main gate']
            },
            {
              title: 'Community & Recreation',
              bullets: ['Central park and community gardens', 'Dedicated jogging and cycling tracks', 'Community centre and function hall']
            },
            {
              title: 'Education & Healthcare',
              bullets: ['Site reserved for school and college campus', 'Planned healthcare facility and pharmacy zone', 'Close proximity to Taxila\'s existing medical infrastructure']
            },
            {
              title: 'Commercial & Retail',
              bullets: ['Commercial hub along main boulevard', 'Retail strip and marketplace for daily needs', 'Dedicated food street concept under planning']
            },
            {
              title: 'Security & Management',
              bullets: ['24/7 gated community security', 'CCTV surveillance on main arteries', 'Trained security personnel at all entry points', 'Professional society management company']
            },
            {
              title: 'Premium Amenities',
              bullets: ['Wide carpeted boulevards and modern road infrastructure', 'Underground electricity, gas, and water supply', 'Central park, jogging tracks, and recreational spaces']
            },
          ].map((cat, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 80}>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 h-full">
                <h3 className="font-serif font-bold text-lg text-[#7b002c] border-b border-slate-100 pb-2">
                  {cat.title}
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 font-sans">
                  {cat.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 14 — TESTIMONIALS                                 */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-16 px-6 lg:px-12 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-10">

          <div className="max-w-3xl space-y-3">
            <ScrollReveal direction="up" delay={50}>
              <span className="label-caps text-[#7b002c] font-bold block mb-1">Testimonials</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c]">
                What Our Investors Say About Faisal Hills
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A great housing society is more than land and roads. It is the infrastructure around your property that determines your daily quality of life. Faisal Hills Islamabad has been master-planned to deliver a comprehensive lifestyle ecosystem — everything you need, within the community you call home.
              </p>
            </ScrollReveal>
          </div>

          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "I have invested in three housing societies in the Islamabad belt, and Faisal Hills stands out for one simple reason: they do exactly what they promise. The payment schedule was followed precisely, the development is visible and progressing, and my plot has already appreciated well above what I paid. For anyone serious about Islamabad real estate investment, this is the society I recommend.",
                name: "Muhammad Imran",
                tagline: "Overseas Pakistani (UAE) | 10 Marla Residential Plot"
              },
              {
                quote: "As a first-time property buyer, I was nervous about making the right choice. The Faisal Hills team spent over an hour with me explaining the booking details, the NOC status, and every charge that would apply. There were no surprises. The process was smooth, the documents arrived on time, and I now own a verified, legal plot near Islamabad at a price I can actually afford on a monthly instalment plan.",
                name: "Sana Raza",
                tagline: "Islamabad | 5 Marla Residential Plot"
              },
              {
                quote: "I was looking specifically for commercial plot investment in the Islamabad suburbs — somewhere with GT Road access and a growing residential base that would create organic demand. Faisal Hills ticks every box. The commercial zones are well-placed, the residential sectors are filling up, and I am confident the rental yield on my commercial plot will be excellent once the area fully develops.",
                name: "Tariq Mahmood",
                tagline: "Rawalpindi | 4 Marla Commercial Plot"
              },
            ].map((review, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <Quote className="w-8 h-8 text-[#7b002c]/30" />
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-serif">
                      "{review.quote}"
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-3">
                    <cite className="not-italic block font-bold text-slate-900 text-sm">
                      {review.name}
                    </cite>
                    <span className="text-[11px] text-slate-500 block font-medium mt-0.5">
                      {review.tagline}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 15 — INFRASTRUCTURE & LANDMARKS                   */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-10">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <ScrollReveal direction="up" delay={50} className="space-y-2 max-w-2xl">
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Modern Infrastructure</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c]">
              Infrastructure of Faisal Hills
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Faisal Hills features wide streets and boulevards ranging from 40 to 225 feet, ensuring a spacious, organized, and aesthetically planned layout that meets the highest standards of urban design.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <a
              href="https://wa.me/923044811717?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Faisal%20Hills%20Infrastructure%20and%20Landmarks."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Chat On WhatsApp</span>
            </a>
          </ScrollReveal>
        </div>

        {/* 8 H3 Landmark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {[
            {
              title: 'Hill Walk — A vibrant boulevard inspired by Istiklal Street',
              image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
            },
            {
              title: 'Faisal Hills Arc — Architectural Landmark',
              image: '/images/faisalhillarc.jpg',
            },
            {
              title: 'Faisal Jewel — 27-Storey Five-Star Hotel',
              image: '/images/faisal-jewel.jpg',
            },
            {
              title: 'Sports Arena — Executive Block',
              image: '/images/faisal-park.jpg',
            },
            {
              title: 'Roots International Schools & Colleges, Faisal Hills Campus — Executive Block',
              image: '/images/faisal-roots-school.jpg',
            },
            {
              title: 'Miyawaki Forest — Block C',
              image: '/images/faisal-forest.jpg',
            },
            {
              title: 'Faisal Hills Downtown — Civic Center',
              image: '/images/imgi_5_Rectangle-1-1-scaled-e1766059628733.png',
            },
            {
              title: 'Glow Park — Block A',
              image: '/images/faisal-park.jpg',
            },
          ].map((item, idx) => (
            <ScrollReveal key={idx} direction="pop" delay={(idx % 4) * 80}>
              <div className="group relative rounded-2xl overflow-hidden shadow-md aspect-[4/5] flex flex-col justify-end p-4 border border-slate-200 bg-slate-900 h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10 w-full bg-white/95 backdrop-blur-md rounded-xl p-3 text-center shadow-md">
                  <h3 className="font-serif font-bold text-[#7b002c] text-xs sm:text-sm leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 15.5 — ON-SITE CONSTRUCTION & PHOTO GALLERY       */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8 py-6" id="gallery-section">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <ScrollReveal direction="up" delay={50} className="space-y-2">
            <span className="label-caps text-[#7b002c] font-bold block uppercase tracking-widest text-xs flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#7b002c]" />
              <span>Verified Site Photos</span>
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c]">
              On-Site Construction & Photo Gallery
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Real-time photography of Faisal Hills entrance portals, wide boulevards, Grand Jamia Mosque, and Faisal Jewels skyscraper construction.
            </p>
          </ScrollReveal>

          {/* Filter Buttons */}
          <ScrollReveal direction="up" delay={150} className="flex flex-wrap gap-2">
            {['All', 'Infrastructure', 'Towers', 'Amenities', 'Entrance'].map((cat) => (
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
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{lightboxImage.category}</span>
                  <h3 className="font-serif font-bold text-xl text-white">{lightboxImage.title}</h3>
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
                  src={lightboxImage.imageUrl}
                  alt={lightboxImage.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {lightboxImage.description && (
                <p className="text-slate-300 text-xs leading-relaxed pt-1">
                  {lightboxImage.description}
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

          {/* Stats Grid */}
          <div className="space-y-12">

            {/* Top Row: 3 Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">

              {/* Stat 1: 60k Total Area */}
              <ScrollReveal direction="up" delay={150}>
                <div className="flex flex-col items-center text-center space-y-2 group">
                  <div className="w-10 h-10 text-[#7b002c] flex items-center justify-center">
                    <Maximize2 className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
                    <CountUpNumber end={60} suffix="k" duration={2200} />
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase max-w-[140px] leading-tight">
                    MILLION SQM TOTAL AREA
                  </div>
                </div>
              </ScrollReveal>

              {/* Stat 2: 8 Total Projects */}
              <ScrollReveal direction="up" delay={250}>
                <div className="flex flex-col items-center text-center space-y-2 group">
                  <div className="w-10 h-10 text-[#7b002c] flex items-center justify-center">
                    <Building2 className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
                    <CountUpNumber end={8} suffix="" duration={1800} />
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase max-w-[140px] leading-tight">
                    TOTAL PROJECTS
                  </div>
                </div>
              </ScrollReveal>

              {/* Stat 3: 130k Total Residential Units */}
              <ScrollReveal direction="up" delay={350}>
                <div className="flex flex-col items-center text-center space-y-2 group">
                  <div className="w-10 h-10 text-[#7b002c] flex items-center justify-center">
                    <Home className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
                    <CountUpNumber end={130} suffix="k" duration={2200} />
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase max-w-[160px] leading-tight">
                    TOTAL RESIDENTIAL UNITS
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* Bottom Row: 2 Centered Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-8 items-center justify-center">

              {/* Stat 4: 60k Commercial Units */}
              <ScrollReveal direction="up" delay={450}>
                <div className="flex flex-col items-center text-center space-y-2 group">
                  <div className="w-10 h-10 text-[#7b002c] flex items-center justify-center">
                    <Store className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
                    <CountUpNumber end={60} suffix="k" duration={2200} />
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase max-w-[160px] leading-tight">
                    TOTAL COMMERCIAL UNITS
                  </div>
                </div>
              </ScrollReveal>

              {/* Stat 5: 1.5M Total Population Capacity */}
              <ScrollReveal direction="up" delay={550}>
                <div className="flex flex-col items-center text-center space-y-2 group">
                  <div className="w-10 h-10 text-[#7b002c] flex items-center justify-center">
                    <Users className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-sans text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
                    <CountUpNumber end={1.5} suffix="M" decimals={1} duration={2400} />
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase max-w-[180px] leading-tight">
                    TOTAL POPULATION CAPACITY
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

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <ScrollReveal direction="up" delay={50} className="space-y-2 max-w-2xl">
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Our Recent Blog Posts</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Our Latest Articles and News for You
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Stay updated with our latest articles and news covering insights, updates, and developments related to Faisal Hills.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-md transition-all hover:scale-105 shrink-0"
            >
              <span>View Blogs</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
          </ScrollReveal>
        </div>

        {/* 3 H3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      </section>

      {/* ========================================================= */}
      {/* SECTION 17 — FAQS                                         */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          <div className="lg:col-span-4 space-y-3 relative lg:sticky lg:top-28">
            <ScrollReveal direction="right" delay={50}>
              <span className="label-caps text-[#7b002c] font-bold block mb-1">FAQ's</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#7b002c] tracking-tight leading-[1.15] uppercase">
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

    </div>
  );
}
