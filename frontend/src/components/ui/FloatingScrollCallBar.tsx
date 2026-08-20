'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp, ShieldCheck } from 'lucide-react';
import LeadModal from './LeadModal';

export default function FloatingScrollCallBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Sticky Detail Bar appearing on scroll */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[92%] sm:w-auto bg-slate-950/90 text-white backdrop-blur-xl border border-[#7b002c]/50 rounded-2xl shadow-2xl p-2.5 sm:px-5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6 animate-fade-up">
        
        {/* Left Info Badges */}
        <div className="hidden md:flex items-center gap-3 border-r border-white/15 pr-5">
          <div className="w-8 h-8 rounded-full bg-[#7b002c] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">Faisal Hills Taxila</span>
            <strong className="text-xs text-white font-serif">RDA Approved • 20% Down Payment</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between">
          <a
            href="tel:+923001234567"
            className="flex-1 sm:flex-initial px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 flex items-center justify-center gap-1.5 transition-all hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span className="whitespace-nowrap">Call Sales</span>
          </a>

          <button
            onClick={() => setIsLeadModalOpen(true)}
            className="flex-1 sm:flex-initial px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all hover:scale-105 btn-shimmer border border-white/20 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span className="whitespace-nowrap">Instant Inquiry</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-all hover:scale-105 shrink-0 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
    </>
  );
}
