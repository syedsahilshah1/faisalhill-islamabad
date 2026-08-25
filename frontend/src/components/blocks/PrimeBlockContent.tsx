'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  PlotItem,
  plotInventoryData,
  fetchPlots
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
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import { DynamicPlotSeriesExplorer } from '@/components/plots/DynamicPlotSeriesExplorer';
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
    desc: 'Dedicated community parks with children play zones, jogging tracks, gazebo sitting areas, and lush flora.'
  },
  {
    id: 4,
    title: 'Central Jamia Mosque & Spiritual Center',
    category: 'amenities',
    tag: 'Grand Mosque',
    image: '/images/imgi_46_Mosques.webp',
    desc: 'Architecturally stunning air-conditioned Jamia Mosque with extensive prayer capacity and Islamic architecture.'
  },
  {
    id: 5,
    title: 'Sports Arena & Multi-Purpose Courts',
    category: 'amenities',
    tag: 'Sports Complex',
    image: '/images/imgi_48_sports-arena.webp',
    desc: 'State-of-the-art sports facilities including tennis courts, football turf, badminton, and cricket ground.'
  },
  {
    id: 6,
    title: 'Healthcare & Modern Medical Complex',
    category: 'amenities',
    tag: 'Healthcare Hub',
    image: '/images/imgi_49_Medical-xomplex.webp',
    desc: 'Fully equipped 24/7 medical and emergency clinic providing quality family healthcare services.'
  },
  {
    id: 7,
    title: 'Roots International School Campus',
    category: 'amenities',
    tag: 'Operational School',
    image: '/images/faisal-roots-school.jpg',
    desc: 'Internationally benchmarked educational facility actively teaching students inside Faisal Hills.'
  },
  {
    id: 8,
    title: 'Prime Commercial Hub & High-Rise Retail',
    category: 'infrastructure',
    tag: 'Commercial Plazas',
    image: '/images/faisalhillarc.jpg',
    desc: 'Dynamic commercial sector hosting corporate offices, banks, retail outlets, and culinary restaurants.'
  }
];

const primeTravelTimes = [
  { destination: 'HITEC University Taxila', time: '5 mins', distance: '3.2 km', note: 'Direct GT Road link' },
  { destination: 'Multi Gardens B-17', time: '6 mins', distance: '4.8 km', note: 'Direct inter-city road link' },
  { destination: 'Taxila M-1 Interchange', time: '10 mins', distance: '9.5 km', note: 'Motorway connector' },
  { destination: 'Tarnol Morr (Islamabad)', time: '8 mins', distance: '7.0 km', note: 'Twin Cities Junction' },
  { destination: 'New Islamabad Airport', time: '25 mins', distance: '32 km', note: 'Via Airport Cargo & M-1' },
  { destination: 'Rawalpindi Saddar', time: '25 mins', distance: '28 km', note: 'Via N-5 National Highway' },
  { destination: 'Central Islamabad (Blue Area)', time: '35 mins', distance: '29 km', note: 'Via Margalla Ave & N-5' }
];

const primeFaqs = [
  {
    q: 'WHY IS PRIME BLOCK CONSIDERED THE #1 TOP PRIORITY BLOCK IN FAISAL HILLS?',
    a: 'Prime Block represents Faisal Hills’ flagship luxury sector, featuring uniform official launch rates, 48-month easy installment plans with zero dealer markups, direct 225ft main boulevard frontage, and the highest elevation crest overlooking the Margalla Hills.'
  },
  {
    q: 'IS FAISAL HILLS PRIME BLOCK RDA APPROVED?',
    a: 'Yes. Faisal Hills holds comprehensive NOC approval from the Rawalpindi Development Authority (RDA). All land-use plans, road hierarchies, and utility networks for Prime Block are fully sanctioned and legally verified.'
  },
  {
    q: 'WHAT IS THE PAYMENT PLAN AND BOOKING DOWN PAYMENT FOR PRIME BLOCK PLOTS?',
    a: 'Booking begins with a 20% down payment. The remaining balance is conveniently divided into 16 quarterly installments over 48 months (4 years), with 10% payable on balloting and 10% on final possession.'
  },
  {
    q: 'ARE THERE ANY HIDDEN PREMIUMS ("ON") ON PRIME BLOCK FILES?',
    a: 'No. Prime Block is offered at official fixed launch prices without any speculative series markup or fluctuating premium. You pay exactly the official company rate issued by Zedem International.'
  },
  {
    q: 'WHAT RESIDENTIAL PLOT SIZES ARE AVAILABLE IN PRIME BLOCK?',
    a: 'Prime Block features 5 Marla (25×50), 8 Marla (30×60), 10 Marla (35×70), 14 Marla (40×80), and 1 Kanal (50×90) luxury residential plots.'
  },
  {
    q: 'CAN OVERSEAS PAKISTANIS BOOK A PLOT IN PRIME BLOCK ONLINE?',
    a: 'Yes. Overseas Pakistanis (NRPs) can book directly through our authorized sales desk. You can submit digital CNIC/NICOP documents, transfer the booking payment directly to Zedem International’s official bank account, and receive the verified allotment file via registered courier or collected in person.'
  },
  {
    q: 'HOW FAR IS PRIME BLOCK FROM ISLAMABAD AND THE M-1 MOTORWAY?',
    a: 'Prime Block sits directly on the Main GT Road (N-5), approximately 5–8 minutes from Tarnol Morr, 10 minutes from the Taxila M-1 Interchange, and 30–35 minutes from Islamabad Zero Point / Blue Area.'
  }
];

const defaultPrimeSellingPlots = [
  {
    id: 'prime-plot-5m-1',
    plotNumber: 'PR-108',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    facing: 'Park Facing',
    priceFormatted: 'PKR 32.5 Lacs',
    downPayment: 'PKR 6,50,000 (20%)',
    status: 'Ready to Book',
    badge: '4-Year Plan',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    features: ['Near 225ft Boulevard', 'Underground Utilities', 'Immediate Verification']
  },
  {
    id: 'prime-plot-8m-1',
    plotNumber: 'PR-245',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    facing: 'Hill View',
    priceFormatted: 'PKR 48.0 Lacs',
    downPayment: 'PKR 9,60,000 (20%)',
    status: 'High Demand',
    badge: 'Scenic Elevation',
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg',
    features: ['Elevated Margalla Ridge', '50ft Wide Carpeted Road', 'Zero Premium']
  },
  {
    id: 'prime-plot-10m-1',
    plotNumber: 'PR-312',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    facing: 'Corner Plot',
    priceFormatted: 'PKR 58.0 Lacs',
    downPayment: 'PKR 11,60,000 (20%)',
    status: 'VIP Selection',
    badge: 'Double Corner',
    image: '/images/faisal-park.jpg',
    features: ['Direct Community Park Front', 'West Open Airy Layout', 'Clear Allotment Verification']
  },
  {
    id: 'prime-plot-14m-1',
    plotNumber: 'PR-420',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    facing: 'Boulevard Front',
    priceFormatted: 'PKR 78.0 Lacs',
    downPayment: 'PKR 15,60,000 (20%)',
    status: 'Limited Inventory',
    badge: 'Executive Avenue',
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg',
    features: ['Executive Villa Dimensions', 'Close to Jamia Mosque', 'Rapid Construction Zone']
  },
  {
    id: 'prime-plot-1k-1',
    plotNumber: 'PR-014',
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
    id: 'prime-plot-2k-1',
    plotNumber: 'PR-002',
    blockName: 'Prime Block',
    category: 'Residential',
    size: '2 Kanal',
    dimensions: '75 × 120',
    facing: 'Hilltop Panorama',
    priceFormatted: 'PKR 2.10 Crore',
    downPayment: 'PKR 42,00,000 (20%)',
    status: 'Exclusive Estate',
    badge: 'Hilltop Mansion',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
    features: ['Private High-Altitude Crest', 'Bespoke Architectural Scope', 'Strict Gated Access']
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
  }
];

export default function PrimeBlockContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [isMasterPlanExpanded, setIsMasterPlanExpanded] = useState(false);
  const [isDevStatusExpanded, setIsDevStatusExpanded] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'infrastructure' | 'nature' | 'amenities'>('all');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<typeof primeGalleryItems[0] | null>(null);
  const [plotCategoryFilter, setPlotCategoryFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  // Dynamic live plot inventory sync from Laravel Backend Dashboard / LocalStorage / API
  const [allPlots, setAllPlots] = useState<PlotItem[]>(plotInventoryData);

  useEffect(() => {
    fetchPlots().then(data => setAllPlots(data)).catch(console.error);

    const handleSync = () => {
      fetchPlots().then(data => setAllPlots(data)).catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handleSync);
    return () => window.removeEventListener('faisal_plots_updated', handleSync);
  }, []);

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
      priceFormatted: plot.priceFormatted || (plot.price ? `PKR ${(plot.price / 100000).toFixed(1)} Lacs` : 'Call for Price'),
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

  const filteredGallery = primeGalleryItems.filter(
    item => galleryFilter === 'all' || item.category === galleryFilter
  );

  return (
    <div className="space-y-12 lg:space-y-16">

      {/* ========================================================= */}
      {/* 1. EXECUTIVE QUICK METRIC STATS BAR                      */}
      {/* ========================================================= */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <ScrollReveal direction="pop" delay={0}>
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-[#7b002c]/40 hover:shadow-md transition-all h-full">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#7b002c] shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">NOC Approval</span>
              <strong className="font-serif font-bold text-base sm:text-lg text-slate-900 block">
                <CountUpNumber end={100} suffix="%" duration={1600} /> RDA Approved
              </strong>
              <span className="text-[11px] text-emerald-600 font-semibold">100% Fully Sanctioned</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="pop" delay={60}>
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-[#7b002c]/40 hover:shadow-md transition-all h-full">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Installment Plan</span>
              <strong className="font-serif font-bold text-base sm:text-lg text-slate-900 block">
                <CountUpNumber end={48} duration={1800} /> Months Easy Plan
              </strong>
              <span className="text-[11px] text-amber-600 font-semibold">16 Quarterly Payments</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="pop" delay={120}>
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-[#7b002c]/40 hover:shadow-md transition-all h-full">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Booking Amount</span>
              <strong className="font-serif font-bold text-base sm:text-lg text-slate-900 block">
                <CountUpNumber end={20} suffix="%" duration={1500} /> Down Payment
              </strong>
              <span className="text-[11px] text-emerald-600 font-semibold">Zero Market Premium</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="pop" delay={180}>
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-[#7b002c]/40 hover:shadow-md transition-all h-full">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Boulevard Frontage</span>
              <strong className="font-serif font-bold text-base sm:text-lg text-slate-900 block">
                <CountUpNumber end={225} suffix="ft+" duration={1900} /> Main Axis
              </strong>
              <span className="text-[11px] text-blue-600 font-semibold">Margalla Ridge Crest</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 2. ABOUT PRIME BLOCK & SECTOR OVERVIEW                   */}
      {/* ========================================================= */}
      <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Flagship Priority Sector</span>
                </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Uniform Official Pricing', desc: 'Guaranteed company launch rates with zero hidden markups or premiums.' },
                { title: '48 Months Installments', desc: '16 easy quarterly installments after a convenient 20% down payment.' },
                { title: 'RDA Sanctioned Legal Status', desc: 'Complete legal security backed by Rawalpindi Development Authority.' },
                { title: 'Underground Infrastructure', desc: '100% underground electricity, sewerage, water lines and fiber optics.' }
              ].map((item, idx) => (
                <ScrollReveal key={idx} direction="up" delay={(idx % 2) * 60}>
                  <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 h-full">
                    <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-serif font-bold text-slate-900 block">{item.title}</strong>
                      <span className="text-[11px] text-slate-600">{item.desc}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
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

      {/* ========================================================= */}
      {/* 3. INTERACTIVE PLOT PRICE & FIXED RATE EXPLORER           */}
      {/* ========================================================= */}
      <section id="pricing-matrix" className="scroll-mt-28">
        <ScrollReveal direction="up" delay={50}>
          <DynamicPlotSeriesExplorer blockSlug="prime-block" blockName="Prime Block" />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 4. COMPREHENSIVE OFFICIAL FIXED PRICING MATRIX TABLE      */}
      {/* ========================================================= */}
      <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>Official Company Schedule</span>
              </div>
              <TextReveal
                as="h2"
                text="Prime Block 4-Year Installment Breakdown"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-sans">
                Review verified plot dimensions, down payments, quarterly installments, and balloting milestones across all residential categories:
              </p>
            </div>
            <a
              href="https://wa.me/923044811717?text=Hi%2C%20I%20would%20like%20to%20request%20the%20complete%20Prime%20Block%20Payment%20Schedule%20and%20plot%20booking%20procedure."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Request Official File</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          {/* Mobile Card Layout */}
          <div className="block md:hidden space-y-4">
            {primeFixedPriceSchedule.map((row, idx) => (
              <div key={idx} className="bg-slate-50/70 rounded-2xl border border-slate-200 p-4 space-y-3.5 shadow-2xs">
                <div className="flex items-start justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div>
                    <span className="font-serif font-bold text-lg text-slate-900 block">{row.size}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{row.dimensions} • {row.sqYards}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                    {row.status.split('—')[0].trim()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Price</span>
                    <strong className="font-serif text-sm sm:text-base font-bold text-[#7b002c] block mt-0.5">{row.totalPrice}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">20% Down Payment</span>
                    <strong className="text-slate-900 font-bold block mt-0.5">{row.downPayment}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Installment</span>
                    <span className="text-slate-800 font-semibold block mt-0.5">{row.quarterlyInstallment}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Balloting (10%)</span>
                    <span className="text-slate-700 font-medium block mt-0.5">{row.balloting}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20booking%20a%20${encodeURIComponent(row.size)}%20plot%20in%20Faisal%20Hills%20Prime%20Block.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire / Book {row.size}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                <tr>
                  <th className="p-4">Plot Size</th>
                  <th className="p-4">Dimensions</th>
                  <th className="p-4">Total Price</th>
                  <th className="p-4">20% Down Payment</th>
                  <th className="p-4">16 Quarterly Installments</th>
                  <th className="p-4">Balloting (10%)</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {primeFixedPriceSchedule.map((row, idx) => (
                  <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-4">
                      <strong className="font-serif font-bold text-sm text-slate-900 block">{row.size}</strong>
                      <span className="text-[10px] text-emerald-700 font-semibold">{row.status}</span>
                    </td>
                    <td className="p-4 font-mono text-slate-600">
                      <div>{row.dimensions}</div>
                      <div className="text-[10px] text-slate-400">({row.sqYards})</div>
                    </td>
                    <td className="p-4">
                      <strong className="font-serif font-bold text-sm text-[#7b002c] block">{row.totalPrice}</strong>
                      <span className="text-[10px] text-slate-500 font-sans">Official Launch</span>
                    </td>
                    <td className="p-4 font-semibold text-slate-900">{row.downPayment}</td>
                    <td className="p-4 text-slate-800 font-medium">{row.quarterlyInstallment}</td>
                    <td className="p-4 text-slate-600">{row.balloting}</td>
                    <td className="p-4">
                      <a
                        href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20booking%20a%20${encodeURIComponent(row.size)}%20plot%20in%20Faisal%20Hills%20Prime%20Block.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white rounded-lg text-[11px] font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inquire</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
          <span>* All installment rates are uniform with no hidden premiums. Special category plots (Corner, Park Facing, Main Boulevard) attract standard 10% prime location charges at allotment.</span>
          <span className="font-bold text-[#7b002c] shrink-0">Zedem International Official Guarantee</span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. LOCATION & CONNECTIVITY MATRIX + STICKY GOOGLE MAP     */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

          {/* Left Column: Accessibility & Commute Badges */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Main GT Road & Margalla Access</span>
                </div>
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
                  <p>
                    Perched atop the highest natural elevation ridge in the society, Prime Block enjoys clean mountain breezes, lush green horizons, and immediate arterial connectivity without any traffic bottlenecks.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Accessibility and Travel Times */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <ScrollReveal direction="up" delay={80}>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#7b002c]" />
                  <span>Accessibility & Travel Times</span>
                </h3>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {primeTravelTimes.map((item, idx) => (
                  <ScrollReveal key={idx} direction="up" delay={(idx % 4) * 40}>
                    <div
                      className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1 hover:border-[#7b002c]/40 transition-all hover:scale-[1.02] shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{item.destination}</span>
                        <span className="px-2 py-0.5 bg-rose-50 text-[#7b002c] font-bold text-[10px] rounded-full border border-rose-100">
                          {item.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                        <span>{item.distance}</span>
                        <span className="text-slate-400 italic">{item.note}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Live Interactive Google Map Embed */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start space-y-3">
            <div className="flex items-center justify-between gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="space-y-0.5">
                <strong className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7b002c]" />
                  <span>Live GPS Pin Location</span>
                </strong>
                <span className="text-[11px] text-slate-500 block">Main GT Road (N-5), Taxila</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Faisal+Hills+Taxila"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-xl shadow-xs transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <Navigation className="w-3 h-3" />
                <span>Open Map</span>
                <ExternalLink className="w-2.5 h-2.5 text-white/80" />
              </a>
            </div>

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
      {/* 6. FACILITIES AND MASTER AMENITIES (8 VISUAL CARDS)       */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Trees className="w-3.5 h-3.5" />
              <span>Master Amenities</span>
            </div>
            <TextReveal
              as="h2"
              text="Facilities and Amenities in Prime Block"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
              staggerDelay={60}
              direction="left"
            />
            <p className="text-slate-700 text-sm leading-relaxed">
              Prime Block is planned with world-class facilities and modern municipal infrastructure:
            </p>
          </div>
        </ScrollReveal>

        {/* 8 Facilities & Amenities Cards with Real Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {primeGalleryItems.map((item, idx) => (
            <ScrollReveal key={item.id} direction="pop" delay={(idx % 4) * 60}>
              <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group flex flex-col justify-between h-full">
                <div>
                  <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
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
                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">{item.tag}</span>
                      <strong className="text-sm font-serif font-bold text-white block truncate">{item.title}</strong>
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-medium">
          On the infrastructure side, the block also benefits from wide carpeted roads, underground electricity, high-speed fiber optics, and dedicated water filtration plants.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 8. ON-GROUND DEVELOPMENT STATUS (SIDE-BY-SIDE PHOTO)     */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* Left Column: Narrative Content & Status Counters */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                    <Activity className="w-3.5 h-3.5" />
                    <span>On-Ground Progress • Verified Site Update</span>
                  </div>
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

              {/* Quick Status Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-0.5 shadow-2xs">
                  <span className="text-xl font-serif font-bold text-[#7b002c] block">90%+</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">Earthwork Done</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-0.5 shadow-2xs">
                  <span className="text-xl font-serif font-bold text-[#7b002c] block">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">Underground Grid</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-0.5 shadow-2xs">
                  <span className="text-xl font-serif font-bold text-emerald-700 block">48 Mo.</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">Possession Plan</span>
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

      {/* ========================================================= */}
      {/* 9. WHY INVEST IN PRIME BLOCK                             */}
      {/* ========================================================= */}
      <section className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ROI & Capital Growth</span>
            </div>
            <TextReveal
              as="h2"
              text="Why Invest in Faisal Hills Prime Block"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-300 text-sm">
              Why buyers and overseas Pakistanis rank Prime Block as the top priority sector:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            { title: "Official Launch Rates", desc: "No speculative dealer markup or fluctuating 'on'. Guaranteed official company pricing." },
            { title: "48-Month Flexible Plan", desc: "16 easy quarterly installments offering manageable cash flows for salaried and business buyers." },
            { title: "Margalla Ridge Elevation", desc: "Scenic mountain breezes and elevated topography giving scenic views and fresh air." },
            { title: "225ft Boulevard Axis", desc: "Direct frontage on the grand 225ft main boulevard connecting directly to GT Road N-5." },
            { title: "RDA Approved Legal Security", desc: "Comprehensive NOC approval with 100% legal security and verified land titles." },
            { title: "High Capital Appreciation", desc: "High appreciation velocity as balloting approaches and on-ground utilities complete." }
          ].map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={(idx % 3) * 60}>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5 hover:bg-white/15 transition-all hover:scale-[1.02] h-full">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <strong className="text-white block font-bold text-sm">{item.title}</strong>
                <span className="text-slate-300 leading-relaxed block">{item.desc}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. STEP-BY-STEP BOOKING & TRANSFER PROCESS               */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Documentation Checklist • Booking Protocol</span>
            </div>
            <TextReveal
              as="h2"
              text="Faisal Hills Prime Block Booking Process"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              Booking a plot file in Prime Block is transparent and processed directly through Zedem International:
            </p>
          </div>
        </ScrollReveal>

        {/* 4-Step Process Workflow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { step: '01', tag: 'Identity', title: 'CNIC / NICOP Copies', desc: 'Two photocopies of applicant CNIC or NICOP along with Next-of-Kin CNIC.', req: 'Attested Copies' },
            { step: '02', tag: 'Photographs', title: 'Passport Size Photos', desc: 'Two passport-size photographs of the applicant with blue/white background.', req: 'Recent Photos' },
            { step: '03', tag: 'Payment', title: '20% Down Payment', desc: 'Pay Order / Bank Draft prepared in favour of "Zedem International (Pvt) Ltd".', req: 'Official Bank Receipt' },
            { step: '04', tag: 'File Allotment', title: 'Allotment Letter', desc: 'Receive official company booking letter, payment receipt, and installment book.', req: 'Official Delivery' }
          ].map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 60}>
              <div className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#7b002c]/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between space-y-4 h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-rose-100/70 text-[#7b002c] flex items-center justify-center font-serif font-bold text-sm group-hover:scale-110 transition-transform">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800/80 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.req}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Transfer Desk Banner */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-[#4a081a] to-slate-900 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif font-bold text-base sm:text-lg text-white">Need Assistance with Prime Block Booking?</h4>
            <p className="text-xs text-rose-100/80">Our authorized sales facilitators assist with official Pay Orders, booking forms, and immediate file verification.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/923044811717?text=Hi%2C%20I%20need%20official%20assistance%20with%20booking%20a%20plot%20in%20Faisal%20Hills%20Prime%20Block."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Booking Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. COMPARE OTHER FAISAL HILLS BLOCKS (PANORAMIC ACCORDION)*/}
      {/* ========================================================= */}
      <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Faisal Hills Sectors</span>
            </div>
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

        {/* Panoramic Expanding Cards Showcase (Exclusively Faisal Hills Blocks) */}
        <ScrollReveal direction="up" delay={100}>
          <ExpandingProjectsShowcase
            items={defaultFaisalHillsBlocks}
            defaultActiveIndex={0}
            containerHeightClass="h-[460px] sm:h-[500px] lg:h-[540px]"
            roundedClass="rounded-2xl sm:rounded-3xl"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 11. FEATURED PRIME BLOCK PLOTS FOR SALE & RESALE DESK      */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>Verified Inventory & Resale Desk</span>
              </div>
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  plotCategoryFilter === 'all'
                    ? 'bg-[#7b002c] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Plots ({primePlots.length})
              </button>
              <button
                type="button"
                onClick={() => setPlotCategoryFilter('residential')}
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
                onClick={() => setPlotCategoryFilter('commercial')}
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

        {/* Plot Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {primePlots
            .filter(plot => plotCategoryFilter === 'all' || plot.category.toLowerCase() === plotCategoryFilter)
            .map((plot, idx) => (
              <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 80}>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                  <div>
                    {/* Plot Image Container -> Links to /plots filtered */}
                    <Link
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=prime-block`}
                      className="relative h-44 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                    >
                      <img
                        src={plot.image}
                        alt={plot.plotNumber}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                      {/* Top Badges Row (Prevents Any Overlap) */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 z-10">
                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm bg-[#7b002c] text-white border border-white/20 shrink-0">
                            {plot.category}
                          </span>
                          {plot.badge && (
                            <span className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-slate-200 border border-white/15 truncate max-w-[95px]">
                              {plot.badge}
                            </span>
                          )}
                        </div>
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm border border-emerald-400/30 shrink-0 whitespace-nowrap">
                          {plot.status}
                        </span>
                      </div>

                      {/* Plot Number & Block */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] text-slate-300 font-medium block uppercase tracking-wider">{plot.blockName}</span>
                        <h4 className="font-serif font-bold text-xl group-hover:text-amber-300 transition-colors">#{plot.plotNumber}</h4>
                      </div>
                    </Link>

                    {/* Specs Details -> Links to /plots filtered */}
                    <Link
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=prime-block`}
                      className="p-5 space-y-3.5 block cursor-pointer hover:bg-slate-50/60 transition-colors"
                    >
                      <div className="space-y-2 text-xs text-slate-600">
                        <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Plot Size:</span>
                          <span className="text-slate-900 font-bold group-hover:text-[#7b002c] transition-colors">{plot.size}</span>
                        </div>
                        <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Dimensions:</span>
                          <strong className="text-slate-900 font-semibold">{plot.dimensions}</strong>
                        </div>
                        <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Orientation:</span>
                          <strong className="text-slate-900 font-semibold">{plot.facing}</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Down Payment:</span>
                          <span className="text-[#7b002c] font-bold">{plot.downPayment}</span>
                        </div>
                      </div>

                      {/* Feature Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {Array.isArray(plot.features) && plot.features.slice(0, 3).map((feat: string, fIdx: number) => (
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
                  <div className="p-4 pt-3 border-t border-slate-100 mt-2 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Total Price</span>
                      <span className="font-serif font-bold text-base text-[#7b002c]">{plot.priceFormatted}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/plots/${plot.id}`}
                        className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1 text-center"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>

                      <a
                        href={`https://wa.me/923044811717?text=${encodeURIComponent(`Hi, I am interested in buying Prime Block Plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share file details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1 shadow-sm text-center"
                      >
                        <Phone className="w-3 h-3" />
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
      {/* 12. MASTER PLAN SECTION (2-COLUMN UNBOXED BLUEPRINT)       */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column: High-Resolution Map Container */}
          <div className="lg:col-span-6 flex flex-col">
            <ScrollReveal direction="left" delay={50}>
              <div
                onClick={() => setIsMapModalOpen(true)}
                className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-950 group shadow-lg cursor-pointer flex flex-col justify-center min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] p-2"
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Zoning Blueprint • Sector Masterplan</span>
                  </div>
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
              <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7b002c] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#9e1245] shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Master Map PDF</span>
                </button>

                <a
                  href="https://wa.me/923044811717?text=Hi%2C%20I%20would%20like%20to%20request%20the%20official%20Prime%20Block%20Zoning%20Map."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer"
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
      {/* 12. FREQUENTLY ASKED QUESTIONS (HOMEPAGE DESIGN STYLE)    */}
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

      {/* ========================================================= */}
      {/* 13. FINAL THOUGHTS & CONCLUSION                          */}
      {/* ========================================================= */}
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

      {/* ========================================================= */}
      {/* 14. DIRECT LEAD CAPTURE INQUIRY FORM                     */}
      {/* ========================================================= */}
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
