'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Building2,
  Trees,
  GraduationCap,
  Landmark,
  Phone,
  MessageSquare,
  FileText,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Award,
  Check,
  Send,
  HelpCircle,
  Car,
  Download,
  Compass,
  TrendingUp,
  Activity,
  Layers,
  ChevronRight,
  BadgeCheck,
  Navigation,
  ExternalLink,
  PhoneCall,
  Calendar,
  Building,
  Zap,
  ArrowUpRight,
  Eye,
  SlidersHorizontal,
  Home,
  ImageIcon,
  X,
  Droplets,
  DollarSign,
  Percent,
  CheckCheck
} from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import { DynamicPlotSeriesExplorer } from '@/components/plots/DynamicPlotSeriesExplorer';

interface PrimePriceRow {
  size: string;
  dimensions: string;
  sqYards: string;
  totalPrice: string;
  downPayment: string;
  quarterlyInstallment: string;
  balloting: string;
  possession: string;
  duration: string;
  status: string;
}

const primeFixedPriceSchedule: PrimePriceRow[] = [
  {
    size: '5 Marla',
    dimensions: '25 × 50',
    sqYards: '139 Sq. Yds',
    totalPrice: 'PKR 32,50,000',
    downPayment: 'PKR 6,50,000 (20%)',
    quarterlyInstallment: 'PKR 1,45,000 × 16 Qtrs',
    balloting: 'PKR 3,25,000 (10%)',
    possession: 'PKR 3,25,000 (10%)',
    duration: '48 Months (4 Years)',
    status: 'High Demand — Booking Open'
  },
  {
    size: '8 Marla',
    dimensions: '30 × 60',
    sqYards: '200 Sq. Yds',
    totalPrice: 'PKR 48,00,000',
    downPayment: 'PKR 9,60,000 (20%)',
    quarterlyInstallment: 'PKR 2,15,000 × 16 Qtrs',
    balloting: 'PKR 4,80,000 (10%)',
    possession: 'PKR 4,80,000 (10%)',
    duration: '48 Months (4 Years)',
    status: 'Fast Selling — Premium Sector'
  },
  {
    size: '10 Marla',
    dimensions: '35 × 70',
    sqYards: '272 Sq. Yds',
    totalPrice: 'PKR 58,50,000',
    downPayment: 'PKR 11,70,000 (20%)',
    quarterlyInstallment: 'PKR 2,65,000 × 16 Qtrs',
    balloting: 'PKR 5,85,000 (10%)',
    possession: 'PKR 5,85,000 (10%)',
    duration: '48 Months (4 Years)',
    status: 'Top Choice for Families'
  },
  {
    size: '14 Marla',
    dimensions: '40 × 80',
    sqYards: '355 Sq. Yds',
    totalPrice: 'PKR 76,50,000',
    downPayment: 'PKR 15,30,000 (20%)',
    quarterlyInstallment: 'PKR 3,45,000 × 16 Qtrs',
    balloting: 'PKR 7,65,000 (10%)',
    possession: 'PKR 7,65,000 (10%)',
    duration: '48 Months (4 Years)',
    status: 'Executive Villa Sector'
  },
  {
    size: '1 Kanal',
    dimensions: '50 × 90',
    sqYards: '500 Sq. Yds',
    totalPrice: 'PKR 99,00,000',
    downPayment: 'PKR 19,80,000 (20%)',
    quarterlyInstallment: 'PKR 4,50,000 × 16 Qtrs',
    balloting: 'PKR 9,90,000 (10%)',
    possession: 'PKR 9,90,000 (10%)',
    duration: '48 Months (4 Years)',
    status: 'Luxury Crest Mansions'
  }
];

const primeGalleryItems = [
  {
    id: 1,
    title: 'Prime Block Grand Boulevards & Wide Paved Roads',
    category: 'infrastructure',
    tag: 'Carpeted Boulevards',
    image: '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg',
    desc: 'Wide 225ft and 150ft carpeted road networks with modern streetscaping and green dividers.'
  },
  {
    id: 2,
    title: 'Scenic Margalla Ridge Panoramic Enclave',
    category: 'nature',
    tag: 'Margalla Views',
    image: '/images/faisal-hills-aerial.jpg',
    desc: 'Breathtaking high-elevation vistas over the Margalla Hills and lush green surroundings.'
  },
  {
    id: 3,
    title: 'Prime Block Community Park & Family Greens',
    category: 'infrastructure',
    tag: 'Family Parks',
    image: '/images/faisal-park.jpg',
    desc: 'Dedicated community parks with children play zones, jogging tracks, and serene flora.'
  },
  {
    id: 4,
    title: 'Central Jamia Mosque & Spiritual Center',
    category: 'infrastructure',
    tag: 'Grand Mosque',
    image: '/images/imgi_46_Mosques.webp',
    desc: 'Architecturally stunning air-conditioned Jamia Mosque with extensive prayer capacity.'
  },
  {
    id: 5,
    title: 'Sports Arena & Multi-Purpose Courts',
    category: 'amenities',
    tag: 'Sports Complex',
    image: '/images/imgi_48_sports-arena.webp',
    desc: 'State-of-the-art sports facilities including tennis courts, football turf, and cricket ground.'
  },
  {
    id: 6,
    title: 'Healthcare & Modern Medical Complex',
    category: 'amenities',
    tag: 'Healthcare Hub',
    image: '/images/imgi_49_Medical-xomplex.webp',
    desc: 'Fully equipped 24/7 medical and emergency clinic providing quality healthcare services.'
  }
];

const primeFaqs = [
  {
    q: 'Why is Prime Block considered the #1 Top Priority Block in Faisal Hills?',
    a: 'Prime Block represents Faisal Hills’ flagship luxury sector, featuring uniform official launch rates, 48-month easy installment plans with zero dealer markups, direct 225ft main boulevard frontage, and the highest elevation crest overlooking the Margalla Hills.'
  },
  {
    q: 'Is Faisal Hills Prime Block RDA approved?',
    a: 'Yes. Faisal Hills holds comprehensive NOC approval from the Rawalpindi Development Authority (RDA). All land-use plans, road hierarchies, and utility networks for Prime Block are fully sanctioned and legally verified.'
  },
  {
    q: 'What is the payment plan and booking down payment for Prime Block plots?',
    a: 'Booking begins with a 20% down payment. The remaining balance is conveniently divided into 16 quarterly installments over 48 months (4 years), with 10% payable on balloting and 10% on final possession.'
  },
  {
    q: 'Are there any hidden premiums ("On") on Prime Block files?',
    a: 'No. Prime Block is offered at official fixed launch prices without any speculative series markup or fluctuating premium. You pay exactly the official company rate issued by Zedem International.'
  },
  {
    q: 'What residential plot sizes are available in Prime Block?',
    a: 'Prime Block features 5 Marla (25×50), 8 Marla (30×60), 10 Marla (35×70), 14 Marla (40×80), and 1 Kanal (50×90) luxury residential plots.'
  },
  {
    q: 'Can Overseas Pakistanis book a plot in Prime Block online?',
    a: 'Yes. Overseas Pakistanis (NRPs) can book directly through our authorized sales desk. You can submit digital CNIC/NICOP documents, transfer the booking payment directly to Zedem International’s official bank account, and receive the verified allotment file via registered courier or collected in person.'
  },
  {
    q: 'How far is Prime Block from Islamabad and the M-1 Motorway?',
    a: 'Prime Block sits directly on the Main GT Road (N-5), approximately 5–10 minutes from Tarnol Morr, 10 minutes from the Taxila M-1 Interchange, and 30–35 minutes from Islamabad Zero Point / Blue Area.'
  }
];

export default function PrimeBlockContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'infrastructure' | 'nature' | 'amenities'>('all');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<typeof primeGalleryItems[0] | null>(null);

  // Lead Form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPlot, setLeadPlot] = useState('5 Marla (25x50)');
  const [leadNote, setLeadNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const filteredGallery = primeGalleryItems.filter(
    item => galleryFilter === 'all' || item.category === galleryFilter
  );

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* ========================================================= */}
      {/* 1. EXECUTIVE QUICK METRIC STATS BAR                      */}
      {/* ========================================================= */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-[#7b002c]/40 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#7b002c] shrink-0 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">NOC Approval</span>
            <strong className="font-serif font-bold text-base sm:text-lg text-slate-900 block">
              <CountUpNumber end={100} suffix="%" duration={1600} /> RDA Approved
            </strong>
            <span className="text-[11px] text-emerald-600 font-semibold">100% Fully Sanctioned</span>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-[#7b002c]/40 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Installment Plan</span>
            <strong className="font-serif font-bold text-base sm:text-lg text-slate-900 block">
              <CountUpNumber end={48} duration={1800} /> Months Easy Plan
            </strong>
            <span className="text-[11px] text-amber-600 font-semibold">16 Quarterly Payments</span>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-[#7b002c]/40 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Booking Amount</span>
            <strong className="font-serif font-bold text-base sm:text-lg text-slate-900 block">
              <CountUpNumber end={20} suffix="%" duration={1500} /> Down Payment
            </strong>
            <span className="text-[11px] text-emerald-600 font-semibold">Zero Market Premium</span>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-[#7b002c]/40 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Boulevard Frontage</span>
            <strong className="font-serif font-bold text-base sm:text-lg text-slate-900 block">
              <CountUpNumber end={225} suffix="ft+" duration={1900} /> Main Axis
            </strong>
            <span className="text-[11px] text-blue-600 font-semibold">Margalla Ridge Crest</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ABOUT PRIME BLOCK & SECTOR OVERVIEW                   */}
      {/* ========================================================= */}
      <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship Priority Sector</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                Faisal Hills Prime Block Overview & Vision
              </h2>
              <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
                <p>
                  <strong>Faisal Hills Prime Block</strong> is the premier, master-planned residential and commercial sector developed by <Link href="/about-us" className="text-[#7b002c] font-bold hover:underline">Faisal Town Group & Zedem International</Link>. Occupying the highest elevation ridge of the entire society, Prime Block commands scenic, unobstructed panoramas of the Margalla Hills while enjoying direct connectivity to the Grand Entrance and the Main GT Road (N-5).
                </p>
                <p>
                  Unlike standard resale sectors where prices fluctuate dynamically across plot series, Prime Block is introduced with <strong>official fixed launch rates</strong> and an accessible <strong>4-year (48-month) flexible installment plan</strong>. This makes it the highest priority investment choice for families seeking to build modern homes and savvy investors securing early-phase capital growth.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-serif font-bold text-slate-900 block">Uniform Official Pricing</strong>
                  <span className="text-[11px] text-slate-600">Guaranteed company launch rates with zero hidden markups or premiums.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-serif font-bold text-slate-900 block">48 Months Installments</strong>
                  <span className="text-[11px] text-slate-600">16 easy quarterly installments after a convenient 20% down payment.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-serif font-bold text-slate-900 block">RDA Sanctioned Legal Status</strong>
                  <span className="text-[11px] text-slate-600">Complete legal security backed by Rawalpindi Development Authority.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs font-serif font-bold text-slate-900 block">Underground Infrastructure</strong>
                  <span className="text-[11px] text-slate-600">100% underground electricity, sewerage, water lines and fiber optics.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="relative flex-1 min-h-[300px] lg:min-h-[360px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-lg group">
              <img
                src="/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
                alt="Faisal Hills Prime Block On-Ground Development"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Fast-Track Development</span>
                <h3 className="font-serif font-bold text-xl text-white">Prime Block On-Ground Execution</h3>
                <p className="text-xs text-slate-200 mt-1">Carpeted boulevards, dedicated green spaces, and high-elevation residential sectors.</p>
              </div>
            </div>

            <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 text-xs text-slate-700 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#7b002c] shrink-0" />
                <span>Download the official Faisal Hills Prime Block master map & zoning plan.</span>
              </div>
              <button
                onClick={() => setIsMapModalOpen(true)}
                className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-xl shrink-0 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Map</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE PLOT PRICE & FIXED RATE EXPLORER           */}
      {/* ========================================================= */}
      <section id="pricing-matrix" className="scroll-mt-28">
        <ScrollReveal direction="up" delay={80}>
          <DynamicPlotSeriesExplorer blockSlug="prime-block" blockName="Prime Block" />
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* 4. COMPREHENSIVE OFFICIAL FIXED PRICING MATRIX TABLE      */}
      {/* ========================================================= */}
      <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <BadgeCheck className="w-3.5 h-3.5" />
              <span>Official Company Schedule</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Prime Block 4-Year Installment Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-sans">
              Review verified plot dimensions, down payments, quarterly installments, and balloting milestones across all residential categories:
            </p>
          </div>
          <a
            href="https://wa.me/923044811717?text=Hi%2C%20I%20would%20like%20to%20request%20the%20complete%20Prime%20Block%20Payment%20Schedule%20and%20plot%20booking%20procedure."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request Official File</span>
          </a>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
              <tr>
                <th className="p-4">Plot Size</th>
                <th className="p-4">Dimensions</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">20% Down Payment</th>
                <th className="p-4">16 Quarterly Installments</th>
                <th className="p-4">Balloting (10%)</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {primeFixedPriceSchedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                  <td className="p-4">
                    <strong className="font-serif font-bold text-sm text-slate-900 block">{row.size}</strong>
                    <span className="text-[10px] text-emerald-700 font-semibold">{row.status}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-600">
                    <div>{row.dimensions}</div>
                    <div className="text-[10px] text-slate-400">({row.sqYards})</div>
                  </td>
                  <td className="p-4">
                    <strong className="font-serif font-bold text-sm text-[#7b002c] block">{row.totalPrice}</strong>
                    <span className="text-[10px] text-slate-500 font-sans">Official Launch</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-900">{row.downPayment}</td>
                  <td className="p-4 text-slate-800 font-medium">{row.quarterlyInstallment}</td>
                  <td className="p-4 text-slate-600">{row.balloting}</td>
                  <td className="p-4">
                    <a
                      href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20booking%20a%20${encodeURIComponent(row.size)}%20plot%20in%20Faisal%20Hills%20Prime%20Block.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white rounded-lg text-[11px] font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
          <span>* All installment rates are uniform with no hidden premiums. Special category plots (Corner, Park Facing, Main Boulevard) attract standard 10% prime location charges at allotment.</span>
          <span className="font-bold text-[#7b002c] shrink-0">Zedem International Official Guarantee</span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. LOCATION & CONNECTIVITY MATRIX                         */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Accessibility & Travel Times</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Faisal Hills Prime Block Location & Connectivity
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl font-sans">
            Prime Block is located right along the Main GT Road corridor near the Grand Society Entrance. With immediate access to Margalla Avenue, Srinagar Highway, and the M-1 Motorway, residents enjoy effortless commutes across the twin cities:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-[#7b002c]/40 hover:bg-white transition-all shadow-xs">
            <div className="space-y-0.5">
              <strong className="font-serif font-bold text-sm text-slate-900 block">HITEC University Taxila</strong>
              <span className="text-xs text-slate-500 font-sans">Direct GT Road Route</span>
            </div>
            <span className="font-bold text-sm text-[#7b002c] bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">
              5 Mins
            </span>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-[#7b002c]/40 hover:bg-white transition-all shadow-xs">
            <div className="space-y-0.5">
              <strong className="font-serif font-bold text-sm text-slate-900 block">Taxila M-1 Interchange</strong>
              <span className="text-xs text-slate-500 font-sans">Motorway Access Link</span>
            </div>
            <span className="font-bold text-sm text-[#7b002c] bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">
              10 Mins
            </span>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-[#7b002c]/40 hover:bg-white transition-all shadow-xs">
            <div className="space-y-0.5">
              <strong className="font-serif font-bold text-sm text-slate-900 block">Tarnol Morr (Islamabad)</strong>
              <span className="text-xs text-slate-500 font-sans">Twin Cities Junction</span>
            </div>
            <span className="font-bold text-sm text-[#7b002c] bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">
              8 Mins
            </span>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-[#7b002c]/40 hover:bg-white transition-all shadow-xs">
            <div className="space-y-0.5">
              <strong className="font-serif font-bold text-sm text-slate-900 block">Rawalpindi Saddar</strong>
              <span className="text-xs text-slate-500 font-sans">Via GT Road Highway</span>
            </div>
            <span className="font-bold text-sm text-[#7b002c] bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">
              25 Mins
            </span>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-[#7b002c]/40 hover:bg-white transition-all shadow-xs">
            <div className="space-y-0.5">
              <strong className="font-serif font-bold text-sm text-slate-900 block">Islamabad Blue Area</strong>
              <span className="text-xs text-slate-500 font-sans">Via Margalla Avenue / Srinagar</span>
            </div>
            <span className="font-bold text-sm text-[#7b002c] bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">
              35 Mins
            </span>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-[#7b002c]/40 hover:bg-white transition-all shadow-xs">
            <div className="space-y-0.5">
              <strong className="font-serif font-bold text-sm text-slate-900 block">New Islamabad Airport</strong>
              <span className="text-xs text-slate-500 font-sans">Via M-1 / CPEC Route</span>
            </div>
            <span className="font-bold text-sm text-[#7b002c] bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">
              25 Mins
            </span>
          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* 7. VISUAL GALLERY & ON-GROUND SHOWCASE                   */}
      {/* ========================================================= */}
      <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Visual Showcase</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Prime Block Media & On-Ground Views
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Explore authentic on-ground development progress, road networks, and natural Margalla landscape:
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setGalleryFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                galleryFilter === 'all'
                  ? 'bg-[#7b002c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Views ({primeGalleryItems.length})
            </button>
            <button
              onClick={() => setGalleryFilter('infrastructure')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                galleryFilter === 'infrastructure'
                  ? 'bg-[#7b002c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Infrastructure & Roads (3)
            </button>
            <button
              onClick={() => setGalleryFilter('amenities')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                galleryFilter === 'amenities'
                  ? 'bg-[#7b002c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Amenities & Sports (2)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryImage(item)}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-[#7b002c] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                  {item.tag}
                </span>
                <div className="absolute inset-0 bg-[#7b002c]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-[#7b002c] text-xs font-bold shadow-lg flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Full Size</span>
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <strong className="font-serif font-bold text-sm text-slate-900 group-hover:text-[#7b002c] transition-colors block">
                  {item.title}
                </strong>
                <p className="text-xs text-slate-600 line-clamp-2 font-sans">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. STEP-BY-STEP PLOT BOOKING & TRANSFER GUIDE             */}
      {/* ========================================================= */}
      <section className="bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Booking Procedure</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            How to Book a Plot in Prime Block
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-sans">
            Follow these verified official steps to secure your plot allocation with complete legal transparency:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="w-8 h-8 rounded-xl bg-[#7b002c] text-white font-mono font-bold text-xs flex items-center justify-center">01</span>
            <strong className="font-serif font-bold text-sm text-slate-900 block">Select Plot Size</strong>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Choose your preferred residential size (5, 8, 10, 14 Marla or 1 Kanal) based on budget and requirements.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="w-8 h-8 rounded-xl bg-[#7b002c] text-white font-mono font-bold text-xs flex items-center justify-center">02</span>
            <strong className="font-serif font-bold text-sm text-slate-900 block">Submit Documentation</strong>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Provide copy of Buyer CNIC / NICOP, Next of Kin CNIC, and 2 passport-size photographs.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="w-8 h-8 rounded-xl bg-[#7b002c] text-white font-mono font-bold text-xs flex items-center justify-center">03</span>
            <strong className="font-serif font-bold text-sm text-slate-900 block">20% Down Payment</strong>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Deposit down payment via Pay Order / Bank Draft in favour of <em>"Zedem International (Pvt) Ltd"</em>.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="w-8 h-8 rounded-xl bg-[#7b002c] text-white font-mono font-bold text-xs flex items-center justify-center">04</span>
            <strong className="font-serif font-bold text-sm text-slate-900 block">Receive Allotment File</strong>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Get your official company allotment letter, payment receipt, and 48-month installment book.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. FREQUENTLY ASKED QUESTIONS (STANDALONE CARD STYLE)     */}
      {/* ========================================================= */}
      <section className="space-y-6 pt-2">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Buyer Inquiries</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Answers to common questions regarding Prime Block location, NOC, plots, and payment terms:
          </p>
        </div>

        <div className="space-y-3">
          {primeFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#7b002c] shadow-md ring-1 ring-[#7b002c]/20'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span
                      className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#7b002c] text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-rose-50 group-hover:text-[#7b002c]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-serif font-bold text-sm sm:text-base transition-colors ${
                        isOpen ? 'text-[#7b002c]' : 'text-slate-900 group-hover:text-[#7b002c]'
                      }`}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#7b002c] text-white rotate-180 shadow-xs'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 mt-0 animate-fade-in pl-14 sm:pl-16">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. DIRECT LEAD CAPTURE INQUIRY FORM (CENTERED)           */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-[#7b002c] via-[#5c0021] to-[#3a0014] text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center space-y-2 relative z-10">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">VIP Sales Desk</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Schedule an On-Site Prime Block Tour
          </h3>
          <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Leave your contact details to receive verified plot listings, current resale rates, and official allotment files directly on WhatsApp.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center space-y-3 animate-fade-in relative z-10">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-xl text-white">Inquiry Received!</h4>
            <p className="text-xs text-rose-100 max-w-md mx-auto">
              Thank you, <strong>{leadName}</strong>. Our Prime Block senior property specialist will contact you on <strong>{leadPhone}</strong> with available plot files and official booking forms.
            </p>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4 max-w-2xl mx-auto relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Syed Sahil Shah"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white placeholder:text-rose-200/50 focus:outline-none focus:border-white transition-all"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +92 341 0472229"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white placeholder:text-rose-200/50 focus:outline-none focus:border-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Interested Plot Size</label>
                <select
                  value={leadPlot}
                  onChange={(e) => setLeadPlot(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-white/25 rounded-xl text-xs text-white focus:outline-none focus:border-white transition-all"
                >
                  <option value="5 Marla (25x50)">5 Marla Residential (25×50)</option>
                  <option value="8 Marla (30x60)">8 Marla Residential (30×60)</option>
                  <option value="10 Marla (35x70)">10 Marla Residential (35×70)</option>
                  <option value="14 Marla (40x80)">14 Marla Residential (40×80)</option>
                  <option value="1 Kanal (50x90)">1 Kanal Luxury Residential (50×90)</option>
                  <option value="Commercial Plot">Commercial Boulevard Plaza Plot</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Specific Requirements</label>
                <input
                  type="text"
                  placeholder="Corner, Park Facing, Boulevard, 4-Year Installment, etc."
                  value={leadNote}
                  onChange={(e) => setLeadNote(e.target.value)}
                  className="w-full px-4 py-3 bg-black/40 border border-white/25 rounded-xl text-xs text-white placeholder:text-rose-200/50 focus:outline-none focus:border-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-white hover:bg-slate-100 text-[#7b002c] text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#7b002c]" />
              <span>Submit Prime Block Inquiry</span>
            </button>
          </form>
        )}
      </section>

      {/* Map Download Lead Capture Modal */}
      <MapDownloadModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        mapPdfUrl="/FAISAL HILLS MASTER PLAN.pdf"
      />

      {/* Interactive Photo Lightbox Modal */}
      {selectedGalleryImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-white hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-black">
              <img
                src={selectedGalleryImage.image}
                alt={selectedGalleryImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-1">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                {selectedGalleryImage.tag}
              </span>
              <h3 className="font-serif font-bold text-xl text-white">
                {selectedGalleryImage.title}
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                {selectedGalleryImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
