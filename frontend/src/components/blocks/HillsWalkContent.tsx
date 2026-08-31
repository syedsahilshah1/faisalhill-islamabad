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
  FileText,
  Calculator
} from 'lucide-react';
import LeadModal from '@/components/ui/LeadModal';
import {
  PlotItem,
  fetchPlots
} from '@/data/faisalHillsData';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
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

// Hills Walk Amenities List
const hillsWalkAmenities = [
  {
    id: 'pedestrian-promenade',
    title: 'European-Style Open-Air Pedestrian Promenade',
    category: 'Lifestyle',
    description: 'A pedestrian-first 80ft wide boulevard designed with cobblestone paving, tree-shaded seating, designer street lamps, and water fountains.',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
    tag: 'Signature Landmark',
    features: ['80ft Wide Pedestrian Zone', 'Cobblestone Street Paving', 'Outdoor Cafe Seating', 'Zero Traffic Congestion']
  },
  {
    id: 'amphitheater',
    title: 'Open-Air Community Amphitheater',
    category: 'Lifestyle',
    description: 'Dedicated modern open-air arena for community cultural events, seasonal festivals, live musical performances, and weekend celebrations.',
    image: '/images/faisal-park.jpg',
    tag: 'Entertainment Core',
    features: ['Tiered Seating Arena', 'HD Outdoor Screen', 'Acoustic Sound System', 'Lush Surrounding Terraces']
  },
  {
    id: 'parking-plaza',
    title: 'Multi-Level Smart Basement Car Parking',
    category: 'Infrastructure',
    description: 'Multi-storey subterranean parking facility accommodating 500+ vehicles with smart electronic parking guidance and EV charging bays.',
    image: '/images/faisalhillarc.jpg',
    tag: '500+ Capacity',
    features: ['500+ Car Basement Bays', 'Smart Sensor Guidance', 'EV Charging Points', '24/7 Security Attendants']
  },
  {
    id: 'rooftop-dining',
    title: 'Rooftop Margalla Dining & Alfresco Cafes',
    category: 'Lifestyle',
    description: 'Zoned rooftop restaurants offering panoramic Margalla mountain sunsets, fine dining cuisine, coffee lounges, and executive meeting terraces.',
    image: '/images/faisalarc (2).webp',
    tag: 'Fine Dining Hub',
    features: ['Margalla Mountain Views', 'Alfresco Terrace Seating', 'Top Culinary Brands', 'Executive VIP Lounges']
  },
  {
    id: 'retail-arcades',
    title: 'Multi-Storey Commercial Arcades (G+4 & G+6)',
    category: 'Commercial',
    description: 'RDA-approved multi-storey commercial plazas designed for national fashion brands, banks, electronics showrooms, and healthcare diagnostic clinics.',
    image: '/images/faisalarc (3).jpg',
    tag: 'RDA Approved',
    features: ['High Ceilings & Large Glass Fronts', 'High-Speed Elevators', 'Backup Generator Grid', 'Central HVAC Conduits']
  },
  {
    id: 'security-hw',
    title: '24/7 Smart Security & CCTV Surveillance',
    category: 'Security',
    description: 'Continuous high-definition perimeter monitoring, dedicated foot patrol squads, automated license plate readers, and rapid response safety teams.',
    image: '/images/imgi_44_Executive-Block.webp',
    tag: '24/7 Secure',
    features: ['HD CCTV Surveillance', 'Dedicated Mobile Patrol Squads', 'Biometric Automated Checkpoints', 'Emergency Medical Access']
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
    q: 'What is Faisal Hills Walk?',
    a: 'Hills Walk is Faisal Hills’ signature high-end commercial destination. Designed as a European-style open-air pedestrian promenade, it hosts luxury retail brands, rooftop alfresco restaurants, corporate office towers, and an outdoor amphitheater.'
  },
  {
    q: 'Where is Hills Walk located within Faisal Hills?',
    a: 'Hills Walk is centrally situated between Block A, Block B, and Block C along the main society circulation spine. It directly connects the residential sectors to prime retail and dining amenities.'
  },
  {
    q: 'Is Hills Walk approved by the Rawalpindi Development Authority (RDA)?',
    a: 'Yes, Hills Walk is 100% legally approved under the comprehensive Faisal Hills RDA NOC. Commercial plazas hold sanctioned Ground + 4 and Ground + 6 construction approvals with transparent biometric file transfers.'
  },
  {
    q: 'What commercial plot sizes are available in Hills Walk?',
    a: 'Commercial plot cuts in Hills Walk range from 4 Marla (30×30), 5.8 Marla (40×40), 8 Marla (45×40), up to 10 Marla (50×45) corporate tower plots.'
  },
  {
    q: 'What is the projected rental yield for commercial plots in Hills Walk?',
    a: 'Estimated annual rental yields for finished commercial plazas in Hills Walk are projected at 10% to 14%, driven by heavy footfall from over 35,000 future residents across all Faisal Hills blocks.'
  },
  {
    q: 'How can overseas investors book commercial plots in Hills Walk?',
    a: 'Overseas Pakistanis can easily book commercial plots using their NICOP/passport. Our dedicated advisory desk assists with verified file documentation, installment schedules, and official Zedem biometric transfers.'
  }
];

export default function HillsWalkContent() {
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [selectedAmenityCategory, setSelectedAmenityCategory] = useState<string>('All');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlotForInquiry, setSelectedPlotForInquiry] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [allPlots, setAllPlots] = useState<PlotItem[]>(defaultHillsWalkPlots);
  const [selectedCalcSize, setSelectedCalcSize] = useState<'4 Marla' | '5.8 Marla' | '8 Marla' | '10 Marla'>('4 Marla');
  const [formData, setFormData] = useState({ name: '', phone: '', size: '4 Marla Commercial', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchPlots()
      .then((data) => {
        const filtered = data.filter((p) => p.blockSlug === 'hills-walk' || (p.blockName && p.blockName.toLowerCase().includes('hills walk')));
        if (filtered.length > 0) {
          setAllPlots(filtered);
        }
      })
      .catch(console.error);
  }, []);

  const otherBlocks = useMemo(() => {
    return defaultFaisalHillsBlocks.filter((b) => b.id !== 'hills-walk' && b.href !== '/blocks/hills-walk');
  }, []);

  const filteredPlots = useMemo(() => {
    if (selectedSizeFilter === 'All') return allPlots;
    return allPlots.filter((p) => p.size.toLowerCase().includes(selectedSizeFilter.toLowerCase()));
  }, [allPlots, selectedSizeFilter]);

  const filteredAmenities = useMemo(() => {
    if (selectedAmenityCategory === 'All') return hillsWalkAmenities;
    return hillsWalkAmenities.filter((a) => a.category === selectedAmenityCategory);
  }, [selectedAmenityCategory]);

  const calcDetails = {
    '4 Marla': {
      price: 'PKR 2.20 Cr – 2.80 Cr',
      rental: 'PKR 1.8 Lacs – 2.4 Lacs / month',
      yield: '11.5% Projected Yield',
      dimensions: '30 × 30 (100 Sq. Yds)',
      floors: 'Ground + 4 Storey Approval',
      suitability: 'Boutique retail, cafes, fashion showrooms & medical clinics.'
    },
    '5.8 Marla': {
      price: 'PKR 3.50 Cr – 4.80 Cr',
      rental: 'PKR 3.2 Lacs – 4.2 Lacs / month',
      yield: '12.2% Projected Yield',
      dimensions: '40 × 40 (145 Sq. Yds)',
      floors: 'Ground + 5 Storey Approval',
      suitability: 'Corporate banking hubs, brand flagships, pharmacies & multi-floor arcades.'
    },
    '8 Marla': {
      price: 'PKR 5.20 Cr – 6.90 Cr',
      rental: 'PKR 4.8 Lacs – 6.5 Lacs / month',
      yield: '13.0% Projected Yield',
      dimensions: '45 × 40 (200 Sq. Yds)',
      floors: 'Ground + 6 Storey Approval',
      suitability: 'Flagship commercial arcade overlooking amphitheater & alfresco dining.'
    },
    '10 Marla': {
      price: 'PKR 7.80 Cr – 9.50 Cr',
      rental: 'PKR 7.5 Lacs – 9.8 Lacs / month',
      yield: '14.2% Projected Yield',
      dimensions: '50 × 45 (250 Sq. Yds)',
      floors: 'High-Rise Commercial Approval',
      suitability: 'Corporate multi-storey headquarters, boutique hotel suites & banking towers.'
    }
  }[selectedCalcSize];

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 py-4 sm:py-6">
      
      {/* ========================================================= */}
      {/* 1. STANDALONE 4 CORE METRIC CARDS                         */}
      {/* ========================================================= */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Commercial Plaza Cuts</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#7b002c]">
            <CountUpNumber end={450} suffix="+" duration={1800} />
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">4, 5.8, 8 & 10 Marla arcade plots</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">RDA Approved NOC</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-emerald-700">
            <CountUpNumber end={100} suffix="%" duration={1800} />
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">Fully sanctioned commercial layout</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Projected Rental Yield</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            <CountUpNumber end={12} prefix="+" suffix="%+" duration={2000} />
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">High demand from 35,000+ residents</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Promenade Width</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            <CountUpNumber end={80} suffix="ft+" duration={1800} />
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">European cobblestone boulevard</span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OVERVIEW OF HILLS WALK                                 */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative with See More toggle */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h1"
                  text="Faisal Hills Walk Commercial Promenade Overview"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    <strong>Faisal Hills Walk</strong> is the signature luxury commercial and lifestyle destination in Faisal Hills Islamabad. Inspired by iconic European pedestrian promenades, Hills Walk integrates luxury retail arcades, rooftop fine dining overlooking the Margalla mountains, an open-air amphitheater, and multi-storey corporate towers into a vibrant, high-footfall business core.
                  </p>

                  {isOverviewExpanded && (
                    <div className="space-y-3 pt-1 animate-fadeIn">
                      <p>
                        Centrally positioned at the crossroads of Block A, Block B, and Block C, Hills Walk serves as the main retail destination for over 35,000 future residents. With 100% RDA approval, sanctioned Ground + 4 and Ground + 6 multi-storey plaza bylaws, and dedicated multi-level subterranean car parking for 500+ vehicles, it provides exceptional asset security and double-digit rental yields.
                      </p>
                      <p>
                        Investors can choose between 4 Marla boutique retail plots, 5.8 Marla corner arcades, and 8 to 10 Marla flagship corporate tower plots with direct Zedem biometric transfer.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                    className="text-[#7b002c] hover:text-[#9e1245] font-semibold underline underline-offset-4 cursor-pointer text-xs sm:text-sm transition-colors block pt-1"
                  >
                    {isOverviewExpanded ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal direction="up" delay={100}>
              <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-white group">
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    src="/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg"
                    alt="Faisal Hills Walk Promenade Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="p-5 bg-slate-900 text-white space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    Premier Commercial Promenade
                  </span>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                    European-Style Pedestrian Boulevard
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    80ft wide cobblestone boulevard connecting Block A, B, and C with 500+ car parking.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. LOCATION & ACCESSIBILITY MAP                           */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="border-b border-slate-200 pb-5">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                Hills Walk Commercial Location & Access Map
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Centrally located at the intersection of Block A, B, and C with direct 225ft Boulevard connectivity:
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Full-width Map Container */}
        <ScrollReveal direction="up" delay={100}>
          <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
            <iframe
              title="Faisal Hills Walk Commercial Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13269.456075191247!2d72.7845308!3d33.7275817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa196120894bb%3A0xe541ca62c4c8d5a8!2sFaisal%20Hills%2C%20Taxila%2C%20Rawalpindi!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 4. NEARBY LANDMARKS & COMMUTE MATRIX                      */}
      {/* ========================================================= */}
      <section id="nearby-landmarks" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Nearby Landmarks & Transit Distances from Hills Walk
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl">
              Internal arterial commute windows linking residential sectors to the commercial promenade:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hillsWalkTravelTimes.map((dest, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 40}>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-2.5 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif font-bold text-sm text-slate-900">{dest.destination}</h4>
                  <span className="text-xs font-bold text-[#7b002c] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 shrink-0">
                    {dest.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/70 font-sans">
                  <span>Distance: <strong>{dest.distance}</strong></span>
                  <span className="italic text-[11px] text-slate-400 truncate max-w-[150px]">{dest.note}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. MASTER PLAN & COMMERCIAL BLUEPRINT                     */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="border-b border-slate-200 pb-5">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Faisal Hills Walk Master Plan & Plaza Cuts
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Explore the master architectural layout, 80ft pedestrian promenade, and sanctioned plaza cuts:
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual Master Plan Layout + Button Below */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <div
              onClick={() => setIsMapModalOpen(true)}
              className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 group shadow-md hover:shadow-xl transition-all cursor-pointer flex-1 flex flex-col justify-center min-h-[380px] p-3"
            >
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900">
                <img
                  src="/images/faisal-hills-master-plan-map.jpg"
                  alt="Faisal Hills Walk Master Plan Layout"
                  className="w-full h-auto max-h-[460px] object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Button Below Master Plan */}
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="w-full py-3 px-4 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
            >
              <Download className="w-4 h-4" />
              <span>Download Master Plan</span>
            </button>
          </div>

          {/* Right Column: Commercial Plaza Cuts & Bylaws */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Boutique Commercial Cuts (4M & 5.8M)
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 4 Marla (30×30):</strong> Compact commercial plaza cut with Ground + 4 approval. Best for retail boutiques, cafes, and dental clinics.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 5.8 Marla (40×40):</strong> Prime corner avenue cut with dual-side glazing. Ideal for banking halls, pharmacies, and brand showrooms.
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-sans pt-2 border-t border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>RDA Approved Ground + 4 & G+5 construction.</span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Flagship Corporate Cuts (8M & 10M)
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 8 Marla (45×40):</strong> Flagship arcade cut facing the central amphitheater. Sanctioned Ground + 6 multi-storey plaza zoning.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 10 Marla (50×45):</strong> Corporate headquarters tower cut overlooking the 225ft boulevard with dedicated multi-elevator cores.
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-sans pt-2 border-t border-slate-100 flex items-center justify-between">
                <Link href="/faisal-hills-commercial" className="text-[#7b002c] font-bold hover:underline flex items-center gap-1">
                  <span>View All Commercial</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
                <Link href="/blocks/faisal-jewel-islamabad" className="text-[#7b002c] font-bold hover:underline flex items-center gap-1">
                  <span>Faisal Jewel</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. COMMERCIAL PLAZAS & PLOTS FOR SALE                     */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-8">
        
        {/* Pricing Schedule Section */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1.5">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Hills Walk Commercial Pricing Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Standard rate schedules and construction heights for commercial plaza cuts in Hills Walk:
              </p>
            </div>
          </div>

          {/* Mobile View: Clean Responsive Price Cards */}
          <div className="block sm:hidden space-y-3">
            {hillsWalkPriceSchedule.map((row, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7b002c]" />
                    <span className="font-bold text-sm text-slate-900">{row.size}</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
                    {row.approval}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-sans">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Dimensions</span>
                    <span className="text-slate-800 font-mono font-medium">{row.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Area</span>
                    <span className="text-slate-800 font-medium">{row.sqYards} ({row.sqFeet})</span>
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
                      setSelectedPlotForInquiry(`Hills Walk ${row.size} (${row.priceRange})`);
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
                    <th className="p-4 sm:p-5 whitespace-nowrap">Commercial Plaza Cut</th>
                    <th className="p-4 sm:p-5 whitespace-nowrap">Dimensions</th>
                    <th className="p-4 sm:p-5 whitespace-nowrap">Total Covered Area</th>
                    <th className="p-4 sm:p-5 whitespace-nowrap">Market Price Band</th>
                    <th className="p-4 sm:p-5 whitespace-nowrap">Bylaw Approval</th>
                    <th className="p-4 sm:p-5 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {hillsWalkPriceSchedule.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2 whitespace-nowrap">
                        <span className="w-2 h-2 rounded-full bg-[#7b002c]" />
                        <span>{row.size}</span>
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-slate-600 whitespace-nowrap">{row.dimensions}</td>
                      <td className="p-4 sm:p-5 whitespace-nowrap">
                        <div className="font-semibold text-slate-900">{row.sqYards} ({row.sqFeet})</div>
                      </td>
                      <td className="p-4 sm:p-5 font-bold text-[#7b002c] font-serif text-sm sm:text-base whitespace-nowrap">
                        {row.priceRange}
                      </td>
                      <td className="p-4 sm:p-5 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                          {row.approval}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPlotForInquiry(`Hills Walk ${row.size} (${row.priceRange})`);
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
        </div>

        {/* Available Commercial Plots Inventory Grid */}
        <div className="space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  Available Commercial Plaza Plots in Hills Walk
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                  Explore available commercial arcade plots ready for construction with transparent pricing and direct Zedem biometric transfer.
                </p>
              </div>

              {/* Filter Tabs (Hidden on mobile, visible on desktop) */}
              <div className="hidden sm:flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 shrink-0">
                {['All', '4 Marla', '5.8 Marla', '8 Marla', '10 Marla'].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSizeFilter(sz)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSizeFilter === sz
                        ? 'bg-[#7b002c] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {sz === 'All' ? `All (${allPlots.length})` : sz}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Plot Cards Grid: 2 per row on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredPlots.map((plot, idx) => (
              <ScrollReveal key={plot.id} direction="up" delay={(idx % 3) * 80}>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                  <div>
                    <div className="relative h-28 min-[400px]:h-36 sm:h-48 w-full overflow-hidden bg-slate-950 block">
                      <img
                        src={plot.image || '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg'}
                        alt={plot.plotNumber}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                        <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium block uppercase tracking-wider truncate">Hills Walk Commercial</span>
                        <h4 className="font-serif font-bold text-sm sm:text-xl group-hover:text-amber-300 transition-colors">Plot #{plot.plotNumber}</h4>
                      </div>
                    </div>

                    <div className="p-3 sm:p-5 space-y-2 sm:space-y-3.5 block">
                      <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-600">
                        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Plaza Cut:</span>
                          <span className="text-slate-900 font-bold group-hover:text-[#7b002c] transition-colors">{plot.size}</span>
                        </div>
                        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Dimensions:</span>
                          <strong className="text-slate-900 font-semibold">{plot.dimensions}</strong>
                        </div>
                        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Frontage:</span>
                          <strong className="text-slate-900 font-semibold truncate max-w-[90px] sm:max-w-none">{plot.facing}</strong>
                        </div>
                        <div className="hidden sm:flex justify-between items-center">
                          <span className="text-slate-500 font-medium">ROI Trend:</span>
                          <span className="text-emerald-700 font-bold">{plot.priceHistoryTrend || '+28% Annual ROI'}</span>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-wrap gap-1.5 pt-1">
                        {Array.isArray(plot.features) && plot.features.slice(0, 3).map((feat, fIdx) => (
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

                  <div className="p-3 sm:p-4 pt-2 sm:pt-3 border-t border-slate-100 mt-1 sm:mt-2 space-y-2 sm:space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                      <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Demand</span>
                      <span className="font-serif font-bold text-xs min-[400px]:text-sm sm:text-base text-[#7b002c] truncate">{plot.priceFormatted}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPlotForInquiry(`Hills Walk Commercial Plot #${plot.plotNumber} (${plot.size})`);
                          setIsLeadModalOpen(true);
                        }}
                        className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-bold rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-0.5 sm:gap-1 text-center cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>

                      <a
                        href={`https://wa.me/923331113177?text=${encodeURIComponent(
                          `Hi! I am interested in booking Hills Walk Commercial Plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share verification & transfer details.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[10px] sm:text-[11px] font-bold rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-0.5 sm:gap-1 shadow-sm text-center"
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

          {/* List Your Commercial Plot Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-[#4a081a] to-slate-950 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                Looking to Sell or Assess Your Hills Walk Commercial Plot?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                Get an instant official market valuation and list your commercial plaza file with our verified buyer network.
              </p>
            </div>

            <a
              href="https://wa.me/923331113177?text=Hello!%20I%20want%20to%20list%20or%20sell%20my%20commercial%20plot%20in%20Faisal%20Hills%20Walk."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white hover:bg-rose-50 text-[#7b002c] text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shrink-0 flex items-center gap-2"
            >
              <span>List Your Commercial Plot</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 7. AMENITIES & LIFESTYLE FACILITIES                       */}
      {/* ========================================================= */}
      <section id="amenities" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900">
                World-Class Amenities in Hills Walk
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Signature European-standard commercial infrastructure designed for high footfall:
              </p>
            </div>

            {/* Amenity Filter Pills (Hidden on mobile, visible on desktop) */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto text-xs font-bold">
              {['All', 'Lifestyle', 'Infrastructure', 'Commercial', 'Security'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedAmenityCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    selectedAmenityCategory === cat
                      ? 'bg-[#7b002c] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAmenities.map((amenity, idx) => (
            <ScrollReveal key={amenity.id} direction="up" delay={idx * 40}>
              <div className="rounded-3xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all">
                <div className="relative h-44 w-full bg-slate-950">
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                    {amenity.tag}
                  </span>
                </div>
                <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-base text-slate-900">{amenity.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{amenity.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200/80">
                    {amenity.features.map((f, fIdx) => (
                      <span key={fIdx} className="text-[11px] text-slate-700 flex items-center gap-1 font-sans">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{f}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. PROMENADE COMMERCIAL SERIES & ZONING                   */}
      {/* ========================================================= */}
      <section id="series-of-plots" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Hills Walk Commercial Promenade Zoning Series
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl">
              Distinct zoning districts engineered for retail, gastronomy, entertainment, and enterprise towers:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { zone: 'District 01', title: 'Fashion & Retail Galleria', desc: 'Ground-level luxury boutiques, international brand fashion outlets, and jewelry souks.', cuts: '4 Marla & 5.8 Marla Cuts' },
            { zone: 'District 02', title: 'Gastronomy & Alfresco Terraces', desc: 'Rooftop dining cafes, gourmet bistros, and outdoor coffee lounges facing Margalla hills.', cuts: '5.8 Marla & 8 Marla Cuts' },
            { zone: 'District 03', title: 'Cultural Amphitheater Core', desc: 'Open-air performance arena, central water cascades, and festive seasonal event grounds.', cuts: '8 Marla Luxury Plazas' },
            { zone: 'District 04', title: 'Corporate Business Boulevard', desc: 'Multi-storey commercial glass towers for banking headquarters, IT suites, and diagnostic centers.', cuts: '10 Marla Corporate Towers' }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-[#7b002c] uppercase tracking-wider block">{item.zone}</span>
                <h4 className="font-serif font-bold text-base text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 block text-center">
                {item.cuts}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. OTHER FAISAL HILLS BLOCKS & SECTORS                    */}
      {/* ========================================================= */}
      <section id="sectors" className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-1.5 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Explore Other Faisal Hills Blocks & Sectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Hover across the sector columns to view each block's location advantages, development progress, and direct links:
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <ExpandingProjectsShowcase
            items={otherBlocks}
            defaultActiveIndex={2}
            containerHeightClass="h-[480px] lg:h-[520px]"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 10. FACILITIES, COMMERCIAL ROI & ROADMAP                  */}
      {/* ========================================================= */}
      <section id="facilities" className="scroll-mt-28 space-y-12 sm:space-y-16">
        
        {/* Smart Commercial ROI Calculator */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                Hills Walk Smart Commercial ROI & Rental Explorer
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
                Select a commercial plaza cut to calculate projected monthly rental cashflows, annual yields, and approved heights:
              </p>
            </div>

            {/* Size Selector Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 shrink-0">
              {(['4 Marla', '5.8 Marla', '8 Marla', '10 Marla'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedCalcSize(size)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCalcSize === size
                      ? 'bg-[#7b002c] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Plaza Price Range</span>
                    <div className="font-serif font-bold text-2xl text-slate-900">{calcDetails.price}</div>
                    <span className="text-[11px] text-slate-500 block">{calcDetails.dimensions}</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                    <span className="text-[11px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">Projected Monthly Rent</span>
                    <div className="font-serif font-bold text-2xl text-emerald-700">{calcDetails.rental}</div>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {calcDetails.yield}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-[#7b002c] font-serif uppercase tracking-wider block">Bylaw Approval:</strong>
                    <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      {calcDetails.floors}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{calcDetails.suitability}</p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-rose-50/80 via-white to-slate-50 border border-rose-200/80 shadow-xs space-y-5 h-full">
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b002c] bg-rose-100/80 px-3 py-1 rounded-full border border-rose-300/50 inline-block">
                    Verified Commercial Inventory
                  </span>
                  <h3 className="font-serif font-bold text-xl text-slate-900">
                    Lock {selectedCalcSize} Commercial Plot
                  </h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Speak directly with our senior commercial advisors to verify available plot serial numbers, corner cuts, and plaza construction bylaws.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href="#plots-for-sale"
                    className="w-full py-3 px-5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Tag className="w-4 h-4 text-[#7b002c]" />
                    <span>View Available {selectedCalcSize} Plots</span>
                  </a>
                  <a
                    href={`https://wa.me/923331113177?text=${encodeURIComponent(
                      `Hello! I am interested in verified ${selectedCalcSize} commercial plots listed for sale in Faisal Hills Walk.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Inquiry Desk</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Construction & Handover Progress Roadmap */}
        <div className="space-y-6">
          <div className="space-y-1.5 border-b border-slate-200 pb-5">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Hills Walk Commercial Construction Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Key milestones from civil leveling to active plaza structural rise:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'RDA Sanction & Commercial Layout', status: '100% Completed', note: 'Full commercial plaza layout approval with Ground + 4 & G+6 bylaws.', state: 'done' },
              { step: '02', title: 'Promenade Earthwork & Grading', status: '95% Completed', note: '80ft wide pedestrian axis graded with deep RCC stormwater channels.', state: 'done' },
              { step: '03', title: 'Plaza Grey Structure Rise', status: 'Active Construction', note: 'Multiple multi-storey commercial plazas actively rising on ground.', state: 'active' },
              { step: '04', title: 'Cobblestone & Parking Completion', status: 'Underway', note: 'Paving cobblestone paths and energizing 500+ basement car parking.', state: 'active' }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 ${
                  item.state === 'done'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-rose-50/40 border-[#7b002c]/30 ring-2 ring-[#7b002c]/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-slate-400">{item.step}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    item.state === 'done' ? 'bg-emerald-200 text-emerald-900' : 'bg-[#7b002c] text-white'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 font-sans leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Book / Official Zedem Transfer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                How to Book a Commercial Plaza in Hills Walk
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Securing a commercial plot follows standard verified procedures at Zedem International head office:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { title: 'CNIC / NICOP Copies', desc: 'Two clear copies of buyer CNIC (or NICOP for overseas buyers).' },
                { title: 'Next of Kin Details', desc: 'Two clear copies of your designated nominee / Next of Kin CNIC.' },
                { title: 'Passport Photographs', desc: 'Two recent passport-size photos with clean white background.' },
                { title: 'Payment Instrument', desc: 'Demand draft / pay order in developer name for clear transaction record.' }
              ].map((doc, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{doc.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans leading-relaxed">{doc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-[#3b0015] text-white p-7 sm:p-8 rounded-3xl border border-rose-900/40 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-200 bg-[#7b002c] px-3.5 py-1 rounded-full border border-white/20 shadow">
                    Official Zedem Transfer
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    100% Verified
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    Commercial Advisory Desk
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Our certified advisors coordinate file verification, NDC clearance, and legal biometric transfer directly at Zedem International head office.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/923331113177?text=I%20am%20interested%20in%20verifying%20and%20booking%20a%20commercial%20plaza%20plot%20in%20Faisal%20Hills%20Walk."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Commercial Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 11. FAQS & PRIORITY CONSULTATION FORM                     */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 space-y-10">
        
        {/* FAQs Accordion */}
        <div className="space-y-6">
          <div className="space-y-1.5 border-b border-slate-200 pb-4">
            <span className="text-[#7b002c] font-bold text-xs uppercase tracking-widest block">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Everything You Need to Know About Hills Walk
            </h2>
          </div>

          <div className="space-y-3">
            {hillsWalkFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-slate-900 text-sm sm:text-base hover:text-[#7b002c] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#7b002c] shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Priority Lead Form */}
        <div className="bg-gradient-to-br from-[#7b002c] via-[#5a0020] to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-rose-200 text-xs font-bold uppercase tracking-wider block">
              Commercial Consultation
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold">
              Interested in Faisal Hills Walk Commercial Plazas?
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 font-sans leading-relaxed">
              Leave your details below to receive official rate cards, plaza construction bylaws, and verified commercial inventory availability.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-emerald-200 font-sans text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>Thank you! Your inquiry has been received. Our senior commercial advisor will contact you shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmitLead} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-100 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-rose-200/50 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-rose-100 mb-1.5">WhatsApp / Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-rose-200/50 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-rose-100 mb-1.5">Preferred Cut</label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white text-xs focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer"
                >
                  <option value="4 Marla">4 Marla Commercial Plaza</option>
                  <option value="5.8 Marla">5.8 Marla Corner Commercial</option>
                  <option value="8 Marla">8 Marla Arcade Plaza</option>
                  <option value="10 Marla">10 Marla Corporate Tower</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-white hover:bg-rose-50 text-[#7b002c] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Modals */}
      {isMapModalOpen && (
        <MapDownloadModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          blockName="Faisal Hills Walk Commercial"
        />
      )}

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedPlotForInquiry(null);
        }}
        defaultBlock="Hills Walk"
        defaultPlot={selectedPlotForInquiry || undefined}
        interest={selectedPlotForInquiry ? `${selectedPlotForInquiry} in Hills Walk` : 'Hills Walk Commercial General Inquiry'}
      />

    </div>
  );
}
