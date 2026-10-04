'use client';

import React, { useState, useRef } from 'react';
import {
  NocStatusCMSData,
  initialNocStatusCMS,
  saveNocStatusCMS,
  NocBlockStatusItem
} from '@/data/faisalHillsData';
import {
  Save,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  BadgeCheck,
  ExternalLink,
  Plus,
  Trash2,
  HelpCircle,
  PhoneCall,
  Camera,
  Upload,
  X,
  RefreshCw
} from 'lucide-react';
import { ImageUploader, type ImageUploaderProps } from './ImageUploader';

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

interface NocStatusCmsEditorProps {
  nocCms: NocStatusCMSData;
  setNocCms: React.Dispatch<React.SetStateAction<NocStatusCMSData>>;
  token?: string | null;
  onSaveSuccess?: (msg: string) => void;
}

export default function NocStatusCmsEditor({
  nocCms,
  setNocCms,
  token,
  onSaveSuccess
}: NocStatusCmsEditorProps) {
  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'summary' | 'blocks' | 'advisory' | 'form' | 'faqs' | 'seo'>('hero');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    const success = await saveNocStatusCMS(nocCms, token || undefined);
    setSaving(false);
    if (success) {
      setSaveMessage('NOC Status CMS changes saved and published successfully!');
      if (onSaveSuccess) onSaveSuccess('NOC Status CMS changes saved and published successfully!');
      setTimeout(() => setSaveMessage(''), 4000);
    } else {
      setSaveMessage('Saved locally (offline mode).');
      if (onSaveSuccess) onSaveSuccess('Saved locally (offline mode).');
      setTimeout(() => setSaveMessage(''), 4000);
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset NOC CMS data to official defaults?')) {
      setNocCms(initialNocStatusCMS);
      setSaveMessage('Reset to initial defaults. Click Save & Publish to apply.');
      setTimeout(() => setSaveMessage(''), 4000);
    }
  };

  const handleAddBlockRow = () => {
    const newRow: NocBlockStatusItem = {
      id: `noc-${Date.now()}`,
      blockName: 'New Block / Sector',
      status: '100% Approved',
      description: 'Fully approved boundary and cleared master plan layout.',
      approved: true
    };
    setNocCms({
      ...nocCms,
      blocksNocList: [...nocCms.blocksNocList, newRow]
    });
  };

  const handleUpdateBlockRow = (idx: number, field: keyof NocBlockStatusItem, val: any) => {
    const updated = [...nocCms.blocksNocList];
    updated[idx] = { ...updated[idx], [field]: val };
    setNocCms({ ...nocCms, blocksNocList: updated });
  };

  const handleRemoveBlockRow = (idx: number) => {
    const updated = nocCms.blocksNocList.filter((_, i) => i !== idx);
    setNocCms({ ...nocCms, blocksNocList: updated });
  };

  const handleAddFaq = () => {
    setNocCms({
      ...nocCms,
      faqs: [...nocCms.faqs, { q: 'New NOC Question?', a: 'Detailed regulatory answer goes here.' }]
    });
  };

  const handleUpdateFaq = (idx: number, field: 'q' | 'a', val: string) => {
    const updated = [...nocCms.faqs];
    updated[idx] = { ...updated[idx], [field]: val };
    setNocCms({ ...nocCms, faqs: updated });
  };

  const handleRemoveFaq = (idx: number) => {
    const updated = nocCms.faqs.filter((_, i) => i !== idx);
    setNocCms({ ...nocCms, faqs: updated });
  };

  const tabs = [
    { id: 'hero' as const, label: '🌟 Hero Header', icon: Sparkles },
    { id: 'summary' as const, label: '📜 RDA & LOP Summary', icon: BadgeCheck },
    { id: 'blocks' as const, label: '🏛️ Sector Allotments', icon: ShieldCheck },
    { id: 'advisory' as const, label: '⚠️ Buyer Advisory', icon: AlertCircle },
    { id: 'form' as const, label: '📋 Verification Hotline', icon: PhoneCall },
    { id: 'faqs' as const, label: '❓ Legal FAQs', icon: HelpCircle },
    { id: 'seo' as const, label: '🌐 Meta & SEO', icon: FileText }
  ];

  const ImageUploadField = createImageUploadField(token);

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
              Legal &amp; Regulatory CMS
            </span>
            <span className="text-xs text-slate-500 font-semibold">• Live Public Sync</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            Faisal Hills NOC Status &amp; RDA Approvals CMS
          </h2>
          <p className="text-xs text-slate-500">
            Edit official LOP letters, regulatory approval texts, block-wise NOC clearances, and plot verification hotline for <code className="text-[#7b002c] font-mono bg-slate-100 px-1 py-0.5 rounded">/faisal-hills-noc-status</code>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <a
            href="/faisal-hills-noc-status/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-rose-50 text-[#7b002c] hover:bg-rose-100 border border-rose-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <span>View Public NOC Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save & Publish NOC'}</span>
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Sub-tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                isActive
                  ? 'bg-[#7b002c] text-white border-[#7b002c] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: HERO HEADER */}
      {activeSubTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">Hero Section &amp; Background</h3>
            <p className="text-xs text-slate-500">Edit the top badge, main heading, and intro description.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Badge / Tagline
              </label>
              <input
                type="text"
                value={nocCms.hero.tag}
                onChange={(e) => setNocCms({ ...nocCms, hero: { ...nocCms.hero, tag: e.target.value } })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Main H1 Heading
              </label>
              <input
                type="text"
                value={nocCms.hero.h1}
                onChange={(e) => setNocCms({ ...nocCms, hero: { ...nocCms.hero, h1: e.target.value } })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Hero Introduction Paragraph
            </label>
            <textarea
              rows={3}
              value={nocCms.hero.description}
              onChange={(e) => setNocCms({ ...nocCms, hero: { ...nocCms.hero, description: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
            />
          </div>

          <ImageUploadField
            label="Hero Header Background Image"
            value={nocCms.hero.bgImage}
            onChange={(url) => setNocCms({ ...nocCms, hero: { ...nocCms.hero, bgImage: url } })}
          />
        </div>
      )}

      {/* SUB-TAB 2: RDA & LOP SUMMARY */}
      {activeSubTab === 'summary' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">RDA NOC &amp; Layout Plan (LOP) Approval Summary</h3>
            <p className="text-xs text-slate-500">Edit the official authorization card, reference numbers, and legal compliance text.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Card Tagline</label>
              <input
                type="text"
                value={nocCms.summaryCard.tag}
                onChange={(e) => setNocCms({ ...nocCms, summaryCard: { ...nocCms.summaryCard, tag: e.target.value } })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Heading</label>
              <input
                type="text"
                value={nocCms.summaryCard.heading}
                onChange={(e) => setNocCms({ ...nocCms, summaryCard: { ...nocCms.summaryCard, heading: e.target.value } })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Lead Text</label>
            <textarea
              rows={2}
              value={nocCms.summaryCard.leadText}
              onChange={(e) => setNocCms({ ...nocCms, summaryCard: { ...nocCms.summaryCard, leadText: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#fff8f6] rounded-xl border border-rose-200">
            <div>
              <label className="block text-xs font-bold text-[#7b002c] uppercase tracking-wider mb-1">
                Official Layout Plan (LOP) Ref Number
              </label>
              <input
                type="text"
                value={nocCms.summaryCard.lopNumber}
                onChange={(e) => setNocCms({ ...nocCms, summaryCard: { ...nocCms.summaryCard, lopNumber: e.target.value } })}
                className="w-full px-3.5 py-2.5 bg-white border border-rose-300 rounded-xl text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#7b002c] uppercase tracking-wider mb-1">
                LOP Description / Scope
              </label>
              <input
                type="text"
                value={nocCms.summaryCard.lopDescription}
                onChange={(e) => setNocCms({ ...nocCms, summaryCard: { ...nocCms.summaryCard, lopDescription: e.target.value } })}
                className="w-full px-3.5 py-2.5 bg-white border border-rose-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Detailed Legal Guarantee Text
            </label>
            <textarea
              rows={3}
              value={nocCms.summaryCard.detailedText}
              onChange={(e) => setNocCms({ ...nocCms, summaryCard: { ...nocCms.summaryCard, detailedText: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
            />
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SECTOR ALLOTMENTS */}
      {activeSubTab === 'blocks' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Sector &amp; Block Regulatory Allotments</h3>
              <p className="text-xs text-slate-500">Manage block-by-block approval statuses and descriptions.</p>
            </div>
            <button
              type="button"
              onClick={handleAddBlockRow}
              className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Block Row</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nocCms.blocksNocList.map((item, idx) => (
              <div key={item.id || idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#7b002c]">Block Item #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlockRow(idx)}
                    className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Block / Sector Name</label>
                    <input
                      type="text"
                      value={item.blockName}
                      onChange={(e) => handleUpdateBlockRow(idx, 'blockName', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Approval Status</label>
                    <input
                      type="text"
                      value={item.status}
                      onChange={(e) => handleUpdateBlockRow(idx, 'status', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Description / Details</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleUpdateBlockRow(idx, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: BUYER ADVISORY */}
      {activeSubTab === 'advisory' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">Buyer Advisory &amp; Demarcation Note</h3>
            <p className="text-xs text-slate-500">Customize caution and guidance tips for plot buyers.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Advisory Box Title
            </label>
            <input
              type="text"
              value={nocCms.buyerAdvisory.title}
              onChange={(e) => setNocCms({ ...nocCms, buyerAdvisory: { ...nocCms.buyerAdvisory, title: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Advisory Guidance Note
            </label>
            <textarea
              rows={3}
              value={nocCms.buyerAdvisory.note}
              onChange={(e) => setNocCms({ ...nocCms, buyerAdvisory: { ...nocCms.buyerAdvisory, note: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
            />
          </div>
        </div>
      )}

      {/* SUB-TAB 5: VERIFICATION HOTLINE & CONTACT */}
      {activeSubTab === 'form' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">Verification Lead Form &amp; Hotline Details</h3>
            <p className="text-xs text-slate-500">Configure the right-side plot verification card and instant WhatsApp routing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Form Tagline</label>
              <input
                type="text"
                value={nocCms.verificationForm.tag}
                onChange={(e) => setNocCms({ ...nocCms, verificationForm: { ...nocCms.verificationForm, tag: e.target.value } })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Form Heading</label>
              <input
                type="text"
                value={nocCms.verificationForm.heading}
                onChange={(e) => setNocCms({ ...nocCms, verificationForm: { ...nocCms.verificationForm, heading: e.target.value } })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Description</label>
            <input
              type="text"
              value={nocCms.verificationForm.description}
              onChange={(e) => setNocCms({ ...nocCms, verificationForm: { ...nocCms.verificationForm, description: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Phone (Digits with country code, no +)
              </label>
              <input
                type="text"
                value={nocCms.verificationForm.whatsappNumber}
                onChange={(e) => setNocCms({ ...nocCms, verificationForm: { ...nocCms.verificationForm, whatsappNumber: e.target.value } })}
                placeholder="923331113177"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Direct Call Hotline Display
              </label>
              <input
                type="text"
                value={nocCms.verificationForm.hotline}
                onChange={(e) => setNocCms({ ...nocCms, verificationForm: { ...nocCms.verificationForm, hotline: e.target.value } })}
                placeholder="+92 333 1113177"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: FAQS */}
      {activeSubTab === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Legal &amp; NOC FAQs</h3>
              <p className="text-xs text-slate-500">Edit frequently asked questions regarding RDA approvals and transfers.</p>
            </div>
            <button
              type="button"
              onClick={handleAddFaq}
              className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {nocCms.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#7b002c]">Question #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)}
                  placeholder="Question..."
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                />
                <textarea
                  rows={2}
                  value={faq.a}
                  onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)}
                  placeholder="Answer..."
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: SEO */}
      {activeSubTab === 'seo' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">Meta Title &amp; Description (SEO)</h3>
            <p className="text-xs text-slate-500">Configure search engine indexing and titles for the NOC page.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Page Meta Title
            </label>
            <input
              type="text"
              value={nocCms.meta.title}
              onChange={(e) => setNocCms({ ...nocCms, meta: { ...nocCms.meta, title: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Page Meta Description
            </label>
            <textarea
              rows={3}
              value={nocCms.meta.description}
              onChange={(e) => setNocCms({ ...nocCms, meta: { ...nocCms.meta, description: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
            />
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="sticky bottom-4 z-30 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-300">NOC CMS Editor Active</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/faisal-hills-noc-status/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            Preview Live NOC Page →
          </a>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save & Publish NOC'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
