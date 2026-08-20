import React from 'react';
import { Metadata } from 'next';
import InteractiveMasterPlan from '@/components/map/InteractiveMasterPlan';

export const metadata: Metadata = {
  title: 'Interactive Master Plan Map | Faisal Hills Real Estate',
  description: 'Explore full society master plan vector map for Faisal Hills Rawalpindi. Select blocks, zoom into plots, filter by plot numbers, and view live plot prices.',
};

export default function MasterPlanPage() {
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

        <a
          href="/FAISAL HILLS MASTER PLAN.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#7b002c] hover:bg-[#9e1245] px-5 py-3 rounded-xl border border-[#7b002c] shadow-md transition-all duration-300 hover:scale-105 shrink-0"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download High-Res PDF Map</span>
        </a>
      </div>

      {/* Fullscreen Master Plan Viewer */}
      <InteractiveMasterPlan isFullscreen={true} />
    </div>
  );
}
