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
  HelpCircle,
  MessageSquare,
  Home,
  Check,
  Award,
  Send,
  BadgeCheck,
  Building,
  Shield,
  AlertTriangle,
  FileText,
  Layers,
  ExternalLink,
  Info,
  Compass,
  GraduationCap,
  Landmark,
  Navigation
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
import FaqAccordion from '@/components/ui/FaqAccordion';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';
import FormattedText from '@/components/ui/FormattedText';
import { DynamicPlotSeriesExplorer } from '../plots/DynamicPlotSeriesExplorer';
import { useContactChannels } from '@/lib/useContactChannels';

export default function BlockDContent() {
  // Live CMS State
  const [cms, setCms] = useState<BlockDCMSData>(initialBlockDCMS);
  const { directionsUrl } = useContactChannels();

  // Plot Filters & Interactive States
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
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

  // Travel times fallback
  const travelTimesList = useMemo(() => {
    return cms.location?.travelTimes?.length > 0
      ? cms.location.travelTimes
      : initialBlockDCMS.location.travelTimes;
  }, [cms.location?.travelTimes]);

  // FAQs List formatted
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
        message: formData.message || 'Block D inquiry via audited page'
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
      {/* 1. OVERVIEW & QUICK FACTS TABLE                           */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        
        {/* Lead Narrative with Right Overview Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <ScrollReveal direction="up" delay={50}>
              <TextReveal
                as="h1"
                text={cms.overview?.h1 || 'Faisal Hills Block D: Possession, Plot Prices and Plots for Sale'}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={50}
                direction="left"
              />
            </ScrollReveal>

            <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
              <p>
                <FormattedText text={cms.overview?.leadParagraph1 || 'Block D adjoins Block C and sits deeper inside Faisal Hills, away from the GT Road frontage. Possession has been granted here, main roads and underground utilities are reported complete, and plot owners are already building.'} />
              </p>
              <p>
                <FormattedText text={cms.overview?.leadParagraph2 || 'It is also the block where published information is least reliable. Five different payment plans have been advertised for Block D by different websites, and at least two of them cannot both be current. This page sets out what is supported by evidence and what still needs confirming.'} />
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-950 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between group">
              <img
                src={cms.overview?.image || "/images/faisal-hills-overview.webp"}
                alt={cms.overview?.imageAlt || cms.overview?.imageTitle || "Faisal Hills Block D Aerial Overview"}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/20" />
              <div className="relative z-10 p-5 text-white space-y-1 mt-auto">
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                  {cms.overview?.imageTag || "On-Ground Development View"}
                </span>
                <h3 className="font-serif font-bold text-lg text-white">
                  {cms.overview?.imageTitle || "Faisal Hills Block D Overview"}
                </h3>
                <p className="text-xs text-slate-300 font-sans">
                  {cms.overview?.imageSubtitle || "Developed residential sector with paved avenues and construction underway."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview HTML Quick Facts Table */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#7b002c]" />
            <span>Block D Sector Quick Reference</span>
          </div>

          <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-xs bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200 hover:bg-slate-50/70 transition-colors">
                    <th className="p-3.5 sm:p-4 bg-slate-100/80 font-bold text-slate-900 w-1/3 sm:w-1/4 border-r border-slate-200">
                      Position
                    </th>
                    <td className="p-3.5 sm:p-4 text-slate-800">
                      {cms.overview?.quickFacts?.position || 'Adjacent to Block C, set back from the GT Road'}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50/70 transition-colors">
                    <th className="p-3.5 sm:p-4 bg-slate-100/80 font-bold text-slate-900 border-r border-slate-200">
                      Residential sizes
                    </th>
                    <td className="p-3.5 sm:p-4 text-slate-800">
                      {cms.overview?.quickFacts?.residentialSizes || '5, 8 and 10 Marla, plus 14 Marla and 1 Kanal (2 Kanal unconfirmed)'}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50/70 transition-colors">
                    <th className="p-3.5 sm:p-4 bg-slate-100/80 font-bold text-slate-900 border-r border-slate-200">
                      Plot count
                    </th>
                    <td className="p-3.5 sm:p-4 text-slate-800 font-semibold text-slate-900">
                      {cms.overview?.quickFacts?.plotCount || 'Reported between 2,000 and 2,435'}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50/70 transition-colors">
                    <th className="p-3.5 sm:p-4 bg-slate-100/80 font-bold text-slate-900 border-r border-slate-200">
                      Possession
                    </th>
                    <td className="p-3.5 sm:p-4 text-emerald-800 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{cms.overview?.quickFacts?.possession || 'Granted (Available in developed sectors; owners building)'}</span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50/70 transition-colors">
                    <th className="p-3.5 sm:p-4 bg-slate-100/80 font-bold text-slate-900 border-r border-slate-200">
                      How you buy
                    </th>
                    <td className="p-3.5 sm:p-4 text-slate-800">
                      {cms.overview?.quickFacts?.howYouBuy || 'Five different plans published; confirm the current schedule'}
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <th className="p-3.5 sm:p-4 bg-slate-100/80 font-bold text-slate-900 border-r border-slate-200">
                      Legal status
                    </th>
                    <td className="p-3.5 sm:p-4 text-emerald-800 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{cms.overview?.quickFacts?.legalStatus || 'Within the RDA-approved Faisal Hills scheme'}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Action CTA Strip */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="font-semibold text-slate-800 text-center sm:text-left">
              Ask what is available today and which payment terms actually apply:
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://wa.me/${cms.closingSiteVisitSection?.whatsappNumber?.replace(/[^0-9]/g, '') || '923331113177'}?text=Hello!%20I%20am%20inquiring%20about%20Faisal%20Hills%20Block%20D%20plots%20and%20payment%20terms.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${cms.closingSiteVisitSection?.phoneNumber || '+923331113177'}`}
                className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. WHERE BLOCK D IS (LOCATION & ACCESSIBILITY)             */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-3 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {cms.location?.heading || 'Where Block D Is'}
            </h2>
          </div>
        </ScrollReveal>

        {/* 2-Column Location Section: Location Info on Left, Live Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Location details, positioning rationale & jurisdiction note */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                <p>
                  Block D lies next to{' '}
                  <Link href="/blocks/block-c" className="text-[#7b002c] font-semibold underline underline-offset-4 hover:text-[#9e1245]">
                    Block C
                  </Link>
                  , positioned further inside the society than the entrance blocks. That distance from the GT Road is the trade-off buyers make here: less highway noise and lower prices, in exchange for a longer drive to the main gate.
                </p>
                <p>
                  Set against the scenic Margalla backdrop, Block D enjoys an elevated, quiet residential setting with wide arterial avenues connecting directly to central commercial facilities and sector parks.
                </p>
              </div>

              {/* RDA / Legal District Clarification Card */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs leading-relaxed flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-amber-900">Legal Jurisdiction Note: </strong>
                  <span>{cms.location?.boundaryNote || 'One source reports that Block D shares a boundary with New City Phase 2, Islamabad. Faisal Hills is marketed as an Islamabad address; the society itself lies in Rawalpindi District near Taxila, under the Rawalpindi Development Authority.'}</span>
                </div>
              </div>
            </div>

            {/* Quick Access Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#7b002c]" />
                  <span>Main Arterial Access</span>
                </div>
                <p className="text-slate-600">
                  Connected via 100ft sector avenues to the 225ft Grand Boulevard and M-1 link.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#7b002c]" />
                  <span>Twin Cities Commute</span>
                </div>
                <p className="text-slate-600">
                  Quick access to GT Road (N-5) and Brahma Jhang Bahtar interchange.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Live Embed */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <div className="flex items-center justify-between gap-2 bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-900">Block D Live Location Map</span>
              </div>
              <a
                href={directionsUrl(cms.location?.googleMapIframeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#7b002c] hover:text-[#9e1245] inline-flex items-center gap-1"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-full min-h-[320px] lg:min-h-[380px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
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
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. KEY COMMUTE TIMES & STRATEGIC CONNECTIVITY (SEPARATE) */}
      {/* ========================================================= */}
      <section id="commute-times" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-3 border-b border-slate-200 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1 max-w-3xl">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 flex items-center gap-3">
                  <Car className="w-6 h-6 sm:w-8 sm:h-8 text-[#7b002c]" />
                  <span>Key Commute Times & Strategic Connectivity</span>
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  Driven and verified real-world routes from Faisal Hills Block D connecting key motorways, commercial avenues, universities, and Islamabad:
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs font-bold text-[#7b002c] bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200 whitespace-nowrap font-mono">
                Driven & Verified Routes
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* 6 Visual Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {travelTimesList.map((dest, idx) => {
            const commuteImageMap: Record<string, { image: string; tag: string }> = {
              'M-1 Brahma Jhang Bahtar Interchange': {
                image: '/images/landmarks/m1-motorway.webp',
                tag: 'Motorway Gateway'
              },
              'Grand GT Road (N-5 Highway)': {
                image: '/images/faisal-hills-arc-entrance.webp',
                tag: 'National Highway N-5'
              },
              'Block C & Hills Walk Promenade': {
                image: '/images/hills-walk-commercial-aerial.webp',
                tag: 'Commercial & Dining'
              },
              'Taxila Museum & Cantt Commercials': {
                image: '/images/landmarks/taxila-museum-gandhara.webp',
                tag: 'Heritage & Urban'
              },
              'COMSATS & HITEC Universities': {
                image: '/images/landmarks/hitec-university-taxila.webp',
                tag: 'Academic Corridor'
              },
              'Islamabad Toll Plaza & Zero Point': {
                image: '/images/landmarks/islamabad-zero-point.webp',
                tag: 'Capital Access'
              }
            };

            const meta = commuteImageMap[dest.destination] || {
              image: '/images/faisal-hills-drone-view.webp',
              tag: 'Access Route'
            };

            return (
              <ScrollReveal key={idx} direction="up" delay={(idx % 3) * 80}>
                <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#7b002c]/30 transition-all group flex flex-col justify-between h-full">
                  <div>
                    {/* Image Banner with Time Badge */}
                    <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                      <img
                        src={meta.image}
                        alt={dest.destination}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs border border-white/20">
                        <Navigation className="w-3 h-3 text-amber-400" />
                        <span>{meta.tag}</span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-[#7b002c] text-white text-xs font-bold shadow-md">
                        {dest.time}
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <h3 className="font-serif font-bold text-base text-white group-hover:text-amber-300 transition-colors drop-shadow-sm">
                          {dest.destination}
                        </h3>
                      </div>
                    </div>

                    {/* Distance & Commute Details */}
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                        <span className="text-slate-500 font-sans">Verified Distance:</span>
                        <span className="font-bold text-slate-900 font-mono text-sm bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          {dest.distance}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {dest.note}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-sans">
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Direct Paved Route</span>
                      </span>
                      <span className="font-mono text-[10px]">{dest.time} commute</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 italic pt-1 font-sans">
          Published drive times for this block vary widely between sources, so we quote only routes our own team has driven, with the distance and the time of day.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 3. NEARBY INSTITUTIONS & KEY EMPLOYERS (SEPARATE SECTION)  */}
      {/* ========================================================= */}
      <section id="nearby-institutions" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-3 border-b border-slate-200 pb-5">
            <div className="space-y-1 max-w-3xl">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                Nearby Institutions & Major Employers
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                Block D offers prime proximity to the Taxila-Wah educational belt, major industrial complexes, healthcare hubs, and UNESCO Gandhara heritage landmarks.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Structured Category Hubs with Institute Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Universities & Higher Education */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/landmarks/uet-taxila-campus.webp"
                  alt="UET & COMSATS Universities Taxila"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-[#7b002c] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Higher Education</span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-sm text-slate-900">Universities & Colleges</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  COMSATS Wah, HITEC University, and UET Taxila campuses within 8-12 minutes drive.
                </p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">COMSATS</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">HITEC</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">UET Taxila</span>
              </div>
            </div>
          </div>

          {/* Industrial & Defense Hubs */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/landmarks/wah-cantonment.webp"
                  alt="POF Wah Cantt & HIT Industrial Complexes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-blue-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Industrial & Defense</span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-sm text-slate-900">Industrial & Key Employers</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Major regional economic engines including POF Wah Cantt and Heavy Industries Taxila (HIT).
                </p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">POF Cantt</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">HIT Taxila</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">Wah Cantt</span>
              </div>
            </div>
          </div>

          {/* Healthcare Facilities */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/faisal-hills-medical-complex.webp"
                  alt="Margalla Hospital & Medical Centers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Building className="w-3.5 h-3.5" />
                  <span>Healthcare Hub</span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-sm text-slate-900">Healthcare Facilities</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Immediate access to Margalla Hospital, Cantt Medical Centers, and emergency clinics.
                </p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">Margalla Hospital</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">Cantt Clinics</span>
              </div>
            </div>
          </div>

          {/* Heritage & Tourism */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/landmarks/taxila-museum-gandhara.webp"
                  alt="Taxila Museum & Gandhara Heritage Sites"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-amber-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Heritage & Tourism</span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-sm text-slate-900">Heritage & Tourism</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Rich archaeological zone featuring Taxila Museum, Julian ruins & Gandhara sites.
                </p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">Taxila Museum</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">Gandhara Ruins</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 4. BLOCK D MAP AND MASTER PLAN                            */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Blueprint Map Preview Card */}
          <div className="lg:col-span-6 w-full">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 group">
              <img
                src={cms.masterPlan?.mapImage || '/images/faisal-hills-master-plan-map-opt.webp'}
                alt="Faisal Hills Block D Master Plan Map Blueprint"
                className="w-full h-auto object-cover max-h-[420px] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-sm">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Master Plan Blueprint</span>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="px-5 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold shadow-lg hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Maximize2 className="w-4 h-4 text-[#7b002c]" />
                  <span>Expand Map</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Blueprint Narrative, Specs & Actions */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-3">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
                {cms.masterPlan?.heading || 'Block D Map and Master Plan'}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {cms.masterPlan?.description || "The block is planned around internal roads reported from 40 feet upward, with main roads at 100 feet, connecting to the society's wider road network. The plan allocates space for parks and green belts, mosques, schools, healthcare and commercial areas."}
              </p>
            </div>

            {/* Layout Specs Badges Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Main Arteries</span>
                <p className="text-xs font-bold text-slate-900">100ft Main Boulevards</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Sector Streets</span>
                <p className="text-xs font-bold text-slate-900">40ft+ Paved Roads</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Green Zones</span>
                <p className="text-xs font-bold text-slate-900">Parks & Green Belts</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Civic Facilities</span>
                <p className="text-xs font-bold text-slate-900">Mosques & Healthcare</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsMapModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Master Plan</span>
              </button>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 text-slate-700" />
                <span>Interactive View</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PLOT SIZES IN BLOCK D (HTML TABLE)                     */}
      {/* ========================================================= */}
      <section id="plot-sizes" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            {cms.plotSizesSection?.heading || 'Plot Sizes in Block D'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Official dimensions, area in square feet and square yards across residential cuts:
          </p>
        </div>

        {/* HTML Table for Plot Sizes */}
        <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[580px]">
              <thead>
                <tr className="bg-slate-900 text-white font-serif border-b border-slate-300">
                  <th className="p-3.5 sm:p-4 border-r border-slate-800">Dimensions (ft)</th>
                  <th className="p-3.5 sm:p-4 border-r border-slate-800">Area (sq ft)</th>
                  <th className="p-3.5 sm:p-4 border-r border-slate-800">Area (sq yds)</th>
                  <th className="p-3.5 sm:p-4">Sold as</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {(cms.plotSizesSection?.tableRows || [
                  { dimensions: '25 × 50', sqFeet: '1,250', sqYards: '139', soldAs: '5 Marla', status: 'Confirmed' },
                  { dimensions: '30 × 60', sqFeet: '1,800', sqYards: '200', soldAs: '8 Marla', status: 'Confirmed' },
                  { dimensions: '35 × 70', sqFeet: '2,450', sqYards: '272', soldAs: '10 Marla', status: 'Confirmed' },
                  { dimensions: '40 × 80', sqFeet: '3,200', sqYards: '356', soldAs: '14 Marla', status: 'Unconfirmed' },
                  { dimensions: '50 × 90', sqFeet: '4,500', sqYards: '500', soldAs: '1 Kanal', status: 'Confirmed' },
                  { dimensions: '75 × 120', sqFeet: '9,000', sqYards: '1,000', soldAs: '2 Kanal', status: 'Unconfirmed' }
                ]).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-mono font-medium border-r border-slate-200">{row.dimensions}</td>
                    <td className="p-3.5 sm:p-4 font-mono border-r border-slate-200">{row.sqFeet}</td>
                    <td className="p-3.5 sm:p-4 font-mono border-r border-slate-200">{row.sqYards}</td>
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                      {row.soldAs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Size Discrepancy & Marla Calculation Advisory */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          <p>
            <strong>Published size lists disagree.</strong> One dealer page lists a payment plan covering 5.55, 8, 10.89 Marla, 1 Kanal and 2 Kanal, while its own FAQ on the same page lists 5, 8, 10, 14 Marla and 1 Kanal. An agency page lists five sizes with no 2 Kanal. Until the society office confirms the current schedule, treat 14 Marla and 2 Kanal as unconfirmed here.
          </p>
          <p>
            The same plot is also described two ways because Faisal Hills schedules use a 225 sq ft Marla while many listings use 250. A 25 × 50 ft plot is 5 Marla on one measure and 5.55 on the other. <strong>Compare by dimensions and square feet.</strong>
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. POSSESSION IN BLOCK D                                  */}
      {/* ========================================================= */}
      <section id="possession" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            {cms.possessionSection?.heading || 'Possession in Block D'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            This is the block&apos;s strongest claim and the main reason buyers look at it.
          </p>
        </div>

        {/* Development vs Possession Concept Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Development</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              Development means the infrastructure is finished: roads, sewerage, water, electricity and street lighting.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Possession</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              Possession means the developer has formally handed your plot over and issued a possession letter. Construction can legally begin only after that.
            </p>
          </div>
        </div>

        {/* What the Record Shows Narrative */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">What the record shows</h3>
          <p>
            Multiple sources, across more than one network, report that possession has been granted in Block D. One describes it as the first block in the society where possession was handed over to plot owners. Another names 30 June 2025 as the announced possession date. A mid-2026 development review reports possession available in the developed sectors, with owners already building.
          </p>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
            <strong className="block font-semibold">Important check:</strong>
            <span>The one point still open is whether possession applies to the whole block or only to its developed sectors, since sources use both descriptions. Ask which applies to your plot number, and get it in writing.</span>
          </div>
        </div>

        {/* 5-Step How to take possession */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
            How to take possession of a Block D plot
          </h3>

          <div className="space-y-3">
            {[
              { step: 1, text: 'Clear all outstanding dues on the plot by the deadline the society sets.' },
              { step: 2, text: 'Submit proof of payment to the society office.' },
              { step: 3, text: 'Obtain the No Demand Certificate (NDC), which confirms no dues remain against the plot.' },
              { step: 4, text: 'Complete the possession formalities and collect your possession letter.' },
              { step: 5, text: 'Confirm construction approval requirements before starting work.' }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="w-7 h-7 rounded-xl bg-[#7b002c] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {item.step}
                </span>
                <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed pt-0.5">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 italic pt-1 font-sans">
            No other Block D page sets this out on a current page. If a seller or agent cannot explain these steps, treat that as a warning sign rather than a detail.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. THE PAYMENT QUESTION: WHICH PLAN APPLIES (HTML TABLE)  */}
      {/* ========================================================= */}
      <section id="payment-plans" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            {cms.paymentQuestionSection?.heading || 'The Payment Question: Which Plan Applies'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Five different payment structures have been published for Block D. They cannot all be current, and some are years old without any date on the page.
          </p>
        </div>

        {/* HTML Table for the 5 Published Versions */}
        <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-slate-900 text-white font-serif border-b border-slate-300">
                  <th className="p-3.5 sm:p-4 border-r border-slate-800 w-24">Version</th>
                  <th className="p-3.5 sm:p-4 border-r border-slate-800 w-1/3">Where it appears</th>
                  <th className="p-3.5 sm:p-4">Terms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {(cms.paymentQuestionSection?.tableRows || [
                  { version: '1', source: 'Dealer page, 2025', terms: '15 quarterly instalments, a separate possession charge, 21% discount for full payment' },
                  { version: '2', source: 'Same dealer page, updated Aug 2026', terms: '10 quarterly instalments, 20% discount' },
                  { version: '3', source: 'Agency block page, 2025', terms: 'Four years: down payment, 16 quarterly instalments and a possession amount' },
                  { version: '4', source: 'Agency project page, 2025', terms: 'Four-year quarterly instalments' },
                  { version: '5', source: 'Developer-linked prices guide, 2026', terms: 'Residential plots on full cash only' }
                ]).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#7b002c] border-r border-slate-200 font-mono">
                      {row.version}
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-slate-900 border-r border-slate-200">
                      {row.source}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-700 leading-relaxed">
                      {row.terms}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytical Breakdown Notes */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
            Two things worth knowing before you are quoted a figure
          </h3>
          <ul className="space-y-2.5 list-disc pl-5">
            <li>
              <strong>First</strong>, the 2026 version on that dealer page lists totals, down payments and instalments identical to Prime Block&apos;s across all five sizes, to the rupee. Either the two blocks are priced the same by coincidence, or the figures were copied from the Prime Block page.
            </li>
            <li>
              <strong>Second</strong>, that page describes its plan in the past tense, which may mean the plan has closed. It does not say so.
            </li>
          </ul>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-slate-800">
            <p>
              A registration fee is charged on booking, published as both PKR 15,000 and PKR 20,000 by different sources. Some versions also carry a possession amount payable at handover, which the cash-only version does not.
            </p>
            <p className="pt-1">
              Ask for the schedule the developer has issued for the current month, in writing, including the registration fee and any possession charge. Our{' '}
              <Link href="/faisal-hills-payment-plan" className="text-[#7b002c] font-semibold underline underline-offset-4 hover:text-[#9e1245]">
                Faisal Hills payment plan
              </Link>{' '}
              carries the society-wide position.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. BLOCK D PLOT PRICES AND CURRENT RATES (HTML TABLE)     */}
      {/* ========================================================= */}
      <section id="pricing" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            {cms.priceScheduleSection?.heading || 'Block D Plot Prices and Current Rates'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Block D is consistently described as one of the two lowest-priced blocks in the society, alongside Block C. Reported entry prices start around PKR 40 lakh for 5 Marla.
          </p>
        </div>

        {/* HTML Price Table */}
        <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-slate-900 text-white font-serif border-b border-slate-300">
                  <th className="p-3.5 sm:p-4 border-r border-slate-800">Plot size</th>
                  <th className="p-3.5 sm:p-4 border-r border-slate-800">Published band</th>
                  <th className="p-3.5 sm:p-4">Status of market data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {(cms.priceScheduleSection?.tableRows || [
                  { size: '5 Marla', priceRange: 'PKR 40 to 55 lakh', highlight: 'Entry price reported around PKR 40 lakh' },
                  { size: '8 Marla', priceRange: 'Rates on request', highlight: 'Ask for current rates' },
                  { size: '10 Marla', priceRange: 'PKR 70 lakh to 1.15 crore', highlight: 'No asking-price sample available' },
                  { size: '14 Marla', priceRange: 'Rates on request', highlight: 'Availability itself unconfirmed' },
                  { size: '1 Kanal', priceRange: 'PKR 1.40 to 2.10 crore', highlight: 'No asking-price sample available' }
                ]).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                      {row.size}
                    </td>
                    <td className="p-3.5 sm:p-4 font-serif font-bold text-[#7b002c] border-r border-slate-200 whitespace-nowrap">
                      {row.priceRange}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-600 text-xs sm:text-sm">
                      {row.highlight || row.possession}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic font-sans">
          Bands as published elsewhere; replace them with your own current figures and date them. Corner, park-facing and main-road plots sell above standard plots in the same street. Full block-by-block figures:{' '}
          <Link href="/plots" className="text-[#7b002c] font-semibold underline underline-offset-4 hover:text-[#9e1245]">
            Faisal Hills plot prices
          </Link>
          .
        </p>

        {/* Rate Comparison Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-3 font-sans text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
            How Block D plot rates compare
          </h3>
          <p>
            On asking prices analysed for neighbouring blocks in September 2026, a typical 5 Marla plot worked out at roughly PKR 4,160 per square foot in Block C and PKR 4,000 in{' '}
            <Link href="/blocks/block-b" className="text-[#7b002c] font-semibold underline underline-offset-4 hover:text-[#9e1245]">
              Block B
            </Link>
            , against about 6,240 in{' '}
            <Link href="/blocks/block-a" className="text-[#7b002c] font-semibold underline underline-offset-4 hover:text-[#9e1245]">
              Block A
            </Link>
            .
          </p>
          <p>
            Block D plot rates are reported below both. If the 5 Marla entry price of around PKR 40 lakh is accurate, that would work out near <strong>PKR 3,200 per square foot</strong>, which would make Block D the lowest rate among the blocks where possession is available. Treat that as an estimate until we confirm it against completed transactions.
          </p>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
            That is the practical case for Block D: possession at close to the lowest rate in the society, in exchange for distance from the entrance.
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. AVAILABLE INVENTORY / PLOTS FOR SALE                   */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Verified Plots for Sale in Faisal Hills Block D
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Explore live on-ground and file listings with direct seller pricing and biometric transfer:
            </p>
          </div>

          {/* Plot Size Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
            {['All', '5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal'].map((size) => (
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

                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full font-mono text-xs font-bold">
                        Plot #{plot.plotNumber}
                      </span>
                      <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full border border-emerald-400/40 shadow-xs">
                        {plot.status || 'Available'}
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
                      {plot.features?.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
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

        {/* Sell / List Your Plot Banner */}
        <div className="p-6 sm:p-8 bg-rose-50/70 border border-rose-200/80 rounded-3xl text-slate-900 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#7b002c] text-xs font-bold uppercase tracking-wider border border-rose-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Resale & Liquidation Desk</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              Selling a plot in Block D?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-sans">
              We can help with the society office process, from ownership verification through to the NDC.
            </p>
          </div>

          <a
            href={`https://wa.me/${cms.closingSiteVisitSection?.whatsappNumber?.replace(/[^0-9]/g, '') || '923331113177'}?text=Hello!%20I%20want%20to%20sell%20or%20transfer%20my%20plot%20in%20Faisal%20Hills%20Block%20D.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Contact Transfer Desk</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. DYNAMIC PLOT SERIES EXPLORER                           */}
      {/* ========================================================= */}
      <section id="plot-series" className="scroll-mt-28">
        <ScrollReveal direction="up" delay={50}>
          <DynamicPlotSeriesExplorer blockSlug="block-d" blockName="Block D" />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 10. EXPLORE OTHER BLOCKS IN FAISAL HILLS (EXPANDING)      */}
      {/* ========================================================= */}
      <section id="sectors" className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
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
      {/* 10. DEVELOPMENT STATUS AND FACILITIES (HTML TABLE)        */}
      {/* ========================================================= */}
      <section id="development-status" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            {cms.developmentStatusSection?.heading || 'Development Status and Facilities'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            On-ground status of roads, utilities, homes, and community reservations:
          </p>
        </div>

        {/* HTML Table for Facilities */}
        <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[580px]">
              <thead>
                <tr className="bg-slate-900 text-white font-serif border-b border-slate-300">
                  <th className="p-3.5 sm:p-4 border-r border-slate-800 w-1/2">Item</th>
                  <th className="p-3.5 sm:p-4">Reported status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {(cms.developmentStatusSection?.tableRows || [
                  { item: 'Main roads, reported at 100 ft', status: 'Complete' },
                  { item: 'Underground utilities', status: 'Complete' },
                  { item: 'Houses', status: 'Owners building in developed sectors' },
                  { item: 'Parks and green belts', status: 'Allocated on the plan & active' },
                  { item: 'Mosque, school and healthcare sites', status: 'Allocated on the plan' },
                  { item: 'Commercial areas', status: 'Allocated on the plan' }
                ]).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-semibold text-slate-900 border-r border-slate-200">
                      {row.item}
                    </td>
                    <td className="p-3.5 sm:p-4 flex items-center gap-1.5 font-medium text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          <p>
            Statuses as last checked. Dated photographs:{' '}
            <Link href="/gallery" className="text-[#7b002c] font-semibold underline underline-offset-4 hover:text-[#9e1245]">
              development updates & photo gallery
            </Link>
            .
          </p>
          <p>
            Society-wide, a university site and a sports complex are reported as in progress, and Glow Park and a Miyawaki forest exist elsewhere in the scheme. Those are society amenities rather than Block D facilities, and we list them as such.
          </p>
          <p className="italic text-slate-500">
            We describe a facility as built only once our team has seen it. Anything shown on the master plan but not yet constructed is described as planned.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. COMMERCIAL PLOTS IN BLOCK D                           */}
      {/* ========================================================= */}
      <section id="commercial-plots" className="scroll-mt-28 space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            {cms.commercialSection?.heading || 'Commercial Plots in Block D'}
          </h2>
          <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 font-sans">
            <p>
              Block D includes commercial areas within its plan, positioned to serve the surrounding residential streets rather than through traffic. Published commercial sizes and rates for this block are not available from any source we could find, and commercial listings for Block D are scarce.
            </p>
            <p>
              If you are looking at commercial land here, ask us what is genuinely available, at what size, and where it sits relative to the block&apos;s main roads.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. WHO BLOCK D SUITS, AND WHAT TO WEIGH                  */}
      {/* ========================================================= */}
      <section id="who-suits" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            {cms.whoSuitsSection?.heading || 'Who Block D Suits, and What to Weigh'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            It tends to suit buyers who want possession at the lowest entry price in the society, families who prefer a quieter position away from the GT Road, and investors buying into a block where construction has already started.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
          <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
            If you are buying as an investment, weigh these first:
          </h3>

          <div className="space-y-3">
            {(cms.whoSuitsSection?.caveats || [
              'The published record is unreliable. Five payment plans, two size lists and three plot counts circulate. Work only from documents the society office issues.',
              'Possession may be sectoral rather than block-wide. Confirm it for your plot number before paying a possession-plot price.',
              'Distance from the entrance is the trade-off. It is why the block is cheaper, and it will affect resale too.',
              'Commercial information is thin. If commercial is your plan, get sizes and rates in writing first.',
              'A possession charge may apply on some plans and not others.'
            ]).map((caveat, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed font-sans">
                  {caveat}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 italic pt-1 font-sans">
            We do not publish expected returns or appreciation figures for Block D, because no verifiable source supports them.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 13. BLOCK D OR BLOCK C? SIDE-BY-SIDE COMPARISON           */}
      {/* ========================================================= */}
      <section id="compare-block-c" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            {cms.blockDVsCSection?.heading || 'Block D or Block C?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            The two value blocks, side by side.
          </p>
        </div>

        {/* HTML Comparison Table */}
        <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-slate-900 text-white font-serif border-b border-slate-300">
                  <th className="p-3.5 sm:p-4 border-r border-slate-800 w-1/4">Feature</th>
                  <th className="p-3.5 sm:p-4 border-r border-slate-800 w-3/8 text-[#ffb4cb]">Block D</th>
                  <th className="p-3.5 sm:p-4 w-3/8">Block C</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {(cms.blockDVsCSection?.tableRows || [
                  { feature: 'Position', blockD: 'Adjacent to Block C, deeper in', blockC: 'Toward the M-1 side' },
                  { feature: 'Possession', blockD: 'Granted (developed sectors)', blockC: 'Available in completed sectors' },
                  { feature: 'Entry price', blockD: 'Reported from around PKR 40 lakh', blockC: 'Reported from around PKR 35 lakh, though asking prices run higher' },
                  { feature: 'Plot count', blockD: '2,000 to 2,435', blockC: 'About 8,350 residential' },
                  { feature: 'Payment', blockD: 'Five versions published (confirm current)', blockC: 'Cash only, no possession charge' },
                  { feature: 'Suits', blockD: 'Buyers wanting possession at the lowest rate', blockC: 'Buyers wanting the widest choice of 5 Marla plots' }
                ]).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <th className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/70 border-r border-slate-200">
                      {row.feature}
                    </th>
                    <td className="p-3.5 sm:p-4 text-slate-800 font-semibold border-r border-slate-200 bg-rose-50/30">
                      {row.blockD}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-700">
                      {row.blockC}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-600 font-sans">
          Every block is compared on our{' '}
          <Link href="/faisal-hills-blocks" className="text-[#7b002c] font-semibold underline underline-offset-4 hover:text-[#9e1245]">
            Faisal Hills blocks
          </Link>{' '}
          page, and{' '}
          <Link href="/blocks/block-b" className="text-[#7b002c] font-semibold underline underline-offset-4 hover:text-[#9e1245]">
            Block B
          </Link>{' '}
          is the alternative if Margalla views matter more than price.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 14. BUYING AND TRANSFERRING IN BLOCK D                     */}
      {/* ========================================================= */}
      <section id="transfer-guide" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            {cms.buyingTransferSection?.heading || 'Buying and Transferring in Block D'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Whether you buy from the developer or on resale, the checks are the same.
          </p>
        </div>

        {/* 6-Step Buying Checklist */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-3">
          <div className="space-y-2.5">
            {(cms.buyingTransferSection?.steps || [
              'Confirm possession status for that exact plot number, in writing.',
              "Verify ownership at the society office: the name on the allotment letter must match the seller's CNIC.",
              'Check the transfer history for repeated quick transfers.',
              'Ask for the original possession letter where possession has been granted.',
              'Obtain the NDC confirming no dues remain.',
              'Complete the transfer with both parties present or properly represented, and pay only once it is recorded.'
            ]).map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed pt-0.5 font-sans">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#7b002c]" />
            <span>What you will need:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {[
              'Copies of your CNIC, or NICOP for overseas buyers',
              "Copies of your nominee's CNIC",
              'Passport-size photographs',
              "The seller's documents and proof of payment",
              'No Demand Certificate (NDC) clearance receipt',
              "Payment for a new booking made by pay order or demand draft in the developer's registered name"
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Signs Box */}
        <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200 space-y-3 font-sans text-xs sm:text-sm">
          <div className="text-xs font-bold text-[#7b002c] uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#7b002c]" />
            <span>Warning signs to watch out for:</span>
          </div>
          <ul className="space-y-1.5 list-disc pl-5 text-slate-800">
            <li>The seller&apos;s CNIC does not match the allotment letter</li>
            <li>No NDC or possession letter can be produced</li>
            <li>A plan is quoted that you cannot find on any current document</li>
            <li>The price sits well below market with no site visit offered</li>
          </ul>
          <p className="text-slate-600 pt-1">
            Our{' '}
            <Link href="/faisal-hills-noc-status" className="text-[#7b002c] font-semibold underline underline-offset-4 hover:text-[#9e1245]">
              plot verification & NOC guide
            </Link>{' '}
            sets out the checks in order.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 15. READING BLOCK D LISTINGS                              */}
      {/* ========================================================= */}
      <section id="glossary" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
            {cms.readingListingsSection?.heading || 'Reading Block D Listings'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Key real estate terminology decoded for buyers:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(cms.readingListingsSection?.terms || [
            { term: 'Series', definition: 'The plot-number range within the block. Different series sit in different sectors.' },
            { term: 'Possessionable', definition: 'The seller is describing a plot where possession has been granted. Confirm it.' },
            { term: 'Solid land / cutting plot', definition: 'Natural level ground versus a plot formed by cutting or filling sloping ground, which may need site preparation.' },
            { term: 'NDC open / all dues clear', definition: 'The No Demand Certificate is available, so a transfer can proceed.' },
            { term: 'Investor rate', definition: 'A seller signalling a quick sale, worth verifying rather than assuming.' }
          ]).map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
              <strong className="font-serif font-bold text-sm text-[#7b002c] block">
                • {item.term}
              </strong>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 17. FREQUENTLY ASKED QUESTIONS (10 EXACT ITEMS)           */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-5 text-center flex flex-col items-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.faqsSection?.heading || 'Frequently Asked Questions'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl">
            {cms.faqsSection?.subline || 'Clear answers regarding Block D possession status, payment plans, plot sizes, and transfer procedure:'}
          </p>
        </div>

        <FaqAccordion faqs={faqsList} blockName="Block D" />

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600 font-sans">
          Block D falls within the Faisal Hills scheme approved by the Rawalpindi Development Authority. Approval covers the scheme, not an individual plot, so verify your plot separately: see our{' '}
          <Link href="/faisal-hills-noc-status" className="text-[#7b002c] font-semibold underline underline-offset-4 hover:text-[#9e1245]">
            RDA approval details
          </Link>
          .
        </div>
      </section>

      {/* ========================================================= */}
      {/* 18. DIRECT CONSULTATION & INQUIRY FORM (CTA)              */}
      {/* ========================================================= */}
      <section id="contact-desk" className="space-y-6 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
              {cms.closingSiteVisitSection?.heading || 'Block D Plots for Sale: Check Availability'}
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm font-sans leading-relaxed">
              {cms.closingSiteVisitSection?.intro || 'Tell us the size and budget you have in mind, and whether you want to build straight away. We will confirm what is genuinely available, the possession status of specific plots, the current payment terms in writing, and arrange a site visit.'}
            </p>
            <p className="text-slate-700 text-xs sm:text-sm font-sans leading-relaxed font-medium">
              {cms.closingSiteVisitSection?.sellingPrompt || 'Selling a plot in Block D? We can help with the society office process, from ownership verification through to the NDC.'}
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

        {/* Reviewer Disclosure Note */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed font-sans">
          {cms.closingSiteVisitSection?.reviewedByNote || 'About this page: reviewed by Senior Property Verification Desk of Faisal Hills Advisory. Payment and possession details are drawn from published sources and dated where possible; rates per square foot are our own analysis of market listings. Prices and terms change without notice. If you find anything out of date, tell us and we will correct it.'}
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
