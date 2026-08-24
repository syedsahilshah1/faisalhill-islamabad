'use client';

import React, { useEffect, useRef, useState } from 'react';
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
    description: 'Contact our sales team via phone, WhatsApp, or the online form. Tell us your budget, preferred plot size, and sector. We will present you with available options and guide you through the current pricing.',
    stepTag: 'Step 1: Selection',
    icon: Search,
  },
  {
    number: '02',
    title: 'Step 2 — Reserve & Submit Documents',
    description: 'Once you select your preferred plot, a booking form is completed and submitted along with the booking amount (pay order or bank transfer in favour of Zedem International). Bring your CNIC copy and two passport photographs.',
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
  const targetRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollableDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const maxTranslatePercent = 60;
  const translateX = scrollProgress * maxTranslatePercent;

  return (
    <>
      {/* ========================================================= */}
      {/* MOBILE VIEW (Clean Vertical Step Cards with No Cutoff)    */}
      {/* ========================================================= */}
      <section className="block md:hidden bg-slate-50 py-12 px-4 sm:px-6 border-y border-slate-200 space-y-8">
        <div className="text-center space-y-2">
          <span className="label-caps text-[#7b002c] font-bold block">
            How to Book
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#7b002c] tracking-tight leading-tight">
            A Simple 5-Step Booking Process
          </h2>
          <p className="text-slate-600 text-xs leading-relaxed max-w-xl mx-auto font-sans">
            We have designed the Faisal Hills Islamabad booking details process to be as straightforward and stress-free as possible.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 60}>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif font-black text-[#7b002c]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center border border-rose-100">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#7b002c] uppercase tracking-wider block">
                      {step.stepTag}
                    </span>
                    <h3 className="font-serif font-bold text-base text-slate-900 leading-snug mt-0.5">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* DESKTOP VIEW (Rich Pinned Sticky Horizontal Scroll)       */}
      {/* ========================================================= */}
      <section ref={targetRef} className="hidden md:block relative h-[240vh] bg-slate-50 border-y border-slate-200/80">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-center py-8 px-4 sm:px-8 lg:px-12 space-y-6 lg:space-y-8 z-10">
          
          {/* Pinned Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 shrink-0">
            <span className="label-caps text-[#7b002c] font-bold block mb-1">
              How to Book
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7b002c] tracking-tight leading-tight">
              A Simple 5-Step Booking Process
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-sans">
              We have designed the Faisal Hills Islamabad booking details process to be as straightforward and stress-free as possible. Here is exactly what happens from your first inquiry to the day you hold your allotment letter:
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

                      <div>
                        <span className="text-[10px] font-bold text-[#7b002c] uppercase tracking-wider block mb-1">
                          {step.stepTag}
                        </span>
                        <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 leading-snug group-hover:text-[#7b002c] transition-colors">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
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
    </>
  );
}
