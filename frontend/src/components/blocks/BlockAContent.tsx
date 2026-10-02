'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  PlotItem,
  fetchPlots,
  formatPlotPrice,
  BlockInfo,
  blocksData,
  fetchBlock,
  BlockACMSData,
  initialBlockACMS,
  fetchBlockACMS,
  mergeBlockACMS
} from '@/data/faisalHillsData';
import FormattedText from '@/components/ui/FormattedText';
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
  { destination: 'Faisal Hills Main Entrance Gate', time: '1 min', distance: '0.4 km', note: 'Direct access', image: '/images/faisal-hills-arc-gate.webp' },
  { destination: 'HITEC University Taxila', time: '4 mins', distance: '2.8 km', note: 'Via GT Road', image: '/images/roots-international-school-faisal-hills.webp' },
  { destination: 'Taxila Museum & Gandhara Heritage', time: '6 mins', distance: '4.5 km', note: 'Direct GT Road N-5', image: '/images/faisal-hills-monument.webp' },
  { destination: 'Taxila M-1 Motorway Interchange', time: '9 mins', distance: '8.5 km', note: 'Direct Highway Link', image: '/images/hills-walk-commercial-aerial.webp' },
  { destination: 'Tarnol Morr (Islamabad Entry)', time: '7 mins', distance: '6.2 km', note: 'Twin Cities Node', image: '/images/faisal-hills-executive-sector.webp' },
  { destination: 'New Islamabad International Airport', time: '22 mins', distance: '29 km', note: 'Via M-1 / Cargo Link', image: '/images/faisal-hills-aerial-panoramic.webp' },
  { destination: 'Islamabad Zero Point / Blue Area', time: '30 mins', distance: '27 km', note: 'Via Margalla Ave / GT Road', image: '/images/faisal-hills-drone-view.webp' }
];

export default function BlockAContent() {
  const [cms, setCms] = useState<BlockACMSData>(initialBlockACMS);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'infrastructure' | 'nature' | 'amenities'>('all');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<typeof blockAGalleryItems[0] | null>(null);
  const [plotCategoryFilter, setPlotCategoryFilter] = useState<'all' | 'residential' | 'commercial'>('residential');

  // Dynamic live plot inventory sync from Laravel Backend Dashboard / LocalStorage / API
  const [allPlots, setAllPlots] = useState<PlotItem[]>([]);
  const [blockInfo, setBlockInfo] = useState<BlockInfo | null>(() => blocksData.find(b => b.slug === 'block-a') || null);

  useEffect(() => {
    fetchBlockACMS().then(data => {
      if (data) setCms(mergeBlockACMS(data));
    });

    const handleCmsSync = () => {
      fetchBlockACMS().then(data => {
        if (data) setCms(mergeBlockACMS(data));
      });
    };

    window.addEventListener('faisal_block_a_cms_updated', handleCmsSync);
    window.addEventListener('storage', handleCmsSync);
    return () => {
      window.removeEventListener('faisal_block_a_cms_updated', handleCmsSync);
      window.removeEventListener('storage', handleCmsSync);
    };
  }, []);

  useEffect(() => {
    fetchPlots().then(data => setAllPlots(data)).catch(console.error);

    const handleSync = () => {
      fetchPlots().then(data => setAllPlots(data)).catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handleSync);
    return () => window.removeEventListener('faisal_plots_updated', handleSync);
  }, []);

  useEffect(() => {
    fetchBlock('block-a').then(b => {
      if (b) setBlockInfo(b);
    });

    const handleBlockSync = () => {
      fetchBlock('block-a').then(b => {
        if (b) setBlockInfo(b);
      });
    };

    window.addEventListener('faisal_blocks_updated', handleBlockSync);
    window.addEventListener('storage', handleBlockSync);
    return () => {
      window.removeEventListener('faisal_blocks_updated', handleBlockSync);
      window.removeEventListener('storage', handleBlockSync);
    };
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
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
      {/* 1. SECTOR A OVERVIEW & TOP SUMMARY FACTS MATRIX           */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        
        {/* Clean Header Badge Strip */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{cms.verificationHeader.badgeText || "Official Verified Block Guide"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Narrative & Key Facts Table */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h1"
                  text={cms.overview.h1}
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    <FormattedText text={cms.overview.leadParagraph1} />
                  </p>
                  <p>
                    <FormattedText text={cms.overview.leadParagraph2} />
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Top Key Facts Summary Table (First HTML Table in Copy) */}
            <ScrollReveal direction="up" delay={80}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm font-sans">
                  <tbody className="divide-y divide-slate-100 bg-white font-medium">
                    <tr className="bg-slate-50/60">
                      <td className="p-3 sm:p-3.5 font-bold text-slate-900 w-1/3 border-r border-slate-200">Position</td>
                      <td className="p-3 sm:p-3.5 text-slate-700">{cms.overview.quickFacts.position}</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-3.5 font-bold text-slate-900 border-r border-slate-200">Residential sizes</td>
                      <td className="p-3 sm:p-3.5 text-slate-700 font-semibold text-[#7b002c]">{cms.overview.quickFacts.residentialSizes}</td>
                    </tr>
                    <tr className="bg-slate-50/60">
                      <td className="p-3 sm:p-3.5 font-bold text-slate-900 border-r border-slate-200">Commercial sizes</td>
                      <td className="p-3 sm:p-3.5 text-slate-700">{cms.overview.quickFacts.commercialSizes}</td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-3.5 font-bold text-slate-900 border-r border-slate-200">How you buy</td>
                      <td className="p-3 sm:p-3.5 text-slate-700">{cms.overview.quickFacts.howYouBuy}</td>
                    </tr>
                    <tr className="bg-slate-50/60">
                      <td className="p-3 sm:p-3.5 font-bold text-slate-900 border-r border-slate-200">Possession</td>
                      <td className="p-3 sm:p-3.5 text-emerald-800 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{cms.overview.quickFacts.possession}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 sm:p-3.5 font-bold text-slate-900 border-r border-slate-200">Legal status</td>
                      <td className="p-3 sm:p-3.5 text-slate-700">{cms.overview.quickFacts.legalStatus}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 w-full flex flex-col justify-between space-y-4">
            <ScrollReveal direction="right" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950 min-h-[360px] sm:min-h-[420px] flex flex-col justify-between group">
                <img
                  src={cms.overview.image || "/images/faisal-hills-jamia-mosque.webp"}
                  alt={cms.overview.imageAlt || "Block A Grand Jamia Mosque and Resident Community"}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/30" />

                {/* Floating Top Badge */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#7b002c]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                    {cms.overview.imageTag}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-400/30">
                    Live & Populated
                  </span>
                </div>

                {/* Bottom Highlight Overlay */}
                <div className="relative z-10 p-6 space-y-2">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white drop-shadow-md">
                    {cms.overview.imageTitle}
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {cms.overview.imageSubtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Direct Verification CTA Strip */}
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="text-xs text-slate-700">
                <strong className="text-slate-900 block font-bold">{cms.overview.ctaStripText}</strong>
                <span>Verified plot availability & live market rates</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://wa.me/${cms.overview.ctaWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi, I want to ask for verified available plots and today's rate in Faisal Hills Block A.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${cms.overview.ctaCall.replace(/[^0-9+]/g, '')}`}
                  className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
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
                  text={cms.location.heading}
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />
                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    <FormattedText text={cms.location.leadParagraph1} />
                  </p>
                  <p>
                    <FormattedText text={cms.location.leadParagraph2} />
                  </p>
                  
                  <div className="pt-2">
                    <strong className="text-slate-900 font-bold block mb-2 text-xs uppercase tracking-wider">{cms.location.routesTitle}:</strong>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      {cms.location.routesList.map((route, rIdx) => (
                        <span key={rIdx} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#7b002c]" />
                          <span>{route}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 pt-2 italic border-l-2 border-[#7b002c] pl-3 leading-relaxed">
                    <FormattedText text={cms.location.driveTimesNote} />
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
                src={cms.location.googleMapIframeUrl}
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
              <span>Nearby: {cms.location.nearbyList.join(' · ')}</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. NEARBY LANDMARKS & COMMUTE DISTANCES (WITH IMAGES)     */}
      {/* ========================================================= */}
      <section id="nearby-landmarks" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
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

        {/* Commute Grid Cards with Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-1">
          {blockATravelTimes.map((dest, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 35}>
              <div className="rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group h-full">
                {/* Image Header Thumbnail */}
                <div className="relative h-28 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.destination}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 text-[10px] font-bold text-white bg-[#7b002c]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-xs">
                    {dest.time}
                  </span>
                </div>

                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#7b002c] transition-colors leading-snug">
                      {dest.destination}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span>Distance: <strong className="text-slate-800">{dest.distance}</strong></span>
                    <span className="italic text-slate-600 truncate max-w-[120px]">{dest.note}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. BLOCK A MAP & MASTER PLAN (LEFT MAP / RIGHT CONTENT)   */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Compact Map Thumbnail */}
          <div className="lg:col-span-5 space-y-3">
            <ScrollReveal direction="left" delay={50}>
              <div
                onClick={() => setIsMapModalOpen(true)}
                className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 group shadow-md cursor-pointer flex flex-col justify-center min-h-[260px] sm:min-h-[320px] p-2"
              >
                <img
                  src={cms.mapAndMasterPlan.mapImage || "/images/faisal-hills-master-plan-map.webp"}
                  alt="Faisal Hills Block A Map showing residential streets, commercial plots and the main boulevard"
                  className="w-full h-auto max-h-[340px] object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#7b002c]" />
                    <span>Click to Enlarge</span>
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#7b002c] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#9e1245] shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Master Map PDF</span>
            </button>
          </div>

          {/* Right Column: Narrative & Road Widths Specs */}
          <div className="lg:col-span-7 space-y-4">
            <ScrollReveal direction="right" delay={50}>
              <div className="space-y-3">
                <TextReveal
                  as="h2"
                  text={cms.mapAndMasterPlan.heading}
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  <FormattedText text={cms.mapAndMasterPlan.description} />
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium space-y-1 mt-4">
                <strong className="text-slate-900 block font-bold text-xs uppercase tracking-wider">
                  Road Width Specifications & Discrepancies:
                </strong>
                <p>
                  <FormattedText text={cms.mapAndMasterPlan.roadWidthsNote} />
                </p>
              </div>
            </ScrollReveal>
          </div>

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
              text={cms.plotSizesSection.heading}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl">
              {cms.plotSizesSection.subline}
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
                <th className="p-3.5 sm:p-4 font-bold text-amber-300">Sold as</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-medium">
              {cms.plotSizesSection.tableRows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-200">{row.dimensions}</td>
                  <td className="p-3.5 sm:p-4 text-slate-700 font-mono border-r border-slate-200">{row.areaSqFt}</td>
                  <td className="p-3.5 sm:p-4 text-slate-700 font-mono border-r border-slate-200">{row.areaSqYds}</td>
                  <td className="p-3.5 sm:p-4 font-bold text-[#7b002c]">{row.soldAs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Non-Standard Sizes & Marla Calculation Guide Box */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{cms.plotSizesSection.nonStandardHeading}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            <FormattedText text={cms.plotSizesSection.nonStandardText} />
          </p>
          <div className="p-3 rounded-xl bg-white border border-amber-200/80 text-xs text-slate-800 font-semibold">
            💡 <strong>Buyer Tip:</strong> <FormattedText text={cms.plotSizesSection.buyerTip} />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. BLOCK A PLOT PRICES & PER-SQUARE-FOOT ANALYSIS         */}
      {/* ========================================================= */}
      <section id="pricing-matrix" className="scroll-mt-28 space-y-8">
        
        {/* Table 1: Published Range vs Recent Asking Prices (Two-Column HTML Table) */}
        <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <TextReveal
                  as="h2"
                  text={cms.pricingAndRates.heading}
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
                  <FormattedText text={cms.pricingAndRates.leadParagraph} />
                </p>
              </div>

              <a
                href={`https://wa.me/${cms.overview.ctaWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi, I need the latest Block A plot price quotation.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs font-bold transition shadow-sm shrink-0 cursor-pointer"
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
                  <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800 w-1/4">Plot size</th>
                  <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800 text-amber-300 w-3/8">Published range</th>
                  <th className="p-3.5 sm:p-4 font-bold text-emerald-300 w-3/8">Recent asking prices</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {cms.pricingAndRates.tableRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-200">{row.plotSize}</td>
                    <td className="p-3.5 sm:p-4 text-slate-700 border-r border-slate-200">{row.publishedBand}</td>
                    <td className="p-3.5 sm:p-4 font-serif font-bold text-[#7b002c]">{row.recentAskingPrices}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <p>
              <FormattedText text={cms.pricingAndRates.sampleAttribution} />
            </p>
            <p className="text-rose-900 font-semibold bg-rose-50 p-3 rounded-xl border border-rose-200">
              ⚠️ <FormattedText text={cms.pricingAndRates.lowPriceWarning} />
            </p>
          </div>
        </div>

        {/* Table 2: Larger Plots Cost Less Per Square Foot */}
        <div className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              {cms.ratePerSqFtSection.heading}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
              {cms.ratePerSqFtSection.subline}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800 w-1/4">Plot size</th>
                  <th className="p-3.5 sm:p-4 font-bold text-amber-300 w-3/8">Approx. rate per sq ft</th>
                  <th className="p-3.5 sm:p-4 font-bold text-emerald-300 w-3/8">Value Efficiency Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {cms.ratePerSqFtSection.tableRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-200">{row.plotSize}</td>
                    <td className="p-3.5 sm:p-4 font-bold text-[#7b002c] border-r border-slate-200">{row.ratePerSqFt}</td>
                    <td className="p-3.5 sm:p-4 text-slate-700">{row.valueNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-slate-700 leading-relaxed font-medium">
            💡 <strong>Land Value Takeaway:</strong> <FormattedText text={cms.ratePerSqFtSection.landValueTakeaway} />
          </div>
        </div>

        {/* Files vs Possession Plots Explanation Box */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-2 shadow-md">
          <h4 className="font-serif font-bold text-base text-amber-300">{cms.filesVsPossessionSection.heading}</h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            <FormattedText text={cms.filesVsPossessionSection.text} />
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
              <span>Signature Real Estate Opportunities</span>
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
                {cms.twoKanalSection.badge}
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">{cms.twoKanalSection.heading}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <FormattedText text={cms.twoKanalSection.description} />
              </p>
            </div>
          </div>

          {/* Commercial Plots */}
          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block">
                {cms.commercialSection.badge}
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">{cms.commercialSection.heading}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <FormattedText text={cms.commercialSection.description} />
              </p>
              <p className="text-[11px] text-amber-900 font-medium italic border-t border-amber-200/60 pt-2">
                <FormattedText text={cms.commercialSection.commercialHubNote} />
              </p>
            </div>
          </div>

          {/* Apartments in Block A */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                {cms.apartmentsSection.badge}
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">{cms.apartmentsSection.heading}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {cms.apartmentsSection.intro}
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                <li><FormattedText text={cms.apartmentsSection.znTowerDesc} /></li>
                <li><FormattedText text={cms.apartmentsSection.sereneHillsDesc} /></li>
              </ul>
              <p className="text-[11px] text-slate-600 pt-1">
                <FormattedText text={cms.apartmentsSection.pricingNote} />
              </p>
            </div>
          </div>

        </div>

        {/* Caution Banner on Towers */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 leading-relaxed font-medium">
          <strong>Marketing Caution:</strong> <FormattedText text={cms.apartmentsSection.cautionNote} />
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
                className={`hidden sm:inline-block px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {displayedPlots.map((plot, idx) => (
            <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 80}>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                  <div>
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

                      <div className="absolute bottom-1.5 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white">
                        <span className="text-[8px] sm:text-[10px] text-slate-300 font-medium block uppercase tracking-wider">{plot.blockName}</span>
                        <h4 className="font-serif font-bold text-sm sm:text-xl group-hover:text-amber-300 transition-colors">#{plot.plotNumber}</h4>
                      </div>
                    </Link>

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
                        href={`https://wa.me/${cms.overview.ctaWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I am interested in Block A Plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-1.5 sm:px-2 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[10px] sm:text-[11px] font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-0.5 sm:gap-1 shadow-sm text-center cursor-pointer"
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
      {/* 9. EXPLORE ALL FAISAL HILLS BLOCKS (MOVED ABOVE FAQS/CTA)  */}
      {/* ========================================================= */}
      <section id="other-blocks" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="label-caps text-[#7b002c] font-bold block mb-1 text-xs uppercase tracking-widest">
                COMPLETE COMMUNITY PORTFOLIO
              </span>
              <TextReveal
                as="h2"
                text="Explore All Blocks & Sectors in Faisal Hills"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Compare Block A with neighboring sectors across location, plot sizes, and price points.
              </p>
            </div>

            <Link
              href="/faisal-hills-blocks"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:underline"
            >
              <span>View All Blocks Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <ExpandingProjectsShowcase
          items={otherBlocks}
          autoPlayInterval={6000}
        />
      </section>

      {/* ========================================================= */}
      {/* 10. WHO BLOCK A SUITS & WHAT TO WEIGH                     */}
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
              text={cms.whoItSuitsSection.heading}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
              <FormattedText text={cms.whoItSuitsSection.leadParagraph} />
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pros Column */}
          <div className="p-6 rounded-3xl bg-emerald-50/40 border border-emerald-200/80 space-y-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h3 className="font-serif font-bold text-lg text-slate-900">{cms.whoItSuitsSection.advantagesHeading}</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {cms.whoItSuitsSection.advantages.map((adv, aIdx) => (
                <li key={aIdx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>{adv.title}:</strong> <FormattedText text={adv.desc} /></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Considerations Column */}
          <div className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200/80 space-y-4">
            <div className="flex items-center gap-2.5">
              <Scale className="w-6 h-6 text-amber-600" />
              <h3 className="font-serif font-bold text-lg text-slate-900">{cms.whoItSuitsSection.considerationsHeading}</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {cms.whoItSuitsSection.considerations.map((con, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">!</span>
                  <span><strong>{con.title}:</strong> <FormattedText text={con.desc} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic text-center pt-2">
          {cms.whoItSuitsSection.disclaimerNote}
        </p>
      </section>

      {/* ========================================================= */}
      {/* 11. HOW YOU BUY IN BLOCK A: STEP-BY-STEP RESALE & TRANSFER */}
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
              text={cms.buyingAndTransferSection.heading}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans">
              <FormattedText text={cms.buyingAndTransferSection.intro} />
            </p>
          </div>
        </ScrollReveal>

        {/* 7-Step Transfer Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cms.buyingAndTransferSection.steps.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-serif font-bold text-[#7b002c] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                Step {item.step}
              </span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed"><FormattedText text={item.desc} /></p>
            </div>
          ))}
        </div>

        {/* Documents Required & Red Flag Warning Signs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Documents Required */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="font-serif font-bold text-base text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{cms.buyingAndTransferSection.documentsNeededHeading}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-200">
              {cms.buyingAndTransferSection.documentsNeeded.map((doc, dIdx) => (
                <li key={dIdx}>• {doc}</li>
              ))}
            </ul>
          </div>

          {/* Warning Signs */}
          <div className="p-5 rounded-2xl bg-rose-950 text-white space-y-3 border border-rose-800">
            <h4 className="font-serif font-bold text-base text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{cms.buyingAndTransferSection.warningSignsHeading}</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-rose-100">
              {cms.buyingAndTransferSection.warningSigns.map((ws, wIdx) => (
                <li key={wIdx}>• {ws}</li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. READING BLOCK A LISTINGS (TERMINOLOGY GLOSSARY)        */}
      {/* ========================================================= */}
      <section id="terminology" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
            {cms.readingListingsGlossary.heading}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            {cms.readingListingsGlossary.subline}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cms.readingListingsGlossary.terms.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <strong className="font-serif font-bold text-slate-900 text-sm block text-[#7b002c]">{item.term}</strong>
              <p className="text-slate-600 leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 13. BLOCK A VS EXECUTIVE BLOCK COMPARISON MATRIX           */}
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
              text={cms.comparisonExecutiveSection.heading}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans">
              {cms.comparisonExecutiveSection.subline}
            </p>
          </div>
        </ScrollReveal>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 sm:p-4 font-bold w-1/4">Aspect / Parameter</th>
                <th className="p-3.5 sm:p-4 font-bold text-amber-300 w-3/8">Block A</th>
                <th className="p-3.5 sm:p-4 font-bold text-emerald-300 w-3/8">Executive Block</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-medium">
              {cms.comparisonExecutiveSection.tableRows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30 transition-colors' : 'bg-slate-50/60 hover:bg-rose-50/30 transition-colors'}>
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/40">{row.aspect}</td>
                  <td className="p-3.5 sm:p-4 text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7b002c] shrink-0" />
                      <span>{row.blockA}</span>
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-700">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{row.executiveBlock}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-xs text-slate-600 pt-1">
          {cms.comparisonExecutiveSection.hubLinkNote}{' '}
          <Link href={cms.comparisonExecutiveSection.hubLinkHref} className="text-[#7b002c] font-bold hover:underline">
            {cms.comparisonExecutiveSection.hubLinkText}
          </Link>
        </p>
      </section>

      {/* ========================================================= */}
      {/* 14. DEVELOPMENT STATUS & ON-GROUND FACILITIES              */}
      {/* ========================================================= */}
      <section id="development-status" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <TextReveal
            as="h2"
            text={cms.developmentAndFacilitiesSection.heading}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
            staggerDelay={65}
            direction="left"
          />
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            {cms.developmentAndFacilitiesSection.subline}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-900 text-white font-serif uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 sm:p-4 font-bold w-1/2">Item</th>
                <th className="p-3.5 sm:p-4 font-bold text-emerald-300 w-1/2">Reported Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-medium">
              {cms.developmentAndFacilitiesSection.statusTableRows.map((row, idx) => (
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

        <p className="text-xs text-slate-500 italic">
          <FormattedText text={cms.developmentAndFacilitiesSection.statusNote} />
        </p>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-slate-700 leading-relaxed">
          <FormattedText text={cms.developmentAndFacilitiesSection.arcMonumentNote} />
        </div>

        {/* Possession & Building Authority Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="font-serif font-bold text-sm text-slate-900">{cms.possessionAndBuildingSection.heading}</h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            <FormattedText text={cms.possessionAndBuildingSection.text} />
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 15. DYNAMIC PLOT SERIES EXPLORER                          */}
      {/* ========================================================= */}
      <section id="series-explorer" className="scroll-mt-28">
        <DynamicPlotSeriesExplorer blockSlug="block-a" blockName="Block A" />
      </section>

      {/* ========================================================= */}
      {/* 16. ON-GROUND FACILITIES & AMENITIES GALLERY               */}
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
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
      {/* 17. FREQUENTLY ASKED QUESTIONS (ALL 11 OFFICIAL FAQS)      */}
      {/* ========================================================= */}
      <section id="faqs" className="py-12 lg:py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">

          {/* Left Column: Sticky FAQ'S Title */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-24 self-start">
            <span className="label-caps text-[#7b002c] font-bold block mb-1 text-xs uppercase tracking-widest">FAQ&apos;S</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#7b002c] tracking-tight leading-[1.15] uppercase">
              {cms.faqsSection.heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-1">
              {cms.faqsSection.subline}
            </p>
          </div>

          {/* Right Column: Clean Horizontal Separated Accordion */}
          <div className="lg:col-span-8 space-y-0 border-t border-slate-900/80">
            {cms.faqsSection.faqs.map((faq, index) => {
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
                        <FormattedText text={faq.a} />
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
      {/* 18. LEAD INQUIRY & BOOKING DESK CTA                       */}
      {/* ========================================================= */}
      <section id="contact" className="bg-gradient-to-br from-[#7b002c] via-[#5c0021] to-[#3a0014] text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Official Sales Facilitation Desk
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
            {cms.closingSiteVisitSection.heading}
          </h2>
          <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-sans">
            {cms.closingSiteVisitSection.intro}
          </p>

          <div className="pt-2 p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1">
            <strong className="text-amber-300 text-xs font-bold uppercase tracking-wider block">
              {cms.closingSiteVisitSection.sellingHeading}
            </strong>
            <p className="text-xs text-slate-200">
              {cms.closingSiteVisitSection.sellingText}
            </p>
          </div>
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
            <span>{submitted ? 'Inquiry Sent ✓' : cms.closingSiteVisitSection.formButtonText}</span>
          </button>
        </form>

        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-rose-200/80">
          <div className="flex items-center gap-4">
            <a href={`https://wa.me/${cms.closingSiteVisitSection.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: {cms.closingSiteVisitSection.whatsappNumber}</span>
            </a>
            <a href={`tel:${cms.closingSiteVisitSection.phoneNumber.replace(/[^0-9+]/g, '')}`} className="hover:text-white flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {cms.closingSiteVisitSection.phoneNumber}</span>
            </a>
          </div>
          <div>
            <span>Office: {cms.closingSiteVisitSection.officeAddress}</span>
          </div>
        </div>

        {/* Reviewer / About this page footnote */}
        <div className="relative z-10 pt-3 text-[11px] text-rose-200/60 leading-relaxed font-sans border-t border-white/5">
          {cms.closingSiteVisitSection.reviewedByNote}
        </div>
      </section>

      {/* Map Download Modal */}
      {isMapModalOpen && (
        <MapDownloadModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          blockName="Faisal Hills Block A"
          mapImageUrl={cms.mapAndMasterPlan.mapImage || "/images/faisal-hills-master-plan-map.webp"}
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
