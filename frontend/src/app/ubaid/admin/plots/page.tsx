'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Check,
  X,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Sliders,
  DollarSign,
  Layers,
  MapPin,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  Building2,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import {
  PlotItem,
  formatPKR,
  formatPriceRange,
  BLOCK_SERIES_CONFIGS,
  calculateSeriesGroups,
  SeriesConfig,
  SeriesGroupResult,
  BlockConfig,
} from '@/utils/plotSeriesEngine';
import {
  getStoredPlots,
  addOrUpdatePlot,
  updatePlotPrice,
  deletePlot,
  resetPlotsToDefault,
  getStoredBlockConfigs,
  saveStoredBlockConfigs,
  updateSeriesConfig,
  addSeriesConfig,
  deleteSeriesConfig,
  resetSeriesConfigsToDefault,
} from '@/utils/plotStore';

const BLOCKS = [
  { slug: 'executive-block', name: 'Executive Block' },
  { slug: 'block-a', name: 'Block A' },
  { slug: 'block-b', name: 'Block B' },
  { slug: 'block-b1-extension', name: 'Block B-1 Extension' },
  { slug: 'block-c', name: 'Block C' },
  { slug: 'block-d', name: 'Block D' },
];

const SIZES = ['5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal'];

const LOCATION_TYPES: PlotItem['locationType'][] = [
  'Standard',
  'Corner',
  'Park Facing',
  'Main Boulevard',
  'Corner + Park',
  'West Open',
];

const DEFAULT_DIMENSIONS: Record<string, string> = {
  '5 Marla': '25 × 50',
  '8 Marla': '30 × 60',
  '10 Marla': '35 × 70',
  '14 Marla': '40 × 80',
  '1 Kanal': '50 × 90',
};

export default function AdminPlotsManagementPage() {
  // Main Navigation Tab: 'series_engine' (Bulk Block Series Management) | 'plots_inventory' (Individual Plots)
  const [activeAdminTab, setActiveAdminTab] = useState<'series_engine' | 'plots_inventory'>('series_engine');

  // Shared / Selected States
  const [plots, setPlots] = useState<PlotItem[]>([]);
  const [blockConfigs, setBlockConfigs] = useState<Record<string, BlockConfig>>(BLOCK_SERIES_CONFIGS);
  const [selectedBlock, setSelectedBlock] = useState<string>('block-a');
  const [selectedSize, setSelectedSize] = useState<string>('5 Marla');
  const [inventoryBlockFilter, setInventoryBlockFilter] = useState<string>('all');
  const [inventorySizeFilter, setInventorySizeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');

  // Series Edit Modal State
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState<boolean>(false);
  const [editingSeries, setEditingSeries] = useState<{
    seriesKey: string;
    start: number;
    end: number;
    label: string;
    tag: string;
    minPrice: string;
    maxPrice: string;
  } | null>(null);

  // Add New Series Modal State
  const [isAddSeriesModalOpen, setIsAddSeriesModalOpen] = useState<boolean>(false);
  const [newSeriesData, setNewSeriesData] = useState<{
    start: string;
    end: string;
    label: string;
    tag: string;
    minPrice: string;
    maxPrice: string;
  }>({
    start: '',
    end: '',
    label: '',
    tag: '',
    minPrice: '',
    maxPrice: '',
  });

  // Plot Edit / Add Modal State
  const [isPlotModalOpen, setIsPlotModalOpen] = useState<boolean>(false);
  const [editingPlot, setEditingPlot] = useState<PlotItem | null>(null);
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlinePrice, setInlinePrice] = useState<string>('');

  const [plotFormData, setPlotFormData] = useState<{
    plotNumber: string;
    blockSlug: string;
    category: 'residential' | 'commercial';
    size: string;
    dimensions: string;
    price: string;
    locationType: PlotItem['locationType'];
    status: 'available' | 'reserved' | 'sold';
    features: string;
    suitability: string;
  }>({
    plotNumber: '',
    blockSlug: 'executive-block',
    category: 'residential',
    size: '5 Marla',
    dimensions: '25 × 50',
    price: '',
    locationType: 'Standard',
    status: 'available',
    features: 'Underground Utilities, Carpeted Road',
    suitability: 'Immediate Construction',
  });

  // Load from store & subscribe to updates
  useEffect(() => {
    setPlots(getStoredPlots());
    setBlockConfigs(getStoredBlockConfigs());

    const handleUpdate = () => {
      setPlots(getStoredPlots());
      setBlockConfigs(getStoredBlockConfigs());
    };

    window.addEventListener('fh_plots_updated', handleUpdate);
    window.addEventListener('fh_series_configs_updated', handleUpdate);
    return () => {
      window.removeEventListener('fh_plots_updated', handleUpdate);
      window.removeEventListener('fh_series_configs_updated', handleUpdate);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Get active block name
  const currentBlockName = BLOCKS.find((b) => b.slug === selectedBlock)?.name || 'Executive Block';

  // Get dynamic series groups for the selected block & size
  const currentSeriesGroups: SeriesGroupResult[] = calculateSeriesGroups(
    plots,
    selectedBlock,
    selectedSize,
    blockConfigs
  );

  // ----------------------------------------------------
  // SERIES MANAGEMENT HANDLERS
  // ----------------------------------------------------

  const handleOpenEditSeries = (series: SeriesGroupResult) => {
    const rawMin = series.minPrice > 0 ? series.minPrice.toString() : '';
    const rawMax = series.maxPrice > 0 ? series.maxPrice.toString() : '';

    setEditingSeries({
      seriesKey: series.seriesKey,
      start: series.rangeStart,
      end: series.rangeEnd,
      label: series.label,
      tag: series.tag || '',
      minPrice: rawMin,
      maxPrice: rawMax,
    });
    setIsSeriesModalOpen(true);
  };

  const handleSaveSeries = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSeries) return;

    const minP = parseFloat(editingSeries.minPrice) || 0;
    const maxP = parseFloat(editingSeries.maxPrice) || minP;

    if (minP < 0 || maxP < 0) {
      alert('Prices cannot be negative.');
      return;
    }

    const updated = updateSeriesConfig(selectedBlock, selectedSize, editingSeries.seriesKey, {
      tag: editingSeries.tag,
      label: editingSeries.label,
      minPrice: minP,
      maxPrice: maxP,
    });

    setBlockConfigs(updated);
    setPlots(getStoredPlots());
    setIsSeriesModalOpen(false);
    showToast(
      `Series ${editingSeries.label} in ${currentBlockName} (${selectedSize}) updated to ${formatPriceRange(minP, maxP)}!`
    );
  };

  const handleOpenAddSeries = () => {
    setNewSeriesData({
      start: '',
      end: '',
      label: '',
      tag: 'New Sector Avenue',
      minPrice: '5500000',
      maxPrice: '6500000',
    });
    setIsAddSeriesModalOpen(true);
  };

  const handleSaveNewSeries = (e: React.FormEvent) => {
    e.preventDefault();
    const startNum = parseInt(newSeriesData.start, 10);
    const endNum = parseInt(newSeriesData.end, 10);
    const minP = parseFloat(newSeriesData.minPrice) || 0;
    const maxP = parseFloat(newSeriesData.maxPrice) || minP;

    if (isNaN(startNum) || isNaN(endNum) || startNum <= 0 || endNum < startNum) {
      alert('Please enter valid start and end plot numbers (e.g. Start: 401, End: 600).');
      return;
    }

    const label = newSeriesData.label.trim() || `${startNum}–${endNum}`;
    const newConfig: SeriesConfig = {
      start: startNum,
      end: endNum,
      label,
      tag: newSeriesData.tag || 'Sector Avenue',
      minPrice: minP,
      maxPrice: maxP,
    };

    const updated = addSeriesConfig(selectedBlock, selectedSize, newConfig);
    setBlockConfigs(updated);

    // Also trigger updateSeriesConfig to seed sample plots with this price range
    updateSeriesConfig(selectedBlock, selectedSize, `${startNum}-${endNum}`, {
      minPrice: minP,
      maxPrice: maxP,
      tag: newConfig.tag,
    });

    setPlots(getStoredPlots());
    setIsAddSeriesModalOpen(false);
    showToast(`New Series ${label} added to ${currentBlockName} (${selectedSize})!`);
  };

  const handleDeleteSeries = (seriesKey: string, label: string) => {
    if (confirm(`Are you sure you want to delete Series ${label} from ${currentBlockName} (${selectedSize})?`)) {
      const updated = deleteSeriesConfig(selectedBlock, selectedSize, seriesKey);
      setBlockConfigs(updated);
      showToast(`Series ${label} deleted.`);
    }
  };

  const handleResetAllSeries = () => {
    if (confirm('Reset all block series configurations & prices to default? Custom series edits will be reset.')) {
      const reset = resetSeriesConfigsToDefault();
      setBlockConfigs(reset);
      showToast('All Block Series reset to default configurations.');
    }
  };

  // ----------------------------------------------------
  // INDIVIDUAL PLOTS MANAGEMENT HANDLERS
  // ----------------------------------------------------

  const filteredPlots = plots.filter((p) => {
    if (inventoryBlockFilter !== 'all' && p.blockSlug !== inventoryBlockFilter) return false;
    if (inventorySizeFilter !== 'all' && p.size !== inventorySizeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const plotNumMatch = p.plotNumber.toString().includes(q);
      const locMatch = p.locationType.toLowerCase().includes(q);
      const sizeMatch = p.size.toLowerCase().includes(q);
      if (!plotNumMatch && !locMatch && !sizeMatch) return false;
    }
    return true;
  });

  const handleOpenAddPlot = () => {
    setEditingPlot(null);
    setPlotFormData({
      plotNumber: '',
      blockSlug: selectedBlock,
      category: 'residential',
      size: selectedSize,
      dimensions: DEFAULT_DIMENSIONS[selectedSize] || '25 × 50',
      price: '',
      locationType: 'Standard',
      status: 'available',
      features: 'Underground Utilities, Carpeted Road, Instant Possession',
      suitability: 'Family Residence',
    });
    setIsPlotModalOpen(true);
  };

  const handleOpenEditPlot = (plot: PlotItem) => {
    setEditingPlot(plot);
    setPlotFormData({
      plotNumber: plot.plotNumber.toString(),
      blockSlug: plot.blockSlug,
      category: plot.category,
      size: plot.size,
      dimensions: plot.dimensions,
      price: plot.price.toString(),
      locationType: plot.locationType,
      status: plot.status,
      features: plot.features.join(', '),
      suitability: plot.suitability || '',
    });
    setIsPlotModalOpen(true);
  };

  const handleSavePlotForm = (e: React.FormEvent) => {
    e.preventDefault();
    const plotNum = parseInt(plotFormData.plotNumber);
    const priceNum = parseFloat(plotFormData.price);

    if (isNaN(plotNum) || plotNum <= 0) {
      alert('Please enter a valid numeric plot number.');
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Please enter a valid demand price in PKR.');
      return;
    }

    const bName = BLOCKS.find((b) => b.slug === plotFormData.blockSlug)?.name || 'Executive Block';

    const newPlot: PlotItem = {
      id: editingPlot
        ? editingPlot.id
        : `${plotFormData.blockSlug}-${plotFormData.size.toLowerCase().replace(/\s+/g, '')}-${plotNum}`,
      plotNumber: plotNum,
      blockSlug: plotFormData.blockSlug,
      blockName: bName,
      category: plotFormData.category,
      size: plotFormData.size,
      dimensions: plotFormData.dimensions || DEFAULT_DIMENSIONS[plotFormData.size] || '25 × 50',
      price: priceNum,
      locationType: plotFormData.locationType,
      status: plotFormData.status,
      features: plotFormData.features
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
      suitability: plotFormData.suitability,
      demandRange: '+14% Active ROI',
    };

    addOrUpdatePlot(newPlot);
    setIsPlotModalOpen(false);
    showToast(`Plot #${plotNum} in ${bName} saved! Series price updated.`);
  };

  const handleSaveInlinePrice = (plotId: string) => {
    const val = parseFloat(inlinePrice);
    if (!isNaN(val) && val > 0) {
      updatePlotPrice(plotId, val);
      setInlineEditingId(null);
      showToast('Plot price updated & series range auto-recalculated!');
    }
  };

  const handleDeletePlot = (plot: PlotItem) => {
    if (confirm(`Are you sure you want to delete Plot #${plot.plotNumber} (${plot.size})?`)) {
      deletePlot(plot.id);
      showToast(`Plot #${plot.plotNumber} deleted.`);
    }
  };

  const handleResetPlotsInventory = () => {
    if (confirm('Reset all plots to original default seed inventory? Any custom plot edits will be overwritten.')) {
      resetPlotsToDefault();
      showToast('Plots inventory reset to defaults.');
    }
  };

  const getSeriesBadge = (plot: PlotItem) => {
    const currentConfigs = getStoredBlockConfigs();
    const bConfig = currentConfigs[plot.blockSlug];
    if (!bConfig) return <span className="text-slate-500 text-xs italic">Unassigned</span>;

    const seriesList = bConfig.seriesConfigs?.[plot.size] || [];
    const matched = seriesList.find((s) => plot.plotNumber >= s.start && plot.plotNumber <= s.end);
    if (matched) {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
          Series {matched.label}
        </span>
      );
    }
    return <span className="text-slate-500 text-xs italic">Unassigned Range</span>;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 lg:p-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce border border-emerald-400/40">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header & Quick Links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <Link
                href={`/blocks/${selectedBlock}`}
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                target="_blank"
              >
                <span>View {currentBlockName} Public Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white flex items-center gap-3 flex-wrap">
              <span>Superadmin Series & Price Engine</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#7b002c] text-white font-sans font-bold shadow-md">
                Live Dynamic Sync
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Directly edit series price ranges, sector names, and plot valuations across all Faisal Hills blocks.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleResetAllSeries}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 transition-all flex items-center gap-2 cursor-pointer"
              title="Reset all series to default values"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleOpenAddSeries}
              className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Series Range</span>
            </button>
          </div>
        </div>

        {/* Master Admin Mode Switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 w-fit">
          <button
            onClick={() => setActiveAdminTab('series_engine')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeAdminTab === 'series_engine'
                ? 'bg-[#7b002c] text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Block Series & Price Engine</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('plots_inventory')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeAdminTab === 'plots_inventory'
                ? 'bg-[#7b002c] text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Individual Plots Inventory ({plots.length})</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: BLOCK SERIES & PRICE ENGINE (PRIMARY BULK MANAGEMENT)             */}
        {/* ========================================================================= */}
        {activeAdminTab === 'series_engine' && (
          <div className="space-y-8">
            {/* Block Selector Strip */}
            <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Step 1: Select Faisal Hills Block to Edit
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  Currently Editing: <strong className="text-amber-300">{currentBlockName}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {BLOCKS.map((b) => (
                  <button
                    key={b.slug}
                    onClick={() => setSelectedBlock(b.slug)}
                    className={`px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer border ${
                      selectedBlock === b.slug
                        ? 'bg-[#7b002c] text-white border-rose-500/60 shadow-lg scale-102 ring-2 ring-rose-500/30'
                        : 'bg-slate-950/80 text-slate-400 hover:text-white border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span className="block font-serif text-sm">{b.name}</span>
                    <span className="text-[10px] text-slate-400 font-sans font-normal">
                      Series Configured
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Plot Size Selector Strip */}
            <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Step 2: Select Plot Size for {currentBlockName}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                      selectedSize === sz
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-extrabold'
                        : 'bg-slate-950 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>{sz}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Series Cards Grid */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <span>{currentBlockName} • {selectedSize} Series Ranges</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-sans font-normal">
                      {currentSeriesGroups.length} Series Configured
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Click <strong>&quot;Edit Price &amp; Tag&quot;</strong> on any series card below to change its live market price range.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddSeries}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Series Range</span>
                </button>
              </div>

              {currentSeriesGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {currentSeriesGroups.map((series) => (
                    <div
                      key={series.seriesKey}
                      className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-rose-500/50 transition-all flex flex-col justify-between space-y-4 group shadow-md"
                    >
                      {/* Top Header of Card */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7b002c] text-white">
                            Series {series.label}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            Plot #{series.rangeStart} – #{series.rangeEnd}
                          </span>
                        </div>

                        <h4 className="font-semibold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                          {series.tag || 'Sector Enclave'}
                        </h4>
                      </div>

                      {/* Middle Price Range Box */}
                      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800/80 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                          Current Live Market Price Range
                        </span>
                        <div className="font-serif text-lg font-bold text-emerald-400">
                          {series.formattedRange}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                          <span>Active Plots: {series.totalPlots}</span>
                          <span className="text-emerald-400 font-bold">{series.availablePlots} Available</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                        <button
                          onClick={() => handleOpenEditSeries(series)}
                          className="flex-1 py-2.5 px-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit Price &amp; Tag</span>
                        </button>
                        <button
                          onClick={() => handleDeleteSeries(series.seriesKey, series.label)}
                          className="p-2.5 bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 rounded-xl transition-all cursor-pointer border border-slate-800 hover:border-rose-800"
                          title="Delete this series range"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">No Series Configured for {selectedSize} in {currentBlockName}</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Click the button below to add your first series range (e.g. Series 001–200, Series 201–400) and configure its price.
                  </p>
                  <button
                    onClick={handleOpenAddSeries}
                    className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add First Series Range</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INDIVIDUAL PLOTS INVENTORY (FULL DATABASE & PLOT CRUD)            */}
        {/* ========================================================================= */}
        {activeAdminTab === 'plots_inventory' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Block Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold">Block:</span>
                    <select
                      value={inventoryBlockFilter}
                      onChange={(e) => setInventoryBlockFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                    >
                      <option value="all">All Blocks</option>
                      {BLOCKS.map((b) => (
                        <option key={b.slug} value={b.slug}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Size Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold">Size:</span>
                    <select
                      value={inventorySizeFilter}
                      onChange={(e) => setInventorySizeFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                    >
                      <option value="all">All Sizes</option>
                      {SIZES.map((sz) => (
                        <option key={sz} value={sz}>
                          {sz}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search & Add New Plot */}
                <div className="flex items-center gap-2.5">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search plot #, corner..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <button
                    onClick={handleOpenAddPlot}
                    className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Plot</span>
                  </button>
                  <button
                    onClick={handleResetPlotsInventory}
                    className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-all cursor-pointer"
                    title="Reset plot inventory to defaults"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Plots Data Table */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Plot #</th>
                      <th className="p-4">Block</th>
                      <th className="p-4">Size &amp; Dimensions</th>
                      <th className="p-4">Assigned Series</th>
                      <th className="p-4">Location Tag</th>
                      <th className="p-4">Demand Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {filteredPlots.length > 0 ? (
                      filteredPlots.map((plot) => {
                        const isInline = inlineEditingId === plot.id;
                        return (
                          <tr key={plot.id} className="hover:bg-slate-800/40 transition-colors">
                            {/* Plot # */}
                            <td className="p-4 font-mono font-bold text-white text-sm">
                              #{plot.plotNumber}
                            </td>

                            {/* Block */}
                            <td className="p-4">
                              <span className="font-semibold text-slate-200">{plot.blockName}</span>
                            </td>

                            {/* Size & Dimensions */}
                            <td className="p-4">
                              <div className="space-y-0.5">
                                <strong className="text-white block">{plot.size}</strong>
                                <span className="text-[11px] text-slate-500 font-mono">
                                  {plot.dimensions}
                                </span>
                              </div>
                            </td>

                            {/* Assigned Series */}
                            <td className="p-4">{getSeriesBadge(plot)}</td>

                            {/* Location Tag */}
                            <td className="p-4">
                              <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-[11px]">
                                {plot.locationType}
                              </span>
                            </td>

                            {/* Demand Price */}
                            <td className="p-4">
                              {isInline ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={inlinePrice}
                                    onChange={(e) => setInlinePrice(e.target.value)}
                                    className="w-28 px-2 py-1 bg-slate-950 border border-rose-500 text-white rounded text-xs focus:outline-none"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => handleSaveInlinePrice(plot.id)}
                                    className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer"
                                  >
                                    <Check className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => setInlineEditingId(null)}
                                    className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded cursor-pointer"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    setInlineEditingId(plot.id);
                                    setInlinePrice(plot.price.toString());
                                  }}
                                  className="group cursor-pointer flex items-center gap-1.5 hover:text-amber-300 transition-colors"
                                  title="Click to quick-edit price"
                                >
                                  <strong className="font-serif text-sm font-bold text-amber-400 group-hover:underline">
                                    {formatPKR(plot.price)}
                                  </strong>
                                  <Edit2 className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              )}
                            </td>

                            {/* Status */}
                            <td className="p-4">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  plot.status === 'available'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : plot.status === 'reserved'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                }`}
                              >
                                {plot.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditPlot(plot)}
                                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                                  title="Edit full plot details"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeletePlot(plot)}
                                  className="p-1.5 bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-rose-200 rounded-lg transition-colors cursor-pointer"
                                  title="Delete plot"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500">
                          No plots match your filter or search query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT SERIES PRICE & TAG                                          */}
      {/* ========================================================================= */}
      {isSeriesModalOpen && editingSeries && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  {currentBlockName} • {selectedSize}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Edit Series {editingSeries.label} Price &amp; Tag
                </h3>
              </div>
              <button
                onClick={() => setIsSeriesModalOpen(false)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSeries} className="space-y-5">
              {/* Series Label & Range Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Display Label</label>
                  <input
                    type="text"
                    value={editingSeries.label}
                    onChange={(e) =>
                      setEditingSeries({ ...editingSeries, label: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                    placeholder="e.g. 001–200"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Plot Range</label>
                  <div className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs text-slate-400 font-mono">
                    #{editingSeries.start} to #{editingSeries.end}
                  </div>
                </div>
              </div>

              {/* Sector / Zone Tag */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Sector / Zone Title (Tag)
                </label>
                <input
                  type="text"
                  value={editingSeries.tag}
                  onChange={(e) =>
                    setEditingSeries({ ...editingSeries, tag: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  placeholder="e.g. Main Boulevard Front, Central Commercial Sector..."
                  required
                />
              </div>

              {/* Min and Max Prices in PKR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Min Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={editingSeries.minPrice}
                    onChange={(e) =>
                      setEditingSeries({ ...editingSeries, minPrice: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                    placeholder="e.g. 5800000"
                    required
                  />
                  <span className="text-[11px] text-emerald-400 font-mono block">
                    {formatPKR(parseFloat(editingSeries.minPrice) || 0)}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Max Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={editingSeries.maxPrice}
                    onChange={(e) =>
                      setEditingSeries({ ...editingSeries, maxPrice: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                    placeholder="e.g. 6800000"
                    required
                  />
                  <span className="text-[11px] text-emerald-400 font-mono block">
                    {formatPKR(parseFloat(editingSeries.maxPrice) || 0)}
                  </span>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                  Public Explorer Preview
                </span>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-200">
                    Series {editingSeries.label} ({editingSeries.tag || 'Sector'})
                  </span>
                  <span className="text-amber-300 font-serif text-sm">
                    {formatPriceRange(
                      parseFloat(editingSeries.minPrice) || 0,
                      parseFloat(editingSeries.maxPrice) || 0
                    )}
                  </span>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSeriesModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer hover:scale-105"
                >
                  Save Series Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD NEW SERIES RANGE                                             */}
      {/* ========================================================================= */}
      {isAddSeriesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {currentBlockName} • {selectedSize}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Add New Series Range
                </h3>
              </div>
              <button
                onClick={() => setIsAddSeriesModalOpen(false)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewSeries} className="space-y-5">
              {/* Start and End Plot Numbers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Start Plot #</label>
                  <input
                    type="number"
                    value={newSeriesData.start}
                    onChange={(e) =>
                      setNewSeriesData({
                        ...newSeriesData,
                        start: e.target.value,
                        label: `${e.target.value}–${newSeriesData.end || ''}`,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. 401"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">End Plot #</label>
                  <input
                    type="number"
                    value={newSeriesData.end}
                    onChange={(e) =>
                      setNewSeriesData({
                        ...newSeriesData,
                        end: e.target.value,
                        label: `${newSeriesData.start || ''}–${e.target.value}`,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. 600"
                    required
                  />
                </div>
              </div>

              {/* Display Label & Sector Tag */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Display Label</label>
                  <input
                    type="text"
                    value={newSeriesData.label}
                    onChange={(e) =>
                      setNewSeriesData({ ...newSeriesData, label: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. 401–600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Sector Tag</label>
                  <input
                    type="text"
                    value={newSeriesData.tag}
                    onChange={(e) =>
                      setNewSeriesData({ ...newSeriesData, tag: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Margalla View Crest"
                    required
                  />
                </div>
              </div>

              {/* Min and Max Prices */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Min Price (PKR)</label>
                  <input
                    type="number"
                    value={newSeriesData.minPrice}
                    onChange={(e) =>
                      setNewSeriesData({ ...newSeriesData, minPrice: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. 5500000"
                    required
                  />
                  <span className="text-[11px] text-emerald-400 font-mono block">
                    {formatPKR(parseFloat(newSeriesData.minPrice) || 0)}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Max Price (PKR)</label>
                  <input
                    type="number"
                    value={newSeriesData.maxPrice}
                    onChange={(e) =>
                      setNewSeriesData({ ...newSeriesData, maxPrice: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. 6500000"
                    required
                  />
                  <span className="text-[11px] text-emerald-400 font-mono block">
                    {formatPKR(parseFloat(newSeriesData.maxPrice) || 0)}
                  </span>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSeriesModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer hover:scale-105"
                >
                  Add Series Range
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD OR EDIT INDIVIDUAL PLOT                                      */}
      {/* ========================================================================= */}
      {isPlotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {editingPlot ? `Edit Plot #${editingPlot.plotNumber}` : 'Add New Plot to Inventory'}
              </h3>
              <button
                onClick={() => setIsPlotModalOpen(false)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePlotForm} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Plot Number</label>
                  <input
                    type="number"
                    value={plotFormData.plotNumber}
                    onChange={(e) =>
                      setPlotFormData({ ...plotFormData, plotNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                    placeholder="e.g. 105"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Block</label>
                  <select
                    value={plotFormData.blockSlug}
                    onChange={(e) =>
                      setPlotFormData({ ...plotFormData, blockSlug: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    {BLOCKS.map((b) => (
                      <option key={b.slug} value={b.slug}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Plot Size</label>
                  <select
                    value={plotFormData.size}
                    onChange={(e) => {
                      const sz = e.target.value;
                      setPlotFormData({
                        ...plotFormData,
                        size: sz,
                        dimensions: DEFAULT_DIMENSIONS[sz] || '25 × 50',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    {SIZES.map((sz) => (
                      <option key={sz} value={sz}>
                        {sz}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Demand Price (PKR)</label>
                  <input
                    type="number"
                    value={plotFormData.price}
                    onChange={(e) =>
                      setPlotFormData({ ...plotFormData, price: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                    placeholder="e.g. 6800000"
                    required
                  />
                  <span className="text-[11px] text-emerald-400 font-mono block">
                    {formatPKR(parseFloat(plotFormData.price) || 0)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Location Type</label>
                  <select
                    value={plotFormData.locationType}
                    onChange={(e) =>
                      setPlotFormData({
                        ...plotFormData,
                        locationType: e.target.value as PlotItem['locationType'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    {LOCATION_TYPES.map((lt) => (
                      <option key={lt} value={lt}>
                        {lt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Status</label>
                  <select
                    value={plotFormData.status}
                    onChange={(e) =>
                      setPlotFormData({
                        ...plotFormData,
                        status: e.target.value as 'available' | 'reserved' | 'sold',
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={plotFormData.features}
                  onChange={(e) =>
                    setPlotFormData({ ...plotFormData, features: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  placeholder="e.g. Underground Utilities, Carpeted Road, Instant Possession"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Suitability Note</label>
                <input
                  type="text"
                  value={plotFormData.suitability}
                  onChange={(e) =>
                    setPlotFormData({ ...plotFormData, suitability: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  placeholder="e.g. Immediate Construction, Family Residence"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPlotModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer hover:scale-105"
                >
                  Save Plot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
