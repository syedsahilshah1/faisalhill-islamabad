'use client';

import React from 'react';
import { Layers } from 'lucide-react';

export default function MasterPlanViewer() {
  return (
    <div className="w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-xl flex flex-col">
      {/* Clean Header Badge */}
      <div className="bg-slate-950 text-white px-4 py-3 sm:px-6 flex items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-300 bg-[#7b002c]/40 border border-[#7b002c]/60 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-rose-300" />
            Official Master Plan Map
          </span>
        </div>
      </div>

      {/* Main High-Resolution Map Viewport */}
      <div 
        className="relative w-full h-[650px] sm:h-[750px] lg:h-[820px] bg-slate-950 p-2 sm:p-4"
        style={{ isolation: 'isolate' }}
      >
        <iframe
          src="/FAISAL HILLS MASTER PLAN.pdf#toolbar=1&navpanes=0&scrollbar=1&view=Fit"
          className="w-full h-full border-0 rounded-lg shadow-2xl bg-white"
          title="Faisal Hills High Resolution Master Plan PDF Map"
        />
      </div>
    </div>
  );
}
