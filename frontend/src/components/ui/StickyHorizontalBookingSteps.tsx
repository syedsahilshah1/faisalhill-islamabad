'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, FileText, Award, Calculator, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BookingStep {
  number: string;
  title: string;
  description: string;
  stepTag: string;
  icon: React.ElementType;
}

const steps: BookingStep[] = [
  {
    number: '01',
    title: 'Enquire & Choose Plot',
    description: 'Contact our sales team via phone, WhatsApp, or form. Select your preferred plot size, block sector, and budget.',
    stepTag: 'Step 1: Selection',
    icon: Search,
  },
  {
    number: '02',
    title: 'Reserve & Submit Docs',
    description: 'Fill out the booking form and submit 20% down payment (pay order to Zedem International) along with CNIC copy & 2 photos.',
    stepTag: 'Step 2: Documentation',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Receive Allotment Letter',
    description: 'Within 2–4 weeks, your official allotment letter is issued by Zedem International confirming plot #, block, and value.',
    stepTag: 'Step 3: Allotment',
    icon: Award,
  },
  {
    number: '04',
    title: 'Pay Instalments & Track',
    description: 'Pay quarterly instalments over 3 years. Receive regular site construction updates and schedule site visits anytime.',
    stepTag: 'Step 4: Installments',
    icon: Calculator,
  },
  {
    number: '05',
    title: 'Take Possession',
    description: 'Once development milestones are met, take possession of your plot with all legal paperwork ready for construction!',
    stepTag: 'Step 5: Handover',
    icon: ShieldCheck,
  },
];

export default function StickyHorizontalBookingSteps() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;

      const element = targetRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Total distance user can scroll inside this pinned section
      const totalScrollableDistance = rect.height - windowHeight;
      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute translateX percentage dynamically: slides cards horizontally as user scrolls down
  const maxTranslatePercent = 60; // Total horizontal distance percentage shift
  const translateX = scrollProgress * maxTranslatePercent;

  return (
    <section ref={targetRef} className="relative h-[240vh] bg-slate-50 border-y border-slate-200/80">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-10 px-4 sm:px-8 lg:px-12 space-y-8 lg:space-y-10">
        
        {/* Pinned Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 shrink-0">
          <div className="inline-flex items-center gap-2 text-[#7b002c] font-bold text-xs uppercase tracking-widest bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200/80 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#7b002c]" />
            <span>HASSLE-FREE ALLOTMENT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 tracking-tight leading-tight">
            HOW TO BOOK: A Simple 5-Step Process
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-sans">
            We have designed the Faisal Hills booking process to be straightforward and stress-free. Scroll down to navigate through all 5 allotment steps:
          </p>

          {/* Dynamic Scroll Progress Bar */}
          <div className="w-48 h-1.5 bg-slate-200 rounded-full mx-auto overflow-hidden mt-3">
            <div
              className="h-full bg-[#7b002c] transition-all duration-75 ease-out rounded-full"
              style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* Horizontal Slider Track Driven Directly by Scroll */}
        <div className="w-full overflow-hidden">
          <div
            className="flex items-stretch gap-6 transition-transform duration-75 ease-out will-change-transform px-4 sm:px-12 lg:px-20"
            style={{ transform: `translate3d(-${translateX}%, 0, 0)` }}
          >
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  className="w-[300px] sm:w-[360px] lg:w-[400px] shrink-0 bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#7b002c]/50 transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-serif font-black text-[#7b002c] group-hover:scale-110 transition-transform">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#7b002c] flex items-center justify-center border border-rose-100 group-hover:bg-[#7b002c] group-hover:text-white transition-all duration-300 shadow-xs">
                        <IconComp className="w-6 h-6 stroke-[1.8]" />
                      </div>
                    </div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#7b002c] transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 font-semibold tracking-wider uppercase flex items-center justify-between">
                    <span>{step.stepTag}</span>
                    <span className="text-[#7b002c] opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
