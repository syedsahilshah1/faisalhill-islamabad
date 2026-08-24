'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
    id: 'faisal-jewel',
    title: 'Faisal Jewel',
    areaSubtitle: 'TOTAL AREA: 27-STOREY TOWER',
    tag: 'Megastructure',
    badge: 'Commercial & Hotel',
    description: 'Iconic 27-storey skyscraper featuring luxury serviced apartments, 4-star hotel, and shopping mall floors.',
    image: '/images/faisal-jewel.jpg',
    href: '/blocks/faisal-jewel-islamabad'
  },
  {
    id: 'executive-block',
    title: 'Executive Block',
    areaSubtitle: 'TOTAL AREA: 3.2 MILLION SQM',
    tag: 'Flagship Entrance',
    badge: 'GT Road Frontage',
    description: 'Prestigious front entrance block featuring Roots Millennium School, civic centers, and direct GT Road access.',
    image: '/images/faisalhillarc.jpg',
    href: '/blocks/executive-block'
  },
  {
    id: 'block-a',
    title: 'Block A',
    areaSubtitle: 'TOTAL AREA: 2.8 MILLION SQM',
    tag: 'Civic Core',
    badge: 'Possession Ready',
    description: 'Fully developed sector with Grand Jamia Mosque, active family villas, commercial plazas, and lush public parks.',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    href: '/blocks/block-a'
  },
  {
    id: 'block-b',
    title: 'Block B',
    areaSubtitle: 'TOTAL AREA: 2.6 MILLION SQM',
    tag: 'Central Sector',
    badge: 'Parks & Sports Arena',
    description: 'Serene residential sector with community parks, sports grounds, 225ft Grand Boulevard, and rapid home construction.',
    image: '/images/faisal-park.jpg',
    href: '/blocks/block-b'
  },
  {
    id: 'block-c',
    title: 'Block C',
    areaSubtitle: 'TOTAL AREA: 2.4 MILLION SQM',
    tag: 'Margalla Hillside',
    badge: 'High Appreciation',
    description: 'Commanding high-elevation Margalla mountain crest views, natural water springs, and luxury 1 & 2 Kanal hillside plots.',
    image: '/images/faisal-hills-aerial.jpg',
    href: '/blocks/block-c'
  },
  {
    id: 'block-d',
    title: 'Block D',
    areaSubtitle: 'TOTAL AREA: 2.0 MILLION SQM',
    tag: 'Motorway Access',
    badge: 'M-1 Link Road',
    description: 'Strategically positioned next to the upcoming dedicated M-1 Motorway interchange for rapid commuting.',
    image: '/images/imgi_4_DJI_20250818121525_0053_D-scaled.jpg',
    href: '/blocks/block-d'
  }
];

interface ExpandingProjectsShowcaseProps {
  items?: ShowcaseItem[];
  defaultActiveIndex?: number;
  containerHeightClass?: string;
  className?: string;
  roundedClass?: string;
}

export default function ExpandingProjectsShowcase({
  items = defaultFaisalHillsBlocks,
  defaultActiveIndex = 0,
  containerHeightClass = 'h-[460px] sm:h-[500px] lg:h-[540px]',
  className = '',
  roundedClass = 'rounded-3xl'
}: ExpandingProjectsShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(defaultActiveIndex);
  const displayItems = Array.isArray(items) && items.length > 0 ? items : defaultFaisalHillsBlocks;

  return (
    <div className={`w-full overflow-hidden ${roundedClass} border border-slate-200/80 shadow-xl bg-slate-950 ${className}`}>
      <div className={`flex flex-col md:flex-row w-full ${containerHeightClass}`}>
        {displayItems.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={item.id || index}
              onMouseEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              style={{
                flex: isHovered ? '2.5' : '1',
                transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              className="relative overflow-hidden cursor-pointer min-w-0 min-h-0 border-b md:border-b-0 md:border-r last:border-b-0 md:last:border-r-0 border-white/15"
            >
              <Link href={item.href || '#'} className="block w-full h-full relative group">
                {/* Background Image with smooth Zoom & Light Tint */}
                <div className="absolute inset-0 bg-slate-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-110 brightness-95' : 'scale-100 brightness-85 group-hover:scale-105'
                    }`}
                  />
                  {/* Atmospheric Tint Gradient matching screenshot */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isHovered
                        ? 'bg-gradient-to-t from-black/90 via-black/45 to-black/10'
                        : 'bg-gradient-to-t from-black/85 via-black/35 to-black/15 group-hover:from-black/90'
                    }`}
                  />
                  {/* Subtle Top Gradient for high contrast */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
                </div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none gap-2">
                  {item.tag && (
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 ${
                        isHovered
                          ? 'bg-[#7b002c]/90 text-white shadow-md'
                          : 'bg-black/50 text-slate-200'
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-md backdrop-blur-md transition-opacity duration-300 ${
                        isHovered ? 'opacity-100 bg-white/20 text-white' : 'opacity-0'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Bottom Content Area */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                  <div className="space-y-1">
                    {/* Main Title in Serif Font */}
                    <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-normal drop-shadow-md transition-colors group-hover:text-rose-100 truncate">
                      {item.title}
                    </h3>

                    {/* Area / Metric Subtitle in Uppercase Tracking */}
                    {item.areaSubtitle && (
                      <p className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-slate-200 uppercase drop-shadow-sm truncate">
                        {item.areaSubtitle}
                      </p>
                    )}
                  </div>

                  {/* Expanded Information Reveal on Hover */}
                  <div
                    className={`transition-all duration-500 ease-out overflow-hidden ${
                      isHovered
                        ? 'max-h-40 opacity-100 mt-3 pt-2 border-t border-white/20'
                        : 'max-h-0 opacity-0 mt-0 pt-0 border-transparent'
                    }`}
                  >
                    <div className="space-y-3">
                      {item.description && (
                        <p className="text-xs text-slate-200 leading-relaxed font-sans line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-white/20 hover:bg-[#7b002c] px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/30 transition-all">
                        <span>Explore Sector</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
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
