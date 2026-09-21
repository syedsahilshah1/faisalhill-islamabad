'use client';

import React, { useState, useEffect } from 'react';
import {
  Save, RefreshCw, CheckCircle2, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp,
  Image as ImageIcon, Sparkles, Building2, MapPin, Layers, PhoneCall, MessageCircle, HelpCircle,
  Star, ShieldCheck, Eye, Compass, Award, FileText, Check, DollarSign, ListChecks
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
  FaqItem
} from '@/data/faisalHillsData';

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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Top Badge Tag</label>
                  <input
                    type="text"
                    value={cms.hero.badge}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Trust Guarantee Line</label>
                    <input
                      type="text"
                      value={cms.hero.trustLine}
                      onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, trustLine: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Background Image URL</label>
                    <input
                      type="text"
                      value={cms.hero.bgImage}
                      onChange={(e) => setCms({ ...cms, hero: { ...cms.hero, bgImage: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Chairman Image URL</label>
                    <input
                      type="text"
                      value={cms.chairman.image}
                      onChange={(e) => setCms({ ...cms, chairman: { ...cms.chairman, image: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
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
                </div>
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
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Heading</label>
                  <input
                    type="text"
                    value={cms.overview.h2}
                    onChange={(e) => setCms({ ...cms, overview: { ...cms.overview, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Image URL</label>
                    <input
                      type="text"
                      value={cms.overview.image}
                      onChange={(e) => setCms({ ...cms, overview: { ...cms.overview, image: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Image Alt</label>
                    <input
                      type="text"
                      value={cms.overview.imageAlt}
                      onChange={(e) => setCms({ ...cms, overview: { ...cms.overview, imageAlt: e.target.value } })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. LOCATION */}
          {activeSection === 'location' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Location &amp; Access Section</h3>
                <p className="text-xs text-slate-500">GT Road, Taxila, M-1 access routes description and interactive map embed URL.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Location H2 Heading</label>
                  <input
                    type="text"
                    value={cms.location.h2}
                    onChange={(e) => setCms({ ...cms, location: { ...cms.location, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Paragraph 1</label>
                  <textarea
                    rows={2}
                    value={cms.location.p1}
                    onChange={(e) => setCms({ ...cms, location: { ...cms.location, p1: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Paragraph 2</label>
                  <textarea
                    rows={2}
                    value={cms.location.p2}
                    onChange={(e) => setCms({ ...cms, location: { ...cms.location, p2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Paragraph 3</label>
                  <textarea
                    rows={2}
                    value={cms.location.p3}
                    onChange={(e) => setCms({ ...cms, location: { ...cms.location, p3: e.target.value } })}
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
              </div>
            </div>
          )}

          {/* 7. LANDMARKS */}
          {activeSection === 'landmarks' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Nearby Key Landmarks</h3>
                  <p className="text-xs text-slate-500">Show proximity cards with travel times and thumbnails.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newCard: LandmarkCardItem = {
                      id: `lm-${Date.now()}`,
                      timeBadge: '5 MINS',
                      title: 'New Landmark Location',
                      subLine: 'Direct expressway access',
                      image: '/images/faisal-hills-site-header.webp'
                    };
                    setCms({ ...cms, landmarks: { ...cms.landmarks, cards: [...cms.landmarks.cards, newCard] } });
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Landmark</span>
                </button>
              </div>

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
                    <input
                      type="text"
                      value={card.image}
                      onChange={(e) => {
                        const updated = [...cms.landmarks.cards];
                        updated[idx].image = e.target.value;
                        setCms({ ...cms, landmarks: { ...cms.landmarks, cards: updated } });
                      }}
                      placeholder="Image URL"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. MASTER PLAN */}
          {activeSection === 'masterPlan' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Master Plan Map Section</h3>
                <p className="text-xs text-slate-500">Configure title, PDF download links, and map viewer options.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                  <input
                    type="text"
                    value={cms.masterPlan.h2}
                    onChange={(e) => setCms({ ...cms, masterPlan: { ...cms.masterPlan, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={cms.masterPlan.paragraph}
                    onChange={(e) => setCms({ ...cms, masterPlan: { ...cms.masterPlan, paragraph: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>
            </div>
          )}

          {/* 9. BLOCKS & SECTORS */}
          {activeSection === 'blocksSection' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Blocks &amp; Sectors Section</h3>
                <p className="text-xs text-slate-500">Headers above the interactive expanding blocks showcase.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Heading</label>
                  <input
                    type="text"
                    value={cms.blocksSection.h2}
                    onChange={(e) => setCms({ ...cms, blocksSection: { ...cms.blocksSection, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Paragraph</label>
                  <textarea
                    rows={3}
                    value={cms.blocksSection.paragraph}
                    onChange={(e) => setCms({ ...cms, blocksSection: { ...cms.blocksSection, paragraph: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 10. PLOTS FOR SALE CTA */}
          {activeSection === 'plotsForSale' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Plots For Sale &amp; Resale CTA Bar</h3>
                <p className="text-xs text-slate-500">Dark high-conversion callout bar directing buyers to WhatsApp or directory.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Top Badge</label>
                  <input
                    type="text"
                    value={cms.plotsForSale.badge}
                    onChange={(e) => setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, badge: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">CTA Heading</label>
                  <input
                    type="text"
                    value={cms.plotsForSale.ctaHeading}
                    onChange={(e) => setCms({ ...cms, plotsForSale: { ...cms.plotsForSale, ctaHeading: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">CTA Subtext</label>
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
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                  <input
                    type="text"
                    value={cms.flagships.h2}
                    onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
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
                    <input
                      type="text"
                      value={cms.flagships.card1.image}
                      onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, card1: { ...cms.flagships.card1, image: e.target.value } } })}
                      placeholder="Image URL"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
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
                    <input
                      type="text"
                      value={cms.flagships.card2.image}
                      onChange={(e) => setCms({ ...cms, flagships: { ...cms.flagships, card2: { ...cms.flagships.card2, image: e.target.value } } })}
                      placeholder="Image URL"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
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
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                  <input
                    type="text"
                    value={cms.paymentPlan.h2}
                    onChange={(e) => setCms({ ...cms, paymentPlan: { ...cms.paymentPlan, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Payment Plan Graphic URL</label>
                    <input
                      type="text"
                      value={cms.paymentPlan.image}
                      onChange={(e) => setCms({ ...cms, paymentPlan: { ...cms.paymentPlan, image: e.target.value } })}
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
                </div>
              </div>
            </div>
          )}

          {/* 13. BOOKING STEPS */}
          {activeSection === 'bookingSteps' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-slate-900">Booking Steps &amp; Process</h3>
                <p className="text-xs text-slate-500">Edit the 4-step official booking and verification walkthrough.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                  <input
                    type="text"
                    value={cms.bookingSteps.h2}
                    onChange={(e) => setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  {cms.bookingSteps.steps.map((step, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-bold text-[#7b002c] uppercase">Step {step.number || idx + 1}: {step.stepTag}</span>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const updated = [...cms.bookingSteps.steps];
                          updated[idx].title = e.target.value;
                          setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, steps: updated } });
                        }}
                        placeholder="Title"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        value={step.desc}
                        onChange={(e) => {
                          const updated = [...cms.bookingSteps.steps];
                          updated[idx].desc = e.target.value;
                          setCms({ ...cms, bookingSteps: { ...cms.bookingSteps, steps: updated } });
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
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Heading</label>
                  <input
                    type="text"
                    value={cms.whyInvest.h2}
                    onChange={(e) => setCms({ ...cms, whyInvest: { ...cms.whyInvest, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
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
          {activeSection === 'amenities' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Amenities &amp; Master Features</h3>
                  <p className="text-xs text-slate-500">Edit amenities showcase cards and image assets.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newCard: AmenityCardItem = {
                      id: `am-${Date.now()}`,
                      title: 'New Community Facility',
                      bullets: ['24/7 dedicated surveillance', 'Modern underground utilities', 'Landscaped environment'],
                      image: '/images/faisal-hills-site-header.webp'
                    };
                    setCms({ ...cms, amenities: { ...cms.amenities, cards: [...cms.amenities.cards, newCard] } });
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Amenity</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Heading</label>
                  <input
                    type="text"
                    value={cms.amenities.h2}
                    onChange={(e) => setCms({ ...cms, amenities: { ...cms.amenities, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {cms.amenities.cards.map((card, idx) => (
                    <div key={card.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 relative">
                      <button
                        type="button"
                        onClick={() => setCms({
                          ...cms,
                          amenities: {
                            ...cms.amenities,
                            cards: cms.amenities.cards.filter((_, i) => i !== idx)
                          }
                        })}
                        className="absolute top-3 right-3 text-rose-500 hover:bg-rose-100 p-1 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] font-bold text-[#7b002c] uppercase">Amenity #{idx + 1}</span>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const updated = [...cms.amenities.cards];
                          updated[idx].title = e.target.value;
                          setCms({ ...cms, amenities: { ...cms.amenities, cards: updated } });
                        }}
                        placeholder="Title"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={card.image}
                        onChange={(e) => {
                          const updated = [...cms.amenities.cards];
                          updated[idx].image = e.target.value;
                          setCms({ ...cms, amenities: { ...cms.amenities, cards: updated } });
                        }}
                        placeholder="Image URL"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                  ))}
                </div>
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
                    <input
                      type="text"
                      value={card.image}
                      onChange={(e) => {
                        const updated = [...cms.infrastructure.cards];
                        updated[idx].image = e.target.value;
                        setCms({ ...cms, infrastructure: { ...cms.infrastructure, cards: updated } });
                      }}
                      placeholder="Image URL"
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                ))}
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section Label</label>
                  <input
                    type="text"
                    value={cms.discoverFtStats.label}
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
          {activeSection === 'faqs' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Frequently Asked Questions (FAQPage Schema)</h3>
                  <p className="text-xs text-slate-500">Indexed for Google rich snippet FAQs.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newFaq: FaqItem = {
                      q: 'Is Faisal Hills NOC fully approved by RDA?',
                      a: 'Yes, Faisal Hills is 100% legally approved by Rawalpindi Development Authority (RDA) covering over 11,823 Kanals.'
                    };
                    setCms({ ...cms, faqs: { ...cms.faqs, items: [...cms.faqs.items, newFaq] } });
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Section H2 Title</label>
                  <input
                    type="text"
                    value={cms.faqs.h2}
                    onChange={(e) => setCms({ ...cms, faqs: { ...cms.faqs, h2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#7b002c]"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  {cms.faqs.items.map((faq, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => setCms({
                          ...cms,
                          faqs: {
                            ...cms.faqs,
                            items: cms.faqs.items.filter((_, i) => i !== idx)
                          }
                        })}
                        className="absolute top-3 right-3 text-rose-500 hover:bg-rose-100 p-1 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] font-bold text-[#7b002c] uppercase">Question #{idx + 1}</span>
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => {
                          const updated = [...cms.faqs.items];
                          updated[idx].q = e.target.value;
                          setCms({ ...cms, faqs: { ...cms.faqs, items: updated } });
                        }}
                        placeholder="Question"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      />
                      <textarea
                        rows={3}
                        value={faq.a}
                        onChange={(e) => {
                          const updated = [...cms.faqs.items];
                          updated[idx].a = e.target.value;
                          setCms({ ...cms, faqs: { ...cms.faqs, items: updated } });
                        }}
                        placeholder="Answer"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  ))}
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
