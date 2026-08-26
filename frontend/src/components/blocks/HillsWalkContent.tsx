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
  Navigation,
  Utensils,
  Tv,
  FileText
} from 'lucide-react';
import LeadModal from '@/components/ui/LeadModal';
import {
  blocksData,
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
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';

// Price schedule benchmark rows for Hills Walk Commercial Promenade
interface HillsWalkPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  sqFeet: string;
  category: 'Commercial';
  priceRange: string;
  approval: string;
  highlight: string;
}

const hillsWalkPriceSchedule: HillsWalkPriceRow[] = [
  {
    size: '4 Marla Commercial Plaza',
    dimensions: '30 × 30',
    sqYards: '100 Sq. Yds',
    sqFeet: '900 Sq. Ft',
    category: 'Commercial',
    priceRange: 'PKR 2.20 Cr – 2.80 Cr',
    approval: 'Ground + 4 Storey',
    highlight: 'Prime promenade frontage ideal for retail cafes, fashion boutiques, and specialty clinics.'
  },
  {
    size: '5.8 Marla Boulevard Commercial',
    dimensions: '40 × 40',
    sqYards: '145 Sq. Yds',
    sqFeet: '1,305 Sq. Ft',
    category: 'Commercial',
    priceRange: 'PKR 3.50 Cr – 4.80 Cr',
    approval: 'Ground + 5 Storey',
    highlight: 'High footfall avenue corner plot designed for corporate banking hubs, pharmacies, and brand flagship outlets.'
  },
  {
    size: '8 Marla Luxury Commercial Arcade',
    dimensions: '45 × 40',
    sqYards: '200 Sq. Yds',
    sqFeet: '1,800 Sq. Ft',
    category: 'Commercial',
    priceRange: 'PKR 5.20 Cr – 6.90 Cr',
    approval: 'Ground + 6 Storey',
    highlight: 'Flagship commercial cut overlooking central amphitheater and alfresco dining piazza.'
  },
  {
    size: '10 Marla Corporate Tower Plot',
    dimensions: '50 × 45',
    sqYards: '250 Sq. Yds',
    sqFeet: '2,250 Sq. Ft',
    category: 'Commercial',
    priceRange: 'PKR 7.80 Cr – 9.50 Cr',
    approval: 'High-Rise Commercial Approval',
    highlight: 'Anchor plot for multi-storey business towers, luxury hotel suites, and executive corporate headquarters.'
  }
];

// Fallback seed plots for Hills Walk with authentic local photography
const defaultHillsWalkPlots: PlotItem[] = [
  {
    id: 'plot-hw-01',
    plotNumber: 'HW-12',
    blockSlug: 'hills-walk',
    blockName: 'Hills Walk',
    category: 'Commercial',
    size: '4 Marla',
    dimensions: '30 × 30',
    price: 24500000,
    priceFormatted: 'PKR 2.45 Crore',
    priceHistoryTrend: '+28.5% annual capital ROI',
    status: 'Available',
    facing: 'Main Promenade Walkway',
    mapCoords: { x: 50, y: 50 },
    features: ['Main Pedestrian Promenade', 'Ground + 4 Approval', 'Direct Basement Parking Access'],
    description: 'Prime 4 Marla commercial plot on the European-style Hills Walk promenade with high retail footfall.',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg'
  },
  {
    id: 'plot-hw-02',
    plotNumber: 'HW-28',
    blockSlug: 'hills-walk',
    blockName: 'Hills Walk',
    category: 'Commercial',
    size: '5.8 Marla',
    dimensions: '40 × 40',
    price: 39500000,
    priceFormatted: 'PKR 3.95 Crore',
    priceHistoryTrend: '+32.0% commercial appreciation',
    status: 'Available',
    facing: 'Amphitheater Facing Corner',
    mapCoords: { x: 52, y: 52 },
    features: ['Dual Frontage Corner', 'Facing Outdoor Amphitheater', 'Rooftop Cafe NOC'],
    description: 'Exclusive 5.8 Marla corner plot with panoramic Margalla views, approved for multi-storey retail arcade.',
    image: '/images/faisalarc (3).jpg'
  },
  {
    id: 'plot-hw-03',
    plotNumber: 'HW-45',
    blockSlug: 'hills-walk',
    blockName: 'Hills Walk',
    category: 'Commercial',
    size: '8 Marla',
    dimensions: '45 × 40',
    price: 58500000,
    priceFormatted: 'PKR 5.85 Crore',
    priceHistoryTrend: '+34.2% high rental yield',
    status: 'Available',
    facing: 'Piazza & Water Feature',
    mapCoords: { x: 55, y: 54 },
    features: ['Water Cascade View', 'Ground + 6 Storey Approval', 'Dedicated Loading Bay'],
    description: 'Flagship 8 Marla commercial arcade cut overlooking central water fountains and luxury restaurant boulevard.',
    image: '/images/faisalarc (2).webp'
  },
  {
    id: 'plot-hw-04',
    plotNumber: 'HW-60',
    blockSlug: 'hills-walk',
    blockName: 'Hills Walk',
    category: 'Commercial',
    size: '4 Marla',
    dimensions: '30 × 30',
    price: 26000000,
    priceFormatted: 'PKR 2.60 Crore',
    priceHistoryTrend: '+26.8% annual capital ROI',
    status: 'Available',
    facing: 'East Promenade Avenue',
    mapCoords: { x: 58, y: 56 },
    features: ['Near Brand Flagship Outlets', 'Immediate Construction', 'Zero Litigation'],
    description: 'High visibility 4 Marla commercial plot ready for immediate construction with full RDA approval.',
    image: '/images/faisalarc (1).webp'
  },
  {
    id: 'plot-hw-05',
    plotNumber: 'HW-78',
    blockSlug: 'hills-walk',
    blockName: 'Hills Walk',
    category: 'Commercial',
    size: '10 Marla',
    dimensions: '50 × 45',
    price: 84000000,
    priceFormatted: 'PKR 8.40 Crore',
    priceHistoryTrend: '+38.5% corporate demand',
    status: 'Available',
    facing: 'Main Boulevard Junction',
    mapCoords: { x: 60, y: 58 },
    features: ['Corporate Tower Zoning', 'High-Speed Elevator Core', 'Direct 225ft Boulevard Link'],
    description: 'Premium 10 Marla corporate tower plot designed for multinational headquarters, banks, and serviced suites.',
    image: '/images/faisal-jewel.jpg'
  },
  {
    id: 'plot-hw-06',
    plotNumber: 'HW-92',
    blockSlug: 'hills-walk',
    blockName: 'Hills Walk',
    category: 'Commercial',
    size: '5.8 Marla',
    dimensions: '40 × 40',
    price: 42000000,
    priceFormatted: 'PKR 4.20 Crore',
    priceHistoryTrend: '+30.5% high rental return',
    status: 'Available',
    facing: 'West Alfresco Promenade',
    mapCoords: { x: 62, y: 60 },
    features: ['Alfresco Dining Zone', 'Wide Pedestrian Sidewalk', 'Direct Zedem Biometric Transfer'],
    description: 'Prime 5.8 Marla commercial cut in the designated fine dining district of Hills Walk with high evening footfall.',
    image: '/images/imgi_38_Faisal-Hills-site-home-page-header.webp'
  }
];

// Hills Walk Amenities List with Distinct Photography
const hillsWalkAmenities = [
  {
    id: 'pedestrian-promenade',
    title: 'European-Style Open-Air Pedestrian Promenade',
    category: 'lifestyle',
    description: 'A pedestrian-first 80ft wide boulevard designed with cobblestone paving, tree-shaded seating, designer street lamps, and water fountains.',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
    tag: 'Signature Landmark',
    features: ['80ft Wide Pedestrian Zone', 'Cobblestone Street Paving', 'Outdoor Cafe Seating', 'Zero Traffic Congestion']
  },
  {
    id: 'amphitheater',
    title: 'Open-Air Community Amphitheater',
    category: 'lifestyle',
    description: 'Dedicated modern open-air arena for community cultural events, seasonal festivals, live musical performances, and weekend celebrations.',
    image: '/images/faisal-park.jpg',
    tag: 'Entertainment Core',
    features: ['Tiered Seating Arena', 'HD Outdoor Screen', 'Acoustic Sound System', 'Lush Surrounding Terraces']
  },
  {
    id: 'parking-plaza',
    title: 'Multi-Level Smart Basement Car Parking',
    category: 'infrastructure',
    description: 'Multi-storey subterranean parking facility accommodating 500+ vehicles with smart electronic parking guidance and EV charging bays.',
    image: '/images/faisalhillarc.jpg',
    tag: '500+ Capacity',
    features: ['500+ Car Basement Bays', 'Smart Sensor Guidance', 'EV Charging Points', '24/7 Security Attendants']
  },
  {
    id: 'rooftop-dining',
    title: 'Rooftop Margalla Dining & Alfresco Cafes',
    category: 'lifestyle',
    description: 'Zoned rooftop restaurants offering panoramic Margalla mountain sunsets, fine dining cuisine, coffee lounges, and executive meeting terraces.',
    image: '/images/faisalarc (2).webp',
    tag: 'Fine Dining Hub',
    features: ['Margalla Mountain Views', 'Alfresco Terrace Seating', 'Top Culinary Brands', 'Executive VIP Lounges']
  },
  {
    id: 'retail-arcades',
    title: 'Multi-Storey Commercial Arcades (G+4 & G+6)',
    category: 'utilities',
    description: 'RDA-approved multi-storey commercial plazas designed for national fashion brands, banks, electronics showrooms, and healthcare diagnostic clinics.',
    image: '/images/faisalarc (3).jpg',
    tag: 'RDA Approved',
    features: ['High Ceilings & Large Glass Fronts', 'High-Speed Elevators', 'Backup Generator Grid', 'Central HVAC Conduits']
  },
  {
    id: 'security-hw',
    title: '24/7 Smart Security & CCTV Surveillance',
    category: 'security',
    description: 'Continuous high-definition perimeter monitoring, dedicated foot patrol squads, automated license plate readers, and rapid response safety teams.',
    image: '/images/imgi_44_Executive-Block.webp',
    tag: '24/7 Secure',
    features: ['HD CCTV Surveillance', 'Dedicated Mobile Patrol Squads', 'Biometric Automated Checkpoints', 'Emergency Medical Access']
  }
];

// Hills Walk Development Milestones
const hillsWalkDevelopmentMilestones = [
  {
    title: 'Main Promenade Earthwork & Levelling',
    progress: 95,
    status: 'Graded & Stabilized',
    desc: 'Pedestrian central axis graded with heavy base compaction and underground stormwater channels.',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg'
  },
  {
    title: 'Commercial Plaza Structural Grey Works',
    progress: 75,
    status: 'Multiple Plazas Under Construction',
    desc: 'Multiple multi-storey commercial plazas actively rising across Sector A and Sector B intersections.',
    image: '/images/faisalarc (3).jpg'
  },
  {
    title: 'Underground Electric Cabling & Ducting',
    progress: 85,
    status: 'High-Capacity Grid Laid',
    desc: 'Dedicated heavy commercial power transformers and underground high-voltage conduits installed.',
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg'
  },
  {
    title: 'Water Supply, Sanitation & Drainage',
    progress: 90,
    status: 'Trunk Conduits Connected',
    desc: 'Deep tube wells, high-capacity water reservoirs, and RCC sewerage lines fully linked.',
    image: '/images/faisalarc (1).webp'
  },
  {
    title: 'Cobblestone Paving & Walking Curbs',
    progress: 80,
    status: 'Paving Work in Progress',
    desc: 'Pedestrian walkways, curb stones, and designer LED street lamp foundations under active installation.',
    image: '/images/faisalhillarc.jpg'
  },
  {
    title: 'Amphitheater & Landscape Features',
    progress: 70,
    status: 'Terraces Formed',
    desc: 'Concrete tiers, central water cascade basins, and perimeter floral plantation belts taking shape.',
    image: '/images/faisal-park.jpg'
  }
];

// Hills Walk Travel Times
const hillsWalkTravelTimes = [
  { destination: 'Block C & Hills Walk Promenade', distance: '0.0 km', time: 'Direct Frontage', note: 'Immediate internal access' },
  { destination: 'Block B Sports Complex & Grand Boulevard', distance: '0.8 km', time: '2 Mins', note: 'Via 225ft Grand Boulevard' },
  { destination: 'Block A Grand Jamia Mosque', distance: '1.4 km', time: '3 Mins', note: 'Central avenue link' },
  { destination: 'Executive Block & Faisal Jewel Skyscraper', distance: '2.5 km', time: '5 Mins', note: 'Direct Boulevard drive' },
  { destination: 'M-1 Brahma Jhang Bahtar Interchange', distance: '3.5 km', time: '6 Mins', note: 'Direct Motorway access' },
  { destination: 'Grand GT Road (N-5 Highway Entrance)', distance: '3.9 km', time: '7 Mins', note: 'Via Arc Gate boulevard' }
];

// Hills Walk FAQs
const hillsWalkFaqs = [
  {
    question: 'What is Faisal Hills Walk?',
    answer: 'Hills Walk is Faisal Hills’ signature high-end commercial destination. Designed as a European-style open-air pedestrian promenade, it hosts luxury retail brands, rooftop alfresco restaurants, corporate office towers, and an outdoor amphitheater.'
  },
  {
    question: 'Where is Hills Walk located within Faisal Hills?',
    answer: 'Hills Walk is centrally situated between Block A, Block B, and Block C along the main society circulation spine. It directly connects the residential sectors to prime retail and dining amenities.'
  },
  {
    question: 'Is Hills Walk approved by the Rawalpindi Development Authority (RDA)?',
    answer: 'Yes, Hills Walk is 100% legally approved under the comprehensive Faisal Hills RDA NOC. Commercial plazas hold sanctioned Ground + 4 and Ground + 6 construction approvals with transparent biometric file transfers.'
  },
  {
    question: 'What commercial plot sizes are available in Hills Walk?',
    answer: 'Commercial plot cuts in Hills Walk range from 4 Marla (30×30), 5.8 Marla (40×40), 8 Marla (45×40), up to 10 Marla (50×45) corporate tower plots.'
  },
  {
    question: 'What is the projected rental yield for commercial plots in Hills Walk?',
    answer: 'Estimated annual rental yields for finished commercial plazas in Hills Walk are projected at 10% to 14%, driven by heavy footfall from over 35,000 future residents across all Faisal Hills blocks.'
  },
  {
    question: 'How can overseas investors book commercial plots in Hills Walk?',
    answer: 'Overseas Pakistanis can easily book commercial plots using their NICOP/passport. Our dedicated advisory desk assists with verified file documentation, installment schedules, and official Zedem biometric transfers.'
  }
];

export default function HillsWalkContent() {
  // Plot Filters & Interactive States
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlotForInquiry, setSelectedPlotForInquiry] = useState<PlotItem | null>(null);

  // Gallery slider state
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryImages = [
    {
      url: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
      title: 'Hills Walk European-Style Pedestrian Boulevard',
      desc: 'Iconic open-air commercial promenade with scenic Margalla foothills backdrop'
    },
    {
      url: '/images/faisalarc (3).jpg',
      title: 'Multi-Storey Commercial Arcades & Retail Strips',
      desc: 'Ground + 4 approved modern commercial plazas for brand flagship outlets'
    },
    {
      url: '/images/faisalarc (2).webp',
      title: 'Rooftop Margalla Dining & Alfresco Terraces',
      desc: 'Boutique fine dining restaurants and cafes overlooking central water features'
    },
    {
      url: '/images/faisal-park.jpg',
      title: 'Open-Air Amphitheater & Community Piazza',
      desc: 'Vibrant outdoor public gathering space for cultural events and music performances'
    },
    {
      url: '/images/faisal-jewel.jpg',
      title: 'High-Rise Corporate Headquarters & Business Suites',
      desc: 'High-yield commercial tower plots situated along the 225ft society axis'
    },
    {
      url: '/images/imgi_38_Faisal-Hills-site-home-page-header.webp',
      title: 'Central Promenade Connectivity & Landscaping',
      desc: 'Direct walking connectivity to Block A, B, and C residential neighborhoods'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  // Filtered Plots
  const filteredPlots = useMemo(() => {
    if (selectedSizeFilter === 'All') return defaultHillsWalkPlots;
    return defaultHillsWalkPlots.filter((p) => p.size.toLowerCase().includes(selectedSizeFilter.toLowerCase()));
  }, [selectedSizeFilter]);

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">

      {/* ========================================================= */}
      {/* 1. HILLS WALK OVERVIEW & STRATEGIC VISION                */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative with Read More toggle */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-3">
                <TextReveal
                  as="h1"
                  text="Faisal Hills Walk — The Premier European-Style Commercial & Dining Promenade"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  Hills Walk is Faisal Hills’ signature luxury commercial and lifestyle destination. Designed as a European-style open-air pedestrian promenade, Hills Walk integrates luxury retail arcades, rooftop fine dining overlooking the Margalla mountains, outdoor amphitheaters, and corporate business towers into a vibrant, high-footfall commercial ecosystem.
                </p>

                {isSeeMoreOpen ? (
                  <div className="space-y-4 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed font-sans animate-in fade-in duration-500">
                    <p>
                      Centrally positioned at the crossroads of Block A, Block B, and Block C, Hills Walk serves as the commercial epicenter for the entire master community. With 100% RDA approval, sanctioned Ground + 4 and Ground + 6 multi-storey plaza bylaws, and dedicated multi-level basement car parking for 500+ vehicles, it offers investors unprecedented capital growth and high double-digit rental yields.
                    </p>
                    <p>
                      Whether investing in a 4 Marla boutique retail cut, a 5.8 Marla corner plaza, or an 8 to 10 Marla flagship corporate arcade, Hills Walk delivers exceptional business visibility, modern infrastructure, and long-term asset security in the twin cities' fastest expanding growth corridor.
                    </p>
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => setIsSeeMoreOpen(!isSeeMoreOpen)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7b002c] hover:text-[#9e1245] transition-colors pt-1 cursor-pointer focus:outline-hidden"
                >
                  <span>{isSeeMoreOpen ? 'Read Less Overview' : 'Read Full Hills Walk Commercial Vision'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSeeMoreOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </ScrollReveal>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Commercial Status</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  <span>RDA Approved</span>
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Building Bylaws</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Ground + 4 to G+6</span>
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Plaza Cuts</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#7b002c]" />
                  <span>4, 5.8, 8 & 10M</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial Consultation Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden space-y-5 border border-slate-800">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#7b002c]/30 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-2 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-rose-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Commercial Investment Desk</span>
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  Buy Commercial Plots in Hills Walk
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  Get official rate schedules, plaza construction bylaws, ROI projections, and verified commercial inventory directly from our senior advisory team.
                </p>
              </div>

              <div className="space-y-2.5 relative z-10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct biometric file transfer at Zedem Head Office</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>10% – 14% high annual rental yield potential</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Prime 80ft pedestrian promenade with European cobblestone</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 relative z-10">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all text-center cursor-pointer"
                >
                  Request Rate Card
                </button>
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. VISUAL PHOTO GALLERY SLIDER CAROUSEL                  */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Commercial Promenade Visuals</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
                Faisal Hills Walk On-Ground Visual Showcase
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-sans">
              Slide {activeSlide + 1} of {galleryImages.length}
            </span>
          </div>
        </ScrollReveal>

        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/9] sm:aspect-[21/9] max-h-[520px] bg-slate-950 group">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 text-white space-y-1 max-w-2xl">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block font-mono">
                  Promenade Architecture & Drone Capture
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-3xl text-white">
                  {img.title}
                </h3>
                <p className="text-xs text-sm text-slate-200 font-sans hidden sm:block">
                  {img.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer opacity-0 group-hover:opacity-100"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev + 1) % galleryImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer opacity-0 group-hover:opacity-100"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === activeSlide ? 'w-6 bg-[#7b002c]' : 'w-2 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. QUANTITATIVE FIGURES & BENCHMARKS (ANIMATED)           */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-1.5 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Activity className="w-3.5 h-3.5 animate-pulse text-[#7b002c]" />
              <span>Hills Walk Commercial Key Metrics</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Commercial Scale & Investment Benchmarks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Key verifiable metrics defining footfall, rental potential, and construction scale in Faisal Hills Walk:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ScrollReveal direction="up" delay={100}>
            <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#7b002c] group-hover:scale-105 transition-transform duration-300 inline-block">
                <CountUpNumber end={450} duration={2000} suffix="+" />
              </span>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Commercial Plaza Cuts</span>
              <p className="text-[11px] text-slate-500 font-sans">4, 5.8, 8 & 10 Marla multi-storey arcade plots</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-700 group-hover:scale-105 transition-transform duration-300 inline-block">
                <CountUpNumber end={100} duration={1800} suffix="%" />
              </span>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700 transition-colors">RDA Approved Commercial NOC</span>
              <p className="text-[11px] text-slate-500 font-sans">Fully sanctioned commercial layout with clear title</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-[#7b002c] group-hover:scale-105 transition-all duration-300 inline-block">
                <CountUpNumber end={12} duration={2200} prefix="+" suffix="%+" />
              </span>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Projected Rental Yield</span>
              <p className="text-[11px] text-slate-500 font-sans">High tenant demand from 35,000+ resident base</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-[#7b002c] group-hover:scale-105 transition-all duration-300 inline-block">
                <CountUpNumber end={80} duration={1800} suffix="ft+" />
              </span>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Wide Pedestrian Promenade</span>
              <p className="text-[11px] text-slate-500 font-sans">Cobblestone boulevard with alfresco cafe terraces</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. ON-GROUND COMMERCIAL PLOTS INVENTORY                   */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Live Commercial Inventory</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                Available Commercial Plaza Plots in Hills Walk
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Browse verified commercial arcade plots with Ground + 4 approvals and high footfall frontage:
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {['All', '4 Marla', '5.8 Marla', '8 Marla', '10 Marla'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSizeFilter(size)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedSizeFilter === size
                      ? 'bg-[#7b002c] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Plot Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlots.map((plot, idx) => (
            <ScrollReveal key={plot.id} direction="up" delay={(idx % 3) * 80}>
              <div
                className="rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full"
              >
                <div>
                  {/* Top Image Banner - Clickable, Navigates to Plot Inventory */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&category=Commercial`}
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                    title={`Browse all ${plot.size} commercial plots in inventory`}
                  >
                    <img
                      src={plot.image || '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg'}
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

                    {/* Bottom Image Overlay Details & Hover Prompt */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between gap-2 text-white z-10">
                      <div>
                        <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider block font-mono">
                          {plot.category} Property
                        </span>
                        <div className="font-serif font-bold text-lg text-white group-hover/img:text-amber-300 transition-colors">
                          {plot.size} Commercial
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
                        title="View commercial plot details"
                      >
                        {plot.size} {plot.category} Plot
                      </Link>
                      <p className="text-xs text-slate-500 font-sans mt-1">
                        Facing: <strong className="text-slate-700">{plot.facing || 'Main Promenade'}</strong> • Dimensions: <strong className="text-slate-700">{plot.dimensions}</strong>
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1 border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demand Price</div>
                      <div className="text-xl font-bold font-serif text-[#7b002c]">
                        {plot.priceFormatted}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{plot.priceHistoryTrend || '+30% commercial ROI'}</span>
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

                {/* Card Actions: View Detail, Contact Us, and WhatsApp */}
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
                      href={`https://wa.me/923044811717?text=Hello!%20I%20am%20interested%20in%20Faisal%20Hills%20Walk%20Plot%20${plot.plotNumber}%20(${plot.size}).%20Please%20share%20latest%20price%20and%20transfer%20details.`}
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
      </section>

      {/* ========================================================= */}
      {/* 5. COMMERCIAL PRICE SCHEDULE MATRIX                       */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Official Commercial Price Matrix</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Hills Walk Commercial Plot Price Schedule & Floor Approvals
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Official benchmark rates and sanctioned construction storey guidelines across all commercial arcade sizes in Hills Walk:
            </p>
          </div>
        </ScrollReveal>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
              <tr>
                <th className="p-4">Plot Size</th>
                <th className="p-4">Dimensions</th>
                <th className="p-4">Square Area</th>
                <th className="p-4">Storey Approval</th>
                <th className="p-4">Price Range (PKR)</th>
                <th className="p-4">Investment Highlight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {hillsWalkPriceSchedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                  <td className="p-4 font-bold text-[#7b002c] font-serif text-sm">{row.size}</td>
                  <td className="p-4 font-mono font-medium">{row.dimensions}</td>
                  <td className="p-4 font-sans text-slate-600">{row.sqFeet} ({row.sqYards})</td>
                  <td className="p-4 font-bold text-slate-900">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                      {row.approval}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900 text-sm font-serif">{row.priceRange}</td>
                  <td className="p-4 text-[11px] text-slate-600 max-w-xs">{row.highlight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. MASTER AMENITIES & LIFESTYLE INFRASTRUCTURE            */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Trees className="w-3.5 h-3.5" />
              <span>Lifestyle & Commercial Infrastructure</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Hills Walk World-Class Commercial Amenities
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Engineered with European pedestrian standards to deliver unmatched commercial footfall, security, and luxury visitor experiences:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hillsWalkAmenities.map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 60}>
              <div className="rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                    <span className="absolute top-3 left-3 bg-[#7b002c] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#7b002c] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {item.description}
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {item.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. ON-GROUND DEVELOPMENT STATUS & MILESTONES              */}
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
                Hills Walk Construction Milestones & Delivery Status
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Track completion status across commercial plaza structures, underground utilities, and pedestrian cobblestone works:
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Phase 1 Construction Active</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hillsWalkDevelopmentMilestones.map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 60}>
              <div className="rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      {item.progress}% Done
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        {item.status}
                      </span>
                      <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="p-5 pt-0">
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. TRAVEL TIMES & ACCESSIBILITY MATRIX                    */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Car className="w-3.5 h-3.5" />
              <span>Central Connectivity</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Hills Walk Connectivity & Distance Matrix
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Centrally connected across all Faisal Hills residential sectors and direct access routes to the M-1 Motorway and GT Road:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hillsWalkTravelTimes.map((dest, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 40}>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-2.5 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif font-bold text-sm text-slate-900">{dest.destination}</h4>
                  <span className="text-xs font-bold text-[#7b002c] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 shrink-0">
                    {dest.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Distance: <strong>{dest.distance}</strong></span>
                  <span className="text-emerald-700 font-semibold">{dest.note}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. EXPANDING PROJECTS SHOWCASE                            */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>Master Community Portfolio</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Explore Connected Sectors in Faisal Hills
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Discover connected sectors across the master development, from Executive and Prime blocks to Block A, B, C, and D:
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <ExpandingProjectsShowcase
            items={defaultFaisalHillsBlocks}
            defaultActiveIndex={1}
            containerHeightClass="h-[440px] sm:h-[480px] lg:h-[520px]"
            roundedClass="rounded-2xl sm:rounded-3xl"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 10. GOOGLE MAP & LOCATION EMBED                           */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>GPS & Geographic Location</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Hills Walk Location on Google Maps
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Explore the exact central position of Hills Walk between Block A, B, and C within Faisal Hills Islamabad:
            </p>
          </div>
        </ScrollReveal>

        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-[420px] bg-slate-100">
          <iframe
            title="Faisal Hills Walk Commercial Location Map"
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
      </section>

      {/* ========================================================= */}
      {/* 11. IN-DEPTH COMMERCIAL INVESTOR GUIDE & SEO ANALYSIS     */}
      {/* ========================================================= */}
      <section className="space-y-8 pt-4">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Commercial Investment Guide</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Faisal Hills Walk Commercial Sector in Detail
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-4xl leading-relaxed">
              Everything investors and business owners need to know about commercial plot sizes, construction bylaws, rental yields, and legal approvals in Hills Walk:
            </p>
          </div>
        </ScrollReveal>

        {/* Hills Walk at a Glance Table */}
        <ScrollReveal direction="up" delay={100}>
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-200 pb-2">
              Hills Walk at a Glance
            </h3>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                  <tr>
                    <th className="p-4 w-1/4">Feature</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900">Location</td>
                    <td className="p-4 font-sans text-slate-600">Centrally located between Block A, Block B & Block C, Faisal Hills, GT Road (N-5), Taxila</td>
                  </tr>
                  <tr className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900">NOC Status</td>
                    <td className="p-4 font-sans text-[#7b002c] font-bold">100% RDA Approved Commercial Complex</td>
                  </tr>
                  <tr className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900">Commercial Plot Sizes</td>
                    <td className="p-4 font-sans text-slate-600">4 Marla (30×30), 5.8 Marla (40×40), 8 Marla (45×40) & 10 Marla (50×45) Corporate Tower Cuts</td>
                  </tr>
                  <tr className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900">Construction Storey Approvals</td>
                    <td className="p-4 font-sans text-slate-600">Ground + 4 to Ground + 6 Multi-Storey Commercial Arcades with Basement Parking</td>
                  </tr>
                  <tr className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900">Projected Rental Yield</td>
                    <td className="p-4 font-sans text-emerald-700 font-bold">10% – 14% Annual Yield (Driven by 35,000+ Society Resident Base)</td>
                  </tr>
                  <tr className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 font-bold text-slate-900">Key Anchors</td>
                    <td className="p-4 font-sans text-slate-600">80ft Pedestrian Promenade, Open-Air Amphitheater, 500+ Car Basement, Margalla Rooftop Dining</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-Column Visual Cards for Investment Fundamentals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScrollReveal direction="up" delay={150}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden h-full flex flex-col justify-between group">
              <div>
                {/* Image Banner */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
                  <img
                    src="/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg"
                    alt="Hills Walk Strategic Footfall & Retail Catchment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7b002c] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Retail Catchment</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block font-mono">
                      Central Heart of Faisal Hills
                    </span>
                    <h4 className="font-serif font-bold text-lg text-white">
                      European-Style Open Promenade
                    </h4>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    Strategic Footfall & Retail Catchment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    Unlike conventional shopping strips along outer boundaries, Hills Walk is embedded directly at the heart of Faisal Hills. It captures organic daily footfall from Block A, Block B, Block C, and Block D families seeking groceries, banking, clinics, cafes, and fine dining.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    With direct road access to the M-1 Motorway Brahma Interchange and the 225ft Grand Boulevard, Hills Walk also draws weekend visitors and commuters from Wah Cantt, Taxila, and Islamabad.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero vehicle congestion on the pedestrian promenade</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden h-full flex flex-col justify-between group">
              <div>
                {/* Image Banner */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
                  <img
                    src="/images/faisalarc (3).jpg"
                    alt="Hills Walk High Rental Yields & Capital Growth"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>10% – 14% Yield</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block font-mono">
                      High Capital Appreciation
                    </span>
                    <h4 className="font-serif font-bold text-lg text-white">
                      Multi-Storey Commercial Arcades
                    </h4>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    High Rental Yields & Capital Growth
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    Commercial real estate along pedestrian boulevards historically outperforms standard residential land by 2.5x in recurring rental yield. Finished commercial plazas in Hills Walk command premium lease rates from corporate banks, pharmacies, fashion brands, and restaurants.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    Investors can develop independent multi-tenant plazas (retail ground, mezzanine, corporate offices, and rooftop restaurant) or hold verified commercial files for high-velocity secondary resale.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent biometric transfer at Zedem Head Office</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Commercial Plaza Construction & Bylaws */}
        <ScrollReveal direction="up" delay={250}>
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block font-mono">
                Construction Bylaws & Planning
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Sanctioned Storey Approvals & Plaza Floor Plan Guidelines
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
                RDA sanctioned bylaws ensure seamless commercial operations and high property valuations:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-bold text-rose-300 uppercase block font-mono">Lower Ground / Basement</span>
                <h4 className="font-serif font-bold text-base text-white">Basement Car Parking & Utilities</h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Dedicated underground parking conduits, high-capacity backup generators, and water storage reservoirs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase block font-mono">Ground & Mezzanine Floors</span>
                <h4 className="font-serif font-bold text-base text-white">High-Ceiling Brand Outlets</h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Large double-height glass facades facing the 80ft promenade, ideal for national retail brands and banks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-bold text-emerald-300 uppercase block font-mono">Upper & Rooftop Floors</span>
                <h4 className="font-serif font-bold text-base text-white">Corporate Suites & Alfresco Dining</h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  High-speed elevator cores, executive medical/law offices, and open-air rooftop terraces with Margalla vistas.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 12. FAQS ACCORDION SECTION (CENTERED)                     */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-5 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Walk Buying & Investment FAQs
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl">
            Clear answers regarding Hills Walk commercial plot booking, construction bylaws, RDA NOC approvals, and projected rental returns.
          </p>
        </div>

        <FaqAccordion faqs={hillsWalkFaqs} blockName="Hills Walk" />
      </section>

      {/* Map Download Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        blockName="Hills Walk Commercial"
      />

      {/* Lead Inquiry Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedPlotForInquiry(null);
        }}
        defaultBlock="Hills Walk"
        defaultPlot={selectedPlotForInquiry ? `Plot #${selectedPlotForInquiry.plotNumber} (${selectedPlotForInquiry.size})` : undefined}
        interest={selectedPlotForInquiry ? `${selectedPlotForInquiry.size} ${selectedPlotForInquiry.category} in Hills Walk` : 'Hills Walk Commercial Inquiry'}
      />
    </div>
  );
}
