'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, CheckCircle, SlidersHorizontal, MessageSquare, RefreshCw, ArrowRight } from 'lucide-react';
import { plotInventoryData, blocksData, PlotItem, fetchPlots } from '@/data/faisalHillsData';
import LeadModal from '@/components/ui/LeadModal';

export default function PlotSearchPage() {
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedFacing, setSelectedFacing] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState(70000000); // 7 Crore
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activePlotForModal, setActivePlotForModal] = useState<PlotItem | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const [allPlots, setAllPlots] = useState<PlotItem[]>(plotInventoryData);

  React.useEffect(() => {
    fetchPlots().then(data => setAllPlots(data)).catch(console.error);

    const handlePlotsSync = () => {
      fetchPlots().then(data => setAllPlots(data)).catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handlePlotsSync);
    return () => window.removeEventListener('faisal_plots_updated', handlePlotsSync);
  }, []);

  // Filtered Plot List
  const filteredPlots = useMemo(() => {
    return allPlots.filter(plot => {
      const matchBlock = selectedBlock === 'all' || plot.blockSlug === selectedBlock;
      const matchCategory = selectedCategory === 'all' || plot.category === selectedCategory;
      const matchSize = selectedSize === 'all' || plot.size === selectedSize;
      const matchFacing = selectedFacing === 'all' || plot.facing === selectedFacing;
      const matchStatus = statusFilter === 'all' || plot.status === statusFilter;
      const matchPrice = plot.price <= maxPrice;
      const matchQuery = searchQuery === '' || 
        (plot.plotNumber && plot.plotNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (plot.blockName && plot.blockName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchBlock && matchCategory && matchSize && matchFacing && matchStatus && matchPrice && matchQuery;
    });
  }, [allPlots, selectedBlock, selectedCategory, selectedSize, selectedFacing, statusFilter, maxPrice, searchQuery]);

  const resetFilters = () => {
    setSelectedBlock('all');
    setSelectedCategory('all');
    setSelectedSize('all');
    setSelectedFacing('all');
    setStatusFilter('all');
    setMaxPrice(70000000);
    setSearchQuery('');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 space-y-8">
      
      {/* Title Header */}
      <div className="space-y-2">
        <span className="label-caps text-[#7b002c] font-bold block">Inventory Explorer</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#7b002c]">
          Search Faisal Hills Plot & Flat Inventory
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl">
          Filter residential plots, commercial spaces, and Faisal Jewels luxury flats by sector, size, budget, facing, and availability status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-fit">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#7b002c]">
              <SlidersHorizontal className="w-5 h-5 text-[#7b002c]" />
              <span>Filter Inventory</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-slate-500 hover:text-[#7b002c] flex items-center gap-1 font-semibold"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search Query */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1.5">Search Plot / Flat Number</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="e.g. A-125 or FJ-402"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
              />
            </div>
          </div>

          {/* Block Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1.5">Select Block / Sector</label>
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
            >
              <option value="all">All Blocks & Projects</option>
              {blocksData.map(b => (
                <option key={b.id} value={b.slug}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1.5">Property Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
            >
              <option value="all">All Categories</option>
              <option value="Residential">Residential Plots</option>
              <option value="Apartment">Luxury Flats & Apartments</option>
              <option value="Commercial">Commercial Plots & Shops</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1.5">Availability Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
            >
              <option value="all">All Statuses</option>
              <option value="Available">Available Only</option>
              <option value="Reserved">Reserved</option>
              <option value="Sold">Sold</option>
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-900">Max Budget:</span>
              <span className="font-serif font-bold text-[#7b002c] text-sm">PKR {(maxPrice / 100000).toFixed(0)} Lacs</span>
            </div>
            <input
              type="range"
              min="3000000"
              max="70000000"
              step="1000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#7b002c] cursor-pointer"
            />
          </div>
        </div>

        {/* Right Inventory Grid */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-600 font-medium">
              Showing <strong className="text-[#7b002c] font-bold">{filteredPlots.length}</strong> matching property listings
            </span>
            <span className="text-slate-500 font-semibold">Verified: August 2026</span>
          </div>

          {filteredPlots.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
              <MapPin className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#7b002c]">No Properties Found</h3>
              <p className="text-xs text-slate-600">Try adjusting your filters or resetting your budget slider.</p>
              <button onClick={resetFilters} className="px-4 py-2 bg-[#7b002c] text-white text-xs font-bold rounded-xl">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPlots.map((plot) => (
                <Link
                  key={plot.id}
                  href={`/plots/${plot.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm card-hover hover-glow-maroon overflow-hidden flex flex-col justify-between group transition-all duration-300 cursor-pointer block text-inherit no-underline"
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900 img-zoom-container">
                      <img 
                        src={plot.image} 
                        alt={plot.plotNumber} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full shadow bg-[#7b002c] text-white border border-white/20`}>
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
                        <h4 className="font-serif font-bold text-xl group-hover:text-[#9e1245] transition-colors">#{plot.plotNumber}</h4>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{plot.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-semibold">Size</span>
                          <strong className="text-slate-900 font-bold">{plot.size}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-semibold">Facing / Orientation</span>
                          <strong className="text-slate-900 font-bold">{plot.facing}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-semibold">Demand Price</span>
                      <span className="font-serif font-bold text-xl text-[#7b002c]">{plot.priceFormatted}</span>
                    </div>

                    <span className="px-4 py-2.5 bg-[#7b002c] group-hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all duration-300 group-hover:scale-105 shadow flex items-center gap-1.5">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Compare other blocks callout - Premium Pill Strip */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-850 shadow-xl relative overflow-hidden mt-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7b002c]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[9px] font-bold text-rose-300 uppercase tracking-widest bg-rose-950/50 border border-rose-900/50 px-2.5 py-0.5 rounded-full inline-block">
              Block Explorer
            </span>
            <h3 className="font-serif font-bold text-lg text-white">Compare with Other Faisal Hills Blocks</h3>
            <p className="text-xs text-slate-400 max-w-md">
              View master layout maps, NOC approvals, and amenities across different sectors.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-2.5 max-w-xl">
            {blocksData.map((ob) => (
              <Link
                key={ob.id}
                href={`/blocks/${ob.slug}`}
                className="px-4 py-2 bg-white/5 hover:bg-[#7b002c] border border-white/10 hover:border-[#7b002c] rounded-xl font-bold text-xs text-white hover:text-white transition-all duration-300 hover:scale-105 active:scale-98 shadow flex items-center gap-1.5 cursor-pointer"
              >
                <span>{ob.name}</span>
                <span className="text-[8px] uppercase tracking-wider text-rose-300 font-semibold px-1.5 py-0.5 bg-rose-950/60 rounded">
                  {ob.status === 'Possession Ready' || ob.status === 'Fully Developed & Populated' ? 'Ready' : 'New'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultBlock={activePlotForModal?.blockName}
        defaultPlot={activePlotForModal?.plotNumber}
      />
    </div>
  );
}
