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
import LeadModal from '@/components/ui/LeadModal';
import {
  blocksData,
  plotInventoryData,
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

// Price schedule benchmark rows for Block D
interface BlockDPriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  sqFeet: string;
  category: 'Residential' | 'Commercial';
  priceRange: string;
  possession: string;
  highlight: string;
}

const blockDPriceSchedule: BlockDPriceRow[] = [
  {
    size: '5 Marla',
    dimensions: '25 × 50',
    sqYards: '139 Sq. Yds',
    sqFeet: '1,125 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 40 Lacs – 48 Lacs',
    possession: 'Development 85%',
    highlight: 'Lowest entry price point in Faisal Hills with exceptional 3-year holding upside.'
  },
  {
    size: '8 Marla',
    dimensions: '30 × 60',
    sqYards: '200 Sq. Yds',
    sqFeet: '1,800 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 62 Lacs – 75 Lacs',
    possession: 'Development 85%',
    highlight: 'Standard family-size cut situated along serene 50ft tree-lined sector avenues.'
  },
  {
    size: '10 Marla',
    dimensions: '35 × 70',
    sqYards: '272 Sq. Yds',
    sqFeet: '2,250 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 90 Lacs – 1.10 Cr',
    possession: 'Development 85%',
    highlight: 'Scenic double-unit home cuts facing natural valley breezes and Margalla ridge.'
  },
  {
    size: '14 Marla',
    dimensions: '40 × 80',
    sqYards: '356 Sq. Yds',
    sqFeet: '3,150 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 1.25 Cr – 1.45 Cr',
    possession: 'Development 85%',
    highlight: 'Executive estate cuts close to the proposed central healthcare & civic zone.'
  },
  {
    size: '1 Kanal',
    dimensions: '50 × 90',
    sqYards: '500 Sq. Yds',
    sqFeet: '4,500 Sq. Ft',
    category: 'Residential',
    priceRange: 'PKR 1.65 Cr – 2.10 Cr',
    possession: 'Development 85%',
    highlight: 'Flagship mansion plots facing scenic green belts, lush parkland, and wide boulevards.'
  },
  {
    size: '4 Marla Commercial',
    dimensions: '30 × 30',
    sqYards: '100 Sq. Yds',
    sqFeet: '900 Sq. Ft',
    category: 'Commercial',
    priceRange: 'PKR 1.80 Cr – 2.60 Cr',
    possession: 'Commercial Approved',
    highlight: 'High ROI retail promenade plots approved for Ground + 4 commercial arcades.'
  }
];

// Fallback seed plots for Block D with authentic local photography
const defaultBlockDPlots: PlotItem[] = [
  {
    id: 'plot-d-01',
    plotNumber: 'D-108',
    blockSlug: 'block-d',
    blockName: 'Block D',
    category: 'Residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: 4450000,
    priceFormatted: 'PKR 44.5 Lacs',
    priceHistoryTrend: '+16.5% annual capital ROI',
    status: 'Available',
    facing: '40ft Wide Street',
    mapCoords: { x: 78, y: 55 },
    features: ['Solid Ground Land', 'Near Central Park', 'Fast Developing Sector'],
    description: 'Affordable 5 Marla residential plot in Faisal Hills Block D, offering excellent value near community green spaces.',
    image: '/images/imgi_5_Rectangle-1-1-scaled-e1766059628733.png'
  },
  {
    id: 'plot-d-02',
    plotNumber: 'D-230',
    blockSlug: 'block-d',
    blockName: 'Block D',
    category: 'Residential',
    size: '8 Marla',
    dimensions: '30 × 60',
    price: 6850000,
    priceFormatted: 'PKR 68.5 Lacs',
    priceHistoryTrend: '+18.0% annual capital ROI',
    status: 'Available',
    facing: 'Boulevard Facing',
    mapCoords: { x: 80, y: 58 },
    features: ['50ft Sector Boulevard', 'Near Sector Jamia Mosque', 'Underground Electricity'],
    description: 'Family-size 8 Marla plot along the 50ft wide avenue in Block D with completed utilities and open mountain air.',
    image: '/images/imgi_27_Rectangle-1-scaled.png'
  },
  {
    id: 'plot-d-03',
    plotNumber: 'D-365',
    blockSlug: 'block-d',
    blockName: 'Block D',
    category: 'Residential',
    size: '10 Marla',
    dimensions: '35 × 70',
    price: 9800000,
    priceFormatted: 'PKR 98 Lacs',
    priceHistoryTrend: '+21.2% annual capital ROI',
    status: 'Available',
    facing: 'Margalla Mountain View',
    mapCoords: { x: 82, y: 62 },
    features: ['Corner Plot', 'Scenic Mountain Backdrop', 'Direct Allotment File'],
    description: 'Scenic 10 Marla corner plot ideal for double-unit luxury construction, with open views of Margalla range.',
    image: '/images/imgi_44_Executive-Block.webp'
  },
  {
    id: 'plot-d-04',
    plotNumber: 'D-480',
    blockSlug: 'block-d',
    blockName: 'Block D',
    category: 'Residential',
    size: '14 Marla',
    dimensions: '40 × 80',
    price: 13800000,
    priceFormatted: 'PKR 1.38 Crore',
    priceHistoryTrend: '+19.8% annual capital ROI',
    status: 'Available',
    facing: '60ft Main Avenue',
    mapCoords: { x: 84, y: 65 },
    features: ['Executive Estate Cut', 'Near Healthcare Zone', 'Immediate Transfer'],
    description: 'Spacious 14 Marla executive plot cut on a 60ft avenue, minutes from the proposed medical and education complex.',
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg'
  },
  {
    id: 'plot-d-05',
    plotNumber: 'D-590',
    blockSlug: 'block-d',
    blockName: 'Block D',
    category: 'Residential',
    size: '1 Kanal',
    dimensions: '50 × 90',
    price: 18500000,
    priceFormatted: 'PKR 1.85 Crore',
    priceHistoryTrend: '+24.5% annual capital ROI',
    status: 'Available',
    facing: 'Park Facing',
    mapCoords: { x: 86, y: 68 },
    features: ['Direct Park Facing', 'Mansion Zoning', 'Zero Litigation Risk'],
    description: 'Premium 1 Kanal mansion plot directly overlooking central green reservations in Faisal Hills Block D.',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
  },
  {
    id: 'plot-d-06',
    plotNumber: 'D-COMM-12',
    blockSlug: 'block-d',
    blockName: 'Block D',
    category: 'Commercial',
    size: '4 Marla',
    dimensions: '30 × 30',
    price: 19500000,
    priceFormatted: 'PKR 1.95 Crore',
    priceHistoryTrend: '+28.0% commercial appreciation',
    status: 'Available',
    facing: 'Main Commercial Strip',
    mapCoords: { x: 88, y: 70 },
    features: ['Sector Commercial Strip', 'Ground + 4 Storey Approval', 'High ROI Catchment'],
    description: 'Prime 4 Marla commercial plot in Sector D commercial zone, approved for multi-storey retail, grocery, and clinic development.',
    image: '/images/faisalarc (3).jpg'
  }
];

// Block D Amenities List with Alternating Structure & Distinct Photos
const blockDAmenities = [
  {
    id: 'nature-parks',
    title: 'Lush Sector Parks & Scenic Margalla Trails',
    category: 'nature',
    description: 'Block D is surrounded by open green belts, botanical family parks, and walking tracks designed to offer fresh mountain air and serene living for residents.',
    image: '/images/faisal-park.jpg',
    tag: 'Eco-Living Feature',
    features: ['Family Botanical Parks', 'Jogging & Walking Trails', 'Lush Green Belts', 'Eco-Conscious Zoning']
  },
  {
    id: 'community-center',
    title: 'Sector D Multi-Purpose Community Center',
    category: 'lifestyle',
    description: 'Dedicated modern social hub featuring banquet facilities, indoor recreation halls, senior citizen lounges, and executive meeting rooms for neighborhood residents.',
    image: '/images/faisalarc (2).webp',
    tag: 'Community Anchor',
    features: ['Banquet & Event Halls', 'Indoor Games Arena', 'Senior Citizen Lounge', 'Resident Meeting Suites']
  },
  {
    id: 'jamia-mosque-d',
    title: 'Grand Sector D Jamia Mosque',
    category: 'infrastructure',
    description: 'Modern Islamic architectural landmark designed for 2,500 worshippers, complete with air-conditioned prayer halls, expansive marble courtyards, and Quranic academy.',
    image: '/images/imgi_46_Mosques.webp',
    tag: 'Delivered Landmark',
    features: ['Air-Conditioned Prayer Halls', 'Lush Marble Courtyards', 'Separate Ladies Section', 'Imam Residence']
  },
  {
    id: 'medical-complex',
    title: 'Proposed Medical City & Healthcare Complex',
    category: 'utilities',
    description: 'Zoned high-capacity healthcare district designed to house multi-specialty hospitals, 24/7 trauma emergency care, diagnostic laboratories, and pharmacy hubs.',
    image: '/images/imgi_49_Medical-xomplex.webp',
    tag: 'Healthcare Hub',
    features: ['24/7 Emergency Trauma Care', 'Specialist Clinics', 'Diagnostic Pathology Labs', 'Pharmacies & Medical Supplies']
  },
  {
    id: 'underground-utilities-d',
    title: '100% Underground Electrification & Wide Grid',
    category: 'utilities',
    description: 'Subterranean power distribution ensuring completely unobstructed skyline vistas, modern street lighting poles, and storm water conduits.',
    image: '/images/imgi_44_Executive-Block.webp',
    tag: 'Smart Infrastructure',
    features: ['Subterranean Power Cabling', 'High-Capacity Transformers', 'LED Street Lamps', 'Zero Overhead Wiring']
  },
  {
    id: 'gated-security-d',
    title: '24/7 Gated Security & Perimeter Surveillance',
    category: 'security',
    description: 'Guarded sector checkposts, smart boom barriers, high-resolution night-vision CCTV coverage, and dedicated mobile patrolling units.',
    image: '/images/faisalhillarc.jpg',
    tag: '24/7 Secure',
    features: ['HD CCTV Perimeter Coverage', 'Biometric Automated Checkpoints', 'Dedicated Mobile Patrol Squads', 'Gated Sector Barrier']
  }
];

// Block D Development Milestones with Unique Sector Photos
const blockDDevelopmentMilestones = [
  {
    title: 'Roads & Sector Boulevards',
    progress: 90,
    status: 'Paved & Functional',
    desc: 'Main 50ft and 60ft avenues asphalted with drainage gutters, curbs, and street lamp foundations.',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
  },
  {
    title: 'Underground Electrification',
    progress: 85,
    status: 'Cables Laid in Trenches',
    desc: 'Subterranean conduit pipes and underground cable trenches completed across all sectors.',
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg'
  },
  {
    title: 'Water Wells & Storage Tanks',
    progress: 95,
    status: 'Tube Wells Operational',
    desc: 'High-yield deep-well tube wells and overhead water reservoirs delivering clean mountain water.',
    image: '/images/faisalhill.jpg'
  },
  {
    title: 'Sui Gas Pipeline Network',
    progress: 80,
    status: 'Mainlines Laid',
    desc: 'Underground gas pipelines installed along primary avenues awaiting final pressure testing.',
    image: '/images/imgi_38_Faisal-Hills-site-home-page-header.webp'
  },
  {
    title: 'Sewerage & Storm Drainage',
    progress: 90,
    status: 'RCC Pipes Laid',
    desc: 'Heavy RCC sewerage conduits connected to main society trunk lines for rain runoff safety.',
    image: '/images/faisalarc (1).webp'
  },
  {
    title: 'Sector Parks & Green Reservations',
    progress: 85,
    status: 'Turf & Trees Planted',
    desc: 'Family walking trails, children play areas, and perimeter tree plantations active.',
    image: '/images/faisal-park.jpg'
  }
];

// Block D Travel Times
const blockDTravelTimes = [
  { destination: 'M-1 Brahma Jhang Bahtar Interchange', distance: '3.2 km', time: '5 Mins', note: 'Direct access to M-1 Motorway' },
  { destination: 'Grand GT Road (N-5 Highway)', distance: '3.8 km', time: '7 Mins', note: 'Via 225ft Grand Boulevard' },
  { destination: 'Block C & Hills Walk Promenade', distance: '1.2 km', time: '2 Mins', note: 'Direct internal avenue connection' },
  { destination: 'Block B Central Sports Complex', distance: '2.0 km', time: '4 Mins', note: 'Quick neighborhood access' },
  { destination: 'Taxila Museum & Cantt Commercials', distance: '6.5 km', time: '9 Mins', note: 'Short urban drive' },
  { destination: 'Islamabad Toll Plaza & Zero Point', distance: '26.0 km', time: '24 Mins', note: 'Signal-free drive via M-1' }
];

// Block D FAQs
const blockDFaqs = [
  {
    question: 'Where exactly is Faisal Hills Block D located?',
    answer: 'Block D is situated on the tranquil western flank of Faisal Hills, adjacent to Block C and within minutes of the M-1 Motorway Brahma Jhang Bahtar Interchange. It enjoys serene elevation with natural mountain springs and scenic Margalla ridge views.'
  },
  {
    question: 'Is Faisal Hills Block D approved by RDA?',
    answer: 'Yes, Faisal Hills Block D is 100% legally approved by the Rawalpindi Development Authority (RDA) under the comprehensive society master plan NOC. All plots are free of legal dispute with transparent biometric transfers at the Zedem International head office.'
  },
  {
    question: 'What residential and commercial plot sizes are available in Block D?',
    answer: 'Block D offers 5 Marla (25×50), 8 Marla (30×60), 10 Marla (35×70), 14 Marla (40×80), and 1 Kanal (50×90) residential cuts. Commercial plots of 4 Marla (30×30) with Ground + 4 storey construction approvals are also available.'
  },
  {
    question: 'What is the current development status of Block D?',
    answer: 'Development in Block D is approximately 85% to 90% completed. Earthwork, levelling, 50ft & 60ft asphalt road carpeting, underground utility conduits, deep tube wells, and sewerage piping networks are operational.'
  },
  {
    question: 'What is the price range of 5 Marla and 10 Marla plots in Block D?',
    answer: 'As of current market rates, a 5 Marla residential plot ranges from PKR 40 Lacs to 48 Lacs, while a 10 Marla plot ranges between PKR 90 Lacs and 1.10 Crore depending on location, category, and boulevard facing.'
  },
  {
    question: 'Why is Block D considered the best value investment in Faisal Hills?',
    answer: 'Block D provides the most economical entry prices across the society combined with proximity to the upcoming M-1 Brahma Interchange link and future Medical City. It delivers high holding ROI for investors and peaceful suburban lifestyle for end-users.'
  },
  {
    question: 'Can overseas Pakistanis buy and transfer plots in Block D remotely?',
    answer: 'Yes. Overseas Pakistanis can purchase plots using their NICOP/passport. File verification, installment ledger checks, and legal biometric allotment transfers can be facilitated seamlessly through our dedicated overseas advisory desk.'
  }
];

const blockDWhyInvestReasons = [
  {
    icon: Car,
    title: 'Brahma Bahtar M-1 Interchange',
    desc: 'Block D enjoys fast 5-minute access to the Brahma Jhang Bahtar Interchange on the M-1 Motorway, connecting seamlessly to Islamabad Zero Point and CPEC.',
    bg: 'bg-rose-50',
    text: 'text-[#7b002c]',
    border: 'border-rose-100'
  },
  {
    icon: DollarSign,
    title: 'Lowest Entry Price & High ROI',
    desc: 'Block D offers the most competitive entry rates in Faisal Hills, ensuring the highest percentage capital appreciation as final possession finishes.',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-100'
  },
  {
    icon: Droplets,
    title: 'Scenic Parkland & Clean Air',
    desc: 'Lush green parks, open tree-lined avenues, and cooler Margalla hillside elevation make Block D a pristine, pollution-free residential sanctuary.',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-100'
  },
  {
    icon: Building2,
    title: 'Future Medical City Complex',
    desc: 'The designated Healthcare and Medical Complex zone in Sector D guarantees high long-term rental demand from medical professionals and executives.',
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
    title: 'Rapid Development Momentum',
    desc: 'With 85%+ groundwork complete and asphalt carpet roads underway, Block D is on a fast track toward full on-ground possession handover.',
    bg: 'bg-rose-50',
    text: 'text-[#7b002c]',
    border: 'border-rose-100'
  }
];

export default function BlockDContent() {
  // Plot Filters & Interactive States
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [selectedPriceCategory, setSelectedPriceCategory] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [selectedAmenityFilter, setSelectedAmenityFilter] = useState<string>('all');
  const [activeWhyInvestOption, setActiveWhyInvestOption] = useState<number | null>(0);
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlotForInquiry, setSelectedPlotForInquiry] = useState<PlotItem | null>(null);

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
  const blockDPlots = useMemo(() => {
    return allPlots.filter(
      (p) => p.blockSlug === 'block-d' || (p.blockName && p.blockName.toLowerCase().includes('block d'))
    );
  }, [allPlots]);

  const filteredPlots = useMemo(() => {
    if (selectedSizeFilter === 'All') return blockDPlots;
    return blockDPlots.filter((p) => p.size.toLowerCase().includes(selectedSizeFilter.toLowerCase()));
  }, [blockDPlots, selectedSizeFilter]);

  // Filtered Price Schedule
  const filteredPriceSchedule = useMemo(() => {
    const blockPlots = allPlots.filter((p) => p.blockSlug === 'block-d');
    let schedule = blockDPriceSchedule;
    if (blockPlots.length > 0) {
      schedule = blockPlots.map((plot) => {
        let priceText = 'Contact for Price';
        if (plot.price && plot.price > 0) {
          priceText = formatPlotPrice(plot.price, plot.priceFormatted);
        }
        return {
          size: plot.size,
          dimensions: plot.dimensions || 'Dimension not provided',
          sqYards: plot.size.includes('5 Marla') ? '139 Sq. Yds' :
                   plot.size.includes('8 Marla') ? '200 Sq. Yds' :
                   plot.size.includes('10 Marla') ? '272 Sq. Yds' :
                   plot.size.includes('14 Marla') ? '355 Sq. Yds' :
                   plot.size.includes('1 Kanal') ? '500 Sq. Yds' : 'Standard Area',
          sqFeet: plot.size.includes('5 Marla') ? '1,125 Sq. Ft' :
                  plot.size.includes('8 Marla') ? '1,800 Sq. Ft' :
                  plot.size.includes('10 Marla') ? '2,250 Sq. Ft' :
                  plot.size.includes('14 Marla') ? '3,150 Sq. Ft' :
                  plot.size.includes('1 Kanal') ? '4,500 Sq. Ft' :
                  plot.size.includes('4 Marla') ? '900 Sq. Ft' : 'Standard Area',
          category: (plot.propertyType || plot.category || 'Residential') as 'Residential' | 'Commercial',
          priceRange: priceText,
          possession: 'Fast-Track Earthwork in Progress',
          highlight: plot.status || 'Affordable High Appreciation Sector'
        };
      });
    }

    if (selectedPriceCategory === 'All') return schedule;
    return schedule.filter((p) => p.category === selectedPriceCategory);
  }, [allPlots, selectedPriceCategory]);

  // Filtered Amenities
  const filteredAmenities = useMemo(() => {
    if (selectedAmenityFilter === 'all') return blockDAmenities;
    return blockDAmenities.filter((a) => a.category === selectedAmenityFilter);
  }, [selectedAmenityFilter]);

  // Handle Form Submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        interest: `Block D (${formData.plotSize})${formData.email ? ` - Email: ${formData.email}` : ''}`,
        message: formData.message || 'Block D inquiry via dedicated sector page'
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
      {/* 1. FAISAL HILLS BLOCK D OVERVIEW                          */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative with See More toggle */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h1"
                  text="Faisal Hills Block D Overview"
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    Faisal Hills Block D represents the peaceful, scenic suburban sector in the master community. Positioned on the elevated western wing adjacent to Block C, Block D combines refreshing Margalla breezes, lush green landscapes, economical entry-level plot pricing, and direct connectivity to the upcoming Brahma Jhang Bahtar M-1 Motorway link.
                  </p>

                  {isSeeMoreOpen && (
                    <div className="space-y-3 pt-1 animate-fadeIn">
                      <p>
                        Spanning over 2,100 residential and commercial plots, Sector D is engineered around a modern 50ft and 60ft grid road system. With 85%+ on-ground development completed, underground utility conduit infrastructure in place, and active deep tube wells, Block D is the premier choice for family homebuilders seeking serene living and astute investors eyeing substantial capital gains.
                      </p>
                      <p>
                        The sector is designated to host the future Faisal Hills Medical City healthcare complex, grand community mosques, sector sports facilities, and landscaped nature parks. Whether purchasing a compact 5 Marla starter plot, an 8 or 10 Marla family cut, or a 1 Kanal executive estate, Block D delivers unbeatable value per square foot in the Islamabad-Rawalpindi region.
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

          {/* Right Column: Visual Showcase Card of Block D */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal direction="up" delay={100}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950 min-h-[320px] sm:min-h-[360px] flex flex-col justify-between group">
                <img
                  src="/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
                  alt="Faisal Hills Block D Panoramic View"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-black/20" />

                {/* Bottom Overlay Title */}
                <div className="relative z-10 p-5 text-white space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    Authentic On-Ground Capture
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white">
                    Faisal Hills Block D Sector Panorama
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    Scenic Margalla hillside elevation with wide 50ft & 60ft asphalt avenues.
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
              Block D Location, Distance Matrix & Motorway Connectivity
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Enjoy rapid dual commuting to Islamabad and Taxila via the Brahma Jhang Bahtar M-1 Interchange and 225ft Grand Boulevard.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 6 Distance Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blockDTravelTimes.map((dest, idx) => (
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
                  <span>Block D Live Location Map</span>
                </strong>
                <span className="text-[11px] text-slate-500 block">Near Brahma Bahtar M-1 Interchange & Block C</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Faisal+Hills+Taxila+Block+D"
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
                title="Faisal Hills Block D Google Map Location"
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
              Faisal Hills Block D Master Blueprint & Cuts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              High-resolution zoning blueprint highlighting street grid numbers, central parks, green eco corridors, and commercial strips.
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

        {/* Blueprint Preview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 relative group">
            <img
              src="/images/faisal-hills-master-plan-map-opt.webp"
              alt="Faisal Hills Block D Master Layout Plan"
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

          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h4 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#7b002c]" />
                <span>Sector D Master Key Features</span>
              </h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <strong>• 50ft & 60ft Street Network:</strong> Wide paved avenues facilitating effortless two-way vehicular transit.
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <strong>• Scenic Eco Reserve & Green Belts:</strong> Dedicated green open spaces and parks across Sector D.
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <strong>• Future Medical City Site:</strong> High-density healthcare zone planned for regional medical centers.
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 text-slate-700">
                  <strong>• Brahma M-1 Interchange:</strong> 5-minute direct route to the upcoming dedicated motorway ramp.
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Activity className="w-3.5 h-3.5 animate-pulse text-[#7b002c]" />
                <span>Block D Key Metrics</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Sector D Development & Investment Benchmarks
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Key verifiable metrics defining the growth, legal clarity, and infrastructure scale in Faisal Hills Block D:
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <ScrollReveal direction="up" delay={100}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#7b002c] group-hover:scale-105 transition-transform duration-300 inline-block">
                  <CountUpNumber end={85} duration={2000} suffix="%+" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Development Work Done</span>
                <p className="text-[11px] text-slate-500 font-sans">Asphalt roads, conduit trenches, and tube wells</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-[#7b002c] group-hover:scale-105 transition-all duration-300 inline-block">
                  <CountUpNumber end={2100} duration={2200} suffix="+" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Planned Plot Cuts</span>
                <p className="text-[11px] text-slate-500 font-sans">5 Marla, 8 Marla, 10 Marla, 14 Marla & 1 Kanal</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-700 group-hover:scale-105 transition-transform duration-300 inline-block">
                  <CountUpNumber end={100} duration={1800} suffix="%" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700 transition-colors">RDA Approved NOC</span>
                <p className="text-[11px] text-slate-500 font-sans">Fully sanctioned master plan with clear title</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              <div className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#7b002c]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-2 h-full flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#7b002c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-[#7b002c] group-hover:scale-105 transition-all duration-300 inline-block">
                  <CountUpNumber end={50} duration={1800} suffix="ft+" />
                </span>
                <span className="text-xs font-bold text-slate-900 block group-hover:text-[#7b002c] transition-colors">Wide Street Grid</span>
                <p className="text-[11px] text-slate-500 font-sans">Tree-lined avenues with underground cabling</p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Milestones Progress Tracker */}
        <div className="space-y-6 pt-4">
          <ScrollReveal direction="up" delay={50}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Real On-Ground Progress</span>
                </div>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                  Block D Development Milestones & Delivery Status
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-sans">
                  Track completion status across roads, underground utilities, water wells, and community infrastructure:
                </p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Phase 1 Delivery Active</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blockDDevelopmentMilestones.map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 60}>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group h-full">
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
                        <h4 className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
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

                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified On-Ground</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">Block D</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. ON-GROUND AMENITIES (ALTERNATING ZIG-ZAG ROWS)         */}
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
                text="On-Ground Amenities & Community Landmarks in Sector D"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                staggerDelay={65}
                direction="left"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                Experience nature-centric master planning: lush green family parks, community recreation center, sector Jamia Mosque, and healthcare reservations.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
              {(['all', 'nature', 'lifestyle', 'infrastructure', 'utilities', 'security'] as const).map((cat) => (
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
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-rose-50 text-[#7b002c] border border-rose-200 uppercase tracking-wider">
                        {amenity.tag}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-100 text-slate-700 capitalize">
                        {amenity.category}
                      </span>
                    </div>

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
                      <span className="font-mono text-[11px] text-slate-400 font-semibold">Faisal Hills Block D</span>
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
      {/* 6. VERIFIED PLOTS LISTED FOR SALE (BLOCK D)               */}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Home className="w-3.5 h-3.5" />
              <span>Available Inventory</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Verified Plots for Sale in Faisal Hills Block D
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
                  {/* Top Image Banner - Clickable, Navigates to Plot Inventory */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}&block=block-d`}
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

                    {/* Bottom Image Overlay Details & Hover Prompt */}
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
                        <span>{plot.priceHistoryTrend || '+18.5% annual ROI trend'}</span>
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
                      href={`https://wa.me/923044811717?text=Hello!%20I%20am%20interested%20in%20Faisal%20Hills%20Block%20D%20Plot%20${plot.plotNumber}%20(${plot.size}).%20Please%20share%20latest%20price%20and%20transfer%20details.`}
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

        {/* Sell / List Your Block D Plot Banner */}
        <div className="p-6 sm:p-8 bg-rose-50/70 border border-rose-200/80 rounded-3xl text-slate-900 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#7b002c] text-xs font-bold uppercase tracking-wider border border-rose-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Owner Resale & Liquidation Desk</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
              Want to Sell or Assess Your Block D Plot / Resale File?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
              Get an instant official market valuation and list your file for thousands of active verified buyers across Islamabad, Rawalpindi, and overseas.
            </p>
          </div>

          <a
            href="https://wa.me/923044811717?text=Hello!%20I%20want%20to%20list%20or%20sell%20my%20plot%20in%20Faisal%20Hills%20Block%20D."
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
          <DynamicPlotSeriesExplorer blockSlug="block-d" blockName="Block D" />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 8. CURRENT PRICE SCHEDULE & VALUATION TABLE               */}
      {/* ========================================================= */}
      <section id="pricing" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Current Market Valuations</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Block D Plot Pricing Schedule & Square Foot Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Transparent market rates for resale files and developing plots in Faisal Hills Block D:
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
      {/* 9. WHY INVEST IN FAISAL HILLS BLOCK D                     */}
      {/* ========================================================= */}
      <section id="why-invest" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Investment Thesis & ROI Drivers</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Why Invest in Faisal Hills Block D?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl">
              Discover the 6 key growth catalysts making Block D one of the highest future yield sectors in Taxila and Rawalpindi:
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile View: Sleek, Compact Interactive Accordion List */}
        <div className="block sm:hidden space-y-2.5">
          {blockDWhyInvestReasons.map((item, idx) => {
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
          {blockDWhyInvestReasons.map((item, idx) => {
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5" />
              <span>Official Sales Consultation</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Schedule a Site Visit or Request Block D File Verification
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
                    Our Faisal Hills Block D property desk will reach out with the complete price sheet and plot inventory within 15 minutes.
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
                      placeholder="e.g. Inquiring about park-facing or corner 5/8 Marla plot in Block D..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#7b002c]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Official Block D Inquiry'}</span>
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>Master Community Portfolio</span>
            </div>
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
            items={defaultFaisalHillsBlocks}
            defaultActiveIndex={3}
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
            Faisal Hills Block D Buying & Allotment FAQs
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl">
            Clear answers regarding Block D development status, RDA NOC approvals, plot transfer process, and investment upside.
          </p>
        </div>

        <FaqAccordion faqs={blockDFaqs} blockName="Block D" />
      </section>

      {/* Map Download Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        blockName="Block D"
      />

      {/* Lead Inquiry Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedPlotForInquiry(null);
        }}
        defaultBlock="Block D"
        defaultPlot={selectedPlotForInquiry ? `Plot #${selectedPlotForInquiry.plotNumber} (${selectedPlotForInquiry.size})` : undefined}
        interest={selectedPlotForInquiry ? `${selectedPlotForInquiry.size} ${selectedPlotForInquiry.category} in Block D` : 'Block D General Inquiry'}
      />
    </div>
  );
}
