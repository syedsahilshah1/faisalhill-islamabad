'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { plotInventoryData, PlotItem, fetchPlots } from '@/data/faisalHillsData';
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
  Fuel,
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
  Maximize2
} from 'lucide-react';
import MapDownloadModal from '@/components/ui/MapDownloadModal';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { DynamicPlotSeriesExplorer } from '@/components/plots/DynamicPlotSeriesExplorer';

interface PlotPriceRow {
  size: string;
  dimension: string;
  price: string;
  category: string;
  suitability: string;
  features: string[];
  demandRange: string;
}

const residentialPlotDetails: PlotPriceRow[] = [
  {
    size: '5 Marla',
    dimension: '25 × 50 (139 Sq. Yds)',
    price: 'PKR 65 Lac – 90 Lac',
    category: 'Residential',
    suitability: 'First-time buyers, compact luxury villas, smart investors',
    features: ['Immediate Construction', 'Underground Electricity', 'Near Roots School & Park'],
    demandRange: 'High Demand (Fast Moving)'
  },
  {
    size: '8 Marla',
    dimension: '30 × 60 (200 Sq. Yds)',
    price: 'PKR 1.05 Cr – 1.20 Cr',
    category: 'Residential',
    suitability: 'Growing families wanting extra living space & double unit designs',
    features: ['Wide Street Access', 'Park Facing Options', 'Immediate Possession'],
    demandRange: 'Moderate-High Demand'
  },
  {
    size: '10 Marla',
    dimension: '35 × 70 (272 Sq. Yds)',
    price: 'PKR 1.20 Cr – 1.50 Cr',
    category: 'Residential',
    suitability: 'Large families, executive living near parks, schools and mosques',
    features: ['Near Jamia Masjid', 'Spacious Frontage', 'High Rental Yield Potential'],
    demandRange: 'Top Choice for Builders'
  },
  {
    size: '14 Marla',
    dimension: '40 × 80 (355 Sq. Yds)',
    price: 'PKR 1.45 Cr – 1.85 Cr',
    category: 'Residential',
    suitability: 'Premium residential villas, prime corner units & executive residences',
    features: ['40ft Wide Frontage', 'Boulevard Proximity', 'Exclusive Street Enclave'],
    demandRange: 'Limited Availability'
  },
  {
    size: '1 Kanal',
    dimension: '50 × 90 (500 Sq. Yds)',
    price: 'PKR 1.80 Cr – 2.90 Cr',
    category: 'Luxury Residential',
    suitability: 'Spacious mansions, luxury villas & maximum long-term capital appreciation',
    features: ['Margalla View Options', '50ft Frontage', 'Highest Capital Growth Velocity'],
    demandRange: 'Flagship Luxury Tier'
  },
];

const commercialPlotDetails = [
  { size: '30 × 25', dimension: '2.5 Marla Plaza', price: 'Market On-Call', suitability: 'Boutique retail, pharmacy, fast-food takeaway', frontage: 'Executive Commercial Strip' },
  { size: '30 × 30', dimension: '3.3 Marla Plaza', price: 'Market On-Call', suitability: 'Corner retail plaza, designer outlets & clinics', frontage: 'Civic Center Retail Strip' },
  { size: '40 × 40', dimension: '5.8 Marla Plaza', price: 'Market On-Call', suitability: 'Multi-brand retail showroom, corporate office', frontage: 'Near Faisal Jewel & School' },
  { size: '45 × 50', dimension: '8.0 Marla Plaza', price: 'Market On-Call', suitability: 'Corporate regional headquarters, bank branches', frontage: '225ft Main Boulevard' },
  { size: '50 × 50', dimension: '9.2 Marla Plaza', price: 'Market On-Call', suitability: 'Commercial banking plazas, luxury dining towers', frontage: 'Prime Boulevard Corner' },
  { size: '65 × 50', dimension: '12.0 Marla Plaza', price: 'Market On-Call', suitability: 'Megastructure commercial mall, multi-storey suites', frontage: 'Grand Entrance Axis' },
];

const travelTimes = [
  { destination: 'Taxila Bypass', time: '2 mins', distance: '1.2 km', note: 'Direct GT Road exit' },
  { destination: 'Multi Gardens B-17', time: '5 mins', distance: '4.5 km', note: 'Direct inter-city road link' },
  { destination: 'HITEC University Taxila', time: '9 mins', distance: '6.0 km', note: 'Premier engineering campus' },
  { destination: 'Taxila Cantt', time: '10 mins', distance: '7.5 km', note: 'Administrative cantonment zone' },
  { destination: 'Taxila Museum', time: '12 mins', distance: '8.2 km', note: 'World heritage landmark' },
  { destination: 'AWT-Sangjani Toll Plaza (M-1)', time: '20 mins', distance: '14 km', note: 'Direct M-1 connection' },
  { destination: 'Central Islamabad (Blue Area)', time: '25 mins', distance: '24 km', note: 'Via Margalla Ave & N-5' },
  { destination: 'Islamabad International Airport', time: '35 mins', distance: '32 km', note: 'Via Airport Cargo & M-1' },
  { destination: 'Saddar, Rawalpindi', time: '40 mins', distance: '28 km', note: 'Via N-5 National Highway' },
];

const nearbyLandmarks = [
  'Taxila Bypass',
  'HITEC University, Taxila',
  'Multi Gardens B-17',
  'Sangjani, Islamabad',
  'Tarnol',
  'Faisal Town Phase 1',
  'Margalla Avenue',
  'Taxila City'
];

const galleryItems = [
  {
    title: 'Faisal Jewel 27-Storey High-Rise',
    category: 'jewel',
    tag: 'Architectural Megastructure',
    image: '/faisal-jewel-1.png',
    desc: 'The skyline centerpiece of Executive Block featuring retail shopping, luxury suites, and a five-star hotel.'
  },
  {
    title: 'Faisal Jewel Architectural Sketch & Blueprint',
    category: 'jewel',
    tag: 'Master Engineering Sketch',
    image: '/faisal-jewel-sketch.jpg',
    desc: 'Original conceptual sketch and structural blueprint of the landmark tower.'
  },
  {
    title: 'Faisal Jewel Commercial & Shopping Mall',
    category: 'jewel',
    tag: 'Commercial Mall',
    image: '/images/imgi_175_faisal-jewel.jpg',
    desc: 'Spacious retail floors and high-traffic commercial frontage designed for multinational brands.'
  },
  {
    title: 'Executive Grand Entrance Arch',
    category: 'infrastructure',
    tag: 'Entrance Gateway',
    image: '/faisalhillarc.jpg',
    desc: 'The iconic monument gateway welcoming residents and visitors into the 225ft wide Main Boulevard.'
  },
  {
    title: 'Roots International School Campus',
    category: 'infrastructure',
    tag: 'Operational Education',
    image: '/images/faisal-roots-school.jpg',
    desc: 'Fully operational school campus delivering an internationally benchmarked curriculum inside the block.'
  },
  {
    title: 'Executive Community Parks & Recreation',
    category: 'infrastructure',
    tag: 'Parks & Recreation',
    image: '/images/faisal-park.jpg',
    desc: 'Lush green landscaped parkways, walking tracks and family seating enclaves.'
  },
  {
    title: 'Executive Block On-Ground Aerial View',
    category: 'infrastructure',
    tag: 'Aerial Overview',
    image: '/images/faisalhillexecutive.webp',
    desc: 'Expansive on-ground aerial overview of developed residential sectors and wide carpeted roads.'
  },
  {
    title: 'Miyawaki Forest & Urban Greenery',
    category: 'infrastructure',
    tag: 'Eco Reserve',
    image: '/images/faisal-forest.jpg',
    desc: 'Dense Miyawaki urban forest providing fresh air and a scenic natural setting.'
  }
];

const seoFaqs = [
  {
    q: 'Is Faisal Hills Executive Block in Islamabad or Rawalpindi?',
    a: 'Faisal Hills sits on the main GT Road, just a few minutes from B-17 Islamabad, but it technically falls under the jurisdiction of the Rawalpindi Development Authority (RDA).'
  },
  {
    q: 'Is the Faisal Hills Executive Block NOC approved?',
    a: 'Yes. The Executive Block has NOC approval from the RDA, meaning the development complies with regional housing regulations as an RDA approved housing society. We’d still recommend confirming the latest status directly with RDA before making a purchase.'
  },
  {
    q: 'What plot sizes are available for sale in Faisal Hills Executive Block?',
    a: 'Residential plots come in 5, 8, 10 and 14 Marla, plus 1 Kanal. Commercial plots are available in sizes ranging from 30×25 up to 65×50.'
  },
  {
    q: 'What is the current Faisal Hills Executive Block payment plan?',
    a: 'Terms vary by sector — some plots are sold on a resale, full-cash basis, while others may be available under an instalment plan with a down payment and quarterly payments, sometimes with a discount for lump-sum payment. Contact our team for the latest details on a specific plot.'
  },
  {
    q: 'What is the development status of Faisal Hills Executive Block?',
    a: 'The main boulevard, roads, sewerage and underground electricity are largely complete. Roots International School is operational, and construction on the Faisal Jewel project is progressing steadily.'
  },
  {
    q: 'Is Faisal Hills Executive Block a good investment?',
    a: 'Its GT Road location, RDA approval and ongoing development make it an appealing option for both end-users and investors — though, as with any real estate investment, returns aren’t guaranteed and depend on market conditions.'
  },
  {
    q: 'Where can I find the Faisal Hills Executive Block map?',
    a: 'You can request the latest master plan and zoning map directly from our team — we can also point out which sectors are closest to GT Road and which are quieter residential pockets.'
  }
];

export default function ExecutiveBlockContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [activePlotTab, setActivePlotTab] = useState<'residential' | 'commercial'>('residential');
  const [selectedResPlotIndex, setSelectedResPlotIndex] = useState(0);
  const [selectedComPlotIndex, setSelectedComPlotIndex] = useState(0);

  // Gallery state
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'jewel' | 'infrastructure'>('all');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<typeof galleryItems[0] | null>(null);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [isMasterPlanExpanded, setIsMasterPlanExpanded] = useState(false);
  const [isDevStatusExpanded, setIsDevStatusExpanded] = useState(false);

  // Dynamic plot inventory sync from Laravel Backend Dashboard / LocalStorage
  const [allPlots, setAllPlots] = useState<PlotItem[]>(plotInventoryData);

  useEffect(() => {
    fetchPlots().then(data => setAllPlots(data)).catch(console.error);

    const handleSync = () => {
      fetchPlots().then(data => setAllPlots(data)).catch(console.error);
    };
    window.addEventListener('faisal_plots_updated', handleSync);
    return () => window.removeEventListener('faisal_plots_updated', handleSync);
  }, []);

  const executivePlots = useMemo(() => {
    const filtered = allPlots.filter(
      p => p.blockSlug === 'executive-block' || p.blockName.toLowerCase().includes('executive')
    );
    if (filtered.length >= 8) return filtered.slice(0, 8);
    const fallback = plotInventoryData.filter(
      p => p.blockSlug === 'executive-block' || p.blockName.toLowerCase().includes('executive')
    );
    const combined = [...filtered];
    fallback.forEach(fb => {
      if (!combined.some(c => c.id === fb.id || c.plotNumber === fb.plotNumber)) {
        combined.push(fb);
      }
    });
    return combined.slice(0, 8);
  }, [allPlots]);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadPlot, setLeadPlot] = useState('5 Marla (25x50)');
  const [leadNote, setLeadNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedResPlot = residentialPlotDetails[selectedResPlotIndex];
  const selectedComPlot = commercialPlotDetails[selectedComPlotIndex];

  const filteredGallery = galleryItems.filter((item) => {
    if (galleryFilter === 'all') return true;
    return item.category === galleryFilter;
  });

  // Schema objects for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: seoFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://faisalhillsislamabadfh.com' },
      { '@type': 'ListItem', position: 2, name: 'Faisal Hills Blocks', item: 'https://faisalhillsislamabadfh.com/faisal-hills-blocks' },
      { '@type': 'ListItem', position: 3, name: 'Executive Block', item: 'https://faisalhillsislamabadfh.com/blocks/executive-block' }
    ]
  };

  const realEstateSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: 'Faisal Hills Executive Block Plots & Real Estate',
    description: 'RDA-approved residential and commercial plots in Faisal Hills Executive Block on Main GT Road N-5.',
    url: 'https://faisalhillsislamabadfh.com/blocks/executive-block',
    geo: { '@type': 'GeoCoordinates', latitude: '33.7431', longitude: '72.8258' }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Faisal Hills Official Advisory Portal',
    url: 'https://faisalhillsislamabadfh.com',
    logo: 'https://faisalhillsislamabadfh.com/images/logo.png',
    telephone: '+92 304 4811 717',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92 304 4811 717',
      contactType: 'Sales & Customer Facilitation',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu']
    }
  };

  return (
    <div className="space-y-12 lg:space-y-16 pt-2 font-sans text-slate-800">

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* ========================================================= */}
      {/* 2. EXECUTIVE BLOCK COMPREHENSIVE OVERVIEW CONTAINER        */}
      {/* ========================================================= */}
      <section className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm">
        {/* 2-Column Grid: Left Narrative + Right Height-Matched Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* Left Column: Title, Narrative, See More Toggle & Jump Chips Div */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Civic & Commercial Center • Sector Masterplan</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                  Executive Block Overview
                </h1>
              </div>

              <p className="font-semibold text-slate-900 text-base sm:text-lg leading-relaxed">
                If you’ve been comparing housing options along Islamabad’s main GT Road, chances are Faisal Hills Executive Block has come up more than once. It sits right at the entrance of Faisal Hills, on the main G.T. Road (N-5), and acts as the civic and commercial center for the entire society.
              </p>

              <p>
                Faisal Hills Executive Block is the primary commercial and civic hub of Faisal Hills, positioned at the society’s main entrance on G.T. Road. It’s home to some of the project’s most prestigious landmarks — including the 27-storey <Link href="/blocks/faisal-jewel-islamabad" className="text-[#7b002c] font-bold hover:underline">Faisal Jewel Tower</Link>, Faisal Mansion, and the fully operational Roots International School Campus.
              </p>

              {isOverviewExpanded && (
                <div className="space-y-4 animate-fadeIn">
                  <p>
                    What sets the Executive Block apart from the more purely residential sectors of Faisal Hills is its dual identity. On one hand, it’s a modern residential community with houses, parks and mosques going up across multiple sectors. On the other, its status as the civic and commercial center means shops, offices, a school and a hotel-and-apartment tower are all part of the same masterplan — giving it both lifestyle appeal and genuine commercial investment opportunity.
                  </p>

                  <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-50/90 via-rose-50/50 to-amber-50/60 rounded-2xl border border-rose-200/80 text-xs sm:text-sm text-slate-800 font-medium flex items-start gap-3.5 shadow-2xs">
                    <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                    <span>
                      <strong>Key Takeaway:</strong> For end-users, that combination translates into a residential and commercial layout where daily errands, schooling and worship are all within a short drive. For investors, an active commercial core anchors surrounding plot values with verified high ROI.
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                  className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#7b002c] hover:text-[#9e1245] bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200/80 transition cursor-pointer"
                >
                  <span>{isOverviewExpanded ? 'See Less' : 'See More Overview Details'}</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isOverviewExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Directory Jump Chips Div below Overview Text */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="#location"
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] text-xs font-bold transition-all shadow-xs"
                >
                  📍 Location & Access
                </a>
                <a
                  href="#master-plan"
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] text-xs font-bold transition-all shadow-xs"
                >
                  🗺️ Master Plan & Map
                </a>
                <a
                  href="#plots-inventory"
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] text-xs font-bold transition-all shadow-xs"
                >
                  🏷️ Available Plots
                </a>
                <a
                  href="#faisal-jewel"
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] text-xs font-bold transition-all shadow-xs"
                >
                  🏢 Faisal Jewel Tower
                </a>
                <a
                  href="#egallery"
                  className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-[#7b002c] text-slate-700 hover:text-white border border-slate-200 hover:border-[#7b002c] text-xs font-bold transition-all shadow-xs"
                >
                  📸 Visual eGallery
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Overview Image Matching Height of Overview Container */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 group flex-1">
              <img
                src="/images/faisalhillarc.jpg"
                alt="Faisal Hills Executive Block Main Monument Entrance & Overview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300 bg-rose-950/70 px-2.5 py-0.5 rounded-full border border-rose-800/70 inline-block backdrop-blur-xs">
                  Executive Sector Landmark
                </span>
                <h4 className="font-serif font-bold text-base sm:text-lg leading-snug drop-shadow-md text-white">
                  Grand Monument Entrance & 225ft Boulevard
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2">
                  Direct access on Main GT Road (N-5) with 24/7 illuminated security entrance.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DEDICATED EGALLERY & PHOTO SHOWCASE (NEW)               */}
      {/* ========================================================= */}
      <section id="egallery" className="scroll-mt-28 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Visual Showcase</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Executive Block eGallery & On-Ground Views
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Explore high-resolution architectural renders of Faisal Jewel, monument arch gateways, and operational infrastructure:
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setGalleryFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${galleryFilter === 'all'
                ? 'bg-[#7b002c] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              All Views ({galleryItems.length})
            </button>
            <button
              onClick={() => setGalleryFilter('jewel')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${galleryFilter === 'jewel'
                ? 'bg-[#7b002c] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              Faisal Jewel (3)
            </button>
            <button
              onClick={() => setGalleryFilter('infrastructure')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${galleryFilter === 'infrastructure'
                ? 'bg-[#7b002c] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              Infrastructure & Parks (3)
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedGalleryImage(item)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-sm hover:shadow-xl hover:border-[#7b002c]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#7b002c] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <div className="p-4 bg-white space-y-1">
                <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-[#7b002c] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. INTERACTIVE PLOT SIZE & DYNAMIC SERIES EXPLORER        */}
      {/* ========================================================= */}
      <section id="pricing-matrix" className="scroll-mt-28">
        <ScrollReveal direction="up" delay={80}>
          <DynamicPlotSeriesExplorer blockSlug="executive-block" blockName="Executive Block" />
        </ScrollReveal>
      </section>


      {/* ========================================================= */}
      {/* 8. LOCATION & MAP + GOOGLE MAP EMBED (2-COLUMN LAYOUT)   */}
      {/* ========================================================= */}
      <section id="location" className="scroll-mt-28 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Content & Accessibility */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>N-5 GT Road Frontage</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                Faisal Hills Executive Block Location & Map
              </h2>
              <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
                <p>
                  The Faisal Hills Executive Block location is one of its strongest selling points. Positioned directly off the main G.T. Road (N-5) near the society’s grand entrance, the block has the kind of road frontage that few housing schemes along this corridor can match. If you pull up the Faisal Hills Executive Block map, you’ll notice it sits right beside <Link href="/blocks/block-a" className="text-[#7b002c] font-bold hover:underline">Faisal Hills Block A</Link> and just a short drive from Taxila and Multi Gardens B-17 — placing it firmly in what locals refer to as Zone 2, Islamabad.
                </p>
                <p>
                  For families relocating from Rawalpindi or Islamabad, or for overseas Pakistanis comparing options before a visit, the GT Road frontage means the block is easy to find and easy to reach — even on a first visit using GPS navigation.
                </p>
              </div>
            </div>

            {/* Accessibility and Travel Times */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7b002c]" />
                <span>Accessibility & Travel Times</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {travelTimes.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1 hover:border-[#7b002c]/40 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{item.destination}</span>
                      <span className="px-2 py-0.5 bg-rose-50 text-[#7b002c] font-bold text-[10px] rounded-full border border-rose-100">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span>{item.distance}</span>
                      <span className="text-slate-400 italic">{item.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Google Map Embed */}
          <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-28">
            <div className="flex items-center justify-between gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <div className="space-y-0.5">
                <strong className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7b002c]" />
                  <span>Live GPS Pin Location</span>
                </strong>
                <span className="text-[11px] text-slate-500 block">Main GT Road (N-5), Taxila</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Faisal+Hills+Executive+Block+Taxila"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[11px] font-bold rounded-xl shadow-xs transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <Navigation className="w-3 h-3" />
                <span>Open Map</span>
                <ExternalLink className="w-2.5 h-2.5 text-white/80" />
              </a>
            </div>

            <div className="relative w-full h-[380px] sm:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <iframe
                title="Faisal Hills Executive Block Exact Location Google Map"
                src="https://maps.google.com/maps?q=Faisal+Hills+Executive+Block+GT+Road+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. MASTER PLAN SECTION (UNBOXED 2-COLUMN LAYOUT)          */}
      {/* ========================================================= */}
      <section id="master-plan" className="scroll-mt-28 space-y-6 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column: High-Resolution Map Container */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              onClick={() => setIsMapModalOpen(true)}
              className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-950 group shadow-lg cursor-pointer flex flex-col justify-center min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] p-2"
            >
              <img
                src="/images/faisalexecutivemap.png"
                alt="Faisal Hills Executive Block Master Plan Map"
                className="w-full h-auto max-h-[520px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-4 py-2 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-md flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#7b002c]" />
                  <span>Click to Enlarge & Download</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Narrative, See More Toggle & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Zoning Blueprint • Sector Masterplan</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  Faisal Hills Executive Block Master Plan
                </h2>
              </div>

              <p className="font-medium text-slate-900 text-sm sm:text-base leading-relaxed">
                The master plan for the Executive Block was designed with one goal in mind: residents shouldn’t have to leave the block for their everyday needs. It’s a genuinely master planned development — residential sectors sit alongside dedicated commercial zones, with Faisal Jewel, the Roots International School Campus and other mixed-use projects woven directly into the layout.
              </p>

              {isMasterPlanExpanded && (
                <div className="space-y-3 animate-fadeIn">
                  <p>
                    The plan also sets aside space for a wide main boulevard (reported at around 250 feet across at its widest point), along with mosques, a cricket ground and parks distributed across the block.
                  </p>
                  <p>
                    Compared with some of the older, purely residential sectors of Faisal Hills, the Executive Block was clearly planned with higher-density commercial use in mind — which is part of why it carries the “civic and commercial center” label for the whole society, and why its residential and commercial sectors work well alongside each other rather than competing for space.
                  </p>
                </div>
              )}

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsMasterPlanExpanded(!isMasterPlanExpanded)}
                  className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#7b002c] hover:text-[#9e1245] bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200/80 transition cursor-pointer"
                >
                  <span>{isMasterPlanExpanded ? 'See Less' : 'See More Master Plan Details'}</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isMasterPlanExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsMapModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Master Plan (PDF)</span>
              </button>
              <Link
                href="/master-plan"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-300 transition-all hover:scale-105"
              >
                <Compass className="w-4 h-4 text-[#7b002c]" />
                <span>Explore Full Society Map</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. FEATURED AVAILABLE PLOTS SHOWCASE                     */}
      {/* ========================================================= */}
      <section id="plots-inventory" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider block">Verified Available Listings</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">Featured On-Ground Executive Plots</h2>
          </div>
          <Link
            href="/plots"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#7b002c] hover:underline"
          >
            <span>View All Plots Inventory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 8 Executive Plot Cards Grid (4 in a row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {executivePlots.slice(0, 8).map((plot, idx) => (
            <ScrollReveal key={plot.id} direction="up" delay={(idx % 4) * 100}>
              <div
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm card-hover hover-glow-maroon overflow-hidden flex flex-col justify-between group transition-all duration-300 h-full"
              >
                <div>
                  {/* Image Banner Container -> Redirects to /plots with pre-filtered size */}
                  <Link
                    href={`/plots?size=${encodeURIComponent(plot.size)}`}
                    className="relative h-44 w-full overflow-hidden bg-slate-900 img-zoom-container block cursor-pointer"
                  >
                    <img
                      src={plot.image}
                      alt={plot.plotNumber}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full shadow bg-[#7b002c] text-white border border-white/20">
                        {plot.category === 'Apartment' ? 'Luxury Flat' : plot.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-[#7b002c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow border border-white/20">
                        {plot.status}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="label-caps text-[9px] text-slate-300 block">{plot.blockName}</span>
                      <h4 className="font-serif font-bold text-xl group-hover:text-slate-200 transition-colors">#{plot.plotNumber}</h4>
                    </div>
                  </Link>

                  <div className="p-5 space-y-3">
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Property Type:</span>
                        <Link
                          href={`/plots?size=${encodeURIComponent(plot.size)}`}
                          className="text-slate-900 font-bold hover:text-[#7b002c] hover:underline"
                        >
                          {plot.size}
                        </Link>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Dimensions:</span>
                        <strong className="text-slate-900 font-semibold">{plot.dimensions}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Orientation:</span>
                        <strong className="text-slate-900 font-semibold">{plot.facing}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Demand Price</span>
                    <span className="font-serif font-bold text-lg text-[#7b002c]">{plot.priceFormatted}</span>
                  </div>

                  <Link
                    href={`/plots/${plot.id}`}
                    className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. FACILITIES AND AMENITIES                              */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Trees className="w-3.5 h-3.5" />
            <span>Master Amenities</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Facilities and Amenities in Faisal Hills Executive Block
          </h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            Faisal Hills Executive Block facilities cover most of what a modern residential community needs day to day:
          </p>
        </div>

        {/* 8 Facilities & Amenities Cards with Real Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Civic Hub */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/faisalhillarc.jpg"
                  alt="Civic Hub & Monument Entrance"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#7b002c] flex items-center justify-center shadow">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">Sector Core</span>
                  <strong className="text-sm font-serif font-bold text-white block">Civic Hub</strong>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  The central business, commercial, and community gathering core for the entire society.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Roots International School */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/faisal-roots-school.jpg"
                  alt="Roots International School Campus Faisal Hills"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#7b002c] flex items-center justify-center shadow">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">Operational</span>
                  <strong className="text-sm font-serif font-bold text-white block">Roots International School</strong>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  An internationally benchmarked campus, fully operational for quality education.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Faisal Jewel */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/faisal-jewel.jpg"
                  alt="Faisal Jewel Landmark Tower"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#7b002c] flex items-center justify-center shadow">
                  <Landmark className="w-4 h-4" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">27-Storey Icon</span>
                  <strong className="text-sm font-serif font-bold text-white block">Faisal Jewel Tower</strong>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  A landmark high-rise combining residences, shopping mall floors, and a luxury hotel.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Three Mosques */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/imgi_46_Mosques.webp"
                  alt="Jamia Masjid Fatima Tuz Zahra"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#7b002c] flex items-center justify-center shadow">
                  <Building className="w-4 h-4" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">Spiritual Centers</span>
                  <strong className="text-sm font-serif font-bold text-white block">Three Jamia Mosques</strong>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Including Jamia Masjid Fatima Tuz Zahra for daily prayers and community gatherings.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Two Parks & Play Areas */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/faisal-park.jpg"
                  alt="Parks & Play Areas Faisal Hills"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#7b002c] flex items-center justify-center shadow">
                  <Trees className="w-4 h-4" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">Lush Greenery</span>
                  <strong className="text-sm font-serif font-bold text-white block">Two Parks & Play Areas</strong>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Giving families genuine parks, jogging tracks, and safe green spaces close to home.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Cricket Ground & Sports */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/imgi_48_sports-arena.webp"
                  alt="Cricket Ground & Sports Arena Faisal Hills"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#7b002c] flex items-center justify-center shadow">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">Active Sports</span>
                  <strong className="text-sm font-serif font-bold text-white block">Cricket Ground & Arena</strong>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  For residents who want organized sports, cricket matches, and active recreation nearby.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Fuel Station */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80"
                  alt="Boulevard Fuel Station"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#7b002c] flex items-center justify-center shadow">
                  <Fuel className="w-4 h-4" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">24/7 Utility</span>
                  <strong className="text-sm font-serif font-bold text-white block">Boulevard Fuel Station</strong>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Convenient fuel filling stations located directly off the entrance boulevard.
                </p>
              </div>
            </div>
          </div>

          {/* 8. High-Rise Apartment Sites */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7b002c]/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                  alt="High-Rise Apartment Sites"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#7b002c] flex items-center justify-center shadow">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block">Vertical Living</span>
                  <strong className="text-sm font-serif font-bold text-white block">High-Rise Apartment Sites</strong>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  For those who prefer luxury high-rise apartment living with panoramic mountain views.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-medium">
          On the infrastructure side, the block also benefits from wide carpeted roads, underground electricity and a functioning sewerage system — the kind of modern infrastructure that’s easy to take for granted until you compare it with societies still waiting on basic utilities.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 12. KEY PROJECTS WITH VISUAL PHOTOGRAPHY CARDS            */}
      {/* ========================================================= */}
      <section id="faisal-jewel" className="scroll-mt-28 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5" />
            <span>Built Megastructures</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Key Projects in Faisal Hills Executive Block
          </h2>
          <p className="text-slate-700 text-sm">
            A few names come up constantly when people discuss this block, so it’s worth knowing what each one actually is:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Project 1: Faisal Jewel */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#7b002c]/30 transition-all duration-300 group">
            <div>
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src="/faisal-jewel-1.png"
                  alt="Faisal Jewel Skyscraper"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-[#7b002c] text-white font-bold text-[10px] rounded-full uppercase tracking-wider shadow">
                    26-27 Storeys
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  <Link href="/blocks/faisal-jewel-islamabad" className="hover:text-[#7b002c] transition-colors">Faisal Jewel Tower</Link>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  A high-rise project combining commercial retail space, residential apartments and a luxury hotel component. Positioned as the architectural centerpiece of the Executive Block.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href="/blocks/faisal-jewel-islamabad"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7b002c] hover:underline pt-3 border-t border-slate-100 w-full"
              >
                <span>Explore Faisal Jewel Tower</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Project 2: Roots International School */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#7b002c]/30 transition-all duration-300 group">
            <div>
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/faisal-roots-school.jpg"
                  alt="Roots International School Campus"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded-full uppercase tracking-wider shadow">
                    Fully Operational
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-serif font-bold text-xl text-slate-900">Roots International School Campus</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  A fully functional educational facility offering an internationally benchmarked curriculum, giving resident families a nearby option for their children’s schooling.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 pt-3 border-t border-slate-100">
                <BadgeCheck className="w-4 h-4" />
                <span>Actively Teaching Students on Site</span>
              </div>
            </div>
          </div>

          {/* Project 3: Sports Arena / Community Parks */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#7b002c]/30 transition-all duration-300 group">
            <div>
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/faisal-park.jpg"
                  alt="Sports Arena and Parks"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-blue-600 text-white font-bold text-[10px] rounded-full uppercase tracking-wider shadow">
                    Active Sports & Recreation
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-serif font-bold text-xl text-slate-900">Sports Arena & Community Parks</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  A dedicated ground for cricket, sports events, jogging tracks and green open parks for healthy family living.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <span className="text-xs font-semibold text-blue-700 pt-3 border-t border-slate-100 block">
                Integrated in Block Zoning
              </span>
            </div>
          </div>

          {/* Project 4: Faisal Mansion / Monument Gateway */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#7b002c]/30 transition-all duration-300 group">
            <div>
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src="/faisalhillarc.jpg"
                  alt="Faisal Hills Monument Gateway"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-amber-600 text-white font-bold text-[10px] rounded-full uppercase tracking-wider shadow">
                    Main Gateway & Head Office
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-serif font-bold text-xl text-slate-900">Faisal Mansion & Grand Arch</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  The iconic architectural entrance on Main GT Road housing customer facilitation, official site offices and booking documentation desks.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <span className="text-xs font-semibold text-amber-700 pt-3 border-t border-slate-100 block">
                Customer Facilitation On-Site
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 italic bg-white p-5 rounded-2xl border border-slate-200">
          Together, these projects are what elevate the Executive Block from “a collection of plots” to something closer to a small, self-contained town centre — and they’re a big part of why this block is treated as the flagship of Faisal Hills.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 14. DEVELOPMENT STATUS (WITH REAL ON-GROUND PHOTO)         */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* Left Column: Narrative Content & Status Counters */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" />
                  <span>On-Ground Progress • Verified Site Update</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  Faisal Hills Executive Block Development Status
                </h2>
              </div>

              <p className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">
                In short, the Faisal Hills Executive Block development status is <strong className="text-[#7b002c]">“actively under construction, with a lot already in place.”</strong> The main boulevard, internal roads and streets are functional. Sewerage, street lighting and underground electricity work have largely been completed across the developed sectors.
              </p>

              {isDevStatusExpanded && (
                <div className="space-y-4 animate-fadeIn">
                  <p>
                    On the landmark front, the Roots International School Campus is operational and already teaching students — not a rendering on a brochure, but a working school. Construction on the <Link href="/blocks/faisal-jewel-islamabad" className="text-[#7b002c] font-bold hover:underline">Faisal Jewel project</Link> has been progressing steadily, with the structure reportedly nearing completion, and its design has even picked up recognition at international property award events.
                  </p>

                  <p>
                    Home construction is also visibly underway across multiple sectors, which is generally reassuring for anyone wary of buying into a project that’s still mostly empty land. That said, development pace can vary by sector — some parts of the Executive Block are noticeably further along than others, so it’s worth asking specifically about the sector your plot is in rather than judging by the block’s overall progress. Read the <Link href="/blogs" className="text-[#7b002c] font-bold hover:underline">latest investment guides on our blog</Link> for detailed quarterly development photo logs.
                  </p>
                </div>
              )}

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsDevStatusExpanded(!isDevStatusExpanded)}
                  className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-[#7b002c] hover:text-[#9e1245] bg-rose-50 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl border border-rose-200/80 transition cursor-pointer"
                >
                  <span>{isDevStatusExpanded ? 'See Less' : 'See More Development Details'}</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isDevStatusExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Status Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-0.5">
                <span className="text-xl font-serif font-bold text-[#7b002c] block">95%+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">Roads Carpeted</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-0.5">
                <span className="text-xl font-serif font-bold text-[#7b002c] block">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">Underground Grid</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-0.5">
                <span className="text-xl font-serif font-bold text-emerald-700 block">Possession</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">Ready to Build</span>
              </div>
            </div>
          </div>

          {/* Right Column: Real On-Ground Development Photo */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 group flex-1">
              <img
                src="/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg"
                alt="Faisal Hills Executive Block On-Ground Development Status & Aerial View"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-emerald-600/90 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-xs border border-emerald-400/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Possession Ready</span>
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300 bg-rose-950/70 px-2.5 py-0.5 rounded-full border border-rose-800/70 inline-block backdrop-blur-xs">
                  Verified Aerial Drone Survey
                </span>
                <h4 className="font-serif font-bold text-base sm:text-lg leading-snug drop-shadow-md text-white">
                  Executive Sector On-Ground Progress
                </h4>
                <p className="text-xs text-slate-300">
                  Wide carpeted boulevards, complete utilities, and active on-ground villa construction.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 15. WHY INVEST IN EXECUTIVE BLOCK                         */}
      {/* ========================================================= */}
      <section className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ROI & Capital Growth</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Why Invest in Faisal Hills Executive Block
          </h2>
          <p className="text-slate-300 text-sm">
            If you’re weighing a Faisal Hills Executive Block investment against other options along GT Road, here’s what tends to stand out:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">Strategic GT Road Access</strong>
            <span className="text-slate-300">Direct N-5 frontage with rapid proximity to Rawalpindi, Taxila, and Wah.</span>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">RDA Approved Society</strong>
            <span className="text-slate-300">Sanctioned legal status providing full buyer protection and clear titles.</span>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">Civic & Commercial Anchor</strong>
            <span className="text-slate-300">Commercial hub supporting both residential value and commercial rental yields.</span>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">Visible Active Development</strong>
            <span className="text-slate-300">Active on-ground construction rather than mere renderings and speculative promises.</span>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">Family-Friendly Living</strong>
            <span className="text-slate-300">Roots School, Jamia mosques, and community parks already fully functioning.</span>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <strong className="text-white block">Long Term Capital Growth</strong>
            <span className="text-slate-300">High appreciation velocity as Faisal Jewel and surrounding plazas near full completion.</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
          None of this guarantees a particular outcome — real estate carries risk like any investment, and prices can move in either direction depending on broader market conditions. But for buyers looking for a secure investment option with both end-use and resale potential, and the possibility of a high return on investment over the medium to long term, the combination of location, legal status and active development is hard to ignore.
        </p>
      </section>

      {/* ========================================================= */}
      {/* 16. TRANSFER & BOOKING PROCESS (PREMIUM REDESIGN)          */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#7b002c] text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Documentation Checklist • Transfer Protocol</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Faisal Hills Executive Block Transfering Process
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
            Transferring a plot is straightforward with Zedem International. Prepare the following verified documentation checklist for prompt submission:
          </p>
        </div>

        {/* 4-Step Process Workflow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Step 1 */}
          <div className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#7b002c]/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-rose-100/70 text-[#7b002c] flex items-center justify-center font-serif font-bold text-sm group-hover:scale-110 transition-transform">
                  01
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800/80 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
                  Identity
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                CNIC / NICOP Copies
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Two verified photocopies of the applicant’s CNIC (or NICOP for overseas Pakistani buyers).
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Attested Copy Required</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#7b002c]/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-rose-100/70 text-[#7b002c] flex items-center justify-center font-serif font-bold text-sm group-hover:scale-110 transition-transform">
                  02
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800/80 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
                  Photos
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                Passport Photographs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Two recent passport-size color photographs of the applicant with a clear blue background.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Blue Background</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#7b002c]/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-rose-100/70 text-[#7b002c] flex items-center justify-center font-serif font-bold text-sm group-hover:scale-110 transition-transform">
                  03
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800/80 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
                  Nominee
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                Next of Kin CNIC
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear photocopy of next-of-kin CNIC for official nominee and succession files.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nominee Record</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#7b002c]/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-rose-100/70 text-[#7b002c] flex items-center justify-center font-serif font-bold text-sm group-hover:scale-110 transition-transform">
                  04
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800/80 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
                  Payment
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#7b002c] transition-colors">
                Down Payment / Pay Order
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official booking amount bank pay order or verified direct bank deposit slip.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Zedem Pay Order</span>
            </div>
          </div>
        </div>

        {/* Support Help Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#7b002c] via-[#8c0334] to-[#5a0020] rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-base sm:text-lg">Need Assistance with Plot Transfer & File Verification?</h4>
            <p className="text-xs text-rose-100">Our dedicated transfer advisory desk verifies society records and guides you step-by-step.</p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-white hover:bg-rose-50 text-[#7b002c] text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-all hover:scale-105 shrink-0"
          >
            Contact Transfer Desk
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 17. COMPARE OTHER FAISAL HILLS BLOCKS (GRID REDESIGN)      */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#7b002c] uppercase tracking-wider block">Cross-Sector Exploration</span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Compare Other Faisal Hills Blocks
            </h3>
            <p className="text-xs text-slate-600">
              Explore neighbouring sectors in Faisal Hills to compare plot sizes, elevations, and possession timelines:
            </p>
          </div>
          <Link
            href="/faisal-hills-blocks"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#7b002c] hover:underline shrink-0"
          >
            <span>View All Blocks Guide</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6-Block Interactive Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* Prime Block */}
          <Link
            href="/blocks/prime-block"
            className="p-4 bg-slate-50 hover:bg-[#7b002c] rounded-2xl border border-slate-200 hover:border-[#7b002c] text-slate-800 hover:text-white transition-all duration-300 group shadow-2xs hover:shadow-lg flex flex-col justify-between h-32"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#7b002c] group-hover:text-rose-200 block">
                VIP Crest
              </span>
              <strong className="font-serif font-bold text-sm block">Prime Block</strong>
            </div>
            <div className="flex items-center justify-between text-[10px] font-medium text-slate-500 group-hover:text-rose-100">
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Block A */}
          <Link
            href="/blocks/block-a"
            className="p-4 bg-slate-50 hover:bg-[#7b002c] rounded-2xl border border-slate-200 hover:border-[#7b002c] text-slate-800 hover:text-white transition-all duration-300 group shadow-2xs hover:shadow-lg flex flex-col justify-between h-32"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#7b002c] group-hover:text-rose-200 block">
                Developed
              </span>
              <strong className="font-serif font-bold text-sm block">Block A</strong>
            </div>
            <div className="flex items-center justify-between text-[10px] font-medium text-slate-500 group-hover:text-rose-100">
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Block B */}
          <Link
            href="/blocks/block-b"
            className="p-4 bg-slate-50 hover:bg-[#7b002c] rounded-2xl border border-slate-200 hover:border-[#7b002c] text-slate-800 hover:text-white transition-all duration-300 group shadow-2xs hover:shadow-lg flex flex-col justify-between h-32"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#7b002c] group-hover:text-rose-200 block">
                Hill Views
              </span>
              <strong className="font-serif font-bold text-sm block">Block B</strong>
            </div>
            <div className="flex items-center justify-between text-[10px] font-medium text-slate-500 group-hover:text-rose-100">
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Block C */}
          <Link
            href="/blocks/block-c"
            className="p-4 bg-slate-50 hover:bg-[#7b002c] rounded-2xl border border-slate-200 hover:border-[#7b002c] text-slate-800 hover:text-white transition-all duration-300 group shadow-2xs hover:shadow-lg flex flex-col justify-between h-32"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#7b002c] group-hover:text-rose-200 block">
                High Growth
              </span>
              <strong className="font-serif font-bold text-sm block">Block C</strong>
            </div>
            <div className="flex items-center justify-between text-[10px] font-medium text-slate-500 group-hover:text-rose-100">
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Block D */}
          <Link
            href="/blocks/block-d"
            className="p-4 bg-slate-50 hover:bg-[#7b002c] rounded-2xl border border-slate-200 hover:border-[#7b002c] text-slate-800 hover:text-white transition-all duration-300 group shadow-2xs hover:shadow-lg flex flex-col justify-between h-32"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#7b002c] group-hover:text-rose-200 block">
                Affordable
              </span>
              <strong className="font-serif font-bold text-sm block">Block D</strong>
            </div>
            <div className="flex items-center justify-between text-[10px] font-medium text-slate-500 group-hover:text-rose-100">
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Gandhara Block */}
          <Link
            href="/blocks/gandahara-block"
            className="p-4 bg-slate-50 hover:bg-[#7b002c] rounded-2xl border border-slate-200 hover:border-[#7b002c] text-slate-800 hover:text-white transition-all duration-300 group shadow-2xs hover:shadow-lg flex flex-col justify-between h-32"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#7b002c] group-hover:text-rose-200 block">
                M-1 Access
              </span>
              <strong className="font-serif font-bold text-sm block">Gandhara</strong>
            </div>
            <div className="flex items-center justify-between text-[10px] font-medium text-slate-500 group-hover:text-rose-100">
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 18. FREQUENTLY ASKED QUESTIONS (HOMEPAGE DESIGN STYLE)     */}
      {/* ========================================================= */}
      <section className="py-12 lg:py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* Left Column: FAQ'S Title */}
          <div className="lg:col-span-4 space-y-3 relative lg:sticky lg:top-28">
            <span className="label-caps text-[#7b002c] font-bold block mb-1 text-xs uppercase tracking-widest">FAQ'S</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#7b002c] tracking-tight leading-[1.15] uppercase">
              Frequently Asked Questions (FAQS)
            </h2>
          </div>

          {/* Right Column: Clean Horizontal Separated Accordion */}
          <div className="lg:col-span-8 space-y-0 border-t border-slate-900/80">
            {seoFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border-b border-slate-900/80">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors group"
                  >
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-[#7b002c] group-hover:text-[#9e1245] uppercase tracking-wider pr-4 leading-snug">
                      {`${index + 1}. ${faq.q}`}
                    </h3>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7b002c] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pr-6 animate-fadeIn">
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
      {/* 19. FINAL THOUGHTS & CONCLUSION                           */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Final Thoughts on Faisal Hills Executive Block
        </h2>
        <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3 font-sans">
          <p>
            Pulling all of this together, Faisal Hills Executive Block works because it doesn’t ask buyers to choose between location, lifestyle and investment potential — it tries to offer all three. Its GT Road frontage and RDA approval cover the practical and legal basics. Its mix of residential and commercial plots, parks, mosques, a school and a cricket ground cover the day-to-day living side. And its ongoing development, anchored by the <Link href="/blocks/faisal-jewel-islamabad" className="text-[#7b002c] font-bold hover:underline">Faisal Jewel project</Link> and Roots International School, gives it momentum that’s visible on the ground rather than just on paper.
          </p>
          <p>
            If you’re exploring Faisal Hills Executive Block for a personal home, a rental property, or as part of a longer-term investment plan, the next sensible step is to get current, sector-specific information — exact pricing, available plot numbers and the latest payment plan — directly from our team. Real estate decisions tend to work out better when they’re based on up-to-date facts rather than brochure averages, and we’re happy to walk you through whichever part of the Executive Block fits what you’re looking for. <Link href="/contact" className="text-[#7b002c] font-bold hover:underline">Get in touch with our team</Link> today.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 20. DIRECT LEAD CAPTURE INQUIRY FORM                      */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-[#7b002c] via-[#5c0021] to-[#3a0014] text-white p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center space-y-2 relative z-10">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Executive Assistance</span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Schedule an On-Site Executive Block Tour
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
              Thank you, <strong>{leadName}</strong>. Our Executive Block property specialist will contact you on <strong>{leadPhone}</strong> with available plot files.
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
                  <option value="Commercial Plot (Boulevard)">Commercial Boulevard Plot</option>
                  <option value="Faisal Jewel Apartment / Shop">Faisal Jewel Apartment / Shop</option>
                </select>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-rose-100">Specific Requirements</label>
                <input
                  type="text"
                  placeholder="Corner, Park Facing, Investment, etc."
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
              <span>Submit Executive Block Inquiry</span>
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
            className="bg-slate-900 rounded-3xl border border-white/20 shadow-2xl max-w-4xl w-full overflow-hidden text-white relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#7b002c] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 sm:h-[450px] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedGalleryImage.image}
                alt={selectedGalleryImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
              <div className="space-y-1">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                  {selectedGalleryImage.tag}
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  {selectedGalleryImage.title}
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  {selectedGalleryImage.desc}
                </p>
              </div>

              <a
                href={`https://wa.me/923044811717?text=Hi%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(selectedGalleryImage.title)}%20in%20Faisal%20Hills%20Executive%20Block.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
