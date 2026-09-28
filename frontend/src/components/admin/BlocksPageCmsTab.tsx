'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Save, RefreshCw, CheckCircle2, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp,
  Image as ImageIcon, Sparkles, Building2, MapPin, Layers, PhoneCall, MessageCircle, HelpCircle,
  Star, ShieldCheck, Eye, Compass, Award, FileText, Check, DollarSign, ListChecks,
  Upload, Camera, Link2, X, ExternalLink
} from 'lucide-react';
import {
  BlocksPageCMSData,
  initialBlocksPageCMS,
  fetchBlocksPageCMS,
  saveBlocksPageCMS,
  mergeBlocksCMS
} from '@/data/faisalHillsData';

function compressImageFile(file: File, maxWidth = 1920, quality = 0.85): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
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
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve((event.target?.result as string) || '');
        }
      };
      img.onerror = () => resolve((event.target?.result as string) || '');
      img.src = event.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  helper?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Image URL or upload from device',
  helper = 'Supports JPG, PNG, WEBP from PC / Mobile'
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
        {/* Preview Thumbnail */}
        <div className="relative w-28 h-20 bg-slate-900 rounded-xl overflow-hidden border border-slate-200 shadow-inner shrink-0 group">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
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

        {/* Upload Controls */}
        <div className="flex-1 space-y-2 w-full">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id={`img-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
            />
            <label
              htmlFor={`img-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
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

export default function BlocksPageCmsTab() {
  const [cms, setCms] = useState<BlocksPageCMSData>(initialBlocksPageCMS);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Load live data on mount
  useEffect(() => {
    fetchBlocksPageCMS().then((data) => {
      if (data) setCms(mergeBlocksCMS(data));
    });

    const handleStorage = () => {
      try {
        const local = localStorage.getItem('faisal_blocks_cms');
        if (local) setCms(mergeBlocksCMS(JSON.parse(local)));
      } catch {}
    };

    window.addEventListener('faisal_blocks_cms_updated', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('faisal_blocks_cms_updated', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMsg('');
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') || undefined : undefined;
    const ok = await saveBlocksPageCMS(cms, token);
    setIsSaving(false);
    if (ok) {
      setSaveSuccess(true);
      setStatusMsg('Blocks page content successfully saved and published live!');
      setTimeout(() => setSaveSuccess(false), 4000);
    } else {
      setStatusMsg('Saved locally in browser. Note: API sync pending backend authentication.');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  };

  const handleResetToAuditedDefaults = () => {
    if (window.confirm('Are you sure you want to reset all Blocks Page sections to official audited defaults?')) {
      setCms(initialBlocksPageCMS);
      setStatusMsg('Reset to audited defaults. Click "Save Live Changes" to publish.');
    }
  };

  const sectionTabs = [
    { id: 'hero', label: '🌟 Hero & Counters', icon: Sparkles },
    { id: 'glance', label: '📊 At a Glance Table', icon: Layers },
    { id: 'stages', label: '📜 Growth Stages', icon: FileText },
    { id: 'map', label: '🗺️ Map & Road Placement', icon: MapPin },
    { id: 'blocks', label: '🏢 7 Block Profiles', icon: Building2 },
    { id: 'dimensions', label: '📐 Plot Sizes & Marla', icon: Compass },
    { id: 'prices', label: '💰 Plot Prices & Supply', icon: DollarSign },
    { id: 'status', label: '🏗️ Development & Infra', icon: Award },
    { id: 'decision', label: '🎯 Decision & Glossary', icon: ListChecks },
    { id: 'dueDiligence', label: '✅ 6-Step Checklist', icon: ShieldCheck },
    { id: 'faqs', label: '❓ 10 FAQs Accordion', icon: HelpCircle },
    { id: 'cta', label: '📞 Compare Desk & CTA', icon: PhoneCall },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Controls Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Faisal Hills Blocks Page CMS Editor
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
              100% Dynamic Control
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Instant full management of all titles, comparative matrices, plot sizing tables, pricing ranges, and FAQs for <code className="bg-slate-100 px-1 py-0.5 rounded text-[#7b002c]">/faisal-hills-blocks</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetToAuditedDefaults}
            className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
          >
            Reset Defaults
          </button>
          
          <a
            href="/faisal-hills-blocks/"
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
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Live Changes'}</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {statusMsg && (
        <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
          saveSuccess ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
        }`}>
          {saveSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />}
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Horizontal Category Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-200/70 p-2 rounded-2xl border border-slate-300">
        {sectionTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#7b002c] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: HERO & METRICS BAR                            */}
      {/* ========================================================= */}
      {activeSection === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">1. Hero Banner & 4 KPI Metric Counters</h3>
            <p className="text-xs text-slate-500">Edit the primary headline, background image, and live metric cards at the top.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Main H1 Headline
              </label>
              <input
                type="text"
                value={cms.hero.h1}
                onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, h1: e.target.value } })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-[#7b002c] transition"
              />
            </div>

            <ImageUploader
              label="Hero Panoramic Background Image"
              value={cms.hero.heroImage}
              onChange={(val) => setCms({ ...cms, hero: { ...cms.hero, heroImage: val } })}
            />

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                4 Key Animated Metric Cards
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="text-[11px] font-bold text-amber-700">Metric Card 1 (Counter)</div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Value Number</label>
                    <input
                      type="number"
                      value={cms.hero.kpiCards.card1.value}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: {
                          ...cms.hero,
                          kpiCards: {
                            ...cms.hero.kpiCards,
                            card1: { ...cms.hero.kpiCards.card1, value: parseInt(e.target.value) || 0 }
                          }
                        }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Unit Suffix</label>
                    <input
                      type="text"
                      value={cms.hero.kpiCards.card1.unit}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: {
                          ...cms.hero,
                          kpiCards: {
                            ...cms.hero.kpiCards,
                            card1: { ...cms.hero.kpiCards.card1, unit: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Bottom Label</label>
                    <input
                      type="text"
                      value={cms.hero.kpiCards.card1.label}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: {
                          ...cms.hero,
                          kpiCards: {
                            ...cms.hero.kpiCards,
                            card1: { ...cms.hero.kpiCards.card1, label: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="text-[11px] font-bold text-emerald-700">Metric Card 2 (Possession)</div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Display Value</label>
                    <input
                      type="text"
                      value={cms.hero.kpiCards.card2.value}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: {
                          ...cms.hero,
                          kpiCards: {
                            ...cms.hero.kpiCards,
                            card2: { ...cms.hero.kpiCards.card2, value: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Bottom Label</label>
                    <input
                      type="text"
                      value={cms.hero.kpiCards.card2.label}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: {
                          ...cms.hero,
                          kpiCards: {
                            ...cms.hero.kpiCards,
                            card2: { ...cms.hero.kpiCards.card2, label: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="text-[11px] font-bold text-sky-700">Metric Card 3 (Sizes)</div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Display Value</label>
                    <input
                      type="text"
                      value={cms.hero.kpiCards.card3.value}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: {
                          ...cms.hero,
                          kpiCards: {
                            ...cms.hero.kpiCards,
                            card3: { ...cms.hero.kpiCards.card3, value: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Bottom Label</label>
                    <input
                      type="text"
                      value={cms.hero.kpiCards.card3.label}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: {
                          ...cms.hero,
                          kpiCards: {
                            ...cms.hero.kpiCards,
                            card3: { ...cms.hero.kpiCards.card3, label: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                {/* Card 4 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="text-[11px] font-bold text-amber-700">Metric Card 4 (Approval)</div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Display Value</label>
                    <input
                      type="text"
                      value={cms.hero.kpiCards.card4.value}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: {
                          ...cms.hero,
                          kpiCards: {
                            ...cms.hero.kpiCards,
                            card4: { ...cms.hero.kpiCards.card4, value: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Bottom Label</label>
                    <input
                      type="text"
                      value={cms.hero.kpiCards.card4.label}
                      onChange={(e) => setCms({
                        ...cms,
                        hero: {
                          ...cms.hero,
                          kpiCards: {
                            ...cms.hero.kpiCards,
                            card4: { ...cms.hero.kpiCards.card4, label: e.target.value }
                          }
                        }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: AT A GLANCE TABLE                             */}
      {/* ========================================================= */}
      {activeSection === 'glance' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">2. Faisal Hills Blocks at a Glance Table</h3>
            <p className="text-xs text-slate-500">Edit rows, character definitions, approximate plots, and sale modes.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Section H2 Title
              </label>
              <input
                type="text"
                value={cms.atAGlance.h2}
                onChange={(e) => setCms({ ...cms, atAGlance: { ...cms.atAGlance, h2: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Block Rows ({cms.atAGlance.rows.length})
              </label>

              {cms.atAGlance.rows.map((row, idx) => (
                <div key={row.id || idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-900 border-b border-slate-200 pb-2">
                    <span className="text-[#7b002c]">#{idx + 1} {row.name}</span>
                    <span className="text-[10px] text-slate-500">Slug: {row.slug}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold uppercase">Block Name</label>
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => {
                          const updated = [...cms.atAGlance.rows];
                          updated[idx].name = e.target.value;
                          setCms({ ...cms, atAGlance: { ...cms.atAGlance, rows: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold uppercase">Character</label>
                      <input
                        type="text"
                        value={row.character}
                        onChange={(e) => {
                          const updated = [...cms.atAGlance.rows];
                          updated[idx].character = e.target.value;
                          setCms({ ...cms, atAGlance: { ...cms.atAGlance, rows: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold uppercase">Approx Plots</label>
                      <input
                        type="text"
                        value={row.approxPlots}
                        onChange={(e) => {
                          const updated = [...cms.atAGlance.rows];
                          updated[idx].approxPlots = e.target.value;
                          setCms({ ...cms, atAGlance: { ...cms.atAGlance, rows: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold uppercase">Plot Sizes</label>
                      <input
                        type="text"
                        value={row.plotSizes}
                        onChange={(e) => {
                          const updated = [...cms.atAGlance.rows];
                          updated[idx].plotSizes = e.target.value;
                          setCms({ ...cms, atAGlance: { ...cms.atAGlance, rows: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold uppercase">How Sold</label>
                      <input
                        type="text"
                        value={row.howSold}
                        onChange={(e) => {
                          const updated = [...cms.atAGlance.rows];
                          updated[idx].howSold = e.target.value;
                          setCms({ ...cms, atAGlance: { ...cms.atAGlance, rows: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-semibold uppercase">Possession</label>
                      <input
                        type="text"
                        value={row.possession}
                        onChange={(e) => {
                          const updated = [...cms.atAGlance.rows];
                          updated[idx].possession = e.target.value;
                          setCms({ ...cms, atAGlance: { ...cms.atAGlance, rows: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Table Footnote / Explanatory Note
              </label>
              <textarea
                rows={3}
                value={cms.atAGlance.footnote}
                onChange={(e) => setCms({ ...cms, atAGlance: { ...cms.atAGlance, footnote: e.target.value } })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: GROWTH STAGES                                  */}
      {/* ========================================================= */}
      {activeSection === 'stages' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">3. How Many Blocks Does Faisal Hills Have?</h3>
            <p className="text-xs text-slate-500">Edit the historical growth breakdown and Phase 2 distinction callout.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Section H2 Title
              </label>
              <input
                type="text"
                value={cms.growthStages.h2}
                onChange={(e) => setCms({ ...cms, growthStages: { ...cms.growthStages, h2: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Intro Paragraph
              </label>
              <textarea
                rows={2}
                value={cms.growthStages.paragraph}
                onChange={(e) => setCms({ ...cms, growthStages: { ...cms.growthStages, paragraph: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Growth Stages Table Rows
              </label>

              {cms.growthStages.stages.map((stg, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Stage</label>
                      <input
                        type="text"
                        value={stg.stage}
                        onChange={(e) => {
                          const updated = [...cms.growthStages.stages];
                          updated[idx].stage = e.target.value;
                          setCms({ ...cms, growthStages: { ...cms.growthStages, stages: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Blocks</label>
                      <input
                        type="text"
                        value={stg.blocks}
                        onChange={(e) => {
                          const updated = [...cms.growthStages.stages];
                          updated[idx].blocks = e.target.value;
                          setCms({ ...cms, growthStages: { ...cms.growthStages, stages: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">What it means for you</label>
                      <input
                        type="text"
                        value={stg.meaning}
                        onChange={(e) => {
                          const updated = [...cms.growthStages.stages];
                          updated[idx].meaning = e.target.value;
                          setCms({ ...cms, growthStages: { ...cms.growthStages, stages: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Important Distinction Callout (Phase 2 & Sector Note)
              </label>
              <textarea
                rows={2}
                value={cms.growthStages.distinctionNote}
                onChange={(e) => setCms({ ...cms, growthStages: { ...cms.growthStages, distinctionNote: e.target.value } })}
                className="w-full px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 4: MAP & ROAD PLACEMENT                           */}
      {/* ========================================================= */}
      {activeSection === 'map' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">4. Faisal Hills Block Map & Road Placement</h3>
            <p className="text-xs text-slate-500">Edit map description, key arterial connectors, and &quot;Where Each Block Sits&quot; table.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Map Section H2 Title
              </label>
              <input
                type="text"
                value={cms.blockMap.h2}
                onChange={(e) => setCms({ ...cms, blockMap: { ...cms.blockMap, h2: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Map Section Description
              </label>
              <textarea
                rows={3}
                value={cms.blockMap.paragraph}
                onChange={(e) => setCms({ ...cms, blockMap: { ...cms.blockMap, paragraph: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Where Each Block Sits (Table Rows)
              </label>

              {cms.blockMap.whereItSits.map((row, idx) => (
                <div key={row.id || idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Block Name</label>
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => {
                          const updated = [...cms.blockMap.whereItSits];
                          updated[idx].name = e.target.value;
                          setCms({ ...cms, blockMap: { ...cms.blockMap, whereItSits: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Borders</label>
                      <input
                        type="text"
                        value={row.borders}
                        onChange={(e) => {
                          const updated = [...cms.blockMap.whereItSits];
                          updated[idx].borders = e.target.value;
                          setCms({ ...cms, blockMap: { ...cms.blockMap, whereItSits: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Road Access</label>
                      <input
                        type="text"
                        value={row.access}
                        onChange={(e) => {
                          const updated = [...cms.blockMap.whereItSits];
                          updated[idx].access = e.target.value;
                          setCms({ ...cms, blockMap: { ...cms.blockMap, whereItSits: updated } });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Reading Plot Numbers Paragraph
              </label>
              <textarea
                rows={2}
                value={cms.blockMap.readingPlotNumbersText}
                onChange={(e) => setCms({ ...cms, blockMap: { ...cms.blockMap, readingPlotNumbersText: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 5: 7 BLOCK PROFILES                               */}
      {/* ========================================================= */}
      {activeSection === 'blocks' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">5. The Blocks One by One (7 Sector Profiles)</h3>
            <p className="text-xs text-slate-500">Edit detailed descriptions, block badges, upload custom images, and target buyer persona.</p>
          </div>

          <div className="space-y-6">
            {cms.blocksOneByOne.map((blk, idx) => (
              <div key={blk.id || idx} className="p-5 sm:p-6 bg-slate-50 border border-slate-300 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <h4 className="font-serif font-bold text-base text-[#7b002c]">
                    Sector #{idx + 1}: {blk.name}
                  </h4>
                  <span className="text-xs font-mono text-slate-500">/blocks/{blk.slug}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Block Name</label>
                    <input
                      type="text"
                      value={blk.name}
                      onChange={(e) => {
                        const updated = [...cms.blocksOneByOne];
                        updated[idx].name = e.target.value;
                        setCms({ ...cms, blocksOneByOne: updated });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Tagline / Subtitle</label>
                    <input
                      type="text"
                      value={blk.tagline}
                      onChange={(e) => {
                        const updated = [...cms.blocksOneByOne];
                        updated[idx].tagline = e.target.value;
                        setCms({ ...cms, blocksOneByOne: updated });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Card Badge</label>
                    <input
                      type="text"
                      value={blk.badge}
                      onChange={(e) => {
                        const updated = [...cms.blocksOneByOne];
                        updated[idx].badge = e.target.value;
                        setCms({ ...cms, blocksOneByOne: updated });
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-[#7b002c]"
                    />
                  </div>
                </div>

                <ImageUploader
                  label={`${blk.name} Featured Image`}
                  value={blk.heroImage}
                  onChange={(val) => {
                    const updated = [...cms.blocksOneByOne];
                    updated[idx].heroImage = val;
                    setCms({ ...cms, blocksOneByOne: updated });
                  }}
                />

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Sector Copy (Collapsible on page)
                  </label>
                  <textarea
                    rows={4}
                    value={blk.detailedCopy}
                    onChange={(e) => {
                      const updated = [...cms.blocksOneByOne];
                      updated[idx].detailedCopy = e.target.value;
                      setCms({ ...cms, blocksOneByOne: updated });
                    }}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Plot Sizes</label>
                    <input
                      type="text"
                      value={blk.plotSizes}
                      onChange={(e) => {
                        const updated = [...cms.blocksOneByOne];
                        updated[idx].plotSizes = e.target.value;
                        setCms({ ...cms, blocksOneByOne: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">How Sold</label>
                    <input
                      type="text"
                      value={blk.howSold}
                      onChange={(e) => {
                        const updated = [...cms.blocksOneByOne];
                        updated[idx].howSold = e.target.value;
                        setCms({ ...cms, blocksOneByOne: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Possession</label>
                    <input
                      type="text"
                      value={blk.possession}
                      onChange={(e) => {
                        const updated = [...cms.blocksOneByOne];
                        updated[idx].possession = e.target.value;
                        setCms({ ...cms, blocksOneByOne: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    &quot;Suits:&quot; Target Recommendation
                  </label>
                  <input
                    type="text"
                    value={blk.suits}
                    onChange={(e) => {
                      const updated = [...cms.blocksOneByOne];
                      updated[idx].suits = e.target.value;
                      setCms({ ...cms, blocksOneByOne: updated });
                    }}
                    className="w-full px-4 py-2 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-950"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 6: PLOT SIZES & MARLA CONVERSIONS                 */}
      {/* ========================================================= */}
      {activeSection === 'dimensions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">6. Plot Sizes Matrix & 3-Tier Marla Conversion</h3>
            <p className="text-xs text-slate-500">Edit dimensions matrix checkmarks and exact square feet to Marla calculations.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Plot Sizes Matrix Title
              </label>
              <input
                type="text"
                value={cms.plotSizesSection.h2}
                onChange={(e) => setCms({
                  ...cms,
                  plotSizesSection: { ...cms.plotSizesSection, h2: e.target.value }
                })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-serif font-bold text-sm text-slate-900">Marla Calculations (272.25 vs 250 vs 225)</h4>
              
              {cms.marlaConversions.rows.map((row, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Dimensions</label>
                    <input
                      type="text"
                      value={row.dimensions}
                      onChange={(e) => {
                        const updated = [...cms.marlaConversions.rows];
                        updated[idx].dimensions = e.target.value;
                        setCms({ ...cms, marlaConversions: { ...cms.marlaConversions, rows: updated } });
                      }}
                      className="w-full px-2 py-1 bg-white border rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Sq Ft</label>
                    <input
                      type="text"
                      value={row.areaSqFt}
                      onChange={(e) => {
                        const updated = [...cms.marlaConversions.rows];
                        updated[idx].areaSqFt = e.target.value;
                        setCms({ ...cms, marlaConversions: { ...cms.marlaConversions, rows: updated } });
                      }}
                      className="w-full px-2 py-1 bg-white border rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">At 272.25</label>
                    <input
                      type="text"
                      value={row.at272}
                      onChange={(e) => {
                        const updated = [...cms.marlaConversions.rows];
                        updated[idx].at272 = e.target.value;
                        setCms({ ...cms, marlaConversions: { ...cms.marlaConversions, rows: updated } });
                      }}
                      className="w-full px-2 py-1 bg-white border rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">At 250</label>
                    <input
                      type="text"
                      value={row.at250}
                      onChange={(e) => {
                        const updated = [...cms.marlaConversions.rows];
                        updated[idx].at250 = e.target.value;
                        setCms({ ...cms, marlaConversions: { ...cms.marlaConversions, rows: updated } });
                      }}
                      className="w-full px-2 py-1 bg-white border rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">At 225</label>
                    <input
                      type="text"
                      value={row.at225}
                      onChange={(e) => {
                        const updated = [...cms.marlaConversions.rows];
                        updated[idx].at225 = e.target.value;
                        setCms({ ...cms, marlaConversions: { ...cms.marlaConversions, rows: updated } });
                      }}
                      className="w-full px-2 py-1 bg-white border rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Sold As</label>
                    <input
                      type="text"
                      value={row.usuallySold}
                      onChange={(e) => {
                        const updated = [...cms.marlaConversions.rows];
                        updated[idx].usuallySold = e.target.value;
                        setCms({ ...cms, marlaConversions: { ...cms.marlaConversions, rows: updated } });
                      }}
                      className="w-full px-2 py-1 bg-white border rounded text-xs font-bold text-[#7b002c]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Kanal Calculation Note
              </label>
              <textarea
                rows={2}
                value={cms.marlaConversions.callout}
                onChange={(e) => setCms({
                  ...cms,
                  marlaConversions: { ...cms.marlaConversions, callout: e.target.value }
                })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 7: PLOT PRICES & SUPPLY                           */}
      {/* ========================================================= */}
      {activeSection === 'prices' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">7. Plot Prices and Supply by Block</h3>
            <p className="text-xs text-slate-500">Update current asking price ranges for 5 Marla and 1 Kanal across sectors.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Section H2 Title
              </label>
              <input
                type="text"
                value={cms.plotPrices.h2}
                onChange={(e) => setCms({ ...cms, plotPrices: { ...cms.plotPrices, h2: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Block Price Ranges ({cms.plotPrices.rows.length})
              </label>

              {cms.plotPrices.rows.map((row, idx) => (
                <div key={row.id || idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Block Name</label>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => {
                        const updated = [...cms.plotPrices.rows];
                        updated[idx].name = e.target.value;
                        setCms({ ...cms, plotPrices: { ...cms.plotPrices, rows: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">5 Marla Asking Range</label>
                    <input
                      type="text"
                      value={row.fiveMarla}
                      onChange={(e) => {
                        const updated = [...cms.plotPrices.rows];
                        updated[idx].fiveMarla = e.target.value;
                        setCms({ ...cms, plotPrices: { ...cms.plotPrices, rows: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-[#7b002c]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">1 Kanal Asking Range</label>
                    <input
                      type="text"
                      value={row.oneKanal}
                      onChange={(e) => {
                        const updated = [...cms.plotPrices.rows];
                        updated[idx].oneKanal = e.target.value;
                        setCms({ ...cms, plotPrices: { ...cms.plotPrices, rows: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Pricing Footnote
              </label>
              <textarea
                rows={2}
                value={cms.plotPrices.footnote}
                onChange={(e) => setCms({ ...cms, plotPrices: { ...cms.plotPrices, footnote: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 8: DEVELOPMENT STATUS & INFRASTRUCTURE            */}
      {/* ========================================================= */}
      {activeSection === 'status' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">8. Development Status & Shared Infrastructure</h3>
            <p className="text-xs text-slate-500">Edit on-ground progress reports, road completion, and civic infrastructure cards.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Development Status Rows
              </label>

              {cms.developmentStatus.rows.map((row, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Block</label>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => {
                        const updated = [...cms.developmentStatus.rows];
                        updated[idx].name = e.target.value;
                        setCms({ ...cms, developmentStatus: { ...cms.developmentStatus, rows: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Roads & Utilities</label>
                    <input
                      type="text"
                      value={row.roads}
                      onChange={(e) => {
                        const updated = [...cms.developmentStatus.rows];
                        updated[idx].roads = e.target.value;
                        setCms({ ...cms, developmentStatus: { ...cms.developmentStatus, rows: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Houses & Residents</label>
                    <input
                      type="text"
                      value={row.houses}
                      onChange={(e) => {
                        const updated = [...cms.developmentStatus.rows];
                        updated[idx].houses = e.target.value;
                        setCms({ ...cms, developmentStatus: { ...cms.developmentStatus, rows: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Reported</label>
                    <input
                      type="text"
                      value={row.reported}
                      onChange={(e) => {
                        const updated = [...cms.developmentStatus.rows];
                        updated[idx].reported = e.target.value;
                        setCms({ ...cms, developmentStatus: { ...cms.developmentStatus, rows: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border rounded text-xs text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-serif font-bold text-sm text-slate-900">Shared Infrastructure Box</h4>
              
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Headline</label>
                <input
                  type="text"
                  value={cms.developmentStatus.infrastructure.h3}
                  onChange={(e) => setCms({
                    ...cms,
                    developmentStatus: {
                      ...cms.developmentStatus,
                      infrastructure: { ...cms.developmentStatus.infrastructure, h3: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Paragraph</label>
                <textarea
                  rows={3}
                  value={cms.developmentStatus.infrastructure.paragraph}
                  onChange={(e) => setCms({
                    ...cms,
                    developmentStatus: {
                      ...cms.developmentStatus,
                      infrastructure: { ...cms.developmentStatus.infrastructure, paragraph: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                {cms.developmentStatus.infrastructure.cards.map((c, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <input
                      type="text"
                      value={c.title}
                      onChange={(e) => {
                        const updated = [...cms.developmentStatus.infrastructure.cards];
                        updated[idx].title = e.target.value;
                        setCms({
                          ...cms,
                          developmentStatus: {
                            ...cms.developmentStatus,
                            infrastructure: { ...cms.developmentStatus.infrastructure, cards: updated }
                          }
                        });
                      }}
                      className="w-full px-2 py-1 bg-white border rounded text-xs font-bold text-amber-700"
                    />
                    <textarea
                      rows={2}
                      value={c.desc}
                      onChange={(e) => {
                        const updated = [...cms.developmentStatus.infrastructure.cards];
                        updated[idx].desc = e.target.value;
                        setCms({
                          ...cms,
                          developmentStatus: {
                            ...cms.developmentStatus,
                            infrastructure: { ...cms.developmentStatus.infrastructure, cards: updated }
                          }
                        });
                      }}
                      className="w-full px-2 py-1 bg-white border rounded text-[11px] text-slate-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 9: DECISION MATRIX & GLOSSARY                     */}
      {/* ========================================================= */}
      {activeSection === 'decision' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">9. Decision Matrix & Real Estate Glossary</h3>
            <p className="text-xs text-slate-500">Edit buyer decision scenarios and definitions for File, NDC, Series, etc.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-slate-900">Which Block Fits Your Plan (Rows)</h4>
              {cms.decisionMatrix.rows.map((row, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Goal</label>
                    <input
                      type="text"
                      value={row.goal}
                      onChange={(e) => {
                        const updated = [...cms.decisionMatrix.rows];
                        updated[idx].goal = e.target.value;
                        setCms({ ...cms, decisionMatrix: { ...cms.decisionMatrix, rows: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Consider</label>
                    <input
                      type="text"
                      value={row.consider}
                      onChange={(e) => {
                        const updated = [...cms.decisionMatrix.rows];
                        updated[idx].consider = e.target.value;
                        setCms({ ...cms, decisionMatrix: { ...cms.decisionMatrix, rows: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border rounded text-xs font-bold text-[#7b002c]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Trade-off</label>
                    <input
                      type="text"
                      value={row.tradeOff}
                      onChange={(e) => {
                        const updated = [...cms.decisionMatrix.rows];
                        updated[idx].tradeOff = e.target.value;
                        setCms({ ...cms, decisionMatrix: { ...cms.decisionMatrix, rows: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border rounded text-xs text-slate-700"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-serif font-bold text-sm text-slate-900">Real Estate Glossary Terms</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cms.glossary.terms.map((t, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <input
                      type="text"
                      value={t.term}
                      onChange={(e) => {
                        const updated = [...cms.glossary.terms];
                        updated[idx].term = e.target.value;
                        setCms({ ...cms, glossary: { ...cms.glossary, terms: updated } });
                      }}
                      className="w-full px-2.5 py-1 bg-white border rounded text-xs font-bold text-[#7b002c]"
                    />
                    <textarea
                      rows={3}
                      value={t.definition}
                      onChange={(e) => {
                        const updated = [...cms.glossary.terms];
                        updated[idx].definition = e.target.value;
                        setCms({ ...cms, glossary: { ...cms.glossary, terms: updated } });
                      }}
                      className="w-full px-2.5 py-1 bg-white border rounded text-[11px] text-slate-700"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Corner / Boulevard Premium Note
                </label>
                <textarea
                  rows={2}
                  value={cms.glossary.premiumNote}
                  onChange={(e) => setCms({ ...cms, glossary: { ...cms.glossary, premiumNote: e.target.value } })}
                  className="w-full px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 10: 6-STEP DUE DILIGENCE                         */}
      {/* ========================================================= */}
      {activeSection === 'dueDiligence' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">10. 6-Step Buyer Due Diligence Protocol</h3>
            <p className="text-xs text-slate-500">Edit titles and action advice for the 6 verification steps.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Section H2 Title
              </label>
              <input
                type="text"
                value={cms.dueDiligence.h2}
                onChange={(e) => setCms({ ...cms, dueDiligence: { ...cms.dueDiligence, h2: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border rounded-xl text-xs font-bold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {cms.dueDiligence.steps.map((st, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="w-7 h-7 bg-[#7b002c] text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    {st.number}
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Step Title</label>
                    <input
                      type="text"
                      value={st.title}
                      onChange={(e) => {
                        const updated = [...cms.dueDiligence.steps];
                        updated[idx].title = e.target.value;
                        setCms({ ...cms, dueDiligence: { ...cms.dueDiligence, steps: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Description</label>
                    <textarea
                      rows={3}
                      value={st.desc}
                      onChange={(e) => {
                        const updated = [...cms.dueDiligence.steps];
                        updated[idx].desc = e.target.value;
                        setCms({ ...cms, dueDiligence: { ...cms.dueDiligence, steps: updated } });
                      }}
                      className="w-full px-3 py-1.5 bg-white border rounded text-[11px] text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 11: FAQS ACCORDION                                */}
      {/* ========================================================= */}
      {activeSection === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">11. Frequently Asked Questions (10 FAQs)</h3>
              <p className="text-xs text-slate-500">Edit, add, or reorganize questions answered on the blocks page.</p>
            </div>
            
            <button
              type="button"
              onClick={() => {
                setCms({
                  ...cms,
                  faqs: {
                    ...cms.faqs,
                    items: [...cms.faqs.items, { question: 'New Question?', answer: 'Answer here.' }]
                  }
                });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#7b002c] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            {cms.faqs.items.map((faq, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#7b002c]">Question #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = cms.faqs.items.filter((_, i) => i !== idx);
                      setCms({ ...cms, faqs: { ...cms.faqs, items: updated } });
                    }}
                    className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    title="Delete Question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => {
                    const updated = [...cms.faqs.items];
                    updated[idx].question = e.target.value;
                    setCms({ ...cms, faqs: { ...cms.faqs, items: updated } });
                  }}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  placeholder="Question text..."
                />

                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...cms.faqs.items];
                    updated[idx].answer = e.target.value;
                    setCms({ ...cms, faqs: { ...cms.faqs, items: updated } });
                  }}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-700"
                  placeholder="Answer text..."
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 12: CTA & OFFICE CONTACTS                         */}
      {/* ========================================================= */}
      {activeSection === 'cta' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">12. Compare Blocks With Us (CTA & Office Desk)</h3>
            <p className="text-xs text-slate-500">Edit bottom conversion banner, direct telephone number, WhatsApp, and office address.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                CTA Headline
              </label>
              <input
                type="text"
                value={cms.cta.h2}
                onChange={(e) => setCms({ ...cms, cta: { ...cms.cta, h2: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                CTA Paragraph
              </label>
              <textarea
                rows={3}
                value={cms.cta.paragraph}
                onChange={(e) => setCms({ ...cms, cta: { ...cms.cta, paragraph: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={cms.cta.whatsappNumber}
                  onChange={(e) => setCms({ ...cms, cta: { ...cms.cta, whatsappNumber: e.target.value } })}
                  className="w-full px-4 py-2 bg-slate-50 border rounded-xl text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Official Phone Line
                </label>
                <input
                  type="text"
                  value={cms.cta.phoneNumber}
                  onChange={(e) => setCms({ ...cms, cta: { ...cms.cta, phoneNumber: e.target.value } })}
                  className="w-full px-4 py-2 bg-slate-50 border rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Head Office Address
              </label>
              <input
                type="text"
                value={cms.cta.headOffice}
                onChange={(e) => setCms({ ...cms, cta: { ...cms.cta, headOffice: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                About this Page / Reviewer Footnote
              </label>
              <textarea
                rows={2}
                value={cms.cta.aboutPageNote}
                onChange={(e) => setCms({ ...cms, cta: { ...cms.cta, aboutPageNote: e.target.value } })}
                className="w-full px-4 py-2 bg-slate-50 border rounded-xl text-xs text-slate-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Save Bar */}
      <div className="sticky bottom-4 z-30 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-300">Blocks Page CMS Ready</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/faisal-hills-blocks/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            Preview Page →
          </a>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Live Changes'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
