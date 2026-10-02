'use client';

import React, { useState, useRef } from 'react';
import {
  BlockDCMSData,
  initialBlockDCMS,
  saveBlockDCMS,
  BlockDPriceRow,
  BlockDAmenityItem,
  BlockDDevelopmentMilestone,
  BlockDTravelTimeItem,
  BlockDWhyInvestItem
} from '@/data/faisalHillsData';
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
  Globe,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Info,
  Droplets,
  Loader2,
  Check,
  Car,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface BlockDCmsEditorProps {
  blockDCms: BlockDCMSData;
  setBlockDCms: React.Dispatch<React.SetStateAction<BlockDCMSData>>;
  token?: string | null;
  onSaveSuccess?: (msg: string) => void;
}

export default function BlockDCmsEditor({
  blockDCms,
  setBlockDCms,
  token,
  onSaveSuccess
}: BlockDCmsEditorProps) {
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

  // Save handler for Block D
  const handleSaveBlockD = async () => {
    setIsSaving(true);
    setSaveMsg('');
    const activeToken = token || (typeof window !== 'undefined' ? sessionStorage.getItem('faisal_admin_token') || undefined : undefined);
    const ok = await saveBlockDCMS(blockDCms, activeToken);
    setIsSaving(false);
    const msg = ok
      ? 'Faisal Hills Block D CMS content published and updated live!'
      : 'Block D changes saved in local browser storage (API sync pending login).';
    setSaveMsg(msg);
    if (onSaveSuccess) onSaveSuccess(msg);
    setTimeout(() => setSaveMsg(''), 4500);
  };

  const handleResetBlockD = () => {
    if (window.confirm('Reset all Block D sections to official QA audited defaults?')) {
      setBlockDCms(initialBlockDCMS);
      setSaveMsg('Reset to audited defaults. Click "Save & Publish Block D" to apply.');
    }
  };

  const categories = [
    { id: 'verification', label: '1. Byline & Key Facts', icon: Award },
    { id: 'overview', label: '2. H1 & Overview Copy', icon: Sparkles },
    { id: 'location', label: '3. Location & Travel Times', icon: MapPin },
    { id: 'masterPlan', label: '4. Blueprint & Roads', icon: Compass },
    { id: 'whyInvest', label: '5. 6 Investment Reasons', icon: TrendingUp },
    { id: 'priceSchedule', label: '6. Price Schedule Matrix', icon: DollarSign },
    { id: 'amenities', label: '7. Amenities & Lifestyle', icon: Droplets },
    { id: 'milestones', label: '8. Development Milestones', icon: Building2 },
    { id: 'faqs', label: '9. Block D FAQs', icon: HelpCircle },
    { id: 'closing', label: '10. Consultation & Desk', icon: PhoneCall },
  ];

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#7b002c] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#7b002c]" />
            <span>Dedicated Block D CMS System</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Faisal Hills Block D Complete Content Manager
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Manage all 12 sections, price benchmarks, travel time matrices, 6 investment reasons, amenities, and FAQs for <code className="text-[#7b002c] font-mono bg-slate-100 px-1 py-0.5 rounded">/blocks/block-d</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetBlockD}
            className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <a
            href="/blocks/block-d"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-xs font-bold text-[#7b002c] hover:bg-rose-50 border border-rose-200 rounded-xl transition inline-flex items-center gap-1.5"
          >
            <span>Live Block D</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleSaveBlockD}
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
                <span>Save & Publish Block D</span>
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
                value={blockDCms.verificationHeader?.badgeText || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  verificationHeader: { ...blockDCms.verificationHeader, badgeText: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Reviewer Name</label>
              <input
                type="text"
                value={blockDCms.verificationHeader?.reviewerName || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  verificationHeader: { ...blockDCms.verificationHeader, reviewerName: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Prices Verified Date</label>
              <input
                type="text"
                value={blockDCms.verificationHeader?.pricesVerifiedDate || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  verificationHeader: { ...blockDCms.verificationHeader, pricesVerifiedDate: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Site Checked Date</label>
              <input
                type="text"
                value={blockDCms.verificationHeader?.siteCheckedDate || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  verificationHeader: { ...blockDCms.verificationHeader, siteCheckedDate: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h5 className="font-serif font-bold text-sm text-slate-900">Key Facts Strip Fields</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Location Position</label>
                <input
                  type="text"
                  value={blockDCms.overview?.quickFacts?.location || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    overview: {
                      ...blockDCms.overview,
                      quickFacts: { ...blockDCms.overview.quickFacts, location: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Residential Sizes</label>
                <input
                  type="text"
                  value={blockDCms.overview?.quickFacts?.residentialSizes || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    overview: {
                      ...blockDCms.overview,
                      quickFacts: { ...blockDCms.overview.quickFacts, residentialSizes: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Commercial Cuts</label>
                <input
                  type="text"
                  value={blockDCms.overview?.quickFacts?.commercialCuts || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    overview: {
                      ...blockDCms.overview,
                      quickFacts: { ...blockDCms.overview.quickFacts, commercialCuts: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Possession Status</label>
                <input
                  type="text"
                  value={blockDCms.overview?.quickFacts?.possession || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    overview: {
                      ...blockDCms.overview,
                      quickFacts: { ...blockDCms.overview.quickFacts, possession: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Connectivity</label>
                <input
                  type="text"
                  value={blockDCms.overview?.quickFacts?.connectivity || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    overview: {
                      ...blockDCms.overview,
                      quickFacts: { ...blockDCms.overview.quickFacts, connectivity: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Legal Status</label>
                <input
                  type="text"
                  value={blockDCms.overview?.quickFacts?.legalStatus || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    overview: {
                      ...blockDCms.overview,
                      quickFacts: { ...blockDCms.overview.quickFacts, legalStatus: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
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
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            2. Overview Header & Lead Narrative
          </h4>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">H1 Page Heading</label>
              <input
                type="text"
                value={blockDCms.overview?.h1 || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  overview: { ...blockDCms.overview, h1: e.target.value }
                })}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Lead Paragraph 1</label>
              <textarea
                rows={3}
                value={blockDCms.overview?.leadParagraph1 || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  overview: { ...blockDCms.overview, leadParagraph1: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Lead Paragraph 2</label>
              <textarea
                rows={3}
                value={blockDCms.overview?.leadParagraph2 || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  overview: { ...blockDCms.overview, leadParagraph2: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Overview CTA Prompt</label>
                <input
                  type="text"
                  value={blockDCms.overview?.ctaStripText || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    overview: { ...blockDCms.overview, ctaStripText: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">WhatsApp Number</label>
                <input
                  type="text"
                  value={blockDCms.overview?.ctaWhatsapp || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    overview: { ...blockDCms.overview, ctaWhatsapp: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Direct Call Number</label>
                <input
                  type="text"
                  value={blockDCms.overview?.ctaCall || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    overview: { ...blockDCms.overview, ctaCall: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. LOCATION & TRAVEL TIMES MATRIX                         */}
      {/* ========================================================= */}
      {activeCategory === 'location' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            3. Location, Routes & Travel Times Matrix
          </h4>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Section Heading</label>
              <input
                type="text"
                value={blockDCms.location?.heading || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  location: { ...blockDCms.location, heading: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Lead Narrative</label>
              <textarea
                rows={3}
                value={blockDCms.location?.leadParagraph || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  location: { ...blockDCms.location, leadParagraph: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Google Maps Embed URL</label>
              <input
                type="text"
                value={blockDCms.location?.googleMapIframeUrl || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  location: { ...blockDCms.location, googleMapIframeUrl: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono text-slate-800"
              />
            </div>

            {/* Travel Times Table Builder */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-serif font-bold text-sm text-slate-900">Travel Times Matrix</h5>
                <button
                  type="button"
                  onClick={() => {
                    const newRow: BlockDTravelTimeItem = {
                      destination: 'New Destination',
                      distance: '5.0 km',
                      time: '7 Mins',
                      note: 'Direct route access'
                    };
                    setBlockDCms({
                      ...blockDCms,
                      location: {
                        ...blockDCms.location,
                        travelTimes: [...(blockDCms.location.travelTimes || []), newRow]
                      }
                    });
                  }}
                  className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Destination</span>
                </button>
              </div>

              <div className="space-y-3">
                {(blockDCms.location?.travelTimes || []).map((t, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-4 space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Destination</label>
                      <input
                        type="text"
                        value={t.destination}
                        onChange={(e) => {
                          const updated = [...blockDCms.location.travelTimes];
                          updated[idx].destination = e.target.value;
                          setBlockDCms({
                            ...blockDCms,
                            location: { ...blockDCms.location, travelTimes: updated }
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Distance</label>
                      <input
                        type="text"
                        value={t.distance}
                        onChange={(e) => {
                          const updated = [...blockDCms.location.travelTimes];
                          updated[idx].distance = e.target.value;
                          setBlockDCms({
                            ...blockDCms,
                            location: { ...blockDCms.location, travelTimes: updated }
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Drive Time</label>
                      <input
                        type="text"
                        value={t.time}
                        onChange={(e) => {
                          const updated = [...blockDCms.location.travelTimes];
                          updated[idx].time = e.target.value;
                          setBlockDCms({
                            ...blockDCms,
                            location: { ...blockDCms.location, travelTimes: updated }
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-emerald-700"
                      />
                    </div>
                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Route Note</label>
                      <input
                        type="text"
                        value={t.note}
                        onChange={(e) => {
                          const updated = [...blockDCms.location.travelTimes];
                          updated[idx].note = e.target.value;
                          setBlockDCms({
                            ...blockDCms,
                            location: { ...blockDCms.location, travelTimes: updated }
                          });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="sm:col-span-1 flex justify-end pt-4 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = blockDCms.location.travelTimes.filter((_, i) => i !== idx);
                          setBlockDCms({
                            ...blockDCms,
                            location: { ...blockDCms.location, travelTimes: updated }
                          });
                        }}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        title="Remove destination"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. MASTER PLAN & SECTOR BLUEPRINT                         */}
      {/* ========================================================= */}
      {activeCategory === 'masterPlan' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            4. Master Plan & Sector Blueprint
          </h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Heading</label>
                <input
                  type="text"
                  value={blockDCms.masterPlan?.heading || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    masterPlan: { ...blockDCms.masterPlan, heading: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Subline</label>
                <input
                  type="text"
                  value={blockDCms.masterPlan?.subline || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    masterPlan: { ...blockDCms.masterPlan, subline: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Description</label>
              <textarea
                rows={3}
                value={blockDCms.masterPlan?.description || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  masterPlan: { ...blockDCms.masterPlan, description: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Boulevard & Road Dimensions Specs Note</label>
              <textarea
                rows={2}
                value={blockDCms.masterPlan?.boulevardSpecsNote || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  masterPlan: { ...blockDCms.masterPlan, boulevardSpecsNote: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Map Image URL</label>
                <input
                  type="text"
                  value={blockDCms.masterPlan?.mapImage || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    masterPlan: { ...blockDCms.masterPlan, mapImage: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">PDF Download URL</label>
                <input
                  type="text"
                  value={blockDCms.masterPlan?.pdfDownloadUrl || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    masterPlan: { ...blockDCms.masterPlan, pdfDownloadUrl: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. 6 INVESTMENT REASONS & VALUE PROPOSITIONS              */}
      {/* ========================================================= */}
      {activeCategory === 'whyInvest' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-serif font-bold text-lg text-slate-900">
              5. 6 Core Investment Reasons & Value Propositions
            </h4>
            <button
              type="button"
              onClick={() => {
                const newReason: BlockDWhyInvestItem = {
                  title: 'New Investment Reason',
                  desc: 'Detailed description of this unique advantage.',
                  tag: 'Advantage',
                  bg: 'bg-rose-50',
                  text: 'text-[#7b002c]',
                  border: 'border-rose-100'
                };
                const currentWhy = blockDCms.whyInvestSection || initialBlockDCMS.whyInvestSection || { heading: 'Why Invest in Block D', subline: '', reasons: [] };
                setBlockDCms({
                  ...blockDCms,
                  whyInvestSection: {
                    heading: currentWhy.heading || 'Why Invest in Block D',
                    subline: currentWhy.subline || '',
                    reasons: [...(currentWhy.reasons || []), newReason]
                  }
                });
              }}
              className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Reason Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(blockDCms.whyInvestSection?.reasons || []).map((reason, idx) => (
              <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const currentWhy = blockDCms.whyInvestSection || initialBlockDCMS.whyInvestSection || { heading: 'Why Invest in Block D', subline: '', reasons: [] };
                    const updated = (currentWhy.reasons || []).filter((_, i) => i !== idx);
                    setBlockDCms({
                      ...blockDCms,
                      whyInvestSection: {
                        heading: currentWhy.heading || 'Why Invest in Block D',
                        subline: currentWhy.subline || '',
                        reasons: updated
                      }
                    });
                  }}
                  className="absolute top-4 right-4 p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer"
                  title="Remove card"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="space-y-1 pr-8">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Title</label>
                  <input
                    type="text"
                    value={reason.title}
                    onChange={(e) => {
                      const currentWhy = blockDCms.whyInvestSection || initialBlockDCMS.whyInvestSection || { heading: 'Why Invest in Block D', subline: '', reasons: [] };
                      const updated = [...(currentWhy.reasons || [])];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setBlockDCms({
                        ...blockDCms,
                        whyInvestSection: {
                          heading: currentWhy.heading || 'Why Invest in Block D',
                          subline: currentWhy.subline || '',
                          reasons: updated
                        }
                      });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tag / Badge</label>
                  <input
                    type="text"
                    value={reason.tag}
                    onChange={(e) => {
                      const currentWhy = blockDCms.whyInvestSection || initialBlockDCMS.whyInvestSection || { heading: 'Why Invest in Block D', subline: '', reasons: [] };
                      const updated = [...(currentWhy.reasons || [])];
                      updated[idx] = { ...updated[idx], tag: e.target.value };
                      setBlockDCms({
                        ...blockDCms,
                        whyInvestSection: {
                          heading: currentWhy.heading || 'Why Invest in Block D',
                          subline: currentWhy.subline || '',
                          reasons: updated
                        }
                      });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                  <textarea
                    rows={3}
                    value={reason.desc}
                    onChange={(e) => {
                      const currentWhy = blockDCms.whyInvestSection || initialBlockDCMS.whyInvestSection || { heading: 'Why Invest in Block D', subline: '', reasons: [] };
                      const updated = [...(currentWhy.reasons || [])];
                      updated[idx] = { ...updated[idx], desc: e.target.value };
                      setBlockDCms({
                        ...blockDCms,
                        whyInvestSection: {
                          heading: currentWhy.heading || 'Why Invest in Block D',
                          subline: currentWhy.subline || '',
                          reasons: updated
                        }
                      });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. PRICE SCHEDULE & MARKET RATES MATRIX                   */}
      {/* ========================================================= */}
      {activeCategory === 'priceSchedule' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                6. Plot Prices & Current Market Rates Schedule
              </h4>
              <p className="text-xs text-slate-500">
                Edit row dimensions, covered area, category, price band, and possession status.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newRow: BlockDPriceRow = {
                  size: 'New Cut',
                  dimensions: '30 × 50',
                  sqYards: '167 Sq. Yds',
                  sqFeet: '1,500 Sq. Ft',
                  category: 'Residential',
                  priceRange: 'PKR 50 Lacs – 60 Lacs',
                  possession: 'Development 85%',
                  highlight: 'New plot specification row'
                };
                setBlockDCms({
                  ...blockDCms,
                  priceScheduleSection: {
                    ...blockDCms.priceScheduleSection,
                    tableRows: [...(blockDCms.priceScheduleSection.tableRows || []), newRow]
                  }
                });
              }}
              className="px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Price Row</span>
            </button>
          </div>

          <div className="space-y-4">
            {(blockDCms.priceScheduleSection?.tableRows || []).map((row, idx) => (
              <div key={idx} className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#7b002c]">
                    Row #{idx + 1}: {row.size} ({row.category})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = blockDCms.priceScheduleSection.tableRows.filter((_, i) => i !== idx);
                      setBlockDCms({
                        ...blockDCms,
                        priceScheduleSection: { ...blockDCms.priceScheduleSection, tableRows: updated }
                      });
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer"
                    title="Delete row"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Plot Size</label>
                    <input
                      type="text"
                      value={row.size}
                      onChange={(e) => {
                        const updated = [...blockDCms.priceScheduleSection.tableRows];
                        updated[idx].size = e.target.value;
                        setBlockDCms({
                          ...blockDCms,
                          priceScheduleSection: { ...blockDCms.priceScheduleSection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Dimensions</label>
                    <input
                      type="text"
                      value={row.dimensions}
                      onChange={(e) => {
                        const updated = [...blockDCms.priceScheduleSection.tableRows];
                        updated[idx].dimensions = e.target.value;
                        setBlockDCms({
                          ...blockDCms,
                          priceScheduleSection: { ...blockDCms.priceScheduleSection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Sq. Yards</label>
                    <input
                      type="text"
                      value={row.sqYards}
                      onChange={(e) => {
                        const updated = [...blockDCms.priceScheduleSection.tableRows];
                        updated[idx].sqYards = e.target.value;
                        setBlockDCms({
                          ...blockDCms,
                          priceScheduleSection: { ...blockDCms.priceScheduleSection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Sq. Feet</label>
                    <input
                      type="text"
                      value={row.sqFeet}
                      onChange={(e) => {
                        const updated = [...blockDCms.priceScheduleSection.tableRows];
                        updated[idx].sqFeet = e.target.value;
                        setBlockDCms({
                          ...blockDCms,
                          priceScheduleSection: { ...blockDCms.priceScheduleSection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Category</label>
                    <select
                      value={row.category}
                      onChange={(e) => {
                        const updated = [...blockDCms.priceScheduleSection.tableRows];
                        updated[idx].category = e.target.value as 'Residential' | 'Commercial';
                        setBlockDCms({
                          ...blockDCms,
                          priceScheduleSection: { ...blockDCms.priceScheduleSection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Price Range</label>
                    <input
                      type="text"
                      value={row.priceRange}
                      onChange={(e) => {
                        const updated = [...blockDCms.priceScheduleSection.tableRows];
                        updated[idx].priceRange = e.target.value;
                        setBlockDCms({
                          ...blockDCms,
                          priceScheduleSection: { ...blockDCms.priceScheduleSection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Possession Status</label>
                    <input
                      type="text"
                      value={row.possession}
                      onChange={(e) => {
                        const updated = [...blockDCms.priceScheduleSection.tableRows];
                        updated[idx].possession = e.target.value;
                        setBlockDCms({
                          ...blockDCms,
                          priceScheduleSection: { ...blockDCms.priceScheduleSection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-emerald-700 font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Highlight / Feature</label>
                    <input
                      type="text"
                      value={row.highlight}
                      onChange={(e) => {
                        const updated = [...blockDCms.priceScheduleSection.tableRows];
                        updated[idx].highlight = e.target.value;
                        setBlockDCms({
                          ...blockDCms,
                          priceScheduleSection: { ...blockDCms.priceScheduleSection, tableRows: updated }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. AMENITIES & COMMUNITY INFRASTRUCTURE                   */}
      {/* ========================================================= */}
      {activeCategory === 'amenities' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                7. Planned Amenities & Community Infrastructure
              </h4>
              <p className="text-xs text-slate-500">
                Manage titles, descriptions, feature bullet lists, and image paths.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newAmenity: BlockDAmenityItem = {
                  id: `amenity-${Date.now()}`,
                  title: 'New Community Facility',
                  category: 'lifestyle',
                  description: 'Description of the planned amenity facility.',
                  image: '/images/faisal-hills-glow-park.webp',
                  tag: 'Planned Facility',
                  features: ['Feature 1', 'Feature 2', 'Feature 3']
                };
                const currentAmen = blockDCms.amenitiesSection || initialBlockDCMS.amenitiesSection || { heading: 'Amenities in Block D', subline: '', amenitiesList: [] };
                setBlockDCms({
                  ...blockDCms,
                  amenitiesSection: {
                    heading: currentAmen.heading || 'Amenities in Block D',
                    subline: currentAmen.subline || '',
                    amenitiesList: [...(currentAmen.amenitiesList || []), newAmenity]
                  }
                });
              }}
              className="px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Amenity</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(blockDCms.amenitiesSection?.amenitiesList || []).map((amen, idx) => (
              <div key={amen.id || idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const currentAmen = blockDCms.amenitiesSection || initialBlockDCMS.amenitiesSection || { heading: 'Amenities in Block D', subline: '', amenitiesList: [] };
                    const updated = (currentAmen.amenitiesList || []).filter((_, i) => i !== idx);
                    setBlockDCms({
                      ...blockDCms,
                      amenitiesSection: {
                        heading: currentAmen.heading || 'Amenities in Block D',
                        subline: currentAmen.subline || '',
                        amenitiesList: updated
                      }
                    });
                  }}
                  className="absolute top-4 right-4 p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer"
                  title="Remove amenity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="space-y-1 pr-8">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Title</label>
                  <input
                    type="text"
                    value={amen.title}
                    onChange={(e) => {
                      const currentAmen = blockDCms.amenitiesSection || initialBlockDCMS.amenitiesSection || { heading: 'Amenities in Block D', subline: '', amenitiesList: [] };
                      const updated = [...(currentAmen.amenitiesList || [])];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setBlockDCms({
                        ...blockDCms,
                        amenitiesSection: {
                          heading: currentAmen.heading || 'Amenities in Block D',
                          subline: currentAmen.subline || '',
                          amenitiesList: updated
                        }
                      });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Category Tag</label>
                    <input
                      type="text"
                      value={amen.tag}
                      onChange={(e) => {
                        const currentAmen = blockDCms.amenitiesSection || initialBlockDCMS.amenitiesSection || { heading: 'Amenities in Block D', subline: '', amenitiesList: [] };
                        const updated = [...(currentAmen.amenitiesList || [])];
                        updated[idx] = { ...updated[idx], tag: e.target.value };
                        setBlockDCms({
                          ...blockDCms,
                          amenitiesSection: {
                            heading: currentAmen.heading || 'Amenities in Block D',
                            subline: currentAmen.subline || '',
                            amenitiesList: updated
                          }
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Category Type</label>
                    <select
                      value={amen.category}
                      onChange={(e) => {
                        const currentAmen = blockDCms.amenitiesSection || initialBlockDCMS.amenitiesSection || { heading: 'Amenities in Block D', subline: '', amenitiesList: [] };
                        const updated = [...(currentAmen.amenitiesList || [])];
                        updated[idx] = { ...updated[idx], category: e.target.value as any };
                        setBlockDCms({
                          ...blockDCms,
                          amenitiesSection: {
                            heading: currentAmen.heading || 'Amenities in Block D',
                            subline: currentAmen.subline || '',
                            amenitiesList: updated
                          }
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    >
                      <option value="nature">nature</option>
                      <option value="lifestyle">lifestyle</option>
                      <option value="infrastructure">infrastructure</option>
                      <option value="utilities">utilities</option>
                      <option value="security">security</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Image URL</label>
                  <input
                    type="text"
                    value={amen.image}
                    onChange={(e) => {
                      const currentAmen = blockDCms.amenitiesSection || initialBlockDCMS.amenitiesSection || { heading: 'Amenities in Block D', subline: '', amenitiesList: [] };
                      const updated = [...(currentAmen.amenitiesList || [])];
                      updated[idx] = { ...updated[idx], image: e.target.value };
                      setBlockDCms({
                        ...blockDCms,
                        amenitiesSection: {
                          heading: currentAmen.heading || 'Amenities in Block D',
                          subline: currentAmen.subline || '',
                          amenitiesList: updated
                        }
                      });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={amen.description}
                    onChange={(e) => {
                      const currentAmen = blockDCms.amenitiesSection || initialBlockDCMS.amenitiesSection || { heading: 'Amenities in Block D', subline: '', amenitiesList: [] };
                      const updated = [...(currentAmen.amenitiesList || [])];
                      updated[idx] = { ...updated[idx], description: e.target.value };
                      setBlockDCms({
                        ...blockDCms,
                        amenitiesSection: {
                          heading: currentAmen.heading || 'Amenities in Block D',
                          subline: currentAmen.subline || '',
                          amenitiesList: updated
                        }
                      });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Features (Comma Separated)</label>
                  <input
                    type="text"
                    value={(amen.features || []).join(', ')}
                    onChange={(e) => {
                      const currentAmen = blockDCms.amenitiesSection || initialBlockDCMS.amenitiesSection || { heading: 'Amenities in Block D', subline: '', amenitiesList: [] };
                      const updated = [...(currentAmen.amenitiesList || [])];
                      updated[idx] = { ...updated[idx], features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) };
                      setBlockDCms({
                        ...blockDCms,
                        amenitiesSection: {
                          heading: currentAmen.heading || 'Amenities in Block D',
                          subline: currentAmen.subline || '',
                          amenitiesList: updated
                        }
                      });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. DEVELOPMENT MILESTONES & SITE PROGRESS                 */}
      {/* ========================================================= */}
      {activeCategory === 'milestones' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                8. On-Ground Development Milestones & Progress Tracking
              </h4>
              <p className="text-xs text-slate-500">
                Update progress percentages, completion status, and site verification descriptions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newMilestone: BlockDDevelopmentMilestone = {
                  title: 'New Milestone Item',
                  progress: 85,
                  status: 'In Progress',
                  desc: 'Construction and utility testing currently underway.',
                  image: '/images/faisal-hills-drone-view.webp'
                };
                const currentMs = blockDCms.developmentMilestonesSection || initialBlockDCMS.developmentMilestonesSection || { heading: 'Development Milestones in Block D', subline: '', milestonesList: [] };
                setBlockDCms({
                  ...blockDCms,
                  developmentMilestonesSection: {
                    heading: currentMs.heading || 'Development Milestones in Block D',
                    subline: currentMs.subline || '',
                    milestonesList: [...(currentMs.milestonesList || []), newMilestone]
                  }
                });
              }}
              className="px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Milestone</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(blockDCms.developmentMilestonesSection?.milestonesList || []).map((ms, idx) => (
              <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const currentMs = blockDCms.developmentMilestonesSection || initialBlockDCMS.developmentMilestonesSection || { heading: 'Development Milestones in Block D', subline: '', milestonesList: [] };
                    const updated = (currentMs.milestonesList || []).filter((_, i) => i !== idx);
                    setBlockDCms({
                      ...blockDCms,
                      developmentMilestonesSection: {
                        heading: currentMs.heading || 'Development Milestones in Block D',
                        subline: currentMs.subline || '',
                        milestonesList: updated
                      }
                    });
                  }}
                  className="absolute top-4 right-4 p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer"
                  title="Remove milestone"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="space-y-1 pr-8">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Milestone Title</label>
                  <input
                    type="text"
                    value={ms.title}
                    onChange={(e) => {
                      const currentMs = blockDCms.developmentMilestonesSection || initialBlockDCMS.developmentMilestonesSection || { heading: 'Development Milestones in Block D', subline: '', milestonesList: [] };
                      const updated = [...(currentMs.milestonesList || [])];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setBlockDCms({
                        ...blockDCms,
                        developmentMilestonesSection: {
                          heading: currentMs.heading || 'Development Milestones in Block D',
                          subline: currentMs.subline || '',
                          milestonesList: updated
                        }
                      });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Progress ({ms.progress}%)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ms.progress}
                      onChange={(e) => {
                        const currentMs = blockDCms.developmentMilestonesSection || initialBlockDCMS.developmentMilestonesSection || { heading: 'Development Milestones in Block D', subline: '', milestonesList: [] };
                        const updated = [...(currentMs.milestonesList || [])];
                        updated[idx] = { ...updated[idx], progress: Number(e.target.value) };
                        setBlockDCms({
                          ...blockDCms,
                          developmentMilestonesSection: {
                            heading: currentMs.heading || 'Development Milestones in Block D',
                            subline: currentMs.subline || '',
                            milestonesList: updated
                          }
                        });
                      }}
                      className="w-full accent-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Status Text</label>
                    <input
                      type="text"
                      value={ms.status}
                      onChange={(e) => {
                        const currentMs = blockDCms.developmentMilestonesSection || initialBlockDCMS.developmentMilestonesSection || { heading: 'Development Milestones in Block D', subline: '', milestonesList: [] };
                        const updated = [...(currentMs.milestonesList || [])];
                        updated[idx] = { ...updated[idx], status: e.target.value };
                        setBlockDCms({
                          ...blockDCms,
                          developmentMilestonesSection: {
                            heading: currentMs.heading || 'Development Milestones in Block D',
                            subline: currentMs.subline || '',
                            milestonesList: updated
                          }
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={ms.desc}
                    onChange={(e) => {
                      const currentMs = blockDCms.developmentMilestonesSection || initialBlockDCMS.developmentMilestonesSection || { heading: 'Development Milestones in Block D', subline: '', milestonesList: [] };
                      const updated = [...(currentMs.milestonesList || [])];
                      updated[idx] = { ...updated[idx], desc: e.target.value };
                      setBlockDCms({
                        ...blockDCms,
                        developmentMilestonesSection: {
                          heading: currentMs.heading || 'Development Milestones in Block D',
                          subline: currentMs.subline || '',
                          milestonesList: updated
                        }
                      });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Site Image URL</label>
                  <input
                    type="text"
                    value={ms.image}
                    onChange={(e) => {
                      const currentMs = blockDCms.developmentMilestonesSection || initialBlockDCMS.developmentMilestonesSection || { heading: 'Development Milestones in Block D', subline: '', milestonesList: [] };
                      const updated = [...(currentMs.milestonesList || [])];
                      updated[idx] = { ...updated[idx], image: e.target.value };
                      setBlockDCms({
                        ...blockDCms,
                        developmentMilestonesSection: {
                          heading: currentMs.heading || 'Development Milestones in Block D',
                          subline: currentMs.subline || '',
                          milestonesList: updated
                        }
                      });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. FAQS ACCORDION SECTION                                 */}
      {/* ========================================================= */}
      {activeCategory === 'faqs' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                9. Block D Frequently Asked Questions (Accordion)
              </h4>
              <p className="text-xs text-slate-500">
                Add, edit, or remove Q&As shown on the live Block D page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newFaq = {
                  q: 'New Question about Block D?',
                  a: 'Detailed verified answer for this question.'
                };
                setBlockDCms({
                  ...blockDCms,
                  faqsSection: {
                    ...blockDCms.faqsSection,
                    faqs: [...(blockDCms.faqsSection.faqs || []), newFaq]
                  }
                });
              }}
              className="px-3.5 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-4">
            {(blockDCms.faqsSection?.faqs || []).map((faq, idx) => (
              <div key={idx} className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const updated = blockDCms.faqsSection.faqs.filter((_, i) => i !== idx);
                    setBlockDCms({
                      ...blockDCms,
                      faqsSection: { ...blockDCms.faqsSection, faqs: updated }
                    });
                  }}
                  className="absolute top-4 right-4 p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer"
                  title="Remove FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="space-y-1 pr-8">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Question #{idx + 1}</label>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => {
                      const updated = [...blockDCms.faqsSection.faqs];
                      updated[idx].q = e.target.value;
                      setBlockDCms({
                        ...blockDCms,
                        faqsSection: { ...blockDCms.faqsSection, faqs: updated }
                      });
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Answer</label>
                  <textarea
                    rows={3}
                    value={faq.a}
                    onChange={(e) => {
                      const updated = [...blockDCms.faqsSection.faqs];
                      updated[idx].a = e.target.value;
                      setBlockDCms({
                        ...blockDCms,
                        faqsSection: { ...blockDCms.faqsSection, faqs: updated }
                      });
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. CLOSING CONSULTATION & INQUIRY DESK                   */}
      {/* ========================================================= */}
      {activeCategory === 'closing' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h4 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            10. Consultation Desk & Booking Form Configuration
          </h4>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Section Title</label>
              <input
                type="text"
                value={blockDCms.closingSiteVisitSection?.heading || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  closingSiteVisitSection: { ...blockDCms.closingSiteVisitSection, heading: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Intro Copy</label>
              <textarea
                rows={3}
                value={blockDCms.closingSiteVisitSection?.intro || ''}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  closingSiteVisitSection: { ...blockDCms.closingSiteVisitSection, intro: e.target.value }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Feature Bullets (1 per line)</label>
              <textarea
                rows={3}
                value={(blockDCms.closingSiteVisitSection?.featureBullets || []).join('\n')}
                onChange={(e) => setBlockDCms({
                  ...blockDCms,
                  closingSiteVisitSection: {
                    ...blockDCms.closingSiteVisitSection,
                    featureBullets: e.target.value.split('\n').filter(Boolean)
                  }
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs leading-relaxed font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Submit Button Text</label>
                <input
                  type="text"
                  value={blockDCms.closingSiteVisitSection?.formButtonText || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    closingSiteVisitSection: { ...blockDCms.closingSiteVisitSection, formButtonText: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Reviewed By Disclaimer Note</label>
                <input
                  type="text"
                  value={blockDCms.closingSiteVisitSection?.reviewedByNote || ''}
                  onChange={(e) => setBlockDCms({
                    ...blockDCms,
                    closingSiteVisitSection: { ...blockDCms.closingSiteVisitSection, reviewedByNote: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
