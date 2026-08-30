'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export interface ShowcaseItem {
  id: string;
  title: string;
  areaSubtitle?: string;
  tag?: string;
  badge?: string;
  description?: string;
  image: string;
  href: string;
  status?: string;
}

export const defaultFaisalHillsBlocks: ShowcaseItem[] = [
  {
    id: 'executive-block',
    title: 'Executive Block',
    areaSubtitle: 'TOTAL AREA: 3.2 MILLION SQM',
    tag: 'Flagship Entrance',
    badge: 'GT Road Frontage',
    description: 'Prestigious front entrance block featuring the iconic Arc Gate, Roots Millennium School, and direct GT Road access.',
    image: '/images/faisalhillarc.jpg',
    href: '/blocks/executive-block'
  },
  {
    id: 'prime-block',
    title: 'Prime Block',
    areaSubtitle: 'TOTAL AREA: 1.8 MILLION SQM',
    tag: 'Elite Enclave',
    badge: 'Margalla Foothills',
    description: 'Exclusive residential sector with wider streets, elevated topography, private security, and scenic hilltop vistas.',
    image: '/images/imgi_38_Faisal-Hills-site-home-page-header.webp',
    href: '/blocks/prime-block'
  },
  {
    id: 'block-a',
    title: 'Block A',
    areaSubtitle: 'TOTAL AREA: 2.8 MILLION SQM',
    tag: 'Civic Core',
    badge: 'Possession Ready',
    description: 'Fully developed sector with Grand Jamia Mosque, active family villas, commercial plazas, and lush public parks.',
    image: '/images/imgi_46_Mosques.webp',
    href: '/blocks/block-a'
  },
  {
    id: 'block-b',
    title: 'Block B',
    areaSubtitle: 'TOTAL AREA: 2.6 MILLION SQM',
    tag: 'Central Sector',
    badge: 'Sports Complex & Parks',
    description: 'Premier central sector built on the 225ft Grand Boulevard with dedicated Sports Complex, futsal turf, and community parks.',
    image: '/images/imgi_48_sports-arena.webp',
    href: '/blocks/block-b'
  },
  {
    id: 'block-c',
    title: 'Block C',
    areaSubtitle: 'TOTAL AREA: 2.4 MILLION SQM',
    tag: 'Margalla Hillside',
    badge: 'High Appreciation',
    description: 'Commanding high-elevation Margalla mountain crest views, natural green belts, and luxury 1 & 2 Kanal hillside plots.',
    image: '/images/faisal-forest.jpg',
    href: '/blocks/block-c'
  },
  {
    id: 'block-d',
    title: 'Block D',
    areaSubtitle: 'TOTAL AREA: 2.0 MILLION SQM',
    tag: 'Motorway Access',
    badge: 'M-1 Link Road',
    description: 'Strategically positioned next to the upcoming dedicated M-1 Motorway interchange for rapid commuting.',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    href: '/blocks/block-d'
  }
];

interface ExpandingProjectsShowcaseProps {
  items?: ShowcaseItem[];
  defaultActiveIndex?: number;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  containerHeightClass?: string;
  className?: string;
  roundedClass?: string;
  showPillsBar?: boolean;
  autoPlayInterval?: number;
}

export default function ExpandingProjectsShowcase({
  items = defaultFaisalHillsBlocks,
  defaultActiveIndex = 0,
  activeIndex,
  onActiveIndexChange,
  containerHeightClass = 'h-[460px] sm:h-[500px] lg:h-[540px]',
  className = '',
  roundedClass = 'rounded-3xl',
  showPillsBar = false,
  autoPlayInterval = 4000
}: ExpandingProjectsShowcaseProps) {
  const [internalHoveredIndex, setInternalHoveredIndex] = useState<number | null>(defaultActiveIndex);
  const [internalMobileIndex, setInternalMobileIndex] = useState<number>(defaultActiveIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const displayItems = Array.isArray(items) && items.length > 0 ? items : defaultFaisalHillsBlocks;
  const currentActive = activeIndex !== undefined ? activeIndex : (internalHoveredIndex ?? 0);
  const currentMobileIndex = activeIndex !== undefined ? activeIndex : internalMobileIndex;

  const handleSelectIndex = (index: number) => {
    setInternalHoveredIndex(index);
    setInternalMobileIndex(index);
    if (onActiveIndexChange) onActiveIndexChange(index);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentMobileIndex - 1 + displayItems.length) % displayItems.length;
    handleSelectIndex(nextIdx);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentMobileIndex + 1) % displayItems.length;
    handleSelectIndex(nextIdx);
  };

  // Auto-scroll Timer
  useEffect(() => {
    if (!isAutoPlaying || displayItems.length <= 1) return;

    const timer = setInterval(() => {
      setInternalMobileIndex((prev) => (prev + 1) % displayItems.length);
      setInternalHoveredIndex((prev) => ((prev ?? 0) + 1) % displayItems.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, displayItems.length, autoPlayInterval]);

  const currentMobileItem = displayItems[currentMobileIndex] || displayItems[0];

  return (
    <div
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      className={`w-full overflow-hidden ${roundedClass} border border-slate-200/80 shadow-xl bg-slate-950 ${className}`}
    >
      
      {/* Optional In-Card Selector Pills Bar */}
      {showPillsBar && (
        <div className="p-3 sm:p-4 bg-slate-900/80 border-b border-white/10 flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar">
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-sm inline-flex flex-nowrap sm:flex-wrap items-center gap-1.5 shrink-0">
            {displayItems.map((item, index) => {
              const isActive = currentActive === index;
              return (
                <button
                  key={item.id || index}
                  type="button"
                  onClick={() => handleSelectIndex(index)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#7b002c] text-white shadow-md ring-1 ring-[#7b002c]'
                      : 'text-slate-600 hover:text-[#7b002c] hover:bg-rose-50/50'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. MOBILE VIEW: Auto-Cycling Active Block Card + Nav Arrows */}
      {/* ========================================================= */}
      <div
        className="block md:hidden w-full p-4 select-none relative"
        onTouchStart={() => setIsAutoPlaying(false)}
        onTouchEnd={() => setTimeout(() => setIsAutoPlaying(true), 5000)}
      >
        {/* Selected Active Block Card */}
        {currentMobileItem && (
          <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
            {/* Background Image */}
            <Link href={currentMobileItem.href || '#'} className="absolute inset-0 bg-slate-950 block">
              <img
                key={currentMobileItem.id || currentMobileIndex}
                src={currentMobileItem.image}
                alt={currentMobileItem.title}
                className="w-full h-full object-cover transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
            </Link>

            {/* Top Bar: Sector Counter & Prev/Next Scrolling Buttons */}
            <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 bg-black/65 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/20 shadow-sm pointer-events-auto">
                {currentMobileIndex + 1} / {displayItems.length} Sectors
              </span>

              {/* Scrolling Buttons */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/25 flex items-center justify-center shadow-md active:bg-[#7b002c] active:scale-90 transition-all cursor-pointer"
                  aria-label="Previous Sector"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/25 flex items-center justify-center shadow-md active:bg-[#7b002c] active:scale-90 transition-all cursor-pointer"
                  aria-label="Next Sector"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="absolute inset-x-0 bottom-0 p-5 z-10 space-y-3 pointer-events-none">
              <h3 className="font-serif font-bold text-2xl text-white tracking-normal drop-shadow-md">
                {currentMobileItem.title}
              </h3>

              <div className="pointer-events-auto flex items-center justify-between gap-2 pt-1">
                <Link
                  href={currentMobileItem.href || '#'}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#7b002c] hover:bg-[#9e1245] px-4 py-2.5 rounded-xl shadow-md border border-white/20 transition-all active:scale-95"
                >
                  <span>Explore {currentMobileItem.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Dots Indicator */}
                <div className="flex items-center gap-1.5">
                  {displayItems.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => handleSelectIndex(dotIdx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentMobileIndex === dotIdx
                          ? 'w-5 bg-[#7b002c] shadow'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP VIEW: Smooth Horizontal Expanding Accordion     */}
      {/* ========================================================= */}
      <div className={`hidden md:flex w-full ${containerHeightClass}`}>
        {displayItems.map((item, index) => {
          const isHovered = currentActive === index;

          return (
            <div
              key={item.id || index}
              onMouseEnter={() => handleSelectIndex(index)}
              onFocus={() => handleSelectIndex(index)}
              style={{
                flex: isHovered ? '2.5' : '1',
                transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              className="relative overflow-hidden cursor-pointer min-w-0 min-h-0 border-r last:border-r-0 border-white/15"
            >
              <Link href={item.href || '#'} className="block w-full h-full relative group">
                {/* Background Image with smooth Zoom & Light Tint */}
                <div className="absolute inset-0 bg-slate-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-110 brightness-95' : 'scale-100 brightness-85 group-hover:scale-105'
                    }`}
                  />
                  {/* Atmospheric Tint Gradient */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isHovered
                        ? 'bg-gradient-to-t from-black/90 via-black/45 to-black/10'
                        : 'bg-gradient-to-t from-black/85 via-black/35 to-black/15 group-hover:from-black/90'
                    }`}
                  />
                </div>

                {/* Bottom Content Area */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end space-y-2">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-normal drop-shadow-md transition-colors group-hover:text-rose-100 truncate">
                    {item.title}
                  </h3>

                  {/* Action Button Reveal on Active / Hover */}
                  <div
                    className={`transition-all duration-500 ease-out overflow-hidden ${
                      isHovered
                        ? 'max-h-20 opacity-100 pt-1'
                        : 'max-h-0 opacity-0 pt-0'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#7b002c] hover:bg-[#9e1245] px-3.5 py-2 rounded-xl shadow-md border border-white/30 transition-all">
                      <span>Explore Sector</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
