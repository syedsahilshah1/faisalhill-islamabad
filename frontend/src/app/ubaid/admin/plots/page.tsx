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
} from 'lucide-react';
import {
  PlotItem,
  formatPKR,
  BLOCK_SERIES_CONFIGS,
  calculateSeriesGroups,
} from '@/utils/plotSeriesEngine';
import {
  getStoredPlots,
  addOrUpdatePlot,
  updatePlotPrice,
  deletePlot,
  resetPlotsToDefault,
} from '@/utils/plotStore';

const BLOCKS = [
  { slug: 'all', name: 'All Blocks' },
  { slug: 'executive-block', name: 'Executive Block (Dynamic Series)' },
  { slug: 'prime-block', name: 'Prime Block (Fixed Price)' },
  { slug: 'block-a', name: 'Block A (Dynamic)' },
  { slug: 'block-b', name: 'Block B' },
  { slug: 'block-c', name: 'Block C' },
  { slug: 'block-d', name: 'Block D' },
];

const SIZES = ['5 Marla', '8 Marla', '10 Marla', '14 Marla', '1 Kanal', 'Commercial 4 Marla', 'Commercial 5.33 Marla'];

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
  'Commercial 4 Marla': '30 × 30',
  'Commercial 5.33 Marla': '40 × 30',
};

export default function AdminPlotsManagementPage() {
  const [plots, setPlots] = useState<PlotItem[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string>('executive-block');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPlot, setEditingPlot] = useState<PlotItem | null>(null);
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlinePrice, setInlinePrice] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');

  // Form states for modal
  const [formData, setFormData] = useState<{
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

  useEffect(() => {
    setPlots(getStoredPlots());
    const handleUpdate = () => {
      setPlots(getStoredPlots());
    };
    window.addEventListener('fh_plots_updated', handleUpdate);
    return () => window.removeEventListener('fh_plots_updated', handleUpdate);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Filtered plots list
  const filteredPlots = plots.filter((p) => {
    if (selectedBlock !== 'all' && p.blockSlug !== selectedBlock) return false;
    if (selectedSize !== 'all' && p.size !== selectedSize) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const plotNumMatch = p.plotNumber.toString().includes(q);
      const locMatch = p.locationType.toLowerCase().includes(q);
      const sizeMatch = p.size.toLowerCase().includes(q);
      if (!plotNumMatch && !locMatch && !sizeMatch) return false;
    }
    return true;
  });

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingPlot(null);
    setFormData({
      plotNumber: '',
      blockSlug: selectedBlock !== 'all' ? selectedBlock : 'executive-block',
      category: 'residential',
      size: '5 Marla',
      dimensions: DEFAULT_DIMENSIONS['5 Marla'],
      price: '',
      locationType: 'Standard',
      status: 'available',
      features: 'Underground Utilities, Carpeted Road, Instant Possession',
      suitability: 'Family Residence',
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (plot: PlotItem) => {
    setEditingPlot(plot);
    setFormData({
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
    setIsModalOpen(true);
  };

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const plotNum = parseInt(formData.plotNumber);
    const priceNum = parseFloat(formData.price);

    if (isNaN(plotNum) || plotNum <= 0) {
      alert('Please enter a valid numeric plot number.');
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      alert('Please enter a valid demand price in PKR.');
      return;
    }

    const blockName =
      BLOCKS.find((b) => b.slug === formData.blockSlug)?.name.split(' (')[0] ||
      'Executive Block';

    const newPlot: PlotItem = {
      id: editingPlot ? editingPlot.id : `${formData.blockSlug}-${formData.size.toLowerCase().replace(/\s+/g, '')}-${plotNum}`,
      plotNumber: plotNum,
      blockSlug: formData.blockSlug,
      blockName,
      category: formData.category,
      size: formData.size,
      dimensions: formData.dimensions || DEFAULT_DIMENSIONS[formData.size] || '25 × 50',
      price: priceNum,
      locationType: formData.locationType,
      status: formData.status,
      features: formData.features
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
      suitability: formData.suitability,
      demandRange: '+14% Active ROI',
    };

    addOrUpdatePlot(newPlot);
    setIsModalOpen(false);
    showToast(`Plot #${plotNum} in ${blockName} saved successfully! Series pricing updated.`);
  };

  // Handle Inline Quick Price Save
  const handleSaveInlinePrice = (plotId: string) => {
    const val = parseFloat(inlinePrice);
    if (!isNaN(val) && val > 0) {
      updatePlotPrice(plotId, val);
      setInlineEditingId(null);
      showToast('Plot price updated & series range auto-recalculated!');
    }
  };

  // Handle Delete
  const handleDelete = (plot: PlotItem) => {
    if (confirm(`Are you sure you want to delete Plot #${plot.plotNumber} (${plot.size})?`)) {
      deletePlot(plot.id);
      showToast(`Plot #${plot.plotNumber} deleted.`);
    }
  };

  // Reset to default seed
  const handleReset = () => {
    if (confirm('Reset all plots to original default seed inventory? Any custom changes will be overwritten.')) {
      resetPlotsToDefault();
      showToast('Plots inventory reset to defaults.');
    }
  };

  // Helper to find which series a plot belongs to
  const getSeriesBadge = (plot: PlotItem) => {
    const blockConfig = BLOCK_SERIES_CONFIGS[plot.blockSlug];
    if (!blockConfig || blockConfig.pricingMode === 'fixed_price') {
      return <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Fixed Launch Rate</span>;
    }
    const seriesList = blockConfig.seriesConfigs?.[plot.size] || [];
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

  // Series preview for Executive 5M
  const executive5MSeries = calculateSeriesGroups(plots, 'executive-block', '5 Marla');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 lg:p-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1">
            <Link
              href="/blocks/executive-block"
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Executive Block Live View</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white flex items-center gap-3">
              <span>Admin Plots & Series Manager</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#7b002c] text-white font-sans font-bold">
                Live Sync Active
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Manage plot inventories, individual demand rates, and watch series price ranges update automatically.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Plot</span>
            </button>
          </div>
        </div>

        {/* Live Executive 5M Series Overview Mini-Bar */}
        <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800/90 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Live Auto-Computed Series Ranges (Executive 5 Marla)
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Updates in real-time when you change plot prices below
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {executive5MSeries.map((s) => (
              <div
                key={s.seriesKey}
                className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 text-center space-y-0.5"
              >
                <span className="text-[10px] font-mono text-slate-400 block">{s.label}</span>
                <strong className="text-xs font-serif font-bold text-amber-400 block">
                  {s.formattedRange}
                </strong>
                <span className="text-[9px] text-slate-500 block">{s.availablePlots} plots</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-slate-900/70 p-5 rounded-3xl border border-slate-800 space-y-4">
          {/* Block Selection Tabs */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Filter by Block
            </span>
            <div className="flex flex-wrap gap-2">
              {BLOCKS.map((b) => (
                <button
                  key={b.slug}
                  onClick={() => setSelectedBlock(b.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedBlock === b.slug
                      ? 'bg-[#7b002c] text-white shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
            {/* Size Filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs text-slate-400 font-bold shrink-0">Size:</span>
              <button
                onClick={() => setSelectedSize('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedSize === 'all'
                    ? 'bg-white text-slate-900'
                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                All Sizes
              </button>
              {SIZES.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedSize === sz
                      ? 'bg-white text-slate-900'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search plot #, corner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
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
                  <th className="p-4">Size & Dimensions</th>
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

                        {/* Location Type */}
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              plot.locationType === 'Corner + Park'
                                ? 'bg-rose-500/20 text-rose-300'
                                : plot.locationType === 'Park Facing'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : plot.locationType === 'Corner'
                                ? 'bg-amber-500/20 text-amber-300'
                                : plot.locationType === 'Main Boulevard'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {plot.locationType}
                          </span>
                        </td>

                        {/* Demand Price with Quick Inline Editor */}
                        <td className="p-4">
                          {isInline ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                value={inlinePrice}
                                onChange={(e) => setInlinePrice(e.target.value)}
                                className="w-28 px-2 py-1 bg-slate-950 border border-rose-500 rounded-lg text-xs text-white focus:outline-none"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveInlinePrice(plot.id)}
                                className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md cursor-pointer"
                                title="Save"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setInlineEditingId(null)}
                                className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md cursor-pointer"
                                title="Cancel"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setInlineEditingId(plot.id);
                                setInlinePrice(plot.price.toString());
                              }}
                              className="group flex items-center gap-1.5 cursor-pointer"
                              title="Click to edit price directly"
                            >
                              <strong className="font-serif font-bold text-amber-400 text-sm group-hover:underline">
                                {formatPKR(plot.price)}
                              </strong>
                              <Edit2 className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              plot.status === 'available'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : plot.status === 'reserved'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {plot.status.toUpperCase()}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(plot)}
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
                              title="Edit plot details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(plot)}
                              className="p-1.5 bg-slate-800 hover:bg-rose-900/50 text-rose-300 rounded-lg transition-colors cursor-pointer"
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
                      No plots match the selected filters. Click &ldquo;Add New Plot&rdquo; to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Showing {filteredPlots.length} of {plots.length} total plots in database</span>
            <span>All price changes dynamically sync with frontend live series matrix</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ADD / EDIT PLOT MODAL                                                     */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif font-bold text-xl text-white">
                {editingPlot ? `Edit Plot #${editingPlot.plotNumber}` : 'Add New Plot to Inventory'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                {/* Plot Number */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Plot Number (Numeric)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 412"
                    value={formData.plotNumber}
                    onChange={(e) => setFormData({ ...formData, plotNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Block */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Block</label>
                  <select
                    value={formData.blockSlug}
                    onChange={(e) => setFormData({ ...formData, blockSlug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  >
                    {BLOCKS.filter((b) => b.slug !== 'all').map((b) => (
                      <option key={b.slug} value={b.slug}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Size */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Plot Size</label>
                  <select
                    value={formData.size}
                    onChange={(e) => {
                      const sz = e.target.value;
                      setFormData({
                        ...formData,
                        size: sz,
                        dimensions: DEFAULT_DIMENSIONS[sz] || formData.dimensions,
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  >
                    {SIZES.map((sz) => (
                      <option key={sz} value={sz}>
                        {sz}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dimensions */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Demand Price */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-400 font-bold">Demand Price (PKR)</label>
                  {formData.price && !isNaN(parseFloat(formData.price)) && (
                    <span className="text-amber-400 font-serif font-bold text-xs">
                      Preview: {formatPKR(parseFloat(formData.price))}
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  required
                  placeholder="e.g. 7200000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Location Type */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Location Tag</label>
                  <select
                    value={formData.locationType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        locationType: e.target.value as PlotItem['locationType'],
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  >
                    {LOCATION_TYPES.map((lt) => (
                      <option key={lt} value={lt}>
                        {lt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Allotment Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as PlotItem['status'],
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Features (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold rounded-xl shadow-lg cursor-pointer"
                >
                  {editingPlot ? 'Update Plot' : 'Create Plot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
