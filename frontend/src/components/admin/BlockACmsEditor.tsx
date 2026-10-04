'use client';

import React, { useState, useRef } from 'react';
import {
  BlockACMSData,
  initialBlockACMS,
  saveBlockACMS
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
  Link2
} from 'lucide-react';

import ImageUploader, { type ImageUploaderProps } from './ImageUploader';

// Derived from the uploader's own props rather than restated, so a capability
// added to `ImageUploader` (alt text, folder, aspect ratio) is immediately
// usable here. The previous hand-written subset silently omitted them, which is
// why alt text could not be passed through this wrapper.
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

interface BlockACmsEditorProps {
  blockACms: BlockACMSData;
  setBlockACms: React.Dispatch<React.SetStateAction<BlockACMSData>>;
  token?: string;
  onSaveSuccess?: (msg: string) => void;
}

export default function BlockACmsEditor({
  blockACms,
  setBlockACms,
  token,
  onSaveSuccess
}: BlockACmsEditorProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    | 'overview'
    | 'location'
    | 'masterPlan'
    | 'plotSizes'
    | 'pricing'
    | 'ratePerSqFt'
    | 'filesVsPossession'
    | 'specialPlots'
    | 'apartments'
    | 'whoItSuits'
    | 'transferGuide'
    | 'glossary'
    | 'comparison'
    | 'development'
    | 'faqs'
    | 'closing'
  >('overview');

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      tabsScrollRef.current.scrollBy({
        left: direction === 'left' ? -250 : 250,
        behavior: 'smooth'
      });
    }
  };

  const subTabs = [
    { id: 'overview', label: '1. Overview & Facts', icon: Sparkles },
    { id: 'location', label: '2. Location & Routes', icon: MapPin },
    { id: 'masterPlan', label: '3. Map & Blueprint', icon: Compass },
    { id: 'plotSizes', label: '4. Plot Sizes & Dimensions', icon: Layers },
    { id: 'pricing', label: '5. Price Table (2-Column)', icon: DollarSign },
    { id: 'ratePerSqFt', label: '6. Rate/SqFt Analysis', icon: Scale },
    { id: 'filesVsPossession', label: '7. Files vs Possession', icon: FileText },
    { id: 'specialPlots', label: '8. 2 Kanal & Commercial', icon: Building2 },
    { id: 'apartments', label: '9. ZN Tower & Apartments', icon: Building2 },
    { id: 'whoItSuits', label: '10. Buyer Suitability', icon: Award },
    { id: 'transferGuide', label: '11. 7-Step Transfer & Signs', icon: ShieldCheck },
    { id: 'glossary', label: '12. Listings Glossary', icon: Info },
    { id: 'comparison', label: '13. Block A vs Executive', icon: Scale },
    { id: 'development', label: '14. Facilities & Status', icon: CheckCircle2 },
    { id: 'faqs', label: '15. All 11 FAQs', icon: HelpCircle },
    { id: 'closing', label: '16. CTA & Credentials', icon: PhoneCall },
  ] as const;

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const ok = await saveBlockACMS(blockACms, token);
      if (ok) {
        const msg = 'Block A CMS settings successfully published & synced live!';
        setSaveMessage(msg);
        if (onSaveSuccess) onSaveSuccess(msg);
      } else {
        setSaveMessage('Saved locally in browser cache.');
      }
    } catch (e) {
      console.error(e);
      setSaveMessage('Error saving to server. Saved locally in browser storage.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset all Block A content back to the original verified copy?')) {
      setBlockACms(initialBlockACMS);
    }
  };

  const ImageUploadField = createImageUploadField(token);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#7b002c] to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Block A Dedicated Publishing System</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Faisal Hills Block A CMS Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-sans">
            Manage live pricing comparison, rate per sq. ft., ZN Tower progress, 7-step transfer legalities, and all 16 official sections.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Reset to default copy"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Publishing...' : 'Save Live Block A'}</span>
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{saveMessage}</span>
          </div>
          <a
            href="/blocks/block-a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7b002c] hover:underline flex items-center gap-1"
          >
            <span>View Live Page</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Subtab Navigation Strip with Moving Buttons */}
      <div className="relative flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
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
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border whitespace-nowrap ${
                  isActive
                    ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
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
      {/* SUBTAB 1: OVERVIEW & FACTS                                */}
      {/* ========================================================= */}
      {activeSubTab === 'overview' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#7b002c]" />
              <span>Section 1: Verification Header, Title & Key Facts Summary</span>
            </h3>
          </div>

          {/* Verification Bar Strip */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Verification & Byline Metadata</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge Text</label>
                <input
                  type="text"
                  value={blockACms.verificationHeader.badgeText}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      verificationHeader: { ...blockACms.verificationHeader, badgeText: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Prices Verified Date</label>
                <input
                  type="text"
                  value={blockACms.verificationHeader.pricesVerifiedDate}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      verificationHeader: { ...blockACms.verificationHeader, pricesVerifiedDate: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Site Checked Date</label>
                <input
                  type="text"
                  value={blockACms.verificationHeader.siteCheckedDate}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      verificationHeader: { ...blockACms.verificationHeader, siteCheckedDate: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Reviewer Name</label>
                <input
                  type="text"
                  value={blockACms.verificationHeader.reviewerName}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      verificationHeader: { ...blockACms.verificationHeader, reviewerName: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Possession Status Text</label>
                <input
                  type="text"
                  value={blockACms.verificationHeader.possessionConfirmedText}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      verificationHeader: { ...blockACms.verificationHeader, possessionConfirmedText: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* Heading & Paragraphs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Page H1 Title</label>
              <input
                type="text"
                value={blockACms.overview.h1}
                onChange={(e) =>
                  setBlockACms({
                    ...blockACms,
                    overview: { ...blockACms.overview, h1: e.target.value }
                  })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-serif font-bold text-slate-900"
              />
            </div>

            <CmsRichTextarea
              label="Opening Narrative Paragraph 1"
              rows={3}
              value={blockACms.overview.leadParagraph1}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  overview: { ...blockACms.overview, leadParagraph1: val }
                })
              }
            />

            <CmsRichTextarea
              label="Opening Narrative Paragraph 2"
              rows={2}
              value={blockACms.overview.leadParagraph2}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  overview: { ...blockACms.overview, leadParagraph2: val }
                })
              }
            />
          </div>

          {/* Top Key Facts Summary Matrix Table */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900">
              Top Key Facts Summary Table (First Table in Copy)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Position</label>
                <input
                  type="text"
                  value={blockACms.overview.quickFacts.position}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      overview: {
                        ...blockACms.overview,
                        quickFacts: { ...blockACms.overview.quickFacts, position: e.target.value }
                      }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Residential Sizes</label>
                <input
                  type="text"
                  value={blockACms.overview.quickFacts.residentialSizes}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      overview: {
                        ...blockACms.overview,
                        quickFacts: { ...blockACms.overview.quickFacts, residentialSizes: e.target.value }
                      }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Commercial Sizes</label>
                <input
                  type="text"
                  value={blockACms.overview.quickFacts.commercialSizes}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      overview: {
                        ...blockACms.overview,
                        quickFacts: { ...blockACms.overview.quickFacts, commercialSizes: e.target.value }
                      }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">How You Buy</label>
                <input
                  type="text"
                  value={blockACms.overview.quickFacts.howYouBuy}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      overview: {
                        ...blockACms.overview,
                        quickFacts: { ...blockACms.overview.quickFacts, howYouBuy: e.target.value }
                      }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Possession</label>
                <input
                  type="text"
                  value={blockACms.overview.quickFacts.possession}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      overview: {
                        ...blockACms.overview,
                        quickFacts: { ...blockACms.overview.quickFacts, possession: e.target.value }
                      }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Legal Status</label>
                <input
                  type="text"
                  value={blockACms.overview.quickFacts.legalStatus}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      overview: {
                        ...blockACms.overview,
                        quickFacts: { ...blockACms.overview.quickFacts, legalStatus: e.target.value }
                      }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* Hero Image Showcase Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">Right Column Showcase Image</h4>
            <ImageUploadField
              label="Block A Main Showcase Image"
              value={blockACms.overview.image}
              onChange={(url) =>
                setBlockACms({
                  ...blockACms,
                  overview: { ...blockACms.overview, image: url }
                })
              }
              alt={blockACms.overview.imageAlt}
              onAltChange={(imageAlt) =>
                setBlockACms({
                  ...blockACms,
                  overview: { ...blockACms.overview, imageAlt }
                })
              }
              helper="Recommended: Grand Jamia Mosque or residential streetscape photograph"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Image Tag</label>
                <input
                  type="text"
                  value={blockACms.overview.imageTag}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      overview: { ...blockACms.overview, imageTag: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-white border rounded-xl text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 2: LOCATION & ROUTES                               */}
      {/* ========================================================= */}
      {activeSubTab === 'location' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <MapPin className="w-5 h-5 text-[#7b002c]" />
            <span>Section 2: Where Block A Is & Access Routes</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Section Heading</label>
              <input
                type="text"
                value={blockACms.location.heading}
                onChange={(e) =>
                  setBlockACms({
                    ...blockACms,
                    location: { ...blockACms.location, heading: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-bold"
              />
            </div>
            <CmsRichTextarea
              label="Paragraph 1 (Boundaries & Access)"
              rows={2}
              value={blockACms.location.leadParagraph1}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  location: { ...blockACms.location, leadParagraph1: val }
                })
              }
            />
            <CmsRichTextarea
              label="Paragraph 2 (Rawalpindi / RDA Clarification)"
              rows={2}
              value={blockACms.location.leadParagraph2}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  location: { ...blockACms.location, leadParagraph2: val }
                })
              }
            />
            <CmsRichTextarea
              label="Drive Times Note & Policy"
              rows={2}
              value={blockACms.location.driveTimesNote}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  location: { ...blockACms.location, driveTimesNote: val }
                })
              }
            />

            {/* Routes List */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">Connecting Corridors & Routes</label>
                <button
                  type="button"
                  onClick={() =>
                    setBlockACms({
                      ...blockACms,
                      location: {
                        ...blockACms.location,
                        routesList: [...blockACms.location.routesList, 'New Route']
                      }
                    })
                  }
                  className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Route
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {blockACms.location.routesList.map((route, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={route}
                      onChange={(e) => {
                        const updated = [...blockACms.location.routesList];
                        updated[idx] = e.target.value;
                        setBlockACms({
                          ...blockACms,
                          location: { ...blockACms.location, routesList: updated }
                        })
                      }}
                      className="flex-1 px-3 py-1.5 bg-white border rounded-xl text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = blockACms.location.routesList.filter((_, i) => i !== idx);
                        setBlockACms({
                          ...blockACms,
                          location: { ...blockACms.location, routesList: updated }
                        });
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 3: MAP & MASTER PLAN                               */}
      {/* ========================================================= */}
      {activeSubTab === 'masterPlan' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <Compass className="w-5 h-5 text-[#7b002c]" />
            <span>Section 3: Block A Map and Master Plan</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Section Heading</label>
              <input
                type="text"
                value={blockACms.mapAndMasterPlan.heading}
                onChange={(e) =>
                  setBlockACms({
                    ...blockACms,
                    mapAndMasterPlan: { ...blockACms.mapAndMasterPlan, heading: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-bold"
              />
            </div>
            <CmsRichTextarea
              label="Layout Description"
              rows={2}
              value={blockACms.mapAndMasterPlan.description}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  mapAndMasterPlan: { ...blockACms.mapAndMasterPlan, description: val }
                })
              }
            />
            <CmsRichTextarea
              label="Road Widths Discrepancy Note"
              rows={2}
              value={blockACms.mapAndMasterPlan.roadWidthsNote}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  mapAndMasterPlan: { ...blockACms.mapAndMasterPlan, roadWidthsNote: val }
                })
              }
            />
            <ImageUploadField
              label="Block A Master Plan Map Image"
              value={blockACms.mapAndMasterPlan.mapImage}
              onChange={(url) =>
                setBlockACms({
                  ...blockACms,
                  mapAndMasterPlan: { ...blockACms.mapAndMasterPlan, mapImage: url }
                })
              }
              helper="Blueprint / Master plan map of Sector A"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 4: PLOT SIZES & MARLA GUIDE                        */}
      {/* ========================================================= */}
      {activeSubTab === 'plotSizes' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <Layers className="w-5 h-5 text-[#7b002c]" />
            <span>Section 4: Plot Sizes in Block A & Dimension Standards</span>
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Dimensions (ft)</th>
                  <th className="p-3">Area (sq ft)</th>
                  <th className="p-3">Area (sq yds)</th>
                  <th className="p-3 text-amber-300">Sold as</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {blockACms.plotSizesSection.tableRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.dimensions}
                        onChange={(e) => {
                          const updated = [...blockACms.plotSizesSection.tableRows];
                          updated[idx].dimensions = e.target.value;
                          setBlockACms({
                            ...blockACms,
                            plotSizesSection: { ...blockACms.plotSizesSection, tableRows: updated }
                          });
                        }}
                        className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.areaSqFt}
                        onChange={(e) => {
                          const updated = [...blockACms.plotSizesSection.tableRows];
                          updated[idx].areaSqFt = e.target.value;
                          setBlockACms({
                            ...blockACms,
                            plotSizesSection: { ...blockACms.plotSizesSection, tableRows: updated }
                          });
                        }}
                        className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.areaSqYds}
                        onChange={(e) => {
                          const updated = [...blockACms.plotSizesSection.tableRows];
                          updated[idx].areaSqYds = e.target.value;
                          setBlockACms({
                            ...blockACms,
                            plotSizesSection: { ...blockACms.plotSizesSection, tableRows: updated }
                          });
                        }}
                        className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.soldAs}
                        onChange={(e) => {
                          const updated = [...blockACms.plotSizesSection.tableRows];
                          updated[idx].soldAs = e.target.value;
                          setBlockACms({
                            ...blockACms,
                            plotSizesSection: { ...blockACms.plotSizesSection, tableRows: updated }
                          });
                        }}
                        className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs font-bold text-[#7b002c]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
            <CmsRichTextarea
              label="Non-Standard Sizes & Marla Difference Guide"
              rows={3}
              value={blockACms.plotSizesSection.nonStandardText}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  plotSizesSection: { ...blockACms.plotSizesSection, nonStandardText: val }
                })
              }
            />
            <CmsRichInput
              label="Buyer Tip Box"
              value={blockACms.plotSizesSection.buyerTip}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  plotSizesSection: { ...blockACms.plotSizesSection, buyerTip: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 5: TWO-COLUMN PRICE TABLE                          */}
      {/* ========================================================= */}
      {activeSubTab === 'pricing' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <DollarSign className="w-5 h-5 text-[#7b002c]" />
            <span>Section 5: Block A Plot Prices (Published Range vs Asking Prices)</span>
          </h3>

          <div className="space-y-4">
            <CmsRichTextarea
              label="Introductory Paragraph"
              rows={2}
              value={blockACms.pricingAndRates.leadParagraph}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  pricingAndRates: { ...blockACms.pricingAndRates, leadParagraph: val }
                })
              }
            />

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3 w-1/4">Plot size</th>
                    <th className="p-3 w-3/8 text-amber-300">Published range</th>
                    <th className="p-3 w-3/8 text-emerald-300">Recent asking prices (Sep 2026)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white font-medium">
                  {blockACms.pricingAndRates.tableRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.plotSize}
                          onChange={(e) => {
                            const updated = [...blockACms.pricingAndRates.tableRows];
                            updated[idx].plotSize = e.target.value;
                            setBlockACms({
                              ...blockACms,
                              pricingAndRates: { ...blockACms.pricingAndRates, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs font-bold"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.publishedBand}
                          onChange={(e) => {
                            const updated = [...blockACms.pricingAndRates.tableRows];
                            updated[idx].publishedBand = e.target.value;
                            setBlockACms({
                              ...blockACms,
                              pricingAndRates: { ...blockACms.pricingAndRates, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.recentAskingPrices}
                          onChange={(e) => {
                            const updated = [...blockACms.pricingAndRates.tableRows];
                            updated[idx].recentAskingPrices = e.target.value;
                            setBlockACms({
                              ...blockACms,
                              pricingAndRates: { ...blockACms.pricingAndRates, tableRows: updated }
                            });
                          }}
                          className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs font-serif font-bold text-[#7b002c]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CmsRichTextarea
              label="Market Sampling Note (370 listings)"
              rows={2}
              value={blockACms.pricingAndRates.sampleAttribution}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  pricingAndRates: { ...blockACms.pricingAndRates, sampleAttribution: val }
                })
              }
            />

            <CmsRichInput
              label="Low Quote Caution Note"
              value={blockACms.pricingAndRates.lowPriceWarning}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  pricingAndRates: { ...blockACms.pricingAndRates, lowPriceWarning: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 6: RATE PER SQ. FT. ANALYSIS                       */}
      {/* ========================================================= */}
      {activeSubTab === 'ratePerSqFt' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <Scale className="w-5 h-5 text-[#7b002c]" />
            <span>Section 6: Larger Plots Cost Less Per Square Foot (Rate Analysis)</span>
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3 w-1/4">Plot size</th>
                  <th className="p-3 w-3/8 text-amber-300">Approx. rate per sq ft</th>
                  <th className="p-3 w-3/8 text-emerald-300">Value Efficiency Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {blockACms.ratePerSqFtSection.tableRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-2 font-bold">{row.plotSize}</td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.ratePerSqFt}
                        onChange={(e) => {
                          const updated = [...blockACms.ratePerSqFtSection.tableRows];
                          updated[idx].ratePerSqFt = e.target.value;
                          setBlockACms({
                            ...blockACms,
                            ratePerSqFtSection: { ...blockACms.ratePerSqFtSection, tableRows: updated }
                          });
                        }}
                        className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs font-bold text-[#7b002c]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.valueNote}
                        onChange={(e) => {
                          const updated = [...blockACms.ratePerSqFtSection.tableRows];
                          updated[idx].valueNote = e.target.value;
                          setBlockACms({
                            ...blockACms,
                            ratePerSqFtSection: { ...blockACms.ratePerSqFtSection, tableRows: updated }
                          });
                        }}
                        className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CmsRichTextarea
            label="Land Value Takeaway Analysis"
            rows={3}
            value={blockACms.ratePerSqFtSection.landValueTakeaway}
            onChange={(val) =>
              setBlockACms({
                ...blockACms,
                ratePerSqFtSection: { ...blockACms.ratePerSqFtSection, landValueTakeaway: val }
              })
            }
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 7: FILES VS POSSESSION                             */}
      {/* ========================================================= */}
      {activeSubTab === 'filesVsPossession' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <FileText className="w-5 h-5 text-[#7b002c]" />
            <span>Section 7: Files and Possession Plots in Block A</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Heading</label>
              <input
                type="text"
                value={blockACms.filesVsPossessionSection.heading}
                onChange={(e) =>
                  setBlockACms({
                    ...blockACms,
                    filesVsPossessionSection: { ...blockACms.filesVsPossessionSection, heading: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-bold"
              />
            </div>
            <CmsRichTextarea
              label="Explanation Text"
              rows={4}
              value={blockACms.filesVsPossessionSection.text}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  filesVsPossessionSection: { ...blockACms.filesVsPossessionSection, text: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 8: 2 KANAL & COMMERCIAL PLOTS                      */}
      {/* ========================================================= */}
      {activeSubTab === 'specialPlots' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <Building2 className="w-5 h-5 text-[#7b002c]" />
            <span>Section 8: 2 Kanal Plots & Commercial Plots in Block A</span>
          </h3>

          {/* 2 Kanal Section */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b002c]">2 Kanal Spotlight</span>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Heading</label>
              <input
                type="text"
                value={blockACms.twoKanalSection.heading}
                onChange={(e) =>
                  setBlockACms({
                    ...blockACms,
                    twoKanalSection: { ...blockACms.twoKanalSection, heading: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-white border rounded-xl text-xs font-bold"
              />
            </div>
            <CmsRichTextarea
              label="Description"
              rows={3}
              value={blockACms.twoKanalSection.description}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  twoKanalSection: { ...blockACms.twoKanalSection, description: val }
                })
              }
            />
          </div>

          {/* Commercial Plots Section */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Commercial Plots & Hub Discrepancy</span>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Heading</label>
              <input
                type="text"
                value={blockACms.commercialSection.heading}
                onChange={(e) =>
                  setBlockACms({
                    ...blockACms,
                    commercialSection: { ...blockACms.commercialSection, heading: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-white border rounded-xl text-xs font-bold"
              />
            </div>
            <CmsRichTextarea
              label="Description (9.6M – 2 Kanal)"
              rows={2}
              value={blockACms.commercialSection.description}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  commercialSection: { ...blockACms.commercialSection, description: val }
                })
              }
            />
            <CmsRichTextarea
              label="Commercial Hub Conflict Note"
              rows={2}
              value={blockACms.commercialSection.commercialHubNote}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  commercialSection: { ...blockACms.commercialSection, commercialHubNote: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 9: APARTMENTS & TOWERS                             */}
      {/* ========================================================= */}
      {activeSubTab === 'apartments' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <Building2 className="w-5 h-5 text-[#7b002c]" />
            <span>Section 9: Apartments in Block A (ZN Tower 1 & Serene Hills)</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Intro</label>
              <input
                type="text"
                value={blockACms.apartmentsSection.intro}
                onChange={(e) =>
                  setBlockACms({
                    ...blockACms,
                    apartmentsSection: { ...blockACms.apartmentsSection, intro: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"
              />
            </div>
            <CmsRichTextarea
              label="ZN Tower 1 Description"
              rows={3}
              value={blockACms.apartmentsSection.znTowerDesc}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  apartmentsSection: { ...blockACms.apartmentsSection, znTowerDesc: val }
                })
              }
            />
            <CmsRichTextarea
              label="Serene Hills Description"
              rows={2}
              value={blockACms.apartmentsSection.sereneHillsDesc}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  apartmentsSection: { ...blockACms.apartmentsSection, sereneHillsDesc: val }
                })
              }
            />
            <CmsRichTextarea
              label="Apartment Pricing Analysis (~PKR 13,000/sqft)"
              rows={2}
              value={blockACms.apartmentsSection.pricingNote}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  apartmentsSection: { ...blockACms.apartmentsSection, pricingNote: val }
                })
              }
            />
            <CmsRichTextarea
              label="Caution Note (Fake CDA Claims & Airport Drive Claims)"
              rows={2}
              value={blockACms.apartmentsSection.cautionNote}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  apartmentsSection: { ...blockACms.apartmentsSection, cautionNote: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 10: BUYER SUITABILITY & WEIGHING POINTS            */}
      {/* ========================================================= */}
      {activeSubTab === 'whoItSuits' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <Award className="w-5 h-5 text-[#7b002c]" />
            <span>Section 10: Who Block A Suits, and What to Weigh</span>
          </h3>

          <div className="space-y-4">
            <CmsRichTextarea
              label="Lead Evaluation Narrative"
              rows={3}
              value={blockACms.whoItSuitsSection.leadParagraph}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  whoItSuitsSection: { ...blockACms.whoItSuitsSection, leadParagraph: val }
                })
              }
            />

            {/* 5 Investment Considerations */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
              <label className="block text-xs font-bold text-amber-900">5 Key Investment Diligence Considerations</label>
              <div className="space-y-3">
                {blockACms.whoItSuitsSection.considerations.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white border border-amber-200 rounded-xl space-y-1.5">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...blockACms.whoItSuitsSection.considerations];
                        updated[idx].title = e.target.value;
                        setBlockACms({
                          ...blockACms,
                          whoItSuitsSection: { ...blockACms.whoItSuitsSection, considerations: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1 bg-slate-50 border rounded-lg text-xs font-bold"
                    />
                    <CmsRichTextarea
                      rows={2}
                      value={item.desc}
                      onChange={(val) => {
                        const updated = [...blockACms.whoItSuitsSection.considerations];
                        updated[idx].desc = val;
                        setBlockACms({
                          ...blockACms,
                          whoItSuitsSection: { ...blockACms.whoItSuitsSection, considerations: updated }
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <CmsRichInput
              label="No Speculative Returns Disclaimer Policy"
              value={blockACms.whoItSuitsSection.disclaimerNote}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  whoItSuitsSection: { ...blockACms.whoItSuitsSection, disclaimerNote: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 11: 7-STEP TRANSFER & WARNING SIGNS                */}
      {/* ========================================================= */}
      {activeSubTab === 'transferGuide' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <ShieldCheck className="w-5 h-5 text-[#7b002c]" />
            <span>Section 11: How You Buy in Block A (7-Step Resale & Transfer)</span>
          </h3>

          <div className="space-y-4">
            <CmsRichTextarea
              label="Intro Narrative"
              rows={2}
              value={blockACms.buyingAndTransferSection.intro}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  buyingAndTransferSection: { ...blockACms.buyingAndTransferSection, intro: val }
                })
              }
            />

            {/* Steps Array */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">7-Step Transfer Sequence</label>
              {blockACms.buyingAndTransferSection.steps.map((st, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border rounded-2xl flex items-center gap-3">
                  <span className="text-xs font-serif font-bold text-[#7b002c] bg-rose-50 px-2 py-1 rounded-lg border border-rose-200 shrink-0">
                    Step {st.step}
                  </span>
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={st.title}
                      onChange={(e) => {
                        const updated = [...blockACms.buyingAndTransferSection.steps];
                        updated[idx].title = e.target.value;
                        setBlockACms({
                          ...blockACms,
                          buyingAndTransferSection: { ...blockACms.buyingAndTransferSection, steps: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1 bg-white border rounded-lg text-xs font-bold"
                    />
                    <CmsRichInput
                      value={st.desc}
                      onChange={(val) => {
                        const updated = [...blockACms.buyingAndTransferSection.steps];
                        updated[idx].desc = val;
                        setBlockACms({
                          ...blockACms,
                          buyingAndTransferSection: { ...blockACms.buyingAndTransferSection, steps: updated }
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Warning Signs Box */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
              <label className="block text-xs font-bold text-rose-900">Warning Signs Checklist</label>
              <div className="space-y-2">
                {blockACms.buyingAndTransferSection.warningSigns.map((ws, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <CmsRichInput
                      value={ws}
                      onChange={(val) => {
                        const updated = [...blockACms.buyingAndTransferSection.warningSigns];
                        updated[idx] = val;
                        setBlockACms({
                          ...blockACms,
                          buyingAndTransferSection: { ...blockACms.buyingAndTransferSection, warningSigns: updated }
                        });
                      }}
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 12: LISTINGS GLOSSARY                              */}
      {/* ========================================================= */}
      {activeSubTab === 'glossary' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <Info className="w-5 h-5 text-[#7b002c]" />
            <span>Section 12: Reading Block A Listings (Glossary Decoder)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blockACms.readingListingsGlossary.terms.map((t, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <input
                  type="text"
                  value={t.term}
                  onChange={(e) => {
                    const updated = [...blockACms.readingListingsGlossary.terms];
                    updated[idx].term = e.target.value;
                    setBlockACms({
                      ...blockACms,
                      readingListingsGlossary: { ...blockACms.readingListingsGlossary, terms: updated }
                    });
                  }}
                  className="w-full px-2.5 py-1.5 bg-white border rounded-xl text-xs font-bold text-[#7b002c]"
                />
                <CmsRichTextarea
                  rows={2}
                  value={t.definition}
                  onChange={(val) => {
                    const updated = [...blockACms.readingListingsGlossary.terms];
                    updated[idx].definition = val;
                    setBlockACms({
                      ...blockACms,
                      readingListingsGlossary: { ...blockACms.readingListingsGlossary, terms: updated }
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 13: BLOCK A VS EXECUTIVE MATRIX                    */}
      {/* ========================================================= */}
      {activeSubTab === 'comparison' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <Scale className="w-5 h-5 text-[#7b002c]" />
            <span>Section 13: Block A or the Executive Block Comparison Matrix</span>
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3 w-1/4">Aspect</th>
                  <th className="p-3 w-3/8 text-amber-300">Block A</th>
                  <th className="p-3 w-3/8 text-emerald-300">Executive Block</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {blockACms.comparisonExecutiveSection.tableRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-2 font-bold">{row.aspect}</td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.blockA}
                        onChange={(e) => {
                          const updated = [...blockACms.comparisonExecutiveSection.tableRows];
                          updated[idx].blockA = e.target.value;
                          setBlockACms({
                            ...blockACms,
                            comparisonExecutiveSection: { ...blockACms.comparisonExecutiveSection, tableRows: updated }
                          });
                        }}
                        className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.executiveBlock}
                        onChange={(e) => {
                          const updated = [...blockACms.comparisonExecutiveSection.tableRows];
                          updated[idx].executiveBlock = e.target.value;
                          setBlockACms({
                            ...blockACms,
                            comparisonExecutiveSection: { ...blockACms.comparisonExecutiveSection, tableRows: updated }
                          });
                        }}
                        className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 14: FACILITIES & STATUS                            */}
      {/* ========================================================= */}
      {activeSubTab === 'development' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <CheckCircle2 className="w-5 h-5 text-[#7b002c]" />
            <span>Section 14: Development Status and Facilities Checklist</span>
          </h3>

          <div className="space-y-4">
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3 w-1/2">Item</th>
                    <th className="p-3 w-1/2 text-emerald-300">Reported Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white font-medium">
                  {blockACms.developmentAndFacilitiesSection.statusTableRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.item}
                          onChange={(e) => {
                            const updated = [...blockACms.developmentAndFacilitiesSection.statusTableRows];
                            updated[idx].item = e.target.value;
                            setBlockACms({
                              ...blockACms,
                              developmentAndFacilitiesSection: {
                                ...blockACms.developmentAndFacilitiesSection,
                                statusTableRows: updated
                              }
                            });
                          }}
                          className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs font-bold"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.status}
                          onChange={(e) => {
                            const updated = [...blockACms.developmentAndFacilitiesSection.statusTableRows];
                            updated[idx].status = e.target.value;
                            setBlockACms({
                              ...blockACms,
                              developmentAndFacilitiesSection: {
                                ...blockACms.developmentAndFacilitiesSection,
                                statusTableRows: updated
                              }
                            });
                          }}
                          className="w-full px-2 py-1 bg-slate-50 border rounded-lg text-xs text-emerald-800 font-semibold"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CmsRichTextarea
              label="Arc Monument & Glow Gardens Note"
              rows={3}
              value={blockACms.developmentAndFacilitiesSection.arcMonumentNote}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  developmentAndFacilitiesSection: {
                    ...blockACms.developmentAndFacilitiesSection,
                    arcMonumentNote: val
                  }
                })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 15: ALL 11 FAQS                                    */}
      {/* ========================================================= */}
      {activeSubTab === 'faqs' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#7b002c]" />
              <span>Section 15: Frequently Asked Questions (All 11 Official FAQs)</span>
            </h3>
            <button
              type="button"
              onClick={() =>
                setBlockACms({
                  ...blockACms,
                  faqsSection: {
                    ...blockACms.faqsSection,
                    faqs: [...blockACms.faqsSection.faqs, { q: 'New Question?', a: 'Answer here.' }]
                  }
                })
              }
              className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add FAQ
            </button>
          </div>

          <div className="space-y-4">
            {blockACms.faqsSection.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#7b002c]">FAQ #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockACms.faqsSection.faqs.filter((_, i) => i !== idx);
                      setBlockACms({
                        ...blockACms,
                        faqsSection: { ...blockACms.faqsSection, faqs: updated }
                      });
                    }}
                    className="p-1 text-slate-400 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => {
                    const updated = [...blockACms.faqsSection.faqs];
                    updated[idx].q = e.target.value;
                    setBlockACms({
                      ...blockACms,
                      faqsSection: { ...blockACms.faqsSection, faqs: updated }
                    });
                  }}
                  className="w-full px-3 py-1.5 bg-white border rounded-xl text-xs font-bold text-slate-900"
                />
                <CmsRichTextarea
                  rows={2}
                  value={faq.a}
                  onChange={(val) => {
                    const updated = [...blockACms.faqsSection.faqs];
                    updated[idx].a = val;
                    setBlockACms({
                      ...blockACms,
                      faqsSection: { ...blockACms.faqsSection, faqs: updated }
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUBTAB 16: CTA & CREDENTIALS                              */}
      {/* ========================================================= */}
      {activeSubTab === 'closing' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2 border-b pb-4">
            <PhoneCall className="w-5 h-5 text-[#7b002c]" />
            <span>Section 16: Sales Facilitation & Reviewer Byline Note</span>
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={blockACms.closingSiteVisitSection.whatsappNumber}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      closingSiteVisitSection: { ...blockACms.closingSiteVisitSection, whatsappNumber: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={blockACms.closingSiteVisitSection.phoneNumber}
                  onChange={(e) =>
                    setBlockACms({
                      ...blockACms,
                      closingSiteVisitSection: { ...blockACms.closingSiteVisitSection, phoneNumber: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Office Address</label>
              <input
                type="text"
                value={blockACms.closingSiteVisitSection.officeAddress}
                onChange={(e) =>
                  setBlockACms({
                    ...blockACms,
                    closingSiteVisitSection: { ...blockACms.closingSiteVisitSection, officeAddress: e.target.value }
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"
              />
            </div>

            <CmsRichTextarea
              label="Reviewer Byline / About This Page Footer"
              rows={3}
              value={blockACms.closingSiteVisitSection.reviewedByNote}
              onChange={(val) =>
                setBlockACms({
                  ...blockACms,
                  closingSiteVisitSection: { ...blockACms.closingSiteVisitSection, reviewedByNote: val }
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
