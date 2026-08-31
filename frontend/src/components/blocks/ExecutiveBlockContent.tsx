'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { plotInventoryData, PlotItem, fetchPlots, formatPlotPrice } from '@/data/faisalHillsData';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Building2,
  Trees,
  GraduationCap,
  Landmark,
  Phone,
  MessageSquare,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
  Check,
  Send,
  Download,
  Compass,
  Activity,
  Layers,
  BadgeCheck,
  Navigation,
  ExternalLink,
  Calendar,
  Building,
  Tag,
  Eye,
  Maximize2
} from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';

const defaultExecutiveSellingPlots = [
  {
    id: 'exec-plot-5m-1',
    plotNumber: 'EX-104',
    blockName: 'Executive Block',
    category: 'Residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    facing: 'Park Facing',
    priceFormatted: 'PKR 75.0 Lac',
    downPayment: 'PKR 15.0 Lac',
    status: 'Available',
    badge: 'Near Roots School',
    image: '/images/imgi_44_Executive-Block.webp',
    features: ['Walking Distance to Roots School', '100% Level Ready to Build', 'Possession Ready']
  },
  {
    id: 'exec-plot-8m-1',
    plotNumber: 'EX-215',
    blockName: 'Executive Block',
    category: 'Residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    facing: 'Main Boulevard 225ft',
    priceFormatted: 'PKR 1.10 Crore',
    downPayment: 'PKR 22.0 Lac',
    status: 'Hot Deal',
    badge: 'Boulevard Front',
    image: '/images/faisalhillarc.jpg',
    features: ['Wide 225ft Boulevard Front', 'Prime Commercial Walkability', 'Immediate Allotment']
  },
  {
    id: 'exec-plot-10m-1',
    plotNumber: 'EX-320',
    blockName: 'Executive Block',
    category: 'Residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    facing: 'Corner + Green Belt',
    priceFormatted: 'PKR 1.35 Crore',
    downPayment: 'PKR 27.0 Lac',
    status: 'Ready to Build',
    badge: 'Corner Plot',
    image: '/images/faisal-park.jpg',
    features: ['Double Corner Extra Land', 'Lush Park View', 'Active Street Construction']
  },
  {
    id: 'exec-plot-1k-1',
    plotNumber: 'EX-450',
    blockName: 'Executive Block',
    category: 'Residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    facing: 'Margalla Hill View',
    priceFormatted: 'PKR 2.10 Crore',
    downPayment: 'PKR 42.0 Lac',
    status: 'Signature Plot',
    badge: 'VIP Enclave',
    image: '/images/faisal-jewel.jpg',
    features: ['Top-Tier Margalla Panorama', 'Private Cul-de-Sac Street', 'Gated VIP Security']
  },
  {
    id: 'exec-plot-com-1',
    plotNumber: 'EX-COM-05',
    blockName: 'Executive Block',
    category: 'Commercial',
    size: '4 Marla Plaza',
    dimensions: '30 × 30',
    facing: 'Civic Hub Boulevard',
    priceFormatted: 'PKR 2.80 Crore',
    downPayment: 'PKR 56.0 Lac',
    status: 'High ROI',
    badge: 'Commercial Core',
    image: '/images/faisal-jewel.jpg',
    features: ['Ground + 5 Approved Height', 'Direct GT Road Entrance', 'High Footfall Core']
  },
  {
    id: 'exec-plot-com-2',
    plotNumber: 'EX-COM-12',
    blockName: 'Executive Block',
    category: 'Commercial',
    size: '5.33 Marla Plaza',
    dimensions: '40 × 30',
    facing: 'Main Boulevard Axis',
    priceFormatted: 'PKR 3.65 Crore',
    downPayment: 'PKR 73.0 Lac',
    status: 'Prime Frontage',
    badge: 'Faisal Jewel Axis',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    features: ['Facing Faisal Jewel Tower', 'Dedicated Customer Parking', 'Ideal for Brand / Bank']
  },
  {
    id: 'exec-plot-com-3',
    plotNumber: 'EX-COM-18',
    blockName: 'Executive Block',
    category: 'Commercial',
    size: '6 Marla Corner',
    dimensions: '35 × 40',
    facing: 'Double Boulevard Corner',
    priceFormatted: 'PKR 4.20 Crore',
    downPayment: 'PKR 84.0 Lac',
    status: 'Corner Hub',
    badge: 'Double Corner',
    image: '/images/imgi_38_Faisal-Hills-site-home-page-header.webp',
    features: ['Double Main Boulevard Frontage', 'High Rental Yield', 'Approved Commercial Design']
  },
  {
    id: 'exec-plot-com-4',
    plotNumber: 'EX-COM-28',
    blockName: 'Executive Block',
    category: 'Commercial',
    size: '8 Marla Corporate',
    dimensions: '40 × 45',
    facing: 'Entrance Junction',
    priceFormatted: 'PKR 5.50 Crore',
    downPayment: 'PKR 1.10 Crore',
    status: 'Corporate File',
    badge: 'Flagship Site',
    image: '/images/imgi_44_Executive-Block.webp',
    features: ['Multi-Storey Corporate Approval', 'Maximum GT Road Visibility', 'Direct Site Office Access']
  }
];

const executiveAmenities = [
  {
    id: 'civic-hub',
    tag: 'Sector Core',
    title: 'Civic Hub & Monument Gateway',
    image: '/images/faisalhillarc.jpg',
    icon: Building2
  },
  {
    id: 'roots-school',
    tag: 'Operational',
    title: 'Roots International School Campus',
    image: '/images/faisal-roots-school.jpg',
    icon: GraduationCap
  },
  {
    id: 'faisal-jewel',
    tag: '27-Storey Icon',
    title: 'Faisal Jewel Tower',
    image: '/images/faisal-jewel.jpg',
    icon: Landmark
  },
  {
    id: 'mosques',
    tag: 'Spiritual Center',
    title: 'Jamia Masjid Fatima Tuz Zahra',
    image: '/images/imgi_46_Mosques.webp',
    icon: Building
  },
  {
    id: 'community-parks',
    tag: 'Lush Greenery',
    title: 'Executive Parks & Jogging Tracks',
    image: '/images/faisal-park.jpg',
    icon: Trees
  },
  {
    id: 'sports-arena',
    tag: 'Active Sports',
    title: 'Sports Arena & Cricket Ground',
    image: '/images/imgi_48_sports-arena.webp',
    icon: Activity
  },
  {
    id: 'fuel-station',
    tag: '24/7 Utility',
    title: 'Boulevard Fuel Station',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
    icon: FuelIcon
  },
  {
    id: 'gated-security',
    tag: 'VIP Enclave',
    title: 'Gated 24/7 Security & CCTV',
    image: '/images/imgi_44_Executive-Block.webp',
    icon: ShieldCheck
  }
];

function FuelIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

const executiveFaqs = [
  {
    q: 'Where is Executive Block located within Faisal Hills?',
    a: 'Executive Block is located at the flagship front entrance of Faisal Hills, directly on Main GT Road (N-5) Taxila / Islamabad Zone 2, home to the iconic Grand Arc Gate and Faisal Jewel Tower.'
  },
  {
    q: 'Is Faisal Hills Executive Block RDA approved and possession ready?',
    a: 'Yes. Faisal Hills Executive Block has full NOC approval from the Rawalpindi Development Authority (RDA). Possession is fully delivered and families are actively constructing luxury villas and commercial plazas.'
  },
  {
    q: 'What plot sizes are available in Executive Block?',
    a: 'Executive Block features 5 Marla, 8 Marla, 10 Marla, and 1 Kanal residential plots, alongside prime 4 Marla, 5.33 Marla, and corporate commercial plots.'
  },
  {
    q: 'Is Roots International School operational in Executive Block?',
    a: 'Yes. Roots International School Campus is 100% operational on-site and actively educating students with world-class facilities.'
  },
  {
    q: 'How can I buy or transfer a plot in Executive Block?',
    a: 'Transfers are executed officially at the Zedem International Head Office located right at the Faisal Hills entrance with full document verification and zero dealer markup.'
  }
];

export default function ExecutiveBlockContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const [isMasterPlanExpanded, setIsMasterPlanExpanded] = useState(false);
  const [isDevStatusExpanded, setIsDevStatusExpanded] = useState(false);
  const [activeWhyInvestOption, setActiveWhyInvestOption] = useState<number | null>(0);
  const [plotCategoryFilter, setPlotCategoryFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  // Dynamic live plot inventory sync
  const [allPlots, setAllPlots] = useState<PlotItem[]>([]);

  useEffect(() => {
    fetchPlots().then(data => setAllPlots(data)).catch(console.error);

    const handleSync = () => {
      fetchPlots().then(data => setAllPlots(data)).catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handleSync);
    return () => window.removeEventListener('faisal_plots_updated', handleSync);
  }, []);

  // Amenities Horizontal Auto-Scroll
  const amenitiesScrollRef = useRef<HTMLDivElement>(null);
  const [isAmenitiesAutoScrolling, setIsAmenitiesAutoScrolling] = useState(true);

  useEffect(() => {
    if (!isAmenitiesAutoScrolling) return;

    const interval = setInterval(() => {
      if (amenitiesScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = amenitiesScrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const cardStep = 276;

        if (scrollLeft >= maxScroll - 10) {
          amenitiesScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          amenitiesScrollRef.current.scrollBy({ left: cardStep, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isAmenitiesAutoScrolling]);

  const handleAmenitiesScrollLeft = () => {
    if (amenitiesScrollRef.current) {
      amenitiesScrollRef.current.scrollBy({ left: -276, behavior: 'smooth' });
    }
  };

  const handleAmenitiesScrollRight = () => {
    if (amenitiesScrollRef.current) {
      amenitiesScrollRef.current.scrollBy({ left: 276, behavior: 'smooth' });
    }
  };

  // Process and normalize executive plots
  const executivePlots = useMemo(() => {
    const liveBlockPlots = allPlots.filter(
      p => p.blockSlug === 'executive-block' || p.blockName?.toLowerCase().includes('executive') || p.plotNumber?.toUpperCase().startsWith('EX-')
    );

    const liveMapped = liveBlockPlots.map((plot, idx) => ({
      id: plot.id,
      plotNumber: plot.plotNumber || `EX-${idx + 100}`,
      blockName: plot.blockName || 'Executive Block',
      category: plot.category || 'Residential',
      size: plot.size,
      dimensions: plot.dimensions || '25 × 50',
      facing: plot.facing || 'Boulevard Facing',
      priceFormatted: plot.priceFormatted || (plot.price ? formatPlotPrice(plot.price) : 'Contact for Price'),
      downPayment: (plot as any).downPayment || (plot.price ? `PKR ${((plot.price * 0.2) / 100000).toFixed(1)} Lacs (20%)` : 'Contact for Plan'),
      status: plot.status || 'Possession Ready',
      badge: (plot as any).badge || 'Possession Ready',
      image: plot.image || '/images/imgi_44_Executive-Block.webp',
      features: plot.features && plot.features.length > 0 ? plot.features : ['GT Road Frontage', 'Immediate Construction', 'Underground Utilities']
    }));

    const combined: any[] = [...liveMapped];
    defaultExecutiveSellingPlots.forEach(defPlot => {
      if (!combined.some(c => c.id === defPlot.id || c.plotNumber.toUpperCase() === defPlot.plotNumber.toUpperCase())) {
        combined.push(defPlot);
      }
    });

    return combined.slice(0, 8);
  }, [allPlots]);

  // Exclude Executive Block from other blocks showcase
  const otherBlocks = useMemo(() => {
    return defaultFaisalHillsBlocks.filter(b => b.id !== 'executive-block' && b.href !== '/blocks/executive-block');
  }, []);

  // Lead Form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPlot, setLeadPlot] = useState('5 Marla (25x50)');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 lg:space-y-16 pt-2 font-sans text-slate-800">

      {/* ========================================================= */}
      {/* 1. EXECUTIVE BLOCK OVERVIEW                               */}
      {/* ========================================================= */}
      <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-3">
                <TextReveal
                  as="h1"
                  text="Faisal Hills Executive Block Overview"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />
                <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
                  <p>
                    <strong>Faisal Hills Executive Block</strong> is the prestigious flagship sector developed by <Link href="/about-us" className="text-[#7b002c] font-bold hover:underline">Faisal Town Group & Zedem International</Link>. Positioned right at the society’s grand entrance on Main GT Road (N-5), Executive Block serves as the primary civic and commercial epicenter of the entire project.
                  </p>

                  {isOverviewExpanded && (
                    <div className="space-y-3 animate-fadeIn">
                      <p>
                        Home to the iconic 27-storey <Link href="/blocks/faisal-jewel-islamabad" className="text-[#7b002c] font-bold hover:underline">Faisal Jewel Tower</Link>, Faisal Mansion, and the fully operational Roots International School Campus, Executive Block seamlessly combines luxury residential living with high-density commercial investment opportunities.
                      </p>
                      <p>
                        Featuring 225ft wide carpeted boulevards, complete underground electrification, Jamia mosques, and lush green parks, Executive Block is possession-ready with hundreds of family villas under active construction.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                    className="text-[#7b002c] hover:text-[#9e1245] font-semibold underline underline-offset-4 cursor-pointer text-xs sm:text-sm transition-colors inline-block pt-1"
                  >
                    {isOverviewExpanded ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual Photo Card */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal direction="right" delay={100} className="w-full h-full flex flex-col flex-1">
              <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 group flex-1">
                <img
                  src="/images/faisalhillarc.jpg"
                  alt="Faisal Hills Executive Block Monument Entrance Arc Gate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300 bg-rose-950/70 px-2.5 py-0.5 rounded-full border border-rose-800/70 inline-block backdrop-blur-xs">
                    Grand Monument Gateway
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg leading-snug drop-shadow-md text-white">
                    Main GT Road N-5 Entrance
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. LOCATION & ACCESSIBILITY SECTION                       */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-3">
                <TextReveal
                  as="h2"
                  text="Faisal Hills Executive Block Location & Map"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                  staggerDelay={65}
                  direction="left"
                />
                <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
                  <p>
                    Executive Block enjoys an unmatched strategic advantage by fronting directly on the National Highway (GT Road N-5). It is situated directly adjacent to Taxila, Multi Gardens B-17, and Islamabad Zone 2.
                  </p>

                  {isLocationExpanded && (
                    <div className="space-y-3 animate-fadeIn">
                      <p>
                        With immediate access to both Islamabad and Rawalpindi via the N-5 corridor and the upcoming direct M-1 Motorway link, Executive Block ensures effortless daily commuting for residents, business professionals, and overseas investors.
                      </p>
                      <p>
                        Surrounded by the scenic Margalla Hills backdrop, the sector delivers both urban commercial vibrancy and tranquil residential ambiance.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsLocationExpanded(!isLocationExpanded)}
                    className="text-[#7b002c] hover:text-[#9e1245] font-semibold underline underline-offset-4 cursor-pointer text-xs sm:text-sm transition-colors inline-block pt-1"
                  >
                    {isLocationExpanded ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <iframe
                title="Faisal Hills Executive Block Exact Location Google Map"
                src="https://maps.google.com/maps?q=Faisal+Hills+Executive+Block+GT+Road+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed"
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
      {/* 3. MASTER PLAN SECTION                                    */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">

        {/* Mobile View: Title First */}
        <div className="block lg:hidden space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            Faisal Hills Executive Block Master Plan
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Map Container */}
          <div className="lg:col-span-6 flex flex-col">
            <ScrollReveal direction="left" delay={50}>
              <div
                onClick={() => setIsMapModalOpen(true)}
                className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-950 group shadow-lg cursor-pointer flex flex-col justify-center min-h-[300px] sm:min-h-[380px] p-2"
              >
                <img
                  src="/images/faisalexecutivemap.png"
                  alt="Faisal Hills Executive Block Master Plan Map"
                  className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-md flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-[#7b002c]" />
                    <span>Click to Enlarge & Download</span>
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Desktop Narrative & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <ScrollReveal direction="right" delay={100}>
              <div className="space-y-4">

                {/* Desktop Title */}
                <div className="hidden lg:block space-y-2">
                  <TextReveal
                    as="h2"
                    text="Faisal Hills Executive Block Master Plan"
                    className="font-serif text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                    staggerDelay={70}
                    direction="left"
                  />
                </div>

                <p className="hidden lg:block text-slate-600 text-sm leading-relaxed">
                  The master plan of Executive Block is engineered as an integrated self-sustaining community where commercial zones, schools, and parks sit harmoniously beside luxury residential streets.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsMapModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Master Plan</span>
                  </button>
                  <Link
                    href="/master-plan"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-300 transition-all active:scale-95"
                  >
                    <Compass className="w-4 h-4 text-[#7b002c]" />
                    <span>Explore Society Map</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. VERIFIED PLOTS FOR SALE (2 IN A LINE ON MOBILE)         */}
      {/* ========================================================= */}
      <section id="pricing-matrix" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <TextReveal
                as="h2"
                text="Executive Block Plots for Sale — Direct Booking & Verified Files"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                Explore available residential plots and commercial plazas in Executive Block with transparent pricing, zero dealer markup, and immediate allotment file verification.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setPlotCategoryFilter('all')}
                className={`hidden sm:inline-block px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${plotCategoryFilter === 'all'
                    ? 'bg-[#7b002c] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                All Plots ({executivePlots.length})
              </button>
              <button
                type="button"
                onClick={() => setPlotCategoryFilter(plotCategoryFilter === 'residential' ? 'all' : 'residential')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${plotCategoryFilter === 'residential'
                    ? 'bg-[#7b002c] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Residential
              </button>
              <button
                type="button"
                onClick={() => setPlotCategoryFilter(plotCategoryFilter === 'commercial' ? 'all' : 'commercial')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${plotCategoryFilter === 'commercial'
                    ? 'bg-[#7b002c] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Commercial
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Plot Cards Grid (2 in line on mobile, 4 in line on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {executivePlots
            .filter(plot => plotCategoryFilter === 'all' || plot.category.toLowerCase() === plotCategoryFilter)
            .map((plot, idx) => (
              <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 80}>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                  <div>
                    {/* Plot Image Container -> Links to /plots filtered */}
                    <Link
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=executive-block`}
                      className="relative h-28 sm:h-44 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                    >
                      <img
                        src={plot.image}
                        alt={plot.plotNumber}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                      {/* Plot Number & Block */}
                      <div className="absolute bottom-1.5 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white">
                        <span className="text-[8px] sm:text-[10px] text-slate-300 font-medium block uppercase tracking-wider">{plot.blockName}</span>
                        <h4 className="font-serif font-bold text-sm sm:text-xl group-hover:text-amber-300 transition-colors">#{plot.plotNumber}</h4>
                      </div>
                    </Link>

                    {/* Specs Details */}
                    <Link
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=executive-block`}
                      className="p-2.5 sm:p-5 space-y-2 sm:space-y-3.5 block cursor-pointer hover:bg-slate-50/60 transition-colors"
                    >
                      <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-slate-600">
                        <div className="flex justify-between items-center pb-1 sm:pb-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Size:</span>
                          <span className="text-slate-900 font-bold group-hover:text-[#7b002c] transition-colors">{plot.size}</span>
                        </div>
                        <div className="flex justify-between items-center pb-1 sm:pb-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Dims:</span>
                          <strong className="text-slate-900 font-semibold">{plot.dimensions}</strong>
                        </div>
                        <div className="hidden sm:flex justify-between items-center pb-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Orientation:</span>
                          <strong className="text-slate-900 font-semibold">{plot.facing}</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Down:</span>
                          <span className="text-[#7b002c] font-bold text-[9px] sm:text-xs">{plot.downPayment}</span>
                        </div>
                      </div>

                      {/* Feature Pills */}
                      <div className="hidden sm:flex flex-wrap gap-1.5 pt-1">
                        {Array.isArray(plot.features) && plot.features.slice(0, 2).map((feat: string, fIdx: number) => (
                          <span
                            key={fIdx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </div>

                  {/* Price & Action Buttons Footer */}
                  <div className="p-2.5 sm:p-4 pt-2 sm:pt-3 border-t border-slate-100 mt-1 sm:mt-2 space-y-2 sm:space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[8px] sm:text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Price</span>
                      <span className="font-serif font-bold text-xs sm:text-base text-[#7b002c] truncate">{plot.priceFormatted}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1 sm:gap-2">
                      <Link
                        href={`/plots/${plot.id}`}
                        className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-bold rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-0.5 text-center"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </Link>

                      <a
                        href={`https://wa.me/923331113177?text=${encodeURIComponent(`Hi, I am interested in buying Executive Block Plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share verification details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[10px] sm:text-[11px] font-bold rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-1 shadow-sm text-center"
                      >
                        <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>Book</span>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
        </div>

        {/* Sell / List Your Executive Block Plot Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-[#4a081a] to-slate-950 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Resale & Liquidation Desk</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Want to Sell or Assess Your Executive Block Plot / File?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-sans">
              Get an instant official market valuation and list your file for thousands of active verified buyers across Islamabad, Rawalpindi, and overseas.
            </p>
          </div>

          <a
            href="https://wa.me/923331113177?text=Hello!%20I%20want%20to%20list%20or%20sell%20my%20plot%20in%20Faisal%20Hills%20Executive%20Block."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-rose-50 text-[#7b002c] text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shrink-0 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>List Your Plot File</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FACILITIES AND MASTER AMENITIES (AUTO-SCROLL + BUTTONS) */}
      {/* ========================================================= */}
      <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1.5">
              <TextReveal
                as="h2"
                text="Facilities and Amenities in Executive Block"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                staggerDelay={60}
                direction="left"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Executive Block is planned with world-class facilities and modern municipal infrastructure:
              </p>
            </div>

            {/* Scrolling Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleAmenitiesScrollLeft}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer"
                aria-label="Scroll amenities left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleAmenitiesScrollRight}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer"
                aria-label="Scroll amenities right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 8 Facilities & Amenities Cards (Rolling Carousel on Mobile with Auto-Scroll, Grid on Desktop) */}
        <div
          ref={amenitiesScrollRef}
          onTouchStart={() => setIsAmenitiesAutoScrolling(false)}
          onTouchEnd={() => setTimeout(() => setIsAmenitiesAutoScrolling(true), 5000)}
          onMouseEnter={() => setIsAmenitiesAutoScrolling(false)}
          onMouseLeave={() => setIsAmenitiesAutoScrolling(true)}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
          {executiveAmenities.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="w-[260px] sm:w-auto shrink-0 snap-start flex flex-col">
                <ScrollReveal direction="pop" delay={(idx % 4) * 60} className="h-full">
                  <div className="bg-slate-900 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group h-full">
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#7b002c] flex items-center justify-center shadow">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">{item.tag}</span>
                        <strong className="text-sm font-serif font-bold text-white block leading-snug">{item.title}</strong>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WHY INVEST & DEVELOPMENT STATUS                        */}
      {/* ========================================================= */}
      <div className="space-y-10">

        {/* Why Invest Cards (White Background with Mobile Options Accordion) */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="space-y-2">
              <TextReveal
                as="h2"
                text="Why Invest in Faisal Hills Executive Block"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm">
                Why buyers and overseas Pakistanis rank Executive Block as the flagship sector:
              </p>
            </div>
          </ScrollReveal>

          {/* Mobile View: Compact Interactive Options List */}
          <div className="block sm:hidden space-y-2.5">
            {[
              { title: "Strategic GT Road Access", desc: "Direct N-5 frontage with rapid proximity to Rawalpindi, Taxila, and Wah." },
              { title: "RDA Approved Society", desc: "Sanctioned legal status providing full buyer protection and clear titles." },
              { title: "Civic & Commercial Anchor", desc: "Commercial hub supporting both residential value and commercial rental yields." },
              { title: "Visible Active Development", desc: "Active on-ground construction rather than mere renderings and speculative promises." },
              { title: "Family-Friendly Living", desc: "Roots School, Jamia mosques, and community parks already fully functioning." },
              { title: "Long Term Capital Growth", desc: "High appreciation velocity as Faisal Jewel and surrounding plazas near full completion." }
            ].map((item, idx) => {
              const isSelected = activeWhyInvestOption === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveWhyInvestOption(isSelected ? null : idx)}
                  className={`rounded-2xl border transition-all cursor-pointer overflow-hidden ${isSelected
                      ? 'bg-rose-50/50 border-[#7b002c]/40 shadow-xs'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
                    }`}
                >
                  <div className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${isSelected ? 'bg-[#7b002c] text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                        {idx + 1}
                      </div>
                      <strong className={`font-semibold text-xs transition-colors ${isSelected ? 'text-[#7b002c]' : 'text-slate-900'
                        }`}>
                        {item.title}
                      </strong>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transform transition-transform duration-300 ${isSelected ? 'rotate-180 text-[#7b002c]' : ''
                        }`}
                    />
                  </div>

                  {isSelected && (
                    <div className="px-3.5 pb-3.5 pt-0 text-xs text-slate-600 leading-relaxed font-sans border-t border-rose-100/80 mt-1 pt-2 animate-fadeIn">
                      {item.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop View: 6-Card Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              { title: "Strategic GT Road Access", desc: "Direct N-5 frontage with rapid proximity to Rawalpindi, Taxila, and Wah." },
              { title: "RDA Approved Society", desc: "Sanctioned legal status providing full buyer protection and clear titles." },
              { title: "Civic & Commercial Anchor", desc: "Commercial hub supporting both residential value and commercial rental yields." },
              { title: "Visible Active Development", desc: "Active on-ground construction rather than mere renderings and speculative promises." },
              { title: "Family-Friendly Living", desc: "Roots School, Jamia mosques, and community parks already fully functioning." },
              { title: "Long Term Capital Growth", desc: "High appreciation velocity as Faisal Jewel and surrounding plazas near full completion." }
            ].map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={(idx % 3) * 60}>
                <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2 hover:border-[#7b002c]/40 hover:bg-white transition-all hover:scale-[1.02] h-full shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <strong className="text-slate-900 block font-bold text-sm">{item.title}</strong>
                  <span className="text-slate-600 leading-relaxed block">{item.desc}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* On-Ground Development Status */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

            {/* Left Column: Narrative Content & Status Counters */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
              <ScrollReveal direction="left" delay={50}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <TextReveal
                      as="h2"
                      text="Executive Block Development Status"
                      className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                      staggerDelay={65}
                      direction="left"
                    />
                  </div>

                  <p className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">
                    Development in Executive Block is 100% operational with possession fully delivered. Roads, underground electricity, sewer lines, water supply, and street lighting are fully functional.
                  </p>

                  {isDevStatusExpanded && (
                    <div className="space-y-4 animate-fadeIn">
                      <p>
                        Roots International School is actively educating students on-site. The structural framework of the 27-storey Faisal Jewel Tower is at an advanced completion stage.
                      </p>
                      <p>
                        Families are actively residing in constructed luxury houses, while high-profile commercial plazas along the main boulevard are operating brand retail outlets.
                      </p>
                    </div>
                  )}

                    <button
                      type="button"
                      onClick={() => setIsDevStatusExpanded(!isDevStatusExpanded)}
                      className="text-[#7b002c] hover:text-[#9e1245] font-semibold underline underline-offset-4 cursor-pointer text-xs sm:text-sm transition-colors inline-block pt-1"
                    >
                      {isDevStatusExpanded ? 'See less' : 'See more'}
                    </button>
                  </div>

                {/* Quick Status Metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-slate-100">
                  <div className="p-3 sm:p-4 bg-slate-50 hover:bg-rose-50/50 rounded-2xl border border-slate-200/80 text-center space-y-1 shadow-2xs transition-all">
                    <span className="text-base sm:text-2xl font-serif font-bold text-[#7b002c] block">95%+</span>
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 block leading-tight">Roads Carpeted</span>
                  </div>
                  <div className="p-3 sm:p-4 bg-slate-50 hover:bg-rose-50/50 rounded-2xl border border-slate-200/80 text-center space-y-1 shadow-2xs transition-all">
                    <span className="text-base sm:text-2xl font-serif font-bold text-[#7b002c] block">100%</span>
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 block leading-tight">Underground Grid</span>
                  </div>
                  <div className="p-3 sm:p-4 bg-slate-50 hover:bg-rose-50/50 rounded-2xl border border-slate-200/80 text-center space-y-1 shadow-2xs transition-all">
                    <span className="text-base sm:text-2xl font-serif font-bold text-emerald-700 block">Possession</span>
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 block leading-tight">Ready to Build</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Real On-Ground Development Photo */}
            <div className="lg:col-span-5 flex flex-col">
              <ScrollReveal direction="right" delay={120} className="w-full h-full flex flex-col flex-1">
                <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 group flex-1">
                  <img
                    src="/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
                    alt="Faisal Hills Executive Block On-Ground Development Status & Aerial View"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-emerald-600/90 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs border border-emerald-400/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Possession Delivered</span>
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300 bg-rose-950/70 px-2.5 py-0.5 rounded-full border border-rose-800/70 inline-block backdrop-blur-xs">
                      Verified Aerial Drone Survey
                    </span>
                    <h4 className="font-serif font-bold text-base sm:text-lg leading-snug drop-shadow-md text-white">
                      Executive Sector On-Ground Progress
                    </h4>
                    <p className="text-xs text-slate-300">
                      Wide carpeted boulevards, complete utilities, and active on-ground villa construction.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </section>

        {/* Step-by-Step Transfer & Booking Process (Animated 4-Point Roadmap) */}
        <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="space-y-2">
              <TextReveal
                as="h2"
                text="Faisal Hills Executive Block Transfer Process"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans">
                Follow these 4 essential points to complete official plot transfer directly at Zedem International:
              </p>
            </div>
          </ScrollReveal>

          {/* Points Timeline / Roadmap Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {[
              {
                point: '01',
                tag: 'Step 1: Identity',
                title: 'CNIC / NICOP Copies',
                points: [
                  'Two verified photocopies of buyer CNIC / NICOP',
                  'One photocopy of Next-of-Kin (Nominee) CNIC',
                  'Passport copies for Overseas Pakistani buyers'
                ],
                badge: 'Attested Copies Required'
              },
              {
                point: '02',
                tag: 'Step 2: Photos',
                title: 'Passport Photographs',
                points: [
                  'Two recent passport-size color photographs',
                  'Clear blue background',
                  'Applicant name written on back'
                ],
                badge: 'Recent Photographs'
              },
              {
                point: '03',
                tag: 'Step 3: Payment',
                title: 'Pay Order / Bank Draft',
                points: [
                  'Pay Order in favour of "Zedem International"',
                  'Transfer fee receipt from society counter',
                  'Direct online wire verification for NRPs'
                ],
                badge: 'Official Bank Draft'
              },
              {
                point: '04',
                tag: 'Step 4: Transfer',
                title: 'Allotment Letter Transfer',
                points: [
                  'Official transfer execution at head office counter',
                  'Immediate biometric record verification',
                  'New registered owner allotment letter handover'
                ],
                badge: 'Official Allotment Handover'
              }
            ].map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 70}>
                <div className="bg-slate-50 hover:bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-[#7b002c]/50 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full space-y-4 relative overflow-hidden">

                  {/* Subtle Top Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-[#7b002c] text-white flex items-center justify-center font-serif font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                        {item.point}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b002c] bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/70">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors pt-1">
                      {item.title}
                    </h3>

                    {/* Bullet Points */}
                    <ul className="space-y-1.5 pt-1 text-xs text-slate-600 font-sans">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirement Badge Footer */}
                  <div className="pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.badge}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Transfer Desk Banner */}
          <div className="p-5 bg-gradient-to-r from-slate-900 via-[#4a081a] to-slate-950 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-white/10">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif font-bold text-base sm:text-lg text-white">Need Assistance with Plot Transfer & File Verification?</h4>
              <p className="text-xs text-rose-100/80 font-sans">Our dedicated transfer advisory desk verifies society records and guides you step-by-step.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/923331113177?text=Hi%2C%20I%20need%20official%20assistance%20with%20plot%20transfer%20in%20Faisal%20Hills%20Executive%20Block."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Transfer Desk</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ========================================================= */}
      {/* 7. COMPARE OTHER FAISAL HILLS BLOCKS (CAROUSEL SHOWCASE)  */}
      {/* ========================================================= */}
      <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <TextReveal
              as="h2"
              text="Explore All Faisal Hills Blocks & Landmarks"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl font-sans">
              Hover across the sector columns to view each block's location advantages, development progress, and direct links to full block details:
            </p>
          </div>
        </ScrollReveal>

        {/* Panoramic Expanding Cards Showcase (Filtered Without Executive Block) */}
        <ScrollReveal direction="up" delay={100}>
          <ExpandingProjectsShowcase
            items={otherBlocks}
            defaultActiveIndex={0}
            containerHeightClass="h-[460px] sm:h-[500px] lg:h-[540px]"
            roundedClass="rounded-2xl sm:rounded-3xl"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 8. FREQUENTLY ASKED QUESTIONS (FAQS)                      */}
      {/* ========================================================= */}
      <section className="py-12 lg:py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">

          {/* Left Column: Sticky FAQ'S Title */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-24 self-start">
            <span className="label-caps text-[#7b002c] font-bold block mb-1 text-xs uppercase tracking-widest">FAQ&apos;S</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#7b002c] tracking-tight leading-[1.15] uppercase">
              Frequently Asked Questions (FAQS)
            </h2>
          </div>

          {/* Right Column: Clean Horizontal Separated Accordion */}
          <div className="lg:col-span-8 space-y-0 border-t border-slate-900/80">
            {executiveFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <ScrollReveal key={index} direction="up" delay={(index % 4) * 60}>
                  <div className="border-b border-slate-900/80">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors group"
                    >
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#7b002c] group-hover:text-[#9e1245] uppercase tracking-wider pr-4 leading-snug">
                        {`${index + 1}. ${faq.q}`}
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
      {/* 9. SCHEDULE A TOUR & DIRECT INQUIRY FORM                  */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-r from-slate-950 via-[#500a1d] to-slate-950 p-8 sm:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden border border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-3.5 py-1 rounded-full border border-white/15 inline-block backdrop-blur-xs">
            Direct Developer Facilitation Desk
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Schedule an On-Site Executive Block Tour
          </h3>
          <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-sans">
            Leave your contact details to receive verified plot listings, latest market rates, and official allotment files directly on WhatsApp.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center space-y-3 animate-fade-in relative z-10 mt-6">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xl text-white">Inquiry Received!</h4>
            <p className="text-xs text-rose-100 max-w-md mx-auto font-sans">
              Thank you, <strong>{leadName}</strong>. Our Executive Block property specialist will contact you on <strong>{leadPhone}</strong> with available plot files.
            </p>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4 max-w-2xl mx-auto relative z-10 mt-6 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Syed Sahil Shah"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white placeholder:text-rose-200/50 focus:outline-none focus:border-white transition-all"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +92 333 1113177"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white placeholder:text-rose-200/50 focus:outline-none focus:border-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Plot Category / Size</label>
                <select
                  value={leadPlot}
                  onChange={(e) => setLeadPlot(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-white/25 rounded-xl text-xs text-white focus:outline-none focus:border-white transition-all"
                >
                  <option value="5 Marla (25x50)">5 Marla Residential (25x50)</option>
                  <option value="8 Marla (30x60)">8 Marla Residential (30x60)</option>
                  <option value="10 Marla (35x70)">10 Marla Residential (35x70)</option>
                  <option value="1 Kanal (50x90)">1 Kanal Residential (50x90)</option>
                  <option value="4 Marla Plaza">4 Marla Commercial Plaza</option>
                  <option value="5.33 Marla Plaza">5.33 Marla Commercial Plaza</option>
                  <option value="6 Marla Corner">6 Marla Commercial Corner</option>
                  <option value="8 Marla Corporate">8 Marla Corporate Boulevard</option>
                </select>
              </div>

              <div className="space-y-1 text-left flex flex-col justify-end">
                <button
                  type="submit"
                  className="w-full py-3 bg-white hover:bg-rose-50 text-[#7b002c] rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry Request</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </section>

      {/* Lightbox / Map Download Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        blockName="Executive Block"
        mapImageUrl="/images/faisalexecutivemap.png"
        mapPdfUrl="/images/faisalexecutivemap.png"
      />

    </div>
  );
}
