'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, Phone, MessageSquare, MapPin, Mail, Clock, 
  ShieldCheck, CheckCircle2, ArrowRight, Star, ChevronDown, 
  FileText, Compass, Award, Calculator, TrendingUp, Landmark, 
  Globe2, Check, HelpCircle, PhoneCall, ExternalLink, Calendar,
  ArrowUpRight, AlertCircle, Sparkles
} from 'lucide-react';
import { blocksData, submitLead } from '@/data/faisalHillsData';
import LeadModal from '@/components/ui/LeadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ContactPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [preferredBlock, setPreferredBlock] = useState('Executive Block');
  const [plotSize, setPlotSize] = useState('5 Marla (25x50)');
  const [budgetRange, setBudgetRange] = useState('50 - 80 Lacs');
  const [purpose, setPurpose] = useState('End Use (Build Home)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead({
      name: fullName || 'Website Contact Visitor',
      phone: phone || 'N/A',
      interest: `${preferredBlock} - ${plotSize} (${purpose})`,
      message: `[Country: ${country}] [Budget: ${budgetRange}] [Email: ${email}] Message: ${message}`
    }).then(() => {
      setIsSubmitted(true);
      const waMessage = encodeURIComponent(
        `Hi Faisal Hills Sales Desk!\n\nI submitted a Contact Inquiry:\nName: ${fullName}\nPhone/WhatsApp: ${phone}\nCountry: ${country}\nBlock: ${preferredBlock}\nPlot Size: ${plotSize}\nBudget: ${budgetRange}\nPurpose: ${purpose}\n${message ? `Query: ${message}` : ''}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/923044811717?text=${waMessage}`, '_blank');
      }, 600);
    }).catch(err => {
      console.error(err);
      setIsSubmitted(true);
    });
  };

  const contactFaqs = [
    {
      q: "Q1. Is Faisal Hills approved, and by which authority?",
      a: "Faisal Hills holds a No Objection Certificate (NOC) from the Rawalpindi Development Authority (RDA) covering approximately 11,823.5 kanals across the Pindi Gondal, Dhoke Syedo, Mohra and Shahwali revenue estates. You can verify the official status on RDA's approved schemes listing, and request block-specific NOC documentation directly from our sales desk."
    },
    {
      q: "Q2. Has the block I am asking about been approved yet?",
      a: "The society-level NOC provides the legal foundation for the entire scheme. However, individual sectors and commercial facilities receive their own specific layout clearances as work advances. Ask our team for the precise approval position on your specific block and sector in writing before you commit."
    },
    {
      q: "Q3. What is the current status of the block under development?",
      a: "Newer and hillside sectors are currently under active development. Earthwork, road formation and underground utility installation are in progress. Possession has not been handed over across these specific sectors yet, which means entry prices are lower and ideal for patient medium-to-long term investors."
    },
    {
      q: "Q4. Which blocks have possession available right now?",
      a: "Executive Block and Block A are fully mature with immediate possession granted. Block D has possession available in completed sectors from early 2025. Blocks B, B Extension, and C have possession granted in developed sectors. We always verify possession on a sector-by-sector basis."
    },
    {
      q: "Q5. When will possession be handed over in the under-development block?",
      a: "Handover follows infrastructure completion and regulatory clearances. Contact our site office for the current milestone timeline and progress updates. We provide honest, ground-reality estimates rather than speculative dates."
    },
    {
      q: "Q6. Where exactly is Faisal Hills located?",
      a: "Faisal Hills is situated directly on the main Grand Trunk Road (GT Road N-5) near Taxila in District Rawalpindi, at the foothills of the Margalla range, adjacent to the B-17 and New City corridor. It connects via GT Road, the M-1 Motorway interchange, and Margalla Avenue."
    },
    {
      q: "Q7. Is Faisal Hills a good investment?",
      a: "The fundamentals are exceptional: RDA-approved land, an experienced developer (Zedem International / Chaudhry Abdul Majeed), GT Road frontage, and rapidly appreciating property values. Mature blocks offer certainty and immediate construction; developing blocks offer lower entry costs and strong capital appreciation."
    },
    {
      q: "Q8. Are instalment plans available?",
      a: "Yes. Select blocks and commercial inventory are offered on 3-year (36-month) quarterly installment schedules with an initial 20% to 25% down payment. Other resale plots transact on cash terms. Contact our booking desk for the current live schedule."
    },
    {
      q: "Q9. Can overseas Pakistanis buy plots here?",
      a: "Yes. Overseas Pakistanis (in Saudi Arabia, UAE, UK, USA, etc.) can purchase plots remotely via direct bank transfer to Zedem International. Our dedicated Overseas Desk handles video walkthroughs, digital documentation, power of attorney guidance, and allotment letter delivery."
    },
    {
      q: "Q10. What are the office timings?",
      a: "Our sales and consulting office operates Monday to Saturday from 10:00 AM to 6:00 PM. WhatsApp and email inquiries are monitored 24/7 for overseas time zones and answered promptly."
    },
    {
      q: "Q11. How do I verify I am dealing with an authorised representative?",
      a: "Visit our physical office on Main GT Road Taxila, request official credentials, and ensure all payments are made solely via pay orders or direct bank transfers in favour of Zedem International (Pvt) Ltd. Never transfer funds to personal bank accounts."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#7b002c] selection:text-white">

      {/* JSON-LD Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ContactPage",
                "name": "Faisal Hills Islamabad Contact",
                "description": "Faisal Hills Islamabad Contact page with phone, WhatsApp, email and sales office details. Get plot rates, NOC status, block-wise info and booking assistance.",
                "url": "https://faisalhills.com/contact"
              },
              {
                "@type": "LocalBusiness",
                "name": "Faisal Hills Islamabad Sales & Contact Desk",
                "image": "https://faisalhills.com/images/faisalhillarc.jpg",
                "telephone": "+923313339997",
                "email": "info@faisalhills.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Main GT Road (N-5), near Taxila",
                  "addressLocality": "Taxila / Rawalpindi",
                  "addressRegion": "Punjab",
                  "addressCountry": "PK"
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "10:00",
                  "closes": "18:00"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": contactFaqs.map(faq => ({
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

      {/* ========================================================= */}
      {/* SECTION 1: HERO SECTION                                   */}
      {/* ========================================================= */}
      <section className="relative bg-[#091522] text-white pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/images/faisalhillarc.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-5 text-center sm:text-left">
          
          <ScrollReveal direction="up" delay={50}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#7b002c] text-white border border-rose-400/30 shadow-md">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Official Sales & Booking Desk</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Faisal Hills Islamabad Contact
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250}>
            <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed font-sans">
              Looking for the correct Faisal Hills Islamabad Contact details before you invest? You have reached the right page. Our team connects you directly with authorised representatives for plot bookings, block-wise availability, verified rates and site visit scheduling. Whether you want residential plot information, commercial plot information or a straight answer on approval status, one call is enough. Every Faisal Hills Islamabad Contact request we receive is handled by a consultant who knows the ground reality of each block, not just a brochure.
            </p>
          </ScrollReveal>

          {/* Action CTAs - Responsive Inline on Mobile & Desktop */}
          <ScrollReveal direction="up" delay={350}>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 pt-2">
              <a
                href="tel:+923313339997"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>

              <a
                href="https://wa.me/923044811717?text=Hi%2C%20I%20am%20looking%20for%20Faisal%20Hills%20Islamabad%20Contact%20details%20and%20plot%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>

              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-white hover:bg-slate-100 text-[#7b002c] text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#7b002c]" />
                <span>Book a Site Visit</span>
              </button>

              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer border border-slate-700"
              >
                <FileText className="w-3.5 h-3.5 text-rose-300" />
                <span>Request Price List</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Trust Strip Icon Row */}
          <ScrollReveal direction="up" delay={450}>
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-[11px] sm:text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RDA Approved Society</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                <span>11,823.5 Kanals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Since 2016</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Faisal Town Group</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <Globe2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Overseas Desk Available</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: QUICK CONTACT STRIP (Card Grid)                */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          
          {/* Card 1: Helpline */}
          <a
            href="tel:+923313339997"
            className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#7b002c] transition-all flex flex-col justify-between h-40 sm:h-44 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center group-hover:bg-[#7b002c] group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#7b002c] bg-rose-50 px-2.5 py-1 rounded-full uppercase">
                Tap to Call
              </span>
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">Faisal Hills Helpline</span>
              <strong className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-[#7b002c] transition-colors block">
                051-4500000-2 / +92 331 3339997
              </strong>
            </div>
          </a>

          {/* Card 2: Head Office Contact */}
          <a
            href="tel:051111324725"
            className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#7b002c] transition-all flex flex-col justify-between h-40 sm:h-44 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full uppercase">
                Tap to Call
              </span>
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">Faisal Hills Head Office Contact</span>
              <strong className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-blue-700 transition-colors block">
                051-111-324-725
              </strong>
            </div>
          </a>

          {/* Card 3: WhatsApp Verified Line */}
          <a
            href="https://wa.me/923044811717?text=Hi%2C%20I%20want%20to%20chat%20with%20Faisal%20Hills%20support."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between h-40 sm:h-44 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                Chat Now
              </span>
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">Faisal Hills WhatsApp Number</span>
              <strong className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-emerald-600 transition-colors block">
                +92 304 4811717
              </strong>
            </div>
          </a>

          {/* Card 4: Official Email */}
          <a
            href="mailto:info@faisalhills.com"
            className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:border-amber-500 transition-all flex flex-col justify-between h-40 sm:h-44 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase">
                Send an inquiry
              </span>
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">Faisal Hills Email Address</span>
              <strong className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors block">
                info@faisalhills.com
              </strong>
            </div>
          </a>

          {/* Card 5: Sales Office Location */}
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:border-purple-500 transition-all flex flex-col justify-between h-40 sm:h-44 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full uppercase">
                Get directions
              </span>
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">Faisal Hills Sales Office</span>
              <strong className="text-xs sm:text-sm font-serif font-bold text-slate-900 group-hover:text-purple-700 transition-colors block leading-snug">
                Main GT Road (N-5), Taxila, Rawalpindi
              </strong>
            </div>
          </a>

          {/* Card 6: Working Hours */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between h-40 sm:h-44">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full uppercase">
                Plan your visit
              </span>
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">Working Hours</span>
              <strong className="text-xs sm:text-sm font-serif font-bold text-slate-900 block leading-snug">
                Monday to Saturday, 10:00 AM to 6:00 PM
              </strong>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: WHY THIS FAISAL HILLS CONTACT PAGE EXISTS       */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="bg-white p-6 sm:p-12 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="label-caps text-[#7b002c] font-bold block">Informed Real Estate Decisions</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Why This Faisal Hills Islamabad Contact Page Exists
            </h2>
            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                Buying land in the twin cities corridor is rarely a single decision. It is a chain of small decisions, and each one needs an accurate answer. Which block is fully developed? Which one is still under construction? Has the layout been cleared? What are today's rates rather than last year's?
              </p>
              <p>
                Most websites publish a phone number and stop there. We built this Faisal Hills Islamabad Contact page differently. Alongside the numbers, you get the project context you actually need before dialling, so your first conversation with our team starts from an informed position.
              </p>
              <p>
                When you get in touch with Faisal Hills through this page, a consultant reviews your budget, your intent (end use or resale) and your timeline. Only then do we recommend a block. That is the difference between a sales pitch and genuine real estate investment guidance.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-end space-y-4">
            <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl text-center space-y-3 w-full max-w-sm">
              <Sparkles className="w-8 h-8 text-[#7b002c] mx-auto" />
              <strong className="font-serif font-bold text-slate-900 block text-base">Direct Consultant Access</strong>
              <p className="text-xs text-slate-600 font-sans">No middleman fees, no stale rate cards, 100% verified society allocations.</p>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="w-full py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                Speak To A Consultant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: QUICK OVERVIEW & KEY HIGHLIGHTS                */}
      {/* ========================================================= */}
      <section className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-y border-slate-800">
        <div className="max-w-[1440px] mx-auto space-y-8 sm:space-y-10">
          <div className="max-w-3xl space-y-2 sm:space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-300 block">Project Facts</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Quick Overview and Key Highlights
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Faisal Hills is a large master-planned housing society developed by Zedem International under the Faisal Town Group, led by Chaudhry Abdul Majeed. It launched in 2016 and has grown steadily since.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Developer', value: 'Zedem International / Faisal Town Group', icon: Building2 },
              { label: 'Total Approved Area', value: 'Approx. 11,823.5 Kanals', icon: Compass },
              { label: 'Approving Authority', value: 'Rawalpindi Development Authority (RDA)', icon: ShieldCheck },
              { label: 'Location', value: 'Main GT Road (N-5), near Taxila', icon: MapPin },
              { label: 'Master Blocks', value: 'Executive, A, B, B Ext, C, D, Prime Block', icon: Landmark },
              { label: 'Plot Inventory', value: '32,000+ Units Planned', icon: FileText },
              { label: 'Entrance Boulevard', value: '225 Feet Wide Main Avenue', icon: TrendingUp },
              { label: 'Current Status', value: 'Partially Delivered & Active Development', icon: Award },
            ].map((fact, idx) => {
              const Icon = fact.icon;
              return (
                <div key={idx} className="bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-slate-700/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#7b002c] text-white flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-wider block">{fact.label}</span>
                  <strong className="text-xs sm:text-sm font-serif font-bold text-white block">{fact.value}</strong>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] sm:text-xs text-slate-400 italic">
            For anything beyond these headline numbers, including current inventory in a specific sector, use the Faisal Hills Islamabad Contact options on this page. Availability changes weekly.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: PLOT CATEGORIES AND SIZES (Responsive Inline)   */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-8 sm:space-y-10">
        <div className="max-w-3xl space-y-2 sm:space-y-3">
          <span className="label-caps text-[#7b002c] font-bold block">Available Plot Inventory</span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Plot Categories and Sizes in Faisal Hills
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
            Faisal Hills offers deliberately generous plot dimensions compared with several neighbouring schemes at similar price points.
          </p>
        </div>

        {/* Residential Sizes Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5 sm:p-8">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#7b002c]">
            Residential Plot Sizes
          </h3>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="p-4">Plot Size</th>
                  <th className="p-4">Approximate Dimensions</th>
                  <th className="p-4">Typical Buyer</th>
                  <th className="p-4 text-right">Inquiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {[
                  { size: '5 Marla', dim: '25 x 50', buyer: 'First-time buyers, small families' },
                  { size: '8 Marla', dim: '30 x 60', buyer: 'Mid-segment end users' },
                  { size: '10 Marla', dim: '35 x 70', buyer: 'Family homes & luxury builds' },
                  { size: '14 Marla', dim: '40 x 80', buyer: 'Upper-mid segment' },
                  { size: '1 Kanal', dim: '50 x 90', buyer: 'Premium residential estates' },
                  { size: '2 Kanal', dim: '75 x 120', buyer: 'Luxury and long-hold investors' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-[#7b002c] font-serif text-sm">{row.size}</td>
                    <td className="p-4 font-semibold text-slate-700">{row.dim}</td>
                    <td className="p-4 text-slate-600">{row.buyer}</td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setPlotSize(row.size);
                          const el = document.getElementById('inquiry-form');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer"
                      >
                        Select Size
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Clean Inline Cards */}
          <div className="block md:hidden space-y-3">
            {[
              { size: '5 Marla', dim: '25 x 50', buyer: 'First-time buyers, small families' },
              { size: '8 Marla', dim: '30 x 60', buyer: 'Mid-segment end users' },
              { size: '10 Marla', dim: '35 x 70', buyer: 'Family homes & luxury builds' },
              { size: '14 Marla', dim: '40 x 80', buyer: 'Upper-mid segment' },
              { size: '1 Kanal', dim: '50 x 90', buyer: 'Premium residential estates' },
              { size: '2 Kanal', dim: '75 x 120', buyer: 'Luxury and long-hold investors' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="font-serif font-bold text-base text-[#7b002c]">{item.size}</strong>
                    <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-600">{item.dim}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">{item.buyer}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPlotSize(item.size);
                    const el = document.getElementById('inquiry-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-lg shrink-0 cursor-pointer shadow-xs"
                >
                  Select
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Commercial Options */}
        <div className="bg-slate-100 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
            Commercial Options & Megastructures
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Commercial inventory includes shops, offices and mixed-use space within designated commercial zones, along with landmark developments such as <strong>Faisal Jewel (27-Story 5-Star Hotel Tower)</strong> and the <strong>Hill Walk Downtown</strong> pedestrian commercial district.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsLeadModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Request Information About Plots</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8 & 12: DEVELOPMENT STATUS & MATURITY GRAPH       */}
      {/* ========================================================= */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-10 sm:space-y-12">
          
          <div className="max-w-3xl space-y-2 sm:space-y-3">
            <span className="label-caps text-[#7b002c] font-bold block">Honest Ground Reality</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c]">
              Faisal Hills Islamabad Contact for Honest, Block-Wise Development Answers
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              This is the section most competitor pages skip, and it is the one that protects your money. Faisal Hills is not a single uniform site. Some blocks are finished and populated. Others are genuinely still under development.
            </p>
          </div>

          {/* Development Maturity Graph (CSS Progress Bars) */}
          <div className="bg-slate-50 p-5 sm:p-10 rounded-3xl border border-slate-200 space-y-5 sm:space-y-6">
            <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
                Development Maturity Comparison
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Site observation & verified progress</span>
            </div>

            <div className="space-y-4">
              {[
                { block: 'Executive Block', progress: 95, tag: 'Near complete, possession granted' },
                { block: 'Block A', progress: 90, tag: 'Complete, populated with families' },
                { block: 'Block D', progress: 75, tag: 'Possession ready in developed sectors' },
                { block: 'Block B', progress: 70, tag: 'Largely developed, rolling possession' },
                { block: 'Block C', progress: 55, tag: 'Developing, partial possession granted' },
                { block: 'Block B Extension', progress: 45, tag: 'Developing, budget entry point' },
                { block: 'Newer / Hillside Sectors', progress: 30, tag: 'Under active earthwork development' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-800">{item.block} <span className="font-normal text-slate-500 text-[10px] sm:text-[11px]">({item.tag})</span></span>
                    <span className="text-[#7b002c] font-mono">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7b002c] to-rose-600 rounded-full transition-all duration-1000"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] sm:text-[11px] text-slate-500 italic pt-1">
              Figures are indicative comparisons drawn from published progress reporting and site observation. Lower entry prices sit in blocks with more construction still ahead.
            </p>
          </div>

          {/* Block Comparison Table Container */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-5 sm:p-8 space-y-4">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
              Block Comparison & Investment Horizon
            </h3>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Block</th>
                    <th className="p-4">Development Stage</th>
                    <th className="p-4">Possession</th>
                    <th className="p-4">Entry Price Level</th>
                    <th className="p-4">Best Suited For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {[
                    { block: 'Executive Block', stage: 'Near complete', poss: 'Granted', price: 'Highest', suit: 'End users wanting immediate build' },
                    { block: 'Block A', stage: 'Complete, populated', poss: 'Granted', price: 'High', suit: 'Families relocating now' },
                    { block: 'Block B', stage: 'Largely developed', poss: 'Rolling out', price: 'Moderate', suit: 'Balanced risk and return' },
                    { block: 'Block B Extension', stage: 'Developing', poss: 'Partial', price: 'Lowest', suit: 'Budget entry investors' },
                    { block: 'Block C', stage: 'Developing', poss: 'Partial', price: 'Low to moderate', suit: 'Medium-term holders' },
                    { block: 'Block D', stage: 'Developed sectors ready', poss: 'Granted in parts', price: 'Moderate', suit: 'Possession-ready value buyers' },
                    { block: 'Newer / Hillside', stage: 'Under development', poss: 'Not yet', price: 'Low', suit: 'Patient long-term investors' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c] font-serif text-sm">{row.block}</td>
                      <td className="p-4 font-semibold text-slate-700">{row.stage}</td>
                      <td className="p-4 font-bold text-emerald-700">{row.poss}</td>
                      <td className="p-4 text-slate-800 font-semibold">{row.price}</td>
                      <td className="p-4 text-slate-600">{row.suit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Clean Inline Cards */}
            <div className="block md:hidden space-y-3">
              {[
                { block: 'Executive Block', stage: 'Near complete', poss: 'Granted', price: 'Highest', suit: 'End users wanting immediate build' },
                { block: 'Block A', stage: 'Complete, populated', poss: 'Granted', price: 'High', suit: 'Families relocating now' },
                { block: 'Block B', stage: 'Largely developed', poss: 'Rolling out', price: 'Moderate', suit: 'Balanced risk and return' },
                { block: 'Block B Extension', stage: 'Developing', poss: 'Partial', price: 'Lowest', suit: 'Budget entry investors' },
                { block: 'Block C', stage: 'Developing', poss: 'Partial', price: 'Low to moderate', suit: 'Medium-term holders' },
                { block: 'Block D', stage: 'Developed sectors ready', poss: 'Granted in parts', price: 'Moderate', suit: 'Possession-ready value buyers' },
                { block: 'Newer / Hillside', stage: 'Under development', poss: 'Not yet', price: 'Low', suit: 'Patient long-term investors' },
              ].map((row, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <strong className="font-serif font-bold text-sm text-[#7b002c]">{row.block}</strong>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">{row.poss}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Stage</span>
                      <span className="font-semibold text-slate-700">{row.stage}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Entry Price</span>
                      <span className="font-semibold text-slate-800">{row.price}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 border-t border-slate-200/60 pt-1.5">
                    <span className="font-semibold text-slate-600">Best for:</span> {row.suit}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9: APPROVAL AND LEGAL STATUS                      */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-8">
        <div className="max-w-3xl space-y-2 sm:space-y-3">
          <span className="label-caps text-[#7b002c] font-bold block">100% Legal & Verified</span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c]">
            Faisal Hills Islamabad Contact for Verified NOC and Approval Details
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
            Faisal Hills holds a No Objection Certificate from the Rawalpindi Development Authority (RDA) covering approximately 11,823.5 kanals spanning the revenue estates of Pindi Gondal, Dhoke Syedo, Mohra and Shahwali.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
              How Approvals Work Within an Approved Society
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              An overall society NOC provides the overarching legal mandate. As individual zones and commercial facilities are completed, the RDA issues distinct phase clearances. We walk you through specific block documents line by line.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
              Independent Verification Checklist
            </h3>
            <ul className="text-xs text-slate-600 space-y-2 font-sans">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7b002c] shrink-0" />
                <span>Check the approved schemes listing published by the RDA</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7b002c] shrink-0" />
                <span>Request a copy of the NOC directly from our office</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7b002c] shrink-0" />
                <span>Ask for a No Demand Certificate (NDC) before resale transfer</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 14: INTERACTIVE CONTACT & INQUIRY FORM            */}
      {/* ========================================================= */}
      <section id="inquiry-form" className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="bg-white p-6 sm:p-12 rounded-3xl border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Ways to reach */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <span className="label-caps text-[#7b002c] font-bold block">Direct Channels</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Complete Faisal Hills Islamabad Contact Details
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Choose the communication channel that suits you best. Every route connects you directly with our senior consulting desk.
            </p>

            <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Phone className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">By Phone</strong>
                  <p className="text-[11px] text-slate-600">Immediate availability checks and rate confirmations.</p>
                  <a href="tel:+923313339997" className="text-xs font-bold text-[#7b002c] hover:underline mt-1 block">051-4500000-2 / +92 331 3339997</a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">On WhatsApp</strong>
                  <p className="text-[11px] text-slate-600">Preferred for digital maps, NOCs, and payment plans.</p>
                  <a href="https://wa.me/923044811717" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-600 hover:underline mt-1 block">+92 304 4811717</a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">By Email</strong>
                  <p className="text-[11px] text-slate-600">Formal written quotations and documentation requests.</p>
                  <a href="mailto:info@faisalhills.com" className="text-xs font-bold text-amber-600 hover:underline mt-1 block">info@faisalhills.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">Sales & Site Office</strong>
                  <p className="text-[11px] text-slate-600">Main GT Road (N-5), Taxila, Rawalpindi. Open Mon-Sat 10 AM - 6 PM.</p>
                </div>
              </div>
            </div>

            {/* Overseas Note */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-1.5 sm:space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Overseas Pakistani Desk</span>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                Specialized remote assistance, on-site video walkthroughs, and direct bank transfer guidance for buyers in Saudi Arabia, UAE, UK, and North America.
              </p>
            </div>
          </div>

          {/* Right Column: Complete Form */}
          <div className="lg:col-span-7 bg-slate-50 p-5 sm:p-8 rounded-3xl border border-slate-200">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">Inquiry Submitted Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-sans leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your inquiry for <strong>{preferredBlock} ({plotSize})</strong> has been registered. Our senior consultant will contact you with current rates and documentation.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">Send an Inquiry About Faisal Hills</h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Receive a verified written quotation with block availability.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mahmood"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 331 3339997"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Country of Residence</label>
                    <input
                      type="text"
                      placeholder="e.g. Pakistan, Saudi Arabia, UAE"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Preferred Block</label>
                    <select
                      value={preferredBlock}
                      onChange={(e) => setPreferredBlock(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] cursor-pointer"
                    >
                      {blocksData.map(b => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                      ))}
                      <option value="Commercial Downtown / Hill Walk">Commercial Downtown / Hill Walk</option>
                      <option value="Faisal Jewel Tower">Faisal Jewel Tower</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Plot Size Required</label>
                    <select
                      value={plotSize}
                      onChange={(e) => setPlotSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] cursor-pointer"
                    >
                      <option value="5 Marla (25x50)">5 Marla (25x50)</option>
                      <option value="8 Marla (30x60)">8 Marla (30x60)</option>
                      <option value="10 Marla (35x70)">10 Marla (35x70)</option>
                      <option value="14 Marla (40x80)">14 Marla (40x80)</option>
                      <option value="1 Kanal (50x90)">1 Kanal (50x90)</option>
                      <option value="2 Kanal (75x120)">2 Kanal (75x120)</option>
                      <option value="2/4/8 Marla Commercial">Commercial Plot (2/4/8 Marla)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Budget Range</label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] cursor-pointer"
                    >
                      <option value="Under 50 Lacs">Under 50 Lacs</option>
                      <option value="50 - 80 Lacs">50 - 80 Lacs</option>
                      <option value="80 Lacs - 1.2 Crore">80 Lacs - 1.2 Crore</option>
                      <option value="1.2 Crore - 2 Crore">1.2 Crore - 2 Crore</option>
                      <option value="2 Crore+">2 Crore+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Purpose</label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] cursor-pointer"
                    >
                      <option value="End Use (Build Home)">End Use (Build Home)</option>
                      <option value="Medium-Term Investment">Medium-Term Investment</option>
                      <option value="Long-Term Holding">Long-Term Holding</option>
                      <option value="Commercial Rental Income">Commercial Rental Income</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Message / Specific Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us if you want corner, park-facing, immediate possession, or installment plans..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Send An Inquiry About Faisal Hills</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 17: FREQUENTLY ASKED QUESTIONS (No Mobile Overlap) */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Relative on mobile, Sticky on desktop to eliminate overlap */}
          <div className="lg:col-span-4 space-y-3 relative lg:sticky lg:top-28">
            <span className="label-caps text-[#7b002c] font-bold block">Clarifications & Answers</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] uppercase leading-tight">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Straight answers on approvals, possession timelines, overseas purchasing, and developer credibility.
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-slate-200 border-t border-slate-900">
            {contactFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 hover:text-[#7b002c] transition-colors pr-4 leading-snug">
                      {faq.q}
                    </h3>
                    <ChevronDown className={`w-4 h-4 text-[#7b002c] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="pt-3 pb-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pr-6 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 19: FINAL CALL TO ACTION                          */}
      {/* ========================================================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="rounded-3xl bg-[#7b002c] text-white p-8 sm:p-14 shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-200 block">Take The Next Step</span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
              Use Any Faisal Hills Islamabad Contact Option Below and Get Answers Today
            </h2>
            <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
              You do not need to have decided anything yet. A first conversation costs nothing and ensures your investment is legally protected.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
            <a
              href="tel:+923313339997"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-slate-100 text-[#7b002c] text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            <a
              href="https://wa.me/923044811717?text=Hi%2C%20I%20want%20to%20get%20in%20touch%20with%20Faisal%20Hills."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="mailto:info@faisalhills.com"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email An Inquiry</span>
            </a>

            <button
              type="button"
              onClick={() => setIsLeadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-rose-900/60 hover:bg-rose-900 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full border border-rose-300/30 shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Your Site Visit</span>
            </button>
          </div>

          <p className="text-[10px] sm:text-[11px] text-rose-200">
            Faisal Hills Islamabad Contact lines are open Monday to Saturday, 10:00 AM to 6:00 PM. Overseas clients may request a scheduled callback at a convenient hour.
          </p>
        </div>
      </section>

      {/* Booking Lead Modal */}
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />

    </div>
  );
}
