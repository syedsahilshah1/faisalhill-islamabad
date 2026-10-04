'use client';

import React, { useState, useRef } from 'react';
import {
  PrimeBlockCMSData,
  initialPrimeBlockCMS,
  savePrimeBlockCMS
} from '@/data/faisalHillsData';
import CmsRichTextarea from './CmsRichTextarea';
import CmsRichInput from './CmsRichInput';
import { ImageUploader } from './ImageUploader';
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
  Building2,
  FileText,
  HelpCircle,
  PhoneCall,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Globe,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Info,
  Loader2,
  Link2,
  Image as ImageIcon,
  Check,
  Camera,
  X,
  Upload
} from 'lucide-react';

interface PrimeBlockCmsEditorProps {
  primeCms: PrimeBlockCMSData;
  setPrimeCms: React.Dispatch<React.SetStateAction<PrimeBlockCMSData>>;
  token?: string | null;
  onSaveSuccess?: (msg: string) => void;
}

export default function PrimeBlockCmsEditor({
  primeCms,
  setPrimeCms,
  token,
  onSaveSuccess
}: PrimeBlockCmsEditorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('overview');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      tabsScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleSavePrime = async () => {
    setIsSaving(true);
    setSaveMsg('');
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') || undefined : undefined);
    const ok = await savePrimeBlockCMS(primeCms, activeToken);
    setIsSaving(false);
    const msg = ok
      ? 'Faisal Hills Prime Block CMS content published and updated live!'
      : 'Prime Block changes saved in local browser storage (API sync pending login).';
    setSaveMsg(msg);
    if (onSaveSuccess) onSaveSuccess(msg);
    setTimeout(() => setSaveMsg(''), 4500);
  };

  const handleResetPrime = () => {
    if (window.confirm('Reset all Prime Block sections to official QA audited defaults?')) {
      setPrimeCms(initialPrimeBlockCMS);
      setSaveMsg('Reset to audited defaults. Click "Save & Publish Prime Block" to apply.');
    }
  };

  const categories = [
    { id: 'overview', label: '1. Overview & Vision', icon: Sparkles },
    { id: 'location', label: '2. Location & Connectivity', icon: MapPin },
    { id: 'plotSizes', label: '3. Plot Sizes & Dimensions', icon: Layers },
    { id: 'paymentPlan', label: '4. 4-Year Payment Plan', icon: DollarSign },
    { id: 'facilities', label: '5. Facilities & Amenities', icon: Building2 },
    { id: 'whyChoose', label: '6. Why Choose Prime Block', icon: ShieldCheck },
    { id: 'devStatus', label: '7. Development & Construction', icon: TrendingUp },
    { id: 'possession', label: '8. Possession Advice', icon: CheckCircle2 },
    { id: 'comparisons', label: '9. Prime vs Block A Matrix', icon: Compass },
    { id: 'booking', label: '10. 4-Step Booking Process', icon: FileText },
    { id: 'faqs', label: '11. Prime Block FAQs', icon: HelpCircle },
    { id: 'closing', label: '12. Site Visit & Lead Form', icon: PhoneCall },
  ];

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Dedicated Prime Block CMS System</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Faisal Hills Prime Block Content Manager
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Manage all 12 sections, 4-year installment schedules, plot dimensions, facilities, dev milestones, and FAQs for <code className="text-[#7b002c] font-mono bg-slate-100 px-1 py-0.5 rounded font-bold">/blocks/prime-block</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetPrime}
            className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <a
            href="/blocks/prime-block"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-xs font-bold text-[#7b002c] hover:bg-rose-50 border border-rose-200 rounded-xl transition inline-flex items-center gap-1.5"
          >
            <span>Live Prime Block</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleSavePrime}
            disabled={isSaving}
            className="px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 transition cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 text-white animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-white" />
                <span>Save & Publish Prime Block</span>
              </>
            )}
          </button>
        </div>
      </div>

      {saveMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Category Navigation Tabs */}
      <div className="relative flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => scrollTabs('left')}
          className="p-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 hover:text-[#7b002c] shadow-xs border border-slate-200 transition-all shrink-0 cursor-pointer flex items-center justify-center active:scale-95"
          title="Scroll Left"
          aria-label="Scroll Subtabs Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={tabsScrollRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth w-full px-1 py-0.5"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border whitespace-nowrap ${
                  isActive
                    ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollTabs('right')}
          className="p-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 hover:text-[#7b002c] shadow-xs border border-slate-200 transition-all shrink-0 cursor-pointer flex items-center justify-center active:scale-95"
          title="Scroll Right"
          aria-label="Scroll Subtabs Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. OVERVIEW & VISION SECTION                              */}
      {/* ========================================================= */}
      {activeCategory === 'overview' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              1. Sector Overview & Narrative
            </h4>
            <p className="text-xs text-slate-500">
              Headline and rich narrative paragraphs displayed at the top of the Prime Block page.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Main H2 Overview Heading
              </label>
              <input
                type="text"
                value={primeCms.overview.heading || ''}
                onChange={(e) => setPrimeCms({
                  ...primeCms,
                  overview: { ...primeCms.overview, heading: e.target.value }
                })}
                placeholder="Faisal Hills Prime Block Overview"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-[#7b002c] transition"
              />
            </div>

            <CmsRichTextarea
              label="Paragraph 1 (Location & 225ft Boulevard Context)"
              rows={4}
              value={primeCms.overview.visibleParagraph || ''}
              onChange={(val) => setPrimeCms({
                ...primeCms,
                overview: { ...primeCms.overview, visibleParagraph: val }
              })}
            />

            <CmsRichTextarea
              label="Paragraph 2 (Infrastructure, Installment Plan & Suitability)"
              rows={4}
              value={primeCms.overview.expandedParagraph1 || ''}
              onChange={(val) => setPrimeCms({
                ...primeCms,
                overview: { ...primeCms.overview, expandedParagraph1: val }
              })}
            />

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-[#7b002c]" />
                <span>Inter-Block Quick Link Targets (Appended to Paragraph 2)</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Block A Link Text & URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={primeCms.overview.blockALinkText || ''}
                      onChange={(e) => setPrimeCms({
                        ...primeCms,
                        overview: { ...primeCms.overview, blockALinkText: e.target.value }
                      })}
                      className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      placeholder="Block A"
                    />
                    <input
                      type="text"
                      value={primeCms.overview.blockALinkHref || ''}
                      onChange={(e) => setPrimeCms({
                        ...primeCms,
                        overview: { ...primeCms.overview, blockALinkHref: e.target.value }
                      })}
                      className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                      placeholder="/blocks/block-a"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Executive Block Link Text & URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={primeCms.overview.executiveBlockLinkText || ''}
                      onChange={(e) => setPrimeCms({
                        ...primeCms,
                        overview: { ...primeCms.overview, executiveBlockLinkText: e.target.value }
                      })}
                      className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      placeholder="Executive Block"
                    />
                    <input
                      type="text"
                      value={primeCms.overview.executiveBlockLinkHref || ''}
                      onChange={(e) => setPrimeCms({
                        ...primeCms,
                        overview: { ...primeCms.overview, executiveBlockLinkHref: e.target.value }
                      })}
                      className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                      placeholder="/blocks/executive-block"
                    />
                  </div>
                </div>
              </div>
            </div>

            <CmsRichTextarea
              label="Paragraph 3 (District Clarification: Rawalpindi vs Islamabad)"
              rows={3}
              value={primeCms.overview.expandedParagraph2 || ''}
              onChange={(val) => setPrimeCms({
                ...primeCms,
                overview: { ...primeCms.overview, expandedParagraph2: val }
              })}
            />

            {/* ========================================================= */}
            {/* OVERVIEW SIDE IMAGE & ON-GROUND CARD                      */}
            {/* ========================================================= */}
            <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#7b002c]" />
                    <span>Overview Side Card Image & Banner Details</span>
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Controls the featured photo card, SEO alt text, and badge next to overview paragraphs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-3.5">
                  {/* Replaces a hand-rolled file input that downscaled the image
                      and assigned the resulting base64 data URL straight into
                      CMS state. That wrote image bytes into the settings JSON
                      column; this uploads the file and stores only its path. */}
                  <ImageUploader
                    label="Overview Feature Image"
                    value={primeCms.overview.image || ''}
                    onChange={(val) => setPrimeCms({
                      ...primeCms,
                      overview: { ...primeCms.overview, image: val }
                    })}
                    token={token || undefined}
                    folder="prime-block"
                    placeholder="/images/faisal-hills-drone-view.webp"
                  />

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Featured Image URL or Path:
                    </label>
                    <input
                      type="text"
                      value={primeCms.overview.image || ''}
                      onChange={(e) => setPrimeCms({
                        ...primeCms,
                        overview: { ...primeCms.overview, image: e.target.value }
                      })}
                      placeholder="/images/faisal-hills-drone-view.webp"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:border-[#7b002c]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Image Alt Text (SEO & Accessibility):
                    </label>
                    <input
                      type="text"
                      value={primeCms.overview.imageAlt || ''}
                      onChange={(e) => setPrimeCms({
                        ...primeCms,
                        overview: { ...primeCms.overview, imageAlt: e.target.value }
                      })}
                      placeholder="Faisal Hills Prime Block On-Ground Development and Margalla Hills view"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#7b002c]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Quick Image Presets:</span>
                    {[
                      { label: 'Drone View', url: '/images/faisal-hills-drone-view.webp' },
                      { label: 'Aerial Panoramic', url: '/images/faisal-hills-aerial-panoramic.webp' },
                      { label: 'Arc Gate', url: '/images/faisal-hills-arc-gate.webp' },
                      { label: 'Glow Park', url: '/images/faisal-hills-glow-park.webp' },
                      { label: 'Development Site', url: '/images/faisal-hills-development-site.webp' },
                      { label: 'Main Gate GT Road', url: '/images/faisal-hills-main-gate-gt-road.webp' },
                    ].map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setPrimeCms({
                          ...primeCms,
                          overview: {
                            ...primeCms.overview,
                            image: preset.url,
                            imageAlt: `Faisal Hills Prime Block ${preset.label}`
                          }
                        })}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 hover:text-[#7b002c] border border-slate-200 font-medium transition cursor-pointer"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Tag / Badge
                      </label>
                      <input
                        type="text"
                        value={primeCms.overview.imageTag || ''}
                        onChange={(e) => setPrimeCms({
                          ...primeCms,
                          overview: { ...primeCms.overview, imageTag: e.target.value }
                        })}
                        placeholder="FAST-TRACK DEVELOPMENT"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        Card Overlay Title
                      </label>
                      <input
                        type="text"
                        value={primeCms.overview.imageTitle || ''}
                        onChange={(e) => setPrimeCms({
                          ...primeCms,
                          overview: { ...primeCms.overview, imageTitle: e.target.value }
                        })}
                        placeholder="Prime Block On-Ground Execution"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Card Overlay Subtitle
                    </label>
                    <input
                      type="text"
                      value={primeCms.overview.imageSubtitle || ''}
                      onChange={(e) => setPrimeCms({
                        ...primeCms,
                        overview: { ...primeCms.overview, imageSubtitle: e.target.value }
                      })}
                      placeholder="Carpeted boulevards, dedicated green spaces, and high-elevation residential sectors."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-600 block">Live Card Preview:</span>
                  <div className="min-h-[220px] rounded-2xl overflow-hidden border border-slate-300 relative bg-slate-900 shadow-md group">
                    <img
                      src={primeCms.overview.image || '/images/faisal-hills-drone-view.webp'}
                      alt={primeCms.overview.imageAlt || primeCms.overview.imageTitle || 'Prime Overview Preview'}
                      className="w-full h-56 object-cover"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                        {primeCms.overview.imageTag || 'FAST-TRACK DEVELOPMENT'}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-white mt-0.5">
                        {primeCms.overview.imageTitle || 'Prime Block On-Ground Execution'}
                      </h4>
                      <p className="text-[11px] text-slate-200 mt-1 line-clamp-2">
                        {primeCms.overview.imageSubtitle || 'Carpeted boulevards, dedicated green spaces, and high-elevation residential sectors.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. LOCATION & CONNECTIVITY                                */}
      {/* ========================================================= */}
      {activeCategory === 'location' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              2. Location & Strategic Connectivity
            </h4>
            <p className="text-xs text-slate-500">
              Commute times, GT Road N-5 access, boulevard widths, and adjoining landmark highlights.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Location Section Heading
              </label>
              <input
                type="text"
                value={primeCms.location.heading || ''}
                onChange={(e) => setPrimeCms({
                  ...primeCms,
                  location: { ...primeCms.location, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
              />
            </div>

            <CmsRichTextarea
              label="Location Main Description"
              rows={4}
              value={primeCms.location.mainParagraph || ''}
              onChange={(val) => setPrimeCms({
                ...primeCms,
                location: { ...primeCms.location, mainParagraph: val }
              })}
            />

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                4 Connectivity Key Points (Bullet List)
              </label>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((num) => {
                  const key = `bullet${num}` as keyof typeof primeCms.location;
                  return (
                    <div key={num} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#7b002c] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {num}
                      </span>
                      <input
                        type="text"
                        value={(primeCms.location[key] as string) || ''}
                        onChange={(e) => setPrimeCms({
                          ...primeCms,
                          location: { ...primeCms.location, [key]: e.target.value }
                        })}
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Drive Times & Measured Survey Note
              </label>
              <input
                type="text"
                value={primeCms.location.driveTimesNote || ''}
                onChange={(e) => setPrimeCms({
                  ...primeCms,
                  location: { ...primeCms.location, driveTimesNote: e.target.value }
                })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Google Map Embed URL
              </label>
              <input
                type="text"
                value={primeCms.location.googleMapIframeUrl || ''}
                onChange={(e) => setPrimeCms({
                  ...primeCms,
                  location: { ...primeCms.location, googleMapIframeUrl: e.target.value }
                })}
                placeholder="https://maps.google.com/maps?q=...&output=embed"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Controls the map embedded in the Prime Block location section. Paste a
                Google Maps <code className="font-mono">/maps?q=...&amp;output=embed</code> URL.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. PLOT SIZES & DIMENSIONS                                */}
      {/* ========================================================= */}
      {activeCategory === 'plotSizes' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                3. Plot Sizes & Dimension Matrix
              </h4>
              <p className="text-xs text-slate-500">
                Manage residential cuttings (5M, 8M, 10M, 14M, 1K, 2K), square footage, and area benchmarks.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const currentRows = primeCms.plotSizesSection?.rows || [];
                setPrimeCms({
                  ...primeCms,
                  plotSizesSection: {
                    ...primeCms.plotSizesSection!,
                    rows: [
                      ...currentRows,
                      { dimensions: '30 × 60', areaSqFt: '1,800', areaSqYds: '200', commonlyListed: 'New Size' }
                    ]
                  }
                });
              }}
              className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Size Row</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={primeCms.plotSizesSection?.heading || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    plotSizesSection: { ...primeCms.plotSizesSection!, heading: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subline / Description
                </label>
                <input
                  type="text"
                  value={primeCms.plotSizesSection?.subline || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    plotSizesSection: { ...primeCms.plotSizesSection!, subline: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Table Rows Editor */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3">Dimensions</th>
                    <th className="p-3">Area Sq Ft</th>
                    <th className="p-3">Area Sq Yds</th>
                    <th className="p-3">Commonly Listed</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(primeCms.plotSizesSection?.rows || []).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.dimensions}
                          onChange={(e) => {
                            const updated = [...(primeCms.plotSizesSection?.rows || [])];
                            updated[idx].dimensions = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              plotSizesSection: { ...primeCms.plotSizesSection!, rows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-bold"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.areaSqFt}
                          onChange={(e) => {
                            const updated = [...(primeCms.plotSizesSection?.rows || [])];
                            updated[idx].areaSqFt = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              plotSizesSection: { ...primeCms.plotSizesSection!, rows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.areaSqYds}
                          onChange={(e) => {
                            const updated = [...(primeCms.plotSizesSection?.rows || [])];
                            updated[idx].areaSqYds = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              plotSizesSection: { ...primeCms.plotSizesSection!, rows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.commonlyListed}
                          onChange={(e) => {
                            const updated = [...(primeCms.plotSizesSection?.rows || [])];
                            updated[idx].commonlyListed = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              plotSizesSection: { ...primeCms.plotSizesSection!, rows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (primeCms.plotSizesSection?.rows || []).filter((_, i) => i !== idx);
                            setPrimeCms({
                              ...primeCms,
                              plotSizesSection: { ...primeCms.plotSizesSection!, rows: updated }
                            });
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 transition"
                          title="Delete size"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. 4-YEAR INSTALLMENT PAYMENT PLAN SCHEDULE                */}
      {/* ========================================================= */}
      {activeCategory === 'paymentPlan' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                4. 4-Year Installment Plan & Pricing Schedule
              </h4>
              <p className="text-xs text-slate-500">
                Manage down payments (20%), 16 quarterly installments, lump-sum discounts, and extra charge breakdowns.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const current = primeCms.paymentPlanSection?.tableRows || [];
                setPrimeCms({
                  ...primeCms,
                  paymentPlanSection: {
                    ...primeCms.paymentPlanSection!,
                    tableRows: [
                      ...current,
                      { size: '5 Marla (25 × 50)', totalPrice: 'PKR 32,50,000', downPayment: 'PKR 6,50,000 (20%)', quarterlyInstallment: 'PKR 1,45,000 × 16 Qtrs', lumpSumPrice: 'PKR 29,25,000' }
                    ]
                  }
                });
              }}
              className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Plan Row</span>
            </button>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Payment Plan Heading
                </label>
                <input
                  type="text"
                  value={primeCms.paymentPlanSection?.heading || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    paymentPlanSection: { ...primeCms.paymentPlanSection!, heading: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Term / Schedule Note
                </label>
                <input
                  type="text"
                  value={primeCms.paymentPlanSection?.termNote || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    paymentPlanSection: { ...primeCms.paymentPlanSection!, termNote: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <CmsRichTextarea
              label="Plan Intro Summary"
              rows={2}
              value={primeCms.paymentPlanSection?.intro || ''}
              onChange={(val) => setPrimeCms({
                ...primeCms,
                paymentPlanSection: { ...primeCms.paymentPlanSection!, intro: val }
              })}
            />

            {/* Price Table Rows */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3">Plot Size & Dim</th>
                    <th className="p-3">Total Cost</th>
                    <th className="p-3">Down Payment</th>
                    <th className="p-3">16x Qtr Installment</th>
                    <th className="p-3">Lump Sum (10% Off)</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(primeCms.paymentPlanSection?.tableRows || []).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.size}
                          onChange={(e) => {
                            const updated = [...(primeCms.paymentPlanSection?.tableRows || [])];
                            updated[idx].size = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              paymentPlanSection: { ...primeCms.paymentPlanSection!, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-bold"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.totalPrice}
                          onChange={(e) => {
                            const updated = [...(primeCms.paymentPlanSection?.tableRows || [])];
                            updated[idx].totalPrice = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              paymentPlanSection: { ...primeCms.paymentPlanSection!, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-900"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.downPayment}
                          onChange={(e) => {
                            const updated = [...(primeCms.paymentPlanSection?.tableRows || [])];
                            updated[idx].downPayment = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              paymentPlanSection: { ...primeCms.paymentPlanSection!, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-emerald-800"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.quarterlyInstallment}
                          onChange={(e) => {
                            const updated = [...(primeCms.paymentPlanSection?.tableRows || [])];
                            updated[idx].quarterlyInstallment = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              paymentPlanSection: { ...primeCms.paymentPlanSection!, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-[#7b002c]"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.lumpSumPrice}
                          onChange={(e) => {
                            const updated = [...(primeCms.paymentPlanSection?.tableRows || [])];
                            updated[idx].lumpSumPrice = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              paymentPlanSection: { ...primeCms.paymentPlanSection!, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (primeCms.paymentPlanSection?.tableRows || []).filter((_, i) => i !== idx);
                            setPrimeCms({
                              ...primeCms,
                              paymentPlanSection: { ...primeCms.paymentPlanSection!, tableRows: updated }
                            });
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Extra Charges Section */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Extra Charges Besides Plot Price
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const current = primeCms.paymentPlanSection?.extraCharges || [];
                    setPrimeCms({
                      ...primeCms,
                      paymentPlanSection: {
                        ...primeCms.paymentPlanSection!,
                        extraCharges: [
                          ...current,
                          { label: 'New Fee', desc: 'Fee description and payable schedule' }
                        ]
                      }
                    });
                  }}
                  className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold rounded-lg transition flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Extra Charge</span>
                </button>
              </div>

              <div className="space-y-2">
                {(primeCms.paymentPlanSection?.extraCharges || []).map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={c.label}
                      onChange={(e) => {
                        const updated = [...(primeCms.paymentPlanSection?.extraCharges || [])];
                        updated[idx].label = e.target.value;
                        setPrimeCms({
                          ...primeCms,
                          paymentPlanSection: { ...primeCms.paymentPlanSection!, extraCharges: updated }
                        });
                      }}
                      className="w-1/3 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                      placeholder="e.g. Possession charges"
                    />
                    <input
                      type="text"
                      value={c.desc}
                      onChange={(e) => {
                        const updated = [...(primeCms.paymentPlanSection?.extraCharges || [])];
                        updated[idx].desc = e.target.value;
                        setPrimeCms({
                          ...primeCms,
                          paymentPlanSection: { ...primeCms.paymentPlanSection!, extraCharges: updated }
                        });
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      placeholder="Description"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (primeCms.paymentPlanSection?.extraCharges || []).filter((_, i) => i !== idx);
                        setPrimeCms({
                          ...primeCms,
                          paymentPlanSection: { ...primeCms.paymentPlanSection!, extraCharges: updated }
                        });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Why You See Different Prices Online */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Why You See Different Prices Online (QA & Market Clarity)
              </label>
              <input
                type="text"
                value={primeCms.paymentPlanSection?.whyDifferentHeading || ''}
                onChange={(e) => setPrimeCms({
                  ...primeCms,
                  paymentPlanSection: { ...primeCms.paymentPlanSection!, whyDifferentHeading: e.target.value }
                })}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                placeholder="Why you will see different Prime Block prices online"
              />
              <CmsRichTextarea
                label="Historical vs Current Plan Clarification"
                rows={3}
                value={primeCms.paymentPlanSection?.whyDifferentParagraph1 || ''}
                onChange={(val) => setPrimeCms({
                  ...primeCms,
                  paymentPlanSection: { ...primeCms.paymentPlanSection!, whyDifferentParagraph1: val }
                })}
              />
              <CmsRichTextarea
                label="Notice on Official Developer Schedule"
                rows={2}
                value={primeCms.paymentPlanSection?.whyDifferentParagraph2 || ''}
                onChange={(val) => setPrimeCms({
                  ...primeCms,
                  paymentPlanSection: { ...primeCms.paymentPlanSection!, whyDifferentParagraph2: val }
                })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. FACILITIES & AMENITIES CARDS                           */}
      {/* ========================================================= */}
      {activeCategory === 'facilities' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                5. Facilities & Amenities Carousel Cards
              </h4>
              <p className="text-xs text-slate-500">
                Interactive cards with images, tags, titles, and descriptions of Prime Block lifestyle amenities.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const current = primeCms.facilitiesSection?.cards || [];
                setPrimeCms({
                  ...primeCms,
                  facilitiesSection: {
                    ...primeCms.facilitiesSection!,
                    cards: [
                      ...current,
                      {
                        id: Date.now(),
                        label: 'LIFESTYLE',
                        title: 'New Community Feature',
                        image: '/images/faisal-hills-drone-view.webp',
                        desc: 'Description of the planned community facility'
                      }
                    ]
                  }
                });
              }}
              className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Facility Card</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={primeCms.facilitiesSection?.heading || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    facilitiesSection: { ...primeCms.facilitiesSection!, heading: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Under Construction Transparency Note
                </label>
                <input
                  type="text"
                  value={primeCms.facilitiesSection?.footerNote || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    facilitiesSection: { ...primeCms.facilitiesSection!, footerNote: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(primeCms.facilitiesSection?.cards || []).map((card, idx) => (
                <div key={card.id || idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative group">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-bold text-[#7b002c]">
                      Card #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (primeCms.facilitiesSection?.cards || []).filter((_, i) => i !== idx);
                        setPrimeCms({
                          ...primeCms,
                          facilitiesSection: { ...primeCms.facilitiesSection!, cards: updated }
                        });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                      title="Remove card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase">Tag / Badge</label>
                      <input
                        type="text"
                        value={card.label}
                        onChange={(e) => {
                          const updated = [...(primeCms.facilitiesSection?.cards || [])];
                          updated[idx].label = e.target.value;
                          setPrimeCms({
                            ...primeCms,
                            facilitiesSection: { ...primeCms.facilitiesSection!, cards: updated }
                          });
                        }}
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-800 uppercase"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-600 uppercase">Card Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const updated = [...(primeCms.facilitiesSection?.cards || [])];
                          updated[idx].title = e.target.value;
                          setPrimeCms({
                            ...primeCms,
                            facilitiesSection: { ...primeCms.facilitiesSection!, cards: updated }
                          });
                        }}
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <ImageUploader
                    label={`Card Image #${idx + 1}`}
                    value={card.image || ''}
                    onChange={(val) => {
                      const updated = [...(primeCms.facilitiesSection?.cards || [])];
                      updated[idx].image = val;
                      setPrimeCms({
                        ...primeCms,
                        facilitiesSection: { ...primeCms.facilitiesSection!, cards: updated }
                      });
                    }}
                  />

                  <CmsRichTextarea
                    label="Description"
                    rows={2}
                    value={card.desc || ''}
                    onChange={(val) => {
                      const updated = [...(primeCms.facilitiesSection?.cards || [])];
                      updated[idx].desc = val;
                      setPrimeCms({
                        ...primeCms,
                        facilitiesSection: { ...primeCms.facilitiesSection!, cards: updated }
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. WHY BUYERS CHOOSE PRIME BLOCK & WEIGH FACTORS          */}
      {/* ========================================================= */}
      {activeCategory === 'whyChoose' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              6. Why Buyers Choose Prime Block (Pros & Considerations)
            </h4>
            <p className="text-xs text-slate-500">
              Honest investment rationale: entry prices, installment leverage vs possession wait and construction timelines.
            </p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={primeCms.whyChooseSection?.badge || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    whyChooseSection: { ...primeCms.whyChooseSection!, badge: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Main Section Heading
                </label>
                <input
                  type="text"
                  value={primeCms.whyChooseSection?.heading || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    whyChooseSection: { ...primeCms.whyChooseSection!, heading: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            {/* Advantages Column */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Advantages (Why Buyers Choose)</span>
                </h5>
                <button
                  type="button"
                  onClick={() => {
                    const cur = primeCms.whyChooseSection?.advantages || [];
                    setPrimeCms({
                      ...primeCms,
                      whyChooseSection: {
                        ...primeCms.whyChooseSection!,
                        advantages: [...cur, { title: 'New Advantage', desc: 'Description of the benefit' }]
                      }
                    });
                  }}
                  className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[11px] font-bold rounded-lg transition flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Advantage</span>
                </button>
              </div>

              <div className="space-y-2">
                {(primeCms.whyChooseSection?.advantages || []).map((adv, idx) => (
                  <div key={idx} className="p-3 bg-white border border-emerald-100 rounded-lg space-y-1 relative">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={adv.title}
                        onChange={(e) => {
                          const updated = [...(primeCms.whyChooseSection?.advantages || [])];
                          updated[idx].title = e.target.value;
                          setPrimeCms({
                            ...primeCms,
                            whyChooseSection: { ...primeCms.whyChooseSection!, advantages: updated }
                          });
                        }}
                        className="w-3/4 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-900"
                        placeholder="Advantage title"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (primeCms.whyChooseSection?.advantages || []).filter((_, i) => i !== idx);
                          setPrimeCms({
                            ...primeCms,
                            whyChooseSection: { ...primeCms.whyChooseSection!, advantages: updated }
                          });
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <CmsRichTextarea
                      label="Description"
                      rows={2}
                      value={adv.desc}
                      onChange={(val) => {
                        const updated = [...(primeCms.whyChooseSection?.advantages || [])];
                        updated[idx].desc = val;
                        setPrimeCms({
                          ...primeCms,
                          whyChooseSection: { ...primeCms.whyChooseSection!, advantages: updated }
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Considerations Column */}
            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Important Considerations & Weigh Factors</span>
                </h5>
                <button
                  type="button"
                  onClick={() => {
                    const cur = primeCms.whyChooseSection?.considerations || [];
                    setPrimeCms({
                      ...primeCms,
                      whyChooseSection: {
                        ...primeCms.whyChooseSection!,
                        considerations: [...cur, { title: 'New Weigh Factor', desc: 'Description of what to verify before buying' }]
                      }
                    });
                  }}
                  className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold rounded-lg transition flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Consideration</span>
                </button>
              </div>

              <div className="space-y-2">
                {(primeCms.whyChooseSection?.considerations || []).map((con, idx) => (
                  <div key={idx} className="p-3 bg-white border border-amber-100 rounded-lg space-y-1 relative">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={con.title}
                        onChange={(e) => {
                          const updated = [...(primeCms.whyChooseSection?.considerations || [])];
                          updated[idx].title = e.target.value;
                          setPrimeCms({
                            ...primeCms,
                            whyChooseSection: { ...primeCms.whyChooseSection!, considerations: updated }
                          });
                        }}
                        className="w-3/4 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-900"
                        placeholder="Consideration title"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (primeCms.whyChooseSection?.considerations || []).filter((_, i) => i !== idx);
                          setPrimeCms({
                            ...primeCms,
                            whyChooseSection: { ...primeCms.whyChooseSection!, considerations: updated }
                          });
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <CmsRichTextarea
                      label="Description"
                      rows={2}
                      value={con.desc}
                      onChange={(val) => {
                        const updated = [...(primeCms.whyChooseSection?.considerations || [])];
                        updated[idx].desc = val;
                        setPrimeCms({
                          ...primeCms,
                          whyChooseSection: { ...primeCms.whyChooseSection!, considerations: updated }
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <CmsRichTextarea
              label="Disclaimer Note (No Speculative Returns Promise)"
              rows={2}
              value={primeCms.whyChooseSection?.disclaimerNote || ''}
              onChange={(val) => setPrimeCms({
                ...primeCms,
                whyChooseSection: { ...primeCms.whyChooseSection!, disclaimerNote: val }
              })}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. DEVELOPMENT & CONSTRUCTION STATUS                      */}
      {/* ========================================================= */}
      {activeCategory === 'devStatus' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                7. On-Ground Development Status & Milestones
              </h4>
              <p className="text-xs text-slate-500">
                Site office, heavy earthwork, boulevards, underground electrification, and possession status checklist.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const cur = primeCms.developmentStatusSection?.tableRows || [];
                setPrimeCms({
                  ...primeCms,
                  developmentStatusSection: {
                    ...primeCms.developmentStatusSection!,
                    tableRows: [
                      ...cur,
                      { item: 'New Infrastructure Component', status: 'Under Progress', asAt: 'Current Month' }
                    ]
                  }
                });
              }}
              className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Status Item</span>
            </button>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={primeCms.developmentStatusSection?.heading || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    developmentStatusSection: { ...primeCms.developmentStatusSection!, heading: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Last Updated Date
                </label>
                <input
                  type="text"
                  value={primeCms.developmentStatusSection?.lastUpdated || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    developmentStatusSection: { ...primeCms.developmentStatusSection!, lastUpdated: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Site Photo Link Text
                </label>
                <input
                  type="text"
                  value={primeCms.developmentStatusSection?.photoLinkText || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    developmentStatusSection: { ...primeCms.developmentStatusSection!, photoLinkText: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* 3 Metric Stat Counters */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                3 Key Status Metric Cards
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-semibold">Earthwork Metric</label>
                  <input
                    type="text"
                    value={primeCms.developmentStatusSection?.statBoxes?.earthwork || ''}
                    onChange={(e) => setPrimeCms({
                      ...primeCms,
                      developmentStatusSection: {
                        ...primeCms.developmentStatusSection!,
                        statBoxes: {
                          ...primeCms.developmentStatusSection?.statBoxes!,
                          earthwork: e.target.value
                        }
                      }
                    })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-amber-700"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-semibold">Roads Network Metric</label>
                  <input
                    type="text"
                    value={primeCms.developmentStatusSection?.statBoxes?.roads || ''}
                    onChange={(e) => setPrimeCms({
                      ...primeCms,
                      developmentStatusSection: {
                        ...primeCms.developmentStatusSection!,
                        statBoxes: {
                          ...primeCms.developmentStatusSection?.statBoxes!,
                          roads: e.target.value
                        }
                      }
                    })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-sky-700"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-semibold">Possession Timeline</label>
                  <input
                    type="text"
                    value={primeCms.developmentStatusSection?.statBoxes?.possession || ''}
                    onChange={(e) => setPrimeCms({
                      ...primeCms,
                      developmentStatusSection: {
                        ...primeCms.developmentStatusSection!,
                        statBoxes: {
                          ...primeCms.developmentStatusSection?.statBoxes!,
                          possession: e.target.value
                        }
                      }
                    })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-emerald-700"
                  />
                </div>
              </div>
            </div>

            {/* Status Checklist Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3">Infrastructure Item</th>
                    <th className="p-3">Current Status</th>
                    <th className="p-3">As At Date</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(primeCms.developmentStatusSection?.tableRows || []).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.item}
                          onChange={(e) => {
                            const updated = [...(primeCms.developmentStatusSection?.tableRows || [])];
                            updated[idx].item = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              developmentStatusSection: { ...primeCms.developmentStatusSection!, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-900"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.status}
                          onChange={(e) => {
                            const updated = [...(primeCms.developmentStatusSection?.tableRows || [])];
                            updated[idx].status = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              developmentStatusSection: { ...primeCms.developmentStatusSection!, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-semibold text-emerald-800"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.asAt}
                          onChange={(e) => {
                            const updated = [...(primeCms.developmentStatusSection?.tableRows || [])];
                            updated[idx].asAt = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              developmentStatusSection: { ...primeCms.developmentStatusSection!, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (primeCms.developmentStatusSection?.tableRows || []).filter((_, i) => i !== idx);
                            setPrimeCms({
                              ...primeCms,
                              developmentStatusSection: { ...primeCms.developmentStatusSection!, tableRows: updated }
                            });
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. POSSESSION ADVICE & READY VS INSTALLMENT                */}
      {/* ========================================================= */}
      {activeCategory === 'possession' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              8. Possession Advice & Construction Readiness Guide
            </h4>
            <p className="text-xs text-slate-500">
              Clear buyer advice comparing long-term installment investment against ready-possession sectors (Block A & Executive).
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Advice Heading
              </label>
              <input
                type="text"
                value={primeCms.possessionAdviceSection?.heading || ''}
                onChange={(e) => setPrimeCms({
                  ...primeCms,
                  possessionAdviceSection: { ...primeCms.possessionAdviceSection!, heading: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <CmsRichTextarea
              label="Paragraph 1 (Installment Plan Timeline vs Immediate Construction)"
              rows={3}
              value={primeCms.possessionAdviceSection?.paragraph1 || ''}
              onChange={(val) => setPrimeCms({
                ...primeCms,
                possessionAdviceSection: { ...primeCms.possessionAdviceSection!, paragraph1: val }
              })}
            />

            <CmsRichTextarea
              label="Paragraph 2 (Block A Alternative Recommendation)"
              rows={3}
              value={primeCms.possessionAdviceSection?.paragraph2 || ''}
              onChange={(val) => setPrimeCms({
                ...primeCms,
                possessionAdviceSection: { ...primeCms.possessionAdviceSection!, paragraph2: val }
              })}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. PRIME BLOCK VS BLOCK A COMPARISON MATRIX               */}
      {/* ========================================================= */}
      {activeCategory === 'comparisons' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                9. Prime Block vs Block A Comparison Matrix
              </h4>
              <p className="text-xs text-slate-500">
                Compare price per marla, payment structure, development stage, and investor suitability.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const cur = primeCms.comparisonSection?.rows || [];
                setPrimeCms({
                  ...primeCms,
                  comparisonSection: {
                    ...primeCms.comparisonSection!,
                    rows: [
                      ...cur,
                      { aspect: 'New Comparison Metric', primeBlock: 'Prime Block Spec', blockA: 'Block A Spec' }
                    ]
                  }
                });
              }}
              className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Comparison Row</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Matrix Heading
                </label>
                <input
                  type="text"
                  value={primeCms.comparisonSection?.heading || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    comparisonSection: { ...primeCms.comparisonSection!, heading: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Column 1 Name (Prime)
                </label>
                <input
                  type="text"
                  value={primeCms.comparisonSection?.primeBlockColumnName || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    comparisonSection: { ...primeCms.comparisonSection!, primeBlockColumnName: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Column 2 Name (Block A)
                </label>
                <input
                  type="text"
                  value={primeCms.comparisonSection?.blockAColumnName || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    comparisonSection: { ...primeCms.comparisonSection!, blockAColumnName: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3">Comparison Aspect</th>
                    <th className="p-3">Prime Block</th>
                    <th className="p-3">Block A</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(primeCms.comparisonSection?.rows || []).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.aspect}
                          onChange={(e) => {
                            const updated = [...(primeCms.comparisonSection?.rows || [])];
                            updated[idx].aspect = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              comparisonSection: { ...primeCms.comparisonSection!, rows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-900"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.primeBlock}
                          onChange={(e) => {
                            const updated = [...(primeCms.comparisonSection?.rows || [])];
                            updated[idx].primeBlock = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              comparisonSection: { ...primeCms.comparisonSection!, rows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-amber-900 font-medium"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.blockA}
                          onChange={(e) => {
                            const updated = [...(primeCms.comparisonSection?.rows || [])];
                            updated[idx].blockA = e.target.value;
                            setPrimeCms({
                              ...primeCms,
                              comparisonSection: { ...primeCms.comparisonSection!, rows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (primeCms.comparisonSection?.rows || []).filter((_, i) => i !== idx);
                            setPrimeCms({
                              ...primeCms,
                              comparisonSection: { ...primeCms.comparisonSection!, rows: updated }
                            });
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. 4-STEP BOOKING PROCESS & VERIFICATION                 */}
      {/* ========================================================= */}
      {activeCategory === 'booking' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              10. 4-Step Booking & Verification Workflow
            </h4>
            <p className="text-xs text-slate-500">
              Guide buyers through plot selection, down payment deposit, file creation, and head office verification.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={primeCms.bookingProcessSection?.badge || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    bookingProcessSection: { ...primeCms.bookingProcessSection!, badge: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={primeCms.bookingProcessSection?.heading || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    bookingProcessSection: { ...primeCms.bookingProcessSection!, heading: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(primeCms.bookingProcessSection?.steps || []).map((step, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#7b002c] text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={step.tag || ''}
                      onChange={(e) => {
                        const updated = [...(primeCms.bookingProcessSection?.steps || [])];
                        updated[idx].tag = e.target.value;
                        setPrimeCms({
                          ...primeCms,
                          bookingProcessSection: { ...primeCms.bookingProcessSection!, steps: updated }
                        });
                      }}
                      className="px-2 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-bold uppercase text-slate-600"
                      placeholder="Step Tag"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Step Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const updated = [...(primeCms.bookingProcessSection?.steps || [])];
                        updated[idx].title = e.target.value;
                        setPrimeCms({
                          ...primeCms,
                          bookingProcessSection: { ...primeCms.bookingProcessSection!, steps: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-900"
                    />
                  </div>
                  <CmsRichTextarea
                    label="Step Description"
                    rows={3}
                    value={step.desc}
                    onChange={(val) => {
                      const updated = [...(primeCms.bookingProcessSection?.steps || [])];
                      updated[idx].desc = val;
                      setPrimeCms({
                        ...primeCms,
                        bookingProcessSection: { ...primeCms.bookingProcessSection!, steps: updated }
                      });
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Verification & Head Office Assistance Box
              </label>
              <input
                type="text"
                value={primeCms.bookingProcessSection?.assistanceBoxHeading || ''}
                onChange={(e) => setPrimeCms({
                  ...primeCms,
                  bookingProcessSection: { ...primeCms.bookingProcessSection!, assistanceBoxHeading: e.target.value }
                })}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                placeholder="Direct Developer Verification Assistance"
              />
              <CmsRichTextarea
                label="Direct Developer Verification Assistance"
                rows={2}
                value={primeCms.bookingProcessSection?.assistanceBoxText || ''}
                onChange={(val) => setPrimeCms({
                  ...primeCms,
                  bookingProcessSection: { ...primeCms.bookingProcessSection!, assistanceBoxText: val }
                })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. PRIME BLOCK FAQS ACCORDION                            */}
      {/* ========================================================= */}
      {activeCategory === 'faqs' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                11. Prime Block Frequently Asked Questions
              </h4>
              <p className="text-xs text-slate-500">
                10+ verified FAQ items answering buyer questions on installments, balloting, RDA NOC status, and possession.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const cur = primeCms.faqsSection?.faqs || [];
                setPrimeCms({
                  ...primeCms,
                  faqsSection: {
                    ...primeCms.faqsSection!,
                    faqs: [
                      ...cur,
                      { q: 'New Question About Prime Block?', a: 'Detailed answer answering the question with official society guidelines.' }
                    ]
                  }
                });
              }}
              className="px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                FAQ Section Heading
              </label>
              <input
                type="text"
                value={primeCms.faqsSection?.heading || ''}
                onChange={(e) => setPrimeCms({
                  ...primeCms,
                  faqsSection: { ...primeCms.faqsSection!, heading: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div className="space-y-3">
              {(primeCms.faqsSection?.faqs || []).map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#7b002c]">
                      FAQ #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (primeCms.faqsSection?.faqs || []).filter((_, i) => i !== idx);
                        setPrimeCms({
                          ...primeCms,
                          faqsSection: { ...primeCms.faqsSection!, faqs: updated }
                        });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Question</label>
                    <input
                      type="text"
                      value={faq.q}
                      onChange={(e) => {
                        const updated = [...(primeCms.faqsSection?.faqs || [])];
                        updated[idx].q = e.target.value;
                        setPrimeCms({
                          ...primeCms,
                          faqsSection: { ...primeCms.faqsSection!, faqs: updated }
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                    />
                  </div>

                  <CmsRichTextarea
                    label="Answer"
                    rows={3}
                    value={faq.a}
                    onChange={(val) => {
                      const updated = [...(primeCms.faqsSection?.faqs || [])];
                      updated[idx].a = val;
                      setPrimeCms({
                        ...primeCms,
                        faqsSection: { ...primeCms.faqsSection!, faqs: updated }
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. SITE VISIT & CONSULTATION LEAD DESK                   */}
      {/* ========================================================= */}
      {activeCategory === 'closing' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              12. Closing Site Visit Consultation & Lead Desk
            </h4>
            <p className="text-xs text-slate-500">
              Call-to-action banner, direct consultation contact links, lead form titles, and audited editorial byline.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Closing Banner Heading
              </label>
              <input
                type="text"
                value={primeCms.closingSiteVisitSection?.heading || ''}
                onChange={(e) => setPrimeCms({
                  ...primeCms,
                  closingSiteVisitSection: { ...primeCms.closingSiteVisitSection!, heading: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <CmsRichTextarea
              label="Paragraph 1 (Site Visit Advisory)"
              rows={3}
              value={primeCms.closingSiteVisitSection?.paragraph1 || ''}
              onChange={(val) => setPrimeCms({
                ...primeCms,
                closingSiteVisitSection: { ...primeCms.closingSiteVisitSection!, paragraph1: val }
              })}
            />

            <CmsRichTextarea
              label="Paragraph 2 (Verification Before Transfer)"
              rows={3}
              value={primeCms.closingSiteVisitSection?.paragraph2 || ''}
              onChange={(val) => setPrimeCms({
                ...primeCms,
                closingSiteVisitSection: { ...primeCms.closingSiteVisitSection!, paragraph2: val }
              })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Lead Form Title
                </label>
                <input
                  type="text"
                  value={primeCms.closingSiteVisitSection?.formTitle || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    closingSiteVisitSection: { ...primeCms.closingSiteVisitSection!, formTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Lead Form Button Text
                </label>
                <input
                  type="text"
                  value={primeCms.closingSiteVisitSection?.formButtonText || ''}
                  onChange={(e) => setPrimeCms({
                    ...primeCms,
                    closingSiteVisitSection: { ...primeCms.closingSiteVisitSection!, formButtonText: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Editorial Reviewer Byline Note
              </label>
              <input
                type="text"
                value={primeCms.closingSiteVisitSection?.reviewedByNote || ''}
                onChange={(e) => setPrimeCms({
                  ...primeCms,
                  closingSiteVisitSection: { ...primeCms.closingSiteVisitSection!, reviewedByNote: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
