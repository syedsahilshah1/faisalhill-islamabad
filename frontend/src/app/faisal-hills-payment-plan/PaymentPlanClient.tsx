'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  Download,
  MessageSquare,
  PhoneCall,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowRight,
  HelpCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Info,
  Landmark,
  Layers,
  AlertCircle,
  Users,
  TrendingUp,
  Globe,
  ExternalLink,
  DollarSign,
  Calendar,
  Sparkles,
  Award,
  BookOpen,
  Receipt,
  Check
} from 'lucide-react';
import {
  PaymentPlanCMSData,
  initialPaymentPlanCMS,
  fetchPaymentPlanCMS,
  formatLeadDateTime
} from '@/data/faisalHillsData';
import { useContactChannels } from '@/lib/useContactChannels';

interface PaymentPlanClientProps {
  initialCmsData?: PaymentPlanCMSData;
}

export default function PaymentPlanClient({ initialCmsData }: PaymentPlanClientProps) {
  // The sales desk number comes from the dashboard-editable contact settings.
  const { whatsappUrl } = useContactChannels();
  const [cms, setCms] = useState<PaymentPlanCMSData>(initialCmsData || initialPaymentPlanCMS);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSize, setSelectedSize] = useState('5.55 Marla (5 Marla)');
  const [preferredBlock, setPreferredBlock] = useState('Prime Block');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadCms() {
      const data = await fetchPaymentPlanCMS();
      if (data) setCms(data);
    }
    loadCms();

    const handleUpdate = () => {
      loadCms();
    };
    window.addEventListener('faisal_payment_plan_cms_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('faisal_payment_plan_cms_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const existingLeads = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
      const newLead = {
        id: `lead-${Date.now()}`,
        name: name || 'Interested Buyer',
        phone: phone || 'N/A',
        interest: `${preferredBlock} (${selectedSize})`,
        message: 'Lead submitted from Faisal Hills Payment Plan page.',
        submittedAt: formatLeadDateTime()
      };
      localStorage.setItem('faisal_leads_data', JSON.stringify([newLead, ...existingLeads]));
      window.dispatchEvent(new Event('faisal_leads_updated'));
    }
    setSubmitted(true);

    const waText = encodeURIComponent(
      `Hello Faisal Hills Sales Office!\n\nI am requesting the official payment schedule:\nName: ${name}\nPhone: ${phone}\nPlot Size: ${selectedSize}\nBlock: ${preferredBlock}`
    );

    setTimeout(() => {
      window.open(whatsappUrl(waText, undefined, true), '_blank');
    }, 600);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-[#7b002c] selection:text-white">
      {/* Full 100% Screen Height Hero Section with Side-by-Side Content & Form */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-center text-white overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16 border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/faisal-hills-site-header.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/40" />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Enlarged Heading, Description & Quick CTAs (7 Cols) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold text-amber-300">
                <Landmark className="w-4 h-4 text-amber-400" />
                <span>Verified Payment Schedules &amp; Terms</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.15] drop-shadow-lg">
                {cms.overview.h1}
              </h1>

              <p className="text-slate-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-sans drop-shadow-md">
                Plots in{' '}
                <Link href="/" className="text-amber-300 font-bold underline decoration-amber-400/80 hover:text-white transition-colors">
                  Faisal Hills
                </Link>{' '}
                (→ homepage), the RDA-approved society on the Main GT Road (N-5) near Taxila, are sold either on instalments or in full. An instalment purchase means a registration fee, a booking amount paid as a down payment, then quarterly instalments until the balance clears. Paying in full attracts a discount.
              </p>

              {/* Fast Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${cms.overview.ctaWhatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask on WhatsApp (Senior Desk)</span>
                </a>
                <a
                  href={`tel:${cms.overview.ctaCall.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Call Sales Desk</span>
                </a>
              </div>
            </div>

            {/* Right Column: Fast Quotation / Written Schedule Request Form (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/80 shadow-2xl p-6 sm:p-7 text-slate-900">
                {submitted ? (
                  <div className="py-10 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-[#7b002c] mx-auto" />
                    <h3 className="font-serif text-xl font-bold text-[#7b002c]">Inquiry Sent</h3>
                    <p className="text-xs text-slate-600">
                      Thank you, <strong>{name}</strong>. Opening WhatsApp to connect with the representative.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 bg-[#7b002c] text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5">
                    <div className="border-b border-slate-200 pb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b002c] block">Fast Quotation</span>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">Request Written Schedule</h3>
                      <p className="text-xs text-slate-500">Get the exact breakdown for your desired cutting.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Syed Sahil Shah"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 0000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-800 mb-1">Plot Size</label>
                        <select
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                        >
                          <option value="5.55 Marla">5.55 Marla</option>
                          <option value="8 Marla">8 Marla</option>
                          <option value="10.89 Marla">10.89 Marla</option>
                          <option value="14 Marla">14 Marla</option>
                          <option value="1 Kanal">1 Kanal</option>
                          <option value="2 Kanal">2 Kanal</option>
                          <option value="Commercial Cut">Commercial</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-800 mb-1">Block Choice</label>
                        <select
                          value={preferredBlock}
                          onChange={(e) => setPreferredBlock(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                        >
                          <option value="Prime Block">Prime Block</option>
                          <option value="Executive Block">Executive Block</option>
                          <option value="Block A">Block A</option>
                          <option value="Block B">Block B</option>
                          <option value="Block B Extension">Block B Ext</option>
                          <option value="Block C">Block C</option>
                          <option value="Block D">Block D</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-1"
                    >
                      <span>Request Current Schedule</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Society Payment Terms Overview - Payment Plan at a Glance */}
      <section id="glance-section" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 space-y-6 scroll-mt-24">
        <div className="space-y-3 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">
                Quick Reference Overview
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Landmark className="w-6 h-6 text-[#7b002c]" />
                <span>Faisal Hills Payment Plan at a Glance</span>
              </h2>
            </div>
            <span className="text-xs bg-[#7b002c] text-white font-semibold px-3.5 py-1.5 rounded-full shadow-xs">
              {cms.verificationHeader.badgeText}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
            Essential summary of instalment schedules, payment cycles, discount structures, and registration requirements.
          </p>
        </div>

        {/* Clean Single Header Table with Inner Grid Lines */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-300 min-w-[640px]">
              <thead className="bg-[#4c050d] text-white uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4 w-1/4 whitespace-nowrap border border-[#65071a]">Payment Feature / Item</th>
                  <th className="p-4 whitespace-nowrap border border-[#65071a]">Official Developer Terms &amp; Conditions</th>
                  <th className="p-4 w-1/3 whitespace-nowrap border border-[#65071a]">Operational Note &amp; Verification</th>
                </tr>
              </thead>
              <tbody className="font-sans text-slate-800">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#7b002c] bg-slate-50/70 whitespace-nowrap border border-slate-200">Instalment Frequency</td>
                  <td className="p-4 text-slate-900 font-semibold border border-slate-200">{cms.overview.quickFacts.frequency}</td>
                  <td className="p-4 text-slate-600 border border-slate-200">Standard recurring cycle across all residential &amp; commercial cuttings</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#7b002c] bg-slate-50/70 whitespace-nowrap border border-slate-200">Current Payment Term</td>
                  <td className="p-4 text-slate-900 font-semibold border border-slate-200">{cms.overview.quickFacts.term}</td>
                  <td className="p-4 text-slate-600 border border-slate-200">Distributed across 30 calendar months (10 quarterly tranches)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#7b002c] bg-slate-50/70 whitespace-nowrap border border-slate-200">Booking Amount (Down Payment)</td>
                  <td className="p-4 text-slate-900 font-semibold border border-slate-200">{cms.overview.quickFacts.bookingAmount}</td>
                  <td className="p-4 text-slate-600 border border-slate-200">Paid upon booking dossier submission; varies by block &amp; size</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#7b002c] bg-slate-50/70 whitespace-nowrap border border-slate-200">Lump-Sum Discount</td>
                  <td className="p-4 text-[#7b002c] font-bold border border-slate-200">{cms.overview.quickFacts.lumpSumDiscount}</td>
                  <td className="p-4 text-emerald-700 font-medium border border-slate-200">Applied instantly when paying the full plot cost at purchase</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#7b002c] bg-slate-50/70 whitespace-nowrap border border-slate-200">Registration Fee</td>
                  <td className="p-4 text-slate-900 font-semibold border border-slate-200">{cms.overview.quickFacts.registrationFee}</td>
                  <td className="p-4 text-slate-600 border border-slate-200">Mandatory one-time non-refundable file processing charges</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#7b002c] bg-slate-50/70 whitespace-nowrap border border-slate-200">Schedule Verification Date</td>
                  <td className="p-4 text-slate-900 font-semibold border border-slate-200">{cms.overview.quickFacts.scheduleDate}</td>
                  <td className="p-4 text-slate-600 border border-slate-200">Active verified schedule from developer releases</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 text-xs sm:text-sm text-slate-600 flex flex-wrap items-center justify-between gap-3">
            <span>
              Ask for written schedule:{' '}
              <a
                href={`https://wa.me/${cms.overview.ctaWhatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7b002c] font-bold underline hover:text-[#9e1245]"
              >
                WhatsApp {cms.overview.ctaWhatsapp}
              </a>
            </span>
            <span className="text-slate-400 font-medium">All figures in PKR</span>
          </div>
        </div>
      </section>

      {/* Section: How the Payment Plan Works (Table Form) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">Process &amp; Sequence</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.howItWorks.heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {cms.howItWorks.intro}
          </p>
        </div>

        {/* 5-Step Sequence HTML Table with Grid Lines */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4 w-28 text-center whitespace-nowrap border border-slate-800">Step #</th>
                  <th className="p-4 w-60 sm:w-72 whitespace-nowrap border border-slate-800">Payment Stage / Fee</th>
                  <th className="p-4 border border-slate-800">Operational Rule &amp; Timing</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {cms.howItWorks.steps.map((st) => (
                  <tr key={st.stepNumber} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-center text-[#7b002c] bg-slate-50/70 border border-slate-200 whitespace-nowrap">
                      Step {st.stepNumber}
                    </td>
                    <td className="p-4 font-bold text-slate-900 whitespace-nowrap border border-slate-200">
                      {st.title}
                    </td>
                    <td className="p-4 text-slate-600 leading-relaxed border border-slate-200">
                      {st.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paying in full highlight callout */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm text-emerald-900 font-medium flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{cms.howItWorks.payingInFullNote}</span>
        </div>

        {/* Down Payment & Post-Booking Table with Grid Lines */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead className="bg-slate-100 text-slate-800 uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4 w-1/3 whitespace-nowrap border border-slate-300">Component</th>
                  <th className="p-4 border border-slate-300">Published Scope &amp; Verification Requirement</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/60 border border-slate-200">
                    {cms.howItWorks.downPaymentCoversTitle}
                  </td>
                  <td className="p-4 text-slate-600 leading-relaxed border border-slate-200">
                    {cms.howItWorks.downPaymentCoversDesc}
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/60 border border-slate-200">
                    {cms.howItWorks.afterBookingTitle}
                  </td>
                  <td className="p-4 text-slate-600 leading-relaxed border border-slate-200">
                    {cms.howItWorks.afterBookingDesc}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Main Schedule Table: Prime Block */}
      <section id="prime-schedule" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-6 scroll-mt-24">
        <div className="space-y-3 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">
                Official Verified Schedule
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                {cms.primeBlockSchedule.heading}
              </h2>
            </div>
            <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-3 py-1 rounded-full">
              Reconciled Matrix (10 Quarterly Instalments)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
            {cms.primeBlockSchedule.intro}
          </p>
        </div>

        {/* HTML Table with Inner Table Grid Lines */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[760px]">
              <thead className="bg-[#4c050d] text-white uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4 whitespace-nowrap border border-[#65071a]">Plot size</th>
                  <th className="p-4 whitespace-nowrap border border-[#65071a]">Total price (PKR)</th>
                  <th className="p-4 whitespace-nowrap border border-[#65071a]">Booking amount (PKR)</th>
                  <th className="p-4 whitespace-nowrap border border-[#65071a]">10 quarterly instalments (PKR)</th>
                  <th className="p-4 whitespace-nowrap border border-[#65071a]">Lump sum at 20% off (PKR)</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {cms.primeBlockSchedule.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-[#7b002c] bg-slate-50/70 whitespace-nowrap border border-slate-200">{row.plotCutting}</td>
                    <td className="p-4 font-bold whitespace-nowrap border border-slate-200">{row.totalPrice}</td>
                    <td className="p-4 text-amber-700 font-semibold whitespace-nowrap border border-slate-200">{row.bookingAmount}</td>
                    <td className="p-4 text-slate-700 font-medium whitespace-nowrap border border-slate-200">{row.quarterlyInstalments}</td>
                    <td className="p-4 text-emerald-700 font-bold whitespace-nowrap border border-slate-200">{row.lumpSumDiscounted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reconciliation Note */}
        <p className="text-xs text-slate-500 italic leading-relaxed">
          {cms.primeBlockSchedule.reconciliationNote}
        </p>

        {/* Sizing & 14 Marla Clarification Table with Grid Lines */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead className="bg-slate-100 text-slate-800 uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4 w-1/3 whitespace-nowrap border border-slate-300">Dimension / Topic</th>
                  <th className="p-4 border border-slate-300">Official Specification &amp; Guidance</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/60 w-1/3 whitespace-nowrap border border-slate-200">
                    Why the sizes read 5.55 and 10.89
                  </td>
                  <td className="p-4 text-slate-600 leading-relaxed border border-slate-200">
                    Faisal Hills schedules measure a Marla at 225 sq ft, while most listings use 250. The same 25 × 50 ft plot is 5 Marla on one measure and 5.55 on the other, and a 35 × 70 ft plot is 10 or 10.89. Compare plots by dimensions and square feet; our{' '}
                    <Link href="/faisal-hills-blocks" className="text-[#7b002c] font-bold underline hover:text-[#9e1245]">
                      Faisal Hills blocks
                    </Link>{' '}
                    (→ blocks hub) explains the conventions in full.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/60 w-1/3 whitespace-nowrap border border-slate-200">
                    14 Marla availability status
                  </td>
                  <td className="p-4 text-slate-600 leading-relaxed border border-slate-200">
                    {cms.primeBlockSchedule.marla14Note}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Worked Example Card: What a 5 Marla plot actually costs */}
        <div className="bg-white rounded-2xl border border-[#7b002c]/30 overflow-hidden shadow-sm">
          <div className="bg-[#7b002c]/10 px-6 py-3 border-b border-[#7b002c]/20">
            <h3 className="font-serif font-bold text-base text-[#7b002c]">
              Worked Example: {cms.primeBlockSchedule.cost5MarlaExample.heading}
            </h3>
          </div>
          <div className="p-6 space-y-2 text-xs sm:text-sm">
            <p className="text-slate-700 leading-relaxed">
              {cms.primeBlockSchedule.cost5MarlaExample.description}
            </p>
            <p className="font-bold text-emerald-700 pt-1">
              {cms.primeBlockSchedule.cost5MarlaExample.savingsNote}
            </p>
          </div>
        </div>
      </section>

      {/* Payment Plans by Block - Image & Detail Card Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 space-y-8">
        <div className="space-y-3 border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">Sector Variations</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.paymentPlansByBlock.heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
            {cms.paymentPlansByBlock.intro}
          </p>
        </div>

        {/* Visual Cards Grid with Authentic Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cms.paymentPlansByBlock.blockRows.map((block, idx) => {
            const blockImageMap: Record<string, string> = {
              'executive-block': '/images/faisal-hills-executive-block.webp',
              'block-a': '/images/faisal-hills-aerial-panoramic.webp',
              'prime-block': '/images/faisal-hills-drone-view.webp',
              'block-b': '/images/faisal-hills-executive-boulevard.webp',
              'block-b-extension': '/images/faisal-hills-development-site.webp',
              'block-c': '/images/faisal-hills-arc-monument.webp',
              'block-d': '/images/faisal-hills-overview.webp',
            };
            const imgSrc = blockImageMap[block.blockSlug] || '/images/faisal-hills-overview.webp';
            const isInstalment = block.terms.toLowerCase().includes('instalment');

            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Authentic Block Image Header */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={imgSrc}
                      alt={`${block.blockName} Faisal Hills`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                    {/* Terms Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-md ${
                        isInstalment
                          ? 'bg-amber-400 text-slate-950 border border-amber-300 font-mono'
                          : 'bg-white/90 backdrop-blur-md text-slate-900 border border-white'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${isInstalment ? 'bg-amber-950 animate-pulse' : 'bg-emerald-600'}`} />
                        {block.terms}
                      </span>
                    </div>

                    {/* Block Name Overlay */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-serif text-xl font-bold text-white drop-shadow-md">
                        {block.blockName}
                      </h3>
                    </div>
                  </div>

                  {/* Description & Notes */}
                  <div className="p-5 space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b002c] block">
                        Payment &amp; Inventory Status
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans min-h-[48px]">
                        {block.notes || 'Contact sales desk for active cutting inventory and booking schedule.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/blocks/${block.blockSlug}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-50 hover:bg-[#7b002c] text-slate-800 hover:text-white border border-slate-200 hover:border-[#7b002c] rounded-xl text-xs font-bold transition-all duration-200 group/btn cursor-pointer shadow-2xs"
                  >
                    <span>View {block.blockName} Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          If a block is full payment only, the plan on this page does not apply to it. For market rates by block, including resale, see our{' '}
          <Link href="/plots" className="text-[#7b002c] font-bold underline hover:text-[#9e1245]">
            Faisal Hills plot prices
          </Link>{' '}
          (→ prices page): plot prices and payment plans are different things, and mixing them is how buyers end up comparing the wrong numbers.
        </p>
      </section>

      {/* Why You Will See Different Payment Plans Online */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-6">
        <div className="space-y-3 border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Market Clarity</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.whyDifferentPlansOnline.heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
            {cms.whyDifferentPlansOnline.intro}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead className="bg-slate-100 text-slate-800 uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4 w-1/4 whitespace-nowrap border border-slate-300">Structure</th>
                  <th className="p-4 border border-slate-300">Where it appears</th>
                  <th className="p-4 w-32 whitespace-nowrap border border-slate-300">Term</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {cms.whyDifferentPlansOnline.comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 whitespace-nowrap border border-slate-200">{row.structure}</td>
                    <td className="p-4 text-slate-600 border border-slate-200">{row.source}</td>
                    <td className="p-4 font-mono font-semibold text-slate-700 whitespace-nowrap border border-slate-200">{row.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl border border-slate-800 space-y-2">
          <strong className="text-amber-400 font-serif text-sm block">What to do with that:</strong>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
            {cms.whyDifferentPlansOnline.adviceText}
          </p>
        </div>
      </section>

      {/* What You Pay Besides the Plot Price (HTML Table Form) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">Fee Disclosures</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.additionalCosts.heading}
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4 w-1/3 whitespace-nowrap border border-slate-800">Cost Component</th>
                  <th className="p-4 border border-slate-800">Description &amp; Payment Timing</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {cms.additionalCosts.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 bg-slate-50/70 whitespace-nowrap border border-slate-200">
                      {item.name}
                    </td>
                    <td className="p-4 text-slate-600 leading-relaxed border border-slate-200">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Pay & Special Guidance (HTML Table Form) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-8">
        <div className="space-y-3 border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">Financial Guidelines</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {cms.howToPay.heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Payment routes matter as much as the figures, and getting them wrong is how buyers lose money.
          </p>
        </div>

        {/* 4 Core Payment Rules Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead className="bg-slate-100 text-slate-800 uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4 w-16 text-center border border-slate-300">#</th>
                  <th className="p-4 border border-slate-300">Payment Rule &amp; Verification Protocol</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {cms.howToPay.guidelines.map((rule, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-center text-[#7b002c] bg-slate-50/70 border border-slate-200">{idx + 1}</td>
                    <td className="p-4 text-slate-700 leading-relaxed font-medium border border-slate-200">{rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Overseas, Resale, Missed, Commercial (HTML Table Form) */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4 w-1/3 whitespace-nowrap border border-slate-800">Buyer Category / Situation</th>
                  <th className="p-4 border border-slate-800">Policy &amp; Official Procedure</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/70 whitespace-nowrap border border-slate-200">
                    {cms.howToPay.overseasBuyersTitle}
                  </td>
                  <td className="p-4 text-slate-600 leading-relaxed border border-slate-200">
                    Overseas Pakistanis can book using a NICOP or passport, with payment through official banking channels. Published developer schedules have included bank account details for both overseas and domestic transfers. Take the current account details from the sales office or the developer's own downloads section (→{' '}
                    <a
                      href="https://faisaltowngroup.com/downloads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7b002c] font-bold underline hover:text-[#9e1245] inline-flex items-center gap-0.5"
                    >
                      <span>faisaltowngroup.com/downloads</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    ), not from any copy circulating online.
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/70 whitespace-nowrap border border-slate-200">
                    {cms.howToPay.resalePurchasesTitle}
                  </td>
                  <td className="p-4 text-slate-600 leading-relaxed border border-slate-200">
                    If you buy from an existing owner rather than the developer, the payment plan on this page does not apply. A resale is normally settled in full at transfer, and any remaining instalments on a file are a matter between you and the seller. What governs a resale instead is the transfer process: ownership verification, the No Demand Certificate confirming no dues remain, and the transfer recorded at the society office. Our{' '}
                    <Link href="/plots" className="text-[#7b002c] font-bold underline hover:text-[#9e1245]">
                      plot verification guide
                    </Link>{' '}
                    (→ buying guide) sets out the sequence.
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/70 whitespace-nowrap border border-slate-200">
                    {cms.howToPay.missedInstalmentTitle}
                  </td>
                  <td className="p-4 text-slate-600 leading-relaxed border border-slate-200">
                    {cms.howToPay.missedInstalmentDesc}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 bg-slate-50/70 whitespace-nowrap border border-slate-200">
                    {cms.howToPay.commercialPlotTitle}
                  </td>
                  <td className="p-4 text-slate-600 leading-relaxed border border-slate-200">
                    {cms.howToPay.commercialPlotDesc}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (Premium 2-Column Split Layout) */}
      <section id="faqs" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-14 lg:py-20 border-t border-slate-200 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative">
          
          {/* Left Column: Sticky FAQ Title & Help Desk Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 self-start">
            <div className="space-y-3 border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7b002c] block">
                Buyer Help &amp; FAQs
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                {cms.faqsSection.heading}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Clear answers regarding verified schedules, 20% discount rules, registration fees, and official payment protocols.
              </p>
            </div>

            {/* Need More Help Quick Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 space-y-4 border border-slate-800 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7b002c] flex items-center justify-center shrink-0 shadow-md">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">Have a specific question?</h4>
                  <p className="text-[11px] text-slate-300">Speak directly with senior estate advisory</p>
                </div>
              </div>

              <a
                href={`https://wa.me/${cms.overview.ctaWhatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Senior Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Numbered Premium Accordion List */}
          <div className="lg:col-span-8 space-y-3.5">
            {cms.faqsSection.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              const stepNum = (idx + 1).toString().padStart(2, '0');
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[#7b002c]/50 shadow-md ring-1 ring-[#7b002c]/10'
                      : 'border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span
                        className={`flex items-center justify-center shrink-0 w-7 h-7 rounded-xl text-xs font-bold font-mono transition-colors duration-200 ${
                          isOpen ? 'bg-[#7b002c] text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        {stepNum}
                      </span>
                      <h3 className={`font-serif font-bold text-sm sm:text-base leading-snug pt-0.5 transition-colors ${
                        isOpen ? 'text-[#7b002c]' : 'text-slate-900 group-hover:text-[#7b002c]'
                      }`}>
                        {faq.q}
                      </h3>
                    </div>

                    <div
                      className={`p-1.5 rounded-full shrink-0 transition-colors duration-200 ${
                        isOpen ? 'bg-[#7b002c]/10 text-[#7b002c]' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#7b002c]' : ''}`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100 pt-3.5 pl-14 sm:pl-16 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* About this Page / Disclosure Section */}
      <footer className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 border-t border-slate-200 text-xs text-slate-600 space-y-3">
        <h3 className="font-serif font-bold text-sm text-slate-900">
          {cms.ctaAndAbout.aboutHeading}
        </h3>
        <p className="leading-relaxed">
          Reviewed by {cms.verificationHeader.reviewerName} of Faisal Hills Estate Advisory. Figures are drawn from published developer and dealer schedules and dated where possible; we do not publish a figure we cannot source. The scheme's approval can be checked with the{' '}
          <a
            href="https://rda.gop.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7b002c] font-bold underline hover:text-[#9e1245] inline-flex items-center gap-0.5"
          >
            <span>Rawalpindi Development Authority (rda.gop.pk)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          , and our{' '}
          <Link href="/faisal-hills-noc-status" className="text-[#7b002c] font-bold underline hover:text-[#9e1245]">
            RDA approval details
          </Link>{' '}
          (→ NOC page) explains what the NOC covers. Prices and terms are set by the developer and change without notice. If you find anything out of date, tell us and we will correct it.
        </p>
      </footer>
    </div>
  );
}
