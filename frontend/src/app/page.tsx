'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2, ShieldCheck, MapPin, Search, ArrowRight, CheckCircle2,
  Sparkles, TrendingUp, Trees, Landmark, Layers, HelpCircle, MessageSquare, PhoneCall, Award, Calculator, Clock, ChevronRight, ChevronDown, Waves, Utensils, Car, Lock, Compass, Check, FileText, Camera, Maximize2, Image as ImageIcon,
  Trophy, GraduationCap, ShoppingBag, ArrowUpRight, BookOpen, Store, Home, Users
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
  const [selectedBlockFilter, setSelectedBlockFilter] = useState('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'developed' | 'commercial' | 'upcoming'>('developed');
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
  const [societyStatsData, setSocietyStatsData] = useState(societyStats);
  const [verifiedDate, setVerifiedDate] = useState(societyStats.lastVerifiedDate);

  React.useEffect(() => {
    // 1. Initial API loads
    fetchBlocks().then(data => setBlocks(data)).catch(console.error);
    fetchPlots().then(data => setPlots(data)).catch(console.error);
    fetchGallery().then(data => setGalleryItems(data)).catch(console.error);
    fetchSettings().then(data => {
      if (data.society_stats) setSocietyStatsData(data.society_stats);
      if (data.last_verified_date) setVerifiedDate(data.last_verified_date);
    }).catch(console.error);

    // 2. Fallback listeners for compatibility
    const syncGallery = () => {
      fetchGallery().then(data => setGalleryItems(data)).catch(console.error);
    };
    const syncSettings = () => {
      fetchSettings().then(data => {
        if (data.last_verified_date) setVerifiedDate(data.last_verified_date);
      }).catch(console.error);
    };

    window.addEventListener('faisal_gallery_updated', syncGallery);
    window.addEventListener('faisal_verified_date_updated', syncSettings);
    window.addEventListener('faisal_plots_updated', () => {
      fetchPlots().then(data => setPlots(data)).catch(console.error);
    });

    return () => {
      window.removeEventListener('faisal_gallery_updated', syncGallery);
      window.removeEventListener('faisal_verified_date_updated', syncSettings);
    };
  }, []);

  // Hero Booking Form State from user directive
  const [heroFormName, setHeroFormName] = useState('');
  const [heroFormPhone, setHeroFormPhone] = useState('');
  const [heroFormProject, setHeroFormProject] = useState('Faisal Hills Taxila');
  const [heroFormMessage, setHeroFormMessage] = useState('');
  const [heroFormSubmitted, setHeroFormSubmitted] = useState(false);

  const handleHeroFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      name: heroFormName || 'Website Visitor',
      phone: heroFormPhone || 'N/A',
      interest: heroFormProject,
      message: heroFormMessage
    }).then(() => {
      setHeroFormSubmitted(true);
      setTimeout(() => setHeroFormSubmitted(false), 5000);
      setHeroFormName('');
      setHeroFormPhone('');
      setHeroFormMessage('');
    }).catch(err => {
      console.error(err);
      setHeroFormSubmitted(true);
    });
  };

  // Filter blocks by category (Memoized for peak speed)
  const developedBlocks = useMemo(() => blocks.filter(b => b.category === 'developed'), [blocks]);
  const upcomingBlocks = useMemo(() => blocks.filter(b => b.category === 'upcoming'), [blocks]);
  const commercialProjects = useMemo(() => blocks.filter(b => b.category === 'commercial_project'), [blocks]);

  // Faisal Jewels Special Item
  const faisalJewelsData = useMemo(() => blocks.find(b => b.id === 'faisal-jewels'), [blocks]);

  // Rotator effect for hero title: "Faisal Town Group | Jewels" <-> "Faisal Town Group | Faisal Hills"
  const heroTitles = useMemo(() => ['Jewels', 'Faisal Hills'], []);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % heroTitles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [heroTitles]);



  const seoFaqs = [
    {
      q: "1. Is Faisal Hills Islamabad a CDA & RDA approved housing society?",
      a: "Yes. Faisal Hills Islamabad holds official Capital Development Authority (CDA) approval and Rawalpindi Development Authority (RDA) NOC clearance. It possesses clear land titles, verified layout maps, and official NOC documentation required to legally sell residential and commercial plots. Buyers should always request and verify official NOC documentation before booking — our team provides this proactively to every prospective buyer."
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
      a: "The Faisal Hills location is directly on Grand Trunk Road (GT Road, N-5) near Taxila Bypass, nestled against the scenic Margalla Hills. It is approximately 5 minutes from Taxila Bypass, 10 minutes from CPEC M-1 Motorway Interchange, 15 minutes from New Islamabad International Airport, and 25 minutes from Rawalpindi Saddar & Zero Point Islamabad."
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
    <div className="bg-slate-50 min-h-screen text-slate-900 space-y-24 pb-24 font-sans selection:bg-gold-accent selection:text-slate-950">

      {/* 1. HERO SECTION - Ultra-Luxury Glassmorphism & HD Image Slider */}
      <section className="relative bg-[#091522] text-white overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-0">

        {/* Single HD Background Image for Hero */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('/images/faisalhillarc.jpg')" }}
        />

        {/* Subtle Transparent Tint for Readable Text & Crystal Clear HD Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/45 via-slate-950/25 to-slate-950/35" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">

            {/* Dynamic Converting Title matching User Request - Single Inline Row */}
            <h1 className="font-serif font-bold text-2xl sm:text-4xl lg:text-[38px] xl:text-[46px] leading-tight tracking-tight text-white whitespace-normal sm:whitespace-nowrap drop-shadow-lg">
              Faisal Town Group |{' '}
              <span
                key={currentTitleIndex}
                className="inline-block text-white font-serif italic transition-all duration-700 animate-fadeIn drop-shadow-lg"
              >
                {heroTitles[currentTitleIndex]}
              </span>
            </h1>

            {/* Subtitle with explicit next line breaks */}
            <p className="text-white text-base sm:text-lg font-medium max-w-xl leading-relaxed drop-shadow-md">
              A well-planned housing society near Islamabad <br className="hidden sm:inline" />
              offering residential & commercial plots, modern amenities, <br className="hidden sm:inline" />
              and long-term investment potential for families & investors.
            </p>

            {/* Project Filter Pills - Compact Size so Arc background is clearly visible */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="/faisal-hills-blocks"
                className="px-3.5 py-1.5 bg-[#7b002c]/90 hover:bg-[#9e1245] backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 transition-all hover:scale-105 shadow-md flex items-center gap-1.5"
              >
                <span>Faisal Hills Taxila</span>
              </a>
              <a
                href="/blocks/faisal-jewel-islamabad"
                className="px-3.5 py-1.5 bg-[#7b002c]/90 hover:bg-[#9e1245] backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 transition-all hover:scale-105 shadow-md flex items-center gap-1.5"
              >
                <span>Faisal Jewels Tower</span>
              </a>
              <a
                href="/blocks/executive-block"
                className="px-3.5 py-1.5 bg-[#7b002c]/90 hover:bg-[#9e1245] backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 transition-all hover:scale-105 shadow-md flex items-center gap-1.5"
              >
                <span>Executive & Overseas</span>
              </a>
              <a
                href="/plots"
                className="px-3.5 py-1.5 bg-[#7b002c]/90 hover:bg-[#9e1245] backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 transition-all hover:scale-105 shadow-md flex items-center gap-1.5"
              >
                <span>Verified Plot Rates</span>
              </a>
            </div>

            {/* Direct Hero WhatsApp Action Button - Compact */}
            <div className="pt-1">
              <a
                href="https://wa.me/923044811717?text=Hi%2C%20I%20am%20interested%20in%20Faisal%20Hills%20plot%20booking%20and%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Hero Right Form Details - Seamless over Hero Background Image */}
          <div className="lg:col-span-5 relative w-full">
            <div className="space-y-4 text-white">

              <div className="border-b border-white/20 pb-3">
                <h3 className="font-serif font-bold text-2xl text-white flex items-center gap-2 drop-shadow-md">
                  {/* <Sparkles className="w-5 h-5 text-rose-400" /> */}
                  <span>Book Your Plot / Flat</span>
                </h3>
                <p className="text-xs text-slate-200 mt-1 font-medium drop-shadow-sm">Get official pricing, payment plan & plot selection guide.</p>
              </div>

              {heroFormSubmitted ? (
                <div className="bg-black/70 backdrop-blur-md border border-emerald-400/60 text-emerald-100 p-6 rounded-2xl text-xs font-bold space-y-2 animate-fadeIn text-center shadow-2xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-serif text-emerald-200">Inquiry Submitted Successfully!</h4>
                  <p className="font-normal text-emerald-300">Our Faisal Hills sales executive will contact you via WhatsApp / Phone shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleHeroFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-1 drop-shadow-xs">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Your Name"
                      value={heroFormName}
                      onChange={(e) => setHeroFormName(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 backdrop-blur-md border border-white/30 rounded-xl text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-rose-400 focus:bg-black/80 focus:ring-2 focus:ring-rose-500/30 transition-all shadow-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-1 drop-shadow-xs">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter WhatsApp / Phone Number"
                      value={heroFormPhone}
                      onChange={(e) => setHeroFormPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 backdrop-blur-md border border-white/30 rounded-xl text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-rose-400 focus:bg-black/80 focus:ring-2 focus:ring-rose-500/30 transition-all shadow-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-1 drop-shadow-xs">Select Project</label>
                    <div className="relative">
                      <select
                        value={heroFormProject}
                        onChange={(e) => setHeroFormProject(e.target.value)}
                        className="w-full pl-4 pr-12 py-3 bg-black/60 backdrop-blur-md border border-white/30 rounded-xl text-xs text-white focus:outline-none focus:border-rose-400 focus:bg-black/80 focus:ring-2 focus:ring-rose-500/30 transition-all cursor-pointer font-medium appearance-none shadow-md"
                      >
                        <option value="Faisal Hills Taxila" className="bg-slate-950 text-white">Faisal Hills  (Plots)</option>
                        <option value="Faisal Jewels Tower" className="bg-slate-950 text-white">Faisal Jewels Tower (Luxury Flats)</option>
                        <option value="Executive Block" className="bg-slate-950 text-white">Executive Block</option>
                        <option value="Prime Block" className="bg-slate-950 text-white">Prime Block</option>
                        <option value="Hills Walk" className="bg-slate-950 text-white">Hills Walk Commercial</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-300 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-1 drop-shadow-xs">Requirement Details</label>
                    <textarea
                      rows={2}
                      placeholder="Describe your property requirement (e.g., plot size, budget, preferences)..."
                      value={heroFormMessage}
                      onChange={(e) => setHeroFormMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-black/60 backdrop-blur-md border border-white/30 rounded-xl text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-rose-400 focus:bg-black/80 focus:ring-2 focus:ring-rose-500/30 transition-all resize-none shadow-md"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-2xl hover:shadow-rose-900/40 transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-white/30 cursor-pointer"
                  >
                    GET QUOTE
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-200 pt-1 drop-shadow-xs">
                    <Lock className="w-3.5 h-3.5 text-rose-300" />
                    <span>Your information is 100% confidential & secure</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Animated Block Ticker Strip in Pure White Luxury Design attached flush inside Hero Section */}
        <div className="mt-8 sm:mt-12 bg-white border-y border-slate-200/80 py-4 overflow-hidden relative shadow-sm z-20">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="ticker-track gap-0">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center gap-0 shrink-0">
                <a href="/blocks/executive-block" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans group-hover:text-slate-600 transition-colors">Executive Block</span>
                  <span className="text-[10px] text-white font-medium font-sans ml-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full shadow-sm">Possession Ready</span>
                </a>
                <span className="text-slate-300 text-lg select-none px-2">|</span>
                <a href="/blocks/prime-block" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans group-hover:text-slate-600 transition-colors">Prime Block</span>
                  <span className="text-[10px] text-white font-medium font-sans ml-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full shadow-sm">Installments Open</span>
                </a>
                <span className="text-slate-300 text-lg select-none px-2">|</span>
                <a href="/blocks/block-a" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans group-hover:text-slate-600 transition-colors">Block A</span>
                  <span className="text-[10px] text-white font-medium font-sans ml-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full shadow-sm">Families Settled</span>
                </a>
                <span className="text-slate-300 text-lg select-none px-2">|</span>
                <a href="/blocks/block-b" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans group-hover:text-slate-600 transition-colors">Block B</span>
                  <span className="text-[10px] text-white font-medium font-sans ml-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full shadow-sm">Margalla Views</span>
                </a>
                <span className="text-slate-300 text-lg select-none px-2">|</span>
                <a href="/blocks/block-b1-extension" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans group-hover:text-slate-600 transition-colors">B Extension</span>
                  <span className="text-[10px] text-white font-medium font-sans ml-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full shadow-sm">Affordable Entry</span>
                </a>
                <span className="text-slate-300 text-lg select-none px-2">|</span>
                <a href="/blocks/block-c" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans group-hover:text-slate-600 transition-colors">Block C</span>
                  <span className="text-[10px] text-white font-medium font-sans ml-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full shadow-sm">800+ Commercial Plots</span>
                </a>
                <span className="text-slate-300 text-lg select-none px-2">|</span>
                <a href="/blocks/block-d" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans group-hover:text-slate-600 transition-colors">Block D</span>
                  <span className="text-[10px] text-white font-medium font-sans ml-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full shadow-sm">Possession Granted</span>
                </a>
                <span className="text-slate-300 text-lg select-none px-2">|</span>
                <a href="/blocks/faisal-jewels" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans group-hover:text-slate-600 transition-colors">Faisal Jewel Tower</span>
                  <span className="text-[10px] text-white font-medium font-sans ml-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full shadow-sm">22-Storey Skyscraper</span>
                </a>
                <span className="text-slate-300 text-lg select-none px-2">|</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. KEY VALUE PROPOSITION HIGHLIGHTS BAR (Matching Reference Image 1) */}
      <ScrollReveal className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">

          {/* Item 1: RDA Approved NOC */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-13 h-13 rounded-2xl bg-slate-100/90 text-[#7b002c] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs group-hover:scale-110 group-hover:bg-[#7b002c] group-hover:text-white transition-all duration-300">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#7b002c] leading-snug">
                RDA Approved NOC
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                100% legal housing project verified by Rawalpindi Development Authority.
              </p>
            </div>
          </div>

          {/* Item 2: 3-Year Installments */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-13 h-13 rounded-2xl bg-slate-100/90 text-[#7b002c] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs group-hover:scale-110 group-hover:bg-[#7b002c] group-hover:text-white transition-all duration-300">
              <Calculator className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#7b002c] leading-snug">
                3-Year Installments
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                Easy quarterly & monthly plans with 20% initial booking down payment.
              </p>
            </div>
          </div>

          {/* Item 3: Possession Ready */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-13 h-13 rounded-2xl bg-slate-100/90 text-[#7b002c] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-xs group-hover:scale-110 group-hover:bg-[#7b002c] group-hover:text-white transition-all duration-300">
              <Building2 className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#7b002c] leading-snug">
                Possession Ready
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                Executive Block & Block A, B, C are fully developed for instant home construction.
              </p>
            </div>
          </div>

          {/* Item 4: High Capital Growth */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-13 h-13 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 border border-slate-800 shadow-xs group-hover:scale-110 group-hover:bg-[#7b002c] transition-all duration-300">
              <TrendingUp className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#7b002c] leading-snug">
                High Capital Growth
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                Prime location on GT Road ensures consistent 25%+ annual property value appreciation.
              </p>
            </div>
          </div>

        </div>
      </ScrollReveal>


      {/* 2.5 A STORY OF LEGACY */}
      <section className="bg-white py-12 lg:py-16 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-center">

          {/* Left Column: Story & Link */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#7b002c] tracking-tight">
                Chairman & Founder - Chaudhry Abdul Majeed
              </h1>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#7b002c]/10 border border-[#7b002c]/20 rounded-full text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>12 Years of Incredible Legacy</span>
              </div>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-light tracking-tight leading-tight">
              A STORY <br />
              <span className="inline-block italic font-serif font-normal text-[#7b002c] mr-3 sm:mr-4">of</span>{' '}LEGACY
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              Faisal Hills Islamabad, developed by Zedem International under Chaudhry Abdul Majeed's leadership, is a thoughtfully planned gated community in Taxila along GT Road with Margalla Hills as its backdrop. Combining modern living, strong connectivity, legal RDA/CDA NOC status, and high investment yields, it is built for Pakistan's future.
            </p>

            {/* Developer's Portfolio Badges matching Reference Content */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                'Faisal Town Phase 1',
                'Faisal Town Phase 2',
                'Faisal Hills',
                'Faisal Residencia',
                'Faisal Heights',
                'Faisal Jewels',
              ].map((projName) => (
                <span
                  key={projName}
                  className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:border-[#7b002c] hover:text-[#7b002c] transition-colors"
                >
                  {projName}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-1 transition-all group"
              >
                <span>Discover More</span>
                <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Chairman Image direct without extra div wrappers */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-end -ml-0 lg:-ml-4">
            <img
              src="/chaudhry-abdul-majeed.png"
              alt="Chaudhry Abdul Majeed - Chairman Faisal Town Group"
              className="w-full max-w-[420px] h-auto object-contain"
            />
          </div>

        </div>
      </section>

      {/* DISCOVER FAISALTOWN STATS COUNTER SECTION (Matching Reference Image 2) */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">

          {/* Top Centered Section Label with Underline */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-800 border-b-2 border-slate-900 pb-1.5 inline-block">
              DISCOVER FAISALTOWN
            </span>
          </div>

          {/* Stats Grid matching reference screenshot 2 layout */}
          <div className="space-y-12">

            {/* Top Row: 3 Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">

              {/* Stat 1: 60k Total Area */}
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

              {/* Stat 2: 8 Total Projects */}
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

              {/* Stat 3: 130k Total Residential Units */}
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

            </div>

            {/* Bottom Row: 2 Centered Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-8 items-center justify-center">

              {/* Stat 4: 60k Commercial Units */}
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

              {/* Stat 5: 1.5M Total Population Capacity */}
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

            </div>

          </div>

        </div>
      </section>


      {/* 3. FLAGSHIP SPECIAL FEATURE: FAISAL JEWEL */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Title, Subtitle, Red Accent Bar, Paragraphs & Link */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight">
                  Faisal Jewel
                </h2>
                <p className="font-serif text-base sm:text-lg text-slate-500 font-light mt-1.5">
                  27-Story Five-Star Hotel
                </p>
                <div className="w-16 h-[2px] bg-[#7b002c] mt-4 mb-6" />
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                The 27-story Faisal Jewel introduces five-star hotel amenities within Faisal Hills. Recently partnered with Hilton Hotels, this landmark will attract local and international visitors, especially those exploring the religious and cultural heritage of Sikhism, Buddhism, and Islam.
              </p>

              <p className="text-slate-500 text-xs sm:text-sm italic leading-relaxed font-sans">
                With its iconic design and strategic location, Faisal Jewel acts as a gateway to Northern Pakistan's tourism corridor, elevating Faisal Hills to a destination of global repute.
              </p>

              <div className="pt-4">
                <Link
                  href="/blocks/faisal-jewel-islamabad"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-900 hover:text-[#7b002c] border-b border-slate-900 hover:border-[#7b002c] pb-0.5 transition-all group"
                >
                  <span>Explore Faisal Jewel</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Single High-Quality Static HD Image of Faisal Jewel */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[480px]">
                <img
                  src="/images/imgi_175_faisal-jewel.jpg"
                  alt="Faisal Jewel 27-Story Five-Star Hotel"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 3.5 KEY SOCIETY LANDMARKS & INFRASTRUCTURE */}
      <section className="bg-slate-50 py-14 lg:py-20 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-10">

          {/* Section Header (Inspired by 2nd Image Layout) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[#7b002c] font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#7b002c]" />
                <span className="border-b-2 border-[#7b002c] pb-0.5">Modern Infrastructure</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                Infrastructure Of Faisal Hills
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start lg:items-end gap-4 max-w-2xl">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                Faisal Hills features wide streets and boulevards ranging from 40 to 225 feet, ensuring a spacious, organized, and aesthetically planned layout that meets the highest standards of urban design.
              </p>
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 shrink-0 cursor-pointer group"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Inquire About Society Amenities</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* 8 Portrait Cards Grid matching 2nd Image UI Concept */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[
              {
                title: 'Hill Walk Boulevard',
                subtitle: 'Vibrant Commercial Strip Inspired By Istiklal Street',
                image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
                icon: Compass,
              },
              {
                title: 'Faisal Hills Arc',
                subtitle: 'Architectural Landmark Entrance Monument',
                image: '/images/faisalhillarc.jpg',
                icon: Landmark,
              },
              {
                title: 'Faisal Hills Aerial View',
                subtitle: 'Gated Master-Planned Community',
                image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
                icon: MapPin,
              },
              {
                title: 'Faisal Jewel Skyscraper',
                subtitle: '27-Story Luxury Hotel & Residences',
                image: '/images/faisal-jewel.jpg',
                icon: Building2,
              },
              {
                title: 'Commercial Boulevard',
                subtitle: 'Prime Retail Hub in Executive Block',
                image: '/images/imgi_5_Rectangle-1-1-scaled-e1766059628733.png',
                icon: ShoppingBag,
              },
              {
                title: 'Roots International School',
                subtitle: 'Executive Block Faisal Hills Campus',
                image: '/images/faisal-roots-school.jpg',
                icon: GraduationCap,
              },
              {
                title: 'Miyawaki Urban Forest',
                subtitle: 'Block C Green Living Reserve',
                image: '/images/faisal-forest.jpg',
                icon: Trees,
              },
              {
                title: 'Glow Park & Sports Arena',
                subtitle: 'Block A Family Recreation Park',
                image: '/images/faisal-park.jpg',
                icon: Sparkles,
              },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <ScrollReveal
                  key={idx}
                  direction={idx % 2 === 0 ? "right" : "pop"}
                  delay={(idx % 4) * 100}
                >
                  <div
                    onClick={() => setIsLeadModalOpen(true)}
                    className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 aspect-[4/5] sm:aspect-[3/4] flex flex-col justify-end p-3.5 sm:p-4 border border-slate-200/80 cursor-pointer bg-slate-900 h-full"
                  >
                    {/* Full Background Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Dark Contrast Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5 group-hover:from-black/70 transition-colors duration-500" />

                    {/* Top Right Floating Circle Icon */}
                    <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#7b002c] text-white flex items-center justify-center shadow-lg border border-white/20 group-hover:bg-[#9e1245] group-hover:scale-110 transition-all duration-300">
                        <IconComp className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Bottom White Overlay Card Pill */}
                    <div className="relative z-10 w-full bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-3.5 text-center shadow-xl border border-white/80 group-hover:bg-white transition-all duration-300 transform group-hover:-translate-y-1">
                      <h3 className="font-serif font-bold text-[#7b002c] text-sm sm:text-base leading-snug group-hover:text-[#9e1245] transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-[11px] sm:text-xs font-semibold mt-0.5 tracking-tight line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>


      {/* 4. OFFICIAL MASTER PLAN MAP */}
      <ScrollReveal className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6 pt-4">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Official Society Blueprint</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c]">
              Faisal Hills Master Plan Map
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Explore the complete high-resolution master plan map of Faisal Hills. Use the zoom controls to zoom up to 350% and inspect plot details, street numbers, and sector layouts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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
          </div>
        </div>

        {/* High-Resolution Master Plan Map Viewer */}
        <div className="mt-6">
          <MasterPlanViewer />
        </div>

      </ScrollReveal>


      {/* 5. BLOCKS & SECTORS EXPLORER (TABBED & GRID) */}
      <section id="blocks-section" className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8 pt-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Explore All Sectors</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c]">
              Faisal Hills Blocks & Commercial Projects
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center bg-slate-200/80 p-1.5 rounded-xl gap-1">
            <button
              onClick={() => setActiveTab('developed')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'developed' ? 'bg-[#7b002c] text-white shadow-sm' : 'text-slate-700 hover:text-[#7b002c]'
                }`}
            >
              Developed Blocks ({developedBlocks.length})
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'commercial' ? 'bg-[#7b002c] text-white shadow-sm' : 'text-slate-700 hover:text-[#7b002c]'
                }`}
            >
              Commercial Projects ({commercialProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'upcoming' ? 'bg-[#7b002c] text-white shadow-sm' : 'text-slate-700 hover:text-[#7b002c]'
                }`}
            >
              Upcoming ({upcomingBlocks.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Developed Blocks */}
        {activeTab === 'developed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developedBlocks.map((block) => (
              <div
                key={block.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm card-hover hover-glow-maroon overflow-hidden flex flex-col justify-between group transition-all duration-300"
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
                        <span className="text-slate-500 font-medium">Residential Plot Rates:</span>
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

                  <Link
                    href={`/blocks/${block.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] group-hover:text-[#9e1245] transition-colors"
                  >
                    <span>Explore Block Layout</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Commercial Projects */}
        {activeTab === 'commercial' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commercialProjects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm card-hover flex flex-col sm:flex-row gap-6 items-center">
                <img src={project.heroImage} alt={project.name} className="w-full sm:w-44 h-36 object-cover rounded-xl shrink-0" />
                <div className="space-y-3 flex-1">
                  <span className="bg-slate-100 text-[#7b002c] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-200">
                    {project.status}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-[#7b002c]">{project.name}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{project.description}</p>
                  <Link href={`/blocks/${project.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] transition-colors">
                    <span>View Specifications</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Upcoming Sectors */}
        {activeTab === 'upcoming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingBlocks.map((block) => (
              <div key={block.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm card-hover flex flex-col sm:flex-row gap-6 items-center">
                <img src={block.heroImage} alt={block.name} className="w-full sm:w-44 h-36 object-cover rounded-xl shrink-0" />
                <div className="space-y-3 flex-1">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {block.status}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-[#7b002c]">{block.name}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{block.description}</p>
                  <Link href={`/blocks/${block.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] transition-colors">
                    <span>View Pre-Booking Rates</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      {/* 6. LOCATION ACCESSIBILITY & DISTANCE MATRIX SECTION */}
      <section className="bg-slate-50 text-slate-900 py-16 px-6 lg:px-12 border-y border-slate-200/80 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

          <ScrollReveal direction="right" className="lg:col-span-5 space-y-4">
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Prime Connectivity</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              Strategic Location on <span className="text-[#7b002c] italic">N-5 GT Road Taxila</span>.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Faisal Hills enjoys an enviable geographic location directly on N-5 GT Road, placing residents within quick driving distance to key educational, medical, and transport hubs of Rawalpindi and Islamabad.
            </p>
          </ScrollReveal>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">

            {/* Location 1 */}
            <ScrollReveal direction="left" delay={0}>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-[#7b002c] shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-4 group h-full">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center shrink-0 border border-[#7b002c]/20 group-hover:bg-[#7b002c] group-hover:text-white transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-serif font-bold text-base leading-tight group-hover:text-[#7b002c] transition-colors">
                      Taxila Museum Circle
                    </strong>
                    <span className="text-slate-500 text-xs block mt-1 font-sans">
                      Historical & Cultural Center
                    </span>
                  </div>
                </div>
                <span className="bg-[#7b002c] text-white font-bold px-3.5 py-1.5 rounded-full text-xs shadow-md shrink-0 whitespace-nowrap">
                  5 Mins Drive
                </span>
              </div>
            </ScrollReveal>

            {/* Location 2 */}
            <ScrollReveal direction="left" delay={100}>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-[#7b002c] shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-4 group h-full">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center shrink-0 border border-[#7b002c]/20 group-hover:bg-[#7b002c] group-hover:text-white transition-all">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-serif font-bold text-base leading-tight group-hover:text-[#7b002c] transition-colors">
                      CPEC / M-1 Motorway
                    </strong>
                    <span className="text-slate-500 text-xs block mt-1 font-sans">
                      Direct Highway Access
                    </span>
                  </div>
                </div>
                <span className="bg-[#7b002c] text-white font-bold px-3.5 py-1.5 rounded-full text-xs shadow-md shrink-0 whitespace-nowrap">
                  10 Mins Drive
                </span>
              </div>
            </ScrollReveal>

            {/* Location 3 */}
            <ScrollReveal direction="left" delay={200}>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-[#7b002c] shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-4 group h-full">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center shrink-0 border border-[#7b002c]/20 group-hover:bg-[#7b002c] group-hover:text-white transition-all">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-serif font-bold text-base leading-tight group-hover:text-[#7b002c] transition-colors">
                      Islamabad Airport
                    </strong>
                    <span className="text-slate-500 text-xs block mt-1 font-sans">
                      International Terminal
                    </span>
                  </div>
                </div>
                <span className="bg-[#7b002c] text-white font-bold px-3.5 py-1.5 rounded-full text-xs shadow-md shrink-0 whitespace-nowrap">
                  15 Mins Drive
                </span>
              </div>
            </ScrollReveal>

            {/* Location 4 */}
            <ScrollReveal direction="left" delay={300}>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-[#7b002c] shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-4 group h-full">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center shrink-0 border border-[#7b002c]/20 group-hover:bg-[#7b002c] group-hover:text-white transition-all">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-serif font-bold text-base leading-tight group-hover:text-[#7b002c] transition-colors">
                      Zero Point & Blue Area
                    </strong>
                    <span className="text-slate-500 text-xs block mt-1 font-sans">
                      Capital Business District
                    </span>
                  </div>
                </div>
                <span className="bg-[#7b002c] text-white font-bold px-3.5 py-1.5 rounded-full text-xs shadow-md shrink-0 whitespace-nowrap">
                  20 Mins Drive
                </span>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>


      {/* 7. DIRECT FEATURED PLOT LISTINGS SHOWCASE */}
      <section className="bg-white py-20 px-6 lg:px-12 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-10">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="label-caps text-[#7b002c] font-bold block mb-1">Direct Market Inventory</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c]">
                Featured Plots Ready For Sale
              </h2>
              <p className="text-slate-600 text-sm mt-1">Direct owner & dealer verified plots in Executive Block, Block A, B & C.</p>
            </div>

            <Link
              href="/plots"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] transition-colors"
            >
              <span>Explore All {plots.length}+ Listings</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plots.slice(0, 4).map((plot) => (
              <div key={plot.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm card-hover hover-glow-maroon overflow-hidden flex flex-col justify-between group transition-all duration-300">
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

                  <button
                    onClick={() => setIsLeadModalOpen(true)}
                    className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all duration-300 hover:scale-105 btn-shimmer active:scale-95 shadow"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ON-SITE DEVELOPMENT & PROJECT PHOTO GALLERY */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8 py-6" id="gallery-section">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
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
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
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
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
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


      {/* 8. EASY PAYMENT SCHEDULE MATRIX */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Financial Investment</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c]">
              36-Month Easy Installment Schedule
            </h2>
            <p className="text-slate-600 text-sm mt-1">Book your plot with just 20% down payment and pay over 3 easy years.</p>
          </div>

          <Link href="/payment-plan" className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] bg-white hover:bg-slate-100 px-5 py-3 rounded-xl border border-slate-300 shadow-sm transition">
            <Calculator className="w-4 h-4 text-[#7b002c]" />
            <span>Open Custom Calculator</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
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
                        className="px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-lg transition-all"
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

      </section>


      {/* 8.5 HOW TO BOOK - STICKY HORIZONTAL SCROLL-DRIVEN SLIDER (Matching User Request) */}
      <StickyHorizontalBookingSteps />


      {/* 9. SEO FAQS ACCORDION SECTION (Matching Reference Screenshot Design) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: FAQ'S Label & FREQUENTLY ASKED QUESTIONS Headline */}
          <div className="lg:col-span-4 space-y-3 sticky top-28">
            <span className="text-xs font-bold text-slate-400 tracking-[0.25em] uppercase block">
              FAQ&apos;S
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#7b002c] tracking-tight leading-[1.15] uppercase">
              FREQUENTLY <br />
              ASKED QUESTIONS
            </h2>
          </div>

          {/* Right Column: Sleek Accordion List with Horizontal Dividers */}
          <div className="lg:col-span-8 space-y-0 border-t border-slate-900/80">
            {seoFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border-b border-slate-900/80">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-5 text-left font-serif font-bold text-xs sm:text-sm text-[#7b002c] hover:text-[#9e1245] uppercase tracking-wider flex items-center justify-between gap-4 cursor-pointer transition-colors"
                  >
                    <span className="pr-4 leading-snug">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7b002c] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pr-6 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 9.5 OUR RECENT BLOG POST SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 space-y-10 border-t border-slate-100">

        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#7b002c] font-bold text-xs uppercase tracking-wider border-b-2 border-[#7b002c] pb-1">
              <ArrowRight className="w-6 h-6 text-[#7b002c]" />
              <span className='font-bold text-xl'>OUR RECENT BLOG POST</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Our Latest <span className="text-[#7b002c]">Article</span> And <span className="text-[#7b002c]">News</span> For You
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:justify-end">
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md">
              Stay updated with our latest articles and news covering insights, updates, and developments related to Faisal Hills.
            </p>

            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-105 shrink-0 w-fit"
            >
              <span>View Blogs</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>

        {/* 3 Blog Cards Grid matching Reference Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <ScrollReveal direction="right" delay={0}>
            <Link
              href="/blogs/faisal-hills-plots-installments-bank-transfer-guide-saudi-arabia-pakistan"
              className="group flex flex-col space-y-4 cursor-pointer h-full"
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm aspect-[16/10] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                  alt="Faisal Hills Plots On Installments"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#7b002c] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Saudi Arabia Guide
                </div>
              </div>
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#7b002c] transition-colors leading-snug">
                  Faisal Hills Plots On Installments: Complete Bank Transfer Guide From Saudi Arabia To Pakistan
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-sans">
                  For Thousands Of Overseas Pakistanis Working In The Gulf, Owning Land Back Home Is More Accessible Than Ever With Secure Bank Transfer Options...
                </p>
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal direction="right" delay={120}>
            <Link
              href="/blogs/faisal-hills-residential-commercial-plots-sale-buyer-checklist-riyadh-jeddah-dammam"
              className="group flex flex-col space-y-4 cursor-pointer h-full"
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm aspect-[16/10] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80"
                  alt="Faisal Hills Residential Commercial Plots"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#7b002c] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Buyer Checklist
                </div>
              </div>
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#7b002c] transition-colors leading-snug">
                  Faisal Hills Residential Commercial Plots For Sale Buyer Checklist For Riyadh Jeddah Dammam
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-sans">
                  For Thousands Of Pakistanis Working In Riyadh, Jeddah, And Dammam, Owning A Piece Of Land Requires A Structured Verification Process...
                </p>
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal direction="right" delay={240}>
            <Link
              href="/blogs/faisal-hills-noc-verification-guide-saudi-pakistanis-plot-buying"
              className="group flex flex-col space-y-4 cursor-pointer h-full"
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm aspect-[16/10] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                  alt="Faisal Hills NOC Verification Guide"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#7b002c] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  NOC Verification
                </div>
              </div>
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#7b002c] transition-colors leading-snug">
                  Faisal Hills NOC Verification Guide For Saudi Pakistanis Plot Buying
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-sans">
                  Buying Property In Pakistan While Living Thousands Of Miles Away In Riyadh, Jeddah, Or Dammam Demands Verifiable Regulatory Clearances...
                </p>
              </div>
            </Link>
          </ScrollReveal>

        </div>

      </section>


      {/* 10. WARM CTA BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-6" id="contact-section">
        <div className="rounded-3xl bg-slate-100 text-[#7b002c] p-10 lg:p-14 border border-slate-200 shadow-lg flex flex-col items-center justify-center text-center space-y-6">

          <div className="space-y-3 max-w-2xl">
            <span className="label-caps text-[#7b002c] font-bold block tracking-widest text-xs">Official Contact Desk</span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#7b002c]">
              Get In Touch With Our Sales Experts
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Visit our site office or contact our sales team to select your desired plot, check plot availability, or inquire about payment plans.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 btn-shimmer active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>GET IN TOUCH</span>
            </button>

            <a
              href="tel:+923313339997"
              className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>CALL 0331 333 9997</span>
            </a>
          </div>

        </div>
      </section>

      {/* Booking Lead Modal */}
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />

      {/* Map Download Lead Form Modal */}
      <MapDownloadModal isOpen={isMapDownloadModalOpen} onClose={() => setIsMapDownloadModalOpen(false)} />

    </div>
  );
}
