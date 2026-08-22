'use client';

import React, { useState, useRef } from 'react';
import { Layers, ZoomIn, ZoomOut, RefreshCw, Maximize2, Download, ShieldCheck, Move } from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';

interface MasterPlanViewerProps {
  onDownloadClick?: () => void;
}

export default function MasterPlanViewer({ onDownloadClick }: MasterPlanViewerProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const [imageSrc, setImageSrc] = useState('/images/faisal-hills-master-plan-map-preview.webp');
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);

  React.useEffect(() => {
    // Preload optimized high-res WebP map in background
    const img = new Image();
    img.src = '/images/faisal-hills-master-plan-map-opt.webp';
    img.onload = () => {
      setImageSrc('/images/faisal-hills-master-plan-map-opt.webp');
      setIsHighResLoaded(true);
    };
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.8, 12.0));
  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.8, 1.0);
      if (next === 1.0) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    // Don't intercept normal page scroll when map is at 100% zoom unless Ctrl key is pressed or already zoomed in
    if (zoomLevel === 1 && !e.ctrlKey) {
      return;
    }
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomLevel((prev) => Math.min(prev + 0.6, 12.0));
    } else {
      setZoomLevel((prev) => {
        const next = Math.max(prev - 0.6, 1.0);
        if (next === 1.0) setPan({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const handleDownloadTrigger = () => {
    if (onDownloadClick) {
      onDownloadClick();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div 
        className={`w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col transition-all duration-300 ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none border-0' : ''
        }`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Header Toolbar */}
        <div className="bg-slate-950 text-white px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80">
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300 bg-[#7b002c]/50 border border-[#7b002c]/70 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
              <Layers className="w-4 h-4 text-rose-300" />
              Official Master Plan Blueprint
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-medium bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              <Move className="w-3.5 h-3.5 text-amber-400" />
              Drag or hold Ctrl + scroll to zoom up to 1200%
            </span>
          </div>

          {/* Interactive Controls & Download CTA */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            
            {/* Zoom Percentage Badge */}
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg">
              {Math.round(zoomLevel * 100)}%
            </span>

            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-inner">
              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition cursor-pointer"
                title="Zoom In (up to 1200%)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border-l border-slate-800 transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border-l border-slate-800 transition cursor-pointer"
                title="Reset View"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border-l border-slate-800 transition cursor-pointer hidden sm:block"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* High-Res Image Viewport with Deep Zoom & Mouse Drag Pan */}
        <div 
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`relative w-full bg-slate-950 overflow-hidden flex items-center justify-center p-2 sm:p-4 select-none ${
            isDragging ? 'cursor-grabbing' : zoomLevel > 1 ? 'cursor-grab' : 'cursor-default'
          } ${
            isFullscreen ? 'h-[calc(100vh-60px)]' : 'h-[500px] sm:h-[650px] lg:h-[780px]'
          }`}
        >
          <div 
            className="w-full h-full flex items-center justify-center transition-transform duration-150 ease-out origin-center"
            style={{ 
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={imageSrc}
              alt="Faisal Hills High Resolution Master Plan Blueprint Map"
              className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-none select-none transition-opacity duration-500 ${
                isHighResLoaded ? 'opacity-100' : 'opacity-90 blur-[0.5px]'
              }`}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>

          {/* Quick Helper Overlay on Zoom */}
          {zoomLevel > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-slate-300 text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/10 pointer-events-none flex items-center gap-1.5 shadow-lg">
              <Move className="w-3.5 h-3.5 text-amber-400" />
              <span>Click & Drag to pan map • Scroll wheel to zoom</span>
            </div>
          )}
        </div>
      </div>

      {/* Internal Map Download Lead Modal */}
      <MapDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
