'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle2, ArrowRight, MessageSquare, PhoneCall, Clock, Navigation, AlertCircle } from 'lucide-react';
import { submitLead } from '@/data/faisalHillsData';

export default function FHLocationPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !visitDate) return;

    const leadData = {
      name,
      phone,
      interest: `Site Visit Request: Preferred Date ${visitDate}`,
      message: `Requesting guided tour of Faisal Hills on ${visitDate}.`
    };

    try {
      // 1. Submit lead to backend
      await submitLead(leadData);

      // 2. Save locally for admin dashboard
      if (typeof window !== 'undefined') {
        const existingLeads = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
        const newLead = {
          id: `lead-${Date.now()}`,
          name,
          phone,
          interest: `Site Visit Scheduled`,
          message: `Scheduled Date: ${visitDate}`,
          submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        localStorage.setItem('faisal_leads_data', JSON.stringify([newLead, ...existingLeads]));
        window.dispatchEvent(new Event('faisal_leads_updated'));
      }

      setSubmitted(true);

      // 3. Redirect to WhatsApp
      const waText = encodeURIComponent(
        `Hello Faisal Hills Team!\n\nI want to schedule a Free Site Visit.\nName: ${name}\nPhone: ${phone}\nPreferred Date: ${visitDate}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/923044811717?text=${waText}`, '_blank');
        setName('');
        setPhone('');
        setVisitDate('');
        setSubmitted(false);
      }, 800);

    } catch (err) {
      console.error("Failed to submit location inquiry:", err);
      alert("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="bg-[#fff8f6] min-h-screen text-slate-900 font-sans selection:bg-[#7b002c] selection:text-white pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative bg-[#4c050d] text-white overflow-hidden py-20 lg:py-28 border-b border-[#7b002c]/40">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4c050d] via-transparent to-[#4c050d]/50" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 px-4 py-1.5 rounded-sm backdrop-blur-md">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="label-caps text-xs text-white tracking-widest font-bold">
              Main N-5 GT Road, Taxila
            </span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-tight">
              Faisal Hills Location
            </h1>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-3xl font-light font-sans">
              Perfectly positioned on Main GT Road near Taxila Bypass. Outstanding regional accessibility with direct linkages to CPEC, Margalla Avenue, M-1, and M-2 Motorways.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Location details */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Location Summary Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 bg-rose-50 text-[#7b002c] rounded-xl flex items-center justify-center">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-[#7b002c] font-bold uppercase tracking-widest block">Geographic Advantage</span>
                <h2 className="font-serif text-2xl font-bold text-slate-900">Strategic Road Connections</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-sans">
              <p>
                Faisal Hills is situated on the primary N-5 National Highway (GT Road) corridor, lying just outside the Rawalpindi–Islamabad metropolitan boundary in Taxila. This location acts as a crossroads connecting the Twin Cities to the industrial clusters of Taxila, Wah Cantt, and Khyber Pakhtunkhwa.
              </p>
              <p>
                A key benefit of its placement is its dual accessibility. It features a grand 225ft wide main entrance monument directly opening onto the GT Road, and is positioned near the Brahma Jhang Bahtar Interchange on the M-1 Motorway. The newly developed Margalla Avenue linkage further reduces the driving distance to central Islamabad (Sector F-10, E-11, and Blue Area) to a matter of minutes.
              </p>
            </div>
          </div>

          {/* Travel Times Grid */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Access Travel Times
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#7b002c] shrink-0" />
                  <span className="font-bold text-slate-800">Taxila Bypass</span>
                </div>
                <span className="font-bold text-rose-700">~ 5 mins</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#7b002c] shrink-0" />
                  <span className="font-bold text-slate-800">M-1 Motorway Link</span>
                </div>
                <span className="font-bold text-rose-700">~ 10 mins</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#7b002c] shrink-0" />
                  <span className="font-bold text-slate-800">F-10 Islamabad</span>
                </div>
                <span className="font-bold text-rose-700">~ 20 mins</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#7b002c] shrink-0" />
                  <span className="font-bold text-slate-800">Islamabad Airport</span>
                </div>
                <span className="font-bold text-rose-700">~ 35 mins</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Placeholder */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">Official Location Map</h3>
            <div className="relative overflow-hidden rounded-xl border border-slate-150 aspect-[16/9] bg-slate-100 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80"
                alt="Faisal Hills Map Location"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                <a
                  href="https://maps.google.com/?q=Faisal+Hills+Taxila"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#7b002c] text-white text-xs font-bold uppercase rounded-lg shadow-lg flex items-center gap-2 hover:bg-[#9e1245] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Site Visit Request Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-md space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold text-[#7b002c] uppercase tracking-widest block">Site Tour</span>
            <h3 className="font-serif text-xl font-bold text-slate-900">Schedule Site Visit</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Interested in seeing Faisal Hills on-ground development? Book a guided site visit with our sales consultant.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ubaid Khan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-350 bg-slate-50 px-3.5 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7b002c] focus:bg-white text-slate-800 font-sans transition-all text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. +92 300 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-350 bg-slate-50 px-3.5 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7b002c] focus:bg-white text-slate-800 font-sans transition-all text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Preferred Visit Date *</label>
              <input
                type="date"
                required
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full border border-slate-350 bg-slate-50 px-3.5 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7b002c] focus:bg-white text-slate-800 font-sans transition-all text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] disabled:bg-slate-400 text-white font-bold tracking-wider rounded-lg shadow-md transition-all uppercase flex items-center justify-center gap-2 cursor-pointer mt-2 active:scale-98"
            >
              <span>{submitted ? 'REDIRECTING...' : 'SCHEDULE SITE TOUR'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>

          <div className="border-t border-slate-100 pt-5 text-center space-y-4">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">Or Contact Directly</span>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="https://wa.me/923044811717"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-[10px] font-bold tracking-wider rounded-lg flex items-center justify-center gap-1.5 uppercase transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+923044811717"
                className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-[10px] font-bold tracking-wider rounded-lg flex items-center justify-center gap-1.5 uppercase transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
