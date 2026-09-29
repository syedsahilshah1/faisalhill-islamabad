'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  PlotItem,
  plotInventoryData,
  fetchPlots,
  formatPlotPrice,
  PrimeBlockCMSData,
  initialPrimeBlockCMS,
  fetchPrimeBlockCMS,
  mergePrimeBlockCMS,
  cleanVerifyText
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
  DollarSign,
  Scale,
  Info
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
    label: '225 FT BOULEVARD',
    tag: '225 FT BOULEVARD',
    title: 'Wide carpeted roads and main boulevard',
    category: 'infrastructure',
    image: '/images/faisal-hills-drone-view.webp',
    desc: 'Wide 225ft and 150ft carpeted road networks with modern streetscaping, LED lighting and green dividers.'
  },
  {
    id: 2,
    label: 'MARGALLA VIEWS',
    tag: 'MARGALLA VIEWS',
    title: 'Margalla Hills backdrop',
    category: 'nature',
    image: '/images/faisal-hills-aerial-panoramic.webp',
    desc: 'Breathtaking high-elevation vistas over the Margalla Hills and serene natural green topography.'
  },
  {
    id: 3,
    label: 'FAMILY PARKS',
    tag: 'FAMILY PARKS',
    title: 'Community parks and green belts',
    category: 'infrastructure',
    image: '/images/faisal-hills-glow-park.webp',
    desc: 'Dedicated family park spaces with jogging tracks, children play zones, and manicured landscaping.'
  },
  {
    id: 4,
    label: 'COMMERCIAL AREAS',
    tag: 'COMMERCIAL AREAS',
    title: 'Commercial plots and daily-needs market',
    category: 'infrastructure',
    image: '/images/faisal-jewel-building.webp',
    desc: 'Ground+5 commercial plots positioned along main intersections, ideal for supermarkets and brand outlets.'
  },
  {
    id: 5,
    label: 'SPORTS & WELLNESS',
    tag: 'SPORTS & WELLNESS',
    title: 'Sports ground and walking tracks',
    category: 'infrastructure',
    image: '/images/hills-walk-commercial-aerial.webp',
    desc: 'Dedicated sports facilities for youth, outdoor workout fitness gyms, and badminton courts.'
  },
  {
    id: 6,
    label: 'GATED SECURITY',
    tag: 'GATED SECURITY',
    title: 'Gated community with 24/7 security',
    category: 'infrastructure',
    image: '/images/faisal-hills-arc-gate.webp',
    desc: 'Round-the-clock security checkpoints, motorized patrolling units, and full perimeter boundary walls.'
  },
  {
    id: 7,
    label: 'EDUCATION',
    tag: 'EDUCATION',
    title: 'School sites within the block and nearby campuses',
    category: 'infrastructure',
    image: '/images/roots-international-school-faisal-hills.webp',
    desc: 'Allocated institutional plots for recognized school networks and international curriculum academies.'
  },
  {
    id: 8,
    label: 'MOSQUE',
    tag: 'MOSQUE',
    title: "Block mosque and the society's Grand Jamia Mosque",
    category: 'infrastructure',
    image: '/images/faisal-hills-arc-gate.webp',
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
    title: '5 Marla Residential Plot',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    facing: 'Park facing',
    priceFormatted: 'PKR 32.5 Lac',
    downPayment: 'PKR 6,50,000',
    status: 'Available',
    badge: 'Park Facing',
    image: '/images/faisal-hills-drone-view.webp',
    features: ['Park Facing', 'Level Plot']
  },
  {
    id: 'prime-plot-8m-1',
    plotNumber: 'PR-218',
    title: '8 Marla Residential Plot',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    facing: 'Boulevard facing',
    priceFormatted: 'PKR 48.0 Lac',
    downPayment: 'PKR 9,60,000',
    status: 'Available',
    badge: '225 ft Boulevard',
    image: '/images/faisal-hills-aerial-panoramic.webp',
    features: ['225 ft Boulevard', 'Level Plot']
  },
  {
    id: 'prime-plot-10m-1',
    plotNumber: 'PR-305',
    title: '10 Marla Residential Plot',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    facing: 'Corner',
    priceFormatted: 'PKR 58.5 Lac',
    downPayment: 'PKR 11,70,000',
    status: 'Available',
    badge: 'Corner Plot',
    image: '/images/faisal-hills-glow-park.webp',
    features: ['Corner Plot', 'Level Plot']
  },
  {
    id: 'prime-plot-14m-1',
    plotNumber: '',
    title: '14 Marla Residential Plot',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    facing: 'Boulevard facing',
    priceFormatted: 'PKR 76.5 Lac',
    downPayment: 'PKR 15,30,000',
    status: 'Available',
    badge: '225 ft Boulevard',
    image: '/images/faisal-hills-drone-view.webp',
    features: ['225 ft Boulevard', 'Level Plot']
  },
  {
    id: 'prime-plot-1k-1',
    plotNumber: 'PR-450',
    title: '1 Kanal Residential Plot',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    facing: 'Park facing',
    priceFormatted: 'PKR 99.0 Lac',
    downPayment: 'PKR 19,80,000',
    status: 'Available',
    badge: 'Park Facing',
    image: '/images/faisal-hills-arc-gate.webp',
    features: ['Park Facing', 'Level Plot']
  },
  {
    id: 'prime-plot-5m-standard',
    plotNumber: '',
    title: '5 Marla Residential Plot',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    facing: 'Standard',
    priceFormatted: 'PKR 32.5 Lac',
    downPayment: 'PKR 6,50,000',
    status: 'Available',
    badge: 'Level Plot',
    image: '/images/faisal-hills-glow-garden.webp',
    features: ['Level Plot']
  },
  {
    id: 'prime-plot-com-1',
    plotNumber: 'PR-COM-08',
    title: '4 Marla Commercial Plot',
    blockName: 'Prime Block',
    category: 'Commercial',
    size: '4 Marla',
    dimensions: '30 × 30',
    facing: 'Boulevard facing',
    priceFormatted: 'PKR 1.95 Crore',
    downPayment: 'PKR 39,00,000',
    status: 'Available',
    badge: '225 ft Boulevard',
    image: '/images/faisal-hills-development-site.webp',
    features: ['225 ft Boulevard', 'Level Plot']
  },
  {
    id: 'prime-plot-com-2',
    plotNumber: 'PR-COM-15',
    title: '5.33 Marla Commercial Plot',
    blockName: 'Prime Block',
    category: 'Commercial',
    size: '5.33 Marla',
    dimensions: '40 × 30',
    facing: 'Corner',
    priceFormatted: 'PKR 2.65 Crore',
    downPayment: 'PKR 53,00,000',
    status: 'Available',
    badge: 'Corner Plot',
    image: '/images/faisal-hills-main-gate-gt-road.webp',
    features: ['Corner Plot', '225 ft Boulevard']
  },
  {
    id: 'prime-plot-com-3',
    plotNumber: '',
    title: '6 Marla Commercial Plot',
    blockName: 'Prime Block',
    category: 'Commercial',
    size: '6 Marla',
    dimensions: '35 × 40',
    facing: 'Boulevard facing',
    priceFormatted: 'PKR 3.10 Crore',
    downPayment: 'PKR 62,00,000',
    status: 'Available',
    badge: '225 ft Boulevard',
    image: '/images/faisal-hills-arc-monument.webp',
    features: ['225 ft Boulevard', 'Corner Plot']
  },
  {
    id: 'prime-plot-com-4',
    plotNumber: '',
    title: '8 Marla Commercial Plot',
    blockName: 'Prime Block',
    category: 'Commercial',
    size: '8 Marla',
    dimensions: '40 × 45',
    facing: 'Standard',
    priceFormatted: 'PKR 4.20 Crore',
    downPayment: 'PKR 84,00,000',
    status: 'Available',
    badge: 'Level Plot',
    image: '/images/faisal-hills-arc-view.webp',
    features: ['Level Plot', '225 ft Boulevard']
  }
];

export default function PrimeBlockContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isPaymentPlanLightboxOpen, setIsPaymentPlanLightboxOpen] = useState(false);
  const [isPaymentPlanDownloadOpen, setIsPaymentPlanDownloadOpen] = useState(false);
  const [activeWhyInvestOption, setActiveWhyInvestOption] = useState<number | null>(0);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'infrastructure' | 'nature' | 'amenities'>('all');
  const [plotCategoryFilter, setPlotCategoryFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  // Dynamic live CMS state for Prime Block
  const [cms, setCms] = useState<PrimeBlockCMSData>(initialPrimeBlockCMS);

  useEffect(() => {
    fetchPrimeBlockCMS().then(data => {
      if (data) setCms(mergePrimeBlockCMS(data));
    });

    const syncPrime = () => {
      try {
        const cached = localStorage.getItem('faisal_prime_block_cms');
        if (cached) setCms(mergePrimeBlockCMS(JSON.parse(cached)));
      } catch {}
    };

    window.addEventListener('faisal_prime_block_cms_updated', syncPrime);
    window.addEventListener('storage', syncPrime);
    return () => {
      window.removeEventListener('faisal_prime_block_cms_updated', syncPrime);
      window.removeEventListener('storage', syncPrime);
    };
  }, []);

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
    '/images/faisal-hills-drone-view.webp',
    '/images/faisal-hills-aerial-panoramic.webp',
    '/images/faisal-hills-arc-gate.webp',
    '/images/faisal-hills-glow-park.webp',
    '/images/faisal-hills-development-site.webp',
    '/images/faisal-hills-main-gate-gt-road.webp',
    '/images/faisal-hills-arc-monument.webp',
    '/images/faisal-hills-arc-view.webp'
  ];

  const primePlots = useMemo(() => {
    // 1. Get all plots matching prime-block from live API / store
    const liveBlockPlots = allPlots.filter(
      p => p.blockSlug === 'prime-block' || p.blockName?.toLowerCase().includes('prime') || p.plotNumber?.toUpperCase().startsWith('PR-')
    );

    // 2. Map and normalize live plots so they fit the card layout
    const liveMapped = liveBlockPlots.map((plot, idx) => ({
      id: plot.id,
      plotNumber: plot.plotNumber || '',
      title: plot.title || `${plot.size} ${plot.category || 'Residential'} Plot`,
      blockName: plot.blockName || 'Prime Block',
      category: plot.category || 'Residential',
      size: plot.size,
      dimensions: plot.dimensions || '25 × 50',
      facing: plot.facing || 'Standard',
      priceFormatted: plot.priceFormatted || (plot.price ? formatPlotPrice(plot.price) : 'Contact for Price'),
      downPayment: (plot as any).downPayment || (plot.price ? `PKR ${((plot.price * 0.2) / 100000).toFixed(1)} Lacs` : 'Confirmed Schedule'),
      status: plot.status || 'Available',
      badge: (plot as any).badge || (plot.facing?.toLowerCase().includes('park') ? 'Park Facing' : 'Level Plot'),
      image: plot.image || defaultPrimePlotImages[idx % defaultPrimePlotImages.length],
      features: plot.features && plot.features.length > 0 ? plot.features.slice(0, 2) : ['Level Plot']
    }));

    // 3. Combine with default fallback plots if not already present
    const combined: any[] = [...liveMapped];
    defaultPrimeSellingPlots.forEach(defPlot => {
      if (!combined.some(c => c.id === defPlot.id || (c.plotNumber && defPlot.plotNumber && c.plotNumber.toUpperCase() === defPlot.plotNumber.toUpperCase()))) {
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
                    text={cms.overview.heading || 'Faisal Hills Prime Block Overview'}
                    className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                    staggerDelay={65}
                    direction="left"
                  />
                  <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                    <p>
                      {cms.overview.visibleParagraph || "Prime Block sits at the front of Faisal Hills, planned along the 225 ft main boulevard that runs from the society's GT Road entrance. Its western side adjoins Block A and the Executive Block, so the society's established commercial area, school and mosque are already next door."}
                    </p>

                    <p>
                      {cms.overview.expandedParagraph1 || "The block is planned with carpeted roads, underground utilities, parks, a mosque and its own commercial areas. Because development is still in progress, it suits buyers who want to enter Faisal Hills on an instalment plan and build later, rather than families who need to start construction now."}
                      {' '}For ready possession, see{' '}
                      <Link href={cms.overview.blockALinkHref || '/blocks/block-a'} className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-0.5">
                        <span>{cms.overview.blockALinkText || 'Block A'}</span>
                        <ArrowRight className="w-3.5 h-3.5 inline font-bold" />
                      </Link>
                      {' '}or the{' '}
                      <Link href={cms.overview.executiveBlockLinkHref || '/blocks/executive-block'} className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-0.5">
                        <span>{cms.overview.executiveBlockLinkText || 'Executive Block'}</span>
                        <ArrowRight className="w-3.5 h-3.5 inline font-bold" />
                      </Link>.
                    </p>
                    <p>
                      {cms.overview.expandedParagraph2 || "Although it is marketed as Faisal Hills Prime Block Islamabad, the society lies in Rawalpindi District near Taxila, with Islamabad reached via the GT Road and Margalla Avenue."}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <ScrollReveal direction="right" delay={80} className="w-full flex-1">
                <div className="relative min-h-[300px] lg:min-h-[360px] w-full h-full rounded-3xl overflow-hidden border border-slate-200 shadow-lg group">
                  <img
                    src="/images/faisal-hills-drone-view.webp"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

          {/* Left Column: Accessibility & Commute Badges */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-4">

                <TextReveal
                  as="h2"
                  text={cms.location?.heading || "Faisal Hills Prime Block Location"}
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                  staggerDelay={65}
                  direction="left"
                />
                <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3.5 font-sans">
                  <p>
                    {cms.location?.mainParagraph || "Prime Block is reached through the society's main gate on the Main GT Road (N-5) near Taxila. From the gate, the 225 ft boulevard leads into the block; internal main roads within it are reported at 100 ft. Every Faisal Hills block shares the same GT Road entrance, so Prime Block has the same connectivity as the established blocks."}
                  </p>

                  <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    <li>
                      {cms.location?.bullet1 || "Block A, the Executive Block and the Faisal Jewel development, immediately adjoining"}
                    </li>
                    <li>
                      {cms.location?.bullet2 || "Taxila Chowk and Taxila city on the GT Road"}
                    </li>
                    <li>
                      {cms.location?.bullet3 || "Sector B-17 (Multi Gardens) and Faisal Margalla City on the Islamabad side"}
                    </li>
                    <li>
                      {cms.location?.bullet4 || "Margalla Avenue, the M-1 Motorway corridor and New Islamabad International Airport"}
                    </li>
                  </ul>

                  <p className="text-slate-700 pt-1">
                    {cms.location?.driveTimesNote || "Drive times quoted online vary widely, so we publish only times our team has measured, with the date and time of day. Full directions are on our"}{' '}
                    <Link
                      href={cms.location?.locationPageLinkHref || "/faisal-hills-location"}
                      className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>{cms.location?.locationPageLinkText || "Faisal Hills location"}</span>
                      <span className="text-xs"> (→ location page)</span>
                    </Link>.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Full-Height Live Interactive Google Map Embed */}
          <div className="lg:col-span-5 flex flex-col h-full min-h-[380px] lg:min-h-[460px]">
            <ScrollReveal direction="right" delay={80} className="w-full h-full flex-1 flex flex-col">
              <div className="relative w-full h-full min-h-[380px] lg:min-h-full rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 flex-1">
                <iframe
                  title="Prime Block Exact Location Google Map"
                  src="https://maps.google.com/maps?q=Faisal+Hills+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[380px] lg:min-h-full"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MASTER PLAN & LAYOUT BLUEPRINT                         */}
      {/* ========================================================= */}
      {/* ========================================================= */}
      {/* 3. MASTER PLAN & LAYOUT BLUEPRINT                         */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2">
            <TextReveal
              as="h2"
              text="Faisal Hills Prime Block Master Plan"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={70}
              direction="left"
            />
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
              Engineered for self-contained luxury living with 225ft wide boulevards, underground utilities, and planned commercial hubs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#7b002c] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#9e1245] shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Master Map PDF</span>
            </button>
            <a
              href="https://wa.me/923331113177?text=Hi%2C%20I%20would%20like%20to%20request%20the%20official%20Prime%20Block%20Zoning%20Map."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Request Map</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: High-Resolution Map Container (Full Height matching Table) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <ScrollReveal direction="left" delay={50} className="w-full h-full flex flex-col flex-1">
              <div
                onClick={() => setIsMapModalOpen(true)}
                className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-950 group shadow-lg cursor-pointer flex flex-col justify-between h-full min-h-[440px] p-2 flex-1"
              >
                <div className="relative w-full h-full min-h-[420px] flex-1 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950">
                  <img
                    src="/images/faisal-hills-master-plan-map.webp"
                    alt="Faisal Hills Prime Block Master Plan Layout"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/25 pointer-events-none" />

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

          {/* Right Column: Master Plan Details Table Format */}
          <div className="lg:col-span-7 space-y-4">
            <ScrollReveal direction="right" delay={80}>
              {/* Desktop & Tablet Table (Matched to Sector Comparison Table Style) */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm font-sans">
                  <thead className="bg-slate-900 text-white font-serif">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider text-xs sm:text-sm w-1/3">Aspect / Feature</th>
                      <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider text-xs sm:text-sm text-amber-300 w-1/2">Prime Block Specifications</th>
                      <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider text-xs sm:text-sm text-emerald-300 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { aspect: 'Main Boulevard', spec: '225 ft dual carriageway entrance network', status: 'Carpeted' },
                      { aspect: 'Internal Sector Streets', spec: '40 ft to 60 ft wide residential avenues', status: 'In Progress' },
                      { aspect: 'Zoning Alignment', spec: 'Adjoining Block A and Executive Block', status: 'Approved' },
                      { aspect: 'Underground Utilities', spec: 'Underground drainage, sewerage & fiber ducts', status: 'Laying Pipes' },
                      { aspect: 'Commercial Hubs', spec: 'Central roundabouts with walking commercial markets', status: 'Allocated' },
                      { aspect: 'Green Spaces & Mosques', spec: 'Sector Jamia Mosques & tree-lined green parks', status: 'Planned' },
                      { aspect: 'Blueprint Approval', spec: 'Official RDA verified society layout blueprint', status: 'Verified' },
                    ].map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/40">
                          {row.aspect}
                        </td>
                        <td className="p-3.5 sm:p-4 text-slate-700 font-medium">
                          <span className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] shrink-0" />
                            <span>{row.spec}</span>
                          </span>
                        </td>
                        <td className="p-3.5 sm:p-4 text-slate-700 font-medium text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 text-[#7b002c] border border-rose-100 font-bold text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] animate-pulse" />
                            <span>{row.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards / Compact Table (Responsive View) */}
              <div className="grid grid-cols-1 gap-2.5 sm:hidden">
                {[
                  { feature: 'Main Boulevard', spec: '225 ft dual carriageway entrance network', status: 'Carpeted' },
                  { feature: 'Internal Sector Streets', spec: '40 ft to 60 ft wide residential avenues', status: 'In Progress' },
                  { feature: 'Zoning Alignment', spec: 'Adjoining Block A & Executive Block', status: 'Approved' },
                  { feature: 'Underground Utilities', spec: 'Underground drainage, sewerage & fiber ducts', status: 'Laying Pipes' },
                  { feature: 'Commercial Hubs', spec: 'Central roundabouts with walking markets', status: 'Allocated' },
                  { feature: 'Green Spaces & Mosques', spec: 'Sector Jamia Mosques & green parks', status: 'Planned' },
                  { feature: 'Blueprint Approval', spec: 'Official RDA verified layout blueprint', status: 'Verified' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-bold text-slate-900">{item.feature}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-white border border-slate-200 text-[#7b002c]">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] pt-1">{item.spec}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PLOT SIZES IN PRIME BLOCK                              */}
      {/* ========================================================= */}
      <section id="plot-sizes" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <TextReveal
              as="h2"
              text={cms.plotSizesSection?.heading || "Plot Sizes in Prime Block"}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl">
              {cms.plotSizesSection?.subline || "Official plot dimensions, square footage, square yard calculations, and commonly listed market classifications:"}
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop & Tablet Table */}
        <ScrollReveal direction="up" delay={70}>
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm text-slate-800 border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                <tr className="border-b border-slate-800">
                  <th className="py-4 px-5 border-r border-slate-800 font-bold">Dimensions (ft)</th>
                  <th className="py-4 px-5 border-r border-slate-800 font-bold">Area (sq ft)</th>
                  <th className="py-4 px-5 border-r border-slate-800 font-bold">Area (sq yds)</th>
                  <th className="py-4 px-5 font-bold">Commonly listed as</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white font-medium">
                {(cms.plotSizesSection?.rows || initialPrimeBlockCMS.plotSizesSection?.rows || []).map((row, idx) => (
                  <tr key={idx} className="even:bg-slate-50/70 hover:bg-rose-50/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-200">
                      {cleanVerifyText(row.dimensions)}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-slate-700 border-r border-slate-200">
                      {row.areaSqFt}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-slate-700 border-r border-slate-200">
                      {row.areaSqYds}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-[#7b002c]">
                      {cleanVerifyText(row.commonlyListed)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards (Responsive View) */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {(cms.plotSizesSection?.rows || initialPrimeBlockCMS.plotSizesSection?.rows || []).map((row, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dimensions</span>
                  <span className="font-bold text-slate-900 text-sm">{cleanVerifyText(row.dimensions)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Area (sq ft)</span>
                    <strong className="text-slate-800 font-semibold">{row.areaSqFt}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Area (sq yds)</span>
                    <strong className="text-slate-800 font-semibold">{row.areaSqYds}</strong>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Listed as:</span>
                  <strong className="font-bold text-[#7b002c] text-xs">{cleanVerifyText(row.commonlyListed)}</strong>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 5. PLOT PRICING PLAN & INSTALLMENT SCHEDULE               */}
      {/* ========================================================= */}
      <section id="payment-plan" className="scroll-mt-28 space-y-8">
        
        <ScrollReveal direction="up" delay={50}>
          <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            {/* Header & Intro */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-2">
                <TextReveal
                  as="h2"
                  text={cms.paymentPlanSection?.heading || "Faisal Hills Prime Block Payment Plan"}
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                  staggerDelay={65}
                  direction="left"
                />
                <p className="text-xs sm:text-sm text-slate-700 max-w-3xl font-sans leading-relaxed">
                  {cms.paymentPlanSection?.intro || "Prime Block is offered on a down payment followed by quarterly instalments, with a discount for payment in full. The schedule below is the one currently issued by the developer."}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPaymentPlanDownloadOpen(true)}
                  className="px-4 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download PDF Plan</span>
                </button>
              </div>
            </div>

            {/* Confirmed Schedule Table (Desktop / Tablet) */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                Official Prime Block Installment Schedule
              </h3>

              <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-800 border-collapse">
                  <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold tracking-wider">
                    <tr className="border-b border-slate-800">
                      <th className="py-4 px-5 border-r border-slate-800 font-bold">Plot size</th>
                      <th className="py-4 px-5 border-r border-slate-800 font-bold">Total price</th>
                      <th className="py-4 px-5 border-r border-slate-800 font-bold">Down payment</th>
                      <th className="py-4 px-5 border-r border-slate-800 font-bold">Quarterly instalment</th>
                      <th className="py-4 px-5 font-bold">Lump-sum price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white font-medium">
                    {(cms.paymentPlanSection?.tableRows || initialPrimeBlockCMS.paymentPlanSection?.tableRows || []).map((row, idx) => (
                      <tr key={idx} className="even:bg-slate-50/70 hover:bg-rose-50/40 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-slate-900 border-r border-slate-200">
                          {cleanVerifyText(row.size)}
                        </td>
                        <td className="py-3.5 px-5 font-bold text-[#7b002c] border-r border-slate-200">
                          {cleanVerifyText(row.totalPrice)}
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-700 border-r border-slate-200">
                          {cleanVerifyText(row.downPayment)}
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-700 border-r border-slate-200">
                          {cleanVerifyText(row.quarterlyInstallment)}
                        </td>
                        <td className="py-3.5 px-5 font-bold text-emerald-700">
                          {cleanVerifyText(row.lumpSumPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View for Payment Schedule */}
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {(cms.paymentPlanSection?.tableRows || initialPrimeBlockCMS.paymentPlanSection?.tableRows || []).map((row, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Plot Size</span>
                      <span className="font-bold text-slate-900 text-sm">{cleanVerifyText(row.size)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-600">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Total Price</span>
                        <strong className="text-[#7b002c] font-bold text-xs">{cleanVerifyText(row.totalPrice)}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Down Payment</span>
                        <strong className="text-slate-800 font-semibold">{cleanVerifyText(row.downPayment)}</strong>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Quarterly:</span>
                        <strong className="text-slate-700 text-[11px]">{cleanVerifyText(row.quarterlyInstallment)}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Lump-Sum (10% Off):</span>
                        <strong className="font-bold text-emerald-700 text-xs">{cleanVerifyText(row.lumpSumPrice)}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 pt-1 font-sans">
                {cms.paymentPlanSection?.termNote || "Plan as issued. Number of instalments and term: 16 quarterly instalments over 48 months (4 years). Prices are set by the developer and can change without notice."}
              </p>
            </div>

            {/* What you pay besides the plot price */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#7b002c]" />
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {cms.paymentPlanSection?.extraChargesTitle || "What you pay besides the plot price"}
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-sans">
                {(cms.paymentPlanSection?.extraCharges || initialPrimeBlockCMS.paymentPlanSection?.extraCharges || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#7b002c] font-bold mt-0.5">•</span>
                    <span>
                      <strong className="font-bold text-slate-900">{cleanVerifyText(item.label)}:</strong>{' '}
                      {cleanVerifyText(item.desc)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why you will see different Prime Block prices online */}
            <div className="p-6 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-3 font-sans">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-800" />
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {cms.paymentPlanSection?.whyDifferentHeading || "Why you will see different Prime Block prices online"}
                </h3>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  {cms.paymentPlanSection?.whyDifferentParagraph1 || "The block has been quoted under more than one schedule since launch, and older pages stay online without dates. Plans quoted publicly have included an 18-month plan in 2024, a 3.5-year plan of 14 quarterly instalments at launch in December 2025, a shorter plan of 10 quarterly instalments during 2026, and a 48-month plan of 16 quarterly instalments. One developer-linked page has also described the block as cash payment only."}
                </p>
                <p>
                  {cms.paymentPlanSection?.whyDifferentParagraph2 || "Only the schedule the developer issues for the current month applies to a new booking. If a price looks unusually low, check which plan it came from and when it was published. Our"}{' '}
                  <Link
                    href={cms.paymentPlanSection?.paymentPlanLinkHref || "/faisal-hills-payment-plan"}
                    className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>{cms.paymentPlanSection?.paymentPlanLinkText || "Faisal Hills payment plan"}</span>
                    <span className="text-xs"> (→ payment plan page)</span>
                  </Link>{' '}
                  carries the society-wide schedule.
                </p>
              </div>
            </div>

            {/* Official Faisal Hills Payment Plan Image Showcase (Clickable Fullscreen & Lead-Gated Download) */}
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Document Preview</span>
                <span className="text-xs text-slate-500">Click to zoom</span>
              </div>

              <div
                onClick={() => setIsPaymentPlanLightboxOpen(true)}
                className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 group cursor-pointer shadow-md"
                title="Click to Open Fullscreen & Zoom Payment Plan"
              >
                <img
                  src="/images/faisal-hills-payment-plan-2026.webp"
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
                  className="w-full py-3 bg-[#7b002c] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download PDF Plan</span>
                </button>
              </div>
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
                text="Prime Block Plots for Sale"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                Available residential and commercial plots in Prime Block. Each listing shows size, facing and the down payment, and every file is checked with the developer before you pay.
              </p>
            </div>

            {/* Filters: All Plots · Residential · Commercial */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setPlotCategoryFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  plotCategoryFilter === 'all'
                    ? 'bg-[#7b002c] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Plots
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
            .map((plot, idx) => {
              const displayTitle = plot.plotNumber ? `#${plot.plotNumber}` : (plot.title || `${plot.size} ${plot.category} Plot`);
              const allowedTags = Array.isArray(plot.features)
                ? plot.features.filter((f: string) => ['Park Facing', 'Corner Plot', '225 ft Boulevard', 'Level Plot'].includes(f)).slice(0, 2)
                : [];
              const finalTags = allowedTags.length > 0 ? allowedTags : (plot.badge && ['Park Facing', 'Corner Plot', '225 ft Boulevard', 'Level Plot'].includes(plot.badge) ? [plot.badge] : []);

              return (
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
                          alt={displayTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                        {/* Plot Title (Plot number if confirmed, otherwise size + category) */}
                        <div className="absolute bottom-1.5 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white">
                          <span className="text-[8px] sm:text-[10px] text-slate-300 font-medium block uppercase tracking-wider">{plot.blockName}</span>
                          <h4 className="font-serif font-bold text-xs sm:text-base group-hover:text-amber-300 transition-colors truncate">
                            {displayTitle}
                          </h4>
                        </div>
                      </Link>

                      {/* Specs Details -> Links to /plots filtered */}
                      <Link
                        href={`/plots?size=${encodeURIComponent(plot.size)}&block=prime-block`}
                        className="p-2.5 sm:p-5 space-y-2 sm:space-y-3 block cursor-pointer hover:bg-slate-50/60 transition-colors"
                      >
                        <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-slate-600">
                          {/* Size and dimensions */}
                          <div className="flex justify-between items-center pb-1 sm:pb-1.5 border-b border-slate-100">
                            <span className="text-slate-500 font-medium">Size & Dims:</span>
                            <span className="text-slate-900 font-bold group-hover:text-[#7b002c] transition-colors">{plot.size} · {plot.dimensions}</span>
                          </div>

                          {/* Facing */}
                          <div className="flex justify-between items-center pb-1 sm:pb-1.5 border-b border-slate-100">
                            <span className="text-slate-500 font-medium">Facing:</span>
                            <strong className="text-slate-900 font-semibold">{plot.facing}</strong>
                          </div>

                          {/* Down payment */}
                          <div className="flex justify-between items-center pb-1 sm:pb-1.5 border-b border-slate-100">
                            <span className="text-slate-500 font-medium">Down Payment:</span>
                            <span className="text-[#7b002c] font-bold text-[9px] sm:text-xs">{plot.downPayment}</span>
                          </div>
                        </div>

                        {/* Tags (Maximum Two: Park Facing, Corner Plot, 225 ft Boulevard, Level Plot) */}
                        {finalTags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {finalTags.map((tag: string, tIdx: number) => (
                              <span
                                key={tIdx}
                                className="text-[9px] sm:text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium border border-slate-200/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    </div>

                    {/* Price & Action Buttons Footer */}
                    <div className="p-2.5 sm:p-4 pt-2 sm:pt-3 border-t border-slate-100 mt-1 space-y-2 sm:space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[8px] sm:text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Total Price</span>
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
                          href={`https://wa.me/923331113177?text=${encodeURIComponent(`Hi, I am interested in buying Prime Block ${displayTitle} (${plot.size} - ${plot.priceFormatted}). Please share file details.`)}`}
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
              );
            })}
        </div>

        {/* Verification Note Box */}
        <div className="p-4 sm:p-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start gap-3.5 text-xs text-amber-950">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-amber-800/90 leading-relaxed text-[11px] sm:text-xs">
            Every plot number, price and down payment on this grid must be confirmed as real and currently available before publishing. Where a specific plot cannot be confirmed, show the size and facing without a plot number.
          </p>
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
              href="https://wa.me/923331113177?text=Hi%2C%20I%20want%20to%20sell%20my%20plot%2Ffile%20in%20Faisal%20Hills%20Prime%20Block.%20Please%20provide%20market%20valuation."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Resale Desk</span>
            </a>
            <a
              href="tel:+923331113177"
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
                text={cleanVerifyText(cms.facilitiesSection?.heading || initialPrimeBlockCMS.facilitiesSection?.heading || 'Facilities and Amenities in Prime Block')}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                staggerDelay={60}
                direction="left"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
                {cleanVerifyText(cms.facilitiesSection?.intro || initialPrimeBlockCMS.facilitiesSection?.intro || "Prime Block is planned to the same infrastructure standard as the rest of Faisal Hills. These facilities are part of the block's layout and are being developed with it:")}
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
          {(cms.facilitiesSection?.cards || initialPrimeBlockCMS.facilitiesSection?.cards || primeGalleryItems).map((item, idx) => (
            <div key={item.id || idx} className="w-[260px] sm:w-auto shrink-0 snap-start flex flex-col">
              <ScrollReveal direction="pop" delay={(idx % 4) * 60} className="h-full">
                <div className="bg-slate-900 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group h-full flex flex-col">
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.image || primeGalleryItems[idx % primeGalleryItems.length]?.image || '/images/faisal-hills-drone-view.webp'}
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
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">{item.label || (item as any).tag}</span>
                      <strong className="text-sm font-serif font-bold text-white block leading-snug">{item.title}</strong>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Informative planned construction note */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed font-medium">
            <span className="font-bold">Construction & Planning Note: </span>
            {cleanVerifyText(cms.facilitiesSection?.footerNote || initialPrimeBlockCMS.facilitiesSection?.footerNote || 'In a block still under construction these are planned rather than built, so we describe them as planned and update this page after each site visit.')}
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. WHY INVEST IN PRIME BLOCK & DEVELOPMENT STATUS         */}
      {/* ========================================================= */}
      <div className="space-y-10">

        {/* Section 11: Why Buyers Choose Prime Block, and What to Weigh */}
        <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <ScrollReveal direction="up" delay={50}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{cleanVerifyText(cms.whyChooseSection?.badge || initialPrimeBlockCMS.whyChooseSection?.badge || 'WHY PRIME BLOCK')}</span>
              </div>
              <TextReveal
                as="h2"
                text={cleanVerifyText(cms.whyChooseSection?.heading || initialPrimeBlockCMS.whyChooseSection?.heading || 'Why Buyers Choose Prime Block, and What to Weigh')}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                staggerDelay={65}
                direction="left"
              />
            </div>
          </ScrollReveal>

          {/* Two Distinct Comparative Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* Column 1: Advantages (Why Buyers Choose Prime Block) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-emerald-50/40 border border-emerald-200/80 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
                    {cleanVerifyText(cms.whyChooseSection?.advantagesHeading || initialPrimeBlockCMS.whyChooseSection?.advantagesHeading || 'Why Buyers Choose Prime Block')}
                  </h3>
                </div>

                <div className="space-y-3 pt-1">
                  {(cms.whyChooseSection?.advantages || initialPrimeBlockCMS.whyChooseSection?.advantages || []).map((adv, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-2xs hover:border-emerald-300 transition-all flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <div className="space-y-0.5 text-xs sm:text-sm">
                        <strong className="text-slate-900 font-bold block">{cleanVerifyText(adv.title)}</strong>
                        <p className="text-slate-600 leading-relaxed font-sans">{cleanVerifyText(adv.desc)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Considerations (What to Weigh First) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-amber-50/40 border border-amber-200/80 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
                    {cleanVerifyText(cms.whyChooseSection?.considerationsHeading || initialPrimeBlockCMS.whyChooseSection?.considerationsHeading || 'If you are buying as an investment, weigh these first:')}
                  </h3>
                </div>

                <div className="space-y-3 pt-1">
                  {(cms.whyChooseSection?.considerations || initialPrimeBlockCMS.whyChooseSection?.considerations || []).map((con, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white border border-amber-100 shadow-2xs hover:border-amber-300 transition-all flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        !
                      </div>
                      <div className="space-y-0.5 text-xs sm:text-sm">
                        <strong className="text-slate-900 font-bold block">{cleanVerifyText(con.title)}</strong>
                        <p className="text-slate-600 leading-relaxed font-sans">{cleanVerifyText(con.desc)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Transparent Policy Callout / Disclaimer Note */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
            <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <span className="font-bold text-slate-900">Verifiable Information Policy: </span>
              {cleanVerifyText(cms.whyChooseSection?.disclaimerNote || initialPrimeBlockCMS.whyChooseSection?.disclaimerNote || 'We do not publish expected returns or appreciation figures for Prime Block, because no verifiable source supports them.')}
            </p>
          </div>
        </section>

        {/* On-Ground Development Status */}
        <section id="development-status" className="scroll-mt-28 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

            {/* Left Column: Narrative Content, Table & Status Counters */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
              <ScrollReveal direction="left" delay={50}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                      <Activity className="w-3.5 h-3.5 text-amber-600" />
                      <span>Live Site Update</span>
                    </div>
                    <TextReveal
                      as="h2"
                      text={cms.developmentStatusSection?.heading || 'Faisal Hills Prime Block Development Status'}
                      className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                      staggerDelay={65}
                      direction="left"
                    />
                  </div>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {cms.developmentStatusSection?.intro || 'Work in Prime Block is progressing, with earthwork, levelling and boulevard construction under way. We update this section with new site photos after each visit.'}
                    {cms.developmentStatusSection?.lastUpdated && (
                      <span className="font-semibold text-slate-900 block sm:inline sm:ml-1">
                        Last updated: <span className="text-[#7b002c] font-bold">{cms.developmentStatusSection.lastUpdated}</span>.
                      </span>
                    )}
                  </p>

                  {/* Development Status Data Table */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs mt-2">
                    <table className="w-full text-left text-xs sm:text-sm font-sans">
                      <thead className="bg-slate-900 text-white font-serif">
                        <tr>
                          <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider text-[11px] sm:text-xs">Item</th>
                          <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider text-[11px] sm:text-xs">Status</th>
                          <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider text-[11px] sm:text-xs">As at</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {(cms.developmentStatusSection?.tableRows || initialPrimeBlockCMS.developmentStatusSection?.tableRows || []).map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/40 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/40 transition-colors'}>
                            <td className="p-3 sm:p-3.5 font-semibold text-slate-900">
                              {row.item}
                            </td>
                            <td className="p-3 sm:p-3.5">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 text-[#7b002c] border border-rose-100 font-bold text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] animate-pulse" />
                                <span>{row.status}</span>
                              </span>
                            </td>
                            <td className="p-3 sm:p-3.5 text-slate-600 font-medium whitespace-nowrap text-xs sm:text-sm">
                              {row.asAt}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Stat boxes: Earthwork % · Roads % · Expected possession */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 sm:p-4 bg-slate-50 hover:bg-rose-50/50 rounded-2xl border border-slate-200/80 text-center space-y-1 shadow-2xs transition-all">
                      <span className="text-xl sm:text-2xl font-serif font-bold text-[#7b002c] block">
                        {cms.developmentStatusSection?.statBoxes?.earthwork || '90%'}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 block leading-tight">
                        Earthwork
                      </span>
                    </div>
                    <div className="p-3.5 sm:p-4 bg-slate-50 hover:bg-rose-50/50 rounded-2xl border border-slate-200/80 text-center space-y-1 shadow-2xs transition-all">
                      <span className="text-xl sm:text-2xl font-serif font-bold text-[#7b002c] block">
                        {cms.developmentStatusSection?.statBoxes?.roads || '65%'}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 block leading-tight">
                        Roads & Boulevards
                      </span>
                    </div>
                    <div className="p-3.5 sm:p-4 bg-slate-50 hover:bg-rose-50/50 rounded-2xl border border-slate-200/80 text-center space-y-1 shadow-2xs transition-all">
                      <span className="text-sm sm:text-base font-serif font-bold text-emerald-700 block line-clamp-1">
                        {cms.developmentStatusSection?.statBoxes?.possession || 'Dec 2028'}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-slate-600 block leading-tight">
                        Expected Possession
                      </span>
                    </div>
                  </div>

                  {/* Dated Photographs Notice & Link */}
                  <div className="pt-2">  
                    <p className="text-xs sm:text-sm text-slate-600 font-sans">
                      {cms.developmentStatusSection?.photoLinkNote || 'Dated photographs of every block are on our'}{' '}
                      <Link
                        href={cms.developmentStatusSection?.photoLinkHref || '/gallery'}
                        className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-1 group"
                      >
                        <span>{cms.developmentStatusSection?.photoLinkText || 'development updates (→ development page)'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Real On-Ground Development Photo */}
            <div className="lg:col-span-5 flex flex-col">
              <ScrollReveal direction="right" delay={120} className="w-full h-full flex flex-col flex-1">
                <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 group flex-1">
                  <img
                    src={cms.developmentStatusSection?.image || '/images/faisal-hills-aerial-panoramic.webp'}
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
                      Verified On-Ground Progress
                    </span>
                    <h4 className="font-serif font-bold text-base sm:text-lg leading-snug drop-shadow-md text-white">
                      Prime Sector On-Ground Progress
                    </h4>
                    <p className="text-xs text-slate-300">
                      Heavy earthwork machinery active on site, 225ft main boulevard levelling, and drainage conduits.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </section>

        {/* Possession Advice: What to Confirm Before You Pay */}
        <section id="possession-advice" className="scroll-mt-28 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-amber-200/80 bg-gradient-to-br from-white to-amber-50/30 shadow-sm space-y-4">
          <ScrollReveal direction="left" delay={50}>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <Info className="w-3.5 h-3.5 text-amber-700" />
                <span>Possession Due Diligence</span>
              </div>
              <TextReveal
                as="h2"
                text={cms.possessionAdviceSection?.heading || 'Possession: What to Confirm Before You Pay'}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                <p>
                  {cms.possessionAdviceSection?.paragraph1 || 'Published sources disagree here. Some pages describe Prime Block plots as possession-ready for immediate construction, while the same pages describe earthworks still under way, and the society-level material treats the block as an early-stage development.'}
                </p>
                <p>
                  {cms.possessionAdviceSection?.paragraph2 || 'We do not repeat a possession claim we cannot stand behind. Before paying, ask the society office to confirm in writing whether possession is available for your exact plot number, and visit the plot to see its level and access. If you need to build now, a possession block such as'}{' '}
                  <Link href={cms.possessionAdviceSection?.blockALinkHref || '/blocks/block-a'} className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-0.5">
                    <span>{cms.possessionAdviceSection?.blockALinkText || 'Block A (→ Block A page)'}</span>
                  </Link>{' '}
                  is the better choice. Our{' '}
                  <Link href={cms.possessionAdviceSection?.guideLinkHref || '/blogs/faisal-hills-plot-verification-guide'} className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-0.5">
                    <span>{cms.possessionAdviceSection?.guideLinkText || 'plot verification guide (→ buying guide)'}</span>
                  </Link>{' '}
                  lists the checks in order.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Prime Block vs Block A Comparison Matrix */}
        <section id="compare-block-a" className="scroll-mt-28 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5" />
                <span>Sector Comparison</span>
              </div>
              <TextReveal
                as="h2"
                text={cms.comparisonSection?.heading || 'Prime Block or Block A?'}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans">
                {cms.comparisonSection?.subline || 'Direct comparison between Prime Block and fully developed Block A:'}
              </p>
            </div>
          </ScrollReveal>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-slate-900 text-white font-serif">
                <tr>
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider text-xs sm:text-sm w-1/4">Aspect / Feature</th>
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider text-xs sm:text-sm text-amber-300 w-3/8">
                    {cms.comparisonSection?.primeBlockColumnName || 'Prime Block'}
                  </th>
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider text-xs sm:text-sm text-emerald-300 w-3/8">
                    {cms.comparisonSection?.blockAColumnName || 'Block A'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {(cms.comparisonSection?.rows || initialPrimeBlockCMS.comparisonSection?.rows || []).map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/40">
                      {row.aspect}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-700 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] shrink-0" />
                        <span>{row.primeBlock}</span>
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-700 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{row.blockA}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-1">
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              {cms.comparisonSection?.compareLinkNote || 'Every block is compared on our'}{' '}
              <Link
                href={cms.comparisonSection?.compareLinkHref || '/faisal-hills-blocks'}
                className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-1 group"
              >
                <span>{cms.comparisonSection?.compareLinkText || 'Faisal Hills blocks (→ blocks page)'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>.
            </p>
          </div>
        </section>

        {/* Step-by-Step Booking & Transfer Process */}
        <section id="booking-process" className="scroll-mt-28 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{cms.bookingProcessSection?.badge || '4-STEP BOOKING'}</span>
              </div>
              <TextReveal
                as="h2"
                text={cms.bookingProcessSection?.heading || 'How to Book a Plot in Prime Block'}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans">
                {cms.bookingProcessSection?.intro || 'Follow these 4 essential points to complete direct booking and secure your verified company allotment file:'}
              </p>
            </div>
          </ScrollReveal>

          {/* Booking Steps Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-slate-900 text-white font-serif">
                <tr>
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider text-xs sm:text-sm w-20 sm:w-28 text-slate-200">
                    Step
                  </th>
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider text-xs sm:text-sm text-amber-300 w-1/4 sm:w-1/3">
                    Title
                  </th>
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider text-xs sm:text-sm text-emerald-300">
                    What You Provide
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {(cms.bookingProcessSection?.steps || initialPrimeBlockCMS.bookingProcessSection?.steps || []).map((item, idx) => (
                  <tr
                    key={idx}
                    className={
                      idx % 2 === 0
                        ? 'bg-white hover:bg-rose-50/30 transition-colors'
                        : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'
                    }
                  >
                    <td className="p-3.5 sm:p-4 font-bold text-[#7b002c] font-mono text-sm sm:text-base bg-slate-50/40">
                      {String(item.step).padStart(2, '0')}
                    </td>
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                      <div className="space-y-0.5">
                        <span className="block font-serif text-sm sm:text-base">{item.title}</span>
                        {item.tag && (
                          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#7b002c] bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60">
                            {item.tag}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-700 font-medium">
                      <span className="inline-flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{item.desc}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Assistance Box */}
          <div className="p-5 bg-gradient-to-r from-slate-900 via-[#4a081a] to-slate-950 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-white/10">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif font-bold text-base sm:text-lg text-white">
                {cms.bookingProcessSection?.assistanceBoxHeading || 'Need help booking in Prime Block?'}
              </h4>
              <p className="text-xs text-rose-100/80 font-sans">
                {cms.bookingProcessSection?.assistanceBoxText || 'Our sales desk helps with pay orders, booking forms and document checks, in person or over WhatsApp.'}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/923331113177?text=Hi%2C%20I%20need%20official%20assistance%20with%20booking%20a%20plot%20in%20Faisal%20Hills%20Prime%20Block."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow hover:scale-105 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{cms.bookingProcessSection?.assistanceButtonText || 'Contact Sales Desk'}</span>
              </a>
            </div>
          </div>

          {/* Existing File Transfer Note */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 font-sans leading-relaxed">
            <p>
              <strong className="text-slate-900 font-serif">File Transfer Advisory: </strong>
              {cms.bookingProcessSection?.fileTransferNote || 'If you are buying an existing file rather than booking a new plot, treat it as a transfer: confirm the file and allotment details at the society office, check the transfer history, and pay the seller only once the transfer is complete.'}
            </p>
          </div>
        </section>

      </div>

      {/* ========================================================= */}
      {/* 9. COMPARE OTHER FAISAL HILLS BLOCKS (EXCLUSIVE OF PRIME) */}
      {/* ========================================================= */}
      <section id="explore-blocks" className="scroll-mt-28 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <TextReveal
              as="h2"
              text={cms.exploreOtherBlocksSection?.heading || 'Explore Other Faisal Hills Blocks'}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              {cms.exploreOtherBlocksSection?.subtitle || 'Compare Prime Block with the rest of the society. Each block page shows possession status, plot sizes and prices.'}
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

        <div className="pt-2 text-center sm:text-left">
          <Link
            href={cms.exploreOtherBlocksSection?.compareHubHref || '/faisal-hills-blocks'}
            className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-1.5 text-sm group"
          >
            <span>{cms.exploreOtherBlocksSection?.compareHubText || 'Compare all Faisal Hills blocks (→ blocks hub)'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQS) & LEAD FORM         */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 py-12 lg:py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">

          {/* Left Column: Sticky FAQ'S Title */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-24 self-start">
            <span className="label-caps text-[#7b002c] font-bold block mb-1 text-xs uppercase tracking-widest">FAQ&apos;S</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#7b002c] tracking-tight leading-[1.15] uppercase">
              {cms.faqsSection?.heading || 'Faisal Hills Prime Block: Frequently Asked Questions'}
            </h2>
          </div>

          {/* Right Column: Clean Horizontal Separated Accordion */}
          <div className="lg:col-span-8 space-y-0 border-t border-slate-900/80">
            {(cms.faqsSection?.faqs || initialPrimeBlockCMS.faqsSection?.faqs || primeFaqs).map((faq, index) => {
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
            {cms.closingSiteVisitSection?.heading || 'Is Prime Block Right for You?'}
          </h2>
          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans pt-2">
            <p>
              {cms.closingSiteVisitSection?.paragraph1 || 'Prime Block is a lower-priced way into an RDA-approved society on GT Road, with an instalment plan and a position beside Block A. It suits long-term buyers and overseas Pakistanis who are comfortable waiting for development. Families who want to build now will be better served by a block with possession.'}
            </p>
            <p>
              {cms.closingSiteVisitSection?.paragraph2 || 'To check available sizes, corner and park-facing options and the current payment plan,'}{' '}
              <Link href={cms.closingSiteVisitSection?.contactLinkHref || '/contact'} className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-0.5">
                <span>{cms.closingSiteVisitSection?.contactLinkText || 'contact our sales desk (→ contact page)'}</span>
              </Link>.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Direct Priority Lead Capture Inquiry Form */}
      <section id="site-visit" className="scroll-mt-28 bg-gradient-to-br from-[#7b002c] via-[#5c0021] to-[#3a0014] text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center space-y-2 relative z-10">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">
            {cms.closingSiteVisitSection?.formLabel || 'SITE VISIT & VIDEO TOURS'}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            {cms.closingSiteVisitSection?.formTitle || 'Book a Prime Block Site Visit'}
          </h3>
          <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            {cms.closingSiteVisitSection?.formSubtitle || 'Leave your details and we will send available plots, the current payment plan and a time for a site visit or live video tour on WhatsApp.'}
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
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">WhatsApp Number *</label>
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
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Plot Size</label>
                <select
                  value={leadPlot}
                  onChange={(e) => setLeadPlot(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white focus:outline-none focus:border-white transition-all cursor-pointer"
                >
                  <option value="5 Marla (25x50)" className="bg-slate-900 text-white">5 Marla (25×50)</option>
                  <option value="8 Marla (30x60)" className="bg-slate-900 text-white">8 Marla (30×60)</option>
                  <option value="10 Marla (35x70)" className="bg-slate-900 text-white">10 Marla (35×70)</option>
                  <option value="14 Marla (40x80)" className="bg-slate-900 text-white">14 Marla (40×80)</option>
                  <option value="1 Kanal (50x90)" className="bg-slate-900 text-white">1 Kanal (50×90)</option>
                  <option value="Commercial Plot" className="bg-slate-900 text-white">Commercial Plot</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">I am</label>
                <select
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white focus:outline-none focus:border-white transition-all cursor-pointer"
                >
                  <option value="buying to build a home" className="bg-slate-900 text-white">Buying to build a home</option>
                  <option value="overseas Pakistani" className="bg-slate-900 text-white">Overseas Pakistani (NRP)</option>
                  <option value="investor" className="bg-slate-900 text-white">Investor</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Anything else? (optional)</label>
              <textarea
                rows={2}
                placeholder="e.g. Schedule weekend site tour or request live video tour on WhatsApp..."
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
              <span>{cms.closingSiteVisitSection?.formButtonText || 'Request Site Visit'}</span>
            </button>
          </form>
        )}
      </section>

      {/* Editorial Audit & Disclosure Note */}
      <div className="p-4 sm:p-5 bg-slate-100/90 rounded-2xl border border-slate-200 text-xs text-slate-600 font-sans leading-relaxed">
        <p>
          {cms.closingSiteVisitSection?.reviewedByNote || 'About this page: reviewed by Property Verification Team of Faisal Hills Authorized Sales Desk. Figures come from developer schedules and our own site visits. Prices and terms are set by the developer and change without notice. If you find anything out of date, tell us and we will correct it.'}
        </p>
      </div>

      {/* Fullscreen Zoom & Download Payment Plan Modal */}
      <PaymentPlanModal
        isLightboxOpen={isPaymentPlanLightboxOpen}
        onCloseLightbox={() => setIsPaymentPlanLightboxOpen(false)}
        isDownloadOpen={isPaymentPlanDownloadOpen}
        onCloseDownload={() => setIsPaymentPlanDownloadOpen(false)}
        onOpenDownload={() => setIsPaymentPlanDownloadOpen(true)}
        imageSrc="/images/faisal-hills-payment-plan-2026.webp"
      />

      {/* Map Download & Full Screen Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        blockName="Prime Block"
        mapImageUrl="/images/faisal-hills-master-plan-map.webp"
      />

    </div>
  );
}
