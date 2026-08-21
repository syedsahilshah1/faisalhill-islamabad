'use client';

import React, { useState } from 'react';
import InteractiveMasterPlan from '@/components/map/InteractiveMasterPlan';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import { Download } from 'lucide-react';

export default function MasterPlanPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="label-caps text-[#7b002c] font-semibold block">Society Navigation</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#7b002c]">
            Faisal Hills Interactive Master Plan Map
          </h1>
          <p className="text-slate-600 text-sm max-w-3xl">
            Use the interactive map below to explore Executive Block, Block A, B, C, D, Prime Block, and Hills Walk. Click individual plot nodes to view real-time availability, plot dimension, facing type, and demand prices.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3 rounded-xl border border-[#7b002c] shadow-md transition-all duration-300 hover:scale-105 shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Download High-Res PDF Map</span>
        </button>
      </div>

      {/* Fullscreen Master Plan Viewer */}
      <InteractiveMasterPlan isFullscreen={true} />

      {/* Lead Gated Map Download Modal */}
      <MapDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
