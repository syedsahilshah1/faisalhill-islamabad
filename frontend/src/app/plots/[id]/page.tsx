'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  plotInventoryData,
  blocksData,
  PlotItem,
  fetchPlots
} from '@/data/faisalHillsData';
import {
  MapPin,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Share2,
  Calendar,
  Layers,
  ChevronRight,
  Home,
  Check,
  Maximize2
} from 'lucide-react';
import LeadModal from '@/components/ui/LeadModal';
import MasterPlanViewer from '@/components/map/MasterPlanViewer';

export default function PlotDetailPage() {
  const params = useParams();
  const plotId = params?.id as string;

  const [allPlots, setAllPlots] = useState<PlotItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    fetchPlots()
      .then(data => {
        setAllPlots(data || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });

    const handleSync = () => {
      fetchPlots(true).then(data => setAllPlots(data || [])).catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handleSync);
    return () => window.removeEventListener('faisal_plots_updated', handleSync);
  }, []);

  // Find the requested plot by id or slug or plot number
  const plot = allPlots.find(
    p => p.id === plotId || (p.plotNumber && p.plotNumber.toLowerCase() === plotId?.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#7b002c] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-slate-600">Loading Plot Details...</span>
        </div>
      </div>
    );
  }

  const currentPlot = plot || allPlots[0];
  if (!currentPlot) return notFound();

  const blockInfo = blocksData.find(b => b.slug === currentPlot.blockSlug);

  // Similar plots in same block or category
  const similarPlots = allPlots
    .filter(p => p.id !== currentPlot.id && (p.blockSlug === currentPlot.blockSlug || p.category === currentPlot.category))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in Plot #${currentPlot.plotNumber} (${currentPlot.size}, ${currentPlot.blockName}) priced at ${currentPlot.priceFormatted}. Please share official allotment documents and payment details.`
  );

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pt-24 sm:pt-28 lg:pt-32 pb-20 font-sans">
      
      {/* 1. TOP BREADCRUMB & ACTION BAR */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap py-1">
            <Link href="/" className="hover:text-[#7b002c] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/plots" className="hover:text-[#7b002c] transition-colors">
              Plots Inventory
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href={`/blocks/${currentPlot.blockSlug}`} className="hover:text-[#7b002c] transition-colors">
              {currentPlot.blockName}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#7b002c] font-bold">#{currentPlot.plotNumber}</span>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/plots"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold shadow transition-all hover:scale-105 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View All Plots</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN DETAIL CONTAINER */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header Title Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/plots"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] hover:underline bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80 transition mr-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>View All Plots</span>
              </Link>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#7b002c] text-white shadow-xs">
                {currentPlot.category}
              </span>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {currentPlot.status}
              </span>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                {currentPlot.blockName}
              </span>
              <span className="text-xs font-bold text-[#7b002c] flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>RDA Approved Society</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Plot #{currentPlot.plotNumber} &bull; <span className="text-[#7b002c]">{currentPlot.size}</span>
            </h1>

            <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
              {currentPlot.description}
            </p>
          </div>

          {/* Demand Price Callout */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-left lg:text-right shrink-0 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
              Official Demand Price
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#7b002c]">
              {currentPlot.priceFormatted}
            </div>
            <span className="text-xs font-semibold text-emerald-600 block">
              {currentPlot.priceHistoryTrend}
            </span>
          </div>
        </div>

        {/* 3. GRID CONTENT: IMAGE & SPECS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: HD Image & Specifications */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Plot Featured Image Container */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative h-[360px] sm:h-[480px]">
              <img
                src={currentPlot.image}
                alt={`Plot #${currentPlot.plotNumber} ${currentPlot.blockName}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                    {currentPlot.blockName} Inventory
                  </span>
                  <h3 className="font-serif font-bold text-2xl">
                    Plot Reference #{currentPlot.plotNumber}
                  </h3>
                </div>

                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
                  {currentPlot.facing}
                </div>
              </div>
            </div>

            {/* Key Property Specifications Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#7b002c]" />
                <span>Property Specifications</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Plot / Unit Number</span>
                  <strong className="text-slate-900 text-sm block font-serif font-bold">#{currentPlot.plotNumber}</strong>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Block Sector</span>
                  <strong className="text-slate-900 text-sm block font-serif font-bold">{currentPlot.blockName}</strong>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Property Category</span>
                  <strong className="text-[#7b002c] text-sm block font-serif font-bold">{currentPlot.category}</strong>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Area Size</span>
                  <strong className="text-slate-900 text-sm block font-serif font-bold">{currentPlot.size}</strong>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Plot Dimensions</span>
                  <strong className="text-slate-900 text-sm block font-serif font-bold">{currentPlot.dimensions}</strong>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Orientation / Facing</span>
                  <strong className="text-slate-900 text-sm block font-serif font-bold">{currentPlot.facing}</strong>
                </div>
              </div>
            </div>

            {/* Features & Key Highlights */}
            {currentPlot.features && currentPlot.features.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7b002c]" />
                  <span>Plot Features & Key Advantages</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentPlot.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 font-medium">
                      <div className="w-6 h-6 rounded-full bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Block Information Summary & Link */}
            {blockInfo && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                  About {blockInfo.name}
                </span>
                <h3 className="font-serif font-bold text-2xl text-white">
                  {blockInfo.subtitle}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {blockInfo.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/blocks/${blockInfo.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold transition shadow"
                  >
                    <span>View Complete {blockInfo.name} Master Map & Rates</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Interactive Master Plan Map for this Plot's Block */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="label-caps text-[#7b002c] font-bold block mb-1">Geographic Location Map</span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#7b002c]" />
                    <span>{currentPlot.blockName} Master Plan & Plot Position</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Explore the high-resolution master layout, sector avenues, and surrounding infrastructure for Plot #{currentPlot.plotNumber}.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-[#7b002c] bg-[#7b002c]/10 px-3 py-1.5 rounded-full border border-[#7b002c]/20">
                    Sector: {currentPlot.blockName}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                <MasterPlanViewer />
              </div>
            </div>

          </div>

          {/* Right Column: Inquire / Direct Contact Sidebar */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* Quick Action Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-bold text-[#7b002c] uppercase tracking-widest block">
                  Direct Inquiries
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900 mt-1">
                  Inquire About Plot #{currentPlot.plotNumber}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Receive verified allotment verification, map coordinates, and transfer terms.
                </p>
              </div>

              {/* Direct Booking Modal Button */}
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-102 active:scale-98 shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Submit Plot Inquiry</span>
              </button>

              {/* WhatsApp Direct Action Button */}
              <a
                href={`https://wa.me/923331113177?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-102 active:scale-98 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp Consultant</span>
              </a>

              {/* Direct Call Button */}
              <a
                href="tel:+923331113177"
                className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#7b002c]" />
                <span>Call +92 333 1113177</span>
              </a>

              {/* Security Badges */}
              <div className="border-t border-slate-100 pt-4 space-y-2 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Direct Dealer & Owner Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Clear RDA Legal Status & Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Immediate File Allotment & Demarcation</span>
                </div>
              </div>
            </div>

            {/* Quick Master Map Callout */}
            <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#7b002c]" />
                <span>Society Location</span>
              </span>
              <p className="text-slate-600 leading-relaxed">
                Faisal Hills is situated on Main GT Road (N-5) Taxila, 5 minutes from Taxila Museum and 12 minutes from CPEC Motorway interchange.
              </p>
              <Link href="/master-plan" className="inline-flex items-center gap-1 text-[#7b002c] font-bold hover:underline pt-1">
                <span>Open Full Master Plan Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

        {/* 4. SIMILAR PLOTS IN FAISAL HILLS */}
        {similarPlots.length > 0 && (
          <div className="border-t border-slate-200 pt-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="label-caps text-[#7b002c] font-bold block mb-1">More Options</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  Similar Plots & Flats Available
                </h3>
              </div>

              <Link
                href="/plots"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:underline"
              >
                <span>View Full Inventory ({allPlots.length}+ Plots)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarPlots.map((sp) => (
                <Link
                  key={sp.id}
                  href={`/plots/${sp.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm card-hover hover-glow-maroon overflow-hidden flex flex-col justify-between group transition-all duration-300 cursor-pointer block text-inherit no-underline"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900 img-zoom-container">
                      <img
                        src={sp.image}
                        alt={sp.plotNumber}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full shadow bg-[#7b002c] text-white">
                          {sp.category}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="bg-[#7b002c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                          {sp.status}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="label-caps text-[9px] text-slate-300 block">{sp.blockName}</span>
                        <h4 className="font-serif font-bold text-xl group-hover:text-slate-200 transition-colors">#{sp.plotNumber}</h4>
                      </div>
                    </div>

                    <div className="p-5 space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Size:</span>
                        <strong className="text-slate-900 font-semibold">{sp.size}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Facing:</span>
                        <strong className="text-slate-900 font-semibold">{sp.facing}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-semibold">Demand Price</span>
                      <span className="font-serif font-bold text-base text-[#7b002c]">{sp.priceFormatted}</span>
                    </div>

                    <span className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-lg group-hover:bg-[#9e1245] transition">
                      View Details
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultBlock={currentPlot.blockName}
        defaultPlot={currentPlot.plotNumber}
        interest={`Plot #${currentPlot.plotNumber} (${currentPlot.blockName} - ${currentPlot.size})`}
      />

    </div>
  );
}
