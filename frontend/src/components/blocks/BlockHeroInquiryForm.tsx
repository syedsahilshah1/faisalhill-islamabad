'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { submitLead } from '@/data/faisalHillsData';

interface BlockHeroInquiryFormProps {
  blockName: string;
  blockSlug: string;
}

export default function BlockHeroInquiryForm({ blockName, blockSlug }: BlockHeroInquiryFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [plotSize, setPlotSize] = useState('5 Marla');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    const leadData = {
      name,
      phone,
      interest: `${blockName} - ${plotSize}`,
      message: `Direct inquiry from ${blockName} hero form. Interested in ${plotSize}.`
    };

    try {
      // 1. Submit lead
      await submitLead(leadData);

      // 2. Save locally for admin dashboard
      if (typeof window !== 'undefined') {
        const existingLeads = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
        const newLead = {
          id: `lead-${Date.now()}`,
          name,
          phone,
          interest: `${blockName} - ${plotSize}`,
          message: `Hero Quick Quote: ${plotSize}`,
          submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        localStorage.setItem('faisal_leads_data', JSON.stringify([newLead, ...existingLeads]));
        window.dispatchEvent(new Event('faisal_leads_updated'));
      }

      setSubmitted(true);
      setLoading(false);

      // 3. Open WhatsApp after a brief delay
      const waText = encodeURIComponent(
        `Hi Faisal Hills Desk!\n\nI want rate list and available plots in *${blockName}*.\nName: ${name}\nPhone: ${phone}\nPlot Size: ${plotSize}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/923044811717?text=${waText}`, '_blank');
      }, 700);

    } catch (err) {
      console.error(err);
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-transparent p-0 sm:p-2 space-y-4 text-white relative">

      <div className="space-y-1 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>VIP Desk Inquiry</span>
        </div>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
          Get {blockName} Plot Rates
        </h3>
        <p className="text-xs text-slate-200">
          Receive verified resale prices & available plot map on WhatsApp.
        </p>
      </div>

      {submitted ? (
        <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-2.5 animate-fade-in relative z-10">
          <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-base text-white">Inquiry Sent!</h4>
          <p className="text-xs text-slate-200">
            Thank you <strong>{name}</strong>. Redirecting to WhatsApp with official {blockName} rate file...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-200 block">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tariq Mehmood"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/40 border border-white/30 rounded-xl text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-amber-400 focus:bg-black/60 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-200 block">
              WhatsApp / Phone *
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 0300 1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/40 border border-white/30 rounded-xl text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-amber-400 focus:bg-black/60 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-200 block">
              Interested Plot Size
            </label>
            <select
              value={plotSize}
              onChange={(e) => setPlotSize(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/70 border border-white/30 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 transition-all"
            >
              <option value="5 Marla (25x50)">5 Marla (25 × 50)</option>
              <option value="8 Marla (30x60)">8 Marla (30 × 60)</option>
              <option value="10 Marla (35x70)">10 Marla (35 × 70)</option>
              <option value="14 Marla (40x80)">14 Marla (40 × 80)</option>
              <option value="1 Kanal (50x90)">1 Kanal (50 × 90)</option>
              <option value="Commercial Plaza Plot">Commercial Plaza Plot</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            {loading ? (
              <span>Connecting...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Get Instant Rate & Details</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-300 pt-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>100% Free Consultation • Official RDA Pricing</span>
          </div>
        </form>
      )}
    </div>
  );
}
