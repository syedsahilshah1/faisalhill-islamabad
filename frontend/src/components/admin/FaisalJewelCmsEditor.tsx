'use client';

import React, { useState, useRef } from 'react';
import {
  FaisalJewelCMSData,
  initialFaisalJewelCMS,
  saveFaisalJewelCMS,
  JewelUnitItem
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
  Hotel,
  Home,
  Waves,
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

interface FaisalJewelCmsEditorProps {
  faisalJewelCms: FaisalJewelCMSData;
  setFaisalJewelCms: React.Dispatch<React.SetStateAction<FaisalJewelCMSData>>;
  token?: string;
  onSaveSuccess?: (msg: string) => void;
}

export default function FaisalJewelCmsEditor({
  faisalJewelCms,
  setFaisalJewelCms,
  token,
  onSaveSuccess
}: FaisalJewelCmsEditorProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    | 'hero'
    | 'overview'
    | 'floors'
    | 'units'
    | 'hotel'
    | 'payment'
    | 'progress'
    | 'faqs'
    | 'inquiry'
  >('hero');

  const [isSaving, setIsSaving] = useState(false);
  const [saveBanner, setSaveBanner] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const ok = await saveFaisalJewelCMS(faisalJewelCms, token);
    setIsSaving(false);
    if (ok) {
      setSaveBanner(true);
      if (onSaveSuccess) onSaveSuccess('Faisal Jewel Skyscraper published live successfully!');
      setTimeout(() => setSaveBanner(false), 3500);
    }
  };

  const handleReset = () => {
    if (confirm('Reset Faisal Jewel Skyscraper CMS to verified official defaults?')) {
      setFaisalJewelCms(initialFaisalJewelCMS);
    }
  };

  const subTabs = [
    { id: 'hero', label: '1. Hero & Skyscraper Stats', icon: Sparkles },
    { id: 'overview', label: '2. Tower Overview & Specs', icon: FileText },
    { id: 'floors', label: '3. 27-Storey Floor Plan', icon: Layers },
    { id: 'units', label: '4. Unit Inventory (Live Units)', icon: DollarSign },
    { id: 'hotel', label: '5. 4-Star Hotel & Amenities', icon: Hotel },
    { id: 'payment', label: '6. 4-Year Installment Plan', icon: Compass },
    { id: 'progress', label: '7. Structural Progress', icon: Award },
    { id: 'faqs', label: '8. FAQs', icon: HelpCircle },
    { id: 'inquiry', label: '9. VIP Booking Desk', icon: PhoneCall },
  ] as const;

  const ImageUploadField = createImageUploadField(token);

  return (
    <div className="space-y-6">
      {/* Top Action Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Faisal Jewel 27-Storey Landmark CMS Editor
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
              9 Full Sections
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full dynamic management for 27-storey floor distributions, apartments, food court, corporate suites, and 4-year installment schedules.
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
            href="/blocks/faisal-jewel-islamabad"
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
            <span>{isSaving ? 'Saving...' : 'Save Faisal Jewel'}</span>
          </button>
        </div>
      </div>

      {saveBanner && (
        <div className="p-4 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Faisal Jewel content and unit inventory successfully published to live website!</span>
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
      {/* 1. HERO BANNER                                            */}
      {/* ========================================================= */}
      {activeSubTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">1. Hero Banner & Skyscraper Credentials</h4>
            <p className="text-xs text-slate-500">Edit skyscraper title, badges, and flagship background render.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Hero Eyebrow Tagline"
              value={faisalJewelCms.hero.eyebrow}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, hero: { ...faisalJewelCms.hero, eyebrow: val } })}
            />
            <CmsRichInput
              label="Skyscraper Main Title"
              value={faisalJewelCms.hero.title}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, hero: { ...faisalJewelCms.hero, title: val } })}
            />
            <CmsRichTextarea
              label="Hero Subtitle / Description"
              rows={3}
              value={faisalJewelCms.hero.subtitle}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, hero: { ...faisalJewelCms.hero, subtitle: val } })}
            />

            <ImageUploadField
              label="Skyscraper Tower Hero Image"
              value={faisalJewelCms.hero.bgImage}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, hero: { ...faisalJewelCms.hero, bgImage: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <CmsRichInput
                label="Hero Badge 1"
                value={faisalJewelCms.hero.badge1}
                onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, hero: { ...faisalJewelCms.hero, badge1: val } })}
              />
              <CmsRichInput
                label="Hero Badge 2"
                value={faisalJewelCms.hero.badge2}
                onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, hero: { ...faisalJewelCms.hero, badge2: val } })}
              />
              <CmsRichInput
                label="Hero Badge 3"
                value={faisalJewelCms.hero.badge3}
                onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, hero: { ...faisalJewelCms.hero, badge3: val } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. OVERVIEW & ARCHITECTURAL SPECS                         */}
      {/* ========================================================= */}
      {activeSubTab === 'overview' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">2. Tower Overview & Architectural Specs</h4>
            <p className="text-xs text-slate-500">Edit architectural introduction and official tower engineering metrics.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Overview H1 Title"
              value={faisalJewelCms.overview.h1}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, overview: { ...faisalJewelCms.overview, h1: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={3}
              value={faisalJewelCms.overview.leadParagraph}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, overview: { ...faisalJewelCms.overview, leadParagraph: val } })}
            />
            <CmsRichTextarea
              label="Expanded Details"
              rows={3}
              value={faisalJewelCms.overview.expandedDetails}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, overview: { ...faisalJewelCms.overview, expandedDetails: val } })}
            />

            <ImageUploadField
              label="Tower Photo"
              value={faisalJewelCms.overview.photoUrl}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, overview: { ...faisalJewelCms.overview, photoUrl: val } })}
            />

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700">Official Tower Specs</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <CmsRichInput
                  label="Total Floors"
                  value={faisalJewelCms.overview.specs.totalFloors}
                  onChange={(val) =>
                    setFaisalJewelCms({
                      ...faisalJewelCms,
                      overview: { ...faisalJewelCms.overview, specs: { ...faisalJewelCms.overview.specs, totalFloors: val } }
                    })
                  }
                />
                <CmsRichInput
                  label="Building Height"
                  value={faisalJewelCms.overview.specs.buildingHeight}
                  onChange={(val) =>
                    setFaisalJewelCms({
                      ...faisalJewelCms,
                      overview: { ...faisalJewelCms.overview, specs: { ...faisalJewelCms.overview.specs, buildingHeight: val } }
                    })
                  }
                />
                <CmsRichInput
                  label="Project Type"
                  value={faisalJewelCms.overview.specs.projectType}
                  onChange={(val) =>
                    setFaisalJewelCms({
                      ...faisalJewelCms,
                      overview: { ...faisalJewelCms.overview, specs: { ...faisalJewelCms.overview.specs, projectType: val } }
                    })
                  }
                />
                <CmsRichInput
                  label="Location Corridor"
                  value={faisalJewelCms.overview.specs.location}
                  onChange={(val) =>
                    setFaisalJewelCms({
                      ...faisalJewelCms,
                      overview: { ...faisalJewelCms.overview, specs: { ...faisalJewelCms.overview.specs, location: val } }
                    })
                  }
                />
                <CmsRichInput
                  label="Developer Group"
                  value={faisalJewelCms.overview.specs.developer}
                  onChange={(val) =>
                    setFaisalJewelCms({
                      ...faisalJewelCms,
                      overview: { ...faisalJewelCms.overview, specs: { ...faisalJewelCms.overview.specs, developer: val } }
                    })
                  }
                />
                <CmsRichInput
                  label="Completion Target"
                  value={faisalJewelCms.overview.specs.completionTarget}
                  onChange={(val) =>
                    setFaisalJewelCms({
                      ...faisalJewelCms,
                      overview: { ...faisalJewelCms.overview, specs: { ...faisalJewelCms.overview.specs, completionTarget: val } }
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. 27-STOREY FLOOR DISTRIBUTION                           */}
      {/* ========================================================= */}
      {activeSubTab === 'floors' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">3. 27-Storey Vertical Floor Distribution</h4>
              <p className="text-xs text-slate-500">Edit retail mall levels, corporate tiers, hotel floors, and sky penthouses.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setFaisalJewelCms({
                  ...faisalJewelCms,
                  floorDistribution: {
                    ...faisalJewelCms.floorDistribution,
                    floors: [
                      ...faisalJewelCms.floorDistribution.floors,
                      {
                        levelRange: 'Level Tier',
                        category: 'Category',
                        title: 'Floor Tier Title',
                        description: 'Description here.',
                        highlights: ['Feature 1', 'Feature 2'],
                        iconType: 'Building2'
                      }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Floor Tier</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Floor Plan Heading"
              value={faisalJewelCms.floorDistribution.heading}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, floorDistribution: { ...faisalJewelCms.floorDistribution, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={faisalJewelCms.floorDistribution.leadParagraph}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, floorDistribution: { ...faisalJewelCms.floorDistribution, leadParagraph: val } })}
            />

            <div className="space-y-3">
              {faisalJewelCms.floorDistribution.floors.map((fl, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-900 font-bold text-xs rounded-md">
                        {fl.levelRange}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">({fl.category})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = faisalJewelCms.floorDistribution.floors.filter((_, i) => i !== idx);
                        setFaisalJewelCms({ ...faisalJewelCms, floorDistribution: { ...faisalJewelCms.floorDistribution, floors: updated } });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Level Range (e.g. 8th – 14th Floor)"
                      value={fl.levelRange}
                      onChange={(e) => {
                        const updated = [...faisalJewelCms.floorDistribution.floors];
                        updated[idx].levelRange = e.target.value;
                        setFaisalJewelCms({ ...faisalJewelCms, floorDistribution: { ...faisalJewelCms.floorDistribution, floors: updated } });
                      }}
                      className="px-2.5 py-1.5 bg-white border rounded text-xs font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Tier Title"
                      value={fl.title}
                      onChange={(e) => {
                        const updated = [...faisalJewelCms.floorDistribution.floors];
                        updated[idx].title = e.target.value;
                        setFaisalJewelCms({ ...faisalJewelCms, floorDistribution: { ...faisalJewelCms.floorDistribution, floors: updated } });
                      }}
                      className="px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-[#7b002c]"
                    />
                  </div>

                  <CmsRichTextarea
                    label="Tier Description"
                    rows={2}
                    value={fl.description}
                    onChange={(val) => {
                      const updated = [...faisalJewelCms.floorDistribution.floors];
                      updated[idx].description = val;
                      setFaisalJewelCms({ ...faisalJewelCms, floorDistribution: { ...faisalJewelCms.floorDistribution, floors: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. UNIT INVENTORY (LIVE UNITS)                            */}
      {/* ========================================================= */}
      {activeSubTab === 'units' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">4. Live Unit Inventory (Add / Edit Units)</h4>
              <p className="text-xs text-slate-500">Manage individual apartments, food court stalls, shops, and penthouses.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newId = `fj-unit-${Date.now()}`;
                const newUnit: JewelUnitItem = {
                  id: newId,
                  unitNumber: `FJ-${faisalJewelCms.unitsInventory.units.length + 101}`,
                  category: '1-Bed Apartment',
                  floorLevel: '15th Floor Executive Tier',
                  dimensions: '22 x 32',
                  areaSqFt: 700,
                  priceFormatted: 'PKR 1.25 Crore',
                  downPaymentFormatted: 'PKR 25.0 Lacs',
                  quarterlyInstallmentFormatted: 'PKR 6.2 Lacs',
                  status: 'Available',
                  facing: 'Margalla Hills View',
                  features: ['Balcony View', 'American Kitchen', 'Covered Parking'],
                  description: 'Luxury executive suite.',
                  image: '/images/faisal-jewel-building.webp'
                };
                setFaisalJewelCms({
                  ...faisalJewelCms,
                  unitsInventory: {
                    ...faisalJewelCms.unitsInventory,
                    units: [...faisalJewelCms.unitsInventory.units, newUnit]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Unit</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Inventory Heading"
              value={faisalJewelCms.unitsInventory.heading}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, unitsInventory: { ...faisalJewelCms.unitsInventory, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Description"
              rows={2}
              value={faisalJewelCms.unitsInventory.leadParagraph}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, unitsInventory: { ...faisalJewelCms.unitsInventory, leadParagraph: val } })}
            />

            <div className="space-y-4">
              {faisalJewelCms.unitsInventory.units.map((unit, idx) => (
                <div key={unit.id || idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#7b002c] text-white font-mono font-bold text-xs rounded-lg">
                        {unit.unitNumber}
                      </span>
                      <span className="font-bold text-xs text-slate-800">{unit.category}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                        {unit.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = faisalJewelCms.unitsInventory.units.filter((_, i) => i !== idx);
                        setFaisalJewelCms({ ...faisalJewelCms, unitsInventory: { ...faisalJewelCms.unitsInventory, units: updated } });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 cursor-pointer self-end sm:self-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Unit Number</label>
                      <input
                        type="text"
                        value={unit.unitNumber}
                        onChange={(e) => {
                          const updated = [...faisalJewelCms.unitsInventory.units];
                          updated[idx].unitNumber = e.target.value;
                          setFaisalJewelCms({ ...faisalJewelCms, unitsInventory: { ...faisalJewelCms.unitsInventory, units: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Category</label>
                      <select
                        value={unit.category}
                        onChange={(e) => {
                          const updated = [...faisalJewelCms.unitsInventory.units];
                          updated[idx].category = e.target.value as any;
                          setFaisalJewelCms({ ...faisalJewelCms, unitsInventory: { ...faisalJewelCms.unitsInventory, units: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-bold"
                      >
                        <option value="Commercial Plot / Showroom">Commercial Showroom</option>
                        <option value="Commercial Shop">Commercial Shop</option>
                        <option value="Food Court">Food Court</option>
                        <option value="Corporate Office">Corporate Office</option>
                        <option value="1-Bed Apartment">1-Bed Apartment</option>
                        <option value="2-Bed Apartment">2-Bed Apartment</option>
                        <option value="3-Bed Penthouse">3-Bed Penthouse</option>
                        <option value="4-Star Hotel Suite">4-Star Hotel Suite</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Floor Level</label>
                      <input
                        type="text"
                        value={unit.floorLevel}
                        onChange={(e) => {
                          const updated = [...faisalJewelCms.unitsInventory.units];
                          updated[idx].floorLevel = e.target.value;
                          setFaisalJewelCms({ ...faisalJewelCms, unitsInventory: { ...faisalJewelCms.unitsInventory, units: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Total Price</label>
                      <input
                        type="text"
                        value={unit.priceFormatted}
                        onChange={(e) => {
                          const updated = [...faisalJewelCms.unitsInventory.units];
                          updated[idx].priceFormatted = e.target.value;
                          setFaisalJewelCms({ ...faisalJewelCms, unitsInventory: { ...faisalJewelCms.unitsInventory, units: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-emerald-800 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Down Payment (20%)</label>
                      <input
                        type="text"
                        value={unit.downPaymentFormatted}
                        onChange={(e) => {
                          const updated = [...faisalJewelCms.unitsInventory.units];
                          updated[idx].downPaymentFormatted = e.target.value;
                          setFaisalJewelCms({ ...faisalJewelCms, unitsInventory: { ...faisalJewelCms.unitsInventory, units: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Quarterly Installment</label>
                      <input
                        type="text"
                        value={unit.quarterlyInstallmentFormatted}
                        onChange={(e) => {
                          const updated = [...faisalJewelCms.unitsInventory.units];
                          updated[idx].quarterlyInstallmentFormatted = e.target.value;
                          setFaisalJewelCms({ ...faisalJewelCms, unitsInventory: { ...faisalJewelCms.unitsInventory, units: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Facing / View</label>
                      <input
                        type="text"
                        value={unit.facing}
                        onChange={(e) => {
                          const updated = [...faisalJewelCms.unitsInventory.units];
                          updated[idx].facing = e.target.value;
                          setFaisalJewelCms({ ...faisalJewelCms, unitsInventory: { ...faisalJewelCms.unitsInventory, units: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. 4-STAR HOTEL & LIFESTYLE                               */}
      {/* ========================================================= */}
      {activeSubTab === 'hotel' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">5. 4-Star Hotel Suites & Amenities</h4>
            <p className="text-xs text-slate-500">Edit rooftop infinity pool, gym, high-speed lifts, and valet facilities.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Amenities Heading"
              value={faisalJewelCms.hotelAndAmenities.heading}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, hotelAndAmenities: { ...faisalJewelCms.hotelAndAmenities, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={faisalJewelCms.hotelAndAmenities.leadParagraph}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, hotelAndAmenities: { ...faisalJewelCms.hotelAndAmenities, leadParagraph: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {faisalJewelCms.hotelAndAmenities.items.map((it, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={it.category}
                      onChange={(e) => {
                        const updated = [...faisalJewelCms.hotelAndAmenities.items];
                        updated[idx].category = e.target.value;
                        setFaisalJewelCms({ ...faisalJewelCms, hotelAndAmenities: { ...faisalJewelCms.hotelAndAmenities, items: updated } });
                      }}
                      className="px-2 py-0.5 bg-white border rounded text-[10px] font-bold text-blue-800 uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = faisalJewelCms.hotelAndAmenities.items.filter((_, i) => i !== idx);
                        setFaisalJewelCms({ ...faisalJewelCms, hotelAndAmenities: { ...faisalJewelCms.hotelAndAmenities, items: updated } });
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
                      const updated = [...faisalJewelCms.hotelAndAmenities.items];
                      updated[idx].title = e.target.value;
                      setFaisalJewelCms({ ...faisalJewelCms, hotelAndAmenities: { ...faisalJewelCms.hotelAndAmenities, items: updated } });
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-slate-900"
                  />

                  <CmsRichTextarea
                    label="Detail"
                    rows={2}
                    value={it.desc}
                    onChange={(val) => {
                      const updated = [...faisalJewelCms.hotelAndAmenities.items];
                      updated[idx].desc = val;
                      setFaisalJewelCms({ ...faisalJewelCms, hotelAndAmenities: { ...faisalJewelCms.hotelAndAmenities, items: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. 4-YEAR INSTALLMENT PLAN                                */}
      {/* ========================================================= */}
      {activeSubTab === 'payment' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">6. Flexible 4-Year Installment Schedule</h4>
            <p className="text-xs text-slate-500">Edit down payment terms, quarterly installments, and sample unit pricing tables.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Payment Plan Heading"
              value={faisalJewelCms.paymentPlan.heading}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, paymentPlan: { ...faisalJewelCms.paymentPlan, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={faisalJewelCms.paymentPlan.leadParagraph}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, paymentPlan: { ...faisalJewelCms.paymentPlan, leadParagraph: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <CmsRichInput
                label="Duration"
                value={faisalJewelCms.paymentPlan.installmentsDuration}
                onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, paymentPlan: { ...faisalJewelCms.paymentPlan, installmentsDuration: val } })}
              />
              <CmsRichInput
                label="Down Payment %"
                value={faisalJewelCms.paymentPlan.downPaymentPercentage}
                onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, paymentPlan: { ...faisalJewelCms.paymentPlan, downPaymentPercentage: val } })}
              />
              <CmsRichInput
                label="Cash Discount Note"
                value={faisalJewelCms.paymentPlan.discountNote}
                onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, paymentPlan: { ...faisalJewelCms.paymentPlan, discountNote: val } })}
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Sample Payment Plans</label>
              {faisalJewelCms.paymentPlan.samplePlans.map((sp, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border rounded-xl grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Category"
                    value={sp.category}
                    onChange={(e) => {
                      const updated = [...faisalJewelCms.paymentPlan.samplePlans];
                      updated[idx].category = e.target.value;
                      setFaisalJewelCms({ ...faisalJewelCms, paymentPlan: { ...faisalJewelCms.paymentPlan, samplePlans: updated } });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Total Price"
                    value={sp.totalPrice}
                    onChange={(e) => {
                      const updated = [...faisalJewelCms.paymentPlan.samplePlans];
                      updated[idx].totalPrice = e.target.value;
                      setFaisalJewelCms({ ...faisalJewelCms, paymentPlan: { ...faisalJewelCms.paymentPlan, samplePlans: updated } });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-emerald-800"
                  />
                  <input
                    type="text"
                    placeholder="Down Payment"
                    value={sp.downPayment}
                    onChange={(e) => {
                      const updated = [...faisalJewelCms.paymentPlan.samplePlans];
                      updated[idx].downPayment = e.target.value;
                      setFaisalJewelCms({ ...faisalJewelCms, paymentPlan: { ...faisalJewelCms.paymentPlan, samplePlans: updated } });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Quarterly"
                    value={sp.quarterlyInstallment}
                    onChange={(e) => {
                      const updated = [...faisalJewelCms.paymentPlan.samplePlans];
                      updated[idx].quarterlyInstallment = e.target.value;
                      setFaisalJewelCms({ ...faisalJewelCms, paymentPlan: { ...faisalJewelCms.paymentPlan, samplePlans: updated } });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="On Possession"
                    value={sp.onPossession}
                    onChange={(e) => {
                      const updated = [...faisalJewelCms.paymentPlan.samplePlans];
                      updated[idx].onPossession = e.target.value;
                      setFaisalJewelCms({ ...faisalJewelCms, paymentPlan: { ...faisalJewelCms.paymentPlan, samplePlans: updated } });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-mono"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. STRUCTURAL PROGRESS                                    */}
      {/* ========================================================= */}
      {activeSubTab === 'progress' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">7. Structural Construction Progress</h4>
            <p className="text-xs text-slate-500">Edit piling status, basement casting, and on-ground crane activity.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Progress Heading"
              value={faisalJewelCms.constructionProgress.heading}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, constructionProgress: { ...faisalJewelCms.constructionProgress, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={faisalJewelCms.constructionProgress.leadParagraph}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, constructionProgress: { ...faisalJewelCms.constructionProgress, leadParagraph: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <CmsRichInput
                  label="Stat 1 Value"
                  value={faisalJewelCms.constructionProgress.stat1Value}
                  onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, constructionProgress: { ...faisalJewelCms.constructionProgress, stat1Value: val } })}
                />
                <CmsRichInput
                  label="Stat 1 Label"
                  value={faisalJewelCms.constructionProgress.stat1Label}
                  onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, constructionProgress: { ...faisalJewelCms.constructionProgress, stat1Label: val } })}
                />
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <CmsRichInput
                  label="Stat 2 Value"
                  value={faisalJewelCms.constructionProgress.stat2Value}
                  onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, constructionProgress: { ...faisalJewelCms.constructionProgress, stat2Value: val } })}
                />
                <CmsRichInput
                  label="Stat 2 Label"
                  value={faisalJewelCms.constructionProgress.stat2Label}
                  onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, constructionProgress: { ...faisalJewelCms.constructionProgress, stat2Label: val } })}
                />
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <CmsRichInput
                  label="Stat 3 Value"
                  value={faisalJewelCms.constructionProgress.stat3Value}
                  onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, constructionProgress: { ...faisalJewelCms.constructionProgress, stat3Value: val } })}
                />
                <CmsRichInput
                  label="Stat 3 Label"
                  value={faisalJewelCms.constructionProgress.stat3Label}
                  onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, constructionProgress: { ...faisalJewelCms.constructionProgress, stat3Label: val } })}
                />
              </div>
            </div>

            <ImageUploadField
              label="Live Site Construction Photo"
              value={faisalJewelCms.constructionProgress.dronePhotoUrl}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, constructionProgress: { ...faisalJewelCms.constructionProgress, dronePhotoUrl: val } })}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. FAQS                                                   */}
      {/* ========================================================= */}
      {activeSubTab === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">8. Frequently Asked Questions (FAQs)</h4>
              <p className="text-xs text-slate-500">Edit Faisal Jewel inquiries and answers.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setFaisalJewelCms({
                  ...faisalJewelCms,
                  faqs: {
                    ...faisalJewelCms.faqs,
                    items: [
                      ...faisalJewelCms.faqs.items,
                      { q: 'New Faisal Jewel Question?', a: 'Detailed answer here.' }
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
              value={faisalJewelCms.faqs.heading}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, faqs: { ...faisalJewelCms.faqs, heading: val } })}
            />

            <div>
              <CmsRichInput
                label="Google Map Embed URL"
                value={faisalJewelCms.googleMapEmbedUrl}
                onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, googleMapEmbedUrl: val })}
              />
              <p className="text-[11px] text-slate-500">
                Controls the map embedded on the Faisal Jewel location section. Paste the
                <code className="font-mono"> src </code> value from a Google Maps share
                dialog set to &ldquo;Embed a map&rdquo;.
              </p>
            </div>

            <div className="space-y-3">
              {faisalJewelCms.faqs.items.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7b002c]">Question #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = faisalJewelCms.faqs.items.filter((_, i) => i !== idx);
                        setFaisalJewelCms({ ...faisalJewelCms, faqs: { ...faisalJewelCms.faqs, items: updated } });
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
                      const updated = [...faisalJewelCms.faqs.items];
                      updated[idx].q = e.target.value;
                      setFaisalJewelCms({ ...faisalJewelCms, faqs: { ...faisalJewelCms.faqs, items: updated } });
                    }}
                    className="w-full px-3 py-1.5 bg-white border rounded text-xs font-bold"
                  />

                  <CmsRichTextarea
                    label="Answer"
                    rows={2}
                    value={faq.a}
                    onChange={(val) => {
                      const updated = [...faisalJewelCms.faqs.items];
                      updated[idx].a = val;
                      setFaisalJewelCms({ ...faisalJewelCms, faqs: { ...faisalJewelCms.faqs, items: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. VIP BOOKING DESK                                       */}
      {/* ========================================================= */}
      {activeSubTab === 'inquiry' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">9. VIP Booking Desk & Inquiry CTA</h4>
            <p className="text-xs text-slate-500">Edit bottom VIP brochure booking form and telephone contacts.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Tag Label"
              value={faisalJewelCms.inquirySection.tag}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, inquirySection: { ...faisalJewelCms.inquirySection, tag: val } })}
            />
            <CmsRichInput
              label="Main Heading"
              value={faisalJewelCms.inquirySection.heading}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, inquirySection: { ...faisalJewelCms.inquirySection, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={faisalJewelCms.inquirySection.leadParagraph}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, inquirySection: { ...faisalJewelCms.inquirySection, leadParagraph: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CmsRichInput
                label="WhatsApp Number"
                value={faisalJewelCms.inquirySection.whatsappNumber}
                onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, inquirySection: { ...faisalJewelCms.inquirySection, whatsappNumber: val } })}
              />
              <CmsRichInput
                label="Phone Contact"
                value={faisalJewelCms.inquirySection.phoneNumber}
                onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, inquirySection: { ...faisalJewelCms.inquirySection, phoneNumber: val } })}
              />
            </div>

            <CmsRichInput
              label="CTA Button Text"
              value={faisalJewelCms.inquirySection.buttonText}
              onChange={(val) => setFaisalJewelCms({ ...faisalJewelCms, inquirySection: { ...faisalJewelCms.inquirySection, buttonText: val } })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
