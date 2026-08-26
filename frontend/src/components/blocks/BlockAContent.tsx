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
  DollarSign,
  TrendingUp
} from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import { DynamicPlotSeriesExplorer } from '@/components/plots/DynamicPlotSeriesExplorer';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';

interface BlockAPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  priceRange: string;
  possession: string;
  category: string;
  status: string;
}

const blockAPriceSchedule: BlockAPriceRow[] = [
  {
    size: '5 Marla',
    dimensions: '25 × 50',
    sqYards: '139 Sq. Yds',
    priceRange: 'PKR 48 Lacs – 58 Lacs',
    possession: 'Immediate (100% Ready)',
    category: 'Residential',
    status: 'Ready for Construction'
  },
  {
    size: '8 Marla',
    dimensions: '30 × 60',
    sqYards: '200 Sq. Yds',
    priceRange: 'PKR 70 Lacs – 85 Lacs',
    possession: 'Immediate (100% Ready)',
    category: 'Residential',
    status: 'High Demand — Built Homes'
  },
  {
    size: '10 Marla',
    dimensions: '35 × 70',
    sqYards: '272 Sq. Yds',
    priceRange: 'PKR 95 Lacs – 1.18 Crore',
    possession: 'Immediate (100% Ready)',
    category: 'Residential',
    status: 'VIP Park & Corner Plots'
  },
  {
    size: '14 Marla',
    dimensions: '40 × 80',
    sqYards: '356 Sq. Yds',
    priceRange: 'PKR 1.35 Cr – 1.65 Crore',
    possession: 'Immediate (100% Ready)',
    category: 'Residential',
    status: 'Executive Villa Plots'
  },
  {
    size: '1 Kanal',
    dimensions: '50 × 90',
    sqYards: '500 Sq. Yds',
    priceRange: 'PKR 1.85 Cr – 2.40 Crore',
    possession: 'Immediate (100% Ready)',
    category: 'Residential',
    status: 'Luxury Hillside Living'
  },
  {
    size: '2 Kanal',
    dimensions: '75 × 120',
    sqYards: '1000 Sq. Yds',
    priceRange: 'PKR 3.80 Cr – 4.75 Crore',
    possession: 'Immediate (100% Ready)',
    category: 'Residential',
    status: 'Signature Boulevard Estates'
  },
  {
    size: '4 Marla Commercial',
    dimensions: '30 × 30',
    sqYards: '100 Sq. Yds',
    priceRange: 'PKR 2.40 Cr – 3.20 Crore',
    possession: 'Immediate (Ground + 5)',
    category: 'Commercial',
    status: 'Active Retail & Banks'
  }
];

const defaultBlockASellingPlots = [
  {
    id: 'blocka-plot-5m-1',
    plotNumber: 'A-112',
    blockName: 'Block A',
    category: 'Residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    facing: 'Park Facing',
    priceFormatted: 'PKR 52.0 Lacs',
    downPayment: 'Full Cash / Possession',
    status: 'Immediate Possession',
    badge: 'Near Mosque',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    features: ['Adjacent to Grand Jamia Mosque', 'Carpeted 40ft Street', 'Gas & Electric Meter Ready']
  },
  {
    id: 'blocka-plot-8m-1',
    plotNumber: 'A-248',
    blockName: 'Block A',
    category: 'Residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    facing: 'Main Boulevard',
    priceFormatted: 'PKR 78.0 Lacs',
    downPayment: 'Full Cash / Possession',
    status: 'Ready to Build',
    badge: 'Main Road Frontage',
    image: '/images/faisalhillarc.jpg',
    features: ['Direct Entrance Road Link', 'Underground Utilities Live', 'Solid Ground Elevation']
  },
  {
    id: 'blocka-plot-10m-1',
    plotNumber: 'A-125',
    blockName: 'Block A',
    category: 'Residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    facing: 'Corner Plot',
    priceFormatted: 'PKR 1.08 Crore',
    downPayment: 'Full Cash / Possession',
    status: 'VIP Possession',
    badge: '12-Kanal Park Facing',
    image: '/images/faisal-park.jpg',
    features: ['Double Side Corner', 'Direct Park Panorama', 'Populated Street with Villas']
  },
  {
    id: 'blocka-plot-14m-1',
    plotNumber: 'A-310',
    blockName: 'Block A',
    category: 'Residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    facing: 'West Open',
    priceFormatted: 'PKR 1.48 Crore',
    downPayment: 'Full Cash / Possession',
    status: 'Executive Ready',
    badge: 'Wide Street',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    features: ['50ft Wide Boulevard Street', 'Ideal for Multi-Floor Villa', 'Immediate Allotment Transfer']
  },
  {
    id: 'blocka-plot-1k-1',
    plotNumber: 'A-042',
    blockName: 'Block A',
    category: 'Residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    facing: 'Margalla Hill View',
    priceFormatted: 'PKR 2.15 Crore',
    downPayment: 'Full Cash / Possession',
    status: 'Prime Possession',
    badge: 'Signature Location',
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg',
    features: ['Margalla Foothill Vista', 'Established Community Vibe', 'High Rental Demand Zone']
  },
  {
    id: 'blocka-plot-2k-1',
    plotNumber: 'A-008',
    blockName: 'Block A',
    category: 'Residential',
    size: '2 Kanal',
    dimensions: '75 × 120',
    facing: 'Grand Boulevard',
    priceFormatted: 'PKR 4.25 Crore',
    downPayment: 'Full Cash / Possession',
    status: 'Signature Estate',
    badge: 'Mansion Plot',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
    features: ['225ft Grand Boulevard Frontage', 'Unobstructed Panoramic Views', 'VIP Security Gate']
  },
  {
    id: 'blocka-plot-com-1',
    plotNumber: 'A-COM-04',
    blockName: 'Block A',
    category: 'Commercial',
    size: '4 Marla Plaza Plot',
    dimensions: '30 × 30',
    facing: 'Civic Core Center',
    priceFormatted: 'PKR 2.85 Crore',
    downPayment: 'Full Cash / Ready',
    status: 'High Rental Yield',
    badge: 'Plaza Plot',
    image: '/images/imgi_44_Executive-Block.webp',
    features: ['Ground + 5 Approval', 'High Footfall Market Area', 'Ideal for Bank / Mart / Clinic']
  },
  {
    id: 'blocka-plot-com-2',
    plotNumber: 'A-COM-12',
    blockName: 'Block A',
    category: 'Commercial',
    size: '5.33 Marla Plaza Plot',
    dimensions: '40 × 30',
    facing: 'Main Boulevard',
    priceFormatted: 'PKR 3.60 Crore',
    downPayment: 'Full Cash / Ready',
    status: 'Prime Frontage',
    badge: 'Commercial Hub',
    image: '/images/faisal-roots-school.jpg',
    features: ['225ft Boulevard Front', 'Corner Commercial Plot', 'Heavy Commuter Visibility']
  }
];

const blockAGalleryItems = [
  {
    id: 1,
    title: 'Block A Central Jamia Mosque & Minarets',
    category: 'amenities',
    tag: 'Grand Mosque',
    image: '/images/imgi_46_Mosques.webp',
    desc: 'The iconic air-conditioned Grand Jamia Mosque actively holding daily prayers and Friday congregations.'
  },
  {
    id: 2,
    title: 'Block A Built Family Homes & Thriving Living',
    category: 'infrastructure',
    tag: '500+ Resident Families',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    desc: 'Fully populated sector featuring finished modern houses, paved streetscapes, and operational utilities.'
  },
  {
    id: 3,
    title: 'Block A 12-Kanal Central Community Park',
    category: 'nature',
    tag: 'Recreational Greens',
    image: '/images/faisal-park.jpg',
    desc: 'Expansive family park with walking tracks, flowering landscaping, gazebos, and secure children play areas.'
  },
  {
    id: 4,
    title: 'Main Grand Entrance & Enayat Ullah Khan Avenue',
    category: 'infrastructure',
    tag: 'Direct GT Road Gate',
    image: '/images/faisalhillarc.jpg',
    desc: 'Direct entrance connection providing effortless 1-minute access to GT Road (N-5) and Taxila commercial spine.'
  },
  {
    id: 5,
    title: 'Operational Commercial Markets & Daily Conveniences',
    category: 'infrastructure',
    tag: 'Commercial Plazas',
    image: '/images/imgi_44_Executive-Block.webp',
    desc: 'Functional retail plazas hosting grocery marts, bakeries, pharmacies, banking branches, and cafes.'
  },
  {
    id: 6,
    title: 'Roots Millennium International School Campus',
    category: 'amenities',
    tag: 'Operational School',
    image: '/images/faisal-roots-school.jpg',
    desc: 'Premier educational institute operating actively with state-of-the-art academic and sports infrastructure.'
  },
  {
    id: 7,
    title: 'Sports Arena & Multi-Purpose Courts',
    category: 'amenities',
    tag: 'Sports Complex',
    image: '/images/imgi_48_sports-arena.webp',
    desc: 'Dedicated sporting grounds, football turf, tennis courts, and fitness jogging circuits.'
  },
  {
    id: 8,
    title: 'Healthcare Center & Emergency Clinic',
    category: 'amenities',
    tag: 'Medical Hub',
    image: '/images/imgi_49_Medical-xomplex.webp',
    desc: '24/7 medical consultation, pharmacy, and family healthcare facilities situated right inside the community.'
  }
];

const blockATravelTimes = [
  { destination: 'Faisal Hills Main Entrance Gate', time: '1 min', distance: '0.4 km', note: 'Direct access' },
  { destination: 'HITEC University Taxila', time: '4 mins', distance: '2.8 km', note: 'Via GT Road' },
  { destination: 'Taxila Museum & Heavy Mechanical Complex', time: '6 mins', distance: '4.5 km', note: 'Direct GT Road N-5' },
  { destination: 'Taxila M-1 Motorway Interchange', time: '9 mins', distance: '8.5 km', note: 'Direct Highway Link' },
  { destination: 'Tarnol Morr (Islamabad Entry)', time: '7 mins', distance: '6.2 km', note: 'Twin Cities Node' },
  { destination: 'New Islamabad International Airport', time: '22 mins', distance: '29 km', note: 'Via M-1 / Cargo Link' },
  { destination: 'Islamabad Zero Point / Blue Area', time: '30 mins', distance: '27 km', note: 'Via Margalla Ave / GT Road' }
];

const blockAFaqs = [
  {
    q: 'WHY IS BLOCK A CONSIDERED THE MOST DEVELOPED SECTOR IN FAISAL HILLS?',
    a: 'Block A is the pioneer sector of Faisal Hills, situated right next to the grand entrance gate. It is 100% on-ground delivered with completed family villas, active residents, the operational Grand Jamia Mosque, commercial markets, and immediate construction possession.'
  },
  {
    q: 'IS FAISAL HILLS BLOCK A FULLY RDA APPROVED?',
    a: 'Yes. Block A holds complete, unconditional NOC approval from the Rawalpindi Development Authority (RDA). All plots carry verified layout sanctions and can be legally transferred immediately with full documentation.'
  },
  {
    q: 'CAN I BEGIN CONSTRUCTION OF MY HOUSE IMMEDIATELY IN BLOCK A?',
    a: 'Yes! Block A offers immediate on-ground possession. Once you acquire a plot, you can submit your building plans to Zedem International, obtain rapid structural approval, and begin construction immediately.'
  },
  {
    q: 'WHAT UTILITIES ARE OPERATIONAL IN BLOCK A RIGHT NOW?',
    a: 'Block A has 100% active underground electricity, high-capacity water filtration plants, functional street lights, round-the-clock gated security with CCTV surveillance, and waste management services.'
  },
  {
    q: 'WHAT PLOT SIZES ARE AVAILABLE IN BLOCK A?',
    a: 'Block A offers 5 Marla (25×50), 8 Marla (30×60), 10 Marla (35×70), 14 Marla (40×80), 1 Kanal (50×90), and 2 Kanal (75×120) residential plots, alongside 4 Marla commercial plaza plots.'
  },
  {
    q: 'WHAT IS THE RENTAL DEMAND AND APPRECIATION POTENTIAL IN BLOCK A?',
    a: 'Because Block A is fully populated with schools, parks, and direct GT Road access, rental demand for built houses is extremely high. 5 Marla and 10 Marla villas yield consistent rental returns with strong annual capital gains.'
  }
];

export default function BlockAContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isMasterPlanExpanded, setIsMasterPlanExpanded] = useState(false);
  const [isDevStatusExpanded, setIsDevStatusExpanded] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'infrastructure' | 'nature' | 'amenities'>('all');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<typeof blockAGalleryItems[0] | null>(null);
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

  const defaultBlockAPlotImages = [
    '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    '/images/faisalhillarc.jpg',
    '/images/faisal-park.jpg',
    '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg',
    '/images/imgi_38_Faisal-Hills-site-home-page-header.webp',
    '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
    '/images/imgi_44_Executive-Block.webp',
    '/images/faisal-roots-school.jpg'
  ];

  const blockAPlots = useMemo(() => {
    // 1. Get all plots matching block-a from live API / store
    const liveBlockPlots = allPlots.filter(
      p => p.blockSlug === 'block-a' || p.blockName?.toLowerCase().includes('block a') || p.plotNumber?.toUpperCase().startsWith('A-')
    );

    // 2. Map and normalize live plots so they fit the card layout
    const liveMapped = liveBlockPlots.map((plot, idx) => ({
      id: plot.id,
      plotNumber: plot.plotNumber || `A-${idx + 100}`,
      blockName: plot.blockName || 'Block A',
      category: plot.category || 'Residential',
      size: plot.size,
      dimensions: plot.dimensions || '25 × 50',
      facing: plot.facing || 'Park Facing',
      priceFormatted: plot.priceFormatted || (plot.price ? `PKR ${(plot.price / 100000).toFixed(1)} Lacs` : 'Call for Price'),
      downPayment: (plot as any).downPayment || 'Full Cash / Possession',
      status: plot.status || 'Immediate Possession',
      badge: (plot as any).badge || (plot.facing?.toLowerCase().includes('park') ? 'Park Facing' : plot.category === 'Commercial' ? 'Commercial Plaza' : 'Prime Location'),
      image: plot.image || defaultBlockAPlotImages[idx % defaultBlockAPlotImages.length],
      features: plot.features && plot.features.length > 0 ? plot.features : ['100% Ready Possession', 'Underground Utilities', 'Immediate Construction']
    }));

    // 3. Combine with default fallback plots if not already present
    const combined: any[] = [...liveMapped];
    defaultBlockASellingPlots.forEach(defPlot => {
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

  const filteredGallery = blockAGalleryItems.filter(
    item => galleryFilter === 'all' || item.category === galleryFilter
  );

  return (
    <div className="space-y-12 lg:space-y-16">

      {/* ========================================================= */}
      {/* 1. ABOUT SECTOR A & STRATEGIC ADVANTAGE                  */}
      {/* ========================================================= */}
      <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & 3 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Civic Heart of Faisal Hills</span>
                </div>

                <TextReveal
                  as="h2"
                  text="Faisal Hills Block A — The Most Developed & Populated Residential Hub"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  Positioned directly adjacent to the Faisal Hills Grand Main Gate off GT Road, <strong>Block A</strong> stands as the flagship delivered sector of the society. Holding full <strong>RDA approval</strong>, this mature neighbourhood hosts hundreds of thriving family villas, the iconic <strong>Grand Jamia Mosque</strong>, a 12-Kanal central family park, and fully operational commercial markets.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <ScrollReveal direction="up" delay={100}>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 h-full">
                  <div className="flex items-center gap-2 text-[#7b002c] font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-[#7b002c] shrink-0" />
                    <span>Immediate Possession</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">100% on-ground land ready for immediate house construction and instant living.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={150}>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 h-full">
                  <div className="flex items-center gap-2 text-[#7b002c] font-bold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-[#7b002c] shrink-0" />
                    <span>Fully Operational Core</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">Grand Mosque, grocery marts, schools, water filtration, and underground electricity.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 h-full">
                  <div className="flex items-center gap-2 text-[#7b002c] font-bold text-xs uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 text-[#7b002c] shrink-0" />
                    <span>Proven Rental Yield</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">Consistently high rental occupancy with strong demand from professionals and families.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal direction="right" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between group">
                <img
                  src="/images/imgi_46_Mosques.webp"
                  alt="Block A Grand Jamia Mosque"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/30" />

                {/* Floating Top Badge */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#7b002c]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                    Grand Jamia Mosque • Block A
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-400/30">
                    Live Operational
                  </span>
                </div>

                {/* Bottom Highlight Overlay */}
                <div className="relative z-10 p-6 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                      Established Living with 500+ Resident Families
                    </h3>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. VERIFIED PRICING SCHEDULE MATRIX                       */}
      {/* ========================================================= */}
      <section id="pricing-matrix" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Market Price Index 2026</span>
              </div>
              <TextReveal
                as="h2"
                text="Faisal Hills Block A Plot Prices & Schedule"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                Verified on-ground price valuations for residential and commercial plots in Sector A with ready possession.
              </p>
            </div>

            <a
              href="https://wa.me/923044811717?text=Hi%2C%20I%20need%20the%20latest%20Block%20A%20plot%20price%20quotation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs font-bold transition shadow-sm self-start sm:self-auto"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Get Live Price Quote</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Pricing Table */}
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4 sm:p-5">Plot Category & Size</th>
                    <th className="p-4 sm:p-5">Dimensions</th>
                    <th className="p-4 sm:p-5">Area (Sq. Yds)</th>
                    <th className="p-4 sm:p-5">Current Price Range</th>
                    <th className="p-4 sm:p-5">Possession Status</th>
                    <th className="p-4 sm:p-5 text-right">Inquiry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {blockAPriceSchedule.map((row, idx) => (
                    <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#7b002c]" />
                        <span>{row.size}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          row.category === 'Commercial' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {row.category}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600 font-mono">{row.dimensions}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{row.sqYards}</td>
                      <td className="p-4 sm:p-5 font-serif font-bold text-[#7b002c]">{row.priceRange}</td>
                      <td className="p-4 sm:p-5">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {row.possession}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 text-right">
                        <a
                          href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20Block%20A%20${encodeURIComponent(row.size)}%20plot.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-[#7b002c] hover:text-white rounded-lg text-xs font-bold transition-all"
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
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 4. DYNAMIC PLOT SERIES EXPLORER                          */}
      {/* ========================================================= */}
      <section id="series-explorer" className="scroll-mt-28">
        <DynamicPlotSeriesExplorer blockSlug="block-a" blockName="Block A" />
      </section>

      {/* ========================================================= */}
      {/* 5. LOCATION & CONNECTIVITY MATRIX                         */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Direct Gate Connectivity</span>
            </div>
            <TextReveal
              as="h2"
              text="Strategic Accessibility & Commute Distances"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              Block A benefits from the most privileged entrance position in Faisal Hills, eliminating society internal traffic delays.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blockATravelTimes.map((dest, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 40}>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-rose-300 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-slate-900">{dest.destination}</h4>
                  <span className="text-xs font-bold text-[#7b002c] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    {dest.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Distance: <strong>{dest.distance}</strong></span>
                  <span className="italic">{dest.note}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. ON-GROUND FACILITIES & AMENITIES GALLERY               */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Trees className="w-3.5 h-3.5" />
                <span>On-Ground Infrastructure</span>
              </div>
              <TextReveal
                as="h2"
                text="Live Amenities & Community Landmarks in Sector A"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                Experience real delivered infrastructure: active Grand Jamia Mosque, family parks, paved boulevards, and commercial plazas.
              </p>
            </div>

            {/* Gallery Category Filter */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
              {(['all', 'infrastructure', 'nature', 'amenities'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    galleryFilter === cat
                      ? 'bg-[#7b002c] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 60}>
              <div
                onClick={() => setSelectedGalleryImage(item)}
                className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 bg-slate-950 flex flex-col justify-end min-h-[300px] cursor-pointer transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="relative z-10 p-6 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                    {item.tag}
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. VERIFIED AVAILABLE PLOTS FOR SALE (SELLING PLOT SECTION)*/}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>Verified Available Listings</span>
              </div>
              <TextReveal
                as="h2"
                text="Faisal Hills Block A Plots for Sale & Resale Desk"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                Browse verified on-ground possession plots and commercial plots in Sector A ready for immediate construction and transfer.
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
                All ({blockAPlots.length})
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
          {blockAPlots
            .filter(plot => plotCategoryFilter === 'all' || plot.category.toLowerCase() === plotCategoryFilter)
            .map((plot, idx) => (
              <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 80}>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                  <div>
                    {/* Plot Image Container -> Links to /plots filtered */}
                    <Link
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-a`}
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
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-a`}
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
                          <span className="text-slate-500 font-medium">Possession:</span>
                          <span className="text-emerald-700 font-bold">100% Ready</span>
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
                      <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Demand Price</span>
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
                        href={`https://wa.me/923044811717?text=${encodeURIComponent(`Hi, I am interested in Block A Plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share details.`)}`}
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

        {/* Sell Your Block A Plot Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-[#4a081a] to-slate-950 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Resale & Liquidation Desk</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Want to Sell or Rent Out Your Block A Property?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Connect with genuine cash buyers and qualified tenants for immediate plot liquidation or villa renting in Sector A.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://wa.me/923044811717?text=Hi%2C%20I%20want%20to%20sell%2Frent%20my%20property%20in%20Faisal%20Hills%20Block%20A."
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
              <span>Call Direct Line</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. COMPARE OTHER SECTORS & EXPANDING PANORAMIC CARDS     */}
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
              text="Explore Other Faisal Hills Blocks & Landmarks"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              Hover across the sector columns to view each block's location advantages, development progress, and direct links:
            </p>
          </div>
        </ScrollReveal>

        {/* Panoramic Expanding Cards Showcase */}
        <ScrollReveal direction="up" delay={100}>
          <ExpandingProjectsShowcase
            items={defaultFaisalHillsBlocks}
            defaultActiveIndex={1}
            containerHeightClass="h-[460px] sm:h-[500px] lg:h-[540px]"
            roundedClass="rounded-2xl sm:rounded-3xl"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 9. MASTER PLAN SECTION                                   */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col">
            <ScrollReveal direction="left" delay={50}>
              <div
                onClick={() => setIsMapModalOpen(true)}
                className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-950 group shadow-lg cursor-pointer flex flex-col justify-center min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] p-2"
              >
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
                  <img
                    src="/images/faisal-hills-master-plan-map.jpg"
                    alt="Faisal Hills Block A Master Plan Layout"
                    className="w-full h-auto max-h-[420px] object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    🔍 Click to Enlarge Map
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30">
                    HD Resolution
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right" delay={50}>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Sector Geography</span>
                </div>
                <TextReveal
                  as="h2"
                  text="Faisal Hills Block A Master Plan & Sector Layout"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />
                <p className="text-slate-600 text-sm leading-relaxed font-sans">
                  The master plan of Block A features wide 40ft internal streets connected seamlessly to 150ft and 225ft Grand Boulevards. Dedicated civic zones, park belts, and commercial squares are strategically distributed to ensure zero congestion.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-xs text-slate-400 font-bold uppercase block">Street Hierarchy</span>
                  <span className="font-serif font-bold text-sm text-slate-900">40ft to 225ft Roads</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-xs text-slate-400 font-bold uppercase block">Central Park</span>
                  <span className="font-serif font-bold text-sm text-slate-900">12-Kanal Green Belt</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Download High-Res PDF Map</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. SECTOR A VERIFIED BENCHMARKS & STATS HIGHLIGHT         */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl p-7 sm:p-10 lg:p-12 border border-slate-200 shadow-sm relative space-y-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7b002c]" />
                <span>Sector A Verified Milestones</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                Key Development & Living Benchmarks
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Official verified on-ground possession status, community occupancy, and regulatory approvals for Faisal Hills Block A.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% On-Ground Reality</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                label: 'Possession Status',
                end: 100,
                suffix: '%',
                unitText: ' Ready',
                sub: 'Immediate Home Construction Allowed',
                icon: ShieldCheck,
                iconStyle: 'bg-emerald-50 border-emerald-200 text-emerald-700'
              },
              {
                label: 'Resident Families',
                end: 500,
                suffix: '+',
                unitText: ' Homes',
                sub: 'Active Populated Family Community',
                icon: Home,
                iconStyle: 'bg-rose-50 border-rose-200 text-[#7b002c]'
              },
              {
                label: 'RDA Legal NOC',
                end: 100,
                suffix: '%',
                unitText: ' Sanctioned',
                sub: 'Full Regulatory Clearance & Transfer',
                icon: Award,
                iconStyle: 'bg-blue-50 border-blue-200 text-blue-700'
              },
              {
                label: 'Entrance Link',
                end: 1,
                suffix: '',
                unitText: ' Min',
                sub: 'Direct GT Road N-5 Main Gate Access',
                icon: MapPin,
                iconStyle: 'bg-amber-50 border-amber-200 text-amber-700'
              }
            ].map((stat, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 60}>
                <div className="bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-5 sm:p-6 transition-all duration-300 group hover:-translate-y-1 shadow-2xs hover:shadow-md h-full flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {stat.label}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.iconStyle} shadow-2xs`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <div className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight flex items-baseline gap-1">
                      <CountUpNumber end={stat.end} suffix={stat.suffix} duration={1800} />
                      <span className="text-sm font-sans font-semibold text-[#7b002c]">{stat.unitText}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-sans mt-1.5 leading-snug">{stat.sub}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (OPEN THEME STYLE)         */}
      {/* ========================================================= */}
      <section className="py-12 lg:py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">

          {/* Left Column: Sticky FAQ'S Title */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-24 self-start">
            <span className="label-caps text-[#7b002c] font-bold block mb-1 text-xs uppercase tracking-widest">FAQ&apos;S</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#7b002c] tracking-tight leading-[1.15] uppercase">
              Frequently Asked Questions (FAQS)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-1">
              Detailed answers on possession status, NOC clearance, utilities, and plot transfer for Faisal Hills Block A.
            </p>
          </div>

          {/* Right Column: Clean Horizontal Separated Accordion */}
          <div className="lg:col-span-8 space-y-0 border-t border-slate-900/80">
            {blockAFaqs.map((faq, index) => {
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
      {/* 11. LEAD INQUIRY & BOOKING DESK CTA                      */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-[#7b002c] via-[#5c0021] to-[#3a0014] text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Official Sales Facilitation
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
            Schedule a Site Visit or Request Verified Block A File
          </h2>
          <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-sans">
            Our authorized representatives guide you through transparent on-ground site visits, plot verification, and immediate file transfer at Zedem International head office.
          </p>
        </div>

        <form onSubmit={handleInquirySubmit} className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            required
            placeholder="Your Full Name"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            className="p-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-rose-200/70 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="tel"
            required
            placeholder="WhatsApp / Phone Number"
            value={leadPhone}
            onChange={(e) => setLeadPhone(e.target.value)}
            className="p-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-rose-200/70 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="submit"
            className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{submitted ? 'Inquiry Sent ✓' : 'Submit Consultation Request'}</span>
          </button>
        </form>
      </section>

      {/* Map Download Modal */}
      {isMapModalOpen && (
        <MapDownloadModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          blockName="Faisal Hills Block A"
          mapImageUrl="/images/faisal-hills-master-plan-map.jpg"
        />
      )}
    </div>
  );
}
