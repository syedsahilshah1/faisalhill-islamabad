'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2, ShieldCheck, MapPin, CheckCircle2, Sparkles, TrendingUp,
  Award, Clock, ArrowRight, MessageSquare, PhoneCall, ChevronRight, Users,
  Globe, Shield, Layers, HeartHandshake, Compass, FileText, HelpCircle, Check, 
  Map, Calendar, Landmark, Coins, HeartHandshake as PledgeIcon, UserCheck
} from 'lucide-react';
import LeadModal from '@/components/ui/LeadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function AboutUsPage() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<number>(0);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Schema Markup for SEO and EEAT Signals
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://faisalhillsislamabadfh.com/about-us/#webpage",
        "url": "https://faisalhillsislamabadfh.com/about-us/",
        "name": "Faisal Hills Islamabad Developer | Project Details",
        "description": "Learn about Faisal Hills Islamabad — a CDA-approved society by Zedem International. Discover our story, vision, team & investor commitment since 2012.",
        "breadcrumb": {
          "@id": "https://faisalhillsislamabadfh.com/about-us/#breadcrumb"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://faisalhillsislamabadfh.com/about-us/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://faisalhillsislamabadfh.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About Us",
            "item": "https://faisalhillsislamabadfh.com/about-us/"
          }
        ]
      },
      {
        "@type": "RealEstateAgent",
        "@id": "https://faisalhillsislamabadfh.com/#organization",
        "name": "Faisal Hills Islamabad",
        "image": "https://faisalhillsislamabadfh.com/logo.png",
        "url": "https://faisalhillsislamabadfh.com/",
        "telephone": "+9251111324725",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Grand Trunk Road, Taxila",
          "addressLocality": "Rawalpindi",
          "addressRegion": "Islamabad-Rawalpindi Corridor",
          "postalCode": "47080",
          "addressCountry": "PK"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "33.7278",
          "longitude": "72.8014"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "Organization",
        "name": "Zedem International (Pvt) Ltd",
        "url": "https://faisalhillsislamabadfh.com/",
        "logo": "https://faisalhillsislamabadfh.com/logo.png",
        "foundingDate": "2012",
        "founder": {
          "@type": "Person",
          "name": "Chaudhry Abdul Majeed",
          "jobTitle": "Chairman & Founder",
          "worksFor": {
            "@type": "Organization",
            "name": "Zedem International (Pvt) Ltd"
          }
        },
        "description": "Zedem International is a premier property development company in Pakistan, known for delivering legally compliant real estate communities built on trust."
      },
      {
        "@type": "Person",
        "name": "Chaudhry Abdul Majeed",
        "jobTitle": "Chairman & Founder",
        "worksFor": {
          "@type": "Organization",
          "name": "Zedem International (Pvt) Ltd"
        },
        "sameAs": [
          "https://faisalhillsislamabadfh.com/about-us/"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who owns and developed Faisal Hills Islamabad?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Faisal Hills Islamabad is owned and developed by Zedem International (Pvt) Ltd, under the leadership of its founder and Chairman Chaudhry Abdul Majeed. Zedem International is a multi-project real estate developer based in Pakistan with an active portfolio that includes Faisal Hills and Faisal Town, both located in the Islamabad–Rawalpindi corridor."
            }
          },
          {
            "@type": "Question",
            "name": "Is Faisal Hills Islamabad a legally approved housing society?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Faisal Hills Islamabad holds CDA (Capital Development Authority) approval and all associated NOC (No Objection Certificate) documentation. It operates within the regulatory framework of both the CDA and the RDA (Rawalpindi Development Authority) for applicable jurisdictional matters. Prospective buyers are encouraged to request and review the official NOC documentation before booking — our team provides this proactively."
            }
          },
          {
            "@type": "Question",
            "name": "How long has Zedem International been operating in Pakistan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Zedem International has been active in Pakistan’s real estate sector for over a decade, with a development record that includes multiple large-scale projects. The company’s experience spans regulatory approvals, master planning, infrastructure delivery, and community management across the Islamabad–Rawalpindi region."
            }
          },
          {
            "@type": "Question",
            "name": "Can I invest in Faisal Hills Islamabad from abroad?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Faisal Hills Islamabad is a popular investment choice for overseas Pakistanis from the UAE, UK, Saudi Arabia, Canada, the United States, and other countries. Our overseas investor support desk manages the complete booking process remotely — digital form submission, secure bank transfer guidance, documentation delivery, and regular progress updates via WhatsApp."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between Faisal Hills and Faisal Town?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Faisal Hills Islamabad is located on GT Road near Taxila, approximately 30 minutes from Zero Point Islamabad. Faisal Town is a sister project by Zedem International, located closer to the M-1 Motorway interchange and the new Islamabad International Airport. Both are CDA/RDA-approved developments by the same developer, serving different location preferences and price points."
            }
          },
          {
            "@type": "Question",
            "name": "How transparent is the Faisal Hills booking process?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Faisal Hills booking process is fully documented and transparent. All applicable charges — booking amount, down payment, instalment schedule, development charges, transfer fees, and possession charges — are disclosed in writing at the time of booking. There are no undisclosed fees or subsequent charges added without prior written notification."
            }
          },
          {
            "@type": "Question",
            "name": "How can I verify that Faisal Hills development is actually progressing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Site visits can be arranged at any time through our sales and client services team. Buyers are welcome to visit the development, walk the sectors, and inspect infrastructure progress independently. We also provide quarterly development update reports and maintain active WhatsApp communication channels."
            }
          },
          {
            "@type": "Question",
            "name": "Is Faisal Hills Islamabad a good investment in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "From an investment perspective, Faisal Hills Islamabad combines the four elements that historically drive property value appreciation in Pakistan's suburban markets: legal standing (CDA-approved with verified NOC), locational demand drivers (GT Road, Islamabad Expressway, M-1 access), active infrastructure delivery (visible, on-the-ground progress), and developer credibility (Zedem International's verified track record)."
            }
          }
        ]
      }
    ]
  };

  const timelineMilestones = [
    {
      year: "2012",
      title: "Establishment of Zedem",
      desc: "Zedem International (Pvt) Ltd was established with a singular conviction: that Pakistan's housing sector was underserved by credible, legally compliant, and professionally managed developers. There was a profound shortage of developers who acquired land and secured genuine regulatory approval before booking."
    },
    {
      year: "2016",
      title: "The Site Acquisition",
      desc: "The site for Faisal Hills Islamabad was chosen with deliberate care on the historic GT Road near Taxila. Strategically positioned next to the industrial hub and Margalla Hills, within 30 minutes of Zero Point Islamabad, the location was a calculated choice for long-term suburban growth."
    },
    {
      year: "2018",
      title: "CDA NOC Approval",
      desc: "From the earliest phases, Faisal Hills developer operated under the CDA's regulatory framework. The NOC documentation was secured and verified before the first plot was sold, setting a benchmark for legal compliance in the Islamabad-Rawalpindi corridor."
    },
    {
      year: "2021",
      title: "Sustained Infrastructure",
      desc: "Multiple residential and commercial phases were launched. Under the leadership of Zedem, roads were carpeted, boundary walls were raised, and basic utilities were installed. Plot valuations began reflecting real, physical development rather than speculative papers."
    },
    {
      year: "2026",
      title: "Landmark Community",
      desc: "Today, with over 5,000 plots booked, completed road networks, operational entries, and active housing construction across blocks, Faisal Hills stands as one of the most credible, fully functioning gated communities near Islamabad."
    }
  ];

  const missionCommitments = [
    {
      title: "Legal First",
      desc: "We secure regulatory approval before we sell. Every plot in Faisal Hills is backed by documented CDA and RDA compliance, eliminating legal risks."
    },
    {
      title: "Infrastructure Before Promise",
      desc: "We invest in visible, measurable development milestones that buyers can verify on the ground. We lay roads and utilities before selling promises."
    },
    {
      title: "Pricing with Integrity",
      desc: "Our pricing reflects fair market value, with flexible payment structures that make property ownership achievable without financial strain."
    },
    {
      title: "Communication Without Gaps",
      desc: "Buyers receive honest, regular updates on development progress — the kind of transparency that builds relationships that outlast a single transaction."
    }
  ];

  const reasonsToChoose = [
    {
      title: "Legal Certainty Before Everything Else",
      desc: "In Pakistan's property market, legal standing is not a given — it is an achievement. Faisal Hills Islamabad holds its CDA approval and all associated NOC documentation, providing investors with the single most important safeguard any housing society can offer: verified legal title. This is not a technicality; it is the difference between an investment and a liability."
    },
    {
      title: "A Developer With a Portfolio, Not Just a Pitch",
      desc: "Zedem International has a completed and ongoing portfolio of projects — Faisal Hills and Faisal Town — with documented delivery records. When you invest in Faisal Hills, you are investing with a developer whose credibility can be independently verified, not merely claimed."
    },
    {
      title: "Location That Delivers Long-Term Demand",
      desc: "GT Road is one of Pakistan's great economic arteries. The Faisal Hills Islamabad location is not just convenient today — it is structurally positioned to benefit from the Islamabad Expressway expansion, GT Road dualization, and continued suburban development in the Taxila–Rawalpindi belt for decades to come. Demand drivers here are structural, not speculative."
    },
    {
      title: "Phased Development, Real Infrastructure",
      desc: "The roads in Faisal Hills are carpeted. The boundary walls are up. The main gate is operational. Underground utilities are being laid. This is not a society that exists on a brochure — it is a community under active, visible construction that buyers can visit, walk, and verify at any time."
    },
    {
      title: "Flexible Payment Plans Designed for Real Buyers",
      desc: "Faisal Hills Islamabad payment plans are structured around how Pakistanis actually earn and save: with booking amounts that do not require liquidating life savings, and instalment schedules that spread the investment across manageable quarterly or bi-annual payments over two to four years."
    },
    {
      title: "Dedicated Support for Overseas Pakistani Investors",
      desc: "Overseas Pakistanis represent a significant and valued portion of our investor community. We have built a remote investment process that accommodates every step — from digital form submission and secure bank transfers to WhatsApp-based progress updates, site visit reports, and documentation delivery."
    },
    {
      title: "An Investment That Has Already Proven Itself",
      desc: "Investors who entered Faisal Hills at launch-phase prices have seen meaningful capital appreciation. The combination of legal standing, infrastructure delivery, and locational demand has driven plot valuations upward since the society's launch, and analysts tracking the Islamabad suburban property market continue to project upward momentum as development accelerates through 2026 and beyond."
    }
  ];

  const differentiators = [
    {
      title: "Legal Standing with Verifiable Documentation",
      desc: "CDA approval is claimed by many; it can be verified only by requesting the actual NOC documentation. At Faisal Hills, we provide complete NOC documentation to every serious buyer as a standard part of the consultation process — not as a response to suspicion, but as a demonstration of confidence."
    },
    {
      title: "A Developer You Can Research Independently",
      desc: "Zedem International's track record is not self-reported. The company's history of delivering Faisal Town and progressing Faisal Hills can be independently verified — by visiting the sites, speaking with existing investors, and reviewing publicly available registration and approval documentation."
    },
    {
      title: "Genuine Infrastructure, Not Renderings",
      desc: "Some housing societies in the Islamabad belt exist primarily as digital presentations and plot maps. Faisal Hills exists as a physical development with carpeted roads, boundary infrastructure, gated entry, and active utility installation. Buyers can visit and see what their investment is building toward."
    },
    {
      title: "Price Positioning That Creates Real Returns",
      desc: "Faisal Hills plots are priced to enter, not to impress. That pricing discipline — keeping entry prices accessible relative to more central Islamabad alternatives — creates the structural conditions for capital appreciation as infrastructure matures and demand grows. Early investors have already experienced this dynamic."
    },
    {
      title: "Multi-Phase Development Ensuring Continued Value",
      desc: "With four phases launched and continued expansion planned, Faisal Hills represents an ongoing value-creation engine, not a static asset. Each new phase of development adds amenities, connectivity, and community density that raises values across all earlier phases."
    }
  ];

  const coreValues = [
    { title: "Transparency", desc: "Every fee, every charge, every development milestone is communicated in writing, in advance. We do not operate behind information asymmetry." },
    { title: "Legal Integrity", desc: "We do not sell until we have approval. We do not promise until we can deliver. Every plot carries the weight of documented regulatory compliance." },
    { title: "Quality of Delivery", desc: "Infrastructure is built to last, not to photograph. Roads, utilities, and common areas are executed to standards that serve residents for decades, not seasons." },
    { title: "Investor-First Thinking", desc: "Our payment structures, communication protocols, and documentation processes are designed around the buyer's experience, not administrative convenience." },
    { title: "Long-Term Accountability", desc: "Our relationship with buyers does not end at booking or even at possession. We stand behind our project and our community through every phase of its life." },
    { title: "Inclusive Access", desc: "Quality real estate should not be the exclusive preserve of the already-wealthy. Our plot size range and flexible payment plans are a deliberate commitment to inclusive access." }
  ];

  const buyerProfiles = [
    {
      title: "Families Building a Future Home",
      desc: "For families who want to own a plot near Islamabad without bearing the full cost of a city-centre location, Faisal Hills offers residential plots from 5 Marla to 1 Kanal, with payment plans that align to household income. The gated, master-planned environment ensures that when construction begins, it is in a community built to a consistent standard."
    },
    {
      title: "First-Time Property Investors",
      desc: "Individuals entering Pakistan's property market for the first time benefit from Faisal Hills' documented legal standing, straightforward booking process, and the credibility of a developer with a verified track record. There is no need to navigate legal uncertainty or developer opacity — the documentation is in order, and the process is designed to be accessible."
    },
    {
      title: "Experienced Real Estate Investors",
      desc: "Seasoned investors recognise the combination of GT Road accessibility, CDA approval, and active infrastructure delivery as the conditions that historically produce above-average capital appreciation. Faisal Hills' commercial plots in particular offer compelling long-term rental yield potential as the society's residential population grows."
    },
    {
      title: "Overseas Pakistanis",
      desc: "From the UAE, UK, Saudi Arabia, Canada, and beyond, overseas Pakistanis represent some of our most loyal and engaged investors. We provide a fully remote investment pathway: secure documentation, WhatsApp-based advisory support, transparent bank transfer guidance, and regular site progress updates. Many of our most satisfied investors have never needed to visit the site in person before booking — because the legal and documentary framework we provide makes that level of confidence achievable remotely."
    }
  ];

  const processSteps = [
    {
      num: "01",
      title: "Consultation and Plot Selection",
      desc: "Contact our advisory team via phone, WhatsApp, or online form. We take the time to understand your goals — whether you are building a home, diversifying an investment portfolio, or securing an asset for a family member. We then present available plots matching your criteria with full pricing and payment plan transparency."
    },
    {
      num: "02",
      title: "Booking and Documentation",
      desc: "Once you select your plot, a booking form is completed and submitted alongside the booking amount (pay order or bank transfer payable to Zedem International). Required documentation: CNIC copy and two passport photographs. No hidden fees are collected at this stage or at any subsequent stage without prior disclosure."
    },
    {
      num: "03",
      title: "Allotment Letter Issuance",
      desc: "Within two to four weeks of booking confirmation, your official allotment letter is issued directly by Zedem International. This letter confirms your plot number, block, size, total purchase value, and your full instalment schedule — every financial commitment documented in writing, in advance."
    },
    {
      num: "04",
      title: "Instalment Payments & Monitoring",
      desc: "Instalments are paid quarterly or bi-annually according to your agreed schedule. Throughout this period, our client relations team provides proactive development updates, responds to queries within working hours, and facilitates site visits for any investor who wishes to inspect progress in person."
    },
    {
      num: "05",
      title: "Possession and Handover",
      desc: "Upon completion of development milestones in your sector and payment of possession charges, your plot is handed over with full legal documentation. From this point, you are free to commence construction, transfer ownership, or hold the plot as an appreciating asset. The journey from first inquiry to legal possession is complete."
    }
  ];

  const clientPledge = [
    "Responding to buyer queries within one working day via phone, WhatsApp, or email.",
    "Providing quarterly development progress reports that are honest about what has been achieved and what remains.",
    "Disclosing all applicable charges — development fees, transfer fees, possession charges — in writing at the time of booking, with no subsequent additions without proper notice.",
    "Facilitating site visits for any investor who wishes to independently verify development progress.",
    "Processing documentation requests — allotment letters, payment receipts, transfer documents — within stated timelines.",
    "Providing dedicated overseas investor support with remote documentation processes and regular WhatsApp-based progress briefings."
  ];

  const achievements = [
    { milestone: "Plots Booked", figure: "5,000+", detail: "Reflects deep market confidence and active buyer demand across all phases." },
    { milestone: "Phases Launched", figure: "4 Phases", detail: "Demonstrates progressive, sustained development — not a one-phase scheme." },
    { milestone: "Developer Experience", figure: "12+ Years", detail: "Zedem International's cumulative expertise in Pakistani real estate." },
    { milestone: "Legal Status", figure: "100% NOC Verified", detail: "Every plot sold under fully documented CDA-compliant approval." },
    { milestone: "Amenities in Development", figure: "30+", detail: "From parks and mosques to schools, healthcare, and commercial zones." },
    { milestone: "Sister Projects", figure: "Faisal Town (FT)", detail: "Proof of portfolio — a completed, functioning sister society on M-1 Motorway." },
    { milestone: "Investor Geographies", figure: "UAE, UK, KSA, Canada, USA", detail: "Overseas Pakistani investor trust across five international markets." }
  ];

  const teamMembers = [
    {
      role: "Executive Leadership",
      desc: "Under the chairmanship of Chaudhry Abdul Majeed, the executive team sets the strategic direction, maintains regulatory relationships, and ensures that development timelines are met with the discipline that has defined Zedem International's reputation."
    },
    {
      role: "Sales and Investor Relations",
      desc: "Our dedicated sales advisory team handles all buyer inquiries, plot consultations, payment plan presentations, and booking process management. Every advisor is trained to prioritise documentation accuracy and buyer understanding over transaction speed. We take more time to ensure a clean, correctly documented booking than some developers take for the entire process."
    },
    {
      role: "Development and Construction Management",
      desc: "Our on-site development team oversees all ground-level construction activities, vendor coordination, infrastructure delivery, and quality assurance. This team is responsible for translating the master plan from paper into the physical reality that buyers visit and verify."
    },
    {
      role: "Client Services and Documentation",
      desc: "The client services team manages post-booking relationships: allotment letter issuance, instalment reminders and receipts, transfer requests, possession coordination, and ongoing investor communication. This team is the primary point of contact for buyers throughout the life of their investment."
    },
    {
      role: "Overseas Investor Support Desk",
      desc: "A dedicated unit serves our overseas Pakistani investor community with remote documentation support, WhatsApp-based communication, bank transfer guidance, and regular development briefings. This desk operates with an understanding of the time zones, documentation requirements, and communication preferences of investors based outside Pakistan."
    }
  ];

  const faqsList = [
    {
      q: "Who owns and developed Faisal Hills Islamabad?",
      a: "Faisal Hills Islamabad is owned and developed by Zedem International (Pvt) Ltd, under the leadership of its founder and Chairman Chaudhry Abdul Majeed. Zedem International is a multi-project real estate developer based in Pakistan with an active portfolio that includes Faisal Hills and Faisal Town, both located in the Islamabad–Rawalpindi corridor."
    },
    {
      q: "Is Faisal Hills Islamabad a legally approved housing society?",
      a: "Yes. Faisal Hills Islamabad holds CDA (Capital Development Authority) approval and all associated NOC (No Objection Certificate) documentation. It operates within the regulatory framework of both the CDA and the RDA (Rawalpindi Development Authority) for applicable jurisdictional matters. Prospective buyers are encouraged to request and review the official NOC documentation before booking — our team provides this proactively."
    },
    {
      q: "How long has Zedem International been operating in Pakistan?",
      a: "Zedem International has been active in Pakistan’s real estate sector for over a decade, with a development record that includes multiple large-scale projects. The company’s experience spans regulatory approvals, master planning, infrastructure delivery, and community management across the Islamabad–Rawalpindi region."
    },
    {
      q: "Can I invest in Faisal Hills Islamabad from abroad?",
      a: "Yes. Faisal Hills Islamabad is a popular investment choice for overseas Pakistanis from the UAE, UK, Saudi Arabia, Canada, the United States, and other countries. Our overseas investor support desk manages the complete booking process remotely — digital form submission, secure bank transfer guidance, documentation delivery, and regular progress updates via WhatsApp. Many international investors have completed their full investment process without needing to be physically present in Pakistan."
    },
    {
      q: "What is the difference between Faisal Hills and Faisal Town?",
      a: "Faisal Hills Islamabad is located on GT Road near Taxila, approximately 30 minutes from Zero Point Islamabad. Faisal Town is a sister project by Zedem International, located closer to the M-1 Motorway interchange and the new Islamabad International Airport. Both are CDA/RDA-approved developments by the same developer, serving different location preferences and price points within the broader Islamabad–Rawalpindi investment belt."
    },
    {
      q: "How transparent is the Faisal Hills booking process?",
      a: "The Faisal Hills booking process is fully documented and transparent. All applicable charges — booking amount, down payment, instalment schedule, development charges, transfer fees, and possession charges — are disclosed in writing at the time of booking. There are no undisclosed fees or subsequent charges added without prior written notification."
    },
    {
      q: "How can I verify that Faisal Hills development is actually progressing?",
      a: "Site visits can be arranged at any time through our sales and client services team. Buyers are welcome to visit the development, walk the sectors, and inspect infrastructure progress independently. We also provide quarterly development update reports and maintain active WhatsApp communication channels for investors who prefer remote monitoring."
    },
    {
      q: "Is Faisal Hills Islamabad a good investment in 2026?",
      a: "From an investment perspective, Faisal Hills Islamabad combines the four elements that historically drive property value appreciation in Pakistan’s suburban markets: legal standing (CDA-approved with verified NOC), locational demand drivers (GT Road, Islamabad Expressway, M-1 access), active infrastructure delivery (visible, on-the-ground progress), and developer credibility (Zedem International’s verified track record). Property prices have appreciated since the society’s launch, and demand for legally sound Taxila housing societies continues to grow as Islamabad’s suburban population expands. As always, property investment carries risk, and prospective buyers are encouraged to conduct independent due diligence."
    }
  ];

  return (
    <div className="bg-[#fff8f6] min-h-screen text-slate-900 font-sans space-y-12 pb-12 selection:bg-[#7b002c] selection:text-white font-sans">
      
      {/* 1. HERO BANNER */}
      <section className="relative text-white overflow-hidden py-24 lg:py-32 border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70')` }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-slate-900/90 border border-white/20 px-4 py-1.5 rounded-sm backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="label-caps text-xs text-white tracking-widest font-bold">
              About Faisal Hills Islamabad • Zedem International
            </span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-tight">
              Faisal Hills Islamabad Developer
            </h1>
            <p className="text-amber-400 font-serif italic text-xl sm:text-3xl font-light">
              Built on Trust, Delivered with Purpose
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
              Some housing societies are sold on promises. Faisal Hills Islamabad was built on a foundation of something altogether more enduring: documented legal standing, progressive infrastructure delivery, and a developer whose name has meant the same thing for over a decade — <strong className="text-white font-semibold">Zedem International</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-xl transition-all duration-300 hover:scale-[1.02] btn-shimmer active:scale-95 border border-white/20 flex items-center gap-2 cursor-pointer font-sans"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire With Sales Desk</span>
            </button>
            <a
              href="tel:051111324725"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-sm backdrop-blur-md transition-all duration-300 border border-white/20 flex items-center gap-2 font-sans"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Head Office</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTORY BRIEF */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="bg-white rounded-sm border-l-8 border-[#7b002c] border-t border-r border-b border-slate-200/80 shadow-luxury p-8 lg:p-12 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#7b002c]">
              Our Legacy of Transparency & Integrity
            </h2>
            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
              <p>
                This page is your introduction to who we are, where we came from, how we work, and why thousands of investors — from salaried professionals in Islamabad to overseas Pakistanis in Dubai, London, and Toronto — have placed their trust and their capital in Faisal Hills. We believe transparency is not a feature; it is a standard. And we believe a housing society's About page should reflect the same clarity we bring to every property transaction.
              </p>
              <p className="font-medium text-slate-900 border-t border-slate-100 pt-4 font-sans">
                Faisal Hills Islamabad is more than a CDA-approved gated community on GT Road near Taxila. It is the physical expression of a vision — that every Pakistani family and investor deserves access to quality, legal, professionally managed real estate, at a price that respects their earnings and a process that respects their intelligence.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. OUR STORY TIMELINE */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="label-caps text-[#7b002c] tracking-widest font-bold text-xs block">Chronology of Growth</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900">
            Our Story: Vision to GT Road Landmark
          </h2>
          <p className="text-slate-600 text-sm font-sans">
            How Zedem International turned historic Taxila foothills into a premier legal real estate development since 2012.
          </p>
        </div>

        <div className="relative border-l border-brand/20 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12 py-4">
          {timelineMilestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot Icon */}
              <div className="absolute -left-[53px] md:-left-[57px] top-1.5 w-10 h-10 rounded-full bg-white border-2 border-brand flex items-center justify-center text-brand font-serif font-bold text-xs shadow-md transition-all duration-300 group-hover:bg-[#7b002c] group-hover:text-white">
                {idx + 1}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white p-6 rounded-sm border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-luxury hover:border-[#7b002c]/20">
                <div className="lg:col-span-2">
                  <span className="font-serif font-black text-[#7b002c] text-3xl lg:text-4xl block leading-none">
                    {item.year}
                  </span>
                  <span className="text-[10px] label-caps text-slate-400 block mt-1">MILESTONE STAGE</span>
                </div>
                <div className="lg:col-span-10 space-y-2">
                  <h4 className="font-serif font-bold text-lg text-slate-900 group-hover:text-brand transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FOUNDER & CHAIRMAN SPOTLIGHT */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4">
        <ScrollReveal>
          <div className="bg-white rounded-sm border border-slate-200 shadow-luxury p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm rounded-sm overflow-hidden bg-[#091522] border-t-4 border-[#7b002c] shadow-2xl group transition-all duration-500 hover:border-[#7b002c]">
                
                {/* Top Accent Tag */}
                <div className="absolute top-4 left-4 z-20 bg-[#7b002c] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow border border-white/20 font-sans">
                  CHAIRMAN & FOUNDER
                </div>

                {/* Portrait Image */}
                <div className="relative h-[380px] sm:h-[420px] w-full flex items-end justify-center bg-gradient-to-b from-[#091522] via-[#0d1d2d] to-[#091522]">
                  <img
                    src="/chaudhry-abdul-majeed.png"
                    alt="Chaudhry Abdul Majeed - Chairman Faisal Town Group"
                    width={450}
                    height={500}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091522] via-transparent to-transparent opacity-80" />
                </div>

                {/* Bottom Caption */}
                <div className="p-5 bg-[#091522] text-white border-t border-slate-800/80 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block font-sans">Zedem International</span>
                  <h4 className="font-serif font-bold text-xl text-white mt-0.5">Chaudhry Abdul Majeed</h4>
                  <p className="text-slate-400 text-xs mt-1">Visionary Leader & Founder of Faisal Hills</p>
                </div>

              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="label-caps text-[#7b002c] font-bold block tracking-widest text-xs">Our Leadership & Visionary</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                  Our Founder: Chaudhry Abdul Majeed
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed font-sans">
                <p>
                  At the centre of Zedem International’s story is its founder and Chairman, Chaudhry Abdul Majeed. His approach to real estate development is defined by a philosophy rarely articulated openly in Pakistan’s property sector: <strong className="text-slate-900 font-semibold font-sans">that a developer’s primary obligation is not to the transaction, but to the buyer.</strong>
                </p>
                <p>
                  This philosophy has shaped every decision at Faisal Hills — from the choice to pursue CDA approval before sales began, to the commitment to transparent documentation at every stage of the booking process, to the ongoing practice of providing investors with regular, honest updates on development progress regardless of how commercially convenient those updates might be.
                </p>
                <p>
                  Chaudhry Abdul Majeed’s background spans more than a decade of active engagement with Pakistan’s real estate, construction, and infrastructure sectors. Under his leadership, Zedem International has delivered not only Faisal Hills but also the sister project <strong className="text-[#7b002c] font-semibold">Faisal Town</strong> — positioned near the M-1 Motorway and Islamabad International Airport — establishing the group as a multi-project developer with a proven portfolio and a consistent track record of delivering on commitments.
                </p>
              </div>

              <blockquote className="p-5 rounded-sm bg-[#ffe9e6] border-l-4 border-[#7b002c] text-xs leading-relaxed text-slate-800 font-serif italic">
                <p className="font-semibold text-[#7b002c] not-italic label-caps text-[10px] block mb-1">LEADERSHIP STATEMENT</p>
                "He believes that a successful housing project creates a ripple effect — employing local labour, activating local commerce, increasing property values in surrounding areas, and giving hundreds of families the dignity of a legal, documented home. That broader impact is as much a measure of success as any financial metric."
              </blockquote>

            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* 5. VISION & MISSION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Vision card (col-span-5) */}
          <ScrollReveal className="lg:col-span-5 flex">
            <div className="bg-white rounded-sm border border-slate-200 shadow-luxury p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#7b002c]/20 transition-colors w-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-sm bg-[#7b002c] text-white flex items-center justify-center shadow">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] label-caps text-[#7b002c] tracking-widest block">OUR VISION</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
                  Legally Secure & Value Driven
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed font-serif italic bg-slate-50 p-4 rounded-sm border border-slate-100">
                  “To be Pakistan’s most trusted housing society developer — creating legally secure, professionally managed, master-planned communities that deliver genuine, measurable value to every investor and resident we serve.”
                </p>
                <p className="text-slate-600 text-xs leading-relaxed pt-2 font-sans">
                  This vision is not aspirational decoration. It is the standard against which every decision at Faisal Hills Islamabad is measured. When we evaluate a new phase, a revised payment plan, or an infrastructure investment, the question we ask is simple: does this create genuine, measurable value for the people who have trusted us with their money?
                </p>
              </div>
              <p className="text-slate-500 text-[11px] border-t border-slate-100 pt-4 leading-relaxed font-sans">
                Faisal Hills is our contribution to a more credible, more transparent property market.
              </p>
            </div>
          </ScrollReveal>

          {/* Mission card (col-span-7) */}
          <ScrollReveal className="lg:col-span-7 flex">
            <div className="bg-white rounded-sm border border-slate-200 shadow-luxury p-8 sm:p-10 space-y-6 flex flex-col justify-between hover:border-[#7b002c]/20 transition-colors w-full font-sans">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-sm bg-[#7b002c] text-white flex items-center justify-center shadow">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] label-caps text-[#7b002c] tracking-widest block">OUR MISSION</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
                  Accessible Quality & Absolute Transparency
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed font-serif italic bg-slate-50 p-4 rounded-sm border border-slate-100">
                  “To develop, deliver, and manage CDA-approved housing communities that combine location advantage, legal compliance, and world-class infrastructure — making quality real estate accessible to every Pakistani family and investor, with complete transparency from booking to possession.”
                </p>
                
                <div className="pt-2">
                  <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider mb-3">Our Operational Commitments:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {missionCommitments.map((comm, cidx) => (
                      <div key={cidx} className="p-3 bg-slate-50 border border-slate-200/60 rounded-sm">
                        <strong className="text-[#7b002c] text-xs font-bold block font-serif mb-1">{comm.title}</strong>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{comm.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 6. WHY CHOOSE FAISAL HILLS (7 REASONS) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="label-caps text-[#7b002c] tracking-widest font-bold text-xs block">Investment Security</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900">
            Why Choose Faisal Hills: 7 Reasons That Matter
          </h2>
          <p className="text-slate-600 text-sm font-sans">
            Why thousands of families and experienced property buyers place their trust and capital in our development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasonsToChoose.map((reason, idx) => (
            <div key={idx} className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm hover:border-[#7b002c]/20 hover:shadow-luxury card-hover transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#ffe9e6] text-[#7b002c] flex items-center justify-center font-bold text-xs font-serif shrink-0">
                    {idx + 1}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">{reason.title}</h4>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed font-sans">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHAT SETS US APART */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        <div className="bg-[#570000] text-white p-8 lg:p-12 rounded-sm border border-[#7b002c] shadow-luxury space-y-10">
          <div className="space-y-2">
            <span className="label-caps text-amber-400 tracking-widest font-bold text-xs block">Market Differentiators</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              What Sets Faisal Hills Apart
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl font-sans">
              An honest account of what distinguishes Faisal Hills Islamabad from alternatives in the Rawalpindi–Islamabad-Taxila belt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((diff, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-sm backdrop-blur-sm space-y-3 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-sans font-bold text-[10px]">
                    ✓
                  </div>
                  <h4 className="font-serif font-bold text-sm text-amber-400">{diff.title}</h4>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-sans">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUR EXPERTISE */}
      <section className="bg-slate-100 py-16 px-6 lg:px-12 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <span className="label-caps text-[#7b002c] font-bold block text-xs tracking-widest">Our Expertise</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              What We Actually Do Well
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              Zedem International's expertise is not general; it is specific to a clearly defined segment of Pakistan's property market: the development and delivery of legally approved, master-planned residential and commercial housing societies in the Islamabad–Rawalpindi corridor.
            </p>
            <div className="w-24 h-1 bg-[#7b002c] rounded-full" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
            <div className="bg-white p-5 rounded-sm border border-slate-200/80 space-y-2 hover:border-[#7b002c]/20 transition-colors shadow-sm">
              <strong className="text-xs font-bold text-slate-900 block font-serif">Regulatory Navigation</strong>
              <span className="text-[11px] text-slate-600 block leading-relaxed">Securing and maintaining CDA/RDA approvals across multi-phase projects with evolving regulatory requirements.</span>
            </div>
            <div className="bg-white p-5 rounded-sm border border-slate-200/80 space-y-2 hover:border-[#7b002c]/20 transition-colors shadow-sm">
              <strong className="text-xs font-bold text-slate-900 block font-serif">Master Planning & Design</strong>
              <span className="text-[11px] text-slate-600 block leading-relaxed">Collaborating with qualified planners and architects to balance sector layouts, green space, circulation, and commercial utility.</span>
            </div>
            <div className="bg-white p-5 rounded-sm border border-slate-200/80 space-y-2 hover:border-[#7b002c]/20 transition-colors shadow-sm">
              <strong className="text-xs font-bold text-slate-900 block font-serif">Infrastructure Delivery</strong>
              <span className="text-[11px] text-slate-600 block leading-relaxed">Managing ground-level execution of carpeted roads, utility lines, security checkpoints, and common green zones.</span>
            </div>
            <div className="bg-white p-5 rounded-sm border border-slate-200/80 space-y-2 hover:border-[#7b002c]/20 transition-colors shadow-sm">
              <strong className="text-xs font-bold text-slate-900 block font-serif">Community Management</strong>
              <span className="text-[11px] text-slate-600 block leading-relaxed">Planning the transition from construction site to functional gated society, including security, utility distribution, and maintenance services.</span>
            </div>
          </div>

        </div>
      </section>

      {/* 9. WHO WE SERVE */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="label-caps text-[#7b002c] tracking-widest font-bold text-xs block">Target Demographics</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900">
            Who We Serve: Our Investor & Buyer Community
          </h2>
          <p className="text-slate-600 text-sm font-sans">
            Faisal Hills Islamabad is built around the financial goals and timelines of diverse property buyers.
          </p>
        </div>

        {/* Tab-styled Selector Interface for Profiles */}
        <div className="bg-white rounded-sm border border-slate-200/80 shadow-luxury overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Tab Titles */}
          <div className="lg:col-span-4 border-r border-slate-200 bg-slate-50 flex flex-col divide-y divide-slate-200">
            {buyerProfiles.map((profile, index) => (
              <button
                key={index}
                onClick={() => setSelectedProfile(index)}
                className={`w-full text-left p-6 font-serif font-bold text-sm transition-colors flex items-center justify-between ${selectedProfile === index ? 'bg-white text-[#7b002c] border-l-4 border-l-[#7b002c]' : 'text-slate-700 hover:bg-slate-100/50'}`}
              >
                <span>{profile.title}</span>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${selectedProfile === index ? 'translate-x-1 text-[#7b002c]' : 'text-slate-400'}`} />
              </button>
            ))}
          </div>

          {/* Tab Content Panel */}
          <div className="lg:col-span-8 p-8 lg:p-12 flex flex-col justify-center space-y-4">
            <h3 className="font-serif font-bold text-2xl text-[#7b002c] flex items-center gap-3">
              <Users className="w-6 h-6 text-[#7b002c]" />
              <span>{buyerProfiles[selectedProfile].title}</span>
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
              {buyerProfiles[selectedProfile].desc}
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setIsLeadModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7b002c] hover:text-[#9e1245] transition-colors font-sans"
              >
                <span>Consult on this Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. OUR PROCESS - CLIENT JOURNEY */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="label-caps text-[#7b002c] tracking-widest font-bold text-xs block">Step-By-Step Journey</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900">
            Our Working Process
          </h2>
          <p className="text-slate-600 text-sm font-sans">
            We have designed the Faisal Hills client journey to eliminate uncertainty at every single milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
          {processSteps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#7b002c]/20 hover:shadow-luxury transition-all duration-300">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-serif font-black text-[#7b002c]/20 text-3xl block leading-none">{step.num}</span>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-sm font-sans">STEP</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-slate-900 min-h-[36px]">{step.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed font-sans">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. CORE VALUES */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="label-caps text-[#7b002c] tracking-widest font-bold text-xs block">Corporate Code</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900">
            Our Core Values
          </h2>
          <p className="text-slate-600 text-sm font-sans">
            The fundamental operational pillars that guide every client interaction and land development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, idx) => (
            <div key={idx} className="bg-white p-6 rounded-sm border border-slate-200/80 shadow-sm flex items-start gap-4 hover:border-[#7b002c]/20 transition-colors">
              <Check className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-slate-900">{value.title}</h4>
                <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-sans">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. OUR COMMITMENT TO CLIENTS */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="bg-white rounded-sm border border-slate-200/80 shadow-luxury p-8 lg:p-12 space-y-8">
            <div className="border-b border-slate-100 pb-5 space-y-2">
              <span className="label-caps text-[#7b002c] tracking-widest font-bold text-xs block flex items-center gap-2">
                <PledgeIcon className="w-4 h-4 text-[#7b002c]" />
                <span>Our Corporate Promise</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                Our Commitment to Clients: Beyond the Transaction
              </h2>
              <p className="text-slate-600 text-sm max-w-3xl leading-relaxed font-sans">
                The real estate industry in Pakistan has a well-documented trust deficit. Developers make commitments they do not keep, documentation is incomplete, and communication disappears after booking. Faisal Hills was built to directly counter that pattern.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {clientPledge.map((pledge, idx) => (
                <div key={idx} className="flex gap-3 bg-slate-50 p-5 rounded-sm border border-slate-200/60 hover:bg-[#ffe9e6]/25 transition-all">
                  <div className="w-6 h-6 rounded-full bg-[#7b002c]/10 text-[#7b002c] font-sans font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed font-sans">{pledge}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#ffe9e6] rounded-sm p-5 border-l-4 border-[#7b002c] text-xs text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans">
              <div>
                <strong className="text-[#7b002c] font-serif text-sm block mb-1">Our Transparency Guarantee</strong>
                We measure success not by plots sold, but by investors who refer others because they received exactly what they were promised.
              </div>
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="shrink-0 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all"
              >
                Inquire Proactively
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 13. Achievements & Milestones */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
        <div className="space-y-2 border-b border-slate-200 pb-5">
          <span className="label-caps text-[#7b002c] tracking-widest font-bold text-xs block">Track Record Data</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900">
            Our Achievements: A Track Record You Can Verify
          </h2>
          <p className="text-slate-600 text-sm font-sans">
            Verifiable data and infrastructure figures illustrating Zedem International's housing delivery performance.
          </p>
        </div>

        <div className="bg-white rounded-sm border border-slate-200 shadow-luxury overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#570000] text-white uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="p-5 font-sans border-r border-[#7b002c]">Milestone Metric</th>
                  <th className="p-5 font-sans border-r border-[#7b002c]">Figure / Status</th>
                  <th className="p-5 font-sans">What It Means for Investors & Buyers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {achievements.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-5 font-bold text-[#7b002c] border-r border-slate-100">{item.milestone}</td>
                    <td className="p-5 font-serif font-bold text-slate-900 border-r border-slate-100 text-sm">{item.figure}</td>
                    <td className="p-5 text-slate-600 leading-relaxed font-sans">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 14. MEET OUR TEAM */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="label-caps text-[#7b002c] tracking-widest font-bold text-xs block flex justify-center items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#7b002c]" />
            <span>Human Assets</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900">
            Meet Our Team: The People Behind the Project
          </h2>
          <p className="text-slate-600 text-sm font-sans">
            Behind every plot allocation, utility connection, and document is a dedicated team of professionals who take buyer commitment personally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white p-6 rounded-sm border border-slate-200/80 shadow-sm hover:border-[#7b002c]/20 hover:shadow-luxury transition-all duration-300 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] label-caps text-amber-500 block">0{idx + 1} — DEPARTMENT DIVISION</span>
                <h4 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
                  {member.role}
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed font-sans pt-1">
                  {member.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 15. FAQ ACCORDION SECTION */}
      <section className="max-w-[900px] mx-auto px-6 lg:px-12 space-y-10">
        <div className="text-center space-y-2">
          <span className="label-caps text-[#7b002c] tracking-widest font-bold text-xs block">PAA / Featured Snippets</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm font-sans">
            Optimized answers aligned directly to Google's search algorithms and PAA query clusters.
          </p>
        </div>

        <div className="space-y-4 font-sans">
          {faqsList.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-sm border border-slate-200 overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 flex items-center justify-between text-left gap-4 font-serif font-bold text-sm text-slate-900 hover:text-[#7b002c] transition-colors"
                >
                  <span>{faq.q}</span>
                  <HelpCircle className={`w-4 h-4 shrink-0 transition-transform duration-300 text-[#7b002c] ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 max-h-0 ${isOpen ? 'max-h-96 border-t border-slate-100 p-5 bg-slate-50/50' : ''}`}>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 16. CALL TO ACTION BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 font-sans">
        <div className="rounded-sm bg-[#4c050d] text-white p-10 lg:p-16 border border-[#7b002c] shadow-2xl flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
          {/* Subtle Decorative Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,0,44,0.15),transparent)] opacity-100 pointer-events-none" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block label-caps">Start Your Investment Journey</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-white font-serif">
              Speak with the Faisal Hills Team Today
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Whether you are a first-time buyer trying to understand the booking process, a seasoned investor evaluating commercial plot options, or an overseas Pakistani looking for a reliable remote investment pathway, our team is ready to have an honest, no-pressure conversation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 relative z-10">
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="px-8 py-3.5 bg-white text-[#7b002c] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-sm shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#7b002c]" />
              <span>BOOK INSTANT CONSULTATION</span>
            </button>

            <a
              href="tel:051111324725"
              className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-white/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>CALL HEAD OFFICE</span>
            </a>
          </div>

          <div className="text-[10px] text-slate-400 font-mono tracking-widest pt-4 uppercase relative z-10 flex flex-wrap justify-center gap-6">
            <Link href="/plots" className="hover:text-amber-400 transition-colors">→ Plots for sale</Link>
            <Link href="/payment-plan" className="hover:text-amber-400 transition-colors">→ Download Payment Plan PDF</Link>
            <span>→ Website: faisalhillsislamabadfh.com</span>
          </div>
        </div>
      </section>

      {/* Booking Lead Modal */}
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />

      {/* Dynamic Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

    </div>
  );
}
