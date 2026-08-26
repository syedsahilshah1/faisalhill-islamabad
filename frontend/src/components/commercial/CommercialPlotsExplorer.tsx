'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Filter,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Maximize2,
  X,
  PhoneCall,
  MessageSquare,
  BadgeCheck,
  Compass,
  FileSpreadsheet,
  Coins,
  Store,
  Grid,
  List,
  Eye,
  Percent,
  Check
} from 'lucide-react';

export interface CommercialPlotDetail {
  id: string;
  plotNumber: string;
  title: string;
  blockSlug: string;
  blockName: string;
  category: 'Boulevard Plaza' | 'Sector Commercial' | 'Civic Center' | 'High-Rise Corporate' | 'Retail Outlet';
  sizeMarla: number;
  sizeLabel: string;
  dimensions: string; // e.g. "40 x 45 (200 Sq. Yds)"
  roadWidth: string; // e.g. "225ft Grand Boulevard"
  facing: string; // e.g. "Corner + Main Boulevard"
  heightPermission: string; // e.g. "Basement + Ground + 7 Floors (G+7)"
  pricePKR: number; // in PKR
  priceFormatted: string; // e.g. "PKR 4.80 Crore"
  priceRangeFormatted: string; // e.g. "PKR 4.5 Cr – 5.2 Cr"
  installmentAvailable: boolean;
  downPayment?: string;
  quarterlyInstallment?: string;
  tenure?: string;
  possessionStatus: 'Possession Ready' | 'On Installments' | 'Under Development' | 'Immediate Construction';
  roiEstimate: string; // e.g. "12% - 15% Annual Yield"
  capitalGrowth: string; // e.g. "+18.5% YoY"
  image: string;
  galleryImages: string[];
  features: string[];
  description: string;
  suitableFor: string[];
  badge?: string;
}

export const COMMERCIAL_PLOTS_INVENTORY: CommercialPlotDetail[] = [
  // 1. Executive Block - 8 Marla Boulevard Plaza
  {
    id: 'com-exe-01',
    plotNumber: 'EXE-COM-014',
    title: '8 Marla Main Grand Boulevard Commercial Plaza Plot',
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'Boulevard Plaza',
    sizeMarla: 8,
    sizeLabel: '8 Marla',
    dimensions: '40 × 45 ft (200 Sq. Yds)',
    roadWidth: '225ft Grand Entrance Boulevard',
    facing: 'Corner + Main Boulevard Facing',
    heightPermission: 'Basement + Ground + 8 Storeys (B+G+8)',
    pricePKR: 68000000,
    priceFormatted: 'PKR 6.80 Crore',
    priceRangeFormatted: 'PKR 6.5 Cr – 7.2 Cr',
    installmentAvailable: true,
    downPayment: 'PKR 1.70 Crore (25%)',
    quarterlyInstallment: 'PKR 42.5 Lacs (12 Quarters)',
    tenure: '3 Years Quarterly Plan',
    possessionStatus: 'Possession Ready',
    roiEstimate: '14.5% Annual Projected Yield',
    capitalGrowth: '+22.4% Capital Appreciation',
    image: '/images/commercial/flagship-store.jpg',
    galleryImages: [
      '/images/commercial/flagship-store.jpg',
      '/images/commercial/hypermarket.jpg',
      '/images/faisalhillexecutive.webp'
    ],
    features: [
      'Prime 225ft Boulevard Frontage with direct GT Road access',
      'Approved B+G+8 multi-storey building bylaws with dual lift shafts',
      'Underground 3-phase electricity, gas pipelines & high-speed fiber',
      'Direct walking distance from Faisal Hills Main Gate and Executive Clubhouse',
      'Wide designated dedicated front parking corridor (60ft apron)'
    ],
    description:
      'The crown jewel of Executive Block commercial activity. Located right on the 225ft Grand Boulevard capturing 100% of vehicular flow entering Faisal Hills. Perfect for high-visibility flagship corporate centers, banking halls, and luxury retail plazas.',
    suitableFor: [
      'Corporate Bank Headquarters',
      'Multi-Brand Fashion & Retail Store',
      'Executive Medical / Diagnostic Complex',
      'Software House / IT Workspace Floor'
    ],
    badge: 'Premium Hot Deal'
  },

  // 2. Executive Block - 5.33 Marla Plaza Plot
  {
    id: 'com-exe-02',
    plotNumber: 'EXE-COM-042',
    title: '5.33 Marla High-Footfall Commercial Plaza Plot',
    blockSlug: 'executive-block',
    blockName: 'Executive Block',
    category: 'Sector Commercial',
    sizeMarla: 5.33,
    sizeLabel: '5.33 Marla',
    dimensions: '40 × 30 ft (133 Sq. Yds)',
    roadWidth: '100ft Sector Commercial Avenue',
    facing: 'Main Boulevard & Faisal Jewel View',
    heightPermission: 'Basement + Ground + 5 Storeys (B+G+5)',
    pricePKR: 42000000,
    priceFormatted: 'PKR 4.20 Crore',
    priceRangeFormatted: 'PKR 3.9 Cr – 4.5 Cr',
    installmentAvailable: true,
    downPayment: 'PKR 1.05 Crore (25%)',
    quarterlyInstallment: 'PKR 26.25 Lacs (12 Quarters)',
    tenure: '3 Years Flexible Plan',
    possessionStatus: 'Possession Ready',
    roiEstimate: '13.2% Projected Rental Return',
    capitalGrowth: '+19.8% YoY Growth',
    image: '/images/commercial/tech-gadgets.jpg',
    galleryImages: [
      '/images/commercial/tech-gadgets.jpg',
      '/images/commercial/fashion-pret.jpg',
      '/images/imgi_44_Executive-Block.webp'
    ],
    features: [
      'Facing the iconic 27-storey Faisal Jewel development zone',
      'Immediate construction authorization with full on-ground possession',
      'Ideal 40ft frontage allowing 4 distinct ground-floor boutique shops',
      'Complete utility infrastructure with heavy backup grid compatibility',
      'High footfall zone adjacent to Roots International School'
    ],
    description:
      'An exceptional 5.33 Marla commercial plot tailored for modern 6-storey commercial plazas. Offers balanced capital expenditure and high ground-floor rental yields due to high pedestrian concentration from surrounding residential zones.',
    suitableFor: [
      'Pharmacies & Clinical Laboratories',
      'Fast-Food Franchises & Coffee Cafes',
      'Telecom & Electronics Megastore',
      'Consulting & Law Offices'
    ],
    badge: 'High Footfall'
  },

  // 3. Block A - 5 Marla Neighborhood Commercial
  {
    id: 'com-a-01',
    plotNumber: 'A-COM-108',
    title: '5 Marla Established Settled Sector Commercial Plot',
    blockSlug: 'block-a',
    blockName: 'Block A',
    category: 'Sector Commercial',
    sizeMarla: 5,
    sizeLabel: '5 Marla',
    dimensions: '30 × 37.5 ft (125 Sq. Yds)',
    roadWidth: '80ft Main Sector Boulevard',
    facing: 'Park Facing + Dual Side Open',
    heightPermission: 'Basement + Ground + 4 Storeys (B+G+4)',
    pricePKR: 28500000,
    priceFormatted: 'PKR 2.85 Crore',
    priceRangeFormatted: 'PKR 2.6 Cr – 3.1 Cr',
    installmentAvailable: false,
    downPayment: '100% Cash / Society Transfer',
    tenure: 'Immediate Registry & Allotment',
    possessionStatus: 'Immediate Construction',
    roiEstimate: '15.0% Guaranteed Active Demand',
    capitalGrowth: '+16.5% Annual Appreciation',
    image: '/images/commercial/hypermarket.jpg',
    galleryImages: [
      '/images/commercial/hypermarket.jpg',
      '/images/commercial/food-court.jpg',
      '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
    ],
    features: [
      'Surrounded by 1,200+ fully settled resident families',
      'Corner plot with dual street frontage maximizing shopfront exposure',
      'Walking distance from Block A Jamia Mosque and Central Park',
      'Immediate cash-flowing asset upon construction completion',
      'Approved RDA building plans ready for instant submission'
    ],
    description:
      'Block A is the most densely populated residential sector in Faisal Hills. This 5 Marla commercial plot guarantees immediate daily customer traffic for grocery supermarkets, bakeries, medical clinics, and daily utility businesses.',
    suitableFor: [
      'Departmental Grocery Store / Mart',
      'Bakery & Sweets Flagship',
      'Medical & Dental Clinic Plaza',
      'Co-Working & Tuition Center'
    ],
    badge: 'Immediate Cash Flow'
  },

  // 4. Block C - 10 Marla Central Commercial Mega Hub
  {
    id: 'com-c-01',
    plotNumber: 'C-COM-302',
    title: '10 Marla Civic Center Central Commercial Boulevard Plot',
    blockSlug: 'block-c',
    blockName: 'Block C',
    category: 'Civic Center',
    sizeMarla: 10,
    sizeLabel: '10 Marla',
    dimensions: '45 × 50 ft (250 Sq. Yds)',
    roadWidth: '150ft Central Expressway Boulevard',
    facing: 'Main Boulevard Frontage + Triple Open',
    heightPermission: 'Basement + Ground + 9 Storeys (B+G+9)',
    pricePKR: 85000000,
    priceFormatted: 'PKR 8.50 Crore',
    priceRangeFormatted: 'PKR 8.0 Cr – 9.2 Cr',
    installmentAvailable: true,
    downPayment: 'PKR 2.12 Crore (25%)',
    quarterlyInstallment: 'PKR 53.1 Lacs (12 Quarters)',
    tenure: '3 Years Quarterly Schedule',
    possessionStatus: 'Possession Ready',
    roiEstimate: '16.8% High-Rise Yield',
    capitalGrowth: '+25.0% Rapid Growth Zone',
    image: '/images/commercial/food-court.jpg',
    galleryImages: [
      '/images/commercial/food-court.jpg',
      '/images/commercial/flagship-store.jpg',
      '/images/faisal-jewel-tower.jpg'
    ],
    features: [
      'Heart of Block C Civic Center spanning over 800+ commercial units',
      'Approved for modern G+9 shopping mall and corporate tower',
      'Dedicated 80ft wide service road with extensive customer parking bays',
      'Close proximity to the planned central lake, monument, and stadium',
      '150ft express boulevard linking directly to Margalla Avenue extension'
    ],
    description:
      'Positioned at the epicenter of Faisal Hills Block C, this 10 Marla commercial plot is engineered for high-density multi-storey shopping centers, boutique hotel suites, upscale food courts, and rooftop fine-dining restaurants.',
    suitableFor: [
      'Multi-Level Shopping Plaza & Mall',
      'Rooftop Terrace Restaurant & Cafe',
      'Corporate Office Tower Floors',
      'Fitness Gym & Wellness Center'
    ],
    badge: 'Mega Civic Center'
  },

  // 5. Block C - 5 Marla High-Density Plaza Plot
  {
    id: 'com-c-02',
    plotNumber: 'C-COM-188',
    title: '5 Marla Fast-Track Commercial Plaza Plot',
    blockSlug: 'block-c',
    blockName: 'Block C',
    category: 'Sector Commercial',
    sizeMarla: 5,
    sizeLabel: '5 Marla',
    dimensions: '30 × 37.5 ft (125 Sq. Yds)',
    roadWidth: '100ft Sector Central Avenue',
    facing: 'Main Sector Boulevard Facing',
    heightPermission: 'Basement + Ground + 5 Storeys (B+G+5)',
    pricePKR: 31000000,
    priceFormatted: 'PKR 3.10 Crore',
    priceRangeFormatted: 'PKR 2.9 Cr – 3.4 Cr',
    installmentAvailable: true,
    downPayment: 'PKR 77.5 Lacs (25%)',
    quarterlyInstallment: 'PKR 19.37 Lacs (12 Quarters)',
    tenure: '3 Years Schedule',
    possessionStatus: 'Possession Ready',
    roiEstimate: '14.0% Projected Rental Yield',
    capitalGrowth: '+21.5% Value Multiplier',
    image: '/images/commercial/fashion-pret.jpg',
    galleryImages: [
      '/images/commercial/fashion-pret.jpg',
      '/images/commercial/tech-gadgets.jpg',
      '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg'
    ],
    features: [
      'Central location inside Block C commercial sector',
      'Clean rectangular plot with zero ground cutting required',
      'Direct connection to major 225ft boulevard arterial network',
      'High growth sector with ongoing heavy commercial construction',
      'Verified RDA approved clear land title'
    ],
    description:
      'A top-performing entry into Faisal Hills commercial real estate. Block C holds the largest commercial zone in the entire project, providing early investors substantial capital appreciation over the next 2-3 years.',
    suitableFor: [
      'Fashion Boutiques & Apparel Stores',
      'Hardware & Sanitary Showrooms',
      'Bakery & Dessert Parlour',
      'Executive Business Suites'
    ],
    badge: 'Top Investor Choice'
  },

  // 6. Block B - 8 Marla Margalla View Boulevard Commercial
  {
    id: 'com-b-01',
    plotNumber: 'B-COM-056',
    title: '8 Marla Margalla View Commercial Boulevard Plot',
    blockSlug: 'block-b',
    blockName: 'Block B',
    category: 'Boulevard Plaza',
    sizeMarla: 8,
    sizeLabel: '8 Marla',
    dimensions: '40 × 45 ft (200 Sq. Yds)',
    roadWidth: '120ft Scenic Margalla Boulevard',
    facing: 'Margalla Hill View + Main Boulevard',
    heightPermission: 'Basement + Ground + 6 Storeys (B+G+6)',
    pricePKR: 54000000,
    priceFormatted: 'PKR 5.40 Crore',
    priceRangeFormatted: 'PKR 5.1 Cr – 5.8 Cr',
    installmentAvailable: true,
    downPayment: 'PKR 1.35 Crore (25%)',
    quarterlyInstallment: 'PKR 33.75 Lacs (12 Quarters)',
    tenure: '3 Years Installment Schedule',
    possessionStatus: 'Possession Ready',
    roiEstimate: '13.8% Stable Rental Returns',
    capitalGrowth: '+18.0% Stable Growth',
    image: '/images/commercial/jewelry-souk.jpg',
    galleryImages: [
      '/images/commercial/jewelry-souk.jpg',
      '/images/commercial/flagship-store.jpg',
      '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg'
    ],
    features: [
      'Panoramic Margalla Hills background backdrop',
      'Facing 120ft wide double-lane commercial avenue',
      'Near Block B Central Park & Community Center',
      'Heavy vehicular route connecting Block A, B and C',
      'All underground civic utilities fully commissioned'
    ],
    description:
      'Block B offers an upscale, serene commercial setting with unobstructed views of the Margalla hills. Ideal for boutique luxury stores, high-end jewelry outlets, aesthetics clinics, and executive corporate offices.',
    suitableFor: [
      'Jewelry & Gold Souk Outlet',
      'Dermatology & Cosmetic Clinic',
      'Fine-Dining View Cafe & Bistro',
      'Architectural & Interior Design Studio'
    ],
    badge: 'Margalla View'
  },

  // 7. Prime Block - 5.33 Marla New Launch Commercial Plot
  {
    id: 'com-prm-01',
    plotNumber: 'PRM-COM-077',
    title: '5.33 Marla Prime Block Launch Commercial Plot',
    blockSlug: 'prime-block',
    blockName: 'Prime Block',
    category: 'Sector Commercial',
    sizeMarla: 5.33,
    sizeLabel: '5.33 Marla',
    dimensions: '40 × 30 ft (133 Sq. Yds)',
    roadWidth: '100ft Prime Avenue',
    facing: 'Corner Plot + Dual 60ft Boulevard',
    heightPermission: 'Basement + Ground + 5 Storeys (B+G+5)',
    pricePKR: 36000000,
    priceFormatted: 'PKR 3.60 Crore',
    priceRangeFormatted: 'PKR 3.4 Cr – 3.9 Cr',
    installmentAvailable: true,
    downPayment: 'PKR 72.0 Lacs (20%)',
    quarterlyInstallment: 'PKR 18.0 Lacs (16 Quarters)',
    tenure: '4 Years Extended Easy Installment Plan',
    possessionStatus: 'On Installments',
    roiEstimate: '18.0% Future Anticipated Yield',
    capitalGrowth: '+28.0% Projected Total Growth',
    image: '/images/commercial/flagship-store.jpg',
    galleryImages: [
      '/images/commercial/flagship-store.jpg',
      '/images/commercial/tech-gadgets.jpg',
      '/images/faisal-jewel-sketch.jpg'
    ],
    features: [
      'Brand new launch in the highly prestigious Prime Block',
      'Longest 4-year installment plan with lowest entry down payment',
      'Direct proximity to upcoming M-1 Motorway Interchange link',
      'Corner plot with maximum natural lighting and double facade signage',
      'Guaranteed high-capital appreciation during development cycle'
    ],
    description:
      'Prime Block is the latest gem of Faisal Hills. This 5.33 Marla commercial plot provides the most accessible entry payment plan, enabling investors to lock in introductory pre-possession prices with 4 full years of quarterly payments.',
    suitableFor: [
      'Long-Term Capital Investment File',
      'Upcoming Franchise Chain Branch',
      'Retail Electronics & Telecom Hub',
      'Commercial Rental Plaza Construction'
    ],
    badge: '4-Year Installments'
  },

  // 8. Block D - 5 Marla High-Value Accessible Commercial
  {
    id: 'com-d-01',
    plotNumber: 'D-COM-092',
    title: '5 Marla High-Yield Commercial Sector Plot',
    blockSlug: 'block-d',
    blockName: 'Block D',
    category: 'Sector Commercial',
    sizeMarla: 5,
    sizeLabel: '5 Marla',
    dimensions: '30 × 37.5 ft (125 Sq. Yds)',
    roadWidth: '80ft Sector Main Road',
    facing: 'Main Sector Road Frontage',
    heightPermission: 'Basement + Ground + 4 Storeys (B+G+4)',
    pricePKR: 24500000,
    priceFormatted: 'PKR 2.45 Crore',
    priceRangeFormatted: 'PKR 2.3 Cr – 2.7 Cr',
    installmentAvailable: true,
    downPayment: 'PKR 61.25 Lacs (25%)',
    quarterlyInstallment: 'PKR 15.31 Lacs (12 Quarters)',
    tenure: '3 Years Installment Plan',
    possessionStatus: 'Possession Ready',
    roiEstimate: '14.2% Estimated Yield',
    capitalGrowth: '+20.5% High Growth Rate',
    image: '/images/commercial/hypermarket.jpg',
    galleryImages: [
      '/images/commercial/hypermarket.jpg',
      '/images/commercial/food-court.jpg',
      '/images/imgi_45_Glow-garden.webp'
    ],
    features: [
      'Most economical entry price for on-ground commercial plots in Faisal Hills',
      'Possession officially granted with live construction started',
      'Close to Block D Glow Garden and Sports Complex',
      'Fast-growing residential density ensuring upcoming customer demand',
      'Full utility readiness including high-pressure water and grid electric'
    ],
    description:
      'Block D represents the ideal balance of affordable entry price and imminent possession. With rapid residential home construction taking place across Block D, commercial plot owners can expect rapid tenant demand.',
    suitableFor: [
      'Mini Supermarket & Cash-and-Carry',
      'Pharmacy & Health Clinic',
      'Hardware & Construction Supplies',
      'Neighborhood Dining & Takeaways'
    ],
    badge: 'Best Value'
  },

  // 9. Faisal Jewel - Luxury Skyscraper Commercial Retail Flagship
  {
    id: 'com-fj-01',
    plotNumber: 'FJ-TOWER-G09',
    title: 'Faisal Jewel 27-Storey Landmark Commercial Flagship Unit',
    blockSlug: 'faisal-jewel-islamabad',
    blockName: 'Faisal Jewel Tower',
    category: 'High-Rise Corporate',
    sizeMarla: 12,
    sizeLabel: '12 Marla High-Rise Space',
    dimensions: '1,850 Sq. Ft. Double-Height Showroom',
    roadWidth: '225ft Grand Entrance Boulevard',
    facing: 'Main Highway Boulevard + Atrium Facing',
    heightPermission: '27-Storey Approved Iconic Skyscraper',
    pricePKR: 115000000,
    priceFormatted: 'PKR 11.50 Crore',
    priceRangeFormatted: 'PKR 11.0 Cr – 12.5 Cr',
    installmentAvailable: true,
    downPayment: 'PKR 2.87 Crore (25%)',
    quarterlyInstallment: 'PKR 71.8 Lacs (12 Quarters)',
    tenure: '3 Years Milestone Linked Plan',
    possessionStatus: 'Under Development',
    roiEstimate: '18.5% Prime International Yield',
    capitalGrowth: '+32.0% Iconic Landmark Appreciation',
    image: '/faisal-jewel-tower.jpg',
    galleryImages: [
      '/faisal-jewel-tower.jpg',
      '/faisal-jewel-1.png',
      '/faisal-jewel-2.png',
      '/faisal-jewel-3.png'
    ],
    features: [
      'Situated in the tallest 27-storey skyscraper on the GT Road / Islamabad corridor',
      'Double-height glass facade showroom with massive visual impact from highway',
      'Integrated 5-level luxury shopping mall, food court & 5-star hotel apartments',
      'Central climate control, high-speed capsule elevators & 3 basement car parks',
      'International brand management and corporate facility management'
    ],
    description:
      'The definitive commercial landmark of the twin cities. Faisal Jewel is a 27-storey architectural marvel rising at the main entrance of Faisal Hills. Owning a commercial retail or corporate suite here places your business at the highest tier of prestige and footfall.',
    suitableFor: [
      'International Luxury Brand Flagship',
      'Multinational Corporate Headquarters',
      'Fine-Dining International Restaurant Chain',
      'High-Net-Worth Investment Asset'
    ],
    badge: '27-Storey Skyscraper'
  },

  // 10. Block C - 1 Kanal High-Rise Commercial Plot
  {
    id: 'com-c-03',
    plotNumber: 'C-COM-005',
    title: '1 Kanal High-Rise Commercial Mall Plot',
    blockSlug: 'block-c',
    blockName: 'Block C',
    category: 'Boulevard Plaza',
    sizeMarla: 20,
    sizeLabel: '1 Kanal (20 Marla)',
    dimensions: '50 × 90 ft (500 Sq. Yds)',
    roadWidth: '150ft Express Commercial Boulevard',
    facing: 'Corner + Triple Boulevard Frontage',
    heightPermission: 'Basement + Lower Ground + Ground + 9 Storeys (2B+G+9)',
    pricePKR: 155000000,
    priceFormatted: 'PKR 15.50 Crore',
    priceRangeFormatted: 'PKR 15.0 Cr – 16.5 Cr',
    installmentAvailable: true,
    downPayment: 'PKR 3.87 Crore (25%)',
    quarterlyInstallment: 'PKR 96.8 Lacs (12 Quarters)',
    tenure: '3 Years Payment Plan',
    possessionStatus: 'Possession Ready',
    roiEstimate: '17.5% High-Capacity Return',
    capitalGrowth: '+26.0% Institutional Asset',
    image: '/images/commercial/flagship-store.jpg',
    galleryImages: [
      '/images/commercial/flagship-store.jpg',
      '/images/commercial/food-court.jpg',
      '/images/faisal-jewel.jpg'
    ],
    features: [
      'Massive 500 Sq. Yds footprint allowing 50,000+ sq ft covered area',
      'Approved for dual basement parking plus 9 commercial/residential floors',
      'Corner location with unmatched visibility from three approach roads',
      'Direct adjacency to Block C Mega Civic Arena and Grand Mosque',
      'Full NOC compliance and ready for immediate high-rise groundbreaking'
    ],
    description:
      'A rare, institutional-grade 1 Kanal commercial plot in Block C. Designed for real estate developers and corporations seeking to construct a full-scale shopping mall, boutique hotel, or high-rise residential-commercial plaza with high monthly rental turnover.',
    suitableFor: [
      'Full-Scale Shopping Mall & Plaza',
      'Boutique Executive Hotel / Serviced Suites',
      'Private Hospital / Medical College Campus',
      'Corporate Headquarters Complex'
    ],
    badge: 'Mega 1 Kanal Plot'
  }
];

export const CommercialPlotsExplorer: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedPlotModal, setSelectedPlotModal] = useState<CommercialPlotDetail | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Filtered & Sorted Plots
  const filteredPlots = useMemo(() => {
    return COMMERCIAL_PLOTS_INVENTORY.filter((plot) => {
      // Block filter
      if (selectedBlock !== 'all' && plot.blockSlug !== selectedBlock) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'all') {
        if (selectedSize === '5-marla' && (plot.sizeMarla < 5 || plot.sizeMarla > 6)) return false;
        if (selectedSize === '8-marla' && plot.sizeMarla !== 8) return false;
        if (selectedSize === '10-marla' && plot.sizeMarla !== 10) return false;
        if (selectedSize === '12-plus' && plot.sizeMarla < 12) return false;
      }
      // Status filter
      if (selectedStatus !== 'all') {
        if (selectedStatus === 'possession' && plot.possessionStatus !== 'Possession Ready' && plot.possessionStatus !== 'Immediate Construction') return false;
        if (selectedStatus === 'installments' && !plot.installmentAvailable) return false;
        if (selectedStatus === 'hot-deal' && !plot.badge?.toLowerCase().includes('deal') && !plot.badge?.toLowerCase().includes('top') && !plot.badge?.toLowerCase().includes('mega')) return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches =
          plot.plotNumber.toLowerCase().includes(q) ||
          plot.title.toLowerCase().includes(q) ||
          plot.blockName.toLowerCase().includes(q) ||
          plot.roadWidth.toLowerCase().includes(q) ||
          plot.dimensions.toLowerCase().includes(q) ||
          plot.features.some((f) => f.toLowerCase().includes(q)) ||
          plot.suitableFor.some((s) => s.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
      if (sortBy === 'size-asc') return a.sizeMarla - b.sizeMarla;
      if (sortBy === 'size-desc') return b.sizeMarla - a.sizeMarla;
      return 0; // featured default order
    });
  }, [selectedBlock, selectedSize, selectedStatus, searchQuery, sortBy]);

  const handleOpenModal = (plot: CommercialPlotDetail) => {
    setSelectedPlotModal(plot);
    setActiveImageIdx(0);
  };

  const handleCloseModal = () => {
    setSelectedPlotModal(null);
  };

  return (
    <section id="commercial-plots-inventory" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span>Faisal Hills Verified Commercial Inventory 2026</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Faisal Hills Commercial Plots & Plazas Catalog
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl leading-relaxed">
            Browse complete on-ground and installment commercial plots across Executive Block, Block A, B, C, D, Prime Block, and Faisal Jewel. Inspect dimensions, road frontages, building height bylaws, live prices, and down payment schedules.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm shrink-0">
          <div className="px-4 py-2 bg-slate-50 rounded-xl text-center">
            <span className="block text-base font-bold text-[#7b002c]">{COMMERCIAL_PLOTS_INVENTORY.length}+</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Verified Plots</span>
          </div>
          <div className="px-4 py-2 bg-slate-50 rounded-xl text-center">
            <span className="block text-base font-bold text-emerald-600">G+4 to G+9</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Height Approved</span>
          </div>
          <div className="px-4 py-2 bg-slate-50 rounded-xl text-center">
            <span className="block text-base font-bold text-slate-900">225ft</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Max Boulevard</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        {/* Top Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="relative md:col-span-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by plot #, boulevard, block, or use..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7b002c] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Block Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              aria-label="Filter by Society Block"
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7b002c] focus:bg-white cursor-pointer"
            >
              <option value="all">🏢 All Blocks (Executive, A–D, Jewel)</option>
              <option value="executive-block">Executive Block (Main GT Entrance)</option>
              <option value="block-a">Block A (Settled Families Hub)</option>
              <option value="block-b">Block B (Margalla View Commercial)</option>
              <option value="block-c">Block C (800+ Commercial Hotspot)</option>
              <option value="block-d">Block D (Affordable Entry Plots)</option>
              <option value="prime-block">Prime Block (New 4-Year Installments)</option>
              <option value="faisal-jewel-islamabad">Faisal Jewel Tower (27-Storey)</option>
            </select>
          </div>

          {/* Size Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              aria-label="Filter by Plot Size"
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7b002c] focus:bg-white cursor-pointer"
            >
              <option value="all">📐 All Sizes</option>
              <option value="5-marla">4 – 5.33 Marla</option>
              <option value="8-marla">8 Marla Commercial</option>
              <option value="10-marla">10 Marla Plaza</option>
              <option value="12-plus">12 Marla & 1 Kanal</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter by Plot Status"
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7b002c] focus:bg-white cursor-pointer"
            >
              <option value="all">⚡ All Statuses</option>
              <option value="possession">Possession Ready</option>
              <option value="installments">On Installment Plan</option>
              <option value="hot-deal">Hot Deals & Corners</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="md:col-span-1 flex items-center justify-end gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-[#7b002c] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-[#7b002c] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Filter Tags / Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Filters:</span>
            {[
              { label: 'All Commercials', block: 'all', size: 'all' },
              { label: 'Executive 225ft Boulevard', block: 'executive-block', size: 'all' },
              { label: 'Block C Civic Plaza', block: 'block-c', size: 'all' },
              { label: '5.33 Marla Standard', block: 'all', size: '5-marla' },
              { label: '8 Marla Boulevard', block: 'all', size: '8-marla' },
              { label: 'Faisal Jewel Tower', block: 'faisal-jewel-islamabad', size: 'all' },
            ].map((chip, idx) => {
              const isActive = selectedBlock === chip.block && selectedSize === chip.size;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedBlock(chip.block);
                    setSelectedSize(chip.size);
                  }}
                  className={`text-xs px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#7b002c] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort plots"
              className="bg-transparent font-bold text-[#7b002c] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured / Best Return</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="size-asc">Size: Small to Large</option>
              <option value="size-desc">Size: Large to Small</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-sans px-1">
        <span>
          Showing <strong className="text-slate-900 font-bold">{filteredPlots.length}</strong> of{' '}
          <strong>{COMMERCIAL_PLOTS_INVENTORY.length}</strong> commercial plots & plazas
        </span>
        {(selectedBlock !== 'all' || selectedSize !== 'all' || selectedStatus !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedBlock('all');
              setSelectedSize('all');
              setSelectedStatus('all');
              setSearchQuery('');
            }}
            className="text-[#7b002c] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Reset all filters
          </button>
        )}
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPlots.map((plot) => (
            <div
              key={plot.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image Container with Badge */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <Image
                  src={plot.image}
                  alt={plot.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#7b002c] text-white shadow-md">
                    {plot.blockName}
                  </span>
                  {plot.badge && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-400 text-slate-950 shadow-md">
                      {plot.badge}
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Title & Plot Number */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-rose-300 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      #{plot.plotNumber}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {plot.possessionStatus}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {plot.title}
                  </h3>
                </div>
              </div>

              {/* Card Body Specs */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 text-xs font-sans">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Size & Dimensions</span>
                    <strong className="text-slate-800 font-bold block">{plot.sizeLabel}</strong>
                    <span className="text-[10px] text-slate-500">{plot.dimensions}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Road / Frontage</span>
                    <strong className="text-slate-800 font-bold block truncate">{plot.roadWidth}</strong>
                    <span className="text-[10px] text-slate-500 truncate block">{plot.facing}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Approved Height</span>
                    <strong className="text-slate-800 font-bold block truncate">{plot.heightPermission}</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">ROI Projection</span>
                    <strong className="text-emerald-600 font-bold block">{plot.roiEstimate}</strong>
                  </div>
                </div>

                {/* Features Pill List */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Highlights</span>
                  <div className="flex flex-wrap gap-1.5">
                    {plot.features.slice(0, 2).map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[11px] bg-rose-50 text-[#7b002c] border border-rose-100/80 px-2 py-0.5 rounded-md line-clamp-1"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Estimated Price</span>
                      <span className="text-lg font-serif font-bold text-[#7b002c]">{plot.priceFormatted}</span>
                    </div>
                    {plot.installmentAvailable ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full">
                        Installments Avail.
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                        Cash / Resale
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenModal(plot)}
                      className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#7b002c]" />
                      <span>Full Specs</span>
                    </button>

                    <a
                      href={`https://wa.me/923044811717?text=Hi%20Faisal%20Hills%20Commercial%20Desk,%20I%20am%20interested%20in%20commercial%20plot%20${plot.plotNumber}%20(${plot.sizeLabel}%20in%20${plot.blockName},%20Price:%20${plot.priceFormatted}).%20Please%20share%20complete%20details%20and%20payment%20plan.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-white" />
                      <span>Inquire / Book</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                <tr>
                  <th className="p-4">Plot # & Name</th>
                  <th className="p-4">Block</th>
                  <th className="p-4">Size & Dims</th>
                  <th className="p-4">Road Width</th>
                  <th className="p-4">Height Bylaws</th>
                  <th className="p-4">Price (PKR)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPlots.map((plot) => (
                  <tr key={plot.id} className="hover:bg-rose-50/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200">
                          <Image src={plot.image} alt={plot.title} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-xs text-[#7b002c]">#{plot.plotNumber}</span>
                          <strong className="block font-serif font-bold text-slate-900 text-xs line-clamp-1 max-w-[220px]">
                            {plot.title}
                          </strong>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">{plot.blockName}</td>
                    <td className="p-4 font-sans">
                      <strong className="block text-slate-900">{plot.sizeLabel}</strong>
                      <span className="text-[10px] text-slate-400">{plot.dimensions}</span>
                    </td>
                    <td className="p-4 font-sans text-slate-600 max-w-[150px] truncate">{plot.roadWidth}</td>
                    <td className="p-4 font-sans text-slate-600">{plot.heightPermission}</td>
                    <td className="p-4 font-serif font-bold text-[#7b002c] text-sm whitespace-nowrap">
                      {plot.priceFormatted}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full whitespace-nowrap">
                        <Check className="w-3 h-3 text-emerald-600" />
                        {plot.possessionStatus}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleOpenModal(plot)}
                        className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        View Specs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {filteredPlots.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <Store className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-serif font-bold text-xl text-slate-800">No Commercial Plots Matched Your Filters</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search criteria, selecting "All Blocks" or clearing the size filter to see more available commercial inventory.
          </p>
          <button
            onClick={() => {
              setSelectedBlock('all');
              setSelectedSize('all');
              setSelectedStatus('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-[#7b002c] text-white text-xs font-bold rounded-full uppercase tracking-wider hover:bg-[#9e1245] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* DETAILED PLOT SPECS MODAL */}
      {selectedPlotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div
            className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl overflow-y-auto border border-slate-200 relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7b002c] text-white">
                  #{selectedPlotModal.plotNumber}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                    {selectedPlotModal.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    {selectedPlotModal.blockName} • {selectedPlotModal.roadWidth}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Image Preview & Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src={selectedPlotModal.galleryImages[activeImageIdx] || selectedPlotModal.image}
                    alt={selectedPlotModal.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-full font-bold">
                    {selectedPlotModal.category}
                  </div>
                </div>

                {/* Thumbnails & Quick Pricing Box */}
                <div className="md:col-span-4 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Visual Gallery & Plans
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedPlotModal.galleryImages.map((img, gIdx) => (
                        <button
                          key={gIdx}
                          onClick={() => setActiveImageIdx(gIdx)}
                          className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            activeImageIdx === gIdx ? 'border-[#7b002c] ring-2 ring-[#7b002c]/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image src={img} alt={`Thumb ${gIdx}`} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Summary Box */}
                  <div className="bg-rose-50 border border-rose-200/80 p-4 rounded-2xl space-y-2">
                    <span className="text-[10px] text-[#7b002c] font-bold uppercase tracking-wider block">Demand Bracket</span>
                    <div className="text-2xl font-serif font-bold text-[#7b002c]">{selectedPlotModal.priceFormatted}</div>
                    <span className="text-xs text-slate-600 block">{selectedPlotModal.priceRangeFormatted}</span>
                    <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-semibold">Growth Trend:</span>
                      <strong className="text-emerald-700">{selectedPlotModal.capitalGrowth}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Plot Specifications Grid */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#7b002c]" />
                  <span>Comprehensive Technical Plot Specifications</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-sans">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Plot Size</span>
                    <strong className="text-slate-800 text-sm block">{selectedPlotModal.sizeLabel}</strong>
                    <span className="text-slate-500">{selectedPlotModal.sizeMarla} Marla Commercial</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Ground Dimensions</span>
                    <strong className="text-slate-800 text-sm block">{selectedPlotModal.dimensions}</strong>
                    <span className="text-slate-500">Standard RDA Frontage</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Boulevard Width</span>
                    <strong className="text-slate-800 text-sm block">{selectedPlotModal.roadWidth}</strong>
                    <span className="text-slate-500">{selectedPlotModal.facing}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Bylaws Height Approved</span>
                    <strong className="text-emerald-700 text-sm block">{selectedPlotModal.heightPermission}</strong>
                    <span className="text-slate-500">Multi-Floor Plaza Allowed</span>
                  </div>
                </div>
              </div>

              {/* Payment Breakdown (if installments available) */}
              {selectedPlotModal.installmentAvailable && selectedPlotModal.downPayment && (
                <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">Installment Breakdown</span>
                      <h4 className="font-serif font-bold text-base text-white">Payment Schedule Structure</h4>
                    </div>
                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full font-bold text-amber-300">
                      {selectedPlotModal.tenure}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-slate-400 block text-[10px] uppercase">Down Payment (Booking)</span>
                      <strong className="text-rose-300 text-sm block">{selectedPlotModal.downPayment}</strong>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-slate-400 block text-[10px] uppercase">Quarterly Installment</span>
                      <strong className="text-white text-sm block">{selectedPlotModal.quarterlyInstallment}</strong>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-slate-400 block text-[10px] uppercase">Estimated Rental Yield</span>
                      <strong className="text-emerald-400 text-sm block">{selectedPlotModal.roiEstimate}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Description & Suitable Business Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-sm text-slate-900">Commercial Plot Brief</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedPlotModal.description}</p>
                  <div className="space-y-1.5">
                    {selectedPlotModal.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="font-serif font-bold text-sm text-slate-900">Recommended Business Uses</h4>
                  <div className="space-y-2">
                    {selectedPlotModal.suitableFor.map((useItem, uIdx) => (
                      <div key={uIdx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200/60 shadow-2xs">
                        <Store className="w-3.5 h-3.5 text-[#7b002c]" />
                        <span className="text-slate-800 font-semibold">{useItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer / Actions */}
            <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
              <div className="text-xs text-slate-500">
                Plot verification & allotment managed directly via Faisal Hills transfer office.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCloseModal}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>

                <a
                  href={`https://wa.me/923044811717?text=Hi%20Faisal%20Hills%20Commercial%20Desk,%20I%20want%20to%20reserve/book%20commercial%20plot%20${selectedPlotModal.plotNumber}%20(${selectedPlotModal.sizeLabel}%20in%20${selectedPlotModal.blockName}).%20Please%20guide%20me%20on%20the%20booking%20procedure.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Reserve on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
