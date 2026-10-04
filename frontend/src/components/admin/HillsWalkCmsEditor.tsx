'use client';

import React, { useState, useRef } from 'react';
import {
  HillsWalkCMSData,
  initialHillsWalkCMS,
  saveHillsWalkCMS,
  HillsWalkPriceRow
} from '@/data/faisalHillsData';
import { ImageUploader, type ImageUploaderProps } from './ImageUploader';
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
  Camera,
  Loader2,
  Check,
  Upload,
  X,
  Link2,
  ShoppingBag,
  TrendingUp,
  Activity,
  Trees,
  Car,
  Utensils
} from 'lucide-react';

// Derived from the uploader's own props rather than restated, so a capability
// added to `ImageUploader` (alt text, folder, aspect ratio) is immediately
// usable here. The previous hand-written subset silently omitted them.
interface ImageUploadFieldProps extends Omit<ImageUploaderProps, 'token'> {}

/**
 * Builds the shared uploader with this editor's bearer token already bound.
 *
 * These editors previously each carried a private copy of the upload widget
 * that downscaled the file in the browser and assigned the resulting base64
 * data URL into CMS state. That wrote image bytes into the settings JSON column
 * and duplicated the same widget seven more times. The token is bound here so
 * call sites do not each have to pass it, and so an editor without a token still
 * renders instead of referencing an out-of-scope name.
 */
const createImageUploadField = (token?: string | null) => {
  const Field: React.FC<ImageUploadFieldProps> = (props) => (
    <ImageUploader {...props} token={token || undefined} />
  );

  return Field;
};

interface HillsWalkCmsEditorProps {
  hillsWalkCms: HillsWalkCMSData;
  setHillsWalkCms: React.Dispatch<React.SetStateAction<HillsWalkCMSData>>;
  token?: string;
  onSaveSuccess?: (msg: string) => void;
}

export default function HillsWalkCmsEditor({
  hillsWalkCms,
  setHillsWalkCms,
  token,
  onSaveSuccess
}: HillsWalkCmsEditorProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    | 'hero'
    | 'overview'
    | 'location'
    | 'masterPlan'
    | 'pricing'
    | 'amenities'
    | 'roi'
    | 'devStatus'
    | 'faqs'
    | 'inquiry'
  >('hero');

  const [isSaving, setIsSaving] = useState(false);
  const [saveBanner, setSaveBanner] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const ok = await saveHillsWalkCMS(hillsWalkCms, token);
    setIsSaving(false);
    if (ok) {
      setSaveBanner(true);
      if (onSaveSuccess) onSaveSuccess('Hills Walk Commercial Hub published live successfully!');
      setTimeout(() => setSaveBanner(false), 3500);
    }
  };

  const handleReset = () => {
    if (confirm('Reset Hills Walk Commercial CMS to verified official defaults?')) {
      setHillsWalkCms(initialHillsWalkCMS);
    }
  };

  const subTabs = [
    { id: 'hero', label: '1. Hero & Promenade', icon: Sparkles },
    { id: 'overview', label: '2. Concept & Facts', icon: FileText },
    { id: 'location', label: '3. Location & M-1 Access', icon: MapPin },
    { id: 'masterPlan', label: '4. Commercial Layout', icon: Compass },
    { id: 'pricing', label: '5. Commercial Plots & Rates', icon: DollarSign },
    { id: 'amenities', label: '6. Features & Facilities', icon: Layers },
    { id: 'roi', label: '7. Investment ROI & Yield', icon: TrendingUp },
    { id: 'devStatus', label: '8. Construction Progress', icon: Award },
    { id: 'faqs', label: '9. FAQs', icon: HelpCircle },
    { id: 'inquiry', label: '10. Commercial Advisory Desk', icon: PhoneCall },
  ] as const;

  const ImageUploadField = createImageUploadField(token);

  return (
    <div className="space-y-6">
      {/* Top Action Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Hills Walk Commercial Hub CMS Editor
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider">
              10 Full Sections
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full control over commercial plaza cuttings, promenade floor heights, rental yield stats, and booking contacts.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <a
            href="/blocks/hills-walk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#7b002c] hover:bg-rose-50 border border-rose-200 rounded-xl transition cursor-pointer"
          >
            <span>Live Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Hills Walk'}</span>
          </button>
        </div>
      </div>

      {saveBanner && (
        <div className="p-4 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Hills Walk Commercial content and pricing successfully published to live website!</span>
        </div>
      )}

      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 p-2 rounded-2xl border border-slate-300">
        {subTabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeSubTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveSubTab(t.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 1. HERO & PROMENADE                                       */}
      {/* ========================================================= */}
      {activeSubTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">1. Hero Banner & Promenade Visuals</h4>
            <p className="text-xs text-slate-500">Edit promenade title, badges, and panoramic aerial background image.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Hero Eyebrow Tagline"
              value={hillsWalkCms.hero.eyebrow}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, hero: { ...hillsWalkCms.hero, eyebrow: val } })}
            />
            <CmsRichInput
              label="Promenade Main Title"
              value={hillsWalkCms.hero.title}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, hero: { ...hillsWalkCms.hero, title: val } })}
            />
            <CmsRichTextarea
              label="Hero Subtitle / Description"
              rows={3}
              value={hillsWalkCms.hero.subtitle}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, hero: { ...hillsWalkCms.hero, subtitle: val } })}
            />

            <ImageUploadField
              label="Promenade Aerial Background Image"
              value={hillsWalkCms.hero.bgImage}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, hero: { ...hillsWalkCms.hero, bgImage: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <CmsRichInput
                label="Hero Badge 1"
                value={hillsWalkCms.hero.badge1}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, hero: { ...hillsWalkCms.hero, badge1: val } })}
              />
              <CmsRichInput
                label="Hero Badge 2"
                value={hillsWalkCms.hero.badge2}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, hero: { ...hillsWalkCms.hero, badge2: val } })}
              />
              <CmsRichInput
                label="Hero Badge 3"
                value={hillsWalkCms.hero.badge3}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, hero: { ...hillsWalkCms.hero, badge3: val } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. CONCEPT & QUICK FACTS                                  */}
      {/* ========================================================= */}
      {activeSubTab === 'overview' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">2. Promenade Concept & Commercial Specs</h4>
            <p className="text-xs text-slate-500">Edit retail concept description, footfall targets, and parking capacities.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Overview H1 Title"
              value={hillsWalkCms.overview.h1}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, overview: { ...hillsWalkCms.overview, h1: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={3}
              value={hillsWalkCms.overview.leadParagraph}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, overview: { ...hillsWalkCms.overview, leadParagraph: val } })}
            />
            <CmsRichTextarea
              label="Concept & Footfall Details"
              rows={3}
              value={hillsWalkCms.overview.conceptDetails}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, overview: { ...hillsWalkCms.overview, conceptDetails: val } })}
            />

            <ImageUploadField
              label="Overview Photo"
              value={hillsWalkCms.overview.photoUrl}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, overview: { ...hillsWalkCms.overview, photoUrl: val } })}
            />

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700">Commercial Quick Specs</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <CmsRichInput
                  label="Total Commercial Area"
                  value={hillsWalkCms.overview.quickFacts.totalArea}
                  onChange={(val) =>
                    setHillsWalkCms({
                      ...hillsWalkCms,
                      overview: { ...hillsWalkCms.overview, quickFacts: { ...hillsWalkCms.overview.quickFacts, totalArea: val } }
                    })
                  }
                />
                <CmsRichInput
                  label="Commercial Cuttings"
                  value={hillsWalkCms.overview.quickFacts.commercialCuttings}
                  onChange={(val) =>
                    setHillsWalkCms({
                      ...hillsWalkCms,
                      overview: { ...hillsWalkCms.overview, quickFacts: { ...hillsWalkCms.overview.quickFacts, commercialCuttings: val } }
                    })
                  }
                />
                <CmsRichInput
                  label="Approved Building Height"
                  value={hillsWalkCms.overview.quickFacts.buildingHeight}
                  onChange={(val) =>
                    setHillsWalkCms({
                      ...hillsWalkCms,
                      overview: { ...hillsWalkCms.overview, quickFacts: { ...hillsWalkCms.overview.quickFacts, buildingHeight: val } }
                    })
                  }
                />
                <CmsRichInput
                  label="Daily Footfall Target"
                  value={hillsWalkCms.overview.quickFacts.footfallTarget}
                  onChange={(val) =>
                    setHillsWalkCms({
                      ...hillsWalkCms,
                      overview: { ...hillsWalkCms.overview, quickFacts: { ...hillsWalkCms.overview.quickFacts, footfallTarget: val } }
                    })
                  }
                />
                <CmsRichInput
                  label="Parking Capacity"
                  value={hillsWalkCms.overview.quickFacts.parkingCapacity}
                  onChange={(val) =>
                    setHillsWalkCms({
                      ...hillsWalkCms,
                      overview: { ...hillsWalkCms.overview, quickFacts: { ...hillsWalkCms.overview.quickFacts, parkingCapacity: val } }
                    })
                  }
                />
                <CmsRichInput
                  label="Possession / Building Status"
                  value={hillsWalkCms.overview.quickFacts.possessionStatus}
                  onChange={(val) =>
                    setHillsWalkCms({
                      ...hillsWalkCms,
                      overview: { ...hillsWalkCms.overview, quickFacts: { ...hillsWalkCms.overview.quickFacts, possessionStatus: val } }
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. LOCATION & M-1 CONNECTIVITY                            */}
      {/* ========================================================= */}
      {activeSubTab === 'location' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">3. Strategic Location & Drive Times</h4>
              <p className="text-xs text-slate-500">Edit access corridors and drive distances to key hubs.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setHillsWalkCms({
                  ...hillsWalkCms,
                  location: {
                    ...hillsWalkCms.location,
                    driveTimes: [
                      ...hillsWalkCms.location.driveTimes,
                      { destination: 'New Destination', distance: '3 km', time: '4 mins', note: 'Direct corridor' }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Drive Time</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Location Heading"
              value={hillsWalkCms.location.heading}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, location: { ...hillsWalkCms.location, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={hillsWalkCms.location.leadParagraph}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, location: { ...hillsWalkCms.location, leadParagraph: val } })}
            />
            <CmsRichTextarea
              label="Accessibility Notes"
              rows={2}
              value={hillsWalkCms.location.accessibilityNotes}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, location: { ...hillsWalkCms.location, accessibilityNotes: val } })}
            />
            <CmsRichInput
              label="Google Map Embed URL"
              value={hillsWalkCms.location.googleMapEmbedUrl}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, location: { ...hillsWalkCms.location, googleMapEmbedUrl: val } })}
            />

            <div className="space-y-2.5 pt-2">
              {hillsWalkCms.location.driveTimes.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Destination"
                    value={item.destination}
                    onChange={(e) => {
                      const updated = [...hillsWalkCms.location.driveTimes];
                      updated[idx].destination = e.target.value;
                      setHillsWalkCms({ ...hillsWalkCms, location: { ...hillsWalkCms.location, driveTimes: updated } });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Distance"
                    value={item.distance}
                    onChange={(e) => {
                      const updated = [...hillsWalkCms.location.driveTimes];
                      updated[idx].distance = e.target.value;
                      setHillsWalkCms({ ...hillsWalkCms, location: { ...hillsWalkCms.location, driveTimes: updated } });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Time"
                    value={item.time}
                    onChange={(e) => {
                      const updated = [...hillsWalkCms.location.driveTimes];
                      updated[idx].time = e.target.value;
                      setHillsWalkCms({ ...hillsWalkCms, location: { ...hillsWalkCms.location, driveTimes: updated } });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-amber-800"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Note"
                      value={item.note}
                      onChange={(e) => {
                        const updated = [...hillsWalkCms.location.driveTimes];
                        updated[idx].note = e.target.value;
                        setHillsWalkCms({ ...hillsWalkCms, location: { ...hillsWalkCms.location, driveTimes: updated } });
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-white border rounded text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = hillsWalkCms.location.driveTimes.filter((_, i) => i !== idx);
                        setHillsWalkCms({ ...hillsWalkCms, location: { ...hillsWalkCms.location, driveTimes: updated } });
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. MASTER PLAN LAYOUT                                     */}
      {/* ========================================================= */}
      {activeSubTab === 'masterPlan' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">4. Commercial Master Layout</h4>
            <p className="text-xs text-slate-500">Edit layout description, map graphic, and downloadable brochure link.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Layout Heading"
              value={hillsWalkCms.masterPlan.heading}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, masterPlan: { ...hillsWalkCms.masterPlan, heading: val } })}
            />
            <CmsRichTextarea
              label="Layout Description"
              rows={3}
              value={hillsWalkCms.masterPlan.description}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, masterPlan: { ...hillsWalkCms.masterPlan, description: val } })}
            />

            <ImageUploadField
              label="Commercial Layout Map Image"
              value={hillsWalkCms.masterPlan.mapImageUrl}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, masterPlan: { ...hillsWalkCms.masterPlan, mapImageUrl: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <CmsRichInput
                label="PDF Download URL"
                value={hillsWalkCms.masterPlan.mapPdfUrl}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, masterPlan: { ...hillsWalkCms.masterPlan, mapPdfUrl: val } })}
              />
              <CmsRichInput
                label="Button Text"
                value={hillsWalkCms.masterPlan.downloadButtonText}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, masterPlan: { ...hillsWalkCms.masterPlan, downloadButtonText: val } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. COMMERCIAL PLOT PRICES                                 */}
      {/* ========================================================= */}
      {activeSubTab === 'pricing' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">5. Commercial Plot Price Schedule</h4>
              <p className="text-xs text-slate-500">Edit plaza cutting prices, approved storey heights, and investor highlights.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setHillsWalkCms({
                  ...hillsWalkCms,
                  priceSchedule: {
                    ...hillsWalkCms.priceSchedule,
                    rows: [
                      ...hillsWalkCms.priceSchedule.rows,
                      {
                        size: '4 Marla Commercial Plaza',
                        dimensions: '30 × 30',
                        sqYards: '100 Sq. Yds',
                        sqFeet: '900 Sq. Ft',
                        category: 'Commercial',
                        priceRange: 'PKR 2.20 Cr – 2.80 Cr',
                        approval: 'Ground + 4 Storey',
                        highlight: 'High footfall avenue'
                      }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Commercial Cutting</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Price Schedule Heading"
              value={hillsWalkCms.priceSchedule.heading}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, priceSchedule: { ...hillsWalkCms.priceSchedule, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={hillsWalkCms.priceSchedule.leadParagraph}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, priceSchedule: { ...hillsWalkCms.priceSchedule, leadParagraph: val } })}
            />

            <div className="space-y-3">
              {hillsWalkCms.priceSchedule.rows.map((row, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7b002c]">{row.size}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = hillsWalkCms.priceSchedule.rows.filter((_, i) => i !== idx);
                        setHillsWalkCms({ ...hillsWalkCms, priceSchedule: { ...hillsWalkCms.priceSchedule, rows: updated } });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Plot Title</label>
                      <input
                        type="text"
                        value={row.size}
                        onChange={(e) => {
                          const updated = [...hillsWalkCms.priceSchedule.rows];
                          updated[idx].size = e.target.value;
                          setHillsWalkCms({ ...hillsWalkCms, priceSchedule: { ...hillsWalkCms.priceSchedule, rows: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Dimensions</label>
                      <input
                        type="text"
                        value={row.dimensions}
                        onChange={(e) => {
                          const updated = [...hillsWalkCms.priceSchedule.rows];
                          updated[idx].dimensions = e.target.value;
                          setHillsWalkCms({ ...hillsWalkCms, priceSchedule: { ...hillsWalkCms.priceSchedule, rows: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Price Range</label>
                      <input
                        type="text"
                        value={row.priceRange}
                        onChange={(e) => {
                          const updated = [...hillsWalkCms.priceSchedule.rows];
                          updated[idx].priceRange = e.target.value;
                          setHillsWalkCms({ ...hillsWalkCms, priceSchedule: { ...hillsWalkCms.priceSchedule, rows: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-emerald-800 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Approved Height</label>
                      <input
                        type="text"
                        value={row.approval}
                        onChange={(e) => {
                          const updated = [...hillsWalkCms.priceSchedule.rows];
                          updated[idx].approval = e.target.value;
                          setHillsWalkCms({ ...hillsWalkCms, priceSchedule: { ...hillsWalkCms.priceSchedule, rows: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-purple-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Investor Highlight Note</label>
                    <input
                      type="text"
                      value={row.highlight}
                      onChange={(e) => {
                        const updated = [...hillsWalkCms.priceSchedule.rows];
                        updated[idx].highlight = e.target.value;
                        setHillsWalkCms({ ...hillsWalkCms, priceSchedule: { ...hillsWalkCms.priceSchedule, rows: updated } });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border rounded text-xs text-slate-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. FEATURES & AMENITIES                                   */}
      {/* ========================================================= */}
      {activeSubTab === 'amenities' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">6. Promenade Features & Infrastructure</h4>
              <p className="text-xs text-slate-500">Edit world-class amenities like pedestrian paths, power grid, and parking.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setHillsWalkCms({
                  ...hillsWalkCms,
                  amenities: {
                    ...hillsWalkCms.amenities,
                    items: [
                      ...hillsWalkCms.amenities.items,
                      { title: 'New Amenity', desc: 'Amenity description here.', category: 'Civic', iconType: 'Sparkles' }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Feature</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Amenities Heading"
              value={hillsWalkCms.amenities.heading}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, amenities: { ...hillsWalkCms.amenities, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={hillsWalkCms.amenities.leadParagraph}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, amenities: { ...hillsWalkCms.amenities, leadParagraph: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {hillsWalkCms.amenities.items.map((it, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={it.category}
                      onChange={(e) => {
                        const updated = [...hillsWalkCms.amenities.items];
                        updated[idx].category = e.target.value;
                        setHillsWalkCms({ ...hillsWalkCms, amenities: { ...hillsWalkCms.amenities, items: updated } });
                      }}
                      className="px-2 py-0.5 bg-white border rounded text-[10px] font-bold text-slate-600 uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = hillsWalkCms.amenities.items.filter((_, i) => i !== idx);
                        setHillsWalkCms({ ...hillsWalkCms, amenities: { ...hillsWalkCms.amenities, items: updated } });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={it.title}
                    onChange={(e) => {
                      const updated = [...hillsWalkCms.amenities.items];
                      updated[idx].title = e.target.value;
                      setHillsWalkCms({ ...hillsWalkCms, amenities: { ...hillsWalkCms.amenities, items: updated } });
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-slate-900"
                  />

                  <CmsRichTextarea
                    label="Description"
                    rows={2}
                    value={it.desc}
                    onChange={(val) => {
                      const updated = [...hillsWalkCms.amenities.items];
                      updated[idx].desc = val;
                      setHillsWalkCms({ ...hillsWalkCms, amenities: { ...hillsWalkCms.amenities, items: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. INVESTMENT ROI & RENTAL YIELDS                         */}
      {/* ========================================================= */}
      {activeSubTab === 'roi' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">7. Investment Case & Rental Yield Projections</h4>
            <p className="text-xs text-slate-500">Edit projected annual yields, capital appreciation rates, and key advantages.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Section Heading"
              value={hillsWalkCms.investmentRoi.heading}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, investmentRoi: { ...hillsWalkCms.investmentRoi, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={hillsWalkCms.investmentRoi.leadParagraph}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, investmentRoi: { ...hillsWalkCms.investmentRoi, leadParagraph: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CmsRichInput
                label="Projected Annual Rental Yield"
                value={hillsWalkCms.investmentRoi.projectedYield}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, investmentRoi: { ...hillsWalkCms.investmentRoi, projectedYield: val } })}
              />
              <CmsRichInput
                label="Capital Growth Rate"
                value={hillsWalkCms.investmentRoi.capitalGrowthRate}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, investmentRoi: { ...hillsWalkCms.investmentRoi, capitalGrowthRate: val } })}
              />
            </div>

            <CmsRichTextarea
              label="Commercial Advantage Summary"
              rows={2}
              value={hillsWalkCms.investmentRoi.commercialAdvantage}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, investmentRoi: { ...hillsWalkCms.investmentRoi, commercialAdvantage: val } })}
            />

            <div className="space-y-3 pt-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700">Strategic Key Points</h5>
              {hillsWalkCms.investmentRoi.keyPoints.map((kp, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <input
                    type="text"
                    value={kp.title}
                    onChange={(e) => {
                      const updated = [...hillsWalkCms.investmentRoi.keyPoints];
                      updated[idx].title = e.target.value;
                      setHillsWalkCms({ ...hillsWalkCms, investmentRoi: { ...hillsWalkCms.investmentRoi, keyPoints: updated } });
                    }}
                    className="w-full px-3 py-1.5 bg-white border rounded text-xs font-bold text-[#7b002c]"
                  />
                  <CmsRichTextarea
                    label="Detail"
                    rows={2}
                    value={kp.desc}
                    onChange={(val) => {
                      const updated = [...hillsWalkCms.investmentRoi.keyPoints];
                      updated[idx].desc = val;
                      setHillsWalkCms({ ...hillsWalkCms, investmentRoi: { ...hillsWalkCms.investmentRoi, keyPoints: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. CONSTRUCTION PROGRESS                                  */}
      {/* ========================================================= */}
      {activeSubTab === 'devStatus' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">8. On-Ground Construction Milestones</h4>
            <p className="text-xs text-slate-500">Edit on-ground completion counters, drone photos, and status tags.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Development Heading"
              value={hillsWalkCms.developmentStatus.heading}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={hillsWalkCms.developmentStatus.leadParagraph}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, leadParagraph: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <CmsRichInput
                  label="Stat 1 Value"
                  value={hillsWalkCms.developmentStatus.stat1Value}
                  onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, stat1Value: val } })}
                />
                <CmsRichInput
                  label="Stat 1 Label"
                  value={hillsWalkCms.developmentStatus.stat1Label}
                  onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, stat1Label: val } })}
                />
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <CmsRichInput
                  label="Stat 2 Value"
                  value={hillsWalkCms.developmentStatus.stat2Value}
                  onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, stat2Value: val } })}
                />
                <CmsRichInput
                  label="Stat 2 Label"
                  value={hillsWalkCms.developmentStatus.stat2Label}
                  onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, stat2Label: val } })}
                />
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <CmsRichInput
                  label="Stat 3 Value"
                  value={hillsWalkCms.developmentStatus.stat3Value}
                  onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, stat3Value: val } })}
                />
                <CmsRichInput
                  label="Stat 3 Label"
                  value={hillsWalkCms.developmentStatus.stat3Label}
                  onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, stat3Label: val } })}
                />
              </div>
            </div>

            <ImageUploadField
              label="Drone Progress Photo"
              value={hillsWalkCms.developmentStatus.dronePhotoUrl}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, dronePhotoUrl: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <CmsRichInput
                label="Drone Box Heading"
                value={hillsWalkCms.developmentStatus.droneHeading}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, droneHeading: val } })}
              />
              <CmsRichInput
                label="Drone Box Description"
                value={hillsWalkCms.developmentStatus.droneDesc}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, developmentStatus: { ...hillsWalkCms.developmentStatus, droneDesc: val } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. FAQS                                                   */}
      {/* ========================================================= */}
      {activeSubTab === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">9. Frequently Asked Questions (FAQs)</h4>
              <p className="text-xs text-slate-500">Edit and add commercial questions for Hills Walk.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setHillsWalkCms({
                  ...hillsWalkCms,
                  faqs: {
                    ...hillsWalkCms.faqs,
                    items: [
                      ...hillsWalkCms.faqs.items,
                      { q: 'New Commercial Question?', a: 'Detailed commercial answer here.' }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="FAQs Section Heading"
              value={hillsWalkCms.faqs.heading}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, faqs: { ...hillsWalkCms.faqs, heading: val } })}
            />

            <div className="space-y-3">
              {hillsWalkCms.faqs.items.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7b002c]">Question #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = hillsWalkCms.faqs.items.filter((_, i) => i !== idx);
                        setHillsWalkCms({ ...hillsWalkCms, faqs: { ...hillsWalkCms.faqs, items: updated } });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => {
                      const updated = [...hillsWalkCms.faqs.items];
                      updated[idx].q = e.target.value;
                      setHillsWalkCms({ ...hillsWalkCms, faqs: { ...hillsWalkCms.faqs, items: updated } });
                    }}
                    className="w-full px-3 py-1.5 bg-white border rounded text-xs font-bold"
                  />

                  <CmsRichTextarea
                    label="Answer"
                    rows={2}
                    value={faq.a}
                    onChange={(val) => {
                      const updated = [...hillsWalkCms.faqs.items];
                      updated[idx].a = val;
                      setHillsWalkCms({ ...hillsWalkCms, faqs: { ...hillsWalkCms.faqs, items: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. COMMERCIAL ADVISORY DESK                              */}
      {/* ========================================================= */}
      {activeSubTab === 'inquiry' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">10. Commercial Advisory Desk & Inquiry CTA</h4>
            <p className="text-xs text-slate-500">Edit bottom commercial conversion banner and direct WhatsApp contacts.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Tag Label"
              value={hillsWalkCms.inquirySection.tag}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, inquirySection: { ...hillsWalkCms.inquirySection, tag: val } })}
            />
            <CmsRichInput
              label="Main Heading"
              value={hillsWalkCms.inquirySection.heading}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, inquirySection: { ...hillsWalkCms.inquirySection, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={hillsWalkCms.inquirySection.leadParagraph}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, inquirySection: { ...hillsWalkCms.inquirySection, leadParagraph: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CmsRichInput
                label="WhatsApp Number"
                value={hillsWalkCms.inquirySection.whatsappNumber}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, inquirySection: { ...hillsWalkCms.inquirySection, whatsappNumber: val } })}
              />
              <CmsRichInput
                label="Phone Contact"
                value={hillsWalkCms.inquirySection.phoneNumber}
                onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, inquirySection: { ...hillsWalkCms.inquirySection, phoneNumber: val } })}
              />
            </div>

            <CmsRichInput
              label="CTA Button Text"
              value={hillsWalkCms.inquirySection.buttonText}
              onChange={(val) => setHillsWalkCms({ ...hillsWalkCms, inquirySection: { ...hillsWalkCms.inquirySection, buttonText: val } })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
