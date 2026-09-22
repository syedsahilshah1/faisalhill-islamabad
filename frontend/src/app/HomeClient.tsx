'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2, ShieldCheck, MapPin, Search, ArrowRight, CheckCircle2,
  Sparkles, TrendingUp, Trees, Landmark, Layers, HelpCircle, MessageSquare, PhoneCall, Award, Calculator, Clock, ChevronRight, ChevronDown, ChevronUp, Waves, Utensils, Car, Lock, Compass, Check, FileText, Camera, Maximize2, Image as ImageIcon,
  Trophy, GraduationCap, ShoppingBag, ArrowUpRight, BookOpen, Store, Home, Users, Star, Quote, HeartHandshake, BadgeCheck, Phone,
  ChevronLeft, FileDown, ExternalLink, Shield, CheckCircle
} from 'lucide-react';
import {
  blocksData, plotInventoryData, societyStats, paymentPlansData, initialGalleryData, type GalleryItem, type PlotItem, type BlogItem,
  fetchBlocks, fetchPlots, fetchGallery, fetchSettings, fetchBlogs, submitLead,
  formatPlotPrice,
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
    if (activeGalleryFilter === 'All') return galleryItems;
    return galleryItems.filter(item => item && item.category === activeGalleryFilter);
  }, [galleryItems, activeGalleryFilter]);

  // Dynamic API state loading
  const [blocks, setBlocks] = useState(blocksData);
  const [plots, setPlots] = useState<PlotItem[]>(plotInventoryData);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
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
            src={cms.hero.bgImage || '/images/faisal-hills-arc-monument-2.webp'}
            alt="Faisal Hills Grand Monument Entrance"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 100vw, 1440px"
            quality={90}
            className="object-cover object-center"
          />
        </div>

        {/* Contrast Tint for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-[#070e17] lg:bg-gradient-to-r lg:from-black/90 lg:via-black/65 lg:to-black/40 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#070e17] via-[#070e17]/80 to-transparent pointer-events-none z-10" />

        {/* ======================================================= */}
        {/* DESKTOP HERO VIEW (2-Column inside Hero Section)        */}
        {/* ======================================================= */}
        <div className="hidden lg:flex relative z-10 max-w-[1440px] mx-auto px-8 lg:px-12 min-h-[92vh] items-center pt-28 pb-16">
          <div className="grid grid-cols-12 gap-12 items-center w-full">
            {/* Left Col: Hero Title in One Line */}
            <div className="col-span-7">
              <ScrollReveal direction="up" delay={50}>
                <h1 className="font-serif font-bold text-4xl xl:text-5xl 2xl:text-6xl text-white tracking-tight leading-tight drop-shadow-2xl whitespace-nowrap">
                  {cms.hero.h1 || 'Faisal Hills Islamabad'}
                </h1>
              </ScrollReveal>
            </div>

            {/* Right Col: Booking Form */}
            <div className="col-span-5">
              <ScrollReveal direction="left" delay={100}>
                <div className="p-2 sm:p-4 space-y-5">
                  <div className="border-b border-white/15 pb-4">
                    <span className="font-serif font-extrabold text-2xl xl:text-3xl text-white block drop-shadow-md tracking-tight">
                      {cms.hero.formTitle || 'Book Your Plot / Flat'}
                    </span>
                    <p className="text-xs text-slate-300 mt-1 font-medium drop-shadow-sm">
                      {cms.hero.formSubtitle || 'Get verified 2026 rates, payment plan & plot selection guide.'}
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-6 rounded-2xl text-xs font-bold space-y-2 animate-fadeIn text-center shadow-lg">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                      <p className="text-base font-serif font-bold text-white">Inquiry Submitted Successfully!</p>
                      <p className="font-normal text-emerald-300">Our Faisal Hills sales desk will contact you via WhatsApp shortly.</p>
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
                        <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">WhatsApp Number</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. +92 300 1234567 / +44 / +971"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#7b002c] focus:ring-2 focus:ring-[#7b002c]/30 shadow-xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1.5">Plot Size / Block / Question</label>
                        <textarea
                          rows={2}
                          placeholder="e.g. 10 Marla in Block A, or any question..."
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
                        <span>{cms.hero.trustLine || 'Your information is 100% secure — we reply on WhatsApp.'}</span>
                      </div>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* MOBILE HERO VIEW (Clean Title & Form)                   */}
        {/* ======================================================= */}
        <div className="block lg:hidden relative z-10">
          <div className="relative w-full min-h-[50vh] sm:min-h-[58vh] flex flex-col justify-start overflow-hidden">
            <div className="relative z-10 pt-20 sm:pt-24 text-center px-4 max-w-4xl mx-auto space-y-2">
              <ScrollReveal direction="up" delay={50}>
                {/* Mobile version uses <p> to prevent duplicate <h1> */}
                <p className="font-serif font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight drop-shadow-2xl">
                  {cms.hero.h1 || 'Faisal Hills Islamabad'}
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Mobile Booking Form */}
          <div className="relative z-30 max-w-2xl mx-auto px-4 mt-2 sm:mt-6 pb-14 sm:pb-16 w-full">
            <ScrollReveal direction="up" delay={100}>
              <div className="p-2 sm:p-4 space-y-5">
                <div className="border-b border-white/15 pb-3 text-center sm:text-left">
                  <span className="font-serif font-extrabold text-2xl text-white block drop-shadow-md tracking-tight">
                    {cms.hero.formTitle || 'Book Your Plot / Flat'}
                  </span>
                  <p className="text-xs text-slate-300 mt-1 font-medium drop-shadow-sm">{cms.hero.formSubtitle}</p>
                </div>

                {formSubmitted ? (
                  <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-6 rounded-2xl text-xs font-bold space-y-2 animate-fadeIn text-center shadow-lg">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-serif text-white">Inquiry Submitted Successfully!</h4>
                    <p className="font-normal text-emerald-300">Our Faisal Hills sales desk will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleHeroFormSubmit} className="space-y-3.5 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +92 300 1234567 / +44 / +971"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">Plot Size / Block / Question</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. 10 Marla in Block A, or any question..."
                        value={leadQuery}
                        onChange={(e) => setLeadQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#7b002c] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg transition-all"
                    >
                      Submit Booking Inquiry
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-slate-300 text-[11px] pt-1 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{cms.hero.trustLine || 'Your information is 100% secure — we reply on WhatsApp.'}</span>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2 — STATS BAR (5 Verified Counters with Counting)  */}
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
                  <CountUpNumber end={11823} duration={2000} />
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
                  <CountUpNumber end={7} duration={1500} />
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
                <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-300 tracking-wider uppercase">
                  {cms.statsBand.stat4.label || 'RDA APPROVED NOC'}
                </span>
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
              {cms.projectsByZedem.h2 || 'Our Projects by Zedem International'}
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
      <section className="bg-white py-12 lg:py-16 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">Master-Planned Living</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                {cms.overview.h2 || 'Faisal Hills Islamabad Overview'}
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100}>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                {cms.overview.paragraph}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={150}>
              <Link
                href={cms.overview.linkHref || '/about-us'}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:underline"
              >
                <span>{cms.overview.linkText || 'Discover More About Faisal Hills'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={100}>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={cms.overview.image || '/images/faisal-hills-overview.webp'}
                  alt={cms.overview.imageAlt || 'Faisal Hills Islamabad aerial view with Margalla Hills backdrop'}
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7 — LOCATION SECTION (2-Column with Google Map)    */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200" id="location-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Location Analysis & Details */}
            <div className="lg:col-span-6 space-y-4">
              <ScrollReveal direction="up" delay={50}>
                <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">Strategic Accessibility</span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                  {cms.location.h2 || 'Faisal Hills Islamabad — A Location That Sets It Apart'}
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={100}>
                <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  <p>{cms.location.p1}</p>
                  <div className={`${isLocationExpanded ? 'block' : 'hidden sm:block'} space-y-3`}>
                    <p>{cms.location.p2}</p>
                    <p>{cms.location.p3}</p>
                  </div>
                  {!isLocationExpanded && (
                    <button
                      type="button"
                      onClick={() => setIsLocationExpanded(true)}
                      className="sm:hidden text-xs font-bold text-[#7b002c] underline block pt-1"
                    >
                      Read Full Location Analysis
                    </button>
                  )}
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={150}>
                <Link
                  href={cms.location.linkHref || '/faisal-hills-location'}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:underline pt-2"
                >
                  <span>{cms.location.linkText || 'Explore Complete Location Map & Sector Boundaries'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Right Column: Google Maps Interactive Embed & Live Pin */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="left" delay={100}>
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
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8 — NEARBY LANDMARKS (4 Cards Verified Badges)     */}
      {/* ========================================================= */}
      <section className="bg-white py-12 lg:py-16 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="space-y-2">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">
                {cms.landmarks.label || 'STRATEGIC CONNECTIVITY'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                {cms.landmarks.h2 || 'Nearby Landmarks of Faisal Hills'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                {cms.landmarks.paragraph}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(cms.landmarks.cards || initialHomepageCMS.landmarks.cards).map((lm, idx) => (
              <ScrollReveal key={lm.id || idx} direction="up" delay={idx * 100}>
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
      {/* SECTION 9 — MASTER PLAN MAP VIEWER                         */}
      {/* ========================================================= */}
      <section className="bg-white text-slate-900 py-14 lg:py-20 border-b border-slate-200" id="master-plan-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">Interactive Sector Map</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                {cms.masterPlan.h2 || 'Faisal Hills Master Plan Map'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.masterPlan.paragraph}
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={100}>
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
              <MasterPlanViewer />
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsMapDownloadModalOpen(true)}
              className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>{cms.masterPlan.downloadBtnText || 'Download Master Plan (PDF)'}</span>
            </button>
            <Link
              href="/master-plan"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-full border border-slate-300 transition-all flex items-center gap-2"
            >
              <span>{cms.masterPlan.fullscreenBtnText || 'Launch Fullscreen Map'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10 — BLOCKS & SECTORS SHOWCASE                     */}
      {/* ========================================================= */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-200" id="blocks-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">Sectors & Layouts</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                {cms.blocksSection.h2 || 'Explore Faisal Hills Blocks & Sectors'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.blocksSection.paragraph}
              </p>
            </ScrollReveal>
          </div>

          <ExpandingProjectsShowcase items={defaultFaisalHillsBlocks} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 11 — AVAILABLE PLOTS FOR SALE SHOWCASE             */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-14 lg:py-20 border-b border-slate-200" id="plots-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <ScrollReveal direction="up" delay={50}>
                <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">
                  {cms.plotsForSale.badge || 'VERIFIED INVENTORY & RESALE FILES'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Available Plots & Commercial Units in Faisal Hills
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Browse verified available residential plots, commercial avenues, and luxury apartment suites with exact plot numbers, pricing, and on-ground positions.
                </p>
              </ScrollReveal>
            </div>
            <Link
              href="/plots"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7b002c] hover:underline shrink-0"
            >
              <span>Explore All {plots.length > 0 ? plots.length : 40}+ Plots</span>
              <ArrowRight className="w-4 h-4" />
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
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activePlotTab === tab.id
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
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 12 — HIGH-RISE & COMMERCIAL FLAGSHIPS              */}
      {/* ========================================================= */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">Signature Architecture</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
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
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] hover:underline pt-2"
                  >
                    <span>{cms.flagships.card1.btnText || 'Explore Faisal Jewel'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#7b002c] hover:underline pt-2"
                  >
                    <span>{cms.flagships.card2.btnText || 'Explore Hills Walk'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
          <div className="max-w-3xl space-y-2">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">Financial Structure</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight">
                {cms.paymentPlan.h2 || 'Faisal Hills Islamabad Payment Plan 2026'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.paymentPlan.paragraph}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-xs">01</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{cms.paymentPlan.card1.title || 'Booking Amount'}</h4>
              <p className="text-xs text-slate-600">{cms.paymentPlan.card1.desc}</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-xs">02</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{cms.paymentPlan.card2.title || 'Down Payment'}</h4>
              <p className="text-xs text-slate-600">{cms.paymentPlan.card2.desc}</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-xs">03</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{cms.paymentPlan.card3.title || 'Payment Schedule'}</h4>
              <p className="text-xs text-slate-600">{cms.paymentPlan.card3.desc}</p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-xs">04</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{cms.paymentPlan.card4.title || 'No Hidden Charges'}</h4>
              <p className="text-xs text-slate-600">{cms.paymentPlan.card4.desc}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/faisal-hills-payment-plan"
              className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{cms.paymentPlan.calcBtnText || 'Open Custom Calculator'}</span>
            </Link>
            <button
              onClick={() => setIsPaymentPlanDownloadOpen(true)}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-full border border-slate-300 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-[#7b002c]" />
              <span>{cms.paymentPlan.downloadBtnText || 'Download Plan (PDF)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 14 — 5-STEP BOOKING PROCESS                        */}
      {/* ========================================================= */}
      <StickyHorizontalBookingSteps />

      {/* ========================================================= */}
      {/* SECTION 15 — WHY INVEST (6 Verified Benefits - No CDA)     */}
      {/* ========================================================= */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-200" id="why-invest-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">Buyer Confidence</span>
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
      {/* SECTION 16 — AMENITIES (6 Image Cards)                     */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-14 lg:py-20 border-b border-slate-200" id="amenities-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">Modern Living</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                {cms.amenities.h2 || 'Amenities Designed for Modern Living'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.amenities.paragraph}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(cms.amenities.cards || initialHomepageCMS.amenities.cards).map((am, idx) => (
              <ScrollReveal key={am.id || idx} direction="up" delay={idx * 100}>
                <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col h-full">
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={am.image || '/images/amenities/roads-infrastructure.webp'}
                      alt={am.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                    <h3 className="font-serif font-bold text-base text-slate-900">{am.title}</h3>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {am.bullets?.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 17 — TESTIMONIALS (Clean Initials Badges - No Stock) */}
      {/* ========================================================= */}
      <section className="bg-white py-16 lg:py-24 px-4 sm:px-8 lg:px-12 border-b border-slate-200 overflow-hidden" id="testimonials-section">
        <div className="max-w-[1440px] mx-auto space-y-10">

          <div className="max-w-2xl space-y-2 text-center md:text-left mx-auto md:mx-0">
            <ScrollReveal direction="up" delay={50}>
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block mb-1">
                {cms.testimonials.label || 'CLIENT FEEDBACK'}
              </span>
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
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">On-Ground Reality</span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                {cms.infrastructure.h2 || 'Infrastructure of Faisal Hills'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cms.infrastructure.paragraph}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleInfraScroll('left')}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer border border-slate-200 shadow-xs"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleInfraScroll('right')}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer border border-slate-200 shadow-xs"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={infraSliderRef}
            className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
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
      </section>

      {/* ========================================================= */}
      {/* SECTION 19 — PHOTO GALLERY                                 */}
      {/* ========================================================= */}
      <section className="bg-white py-14 lg:py-20 border-b border-slate-200" id="gallery-section">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">Visual Updates</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              {cms.photoGallery.h2 || 'On-Site Development & Photo Gallery'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {cms.photoGallery.paragraph}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(cms.photoGallery.items || initialHomepageCMS.photoGallery.items).map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xs hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={item.image || '/images/gallery/arc-main-gate.webp'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-serif font-bold text-sm text-slate-900">{item.title}</h3>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 20 — DISCOVER FAISAL TOWN GROUP (5 Stats)          */}
      {/* ========================================================= */}
      <section className="bg-[#4c0215] text-white py-14 lg:py-18 border-b border-[#7b002c]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-amber-300 text-xs font-bold uppercase tracking-widest block">
              {cms.discoverFtStats.label || 'DISCOVER FAISAL HILLS SCALE'}
            </span>
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
              <div className="space-y-2">
                <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">Real Estate News</span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Latest Insights & Buying Guides
                </h2>
              </div>
              <Link href="/blogs" className="text-xs font-bold text-[#7b002c] hover:underline flex items-center gap-1">
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                      <p className="text-xs text-slate-600 line-clamp-2">{b.metaDescription || (b as any).excerpt || ''}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* SECTION 22 — FAQS (8 Accordion Items - Verified RDA)       */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-14 lg:py-20 border-b border-slate-200" id="faqs-section">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[#7b002c] text-xs font-bold uppercase tracking-widest block">
              {cms.faqs.label || 'FAQ\'S'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              {cms.faqs.h2 || 'Frequently Asked Questions (FAQs)'}
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {(cms.faqs.items || initialHomepageCMS.faqs.items).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-serif font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:text-[#7b002c]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#7b002c] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
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
      />
    </div>
  );
}
