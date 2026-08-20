'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2, ShieldCheck, MapPin, Search, ArrowRight, CheckCircle2,
  Sparkles, TrendingUp, Trees, Landmark, Layers, HelpCircle, MessageSquare, PhoneCall, Award, Calculator, Clock, ChevronRight, Waves, Utensils, Car, Lock, Compass, Check, FileText, Camera, Maximize2, Image as ImageIcon
} from 'lucide-react';
import {
  blocksData, plotInventoryData, societyStats, paymentPlansData, initialGalleryData, type GalleryItem,
  fetchBlocks, fetchPlots, fetchGallery, fetchSettings, submitLead
} from '@/data/faisalHillsData';
import InteractiveMasterPlan from '@/components/map/InteractiveMasterPlan';
import LeadModal from '@/components/ui/LeadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HomePage() {
  const [selectedBlockFilter, setSelectedBlockFilter] = useState('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'developed' | 'commercial' | 'upcoming'>('developed');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

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

  // Dynamic HD Background Image Slider for Hero & Sections (Changes every 3.5 seconds with smooth crossfade)
  const heroBgImages = useMemo(() => [
    '/faisal-jewel.jpg',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1440&q=70',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1440&q=70',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1440&q=70',
  ], []);
  const [bgImageIndex, setBgImageIndex] = useState(0);

  React.useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % heroBgImages.length);
    }, 3500);
    return () => clearInterval(bgTimer);
  }, [heroBgImages]);

  const seoFaqs = [
    {
      q: "Is Faisal Hills an RDA Approved Housing Society?",
      a: "Yes, Faisal Hills Taxila is 100% approved by the Rawalpindi Development Authority (RDA). It possesses clear land titles, verified layout maps, and official NOC clearance for both residential sectors and commercial high-rise projects."
    },
    {
      q: "What is Faisal Jewels and where is it located?",
      a: "Faisal Jewels is the flagship 26-story ultra-luxury skyscraper located at the main monument roundabout of Faisal Hills on GT Road Taxila. It features 5-star hotel serviced apartments, luxury retail shopping mall, 22nd-floor infinity pool, and a 360-degree revolving glass sky restaurant."
    },
    {
      q: "What plot sizes are available for sale in Faisal Hills?",
      a: "Faisal Hills offers 5 Marla (25x50), 8 Marla (30x60), 10 Marla (35x70), 14 Marla (40x80), 1 Kanal (50x90), and 2 Kanal luxury villa plots across Executive Block, Block A, B, C, D, B1 Extension, and Prime Block."
    },
    {
      q: "What is the payment plan schedule for plots and Faisal Jewels apartments?",
      a: "Investments in Faisal Hills plots and Faisal Jewels commercial/apartment units are available on flexible 3-Year (36-Month) installment plans with a 20% to 25% booking down payment."
    },
    {
      q: "How far is Faisal Hills from Islamabad and New Islamabad Airport?",
      a: "Faisal Hills is situated right on N-5 GT Road, Taxila. It is 5 minutes from Taxila Bypass, 10 minutes from CPEC M-1 Motorway Interchange, 15 minutes from New Islamabad International Airport, and 20 minutes from Islamabad Zero Point."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 space-y-24 pb-24 font-sans selection:bg-gold-accent selection:text-slate-950">

      {/* 1. HERO SECTION - Ultra-Luxury Glassmorphism & HD Image Slider */}
      <section className="relative bg-[#091522] text-white overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-14 lg:pb-24 border-b border-slate-800">

        {/* Dynamic HD Background Image Slider with Smooth Crossfade */}
        {heroBgImages.map((imgUrl, idx) => (
          <div
            key={imgUrl}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${idx === bgImageIndex ? 'opacity-100 scale-105 transition-transform duration-[4000ms]' : 'opacity-0 scale-100'
              }`}
            style={{ backgroundImage: `url('${imgUrl}')` }}
          />
        ))}

        {/* Subtle Transparent Tint for Readable Text & Crystal Clear HD Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/45 via-slate-950/25 to-slate-950/35" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Hero Content Left */}
          <div className="lg:col-span-8 space-y-6">


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

            {/* Subtitle matching User Request */}
            <p className="text-white text-base sm:text-lg font-medium max-w-2xl leading-relaxed drop-shadow-md">
              A well-planned housing society near Islamabad offering residential and commercial plots, strong location access, modern amenities, and long-term investment potential for families and investors.
            </p>

            {/* Project Filter Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/faisal-hills-blocks"
                className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <span> Faisal Hills Taxila</span>
              </a>
              <a
                href="/blocks/faisal-jewel-islamabad"
                className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <span> Faisal Jewels Tower</span>
              </a>
              <a
                href="/blocks/executive-block"
                className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <span>Executive & Overseas</span>
              </a>
              <a
                href="/plots"
                className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <span>Verified Plot Rates</span>
              </a>
            </div>


          </div>

          {/* Hero Right Side: Embedded Booking Form with Glassmorphism */}
          <div className="lg:col-span-4 relative">
            <div className="bg-slate-900/60 backdrop-blur-xl text-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 space-y-4 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#7b002c]/30 rounded-full blur-2xl pointer-events-none" />

              <div className="border-b border-white/15 pb-4">
                <h3 className="font-serif font-bold text-2xl text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>Book Your Plot / Flat</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">Get official pricing, payment plan & plot selection guide.</p>
              </div>

              {heroFormSubmitted ? (
                <div className="bg-[#7b002c]/40 backdrop-blur-md border border-white/30 text-white p-6 rounded-2xl text-xs font-bold space-y-2 animate-fadeIn text-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10 text-white mx-auto" />
                  <h4 className="text-base font-serif text-white">Inquiry Submitted Successfully!</h4>
                  <p className="font-normal text-slate-200">Our Faisal Hills sales executive will contact you via WhatsApp / Phone shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleHeroFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Your Name"
                      value={heroFormName}
                      onChange={(e) => setHeroFormName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter WhatsApp / Phone Number"
                      value={heroFormPhone}
                      onChange={(e) => setHeroFormPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Select Project</label>
                    <select
                      value={heroFormProject}
                      onChange={(e) => setHeroFormProject(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-white transition-all"
                    >
                      <option value="Faisal Hills Taxila" className="bg-slate-900 text-white">Faisal Hills Taxila (Plots)</option>
                      <option value="Faisal Jewels Tower" className="bg-slate-900 text-white">Faisal Jewels Tower (Luxury Flats)</option>
                      <option value="Executive Block" className="bg-slate-900 text-white">Executive Block</option>
                      <option value="Prime Block" className="bg-slate-900 text-white">Prime Block</option>
                      <option value="Hills Walk" className="bg-slate-900 text-white">Hills Walk Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Requirement Details</label>
                    <textarea
                      rows={2}
                      placeholder="Describe your property requirement (e.g., plot size, budget, preferences)..."
                      value={heroFormMessage}
                      onChange={(e) => setHeroFormMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-white focus:bg-white/15 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-[#7b002c] via-[#9e1245] to-[#7b002c] hover:from-[#9e1245] hover:to-[#7b002c] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-white/20 btn-shimmer"
                  >
                    GET QUOTE
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <Lock className="w-3.5 h-3.5 text-white" />
                    <span>Your information is 100% confidential & secure</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>




      {/* Animated Block Ticker Strip */}
      <div className="bg-slate-950 border-y border-slate-800 py-3 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="ticker-track gap-0">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-0 shrink-0">
              <a href="/blocks/executive-block" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Executive Block</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-sans ml-1.5">Possession Ready</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/prime-block" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Prime Block</span>
                <span className="text-[10px] text-amber-400 font-semibold font-sans ml-1.5">Installments Open</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/block-a" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block A</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-sans ml-1.5">Families Settled</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/block-b" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block B</span>
                <span className="text-[10px] text-sky-400 font-semibold font-sans ml-1.5">Margalla Views</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/block-b1-extension" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">B Extension</span>
                <span className="text-[10px] text-violet-400 font-semibold font-sans ml-1.5">Affordable Entry</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/block-c" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block C</span>
                <span className="text-[10px] text-amber-400 font-semibold font-sans ml-1.5">800+ Commercial Plots</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/block-d" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block D</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-sans ml-1.5">Possession Granted</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/faisal-jewels" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Faisal Jewel Tower</span>
                <span className="text-[10px] text-rose-400 font-semibold font-sans ml-1.5">22-Storey Skyscraper</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. KEY VALUE PROPOSITION HIGHLIGHTS BAR */}
      <ScrollReveal className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-20">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">

          {/* Item 1: RDA Approved NOC */}
          <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#7b002c] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-sm group-hover:scale-110 group-hover:bg-[#7b002c] group-hover:text-white transition-all duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#7b002c] group-hover:text-[#9e1245] transition-colors">
                RDA Approved NOC
              </h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed font-sans">
                100% legal housing project verified by Rawalpindi Development Authority.
              </p>
            </div>
          </div>

          {/* Item 2: 3-Year Installments */}
          <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#7b002c] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-sm group-hover:scale-110 group-hover:bg-[#7b002c] group-hover:text-white transition-all duration-300">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#7b002c] group-hover:text-[#9e1245] transition-colors">
                3-Year Installments
              </h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed font-sans">
                Easy quarterly & monthly plans with 20% initial booking down payment.
              </p>
            </div>
          </div>

          {/* Item 3: Possession Ready */}
          <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#7b002c] flex items-center justify-center shrink-0 border border-slate-200/80 shadow-sm group-hover:scale-110 group-hover:bg-[#7b002c] group-hover:text-white transition-all duration-300">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#7b002c] group-hover:text-[#9e1245] transition-colors">
                Possession Ready
              </h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed font-sans">
                Executive Block & Block A, B, C are fully developed for instant home construction.
              </p>
            </div>
          </div>

          {/* Item 4: High Capital Growth */}
          <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 border border-slate-700 shadow-sm group-hover:scale-110 group-hover:bg-[#7b002c] group-hover:text-white transition-all duration-300">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#7b002c] group-hover:text-[#9e1245] transition-colors">
                High Capital Growth
              </h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed font-sans">
                Prime location on GT Road ensures consistent 25%+ annual property value appreciation.
              </p>
            </div>
          </div>

        </div>
      </ScrollReveal>


      {/* 2.5 A STORY OF LEGACY */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Story & Link */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#7b002c]/10 border border-[#7b002c]/20 rounded-full text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>12 Years of Incredible Legacy</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-light tracking-tight leading-tight">
              A STORY <br />
              <span className="italic font-serif font-normal text-[#7b002c]">of</span> LEGACY
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              FaisalTown Group's journey reflects vision, trust, and a dedication to excellence. Under Chaudhry Abdul Majeed's leadership, it grew by delivering modern, affordable communities with transparency and timely development, continually enriching lives and shaping Pakistan's future through purposeful, people-focused progress.
            </p>

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

          {/* Right Column: Chairman Executive Leadership Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-[#091522] border border-[#7b002c]/30 shadow-2xl group transition-all duration-500 hover:border-[#7b002c]">

              {/* Top Accent Tag */}
              <div className="absolute top-4 left-4 z-20 bg-[#7b002c] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow border border-white/20">
                CHAIRMAN & FOUNDER
              </div>

              {/* Portrait Image */}
              <div className="relative h-[360px] sm:h-[400px] w-full flex items-end justify-center bg-gradient-to-b from-[#091522] via-[#0d1d2d] to-[#091522]">
                <img
                  src="/chaudhry-abdul-majeed.png"
                  alt="Chaudhry Abdul Majeed - Chairman Faisal Town Group"
                  width={450}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091522] via-transparent to-transparent opacity-80" />
              </div>

              {/* Bottom Caption */}
              <div className="p-5 bg-[#091522] text-white border-t border-slate-800/80 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">Faisal Town Group</span>
                <h4 className="font-serif font-bold text-xl text-white mt-0.5">Chaudhry Abdul Majeed</h4>
                <p className="text-slate-400 text-xs mt-1">Visionary Leader & Founder of Faisal Hills</p>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* 3. FLAGSHIP SPECIAL FEATURE: FAISAL JEWELS (26-STORY ULTRA-LUXURY HIGH-RISE) */}
      <ScrollReveal className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-6">
        <div className="bg-slate-950 text-white rounded-3xl p-8 lg:p-14 border border-[#7b002c]/40 shadow-2xl relative overflow-hidden">

          {/* Luxury Ambient Lighting Glows */}
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#7b002c]/35 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-[#4c050d]/50 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

            {/* Left Image & Badge */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl img-zoom-container group">
                <img
                  src="/faisal-jewel.jpg"
                  alt="Faisal Jewels 26-Story Skyscraper Tower"
                  width={500}
                  height={420}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-[#7b002c] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow border border-white/20">
                  ICONIC 26-STORY TOWER
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs text-slate-300 font-semibold block">Faisal Hills GT Road Monument</span>
                  <h4 className="font-serif font-bold text-2xl text-white">Faisal Jewels Tower</h4>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-[#7b002c]/40 backdrop-blur-md p-3.5 rounded-xl border border-white/20 shadow-md">
                  <span className="text-[10px] text-slate-300 uppercase block font-semibold">Apartment Prices</span>
                  <strong className="text-white font-serif text-sm">From PKR 85 Lacs</strong>
                </div>
                <div className="bg-[#7b002c]/40 backdrop-blur-md p-3.5 rounded-xl border border-white/20 shadow-md">
                  <span className="text-[10px] text-slate-300 uppercase block font-semibold">Expected Rental ROI</span>
                  <strong className="text-white font-serif text-sm">10% - 12% Annual</strong>
                </div>
              </div>
            </div>

            {/* Right Details & Features */}
            <div className="lg:col-span-7 space-y-6">

              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 text-[#7b002c] bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white">
                  <Sparkles className="w-4 h-4 text-white" /> Crown Jewel of Commercial Architecture
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Faisal Jewels: 26-Story Ultra-Luxury <span className="text-slate-200 italic font-serif">Hotel Apartments & Mall</span>.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Faisal Jewels is Islamabad and Rawalpindi's premier high-rise landmark. Situated at the main entry monument circle of GT Road, offering 5-star serviced apartments, luxury shopping malls, infinity sky pools, and revolving rooftop dining.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-[#7b002c] hover:bg-[#7b002c]/20 transition-all">
                  <Utensils className="w-5 h-5 text-white shrink-0" />
                  <div>
                    <strong className="text-white text-xs block font-bold">Revolving Sky Restaurant</strong>
                    <span className="text-[11px] text-slate-300">360-degree Margalla Hills view</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-[#7b002c] hover:bg-[#7b002c]/20 transition-all">
                  <Waves className="w-5 h-5 text-white shrink-0" />
                  <div>
                    <strong className="text-white text-xs block font-bold">22nd-Floor Infinity Pool</strong>
                    <span className="text-[11px] text-slate-300">Heated indoor rooftop pool</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-[#7b002c] hover:bg-[#7b002c]/20 transition-all">
                  <Building2 className="w-5 h-5 text-white shrink-0" />
                  <div>
                    <strong className="text-white text-xs block font-bold">5-Star Serviced Suites</strong>
                    <span className="text-[11px] text-slate-300">1, 2 & 3 bedroom apartments</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-[#7b002c] hover:bg-[#7b002c]/20 transition-all">
                  <Car className="w-5 h-5 text-white shrink-0" />
                  <div>
                    <strong className="text-white text-xs block font-bold">Multi-Level Smart Parking</strong>
                    <span className="text-[11px] text-slate-300">500+ car basement capacity</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsLeadModalOpen(true)}
                  className="px-6 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 btn-shimmer border border-white/20"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Book Faisal Jewels Apartment</span>
                </button>

                <Link
                  href="/blocks/faisal-jewel-islamabad"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 flex items-center gap-2 transition-all duration-300 hover:scale-105"
                >
                  <span>View Tower Layouts</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </ScrollReveal>


      {/* 4. INTERACTIVE MASTER PLAN MAP PREVIEW */}
      <ScrollReveal className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6 pt-4">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Interactive Map Technology</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c]">
              Live Master Plan Plot Map Viewer
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Click any sector or plot node below to inspect dimensions, availability, orientation, and current market demand price.
            </p>
          </div>

          <Link
            href="/master-plan"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] bg-white hover:bg-slate-100 px-5 py-3 rounded-xl border border-slate-300 shadow-sm transition-all duration-300 hover:scale-105"
          >
            <span>Launch Fullscreen Map</span>
            <ArrowRight className="w-4 h-4 text-[#7b002c]" />
          </Link>
        </div>

        {/* Master Plan Map Viewer */}
        <div className="mt-6">
          <InteractiveMasterPlan />
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
      <ScrollReveal className="bg-slate-950 text-white py-16 px-6 lg:px-12 border-y border-[#7b002c]/40 relative overflow-hidden">
        {/* Luxury Background Glow */}
        <div className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-[#7b002c]/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

          <div className="lg:col-span-5 space-y-4">
            <span className="label-caps text-white font-bold block">Prime Connectivity</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Strategic Location on <span className="text-slate-200 italic">N-5 GT Road Taxila</span>.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Faisal Hills enjoys an enviable geographic location directly on N-5 GT Road, placing residents within quick driving distance to key educational, medical, and transport hubs of Rawalpindi and Islamabad.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">

            {/* Location 1 */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-5 rounded-2xl border border-white/20 hover:border-[#7b002c] hover:bg-[#7b002c]/20 transition-all duration-300 flex items-center justify-between gap-4 shadow-xl group">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#7b002c] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <strong className="text-white block font-serif font-bold text-base leading-tight">
                    Taxila Museum Circle
                  </strong>
                  <span className="text-slate-300 text-xs block mt-1 font-sans">
                    Historical & Cultural Center
                  </span>
                </div>
              </div>
              <span className="bg-[#7b002c] text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-md border border-white/20 shrink-0 whitespace-nowrap">
                5 Mins Drive
              </span>
            </div>

            {/* Location 2 */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-5 rounded-2xl border border-white/20 hover:border-[#7b002c] hover:bg-[#7b002c]/20 transition-all duration-300 flex items-center justify-between gap-4 shadow-xl group">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#7b002c] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <div>
                  <strong className="text-white block font-serif font-bold text-base leading-tight">
                    CPEC / M-1 Motorway
                  </strong>
                  <span className="text-slate-300 text-xs block mt-1 font-sans">
                    Direct Highway Access
                  </span>
                </div>
              </div>
              <span className="bg-[#7b002c] text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-md border border-white/20 shrink-0 whitespace-nowrap">
                10 Mins Drive
              </span>
            </div>

            {/* Location 3 */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-5 rounded-2xl border border-white/20 hover:border-[#7b002c] hover:bg-[#7b002c]/20 transition-all duration-300 flex items-center justify-between gap-4 shadow-xl group">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#7b002c] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <strong className="text-white block font-serif font-bold text-base leading-tight">
                    Islamabad Airport
                  </strong>
                  <span className="text-slate-300 text-xs block mt-1 font-sans">
                    International Terminal
                  </span>
                </div>
              </div>
              <span className="bg-[#7b002c] text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-md border border-white/20 shrink-0 whitespace-nowrap">
                15 Mins Drive
              </span>
            </div>

            {/* Location 4 */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-5 rounded-2xl border border-white/20 hover:border-[#7b002c] hover:bg-[#7b002c]/20 transition-all duration-300 flex items-center justify-between gap-4 shadow-xl group">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#7b002c] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <strong className="text-white block font-serif font-bold text-base leading-tight">
                    Zero Point & Blue Area
                  </strong>
                  <span className="text-slate-300 text-xs block mt-1 font-sans">
                    Capital Business District
                  </span>
                </div>
              </div>
              <span className="bg-[#7b002c] text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-md border border-white/20 shrink-0 whitespace-nowrap">
                20 Mins Drive
              </span>
            </div>

          </div>

        </div>
      </ScrollReveal>


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


      {/* 9. SEO FAQS ACCORDION SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8 pt-4">

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="label-caps text-[#7b002c] font-bold block">Frequently Asked Questions</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#7b002c]">
            Everything You Need To Know About Faisal Hills
          </h2>
          <p className="text-slate-600 text-sm">
            Official answers regarding NOC legality, plot prices, Faisal Jewels booking, and development timelines.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {seoFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left font-serif font-bold text-base md:text-lg text-[#7b002c] flex items-center justify-between gap-4 hover:text-[#9e1245] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-slate-200 text-[#7b002c]' : ''}`}>
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
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

    </div>
  );
}


