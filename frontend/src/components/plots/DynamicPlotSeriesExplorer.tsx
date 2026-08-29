'use client';

import React, { useState, useEffect } from 'react';
import {
  Home,
  Building2,
  Check,
  MessageSquare,
  Sparkles,
  Layers,
  MapPin,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  PlotItem,
  SeriesGroupResult,
  calculateSeriesGroups,
  BLOCK_SERIES_CONFIGS,
  formatPKR,
  INITIAL_PLOTS_INVENTORY,
  BlockConfig,
} from '@/utils/plotSeriesEngine';
import { getStoredPlots, getStoredBlockConfigs } from '@/utils/plotStore';

interface DynamicPlotSeriesExplorerProps {
  blockSlug?: string;
  blockName?: string;
}

const RESIDENTIAL_SIZES = ['5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal'];

const COMMERCIAL_PLOTS = [
  {
    size: '4 Marla Plaza Plot',
    dimension: '30 × 30 (100 Sq. Yds)',
    price: 'PKR 2.8 Cr – 3.5 Cr',
    frontage: 'Direct Main Boulevard Frontage (80ft+)',
    suitability: 'High-yield commercial plaza, banking hall, retail shops',
  },
  {
    size: '5.33 Marla Plaza Plot',
    dimension: '40 × 30 (133 Sq. Yds)',
    price: 'PKR 3.8 Cr – 4.8 Cr',
    frontage: 'Faisal Jewel & Roots School Avenue',
    suitability: 'Corporate offices, branded supermarket, multi-floor clinic',
  },
  {
    size: '8 Marla Commercial',
    dimension: '40 × 45 (200 Sq. Yds)',
    price: 'PKR 6.5 Cr – 8.2 Cr',
    frontage: 'Grand Entrance Boulevard Frontage (225ft)',
    suitability: 'Flagship commercial hub, showroom, multi-storey enterprise',
  },
];

export const DynamicPlotSeriesExplorer: React.FC<DynamicPlotSeriesExplorerProps> = ({
  blockSlug = 'executive-block',
  blockName = 'Executive Block',
}) => {
  const [activeCategory, setActiveCategory] = useState<'residential' | 'commercial'>('residential');
  const [selectedSize, setSelectedSize] = useState<string>('5 Marla');
  const [selectedSeriesIndex, setSelectedSeriesIndex] = useState<number>(0);
  const [selectedComPlotIndex, setSelectedComPlotIndex] = useState<number>(0);
  const [allPlots, setAllPlots] = useState<PlotItem[]>(INITIAL_PLOTS_INVENTORY);
  const [storedConfigs, setStoredConfigs] = useState<Record<string, BlockConfig> | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  const blockConfig = (isClient && storedConfigs && storedConfigs[blockSlug]) || BLOCK_SERIES_CONFIGS[blockSlug] || BLOCK_SERIES_CONFIGS['executive-block'];
  const isFixedPriceBlock = blockConfig.pricingMode === 'fixed_price';

  // Load and subscribe to real-time plots and series configs store
  useEffect(() => {
    setIsClient(true);
    setAllPlots(getStoredPlots());
    setStoredConfigs(getStoredBlockConfigs());

    const handleUpdate = () => {
      setAllPlots(getStoredPlots());
      setStoredConfigs(getStoredBlockConfigs());
    };

    window.addEventListener('fh_plots_updated', handleUpdate);
    window.addEventListener('fh_series_configs_updated', handleUpdate);
    return () => {
      window.removeEventListener('fh_plots_updated', handleUpdate);
      window.removeEventListener('fh_series_configs_updated', handleUpdate);
    };
  }, []);

  // Compute dynamic series groups for the selected size
  const currentPlots = isClient ? allPlots : INITIAL_PLOTS_INVENTORY;
  const currentConfigs = isClient && storedConfigs ? storedConfigs : BLOCK_SERIES_CONFIGS;

  const seriesGroups: SeriesGroupResult[] = calculateSeriesGroups(
    currentPlots,
    blockSlug,
    selectedSize,
    currentConfigs
  );
  const activeSeries = seriesGroups[selectedSeriesIndex] || seriesGroups[0] || null;

  // Reset series index if size changes and index is out of bounds
  useEffect(() => {
    setSelectedSeriesIndex(0);
  }, [selectedSize]);

  return (
    <div className="bg-white text-slate-900 p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      {/* Header with Title & Category Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            {blockName} Plot Price & Series Explorer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-sans">
            {isFixedPriceBlock
              ? `Explore official uniform launch rates and flexible installment schedules for ${blockName}.`
              : `Select plot size and dynamic series range below to inspect live market valuations, sector allotments, and available inventory across ${blockName}:`}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveCategory('residential')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'residential'
                ? 'bg-[#7b002c] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Residential ({isFixedPriceBlock ? 'Fixed' : 'Series'})</span>
          </button>
          <button
            onClick={() => setActiveCategory('commercial')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'commercial'
                ? 'bg-[#7b002c] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Commercial Plazas</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. FIXED PRICE MODE (PRIME BLOCK)                                         */}
      {/* ========================================================================= */}
      {isFixedPriceBlock && activeCategory === 'residential' && (
        <div className="space-y-6">
          {/* Size Pills */}
          <div className="flex flex-wrap gap-2.5">
            {RESIDENTIAL_SIZES.map((size) => {
              const cfg = blockConfig.fixedPrices?.[size];
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    selectedSize === size
                      ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-md scale-105'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{size}</span>
                </button>
              );
            })}
          </div>

          {/* Prime Block Fixed Rate Card */}
          {(() => {
            const fixedData = blockConfig.fixedPrices?.[selectedSize];
            if (!fixedData) return null;
            return (
              <div className="bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider inline-block mb-1.5 border border-emerald-200">
                      Uniform Official Launch Price
                    </span>
                    <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                      {selectedSize} Plot ({fixedData.dimensions})
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-slate-500 text-xs block font-sans">Official Fixed Price</span>
                    <strong className="text-emerald-700 font-serif font-bold text-2xl sm:text-3xl">
                      {fixedData.formattedPrice}
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
                    <span className="text-slate-500 block">Payment Schedule</span>
                    <strong className="text-slate-900 text-sm block font-serif">
                      {fixedData.installmentMonths} Months Easy Installments
                    </strong>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
                    <span className="text-slate-500 block">Quarterly Installment</span>
                    <strong className="text-[#7b002c] text-sm block font-serif">
                      {fixedData.quarterlyInstallment}
                    </strong>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
                    <span className="text-slate-500 block">NOC & Legal Status</span>
                    <strong className="text-emerald-700 text-sm block font-serif">
                      100% RDA Approved & Sanctioned
                    </strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-slate-500">
                    Prime Block offers guaranteed fixed launch rates without series fluctuations or hidden premiums.
                  </p>
                  <a
                    href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(selectedSize)}%20Fixed%20Price%20Booking%20in%20Prime%20Block.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire Fixed Booking</span>
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DYNAMIC SERIES PRICING MODE (EXECUTIVE & OTHER BLOCKS)                 */}
      {/* ========================================================================= */}
      {!isFixedPriceBlock && activeCategory === 'residential' && (
        <div className="space-y-6">
          {/* 1. Size Filter Switcher */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              1. Select Plot Size
            </span>
            <div className="flex flex-wrap gap-2.5">
              {RESIDENTIAL_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    selectedSize === size
                      ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-md scale-105'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dynamic Series Mini-Cards / Chips */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                2. Select Plot Number Series Range
              </span>
              <span className="text-[11px] text-slate-400 italic">
                {seriesGroups.length} Series Zones Configured
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2.5">
              {seriesGroups.map((grp, idx) => {
                const isSelected = selectedSeriesIndex === idx;
                return (
                  <button
                    key={grp.seriesKey}
                    onClick={() => setSelectedSeriesIndex(idx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 shadow-xs ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#7b002c] to-[#9e1245] text-white border-[#7b002c] shadow-lg scale-[1.02]'
                        : 'bg-slate-50/90 text-slate-800 border-slate-200 hover:border-[#7b002c]/50 hover:bg-rose-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-xs font-bold tracking-tight">
                        Series {grp.label}
                      </span>
                      {grp.availablePlots > 0 && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {grp.availablePlots} Avail
                        </span>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <strong
                        className={`text-xs sm:text-sm font-serif font-bold block ${
                          isSelected ? 'text-amber-300' : 'text-[#7b002c]'
                        }`}
                      >
                        {grp.formattedRange}
                      </strong>
                      <span
                        className={`text-[10px] block truncate ${
                          isSelected ? 'text-rose-100' : 'text-slate-500'
                        }`}
                      >
                        {grp.tag || `Sector ${grp.label}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Selected Series Comprehensive Detail Container */}
          {activeSeries && (
            <div className="bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#7b002c] text-xs font-bold uppercase tracking-wider block">
                      {selectedSize} Residential
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-rose-600 text-xs font-bold uppercase tracking-wider">
                      Series {activeSeries.label}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                    Series {activeSeries.label} ({activeSeries.tag})
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-slate-500 text-xs block font-sans">
                    Dynamic Resale Valuation
                  </span>
                  <strong className="text-[#7b002c] font-serif font-bold text-2xl sm:text-3xl">
                    {activeSeries.formattedRange}
                  </strong>
                </div>
              </div>

              {/* Individual Available Plots Drill-Down Chips in this Series */}
              {activeSeries.plots.length > 0 ? (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Verified Plots in Series {activeSeries.label}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Real-time inventory from database
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activeSeries.plots.map((plot) => (
                      <div
                        key={plot.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-[#7b002c] shadow-xs group hover:shadow-md transition-all flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                              Plot #{plot.plotNumber}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                plot.locationType === 'Corner + Park'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : plot.locationType === 'Park Facing'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : plot.locationType === 'Corner'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : plot.locationType === 'Main Boulevard'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {plot.locationType}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="text-slate-500 font-mono">{plot.dimensions}</span>
                            <strong className="text-[#7b002c] font-serif font-bold text-sm">
                              {formatPKR(plot.price)}
                            </strong>
                          </div>
                        </div>

                        <a
                          href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20interested%20in%20Plot%20%23${plot.plotNumber}%20(${plot.size}%2C%20Series%20${activeSeries.label}%2C%20${plot.locationType})%20in%20${encodeURIComponent(blockName)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Inquire Plot #{plot.plotNumber}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 text-center shadow-xs">
                  Plots in this series are currently on request. Contact our sales desk for offline files and direct owner allocations.
                </div>
              )}

              {/* Bottom Inquire CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  Individual plot prices reflect exact road width, facing (Corner/Park), and immediate possession status.
                </p>
                <a
                  href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(selectedSize)}%20Series%20${activeSeries.label}%20plots%20in%20${encodeURIComponent(blockName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire Series {activeSeries.label}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. COMMERCIAL EXPLORER TAB                                                */}
      {/* ========================================================================= */}
      {activeCategory === 'commercial' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2.5">
            {COMMERCIAL_PLOTS.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedComPlotIndex(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  selectedComPlotIndex === idx
                    ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-md scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{c.size}</span>
              </button>
            ))}
          </div>

          {(() => {
            const selectedComPlot = COMMERCIAL_PLOTS[selectedComPlotIndex];
            return (
              <div className="bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <span className="text-[#7b002c] text-xs font-bold uppercase tracking-wider block">
                      Commercial Plaza Plot
                    </span>
                    <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                      {selectedComPlot.dimension} ({selectedComPlot.size})
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-slate-500 text-xs block">Current Valuation</span>
                    <strong className="text-[#7b002c] font-serif font-bold text-xl sm:text-2xl">
                      {selectedComPlot.price}
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
                    <span className="text-slate-500 block">Prime Frontage</span>
                    <strong className="text-slate-900 text-sm block font-serif">
                      {selectedComPlot.frontage}
                    </strong>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
                    <span className="text-slate-500 block">Commercial Suitability</span>
                    <strong className="text-slate-900 text-sm block font-serif">
                      {selectedComPlot.suitability}
                    </strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-slate-500">
                    Direct commercial inventory near Faisal Jewel skyscraper and Roots International School.
                  </p>
                  <a
                    href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(selectedComPlot.size)}%20Commercial%20Plot%20in%20${encodeURIComponent(blockName)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire Commercial Rate</span>
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
