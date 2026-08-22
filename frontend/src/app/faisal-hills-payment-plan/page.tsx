'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, ShieldCheck, Download, MessageSquare, PhoneCall, CheckCircle2, 
  MapPin, Clock, ArrowRight, HelpCircle, FileText, ChevronDown, CheckCircle, Info, Landmark, Layers, AlertCircle
} from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { blocksData } from '@/data/faisalHillsData';


// Quick Facts list
const quickFacts = [
  { label: "Project", val: "Faisal Hills Islamabad, Taxila" },
  { label: "Developer", val: "Zedem International (Pvt) Ltd / Faisal Town Group" },
  { label: "Chairman", val: "Chaudhry Abdul Majeed" },
  { label: "Launched", val: "2016" },
  { label: "NOC Status", val: "Approved by Rawalpindi Development Authority (RDA)" },
  { label: "Approved Area", val: "11,823 Kanals" },
  { label: "Total Plots", val: "Approximately 24,000" },
  { label: "Blocks", val: "Executive Block, Prime, Block A, B, B Ext, C, D" },
  { label: "Plot Sizes", val: "5 Marla to 2 Kanal residential, plus commercial" },
  { label: "Payment Options", val: "Full cash, or Booking down payment + quarterly installments" },
  { label: "Lump Sum Discount", val: "Up to 20% on full cash payment" }
];

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
  const [openAccordion, setOpenAccordion] = useState<string | null>('5-marla');

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

  const toggleAccordion = (slug: string) => {
    setOpenAccordion(openAccordion === slug ? null : slug);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
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
      <section className="relative bg-slate-900 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 opacity-90" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#7b002c]/20 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7b002c]/30 text-rose-300 border border-rose-500/20">
              <Landmark className="w-3.5 h-3.5" />
              <span>Developer Rates Verified</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Faisal Hills Payment Plan Verified Prices, Installments and Booking 
            </h1>
            <strong className="text-amber-400 text-sm sm:text-base font-bold uppercase tracking-wider block">
              Every plot size, every block, one clear price sheet. No guesswork.
            </strong>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
              If you are searching for the Faisal Hills Payment Plan, you have probably already noticed the problem. One website tells you the society is cash only. Another publishes a 16 quarterly installment schedule. A third lists a 1 Kanal plot at a figure that is off by a factor of ten. That confusion costs buyers real money, and it is exactly why we built this page.
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
              Here you get the current Faisal Hills payment plan laid out the way a serious buyer actually needs it: total plot price, down payment, confirmation amount, quarterly installment amount, possession charges, development charges and the lump sum discount, all in one place. We cover residential plots and commercial plots across the Executive Block, Prime Block, Block A, Block B, B Extension, Block C and Block D.
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
              Faisal Hills is an RDA approved project by Zedem International and the Faisal Town Group, developed under the leadership of Chaudhry Abdul Majeed. It sits on Main GT Road Taxila with direct Margalla Hills views, roughly ten minutes from B-17 Multi Gardens and under half an hour from the New Islamabad International Airport.
            </p>

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
              Speak to a sales consultant: <a href="tel:+923044811717" className="text-[#7b002c] font-bold hover:underline">+92 304 4811717</a>
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

      {/* Animated Block Ticker Strip */}
      <div className="bg-slate-950 border-y border-slate-800 py-3 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="ticker-track gap-0">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-0 shrink-0">
              <a href="/blocks/executive-block" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Executive Block</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-sans ml-1.5">Possession Ready</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/prime-block" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Prime Block</span>
                <span className="text-[10px] text-amber-400 font-semibold font-sans ml-1.5">Installments Open</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/block-a" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block A</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-sans ml-1.5">Families Settled</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/block-b" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block B</span>
                <span className="text-[10px] text-sky-400 font-semibold font-sans ml-1.5">Margalla Views</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/block-b1-extension" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">B Extension</span>
                <span className="text-[10px] text-violet-400 font-semibold font-sans ml-1.5">Affordable Entry</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/block-c" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block C</span>
                <span className="text-[10px] text-amber-400 font-semibold font-sans ml-1.5">800+ Commercial Plots</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/block-d" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block D</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-sans ml-1.5">Possession Granted</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
              <a href="/blocks/faisal-jewel-islamabad" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Faisal Jewel Tower</span>
                <span className="text-[10px] text-rose-400 font-semibold font-sans ml-1.5">22-Storey Skyscraper</span>
              </a>
              <span className="text-slate-700 text-lg select-none">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Bar Facts Strip */}
      <section className="bg-white border-y border-slate-200 py-8">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
            {quickFacts.slice(0, 6).map((fact, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{fact.label}</span>
                <span className="text-slate-950 font-bold text-xs block truncate" title={fact.val}>{fact.val}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 italic text-center font-sans">
            The Faisal Hills payment plan details below reflect the current sales structure. Because rates move with market demand and block availability, we re-verify every figure before publishing.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-[900px] mx-auto px-6 py-12 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 border-b border-slate-100 pb-2">
          About Faisal Hills Islamabad and Why the Payment Structure Matters
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed font-sans">
          Faisal Hills launched in 2016 as one of the most ambitious private housing projects in the Rawalpindi and Islamabad corridor. Ten years on, it is not a paper society. Families live in the Executive Block. Children attend school in Block A. The Echo petrol station in Block C is operational. The Grand Central Mosque, the 171 Kanal sports complex, the Faisal Hills Arc monument and the Miyawaki Forest are all part of a master plan that has largely been delivered rather than promised.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed font-sans">
          That maturity changes how you should read the Faisal Hills payment plan. In a brand new society, an installment plan is a bet on future development. In Faisal Hills, a large share of the infrastructure already exists, which means you are buying into value that is visible today. Underground electricity, an underground water supply system, proper sewerage and drainage, a 225-foot main boulevard and 120-foot internal roads are already in the ground across the developed blocks.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed font-sans">
          The developer's track record supports this. Chaudhry Abdul Majeed has close to three decades in the market, with Faisal Town Phase 1 and Phase 2, Faisal Residencia, Faisal Margalla City, Faisal Villas, Faisal Tower and Faisal Jewel behind him. Delivery history is the single most useful predictor of whether an installment schedule will be honoured, and this one is strong.
        </p>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-6 space-y-4">
          <strong className="text-slate-900 font-serif text-base block border-b border-slate-200 pb-1">Who This Page Is For</strong>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-slate-600 leading-relaxed">
            <div>
              <strong>End Users:</strong> Home builders who want to see total pricing and hidden charges before breaking ground.
            </div>
            <div>
              <strong>Salaried Buyers:</strong> Individuals requiring realistic quarterly schedules equivalent to their cash flows.
            </div>
            <div>
              <strong>Investors:</strong> Portfolio managers analyzing lump-sum cash discounts versus holding fees.
            </div>
            <div>
              <strong>Overseas Clients:</strong> Expatriates requiring step-by-step distant booking instructions.
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

      {/* Plot size breakdown expandable list */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Faisal Hills Payment Plan by Plot Size
        </h2>

        <div className="space-y-4 max-w-4xl">
          {/* 5 Marla Accordion */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('5-marla')}
              className="w-full p-5 text-left font-serif font-bold text-base text-slate-950 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span>5 Marla Plot Payment Plan</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openAccordion === '5-marla' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === '5-marla' && (
              <div className="p-5 border-t border-slate-100 text-xs text-slate-600 space-y-3 font-sans leading-relaxed">
                <p>
                  The 5 Marla payment plan is the most requested option in the society, and for good reason. At a total plot price of PKR 5,990,000, you book with a down payment of PKR 1,198,000, add a confirmation amount of PKR 599,000, then carry ten quarterly installments of PKR 359,400. That works out to a monthly installment equivalent of roughly PKR 119,800, which sits inside the budget of a dual-income household in the twin cities.
                </p>
                <p className="font-bold text-[#7b002c]">
                  Best suited to: first-time buyers, young families, and investors who want the fastest resale liquidity. 5 Marla plots move quicker on resale than any other size in Faisal Hills.
                </p>
              </div>
            )}
          </div>

          {/* 8 Marla Accordion */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('8-marla')}
              className="w-full p-5 text-left font-serif font-bold text-base text-slate-950 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span>8 Marla Plot Payment Plan</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openAccordion === '8-marla' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === '8-marla' && (
              <div className="p-5 border-t border-slate-100 text-xs text-slate-600 space-y-3 font-sans leading-relaxed">
                <p>
                  The 8 Marla payment plan covers a 30 x 60 plot at a total price of PKR 8,470,000. The booking amount is PKR 1,694,000, followed by a confirmation amount of PKR 847,000 and ten quarterly installments of PKR 508,200. Monthly equivalent: approximately PKR 169,400.
                </p>
                <p className="font-bold text-[#7b002c]">
                  This is the sweet spot for buyers who find 5 Marla too tight for a growing family but do not want the construction cost of a 10 Marla home. It is underrated and often has better availability.
                </p>
              </div>
            )}
          </div>

          {/* 10 Marla Accordion */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('10-marla')}
              className="w-full p-5 text-left font-serif font-bold text-base text-slate-950 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span>10 Marla Plot Payment Plan</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openAccordion === '10-marla' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === '10-marla' && (
              <div className="p-5 border-t border-slate-100 text-xs text-slate-600 space-y-3 font-sans leading-relaxed">
                <p>
                  The 10 Marla payment plan applies to a 35 x 70 plot at PKR 11,170,000 total. Down payment is PKR 2,234,000, confirmation is PKR 1,117,000, and the quarterly installment is PKR 670,200, or roughly PKR 223,400 per month.
                </p>
                <p className="font-bold text-[#7b002c]">
                  Ten Marla is the classic twin-cities family plot. It carries the strongest end-user demand of any size in Faisal Hills, which supports resale value even in a slow market.
                </p>
              </div>
            )}
          </div>

          {/* 14 Marla Accordion */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('14-marla')}
              className="w-full p-5 text-left font-serif font-bold text-base text-slate-950 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span>14 Marla Plot Payment Plan</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openAccordion === '14-marla' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === '14-marla' && (
              <div className="p-5 border-t border-slate-100 text-xs text-slate-600 space-y-3 font-sans leading-relaxed">
                <p>
                  The 14 Marla payment plan sits at a total plot price of PKR 14,550,000 for a 40 x 80 plot. Expect a down payment of PKR 2,910,000, a confirmation amount of PKR 1,455,000, and ten quarterly installments of PKR 873,000.
                </p>
                <p className="font-bold text-[#7b002c]">
                  This size is relatively scarce, which is precisely the argument for it. Scarcity supports price. It gives you close to Kanal-level living space without Kanal-level capital.
                </p>
              </div>
            )}
          </div>

          {/* 1 Kanal Accordion */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('1-kanal')}
              className="w-full p-5 text-left font-serif font-bold text-base text-slate-950 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span>1 Kanal Plot Payment Plan</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openAccordion === '1-kanal' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === '1-kanal' && (
              <div className="p-5 border-t border-slate-100 text-xs text-slate-600 space-y-3 font-sans leading-relaxed">
                <p>
                  The 1 Kanal payment plan covers a 50 x 90 plot at PKR 19,290,000. Booking requires PKR 3,858,000, confirmation PKR 1,929,000, and ten quarterly installments of PKR 1,157,400, with a monthly installment equivalent near PKR 385,800.
                </p>
                <p className="font-bold text-[#7b002c]">
                  One Kanal is where Faisal Hills competes directly with established Islamabad sectors at a fraction of the price. The Margalla Hills views from the elevated sectors of Block B are the differentiator here.
                </p>
              </div>
            )}
          </div>

          {/* 2 Kanal Accordion */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('2-kanal')}
              className="w-full p-5 text-left font-serif font-bold text-base text-slate-950 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span>2 Kanal Plot Payment Plan</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openAccordion === '2-kanal' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === '2-kanal' && (
              <div className="p-5 border-t border-slate-100 text-xs text-slate-600 space-y-3 font-sans leading-relaxed">
                <p>
                  The 2 Kanal payment plan is the premium tier at PKR 37,360,000 for a 75 x 120 plot. Down payment lands at PKR 7,472,000, confirmation at PKR 3,736,000, and quarterly installments at PKR 2,241,600.
                </p>
                <p className="font-bold text-[#7b002c]">
                  Availability is limited and concentrated in Block A and Block C. If you are considering this tier, call before you plan, because inventory changes weekly.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Block wise details */}
      <section id="block-wise" className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Faisal Hills Payment Plan Details Block by Block
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
            <h3 className="font-serif font-bold text-base text-[#7b002c]">Executive Block</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              The Executive Block is the most developed and most expensive part of the society. It fronts directly onto GT Road, possession is fully granted, families are living there and businesses are trading. This is also where the majority of Faisal Hills commercial plots sit, benefiting from GT Road visibility.
            </p>
            <span className="text-[10px] text-amber-600 font-bold block pt-1 border-t border-slate-50">Mostly Resale (Cash Route)</span>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
            <h3 className="font-serif font-bold text-base text-[#7b002c]">Prime Block</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              The Prime Block is the newest residential addition, positioned at the main society entrance near Taxila Chowk with a 225-foot boulevard and underground electricity. It borders Block A and B Extension.
            </p>
            <span className="text-[10px] text-emerald-600 font-bold block pt-1 border-t border-slate-50">Installments Available on Bookings</span>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
            <h3 className="font-serif font-bold text-base text-[#7b002c]">Block A</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Block A is the largest residential block by plot count, with more than 8,000 plots, a 225-foot main boulevard and 120-foot internal roads. Schools, mosques, hospitals and the sports complex are in place, and families are settled. The Business Etihad Center and the Civic Center sit here.
            </p>
            <span className="text-[10px] text-slate-500 font-bold block pt-1 border-t border-slate-50">Possession Granted (Cash Resale)</span>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
            <h3 className="font-serif font-bold text-base text-[#7b002c]">Block B</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Block B is the largest block by land area and carries the best direct Margalla Hills views in Faisal Hills. It sits between Block A and Block C in a quieter, greener setting, and it prices below Block A for a comparable standard of living.
            </p>
            <span className="text-[10px] text-slate-500 font-bold block pt-1 border-t border-slate-50">Calm Setting & Scenic Views</span>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
            <h3 className="font-serif font-bold text-base text-[#7b002c]">B Extension</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              B Extension was created to absorb overflow demand from Block B and remains one of the most affordable entry points into the society. It has its own mosque, park and green spaces, and shares boundaries with Block B, Block A, Block D and the Prime Block.
            </p>
            <span className="text-[10px] text-emerald-600 font-bold block pt-1 border-t border-slate-50">Lowest Down Payment Options</span>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
            <h3 className="font-serif font-bold text-base text-[#7b002c]">Block C</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Block C is one of the two largest blocks, with more than 8,300 residential plots and over 800 commercial plots. The main boulevard and internal roads are complete, the Echo petrol station is operational, and the Miyawaki Forest conservation project sits within this block.
            </p>
            <span className="text-[10px] text-emerald-600 font-bold block pt-1 border-t border-slate-50">M-1 & CPEC Connectivity potential</span>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-2">
            <h3 className="font-serif font-bold text-base text-[#7b002c]">Block D</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Block D is the newest block with possession delivered, offering more than 2,400 plots. The 100-foot main roads and 40-foot streets are complete, underground electricity, water and sewerage are functional, and owners are actively building homes.
            </p>
            <span className="text-[10px] text-slate-500 font-bold block pt-1 border-t border-slate-50">Possession Ready / Mixed Routes</span>
          </div>
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
