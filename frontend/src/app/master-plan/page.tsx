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
      <div className="space-y-2">
        <span className="label-caps text-[#7b002c] font-semibold block">Society Navigation</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#7b002c]">
          Faisal Hills Interactive Master Plan Map
        </h1>
        <p className="text-slate-600 text-sm max-w-3xl">
          Use the interactive map below to explore Executive Block, Block A, B, C, D, Prime Block, and Hills Walk. Click individual plot nodes to view real-time availability, plot dimension, facing type, and demand prices.
        </p>
      </div>

      {/* Fullscreen Master Plan Viewer */}
      <InteractiveMasterPlan isFullscreen={true} />
    </div>
  );
}
