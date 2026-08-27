'use client';

import React, { useEffect, useState } from 'react';
import { Scale, ShieldCheck } from 'lucide-react';
import { LegalPolicyData, defaultTermsOfService, fetchSettingByKey } from '@/data/faisalHillsData';

export default function TermsOfServicePage() {
  const [policy, setPolicy] = useState<LegalPolicyData>(defaultTermsOfService);

  useEffect(() => {
    fetchSettingByKey<LegalPolicyData>('terms_of_service').then((data) => {
      if (data && data.sections) {
        setPolicy(data);
      }
    }).catch(console.error);
  }, []);

  return (
    <div className="bg-[#fff8f6] min-h-screen text-slate-900 font-sans selection:bg-[#7b002c] selection:text-white pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#4c050d] text-white py-16 px-6 lg:px-12 border-b border-[#7b002c]/40">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs bg-white/10 border border-white/20 px-3 py-1 rounded-sm uppercase tracking-wider font-bold">
            Legal & Compliance
          </span>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white">
            {policy.title || 'Terms of Service'}
          </h1>
          <p className="text-slate-300 text-sm font-light max-w-2xl">
            Last Updated: {policy.lastUpdated || 'August 2026'} • Please read these terms carefully before utilizing our real estate information portal.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 mt-12 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-12 space-y-8 text-slate-700 leading-relaxed text-sm">
        {policy.sections && policy.sections.map((section, idx) => (
          <div key={idx} className={`space-y-3.5 ${idx > 0 ? 'border-t border-slate-100 pt-6' : ''}`}>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-[#7b002c] shrink-0" />
              <span>{section.title}</span>
            </h2>
            <div className="text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {section.content}
            </div>
          </div>
        ))}
      </main>

    </div>
  );
}
