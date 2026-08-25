'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Building2,
  Trees,
  Landmark,
  Phone,
  Sparkles,
  Download,
  ArrowRight,
  TrendingUp,
  Tag,
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
  Calendar,
  Building,
  Percent,
  Filter,
  Shield,
  Navigation
} from 'lucide-react';
import {
  plotInventoryData,
  PlotItem,
  fetchPlots,
  submitLead
} from '@/data/faisalHillsData';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { DynamicPlotSeriesExplorer } from '@/components/plots/DynamicPlotSeriesExplorer';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';

// Price schedule benchmark rows for Block C
interface BlockCPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  sqFeet: string;
  category: 'Residential' | 'Commercial';
  priceRange: string;
  possession: string;
  highlight: string;
}

const blockCPriceSchedule: BlockCPriceRow[] = [
  {
    size: '5 Marla',
    dimensions: '25 × 50',
    sqYards: '139 Sq. Yds',
    sqFeet: '1,125 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 48 Lacs – 58 Lacs',
    possession: 'Possession Ready',
    highlight: 'Highest transaction velocity; perfect compact entry cut near Hills Walk.'
  },
  {
    size: '8 Marla',
    dimensions: '30 × 60',
    sqYards: '200 Sq. Yds',
    sqFeet: '1,800 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 75 Lacs – 90 Lacs',
    possession: 'Possession Ready',
    highlight: 'Balanced family layout offering wide frontage and generous parking space.'
  },
  {
    size: '10 Marla',
    dimensions: '35 × 70',
    sqYards: '272 Sq. Yds',
    sqFeet: '2,250 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 1.15 Cr – 1.40 Cr',
    possession: 'Possession Ready',
    highlight: 'Optimal for double-unit luxury villas with scenic Margalla hill vistas.'
  },
  {
    size: '14 Marla',
    dimensions: '40 × 80',
    sqYards: '356 Sq. Yds',
    sqFeet: '3,150 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 1.55 Cr – 1.85 Cr',
    possession: 'Possession Ready',
    highlight: 'Executive estate cuts situated along 60ft wide landscaped sector avenues.'
  },
  {
    size: '1 Kanal',
    dimensions: '50 × 90',
    sqYards: '500 Sq. Yds',
    sqFeet: '4,500 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 1.95 Cr – 2.45 Cr',
    possession: 'Possession Ready',
    highlight: 'Flagship mansion plots directly facing central parks & green reservations.'
  },
  {
    size: '4 Marla Commercial',
    dimensions: '30 × 30',
    sqYards: '100 Sq. Yds',
    sqFeet: '900 Sq. Ft',
    category: 'Commercial',
    priceRange: 'PKR 2.20 Cr – 3.20 Cr',
    possession: 'Approved for Construction',
    highlight: 'High footfall promenade retail, ideal for corporate offices & food brands.'
  }
];

// Fallback seed plots for Block C with real high quality imagery
const defaultBlockCPlots: PlotItem[] = [
  {
    id: 'blockc-5m-1',
    plotNumber: 'C-142',
    blockSlug: 'block-c',
    blockName: 'Block C',
    category: 'Residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 5450000,
    priceFormatted: 'PKR 54.5 Lacs',
    priceHistoryTrend: '+24% Annual',
    status: 'Available',
    facing: 'Park Facing',
    mapCoords: { x: 55, y: 48 },
    features: ['Adjacent to Sector Park', '40ft Carpeted Street', 'RO Water Pipeline Connected'],
    description: 'Prime 5 Marla residential plot located near central park with immediate possession.',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
  },
  {
    id: 'blockc-8m-1',
    plotNumber: 'C-284',
    blockSlug: 'block-c',
    blockName: 'Block C',
    category: 'Residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 8200000,
    priceFormatted: 'PKR 82.0 Lacs',
    priceHistoryTrend: '+26% Annual',
    status: 'Available',
    facing: 'Standard',
    mapCoords: { x: 58, y: 50 },
    features: ['Direct Avenue Access', 'Underground Utilities Live', 'Demarcation Completed'],
    description: 'Generous 8 Marla layout on 40ft street with wide frontage and mountain breeze.',
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg'
  },
  {
    id: 'blockc-10m-1',
    plotNumber: 'C-319',
    blockSlug: 'block-c',
    blockName: 'Block C',
    category: 'Residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 12800000,
    priceFormatted: 'PKR 1.28 Crore',
    priceHistoryTrend: '+28% Annual',
    status: 'Available',
    facing: 'Corner',
    mapCoords: { x: 62, y: 52 },
    features: ['Corner Dual Access', 'Panoramic Hillside Panorama', 'Near Grand Jamia Mosque'],
    description: 'Executive 10 Marla corner plot ideal for double-unit luxury villa construction.',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg'
  },
  {
    id: 'blockc-14m-1',
    plotNumber: 'C-405',
    blockSlug: 'block-c',
    blockName: 'Block C',
    category: 'Residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    price: 16800000,
    priceFormatted: 'PKR 1.68 Crore',
    priceHistoryTrend: '+22% Annual',
    status: 'Available',
    facing: 'Main Boulevard',
    mapCoords: { x: 65, y: 54 },
    features: ['60ft Wide Avenue Frontage', 'Instant Home Construction', 'Zero Litigation'],
    description: '14 Marla luxury plot positioned along landscaped sector avenue.',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
  },
  {
    id: 'blockc-1k-1',
    plotNumber: 'C-512',
    blockSlug: 'block-c',
    blockName: 'Block C',
    category: 'Residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 22500000,
    priceFormatted: 'PKR 2.25 Crore',
    priceHistoryTrend: '+25% Annual',
    status: 'Available',
    facing: 'Park Facing',
    mapCoords: { x: 68, y: 56 },
    features: ['Facing 12-Kanal Central Park', 'Luxury Villa Demarcation', 'Biometric Zedem Transfer'],
    description: 'Flagship 1 Kanal mansion plot facing extensive green reserves and thematic parklands.',
    image: '/images/faisal-forest.jpg'
  },
  {
    id: 'blockc-comm-1',
    plotNumber: 'C-COMM-18',
    blockSlug: 'block-c',
    blockName: 'Block C',
    category: 'Commercial',
    size: '4 Marla Commercial',
    dimensions: '30 × 30',
    price: 26500000,
    priceFormatted: 'PKR 2.65 Crore',
    priceHistoryTrend: '+32% Annual',
    status: 'Available',
    facing: 'Main Boulevard',
    mapCoords: { x: 70, y: 60 },
    features: ['Ground + 4 Storey Approval', 'High Footfall Corridor', 'Retail & Office Hub'],
    description: 'Prime commercial plot fronting the Hills Walk promenade with high retail footfall.',
    image: '/images/faisalarc (2).webp'
  }
];

// Block C Amenities List with local imagery
const blockCAmenities = [
  {
    id: 'ro-plant',
    title: 'High-Capacity RO Water Filtration Plant',
    category: 'utilities',
    description: 'Fully active water purification and mineral RO filtration station supplying 24/7 crystal-clear potable water to all Block C residents.',
    image: '/images/faisal-park.jpg',
    tag: 'Operational'
  },
  {
    id: 'hills-walk',
    title: 'Direct Hills Walk Promenade Access',
    category: 'lifestyle',
    description: 'Direct pedestrian link to the vibrant Hills Walk commercial district featuring alfresco restaurants, cafes, and flagship retail boutiques.',
    image: '/images/faisalarc (2).webp',
    tag: 'Lifestyle Anchor'
  },
  {
    id: 'mosque',
    title: 'Grand Sector Jamia Mosque',
    category: 'infrastructure',
    description: 'Architecturally stunning air-conditioned community mosque with dedicated ablution zones, lush courtyards, and Quran academy.',
    image: '/images/imgi_46_Mosques.webp',
    tag: 'Delivered'
  },
  {
    id: 'central-park',
    title: 'Central Theme Park & Glow Garden',
    category: 'nature',
    description: 'Sprawling green reservations with children play grounds, illuminated evening walking tracks, and gazebos facing the mountains.',
    image: '/images/imgi_45_Glow-garden.webp',
    tag: 'Recreational'
  },
  {
    id: 'underground-utilities',
    title: '100% Underground Electrification',
    category: 'utilities',
    description: 'Clean visual skyline with zero dangling wires, heavy underground power cables, grid transformer stations, and LED street lighting.',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    tag: 'Smart Infrastructure'
  },
  {
    id: 'gated-security',
    title: 'Dedicated 24/7 Gated Security & Surveillance',
    category: 'security',
    description: 'Rapid-response mobile patrolling squads, barrier-controlled check posts, and smart high-definition CCTV perimeter monitoring.',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
    tag: '24/7 Secure'
  }
];

// Block C Development Milestones
const blockCDevelopmentMilestones = [
  { title: 'Roads & Boulevards', progress: 98, status: 'Paved & Functional', desc: '40ft, 60ft, and 150ft asphalt avenues completely surfaced with curbs and streetlights.' },
  { title: 'Underground Electricity', progress: 100, status: '100% Energized', desc: 'Transformer substations installed with subterranean electrification live across all sectors.' },
  { title: 'Water Supply & RO Plant', progress: 100, status: 'Fully Operational', desc: 'Dedicated deep-well tube wells and central RO purification unit dispensing clean water.' },
  { title: 'Sui Gas Infrastructure', progress: 95, status: 'Lines Laid & Tested', desc: 'Underground gas mainlines tested and ready for individual home meter connections.' },
  { title: 'Sewerage & Storm Drains', progress: 100, status: 'Completed', desc: 'Underground RCC pipe network with automated drainage ensuring zero monsoon waterlogging.' },
  { title: 'Parks & Green Reservations', progress: 92, status: 'Landscaped', desc: 'Family parks, jogging tracks, and gazebos landscaped with native plants and turf.' },
];

// Block C Travel Times
const blockCTravelTimes = [
  { destination: 'M-1 Motorway Dedicated Interchange', distance: '1.8 km', time: '3 Mins', note: 'Fastest Motorway connection in society' },
  { destination: 'Grand GT Road (N-5 Highway)', distance: '2.5 km', time: '5 Mins', note: 'Direct wide boulevard access' },
  { destination: 'Block B Central Sports Complex', distance: '1.2 km', time: '2 Mins', note: 'Direct internal avenue connection' },
  { destination: 'New City Phase 2 Commercial Arcades', distance: '1.5 km', time: '3 Mins', note: 'Adjacent adjoining boundary' },
  { destination: 'Taxila Museum & Cantt Commercials', distance: '5.5 km', time: '8 Mins', note: 'Quick urban convenience' },
  { destination: 'Islamabad Toll Plaza & Zero Point', distance: '24.0 km', time: '22 Mins', note: 'Signal-free drive via M-1' }
];

// Block C FAQs
const blockCFaqs = [
  {
    question: "Where is Faisal Hills Block C located within the master plan?",
    answer: "Block C is located on the prestigious western spine of Faisal Hills, bordering Block B to the east and New City Phase 2 to the west. It enjoys close proximity to the upcoming M-1 Motorway connection and fronts the vibrant Hills Walk commercial district."
  },
  {
    question: "Is Faisal Hills Block C RDA approved and possession ready?",
    answer: "Yes, Faisal Hills Block C is 100% RDA approved (Rawalpindi Development Authority). Most sectors within Block C are possession ready, with active home construction underway, operational water filtration plants, and live underground utilities."
  },
  {
    question: "What plot sizes are available in Block C?",
    answer: "Block C offers 5 Marla (25x50), 8 Marla (30x60), 10 Marla (35x70), 14 Marla (40x80), and 1 Kanal (50x90) residential plots, alongside 4 Marla commercial plots approved for multi-story plaza development."
  },
  {
    question: "What makes Block C unique compared to Block A and Block B?",
    answer: "Block C is distinguished by its immediate proximity to the Hills Walk luxury commercial promenade and its strategic closeness to the M-1 Motorway corridor. It is also home to dedicated RO drinking water filtration stations and scenic mountain views."
  },
  {
    question: "How can I purchase or verify a plot in Block C?",
    answer: "You can book directly through verified inventory listed on this page or visit the Zedem head office. Every plot file undergoes instant biometric and allotment verification to ensure 100% transparency with zero dealer markup."
  }
];

export default function BlockCContent() {
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [plotCategoryFilter, setPlotCategoryFilter] = useState<'all' | '5 Marla' | '8 Marla' | '10 Marla' | '14 Marla' | '1 Kanal' | 'Commercial'>('all');
  const [selectedAmenityFilter, setSelectedAmenityFilter] = useState('all');
  const [selectedPriceCategory, setSelectedPriceCategory] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [allPlots, setAllPlots] = useState<PlotItem[]>(plotInventoryData);

  // Gallery slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  const blockCSliderImages = useMemo(() => [
    {
      id: 1,
      title: 'MARGALLA FOOTHILL VISTAS',
      sub: 'Scenic Mountain Backdrop & Fresh Valley Breezes in Block C',
      tag: 'Natural Crest',
      image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg'
    },
    {
      id: 2,
      title: 'HILLS WALK COMMERCIAL PROMENADE',
      sub: 'Direct Pedestrian Link to Vibrant Retail & Dining Arcades',
      tag: 'Retail Promenade',
      image: '/images/faisalarc (2).webp'
    },
    {
      id: 3,
      title: 'GRAND JAMIA MOSQUE & COURTYARD',
      sub: 'Delivered Islamic Landmark with Air-Conditioned Prayer Halls',
      tag: 'Delivered Landmark',
      image: '/images/imgi_46_Mosques.webp'
    },
    {
      id: 4,
      title: 'PAVED BOULEVARDS & INFRASTRUCTURE',
      sub: '40ft to 150ft Wide Asphalt Avenues with Live Underground Utilities',
      tag: 'Road Network',
      image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
    },
    {
      id: 5,
      title: 'THEME PARKS & GLOW GARDEN',
      sub: 'Landscaped Family Enclaves & Evening Illuminated Circuits',
      tag: 'Green Living',
      image: '/images/imgi_45_Glow-garden.webp'
    },
    {
      id: 6,
      title: 'ACTIVE RESIDENTIAL CONSTRUCTION',
      sub: 'Immediate Possession Ready Sector with Thriving Neighborhoods',
      tag: 'Possession Ready',
      image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg'
    }
  ], []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? blockCSliderImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === blockCSliderImages.length - 1 ? 0 : prev + 1));
  };

  // Lead capture form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPlotSize, setLeadPlotSize] = useState('5 Marla');
  const [leadMessage, setLeadMessage] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Sync plots from localStorage or API
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

  // Filter Block C Plots
  const blockCPlots = useMemo(() => {
    const filtered = allPlots.filter(
      (p) => p.blockSlug === 'block-c' || (p.blockName && p.blockName.toLowerCase().includes('block c'))
    );
    if (filtered.length > 0) return filtered;
    return defaultBlockCPlots;
  }, [allPlots]);

  const displayedBlockCPlots = useMemo(() => {
    if (plotCategoryFilter === 'all') return blockCPlots;
    if (plotCategoryFilter === 'Commercial') {
      return blockCPlots.filter((p) => p.category === 'Commercial');
    }
    return blockCPlots.filter((p) =>
      p.size.toLowerCase().includes(plotCategoryFilter.toLowerCase())
    );
  }, [blockCPlots, plotCategoryFilter]);

  const filteredAmenities = useMemo(() => {
    if (selectedAmenityFilter === 'all') return blockCAmenities;
    return blockCAmenities.filter((a) => a.category === selectedAmenityFilter);
  }, [selectedAmenityFilter]);

  const filteredPriceSchedule = useMemo(() => {
    if (selectedPriceCategory === 'All') return blockCPriceSchedule;
    return blockCPriceSchedule.filter((r) => r.category === selectedPriceCategory);
  }, [selectedPriceCategory]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    const leadData = {
      id: `lead-c-${Date.now()}`,
      name: leadName || 'Interested Buyer',
      phone: leadPhone || 'N/A',
      interest: `Faisal Hills Block C - ${leadPlotSize}`,
      message: leadMessage || `Inquiry for Block C ${leadPlotSize} plot / rates / site visit`,
      submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
      localStorage.setItem('faisal_leads_data', JSON.stringify([leadData, ...existing]));
      window.dispatchEvent(new Event('faisal_leads_updated'));
    }

    try {
      await submitLead({
        name: leadName,
        phone: leadPhone,
        message: `BLOCK C INQUIRY - Size: ${leadPlotSize} | Note: ${leadMessage}`
      });
    } catch (err) {
      console.error('Lead submit error:', err);
    }

    setIsSubmittingLead(false);
    setLeadSubmitted(true);

    const waText = encodeURIComponent(
      `Hello Faisal Hills Sales Desk!\n\nI am interested in buying a plot in Block C.\nName: ${leadName}\nPhone: ${leadPhone}\nPreferred Size: ${leadPlotSize}\nMessage: ${leadMessage || 'Please send available plot numbers and price details.'}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/923044811717?text=${waText}`, '_blank');
    }, 1200);
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-8">
      {/* ========================================================= */}
      {/* 1. SECTOR C OVERVIEW & STRATEGIC VISION (HERO NARRATIVE) */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative with See More toggle */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-3">
                <TextReveal
                  as="h1"
                  text="Faisal Hills Block C — Scenic Living by Hills Walk & M-1 Corridor"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  Faisal Hills Block C is one of the most sought-after residential and commercial sectors in the master community. Positioned between Block B and New City Phase 2, Block C offers rapid connection to the upcoming M-1 Motorway link, uninterrupted Margalla mountain breezes, and direct frontage to the upscale Hills Walk retail boulevard.
                </p>

                {/* Collapsible Expanded Narrative with See More button */}
                {isOverviewExpanded && (
                  <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans animate-fadeIn">
                    <p>
                      Block C is masterfully planned for families seeking a peaceful, green sanctuary with modern urban convenience. It features complete on-ground infrastructure including operational high-capacity reverse-osmosis (RO) drinking water filtration stations, underground electricity, functional sewerage networks, and wide 40ft to 150ft paved boulevards.
                    </p>
                    <div className="p-4 bg-gradient-to-r from-rose-50 via-white to-amber-50/50 rounded-2xl border border-rose-200/80 text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-3 shadow-2xs">
                      <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                      <span>
                        <strong>Strategic Investment Highlight:</strong> Block C sits nearest to the dedicated M-1 Motorway connection, allowing residents to bypass internal highway bottlenecks and reach Islamabad or the New Islamabad International Airport within 20 to 25 signal-free minutes.
                      </span>
                    </div>
                  </div>
                )}

                {/* See More / See Less Toggle Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                    className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#7b002c] hover:text-[#9e1245] bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200/80 transition cursor-pointer"
                  >
                    <span>{isOverviewExpanded ? 'See Less Overview Details' : 'Read Comprehensive Block C Overview'}</span>
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform duration-300 ${
                        isOverviewExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Action CTAs */}
            <ScrollReveal direction="up" delay={80}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#plots-for-sale"
                  className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Explore Plots For Sale</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#7b002c]" />
                  <span>Download Master Map</span>
                </button>
                <a
                  href="https://wa.me/923044811717?text=Hello!%20I%20want%20to%20inquire%20about%20plots%20and%20rates%20in%20Faisal%20Hills%20Block%20C."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Quick Directory Jump Chips */}
            <ScrollReveal direction="up" delay={100}>
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <a
                  href="#photo-gallery"
                  className="px-3 py-1 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 text-xs font-bold transition-all shadow-2xs"
                >
                  📸 Photo Gallery
                </a>
                <a
                  href="#plots-for-sale"
                  className="px-3 py-1 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 text-xs font-bold transition-all shadow-2xs"
                >
                  🏡 Available Plots
                </a>
                <a
                  href="#development-status"
                  className="px-3 py-1 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 text-xs font-bold transition-all shadow-2xs"
                >
                  🏗️ Development Status
                </a>
                <a
                  href="#pricing-matrix"
                  className="px-3 py-1 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 text-xs font-bold transition-all shadow-2xs"
                >
                  💰 Price Matrix
                </a>
                <a
                  href="#master-plan"
                  className="px-3 py-1 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 text-xs font-bold transition-all shadow-2xs"
                >
                  🗺️ Master Plan
                </a>
                <a
                  href="#amenities"
                  className="px-3 py-1 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 text-xs font-bold transition-all shadow-2xs"
                >
                  ✨ Amenities
                </a>
                <a
                  href="#faqs"
                  className="px-3 py-1 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 text-xs font-bold transition-all shadow-2xs"
                >
                  ❓ FAQs
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual Feature Showcase Banner */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={80}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group min-h-[380px] sm:min-h-[440px] flex flex-col justify-end">
                <img
                  src="/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg"
                  alt="Faisal Hills Block C Scenic Living"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Top Status Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="text-xs font-bold text-white bg-[#7b002c] px-3.5 py-1.5 rounded-full shadow-md border border-white/20">
                    Possession Ready
                  </span>
                  <span className="text-xs font-bold text-emerald-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    Active RO Water Grid
                  </span>
                </div>

                {/* Bottom Highlight Overlay */}
                <div className="relative z-10 p-6 space-y-2">
                  <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">
                    Strategic Gateway
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    Adjacent to Hills Walk & New City Phase 2
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Featuring active RO water purification, high retail footfall, and panoramic mountain breezes.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. VISUAL PHOTO GALLERY SLIDER CAROUSEL                   */}
      {/* ========================================================= */}
      <section id="photo-gallery" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>On-Ground Photography</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900">
                Block C Visual Tour & Community Highlights
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Explore real on-site development, green parks, commercial corridors, and mountain perspectives:
              </p>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#7b002c] hover:text-white flex items-center justify-center shadow-sm transition cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#7b002c] hover:text-white flex items-center justify-center shadow-sm transition cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Active Hero Image Slide */}
        <ScrollReveal direction="up" delay={80}>
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 shadow-xl aspect-[16/9] sm:aspect-[21/9] min-h-[320px]">
            <img
              src={blockCSliderImages[currentSlide].image}
              alt={blockCSliderImages[currentSlide].title}
              className="w-full h-full object-cover transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#7b002c] text-white text-xs font-bold shadow-md uppercase tracking-wider">
                {blockCSliderImages[currentSlide].tag}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5 max-w-2xl">
              <span className="text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider">
                Sector C Landmark {currentSlide + 1} of {blockCSliderImages.length}
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-3xl text-white">
                {blockCSliderImages[currentSlide].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {blockCSliderImages[currentSlide].sub}
              </p>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-3">
            {blockCSliderImages.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                  currentSlide === idx
                    ? 'border-[#7b002c] scale-105 shadow-md ring-2 ring-[#7b002c]/20'
                    : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/20" />
                <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white bg-black/70 px-1 py-0.5 rounded text-center truncate">
                  {slide.title}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 3. KEY SECTOR QUANTITATIVE FIGURES & AREA METRICS (MID)   */}
      {/* ========================================================= */}
      <section id="sector-metrics" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-1.5 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>Sector Data & Benchmarks</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900">
              Block C Quantitative Metrics & Land Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Verified figures, dimensions, and benchmark metrics for informed investment decisions:
            </p>
          </div>
        </ScrollReveal>

        {/* 5 Core Animated Counting Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <ScrollReveal direction="up" delay={50}>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 h-full flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                Total Sector Plots
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#7b002c]">
                <CountUpNumber end={2600} suffix="+" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-sans">Residential & Commercial</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 h-full flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                Square Footage Range
              </span>
              <div className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                <CountUpNumber end={1125} duration={1200} /> – <CountUpNumber end={4500} suffix=" Sq.Ft" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-sans">5 Marla to 1 Kanal Cuts</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 h-full flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                Entry Baseline
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">
                From <CountUpNumber end={48} duration={1600} />L
              </div>
              <span className="text-xs text-slate-500 font-sans">Accessible 5 Marla Resale</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 h-full flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                Annual Capital Growth
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">
                <CountUpNumber end={26} prefix="+" suffix="%" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-sans">High M-1 corridor multiplier</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250}>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 h-full flex flex-col justify-between col-span-2 sm:col-span-1">
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                Legal & NOC Status
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                <CountUpNumber end={100} suffix="% RDA" duration={1800} />
              </div>
              <span className="text-xs text-slate-500 font-sans">Direct biometric Zedem transfer</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================= */}
      <section id="development-status" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <BadgeCheck className="w-3.5 h-3.5" />
                <span>Real On-Ground Progress</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                Block C Development Milestones & Delivery Status
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Track completion status across roads, underground utilities, water purification, and community amenities:
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Possession Handover Live</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blockCDevelopmentMilestones.map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 50}>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-rose-200 transition-all">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-slate-900">{item.title}</h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {item.progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7b002c] to-emerald-600 rounded-full transition-all duration-1000"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Status: {item.status}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. DYNAMIC PLOT SERIES EXPLORER (INTERACTIVE ENGINE)      */}
      {/* ========================================================= */}
      <section className="scroll-mt-28">
        <ScrollReveal direction="up" delay={50}>
          <DynamicPlotSeriesExplorer blockSlug="block-c" blockName="Block C" />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 6. VERIFIED PLOTS LISTED FOR SALE (BLOCK C)               */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>Verified Inventory & Resale Files</span>
              </div>
              <TextReveal
                as="h2"
                text="Faisal Hills Block C Plots for Sale — Direct Booking & Verified Files"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                Explore on-ground residential plots and commercial plazas in Block C with transparent pricing, zero dealer markup, and immediate allotment file verification.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0 gap-1">
              {(['all', '5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal', 'Commercial'] as const).map((filterVal) => (
                <button
                  key={filterVal}
                  type="button"
                  onClick={() => setPlotCategoryFilter(filterVal)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    plotCategoryFilter === filterVal
                      ? 'bg-[#7b002c] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filterVal === 'all' ? `All Plots (${blockCPlots.length})` : filterVal}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Plot Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedBlockCPlots.map((plot, idx) => (
            <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 80}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                <div>
                  {/* Plot Image Container */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-c`}
                    className="relative h-48 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                  >
                    <img
                      src={plot.image || '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'}
                      alt={plot.plotNumber}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                    {/* Top Badges Row */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 z-10">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm bg-[#7b002c] text-white border border-white/20 shrink-0">
                          {plot.category}
                        </span>
                        <span className="text-[9px] font-medium px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-slate-200 border border-white/15 truncate max-w-[95px]">
                          {plot.size}
                        </span>
                      </div>
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm border border-emerald-400/30 shrink-0 whitespace-nowrap">
                        {plot.status || 'Available'}
                      </span>
                    </div>

                    {/* Plot Number & Block */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] text-slate-300 font-medium block uppercase tracking-wider">
                        {plot.blockName || 'Block C'}
                      </span>
                      <h4 className="font-serif font-bold text-xl group-hover:text-amber-300 transition-colors">
                        #{plot.plotNumber}
                      </h4>
                    </div>
                  </Link>

                  {/* Specs Details */}
                  <div className="p-5 space-y-3.5">
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Plot Size:</span>
                        <span className="text-slate-900 font-bold group-hover:text-[#7b002c] transition-colors">
                          {plot.size}
                        </span>
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
                        <span className="text-slate-500 font-medium">Annual Growth / ROI:</span>
                        <span className="text-emerald-700 font-bold">{plot.priceHistoryTrend || '+24% Annual'}</span>
                      </div>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Array.isArray(plot.features) &&
                        plot.features.slice(0, 3).map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                          >
                            {feat}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Price & Action Buttons Footer */}
                <div className="p-4 pt-3 border-t border-slate-100 mt-2 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                      Total Price
                    </span>
                    <span className="font-serif font-bold text-base text-[#7b002c]">{plot.priceFormatted}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/plots/${plot.id}`}
                      className="px-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1 text-center"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>

                    <a
                      href={`https://wa.me/923044811717?text=${encodeURIComponent(
                        `Hi, I am interested in buying Block C Plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share verification & transfer details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1 shadow-sm text-center"
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

        {/* Sell / List Your Block C Plot Banner */}
        <div className="p-6 sm:p-8 bg-rose-50/70 border border-rose-200/80 rounded-3xl text-slate-900 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#7b002c] text-xs font-bold uppercase tracking-wider border border-rose-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Resale & Liquidation Desk</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              Want to Sell or Assess Your Block C Plot / Resale File?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
              Get an instant official market valuation and list your file for thousands of active verified buyers across Islamabad, Rawalpindi, and overseas.
            </p>
          </div>

          <a
            href="https://wa.me/923044811717?text=Hello!%20I%20want%20to%20list%20or%20sell%20my%20plot%20in%20Faisal%20Hills%20Block%20C."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>List Your Plot File</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. MASTER PLAN BLUEPRINT & PLOT SIZE BREAKDOWN             */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Master Plan & Sector Layout</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Faisal Hills Block C Master Blueprint & Cuts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Explore the sector map, 40ft to 150ft boulevard network, and residential plot zoning:
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsMapModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all hover:scale-105 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Master Plan PDF</span>
          </button>
        </div>

        {/* Master Plan 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map Preview Card */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-[#7b002c] font-bold uppercase tracking-wider block">
                Official RDA Layout
              </span>
              <h3 className="font-serif font-bold text-xl text-slate-900">
                Block C Street Hierarchy & Zonal Demarcation
              </h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Featuring structured 40ft residential access lanes, 60ft commercial sector roads, and the central 150ft artery linking Block B and New City Phase 2.
              </p>
            </div>

            <div
              onClick={() => setIsMapModalOpen(true)}
              className="relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 aspect-[4/3] bg-slate-950 flex items-center justify-center"
            >
              <img
                src="/images/faisal-hills-master-plan-map-opt.webp"
                alt="Faisal Hills Block C Master Plan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                <div className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md text-[#7b002c] text-xs font-bold shadow-lg flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand High-Res Map</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Residential & Commercial Cuts Detail */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Residential Cuts */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <Home className="w-3.5 h-3.5" />
                  <span>Residential Cuts</span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Residential Plot Cuts
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 5 Marla (25×50 / 1,125 sq.ft):</strong> Affordable, high-liquidity starter plots near community parks.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 8 Marla (30×60 / 1,800 sq.ft):</strong> Standard family size with space for lawn and twin-car porch.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 10 Marla (35×70 / 2,250 sq.ft):</strong> Luxury double-unit villa cut with mountain air frontage.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 1 Kanal (50×90 / 4,500 sq.ft):</strong> Flagship luxury mansion plots facing 12-Kanal central parks.
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-sans pt-2 border-t border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>RDA Approved residential zoning.</span>
              </div>
            </div>

            {/* Commercial Opportunities */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Commercial Arcades</span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Commercial Opportunities
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• Hills Walk Promenade:</strong> Direct connectivity to prime retail plazas, cafes, and supermarkets.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 4 Marla Commercial Plazas:</strong> Approved Ground + 4 storeys for mixed retail and corporate offices.
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 text-slate-700">
                    <strong>• 2,600+ Home Catchment:</strong> Continuous high tenant demand from adjoining Block B and Block C homes.
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-sans pt-2 border-t border-slate-100 flex items-center justify-between">
                <Link href="/faisal-hills-commercial" className="text-[#7b002c] font-bold hover:underline flex items-center gap-1">
                  <span>Commercial Rates</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
                <Link href="/blocks/block-b" className="text-[#7b002c] font-bold hover:underline flex items-center gap-1">
                  <span>Block B Main</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. ON-GROUND AMENITIES & INFRASTRUCTURE SHOWCASE          */}
      {/* ========================================================= */}
      <section id="amenities" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Trees className="w-3.5 h-3.5" />
                <span>Delivered Infrastructure</span>
              </div>
              <TextReveal
                as="h2"
                text="On-Ground Amenities & Community Landmarks in Sector C"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                Experience real delivered infrastructure: active RO mineral filtration stations, sector Jamia Mosque, landscaped parks, and direct Hills Walk retail access.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
              {(['all', 'utilities', 'lifestyle', 'infrastructure', 'nature'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedAmenityFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                    selectedAmenityFilter === cat
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

        {/* Amenities Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAmenities.map((amenity, idx) => (
            <ScrollReveal key={amenity.id} direction="up" delay={(idx % 3) * 80}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={amenity.image}
                      alt={amenity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#7b002c] text-white shadow-sm border border-white/20">
                        {amenity.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#7b002c] transition-colors">
                      {amenity.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Operational Asset
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">Block C</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. CURRENT PRICE SCHEDULE & VALUATION TABLE               */}
      {/* ========================================================= */}
      <section id="pricing-matrix" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Current Market Valuations</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Block C Plot Pricing Schedule & Square Foot Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Transparent market rates for resale files and on-ground plot cuts in Faisal Hills Block C:
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 text-xs font-bold">
            {(['All', 'Residential', 'Commercial'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedPriceCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedPriceCategory === cat
                    ? 'bg-[#7b002c] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Cards Layout (Clean, Responsive) */}
        <div className="block sm:hidden space-y-3.5">
          {filteredPriceSchedule.map((row, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900">{row.size}</h4>
                  <span className="text-[11px] text-slate-500">
                    {row.dimensions} • {row.sqFeet}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    row.category === 'Residential'
                      ? 'bg-rose-50 text-[#7b002c] border border-rose-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {row.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">
                    Price Range
                  </span>
                  <strong className="font-serif font-bold text-sm text-[#7b002c] block mt-0.5">
                    {row.priceRange}
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">
                    Possession Status
                  </span>
                  <strong className="text-emerald-700 font-bold block mt-0.5 text-xs">{row.possession}</strong>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100/80 leading-relaxed">
                <span className="font-semibold text-slate-700">Market Insight: </span>
                {row.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop / Tablet Table Layout */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full text-left text-xs border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Plot Size</th>
                <th className="py-3.5 px-4 font-bold">Dimensions</th>
                <th className="py-3.5 px-4 font-bold">Area (Sq.Ft / Yds)</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Price Range</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Market Highlight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredPriceSchedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold font-serif text-sm text-slate-900 whitespace-nowrap">
                    {row.size}
                  </td>
                  <td className="py-4 px-4 text-slate-600 whitespace-nowrap">{row.dimensions}</td>
                  <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                    {row.sqFeet} <span className="text-slate-400">({row.sqYards})</span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        row.category === 'Residential'
                          ? 'bg-rose-50 text-[#7b002c] border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {row.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-serif font-bold text-sm text-[#7b002c] whitespace-nowrap">
                    {row.priceRange}
                  </td>
                  <td className="py-4 px-4 text-emerald-700 font-semibold whitespace-nowrap">{row.possession}</td>
                  <td className="py-4 px-4 text-slate-600 text-xs max-w-xs">{row.highlight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. INVESTMENT ADVANTAGES / WHY CHOOSE BLOCK C            */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Investment Thesis & ROI Drivers</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Why Invest in Faisal Hills Block C?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Discover the 6 key growth catalysts making Block C one of the highest capital appreciation sectors in Taxila and Rawalpindi:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center border border-rose-100">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Nearest M-1 Motorway Gateway</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Block C enjoys direct proximity to the dedicated M-1 Motorway interchange, enabling swift 20-minute commutes to Islamabad Zero Point and the airport.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Hills Walk Commercial Hub</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Walking-distance access to the premier Hills Walk lifestyle promenade ensures high tenant desirability, strong rental yields, and retail vibrancy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Active RO Water Plant</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Unlike many competing developments, Block C has fully delivered reverse-osmosis filtration plants providing continuous, pristine potable drinking water.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Elevated Margalla Vistas</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Natural valley breezes and unblocked views of the Margalla mountain range make Block C homes prime candidates for luxury double-unit villas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">100% RDA Approved & Clear NOC</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Full Rawalpindi Development Authority planning permission with zero litigation risk and transparent biometric deed transfers at the Zedem head office.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center border border-rose-100">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">High Liquidity & Fast Resale</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              The 5 Marla and 8 Marla cuts in Block C represent the most actively traded residential files in Faisal Hills with rapid turnaround and solid gains.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. DIRECT LEAD CONSULTATION & BOOKING FORM               */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5" />
              <span>Official Sales Consultation</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Schedule a Site Visit or Request Block C File Verification
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
              Connect directly with our senior Faisal Hills advisory desk. Receive on-ground plot video walkthroughs, instant biometric allotment file checks, and updated resale inventory.
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero hidden commission or unauthorized dealer margins</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Immediate Zedem biometrics & registry verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated support for overseas Pakistani buyers (NICOP)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
            {leadSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-slate-600">
                  Thank you, <strong>{leadName}</strong>. Our advisor will reach you shortly on WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Preferred Plot Size</label>
                    <select
                      value={leadPlotSize}
                      onChange={(e) => setLeadPlotSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    >
                      <option value="5 Marla">5 Marla (25×50)</option>
                      <option value="8 Marla">8 Marla (30×60)</option>
                      <option value="10 Marla">10 Marla (35×70)</option>
                      <option value="14 Marla">14 Marla (40×80)</option>
                      <option value="1 Kanal">1 Kanal (50×90)</option>
                      <option value="4 Marla Commercial">4 Marla Commercial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Your Requirements / Question</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Looking for park-facing 10 Marla plot near Hills Walk..."
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmittingLead ? 'Submitting...' : 'Submit & Connect on WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. EXPANDING PROJECTS SHOWCASE                           */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Master Community Navigation</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                Explore All Faisal Hills Sectors & Blocks
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Compare Block C with adjoining executive and residential enclaves across Faisal Hills:
              </p>
            </div>
            <Link
              href="/faisal-hills-blocks"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:underline"
            >
              <span>View All Blocks Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          <ExpandingProjectsShowcase
            items={defaultFaisalHillsBlocks}
            defaultActiveIndex={2}
            containerHeightClass="h-[440px] sm:h-[480px] lg:h-[520px]"
            roundedClass="rounded-2xl sm:rounded-3xl"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 13. ROAD NETWORK & TRAVEL TIMES WITH INTERACTIVE MAP      */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Car className="w-3.5 h-3.5" />
              <span>Accessibility & Commuting Links</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Block C Distance Matrix & Motorway Connectivity
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Enjoy signal-free commuting to Islamabad and Taxila via the dedicated M-1 Motorway link and 225ft Grand Boulevard.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 6 Distance Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blockCTravelTimes.map((dest, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 40}>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-2.5 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif font-bold text-sm text-slate-900">{dest.destination}</h4>
                    <span className="text-xs font-bold text-[#7b002c] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 shrink-0">
                      {dest.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span>
                      Distance: <strong>{dest.distance}</strong>
                    </span>
                    <span className="italic text-[11px] text-slate-400 truncate max-w-[170px]">{dest.note}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right Column: Live Interactive Google Map Embed */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between gap-2 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="space-y-0.5">
                <strong className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7b002c]" />
                  <span>Block C Live Location Map</span>
                </strong>
                <span className="text-[11px] text-slate-500 block">Adjacent to Hills Walk & M-1 Link, Taxila</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Faisal+Hills+Taxila+Block+C"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-xl shadow-xs transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <Navigation className="w-3 h-3" />
                <span>Open Map</span>
                <ExternalLink className="w-2.5 h-2.5 text-white/80" />
              </a>
            </div>

            <div className="relative w-full h-[320px] sm:h-[360px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <iframe
                title="Faisal Hills Block C Google Map Location"
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
      {/* 14. FAQS ACCORDION SECTION                                */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Block C Buying & Allotment FAQs
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans">
            Clear answers regarding Block C possession, RDA NOC approvals, plot transfer process, and investment upside.
          </p>
        </div>

        <FaqAccordion faqs={blockCFaqs} blockName="Block C" />
      </section>

      {/* Map Download Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        blockName="Block C"
      />
    </div>
  );
}
