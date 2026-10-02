'use client';

import React, { useState, useRef } from 'react';
import {
  BlockBCMSData,
  initialBlockBCMS,
  saveBlockBCMS
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

const compressImageFile = (
  file: File,
  maxWidth = 1920,
  quality = 0.85
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('File exceeds 10MB limit'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helper?: string;
  placeholder?: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helper = 'PNG, JPG, WebP up to 10MB (auto compressed)',
  placeholder = '/images/faisal-hills-drone-view.webp or https://...'
}) => {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await compressImageFile(file, 1920, 0.85);
      if (dataUrl) {
        onChange(dataUrl);
      }
    } catch (err) {
      console.error('Failed to process image:', err);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-[#7b002c] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Link2 className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL Input' : 'Paste Image URL'}</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-28 h-20 bg-slate-900 rounded-xl border border-slate-200 shadow-inner shrink-0 group">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform rounded-xl"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px] gap-1">
              <Camera className="w-4 h-4" />
              <span>No image</span>
            </div>
          )}
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-red-600 text-white rounded-md transition-colors"
              title="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex-1 space-y-2 w-full">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id={`img-upload-blockb-${label.replace(/\s+/g, '-').toLowerCase()}`}
            />
            <label
              htmlFor={`img-upload-blockb-${label.replace(/\s+/g, '-').toLowerCase()}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-sm active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? 'Processing Image...' : 'Upload from Device'}</span>
            </label>
            <span className="text-[11px] text-slate-500">{helper}</span>
          </div>

          {showUrlInput && (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c] transition font-mono"
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface BlockBCmsEditorProps {
  blockBCms: BlockBCMSData;
  setBlockBCms: React.Dispatch<React.SetStateAction<BlockBCMSData>>;
  token?: string | null;
  onSaveSuccess?: (msg: string) => void;
}

export default function BlockBCmsEditor({
  blockBCms,
  setBlockBCms,
  token,
  onSaveSuccess
}: BlockBCmsEditorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('verification');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      tabsScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Quick helper to save Block B CMS
  const handleSaveBlockB = async () => {
    setIsSaving(true);
    setSaveMsg('');
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') || undefined : undefined);
    const ok = await saveBlockBCMS(blockBCms, activeToken);
    setIsSaving(false);
    const msg = ok
      ? 'Faisal Hills Block B CMS content published and updated live!'
      : 'Block B changes saved in local browser storage (API sync pending login).';
    setSaveMsg(msg);
    if (onSaveSuccess) onSaveSuccess(msg);
    setTimeout(() => setSaveMsg(''), 4500);
  };

  const handleResetBlockB = () => {
    if (window.confirm('Reset all Block B sections to official QA audited defaults?')) {
      setBlockBCms(initialBlockBCMS);
      setSaveMsg('Reset to audited defaults. Click "Save & Publish Block B" to apply.');
    }
  };

  const categories = [
    { id: 'verification', label: '1. Byline & Key Facts', icon: Award },
    { id: 'overview', label: '2. H1 & Overview Copy', icon: Sparkles },
    { id: 'location', label: '3. Location & Routes', icon: MapPin },
    { id: 'masterPlan', label: '4. Blueprint & Roads', icon: Compass },
    { id: 'plotSizes', label: '5. Sizes & 2 Kanal Check', icon: Layers },
    { id: 'pricing', label: '6. Prices & Premiums', icon: DollarSign },
    { id: 'rateCompare', label: '7. Rate/SqFt vs Block A', icon: Scale },
    { id: 'costsBeyond', label: '8. Extra Costs & Files', icon: DollarSign },
    { id: 'possession', label: '9. Sector Possession', icon: CheckCircle2 },
    { id: 'solidCutting', label: '10. Solid vs Cutting', icon: Info },
    { id: 'whoItSuits', label: '11. Buyer Suitability', icon: ShieldCheck },
    { id: 'comparisons', label: '12. Comparisons (A & Ext)', icon: Layers },
    { id: 'devStatus', label: '13. Dev Status & Amenities', icon: Building2 },
    { id: 'commercial', label: '14. Commercial & High-Rise', icon: Building2 },
    { id: 'transfer', label: '15. 7-Step Transfer Guide', icon: FileText },
    { id: 'glossary', label: '16. Listings Glossary', icon: Info },
    { id: 'faqs', label: '17. 10 Target FAQs', icon: HelpCircle },
    { id: 'closing', label: '18. Consultation & Desk', icon: PhoneCall },
  ];

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#7b002c] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#7b002c]" />
            <span>Dedicated Block B CMS System</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Faisal Hills Block B Complete Content Manager
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Manage all 18 sections, price benchmarks, comparison matrices, sector possession realities, and FAQs for <code className="text-[#7b002c] font-mono bg-slate-100 px-1 py-0.5 rounded">/blocks/block-b</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetBlockB}
            className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <a
            href="/blocks/block-b"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-xs font-bold text-[#7b002c] hover:bg-rose-50 border border-rose-200 rounded-xl transition inline-flex items-center gap-1.5"
          >
            <span>Live Block B</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleSaveBlockB}
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
                <span>Save & Publish Block B</span>
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

      {/* Category Navigation Pills with Scroll Buttons */}
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
      {/* 1. BYLINE & KEY FACTS STRIP                               */}
      {/* ========================================================= */}
      {activeCategory === 'verification' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            1. Verification Header & Key Facts Snapshot
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Badge Text</label>
              <input
                type="text"
                value={blockBCms.verificationHeader?.badgeText || ''}
                onChange={(e) => setBlockBCms({
                  ...blockBCms,
                  verificationHeader: { ...blockBCms.verificationHeader, badgeText: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Reviewer Name</label>
              <input
                type="text"
                value={blockBCms.verificationHeader?.reviewerName || ''}
                onChange={(e) => setBlockBCms({
                  ...blockBCms,
                  verificationHeader: { ...blockBCms.verificationHeader, reviewerName: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Prices Verified Date</label>
              <input
                type="text"
                value={blockBCms.verificationHeader?.pricesVerifiedDate || ''}
                onChange={(e) => setBlockBCms({
                  ...blockBCms,
                  verificationHeader: { ...blockBCms.verificationHeader, pricesVerifiedDate: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Site Checked Date</label>
              <input
                type="text"
                value={blockBCms.verificationHeader?.siteCheckedDate || ''}
                onChange={(e) => setBlockBCms({
                  ...blockBCms,
                  verificationHeader: { ...blockBCms.verificationHeader, siteCheckedDate: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h5 className="font-serif font-bold text-sm text-slate-900">Key Facts Strip Fields</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Position</label>
                <input
                  type="text"
                  value={blockBCms.overview?.quickFacts?.position || ''}
                  onChange={(e) => setBlockBCms({
                    ...blockBCms,
                    overview: {
                      ...blockBCms.overview,
                      quickFacts: { ...blockBCms.overview.quickFacts, position: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Residential Sizes</label>
                <input
                  type="text"
                  value={blockBCms.overview?.quickFacts?.residentialSizes || ''}
                  onChange={(e) => setBlockBCms({
                    ...blockBCms,
                    overview: {
                      ...blockBCms.overview,
                      quickFacts: { ...blockBCms.overview.quickFacts, residentialSizes: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">How You Buy</label>
                <input
                  type="text"
                  value={blockBCms.overview?.quickFacts?.howYouBuy || ''}
                  onChange={(e) => setBlockBCms({
                    ...blockBCms,
                    overview: {
                      ...blockBCms.overview,
                      quickFacts: { ...blockBCms.overview.quickFacts, howYouBuy: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Possession</label>
                <input
                  type="text"
                  value={blockBCms.overview?.quickFacts?.possession || ''}
                  onChange={(e) => setBlockBCms({
                    ...blockBCms,
                    overview: {
                      ...blockBCms.overview,
                      quickFacts: { ...blockBCms.overview.quickFacts, possession: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Character</label>
                <input
                  type="text"
                  value={blockBCms.overview?.quickFacts?.character || ''}
                  onChange={(e) => setBlockBCms({
                    ...blockBCms,
                    overview: {
                      ...blockBCms.overview,
                      quickFacts: { ...blockBCms.overview.quickFacts, character: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Legal Status</label>
                <input
                  type="text"
                  value={blockBCms.overview?.quickFacts?.legalStatus || ''}
                  onChange={(e) => setBlockBCms({
                    ...blockBCms,
                    overview: {
                      ...blockBCms.overview,
                      quickFacts: { ...blockBCms.overview.quickFacts, legalStatus: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. OVERVIEW & NARRATIVE COPY                              */}
      {/* ========================================================= */}
      {activeCategory === 'overview' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            2. H1 Heading & Opening Overview Narrative
          </h4>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Page Primary H1 Heading</label>
            <input
              type="text"
              value={blockBCms.overview?.h1 || ''}
              onChange={(e) => setBlockBCms({
                ...blockBCms,
                overview: { ...blockBCms.overview, h1: e.target.value }
              })}
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-serif font-bold text-slate-900"
            />
          </div>

          <CmsRichTextarea
            label="Lead Paragraph 1"
            rows={3}
            value={blockBCms.overview?.leadParagraph1 || ''}
            onChange={(val) => setBlockBCms({
              ...blockBCms,
              overview: { ...blockBCms.overview, leadParagraph1: val }
            })}
          />

          <CmsRichTextarea
            label="Lead Paragraph 2 (Inventory Attribution)"
            rows={3}
            value={blockBCms.overview?.leadParagraph2 || ''}
            onChange={(val) => setBlockBCms({
              ...blockBCms,
              overview: { ...blockBCms.overview, leadParagraph2: val }
            })}
          />

          {/* Overview Visual Card & Alt Tag */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h5 className="font-serif font-bold text-sm text-slate-900">
              Overview Featured Image & Alt Text
            </h5>

            <ImageUploadField
              label="Block B Overview Visual"
              value={blockBCms.overview?.image || '/images/faisal-hills-drone-view.webp'}
              onChange={(url) => setBlockBCms({
                ...blockBCms,
                overview: { ...blockBCms.overview, image: url }
              })}
              helper="Shown on the right side of the overview section on /blocks/block-b"
            />

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Image Alt Tag (SEO & Accessibility)</label>
              <input
                type="text"
                value={blockBCms.overview?.imageAlt || ''}
                onChange={(e) => setBlockBCms({
                  ...blockBCms,
                  overview: { ...blockBCms.overview, imageAlt: e.target.value }
                })}
                placeholder="Faisal Hills Block B Aerial Panorama and Development"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. LOCATION & CONNECTIVITY                                */}
      {/* ========================================================= */}
      {activeCategory === 'location' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            3. Where Block B Is & Connectivity Matrix
          </h4>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Section H2 Heading</label>
            <input
              type="text"
              value={blockBCms.location?.heading || ''}
              onChange={(e) => setBlockBCms({
                ...blockBCms,
                location: { ...blockBCms.location, heading: e.target.value }
              })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-bold"
            />
          </div>

          <CmsRichTextarea
            label="Lead Paragraph"
            rows={3}
            value={blockBCms.location?.leadParagraph || ''}
            onChange={(val) => setBlockBCms({
              ...blockBCms,
              location: { ...blockBCms.location, leadParagraph: val }
            })}
          />

          <CmsRichTextarea
            label="Rawalpindi Jurisdiction Clarification Note"
            rows={2}
            value={blockBCms.location?.rawalpindiNote || ''}
            onChange={(val) => setBlockBCms({
              ...blockBCms,
              location: { ...blockBCms.location, rawalpindiNote: val }
            })}
          />

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Routes from Block B (List)</label>
              <button
                type="button"
                onClick={() => setBlockBCms({
                  ...blockBCms,
                  location: {
                    ...blockBCms.location,
                    routesList: [...(blockBCms.location.routesList || []), 'New Route Link']
                  }
                })}
                className="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Route</span>
              </button>
            </div>

            {(blockBCms.location?.routesList || []).map((route, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={route}
                  onChange={(e) => {
                    const updated = [...(blockBCms.location.routesList || [])];
                    updated[idx] = e.target.value;
                    setBlockBCms({
                      ...blockBCms,
                      location: { ...blockBCms.location, routesList: updated }
                    });
                  }}
                  className="flex-1 px-3 py-1.5 border border-slate-300 rounded-xl text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = (blockBCms.location.routesList || []).filter((_, i) => i !== idx);
                    setBlockBCms({
                      ...blockBCms,
                      location: { ...blockBCms.location, routesList: updated }
                    });
                  }}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-xs font-bold text-slate-700">Google Map Iframe URL</label>
            <input
              type="text"
              value={blockBCms.location?.googleMapIframeUrl || ''}
              onChange={(e) => setBlockBCms({
                ...blockBCms,
                location: { ...blockBCms.location, googleMapIframeUrl: e.target.value }
              })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-mono"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. PLOT SIZES & 2 KANAL CHECK                             */}
      {/* ========================================================= */}
      {activeCategory === 'plotSizes' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              5. Plot Sizes in Block B Table & Size Clarifications
            </h4>
            <button
              type="button"
              onClick={() => setBlockBCms({
                ...blockBCms,
                plotSizesSection: {
                  ...blockBCms.plotSizesSection,
                  tableRows: [
                    ...blockBCms.plotSizesSection.tableRows,
                    { dimensions: '25 × 50', areaSqFt: '1,250', areaSqYds: '139', soldAs: '5 Marla' }
                  ]
                }
              })}
              className="px-3 py-1.5 bg-[#7b002c] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Size Row</span>
            </button>
          </div>

          <div className="space-y-3">
            {(blockBCms.plotSizesSection?.tableRows || []).map((row, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Dimensions</label>
                  <input
                    type="text"
                    value={row.dimensions}
                    onChange={(e) => {
                      const updated = [...blockBCms.plotSizesSection.tableRows];
                      updated[idx].dimensions = e.target.value;
                      setBlockBCms({
                        ...blockBCms,
                        plotSizesSection: { ...blockBCms.plotSizesSection, tableRows: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Area (Sq Ft)</label>
                  <input
                    type="text"
                    value={row.areaSqFt}
                    onChange={(e) => {
                      const updated = [...blockBCms.plotSizesSection.tableRows];
                      updated[idx].areaSqFt = e.target.value;
                      setBlockBCms({
                        ...blockBCms,
                        plotSizesSection: { ...blockBCms.plotSizesSection, tableRows: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Area (Sq Yds)</label>
                  <input
                    type="text"
                    value={row.areaSqYds}
                    onChange={(e) => {
                      const updated = [...blockBCms.plotSizesSection.tableRows];
                      updated[idx].areaSqYds = e.target.value;
                      setBlockBCms({
                        ...blockBCms,
                        plotSizesSection: { ...blockBCms.plotSizesSection, tableRows: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Sold As</label>
                    <input
                      type="text"
                      value={row.soldAs}
                      onChange={(e) => {
                        const updated = [...blockBCms.plotSizesSection.tableRows];
                        updated[idx].soldAs = e.target.value;
                        setBlockBCms({
                          ...blockBCms,
                          plotSizesSection: { ...blockBCms.plotSizesSection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-[#7b002c]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockBCms.plotSizesSection.tableRows.filter((_, i) => i !== idx);
                      setBlockBCms({
                        ...blockBCms,
                        plotSizesSection: { ...blockBCms.plotSizesSection, tableRows: updated }
                      });
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg mt-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <CmsRichTextarea
              label="2 Kanal Availability Callout Text"
              rows={2}
              value={blockBCms.plotSizesSection?.twoKanalText || ''}
              onChange={(val) => setBlockBCms({
                ...blockBCms,
                plotSizesSection: { ...blockBCms.plotSizesSection, twoKanalText: val }
              })}
            />

            <CmsRichTextarea
              label="Sizes in Listings (225 vs 250 sqft) Note"
              rows={2}
              value={blockBCms.plotSizesSection?.nonStandardText || ''}
              onChange={(val) => setBlockBCms({
                ...blockBCms,
                plotSizesSection: { ...blockBCms.plotSizesSection, nonStandardText: val }
              })}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. PRICING AND CURRENT RATES                              */}
      {/* ========================================================= */}
      {activeCategory === 'pricing' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              6. Block B Plot Prices and Current Rates Table
            </h4>
            <button
              type="button"
              onClick={() => setBlockBCms({
                ...blockBCms,
                pricingAndRates: {
                  ...blockBCms.pricingAndRates,
                  tableRows: [
                    ...blockBCms.pricingAndRates.tableRows,
                    { plotSize: '5 Marla', publishedBand: 'PKR 40 to 65 lakh', recentAskingPrices: 'PKR 43 to 75 lakh' }
                  ]
                }
              })}
              className="px-3 py-1.5 bg-[#7b002c] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Price Row</span>
            </button>
          </div>

          <div className="space-y-3">
            {(blockBCms.pricingAndRates?.tableRows || []).map((row, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Plot Size</label>
                  <input
                    type="text"
                    value={row.plotSize}
                    onChange={(e) => {
                      const updated = [...blockBCms.pricingAndRates.tableRows];
                      updated[idx].plotSize = e.target.value;
                      setBlockBCms({
                        ...blockBCms,
                        pricingAndRates: { ...blockBCms.pricingAndRates, tableRows: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Published Band</label>
                  <input
                    type="text"
                    value={row.publishedBand}
                    onChange={(e) => {
                      const updated = [...blockBCms.pricingAndRates.tableRows];
                      updated[idx].publishedBand = e.target.value;
                      setBlockBCms({
                        ...blockBCms,
                        pricingAndRates: { ...blockBCms.pricingAndRates, tableRows: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Recent Asking Prices</label>
                    <input
                      type="text"
                      value={row.recentAskingPrices}
                      onChange={(e) => {
                        const updated = [...blockBCms.pricingAndRates.tableRows];
                        updated[idx].recentAskingPrices = e.target.value;
                        setBlockBCms({
                          ...blockBCms,
                          pricingAndRates: { ...blockBCms.pricingAndRates, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-[#7b002c]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockBCms.pricingAndRates.tableRows.filter((_, i) => i !== idx);
                      setBlockBCms({
                        ...blockBCms,
                        pricingAndRates: { ...blockBCms.pricingAndRates, tableRows: updated }
                      });
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg mt-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100">
            <CmsRichTextarea
              label="Circulating Low-Price Warning"
              rows={2}
              value={blockBCms.pricingAndRates?.lowPriceWarning || ''}
              onChange={(val) => setBlockBCms({
                ...blockBCms,
                pricingAndRates: { ...blockBCms.pricingAndRates, lowPriceWarning: val }
              })}
            />

            <CmsRichTextarea
              label="What Position Adds to the Price (Premiums)"
              rows={3}
              value={blockBCms.pricingAndRates?.positionPremiumsText || ''}
              onChange={(val) => setBlockBCms({
                ...blockBCms,
                pricingAndRates: { ...blockBCms.pricingAndRates, positionPremiumsText: val }
              })}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. RATE COMPARISON: BLOCK B VS BLOCK A                    */}
      {/* ========================================================= */}
      {activeCategory === 'rateCompare' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              7. Rate Per Square Foot: Block B vs Block A Table
            </h4>
            <button
              type="button"
              onClick={() => setBlockBCms({
                ...blockBCms,
                rateComparisonSection: {
                  ...blockBCms.rateComparisonSection,
                  tableRows: [
                    ...blockBCms.rateComparisonSection.tableRows,
                    { plotSize: '5 Marla', blockBRatePerSqFt: 'PKR 3,440 to 6,000', blockARatePerSqFt: 'PKR 4,400 to 7,600' }
                  ]
                }
              })}
              className="px-3 py-1.5 bg-[#7b002c] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Rate Row</span>
            </button>
          </div>

          <div className="space-y-3">
            {(blockBCms.rateComparisonSection?.tableRows || []).map((row, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Plot Size</label>
                  <input
                    type="text"
                    value={row.plotSize}
                    onChange={(e) => {
                      const updated = [...blockBCms.rateComparisonSection.tableRows];
                      updated[idx].plotSize = e.target.value;
                      setBlockBCms({
                        ...blockBCms,
                        rateComparisonSection: { ...blockBCms.rateComparisonSection, tableRows: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Block B Rate/SqFt</label>
                  <input
                    type="text"
                    value={row.blockBRatePerSqFt}
                    onChange={(e) => {
                      const updated = [...blockBCms.rateComparisonSection.tableRows];
                      updated[idx].blockBRatePerSqFt = e.target.value;
                      setBlockBCms({
                        ...blockBCms,
                        rateComparisonSection: { ...blockBCms.rateComparisonSection, tableRows: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-[#7b002c]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Block A Rate/SqFt</label>
                    <input
                      type="text"
                      value={row.blockARatePerSqFt}
                      onChange={(e) => {
                        const updated = [...blockBCms.rateComparisonSection.tableRows];
                        updated[idx].blockARatePerSqFt = e.target.value;
                        setBlockBCms({
                          ...blockBCms,
                          rateComparisonSection: { ...blockBCms.rateComparisonSection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockBCms.rateComparisonSection.tableRows.filter((_, i) => i !== idx);
                      setBlockBCms({
                        ...blockBCms,
                        rateComparisonSection: { ...blockBCms.rateComparisonSection, tableRows: updated }
                      });
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg mt-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <CmsRichTextarea
            label="Lead Analysis Narrative (Third Less than Block A)"
            rows={3}
            value={blockBCms.rateComparisonSection?.leadAnalysis || ''}
            onChange={(val) => setBlockBCms({
              ...blockBCms,
              rateComparisonSection: { ...blockBCms.rateComparisonSection, leadAnalysis: val }
            })}
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. COMPARISONS: BLOCK A & B EXTENSION                     */}
      {/* ========================================================= */}
      {activeCategory === 'comparisons' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              12. Block B vs Block A Side-by-Side Table
            </h4>
            <button
              type="button"
              onClick={() => setBlockBCms({
                ...blockBCms,
                comparisonBlockASection: {
                  ...blockBCms.comparisonBlockASection,
                  tableRows: [
                    ...blockBCms.comparisonBlockASection.tableRows,
                    { aspect: 'New Feature', blockB: 'Block B Spec', blockA: 'Block A Spec' }
                  ]
                }
              })}
              className="px-3 py-1.5 bg-[#7b002c] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Comparison Row</span>
            </button>
          </div>

          <div className="space-y-3">
            {(blockBCms.comparisonBlockASection?.tableRows || []).map((row, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Aspect</label>
                  <input
                    type="text"
                    value={row.aspect}
                    onChange={(e) => {
                      const updated = [...blockBCms.comparisonBlockASection.tableRows];
                      updated[idx].aspect = e.target.value;
                      setBlockBCms({
                        ...blockBCms,
                        comparisonBlockASection: { ...blockBCms.comparisonBlockASection, tableRows: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Block B</label>
                  <input
                    type="text"
                    value={row.blockB}
                    onChange={(e) => {
                      const updated = [...blockBCms.comparisonBlockASection.tableRows];
                      updated[idx].blockB = e.target.value;
                      setBlockBCms({
                        ...blockBCms,
                        comparisonBlockASection: { ...blockBCms.comparisonBlockASection, tableRows: updated }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Block A</label>
                    <input
                      type="text"
                      value={row.blockA}
                      onChange={(e) => {
                        const updated = [...blockBCms.comparisonBlockASection.tableRows];
                        updated[idx].blockA = e.target.value;
                        setBlockBCms({
                          ...blockBCms,
                          comparisonBlockASection: { ...blockBCms.comparisonBlockASection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockBCms.comparisonBlockASection.tableRows.filter((_, i) => i !== idx);
                      setBlockBCms({
                        ...blockBCms,
                        comparisonBlockASection: { ...blockBCms.comparisonBlockASection, tableRows: updated }
                      });
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg mt-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Block B vs Block B Extension */}
          <div className="pt-5 border-t border-slate-100 space-y-4">
            <h5 className="font-serif font-bold text-base text-slate-900">
              Block B vs Block B Extension Narrative & Differences
            </h5>
            <CmsRichTextarea
              label="Intro Explanation"
              rows={3}
              value={blockBCms.comparisonExtensionSection?.intro || ''}
              onChange={(val) => setBlockBCms({
                ...blockBCms,
                comparisonExtensionSection: { ...blockBCms.comparisonExtensionSection, intro: val }
              })}
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. 10 TARGET FAQS MANAGER                                 */}
      {/* ========================================================= */}
      {activeCategory === 'faqs' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                17. QA-Approved Block B Target FAQs Manager
              </h4>
              <p className="text-xs text-slate-500">
                {(blockBCms.faqsSection?.faqs || []).length} questions covering 2 Kanal doubts, sector possession, rate comparisons, and cutting plots.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBlockBCms({
                ...blockBCms,
                faqsSection: {
                  ...blockBCms.faqsSection,
                  faqs: [
                    ...blockBCms.faqsSection.faqs,
                    { q: 'New Block B Question?', a: 'Detailed clear verified answer.' }
                  ]
                }
              })}
              className="px-3.5 py-2 bg-[#7b002c] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            {(blockBCms.faqsSection?.faqs || []).map((faq, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#7b002c] uppercase tracking-wider font-mono">
                    FAQ #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockBCms.faqsSection.faqs.filter((_, i) => i !== idx);
                      setBlockBCms({
                        ...blockBCms,
                        faqsSection: { ...blockBCms.faqsSection, faqs: updated }
                      });
                    }}
                    className="p-1 text-rose-600 hover:bg-rose-100 rounded-lg"
                    title="Remove Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Question</label>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => {
                      const updated = [...blockBCms.faqsSection.faqs];
                      updated[idx].q = e.target.value;
                      setBlockBCms({
                        ...blockBCms,
                        faqsSection: { ...blockBCms.faqsSection, faqs: updated }
                      });
                    }}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>

                <CmsRichTextarea
                  label="Answer"
                  rows={3}
                  value={faq.a}
                  onChange={(val) => {
                    const updated = [...blockBCms.faqsSection.faqs];
                    updated[idx].a = val;
                    setBlockBCms({
                      ...blockBCms,
                      faqsSection: { ...blockBCms.faqsSection, faqs: updated }
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. CLOSING DESK & EDITORIAL BYLINE                        */}
      {/* ========================================================= */}
      {activeCategory === 'closing' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            18. Consultation Desk, WhatsApp & Editorial Byline Footer
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">WhatsApp Number</label>
              <input
                type="text"
                value={blockBCms.closingSiteVisitSection?.whatsappNumber || ''}
                onChange={(e) => setBlockBCms({
                  ...blockBCms,
                  closingSiteVisitSection: { ...blockBCms.closingSiteVisitSection, whatsappNumber: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Direct Phone</label>
              <input
                type="text"
                value={blockBCms.closingSiteVisitSection?.phoneNumber || ''}
                onChange={(e) => setBlockBCms({
                  ...blockBCms,
                  closingSiteVisitSection: { ...blockBCms.closingSiteVisitSection, phoneNumber: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Office Location</label>
              <input
                type="text"
                value={blockBCms.closingSiteVisitSection?.officeAddress || ''}
                onChange={(e) => setBlockBCms({
                  ...blockBCms,
                  closingSiteVisitSection: { ...blockBCms.closingSiteVisitSection, officeAddress: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <CmsRichTextarea
            label="Editorial Byline & Review Disclaimer Footer"
            rows={3}
            value={blockBCms.closingSiteVisitSection?.reviewedByNote || ''}
            onChange={(val) => setBlockBCms({
              ...blockBCms,
              closingSiteVisitSection: { ...blockBCms.closingSiteVisitSection, reviewedByNote: val }
            })}
          />
        </div>
      )}

      {/* Bottom Save & Publish Button */}
      <div className="p-4 bg-slate-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        <div className="text-xs text-slate-300">
          Ready to apply changes to <strong className="text-white">Faisal Hills Block B</strong>? Click to publish across all visitors immediately.
        </div>
        <button
          type="button"
          onClick={handleSaveBlockB}
          disabled={isSaving}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 text-white animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-white" />
              <span>Save & Publish Block B</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
