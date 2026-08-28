'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Dumbbell,
  Trophy,
  Car,
  Plane,
  Shield,
  HelpCircle,
  Activity,
  Check,
  Compass,
  Layers,
  Download,
  Send
} from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';

interface BlockBPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  category: 'Residential' | 'Commercial';
  priceRange: string;
  possession: string;
  highlight: string;
}

const blockBPriceSchedule: BlockBPriceRow[] = [
  {
    size: '5 Marla',
    dimensions: '25 × 50',
    sqYards: '139 Sq. Yds',
    category: 'Residential',
    priceRange: 'PKR 35 Lacs – 70 Lacs',
    possession: '100% Possession Ready',
    highlight: 'Very High Demand — Highly Liquid Resale'
  },
  {
    size: '8 Marla',
    dimensions: '30 × 60',
    sqYards: '200 Sq. Yds',
    category: 'Residential',
    priceRange: 'PKR 50 Lacs – 95 Lacs',
    possession: 'Immediate Construction',
    highlight: 'Mid-Size Family Construction'
  },
  {
    size: '10 Marla',
    dimensions: '35 × 70',
    sqYards: '272 Sq. Yds',
    category: 'Residential',
    priceRange: 'PKR 75 Lacs – 1.25 Crore',
    possession: 'Ready for Home Building',
    highlight: 'High Demand — Growing Families'
  },
  {
    size: '14 Marla',
    dimensions: '40 × 80',
    sqYards: '355 Sq. Yds',
    category: 'Residential',
    priceRange: 'PKR 95 Lacs – 1.50 Crore',
    possession: 'Demarcated & Possession Ready',
    highlight: 'Useful Intermediate Executive Size'
  },
  {
    size: '1 Kanal',
    dimensions: '50 × 90',
    sqYards: '500 Sq. Yds',
    category: 'Residential',
    priceRange: 'PKR 1.15 Crore – 1.85 Crore',
    possession: '100% On-Ground Handover',
    highlight: 'Stable Long-Term Estate Value'
  },
  {
    size: '2 Kanal',
    dimensions: '75 × 120',
    sqYards: '1,000 Sq. Yds',
    category: 'Residential',
    priceRange: 'PKR 3.00 Crore – 4.50 Crore',
    possession: 'Exclusive Custom Plots',
    highlight: 'Ultra-Luxury Custom Mansions'
  },
  {
    size: 'Commercial (Four Sizes)',
    dimensions: '90×84 to 220×229',
    sqYards: 'Multiple cuts',
    category: 'Commercial',
    priceRange: 'PKR 1.50 Crore – 4.80 Crore',
    possession: 'Ground + 4 Approval',
    highlight: '225ft Grand Boulevard Frontage'
  }
];

const travelTimePoints = [
  { destination: 'Quaid Avenue / N-125 Road / Margalla Avenue', time: '~ 5 mins', icon: Car },
  { destination: 'Taxila City', time: '5 - 10 mins', icon: Landmark },
  { destination: 'Tarnol Morr / Wah Cantt', time: '~ 10 mins', icon: Navigation },
  { destination: 'M-1 Motorway Ramp (Peshawar-Islamabad)', time: '10 - 15 mins', icon: Compass },
  { destination: 'Paswal Road', time: '~ 12 mins', icon: MapPin },
  { destination: 'Islamabad City (Zero Point)', time: '30 - 35 mins', icon: Building2 },
  { destination: 'Islamabad International Airport', time: '35 - 40 mins', icon: Plane },
  { destination: 'Rawalpindi City (Saddar / Cantt)', time: '30 - 50 mins', icon: Building }
];

const blockBFaqs = [
  {
    q: 'Is Faisal Hills B Block RDA approved?',
    a: 'Yes. Faisal Hills Islamabad B Block falls under the society\'s RDA-approved area, covering roughly 11,823 kanals of land. That approval confirms the project cleared RDA\'s review of zoning, land use, and basic infrastructure planning. Always confirm current NOC documentation directly with the developer or RDA before making any payment.'
  },
  {
    q: 'Where exactly is Faisal Hills B Block located?',
    a: 'Block B sits directly between Block A and Block C, fronting the 225-foot Grand Boulevard that runs through the heart of Faisal Hills. It connects directly out to GT Road (N-5), Taxila, and the M-1 Motorway, allowing a drive of roughly 30 to 35 minutes into central Islamabad and Rawalpindi.'
  },
  {
    q: 'What plot sizes are available in Block B?',
    a: 'Residential plots range from 5 Marla up to 2 Kanal, including 8 Marla, 10 Marla, and 14 Marla options. Commercial plots come in four standard sizes, from 90×84 up to 220×229, catering to high-yield commercial plazas and mixed-use towers.'
  },
  {
    q: 'What is the price of a 5 Marla and 10 Marla plot in Block B?',
    a: 'A 5 Marla plot currently ranges between roughly PKR 35 Lakh and 70 Lakh, while 10 Marla plots typically range from PKR 75 Lakh to 1.25 Crore, depending on exact location, elevation, and corner or park-facing status.'
  },
  {
    q: 'What is the price of a 1 Kanal plot in Block B?',
    a: 'A 1 Kanal plot generally runs between PKR 1.15 Crore and 1.85 Crore, offering exceptional long-term holding value and space for custom luxury villas.'
  },
  {
    q: 'Does Faisal Hills Block B offer a payment plan, or is it cash-only?',
    a: 'Most current Block B inventory is resale, and many of these transactions are full cash. Installment availability depends on the specific plot and seller, so confirm directly with our sales office for specific plot terms.'
  },
  {
    q: 'Is Block B fully developed and ready for possession?',
    a: 'Main 120ft roads, the 225ft Grand Boulevard, and 100ft service roads are largely complete and functional. Residential homes are built with active residents, and core utilities (electricity, water, sewerage) are operational. Commercial zones, sports arenas, and theme parks are progressing steadily.'
  },
  {
    q: 'What documents do I need to book a plot, especially as an overseas Pakistani?',
    a: 'You will generally need two copies of your CNIC (or NICOP for overseas applicants), two copies of your Next of Kin\'s CNIC, two passport-sized photographs, and proof of payment. Overseas buyers can authorize a representative via power of attorney for in-person steps or complete transactions remotely.'
  },
  {
    q: 'How does Block B compare to other Faisal Hills blocks?',
    a: 'Block B is the largest block in the society and holds a central position between Block A and Block C on the main boulevard. It provides strong commercial potential, a dedicated sports arena, 10+ parks, and the widest selection of plot sizes, making it ideal for diverse budgets.'
  }
];

export default function BlockBContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const blockBSliderImages = useMemo(() => [
    {
      id: 1,
      title: 'GRAND JAMIA MOSQUE',
      sub: 'Grand Jamia Mosque Structure in Sector B',
      tag: 'Religious Landmark',
      image: '/images/imgi_46_Mosques.webp'
    },
    {
      id: 2,
      title: 'SPORTS ARENA & COMPLEX',
      sub: 'Dedicated Multi-Sport Arena & Floodlit Futsal Turf',
      tag: 'Active Lifestyle',
      image: '/images/imgi_48_sports-arena.webp'
    },
    {
      id: 3,
      title: '225FT GRAND BOULEVARD',
      sub: 'Main Arterial Commercial Highway Connecting Sectors',
      tag: 'Road Infrastructure',
      image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
    },
    {
      id: 4,
      title: 'MARGALLA MOUNTAIN PANORAMA',
      sub: 'Elevated Hilltop Ridge with Natural Valley Vistas',
      tag: 'Scenic Crest',
      image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg'
    },
    {
      id: 5,
      title: 'COMMUNITY PARKS & LEISURE',
      sub: '10+ Landscaped Neighborhood Green Belts & Family Parks',
      tag: 'Green Belts',
      image: '/images/faisal-park.jpg'
    },
    {
      id: 6,
      title: 'RESIDENTIAL VILLAS & ENCLAVES',
      sub: 'Active Home Construction & Inhabited Neighborhoods',
      tag: 'Livable Community',
      image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg'
    }
  ], []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? blockBSliderImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === blockBSliderImages.length - 1 ? 0 : prev + 1));
  };

  // Form states
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedBlockBPlotFilter, setSelectedBlockBPlotFilter] = useState<'all' | '5 Marla' | '8 Marla' | '10 Marla' | '14 Marla' | '1 Kanal' | 'Commercial'>('all');

  // Live plots sync
  const [allPlots, setAllPlots] = useState<PlotItem[]>([]);

  useEffect(() => {
    fetchPlots().then(data => setAllPlots(data || [])).catch(console.error);

    const handleSync = () => {
      fetchPlots().then(data => setAllPlots(data || [])).catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handleSync);
    return () => window.removeEventListener('faisal_plots_updated', handleSync);
  }, []);

  const blockBPlots = useMemo(() => {
    return allPlots.filter(
      p => p.blockSlug === 'block-b' || (p.blockName && p.blockName.toLowerCase() === 'block b')
    );
  }, [allPlots]);

  const dynamicPriceSchedule = useMemo(() => {
    const blockPlots = allPlots.filter(p => p.blockSlug === 'block-b');
    if (blockPlots.length === 0) return blockBPriceSchedule;

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
                 plot.size.includes('14 Marla') ? '355 Sq. Yds' :
                 plot.size.includes('1 Kanal') ? '500 Sq. Yds' : 'Standard Area',
        category: (plot.propertyType || plot.category || 'Residential') as 'Residential' | 'Commercial',
        priceRange: priceText,
        possession: '100% Possession Ready',
        highlight: plot.status || 'Ready for Construction'
      };
    });
  }, [allPlots]);

  const displayedBlockBPlots = useMemo(() => {
    if (selectedBlockBPlotFilter === 'all') return blockBPlots;
    if (selectedBlockBPlotFilter === 'Commercial') {
      return blockBPlots.filter(p => p.category === 'Commercial');
    }
    return blockBPlots.filter(p => p.size.toLowerCase().includes(selectedBlockBPlotFilter.toLowerCase()));
  }, [blockBPlots, selectedBlockBPlotFilter]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const existingLeads = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
      const newLead = {
        id: `lead-b-${Date.now()}`,
        name: leadName || 'Interested Buyer',
        phone: leadPhone || 'N/A',
        interest: 'Faisal Hills Block B Inquiry / Site Visit',
        submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      localStorage.setItem('faisal_leads_data', JSON.stringify([newLead, ...existingLeads]));
      window.dispatchEvent(new Event('faisal_leads_updated'));
    }
    setSubmitted(true);

    const waText = encodeURIComponent(
      `Hello Faisal Hills Sales Desk!\n\nI am interested in Faisal Hills Block B (Plots / Site Visit / Rates).\nName: ${leadName}\nPhone: ${leadPhone}\nBlock: Block B (Central Sports & Residential Sector)`
    );

    setTimeout(() => {
      window.open(`https://wa.me/923044811717?text=${waText}`, '_blank');
    }, 600);
  };



  return (
    <div className="space-y-12 lg:space-y-16">

      {/* ========================================================= */}
      {/* 1. SECTOR B OVERVIEW & STRATEGIC VISION (RICH HERO)       */}
      {/* ========================================================= */}
      <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative with See More toggle */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Sports Capital & Mountain Vista Sector</span>
                </div>

                <TextReveal
                  as="h2"
                  text="Faisal Hills Block B — The Grand Central Sector of Active Living"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p className="font-semibold text-slate-900">
                    If you're researching Faisal Hills Islamabad B Block, you've probably noticed it comes up more often than most other blocks in the society. That's not an accident. Block B is the largest block in Faisal Hills, sitting right between Block A and Block C, and it's built around the 225-foot Grand Boulevard that connects straight out to GT Road. For buyers comparing blocks, that combination of size, central position, and boulevard access tends to be the deciding factor.
                  </p>

                  <p>
                    This comprehensive guide covers what actually matters before you commit to a plot here: where Block B sits relative to Islamabad, Rawalpindi, and Taxila, current plot sizes and prices, how the payment structure works right now, what's been built on the ground, and the exact documents you'll need to book.
                  </p>

                  {isOverviewExpanded && (
                    <div className="space-y-3 animate-fadeIn">
                      <p>
                        Engineered as the society's premier wellness and lifestyle destination, Block B is uniquely equipped with a world-class <strong>dedicated Sports Complex</strong>, international-standard futsal and tennis arenas, jogging tracks, and over <strong>10 landscaped community parks</strong>.
                      </p>
                      <p>
                        With 100% RDA approval, on-ground possession handovers, and full underground utility networks, Block B offers unbeatable investment value for both end-users building dream homes and astute investors seeking strong capital gains.
                      </p>
                      <div className="p-4 bg-gradient-to-r from-rose-50/90 via-rose-50/50 to-amber-50/60 rounded-2xl border border-rose-200/80 text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-3 shadow-2xs">
                        <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                        <span>
                          <strong>Community Hallmark:</strong> Block B provides the widest selection of plot cuts in Faisal Hills (5 Marla to 2 Kanal), catering perfectly to budget-conscious families as well as bespoke luxury mansion builders.
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

            {/* Quick Directory Jump Chips */}
            <ScrollReveal direction="up" delay={100}>
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <a
                  href="#series-explorer"
                  className="px-3.5 py-1.5 rounded-full bg-[#7b002c] text-white hover:bg-[#9e1245] border border-[#7b002c] text-xs font-bold transition-all shadow-2xs hover:scale-105"
                >
                  🏡 Plots for Sale
                </a>
                <a
                  href="#travel-times"
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] text-xs font-bold transition-all shadow-2xs hover:scale-105"
                >
                  🚗 Distances & Roads
                </a>
                <a
                  href="#sports-arena"
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] text-xs font-bold transition-all shadow-2xs hover:scale-105"
                >
                  ⚽ Sports Complex
                </a>
                <a
                  href="#pricing-matrix"
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] text-xs font-bold transition-all shadow-2xs hover:scale-105"
                >
                  💰 Price Matrix
                </a>
                <a
                  href="#master-plan"
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] text-xs font-bold transition-all shadow-2xs hover:scale-105"
                >
                  🗺️ Master Blueprint
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual Showcase Banner */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={80}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group min-h-[380px] sm:min-h-[440px] flex flex-col justify-end">
                <img
                  src="/images/faisal-park.jpg"
                  alt="Faisal Hills Block B Parks and Sports Complex"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-bold text-white bg-[#7b002c] px-3.5 py-1.5 rounded-full shadow-md border border-white/20">
                    Active Development
                  </span>
                </div>

                {/* Bottom Highlight Overlay */}
                <div className="relative z-10 p-6 space-y-2">
                  <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">Central Landmark</span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    Sector B Sports Arena & Central Green Promenade
                  </h3>
                  <p className="text-xs text-slate-200/90 leading-relaxed font-sans">
                    10+ landscaped community parks, floodlit futsal turf, basketball courts, and scenic Margalla ridge views.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>



      {/* ========================================================= */}
      {/* 3. LOCATION ADVANTAGE & MAP                               */}
      {/* ========================================================= */}
      <section id="location-map" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Narrative & Key Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Navigation className="w-3.5 h-3.5" />
                <span>Location Advantage</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
                Where Is Faisal Hills B Block Located?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Block B holds a genuinely central position in Faisal Hills. It sits directly between Block A and Block C, fronting the <strong>225-foot Grand Boulevard</strong> that runs through the heart of the society. That boulevard connects out to the main GT Road (N-5), which is the real advantage here — Block B residents aren't tucked away on a side street; they're on the society's primary artery.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Beyond the boulevard, the block benefits from being close to Taxila, Wah Cantt, and the M-1 Motorway ramp, while still being a manageable drive from both Rawalpindi and Central Islamabad.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-600 font-sans flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>225ft Grand Boulevard & GT Road Access</span>
              </div>
              <a
                href="https://maps.google.com/?q=Faisal+Hills+Taxila"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow-xs transition-all hover:scale-105"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 text-white/80" />
              </a>
            </div>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <iframe
                title="Faisal Hills Block B Location Map"
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
      {/* 4. TRAVEL TIMES & LANDMARK ACCESSIBILITY (SEO GRID)       */}
      {/* ========================================================= */}
      <section id="travel-times" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Accessibility & Commute</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Distance from Major Roads & Landmarks
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-4xl">
              These are approximate drive times from Block B. Times will vary with traffic and your exact starting point inside the block, but they reflect the access most residents report:
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={80}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950 text-white rounded-3xl p-6 lg:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-4 space-y-4 flex flex-col justify-center relative z-10">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Central Accessibility</span>
              <h4 className="font-serif text-2xl font-bold text-white">Effortless Highway Connectivity</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Commuting into Islamabad and Rawalpindi is highly convenient, without navigating narrow internal streets first. Direct egress onto the 225ft Grand Boulevard.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct GT Road & M-1 Access</span>
                </span>
              </div>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {travelTimePoints.map((item, idx) => (
                <div key={idx} className="bg-slate-900/80 hover:bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs transition group">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-300">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-slate-300 font-medium">{item.destination}</span>
                  </div>
                  <span className="font-bold text-amber-400 shrink-0 ml-2 font-mono">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 5. EXCLUSIVE SPORTS & ACTIVE LIFESTYLE HIGHLIGHT (UNIQUE)  */}
      {/* ========================================================= */}
      <section id="sports-arena" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>Wellness & Recreation Hub</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Sector B Dedicated Sports Complex & Parks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Faisal Hills Block B is thoughtfully crafted around health, outdoor activity, and active family living.
            </p>
          </div>
          <span className="shrink-0 text-xs font-bold text-[#7b002c] bg-rose-50 border border-rose-200 px-4 py-2 rounded-2xl">
            ⚽ International Standard Turf
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Floodlit Sports & Futsal Arena',
              desc: 'Dedicated synthetic turf arena for football, futsal leagues & active evening tournaments.',
              tag: 'Sports Complex',
              image: '/images/imgi_48_sports-arena.webp'
            },
            {
              title: '10+ Central Community Parks',
              desc: 'Expansive family parks with flowering gardens, fountains, gazebos, and secure children play areas.',
              tag: 'Family Parks',
              image: '/images/faisal-park.jpg'
            },
            {
              title: 'Faisal Hills Glow Garden',
              desc: 'Illuminated theme park offering spectacular night-time lighting displays and leisure walks.',
              tag: 'Theme Park',
              image: '/images/imgi_45_Glow-garden.webp'
            },
            {
              title: 'Urban Forest & Walking Trails',
              desc: 'Preserved green belts and shaded walking tracks encircled by scenic Margalla hills views.',
              tag: 'Nature Trails',
              image: '/images/faisal-forest.jpg'
            }
          ].map((sport, idx) => (
            <div key={idx} className="group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src={sport.image}
                  alt={sport.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-[#7b002c]/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  {sport.tag}
                </span>
              </div>
              <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">{sport.title}</h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed pt-1.5">{sport.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. BLOCK B MASTER PLAN LAYOUT & PLOT CATEGORIES           */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Master Plan & Sector Layout</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Faisal Hills Block B Master Plan & Plot Layout
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Explore the detailed sector layout, road hierarchy (40ft to 225ft), and exact plot cuts across Sector B:
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
                  alt="Faisal Hills Block B Master Plan Sector Layout"
                  className="w-full h-auto max-h-[460px] object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between pointer-events-none">
                <span className="text-xs font-bold text-white bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow">
                  🔍 Click to Enlarge Blueprint
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/30">
                  Block B Sector Layout
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
                    <strong>• 5 Marla (25×50):</strong> Ideal for compact, modern homes; easiest to resell.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 8 Marla (30×60):</strong> Mid-size option popular for family construction.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 10 Marla (35×70):</strong> Popular for growing families needing extra space.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 14 Marla (40×80):</strong> Useful intermediate executive size.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 1 & 2 Kanal (50×90 & 75×120):</strong> Luxury estate villas with mountain views.
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-sans pt-2 border-t border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% on-ground demarcated plots.</span>
              </div>
            </div>

            {/* Commercial Plots Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Commercial Cuts</span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Commercial Opportunities
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• Four Commercial Cuts:</strong> 90×84, 120×229, 195×228, and 220×229.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• High-Rise Mixed-Use:</strong> Sanctioned multi-story plazas along the 225ft Boulevard.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• Ground + 4 Approval:</strong> Ready for corporate retail, brand stores, and offices.
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 text-slate-700">
                    <strong>• Prime Visibility:</strong> High consumer foot traffic and wide dedicated parking bays.
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-sans pt-2 border-t border-slate-100 flex items-center justify-between">
                <Link href="/faisal-hills-commercial" className="text-[#7b002c] font-bold hover:underline flex items-center gap-1">
                  <span>Commercial Rates</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
                <Link href="/blocks/executive-block" className="text-[#7b002c] font-bold hover:underline flex items-center gap-1">
                  <span>Mixed-Use</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. CURRENT PLOT PRICE SCHEDULE & VALUATION TABLE          */}
      {/* ========================================================= */}
      <section id="pricing-matrix" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Verified 2026 Market Valuation</span>
              </div>
              <TextReveal
                as="h2"
                text="Faisal Hills Block B Plot Prices & Rate Guide"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-sans">
                Real-time prevailing cash market valuations across all residential and commercial plot categories in Sector B:
              </p>
            </div>
            <a
              href="https://wa.me/923044811717?text=Hi%2C%20I%20would%20like%20to%20request%20the%20current%20Faisal%20Hills%20Block%20B%20plot%20inventory%20and%20rates."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Get Live Price Quote</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Pricing Responsive View */}
        <ScrollReveal direction="up" delay={80}>
          {/* Mobile Card Layout */}
          <div className="block md:hidden space-y-4">
            {dynamicPriceSchedule.map((row, idx) => (
              <div key={idx} className="bg-slate-50/80 rounded-2xl border border-slate-200 p-4 space-y-3.5 shadow-2xs">
                <div className="flex items-start justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div>
                    <span className="font-serif font-bold text-lg text-slate-900 block">{row.size}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{row.dimensions} • {row.sqYards}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    row.category === 'Commercial' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}>
                    {row.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Price Range</span>
                    <strong className="font-serif text-sm font-bold text-[#7b002c] block mt-0.5">{row.priceRange}</strong>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Possession</span>
                    <strong className="text-slate-900 font-bold block mt-0.5">{row.possession}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#7b002c] shrink-0" />
                  <span>{row.highlight}</span>
                </div>

                <a
                  href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20Block%20B%20${encodeURIComponent(row.size)}%20plot.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire {row.size} Plot</span>
                </a>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                <tr>
                  <th className="p-4">Plot Size & Category</th>
                  <th className="p-4">Dimensions</th>
                  <th className="p-4">Area (Sq. Yds)</th>
                  <th className="p-4">Prevailing Market Price</th>
                  <th className="p-4">Possession Status</th>
                  <th className="p-4 text-right">Inquiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {dynamicPriceSchedule.map((row, idx) => (
                  <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <strong className="font-serif font-bold text-sm text-slate-900">{row.size}</strong>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          row.category === 'Commercial' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {row.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">{row.highlight}</span>
                    </td>
                    <td className="p-4 font-mono text-slate-600 font-medium">{row.dimensions}</td>
                    <td className="p-4 text-slate-600">{row.sqYards}</td>
                    <td className="p-4">
                      <strong className="font-serif font-bold text-sm text-[#7b002c] block">{row.priceRange}</strong>
                      <span className="text-[10px] text-slate-500 font-sans">Cash Resale Benchmark</span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {row.possession}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20Block%20B%20${encodeURIComponent(row.size)}%20plot.`}
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
          <span>* Pricing varies based on exact plot location, boulevard frontage, park-facing, and corner status (typically +10% to +15% premium).</span>
          <span className="font-bold text-[#7b002c] shrink-0">Official Registered Transfers Only</span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. VERIFIED PLOTS LISTED FOR SALE (BLOCK B)               */}
      {/* ========================================================= */}
      <section id="series-explorer" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>Verified Inventory & Resale Files</span>
              </div>
              <TextReveal
                as="h2"
                text="Faisal Hills Block B Plots for Sale — Direct Booking & Verified Files"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                Explore available on-ground residential plots and commercial plazas in Block B with transparent pricing, zero dealer markup, and immediate allotment file verification.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
              {(['all', '5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal', 'Commercial'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedBlockBPlotFilter(sz)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedBlockBPlotFilter === sz
                      ? 'bg-[#7b002c] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sz === 'all' ? `All (${blockBPlots.length})` : sz}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Plot Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedBlockBPlots.map((plot, idx) => (
            <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 80}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                <div>
                  {/* Plot Image Container -> Links to /plots inventory page */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-b`}
                    className="relative h-44 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                  >
                    <img
                      src={plot.image || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80'}
                      alt={plot.plotNumber}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                    {/* Plot Number & Block */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] text-slate-300 font-medium block uppercase tracking-wider">{plot.blockName || 'Block B'}</span>
                      <h4 className="font-serif font-bold text-xl group-hover:text-amber-300 transition-colors">#{plot.plotNumber}</h4>
                    </div>
                  </Link>

                  {/* Specs Details -> Links to /plots inventory page */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-b`}
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
                        <span className="text-emerald-700 font-bold">{plot.priceHistoryTrend || 'Active Demand'}</span>
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
                      href={`https://wa.me/923044811717?text=${encodeURIComponent(
                        `Hi! I am interested in buying Block B Plot #${plot.plotNumber} (${plot.size} - ${plot.priceFormatted}). Please share verification & transfer details.`
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

        {/* Sell / List Your Block B Plot Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-[#4a081a] to-slate-950 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Resale & Liquidation Desk</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Want to Sell or Assess Your Block B Plot / File?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Get an instant official market valuation and list your file for thousands of active verified buyers across Islamabad, Rawalpindi, and overseas.
            </p>
          </div>

          <a
            href="https://wa.me/923044811717?text=Hello!%20I%20want%20to%20list%20or%20sell%20my%20plot%20in%20Faisal%20Hills%20Block%20B."
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
      {/* 9. DEVELOPMENT UPDATE & CONSTRUCTION STATUS (IMG LEFT)    */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Image Left */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ScrollReveal direction="left" delay={50}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group min-h-[340px] sm:min-h-[400px] flex flex-col justify-end">
                <img
                  src="/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
                  alt="Faisal Hills Block B On-Ground Construction & Asphalt Roads"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="relative z-10 p-6 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-200 bg-[#7b002c] px-3 py-1 rounded-full border border-white/20 inline-block shadow">
                    Active Development 2026
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">Carpeted Boulevards & Utilities</h4>
                  <p className="text-[11px] text-slate-300 font-sans">
                    120ft and 225ft roads operational with underground electric grid.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Content Right */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <ScrollReveal direction="right" delay={50}>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" />
                  <span>On-Ground Progress</span>
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                  Development Update & Construction Status
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Development in Block B has moved at a steady, visible pace across all residential and commercial zones:
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
                <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <strong className="text-[#7b002c] font-serif text-sm sm:text-base">Current Construction Status</strong>
                  </div>
                  <p className="text-slate-600 font-sans leading-relaxed text-xs sm:text-sm">
                    The main 120-foot roads, the 225-foot Grand Boulevard, and the 100-foot service roads are largely complete and functional, meaning the block feels lived-in. Residential homes are built and utility networks (electricity, water, and sewerage) are operational. Commercial zones, sports complexes, and theme parks remain under construction.
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <strong className="text-[#7b002c] font-serif text-sm sm:text-base">What's Coming Next in 2026</strong>
                  </div>
                  <p className="text-slate-600 font-sans leading-relaxed text-xs sm:text-sm">
                    Commercial blocks and recreational arenas will continue to develop over the coming year. Ask the sales office for specific timelines on recreational zones rather than a general estimate.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. AMENITIES & COMMUNITY FACILITIES (IMG RIGHT)          */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Content Left */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Full Society Specs</span>
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                  Amenities & Community Facilities in Block B
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Block B is master-planned as a self-contained lifestyle ecosystem with top-tier infrastructure and family spaces:
                </p>
              </div>

              <div className="space-y-4 pt-1">
                <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#7b002c]" />
                    <span>Security & Infrastructure</span>
                  </span>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 font-sans">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Gated, controlled entry points & 24/7 security with CCTV monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Underground electrification & Sui gas connectivity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Underground/overhead water supply with sewerage disposal stations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Wide 40-foot residential streets and the 225-foot Grand Boulevard</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c] flex items-center gap-2">
                    <Trees className="w-4 h-4 text-[#7b002c]" />
                    <span>Lifestyle & Community</span>
                  </span>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2 font-sans">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Multiple manicured parks (around 10) & a dedicated theme park</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Sports complex with grounds for cricket and football</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>7 to 8 mosques distributed through the block & 2 graveyards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>7 educational institutions, commercial areas, shops, and a shopping mall</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Image Right */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={50}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group min-h-[340px] sm:min-h-[400px] flex flex-col justify-end">
                <img
                  src="/images/faisal-park.jpg"
                  alt="Faisal Hills Block B Parks & Community Amenities"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="relative z-10 p-6 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-200 bg-[#7b002c] px-3 py-1 rounded-full border border-white/20 inline-block shadow">
                    Recreation & Parks
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">10+ Sector Community Parks</h4>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Lush green spaces, children play areas, and sports grounds across Block B.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. WHY INVEST IN FAISAL HILLS BLOCK B (IMG LEFT)         */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Image Left */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ScrollReveal direction="left" delay={50}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group min-h-[340px] sm:min-h-[400px] flex flex-col justify-end">
                <img
                  src="/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg"
                  alt="Faisal Hills Block B Grand Boulevard Commercial Growth"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="relative z-10 p-6 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-amber-300/30 inline-block shadow">
                    Commercial Growth Axis
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">225ft Grand Boulevard Frontage</h4>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Prime commercial corridor linking directly to GT Road and M-1 Motorway.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Content Right */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <ScrollReveal direction="right" delay={50}>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Investment Thesis</span>
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#7b002c]">
                  Why Invest in Faisal Hills Block B?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Block B's position on the Grand Boulevard, directly linking to GT Road, gives it stronger commercial potential than some of the more residential-only blocks in the society. RDA approval reduces regulatory risk. Since original allotments have sold out, the active resale market signals real demand, making this a concrete investment zone.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <strong className="font-serif font-bold text-sm text-slate-900 block">High Liquidity Resale</strong>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Continuous buying and selling turnover ensures quick entry and exit for investors.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <strong className="font-serif font-bold text-sm text-slate-900 block">RDA Sanctioned Security</strong>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Full regulatory clearance protecting your capital and property transfer rights.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-rose-50/70 rounded-2xl border border-rose-200/80">
                <span className="text-xs text-slate-700 font-sans font-medium">
                  Compare cash deals with our structured payment plans:
                </span>
                <Link
                  href="/payment-plan"
                  className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Full Payment Plans</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. HOW TO BOOK A RESALE PLOT (IMG RIGHT)                 */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Content Left */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Documentation Checklist</span>
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                  How to Book a Resale Plot in Block B
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Booking a resale or available plot in Block B follows a standard, secure process with official Zedem International transfer:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  { title: 'CNIC / NICOP Copies', desc: 'Two clear copies of buyer CNIC (or NICOP for overseas applicants).' },
                  { title: 'Next of Kin Details', desc: 'Two copies of your designated Next of Kin valid CNIC.' },
                  { title: 'Passport Photographs', desc: 'Two recent passport-sized photographs with white background.' },
                  { title: 'Payment Instrument', desc: 'Demand draft / pay order or banking transfer in developer name.' }
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
                Overseas Pakistanis can execute power of attorney or complete remote banking transactions directly with our authorized sales desk.
              </div>
            </ScrollReveal>
          </div>

          {/* Booking & Transfer Facilitation Action Card */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={50}>
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
                      Block B Transfer Desk
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
                    href="https://wa.me/923000000000?text=I%20am%20interested%20in%20verifying%20and%20booking%20a%20resale%20plot%20in%20Faisal%20Hills%20Block%20B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Plot Verification Desk</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. COMPARE BLOCK B VS OTHER SECTORS (DARK SHOWCASE)      */}
      {/* ========================================================= */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-4">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Block Comparison</span>
        <h3 className="font-serif text-2xl font-bold text-white">Compare Block B vs Other Sectors</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl font-sans">
          The <Link href="/blocks/executive-block" className="text-amber-400 hover:underline font-semibold">Executive Block</Link> and <Link href="/blocks/prime-block" className="text-amber-400 hover:underline font-semibold">Prime Block</Link> tend to sit at a premium price point with centralized development. <Link href="/blocks/block-a" className="text-amber-400 hover:underline font-semibold">Block A</Link> offers similar GT Road connection but different plot configurations. <Link href="/blocks/block-c" className="text-amber-400 hover:underline font-semibold">Block C</Link> and <Link href="/blocks/block-d" className="text-amber-400 hover:underline font-semibold">Block D</Link> vary in development phase. Block B stands out as the largest block in the society, situated between A and C on the main boulevard. If mixed-use potential, boulevard frontage, and diverse plot sizes matter most, Block B is the strongest fit.
        </p>
      </section>



      {/* ========================================================= */}
      {/* 13. HIGH-RESOLUTION CINEMATIC PHOTO SLIDER                */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Development Photography</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Sector B On-Ground Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Explore authentic high-resolution on-ground photography of Block B boulevards, parks, and homes:
            </p>
          </div>

          {/* Slide Indicator */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shrink-0">
            <span>{currentSlide + 1}</span>
            <span className="text-slate-400">/</span>
            <span>{blockBSliderImages.length}</span>
          </div>
        </div>

        {/* Cinematic Slider Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-900/40 bg-slate-950 group h-[360px] sm:h-[480px] md:h-[540px] lg:h-[620px] select-none">
          {/* Main Slide Image */}
          <img
            key={currentSlide}
            src={blockBSliderImages[currentSlide].image}
            alt={blockBSliderImages[currentSlide].title}
            className="w-full h-full object-cover transition-opacity duration-700 animate-fadeIn"
          />

          {/* Bottom Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

          {/* Top Left Tag */}
          <div className="absolute top-5 left-5 z-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
              {blockBSliderImages[currentSlide].tag}
            </span>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next Slide"
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Center Bottom Typography Overlay */}
          <div className="absolute bottom-6 sm:bottom-10 inset-x-0 text-center text-white px-6 pointer-events-none space-y-1.5 z-10">
            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.15em] sm:tracking-[0.25em] text-white uppercase drop-shadow-2xl">
              {blockBSliderImages[currentSlide].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans tracking-wide drop-shadow-md">
              {blockBSliderImages[currentSlide].sub}
            </p>
          </div>

          {/* Bottom Dot Navigation */}
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 z-20">
            {blockBSliderImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? 'w-8 bg-rose-400'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 14. FINAL THOUGHTS & CONCLUSION (HIGHLIGHT BOX)          */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Final Thoughts on Faisal Hills Block B
        </h3>
        <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans pt-1">
          <p>
            Faisal Hills Islamabad B Block stands out on solid fundamentals: <strong>RDA approval</strong>, central position on the main 225ft boulevard, visible on-the-ground utilities, dedicated sports arena, and diverse plot sizes. Like all real estate, it requires due diligence — verifying current NOC status directly, getting terms in writing, and confirming timelines.
          </p>
          <p>
            If those checks come back clean, Block B is a genuinely solid option in this growing Rawalpindi-Islamabad corridor. To check currently available plot inventory or schedule an on-ground site visit, <Link href="/contact" className="text-[#7b002c] font-bold hover:underline">contact our authorized sales desk</Link> today.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 15. CROSS-SECTOR EXPANDING SHOWCASE                      */}
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

        <ScrollReveal direction="up" delay={100}>
          <ExpandingProjectsShowcase
            items={defaultFaisalHillsBlocks}
            defaultActiveIndex={3}
            containerHeightClass="h-[460px] sm:h-[500px] lg:h-[540px]"
            roundedClass="rounded-2xl sm:rounded-3xl"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 16. FREQUENTLY ASKED QUESTIONS (OPEN 2-COLUMN THEME)     */}
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
              Detailed answers on possession status, sports facilities, plot sizes, and transfer procedure for Faisal Hills Block B.
            </p>
          </div>

          {/* Right Column: Clean Horizontal Separated Accordion */}
          <div className="lg:col-span-8 space-y-0 border-t border-slate-900/80">
            {blockBFaqs.map((faq, index) => {
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
      {/* 17. LEAD INQUIRY & BOOKING DESK CTA                     */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-[#7b002c] via-[#5c0021] to-[#3a0014] text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Official Sales Facilitation
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
            Schedule a Site Visit or Request Verified Block B File
          </h2>
          <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-sans">
            Connect directly with verified consultants for on-ground site visits, plot verification, and fast-track transfer at Zedem International head office.
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
          blockName="Faisal Hills Block B"
          mapImageUrl="/images/faisal-hills-master-plan-map.jpg"
        />
      )}

    </div>
  );
}
