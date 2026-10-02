'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Car,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Building2,
  Trees,
  Landmark,
  Phone,
  Sparkles,
  Download,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Maximize2,
  Droplets,
  Layers,
  HelpCircle,
  Clock,
  Compass,
  MessageSquare,
  Home,
  ShoppingBag,
  Zap,
  Activity,
  Check,
  Award,
  Send,
  BadgeCheck,
  ExternalLink,
  Building,
  Navigation,
  Trophy,
  Plane,
  AlertTriangle,
  FileText,
  Scale,
  Shield,
  Info,
  Calendar,
  Eye
} from 'lucide-react';
import LeadModal from '@/components/ui/LeadModal';
import {
  PlotItem,
  fetchPlots,
  submitLead,
  formatPlotPrice,
  BlockBCMSData,
  initialBlockBCMS,
  fetchBlockBCMS,
  mergeBlockBCMS,
  cleanVerifyText
} from '@/data/faisalHillsData';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { DynamicPlotSeriesExplorer } from '@/components/plots/DynamicPlotSeriesExplorer';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';
import FormattedText from '@/components/ui/FormattedText';

export default function BlockBContent() {
  // Live CMS State
  const [cms, setCms] = useState<BlockBCMSData>(initialBlockBCMS);

  // Plot Filters & Interactive States
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
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

  // Fetch Block B CMS on mount + listen for updates
  useEffect(() => {
    fetchBlockBCMS().then((data) => {
      if (data) setCms(mergeBlockBCMS(data));
    });

    const handleUpdate = () => {
      fetchBlockBCMS().then((data) => {
        if (data) setCms(mergeBlockBCMS(data));
      });
    };

    window.addEventListener('faisal_block_b_cms_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('faisal_block_b_cms_updated', handleUpdate);
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
  const blockBPlots = useMemo(() => {
    return allPlots.filter(
      (p) => p.blockSlug === 'block-b' || (p.blockName && p.blockName.toLowerCase().includes('block b'))
    );
  }, [allPlots]);

  const filteredPlots = useMemo(() => {
    if (selectedSizeFilter === 'All') return blockBPlots;
    return blockBPlots.filter((p) => p.size.toLowerCase().includes(selectedSizeFilter.toLowerCase()));
  }, [blockBPlots, selectedSizeFilter]);

  const otherBlocksShowcase = useMemo(() => {
    return defaultFaisalHillsBlocks.filter(
      (b) => b.id !== 'block-b' && !b.title.toLowerCase().includes('block b')
    );
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        interest: `Block B Plot (${formData.plotSize})`,
        message: `${formData.email ? `Email: ${formData.email}. ` : ''}${formData.message || 'Block B Detailed Page Consultation Request'}`
      });
      setFormSubmitted(true);
    } catch (err) {
      console.error(err);
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pt-2 font-sans text-slate-800">
      
      {/* ========================================================= */}
      {/* 1. VERIFICATION HEADER & OVERVIEW SECTION                 */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        
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
            <span>Site checked: <strong>{cms.verificationHeader?.siteCheckedDate || 'September 2026'}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h1"
                  text={cms.overview?.h1 || 'Faisal Hills Block B: Plot Prices, Possession and Plots for Sale'}
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    <FormattedText text={cms.overview?.leadParagraph1 || 'Block B is the largest residential block in Faisal Hills, lying between Block A and Block C and reached along the society\'s main boulevard. Main roads are built, possession has been granted in its developed sectors, and owners are building.'} />
                  </p>
                  <p>
                    <FormattedText text={cms.overview?.leadParagraph2 || 'It offers the same plot sizes as Block A up to 1 Kanal, at noticeably lower rates, and it carries the deepest resale inventory in the society. On a major property portal in September 2026, more plots were listed for sale here than in any other block, including Block A.'} />
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual Card */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal direction="right" delay={100}>
              <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-white group">
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    src={cms.overview?.image || "/images/faisal-hills-sports-arena.webp"}
                    alt={cms.overview?.imageAlt || cms.overview?.imageTitle || "Faisal Hills Block B Boulevard and Sports Infrastructure"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#7b002c] text-white shadow-sm border border-white/20">
                      {cms.overview?.imageTag || "Central Boulevard Sector"}
                    </span>
                  </div>
                </div>

                <div className="p-5 bg-slate-900 text-white space-y-1">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                    {cms.overview?.imageTitle || "Sector B Living & Amenities"}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {cms.overview?.imageSubtitle || "225ft Grand Boulevard access, multi-sports complex, 10+ parks & panoramic Margalla views."}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Quick Key Facts Snapshot Strip */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7b002c] uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Block B Key Facts Snapshot</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Position</span>
              <strong className="text-slate-900 font-medium block">{cms.overview?.quickFacts?.position}</strong>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Residential Sizes</span>
              <strong className="text-slate-900 font-medium block">{cms.overview?.quickFacts?.residentialSizes}</strong>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">How You Buy</span>
              <strong className="text-slate-900 font-medium block">{cms.overview?.quickFacts?.howYouBuy}</strong>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Possession</span>
              <strong className="text-emerald-700 font-medium block">{cms.overview?.quickFacts?.possession}</strong>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Character & Views</span>
              <strong className="text-slate-900 font-medium block">{cms.overview?.quickFacts?.character}</strong>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Legal Status</span>
              <strong className="text-slate-900 font-medium block">{cms.overview?.quickFacts?.legalStatus}</strong>
            </div>
          </div>

          {/* Quick Consultation CTA */}
          <div className="pt-3 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-700 font-medium text-center sm:text-left">
              {cms.overview?.ctaStripText || 'Ask which sectors have possession and what is available today:'}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${(cms.overview?.ctaWhatsapp || '+923331113177').replace(/[^0-9]/g, '')}?text=Hello!%20I%20am%20inquiring%20about%20Faisal%20Hills%20Block%20B%20possession%20sectors%20and%20plots.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${cms.overview?.ctaCall || '+923331113177'}`}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-rose-300" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. WHERE BLOCK B IS & CONNECTIVITY                        */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.location?.heading || 'Where Block B Is'}
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm font-sans max-w-3xl leading-relaxed">
              {cms.location?.leadParagraph || 'Block B sits behind Block A, sharing boundaries with Block A on one side and Block C on the other, with access from the GT Road entrance along the main boulevard. Being a step further in than Block A is what makes it quieter and cheaper, and it is also why parts of it look toward the Margalla Hills.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location Notes, Routes & Nearby */}
          <div className="lg:col-span-7 space-y-5">
            {/* Rawalpindi District Clarification */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Legal Jurisdiction Note: </strong>
                <span>{cms.location?.rawalpindiNote || 'Faisal Hills is marketed as an Islamabad address. The society lies in Rawalpindi District near Taxila, under the Rawalpindi Development Authority.'}</span>
              </div>
            </div>

            {/* Routes List */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#7b002c]" />
                <span>{cms.location?.routesTitle || 'Routes from Block B'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {(cms.location?.routesList || []).map((route, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Car className="w-3.5 h-3.5 text-[#7b002c] shrink-0" />
                    <span>{route}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100">
                {cms.location?.driveTimesNote || 'Drive times published for this block vary widely between sources, so we quote only routes our team has driven, with the distance and the time of day. Full directions are on our Faisal Hills location page.'}{' '}
                <Link href="/faisal-hills-location" className="text-[#7b002c] font-semibold underline hover:text-[#9e1245]">
                  Faisal Hills location
                </Link>
              </p>
            </div>

            {/* Nearby Institutions */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-slate-500">
                Nearby Landmarks & Educational Hubs
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {(cms.location?.nearbyList || []).map((item, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between gap-2 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="space-y-0.5">
                <strong className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7b002c]" />
                  <span>Block B Live Location Map</span>
                </strong>
                <span className="text-[11px] text-slate-500 block">Between Block A & Block C, Faisal Hills</span>
              </div>
            </div>

            <div className="relative w-full h-[320px] sm:h-[360px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <iframe
                title="Faisal Hills Block B Google Map Location"
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
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. BLOCK B MAP AND MASTER PLAN                            */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {cms.mapAndMasterPlan?.heading || 'Block B Map and Master Plan'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {cms.mapAndMasterPlan?.description || 'The block is laid out around the main boulevard, with residential streets behind it, parks and mosques distributed through the sectors, and its own commercial areas. Ask us to mark a plot on the current map before you commit, so you can see its sector, facing and street width.'}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 relative group">
            <img
              src={cms.mapAndMasterPlan?.mapImage || '/images/faisal-hills-master-plan-map-opt.webp'}
              alt="Faisal Hills Block B map showing sectors, parks, mosques and the main boulevard"
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

          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#7b002c]" />
                <span>Boulevard & Road Dimensions</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {cms.mapAndMasterPlan?.boulevardSpecsNote || 'Published descriptions give a 225-foot main boulevard, 120-foot main roads and 100-foot service roads, with residential streets between 40 and 60 feet. The society-wide plan is on our Faisal Hills master plan page.'}
              </p>
              <div className="pt-2 border-t border-slate-200">
                <Link
                  href="/master-plan"
                  className="text-xs text-[#7b002c] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Master Plan Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

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
      {/* 4. PLOT SIZES IN BLOCK B & 2 KANAL CLARIFICATION          */}
      {/* ========================================================= */}
      <section id="plot-sizes" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-1.5 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.plotSizesSection?.heading || 'Plot Sizes in Block B'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              {cms.plotSizesSection?.subline || 'Standard official plot dimensions, covered square footage, and square yard conversions:'}
            </p>
          </div>
        </ScrollReveal>

        {/* Plot Sizes HTML Table */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px] font-sans">
              <thead>
                <tr className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5 border-r border-slate-800">Dimensions (ft)</th>
                  <th className="p-4 sm:p-5 border-r border-slate-800">Total Area (sq ft)</th>
                  <th className="p-4 sm:p-5 border-r border-slate-800">Area (sq yds)</th>
                  <th className="p-4 sm:p-5 text-amber-300">Sold & Marketed As</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                {(cms.plotSizesSection?.tableRows || []).map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-4 sm:p-5 font-mono font-bold text-slate-900 border-r border-slate-200">{row.dimensions}</td>
                    <td className="p-4 sm:p-5 font-mono text-slate-700 border-r border-slate-200">{row.areaSqFt} sq ft</td>
                    <td className="p-4 sm:p-5 font-mono text-slate-700 border-r border-slate-200">{row.areaSqYds} sq yds</td>
                    <td className="p-4 sm:p-5 font-bold text-[#7b002c] font-serif text-sm">{row.soldAs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2 Kanal Availability & Non-Standard Sizes Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* 2 Kanal Note */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
            <h3 className="font-serif font-bold text-sm text-[#7b002c] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#7b002c]" />
              <span>{cms.plotSizesSection?.twoKanalHeading || 'Is 2 Kanal available in Block B?'}</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {cms.plotSizesSection?.twoKanalText || 'Some published block descriptions list 75 × 120 ft (2 Kanal) among Block B\'s sizes, but no source prices one and none appeared in the current listing sample. Treat 2 Kanal here as unconfirmed until the society office verifies it.'}{' '}
              <Link
                href={cms.plotSizesSection?.twoKanalLinkHref || '/blocks/block-a'}
                className="text-[#7b002c] font-bold underline hover:text-[#9e1245]"
              >
                Confirmed 2 Kanal availability sits in Block A
              </Link>
            </p>
          </div>

          {/* Sizes in Listings vs Official List */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-slate-700" />
              <span>{cms.plotSizesSection?.nonStandardHeading || 'Sizes that appear in listings but not on the official list'}</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {cms.plotSizesSection?.nonStandardText || 'Block B listings regularly describe the same plots as 5.6 Marla, 6.7 Marla, 10.9 Marla or 14.2 Marla. Most are standard plots measured with a 225 sq ft Marla rather than 250, though a few are genuinely non-standard. Compare by dimensions and square feet rather than the Marla figure in the headline.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. VERIFIED PLOTS LISTED FOR SALE (BLOCK B)               */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Verified Plots for Sale in Faisal Hills Block B
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Explore live on-ground possession plots with direct seller pricing and biometric transfer:
            </p>
          </div>

          {/* Plot Size Filter Tabs */}
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0 overflow-x-auto max-w-full -mx-2 px-2 sm:mx-0 sm:px-1">
            {['All', '5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSizeFilter(size)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  size === 'All' ? 'hidden sm:inline-flex' : 'inline-flex'
                } ${
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
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-b`}
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                    title={`Browse all ${plot.size} plots in inventory`}
                  >
                    <img
                      src={plot.image || '/images/faisal-hills-sports-arena.webp'}
                      alt={`Plot #${plot.plotNumber} - ${plot.size}`}
                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full font-mono text-xs font-bold">
                        Plot #{plot.plotNumber}
                      </span>
                      <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full border border-emerald-400/40 shadow-xs">
                        {plot.status || 'Possession Ready'}
                      </span>
                    </div>

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
                        Facing: <strong className="text-slate-700">{plot.facing || 'Boulevard View'}</strong> • Dimensions: <strong className="text-slate-700">{plot.dimensions}</strong>
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1 border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demand Price</div>
                      <div className="text-xl font-bold font-serif text-[#7b002c]">
                        {plot.priceFormatted}
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
                      href={`https://wa.me/${(cms.closingSiteVisitSection?.whatsappNumber || '+923331113177').replace(/[^0-9]/g, '')}?text=Hello!%20I%20am%20interested%20in%20Faisal%20Hills%20Block%20B%20Plot%20${plot.plotNumber}%20(${plot.size}).%20Please%20share%20latest%20price%20and%20transfer%20details.`}
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
      </section>

      {/* ========================================================= */}
      {/* 6. DYNAMIC PLOT SERIES EXPLORER                           */}
      {/* ========================================================= */}
      <section id="plot-series" className="scroll-mt-28">
        <ScrollReveal direction="up" delay={50}>
          <DynamicPlotSeriesExplorer blockSlug="block-b" blockName="Block B" />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 7. EXPLORE OTHER EXPANDING SECTORS (MIDDLE PLACEMENT)     */}
      {/* ========================================================= */}
      <section id="sectors" className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Explore Expanding Sectors in Faisal Hills
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Discover connected sectors across the master development, from Executive and Prime blocks to Block D & Hills Walk:
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <ExpandingProjectsShowcase
            items={otherBlocksShowcase}
            defaultActiveIndex={0}
            containerHeightClass="h-[440px] sm:h-[480px] lg:h-[520px]"
            roundedClass="rounded-2xl sm:rounded-3xl"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 8. BLOCK B PLOT PRICES AND CURRENT RATES                  */}
      {/* ========================================================= */}
      <section id="pricing" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.pricingAndRates?.heading || 'Block B Plot Prices and Current Rates'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
            {cms.pricingAndRates?.leadParagraph || 'Two sets of rates circulate for Block B. The published band is what most websites quote; asking prices are what sellers are currently advertising. Several of those websites share a single source, so the band should be read as one opinion rather than independent agreement.'}
          </p>
        </div>

        {/* Prices HTML Table */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px] font-sans">
              <thead>
                <tr className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5 border-r border-slate-800">Plot Size Cut</th>
                  <th className="p-4 sm:p-5 border-r border-slate-800 text-amber-300">Published Historical Band</th>
                  <th className="p-4 sm:p-5 border-r border-slate-800 text-rose-200">Recent Asking Prices (Resale)</th>
                  <th className="p-4 sm:p-5 text-right">Instant Inquire</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                {(cms.pricingAndRates?.tableRows || []).map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2 border-r border-slate-200">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7b002c]" />
                      <span className="font-serif text-sm">{row.plotSize}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-700 font-medium border-r border-slate-200">{row.publishedBand}</td>
                    <td className="p-4 sm:p-5 font-bold text-[#7b002c] font-serif border-r border-slate-200">{row.recentAskingPrices}</td>
                    <td className="p-4 sm:p-5 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, plotSize: row.plotSize });
                          setIsLeadModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        <span>Check Plots</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3 pt-1 text-xs text-slate-600 leading-relaxed font-sans">
          <p>
            {cms.pricingAndRates?.sampleAttribution || 'Asking prices observed in September 2026 across more than 400 residential listings on a major property portal.'}{' '}
            <Link href="/faisal-hills-payment-plan" className="text-[#7b002c] font-bold underline hover:text-[#9e1245]">
              Full block-by-block figures: Faisal Hills plot prices
            </Link>
          </p>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>{cms.pricingAndRates?.lowPriceWarning || 'One widely circulated price guide puts Block B 5 Marla plots at PKR 28 to 45 lakh. Current listings do not support that figure, and a quote at that level should be checked carefully before any payment.'}</span>
          </div>
        </div>

        {/* Position Premiums Explanation */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-2">
          <h3 className="font-serif font-bold text-lg text-slate-900">
            {cms.pricingAndRates?.positionPremiumsHeading || 'What position adds to the price'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            {cms.pricingAndRates?.positionPremiumsText || 'Within a single size, Block B plot rates move more with position than with anything else. Corner plots typically carry a premium of around 10 to 15 percent, and main boulevard plots around 10 percent, with smaller premiums for park-facing and view plots. The listings bear this out: standard 5 Marla plots ask 43 to 50 lakh while corner and double-road plots of the same size ask 72 to 75 lakh.'}
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. BLOCK B VS BLOCK A RATE PER SQUARE FOOT                */}
      {/* ========================================================= */}
      <section id="rate-comparison" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-1.5 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.rateComparisonSection?.heading || 'Block B Costs About a Third Less Than Block A'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              {cms.rateComparisonSection?.subline || 'Direct Rate Per Square Foot Benchmark Comparison (September 2026 Analysis):'}
            </p>
          </div>
        </ScrollReveal>

        {/* Comparison Table */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px] font-sans">
              <thead>
                <tr className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5 border-r border-slate-800">Plot Size</th>
                  <th className="p-4 sm:p-5 border-r border-slate-800 text-rose-300">Block B Rate (per sq ft)</th>
                  <th className="p-4 sm:p-5 border-r border-slate-800 text-amber-300">Block A Rate (per sq ft)</th>
                  <th className="p-4 sm:p-5 text-emerald-300">Cost Difference / Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                {(cms.rateComparisonSection?.tableRows || []).map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900 border-r border-slate-200">{row.plotSize}</td>
                    <td className="p-4 sm:p-5 font-bold text-[#7b002c] border-r border-slate-200">{row.blockBRatePerSqFt}</td>
                    <td className="p-4 sm:p-5 text-slate-700 font-medium border-r border-slate-200">{row.blockARatePerSqFt}</td>
                    <td className="p-4 sm:p-5 font-semibold text-emerald-700">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>~30% to 36% Lower Entry</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          <p>
            {cms.rateComparisonSection?.leadAnalysis || 'A typical Block B 5 Marla plot works out near PKR 4,000 per square foot against roughly PKR 6,240 in Block A. You are buying the same plot sizes in a block that also has possession in its developed sectors, for around a third less. What you give up is proximity to the entrance, the commercial density of Block A and, in some sectors, a longer wait for full completion.'}
          </p>
          <p className="text-xs text-slate-500 italic">
            {cms.rateComparisonSection?.disclaimerNote || 'These rates are our own calculation from listed asking prices and plot dimensions in September 2026, not developer figures.'}
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. COSTS BEYOND PLOT PRICE & FILES VS POSSESSION          */}
      {/* ========================================================= */}
      <section id="costs-beyond" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.costsBeyondSection?.heading || 'Costs Beyond the Plot Price'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Breakdown of mandatory transfer fees, premium add-ons, and site preparation expenses in Sector B:
          </p>
        </div>

        {/* Costs Beyond HTML Table */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px] font-sans">
              <thead>
                <tr className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5 border-r border-slate-800 w-1/4">Cost Component / Fee</th>
                  <th className="p-4 sm:p-5 border-r border-slate-800 w-1/2 text-rose-200">Nature & Applicability in Block B</th>
                  <th className="p-4 sm:p-5 w-1/4 text-amber-300">Payment & Verification Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                {(cms.costsBeyondSection?.costsList || []).map((cost, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900 border-r border-slate-200 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#7b002c] shrink-0" />
                      <span>{cost.title}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 leading-relaxed border-r border-slate-200">
                      {cost.desc}
                    </td>
                    <td className="p-4 sm:p-5 text-xs text-slate-700">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-semibold block w-fit">
                        Confirm via Official NDC
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Files vs Possession Callout */}
        <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-2">
          <h3 className="font-serif font-bold text-lg text-emerald-950 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <span>{cms.costsBeyondSection?.filesVsPossessionHeading || 'Files and Possession Plots'}</span>
          </h3>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-sans">
            {cms.costsBeyondSection?.filesVsPossessionText || 'A file is a booking that may still carry instalments. A possession plot has been formally handed over and can be built on. Possession plots trade at a premium over files in the same block and street, reported at 20 to 35 percent. Block B listings often state "NDC open" or "all dues clear", and those words move the price.'}
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. POSSESSION IN BLOCK B: SECTOR BY SECTOR               */}
      {/* ========================================================= */}
      <section id="possession-sectors" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.possessionSectorSection?.heading || 'Possession in Block B: Sector by Sector'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            {cms.possessionSectorSection?.leadParagraph || 'This is the most important thing to understand before buying here, and it is where most published pages are vague.'}
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {cms.possessionSectorSection?.conceptExplanation || 'Development means roads, sewerage, water, electricity and street lighting are complete. Possession means the developer has formally handed your plot over and issued a possession letter, which is what allows construction to begin. In Block B, possession has been granted in the developed sectors, not uniformly across the block. Land levelling and plot marking are complete, and work on roads, parks and mosques continues in the newer sectors. Owners are already building in the completed areas.'}
          </p>
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-amber-200 leading-relaxed">
            <strong>What that means for you: </strong>
            <span>{cms.possessionSectorSection?.actionAdviceText || 'The block as a whole is not the right unit of enquiry. Ask which sector a plot sits in, whether possession has been granted for that sector, and get it in writing for the specific plot number. Two plots of the same size in Block B can be at quite different stages.'}</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. SOLID AND CUTTING PLOTS                               */}
      {/* ========================================================= */}
      <section id="solid-cutting" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.solidAndCuttingSection?.heading || 'Solid and Cutting Plots'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            {cms.solidAndCuttingSection?.intro || 'Block B listings describe plots as "solid" or "cutting", and the distinction affects what you spend before laying a foundation.'}
          </p>
        </div>

        {/* Solid vs Cutting Comparison Table */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px] font-sans">
              <thead>
                <tr className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5 border-r border-slate-800 w-1/4">Plot Classification</th>
                  <th className="p-4 sm:p-5 border-r border-slate-800 w-1/3 text-emerald-300">Ground Condition & Topography</th>
                  <th className="p-4 sm:p-5 border-r border-slate-800 w-1/4 text-amber-300">Site Prep & Retaining Cost</th>
                  <th className="p-4 sm:p-5">Buyer Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                <tr className="hover:bg-emerald-50/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-emerald-900 border-r border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{cms.solidAndCuttingSection?.solidPlotTitle || 'Solid Plot'}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 border-r border-slate-200">
                    {cms.solidAndCuttingSection?.solidPlotDesc || 'On natural, level ground at road level, needing little site preparation.'}
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-emerald-700 border-r border-slate-200">
                    Minimal / Standard foundation only
                  </td>
                  <td className="p-4 sm:p-5 text-xs text-slate-600">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">Ready to Dig</span>
                  </td>
                </tr>
                <tr className="hover:bg-amber-50/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-amber-900 border-r border-slate-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{cms.solidAndCuttingSection?.cuttingPlotTitle || 'Cutting Plot'}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 border-r border-slate-200">
                    {cms.solidAndCuttingSection?.cuttingPlotDesc || 'Formed by cutting into sloping ground, or sitting below or above road level, so it may need retaining work, filling or levelling.'}
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-amber-700 border-r border-slate-200">
                    Additional retaining walls & earth filling required
                  </td>
                  <td className="p-4 sm:p-5 text-xs text-slate-600">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">Survey On Site</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          {cms.solidAndCuttingSection?.onSiteAdviceText || 'On a hillside-edge block this is a real cost difference, not a label. Visit the plot, look at its level against the street, and factor site preparation into your budget before comparing two asking prices.'}
        </p>
      </section>

      {/* ========================================================= */}
      {/* 12. WHO BLOCK B SUITS, AND WHAT TO WEIGH                  */}
      {/* ========================================================= */}
      <section id="who-it-suits" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.whoItSuitsSection?.heading || 'Who Block B Suits, and What to Weigh'}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          {cms.whoItSuitsSection?.whoItSuitsParagraph || 'It tends to suit families who want space and greenery rather than proximity to the entrance, buyers who want Block A\'s plot sizes without Block A\'s prices, and anyone who values resale choice: this block carries more listings than any other in the society.'}
        </p>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <h3 className="font-serif font-bold text-base text-slate-900">
            {cms.whoItSuitsSection?.investmentHeading || 'If you are buying as an investment, weigh these first:'}
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700">
            {(cms.whoItSuitsSection?.investmentPoints || []).map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] mt-1.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-500 italic">
          {cms.whoItSuitsSection?.noReturnsDisclaimer || 'We do not publish expected returns or appreciation figures for Block B, because no verifiable source supports them.'}
        </p>
      </section>

      {/* ========================================================= */}
      {/* 13. COMPARISONS: BLOCK B VS BLOCK A & B EXTENSION         */}
      {/* ========================================================= */}
      <section id="comparisons" className="scroll-mt-28 space-y-10">
        {/* Block B or Block A? */}
        <div className="space-y-6">
          <div className="space-y-1.5 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.comparisonBlockASection?.heading || 'Block B or Block A?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              {cms.comparisonBlockASection?.subline || 'Side-by-side comparison between the two primary established sectors:'}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px] font-sans">
                <thead>
                  <tr className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                    <th className="p-4 sm:p-5 border-r border-slate-800">Feature / Aspect</th>
                    <th className="p-4 sm:p-5 border-r border-slate-800 text-[#fca5a5]">Block B</th>
                    <th className="p-4 sm:p-5 text-amber-200">Block A</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                  {(cms.comparisonBlockASection?.tableRows || []).map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                      <td className="p-4 sm:p-5 font-bold text-slate-900 border-r border-slate-200">{row.aspect}</td>
                      <td className="p-4 sm:p-5 font-medium text-slate-800 border-r border-slate-200">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] shrink-0" />
                          <span>{row.blockB}</span>
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 font-medium text-slate-800">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                          <span>{row.blockA}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            {cms.comparisonBlockASection?.hubLinkNote || 'Every block is compared on our'}{' '}
            <Link href={cms.comparisonBlockASection?.hubLinkHref || '/faisal-hills-blocks'} className="text-[#7b002c] font-bold underline hover:text-[#9e1245]">
              {cms.comparisonBlockASection?.hubLinkText || 'Faisal Hills blocks hub'}
            </Link>
          </p>
        </div>

        {/* Block B or Block B Extension? */}
        <div className="space-y-6">
          <div className="space-y-1.5 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.comparisonExtensionSection?.heading || 'Block B or Block B Extension?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans max-w-3xl">
              {cms.comparisonExtensionSection?.intro || 'Block B Extension is a separate, smaller block created when Block B sold well, bordering Block B and connected toward Block D and Prime Block. It is widely described as the cheaper option, but the published bands do not fully support that. Its 5 Marla band starts higher than Block B\'s, and its 10 Marla band runs higher at the top.'}
            </p>
          </div>

          {/* Block B vs Block B Extension Table Form */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px] font-sans">
                <thead>
                  <tr className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                    <th className="p-4 sm:p-5 border-r border-slate-800 w-1/4">Comparison Metric</th>
                    <th className="p-4 sm:p-5 border-r border-slate-800 text-rose-300 w-3/8">Block B (Main Sector)</th>
                    <th className="p-4 sm:p-5 text-amber-300 w-3/8">Block B Extension (B-1)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                  <tr className="bg-white hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 border-r border-slate-200">Plot Sizes Available</td>
                    <td className="p-4 sm:p-5 text-slate-800 border-r border-slate-200">5, 8, 10, 14 Marla & 1 Kanal</td>
                    <td className="p-4 sm:p-5 text-slate-800">5, 8 and 10 Marla only (no 14M / 1 Kanal)</td>
                  </tr>
                  <tr className="bg-slate-50/60 hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 border-r border-slate-200">Development Stage</td>
                    <td className="p-4 sm:p-5 text-slate-800 border-r border-slate-200">Advanced, 225ft boulevard, functional utilities</td>
                    <td className="p-4 sm:p-5 text-slate-800">Earlier stage; dedicated parks & mosque in progress</td>
                  </tr>
                  <tr className="bg-white hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 border-r border-slate-200">Possession & Maturity</td>
                    <td className="p-4 sm:p-5 text-slate-800 border-r border-slate-200">Granted across developed sectors with active construction</td>
                    <td className="p-4 sm:p-5 text-slate-800">Staged possession in selected initial plot series</td>
                  </tr>
                  <tr className="bg-slate-50/60 hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 border-r border-slate-200">Inventory & Resale Depth</td>
                    <td className="p-4 sm:p-5 text-slate-800 border-r border-slate-200">Deepest resale listings sample in Faisal Hills</td>
                    <td className="p-4 sm:p-5 text-slate-800">Compact inventory primarily traded as booking files</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <span className="text-slate-800 font-medium">
              {cms.comparisonExtensionSection?.conclusionText || 'If you want a larger plot or possession sooner, Block B is the one to look at.'}
            </span>
            <Link
              href={cms.comparisonExtensionSection?.extensionLinkHref || '/blocks/block-b-1-ext'}
              className="text-[#7b002c] font-bold underline hover:text-[#9e1245] shrink-0"
            >
              {cms.comparisonExtensionSection?.extensionLinkText || 'Block B Extension details'}
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 14. DEVELOPMENT STATUS AND FACILITIES                     */}
      {/* ========================================================= */}
      <section id="development-status" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.developmentAndFacilitiesSection?.heading || 'Development Status and Facilities'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            {cms.developmentAndFacilitiesSection?.subline || 'On-ground execution status verified across Sector B zones:'}
          </p>
        </div>

        {/* Development Status Table */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px] font-sans">
              <thead>
                <tr className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5 border-r border-slate-800 w-1/2">Facility / Infrastructure Item</th>
                  <th className="p-4 sm:p-5 text-emerald-300 w-1/2">Reported On-Ground Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                {(cms.developmentAndFacilitiesSection?.statusTableRows || []).map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900 border-r border-slate-200">{row.item}</td>
                    <td className="p-4 sm:p-5 font-medium text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic">
          {cms.developmentAndFacilitiesSection?.statusNote || 'Statuses as verified during our site inspections. Explore dated photographs on our development updates page.'}
        </p>

        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          <p>{cms.developmentAndFacilitiesSection?.facilitiesPlanDescription}</p>
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
            <strong>Plan Layout Awareness: </strong>
            <span>{cms.developmentAndFacilitiesSection?.graveyardsNote}</span>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-sm text-slate-900">
              {cms.developmentAndFacilitiesSection?.margallaViewsHeading || 'Margalla Hills Views'}
            </h3>
            <p className="text-xs text-slate-600">
              {cms.developmentAndFacilitiesSection?.margallaViewsText || 'Block B is often described as the block with residential views of the Margalla Hills. Views depend on which sector and which side of a street a plot sits on, so check on site rather than assuming it applies block-wide.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 15. COMMERCIAL PLOTS AND APARTMENTS                       */}
      {/* ========================================================= */}
      <section id="commercial-apartments" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.commercialAndApartmentsSection?.heading || 'Commercial Plots and Apartments'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#7b002c]" />
              <span>Commercial Master Plan Zones</span>
            </h3>
            <p className="text-xs text-slate-600">
              {cms.commercialAndApartmentsSection?.commercialZonesText}
            </p>
            <p className="text-xs font-semibold text-[#7b002c]">
              {cms.commercialAndApartmentsSection?.commercialInquiryNote}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-700" />
              <span>{cms.commercialAndApartmentsSection?.highRiseHeading || 'Boulevard High-Rise Apartments'}</span>
            </h3>
            <p className="text-xs text-slate-600">
              {cms.commercialAndApartmentsSection?.highRiseText}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 16. BUYING AND TRANSFERRING IN BLOCK B                    */}
      {/* ========================================================= */}
      <section id="transfer-process" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.buyingAndTransferSection?.heading || 'Buying and Transferring in Block B'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            {cms.buyingAndTransferSection?.intro || 'Most purchases here are resale transfers completed at the developer\'s office.'}
          </p>
        </div>

        {/* 7-Step Sequence Table */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px] font-sans">
              <thead>
                <tr className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5 border-r border-slate-800 w-16 text-center">Step #</th>
                  <th className="p-4 sm:p-5 border-r border-slate-800 text-amber-300">Resale Transfer Protocol</th>
                  <th className="p-4 sm:p-5 text-emerald-300 w-1/4">Key Milestone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                {(cms.buyingAndTransferSection?.steps || []).map((step, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-4 sm:p-5 font-bold text-[#7b002c] text-center border-r border-slate-200 font-serif">
                      0{idx + 1}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-800 border-r border-slate-200 leading-relaxed">
                      {step}
                    </td>
                    <td className="p-4 sm:p-5 text-xs text-slate-600 font-semibold">
                      {idx === 0 && 'Deal Agreement'}
                      {idx === 1 && 'Sector Verification'}
                      {idx === 2 && 'Identity Clearance'}
                      {idx === 3 && 'Chain of Title'}
                      {idx === 4 && 'NDC Clearance'}
                      {idx === 5 && 'Possession Letter'}
                      {idx === 6 && 'Official Transfer'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documents Needed */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7b002c]" />
              <span>{cms.buyingAndTransferSection?.documentsNeededHeading || 'What you will need:'}</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {(cms.buyingAndTransferSection?.documentsNeeded || []).map((doc, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Warning Signs */}
          <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200 space-y-3">
            <h3 className="font-serif font-bold text-sm text-[#7b002c] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#7b002c]" />
              <span>{cms.buyingAndTransferSection?.warningSignsHeading || 'Warning signs:'}</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {(cms.buyingAndTransferSection?.warningSigns || []).map((warn, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 17. READING BLOCK B LISTINGS (GLOSSARY)                   */}
      {/* ========================================================= */}
      <section id="glossary" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.readingListingsGlossary?.heading || 'Reading Block B Listings'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            {cms.readingListingsGlossary?.subline || 'Local Real Estate Terms & Listing Decoders:'}
          </p>
        </div>

        {/* Glossary HTML Table */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px] font-sans">
              <thead>
                <tr className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                  <th className="p-4 sm:p-5 border-r border-slate-800 w-1/3 text-rose-300">Listing Term / Acronym</th>
                  <th className="p-4 sm:p-5 text-amber-200 w-2/3">Market Definition & Practical Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                {(cms.readingListingsGlossary?.terms || []).map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-4 sm:p-5 font-bold text-[#7b002c] font-serif border-r border-slate-200">
                      {item.term}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 leading-relaxed">
                      {item.definition}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 18. FREQUENTLY ASKED QUESTIONS (10 QA-APPROVED FAQS)      */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-5 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.faqsSection?.heading || 'Frequently Asked Questions'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl">
            {cms.faqsSection?.subline || 'Direct answers to the most critical Block B buying, rate, and possession questions:'}
          </p>
        </div>

        <FaqAccordion
          faqs={(cms.faqsSection?.faqs || []).map((f) => ({ question: f.q, answer: f.a }))}
          blockName="Block B"
        />
      </section>

      {/* ========================================================= */}
      {/* 19. CHECK AVAILABILITY & SELLER DESK CONSULTATION         */}
      {/* ========================================================= */}
      <section id="contact-desk" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              {cms.closingSiteVisitSection?.heading || 'Block B Plots for Sale: Check Availability'}
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm font-sans leading-relaxed">
              {cms.closingSiteVisitSection?.intro || 'Tell us the size, sector and budget you have in mind, and whether you need possession now. We will confirm what is genuinely available, share the current rate and the documents to check, and arrange a site visit.'}
            </p>

            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
              <strong className="text-xs text-[#7b002c] block">
                {cms.closingSiteVisitSection?.sellingHeading || 'Selling a plot in Block B?'}
              </strong>
              <p className="text-xs text-slate-700">
                {cms.closingSiteVisitSection?.sellingText || 'We can help with the society office process, from ownership verification through to the NDC.'}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-700 pt-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>WhatsApp: <strong>{cms.closingSiteVisitSection?.whatsappNumber || '+92 333 1113177'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-700 shrink-0" />
                <span>Direct Call: <strong>{cms.closingSiteVisitSection?.phoneNumber || '+92 333 1113177'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#7b002c] shrink-0" />
                <span>Office: <strong>{cms.closingSiteVisitSection?.officeAddress || 'Faisal Hills Main Boulevard Commercial Desk, Taxila GT Road'}</strong></span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs">
              {formSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-emerald-900">Inquiry Received!</h4>
                  <p className="text-xs text-emerald-700 font-sans">
                    Our Faisal Hills Block B property desk will reach out with the complete price sheet and plot inventory within 15 minutes.
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
                        <option value="Commercial">Commercial Zone</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Specific Requirements</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Inquiring about park-facing or corner 10 Marla in developed sector..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#7b002c]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : (cms.closingSiteVisitSection?.formButtonText || 'Submit Official Block B Inquiry')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 20. EDITORIAL BYLINE & REVIEW DISCLAIMER FOOTER           */}
      {/* ========================================================= */}
      <section id="editorial-footer" className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed font-sans">
        <p>
          {cms.closingSiteVisitSection?.reviewedByNote || 'About this page: reviewed by Senior Property Verification Desk of Faisal Hills Advisory. Price bands are drawn from published sources; asking prices and rates per square foot are our own analysis of current market listings. Prices change without notice. If you find anything out of date, tell us and we will correct it.'}
        </p>
      </section>

      {/* Map Download Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        blockName="Block B"
      />

      {/* Lead Inquiry Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedPlotForInquiry(null);
        }}
        defaultBlock="Block B"
        defaultPlot={selectedPlotForInquiry ? `Plot #${selectedPlotForInquiry.plotNumber} (${selectedPlotForInquiry.size})` : undefined}
        interest={selectedPlotForInquiry ? `${selectedPlotForInquiry.size} ${selectedPlotForInquiry.category} in Block B` : 'Block B General Inquiry'}
      />
    </div>
  );
}
