'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ZoomIn, ZoomOut, RefreshCw, Maximize2, Move, 
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, 
  Sparkles
} from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';

interface MasterPlanViewerProps {
  onDownloadClick?: () => void;
  heightClass?: string;
  initialZoom?: number;
}

const MAP_ASPECT_RATIO = 9900 / 6300; // 1.571428

export default function MasterPlanViewer({ 
  onDownloadClick,
  heightClass = 'h-[320px] sm:h-[420px] lg:h-[480px]',
  initialZoom = 1
}: MasterPlanViewerProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(initialZoom);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Container dimensions
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 800, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartZoomRef = useRef<number>(1);

  const imageSrc = '/images/faisal-hills-master-plan-map.webp';

  // Measure container dimensions
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setContainerSize({ width: rect.width, height: rect.height });
      }
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const observer = new ResizeObserver(() => updateDimensions());
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
    };
  }, [updateDimensions, isFullscreen]);

  // Calculate base and current dimensions
  const { width: cW, height: cH } = containerSize;
  let baseW = cW;
  let baseH = cW / MAP_ASPECT_RATIO;
  if (baseH > cH) {
    baseH = cH;
    baseW = cH * MAP_ASPECT_RATIO;
  }

  const currentW = Math.max(10, Math.round(baseW * zoomLevel));
  const currentH = Math.max(10, Math.round(baseH * zoomLevel));

  // Constrain pan within reasonable boundaries
  const clampPan = (x: number, y: number, currentZ: number) => {
    if (currentZ <= 1) return { x: 0, y: 0 };
    const maxPanX = (baseW * currentZ - cW) / 2 + cW * 0.4;
    const maxPanY = (baseH * currentZ - cH) / 2 + cH * 0.4;
    return {
      x: Math.min(Math.max(x, -maxPanX), maxPanX),
      y: Math.min(Math.max(y, -maxPanY), maxPanY),
    };
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => {
      const next = Math.min(Number((prev + 1.5).toFixed(1)), 16.0);
      setPan((p) => clampPan(p.x, p.y, next));
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(Number((prev - 1.5).toFixed(1)), 1.0);
      if (next === 1.0) {
        setPan({ x: 0, y: 0 });
      } else {
        setPan((p) => clampPan(p.x, p.y, next));
      }
      return next;
    });
  };

  const handleSetQuickZoom = (level: number) => {
    setZoomLevel(level);
    if (level === 1.0) {
      setPan({ x: 0, y: 0 });
    } else {
      setPan((p) => clampPan(p.x, p.y, level));
    }
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePan = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = Math.max(80, Math.round(zoomLevel * 45));
    setPan((prev) => {
      let nx = prev.x;
      let ny = prev.y;
      switch (direction) {
        case 'up': ny += step; break;
        case 'down': ny -= step; break;
        case 'left': nx += step; break;
        case 'right': nx -= step; break;
      }
      return clampPan(nx, ny, zoomLevel);
    });
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    const nx = e.clientX - dragStart.x;
    const ny = e.clientY - dragStart.y;
    setPan(clampPan(nx, ny, zoomLevel));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isFullscreen || e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  // Touch Handlers for Mobile Pan & Pinch Zoom
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
      const nx = e.touches[0].clientX - dragStart.x;
      const ny = e.touches[0].clientY - dragStart.y;
      setPan(clampPan(nx, ny, zoomLevel));
    } else if (e.touches.length === 2 && touchStartDistRef.current) {
      const currentDist = getTouchDistance(e.touches[0], e.touches[1]);
      const scaleFactor = currentDist / touchStartDistRef.current;
      const newZoom = Math.min(Math.max(Number((touchStartZoomRef.current * scaleFactor).toFixed(1)), 1.0), 16.0);
      setZoomLevel(newZoom);
      setPan((p) => clampPan(p.x, p.y, newZoom));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartDistRef.current = null;
  };

  return (
    <>
      <div 
        className={`w-full bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xl flex flex-col transition-all duration-300 ${
          isFullscreen ? 'fixed inset-0 z-[9999] rounded-none border-0' : ''
        }`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Compact Header Toolbar */}
        <div className="flex bg-slate-900 text-white px-3 sm:px-4 py-2.5 items-center justify-between gap-2 border-b border-slate-800">
          {/* Badge */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full truncate">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span className="truncate">Ultra-HD 9,900px Blueprint</span>
            </span>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Zoom Presets */}
            <div className="hidden sm:flex items-center gap-0.5 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              {[1, 2, 4, 8, 12, 16].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleSetQuickZoom(lvl)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                    Math.round(zoomLevel) === lvl
                      ? 'bg-[#7b002c] text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {lvl === 1 ? 'Fit' : `${lvl * 100}%`}
                </button>
              ))}
            </div>

            {/* Current Zoom */}
            <span className="text-[11px] font-mono font-bold text-amber-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-lg">
              {Math.round(zoomLevel * 100)}%
            </span>

            {/* Action Buttons */}
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1 hover:bg-slate-700 text-slate-200 hover:text-white rounded transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1 hover:bg-slate-700 text-slate-200 hover:text-white rounded border-l border-slate-700 transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1 hover:bg-slate-700 text-slate-200 hover:text-white rounded border-l border-slate-700 transition cursor-pointer"
                title="Reset Fit"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1 hover:bg-slate-700 text-slate-200 hover:text-white rounded border-l border-slate-700 transition cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Viewport with Direct Dynamic Pixel Rendering for Crystal-Clear Zoom */}
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
            isFullscreen ? 'h-[calc(100vh-50px)]' : heightClass
          }`}
        >
          {/* Dynamic Image Container sized in native display pixels to force high-res rasterization */}
          <div 
            className="absolute select-none pointer-events-none transition-[width,height] duration-75 ease-out"
            style={{ 
              width: `${currentW}px`,
              height: `${currentH}px`,
              left: '50%',
              top: '50%',
              transform: `translate3d(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px), 0)`,
              willChange: 'transform, width, height',
            }}
          >
            <img
              src={imageSrc}
              alt="Faisal Hills Master Plan Ultra-HD High-Resolution Blueprint"
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain pointer-events-none select-none block"
              style={{
                imageRendering: 'auto',
                filter: 'contrast(1.05) brightness(1.02)',
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>

          {/* Floating Pan Controls */}
          {zoomLevel > 1 && (
            <div className="absolute bottom-3 right-3 z-20 flex flex-col items-end gap-1 pointer-events-auto">
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-1 shadow-2xl flex flex-col items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => handlePan('up')}
                  className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 hover:bg-[#7b002c] active:bg-[#7b002c] text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
                  title="Scroll Map Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => handlePan('left')}
                    className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 hover:bg-[#7b002c] active:bg-[#7b002c] text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
                    title="Scroll Map Left"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 hover:bg-[#7b002c] active:bg-[#7b002c] text-amber-300 hover:text-white rounded-lg flex items-center justify-center transition-all text-[9px] font-bold cursor-pointer"
                    title="Reset View"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePan('right')}
                    className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 hover:bg-[#7b002c] active:bg-[#7b002c] text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
                    title="Scroll Map Right"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handlePan('down')}
                  className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 hover:bg-[#7b002c] active:bg-[#7b002c] text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
                  title="Scroll Map Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Quick Drag Hint */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-white text-[10px] sm:text-xs font-semibold shadow-md">
              <Move className="w-3 h-3 text-amber-400" />
              <span>{zoomLevel > 1 ? 'Drag to explore sectors' : 'Zoom to inspect plots'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      <MapDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        blockName="Faisal Hills Master Plan Ultra-HD"
        mapPdfUrl="/FAISAL HILLS MASTER PLAN.pdf"
      />
    </>
  );
}
