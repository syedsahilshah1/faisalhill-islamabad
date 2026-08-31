'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
  MessageSquare,
  PhoneCall,
  ChevronRight,
  ChevronLeft,
  Users,
  Globe,
  Shield,
  Layers,
  HeartHandshake,
  Compass,
  FileText,
  HelpCircle,
  Check,
  Calendar,
  Landmark,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageCircle,
  Home,
  CheckCircle
} from 'lucide-react';
import LeadModal from '@/components/ui/LeadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TextReveal from '@/components/ui/TextReveal';
import CountUpNumber from '@/components/ui/CountUpNumber';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function AboutUsClient() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<number>(0);

  // Pillars Auto-scroll refs & state
  const pillarsScrollRef = useRef<HTMLDivElement>(null);
  const [isPillarsHovered, setIsPillarsHovered] = useState<boolean>(false);

  // 1-second auto scroll timer for Pillars section
  useEffect(() => {
    if (isPillarsHovered) return;
    const interval = setInterval(() => {
      if (pillarsScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = pillarsScrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const cardWidth = 300;
        if (scrollLeft >= maxScroll - 15) {
          pillarsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          pillarsScrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 1200); // 1.2s auto scroll
    return () => clearInterval(interval);
  }, [isPillarsHovered]);

  const scrollPillars = (direction: 'left' | 'right') => {
    if (pillarsScrollRef.current) {
      const cardWidth = 320;
      pillarsScrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Timeline Milestones
  const timelineMilestones = [
    {
      year: "2012",
      title: "Establishment of Zedem International",
      desc: "Zedem International (Pvt) Ltd was founded with a singular conviction: to eliminate speculative real estate in Pakistan by securing land and complete legal NOC approvals prior to public launch.",
      image: "/images/faisalhillarc.jpg"
    },
    {
      year: "2016",
      title: "Strategic Site Acquisition on GT Road",
      desc: "Prime land was secured at the historic Margalla foothills along GT Road (N-5), strategically positioned 30 minutes from Islamabad Zero Point and directly linked to the M-1 Motorway.",
      image: "/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
    },
    {
      year: "2018",
      title: "Official RDA & CDA Regulatory Approvals",
      desc: "Secured 100% verified legal NOC and layout approvals. Ground breaking commenced with heavy earth-moving machinery, establishing the master road network and central boulevard.",
      image: "/images/imgi_38_Faisal-Hills-site-home-page-header.webp"
    },
    {
      year: "2021",
      title: "Rapid Infrastructure & Sector Handovers",
      desc: "Carpeted main boulevard, underground utilities, Grand Jamia Mosque, and primary family residential sectors launched with on-ground possession handovers in Block A & Executive Block.",
      image: "/images/imgi_46_Mosques.webp"
    },
    {
      year: "2026",
      title: "5,000+ Delivered Plots & Mega Skyscraper",
      desc: "Today, Faisal Hills stands as a fully operational landmark with over 5,000 satisfied investors, active construction of family villas, Hills Walk promenade, and the 27-storey Faisal Jewel skyscraper.",
      image: "/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
    }
  ];

  const missionCommitments = [
    {
      title: "Legal First",
      desc: "We secure full regulatory approval before marketing. Every plot is backed by documented RDA compliance."
    },
    {
      title: "Infrastructure First",
      desc: "We lay carpeted roads, underground electricity, and water lines before selling future promises."
    },
    {
      title: "Pricing Integrity",
      desc: "Fair launch rates with flexible 3 to 4-year installment structures and zero hidden escalation fees."
    },
    {
      title: "Transparent Communication",
      desc: "Proactive quarterly milestone reports and transparent biometric transfers directly at Zedem Head Office."
    }
  ];

  const reasonsToChoose = [
    {
      title: "100% Legal Standing & Verified NOC",
      desc: "Faisal Hills holds complete RDA legal standing and verified NOC documentation, providing investors with undisputed freehold ownership and absolute title safety.",
      image: "/images/faisalhillarc.jpg"
    },
    {
      title: "Zedem International Proven Track Record",
      desc: "Backed by the multi-project delivery legacy of Faisal Town (FT-1), Faisal Hills, and Faisal Town Phase 2, with thousands of on-ground possession handovers.",
      image: "/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
    },
    {
      title: "Strategic Tri-Corridor Location",
      desc: "Located on main GT Road (N-5) with direct connectivity to Margalla Avenue and the Brahma Bahtar M-1 Motorway Interchange for swift twin-city commuting.",
      image: "/images/imgi_24_0001_Aerial_HW_Far-away_Final-copy-scaled.jpg"
    },
    {
      title: "On-Ground Carpeted Infrastructure",
      desc: "225ft Grand Boulevard, underground power cables, live RO water plants, operational educational hubs like Roots International, and gated security.",
      image: "/images/imgi_44_Executive-Block.webp"
    },
    {
      title: "Flexible 3 to 4-Year Installment Plans",
      desc: "Payment plans structured around real household cash flows, requiring easy 20%–25% booking with quarterly installments spread across 36 to 48 months.",
      image: "/images/faisalarc (3).jpg"
    },
    {
      title: "Dedicated Overseas Investor Desk",
      desc: "End-to-end remote consultation, digital booking submissions, secure banking channels, and regular video progress briefings for overseas Pakistanis in UAE, UK, and USA.",
      image: "/images/girl-headphone-support.png"
    },
    {
      title: "High Capital Appreciation & Yield",
      desc: "Early investors have experienced over 250% capital growth since launch. Ongoing commercial hubs like Hills Walk and Faisal Jewel offer projected 10%–14% annual rental returns.",
      image: "/faisal-jewel.jpg"
    }
  ];

  const buyerProfiles = [
    {
      title: "Families Building a Dream Home",
      tag: "Residential Living",
      desc: "For families seeking an eco-friendly, secure environment near Islamabad without paying inflated city-center prices. Faisal Hills provides 5 Marla to 1 Kanal residential plots in ready-to-build sectors with operational schools, mosques, and parks.",
      image: "/images/imgi_44_Executive-Block.webp"
    },
    {
      title: "First-Time Property Buyers",
      tag: "Secure Entry",
      desc: "New buyers benefit from transparent documentation, zero hidden charges, and structured installment schedules that allow systematic capital accumulation without financial stress.",
      image: "/images/faisalarc (1).webp"
    },
    {
      title: "Commercial & High-Yield Investors",
      tag: "10%–14% ROI",
      desc: "Seasoned investors leverage high-footfall commercial plots in Hills Walk and commercial retail shops in Faisal Jewel Skyscraper for sustained rental income and secondary market liquidity.",
      image: "/images/commercial/flagship-store.jpg"
    },
    {
      title: "Overseas Pakistani Community",
      tag: "Global Support",
      desc: "Expats in the UAE, UK, Saudi Arabia, Canada, and the USA enjoy a dedicated remote investment pathway with verified biometric verification, digital receipts, and WhatsApp advisory.",
      image: "/images/girl-headphone-support.png"
    }
  ];

  const processSteps = [
    {
      num: "01",
      title: "Consultation & Selection",
      desc: "Connect with our advisory desk to review available residential & commercial inventory matching your budget and investment timeframe."
    },
    {
      num: "02",
      title: "Booking & Documentation",
      desc: "Submit your official booking form along with CNIC copy, photos, and initial 20%–25% down payment via official pay order to Zedem International."
    },
    {
      num: "03",
      title: "Allotment Letter Issuance",
      desc: "Receive your verified Allotment Letter confirming plot number, sector block, exact dimensions, and full quarterly installment schedule."
    },
    {
      num: "04",
      title: "Easy Installments",
      desc: "Pay convenient quarterly installments over 3 to 4 years while tracking active on-ground infrastructure development via our digital updates."
    },
    {
      num: "05",
      title: "Possession & Construction",
      desc: "Take on-ground physical possession upon clearance of dues to begin constructing your custom family residence or commercial arcade."
    }
  ];

  const aboutFaqs = [
    {
      question: "Who is the developer of Faisal Hills Islamabad?",
      answer: "Faisal Hills Islamabad is developed by Zedem International (Pvt) Ltd under the leadership of Chairman Chaudhry Abdul Majeed. Zedem International is one of Pakistan's most respected real estate developers with successful delivered projects including Faisal Town (FT-1), Multi Gardens B-17, and Faisal Hills."
    },
    {
      question: "Is Faisal Hills Islamabad 100% approved by RDA?",
      answer: "Yes, Faisal Hills holds complete official approval and legal NOC documentation from the Rawalpindi Development Authority (RDA) covering its master plan layout and residential/commercial sectors."
    },
    {
      question: "Where is the head office of Zedem International located?",
      answer: "The Zedem International Head Office is located at Faisal Tower, Main Boulevard, MPCHS E-11/3, Islamabad. In addition, an on-site site office operates 6 days a week at the Main Entrance of Faisal Hills on GT Road Taxila."
    },
    {
      question: "Can Overseas Pakistanis buy plots remotely?",
      answer: "Yes. Zedem International operates a dedicated Overseas Investor Support Desk that facilitates remote booking, digital application submission, official banking transfer verification, and home delivery of allotment letters worldwide."
    },
    {
      question: "What is the development status of Faisal Hills in 2026?",
      answer: "Faisal Hills is heavily developed with over 5,000+ plots delivered with possession in Block A, Block B, Block C, and Executive Block. Families reside in ready villas, Roots International School is operational, and high-rise commercial megastructures like Faisal Jewel and Hills Walk are under active construction."
    }
  ];

  return (
    <div className="bg-[#fff8f6] min-h-screen text-slate-900 font-sans space-y-12 sm:space-y-16 lg:space-y-20 pb-20 selection:bg-[#7b002c] selection:text-white">

      {/* 1. HERO BANNER */}
      <section className="relative text-white overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-16 lg:pb-24 border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/imgi_38_Faisal-Hills-site-home-page-header.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-slate-950/85" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <TextReveal
              as="h1"
              text="Faisal Hills Developer — Built on Trust, Delivered with Purpose"
              className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight"
              staggerDelay={50}
              direction="left"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 flex items-center gap-2 cursor-pointer font-sans"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire With Advisory Desk</span>
            </button>
            <a
              href="tel:+923313339997"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl backdrop-blur-md transition-all border border-white/20 flex items-center gap-2 font-sans"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Call Head Office</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. FOUNDER & INTRODUCTORY SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4">
        <ScrollReveal direction="up" delay={50}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-3.5">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#7b002c]">
                Chairman &amp; Founder — Chaudhry Abdul Majeed
              </h3>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-[1.15]">
                Introducing Faisal Hills Islamabad — A Community Built for Pakistan&apos;s Future
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans pt-1">
                Faisal Hills Islamabad, developed by Zedem International, is a thoughtfully planned gated community located in Taxila along the historic GT Road.
              </p>

              {/* Collapsible Content */}
              {isSeeMoreOpen && (
                <div className="space-y-3 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed font-sans animate-in fade-in duration-300">
                  <p>
                    At the heart of Zedem International is its Chairman, Chaudhry Abdul Majeed. His leadership philosophy is simple yet transformative: <strong>a developer&apos;s primary obligation is not to the sale, but to the lifelong trust of the buyer.</strong>
                  </p>
                  <p>
                    Under his stewardship, Zedem International has successfully delivered Multi Gardens B-17, Faisal Town (FT-1), and Faisal Hills, earning an unblemished reputation for timely on-ground possession handovers, 100% legal RDA approvals, and transparent dealings across every phase.
                  </p>
                  <blockquote className="p-4 rounded-2xl bg-rose-50 border-l-4 border-[#7b002c] text-xs leading-relaxed text-slate-800 font-serif italic">
                    &quot;A successful housing project creates a lasting legacy — empowering local commerce, providing thousands of jobs, and giving families the pride of a secure, documented home.&quot;
                  </blockquote>
                </div>
              )}

              {/* See More Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsSeeMoreOpen(!isSeeMoreOpen)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#7b002c] hover:text-[#9e1245] transition-colors cursor-pointer py-1"
                >
                  <span>{isSeeMoreOpen ? 'See Less' : 'See More'}</span>
                  {isSeeMoreOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Discover More Link (Desktop) */}
              <div className="pt-2 hidden lg:block">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="inline-block text-xs font-bold text-[#7b002c] hover:text-[#9e1245] border-b-2 border-[#7b002c] pb-0.5 transition-all cursor-pointer"
                >
                  Discover More About Zedem International →
                </button>
              </div>
            </div>

            {/* Right Cutout Image */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative space-y-3">
              <div className="relative w-full max-w-sm sm:max-w-md flex items-end justify-center">
                <img
                  src="/chaudhry-abdul-majeed.webp"
                  alt="Chairman &amp; Founder - Chaudhry Abdul Majeed"
                  width={420}
                  height={475}
                  loading="lazy"
                  className="w-full h-auto max-h-[500px] object-contain object-bottom drop-shadow-2xl"
                />
              </div>

              {/* Discover More Link (Mobile) */}
              <div className="lg:hidden pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="inline-block text-xs font-bold text-[#7b002c] hover:text-[#9e1245] border-b-2 border-[#7b002c] pb-0.5 transition-all cursor-pointer"
                >
                  Discover More About Zedem International →
                </button>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* 3. ANIMATED METRICS COUNTUPS */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-4">
        <ScrollReveal direction="up" delay={50}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
              <div className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                <CountUpNumber end={5000} duration={2000} suffix="+" />
              </div>
              <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">Plots Delivered</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
              <div className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                <CountUpNumber end={12} duration={1800} suffix="+" />
              </div>
              <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">Years Experience</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
              <div className="font-serif font-bold text-2xl sm:text-3xl text-emerald-700">
                100%
              </div>
              <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">RDA NOC Approved</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1">
              <div className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
                <CountUpNumber end={30} duration={2000} suffix="+" />
              </div>
              <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">Parks &amp; Amenities</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1 col-span-2 sm:col-span-1">
              <div className="font-serif font-bold text-2xl sm:text-3xl text-[#7b002c]">
                <CountUpNumber end={14} duration={1900} suffix="%" />
              </div>
              <p className="text-[11px] font-semibold text-slate-650 uppercase tracking-wider">Commercial Yield</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. CHRONOLOGY OF GROWTH */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-1 border-b border-slate-200 pb-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Our Journey: From Strategic Vision to GT Road Landmark
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {timelineMilestones.map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={50 * idx}>
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/30 transition-all overflow-hidden flex flex-col group h-full justify-between">
                <div className="relative h-28 min-[400px]:h-36 sm:h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#7b002c] text-white text-[10px] sm:text-xs font-bold font-mono shadow">
                    {item.year}
                  </span>
                </div>

                <div className="p-3 sm:p-5 space-y-1 sm:space-y-2 flex-1 flex flex-col justify-start">
                  <h3 className="font-serif font-bold text-xs sm:text-lg text-slate-900 group-hover:text-[#7b002c] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-600 font-sans leading-relaxed line-clamp-3 sm:line-clamp-none pt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. VISION & MISSION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <ScrollReveal direction="up" delay={50}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all p-6 sm:p-8 space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center border border-rose-100 font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">OUR VISION</span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                  Legally Secure &amp; Value-Driven Living
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  “To be Pakistan’s most trusted housing society developer — delivering legally secure, master-planned communities that generate sustainable wealth and exceptional living standards for every resident.”
                </p>
              </div>
              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 text-xs text-[#7b002c] font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>100% Freehold Title &amp; Legal Compliance Guarantee</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all p-6 sm:p-8 space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100 font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">OUR MISSION</span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                  Accessible Quality &amp; Absolute Transparency
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {missionCommitments.map((comm, cidx) => (
                    <div key={cidx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <strong className="text-[#7b002c] text-xs font-bold block">{comm.title}</strong>
                      <p className="text-slate-600 text-[11px] font-sans leading-relaxed">{comm.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>On-Ground Handover Ahead of Scheduled Deadlines</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. WHY CHOOSE FAISAL HILLS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-6">
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                Why Choose Faisal Hills: Key Pillars That Matter
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => scrollPillars('left')}
                aria-label="Previous Pillar"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white transition-all flex items-center justify-center shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollPillars('right')}
                aria-label="Next Pillar"
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#7b002c] text-slate-700 hover:text-white transition-all flex items-center justify-center shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div
          ref={pillarsScrollRef}
          onMouseEnter={() => setIsPillarsHovered(true)}
          onMouseLeave={() => setIsPillarsHovered(false)}
          onTouchStart={() => setIsPillarsHovered(true)}
          onTouchEnd={() => setIsPillarsHovered(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pt-1 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0"
        >
          {reasonsToChoose.map((reason, idx) => (
            <div
              key={idx}
              className="w-[260px] min-[400px]:w-[290px] sm:w-[340px] shrink-0 snap-start bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#7b002c]/30 transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-36 min-[400px]:h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#7b002c] text-white text-xs font-bold flex items-center justify-center shadow font-mono">
                    {idx + 1}
                  </span>
                </div>
                <div className="p-4 sm:p-5 space-y-1.5 sm:space-y-2">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#7b002c] transition-colors leading-snug">
                    {reason.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-sans leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-[#7b002c] hover:text-white text-xs font-bold text-slate-700 transition-colors text-center cursor-pointer shadow-2xs"
                >
                  Inquire Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHO WE SERVE */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-1 border-b border-slate-200 pb-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Who We Serve: Our Investor &amp; Buyer Community
            </h2>
          </div>
        </ScrollReveal>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 border-r border-slate-200 bg-slate-50 flex flex-col divide-y divide-slate-200">
            {buyerProfiles.map((profile, index) => (
              <button
                key={index}
                onClick={() => setSelectedProfile(index)}
                className={`w-full text-left p-5 font-serif font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${
                  selectedProfile === index
                    ? 'bg-white text-[#7b002c] border-l-4 border-l-[#7b002c] shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100/70'
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-650 block">{profile.tag}</span>
                  <span>{profile.title}</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    selectedProfile === index ? 'translate-x-1 text-[#7b002c]' : 'text-slate-400'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="space-y-4 md:w-3/5">
              <span className="px-3 py-0.5 rounded-full bg-rose-50 text-[#7b002c] text-xs font-bold uppercase font-mono">
                {buyerProfiles[selectedProfile].tag}
              </span>
              <h3 className="font-serif font-bold text-2xl text-slate-900">
                {buyerProfiles[selectedProfile].title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                {buyerProfiles[selectedProfile].desc}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Consult for this Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="md:w-2/5 w-full relative h-48 md:h-56 rounded-2xl overflow-hidden bg-slate-950 shadow-md">
              <img
                src={buyerProfiles[selectedProfile].image}
                alt={buyerProfiles[selectedProfile].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. 5-STEP WORKING PROCESS */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
        <ScrollReveal direction="up" delay={50}>
          <div className="space-y-1 border-b border-slate-200 pb-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Our 5-Step Plot Allotment &amp; Handover Process
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-lg hover:border-[#7b002c]/30 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-serif font-black text-[#7b002c] text-2xl leading-none">
                    {step.num}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-mono">
                    STAGE
                  </span>
                </div>
                <h3 className="font-serif font-bold text-sm text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section id="faqs" className="scroll-mt-28 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-5 text-center flex flex-col items-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-2xl">
            Key answers regarding Zedem International leadership, RDA NOC legality, remote booking for overseas Pakistanis, and possession timelines.
          </p>
        </div>

        <FaqAccordion faqs={aboutFaqs} blockName="About Faisal Hills" />
      </section>

      {/* 10. CALL TO ACTION BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#4c050d] via-[#7b002c] to-[#4c050d] text-white p-8 sm:p-12 lg:p-16 border border-white/10 shadow-xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
          <div className="space-y-2 max-w-2xl relative z-10">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block font-mono">
              Start Your Investment Journey
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-white">
              Speak with the Faisal Hills Advisory Team Today
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
              Whether you are a first-time buyer seeking installment options, an overseas Pakistani planning remote investment, or a commercial buyer, our advisory desk provides honest, verified consultation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 relative z-10">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="px-6 py-3 bg-white text-[#7b002c] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer font-sans"
            >
              <MessageSquare className="w-4 h-4 text-[#7b002c]" />
              <span>Book Instant Consultation</span>
            </button>

            <a
              href="https://wa.me/923331113177?text=Hello%2C%20I%20would%20like%20to%20consult%20with%20the%20Faisal%20Hills%20advisory%20team%20regarding%20plot%20options."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lead Inquiry Modal */}
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />

    </div>
  );
}
