'use client';

import React, { useState, useRef } from 'react';
import {
  BlockCCMSData,
  initialBlockCCMS,
  saveBlockCCMS,
  BlockCPriceRow
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
  Trees
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

interface BlockCCmsEditorProps {
  blockCCms: BlockCCMSData;
  setBlockCCms: React.Dispatch<React.SetStateAction<BlockCCMSData>>;
  token?: string;
  onSaveSuccess?: (msg: string) => void;
}

export default function BlockCCmsEditor({
  blockCCms,
  setBlockCCms,
  token,
  onSaveSuccess
}: BlockCCmsEditorProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    | 'verify'
    | 'hero'
    | 'overview'
    | 'location'
    | 'masterPlan'
    | 'sizes'
    | 'pricing'
    | 'infra'
    | 'hillsWalk'
    | 'whyInvest'
    | 'transfer'
    | 'faqs'
    | 'cta'
  >('hero');

  const [isSaving, setIsSaving] = useState(false);
  const [saveBanner, setSaveBanner] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const ok = await saveBlockCCMS(blockCCms, token);
    setIsSaving(false);
    if (ok) {
      setSaveBanner(true);
      if (onSaveSuccess) onSaveSuccess('Block C published live successfully!');
      setTimeout(() => setSaveBanner(false), 3500);
    }
  };

  const handleReset = () => {
    if (confirm('Reset Block C CMS to verified official defaults?')) {
      setBlockCCms(initialBlockCCMS);
    }
  };

  const subTabs = [
    { id: 'verify', label: '1. Verified Header', icon: ShieldCheck },
    { id: 'hero', label: '2. Hero Banner', icon: Sparkles },
    { id: 'overview', label: '3. Overview & Facts', icon: FileText },
    { id: 'location', label: '4. Location & M-1 Link', icon: MapPin },
    { id: 'masterPlan', label: '5. Master Plan & Map', icon: Compass },
    { id: 'sizes', label: '6. Standard Plot Sizes', icon: Layers },
    { id: 'pricing', label: '7. Price Schedule', icon: DollarSign },
    { id: 'infra', label: '8. Development & Utilities', icon: Award },
    { id: 'hillsWalk', label: '9. Hills Walk Promenade', icon: ShoppingBag },
    { id: 'whyInvest', label: '10. Why Invest & Suitability', icon: TrendingUp },
    { id: 'transfer', label: '11. Transfer & Due Diligence', icon: CheckCircle2 },
    { id: 'faqs', label: '12. FAQs (Accordions)', icon: HelpCircle },
    { id: 'cta', label: '13. Inquiry Form & CTA', icon: PhoneCall },
  ] as const;

  const ImageUploadField = createImageUploadField(token);

  return (
    <div className="space-y-6">
      {/* Top Action Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Block C Dedicated CMS Editor
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-[#7b002c] text-[10px] font-bold uppercase tracking-wider">
              13 Full Sections
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full dynamic control over Block C texts, pricing tables, Hills Walk promenade features, and map download links.
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
            href="/blocks/block-c"
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
            <span>{isSaving ? 'Saving...' : 'Save Block C'}</span>
          </button>
        </div>
      </div>

      {saveBanner && (
        <div className="p-4 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Block C content and pricing successfully published to live website!</span>
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
      {/* 1. VERIFIED HEADER                                        */}
      {/* ========================================================= */}
      {activeSubTab === 'verify' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">1. Verification Top Header Badge</h4>
            <p className="text-xs text-slate-500">Edit reviewer authority, verified dates, and trust credentials.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CmsRichInput
              label="Reviewer Authority Name"
              value={blockCCms.verificationHeader.reviewerName}
              onChange={(val) =>
                setBlockCCms({
                  ...blockCCms,
                  verificationHeader: { ...blockCCms.verificationHeader, reviewerName: val }
                })
              }
            />
            <CmsRichInput
              label="Reviewer Role / Title"
              value={blockCCms.verificationHeader.reviewerRole}
              onChange={(val) =>
                setBlockCCms({
                  ...blockCCms,
                  verificationHeader: { ...blockCCms.verificationHeader, reviewerRole: val }
                })
              }
            />
            <CmsRichInput
              label="Prices Verified Date"
              value={blockCCms.verificationHeader.pricesVerifiedDate}
              onChange={(val) =>
                setBlockCCms({
                  ...blockCCms,
                  verificationHeader: { ...blockCCms.verificationHeader, pricesVerifiedDate: val }
                })
              }
            />
            <CmsRichInput
              label="Possession Confirmed"
              value={blockCCms.verificationHeader.possessionConfirmedDate}
              onChange={(val) =>
                setBlockCCms({
                  ...blockCCms,
                  verificationHeader: { ...blockCCms.verificationHeader, possessionConfirmedDate: val }
                })
              }
            />
            <CmsRichInput
              label="Site Checked Date"
              value={blockCCms.verificationHeader.siteCheckedDate}
              onChange={(val) =>
                setBlockCCms({
                  ...blockCCms,
                  verificationHeader: { ...blockCCms.verificationHeader, siteCheckedDate: val }
                })
              }
            />
            <CmsRichInput
              label="Trust Badge Text"
              value={blockCCms.verificationHeader.badgeText}
              onChange={(val) =>
                setBlockCCms({
                  ...blockCCms,
                  verificationHeader: { ...blockCCms.verificationHeader, badgeText: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. HERO BANNER                                            */}
      {/* ========================================================= */}
      {activeSubTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">2. Hero Banner & Eyebrow</h4>
            <p className="text-xs text-slate-500">Edit the top banner headline, subtitle, badges, and panoramic background image.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Hero Eyebrow Tagline"
              value={blockCCms.hero.eyebrow}
              onChange={(val) => setBlockCCms({ ...blockCCms, hero: { ...blockCCms.hero, eyebrow: val } })}
            />
            <CmsRichInput
              label="Block Main Title"
              value={blockCCms.hero.title}
              onChange={(val) => setBlockCCms({ ...blockCCms, hero: { ...blockCCms.hero, title: val } })}
            />
            <CmsRichTextarea
              label="Hero Subtitle / Description"
              rows={3}
              value={blockCCms.hero.subtitle}
              onChange={(val) => setBlockCCms({ ...blockCCms, hero: { ...blockCCms.hero, subtitle: val } })}
            />

            <ImageUploadField
              label="Hero Panoramic Background Image"
              value={blockCCms.hero.bgImage}
              onChange={(val) => setBlockCCms({ ...blockCCms, hero: { ...blockCCms.hero, bgImage: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <CmsRichInput
                label="Hero Badge 1"
                value={blockCCms.hero.badge1}
                onChange={(val) => setBlockCCms({ ...blockCCms, hero: { ...blockCCms.hero, badge1: val } })}
              />
              <CmsRichInput
                label="Hero Badge 2"
                value={blockCCms.hero.badge2}
                onChange={(val) => setBlockCCms({ ...blockCCms, hero: { ...blockCCms.hero, badge2: val } })}
              />
              <CmsRichInput
                label="Hero Badge 3"
                value={blockCCms.hero.badge3}
                onChange={(val) => setBlockCCms({ ...blockCCms, hero: { ...blockCCms.hero, badge3: val } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. OVERVIEW & FACTS                                       */}
      {/* ========================================================= */}
      {activeSubTab === 'overview' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">3. Overview & Quick Facts Matrix</h4>
            <p className="text-xs text-slate-500">Edit sector introduction paragraphs and verified quick facts table.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Overview H1 Heading"
              value={blockCCms.overview.h1}
              onChange={(val) => setBlockCCms({ ...blockCCms, overview: { ...blockCCms.overview, h1: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph 1"
              rows={3}
              value={blockCCms.overview.leadParagraph1}
              onChange={(val) => setBlockCCms({ ...blockCCms, overview: { ...blockCCms.overview, leadParagraph1: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph 2"
              rows={3}
              value={blockCCms.overview.leadParagraph2}
              onChange={(val) => setBlockCCms({ ...blockCCms, overview: { ...blockCCms.overview, leadParagraph2: val } })}
            />

            <ImageUploadField
              label="Overview Aerial Photo"
              value={blockCCms.overview.photoUrl}
              onChange={(val) => setBlockCCms({ ...blockCCms, overview: { ...blockCCms.overview, photoUrl: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <CmsRichInput
                label="Photo Tag Label"
                value={blockCCms.overview.photoTag}
                onChange={(val) => setBlockCCms({ ...blockCCms, overview: { ...blockCCms.overview, photoTag: val } })}
              />
              <CmsRichInput
                label="Photo Caption"
                value={blockCCms.overview.photoCaption}
                onChange={(val) => setBlockCCms({ ...blockCCms, overview: { ...blockCCms.overview, photoCaption: val } })}
              />
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700">Quick Facts Matrix</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <CmsRichInput
                  label="Geographical Position"
                  value={blockCCms.overview.quickFacts.position}
                  onChange={(val) =>
                    setBlockCCms({
                      ...blockCCms,
                      overview: {
                        ...blockCCms.overview,
                        quickFacts: { ...blockCCms.overview.quickFacts, position: val }
                      }
                    })
                  }
                />
                <CmsRichInput
                  label="Residential Sizes"
                  value={blockCCms.overview.quickFacts.residentialSizes}
                  onChange={(val) =>
                    setBlockCCms({
                      ...blockCCms,
                      overview: {
                        ...blockCCms.overview,
                        quickFacts: { ...blockCCms.overview.quickFacts, residentialSizes: val }
                      }
                    })
                  }
                />
                <CmsRichInput
                  label="Total Plot Count"
                  value={blockCCms.overview.quickFacts.plotCount}
                  onChange={(val) =>
                    setBlockCCms({
                      ...blockCCms,
                      overview: {
                        ...blockCCms.overview,
                        quickFacts: { ...blockCCms.overview.quickFacts, plotCount: val }
                      }
                    })
                  }
                />
                <CmsRichInput
                  label="Possession Status"
                  value={blockCCms.overview.quickFacts.possession}
                  onChange={(val) =>
                    setBlockCCms({
                      ...blockCCms,
                      overview: {
                        ...blockCCms.overview,
                        quickFacts: { ...blockCCms.overview.quickFacts, possession: val }
                      }
                    })
                  }
                />
                <CmsRichInput
                  label="How You Buy"
                  value={blockCCms.overview.quickFacts.howYouBuy}
                  onChange={(val) =>
                    setBlockCCms({
                      ...blockCCms,
                      overview: {
                        ...blockCCms.overview,
                        quickFacts: { ...blockCCms.overview.quickFacts, howYouBuy: val }
                      }
                    })
                  }
                />
                <CmsRichInput
                  label="Legal NOC Status"
                  value={blockCCms.overview.quickFacts.legalStatus}
                  onChange={(val) =>
                    setBlockCCms({
                      ...blockCCms,
                      overview: {
                        ...blockCCms.overview,
                        quickFacts: { ...blockCCms.overview.quickFacts, legalStatus: val }
                      }
                    })
                  }
                />
                <CmsRichInput
                  label="Hills Walk Access"
                  value={blockCCms.overview.quickFacts.hillsWalkAccess}
                  onChange={(val) =>
                    setBlockCCms({
                      ...blockCCms,
                      overview: {
                        ...blockCCms.overview,
                        quickFacts: { ...blockCCms.overview.quickFacts, hillsWalkAccess: val }
                      }
                    })
                  }
                />
                <CmsRichInput
                  label="Motorway Connectivity"
                  value={blockCCms.overview.quickFacts.motorwayConnectivity}
                  onChange={(val) =>
                    setBlockCCms({
                      ...blockCCms,
                      overview: {
                        ...blockCCms.overview,
                        quickFacts: { ...blockCCms.overview.quickFacts, motorwayConnectivity: val }
                      }
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. LOCATION & TRAVEL TIMES                                */}
      {/* ========================================================= */}
      {activeSubTab === 'location' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">4. Location & Travel Times Table</h4>
              <p className="text-xs text-slate-500">Edit road connectivity, Google Map embed URL, and drive times.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setBlockCCms({
                  ...blockCCms,
                  location: {
                    ...blockCCms.location,
                    travelTimes: [
                      ...blockCCms.location.travelTimes,
                      { destination: 'New Landmark', distance: '3 km', time: '5 mins', note: 'Via Main Avenue' }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Travel Time</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Location Section Heading"
              value={blockCCms.location.heading}
              onChange={(val) => setBlockCCms({ ...blockCCms, location: { ...blockCCms.location, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={blockCCms.location.leadParagraph}
              onChange={(val) => setBlockCCms({ ...blockCCms, location: { ...blockCCms.location, leadParagraph: val } })}
            />
            <CmsRichTextarea
              label="Boundary & Boulevard Note"
              rows={2}
              value={blockCCms.location.boundaryNote}
              onChange={(val) => setBlockCCms({ ...blockCCms, location: { ...blockCCms.location, boundaryNote: val } })}
            />
            <CmsRichInput
              label="Google Map Embed URL"
              value={blockCCms.location.googleMapIframeUrl}
              onChange={(val) => setBlockCCms({ ...blockCCms, location: { ...blockCCms.location, googleMapIframeUrl: val } })}
            />

            <div className="pt-2 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Key Travel Times & Distances
              </label>
              <div className="space-y-2.5">
                {blockCCms.location.travelTimes.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#7b002c]">Destination #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = blockCCms.location.travelTimes.filter((_, i) => i !== idx);
                          setBlockCCms({ ...blockCCms, location: { ...blockCCms.location, travelTimes: updated } });
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                        title="Delete Destination"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <input
                        type="text"
                        placeholder="Destination"
                        value={item.destination}
                        onChange={(e) => {
                          const updated = [...blockCCms.location.travelTimes];
                          updated[idx].destination = e.target.value;
                          setBlockCCms({ ...blockCCms, location: { ...blockCCms.location, travelTimes: updated } });
                        }}
                        className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Distance (e.g. 2.8 km)"
                        value={item.distance}
                        onChange={(e) => {
                          const updated = [...blockCCms.location.travelTimes];
                          updated[idx].distance = e.target.value;
                          setBlockCCms({ ...blockCCms, location: { ...blockCCms.location, travelTimes: updated } });
                        }}
                        className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Time (e.g. 4 mins)"
                        value={item.time}
                        onChange={(e) => {
                          const updated = [...blockCCms.location.travelTimes];
                          updated[idx].time = e.target.value;
                          setBlockCCms({ ...blockCCms, location: { ...blockCCms.location, travelTimes: updated } });
                        }}
                        className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-amber-800"
                      />
                      <input
                        type="text"
                        placeholder="Route Note"
                        value={item.note}
                        onChange={(e) => {
                          const updated = [...blockCCms.location.travelTimes];
                          updated[idx].note = e.target.value;
                          setBlockCCms({ ...blockCCms, location: { ...blockCCms.location, travelTimes: updated } });
                        }}
                        className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. MASTER PLAN & ROAD NETWORK                             */}
      {/* ========================================================= */}
      {activeSubTab === 'masterPlan' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">5. Master Plan & PDF Map</h4>
            <p className="text-xs text-slate-500">Edit map description, image, and high-res PDF download URL.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Master Plan Heading"
              value={blockCCms.masterPlan.heading}
              onChange={(val) => setBlockCCms({ ...blockCCms, masterPlan: { ...blockCCms.masterPlan, heading: val } })}
            />
            <CmsRichInput
              label="Subline"
              value={blockCCms.masterPlan.subline}
              onChange={(val) => setBlockCCms({ ...blockCCms, masterPlan: { ...blockCCms.masterPlan, subline: val } })}
            />
            <CmsRichTextarea
              label="Description"
              rows={3}
              value={blockCCms.masterPlan.description}
              onChange={(val) => setBlockCCms({ ...blockCCms, masterPlan: { ...blockCCms.masterPlan, description: val } })}
            />

            <ImageUploadField
              label="Sector Layout Map Image"
              value={blockCCms.masterPlan.mapImage}
              onChange={(val) => setBlockCCms({ ...blockCCms, masterPlan: { ...blockCCms.masterPlan, mapImage: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <CmsRichInput
                label="PDF Download URL"
                value={blockCCms.masterPlan.pdfDownloadUrl}
                onChange={(val) => setBlockCCms({ ...blockCCms, masterPlan: { ...blockCCms.masterPlan, pdfDownloadUrl: val } })}
              />
              <CmsRichInput
                label="Download Button Label"
                value={blockCCms.masterPlan.downloadButtonText}
                onChange={(val) => setBlockCCms({ ...blockCCms, masterPlan: { ...blockCCms.masterPlan, downloadButtonText: val } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. STANDARD PLOT SIZES MATRIX                             */}
      {/* ========================================================= */}
      {activeSubTab === 'sizes' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">6. Standard Plot Dimensions Table</h4>
              <p className="text-xs text-slate-500">Edit cutting dimensions, square yards, and category tags.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setBlockCCms({
                  ...blockCCms,
                  plotSizesSection: {
                    ...blockCCms.plotSizesSection,
                    tableRows: [
                      ...blockCCms.plotSizesSection.tableRows,
                      { dimensions: '25 × 50', sqFeet: '1,125 Sq. Ft', sqYards: '139 Sq. Yds', soldAs: '5 Marla', status: 'Available' }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Plot Size</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Section Heading"
              value={blockCCms.plotSizesSection.heading}
              onChange={(val) =>
                setBlockCCms({ ...blockCCms, plotSizesSection: { ...blockCCms.plotSizesSection, heading: val } })
              }
            />
            <CmsRichInput
              label="Subline"
              value={blockCCms.plotSizesSection.subline}
              onChange={(val) =>
                setBlockCCms({ ...blockCCms, plotSizesSection: { ...blockCCms.plotSizesSection, subline: val } })
              }
            />

            <div className="space-y-2.5">
              {blockCCms.plotSizesSection.tableRows.map((row, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="Dimensions"
                    value={row.dimensions}
                    onChange={(e) => {
                      const updated = [...blockCCms.plotSizesSection.tableRows];
                      updated[idx].dimensions = e.target.value;
                      setBlockCCms({ ...blockCCms, plotSizesSection: { ...blockCCms.plotSizesSection, tableRows: updated } });
                    }}
                    className="flex-1 px-2.5 py-1.5 bg-white border rounded text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Sq. Feet"
                    value={row.sqFeet}
                    onChange={(e) => {
                      const updated = [...blockCCms.plotSizesSection.tableRows];
                      updated[idx].sqFeet = e.target.value;
                      setBlockCCms({ ...blockCCms, plotSizesSection: { ...blockCCms.plotSizesSection, tableRows: updated } });
                    }}
                    className="flex-1 px-2.5 py-1.5 bg-white border rounded text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Sq. Yards"
                    value={row.sqYards}
                    onChange={(e) => {
                      const updated = [...blockCCms.plotSizesSection.tableRows];
                      updated[idx].sqYards = e.target.value;
                      setBlockCCms({ ...blockCCms, plotSizesSection: { ...blockCCms.plotSizesSection, tableRows: updated } });
                    }}
                    className="flex-1 px-2.5 py-1.5 bg-white border rounded text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Sold As (e.g. 5 Marla)"
                    value={row.soldAs}
                    onChange={(e) => {
                      const updated = [...blockCCms.plotSizesSection.tableRows];
                      updated[idx].soldAs = e.target.value;
                      setBlockCCms({ ...blockCCms, plotSizesSection: { ...blockCCms.plotSizesSection, tableRows: updated } });
                    }}
                    className="flex-1 px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-[#7b002c]"
                  />
                  <input
                    type="text"
                    placeholder="Status Tag"
                    value={row.status}
                    onChange={(e) => {
                      const updated = [...blockCCms.plotSizesSection.tableRows];
                      updated[idx].status = e.target.value;
                      setBlockCCms({ ...blockCCms, plotSizesSection: { ...blockCCms.plotSizesSection, tableRows: updated } });
                    }}
                    className="flex-1 px-2.5 py-1.5 bg-white border rounded text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockCCms.plotSizesSection.tableRows.filter((_, i) => i !== idx);
                      setBlockCCms({ ...blockCCms, plotSizesSection: { ...blockCCms.plotSizesSection, tableRows: updated } });
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer self-end sm:self-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <CmsRichTextarea
              label="Analysis Footnote"
              rows={2}
              value={blockCCms.plotSizesSection.analysisNote}
              onChange={(val) =>
                setBlockCCms({ ...blockCCms, plotSizesSection: { ...blockCCms.plotSizesSection, analysisNote: val } })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. PRICE SCHEDULE                                         */}
      {/* ========================================================= */}
      {activeSubTab === 'pricing' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">7. Verified Market Price Schedule</h4>
              <p className="text-xs text-slate-500">Edit price ranges, highlights, and possession tags for each plot category.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setBlockCCms({
                  ...blockCCms,
                  priceScheduleSection: {
                    ...blockCCms.priceScheduleSection,
                    tableRows: [
                      ...blockCCms.priceScheduleSection.tableRows,
                      {
                        size: '5 Marla',
                        dimensions: '25 × 50',
                        sqYards: '139 Sq. Yds',
                        sqFeet: '1,125 Sq. Ft',
                        category: 'Residential',
                        priceRange: 'PKR 48 Lacs – 58 Lacs',
                        possession: 'Possession Ready',
                        highlight: 'New plot category'
                      }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Price Row</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Price Schedule Heading"
              value={blockCCms.priceScheduleSection.heading}
              onChange={(val) =>
                setBlockCCms({ ...blockCCms, priceScheduleSection: { ...blockCCms.priceScheduleSection, heading: val } })
              }
            />
            <CmsRichInput
              label="Subline"
              value={blockCCms.priceScheduleSection.subline}
              onChange={(val) =>
                setBlockCCms({ ...blockCCms, priceScheduleSection: { ...blockCCms.priceScheduleSection, subline: val } })
              }
            />

            <div className="space-y-3">
              {blockCCms.priceScheduleSection.tableRows.map((row, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7b002c]">
                      {row.size} ({row.category})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = blockCCms.priceScheduleSection.tableRows.filter((_, i) => i !== idx);
                        setBlockCCms({ ...blockCCms, priceScheduleSection: { ...blockCCms.priceScheduleSection, tableRows: updated } });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Plot Size</label>
                      <input
                        type="text"
                        value={row.size}
                        onChange={(e) => {
                          const updated = [...blockCCms.priceScheduleSection.tableRows];
                          updated[idx].size = e.target.value;
                          setBlockCCms({ ...blockCCms, priceScheduleSection: { ...blockCCms.priceScheduleSection, tableRows: updated } });
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
                          const updated = [...blockCCms.priceScheduleSection.tableRows];
                          updated[idx].dimensions = e.target.value;
                          setBlockCCms({ ...blockCCms, priceScheduleSection: { ...blockCCms.priceScheduleSection, tableRows: updated } });
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
                          const updated = [...blockCCms.priceScheduleSection.tableRows];
                          updated[idx].priceRange = e.target.value;
                          setBlockCCms({ ...blockCCms, priceScheduleSection: { ...blockCCms.priceScheduleSection, tableRows: updated } });
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-emerald-800 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Investor Highlight Note</label>
                    <input
                      type="text"
                      value={row.highlight}
                      onChange={(e) => {
                        const updated = [...blockCCms.priceScheduleSection.tableRows];
                        updated[idx].highlight = e.target.value;
                        setBlockCCms({ ...blockCCms, priceScheduleSection: { ...blockCCms.priceScheduleSection, tableRows: updated } });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border rounded text-xs text-slate-700"
                    />
                  </div>
                </div>
              ))}
            </div>

            <CmsRichTextarea
              label="Rate Comparison Takeaway"
              rows={2}
              value={blockCCms.priceScheduleSection.rateComparisonNote}
              onChange={(val) =>
                setBlockCCms({ ...blockCCms, priceScheduleSection: { ...blockCCms.priceScheduleSection, rateComparisonNote: val } })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. DEVELOPMENT STATUS & UTILITIES                         */}
      {/* ========================================================= */}
      {activeSubTab === 'infra' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">8. Development Status & Utilities Checklist</h4>
              <p className="text-xs text-slate-500">Edit infrastructure completion status for roads, utilities, and mosque.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setBlockCCms({
                  ...blockCCms,
                  possessionAndInfra: {
                    ...blockCCms.possessionAndInfra,
                    tableRows: [
                      ...blockCCms.possessionAndInfra.tableRows,
                      { item: 'New Infrastructure Feature', status: 'Operational' }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Section Heading"
              value={blockCCms.possessionAndInfra.heading}
              onChange={(val) => setBlockCCms({ ...blockCCms, possessionAndInfra: { ...blockCCms.possessionAndInfra, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Description"
              rows={2}
              value={blockCCms.possessionAndInfra.lead}
              onChange={(val) => setBlockCCms({ ...blockCCms, possessionAndInfra: { ...blockCCms.possessionAndInfra, lead: val } })}
            />

            <div className="space-y-2">
              {blockCCms.possessionAndInfra.tableRows.map((row, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
                  <input
                    type="text"
                    value={row.item}
                    onChange={(e) => {
                      const updated = [...blockCCms.possessionAndInfra.tableRows];
                      updated[idx].item = e.target.value;
                      setBlockCCms({ ...blockCCms, possessionAndInfra: { ...blockCCms.possessionAndInfra, tableRows: updated } });
                    }}
                    className="flex-1 px-3 py-1.5 bg-white border rounded text-xs font-bold"
                  />
                  <input
                    type="text"
                    value={row.status}
                    onChange={(e) => {
                      const updated = [...blockCCms.possessionAndInfra.tableRows];
                      updated[idx].status = e.target.value;
                      setBlockCCms({ ...blockCCms, possessionAndInfra: { ...blockCCms.possessionAndInfra, tableRows: updated } });
                    }}
                    className="w-48 px-3 py-1.5 bg-white border rounded text-xs font-bold text-emerald-700"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockCCms.possessionAndInfra.tableRows.filter((_, i) => i !== idx);
                      setBlockCCms({ ...blockCCms, possessionAndInfra: { ...blockCCms.possessionAndInfra, tableRows: updated } });
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <CmsRichTextarea
              label="Possession Policy Footnote"
              rows={2}
              value={blockCCms.possessionAndInfra.statusNote}
              onChange={(val) => setBlockCCms({ ...blockCCms, possessionAndInfra: { ...blockCCms.possessionAndInfra, statusNote: val } })}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. HILLS WALK PROMENADE INTEGRATION                       */}
      {/* ========================================================= */}
      {activeSubTab === 'hillsWalk' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">9. Hills Walk Commercial Integration</h4>
            <p className="text-xs text-slate-500">Edit Hills Walk anchor showcase banner, bullet points, and CTA links inside Block C.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Hills Walk Section Heading"
              value={blockCCms.hillsWalkSection.heading}
              onChange={(val) => setBlockCCms({ ...blockCCms, hillsWalkSection: { ...blockCCms.hillsWalkSection, heading: val } })}
            />
            <CmsRichInput
              label="Tag Label"
              value={blockCCms.hillsWalkSection.tag}
              onChange={(val) => setBlockCCms({ ...blockCCms, hillsWalkSection: { ...blockCCms.hillsWalkSection, tag: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={3}
              value={blockCCms.hillsWalkSection.leadParagraph}
              onChange={(val) => setBlockCCms({ ...blockCCms, hillsWalkSection: { ...blockCCms.hillsWalkSection, leadParagraph: val } })}
            />

            <ImageUploadField
              label="Hills Walk Showcase Image"
              value={blockCCms.hillsWalkSection.bannerImage}
              onChange={(val) => setBlockCCms({ ...blockCCms, hillsWalkSection: { ...blockCCms.hillsWalkSection, bannerImage: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <CmsRichInput
                label="Button Text"
                value={blockCCms.hillsWalkSection.buttonText}
                onChange={(val) => setBlockCCms({ ...blockCCms, hillsWalkSection: { ...blockCCms.hillsWalkSection, buttonText: val } })}
              />
              <CmsRichInput
                label="Button Link URL"
                value={blockCCms.hillsWalkSection.buttonLink}
                onChange={(val) => setBlockCCms({ ...blockCCms, hillsWalkSection: { ...blockCCms.hillsWalkSection, buttonLink: val } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. WHY INVEST                                            */}
      {/* ========================================================= */}
      {activeSubTab === 'whyInvest' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">10. Why Invest & Target Buyer Profile</h4>
            <p className="text-xs text-slate-500">Edit strategic investment advantages for Block C buyers.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Section Heading"
              value={blockCCms.whoSuitsSection.heading}
              onChange={(val) => setBlockCCms({ ...blockCCms, whoSuitsSection: { ...blockCCms.whoSuitsSection, heading: val } })}
            />
            <CmsRichTextarea
              label="Suits Buyer Profile Summary"
              rows={2}
              value={blockCCms.whoSuitsSection.suitsProfile}
              onChange={(val) => setBlockCCms({ ...blockCCms, whoSuitsSection: { ...blockCCms.whoSuitsSection, suitsProfile: val } })}
            />

            <div className="space-y-3 pt-2">
              {blockCCms.whoSuitsSection.reasons.map((r, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <input
                    type="text"
                    value={r.title}
                    onChange={(e) => {
                      const updated = [...blockCCms.whoSuitsSection.reasons];
                      updated[idx].title = e.target.value;
                      setBlockCCms({ ...blockCCms, whoSuitsSection: { ...blockCCms.whoSuitsSection, reasons: updated } });
                    }}
                    className="w-full px-3 py-1.5 bg-white border rounded text-xs font-bold text-[#7b002c]"
                  />
                  <CmsRichTextarea
                    label="Reason Description"
                    rows={2}
                    value={r.desc}
                    onChange={(val) => {
                      const updated = [...blockCCms.whoSuitsSection.reasons];
                      updated[idx].desc = val;
                      setBlockCCms({ ...blockCCms, whoSuitsSection: { ...blockCCms.whoSuitsSection, reasons: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. TRANSFER PROCESS                                      */}
      {/* ========================================================= */}
      {activeSubTab === 'transfer' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">11. Allotment & Transfer Process</h4>
            <p className="text-xs text-slate-500">Edit the 4-step transfer protocol and required document lists.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Transfer Section Heading"
              value={blockCCms.transferProcess.heading}
              onChange={(val) => setBlockCCms({ ...blockCCms, transferProcess: { ...blockCCms.transferProcess, heading: val } })}
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={blockCCms.transferProcess.leadParagraph}
              onChange={(val) => setBlockCCms({ ...blockCCms, transferProcess: { ...blockCCms.transferProcess, leadParagraph: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {blockCCms.transferProcess.steps.map((st, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 bg-[#7b002c] text-white rounded-lg flex items-center justify-center font-bold text-xs">
                      {st.point}
                    </span>
                    <input
                      type="text"
                      value={st.tag}
                      onChange={(e) => {
                        const updated = [...blockCCms.transferProcess.steps];
                        updated[idx].tag = e.target.value;
                        setBlockCCms({ ...blockCCms, transferProcess: { ...blockCCms.transferProcess, steps: updated } });
                      }}
                      className="px-2 py-0.5 bg-white border rounded text-[10px] font-bold text-slate-600"
                    />
                  </div>

                  <input
                    type="text"
                    value={st.title}
                    onChange={(e) => {
                      const updated = [...blockCCms.transferProcess.steps];
                      updated[idx].title = e.target.value;
                      setBlockCCms({ ...blockCCms, transferProcess: { ...blockCCms.transferProcess, steps: updated } });
                    }}
                    className="w-full px-3 py-1.5 bg-white border rounded text-xs font-bold"
                  />

                  <CmsRichTextarea
                    label="Step Checklist Items (One per line)"
                    rows={3}
                    value={st.points.join('\n')}
                    onChange={(val) => {
                      const updated = [...blockCCms.transferProcess.steps];
                      updated[idx].points = val.split('\n').filter((p) => p.trim().length > 0);
                      setBlockCCms({ ...blockCCms, transferProcess: { ...blockCCms.transferProcess, steps: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. FAQS ACCORDION                                        */}
      {/* ========================================================= */}
      {activeSubTab === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">12. Frequently Asked Questions (FAQs)</h4>
              <p className="text-xs text-slate-500">Edit, add, or reorganize questions answered on Block C page.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setBlockCCms({
                  ...blockCCms,
                  faqsSection: {
                    ...blockCCms.faqsSection,
                    faqs: [
                      ...blockCCms.faqsSection.faqs,
                      { q: 'New Block C Question?', a: 'Detailed answer here.' }
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
              label="FAQs Heading"
              value={blockCCms.faqsSection.heading}
              onChange={(val) => setBlockCCms({ ...blockCCms, faqsSection: { ...blockCCms.faqsSection, heading: val } })}
            />
            <CmsRichInput
              label="Subline"
              value={blockCCms.faqsSection.subline}
              onChange={(val) => setBlockCCms({ ...blockCCms, faqsSection: { ...blockCCms.faqsSection, subline: val } })}
            />

            <div className="space-y-3">
              {blockCCms.faqsSection.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7b002c]">Question #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = blockCCms.faqsSection.faqs.filter((_, i) => i !== idx);
                        setBlockCCms({ ...blockCCms, faqsSection: { ...blockCCms.faqsSection, faqs: updated } });
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
                      const updated = [...blockCCms.faqsSection.faqs];
                      updated[idx].q = e.target.value;
                      setBlockCCms({ ...blockCCms, faqsSection: { ...blockCCms.faqsSection, faqs: updated } });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold"
                  />

                  <CmsRichTextarea
                    label="Answer"
                    rows={2}
                    value={faq.a}
                    onChange={(val) => {
                      const updated = [...blockCCms.faqsSection.faqs];
                      updated[idx].a = val;
                      setBlockCCms({ ...blockCCms, faqsSection: { ...blockCCms.faqsSection, faqs: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 13. INQUIRY FORM & CTA                                    */}
      {/* ========================================================= */}
      {activeSubTab === 'cta' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">13. Closing Site Visit & Inquiry Form</h4>
            <p className="text-xs text-slate-500">Edit bottom conversion form titles, WhatsApp number, and office details.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Section Headline"
              value={blockCCms.closingSiteVisitSection.heading}
              onChange={(val) =>
                setBlockCCms({
                  ...blockCCms,
                  closingSiteVisitSection: { ...blockCCms.closingSiteVisitSection, heading: val }
                })
              }
            />
            <CmsRichTextarea
              label="Intro Text"
              rows={2}
              value={blockCCms.closingSiteVisitSection.intro}
              onChange={(val) =>
                setBlockCCms({
                  ...blockCCms,
                  closingSiteVisitSection: { ...blockCCms.closingSiteVisitSection, intro: val }
                })
              }
            />
            <CmsRichTextarea
              label="Selling Prompt"
              rows={2}
              value={blockCCms.closingSiteVisitSection.sellingPrompt}
              onChange={(val) =>
                setBlockCCms({
                  ...blockCCms,
                  closingSiteVisitSection: { ...blockCCms.closingSiteVisitSection, sellingPrompt: val }
                })
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CmsRichInput
                label="WhatsApp Number"
                value={blockCCms.closingSiteVisitSection.whatsappNumber}
                onChange={(val) =>
                  setBlockCCms({
                    ...blockCCms,
                    closingSiteVisitSection: { ...blockCCms.closingSiteVisitSection, whatsappNumber: val }
                  })
                }
              />
              <CmsRichInput
                label="Phone Contact"
                value={blockCCms.closingSiteVisitSection.phoneNumber}
                onChange={(val) =>
                  setBlockCCms({
                    ...blockCCms,
                    closingSiteVisitSection: { ...blockCCms.closingSiteVisitSection, phoneNumber: val }
                  })
                }
              />
            </div>

            <CmsRichInput
              label="Office Address"
              value={blockCCms.closingSiteVisitSection.officeAddress}
              onChange={(val) =>
                setBlockCCms({
                  ...blockCCms,
                  closingSiteVisitSection: { ...blockCCms.closingSiteVisitSection, officeAddress: val }
                })
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <CmsRichInput
                label="Form Title"
                value={blockCCms.closingSiteVisitSection.formTitle}
                onChange={(val) =>
                  setBlockCCms({
                    ...blockCCms,
                    closingSiteVisitSection: { ...blockCCms.closingSiteVisitSection, formTitle: val }
                  })
                }
              />
              <CmsRichInput
                label="Submit Button Text"
                value={blockCCms.closingSiteVisitSection.formButtonText}
                onChange={(val) =>
                  setBlockCCms({
                    ...blockCCms,
                    closingSiteVisitSection: { ...blockCCms.closingSiteVisitSection, formButtonText: val }
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
