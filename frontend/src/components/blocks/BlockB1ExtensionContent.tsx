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
  ArrowUpRight
} from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
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
  { destination: 'M-1 Motorway Toll Plaza', time: '12 mins', distance: '11 km', note: 'Quick inter-provincial transit' },
  { destination: 'New Islamabad International Airport', time: '25 mins', distance: '28 km', note: 'Direct motorway / expressway link' }
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
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
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
    <div className="space-y-16 lg:space-y-24 py-8">
      
      {/* ========================================================= */}
      {/* 1. SECTOR INTELLIGENCE HERO VISION & STAT METRICS         */}
      {/* ========================================================= */}
      <section className="space-y-6">
        
        {/* Quick Directory Navigation Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs font-semibold text-slate-600">
          <span className="text-slate-400 uppercase tracking-widest text-[10px] shrink-0 font-mono">Jump to:</span>
          <a href="#plots-for-sale" className="px-3.5 py-1.5 rounded-full bg-[#7b002c] text-white hover:bg-[#9e1245] transition whitespace-nowrap shadow-xs">🏡 Plots for Sale</a>
          <a href="#affordability-calc" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#7b002c] hover:text-white transition whitespace-nowrap">ROI & Value Calculator</a>
          <a href="#location-bento" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#7b002c] hover:text-white transition whitespace-nowrap">Location & Map</a>
          <a href="#master-plan" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#7b002c] hover:text-white transition whitespace-nowrap">Master Plan & Cuts</a>
          <a href="#pricing-matrix" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#7b002c] hover:text-white transition whitespace-nowrap">Price Schedule</a>
          <a href="#development-roadmap" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#7b002c] hover:text-white transition whitespace-nowrap">Development Roadmap</a>
          <a href="#value-delta" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#7b002c] hover:text-white transition whitespace-nowrap">Price Comparison</a>
          <a href="#booking-steps" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#7b002c] hover:text-white transition whitespace-nowrap">Booking Desk</a>
          <a href="#faqs" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#7b002c] hover:text-white transition whitespace-nowrap">FAQs</a>
        </div>

        {/* 4 Core Distinct Quantitative Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Entry Advantage</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#7b002c]">
              Under <CountUpNumber end={50} duration={1800} />L
            </div>
            <span className="text-xs text-slate-500 font-sans">Most accessible entry in scheme</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Appreciation Potential</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">
              <CountUpNumber end={60} prefix="+" suffix="% Growth" duration={2000} />
            </div>
            <span className="text-xs text-slate-500 font-sans">High multiple on handover</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Plot Cuts</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              <CountUpNumber end={5} duration={1000} />, <CountUpNumber end={8} duration={1400} /> & <CountUpNumber end={10} duration={1800} /> Marla
            </div>
            <span className="text-xs text-slate-500 font-sans">Optimized compact family cuts</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Security & NOC</span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              <CountUpNumber end={100} suffix="% RDA" duration={1800} />
            </div>
            <span className="text-xs text-slate-500 font-sans">Official Zedem head office transfer</span>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 2. SMART AFFORDABILITY & ROI VALUE CALCULATOR (UNIQUE)    */}
      {/* ========================================================= */}
      <section id="affordability-calc" className="scroll-mt-28 space-y-6">
        
        {/* Header Outside the Container */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Investment Intelligence</span>
            </div>
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
      </section>

      {/* ========================================================= */}
      {/* 3. BENTO GRID: LOCATION & CONNECTIVITY GEOGRAPHY           */}
      {/* ========================================================= */}
      <section id="location-bento" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Location Architecture</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
              Where Is Faisal Hills Block B1 Extension Located?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Planned as a serene interior pocket positioned between Block B, Block A, Block D, and Prime Block:
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Faisal+Hills+Taxila+Block+B"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all hover:scale-105 cursor-pointer shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Item 1: Live Interactive Google Map (7 cols) */}
          <div className="md:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex flex-col justify-between min-h-[380px]">
            <div className="relative w-full h-[320px] sm:h-[360px]">
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
            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-sans">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#7b002c]" />
                Internal Sector B1 Pocket, Faisal Hills N-5
              </span>
              <a
                href="https://maps.google.com/?q=Faisal+Hills+Taxila"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7b002c] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Bento Item 2: Strategic Travel Times Card (5 cols) */}
          <div className="md:col-span-5 bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b002c] bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-block">
                Transit Distances
              </span>
              <h3 className="font-serif font-bold text-xl text-slate-900">
                Key Travel Times from B1 Extension
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Accurate commute windows connecting to major highways and city centers:
              </p>
            </div>

            <div className="space-y-2.5 divide-y divide-slate-100 font-sans text-xs">
              {b1DriveTimes.slice(0, 4).map((item, idx) => (
                <div key={idx} className="pt-2.5 first:pt-0 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">{item.destination}</span>
                    <span className="text-[10px] text-slate-400">{item.distance}</span>
                  </div>
                  <span className="font-serif font-bold text-sm text-[#7b002c] bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Direct connection to 225ft Grand Boulevard.</span>
            </div>
          </div>

          {/* Bento Item 3: Educational Anchor (4 cols) */}
          <div className="md:col-span-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">University Catchment</h4>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Minutes from UET Taxila, HITEC University, and Roots Millennium School, ensuring continuous tenant occupancy.
            </p>
          </div>

          {/* Bento Item 4: Margalla Foothill Air (4 cols) */}
          <div className="md:col-span-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Trees className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">Margalla Hill Atmosphere</h4>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Positioned in a calm, elevated valley with clean air, unpolluted mountain breezes, and low sound pollution.
            </p>
          </div>

          {/* Bento Item 5: GT Road & Inter-Sector Connectivity (4 cols) */}
          <div className="md:col-span-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">Internal Sector Crosslinks</h4>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Internal road network connects directly to Block B, Block A, Block D, and Prime Block without touching the highway.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. MASTER PLAN BLUEPRINT & PLOT SIZE CUTS                 */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Master Plan & Sector Layout</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Faisal Hills Block B1 Extension Master Plan & Cuts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Explore the sector layout, 40ft to 150ft street hierarchy, and demarcated residential plot cuts:
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsMapModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all hover:scale-105 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Master Plan</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual Master Plan Layout */}
          <div className="lg:col-span-5 flex flex-col">
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between pointer-events-none">
                <span className="text-xs font-bold text-white bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow">
                  🔍 Click to Enlarge Blueprint
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30">
                  B1 Extension Blueprint
                </span>
              </div>
            </div>
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
                    <strong>• Sector Commercial Hubs:</strong> Positioned along wide internal avenues to cater to local neighborhood retail.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• High-Yield Retail Units:</strong> Planned for grocery supermarkets, pharmacies, bakeries, and brand outlets.
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 text-slate-700">
                    <strong>• Rapid Catchment Growth:</strong> Positioned to serve over 650 resident homes upon sector completion.
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
      {/* 5. CURRENT PRICE SCHEDULE & VALUATION TABLE               */}
      {/* ========================================================= */}
      <section id="pricing-matrix" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Current Market Valuations</span>
            </div>
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

        {/* Mobile Cards Layout (Clean, No Squeezing) */}
        <div className="block sm:hidden space-y-3.5">
          {filteredPrices.map((row, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900">{row.size}</h4>
                  <span className="text-[11px] text-slate-500">{row.dimensions} ({row.sqYards})</span>
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
                  <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">Price Range</span>
                  <strong className="font-serif font-bold text-sm text-[#7b002c] block mt-0.5">{row.priceRange}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">Status</span>
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
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 font-bold">Plot Size</th>
                <th className="py-3.5 px-4 font-bold">Dimensions</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Price Range</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Market Highlight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredPrices.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold font-serif text-sm text-slate-900 whitespace-nowrap">{row.size}</td>
                  <td className="py-4 px-4 text-slate-600 whitespace-nowrap">{row.dimensions} ({row.sqYards})</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      row.category === 'Residential'
                        ? 'bg-rose-50 text-[#7b002c] border border-rose-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {row.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-serif font-bold text-sm text-[#7b002c] whitespace-nowrap">{row.priceRange}</td>
                  <td className="py-4 px-4 text-emerald-700 font-semibold whitespace-nowrap">{row.possession}</td>
                  <td className="py-4 px-4 text-slate-600 text-xs max-w-xs">{row.highlight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. VERIFIED PLOTS LISTED FOR SALE (B1 EXTENSION)          */}
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
                text="Block B-1 Extension Plots for Sale — Direct Booking & Resale Files"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                Explore available residential plots and commercial cuts in B1 Extension with transparent market pricing, zero dealer hidden charges, and immediate allotment file verification.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
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

        {/* Plot Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedB1Plots.map((plot, idx) => (
            <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 80}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                <div>
                  {/* Plot Image Container -> Links to /plots inventory page */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-b1-extension`}
                    className="relative h-44 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                  >
                    <img
                      src={plot.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'}
                      alt={plot.plotNumber}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                    {/* Plot Number & Block */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] text-slate-300 font-medium block uppercase tracking-wider">{plot.blockName || 'Block B-1 Extension'}</span>
                      <h4 className="font-serif font-bold text-xl group-hover:text-amber-300 transition-colors">#{plot.plotNumber}</h4>
                    </div>
                  </Link>

                  {/* Specs Details -> Links to /plots inventory page */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-b1-extension`}
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
                        <span className="text-slate-500 font-medium">Trend / Status:</span>
                        <span className="text-emerald-700 font-bold">{plot.priceHistoryTrend || 'High Demand Resale'}</span>
                      </div>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
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

                {/* Price & Action Buttons Footer */}
                <div className="p-4 pt-3 border-t border-slate-100 mt-2 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Total Demand</span>
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
                      href={`https://wa.me/923044811717?text=${encodeURIComponent(
                        `Hi! I am interested in buying Block B-1 Extension Plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share verification & transfer details.`
                      )}`}
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
      </section>

      {/* ========================================================= */}
      {/* 7. DEVELOPMENT ROADMAP / TIMELINE (DISTINCTIVE)           */}
      {/* ========================================================= */}
      <section id="development-roadmap" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>Infrastructure Roadmap</span>
          </div>
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
      </section>

      {/* ========================================================= */}
      {/* 7. PRICE DELTA COMPARISON: B1 EXTENSION VS OTHER BLOCKS   */}
      {/* ========================================================= */}
      <section id="value-delta" className="scroll-mt-28 bg-slate-900 text-white rounded-3xl p-7 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-6">
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
      </section>

      {/* ========================================================= */}
      {/* 8. HOW TO BOOK / VERIFIED ZEDEM TRANSFER DESK             */}
      {/* ========================================================= */}
      <section id="booking-steps" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Content Left */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Documentation Checklist</span>
              </div>
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

          {/* Booking & Transfer Facilitation Action Card Right */}
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
                  href="https://wa.me/923000000000?text=I%20am%20interested%20in%20verifying%20and%20booking%20a%20plot%20in%20Faisal%20Hills%20Block%20B1%20Extension"
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
      {/* 9. HIGH-RESOLUTION CINEMATIC PHOTO SLIDER                 */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Development Photography</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              B1 Extension & Surrounding Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Explore authentic high-resolution on-ground photography across the sector:
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shrink-0">
            <span>{currentSlide + 1}</span>
            <span className="text-slate-400">/</span>
            <span>{b1SliderImages.length}</span>
          </div>
        </div>

        {/* Cinematic Slider Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-900/40 bg-slate-950 group h-[360px] sm:h-[480px] md:h-[540px] lg:h-[620px] select-none">
          <img
            key={currentSlide}
            src={b1SliderImages[currentSlide].image}
            alt={b1SliderImages[currentSlide].title}
            className="w-full h-full object-cover transition-opacity duration-700 animate-fadeIn"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

          <div className="absolute top-5 left-5 z-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
              {b1SliderImages[currentSlide].tag}
            </span>
          </div>

          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next Slide"
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <div className="absolute bottom-6 sm:bottom-10 inset-x-0 text-center text-white px-6 pointer-events-none space-y-1.5 z-10">
            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.15em] sm:tracking-[0.25em] text-white uppercase drop-shadow-2xl">
              {b1SliderImages[currentSlide].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans tracking-wide drop-shadow-md">
              {b1SliderImages[currentSlide].sub}
            </p>
          </div>

          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 z-20">
            {b1SliderImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? 'w-8 bg-rose-400'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. EXPANDING SHOWCASE: EXPLORE OTHER BLOCKS              */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Faisal Hills Sectors</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Explore Other Faisal Hills Blocks & Landmarks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Hover across the sector columns to view each block's location advantages, development progress, and direct links:
          </p>
        </div>

        <ExpandingProjectsShowcase
          items={defaultFaisalHillsBlocks}
          defaultActiveIndex={3}
          containerHeightClass="h-[480px] lg:h-[520px]"
        />
      </section>

      {/* ========================================================= */}
      {/* 11. INTERACTIVE FAQ ACCORDION                             */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 space-y-6">
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
      </section>

      {/* ========================================================= */}
      {/* 12. INQUIRY LEAD FORM                                     */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-[#7b002c] via-[#5a0020] to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
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
      </section>

      {/* Map Download Modal */}
      {isMapModalOpen && (
        <MapDownloadModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          blockName="Faisal Hills B1 Extension"
        />
      )}

    </div>
  );
}
