'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, Plus, Minus, RefreshCw, Maximize2, Move, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Loader2, Sparkles, Smartphone } from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';

interface MasterPlanViewerProps {
  onDownloadClick?: () => void;
  heightClass?: string;
  initialZoom?: number;
}

export default function MasterPlanViewer({ 
  onDownloadClick,
  heightClass = 'h-[320px] sm:h-[480px] lg:h-[620px]',
  initialZoom
}: MasterPlanViewerProps) {
  const [zoomLevel, setZoomLevel] = useState(initialZoom || 1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Image resolution state - direct load of full 9,900px blueprint
  const [imageSrc, setImageSrc] = useState('/images/faisal-hills-master-plan-map.webp');
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
    img.src = '/images/faisal-hills-master-plan-map.webp';
    img.onload = () => {
      setImageSrc('/images/faisal-hills-master-plan-map.webp');
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
    setZoomLevel((prev) => Math.min(Number((prev + 1.5).toFixed(1)), 16.0));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(Number((prev - 1.5).toFixed(1)), 1.0);
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
    const step = Math.max(80, Math.round(zoomLevel * 50));
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
    // Only intercept wheel zoom if in fullscreen or if Ctrl/Cmd key is held (Google Maps standard)
    if (isFullscreen || e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
    // Normal mouse wheel scrolls the page naturally without getting trapped
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
        className={`w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xl flex flex-col transition-all duration-300 ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none border-0' : ''
        }`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Desktop Header Toolbar (Clean Light Theme) */}
        <div className="hidden sm:flex bg-slate-50 text-slate-800 px-4 py-2.5 sm:px-6 items-center justify-between gap-3 border-b border-slate-200">
          {/* Resolution Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ultra-HD 9,900px Blueprint Active</span>
            </span>
          </div>

          {/* Desktop Zoom Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Zoom Presets */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {[1, 2, 4, 8, 12, 16].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleSetQuickZoom(lvl)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded transition cursor-pointer ${
                    Math.round(zoomLevel) === lvl
                      ? 'bg-[#7b002c] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {lvl === 1 ? 'Fit' : `${lvl * 100}%`}
                </button>
              ))}
            </div>

            {/* Zoom Percentage Badge */}
            <span className="text-xs font-mono font-bold text-[#7b002c] bg-rose-50 border border-rose-200 px-3 py-1 rounded-lg">
              {Math.round(zoomLevel * 100)}%
            </span>

            {/* Zoom Buttons */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-xs">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-slate-100 text-slate-700 hover:text-[#7b002c] rounded-lg transition cursor-pointer"
                title="Zoom In (up to 1600%)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-slate-100 text-slate-700 hover:text-[#7b002c] rounded-lg border-l border-slate-200 transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1.5 hover:bg-slate-100 text-slate-700 hover:text-[#7b002c] rounded-lg border-l border-slate-200 transition cursor-pointer"
                title="Reset View"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 hover:bg-slate-100 text-slate-700 hover:text-[#7b002c] rounded-lg border-l border-slate-200 transition cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* High-Res Viewport with Touch & Mouse Pan (Clean Slate-50 Background) */}
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
          className={`relative w-full bg-slate-50 overflow-hidden flex items-center justify-center select-none touch-none ${
            isDragging ? 'cursor-grabbing' : zoomLevel > 1 ? 'cursor-grab' : 'cursor-default'
          } ${
            isFullscreen ? 'h-[calc(100vh-120px)] sm:h-[calc(100vh-60px)]' : heightClass
          }`}
        >
          <div 
            className="relative flex items-center justify-center transition-transform duration-100 ease-out shrink-0 select-none w-full h-full"
            style={{ 
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomLevel})`,
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            <img
              src={imageSrc}
              alt="Faisal Hills Master Plan Ultra-HD High-Resolution Blueprint"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-contain pointer-events-none select-none max-w-full max-h-full"
              style={{
                imageRendering: '-webkit-optimize-contrast',
                filter: 'contrast(1.04) brightness(1.01)',
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>

          {/* Floating Directional Scroll Controls (Clean White Theme) */}
          <div className="absolute bottom-3 right-3 z-20 flex flex-col items-end gap-1.5 pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-1 shadow-lg flex flex-col items-center gap-0.5">
              <button
                type="button"
                onClick={() => handlePan('up')}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-100 hover:bg-[#7b002c] active:bg-[#7b002c] text-slate-700 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                title="Scroll Map Up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => handlePan('left')}
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-100 hover:bg-[#7b002c] active:bg-[#7b002c] text-slate-700 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                  title="Scroll Map Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-100 hover:bg-[#7b002c] active:bg-[#7b002c] text-[#7b002c] hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer text-[10px] font-bold shadow-2xs"
                  title="Reset View / Recenter"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePan('right')}
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-100 hover:bg-[#7b002c] active:bg-[#7b002c] text-slate-700 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                  title="Scroll Map Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => handlePan('down')}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-100 hover:bg-[#7b002c] active:bg-[#7b002c] text-slate-700 hover:text-white rounded-lg flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-2xs"
                title="Scroll Map Down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Floating Zoom Controls */}
          <div className="sm:hidden absolute top-3 right-3 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-1 shadow-lg pointer-events-auto">
            <button
              type="button"
              onClick={handleZoomIn}
              className="w-8 h-8 bg-slate-100 active:bg-[#7b002c] text-slate-800 active:text-white rounded-lg flex items-center justify-center transition active:scale-90 cursor-pointer font-bold text-sm"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="w-8 h-8 bg-slate-100 active:bg-[#7b002c] text-slate-800 active:text-white rounded-lg flex items-center justify-center transition active:scale-90 cursor-pointer font-bold text-sm"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-8 h-8 bg-slate-100 active:bg-[#7b002c] text-slate-800 active:text-white rounded-lg flex items-center justify-center transition active:scale-90 cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Helper Overlay on Mobile / Desktop */}
          {zoomLevel > 1 && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] sm:text-[11px] font-semibold px-3 py-1 rounded-full border border-slate-200 pointer-events-none flex items-center gap-1.5 shadow-md">
              <Move className="w-3 h-3 text-[#7b002c]" />
              <span>Drag to explore sectors</span>
            </div>
          )}

          {/* Mobile Resolution Loading Indicator */}
          {isHighResLoading && (
            <div className="sm:hidden absolute top-14 right-3 bg-white/90 backdrop-blur-md text-[#7b002c] text-[10px] font-bold px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1 animate-pulse shadow-sm">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Loading HD...</span>
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
