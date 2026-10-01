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
  ChevronRight,
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
  Percent,
  Maximize2,
  ArrowRight,
  Home,
  Tag,
  Filter,
  DollarSign,
  TrendingUp,
  X,
  AlertTriangle,
  Info,
  Scale
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
  // 4 Residential Plots
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
    image: '/images/faisal-hills-drone-view.webp',
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
    image: '/images/faisal-hills-arc-gate.webp',
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
    image: '/images/faisal-hills-glow-park.webp',
    features: ['Double Side Corner', 'Direct Park Panorama', 'Populated Street with Villas']
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
    image: '/images/faisal-hills-aerial-panoramic.webp',
    features: ['Margalla Foothill Vista', 'Established Community Vibe', 'High Rental Demand Zone']
  },

  // 4 Commercial Plots
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
    image: '/images/faisal-hills-executive-sector.webp',
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
    image: '/images/roots-international-school-faisal-hills.webp',
    features: ['225ft Boulevard Front', 'Corner Commercial Plot', 'Heavy Commuter Visibility']
  },
  {
    id: 'blocka-plot-com-3',
    plotNumber: 'A-COM-18',
    blockName: 'Block A',
    category: 'Commercial',
    size: '8 Marla Plaza Plot',
    dimensions: '40 × 45',
    facing: 'Main Market Square',
    priceFormatted: 'PKR 5.20 Crore',
    downPayment: 'Full Cash / Ready',
    status: 'High Capital Gain',
    badge: 'Commercial Plaza',
    image: '/images/hills-walk-commercial-aerial.webp',
    features: ['Approved Multi-Storey Retail', 'Dedicated Customer Parking', 'Direct Quaid Ave Access']
  },
  {
    id: 'blocka-plot-com-4',
    plotNumber: 'A-COM-24',
    blockName: 'Block A',
    category: 'Commercial',
    size: '10 Marla Plaza Plot',
    dimensions: '50 × 45',
    facing: 'Grand Commercial Hub',
    priceFormatted: 'PKR 6.80 Crore',
    downPayment: 'Full Cash / Ready',
    status: 'Corporate Plaza',
    badge: 'Corner Plaza Plot',
    image: '/images/faisal-hills-arc-gate.webp',
    features: ['3-Side Open Boulevard Corner', 'Corporate Office Hub Ready', 'Massive Daily Footfall']
  }
];

const blockAGalleryItems = [
  {
    id: 1,
    title: 'Block A Central Jamia Mosque & Minarets',
    category: 'amenities',
    tag: 'Grand Mosque',
    image: '/images/faisal-hills-jamia-mosque.webp',
    desc: 'The iconic air-conditioned Grand Jamia Mosque actively holding daily prayers and Friday congregations.'
  },
  {
    id: 2,
    title: 'Block A Built Family Homes & Thriving Living',
    category: 'infrastructure',
    tag: '500+ Resident Families',
    image: '/images/faisal-hills-drone-view.webp',
    desc: 'Fully populated sector featuring finished modern houses, paved streetscapes, and operational utilities.'
  },
  {
    id: 3,
    title: 'Block A 12-Kanal Central Community Park',
    category: 'nature',
    tag: 'Recreational Greens',
    image: '/images/faisal-hills-glow-park.webp',
    desc: 'Expansive family park with walking tracks, flowering landscaping, gazebos, and secure children play areas.'
  },
  {
    id: 4,
    title: 'Main Grand Entrance & Enayat Ullah Khan Avenue',
    category: 'infrastructure',
    tag: 'Direct GT Road Gate',
    image: '/images/faisal-hills-arc-gate.webp',
    desc: 'Direct entrance connection providing effortless 1-minute access to GT Road (N-5) and Taxila commercial spine.'
  },
  {
    id: 5,
    title: 'Operational Commercial Markets & Daily Conveniences',
    category: 'infrastructure',
    tag: 'Commercial Plazas',
    image: '/images/faisal-hills-executive-sector.webp',
    desc: 'Functional retail plazas hosting grocery marts, bakeries, pharmacies, banking branches, and cafes.'
  },
  {
    id: 6,
    title: 'Roots Millennium International School Campus',
    category: 'amenities',
    tag: 'Operational School',
    image: '/images/roots-international-school-faisal-hills.webp',
    desc: 'Premier educational institute operating actively with state-of-the-art academic and sports infrastructure.'
  },
  {
    id: 7,
    title: 'Sports Arena & Multi-Purpose Courts',
    category: 'amenities',
    tag: 'Sports Complex',
    image: '/images/faisal-hills-sports-arena.webp',
    desc: 'Dedicated sporting grounds, football turf, tennis courts, and fitness jogging circuits.'
  },
  {
    id: 8,
    title: 'Healthcare Center & Emergency Clinic',
    category: 'amenities',
    tag: 'Medical Hub',
    image: '/images/faisal-hills-medical-complex.webp',
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
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const [isMasterPlanExpanded, setIsMasterPlanExpanded] = useState(false);
  const [isDevStatusExpanded, setIsDevStatusExpanded] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'infrastructure' | 'nature' | 'amenities'>('all');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<typeof blockAGalleryItems[0] | null>(null);
  const [plotCategoryFilter, setPlotCategoryFilter] = useState<'all' | 'residential' | 'commercial'>('residential');

  // Dynamic live plot inventory sync from Laravel Backend Dashboard / LocalStorage / API
  const [allPlots, setAllPlots] = useState<PlotItem[]>([]);

  useEffect(() => {
    fetchPlots().then(data => setAllPlots(data)).catch(console.error);

    const handleSync = () => {
      fetchPlots().then(data => setAllPlots(data)).catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handleSync);
    return () => window.removeEventListener('faisal_plots_updated', handleSync);
  }, []);

  // Amenities Auto-Scroll Carousel State (1 second interval)
  const amenitiesScrollRef = useRef<HTMLDivElement>(null);
  const [isAmenitiesHovered, setIsAmenitiesHovered] = useState(false);

  useEffect(() => {
    if (isAmenitiesHovered) return;
    const interval = setInterval(() => {
      if (amenitiesScrollRef.current) {
        const container = amenitiesScrollRef.current;
        const itemWidth = container.firstElementChild?.clientWidth || 280;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 15) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: itemWidth + 16, behavior: 'smooth' });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAmenitiesHovered, galleryFilter]);

  const handleScrollAmenities = (direction: 'left' | 'right') => {
    if (amenitiesScrollRef.current) {
      const container = amenitiesScrollRef.current;
      const itemWidth = container.firstElementChild?.clientWidth || 280;
      container.scrollBy({
        left: direction === 'left' ? -(itemWidth + 16) : (itemWidth + 16),
        behavior: 'smooth'
      });
    }
  };

  const defaultBlockAPlotImages = [
    '/images/faisal-hills-drone-view.webp',
    '/images/faisal-hills-arc-gate.webp',
    '/images/faisal-hills-glow-park.webp',
    '/images/faisal-hills-aerial-panoramic.webp',
    '/images/faisal-hills-site-header.webp',
    '/images/hills-walk-commercial-aerial.webp',
    '/images/faisal-hills-executive-sector.webp',
    '/images/roots-international-school-faisal-hills.webp'
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
      priceFormatted: plot.priceFormatted || (plot.price ? formatPlotPrice(plot.price) : 'Contact for Price'),
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

    return combined;
  }, [allPlots]);

  const dynamicPriceSchedule = useMemo(() => {
    const blockPlots = allPlots.filter(p => p.blockSlug === 'block-a');
    if (blockPlots.length === 0) return blockAPriceSchedule;

    return blockPlots.map(plot => {
      let priceText = 'Contact for Price';
      if (plot.price && plot.price > 0) {
        priceText = formatPlotPrice(plot.price, plot.priceFormatted);
      }
      return {
        size: plot.size,
        dimensions: plot.dimensions || '25 × 50',
        sqYards: plot.size.includes('5 Marla') ? '139 Sq. Yds' :
                 plot.size.includes('8 Marla') ? '200 Sq. Yds' :
                 plot.size.includes('10 Marla') ? '272 Sq. Yds' :
                 plot.size.includes('14 Marla') ? '356 Sq. Yds' :
                 plot.size.includes('1 Kanal') ? '500 Sq. Yds' :
                 plot.size.includes('2 Kanal') ? '1000 Sq. Yds' : 'Standard Area',
        priceRange: priceText,
        possession: 'Immediate (100% Ready)',
        category: plot.propertyType || plot.category || 'Residential',
        status: plot.status || 'Ready for Construction'
      };
    });
  }, [allPlots]);

  const displayedPlots = useMemo(() => {
    if (plotCategoryFilter === 'residential') {
      return blockAPlots.filter(p => p.category.toLowerCase() === 'residential').slice(0, 4);
    }
    if (plotCategoryFilter === 'commercial') {
      return blockAPlots.filter(p => p.category.toLowerCase() === 'commercial').slice(0, 4);
    }
    return blockAPlots.slice(0, 8);
  }, [blockAPlots, plotCategoryFilter]);

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

  const [activeLandmarkIndex, setActiveLandmarkIndex] = useState<number | null>(null);

  const otherBlocks = useMemo(() => {
    return defaultFaisalHillsBlocks.filter(
      item => item.id !== 'block-a' && !item.title.toLowerCase().includes('block a')
    );
  }, []);

  const filteredGallery = blockAGalleryItems.filter(
    item => galleryFilter === 'all' || item.category === galleryFilter
  );

  return (
    <div className="space-y-12 lg:space-y-16 pt-2 font-sans text-slate-800">

      {/* ========================================================= */}
      {/* 1. SECTOR A OVERVIEW & QUICK SPECS SUMMARY                */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        
        {/* Page Byline / Verification Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Verified Block Guide</span>
          </div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-3">
            <span>Reviewed & Verified</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">100% On-Ground Possession</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h1"
                  text="Faisal Hills Block A: Plot Prices, Possession and Plots for Sale"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    <strong>Block A</strong> is the largest established residential block in Faisal Hills, positioned between Block B and the Executive Block, reached directly from the GT Road (N-5) entrance along the main boulevard. Roads are carpeted, utilities are fully operational, and hundreds of families already live here—so buyers can build immediately rather than wait.
                  </p>

                  <p>
                    It is also the society's most actively traded block. Developer inventory is reported to be exhausted, so almost every purchase here is a resale transfer settled in full rather than a fresh booking instalment plan.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 w-full flex flex-col justify-between space-y-4">
            <ScrollReveal direction="right" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950 min-h-[360px] sm:min-h-[420px] flex flex-col justify-between group">
                <img
                  src="/images/faisal-hills-jamia-mosque.webp"
                  alt="Block A Grand Jamia Mosque and Resident Community"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/30" />

                {/* Floating Top Badge */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#7b002c]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                    Grand Jamia Mosque • Block A
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-400/30">
                    Live & Populated
                  </span>
                </div>

                {/* Bottom Highlight Overlay */}
                <div className="relative z-10 p-6 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-white drop-shadow-md">
                      Established Living with 500+ Resident Families
                    </h3>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      Carpeted streets, underground utilities, operational schools, and full ready possession.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Contact CTA */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-700">
                <strong className="text-slate-900 block font-bold">Ask for Verified Available Plots & Rates</strong>
                <span>Instant inquiry via WhatsApp or Direct Call</span>
              </div>
              <a
                href="https://wa.me/923331113177?text=Hi%2C%20I%20want%20to%20ask%20for%20verified%20available%20plots%20and%20today%27s%20rate%20in%20Block%20A."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-xl shrink-0 transition-colors shadow-xs"
              >
                Inquire Rates
              </a>
            </div>
          </div>
        </div>
        
      </section>

      {/* ========================================================= */}
      {/* 2. STRATEGIC LOCATION & CONNECTIVITY                      */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h2"
                  text="Where Block A Is: Strategic Access & Location"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />
                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    Block A  sits between Block B and the Executive Block, off the society's main boulevard. Because it borders the Executive Block, the school, mosque and commercial area near the main GT Road entrance are just a short drive away.
                  </p>
                  <p>
                    Faisal Hills is marketed as an Islamabad address. The society itself lies in Rawalpindi District near Taxila, under the regulatory jurisdiction of the Rawalpindi Development Authority (RDA).
                  </p>
                  
                  <div className="pt-2">
                    <strong className="text-slate-900 font-bold block mb-2 text-xs uppercase tracking-wider">Key Connecting Corridors from Block A:</strong>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      {['Islamabad via Margalla Avenue', 'Islamabad via Srinagar Highway', 'Sector B-17 (Multi Gardens)', 'Taxila Cantt', 'M-1 Motorway', 'New Islamabad International Airport'].map((route, rIdx) => (
                        <span key={rIdx} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
                          📍 {route}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 pt-2 italic border-l-2 border-[#7b002c] pl-3">
                    <strong>Measured Drive Times Policy:</strong> Published drive times for this block range from 5 minutes to 45 minutes depending on online sources. We publish measured times based on our team driving the route with exact distance and time of day.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative w-full h-[320px] sm:h-[360px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <iframe
                title="Faisal Hills Block A Exact Location Google Map"
                src="https://maps.google.com/maps?q=Faisal+Hills+Block+A+GT+Road+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            <div className="text-[11px] text-slate-500 font-medium text-center">
              <span>Nearby: HITEC University, UET Taxila, Taxila Museum, Wah Cantt, Faisal Margalla City</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. NEARBY LANDMARKS & COMMUTE DISTANCES                   */}
      {/* ========================================================= */}
      <section id="nearby-landmarks" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-5 sm:space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <TextReveal
              as="h2"
              text="Nearby Landmarks & Measured Commute Times"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Verified drive times and connectivity distances measured from Sector A main boulevard:
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop & Tablet View: Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
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
      {/* 4. BLOCK A MAP & MASTER PLAN                              */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2">
            <TextReveal
              as="h2"
              text="Block A Map and Master Plan Layout"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
              Laid out around the main boulevard with residential streets behind it and commercial plots on wider roads. Always check plot position, facing and street width before committing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsMapModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#7b002c] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#9e1245] shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Master Map PDF</span>
          </button>
        </div>

        <ScrollReveal direction="up" delay={100}>
          <div
            onClick={() => setIsMapModalOpen(true)}
            className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-950 group shadow-lg cursor-pointer flex flex-col justify-center min-h-[300px] sm:min-h-[440px] p-2 sm:p-4"
          >
            <img
              src="/images/faisal-hills-master-plan-map.webp"
              alt="Faisal Hills Block A Master Plan Layout Blueprint"
              className="w-full h-auto max-h-[520px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="px-4 py-2 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-md flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-[#7b002c]" />
                <span>Click to Enlarge & Download High-Res Map</span>
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed font-medium">
          <span className="font-bold text-slate-900">Road Width Specifications: </span>
          Main boulevard is planned at 225-foot width, with main sector roads running 110–120 feet, and residential streets built between 40 to 60 feet wide.
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PLOT SIZES IN BLOCK A & MARLA CALCULATION GUIDE        */}
      {/* ========================================================= */}
      <section id="plot-sizes" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <TextReveal
              as="h2"
              text="Plot Sizes in Block A: Dimensions & Marla Calculations"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl">
              Official plot dimensions, total square footage, square yard conversions, and market classifications:
            </p>
          </div>
        </ScrollReveal>

        {/* Plot Sizes Specs Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Dimensions (ft)</th>
                <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Area (sq ft)</th>
                <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Area (sq yds)</th>
                <th className="p-3.5 sm:p-4 font-bold text-amber-300">Sold & Marketed As</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-medium">
              {[
                { dim: '25 × 50', sqft: '1,250', sqyds: '139', sold: '5 Marla' },
                { dim: '30 × 60', sqft: '1,800', sqyds: '200', sold: '8 Marla' },
                { dim: '35 × 70', sqft: '2,450', sqyds: '272', sold: '10 Marla' },
                { dim: '40 × 80', sqft: '3,200', sqyds: '356', sold: '14 Marla' },
                { dim: '50 × 90', sqft: '4,500', sqyds: '500', sold: '1 Kanal' },
                { dim: '75 × 120', sqft: '9,000', sqyds: '1,000', sold: '2 Kanal' },
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-200">{row.dim}</td>
                  <td className="p-3.5 sm:p-4 text-slate-700 font-mono border-r border-slate-200">{row.sqft}</td>
                  <td className="p-3.5 sm:p-4 text-slate-700 font-mono border-r border-slate-200">{row.sqyds}</td>
                  <td className="p-3.5 sm:p-4 font-bold text-[#7b002c]">{row.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Non-Standard Sizes & Marla Calculation Guide Box */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Understanding Non-Standard Plot Sizes & Marla Standards</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            Block A listings regularly include 6 Marla plots (30 × 50 ft), along with 5.5 Marla, 10.9 Marla and 1.2 Kanal descriptions. Some are genuinely non-standard plots; others are standard plots measured with a different Marla size, since Faisal Hills official schedules use a <strong>225 sq ft Marla</strong> while many property portal listings use 250 sq ft.
          </p>
          <div className="p-3 rounded-xl bg-white border border-amber-200/80 text-xs text-slate-800 font-semibold">
            💡 <strong>Buyer Tip:</strong> Always compare offers by dimensions and total square feet, not by the Marla figure in the headline. A plot advertised as 10 Marla may measure 2,250 or 2,450 square feet.
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. BLOCK A PLOT PRICES & PER-SQUARE-FOOT ANALYSIS         */}
      {/* ========================================================= */}
      <section id="pricing-matrix" className="scroll-mt-28 space-y-8">
        
        {/* Table 1: Published Range vs Recent Asking Prices */}
        <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <TextReveal
                  as="h2"
                  text="Block A Plot Prices: Asking Prices & Market Bands"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
                  Two sets of figures circulate in the market: published historical bands and active asking prices advertised by sellers.
                </p>
              </div>

              <a
                href="https://wa.me/923331113177?text=Hi%2C%20I%20need%20the%20latest%20Block%20A%20plot%20price%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs font-bold transition shadow-sm shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Get Live Price Quote</span>
              </a>
            </div>
          </ScrollReveal>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Plot Size</th>
                  <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800 text-amber-300">Published Market Range</th>
                  <th className="p-3.5 sm:p-4 font-bold text-emerald-300">Recent Asking Prices (Resale)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {[
                  { size: '5 Marla', range: 'PKR 55 to 70 lakh', asking: 'PKR 55 to 95 lakh (most 72 to 85 lakh)' },
                  { size: '8 Marla', range: 'PKR 75 lakh to 1.25 crore', asking: 'Around PKR 1.22 crore (Margalla-facing)' },
                  { size: '10 Marla', range: 'PKR 95 lakh to 1.4 crore', asking: 'PKR 1.35 to 1.65 crore' },
                  { size: '14 Marla', range: 'PKR 1.2 to 1.7 crore', asking: 'Rates on request (Sample limited)' },
                  { size: '1 Kanal', range: 'PKR 1.45 to 2.25 crore', asking: 'Rates on request (Sample limited)' },
                  { size: '2 Kanal', range: 'PKR 2.7 to 3.5 crore', asking: 'PKR 3.1 to 3.2 crore (Signature Value)' },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-200">{row.size}</td>
                    <td className="p-3.5 sm:p-4 text-slate-700 border-r border-slate-200">{row.range}</td>
                    <td className="p-3.5 sm:p-4 font-serif font-bold text-[#7b002c]">{row.asking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            Corner, main double road (MDR), park-facing and Margalla-facing plots sell above standard plots in the same street. Treat unusually low quotes (e.g. 30–45 lakh for 5M) with caution as they often refer to outdated launch rates.
          </p>
        </div>

        {/* Table 2: Larger Plots Cost Less Per Square Foot */}
        <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              Larger Plots Cost Less Per Square Foot (Rate Analysis)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
              Converting asking prices to a rate per square foot shows a consistent, verifiable land value pattern across Sector A:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Plot Category / Size</th>
                  <th className="p-3.5 sm:p-4 font-bold text-amber-300">Approx. Rate Per Sq. Ft.</th>
                  <th className="p-3.5 sm:p-4 font-bold text-emerald-300">Value Efficiency Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                <tr className="even:bg-slate-50/60">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-200">5 Marla</td>
                  <td className="p-3.5 sm:p-4 font-bold text-[#7b002c] border-r border-slate-200">PKR 4,400 to 7,600 / sq ft</td>
                  <td className="p-3.5 sm:p-4 text-slate-700">Highest entry demand & liquidity premium</td>
                </tr>
                <tr className="even:bg-slate-50/60">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-200">8 to 10 Marla</td>
                  <td className="p-3.5 sm:p-4 font-bold text-[#7b002c] border-r border-slate-200">PKR 5,500 to 6,800 / sq ft</td>
                  <td className="p-3.5 sm:p-4 text-slate-700">Balanced family villa option</td>
                </tr>
                <tr className="even:bg-slate-50/60">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-200">1.2 Kanal</td>
                  <td className="p-3.5 sm:p-4 font-bold text-[#7b002c] border-r border-slate-200">Around PKR 5,200 / sq ft</td>
                  <td className="p-3.5 sm:p-4 text-slate-700">Executive land size</td>
                </tr>
                <tr className="even:bg-slate-50/60">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-200">2 Kanal</td>
                  <td className="p-3.5 sm:p-4 font-bold text-emerald-700 border-r border-slate-200">Around PKR 3,500 / sq ft</td>
                  <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">Best value per sq ft in the block (~50% lower rate)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-slate-700 leading-relaxed font-medium">
            💡 <strong>Land Value Takeaway:</strong> A 2 Kanal plot works out at roughly half the rate per square foot of a typical 5 Marla plot. If your budget reaches a larger plot, you buy considerably more land per rupee. Smaller plots carry the premium because demand for them is deeper and they resell faster.
          </div>
        </div>

        {/* Files vs Possession Plots Explanation */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 shadow-md">
          <h4 className="font-serif font-bold text-base text-amber-300">Files versus Possession Plots in Block A</h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            A file is a booking whose instalments may still be running. A possession plot has been handed over and can be built on immediately. Possession plots trade at a premium over files in the same block and street. Block A listings usually state <strong>"possession"</strong>, <strong>"NDC open"</strong> or <strong>"all dues clear"</strong>, and those status terms move the price significantly.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. SPECIAL PROPERTY TYPES: 2 KANAL, COMMERCIAL & APARTMENTS */}
      {/* ========================================================= */}
      <section id="special-properties" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>Signature Opportunities</span>
            </div>
            <TextReveal
              as="h2"
              text="2 Kanal Plots, Commercials & Apartments in Block A"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 2 Kanal Plots */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full inline-block">
                Exclusive Estate
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">2 Kanal Plots in Block A</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Block A is one of only two blocks in Faisal Hills offering 2 Kanal plots (75 × 120 ft). They suit buyers building a large custom mansion rather than quick resales, offering the best rate per sq. ft. in the sector (~PKR 3,500/sq ft).
              </p>
            </div>
          </div>

          {/* Commercial Plots */}
          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block">
                Commercial Hub
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">Commercial Plots (9.6M – 2 Kanal)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Commercial plots run from 9.6 Marla up to 2 Kanal. Boulevard-facing commercial plots (~2.1 Kanal) have been listed around PKR 26 crore (~PKR 27,500/sq ft), roughly 4–5 times the residential land rate.
              </p>
            </div>
          </div>

          {/* Apartments in Block A */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                Finished Living
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">Apartments: ZN Tower 1 & Serene Hills</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mixed-use projects like <strong>ZN Tower 1</strong> (Block A Markaz, 1-3 bed apartments & shops) and <strong>Serene Hills</strong> offer finished units from ~PKR 13,000/sq ft.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. VERIFIED AVAILABLE PLOTS FOR SALE                      */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
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
                className={`hidden sm:inline-block px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  plotCategoryFilter === 'all'
                    ? 'bg-[#7b002c] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All (8)
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

        {/* Plot Cards Grid (2 in line on mobile, 4 in line on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {displayedPlots.map((plot, idx) => (
            <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 80}>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                  <div>
                    {/* Plot Image Container -> Links to /plots filtered */}
                    <Link
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-a`}
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
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-a`}
                      className="p-2.5 sm:p-5 space-y-2 sm:space-y-3.5 block cursor-pointer hover:bg-slate-50/60 transition-colors"
                    >
                      <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-slate-600">
                        <div className="flex justify-between items-center pb-1 sm:pb-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Plot Size:</span>
                          <span className="text-slate-900 font-bold group-hover:text-[#7b002c] transition-colors">{plot.size}</span>
                        </div>
                        <div className="flex justify-between items-center pb-1 sm:pb-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Dimensions:</span>
                          <strong className="text-slate-900 font-semibold">{plot.dimensions}</strong>
                        </div>
                        <div className="hidden sm:flex justify-between items-center pb-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Orientation:</span>
                          <strong className="text-slate-900 font-semibold">{plot.facing}</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Possession:</span>
                          <span className="text-emerald-700 font-bold text-[9px] sm:text-xs">100% Ready</span>
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
                  <div className="p-2.5 sm:p-4 pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[8px] sm:text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Demand</span>
                      <span className="font-serif font-bold text-xs sm:text-base text-[#7b002c]">{plot.priceFormatted}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <Link
                        href={`/plots/${plot.id}`}
                        className="px-1.5 sm:px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-0.5 sm:gap-1 text-center"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>

                      <a
                        href={`https://wa.me/923331113177?text=${encodeURIComponent(`Hi, I am interested in Block A Plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-1.5 sm:px-2 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[10px] sm:text-[11px] font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-0.5 sm:gap-1 shadow-sm text-center"
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
      </section>

      {/* ========================================================= */}
      {/* 9. WHO BLOCK A SUITS & WHAT TO WEIGH                      */}
      {/* ========================================================= */}
      <section id="who-suits" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Buyer Evaluation</span>
            </div>
            <TextReveal
              as="h2"
              text="Who Block A Suits, and What to Weigh First"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Block A suits families who want to build immediately in a finished block, buyers seeking larger plots at the best rate per sq. ft., and investors who value deep resale inventory (~400 active listings).
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pros Column */}
          <div className="p-6 rounded-3xl bg-emerald-50/40 border border-emerald-200/80 space-y-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h3 className="font-serif font-bold text-lg text-slate-900">Why Buyers Choose Block A</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Immediate Construction:</strong> Full ready possession with active utilities and 500+ resident families.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Best Value on Larger Plots:</strong> 2 Kanal plots offer ~PKR 3,500/sq ft (half the per-sq-ft rate of 5M).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Highest Resale Liquidity:</strong> Deepest market inventory in Faisal Hills (~400 listings).</span>
              </li>
            </ul>
          </div>

          {/* Considerations Column */}
          <div className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200/80 space-y-4">
            <div className="flex items-center gap-2.5">
              <Scale className="w-6 h-6 text-amber-600" />
              <h3 className="font-serif font-bold text-lg text-slate-900">Important Considerations Before Buying</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-700 font-bold">!</span>
                <span><strong>Wide Price Spread:</strong> 5 Marla prices span 55 to 95 lakh depending on street, land level and facing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-700 font-bold">!</span>
                <span><strong>No Instalment Plan:</strong> Developer inventory is sold out; transactions are full cash resale transfers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-700 font-bold">!</span>
                <span><strong>Diligence on Transfer:</strong> Verification relies on NDC, allotment letter and possession letter.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. HOW YOU BUY IN BLOCK A: STEP-BY-STEP RESALE & TRANSFER */}
      {/* ========================================================= */}
      <section id="transfer-guide" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-[#7b002c]" />
              <span>Resale & Legal Transfer Guide</span>
            </div>
            <TextReveal
              as="h2"
              text="How You Buy in Block A: Resale & Transfer Procedure"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans">
              Because developer inventory is reported to be sold out, purchases in Block A are resale transfers completed directly at the society office on GT Road, Taxila.
            </p>
          </div>
        </ScrollReveal>

        {/* 7-Step Transfer Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Agree Terms with Seller', desc: 'Confirm plot price, transfer fee allocation, and settlement of outstanding society dues.' },
            { step: '02', title: 'Verify Ownership at Office', desc: 'Confirm seller allotment letter name matches seller CNIC at the society transfer desk.' },
            { step: '03', title: 'Check Transfer History', desc: 'Inspect plot file for repeated quick flip transfers or encumbrances.' },
            { step: '04', title: 'Obtain Official NDC', desc: 'Verify No Demand Certificate (NDC) confirming all developer dues are paid in full.' },
            { step: '05', title: 'Inspect Possession Letter', desc: 'Ask for original physical possession letter where plot is possession-granted.' },
            { step: '06', title: 'Complete Office Transfer', desc: 'Execute official transfer with both parties present; release full payment upon recording.' },
            { step: '07', title: 'Collect Transferred File', desc: 'Receive updated allotment letter and transfer receipt issued in your name.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-serif font-bold text-[#7b002c] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                Step {item.step}
              </span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Documents Required & Red Flag Warning Signs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Documents Required */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="font-serif font-bold text-base text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Documents Required for Transfer</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-200">
              <li>• Buyer CNIC copies (or NICOP for overseas buyers)</li>
              <li>• Nominee CNIC copies & passport-size photographs</li>
              <li>• Original seller allotment letter & transfer forms</li>
              <li>• Verified NDC (No Demand Certificate) & payment receipt</li>
            </ul>
          </div>

          {/* Warning Signs */}
          <div className="p-5 rounded-2xl bg-rose-950 text-white space-y-3 border border-rose-800">
            <h4 className="font-serif font-bold text-base text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Red Flag Warning Signs</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-rose-100">
              <li>• Seller CNIC does not match allotment letter name</li>
              <li>• Plot has changed hands repeatedly in a short period</li>
              <li>• Seller cannot produce valid NDC or possession letter</li>
              <li>• Asking price is suspiciously below market with no site visit</li>
              <li>• Offering unallotted file with no plot number</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. READING BLOCK A LISTINGS (TERMINOLOGY GLOSSARY)        */}
      {/* ========================================================= */}
      <section id="terminology" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
            Reading Block A Listings: Industry Terminology Guide
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Key real estate terms used in Block A plot advertisements:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { term: 'Series Number', def: 'Plot-number range within the block (e.g. 3690, 3800, 4210 series). Different series sit in different sectors.' },
            { term: 'MDR (Main Double Road)', def: 'Wider, busier avenues priced above internal 40ft street plots.' },
            { term: 'Sunface Orientation', def: 'Plot orientation receiving direct morning sunlight, carrying a buyer premium.' },
            { term: 'Margalla Face', def: 'Frontage looking toward the Margalla Hills panorama.' },
            { term: 'Solid Land', def: 'Natural, level ground requiring minimal filling before building.' },
            { term: 'NDC Open / Dues Clear', def: 'No Demand Certificate is ready, confirming smooth instant transfer.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <strong className="font-serif font-bold text-slate-900 text-sm block text-[#7b002c]">{item.term}</strong>
              <p className="text-slate-600 leading-relaxed">{item.def}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. BLOCK A VS EXECUTIVE BLOCK COMPARISON MATRIX           */}
      {/* ========================================================= */}
      <section id="compare-executive" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>Sector Comparison</span>
            </div>
            <TextReveal
              as="h2"
              text="Block A or the Executive Block?"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans">
              Direct comparison between established Block A and the entrance Executive Block:
            </p>
          </div>
        </ScrollReveal>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 sm:p-4 font-bold w-1/4">Feature / Aspect</th>
                <th className="p-3.5 sm:p-4 font-bold text-amber-300 w-3/8">Block A</th>
                <th className="p-3.5 sm:p-4 font-bold text-emerald-300 w-3/8">Executive Block</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-medium">
              {[
                { aspect: 'Character', a: 'Largest established residential block with 500+ families', exec: 'Commercial and civic centre right at the entrance gate' },
                { aspect: 'Possession', a: 'Granted (100% Ready to build)', exec: 'Granted (100% Ready to build)' },
                { aspect: 'Price Level', a: 'Below Executive for the same plot size', exec: 'Highest price level in the society' },
                { aspect: 'Resale Choice', a: 'Deepest inventory (~400 active listings)', exec: 'Compact inventory (~80 active listings)' },
                { aspect: 'Commercial', a: 'Local sector markets & plaza plots', exec: 'Society main commercial plazas & high-rises' },
                { aspect: 'Suits', a: 'Families building now; buyers wanting 2K / larger plots', exec: 'Businesses & buyers wanting direct GT Road frontage' },
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/40">{row.aspect}</td>
                  <td className="p-3.5 sm:p-4 text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] shrink-0" />
                      <span>{row.a}</span>
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{row.exec}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 13. DEVELOPMENT STATUS & ON-GROUND FACILITIES              */}
      {/* ========================================================= */}
      <section id="development-status" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <TextReveal
            as="h2"
            text="Development Status & Facilities Checklist"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
            staggerDelay={65}
            direction="left"
          />
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            On-ground infrastructure status verified during recent site visits:
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 sm:p-4 font-bold">Facility / Infrastructure Item</th>
                <th className="p-3.5 sm:p-4 font-bold text-emerald-300">Reported On-Ground Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-medium">
              {[
                { item: 'Main boulevard and internal roads', status: 'Developed, carpeted and in active daily use' },
                { item: 'Underground electricity, sewerage, water', status: 'Fully in place & operational across streets' },
                { item: 'Houses & Villas', status: '500+ Built & occupied; active construction continuing' },
                { item: 'Mosques and parks', status: 'Grand Jamia Mosque & 12-Kanal Family Park operational' },
                { item: 'Educational Campuses', status: 'Roots Millennium International School active' },
                { item: 'Healthcare & Commercials', status: 'Medical clinics & commercial retail markets live' },
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/40">{row.item}</td>
                  <td className="p-3.5 sm:p-4 text-emerald-800 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-slate-700 leading-relaxed">
          <strong>Arc Monument & Glow Gardens Proximity:</strong> Several Block A listings advertise proximity to the Arc Monument landmark and Glow Gardens. Always confirm exact physical distance on the master plan during your site visit.
        </div>
      </section>

      {/* ========================================================= */}
      {/* 14. DYNAMIC PLOT SERIES EXPLORER                          */}
      {/* ========================================================= */}
      <section id="series-explorer" className="scroll-mt-28">
        <DynamicPlotSeriesExplorer blockSlug="block-a" blockName="Block A" />
      </section>

      {/* ========================================================= */}
      {/* 15. ON-GROUND FACILITIES & AMENITIES GALLERY               */}
      {/* ========================================================= */}
      <section id="amenities" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <TextReveal
                as="h2"
                text="Live Amenities & Community Landmarks in Sector A"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Experience real delivered infrastructure: active Grand Jamia Mosque, family parks, paved boulevards, and commercial plazas.
              </p>
            </div>

            {/* Navigation Arrows & Category Filter */}
            <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScrollAmenities('left')}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                  aria-label="Previous Amenities"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollAmenities('right')}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                  aria-label="Next Amenities"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Category Filter on Desktop */}
              <div className="hidden sm:flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
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
          </div>
        </ScrollReveal>

        {/* Carousel Slider with Auto-Scroll Every 1 Second */}
        <div
          ref={amenitiesScrollRef}
          onMouseEnter={() => setIsAmenitiesHovered(true)}
          onMouseLeave={() => setIsAmenitiesHovered(false)}
          onTouchStart={() => setIsAmenitiesHovered(true)}
          onTouchEnd={() => setIsAmenitiesHovered(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-2 pt-1 scroll-smooth snap-x snap-mandatory"
        >
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryImage(item)}
              className="snap-start shrink-0 w-[240px] sm:w-[300px] lg:w-[340px] group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 bg-slate-950 flex flex-col justify-end h-[280px] sm:h-[340px] cursor-pointer transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              <div className="relative z-10 p-4 sm:p-5">
                <h4 className="font-serif font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 16. FREQUENTLY ASKED QUESTIONS (OPEN THEME STYLE)         */}
      {/* ========================================================= */}
      <section id="faqs" className="py-12 lg:py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">

          {/* Left Column: Sticky FAQ'S Title */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-24 self-start">
            <span className="label-caps text-[#7b002c] font-bold block mb-1 text-xs uppercase tracking-widest">FAQ&apos;S</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#7b002c] tracking-tight leading-[1.15] uppercase">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-1">
              Detailed answers on possession status, RDA NOC clearance, utilities, pricing, and plot transfer for Faisal Hills Block A.
            </p>
          </div>

          {/* Right Column: Clean Horizontal Separated Accordion */}
          <div className="lg:col-span-8 space-y-0 border-t border-slate-900/80">
            {[
              {
                q: 'Where is Block A in Faisal Hills?',
                a: 'Between Block B and the Executive Block, reached directly from the GT Road (N-5) entrance along the main boulevard.'
              },
              {
                q: 'Is Block A sold out?',
                a: 'Developer inventory is reported to be exhausted, so plots are bought on resale rather than fresh booking. The resale market remains large, with around 400 plots listed in September 2026.'
              },
              {
                q: 'What plot sizes are available?',
                a: '5, 8, 10 and 14 Marla, 1 Kanal and 2 Kanal residential plots, plus commercial plots from 9.6 Marla upward.'
              },
              {
                q: 'What is the price of a 5 Marla plot in Block A?',
                a: 'Published ranges start around PKR 55 lakh, and recent asking prices ran from 55 to 95 lakh, with most between 72 and 85 lakh. Position accounts for most of the spread.'
              },
              {
                q: 'Are 2 Kanal plots available in Block A?',
                a: 'Yes. Block A is one of only two blocks offering them, recently asking PKR 3.1 to 3.2 crore, which is the lowest rate per square foot in the block.'
              },
              {
                q: 'Is it cash, instalments or resale?',
                a: 'Resale purchases are settled in full at transfer. Confirm any remaining developer terms in writing before committing.'
              },
              {
                q: 'Has possession been granted?',
                a: 'Yes, and plots are commonly advertised as ready to build. Confirm possession for your specific plot number.'
              },
              {
                q: 'Is Block A RDA approved?',
                a: 'Block A falls within the Faisal Hills scheme approved by the Rawalpindi Development Authority (RDA).'
              },
              {
                q: 'Why do listings show 6 Marla or 1.2 Kanal plots?',
                a: 'Some are genuinely non-standard plots and some are standard plots measured with a different Marla size (225 sq ft vs 250 sq ft). Compare by dimensions and square feet.'
              },
              {
                q: 'How does a transfer work and what does it cost?',
                a: 'Ownership is verified at the society office, an NDC confirms no dues remain, the possession letter is handed over, and the transfer is recorded in your name.'
              },
              {
                q: 'Are there apartments in Block A?',
                a: 'Yes. ZN Tower 1 and Serene Hills are mixed-use buildings within the block, offering apartments and shops.'
              },
            ].map((faq, index) => {
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
      {/* 17. LEAD INQUIRY & BOOKING DESK CTA                       */}
      {/* ========================================================= */}
      <section id="contact" className="bg-gradient-to-br from-[#7b002c] via-[#5c0021] to-[#3a0014] text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Official Sales Facilitation Desk
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
            Schedule a Site Visit or Request Verified Block A Resale File
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
            className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
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
          mapImageUrl="/images/faisal-hills-master-plan-map.webp"
        />
      )}

      {/* Gallery Photo Lightbox Modal */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md transition-opacity">
          <div className="fixed inset-0" onClick={() => setSelectedGalleryImage(null)} />
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-3xl w-full overflow-hidden relative z-10 shadow-2xl animate-fade-up">
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors z-20 cursor-pointer"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[16/10] w-full bg-black">
              <img
                src={selectedGalleryImage.image}
                alt={selectedGalleryImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-2 bg-slate-900 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 bg-rose-950/80 px-2.5 py-1 rounded-full border border-rose-800">
                {selectedGalleryImage.tag}
              </span>
              <h3 className="font-serif font-bold text-xl text-white">
                {selectedGalleryImage.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedGalleryImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
