import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, ShieldCheck, MapPin, CheckCircle2, ShoppingBag, 
  HelpCircle, MessageSquare, PhoneCall, LayoutGrid, TrendingUp,
  FileText, SlidersHorizontal, ArrowRight, Sparkles, UserCheck, Briefcase
} from 'lucide-react';

import FaqAccordion from '@/components/ui/FaqAccordion';
import InteractiveMasterPlan from '@/components/map/InteractiveMasterPlan';

export const metadata: Metadata = {
  title: "Faisal Hills Commercial Plots for Sale 2026 | Prices & Payment Plan",
  description: "Explore Faisal Hills commercial plots for sale in Taxila, Islamabad. Compare 5, 10 and 12 marla prices, Executive and A–D Block options, and easy installment plans. Book today.",
  keywords: "Faisal Hills Commercial, Faisal Hills commercial plot price, Faisal Hills commercial payment plan, Faisal Hills Executive Block commercial, Faisal Hills commercial plots on installments, Faisal Hills D Block commercial plots",
  openGraph: {
    title: "Faisal Hills Commercial Plots for Sale 2026",
    description: "Explore Faisal Hills commercial plots for sale in Taxila, Islamabad. Compare prices, blocks, and installment plans.",
    images: ["/faisal-jewel.jpg"],
  },
  alternates: {
    canonical: "https://faisalhills.com/faisal-hills-commercial",
  }
};

const blockCommercials = [
  {
    name: "Faisal Hills Executive Block Commercial",
    description: "The Executive Block is the one most buyers ask about first, and for a straightforward reason: it sits closest to the main GT Road entrance. That proximity is why commercial activity concentrates here, and why current listings in the block include ready shops and offices for sale alongside open plots.",
    suitability: "Retail outlets, branded shops, offices, restaurants and food outlets, mixed-use buildings"
  },
  {
    name: "Faisal Hills A Block Commercial",
    description: "Block A is among the more settled parts of the society, which matters if you intend to open a business rather than hold a file. Established residential occupancy nearby means a resident customer base already exists — the single biggest factor for neighbourhood retail such as pharmacies, grocery stores and salons.",
    suitability: "Daily-need retail, clinics, small offices, service businesses"
  },
  {
    name: "Faisal Hills B Block Commercial",
    description: "Block B offers a balance between developed surroundings and entry cost. For buyers who want commercial exposure without paying peak Executive Block rates, this block deserves a serious look.",
    suitability: "Mid-range retail, professional offices, tuition and training centres"
  },
  {
    name: "Faisal Hills C Block Commercial",
    description: "Faisal Hills commercial plots in Block C appeal to buyers thinking two to four years out. As surrounding residential handover progresses, the commercial pockets here move from 'future potential' to 'active trade' — and that transition is where the sharpest capital appreciation usually happens.",
    suitability: "Medium-term investors, buyers planning to build later"
  },
  {
    name: "Faisal Hills D Block Commercial",
    description: "Faisal Hills D Block commercial plots typically sit at the more accessible end of the pricing range, since development here is at an earlier stage than the older blocks. That is the trade-off in plain terms: lower entry, longer wait.",
    suitability: "Long-horizon investment, installment buyers, first-time commercial investors"
  }
];

const faqs = [
  {
    q: "Is Faisal Hills commercial a good investment?",
    a: "It depends entirely on what you want from it. For an investor who can hold three to five years, commercial land in a society with GT Road frontage and ongoing residential handover has a reasonable structural case — limited commercial supply meeting growing local demand. For someone who needs returns inside twelve months, land is the wrong instrument. We will give you an honest read on your specific timeline before you buy."
  },
  {
    q: "What is the current Faisal Hills commercial plot price?",
    a: "Rates differ by block, size, road frontage and corner category, and they change with market conditions. Rather than quote a figure that ages badly, we share verified current pricing on request — call or message and we will send today's confirmed numbers."
  },
  {
    q: "Which block is best for commercial in Faisal Hills?",
    a: "The Executive Block is most associated with commercial activity because of its position near the main GT Road entrance, and it carries existing shops and offices. Block A suits neighbourhood retail serving settled residents. Blocks C and D offer lower entry with a longer development horizon. The right answer depends on whether you are opening a business now or investing for later."
  },
  {
    q: "Are Faisal Hills commercial plots available on installments?",
    a: "Yes. Installment plans are typically structured with a down payment, a confirmation instalment and quarterly payments over a fixed tenure. Ask us for the current Faisal Hills commercial payment plan and we will send the full schedule."
  },
  {
    q: "What sizes of commercial plots are offered?",
    a: "Commercial categories generally range from 5 marla up to larger units suitable for high-rise and mixed-use development. Availability of any specific size varies by block — confirm before you plan around it."
  },
  {
    q: "Can I buy a commercial plot and build immediately?",
    a: "That depends on development status and possession in the specific block. Some blocks are construction-ready; others are still at the development stage. We will tell you plainly which category the plot you are considering falls into."
  },
  {
    q: "What is the difference between a corner plot and a boulevard-facing plot?",
    a: "A corner plot has two open sides, giving more frontage, signage and entry options. A boulevard-facing plot fronts the main road, giving maximum visibility to passing traffic. Both carry a category premium above a standard internal plot, and both are worth it for retail."
  },
  {
    q: "How does the transfer process work?",
    a: "The seller clears outstanding society dues, both parties complete the society's transfer documentation, payment is made through a documented channel, and the file is transferred into your name. We manage coordination and verification at every stage."
  },
  {
    q: "Is Faisal Hills approved by the relevant authority?",
    a: "Faisal Hills holds NOC approval from the Rawalpindi Development Authority (RDA) covering roughly 11,823 kanals of land. We encourage every buyer to verify this directly with the RDA before booking."
  },
  {
    q: "Can overseas Pakistanis buy commercial plots here?",
    a: "Yes. Overseas buyers can purchase and hold property in Pakistan. We handle site verification, documentation and remote coordination for clients who cannot visit in person — including video walkthroughs of the specific plot."
  },
  {
    q: "What is the expected rental yield on a commercial unit?",
    a: "Rental returns depend on the built structure, the block's development level, tenant type and lease terms. We do not publish yield figures we cannot substantiate. What we can do is share what comparable units in the surrounding area are currently leasing for, so you can model it yourself."
  },
  {
    q: "How do I book a plot if I am not in Pakistan right now?",
    a: "Booking can be initiated remotely. We share available inventory, arrange a video site visit, send the payment schedule, and process the booking form and payment through official documented channels, with receipts issued at each step."
  }
];

export default function FaisalHillsCommercialPage() {
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
                  { "@type": "ListItem", "position": 2, "name": "Commercial", "item": "https://faisalhillsislamabadfh.com/faisal-hills-commercial" }
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
      <section className="relative bg-slate-900 py-20 px-6 overflow-hidden text-center sm:text-left">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 opacity-90" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#7b002c]/20 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#7b002c]/30 text-rose-300 border border-rose-500/20">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>High Yield Investment</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Faisal Hills Commercial Plots for Sale in Taxila, Islamabad
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Own a business address on GT Road, minutes from Islamabad and the M-1 Motorway. Explore verified Faisal Hills commercial plots across the Executive Block, A, B, C and D Blocks — available on cash and easy installments.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#7b002c] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Book Your Commercial Plot</span>
            </Link>

            <Link
              href="/payment-plan"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
            >
              <span>Get the 2026 Payment Plan</span>
            </Link>
          </div>

          <div className="pt-4 text-xs text-slate-400 flex flex-wrap items-center justify-center sm:justify-start gap-6 border-t border-slate-800">
            <span>✔ Verified listings</span>
            <span>✔ Direct booking support</span>
            <span>✔ Transfer & documentation assistance</span>
          </div>
        </div>
      </section>

      {/* Animated Block Ticker Strip */}
      <div className="bg-slate-950 border-y border-slate-800 py-3 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="ticker-track gap-0">
          {/* Duplicate set for seamless loop */}
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-0 shrink-0">

              <a href="/blocks/executive-block" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-white whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Executive Block</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-sans">Possession Ready</span>
              </a>

              <span className="text-slate-700 text-lg select-none">|</span>

              <a href="/blocks/prime-block" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-white whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Prime Block</span>
                <span className="text-[10px] text-amber-400 font-semibold font-sans">Installments Open</span>
              </a>

              <span className="text-slate-700 text-lg select-none">|</span>

              <a href="/blocks/block-a" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-white whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block A</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-sans">Families Settled</span>
              </a>

              <span className="text-slate-700 text-lg select-none">|</span>

              <a href="/blocks/block-b" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-white whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block B</span>
                <span className="text-[10px] text-sky-400 font-semibold font-sans">Margalla Views</span>
              </a>

              <span className="text-slate-700 text-lg select-none">|</span>

              <a href="/blocks/block-b1-extension" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-white whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">B Extension</span>
                <span className="text-[10px] text-violet-400 font-semibold font-sans">Affordable Entry</span>
              </a>

              <span className="text-slate-700 text-lg select-none">|</span>

              <a href="/blocks/block-c" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-white whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block C</span>
                <span className="text-[10px] text-amber-400 font-semibold font-sans">800+ Commercial Plots</span>
              </a>

              <span className="text-slate-700 text-lg select-none">|</span>

              <a href="/blocks/block-d" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-white whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Block D</span>
                <span className="text-[10px] text-emerald-400 font-semibold font-sans">Possession Granted</span>
              </a>

              <span className="text-slate-700 text-lg select-none">|</span>

              <a href="/blocks/faisal-jewels" className="flex items-center gap-2.5 px-6 py-1 group cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-white whitespace-nowrap font-sans tracking-wide group-hover:text-amber-400 transition-colors">Faisal Jewel Tower</span>
                <span className="text-[10px] text-rose-400 font-semibold font-sans">22-Storey Skyscraper</span>
              </a>

              <span className="text-slate-700 text-lg select-none">|</span>

            </div>
          ))}
        </div>
      </div>

      {/* Introduction */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: main intro text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="label-caps text-[#7b002c] font-bold block">About Commercial</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                Faisal Hills Commercial: A Business Address Where the Traffic Already Is
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Most people buy a residential plot to live somewhere. People buy a commercial plot for a completely different reason — to sit where the footfall is, and to let time do the rest. That is the short argument for Faisal Hills Commercial.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Faisal Hills is developed by Faisal Town (Pvt) Ltd and sits on GT Road near Taxila, on the Islamabad–Rawalpindi corridor. The society's commercial pockets are placed where they should be: along the main boulevard, near the civic centre, and around the entrance zones where daily traffic naturally slows down and stops.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              For a shop, an office floor, a clinic, a restaurant or a small retail outlet, that placement matters more than almost anything else on the brochure.
            </p>
          </div>

          {/* Right: Key Considerations Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">What Buyers Typically Weigh</h3>
            <div className="space-y-3 text-xs font-sans text-slate-700 leading-relaxed">
              <div className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[#7b002c] font-bold mt-0.5 shrink-0">①</span>
                <div>
                  <strong className="block text-slate-900">Location within the society</strong>
                  Is the plot boulevard-facing, corner, or tucked inside a lane?
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[#7b002c] font-bold mt-0.5 shrink-0">②</span>
                <div>
                  <strong className="block text-slate-900">Cost and terms</strong>
                  What does it take in cash or on installments? See the <Link href="/faisal-hills-payment-plan" className="text-[#7b002c] font-bold hover:underline">payment plan</Link>.
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[#7b002c] font-bold mt-0.5 shrink-0">③</span>
                <div>
                  <strong className="block text-slate-900">Timing</strong>
                  Is the block developed enough to open a business now, or is it a hold-and-appreciate play?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-8 bg-white border-y border-slate-200">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="label-caps text-[#7b002c] font-bold block">Services</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            What We Handle for You
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            We work the file from the first phone call to the day the transfer letter is in your hand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3">
            <Building2 className="w-5 h-5 text-[#7b002c]" />
            <h3 className="font-serif font-bold text-base text-slate-900">Commercial Plot Booking</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Fresh bookings in the blocks currently open for Faisal Hills commercial plots booking, with the form, dues and schedule explained line by line before you sign anything.
            </p>
          </div>
          <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3">
            <ShoppingBag className="w-5 h-5 text-[#7b002c]" />
            <h3 className="font-serif font-bold text-base text-slate-900">Verified Resale Listings</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Live inventory of Faisal Hills commercial property for sale from existing owners — dealer-verified, with file status checked before we show it to you.
            </p>
          </div>
          <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3">
            <SlidersHorizontal className="w-5 h-5 text-[#7b002c]" />
            <h3 className="font-serif font-bold text-base text-slate-900">Installment Plan Guidance</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              A clear walkthrough of Faisal Hills commercial plots on installments — down payment, quarterly amounts, possession-linked dues and what happens if a date slips.
            </p>
          </div>
          <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3">
            <LayoutGrid className="w-5 h-5 text-[#7b002c]" />
            <h3 className="font-serif font-bold text-base text-slate-900">Block & Location Advisory</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Honest input on which block suits your plan. A restaurant needs different frontage than a corporate office. We will tell you when a cheaper plot is actually the wrong plot.
            </p>
          </div>
          <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3">
            <ShieldCheck className="w-5 h-5 text-[#7b002c]" />
            <h3 className="font-serif font-bold text-base text-slate-900">Transfer & Documentation</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Society transfer, dues clearance, seller verification and file handover. This is the step where most deals go wrong, so we handle it ourselves.
            </p>
          </div>
          <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3">
            <TrendingUp className="w-5 h-5 text-[#7b002c]" />
            <h3 className="font-serif font-bold text-base text-slate-900">Investment & Rental Consultancy</h3>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Whether you are buying to build, buying to hold, or buying to lease — we map the realistic outcomes for each, including expected timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="label-caps text-[#7b002c] font-bold block">Commercial Master Plan</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Interactive Commercial Hotspots & Plots Map
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select the "Commercial Hotspots" tab to locate Faisal Jewel, Civic Center, and other prime business locations.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-xl border border-slate-200">
          <InteractiveMasterPlan defaultViewMode="commercial" initialBlockSlug="all" />
        </div>
        <p className="text-[10px] text-slate-500 italic text-center">
          Review the <Link href="/master-plan" className="text-[#7b002c] font-bold hover:underline">full Faisal Hills master plan</Link> for detailed layout grids.
        </p>
      </section>

      {/* Pricing Guide Table */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <span className="label-caps text-[#7b002c] font-bold block">Pricing Matrix 2026</span>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Faisal Hills Commercial Plot Prices
          </h2>
          <p className="text-xs text-slate-600 font-sans">
            Rates differ by block, size, road frontage and corner category, and they change with market conditions. Check the live pricing spreads:
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
              <tr>
                <th className="p-4">Plot Size</th>
                <th className="p-4">Typical Use</th>
                <th className="p-4">Approximate Price Range (PKR)</th>
                <th className="p-4">Installment Option</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c]">5 Marla Commercial</td>
                <td className="p-4 font-sans">Shops, retail clinics, service counters</td>
                <td className="p-4 font-bold">1.2 Crore – 1.8 Crore</td>
                <td className="p-4 text-emerald-600 font-semibold">Available on Resale Terms</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c]">8 Marla Commercial</td>
                <td className="p-4 font-sans">Multi-shop units, corporate branch, showrooms</td>
                <td className="p-4 font-bold">2.2 Crore – 3.8 Crore</td>
                <td className="p-4 text-emerald-600 font-semibold">Quarterly Installments Available</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c]">10 Marla Commercial</td>
                <td className="p-4 font-sans">Offices, restaurants, clinics, bank sites</td>
                <td className="p-4 font-bold">3.5 Crore – 5.5 Crore</td>
                <td className="p-4 text-emerald-600 font-semibold">Installments / Cash Resale</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c]">12 Marla Commercial</td>
                <td className="p-4 font-sans">High-rise corporate use, showrooms</td>
                <td className="p-4 font-bold">4.5 Crore – 7.5 Crore</td>
                <td className="p-4 text-emerald-600 font-semibold">Installments / Cash Resale</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-[#7b002c]">1 Kanal Commercial</td>
                <td className="p-4 font-sans">High-rise shopping malls, commercial plazas</td>
                <td className="p-4 font-bold">8.0 Crore – 15.0 Crore</td>
                <td className="p-4 text-[#7b002c] font-semibold">Lump-sum Cash Resale</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-500 italic text-center">
          * Note: Prices move fast. You can also <a href="https://www.zameen.com/" target="_blank" rel="noopener noreferrer" className="text-[#7b002c] font-bold hover:underline">check live market listings</a> as an independent second reference point.
        </p>
      </section>

      {/* Commercial Pockets by Block */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <span className="label-caps text-[#7b002c] font-bold block">Location Mapping</span>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Faisal Hills Commercial Pockets by Block
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blockCommercials.map((block, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-[#7b002c]">{block.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {block.description}
                </p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-slate-500 border-t border-slate-50">
                <span className="text-[#7b002c] font-bold">Best suited for:</span> {block.suitability}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Schedule details */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 space-y-4">
            <span className="label-caps text-[#7b002c] font-bold block">Payment Structure</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Commercial Payment Plan & Installments
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              The reason installment buying works well for commercial land is simple: you lock today's rate and pay it out of tomorrow's income, while the asset appreciates in your name the whole time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
              <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-[#7b002c] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">DP</span>
                <div><strong className="text-slate-900 block">Down payment</strong><span className="text-slate-500">The booking amount that reserves your plot and starts the file.</span></div>
              </div>
              <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-[#7b002c] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">CI</span>
                <div><strong className="text-slate-900 block">Confirmation instalment</strong><span className="text-slate-500">Payable within a set window after booking.</span></div>
              </div>
              <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-[#7b002c] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">QI</span>
                <div><strong className="text-slate-900 block">Quarterly instalments</strong><span className="text-slate-500">Spread over a fixed number of quarters.</span></div>
              </div>
              <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-[#7b002c] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">PD</span>
                <div><strong className="text-slate-900 block">Possession dues</strong><span className="text-slate-500">Payable at handover stage.</span></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <strong className="text-slate-900 font-serif text-base block border-b border-slate-100 pb-2">Plan Summary Snapshot</strong>
              <div className="space-y-2 text-xs font-sans text-slate-600">
                <div className="flex justify-between"><span>Down Payment</span><span className="font-bold">20% - 30%</span></div>
                <div className="flex justify-between"><span>Confirmation</span><span className="font-bold">30 Days</span></div>
                <div className="flex justify-between"><span>Tenure</span><span className="font-bold">12 - 16 Quarters</span></div>
                <div className="flex justify-between"><span>Possession Dues</span><span className="font-bold">Linked to Handover</span></div>
              </div>
            </div>
            <Link
              href="/payment-plan"
              className="mt-6 w-full py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-sm transition-all duration-300 block"
            >
              Request Full Payment Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-slate-900 text-white rounded-3xl my-8">
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Why Invest in Faisal Hills Commercial Property?
            </h2>
            <p className="text-xs text-slate-400">
              Key investment drivers that support long-term capital appreciation and rental yield:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-850 p-6 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="text-sm font-bold text-rose-300 font-serif">Dual Access Traffic</h4>
              <p className="text-slate-400 leading-relaxed font-sans">
                Positioned directly off GT Road with upcoming interchange link to M-1 Motorway. Captures local and pass-through customers.
              </p>
            </div>
            <div className="bg-slate-850 p-6 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="text-sm font-bold text-rose-300 font-serif">Captive Local Footfall</h4>
              <p className="text-slate-400 leading-relaxed font-sans">
                Serves thousands of resident families inside the gated community who utilize these central commercial zones daily.
              </p>
            </div>
            <div className="bg-slate-850 p-6 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="text-sm font-bold text-rose-300 font-serif">Built-in Scarcity</h4>
              <p className="text-slate-400 leading-relaxed font-sans">
                Only a minor percentage of society land is allocated to commercial sectors, ensuring natural supply constraints. Compare with <Link href="/commercial-plots-islamabad" className="text-rose-300 font-bold hover:underline">commercial plots in Islamabad</Link> allocations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Process stepper */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 bg-white rounded-3xl border border-slate-200 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="label-caps text-[#7b002c] font-bold block">Booking Steps</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            How to Book a Faisal Hills Commercial Plot
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 pt-4">

          <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-sm">01</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 1</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Identify Plot Purpose</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">Select size and block based on whether you plan shops, offices, or mixed-use.</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-sm">02</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 2</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Review Inventory</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">Review live availabilities, road width premiums, and sector corner locations.</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-sm">03</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 3</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Site Inspection</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">Walk the ground, locate the block boundary, and check neighboring structures.</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#7b002c]/10 text-[#7b002c] flex items-center justify-center font-bold text-sm">04</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Step 4</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-slate-900">Select Terms</h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">Choose between cash payment discount or standard quarterly installment plan.</p>
            </div>
          </div>

          <div className="bg-[#7b002c] p-5 rounded-2xl hover:bg-[#9e1245] transition-all duration-300 flex flex-col space-y-4 text-white">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-sm">05</span>
              <span className="text-[10px] text-rose-200 font-bold uppercase tracking-wider font-sans">Final Step</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-sm text-white">Execute Booking</h3>
              <p className="text-xs text-rose-100 font-sans leading-relaxed">Complete documentation, submit down payment draft, and receive allotment letter.</p>
            </div>
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

        <FaqAccordion faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} blockName="Faisal Hills Commercial" />
        <p className="text-[10px] text-slate-500 italic text-center">
          Read more about approvals in our <Link href="/faisal-hills-location" className="text-[#7b002c] font-bold hover:underline">Faisal Hills location and accessibility guide</Link> page.
        </p>
      </section>

      {/* Closing CTA */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-16">
        <div className="rounded-3xl bg-[#4c050d] text-white p-8 lg:p-12 border border-[#7b002c] shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Consultation</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white">
              Let's Find the Right Commercial Plot
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              We check file status, dues, and transfer clearances before presenting any commercial options. Get in touch with our commercial desk or contact our property consultants.
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
              <span>CHAT VIA WHATSAPP</span>
            </a>

            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>BOOK A PLOT</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
