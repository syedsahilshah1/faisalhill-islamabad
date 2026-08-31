'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2, Phone, MessageSquare, MapPin, Mail, Clock,
  ShieldCheck, CheckCircle2, ArrowRight, Star, ChevronDown, ChevronUp,
  FileText, Compass, Award, Calculator, TrendingUp, Landmark,
  Globe2, Check, HelpCircle, PhoneCall, ExternalLink, Calendar,
  ArrowUpRight, AlertCircle, Sparkles, ChevronRight, Home, Store
} from 'lucide-react';
import { blocksData, submitLead, fetchSettingByKey, formatWhatsAppUrl, defaultSocialLinks, SocialLinksData } from '@/data/faisalHillsData';
import LeadModal from '@/components/ui/LeadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ContactClient() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isHeroSeeMoreOpen, setIsHeroSeeMoreOpen] = useState(false);
  const [isAboutSeeMoreOpen, setIsAboutSeeMoreOpen] = useState(false);
  const [socials, setSocials] = useState<SocialLinksData>(defaultSocialLinks);

  React.useEffect(() => {
    fetchSettingByKey<SocialLinksData>('social_links').then((data) => {
      if (data) setSocials(data);
    }).catch(console.error);
  }, []);

  // Interactive Mobile/Desktop Tab States
  const [selectedBlockTab, setSelectedBlockTab] = useState<string>('executive');
  const [selectedPlotCategoryTab, setSelectedPlotCategoryTab] = useState<'residential' | 'commercial'>('residential');

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
      const waMessage = `Hi Faisal Hills Sales Desk!\n\nI submitted a Contact Inquiry:\nName: ${fullName}\nPhone/WhatsApp: ${phone}\nCountry: ${country}\nBlock: ${preferredBlock}\nPlot Size: ${plotSize}\nBudget: ${budgetRange}\nPurpose: ${purpose}\n${message ? `Query: ${message}` : ''}`;
      setTimeout(() => {
        window.open(formatWhatsAppUrl(socials.whatsapp, waMessage), '_blank');
      }, 600);
    }).catch(err => {
      console.error(err);
      setIsSubmitted(true);
    });
  };

  const blockMaturityData = [
    {
      id: 'executive',
      name: 'Executive Block',
      stage: 'Fully Complete & Developed',
      progress: 95,
      poss: 'Immediate Possession Ready',
      price: 'Premium Value',
      suit: 'End-users ready for immediate villa construction & GT Road frontage.',
      image: '/images/imgi_44_Executive-Block.webp',
      keyHighlights: ['Direct GT Road Entrance', 'Roots International School', 'Central Jamia Mosque']
    },
    {
      id: 'block-a',
      name: 'Block A',
      stage: 'Complete & Inhabited',
      progress: 90,
      poss: 'Possession Granted',
      price: 'Established Market Rate',
      suit: 'Families building luxury residences near established neighborhood parks.',
      image: '/images/faisalarc (1).webp',
      keyHighlights: ['Over 1,200+ Settled Families', 'Operating Retail Markets', 'Carpeted Wide Roads']
    },
    {
      id: 'block-b',
      name: 'Block B',
      stage: 'Largely Developed',
      progress: 70,
      poss: 'Rolling Out Sector-Wise',
      price: 'Moderate Investment',
      suit: 'Balanced growth buyers seeking peaceful Margalla views and park frontage.',
      image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
      keyHighlights: ['Margalla Mountain Backdrop', 'Underground Power Grid', '150ft Boulevard Access']
    },
    {
      id: 'block-b1',
      name: 'Block B-1 Extension',
      stage: 'Active Leveling & Roads',
      progress: 45,
      poss: 'Phased Handover',
      price: 'Lowest Entry Point',
      suit: 'Budget investors aiming for high capital appreciation on 3-year timelines.',
      image: '/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg',
      keyHighlights: ['Low Initial Capital', 'Expanding Sector Layout', '40ft to 100ft Roads']
    },
    {
      id: 'block-c',
      name: 'Block C',
      stage: 'Developing Mega Hub',
      progress: 55,
      poss: 'Partial Possession Granted',
      price: 'High-Growth Commercial & Living',
      suit: 'Investors focusing on the 800+ Commercial Civic Center & cricket stadium.',
      image: '/images/commercial/food-court.jpg',
      keyHighlights: ['Central Commercial Civic Center', 'Cricket Stadium Reserve', 'High Footfall Core']
    },
    {
      id: 'block-d',
      name: 'Block D',
      stage: 'Developed Sectors Ready',
      progress: 75,
      poss: 'Possession Ready in Parts',
      price: 'Affordable Possession Value',
      suit: 'Value-conscious families wanting quick possession at reasonable ticket prices.',
      image: '/images/imgi_38_Faisal-Hills-site-home-page-header.webp',
      keyHighlights: ['Direct Margalla View', 'Community Parks & Mosque', 'Ready Construction Zones']
    },
    {
      id: 'prime-block',
      name: 'Prime Block',
      stage: 'New 4-Year Installment Sector',
      progress: 35,
      poss: 'Booking on Installments',
      price: 'Flexible 4-Year Plan',
      suit: 'Overseas & salaried buyers wanting easy quarterly installments.',
      image: '/images/faisalarc (3).jpg',
      keyHighlights: ['16 Quarterly Installments', '20% Initial Down Payment', 'Rapidly Rising Value']
    }
  ];

  const activeBlockData = blockMaturityData.find(b => b.id === selectedBlockTab) || blockMaturityData[0];

  const residentialPlotSizes = [
    { size: '5 Marla', dim: '25 × 50 ft', buyer: 'Small families, first-time investors', price: 'PKR 45 – 75 Lacs' },
    { size: '8 Marla', dim: '30 × 60 ft', buyer: 'Mid-segment modern villa builds', price: 'PKR 70 – 1.15 Cr' },
    { size: '10 Marla', dim: '35 × 70 ft', buyer: 'Double-unit luxury family residences', price: 'PKR 95 Lacs – 1.65 Cr' },
    { size: '14 Marla', dim: '40 × 80 ft', buyer: 'Spacious executive homes with lawn', price: 'PKR 1.4 – 2.2 Cr' },
    { size: '1 Kanal', dim: '50 × 90 ft', buyer: 'Flagship palatial living & luxury estates', price: 'PKR 1.85 – 3.2 Cr' },
    { size: '2 Kanal', dim: '75 × 120 ft', buyer: 'Farmhouse style ultra-luxury residences', price: 'PKR 3.8 – 5.5 Cr' },
  ];

  const commercialPlotSizes = [
    { size: '2 Marla Commercial', dim: '20 × 25 ft', buyer: 'Boutique shops, retail pharmacies, cafes', price: 'PKR 1.2 – 1.8 Cr' },
    { size: '4 Marla Commercial', dim: '30 × 30 ft', buyer: 'G+4 commercial plaza & brand stores', price: 'PKR 2.6 – 3.8 Cr' },
    { size: '5.33 Marla Plaza', dim: '40 × 30 ft', buyer: 'Multi-brand corporate outlets & clinics', price: 'PKR 3.9 – 4.8 Cr' },
    { size: '8 Marla Boulevard', dim: '40 × 45 ft', buyer: 'High-visibility corporate headquarters & banks', price: 'PKR 6.5 – 8.5 Cr' },
    { size: '10 Marla Landmark', dim: '45 × 50 ft', buyer: 'Mega shopping arcade & diagnostic centers', price: 'PKR 8.8 – 12 Cr' },
    { size: 'Faisal Jewel Suites', dim: '27-Storey High-Rise', buyer: '5-Star hotel suites, luxury retail shops', price: 'PKR 35 Lacs – 3.5 Cr' },
  ];

  const contactFaqs = [
    {
      q: "Is Faisal Hills approved, and by which authority?",
      a: "Faisal Hills holds an official No Objection Certificate (NOC) from the Rawalpindi Development Authority (RDA) covering approximately 11,823.5 kanals across the Pindi Gondal, Dhoke Syedo, Mohra and Shahwali revenue estates. You can verify the status directly on the RDA portal or request documented copies from our office."
    },
    {
      q: "Which blocks have on-ground possession available right now?",
      a: "Executive Block and Block A are fully mature with immediate on-ground possession granted. Block D has possession available in completed sectors, and Blocks B and C have possession rolling out in finished zones."
    },
    {
      q: "Are flexible installment plans available for new buyers?",
      a: "Yes. Prime Block and selected commercial inventory (including Hills Walk and Faisal Jewel) are available on 3 to 4-year installment schedules with a 20% to 25% initial down payment."
    },
    {
      q: "How can Overseas Pakistanis purchase plots remotely?",
      a: "Our dedicated Overseas Investor Desk provides video walkthroughs, digital file booking, direct bank transfers to Zedem International, and biometric allotment letters sent securely."
    },
    {
      q: "What are the official sales office timings?",
      a: "Our sales and advisory desk operates Monday to Saturday from 10:00 AM to 6:00 PM. Our digital WhatsApp lines (+92 333 1113177) are active 24/7 for overseas time zones."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#7b002c] selection:text-white">

      <section className="relative bg-[#091522] text-white pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: "url('/images/faisalhillarc.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/75" />

        <div className="relative z-10 max-w-[1440px] mx-auto space-y-4 sm:space-y-5 text-left">
          <ScrollReveal direction="up" delay={150}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-4xl">
              Faisal Hills Islamabad Contact &amp; Support
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={250}>
            <div className="text-slate-200 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed font-sans space-y-2">
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isHeroSeeMoreOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <p className="pt-2 text-slate-300 text-xs sm:text-sm border-t border-slate-800/80 leading-relaxed">
                  Every inquiry is handled by an on-ground specialist who knows the real construction status of each sector. Whether you are interested in Executive Block possession villas, Prime Block installments, or high-yield commercial plots in Hills Walk, we provide transparent guidance without middleman fees.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsHeroSeeMoreOpen(!isHeroSeeMoreOpen)}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors pt-1 cursor-pointer"
              >
                <span>{isHeroSeeMoreOpen ? 'See Less' : 'See More About Our Advisory'}</span>
                {isHeroSeeMoreOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={350}>
            <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3.5 pt-2">
              <a
                href="tel:+923313339997"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>

              <a
                href="https://wa.me/923331113177?text=Hi%20Faisal%20Hills%20Desk,%20I%20am%20looking%20for%20verified%20plot%20rates%20and%20booking%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>

              <button
                type="button"
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-white hover:bg-slate-100 text-[#7b002c] text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#7b002c]" />
                <span>Book Site Visit</span>
              </button>

              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer border border-slate-700"
              >
                <FileText className="w-3.5 h-3.5 text-rose-300" />
                <span>Price Schedule</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <a
            href="tel:+923313339997"
            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#7b002c] transition-all flex flex-col justify-between h-36 sm:h-44 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center group-hover:bg-[#7b002c] group-hover:text-white transition-colors">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#7b002c] bg-rose-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase">
                Call
              </span>
            </div>
            <div>
              <span className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Helpline</span>
              <strong className="text-xs sm:text-base font-serif font-bold text-slate-900 group-hover:text-[#7b002c] transition-colors block truncate">
                +92 331 3339997
              </strong>
            </div>
          </a>

          <a
            href="https://wa.me/923331113177?text=Hi%20Faisal%20Hills,%20I%20need%20plot%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between h-36 sm:h-44 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase">
                Chat
              </span>
            </div>
            <div>
              <span className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">WhatsApp Desk</span>
              <strong className="text-xs sm:text-base font-serif font-bold text-slate-900 group-hover:text-emerald-600 transition-colors block truncate">
                +92 333 1113177
              </strong>
            </div>
          </a>

          <a
            href="mailto:info@faisalhillsislamabadfh.com"
            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all flex flex-col justify-between h-36 sm:h-44 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase">
                Email
              </span>
            </div>
            <div>
              <span className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Official Email</span>
              <strong className="text-xs sm:text-base font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors block truncate">
                info@faisalhillsislamabadfh.com
              </strong>
            </div>
          </a>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-500 transition-all flex flex-col justify-between h-36 sm:h-44 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase">
                Map
              </span>
            </div>
            <div>
              <span className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Site Office</span>
              <strong className="text-xs sm:text-sm font-serif font-bold text-slate-900 group-hover:text-purple-700 transition-colors block truncate leading-snug">
                Main GT Road (N-5), Taxila
              </strong>
            </div>
          </a>
        </div>
      </section>

      {/* WHY CONTACT US */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="bg-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              Why This Faisal Hills Islamabad Contact Page Exists
            </h2>
            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              <p>
                Buying land in the twin cities corridor is a major financial milestone. It requires accurate, up-to-date clarity on development status, genuine rates, and verifiable legal title before committing.
              </p>
              <p>
                Unlike generic portals, our direct advisory desk reviews your investment horizon, family housing needs, and budget before recommending a sector.
              </p>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isAboutSeeMoreOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="space-y-2 pt-2 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  <p>
                    <strong>Direct Allocation Verification:</strong> Every file and plot transaction is confirmed through the official Zedem International transfer desk with biometric records.
                  </p>
                  <p>
                    <strong>Zero Speculation Guarantee:</strong> We provide real ground-reality estimates on electricity, gas, and possession timelines for each block.
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsAboutSeeMoreOpen(!isAboutSeeMoreOpen)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] transition-colors cursor-pointer py-1"
                >
                  <span>{isAboutSeeMoreOpen ? 'See Less' : 'See More About Our Verification Policy'}</span>
                  {isAboutSeeMoreOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center items-center">
            <div className="relative w-full h-56 sm:h-72 rounded-3xl overflow-hidden shadow-md bg-slate-950 border border-slate-200 group">
              <img
                src="/images/faisalhillarc.jpg"
                alt="Faisal Hills Grand Monument Entrance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider block">Official Advisory</span>
                <strong className="text-sm sm:text-base font-serif font-bold text-white block">Main GT Road Head Office</strong>
                <p className="text-[11px] text-slate-300 font-sans">Open Mon–Sat for biometric verification &amp; property consultations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTOR DEVELOPMENT */}
      <section className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-y border-slate-800">
        <div className="max-w-[1440px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1.5 max-w-2xl">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Faisal Hills Development Status by Sector
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                Select any block below to inspect verified on-ground completion progress, possession status, and recommended buyer profiles:
              </p>
            </div>
            <a
              href="tel:+923313339997"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all self-start sm:self-auto shrink-0 shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Verify Block Status</span>
            </a>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
            {blockMaturityData.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBlockTab(b.id)}
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap shrink-0 cursor-pointer ${selectedBlockTab === b.id
                    ? 'bg-[#7b002c] text-white shadow-lg scale-102 ring-2 ring-rose-400/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
              >
                {b.name}
              </button>
            ))}
          </div>

          <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center shadow-xl">
            <div className="lg:col-span-5 relative h-52 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 group">
              <img
                src={activeBlockData.image}
                alt={activeBlockData.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#7b002c] text-white shadow-md">
                {activeBlockData.name}
              </span>

              <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block">{activeBlockData.poss}</span>
                <strong className="text-sm font-serif font-bold text-white block">{activeBlockData.stage}</strong>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    {activeBlockData.name}
                  </h3>
                  <span className="text-xs text-rose-300 font-semibold">{activeBlockData.price}</span>
                </div>
                <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-xl">
                  {activeBlockData.progress}% Complete
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-300 font-semibold">
                  <span>Development Progress</span>
                  <span>{activeBlockData.progress}% Handover Target</span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-[#7b002c] to-rose-500 rounded-full transition-all duration-700"
                    style={{ width: `${activeBlockData.progress}%` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 font-sans space-y-1">
                <span className="text-amber-300 font-bold block uppercase text-[10px]">Investor &amp; Buyer Suitability:</span>
                <p className="leading-relaxed">{activeBlockData.suit}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {activeBlockData.keyHighlights.map((hl, hIdx) => (
                  <span key={hIdx} className="text-[11px] bg-slate-900 border border-slate-700 text-slate-200 px-2.5 py-1 rounded-lg">
                    ✓ {hl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLOT CATEGORIES */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              Plot Categories and Standard Sizes
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              Choose your preferred category below to review plot dimensions, target buyer profiles, and estimated price brackets:
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setSelectedPlotCategoryTab('residential')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${selectedPlotCategoryTab === 'residential'
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
                }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Residential</span>
            </button>
            <button
              onClick={() => setSelectedPlotCategoryTab('commercial')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${selectedPlotCategoryTab === 'commercial'
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
                }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Commercial</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {(selectedPlotCategoryTab === 'residential' ? residentialPlotSizes : commercialPlotSizes).map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/30 transition-all p-3.5 sm:p-5 flex flex-col justify-between space-y-3 group h-full"
            >
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <strong className="font-serif font-bold text-xs sm:text-base text-slate-900 group-hover:text-[#7b002c] transition-colors truncate">
                    {item.size}
                  </strong>
                  <span className="text-[9px] sm:text-[10px] font-mono bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded self-start sm:self-auto">
                    {item.dim}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-sans leading-tight line-clamp-2">
                  {item.buyer}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs font-bold text-[#7b002c] truncate">
                  {item.price}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPlotSize(item.size);
                    const el = document.getElementById('inquiry-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1.5 bg-slate-50 hover:bg-[#7b002c] hover:text-white text-slate-700 text-[10px] sm:text-xs font-bold rounded-lg transition-all text-center cursor-pointer shadow-2xs"
                >
                  Select Size
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="inquiry-form" className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="bg-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Direct Contact &amp; Booking Channels
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Choose the communication channel that suits you best. Every route connects you directly with our senior consulting desk.
            </p>

            <div className="space-y-3 sm:space-y-4 pt-1">
              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Phone className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">By Phone</strong>
                  <p className="text-[11px] text-slate-600">Immediate availability checks and rate confirmations.</p>
                  <a href="tel:+923313339997" className="text-xs font-bold text-[#7b002c] hover:underline mt-1 block">+92 331 3339997</a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">On WhatsApp</strong>
                  <p className="text-[11px] text-slate-600">Preferred for digital maps, NOCs, and payment plans.</p>
                  <a href="https://wa.me/923331113177" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-600 hover:underline mt-1 block">+92 333 1113177</a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">By Email</strong>
                  <p className="text-[11px] text-slate-600">Formal written quotations and documentation requests.</p>
                  <a href="mailto:info@faisalhillsislamabadfh.com" className="text-xs font-bold text-amber-600 hover:underline mt-1 block">info@faisalhillsislamabadfh.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">Sales &amp; Site Office</strong>
                  <p className="text-[11px] text-slate-600">Main GT Road (N-5), Taxila, Rawalpindi. Open Mon-Sat 10 AM - 6 PM.</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Overseas Pakistani Desk</span>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                Specialized remote assistance, on-site video walkthroughs, and direct bank transfer guidance for buyers in Saudi Arabia, UAE, UK, and North America.
              </p>
            </div>
          </div>

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
                      placeholder="e.g. Syed Sahil Shah"
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
                      placeholder="e.g. +92 341 0472229"
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

      {/* FAQS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-3 relative lg:sticky lg:top-28">
            <span className="label-caps text-[#7b002c] font-bold block">Clarifications &amp; Answers</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7b002c] uppercase leading-tight">
              Frequently Asked Questions
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

      {/* CTA */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="rounded-3xl bg-[#7b002c] text-white p-8 sm:p-14 shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-200 block">Take The Next Step</span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              Connect With Faisal Hills Advisory Today
            </h2>
            <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
              Have questions about block availability or installment files? A quick conversation ensures your investment is legally protected.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
            <a
              href="tel:+923313339997"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-slate-100 text-[#7b002c] text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>

            <a
              href="https://wa.me/923331113177?text=Hi%2C%20I%20want%20to%20get%20in%20touch%20with%20Faisal%20Hills."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="mailto:info@faisalhillsislamabadfh.com"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Us</span>
            </a>

            <button
              type="button"
              onClick={() => setIsLeadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 bg-rose-900/60 hover:bg-rose-900 text-white text-xs font-bold uppercase tracking-wider rounded-full border border-rose-300/30 shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Site Visit</span>
            </button>
          </div>

          <p className="text-[10px] sm:text-[11px] text-rose-200">
            Faisal Hills Islamabad Advisory desk is open Monday to Saturday, 10:00 AM to 6:00 PM. WhatsApp lines are open 24/7.
          </p>
        </div>
      </section>

      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />

    </div>
  );
}
