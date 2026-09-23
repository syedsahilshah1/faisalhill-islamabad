'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Save, RefreshCw, CheckCircle2, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp,
  Image as ImageIcon, Sparkles, Building2, MapPin, Layers, PhoneCall, MessageCircle, HelpCircle,
  Star, ShieldCheck, Eye, Compass, Award, FileText, Check, DollarSign, ListChecks,
  Upload, Camera, Link2, X
} from 'lucide-react';
import {
  HomepageCMSData,
  initialHomepageCMS,
  fetchHomepageCMS,
  saveHomepageCMS,
  apiUpdateSetting,
  WhyInvestItem,
  AmenityCardItem,
  TestimonialItem,
  InfraCarouselItem,
  LandmarkCardItem,
  BlockSupplyItem,
  PlotMarketRateItem,
  FaqItem
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
          className="text-[11px] text-[#7b002c] hover:underline font-medium flex items-center gap-1 cursor-pointer"
        >
          <Link2 className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL' : 'Direct URL / Path'}</span>
        </button>
      </div>

      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        {value ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative w-24 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden border border-slate-300 bg-slate-900 shrink-0 shadow-sm group">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/faisal-hills-site-header.webp';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {value.startsWith('data:') ? 'Uploaded from Device (Saved)' : value}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="file"
                  ref={inputRef}
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={uploading}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5 text-[#7b002c]" />
                  <span>{uploading ? 'Processing...' : 'Change Photo'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 border-2 border-dashed border-slate-300 hover:border-[#7b002c]/60 rounded-xl bg-white transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#7b002c] flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">No Image Uploaded</p>
                <p className="text-[11px] text-slate-500">{helper}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="file"
                ref={inputRef}
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="w-full sm:w-auto px-4 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Processing...' : 'Upload from Device / Mobile'}</span>
              </button>
            </div>
          </div>
        )}

        {showUrlInput && (
          <div className="pt-2 border-t border-slate-200/60 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Direct Image URL / Path:
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-[#7b002c]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface HomepageCmsTabProps {
  token: string | null;
}

export default function HomepageCmsTab({ token }: HomepageCmsTabProps) {
  const [cms, setCms] = useState<HomepageCMSData>(initialHomepageCMS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchHomepageCMS().then((data) => {
      if (data) setCms(data);
      setLoading(false);
    }).catch((err) => {
      console.error('Failed to fetch homepage CMS:', err);
      setLoading(false);
    });
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // 1. Save locally & dispatch custom event
      saveHomepageCMS(cms);

      // 2. Persist to backend database if token is available
      if (token) {
        await apiUpdateSetting('homepage_cms', cms, token);
      }

      showNotification('success', 'Homepage content published successfully!');
    } catch (err: any) {
      console.error('Failed to publish homepage CMS:', err);
      showNotification('success', 'Changes saved to client cache! (Backend sync pending)');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all homepage text and sections to the default specifications?')) {
      setCms(initialHomepageCMS);
      saveHomepageCMS(initialHomepageCMS);
      showNotification('success', 'Homepage reset to standard default copy.');
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#7b002c] mb-3" />
        <p className="text-sm font-semibold">Loading Homepage CMS...</p>
      </div>
    );
  }

  const sectionsList = [
    { id: 'hero', label: '1. Hero Banner & Form' },
    { id: 'statsBand', label: '2. Stats Band Bar' },
    { id: 'ticker', label: '3. Announcement Ticker' },
    { id: 'chairman', label: '4. Chairman & Zedem' },
    { id: 'overview', label: '5. Society Overview' },
    { id: 'location', label: '6. Location & Google Map' },
    { id: 'landmarks', label: '7. Nearby Landmarks' },
    { id: 'masterPlan', label: '8. Master Plan Map' },
    { id: 'blocksSection', label: '9. Blocks & Sectors' },
    { id: 'plotsForSale', label: '10. Plots For Sale CTA' },
    { id: 'flagships', label: '11. Flagship Projects' },
    { id: 'paymentPlan', label: '12. Payment Plan & Rates' },
    { id: 'bookingSteps', label: '13. Booking Steps Guide' },
    { id: 'whyInvest', label: '14. Why Invest Benefits' },
    { id: 'amenities', label: '15. Amenities & Facilities' },
    { id: 'testimonials', label: '16. Investor Testimonials' },
    { id: 'infrastructure', label: '17. Infrastructure Updates' },
    { id: 'discoverFtStats', label: '18. Group Scale Numbers' },
    { id: 'faqs', label: '19. FAQs (FAQPage Schema)' },
    { id: 'finalCta', label: '20. Final Action Banner' },
    { id: 'footer', label: '21. Footer Notes & Disclaimer' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-[#7b002c] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-[#7b002c]" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Homepage CMS &amp; Visual Editor
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Live Dynamic Content
            </span>
          </div>
          <p className="text-xs text-slate-500 font-sans">
            Customize 100% of the homepage copy, images, numbers, FAQs, why invest cards, and investor testimonials.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            title="Reset to defaults"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#7b002c] hover:bg-[#9e1245] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Publishing...' : 'Publish to Live Site'}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-semibold ${
          notification.type === 'success'
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
            : 'bg-rose-50 border border-rose-200 text-rose-900'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Editor Layout: Sidebar navigation for sections + Editor form */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm self-start">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 block">
            Homepage Sections
          </span>
          {sectionsList.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-[#7b002c] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{sec.label}</span>
              {activeSection === sec.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>

        {/* Section Editor Body */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* 1. HERO BANNER */}
          {activeSection === 'hero' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Hero Section (Top Main Banner)</h3>
                <p className="text-xs text-slate-500">Includes the primary H1 title, badge, subtitle, form headers, and background image.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Top Badge Tag (Optional)</label>
                  <input
                    type="text"
                    value={cms.hero.badge || ''}
                    placeholder="Leave blank to hide"
                    onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, badge: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Primary &lt;h1&gt; Main Headline</label>
                  <input
                    type="text"
                    value={cms.hero.h1}
                    onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, h1: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Hero Subtitle / Description</label>
                  <textarea
                    rows={3}
                    value={cms.hero.subtitle}
                    onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, subtitle: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Form Title</label>
                    <input
                      type="text"
                      value={cms.hero.formTitle}
                      onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, formTitle: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Form Subtitle</label>
                    <input
                      type="text"
                      value={cms.hero.formSubtitle}
                      onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, formSubtitle: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Trust Guarantee Line</label>
                  <input
                    type="text"
                    value={cms.hero.trustLine}
                    onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, trustLine: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <ImageUploader
                  label="Hero Background Image"
                  value={cms.hero.bgImage}
                  onChange={(val) => setCms({ ...cms, hero: { ...cms.hero, bgImage: val } })}
                  placeholder="/images/faisal-hills-site-header.webp"
                />
              </div>
            </div>
          )}

          {/* 2. STATS BAND */}
          {activeSection === 'statsBand' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Stats Band (5 Key Milestone Numbers)</h3>
                <p className="text-xs text-slate-500">Edit values and labels displayed directly under the Hero banner.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(['stat1', 'stat2', 'stat3', 'stat4', 'stat5'] as const).map((key, idx) => (
                  <div key={key} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b002c]">Stat Card #{idx + 1}</span>
                    <input
                      type="text"
                      value={cms.statsBand[key].value}
                      onChange={(e) => setCms({
                        ...cms,
                        statsBand: {
                          ...cms.statsBand,
                          [key]: { ...cms.statsBand[key], value: e.target.value }
                        }
                      })}
                      placeholder="Value (e.g. 11,823)"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={cms.statsBand[key].label}
                      onChange={(e) => setCms({
                        ...cms,
                        statsBand: {
                          ...cms.statsBand,
                          [key]: { ...cms.statsBand[key], label: e.target.value }
                        }
                      })}
                      placeholder="Label (e.g. KANALS RDA-APPROVED)"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. TICKER */}
          {activeSection === 'ticker' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Announcement Ticker Items</h3>
                  <p className="text-xs text-slate-500">Manage items shown in the live continuous scrolling ticker ribbon.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCms({ ...cms, tickerItems: [...cms.tickerItems, 'New Announcement Highlight'] })}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="space-y-3">
                {cms.tickerItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 text-xs text-slate-400 font-mono">#{idx + 1}</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...cms.tickerItems];
                        updated[idx] = e.target.value;
                        setCms({ ...cms, tickerItems: updated });
                      }}
                      className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                    <button
                      type="button"
                      onClick={() => setCms({ ...cms, tickerItems: cms.tickerItems.filter((_, i) => i !== idx) })}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CHAIRMAN & ZEDEM */}
          {activeSection === 'chairman' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Chairman &amp; Zedem Vision Section</h3>
                <p className="text-xs text-slate-500">Quotes, executive statements, and portrait images from Mr. Abdul Majeed.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                  <input
                    type="text"
                    value={cms.chairman.h2}
                    onChange={(e) => setCms({ ...cms, chairman: { ...cms.chairman, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Quote Headline</label>
                  <input
                    type="text"
                    value={cms.chairman.quoteTitle}
                    onChange={(e) => setCms({ ...cms, chairman: { ...cms.chairman, quoteTitle: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Visible Paragraph</label>
                  <textarea
                    rows={3}
                    value={cms.chairman.visibleParagraph}
                    onChange={(e) => setCms({ ...cms, chairman: { ...cms.chairman, visibleParagraph: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Expanded Read More Text</label>
                  <textarea
                    rows={3}
                    value={cms.chairman.expandedParagraph}
                    onChange={(e) => setCms({ ...cms, chairman: { ...cms.chairman, expandedParagraph: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Button Text</label>
                    <input
                      type="text"
                      value={cms.chairman.buttonText}
                      onChange={(e) => setCms({ ...cms, chairman: { ...cms.chairman, buttonText: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Button Link</label>
                    <input
                      type="text"
                      value={cms.chairman.buttonLink}
                      onChange={(e) => setCms({ ...cms, chairman: { ...cms.chairman, buttonLink: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Image Alt Text</label>
                  <input
                    type="text"
                    value={cms.chairman.imageAlt}
                    onChange={(e) => setCms({ ...cms, chairman: { ...cms.chairman, imageAlt: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <ImageUploader
                  label="Chairman Portrait Image"
                  value={cms.chairman.image}
                  onChange={(val) => setCms({ ...cms, chairman: { ...cms.chairman, image: val } })}
                  placeholder="/images/faisal-hills-site-header.webp"
                />
              </div>
            </div>
          )}

          {/* 5. OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Society Overview Section</h3>
                <p className="text-xs text-slate-500">Introductory master narrative, overview graphic, and callout button.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.overview.label || ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) => setCms({ ...cms, overview: { ...cms.overview, label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Heading</label>
                    <input
                      type="text"
                      value={cms.overview.h2}
                      onChange={(e) => setCms({ ...cms, overview: { ...cms.overview, h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Overview Paragraph</label>
                  <textarea
                    rows={4}
                    value={cms.overview.paragraph}
                    onChange={(e) => setCms({ ...cms, overview: { ...cms.overview, paragraph: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Link Text</label>
                    <input
                      type="text"
                      value={cms.overview.linkText}
                      onChange={(e) => setCms({ ...cms, overview: { ...cms.overview, linkText: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Link URL</label>
                    <input
                      type="text"
                      value={cms.overview.linkHref}
                      onChange={(e) => setCms({ ...cms, overview: { ...cms.overview, linkHref: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Image Alt Text</label>
                  <input
                    type="text"
                    value={cms.overview.imageAlt}
                    onChange={(e) => setCms({ ...cms, overview: { ...cms.overview, imageAlt: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <ImageUploader
                  label="Overview Feature Image"
                  value={cms.overview.image}
                  onChange={(val) => setCms({ ...cms, overview: { ...cms.overview, image: val } })}
                  placeholder="/images/faisal-hills-site-header.webp"
                />
              </div>
            </div>
          )}

          {/* 6. LOCATION & GETTING THERE */}
          {activeSection === 'location' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Location &amp; Access Section</h3>
                <p className="text-xs text-slate-500">GT Road location description, interactive map embed URL, and Getting There access routes.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.location.label || ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) => setCms({ ...cms, location: { ...cms.location, label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Location H2 Heading</label>
                    <input
                      type="text"
                      value={cms.location.h2}
                      onChange={(e) => setCms({ ...cms, location: { ...cms.location, h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Location Paragraph</label>
                  <textarea
                    rows={3}
                    value={cms.location.p1}
                    onChange={(e) => setCms({ ...cms, location: { ...cms.location, p1: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Google Map Embed URL</label>
                  <input
                    type="text"
                    value={cms.location.mapEmbedUrl || ''}
                    onChange={(e) => setCms({ ...cms, location: { ...cms.location, mapEmbedUrl: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Getting There Sub-section */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-slate-900">Getting There (Access Routes Table)</h4>
                      <p className="text-xs text-slate-500">Manage highway routes, connected areas, and verified drive times.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Reset Getting There routes table to default verified routes?')) {
                            setCms({
                              ...cms,
                              gettingThere: initialHomepageCMS.gettingThere
                            });
                            showNotification('success', 'Getting There routes reset to defaults.');
                          }
                        }}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset Routes</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const currentRoutes = cms.gettingThere?.routes || initialHomepageCMS.gettingThere?.routes || [];
                          const newRoute = { route: 'New Highway / Route', connects: 'Connected destination', time: '~10 Mins' };
                          setCms({
                            ...cms,
                            gettingThere: {
                              h3: cms.gettingThere?.h3 || 'Getting There',
                              routes: [...currentRoutes, newRoute],
                              label: undefined
                            }
                          });
                        }}
                        className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Route</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Getting There Heading</label>
                    <input
                      type="text"
                      value={cms.gettingThere?.h3 || 'Getting There'}
                      onChange={(e) => setCms({
                        ...cms,
                        gettingThere: {
                          routes: cms.gettingThere?.routes || initialHomepageCMS.gettingThere?.routes || [],
                          h3: e.target.value,
                          label: undefined
                        }
                      })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>

                  <div className="space-y-3">
                    {(cms.gettingThere?.routes || initialHomepageCMS.gettingThere?.routes || []).map((routeItem, rIdx) => (
                      <div key={rIdx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-12 gap-3 items-center relative">
                        <div className="col-span-12 sm:col-span-4 space-y-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Route Name</label>
                          <input
                            type="text"
                            value={routeItem.route}
                            onChange={(e) => {
                              const list = [...(cms.gettingThere?.routes || initialHomepageCMS.gettingThere?.routes || [])];
                              list[rIdx] = { ...list[rIdx], route: e.target.value };
                              setCms({
                                ...cms,
                                gettingThere: {
                                  h3: cms.gettingThere?.h3 || 'Getting There',
                                  routes: list,
                                  label: undefined
                                }
                              });
                            }}
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                          />
                        </div>

                        <div className="col-span-12 sm:col-span-5 space-y-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Connects You To</label>
                          <input
                            type="text"
                            value={routeItem.connects}
                            onChange={(e) => {
                              const list = [...(cms.gettingThere?.routes || initialHomepageCMS.gettingThere?.routes || [])];
                              list[rIdx] = { ...list[rIdx], connects: e.target.value };
                              setCms({
                                ...cms,
                                gettingThere: {
                                  h3: cms.gettingThere?.h3 || 'Getting There',
                                  routes: list,
                                  label: undefined
                                }
                              });
                            }}
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                          />
                        </div>

                        <div className="col-span-9 sm:col-span-2 space-y-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Drive Time</label>
                          <input
                            type="text"
                            value={routeItem.time}
                            onChange={(e) => {
                              const list = [...(cms.gettingThere?.routes || initialHomepageCMS.gettingThere?.routes || [])];
                              list[rIdx] = { ...list[rIdx], time: e.target.value };
                              setCms({
                                ...cms,
                                gettingThere: {
                                  h3: cms.gettingThere?.h3 || 'Getting There',
                                  routes: list,
                                  label: undefined
                                }
                              });
                            }}
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-[#7b002c]"
                          />
                        </div>

                        <div className="col-span-3 sm:col-span-1 flex justify-end pt-4 sm:pt-0">
                          <button
                            type="button"
                            onClick={() => {
                              const list = (cms.gettingThere?.routes || initialHomepageCMS.gettingThere?.routes || []).filter((_, i) => i !== rIdx);
                              setCms({
                                ...cms,
                                gettingThere: {
                                  h3: cms.gettingThere?.h3 || 'Getting There',
                                  routes: list,
                                  label: undefined
                                }
                              });
                            }}
                            className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg cursor-pointer transition-colors"
                            title="Delete Route"
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

          {/* 7. LANDMARKS */}
          {activeSection === 'landmarks' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Nearby Key Landmarks</h3>
                  <p className="text-xs text-slate-500">Edit section headers, travel time proximity badges, and landmark photos.</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset Nearby Landmarks section to the 5 standard landmarks (Sector B-17/MPCHS, HITEC Univ, UET Taxila, Taxila Museum, Wah Cantt)?')) {
                        setCms({ ...cms, landmarks: initialHomepageCMS.landmarks });
                        showNotification('success', 'Landmarks section reset to standard 5 landmarks.');
                      }
                    }}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Landmarks (5)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const newCard: LandmarkCardItem = {
                        id: `lm-${Date.now()}`,
                        timeBadge: '~5 Mins',
                        title: 'New Landmark Location',
                        subLine: 'Direct expressway access',
                        image: '/images/landmarks/sector-b17-mpchs.webp'
                      };
                      setCms({ ...cms, landmarks: { ...cms.landmarks, cards: [...cms.landmarks.cards, newCard] } });
                    }}
                    className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Landmark Card</span>
                  </button>
                </div>
              </div>

              {/* Section Main Titles & Description */}
              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.landmarks.label || ''}
                      onChange={(e) => setCms({ ...cms, landmarks: { ...cms.landmarks, label: e.target.value } })}
                      placeholder="Leave blank to hide"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                    <input
                      type="text"
                      value={cms.landmarks.h2 || ''}
                      onChange={(e) => setCms({ ...cms, landmarks: { ...cms.landmarks, h2: e.target.value } })}
                      placeholder="e.g. Nearby Landmarks of Faisal Hills"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={cms.landmarks.paragraph || ''}
                    onChange={(e) => setCms({ ...cms, landmarks: { ...cms.landmarks, paragraph: e.target.value } })}
                    placeholder="Brief description explaining travel connectivity and surrounding landmarks..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>
              </div>

              {/* Landmark Cards Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Landmark Cards List</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cms.landmarks.cards.map((card, idx) => (
                  <div key={card.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => setCms({
                        ...cms,
                        landmarks: {
                          ...cms.landmarks,
                          cards: cms.landmarks.cards.filter((_, i) => i !== idx)
                        }
                      })}
                      className="absolute top-3 right-3 text-rose-500 hover:bg-rose-100 p-1 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-bold text-[#7b002c] uppercase">Landmark #{idx + 1}</span>
                    <input
                      type="text"
                      value={card.timeBadge}
                      onChange={(e) => {
                        const updated = [...cms.landmarks.cards];
                        updated[idx].timeBadge = e.target.value;
                        setCms({ ...cms, landmarks: { ...cms.landmarks, cards: updated } });
                      }}
                      placeholder="Time badge (e.g. 5 MINS)"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const updated = [...cms.landmarks.cards];
                        updated[idx].title = e.target.value;
                        setCms({ ...cms, landmarks: { ...cms.landmarks, cards: updated } });
                      }}
                      placeholder="Title (e.g. NUST University)"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={card.subLine}
                      onChange={(e) => {
                        const updated = [...cms.landmarks.cards];
                        updated[idx].subLine = e.target.value;
                        setCms({ ...cms, landmarks: { ...cms.landmarks, cards: updated } });
                      }}
                      placeholder="Subtitle (e.g. 15 km via GT Road)"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <ImageUploader
                      label="Landmark Image"
                      value={card.image}
                      onChange={(val) => {
                        const updated = [...cms.landmarks.cards];
                        updated[idx].image = val;
                        setCms({ ...cms, landmarks: { ...cms.landmarks, cards: updated } });
                      }}
                      placeholder="/images/landmarks/..."
                    />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 8. MASTER PLAN */}
          {activeSection === 'masterPlan' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Master Plan Map Section</h3>
                  <p className="text-xs text-slate-500">Configure SEO narrative, technical society specs, and PDF download options.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset Master Plan section to default SEO copy and specs?')) {
                      setCms({ ...cms, masterPlan: initialHomepageCMS.masterPlan });
                      showNotification('success', 'Master Plan section reset to defaults.');
                    }
                  }}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Master Plan</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.masterPlan.label || ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) => setCms({ ...cms, masterPlan: { ...cms.masterPlan, label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                    <input
                      type="text"
                      value={cms.masterPlan.h2}
                      onChange={(e) => setCms({ ...cms, masterPlan: { ...cms.masterPlan, h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Main Description Paragraph (SEO Keyword-Rich)</label>
                  <textarea
                    rows={4}
                    value={cms.masterPlan.paragraph}
                    onChange={(e) => setCms({ ...cms, masterPlan: { ...cms.masterPlan, paragraph: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Secondary Note / Exploration Sub-line (Optional)</label>
                  <textarea
                    rows={2}
                    value={cms.masterPlan.subParagraph || ''}
                    placeholder="Brief instruction on interactive zoom or vector blueprint..."
                    onChange={(e) => setCms({ ...cms, masterPlan: { ...cms.masterPlan, subParagraph: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Key Spec Highlight Badges (4 Cards) */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-slate-900">Key Society Blueprint Specs (4 Cards)</h4>
                      <p className="text-[11px] text-slate-500">Highlighted badges displayed under the description on the left column.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const currentSpecs = cms.masterPlan.specs || initialHomepageCMS.masterPlan.specs || [];
                        setCms({
                          ...cms,
                          masterPlan: {
                            ...cms.masterPlan,
                            specs: [...currentSpecs, { label: 'Feature Title', value: 'Feature Detail' }]
                          }
                        });
                      }}
                      className="px-3 py-1.5 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Spec Card</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(cms.masterPlan.specs || initialHomepageCMS.masterPlan.specs || []).map((spec, sIdx) => (
                      <div key={sIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative">
                        <button
                          type="button"
                          onClick={() => {
                            const currentSpecs = (cms.masterPlan.specs || initialHomepageCMS.masterPlan.specs || []).filter((_, i) => i !== sIdx);
                            setCms({
                              ...cms,
                              masterPlan: { ...cms.masterPlan, specs: currentSpecs }
                            });
                          }}
                          className="absolute top-2.5 right-2.5 text-rose-500 hover:bg-rose-100 p-1 rounded-lg cursor-pointer transition-colors"
                          title="Delete Spec"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] font-bold text-[#7b002c] uppercase">Spec Card #{sIdx + 1}</span>
                        <input
                          type="text"
                          value={spec.label}
                          onChange={(e) => {
                            const updated = [...(cms.masterPlan.specs || initialHomepageCMS.masterPlan.specs || [])];
                            updated[sIdx] = { ...updated[sIdx], label: e.target.value };
                            setCms({ ...cms, masterPlan: { ...cms.masterPlan, specs: updated } });
                          }}
                          placeholder="Label (e.g. Approved Area)"
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => {
                            const updated = [...(cms.masterPlan.specs || initialHomepageCMS.masterPlan.specs || [])];
                            updated[sIdx] = { ...updated[sIdx], value: e.target.value };
                            setCms({ ...cms, masterPlan: { ...cms.masterPlan, specs: updated } });
                          }}
                          placeholder="Value (e.g. 11,823.5 Kanals)"
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons & Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Download Button Text</label>
                    <input
                      type="text"
                      value={cms.masterPlan.downloadBtnText}
                      onChange={(e) => setCms({ ...cms, masterPlan: { ...cms.masterPlan, downloadBtnText: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Download PDF URL</label>
                    <input
                      type="text"
                      value={cms.masterPlan.downloadPdfUrl}
                      onChange={(e) => setCms({ ...cms, masterPlan: { ...cms.masterPlan, downloadPdfUrl: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Fullscreen Button Text</label>
                  <input
                    type="text"
                    value={cms.masterPlan.fullscreenBtnText || 'Launch Fullscreen Map'}
                    onChange={(e) => setCms({ ...cms, masterPlan: { ...cms.masterPlan, fullscreenBtnText: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 9. BLOCKS & SECTORS */}
          {activeSection === 'blocksSection' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Blocks &amp; Sectors Section</h3>
                  <p className="text-xs text-slate-500">Headers and the comprehensive Blocks, Possession &amp; Plot Supply breakdown table.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newRow: BlockSupplyItem = {
                      id: `blk-sup-${Date.now()}`,
                      block: 'New Block',
                      profile: 'Block profile, orientation and accessibility details.',
                      approxPlots: '1,000+',
                      soldAs: 'Installments',
                      possession: 'In Progress',
                      statusBadge: 'Upcoming'
                    };
                    const existing = cms.blocksSection?.supplyRows || initialHomepageCMS.blocksSection.supplyRows || [];
                    setCms({
                      ...cms,
                      blocksSection: {
                        ...cms.blocksSection,
                        supplyRows: [...existing, newRow]
                      }
                    });
                  }}
                  className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Block Supply Row</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.blocksSection.label || ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) => setCms({ ...cms, blocksSection: { ...cms.blocksSection, label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Heading</label>
                    <input
                      type="text"
                      value={cms.blocksSection.h2}
                      onChange={(e) => setCms({ ...cms, blocksSection: { ...cms.blocksSection, h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Showcase Intro Paragraph</label>
                  <textarea
                    rows={2}
                    value={cms.blocksSection.paragraph}
                    onChange={(e) => setCms({ ...cms, blocksSection: { ...cms.blocksSection, paragraph: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                {/* Plot Supply Table CMS Settings */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h4 className="font-serif font-bold text-sm text-[#7b002c] uppercase tracking-wider">
                    Blocks, Possession &amp; Plot Supply Table Content
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Supply Table Heading</label>
                      <input
                        type="text"
                        value={cms.blocksSection.supplyHeading || 'Blocks, Possession and Plot Supply'}
                        onChange={(e) => setCms({
                          ...cms,
                          blocksSection: {
                            ...cms.blocksSection,
                            supplyHeading: e.target.value
                          }
                        })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Supply Table Subline / Note</label>
                      <input
                        type="text"
                        value={cms.blocksSection.supplySubline || 'The Faisal Hills master plan has eight blocks. Blocks nearest the GT Road are the most developed; blocks further in are newer, cheaper to enter and mostly sold on installments, but at earlier stages of development.'}
                        onChange={(e) => setCms({
                          ...cms,
                          blocksSection: {
                            ...cms.blocksSection,
                            supplySubline: e.target.value
                          }
                        })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>
                  </div>

                  {/* Rows List */}
                  <div className="space-y-3 pt-2">
                    {(cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || []).map((row, idx) => (
                      <div key={row.id || idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative group">
                        <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                          <span className="font-serif font-bold text-xs text-[#7b002c]">
                            #{idx + 1} — {row.block || 'Block Row'}
                          </span>
                          <div className="flex items-center gap-1">
                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const rows = [...(cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || [])];
                                  const temp = rows[idx];
                                  rows[idx] = rows[idx - 1];
                                  rows[idx - 1] = temp;
                                  setCms({ ...cms, blocksSection: { ...cms.blocksSection, supplyRows: rows } });
                                }}
                                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded cursor-pointer"
                                title="Move up"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {idx < (cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || []).length - 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const rows = [...(cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || [])];
                                  const temp = rows[idx];
                                  rows[idx] = rows[idx + 1];
                                  rows[idx + 1] = temp;
                                  setCms({ ...cms, blocksSection: { ...cms.blocksSection, supplyRows: rows } });
                                }}
                                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded cursor-pointer"
                                title="Move down"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                const rows = (cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || []).filter((_, i) => i !== idx);
                                setCms({ ...cms, blocksSection: { ...cms.blocksSection, supplyRows: rows } });
                              }}
                              className="p-1 text-rose-600 hover:bg-rose-100 rounded cursor-pointer"
                              title="Delete row"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-slate-700">Block Name</label>
                            <input
                              type="text"
                              value={row.block}
                              onChange={(e) => {
                                const rows = [...(cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || [])];
                                rows[idx] = { ...rows[idx], block: e.target.value };
                                setCms({ ...cms, blocksSection: { ...cms.blocksSection, supplyRows: rows } });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-slate-700">Approx. Plots</label>
                            <input
                              type="text"
                              value={row.approxPlots}
                              placeholder="e.g. 1,450"
                              onChange={(e) => {
                                const rows = [...(cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || [])];
                                rows[idx] = { ...rows[idx], approxPlots: e.target.value };
                                setCms({ ...cms, blocksSection: { ...cms.blocksSection, supplyRows: rows } });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-slate-700">Sold As</label>
                            <input
                              type="text"
                              value={row.soldAs}
                              placeholder="e.g. Lump sum"
                              onChange={(e) => {
                                const rows = [...(cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || [])];
                                rows[idx] = { ...rows[idx], soldAs: e.target.value };
                                setCms({ ...cms, blocksSection: { ...cms.blocksSection, supplyRows: rows } });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>

                          <div className="space-y-1 sm:col-span-2">
                            <label className="block text-[11px] font-bold text-slate-700">Profile &amp; Highlights</label>
                            <input
                              type="text"
                              value={row.profile}
                              onChange={(e) => {
                                const rows = [...(cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || [])];
                                rows[idx] = { ...rows[idx], profile: e.target.value };
                                setCms({ ...cms, blocksSection: { ...cms.blocksSection, supplyRows: rows } });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-slate-700">Possession Status</label>
                            <input
                              type="text"
                              value={row.possession}
                              placeholder="e.g. Available"
                              onChange={(e) => {
                                const rows = [...(cms.blocksSection.supplyRows || initialHomepageCMS.blocksSection.supplyRows || [])];
                                rows[idx] = { ...rows[idx], possession: e.target.value };
                                setCms({ ...cms, blocksSection: { ...cms.blocksSection, supplyRows: rows } });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 10. PLOTS FOR SALE CTA & MARKET RATES */}
          {activeSection === 'plotsForSale' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Plots For Sale &amp; Current Market Rates</h3>
                  <p className="text-xs text-slate-500">CTA buttons, custom inquiry banners, and open-market benchmark asking price tables.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newRow: PlotMarketRateItem = {
                      id: `rate-${Date.now()}`,
                      block: 'New Block',
                      marla5: 'PKR 45–65 lakh',
                      marla10: 'PKR 0.90–1.30 crore',
                      kanal1: 'PKR 1.50–2.20 crore',
                      statusBadge: 'New Sector'
                    };
                    const existing = cms.plotsForSale?.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || [];
                    setCms({
                      ...cms,
                      plotsForSale: {
                        ...cms.plotsForSale,
                        ratesRows: [...existing, newRow]
                      }
                    });
                  }}
                  className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Rates Row</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                  <input
                    type="text"
                    value={cms.plotsForSale.badge || ''}
                    placeholder="Leave blank to hide"
                    onChange={(e) => setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, badge: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">CTA Banner Heading</label>
                  <input
                    type="text"
                    value={cms.plotsForSale.ctaHeading}
                    onChange={(e) => setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ctaHeading: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">CTA Banner Subtext</label>
                  <textarea
                    rows={2}
                    value={cms.plotsForSale.ctaText}
                    onChange={(e) => setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ctaText: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">WhatsApp Button Text</label>
                    <input
                      type="text"
                      value={cms.plotsForSale.ctaBtn1Text}
                      onChange={(e) => setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ctaBtn1Text: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Directory Button Text</label>
                    <input
                      type="text"
                      value={cms.plotsForSale.ctaBtn2Text}
                      onChange={(e) => setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ctaBtn2Text: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                {/* Rates Table Configuration */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h4 className="font-serif font-bold text-sm text-[#7b002c] uppercase tracking-wider">
                    Plots for Sale: Current Rates Table Content
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Rates Table Heading</label>
                      <input
                        type="text"
                        value={cms.plotsForSale.ratesHeading || 'Plots for Sale in Faisal Hills: Current Rates'}
                        onChange={(e) => setCms({
                          ...cms,
                          plotsForSale: {
                            ...cms.plotsForSale,
                            ratesHeading: e.target.value
                          }
                        })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Rates Table Subline / Note</label>
                      <input
                        type="text"
                        value={cms.plotsForSale.ratesSubline || 'These are open-market asking prices. What a specific plot fetches depends on its position (corner, park-facing or on a main road), how developed its block is, and whether it is a balloted plot or an unballoted file.'}
                        onChange={(e) => setCms({
                          ...cms,
                          plotsForSale: {
                            ...cms.plotsForSale,
                            ratesSubline: e.target.value
                          }
                        })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                      />
                    </div>
                  </div>

                  {/* Rates Rows Editor */}
                  <div className="space-y-3 pt-2">
                    {(cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || []).map((row, idx) => (
                      <div key={row.id || idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative group">
                        <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
                          <span className="font-serif font-bold text-xs text-[#7b002c]">
                            #{idx + 1} — {row.block || 'Block Rate'}
                          </span>
                          <div className="flex items-center gap-1">
                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const rows = [...(cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || [])];
                                  const temp = rows[idx];
                                  rows[idx] = rows[idx - 1];
                                  rows[idx - 1] = temp;
                                  setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ratesRows: rows } });
                                }}
                                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded cursor-pointer"
                                title="Move up"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {idx < (cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || []).length - 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const rows = [...(cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || [])];
                                  const temp = rows[idx];
                                  rows[idx] = rows[idx + 1];
                                  rows[idx + 1] = temp;
                                  setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ratesRows: rows } });
                                }}
                                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded cursor-pointer"
                                title="Move down"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                const rows = (cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || []).filter((_, i) => i !== idx);
                                setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ratesRows: rows } });
                              }}
                              className="p-1 text-rose-600 hover:bg-rose-100 rounded cursor-pointer"
                              title="Delete rate row"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                          <div className="space-y-1 sm:col-span-2 md:col-span-1">
                            <label className="block text-[11px] font-bold text-slate-700">Block Name</label>
                            <input
                              type="text"
                              value={row.block}
                              onChange={(e) => {
                                const rows = [...(cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || [])];
                                rows[idx] = { ...rows[idx], block: e.target.value };
                                setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ratesRows: rows } });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-slate-700">5 Marla Rate</label>
                            <input
                              type="text"
                              value={row.marla5}
                              placeholder="e.g. PKR 70–90 lakh"
                              onChange={(e) => {
                                const rows = [...(cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || [])];
                                rows[idx] = { ...rows[idx], marla5: e.target.value };
                                setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ratesRows: rows } });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-slate-700">10 Marla Rate</label>
                            <input
                              type="text"
                              value={row.marla10}
                              placeholder="e.g. PKR 1.25–1.50 crore"
                              onChange={(e) => {
                                const rows = [...(cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || [])];
                                rows[idx] = { ...rows[idx], marla10: e.target.value };
                                setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ratesRows: rows } });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-bold text-slate-700">1 Kanal Rate</label>
                            <input
                              type="text"
                              value={row.kanal1}
                              placeholder="e.g. PKR 2.00–2.90 crore (or —)"
                              onChange={(e) => {
                                const rows = [...(cms.plotsForSale.ratesRows || initialHomepageCMS.plotsForSale.ratesRows || [])];
                                rows[idx] = { ...rows[idx], kanal1: e.target.value };
                                setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ratesRows: rows } });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 11. FLAGSHIPS */}
          {activeSection === 'flagships' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Flagship Mega Developments</h3>
                <p className="text-xs text-slate-500">Edit Faisal Jewel luxury high-rise and Hills Walk commercial boulevard cards.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.flagships.label || ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                    <input
                      type="text"
                      value={cms.flagships.h2}
                      onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Card 1: Faisal Jewel */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                    <span className="text-xs font-bold text-[#7b002c] uppercase">Flagship 1: Faisal Jewel</span>
                    <input
                      type="text"
                      value={cms.flagships.card1.title}
                      onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, card1: { ...cms.flagships.card1, title: e.target.value } } })}
                      placeholder="Title"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={cms.flagships.card1.subtitle}
                      onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, card1: { ...cms.flagships.card1, subtitle: e.target.value } } })}
                      placeholder="Subtitle"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <textarea
                      rows={2}
                      value={cms.flagships.card1.desc}
                      onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, card1: { ...cms.flagships.card1, desc: e.target.value } } })}
                      placeholder="Description"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <ImageUploader
                      label="Faisal Jewel Render / Photo"
                      value={cms.flagships.card1.image}
                      onChange={(val) => setCms({ ...cms, flagships: { ...cms.flagships, card1: { ...cms.flagships.card1, image: val } } })}
                      placeholder="/images/faisal-jewel-header.webp"
                    />
                  </div>

                  {/* Card 2: Hills Walk */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                    <span className="text-xs font-bold text-[#7b002c] uppercase">Flagship 2: Hills Walk</span>
                    <input
                      type="text"
                      value={cms.flagships.card2.title}
                      onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, card2: { ...cms.flagships.card2, title: e.target.value } } })}
                      placeholder="Title"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={cms.flagships.card2.subtitle}
                      onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, card2: { ...cms.flagships.card2, subtitle: e.target.value } } })}
                      placeholder="Subtitle"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <textarea
                      rows={2}
                      value={cms.flagships.card2.desc}
                      onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, card2: { ...cms.flagships.card2, desc: e.target.value } } })}
                      placeholder="Description"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <ImageUploader
                      label="Hills Walk Render / Photo"
                      value={cms.flagships.card2.image}
                      onChange={(val) => setCms({ ...cms, flagships: { ...cms.flagships, card2: { ...cms.flagships.card2, image: val } } })}
                      placeholder="/images/faisal-hills-site-header.webp"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 12. PAYMENT PLAN */}
          {activeSection === 'paymentPlan' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Payment Plan &amp; Official Rates Section</h3>
                <p className="text-xs text-slate-500">Edit schedule cards, download brochure button, and payment plan graphics.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.paymentPlan.label || ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) => setCms({ ...cms, paymentPlan: { ...cms.paymentPlan, label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                    <input
                      type="text"
                      value={cms.paymentPlan.h2}
                      onChange={(e) => setCms({ ...cms, paymentPlan: { ...cms.paymentPlan, h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Paragraph</label>
                  <textarea
                    rows={3}
                    value={cms.paymentPlan.paragraph}
                    onChange={(e) => setCms({ ...cms, paymentPlan: { ...cms.paymentPlan, paragraph: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Download Button Text</label>
                  <input
                    type="text"
                    value={cms.paymentPlan.downloadBtnText}
                    onChange={(e) => setCms({ ...cms, paymentPlan: { ...cms.paymentPlan, downloadBtnText: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <ImageUploader
                  label="Payment Plan Graphic / Chart Image"
                  value={cms.paymentPlan.image}
                  onChange={(val) => setCms({ ...cms, paymentPlan: { ...cms.paymentPlan, image: val } })}
                  placeholder="/images/payment-plan.webp"
                />
              </div>
            </div>
          )}

          {/* 13. BOOKING STEPS */}
          {activeSection === 'bookingSteps' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Booking Steps &amp; Process Guide</h3>
                  <p className="text-xs text-slate-500">Edit heading, subline, and step-by-step guidance cards for plot buyers.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const currentSteps = cms.bookingSteps?.steps || [];
                    const nextNum = currentSteps.length + 1;
                    const newStep = {
                      number: nextNum < 10 ? `0${nextNum}` : `${nextNum}`,
                      stepTag: `Step ${nextNum}`,
                      title: `New Step ${nextNum}`,
                      desc: 'Describe the action or requirement for this step.'
                    };
                    setCms({
                      ...cms,
                      bookingSteps: {
                        ...cms.bookingSteps,
                        steps: [...currentSteps, newStep]
                      }
                    });
                  }}
                  className="px-3.5 py-2 bg-rose-50 text-[#7b002c] hover:bg-rose-100 font-bold text-xs rounded-xl transition flex items-center gap-1.5 border border-rose-200 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Step</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.bookingSteps.label || ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) => setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                    <input
                      type="text"
                      value={cms.bookingSteps.h2}
                      onChange={(e) => setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Subtitle / Instructions</label>
                  <input
                    type="text"
                    value={cms.bookingSteps.subline || ''}
                    onChange={(e) => setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, subline: e.target.value } })}
                    placeholder="Scroll down to explore each step..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Individual Booking Steps</h4>
                  <div className="space-y-3">
                    {(cms.bookingSteps?.steps || []).map((step, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#7b002c] uppercase">
                            Step #{idx + 1}
                          </span>
                          {(cms.bookingSteps?.steps || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = (cms.bookingSteps?.steps || []).filter((_, i) => i !== idx);
                                setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, steps: updated } });
                              }}
                              className="text-rose-500 hover:bg-rose-100 p-1.5 rounded-lg cursor-pointer transition"
                              title="Delete Step"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold uppercase text-slate-500">Step Number</label>
                            <input
                              type="text"
                              value={step.number || `0${idx + 1}`}
                              onChange={(e) => {
                                const updated = [...(cms.bookingSteps?.steps || [])];
                                updated[idx].number = e.target.value;
                                setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, steps: updated } });
                              }}
                              placeholder="01"
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-bold uppercase text-slate-500">Step Tag / Badge</label>
                            <input
                              type="text"
                              value={step.stepTag || ''}
                              onChange={(e) => {
                                const updated = [...(cms.bookingSteps?.steps || [])];
                                updated[idx].stepTag = e.target.value;
                                setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, steps: updated } });
                              }}
                              placeholder="e.g. Selection"
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold uppercase text-slate-500">Step Title</label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => {
                              const updated = [...(cms.bookingSteps?.steps || [])];
                              updated[idx].title = e.target.value;
                              setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, steps: updated } });
                            }}
                            placeholder="e.g. Enquire & Choose Your Plot"
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold uppercase text-slate-500">Step Description</label>
                          <textarea
                            rows={2}
                            value={step.desc}
                            onChange={(e) => {
                              const updated = [...(cms.bookingSteps?.steps || [])];
                              updated[idx].desc = e.target.value;
                              setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, steps: updated } });
                            }}
                            placeholder="Detailed explanation of this step..."
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 14. WHY INVEST */}
          {activeSection === 'whyInvest' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Why Invest in Faisal Hills (Benefits)</h3>
                  <p className="text-xs text-slate-500">Key investment highlights, high capital appreciation, and safety cards.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newBenefit: WhyInvestItem = {
                      id: `wi-${Date.now()}`,
                      number: `0${cms.whyInvest.benefits.length + 1}`,
                      title: 'New High Return Driver',
                      description: 'Significant appreciation expected upon upcoming M-1 interchange launch.'
                    };
                    setCms({ ...cms, whyInvest: { ...cms.whyInvest, benefits: [...cms.whyInvest.benefits, newBenefit] } });
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Benefit</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.whyInvest.label || ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) => setCms({ ...cms, whyInvest: { ...cms.whyInvest, label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Heading</label>
                    <input
                      type="text"
                      value={cms.whyInvest.h2}
                      onChange={(e) => setCms({ ...cms, whyInvest: { ...cms.whyInvest, h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {cms.whyInvest.benefits.map((card, idx) => (
                    <div key={card.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 relative">
                      <button
                        type="button"
                        onClick={() => setCms({
                          ...cms,
                          whyInvest: {
                            ...cms.whyInvest,
                            benefits: cms.whyInvest.benefits.filter((_, i) => i !== idx)
                          }
                        })}
                        className="absolute top-3 right-3 text-rose-500 hover:bg-rose-100 p-1 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] font-bold text-[#7b002c] uppercase">Benefit Card #{idx + 1}</span>
                      <input
                        type="text"
                        value={card.number}
                        onChange={(e) => {
                          const updated = [...cms.whyInvest.benefits];
                          updated[idx].number = e.target.value;
                          setCms({ ...cms, whyInvest: { ...cms.whyInvest, benefits: updated } });
                        }}
                        placeholder="Number (e.g. 01)"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      />
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const updated = [...cms.whyInvest.benefits];
                          updated[idx].title = e.target.value;
                          setCms({ ...cms, whyInvest: { ...cms.whyInvest, benefits: updated } });
                        }}
                        placeholder="Title"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      />
                      <textarea
                        rows={3}
                        value={card.description}
                        onChange={(e) => {
                          const updated = [...cms.whyInvest.benefits];
                          updated[idx].description = e.target.value;
                          setCms({ ...cms, whyInvest: { ...cms.whyInvest, benefits: updated } });
                        }}
                        placeholder="Description"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 15. AMENITIES */}
          {/* 15. AMENITIES & FACILITIES */}
          {activeSection === 'amenities' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Facilities and Projects: Built and Planned</h3>
                  <p className="text-xs text-slate-500">Manage on-ground amenities, operational facilities, and upcoming development projects.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newCard: AmenityCardItem = {
                      id: `fac-${Date.now()}`,
                      title: 'New Facility / Project',
                      statusBadge: 'Planned',
                      desc: 'Facility details and project specifications description.',
                      image: '/images/amenities/roads-infrastructure.webp'
                    };
                    const existing = cms.amenities?.cards || [];
                    setCms({
                      ...cms,
                      amenities: {
                        ...cms.amenities,
                        h2: cms.amenities?.h2 || 'Facilities and Projects: Built and Planned',
                        cards: [...existing, newCard]
                      }
                    });
                  }}
                  className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Facility Card</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.amenities?.label || ''}
                      placeholder="e.g. World-Class Infrastructure"
                      onChange={(e) => setCms({
                        ...cms,
                        amenities: {
                          ...cms.amenities,
                          h2: cms.amenities?.h2 || 'Facilities and Projects: Built and Planned',
                          cards: cms.amenities?.cards || [],
                          label: e.target.value
                        }
                      })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Heading</label>
                    <input
                      type="text"
                      value={cms.amenities?.h2 || 'Facilities and Projects: Built and Planned'}
                      onChange={(e) => setCms({
                        ...cms,
                        amenities: {
                          ...cms.amenities,
                          cards: cms.amenities?.cards || [],
                          h2: e.target.value
                        }
                      })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Paragraph / Intro</label>
                  <textarea
                    rows={2}
                    value={cms.amenities?.paragraph || ''}
                    onChange={(e) => setCms({
                      ...cms,
                      amenities: {
                        ...cms.amenities,
                        cards: cms.amenities?.cards || [],
                        paragraph: e.target.value
                      }
                    })}
                    placeholder="Introductory paragraph for facilities section..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {(cms.amenities?.cards || []).map((card, idx) => (
                    <div key={card.id || idx} className="p-4 sm:p-5 bg-slate-50 hover:bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3 relative group transition">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-[#7b002c]/10 text-[#7b002c] rounded-md text-[10px] font-bold uppercase tracking-wider">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800 truncate max-w-[180px] sm:max-w-xs">
                            {card.title || 'Untitled Facility'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...(cms.amenities?.cards || [])];
                                const temp = list[idx - 1];
                                list[idx - 1] = list[idx];
                                list[idx] = temp;
                                setCms({ ...cms, amenities: { ...cms.amenities, cards: list } });
                              }}
                              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 rounded-md cursor-pointer transition"
                              title="Move Up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {idx < (cms.amenities?.cards?.length || 0) - 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...(cms.amenities?.cards || [])];
                                const temp = list[idx + 1];
                                list[idx + 1] = list[idx];
                                list[idx] = temp;
                                setCms({ ...cms, amenities: { ...cms.amenities, cards: list } });
                              }}
                              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 rounded-md cursor-pointer transition"
                              title="Move Down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const list = (cms.amenities?.cards || []).filter((_, i) => i !== idx);
                              setCms({ ...cms, amenities: { ...cms.amenities, cards: list } });
                            }}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-100 rounded-md cursor-pointer transition ml-1"
                            title="Delete Facility"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">Facility / Project Name</label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const updated = [...(cms.amenities?.cards || [])];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setCms({ ...cms, amenities: { ...cms.amenities, cards: updated } });
                            }}
                            placeholder="e.g. Roots International School"
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">Top Status Label / Badge</label>
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={card.statusBadge || ''}
                              onChange={(e) => {
                                const updated = [...(cms.amenities?.cards || [])];
                                updated[idx] = { ...updated[idx], statusBadge: e.target.value };
                                setCms({ ...cms, amenities: { ...cms.amenities, cards: updated } });
                              }}
                              placeholder="e.g. Operational / Built / Planned"
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-[#7b002c] focus:outline-none focus:border-[#7b002c]"
                            />
                            <div className="flex flex-wrap gap-1">
                              {['Built', 'Operational', 'Inaugurated', 'Planted', 'Under construction', 'Launched; under development', 'Completed', 'Planned'].map((badgePreset) => (
                                <button
                                  key={badgePreset}
                                  type="button"
                                  onClick={() => {
                                    const updated = [...(cms.amenities?.cards || [])];
                                    updated[idx] = { ...updated[idx], statusBadge: badgePreset };
                                    setCms({ ...cms, amenities: { ...cms.amenities, cards: updated } });
                                  }}
                                  className="text-[9px] px-1.5 py-0.5 bg-slate-200/80 hover:bg-[#7b002c] hover:text-white text-slate-700 rounded transition cursor-pointer"
                                >
                                  {badgePreset}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">Description / Details</label>
                        <textarea
                          rows={2}
                          value={card.desc || ''}
                          onChange={(e) => {
                            const updated = [...(cms.amenities?.cards || [])];
                            updated[idx] = { ...updated[idx], desc: e.target.value };
                            setCms({ ...cms, amenities: { ...cms.amenities, cards: updated } });
                          }}
                          placeholder="Short description of this facility..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#7b002c]"
                        />
                      </div>

                      <ImageUploader
                        label="Facility Photo / Render"
                        value={card.image}
                        onChange={(val) => {
                          const updated = [...(cms.amenities?.cards || [])];
                          updated[idx] = { ...updated[idx], image: val };
                          setCms({ ...cms, amenities: { ...cms.amenities, cards: updated } });
                        }}
                        placeholder="/images/amenities/..."
                      />
                    </div>
                  ))}
                </div>

                {(!cms.amenities?.cards || cms.amenities.cards.length === 0) && (
                  <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 text-xs">
                    No facilities added yet. Click &ldquo;Add Facility Card&rdquo; above to create your first item.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 16. TESTIMONIALS */}
          {activeSection === 'testimonials' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Investor Testimonials &amp; Reviews</h3>
                  <p className="text-xs text-slate-500">Real client feedback, ratings, and verified buyer tags.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newTest: TestimonialItem = {
                      id: `t-${Date.now()}`,
                      name: 'Syed Tariq Mahmood',
                      locationOrType: 'Executive Block Resident',
                      rating: 5,
                      review: 'Construction quality and rapid underground development exceeded my expectations.',
                      verified: true,
                      date: '2026-09-01'
                    };
                    setCms({ ...cms, testimonials: { ...cms.testimonials, items: [...cms.testimonials.items, newTest] } });
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.testimonials.label || ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) => setCms({ ...cms, testimonials: { ...cms.testimonials, label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Heading</label>
                    <input
                      type="text"
                      value={cms.testimonials.h2 || ''}
                      onChange={(e) => setCms({ ...cms, testimonials: { ...cms.testimonials, h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cms.testimonials.items.map((test, idx) => (
                    <div key={test.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 relative">
                      <button
                        type="button"
                        onClick={() => setCms({
                          ...cms,
                          testimonials: {
                            ...cms.testimonials,
                            items: cms.testimonials.items.filter((_, i) => i !== idx)
                          }
                        })}
                        className="absolute top-3 right-3 text-rose-500 hover:bg-rose-100 p-1 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] font-bold text-[#7b002c] uppercase">Review #{idx + 1}</span>
                      <input
                        type="text"
                        value={test.name}
                        onChange={(e) => {
                          const updated = [...cms.testimonials.items];
                          updated[idx].name = e.target.value;
                          setCms({ ...cms, testimonials: { ...cms.testimonials, items: updated } });
                        }}
                        placeholder="Name"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={test.locationOrType || ''}
                        onChange={(e) => {
                          const updated = [...cms.testimonials.items];
                          updated[idx].locationOrType = e.target.value;
                          setCms({ ...cms, testimonials: { ...cms.testimonials, items: updated } });
                        }}
                        placeholder="Tag / Role (e.g. Overseas Pakistani Investor)"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                      <textarea
                        rows={3}
                        value={test.review || ''}
                        onChange={(e) => {
                          const updated = [...cms.testimonials.items];
                          updated[idx].review = e.target.value;
                          setCms({ ...cms, testimonials: { ...cms.testimonials, items: updated } });
                        }}
                        placeholder="Review Text"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 17. INFRASTRUCTURE */}
          {activeSection === 'infrastructure' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Infrastructure Updates Carousel</h3>
                  <p className="text-xs text-slate-500">Live on-site photography from machinery, road carpeting, and Arc Gate.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newInfra: InfraCarouselItem = {
                      id: `inf-${Date.now()}`,
                      badge: 'On-Site Progress',
                      caption: 'Rapid road carpeting and commercial boulevard expansion.',
                      image: '/images/faisal-hills-site-header.webp'
                    };
                    setCms({ ...cms, infrastructure: { ...cms.infrastructure, cards: [...cms.infrastructure.cards, newInfra] } });
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Update Card</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.infrastructure.label || ''}
                      placeholder="Leave blank to hide"
                      onChange={(e) => setCms({ ...cms, infrastructure: { ...cms.infrastructure, label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Heading</label>
                    <input
                      type="text"
                      value={cms.infrastructure.h2 || ''}
                      onChange={(e) => setCms({ ...cms, infrastructure: { ...cms.infrastructure, h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cms.infrastructure.cards.map((card, idx) => (
                    <div key={card.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 relative">
                      <button
                        type="button"
                        onClick={() => setCms({
                          ...cms,
                          infrastructure: {
                            ...cms.infrastructure,
                            cards: cms.infrastructure.cards.filter((_, i) => i !== idx)
                          }
                        })}
                        className="absolute top-3 right-3 text-rose-500 hover:bg-rose-100 p-1 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] font-bold text-[#7b002c] uppercase">Update #{idx + 1}</span>
                      <input
                        type="text"
                        value={card.badge}
                        onChange={(e) => {
                          const updated = [...cms.infrastructure.cards];
                          updated[idx].badge = e.target.value;
                          setCms({ ...cms, infrastructure: { ...cms.infrastructure, cards: updated } });
                        }}
                        placeholder="Badge (e.g. Arc Gate Frontage)"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={card.caption}
                        onChange={(e) => {
                          const updated = [...cms.infrastructure.cards];
                          updated[idx].caption = e.target.value;
                          setCms({ ...cms, infrastructure: { ...cms.infrastructure, cards: updated } });
                        }}
                        placeholder="Caption"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                      <ImageUploader
                        label="Infrastructure Photo"
                        value={card.image}
                        onChange={(val) => {
                          const updated = [...cms.infrastructure.cards];
                          updated[idx].image = val;
                          setCms({ ...cms, infrastructure: { ...cms.infrastructure, cards: updated } });
                        }}
                        placeholder="/images/faisal-hills-site-header.webp"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 18. DISCOVER STATS */}
          {activeSection === 'discoverStats' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Faisal Hills Society Scale Numbers</h3>
                <p className="text-xs text-slate-500">Key land area, sectors, plot count, road width, and NOC approval figures specifically for Faisal Hills.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                  <input
                    type="text"
                    value={cms.discoverFtStats.label || ''}
                    placeholder="Leave blank to hide"
                    onChange={(e) => setCms({ ...cms, discoverFtStats: { ...cms.discoverFtStats, label: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cms.discoverFtStats.stats.map((st, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-bold text-[#7b002c] uppercase">Stat #{idx + 1}</span>
                      <input
                        type="text"
                        value={st.number}
                        onChange={(e) => {
                          const updated = [...cms.discoverFtStats.stats];
                          updated[idx].number = e.target.value;
                          setCms({ ...cms, discoverFtStats: { ...cms.discoverFtStats, stats: updated } });
                        }}
                        placeholder="Number (e.g. 50,000+)"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const updated = [...cms.discoverFtStats.stats];
                          updated[idx].label = e.target.value;
                          setCms({ ...cms, discoverFtStats: { ...cms.discoverFtStats, stats: updated } });
                        }}
                        placeholder="Label"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 19. FAQS */}
          {/* 19. FAQS */}
          {activeSection === 'faqs' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Frequently Asked Questions (Homepage &amp; FAQPage Schema)</h3>
                  <p className="text-xs text-slate-500">Add, edit, reorder or remove questions displayed on the homepage and indexed for Google Rich Snippets.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newFaq: FaqItem = {
                      q: 'New Question title here...',
                      a: 'Detailed answer explanation goes here.'
                    };
                    const existing = cms.faqs?.items || [];
                    setCms({ ...cms, faqs: { ...cms.faqs, h2: cms.faqs?.h2 || 'Frequently Asked Questions', items: [...existing, newFaq] } });
                  }}
                  className="px-3.5 py-2 bg-[#7b002c] hover:bg-[#9e1245] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ Item</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Top Badge / Tag (Optional)</label>
                    <input
                      type="text"
                      value={cms.faqs?.label || ''}
                      placeholder="e.g. Got Questions?"
                      onChange={(e) => setCms({ ...cms, faqs: { ...cms.faqs, h2: cms.faqs?.h2 || 'Frequently Asked Questions', items: cms.faqs?.items || [], label: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                    <input
                      type="text"
                      value={cms.faqs?.h2 || 'Frequently Asked Questions'}
                      onChange={(e) => setCms({ ...cms, faqs: { ...cms.faqs, items: cms.faqs?.items || [], h2: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {(cms.faqs?.items || []).map((faq, idx) => (
                    <div key={idx} className="p-4 sm:p-5 bg-slate-50 hover:bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3 relative group transition">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-[#7b002c]/10 text-[#7b002c] rounded-md text-[10px] font-bold uppercase tracking-wider">
                            Q#{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-700 truncate max-w-[200px] sm:max-w-md">
                            {faq.q || 'Untitled Question'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...(cms.faqs?.items || [])];
                                const temp = list[idx - 1];
                                list[idx - 1] = list[idx];
                                list[idx] = temp;
                                setCms({ ...cms, faqs: { ...cms.faqs, items: list } });
                              }}
                              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 rounded-md cursor-pointer transition"
                              title="Move Up"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {idx < (cms.faqs?.items?.length || 0) - 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...(cms.faqs?.items || [])];
                                const temp = list[idx + 1];
                                list[idx + 1] = list[idx];
                                list[idx] = temp;
                                setCms({ ...cms, faqs: { ...cms.faqs, items: list } });
                              }}
                              className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 rounded-md cursor-pointer transition"
                              title="Move Down"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const list = (cms.faqs?.items || []).filter((_, i) => i !== idx);
                              setCms({ ...cms, faqs: { ...cms.faqs, items: list } });
                            }}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-100 rounded-md cursor-pointer transition ml-1"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">Question</label>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => {
                            const updated = [...(cms.faqs?.items || [])];
                            updated[idx] = { ...updated[idx], q: e.target.value };
                            setCms({ ...cms, faqs: { ...cms.faqs, items: updated } });
                          }}
                          placeholder="Enter question text..."
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#7b002c]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">Answer</label>
                        <textarea
                          rows={3}
                          value={faq.a}
                          onChange={(e) => {
                            const updated = [...(cms.faqs?.items || [])];
                            updated[idx] = { ...updated[idx], a: e.target.value };
                            setCms({ ...cms, faqs: { ...cms.faqs, items: updated } });
                          }}
                          placeholder="Enter answer details..."
                          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-800 focus:outline-none focus:border-[#7b002c]"
                        />
                      </div>
                    </div>
                  ))}

                  {(!cms.faqs?.items || cms.faqs.items.length === 0) && (
                    <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 text-xs">
                      No FAQs added yet. Click &ldquo;Add FAQ Item&rdquo; above to create your first question.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 20. FINAL CTA */}
          {activeSection === 'finalCta' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Final Call to Action Banner</h3>
                <p className="text-xs text-slate-500">Contact buttons, phone hotline text, and visit sales desk action.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                  <input
                    type="text"
                    value={cms.finalCta.h2}
                    onChange={(e) => setCms({ ...cms, finalCta: { ...cms.finalCta, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Paragraph</label>
                  <textarea
                    rows={3}
                    value={cms.finalCta.paragraph}
                    onChange={(e) => setCms({ ...cms, finalCta: { ...cms.finalCta, paragraph: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Call Button Text</label>
                    <input
                      type="text"
                      value={cms.finalCta.callBtnText}
                      onChange={(e) => setCms({ ...cms, finalCta: { ...cms.finalCta, callBtnText: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">WhatsApp Button Text</label>
                    <input
                      type="text"
                      value={cms.finalCta.whatsappBtnText}
                      onChange={(e) => setCms({ ...cms, finalCta: { ...cms.finalCta, whatsappBtnText: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Visit Button Text</label>
                    <input
                      type="text"
                      value={cms.finalCta.visitBtnText}
                      onChange={(e) => setCms({ ...cms, finalCta: { ...cms.finalCta, visitBtnText: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 21. FOOTER */}
          {activeSection === 'footer' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Footer Tagline &amp; Disclaimer</h3>
                <p className="text-xs text-slate-500">Legal disclaimer and marketing taglines at the bottom of the page.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Footer Tagline</label>
                  <input
                    type="text"
                    value={cms.footer.tagline}
                    onChange={(e) => setCms({ ...cms, footer: { ...cms.footer, tagline: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Legal Disclaimer</label>
                  <textarea
                    rows={4}
                    value={cms.footer.disclaimer}
                    onChange={(e) => setCms({ ...cms, footer: { ...cms.footer, disclaimer: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
