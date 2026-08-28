'use client';

import React, { useState } from 'react';
import { X, Download, ShieldCheck, CheckCircle2, User, Phone, Calendar, Mail } from 'lucide-react';
import { submitLead } from '@/data/faisalHillsData';

interface MapDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mapPdfUrl?: string;
  blockName?: string;
  mapImageUrl?: string;
}

export default function MapDownloadModal({
  isOpen,
  onClose,
  mapPdfUrl = '/FAISAL HILLS MASTER PLAN.pdf',
  blockName,
  mapImageUrl,
}: MapDownloadModalProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadData = {
      id: `lead-map-${Date.now()}`,
      name: name || 'Interested User',
      age: age || 'N/A',
      phone: phone || 'N/A',
      email: email || 'N/A',
      interest: 'Master Plan PDF Map Download',
      message: `Downloaded Master Plan PDF map. Age: ${age}, Contact: ${phone}, Email: ${email}`,
      submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // 1. Save to LocalStorage (Syncs with Admin Panel Leads tab)
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
      localStorage.setItem('faisal_leads_data', JSON.stringify([leadData, ...existing]));
      window.dispatchEvent(new Event('faisal_leads_updated'));
    }

    // 2. Submit to API backend (for email & admin notifications)
    try {
      await submitLead({
        name,
        phone,
        message: `MAP DOWNLOAD LEAD - Age: ${age}, Email: ${email}, Phone: ${phone}`,
      });
    } catch (err) {
      console.error('Lead submission error:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    // 3. Trigger actual PDF Map File Download in browser
    const link = document.createElement('a');
    link.href = mapPdfUrl;
    link.download = 'FAISAL HILLS MASTER PLAN.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close modal after 3s delay
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-xl overflow-y-auto transition-opacity duration-300">

      {/* Click Backdrop */}
      <div className="fixed inset-0 bg-slate-950/95 -z-10" onClick={onClose} />

      <div className={`bg-white rounded-3xl border border-slate-200 shadow-2xl ${mapImageUrl ? 'max-w-4xl' : 'max-w-md'} w-full overflow-hidden relative transform transition-all duration-300 scale-100 my-auto z-10 animate-fade-up`}>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-black/40 hover:bg-black/70 transition-colors cursor-pointer z-30 shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={mapImageUrl ? 'grid grid-cols-1 lg:grid-cols-12 items-stretch' : ''}>

          {/* Left Column: HD Map Preview (Desktop) */}
          {mapImageUrl && (
            <div className="lg:col-span-6 bg-slate-950 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
              <div className="flex items-center justify-between z-10 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                  {blockName || 'Master Plan Blueprint'}
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-black/60 px-2 py-0.5 rounded-full border border-emerald-400/20">
                  HD Official Layout
                </span>
              </div>

              <div className="relative flex-1 flex items-center justify-center my-auto min-h-[220px] sm:min-h-[300px]">
                <img
                  src={mapImageUrl}
                  alt={blockName ? `${blockName} Master Plan` : 'Master Plan Map'}
                  className="max-h-[360px] w-auto max-w-full object-contain rounded-xl shadow-lg"
                />
              </div>

              <div className="pt-2 z-10 flex items-center justify-between text-[11px] text-slate-400">
                <span>RDA Approved Layout Plan</span>
                <span className="font-mono text-slate-300">Format: High-Res PDF</span>
              </div>
            </div>
          )}

          {/* Right Column: Form */}
          <div className={mapImageUrl ? 'lg:col-span-6 flex flex-col justify-between' : ''}>
            {/* Header */}
            <div className="bg-[#7b002c] text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 text-white/80 mb-1">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="label-caps text-[10px]">Official Master Plan Download</span>
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl pr-8">
                Download High-Res Map
              </h3>
              <p className="text-white/80 text-xs mt-1">
                Please enter your details below to unlock & download the official high-resolution PDF Master Plan.
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {isSuccess ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-slate-900">Download Started!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Thank you, <strong>{name}</strong>. Your high-resolution PDF map download has begun. You can also explore the complete interactive map viewer.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/master-plan"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all"
                    >
                      <span>Open Complete Interactive Map</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#7b002c]" /> Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Ali"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#7b002c]" /> Age <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="18"
                        max="99"
                        placeholder="e.g. 35"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#7b002c]" /> Contact / WhatsApp <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#7b002c]" /> Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 mt-2"
                  >
                    <Download className="w-4 h-4 text-white" />
                    <span>{isSubmitting ? 'Processing...' : 'Submit & Download PDF Map'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
