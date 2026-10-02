'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MasterPlanViewer from '@/components/map/MasterPlanViewer';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import { Download, ArrowRight, DollarSign, Layers, ShieldCheck, MapPin, ExternalLink, Info } from 'lucide-react';

export default function MasterPlanClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-2">
          <span className="label-caps text-[#7b002c] font-bold block">Society Navigation</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#7b002c]">
            Faisal Hills Master Plan Map
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Explore the officially approved master layout of Faisal Hills. Inspect plot dimensions, road networks, sector avenues, and central commercial boulevards with interactive deep zoom controls up to 1200%.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3 rounded-xl border border-[#7b002c] shadow-md transition-all duration-300 hover:scale-105 shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Download High-Res PDF Map</span>
        </button>
      </div>

      {/* Clean Interactive Deep Zoom Master Plan Viewer */}
      <MasterPlanViewer 
        heightClass="h-[480px] sm:h-[620px] lg:h-[750px]" 
        onDownloadClick={() => setIsModalOpen(true)}
      />

      {/* Mobile Download Button - Below Master Plan in Mobile View */}
      <div className="md:hidden flex justify-center pt-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3.5 rounded-xl border border-[#7b002c] shadow-md transition-all active:scale-95 cursor-pointer text-center"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Download High-Res PDF Map</span>
        </button>
      </div>

      {/* Master Plan Details Table Form */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-0">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-white font-serif font-bold text-base sm:text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>Master Plan Sector Layout &amp; Standard Plot Cuttings</span>
          </h2>
          <Link
            href="/faisal-hills-payment-plan"
            className="text-xs bg-[#7b002c] hover:bg-[#9e1245] text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <span>Payment Plan Matrix</span>
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
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c] whitespace-nowrap">5.55 Marla (5 Marla)</td>
                <td className="p-4 font-mono whitespace-nowrap">25 × 50 ft</td>
                <td className="p-4 whitespace-nowrap">138.89 sq. yd (1,250 sq. ft)</td>
                <td className="p-4 text-slate-600">Prime Block developer instalments &amp; mature sectors resale</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c] whitespace-nowrap">8 Marla</td>
                <td className="p-4 font-mono whitespace-nowrap">30 × 60 ft</td>
                <td className="p-4 whitespace-nowrap">200 sq. yd (1,800 sq. ft)</td>
                <td className="p-4 text-slate-600">10 quarterly instalments available in Prime Block</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c] whitespace-nowrap">10.89 Marla (10 Marla)</td>
                <td className="p-4 font-mono whitespace-nowrap">35 × 70 ft</td>
                <td className="p-4 whitespace-nowrap">272.22 sq. yd (2,450 sq. ft)</td>
                <td className="p-4 text-slate-600">Family plot standard across Executive, A, B, C &amp; D blocks</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c] whitespace-nowrap">14.22 Marla (14 Marla)</td>
                <td className="p-4 font-mono whitespace-nowrap">40 × 80 ft</td>
                <td className="p-4 whitespace-nowrap">355.55 sq. yd (3,200 sq. ft)</td>
                <td className="p-4 text-slate-600">Available in Blocks A, B &amp; D (resale settlement)</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c] whitespace-nowrap">1 Kanal</td>
                <td className="p-4 font-mono whitespace-nowrap">50 × 90 ft</td>
                <td className="p-4 whitespace-nowrap">500 sq. yd (4,500 sq. ft)</td>
                <td className="p-4 text-slate-600">Prime mountain view avenues &amp; 10 quarterly instalments</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c] whitespace-nowrap">2 Kanal</td>
                <td className="p-4 font-mono whitespace-nowrap">75 × 120 ft</td>
                <td className="p-4 whitespace-nowrap">1,000 sq. yd (9,000 sq. ft)</td>
                <td className="p-4 text-slate-600">Estate tier residential cuttings in Block A &amp; Prime Block</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Regulatory & Verification Footnote Bar */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>RDA Approval:</strong> Faisal Hills holds an officially approved NOC covering 11,823 Kanals.
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

      {/* Lead Gated Map Download Modal */}
      <MapDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
