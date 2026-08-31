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
  Navigation
} from 'lucide-react';
import LeadModal from '@/components/ui/LeadModal';
import {
  PlotItem,
  fetchPlots,
  submitLead,
  formatPlotPrice
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
    plotNumber: 'C-112',
    blockSlug: 'block-c',
    blockName: 'Block C',
    category: 'Residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 5250000,
    priceFormatted: 'PKR 52.5 Lacs',
    priceHistoryTrend: '+24% Annual',
    status: 'Available',
    facing: 'Standard',
    mapCoords: { x: 55, y: 48 },
    features: ['Adjacent to Sector Park', '40ft Carpeted Street', 'RO Water Pipeline Connected'],
    description: 'Prime 5 Marla residential plot located near central park with immediate possession.',
    image: '/images/imgi_5_Rectangle-1-1-scaled-e1766059628733.png'
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
    image: '/images/imgi_27_Rectangle-1-scaled.png'
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
    image: '/images/imgi_44_Executive-Block.webp'
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
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg'
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
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
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
    image: '/images/faisal-forest.jpg',
    tag: 'Operational Asset',
    features: ['24/7 Filtered Mineral Water', 'Deep Tube-Well Sourced', 'Zero Water Scarcity', 'Maintained by Zedem']
  },
  {
    id: 'hills-walk',
    title: 'Direct Hills Walk Promenade Access',
    category: 'lifestyle',
    description: 'Direct pedestrian link to the vibrant Hills Walk commercial district featuring alfresco restaurants, cafes, and flagship retail boutiques.',
    image: '/images/faisalarc (2).webp',
    tag: 'Lifestyle Anchor',
    features: ['Pedestrian Walking Arcades', 'Food Street & Fine Dining', 'High Retail Footfall', 'Corporate Office Hub']
  },
  {
    id: 'mosque',
    title: 'Grand Sector Jamia Mosque',
    category: 'infrastructure',
    description: 'Architecturally stunning air-conditioned community mosque with dedicated ablution zones, lush courtyards, and Quran academy.',
    image: '/images/imgi_46_Mosques.webp',
    tag: 'Delivered Landmark',
    features: ['Air-Conditioned Prayer Halls', 'Lush Marble Courtyards', 'Separate Ladies Section', 'Imam Residence']
  },
  {
    id: 'central-park',
    title: 'Central Theme Park & Glow Garden',
    category: 'nature',
    description: 'Sprawling green reservations with children play grounds, illuminated evening walking tracks, and gazebos facing the mountains.',
    image: '/images/imgi_45_Glow-garden.webp',
    tag: 'Recreational Green',
    features: ['Illuminated Night Walkways', 'Children Play Arena', 'Margalla Mountain Breeze', 'Jogging Track']
  },
  {
    id: 'underground-utilities',
    title: '100% Underground Electrification',
    category: 'utilities',
    description: 'Clean visual skyline with zero dangling wires, heavy underground power cables, grid transformer stations, and LED street lighting.',
    image: '/images/imgi_44_Executive-Block.webp',
    tag: 'Smart Infrastructure',
    features: ['Uninterrupted Grid Backup', 'Underground High-Tension Cables', 'Zero Overhead Wiring', 'LED Street Lamps']
  },
  {
    id: 'gated-security',
    title: 'Dedicated 24/7 Gated Security & Surveillance',
    category: 'security',
    description: 'Rapid-response mobile patrolling squads, barrier-controlled check posts, and smart high-definition CCTV perimeter monitoring.',
    image: '/images/faisalhillarc.jpg',
    tag: '24/7 Secure',
    features: ['HD CCTV Perimeter Coverage', 'Biometric Automated Checkpoints', 'Dedicated Mobile Patrol Squads', 'Gated Sector Barrier']
  }
];

// Block C Travel Times & Landmarks
const blockCTravelTimes = [
  {
    destination: 'Hills Walk Commercial Boulevard',
    distance: '0.8 km',
    time: '2 Mins',
    note: 'Direct pedestrian walkway to retail arcades & dining'
  },
  {
    destination: 'Dedicated M-1 Motorway Link',
    distance: '1.8 km',
    time: '3 Mins',
    note: 'Fastest Motorway connection across Faisal Hills'
  },
  {
    destination: 'Block B Central Sports Complex',
    distance: '1.2 km',
    time: '2 Mins',
    note: 'Direct internal avenue connection'
  },
  {
    destination: 'New City Phase 2 Commercial Arcades',
    distance: '1.5 km',
    time: '3 Mins',
    note: 'Adjacent adjoining boundary'
  },
  {
    destination: 'Grand GT Road (N-5 Highway)',
    distance: '2.5 km',
    time: '5 Mins',
    note: 'Via 225ft Grand Boulevard'
  },
  {
    destination: 'Taxila Museum & Cantt Commercials',
    distance: '5.5 km',
    time: '8 Mins',
    note: 'Quick heritage & urban convenience'
  },
  {
    destination: 'Islamabad Toll Plaza & Zero Point',
    distance: '24.0 km',
    time: '22 Mins',
    note: 'Signal-free drive via M-1 Motorway'
  }
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

const blockCWhyInvestReasons = [
  {
    icon: Car,
    title: 'Nearest M-1 Motorway Gateway',
    desc: 'Block C enjoys direct proximity to the dedicated M-1 Motorway interchange, enabling swift 20-minute commutes to Islamabad Zero Point and the airport.',
    bg: 'bg-rose-50',
    text: 'text-[#7b002c]',
    border: 'border-rose-100'
  },
  {
    icon: ShoppingBag,
    title: 'Hills Walk Commercial Hub',
    desc: 'Walking-distance access to the premier Hills Walk lifestyle promenade ensures high tenant desirability, strong rental yields, and retail vibrancy.',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-100'
  },
  {
    icon: Droplets,
    title: 'Active RO Water Plant',
    desc: 'Unlike many competing developments, Block C has fully delivered reverse-osmosis filtration plants providing continuous, pristine potable drinking water.',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-100'
  },
  {
    icon: Compass,
    title: 'Elevated Margalla Vistas',
    desc: 'Natural valley breezes and unblocked views of the Margalla mountain range make Block C homes prime candidates for luxury double-unit villas.',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-100'
  },
  {
    icon: ShieldCheck,
    title: '100% RDA Approved & Clear NOC',
    desc: 'Full Rawalpindi Development Authority planning permission with zero litigation risk and transparent biometric deed transfers at the Zedem head office.',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-100'
  },
  {
    icon: TrendingUp,
    title: 'High Liquidity & Fast Resale',
    desc: 'The 5 Marla and 8 Marla cuts in Block C represent the most actively traded residential files in Faisal Hills with rapid turnaround and solid gains.',
    bg: 'bg-rose-50',
    text: 'text-[#7b002c]',
    border: 'border-rose-100'
  }
];

// Block Comparison Matrix
const blockComparisonData = [
  {
    block: 'Block C (This Sector)',
    usp: 'Nearest M-1 Motorway Gateway & Direct Hills Walk Promenade',
    priceEntry: 'PKR 48 Lacs – 2.45 Cr',
    possession: 'Possession Ready (95%+ Completed)',
    bestFor: 'High liquidity, modern living near retail & M-1 corridor',
    badge: 'Strategic Growth',
    isCurrent: true
  },
  {
    block: 'Executive Block',
    usp: 'Direct Main GT Road entrance & Faisal Jewel skyscraper',
    priceEntry: 'PKR 65 Lacs – 3.20 Cr',
    possession: '100% Possession Ready',
    bestFor: 'High prestige, commercial footfall & instant construction',
    badge: 'Society Frontage',
    isCurrent: false
  },
  {
    block: 'Prime Block',
    usp: 'Highest elevation, private gated crest & 4-year installment plan',
    priceEntry: 'Fixed Launch Rates on 4-Year Plan',
    possession: 'Under Fast-Track Earthwork',
    bestFor: 'Long-term luxury holding & installment flexibility',
    badge: 'Ultra-Luxury Crest',
    isCurrent: false
  },
  {
    block: 'Block A',
    usp: 'Most populated sector, Grand Jamia Mosque & 1-min GT Road',
    priceEntry: 'PKR 55 Lacs – 2.80 Cr',
    possession: '100% Possession & Inhabited',
    bestFor: 'Immediate family living & ready houses',
    badge: 'Fully Populated',
    isCurrent: false
  },
  {
    block: 'Block B',
    usp: '225ft Grand Boulevard spine & Central Sports Complex',
    priceEntry: 'PKR 52 Lacs – 2.60 Cr',
    possession: 'Possession Ready (90%+ Done)',
    bestFor: 'Sports enthusiasts & central lifestyle living',
    badge: 'Sports Hub',
    isCurrent: false
  },
  {
    block: 'Block D',
    usp: 'Peaceful natural Margalla springs & proposed Medical City',
    priceEntry: 'PKR 40 Lacs – 2.10 Cr',
    possession: 'Development 85% Completed',
    bestFor: 'Most economical entry price & maximum % ROI',
    badge: 'Eco-Living & Best Value',
    isCurrent: false
  }
];

export default function BlockCContent() {
  const [activeWhyInvestOption, setActiveWhyInvestOption] = useState<number | null>(0);
  const [activeLandmarkIndex, setActiveLandmarkIndex] = useState<number | null>(0);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlotForInquiry, setSelectedPlotForInquiry] = useState<PlotItem | null>(null);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [selectedAmenityFilter, setSelectedAmenityFilter] = useState('all');
  const [selectedPriceCategory, setSelectedPriceCategory] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [allPlots, setAllPlots] = useState<PlotItem[]>([]);

  // Lead Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plotSize: '5 Marla',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const filteredPlots = useMemo(() => {
    if (selectedSizeFilter === 'All') return blockCPlots;
    if (selectedSizeFilter === 'Commercial') {
      return blockCPlots.filter((p) => p.category === 'Commercial');
    }
    return blockCPlots.filter((p) =>
      p.size.toLowerCase().includes(selectedSizeFilter.toLowerCase())
    );
  }, [blockCPlots, selectedSizeFilter]);

  const filteredPriceSchedule = useMemo(() => {
    if (selectedPriceCategory === 'All') return blockCPriceSchedule;
    return blockCPriceSchedule.filter((r) => r.category === selectedPriceCategory);
  }, [selectedPriceCategory]);

  const filteredAmenities = useMemo(() => {
    if (selectedAmenityFilter === 'all') return blockCAmenities;
    return blockCAmenities.filter((a) => a.category === selectedAmenityFilter);
  }, [selectedAmenityFilter]);

  const otherBlocks = useMemo(() => {
    return defaultFaisalHillsBlocks.filter((b) => b.id !== 'block-c' && b.href !== '/blocks/block-c');
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        interest: `Block C (${formData.plotSize})${formData.email ? ` - Email: ${formData.email}` : ''}`,
        message: formData.message || 'Block C inquiry via dedicated sector page'
      });
      setFormSubmitted(true);
    } catch {
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">

      {/* ========================================================= */}
      {/* 1. FAISAL HILLS BLOCK C OVERVIEW                          */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative with See More toggle */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h1"
                  text="Faisal Hills Block C Overview"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    Faisal Hills Block C is one of the most strategically positioned residential and commercial sectors in the master-planned society. Nestled between Block B and New City Phase 2, Block C is renowned for its rapid connectivity to the dedicated M-1 Motorway link, uninterrupted Margalla mountain breezes, and direct walking frontage to the upscale Hills Walk retail boulevard.
                  </p>

                  {isOverviewExpanded && (
                    <div className="space-y-3 pt-1 animate-fadeIn">
                      <p>
                        Spanning over 2,600 residential and commercial plots, Sector C features fully functional on-ground infrastructure. This includes operational high-capacity reverse-osmosis (RO) drinking water filtration stations, 100% underground electrification, modern storm water drainage systems, and a paved 40ft to 150ft boulevard network.
                      </p>
                      <p>
                        With 95%+ development completion and possession ready status, Block C offers immediate home construction opportunities, high tenant rental demand driven by Hills Walk, and solid long-term capital appreciation for astute real estate investors.
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

          {/* Right Column: Visual Showcase Card of Block C */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal direction="up" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950 min-h-[320px] sm:min-h-[360px] flex flex-col justify-between group">
                <img
                  src="/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg"
                  alt="Faisal Hills Block C Panoramic View"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-black/20" />

                {/* Top Status Tag */}
                <div className="relative z-10 p-5 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white bg-[#7b002c] px-3 py-1 rounded-full shadow-md border border-white/20">
                    Possession Ready
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    Active RO Water Grid
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="relative z-10 p-5 text-white space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    Scenic Hillside Sector
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white">
                    Faisal Hills Block C Sector Panorama
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    Adjacent to Hills Walk Promenade & M-1 Motorway Gateway.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. LOCATION & ACCESSIBILITY                               */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-3 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Block C Location, Distance Matrix & Motorway Connectivity
            </h2>
            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
              <p>
                Faisal Hills Block C is located on the prestigious western corridor between Block B and New City Phase 2. With immediate access to the dedicated M-1 Motorway link, GT Road (N-5), and 225ft Grand Boulevard, residents enjoy effortless commutes across Islamabad and Rawalpindi.
              </p>

              {isLocationExpanded && (
                <div className="space-y-3 animate-fadeIn">
                  <p>
                    Positioned nearest to the upcoming dedicated M-1 Motorway interchange, Block C offers unmatched highway connectivity allowing direct travel to Islamabad Zero Point and Islamabad International Airport in under 20-25 minutes.
                  </p>
                  <p>
                    The sector borders the Hills Walk commercial promenade and main boulevard grid, providing seamless access to top schools, healthcare facilities, and central commercial hubs across the twin cities.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsLocationExpanded(!isLocationExpanded)}
                className="text-[#7b002c] hover:text-[#9e1245] font-semibold underline underline-offset-4 cursor-pointer text-xs sm:text-sm transition-colors block pt-1"
              >
                {isLocationExpanded ? 'See less' : 'See more'}
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
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
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 3. NEARBY LANDMARKS & COMMUTE DISTANCES                   */}
      {/* ========================================================= */}
      <section id="nearby-landmarks" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-5 sm:space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <TextReveal
              as="h2"
              text="Nearby Landmarks & Commute Distances from Block C"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              staggerDelay={65}
              direction="left"
            />
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Verified drive times and connectivity distances to commercial promenades, sports arenas, motorways, and cultural landmarks from Sector C.
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile View: Compact Options Accordion List */}
        <div className="block sm:hidden space-y-2">
          {blockCTravelTimes.map((dest, idx) => {
            const isSelected = activeLandmarkIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveLandmarkIndex(isSelected ? null : idx)}
                className={`rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-rose-50/60 border-[#7b002c]/40 shadow-xs'
                    : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/70'
                }`}
              >
                <div className="p-3 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                      isSelected ? 'bg-[#7b002c] text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-serif font-bold text-xs text-slate-900 truncate">
                      {dest.destination}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-bold text-[#7b002c] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      {dest.time}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${
                        isSelected ? 'rotate-180 text-[#7b002c]' : ''
                      }`}
                    />
                  </div>
                </div>

                {isSelected && (
                  <div className="px-3.5 pb-3 pt-1 text-[11px] text-slate-600 border-t border-rose-100/80 flex items-center justify-between animate-fadeIn bg-white/60">
                    <span>Distance: <strong className="text-slate-900 font-semibold">{dest.distance}</strong></span>
                    <span className="italic text-slate-500">{dest.note}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop & Tablet View: Grid Cards */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {blockCTravelTimes.map((dest, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 40}>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#7b002c]/40 hover:bg-white hover:shadow-md transition-all space-y-2 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif font-bold text-sm text-slate-900">{dest.destination}</h4>
                  <span className="text-xs font-bold text-[#7b002c] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 shrink-0">
                    {dest.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                  <span>Distance: <strong>{dest.distance}</strong></span>
                  <span className="italic text-[11px] text-slate-400 truncate max-w-[180px]">{dest.note}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. MASTER PLAN & SECTOR LAYOUT                            */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Faisal Hills Block C Master Blueprint & Cuts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              High-resolution zoning blueprint highlighting street grid numbers, central parks, green eco corridors, and Hills Walk promenade.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
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

        {/* Master Plan 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map Preview Card */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
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
            </div>

            {/* Commercial Opportunities */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
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
      {/* 5. ON-GROUND AMENITIES & INFRASTRUCTURE SHOWCASE          */}
      {/* ========================================================= */}
      <section id="amenities" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
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
              {(['all', 'utilities', 'lifestyle', 'infrastructure', 'nature', 'security'] as const).map((cat) => (
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

        {/* Alternating Zig-Zag Amenity Rows */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {filteredAmenities.map((amenity, idx) => {
            const isImageRight = idx % 2 === 0;

            return (
              <ScrollReveal key={amenity.id} direction="up" delay={idx * 50}>
                <div
                  className="p-4 sm:p-7 lg:p-10 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/30 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center overflow-hidden w-full"
                >
                  {/* Content Side */}
                  <div className={`lg:col-span-6 space-y-3.5 sm:space-y-4 ${!isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900 leading-snug">
                      {amenity.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed font-sans">
                      {amenity.description}
                    </p>

                    {/* Features Badges */}
                    {amenity.features && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {amenity.features.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200/80"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Delivered & Operational</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400 font-semibold">Faisal Hills Block C</span>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className={`lg:col-span-6 w-full ${!isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200 h-52 sm:h-64 lg:h-[340px] bg-slate-950 group/img">
                      <img
                        src={amenity.image}
                        alt={amenity.title}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                        <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                          Sector Landmark #{idx + 1}
                        </span>
                        <h4 className="font-serif font-bold text-base sm:text-lg lg:text-xl text-white drop-shadow-sm line-clamp-1">
                          {amenity.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. VERIFIED PLOTS LISTED FOR SALE (BLOCK C)               */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Verified Plots for Sale in Faisal Hills Block C
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Explore live on-ground and file listings with direct seller pricing and biometric transfer:
            </p>
          </div>

          {/* Plot Size Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
            {['All', '5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal', 'Commercial'].map((size) => (
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
                  {/* Top Image Banner */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-c`}
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                    title={`Browse all ${plot.size} plots in inventory`}
                  >
                    <img
                      src={plot.image || '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'}
                      alt={`Plot #${plot.plotNumber} - ${plot.size}`}
                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full font-mono text-xs font-bold">
                        Plot #{plot.plotNumber}
                      </span>
                      <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full border border-emerald-400/40 shadow-xs">
                        {plot.status || 'Available'}
                      </span>
                    </div>

                    {/* Bottom Image Overlay Details */}
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

                  {/* Body Content */}
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
                        <span>{plot.priceHistoryTrend || '+24.0% annual ROI trend'}</span>
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

                {/* Card Actions */}
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
                      href={`https://wa.me/923331113177?text=Hello!%20I%20am%20interested%20in%20Faisal%20Hills%20Block%20C%20Plot%20${plot.plotNumber}%20(${plot.size}).%20Please%20share%20latest%20price%20and%20transfer%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center cursor-pointer shrink-0 shadow-xs"
                      title="Chat on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
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
            href="https://wa.me/923331113177?text=Hello!%20I%20want%20to%20list%20or%20sell%20my%20plot%20in%20Faisal%20Hills%20Block%20C."
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
      {/* 7. DYNAMIC PLOT SERIES EXPLORER                           */}
      {/* ========================================================= */}
      <section id="plot-series" className="scroll-mt-28">
        <ScrollReveal direction="up" delay={50}>
          <DynamicPlotSeriesExplorer blockSlug="block-c" blockName="Block C" />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 8. CURRENT PRICE SCHEDULE & VALUATION TABLE               */}
      {/* ========================================================= */}
      <section id="pricing" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Block C Plot Pricing Schedule & Square Foot Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Transparent market rates for resale files and on-ground plots in Faisal Hills Block C:
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

        {/* Mobile View: Clean Responsive Price Cards */}
        <div className="block sm:hidden space-y-3">
          {filteredPriceSchedule.map((row, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7b002c]" />
                  <span className="font-bold text-sm text-slate-900">{row.size}</span>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
                  {row.possession}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-sans">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Dimensions</span>
                  <span className="text-slate-800 font-mono font-medium">{row.dimensions}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Area</span>
                  <span className="text-slate-800 font-medium">{row.sqYards} <span className="text-slate-400 text-[10px]">({row.sqFeet})</span></span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Market Price Band</span>
                  <span className="font-serif font-bold text-sm text-[#7b002c]">{row.priceRange}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, plotSize: row.size }));
                    setIsLeadModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <span>Inquire</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Full Table */}
        <div className="hidden sm:block rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-900 text-white font-serif">
                  <th className="p-4 sm:p-5 whitespace-nowrap">Plot Category & Cut</th>
                  <th className="p-4 sm:p-5 whitespace-nowrap">Dimensions</th>
                  <th className="p-4 sm:p-5 whitespace-nowrap">Total Area</th>
                  <th className="p-4 sm:p-5 whitespace-nowrap">Market Price Band</th>
                  <th className="p-4 sm:p-5 whitespace-nowrap">Possession Status</th>
                  <th className="p-4 sm:p-5 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filteredPriceSchedule.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-[#7b002c]" />
                      <span>{row.size}</span>
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-slate-600 whitespace-nowrap">{row.dimensions}</td>
                    <td className="p-4 sm:p-5 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{row.sqYards}</div>
                      <div className="text-[11px] text-slate-400">{row.sqFeet}</div>
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-[#7b002c] font-serif text-sm sm:text-base whitespace-nowrap">
                      {row.priceRange}
                    </td>
                    <td className="p-4 sm:p-5 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                        {row.possession}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, plotSize: row.size }));
                          setIsLeadModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        Inquire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. WHY INVEST IN FAISAL HILLS BLOCK C & COMPARISON        */}
      {/* ========================================================= */}
      <section id="why-invest" className="scroll-mt-28 space-y-8">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Why Invest in Faisal Hills Block C?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Discover the 6 key growth catalysts making Block C one of the highest capital appreciation sectors in Taxila and Rawalpindi:
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile View: Compact Interactive Accordion List */}
        <div className="block sm:hidden space-y-2.5">
          {blockCWhyInvestReasons.map((item, idx) => {
            const isSelected = activeWhyInvestOption === idx;
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveWhyInvestOption(isSelected ? null : idx)}
                className={`rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'bg-rose-50/50 border-[#7b002c]/40 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#7b002c] text-white border-[#7b002c]'
                          : `${item.bg} ${item.text} ${item.border}`
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <strong
                      className={`font-semibold text-xs transition-colors truncate ${
                        isSelected ? 'text-[#7b002c]' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </strong>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transform transition-transform duration-300 ${
                      isSelected ? 'rotate-180 text-[#7b002c]' : ''
                    }`}
                  />
                </div>

                {isSelected && (
                  <div className="px-3.5 pb-3.5 pt-0 text-xs text-slate-600 leading-relaxed font-sans border-t border-rose-100/70 mt-0.5 pt-2.5">
                    {item.desc}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop/Tablet View: Clean 6-Card Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blockCWhyInvestReasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-3"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${item.bg} ${item.text} flex items-center justify-center border ${item.border}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sector Comparison Table: Block C vs Other Blocks */}
        <div className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              Sector Comparison: Block C vs Other Faisal Hills Blocks
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Compare positioning, price bands, and possession status across all sectors:
            </p>
          </div>

          {/* Mobile View: Comparison Cards */}
          <div className="block sm:hidden space-y-3">
            {blockComparisonData.map((row, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                  row.isCurrent
                    ? 'bg-rose-50/70 border-[#7b002c]/40 shadow-xs'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {row.isCurrent && <span className="w-2.5 h-2.5 rounded-full bg-[#7b002c] shrink-0" />}
                    <span className="font-bold text-sm text-slate-900">{row.block}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    row.isCurrent ? 'bg-[#7b002c] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {row.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-700 font-sans leading-relaxed">
                  {row.usp}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs font-sans">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Price Range</span>
                    <span className="font-serif font-bold text-sm text-[#7b002c]">{row.priceEntry}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Possession</span>
                    <span className="text-xs font-medium text-slate-800">{row.possession}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-sans pt-1">
                  <span className="font-semibold text-slate-700">Best For: </span>
                  {row.bestFor}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop / Tablet View: Full Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-slate-900 text-white font-serif">
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">Block / Sector</th>
                  <th className="p-3.5 sm:p-4">Key Distinguishing USP</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">Price Range Band</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">Possession Status</th>
                  <th className="p-3.5 sm:p-4">Best Suited For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {blockComparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.isCurrent ? 'bg-rose-50/70 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-3.5 sm:p-4 text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {row.isCurrent && <span className="w-2 h-2 rounded-full bg-[#7b002c] shrink-0" />}
                        <span>{row.block}</span>
                      </div>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        row.isCurrent ? 'bg-[#7b002c] text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {row.badge}
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-700 font-sans">{row.usp}</td>
                    <td className="p-3.5 sm:p-4 font-serif font-bold text-[#7b002c] whitespace-nowrap">{row.priceEntry}</td>
                    <td className="p-3.5 sm:p-4 text-slate-700 font-sans whitespace-nowrap">{row.possession}</td>
                    <td className="p-3.5 sm:p-4 text-slate-600 text-xs font-sans">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. DIRECT LEAD CONSULTATION & BOOKING FORM               */}
      {/* ========================================================= */}
      <section id="contact-desk" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Schedule a Site Visit or Request Block C File Verification
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
              Connect directly with our senior Faisal Hills advisory desk. Receive on-ground plot video walkthroughs, instant biometric allotment file checks, and updated resale inventory.
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero service charge on official file verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom video tours available for overseas Pakistanis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated Zedem International transfer facilitation</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs">
              {formSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-emerald-900">Inquiry Received!</h4>
                  <p className="text-xs text-emerald-700 font-sans">
                    Our Faisal Hills Block C property desk will reach out with the complete price sheet and plot inventory within 15 minutes.
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
                        <option value="4 Marla Commercial">4 Marla Commercial</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Specific Requirements</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Inquiring about park-facing or corner 5/8/10 Marla plot in Block C..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#7b002c]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Official Block C Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. OTHER BLOCKS / SECTORS OF FAISAL HILLS                */}
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
            defaultActiveIndex={2}
            containerHeightClass="h-[440px] sm:h-[480px] lg:h-[520px]"
            roundedClass="rounded-2xl sm:rounded-3xl"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 12. FAQS ACCORDION SECTION                                */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-5 text-center flex flex-col items-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Block C Buying & Allotment FAQs
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl">
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

      {/* Lead Inquiry Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedPlotForInquiry(null);
        }}
        defaultBlock="Block C"
        defaultPlot={selectedPlotForInquiry ? `Plot #${selectedPlotForInquiry.plotNumber} (${selectedPlotForInquiry.size})` : undefined}
        interest={selectedPlotForInquiry ? `${selectedPlotForInquiry.size} ${selectedPlotForInquiry.category} in Block C` : 'Block C General Inquiry'}
      />
    </div>
  );
}
