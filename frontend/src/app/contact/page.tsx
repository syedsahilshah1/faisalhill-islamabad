'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, Phone, MessageSquare, MapPin, Mail, Clock, 
  ShieldCheck, CheckCircle2, ArrowRight, Star
} from 'lucide-react';
import { blocksData } from '@/data/faisalHillsData';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('Executive Block');
  const [plotSize, setPlotSize] = useState('5 Marla');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const existingLeads = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
      const newLead = {
        id: `lead-${Date.now()}`,
        name: name || 'Interested Buyer',
        phone: phone || 'N/A',
        interest: `${selectedBlock} (${plotSize})`,
        message: message,
        submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      localStorage.setItem('faisal_leads_data', JSON.stringify([newLead, ...existingLeads]));
      window.dispatchEvent(new Event('faisal_leads_updated'));
    }
    setSubmitted(true);

    const waText = encodeURIComponent(
      `Hello Faisal Hills Sales Team!\n\nI am submitting a Contact Form inquiry:\nName: ${name}\nPhone: ${phone}\nBlock Interest: ${selectedBlock}\nPlot Size: ${plotSize}\n${message ? `Message: ${message}` : ''}`
    );
    
    setTimeout(() => {
      window.open(`https://wa.me/923044811717?text=${waText}`, '_blank');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 font-sans">
      {/* Top Banner Header */}
      <section className="relative bg-slate-900 py-20 px-6 overflow-hidden text-center sm:text-left">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 opacity-90" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#7b002c]/20 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7b002c]/30 text-rose-300 border border-rose-500/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>Official Support Desk</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Connect With Faisal Hills Sales & Booking Team
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Get in touch for verified inventory, official map layouts, payment plans, site visits, and instant booking coordination.
          </p>
        </div>
      </section>

      {/* Main Grid Contact & Info */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Cards Info */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-3">
              <span className="label-caps text-[#7b002c] font-bold block">Contact Information</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Direct Communication Channels
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect with our senior consultants directly via WhatsApp, Phone call, or visit our office. We are operational 24/7 for overseas queries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/923044811717"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-48 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Chat on WhatsApp</span>
                  <span className="text-slate-900 font-bold text-sm block">+92 304 4811717</span>
                  <span className="text-[10px] text-emerald-600 font-medium block">Active Response Desk</span>
                </div>
              </a>

              {/* Call Hotline Card */}
              <a 
                href="tel:+923044811717"
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-48 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#7b002c]/5 text-[#7b002c] flex items-center justify-center group-hover:bg-[#7b002c] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Call Direct Hotline</span>
                  <span className="text-slate-900 font-bold text-sm block">+92 304 4811717</span>
                  <span className="text-[10px] text-[#7b002c] font-medium block">Standard Calling Rates Apply</span>
                </div>
              </a>

              {/* Email Support Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between h-48">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Email Inquiries</span>
                  <span className="text-slate-900 font-bold text-sm block">info@faisalhills.com</span>
                  <span className="text-[10px] text-slate-500 block">Response within 24 hours</span>
                </div>
              </div>

              {/* Office Hours Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between h-48">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Office Hours</span>
                  <span className="text-slate-900 font-bold text-sm block">09:00 AM - 06:00 PM</span>
                  <span className="text-[10px] text-slate-500 block">Monday to Saturday</span>
                </div>
              </div>

            </div>

            {/* Registered Badges */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
              <strong className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Authorized Sales Partner
              </strong>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                We handle legal transfers, biometric registration, NOC status verification, and installment bookings under official society guidelines.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 text-[#7b002c] rounded-full flex items-center justify-center mx-auto border border-slate-200 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-[#7b002c]" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#7b002c]">Thank You, {name}!</h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed font-sans">
                  Your lead interest for **{selectedBlock} ({plotSize})** has been registered locally. We are now redirecting you to WhatsApp for direct representative coordination.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs font-semibold"
                >
                  Submit Another Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900">Send an Online Inquiry</h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    Our team will prepare pricing options matching your criteria.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Yasir"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] transition font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] transition font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Preferred Block Interest</label>
                    <select
                      value={selectedBlock}
                      onChange={(e) => setSelectedBlock(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] font-sans"
                    >
                      {blocksData.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                      <option value="Commercial Sector">Commercial Sector</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Preferred Plot Size</label>
                    <select
                      value={plotSize}
                      onChange={(e) => setPlotSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] font-sans"
                    >
                      <option value="5 Marla">5 Marla (Residential)</option>
                      <option value="8 Marla">8 Marla (Residential)</option>
                      <option value="10 Marla">10 Marla (Residential)</option>
                      <option value="12 Marla">12 Marla (Residential)</option>
                      <option value="1 Kanal">1 Kanal (Residential)</option>
                      <option value="5 Marla Commercial">5 Marla Commercial</option>
                      <option value="8 Marla Commercial">8 Marla Commercial</option>
                      <option value="10 Marla Commercial">10 Marla Commercial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Additional Requirements / Message</label>
                  <textarea
                    rows={4}
                    placeholder="Describe what you are looking for (e.g. corner plot, boulevard facing, lump-sum booking discount, etc.)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] transition font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Inquiry via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Map Embed Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pb-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch h-[450px]">
          
          {/* Map Info Box */}
          <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-slate-950 text-white">
            <div className="space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Office Location</span>
              <h3 className="font-serif text-2xl font-bold">Faisal Hills Marketing Desk</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Our main consulting office is located on the Main Boulevard, Faisal Hills, Grand Trunk Road, Taxila (near Rawalpindi/Islamabad).
              </p>
              <div className="space-y-2 text-xs font-sans text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#7b002c] shrink-0 mt-0.5" />
                  <span>Main GT Road, N-5, Taxila Bypass, Punjab</span>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md transition-all block"
            >
              Open in Google Maps
            </a>
          </div>

          {/* Map Embedded Mock */}
          <div className="lg:col-span-8 relative bg-slate-200">
            <iframe
              title="Faisal Hills Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.688177579174!2d72.82583857640237!3d33.729906673280145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa13d8d672957%3A0xe54d9c4900a0b2d6!2sFaisal%20Hills%20Taxila!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>
    </div>
  );
}
