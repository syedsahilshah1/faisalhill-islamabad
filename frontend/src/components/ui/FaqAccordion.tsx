'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FAQItem[];
  blockName?: string;
}

export default function FaqAccordion({ faqs, blockName = 'Faisal Hills' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3 max-w-4xl w-full">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#7b002c]/50 shadow-md'
                : 'bg-white border-slate-200 hover:border-[#7b002c]/30 hover:shadow-sm'
            }`}
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-3.5 pr-4">
                <HelpCircle
                  className={`w-5 h-5 mt-0.5 shrink-0 transition-colors duration-300 ${
                    isOpen ? 'text-[#7b002c]' : 'text-slate-400 group-hover:text-[#7b002c]/70'
                  }`}
                />
                <span
                  className={`font-serif font-bold text-sm sm:text-base transition-colors duration-300 ${
                    isOpen ? 'text-[#7b002c]' : 'text-slate-800'
                  }`}
                >
                  {faq.question}
                </span>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-350 shrink-0 ${
                  isOpen
                    ? 'bg-[#7b002c]/10 text-[#7b002c] rotate-180'
                    : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Smooth height and opacity transition */}
            <div
              className={`transition-all duration-350 ease-in-out ${
                isOpen ? 'max-h-96 border-t border-slate-100' : 'max-h-0'
              }`}
            >
              <div className="p-5 pl-14 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans bg-slate-50/50">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
