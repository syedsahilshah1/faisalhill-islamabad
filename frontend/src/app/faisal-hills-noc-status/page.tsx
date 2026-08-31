'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, MessageSquare, PhoneCall, FileText, BadgeCheck, AlertCircle } from 'lucide-react';
import { submitLead } from '@/data/faisalHillsData';

export default function FHNocStatusPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [block, setBlock] = useState('Executive Block');
  const [plotNo, setPlotNo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !plotNo) return;

    const leadData = {
      name,
      phone,
      interest: `NOC Verification Inquiry: ${block} - Plot ${plotNo}`,
      message: `Requesting NOC and allotment validation for plot: ${plotNo} in ${block}.`
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
          interest: `NOC Status Inquiry: ${block}`,
          message: `Plot No: ${plotNo} Verification Requested`,
          submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        localStorage.setItem('faisal_leads_data', JSON.stringify([newLead, ...existingLeads]));
        window.dispatchEvent(new Event('faisal_leads_updated'));
      }

      setSubmitted(true);

      // 3. Redirect to WhatsApp
      const waText = encodeURIComponent(
        `Hello Faisal Hills Team!\n\nI want to verify the NOC and allotment status for my plot.\nName: ${name}\nPhone: ${phone}\nBlock: ${block}\nPlot Number: ${plotNo}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/923331113177?text=${waText}`, '_blank');
        setName('');
        setPhone('');
        setPlotNo('');
        setSubmitted(false);
      }, 800);

    } catch (err) {
      console.error("Failed to submit NOC inquiry:", err);
      alert("Failed to submit verification request. Please try again.");
    }
  };

  return (
    <div className="bg-[#fff8f6] min-h-screen text-slate-900 font-sans selection:bg-[#7b002c] selection:text-white pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative text-white overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20 border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/imgi_38_Faisal-Hills-site-home-page-header.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/80" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#7b002c]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white tracking-widest font-bold font-mono uppercase">
              RDA NOC Approved Society
            </span>
          </div>

          <div className="max-w-4xl space-y-3">
            <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Faisal Hills NOC Status
            </h1>
            <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-sans">
              Legally secure, RDA approved, and clear title layouts. Discover the official regulatory status, approved LOP details, and verify your plot authorization.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: NOC Details */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* NOC Executive Summary Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 bg-rose-50 text-[#7b002c] rounded-xl flex items-center justify-center">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-[#7b002c] font-bold uppercase tracking-widest block">Official Authorization</span>
                <h2 className="font-serif text-2xl font-bold text-slate-900">RDA NOC & LOP Approval</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-sans">
              <p>
                Faisal Hills is a fully approved housing society under the regulatory jurisdiction of the <strong>Rawalpindi Development Authority (RDA)</strong>. The project holds a valid No Objection Certificate (NOC) and layout plan (LOP) approvals covering its master plan.
              </p>
              <div className="bg-[#fff8f6] border-l-4 border-[#7b002c] p-5 rounded-r-xl space-y-2">
                <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider block">Official Layout Plan Number</span>
                <code className="text-sm font-mono font-bold text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded inline-block">
                  RDA/MP&TE/F-PH-L-I/240
                </code>
                <p className="text-[11px] text-slate-500 leading-normal pt-1">
                  The approved layout plan spans thousands of Kanals, ensuring that the road width, green belts, school zones, commercial reserves, and residential areas are benchmarked against official standards.
                </p>
              </div>
              <p>
                Having a clear RDA NOC status is a critical legal guarantee for plot buyers. It ensures that ownership transfers, utility connections (gas, electricity, water reservoirs), and home construction permits can be processed smoothly without regulatory delays.
              </p>
            </div>
          </div>

          {/* Block-wise NOC Status List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Sector & Block Regulatory Allotments
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-lg flex gap-3 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800">Executive Block</h4>
                  <p className="text-slate-600 mt-1">100% RDA approved LOP, possession ready commercial & residential zones.</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-lg flex gap-3 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800">Block A & B</h4>
                  <p className="text-slate-600 mt-1">Fully developed and cleared. Hundreds of houses completed and occupied.</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-lg flex gap-3 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800">Block C & D</h4>
                  <p className="text-slate-600 mt-1">Approved boundaries with active development, gas pipe networks and utilities.</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-lg flex gap-3 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800">Prime Block & Golf Block</h4>
                  <p className="text-slate-600 mt-1">Gated layouts and eco-green areas fully integrated into approved master plans.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <p className="leading-relaxed">
                <strong>Attention Buyers:</strong> Always verify that the specific plot number you are buying corresponds exactly to the approved layout map coordinates to prevent overlapping issues or land adjustments during demarcation.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Lead Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-md space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold text-[#7b002c] uppercase tracking-widest block">Plot Verification</span>
            <h3 className="font-serif text-xl font-bold text-slate-900">Verify Your Plot Status</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Enter your plot number and block name to check its legal verification status, demarcation, and development timeline.
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
              <label className="font-bold text-slate-700 block">Select Block Sector *</label>
              <select
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                className="w-full border border-slate-350 bg-slate-50 px-3.5 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7b002c] focus:bg-white text-slate-850 font-sans transition-all text-xs"
              >
                <option value="Executive Block">Executive Block</option>
                <option value="Prime Block">Prime Block</option>
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Block B Extension">Block B Extension</option>
                <option value="Block C">Block C</option>
                <option value="Block D">Block D</option>
                <option value="Golf Block / Gandahara">Golf Block / Gandahara</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">Plot Number *</label>
              <input
                type="text"
                required
                placeholder="e.g. A-125 or EXE-048"
                value={plotNo}
                onChange={(e) => setPlotNo(e.target.value)}
                className="w-full border border-slate-350 bg-slate-50 px-3.5 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7b002c] focus:bg-white text-slate-800 font-sans transition-all text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] disabled:bg-slate-400 text-white font-bold tracking-wider rounded-lg shadow-md transition-all uppercase flex items-center justify-center gap-2 cursor-pointer mt-2 active:scale-98"
            >
              <span>{submitted ? 'REDIRECTING...' : 'VERIFY MY PLOT STATUS'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>

          <div className="border-t border-slate-100 pt-5 text-center space-y-4">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">Or Chat Directly</span>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="https://wa.me/923331113177"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-[10px] font-bold tracking-wider rounded-lg flex items-center justify-center gap-1.5 uppercase transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+923331113177"
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
