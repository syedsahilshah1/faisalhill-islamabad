'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Search, FileText, Award, Calculator, ShieldCheck, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

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
    title: 'Step 1 — Enquire & Choose Your Plot',
    description: 'Contact our sales team via phone, WhatsApp, or the online form. Tell us your budget, preferred plot size, and sector. We will present you with available options and guide you through current pricing.',
    stepTag: 'Step 1: Selection',
    icon: Search,
  },
  {
    number: '02',
    title: 'Step 2 — Reserve & Submit Documents',
    description: 'Once you select your preferred plot, a booking form is completed and submitted along with the booking amount (bank transfer in favour of Zedem International). Bring your CNIC copy and photos.',
    stepTag: 'Step 2: Documentation',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Step 3 — Receive Your Allotment Letter',
    description: 'Within 2–4 weeks of booking confirmation, your official allotment letter is issued by Zedem International, confirming your plot number, block, size, total value, and instalment schedule.',
    stepTag: 'Step 3: Allotment',
    icon: Award,
  },
  {
    number: '04',
    title: 'Step 4 — Pay Instalments & Track Development',
    description: 'Pay your quarterly instalments according to the agreed schedule. Our team provides regular development updates so you always know the status of your investment. Site visits can be arranged at any time.',
    stepTag: 'Step 4: Installments',
    icon: Calculator,
  },
  {
    number: '05',
    title: 'Step 5 — Take Possession',
    description: 'Once development milestones are met and possession charges paid, your plot is handed over with all legal documentation ready for construction. Congratulations — you are now a Faisal Hills homeowner.',
    stepTag: 'Step 5: Handover',
    icon: ShieldCheck,
  },
];

export default function StickyHorizontalBookingSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScrollX, setMaxScrollX] = useState(0);

  useEffect(() => {
    const calculateBounds = () => {
      if (trackRef.current && containerRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        const maxScroll = Math.max(0, trackWidth - containerWidth + 64);
        setMaxScrollX(maxScroll);
      }
    };

    calculateBounds();
    window.addEventListener('resize', calculateBounds);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalScrollableDistance = rect.height - windowHeight;

            if (totalScrollableDistance > 0) {
              const currentScroll = -rect.top;
              const rawProgress = currentScroll / (totalScrollableDistance * 0.92);
              const progress = Math.min(Math.max(rawProgress, 0), 1);
              setScrollProgress(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', calculateBounds);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentStepIndex = Math.min(
    Math.floor(scrollProgress * steps.length),
    steps.length - 1
  );

  return (
    <>
      {/* ========================================================= */}
      {/* MOBILE VIEW (2 to 3 Step Cards Per Row Grid)              */}
      {/* ========================================================= */}
      <section className="block md:hidden bg-slate-50 py-10 px-3.5 sm:px-6 border-y border-slate-200 space-y-6">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <span className="label-caps text-[#7b002c] font-bold block">
            How to Book
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#7b002c] tracking-tight leading-tight">
            A Simple 5-Step Booking Process
          </h2>
          <p className="text-slate-600 text-xs leading-relaxed font-sans">
            We have designed the Faisal Hills Islamabad booking process to be straightforward and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <ScrollReveal 
                key={idx} 
                direction="up" 
                delay={idx * 40}
                className={`h-full ${isLast ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <div className={`bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between h-full space-y-2 hover:border-[#7b002c]/30 transition-all ${
                  isLast ? 'bg-gradient-to-br from-rose-50/50 via-white to-white border-rose-200/70' : ''
                }`}>
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-lg sm:text-2xl font-serif font-black text-[#7b002c]">
                      {step.number}
                    </span>
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-rose-50 text-[#7b002c] flex items-center justify-center border border-rose-100 shrink-0">
                      <IconComp className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[8px] sm:text-[9px] font-bold text-[#7b002c] uppercase tracking-wider block">
                      {step.stepTag}
                    </span>
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed font-sans line-clamp-4 sm:line-clamp-none">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* DESKTOP VIEW (Pinned Sticky Horizontal Scroll Animation)  */}
      {/* ========================================================= */}
      <section
        ref={sectionRef}
        className="hidden md:block relative h-[280vh] bg-slate-50 border-y border-slate-200/90"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-6 overflow-hidden z-10 space-y-6">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 shrink-0">
            <span className="label-caps text-[#7b002c] font-bold block mb-0.5">
              How to Book
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] tracking-tight leading-tight">
              A Simple 5-Step Booking Process
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-sans">
              Scroll down to explore each step — from your first inquiry to the day you receive possession.
            </p>

            {/* Scroll Driven Progress Bar */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7b002c] transition-all duration-75 ease-out rounded-full"
                  style={{ width: `${Math.max(12, scrollProgress * 100)}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Step {currentStepIndex + 1} / {steps.length}
              </span>
            </div>
          </div>

          {/* Smooth Horizontal Track Driven by Vertical Scroll */}
          <div ref={containerRef} className="w-full overflow-visible py-2">
            <div
              ref={trackRef}
              className="flex items-stretch gap-6 transition-transform duration-75 ease-out will-change-transform px-6 sm:px-12 lg:px-20"
              style={{
                transform: `translate3d(-${scrollProgress * maxScrollX}px, 0, 0)`,
              }}
            >
              {steps.map((step, idx) => {
                const IconComp = step.icon;
                const isCurrent = currentStepIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`w-[310px] sm:w-[350px] lg:w-[380px] shrink-0 bg-white p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-5 ${
                      isCurrent
                        ? 'border-[#7b002c] shadow-xl ring-2 ring-[#7b002c]/20 scale-[1.02]'
                        : 'border-slate-200/90 shadow-md hover:shadow-lg hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-3.5">
                      {/* Card Header: Number + Icon */}
                      <div className="flex items-center justify-between">
                        <span className="text-3xl sm:text-4xl font-serif font-black text-[#7b002c]">
                          {step.number}
                        </span>
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all ${
                            isCurrent
                              ? 'bg-[#7b002c] text-white shadow-md'
                              : 'bg-rose-50 text-[#7b002c] border border-rose-100'
                          }`}
                        >
                          <IconComp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                        </div>
                      </div>

                      {/* Tag & Title */}
                      <div>
                        <span className="text-[10px] font-bold text-[#7b002c] uppercase tracking-wider block mb-1">
                          {step.stepTag}
                        </span>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3.5 border-t border-slate-100 text-xs font-semibold tracking-wider uppercase flex items-center justify-between">
                      <span className={isCurrent ? 'text-[#7b002c] font-bold' : 'text-slate-400'}>
                        {step.stepTag}
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isCurrent ? 'text-[#7b002c] translate-x-1' : 'text-slate-300'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
