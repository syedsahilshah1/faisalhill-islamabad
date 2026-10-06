'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import MasterPlanViewer from '@/components/map/MasterPlanViewer';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import {
  Download,
  ArrowRight,
  DollarSign,
  Layers,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Info,
  Compass,
  Building2,
  Trees,
  Car,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import {
  MasterPlanCMSData,
  initialMasterPlanCMS,
  fetchMasterPlanCMS,
  mergeMasterPlanCMS
} from '@/data/faisalHillsData';

export default function MasterPlanClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cms, setCms] = useState<MasterPlanCMSData>(initialMasterPlanCMS);

  useEffect(() => {
    fetchMasterPlanCMS().then((data) => {
      if (data) setCms(mergeMasterPlanCMS(data));
    });

    const handleSync = () => {
      try {
        const local = localStorage.getItem('faisal_master_plan_cms');
        if (local) setCms(mergeMasterPlanCMS(JSON.parse(local)));
      } catch {}
    };

    window.addEventListener('faisal_master_plan_cms_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('faisal_master_plan_cms_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const cuttings = useMemo(() => {
    return cms.sectorDimensionsTable.rows && cms.sectorDimensionsTable.rows.length > 0
      ? cms.sectorDimensionsTable.rows
      : initialMasterPlanCMS.sectorDimensionsTable.rows;
  }, [cms.sectorDimensionsTable.rows]);

  const boulevards = useMemo(() => {
    return cms.boulevardsSection.rows && cms.boulevardsSection.rows.length > 0
      ? cms.boulevardsSection.rows
      : initialMasterPlanCMS.boulevardsSection.rows;
  }, [cms.boulevardsSection.rows]);

  const landmarks = useMemo(() => {
    return cms.landmarksAndAvenues.landmarks && cms.landmarksAndAvenues.landmarks.length > 0
      ? cms.landmarksAndAvenues.landmarks
      : initialMasterPlanCMS.landmarksAndAvenues.landmarks;
  }, [cms.landmarksAndAvenues.landmarks]);

  const handleDownloadClick = () => {
    const url = cms.header.pdfDownloadUrl;
    // A configured file URL downloads directly. The sentinel value
    // (or an empty URL) falls back to the lead-gated modal so the
    // team can still capture a lead before handing over the PDF.
    if (url && url !== '/faisal-hills-master-plan.pdf') {
      const link = document.createElement('a');
      link.href = url;
      link.download = 'FAISAL HILLS MASTER PLAN.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 space-y-12 font-sans">
      
      {/* Header & Download Button Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-2 max-w-3xl">
          <span className="label-caps text-[#7b002c] font-bold block">
            {cms.header.tag || 'Society Navigation & Planning'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#7b002c]">
            {cms.header.h1 || 'Faisal Hills Master Plan Map'}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
            {cms.header.leadParagraph ||
              'Explore the officially approved master layout of Faisal Hills. Inspect plot dimensions, road networks, sector avenues, and central commercial boulevards with interactive deep zoom controls up to 1200%.'}
          </p>
        </div>

        <button
          onClick={handleDownloadClick}
          className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3 rounded-xl border border-[#7b002c] shadow-md transition-all duration-300 hover:scale-105 shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 text-white" />
          <span>{cms.header.downloadButtonText || 'Download High-Res PDF Map'}</span>
        </button>
      </div>

      {/* Clean Interactive Deep Zoom Master Plan Viewer */}
      <MasterPlanViewer 
        heightClass="h-[480px] sm:h-[620px] lg:h-[750px]" 
        imageSrc={cms.viewer.highResImageUrl || cms.viewer.mapImageUrl || '/images/faisal-hills-master-plan-map.webp'}
        onDownloadClick={handleDownloadClick}
      />

      {/* Mobile Download Button */}
      <div className="md:hidden flex justify-center pt-1">
        <button
          onClick={handleDownloadClick}
          className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3.5 rounded-xl border border-[#7b002c] shadow-md transition-all active:scale-95 cursor-pointer text-center"
        >
          <Download className="w-4 h-4 text-white" />
          <span>{cms.header.downloadButtonText || 'Download High-Res PDF Map'}</span>
        </button>
      </div>

      {/* Standard Plot Cuttings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-0">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-white font-serif font-bold text-base sm:text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>{cms.sectorDimensionsTable.heading || 'Master Plan Sector Layout & Standard Plot Cuttings'}</span>
          </h2>
          <Link
            href={cms.sectorDimensionsTable.paymentPlanLinkUrl || '/faisal-hills-payment-plan'}
            className="text-xs bg-[#7b002c] hover:bg-[#9e1245] text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <span>{cms.sectorDimensionsTable.paymentPlanLinkText || 'Payment Plan Matrix'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[11px] tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4 whitespace-nowrap">Plot Category</th>
                <th className="p-4 whitespace-nowrap">Ground Dimensions</th>
                <th className="p-4 whitespace-nowrap">Area (Sq. Yards / Sq. Ft)</th>
                <th className="p-4">Payment Structure &amp; Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {cuttings.map((cut, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#7b002c] whitespace-nowrap flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7b002c]" />
                    <span>{cut.category}</span>
                  </td>
                  <td className="p-4 font-mono whitespace-nowrap">{cut.dimensions}</td>
                  <td className="p-4 whitespace-nowrap font-medium text-slate-700">{cut.area}</td>
                  <td className="p-4 text-slate-600 font-sans">{cut.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Regulatory & Verification Footnote Bar */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>RDA Approval:</strong> {cms.advisoryFootnote.verificationText || 'Faisal Hills holds an officially approved NOC covering 11,823 Kanals.'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/faisal-hills-noc-status"
              className="text-[#7b002c] font-bold underline hover:text-[#9e1245]"
            >
              View NOC Status Details
            </Link>
            <a
              href="https://rda.gop.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 underline inline-flex items-center gap-0.5"
            >
              <span>rda.gop.pk</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Road & Boulevard Hierarchy Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-0">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-white font-serif font-bold text-base sm:text-lg flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span>{cms.boulevardsSection.heading || 'Road Hierarchy & Boulevard Grid Specifications'}</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">Carpeted Asphalt &amp; LED Lighting</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[11px] tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4 whitespace-nowrap">Road / Avenue Name</th>
                <th className="p-4 whitespace-nowrap">Right of Way (Width)</th>
                <th className="p-4">Key Connectivity &amp; Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {boulevards.map((road, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 whitespace-nowrap flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#7b002c] shrink-0" />
                    <span>{road.name}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-[#7b002c] whitespace-nowrap">{road.width}</td>
                  <td className="p-4 text-slate-600 font-sans">{road.connectivity || road.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Society Landmarks Grid */}
      <div className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-4">
          <span className="text-[#7b002c] font-bold text-xs uppercase tracking-widest block">
            Society Infrastructure
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.landmarksAndAvenues.heading || 'Key Society Landmarks & Focal Points'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {landmarks.map((l, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#7b002c]/40 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-[#7b002c] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {l.block}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900">{l.name}</h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">{l.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Gated Map Download Modal */}
      <MapDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
