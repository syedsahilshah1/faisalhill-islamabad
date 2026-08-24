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
  const [selectedFacing, setSelectedFacing] = useState('all');
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
      const matchFacing = selectedFacing === 'all' || plot.facing === selectedFacing;
      const matchPrice = plot.price <= maxPrice;
      const matchQuery = searchQuery === '' ||
        (plot.plotNumber && plot.plotNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (plot.blockName && plot.blockName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (plot.size && plot.size.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchBlock && matchCategory && matchSize && matchFacing && matchPrice && matchQuery;
    });
  }, [allPlots, selectedBlock, selectedCategory, selectedSize, selectedFacing, maxPrice, searchQuery]);

  const resetFilters = () => {
    setSelectedBlock('all');
    setSelectedCategory('all');
    setSelectedSize('all');
    setSelectedFacing('all');
    setMaxPrice(70000000);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedBlock !== 'all' || selectedCategory !== 'all' || selectedSize !== 'all' || selectedFacing !== 'all' || maxPrice < 70000000 || searchQuery !== '';

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 space-y-10">

      {/* ========================================================= */}
      {/* 1. TITLE HEADER & SIZE FILTER CONTROLS                    */}
      {/* ========================================================= */}
      <div className="space-y-6 border-b border-slate-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="label-caps text-[#7b002c] font-bold block mb-1">Live Inventory Explorer</span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] tracking-tight">
              Search Faisal Hills Plot & Flat Inventory
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore and filter residential plots, commercial investments, and luxury apartments across all blocks of Faisal Hills Islamabad.
            </p>
          </div>

          {/* Quick Size Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {['all', '5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  selectedSize.toLowerCase() === size.toLowerCase()
                    ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {size === 'all' ? 'All Sizes' : size}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Type Switcher (Only appears when a specific size is selected) */}
        {selectedSize !== 'all' && (
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 animate-fadeIn">
            <div className="flex items-center gap-2 bg-rose-50/80 px-4 py-2 rounded-2xl border border-rose-200/80">
              <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider">
                Filter {selectedSize} by:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#7b002c] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-rose-100/70 border border-slate-200'
                  }`}
                >
                  All {selectedSize}
                </button>
                <button
                  onClick={() => setSelectedCategory('Residential')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedCategory === 'Residential'
                      ? 'bg-[#7b002c] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-rose-100/70 border border-slate-200'
                  }`}
                >
                  Residential
                </button>
                <button
                  onClick={() => setSelectedCategory('Commercial')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedCategory === 'Commercial'
                      ? 'bg-[#7b002c] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-rose-100/70 border border-slate-200'
                  }`}
                >
                  Commercial
                </button>
              </div>
            </div>

            <button
              onClick={() => { setSelectedSize('all'); setSelectedCategory('all'); }}
              className="text-xs font-semibold text-slate-500 hover:text-[#7b002c] transition"
            >
              Clear Size Filter ✕
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 2. TOP HORIZONTAL FILTER BAR                              */}
      {/* ========================================================= */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 font-serif font-bold text-base sm:text-lg text-[#7b002c]">
            <SlidersHorizontal className="w-5 h-5 text-[#7b002c]" />
            <span>Filter & Customize Inventory</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#7b002c] hover:text-[#9e1245] flex items-center gap-1 font-bold bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">

          {/* Search Plot Number */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Search Plot / Sector
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="e.g. A-204, PR-014, 5 Marla"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Block Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Block / Sector
            </label>
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] focus:bg-white transition cursor-pointer"
            >
              <option value="all">All Blocks & Sectors</option>
              {blocksData.map(b => (
                <option key={b.id} value={b.slug}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Property Category */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Property Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] focus:bg-white transition cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="Residential">Residential Plots</option>
              <option value="Apartment">Luxury Flats & Apartments</option>
              <option value="Commercial">Commercial Plots & Plazas</option>
            </select>
          </div>

          {/* Plot Size */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Plot Size
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] focus:bg-white transition cursor-pointer"
            >
              <option value="all">All Sizes</option>
              <option value="5 Marla">5 Marla (25 × 50)</option>
              <option value="8 Marla">8 Marla (30 × 60)</option>
              <option value="10 Marla">10 Marla (35 × 70)</option>
              <option value="14 Marla">14 Marla (40 × 80)</option>
              <option value="1 Kanal">1 Kanal (50 × 90)</option>
              <option value="2-Bed Luxury Flat">2-Bed Luxury Flat</option>
              <option value="1-Bed Executive Suite">1-Bed Executive Suite</option>
              <option value="4 Marla">4 Marla Plaza Plot</option>
            </select>
          </div>

          {/* Orientation / Facing */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Orientation / Facing
            </label>
            <select
              value={selectedFacing}
              onChange={(e) => setSelectedFacing(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] focus:bg-white transition cursor-pointer"
            >
              <option value="all">All Orientations</option>
              <option value="Main Boulevard">Main Boulevard</option>
              <option value="Park Facing">Park Facing</option>
              <option value="Corner">Corner</option>
              <option value="Hill View">Margalla Hill View</option>
              <option value="Standard">Standard</option>
            </select>
          </div>

        </div>

        {/* Budget Filter & Results Summary Row */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-600 shrink-0">Max Budget:</span>
            <input
              type="range"
              min="3000000"
              max="70000000"
              step="1000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full sm:w-48 lg:w-64 accent-[#7b002c] cursor-pointer"
            />
            <span className="font-serif font-bold text-[#7b002c] text-xs sm:text-sm shrink-0 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
              PKR {(maxPrice / 100000).toFixed(0)} Lacs
            </span>
          </div>

          <div className="text-xs text-slate-600 font-medium self-end md:self-auto">
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
