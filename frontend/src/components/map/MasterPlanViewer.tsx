'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RefreshCw, Maximize2, Move, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Loader2, Sparkles, Smartphone } from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';

interface MasterPlanViewerProps {
  onDownloadClick?: () => void;
  heightClass?: string;
}

export default function MasterPlanViewer({ 
  onDownloadClick,
  heightClass = 'h-[320px] sm:h-[480px] lg:h-[620px]'
}: MasterPlanViewerProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Image resolution state - direct load of full 9,900px blueprint
  const [imageSrc, setImageSrc] = useState('/images/faisal-hills-master-plan-map.jpg');
  const [isHighResLoaded, setIsHighResLoaded] = useState(true);
  const [isHighResLoading, setIsHighResLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartZoomRef = useRef<number>(1);

  // Preload high-res Ultra-HD (9,900 x 6,300px) master blueprint in background
  const loadHighResMap = useCallback(() => {
    if (isHighResLoaded || isHighResLoading) return;
    setIsHighResLoading(true);

    const img = new Image();
    img.src = '/images/faisal-hills-master-plan-map.jpg';
    img.onload = () => {
      setImageSrc('/images/faisal-hills-master-plan-map.jpg');
      setIsHighResLoaded(true);
      setIsHighResLoading(false);
    };
    img.onerror = () => {
      setImageSrc('/images/faisal-hills-master-plan-map-opt.webp');
      setIsHighResLoading(false);
    };
  }, [isHighResLoaded, isHighResLoading]);

  // Ensure high-res blueprint is active immediately
  useEffect(() => {
    loadHighResMap();
  }, [loadHighResMap]);

  const handleZoomIn = () => {
    loadHighResMap();
    setZoomLevel((prev) => Math.min(Number((prev + 1.2).toFixed(1)), 16.0));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(Number((prev - 1.2).toFixed(1)), 1.0);
      if (next === 1.0) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleSetQuickZoom = (level: number) => {
    loadHighResMap();
    setZoomLevel(level);
    if (level === 1.0) setPan({ x: 0, y: 0 });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePan = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = Math.max(80, Math.round(zoomLevel * 45));
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

  // -------------------------------------------------------------
  // Mouse Drag Handlers
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // Touch Handlers for Mobile Pan & Pinch Zoom
  // -------------------------------------------------------------
  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      });
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      touchStartDistRef.current = getTouchDistance(e.touches[0], e.touches[1]);
      touchStartZoomRef.current = zoomLevel;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    } else if (e.touches.length === 2 && touchStartDistRef.current) {
      const currentDist = getTouchDistance(e.touches[0], e.touches[1]);
      const scaleFactor = currentDist / touchStartDistRef.current;
      const newZoom = Math.min(Math.max(Number((touchStartZoomRef.current * scaleFactor).toFixed(1)), 1.0), 16.0);
      setZoomLevel(newZoom);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartDistRef.current = null;
  };

  return (
    <>
      <div 
        className={`w-full bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl flex flex-col transition-all duration-300 ring-1 ring-white/5 ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none border-0' : ''
        }`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Desktop Header Toolbar */}
        <div className="hidden sm:flex bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 sm:px-6 items-center justify-between gap-3 border-b border-slate-800/80">
          {/* Resolution Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Ultra-HD 9,900px Blueprint Active</span>
            </span>
          </div>

          {/* Desktop Zoom Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Zoom Presets */}
            <div className="flex items-center gap-1 bg-slate-800/60 p-0.5 rounded-lg border border-slate-700/60">
              {[1, 3, 6, 12, 16].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleSetQuickZoom(lvl)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                    Math.round(zoomLevel) === lvl
                      ? 'bg-[#7b002c] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl === 1 ? 'Fit' : `${lvl * 100}%`}
                </button>
              ))}
            </div>

            {/* Zoom Percentage Badge */}
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded-lg">
              {Math.round(zoomLevel * 100)}%
            </span>

            {/* Zoom Buttons */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-xl p-1 shadow-inner">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg transition cursor-pointer"
                title="Zoom In (up to 1600%)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg border-l border-slate-700 transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1.5 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg border-l border-slate-700 transition cursor-pointer"
                title="Reset View"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg border-l border-slate-700 transition cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* High-Res Viewport with Touch & Mouse Pan */}
        <div 
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className={`relative w-full bg-slate-950 overflow-hidden flex items-center justify-center select-none touch-none ${
            isDragging ? 'cursor-grabbing' : zoomLevel > 1 ? 'cursor-grab' : 'cursor-default'
          } ${
            isFullscreen ? 'h-[calc(100vh-120px)] sm:h-[calc(100vh-60px)]' : heightClass
          }`}
        >
          <div 
            className="flex items-center justify-center transition-transform duration-75 ease-out shrink-0"
            style={{ 
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
              width: zoomLevel > 1 ? `${Math.round(zoomLevel * 100)}%` : '100%',
              height: zoomLevel > 1 ? `${Math.round(zoomLevel * 100)}%` : '100%',
              maxWidth: zoomLevel > 1 ? 'none' : '100%',
              maxHeight: zoomLevel > 1 ? 'none' : '100%',
            }}
          >
            <img
              src={imageSrc}
              alt="Faisal Hills Master Plan Ultra-HD High-Resolution Blueprint"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-contain pointer-events-none select-none"
              style={{
                imageRendering: 'auto',
                filter: 'contrast(1.05) brightness(1.02)'
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>

          {/* Desktop Floating Directional Controls */}
          <div className="hidden sm:flex absolute bottom-3.5 right-3.5 z-20 flex-col items-end gap-1.5 pointer-events-auto">
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-1 shadow-2xl flex flex-col items-center gap-0.5">
              <button
                type="button"
                onClick={() => handlePan('up')}
                className="w-7 h-7 bg-slate-800 hover:bg-[#7b002c] text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
                title="Scroll Map Up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => handlePan('left')}
                  className="w-7 h-7 bg-slate-800 hover:bg-[#7b002c] text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
                  title="Scroll Map Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="w-7 h-7 bg-slate-800 hover:bg-[#7b002c] text-amber-300 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer text-[10px] font-bold shadow-xs"
                  title="Reset View / Recenter"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePan('right')}
                  className="w-7 h-7 bg-slate-800 hover:bg-[#7b002c] text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
                  title="Scroll Map Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => handlePan('down')}
                className="w-7 h-7 bg-slate-800 hover:bg-[#7b002c] text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-xs"
                title="Scroll Map Down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Helper Overlay on Mobile / Desktop */}
          {zoomLevel > 1 && (
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-slate-200 text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10 pointer-events-none flex items-center gap-1.5 shadow-lg">
              <Move className="w-3 h-3 text-amber-400" />
              <span>Touch & drag with finger to pan</span>
            </div>
          )}

          {/* Mobile Resolution Loading Indicator */}
          {isHighResLoading && (
            <div className="sm:hidden absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-500/30 flex items-center gap-1 animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Loading HD...</span>
            </div>
          )}
        </div>

        {/* 📱 Mobile Dedicated Bottom Control Bar (Placed Directly Underneath the Map) */}
        <div className="sm:hidden bg-slate-900 border-t border-slate-800 p-2.5 flex flex-col gap-2">
          
          {/* Quick Zoom Presets Bar */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
            <div className="flex items-center gap-1 shrink-0">
              {[
                { label: 'Fit', val: 1 },
                { label: '300%', val: 3 },
                { label: '600%', val: 6 },
                { label: '1200%', val: 12 },
                { label: '1600%', val: 16 }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => handleSetQuickZoom(item.val)}
                  className={`text-[11px] font-bold px-2 py-1.5 rounded-lg border transition active:scale-95 cursor-pointer shrink-0 ${
                    Math.round(zoomLevel) === item.val
                      ? 'bg-[#7b002c] border-[#7b002c] text-white shadow'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Current Zoom Badge */}
            <span className="text-xs font-mono font-extrabold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-1 rounded-lg shrink-0">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          {/* Touch-Friendly Action Buttons */}
          <div className="grid grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={handleZoomIn}
              className="py-2 bg-slate-800 active:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1 shadow cursor-pointer"
            >
              <ZoomIn className="w-4 h-4 text-rose-400" />
              <span>Zoom In</span>
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="py-2 bg-slate-800 active:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1 shadow cursor-pointer"
            >
              <ZoomOut className="w-4 h-4 text-slate-300" />
              <span>Zoom Out</span>
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="py-2 bg-slate-800 active:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1 shadow cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="py-2 bg-[#7b002c] active:bg-[#9e1245] text-white font-bold text-xs rounded-xl border border-[#7b002c] flex items-center justify-center gap-1 shadow cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isFullscreen ? 'Exit' : 'Full'}</span>
            </button>
          </div>

          {/* D-Pad Pan Controls for Mobile */}
          {zoomLevel > 1 && (
            <div className="flex items-center justify-center gap-2 pt-1 border-t border-slate-800/60">
              <span className="text-[10px] text-slate-400 font-medium">Pan Map:</span>
              <button
                type="button"
                onClick={() => handlePan('left')}
                className="p-1.5 bg-slate-800 rounded-lg text-slate-200 border border-slate-700 active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handlePan('up')}
                className="p-1.5 bg-slate-800 rounded-lg text-slate-200 border border-slate-700 active:scale-95"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handlePan('down')}
                className="p-1.5 bg-slate-800 rounded-lg text-slate-200 border border-slate-700 active:scale-95"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handlePan('right')}
                className="p-1.5 bg-slate-800 rounded-lg text-slate-200 border border-slate-700 active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
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
