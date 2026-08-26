'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2, ShieldCheck, Download, MessageSquare, PhoneCall, CheckCircle2,
  MapPin, Clock, ArrowRight, HelpCircle, FileText, ChevronDown, ChevronUp, CheckCircle, Info, Landmark, Layers, AlertCircle,
  Users, TrendingUp, Globe
} from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { blocksData } from '@/data/faisalHillsData';


// Price table
const residentialPlans = [
  { size: "5 Marla", dims: "25 x 50", total: 5990000, down: 1198000, conf: 599000, qtr: 359400, poss: 599000, cash: 4792000 },
  { size: "8 Marla", dims: "30 x 60", total: 8470000, down: 1694000, conf: 847000, qtr: 508200, poss: 847000, cash: 6776000 },
  { size: "10 Marla", dims: "35 x 70", total: 11170000, down: 2234000, conf: 111700, qtr: 670200, poss: 111700, cash: 8936000 },
  { size: "14 Marla", dims: "40 x 80", total: 14550000, down: 2910000, conf: 1455000, qtr: 873000, poss: 1455000, cash: 11640000 },
  { size: "1 Kanal", dims: "50 x 90", total: 19290000, down: 3858000, conf: 1929000, qtr: 1157400, poss: 1929000, cash: 15432000 },
  { size: "2 Kanal", dims: "75 x 120", total: 37360000, down: 7472000, conf: 3736000, qtr: 2241600, poss: 3736000, cash: 29888000 }
];

// Block comparison
const blockComparison = [
  { block: "Executive Block", m5: "70L to 90L", m8: "1.05Cr to 1.20Cr", m10: "1.25Cr to 1.50Cr", m14: "1.45Cr to 1.85Cr", kanal: "2.00Cr to 2.90Cr", kanal2: "On request", stage: "Possession granted, 90% developed", route: "Mostly cash" },
  { block: "Prime Block", m5: "45L to 70L", m8: "65L to 1.05Cr", m10: "1.00Cr to 1.50Cr", m14: "1.25Cr to 1.95Cr", kanal: "1.75Cr to 2.50Cr", kanal2: "On request", stage: "Possession expected soon", route: "Installments available" },
  { block: "Block A", m5: "55L to 70L", m8: "75L to 1.25Cr", m10: "95L to 1.40Cr", m14: "1.20Cr to 1.70Cr", kanal: "1.45Cr to 2.25Cr", kanal2: "2.70Cr to 3.50Cr", stage: "Possession in most sectors", route: "Mostly cash" },
  { block: "Block B", m5: "40L to 65L", m8: "50L to 95L", m10: "75L to 1.15Cr", m14: "95L to 1.50Cr", kanal: "1.15Cr to 1.75Cr", kanal2: "On request", stage: "Possession in many sectors", route: "Mostly cash" },
  { block: "B Extension", m5: "45L to 65L", m8: "70L to 1.05Cr", m10: "75L to 1.45Cr", m14: "Limited", kanal: "Limited", kanal2: "Not offered", stage: "Developed areas possessed", route: "Mixed" },
  { block: "Block C", m5: "35L to 60L", m8: "50L to 85L", m10: "1.10Cr to 1.45Cr", m14: "On request", kanal: "1.20Cr to 1.75Cr", kanal2: "On request", stage: "Completed sectors possessed", route: "Mixed" },
  { block: "Block D", m5: "40L to 55L", m8: "55L to 85L", m10: "70L to 1.15Cr", m14: "90L to 1.45Cr", kanal: "1.40Cr to 2.10Cr", kanal2: "On request", stage: "Possession fully granted", route: "Mixed" }
];

// Qtr equivalents
const monthlyEquivalents = [
  { size: "5 Marla", qtr: 359400, mo: 119800 },
  { size: "8 Marla", qtr: 508200, mo: 169400 },
  { size: "10 Marla", qtr: 670200, mo: 223400 },
  { size: "14 Marla", qtr: 873000, mo: 291000 },
  { size: "1 Kanal", qtr: 1157400, mo: 385800 },
  { size: "2 Kanal", qtr: 2241600, mo: 747200 }
];

// Timeline worked example (10 Marla)
const timelineEvents = [
  { month: "0", event: "Booking / Down payment", amt: "2,234,000", cumul: "2,234,000", pct: "20%" },
  { month: "2", event: "Confirmation amount", amt: "1,117,000", cumul: "3,351,000", pct: "30%" },
  { month: "3", event: "Quarterly installment 1", amt: "670,200", cumul: "4,021,200", pct: "36%" },
  { month: "6", event: "Quarterly installment 2", amt: "670,200", cumul: "4,691,400", pct: "42%" },
  { month: "9", event: "Quarterly installment 3", amt: "670,200", cumul: "5,361,600", pct: "48%" },
  { month: "12", event: "Quarterly installment 4", amt: "670,200", cumul: "6,031,800", pct: "54%" },
  { month: "15", event: "Quarterly installment 5", amt: "670,200", cumul: "6,702,000", pct: "60%" },
  { month: "18", event: "Quarterly installment 6", amt: "670,200", cumul: "7,372,200", pct: "66%" },
  { month: "21", event: "Quarterly installment 7", amt: "670,200", cumul: "8,042,400", pct: "72%" },
  { month: "24", event: "Quarterly installment 8", amt: "670,200", cumul: "8,712,600", pct: "78%" },
  { month: "27", event: "Quarterly installment 9", amt: "670,200", cumul: "9,382,800", pct: "84%" },
  { month: "30", event: "Quarterly installment 10", amt: "670,200", cumul: "10,053,000", pct: "90%" },
  { month: "30+", event: "Possession payment", amt: "1,117,000", cumul: "11,170,000", pct: "100%" }
];

const faqs = [
  {
    q: "Does Faisal Hills offer plots on installments or is it cash only?",
    a: "Both, depending on inventory. Developer-held plots, mainly in the Prime Block and newer sectors, are offered on a Faisal Hills installment plan with a down payment and quarterly installments. Resale plots in the mature blocks trade at the cash price because they are owned by individuals, not the developer."
  },
  {
    q: "What is the down payment for a plot in Faisal Hills?",
    a: "The Faisal Hills down payment is approximately 20% of the total plot price at booking, with a further confirmation amount of approximately 10% due within 30 to 60 days. On a 5 Marla plot at PKR 5,990,000, that is PKR 1,198,000 at booking and PKR 599,000 shortly after."
  },
  {
    q: "How many installments are there and how often are they due?",
    a: "The standard structure is 10 equal quarterly installments spread across roughly 30 months. Select blocks or commercial plans might offer longer schedules."
  },
  {
    q: "What discount is available on full cash payment?",
    a: "A lump sum discount of up to 20% applies to full cash payment. On a 1 Kanal plot that reduces the price from PKR 19,290,000 to approximately PKR 15,432,000, a saving of PKR 3,858,000."
  },
  {
    q: "Are development charges included in the quoted price?",
    a: "It varies by block. In the Prime Block, development charges are generally included in the total price. In other blocks they may be billed separately. Always verify this before booking."
  },
  {
    q: "What is the possession payment and when is it due?",
    a: "Faisal Hills possession payment is approximately 10% of the total plot price and falls due at handover or balloting. It covers final handover formalities, demarcation and utility connection readiness."
  },
  {
    q: "Which block gives the best value under the current payment plan?",
    a: "For lowest entry price, Block C and B Extension. For new infrastructure with possession already granted, Block D. For established family living, Block A. For immediate commercial returns, the Executive Block. For installment availability on developer inventory, the Prime Block."
  },
  {
    q: "Can overseas Pakistanis book a plot in Faisal Hills?",
    a: "Yes. Overseas buyers can book using a NICOP in place of a CNIC and can authorise a representative through a power of attorney. Payments should be routed through formal banking channels for a clean audit trail."
  },
  {
    q: "Is the Faisal Hills NOC approved?",
    a: "Yes. The NOC is approved by the Rawalpindi Development Authority (RDA) over 11,823 Kanals."
  },
  {
    q: "What plot sizes are available?",
    a: "Residential plot sizes are 5 Marla (25x50), 8 Marla (30x60), 10 Marla (35x70), 14 Marla (40x80), 1 Kanal (50x90) and 2 Kanal (75x120). Commercial plots are commonly 2 Marla and 4 Marla, mainly in the Executive Block and Block C."
  },
  {
    q: "What happens if I miss a quarterly installment?",
    a: "A late surcharge typically applies, and prolonged default can lead to cancellation with deductions. Contact the office before the due date rather than after to discuss rescheduling options."
  },
  {
    q: "Can I sell my plot before completing the installment schedule?",
    a: "Yes, subject to society transfer rules, a transfer fee, and usually a minimum number of installments paid."
  },
  {
    q: "How do I confirm the latest prices?",
    a: "Request a written quotation dated for your specific block, size and plot number. Prices change based on developer schedules and availability."
  }
];

export default function FaisalHillsPaymentPlanPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSize, setSelectedSize] = useState('5 Marla');
  const [preferredBlock, setPreferredBlock] = useState('Executive Block');
  const [submitted, setSubmitted] = useState(false);
  const [isHeroSeeMoreOpen, setIsHeroSeeMoreOpen] = useState(false);
  const [isAboutSeeMoreOpen, setIsAboutSeeMoreOpen] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const existingLeads = JSON.parse(localStorage.getItem('faisal_leads_data') || '[]');
      const newLead = {
        id: `lead-${Date.now()}`,
        name: name || 'Interested Buyer',
        phone: phone || 'N/A',
        interest: `${preferredBlock} (${selectedSize})`,
        message: 'Lead submitted from payment plan page.',
        submittedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      localStorage.setItem('faisal_leads_data', JSON.stringify([newLead, ...existingLeads]));
      window.dispatchEvent(new Event('faisal_leads_updated'));
    }
    setSubmitted(true);

    const waText = encodeURIComponent(
      `Hello Faisal Hills Sales Team!\n\nI am interested in Booking under the Payment Plan:\nName: ${name}\nPhone: ${phone}\nPlot Size: ${selectedSize}\nPreferred Block: ${preferredBlock}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/923044811717?text=${waText}`, '_blank');
    }, 600);
  };


  return (
    <div className="min-h-screen bg-slate-50">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://faisalhillsislamabadfh.com/" },
                  { "@type": "ListItem", "position": 2, "name": "Faisal Hills", "item": "https://faisalhillsislamabadfh.com/faisal-hills-blocks" },
                  { "@type": "ListItem", "position": 3, "name": "Payment Plan", "item": "https://faisalhillsislamabadfh.com/faisal-hills-payment-plan" }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20 border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/imgi_38_Faisal-Hills-site-home-page-header.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/80" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#7b002c]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 lg:px-12">

          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7b002c]/30 text-rose-300 border border-rose-500/20">
              <Landmark className="w-3.5 h-3.5" />
              <span>Developer Rates Verified</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Faisal Hills Payment Plan
            </h1>
            <strong className="text-amber-400 text-sm sm:text-base font-bold uppercase tracking-wider block">
              Every plot size, every block, one clear price sheet. No guesswork.
            </strong>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
              If you are searching for the Faisal Hills Payment Plan, you have probably already noticed the problem. One website tells you the society is cash only. Another publishes a 16 quarterly installment schedule. A third lists a 1 Kanal plot at a figure that is off by a factor of ten. That confusion costs buyers real money, and it is exactly why we built this page.
            </p>

            {isHeroSeeMoreOpen && (
              <div className="space-y-3 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans animate-in fade-in duration-300">
                <p>
                  Here you get the current Faisal Hills payment plan laid out the way a serious buyer actually needs it: total plot price, down payment, confirmation amount, quarterly installment amount, possession charges, development charges and the lump sum discount, all in one place. We cover residential plots and commercial plots across the Executive Block, Prime Block, Block A, Block B, B Extension, Block C and Block D.
                </p>
                <p>
                  Faisal Hills is an RDA approved project by Zedem International and the Faisal Town Group, developed under the leadership of Chaudhry Abdul Majeed. It sits on Main GT Road Taxila with direct Margalla Hills views, roughly ten minutes from B-17 Multi Gardens and under half an hour from the New Islamabad International Airport.
                </p>
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={() => setIsHeroSeeMoreOpen(!isHeroSeeMoreOpen)}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer py-1"
              >
                <span>{isHeroSeeMoreOpen ? 'See Less' : 'See More'}</span>
                {isHeroSeeMoreOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="https://wa.me/923044811717"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#7b002c] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Get Latest Plan on WhatsApp</span>
              </a>

              <a
                href="#block-wise"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
              >
                <span>View Block-Wise Prices</span>
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-400 font-medium">
              Speak to a sales consultant: <a href="tel:+923044811717" className="text-amber-400 font-bold hover:underline">+92 304 4811717</a>
            </div>
          </div>

          {/* Hero Right Inquiry Form */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 text-[#7b002c] rounded-full flex items-center justify-center mx-auto border border-slate-200">
                  <CheckCircle2 className="w-10 h-10 text-[#7b002c]" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#7b002c]">Request Received</h4>
                <p className="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed font-sans">
                  Thank you, <strong>{name}</strong>. We are now redirecting you to WhatsApp for direct representative coordination.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs font-semibold"
                >
                  Request Another Copy
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-serif font-bold text-lg text-slate-900">Request Payment Schedule</h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    Updated monthly with developer's official sales desk figures.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zahid Mahmood"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 0000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Plot Size Interest</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] font-sans"
                    >
                      <option value="5 Marla">5 Marla</option>
                      <option value="8 Marla">8 Marla</option>
                      <option value="10 Marla">10 Marla</option>
                      <option value="14 Marla">14 Marla</option>
                      <option value="1 Kanal">1 Kanal</option>
                      <option value="2 Kanal">2 Kanal</option>
                      <option value="Commercial">Commercial Plots</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Preferred Block</label>
                    <select
                      value={preferredBlock}
                      onChange={(e) => setPreferredBlock(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#7b002c] font-sans"
                    >
                      {blocksData.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Booking Request</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>



      {/* About Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">
                Development Reality & Delivery
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                About Faisal Hills Islamabad and Why the Payment Structure Matters
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Faisal Hills launched in 2016 as one of the most ambitious private housing projects in the Rawalpindi and Islamabad corridor. Ten years on, it is not a paper society. Families live in the Executive Block. Children attend school in Block A. The Echo petrol station in Block C is operational. The Grand Central Mosque, the 171 Kanal sports complex, the Faisal Hills Arc monument and the Miyawaki Forest are all part of a master plan that has largely been delivered rather than promised.
            </p>

            {/* Collapsible Details */}
            {isAboutSeeMoreOpen && (
              <div className="space-y-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans animate-in fade-in duration-300">
                <p>
                  That maturity changes how you should read the Faisal Hills payment plan. In a brand new society, an installment plan is a bet on future development. In Faisal Hills, a large share of the infrastructure already exists, which means you are buying into value that is visible today. Underground electricity, an underground water supply system, proper sewerage and drainage, a 225-foot main boulevard and 120-foot internal roads are already in the ground across the developed blocks.
                </p>
                <p>
                  The developer's track record supports this. Chaudhry Abdul Majeed has close to three decades in the market, with Faisal Town Phase 1 and Phase 2, Faisal Residencia, Faisal Margalla City, Faisal Villas, Faisal Tower and Faisal Jewel behind him. Delivery history is the single most useful predictor of whether an installment schedule will be honoured, and this one is strong.
                </p>
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={() => setIsAboutSeeMoreOpen(!isAboutSeeMoreOpen)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] transition-colors cursor-pointer py-1"
              >
                <span>{isAboutSeeMoreOpen ? 'See Less' : 'See More'}</span>
                {isAboutSeeMoreOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Who This Page Is For */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <strong className="text-slate-900 font-serif text-sm block border-b border-slate-200 pb-1">
                Who This Page Is For
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-[#7b002c] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">End Users:</strong> Home builders who want to see total pricing and hidden charges before breaking ground.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Salaried Buyers:</strong> Individuals requiring realistic quarterly schedules equivalent to their cash flows.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Investors:</strong> Portfolio managers analyzing lump-sum cash discounts versus holding fees.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Overseas Clients:</strong> Expatriates requiring step-by-step distant booking instructions.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Image Banner */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950 group">
              <div className="relative h-80 sm:h-96 w-full">
                <img
                  src="/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
                  alt="Faisal Hills Master Development and Infrastructure Overview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block font-mono">
                  Delivered Master Community
                </span>
                <h3 className="font-serif font-bold text-base text-white">
                  11,823 Kanals RDA-Approved Development
                </h3>
                <p className="text-slate-300 text-xs font-sans">
                  Underground utilities, 225ft boulevard, and active construction on ground.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white border-y border-slate-200 space-y-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 text-center">
            How the Faisal Hills Payment Plan Actually Works
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed text-center font-sans">
            Let us clear up the biggest source of confusion first, because it costs buyers money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3">
            <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider block">Route 1</span>
            <h3 className="font-serif font-bold text-base text-slate-900">Full Cash Payment (Resale and Possession Inventory)</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              In the older, developed blocks where possession has already been granted, most available plots are resale plots. These are owned by third parties, not by the developer, and third-party sellers almost always want full cash payment. This is why the Executive Block, Block A and much of Block D behave like a cash market. There is no installment schedule on a resale plot because there is no developer contract to structure one against.
            </p>
          </div>
          <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3">
            <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider block">Route 2</span>
            <h3 className="font-serif font-bold text-base text-slate-900">Booking on Installments (Developer Inventory in Newer Blocks)</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Where the developer still holds unsold inventory, typically in the Prime Block, Block D and newer sectors, plots are released on a structured Faisal Hills installment plan. This is where the down payment, confirmation amount and quarterly installment schedule apply.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-6 lg:p-10 border border-slate-800 shadow-lg space-y-4 max-w-4xl mx-auto mt-8">
          <h3 className="font-serif text-lg font-bold">The Standard Faisal Hills Installment Structure</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            When developer inventory is available, the booking plan typically includes:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans text-center">
            <div className="p-3 bg-slate-800/50 rounded-xl"><strong>20%</strong><span className="text-slate-400 block text-[10px]">Down Payment</span></div>
            <div className="p-3 bg-slate-800/50 rounded-xl"><strong>10%</strong><span className="text-slate-400 block text-[10px]">Confirmation (30 days)</span></div>
            <div className="p-3 bg-slate-800/50 rounded-xl"><strong>60%</strong><span className="text-slate-400 block text-[10px]">10x Qtr Installments</span></div>
            <div className="p-3 bg-slate-800/50 rounded-xl"><strong>10%</strong><span className="text-slate-400 block text-[10px]">Possession Dues</span></div>
          </div>
          <p className="text-xs text-slate-400 italic font-sans pt-2 text-center">
            * Pay off early? Skipping the installment schedule and paying the cash price upfront rewards you with a lump sum discount of up to 20%.
          </p>
        </div>
      </section>

      {/* Main Payment Plan Table */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <span className="label-caps text-[#7b002c] font-bold block">Installment Matrix</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Payment Plan for Plots: Complete Residential Schedule
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            Below is the full Faisal Hills payment plan for plots in the residential category. Figures are in Pakistani Rupees and reflect developer inventory pricing. The lump sum column shows the discounted cash price after the 20% concession:
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
              <tr>
                <th className="p-4">Plot Size</th>
                <th className="p-4">Dimensions</th>
                <th className="p-4">Total Plot Price (PKR)</th>
                <th className="p-4">Down Payment (20%)</th>
                <th className="p-4">Confirmation (10%)</th>
                <th className="p-4">Qtr Installment (x10)</th>
                <th className="p-4">Possession (10%)</th>
                <th className="p-4">Lump Sum Cash Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {residentialPlans.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#7b002c]">{row.size}</td>
                  <td className="p-4 font-mono">{row.dims}</td>
                  <td className="p-4 font-bold">{row.total.toLocaleString()}</td>
                  <td className="p-4 text-amber-600 font-semibold">{row.down.toLocaleString()}</td>
                  <td className="p-4 text-slate-600">{row.conf.toLocaleString()}</td>
                  <td className="p-4 text-slate-600 font-medium">{row.qtr.toLocaleString()}</td>
                  <td className="p-4 text-slate-600">{row.poss.toLocaleString()}</td>
                  <td className="p-4 text-emerald-600 font-bold">{row.cash.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-500 italic text-center leading-relaxed max-w-4xl mx-auto">
          Note on plot sizes: Faisal Hills uses generous cuttings. The 5 Marla plot is measured at 5.55 Marla (138.89 square yards), the 10 Marla at 10.89 Marla (272 square yards) and the 14 Marla at 14.22 Marla (356 square yards). These are larger than the equivalent categories in most twin-city societies.
          <br />
          * Payment plan prices last verified on August 2026. Confirm the current Faisal Hills payment plan prices with our sales office before making any payment.
        </p>
      </section>

      {/* Plot size breakdown expandable list in image form */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">
            Plot Category Breakdown
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Payment Plan by Plot Size
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            Explore verified installment breakdowns, booking down payments, dimensions, and buyer suitability for every residential plot cutting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              size: "5 Marla Plot Payment Plan",
              dims: "25 × 50 (138.89 Sq. Yds)",
              totalPrice: "PKR 5,990,000",
              downPayment: "PKR 1,198,000 (20%)",
              confirmation: "PKR 599,000 (10%)",
              quarterly: "PKR 359,400",
              monthlyEquiv: "PKR 119,800",
              cashPrice: "PKR 4,792,000",
              savings: "Save PKR 1,198,000",
              image: "/images/imgi_44_Executive-Block.webp",
              badge: "Most Requested Size",
              badgeColor: "bg-emerald-600",
              desc: "The 5 Marla payment plan is the most requested option in the society, and for good reason. At a total plot price of PKR 5,990,000, you book with a down payment of PKR 1,198,000, add a confirmation amount of PKR 599,000, then carry ten quarterly installments of PKR 359,400. That works out to a monthly installment equivalent of roughly PKR 119,800, which sits inside the budget of a dual-income household in the twin cities.",
              bestSuited: "Best suited to: first-time buyers, young families, and investors who want the fastest resale liquidity. 5 Marla plots move quicker on resale than any other size in Faisal Hills."
            },
            {
              size: "8 Marla Plot Payment Plan",
              dims: "30 × 60 (200 Sq. Yds)",
              totalPrice: "PKR 8,470,000",
              downPayment: "PKR 1,694,000 (20%)",
              confirmation: "PKR 847,000 (10%)",
              quarterly: "PKR 508,200",
              monthlyEquiv: "PKR 169,400",
              cashPrice: "PKR 6,776,000",
              savings: "Save PKR 1,694,000",
              image: "/images/faisalarc (2).webp",
              badge: "Sweet Spot Family Plot",
              badgeColor: "bg-amber-600",
              desc: "The 8 Marla payment plan covers a 30 x 60 plot at a total price of PKR 8,470,000. The booking amount is PKR 1,694,000, followed by a confirmation amount of PKR 847,000 and ten quarterly installments of PKR 508,200. Monthly equivalent: approximately PKR 169,400.",
              bestSuited: "Best suited to: buyers who find 5 Marla too tight for a growing family but do not want the construction cost of a 10 Marla home. It is underrated and often has better availability."
            },
            {
              size: "10 Marla Plot Payment Plan",
              dims: "35 × 70 (272 Sq. Yds)",
              totalPrice: "PKR 11,170,000",
              downPayment: "PKR 2,234,000 (20%)",
              confirmation: "PKR 1,117,000 (10%)",
              quarterly: "PKR 670,200",
              monthlyEquiv: "PKR 223,400",
              cashPrice: "PKR 8,936,000",
              savings: "Save PKR 2,234,000",
              image: "/images/faisalarc (3).jpg",
              badge: "Classic Twin-Cities Standard",
              badgeColor: "bg-[#7b002c]",
              desc: "The 10 Marla payment plan applies to a 35 x 70 plot at PKR 11,170,000 total. Down payment is PKR 2,234,000, confirmation is PKR 1,117,000, and the quarterly installment is PKR 670,200, or roughly PKR 223,400 per month.",
              bestSuited: "Best suited to: classic twin-cities family living. It carries the strongest end-user demand of any size in Faisal Hills, which supports resale value even in a slow market."
            },
            {
              size: "14 Marla Plot Payment Plan",
              dims: "40 × 80 (356 Sq. Yds)",
              totalPrice: "PKR 14,550,000",
              downPayment: "PKR 2,910,000 (20%)",
              confirmation: "PKR 1,455,000 (10%)",
              quarterly: "PKR 873,000",
              monthlyEquiv: "PKR 291,000",
              cashPrice: "PKR 11,640,000",
              savings: "Save PKR 2,910,000",
              image: "/images/faisal-park.jpg",
              badge: "Scarcity & High Value",
              badgeColor: "bg-violet-600",
              desc: "The 14 Marla payment plan sits at a total plot price of PKR 14,550,000 for a 40 x 80 plot. Expect a down payment of PKR 2,910,000, a confirmation amount of PKR 1,455,000, and ten quarterly installments of PKR 873,000.",
              bestSuited: "Best suited to: premium luxury living. This size is relatively scarce, giving you close to Kanal-level living space without Kanal-level capital."
            },
            {
              size: "1 Kanal Plot Payment Plan",
              dims: "50 × 90 (500 Sq. Yds)",
              totalPrice: "PKR 19,290,000",
              downPayment: "PKR 3,858,000 (20%)",
              confirmation: "PKR 1,929,000 (10%)",
              quarterly: "PKR 1,157,400",
              monthlyEquiv: "PKR 385,800",
              cashPrice: "PKR 15,432,000",
              savings: "Save PKR 3,858,000",
              image: "/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg",
              badge: "Luxury Estate Benchmark",
              badgeColor: "bg-emerald-700",
              desc: "The 1 Kanal payment plan covers a 50 x 90 plot at PKR 19,290,000. Booking requires PKR 3,858,000, confirmation PKR 1,929,000, and ten quarterly installments of PKR 1,157,400, with a monthly installment equivalent near PKR 385,800.",
              bestSuited: "Best suited to: luxury home builders seeking direct Margalla views and elevated prestige at a fraction of Islamabad CDA sector rates."
            },
            {
              size: "2 Kanal Plot Payment Plan",
              dims: "75 × 120 (1,000 Sq. Yds)",
              totalPrice: "PKR 37,360,000",
              downPayment: "PKR 7,472,000 (20%)",
              confirmation: "PKR 3,736,000 (10%)",
              quarterly: "PKR 2,241,600",
              monthlyEquiv: "PKR 747,200",
              cashPrice: "PKR 29,888,000",
              savings: "Save PKR 7,472,000",
              image: "/images/imgi_38_Faisal-Hills-site-home-page-header.webp",
              badge: "Palatial Farmhouse Tier",
              badgeColor: "bg-amber-700",
              desc: "The 2 Kanal payment plan is the premium tier at PKR 37,360,000 for a 75 x 120 plot. Down payment lands at PKR 7,472,000, confirmation at PKR 3,736,000, and quarterly installments at PKR 2,241,600.",
              bestSuited: "Best suited to: ultra-luxury farmhouse estates and legacy property investors. Availability is limited and concentrated in Block A and Block C."
            }
          ].map((item, pidx) => (
            <div
              key={pidx}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/30 transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.size}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                  
                  {/* Top Badges */}
                  <span className={`absolute top-3 left-3 text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full shadow ${item.badgeColor}`}>
                    {item.badge}
                  </span>

                  <span className="absolute top-3 right-3 text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 font-mono">
                    {item.dims}
                  </span>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <h3 className="font-serif font-bold text-lg text-white">
                      {item.size}
                    </h3>
                    <span className="font-serif font-bold text-amber-400 text-sm">
                      {item.totalPrice}
                    </span>
                  </div>
                </div>

                {/* Key Price Metric Badges */}
                <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 border-b border-slate-100 text-center font-sans">
                  <div className="p-2 bg-white rounded-xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Down Payment</span>
                    <strong className="text-xs text-amber-700 block font-mono mt-0.5">{item.downPayment}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">10x Quarterly</span>
                    <strong className="text-xs text-slate-900 block font-mono mt-0.5">{item.quarterly}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Cash (20% Off)</span>
                    <strong className="text-xs text-emerald-700 block font-mono mt-0.5">{item.cashPrice}</strong>
                  </div>
                </div>

                {/* Detailed SEO Explanation */}
                <div className="p-5 space-y-3 font-sans">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-xs text-[#7b002c] font-medium leading-relaxed">
                    {item.bestSuited}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-5 pt-0 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 font-mono">
                  {item.savings}
                </span>
                <a
                  href={`https://wa.me/923044811717?text=Hello%2C%20I%20would%20like%20the%20official%20schedule%20for%20${encodeURIComponent(item.size)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all inline-flex items-center gap-1.5"
                >
                  <span>Request Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Block wise details */}
      <section id="block-wise" className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">
            Block-By-Block Financial Overview
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Payment Plan Details Block by Block
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            Compare development milestones, possession status, and installment options across every sector in Faisal Hills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {[
            {
              name: "Executive Block",
              slug: "executive-block",
              image: "/images/imgi_44_Executive-Block.webp",
              desc: "The Executive Block is the most developed and prestigious sector, fronting directly onto GT Road with 100% on-ground possession, operational commercial plazas, and ready villas.",
              status: "Mostly Resale (Cash Route)",
              badge: "Possession Ready",
              badgeColor: "bg-emerald-600"
            },
            {
              name: "Prime Block",
              slug: "prime-block",
              image: "/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg",
              desc: "The Prime Block is the flagship residential sector positioned at the main entrance near Taxila Chowk with a 225-foot boulevard, underground electricity, and active installment bookings.",
              status: "Installments Available on Bookings",
              badge: "4-Year Plan Open",
              badgeColor: "bg-amber-600"
            },
            {
              name: "Block A",
              slug: "block-a",
              image: "/images/imgi_46_Mosques.webp",
              desc: "Block A is the largest populated block with over 8,000 plots, Grand Jamia Mosque, Roots International School, Business Etihad Center, and fully completed carpeted roads.",
              status: "Possession Granted (Cash Resale)",
              badge: "Families Settled",
              badgeColor: "bg-emerald-600"
            },
            {
              name: "Block B",
              slug: "block-b",
              image: "/images/faisal-park.jpg",
              desc: "Block B offers direct panoramic Margalla Hills views in a tranquil, eco-friendly setting between Block A and Block C, priced competitively with substantial capital appreciation.",
              status: "Calm Setting & Scenic Views",
              badge: "Margalla Views",
              badgeColor: "bg-sky-600"
            },
            {
              name: "B Extension",
              slug: "block-b1-extension",
              image: "/images/faisalarc (1).webp",
              desc: "B Extension is one of the most accessible entry points into Faisal Hills, featuring its own community park, mosque, and seamless connectivity with Block B and Prime Block.",
              status: "Lowest Down Payment Options",
              badge: "Budget Friendly",
              badgeColor: "bg-violet-600"
            },
            {
              name: "Block C",
              slug: "block-c",
              image: "/images/faisal-forest.jpg",
              desc: "Block C is a powerhouse sector with over 8,300 residential plots and 800+ commercial plots, operational Echo petrol station, Miyawaki Forest, and upcoming direct CPEC access.",
              status: "M-1 & CPEC Connectivity potential",
              badge: "800+ Commercials",
              badgeColor: "bg-emerald-600"
            },
            {
              name: "Block D",
              slug: "block-d",
              image: "/images/imgi_48_sports-arena.webp",
              desc: "Block D is the latest delivered possession sector featuring over 2,400 plots, 100ft central avenues, 40ft streets, underground utilities, and active family home construction.",
              status: "Possession Ready / Mixed Routes",
              badge: "Possession Delivered",
              badgeColor: "bg-emerald-600"
            }
          ].map((item, bidx) => (
            <div
              key={bidx}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/30 transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  <span className={`absolute top-3 left-3 text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full shadow ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#7b002c] transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-50 flex items-center justify-between mt-2">
                <span className="text-[10px] text-amber-700 font-bold font-mono">
                  {item.status}
                </span>
                <Link
                  href={`/blocks/${item.slug}`}
                  className="text-xs font-bold text-[#7b002c] hover:text-[#9e1245] transition-colors inline-flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Block comparison table */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <span className="label-caps text-[#7b002c] font-bold block">Cross Block Analysis</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Plot Prices and Payment Plan: Full Block Comparison
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            Use this table to shortlist a block before you shortlist a plot. Ranges reflect variation by street width, corner position, boulevard facing and park facing within each block:
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
              <tr>
                <th className="p-4">Block</th>
                <th className="p-4">5 Marla</th>
                <th className="p-4">8 Marla</th>
                <th className="p-4">10 Marla</th>
                <th className="p-4">14 Marla</th>
                <th className="p-4">1 Kanal</th>
                <th className="p-4">2 Kanal</th>
                <th className="p-4">Development Stage</th>
                <th className="p-4">Payment Route</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {blockComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#7b002c]">{row.block}</td>
                  <td className="p-4 font-semibold">{row.m5}</td>
                  <td className="p-4">{row.m8}</td>
                  <td className="p-4">{row.m10}</td>
                  <td className="p-4">{row.m14}</td>
                  <td className="p-4 font-semibold text-[#7b002c]">{row.kanal}</td>
                  <td className="p-4 text-slate-500">{row.kanal2}</td>
                  <td className="p-4 font-sans text-slate-600 text-[11px]">{row.stage}</td>
                  <td className="p-4 font-bold text-slate-600">{row.route}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-500 italic text-center leading-relaxed max-w-4xl mx-auto">
          Reading key: L = Lakh (100,000). Cr = Crore (10,000,000).
          <br />
          * Two patterns stand out. First, the spread between the cheapest and most expensive block is roughly double for the same plot size, which means block selection affects your cost more than negotiation ever will. Second, the blocks where an installment route is available are the blocks priced lowest, so the Faisal Hills payment plan effectively rewards buyers willing to accept a slightly earlier development stage.
        </p>
      </section>

      {/* SVG Bar Chart Comparison */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white rounded-3xl border border-slate-200 space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-3 max-w-4xl mx-auto">
          <span className="label-caps text-[#7b002c] font-bold block">Visual Analytics</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Cash Payment Plan Versus Installment Plan: What You Actually Save
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            The 20% lump sum discount is the most valuable and least understood feature of the Faisal Hills payment plan. Check what it is worth in rupees:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">

          {/* Chart Table */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-900 text-white font-serif">
                <tr>
                  <th className="p-3">Plot Size</th>
                  <th className="p-3">Installment Total (PKR)</th>
                  <th className="p-3">Cash Price (Discounted)</th>
                  <th className="p-3 text-emerald-500">You Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-slate-700">
                {residentialPlans.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-sans font-bold text-[#7b002c]">{row.size}</td>
                    <td className="p-3">{row.total.toLocaleString()}</td>
                    <td className="p-3">{row.cash.toLocaleString()}</td>
                    <td className="p-3 text-emerald-600 font-bold">{(row.total - row.cash).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SVG Chart Render */}
          <div className="space-y-4">
            <strong className="text-slate-900 font-serif text-sm block">Savings from Lump Sum Option (PKR Millions)</strong>
            <div className="space-y-3 font-sans text-xs">
              <div>
                <div className="flex justify-between mb-1"><span>5 Marla (Save 1.19M)</span><span className="font-bold">20% Saved</span></div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '20%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span>8 Marla (Save 1.69M)</span><span className="font-bold">20% Saved</span></div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '28%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span>10 Marla (Save 2.23M)</span><span className="font-bold">20% Saved</span></div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '38%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span>14 Marla (Save 2.91M)</span><span className="font-bold">20% Saved</span></div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '48%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span>1 Kanal (Save 3.85M)</span><span className="font-bold">20% Saved</span></div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '65%' }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span>2 Kanal (Save 7.47M)</span><span className="font-bold">20% Saved</span></div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '100%' }} /></div>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-[900px] mx-auto space-y-4 pt-6 text-xs text-slate-600 font-sans leading-relaxed">
          <h3 className="font-serif font-bold text-base text-slate-900">Which Route Should You Choose?</h3>
          <p>
            <strong>Choose the cash payment plan</strong> if you have the funds sitting idle, in a low-yield savings account, or in an asset returning less than roughly 8% annually. Saving PKR 3,858,000 on a 1 Kanal plot in a single stroke is a guaranteed, tax-free return that very few instruments can match.
          </p>
          <p>
            <strong>Choose the installment plan</strong> if your capital is productive elsewhere, if you are salaried and building equity gradually, or if you want exposure to more than one plot rather than tying everything into one. Spreading a 5 Marla purchase across ten quarterly installments frees up capital that a business owner can deploy at better than 20% yield over two and a half years.
          </p>
          <p className="bg-amber-50 p-4 border border-amber-200 rounded-xl text-amber-900 font-semibold flex gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>Middle path many buyers miss: book on installments, then convert to lump sum later if liquidity improves. Partial early settlement is often accommodated with a pro-rated discount. Ask our support office before you assume it is not available.</span>
          </p>
        </div>
      </section>

      {/* Down payment booking details */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Faisal Hills Down Payment and Booking Amount Explained
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
              What the Booking Amount Includes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              The booking amount reserves your plot category and secures your position in the plot allocation queue. It does not, on its own, assign you a plot number. That happens at allocation or balloting.
            </p>
            <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2">
              <div>• <strong>Down payment</strong> — approximately 20% of total plot price, payable at booking.</div>
              <div>• <strong>Confirmation amount</strong> — approximately 10%, payable within 30 to 60 days.</div>
              <div>• <strong>Combined upfront</strong> — approximately 30% committed within the first two months.</div>
            </div>
            <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
              For a 10 Marla plot, that means roughly PKR 3,351,000 committed upfront. Budget for the confirmation amount at the same time as the down payment.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-2">
              Payment Method Rules You Must Follow
            </h3>
            <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2">
              <div>• Always pay by <strong>Pay Order</strong> or <strong>Demand Draft</strong> made out in favour of <strong>Faisal Town</strong>, Islamabad.</div>
              <div>• Never hand over cash at any sales office, to any agent, or to any individual.</div>
              <div>• Always collect a stamped, numbered receipt on official letterhead for every payment.</div>
              <div>• Verify the account details independently against the developer's official records before transferring.</div>
              <div>• Keep photocopies of every instrument and every receipt in a single file.</div>
            </div>
            <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50 text-[#7b002c] font-semibold">
              * Payment fraud in the twin-city market almost always begins with an untraceable cash handover. A Pay Order costs a few hundred rupees and makes fraud practically impossible.
            </p>
          </div>
        </div>
      </section>

      {/* 30 Month timeline schedule table */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-8 bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <span className="label-caps text-[#7b002c] font-bold block">Detailed Timeline</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Payment Schedule: The Complete 30-Month Timeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            A payment schedule is easier to plan against when you can see it laid out. Here is the full installment schedule using a 10 Marla plot as the worked example:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Timeline Table */}
          <div className="lg:col-span-8 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Payment Event</th>
                  <th className="p-3">Amount (PKR)</th>
                  <th className="p-3">Cumulative Paid (PKR)</th>
                  <th className="p-3">% of Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-mono">
                {timelineEvents.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-100/50 transition-colors">
                    <td className="p-3 font-bold text-slate-900 font-sans">{row.month}</td>
                    <td className="p-3 font-sans text-slate-600">{row.event}</td>
                    <td className="p-3 font-bold">{row.amt}</td>
                    <td className="p-3 text-slate-600">{row.cumul}</td>
                    <td className="p-3 font-sans font-semibold text-[#7b002c]">{row.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Monthly Equivalents */}
          <div className="lg:col-span-4 space-y-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg">
            <strong className="text-amber-400 font-serif text-sm block border-b border-slate-800 pb-2">Converting Quarterly to Monthly</strong>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
              Faisal Hills structures the schedule around a quarterly installment. Many buyers find it easier to plan a monthly budget equivalent internally:
            </p>
            <div className="space-y-2 text-xs font-sans text-slate-300">
              {monthlyEquivalents.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="font-semibold text-slate-400">{item.size}</span>
                  <span className="font-mono text-white">PKR {item.mo.toLocaleString()} / mo</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 italic font-sans pt-2 border-t border-slate-800">
              * Late payment typically attracts a surcharge. Before you miss a payment, contact the office. Rescheduling is often possible when requested in advance.
            </p>
          </div>
        </div>
      </section>

      {/* Additional charges */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <span className="label-caps text-[#7b002c] font-bold block">Transparency</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Development Charges, Registration Fee and Other Costs
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            The total plot price is not your total cost. Budget for these additional variables:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 text-xs">
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
            <strong className="text-[#7b002c] block font-serif">Development Charges</strong>
            <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
              Covers road layouts, water conduits, street lighting, and underground utility networks. Inclusive in the Prime Block; billed separately in others. Always ask if they are inclusive before booking.
            </p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
            <strong className="text-[#7b002c] block font-serif">Registration & Transfer Fee</strong>
            <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
              Charged at formal registration of allotment. If buying a resale plot, a transfer fee is set by the society and paid during documentation.
            </p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
            <strong className="text-[#7b002c] block font-serif">Possession Charges</strong>
            <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
              Falls due when plot is handed over. Covers final demarcation and connection readiness for utilities. Represents roughly 10% of total plot price.
            </p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
            <strong className="text-[#7b002c] block font-serif">GST & Government Taxes</strong>
            <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
              Charged as per current federal budgets. Includes transfer tax and CVTs. Filer and non-filer status materially changes what you pay.
            </p>
          </div>
        </div>
        <p className="bg-slate-900 text-white p-4 rounded-xl text-xs font-sans max-w-4xl mx-auto flex gap-2">
          <AlertCircle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
          <span><strong>Total Cost Rule of Thumb:</strong> Take the quoted total plot price and add 10% to 15% for the extra charges listed above. If your budget still works at that number, you are buying comfortably.</span>
        </p>
      </section>

      {/* Commercial Plots Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white border-y border-slate-200 space-y-6">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <span className="label-caps text-[#7b002c] font-bold block">Commercial Sector</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Commercial Plots and Their Installment Plan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            Commercial plots in Faisal Hills concentrate in the Executive Block along GT Road, with a substantial additional allocation of more than 800 commercial plots in Block C.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4 text-xs font-sans text-slate-600">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <strong className="text-slate-900 font-serif block">Pricing & Frontage Factors</strong>
            <p className="leading-relaxed text-[11px]">
              Commercial plots are priced on visibility, frontage and projected footfall. A 4 Marla plot on the main boulevard can carry a multiple of the price of an identical plot on internal commercial streets.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <strong className="text-slate-900 font-serif block">Hill Walk Commercials</strong>
            <p className="leading-relaxed text-[11px]">
              The 8-acre commercial district inspired by İstiklal Caddesi in Istanbul and Nizami Street in Baku carries its own separate payment structures for retail shops and corporate offices.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <strong className="text-slate-900 font-serif block">Faisal Jewel Tower</strong>
            <p className="leading-relaxed text-[11px]">
              The 22-storey luxury mixed-use skyscraper operates on its own dedicated installment schedule for retail spaces, corporate units, and residential apartments.
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 italic">
          If you are evaluating commercial inventory, <Link href="/faisal-hills-commercial" className="text-[#7b002c] font-bold hover:underline">request a written quotation specific to the plot number</Link>.
        </p>
      </section>

      {/* Visual Booking Stepper */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="label-caps text-[#7b002c] font-bold block">Workflow</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Faisal Hills Booking Payment Plan: How to Book Your Plot Step by Step
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/5 text-[#7b002c] flex items-center justify-center font-bold text-sm">01</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 1</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Shortlist Block</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Choose between possession cash plots or installment inventory.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/5 text-[#7b002c] flex items-center justify-center font-bold text-sm">02</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 2</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Availability Request</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Ask for written quotes on block sizes, including development charges.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/5 text-[#7b002c] flex items-center justify-center font-bold text-sm">03</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 3</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Visit Site</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Walk the streets, check the road widths, and see active homes.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/5 text-[#7b002c] flex items-center justify-center font-bold text-sm">04</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 4</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Fill Form</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Verify sizes, dimensions, and total prices on the application sheet.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/5 text-[#7b002c] flex items-center justify-center font-bold text-sm">05</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 5</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Documents</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Submit applicant and next-of-kin CNICs, NICOP, and photographs.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/5 text-[#7b002c] flex items-center justify-center font-bold text-sm">06</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 6</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Booking Payment</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Submit Pay Order or draft to Faisal Town. Collect official stamped receipts.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/5 text-[#7b002c] flex items-center justify-center font-bold text-sm">07</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 7</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Allotment</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Receive booking confirmation and allotment letters carrying plot numbers.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/5 text-[#7b002c] flex items-center justify-center font-bold text-sm">08</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 8</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Maintain Plan</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Keep up with quarterly payments and request updated statements annualy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Investment Outlook */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-slate-900 text-white rounded-3xl my-8 space-y-10">

        {/* Why Choose Us */}
        <div className="space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Why Choose Us</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Why Buyers Use Us for the Faisal Hills Payment Plan
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 font-sans leading-relaxed">
            <div className="space-y-1">
              <strong className="text-white block text-sm font-serif">Verified Price Listings</strong>
              <p>Every figure on this page is checked against the authorised sales office. If a number is provisional, we say so upfront.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block text-sm font-serif">Cash vs Installment Advice</strong>
              <p>We explain the differences clearly, identifying whether the plot is developer-held or resale inventory.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block text-sm font-serif">Hidden Charges Disclosed</strong>
              <p>Development charges, registration fees, possession fees, and government CVTs are detailed on our schedule sheets.</p>
            </div>
          </div>
        </div>

        {/* Investment Case */}
        <div className="space-y-6 border-t border-slate-800 pt-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Outlook</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Is the Faisal Hills Payment Plan a Good Investment?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-300 font-sans leading-relaxed">
            <div className="space-y-2">
              <strong className="text-white block text-sm font-serif">Key Drivers:</strong>
              <div>• <strong>Legal NOC</strong> approved by the RDA over 11,823 Kanals.</div>
              <div>• <strong>Delivered Infrastructure</strong> with families already settled, sports complex operational, and mosques functioning.</div>
              <div>• <strong>Connectivity Trajectory</strong> along Main GT Road N-5, link road to M-1, and future CPEC access lanes.</div>
            </div>
            <div className="space-y-2">
              <strong className="text-white block text-sm font-serif">Risk Factors to Weigh:</strong>
              <div>• Real estate is illiquid; hold for a minimum of 3 to 5 years.</div>
              <div>• Possession timelines in newer blocks are subject to development speed.</div>
              <div>• Taxes, stamp duties, and filer status change with federal budget iterations.</div>
            </div>
          </div>
        </div>

      </section>

      {/* Testimonials */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs font-sans text-slate-600 italic">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
            <p>"Booked a 10 Marla plot in Block D on the installment schedule. The team explained the confirmation amount upfront, which nobody else had mentioned. That single detail saved me from a cash flow problem in month two."</p>
            <strong className="text-slate-800 font-bold block not-italic">— Muhammad Adnan, Rawalpindi</strong>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
            <p>"As an overseas buyer I could not visit the site. They sent dated video walkthroughs of the actual street and handled the paperwork from booking to allotment letter."</p>
            <strong className="text-slate-800 font-bold block not-italic">— Tariq Khan, United Kingdom</strong>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
            <p>"I compared four dealers on the same 1 Kanal plot. This was the only one that told me development charges were billed separately in that block."</p>
            <strong className="text-slate-800 font-bold block not-italic">— Asif Mehmood, Islamabad</strong>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <div className="space-y-1">
          <span className="label-caps text-[#7b002c] font-bold block">Knowledge Base</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <FaqAccordion faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} blockName="Faisal Hills Payment Plan" />
        <p className="text-[10px] text-slate-500 italic text-center">
          Read more details in our <Link href="/faisal-hills-location" className="text-[#7b002c] font-bold hover:underline">location and accessibility guide</Link> page.
        </p>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-16">
        <div className="rounded-3xl bg-[#4c050d] text-white p-8 lg:p-12 border border-[#7b002c] shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">Availability desk</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white">
              Get the Latest Faisal Hills Payment Plan Sent to You Today
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
              Tell us three things: your budget, your preferred plot size, and whether you want the cash price or the installment route. We will come back with real current availability, a written quotation, and a clear breakdown of every charge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <a
              href="https://wa.me/923044811717"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white text-[#7b002c] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#7b002c]" />
              <span>WHATSAPP TODAY'S PLAN</span>
            </a>

            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>REQUEST WRITTEN QUOTE</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
