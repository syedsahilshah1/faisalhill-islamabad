'use client';

import React, { useState, useRef } from 'react';
import {
  MasterPlanCMSData,
  initialMasterPlanCMS,
  saveMasterPlanCMS,
  MasterPlanCuttingRow,
  MasterPlanBoulevardRow
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
  Download,
  Trees,
  Landmark,
  Activity,
  ShoppingBag,
  GraduationCap
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

interface MasterPlanCmsEditorProps {
  masterPlanCms: MasterPlanCMSData;
  setMasterPlanCms: React.Dispatch<React.SetStateAction<MasterPlanCMSData>>;
  token?: string | null;
  onSaveSuccess?: (msg: string) => void;
}

export default function MasterPlanCmsEditor({
  masterPlanCms,
  setMasterPlanCms,
  token,
  onSaveSuccess
}: MasterPlanCmsEditorProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    | 'header'
    | 'viewer'
    | 'dimensions'
    | 'boulevards'
    | 'landmarks'
    | 'advisory'
    | 'faqs'
  >('header');

  const [isSaving, setIsSaving] = useState(false);
  const [saveBanner, setSaveBanner] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const ok = await saveMasterPlanCMS(masterPlanCms, token || undefined);
    setIsSaving(false);
    if (ok) {
      setSaveBanner(true);
      if (onSaveSuccess) onSaveSuccess('Master Plan CMS published live successfully!');
      setTimeout(() => setSaveBanner(false), 3500);
    }
  };

  const handleReset = () => {
    if (confirm('Reset Master Plan CMS to verified official defaults?')) {
      setMasterPlanCms(initialMasterPlanCMS);
    }
  };

  const subTabs = [
    { id: 'header', label: '1. Header & Download', icon: Download },
    { id: 'viewer', label: '2. Deep Zoom Map Graphics', icon: Compass },
    { id: 'dimensions', label: '3. Plot Cuttings Matrix', icon: Layers },
    { id: 'boulevards', label: '4. Boulevard Dimensions', icon: MapPin },
    { id: 'landmarks', label: '5. Master Landmarks', icon: Landmark },
    { id: 'advisory', label: '6. Verification & Advisory', icon: ShieldCheck },
    { id: 'faqs', label: '7. FAQs', icon: HelpCircle },
  ] as const;

  const ImageUploadField = createImageUploadField(token);

  return (
    <div className="space-y-6">
      {/* Top Action Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Master Plan Page CMS Editor
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
              7 Full Sections
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage high-res master map downloads, interactive deep zoom image sources, cutting sizes, and road networks.
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
            href="/master-plan"
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
            <span>{isSaving ? 'Saving...' : 'Save Master Plan'}</span>
          </button>
        </div>
      </div>

      {saveBanner && (
        <div className="p-4 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Master Plan content and map files successfully published to live website!</span>
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
      {/* 1. HEADER & DOWNLOAD                                      */}
      {/* ========================================================= */}
      {activeSubTab === 'header' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">1. Header Title & PDF Download</h4>
            <p className="text-xs text-slate-500">Edit top headline, description, and high-res PDF map download URL.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Tagline Label"
              value={masterPlanCms.header.tag}
              onChange={(val) => setMasterPlanCms({ ...masterPlanCms, header: { ...masterPlanCms.header, tag: val } })}
            />
            <CmsRichInput
              label="Page Main H1 Title"
              value={masterPlanCms.header.h1}
              onChange={(val) => setMasterPlanCms({ ...masterPlanCms, header: { ...masterPlanCms.header, h1: val } })}
            />
            <CmsRichTextarea
              label="Lead Description Paragraph"
              rows={3}
              value={masterPlanCms.header.leadParagraph}
              onChange={(val) => setMasterPlanCms({ ...masterPlanCms, header: { ...masterPlanCms.header, leadParagraph: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <CmsRichInput
                label="PDF Download URL"
                value={masterPlanCms.header.pdfDownloadUrl}
                onChange={(val) => setMasterPlanCms({ ...masterPlanCms, header: { ...masterPlanCms.header, pdfDownloadUrl: val } })}
              />
              <CmsRichInput
                label="Download Button Label"
                value={masterPlanCms.header.downloadButtonText}
                onChange={(val) => setMasterPlanCms({ ...masterPlanCms, header: { ...masterPlanCms.header, downloadButtonText: val } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. DEEP ZOOM MAP GRAPHICS                                 */}
      {/* ========================================================= */}
      {activeSubTab === 'viewer' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">2. Interactive Deep Zoom Map Graphics</h4>
            <p className="text-xs text-slate-500">Upload the high-resolution master plan image used in the 1200% interactive viewer.</p>
          </div>

          <div className="space-y-4">
            <ImageUploadField
              label="Master Plan High-Res Map Image"
              value={masterPlanCms.viewer.mapImageUrl}
              onChange={(val) => setMasterPlanCms({ ...masterPlanCms, viewer: { ...masterPlanCms.viewer, mapImageUrl: val } })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <CmsRichInput
                label="Viewer Desktop Height (e.g. 750px)"
                value={masterPlanCms.viewer.viewerHeightDesktop}
                onChange={(val) => setMasterPlanCms({ ...masterPlanCms, viewer: { ...masterPlanCms.viewer, viewerHeightDesktop: val } })}
              />
              <CmsRichInput
                label="Viewer Caption Note"
                value={masterPlanCms.viewer.caption}
                onChange={(val) => setMasterPlanCms({ ...masterPlanCms, viewer: { ...masterPlanCms.viewer, caption: val } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. PLOT CUTTINGS MATRIX                                   */}
      {/* ========================================================= */}
      {activeSubTab === 'dimensions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">3. Standard Plot Cuttings & Dimensions Table</h4>
              <p className="text-xs text-slate-500">Edit dimensions, square yards, and availability status across sectors.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setMasterPlanCms({
                  ...masterPlanCms,
                  sectorDimensionsTable: {
                    ...masterPlanCms.sectorDimensionsTable,
                    rows: [
                      ...masterPlanCms.sectorDimensionsTable.rows,
                      {
                        category: 'New Cutting Size',
                        dimensions: '25 × 50 ft',
                        area: '138.89 sq. yd (1,250 sq. ft)',
                        availability: 'Available'
                      }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Cutting Row</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Table Section Heading"
              value={masterPlanCms.sectorDimensionsTable.heading}
              onChange={(val) =>
                setMasterPlanCms({
                  ...masterPlanCms,
                  sectorDimensionsTable: { ...masterPlanCms.sectorDimensionsTable, heading: val }
                })
              }
            />

            <div className="space-y-2.5">
              {masterPlanCms.sectorDimensionsTable.rows.map((row, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Plot Category"
                    value={row.category}
                    onChange={(e) => {
                      const updated = [...masterPlanCms.sectorDimensionsTable.rows];
                      updated[idx].category = e.target.value;
                      setMasterPlanCms({
                        ...masterPlanCms,
                        sectorDimensionsTable: { ...masterPlanCms.sectorDimensionsTable, rows: updated }
                      });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-[#7b002c]"
                  />
                  <input
                    type="text"
                    placeholder="Dimensions"
                    value={row.dimensions}
                    onChange={(e) => {
                      const updated = [...masterPlanCms.sectorDimensionsTable.rows];
                      updated[idx].dimensions = e.target.value;
                      setMasterPlanCms({
                        ...masterPlanCms,
                        sectorDimensionsTable: { ...masterPlanCms.sectorDimensionsTable, rows: updated }
                      });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Area (Sq. Yd / Sq. Ft)"
                    value={row.area}
                    onChange={(e) => {
                      const updated = [...masterPlanCms.sectorDimensionsTable.rows];
                      updated[idx].area = e.target.value;
                      setMasterPlanCms({
                        ...masterPlanCms,
                        sectorDimensionsTable: { ...masterPlanCms.sectorDimensionsTable, rows: updated }
                      });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Availability Details"
                      value={row.availability}
                      onChange={(e) => {
                        const updated = [...masterPlanCms.sectorDimensionsTable.rows];
                        updated[idx].availability = e.target.value;
                        setMasterPlanCms({
                          ...masterPlanCms,
                          sectorDimensionsTable: { ...masterPlanCms.sectorDimensionsTable, rows: updated }
                        });
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-white border rounded text-xs text-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = masterPlanCms.sectorDimensionsTable.rows.filter((_, i) => i !== idx);
                        setMasterPlanCms({
                          ...masterPlanCms,
                          sectorDimensionsTable: { ...masterPlanCms.sectorDimensionsTable, rows: updated }
                        });
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <CmsRichTextarea
              label="Dimensions Footnote Note"
              rows={2}
              value={masterPlanCms.sectorDimensionsTable.footnote}
              onChange={(val) =>
                setMasterPlanCms({
                  ...masterPlanCms,
                  sectorDimensionsTable: { ...masterPlanCms.sectorDimensionsTable, footnote: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. BOULEVARDS & ROAD SPECS                                */}
      {/* ========================================================= */}
      {activeSubTab === 'boulevards' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">4. Grand Boulevards & Road Network Specs</h4>
              <p className="text-xs text-slate-500">Edit 225ft main boulevard, 150ft expressways, and internal street widths.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setMasterPlanCms({
                  ...masterPlanCms,
                  boulevardsSection: {
                    ...masterPlanCms.boulevardsSection,
                    rows: [
                      ...masterPlanCms.boulevardsSection.rows,
                      { name: 'New Avenue', width: '80 Feet', purpose: 'Avenue Corridor', connectivity: 'Inter-sector' }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Road Spec</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Boulevards Heading"
              value={masterPlanCms.boulevardsSection.heading}
              onChange={(val) =>
                setMasterPlanCms({
                  ...masterPlanCms,
                  boulevardsSection: { ...masterPlanCms.boulevardsSection, heading: val }
                })
              }
            />
            <CmsRichTextarea
              label="Lead Paragraph"
              rows={2}
              value={masterPlanCms.boulevardsSection.leadParagraph}
              onChange={(val) =>
                setMasterPlanCms({
                  ...masterPlanCms,
                  boulevardsSection: { ...masterPlanCms.boulevardsSection, leadParagraph: val }
                })
              }
            />

            <div className="space-y-2.5">
              {masterPlanCms.boulevardsSection.rows.map((row, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Road Name"
                    value={row.name}
                    onChange={(e) => {
                      const updated = [...masterPlanCms.boulevardsSection.rows];
                      updated[idx].name = e.target.value;
                      setMasterPlanCms({
                        ...masterPlanCms,
                        boulevardsSection: { ...masterPlanCms.boulevardsSection, rows: updated }
                      });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-bold text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Width (e.g. 225 Feet)"
                    value={row.width}
                    onChange={(e) => {
                      const updated = [...masterPlanCms.boulevardsSection.rows];
                      updated[idx].width = e.target.value;
                      setMasterPlanCms({
                        ...masterPlanCms,
                        boulevardsSection: { ...masterPlanCms.boulevardsSection, rows: updated }
                      });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-mono font-bold text-[#7b002c]"
                  />
                  <input
                    type="text"
                    placeholder="Purpose"
                    value={row.purpose}
                    onChange={(e) => {
                      const updated = [...masterPlanCms.boulevardsSection.rows];
                      updated[idx].purpose = e.target.value;
                      setMasterPlanCms({
                        ...masterPlanCms,
                        boulevardsSection: { ...masterPlanCms.boulevardsSection, rows: updated }
                      });
                    }}
                    className="px-2.5 py-1.5 bg-white border rounded text-xs font-semibold text-amber-900"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Connectivity Link"
                      value={row.connectivity}
                      onChange={(e) => {
                        const updated = [...masterPlanCms.boulevardsSection.rows];
                        updated[idx].connectivity = e.target.value;
                        setMasterPlanCms({
                          ...masterPlanCms,
                          boulevardsSection: { ...masterPlanCms.boulevardsSection, rows: updated }
                        });
                      }}
                      className="flex-1 px-2.5 py-1.5 bg-white border rounded text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = masterPlanCms.boulevardsSection.rows.filter((_, i) => i !== idx);
                        setMasterPlanCms({
                          ...masterPlanCms,
                          boulevardsSection: { ...masterPlanCms.boulevardsSection, rows: updated }
                        });
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
      {/* 5. SOCIETY LANDMARKS ON MAP                               */}
      {/* ========================================================= */}
      {activeSubTab === 'landmarks' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">5. Prominent Society Landmarks</h4>
              <p className="text-xs text-slate-500">Edit key destinations demarcated on the master map.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setMasterPlanCms({
                  ...masterPlanCms,
                  landmarksAndAvenues: {
                    ...masterPlanCms.landmarksAndAvenues,
                    landmarks: [
                      ...masterPlanCms.landmarksAndAvenues.landmarks,
                      { name: 'New Landmark', block: 'Sector', description: 'Landmark details.', iconType: 'Landmark' }
                    ]
                  }
                });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Landmark</span>
            </button>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Landmarks Heading"
              value={masterPlanCms.landmarksAndAvenues.heading}
              onChange={(val) =>
                setMasterPlanCms({
                  ...masterPlanCms,
                  landmarksAndAvenues: { ...masterPlanCms.landmarksAndAvenues, heading: val }
                })
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {masterPlanCms.landmarksAndAvenues.landmarks.map((lm, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Block / Sector"
                      value={lm.block}
                      onChange={(e) => {
                        const updated = [...masterPlanCms.landmarksAndAvenues.landmarks];
                        updated[idx].block = e.target.value;
                        setMasterPlanCms({
                          ...masterPlanCms,
                          landmarksAndAvenues: { ...masterPlanCms.landmarksAndAvenues, landmarks: updated }
                        });
                      }}
                      className="px-2 py-0.5 bg-white border rounded text-[10px] font-bold text-[#7b002c]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = masterPlanCms.landmarksAndAvenues.landmarks.filter((_, i) => i !== idx);
                        setMasterPlanCms({
                          ...masterPlanCms,
                          landmarksAndAvenues: { ...masterPlanCms.landmarksAndAvenues, landmarks: updated }
                        });
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Landmark Name"
                    value={lm.name}
                    onChange={(e) => {
                      const updated = [...masterPlanCms.landmarksAndAvenues.landmarks];
                      updated[idx].name = e.target.value;
                      setMasterPlanCms({
                        ...masterPlanCms,
                        landmarksAndAvenues: { ...masterPlanCms.landmarksAndAvenues, landmarks: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border rounded text-xs font-bold"
                  />

                  <CmsRichTextarea
                    label="Description"
                    rows={2}
                    value={lm.description}
                    onChange={(val) => {
                      const updated = [...masterPlanCms.landmarksAndAvenues.landmarks];
                      updated[idx].description = val;
                      setMasterPlanCms({
                        ...masterPlanCms,
                        landmarksAndAvenues: { ...masterPlanCms.landmarksAndAvenues, landmarks: updated }
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
      {/* 6. VERIFICATION & ADVISORY                                */}
      {/* ========================================================= */}
      {activeSubTab === 'advisory' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">6. Verification & Legal Advisory Footnote</h4>
            <p className="text-xs text-slate-500">Edit RDA approval notice, on-site survey credentials, and legal disclaimer.</p>
          </div>

          <div className="space-y-4">
            <CmsRichInput
              label="Advisory Tag"
              value={masterPlanCms.advisoryFootnote.verificationTag}
              onChange={(val) =>
                setMasterPlanCms({
                  ...masterPlanCms,
                  advisoryFootnote: { ...masterPlanCms.advisoryFootnote, verificationTag: val }
                })
              }
            />
            <CmsRichTextarea
              label="Verification Text"
              rows={2}
              value={masterPlanCms.advisoryFootnote.verificationText}
              onChange={(val) =>
                setMasterPlanCms({
                  ...masterPlanCms,
                  advisoryFootnote: { ...masterPlanCms.advisoryFootnote, verificationText: val }
                })
              }
            />
            <CmsRichInput
              label="RDA NOC Status Text"
              value={masterPlanCms.advisoryFootnote.nocStatusText}
              onChange={(val) =>
                setMasterPlanCms({
                  ...masterPlanCms,
                  advisoryFootnote: { ...masterPlanCms.advisoryFootnote, nocStatusText: val }
                })
              }
            />
            <CmsRichTextarea
              label="Planning Disclaimer"
              rows={2}
              value={masterPlanCms.advisoryFootnote.disclaimerText}
              onChange={(val) =>
                setMasterPlanCms({
                  ...masterPlanCms,
                  advisoryFootnote: { ...masterPlanCms.advisoryFootnote, disclaimerText: val }
                })
              }
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. FAQS                                                   */}
      {/* ========================================================= */}
      {activeSubTab === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">7. Frequently Asked Questions (FAQs)</h4>
              <p className="text-xs text-slate-500">Edit and add Master Plan questions.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setMasterPlanCms({
                  ...masterPlanCms,
                  faqs: {
                    ...masterPlanCms.faqs,
                    items: [
                      ...masterPlanCms.faqs.items,
                      { q: 'New Master Plan Question?', a: 'Detailed answer here.' }
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
              value={masterPlanCms.faqs.heading}
              onChange={(val) => setMasterPlanCms({ ...masterPlanCms, faqs: { ...masterPlanCms.faqs, heading: val } })}
            />

            <div className="space-y-3">
              {masterPlanCms.faqs.items.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7b002c]">Question #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = masterPlanCms.faqs.items.filter((_, i) => i !== idx);
                        setMasterPlanCms({ ...masterPlanCms, faqs: { ...masterPlanCms.faqs, items: updated } });
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
                      const updated = [...masterPlanCms.faqs.items];
                      updated[idx].q = e.target.value;
                      setMasterPlanCms({ ...masterPlanCms, faqs: { ...masterPlanCms.faqs, items: updated } });
                    }}
                    className="w-full px-3 py-1.5 bg-white border rounded text-xs font-bold"
                  />

                  <CmsRichTextarea
                    label="Answer"
                    rows={2}
                    value={faq.a}
                    onChange={(val) => {
                      const updated = [...masterPlanCms.faqs.items];
                      updated[idx].a = val;
                      setMasterPlanCms({ ...masterPlanCms, faqs: { ...masterPlanCms.faqs, items: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
