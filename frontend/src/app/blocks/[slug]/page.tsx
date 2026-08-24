import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Building2, ShieldCheck, MapPin, CheckCircle2, Trees, Landmark, Activity,
  Droplets, ShoppingBag, ArrowLeft, ArrowRight, MessageSquare, Calendar, HelpCircle,
  Zap, Sparkles, Compass, Tv, Car, Utensils, Waves, GraduationCap, Building,
  Wifi, Wind, Navigation, Hotel, LayoutGrid, Check,
  PhoneCall, FileText
} from 'lucide-react';
import {
  blocksData,
  plotInventoryData,
  paymentPlansData,
  faisalJewelResidentialPlan,
  faisalJewelCommercialPlans,
  faisalJewelsSpecs,
  faisalJewelsSurroundings,
  faisalJewelsApartmentDetails,
  faisalJewelsHotelExperience,
  fetchBlocks,
  fetchBlock,
  fetchPlots,
  fetchSeo
} from '@/data/faisalHillsData';
import InteractiveMasterPlan from '@/components/map/InteractiveMasterPlan';
import FaqAccordion from '@/components/ui/FaqAccordion';
import ExecutiveBlockContent from '@/components/blocks/ExecutiveBlockContent';
import PrimeBlockContent from '@/components/blocks/PrimeBlockContent';
import BlockHeroInquiryForm from '@/components/blocks/BlockHeroInquiryForm';
import CountUpNumber from '@/components/ui/CountUpNumber';

const getAmenityIcon = (iconName: string) => {
  switch (iconName) {
    case 'Shield':
    case 'ShieldCheck':
      return <ShieldCheck className="w-5 h-5 text-white" />;
    case 'Trees':
      return <Trees className="w-5 h-5 text-white" />;
    case 'Zap':
      return <Zap className="w-5 h-5 text-white" />;
    case 'Landmark':
      return <Landmark className="w-5 h-5 text-white" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-5 h-5 text-white" />;
    case 'GraduationCap':
      return <GraduationCap className="w-5 h-5 text-white" />;
    case 'Activity':
      return <Activity className="w-5 h-5 text-white" />;
    case 'Droplets':
      return <Droplets className="w-5 h-5 text-white" />;
    case 'Building':
    case 'Building2':
      return <Building2 className="w-5 h-5 text-white" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-white" />;
    case 'Compass':
      return <Compass className="w-5 h-5 text-white" />;
    case 'Tv':
      return <Tv className="w-5 h-5 text-white" />;
    case 'Car':
      return <Car className="w-5 h-5 text-white" />;
    case 'Utensils':
      return <Utensils className="w-5 h-5 text-white" />;
    case 'Waves':
      return <Waves className="w-5 h-5 text-white" />;
    default:
      return <Building2 className="w-5 h-5 text-white" />;
  }
};

interface BlockPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blocks = await fetchBlocks();
  return blocks.map((block) => ({
    slug: block.slug,
  }));
}

export async function generateMetadata({ params }: BlockPageProps): Promise<Metadata> {
  const seo = await fetchSeo(params.slug);
  if (seo) {
    return {
      title: seo.title,
      description: seo.meta_description,
      keywords: seo.keywords || undefined,
      openGraph: {
        title: seo.og_title || seo.title,
        description: seo.og_description || seo.meta_description,
      }
    };
  }

  const block = await fetchBlock(params.slug);
  if (!block) return { title: 'Block Not Found' };

  if (params.slug === 'executive-block') {
    return {
      title: 'Faisal Hills Executive Block – Plots, Prices & Map',
      description: 'Faisal Hills Executive Block: RDA-approved plots on Main GT Road. Check location, prices, payment plan, NOC, facilities & investment details.',
      keywords: ['Faisal Hills Executive Block', 'Executive Block Faisal Hills plots', 'Faisal Hills Executive Block price', 'Faisal Hills Executive Block map', 'Faisal Hills RDA NOC', 'Faisal Jewel Executive Block'],
      openGraph: {
        title: 'Faisal Hills Executive Block – Plots, Prices & Map',
        description: 'Faisal Hills Executive Block: RDA-approved plots on Main GT Road. Check location, prices, payment plan, NOC, facilities & investment details.',
        images: [{ url: '/images/faisalhillexecutive.webp' }]
      }
    };
  }

  if (params.slug === 'prime-block') {
    return {
      title: 'Faisal Hills Prime Block – Official Prices, 4-Year Payment Plan & Map',
      description: 'Faisal Hills Prime Block: Official fixed launch rates on 48-month easy installment plan. 100% RDA approved with GT Road & Margalla views. Check plot prices, NOC & master plan.',
      keywords: ['Faisal Hills Prime Block', 'Prime Block Faisal Hills plots', 'Faisal Hills Prime Block payment plan', 'Prime Block installment schedule', 'Faisal Hills RDA NOC', 'Prime Block map'],
      openGraph: {
        title: 'Faisal Hills Prime Block – Official Prices, 4-Year Payment Plan & Map',
        description: 'Faisal Hills Prime Block: Official fixed launch rates on 48-month easy installment plan. 100% RDA approved with GT Road & Margalla views.',
        images: [{ url: '/images/faisal-hills-aerial.jpg' }]
      }
    };
  }

  return {
    title: `${block.name} Faisal Hills | Plot Prices, Map, NOC & Payment Plan`,
    description: `${block.name} Faisal Hills Rawalpindi. ${block.subtitle}. Explore 5 Marla, 10 Marla, 1 Kanal plot prices, NOC status, master plan, and 3-year payment plans. Verified: ${block.verificationDate}.`,
  };
}

export default async function BlockDetailPage({ params }: BlockPageProps) {
  const block = await fetchBlock(params.slug);
  if (!block) notFound();

  const allPlots = await fetchPlots();
  const blockPlots = allPlots.filter((p) => p.blockSlug === block.slug);
  const blockPlans = paymentPlansData.filter((p) => p.blockSlug === block.slug);
  const allBlocks = await fetchBlocks();
  const otherBlocks = allBlocks.filter((b) => b.slug !== block.slug);

  // Authentic Hero images and descriptions for custom blocks
  const heroBg = block.slug === 'prime-block'
    ? '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
    : block.slug === 'executive-block'
    ? '/images/imgi_3_DJI_20250818122014_0056_D-scaled.jpg'
    : block.heroImage;

  const heroSubtitle = block.slug === 'prime-block'
    ? null
    : block.subtitle;

  const heroDesc = block.slug === 'prime-block'
    ? 'Official fixed launch rates, 48-month easy installment schedule with zero dealer markup, 225ft boulevard access, and scenic Margalla Ridge elevation.'
    : block.description;

  return (
    <div className="space-y-8 lg:space-y-10 pb-20">

      {/* Block Hero Banner */}
      <section className="relative bg-[#090d16] text-white pt-28 sm:pt-32 lg:pt-36 pb-0 px-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        {/* Subtle Transparent Overlay for Maximum Image Visibility & Readable Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/50 to-slate-950/60" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-10 sm:pb-14">
          
          {/* Left Column: Title, Details, Quick Price & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {block.slug !== 'executive-block' && block.slug !== 'prime-block' && (
              <>
                <Link href="/faisal-hills-blocks" className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Blocks</span>
                </Link>

                {block.id !== 'faisal-jewels' && (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-[#7b002c] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {block.status}
                    </span>
                    <span className="bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-white" />
                      {block.nocStatus}
                    </span>
                    <span className="bg-slate-900 text-slate-400 text-xs px-3 py-1 rounded-full border border-slate-800">
                      Verified: {block.verificationDate}
                    </span>
                  </div>
                )}
              </>
            )}

            <div className="space-y-3">
              {heroSubtitle && (
                <span className="label-caps text-slate-200 tracking-widest block font-bold">{heroSubtitle}</span>
              )}
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                {block.id === 'faisal-jewels' ? 'Faisal Jewel Islamabad — A New Landmark in Faisal Hills' : block.name}
              </h1>
              {heroDesc && (
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
                  {heroDesc}
                </p>
              )}
            </div>


            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:+923313339997"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>Call Sales Desk</span>
              </a>
              <a
                href="https://wa.me/923044811717?text=Hi%2C%20I%20am%20interested%20in%20Faisal%20Hills%20plot%20booking."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Quick Inquiry Form */}
          <div className="lg:col-span-5 w-full">
            <BlockHeroInquiryForm blockName={block.name} blockSlug={block.slug} />
          </div>

        </div>

        {/* Moving Slogan Marquee Ticker attached directly to Hero Section base */}
        <div className="relative z-10 w-full overflow-hidden py-3 bg-gradient-to-r from-[#7b002c] via-[#9e1245] to-[#7b002c] text-white border-t border-b border-white/10 select-none shadow-xl">
          <div className="ticker-track flex items-center gap-12 whitespace-nowrap text-xs sm:text-sm font-serif font-bold tracking-[0.2em] uppercase text-white">
            {[
              'FAISAL HILLS ISLAMABAD',
              '100% RDA APPROVED SOCIETY',
              'LUXURY LIVING AT MARGALLA FOOTHILLS',
              '225FT MAIN BOULEVARD ACCESS',
              'PREMIUM RESIDENTIAL & COMMERCIAL PLOTS',
              'A PROJECT BY ZEDEM INTERNATIONAL',
              'HIGH-ROI SECURE PROPERTY INVESTMENT',
              'IMMEDIATE POSSESSION & CONSTRUCTION READY',
              'FAISAL HILLS ISLAMABAD',
              '100% RDA APPROVED SOCIETY',
              'LUXURY LIVING AT MARGALLA FOOTHILLS',
              '225FT MAIN BOULEVARD ACCESS',
              'PREMIUM RESIDENTIAL & COMMERCIAL PLOTS',
              'A PROJECT BY ZEDEM INTERNATIONAL',
              'HIGH-ROI SECURE PROPERTY INVESTMENT',
              'IMMEDIATE POSSESSION & CONSTRUCTION READY'
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-12 shrink-0">
                <span className="font-serif tracking-[0.2em] text-white/95">{text}</span>
                <span className="text-amber-300 font-sans text-xs">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Block Redesigned Luxury Content (Exclusive layout) */}
      {block.slug === 'executive-block' && (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <ExecutiveBlockContent />
        </div>
      )}

      {/* Prime Block Dedicated Ultra-Luxury Content (Top Priority Block) */}
      {block.slug === 'prime-block' && (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <PrimeBlockContent />
        </div>
      )}

      {/* For all other blocks */}
      {block.slug !== 'executive-block' && block.slug !== 'prime-block' && (
        <>
          {/* Location & Key Highlights */}
          <section className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="label-caps text-[#7b002c] font-bold block">Sophisticated mixed-use tower</span>
                <h2 className="font-serif text-3xl font-bold text-slate-900">
                  {block.id === 'faisal-jewels' ? 'About Faisal Jewel — A Story of Sophistication' : 'Location & Strategic Advantage'}
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {block.id === 'faisal-jewels' ? (
                  <>
                    Faisal Jewel is a landmark 27-story mixed-use skyscraper offering luxury apartments and commercial shops in Faisal Hills Islamabad. Situated at the main entrance overlooking the Margalla Hills, it features premium amenities, a 4-star hotel, and outstanding connectivity to GT Road and the M-1 Motorway. Designed for high capital growth and rental yields, it serves as a premier residential, shopping, and business destination.
                  </>
                ) : block.locationDetails}
              </p>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#7b002c]">Key Sector Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                  {block.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-[#7b002c] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side building sketch / illustration / master layout */}
            {block.id === 'faisal-jewels' ? (
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-md bg-white p-4 rounded-3xl border border-slate-200 shadow-xl overflow-hidden group">
                  <img
                    src="/images/faisal-jewel.jpg"
                    alt="Faisal Jewel Skyscraper Tower"
                    className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
                </div>
              </div>
            ) : (
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                <h3 className="font-serif font-bold text-lg text-[#7b002c]">Block Master Layout</h3>
                <p className="text-xs text-slate-650 leading-relaxed">
                  Below is the planned master map for {block.name}. View commercial pockets, residential zones, green belts, and major access roads.
                </p>
                 <div className="relative overflow-hidden rounded-xl border border-slate-150 aspect-[4/3] bg-slate-100 flex items-center justify-center">
                  <img
                    src={block.masterPlanImage || block.heroImage}
                    alt={`${block.name} Master Plan`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

        {/* Block A SEO Content Expansion */}
        {block.slug === 'block-a' && (
          <div className="lg:col-span-12 space-y-12 pt-8 border-t border-slate-200">
            
            {/* SEO Content Introduction */}
            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4 font-sans">
              <p className="font-semibold text-base text-slate-950">
                If you've been comparing housing options along GT Road, there's a good chance Faisal Hills Block A has already come up in your research. It's one of the more talked-about residential blocks in Faisal Hills, Islamabad's RDA-approved development near Taxila, and for good reason. Between its location, its plot variety, and the pace of construction on the ground, Block A draws attention from both end-users who want to build a home and investors looking at the GT Road corridor for the next few years.
              </p>
              <p>
                This guide walks through everything a serious buyer actually needs: where Block A sits in relation to Islamabad and Rawalpindi, what plot sizes and prices look like right now, how the payment structure works, what's been built so far, and what to expect if you're booking from overseas. We'll also flag a few things worth double-checking before you commit, because no investment guide is complete without that.
              </p>
            </div>

            {/* Block A at a Glance Table */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Faisal Hills Block A at a Glance
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                    <tr>
                      <th className="p-4 w-1/4">Feature</th>
                      <th className="p-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Location</td>
                      <td className="p-4 font-sans text-slate-600">Faisal Hills, near GT Road (N-5), Taxila</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">NOC Status</td>
                      <td className="p-4 font-sans text-[#7b002c] font-bold">RDA Approved</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Plot Sizes</td>
                      <td className="p-4 font-sans text-slate-600">5 Marla to 2 Kanal (residential), 9.6 Marla to 2 Kanal (commercial)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Price Range</td>
                      <td className="p-4 font-sans text-slate-600">Roughly PKR 55 Lakh to PKR 3.5 Crore, depending on size and location</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Payment Options</td>
                      <td className="p-4 font-sans text-slate-600">Full cash and structured payment plans available, depending on the specific plot and current offering</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Development Status</td>
                      <td className="p-4 font-sans text-slate-600">Substantially developed, with ongoing work on commercial and community facilities</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-slate-500 italic font-sans">
                * Note: Prices and payment terms shift over a few months. Treat the numbers above as a starting reference and confirm current rates with the sales office before making any commitment.
              </p>
            </div>

            {/* Grid for Location Details & NOC Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Where is Block A located */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    Where Is Faisal Hills Block A Located?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Location is usually the first thing serious buyers check, and it's where Block A genuinely earns its reputation. The block sits within the broader Faisal Hills society, just off GT Road (N-5) near Taxila, in a corridor that's seen steady residential growth over the past several years.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    What makes this stretch of GT Road appealing isn't just proximity to Taxila itself. It's the connectivity it offers in every direction. Islamabad's Zero Point and the wider Rawalpindi-Islamabad metro area are a comfortable drive away, while the M-1 Motorway gives quick access toward Peshawar and beyond.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
                  Easy commute for buyers working in Islamabad seeking lower property costs.
                </p>
              </div>

              {/* NOC Approval detail */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    NOC Approval & Regulatory Standing
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Faisal Hills, including Block A, holds No Objection Certificate (NOC) approval from the Rawalpindi Development Authority (RDA). That matters in two practical ways. First, the land has cleared the regulatory review checking zoning compliance, road and utility planning, and basic land-use legality. Second, it gives buyers legal standing if a dispute ever arises.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    An RDA NOC is not the same as full possession-ready development. Always ask to see the most recent NOC documentation directly from the developer or RDA's own published list before transferring any payment.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
                  Read more about layout plans in our <Link href="/plots" className="text-[#7b002c] font-bold hover:underline">NOC & Approvals</Link> section.
                </p>
              </div>

            </div>

            {/* Travel Times Accessibility */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="label-caps text-[#7b002c] font-bold block">Accessibility</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Distance from Major Roads & Landmarks
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-4xl">
                  These are approximate drive times and will vary with traffic and the exact entry point used, but they give a realistic sense of how connected the block actually is:
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950 text-white rounded-3xl p-6 lg:p-10 border border-slate-800 shadow-lg">
                <div className="lg:col-span-4 space-y-4 flex flex-col justify-center">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Travel Times</span>
                  <h4 className="font-serif text-xl font-bold text-white">Landmark Connections</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Faisal Hills Block A delivers excellent connectivity to major business corridors and commuter points:
                  </p>
                </div>
                
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Quaid Avenue / N-125 Road / Taxila City</span>
                    <span className="font-bold text-amber-400">~ 5 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Wah Cantt</span>
                    <span className="font-bold text-amber-400">~ 10 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">M-1 Motorway (Peshawar-Islamabad)</span>
                    <span className="font-bold text-amber-400">20 - 25 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Rawalpindi Kohat Road</span>
                    <span className="font-bold text-amber-400">20 - 25 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Rawalpindi City</span>
                    <span className="font-bold text-amber-400">25 - 30 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Islamabad City (Zero Point)</span>
                    <span className="font-bold text-amber-400">~ 30 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Islamabad International Airport</span>
                    <span className="font-bold text-amber-400">40 - 45 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout & Plot Sizes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Residential Plots */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Residential Plot Sizes & Layout
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Block A is planned with a genuine mix of residential plot sizes to suit first-time homebuilders and premium buyers alike:
                </p>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div>• <strong>5 Marla (25×50)</strong> — Ideal for compact, modern homes; easiest size to resell.</div>
                  <div>• <strong>8 Marla (30×60)</strong> — Mid-size option popular for cost-efficient family units.</div>
                  <div>• <strong>10 Marla (35×70)</strong> — The sweet spot for growing families needing extra space.</div>
                  <div>• <strong>14 Marla (40×80)</strong> — Premium intermediate size with increased road-facing width.</div>
                  <div>• <strong>1 Kanal (50×90) & 2 Kanal</strong> — Large-format estate plots positioned on main internal streets.</div>
                </div>
              </div>

              {/* Commercial Plots */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Commercial Opportunities
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Commercial plots in Block A range widely to support neighborhood clinics, grocery hubs, and banking centers:
                </p>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div>• Sizes range from <strong>9.6 Marla to 2 Kanal</strong> (including 12, 14, 15.4, 16.8, 32, and 37.44 Marla).</div>
                  <div>• Dynamically aligned along main commercial corridors to serve the resident population.</div>
                  <div>• High visibility and parking corridors planned at the master layout stage.</div>
                  <div>• View payment calculators on our site's <Link href="/payment-plan" className="text-[#7b002c] font-bold hover:underline">full payment plan options</Link>.</div>
                </div>
              </div>

            </div>

            {/* Development Updates */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Development Update & Construction Status
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Development in Block A has progressed steadily. The main boulevard and primary internal roads are largely complete and functional, giving it a livable neighborhood feel:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  <strong className="text-[#7b002c] block font-serif">Current Construction</strong>
                  <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
                    Several residential plots have completed homes or active construction. Basic utilities like electricity, water connections, and street lighting are operational. Commercial sectors, planned hospital sites, and mosque locations are actively being worked on.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  <strong className="text-[#7b002c] block font-serif">What's Coming Next</strong>
                  <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
                    Remaining commercial and community buildings are slated to come online over the next cycle. Contact our sales office for specific project timelines for the central markets and medical clinics.
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities and Facilities List */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Planned & Operational Amenities in Block A
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c] block">Security & Infrastructure</span>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside font-sans">
                    <li>Boundary wall & gated entry points with 24/7 security patrol</li>
                    <li>Underground electricity wiring & reliable water supply</li>
                    <li>Sui gas connectivity in developed residential sections</li>
                    <li>Wide carpeted internal roads with street lighting</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c] block">Lifestyle & Community</span>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside font-sans">
                    <li>Green parks, jogging tracks, and open play spaces</li>
                    <li>Sectors mosques & community schools</li>
                    <li>Planned hospital site and commercial banking hubs</li>
                    <li>Faisal Hills central community club access</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Price Table */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <span className="label-caps text-[#7b002c] font-bold block">Pricing Matrix</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Block A Plots Price Ranges
                </h3>
                <p className="text-xs text-slate-600 font-sans">
                  The prices below show the spread between standard inner plots and premium corner/boulevard plots in Block A:
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                    <tr>
                      <th className="p-4">Plot Size</th>
                      <th className="p-4">Approximate Price Range (PKR)</th>
                      <th className="p-4">Market Demand</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">5 Marla</td>
                      <td className="p-4 font-bold">55 Lakh – 80 Lakh</td>
                      <td className="p-4 text-emerald-600 font-bold">Very High (First-time buyers & resales)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">8 Marla</td>
                      <td className="p-4 font-bold">75 Lakh – 1.25 Crore</td>
                      <td className="p-4 text-slate-500 font-medium">Moderate-High</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">10 Marla</td>
                      <td className="p-4 font-bold">95 Lakh – 1.30 Crore</td>
                      <td className="p-4 text-emerald-600 font-bold">High (Growing families)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">14 Marla</td>
                      <td className="p-4 font-bold">1.2 Crore – 1.70 Crore</td>
                      <td className="p-4 text-slate-500 font-medium">Moderate</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">1 Kanal</td>
                      <td className="p-4 font-bold">1.45 Crore – 2.25 Crore</td>
                      <td className="p-4 text-slate-600 font-medium">Stable Long-term Value</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">2 Kanal</td>
                      <td className="p-4 font-bold">2.70 Crore – 3.50 Crore</td>
                      <td className="p-4 text-slate-600 font-medium">Exclusive Estates</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Why Invest & Booking Guide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Why Invest */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#7b002c] border-b border-slate-100 pb-2">
                  Why Invest in Block A?
                </h3>
                <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed font-sans">
                  <li>GT Road location commands high demand with independent commercial activity.</li>
                  <li>RDA NOC approval provides security and clear regulatory standing.</li>
                  <li>On-ground progress is visible with built homes, street lighting, and paved boulevard.</li>
                  <li>Appreciation potential links directly to finished utility connections and community growth.</li>
                </ul>
              </div>

              {/* Booking Requirements */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  How to Book a Plot
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans mb-2">
                  Booking is standard, but check requirements beforehand to avoid extra trips. You will generally need:
                </p>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-1">
                  <div>• CNIC copy (or <strong>NICOP</strong> for overseas Pakistani buyers)</div>
                  <div>• CNIC copy of your Next of Kin</div>
                  <div>• Passport-sized photographs of applicant</div>
                  <div>• Down payment according to current terms</div>
                </div>
                <p className="text-[11px] text-slate-500 italic font-sans pt-1">
                  * Overseas Pakistanis can authorize a representative via power of attorney for site visits and physical documents.
                </p>
              </div>

            </div>

            {/* Block Comparisons */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Block Comparison</span>
              <h3 className="font-serif text-xl font-bold text-white">Compare Block A vs Other Sectors</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl font-sans">
                The <Link href="/blocks/executive-block" className="text-amber-400 hover:underline">Executive Block</Link> sits at a higher premium with Main Entrance prominence. <Link href="/blocks/block-b" className="text-amber-400 hover:underline">Block B</Link> and its extension offer quieter, affordable, family-focused slots. <Link href="/blocks/block-c" className="text-amber-400 hover:underline">Block C</Link> and <Link href="/blocks/block-d" className="text-amber-400 hover:underline">Block D</Link> are newer phases. Block A represents the balanced middle: mature infrastructure, GT Road connection, and strong neighborhood growth.
              </p>
            </div>

            {/* Final Thoughts */}
            <div className="bg-[#ffe9e6]/20 p-8 rounded-2xl border border-[#7b002c]/10 text-xs text-slate-600 leading-relaxed font-sans space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#7b002c] uppercase tracking-wider">Final Thoughts</h4>
              <p>
                Faisal Hills Block A stands out on solid fundamentals: RDA approval, direct GT Road connectivity, mature on-the-ground utilities, and diverse plot sizes. Like all real estate, it requires due diligence — verifying current NOC status, getting terms in writing, and confirming timelines. If those match your investment thesis or timeline, Block A is a strong contender along this growing Rawalpindi-Islamabad corridor.
              </p>
            </div>

          </div>
        )}

        {/* Block B SEO Content Expansion */}
        {block.slug === 'block-b' && (
          <div className="lg:col-span-12 space-y-12 pt-8 border-t border-slate-200">
            
            {/* SEO Content Introduction */}
            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4 font-sans">
              <p className="font-semibold text-base text-slate-950">
                If you're researching Faisal Hills Islamabad B Block, you've probably noticed it comes up more often than most other blocks in the society. That's not an accident. Block B is the largest block in Faisal Hills, sitting right between Block A and Block C, and it's built around the 225-foot Grand Boulevard that connects straight out to GT Road. For buyers comparing blocks, that combination of size, central position, and boulevard access tends to be the deciding factor.
              </p>
              <p>
                This guide covers what actually matters before you commit to a plot here: where Block B sits relative to Islamabad, Rawalpindi, and Taxila, current plot sizes and prices, how the payment plan works right now, what's been built so far, and the documents you'll need to book — including the extra step overseas Pakistanis usually have to think about. We'll also point out a few things worth confirming directly with the sales office, because prices and terms in any active housing scheme shift over time.
              </p>
            </div>

            {/* Block B at a Glance Table */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Faisal Hills B Block at a Glance
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                    <tr>
                      <th className="p-4 w-1/4">Feature</th>
                      <th className="p-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Location</td>
                      <td className="p-4 font-sans text-slate-600">Faisal Hills, between Block A and Block C, on the 225-ft Grand Boulevard</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">NOC Status</td>
                      <td className="p-4 font-sans text-[#7b002c] font-bold">RDA Approved</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Plot Sizes</td>
                      <td className="p-4 font-sans text-slate-600">5 Marla to 2 Kanal (residential), four commercial sizes from 90×84 to 220×229</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Price Range</td>
                      <td className="p-4 font-sans text-slate-600">Roughly PKR 35 Lakh to 1.85 Crore depending on size, plot type, and location</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Payment Options</td>
                      <td className="p-4 font-sans text-slate-600">Mostly full cash on current resale plots; confirm with sales office if installment options are open</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Development Status</td>
                      <td className="p-4 font-sans text-slate-600">Main roads and boulevard largely complete; commercial zones still under construction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-slate-500 italic font-sans">
                * Note: Prices and payment terms across Faisal Hills tend to move every few months, so confirm current figures before transferring any payment.
              </p>
            </div>

            {/* Grid for Location Details & NOC Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Where is Block B located */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    Where Is Faisal Hills B Block Located?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Block B holds a genuinely central position in Faisal Hills. It sits directly between Block A and Block C, fronting the 225-foot Grand Boulevard that runs through the heart of the society. That boulevard connects out to the main GT Road, which is the real advantage here — Block B residents aren't tucked away on a side street; they're on the society's primary artery.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Beyond the boulevard, the block benefits from being close to Taxila, Wah Cantt, and the M-1 Motorway ramp, while still being a manageable drive from both Rawalpindi and Islamabad. For families who want a quieter setting without losing easy access to the twin cities, that's a fairly rare balance to strike.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
                  GT Road connection ensures high visibility on the main artery.
                </p>
              </div>

              {/* NOC Approval detail */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    NOC Approval & Regulatory Standing
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Faisal Hills, including Block B, holds NOC (No Objection Certificate) approval from the Rawalpindi Development Authority (RDA), covering roughly 11,823 kanals of land. That approval confirms the project cleared RDA's review of zoning, land use, and basic infrastructure planning.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Approval confirms the land's legal and planning status — it isn't a statement about how far construction has progressed on any given day. Before paying anything, ask to see the current NOC documentation directly from the developer, or check RDA's own published records.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
                  Read more about layout plans in our <Link href="/plots" className="text-[#7b002c] font-bold hover:underline">NOC & Approvals</Link> section.
                </p>
              </div>

            </div>

            {/* Travel Times Accessibility */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="label-caps text-[#7b002c] font-bold block">Accessibility</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Distance from Major Roads & Landmarks
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-4xl">
                  These are approximate drive times from Block B. Times will vary with traffic and your exact starting point inside the block, but they reflect the access most residents report:
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950 text-white rounded-3xl p-6 lg:p-10 border border-slate-800 shadow-lg">
                <div className="lg:col-span-4 space-y-4 flex flex-col justify-center">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Travel Times</span>
                  <h4 className="font-serif text-xl font-bold text-white">Central Accessibility</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Commuting into Islamabad and Rawalpindi is highly convenient, without navigating narrow internal streets first:
                  </p>
                </div>
                
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Quaid Avenue / N-125 Road / Margalla Avenue</span>
                    <span className="font-bold text-amber-400">~ 5 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Taxila City</span>
                    <span className="font-bold text-amber-400">5 - 10 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Tarnol Morr / Wah Cantt</span>
                    <span className="font-bold text-amber-400">~ 10 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">M-1 Motorway ramp</span>
                    <span className="font-bold text-amber-400">10 - 15 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Paswal Road</span>
                    <span className="font-bold text-amber-400">~ 12 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Islamabad City (Zero Point)</span>
                    <span className="font-bold text-amber-400">30 - 35 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Islamabad International Airport</span>
                    <span className="font-bold text-amber-400">35 - 40 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Paswal Road / Rawalpindi (Saddar)</span>
                    <span className="font-bold text-amber-400">30 - 50 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout & Plot Sizes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Residential Plots */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Residential Plot Sizes & Layout
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Block B was planned with a wide spread of plot sizes, appealing to a wide range of buyers:
                </p>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div>• <strong>5 Marla (25×50)</strong> — Ideal for compact, modern homes; easiest size to resell.</div>
                  <div>• <strong>8 Marla (30×60)</strong> — Mid-size option popular for family-focused construction.</div>
                  <div>• <strong>10 Marla (35×70)</strong> — Popular for growing families needing extra yard space.</div>
                  <div>• <strong>14 Marla (40×80)</strong> — Useful intermediate size before stepping up to a Kanal.</div>
                  <div>• <strong>1 Kanal (50×90) & 2 Kanal (75×120)</strong> — Estate plots for larger villas.</div>
                </div>
              </div>

              {/* Commercial Plots */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Commercial Opportunities
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Commercial layouts support shopping corridors and high-rise apartment structures:
                </p>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div>• Four standard commercial sizes: <strong>90×84, 120×229, 195×228, and 220×229</strong>.</div>
                  <div>• Includes third-party mixed-use high-rise projects (like Sky Prime) along boulevard frontage.</div>
                  <li>Click here to learn about <Link href="/faisal-hills-commercial" className="text-[#7b002c] font-bold hover:underline">Faisal Hills commercial plots</Link>.</li>
                  <li>Check out <Link href="/blocks/executive-block" className="text-[#7b002c] font-bold hover:underline">mixed-use developments in Faisal Hills</Link> details.</li>
                </div>
              </div>

            </div>

            {/* Development Updates */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Development Update & Construction Status
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Development in Block B has moved at a steady, visible pace:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  <strong className="text-[#7b002c] block font-serif">Current Construction</strong>
                  <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
                    The main 120-foot roads, the 225-foot Grand Boulevard, and the 100-foot service roads are largely complete and functional, meaning the block feels lived-in. Residential homes are built and utility networks (electricity, water, and sewerage) are operational. Commercial zones, sports complexes, and theme parks remain under construction.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  <strong className="text-[#7b002c] block font-serif">What's Coming Next in 2026</strong>
                  <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
                    Commercial blocks and recreational arenas will continue to develop over the coming year. Ask the sales office for specific timelines on recreational zones rather than a general estimate.
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities and Facilities List */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Amenities & Community Facilities in Block B
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c] block">Security & Infrastructure</span>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside font-sans">
                    <li>Gated, controlled entry points & 24/7 security with CCTV monitoring</li>
                    <li>Underground electrification & Sui gas connectivity</li>
                    <li>Underground/overhead water supply with sewerage disposal stations</li>
                    <li>Wide 40-foot residential streets and the 225-foot Grand Boulevard</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c] block">Lifestyle & Community</span>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside font-sans">
                    <li>Multiple manicured parks (around 10) & a dedicated theme park</li>
                    <li>Sports complex with grounds for cricket and football</li>
                    <li>7 to 8 mosques distributed through the block & 2 graveyards</li>
                    <li>7 educational institutions, commercial areas, shops, and a shopping mall</li>
                    <li>Community center, club house, and a local filling station</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Price Table */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <span className="label-caps text-[#7b002c] font-bold block">Pricing Matrix</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Block B Plots Price Ranges
                </h3>
                <p className="text-xs text-slate-600 font-sans">
                  Resale prices fluctuate depending on boulevard frontage, corner locations, or park proximity. Treat the ranges below as a starting point:
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                    <tr>
                      <th className="p-4">Plot Size</th>
                      <th className="p-4">Approximate Price Range (PKR)</th>
                      <th className="p-4">Market Demand</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">5 Marla</td>
                      <td className="p-4 font-bold">35 Lakh – 70 Lakh</td>
                      <td className="p-4 text-emerald-600 font-bold">Very High (Highly liquid resale)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">8 Marla</td>
                      <td className="p-4 font-bold">50 Lakh – 95 Lakh</td>
                      <td className="p-4 text-slate-500 font-medium">Moderate-High</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">10 Marla</td>
                      <td className="p-4 font-bold">75 Lakh – 1.25 Crore</td>
                      <td className="p-4 text-emerald-600 font-bold">High (Growing families)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">14 Marla</td>
                      <td className="p-4 font-bold">95 Lakh – 1.50 Crore</td>
                      <td className="p-4 text-slate-500 font-medium">Moderate</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">1 Kanal</td>
                      <td className="p-4 font-bold">1.15 Crore – 1.85 Crore</td>
                      <td className="p-4 text-slate-600 font-medium">Stable Long-term Value</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Why Invest & Booking Guide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Why Invest */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#7b002c] border-b border-slate-100 pb-2">
                  Why Invest in Block B?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Block B's position on the Grand Boulevard, directly linking to GT Road, gives it stronger commercial potential than some of the more residential-only blocks in the society. RDA approval reduces regulatory risk. Since original allotments have sold out, the active resale market signals real demand, making this a concrete investment zone.
                </p>
                <div className="text-[11px] text-slate-500 font-sans pt-1 border-t border-slate-50">
                  Compare cash deals with our <Link href="/payment-plan" className="text-[#7b002c] font-bold hover:underline">full payment plan options</Link>.
                </div>
              </div>

              {/* Booking Requirements */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  How to Book a Resale Plot
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans mb-2">
                  Booking a resale or available plot in Block B follows a standard process. You will generally need:
                </p>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-1">
                  <div>• Two copies of your CNIC (or <strong>NICOP</strong> for overseas clients)</div>
                  <div>• Two copies of your Next of Kin's CNIC</div>
                  <div>• Two passport-sized photographs</div>
                  <div>• Proof of booking/full payment depending on the deal structure</div>
                </div>
                <p className="text-[11px] text-slate-500 italic font-sans pt-1">
                  * Remote booking and bank transfers are supported directly for overseas buyers.
                </p>
              </div>

            </div>

            {/* Block Comparisons */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Block Comparison</span>
              <h3 className="font-serif text-xl font-bold text-white">Compare Block B vs Other Sectors</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl font-sans">
                The <Link href="/blocks/executive-block" className="text-amber-400 hover:underline">Executive Block</Link> and <Link href="/blocks/prime-block" className="text-amber-400 hover:underline">Prime Block</Link> tend to sit at a premium price point with centralized development. <Link href="/blocks/block-a" className="text-amber-400 hover:underline">Block A</Link> offers similar GT Road connection but different plot configurations. <Link href="/blocks/block-c" className="text-amber-400 hover:underline">Block C</Link> and <Link href="/blocks/block-d" className="text-amber-400 hover:underline">Block D</Link> vary in development phase. Block B stands out as the largest block in the society, situated between A and C on the main boulevard. If mixed-use potential, boulevard frontage, and diverse plot sizes matter most, Block B is the strongest fit.
              </p>
            </div>

            {/* Final Thoughts */}
            <div className="bg-[#ffe9e6]/20 p-8 rounded-2xl border border-[#7b002c]/10 text-xs text-slate-600 leading-relaxed font-sans space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#7b002c] uppercase tracking-wider">Final Thoughts</h4>
              <p>
                Faisal Hills Islamabad B Block stands out on solid fundamentals: RDA approval, central position on the main boulevard, visible on-the-ground utilities, and diverse plot sizes. Like all real estate, it requires due diligence — verifying current NOC status directly, getting terms in writing, and confirming timelines. If those checks come back clean, Block B is a genuinely solid option in this growing corridor.
              </p>
            </div>

          </div>
        )}

        {/* Block C SEO Content Expansion */}
        {block.slug === 'block-c' && (
          <div className="lg:col-span-12 space-y-12 pt-8 border-t border-slate-200">
            
            {/* SEO Content Introduction */}
            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4 font-sans">
              <p className="font-semibold text-base text-slate-950">
                If you've been comparing housing societies along GT Road, chances are Faisal Hills Block C has already come up in your search. It's one of the most talked-about sections of Faisal Hills — a premium, RDA approved housing society sitting between Block B and Block D, just off the main GT Road near Taxila and within comfortable driving distance of Islamabad. Block C blends residential and commercial plots, modern infrastructure, and a genuinely scenic setting close to the Margalla Hills, which is exactly why it keeps showing up on shortlists for both home-builders and investors.
              </p>
              <p>
                In this guide, we'll walk through everything you need before booking a plot here — location and accessibility, NOC status, plot sizes and the latest prices, amenities, development progress, and the booking process itself. We'll also flag a few things worth double-checking with the sales office before you commit, because that's the kind of detail an honest property guide should include.
              </p>
            </div>

            {/* Grid for Overview & Owners & Developers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Overview */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    Faisal Hills Block C Overview
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Faisal Hills Block C is developed under the Faisal Hills umbrella project by Zedem International, led by Chaudhry Abdul Majeed — the same team behind Faisal Town, Faisal Margalla City, and Faisal Residencia. Block C sits at a genuinely convenient point in the <Link href="/master-plan" className="text-[#7b002c] font-bold hover:underline">Faisal Hills master plan</Link>: it borders <Link href="/blocks/block-b" className="text-[#7b002c] font-bold hover:underline">Block B</Link> on one side and shares a boundary with New City Phase 2 on the other.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    This Block C residential community offers premium plots in sizes ranging from 5 Marla up to 1 Kanal for residential use, with a mix of commercial sizes suited to retail and small business space.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
                  Planned as a self-contained community with parks, mosques, and university plots.
                </p>
              </div>

              {/* Owners & Developers */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    Owners & Developers
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Faisal Hills, including Block C, is developed by Zedem International, a Pakistani real estate development company headed by Chaudhry Abdul Majeed. The same group has delivered Faisal Town, Faisal Margalla City, Faisal Residencia, and Faisal Villas, among other projects.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Chaudhry Abdul Majeed's track record matters when you're putting money into a housing scheme that's still under active development. Before transferring any booking amount, ask the sales office for layout plan approvals and confirm the legal status directly.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
                  Read more about layout updates in our <Link href="/plots" className="text-[#7b002c] font-bold hover:underline">NOC & Approvals</Link> section.
                </p>
              </div>

            </div>

            {/* NOC & Legal Status section */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                NOC & Regulatory Standing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Faisal Hills holds a No Objection Certificate (NOC) from the Rawalpindi Development Authority (RDA), which covers Block C as part of the wider project. In plain terms, being an RDA approved housing society means the layout plan has gone through regulatory review. It is one of the clearer signals that a housing project is operating within the legal framework rather than as an unauthorized scheme.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                NOC status for housing societies developed in phases can change as new blocks are added or amended, so confirm the current, block-specific approval status with RDA or the developer's office before booking, especially if you're buying for resale rather than to build immediately.
              </p>
            </div>

            {/* Location & Accessibility Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="label-caps text-[#7b002c] font-bold block">Connectivity</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Location & Accessibility Details
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-4xl">
                  Block C sits right on the main GT Road, between Block B and New City Phase 2, which is one of its biggest practical advantages. You're not buried deep inside the society — you're close to a major artery that connects straight through to Taxila, Rawalpindi, and Islamabad. From Block C, the M-1 Motorway is reachable via MPCHS Multi Gardens B-17 Block G, and Sangjani Toll Plaza puts you on a direct route toward Islamabad.
                </p>
              </div>

              {/* Drive Times Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-950 text-white rounded-3xl p-6 lg:p-10 border border-slate-800 shadow-lg">
                <div className="lg:col-span-4 space-y-4 flex flex-col justify-center">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Accessibility</span>
                  <h4 className="font-serif text-xl font-bold text-white">Drive Times from Block C</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Block C holds a highly strategic connection to the Rawalpindi-Islamabad metro area:
                  </p>
                </div>
                
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Taxila City / GT Road junction</span>
                    <span className="font-bold text-amber-400">5 - 10 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Multi Gardens B-17</span>
                    <span className="font-bold text-amber-400">10 - 15 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">HITEC University, Taxila</span>
                    <span className="font-bold text-amber-400">13 - 15 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Taxila Museum</span>
                    <span className="font-bold text-amber-400">17 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Sangjani Toll Plaza (M-1 Motorway)</span>
                    <span className="font-bold text-amber-400">20 - 24 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Islamabad (city center)</span>
                    <span className="font-bold text-amber-400">25 - 30 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Islamabad International Airport</span>
                    <span className="font-bold text-amber-400">35 - 40 mins</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Saddar, Rawalpindi</span>
                    <span className="font-bold text-amber-400">40 - 45 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Master Plan & Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Master Plan */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Master Plan & Scenic Layout
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  The master plan for Block C is built around a 100-foot-wide main boulevard with 40-foot internal streets, keeping both through-traffic and local movement smooth. The layout includes residential and commercial plots, several parks, mosques, educational institutions, a playground, a football ground, and a local filling station.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Because Block C has direct sightlines toward the surrounding hills, plots closer to the green belts and boulevard frontage tend to carry a premium over interior plots — something worth factoring into your budget if a scenic view near the Margalla Hills matters to you.
                </p>
              </div>

              {/* Residential & Commercial Plots */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Plots for Sale In Block C
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-3 pt-1">
                  <div>
                    <strong className="text-[#7b002c] block mb-0.5">Residential Sizes</strong>
                    5 Marla (25×50), 8 Marla (30×60), 10 Marla (35×70), 14 Marla (40×80), and 1 Kanal (50×90 or 60×90). Smaller plots suit first-time buyers seeking an affordable property investment.
                  </div>
                  <div>
                    <strong className="text-[#7b002c] block mb-0.5">Commercial Sizes</strong>
                    40×50, 40×60, 90×84, and 90×85. Boulevard-facing <Link href="/commercial" className="text-[#7b002c] font-bold hover:underline">commercial plots</Link> command a noticeably higher rate than interior commercial plots.
                  </div>
                </div>
              </div>

            </div>

            {/* Development Updates */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Development Status & Construction Progress
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Development in Block C is progressing steadily. The main boulevard, internal roads, streets, and service roads are largely complete and functional:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  <strong className="text-[#7b002c] block font-serif">Demarcation & Utilities</strong>
                  <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
                    The water supply channel has been built, plot cutting/demarcation is finished in most sectors, and a number of plots are already available for possession. Several commercial construction projects within the block are currently underway.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  <strong className="text-[#7b002c] block font-serif">Possession Logistics</strong>
                  <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
                    If possession timing matters to you, ask specifically which sector your shortlisted plot falls in, since development pace can vary noticeably between sectors of the same block.
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities and Facilities List */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Amenities & Facilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c] block">Infrastructure</span>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside font-sans">
                    <li>Sewerage treatment plant & solid waste management system</li>
                    <li>Reliable electricity & Sui gas connections plus water supply channels</li>
                    <li>Wide well-lit roads with a 100-foot main boulevard and 40-foot streets</li>
                    <li>Designated graveyard & local filling station</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c] block">Lifestyle & Community</span>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside font-sans">
                    <li>Seven mosques distributed across the block</li>
                    <li>Theme park offering recreation and family entertainment space</li>
                    <li>Manicured parks, green belts, playground, and a football ground</li>
                    <li>Four educational institutions — school, college, university, and vocational institute</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Price Table */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <span className="label-caps text-[#7b002c] font-bold block">Pricing Matrix</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Block C Plot Prices
                </h3>
                <p className="text-xs text-slate-600 font-sans">
                  The prices below show current market rates for Block C plots. Figures fluctuate depending on boulevard frontage, corner locations, or park proximity:
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                    <tr>
                      <th className="p-4">Plot Size</th>
                      <th className="p-4">Approximate Price Range (PKR)</th>
                      <th className="p-4">Market Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">5 Marla</td>
                      <td className="p-4 font-bold">65 Lac – 80 Lac</td>
                      <td className="p-4 text-emerald-600 font-bold">Active resale plots</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">10 Marla</td>
                      <td className="p-4 font-bold">1.20 Crore – 1.40 Crore</td>
                      <td className="p-4 text-emerald-600 font-bold">Active resale plots</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">1 Kanal</td>
                      <td className="p-4 font-bold">1.80 Crore – 2.0 Crore</td>
                      <td className="p-4 text-slate-600 font-medium">Boulevard-facing commands premium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Why Invest & Booking Guide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Why Invest */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#7b002c] border-b border-slate-100 pb-2">
                  Smart Investment Opportunity
                </h3>
                <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed font-sans">
                  <li>Direct GT Road frontage gives it accessibility advantages.</li>
                  <li>RDA approved housing society status adds a real layer of legal security.</li>
                  <li>Active, visible development reduces completion risk.</li>
                  <li>Mix of residential and commercial plots supports long-term demand.</li>
                  <li>Proximity to Taxila's educational institutions (like HITEC University) and Islamabad.</li>
                </ul>
              </div>

              {/* Booking Requirements */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Booking Process & Documents
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans mb-2">
                  Booking is standard, but check requirements beforehand to avoid extra trips. You will generally need:
                </p>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-1">
                  <div>• Copy of your CNIC (2 photocopies)</div>
                  <div>• Two recent passport-size photographs</div>
                  <div>• Copy of your next-of-kin's CNIC</div>
                  <div>• Complete booking amount or down payment</div>
                </div>
                <div className="text-[11px] text-slate-500 italic font-sans pt-1 border-t border-slate-50">
                  View installment details on our site's <Link href="/payment-plan" className="text-[#7b002c] font-bold hover:underline">payment plan</Link> guide.
                </div>
              </div>

            </div>

            {/* Block Comparisons */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Block Comparison</span>
              <h3 className="font-serif text-xl font-bold text-white">Compare Block C vs Other Sectors</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl font-sans">
                Review the layout plan of <Link href="/blocks/block-b" className="text-amber-400 hover:underline">Block B</Link> for Grand Boulevard proximity, or check <Link href="/blocks/block-d" className="text-amber-400 hover:underline">Block D</Link> for newer development phases. For related mixed-use developments, view details of <Link href="/blocks/executive-block" className="text-amber-400 hover:underline">Executive Block</Link> or details of <Link href="/blocks/faisal-jewel-islamabad" className="text-amber-400 hover:underline">Faisal Jewels</Link>.
              </p>
            </div>

            {/* CTA panel */}
            <div className="bg-[#4c050d] text-white rounded-3xl p-10 border border-[#7b002c] shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Ready to Invest?</span>
                <h2 className="font-serif font-bold text-3xl text-white">
                  Secure Your Plot In Faisal Hills Block C Today
                </h2>
                <p className="text-slate-200 text-xs leading-relaxed">
                  Review the latest map layout and confirm pricing options. Connect with our sales desk to book a plot or contact our sales team.
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

            {/* Final Thoughts */}
            <div className="bg-[#ffe9e6]/20 p-8 rounded-2xl border border-[#7b002c]/10 text-xs text-slate-600 leading-relaxed font-sans space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#7b002c] uppercase tracking-wider">Final Thoughts</h4>
              <p>
                Faisal Hills Block C brings together what most buyers are actually looking for: an RDA approved housing society, direct GT Road access, a genuine mix of residential and commercial plots, real amenities rather than promised ones, and visible construction progress on the ground. Whether you're planning to build a home near Taxila and Islamabad or simply looking for a high ROI real estate investment with manageable entry pricing, Block C is worth a closer look.
              </p>
            </div>

          </div>
        )}

        {/* Block D SEO Content Expansion */}
        {block.slug === 'block-d' && (
          <div className="lg:col-span-12 space-y-12 pt-8 border-t border-slate-200">
            
            {/* SEO Content Introduction */}
            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4 font-sans">
              <p className="font-semibold text-base text-slate-950">
                If you have been comparing options along the Islamabad–Taxila corridor, you have almost certainly come across Faisal Hills D Block. It is one of the newer residential blocks inside the wider Faisal Hills project, and it has picked up attention for a fairly practical reason: it combines reachable plot sizes with a location that sits close to two of the region's most important road links — GT Road and the M-1 Motorway.
              </p>
              <p>
                Most people arrive at this page with one of four questions. Where exactly is it? What do plots cost right now? What does the instalment schedule look like? And is it actually a sensible place to put money? We would rather you make a decision you are still comfortable with in three years than book something today on the strength of a marketing line. Compare this block with the <Link href="/faisal-hills-islamabad" className="text-[#7b002c] font-bold hover:underline">full Faisal Hills Islamabad</Link> project overview first.
              </p>
            </div>

            {/* Grid for Location & Access */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Where is Block D located */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    Faisal Hills D Block Location and Access
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    The simplest way to picture the D Block Faisal Hills location is to think of the stretch of GT Road that runs between Tarnol and Taxila. Faisal Hills sits on this corridor, and D Block occupies a section of that scheme.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    D Block fronts onto the main GT Road corridor (N-5), which remains the everyday artery for local commuting, commercial traffic, and access toward both Rawalpindi and Wah Cantt. It borders <Link href="/blocks/block-c" className="text-[#7b002c] font-bold hover:underline">Faisal Hills Block C</Link> and <Link href="/blocks/block-b" className="text-[#7b002c] font-bold hover:underline">Faisal Hills Block B</Link>.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
                  Dual road access ensures connection to GT Road and M-1 Motorway.
                </p>
              </div>

              {/* Road Access & Connectivity details */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    Motorway & Regional Highway Links
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    The Faisal Hills D Block M-1 Motorway connection via the Brahma Jhang Bahtar Interchange gives residents a controlled-access route toward Islamabad on one side and Peshawar on the other. For anyone commuting into the capital, this is the meaningful part.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Nearby areas include Taxila, Wah, Tarnol and the outer Islamabad and Rawalpindi belt. Road infrastructure like Taxila Bypass, N-80, and Margalla Avenue affect long-term accessibility.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
                  Verify national corridor routes on the <a href="https://nha.gov.pk/" target="_blank" rel="noopener noreferrer" className="text-[#7b002c] font-bold hover:underline">National Highway Authority</a> website.
                </p>
              </div>

            </div>

            {/* Master Plan & Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Master Plan */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  D Block Master Plan and Layout
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  The Faisal Hills D Block layout follows a planned scheme: a main boulevard feeding into secondary roads, with residential streets branching off. Value inside the block is shaped by road width (boulevard command premium), corner position surcharges, and proximity to planned parks.
                </p>
                <div className="text-[11px] text-slate-500 font-sans pt-1 border-t border-slate-50">
                  Ask us for the version of the <Link href="/blocks/block-d" className="text-[#7b002c] font-bold hover:underline">Faisal Hills D Block map</Link> showing plot numbering.
                </div>
              </div>

              {/* Plot Categories */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Plot Categories Available
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-2 pt-1">
                  <div>• <strong>5 Marla (25×50)</strong> — Lowest entry point; easiest size to resell.</div>
                  <div>• <strong>8 Marla (30×60) & 10 Marla (35×70)</strong> — Ideal for home-builders.</div>
                  <div>• <strong>14 Marla (40×80)</strong> — Kanal-adjacent space at a lower entry price.</div>
                  <div>• <strong>1 Kanal (50×90)</strong> — Estate plots for larger residential builds.</div>
                  <div>• <strong>Commercial Plots</strong> — Standard developer sizes along main boulevards.</div>
                </div>
              </div>

            </div>

            {/* Price Table */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <span className="label-caps text-[#7b002c] font-bold block">Pricing Matrix</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  D Block Plot Price Ranges
                </h3>
                <p className="text-xs text-slate-600 font-sans">
                  Resale prices fluctuate depending on boulevard frontage, corner locations, or park proximity. Treat the ranges below as a starting point:
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                    <tr>
                      <th className="p-4">Plot Size</th>
                      <th className="p-4">Approximate Price Range (PKR)</th>
                      <th className="p-4">Market Demand</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">5 Marla</td>
                      <td className="p-4 font-bold">40 Lakh – 65 Lakh</td>
                      <td className="p-4 text-emerald-600 font-bold">High (Broadest resale audience)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">8 Marla</td>
                      <td className="p-4 font-bold">50 Lakh – 80 Lakh</td>
                      <td className="p-4 text-slate-500 font-medium">Moderate-High</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">10 Marla</td>
                      <td className="p-4 font-bold">70 Lakh – 1.05 Crore</td>
                      <td className="p-4 text-emerald-600 font-bold">High (Home-builders)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">14 Marla</td>
                      <td className="p-4 font-bold">85 Lakh – 1.25 Crore</td>
                      <td className="p-4 text-slate-500 font-medium">Moderate</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">1 Kanal</td>
                      <td className="p-4 font-bold">1.10 Crore – 1.65 Crore</td>
                      <td className="p-4 text-slate-600 font-medium">Stable Long-term Value</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-slate-500 italic font-sans">
                * Note: Corner surcharges, transfer fees, and possession dues may apply. Ask for a written itemised total before you pay anything.
              </p>
            </div>

            {/* Payment Plan Section */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Payment Plan & Instalment Schedule
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                The instalment plan for Block D is structured with a down payment at booking, followed by instalments spread across a defined period. Compare options with the <Link href="/faisal-hills-payment-plan" className="text-[#7b002c] font-bold hover:underline">Faisal Hills payment plan across all blocks</Link>:
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[10px]">Down Payment</span>
                  <span className="font-bold text-slate-900">10% - 20%</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[10px]">Frequency</span>
                  <span className="font-bold text-slate-900">Quarterly</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[10px]">Duration</span>
                  <span className="font-bold text-slate-900">2 - 3 Years</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block uppercase text-[10px]">Possession</span>
                  <span className="font-bold text-[#7b002c]">Handover linked</span>
                </div>
              </div>
            </div>

            {/* Investment Analysis */}
            <div className="bg-[#ffe9e6]/20 p-8 rounded-2xl border border-[#7b002c]/10 text-xs text-slate-600 leading-relaxed font-sans space-y-4">
              <h3 className="font-serif font-bold text-sm text-[#7b002c] uppercase tracking-wider">Is Faisal Hills D Block a Good Investment?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <strong className="text-slate-900 block font-serif">The Case for It</strong>
                  <p>
                    The Faisal Hills D Block investment potential rests mainly on location fundamentals rather than speculation. Road connectivity of this quality — a national highway on one side, a motorway interchange on the other — is not built twice. Corridors with genuine access hold value during slow markets.
                  </p>
                </div>
                <div className="space-y-2">
                  <strong className="text-slate-900 block font-serif">The Case for Caution</strong>
                  <p>
                    Returns depend on Faisal Hills D Block development status progressing on schedule. Before committing, verify the current on-ground status. Also verify the regulatory approval and NOC status directly with the Rawalpindi Development Authority (RDA).
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Steps vertical stepper */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                How to Book a Plot in Faisal Hills D Block
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
                <div className="space-y-1">
                  <span className="text-xl font-bold text-[#7b002c]">01</span>
                  <strong className="text-slate-900 block">Identify Size & Budget</strong>
                  <p className="text-slate-600">
                    Select residential (5 Marla entry point to 1 Kanal estate plots) or commercial plots in D Block.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xl font-bold text-[#7b002c]">02</span>
                  <strong className="text-slate-900 block">Confirm Full Cost</strong>
                  <p className="text-slate-600">
                    Verify base price, surcharges, and transfer dues. Learn about <Link href="/plots-for-sale-taxila" className="text-[#7b002c] font-bold hover:underline">plots for sale in Taxila</Link> rates.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xl font-bold text-[#7b002c]">03</span>
                  <strong className="text-slate-900 block">Submit Documents</strong>
                  <p className="text-slate-600">
                    Submit CNIC copies, photos, and down payment. Verify society files for safety.
                  </p>
                </div>
              </div>
            </div>

            {/* Block Comparisons */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Block Comparison</span>
              <h3 className="font-serif text-xl font-bold text-white">Compare D Block vs Other Sectors</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl font-sans">
                Compare development phases with <Link href="/blocks/block-c" className="text-amber-400 hover:underline">Block C</Link> or <Link href="/blocks/block-b" className="text-amber-400 hover:underline">Block B</Link>. If mixed-use developments matter, check the <Link href="/blocks/executive-block" className="text-amber-400 hover:underline">Executive Block</Link> layout details.
              </p>
            </div>

          </div>
        )}

        {/* Block B1 Extension SEO Content Expansion */}
        {block.slug === 'block-b1-extension' && (
          <div className="lg:col-span-12 space-y-12 pt-8 border-t border-slate-200">
            
            {/* SEO Content Introduction */}
            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4 font-sans">
              <p className="font-semibold text-base text-slate-950">
                Beyond the map and marketing claims, discover the real location, current prices, development status and investment potential of Faisal Hills B1 Extension before you make a decision.
              </p>
              <p>
                The land sits inside an RDA-approved scheme built by Faisal Town Group, the team behind Faisal Town Phase 1, Faisal Margalla City and Faisal Residencia. The society holds a No Objection Certificate covering roughly 11,823 kanals, and its gate opens onto the Grand Trunk Road between Rawalpindi and Taxila. Approval and access are what separate a plot you can build on from a file you get stuck with.
              </p>
              <p>
                What makes Faisal Hills B Extension worth a look is simple arithmetic. It carries one of the lowest entry prices in the whole scheme while sharing the same NOC, the same developer and the same road network as blocks where families already live.
              </p>
            </div>

            {/* Grid for Sector Differences & Accessibility */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Sector differences */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    What Makes This Block Different?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Think of it as the affordable sibling in an established family. It was carved out later to absorb demand from buyers priced out of the Executive Block and Block A, and it stays compact by design, roughly 650 homes plus a small business pocket. Smaller also means quicker: fewer roads to lay and a shorter runway to completion.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Three profiles do well here: the salaried buyer who wants legally clean land without a crore-plus budget; the patient investor comfortable holding two to four years; and the family planning a modest 5 or 8 marla home in a quiet street.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
                  Ideal entry point for home builders, first-time buyers & long-term investors.
                </p>
              </div>

              {/* Location & Access */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                    Location & Connectivity Explained
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Location is the one thing you cannot renovate later, so precision matters. The society entrance sits on the main GT Road (N-5) near the Taxila Bypass, and this pocket lies inside the boundary beside <Link href="/blocks/block-b" className="text-[#7b002c] font-bold hover:underline">Block B</Link>, with <Link href="/blocks/block-a" className="text-[#7b002c] font-bold hover:underline">Block A</Link>, <Link href="/blocks/block-d" className="text-[#7b002c] font-bold hover:underline">Block D</Link> and the Prime Block as neighbours.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    From the main gate you reach the highway in minutes via a wide approach road. Sector B-17 Islamabad lies just east, and its rates now sit far above what comparable land costs here.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic font-sans pt-2 border-t border-slate-50">
                  Motorway links and future interchange advantage will shorten travel times.
                </p>
              </div>

            </div>

            {/* Travel Times Landmarks */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 lg:p-10 border border-slate-800 shadow-lg space-y-6">
              <div className="space-y-2">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Landmarks</span>
                <h4 className="font-serif text-2xl font-bold text-white">Nearby Landmarks & Institutions</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-3xl">
                  Daily life leans on institutions that already exist. UET Taxila, HITEC University and Wah Medical College sit within a short radius and keep rental demand steady. The heritage sites of ancient Taxila draw visitors year round, the airport is reachable by motorway, and central Rawalpindi is a straight run down the highway. B Extension Faisal Hills Taxila plugs into a working city rather than waiting for one.
                </p>
              </div>
            </div>

            {/* Master Plan & Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Master Plan layout */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Master Plan & Layout Organisation
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  The Faisal Hills B Extension master plan gives most of the land to housing, with roughly 457 plots of 5 marla, 167 of 8 marla and 28 of 10 marla, plus 34 commercial units. Shops are grouped along the wider internal roads rather than scattered through the lanes, so the commercial area stays reachable without pushing traffic past bedroom windows. A mosque, a park, green belts and a reserved high-rise apartment site complete the plan.
                </p>
              </div>

              {/* Road network */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Road Network & Map Reading
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Internal streets feed into the wider society road network, which connects to the main boulevard and out to the highway. Lanes are sized for two-way movement plus parking, while the access roads linking this pocket to Block B carry the heavier flow.
                </p>
                <p className="text-xs text-slate-606 leading-relaxed font-sans">
                  Sit with the official drawing to locate your plot number, the nearest park or mosque, and walk the ground. Reading the Faisal Hills B Extension map exposes what actually decides resale value.
                </p>
              </div>

            </div>

            {/* Plot Sizes & Premium */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Available Plot Sizes & Surcharge Premiums
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 text-xs">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c] block">Plot Formats</span>
                  <div className="text-slate-600 space-y-2 font-sans">
                    <div>• <strong>5 Marla (25×50)</strong> — Fast resale category.</div>
                    <div>• <strong>8 Marla (30×60)</strong> — Ideal double storey size.</div>
                    <div>• <strong>10 Marla (35×65)</strong> — Scarce at fewer than thirty units.</div>
                    <div>• <strong>Commercial Plots</strong> — 4.8 Marla (30×40) and 7.2 Marla (40×45) formats.</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c] block">Premium Rates</span>
                  <p className="text-slate-600 font-sans leading-relaxed">
                    Corner units typically add ten to fifteen percent for two open sides and better light. Boulevard and main-road plots add around ten. Park-facing units carry their own surcharge, since an open view cannot be built out later.
                  </p>
                </div>
              </div>
            </div>

            {/* Price Table */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <span className="label-caps text-[#7b002c] font-bold block">Pricing Matrix</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  B1 Extension Plot Price Ranges
                </h3>
                <p className="text-xs text-slate-600 font-sans">
                  The prices below show current market rates for B1 Extension plots. Resale values shift depending on development status and street position:
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#4c050d] text-white uppercase text-[10px] tracking-wider font-semibold border-b border-[#7b002c]">
                    <tr>
                      <th className="p-4">Plot Size</th>
                      <th className="p-4">Approximate Price Range (PKR)</th>
                      <th className="p-4">Market Demand</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">5 Marla Residential</td>
                      <td className="p-4 font-bold">50 Lakh – 60 Lakh</td>
                      <td className="p-4 text-emerald-600 font-bold">Very High (Fastest moving)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">8 Marla Residential</td>
                      <td className="p-4 font-bold">75 Lakh – 90 Lakh</td>
                      <td className="p-4 text-slate-500 font-medium">Moderate</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-[#7b002c]">10 Marla Residential</td>
                      <td className="p-4 font-bold">1.0 Crore – 1.2 Crore</td>
                      <td className="p-4 text-emerald-600 font-bold">High (Scarce availability)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-slate-500 italic font-sans">
                * Note: Corner surcharges, transfer fees, and possession dues may apply. Prices are lower here than in Block A or the Executive Block due to the early development stage.
              </p>
            </div>

            {/* Payment & Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Payment Details */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Payment Plan Options
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  The Faisal Hills B Extension payment plan has historically been offered with a down payment and quarterly instalments over roughly four years. Much of the residential inventory has recently moved to full-cash pricing, with instalments concentrated in commercial units. Buyers paying in full at booking are typically offered a discount of around twenty percent.
                </p>
                <div className="text-[11px] text-slate-500 font-sans pt-1 border-t border-slate-50">
                  Compare plans in our <Link href="/faisal-hills-payment-plan" className="text-[#7b002c] font-bold hover:underline">payment plans across blocks</Link> section.
                </div>
              </div>

              {/* Documents Required */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                  Booking Process & Documents
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans mb-2">
                  Keep paperwork ready to secure your plot number:
                </p>
                <div className="text-xs text-slate-700 leading-relaxed font-sans space-y-1">
                  <div>• CNIC copies (or NICOP and passport for overseas clients)</div>
                  <div>• Two passport-size photographs</div>
                  <div>• CNIC copy of your nominee or next of kin</div>
                  <div>• Pay order or demand draft in the developer name</div>
                </div>
              </div>

            </div>

            {/* Development Status */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Development Status & Earthwork Progress
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Earthworks and infrastructure are active:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  <strong className="text-[#7b002c] block font-serif">Earthworks & Road Formation</strong>
                  <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
                    Levelling and plot demarcation are complete, and street boundaries are marked. Road formation is in progress with heavy machinery active. Trenching for underground utility mapping and sewerage conduits has begun.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                  <strong className="text-[#7b002c] block font-serif">Possession Outlook</strong>
                  <p className="text-slate-600 font-sans leading-relaxed text-[11px]">
                    Faisal Hills B Extension possession remains tied to the completion of road and utility work. For families wanting to break ground immediately, other blocks with confirmed possession status might be a better fit.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Invest list */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-2">
                Why Invest in Block B1 Extension?
              </h3>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed font-sans">
                <li><strong>Lowest Entry Point:</strong> This block ranks among the most affordable inside a proven housing society.</li>
                <li><strong>Capital Appreciation Drivers:</strong> Repricing occurs as possession handovers start, motorway interchange links open, and CPEC alignments develop.</li>
                <li><strong>Captive Commercial Yields:</strong> Shop units have strong rental potential serving a compact community of several hundred households.</li>
              </ul>
            </div>

            {/* Block Comparisons */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Block Comparison</span>
              <h3 className="font-serif text-xl font-bold text-white">Compare B1 Extension vs Other Sectors</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl font-sans">
                Review development timelines of <Link href="/blocks/block-c" className="text-amber-400 hover:underline">Block C</Link> and <Link href="/blocks/block-d" className="text-amber-400 hover:underline">Block D</Link>, or look up detailed layouts of the <Link href="/blocks/executive-block" className="text-amber-400 hover:underline">Executive Block</Link>.
              </p>
            </div>

          </div>
        )}

        {/* Sector Amenities - Full Width Visual Photo Grid */}
        <div className="lg:col-span-12 space-y-6 pt-4">
          <div className="space-y-2">
            <span className="label-caps text-[#7b002c] font-bold block">World-Class Facilities</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Sector Amenities & Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {block.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 h-64 flex flex-col justify-end p-5 cursor-pointer bg-slate-950"
              >
                {/* Background Photo Image */}
                <img
                  src={amenity.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=75'}
                  alt={amenity.name}
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay for Crisp Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent transition-opacity group-hover:opacity-90" />

                {/* Top Icon Badge */}
                <div className="absolute top-4 left-4 z-10 w-10 h-10 bg-[#7b002c] text-white rounded-xl flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  {getAmenityIcon(amenity.icon)}
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-1 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Verified Feature</span>
                  <h4 className="font-serif font-bold text-lg text-white leading-snug group-hover:text-amber-200 transition-colors">
                    {amenity.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2">
                    {amenity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Interactive Master Plan Map for this specific block */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-4">
        <div className="space-y-1">
          <span className="label-caps text-[#7b002c] font-bold block">Vector Sector Map</span>
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            {block.name} Master Plan & Plot Locations
          </h2>
        </div>
        <InteractiveMasterPlan initialBlockSlug={block.slug} />
      </section>

      {/* Plots for Sale Gallery */}
      {blockPlots.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <span className="label-caps text-[#7b002c] font-bold block">Verified Listings</span>
              <h2 className="font-serif text-3xl font-bold text-slate-900">
                Available Plots in {block.name}
              </h2>
              <p className="text-xs text-slate-500 font-sans max-w-xl">
                Browse verified residential, commercial, and specialty plots currently listed in this sector. All prices are indicative market rates.
              </p>
            </div>
            <Link
              href="/plots"
              className="shrink-0 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>View All {block.name} Plots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blockPlots.map((plot) => (
              <div
                key={plot.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden flex flex-col"
              >
                {/* Plot Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={plot.image || '/images/faisal-hills-aerial.jpg'}
                    alt={`Plot ${plot.plotNumber} in ${block.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full shadow border border-white/20 ${
                      plot.status === 'Available' ? 'bg-emerald-600 text-white' :
                      plot.status === 'Reserved' ? 'bg-amber-600 text-white' :
                      'bg-slate-700 text-white'
                    }`}>
                      {plot.status}
                    </span>
                    <span className="text-[9px] font-bold px-2.5 py-1 rounded-full shadow bg-[#7b002c] text-white border border-white/20">
                      {plot.category}
                    </span>
                  </div>

                  {/* Plot Number */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[9px] text-slate-300 block font-semibold uppercase tracking-wider">Plot</span>
                    <span className="font-serif font-bold text-lg leading-none">#{plot.plotNumber}</span>
                  </div>
                </div>

                {/* Plot Details */}
                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 block text-[9px] uppercase font-semibold">Size</span>
                        <strong className="text-slate-900 font-bold">{plot.size}</strong>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 block text-[9px] uppercase font-semibold">Facing</span>
                        <strong className="text-slate-900 font-bold">{plot.facing}</strong>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 block text-[9px] uppercase font-semibold">Dimensions</span>
                        <strong className="text-slate-900 font-bold">{plot.dimensions}</strong>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 block text-[9px] uppercase font-semibold">Trend</span>
                        <strong className="text-emerald-600 font-bold text-[10px]">{plot.priceHistoryTrend}</strong>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2 font-sans">{plot.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase block font-semibold">Demand Price</span>
                      <span className="font-serif font-bold text-lg text-[#7b002c]">{plot.priceFormatted}</span>
                    </div>
                    <a
                      href={`https://wa.me/923044811717?text=I'm interested in Plot ${plot.plotNumber} (${plot.size}) in ${block.name}, Faisal Hills. Price: ${plot.priceFormatted}. Please share more details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-[10px] font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Compare other blocks callout - Premium Floating Glass Cards Grid */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-6 pb-4">
        <div className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#7b002c] uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full inline-block">
              Society Sectors
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Compare with Other Faisal Hills Blocks
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Select another block sector to compare prices, possession timelines, and community amenities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {otherBlocks.map((ob) => (
              <Link
                key={ob.id}
                href={`/blocks/${ob.slug}`}
                className="bg-white rounded-3xl border border-slate-200 hover:border-[#7b002c]/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group flex flex-col overflow-hidden h-[250px]"
              >
                {/* Block Image Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden bg-slate-900">
                  <img
                    src={ob.heroImage || ob.masterPlanImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=75'}
                    alt={ob.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="text-[8px] font-bold text-white bg-[#7b002c] border border-white/20 px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                      {ob.category === 'developed' ? 'Developed' : 'VIP Enclave'}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#7b002c] transition-colors line-clamp-1">
                      {ob.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed font-sans">
                      {ob.subtitle || 'Premium residential and commercial plots.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                    <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 group-hover:bg-[#7b002c]/10 group-hover:text-[#7b002c] px-2 py-0.5 rounded transition-colors">
                      {ob.status === 'Possession Ready' || ob.status === 'Fully Developed & Populated' ? 'Ready' : 'Progress'}
                    </span>
                    <span className="text-[10px] font-bold text-[#7b002c] flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Official Faisal Jewels Project Showcase (Only for Faisal Jewels) */}
      {block.id === 'faisal-jewels' && (
        <>
          {/* Project Highlights Grid */}
          <section className="bg-slate-950 text-white py-14 px-6 lg:px-12 rounded-3xl max-w-[1440px] mx-auto border border-[#7b002c]/40 shadow-2xl relative overflow-hidden space-y-10">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7b002c]/30 rounded-full blur-[140px] pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6 relative z-10">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Project Stats</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                  Project Highlights at a Glance
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                  Jointly developed by <strong className="text-white font-semibold">{faisalJewelsSpecs.developer}</strong> at the crossroads of Margalla Avenue, GT Road & M1 Motorway.
                </p>
              </div>
              <div className="bg-[#7b002c] text-white px-5 py-3 rounded-2xl shadow-lg border border-white/20 text-center shrink-0">
                <span className="text-[10px] uppercase block tracking-wider font-semibold text-amber-200">Target Completion</span>
                <span className="font-serif font-bold text-xl">{faisalJewelsSpecs.completionDate}</span>
              </div>
            </div>

            {/* 8 Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 relative z-10">
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center space-y-1">
                <span className="font-serif font-bold text-3xl text-amber-400 block">27</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Floors</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center space-y-1">
                <span className="font-serif font-bold text-3xl text-white block">1,000+</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Parking Spaces</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center space-y-1">
                <span className="font-serif font-bold text-3xl text-white block">350+</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Commercial Shops</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center space-y-1">
                <span className="font-serif font-bold text-3xl text-white block">250+</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Apartments</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center space-y-1 col-span-2 sm:col-span-1">
                <span className="font-serif font-bold text-2xl text-emerald-400 block">Q4 2027</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Completion</span>
              </div>
            </div>
          </section>

          {/* Prime Location & Surroundings table */}
          <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
            <div className="space-y-1 border-b border-slate-200 pb-4">
              <span className="label-caps text-[#7b002c] font-bold block">Crossroads of Margalla Avenue, GT Road & M1</span>
              <h2 className="font-serif text-3xl font-bold text-slate-900">
                Prime Location: Where Everything Connects
              </h2>
              <p className="text-sm text-slate-600 max-w-4xl">
                Faisal Jewel Islamabad occupies a prime location at the junction of GT Road Taxila, Margalla Avenue, and the M-1 Motorway. This strategic positioning provides residents and shoppers direct, traffic-free access to central Islamabad and Rawalpindi.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-xl text-[#7b002c]">Nearby Landmarks and Distances</h3>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-semibold">
                    <tr>
                      <th className="p-4">Landmark</th>
                      <th className="p-4">Significance / Drive Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {faisalJewelsSurroundings.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-[#7b002c]">{item.name}</td>
                        <td className="p-4 text-slate-600 font-semibold">{item.distance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Faisal Jewel Apartments for Sale in Islamabad */}
          <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
            <div className="space-y-2 border-b border-slate-200 pb-4">
              <span className="label-caps text-[#7b002c] font-bold block">18 Floors of Premium Residences</span>
              <h2 className="font-serif text-3xl font-bold text-slate-900">
                Faisal Jewel Apartments for Sale in Islamabad
              </h2>
              <p className="text-sm text-slate-600 max-w-4xl">
                Faisal Jewel features 18 floors of premium apartments for sale in Faisal Hills. These 250 luxury residential units offer spacious floor plans, imported fittings, and panoramic views of the Margalla Hills. Residents enjoy access to a swimming pool, rooftop lounge, and 24/7 security.
              </p>
            </div>

            {/* One-Bedroom Layout details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl p-6 lg:p-10 border border-slate-200 shadow-sm">
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#7b002c] bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">Unit Floor Plan</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">
                    One-Bedroom Apartment — Floor Plan & Features
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  The 1-bedroom luxury apartments span a generous 1,295 sq. ft., featuring an open-plan layout, modern kitchen, and spacious master suite. These units are ideal for both premium living and high-yield short-term rentals managed by the hotel operator.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-500">Total Area</span>
                    <span className="font-bold text-[#7b002c] font-serif">{faisalJewelsApartmentDetails.totalArea}</span>
                  </div>
                  {faisalJewelsApartmentDetails.breakdown.map((item, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-500">{item.label}</span>
                      <span className="font-bold text-[#7b002c] font-serif">{item.area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 h-80">
                <img
                  src="/faisal-jewel.jpg"
                  alt="Faisal Jewel Apartment Layout"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Luxury Hotel Serviced Suites</span>
                  <h4 className="font-serif font-bold text-xl text-white">Total Area: {faisalJewelsApartmentDetails.totalArea}</h4>
                </div>
              </div>
            </div>
          </section>

          {/* Commercial Shops for Sale in Faisal Jewel */}
          <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
            <div className="space-y-2 border-b border-slate-200 pb-4">
              <span className="label-caps text-[#7b002c] font-bold block">6 Dedicated Retail Floors</span>
              <h2 className="font-serif text-3xl font-bold text-slate-900">
                Commercial Shops for Sale in Faisal Jewel
              </h2>
              <p className="text-sm text-slate-600 max-w-4xl">
                Faisal Jewel features 6 dedicated commercial floors with 350+ shops for sale in Faisal Hills. This retail hub serves as a high-footfall business zone fueled by residential apartments, hotel guests, and a 1,000-car parking garage.
              </p>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <h3 className="font-serif font-bold text-xl text-[#7b002c]">Why Invest in Faisal Jewel Commercial Property</h3>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-800">
                <li className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                  <span>Strategic location at a triple-artery intersection guarantees consistent foot traffic from day one.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                  <span>Captive customer base: 250 apartments, hotel guests, and a 1,000-space parking facility feed retail floors.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                  <span>Northern Pakistan tourism route places Faisal Jewel in the path of a rapidly growing visitor economy.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                  <span>Commercial property in mixed-use high-rises consistently outperforms standalone retail in capital appreciation.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                  <span>Flexible payment plan allows investors to secure a shop with a manageable initial outlay.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#7b002c] shrink-0 mt-0.5" />
                  <span>Early-stage pricing: shops purchased now are expected to command significant premiums post-completion.</span>
                </li>
              </ul>

              <p className="text-slate-600 text-xs leading-relaxed pt-2">
                With high ROI potential and strong rental yields, commercial shops in Faisal Jewel represent a secure real estate investment. Contact our sales desk to check available shop sizes, layout locations, and flexible payment plan options.
              </p>
            </div>
          </section>

          {/* 4-Star Hotel Experience Banner */}
          <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="bg-gradient-to-r from-[#091522] via-[#0f243a] to-[#091522] text-white rounded-3xl p-8 lg:p-12 border border-[#7b002c]/50 shadow-2xl space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">{faisalJewelsHotelExperience.title}</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white italic">
                  “{faisalJewelsHotelExperience.tagline}”
                </h3>
                <p className="text-slate-300 text-xs max-w-lg mx-auto leading-relaxed pt-1">
                  The hotel is designed for business travellers, families, and tourists. Apartment owners can participate in the hotel's managed short-term rental pool to generate consistent passive income.
                </p>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
                {faisalJewelsHotelExperience.features.map((feature, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-full text-xs font-semibold text-white flex items-center gap-2 shadow-sm">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Development Progress Section (For non-executive blocks) */}
      {block.slug !== 'executive-block' && block.developmentUpdates.length > 0 && (
        <section className="bg-slate-100 py-12 px-6 lg:px-12 border-y border-slate-200">
          <div className="max-w-[1440px] mx-auto space-y-8">
            <div className="space-y-1">
              <span className="label-caps text-[#7b002c] font-bold block">On-Site Status</span>
              <h2 className="font-serif text-3xl font-bold text-slate-900">
                Development Progress & Construction Updates
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {block.developmentUpdates.map((update, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-serif font-bold text-lg text-[#7b002c]">{update.title}</span>
                    <span className="text-slate-500 font-semibold">{update.date}</span>
                  </div>
                  <p className="text-xs text-slate-600">{update.text}</p>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-[#7b002c]">Completion Stage:</span>
                      <span className="text-[#7b002c] font-bold">{update.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#7b002c] h-full rounded-full transition-all duration-500"
                        style={{ width: `${update.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dedicated Payment Plan Section for Faisal Jewels */}
      {block.id === 'faisal-jewels' && (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <span className="label-caps text-[#7b002c] font-bold block">Official Price Schedule</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Faisal Jewel Payment Plan — Flexible and Investor-Friendly
            </h2>
            <p className="text-xs text-slate-600 max-w-4xl leading-relaxed">
              Faisal Jewel offers a flexible 4-year installment plan spread over 16 quarterly payments. This structure makes securing luxury apartments or retail shops in Faisal Hills accessible without upfront capital strains.
            </p>
          </div>

          {/* Residential Table Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-5 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Residential Payment Plan (Apartments)</h3>
                <p className="text-xs text-slate-400">16 Quarterly Installments (48 Months)</p>
              </div>
              <span className="bg-[#7b002c] text-white text-xs font-bold px-3 py-1 rounded-full">
                {faisalJewelResidentialPlan.floor}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-800 text-slate-300 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Unit Types</th>
                    <th className="p-3">Floor</th>
                    <th className="p-3">Rate Per Sq.Ft.</th>
                    <th className="p-3 text-center" colSpan={2}>GFA (Sq.Ft.)</th>
                    <th className="p-3 text-center" colSpan={2}>Down Payment @ 25%</th>
                    <th className="p-3 text-center" colSpan={2}>Total Price</th>
                  </tr>
                  <tr className="bg-slate-800/80 text-[9px] text-slate-400">
                    <th className="p-1"></th>
                    <th className="p-1"></th>
                    <th className="p-1"></th>
                    <th className="p-1 text-center">Min</th>
                    <th className="p-1 text-center">Max</th>
                    <th className="p-1 text-center">Min (PKR)</th>
                    <th className="p-1 text-center">Max (PKR)</th>
                    <th className="p-1 text-center">Min (PKR)</th>
                    <th className="p-1 text-center">Max (PKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr>
                    <td className="p-3.5 font-bold text-amber-300">{faisalJewelResidentialPlan.unitType}</td>
                    <td className="p-3.5">{faisalJewelResidentialPlan.floor}</td>
                    <td className="p-3.5 font-bold">PKR {faisalJewelResidentialPlan.ratePerSqFtFormatted}</td>
                    <td className="p-3.5 text-center font-bold">{faisalJewelResidentialPlan.gfaMin.toLocaleString()}</td>
                    <td className="p-3.5 text-center font-bold">{faisalJewelResidentialPlan.gfaMax.toLocaleString()}</td>
                    <td className="p-3.5 text-center font-bold text-emerald-400">{faisalJewelResidentialPlan.downPaymentMinFormatted}</td>
                    <td className="p-3.5 text-center font-bold text-emerald-400">{faisalJewelResidentialPlan.downPaymentMaxFormatted}</td>
                    <td className="p-3.5 text-center font-serif font-bold text-amber-300">{faisalJewelResidentialPlan.totalPriceMinFormatted}</td>
                    <td className="p-3.5 text-center font-serif font-bold text-amber-300">{faisalJewelResidentialPlan.totalPriceMaxFormatted}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Commercial Table Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-5 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Commercial Payment Plan (Shops & Food Court)</h3>
                <p className="text-xs text-slate-400">16 Quarterly Installments (48 Months)</p>
              </div>
              <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Lower Ground to 4th Floor
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-800 text-slate-300 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Unit Types</th>
                    <th className="p-3">Floor</th>
                    <th className="p-3">Rate Per Sq.Ft.</th>
                    <th className="p-3 text-center" colSpan={2}>Area (Sq.Ft.)</th>
                    <th className="p-3 text-center" colSpan={2}>Down Payment @ 25%</th>
                    <th className="p-3 text-center" colSpan={2}>Total Price</th>
                  </tr>
                  <tr className="bg-slate-800/80 text-[9px] text-slate-400">
                    <th className="p-1"></th>
                    <th className="p-1"></th>
                    <th className="p-1"></th>
                    <th className="p-1 text-center">Min</th>
                    <th className="p-1 text-center">Max</th>
                    <th className="p-1 text-center">Min (PKR)</th>
                    <th className="p-1 text-center">Max (PKR)</th>
                    <th className="p-1 text-center">Min (PKR)</th>
                    <th className="p-1 text-center">Max (PKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {faisalJewelCommercialPlans.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition">
                      <td className="p-3 font-bold text-amber-300">{row.unitType}</td>
                      <td className="p-3 font-semibold">{row.floor}</td>
                      <td className="p-3 font-bold">PKR {row.ratePerSqFtFormatted}</td>
                      <td className="p-3 text-center font-bold">{row.areaMin.toLocaleString()}</td>
                      <td className="p-3 text-center font-bold">{row.areaMax.toLocaleString()}</td>
                      <td className="p-3 text-center font-bold text-emerald-400">{row.downPaymentMinFormatted}</td>
                      <td className="p-3 text-center font-bold text-emerald-400">{row.downPaymentMaxFormatted}</td>
                      <td className="p-3 text-center font-serif font-bold text-amber-300">{row.totalPriceMinFormatted}</td>
                      <td className="p-3 text-center font-serif font-bold text-amber-300">{row.totalPriceMaxFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section (For non-executive blocks) */}
      {block.slug !== 'executive-block' && block.faqs.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
          <div className="space-y-1">
            <span className="label-caps text-[#7b002c] font-bold block">Knowledge Base</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              {block.id === 'faisal-jewels' ? 'Frequently Asked Questions' : `Frequently Asked Questions - ${block.name}`}
            </h2>
          </div>

          <FaqAccordion faqs={block.faqs} blockName={block.name} />
        </section>
      )}

      {/* Book Your Unit in Faisal Jewel Today */}
      {block.id === 'faisal-jewels' && (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-6">
          <div className="rounded-3xl bg-[#4c050d] text-white p-10 lg:p-14 border border-[#7b002c] shadow-2xl flex flex-col items-center justify-center text-center space-y-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Limited Inventory Available</span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
                Book Your Unit in Faisal Jewel Today
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Connect with our official investment desk for available floors, payment calculators, and instant booking guides.
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

              <a
                href="tel:+923044811717"
                className="px-8 py-3.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>CALL +92 304 4811 717</span>
              </a>
            </div>
          </div>
          </section>
        )}
      </>
    )}

    </div>
  );
}
