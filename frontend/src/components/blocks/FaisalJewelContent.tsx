'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Building,
  Building2,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  ShoppingBag,
  Car,
  Dumbbell,
  Utensils,
  Hotel,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  Phone,
  MessageCircle,
  Eye,
  Filter,
  Flame,
  Star,
  Compass,
  ArrowRight,
  Info,
  Clock,
  Waves,
  Wifi,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText,
  SlidersHorizontal,
  Home,
  Search,
  Grid,
  List,
  X,
  Store,
  BadgeCheck,
  Navigation,
  Send,
  Calculator,
  Check,
  Tag,
  MessageSquare
} from 'lucide-react';
import {
  faisalJewelsSpecs,
  faisalJewelsSurroundings,
  faisalJewelsApartmentDetails,
  faisalJewelsHotelExperience,
  faisalJewelResidentialPlan,
  faisalJewelCommercialPlans,
  blocksData,
  BlockInfo
} from '@/data/faisalHillsData';
import CountUpNumber from '@/components/ui/CountUpNumber';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import LeadModal from '@/components/ui/LeadModal';
import ExpandingProjectsShowcase, { defaultFaisalHillsBlocks } from '@/components/ui/ExpandingProjectsShowcase';

export interface FaisalJewelContentProps {
  block?: BlockInfo | null;
}

// Dedicated Faisal Jewel Inventory Units
export interface JewelUnitItem {
  id: string;
  unitNumber: string;
  category: 'Commercial Plot / Showroom' | 'Commercial Shop' | 'Food Court' | 'Corporate Office' | '1-Bed Apartment' | '2-Bed Apartment' | '3-Bed Penthouse' | '4-Star Hotel Suite';
  floorLevel: string;
  dimensions: string;
  areaSqFt: number;
  priceFormatted: string;
  downPaymentFormatted: string;
  quarterlyInstallmentFormatted: string;
  status: 'Available' | 'Hot Investment' | 'Fast Selling' | 'Limited Units';
  facing: string;
  features: string[];
  description: string;
  image: string;
}

const defaultJewelUnits: JewelUnitItem[] = [
  // 0. Flagship Boulevard Commercial Plot Showroom
  {
    id: 'fj-com-showroom-01',
    unitNumber: 'FJ-COM-G01',
    category: 'Commercial Plot / Showroom',
    floorLevel: 'Ground Floor Grand Boulevard',
    dimensions: '35 x 42',
    areaSqFt: 1470,
    priceFormatted: 'PKR 8.35 Crore',
    downPaymentFormatted: 'PKR 2.08 Crore',
    quarterlyInstallmentFormatted: 'PKR 39.1 Lacs',
    status: 'Hot Investment',
    facing: '225ft Grand Entrance Boulevard',
    features: ['Main Boulevard Direct Frontage', '16ft Double Height Ceiling', 'Drive-thru Option', 'Flagship Corporate Showroom'],
    description: 'Premier ground-floor commercial showroom with direct 225ft Grand Boulevard access. Unrivaled visibility for automotive showrooms, multinational banks, or flagship retail anchors.',
    image: '/images/commercial/flagship-store.jpg'
  },
  // 1. Ground Floor Flagship Shop
  {
    id: 'fj-shop-g04',
    unitNumber: 'FJ-G-04',
    category: 'Commercial Shop',
    floorLevel: 'Ground Floor Mall',
    dimensions: '20 x 26',
    areaSqFt: 520,
    priceFormatted: 'PKR 2.96 Crore',
    downPaymentFormatted: 'PKR 74.1 Lacs',
    quarterlyInstallmentFormatted: 'PKR 13.9 Lacs',
    status: 'Fast Selling',
    facing: 'Grand Boulevard Entrance Facing',
    features: ['Main Entrance Frontage', '14ft Double Height', 'Flagship Brand Zone', 'High Footfall Core'],
    description: 'High-visibility Ground Floor flagship retail shop at the grand front entrance. Maximum footfall from Boulevard traffic and visiting commuters.',
    image: '/images/faisalarc (3).jpg'
  },
  // 2. Ground Floor Atrium Boutique
  {
    id: 'fj-shop-g19',
    unitNumber: 'FJ-G-19',
    category: 'Commercial Shop',
    floorLevel: 'Ground Floor Mall',
    dimensions: '14 x 20',
    areaSqFt: 280,
    priceFormatted: 'PKR 1.59 Crore',
    downPaymentFormatted: 'PKR 39.9 Lacs',
    quarterlyInstallmentFormatted: 'PKR 7.4 Lacs',
    status: 'Hot Investment',
    facing: 'Central Glass Atrium Facing',
    features: ['Atrium Escalator Corner', 'Tempered Glass Facade', 'Perfume & Luxury Corner', 'Instant Brand Visibility'],
    description: 'Prime boutique retail cut in Ground Floor central atrium. Ideal for international cosmetics, luxury watches, and high-end accessories.',
    image: '/images/faisalarc (1).webp'
  },
  // 3. Lower Ground Anchor Superstore
  {
    id: 'fj-shop-lg42',
    unitNumber: 'FJ-LG-42',
    category: 'Commercial Shop',
    floorLevel: 'Lower Ground Floor',
    dimensions: '25 x 34',
    areaSqFt: 850,
    priceFormatted: 'PKR 4.42 Crore',
    downPaymentFormatted: 'PKR 1.10 Crore',
    quarterlyInstallmentFormatted: 'PKR 20.7 Lacs',
    status: 'Limited Units',
    facing: 'Basement Lift Lobby & Hypermarket',
    features: ['Anchor Retail Cut', 'Direct Underground Lift Lobby', 'Loading Bay Access', 'High Density Footfall'],
    description: 'Expansive Lower Ground commercial shop directly connected to basement parking elevators. Suitable for pharmacy, mart, or banking branch.',
    image: '/images/faisalarc (2).webp'
  },
  // 4. 4th Floor Food Court Kiosk
  {
    id: 'fj-shop-4ffc2',
    unitNumber: 'FJ-4F-FC2',
    category: 'Food Court',
    floorLevel: '4th Floor (Mega Food Court)',
    dimensions: '13 x 15',
    areaSqFt: 195,
    priceFormatted: 'PKR 1.01 Crore',
    downPaymentFormatted: 'PKR 25.3 Lacs',
    quarterlyInstallmentFormatted: 'PKR 4.7 Lacs',
    status: 'Fast Selling',
    facing: 'Central 500-Seat Dining Hall',
    features: ['Commercial Exhaust Duct', 'Water & Gas Conduits', 'High Fast-Food Footfall', 'Shared Outdoor Terrace'],
    description: 'Fast-food kitchen and kiosk cut on 4th floor mega food court. Excellent recurring cash-flow with high daily student and family visitors.',
    image: '/images/faisalarc (2).webp'
  },
  // 5. 1-Bed Executive Apartment
  {
    id: 'fj-apt-1bed',
    unitNumber: 'FJ-1104',
    category: '1-Bed Apartment',
    floorLevel: '11th Floor (Executive Wing)',
    dimensions: '25 x 37',
    areaSqFt: 929,
    priceFormatted: 'PKR 1.58 Crore',
    downPaymentFormatted: 'PKR 39.7 Lacs',
    quarterlyInstallmentFormatted: 'PKR 7.4 Lacs',
    status: 'Available',
    facing: 'Margalla Foothills Panorama',
    features: ['Smart Home Automation', 'Designer Open Kitchen', 'Private Balcony', 'High Rental Yield'],
    description: 'Executive 1-Bedroom serviced apartment on 11th floor with picturesque northern Margalla mountain views and luxury finishes.',
    image: '/faisal-jewel-1.png'
  },
  // 6. 2-Bed Luxury Suite
  {
    id: 'fj-apt-2bed',
    unitNumber: 'FJ-1608',
    category: '2-Bed Apartment',
    floorLevel: '16th Floor (Skyline Wing)',
    dimensions: '35 x 45',
    areaSqFt: 1575,
    priceFormatted: 'PKR 2.67 Crore',
    downPaymentFormatted: 'PKR 66.9 Lacs',
    quarterlyInstallmentFormatted: 'PKR 12.5 Lacs',
    status: 'Fast Selling',
    facing: 'Dual Margalla & Boulevard View',
    features: ['2 Master Ensuite Bedrooms', 'Spacious Sky Terrace', 'Dedicated Covered Parking', '24/7 Concierge'],
    description: 'Spacious 2-Bedroom luxury suite with wrap-around terrace, bespoke marble tiling, and panoramic sunset views over Faisal Hills.',
    image: '/faisal-jewel.jpg'
  },
  // 7. 3-Bed Sky Penthouse
  {
    id: 'fj-apt-3bed',
    unitNumber: 'FJ-2002',
    category: '3-Bed Penthouse',
    floorLevel: '20th Floor (Penthouse Deck)',
    dimensions: '48 x 67',
    areaSqFt: 3226,
    priceFormatted: 'PKR 5.48 Crore',
    downPaymentFormatted: 'PKR 1.37 Crore',
    quarterlyInstallmentFormatted: 'PKR 25.7 Lacs',
    status: 'Limited Units',
    facing: '360° Skyline & Margalla Horizon',
    features: ['Private Plunge Pool Option', 'Direct Penthouse Lift Key', 'Maid Room + Utility', 'Rooftop Lounge Access'],
    description: 'Ultra-exclusive 3-Bedroom Sky Penthouse with double-height salon, private sky garden terrace, and VIP elevator access.',
    image: '/faisal-jewel-2.png'
  },
  // 8. 4-Star Hotel Suite
  {
    id: 'fj-hotel-suite',
    unitNumber: 'FJ-2305',
    category: '4-Star Hotel Suite',
    floorLevel: '23rd Floor (Hotel Wing)',
    dimensions: '22 x 34',
    areaSqFt: 750,
    priceFormatted: 'PKR 1.65 Crore',
    downPaymentFormatted: 'PKR 41.2 Lacs',
    quarterlyInstallmentFormatted: 'PKR 7.7 Lacs',
    status: 'Hot Investment',
    facing: 'Margalla Infinity Pool View',
    features: ['Fully Furnished Turnkey', 'Hotel Rental Pool Program', 'Complimentary Breakfast', 'High Net Cash Flow'],
    description: 'Fully serviced 4-Star Hotel Suite managed by international hospitality operator with passive quarterly rental income guarantee.',
    image: '/faisal-jewel-3.png'
  }
];

const jewelLandmarks = [
  {
    id: '01',
    name: 'Margalla Avenue',
    distance: 'Direct Frontage',
    time: '0 min',
    desc: 'Direct signal-free 6-lane access route into Islamabad sectors.',
    image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg'
  },
  {
    id: '02',
    name: 'HiTech University',
    distance: 'Major Education Hub',
    time: '3 min',
    desc: 'Premier university and academic campus adjacent to Faisal Hills.',
    image: '/images/imgi_51_educational.webp'
  },
  {
    id: '03',
    name: 'Taxila City & Heritage',
    distance: 'Historic Hub',
    time: '5 min',
    desc: 'UNESCO World Heritage sites and ancient Gandhara cultural reserve.',
    image: '/images/imgi_46_faisal-hills-monument.webp'
  },
  {
    id: '04',
    name: 'Wah Cantt',
    distance: 'Cantonment Hub',
    time: '8 min',
    desc: 'Established military cantonment city and commercial markets.',
    image: '/images/imgi_53_medical-college.webp'
  },
  {
    id: '05',
    name: 'Sector D-12 & B-17',
    distance: 'Emerging Sectors',
    time: '12 min',
    desc: 'Rapidly growing modern residential sectors in Islamabad Zone 2.',
    image: '/faisal-jewel-1.png'
  },
  {
    id: '06',
    name: 'Islamabad Int\'l Airport',
    distance: 'Direct via Motorway',
    time: '25 min',
    desc: 'Seamless direct motorway link to the international terminal.',
    image: '/images/imgi_50_security.webp'
  },
  {
    id: '07',
    name: 'Sector F-10 & Blue Area',
    distance: 'Central Business Hub',
    time: '30 min',
    desc: 'Islamabad commercial center, luxury dining, and retail avenues.',
    image: '/faisal-jewel.jpg'
  }
];

export function FaisalJewelContent({ block }: FaisalJewelContentProps = {}) {
  const [currentBlock, setCurrentBlock] = useState<BlockInfo | null>(block || null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [isOverviewExpanded, setIsOverviewExpanded] = useState<boolean>(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [selectedUnitForInquiry, setSelectedUnitForInquiry] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCalcUnit, setSelectedCalcUnit] = useState<'Commercial Shop' | '1-Bed Apartment' | '2-Bed Apartment' | '3-Bed Penthouse' | 'Hotel Suite'>('Commercial Shop');
  const [formData, setFormData] = useState({ name: '', phone: '', unit: 'Commercial Shop', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync block data from props or localStorage
  useEffect(() => {
    if (block) setCurrentBlock(block);
  }, [block]);

  useEffect(() => {
    const syncLocal = () => {
      if (typeof window !== 'undefined') {
        try {
          const stored = JSON.parse(localStorage.getItem('faisal_blocks_custom_v1') || '{}');
          const jewelStored = stored['faisal-jewel-islamabad'] || stored['faisal-jewels'];
          if (jewelStored) {
            setCurrentBlock(prev => ({ ...(prev || {}), ...jewelStored } as BlockInfo));
          }
        } catch (e) {}
      }
    };
    syncLocal();
    window.addEventListener('faisal_blocks_updated', syncLocal);
    return () => window.removeEventListener('faisal_blocks_updated', syncLocal);
  }, []);

  const showcaseImage = currentBlock?.heroImage || '/faisal-jewel.jpg';
  const masterPlanImg = currentBlock?.masterPlanImage || '/faisal-jewel-sketch.jpg';

  // Landmark auto-scroll refs and handlers
  const landmarksScrollRef = useRef<HTMLDivElement>(null);
  const [isLandmarksHovered, setIsLandmarksHovered] = useState<boolean>(false);

  // 1-second auto scroll timer
  useEffect(() => {
    if (isLandmarksHovered) return;
    const interval = setInterval(() => {
      if (landmarksScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = landmarksScrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const cardWidth = 280;
        if (scrollLeft >= maxScroll - 15) {
          landmarksScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          landmarksScrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 1200); // 1.2s smooth auto scroll
    return () => clearInterval(interval);
  }, [isLandmarksHovered]);

  const scrollLandmarks = (direction: 'left' | 'right') => {
    if (landmarksScrollRef.current) {
      const cardWidth = 300;
      landmarksScrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const otherBlocks = useMemo(() => {
    return defaultFaisalHillsBlocks.filter((b) => b.id !== 'faisal-jewels' && b.id !== 'faisal-jewel-islamabad' && b.href !== '/blocks/faisal-jewel-islamabad');
  }, []);

  const filteredUnits = useMemo(() => {
    if (selectedCategoryFilter === 'all') return defaultJewelUnits;
    return defaultJewelUnits.filter((u) => {
      if (selectedCategoryFilter === 'commercial') return u.category.includes('Shop') || u.category.includes('Showroom') || u.category.includes('Food');
      if (selectedCategoryFilter === 'apartments') return u.category.includes('Apartment') || u.category.includes('Penthouse');
      if (selectedCategoryFilter === 'hotel') return u.category.includes('Hotel');
      return true;
    });
  }, [selectedCategoryFilter]);

  const jewelFaqs = [
    {
      q: 'What is Faisal Jewel Islamabad?',
      a: 'Faisal Jewel Islamabad is a landmark 27-story mixed-use skyscraper in Faisal Hills. It features 6 commercial shopping mall floors (350+ shops), 18 residential apartment floors (250+ units), a 4-star boutique hotel, rooftop infinity pool, and 3 basement parking levels for 1,000+ cars.'
    },
    {
      q: 'Where is Faisal Jewel located?',
      a: 'Faisal Jewel is situated at the main grand entrance of Faisal Hills on GT Road (N-5), directly at the crossroads of Margalla Avenue and the M-1 Motorway Interchange. It is 30 minutes from Islamabad Airport and Blue Area.'
    },
    {
      q: 'What is the payment plan for Faisal Jewel?',
      a: 'Faisal Jewel offers an easy 4-year installment plan (16 quarterly installments) with 20–25% down payment at booking. Possession is targeted for Q4 2027.'
    },
    {
      q: 'What amenities are included in Faisal Jewel?',
      a: 'Amenities include a panoramic rooftop infinity pool, sky gym & fitness club, 6-floor retail mall, fine dining restaurants, 3-level basement parking with EV chargers, 24/7 biometric security, high-speed capsule elevators, and uninterrupted power backup.'
    }
  ];

  const calcDetails = {
    'Commercial Shop': {
      price: 'PKR 1.11 Cr – 2.96 Cr',
      downPayment: 'PKR 27.9 Lacs (25%)',
      installment: 'PKR 5.2 Lacs / quarter',
      rental: 'PKR 1.2 Lacs – 2.8 Lacs / month',
      yield: '12.5% Projected Yield',
      suitability: 'High footfall retail shops across Lower Ground to 4th Floor shopping mall.'
    },
    '1-Bed Apartment': {
      price: 'PKR 1.45 Cr – 1.85 Cr',
      downPayment: 'PKR 36.2 Lacs (25%)',
      installment: 'PKR 6.8 Lacs / quarter',
      rental: 'PKR 85,000 – 1.2 Lacs / month',
      yield: '10.8% Projected Yield',
      suitability: 'Executive serviced residence with private balcony and Margalla mountain views.'
    },
    '2-Bed Apartment': {
      price: 'PKR 2.45 Cr – 3.10 Cr',
      downPayment: 'PKR 61.2 Lacs (25%)',
      installment: 'PKR 11.5 Lacs / quarter',
      rental: 'PKR 1.5 Lacs – 2.2 Lacs / month',
      yield: '11.4% Projected Yield',
      suitability: 'Family luxury residence with dual Margalla & boulevard views and sky terrace.'
    },
    '3-Bed Penthouse': {
      price: 'PKR 4.80 Cr – 5.95 Cr',
      downPayment: 'PKR 1.20 Crore (25%)',
      installment: 'PKR 22.5 Lacs / quarter',
      rental: 'PKR 3.0 Lacs – 4.5 Lacs / month',
      yield: '12.0% Projected Yield',
      suitability: 'Ultra-exclusive sky penthouse with private plunge pool and 360° horizon views.'
    },
    'Hotel Suite': {
      price: 'PKR 1.50 Cr – 1.95 Cr',
      downPayment: 'PKR 37.5 Lacs (25%)',
      installment: 'PKR 7.0 Lacs / quarter',
      rental: 'Quarterly Hotel Pool Payouts',
      yield: '13.5% Net Hotel Yield',
      suitability: 'Fully furnished turnkey 4-Star hotel suite managed by international hotel operator.'
    }
  }[selectedCalcUnit];

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
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Total Storeys</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#7b002c]">
            <CountUpNumber end={27} duration={1800} /> Floors
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">Iconic Margalla skyscraper</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Commercial Retail</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-emerald-700">
            <CountUpNumber end={350} suffix="+" duration={1800} /> Shops
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">6-floor luxury shopping mall</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Luxury Residences</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            <CountUpNumber end={250} suffix="+" duration={2000} /> Suites
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">1, 2, 3-Bed & 4★ hotel suites</span>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Smart Parking</span>
          <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            <CountUpNumber end={1000} suffix="+" duration={1800} /> Cars
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 font-sans block">3-level underground basement</span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OVERVIEW OF FAISAL JEWEL                               */}
      {/* ========================================================= */}
      <section id="overview" className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Narrative with See More toggle */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-4">
                <TextReveal
                  as="h1"
                  text={`${currentBlock?.name || 'Faisal Jewel'} Overview`}
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
                  <p>
                    <strong>{currentBlock?.name || 'Faisal Jewel'}</strong> is the flagship architectural landmark of Faisal Hills Islamabad. Soaring 27 storeys at the grand main entrance on GT Road (N-5), this iconic mixed-use skyscraper integrates a 6-floor luxury shopping mall with 350+ brand outlets, 250+ luxury serviced residences, a 4-star boutique hotel, rooftop infinity pool, and 3 levels of underground smart parking.
                  </p>

                  {isOverviewExpanded && (
                    <div className="space-y-3 pt-1 animate-fadeIn">
                      <p>
                        Developed as a signature joint venture between <strong>Zedem Properties Pvt. Ltd.</strong> and <strong>CAM Construction</strong>, Faisal Jewel redefines vertical luxury living in the twin cities. With direct connectivity to Margalla Avenue, M-1 Motorway, and Taxila, it captures prime commercial footfall and delivers high rental yields.
                      </p>
                      <p>
                        Units are offered on flexible 4-year installment plans with 25% booking down payment and 16 quarterly installments.
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
                    src={showcaseImage}
                    alt="Faisal Jewel 27-Storey Skyscraper Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="p-5 bg-slate-900 text-white space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    Flagship Mixed-Use Landmark
                  </span>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                    27-Storey Luxury Tower
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    6-floor shopping mall, luxury apartments, 4★ hotel suites & rooftop infinity pool.
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
                Faisal Jewel Location & Road Connectivity Map
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Positioned at the grand GT Road (N-5) entrance with direct access to Margalla Avenue and M-1 Motorway:
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Full-width Map Container */}
        <ScrollReveal direction="up" delay={100}>
          <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
            <iframe
              title="Faisal Jewel Location Map"
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
      {/* 4. NEARBY LANDMARKS & COMMUTE MATRIX (AUTO-SCROLL)        */}
      {/* ========================================================= */}
      <section id="nearby-landmarks" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="space-y-1.5 max-w-2xl">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                Nearby Landmarks & Commute Distances from Faisal Jewel
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Strategic transit corridors connecting to Islamabad airport, Motorway, and educational institutions:
              </p>
            </div>

            {/* Scroll Navigation Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => scrollLandmarks('left')}
                aria-label="Previous Landmark"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white transition-all flex items-center justify-center shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollLandmarks('right')}
                aria-label="Next Landmark"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white transition-all flex items-center justify-center shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Scroll Carousel with 1-second auto scroll */}
        <div
          ref={landmarksScrollRef}
          onMouseEnter={() => setIsLandmarksHovered(true)}
          onMouseLeave={() => setIsLandmarksHovered(false)}
          onTouchStart={() => setIsLandmarksHovered(true)}
          onTouchEnd={() => setIsLandmarksHovered(false)}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pt-1 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0"
        >
          {jewelLandmarks.map((item) => (
            <div
              key={item.id}
              className="w-[240px] min-[420px]:w-[270px] sm:w-[290px] shrink-0 snap-start bg-slate-50 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#7b002c] text-white text-[9px] font-bold uppercase tracking-wider font-mono">
                    Point {item.id}
                  </span>
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-bold">
                    {item.time}
                  </span>
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Commute</span>
                  <span className="text-[#7b002c] font-bold">{item.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. MASTER PLAN & FLOOR ARCHITECTURAL BLUEPRINT            */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="border-b border-slate-200 pb-5">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Faisal Jewel Vertical Master Plan & Floor Zoning
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Explore the 27-storey vertical distribution separating retail, dining, corporate, residential, and hotel decks:
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
                  src={masterPlanImg}
                  alt="Faisal Jewel Architectural Elevation Blueprint"
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
              <span>Download Floor Plans</span>
            </button>
          </div>

          {/* Right Column: Floor Breakdown Specs */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Commercial Mall & Corporate (LG to 5th)
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• LG to 3rd Floors:</strong> 350+ luxury retail shops, gold souk, fashion avenues, and tech hubs.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 4th Floor:</strong> 500-seat mega food court with alfresco Margalla dining terrace.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 5th Floor:</strong> Corporate executive office suites with high-speed fiber connectivity.
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-sans pt-2 border-t border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>RDA Sanctioned commercial mixed-use layout.</span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Residences, Hotel & Rooftop (6th to 27th)
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 6th to 19th Floors:</strong> 250+ luxury 1, 2, and 3-bed serviced apartments.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 20th to 22nd Floors:</strong> Executive sky penthouses with private sky garden terraces.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <strong>• 23rd to 27th Floors:</strong> 4-Star boutique hotel suites & rooftop infinity pool deck.
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-sans pt-2 border-t border-slate-100 flex items-center justify-between">
                <Link href="/faisal-hills-commercial" className="text-[#7b002c] font-bold hover:underline flex items-center gap-1">
                  <span>Commercial Rates</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
                <Link href="/blocks/executive-block" className="text-[#7b002c] font-bold hover:underline flex items-center gap-1">
                  <span>Executive Block</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SHOPS, APARTMENTS & UNITS FOR SALE (PRICING & INVENTORY)*/}
      {/* ========================================================= */}
      <section id="plots-for-sale" className="scroll-mt-28 space-y-8">
        
        {/* Pricing Schedule Section */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1.5 border-b border-slate-200 pb-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Faisal Jewel 4-Year Payment Plan Schedule
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Official rates for Commercial Shops (LG to 4th Floor) and Luxury Serviced Apartments (6th to 19th Floor) spread over 16 quarterly installments:
            </p>
          </div>

          {/* Mobile View: Clean Responsive Price Cards */}
          <div className="block sm:hidden space-y-3">
            {faisalJewelCommercialPlans.map((plan, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7b002c]" />
                    <span className="font-bold text-sm text-slate-900">{plan.floor}</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
                    16 Quarters (4 Yrs)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-sans">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Rate / Sq.Ft.</span>
                    <span className="text-slate-800 font-mono font-medium">PKR {plan.ratePerSqFtFormatted}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Area Range</span>
                    <span className="text-slate-800 font-medium">{plan.areaMin}–{plan.areaMax} Sq.Ft.</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Price Range</span>
                    <span className="font-serif font-bold text-sm text-[#7b002c]">PKR {plan.totalPriceMinFormatted} – {plan.totalPriceMaxFormatted}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnitForInquiry(`Faisal Jewel ${plan.floor} Commercial Shop`);
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
                    <th className="p-4 whitespace-nowrap">Floor Level</th>
                    <th className="p-4 whitespace-nowrap">Rate / Sq.Ft.</th>
                    <th className="p-4 whitespace-nowrap">Area Range (Sq.Ft.)</th>
                    <th className="p-4 whitespace-nowrap">25% Booking Range</th>
                    <th className="p-4 whitespace-nowrap">Total Price Range</th>
                    <th className="p-4 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {faisalJewelCommercialPlans.map((plan, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-slate-900 whitespace-nowrap flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#7b002c]" />
                        <span>{plan.floor}</span>
                      </td>
                      <td className="p-4 font-mono text-[#7b002c] font-bold whitespace-nowrap">PKR {plan.ratePerSqFtFormatted}</td>
                      <td className="p-4 whitespace-nowrap">{plan.areaMin} – {plan.areaMax} Sq.Ft.</td>
                      <td className="p-4 font-semibold text-slate-800 whitespace-nowrap">PKR {plan.downPaymentMinFormatted} – {plan.downPaymentMaxFormatted}</td>
                      <td className="p-4 font-bold text-emerald-700 whitespace-nowrap">PKR {plan.totalPriceMinFormatted} – {plan.totalPriceMaxFormatted}</td>
                      <td className="p-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUnitForInquiry(`Faisal Jewel ${plan.floor} Shop`);
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

        {/* Live Inventory Grid */}
        <div className="space-y-6">
          <ScrollReveal direction="up" delay={50}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  Available Units & Suites in Faisal Jewel
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                  Browse verified commercial shops, luxury apartments, and penthouses on easy 4-year installment plans:
                </p>
              </div>

              {/* Filter Tabs (Hidden on mobile, visible on desktop) */}
              <div className="hidden sm:flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 shrink-0">
                {[
                  { key: 'all', label: 'All Units' },
                  { key: 'commercial', label: 'Shops & Food' },
                  { key: 'apartments', label: 'Apartments' },
                  { key: 'hotel', label: 'Hotel Suites' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelectedCategoryFilter(tab.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategoryFilter === tab.key
                        ? 'bg-[#7b002c] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Units Cards Grid: 2 per row on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filteredUnits.map((unit, idx) => (
              <ScrollReveal key={unit.id} direction="up" delay={(idx % 3) * 80}>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden h-full">
                  <div>
                    <div className="relative h-28 min-[400px]:h-36 sm:h-48 w-full overflow-hidden bg-slate-950 block">
                      <img
                        src={unit.image}
                        alt={unit.unitNumber}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                      <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                        <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium block uppercase tracking-wider truncate">{unit.floorLevel}</span>
                        <h4 className="font-serif font-bold text-sm sm:text-xl group-hover:text-amber-300 transition-colors">Unit #{unit.unitNumber}</h4>
                      </div>
                    </div>

                    <div className="p-3 sm:p-5 space-y-2 sm:space-y-3.5 block">
                      <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-600">
                        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Category:</span>
                          <span className="text-slate-900 font-bold group-hover:text-[#7b002c] transition-colors truncate max-w-[85px] sm:max-w-none">{unit.category}</span>
                        </div>
                        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Area:</span>
                          <strong className="text-slate-900 font-semibold">{unit.areaSqFt} Sq.Ft.</strong>
                        </div>
                        <div className="flex justify-between items-center pb-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">25% Booking:</span>
                          <strong className="text-slate-900 font-semibold truncate max-w-[85px] sm:max-w-none">{unit.downPaymentFormatted}</strong>
                        </div>
                        <div className="hidden sm:flex justify-between items-center">
                          <span className="text-slate-500 font-medium">Quarterly:</span>
                          <span className="text-emerald-700 font-bold">{unit.quarterlyInstallmentFormatted}</span>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-wrap gap-1.5 pt-1">
                        {Array.isArray(unit.features) && unit.features.slice(0, 3).map((feat, fIdx) => (
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
                      <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Price</span>
                      <span className="font-serif font-bold text-xs min-[400px]:text-sm sm:text-base text-[#7b002c] truncate">{unit.priceFormatted}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUnitForInquiry(`Faisal Jewel Unit #${unit.unitNumber} (${unit.category})`);
                          setIsLeadModalOpen(true);
                        }}
                        className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] sm:text-[11px] font-bold rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-0.5 sm:gap-1 text-center cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>

                      <a
                        href={`https://wa.me/923044811717?text=${encodeURIComponent(
                          `Hi! I am interested in booking Faisal Jewel Unit #${unit.unitNumber} (${unit.category} - ${unit.priceFormatted}). Please share verification & installment details.`
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

          {/* List / Book Your Unit Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-[#4a081a] to-slate-950 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                Looking to Book or Transfer a Unit in Faisal Jewel?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                Get priority allocation on prime corner shops and penthouse suites with official Zedem registration.
              </p>
            </div>

            <a
              href="https://wa.me/923044811717?text=Hello!%20I%20want%20to%20book%20a%20commercial%20shop%20or%20luxury%20apartment%20in%20Faisal%20Jewel%20Islamabad."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white hover:bg-rose-50 text-[#7b002c] text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shrink-0 flex items-center gap-2"
            >
              <span>WhatsApp Booking Desk</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 7. AMENITIES & HOTEL-GRADE FACILITIES                     */}
      {/* ========================================================= */}
      <section id="amenities" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900">
                World-Class Amenities in Faisal Jewel
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Signature skyscraper facilities engineered for luxury living and high retail footfall:
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: '6-Floor Shopping Mall',
              desc: 'Six levels of air-conditioned luxury retail including jewelry souks, fashion brands, and food courts.',
              image: '/images/faisalarc (1).webp',
              tag: '350+ Shops'
            },
            {
              title: 'Panoramic Sky Gym & Spa',
              desc: 'Fully equipped multi-tier fitness club with imported cardio machines, sauna, and yoga studio overlooking Margalla.',
              image: '/images/imgi_48_sports-arena.webp',
              tag: 'Health Club'
            },
            {
              title: '3-Level Basement Parking',
              desc: 'Three subterranean levels with ANPR number plate recognition, EV charging, and 1,000+ car bays.',
              image: '/faisal-jewel-3.png',
              tag: '1,000+ Cars'
            },
            {
              title: '4★ Hotel & Rooftop Pool',
              desc: 'Boutique hospitality experience with rooftop infinity pool, 24/7 concierge, and fine dining terraces.',
              image: '/images/faisalarc (2).webp',
              tag: 'Floors 22–27'
            }
          ].map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 40}>
              <div className="rounded-3xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col justify-between h-full shadow-2xs hover:shadow-md transition-all">
                <div className="relative h-44 w-full bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                    {item.tag}
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <h3 className="font-serif font-bold text-base text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. VERTICAL FLOOR EXPLORER & ZONING                       */}
      {/* ========================================================= */}
      <section id="series-of-plots" className="scroll-mt-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Floor-by-Floor Master Distribution Series
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl">
              Comprehensive 27-storey vertical zoning map separating retail, corporate, residential, and hospitality levels:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { level: 'Floors B1 to B3', title: 'Smart Subterranean Parking', desc: '3 basement levels accommodating 1,000+ vehicles with smart electronic parking guidance.', badge: '1,000+ Cars' },
            { level: 'Floors LG to 3rd', title: 'Luxury Shopping Mall', desc: '6 levels of high-end retail shops, gold souk, electronics hub, and fashion outlets.', badge: '350+ Brand Shops' },
            { level: 'Floors 4th & 5th', title: 'Food Court & Corporate', desc: '500-seat multi-cuisine food court and executive air-conditioned corporate offices.', badge: 'Food & Offices' },
            { level: 'Floors 6th to 27th', title: 'Apartments, Hotel & Pool', desc: 'Luxury serviced apartments, 4-star boutique hotel suites, and rooftop infinity pool.', badge: 'Residences & 4★ Hotel' }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-[#7b002c] uppercase tracking-wider block">{item.level}</span>
                <h4 className="font-serif font-bold text-base text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 block text-center">
                {item.badge}
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
            defaultActiveIndex={1}
            containerHeightClass="h-[480px] lg:h-[520px]"
          />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 10. FACILITIES, ROI CALCULATOR & CONSTRUCTION PROGRESS     */}
      {/* ========================================================= */}
      <section id="facilities" className="scroll-mt-28 space-y-12 sm:space-y-16">
        
        {/* Smart Skyscraper ROI & Rental Calculator */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                Faisal Jewel Smart Investment & ROI Explorer
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
                Select a unit category to calculate 25% down payment, quarterly installments, and projected rental income:
              </p>
            </div>

            {/* Unit Selector Buttons (Scrollable on mobile) */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0 overflow-x-auto max-w-full -mx-2 px-2 sm:mx-0 sm:px-1">
              {(['Commercial Shop', '1-Bed Apartment', '2-Bed Apartment', '3-Bed Penthouse', 'Hotel Suite'] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setSelectedCalcUnit(unit)}
                  className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    selectedCalcUnit === unit
                      ? 'bg-[#7b002c] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Total Price Band</span>
                    <div className="font-serif font-bold text-xl sm:text-2xl text-slate-900">{calcDetails.price}</div>
                    <span className="text-[11px] text-slate-500 block">25% Booking: <strong>{calcDetails.downPayment}</strong></span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                    <span className="text-[11px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">Projected Monthly Rental</span>
                    <div className="font-serif font-bold text-xl sm:text-2xl text-emerald-700">{calcDetails.rental}</div>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {calcDetails.yield}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-[#7b002c] font-serif uppercase tracking-wider block">Quarterly Installment:</strong>
                    <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                      {calcDetails.installment}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{calcDetails.suitability}</p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-rose-50/80 via-white to-slate-50 border border-rose-200/80 shadow-xs space-y-5 h-full">
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b002c] bg-rose-100/80 px-3 py-1 rounded-full border border-rose-300/50 inline-block">
                    Official 4-Year Installment Plan
                  </span>
                  <h3 className="font-serif font-bold text-xl text-slate-900">
                    Lock {selectedCalcUnit} at Today's Baseline
                  </h3>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Avoid paying post-possession premiums. Speak directly with our sales team to verify available floor levels and installment schedules.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href="#plots-for-sale"
                    className="w-full py-3 px-5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Tag className="w-4 h-4 text-[#7b002c]" />
                    <span>View Available {selectedCalcUnit} Units</span>
                  </a>
                  <a
                    href={`https://wa.me/923044811717?text=${encodeURIComponent(
                      `Hello! I am interested in booking a ${selectedCalcUnit} in Faisal Jewel Islamabad.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Booking Desk</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Construction Progress */}
        <div className="space-y-6">
          <div className="space-y-1.5 border-b border-slate-200 pb-5">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Faisal Jewel Construction Progress & Milestones
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Live engineering tracker by CAM Construction & Zedem Properties teams:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '01', title: '3 Basements & Deep Raft Piling', status: '100% Complete', note: 'Substructure deep piling, raft foundation & retaining walls 100% completed.', state: 'done' },
              { step: '02', title: 'Commercial Mall Floors (LG-4th)', status: '100% Cast', note: 'Lower Ground to 4th Floor shopping mall slabs fully poured with MEP conduit piping.', state: 'done' },
              { step: '03', title: 'Residential Superstructure', status: 'Active Casting', note: 'RCC slab casting active on Floor 14 with heavy tower crane and placing booms.', state: 'active' },
              { step: '04', title: 'Target Delivery & Handover', status: 'Q4 2027', note: 'Projected completion and possession on track for Q4 2027 with turnkey fittings.', state: 'active' }
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
                How to Book a Shop or Apartment in Faisal Jewel
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Securing a unit follows official verified procedures at Zedem International head office:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                { title: 'CNIC / NICOP Copies', desc: 'Two clear copies of buyer CNIC (or NICOP for overseas buyers).' },
                { title: 'Next of Kin Details', desc: 'Two clear copies of your designated nominee / Next of Kin CNIC.' },
                { title: 'Passport Photographs', desc: 'Two recent passport-size photos with clean white background.' },
                { title: 'Payment Instrument', desc: '25% Down payment pay order in developer name for clear transaction record.' }
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
                    Faisal Jewel VIP Sales Desk
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Our certified advisors coordinate official unit allocation, NDC clearance, and legal biometric transfer directly at Zedem International head office.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/923044811717?text=I%20am%20interested%20in%20verifying%20and%20booking%20a%20unit%20in%20Faisal%20Jewel%20Islamabad."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Skyscraper Desk</span>
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
              Everything You Need to Know About Faisal Jewel
            </h2>
          </div>

          <div className="space-y-3">
            {jewelFaqs.map((faq, idx) => (
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
              VIP Skyscraper Consultation
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold">
              Interested in Faisal Jewel Commercial Shops or Apartments?
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 font-sans leading-relaxed">
              Leave your details below to receive official rate schedules, floor-by-floor blueprints, and available unit reservations.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-emerald-200 font-sans text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>Thank you! Your inquiry has been received. Our senior advisor will contact you shortly.</span>
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
                <label className="block text-xs font-semibold text-rose-100 mb-1.5">Preferred Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white text-xs focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer"
                >
                  <option value="Commercial Shop">Commercial Retail Shop</option>
                  <option value="1-Bed Apartment">1-Bed Luxury Apartment</option>
                  <option value="2-Bed Apartment">2-Bed Executive Suite</option>
                  <option value="3-Bed Penthouse">3-Bed Sky Penthouse</option>
                  <option value="Hotel Suite">4-Star Hotel Suite</option>
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
          blockName="Faisal Jewel Skyscraper"
          mapImageUrl={masterPlanImg}
        />
      )}

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedUnitForInquiry(null);
        }}
        defaultBlock="Faisal Jewel"
        defaultPlot={selectedUnitForInquiry || undefined}
        interest={selectedUnitForInquiry ? `${selectedUnitForInquiry} in Faisal Jewel` : 'Faisal Jewel Skyscraper Investment'}
      />

    </div>
  );
}

export default FaisalJewelContent;
