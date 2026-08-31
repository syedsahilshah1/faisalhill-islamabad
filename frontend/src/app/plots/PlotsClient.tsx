'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  MapPin,
  CheckCircle,
  SlidersHorizontal,
  MessageSquare,
  RefreshCw,
  ArrowRight,
  Home,
  Building2,
  Trees,
  ShieldCheck,
  Sparkles,
  Award,
  ChevronRight,
  Info,
  Compass,
  Check,
  Grid,
  List,
  Eye,
  PhoneCall,
  X,
  Store,
  BadgeCheck,
  CheckCircle2
} from 'lucide-react';
import {
  plotInventoryData,
  blocksData,
  PlotItem,
  fetchPlots
} from '@/data/faisalHillsData';
import { getStandardDimensionsForSize } from '@/utils/plotSeriesEngine';
import LeadModal from '@/components/ui/LeadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';

function PlotSearchContent() {
  const searchParams = useSearchParams();
  const querySize = searchParams.get('size');
  const queryCategory = searchParams.get('category');
  const queryBlock = searchParams.get('block');

  const [selectedBlock, setSelectedBlock] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const [activePlotForModal, setActivePlotForModal] = useState<PlotItem | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const [allPlots, setAllPlots] = useState<PlotItem[]>([]);
  const [isLoadingPlots, setIsLoadingPlots] = useState(true);

  // Sync with URL query parameters when navigating from other pages
  useEffect(() => {
    if (querySize) setSelectedSize(querySize);
    if (queryCategory) setSelectedCategory(queryCategory);
    if (queryBlock) setSelectedBlock(queryBlock);
  }, [querySize, queryCategory, queryBlock]);

  useEffect(() => {
    fetchPlots()
      .then((data) => {
        setAllPlots(data || []);
        setIsLoadingPlots(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoadingPlots(false);
      });

    const handlePlotsSync = () => {
      fetchPlots().then((data) => {
        setAllPlots(data || []);
      }).catch(console.error);
    };

    window.addEventListener('faisal_plots_updated', handlePlotsSync);
    return () => window.removeEventListener('faisal_plots_updated', handlePlotsSync);
  }, []);

  // Filtered & Sorted Plots
  const filteredPlots = useMemo(() => {
    return allPlots
      .filter((plot) => {
        // Block filter
        if (selectedBlock !== 'all' && plot.blockSlug !== selectedBlock) return false;

        // Category filter
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'Residential' && plot.category !== 'Residential') return false;
          if (selectedCategory === 'Commercial' && plot.category !== 'Commercial') return false;
          if (selectedCategory === 'Apartment' && plot.category !== 'Apartment') return false;
        }

        // Size filter
        if (selectedSize !== 'all') {
          const pSize = plot.size.toLowerCase();
          const sFilter = selectedSize.toLowerCase();
          if (sFilter === '5 marla' && !pSize.includes('5 marla') && !pSize.includes('5.33') && !pSize.includes('5.8')) return false;
          if (sFilter === '8 marla' && !pSize.includes('8 marla')) return false;
          if (sFilter === '10 marla' && !pSize.includes('10 marla')) return false;
          if (sFilter === '14 marla' && !pSize.includes('14 marla')) return false;
          if (sFilter === '1 kanal' && !pSize.includes('1 kanal') && !pSize.includes('12 marla')) return false;
          if (sFilter === 'apartments' && plot.category !== 'Apartment') return false;
        }

        // Status filter
        if (selectedStatus !== 'all') {
          if (selectedStatus === 'available' && plot.status !== 'Available') return false;
          if (selectedStatus === 'commercial' && plot.category !== 'Commercial') return false;
          if (selectedStatus === 'boulevard' && !plot.facing?.toLowerCase().includes('boulevard')) return false;
          if (selectedStatus === 'corner' && !plot.facing?.toLowerCase().includes('corner')) return false;
        }

        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matches =
            (plot.plotNumber && plot.plotNumber.toLowerCase().includes(q)) ||
            (plot.blockName && plot.blockName.toLowerCase().includes(q)) ||
            (plot.size && plot.size.toLowerCase().includes(q)) ||
            (plot.facing && plot.facing.toLowerCase().includes(q)) ||
            (plot.description && plot.description.toLowerCase().includes(q)) ||
            (plot.features && plot.features.some((f) => f.toLowerCase().includes(q)));
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'name-asc') return (a.plotNumber || '').localeCompare(b.plotNumber || '');
        return 0; // featured default
      });
  }, [allPlots, selectedBlock, selectedCategory, selectedSize, selectedStatus, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedBlock('all');
    setSelectedCategory('all');
    setSelectedSize('all');
    setSelectedStatus('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedBlock !== 'all' ||
    selectedCategory !== 'all' ||
    selectedSize !== 'all' ||
    selectedStatus !== 'all' ||
    searchQuery !== '';

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-16 space-y-8">
      {/* 1. TITLE & STATS HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span>Faisal Hills Official Plot &amp; Property Inventory 2026</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Faisal Hills Plot Inventory Explorer
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-3xl leading-relaxed">
            Search verified residential plots, commercial investments, and luxury apartments across Executive Block, Block A, B, C, D, Prime Block, and Faisal Jewel. Inspect dimensions, road facing, and live demand prices.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm shrink-0">
          <div className="px-4 py-2 bg-slate-50 rounded-xl text-center">
            <span className="block text-base font-bold text-[#7b002c]">{allPlots.length}+</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Live Listings</span>
          </div>
          <div className="px-4 py-2 bg-slate-50 rounded-xl text-center">
            <span className="block text-base font-bold text-emerald-600">RDA NOC</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">100% Approved</span>
          </div>
          <div className="px-4 py-2 bg-slate-50 rounded-xl text-center">
            <span className="block text-base font-bold text-slate-900">Direct</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Transfer</span>
          </div>
        </div>
      </div>

      {/* 2. UNIFIED MODERN FILTER BAR */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 items-center">
          {/* Search Input */}
          <div className="relative sm:col-span-2 lg:col-span-5">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by plot #, boulevard, block, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7b002c] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Block Selector */}
          <div className="sm:col-span-1 lg:col-span-3">
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              aria-label="Select Block"
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7b002c] focus:bg-white cursor-pointer"
            >
              <option value="all">Select Block</option>
              <option value="executive-block">Executive Block (Main GT Entrance)</option>
              <option value="block-a">Block A (Settled Families)</option>
              <option value="block-b">Block B (Margalla View)</option>
              <option value="block-c">Block C (Civic Center Hub)</option>
              <option value="block-d">Block D (Possession Granted)</option>
              <option value="prime-block">Prime Block (VIP Sector)</option>
              <option value="faisal-jewel-islamabad">Faisal Jewel (27-Storey)</option>
            </select>
          </div>

          {/* Size Filter */}
          <div className="col-span-1 lg:col-span-2">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              aria-label="Select Size"
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7b002c] focus:bg-white cursor-pointer"
            >
              <option value="all">Select Size</option>
              <option value="5 Marla">5 Marla (25 × 50)</option>
              <option value="8 Marla">8 Marla (30 × 60)</option>
              <option value="10 Marla">10 Marla (35 × 70)</option>
              <option value="14 Marla">14 Marla (40 × 80)</option>
              <option value="1 Kanal">1 Kanal (50 × 90)</option>
              <option value="apartments">Luxury Apartments</option>
            </select>
          </div>

          {/* Category / Status Filter */}
          <div className="col-span-1 lg:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Select Category"
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7b002c] focus:bg-white cursor-pointer"
            >
              <option value="all">Select Status / Type</option>
              <option value="Residential">Residential Plots</option>
              <option value="Commercial">Commercial Plots &amp; Plazas</option>
              <option value="Apartment">Luxury Flats &amp; Suites</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. RESULTS COUNT, SORT SELECTOR & VIEW MODE TOGGLE */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-sans px-1">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span>
            Showing <strong className="text-slate-900 font-bold">{filteredPlots.length}</strong> of{' '}
            <strong>{allPlots.length}</strong> verified properties
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[#7b002c] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Reset all filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort plots"
              className="bg-transparent font-bold text-[#7b002c] focus:outline-none cursor-pointer text-xs"
            >
              <option value="featured">Featured / Best Deal</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="size-asc">Size: Small to Large</option>
              <option value="size-desc">Size: Large to Small</option>
            </select>
          </div>

          {/* Clean View Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
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
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
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
      </div>

      {/* 4. GRID VIEW CARDS */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPlots.map((plot) => (
            <div
              key={plot.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image Container with Badge */}
              <div
                onClick={() => setActivePlotForModal(plot)}
                className="relative h-56 w-full overflow-hidden bg-slate-900 cursor-pointer"
                title={`Click to view full specs for #${plot.plotNumber}`}
              >
                <img
                  src={plot.image}
                  alt={plot.plotNumber}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#7b002c] text-white shadow-md">
                    {plot.blockName}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-400 text-slate-950 shadow-md">
                    {plot.category === 'Apartment' ? 'Luxury Flat' : plot.category}
                  </span>
                </div>

                {/* Bottom Overlay Title & Plot Number */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-rose-300 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      #{plot.plotNumber}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {plot.status}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {plot.size} {plot.category} Plot
                  </h3>
                </div>
              </div>

              {/* Card Body Specs */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 text-xs font-sans">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Size &amp; Dims</span>
                    <strong className="text-slate-800 font-bold block">{plot.size}</strong>
                    <span className="text-[10px] text-slate-500">
                      {plot.dimensions && !plot.dimensions.includes('25 × 50') || plot.size.includes('5')
                        ? (plot.dimensions || getStandardDimensionsForSize(plot.size))
                        : getStandardDimensionsForSize(plot.size)}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Facing</span>
                    <strong className="text-slate-800 font-bold block truncate">{plot.facing}</strong>
                    <span className="text-[10px] text-slate-500">RDA Approved</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Type</span>
                    <strong className="text-slate-800 font-bold block truncate">{plot.category}</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Trend</span>
                    <strong className="text-emerald-600 font-bold block truncate">{plot.priceHistoryTrend || 'High Demand'}</strong>
                  </div>
                </div>

                {/* Features Pill List */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Highlights</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(plot.features || []).slice(0, 2).map((feat, fIdx) => (
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
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Demand Price</span>
                      <span className="text-lg font-serif font-bold text-[#7b002c]">{plot.priceFormatted}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      Verified Title
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActivePlotForModal(plot)}
                      className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#7b002c]" />
                      <span>Full Specs</span>
                    </button>

                    <a
                      href={`https://wa.me/923331113177?text=Hi%20Faisal%20Hills%20Desk,%20I%20am%20interested%20in%20plot%20${plot.plotNumber}%20(${plot.size}%20in%20${plot.blockName},%20Price:%20${plot.priceFormatted}).%20Please%20share%20complete%20details.`}
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

      {/* 5. TABLE VIEW MATRIX */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Mobile Scroll Tip */}
          <div className="sm:hidden px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>👉 Swipe horizontally to view all columns &amp; prices</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-xs border-collapse">
              <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                <tr>
                  <th className="p-4 w-[280px] min-w-[280px] whitespace-nowrap">Plot # &amp; Title</th>
                  <th className="p-4 w-[140px] min-w-[140px] whitespace-nowrap">Block</th>
                  <th className="p-4 w-[130px] min-w-[130px] whitespace-nowrap">Size &amp; Dims</th>
                  <th className="p-4 w-[130px] min-w-[130px] whitespace-nowrap">Category</th>
                  <th className="p-4 w-[150px] min-w-[150px] whitespace-nowrap">Facing</th>
                  <th className="p-4 w-[140px] min-w-[140px] whitespace-nowrap">Demand Price</th>
                  <th className="p-4 w-[140px] min-w-[140px] whitespace-nowrap">Status</th>
                  <th className="p-4 w-[100px] min-w-[100px] text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPlots.map((plot) => (
                  <tr key={plot.id} className="hover:bg-rose-50/40 transition-colors">
                    <td className="p-4 w-[280px] min-w-[280px]">
                      <div
                        onClick={() => setActivePlotForModal(plot)}
                        className="flex items-center gap-3 cursor-pointer group/item"
                        title={`Click to view full plot specs for ${plot.plotNumber}`}
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200 group-hover/item:ring-2 group-hover/item:ring-[#7b002c] transition-all">
                          <img src={plot.image} alt={plot.plotNumber} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-mono font-bold text-xs text-[#7b002c]">#{plot.plotNumber}</span>
                          <strong className="block font-serif font-bold text-slate-900 text-xs line-clamp-1 group-hover/item:text-[#7b002c] transition-colors">
                            {plot.size} {plot.category}
                          </strong>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 w-[140px] min-w-[140px] font-semibold text-slate-800 whitespace-nowrap">{plot.blockName}</td>
                    <td className="p-4 w-[130px] min-w-[130px] font-sans whitespace-nowrap">
                      <strong className="block text-slate-900">{plot.size}</strong>
                      <span className="text-[10px] text-slate-400 block">{plot.dimensions}</span>
                    </td>
                    <td className="p-4 w-[130px] min-w-[130px] font-sans whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] inline-block">
                        {plot.category}
                      </span>
                    </td>
                    <td className="p-4 w-[150px] min-w-[150px] font-sans text-slate-600 truncate">{plot.facing}</td>
                    <td className="p-4 w-[140px] min-w-[140px] font-serif font-bold text-[#7b002c] text-sm whitespace-nowrap">
                      {plot.priceFormatted}
                    </td>
                    <td className="p-4 w-[140px] min-w-[140px] whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full whitespace-nowrap">
                        <Check className="w-3 h-3 text-emerald-600" />
                        {plot.status}
                      </span>
                    </td>
                    <td className="p-4 w-[100px] min-w-[100px] text-center whitespace-nowrap">
                      <button
                        onClick={() => setActivePlotForModal(plot)}
                        className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
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

      {/* 6. EMPTY STATE */}
      {filteredPlots.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-serif font-bold text-xl text-slate-800">No Properties Matched Your Filters</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search criteria, selecting &quot;Select Block&quot; or clearing the size filter to see more available properties in Faisal Hills.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#7b002c] text-white text-xs font-bold rounded-full uppercase tracking-wider hover:bg-[#9e1245] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* 7. DETAILED PLOT SPECS MODAL */}
      {activePlotForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div
            className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl overflow-y-auto border border-slate-200 relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7b002c] text-white">
                  #{activePlotForModal.plotNumber}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                    {activePlotForModal.size} {activePlotForModal.category} Plot
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    {activePlotForModal.blockName} • {activePlotForModal.facing}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActivePlotForModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={activePlotForModal.image}
                    alt={activePlotForModal.plotNumber}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-full font-bold">
                    {activePlotForModal.category}
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col justify-between space-y-3">
                  <div className="bg-rose-50 border border-rose-200/80 p-5 rounded-2xl space-y-3">
                    <span className="text-[10px] text-[#7b002c] font-bold uppercase tracking-wider block">Demand Price</span>
                    <div className="text-2xl font-serif font-bold text-[#7b002c]">{activePlotForModal.priceFormatted}</div>
                    <span className="text-xs text-slate-600 block">Verified Market Price</span>
                    <div className="pt-3 border-t border-rose-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-semibold">Growth Trend:</span>
                      <strong className="text-emerald-700">{activePlotForModal.priceHistoryTrend || '+12.5% YoY'}</strong>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status &amp; NOC</span>
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>RDA Approved Freehold Title</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-[#7b002c]" />
                      <span>Direct Head Office Transfer</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#7b002c]" />
                  <span>Technical Plot Specifications</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-sans">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Plot Size</span>
                    <strong className="text-slate-800 text-sm block">{activePlotForModal.size}</strong>
                    <span className="text-slate-500">{activePlotForModal.category} Plot</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Dimensions</span>
                    <strong className="text-slate-800 text-sm block">
                      {activePlotForModal.dimensions && !activePlotForModal.dimensions.includes('25 × 50') || activePlotForModal.size.includes('5')
                        ? (activePlotForModal.dimensions || getStandardDimensionsForSize(activePlotForModal.size))
                        : getStandardDimensionsForSize(activePlotForModal.size)}
                    </strong>
                    <span className="text-slate-500">Standard RDA Frontage</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Facing / Orientation</span>
                    <strong className="text-slate-800 text-sm block truncate">{activePlotForModal.facing}</strong>
                    <span className="text-slate-500">Wide Road Access</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Sector Block</span>
                    <strong className="text-[#7b002c] text-sm block">{activePlotForModal.blockName}</strong>
                    <span className="text-slate-500">Faisal Hills Islamabad</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-sm text-slate-900">Property Overview</h4>
                  <p className="text-slate-600 leading-relaxed">{activePlotForModal.description}</p>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="font-serif font-bold text-sm text-slate-900">Key Plot Amenities</h4>
                  <div className="space-y-2">
                    {(activePlotForModal.features || []).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200/60 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-slate-800 font-semibold">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
              <div className="text-xs text-slate-500">
                Official biometric transfer and dues clearance verified at Zedem Head Office.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setActivePlotForModal(null)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>

                <a
                  href={`https://wa.me/923331113177?text=Hi%20Faisal%20Hills%20Desk,%20I%20am%20interested%20in%20reserving/booking%20plot%20${activePlotForModal.plotNumber}%20(${activePlotForModal.size}%20in%20${activePlotForModal.blockName}).%20Please%20guide%20me%20on%20the%20booking%20procedure.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lead Inquire Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultBlock={activePlotForModal?.blockName}
        defaultPlot={activePlotForModal?.plotNumber}
      />
    </div>
  );
}

export default function PlotsClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center pt-32">
          <div className="w-8 h-8 border-4 border-[#7b002c] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PlotSearchContent />
    </Suspense>
  );
}
