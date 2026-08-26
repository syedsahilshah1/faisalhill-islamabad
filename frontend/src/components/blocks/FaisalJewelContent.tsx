'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  Home
} from 'lucide-react';
import {
  faisalJewelsSpecs,
  faisalJewelsSurroundings,
  faisalJewelsApartmentDetails,
  faisalJewelsHotelExperience,
  faisalJewelResidentialPlan,
  faisalJewelCommercialPlans,
  blocksData
} from '@/data/faisalHillsData';
import CountUpNumber from '@/components/ui/CountUpNumber';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import FaqAccordion from '@/components/ui/FaqAccordion';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import LeadModal from '@/components/ui/LeadModal';
import ExpandingProjectsShowcase from '@/components/ui/ExpandingProjectsShowcase';

// Dedicated Faisal Jewel Inventory Units
interface JewelUnitItem {
  id: string;
  unitNumber: string;
  category: 'Commercial Shop' | 'Food Court' | 'Corporate Office' | '1-Bed Apartment' | '2-Bed Apartment' | '3-Bed Penthouse' | '4-Star Hotel Suite';
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
  // 4. Lower Ground Retail Kiosk
  {
    id: 'fj-shop-lg09',
    unitNumber: 'FJ-LG-09',
    category: 'Commercial Shop',
    floorLevel: 'Lower Ground Floor',
    dimensions: '12 x 18',
    areaSqFt: 215,
    priceFormatted: 'PKR 1.11 Crore',
    downPaymentFormatted: 'PKR 27.9 Lacs',
    quarterlyInstallmentFormatted: 'PKR 5.2 Lacs',
    status: 'Available',
    facing: 'Escalator Landing Front',
    features: ['Affordable Entry Price', 'High Rental Return', 'Direct Escalator Landing', 'Convenience Store Ready'],
    description: 'Compact, affordable commercial shop on Lower Ground level. Perfect entry-level high-yield commercial investment for overseas buyers.',
    image: '/images/faisalarc (1).webp'
  },
  // 5. 1st Floor Gold Souk & Jewelry Outlet
  {
    id: 'fj-shop-1f12',
    unitNumber: 'FJ-1F-12',
    category: 'Commercial Shop',
    floorLevel: '1st Floor (Gold & Jewelry Souk)',
    dimensions: '14 x 17.5',
    areaSqFt: 245,
    priceFormatted: 'PKR 1.27 Crore',
    downPaymentFormatted: 'PKR 31.8 Lacs',
    quarterlyInstallmentFormatted: 'PKR 5.9 Lacs',
    status: 'Fast Selling',
    facing: 'Jewelry Court Corridor',
    features: ['Reinforced Vault Security', 'Jewelry Galleria Zone', 'CCTV Grid Coverage', 'Luxury Display Arcades'],
    description: 'Exclusive retail shop located inside the 1st Floor Gold & Diamond Souk. High security infrastructure tailored for jeweler brands.',
    image: '/images/faisalarc (3).jpg'
  },
  // 6. 2nd Floor Fashion & Apparel Outlet
  {
    id: 'fj-shop-2f33',
    unitNumber: 'FJ-2F-33',
    category: 'Commercial Shop',
    floorLevel: '2nd Floor (Fashion Galleria)',
    dimensions: '18 x 23',
    areaSqFt: 410,
    priceFormatted: 'PKR 2.00 Crore',
    downPaymentFormatted: 'PKR 50.2 Lacs',
    quarterlyInstallmentFormatted: 'PKR 9.4 Lacs',
    status: 'Available',
    facing: 'Fashion Walkway Promenade',
    features: ['National Brand Anchor Zone', 'Spacious Changing Cubicle Area', 'Wide Glass Front', 'High Daily Footfall'],
    description: 'Spacious retail outlet on 2nd floor fashion corridor. Surrounding tenants include top Pakistani pret and lawn fashion houses.',
    image: '/images/faisalarc (1).webp'
  },
  // 7. 3rd Floor Tech & Electronics Showroom
  {
    id: 'fj-shop-3f07',
    unitNumber: 'FJ-3F-07',
    category: 'Commercial Shop',
    floorLevel: '3rd Floor (Electronics & IT Hub)',
    dimensions: '16 x 23',
    areaSqFt: 365,
    priceFormatted: 'PKR 1.78 Crore',
    downPaymentFormatted: 'PKR 44.7 Lacs',
    quarterlyInstallmentFormatted: 'PKR 8.3 Lacs',
    status: 'Hot Investment',
    facing: 'IT Plaza Escalator Corner',
    features: ['High-Speed Fiber Connectivity', 'Gadget Hub Corner', 'Dedicated Power Load', 'Smart POS Integration'],
    description: 'Prime retail cut on 3rd Floor Electronics & Gadget Hub. Ideal for smartphone franchises, gaming setups, and computer hardware stores.',
    image: '/images/faisalarc (3).jpg'
  },
  // 8. 4th Floor Food Court Kiosk
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
  // 9. 4th Floor Fine Dining Restaurant
  {
    id: 'fj-shop-4fr01',
    unitNumber: 'FJ-4F-R01',
    category: 'Food Court',
    floorLevel: '4th Floor (Rooftop Dining Terrace)',
    dimensions: '35 x 41',
    areaSqFt: 1450,
    priceFormatted: 'PKR 7.54 Crore',
    downPaymentFormatted: 'PKR 1.88 Crore',
    quarterlyInstallmentFormatted: 'PKR 35.3 Lacs',
    status: 'Limited Units',
    facing: 'Margalla Panoramic Open Terrace',
    features: ['Alfresco Open-Air Seating', 'Live BBQ & Buffet Station', 'Scenic Margalla Sunset Views', 'VIP Private Lounge'],
    description: 'Flagship fine-dining restaurant space with attached Margalla view outdoor terrace. Perfect for rooftop dining franchises.',
    image: '/images/faisalarc (2).webp'
  },
  // 10. 5th Floor Corporate Executive Office
  {
    id: 'fj-corp-5f',
    unitNumber: 'FJ-5F-08',
    category: 'Corporate Office',
    floorLevel: '5th Floor (Corporate Business Center)',
    dimensions: '24 x 28',
    areaSqFt: 680,
    priceFormatted: 'PKR 2.38 Crore',
    downPaymentFormatted: 'PKR 59.5 Lacs',
    quarterlyInstallmentFormatted: 'PKR 11.1 Lacs',
    status: 'Available',
    facing: 'Grand Boulevard & GT Road',
    features: ['Boardroom Access', 'Receptionist Lobby', 'High-Speed Fiber Optic', 'Corporate Prestigious Address'],
    description: 'Modern corporate office suite on 5th floor. Fully air-conditioned business atmosphere for software houses, law firms, and consulting agencies.',
    image: '/faisal-jewel-tower.jpg'
  },
  // 11. 1-Bed Executive Apartment
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
  // 12. 2-Bed Luxury Suite
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
  // 13. 3-Bed Sky Penthouse
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
  // 14. 4-Star Hotel Suite
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

export function FaisalJewelContent() {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState<boolean>(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [selectedUnitForInquiry, setSelectedUnitForInquiry] = useState<JewelUnitItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'mall' | 'apartments' | 'hotel' | 'amenities'>('overview');

  // Photo gallery slider
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryImages = [
    {
      url: '/faisal-jewel.jpg',
      title: 'Faisal Jewel 27-Storey Landmark Skyscraper',
      desc: 'Iconic architectural marvel rising above the entrance of Faisal Hills on GT Road'
    },
    {
      url: '/faisal-jewel-1.png',
      title: 'Grand Retail Atrium & Commercial Mall',
      desc: '6 floors of luxury retail, brand boutiques, jewelry court, and fine dining'
    },
    {
      url: '/faisal-jewel-2.png',
      title: 'Ultra-Luxury Serviced Apartments & Suites',
      desc: 'Executive 1, 2 & 3-Bed residences with panoramic views of the Margalla Hills'
    },
    {
      url: '/faisal-jewel-3.png',
      title: '3-Level Basement Parking & Smart Infrastructure',
      desc: '1,000+ car parking facility with ANPR, EV charging, and high-speed elevators'
    },
    {
      url: '/faisal-jewel-sketch.jpg',
      title: 'Architectural Elevation & Structural Blueprint',
      desc: 'Earthquake-resistant RCC framed engineering by CAM Construction & Zedem Properties'
    },
    {
      url: '/images/imgi_175_faisal-jewel.jpg',
      title: 'Evening Skyline & Illumination Concept',
      desc: 'Modern LED facade lighting illuminating the twin cities growth corridor'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  // Filtered unit listings
  const filteredUnits = useMemo(() => {
    if (selectedCategoryFilter === 'All') return defaultJewelUnits;
    return defaultJewelUnits.filter((u) => u.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase()));
  }, [selectedCategoryFilter]);

  // Block FAQs
  const jewelBlockData = blocksData.find((b) => b.slug === 'faisal-jewel-islamabad');
  const jewelFaqs = jewelBlockData?.faqs || [
    {
      question: 'What is Faisal Jewel Islamabad?',
      answer: 'Faisal Jewel Islamabad is a landmark 27-story mixed-use skyscraper in Faisal Hills. It features 6 commercial shopping mall floors (350+ shops), 18 residential apartment floors (250+ units), a 4-star boutique hotel, rooftop infinity pool, and 3 basement parking levels for 1,000+ cars.'
    },
    {
      question: 'Where is Faisal Jewel located?',
      answer: 'Faisal Jewel is situated at the main grand entrance of Faisal Hills on GT Road (N-5), directly at the crossroads of Margalla Avenue and the M-1 Motorway Interchange. It is 30 minutes from Islamabad Airport and Blue Area.'
    },
    {
      question: 'What is the payment plan for Faisal Jewel?',
      answer: 'Faisal Jewel offers an easy 4-year installment plan (16 quarterly installments) with 20–25% down payment at booking. Possession is targeted for Q4 2027.'
    },
    {
      question: 'What amenities are included in Faisal Jewel?',
      answer: 'Amenities include a panoramic rooftop infinity pool, sky gym & fitness club, 6-floor retail mall, fine dining restaurants, 3-level basement parking with EV chargers, 24/7 biometric security, high-speed capsule elevators, and uninterrupted power backup.'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">

      {/* ========================================================= */}
      {/* 1. FAISAL JEWEL TOWER OVERVIEW & ARCHITECTURAL VISION     */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative with Read More toggle */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-3">
                <TextReveal
                  as="h1"
                  text="Faisal Jewel Islamabad — Landmark 27-Storey Skyscraper & Luxury Destination"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
                  staggerDelay={65}
                  direction="left"
                />

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
                  Faisal Jewel is the flagship crown jewel of Faisal Hills Islamabad. Soaring 27 storeys into the Margalla skyline, this iconic mixed-use skyscraper combines an ultra-modern 6-floor commercial shopping mall, 250+ luxury serviced residences, a 4-star boutique hotel, panoramic rooftop dining, and 3 levels of subterranean parking for over 1,000 vehicles.
                </p>

                {isSeeMoreOpen ? (
                  <div className="space-y-4 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed font-sans animate-in fade-in duration-500">
                    <p>
                      Developed as a prestigious joint venture between <strong>Zedem Properties Pvt. Ltd.</strong> and <strong>CAM Construction</strong>, Faisal Jewel redefines vertical luxury. Strategically situated at the main entry point on GT Road (N-5) with direct connectivity to Margalla Avenue and the M-1 Motorway, it captures the highest retail footfall and offers unmatched capital appreciation.
                    </p>
                    <p>
                      Residents and shoppers enjoy world-class infrastructure including high-speed smart elevators, double-glazed energy-efficient facades, 24/7 biometric access, uninterrupted backup generators, a state-of-the-art panoramic fitness center, and a rooftop infinity swimming pool overlooking the lush Margalla range.
                    </p>
                    <p>
                      With prices starting from flexible 48-month installment schedules, Faisal Jewel delivers exceptional return on investment (10%–14% projected commercial and apartment rental yield) backed by 100% legal RDA compliance.
                    </p>
                  </div>
                ) : null}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSeeMoreOpen(!isSeeMoreOpen)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7b002c] hover:text-[#9e1245] transition-colors cursor-pointer"
                  >
                    <span>{isSeeMoreOpen ? 'See Less' : 'Read Full Overview & Vision'}</span>
                    {isSeeMoreOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Tower Quick Inquiry Desk */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden space-y-5 border border-slate-800">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#7b002c]/30 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-2 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-rose-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VIP Investor Desk</span>
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  Invest in Faisal Jewel Islamabad
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  Book commercial shops or luxury apartments on easy 4-year installment plans with official rate cards and floor plans.
                </p>
              </div>

              <div className="space-y-2.5 relative z-10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>27 Storeys with 350+ Shops & 250+ Luxury Apartments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3-Level Basement Parking for 1,000+ Vehicles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Target Handover Q4 2027 by Zedem & CAM Construction</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 relative z-10">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all text-center cursor-pointer"
                >
                  Request Rate Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Floor Plans PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PHOTO GALLERY CAROUSEL                                 */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Skyscraper Architectural Gallery</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
                Faisal Jewel Elevation & Visual Renders
              </h2>
            </div>
            <span className="text-xs text-slate-600 font-medium">
              Slide {activeSlide + 1} of {galleryImages.length}
            </span>
          </div>
        </ScrollReveal>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/9] md:aspect-[21/9] bg-slate-950">
          <img
            src={galleryImages[activeSlide].url}
            alt={galleryImages[activeSlide].title}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

          {/* Caption Overlay */}
          <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 text-white">
            <div className="space-y-1.5 max-w-2xl">
              <span className="px-2.5 py-0.5 rounded-full bg-[#7b002c] text-white text-[11px] font-bold uppercase tracking-wider inline-block">
                Faisal Jewel Architecture
              </span>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
                {galleryImages[activeSlide].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 drop-shadow font-sans">
                {galleryImages[activeSlide].desc}
              </p>
            </div>

            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-2 shrink-0">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. KEY SKYSCRAPER BENCHMARKS & METRICS (COUNTUP)          */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">
                Quantitative Specifications
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Faisal Jewel Skyscraper Benchmarks
              </h2>
            </div>
            <span className="text-xs text-slate-650 hidden sm:inline-block font-sans">
              Verified Zedem & CAM Construction Specifications
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center space-y-1 group">
            <div className="w-10 h-10 mx-auto rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
              <CountUpNumber end={27} duration={2000} />
            </div>
            <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">Total Storeys</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center space-y-1 group">
            <div className="w-10 h-10 mx-auto rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
              <CountUpNumber end={350} duration={2200} suffix="+" />
            </div>
            <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">Retail Shops</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center space-y-1 group">
            <div className="w-10 h-10 mx-auto rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center font-bold">
              <Home className="w-5 h-5" />
            </div>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
              <CountUpNumber end={250} duration={2100} suffix="+" />
            </div>
            <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">Apartments</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center space-y-1 group">
            <div className="w-10 h-10 mx-auto rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
              <CountUpNumber end={1000} duration={2400} suffix="+" />
            </div>
            <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">Car Parking</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center space-y-1 group">
            <div className="w-10 h-10 mx-auto rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center font-bold">
              <Hotel className="w-5 h-5" />
            </div>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
              4<span className="text-amber-500 text-lg">★</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">Hotel Suites</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all text-center space-y-1 group">
            <div className="w-10 h-10 mx-auto rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
              <CountUpNumber end={14} duration={1800} suffix="%" />
            </div>
            <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">Annual Yield</p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SIGNATURE LIFESTYLE & AMENITIES (WITH IMAGES)         */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Skyscraper Experience</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              World-Class Amenities & Vertical Infrastructure
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-4xl leading-relaxed">
              Every floor of Faisal Jewel is engineered to deliver unmatched luxury, convenience, and security. Explore key lifestyle amenities featuring high-end images:
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Grid Cards: Gym, Shops, Parking, Hotel/Rooftop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: 6-Floor Commercial Mall & Shops */}
          <ScrollReveal direction="up" delay={100}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden h-full flex flex-col justify-between group">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src="/images/faisalarc (1).webp"
                    alt="Faisal Jewel Commercial Retail Shops & Shopping Mall"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7b002c] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      <ShoppingBag className="w-3 h-3" />
                      <span>6 Floors</span>
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-rose-300 uppercase block font-mono">350+ Brand Outlets</span>
                    <h4 className="font-serif font-bold text-base text-white">Mega Shopping Mall</h4>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    Commercial Retail Shops & Food Court
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Six levels of air-conditioned luxury retail including jewelry souks, national fashion brands, banks, electronics, and multi-cuisine food courts.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="p-2.5 bg-rose-50/50 rounded-xl border border-rose-100 text-[11px] text-[#7b002c] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7b002c] shrink-0" />
                  <span>High-speed escalators & double-height ceilings</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: State-of-the-Art Panoramic Sky Gym */}
          <ScrollReveal direction="up" delay={150}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden h-full flex flex-col justify-between group">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src="/images/imgi_48_sports-arena.webp"
                    alt="Faisal Jewel Panoramic Sky Gym & Fitness Club"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      <Dumbbell className="w-3 h-3" />
                      <span>Sky Gym</span>
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-amber-300 uppercase block font-mono">Margalla View Fitness</span>
                    <h4 className="font-serif font-bold text-base text-white">Health & Wellness Club</h4>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    State-of-the-Art Panoramic Gym
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Fully equipped multi-tier fitness club featuring imported cardio machines, free weights, sauna, steam rooms, and yoga studios overlooking Margalla.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100 text-[11px] text-amber-800 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Certified trainers, spa & recovery lounge</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: 3-Level Basement Parking (1,000+ Cars) */}
          <ScrollReveal direction="up" delay={200}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden h-full flex flex-col justify-between group">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src="/faisal-jewel-3.png"
                    alt="Faisal Jewel 3-Level Underground Smart Basement Parking"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      <Car className="w-3 h-3" />
                      <span>1,000+ Cars</span>
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-sky-300 uppercase block font-mono">B1, B2 & B3 Levels</span>
                    <h4 className="font-serif font-bold text-base text-white">Smart Basement Parking</h4>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    3-Level Underground Parking
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Three spacious subterranean levels with Automated Number Plate Recognition (ANPR), LED vacancy indicators, EV charging, and 24/7 security cameras.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] text-blue-800 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Direct elevator access to all apartment & retail floors</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: 4-Star Hotel, Infinity Pool & Dining */}
          <ScrollReveal direction="up" delay={250}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden h-full flex flex-col justify-between group">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src="/images/faisalarc (2).webp"
                    alt="Faisal Jewel 4-Star Hotel, Rooftop Infinity Pool & Fine Dining"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      <Hotel className="w-3 h-3" />
                      <span>4-Star Hotel</span>
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-emerald-300 uppercase block font-mono">Floors 22–27</span>
                    <h4 className="font-serif font-bold text-base text-white">Hotel & Rooftop Lounge</h4>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    4-Star Hotel & Rooftop Pool
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Boutique hospitality experience with rooftop infinity pool, 24/7 concierge, executive boardroom suites, and Margalla mountain dining terraces.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Managed rental pool with high cash returns</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. VERTICAL FLOOR DISTRIBUTION MATRIX                     */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">
              Architectural Zoning
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Floor-by-Floor Master Distribution
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
              Comprehensive 27-storey vertical zoning map separating retail, corporate, residential, and hospitality levels:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 uppercase font-mono">Basement 1, 2 & 3</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">1,000+ Cars</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">3-Level Smart Basement Parking</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Automated barrier gates with RFID / ANPR recognition, separate residential and visitor parking bays, EV charging stations, and direct lift lobbies.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase font-mono">Lower Ground – 4th Floor</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold">350+ Shops</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">6 Commercial Shopping Floors</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Air-conditioned central atrium shopping mall, national retail brands, gold & diamond souk, banking square, and multi-cuisine 4th floor food court.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 uppercase font-mono">5th – 6th Floor</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold">Corporate</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Corporate Offices & Business Center</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              State-of-the-art corporate office suites, conference facilities, co-working pods, executive business lounges, and high-speed fiber internet.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 uppercase font-mono">7th – 21st Floor</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold">250+ Flats</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Luxury Serviced 1, 2 & 3-Bed Residences</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Executive 1-Bed suites (929 sq.ft.), spacious 2-Bed apartments (1,575 sq.ft.), and 3-Bed penthouses (3,226 sq.ft.) with smart automation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 uppercase font-mono">22nd – 25th Floor</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[10px] font-bold">4-Star</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">4-Star International Hotel Wing</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Managed hotel suites with 24/7 concierge, housekeeping, room service, executive lounge, and rental pool revenue distribution.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 uppercase font-mono">26th – 27th Floor</span>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 text-[10px] font-bold">Rooftop</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Infinity Pool & Margalla Sky Dining</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Temperature-controlled infinity swimming pool, sky fitness gym, open-air alfresco barbecue terraces, and 360-degree Margalla observation deck.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. FILTERABLE UNIT INVENTORY & PRICING                    */}
      {/* ========================================================= */}
      <section id="inventory" className="scroll-mt-28 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>Verified Inventory</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Faisal Jewel Commercial Shops & Apartments
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl">
                Browse official unit cuts in Faisal Jewel. Click image or details to view specifications, floor plans, and installment schedules.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'Commercial Shop', 'Food Court', 'Corporate Office', '1-Bed', '2-Bed', '3-Bed', 'Hotel'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategoryFilter === cat
                      ? 'bg-[#7b002c] text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'Commercial Shop' ? 'Shops for Sale' : cat === 'Hotel' ? '4-Star Hotel Suites' : cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Unit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo Banner with Zoom on Hover */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={unit.image}
                    alt={`${unit.category} - ${unit.unitNumber}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                    onClick={() => {
                      setSelectedUnitForInquiry(unit);
                      setIsLeadModalOpen(true);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#7b002c] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      {unit.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      {unit.status}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white z-10 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-300 uppercase block font-mono">
                        {unit.floorLevel}
                      </span>
                      <h4 className="font-serif font-bold text-base text-white">
                        {unit.unitNumber} ({unit.areaSqFt} Sq.Ft.)
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-slate-200 bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                      {unit.dimensions}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="text-[10px] text-slate-650 uppercase font-semibold block">Total Price</span>
                      <span className="font-serif font-bold text-lg text-[#7b002c]">{unit.priceFormatted}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-650 uppercase font-semibold block">25% Booking</span>
                      <span className="font-sans font-bold text-xs text-slate-800">{unit.downPaymentFormatted}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {unit.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {unit.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] text-slate-700 font-medium"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUnitForInquiry(unit);
                    setIsLeadModalOpen(true);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md cursor-pointer flex items-center justify-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Inquire Now</span>
                </button>
                <a
                  href={`https://wa.me/923044811717?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(unit.category)}%20${unit.unitNumber}%20(${unit.areaSqFt}%20sqft)%20in%20Faisal%20Jewel%20Islamabad.%20Please%20share%20payment%20plan%20and%20floor%20layout.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. COMMERCIAL SHOPS FOR SALE FLOOR DIRECTORY & SPECS      */}
      {/* ========================================================= */}
      <section className="space-y-10">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Commercial Shops For Sale</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Commercial Shops Directory Across 6 Retail Mall Floors
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-4xl leading-relaxed">
              Faisal Jewel features 350+ commercial shops zoned across six specialized levels. Explore floor-by-floor specifications, rates, and business categories with alternating image layouts:
            </p>
          </div>
        </ScrollReveal>

        {/* Alternating Floor Rows */}
        <div className="space-y-8">

          {/* Floor 1: Lower Ground (Image LEFT, Content RIGHT) */}
          <ScrollReveal direction="up" delay={100}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row group">
              {/* Image Left */}
              <div className="lg:w-1/2 relative h-64 sm:h-72 lg:h-auto min-h-[280px] overflow-hidden bg-slate-950">
                <img
                  src="/images/commercial/hypermarket.jpg"
                  alt="Faisal Jewel Lower Ground Hypermarket & Convenience Anchor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#7b002c] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Lower Ground Floor
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block font-mono">
                    Direct Lift & Escalator Concourse
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">
                    Hypermarket & Daily Grocery Anchor
                  </h4>
                </div>
              </div>

              {/* Content Right */}
              <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider font-mono">
                      Rate: PKR 52,000 / Sq.Ft.
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                      16 Quarterly Installments (48 Mo)
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    Hypermarket & Daily Convenience Anchor
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    Directly connected to 3-level basement parking lifts and central escalators. Engineered for heavy daily footfall with wide shopping avenues. Ideal for large grocery supermarkets, pharmacies, optical stores, bakeries, and day-to-day essentials.
                  </p>

                  {/* Feature Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Sizes: 153 to 2,683 Sq.Ft.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>25% Booking from PKR 20.4 Lacs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Dedicated Cargo & Loading Bays</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>High Tenant Rental Retention</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnitForInquiry(defaultJewelUnits[3]);
                      setIsLeadModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Inquire Lower Ground Shop</span>
                  </button>
                  <a
                    href="https://wa.me/923044811717?text=Hello%2C%20I%20am%20interested%20in%20Lower%20Ground%20Floor%20commercial%20shops%20for%20sale%20in%20Faisal%20Jewel%20Islamabad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Floor 2: Ground Floor (Content LEFT, Image RIGHT) */}
          <ScrollReveal direction="up" delay={150}>
            <div className="bg-white rounded-3xl border border-[#7b002c]/30 shadow-2xs hover:shadow-xl hover:border-[#7b002c] transition-all duration-300 overflow-hidden flex flex-col lg:flex-row-reverse group">
              {/* Image Right */}
              <div className="lg:w-1/2 relative h-64 sm:h-72 lg:h-auto min-h-[280px] overflow-hidden bg-slate-950">
                <img
                  src="/images/commercial/flagship-store.jpg"
                  alt="Faisal Jewel Ground Floor High-Street Luxury Flagship Stores"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#7b002c] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Ground Floor (Flagship)
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block font-mono">
                    Main Boulevard Frontage
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">
                    High-Street Luxury Brands & Banking
                  </h4>
                </div>
              </div>

              {/* Content Left */}
              <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider font-mono">
                      Rate: PKR 57,000 / Sq.Ft.
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#7b002c] text-xs font-bold">
                      Flagship Entrance Cut
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    High-Street Luxury Brands & Banking Square
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    The highest-value commercial zone in the entire development. Features soaring 14ft double-height ceilings, seamless glass frontage, and direct visibility from the Grand Entrance Boulevard. Reserved for tier-1 national and international retail brands and commercial banks.
                  </p>

                  {/* Feature Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Sizes: 169 to 765 Sq.Ft.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>25% Booking from PKR 24.6 Lacs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>14ft High Display Facades</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Highest Capital Value Appreciation</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnitForInquiry(defaultJewelUnits[0]);
                      setIsLeadModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Inquire Ground Floor Shop</span>
                  </button>
                  <a
                    href="https://wa.me/923044811717?text=Hello%2C%20I%20am%20interested%20in%20Ground%20Floor%20flagship%20commercial%20shops%20in%20Faisal%20Jewel%20Islamabad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Floor 3: 1st Floor (Image LEFT, Content RIGHT) */}
          <ScrollReveal direction="up" delay={200}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row group">
              {/* Image Left */}
              <div className="lg:w-1/2 relative h-64 sm:h-72 lg:h-auto min-h-[280px] overflow-hidden bg-slate-950">
                <img
                  src="/images/commercial/jewelry-souk.jpg"
                  alt="Faisal Jewel 1st Floor Gold, Diamond & Jewelry Souk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    1st Floor
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block font-mono">
                    High Security Galleria
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">
                    Gold, Diamond & Luxury Jewelry Souk
                  </h4>
                </div>
              </div>

              {/* Content Right */}
              <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider font-mono">
                      Rate: PKR 52,000 / Sq.Ft.
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
                      Specialized Jewelry Court
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    Gold, Diamond & Bridal Jewelry Galleria
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    A dedicated luxury zone designed exclusively for gold jewelers, diamond merchants, bridal couture accessories, and Swiss watchmakers. Features reinforced perimeter security, safe vaults, and specialized architectural lighting.
                  </p>

                  {/* Feature Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Sizes: 169 to 842 Sq.Ft.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>25% Booking from PKR 22.4 Lacs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Bulletproof Glass & Vault Conduits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>24/7 Dedicated CCTV Surveillance</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnitForInquiry(defaultJewelUnits[4]);
                      setIsLeadModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Inquire Jewelry Shop</span>
                  </button>
                  <a
                    href="https://wa.me/923044811717?text=Hello%2C%20I%20am%20interested%20in%201st%20Floor%20Gold%20and%20Jewelry%20shops%20in%20Faisal%20Jewel%20Islamabad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Floor 4: 2nd Floor (Content LEFT, Image RIGHT) */}
          <ScrollReveal direction="up" delay={250}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row-reverse group">
              {/* Image Right */}
              <div className="lg:w-1/2 relative h-64 sm:h-72 lg:h-auto min-h-[280px] overflow-hidden bg-slate-950">
                <img
                  src="/images/commercial/fashion-pret.jpg"
                  alt="Faisal Jewel 2nd Floor Fashion Pret & Apparel Galleria"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    2nd Floor
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block font-mono">
                    Fashion & Lifestyle Galleria
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">
                    Fashion Pret, Footwear & Cosmetics
                  </h4>
                </div>
              </div>

              {/* Content Left */}
              <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider font-mono">
                      Rate: PKR 49,000 / Sq.Ft.
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-xs font-bold">
                      Fashion Hub
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    Fashion Pret, Designer Lawn & Cosmetics
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    The lifestyle center of the mall. Housing premier Pakistani pret brands, unstitched luxury lawn, men formal suiting, footwear chains, perfume kiosks, and cosmetics. Wide pedestrian aisles encourage long shopping dwell times.
                  </p>

                  {/* Feature Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Sizes: 169 to 1,990 Sq.Ft.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>25% Booking from PKR 21.2 Lacs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Wide Promenade Corridors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>High Weekend Family Footfall</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnitForInquiry(defaultJewelUnits[5]);
                      setIsLeadModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Inquire Fashion Shop</span>
                  </button>
                  <a
                    href="https://wa.me/923044811717?text=Hello%2C%20I%20am%20interested%20in%202nd%20Floor%20fashion%20pret%20shops%20in%20Faisal%20Jewel%20Islamabad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Floor 5: 3rd Floor (Image LEFT, Content RIGHT) */}
          <ScrollReveal direction="up" delay={300}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row group">
              {/* Image Left */}
              <div className="lg:w-1/2 relative h-64 sm:h-72 lg:h-auto min-h-[280px] overflow-hidden bg-slate-950">
                <img
                  src="/images/commercial/tech-gadgets.jpg"
                  alt="Faisal Jewel 3rd Floor IT, Electronics & Mobile Tech Galleria"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    3rd Floor
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block font-mono">
                    Digital & Smart Tech Hub
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">
                    IT, Electronics & Mobile Galleria
                  </h4>
                </div>
              </div>

              {/* Content Right */}
              <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider font-mono">
                      Rate: PKR 49,000 / Sq.Ft.
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-xs font-bold">
                      Electronics & IT Zone
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    IT, Electronics & Mobile Phone Galleria
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    The tech destination for twin cities shoppers. Features smartphone official brand stores, laptop and computing hubs, gaming setups, VR lounges, home theater systems, and electronic appliances with high-speed fiber infrastructure.
                  </p>

                  {/* Feature Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Sizes: 169 to 1,279 Sq.Ft.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>25% Booking from PKR 21.2 Lacs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>High-Speed Fiber & Smart POS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>High Youth & University Engagement</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnitForInquiry(defaultJewelUnits[6]);
                      setIsLeadModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Inquire Electronics Shop</span>
                  </button>
                  <a
                    href="https://wa.me/923044811717?text=Hello%2C%20I%20am%20interested%20in%203rd%20Floor%20electronics%20and%20mobile%20shops%20in%20Faisal%20Jewel%20Islamabad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Floor 6: 4th Floor (Content LEFT, Image RIGHT) */}
          <ScrollReveal direction="up" delay={350}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row-reverse group">
              {/* Image Right */}
              <div className="lg:w-1/2 relative h-64 sm:h-72 lg:h-auto min-h-[280px] overflow-hidden bg-slate-950">
                <img
                  src="/images/commercial/food-court.jpg"
                  alt="Faisal Jewel 4th Floor Mega Food Court & Margalla Open Dining Terraces"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    4th Floor
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block font-mono">
                    Open Margalla Dining Terrace
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white">
                    500-Seat Mega Food Court & Fine Dining
                  </h4>
                </div>
              </div>

              {/* Content Left */}
              <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider font-mono">
                      Rate: PKR 52,000 / Sq.Ft.
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                      Food & Beverages
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-[#7b002c] transition-colors">
                    500-Seat Mega Food Court & Rooftop Terraces
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    A vibrant culinary paradise featuring international fast-food giants, traditional Pakistani live barbecue grills, artisanal coffee houses, and an expansive open-air outdoor terrace with unobstructed Margalla mountain views. Equipped with heavy-duty kitchen exhaust and gas lines.
                  </p>

                  {/* Feature Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kiosks & Restaurants: 180 to 2,200 Sq.Ft.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Commercial Gas & High-Capacity Exhaust</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Alfresco Margalla Sunset Seating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Consistent High Cash Turnover</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnitForInquiry(defaultJewelUnits[7]);
                      setIsLeadModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Inquire Food Court Unit</span>
                  </button>
                  <a
                    href="https://wa.me/923044811717?text=Hello%2C%20I%20am%20interested%20in%204th%20Floor%20food%20court%20and%20restaurant%20spaces%20in%20Faisal%20Jewel%20Islamabad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. OFFICIAL 4-YEAR INSTALLMENT SCHEDULE TABLES            */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Financial Plans</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Faisal Jewel 4-Year Payment Plan Schedule
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-4xl leading-relaxed">
              Official rates for Commercial Shops (Lower Ground to 4th Floor) and Luxury Serviced Apartments (6th to 19th Floor) spread over 16 quarterly installments:
            </p>
          </div>
        </ScrollReveal>

        {/* Commercial Shops Price Schedule Table */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-200 pb-2">
            Commercial Shops Rate Schedule (6 Retail Floors)
          </h3>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                  <tr>
                    <th className="p-3.5 whitespace-nowrap">Floor Level</th>
                    <th className="p-3.5 whitespace-nowrap">Rate / Sq.Ft.</th>
                    <th className="p-3.5 whitespace-nowrap">Area Range (Sq.Ft.)</th>
                    <th className="p-3.5 whitespace-nowrap">25% Booking Range</th>
                    <th className="p-3.5 whitespace-nowrap">Total Price Range</th>
                    <th className="p-3.5 whitespace-nowrap">Installments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {faisalJewelCommercialPlans.map((plan, idx) => (
                    <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">{plan.floor}</td>
                      <td className="p-3.5 font-mono text-[#7b002c] font-bold whitespace-nowrap">PKR {plan.ratePerSqFtFormatted}</td>
                      <td className="p-3.5 whitespace-nowrap">{plan.areaMin} – {plan.areaMax} Sq.Ft.</td>
                      <td className="p-3.5 font-semibold text-slate-800 whitespace-nowrap">PKR {plan.downPaymentMinFormatted} – {plan.downPaymentMaxFormatted}</td>
                      <td className="p-3.5 font-bold text-emerald-700 whitespace-nowrap">PKR {plan.totalPriceMinFormatted} – {plan.totalPriceMaxFormatted}</td>
                      <td className="p-3.5 text-slate-500 whitespace-nowrap">16 Quarterly (4 Years)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Residential Apartments Price Schedule Table */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 border-b border-slate-200 pb-2">
            Luxury Apartments Rate Schedule (6th to 19th Floors)
          </h3>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                  <tr>
                    <th className="p-3.5 whitespace-nowrap">Category</th>
                    <th className="p-3.5 whitespace-nowrap">Floors</th>
                    <th className="p-3.5 whitespace-nowrap">Rate / Sq.Ft.</th>
                    <th className="p-3.5 whitespace-nowrap">Area Range</th>
                    <th className="p-3.5 whitespace-nowrap">25% Down Payment</th>
                    <th className="p-3.5 whitespace-nowrap">Total Price Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">1, 2 & 3-Bed Luxury Apartments</td>
                    <td className="p-3.5 whitespace-nowrap">{faisalJewelResidentialPlan.floor}</td>
                    <td className="p-3.5 font-mono text-[#7b002c] font-bold whitespace-nowrap">PKR {faisalJewelResidentialPlan.ratePerSqFtFormatted}</td>
                    <td className="p-3.5 whitespace-nowrap">{faisalJewelResidentialPlan.gfaMin} – {faisalJewelResidentialPlan.gfaMax} Sq.Ft.</td>
                    <td className="p-3.5 font-semibold text-slate-800 whitespace-nowrap">PKR {faisalJewelResidentialPlan.downPaymentMinFormatted} – {faisalJewelResidentialPlan.downPaymentMaxFormatted}</td>
                    <td className="p-3.5 font-bold text-emerald-700 whitespace-nowrap">PKR {faisalJewelResidentialPlan.totalPriceMinFormatted} – {faisalJewelResidentialPlan.totalPriceMaxFormatted}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. CONSTRUCTION MILESTONES & DELIVERY STATUS              */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">
              Live Engineering Tracker
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Faisal Jewel Construction Progress
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
              Active structural updates by CAM Construction & Zedem Properties engineering teams:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">3 Basements & Foundation</span>
              <span className="text-xs font-bold text-emerald-600">100% Complete</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-full" />
            </div>
            <p className="text-[11px] text-slate-600 font-sans">
              Substructure deep piling, raft foundation, and 3 basement retaining walls 100% completed.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Commercial Mall Floors</span>
              <span className="text-xs font-bold text-emerald-600">100% Cast</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-full" />
            </div>
            <p className="text-[11px] text-slate-600 font-sans">
              Lower Ground to 4th Floor shopping mall slabs fully poured with MEP conduit piping.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Residential Superstructure</span>
              <span className="text-xs font-bold text-amber-600">65% Progress</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-[65%]" />
            </div>
            <p className="text-[11px] text-slate-600 font-sans">
              RCC slab casting active on Floor 14 with heavy tower crane and concrete placing booms.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Target Delivery</span>
              <span className="text-xs font-bold text-rose-700">Q4 2027</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-[#7b002c] h-full rounded-full w-[55%]" />
            </div>
            <p className="text-[11px] text-slate-600 font-sans">
              Projected completion and possession on track for Q4 2027 with turnkey fittings.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. TRAVEL TIMES & SURROUNDING CONNECTIVITY                */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">
              Location & Strategic Advantage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Travel Times & Key Hub Proximity
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
              Faisal Jewel sits at the junction of Margalla Avenue, GT Road, and the M-1 Motorway:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {faisalJewelsSurroundings.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
              <span className="text-[10px] font-bold text-[#7b002c] uppercase font-mono">Distance Point {item.id}</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">{item.name}</h4>
              <p className="text-xs text-slate-650 font-sans">{item.distance}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. EXPANDING SHOWCASE CAROUSEL (OTHER BLOCKS)            */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <ExpandingProjectsShowcase defaultActiveIndex={1} />
      </section>

      {/* ========================================================= */}
      {/* 11. FAQS ACCORDION SECTION (CENTERED)                     */}
      {/* ========================================================= */}
      <section id="faqs" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-5 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Jewel Skyscraper FAQs
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl">
            Clear answers regarding shop & apartment booking, construction progress, floor plans, and payment schedules.
          </p>
        </div>

        <FaqAccordion faqs={jewelFaqs} blockName="Faisal Jewel" />
      </section>

      {/* Map / Floor Plan Download Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        blockName="Faisal Jewel Skyscraper"
      />

      {/* Lead Inquiry Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setSelectedUnitForInquiry(null);
        }}
        defaultBlock="Faisal Jewel"
        defaultPlot={selectedUnitForInquiry ? `${selectedUnitForInquiry.category} - ${selectedUnitForInquiry.unitNumber}` : undefined}
        interest={selectedUnitForInquiry ? `${selectedUnitForInquiry.category} (${selectedUnitForInquiry.areaSqFt} Sq.Ft.) in Faisal Jewel` : 'Faisal Jewel Skyscraper Investment'}
      />
    </div>
  );
}

export default FaisalJewelContent;
