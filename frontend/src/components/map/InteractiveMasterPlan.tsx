'use client';

import React, { useState, useMemo } from 'react';
import { 
  ZoomIn, ZoomOut, RefreshCw, Search, MapPin, 
  Eye, MessageSquare, ShieldCheck, Filter, ArrowRight, Star
} from 'lucide-react';
import { blocksData, plotInventoryData, PlotItem } from '@/data/faisalHillsData';
import LeadModal from '../ui/LeadModal';

interface InteractiveMasterPlanProps {
  initialBlockSlug?: string;
  isFullscreen?: boolean;
  defaultViewMode?: 'plots' | 'commercial';
}

interface CommercialHotspot {
  id: string;
  name: string;
  blockName: string;
  blockSlug: string;
  x: number;
  y: number;
  category: string;
  description: string;
  suitability: string;
}

const commercialHotspots: CommercialHotspot[] = [
  {
    id: 'faisal-jewel',
    name: 'Faisal Jewel Skyscraper',
    blockName: 'Executive Block',
    blockSlug: 'executive-block',
    x: 20,
    y: 35,
    category: 'Mixed-Use High-Rise',
    description: '27-story signature landmark tower featuring luxury serviced apartments, commercial retail mall, and a 4-star hotel.',
    suitability: 'Premium brand outlets, high-end cafes, luxury suites'
  },
  {
    id: 'executive-civic',
    name: 'Civic Center Commercial Boulevard',
    blockName: 'Executive Block',
    blockSlug: 'executive-block',
    x: 12,
    y: 65,
    category: 'Commercial Strip',
    description: 'Central business district with premium high-rise plazas, retail showrooms, corporate offices, and banks.',
    suitability: 'Corporate branches, lifestyle showrooms, restaurants'
  },
  {
    id: 'block-a-hub',
    name: 'Block A Main Commercial Hub',
    blockName: 'Block A',
    blockSlug: 'block-a',
    x: 35,
    y: 25,
    category: 'Retail Sector Hub',
    description: 'Fully developed retail zone near the main gate. Features branch banks, family marts, pharmacies, and the Grand Mosque.',
    suitability: 'Pharmacies, supermarkets, local clinics, retail shops'
  },
  {
    id: 'hills-walk-strip',
    name: 'Hills Walk Promenade',
    blockName: 'Block B / C',
    blockSlug: 'block-c',
    x: 55,
    y: 45,
    category: 'Pedestrian Promenade',
    description: 'European-style open-air pedestrian commercial corridor lined with retail brands, outdoor cafes, and central stream features.',
    suitability: 'Boutiques, open-air cafes, dessert parlors, corporate suites'
  },
  {
    id: 'block-c-motorway',
    name: 'Block C Commercial Zone',
    blockName: 'Block C',
    blockSlug: 'block-c',
    x: 75,
    y: 30,
    category: 'Growth Sector Commercial',
    description: 'High-growth commercial sector positioned near the M-1 Motorway corridor and central avenue junctions.',
    suitability: 'Corporate offices, medium-scale retail, rental plazas'
  },
  {
    id: 'block-d-commercial',
    name: 'Block D Retail Pocket',
    blockName: 'Block D',
    blockSlug: 'block-d',
    x: 88,
    y: 70,
    category: 'Suburban Retail',
    description: 'Fresh plot layout serving the western wing residential blocks with essential daily shops and convenience retail.',
    suitability: 'Grocery stores, laundry, local cafes, service shops'
  }
];

export default function InteractiveMasterPlan({ 
  initialBlockSlug, 
  isFullscreen = false,
  defaultViewMode = 'plots'
}: InteractiveMasterPlanProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedBlockFilter, setSelectedBlockFilter] = useState<string>(initialBlockSlug || 'all');
  const [searchPlotNumber, setSearchPlotNumber] = useState<string>('');
  const [viewMode, setViewMode] = useState<'plots' | 'commercial'>(defaultViewMode);
  
  const [activePlot, setActivePlot] = useState<PlotItem | null>(plotInventoryData[0] || null);
  const [activeHotspot, setActiveHotspot] = useState<CommercialHotspot | null>(commercialHotspots[0]);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Filter plots based on block filter and plot search query
  const filteredPlots = useMemo(() => {
    return plotInventoryData.filter(plot => {
      const matchesBlock = selectedBlockFilter === 'all' || plot.blockSlug === selectedBlockFilter;
      const matchesNumber = searchPlotNumber === '' || (plot.plotNumber && plot.plotNumber.toLowerCase().includes(searchPlotNumber.toLowerCase()));
      return matchesBlock && matchesNumber;
    });
  }, [selectedBlockFilter, searchPlotNumber]);

  // Filter hotspots based on block filter
  const filteredHotspots = useMemo(() => {
    return commercialHotspots.filter(spot => {
      return selectedBlockFilter === 'all' || spot.blockSlug === selectedBlockFilter;
    });
  }, [selectedBlockFilter]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className={`w-full bg-slate-950 rounded-3xl overflow-hidden border border-[#7b002c]/40 shadow-2xl flex flex-col ${isFullscreen ? 'min-h-[85vh]' : 'min-h-[600px]'}`}>
      
      {/* Top Map Control Bar */}
      <div className="bg-[#4c050d] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#7b002c]">
        
        {/* Left: Title & Filter */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#7b002c] border border-white/20 flex items-center justify-center text-white shrink-0 shadow">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-sans font-black text-lg sm:text-xl tracking-widest text-white uppercase leading-none">
                FAISAL HILLS
              </h3>
              <span className="text-[10px] text-slate-200 uppercase font-bold tracking-wider block mt-0.5">
                Interactive GIS Master Plan
              </span>
            </div>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex bg-slate-900/60 p-1 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => {
                setViewMode('plots');
                if (filteredPlots.length > 0) setActivePlot(filteredPlots[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'plots'
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Available Plots
            </button>
            <button
              onClick={() => {
                setViewMode('commercial');
                if (filteredHotspots.length > 0) setActiveHotspot(filteredHotspots[0]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'commercial'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>Commercial Hotspots</span>
            </button>
          </div>

          {/* Block Selector Filter */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <Filter className="w-4 h-4 text-slate-200" />
            <select
              value={selectedBlockFilter}
              onChange={(e) => setSelectedBlockFilter(e.target.value)}
              className="bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-white/30 focus:outline-none cursor-pointer shadow transition-all"
            >
              <option value="all" className="bg-[#4c050d] text-white">All Blocks</option>
              {blocksData.map(b => (
                <option key={b.id} value={b.slug} className="bg-[#4c050d] text-white">
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Search & Zoom */}
        <div className="flex items-center gap-3">
          {/* Plot Search Input (Only shown in Plots Mode) */}
          {viewMode === 'plots' && (
            <div className="relative">
              <Search className="w-4 h-4 text-slate-200 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search Plot Number..."
                value={searchPlotNumber}
                onChange={(e) => setSearchPlotNumber(e.target.value)}
                className="pl-9 pr-3 py-2 bg-[#7b002c] text-white text-xs rounded-xl border border-white/30 focus:outline-none w-48 focus:w-56 transition-all placeholder:text-slate-300 font-medium shadow"
              />
            </div>
          )}

          {/* Zoom Controls */}
          <div className="flex items-center bg-[#7b002c] rounded-xl border border-white/30 p-1 shadow">
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-white/20 text-white rounded-lg transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-white/20 text-white rounded-lg border-l border-white/20 transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 hover:bg-white/20 text-white rounded-lg border-l border-white/20 transition cursor-pointer"
              title="Reset View"
            >
              <RefreshCw className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Map Layout Area - Flex columns for sidebar layout on desktop */}
      <div className="flex-grow flex flex-col lg:flex-row h-full">
        
        {/* Left/Main Canvas Area */}
        <div className="flex-grow relative bg-slate-950 overflow-hidden flex items-center justify-center p-6 min-h-[420px] lg:w-2/3 border-b lg:border-b-0 lg:border-r border-slate-800">
          
          <div
            className="relative w-full max-w-[1100px] aspect-[16/9] transition-transform duration-300 ease-out border border-[#7b002c]/30 rounded-2xl bg-gradient-to-br from-slate-950 via-[#180309] to-slate-950 shadow-2xl overflow-hidden"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Blueprint Grid Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="plan-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e11d48" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#plan-grid)" />
            </svg>

            {/* Master Map Block Sector Vector Boundaries */}
            <div className="absolute inset-0 p-6 grid grid-cols-4 grid-rows-3 gap-3 pointer-events-none opacity-80">
              <div className="col-span-1 row-span-1 border border-rose-500/20 rounded p-1.5 text-xs flex flex-col justify-between bg-slate-950/20">
                <span className="font-serif font-bold text-white text-[10px]">Executive Block</span>
              </div>
              <div className="col-span-1 row-span-1 border border-slate-700/30 rounded p-1.5 text-xs flex flex-col justify-between bg-slate-950/20">
                <span className="font-serif font-bold text-white text-[10px]">Block A Sector</span>
              </div>
              <div className="col-span-1 row-span-1 border border-slate-700/30 rounded p-1.5 text-xs flex flex-col justify-between bg-slate-950/20">
                <span className="font-serif font-bold text-white text-[10px]">Block B Sector</span>
              </div>
              <div className="col-span-1 row-span-1 border border-slate-700/20 rounded p-1.5 text-xs flex flex-col justify-between bg-slate-950/20">
                <span className="font-serif font-bold text-slate-300 text-[10px]">B1 Extension</span>
              </div>
              <div className="col-span-1 row-span-1 border border-slate-700/30 rounded p-1.5 text-xs flex flex-col justify-between bg-slate-950/20">
                <span className="font-serif font-bold text-white text-[10px]">Block C Sector</span>
              </div>
              <div className="col-span-2 row-span-1 border border-rose-500/30 rounded p-1.5 text-xs flex flex-col justify-between bg-slate-950/30">
                <span className="font-serif font-bold text-white text-[10px]">Hills Walk Commercial</span>
              </div>
              <div className="col-span-1 row-span-1 border border-slate-700/20 rounded p-1.5 text-xs flex flex-col justify-between bg-slate-950/20">
                <span className="font-serif font-bold text-slate-300 text-[10px]">Block D</span>
              </div>
              <div className="col-span-2 row-span-1 border-2 border-[#7b002c]/50 rounded p-1.5 text-xs flex flex-col justify-between bg-slate-950/40">
                <span className="font-serif font-bold text-white text-[11px]">Prime Block (VIP Gated)</span>
              </div>
              <div className="col-span-2 row-span-1 border border-dashed border-slate-700 rounded p-1.5 text-xs flex flex-col justify-between bg-slate-950/10">
                <span className="font-serif font-bold text-slate-400 text-[10px]">Gandahara Sector</span>
              </div>
            </div>

            {/* View Mode 1: Plot Markers Overlay */}
            {viewMode === 'plots' && filteredPlots.map(plot => (
              <button
                key={plot.id}
                onClick={() => setActivePlot(plot)}
                style={{ left: `${plot.mapCoords.x}%`, top: `${plot.mapCoords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer z-20 outline-none"
              >
                {/* Glowing Pulse Ring for active plot */}
                {activePlot?.id === plot.id && (
                  <div className="absolute inset-0 w-8 h-8 -left-3.5 -top-3.5 rounded-full bg-emerald-400/50 animate-ping" />
                )}
                
                {/* Dot Marker */}
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[6px] font-bold shadow-lg transition-transform ${
                  activePlot?.id === plot.id 
                    ? 'bg-emerald-400 border-white text-slate-950 scale-125' 
                    : 'bg-[#7b002c] border-[#7b002c]/40 text-white hover:bg-emerald-500 hover:scale-110'
                }`}>
                  P
                </div>
              </button>
            ))}

            {/* View Mode 2: Commercial Hotspots Overlay */}
            {viewMode === 'commercial' && filteredHotspots.map(spot => (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot)}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer z-30 outline-none"
              >
                {/* Glowing Pulse Ring for active commercial hotspot */}
                {activeHotspot?.id === spot.id && (
                  <div className="absolute inset-0 w-10 h-10 -left-3 -top-3 rounded-full bg-amber-400/40 animate-ping" />
                )}
                
                {/* Star Icon Badge */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-lg transition-transform ${
                  activeHotspot?.id === spot.id 
                    ? 'bg-amber-400 border-white text-slate-950 scale-125' 
                    : 'bg-[#7b002c] border-white/20 text-white hover:bg-amber-500 hover:text-slate-950 hover:scale-110'
                }`}>
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </button>
            ))}

          </div>
        </div>

        {/* Right Details Drawer Sidebar Panel */}
        <div className="lg:w-1/3 bg-slate-900/60 p-6 flex flex-col justify-between space-y-6">
          
          {/* Details Content Card */}
          <div className="space-y-4">
            
            {/* Plots Mode Panel */}
            {viewMode === 'plots' && activePlot && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                    {activePlot.category}
                  </span>
                  <h4 className="font-serif font-bold text-xl text-white">Plot {activePlot.plotNumber}</h4>
                  <span className="text-xs text-slate-400 block font-semibold">{activePlot.blockName} • Size: {activePlot.size}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Dimensions:</span>
                    <span className="font-bold text-white font-serif">{activePlot.dimensions}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Price Rate:</span>
                    <span className="font-bold text-amber-400 text-sm font-serif">{activePlot.priceFormatted}</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Facing / Feature:</span>
                    <span className="font-bold text-white">{activePlot.facing}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                  {activePlot.description}
                </p>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Location Highlights:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activePlot.features.slice(0, 3).map((feat, idx) => (
                      <span key={idx} className="bg-slate-800 border border-slate-700/50 px-2 py-0.5 rounded text-[10px] text-slate-300">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Commercial Hotspots Mode Panel */}
            {viewMode === 'commercial' && activeHotspot && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/50 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                    {activeHotspot.category}
                  </span>
                  <h4 className="font-serif font-bold text-xl text-white">{activeHotspot.name}</h4>
                  <span className="text-xs text-slate-400 block font-semibold">{activeHotspot.blockName} Spot</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                  {activeHotspot.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="text-xs">
                    <span className="text-slate-400 font-bold block mb-1">Recommended Suitability:</span>
                    <span className="text-white font-medium bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/50 block">
                      {activeHotspot.suitability}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* No selection fallbacks */}
            {viewMode === 'plots' && !activePlot && (
              <p className="text-xs text-slate-400 italic">Click on any plot marker on the map canvas to view detailed pricing and coordinates.</p>
            )}
            {viewMode === 'commercial' && !activeHotspot && (
              <p className="text-xs text-slate-400 italic">Click on any commercial star pin to inspect detailed hotspot features and suitability analyses.</p>
            )}

          </div>

          {/* Bottom Actions button */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg border border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>INQUIRE ABOUT THIS PROPERTY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Lead capture modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultBlock={
          viewMode === 'commercial' && activeHotspot 
            ? activeHotspot.blockName
            : viewMode === 'plots' && activePlot 
            ? activePlot.blockName
            : 'Executive Block'
        }
        defaultPlot={
          viewMode === 'plots' && activePlot 
            ? activePlot.plotNumber 
            : viewMode === 'commercial' && activeHotspot
            ? activeHotspot.name
            : ''
        }
      />

    </div>
  );
}
