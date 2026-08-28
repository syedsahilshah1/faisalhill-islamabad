'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Car,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Building2,
  Trees,
  Landmark,
  Phone,
  Sparkles,
  Download,
  ArrowRight,
  TrendingUp,
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
  Building,
  Navigation,
  Trophy,
  Plane
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

// Price schedule benchmark rows for Block B
interface BlockBPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  sqFeet?: string;
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
    sqFeet: '1,125 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 35 Lacs – 70 Lacs',
    possession: '100% Possession Ready',
    highlight: 'Very High Demand — Highly Liquid Resale'
  },
  {
    size: '8 Marla',
    dimensions: '30 × 60',
    sqYards: '200 Sq. Yds',
    sqFeet: '1,800 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 50 Lacs – 95 Lacs',
    possession: 'Immediate Construction',
    highlight: 'Mid-Size Family Construction'
  },
  {
    size: '10 Marla',
    dimensions: '35 × 70',
    sqYards: '272 Sq. Yds',
    sqFeet: '2,250 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 75 Lacs – 1.25 Crore',
    possession: 'Ready for Home Building',
    highlight: 'High Demand — Growing Families'
  },
  {
    size: '14 Marla',
    dimensions: '40 × 80',
    sqYards: '355 Sq. Yds',
    sqFeet: '3,150 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 95 Lacs – 1.50 Crore',
    possession: 'Demarcated & Possession Ready',
    highlight: 'Useful Intermediate Executive Size'
  },
  {
    size: '1 Kanal',
    dimensions: '50 × 90',
    sqYards: '500 Sq. Yds',
    sqFeet: '4,500 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 1.15 Crore – 1.85 Crore',
    possession: '100% On-Ground Handover',
    highlight: 'Stable Long-Term Estate Value'
  },
  {
    size: '2 Kanal',
    dimensions: '75 × 120',
    sqYards: '1,000 Sq. Yds',
    sqFeet: '9,000 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 3.00 Crore – 4.50 Crore',
    possession: 'Exclusive Custom Plots',
    highlight: 'Ultra-Luxury Custom Mansions'
  },
  {
    size: 'Commercial (Four Sizes)',
    dimensions: '90×84 to 220×229',
    sqYards: 'Multiple cuts',
    sqFeet: 'Approved for G+4 Arcades',
    category: 'Commercial',
    priceRange: 'PKR 1.50 Crore – 4.80 Crore',
    possession: 'Ground + 4 Approval',
    highlight: '225ft Grand Boulevard Frontage'
  }
];

const travelTimePoints = [
  { destination: 'Quaid Avenue / N-125 Road / Margalla Avenue', time: '~ 5 mins', distance: '1.5 km', note: 'Direct smooth access to express highway' },
  { destination: 'Taxila City & Heritage Museum', time: '5 - 10 mins', distance: '4.0 km', note: 'Rapid link to city markets and cantt' },
  { destination: 'Tarnol Morr / Wah Cantt Commercials', time: '~ 10 mins', distance: '6.5 km', note: 'Via Main GT Road (N-5 Highway)' },
  { destination: 'M-1 Motorway Ramp (Peshawar-Islamabad)', time: '10 - 15 mins', distance: '8.0 km', note: 'Dual-carriageway direct approach' },
  { destination: 'Paswal Road Corridor', time: '~ 12 mins', distance: '7.2 km', note: 'Scenic alternate western transit route' },
  { destination: 'Islamabad City (Zero Point / Blue Area)', time: '30 - 35 mins', distance: '28 km', note: 'Via Signal-free Margalla Expressway' },
  { destination: 'Islamabad International Airport', time: '35 - 40 mins', distance: '32 km', note: 'Direct airport highway commute' },
  { destination: 'Rawalpindi Saddar & Cantt Hub', time: '30 - 45 mins', distance: '26 km', note: 'Effortless dual route connectivity' }
];

const blockBAmenities = [
  {
    id: 'sports-complex',
    title: 'Sector B Dedicated Sports Complex & Arenas',
    description: 'International-standard sports destination featuring floodlit all-weather futsal turf, tennis courts, basketball arena, jogging tracks, and open-air gymnasium.',
    image: '/images/imgi_48_sports-arena.webp'
  },
  {
    id: 'jamia-mosque-b',
    title: 'Grand Sector B Jamia Mosque',
    description: 'Majestic Islamic architectural centerpiece with capacity for 3,000 worshippers, central climate-control, marble courtyards, and dedicated Quranic education academy.',
    image: '/images/imgi_46_Mosques.webp'
  },
  {
    id: 'grand-boulevard',
    title: '225ft Grand Boulevard Commercial Spine',
    description: 'The premier arterial highway connecting Block A through Block B to Block C, lined with luxury multi-storey commercial plazas, banking halls, and retail arcades.',
    image: '/images/faisalarc (3).jpg'
  },
  {
    id: 'community-parks',
    title: '10+ Landscaped Community Parks & Green Belts',
    description: 'Extensive botanical family parks with children play structures, floral walking trails, and gazebo seating overlooking the panoramic Margalla mountain ridge.',
    image: '/images/faisal-park.jpg'
  },
  {
    id: 'underground-utilities-b',
    title: '100% Underground Electrification & Utilities',
    description: 'Complete subterranean power distribution system with zero overhead wires, dedicated grid station, underground fiber optics, and advanced LED streetlamps.',
    image: '/images/imgi_44_Executive-Block.webp'
  },
  {
    id: 'gated-security-b',
    title: '24/7 Gated Security & Perimeter Surveillance',
    description: 'Round-the-clock gated checkpoints with automated boom barriers, high-resolution night-vision CCTV cameras, and rapid-response mobile security patrol units.',
    image: '/images/faisalhillarc.jpg'
  }
];

const blockBDevelopmentMilestones = [
  {
    title: '225ft Grand Boulevard & Sector Roads',
    progress: 100,
    status: '100% Paved & Functional',
    desc: 'Main 225ft arterial boulevard, 120ft main avenues, and 50ft residential streets fully asphalted with operational streetlamps.',
    image: '/images/imgi_48_sports-arena.webp'
  },
  {
    title: 'Underground Electrification & Utilities',
    progress: 100,
    status: 'Operational & Live',
    desc: 'Underground power cabling, transformers, and subterranean fiber infrastructure live across all populated streets.',
    image: '/images/imgi_44_Executive-Block.webp'
  },
  {
    title: 'Water Supply & Tube Wells Network',
    progress: 100,
    status: 'Continuous Potable Water',
    desc: 'High-capacity overhead water reservoirs and deep-well pumps delivering uninterrupted fresh water to all residences.',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
  },
  {
    title: 'Sports Complex & Futsal Arenas',
    progress: 95,
    status: 'Active & Open for Residents',
    desc: 'Dedicated futsal ground, tennis courts, and fitness arena fully operational with active daily sports tournaments.',
    image: '/images/imgi_48_sports-arena.webp'
  },
  {
    title: '10+ Landscaped Community Parks',
    progress: 95,
    status: 'Lush & Maintained',
    desc: 'Family parks, walking tracks, and children play equipment installed and continuously maintained by horticulture teams.',
    image: '/images/faisal-park.jpg'
  },
  {
    title: 'Commercial Plaza Strips & Retail',
    progress: 85,
    status: 'Fast-Track Construction',
    desc: 'Multiple multi-storey commercial shopping and office arcades under active construction along the Grand Boulevard.',
    image: '/images/faisalarc (3).jpg'
  }
];

const blockBFaqs = [
  {
    question: 'Is Faisal Hills B Block RDA approved?',
    answer: 'Yes. Faisal Hills Islamabad B Block falls under the society\'s RDA-approved area, covering roughly 11,823 kanals of land. That approval confirms the project cleared RDA\'s review of zoning, land use, and basic infrastructure planning.'
  },
  {
    question: 'Where exactly is Faisal Hills B Block located?',
    answer: 'Block B sits directly between Block A and Block C, fronting the 225-foot Grand Boulevard that runs through the heart of Faisal Hills. It connects directly out to GT Road (N-5), Taxila, and the M-1 Motorway, allowing a drive of roughly 30 to 35 minutes into central Islamabad and Rawalpindi.'
  },
  {
    question: 'What plot sizes are available in Block B?',
    answer: 'Residential plots range from 5 Marla up to 2 Kanal, including 8 Marla, 10 Marla, and 14 Marla options. Commercial plots come in four standard sizes, from 90×84 up to 220×229, catering to high-yield commercial plazas and mixed-use towers.'
  },
  {
    question: 'What is the price of a 5 Marla and 10 Marla plot in Block B?',
    answer: 'A 5 Marla plot currently ranges between roughly PKR 35 Lakh and 70 Lakh, while 10 Marla plots typically range from PKR 75 Lakh to 1.25 Crore, depending on exact location, elevation, and corner or park-facing status.'
  },
  {
    question: 'What is the price of a 1 Kanal plot in Block B?',
    answer: 'A 1 Kanal plot generally runs between PKR 1.15 Crore and 1.85 Crore, offering exceptional long-term holding value and space for custom luxury villas.'
  },
  {
    question: 'Does Faisal Hills Block B offer a payment plan, or is it cash-only?',
    answer: 'Most current Block B inventory is resale with on-ground possession, and transactions are direct cash transfers. Installment availability depends on specific plot resale terms.'
  },
  {
    question: 'Is Block B fully developed and ready for possession?',
    answer: 'Yes. Main 120ft roads, the 225ft Grand Boulevard, and 50ft residential streets are 100% paved and operational. Residential homes are built with active residents, and core utilities (electricity, water, sewerage) are live.'
  },
  {
    question: 'What documents do I need to book a plot, especially as an overseas Pakistani?',
    answer: 'You will generally need two copies of your CNIC (or NICOP for overseas applicants), two copies of your Next of Kin\'s CNIC, two passport-sized photographs, and proof of payment. Overseas buyers can authorize a representative via power of attorney.'
  },
  {
    question: 'How does Block B compare to other Faisal Hills blocks?',
    answer: 'Block B is the largest block in the society and holds a central position between Block A and Block C on the main boulevard. It provides strong commercial potential, a dedicated sports arena, 10+ parks, and the widest selection of plot sizes.'
  }
];

const blockBWhyInvestReasons = [
  {
    icon: Building2,
    title: '225ft Grand Boulevard Frontage',
    desc: 'Block B is situated directly along the primary 225ft spine connecting directly to Main GT Road, guaranteeing premium commercial value.',
    bg: 'bg-rose-50',
    text: 'text-[#7b002c]',
    border: 'border-rose-100'
  },
  {
    icon: Trophy,
    title: 'Dedicated Sports Complex & Hub',
    desc: 'Home to international-standard futsal arenas, tennis courts, basketball courts, and family parks, creating an unmatched active lifestyle.',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-100'
  },
  {
    icon: CheckCircle2,
    title: '100% Possession & Inhabited',
    desc: 'Fully ready for immediate home construction with active families already residing and core utilities fully live on-ground.',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-100'
  },
  {
    icon: Layers,
    title: 'Widest Selection of Plot Sizes',
    desc: 'From 5 Marla entry cuts up to 2 Kanal luxury mansion plots and commercial plazas, Block B accommodates all investor budgets.',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-100'
  },
  {
    icon: ShieldCheck,
    title: '100% RDA Approved & Clear Title',
    desc: 'Sanctioned under the main RDA scheme approval with transparent biometric transfers at the Zedem International head office.',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-100'
  },
  {
    icon: TrendingUp,
    title: 'Highest Resale Liquidity',
    desc: 'Due to central position and possession readiness, Block B plots experience the highest transaction frequency and resale liquidity.',
    bg: 'bg-rose-50',
    text: 'text-[#7b002c]',
    border: 'border-rose-100'
  }
];

export default function BlockBContent() {
  // Plot Filters & Interactive States
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [selectedPriceCategory, setSelectedPriceCategory] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [activeWhyInvestOption, setActiveWhyInvestOption] = useState<number | null>(0);
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlotForInquiry, setSelectedPlotForInquiry] = useState<PlotItem | null>(null);

  // Milestones & Amenities Horizontal Auto-Scroll Refs & State
  const milestonesScrollRef = useRef<HTMLDivElement>(null);
  const [milestonesPaused, setMilestonesPaused] = useState(false);
  const amenitiesScrollRef = useRef<HTMLDivElement>(null);
  const [amenitiesPaused, setAmenitiesPaused] = useState(false);

  // Auto-scroll effect for Milestones (every 2.5s)
  useEffect(() => {
    if (milestonesPaused) return;
    const interval = setInterval(() => {
      const el = milestonesScrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [milestonesPaused]);

  // Auto-scroll effect for Amenities (every 3s)
  useEffect(() => {
    if (amenitiesPaused) return;
    const interval = setInterval(() => {
      const el = amenitiesScrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [amenitiesPaused]);

  const scrollMilestones = (direction: 'left' | 'right') => {
    const el = milestonesScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const scrollAmenities = (direction: 'left' | 'right') => {
    const el = amenitiesScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  // Lead Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plotSize: '5 Marla',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live plots sync
  const [allPlots, setAllPlots] = useState<PlotItem[]>([]);

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

  // Filtered Plots
  const blockBPlots = useMemo(() => {
    return allPlots.filter(
      (p) => p.blockSlug === 'block-b' || (p.blockName && p.blockName.toLowerCase().includes('block b'))
    );
  }, [allPlots]);

  const filteredPlots = useMemo(() => {
    if (selectedSizeFilter === 'All') return blockBPlots;
    return blockBPlots.filter((p) => p.size.toLowerCase().includes(selectedSizeFilter.toLowerCase()));
  }, [blockBPlots, selectedSizeFilter]);

  // Filtered Price Schedule
  const filteredPriceSchedule = useMemo(() => {
    const blockPlots = allPlots.filter((p) => p.blockSlug === 'block-b');
    let schedule = blockBPriceSchedule;
    if (blockPlots.length > 0) {
      schedule = blockPlots.map((plot) => {
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
                   plot.size.includes('1 Kanal') ? '500 Sq. Yds' :
                   plot.size.includes('2 Kanal') ? '1,000 Sq. Yds' : 'Standard Area',
          sqFeet: plot.size.includes('5 Marla') ? '1,125 Sq. Ft' :
                  plot.size.includes('8 Marla') ? '1,800 Sq. Ft' :
                  plot.size.includes('10 Marla') ? '2,250 Sq. Ft' :
                  plot.size.includes('14 Marla') ? '3,150 Sq. Ft' :
                  plot.size.includes('1 Kanal') ? '4,500 Sq. Ft' :
                  plot.size.includes('2 Kanal') ? '9,000 Sq. Ft' : 'Standard Area',
          category: (plot.propertyType || plot.category || 'Residential') as 'Residential' | 'Commercial',
          priceRange: priceText,
          possession: '100% Possession Ready',
          highlight: plot.status || 'Ready for Construction'
        };
      });
    }

    if (selectedPriceCategory === 'All') return schedule;
    return schedule.filter((p) => p.category === selectedPriceCategory);
  }, [allPlots, selectedPriceCategory]);

  // Other Blocks (Exclude Block B when on Block B page)
  const otherBlocksShowcase = useMemo(() => {
    return defaultFaisalHillsBlocks.filter((b) => b.id !== 'block-b');
  }, []);

  // Handle Form Submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        interest: `Block B (${formData.plotSize})${formData.email ? ` - Email: ${formData.email}` : ''}`,
        message: formData.message || 'Block B inquiry via dedicated sector page'
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
      {/* 1. FAISAL HILLS BLOCK B OVERVIEW                          */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative with See More toggle */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h1"
                  text="Faisal Hills Block B Overview"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    Faisal Hills Block B is the grand central sector of the master community. Positioned directly between Block A and Block C, Block B is built around the 225-foot Grand Boulevard that connects straight out to GT Road (N-5). For buyers comparing blocks, that combination of size, central position, and boulevard access makes Block B the premier destination for active living and high-return property investments.
                  </p>

                  {isSeeMoreOpen && (
                    <div className="space-y-3 pt-1 animate-fadeIn">
                      <p>
                        Engineered as the society's flagship lifestyle and wellness hub, Block B is home to the world-class dedicated Sports Complex, international-standard floodlit futsal and tennis arenas, jogging tracks, and over 10 landscaped community parks.
                      </p>
                      <p>
                        With 100% RDA approval, on-ground possession handovers, and completed underground utilities, Block B provides the widest selection of plot cuts in Faisal Hills (5 Marla, 8 Marla, 10 Marla, 14 Marla, 1 Kanal, and 2 Kanal custom luxury estates).
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsSeeMoreOpen(!isSeeMoreOpen)}
                    className="text-[#7b002c] hover:text-[#9e1245] font-semibold underline underline-offset-4 cursor-pointer text-xs sm:text-sm transition-colors block pt-1"
                  >
                    {isSeeMoreOpen ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual Showcase Card of Block B (Separated Clean Image & Details) */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal direction="up" delay={100}>
              <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-white group">
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    src="/images/imgi_48_sports-arena.webp"
                    alt="Faisal Hills Block B Sports Complex & Boulevard"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Clean Separate Detail Section Below Image */}
                <div className="p-5 bg-slate-900 text-white space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    Central Sector Landmark
                  </span>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                    Sector B Sports Arena & Boulevard
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    225ft Grand Boulevard access with dedicated multi-sport complex & 10+ parks.
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
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Block B Location, Distance Matrix & Arterial Connectivity
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Fronting the 225ft Grand Boulevard with direct access to Main GT Road (N-5), M-1 Motorway, and Taxila:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Distance Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {travelTimePoints.map((dest, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 35}>
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
                  <span>Block B Live Location Map</span>
                </strong>
                <span className="text-[11px] text-slate-500 block">225ft Grand Boulevard, Faisal Hills</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Faisal+Hills+Taxila+Block+B"
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
                title="Faisal Hills Block B Google Map Location"
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
      {/* 3. MASTER PLAN & SECTOR LAYOUT                            */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Faisal Hills Block B Master Blueprint & Cuts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              High-resolution zoning blueprint highlighting street grid numbers, central sports arena, 10+ parks, and commercial boulevard plots.
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

        {/* Blueprint Preview Card (Full Width on Mobile, Detail Card Hidden on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 relative group">
            <img
              src="/images/faisal-hills-master-plan-map-opt.webp"
              alt="Faisal Hills Block B Master Layout Plan"
              className="w-full h-auto object-cover max-h-[500px]"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsMapModalOpen(true)}
                className="px-5 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-bold shadow-lg hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Expand Full Map</span>
              </button>
            </div>
          </div>

          {/* Master Plan Details Card: Hidden on Mobile as Requested */}
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h4 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#7b002c]" />
                <span>Sector B Master Key Features</span>
              </h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <strong>• 225ft Grand Boulevard Spine:</strong> Primary arterial corridor traversing the entire block.
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <strong>• Dedicated Sports Complex:</strong> Multi-sport arena with floodlit futsal, basketball, and tennis.
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <strong>• 10+ Landscaped Parks:</strong> Abundant neighborhood green spaces and children playgrounds.
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 text-slate-700">
                  <strong>• 100% Possession Ready:</strong> Immediate construction clearance with live electricity and water.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. QUANTITATIVE FIGURES & DEVELOPMENT MILESTONES          */}
      {/* ========================================================= */}
      <section id="development-status" className="scroll-mt-28 space-y-8">
        {/* Counting Numbers / Benchmark Metrics */}
        <div className="space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="space-y-1.5 text-center max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Sector B Development & Investment Benchmarks
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Key verifiable metrics defining the scale, legal clarity, and active development in Faisal Hills Block B:
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ScrollReveal direction="up" delay={100}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#7b002c] group-hover:scale-105 transition-transform duration-300 inline-block">
                  <CountUpNumber end={100} duration={2000} suffix="%" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Possession Ready</span>
                <p className="text-[11px] text-slate-500 font-sans">Immediate home construction permitted</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-[#7b002c] group-hover:scale-105 transition-all duration-300 inline-block">
                  <CountUpNumber end={3500} duration={2200} suffix="+" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Planned & Demarcated Cuts</span>
                <p className="text-[11px] text-slate-500 font-sans">5 Marla up to 2 Kanal & Commercials</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-700 group-hover:scale-105 transition-transform duration-300 inline-block">
                  <CountUpNumber end={100} duration={1800} suffix="%" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700 transition-colors">RDA Approved NOC</span>
                <p className="text-[11px] text-slate-500 font-sans">Fully sanctioned layout with clean titles</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-[#7b002c] group-hover:scale-105 transition-all duration-300 inline-block">
                  <CountUpNumber end={225} duration={1800} suffix="ft" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Grand Boulevard Frontage</span>
                <p className="text-[11px] text-slate-500 font-sans">Direct primary arterial spine to GT Road</p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Milestones Horizontal Auto-Scroll Carousel */}
        <div className="space-y-5 pt-4">
          <ScrollReveal direction="up" delay={50}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                  Block B Development Milestones & Delivery Status
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-sans">
                  Track completion status across roads, underground utilities, sports complex, and community infrastructure:
                </p>
              </div>

              {/* Scroll Controls (Prev / Next Buttons) */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => scrollMilestones('left')}
                  className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-2xs cursor-pointer"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollMilestones('right')}
                  className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-2xs cursor-pointer"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Horizontally Scrollable & Auto-Scrolling Milestones Track */}
          <div
            ref={milestonesScrollRef}
            onMouseEnter={() => setMilestonesPaused(true)}
            onMouseLeave={() => setMilestonesPaused(false)}
            onTouchStart={() => setMilestonesPaused(true)}
            onTouchEnd={() => setMilestonesPaused(false)}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {blockBDevelopmentMilestones.map((item, idx) => (
              <div
                key={idx}
                className="min-w-[82vw] sm:min-w-[340px] md:min-w-[360px] max-w-[380px] snap-center shrink-0 bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#7b002c] text-white shadow-sm border border-white/20">
                        {item.status}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm border border-white/20">
                        {item.progress}%
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Completion Rate</span>
                        <span className="text-emerald-700 font-bold">{item.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                        <div
                          className="h-full bg-gradient-to-r from-[#7b002c] to-emerald-600 rounded-full transition-all duration-1000"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3">{item.desc}</p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified On-Ground</span>
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">Block B</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. ON-GROUND AMENITIES (HORIZONTAL AUTO-SCROLL CAROUSEL)  */}
      {/* ========================================================= */}
      <section id="amenities" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <TextReveal
                as="h2"
                text="On-Ground Amenities & Community Facilities in Sector B"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl font-sans">
                Experience the lifestyle capital of Faisal Hills: dedicated multi-sport complex, grand Jamia mosque, 10+ family parks, and underground utilities.
              </p>
            </div>

            {/* Scroll Controls (Prev / Next Buttons) */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => scrollAmenities('left')}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-2xs cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollAmenities('right')}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-2xs cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontally Scrollable & Auto-Scrolling Amenities Track */}
        <div
          ref={amenitiesScrollRef}
          onMouseEnter={() => setAmenitiesPaused(true)}
          onMouseLeave={() => setAmenitiesPaused(false)}
          onTouchStart={() => setAmenitiesPaused(true)}
          onTouchEnd={() => setAmenitiesPaused(false)}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blockBAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className="min-w-[85vw] sm:min-w-[360px] md:min-w-[400px] max-w-[420px] snap-center shrink-0 bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/30 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-slate-950">
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                </div>

                <div className="p-6 space-y-2.5">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 leading-snug group-hover:text-[#7b002c] transition-colors">
                    {amenity.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans line-clamp-4">
                    {amenity.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Delivered & Operational</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 font-semibold">Faisal Hills</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. VERIFIED PLOTS LISTED FOR SALE (BLOCK B)               */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Verified Plots for Sale in Faisal Hills Block B
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Explore live on-ground possession plots with direct seller pricing and biometric transfer:
            </p>
          </div>

          {/* Plot Size Filter Tabs (Without 'All' Button on Mobile) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0 overflow-x-auto max-w-full">
            {['All', '5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal', '2 Kanal', 'Commercial'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSizeFilter(size)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  size === 'All' ? 'hidden sm:inline-flex' : 'inline-flex'
                } ${
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
                  {/* Top Image Banner - Clickable */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-b`}
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 block cursor-pointer group/img"
                    title={`Browse all ${plot.size} plots in inventory`}
                  >
                    <img
                      src={plot.image || '/images/imgi_48_sports-arena.webp'}
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
                        {plot.status || 'Possession Ready'}
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
                        Facing: <strong className="text-slate-700">{plot.facing || 'Boulevard View'}</strong> • Dimensions: <strong className="text-slate-700">{plot.dimensions}</strong>
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1 border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Demand Price</div>
                      <div className="text-xl font-bold font-serif text-[#7b002c]">
                        {plot.priceFormatted}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{plot.priceHistoryTrend || '+21.0% annual ROI trend'}</span>
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
                      href={`https://wa.me/923044811717?text=Hello!%20I%20am%20interested%20in%20Faisal%20Hills%20Block%20B%20Plot%20${plot.plotNumber}%20(${plot.size}).%20Please%20share%20latest%20price%20and%20transfer%20details.`}
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

        {/* Sell / List Your Block B Plot Banner */}
        <div className="p-6 sm:p-8 bg-rose-50/70 border border-rose-200/80 rounded-3xl text-slate-900 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              Want to Sell or Assess Your Block B Plot / File?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-sans">
              Get an instant official market valuation and list your file for thousands of active verified buyers across Islamabad, Rawalpindi, and overseas.
            </p>
          </div>

          <a
            href="https://wa.me/923044811717?text=Hello!%20I%20want%20to%20list%20or%20sell%20my%20plot%20in%20Faisal%20Hills%20Block%20B."
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
          <DynamicPlotSeriesExplorer blockSlug="block-b" blockName="Block B" />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 8. CURRENT PRICE SCHEDULE & VALUATION TABLE               */}
      {/* ========================================================= */}
      <section id="pricing" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Block B Plot Pricing Schedule & Rate Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Transparent market rates for possession plots and resale files in Faisal Hills Block B:
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

        {/* Pricing Schedule Table */}
        <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-serif">
                  <th className="p-4 sm:p-5">Plot Category & Cut</th>
                  <th className="p-4 sm:p-5">Dimensions</th>
                  <th className="p-4 sm:p-5">Total Area</th>
                  <th className="p-4 sm:p-5">Market Price Band</th>
                  <th className="p-4 sm:p-5">Possession Status</th>
                  <th className="p-4 sm:p-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filteredPriceSchedule.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7b002c]" />
                      <span>{row.size}</span>
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-slate-600">{row.dimensions}</td>
                    <td className="p-4 sm:p-5">
                      <div className="font-semibold text-slate-900">{row.sqYards}</div>
                      <div className="text-[11px] text-slate-400">{row.sqFeet}</div>
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-[#7b002c] font-serif text-sm sm:text-base">
                      {row.priceRange}
                    </td>
                    <td className="p-4 sm:p-5">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                        {row.possession}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5">
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
      {/* 9. WHY INVEST IN FAISAL HILLS BLOCK B                     */}
      {/* ========================================================= */}
      <section id="why-invest" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Why Invest in Faisal Hills Block B?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Discover the 6 key growth catalysts making Block B the most active and liquid sector in Faisal Hills:
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile View: Sleek, Compact Interactive Accordion List */}
        <div className="block sm:hidden space-y-2.5">
          {blockBWhyInvestReasons.map((item, idx) => {
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
          {blockBWhyInvestReasons.map((item, idx) => {
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
      </section>

      {/* ========================================================= */}
      {/* 10. DIRECT LEAD CONSULTATION & BOOKING FORM               */}
      {/* ========================================================= */}
      <section id="contact-desk" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Schedule a Site Visit or Request Block B File Verification
            </h3>
            {/* Hidden on mobile, visible on tablet/desktop */}
            <p className="hidden sm:block text-slate-600 text-xs sm:text-sm font-sans leading-relaxed">
              Connect directly with our senior Faisal Hills advisory desk. Receive on-ground plot video walkthroughs, instant biometric allotment file checks, and updated resale inventory.
            </p>
            <div className="hidden sm:block space-y-2.5 pt-2 text-xs text-slate-700">
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
                    Our Faisal Hills Block B property desk will reach out with the complete price sheet and plot inventory within 15 minutes.
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
                        <option value="2 Kanal">2 Kanal (75×120)</option>
                        <option value="Commercial">Commercial Cut</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Specific Requirements</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Inquiring about park-facing or corner 10 Marla / 1 Kanal plot in Block B..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#7b002c]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Official Block B Inquiry'}</span>
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
              Discover connected sectors across the master development, from Executive and Prime blocks to Block D & Hills Walk:
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <ExpandingProjectsShowcase
            items={otherBlocksShowcase}
            defaultActiveIndex={0}
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Block B Buying & Possession FAQs
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl">
            Clear answers regarding Block B possession status, RDA NOC approvals, plot transfer process, and market rates.
          </p>
        </div>

        <FaqAccordion faqs={blockBFaqs} blockName="Block B" />
      </section>

      {/* Map Download Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        blockName="Block B"
      />

      {/* Lead Inquiry Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedPlotForInquiry(null);
        }}
        defaultBlock="Block B"
        defaultPlot={selectedPlotForInquiry ? `Plot #${selectedPlotForInquiry.plotNumber} (${selectedPlotForInquiry.size})` : undefined}
        interest={selectedPlotForInquiry ? `${selectedPlotForInquiry.size} ${selectedPlotForInquiry.category} in Block B` : 'Block B General Inquiry'}
      />
    </div>
  );
}
