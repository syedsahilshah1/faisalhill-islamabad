'use client';

import React, { useState } from 'react';
import MasterPlanViewer from '@/components/map/MasterPlanViewer';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import { Download } from 'lucide-react';

export default function MasterPlanPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 space-y-6">
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
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3 rounded-xl border border-[#7b002c] shadow-md transition-all duration-300 hover:scale-105 shrink-0 cursor-pointer"
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

      {/* Lead Gated Map Download Modal */}
      <MapDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
