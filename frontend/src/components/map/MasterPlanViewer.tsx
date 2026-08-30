'use client';

import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RefreshCw, Maximize2, Move, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';

interface MasterPlanViewerProps {
  onDownloadClick?: () => void;
  heightClass?: string;
}

export default function MasterPlanViewer({ 
  onDownloadClick,
  heightClass = 'h-[220px] sm:h-[340px] lg:h-[440px]'
}: MasterPlanViewerProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const [imageSrc, setImageSrc] = useState('/images/faisal-hills-master-plan-map-preview.webp');
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);

  // Only load the 8.6MB high-res WebP on demand when the user zooms in or opens fullscreen
  const loadHighResIfNeeded = React.useCallback(() => {
    if (!isHighResLoaded) {
      const img = new Image();
      img.src = '/images/faisal-hills-master-plan-map-opt.webp';
      img.onload = () => {
        setImageSrc('/images/faisal-hills-master-plan-map-opt.webp');
        setIsHighResLoaded(true);
      };
    }
  }, [isHighResLoaded]);

  const handleZoomIn = () => {
    loadHighResIfNeeded();
    setZoomLevel((prev) => Math.min(prev + 0.8, 12.0));
  };
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

  const handlePan = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 80;
    setPan((prev) => {
      switch (direction) {
        case 'up': return { ...prev, y: prev.y + step };
        case 'down': return { ...prev, y: prev.y - step };
        case 'left': return { ...prev, x: prev.x + step };
        case 'right': return { ...prev, x: prev.x - step };
        default: return prev;
      }
    });
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
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
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
        className={`w-full bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl flex flex-col transition-all duration-300 ring-1 ring-white/5 ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none border-0' : ''
        }`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Header Toolbar */}
        <div className="bg-slate-900/90 backdrop-blur-md text-white px-3 py-2 sm:px-6 flex items-center justify-end gap-3 border-b border-slate-800/80">

          {/* Interactive Controls & Zoom Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            
            {/* Zoom Percentage Badge */}
            <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg">
              {Math.round(zoomLevel * 100)}%
            </span>

            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-xl p-0.5 sm:p-1 shadow-inner backdrop-blur-sm">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1 sm:p-1.5 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg transition cursor-pointer"
                title="Zoom In (up to 1200%)"
                aria-label="Zoom in on master plan map"
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1 sm:p-1.5 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg border-l border-slate-700 transition cursor-pointer"
                title="Zoom Out"
                aria-label="Zoom out on master plan map"
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1 sm:p-1.5 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg border-l border-slate-700 transition cursor-pointer"
                title="Reset View"
                aria-label="Reset master plan map view"
              >
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1 sm:p-1.5 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg border-l border-slate-700 transition cursor-pointer hidden sm:block"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                aria-label={isFullscreen ? 'Exit full screen map' : 'View full screen map'}
              >
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
          className={`relative w-full bg-slate-950 overflow-hidden flex items-center justify-center select-none ${
            isDragging ? 'cursor-grabbing' : zoomLevel > 1 ? 'cursor-grab' : 'cursor-default'
          } ${
            isFullscreen ? 'h-[calc(100vh-60px)]' : heightClass
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
              width={1200}
              height={764}
              loading="lazy"
              className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-none select-none transition-opacity duration-500 ${
                isHighResLoaded ? 'opacity-100' : 'opacity-90 blur-[0.5px]'
              }`}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>

          {/* Floating On-Canvas Pan / Scroll & Navigation Controls */}
          <div className="absolute bottom-3.5 right-3.5 z-20 flex flex-col items-end gap-1.5 pointer-events-auto">
            {/* Directional Scroll Controls */}
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-1 shadow-2xl flex flex-col items-center gap-0.5">
              <button
                type="button"
                onClick={() => handlePan('up')}
                className="w-7 h-7 bg-slate-800 hover:bg-[#7b002c] text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
                title="Scroll Map Up"
                aria-label="Scroll Map Up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => handlePan('left')}
                  className="w-7 h-7 bg-slate-800 hover:bg-[#7b002c] text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
                  title="Scroll Map Left"
                  aria-label="Scroll Map Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="w-7 h-7 bg-slate-800 hover:bg-[#7b002c] text-amber-300 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer text-[10px] font-bold shadow-xs"
                  title="Reset View / Recenter"
                  aria-label="Recenter Map"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePan('right')}
                  className="w-7 h-7 bg-slate-800 hover:bg-[#7b002c] text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
                  title="Scroll Map Right"
                  aria-label="Scroll Map Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => handlePan('down')}
                className="w-7 h-7 bg-slate-800 hover:bg-[#7b002c] text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
                title="Scroll Map Down"
                aria-label="Scroll Map Down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Helper Overlay on Zoom */}
          {zoomLevel > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-slate-300 text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/10 pointer-events-none flex items-center gap-1.5 shadow-lg">
              <Move className="w-3.5 h-3.5 text-amber-400" />
              <span>Click & Drag or use buttons to scroll map</span>
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
