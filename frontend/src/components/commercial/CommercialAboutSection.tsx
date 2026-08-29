'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const CommercialAboutSection: React.FC = () => {
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);

  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Main intro text with See More toggle */}
        <div className="lg:col-span-6 space-y-5">
          <ScrollReveal direction="left" delay={50}>
            <div className="space-y-2">
              <span className="label-caps text-[#7b002c] font-bold block">About Faisal Hills Commercial</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                Prime Commercial Real Estate Engineered for High Footfall & Capital Growth
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-sans">
              <p>
                While residential plots offer peaceful family living, commercial property in Faisal Hills is purchased for one definitive advantage: <strong>commanding position along high-traffic corridors to generate predictable, passive rental income</strong> and exceptional capital appreciation.
              </p>
              <p>
                Developed by Zedem International under the leadership of Chaudhry Abdul Majeed, Faisal Hills spans over 12,000+ Kanals on the main Grand Trunk (GT) Road corridor near Taxila. Commercial sectors are located on key arterial arteries: the 225ft Grand Entrance Boulevard, the 150ft Central Expressway, and the designated Block C Mega Civic Center.
              </p>
              <p>
                Whether you are planning a multi-storey shopping plaza, a corporate banking branch, a retail grocery mart, or holding an installment file for capital growth, our commercial inventory covers all sizes with verified RDA title clearances.
              </p>

              {/* Expandable See More Content with Smooth Animation */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isSeeMoreOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-4 pt-2 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
                  <p>
                    <strong>High Footfall Positioning:</strong> With thousands of resident families already settled in Executive Block, Block A, and Block B, commercial outlets enjoy built-in daily customer demand. Operational institutions like Roots International School and the upcoming Central Hospital generate thousands of daily visitors.
                  </p>
                  <p>
                    <strong>Approved Building Bylaws:</strong> Unlike conventional societies, Faisal Hills allows multi-storey plaza construction with Basement + Ground + 4 to 9 Floors (B+G+9) on major boulevards, enabling owners to lease separate ground-floor retail shops and upper corporate suites.
                  </p>
                  <p>
                    <strong>Guaranteed Legal Freehold Title:</strong> Every commercial plot carries official RDA layout approval with direct biometric transfer and allotment letters issued at the Zedem International Head Office.
                  </p>
                </div>
              </div>

              {/* See More / See Less Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsSeeMoreOpen(!isSeeMoreOpen)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] bg-rose-50 hover:bg-rose-100 border border-rose-200/60 px-4 py-2 rounded-full transition-all duration-300 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer group"
                >
                  <span>{isSeeMoreOpen ? 'See Less' : 'See More About Commercial Potential'}</span>
                  {isSeeMoreOpen ? (
                    <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  )}
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Rich Commercial Image Gallery */}
        <div className="lg:col-span-6 h-full">
          <ScrollReveal direction="right" delay={100} className="h-full">
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Image 1: Flagship Retail Store */}
              <div className="relative h-64 sm:h-72 lg:h-full min-h-[280px] rounded-3xl overflow-hidden shadow-md group bg-slate-900 border border-slate-200 hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/commercial/flagship-store.jpg"
                  alt="Faisal Hills Boulevard Commercial Plaza"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent group-hover:from-slate-950/70 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform group-hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider block">Executive Boulevard</span>
                  <strong className="text-xs sm:text-sm font-serif font-bold text-white block truncate">225ft Commercial Frontage</strong>
                </div>
              </div>

              {/* Image 2: Food Court & Plazas */}
              <div className="relative h-64 sm:h-72 lg:h-full min-h-[280px] rounded-3xl overflow-hidden shadow-md group bg-slate-900 border border-slate-200 hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/commercial/food-court.jpg"
                  alt="Block C Civic Center Plazas"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent group-hover:from-slate-950/70 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform group-hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Civic Center</span>
                  <strong className="text-xs sm:text-sm font-serif font-bold text-white block truncate">800+ Commercial Plazas</strong>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
