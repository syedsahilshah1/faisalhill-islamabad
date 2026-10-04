'use client';

import React, { useState, useRef } from 'react';
import {
  ExecutiveBlockCMSData,
  initialExecutiveBlockCMS,
  saveExecutiveBlockCMS,
  ExecutiveBlockPlotItem,
  ExecutiveBlockAmenityItem,
  ExecutiveBlockWhyInvestItem,
  ExecutiveBlockTransferStep,
  ExecutiveBlockFaqItem
} from '@/data/faisalHillsData';
import CmsRichTextarea from './CmsRichTextarea';
import CmsRichInput from './CmsRichInput';
import {
  Save,
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle2,
  MapPin,
  Compass,
  DollarSign,
  Layers,
  Scale,
  Building2,
  FileText,
  HelpCircle,
  PhoneCall,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Globe,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Info,
  Camera,
  Loader2,
  Check,
  Upload,
  X,
  Link2,
  Send,
  Phone,
  Activity,
  Trees,
  GraduationCap,
  Landmark,
  Building
} from 'lucide-react';

import ImageUploader, { type ImageUploaderProps } from './ImageUploader';

// Derived from the uploader's own props rather than restated, so a capability
// added to `ImageUploader` (alt text, folder, aspect ratio) is immediately
// usable here. The previous hand-written subset silently omitted them.
interface ImageUploadFieldProps extends Omit<ImageUploaderProps, 'token'> {}

/**
 * Builds the shared uploader with this editor's bearer token already bound.
 *
 * The wrapper is created per render rather than declared at module scope so the
 * token does not have to be threaded through every call site, and so an editor
 * without a token still renders instead of referencing an out-of-scope name.
 */
const createImageUploadField = (token?: string | null) => {
  const Field: React.FC<ImageUploadFieldProps> = (props) => (
    <ImageUploader {...props} token={token || undefined} />
  );

  return Field;
};

interface ExecutiveBlockCmsEditorProps {
  executiveBlockCms: ExecutiveBlockCMSData;
  setExecutiveBlockCms: React.Dispatch<React.SetStateAction<ExecutiveBlockCMSData>>;
  token?: string | null;
  onSaveSuccess?: (msg: string) => void;
}

export default function ExecutiveBlockCmsEditor({
  executiveBlockCms,
  setExecutiveBlockCms,
  token,
  onSaveSuccess
}: ExecutiveBlockCmsEditorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('hero');
  const ImageUploadField = createImageUploadField(token);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      tabsScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleSaveExecutive = async () => {
    setIsSaving(true);
    setSaveMsg('');
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') || undefined : undefined);
    const ok = await saveExecutiveBlockCMS(executiveBlockCms, activeToken);
    setIsSaving(false);
    const msg = ok
      ? 'Faisal Hills Executive Block CMS content published and updated live!'
      : 'Executive Block changes saved in local browser storage (API sync pending login).';
    setSaveMsg(msg);
    if (onSaveSuccess) onSaveSuccess(msg);
    setTimeout(() => setSaveMsg(''), 4500);
  };

  const handleResetExecutive = () => {
    if (window.confirm('Reset all Executive Block sections to official audited defaults?')) {
      setExecutiveBlockCms(initialExecutiveBlockCMS);
      setSaveMsg('Reset to audited defaults. Click "Save & Publish Executive Block" to apply.');
    }
  };

  const categories = [
    { id: 'hero', label: '1. Hero & Badges', icon: Sparkles },
    { id: 'overview', label: '2. H1 & Overview Copy', icon: Award },
    { id: 'location', label: '3. Location & Google Map', icon: MapPin },
    { id: 'masterPlan', label: '4. Master Plan & PDF', icon: Compass },
    { id: 'plotsForSale', label: '5. Plots for Sale Matrix', icon: DollarSign },
    { id: 'resaleDesk', label: '6. Owner Resale Desk', icon: Layers },
    { id: 'facilities', label: '7. 8 Facilities & Amenities', icon: Building2 },
    { id: 'whyInvest', label: '8. Why Invest (6 Cards)', icon: CheckCircle2 },
    { id: 'developmentStatus', label: '9. Development & Drone', icon: Activity },
    { id: 'transferProcess', label: '10. Transfer Process (4 Steps)', icon: FileText },
    { id: 'faqs', label: '11. Executive FAQs', icon: HelpCircle },
    { id: 'scheduleTour', label: '12. Tour Booking & Form', icon: PhoneCall },
  ];

  return (
    <div className="space-y-6">

      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-rose-950 via-[#7b002c] to-rose-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Executive Block Flagship CMS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Manage Faisal Hills Executive Block
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-2xl font-sans">
            Edit all 12 sections: Monument Entrance, Grand Arc Gate, verified plot inventory, amenities, why invest, development progress, transfer roadmap, and FAQs for <code className="text-amber-200 bg-black/30 px-1.5 py-0.5 rounded font-mono">/blocks/executive-block</code>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <a
            href="/blocks/executive-block"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
          >
            <Globe className="w-4 h-4" />
            <span>View Public Page</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <button
            type="button"
            onClick={handleResetExecutive}
            className="px-3.5 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 text-rose-200 text-xs font-bold border border-rose-400/30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSaveExecutive}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-lg transition flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Publish Executive Block</span>
              </>
            )}
          </button>
        </div>
      </div>

      {saveMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Horizontal Tabs Scroll Bar */}
      <div className="relative bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1">
        <button
          type="button"
          onClick={() => scrollTabs('left')}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition shrink-0"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={tabsScrollRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-1"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#7b002c] text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-[#7b002c]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollTabs('right')}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition shrink-0"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. HERO & BADGES                                          */}
      {/* ========================================================= */}
      {activeCategory === 'hero' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">1. Hero Header & Quick Badges</h3>
            <p className="text-xs text-slate-600">Top hero banner, heading, subheading, background media, and key society highlight pills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <CmsRichInput
              label="Eyebrow Tagline"
              value={executiveBlockCms.hero.eyebrow}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                hero: { ...executiveBlockCms.hero, eyebrow: val }
              })}
              placeholder="RDA APPROVED • MAIN GT ROAD FLAGSHIP SECTOR"
            />
            <CmsRichInput
              label="Hero Main Title"
              value={executiveBlockCms.hero.title}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                hero: { ...executiveBlockCms.hero, title: val }
              })}
              placeholder="Faisal Hills Executive Block"
            />
          </div>

          <CmsRichTextarea
            label="Hero Subtitle / Description"
            value={executiveBlockCms.hero.subtitle}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              hero: { ...executiveBlockCms.hero, subtitle: val }
            })}
            placeholder="Master-planned entrance sector offering ready-to-build residential plots..."
            rows={3}
          />

          <ImageUploadField
            label="Hero Background Image"
            value={executiveBlockCms.hero.bgImage}
            onChange={(url) => setExecutiveBlockCms({
              ...executiveBlockCms,
              hero: { ...executiveBlockCms.hero, bgImage: url }
            })}
            placeholder="/images/faisal-hills-arc-gate.webp"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <CmsRichInput
              label="Highlight Badge 1"
              value={executiveBlockCms.hero.badge1}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                hero: { ...executiveBlockCms.hero, badge1: val }
              })}
              placeholder="Immediate Possession"
            />
            <CmsRichInput
              label="Highlight Badge 2"
              value={executiveBlockCms.hero.badge2}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                hero: { ...executiveBlockCms.hero, badge2: val }
              })}
              placeholder="Roots School Operational"
            />
            <CmsRichInput
              label="Highlight Badge 3"
              value={executiveBlockCms.hero.badge3}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                hero: { ...executiveBlockCms.hero, badge3: val }
              })}
              placeholder="Faisal Jewel 27-Storey"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. OVERVIEW & NARRATIVE COPY                             */}
      {/* ========================================================= */}
      {activeCategory === 'overview' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">2. H1 & Sector Overview Copy</h3>
            <p className="text-xs text-slate-600">The main introductory section, expandable details, and side photography card.</p>
          </div>

          <CmsRichInput
            label="Section H1 Heading"
            value={executiveBlockCms.overview.h1}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              overview: { ...executiveBlockCms.overview, h1: val }
            })}
            placeholder="Faisal Hills Executive Block Overview"
          />

          <CmsRichTextarea
            label="Lead Paragraph (Always Visible)"
            value={executiveBlockCms.overview.leadParagraph}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              overview: { ...executiveBlockCms.overview, leadParagraph: val }
            })}
            placeholder="Faisal Hills Executive Block is the prestigious flagship sector..."
            rows={4}
          />

          <CmsRichTextarea
            label="Expanded Details Paragraph (Visible on 'See More')"
            value={executiveBlockCms.overview.expandedParagraph}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              overview: { ...executiveBlockCms.overview, expandedParagraph: val }
            })}
            placeholder="Home to the iconic 27-storey [Faisal Jewel Tower](/blocks/faisal-jewel-islamabad)..."
            rows={4}
          />

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase">Overview Showcase Photo Card</h4>
            <ImageUploadField
              label="Showcase Photo"
              value={executiveBlockCms.overview.photoUrl}
              onChange={(url) => setExecutiveBlockCms({
                ...executiveBlockCms,
                overview: { ...executiveBlockCms.overview, photoUrl: url }
              })}
              placeholder="/images/faisal-hills-arc-gate.webp"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <CmsRichInput
                label="Photo Tag"
                value={executiveBlockCms.overview.photoTag}
                onChange={(val) => setExecutiveBlockCms({
                  ...executiveBlockCms,
                  overview: { ...executiveBlockCms.overview, photoTag: val }
                })}
                placeholder="Grand Monument Gateway"
              />
              <CmsRichInput
                label="Photo Caption Title"
                value={executiveBlockCms.overview.photoCaption}
                onChange={(val) => setExecutiveBlockCms({
                  ...executiveBlockCms,
                  overview: { ...executiveBlockCms.overview, photoCaption: val }
                })}
                placeholder="Main GT Road N-5 Entrance"
              />
              <CmsRichInput
                label="Image Alt Text (SEO)"
                value={executiveBlockCms.overview.photoAlt}
                onChange={(val) => setExecutiveBlockCms({
                  ...executiveBlockCms,
                  overview: { ...executiveBlockCms.overview, photoAlt: val }
                })}
                placeholder="Faisal Hills Executive Block Monument Entrance Arc Gate"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. LOCATION & GOOGLE MAP EMBED                           */}
      {/* ========================================================= */}
      {activeCategory === 'location' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">3. Location, Routes & Google Map</h3>
            <p className="text-xs text-slate-600">GT Road frontage, accessibility details, and interactive embedded Google Map iframe URL.</p>
          </div>

          <CmsRichInput
            label="Section H2 Heading"
            value={executiveBlockCms.location.h2}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              location: { ...executiveBlockCms.location, h2: val }
            })}
            placeholder="Faisal Hills Executive Block Location & Map"
          />

          <CmsRichTextarea
            label="Location Lead Paragraph"
            value={executiveBlockCms.location.leadParagraph}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              location: { ...executiveBlockCms.location, leadParagraph: val }
            })}
            placeholder="Executive Block enjoys an unmatched strategic advantage by fronting directly on..."
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichTextarea
              label="Expanded Route Info 1"
              value={executiveBlockCms.location.expandedParagraph1}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                location: { ...executiveBlockCms.location, expandedParagraph1: val }
              })}
              placeholder="With immediate access to both Islamabad and Rawalpindi via N-5 corridor..."
              rows={3}
            />
            <CmsRichTextarea
              label="Expanded Route Info 2"
              value={executiveBlockCms.location.expandedParagraph2}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                location: { ...executiveBlockCms.location, expandedParagraph2: val }
              })}
              placeholder="Surrounded by the scenic Margalla Hills backdrop..."
              rows={3}
            />
          </div>

          <CmsRichInput
            label="Google Map Embed Iframe URL"
            value={executiveBlockCms.location.googleMapEmbedUrl}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              location: { ...executiveBlockCms.location, googleMapEmbedUrl: val }
            })}
            placeholder="https://maps.google.com/maps?q=Faisal+Hills+Executive+Block+GT+Road+Taxila&t=&z=14&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. MASTER PLAN & BLUEPRINT DOWNLOAD                       */}
      {/* ========================================================= */}
      {activeCategory === 'masterPlan' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">4. Master Plan Blueprint & Map Modal</h3>
            <p className="text-xs text-slate-600">Executive sector blueprint map image, description, and download buttons.</p>
          </div>

          <CmsRichInput
            label="Section H2 Heading"
            value={executiveBlockCms.masterPlan.h2}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              masterPlan: { ...executiveBlockCms.masterPlan, h2: val }
            })}
            placeholder="Faisal Hills Executive Block Master Plan"
          />

          <CmsRichTextarea
            label="Master Plan Narrative"
            value={executiveBlockCms.masterPlan.leadParagraph}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              masterPlan: { ...executiveBlockCms.masterPlan, leadParagraph: val }
            })}
            placeholder="The master plan of Executive Block is engineered as an integrated self-sustaining community..."
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploadField
              label="Master Plan Blueprint Map"
              value={executiveBlockCms.masterPlan.mapImageUrl}
              onChange={(url) => setExecutiveBlockCms({
                ...executiveBlockCms,
                masterPlan: { ...executiveBlockCms.masterPlan, mapImageUrl: url }
              })}
              placeholder="/images/faisal-hills-executive-map.webp"
            />
            <CmsRichInput
              label="Download PDF File / URL"
              value={executiveBlockCms.masterPlan.mapPdfUrl}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                masterPlan: { ...executiveBlockCms.masterPlan, mapPdfUrl: val }
              })}
              placeholder="/images/faisal-hills-executive-map.webp"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CmsRichInput
              label="Download Button Label"
              value={executiveBlockCms.masterPlan.downloadButtonText}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                masterPlan: { ...executiveBlockCms.masterPlan, downloadButtonText: val }
              })}
              placeholder="Download Master Plan"
            />
            <CmsRichInput
              label="Explore Society Map Button Label"
              value={executiveBlockCms.masterPlan.exploreSocietyMapText}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                masterPlan: { ...executiveBlockCms.masterPlan, exploreSocietyMapText: val }
              })}
              placeholder="Explore Society Map"
            />
            <CmsRichInput
              label="Explore Society Map Link URL"
              value={executiveBlockCms.masterPlan.exploreSocietyMapUrl}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                masterPlan: { ...executiveBlockCms.masterPlan, exploreSocietyMapUrl: val }
              })}
              placeholder="/master-plan"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. PLOTS FOR SALE / PRICING MATRIX                        */}
      {/* ========================================================= */}
      {activeCategory === 'plotsForSale' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">5. Plots for Sale / Verified Inventory</h3>
              <p className="text-xs text-slate-600">Manage featured residential and commercial plots in Executive Block with prices, down payments, and tags.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newPlot: ExecutiveBlockPlotItem = {
                  id: `exec-plot-${Date.now()}`,
                  plotNumber: `EX-${Math.floor(Math.random() * 800) + 100}`,
                  blockName: 'Executive Block',
                  category: 'Residential',
                  size: '5 Marla',
                  dimensions: '25 × 50',
                  facing: 'Park Facing',
                  priceFormatted: 'PKR 75.0 Lac',
                  downPayment: 'PKR 15.0 Lac',
                  status: 'Available',
                  badge: 'Verified File',
                  image: '/images/faisal-hills-executive-sector.webp',
                  features: ['Possession Ready', 'Direct GT Road Access', 'Underground Utilities']
                };
                setExecutiveBlockCms({
                  ...executiveBlockCms,
                  plotsForSale: {
                    ...executiveBlockCms.plotsForSale,
                    plots: [...executiveBlockCms.plotsForSale.plots, newPlot]
                  }
                });
              }}
              className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Plot Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichInput
              label="Section H2 Heading"
              value={executiveBlockCms.plotsForSale.h2}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                plotsForSale: { ...executiveBlockCms.plotsForSale, h2: val }
              })}
              placeholder="Executive Block Plots for Sale — Direct Booking & Verified Files"
            />
            <CmsRichInput
              label="Section Description"
              value={executiveBlockCms.plotsForSale.leadParagraph}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                plotsForSale: { ...executiveBlockCms.plotsForSale, leadParagraph: val }
              })}
              placeholder="Explore available residential plots and commercial plazas in Executive Block..."
            />
          </div>

          {/* List of plots */}
          <div className="space-y-4 pt-2">
            {executiveBlockCms.plotsForSale.plots.map((plot, idx) => (
              <div key={plot.id || idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 relative">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#7b002c] text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <strong className="text-slate-900 text-sm font-bold">
                      Plot #{plot.plotNumber} ({plot.size} - {plot.category})
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setExecutiveBlockCms({
                        ...executiveBlockCms,
                        plotsForSale: {
                          ...executiveBlockCms.plotsForSale,
                          plots: executiveBlockCms.plotsForSale.plots.filter((_, pIdx) => pIdx !== idx)
                        }
                      });
                    }}
                    className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded-lg transition"
                    title="Delete Plot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <CmsRichInput
                    label="Plot #"
                    value={plot.plotNumber}
                    onChange={(val) => {
                      const updated = [...executiveBlockCms.plotsForSale.plots];
                      updated[idx].plotNumber = val;
                      setExecutiveBlockCms({ ...executiveBlockCms, plotsForSale: { ...executiveBlockCms.plotsForSale, plots: updated } });
                    }}
                    placeholder="EX-104"
                  />
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Category</label>
                    <select
                      value={plot.category}
                      onChange={(e) => {
                        const updated = [...executiveBlockCms.plotsForSale.plots];
                        updated[idx].category = e.target.value;
                        setExecutiveBlockCms({ ...executiveBlockCms, plotsForSale: { ...executiveBlockCms.plotsForSale, plots: updated } });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <CmsRichInput
                    label="Plot Size"
                    value={plot.size}
                    onChange={(val) => {
                      const updated = [...executiveBlockCms.plotsForSale.plots];
                      updated[idx].size = val;
                      setExecutiveBlockCms({ ...executiveBlockCms, plotsForSale: { ...executiveBlockCms.plotsForSale, plots: updated } });
                    }}
                    placeholder="5 Marla"
                  />
                  <CmsRichInput
                    label="Dimensions"
                    value={plot.dimensions}
                    onChange={(val) => {
                      const updated = [...executiveBlockCms.plotsForSale.plots];
                      updated[idx].dimensions = val;
                      setExecutiveBlockCms({ ...executiveBlockCms, plotsForSale: { ...executiveBlockCms.plotsForSale, plots: updated } });
                    }}
                    placeholder="25 × 50"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <CmsRichInput
                    label="Total Price Formatted"
                    value={plot.priceFormatted}
                    onChange={(val) => {
                      const updated = [...executiveBlockCms.plotsForSale.plots];
                      updated[idx].priceFormatted = val;
                      setExecutiveBlockCms({ ...executiveBlockCms, plotsForSale: { ...executiveBlockCms.plotsForSale, plots: updated } });
                    }}
                    placeholder="PKR 75.0 Lac"
                  />
                  <CmsRichInput
                    label="Down Payment"
                    value={plot.downPayment}
                    onChange={(val) => {
                      const updated = [...executiveBlockCms.plotsForSale.plots];
                      updated[idx].downPayment = val;
                      setExecutiveBlockCms({ ...executiveBlockCms, plotsForSale: { ...executiveBlockCms.plotsForSale, plots: updated } });
                    }}
                    placeholder="PKR 15.0 Lac"
                  />
                  <CmsRichInput
                    label="Orientation / Facing"
                    value={plot.facing}
                    onChange={(val) => {
                      const updated = [...executiveBlockCms.plotsForSale.plots];
                      updated[idx].facing = val;
                      setExecutiveBlockCms({ ...executiveBlockCms, plotsForSale: { ...executiveBlockCms.plotsForSale, plots: updated } });
                    }}
                    placeholder="Park Facing"
                  />
                  <CmsRichInput
                    label="Status Tag / Badge"
                    value={plot.badge}
                    onChange={(val) => {
                      const updated = [...executiveBlockCms.plotsForSale.plots];
                      updated[idx].badge = val;
                      setExecutiveBlockCms({ ...executiveBlockCms, plotsForSale: { ...executiveBlockCms.plotsForSale, plots: updated } });
                    }}
                    placeholder="Near Roots School"
                  />
                </div>

                <ImageUploadField
                  label="Plot Card Photo"
                  value={plot.image}
                  onChange={(url) => {
                    const updated = [...executiveBlockCms.plotsForSale.plots];
                    updated[idx].image = url;
                    setExecutiveBlockCms({ ...executiveBlockCms, plotsForSale: { ...executiveBlockCms.plotsForSale, plots: updated } });
                  }}
                  placeholder="/images/faisal-hills-executive-sector.webp"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. RESALE & LIQUIDATION DESK BANNER                       */}
      {/* ========================================================= */}
      {activeCategory === 'resaleDesk' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">6. Owner Resale & Liquidation Desk</h3>
            <p className="text-xs text-slate-600">The high-conversion dark banner for owners looking to sell or assess their plot.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichInput
              label="Tagline Pill"
              value={executiveBlockCms.resaleDesk.tag}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                resaleDesk: { ...executiveBlockCms.resaleDesk, tag: val }
              })}
              placeholder="Owner Resale & Liquidation Desk"
            />
            <CmsRichInput
              label="Banner Heading"
              value={executiveBlockCms.resaleDesk.heading}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                resaleDesk: { ...executiveBlockCms.resaleDesk, heading: val }
              })}
              placeholder="Want to Sell or Assess Your Executive Block Plot / File?"
            />
          </div>

          <CmsRichTextarea
            label="Banner Subtext"
            value={executiveBlockCms.resaleDesk.paragraph}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              resaleDesk: { ...executiveBlockCms.resaleDesk, paragraph: val }
            })}
            placeholder="Get an instant official market valuation and list your file for thousands of active verified buyers..."
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichInput
              label="Button Text"
              value={executiveBlockCms.resaleDesk.buttonText}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                resaleDesk: { ...executiveBlockCms.resaleDesk, buttonText: val }
              })}
              placeholder="List Your Plot File"
            />
            <CmsRichInput
              label="WhatsApp Auto-Fill Message"
              value={executiveBlockCms.resaleDesk.whatsappMessage}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                resaleDesk: { ...executiveBlockCms.resaleDesk, whatsappMessage: val }
              })}
              placeholder="Hello! I want to list or sell my plot in Faisal Hills Executive Block."
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. 8 FACILITIES & AMENITIES                               */}
      {/* ========================================================= */}
      {activeCategory === 'facilities' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">7. Facilities & Master Amenities (8 Cards)</h3>
            <p className="text-xs text-slate-600">The rolling carousel on mobile and 4-column cards on desktop displaying Civic Hub, Roots School, Faisal Jewel, Parks, etc.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichInput
              label="Section H2 Heading"
              value={executiveBlockCms.facilities.h2}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                facilities: { ...executiveBlockCms.facilities, h2: val }
              })}
              placeholder="Facilities and Amenities in Executive Block"
            />
            <CmsRichInput
              label="Section Description"
              value={executiveBlockCms.facilities.leadParagraph}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                facilities: { ...executiveBlockCms.facilities, leadParagraph: val }
              })}
              placeholder="Executive Block is planned with world-class facilities and modern municipal infrastructure:"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {executiveBlockCms.facilities.items.map((item, idx) => (
              <div key={item.id || idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#7b002c]">Facility Card #{idx + 1}</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">{item.tag}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <CmsRichInput
                    label="Facility Title"
                    value={item.title}
                    onChange={(val) => {
                      const updated = [...executiveBlockCms.facilities.items];
                      updated[idx].title = val;
                      setExecutiveBlockCms({ ...executiveBlockCms, facilities: { ...executiveBlockCms.facilities, items: updated } });
                    }}
                    placeholder="Civic Hub & Monument Gateway"
                  />
                  <CmsRichInput
                    label="Badge / Tag"
                    value={item.tag}
                    onChange={(val) => {
                      const updated = [...executiveBlockCms.facilities.items];
                      updated[idx].tag = val;
                      setExecutiveBlockCms({ ...executiveBlockCms, facilities: { ...executiveBlockCms.facilities, items: updated } });
                    }}
                    placeholder="Sector Core"
                  />
                </div>

                <ImageUploadField
                  label="Card Background Image"
                  value={item.image}
                  onChange={(url) => {
                    const updated = [...executiveBlockCms.facilities.items];
                    updated[idx].image = url;
                    setExecutiveBlockCms({ ...executiveBlockCms, facilities: { ...executiveBlockCms.facilities, items: updated } });
                  }}
                  placeholder="/images/faisal-hills-arc-gate.webp"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. WHY INVEST IN EXECUTIVE BLOCK                          */}
      {/* ========================================================= */}
      {activeCategory === 'whyInvest' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">8. Why Invest in Executive Block (6 Strategic Points)</h3>
            <p className="text-xs text-slate-600">The 6 key reasons with accordion interactivity on mobile and grid display on desktop.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichInput
              label="Section H2 Heading"
              value={executiveBlockCms.whyInvest.h2}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                whyInvest: { ...executiveBlockCms.whyInvest, h2: val }
              })}
              placeholder="Why Invest in Faisal Hills Executive Block"
            />
            <CmsRichInput
              label="Section Description"
              value={executiveBlockCms.whyInvest.leadParagraph}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                whyInvest: { ...executiveBlockCms.whyInvest, leadParagraph: val }
              })}
              placeholder="Why buyers and overseas Pakistanis rank Executive Block as the flagship sector:"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {executiveBlockCms.whyInvest.reasons.map((reason, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <strong className="text-xs font-bold text-slate-900">Reason #{idx + 1}</strong>
                </div>
                <CmsRichInput
                  label="Title"
                  value={reason.title}
                  onChange={(val) => {
                    const updated = [...executiveBlockCms.whyInvest.reasons];
                    updated[idx].title = val;
                    setExecutiveBlockCms({ ...executiveBlockCms, whyInvest: { ...executiveBlockCms.whyInvest, reasons: updated } });
                  }}
                  placeholder="Strategic GT Road Access"
                />
                <CmsRichTextarea
                  label="Description"
                  value={reason.desc}
                  onChange={(val) => {
                    const updated = [...executiveBlockCms.whyInvest.reasons];
                    updated[idx].desc = val;
                    setExecutiveBlockCms({ ...executiveBlockCms, whyInvest: { ...executiveBlockCms.whyInvest, reasons: updated } });
                  }}
                  placeholder="Direct N-5 frontage with rapid proximity..."
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. ON-GROUND DEVELOPMENT STATUS & DRONE                   */}
      {/* ========================================================= */}
      {activeCategory === 'developmentStatus' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">9. On-Ground Development Status & Drone Survey</h3>
            <p className="text-xs text-slate-600">Possession status, 3 KPI metric counters, narrative paragraphs, and drone survey card.</p>
          </div>

          <CmsRichInput
            label="Section H2 Heading"
            value={executiveBlockCms.developmentStatus.h2}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              developmentStatus: { ...executiveBlockCms.developmentStatus, h2: val }
            })}
            placeholder="Executive Block Development Status"
          />

          <CmsRichTextarea
            label="Lead Paragraph (Always Visible)"
            value={executiveBlockCms.developmentStatus.leadParagraph}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              developmentStatus: { ...executiveBlockCms.developmentStatus, leadParagraph: val }
            })}
            placeholder="Development in Executive Block is 100% operational with possession fully delivered..."
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichTextarea
              label="Expanded Progress Note 1"
              value={executiveBlockCms.developmentStatus.expandedParagraph1}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                developmentStatus: { ...executiveBlockCms.developmentStatus, expandedParagraph1: val }
              })}
              placeholder="Roots International School is actively educating students on-site..."
              rows={3}
            />
            <CmsRichTextarea
              label="Expanded Progress Note 2"
              value={executiveBlockCms.developmentStatus.expandedParagraph2}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                developmentStatus: { ...executiveBlockCms.developmentStatus, expandedParagraph2: val }
              })}
              placeholder="Families are actively residing in constructed luxury houses..."
              rows={3}
            />
          </div>

          {/* 3 Metric Counters */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase">3 Quick Status Metric Counters</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <CmsRichInput
                  label="Metric 1 Value"
                  value={executiveBlockCms.developmentStatus.stat1Value}
                  onChange={(val) => setExecutiveBlockCms({
                    ...executiveBlockCms,
                    developmentStatus: { ...executiveBlockCms.developmentStatus, stat1Value: val }
                  })}
                  placeholder="95%+"
                />
                <CmsRichInput
                  label="Metric 1 Label"
                  value={executiveBlockCms.developmentStatus.stat1Label}
                  onChange={(val) => setExecutiveBlockCms({
                    ...executiveBlockCms,
                    developmentStatus: { ...executiveBlockCms.developmentStatus, stat1Label: val }
                  })}
                  placeholder="Roads Carpeted"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <CmsRichInput
                  label="Metric 2 Value"
                  value={executiveBlockCms.developmentStatus.stat2Value}
                  onChange={(val) => setExecutiveBlockCms({
                    ...executiveBlockCms,
                    developmentStatus: { ...executiveBlockCms.developmentStatus, stat2Value: val }
                  })}
                  placeholder="100%"
                />
                <CmsRichInput
                  label="Metric 2 Label"
                  value={executiveBlockCms.developmentStatus.stat2Label}
                  onChange={(val) => setExecutiveBlockCms({
                    ...executiveBlockCms,
                    developmentStatus: { ...executiveBlockCms.developmentStatus, stat2Label: val }
                  })}
                  placeholder="Underground Grid"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <CmsRichInput
                  label="Metric 3 Value"
                  value={executiveBlockCms.developmentStatus.stat3Value}
                  onChange={(val) => setExecutiveBlockCms({
                    ...executiveBlockCms,
                    developmentStatus: { ...executiveBlockCms.developmentStatus, stat3Value: val }
                  })}
                  placeholder="Possession"
                />
                <CmsRichInput
                  label="Metric 3 Label"
                  value={executiveBlockCms.developmentStatus.stat3Label}
                  onChange={(val) => setExecutiveBlockCms({
                    ...executiveBlockCms,
                    developmentStatus: { ...executiveBlockCms.developmentStatus, stat3Label: val }
                  })}
                  placeholder="Ready to Build"
                />
              </div>
            </div>
          </div>

          {/* Drone Survey Card */}
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase">Drone Survey Media Card</h4>
            <ImageUploadField
              label="Drone / Aerial Photo"
              value={executiveBlockCms.developmentStatus.dronePhotoUrl}
              onChange={(url) => setExecutiveBlockCms({
                ...executiveBlockCms,
                developmentStatus: { ...executiveBlockCms.developmentStatus, dronePhotoUrl: url }
              })}
              placeholder="/images/faisal-hills-drone-view.webp"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <CmsRichInput
                label="Possession Badge"
                value={executiveBlockCms.developmentStatus.possessionBadge}
                onChange={(val) => setExecutiveBlockCms({
                  ...executiveBlockCms,
                  developmentStatus: { ...executiveBlockCms.developmentStatus, possessionBadge: val }
                })}
                placeholder="Possession Delivered"
              />
              <CmsRichInput
                label="Drone Tag"
                value={executiveBlockCms.developmentStatus.droneTag}
                onChange={(val) => setExecutiveBlockCms({
                  ...executiveBlockCms,
                  developmentStatus: { ...executiveBlockCms.developmentStatus, droneTag: val }
                })}
                placeholder="Verified Aerial Drone Survey"
              />
              <CmsRichInput
                label="Drone Card Heading"
                value={executiveBlockCms.developmentStatus.droneHeading}
                onChange={(val) => setExecutiveBlockCms({
                  ...executiveBlockCms,
                  developmentStatus: { ...executiveBlockCms.developmentStatus, droneHeading: val }
                })}
                placeholder="Executive Sector On-Ground Progress"
              />
            </div>
            <CmsRichTextarea
              label="Drone Card Description"
              value={executiveBlockCms.developmentStatus.droneDesc}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                developmentStatus: { ...executiveBlockCms.developmentStatus, droneDesc: val }
              })}
              placeholder="Wide carpeted boulevards, complete utilities, and active on-ground villa construction."
              rows={2}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. STEP-BY-STEP TRANSFER ROADMAP                         */}
      {/* ========================================================= */}
      {activeCategory === 'transferProcess' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">10. Transfer Process Roadmap & Advisory Desk</h3>
            <p className="text-xs text-slate-600">The 4-step plot transfer procedure at Zedem Head Office, bullet points, and WhatsApp facilitation banner.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichInput
              label="Section H2 Heading"
              value={executiveBlockCms.transferProcess.h2}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                transferProcess: { ...executiveBlockCms.transferProcess, h2: val }
              })}
              placeholder="Faisal Hills Executive Block Transfer Process"
            />
            <CmsRichInput
              label="Section Description"
              value={executiveBlockCms.transferProcess.leadParagraph}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                transferProcess: { ...executiveBlockCms.transferProcess, leadParagraph: val }
              })}
              placeholder="Follow these 4 essential points to complete official plot transfer directly at Zedem International:"
            />
          </div>

          {/* 4 Transfer Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {executiveBlockCms.transferProcess.steps.map((step, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-[#7b002c] text-white text-xs font-bold flex items-center justify-center">
                    {step.point}
                  </span>
                  <span className="text-[10px] bg-rose-50 text-[#7b002c] border border-rose-200 px-2 py-0.5 rounded-full font-bold">
                    {step.tag}
                  </span>
                </div>

                <CmsRichInput
                  label="Step Title"
                  value={step.title}
                  onChange={(val) => {
                    const updated = [...executiveBlockCms.transferProcess.steps];
                    updated[idx].title = val;
                    setExecutiveBlockCms({ ...executiveBlockCms, transferProcess: { ...executiveBlockCms.transferProcess, steps: updated } });
                  }}
                  placeholder="CNIC / NICOP Copies"
                />

                <CmsRichInput
                  label="Badge Text"
                  value={step.badge}
                  onChange={(val) => {
                    const updated = [...executiveBlockCms.transferProcess.steps];
                    updated[idx].badge = val;
                    setExecutiveBlockCms({ ...executiveBlockCms, transferProcess: { ...executiveBlockCms.transferProcess, steps: updated } });
                  }}
                  placeholder="Attested Copies Required"
                />

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Bullet Points (One per line)
                  </label>
                  <textarea
                    value={step.points.join('\n')}
                    onChange={(e) => {
                      const updated = [...executiveBlockCms.transferProcess.steps];
                      updated[idx].points = e.target.value.split('\n').filter(p => p.trim());
                      setExecutiveBlockCms({ ...executiveBlockCms, transferProcess: { ...executiveBlockCms.transferProcess, steps: updated } });
                    }}
                    rows={3}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Transfer Advisory Desk Banner */}
          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase">Transfer Advisory Desk Banner</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CmsRichInput
                label="Banner Heading"
                value={executiveBlockCms.transferProcess.bannerHeading}
                onChange={(val) => setExecutiveBlockCms({
                  ...executiveBlockCms,
                  transferProcess: { ...executiveBlockCms.transferProcess, bannerHeading: val }
                })}
                placeholder="Need Assistance with Plot Transfer & File Verification?"
              />
              <CmsRichInput
                label="Banner Subtext"
                value={executiveBlockCms.transferProcess.bannerSubtext}
                onChange={(val) => setExecutiveBlockCms({
                  ...executiveBlockCms,
                  transferProcess: { ...executiveBlockCms.transferProcess, bannerSubtext: val }
                })}
                placeholder="Our dedicated transfer advisory desk verifies society records..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CmsRichInput
                label="Button Label"
                value={executiveBlockCms.transferProcess.bannerButtonText}
                onChange={(val) => setExecutiveBlockCms({
                  ...executiveBlockCms,
                  transferProcess: { ...executiveBlockCms.transferProcess, bannerButtonText: val }
                })}
                placeholder="Contact Transfer Desk"
              />
              <CmsRichInput
                label="WhatsApp Message"
                value={executiveBlockCms.transferProcess.bannerWhatsapp}
                onChange={(val) => setExecutiveBlockCms({
                  ...executiveBlockCms,
                  transferProcess: { ...executiveBlockCms.transferProcess, bannerWhatsapp: val }
                })}
                placeholder="Hi, I need official assistance with plot transfer in Faisal Hills Executive Block."
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. FREQUENTLY ASKED QUESTIONS (FAQS)                     */}
      {/* ========================================================= */}
      {activeCategory === 'faqs' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">11. Executive Block FAQs</h3>
              <p className="text-xs text-slate-600">Add, edit, or remove frequently asked questions and official answers.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newFaq: ExecutiveBlockFaqItem = {
                  q: 'New Question regarding Executive Block',
                  a: 'Official detailed answer with verified society guidance.'
                };
                setExecutiveBlockCms({
                  ...executiveBlockCms,
                  faqs: {
                    ...executiveBlockCms.faqs,
                    items: [...executiveBlockCms.faqs.items, newFaq]
                  }
                });
              }}
              className="px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New FAQ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichInput
              label="FAQ Tag"
              value={executiveBlockCms.faqs.sectionTag}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                faqs: { ...executiveBlockCms.faqs, sectionTag: val }
              })}
              placeholder="FAQ'S"
            />
            <CmsRichInput
              label="FAQ Section H2 Heading"
              value={executiveBlockCms.faqs.h2}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                faqs: { ...executiveBlockCms.faqs, h2: val }
              })}
              placeholder="Frequently Asked Questions (FAQS)"
            />
          </div>

          <div className="space-y-4 pt-2">
            {executiveBlockCms.faqs.items.map((faq, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                  <strong className="text-xs font-bold text-[#7b002c]">Question #{idx + 1}</strong>
                  <button
                    type="button"
                    onClick={() => {
                      setExecutiveBlockCms({
                        ...executiveBlockCms,
                        faqs: {
                          ...executiveBlockCms.faqs,
                          items: executiveBlockCms.faqs.items.filter((_, fIdx) => fIdx !== idx)
                        }
                      });
                    }}
                    className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <CmsRichInput
                  label="Question"
                  value={faq.q}
                  onChange={(val) => {
                    const updated = [...executiveBlockCms.faqs.items];
                    updated[idx].q = val;
                    setExecutiveBlockCms({ ...executiveBlockCms, faqs: { ...executiveBlockCms.faqs, items: updated } });
                  }}
                  placeholder="Where is Executive Block located within Faisal Hills?"
                />

                <CmsRichTextarea
                  label="Answer"
                  value={faq.a}
                  onChange={(val) => {
                    const updated = [...executiveBlockCms.faqs.items];
                    updated[idx].a = val;
                    setExecutiveBlockCms({ ...executiveBlockCms, faqs: { ...executiveBlockCms.faqs, items: updated } });
                  }}
                  placeholder="Executive Block is located at the flagship front entrance..."
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. SCHEDULE TOUR & INQUIRY FORM                          */}
      {/* ========================================================= */}
      {activeCategory === 'scheduleTour' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">12. Schedule Tour & Lead Inquiry Form</h3>
            <p className="text-xs text-slate-600">The bottom lead capture card allowing users to request on-site visits and verified plot files.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CmsRichInput
              label="Pill Tag"
              value={executiveBlockCms.scheduleTour.tag}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                scheduleTour: { ...executiveBlockCms.scheduleTour, tag: val }
              })}
              placeholder="Direct Developer Facilitation Desk"
            />
            <CmsRichInput
              label="Heading H3"
              value={executiveBlockCms.scheduleTour.h3}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                scheduleTour: { ...executiveBlockCms.scheduleTour, h3: val }
              })}
              placeholder="Schedule an On-Site Executive Block Tour"
            />
          </div>

          <CmsRichTextarea
            label="Lead Paragraph"
            value={executiveBlockCms.scheduleTour.leadParagraph}
            onChange={(val) => setExecutiveBlockCms({
              ...executiveBlockCms,
              scheduleTour: { ...executiveBlockCms.scheduleTour, leadParagraph: val }
            })}
            placeholder="Leave your contact details to receive verified plot listings..."
            rows={3}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CmsRichInput
              label="Button Submit Text"
              value={executiveBlockCms.scheduleTour.buttonText}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                scheduleTour: { ...executiveBlockCms.scheduleTour, buttonText: val }
              })}
              placeholder="Submit Inquiry Request"
            />
            <CmsRichInput
              label="Thank You Title"
              value={executiveBlockCms.scheduleTour.thankYouHeading}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                scheduleTour: { ...executiveBlockCms.scheduleTour, thankYouHeading: val }
              })}
              placeholder="Inquiry Received!"
            />
            <CmsRichInput
              label="Thank You Message"
              value={executiveBlockCms.scheduleTour.thankYouMessage}
              onChange={(val) => setExecutiveBlockCms({
                ...executiveBlockCms,
                scheduleTour: { ...executiveBlockCms.scheduleTour, thankYouMessage: val }
              })}
              placeholder="Thank you. Our Executive Block property specialist will contact you..."
            />
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-slate-500">
          Tip: Changes are instantly applied to <code className="text-[#7b002c] font-mono">/blocks/executive-block</code> upon saving.
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetExecutive}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSaveExecutive}
            className="px-6 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Publish Executive Block</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
