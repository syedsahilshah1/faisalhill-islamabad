'use client';

import React, { useEffect, useState } from 'react';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';
import { LegalPolicyData, defaultPrivacyPolicy, fetchSettingByKey } from '@/data/faisalHillsData';

export default function PrivacyPolicyPage() {
  const [policy, setPolicy] = useState<LegalPolicyData>(defaultPrivacyPolicy);

  useEffect(() => {
    // 1. Initial cached read
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('faisal_privacy_policy');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.sections) setPolicy(parsed);
        } catch (e) {}
      }
    }

    // 2. Fetch latest from database
    fetchSettingByKey<LegalPolicyData>('privacy_policy').then((data) => {
      if (data && data.sections) {
        setPolicy(data);
        if (typeof window !== 'undefined') {
          localStorage.setItem('faisal_privacy_policy', JSON.stringify(data));
        }
      }
    }).catch(console.error);

    // 3. Real-time update listeners
    const handleUpdate = () => {
      const cached = localStorage.getItem('faisal_privacy_policy');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.sections) setPolicy(parsed);
        } catch (e) {}
      }
      fetchSettingByKey<LegalPolicyData>('privacy_policy').then((data) => {
        if (data && data.sections) setPolicy(data);
      }).catch(console.error);
    };

    window.addEventListener('faisal_legal_policies_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('faisal_legal_policies_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
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
            {policy.title || 'Privacy Policy'}
          </h1>
          <p className="text-slate-300 text-sm font-light max-w-2xl">
            Last Updated: {policy.lastUpdated || 'August 2026'} • We respect your privacy and are committed to protecting the personal data you share with us.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 mt-12 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-12 space-y-8 text-slate-700 leading-relaxed text-sm">
        {policy.sections && policy.sections.map((section, idx) => (
          <div key={idx} className={`space-y-3.5 ${idx > 0 ? 'border-t border-slate-100 pt-6' : ''}`}>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[#7b002c] shrink-0" />
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
