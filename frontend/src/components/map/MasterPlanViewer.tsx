'use client';

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RefreshCw, Layers } from 'lucide-react';

export default function MasterPlanViewer() {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 6.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1.0));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-xl flex flex-col">
      {/* Top Map Control Bar */}
      <div className="bg-slate-950 text-white px-4 py-3 sm:px-6 flex items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-300 bg-[#7b002c]/40 border border-[#7b002c]/60 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-rose-300" />
            Official Master Plan Map
          </span>
          <span className="text-xs text-slate-300 font-medium hidden sm:inline">
            Zoom Level: <strong className="text-white">{Math.round(zoomLevel * 100)}%</strong>
          </span>
        </div>

        {/* Action Controls - Clean Stepper Zoom */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800/90 rounded-xl border border-slate-700 p-1 shadow">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:bg-slate-700 text-white rounded-lg transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-white" />
            </button>
            <span className="px-2.5 text-xs font-bold text-slate-200 min-w-[55px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-slate-700 text-white rounded-lg transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 hover:bg-slate-700 text-white rounded-lg border-l border-slate-700 transition cursor-pointer ml-1"
              title="Reset Zoom"
            >
              <RefreshCw className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Scrollable Viewport - Hardware Accelerated & Lag-Free */}
      <div className="relative w-full h-[600px] sm:h-[700px] lg:h-[780px] bg-slate-950 overflow-auto p-2 sm:p-4 will-change-scroll">
        <div
          className="relative mx-auto h-full"
          style={{
            width: `${Math.max(100, zoomLevel * 100)}%`,
            minWidth: `${zoomLevel * 900}px`,
          }}
        >
          <iframe
            src={`/FAISAL HILLS MASTER PLAN.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className="w-full h-full border-0 rounded-lg shadow-2xl bg-white"
            title="Faisal Hills High Resolution Master Plan PDF Map"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
