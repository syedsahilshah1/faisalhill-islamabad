'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  PlotItem,
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Navigation,
  ExternalLink,
  Calendar,
  Building,
  Maximize2,
  ArrowRight,
  Home,
  Tag,
  DollarSign,
  TrendingUp,
  Car,
  Plane,
  Shield,
  HelpCircle,
  Activity,
  Check,
  Compass,
  Layers,
  Download,
  Send,
  Calculator,
  Percent,
  Award,
  Zap,
  Droplets,
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import LeadModal from '@/components/ui/LeadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';
import { DynamicPlotSeriesExplorer } from '../plots/DynamicPlotSeriesExplorer';

interface B1ExtensionPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  category: 'Residential' | 'Commercial';
  priceRange: string;
  possession: string;
  highlight: string;
}

const b1ExtensionPriceSchedule: B1ExtensionPriceRow[] = [
  {
    size: '5 Marla',
    dimensions: '25 × 50',
    sqYards: '139 Sq. Yds',
    category: 'Residential',
    priceRange: 'PKR 38 Lacs – 48 Lacs',
    possession: 'Early Possession Phase',
    highlight: 'Lowest entry price point in society with maximum capital appreciation upside.'
  },
  {
    size: '8 Marla',
    dimensions: '30 × 60',
    sqYards: '200 Sq. Yds',
    category: 'Residential',
    priceRange: 'PKR 58 Lacs – 72 Lacs',
    possession: 'Development in Progress',
    highlight: 'Ideal family-size plot cut balancing generous indoor layout and affordability.'
  },
  {
    size: '10 Marla',
    dimensions: '35 × 70',
    sqYards: '272 Sq. Yds',
    category: 'Residential',
    priceRange: 'PKR 75 Lacs – 95 Lacs',
    possession: 'Development in Progress',
    highlight: 'Executive single & double unit luxury villa cut with high elevation Margalla view.'
  },
  {
    size: 'Commercial (Avenue)',
    dimensions: 'Standard Sector Cuts',
    sqYards: 'Varies',
    category: 'Commercial',
    priceRange: 'PKR 1.2 Crore – 2.5 Crore',
    possession: 'Commercial Phase',
    highlight: 'Commercial plots situated on wide internal sector boulevards for retail & plazas.'
  }
];

const b1DriveTimes = [
  { destination: 'Taxila City & Museum', time: '5 mins', distance: '3.2 km', note: 'Direct GT Road N-5 corridor' },
  { destination: 'Multi Gardens B-17 Islamabad', time: '6 mins', distance: '4.8 km', note: 'Direct sector-to-sector connection' },
  { destination: 'UET Taxila & HITEC University', time: '8 mins', distance: '6.5 km', note: 'Short commute for faculty & students' },
  { destination: 'Block B Central Sports Complex', time: '3 mins', distance: '1.5 km', note: 'Direct internal avenue connection' },
  { destination: 'M-1 Motorway Toll Plaza', time: '12 mins', distance: '11 km', note: 'Quick inter-provincial transit' },
  { destination: 'New Islamabad International Airport', time: '25 mins', distance: '28 km', note: 'Direct motorway / expressway link' }
];

const b1ExtensionAmenities = [
  {
    icon: Zap,
    title: '100% Underground Electrification',
    desc: 'Uninterrupted power grid with underground cabling, high-capacity transformers, and modern street lighting.',
    category: 'Utilities'
  },
  {
    icon: Droplets,
    title: 'Clean Water Filtration Plant',
    desc: 'Dedicated high-capacity RO filtration plants delivering 24/7 clean potable drinking water.',
    category: 'Utilities'
  },
  {
    icon: ShieldCheck,
    title: 'Gated Security & 24/7 CCTV',
    desc: 'Round-the-clock physical security patrols, smart RFID entry gates, and society-wide surveillance.',
    category: 'Security'
  },
  {
    icon: Landmark,
    title: 'Dedicated Sector Jamia Mosque',
    desc: 'Beautiful modern architecture Jamia mosque reservations within walking distance of all plot streets.',
    category: 'Community'
  },
  {
    icon: Trees,
    title: 'Lush Sector Parks & Playgrounds',
    desc: 'Family parks, landscaped green belts, children play areas, and tree-lined jogging paths.',
    category: 'Environment'
  },
  {
    icon: GraduationCap,
    title: 'Educational Catchment',
    desc: 'Immediate access to Roots Millennium campus, UET Taxila, and HITEC University educational institutions.',
    category: 'Community'
  },
  {
    icon: ShoppingBag,
    title: 'Sector Commercial Hubs',
    desc: 'Dedicated commercial arcade zones for supermarkets, retail shops, pharmacies, and food outlets.',
    category: 'Commercial'
  },
  {
    icon: Compass,
    title: '40ft to 150ft Paved Streets',
    desc: 'Expansive wide carpeted asphalt road network with concrete curb stones and storm drainage culverts.',
    category: 'Infrastructure'
  }
];

const b1SliderImages = [
  {
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    title: 'Boulevard Road Network',
    sub: 'Active road leveling & infrastructure carpeting across B1 Extension',
    tag: 'Infrastructure'
  },
  {
    image: '/images/faisal-forest.jpg',
    title: 'Margalla Hillside Panorama',
    sub: 'Serene foothill environment with fresh natural air and mountain contours',
    tag: 'Scenic Setting'
  },
  {
    image: '/images/imgi_46_Mosques.webp',
    title: 'Community Jamia Mosque',
    sub: 'Dedicated sector mosque reservations with traditional Islamic architecture',
    tag: 'Community Life'
  },
  {
    image: '/images/faisal-park.jpg',
    title: 'Sector Parks & Green Belts',
    sub: 'Dedicated family recreational grounds and children play areas',
    tag: 'Green Spaces'
  },
  {
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
    title: 'Highway & Sector Connectivity',
    sub: 'Seamless internal access linking Block B, Block A, and Block D',
    tag: 'Strategic Access'
  }
];

const b1Faqs = [
  {
    q: 'Where exactly is Faisal Hills Block B1 Extension located?',
    a: 'Block B1 Extension sits inside the wider Faisal Hills master plan on the GT Road (N-5) near the Taxila Bypass. It is situated internally beside Block B, bordering Block A, Block D, and the Prime Block with direct connectivity to wide central boulevards.'
  },
  {
    q: 'Why is B1 Extension considered the most affordable block in Faisal Hills?',
    a: 'B1 Extension was launched to absorb excess demand and provide an entry-level residential opportunity for budget-conscious buyers and long-term investors. It carries lower initial plot rates while sharing the exact same 100% RDA-approved NOC and high-grade Zedem infrastructure as fully mature sectors.'
  },
  {
    q: 'What plot sizes are available in Block B1 Extension?',
    a: 'Block B1 Extension features 5 Marla (25×50), 8 Marla (30×60), and 10 Marla (35×70) residential plots, alongside select commercial avenue cuts designed for neighborhood retail and markets.'
  },
  {
    q: 'What is the current development and possession status of B1 Extension?',
    a: 'Heavy earthwork, sector leveling, underground drainage, and road network laying are progressing actively on ground. Early possession will be handed over in phases as utility lines and road carpeting are finalized.'
  },
  {
    q: 'How does the plot booking and file transfer process work?',
    a: 'Plots in B1 Extension are traded via official file transfer at the Zedem International head office. Our team provides complete on-ground verification, NDC dues clearance, and official file transfer facilitation.'
  }
];

const plotCalculations = {
  '5 Marla': {
    price: 'PKR 38 Lacs – 48 Lacs',
    projected: 'PKR 65 Lacs – 75 Lacs',
    roi: '+58% Projected ROI',
    dimensions: '25 × 50 (139 Sq. Yds)',
    suitability: 'Best for first-time home builders and maximum capital multiple.',
    features: ['High liquidity resale', 'Compact modern 3-bed villa', 'Lowest initial capital requirement']
  },
  '8 Marla': {
    price: 'PKR 58 Lacs – 72 Lacs',
    projected: 'PKR 95 Lacs – 1.15 Crore',
    roi: '+62% Projected ROI',
    dimensions: '30 × 60 (200 Sq. Yds)',
    suitability: 'Ideal family plot balancing generous parking and 4-bed dual living.',
    features: ['Double-unit house capability', 'Front lawn & car porch space', 'High demand among middle-income families']
  },
  '10 Marla': {
    price: 'PKR 75 Lacs – 95 Lacs',
    projected: 'PKR 1.35 Crore – 1.6 Crore',
    roi: '+68% Projected ROI',
    dimensions: '35 × 70 (272 Sq. Yds)',
    suitability: 'Executive luxury villa with panoramic hill views & spacious lawn.',
    features: ['Only ~28 limited units in sector', 'Wide 35ft front elevation', 'High executive rental appeal']
  }
};

export default function BlockB1ExtensionContent() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [selectedCalcSize, setSelectedCalcSize] = useState<'5 Marla' | '8 Marla' | '10 Marla'>('5 Marla');
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [selectedAmenityCategory, setSelectedAmenityCategory] = useState<string>('All');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlotForInquiry, setSelectedPlotForInquiry] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [b1Plots, setB1Plots] = useState<PlotItem[]>([]);
  const [selectedPlotSizeFilter, setSelectedPlotSizeFilter] = useState<'all' | '5 Marla' | '8 Marla' | '10 Marla'>('all');
  const [formData, setFormData] = useState({ name: '', phone: '', size: '5 Marla', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchPlots()
      .then((data) => {
        const filtered = data.filter(
          (p) =>
            p.blockSlug === 'block-b1-extension' ||
            p.blockSlug === 'b-1-extension' ||
            (p.blockName && (p.blockName.toLowerCase().includes('b1') || p.blockName.toLowerCase().includes('b-1')))
        );
        if (filtered.length > 0) {
          setB1Plots(filtered);
        }
      })
      .catch(console.error);

    const handleSync = () => {
      fetchPlots()
        .then((data) => {
          const filtered = data.filter(
            (p) =>
              p.blockSlug === 'block-b1-extension' ||
              p.blockSlug === 'b-1-extension' ||
              (p.blockName && (p.blockName.toLowerCase().includes('b1') || p.blockName.toLowerCase().includes('b-1')))
          );
          if (filtered.length > 0) {
            setB1Plots(filtered);
          }
        })
        .catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handleSync);
    return () => window.removeEventListener('faisal_plots_updated', handleSync);
  }, []);

  const displayedB1Plots = useMemo(() => {
    if (selectedPlotSizeFilter === 'all') return b1Plots;
    return b1Plots.filter((p) => p.size.toLowerCase().includes(selectedPlotSizeFilter.toLowerCase()));
  }, [b1Plots, selectedPlotSizeFilter]);

  const otherBlocks = useMemo(() => {
    return defaultFaisalHillsBlocks.filter((b) => b.id !== 'block-b1-extension' && b.href !== '/blocks/b-1-extension');
  }, []);

  const filteredAmenities = useMemo(() => {
    if (selectedAmenityCategory === 'All') return b1ExtensionAmenities;
    return b1ExtensionAmenities.filter((a) => a.category === selectedAmenityCategory);
  }, [selectedAmenityCategory]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % b1SliderImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + b1SliderImages.length) % b1SliderImages.length);
  };

  const filteredPrices = b1ExtensionPriceSchedule.filter((row) => {
    if (activeCategory === 'All') return true;
    return row.category === activeCategory;
  });

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const activeCalc = plotCalculations[selectedCalcSize];

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 py-4 sm:py-6">
      
      {/* 4 Core Quantitative Metrics (Standalone Top Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Entry Advantage</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#7b002c]">
            Under <CountUpNumber end={50} duration={1800} />L
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">Most accessible entry in scheme</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Appreciation Potential</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-emerald-700">
            <CountUpNumber end={60} prefix="+" suffix="% Growth" duration={2000} />
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">High multiple on handover</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Plot Cuts</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            <CountUpNumber end={5} duration={1000} />, <CountUpNumber end={8} duration={1400} /> & <CountUpNumber end={10} duration={1800} /> Marla
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">Optimized compact family cuts</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Security & NOC</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            <CountUpNumber end={100} suffix="% RDA" duration={1800} />
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">Official Zedem head office transfer</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. OVERVIEW OF B1 EXTENSION                               */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative with See More toggle */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h1"
                  text="Faisal Hills Block B-1 Extension Overview"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    <strong>Faisal Hills Block B-1 Extension</strong> is the prime value-driven residential sector developed by <Link href="/about-us" className="text-[#7b002c] font-bold hover:underline">Faisal Town Group & Zedem International</Link>. Positioned as an internal pocket sector between Block B, Block A, Block D, and Prime Block, B-1 Extension delivers the society’s most affordable entry rates while sharing the exact same 100% RDA approved status, master planning, and premium construction standards.
                  </p>

                  {isOverviewExpanded && (
                    <div className="space-y-3 pt-1 animate-fadeIn">
                      <p>
                        Designed specifically for families seeking modern suburban comfort and savvy investors looking for rapid capital appreciation multiples, B1 Extension offers 5 Marla, 8 Marla, and 10 Marla residential plots, alongside select commercial avenue cuts.
                      </p>
                      <p>
                        With dedicated underground electrification, Jamia mosques, family parks, and wide 40ft to 150ft paved boulevards, B-1 Extension connects smoothly to the central sports complex and the Main GT Road (N-5) without highway traffic noise.
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
                    src="/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
                    alt="Faisal Hills Block B1 Extension Sector Overview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="p-5 bg-slate-900 text-white space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    High Value Residential Pocket
                  </span>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                    B-1 Extension Master Development
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Internal sector connectivity linking Block B, Block A, and Block D.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. LOCATION & MAP                                         */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="border-b border-slate-200 pb-5">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                Block B-1 Extension Location & Road Connectivity Map
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Positioned inside the serene interior pocket between Block B, Block A, Block D, and Prime Block:
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Full-width Map Container */}
        <ScrollReveal direction="up" delay={100}>
          <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
            <iframe
              title="Faisal Hills B1 Extension Location Map"
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
      {/* 4. NEARBY LANDMARKS & COMMUTE DISTANCES                   */}
      {/* ========================================================= */}
      <section id="nearby-landmarks" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Nearby Landmarks & Commute Distances from B1 Extension
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl">
              Accurate commute windows connecting to educational institutions, sports hubs, and twin city highways:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {b1DriveTimes.map((dest, idx) => (
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
      {/* 5. MASTER PLAN & CUTS                                     */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="border-b border-slate-200 pb-5">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Faisal Hills Block B1 Extension Master Plan & Cuts
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Explore the sector layout, 40ft to 150ft street hierarchy, and demarcated residential plot cuts:
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
                  alt="Faisal Hills B1 Extension Master Plan Layout"
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

          {/* Right Column: Residential & Commercial Plot Cuts */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Residential Plots Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <Home className="w-3.5 h-3.5" />
                  <span>Residential Cuts</span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Residential Plot Sizes & Layout
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 5 Marla (25×50):</strong> Most affordable entry plot cut with highest liquidity and rapid resale.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 8 Marla (30×60):</strong> Standard family choice offering space for front garden and parking.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 10 Marla (35×70):</strong> Spacious double-unit luxury villa plot with wide street frontage.
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-sans pt-2 border-t border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>RDA Approved residential zoning.</span>
              </div>
            </div>

            {/* Commercial Plots Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Commercial Opportunities</span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Commercial Opportunities
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• Sector Commercial Hubs:</strong> Positioned along wide internal avenues to cater to local retail.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• High-Yield Retail Units:</strong> Planned for grocery supermarkets, pharmacies, and brand outlets.
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 text-slate-700">
                    <strong>• Rapid Catchment Growth:</strong> Positioned to serve over 650 resident homes upon completion.
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
      {/* 6. PLOTS FOR SALE (PRICE SCHEDULE & VERIFIED INVENTORY)   */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-8">
        
        {/* Pricing Schedule Table Section */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1.5">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                B1 Extension Plot Pricing Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Transparent market rates for resale files and plot cuts in Faisal Hills B1 Extension:
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 text-xs font-bold">
              {(['All', 'Residential', 'Commercial'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCategory === cat
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
            {filteredPrices.map((row, idx) => (
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
                    <span className="text-slate-800 font-medium">{row.sqYards}</span>
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
                      setSelectedPlotForInquiry(`B-1 Extension ${row.size} (${row.priceRange})`);
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
                  {filteredPrices.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2 whitespace-nowrap">
                        <span className="w-2 h-2 rounded-full bg-[#7b002c]" />
                        <span>{row.size}</span>
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-slate-600 whitespace-nowrap">{row.dimensions}</td>
                      <td className="p-4 sm:p-5 whitespace-nowrap">
                        <div className="font-semibold text-slate-900">{row.sqYards}</div>
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
                            setSelectedPlotForInquiry(`B-1 Extension ${row.size} (${row.priceRange})`);
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

        {/* Verified Inventory Grid */}
        <div className="space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  Block B-1 Extension Plots for Sale — Direct Booking & Resale Files
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                  Explore available residential plots and commercial cuts in B1 Extension with transparent market pricing, zero dealer hidden charges, and immediate allotment file verification.
                </p>
              </div>

              {/* Filter Tabs (Hidden on mobile, visible on desktop) */}
              <div className="hidden sm:flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
                {(['all', '5 Marla', '8 Marla', '10 Marla'] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedPlotSizeFilter(sz)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedPlotSizeFilter === sz
                        ? 'bg-[#7b002c] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {sz === 'all' ? `All (${b1Plots.length})` : sz}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Plot Cards Grid: 2 per row on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {displayedB1Plots.map((plot, idx) => (
              <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 80}>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                  <div>
                    <Link
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-b1-extension`}
                      className="relative h-28 min-[400px]:h-36 sm:h-44 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                    >
                      <img
                        src={plot.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'}
                        alt={plot.plotNumber}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                        <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium block uppercase tracking-wider truncate">{plot.blockName || 'Block B-1 Ext'}</span>
                        <h4 className="font-serif font-bold text-sm sm:text-xl group-hover:text-amber-300 transition-colors">#{plot.plotNumber}</h4>
                      </div>
                    </Link>

                    <Link
                      href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-b1-extension`}
                      className="p-3 sm:p-5 space-y-2 sm:space-y-3.5 block cursor-pointer hover:bg-slate-50/60 transition-colors"
                    >
                      <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-600">
                        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Size:</span>
                          <span className="text-slate-900 font-bold group-hover:text-[#7b002c] transition-colors">{plot.size}</span>
                        </div>
                        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Dimensions:</span>
                          <strong className="text-slate-900 font-semibold">{plot.dimensions}</strong>
                        </div>
                        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Facing:</span>
                          <strong className="text-slate-900 font-semibold truncate max-w-[85px] sm:max-w-none">{plot.facing}</strong>
                        </div>
                        <div className="hidden sm:flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Trend:</span>
                          <span className="text-emerald-700 font-bold">{plot.priceHistoryTrend || 'High Demand'}</span>
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
                    </Link>
                  </div>

                  <div className="p-3 sm:p-4 pt-2 sm:pt-3 border-t border-slate-100 mt-1 sm:mt-2 space-y-2 sm:space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                      <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Demand</span>
                      <span className="font-serif font-bold text-xs min-[400px]:text-sm sm:text-base text-[#7b002c] truncate">{plot.priceFormatted}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <Link
                        href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-b1-extension`}
                        className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-bold rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-0.5 sm:gap-1 text-center cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </Link>

                      <a
                        href={`https://wa.me/923044811717?text=${encodeURIComponent(
                          `Hi! I am interested in B-1 Extension plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share verification & transfer details.`
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

          {/* Sell / List Your B-1 Extension Plot Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-[#4a081a] to-slate-950 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Owner Resale & Liquidation Desk</span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                Want to Sell or Assess Your Block B-1 Extension Plot / File?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                Get an instant official market valuation and list your file for thousands of active verified buyers across Islamabad, Rawalpindi, and overseas.
              </p>
            </div>

            <a
              href="https://wa.me/923044811717?text=Hello!%20I%20want%20to%20list%20or%20sell%20my%20plot%20in%20Faisal%20Hills%20Block%20B1%20Extension."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white hover:bg-rose-50 text-[#7b002c] text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shrink-0 flex items-center gap-2"
            >
              <span>List Your Plot File</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 7. AMENITIES & INFRASTRUCTURE                             */}
      {/* ========================================================= */}
      <section id="amenities" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900">
                World-Class Amenities in Block B1 Extension
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Full-scale utilities and community features engineered for peaceful residential living:
              </p>
            </div>

            {/* Amenity Filter Pills (Hidden on mobile, visible on desktop) */}
            <div className="hidden sm:flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto text-xs font-bold">
              {(['All', 'Utilities', 'Security', 'Community', 'Environment', 'Infrastructure'] as const).map((cat) => (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredAmenities.map((amenity, idx) => {
            const Icon = amenity.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 30}>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-3 h-full flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-[#7b002c] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-slate-900">{amenity.title}</h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">{amenity.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#7b002c] uppercase tracking-wider block pt-2 border-t border-slate-200/70">
                    {amenity.category}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SERIES OF PLOTS EXPLORER                               */}
      {/* ========================================================= */}
      <section id="series-of-plots" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <DynamicPlotSeriesExplorer
            blockSlug="block-b1-extension"
            blockName="Block B-1 Extension"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 9. OTHER FAISAL HILLS BLOCKS                              */}
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
            defaultActiveIndex={3}
            containerHeightClass="h-[480px] lg:h-[520px]"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 10. FACILITIES, ROI CALCULATOR & INVESTMENT ROADMAP        */}
      {/* ========================================================= */}
      <section id="facilities" className="scroll-mt-28 space-y-12 sm:space-y-16">
        
        {/* Smart Affordability & ROI Value Calculator */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                B1 Extension Smart Value & ROI Explorer
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
                Select your preferred plot size below to evaluate initial entry capital, projected completion valuation, and capital growth metrics:
              </p>
            </div>

            {/* Size Selector Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 shrink-0">
              {(['5 Marla', '8 Marla', '10 Marla'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedCalcSize(size)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
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

          {/* Calculator Output Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Output Specs */}
              <div className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Current Market Entry</span>
                    <div className="font-serif font-bold text-2xl text-slate-900">{activeCalc.price}</div>
                    <span className="text-[11px] text-slate-500 block">{activeCalc.dimensions}</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                    <span className="text-[11px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">Projected Handover Value</span>
                    <div className="font-serif font-bold text-2xl text-emerald-700">{activeCalc.projected}</div>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {activeCalc.roi}
                    </span>
                  </div>

                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <strong className="text-xs text-[#7b002c] font-serif uppercase tracking-wider block">Suitability & Market Dynamics:</strong>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{activeCalc.suitability}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200/70">
                    {activeCalc.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Action Callout */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-rose-50/80 via-white to-slate-50 border border-rose-200/80 shadow-xs space-y-5 h-full">
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b002c] bg-rose-100/80 px-3 py-1 rounded-full border border-rose-300/50 inline-block">
                    Verified Resale Availability
                  </span>
                  <h3 className="font-serif font-bold text-xl text-slate-900">
                    Lock {selectedCalcSize} at Today's Baseline
                  </h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Avoid paying post-possession premiums. Speak directly with our sales team to verify available plot serial numbers and corner units.
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
                    href={`https://wa.me/923044811717?text=${encodeURIComponent(
                      `Hello! I am interested in verified ${selectedCalcSize} plots listed for sale in Faisal Hills Block B-1 Extension.`
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

        {/* Development Roadmap */}
        <div className="space-y-6">
          <div className="space-y-1.5 border-b border-slate-200 pb-5">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              B1 Extension Construction & Handover Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Track key milestones from heavy civil grading to upcoming possession handovers:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'RDA Sanction & Master Plan', status: 'Completed', note: '100% legally cleared land zoning & layout sanction.', state: 'done' },
              { step: '02', title: 'Heavy Earthwork & Leveling', status: '85%+ Done', note: 'Ground cutting, hill contour grading, and plot pegs.', state: 'done' },
              { step: '03', title: 'Underground Sewerage & Water', status: 'In Progress', note: 'Laying deep RCC pipes and storm drainage culverts.', state: 'active' },
              { step: '04', title: 'Road Base & Asphalt Carpeting', status: 'Ongoing', note: 'Compacting aggregate base course on sector streets.', state: 'active' },
              { step: '05', title: 'Possession & Villa Construction', status: 'Upcoming Phase', note: 'Final electricity energization and plot handover.', state: 'upcoming' }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 ${
                  item.state === 'done'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : item.state === 'active'
                    ? 'bg-rose-50/40 border-[#7b002c]/30 ring-2 ring-[#7b002c]/20'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-slate-400">{item.step}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    item.state === 'done'
                      ? 'bg-emerald-200 text-emerald-900'
                      : item.state === 'active'
                      ? 'bg-[#7b002c] text-white'
                      : 'bg-slate-100 text-slate-500'
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

        {/* Value Discrepancy & Price Delta */}
        <div className="bg-slate-900 text-white rounded-3xl p-7 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-2 max-w-3xl">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
              Market Price Discrepancy & Opportunity
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Why B1 Extension is the #1 Value Opportunity in Faisal Hills
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Compare 5 Marla benchmark rates across sectors. B1 Extension carries a ~50% entry discount compared to mature sectors, giving early buyers the highest runway for capital appreciation:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Executive Block</span>
              <div className="font-serif text-xl font-bold text-slate-200">PKR 95L – 1.30 Cr</div>
              <p className="text-[11px] text-slate-400">Mature entrance block with premium commercial status.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Block A</span>
              <div className="font-serif text-xl font-bold text-slate-200">PKR 85L – 1.15 Cr</div>
              <p className="text-[11px] text-slate-400">Fully developed & inhabited family community.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Block B</span>
              <div className="font-serif text-xl font-bold text-slate-200">PKR 70L – 95L</div>
              <p className="text-[11px] text-slate-400">Central boulevard sector with dedicated sports complex.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#7b002c]/40 border border-rose-400/50 ring-2 ring-rose-500/20 space-y-2">
              <span className="text-xs font-bold text-rose-200 uppercase tracking-wider flex items-center justify-between">
                <span>B1 Extension</span>
                <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Best Value</span>
              </span>
              <div className="font-serif text-2xl font-bold text-white">PKR 38L – 48L</div>
              <p className="text-[11px] text-rose-100/90 font-medium">50%+ entry discount with identical NOC legal security.</p>
            </div>
          </div>
        </div>

        {/* How to Book / Official Zedem Transfer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                How to Book a Resale Plot in B1 Extension
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Securing a plot follows standard verified procedures at Zedem International head office:
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

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 font-sans leading-relaxed">
              <strong className="text-[#7b002c] font-serif block mb-0.5">Overseas Remote Facility:</strong>
              Overseas Pakistanis can execute official power of attorney or complete remote banking verification directly with our sales desk.
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
                    B1 Extension Transfer Desk
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Our certified advisors coordinate file verification, NDC clearance, and legal biometric transfer directly at Zedem International head office.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Official NDC & Dues Clearance</span>
                      <span className="text-[10px] text-slate-400">Zero dues verification before final payment</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">On-Ground Plot Demarcation</span>
                      <span className="text-[10px] text-slate-400">Physical site visit with survey peg markers</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/923044811717?text=I%20am%20interested%20in%20verifying%20and%20booking%20a%20plot%20in%20Faisal%20Hills%20Block%20B1%20Extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Plot Verification Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 11. FAQS & PRIORITY INQUIRY FORM                          */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 space-y-10">
        
        {/* FAQs Accordion */}
        <div className="space-y-6">
          <div className="space-y-1.5 border-b border-slate-200 pb-4">
            <span className="text-[#7b002c] font-bold text-xs uppercase tracking-widest block">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Everything You Need to Know About B1 Extension
            </h2>
          </div>

          <div className="space-y-3">
            {b1Faqs.map((faq, idx) => (
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
              Priority Consultation
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold">
              Interested in Faisal Hills B1 Extension?
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 font-sans leading-relaxed">
              Leave your contact details below to receive current availability, verified resale prices, and on-ground plot verification assistance.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-emerald-200 font-sans text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>Thank you! Your inquiry has been received. Our senior consultant will contact you shortly.</span>
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
                <label className="block text-xs font-semibold text-rose-100 mb-1.5">Preferred Size</label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white text-xs focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer"
                >
                  <option value="5 Marla">5 Marla (25×50)</option>
                  <option value="8 Marla">8 Marla (30×60)</option>
                  <option value="10 Marla">10 Marla (35×70)</option>
                  <option value="Commercial">Commercial Plot</option>
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

      {/* Map Download Modal */}
      {isMapModalOpen && (
        <MapDownloadModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          blockName="Faisal Hills B1 Extension"
        />
      )}

      {/* Lead Inquiry Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedPlotForInquiry(null);
        }}
        defaultBlock="Block B-1 Extension"
        defaultPlot={selectedPlotForInquiry || undefined}
        interest={selectedPlotForInquiry ? `${selectedPlotForInquiry} in B-1 Extension` : 'Block B-1 Extension General Inquiry'}
      />

    </div>
  );
}
