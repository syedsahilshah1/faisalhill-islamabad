'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  PlotItem,
  plotInventoryData,
  fetchPlots,
  formatPlotPrice
} from '@/data/faisalHillsData';
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
  Sparkles,
  Award,
  Check,
  Send,
  Download,
  Compass,
  Activity,
  Layers,
  ChevronRight,
  BadgeCheck,
  Navigation,
  ExternalLink,
  Calendar,
  Building,
  Percent,
  Maximize2,
  ArrowRight,
  Home,
  Tag,
  Filter,
  DollarSign
} from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import PaymentPlanModal from '@/components/ui/PaymentPlanModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';

interface PrimePriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  totalPrice: string;
  downPayment: string;
  quarterlyInstallment: string;
  balloting: string;
  possession: string;
  duration: string;
  status: string;
}

const primeFixedPriceSchedule: PrimePriceRow[] = [
  {
    size: '5 Marla',
    dimensions: '25 × 50',
    sqYards: '139 Sq. Yds',
    totalPrice: 'PKR 32,50,000',
    downPayment: 'PKR 6,50,000 (20%)',
    quarterlyInstallment: 'PKR 1,45,000 × 16 Qtrs',
    balloting: 'PKR 3,25,000 (10%)',
    possession: 'PKR 3,25,000 (10%)',
    duration: '48 Months (4 Years)',
    status: 'High Demand — Booking Open'
  },
  {
    size: '8 Marla',
    dimensions: '30 × 60',
    sqYards: '200 Sq. Yds',
    totalPrice: 'PKR 48,00,000',
    downPayment: 'PKR 9,60,000 (20%)',
    quarterlyInstallment: 'PKR 2,15,000 × 16 Qtrs',
    balloting: 'PKR 4,80,000 (10%)',
    possession: 'PKR 4,80,000 (10%)',
    duration: '48 Months (4 Years)',
    status: 'Fast Selling — Premium Sector'
  },
  {
    size: '10 Marla',
    dimensions: '35 × 70',
    sqYards: '272 Sq. Yds',
    totalPrice: 'PKR 58,50,000',
    downPayment: 'PKR 11,70,000 (20%)',
    quarterlyInstallment: 'PKR 2,65,000 × 16 Qtrs',
    balloting: 'PKR 5,85,000 (10%)',
    possession: 'PKR 5,85,000 (10%)',
    duration: '48 Months (4 Years)',
    status: 'Top Choice for Families'
  },
  {
    size: '14 Marla',
    dimensions: '40 × 80',
    sqYards: '355 Sq. Yds',
    totalPrice: 'PKR 76,50,000',
    downPayment: 'PKR 15,30,000 (20%)',
    quarterlyInstallment: 'PKR 3,45,000 × 16 Qtrs',
    balloting: 'PKR 7,65,000 (10%)',
    possession: 'PKR 7,65,000 (10%)',
    duration: '48 Months (4 Years)',
    status: 'Executive Villa Sector'
  },
  {
    size: '1 Kanal',
    dimensions: '50 × 90',
    sqYards: '500 Sq. Yds',
    totalPrice: 'PKR 99,00,000',
    downPayment: 'PKR 19,80,000 (20%)',
    quarterlyInstallment: 'PKR 4,50,000 × 16 Qtrs',
    balloting: 'PKR 9,90,000 (10%)',
    possession: 'PKR 9,90,000 (10%)',
    duration: '48 Months (4 Years)',
    status: 'Luxury Crest Mansions'
  }
];

const primeGalleryItems = [
  {
    id: 1,
    title: 'Prime Block Grand Boulevards & Wide Paved Roads',
    category: 'infrastructure',
    tag: '225ft Main Boulevard',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    desc: 'Wide 225ft and 150ft carpeted road networks with modern streetscaping, LED lighting and green dividers.'
  },
  {
    id: 2,
    title: 'Scenic Margalla Ridge Panoramic Crest Enclave',
    category: 'nature',
    tag: 'Margalla Views',
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg',
    desc: 'Breathtaking high-elevation vistas over the Margalla Hills and serene natural green topography.'
  },
  {
    id: 3,
    title: 'Prime Block Community Park & Family Greens',
    category: 'infrastructure',
    tag: 'Family Parks',
    image: '/images/faisal-park.jpg',
    desc: 'Dedicated family park spaces with jogging tracks, children play zones, and manicured landscaping.'
  },
  {
    id: 4,
    title: 'Commercial Plazas & High-End Retail Hubs',
    category: 'infrastructure',
    tag: 'Commercial Plazas',
    image: '/images/faisal-jewel.jpg',
    desc: 'Ground+5 commercial plots positioned along main intersections, ideal for supermarkets and brand outlets.'
  },
  {
    id: 5,
    title: 'Sports Grounds, Futsal Turf & Fitness Greens',
    category: 'infrastructure',
    tag: 'Sports & Wellness',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
    desc: 'Dedicated sports facilities for youth, outdoor workout fitness gyms, and badminton courts.'
  },
  {
    id: 6,
    title: '24/7 Gated Security & Smart Surveillance Grid',
    category: 'infrastructure',
    tag: 'Safe Society',
    image: '/images/faisalhillarc.jpg',
    desc: 'Round-the-clock security checkpoints, motorized patrolling units, and full perimeter boundary walls.'
  },
  {
    id: 7,
    title: 'Modern Educational Campuses & Schooling Zone',
    category: 'infrastructure',
    tag: 'Education Hub',
    image: '/images/faisal-roots-school.jpg',
    desc: 'Allocated institutional plots for recognized school networks and international curriculum academies.'
  },
  {
    id: 8,
    title: 'Grand Jamia Mosque & Neighborhood Prayer Halls',
    category: 'infrastructure',
    tag: 'Jamia Mosque',
    image: '/images/faisalhillarc.jpg',
    desc: 'Architecturally stunning air-conditioned Jamia Mosque with spacious ablution areas and Islamic center.'
  }
];

const primeTravelTimes = [
  { destination: 'Main GT Road (N-5) Access', time: '1 Min', distance: '0.5 km', note: 'Direct Sector Access' },
  { destination: 'Margalla Avenue (Islamabad Link)', time: '5 Mins', distance: '4.2 km', note: 'Signal-Free Fast Track' },
  { destination: 'M-1 Islamabad-Peshawar Motorway', time: '10 Mins', distance: '9.0 km', note: 'Via Taxila Interchange' },
  { destination: 'Islamabad New International Airport', time: '25 Mins', distance: '28 km', note: 'Via Motorway M-1' }
];

const primeFaqs = [
  {
    q: 'What is the current payment plan for Faisal Hills Prime Block?',
    a: 'Prime Block is available on an accessible 4-year (48-month) flexible installment schedule featuring 16 quarterly payments after a 20% down payment. Booking prices are official company launch rates with zero speculative dealer premium.'
  },
  {
    q: 'Is Prime Block approved by the Rawalpindi Development Authority (RDA)?',
    a: 'Yes. Faisal Hills holds full NOC sanctioning from the Rawalpindi Development Authority (RDA) covering the entire master-planned scheme, ensuring 100% legal security and verified land ownership titles.'
  },
  {
    q: 'What plot sizes are available in Faisal Hills Prime Block?',
    a: 'Prime Block offers residential plots in 5 Marla (25×50), 8 Marla (30×60), 10 Marla (35×70), 14 Marla (40×80), and 1 Kanal (50×90) sizes. Additionally, commercial plaza plots of 4 Marla and 5.33 Marla with Ground+5 permission are planned along the 225ft boulevard.'
  },
  {
    q: 'Where is Prime Block located within Faisal Hills?',
    a: 'Prime Block occupies the prestigious high-elevation crest ridge overlooking the Margalla Hills. It enjoys direct dual connectivity from the 225ft Main Boulevard near the Grand Arc Entrance with swift signal-free access to GT Road (N-5) and Margalla Avenue.'
  },
  {
    q: 'Can Overseas Pakistanis book a plot in Prime Block remotely?',
    a: 'Yes. Overseas Pakistanis (NRPs) can book directly through our authorized sales desk. You can submit digital CNIC/NICOP documents, transfer the booking payment directly to Zedem International’s official bank account, and receive the verified allotment file via registered courier or collected in person.'
  },
  {
    q: 'When will on-ground possession be handed over in Prime Block?',
    a: 'On-ground development and earthwork are being executed at high speed with heavy machinery. Official possession balloting is scheduled in accordance with the 4-year installment plan milestones.'
  }
];

const defaultPrimeSellingPlots = [
  {
    id: 'prime-plot-5m-1',
    plotNumber: 'PR-142',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    facing: 'Park Facing',
    priceFormatted: 'PKR 34.5 Lac',
    downPayment: 'PKR 6,90,000 (20%)',
    status: 'Available',
    badge: 'Near Park',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    features: ['Direct Walking Distance to Park', '100% Level Ground', '4-Year Installments']
  },
  {
    id: 'prime-plot-8m-1',
    plotNumber: 'PR-218',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    facing: 'Main Boulevard 225ft',
    priceFormatted: 'PKR 51.0 Lac',
    downPayment: 'PKR 10,20,000 (20%)',
    status: 'Hot Deal',
    badge: 'Boulevard Front',
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg',
    features: ['Wide 225ft Road Access', 'High Elevation Ridge View', 'Commercial Walkability']
  },
  {
    id: 'prime-plot-10m-1',
    plotNumber: 'PR-305',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    facing: 'Corner + Green Belt',
    priceFormatted: 'PKR 62.0 Lac',
    downPayment: 'PKR 12,40,000 (20%)',
    status: 'Ready to Book',
    badge: 'Corner Plot',
    image: '/images/faisal-park.jpg',
    features: ['Double Corner Extra Land', 'Lush Green Belt View', 'Instant Allotment File']
  },
  {
    id: 'prime-plot-1k-1',
    plotNumber: 'PR-450',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    facing: 'Margalla Hill View',
    priceFormatted: 'PKR 1.05 Crore',
    downPayment: 'PKR 21,00,000 (20%)',
    status: 'Signature Plot',
    badge: 'VIP Ridge',
    image: '/images/faisalhillarc.jpg',
    features: ['Top-Tier Margalla Panorama', 'Private Cul-de-Sac Street', 'Gated VIP Security']
  },
  {
    id: 'prime-plot-com-1',
    plotNumber: 'PR-COM-08',
    blockName: 'Prime Block',
    category: 'Commercial',
    size: '4 Marla Plaza',
    dimensions: '30 × 30',
    facing: 'Main Boulevard',
    priceFormatted: 'PKR 1.95 Crore',
    downPayment: 'PKR 39,00,000 (20%)',
    status: 'High ROI',
    badge: 'Commercial Hub',
    image: '/images/faisal-jewel.jpg',
    features: ['Ground + 5 Commercial Height', '225ft Road Frontage', 'High Rental Footfall']
  },
  {
    id: 'prime-plot-com-2',
    plotNumber: 'PR-COM-15',
    blockName: 'Prime Block',
    category: 'Commercial',
    size: '5.33 Marla Plaza',
    dimensions: '40 × 30',
    facing: 'Civic Center',
    priceFormatted: 'PKR 2.65 Crore',
    downPayment: 'PKR 53,00,000 (20%)',
    status: 'Prime Frontage',
    badge: 'Civic Core',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    features: ['Central Civic Market Position', 'Dedicated Customer Parking', 'Ideal for Bank / Brand']
  },
  {
    id: 'prime-plot-com-3',
    plotNumber: 'PR-COM-24',
    blockName: 'Prime Block',
    category: 'Commercial',
    size: '6 Marla Corner',
    dimensions: '35 × 40',
    facing: 'Main Boulevard Corner',
    priceFormatted: 'PKR 3.10 Crore',
    downPayment: 'PKR 62,00,000 (20%)',
    status: 'Corner Plot',
    badge: 'Double Corner',
    image: '/images/faisal-hills-site-home-page-header.webp',
    features: ['Double Main Boulevard Frontage', 'High Rental Yield', 'Approved Commercial Design']
  },
  {
    id: 'prime-plot-com-4',
    plotNumber: 'PR-COM-32',
    blockName: 'Prime Block',
    category: 'Commercial',
    size: '8 Marla Corporate',
    dimensions: '40 × 45',
    facing: 'Boulevard Junction',
    priceFormatted: 'PKR 4.20 Crore',
    downPayment: 'PKR 84,00,000 (20%)',
    status: 'Corporate File',
    badge: 'Mega Hub',
    image: '/images/imgi_44_Executive-Block.webp',
    features: ['Multi-Storey Brand Approval', 'Maximum Vehicle Visibility', 'Direct GT Road Link']
  }
];

export default function PrimeBlockContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isPaymentPlanLightboxOpen, setIsPaymentPlanLightboxOpen] = useState(false);
  const [isPaymentPlanDownloadOpen, setIsPaymentPlanDownloadOpen] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const [isMasterPlanExpanded, setIsMasterPlanExpanded] = useState(false);
  const [isDevStatusExpanded, setIsDevStatusExpanded] = useState(false);
  const [activeWhyInvestOption, setActiveWhyInvestOption] = useState<number | null>(0);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'infrastructure' | 'nature' | 'amenities'>('all');
  const [plotCategoryFilter, setPlotCategoryFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  // Dynamic live plot inventory sync from Laravel Backend Dashboard / LocalStorage / API
  const [allPlots, setAllPlots] = useState<PlotItem[]>([]);

  useEffect(() => {
    fetchPlots().then(data => setAllPlots(data || [])).catch(console.error);

    const handleSync = () => {
      fetchPlots().then(data => setAllPlots(data || [])).catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handleSync);
    return () => window.removeEventListener('faisal_plots_updated', handleSync);
  }, []);

  const amenitiesScrollRef = useRef<HTMLDivElement>(null);
  const [isAmenitiesAutoScrolling, setIsAmenitiesAutoScrolling] = useState(true);

  // Auto-scroll for amenities
  useEffect(() => {
    if (!isAmenitiesAutoScrolling) return;

    const interval = setInterval(() => {
      if (amenitiesScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = amenitiesScrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const cardStep = 286; // 270px card width + 16px gap

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
      amenitiesScrollRef.current.scrollBy({ left: -286, behavior: 'smooth' });
    }
  };

  const handleAmenitiesScrollRight = () => {
    if (amenitiesScrollRef.current) {
      amenitiesScrollRef.current.scrollBy({ left: 286, behavior: 'smooth' });
    }
  };

  const defaultPrimePlotImages = [
    '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg',
    '/images/faisalhillarc.jpg',
    '/images/faisal-park.jpg',
    '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg',
    '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
    '/images/faisal-jewel.jpg',
    '/images/faisal-roots-school.jpg'
  ];

  const primePlots = useMemo(() => {
    // 1. Get all plots matching prime-block from live API / store
    const liveBlockPlots = allPlots.filter(
      p => p.blockSlug === 'prime-block' || p.blockName?.toLowerCase().includes('prime') || p.plotNumber?.toUpperCase().startsWith('PR-')
    );

    // 2. Map and normalize live plots so they fit the card layout
    const liveMapped = liveBlockPlots.map((plot, idx) => ({
      id: plot.id,
      plotNumber: plot.plotNumber || `PR-${idx + 100}`,
      blockName: plot.blockName || 'Prime Block',
      category: plot.category || 'Residential',
      size: plot.size,
      dimensions: plot.dimensions || '25 × 50',
      facing: plot.facing || 'Park Facing',
      priceFormatted: plot.priceFormatted || (plot.price ? formatPlotPrice(plot.price) : 'Contact for Price'),
      downPayment: (plot as any).downPayment || (plot.price ? `PKR ${((plot.price * 0.2) / 100000).toFixed(1)} Lacs (20%)` : '20% Down Payment'),
      status: plot.status || 'Ready to Book',
      badge: (plot as any).badge || (plot.facing?.toLowerCase().includes('park') ? 'Park Facing' : '4-Year Plan'),
      image: plot.image || defaultPrimePlotImages[idx % defaultPrimePlotImages.length],
      features: plot.features && plot.features.length > 0 ? plot.features : ['Near 225ft Boulevard', 'Underground Utilities', 'Immediate Verification']
    }));

    // 3. Combine with default fallback plots if not already present
    const combined: any[] = [...liveMapped];
    defaultPrimeSellingPlots.forEach(defPlot => {
      if (!combined.some(c => c.id === defPlot.id || c.plotNumber.toUpperCase() === defPlot.plotNumber.toUpperCase())) {
        combined.push(defPlot);
      }
    });

    return combined.slice(0, 8);
  }, [allPlots]);

  // Exclude Prime Block from other blocks showcase
  const otherBlocks = useMemo(() => {
    return defaultFaisalHillsBlocks.filter(b => b.id !== 'prime-block' && b.href !== '/blocks/prime-block');
  }, []);

  // Lead Form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPlot, setLeadPlot] = useState('5 Marla (25x50)');
  const [leadNote, setLeadNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 lg:space-y-16">

      {/* ========================================================= */}
      {/* 1. OVERVIEW (SECTOR OVERVIEW & VISION)                    */}
      {/* ========================================================= */}
      <section className="space-y-8">
        {/* Sector Overview & Vision */}
        <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <ScrollReveal direction="left" delay={50}>
                <div className="space-y-3">
                  <TextReveal
                    as="h2"
                    text="Prime Block Overview & Vision"
                    className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                    staggerDelay={65}
                    direction="left"
                  />
                  <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
                    <p>
                      <strong>Faisal Hills Prime Block</strong> is the premier, master-planned residential and commercial sector developed by <Link href="/about-us" className="text-[#7b002c] font-bold hover:underline">Faisal Town Group & Zedem International</Link>. Occupying the highest elevation ridge of the entire society, Prime Block commands scenic, unobstructed panoramas of the Margalla Hills while enjoying direct connectivity to the Grand Entrance and the Main GT Road (N-5).
                    </p>

                    {isOverviewExpanded && (
                      <div className="space-y-3 animate-fadeIn">
                        <p>
                          Unlike standard resale sectors where prices fluctuate dynamically across plot series, Prime Block is introduced with <strong>official fixed launch rates</strong> and an accessible <strong>4-year (48-month) flexible installment plan</strong>. This makes it the highest priority investment choice for families seeking to build modern homes and savvy investors securing early-phase capital growth.
                        </p>
                        <p>
                          Featuring an expansive 225ft wide Main Boulevard, 100% underground high-capacity electrification, modern drainage networks, dedicated school campuses, and vibrant commercial plazas, Prime Block is engineered as a self-sustaining luxury lifestyle zone.
                        </p>
                        <div className="p-4 bg-gradient-to-r from-rose-50/90 via-rose-50/50 to-amber-50/60 rounded-2xl border border-rose-200/80 text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-3 shadow-2xs">
                          <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                          <span>
                            <strong>Investor Insight:</strong> Prime Block's official installment schedule allows buyers to lock in pre-development pricing before on-ground possession milestones trigger immediate capital appreciation.
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                        className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#7b002c] hover:text-[#9e1245] bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200/80 transition cursor-pointer"
                      >
                        <span>{isOverviewExpanded ? 'See Less' : 'See More Overview Details'}</span>
                        <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isOverviewExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <ScrollReveal direction="right" delay={80} className="w-full flex-1">
                <div className="relative min-h-[300px] lg:min-h-[360px] w-full h-full rounded-3xl overflow-hidden border border-slate-200 shadow-lg group">
                  <img
                    src="/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
                    alt="Faisal Hills Prime Block On-Ground Development"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Fast-Track Development</span>
                    <h3 className="font-serif font-bold text-xl text-white">Prime Block On-Ground Execution</h3>
                    <p className="text-xs text-slate-200 mt-1">Carpeted boulevards, dedicated green spaces, and high-elevation residential sectors.</p>
                  </div>
                </div>
              </ScrollReveal>

              <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 text-xs text-slate-700 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-[#7b002c] shrink-0" />
                  <span>Download the official Faisal Hills Prime Block master map & zoning plan.</span>
                </div>
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-xl shrink-0 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Map</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* ========================================================= */}
      {/* 2. LOCATION & STRATEGIC ACCESSIBILITY                      */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

          {/* Left Column: Accessibility & Commute Badges */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-3">

                <TextReveal
                  as="h2"
                  text="Prime Block Location & Map"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                  staggerDelay={65}
                  direction="left"
                />
                <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
                  <p>
                    Prime Block is located right along the Main GT Road corridor near the Grand Society Entrance. With immediate access to Margalla Avenue, Srinagar Highway, and the M-1 Motorway, residents enjoy effortless commutes across Islamabad and Rawalpindi.
                  </p>
                  {isLocationExpanded && (
                    <div className="space-y-3 animate-fadeIn">
                      <p>
                        Perched atop the highest natural elevation ridge in the society, Prime Block enjoys clean mountain breezes, lush green horizons, and immediate arterial connectivity without any traffic bottlenecks.
                      </p>
                      <p>
                        Its strategic road grid connects directly into the Grand Commercial Boulevard and Central Civic Zone, ensuring fast travel times to educational hubs, sports arenas, and business centers across Faisal Hills.
                      </p>
                    </div>
                  )}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setIsLocationExpanded(!isLocationExpanded)}
                      className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#7b002c] hover:text-[#9e1245] bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200/80 transition cursor-pointer"
                    >
                      <span>{isLocationExpanded ? 'See Less' : 'See More Location Details'}</span>
                      <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isLocationExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Sticky Live Interactive Google Map Embed */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start space-y-3">
            <div className="relative w-full h-[380px] sm:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <iframe
                title="Prime Block Exact Location Google Map"
                src="https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed"
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
      {/* 3. MASTER PLAN & LAYOUT BLUEPRINT                         */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        
        {/* Mobile Header: Title First (Hidden on Desktop) */}
        <div className="block lg:hidden space-y-2">
          <TextReveal
            as="h2"
            text="Faisal Hills Prime Block Master Plan"
            className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight"
            staggerDelay={70}
            direction="left"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column (Desktop) / Second (Mobile): High-Resolution Map Container */}
          <div className="lg:col-span-6 flex flex-col">
            <ScrollReveal direction="left" delay={50}>
              <div
                onClick={() => setIsMapModalOpen(true)}
                className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-950 group shadow-lg cursor-pointer flex flex-col justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[460px] p-2"
              >
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
                  <img
                    src="/images/faisal-hills-master-plan-map.jpg"
                    alt="Faisal Hills Prime Block Master Plan Layout"
                    className="w-full h-auto max-h-[420px] object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

                  {/* High Quality Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/20 flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>RDA Verified Blueprint</span>
                    </span>
                  </div>

                  {/* Center Click Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="px-4 py-2 bg-white/95 text-[#7b002c] rounded-2xl font-bold text-xs shadow-2xl flex items-center gap-2 backdrop-blur-xs transform group-hover:scale-105 transition-transform">
                      <Maximize2 className="w-4 h-4" />
                      <span>Click to Enlarge & Download</span>
                    </span>
                  </div>

                  {/* Bottom Map Tag */}
                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between pointer-events-none">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300 block">Zoning & Sectors</span>
                      <strong className="text-sm font-serif font-bold text-white block">Prime Elevation Sector</strong>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-200 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                      Ultra-HD Map
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Blueprint Narrative & Action */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <ScrollReveal direction="right" delay={80}>
              {/* Desktop Only Content */}
              <div className="hidden lg:block space-y-4">
                <div className="space-y-2">
                  <TextReveal
                    as="h2"
                    text="Faisal Hills Prime Block Master Plan"
                    className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                    staggerDelay={70}
                    direction="left"
                  />
                </div>

                <p className="font-medium text-slate-900 text-sm sm:text-base leading-relaxed">
                  The master plan for Prime Block is engineered to offer self-contained luxury living. Residential sectors are nestled alongside lush green parks, central Jamia mosques, and modern commercial markets connected by 225ft wide dual-carriageway boulevards.
                </p>

                {isMasterPlanExpanded && (
                  <div className="space-y-4 text-sm text-slate-600 leading-relaxed animate-fadeIn">
                    <p>
                      Every residential street is planned with a minimum width of 40 to 60 feet, complete with underground drainage channels, dedicated tree-lined pedestrian footpaths, and fiber-optic ducts.
                    </p>
                    <p>
                      Commercial zones in Prime Block are positioned strategically around central roundabouts, giving quick walkability for daily groceries without compromising the quiet residential ambience of inner avenues.
                    </p>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsMasterPlanExpanded(!isMasterPlanExpanded)}
                    className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#7b002c] hover:text-[#9e1245] bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200/80 transition cursor-pointer"
                  >
                    <span>{isMasterPlanExpanded ? 'See Less' : 'See More Master Plan Details'}</span>
                    <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isMasterPlanExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2 lg:pt-4 lg:border-t lg:border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7b002c] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#9e1245] shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Master Map PDF</span>
                </button>

                <a
                  href="https://wa.me/923044811717?text=Hi%2C%20I%20would%20like%20to%20request%20the%20official%20Prime%20Block%20Zoning%20Map."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Request on WhatsApp</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PLOT PRICING PLAN & INSTALLMENT SCHEDULE               */}
      {/* ========================================================= */}
      <section id="payment-plan" className="scroll-mt-28 space-y-8">
        
        {/* Official Faisal Hills Payment Plan Image Showcase (Clickable Fullscreen & Lead-Gated Download) */}
        <ScrollReveal direction="up" delay={50}>
          <div className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-1.5">
                <TextReveal
                  as="h2"
                  text="Faisal Hills Prime Block Payment Plan"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                  staggerDelay={65}
                  direction="left"
                />
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-sans">
                  Official 48-month installment breakdown, booking down payments, and verified company launch schedule for all residential plot sizes:
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPaymentPlanDownloadOpen(true)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-300 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#7b002c]" />
                  <span>Download PDF Plan</span>
                </button>
              </div>
            </div>

            {/* Payment Plan Image Card with Fullscreen Zoom trigger */}
            <div
              onClick={() => setIsPaymentPlanLightboxOpen(true)}
              className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 group cursor-pointer shadow-md"
              title="Click to Open Fullscreen & Zoom Payment Plan"
            >
              <img
                src="/images/faisal-hill-payment-plan.jpg"
                alt="Faisal Hills Prime Block Official Payment Plan Schedule & Rates"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="bg-black/80 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full border border-white/20 flex items-center gap-2 shadow-2xl">
                  <Maximize2 className="w-4 h-4 text-rose-300" />
                  <span>Click to View Fullscreen & Zoom Plan</span>
                </span>
              </div>
            </div>

            {/* Mobile View: Download PDF Button Below Picture */}
            <div className="flex sm:hidden items-center justify-center pt-1">
              <button
                type="button"
                onClick={() => setIsPaymentPlanDownloadOpen(true)}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
              >
                <Download className="w-4 h-4 text-[#7b002c]" />
                <span>Download PDF Plan</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 6. FEATURED PRIME BLOCK PLOTS FOR SALE & RESALE DESK      */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <TextReveal
                as="h2"
                text="Prime Block Plots for Sale — Direct Booking & Verified Files"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                Explore available residential plots and commercial plazas in Prime Block with transparent 4-year installment pricing, zero dealer markup, and immediate allotment file verification.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setPlotCategoryFilter('all')}
                className={`hidden sm:inline-block px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  plotCategoryFilter === 'all'
                    ? 'bg-[#7b002c] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Plots ({primePlots.length})
              </button>
              <button
                type="button"
                onClick={() => setPlotCategoryFilter(plotCategoryFilter === 'residential' ? 'all' : 'residential')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  plotCategoryFilter === 'residential'
                    ? 'bg-[#7b002c] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Residential
              </button>
              <button
                type="button"
                onClick={() => setPlotCategoryFilter(plotCategoryFilter === 'commercial' ? 'all' : 'commercial')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  plotCategoryFilter === 'commercial'
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
          {primePlots
            .filter(plot => plotCategoryFilter === 'all' || plot.category.toLowerCase() === plotCategoryFilter)
            .map((plot, idx) => (
              <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 80}>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                  <div>
                    {/* Plot Image Container -> Links to /plots filtered */}
                    <Link
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=prime-block`}
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

                    {/* Specs Details -> Links to /plots filtered */}
                    <Link
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=prime-block`}
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
                          <span className="text-[#7b002c] font-bold text-[9px] sm:text-xs">{plot.downPayment.split(' ')[0]} {plot.downPayment.split(' ')[1] || ''}</span>
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
                        href={`https://wa.me/923044811717?text=${encodeURIComponent(`Hi, I am interested in buying Prime Block Plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share file details.`)}`}
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

        {/* Sell Your Prime Block Plot Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-[#4a081a] to-slate-950 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Resale & Liquidation Service</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Want to Sell or Assess Your Prime Block Plot / File?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Get an instant official market valuation, verified buyer matching, and fast end-to-end transfer facilitation at Zedem International head office with zero hidden commissions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://wa.me/923044811717?text=Hi%2C%20I%20want%20to%20sell%20my%20plot%2Ffile%20in%20Faisal%20Hills%20Prime%20Block.%20Please%20provide%20market%20valuation."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Resale Desk</span>
            </a>
            <a
              href="tel:+923313339997"
              className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white text-white hover:text-[#7b002c] rounded-2xl text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 transition flex items-center justify-center gap-2"
            >
              <span>Direct Call Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. FACILITIES AND MASTER AMENITIES (8 VISUAL CARDS)       */}
      {/* ========================================================= */}
      <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1.5">
              <TextReveal
                as="h2"
                text="Facilities and Amenities in Prime Block"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                staggerDelay={60}
                direction="left"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Prime Block is planned with world-class facilities and modern municipal infrastructure:
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
          {primeGalleryItems.map((item, idx) => (
            <div key={item.id} className="w-[260px] sm:w-auto shrink-0 snap-center flex flex-col">
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
                      {idx === 0 ? <Building2 className="w-4 h-4" /> :
                        idx === 1 ? <Compass className="w-4 h-4" /> :
                          idx === 2 ? <Trees className="w-4 h-4" /> :
                            idx === 3 ? <Building className="w-4 h-4" /> :
                              idx === 4 ? <Activity className="w-4 h-4" /> :
                                idx === 5 ? <ShieldCheck className="w-4 h-4" /> :
                                  idx === 6 ? <GraduationCap className="w-4 h-4" /> :
                                    <Landmark className="w-4 h-4" />}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">{item.tag}</span>
                      <strong className="text-sm font-serif font-bold text-white block leading-snug">{item.title}</strong>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. WHY INVEST IN PRIME BLOCK & DEVELOPMENT STATUS         */}
      {/* ========================================================= */}
      <div className="space-y-10">

        {/* Why Invest Cards */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ROI & Capital Growth</span>
              </div>
              <TextReveal
                as="h2"
                text="Why Invest in Faisal Hills Prime Block"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm">
                Why buyers and overseas Pakistanis rank Prime Block as the top priority sector:
              </p>
            </div>
          </ScrollReveal>

          {/* Mobile View: Compact Interactive Options List */}
          <div className="block sm:hidden space-y-2.5">
            {[
              { title: "Official Launch Rates", desc: "No speculative dealer markup or fluctuating 'on'. Guaranteed official company pricing." },
              { title: "48-Month Flexible Plan", desc: "16 easy quarterly installments offering manageable cash flows for salaried and business buyers." },
              { title: "Margalla Ridge Elevation", desc: "Scenic mountain breezes and elevated topography giving scenic views and fresh air." },
              { title: "225ft Boulevard Axis", desc: "Direct frontage on the grand 225ft main boulevard connecting directly to GT Road N-5." },
              { title: "RDA Approved Legal Security", desc: "Comprehensive NOC approval with 100% legal security and verified land titles." },
              { title: "High Capital Appreciation", desc: "High appreciation velocity as balloting approaches and on-ground utilities complete." }
            ].map((item, idx) => {
              const isSelected = activeWhyInvestOption === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveWhyInvestOption(isSelected ? null : idx)}
                  className={`rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'bg-rose-50/50 border-[#7b002c]/40 shadow-xs'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isSelected ? 'bg-[#7b002c] text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {idx + 1}
                      </div>
                      <strong className={`font-semibold text-xs transition-colors ${
                        isSelected ? 'text-[#7b002c]' : 'text-slate-900'
                      }`}>
                        {item.title}
                      </strong>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transform transition-transform duration-300 ${
                        isSelected ? 'rotate-180 text-[#7b002c]' : ''
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
              { title: "Official Launch Rates", desc: "No speculative dealer markup or fluctuating 'on'. Guaranteed official company pricing." },
              { title: "48-Month Flexible Plan", desc: "16 easy quarterly installments offering manageable cash flows for salaried and business buyers." },
              { title: "Margalla Ridge Elevation", desc: "Scenic mountain breezes and elevated topography giving scenic views and fresh air." },
              { title: "225ft Boulevard Axis", desc: "Direct frontage on the grand 225ft main boulevard connecting directly to GT Road N-5." },
              { title: "RDA Approved Legal Security", desc: "Comprehensive NOC approval with 100% legal security and verified land titles." },
              { title: "High Capital Appreciation", desc: "High appreciation velocity as balloting approaches and on-ground utilities complete." }
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
                      text="Prime Block Development Status"
                      className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                      staggerDelay={65}
                      direction="left"
                    />
                  </div>

                  <p className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">
                    Development in Prime Block is progressing with high momentum under Zedem International's heavy machinery fleet. Earthwork, levelling of elevated ridges, and laying of 225ft boulevard foundations are under active execution.
                  </p>

                  {isDevStatusExpanded && (
                    <div className="space-y-4 animate-fadeIn">
                      <p>
                        Underground sewerage channels, utility ducting, and water storage reservoirs are being laid in tandem with road cutting to ensure smooth possession delivery within the stipulated 4-year timeline.
                      </p>
                      <p>
                        Because Prime Block is situated directly along the main boulevard network, infrastructure machinery has uninterrupted direct access, ensuring speedy development pace compared to inner terrain sectors.
                      </p>
                    </div>
                  )}

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setIsDevStatusExpanded(!isDevStatusExpanded)}
                      className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#7b002c] hover:text-[#9e1245] bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200/80 transition cursor-pointer"
                    >
                      <span>{isDevStatusExpanded ? 'See Less' : 'See More Development Details'}</span>
                      <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isDevStatusExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Quick Status Metrics (Optimized responsive typography & layout) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-slate-100">
                  <div className="p-3 sm:p-4 bg-slate-50 hover:bg-rose-50/50 rounded-2xl border border-slate-200/80 text-center space-y-1 shadow-2xs transition-all">
                    <span className="text-base sm:text-2xl font-serif font-bold text-[#7b002c] block">90%+</span>
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 block leading-tight">Earthwork</span>
                  </div>
                  <div className="p-3 sm:p-4 bg-slate-50 hover:bg-rose-50/50 rounded-2xl border border-slate-200/80 text-center space-y-1 shadow-2xs transition-all">
                    <span className="text-base sm:text-2xl font-serif font-bold text-[#7b002c] block">100%</span>
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 block leading-tight">Underground</span>
                  </div>
                  <div className="p-3 sm:p-4 bg-slate-50 hover:bg-rose-50/50 rounded-2xl border border-slate-200/80 text-center space-y-1 shadow-2xs transition-all">
                    <span className="text-base sm:text-2xl font-serif font-bold text-emerald-700 block">48 Mo.</span>
                    <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 block leading-tight">Possession</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Real On-Ground Development Photo */}
            <div className="lg:col-span-5 flex flex-col">
              <ScrollReveal direction="right" delay={120} className="w-full h-full flex flex-col flex-1">
                <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 group flex-1">
                  <img
                    src="/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg"
                    alt="Faisal Hills Prime Block On-Ground Development Status & Aerial View"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-amber-500/90 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs border border-amber-300/30">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Active Construction</span>
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300 bg-rose-950/70 px-2.5 py-0.5 rounded-full border border-rose-800/70 inline-block backdrop-blur-xs">
                      Verified Aerial Drone Survey
                    </span>
                    <h4 className="font-serif font-bold text-base sm:text-lg leading-snug drop-shadow-md text-white">
                      Prime Sector On-Ground Progress
                    </h4>
                    <p className="text-xs text-slate-300">
                      Wide carpeted boulevards, complete utilities, and active heavy earthwork machinery.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </section>

        {/* Step-by-Step Booking & Transfer Process (Point-by-Point Animated Roadmap) */}
        <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>4-Step Booking Roadmap</span>
              </div>
              <TextReveal
                as="h2"
                text="Faisal Hills Prime Block Booking Process"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans">
                Follow these 4 essential points to complete direct booking and secure your verified company allotment file:
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
                  'Two photocopies of applicant CNIC / NICOP',
                  'One photocopy of Next-of-Kin (Nominee) CNIC',
                  'Passport copies for Overseas Pakistanis'
                ],
                badge: 'Attested Copies'
              },
              {
                point: '02',
                tag: 'Step 2: Photos',
                title: 'Passport Size Photos',
                points: [
                  'Two recent passport-size color photographs',
                  'Blue or white plain background',
                  'Applicant name written on back'
                ],
                badge: 'Recent Photographs'
              },
              {
                point: '03',
                tag: 'Step 3: Payment',
                title: '20% Down Payment',
                points: [
                  'Pay Order in favour of "Zedem International"',
                  'Direct online wire transfer for NRPs',
                  '10% Special Discount on full cash upfront'
                ],
                badge: 'Official Bank Draft'
              },
              {
                point: '04',
                tag: 'Step 4: Allotment',
                title: 'File Allotment & Book',
                points: [
                  'Official company booking acknowledgment letter',
                  'Allotment certificate with unique file serial #',
                  'Official 4-year installment payment booklet'
                ],
                badge: 'Guaranteed File Handover'
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
              <h4 className="font-serif font-bold text-base sm:text-lg text-white">Need Assistance with Prime Block Booking?</h4>
              <p className="text-xs text-rose-100/80 font-sans">Our authorized sales facilitators assist with official Pay Orders, booking forms, and immediate file verification.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/923044811717?text=Hi%2C%20I%20need%20official%20assistance%20with%20booking%20a%20plot%20in%20Faisal%20Hills%20Prime%20Block."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Desk</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ========================================================= */}
      {/* 9. COMPARE OTHER FAISAL HILLS BLOCKS (EXCLUSIVE OF PRIME) */}
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
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              Hover across the sector columns to view each block's location advantages, development progress, and direct links to full block details:
            </p>
          </div>
        </ScrollReveal>

        {/* Panoramic Expanding Cards Showcase (Filtered Without Prime Block) */}
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
      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQS) & LEAD FORM         */}
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
            {primeFaqs.map((faq, index) => {
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

      {/* Final Thoughts & Conclusion */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <ScrollReveal direction="up" delay={50}>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Final Thoughts on Faisal Hills Prime Block
          </h2>
          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans pt-2">
            <p>
              Faisal Hills Prime Block represents the quintessential balance between high-elevation natural living and official transparent affordability. With guaranteed 48-month easy installment terms, zero speculative markups, RDA legal sanctioning, and 225ft boulevard connectivity, it offers unmatched peace of mind for genuine home-builders and long-term capital accumulators.
            </p>
            <p>
              To check currently available plot sizes, verified corner/park-facing categories, and official booking documentation, <Link href="/contact" className="text-[#7b002c] font-bold hover:underline">contact our dedicated sales desk</Link> today.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Direct Priority Lead Capture Inquiry Form */}
      <section className="bg-gradient-to-br from-[#7b002c] via-[#5c0021] to-[#3a0014] text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center space-y-2 relative z-10">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Priority Assistance</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Schedule an On-Site Prime Block Tour
          </h3>
          <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Leave your contact details to receive verified plot listings, current installment schedules, and official allotment files directly on WhatsApp.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center space-y-3 animate-fade-in relative z-10">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xl text-white">Inquiry Received!</h4>
            <p className="text-xs text-rose-100 max-w-md mx-auto">
              Thank you, <strong>{leadName}</strong>. Our Prime Block property specialist will contact you on <strong>{leadPhone}</strong> with available plot files.
            </p>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4 max-w-2xl mx-auto relative z-10">
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
                  placeholder="e.g. +92 300 1234567"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white placeholder:text-rose-200/50 focus:outline-none focus:border-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Interested Plot Category</label>
                <select
                  value={leadPlot}
                  onChange={(e) => setLeadPlot(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white focus:outline-none focus:border-white transition-all cursor-pointer"
                >
                  <option value="5 Marla (25x50)" className="bg-slate-900 text-white">5 Marla (25×50) — PKR 32.5 Lac</option>
                  <option value="8 Marla (30x60)" className="bg-slate-900 text-white">8 Marla (30×60) — PKR 48.0 Lac</option>
                  <option value="10 Marla (35x70)" className="bg-slate-900 text-white">10 Marla (35×70) — PKR 58.5 Lac</option>
                  <option value="14 Marla (40x80)" className="bg-slate-900 text-white">14 Marla (40×80) — PKR 76.5 Lac</option>
                  <option value="1 Kanal (50x90)" className="bg-slate-900 text-white">1 Kanal (50×90) — PKR 99.0 Lac</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Investor Type</label>
                <select
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white focus:outline-none focus:border-white transition-all cursor-pointer"
                >
                  <option value="End User (Home Construction)" className="bg-slate-900 text-white">End User (Home Construction)</option>
                  <option value="Overseas Pakistani (NRP)" className="bg-slate-900 text-white">Overseas Pakistani (NRP)</option>
                  <option value="Short Term Investor" className="bg-slate-900 text-white">Short Term Investor</option>
                  <option value="Long Term Wealth Accumulation" className="bg-slate-900 text-white">Long Term Wealth Accumulation</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Special Requirements (Optional)</label>
              <textarea
                rows={2}
                placeholder="e.g. Inquiring about corner plot or park-facing allotment..."
                value={leadNote}
                onChange={(e) => setLeadNote(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white placeholder:text-rose-200/50 focus:outline-none focus:border-white transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white hover:bg-rose-50 text-[#7b002c] font-serif font-bold text-sm tracking-wider uppercase rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Priority Inquiry</span>
            </button>
          </form>
        )}
      </section>

      {/* Fullscreen Zoom & Download Payment Plan Modal */}
      <PaymentPlanModal
        isLightboxOpen={isPaymentPlanLightboxOpen}
        onCloseLightbox={() => setIsPaymentPlanLightboxOpen(false)}
        isDownloadOpen={isPaymentPlanDownloadOpen}
        onCloseDownload={() => setIsPaymentPlanDownloadOpen(false)}
        onOpenDownload={() => setIsPaymentPlanDownloadOpen(true)}
        imageSrc="/images/faisal-hill-payment-plan.jpg"
      />

      {/* Map Download & Full Screen Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        blockName="Prime Block"
        mapImageUrl="/images/faisal-hills-master-plan-map.jpg"
      />

    </div>
  );
}
