'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2, ShieldCheck, MapPin, Search, ArrowRight, CheckCircle2,
  Sparkles, TrendingUp, Trees, Landmark, Layers, HelpCircle, MessageSquare, PhoneCall, Award, Calculator, Clock, ChevronRight, ChevronDown, ChevronUp, Waves, Utensils, Car, Lock, Compass, Check, FileText, Camera, Maximize2, Image as ImageIcon,
  Trophy, GraduationCap, ShoppingBag, ArrowUpRight, BookOpen, Store, Home, Users, Star, Quote, HeartHandshake, BadgeCheck, Phone,
  ChevronLeft, FileDown, ExternalLink, Shield, CheckCircle, Calendar, LayoutGrid, X,
  MessageCircle
} from 'lucide-react';
import {
  blocksData, plotInventoryData, societyStats, paymentPlansData, initialGalleryData, type GalleryItem, type PlotItem, type BlogItem,
  fetchBlocks, fetchPlots, fetchGallery, fetchSettings, fetchBlogs, submitLead,
  formatPlotPrice, initialBlogsData,
  defaultSocialLinks, defaultContactInfo, type SocialLinksData, type ContactInfoData, fetchSettingByKey, formatWhatsAppUrl, formatTelUrl,
  type HomepageCMSData, initialHomepageCMS, fetchHomepageCMS
} from '@/data/faisalHillsData';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MasterPlanViewer = dynamic(() => import('@/components/map/MasterPlanViewer'), {
  ssr: false,
  loading: () => <div className="h-[280px] sm:h-[380px] bg-slate-900/40 rounded-3xl animate-pulse flex items-center justify-center text-slate-500 text-xs">Loading Master Plan Map...</div>
});
const ExpandingProjectsShowcase = dynamic(() => import('@/components/ui/ExpandingProjectsShowcase'), {
  ssr: false,
  loading: () => <div className="h-[360px] bg-slate-900/20 rounded-3xl animate-pulse" />
});
const LeadModal = dynamic(() => import('@/components/ui/LeadModal'), { ssr: false });
const MapDownloadModal = dynamic(() => import('@/components/ui/MapDownloadModal'), { ssr: false });
const PaymentPlanModal = dynamic(() => import('@/components/ui/PaymentPlanModal'), { ssr: false });
import ScrollReveal from '@/components/ui/ScrollReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import StickyHorizontalBookingSteps from '@/components/ui/StickyHorizontalBookingSteps';
import { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';

const getBlockUrl = (blockName: string): string => {
  const b = (blockName || '').toLowerCase();
  if (b.includes('executive')) return '/blocks/executive-block';
  if (b.includes('prime')) return '/blocks/prime-block';
  if (b.includes('gandhara') || b.includes('gandahara')) return '/blocks/gandahara-block';
  if (b.includes('block a') || b.includes('a block')) return '/blocks/block-a';
  if (b.includes('block b') || b.includes('b block')) return '/blocks/block-b';
  if (b.includes('block c') || b.includes('c block')) return '/blocks/block-c';
  if (b.includes('block d') || b.includes('d block')) return '/blocks/block-d';
  if (b.includes('faisal jewel')) return '/blocks/faisal-jewel-islamabad';
  if (b.includes('hills walk') || b.includes('hill walk')) return '/blocks/hills-walk';
  return '/master-plan';
};

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<'all' | 'developed' | 'rising' | 'upcoming'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isMapDownloadModalOpen, setIsMapDownloadModalOpen] = useState(false);
  const [isPaymentPlanLightboxOpen, setIsPaymentPlanLightboxOpen] = useState(false);
  const [isPaymentPlanDownloadOpen, setIsPaymentPlanDownloadOpen] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isWhyChooseExpanded, setIsWhyChooseExpanded] = useState(false);
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);

  // Dynamic CMS State (100% Editable from Superadmin Dashboard)
  const [cms, setCms] = useState<HomepageCMSData>(initialHomepageCMS);

  // Dynamic Contact & Social info synced with Admin Dashboard
  const [contact, setContact] = useState<ContactInfoData>(defaultContactInfo);
  const [socials, setSocials] = useState<SocialLinksData>(defaultSocialLinks);

  useEffect(() => {
    const syncContact = () => {
      if (typeof window !== 'undefined') {
        try {
          const cachedC = localStorage.getItem('faisal_contact_info');
          if (cachedC) setContact(JSON.parse(cachedC));
          const cachedS = localStorage.getItem('faisal_social_links');
          if (cachedS) setSocials(JSON.parse(cachedS));
        } catch (e) { }
      }
    };
    syncContact();

    fetchSettingByKey<SocialLinksData>('social_links').then((data) => {
      if (data) setSocials(data);
    }).catch(console.error);

    fetchSettingByKey<ContactInfoData>('contact_info').then((data) => {
      if (data) setContact(data);
    }).catch(console.error);

    const syncCMS = () => {
      fetchHomepageCMS().then((data) => {
        if (data) setCms(data);
      }).catch(console.error);
    };
    syncCMS();

    if (typeof window !== 'undefined') {
      window.addEventListener('faisal_contact_updated', syncContact);
      window.addEventListener('faisal_homepage_updated', syncCMS);
      return () => {
        window.removeEventListener('faisal_contact_updated', syncContact);
        window.removeEventListener('faisal_homepage_updated', syncCMS);
      };
    }
  }, []);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryData);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<'All' | 'Infrastructure' | 'Towers' | 'Amenities' | 'Entrance'>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0);
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);

  const infraSliderRef = useRef<HTMLDivElement>(null);
  const facilitiesSliderRef = useRef<HTMLDivElement>(null);
  const [activeFacilityFilter, setActiveFacilityFilter] = useState<'all' | 'built' | 'inaugurated' | 'construction' | 'planned'>('all');
  const [facilityViewMode, setFacilityViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedFacilityModal, setSelectedFacilityModal] = useState<any | null>(null);

  const handleInfraScroll = (direction: 'left' | 'right') => {
    if (infraSliderRef.current) {
      const scrollDistance = infraSliderRef.current.clientWidth * 0.75;
      infraSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behavior: 'smooth'
      });
    }
  };

  const handleFacilityScroll = (direction: 'left' | 'right') => {
    if (facilitiesSliderRef.current) {
      const scrollDistance = facilitiesSliderRef.current.clientWidth * 0.75;
      facilitiesSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behavior: 'smooth'
      });
    }
  };

  const allFacilities = useMemo(() => {
    return (cms.amenities?.cards && cms.amenities.cards.length > 0)
      ? cms.amenities.cards
      : initialHomepageCMS.amenities.cards;
  }, [cms.amenities]);

  const facilityCategoryCounts = useMemo(() => {
    let built = 0;
    let inaugurated = 0;
    let construction = 0;
    let planned = 0;

    allFacilities.forEach((f) => {
      const s = (f.statusBadge || '').toLowerCase();
      if (s.includes('operational') || s.includes('built') || s.includes('completed')) built++;
      else if (s.includes('inaugurated') || s.includes('planted')) inaugurated++;
      else if (s.includes('construction') || s.includes('launched') || s.includes('development')) construction++;
      else if (s.includes('planned')) planned++;
    });

    return { all: allFacilities.length, built, inaugurated, construction, planned };
  }, [allFacilities]);

  const filteredFacilities = useMemo(() => {
    if (activeFacilityFilter === 'all') return allFacilities;
    if (activeFacilityFilter === 'built') {
      return allFacilities.filter(f => {
        const s = (f.statusBadge || '').toLowerCase();
        return s.includes('operational') || s.includes('built') || s.includes('completed');
      });
    }
    if (activeFacilityFilter === 'inaugurated') {
      return allFacilities.filter(f => {
        const s = (f.statusBadge || '').toLowerCase();
        return s.includes('inaugurated') || s.includes('planted');
      });
    }
    if (activeFacilityFilter === 'construction') {
      return allFacilities.filter(f => {
        const s = (f.statusBadge || '').toLowerCase();
        return s.includes('construction') || s.includes('launched') || s.includes('development');
      });
    }
    if (activeFacilityFilter === 'planned') {
      return allFacilities.filter(f => {
        const s = (f.statusBadge || '').toLowerCase();
        return s.includes('planned');
      });
    }
    return allFacilities;
  }, [allFacilities, activeFacilityFilter]);

  const filteredGallery = useMemo(() => {
    if (activeGalleryFilter === 'All') return galleryItems;
    return galleryItems.filter(item => item && item.category === activeGalleryFilter);
  }, [galleryItems, activeGalleryFilter]);

  // Dynamic API state loading
  const [blocks, setBlocks] = useState(blocksData);
  const [plots, setPlots] = useState<PlotItem[]>(plotInventoryData);
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogsData);
  const [activePlotTab, setActivePlotTab] = useState<string>('all');

  const displayedPlots = useMemo(() => {
    const list = plots.length > 0 ? plots : plotInventoryData;
    if (activePlotTab === 'all') return list.slice(0, 6);
    if (activePlotTab === 'commercial') return list.filter(p => p.category === 'Commercial' || p.propertyType === 'Commercial').slice(0, 6);
    if (activePlotTab === 'apartments') return list.filter(p => p.category === 'Apartment').slice(0, 6);
    return list.filter(p => p.blockSlug === activePlotTab).slice(0, 6);
  }, [plots, activePlotTab]);

  useEffect(() => {
    fetchBlocks().then(data => setBlocks(data)).catch(console.error);
    fetchPlots().then(data => setPlots(data)).catch(console.error);
    fetchBlogs().then(data => setBlogs(data || [])).catch(console.error);

    const syncGallery = () => {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('faisal_gallery_data');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setGalleryItems(parsed);
            }
          } catch (e) { }
        }
      }
      fetchGallery().then(data => {
        if (data && data.length > 0) setGalleryItems(data);
      }).catch(console.error);
    };

    syncGallery();
    window.addEventListener('faisal_gallery_updated', syncGallery);
    window.addEventListener('faisal_plots_updated', () => {
      fetchPlots().then(data => setPlots(data)).catch(console.error);
    });

    return () => {
      window.removeEventListener('faisal_gallery_updated', syncGallery);
    };
  }, []);

  const [selectedPlotForInquiry, setSelectedPlotForInquiry] = useState<{ block: string; plot: string; interest: string } | null>(null);

  // Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadQuery, setLeadQuery] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleHeroFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      name: leadName || 'Website Visitor',
      phone: leadPhone || 'N/A',
      interest: 'Homepage Hero Inquiry',
      message: leadQuery
    }).then(() => {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
      setLeadName('');
      setLeadPhone('');
      setLeadQuery('');
    }).catch(err => {
      console.error(err);
      setFormSubmitted(true);
    });
  };

  // Helper for avatar initials
  const getInitials = (name: string) => {
    if (!name) return 'FH';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-24 font-sans selection:bg-[#7b002c] selection:text-white">

      {/* ========================================================= */}
      {/* SECTION 1 — HERO & BOOKING FORM                           */}
      {/* ========================================================= */}
      <section className="relative w-full bg-[#070e17] text-white overflow-hidden" id="hero-section">

        {/* Cinematic HD Architectural Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src={cms.hero.bgImage || '/images/faisal-hills-arc-gate.webp'}
            alt="Faisal Hills main entrance on GT Road near Taxila"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 100vw, 1440px"
            quality={90}
            className="object-cover object-center"
          />
        </div>

        {/* Contrast Tint for Readability while keeping background image vivid and clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/45 lg:to-black/25 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#070e17] to-transparent pointer-events-none z-10" />

        {/* ======================================================= */}
        {/* RESPONSIVE HERO VIEW (Single Canonical <h1> for SEO)    */}
        {/* ======================================================= */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 min-h-[85vh] xl:min-h-[88vh] flex items-center pt-24 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            
            {/* Hero Title (Canonical single <h1> for the entire page) */}
            <div className="lg:col-span-7 xl:col-span-8 text-center lg:text-left">
              <ScrollReveal direction="up" delay={50}>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-tight drop-shadow-2xl">
                  {cms.hero.h1 || 'Faisal Hills Islamabad'}
                </h1>
              </ScrollReveal>
            </div>

            {/* Booking Form (Lowered on mobile with mt-28 sm:mt-36 for Arch visibility, aligned right on desktop) */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end mt-28 sm:mt-36 lg:mt-0">
              <ScrollReveal direction="left" delay={100} className="w-full max-w-sm lg:max-w-[360px]">
                <div className="space-y-3.5">
                  <div className="border-b border-white/20 pb-2.5 text-center lg:text-left">
                    <span className="font-serif font-bold text-lg xl:text-xl text-white block drop-shadow-lg tracking-tight">
                      {cms.hero.formTitle || 'Book Your Plot / Flat'}
                    </span>
                    <p className="text-[11px] text-slate-200 mt-0.5 font-medium drop-shadow-md">
                      {cms.hero.formSubtitle || 'Get verified 2026 rates, payment plan & plot selection guide.'}
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 p-4 rounded-xl text-xs font-bold space-y-1 animate-fadeIn text-center shadow-lg">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <p className="text-sm font-serif font-bold text-white">Inquiry Submitted Successfully!</p>
                      <p className="font-normal text-emerald-300 text-[11px]">Our sales desk will contact you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleHeroFormSubmit} className="space-y-2.5 pt-0.5">
                      <div>
                        <label className="block text-[10px] font-bold text-white uppercase tracking-wider mb-1 drop-shadow-sm">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 border border-white/40 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#7b002c] shadow-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-white uppercase tracking-wider mb-1 drop-shadow-sm">WhatsApp Number</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. +92 300 1234567"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 border border-white/40 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#7b002c] shadow-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-white uppercase tracking-wider mb-1 drop-shadow-sm">Plot Size / Block / Question</label>
                        <input
                          type="text"
                          placeholder="e.g. 10 Marla in Block A, or any question..."
                          value={leadQuery}
                          onChange={(e) => setLeadQuery(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 border border-white/40 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#7b002c] shadow-lg"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-95 border border-white/20 cursor-pointer"
                      >
                        Submit Booking Inquiry
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-white/90 text-[10px] pt-0.5 font-medium select-none drop-shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{cms.hero.trustLine || 'Your information is 100% secure — we reply on WhatsApp.'}</span>
                      </div>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2 — STATS BAR (5 Verified Animated Counters)       */}
      {/* ========================================================= */}
      <section className="bg-[#070e17] border-b border-white/10 pt-10 sm:pt-14 pb-10 sm:pb-12 shadow-xs relative z-20" id="stats-section">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center justify-items-center text-center">
            {/* Stat 1 */}
            <ScrollReveal direction="up" delay={50} className="w-full flex justify-center text-center">
              <div className="flex flex-col items-center justify-center space-y-1.5 group text-center mx-auto">
                <div className="w-8 h-8 sm:w-9 sm:h-9 text-rose-300 flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                </div>
                <div className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={11823.5} decimals={1} duration={2000} />
                </div>
                <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-300 tracking-wider uppercase">
                  {cms.statsBand.stat1.label || 'KANALS RDA-APPROVED'}
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 2 */}
            <ScrollReveal direction="up" delay={150} className="w-full flex justify-center text-center">
              <div className="flex flex-col items-center justify-center space-y-1.5 group text-center mx-auto">
                <div className="w-8 h-8 sm:w-9 sm:h-9 text-rose-300 flex items-center justify-center">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                </div>
                <div className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={8} duration={1500} />
                </div>
                <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-300 tracking-wider uppercase">
                  {cms.statsBand.stat2.label || 'PLANNED BLOCKS'}
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 3 */}
            <ScrollReveal direction="up" delay={250} className="w-full col-span-2 md:col-span-1 flex justify-center text-center">
              <div className="flex flex-col items-center justify-center space-y-1.5 group text-center mx-auto">
                <div className="w-8 h-8 sm:w-9 sm:h-9 text-rose-300 flex items-center justify-center">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                </div>
                <div className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={2016} duration={1800} />
                </div>
                <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-300 tracking-wider uppercase">
                  {cms.statsBand.stat3.label || 'LAUNCHED'}
                </span>
              </div>
            </ScrollReveal>

            {/* Stat 4 */}
            <ScrollReveal direction="up" delay={350} className="w-full flex justify-center text-center">
              <div className="flex flex-col items-center justify-center space-y-1.5 group text-center mx-auto">
                <div className="w-8 h-8 sm:w-9 sm:h-9 text-rose-300 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                </div>
                <div className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={100} suffix="%" duration={1800} />
                </div>
                <Link
                  href="/faisal-hills-noc-status"
                  className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-300 tracking-wider uppercase hover:text-white hover:underline transition-colors"
                  title="View verified RDA NOC details and legal status"
                >
                  {cms.statsBand.stat4.label || 'RDA APPROVED NOC'}
                </Link>
              </div>
            </ScrollReveal>

            {/* Stat 5 */}
            <ScrollReveal direction="up" delay={450} className="w-full flex justify-center items-center text-center">
              <div className="flex flex-col items-center justify-center space-y-1.5 group text-center mx-auto">
                <div className="w-8 h-8 sm:w-9 sm:h-9 text-rose-300 flex items-center justify-center">
                  <Trees className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                </div>
                <div className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:scale-105 transition-transform">
                  <CountUpNumber end={32000} suffix="+" duration={2000} />
                </div>
                <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-300 tracking-wider uppercase">
                  {cms.statsBand.stat5.label || 'RESIDENTIAL & COMMERCIAL PLOTS'}
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3 — CHAIRMAN SECTION                              */}
      {/* ========================================================= */}
      <section className="bg-white pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-100 overflow-hidden" id="chairman-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Chairman Bio */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <ScrollReveal direction="up" delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] tracking-tight leading-tight text-center lg:text-left">
                {cms.chairman.h2 || 'Chairman & Founder — Chaudhry Abdul Majeed'}
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <div className="space-y-2 font-sans max-w-xl text-slate-600 text-xs sm:text-sm leading-relaxed mx-auto lg:mx-0">
                <p>
                  {cms.chairman.visibleParagraph}
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
                      {cms.chairman.expandedParagraph}
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

            {/* Discover More Link */}
            <ScrollReveal direction="up" delay={250} className="hidden lg:block">
              <div className="pt-2">
                <Link
                  href={cms.chairman.buttonLink || '/about-us'}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
                >
                  <span>{cms.chairman.buttonText || 'Discover More About Zedem International'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Chairman Image */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
            <ScrollReveal direction="left" delay={200} duration={800}>
              <img
                src={cms.chairman.image || '/chaudhry-abdul-majeed.webp'}
                alt={cms.chairman.imageAlt || 'Chaudhry Abdul Majeed, Chairman of Faisal Town Group and Zedem International'}
                width={420}
                height={475}
                loading="lazy"
                className="w-full max-w-[420px] h-auto object-contain rounded-2xl"
              />
            </ScrollReveal>

            <div className="lg:hidden pt-4 pb-2 text-center w-full flex justify-center">
              <Link
                href={cms.chairman.buttonLink || '/about-us'}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
              >
                <span>{cms.chairman.buttonText || 'Discover More About Zedem International'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
              </Link>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* SECTION 4 — MARQUEE TICKER (8 Verified Items)              */}
        {/* ========================================================= */}
        <div className="bg-white py-4 mt-8 border-y border-slate-100 overflow-hidden select-none flex items-center justify-center">
          <div className="ticker-track gap-12 items-center text-xs sm:text-sm font-serif font-bold tracking-[0.2em] text-[#7b002c] uppercase whitespace-nowrap">
            {(cms.tickerItems && cms.tickerItems.length > 0 ? cms.tickerItems : initialHomepageCMS.tickerItems).concat(cms.tickerItems && cms.tickerItems.length > 0 ? cms.tickerItems : initialHomepageCMS.tickerItems).map((text, idx) => (
              <div key={idx} className="flex items-center gap-12 shrink-0">
                <span className="font-serif tracking-[0.2em]">{text}</span>
                <span className="text-slate-300 font-sans">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5 — OUR PROJECTS BY ZEDEM INTERNATIONAL           */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-10 lg:py-14 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-5 text-center lg:text-left">

          <ScrollReveal direction="up" delay={50}>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#7b002c] tracking-tight text-center lg:text-left">
              {cms.projectsByZedem.h2 || 'Our Projects'}
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 pt-1 w-full">
              {(cms.projectsByZedem.projects || initialHomepageCMS.projectsByZedem.projects).map((proj, idx) => (
                <Link
                  key={idx}
                  href={proj.href}
                  className="bg-white hover:bg-[#7b002c] border border-slate-200 hover:border-[#7b002c] text-slate-800 hover:text-white rounded-full px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.02] active:scale-95 w-full text-center"
                >
                  <span className="font-semibold text-xs tracking-tight truncate">{proj.name}</span>
                </Link>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6 — FAISAL HILLS OVERVIEW                          */}
      {/* ========================================================= */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-100" id="overview-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <ScrollReveal direction="up" delay={50}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight leading-tight">
                  {cms.overview.h2 || 'Faisal Hills Islamabad Overview'}
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {cms.overview.paragraph}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={150}>
                <div className="pt-2">
                  <Link
                    href={cms.overview.linkHref || '/about-us'}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
                  >
                    <span>{cms.overview.linkText || 'Discover More About Faisal Hills'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Image Column (Matching Location Map Card Dimensions) */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="left" delay={100}>
                <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[445px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                  <img
                    src={cms.overview.image || '/images/faisal-hills-overview.webp'}
                    alt={cms.overview.imageAlt || 'Faisal Hills Islamabad aerial view with Margalla Hills backdrop'}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Main Boulevard & Monument Entrance • Margalla Hills</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7 — LOCATION SECTION (2-Column with Google Map)    */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200" id="location-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Google Maps Interactive Embed & Live Pin */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="right" delay={100}>
                <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-xl overflow-hidden space-y-3">
                  <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-150 bg-slate-100">
                    <iframe
                      title="Faisal Hills Islamabad Location Map"
                      src={cms.location.mapEmbedUrl || 'https://maps.google.com/maps?q=Faisal%20Hills%20Taxila&t=&z=13&ie=UTF8&iwloc=&output=embed'}
                      width="100%"
                      height="100%"
                      loading="lazy"
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-1">
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <MapPin className="w-4 h-4 text-[#7b002c] shrink-0" />
                      <span>Main GT Road N-5, Near Taxila & Margalla Hills</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Faisal+Hills+Taxila"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Maps</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Location Analysis & Details */}
            <div className="lg:col-span-6 space-y-4">
              <ScrollReveal direction="up" delay={50}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                  {cms.location.h2 || 'Faisal Hills Islamabad: Main GT Road near Taxila'}
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={100}>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {cms.location.p1}
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={150}>
                <div className="pt-2">
                  <Link
                    href={cms.location.linkHref || '/faisal-hills-location'}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
                  >
                    <span>{cms.location.linkText || 'Explore Complete Location Map & Sector Boundaries'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Getting There Route Connectivity Table */}
          <ScrollReveal direction="up" delay={150}>
            <div className="mt-10 pt-8 border-t border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#7b002c] tracking-tight">
                    {cms.gettingThere?.h3 || 'Getting There'}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Verified travel estimates from Faisal Hills entrance
                </p>
              </div>

              {/* Responsive Routes Table with Grid Borders */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[#7b002c] uppercase font-bold text-[11px] sm:text-xs tracking-wider">
                        <th className="py-3.5 px-5 sm:px-6 text-left border-r border-slate-200 w-[30%]">Route</th>
                        <th className="py-3.5 px-5 sm:px-6 text-left border-r border-slate-200 w-[45%]">Connects You To</th>
                        <th className="py-3.5 px-5 sm:px-6 text-center w-[25%]">Drive Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {(cms.gettingThere?.routes || initialHomepageCMS.gettingThere?.routes || []).map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-4 px-5 sm:px-6 font-bold text-slate-900 text-left border-r border-slate-200 align-middle">
                            {row.route}
                          </td>
                          <td className="py-4 px-5 sm:px-6 text-slate-600 text-left border-r border-slate-200 align-middle">
                            {row.connects}
                          </td>
                          <td className="py-4 px-5 sm:px-6 text-center font-bold text-[#7b002c] align-middle whitespace-nowrap">
                            {row.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8 — NEARBY LANDMARKS (5 Cards Verified Badges)     */}
      {/* ========================================================= */}
      <section className="bg-white py-12 lg:py-16 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl">
            <ScrollReveal direction="up" delay={50} className="space-y-2.5 sm:space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                {cms.landmarks.h2 || 'Nearby Landmarks of Faisal Hills'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.landmarks.paragraph}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {(cms.landmarks.cards || initialHomepageCMS.landmarks.cards).map((lm, idx) => (
              <ScrollReveal key={lm.id || idx} direction="up" delay={idx * 80}>
                <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all group flex flex-col h-full">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={lm.image || '/images/landmarks/islamabad-zero-point.webp'}
                      alt={lm.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-[#7b002c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                      {lm.timeBadge}
                    </span>
                  </div>
                  <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                        {lm.title}
                      </h3>
                      <p className="text-[11px] text-slate-500">{lm.subLine}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9 — MASTER PLAN MAP VIEWER (2-Column Layout)       */}
      {/* ========================================================= */}
      <section className="bg-slate-50 text-slate-900 py-14 lg:py-20 border-b border-slate-200" id="master-plan-section">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Master Plan Content & Actions */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <ScrollReveal direction="up" delay={50}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight leading-tight">
                  {cms.masterPlan.h2 || 'Faisal Hills Master Plan Map'}
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {cms.masterPlan.paragraph || 'The official RDA-approved master plan of Faisal Hills Islamabad encompasses 11,823.5 kanals across eight well-planned sectors.'}
                </p>
                {cms.masterPlan.subParagraph ? (
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2.5">
                    {cms.masterPlan.subParagraph}
                  </p>
                ) : null}
              </ScrollReveal>

              {/* Call-to-Action Buttons */}
              <ScrollReveal direction="up" delay={150}>
                <div className="space-y-3.5 pt-2">
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsMapDownloadModalOpen(true)}
                      className="px-6 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer group"
                    >
                      <FileDown className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                      <span>{cms.masterPlan.downloadBtnText || 'Download Master Plan (PDF)'}</span>
                    </button>
                  </div>

                  <div>
                    <Link
                      href="/master-plan"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
                    >
                      <span>{cms.masterPlan.fullscreenBtnText || 'Launch Fullscreen Map'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Compact Interactive Ultra-HD Map Viewer */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="left" delay={100}>
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                  <MasterPlanViewer heightClass="h-[340px] sm:h-[420px] lg:h-[460px]" />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10 — BLOCKS & SECTORS SHOWCASE                     */}
      {/* ========================================================= */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-200" id="blocks-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl">
            <ScrollReveal direction="up" delay={50} className="space-y-2.5 sm:space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                {cms.blocksSection.h2 || 'Explore Faisal Hills Blocks & Sectors'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.blocksSection.paragraph}
              </p>
            </ScrollReveal>
          </div>

          <ExpandingProjectsShowcase items={defaultFaisalHillsBlocks} />

          {/* Blocks, Possession and Plot Supply Matrix */}
          <div className="pt-8 sm:pt-12 border-t border-slate-100 space-y-6">
            <div className="max-w-3xl">
              <ScrollReveal direction="up" delay={50} className="space-y-2.5 sm:space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7b002c]/10 text-[#7b002c] text-xs font-bold uppercase tracking-widest">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Master Plan Breakdown</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#7b002c] tracking-tight">
                  {cms.blocksSection.supplyHeading || 'Blocks, Possession and Plot Supply'}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {cms.blocksSection.supplySubline || 'The Faisal Hills master plan has eight blocks. Blocks nearest the GT Road are the most developed; blocks further in are newer, cheaper to enter and mostly sold on installments, but at earlier stages of development.'}
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={100}>
              {/* Desktop / Tablet Table View */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[#7b002c] uppercase font-bold text-[11px] sm:text-xs tracking-wider">
                        <th className="py-3.5 px-5 border-r border-slate-200">Block</th>
                        <th className="py-3.5 px-5 border-r border-slate-200">Profile &amp; Orientation</th>
                        <th className="py-3.5 px-5 whitespace-nowrap text-center border-r border-slate-200">Approx. Residential Plots</th>
                        <th className="py-3.5 px-5 whitespace-nowrap text-center border-r border-slate-200">Sold As</th>
                        <th className="py-3.5 px-5 border-r border-slate-200">Possession Status</th>
                        <th className="py-3.5 px-5 text-center">Inquire</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-sans">
                      {(cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || []).map((row, idx) => {
                        const posLower = (row.possession || '').toLowerCase();
                        let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                        let badgeIcon = <Clock className="w-3 h-3 text-slate-500" />;

                        if (posLower.includes('available') || posLower.includes('residents')) {
                          badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                          badgeIcon = <CheckCircle2 className="w-3 h-3 text-emerald-600" />;
                        } else if (posLower.includes('possession-ready') || posLower.includes('sector')) {
                          badgeStyle = 'bg-teal-50 text-teal-800 border-teal-200';
                          badgeIcon = <Check className="w-3 h-3 text-teal-600" />;
                        } else if (posLower.includes('under development') || posLower.includes('installments')) {
                          badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200';
                          badgeIcon = <Clock className="w-3 h-3 text-amber-600" />;
                        } else if (posLower.includes('not yet') || posLower.includes('progress')) {
                          badgeStyle = 'bg-sky-50 text-sky-800 border-sky-200';
                          badgeIcon = <Compass className="w-3 h-3 text-sky-600" />;
                        }

                        return (
                          <tr key={row.id || idx} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-4 px-5 align-middle border-r border-slate-200">
                              <Link
                                href={getBlockUrl(row.block)}
                                className="font-serif font-bold text-sm text-slate-900 hover:text-[#7b002c] hover:underline transition-colors block"
                                title={`View ${row.block} overview and plot rates`}
                              >
                                {row.block}
                              </Link>
                              {row.statusBadge && (
                                <span className="inline-block mt-0.5 text-[10px] font-semibold text-[#7b002c]">
                                  {row.statusBadge}
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-5 text-slate-600 align-middle max-w-xs leading-relaxed border-r border-slate-200">
                              {row.profile}
                            </td>
                            <td className="py-4 px-5 align-middle text-center whitespace-nowrap border-r border-slate-200">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                                {row.approxPlots}
                              </span>
                            </td>
                            <td className="py-4 px-5 align-middle text-center whitespace-nowrap border-r border-slate-200">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${row.soldAs.toLowerCase().includes('lump')
                                ? 'bg-rose-50 text-[#7b002c] border border-rose-100'
                                : 'bg-indigo-50 text-indigo-800 border border-indigo-100'
                                }`}>
                                {row.soldAs}
                              </span>
                            </td>
                            <td className="py-4 px-5 align-middle border-r border-slate-200">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeStyle}`}>
                                {badgeIcon}
                                <span>{row.possession}</span>
                              </span>
                            </td>
                            <td className="py-4 px-5 align-middle text-center whitespace-nowrap">
                              <a
                                href={formatWhatsAppUrl(
                                  contact.salesHotline || socials.whatsapp,
                                  `Hello, I would like to inquire about plot availability, current rates and possession status in ${row.block}, Faisal Hills Islamabad.`
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold shadow-xs transition"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>Check Rates</span>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card Grid View */}
              <div className="grid grid-cols-1 gap-3.5 md:hidden">
                {(cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || []).map((row, idx) => {
                  const posLower = (row.possession || '').toLowerCase();
                  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                  let badgeIcon = <Clock className="w-3 h-3 text-slate-500" />;

                  if (posLower.includes('available') || posLower.includes('residents')) {
                    badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                    badgeIcon = <CheckCircle2 className="w-3 h-3 text-emerald-600" />;
                  } else if (posLower.includes('possession-ready') || posLower.includes('sector')) {
                    badgeStyle = 'bg-teal-50 text-teal-800 border-teal-200';
                    badgeIcon = <Check className="w-3 h-3 text-teal-600" />;
                  } else if (posLower.includes('under development') || posLower.includes('installments')) {
                    badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200';
                    badgeIcon = <Clock className="w-3 h-3 text-amber-600" />;
                  } else if (posLower.includes('not yet') || posLower.includes('progress')) {
                    badgeStyle = 'bg-sky-50 text-sky-800 border-sky-200';
                    badgeIcon = <Compass className="w-3 h-3 text-sky-600" />;
                  }

                  return (
                    <div
                      key={row.id || idx}
                      className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <div>
                          <Link
                            href={getBlockUrl(row.block)}
                            className="font-serif font-bold text-base text-slate-900 hover:text-[#7b002c] hover:underline transition-colors block"
                            title={`View ${row.block} overview and plot rates`}
                          >
                            {row.block}
                          </Link>
                          {row.statusBadge && (
                            <span className="text-[10px] font-semibold text-[#7b002c]">
                              {row.statusBadge}
                            </span>
                          )}
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeStyle}`}>
                          {badgeIcon}
                          <span>{row.possession}</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {row.profile}
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-500 uppercase font-bold block">Plots</span>
                          <span className="font-bold text-slate-800">{row.approxPlots}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-500 uppercase font-bold block">Sold As</span>
                          <span className="font-bold text-slate-800">{row.soldAs}</span>
                        </div>
                      </div>

                      <a
                        href={formatWhatsAppUrl(
                          contact.salesHotline || socials.whatsapp,
                          `Hello, I would like to inquire about plot availability, current rates and possession status in ${row.block}, Faisal Hills Islamabad.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-1.5 text-center"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Inquire About {row.block}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 11 — AVAILABLE PLOTS FOR SALE SHOWCASE             */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-14 lg:py-20 border-b border-slate-200" id="plots-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl">
              <ScrollReveal direction="up" delay={50} className="space-y-2.5 sm:space-y-3">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                  Available Plots & Commercial Units in Faisal Hills
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Browse verified available residential plots, commercial avenues, and luxury apartment suites with exact plot numbers, pricing, and on-ground positions.
                </p>
              </ScrollReveal>
            </div>
            <Link
              href="/plots"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group shrink-0"
            >
              <span>Explore All {plots.length > 0 ? plots.length : 40}+ Plots</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform font-bold" />
            </Link>
          </div>


          {/* Block / Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { label: 'All Inventory', id: 'all' },
              { label: 'Executive Block', id: 'executive-block' },
              { label: 'Block A', id: 'block-a' },
              { label: 'Block B', id: 'block-b' },
              { label: 'Prime Block', id: 'prime-block' },
              { label: 'Commercial Units', id: 'commercial' },
              { label: 'Luxury Flats', id: 'apartments' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePlotTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${activePlotTab === tab.id
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Plot Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedPlots.map((plot) => (
              <div
                key={plot.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group justify-between"
              >
                {/* Top Image & Badges */}
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={plot.image || '/images/faisal-hills-overview.webp'}
                      alt={plot.plotNumber || plot.blockName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#7b002c] text-white shadow-md">
                        {plot.blockName}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-400 text-slate-950 shadow-md">
                        {plot.category === 'Apartment' ? 'Luxury Flat' : plot.category}
                      </span>
                    </div>

                    {/* Bottom Plot Number & Facing */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-[11px] font-mono font-bold text-white bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-xs border border-white/20">
                        #{plot.plotNumber || 'PLOT'}
                      </span>
                      {plot.facing && (
                        <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                          {plot.facing}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Size & Dimensions</span>
                        <span className="font-serif font-bold text-base text-slate-900">
                          {plot.size} {plot.dimensions ? `(${plot.dimensions})` : ''}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 font-medium block">Demand Price</span>
                        <span className="font-serif font-bold text-lg sm:text-xl text-[#7b002c]">
                          {plot.priceFormatted || (plot.price ? formatPlotPrice(plot.price) : 'Call for Price')}
                        </span>
                      </div>
                    </div>

                    {plot.priceHistoryTrend && (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                        <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                        <span>{plot.priceHistoryTrend}</span>
                      </div>
                    )}

                    {plot.features && plot.features.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                        {plot.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlotForInquiry({
                        block: plot.blockName,
                        plot: plot.plotNumber || '',
                        interest: `Inquiry for Plot #${plot.plotNumber} (${plot.blockName}, ${plot.size})`
                      });
                      setIsLeadModalOpen(true);
                    }}
                    className="flex-1 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book / Inquire</span>
                  </button>
                  <Link
                    href={`/plots/${plot.id}`}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all flex items-center justify-center"
                    title="View Full Plot Specs"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Quick Action Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
                {cms.plotsForSale.ctaHeading || 'Looking for a Specific Plot Number or Corner Position?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {cms.plotsForSale.ctaText || 'Our sales desk maintains real-time access to complete ledger files, corner plots, and park-facing inventories across all blocks.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={formatWhatsAppUrl(socials.whatsapp, 'Hi Faisal Hills Sales Desk, I want to inquire about available plots and resale files.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{cms.plotsForSale.ctaBtn1Text || 'WHATSAPP SALES DESK'}</span>
              </a>
              <Link
                href="/plots"
                className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all flex items-center gap-2"
              >
                <span>{cms.plotsForSale.ctaBtn2Text || 'ALL PLOTS DIRECTORY'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Plots for Sale in Faisal Hills: Current Rates Table */}
          <div className="pt-8 sm:pt-12 border-t border-slate-200/80 space-y-6">
            <div className="max-w-3xl">
              <ScrollReveal direction="up" delay={50} className="space-y-2.5 sm:space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#7b002c] tracking-tight">
                  {cms.plotsForSale.ratesHeading || 'Plots for Sale in Faisal Hills: Current Rates'}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {cms.plotsForSale.ratesSubline || 'These are open-market asking prices. What a specific plot fetches depends on its position (corner, park-facing or on a main road), how developed its block is, and whether it is a balloted plot or an unballoted file.'}
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={100}>
              {/* Desktop / Tablet Rates Table */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[#7b002c] uppercase font-bold text-[11px] sm:text-xs tracking-wider">
                        <th className="py-3.5 px-5 border-r border-slate-200">Block</th>
                        <th className="py-3.5 px-5 text-center border-r border-slate-200">5 Marla</th>
                        <th className="py-3.5 px-5 text-center border-r border-slate-200">10 Marla</th>
                        <th className="py-3.5 px-5 text-center border-r border-slate-200">1 Kanal</th>
                        <th className="py-3.5 px-5 text-center">Inquire Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-sans">
                      {(cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || []).map((row, idx) => (
                        <tr key={row.id || idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-4 px-5 align-middle border-r border-slate-200">
                            <span className="font-serif font-bold text-sm text-slate-900 block">
                              {row.block}
                            </span>
                            {row.statusBadge && (
                              <span className="inline-block mt-0.5 text-[10px] font-semibold text-[#7b002c]">
                                {row.statusBadge}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-5 align-middle text-center whitespace-nowrap border-r border-slate-200">
                            {row.marla5 === '—' ? (
                              <span className="text-slate-400 font-bold">—</span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80">
                                {row.marla5}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-5 align-middle text-center whitespace-nowrap border-r border-slate-200">
                            {row.marla10 === '—' ? (
                              <span className="text-slate-400 font-bold">—</span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200/80">
                                {row.marla10}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-5 align-middle text-center whitespace-nowrap border-r border-slate-200">
                            {row.kanal1 === '—' ? (
                              <span className="text-slate-400 font-bold">—</span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-[#7b002c] border border-rose-200/80">
                                {row.kanal1}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-5 align-middle text-center whitespace-nowrap">
                            <a
                              href={formatWhatsAppUrl(
                                contact.salesHotline || socials.whatsapp,
                                `Hello, I want to inquire about current plot asking rates and verified files in ${row.block}, Faisal Hills Islamabad.`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold shadow-xs transition cursor-pointer"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>Get Deal</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Rates Cards */}
              <div className="grid grid-cols-1 gap-3.5 md:hidden">
                {(cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || []).map((row, idx) => (
                  <div
                    key={row.id || idx}
                    className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <h4 className="font-serif font-bold text-base text-slate-900">
                        {row.block}
                      </h4>
                      {row.statusBadge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7b002c]/10 text-[#7b002c]">
                          {row.statusBadge}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-0.5">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">5 Marla</span>
                        <span className="font-bold text-amber-900 text-[11px] block">{row.marla5}</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-0.5">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">10 Marla</span>
                        <span className="font-bold text-emerald-900 text-[11px] block">{row.marla10}</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-0.5">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">1 Kanal</span>
                        <span className="font-bold text-[#7b002c] text-[11px] block">{row.kanal1}</span>
                      </div>
                    </div>

                    <a
                      href={formatWhatsAppUrl(
                        contact.salesHotline || socials.whatsapp,
                        `Hello, I want to inquire about current plot asking rates and verified files in ${row.block}, Faisal Hills Islamabad.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-1.5 text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire Rate for {row.block}</span>
                    </a>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 12 — HIGH-RISE & COMMERCIAL FLAGSHIPS              */}
      {/* ========================================================= */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl">
            <ScrollReveal direction="up" delay={50} className="space-y-2.5 sm:space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                {cms.flagships.h2 || 'Faisal Hills High-Rise & Commercial Flagships'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.flagships.paragraph}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Faisal Jewel */}
            <ScrollReveal direction="up" delay={100}>
              <div className="rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 shadow-md hover:shadow-xl transition-all group flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={cms.flagships.card1.image || '/images/faisal-jewels-tower.webp'}
                    alt={cms.flagships.card1.alt || 'Faisal Jewel 27-storey high-rise tower in Faisal Hills Islamabad'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#7b002c] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {cms.flagships.card1.subtitle}
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-xl text-slate-900">{cms.flagships.card1.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{cms.flagships.card1.desc}</p>
                  </div>
                  <Link
                    href={cms.flagships.card1.btnHref || '/blocks/faisal-jewel-islamabad'}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group w-fit pt-2"
                  >
                    <span>{cms.flagships.card1.btnText || 'Explore Faisal Jewel'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Hills Walk */}
            <ScrollReveal direction="up" delay={200}>
              <div className="rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 shadow-md hover:shadow-xl transition-all group flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={cms.flagships.card2.image || '/images/hills-walk.webp'}
                    alt={cms.flagships.card2.alt || 'Hills Walk open-air commercial boulevard in Faisal Hills'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {cms.flagships.card2.subtitle}
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-xl text-slate-900">{cms.flagships.card2.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{cms.flagships.card2.desc}</p>
                  </div>
                  <Link
                    href={cms.flagships.card2.btnHref || '/blocks/hills-walk'}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group w-fit pt-2"
                  >
                    <span>{cms.flagships.card2.btnText || 'Explore Hills Walk'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 13 — PAYMENT PLAN 2026 (No Hidden Charges)         */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-14 lg:py-20 border-b border-slate-200" id="payment-plan-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl">
            <ScrollReveal direction="up" delay={50} className="space-y-2.5 sm:space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                {cms.paymentPlan.h2 || 'Faisal Hills Islamabad Payment Plan 2026'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.paymentPlan.paragraph}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col items-center text-center">
              <span className="w-7 h-7 rounded-full bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-xs">01</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{cms.paymentPlan.card1.title || 'Booking Amount'}</h4>
              <p className="text-xs text-slate-600">{cms.paymentPlan.card1.desc}</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col items-center text-center">
              <span className="w-7 h-7 rounded-full bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-xs">02</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{cms.paymentPlan.card2.title || 'Down Payment'}</h4>
              <p className="text-xs text-slate-600">{cms.paymentPlan.card2.desc}</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col items-center text-center">
              <span className="w-7 h-7 rounded-full bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-xs">03</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{cms.paymentPlan.card3.title || 'Payment Schedule'}</h4>
              <p className="text-xs text-slate-600">{cms.paymentPlan.card3.desc}</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col items-center text-center">
              <span className="w-7 h-7 rounded-full bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-xs">04</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{cms.paymentPlan.card4.title || 'No Hidden Charges'}</h4>
              <p className="text-xs text-slate-600">{cms.paymentPlan.card4.desc}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setIsPaymentPlanDownloadOpen(true)}
              className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-white" />
              <span>{cms.paymentPlan.downloadBtnText || 'Download Plan (PDF)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 14 — 5-STEP BOOKING PROCESS                        */}
      {/* ========================================================= */}
      <StickyHorizontalBookingSteps data={cms.bookingSteps} />

      {/* ========================================================= */}
      {/* SECTION 15 — WHY INVEST (6 Verified Benefits - No CDA)     */}
      {/* ========================================================= */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-200" id="why-invest-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl">
            <ScrollReveal direction="up" delay={50} className="space-y-2.5 sm:space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                {cms.whyInvest.h2 || 'Why Faisal Hills Is a Smart Property Investment in 2026'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.whyInvest.paragraph}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(cms.whyInvest.benefits || initialHomepageCMS.whyInvest.benefits).map((b, idx) => (
              <ScrollReveal key={b.id || idx} direction="up" delay={idx * 80}>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs hover:shadow-lg transition-all h-full flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-lg text-[#7b002c]">{b.number}</span>
                      {b.tag && <span className="text-[10px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">{b.tag}</span>}
                    </div>
                    <h3 className="font-serif font-bold text-base text-slate-900">{b.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 16 — FACILITIES & PROJECTS: BUILT & PLANNED         */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-14 lg:py-20 border-b border-slate-200 overflow-hidden" id="amenities-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">

          {/* Header & Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2.5">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                {cms.amenities?.h2 || 'Facilities and Projects: Built and Planned'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.amenities?.paragraph || 'Explore the on-ground built reality and upcoming landmark developments across Faisal Hills.'}
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-end">
              <div className="bg-white border border-slate-200 p-1 rounded-full flex items-center shadow-2xs">
                <button
                  type="button"
                  onClick={() => setFacilityViewMode('carousel')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${facilityViewMode === 'carousel'
                    ? 'bg-[#7b002c] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                  title="Carousel Slider View"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Slider</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFacilityViewMode('grid')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${facilityViewMode === 'grid'
                    ? 'bg-[#7b002c] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                  title="Grid Matrix View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => setActiveFacilityFilter('all')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${activeFacilityFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
            >
              <span>All Facilities</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeFacilityFilter === 'all' ? 'bg-white/20' : 'bg-slate-100'}`}>
                {facilityCategoryCounts.all}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFacilityFilter('built')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${activeFacilityFilter === 'built'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
                }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Built &amp; Operational</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeFacilityFilter === 'built' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-800'}`}>
                {facilityCategoryCounts.built}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFacilityFilter('construction')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${activeFacilityFilter === 'construction'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-300'
                }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Under Construction</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeFacilityFilter === 'construction' ? 'bg-white/20' : 'bg-amber-50 text-amber-800'}`}>
                {facilityCategoryCounts.construction}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFacilityFilter('inaugurated')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${activeFacilityFilter === 'inaugurated'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300'
                }`}
            >
              <Trees className="w-3.5 h-3.5 text-teal-500" />
              <span>Inaugurated &amp; Eco-Forest</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeFacilityFilter === 'inaugurated' ? 'bg-white/20' : 'bg-teal-50 text-teal-800'}`}>
                {facilityCategoryCounts.inaugurated}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFacilityFilter('planned')}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${activeFacilityFilter === 'planned'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-sky-300'
                }`}
            >
              <Compass className="w-3.5 h-3.5 text-sky-500" />
              <span>Planned &amp; Future</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeFacilityFilter === 'planned' ? 'bg-white/20' : 'bg-sky-50 text-sky-800'}`}>
                {facilityCategoryCounts.planned}
              </span>
            </button>
          </div>

          {/* CAROUSEL VIEW (Default: Non-boring Horizontal Flow with Floating Side Arrows) */}
          {facilityViewMode === 'carousel' ? (
            <div className="relative group/facility-slider">
              {/* Floating Left Arrow (<) */}
              <button
                type="button"
                onClick={() => handleFacilityScroll('left')}
                className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center transition-all duration-300 shadow-xl border border-slate-200/90 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md hover:text-[#7b002c] hover:border-[#7b002c]/30"
                aria-label="Previous facility"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Floating Right Arrow (>) */}
              <button
                type="button"
                onClick={() => handleFacilityScroll('right')}
                className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center transition-all duration-300 shadow-xl border border-slate-200/90 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md hover:text-[#7b002c] hover:border-[#7b002c]/30"
                aria-label="Next facility"
                title="Next"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Slider Track */}
              <div
                ref={facilitiesSliderRef}
                className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 px-1 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
              >
                {filteredFacilities.map((am, idx) => {
                  const status = am.statusBadge || '';
                  const sLower = status.toLowerCase();
                  let badgeBg = 'bg-slate-900 text-white';
                  let badgeIcon = <CheckCircle2 className="w-3 h-3 text-emerald-300" />;

                  if (sLower.includes('operational') || sLower.includes('built') || sLower.includes('completed')) {
                    badgeBg = 'bg-emerald-700 text-white';
                    badgeIcon = <CheckCircle2 className="w-3 h-3 text-white" />;
                  } else if (sLower.includes('inaugurated') || sLower.includes('planted')) {
                    badgeBg = 'bg-teal-700 text-white';
                    badgeIcon = <Trees className="w-3 h-3 text-white" />;
                  } else if (sLower.includes('under construction') || sLower.includes('launched') || sLower.includes('development')) {
                    badgeBg = 'bg-amber-600 text-white';
                    badgeIcon = <Clock className="w-3 h-3 text-white" />;
                  } else if (sLower.includes('planned')) {
                    badgeBg = 'bg-sky-700 text-white';
                    badgeIcon = <Compass className="w-3 h-3 text-white" />;
                  }

                  return (
                    <div
                      key={am.id || idx}
                      onClick={() => setSelectedFacilityModal(am)}
                      className="shrink-0 w-[280px] sm:w-[320px] md:w-[360px] bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-slate-300 snap-start flex flex-col group transition-all duration-300 cursor-pointer"
                    >
                      {/* Top Image Box */}
                      <div className="h-48 relative overflow-hidden bg-slate-100">
                        <img
                          src={am.image || '/images/amenities/roads-infrastructure.webp'}
                          alt={am.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                        {/* Small Option at Top of Image (Status Label) */}
                        {status && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase shadow-md backdrop-blur-xs ${badgeBg}`}>
                              {badgeIcon}
                              <span>{status}</span>
                            </span>
                          </div>
                        )}

                        {/* Quick Inspect Button on Top Right */}
                        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="w-7 h-7 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs hover:bg-white">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-1.5">
                          <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#7b002c] transition-colors line-clamp-2 leading-snug">
                            {am.title}
                          </h3>
                          {am.desc && (
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">
                              {am.desc}
                            </p>
                          )}
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-[#7b002c] border-t border-slate-100">
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* COMPACT GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredFacilities.map((am, idx) => {
                const status = am.statusBadge || '';
                const sLower = status.toLowerCase();
                let badgeBg = 'bg-slate-900 text-white';
                let badgeIcon = <CheckCircle2 className="w-3 h-3 text-emerald-300" />;

                if (sLower.includes('operational') || sLower.includes('built') || sLower.includes('completed')) {
                  badgeBg = 'bg-emerald-700 text-white';
                  badgeIcon = <CheckCircle2 className="w-3 h-3 text-white" />;
                } else if (sLower.includes('inaugurated') || sLower.includes('planted')) {
                  badgeBg = 'bg-teal-700 text-white';
                  badgeIcon = <Trees className="w-3 h-3 text-white" />;
                } else if (sLower.includes('under construction') || sLower.includes('launched') || sLower.includes('development')) {
                  badgeBg = 'bg-amber-600 text-white';
                  badgeIcon = <Clock className="w-3 h-3 text-white" />;
                } else if (sLower.includes('planned')) {
                  badgeBg = 'bg-sky-700 text-white';
                  badgeIcon = <Compass className="w-3 h-3 text-white" />;
                }

                return (
                  <div
                    key={am.id || idx}
                    onClick={() => setSelectedFacilityModal(am)}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-slate-300 flex flex-col group transition-all duration-300 cursor-pointer"
                  >
                    <div className="h-44 relative overflow-hidden bg-slate-100">
                      <img
                        src={am.image || '/images/amenities/roads-infrastructure.webp'}
                        alt={am.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                      {status && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-md backdrop-blur-xs ${badgeBg}`}>
                            {badgeIcon}
                            <span>{status}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-[#7b002c] transition-colors line-clamp-2 leading-snug">
                          {am.title}
                        </h3>
                        {am.desc && (
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">
                            {am.desc}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-[#7b002c] border-t border-slate-100">
                        <span>Details &amp; Status</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* QUICK FACILITY DETAIL MODAL */}
      {selectedFacilityModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-60 bg-slate-900">
              <img
                src={selectedFacilityModal.image || '/images/amenities/roads-infrastructure.webp'}
                alt={selectedFacilityModal.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedFacilityModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              {selectedFacilityModal.statusBadge && (
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 bg-[#7b002c] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                    {selectedFacilityModal.statusBadge}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-serif font-bold text-xl text-slate-900 leading-snug">
                  {selectedFacilityModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {selectedFacilityModal.desc}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={formatWhatsAppUrl(socials.whatsapp, `Hi, I would like to know more about ${selectedFacilityModal.title} in Faisal Hills.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFacilityModal(null);
                    setIsLeadModalOpen(true);
                  }}
                  className="flex-1 py-3 bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center transition cursor-pointer"
                >
                  Book Site Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 17 — TESTIMONIALS (Clean Initials Badges - No Stock) */}
      {/* ========================================================= */}
      <section className="bg-white py-16 lg:py-24 px-4 sm:px-8 lg:px-12 border-b border-slate-200 overflow-hidden" id="testimonials-section">
        <div className="max-w-[1440px] mx-auto space-y-10">

          <div className="max-w-2xl space-y-2 text-center md:text-left mx-auto md:mx-0">
            <ScrollReveal direction="up" delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] tracking-tight leading-tight text-center md:text-left">
                {cms.testimonials.h2 || 'What Our Buyers Say'}
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans text-center md:text-left">
                {cms.testimonials.paragraph}
              </p>
            </ScrollReveal>
          </div>

          {/* Testimonial Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(cms.testimonials.items || initialHomepageCMS.testimonials.items).map((review, idx) => (
              <ScrollReveal key={review.id || idx} direction="up" delay={idx * 120}>
                <div className="bg-slate-50 text-slate-900 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl relative transition-all duration-300 hover:-translate-y-1 border border-slate-200 h-full flex flex-col justify-between">
                  <div>
                    {/* Top Row with Initials Badge */}
                    <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7b002c] to-[#4c0215] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0 shadow-md">
                        {getInitials(review.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif font-bold text-base text-slate-900 truncate">
                            {review.name}
                          </h3>
                          {review.verified && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium block truncate">
                          {review.locationOrType}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating & Block badge */}
                    <div className="flex items-center justify-between pt-3.5">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: review.rating || 5 }).map((_, rIdx) => (
                          <Star key={rIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {review.plotOrBlock && (
                        <span className="text-[10px] font-bold text-[#7b002c] bg-rose-50 px-2.5 py-0.5 rounded-full">
                          {review.plotOrBlock}
                        </span>
                      )}
                    </div>

                    {/* Review Quote Body */}
                    <div className="mt-3">
                      <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed italic">
                        &quot;{review.review}&quot;
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 text-[10px] text-slate-400 font-medium">
                    Verified Booking • {review.date || '2026'}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 18 — INFRASTRUCTURE CAROUSEL (8 Cards)             */}
      {/* ========================================================= */}
      <section className="bg-white text-slate-900 py-14 lg:py-20 border-b border-slate-200" id="infrastructure-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
              {cms.infrastructure.h2 || 'Infrastructure of Faisal Hills'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {cms.infrastructure.paragraph}
            </p>
          </div>

          {/* Slider Container with Floating Left and Right Navigation Arrows */}
          <div className="relative group/infra-slider">
            {/* Floating Left Arrow (<) */}
            <button
              type="button"
              onClick={() => handleInfraScroll('left')}
              className="absolute -left-3 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center transition-all duration-300 shadow-xl border border-slate-200/90 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs hover:text-[#7b002c] hover:border-[#7b002c]/30"
              aria-label="Previous infrastructure slide"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Floating Right Arrow (>) */}
            <button
              type="button"
              onClick={() => handleInfraScroll('right')}
              className="absolute -right-3 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center transition-all duration-300 shadow-xl border border-slate-200/90 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs hover:text-[#7b002c] hover:border-[#7b002c]/30"
              aria-label="Next infrastructure slide"
              title="Next"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div
              ref={infraSliderRef}
              className="flex gap-4 overflow-x-auto pb-4 px-1 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            >
              {(cms.infrastructure.cards || initialHomepageCMS.infrastructure.cards).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="shrink-0 w-[280px] sm:w-[320px] md:w-[360px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg snap-start flex flex-col group transition-all"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={item.image || '/images/infrastructure/hills-walk-boulevard.webp'}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#7b002c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                      {item.badge}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex items-center bg-white border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-800">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 19 — DISCOVER FAISAL TOWN GROUP (5 Stats)          */}
      {/* ========================================================= */}
      <section className="bg-[#4c0215] text-white py-14 lg:py-18 border-b border-[#7b002c]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              11,823 Kanals of Master-Planned Living at Margalla Foothills
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-4">
            {(cms.discoverFtStats.stats || initialHomepageCMS.discoverFtStats.stats).map((st, idx) => (
              <div key={idx} className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-amber-300 block">{st.number}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-200 tracking-wider uppercase block">{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 21 — BLOG SECTION (Latest SEO Articles)            */}
      {/* ========================================================= */}
      {blogs.length > 0 && (
        <section className="bg-white py-14 lg:py-20 border-b border-slate-200" id="blogs-section">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
            <div className="flex items-end justify-between">
              <div className="space-y-2 sm:space-y-3">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                  Latest Insights & Buying Guides
                </h2>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] border-b border-[#7b002c] pb-0.5 transition-all group"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform font-bold" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.slice(0, 3).map((b, idx) => (
                <Link
                  key={b.id || idx}
                  href={`/blogs/${b.slug}`}
                  className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xs hover:shadow-lg transition-all group flex flex-col"
                >
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={b.imageUrl || '/images/blog-placeholder.webp'}
                      alt={b.imageAlt || b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-[#7b002c] uppercase">{b.readTime || '5 min read'}</span>
                      <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-[#7b002c] transition-colors line-clamp-2">
                        {b.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2">{b.metaDescription || (b as any).excerpt || b.summary || ''}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* SECTION 22 — FAQS (Comprehensive Verified RDA FAQs)        */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200" id="faqs-section">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 space-y-10">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] tracking-tight">
              {cms.faqs?.h2 || 'Frequently Asked Questions'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Find clear, verified answers regarding RDA NOC legal status, location, booking plans, plot dimensions, and handover possession in Faisal Hills.
            </p>
          </div>

          <div className="space-y-3.5 max-w-3xl mx-auto">
            {(cms.faqs?.items || initialHomepageCMS.faqs.items).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? 'border-[#7b002c]/40 shadow-md ring-1 ring-[#7b002c]/10'
                    : 'border-slate-200 shadow-xs hover:border-slate-300'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-serif font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:text-[#7b002c] transition-colors"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className={`flex items-center justify-center shrink-0 w-6 h-6 rounded-full text-[11px] font-bold transition-colors ${isOpen ? 'bg-[#7b002c] text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {idx + 1}
                      </span>
                      <span className="leading-snug pt-0.5">{faq.q}</span>
                    </div>
                    <div className={`p-1.5 rounded-full transition-colors shrink-0 ${isOpen ? 'bg-[#7b002c]/10 text-[#7b002c]' : 'bg-slate-100 text-slate-500'
                      }`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100/80 pt-3.5 pl-13 sm:pl-15">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <p className="text-xs sm:text-sm text-slate-500">
              Have a question not answered here?{' '}
              <a
                href={formatWhatsAppUrl(socials.whatsapp, 'Hi, I have a specific question regarding Faisal Hills.')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#7b002c] hover:underline inline-flex items-center gap-1"
              >
                <span>Ask our sales team on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 23 — FINAL CTA                                     */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4" id="contact-section">
        <ScrollReveal direction="pop" delay={100}>
          <div className="rounded-3xl bg-slate-100 text-[#7b002c] p-10 lg:p-14 border border-slate-200 shadow-lg flex flex-col items-center justify-center text-center space-y-6">

            <div className="space-y-3 max-w-2xl">
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#7b002c]">
                {cms.finalCta.h2 || 'Ready to Secure Your Plot in Faisal Hills?'}
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {cms.finalCta.paragraph}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={formatTelUrl(contact.salesHotline)}
                className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>{cms.finalCta.callBtnText || 'Call Now'}</span>
              </a>

              <a
                href={formatWhatsAppUrl(socials.whatsapp, 'Hi, I am ready to secure my plot in Faisal Hills.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>{cms.finalCta.whatsappBtnText || 'WhatsApp'}</span>
              </a>

              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span>{cms.finalCta.visitBtnText || 'Book a Site Visit'}</span>
              </button>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* Booking Lead Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedPlotForInquiry(null);
        }}
        defaultBlock={selectedPlotForInquiry?.block || ''}
      />

      {/* Map Download Modal */}
      <MapDownloadModal
        isOpen={isMapDownloadModalOpen}
        onClose={() => setIsMapDownloadModalOpen(false)}
      />

      {/* Payment Plan Modal */}
      <PaymentPlanModal
        isOpen={isPaymentPlanDownloadOpen}
        onClose={() => setIsPaymentPlanDownloadOpen(false)}
        imageSrc={cms.paymentPlan?.image || '/images/faisal-hills-payment-plan-2026.webp'}
      />
    </div>
  );
}
