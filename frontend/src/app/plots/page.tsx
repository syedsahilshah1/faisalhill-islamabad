'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search, Filter, MapPin, CheckCircle, SlidersHorizontal, MessageSquare,
  RefreshCw, ArrowRight, Home, Building2, Trees, ShieldCheck, Sparkles,
  Award, ChevronRight, Info, Compass, Check
} from 'lucide-react';
import { plotInventoryData, blocksData, PlotItem, fetchPlots } from '@/data/faisalHillsData';
import LeadModal from '@/components/ui/LeadModal';

function PlotSearchContent() {
  const searchParams = useSearchParams();
  const querySize = searchParams.get('size');
  const queryCategory = searchParams.get('category');
  const queryBlock = searchParams.get('block');

  const [selectedBlock, setSelectedBlock] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [maxPrice, setMaxPrice] = useState(70000000); // 7 Crore
  const [searchQuery, setSearchQuery] = useState('');

  const [activePlotForModal, setActivePlotForModal] = useState<PlotItem | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const [allPlots, setAllPlots] = useState<PlotItem[]>(plotInventoryData);

  // Sync with URL query parameters when navigating from Homepage or elsewhere
  useEffect(() => {
    if (querySize) setSelectedSize(querySize);
    if (queryCategory) setSelectedCategory(queryCategory);
    if (queryBlock) setSelectedBlock(queryBlock);
  }, [querySize, queryCategory, queryBlock]);

  useEffect(() => {
    fetchPlots().then(data => setAllPlots(data)).catch(console.error);

    const handlePlotsSync = () => {
      fetchPlots().then(data => setAllPlots(data)).catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handlePlotsSync);
    return () => window.removeEventListener('faisal_plots_updated', handlePlotsSync);
  }, []);

  // Filtered Plot List (Removed statusFilter as per requirements)
  const filteredPlots = useMemo(() => {
    return allPlots.filter(plot => {
      const matchBlock = selectedBlock === 'all' || plot.blockSlug === selectedBlock;
      const matchCategory = selectedCategory === 'all' || plot.category === selectedCategory;
      const matchSize = selectedSize === 'all' || plot.size.toLowerCase() === selectedSize.toLowerCase();
      const matchPrice = plot.price <= maxPrice;
      const matchQuery = searchQuery === '' ||
        (plot.plotNumber && plot.plotNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (plot.blockName && plot.blockName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (plot.size && plot.size.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchBlock && matchCategory && matchSize && matchPrice && matchQuery;
    });
  }, [allPlots, selectedBlock, selectedCategory, selectedSize, maxPrice, searchQuery]);

  const resetFilters = () => {
    setSelectedBlock('all');
    setSelectedCategory('all');
    setSelectedSize('all');
    setMaxPrice(70000000);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedBlock !== 'all' || selectedCategory !== 'all' || selectedSize !== 'all' || maxPrice < 70000000 || searchQuery !== '';

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 space-y-10">

      {/* ========================================================= */}
      {/* 1. TITLE HEADER & QUICK HIERARCHICAL FILTERS              */}
      {/* ========================================================= */}
      <div className="space-y-6 border-b border-slate-200 pb-6">
        <div className="space-y-2 max-w-3xl">
          <span className="label-caps text-[#7b002c] font-bold block mb-1">Live Inventory Explorer</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] tracking-tight">
            Search Faisal Hills Plot & Flat Inventory
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Explore and filter residential plots, commercial investments, and luxury apartments across all blocks of Faisal Hills Islamabad.
          </p>
        </div>

        {/* Hierarchical Quick Filters Container */}
        <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-3.5">
          
          {/* Level 1: Block Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider min-w-[130px] flex items-center gap-1.5 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#7b002c]" />
              1. Select Block:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setSelectedBlock('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  selectedBlock === 'all'
                    ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                All Blocks
              </button>
              {blocksData.map((block) => (
                <button
                  key={block.slug}
                  onClick={() => setSelectedBlock(block.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    selectedBlock === block.slug
                      ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                  }`}
                >
                  {block.name}
                </button>
              ))}
            </div>
          </div>

          {/* Level 2: Size Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-2.5 border-t border-slate-200/60">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider min-w-[130px] flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#7b002c]" />
              2. Plot Size:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {['all', '5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    selectedSize.toLowerCase() === size.toLowerCase()
                      ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                  }`}
                >
                  {size === 'all' ? 'All Sizes' : size}
                </button>
              ))}
            </div>
          </div>

          {/* Level 3: Category / Type Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2.5 border-t border-slate-200/60">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider min-w-[130px] flex items-center gap-1.5 shrink-0">
                <Building2 className="w-3.5 h-3.5 text-[#7b002c]" />
                3. Category:
              </span>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {[
                  { label: 'All Categories', value: 'all' },
                  { label: 'Residential', value: 'Residential' },
                  { label: 'Commercial', value: 'Commercial' },
                  { label: 'Luxury Flats', value: 'Apartment' },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                      selectedCategory === cat.value
                        ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-[#7b002c] hover:text-[#9e1245] transition flex items-center gap-1 shrink-0 self-start sm:self-center bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-xl border border-rose-100 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Quick Filters
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SEARCH & BUDGET FILTER BAR                             */}
      {/* ========================================================= */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 font-serif font-bold text-base sm:text-lg text-[#7b002c]">
            <SlidersHorizontal className="w-5 h-5 text-[#7b002c]" />
            <span>Search & Budget Filter</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#7b002c] hover:text-[#9e1245] flex items-center gap-1 font-bold bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">

          {/* Search Plot Number */}
          <div className="md:col-span-5">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Search Plot / Sector Number
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="e.g. A-204, PR-014, 5 Marla, Executive"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] focus:bg-white transition shadow-xs"
              />
            </div>
          </div>

          {/* Budget Filter */}
          <div className="md:col-span-7 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Max Budget
              </label>
              <span className="font-serif font-bold text-[#7b002c] text-xs sm:text-sm px-3 py-1 rounded-lg bg-rose-50 border border-rose-100">
                PKR {(maxPrice / 100000).toFixed(0)} Lacs
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="3000000"
                max="70000000"
                step="1000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#7b002c] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
          </div>

        </div>

        {/* Results Summary Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-600 font-medium">
            Showing <strong className="text-[#7b002c] font-bold">{filteredPlots.length}</strong> matching property listings
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. INVENTORY PLOTS GRID                                   */}
      {/* ========================================================= */}
      <div>
        {filteredPlots.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <MapPin className="w-12 h-12 text-[#7b002c]/40 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#7b002c]">No Properties Found</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              We couldn't find any plots matching your active filters. Try resetting the filters or increasing your maximum budget.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlots.map((plot) => (
              <div
                key={plot.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm card-hover hover-glow-maroon overflow-hidden flex flex-col justify-between group transition-all duration-300 h-full"
              >
                <div>
                  {/* Image Banner */}
                  <Link
                    href={`/plots/${plot.id}`}
                    className="relative h-48 w-full overflow-hidden bg-slate-900 img-zoom-container block cursor-pointer"
                  >
                    <img
                      src={plot.image}
                      alt={plot.plotNumber}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full shadow bg-[#7b002c] text-white border border-white/20">
                        {plot.category === 'Apartment' ? 'Luxury Flat' : plot.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-[#7b002c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow border border-white/20">
                        {plot.status}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="label-caps text-[9px] text-slate-300 block">{plot.blockName}</span>
                      <h4 className="font-serif font-bold text-xl group-hover:text-rose-200 transition-colors">#{plot.plotNumber}</h4>
                    </div>
                  </Link>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">{plot.description}</p>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Property Size:</span>
                        <strong className="text-slate-900 font-semibold">{plot.size}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Dimensions:</span>
                        <strong className="text-slate-900 font-semibold">{plot.dimensions}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Orientation:</span>
                        <strong className="text-slate-900 font-semibold">{plot.facing}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Demand Price</span>
                    <span className="font-serif font-bold text-lg text-[#7b002c]">{plot.priceFormatted}</span>
                  </div>

                  <Link
                    href={`/plots/${plot.id}`}
                    className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultBlock={activePlotForModal?.blockName}
        defaultPlot={activePlotForModal?.plotNumber}
      />
    </div>
  );
}

export default function PlotSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="w-8 h-8 border-4 border-[#7b002c] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PlotSearchContent />
    </Suspense>
  );
}
